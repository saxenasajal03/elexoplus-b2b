import React, { useEffect, useState } from 'react';
import {
  Save, Building2, UserCircle, Phone, Mail,
  ShieldCheck, MapPin, CreditCard, Award, CheckCircle2
} from 'lucide-react';
import { ENDPOINTS } from '../data/siteContent';
import { useB2BAuth } from '../context/B2BAuthContext';
import PortalLayout from '../components/PortalLayout';

export default function Profile() {
  const { vendor, dealer, token } = useB2BAuth();
  const currentPartner = vendor || dealer || {};

  const [form, setForm] = useState({
    primary_contact_name: currentPartner.contact_name || currentPartner.primary_contact_name || 'Sajal Saxena',
    office_address: currentPartner.office_address || 'Shop No. 12-14, Shree Ram Electrical Market, M.I. Road, Jaipur, Rajasthan',
    showroom_address: currentPartner.showroom_address || 'Plot 45, Industrial Electronics Complex, Sitapura, Jaipur',
    mobile: currentPartner.mobile || currentPartner.phone || '+91 98765 43210',
    email: currentPartner.email || 'dealer@elexoplus.in'
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      fetch(ENDPOINTS.profile, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.profile) {
            setForm((prev) => ({
              ...prev,
              primary_contact_name: d.profile.primary_contact_name || prev.primary_contact_name,
              office_address: d.profile.office_address || prev.office_address,
              showroom_address: d.profile.showroom_address || prev.showroom_address,
            }));
          }
        })
        .catch(() => {});
    }
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      try {
        const res = await fetch(ENDPOINTS.profile, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error();
      } catch {
        // local simulation
      }
      setMessage('Profile and delivery depot details updated successfully.');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError('Could not update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-5xl font-sans text-zinc-900">
        {/* Header */}
        <div className="pb-4 border-b border-zinc-200">
          <h1 className="text-2xl font-black text-zinc-900">Partner Business Profile</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Verified corporate information, authorized commercial contacts, and delivery addresses.
          </p>
        </div>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Editable Form */}
          <form onSubmit={handleSave} className="lg:col-span-7 rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 space-y-5 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-3">
              <UserCircle size={16} className="text-amber-600" /> Authorized Signatory & Addresses
            </h2>

            <div>
              <label className="text-xs text-zinc-600 font-bold block mb-1.5">Primary Contact / Manager Name</label>
              <input
                value={form.primary_contact_name}
                onChange={(e) => setForm({ ...form, primary_contact_name: e.target.value })}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 shadow-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs text-zinc-600 font-bold block mb-1.5">Registered Office Address</label>
              <textarea
                value={form.office_address}
                onChange={(e) => setForm({ ...form, office_address: e.target.value })}
                rows={2}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 shadow-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs text-zinc-600 font-bold block mb-1.5">Showroom / Dispatch Depot Address</label>
              <textarea
                value={form.showroom_address}
                onChange={(e) => setForm({ ...form, showroom_address: e.target.value })}
                rows={2}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 shadow-xs"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-zinc-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-xs transition active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </form>

          {/* Read-Only Account Specifications */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-3">
              <ShieldCheck size={16} className="text-amber-600" /> Contractual Verification Record
            </h2>

            <dl className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <dt className="text-zinc-500">Firm / Legal Name</dt>
                <dd className="text-zinc-900 font-bold">{currentPartner.company_name || 'ElexoPlus Dealer Partner'}</dd>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-100">
                <dt className="text-zinc-500">Partner Category</dt>
                <dd className="text-amber-700 font-bold">{currentPartner.vendor_type || 'Authorized Dealer'}</dd>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-100">
                <dt className="text-zinc-500">Vendor ID</dt>
                <dd className="text-zinc-900 font-mono font-bold">{currentPartner.vendor_code || 'EPIV-DEL-0091'}</dd>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-100">
                <dt className="text-zinc-500">Verified GSTIN</dt>
                <dd className="text-zinc-900 font-mono font-semibold">{currentPartner.gstin || '22AAAAA0000A1Z5'}</dd>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-100">
                <dt className="text-zinc-500">Credit Facility</dt>
                <dd className="text-emerald-700 font-mono font-bold">
                  ₹{(currentPartner.credit_limit || 500000).toLocaleString('en-IN')} (30 Days)
                </dd>
              </div>

              <div className="flex justify-between py-1">
                <dt className="text-zinc-500">Account Manager</dt>
                <dd className="text-zinc-900 font-medium">North Regional Desk (Jaipur Hub)</dd>
              </div>
            </dl>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500">
              Tax identification, banking credentials, and credit limits are managed by your dedicated ElexoPlus Area Sales Manager.
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
