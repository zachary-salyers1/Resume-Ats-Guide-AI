import { create } from 'zustand';
import { Resume, AnalysisResult } from '../types';

interface ResumeStore {
  resume: Resume | null;
  savedResumes: Resume[];
  analysisResult: AnalysisResult | null;
  jobDescription: string;
  setResume: (resume: Resume) => void;
  updateResume: (resume: Resume) => void;
  saveNewVersion: () => void;
  deleteResume: (id: string) => void;
  setJobDescription: (description: string) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resume: null,
  savedResumes: [],
  analysisResult: null,
  jobDescription: '',
  setResume: (resume) => set({ resume }),
  updateResume: (resume) => {
    set({ resume: { ...resume, updatedAt: new Date() } });
  },
  saveNewVersion: () => {
    const { resume, savedResumes } = get();
    if (resume) {
      const newResume = {
        ...resume,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      set({ 
        savedResumes: [...savedResumes, newResume],
        resume: newResume,
      });
    }
  },
  deleteResume: (id) => {
    const { savedResumes, resume } = get();
    const newSavedResumes = savedResumes.filter((r) => r.id !== id);
    set({ 
      savedResumes: newSavedResumes,
      resume: resume?.id === id ? null : resume,
    });
  },
  setJobDescription: (description) => set({ jobDescription: description }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  reset: () => set({ resume: null, analysisResult: null, jobDescription: '' }),
}));