import React from 'react';
import { useApp } from '../../context/AppContext';
import { Download, Copy, RotateCw, ExternalLink } from 'lucide-react';

const ResultsGallery: React.FC = () => {
  const { currentProject } = useApp();
  
  if (!currentProject || !currentProject.originalImages.length || !currentProject.generatedImages.length) {
    return null;
  }
  
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Creative Results</h2>
        <p className="text-gray-600">
          Here are your generated images based on your prompt. Download, share, or create more variations.
        </p>
      </div>
      
      <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Original Images</h3>
            <p className="text-sm text-gray-500 mt-1">
              {currentProject.originalImages.length} {currentProject.originalImages.length === 1 ? 'image' : 'images'} processed
            </p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg max-w-md">
            <p className="text-sm text-purple-800 italic">"{currentProject.selectedPrompt}"</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-4">
          {currentProject.originalImages.map(image => (
            <div key={image.id} className="aspect-square rounded-lg bg-gray-50 border border-gray-200 overflow-hidden">
              <img 
                src={image.url} 
                alt="Original" 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {currentProject.generatedImages.map(image => (
          <div key={image.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-square bg-gray-50">
              <img 
                src={image.url} 
                alt={`Generated image from ${currentProject.selectedPrompt}`} 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">Variation {image.id.slice(-1)}</h3>
                <span className="text-xs text-gray-500">1024 × 1024</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium py-2 rounded-md shadow-sm transition-colors flex items-center justify-center gap-1">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                
                <button className="w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                
                <button className="w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors">
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-md shadow-sm transition-colors">
          Create More Variations
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          Want a different style? <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">Try another prompt</a>
        </p>
      </div>
    </div>
  );
};

export default ResultsGallery;