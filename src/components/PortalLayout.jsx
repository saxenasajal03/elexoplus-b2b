import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, ClipboardList,
  UserCircle, LogOut, Menu, X, FileText, ChevronRight,
  Wallet, CreditCard, Sparkles, ExternalLink, ShieldCheck
} from 'lucide-react';
import { useB2BAuth } from '../context/B2BAuthContext';
import { useB2BCart } from '../context/B2BCartContext';
import { D2C_STORE_URL } from '../data/siteContent';
import logo from '../assets/elexoplus-logo-BJqIBdaq.png';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/catalog', label: 'Product Catalog', icon: Package },
  { to: '/orders', label: 'Orders & Tracking', icon: ClipboardList },
  { to: '/documents', label: 'KYC Documents', icon: FileText },
  { to: '/profile', label: 'Business Profile', icon: UserCircle },
];

export default function PortalLayout({ children }) {
  const { vendor, dealer, logout } = useB2BAuth();
  const currentPartner = vendor || dealer;
  const { itemCount } = useB2BCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavList = () => (
    <nav className="flex-1 px-3 py-4 space-y-1 font-sans">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 group ${
              isActive
                ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-xs'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-transparent'
            }`
          }
        >
          <div className="flex items-center gap-3">
            <Icon size={17} className="transition-transform group-hover:scale-110 text-zinc-500 group-hover:text-amber-600" />
            <span>{label}</span>
          </div>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
        </NavLink>
      ))}

      {/* D2C Quick Link */}
      <div className="pt-4 mt-4 border-t border-zinc-200">
        <a
          href={D2C_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-zinc-600 hover:text-amber-700 hover:bg-amber-50/50 transition font-medium"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" />
            <span>D2C Consumer Store</span>
          </span>
          <ExternalLink size={12} />
        </a>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-zinc-200 bg-white">
        {/* Brand Logo */}
        <div className="px-5 py-5 border-b border-zinc-200 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ElexoPlus" className="h-8 w-auto object-contain" />
          </Link>
          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-300">
            B2B
          </span>
        </div>

        {/* Partner Identity Card */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-zinc-50 border border-zinc-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-950 font-black flex items-center justify-center text-sm shadow-xs">
              {currentPartner?.company_name ? currentPartner.company_name.charAt(0).toUpperCase() : 'P'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-zinc-900 truncate">
                {currentPartner?.company_name || currentPartner?.contact_name || 'Authorized Partner'}
              </div>
              <div className="text-[10px] text-amber-600 font-mono font-bold flex items-center gap-1">
                <ShieldCheck size={11} /> {currentPartner?.vendor_code || 'VERIFIED DEALER'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <NavList />

        {/* User logout bottom strip */}
        <div className="p-4 border-t border-zinc-200">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-600 hover:bg-rose-50 hover:text-rose-600 border border-transparent transition-all cursor-pointer"
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fadeIn">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white border-r border-zinc-200 flex flex-col shadow-2xl animate-slideUp text-zinc-900">
            <div className="px-5 py-5 border-b border-zinc-200 flex items-center justify-between">
              <img src={logo} alt="ElexoPlus" className="h-8 object-contain" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-100 text-zinc-500 hover:text-zinc-900"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 mx-3 my-2 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="text-xs font-bold text-zinc-900 truncate">
                {currentPartner?.company_name || 'Partner Account'}
              </div>
              <div className="text-[10px] text-amber-600 font-mono font-bold mt-0.5">
                {currentPartner?.vendor_code || 'VERIFIED'}
              </div>
            </div>
            <NavList />
            <div className="p-4 border-t border-zinc-200">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-200 bg-white/90 backdrop-blur-md px-4 py-3.5 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-zinc-500">
                Dealer Distribution Network
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Quick Cart Pill */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-amber-600 hover:border-amber-300 transition"
            >
              <ShoppingCart size={17} className="text-amber-600" />
              <span className="text-xs font-bold hidden sm:inline">Dealer Cart</span>
              {itemCount > 0 ? (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  {itemCount}
                </span>
              ) : (
                <span className="text-zinc-400 text-xs">0</span>
              )}
            </Link>

            {/* Quick Profile Pill */}
            <Link
              to="/profile"
              className="flex items-center gap-2 py-1 px-2.5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                <UserCircle size={15} />
              </div>
              <span className="text-xs text-zinc-800 font-semibold hidden sm:inline truncate max-w-[130px]">
                {currentPartner?.contact_name || currentPartner?.firm_name || 'My Account'}
              </span>
            </Link>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
