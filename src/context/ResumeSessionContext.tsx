import React, { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { BLANK_STARTER_RESUME, type ResumeData } from '../data/resumeSamples';

interface ResumeSession {
  viewMode: 'landing' | 'studio';
  setViewMode: Dispatch<SetStateAction<'landing' | 'studio'>>;
  resume: ResumeData;
  setResume: Dispatch<SetStateAction<ResumeData>>;
  targetJd: string;
  setTargetJd: Dispatch<SetStateAction<string>>;
  uploadedFileName: string;
  setUploadedFileName: Dispatch<SetStateAction<string>>;
}

const ResumeSessionContext = createContext<ResumeSession | null>(null);

export function ResumeSessionProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<'landing' | 'studio'>('landing');
  const [resume, setResume] = useState<ResumeData>(() => ({ ...BLANK_STARTER_RESUME }));
  const [targetJd, setTargetJd] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  return (
    <ResumeSessionContext.Provider value={{ viewMode, setViewMode, resume, setResume, targetJd, setTargetJd, uploadedFileName, setUploadedFileName }}>
      {children}
    </ResumeSessionContext.Provider>
  );
}

export function useResumeSession() {
  const session = useContext(ResumeSessionContext);
  if (!session) throw new Error('useResumeSession must be used inside ResumeSessionProvider');
  return session;
}
