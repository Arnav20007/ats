import React, { useState, useEffect, useRef } from 'react';
import { ToolId } from '../types';
import {
  Search,
  Sparkles,
  Video,
  Music,
  FileText,
  Mail,
  FileCode,
  DollarSign,
  Compass,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  Coffee,
  X
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (id: ToolId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  onOpenCoffee: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Tools' | 'Actions';
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  isDark,
  onToggleTheme,
  isFocusMode,
  onToggleFocusMode,
  onOpenCoffee,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: CommandItem[] = [
    {
      id: 'hooks',
      title: 'Viral Hook Generator — 3s Video Retention Openers',
      category: 'Tools',
      shortcut: '⌘1',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      action: () => { onSelectTool('hooks'); onClose(); },
    },
    {
      id: 'script',
      title: 'Script Studio — YouTube, Shorts & Explainer Blueprints',
      category: 'Tools',
      shortcut: '⌘2',
      icon: <Video className="w-4 h-4 text-cyan-400" />,
      action: () => { onSelectTool('script'); onClose(); },
    },
    {
      id: 'audio',
      title: 'Audio Shifter — Pitch, BPM & Nightcore Studio',
      category: 'Tools',
      shortcut: '⌘3',
      icon: <Music className="w-4 h-4 text-violet-400" />,
      action: () => { onSelectTool('audio'); onClose(); },
    },
    {
      id: 'resume',
      title: 'Resume Polisher — Google X-Y-Z & ATS Optimizer',
      category: 'Tools',
      shortcut: '⌘4',
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      action: () => { onSelectTool('resume'); onClose(); },
    },
    {
      id: 'invoice',
      title: 'Demand Letter — Legal Overdue Debt Recovery',
      category: 'Tools',
      shortcut: '⌘5',
      icon: <Mail className="w-4 h-4 text-amber-400" />,
      action: () => { onSelectTool('invoice'); onClose(); },
    },
    {
      id: 'sitemap',
      title: 'Sitemap Engine — XML Crawler & SEO Visualizer',
      category: 'Tools',
      shortcut: '⌘6',
      icon: <FileCode className="w-4 h-4 text-teal-400" />,
      action: () => { onSelectTool('sitemap'); onClose(); },
    },
    {
      id: 'calculator',
      title: 'Traffic & Yield Model — Audience Economics',
      category: 'Tools',
      shortcut: '⌘7',
      icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
      action: () => { onSelectTool('calculator'); onClose(); },
    },
    {
      id: 'blueprint',
      title: 'Launch Blueprint — Ranked Niche Micro-SaaS Playbook',
      category: 'Tools',
      shortcut: '⌘8',
      icon: <Compass className="w-4 h-4 text-purple-400" />,
      action: () => { onSelectTool('blueprint'); onClose(); },
    },
    {
      id: 'theme',
      title: isDark ? 'Switch to Paper Light Theme' : 'Switch to Obsidian Dark Theme',
      category: 'Actions',
      shortcut: '⌘T',
      icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => { onToggleTheme(); onClose(); },
    },
    {
      id: 'focus',
      title: isFocusMode ? 'Exit Distraction-Free Focus Mode' : 'Enter Distraction-Free Focus Mode',
      category: 'Actions',
      shortcut: '⌘F',
      icon: isFocusMode ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4 text-cyan-400" />,
      action: () => { onToggleFocusMode(); onClose(); },
    },
    {
      id: 'support',
      title: 'Support Solo Creator — Buy a Coffee ($3)',
      category: 'Actions',
      icon: <Coffee className="w-4 h-4 text-amber-400" />,
      action: () => { onOpenCoffee(); onClose(); },
    },
  ];

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800/80">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool or command... (e.g. audio, hooks, focus, theme)"
            className="w-full bg-transparent text-sm placeholder:text-zinc-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-400">
              No matching tools or commands found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                  idx === selectedIndex
                    ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-medium'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/80 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block font-medium">{item.title}</span>
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>

                {item.shortcut && (
                  <kbd className="px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-[10px] font-mono text-zinc-400">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/80 dark:bg-zinc-950/80 text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-emerald-500 font-medium">ATSCheck Engine v2.5</span>
        </div>
      </div>
    </div>
  );
};
