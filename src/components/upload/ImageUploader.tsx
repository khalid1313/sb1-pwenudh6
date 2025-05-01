import React, { useCallback, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Upload, ImageIcon, Loader, MessageSquareText, Sparkles, X } from 'lucide-react';

const ImageUploader: React.FC = () => {
  const { uploadImages, isUploading, currentProject } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    setSelectedFiles(prev => [...prev, ...files]);
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(prev => [...prev, ...files]);
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      uploadImages(selectedFiles);
      setSelectedFiles([]);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Upload Your Images</h2>
        <p className="text-gray-600 mt-2">
          Upload multiple product photos to transform them into stunning visuals.
        </p>
      </div>

      <div 
        className={`
          relative border-2 border-dashed rounded-xl p-8 transition-all duration-300
          flex flex-col items-center justify-center text-center h-72
          ${isDragging 
            ? 'border-teal-500 bg-teal-50' 
            : 'border-gray-300 hover:border-teal-400 bg-white hover:bg-gray-50'
          }
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader className="w-12 h-12 text-teal-500 animate-spin mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Uploading your images...</h3>
            <p className="text-gray-500 mt-2">This will just take a moment</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4">
              {isDragging ? (
                <ImageIcon className="w-8 h-8 text-teal-500" />
              ) : (
                <Upload className="w-8 h-8 text-teal-500" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              {isDragging ? 'Drop your images here' : 'Upload your images to start'}
            </h3>
            <p className="text-gray-500 mt-2">Drag and drop multiple images or click to browse</p>
            <p className="text-gray-500 text-sm mt-1">Supported formats: JPG, PNG (max size 10MB)</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative bg-white rounded-lg border border-gray-200 p-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
                <p className="text-sm text-gray-500 truncate mt-2">{file.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            className="mt-6 w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload {selectedFiles.length} {selectedFiles.length === 1 ? 'Image' : 'Images'}
          </button>
        </div>
      )}

      <div className="mt-12 grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6 text-teal-500" />
          </div>
          <h3 className="font-medium text-gray-900">1. Upload Photos</h3>
          <p className="text-sm text-gray-500 mt-1">Multiple product images</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
            <MessageSquareText className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-900">2. Add Prompts</h3>
          <p className="text-sm text-gray-500 mt-1">Customize each image</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-indigo-500" />
          </div>
          <h3 className="font-medium text-gray-900">3. Get Results</h3>
          <p className="text-sm text-gray-500 mt-1">Download & use</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;