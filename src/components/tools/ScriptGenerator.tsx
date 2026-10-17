import React, { useState, useEffect, useRef } from 'react';
import { SEO_DATA } from '../../data/seoData';
import { SeoHead } from '../seo/SeoHead';
import { FaqSection } from '../seo/FaqSection';
import {
  Video,
  Sparkles,
  Copy,
  Check,
  Download,
  Play,
  Pause,
  RotateCcw,
  Clock,
  FileText,
  Layers
} from 'lucide-react';

interface ScriptGeneratorProps {
  onActionLogged: () => void;
}

type ScriptFormat = 'short' | 'explainer' | 'deepdive' | 'podcast';
type ScriptTone = 'punchy' | 'story' | 'intellectual' | 'casual';
type HookStyle = 'contrarian' | 'curiosity' | 'warning' | 'story';

interface ScriptBeat {
  id: string;
  timeRange: string;
  role: string;
  bRollNotes: string;
  voiceover: string;
}

interface GeneratedScript {
  title: string;
  targetRuntime: string;
  wordCount: number;
  beats: ScriptBeat[];
  cleanVoiceover: string;
  fullMarkdown: string;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({ onActionLogged }) => {
  const [topic, setTopic] = useState('Why 90% of people quit their goals in the third week');
  const [format, setFormat] = useState<ScriptFormat>('short');
  const [tone, setTone] = useState<ScriptTone>('punchy');
  const [hookStyle, setHookStyle] = useState<HookStyle>('contrarian');
  const [viewMode, setViewMode] = useState<'director' | 'teleprompter'>('director');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedType, setCopiedType] = useState<'voice' | 'full' | null>(null);
  const [currentScript, setCurrentScript] = useState<GeneratedScript | null>(null);

  // Teleprompter state
  const [isPrompterRunning, setIsPrompterRunning] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(3);
  const prompterRef = useRef<HTMLDivElement>(null);

  const sampleTopics = [
    'How NVIDIA quietly built an AI monopoly',
    'Why you feel exhausted even after 8 hours of sleep',
    'The 3 rules of high-leverage freelancing',
    'Why most people fail to build muscle in their 20s',
    'How dopamine detoxing actually works in the brain'
  ];

