import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Loader } from 'lucide-react';

const GenerationProcess: React.FC = () => {
  const { currentProject, generateImages, isGenerating } = useApp();
  
  useEffect(() => {
    if (currentProject && currentProject.selectedPrompt && !isGenerating && currentProject.generatedImages.length === 0) {
      generateImages();
    }
  }, [currentProject, generateImages, isGenerating]);
  
  if (!currentProject || !currentProject.originalImages.length) {
    return null;
  }
  
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-4">
          {isGenerating ? (
            <Loader className="w-10 h-10 text-purple-500 animate-spin" />
          ) : (
            <Sparkles className="w-10 h-10 text-purple-500" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isGenerating ? 'Creating Magic...' : 'Starting Generation'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {isGenerating 
            ? 'Our AI is hard at work transforming your images with your selected prompt.'
            : 'Preparing to generate your creative shots...'}
        </p>
        
        {isGenerating && (
          <div className="w-full max-w-xs mx-auto">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-purple-600 w-3/4 animate-pulse rounded-full"></div>
            </div>
            
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Processing</span>
              <span>Almost there</span>
            </div>
          </div>
        )}
        
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm w-full">
          <h3 className="font-medium text-gray-900 mb-2">Your Creative Brief</h3>
          
          <div className="bg-gray-50 p-3 rounded-lg text-left">
            <p className="text-gray-700 italic">"{currentProject.selectedPrompt}"</p>
          </div>
          
          <div className="mt-4">
            <div className="text-gray-500 text-sm">
              Processing {currentProject.originalImages.length} {currentProject.originalImages.length === 1 ? 'image' : 'images'}
            </div>
            <div className="text-purple-600 font-medium text-sm mt-1">
              3 variations per image
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationProcess;