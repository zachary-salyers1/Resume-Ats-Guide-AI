import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { parseFile } from '../../utils/fileParser';

export default function FileUpload() {
  const setResume = useResumeStore((state) => state.setResume);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = async (file: File) => {
    try {
      setError(null);
      setIsLoading(true);

      if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type)) {
        throw new Error('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size too large. Please upload a file smaller than 10MB.');
      }

      const content = await parseFile(file);
      
      if (!content.trim()) {
        throw new Error('The file appears to be empty. Please upload a file with content.');
      }

      setResume({
        id: crypto.randomUUID(),
        userId: 'user-1', // This would come from auth in a real app
        content,
        template: 'default',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) handleFile(files[0]);
  }, []);

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
          isLoading 
            ? 'border-gray-300 bg-gray-50' 
            : 'border-gray-300 hover:border-indigo-500'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload className={`h-12 w-12 ${isLoading ? 'text-gray-300' : 'text-gray-400'}`} />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {isLoading ? 'Processing file...' : 'Upload your resume'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {isLoading 
              ? 'Please wait while we process your file'
              : 'Drag and drop your resume file, or click to browse'}
          </p>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files[0]) handleFile(files[0]);
            }}
            disabled={isLoading}
          />
          <button
            type="button"
            className={`mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
            onClick={() => document.querySelector('input[type="file"]')?.click()}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Select file'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}