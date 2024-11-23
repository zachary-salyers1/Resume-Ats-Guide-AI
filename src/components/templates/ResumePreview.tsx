import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import { Resume } from '../../types';
import { generatePDF } from '../../utils/pdfGenerator';
import ClassicTemplate from './layouts/ClassicTemplate';
import ModernTemplate from './layouts/ModernTemplate';
import MinimalTemplate from './layouts/MinimalTemplate';

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (resumeRef.current) {
      await generatePDF(resumeRef.current, resume.template.name);
    }
  };

  const getTemplateComponent = () => {
    switch (resume.template.layout) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      default:
        return <ClassicTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Resume Preview</h2>
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>
      <div className="p-6 bg-gray-50" style={{ minHeight: '29.7cm' }}>
        <div
          ref={resumeRef}
          className="bg-white shadow-lg mx-auto"
          style={{
            width: '21cm',
            minHeight: '29.7cm',
            padding: '2cm',
            fontFamily: resume.font,
          }}
        >
          {getTemplateComponent()}
        </div>
      </div>
    </div>
  );
}