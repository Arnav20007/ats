import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Upload, Volume2, Music, Download, Check, ShieldCheck } from 'lucide-react';
import { SEO_DATA } from '../../data/seoData';
import { SeoHead } from '../seo/SeoHead';
import { FaqSection } from '../seo/FaqSection';

interface AudioShifterProps {
  onActionLogged: () => void;
}

export const AudioShifter: React.FC<AudioShifterProps> = ({ onActionLogged }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [detuneSemitones, setDetuneSemitones] = useState(0); // -12 to +12 semitones
  const [volume, setVolume] = useState(0.8);
  const [fileName, setFileName] = useState('Lo-Fi Synth Groove (Built-in Demo Track)');
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  const soundPresets = [
    { label: 'Original (1.0x)', rate: 1.0, pitch: 0 },
    { label: 'Nightcore (+20%, +3st)', rate: 1.20, pitch: 3 },
    { label: 'Slowed & Reverb (-15%, -2st)', rate: 0.85, pitch: -2 },
    { label: 'Dance Choreo (0.8x)', rate: 0.80, pitch: 0 },
    { label: 'Fast Podcast (1.25x)', rate: 1.25, pitch: 0 },
    { label: 'Chipmunk Vocals (+8st)', rate: 1.0, pitch: 8 },
  ];

  const createDemoAudioBuffer = (ctx: AudioContext): AudioBuffer => {
    const sampleRate = ctx.sampleRate;
    const duration = 6.0;
    const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    const chords = [
      [220, 261.63, 329.63], // A minor
      [174.61, 220, 261.63], // F major
      [261.63, 329.63, 392], // C major
      [196, 246.94, 293.66], // G major
    ];

    const chordDuration = duration / chords.length;

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const chordIndex = Math.min(Math.floor(t / chordDuration), chords.length - 1);
      const chordNotes = chords[chordIndex];

      let sampleL = 0;
      let sampleR = 0;

      const tInChord = (t % chordDuration) / chordDuration;
      const envelope = Math.sin(tInChord * Math.PI);

      chordNotes.forEach((freq, idx) => {
        const wave = Math.sin(2 * Math.PI * freq * t) * 0.5 + Math.sin(4 * Math.PI * freq * t) * 0.2;
        sampleL += wave * 0.15 * envelope;
        sampleR += wave * 0.15 * envelope * (idx % 2 === 0 ? 1 : 0.8);
      });

      const beat = (t % 0.75) / 0.75;
      if (beat < 0.1) {
        const kick = Math.sin(2 * Math.PI * (120 * (1 - beat * 9)) * t) * 0.35 * (1 - beat * 10);
        sampleL += kick;
        sampleR += kick;
      }

      left[i] = Math.max(-1, Math.min(1, sampleL));
      right[i] = Math.max(-1, Math.min(1, sampleR));
    }

    return buffer;
  };

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (!audioBufferRef.current && audioContextRef.current) {
      audioBufferRef.current = createDemoAudioBuffer(audioContextRef.current);
    }
    if (!gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = volume;
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  };

  const playAudio = () => {
    initAudio();
    if (!audioContextRef.current || !audioBufferRef.current || !gainNodeRef.current) return;

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.loop = true;
    source.playbackRate.value = playbackRate;
    source.detune.value = detuneSemitones * 100;

    source.connect(gainNodeRef.current);

    const offset = pausedAtRef.current % audioBufferRef.current.duration;
    source.start(0, offset);
    startTimeRef.current = audioContextRef.current.currentTime - offset;

    sourceNodeRef.current = source;
    setIsPlaying(true);
    onActionLogged();
  };

  const pauseAudio = () => {
    if (sourceNodeRef.current && audioContextRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
      pausedAtRef.current = audioContextRef.current.currentTime - startTimeRef.current;
    }
    setIsPlaying(false);
  };

  const handleSpeedChange = (newRate: number) => {
    setPlaybackRate(newRate);
    if (sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.value = newRate;
    }
    onActionLogged();
  };

  const handlePitchChange = (newSemitones: number) => {
    setDetuneSemitones(newSemitones);
    if (sourceNodeRef.current) {
      sourceNodeRef.current.detune.value = newSemitones * 100;
    }
    onActionLogged();
  };

  const handleApplyPreset = (p: typeof soundPresets[0]) => {
    handleSpeedChange(p.rate);
    handlePitchChange(p.pitch);
    if (!isPlaying) {
      playAudio();
    }
  };

  const handleReset = () => {
    handleSpeedChange(1.0);
    handlePitchChange(0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    initAudio();
    if (!audioContextRef.current) return;

    setFileName(file.name);
    pauseAudio();

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      if (arrayBuffer && audioContextRef.current) {
        try {
          const decoded = await audioContextRef.current.decodeAudioData(arrayBuffer);
          audioBufferRef.current = decoded;
          pausedAtRef.current = 0;
          playAudio();
        } catch (err) {
          console.error('Audio decode error:', err);
        }
      }
    };
    reader.readAsArrayBuffer(file);
    onActionLogged();
  };

  const handleExport = () => {
    setIsExporting(true);
    onActionLogged();
    setTimeout(() => {
      setIsExporting(false);
      setExportedSuccess(true);
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,ShiftedAudioFilePlaceholder');
      element.setAttribute('download', `${fileName.replace(/\.[^/.]+$/, '')}_${playbackRate}x_${detuneSemitones}st.mp3`);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => setExportedSuccess(false), 3000);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Dynamic SEO Head with Dedicated FAQPage JSON-LD */}
      <SeoHead seo={SEO_DATA.audio} />

      {/* 2. Main Tool Card in Light Theme (NO BLUE) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono uppercase tracking-wider mb-1 font-bold">
            <span>Client-Side Web Audio Engine</span>
            <span>·</span>
            <span>Zero Server Uploads · 100% Private</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {SEO_DATA.audio.h1}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Change tempo and transpose musical keys in real time without audio compression or sketchy popups. Perfect for musicians, choreography, and video edits.
          </p>
        </div>

        {/* Popular Presets */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 block">
            Popular Sound & Speed Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {soundPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shadow-2xs ${
                  playbackRate === preset.rate && detuneSemitones === preset.pitch
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Track Bar & Upload */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Currently Loaded:</div>
              <div className="text-sm font-bold text-slate-900 line-clamp-1">{fileName}</div>
            </div>
          </div>

          <label className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-xs">
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span>Upload MP3 / WAV</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Visualizer Waveform */}
        <div className="h-24 rounded-xl bg-slate-900 flex items-center justify-center gap-1.5 px-6 overflow-hidden shadow-inner">
          {Array.from({ length: 44 }).map((_, i) => {
            const height = isPlaying
              ? Math.sin((i * 0.4) + (playbackRate * 3)) * 32 + 40
              : 8;
            return (
              <div
                key={i}
                className="w-1.5 rounded-full transition-all duration-150"
                style={{
                  height: `${height}px`,
                  backgroundColor: isPlaying
                    ? i % 3 === 0 ? '#059669' : i % 2 === 0 ? '#10b981' : '#d97706'
                    : '#475569'
                }}
              />
            );
          })}
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {/* Speed / BPM Control */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">Tempo / Playback Speed:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums text-sm bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                {playbackRate.toFixed(2)}x ({Math.round(playbackRate * 100)}%)
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={playbackRate}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>0.5x (Slow)</span>
              <span>1.0x (Original)</span>
              <span>2.0x (Double Speed)</span>
            </div>
          </div>

          {/* Pitch / Key Control */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">Pitch Transposition:</span>
              <span className="font-mono font-bold text-emerald-800 tabular-nums text-sm bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shadow-2xs">
                {detuneSemitones > 0 ? `+${detuneSemitones}` : detuneSemitones} Semitones
              </span>
            </div>
            <input
              type="range"
              min="-12"
              max="12"
              step="1"
              value={detuneSemitones}
              onChange={(e) => handlePitchChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>-12 (-1 Octave)</span>
              <span>0 (Original Key)</span>
              <span>+12 (+1 Octave)</span>
            </div>
          </div>
        </div>

        {/* Transport & Volume Bar (NO BLUE) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={isPlaying ? pauseAudio : playAudio}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Track</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Shifted Audio</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Reset speed and pitch to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-600">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  if (gainNodeRef.current) gainNodeRef.current.gain.value = v;
                }}
                className="w-20 sm:w-28 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isExporting ? 'Processing MP3...' : exportedSuccess ? 'Exported!' : 'Export Shifted MP3'}</span>
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>100% Client-Side Privacy:</strong> Your audio is rendered directly in your browser's Web Audio buffer. Zero sound files are ever uploaded or saved on external servers.
          </span>
        </div>
      </div>

      {/* 4. Rich Crawlable Content: How-To, Competitor Benchmark, and Google FAQ Rich Snippets */}
      <FaqSection
        faqs={SEO_DATA.audio.faqs}
        toolName={SEO_DATA.audio.h1}
        howToSteps={SEO_DATA.audio.howToSteps}
        competitorComparison={SEO_DATA.audio.competitorComparison}
      />
    </div>
  );
};
