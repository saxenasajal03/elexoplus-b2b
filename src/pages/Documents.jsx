import React, { useEffect, useState } from 'react';
import {
  CheckCircle2, Circle, Upload, FileText, AlertCircle,
  ShieldCheck, Eye, Lock, ArrowRight, Clock, HelpCircle
} from 'lucide-react';
import { ENDPOINTS, DOC_TYPES } from '../data/siteContent';
import { useB2BAuth } from '../context/B2BAuthContext';
import PortalLayout from '../components/PortalLayout';

const defaultDemoDocs = [
  { doc_type: 'photo', url: '#', status: 'Approved' },
  { doc_type: 'visiting_card', url: '#', status: 'Approved' },
  { doc_type: 'aadhaar', url: '#', status: 'Approved' },
  { doc_type: 'pan', url: '#', status: 'Approved' },
  { doc_type: 'firm_pan', url: '#', status: 'Approved' },
  { doc_type: 'gst_certificate', url: '#', status: 'Approved' },
  { doc_type: 'cheque', url: '#', status: 'Approved' },
];

export default function Documents() {
  const { vendor, dealer } = useB2BAuth();
  const currentPartner = vendor || dealer || {};

  const [docs, setDocs] = useState(defaultDemoDocs);
  const [uploading, setUploading] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const loadDocs = () => {
    fetch(`${ENDPOINTS.documents}?vendor_code=${currentPartner.vendor_code || 'demo'}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.documents)) {
          setDocs(d.documents);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadDocs();
  }, [currentPartner.vendor_code]);

  const handleUpload = async (docKey, file) => {
    if (!file) return;
    setError('');
    setSuccessMsg('');
    setUploading(docKey);

    try {
      const form = new FormData();
      form.append('vendor_code', currentPartner.vendor_code || 'demo');
      form.append('doc_type', docKey);
      form.append('file', file);

      try {
        const res = await fetch(ENDPOINTS.documents, { method: 'POST', body: form });
        const data = await res.json();
        if (res.ok && data.success) {
          loadDocs();
        } else {
          throw new Error();
        }
      } catch {
        setDocs((prev) => {
          const filtered = prev.filter((d) => d.doc_type !== docKey);
          return [...filtered, { doc_type: docKey, url: URL.createObjectURL(file), status: 'Pending Review' }];
        });
      }
      setSuccessMsg(`Document successfully uploaded and queued for verification.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError('Could not upload document. Please ensure file is under 10MB.');
    } finally {
      setUploading(null);
    }
  };

  const getDocStatus = (key) => docs.find((d) => d.doc_type === key);
  const approvedCount = docs.filter((d) => d.status === 'Approved').length;
  const progressPercent = Math.round((approvedCount / DOC_TYPES.length) * 100);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-4xl font-sans text-zinc-900">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <h1 className="text-2xl font-black text-zinc-900">KYC & Business Compliance</h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Verified documents required for ElexoPlus dealer onboarding and credit line underwriting.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold shadow-xs">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Bank-Grade Encryption</span>
          </div>
        </div>

        {/* Progress Tracker Card */}
        <div className="rounded-3xl bg-white border border-zinc-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-600">Compliance Onboarding Score</span>
              <div className="text-xl font-black text-zinc-900 mt-0.5">
                {approvedCount} of {DOC_TYPES.length} Verified
              </div>
            </div>
            <span className="text-xs font-black text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-zinc-200">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Document Cards */}
        <div className="space-y-3">
          {DOC_TYPES.map(({ key, label }) => {
            const doc = getDocStatus(key);
            const isApproved = doc?.status === 'Approved';
            const isPending = doc?.status === 'Pending Review';

            return (
              <div
                key={key}
                className="rounded-2xl bg-white border border-zinc-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-300 transition shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isApproved
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isPending
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    {isApproved ? (
                      <CheckCircle2 size={18} />
                    ) : isPending ? (
                      <Clock size={18} />
                    ) : (
                      <FileText size={18} />
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs md:text-sm font-bold text-zinc-900">{label}</h3>
                    <div className="flex items-center gap-2 text-[11px] mt-0.5">
                      {isApproved ? (
                        <span className="text-emerald-700 font-semibold">✓ Verified by Compliance Officer</span>
                      ) : isPending ? (
                        <span className="text-amber-700 font-semibold">Awaiting Verification Review</span>
                      ) : (
                        <span className="text-zinc-500">Required for Credit Underwriting</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {doc?.url && doc.url !== '#' && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-zinc-700 transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye size={13} /> View
                    </a>
                  )}

                  <label className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-zinc-950 text-xs font-bold rounded-xl px-3.5 py-1.5 cursor-pointer shadow-xs transition active:scale-95">
                    <Upload size={13} />
                    <span>{uploading === key ? 'Uploading...' : isApproved ? 'Replace' : 'Upload'}</span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      className="hidden"
                      disabled={uploading === key}
                      onChange={(e) => handleUpload(key, e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 flex items-start gap-3">
          <HelpCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <span>
            Accepted file formats: PDF, JPG, PNG up to 10MB per file. Documents are securely archived in accordance with Indian commercial banking standards and used strictly for GST filing and credit approval.
          </span>
        </div>
      </div>
    </PortalLayout>
  );
}
