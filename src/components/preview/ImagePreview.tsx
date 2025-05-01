import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, RefreshCw, MessageSquareText, Sparkles, MinusCircle, PlusCircle, Image, Zap } from 'lucide-react';

const ImagePreview: React.FC = () => {
  const { currentProject, resetProject, setActiveStep, updateProjectPrompt } = useApp();
  const [prompt, setPrompt] = useState(currentProject?.selectedPrompt || '');
  const [numVariations, setNumVariations] = useState(3);
  const [imageSize, setImageSize] = useState<'1024x1024' | '1024x1536' | '1536x1024'>('1024x1024');
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  
  if (!currentProject) {
    return null;
  }

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    updateProjectPrompt(value);
  };

  const handleContinue = () => {
    setActiveStep('generate');
  };

  const decreaseVariations = () => {
    if (numVariations > 1) {
      setNumVariations(prev => prev - 1);
    }
  };

  const increaseVariations = () => {
    if (numVariations < 3) {
      setNumVariations(prev => prev + 1);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Preview & Add Creative Direction</h2>
        <p className="text-gray-600 mt-2">
          Review your images and customize generation settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Creative Prompt</h3>
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                placeholder="Describe how you want to transform these images..."
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                rows={4}
              />
              <p className="text-sm text-gray-500">
                This prompt will be applied to all selected images
              </p>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-medium text-gray-900 mb-4">Generation Settings</h4>
                
                {/* Number of Variations */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Variations
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decreaseVariations}
                      disabled={numVariations <= 1}
                      className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-medium text-gray-900">{numVariations}</span>
                    <button
                      onClick={increaseVariations}
                      disabled={numVariations >= 3}
                      className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Generate up to 3 variations per image
                  </p>
                </div>

                {/* Image Size */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setImageSize('1024x1024')}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        imageSize === '1024x1024'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-200 hover:bg-teal-50/30'
                      }`}
                    >
                      <Image className="w-5 h-5 mb-1" />
                      <span className="text-xs font-medium">Square</span>
                      <span className="text-xs text-gray-500">1024×1024</span>
                    </button>
                    <button
                      onClick={() => setImageSize('1024x1536')}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        imageSize === '1024x1536'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-200 hover:bg-teal-50/30'
                      }`}
                    >
                      <Image className="w-5 h-5 mb-1 rotate-90" />
                      <span className="text-xs font-medium">Portrait</span>
                      <span className="text-xs text-gray-500">1024×1536</span>
                    </button>
                    <button
                      onClick={() => setImageSize('1536x1024')}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        imageSize === '1536x1024'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-200 hover:bg-teal-50/30'
                      }`}
                    >
                      <Image className="w-5 h-5 mb-1" />
                      <span className="text-xs font-medium">Landscape</span>
                      <span className="text-xs text-gray-500">1536×1024</span>
                    </button>
                  </div>
                </div>

                {/* Quality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setQuality('high')}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        quality === 'high'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-200 hover:bg-teal-50/30'
                      }`}
                    >
                      <Zap className="w-5 h-5 mb-1" />
                      <span className="text-xs font-medium">High</span>
                      <span className="text-xs text-gray-500">Best quality</span>
                    </button>
                    <button
                      onClick={() => setQuality('medium')}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        quality === 'medium'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-200 hover:bg-teal-50/30'
                      }`}
                    >
                      <Zap className="w-5 h-5 mb-1 opacity-75" />
                      <span className="text-xs font-medium">Medium</span>
                      <span className="text-xs text-gray-500">Balanced</span>
                    </button>
                    <button
                      onClick={() => setQuality('low')}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        quality === 'low'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-200 hover:bg-teal-50/30'
                      }`}
                    >
                      <Zap className="w-5 h-5 mb-1 opacity-50" />
                      <span className="text-xs font-medium">Low</span>
                      <span className="text-xs text-gray-500">Faster</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={resetProject}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Upload Different Images
            </button>

            <button
              onClick={handleContinue}
              disabled={!prompt.trim()}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg shadow-sm font-medium
                ${prompt.trim()
                  ? 'bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Sparkles className="w-5 h-5" />
              Generate {numVariations} {numVariations === 1 ? 'Variation' : 'Variations'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Selected Images</h3>
          <div className="grid gap-4 grid-cols-2">
            {currentProject.originalImages.map((image) => (
              <div key={image.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="aspect-square bg-gray-50">
                  <img 
                    src={image.url} 
                    alt="Original upload" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-sm text-gray-500 truncate">
                      {image.file.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-purple-50 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-purple-900 mb-2">Generation Summary</h4>
            <ul className="space-y-2 text-sm text-purple-800">
              <li className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Size: {imageSize}
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quality: {quality}
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {numVariations} variations per image
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;