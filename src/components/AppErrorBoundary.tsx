import React from 'react';

interface State { hasError: boolean }

export class AppErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Local diagnostics only. Never send user-entered résumé data to a third party.
    console.error('ToolForge UI error:', error.name);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
          <h1 className="text-2xl font-bold">ToolForge could not load this page</h1>
          <p className="max-w-lg text-sm text-slate-600 dark:text-zinc-400">Reload the page to try again. Unsaved changes in this session may be lost.</p>
          <button type="button" onClick={() => window.location.reload()} className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white">Reload page</button>
        </main>
      );
    }
    return this.props.children;
  }
}
