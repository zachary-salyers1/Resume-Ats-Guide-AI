import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { analyzeResume } from '../../utils/ai';

export default function JobDescription() {
  const { jobDescription, setJobDescription, resume, setAnalysisResult } = useResumeStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!resume?.content || !jobDescription.trim()) {
      setError("Both resume and job description are required");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeResume(resume.content, jobDescription);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Search className="h-5 w-5 text-gray-400" />
        <h2 className="ml-2 text-lg font-medium text-gray-900">Job Description Analysis</h2>
      </div>
      <textarea
        className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => {
          setJobDescription(e.target.value);
          setError(null);
        }}
        disabled={isAnalyzing}
      />
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      <button
        type="button"
        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleAnalyze}
        disabled={!resume?.content || !jobDescription.trim() || isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Analyzing...
          </>
        ) : (
          'Analyze Match'
        )}
      </button>
    </div>
  );
}