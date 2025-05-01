import React from 'react';
import { useApp } from '../../context/AppContext';
import { Upload, Image, MessageSquareText, Sparkles, Download } from 'lucide-react';

const ProgressBar: React.FC = () => {
  const { activeStep } = useApp();
  
  const steps = [
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'preview', label: 'Preview', icon: Image },
    { id: 'prompt', label: 'Prompt', icon: MessageSquareText },
    { id: 'generate', label: 'Generate', icon: Sparkles },
    { id: 'results', label: 'Results', icon: Download },
  ];
  
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === activeStep);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      <div className="relative">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 rounded-full">
          <div 
            className="h-1 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${(getCurrentStepIndex() / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Steps */}
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCurrent = step.id === activeStep;
            const isCompleted = getCurrentStepIndex() >= index;
            
            return (
              <div 
                key={step.id} 
                className={`flex flex-col items-center transition-all duration-300 ${
                  isCompleted ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className={`
                  flex items-center justify-center rounded-full w-8 h-8 
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                  ${isCurrent ? 'ring-4 ring-purple-100' : ''}
                  transition-all duration-300
                `}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`
                  text-xs mt-1 font-medium
                  ${isCompleted ? 'text-gray-900' : 'text-gray-500'}
                `}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;