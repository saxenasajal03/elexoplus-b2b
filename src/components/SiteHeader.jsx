import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Menu, X, UserCircle, LogOut, ShoppingCart, ExternalLink,
  ChevronDown, ShieldCheck, FileText, Package, LayoutDashboard,
  Percent, Sparkles, Building2, PhoneCall
} from 'lucide-react';
import { useB2BAuth } from '../context/B2BAuthContext';
import { useB2BCart } from '../context/B2BCartContext';
import { D2C_STORE_URL } from '../data/siteContent';
import logo from '../assets/elexoplus-logo-BJqIBdaq.png';

export default function SiteHeader() {
  const { vendor, logout, isAuthenticated } = useB2BAuth();
  const { itemCount } = useB2BCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-bold transition-all duration-200 px-3.5 py-2 rounded-xl ${
      isActive
        ? 'text-amber-600 bg-amber-50 shadow-xs'
        : 'text-zinc-700 hover:text-amber-600 hover:bg-zinc-100'
    }`;

  return (
    <>
      {/* Top B2B Announcement Strip - Light */}
      <div className="bg-zinc-100 border-b border-zinc-200/80 text-[11px] text-zinc-600 py-1.5 px-4 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-amber-700 font-extrabold uppercase tracking-wider text-[10px] bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
              <Sparkles size={11} className="text-amber-600" /> Pan-India B2B
            </span>
            <span className="hidden sm:inline text-zinc-700 font-medium">
              Direct Factory Supply · 100% GST Input Credit · Volume Slab Rebates
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+918679509135"
              className="hidden md:flex items-center gap-1.5 text-zinc-600 hover:text-amber-600 transition font-medium"
            >
              <PhoneCall size={12} className="text-amber-600" />
              <span>Dealer Desk: +91 8679509135</span>
            </a>
            <a
              href={D2C_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold transition"
            >
              <span>Visit D2C Retail</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Light Glass Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 font-sans ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm'
            : 'bg-white/90 backdrop-blur-md border-b border-zinc-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 flex items-center justify-between">
          {/* Brand Logo with B2B Badge */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center">
              <img
                src={logo}
                alt="ElexoPlus Logo"
                className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="ml-2.5 hidden sm:inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 shadow-xs">
                B2B Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/catalog" className={navLinkClass}>Product Catalog</NavLink>
            
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/orders" className={navLinkClass}>Orders</NavLink>
                <NavLink to="/documents" className={navLinkClass}>KYC Documents</NavLink>
              </>
            )}
          </nav>

          {/* Right Action Icons & Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50/50 transition duration-200"
              title="Dealer Cart"
            >
              <ShoppingCart size={18} className="text-amber-600" />
              <span className="text-xs font-bold">Wholesale Cart</span>
              {itemCount > 0 ? (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              ) : (
                <span className="text-zinc-400 text-xs font-medium">(0)</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-amber-400 transition-all text-left shadow-xs cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-xs shadow-xs">
                    {vendor?.company_name ? vendor.company_name.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <div className="hidden xl:block">
                    <div className="text-xs font-bold text-zinc-900 truncate max-w-[130px]">
                      {vendor?.company_name || vendor?.contact_name || 'Dealer'}
                    </div>
                    <div className="text-[10px] text-amber-600 font-mono font-bold">
                      {vendor?.vendor_code || 'VERIFIED'}
                    </div>
                  </div>
                  <ChevronDown size={14} className={`text-zinc-500 transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdown && (
                  <div
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white border border-zinc-200 shadow-2xl p-2 z-50 animate-scaleIn text-zinc-900"
                    onMouseLeave={() => setUserDropdown(false)}
                  >
                    <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                      <p className="text-xs font-bold text-zinc-900 truncate">{vendor?.company_name || 'Partner Account'}</p>
                      <p className="text-[11px] text-zinc-500 font-mono">{vendor?.vendor_code}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                    >
                      <LayoutDashboard size={15} className="text-amber-500" />
                      Dealer Dashboard
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                    >
                      <Package size={15} className="text-amber-500" />
                      Orders & Tracking
                    </Link>
                    <Link
                      to="/documents"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                    >
                      <FileText size={15} className="text-amber-500" />
                      KYC Documents
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                    >
                      <UserCircle size={15} className="text-amber-500" />
                      Business Profile
                    </Link>
                    <hr className="my-1.5 border-zinc-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition w-full text-left cursor-pointer"
                    >
                      <LogOut size={15} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-zinc-700 hover:text-amber-600 px-3.5 py-2 rounded-xl hover:bg-zinc-100 border border-transparent transition"
                >
                  Partner Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-zinc-950 px-4 py-2.5 rounded-xl shadow-xs hover:brightness-105 active:scale-95 transition-all duration-200"
                >
                  <ShieldCheck size={14} />
                  <span>Become a Partner</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls: Cart & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800"
            >
              <ShoppingCart size={18} className="text-amber-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="p-2 text-zinc-800 hover:text-amber-600 rounded-xl bg-zinc-100 border border-zinc-200"
              onClick={() => setMobileOpen(true)}
              aria-label="Open Navigation"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden animate-fadeIn">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 bg-white border-l border-zinc-200 p-5 flex flex-col justify-between shadow-2xl animate-slideUp text-zinc-900">
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <img src={logo} alt="ElexoPlus" className="h-8 object-contain" />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 text-zinc-600 hover:text-zinc-900 rounded-lg bg-zinc-100 border border-zinc-200"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Account Status Card */}
                {isAuthenticated ? (
                  <div className="my-4 p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-950 flex items-center justify-center font-black">
                      {vendor?.company_name ? vendor.company_name.charAt(0) : 'P'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-zinc-900 truncate">{vendor?.company_name || 'Partner Account'}</div>
                      <div className="text-[10px] text-amber-600 font-mono font-bold">{vendor?.vendor_code}</div>
                    </div>
                  </div>
                ) : (
                  <div className="my-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="text-xs font-bold text-amber-700 mb-1">Partner Network</div>
                    <div className="text-[11px] text-zinc-600 leading-snug">
                      Authorized B2B pricing, credit facilities, and factory-direct dispatches.
                    </div>
                  </div>
                )}

                {/* Nav Links */}
                <nav className="space-y-1 mt-2">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-zinc-800 hover:bg-zinc-100 hover:text-amber-600 transition"
                  >
                    Home
                  </Link>
                  <Link
                    to="/catalog"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-zinc-800 hover:bg-zinc-100 hover:text-amber-600 transition"
                  >
                    Product Catalog
                  </Link>

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-zinc-800 hover:bg-zinc-100 hover:text-amber-600 transition"
                      >
                        <LayoutDashboard size={16} className="text-amber-500" />
                        Dashboard
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-zinc-800 hover:bg-zinc-100 hover:text-amber-600 transition"
                      >
                        <Package size={16} className="text-amber-500" />
                        Orders & Tracking
                      </Link>
                      <Link
                        to="/documents"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-zinc-800 hover:bg-zinc-100 hover:text-amber-600 transition"
                      >
                        <FileText size={16} className="text-amber-500" />
                        KYC Documents
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-zinc-800 hover:bg-zinc-100 hover:text-amber-600 transition"
                      >
                        <UserCircle size={16} className="text-amber-500" />
                        Business Profile
                      </Link>
                    </>
                  ) : null}
                </nav>
              </div>

              {/* Bottom Auth CTA */}
              <div className="pt-4 border-t border-zinc-200 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200"
                  >
                    <LogOut size={15} /> Log Out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full block text-center py-2.5 rounded-xl text-xs font-bold text-zinc-800 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200"
                    >
                      Partner Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="w-full block text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 shadow-sm"
                    >
                      Become a Partner
                    </Link>
                  </>
                )}
                <div className="text-center pt-2">
                  <a
                    href={D2C_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-amber-600 font-semibold"
                  >
                    <span>ElexoPlus D2C Store</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
