import React, { useEffect, useState } from 'react';
import {
  Wallet, CreditCard, Package, ArrowRight, FileCheck2,
  TrendingUp, Truck, ShieldCheck, Clock, Download, Plus,
  Sparkles, CheckCircle2, ChevronRight, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ENDPOINTS, DEFAULT_B2B_PRODUCTS } from '../data/siteContent';
import { useB2BAuth } from '../context/B2BAuthContext';
import { useB2BCart } from '../context/B2BCartContext';
import PortalLayout from '../components/PortalLayout';

export default function Dashboard() {
  const { vendor, dealer } = useB2BAuth();
  const currentPartner = vendor || dealer || {};
  const { addToCart } = useB2BCart();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${ENDPOINTS.dashboard}?vendor_id=${currentPartner.id || 'demo'}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setData(d);
        else throw new Error("Fallback needed");
      })
      .catch(() => {
        setData({
          credit: {
            limit: currentPartner.credit_limit || 500000,
            available: 385000,
            used: 115000,
            days: 30
          },
          wallet_balance: 24500,
          pending_orders_count: 2,
          ytd_volume: 1480000,
          tier: currentPartner.vendor_type || 'Authorized Dealer',
          recent_orders: [
            {
              order_id: 'EP-ORD-8821',
              date: '24 Sep 2026',
              items_count: 14,
              total: 82450,
              status: 'Dispatched',
              tracking: 'VRL-7729104'
            },
            {
              order_id: 'EP-ORD-8794',
              date: '18 Sep 2026',
              items_count: 26,
              total: 145900,
              status: 'Delivered',
              tracking: 'TCI-662810'
            }
          ]
        });
      })
      .finally(() => setLoading(false));
  }, [currentPartner.id]);

  const creditLimit = data?.credit?.limit || 500000;
  const creditUsed = data?.credit?.used || 115000;
  const creditAvailable = data?.credit?.available || (creditLimit - creditUsed);
  const creditUsagePercent = Math.min(100, Math.round((creditUsed / creditLimit) * 100));

  return (
    <PortalLayout>
      <div className="space-y-8 font-sans text-zinc-900">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                {currentPartner?.vendor_type || 'Authorized Dealer'}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                ID: {currentPartner?.vendor_code || 'EPIV-DEL-0091'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900">
              Welcome back, {currentPartner?.contact_name || currentPartner?.company_name || 'Partner'}
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Live ledger, revolving factory credit line, and order dispatch tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/catalog"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:brightness-105 text-zinc-950 font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs transition"
            >
              <Plus size={15} />
              <span>New Wholesale Order</span>
            </Link>
          </div>
        </div>

        {/* Financial KPI Cards - Clean White Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Credit Limit Card */}
          <div className="rounded-2xl bg-white border border-zinc-200 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-600 flex items-center gap-1.5">
                <CreditCard size={15} className="text-amber-600" />
                Credit Line Available
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-bold">30 Days</span>
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 font-mono">
                ₹{creditAvailable.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Total Sanctioned: ₹{creditLimit.toLocaleString('en-IN')}
              </div>
            </div>
            {/* Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden border border-zinc-200">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${creditUsagePercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
                <span>{creditUsagePercent}% Utilized</span>
                <span>₹{creditUsed.toLocaleString('en-IN')} used</span>
              </div>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="rounded-2xl bg-white border border-zinc-200 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-600 flex items-center gap-1.5">
                <Wallet size={15} className="text-amber-600" />
                Wallet & Rebates
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                Auto-Deduct
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-600 font-mono">
                ₹{(data?.wallet_balance || 24500).toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Earned via quarterly target slabs
              </div>
            </div>
            <div className="pt-1">
              <Link
                to="/catalog"
                className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>Apply on next purchase</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>

          {/* Consignments in Transit */}
          <div className="rounded-2xl bg-white border border-zinc-200 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-600 flex items-center gap-1.5">
                <Truck size={15} className="text-amber-600" />
                Active Dispatches
              </span>
              <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                Live LR
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 font-mono">
                {data?.pending_orders_count || 2} Shipments
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Dispatched via VRL / TCI Freight
              </div>
            </div>
            <div className="pt-1">
              <Link
                to="/orders"
                className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>Track consignment status</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>

          {/* YTD Business Volume */}
          <div className="rounded-2xl bg-white border border-zinc-200 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-600 flex items-center gap-1.5">
                <TrendingUp size={15} className="text-amber-600" />
                YTD Purchase Turnover
              </span>
              <span className="text-[10px] text-zinc-400 font-bold">FY 2026-27</span>
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 font-mono">
                ₹{(data?.ytd_volume || 1480000).toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Status: On track for Super Stockist
              </div>
            </div>
            <div className="pt-1">
              <span className="text-[11px] text-emerald-700 font-bold">
                ✓ 100% On-time settlements
              </span>
            </div>
          </div>
        </div>

        {/* Quick Rapid Re-Order Bar */}
        <div className="rounded-3xl bg-white border border-zinc-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Sparkles size={17} className="text-amber-600" />
                Quick Rapid Re-Order
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                One-click additions for your top-moving counter stock items.
              </p>
            </div>
            <Link to="/catalog" className="text-xs font-bold text-amber-700 hover:underline">
              View All 12 Models →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DEFAULT_B2B_PRODUCTS.slice(0, 3).map((item) => (
              <div
                key={item.product_id}
                className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 flex items-center justify-between gap-3 group hover:border-amber-400 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center p-1 shrink-0">
                  <img src={item.image_url} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-zinc-900 truncate group-hover:text-amber-700 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    ₹{item.dealer_price.toLocaleString('en-IN')} · MOQ {item.min_qty}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(item, item.min_qty)}
                  className="p-2 rounded-xl bg-amber-400 hover:brightness-105 text-zinc-950 font-bold shrink-0 transition cursor-pointer shadow-2xs"
                  title="Add MOQ to Cart"
                >
                  <Plus size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders & KYC Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Orders Table */}
          <div className="lg:col-span-8 rounded-3xl bg-white border border-zinc-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900">Recent Orders & Tracking</h3>
              <Link to="/orders" className="text-xs font-bold text-amber-700 hover:underline">
                All Orders ({data?.recent_orders?.length || 2}) →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-50 text-zinc-600 uppercase text-[10px] border-b border-zinc-200">
                  <tr>
                    <th className="py-3 px-3 rounded-l-lg">Order Ref</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Units</th>
                    <th className="py-3 px-3">Total Amount</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 rounded-r-lg text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-mono">
                  {(data?.recent_orders || []).map((ord) => (
                    <tr key={ord.order_id} className="hover:bg-zinc-50 transition">
                      <td className="py-3 px-3 font-bold text-zinc-900">{ord.order_id}</td>
                      <td className="py-3 px-3 text-zinc-600 font-sans">{ord.date}</td>
                      <td className="py-3 px-3 text-zinc-700 font-sans">{ord.items_count} pcs</td>
                      <td className="py-3 px-3 text-amber-700 font-bold">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          to="/orders"
                          className="text-xs text-amber-700 hover:underline font-sans font-semibold"
                        >
                          Track LR
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KYC & Compliance Card */}
          <div className="lg:col-span-4 rounded-3xl bg-white border border-zinc-200 p-6 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck2 size={18} className="text-amber-600" />
                <h3 className="text-base font-bold text-zinc-900">KYC & GST Invoicing</h3>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                Keep your firm PAN, GSTIN certificate, and cancelled cheque updated to maintain uninterrupted credit line limits.
              </p>

              <div className="space-y-2.5 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600">GST Verification</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Active & Verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600">Firm Bank Account</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600">Owner Identity (Aadhaar)</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/documents"
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 transition"
            >
              Manage Verified Documents
            </Link>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
