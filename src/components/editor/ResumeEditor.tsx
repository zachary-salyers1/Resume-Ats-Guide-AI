import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useResumeStore } from '../../store/useResumeStore';
import { Save } from 'lucide-react';

const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  },
  clipboard: {
    matchVisual: false
  },
  history: {
    delay: 1000,
    maxStack: 50,
    userOnly: true
  }
};

const formats = [
  'header',
  'size',
  'font',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'align',
  'list', 'bullet', 'indent',
  'script',
  'blockquote', 'code-block',
  'link'
];

export default function ResumeEditor() {
  const { resume, updateResume, saveNewVersion } = useResumeStore();
  const quillRef = React.useRef<ReactQuill>(null);

  const handleChange = React.useCallback((content: string) => {
    if (resume) {
      updateResume({
        ...resume,
        content,
      });
    }
  }, [resume, updateResume]);

  const handleSave = React.useCallback(() => {
    saveNewVersion();
  }, [saveNewVersion]);

  if (!resume) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Edit Resume Content</h2>
          <p className="mt-1 text-sm text-gray-500">
            Format your content using the enhanced toolbar below
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Version
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={resume.content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          preserveWhitespace
          placeholder="Start editing your resume..."
          className="h-full flex flex-col"
        />
      </div>
    </div>
  );
}