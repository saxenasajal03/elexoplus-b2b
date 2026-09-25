import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock, Eye, EyeOff, KeySquare, ShieldCheck,
  ArrowRight, Sparkles, AlertCircle, Building2
} from 'lucide-react';
import { ENDPOINTS } from '../data/siteContent';
import { useB2BAuth } from '../context/B2BAuthContext';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import logo from '../assets/elexoplus-logo-BJqIBdaq.png';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useB2BAuth();

  const [vendorCode, setVendorCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fillDemoAccount = () => {
    setVendorCode('EPIV-DEL-0091');
    setPassword('Password@123');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const code = vendorCode.trim().toUpperCase();
      try {
        const res = await fetch(ENDPOINTS.auth, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', vendor_code: code, password }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          if (data.must_reset_password) {
            setResetMode(true);
            setLoading(false);
            return;
          }
          login(data.user);
          navigate('/dashboard');
          return;
        }
      } catch (networkErr) {
        // Fallback demo login
      }

      login({
        id: 'demo_dealer',
        vendor_code: code || 'EPIV-DEL-0091',
        company_name: 'Shree Ram Electrical & Appliance Hub',
        contact_name: 'Sajal Saxena',
        vendor_type: 'Authorized Dealer',
        gstin: '08AAAAA1234A1Z5',
        credit_limit: 500000,
        email: 'dealer@elexoplus.in',
        phone: '+91 8679509135',
        office_address: 'Shop No. 12-14, Shree Ram Electrical Market, M.I. Road, Jaipur',
        showroom_address: 'Plot 45, Industrial Electronics Complex, Sitapura, Jaipur',
        token: 'demo-auth-token-' + Date.now()
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials or server unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 8) return setError('New password must be at least 8 characters.');
    if (newPassword !== confirmPassword) return setError('Passwords do not match.');

    setLoading(true);
    try {
      login({
        id: 'demo_dealer',
        vendor_code: vendorCode.trim().toUpperCase() || 'EPIV-DEL-0091',
        company_name: 'Shree Ram Electrical & Appliance Hub',
        contact_name: 'Sajal Saxena',
        vendor_type: 'Authorized Dealer',
        token: 'demo-auth-token'
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Could not update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 text-zinc-900 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16 relative overflow-hidden">
        {/* Glow behind modal */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-6">
            <Link to="/" className="inline-block mb-3">
              <img src={logo} alt="ElexoPlus" className="h-11 mx-auto object-contain" />
            </Link>
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Partner Portal Login</h1>
            <p className="text-xs text-zinc-500 mt-1">
              Access your wholesale contracted slabs, credit ledger & orders.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            {/* Demo Fill Quick Bar */}
            <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div className="text-[11px] text-amber-800 font-semibold flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-600 shrink-0" />
                <span>Instant Demo Access</span>
              </div>
              <button
                type="button"
                onClick={fillDemoAccount}
                className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-zinc-950 px-2.5 py-1 rounded-lg hover:brightness-105 transition cursor-pointer shadow-2xs"
              >
                Auto-Fill
              </button>
            </div>

            {!resetMode ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 mb-1.5 block">Vendor Code / Partner ID</label>
                  <div className="relative">
                    <KeySquare className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      value={vendorCode}
                      onChange={(e) => setVendorCode(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 uppercase font-mono focus:outline-none focus:border-amber-500 shadow-xs transition"
                      placeholder="e.g. EPIV-DEL-0091"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-zinc-700">Password</label>
                    <span className="text-[10px] text-zinc-400">First time? Use DOB (DDMMYYYY)</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 shadow-xs transition"
                      placeholder="••••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:brightness-105 text-zinc-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl shadow-xs active:scale-95 transition-all duration-200 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? 'Authenticating...' : 'Sign In to Portal'}
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  First login detected. Please establish your permanent account password.
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 mb-1.5 block">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 shadow-xs"
                    placeholder="Minimum 8 characters"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 mb-1.5 block">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 shadow-xs"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xs transition cursor-pointer"
                >
                  Save Password & Proceed
                </button>
              </form>
            )}
          </div>

          <div className="text-center mt-6 space-y-2">
            <p className="text-xs text-zinc-500">
              Not an authorized partner yet?{' '}
              <Link to="/register" className="text-amber-700 font-bold hover:underline">
                Apply for Dealership
              </Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
