import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Clock, ShieldCheck, CheckCircle2, Send, HelpCircle } from 'lucide-react';
import { useToast } from '../components/Toast';

interface ContactPageProps {
  onNavigateHome: () => void;
  onNavigatePrivacy: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onNavigatePrivacy,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Feedback', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setSubmitted(true);
    showToast('Your message has been sent. Thank you!', 'success');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-12 animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Resume Checker</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            PAGE: /CONTACT
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <Mail className="w-3.5 h-3.5" />
            <span>Human Support & Feedback</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Contact & Support
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl">
            Have a question, feature idea, bug report, or need assistance? We are here to help and reply promptly.
          </p>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Direct Email</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              General inquiries, partnerships, and technical questions:
            </p>
            <a
              href="mailto:hello@toolforge.app"
              className="inline-block text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              hello@toolforge.app
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Response Time</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              We usually respond within <strong>12 to 24 hours</strong>, Monday through Saturday.
            </p>
            <span className="inline-block text-xs font-semibold text-slate-500">
              Priority for bug reports
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Privacy Guarantee</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              Messages submitted here are used solely to assist you. Never shared with marketers.
            </p>
            <button
              onClick={onNavigatePrivacy}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
            >
              Read Privacy Policy →
            </button>
          </div>
        </div>

        {/* Message Form & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Send Us a Note</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                Let us know what you think, report an issue, or request a new parser feature.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-sm mx-auto">
                  Thank you for reaching out. We will review your note and get back to you at <strong>{formData.email || 'your email'}</strong> if a reply is needed.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
                  }}
                  className="text-xs font-bold text-emerald-800 dark:text-emerald-300 underline pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="Feedback">Product Feedback</option>
                    <option value="Bug">Bug Report / Parsing Error</option>
                    <option value="Feature">Feature Request</option>
                    <option value="Privacy">Privacy Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick FAQ summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Frequently Asked Support Questions</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-zinc-200">Is my resume uploaded to your servers?</h4>
                  <p className="text-slate-500 dark:text-zinc-400 pt-0.5 leading-relaxed">
                    No. Parsing runs 100% locally on your machine using PDF.js. Your resume never leaves your browser.
                  </p>
                </div>
                <div className="border-t border-slate-100 dark:border-zinc-800 pt-3">
                  <h4 className="font-bold text-slate-800 dark:text-zinc-200">Why was a bullet point flagged?</h4>
                  <p className="text-slate-500 dark:text-zinc-400 pt-0.5 leading-relaxed">
                    ATS systems favor Google X-Y-Z statements with measurable metrics (e.g. percentages, dollars, or time saved).
                  </p>
                </div>
                <div className="border-t border-slate-100 dark:border-zinc-800 pt-3">
                  <h4 className="font-bold text-slate-800 dark:text-zinc-200">Can I request a new role sample?</h4>
                  <p className="text-slate-500 dark:text-zinc-400 pt-0.5 leading-relaxed">
                    Yes! Send us a note using this form and our engineering team will add it to the library.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
