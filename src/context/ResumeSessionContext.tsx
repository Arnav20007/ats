import React, { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { BLANK_STARTER_RESUME, type ResumeData } from '../data/resumeSamples';

export type StudioActiveTab = 'deep_report' | 'keywords' | 'audit' | 'rewriter';
export type AtsTemplateId = 'jakes' | 'harvard' | 'modern' | 'compact';

interface ResumeSession {
  viewMode: 'landing' | 'studio';
  setViewMode: Dispatch<SetStateAction<'landing' | 'studio'>>;
  studioTab: 'document' | 'audit';
  setStudioTab: Dispatch<SetStateAction<'document' | 'audit'>>;
  activeStudioTab: StudioActiveTab;
  setActiveStudioTab: Dispatch<SetStateAction<StudioActiveTab>>;
  selectedTemplate: AtsTemplateId;
  setSelectedTemplate: Dispatch<SetStateAction<AtsTemplateId>>;
  resume: ResumeData;
  setResume: Dispatch<SetStateAction<ResumeData>>;
  targetJd: string;
  setTargetJd: Dispatch<SetStateAction<string>>;
  uploadedFileName: string;
  setUploadedFileName: Dispatch<SetStateAction<string>>;
}

const ResumeSessionContext = createContext<ResumeSession | null>(null);

export function ResumeSessionProvider({ children, initialPath }: { children: React.ReactNode; initialPath?: string }) {
  const isBuilder = initialPath === '/builder' || (typeof window !== 'undefined' && window.location.pathname === '/builder');
  const [viewMode, setViewMode] = useState<'landing' | 'studio'>(isBuilder ? 'studio' : 'landing');
  const [studioTab, setStudioTab] = useState<'document' | 'audit'>('document');
  const [activeStudioTab, setActiveStudioTab] = useState<StudioActiveTab>('deep_report');
  const [selectedTemplate, setSelectedTemplate] = useState<AtsTemplateId>('jakes');
  const [resume, setResume] = useState<ResumeData>(() => ({ ...BLANK_STARTER_RESUME }));
  const [targetJd, setTargetJd] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  return (
    <ResumeSessionContext.Provider value={{
      viewMode,
      setViewMode,
      studioTab,
      setStudioTab,
      activeStudioTab,
      setActiveStudioTab,
      selectedTemplate,
      setSelectedTemplate,
      resume,
      setResume,
      targetJd,
      setTargetJd,
      uploadedFileName,
      setUploadedFileName
    }}>
      {children}
    </ResumeSessionContext.Provider>
  );
}

export function useResumeSession() {
  const session = useContext(ResumeSessionContext);
  if (!session) throw new Error('useResumeSession must be used inside ResumeSessionProvider');
  return session;
}
