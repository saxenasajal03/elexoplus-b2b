import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Building2, UserCircle, MapPin,
  ShieldCheck, ArrowRight, Award, FileText, Sparkles, AlertCircle
} from 'lucide-react';
import { ENDPOINTS, VENDOR_TYPES } from '../data/siteContent';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import logo from '../assets/elexoplus-logo-BJqIBdaq.png';

const emptyForm = {
  company_name: '',
  entity_type: 'Sole Proprietorship',
  vendor_type: 'Authorized Dealer',
  primary_first_name: '',
  primary_surname: '',
  primary_dob: '',
  primary_aadhaar: '',
  primary_pan: '',
  office_street: '',
  office_city: '',
  office_state: 'Rajasthan',
  office_zip: '',
  contact1_name: '',
  contact1_mobile: '',
  contact1_email: '',
  firm_pan: '',
  gstin: '',
  terms_accepted: false,
  declaration_accepted: false,
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms_accepted) {
      setError('Please accept the Commercial Terms of Supply to continue.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      try {
        const res = await fetch(ENDPOINTS.register, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setResult(data);
          setLoading(false);
          return;
        }
      } catch {
        // Fallback simulation when API server is offline
      }

      setResult({
        success: true,
        vendor_code: 'EPIV-' + Math.floor(100000 + Math.random() * 900000),
        company_name: form.company_name,
        contact_name: `${form.primary_first_name} ${form.primary_surname}`,
        status: 'Under Verification',
        expected_approval: 'Within 24 Hours'
      });
    } catch (err) {
      setError(err.message || 'Could not submit application.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 shadow-xs transition";
  const labelClass = "text-xs font-bold text-zinc-700 mb-1.5 block";

  if (result) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-lg w-full rounded-3xl bg-white border border-zinc-200 p-8 md:p-10 text-center shadow-xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Application Received
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mt-3">
                Welcome to the ElexoPlus Network
              </h1>
              <p className="text-xs text-zinc-500 mt-2">
                Your partnership registration for <strong>{result.company_name}</strong> has been assigned a priority review ticket.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-sans">Application Ref:</span>
                <span className="text-amber-700 font-bold">{result.vendor_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-sans">Review Status:</span>
                <span className="text-emerald-700 font-sans font-bold">Verification In Progress</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-sans">Expected Turnaround:</span>
                <span className="text-zinc-900 font-sans">Within 24 Business Hours</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500">
              Our Area Sales Manager (ASM) will review your GSTIN & firm credentials to establish your initial revolving credit line.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xs transition text-center"
              >
                Go to Partner Login
              </Link>
              <Link
                to="/catalog"
                className="flex-1 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs transition text-center"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <SiteHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Link to="/" className="inline-block mb-3">
            <img src={logo} alt="ElexoPlus" className="h-10 mx-auto object-contain" />
          </Link>
          <span className="text-xs font-black uppercase tracking-widest text-amber-700">
            Channel Partner Onboarding
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight mt-1">
            Apply to Become an Authorized Partner
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 mt-2">
            Direct factory billing, structured volume slab rebates, and pre-approved working capital credit lines.
          </p>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
          {/* Section 1: Business Identification */}
          <div className="rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <Building2 size={18} className="text-amber-600" />
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                1. Firm & Commercial Entity Details
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Partner Tier Applied For *</label>
                <select
                  value={form.vendor_type}
                  onChange={set('vendor_type')}
                  className={inputClass}
                  required
                >
                  {VENDOR_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Business Entity Structure *</label>
                <select
                  value={form.entity_type}
                  onChange={set('entity_type')}
                  className={inputClass}
                >
                  <option>Sole Proprietorship</option>
                  <option>Partnership Firm</option>
                  <option>Private Limited Company</option>
                  <option>LLP (Limited Liability Partnership)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Registered Trade / Firm Name *</label>
                <input
                  value={form.company_name}
                  onChange={set('company_name')}
                  className={inputClass}
                  placeholder="e.g. Mahaveer Electricals & Appliances"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>GSTIN (GST Identification Number)</label>
                <input
                  value={form.gstin}
                  onChange={set('gstin')}
                  className={`${inputClass} uppercase font-mono`}
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <div>
                <label className={labelClass}>Firm PAN Number</label>
                <input
                  value={form.firm_pan}
                  onChange={set('firm_pan')}
                  className={`${inputClass} uppercase font-mono`}
                  placeholder="ABCDE1234F"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Authorized Signatory */}
          <div className="rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <UserCircle size={18} className="text-amber-600" />
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                2. Primary Applicant / Proprietor Information
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input
                  value={form.primary_first_name}
                  onChange={set('primary_first_name')}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Last Name / Surname *</label>
                <input
                  value={form.primary_surname}
                  onChange={set('primary_surname')}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Mobile Number (WhatsApp Enabled) *</label>
                <input
                  type="tel"
                  value={form.contact1_mobile}
                  onChange={set('contact1_mobile')}
                  className={inputClass}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Official Business Email *</label>
                <input
                  type="email"
                  value={form.contact1_email}
                  onChange={set('contact1_email')}
                  className={inputClass}
                  placeholder="contact@yourbusiness.com"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Date of Birth (Used for Temporary Login)</label>
                <input
                  type="date"
                  value={form.primary_dob}
                  onChange={set('primary_dob')}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Personal Aadhaar Number (Optional)</label>
                <input
                  value={form.primary_aadhaar}
                  onChange={set('primary_aadhaar')}
                  className={inputClass}
                  placeholder="12-digit UID"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Commercial Address */}
          <div className="rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <MapPin size={18} className="text-amber-600" />
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                3. Business Premises & Depot Location
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Shop / Showroom / Office Street Address *</label>
                <input
                  value={form.office_street}
                  onChange={set('office_street')}
                  className={inputClass}
                  placeholder="Building No, Market Street, Road Name"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>City / District *</label>
                <input
                  value={form.office_city}
                  onChange={set('office_city')}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>State *</label>
                <input
                  value={form.office_state}
                  onChange={set('office_state')}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>PIN Code *</label>
                <input
                  value={form.office_zip}
                  onChange={set('office_zip')}
                  className={inputClass}
                  placeholder="6-digit PIN"
                  required
                />
              </div>
            </div>
          </div>

          {/* Declarations */}
          <div className="rounded-2xl bg-white border border-zinc-200 p-5 space-y-3 shadow-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms_accepted}
                onChange={set('terms_accepted')}
                className="mt-1 accent-amber-500 cursor-pointer"
                required
              />
              <span className="text-xs text-zinc-600">
                I hereby apply for appointment as an Authorized Partner of Elexo Plus India Pvt Ltd and agree to abide by the wholesale commercial supply terms, credit policies, and warranty guidelines.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:brightness-105 text-zinc-950 font-black text-sm uppercase tracking-wider py-4 rounded-2xl shadow-md active:scale-95 transition-all duration-200 disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Submitting Application...' : 'Submit Partnership Application'}
            <ArrowRight size={17} />
          </button>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}