  const buildScript = (
    inputTopic: string,
    fmt: ScriptFormat,
    tn: ScriptTone,
    hk: HookStyle
  ): GeneratedScript => {
    const cleanTopic = inputTopic.trim() || 'High Leverage Personal Growth';

    // Hook sentence logic based on style
    let hookSpoken = '';
    let hookVisual = '';
    if (hk === 'contrarian') {
      hookSpoken = `Stop doing what everyone else tells you about ${cleanTopic}. The advice you're following right now is practically guaranteed to fail.`;
      hookVisual = `[Visual: Extreme close-up eye contact. Sudden hard cut to red alert graphic. Sub-bass drop audio impact.]`;
    } else if (hk === 'curiosity') {
      hookSpoken = `There is a hidden paradox behind ${cleanTopic} that almost nobody talks about—and once you see it, you can never unsee it.`;
      hookVisual = `[Visual: Slow digital zoom on speaker. Screen dims slightly with spotlight overlay. Clock ticking sound FX.]`;
    } else if (hk === 'warning') {
      hookSpoken = `If you don't understand how ${cleanTopic} works by the end of this year, you're going to pay for it tenfold.`;
      hookVisual = `[Visual: Direct finger point at lens, high shutter speed glitch transition, warning badge overlay.]`;
    } else {
      hookSpoken = `Three months ago, a quiet experiment with ${cleanTopic} completely flipped my assumptions upside down.`;
      hookVisual = `[Visual: B-roll documentary b-roll with grain filter, vintage archival film click.]`;
    }

    // Tone modifiers
    const toneCadence =
      tn === 'punchy'
        ? 'Short sentences. Aggressive pacing. Zero filler words.'
        : tn === 'story'
        ? 'Vivid analogies. Emotional rising tension. Narrative payoff.'
        : tn === 'intellectual'
        ? 'First-principles logic. Data-backed frameworks. Nuanced counterarguments.'
        : 'Friendly coffee-shop chat. Authentic vulnerability. Direct relatable takeaways.';

    const beats: ScriptBeat[] = [];

    if (fmt === 'short') {
      beats.push({
        id: '1',
        timeRange: '0:00 - 0:04',
        role: 'Hook (Pattern Interrupt)',
        bRollNotes: hookVisual,
        voiceover: hookSpoken
      });
      beats.push({
        id: '2',
        timeRange: '0:04 - 0:15',
        role: 'The Hidden Trap (Retain)',
        bRollNotes: `[Visual: Split screen comparison. Fast cursor montage showing wrong path vs reality. Sound: Fast whoosh transition.]`,
        voiceover: `Most people assume ${cleanTopic} comes down to raw willpower. But here's the uncomfortable truth: you aren't lacking motivation—your entire system is designed with a fatal friction point.`
      });
      beats.push({
        id: '3',
        timeRange: '0:15 - 0:38',
        role: 'The 2-Step Protocol (Value)',
        bRollNotes: `[Visual: On-screen numbered framework (Step 1 -> Step 2). Dynamic highlight arrows and kinetic typography.]`,
        voiceover: `Here is the playbook that changes everything: First, isolate the trigger that drains your momentum before noon. Second, replace the 60-minute hurdle with an irreversible 2-minute default rule. That's it.`
      });
      beats.push({
        id: '4',
        timeRange: '0:38 - 0:52',
        role: 'Proof & High-Stakes Payoff',
        bRollNotes: `[Visual: Cut back to presenter looking candidly at camera. Screen text showing verified results.]`,
        voiceover: `When you flip this switch, you stop fighting against resistance. The momentum compounds automatically without burning you out.`
      });
      beats.push({
        id: '5',
        timeRange: '0:52 - 0:60',
        role: 'Looping Call to Action',
        bRollNotes: `[Visual: Zoom out to medium shot. Seamless loop connector cue.]`,
        voiceover: `Try this for just 48 hours and comment your results below. Save this video so you don't lose it.`
      });
    } else if (fmt === 'explainer') {
      beats.push({
        id: '1',
        timeRange: '0:00 - 0:15',
        role: 'Cold Open & Narrative Hook',
        bRollNotes: hookVisual,
        voiceover: `${hookSpoken} In this video, we're dissecting the actual mechanics behind ${cleanTopic}—and the exact blueprint you need to master it.`
      });
      beats.push({
        id: '2',
        timeRange: '0:15 - 0:55',
        role: 'Act I: The Illusion of the Consensus',
        bRollNotes: `[Visual: B-roll montage of mainstream media headlines and popular misconceptions. Minimalist animated diagram.]`,
        voiceover: `For decades, the standard playbook on ${cleanTopic} looked simple on paper. But when you inspect the real-world data, the consensus falls apart. Here is why the conventional approach costs you both time and compounding leverage.`
      });
      beats.push({
        id: '3',
        timeRange: '0:55 - 2:10',
        role: 'Act II: The First-Principles Breakdown',
        bRollNotes: `[Visual: Screen recording or hand-drawn white-board style graphic breaking down the 3 core pillars.]`,
        voiceover: `To fix this, we need to decompose the problem into its foundational variables. Variable one: Input asymmetry. Variable two: Feedback latency. When you optimize these two variables, the entire equation shifts in your favor.`
      });
      beats.push({
        id: '4',
        timeRange: '2:10 - 3:45',
        role: 'Act III: The Step-by-Step Implementation',
        bRollNotes: `[Visual: Over-the-shoulder practical demonstration. Step-by-step checklist on the right third of frame.]`,
        voiceover: `Here is how you execute this starting tomorrow morning: Phase one takes less than 15 minutes to configure. Phase two creates an automated feedback loop so you never second-guess your direction.`
      });
      beats.push({
        id: '5',
        timeRange: '3:45 - 4:45',
        role: 'The Epiphany & Closing Call to Action',
        bRollNotes: `[Visual: Warm cinematic lighting, end-card recommendation cards fade in.]`,
        voiceover: `The winners in this domain aren't smarter—they just respect the physics of leverage. If you found this breakdown valuable, subscribe and watch our related deep-dive right here.`
      });
    } else if (fmt === 'deepdive') {
      beats.push({
        id: '1',
        timeRange: '0:00 - 0:30',
        role: 'Prologue: The Inciting Incident',
        bRollNotes: hookVisual,
        voiceover: `${hookSpoken} This isn't just another surface-level summary. This is a comprehensive, step-by-step autopsy of ${cleanTopic}.`
      });
      beats.push({
        id: '2',
        timeRange: '0:30 - 2:30',
        role: 'Chapter 1: The Historical Setup',
        bRollNotes: `[Visual: Archival black-and-white stills transitioning to modern high-res charts. Atmospheric ambient synth.]`,
        voiceover: `To understand where we are today, we have to look back at how ${cleanTopic} evolved. The pivotal inflection point happened when the incentives silently shifted behind closed doors.`
      });
      beats.push({
        id: '3',
        timeRange: '2:30 - 5:30',
        role: 'Chapter 2: The Hidden Architecture',
        bRollNotes: `[Visual: Complex system architecture visualizer, spotlight on the critical bottleneck.]`,
        voiceover: `Under the hood, three interlocking forces dictate the outcome. Most beginners focus exclusively on the visible symptom, completely ignoring the structural engine underneath.`
      });
      beats.push({
        id: '4',
        timeRange: '5:30 - 8:00',
        role: 'Chapter 3: The Asymmetric Counter-Strategy',
        bRollNotes: `[Visual: Case study breakdown with real numbers, comparative metrics table.]`,
        voiceover: `Now let's examine the counter-strategy used by the top 1%. Instead of competing head-to-head on brute force, they exploit this structural inefficiency to achieve outsized results with fraction of the effort.`
      });
      beats.push({
        id: '5',
        timeRange: '8:00 - 9:30',
        role: 'Epilogue: The Future Landscape',
        bRollNotes: `[Visual: Cinematic drone footage, thoughtful pause, clear on-screen summary prompt.]`,
        voiceover: `As this trend accelerates, the gap between those who adapt and those who cling to legacy methods will only widen. Leave a comment with your take, and share this with someone who needs to hear it.`
      });
    } else {
      // Podcast
      beats.push({
        id: '1',
        timeRange: '0:00 - 0:20',
        role: 'Podcast Episode Hook & Cold Intro',
        bRollNotes: `[Audio Cue: Upbeat lo-fi intro theme fades in under voiceover. Natural conversational warmth.]`,
        voiceover: `Welcome back to the show. Today we are unpacking something I have been obsessing over all week: ${cleanTopic}.`
      });
      beats.push({
        id: '2',
        timeRange: '0:20 - 1:45',
        role: 'The Candid Backstory & Personal Stake',
        bRollNotes: `[Audio Cue: Music dips to subtle background pad. Intimate microphone presence.]`,
        voiceover: `A few days ago, a conversation forced me to confront a glaring flaw in how most creators and builders approach this. ${hookSpoken}`
      });
      beats.push({
        id: '3',
        timeRange: '1:45 - 3:30',
        role: 'The Core Discussion & Mental Model',
        bRollNotes: `[Audio Cue: Casual coffee sip pause, thoughtful inflection.]`,
        voiceover: `If you strip away all the jargon and marketing noise, here is the mental model you actually need to remember. Think of it like a flywheel where every small incremental win fuels the next rotation.`
      });
      beats.push({
        id: '4',
        timeRange: '3:30 - 4:45',
        role: 'Listener Homework & Episode Wrap-up',
        bRollNotes: `[Audio Cue: Outro theme swells gracefully. Smooth radio-style signoff.]`,
        voiceover: `So here is my challenge for you before next week's episode: Pick one element of this framework and test it in your own workflow today. Shoot me an email or DM with your findings, and I will see you in the next one.`
      });
    }

    const cleanVoiceover = beats.map((b) => b.voiceover).join('\n\n');
    const wordCount = cleanVoiceover.split(/\s+/).filter(Boolean).length;
    
    // Markdown screenplay version
    const fullMarkdown = `# Script: ${cleanTopic}
**Format:** ${fmt.toUpperCase()} | **Tone:** ${tn.toUpperCase()} | **Style:** ${hk.toUpperCase()}
**Estimated Runtime:** ${fmt === 'short' ? '60 Seconds' : fmt === 'explainer' ? '4:45 Minutes' : fmt === 'deepdive' ? '9:30 Minutes' : '4:45 Minutes'} | **Words:** ${wordCount}

---

${beats
  .map(
    (b) => `### [${b.timeRange}] ${b.role}
*${b.bRollNotes}*

${b.voiceover}
`
  )
  .join('\n---\n\n')}`;

    return {
      title: cleanTopic,
      targetRuntime: fmt === 'short' ? '~60s' : fmt === 'explainer' ? '~5 min' : fmt === 'deepdive' ? '~10 min' : '~5 min',
      wordCount,
      beats,
      cleanVoiceover,
      fullMarkdown
    };
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    onActionLogged();
    setTimeout(() => {
      const generated = buildScript(topic, format, tone, hookStyle);
      setCurrentScript(generated);
      setIsGenerating(false);
    }, 200);
  };

