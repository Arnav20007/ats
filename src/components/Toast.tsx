import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, Copy, Sparkles, Info, X, AlertTriangle, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'copy' | 'info' | 'sparkle' | 'warning' | 'error';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'copy':
        return <Copy className="w-3.5 h-3.5 text-emerald-400" />;
      case 'sparkle':
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      case 'info':
        return <Info className="w-3.5 h-3.5 text-cyan-400" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-500" />;
      case 'success':
      default:
        return <Check className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Floating Toasts Anchor */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/40 text-xs font-medium text-zinc-900 dark:text-zinc-100 transition-all duration-200 transform translate-y-0 opacity-100"
          >
            <div className="p-1 rounded-md bg-zinc-100 dark:bg-zinc-800">
              {getIcon(toast.type)}
            </div>
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
