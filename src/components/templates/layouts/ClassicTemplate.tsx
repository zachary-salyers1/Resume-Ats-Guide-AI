import React from 'react';
import { Resume } from '../../../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ClassicTemplateProps {
  resume: Resume;
}

export default function ClassicTemplate({ resume }: ClassicTemplateProps) {
  const sections = resume.content.split('\n\n');
  const [header, ...rest] = sections;

  return (
    <div style={{ color: '#2D3748' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: resume.color }}>
          {header.split('\n')[0]}
        </h1>
        <div className="flex justify-center space-x-4 text-sm">
          <span className="flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            example@email.com
          </span>
          <span className="flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            (555) 123-4567
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            City, State
          </span>
          <span className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            portfolio.com
          </span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {rest.map((section, index) => {
          const [title, ...content] = section.split('\n');
          return (
            <div key={index}>
              <h2 
                className="text-xl font-semibold mb-3 pb-1 border-b-2" 
                style={{ borderColor: resume.color }}
              >
                {title}
              </h2>
              <div className="pl-4">
                {content.map((line, i) => (
                  <p key={i} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}