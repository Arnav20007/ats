import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Mail, ShieldAlert } from 'lucide-react';
import { SEO_DATA } from '../../data/seoData';
import { SeoHead } from '../seo/SeoHead';
import { FaqSection } from '../seo/FaqSection';

interface InvoiceDemandGeneratorProps {
  onActionLogged: () => void;
}

export const InvoiceDemandGenerator: React.FC<InvoiceDemandGeneratorProps> = ({ onActionLogged }) => {
  const [clientName, setClientName] = useState('Acme Marketing Corp');
  const [clientContact, setClientContact] = useState('John Doe (Accounts Payable)');
  const [freelancerName, setFreelancerName] = useState('Alex Rivers');
  const [amount, setAmount] = useState('2450.00');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-084');
  const [dueDate, setDueDate] = useState('2026-09-15');
  const [jurisdiction, setJurisdiction] = useState<'us' | 'uk' | 'eu'>('us');
  const [stage, setStage] = useState<'reminder' | 'overdue' | 'final_legal'>('overdue');
  const [paymentLink, setPaymentLink] = useState('https://buy.stripe.com/demo_inv_alex');
  const [copied, setCopied] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);

  const principalNum = parseFloat(amount || '0');
  let lateFeeAmount = '0.00';
  let legalCitation = '';

  if (jurisdiction === 'us') {
    lateFeeAmount = (principalNum * 0.015 * (stage === 'final_legal' ? 2 : 1)).toFixed(2);
    legalCitation = 'Standard Commercial Payment Terms (18% Annualized Assessment)';
  } else if (jurisdiction === 'uk') {
    lateFeeAmount = ((principalNum * 0.1325 / 12) + 70).toFixed(2);
    legalCitation = 'UK Late Payment of Commercial Debts (Interest) Act 1998';
  } else {
    lateFeeAmount = (principalNum * 0.08 / 12 * (stage === 'final_legal' ? 2 : 1) + 40).toFixed(2);
    legalCitation = 'EU Late Payment Directive 2011/7/EU';
  }

  const totalAmountWithFees = (principalNum + (stage !== 'reminder' ? parseFloat(lateFeeAmount) : 0)).toFixed(2);

  const getSubjectLine = () => {
    if (stage === 'reminder') return `Friendly Follow-Up: Invoice ${invoiceNumber} Outstanding ($${amount})`;
    if (stage === 'overdue') return `SECOND NOTICE: Immediate Payment Required for Invoice ${invoiceNumber} (Past Due)`;
    return `FINAL NOTICE BEFORE LEGAL ARBITRATION: Delinquent Invoice ${invoiceNumber} ($${totalAmountWithFees})`;
  };

  const generateLetterContent = () => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const subject = getSubjectLine();

    if (stage === 'reminder') {
      return `Date: ${today}

To: ${clientContact}
Company: ${clientName}

Subject: ${subject}

Dear ${clientContact},

I hope this message finds you well.

This is a gentle reminder regarding Invoice ${invoiceNumber} for $${amount}, which was due on ${dueDate} for completed project deliverables.

Could you please confirm if this invoice has been processed for payment, or if you need me to resend the payment details?

You can complete payment directly via:
${paymentLink}

Thank you for your prompt attention. I look forward to your confirmation.

Sincerely,
${freelancerName}`;
    }

    if (stage === 'overdue') {
      return `Date: ${today}

To: ${clientContact}
Company: ${clientName}

Subject: ${subject}

Dear ${clientContact},

Despite our prior correspondence, Invoice ${invoiceNumber} in the amount of $${amount} remains unpaid. It is now past its contracted due date of ${dueDate}.

In accordance with ${legalCitation}, statutory late fee assessment of $${lateFeeAmount} has been applied, bringing the current balance due to $${totalAmountWithFees}.

Please ensure this balance is settled within five (5) business days to prevent revocation of delivered asset licenses and further statutory penalties.

Remittance Link:
${paymentLink}

Please reply with the remittance transaction number once processed.

Best regards,
${freelancerName}`;
    }

    return `FORMAL NOTICE OF INTENT TO INITIATE LEGAL ACTION & DEBT ARBITRATION

Date: ${today}
VIA CERTIFIED ELECTRONIC TRANSMISSION & REGISTERED DISPATCH

To: ${clientContact}
Company: ${clientName}

SUBJECT: ${subject}

Dear ${clientContact},

This document serves as formal and final demand for payment regarding delinquent Invoice ${invoiceNumber}, originally due on ${dueDate}.

Principal Claim: $${amount}
Accrued Statutory Interest & Recovery Costs: $${lateFeeAmount} (${legalCitation})
TOTAL DELINQUENT BALANCE DUE: $${totalAmountWithFees}

Despite multiple prior notices, this invoice has not been cured. Take formal notice that if the balance of $${totalAmountWithFees} is not remitted in full within seven (7) business days, I will immediately initiate:
1. Filing with the Commercial Small Claims Tribunal / Arbitration in the governing jurisdiction;
2. Formal derogatory reporting to commercial credit reporting agencies (Dun & Bradstreet, Experian Business);
3. Immediate cease-and-desist enforcement revoking all copyright and usage licenses for work delivered under this invoice.

You may cure this default immediately via electronic remittance:
${paymentLink}

Govern yourself accordingly.

${freelancerName}`;
  };

  const letterText = generateLetterContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    onActionLogged();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySubject = () => {
    navigator.clipboard.writeText(getSubjectLine());
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([letterText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Demand_Letter_${invoiceNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onActionLogged();
  };

  return (
    <div className="space-y-6">
      {/* 1. Dynamic SEO Head with Dedicated FAQPage JSON-LD */}
      <SeoHead seo={SEO_DATA.invoice} />

      {/* 2. Main Tool Card in Light Theme (NO BLUE) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono uppercase tracking-wider mb-1 font-bold">
            <span>Freelancer & Agency Financial Shield</span>
            <span>·</span>
            <span>Statutory Compliance Form</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {SEO_DATA.invoice.h1}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Generate legally structured, firm demand letters for unpaid client invoices with statutory late fees and escalation clauses.
          </p>
        </div>

        {/* Inputs Console */}
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Client Company / Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Attention / Contact</label>
              <input
                type="text"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Agency</label>
              <input
                type="text"
                value={freelancerName}
                onChange={(e) => setFreelancerName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice Number</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Original Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Principal Amount ($ USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono"
              />
            </div>
          </div>

          {/* Legal Jurisdiction */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-600 font-medium">Jurisdiction:</span>
              <button
                onClick={() => setJurisdiction('us')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${jurisdiction === 'us' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-700'}`}
              >
                US Commercial (1.5%/mo)
              </button>
              <button
                onClick={() => setJurisdiction('uk')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${jurisdiction === 'uk' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-700'}`}
              >
                UK Statutory (Act 1998)
              </button>
              <button
                onClick={() => setJurisdiction('eu')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${jurisdiction === 'eu' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-700'}`}
              >
                EU Directive 2011/7
              </button>
            </div>

            <div className="text-xs font-mono text-slate-700">
              Total Delinquent Claim: <span className="text-emerald-700 font-bold text-sm">${totalAmountWithFees}</span>
            </div>
          </div>

          {/* Severity Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200 text-xs">
            <span className="text-slate-600 font-medium mr-1">Escalation Stage:</span>
            <button
              onClick={() => { setStage('reminder'); onActionLogged(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                stage === 'reminder' ? 'bg-slate-900 text-white shadow-xs font-bold' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              7 Days Overdue (Gentle Follow-Up)
            </button>
            <button
              onClick={() => { setStage('overdue'); onActionLogged(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                stage === 'overdue' ? 'bg-amber-600 text-white shadow-xs font-bold' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              14–30 Days (Late Fee Notice)
            </button>
            <button
              onClick={() => { setStage('final_legal'); onActionLogged(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                stage === 'final_legal' ? 'bg-rose-700 text-white shadow-xs font-bold' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              60+ Days (Final Legal Demand)
            </button>
          </div>
        </div>

        {/* Email Subject Line Quick Copy */}
        <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-900 truncate">
            <Mail className="w-4 h-4 text-slate-700 shrink-0" />
            <span className="font-bold">Email Subject:</span>
            <span className="truncate text-slate-700">{getSubjectLine()}</span>
          </div>
          <button
            onClick={handleCopySubject}
            className="px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold border border-slate-300 transition-colors shrink-0 shadow-2xs"
          >
            {copiedSubject ? 'Copied Subject!' : 'Copy Subject'}
          </button>
        </div>

        {/* Generated Letter Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <FileText className="w-4 h-4 text-slate-700" />
              <span>Full Formatted Legal Notice</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-700" />
                <span>Download .TXT</span>
              </button>

              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs ${
                  copied ? 'bg-emerald-600 text-white' : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Notice!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Letter</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed whitespace-pre-wrap select-all overflow-x-auto shadow-inner">
            {letterText}
          </pre>
        </div>
      </div>

      {/* 4. Rich Crawlable Content: How-To, Competitor Benchmark, and Google FAQ Rich Snippets */}
      <FaqSection
        faqs={SEO_DATA.invoice.faqs}
        toolName={SEO_DATA.invoice.h1}
        howToSteps={SEO_DATA.invoice.howToSteps}
        competitorComparison={SEO_DATA.invoice.competitorComparison}
      />
    </div>
  );
};
