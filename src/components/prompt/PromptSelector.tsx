import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wand2, CheckCircle, Edit, ArrowRight } from 'lucide-react';

const PromptSelector: React.FC = () => {
  const { currentProject, promptSuggestions, selectPrompt } = useApp();
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  
  if (!currentProject) {
    return null;
  }
  
  const handleSelectPrompt = (promptId: string) => {
    const suggestion = promptSuggestions.find(p => p.id === promptId);
    if (suggestion) {
      setSelectedPromptId(promptId);
      setIsCustom(false);
    }
  };
  
  const handleSelectCustom = () => {
    setIsCustom(true);
    setSelectedPromptId(null);
  };
  
  const handleSubmit = () => {
    if (isCustom && customPrompt.trim()) {
      selectPrompt(customPrompt.trim());
    } else if (selectedPromptId) {
      const suggestion = promptSuggestions.find(p => p.id === selectedPromptId);
      if (suggestion) {
        selectPrompt(suggestion.text);
      }
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Style</h2>
            <p className="text-gray-600">
              Select a suggested style or create your own to transform your image.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <img 
              src={currentProject.originalImage.url} 
              alt="Original upload" 
              className="w-full h-48 object-contain bg-gray-50 p-4"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Prompt</h2>
            <p className="text-gray-600">
              This is what the AI will use to transform your image.
            </p>
          </div>
          
          <div className="space-y-3">
            {promptSuggestions.map(suggestion => (
              <div
                key={suggestion.id}
                className={`
                  p-4 rounded-lg border transition-all cursor-pointer
                  ${selectedPromptId === suggestion.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/30'
                  }
                `}
                onClick={() => handleSelectPrompt(suggestion.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{suggestion.text}</h3>
                    <p className="text-sm text-gray-500 mt-1">{suggestion.description}</p>
                  </div>
                  {selectedPromptId === suggestion.id && (
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                  )}
                </div>
              </div>
            ))}
            
            <div
              className={`
                p-4 rounded-lg border transition-all cursor-pointer
                ${isCustom
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
                }
              `}
              onClick={handleSelectCustom}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Edit className="w-4 h-4 text-purple-500" />
                    Custom Prompt
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Write your own creative directions
                  </p>
                </div>
                {isCustom && <CheckCircle className="w-5 h-5 text-purple-500" />}
              </div>
              
              {isCustom && (
                <div className="mt-3">
                  <textarea
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                    placeholder="Describe the style, mood, and setting you want..."
                    rows={3}
                    value={customPrompt}
                    onChange={e => setCustomPrompt(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Include specifics like lighting, background, and mood
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!selectedPromptId && (!isCustom || !customPrompt.trim())}
              className={`
                flex items-center gap-2 py-2 px-6 rounded-md shadow-sm font-medium
                ${(selectedPromptId || (isCustom && customPrompt.trim()))
                  ? 'bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Wand2 className="w-5 h-5" />
              Generate Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptSelector;