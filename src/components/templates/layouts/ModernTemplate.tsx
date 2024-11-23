import React from 'react';
import { Resume } from '../../../types';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap } from 'lucide-react';

interface ModernTemplateProps {
  resume: Resume;
}

export default function ModernTemplate({ resume }: ModernTemplateProps) {
  const sections = resume.content.split('\n\n');
  const [header, ...rest] = sections;

  return (
    <div style={{ color: '#2D3748' }} className="flex">
      {/* Sidebar */}
      <div 
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: resume.color }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {header.split('\n')[0]}
          </h1>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              example@email.com
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              (555) 123-4567
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              City, State
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              portfolio.com
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 border-b border-white/20 pb-1">
            Skills
          </h2>
          <div className="space-y-2">
            {rest
              .find(section => section.toLowerCase().includes('skills'))
              ?.split('\n')
              .slice(1)
              .map((skill, index) => (
                <div key={index} className="text-sm">
                  {skill}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        {rest
          .filter(section => !section.toLowerCase().includes('skills'))
          .map((section, index) => {
            const [title, ...content] = section.split('\n');
            const icon = title.toLowerCase().includes('experience') ? (
              <Briefcase className="w-5 h-5" />
            ) : title.toLowerCase().includes('education') ? (
              <GraduationCap className="w-5 h-5" />
            ) : (
              <Award className="w-5 h-5" />
            );

            return (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: resume.color }}>
                  {icon}
                  {title}
                </h2>
                <div className="pl-4 space-y-3">
                  {content.map((line, i) => (
                    <p key={i} className="text-gray-700">
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