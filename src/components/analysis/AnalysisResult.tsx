import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';

export default function AnalysisResult() {
  const analysisResult = useResumeStore((state) => state.analysisResult);

  if (!analysisResult) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg">Match Score</span>
          <span className="text-2xl font-bold text-indigo-600">
            {analysisResult.matchScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${analysisResult.matchScore}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Key Skills Match</h3>
          <div className="grid grid-cols-2 gap-2">
            {analysisResult.keySkills.map((skill) => (
              <div key={skill} className="flex items-center text-sm text-green-700">
                <CheckCircle className="h-4 w-4 mr-1" />
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Missing Skills</h3>
          <div className="grid grid-cols-2 gap-2">
            {analysisResult.missingSkills.map((skill) => (
              <div key={skill} className="flex items-center text-sm text-red-700">
                <XCircle className="h-4 w-4 mr-1" />
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Suggestions</h3>
          <div className="space-y-2">
            {analysisResult.suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="flex items-start p-2 bg-gray-50 rounded"
              >
                <AlertCircle className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">{suggestion.category}: </span>
                  <span className="text-gray-700">{suggestion.recommendation}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                    suggestion.priority === 'High' ? 'bg-red-100 text-red-800' :
                    suggestion.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {suggestion.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}