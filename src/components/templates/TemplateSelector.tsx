import React from 'react';
import { Layout, Type, Palette } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { ResumeTemplate } from '../../types';

const templates: ResumeTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and professional layout',
    layout: 'classic',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with a creative touch',
    layout: 'modern',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and straightforward presentation',
    layout: 'minimal',
  },
];

const fonts = [
  { id: 'inter', name: 'Inter' },
  { id: 'roboto', name: 'Roboto' },
  { id: 'poppins', name: 'Poppins' },
];

const colors = [
  { id: 'blue', value: '#3B82F6' },
  { id: 'green', value: '#10B981' },
  { id: 'purple', value: '#8B5CF6' },
  { id: 'red', value: '#EF4444' },
];

export default function TemplateSelector() {
  const { resume, updateResume } = useResumeStore();

  const handleTemplateChange = (template: ResumeTemplate) => {
    if (resume) {
      updateResume({
        ...resume,
        template,
      });
    }
  };

  const handleFontChange = (font: string) => {
    if (resume) {
      updateResume({
        ...resume,
        font,
      });
    }
  };

  const handleColorChange = (color: string) => {
    if (resume) {
      updateResume({
        ...resume,
        color,
      });
    }
  };

  if (!resume) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Customize Resume</h2>

      <div className="space-y-6">
        {/* Template Selection */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Layout className="w-4 h-4 mr-2" />
            Template
          </label>
          <div className="grid grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  resume.template.id === template.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Font Selection */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Type className="w-4 h-4 mr-2" />
            Font
          </label>
          <div className="grid grid-cols-3 gap-4">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => handleFontChange(font.id)}
                className={`p-2 border rounded-lg font-${font.id} transition-colors ${
                  resume.font === font.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4 mr-2" />
            Accent Color
          </label>
          <div className="flex space-x-4">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorChange(color.value)}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${
                  resume.color === color.value
                    ? 'border-gray-400 scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}