export interface ImageFile {
  id: string;
  file: File;
  url: string;
  createdAt: Date;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  originalImageId: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  originalImages: ImageFile[];
  generatedImages: GeneratedImage[];
  selectedPrompt: string;
  createdAt: Date;
}

export interface PromptSuggestion {
  id: string;
  text: string;
  description: string;
}

export type ActiveStep = 'landing' | 'upload' | 'preview' | 'prompt' | 'generate' | 'results' | 'pricing' | 'login' | 'checkout' | 'account';

export interface User {
  id: string;
  email: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  credits: number;
  description: string;
  features: string[];
}

export interface Order {
  id: string;
  userId: string;
  packageId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface UserAccount {
  id: string;
  userId: string;
  credits: number;
  activePackage: Package | null;
  orders: Order[];
}