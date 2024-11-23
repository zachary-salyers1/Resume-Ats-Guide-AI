import React from 'react';
import { Clock, Download, Trash2, Copy } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { generatePDF } from '../../utils/pdfGenerator';

export default function SavedResumes() {
  const { savedResumes, deleteResume, setResume } = useResumeStore();

  const handleDownload = async (resume: any) => {
    try {
      const containerRef = document.createElement('div');
      containerRef.style.position = 'absolute';
      containerRef.style.left = '-9999px';
      containerRef.style.top = '-9999px';
      document.body.appendChild(containerRef);

      // Create a temporary div for the resume content
      const root = document.createElement('div');
      root.style.width = '21cm';
      root.style.padding = '2cm';
      root.style.background = 'white';
      root.innerHTML = resume.content;
      containerRef.appendChild(root);

      try {
        await generatePDF(root, 'resume');
      } finally {
        document.body.removeChild(containerRef);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (savedResumes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Clock className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved resumes</h3>
        <p className="text-gray-500">
          Your saved resume versions will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Saved Resumes
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your saved resume versions
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {savedResumes.map((resume) => (
            <li key={resume.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Resume Version {resume.id.slice(0, 8)}
                    </h4>
                    <div className="flex space-x-4 mt-1">
                      <p className="text-sm text-gray-500">
                        Created: {formatDate(resume.createdAt)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Updated: {formatDate(resume.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setResume(resume)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    title="Load this version"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(resume)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    title="Download PDF"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteResume(resume.id)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-red-400 hover:bg-red-50 hover:text-red-500"
                    title="Delete version"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}