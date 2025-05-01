import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImageFile, GeneratedImage, Project, PromptSuggestion, ActiveStep, User } from '../types';
import { supabase, createUserAccount } from '../lib/supabase';
import { generateCreativeImage } from '../lib/openai';

interface AppContextType {
  currentProject: Project | null;
  projects: Project[];
  isUploading: boolean;
  isGenerating: boolean;
  isLoading: boolean;
  activeStep: ActiveStep;
  promptSuggestions: PromptSuggestion[];
  user: User | null;
  uploadImages: (files: File[]) => Promise<void>;
  updateProjectPrompt: (prompt: string) => void;
  generateImages: (variations?: number, size?: string, quality?: string) => Promise<void>;
  resetProject: () => void;
  setActiveStep: (step: ActiveStep) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultPromptSuggestions: PromptSuggestion[] = [
  {
    id: '1',
    text: 'Elegant Product Showcase',
    description: 'Professional studio lighting with minimalist background',
  },
  {
    id: '2',
    text: 'Lifestyle Integration',
    description: 'Show your product in real-world settings with natural lighting',
  },
  {
    id: '3',
    text: 'Artistic Interpretation',
    description: 'Creative, artistic rendering with unique visual elements',
  },
  {
    id: '4',
    text: 'Seasonal Theme',
    description: 'Showcase your product with seasonal elements and colors',
  },
  {
    id: '5',
    text: 'Abstract Concept',
    description: 'Conceptual presentation highlighting product essence',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<ActiveStep>('upload');
  const [promptSuggestions] = useState<PromptSuggestion[]>(defaultPromptSuggestions);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
        });
        
        try {
          await createUserAccount(session.user.id);
        } catch (error) {
          // Account might already exist, that's fine
        }
        
        setActiveStep('upload');
      } else {
        setUser(null);
        setActiveStep('login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setCurrentProject(null);
      setProjects([]);
      setUser(null);
      setActiveStep('upload');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const uploadImages = async (files: File[]) => {
    setIsUploading(true);
    
    try {
      const imageFiles: ImageFile[] = await Promise.all(
        files.map(async (file) => ({
          id: crypto.randomUUID(),
          file,
          url: URL.createObjectURL(file),
          createdAt: new Date(),
        }))
      );
      
      const newProject: Project = {
        id: crypto.randomUUID(),
        originalImages: imageFiles,
        generatedImages: [],
        selectedPrompt: '',
        createdAt: new Date(),
      };
      
      setCurrentProject(newProject);
      setProjects([newProject, ...projects]);
      setActiveStep('preview');
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const updateProjectPrompt = (prompt: string) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      selectedPrompt: prompt,
    };

    setCurrentProject(updatedProject);
    setProjects(projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    ));
  };

  const generateImages = async (variations: number = 3, size: string = '1024x1024', quality: string = 'high') => {
    if (!currentProject || !currentProject.selectedPrompt) {
      throw new Error('Please select a prompt before generating images');
    }
    
    setIsGenerating(true);
    
    try {
      const generatedImages: GeneratedImage[] = [];
      
      for (const originalImage of currentProject.originalImages) {
        for (let i = 0; i < variations; i++) {
          try {
            const response = await generateCreativeImage({
              image: originalImage.file,
              prompt: `need creative for image 1 as image 2, brand name mentioned on shoes is WALK. ${currentProject.selectedPrompt}`,
              n: 1,
              size,
              quality
            });

            if (!response?.success || !response?.data?.[0]?.url) {
              throw new Error(response.error || 'Failed to generate image. Please try again.');
            }

            generatedImages.push({
              id: crypto.randomUUID(),
              url: response.data[0].url,
              prompt: currentProject.selectedPrompt,
              originalImageId: originalImage.id,
              createdAt: new Date(),
            });
          } catch (error) {
            console.error('Error generating variation:', error);
            throw new Error(`Failed to generate image: ${error.message}`);
          }
        }
      }
      
      const updatedProject = {
        ...currentProject,
        generatedImages,
      };
      
      setCurrentProject(updatedProject);
      setProjects(projects.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      ));
      
      setActiveStep('results');
    } catch (error) {
      console.error('Error in generateImages:', error);
      throw new Error(`Failed to generate images: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetProject = () => {
    setCurrentProject(null);
    setActiveStep('upload');
  };

  const value = {
    currentProject,
    projects,
    isUploading,
    isGenerating,
    isLoading,
    activeStep,
    promptSuggestions,
    user,
    uploadImages,
    updateProjectPrompt,
    generateImages,
    resetProject,
    setActiveStep,
    login,
    signup,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};