import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Phone, Mail, MapPin, ExternalLink,
  Award, FileCheck2, ArrowUpRight, CheckCircle2,
  Building2, Facebook, Instagram, Twitter, Linkedin, Youtube
} from 'lucide-react';
import logo from '../assets/elexoplus-logo-BJqIBdaq.png';
import { D2C_STORE_URL } from '../data/siteContent';

export default function SiteFooter() {
  return (
    <footer className="bg-black text-zinc-400 text-xs font-sans border-t border-zinc-800/80 mt-20">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-zinc-900 bg-zinc-950/60 py-5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-zinc-100 font-bold text-xs">ISO 9001:2015 Quality</div>
              <div className="text-[11px] text-zinc-500">Certified manufacturing standards</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award size={20} />
            </div>
            <div>
              <div className="text-zinc-100 font-bold text-xs">2 to 7 Year Warranties</div>
              <div className="text-[11px] text-zinc-500">On-site service network across India</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <FileCheck2 size={20} />
            </div>
            <div>
              <div className="text-zinc-100 font-bold text-xs">100% GST Input Credit</div>
              <div className="text-[11px] text-zinc-500">Instant compliant E-way & Tax Invoicing</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <div className="text-zinc-100 font-bold text-xs">Direct Factory Dispatch</div>
              <div className="text-[11px] text-zinc-500">Bhiwadi industrial hub dispatches</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-block">
            <img src={logo} alt="ElexoPlus Logo" className="h-10 w-auto object-contain" />
          </Link>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
            ElexoPlus is a premier home and kitchen appliances manufacturer. Our B2B distribution platform empowers dealers, distributors, and super stockists across India with direct factory pricing, credit facilities, and real-time inventory management.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <CheckCircle2 size={13} /> Authorized Partner Portal
            </span>
          </div>

          {/* Social Links */}
          <div className="pt-2 flex items-center gap-2.5">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-amber-400 transition">
              <Facebook size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-amber-400 transition">
              <Instagram size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-amber-400 transition">
              <Linkedin size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-amber-400 transition">
              <Youtube size={14} />
            </a>
          </div>
        </div>

        {/* B2B Partner Portal Navigation */}
        <div className="space-y-3">
          <h3 className="text-zinc-200 font-bold uppercase tracking-wider text-xs">Partner Ecosystem</h3>
          <ul className="space-y-2 text-zinc-400">
            <li><Link to="/register" className="hover:text-amber-400 transition">Dealer Onboarding Form</Link></li>
            <li><Link to="/login" className="hover:text-amber-400 transition">Partner Login / KYC</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Wholesale Catalog & Slabs</Link></li>
            <li><Link to="/dashboard" className="hover:text-amber-400 transition">Credit & Wallet Ledger</Link></li>
            <li><Link to="/orders" className="hover:text-amber-400 transition">Order Tracking & LR Slips</Link></li>
            <li><Link to="/documents" className="hover:text-amber-400 transition">Upload KYC & GST Documents</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h3 className="text-zinc-200 font-bold uppercase tracking-wider text-xs">Product Categories</h3>
          <ul className="space-y-2 text-zinc-400">
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Kitchen Chimneys & Hoods</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Gas Stoves & Glass Cooktops</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Heavy Mixer Grinders (750W)</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Induction Cooktops (2000W)</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Storage Geysers & Heaters</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">BLDC Aero Fans & Ventilation</Link></li>
          </ul>
        </div>

        {/* B2B Support & Corporate Contacts */}
        <div className="space-y-3">
          <h3 className="text-zinc-200 font-bold uppercase tracking-wider text-xs">Dealer Support Desk</h3>
          <div className="space-y-2.5 text-zinc-400">
            <div className="flex items-start gap-2.5">
              <Phone size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-zinc-200 font-semibold">+91 8679509135</div>
                <div className="text-[11px] text-zinc-500">Mon - Sat (10 AM - 7 PM IST)</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <a href="mailto:sales@elexoplus.in" className="text-zinc-200 hover:text-amber-400 transition">sales@elexoplus.in</a>
                <div className="text-[11px] text-zinc-500">Dealer quotes & tender inquiries</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                Industrial Area Phase-II, Bhiwadi, Rajasthan — 301019, India
              </div>
            </div>
            <div className="pt-2">
              <a
                href={D2C_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline"
              >
                <span>Consumer E-Commerce Store</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright and Legal Bar */}
      <div className="border-t border-zinc-900 bg-zinc-950 py-5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Elexo Plus India Private Limited. All Rights Reserved. CIN: U27900RJ2022PTC082341
          </div>
          <div className="flex items-center gap-5 text-zinc-400">
            <span className="hover:text-zinc-200 cursor-pointer">B2B Terms of Supply</span>
            <span>·</span>
            <span className="hover:text-zinc-200 cursor-pointer">Warranty & Spares Policy</span>
            <span>·</span>
            <span className="hover:text-zinc-200 cursor-pointer">Credit Agreement Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
