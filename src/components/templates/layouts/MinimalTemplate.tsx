import React from 'react';
import { Resume } from '../../../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface MinimalTemplateProps {
  resume: Resume;
}

export default function MinimalTemplate({ resume }: MinimalTemplateProps) {
  const sections = resume.content.split('\n\n');
  const [header, ...rest] = sections;

  return (
    <div style={{ color: '#2D3748' }} className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-4xl font-light mb-4 pb-2 border-b-2" 
          style={{ borderColor: resume.color }}
        >
          {header.split('\n')[0]}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center">
            <Mail className="w-4 h-4 mr-1" style={{ color: resume.color }} />
            example@email.com
          </span>
          <span className="flex items-center">
            <Phone className="w-4 h-4 mr-1" style={{ color: resume.color }} />
            (555) 123-4567
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" style={{ color: resume.color }} />
            City, State
          </span>
          <span className="flex items-center">
            <Globe className="w-4 h-4 mr-1" style={{ color: resume.color }} />
            portfolio.com
          </span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {rest.map((section, index) => {
          const [title, ...content] = section.split('\n');
          return (
            <div key={index}>
              <h2 
                className="text-2xl font-light mb-4"
                style={{ color: resume.color }}
              >
                {title}
              </h2>
              <div className="space-y-3">
                {content.map((line, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">
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