  useEffect(() => {
    // Generate initial on mount
    const initial = buildScript(topic, format, tone, hookStyle);
    setCurrentScript(initial);
  }, []);

  // Teleprompter auto-scroll effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPrompterRunning && prompterRef.current) {
      interval = setInterval(() => {
        if (prompterRef.current) {
          prompterRef.current.scrollTop += scrollSpeed;
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPrompterRunning, scrollSpeed]);

  const copyToClipboard = (type: 'voice' | 'full') => {
    if (!currentScript) return;
    const textToCopy = type === 'voice' ? currentScript.cleanVoiceover : currentScript.fullMarkdown;
    navigator.clipboard.writeText(textToCopy);
    setCopiedType(type);
    onActionLogged();
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadScript = () => {
    if (!currentScript) return;
    const blob = new Blob([currentScript.fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script-${currentScript.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    onActionLogged();
  };

  return (
    <div className="space-y-6">
      {/* 1. SEO Head dynamically updates document title and meta description tag */}
      <SeoHead seo={SEO_DATA.script} />

      {/* 2. Tool Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              <Video className="w-4 h-4 text-emerald-700" />
              <span>Full Video & Podcast Screenplay Suite</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Video & Podcast Script Generator
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Generate retention-engineered scripts for YouTube, TikTok, Reels, podcasts, and explainers on any topic.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              B-Roll Cues + Teleprompter
            </span>
          </div>
        </div>

        {/* Input Configuration Grid */}
        <div className="mt-5 space-y-4">
          {/* Topic input */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Enter Any Topic or Hook Premise:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Why most small businesses fail in their first year..."
                className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-900"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isGenerating ? 'Writing...' : 'Generate Script'}</span>
              </button>
            </div>

            {/* Quick sample topic pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[11px] text-slate-500">
              <span className="font-medium text-slate-600">Quick Topics:</span>
              {sampleTopics.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(item);
                    setTimeout(() => {
                      const gen = buildScript(item, format, tone, hookStyle);
                      setCurrentScript(gen);
                    }, 50);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Selectors row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Format */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Format & Runtime:
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as ScriptFormat)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-800 font-medium"
              >
                <option value="short">60s Viral Short / Reel / TikTok</option>
                <option value="explainer">5-Minute YouTube Explainer</option>
                <option value="deepdive">10-Minute Video Essay Deep Dive</option>
                <option value="podcast">Podcast Monologue / Opening</option>
              </select>
            </div>

            {/* Delivery Tone */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Pacing & Tone:
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as ScriptTone)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-800 font-medium"
              >
                <option value="punchy">Fast-Paced & Punchy (Short Sentences)</option>
                <option value="story">Dramatic & Story-Driven (Rising Tension)</option>
                <option value="intellectual">Authoritative & First-Principles</option>
                <option value="casual">Casual & Conversational (Relatable)</option>
              </select>
            </div>

            {/* Hook Style */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Hook Angle:
              </label>
              <select
                value={hookStyle}
                onChange={(e) => setHookStyle(e.target.value as HookStyle)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-800 font-medium"
              >
                <option value="contrarian">Contrarian Pattern Interrupt ("Stop doing X")</option>
                <option value="curiosity">The Curiosity Gap ("The hidden paradox")</option>
                <option value="warning">Urgent Stake ("If you don't know this...")</option>
                <option value="story">Scene In Medias Res ("3 months ago...")</option>
              </select>
            </div>
          </div>
        </div>

        {/* Script Output Area */}
        {currentScript && (
          <div className="mt-6 border-t border-slate-200 pt-5 space-y-4">
            {/* View Switcher & Action Buttons Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="flex rounded-md p-0.5 bg-slate-200/80 text-xs">
                  <button
                    onClick={() => setViewMode('director')}
                    className={`px-3 py-1 rounded font-medium transition-colors ${
                      viewMode === 'director' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Director View (With B-Roll)
                  </button>
                  <button
                    onClick={() => setViewMode('teleprompter')}
                    className={`px-3 py-1 rounded font-medium transition-colors ${
                      viewMode === 'teleprompter' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Teleprompter Mode
                  </button>
                </div>

                <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-500 pl-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <strong>{currentScript.targetRuntime}</strong>
                  </span>
                  <span>·</span>
                  <span><strong>{currentScript.wordCount}</strong> words</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard('voice')}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors flex items-center gap-1.5"
                  title="Copy only the voiceover text without camera cues"
                >
                  {copiedType === 'voice' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                  <span>Copy Voiceover</span>
                </button>

                <button
                  onClick={() => copyToClipboard('full')}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors flex items-center gap-1.5"
                  title="Copy full screenplay markdown with B-roll directions"
                >
                  {copiedType === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5 text-slate-600" />}
                  <span>Copy Full Script</span>
                </button>

                <button
                  onClick={downloadScript}
                  className="p-1.5 text-xs font-medium rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors"
                  title="Download .md file"
                >
                  <Download className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>

            {/* Mode 1: Director View with timestamps & B-roll cues */}
            {viewMode === 'director' ? (
              <div className="space-y-3.5">
                {currentScript.beats.map((beat, index) => (
                  <div
                    key={beat.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded text-[11px]">
                          {beat.timeRange}
                        </span>
                        <span className="font-bold text-slate-800">{beat.role}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">Beat #{index + 1}</span>
                    </div>

                    {/* Camera / B-Roll cue */}
                    <div className="text-xs font-mono text-amber-900 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60 flex items-start gap-2">
                      <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{beat.bRollNotes}</span>
                    </div>

                    {/* Spoken voiceover line */}
                    <div className="text-sm text-slate-800 font-sans leading-relaxed pt-1 pl-1">
                      {beat.voiceover}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Mode 2: Interactive Teleprompter */
              <div className="rounded-xl border border-slate-800 bg-slate-950 text-white p-5 space-y-4">
                {/* Teleprompter controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPrompterRunning(!isPrompterRunning)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {isPrompterRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPrompterRunning ? 'Pause' : 'Start Auto-Scroll'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (prompterRef.current) prompterRef.current.scrollTop = 0;
                        setIsPrompterRunning(false);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Reset to Top"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Scroll speed slider */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span>Speed: {scrollSpeed}x</span>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={scrollSpeed}
                      onChange={(e) => setScrollSpeed(Number(e.target.value))}
                      className="w-24 accent-emerald-500"
                    />
                  </div>
                </div>

                {/* Teleprompter scrolling pane */}
                <div
                  ref={prompterRef}
                  className="h-80 overflow-y-auto px-4 py-8 space-y-6 text-xl sm:text-2xl font-medium leading-loose text-slate-200 select-none scroll-smooth"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  <div className="text-center text-xs text-slate-500 uppercase tracking-widest font-mono">
                    --- Teleprompter Ready · Maintain Eye Level ---
                  </div>

                  {currentScript.beats.map((beat) => (
                    <div key={beat.id} className="space-y-1">
                      <div className="text-xs text-emerald-400 font-mono tracking-wider">
                        [{beat.timeRange} · {beat.role}]
                      </div>
                      <p className="text-slate-100">{beat.voiceover}</p>
                    </div>
                  ))}

                  <div className="text-center text-xs text-slate-500 uppercase tracking-widest font-mono pt-12">
                    --- End of Script ---
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. SEO FAQs Section (High Authority JSON-LD Linked) */}
      <FaqSection
        faqs={SEO_DATA.script.faqs}
        toolName="Full Video & Podcast Script Generator"
        howToSteps={SEO_DATA.script.howToSteps}
        competitorComparison={SEO_DATA.script.competitorComparison}
      />
    </div>
  );
};
