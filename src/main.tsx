import {hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('The application root element is missing.');
hydrateRoot(root, <AppErrorBoundary><App /></AppErrorBoundary>, {
  onRecoverableError(error) {
    // Keep diagnostics free of résumé and contact-form data.
    console.error('ToolForge UI recovery error:', error instanceof Error ? error.name : 'UnknownError');
  }
});
