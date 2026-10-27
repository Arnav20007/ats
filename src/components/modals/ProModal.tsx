import React, { useState } from 'react';
import { X, Sparkles, Check, ShieldCheck, Zap } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  isPro: boolean;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose, onUpgrade, isPro }) => {
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onUpgrade();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5 text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-2 shadow-xs">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">ATSCheck Pro Lifetime Pass</h3>
          <p className="text-xs text-slate-500">
            One-time micro-payment. Zero recurring subscriptions.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Ad-Free Experience (Removes all sponsor banners)</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Unlimited Audio Shifter rendering & MP3 downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Full export rights for all legal demand letters & video scripts</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Support independent solo developers</span>
          </div>
        </div>

        <div className="flex items-baseline justify-center gap-2">
          <span className="text-3xl font-extrabold font-mono text-slate-900">$2.99</span>
          <span className="text-xs text-slate-400 line-through">$9.99</span>
          <span className="text-xs text-emerald-700 font-mono font-bold">One-time payment</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={processing || isPro}
          className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-200 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          {isPro ? (
            <span>You already own Pro!</span>
          ) : processing ? (
            <span>Processing Instant Unlock...</span>
          ) : (
            <>
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Simulate $2.99 Checkout</span>
            </>
          )}
        </button>

        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>One-time unlock for permanent ad-free use.</span>
        </div>
      </div>
    </div>
  );
};
