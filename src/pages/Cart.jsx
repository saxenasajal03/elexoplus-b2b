import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Minus, Plus, Trash2, ArrowRight, ShieldCheck,
  Package, FileText, Sparkles, ChevronRight, AlertCircle
} from 'lucide-react';
import { useB2BCart } from '../context/B2BCartContext';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, total } = useB2BCart();
  const navigate = useNavigate();

  const gstAmount = Math.round(total * 0.18);
  const grandTotal = total + gstAmount;
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <SiteHeader />

      <main className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-amber-600">Catalog</Link>
          <span>/</span>
          <span className="text-zinc-800 font-medium">Wholesale Cart</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              Wholesale Order Cart
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Review your master carton quantities, net dealer rates, and GST input credit breakdown.
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-zinc-500 hover:text-rose-600 transition cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-white border border-zinc-200 p-12 text-center max-w-lg mx-auto my-8 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto mb-4">
              <Package size={32} />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 mb-1">Your wholesale cart is empty</h2>
            <p className="text-xs text-zinc-500 mb-6">
              Browse our catalog of high-demand kitchen chimneys, gas stoves, heavy-duty mixers, and heating geysers.
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-zinc-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-xs transition cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Items List - Clean White Cards */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => {
                const lineTotal = item.dealer_price * item.quantity;
                return (
                  <div
                    key={item.product_id}
                    className="rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition shadow-xs"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-20 h-20 rounded-xl bg-zinc-50 flex items-center justify-center p-2 shrink-0 border border-zinc-200">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-zinc-900 truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                          <span className="text-amber-700 font-bold font-mono">
                            ₹{item.dealer_price.toLocaleString('en-IN')} / unit
                          </span>
                          <span>·</span>
                          <span className="text-[11px] text-zinc-500">MOQ: {item.min_qty || 1}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-10 text-center text-xs font-mono font-bold text-amber-700">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-[10px] text-zinc-500 block">Subtotal</span>
                        <span className="text-sm md:text-base font-black text-zinc-900 font-mono">
                          ₹{lineTotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.product_id)}
                        className="text-zinc-400 hover:text-rose-600 transition p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* B2B Assurance Notice */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 flex items-center gap-3 text-xs text-zinc-600 shadow-xs">
                <ShieldCheck size={18} className="text-amber-600 shrink-0" />
                <span>
                  All shipments are dispatched in heavy-duty export master crates directly from our Bhiwadi factory, insured against transit damages.
                </span>
              </div>
            </div>

            {/* Order Summary Card - Clean White Card */}
            <div className="lg:col-span-4 rounded-3xl bg-white border border-zinc-200 p-6 shadow-md space-y-5 sticky top-24">
              <h2 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-3">
                Order Tax Invoice Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Total Ordered Quantity</span>
                  <span className="text-zinc-900 font-bold font-mono">{totalUnits} Units</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Net Wholesale Value (Taxable)</span>
                  <span className="text-zinc-900 font-bold font-mono">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>GST (18% - 100% ITC Eligible)</span>
                  <span className="text-amber-700 font-bold font-mono">+ ₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Factory Freight & Transit Insurance</span>
                  <span className="text-emerald-700 font-bold">Waived (B2B Promo)</span>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-zinc-900 block">Grand Total Payable</span>
                    <span className="text-[10px] text-zinc-500">Including all applicable taxes</span>
                  </div>
                  <span className="text-2xl font-black text-amber-600 font-mono">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:brightness-105 text-zinc-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-xs transition-all duration-200 cursor-pointer"
                >
                  <span>Proceed to B2B Checkout</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/catalog')}
                  className="w-full text-center py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition cursor-pointer"
                >
                  Continue Adding Products
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
