import React from 'react';
import Header from './components/layout/Header';
import FileUpload from './components/upload/FileUpload';
import JobDescription from './components/analysis/JobDescription';
import AnalysisResult from './components/analysis/AnalysisResult';
import ResumeEditor from './components/editor/ResumeEditor';
import SavedResumes from './components/resume/SavedResumes';
import { useResumeStore } from './store/useResumeStore';

function App() {
  const { resume, analysisResult } = useResumeStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[90rem] mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!resume ? (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Resume</h2>
                  <FileUpload />
                </div>
              </div>
              <SavedResumes />
            </div>
          ) : (
            <div className="space-y-6">
              <JobDescription />
              {analysisResult && <AnalysisResult />}
              <ResumeEditor />
              <SavedResumes />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;