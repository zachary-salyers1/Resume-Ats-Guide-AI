export interface Resume {
  id: string;
  userId: string;
  content: string;
  template: ResumeTemplate;
  font: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  layout: 'classic' | 'modern' | 'minimal';
}

export interface AnalysisResult {
  matchScore: number;
  suggestions: Suggestion[];
  keySkills: string[];
  missingSkills: string[];
}

export interface Suggestion {
  category: 'Skills' | 'Experience' | 'Education' | 'Format';
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ResumeCustomization {
  font: string;
  color: string;
  spacing: number;
}