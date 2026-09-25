import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2, ArrowLeft, Download, Truck, Package,
  ShieldCheck, FileText, Calendar
} from 'lucide-react';
import { ENDPOINTS, DEFAULT_B2B_PRODUCTS } from '../data/siteContent';
import { useB2BAuth } from '../context/B2BAuthContext';
import PortalLayout from '../components/PortalLayout';

export default function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { token, vendor, dealer } = useB2BAuth();
  const currentPartner = vendor || dealer || {};

  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${ENDPOINTS.orders}?id=${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.order) setOrder(d.order);
        else throw new Error();
      })
      .catch(() => {
        setOrder({
          order_number: id || 'EP-ORD-8821',
          created_at: '24 Sep 2026, 04:15 PM',
          status: 'In Transit',
          payment_mode: '30_Day_Credit',
          total: 82450,
          transporter: 'VRL Logistics Express',
          lr_number: 'VRL-7729104',
          items: [
            {
              product_id: 101,
              name: DEFAULT_B2B_PRODUCTS[0].name,
              image: DEFAULT_B2B_PRODUCTS[0].image_url,
              quantity: 4,
              unit_price: DEFAULT_B2B_PRODUCTS[0].dealer_price,
              line_total: 4 * DEFAULT_B2B_PRODUCTS[0].dealer_price
            },
            {
              product_id: 102,
              name: DEFAULT_B2B_PRODUCTS[1].name,
              image: DEFAULT_B2B_PRODUCTS[1].image_url,
              quantity: 6,
              unit_price: DEFAULT_B2B_PRODUCTS[1].dealer_price,
              line_total: 6 * DEFAULT_B2B_PRODUCTS[1].dealer_price
            },
            {
              product_id: 103,
              name: DEFAULT_B2B_PRODUCTS[2].name,
              image: DEFAULT_B2B_PRODUCTS[2].image_url,
              quantity: 4,
              unit_price: DEFAULT_B2B_PRODUCTS[2].dealer_price,
              line_total: 4 * DEFAULT_B2B_PRODUCTS[2].dealer_price
            },
          ]
        });
      });
  }, [id, token]);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-4xl font-sans text-zinc-900">
        {location.state?.justPlaced && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl px-5 py-4 text-xs font-bold shadow-xs">
            <CheckCircle2 size={18} className="text-emerald-600" /> Purchase order placed successfully with ElexoPlus manufacturing!
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-amber-700 transition"
          >
            <ArrowLeft size={14} />
            <span>Back to All Orders</span>
          </Link>

          {order && (
            <button
              type="button"
              onClick={() => alert(`Downloading Proforma Tax Invoice for ${order.order_number}...`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-zinc-800 transition cursor-pointer"
            >
              <Download size={13} />
              <span>Download Tax Invoice (PDF)</span>
            </button>
          )}
        </div>

        {order && (
          <div className="space-y-6">
            {/* Order Heading Card */}
            <div className="rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Consignment #{order.order_number}
                </span>
                <h1 className="text-2xl font-black text-zinc-900 mt-2 font-mono">{order.order_number}</h1>
                <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                  <Calendar size={13} className="text-zinc-400" />
                  <span>Booked on {order.created_at}</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  {order.status}
                </span>
                <div className="text-sm font-black text-zinc-900 font-mono mt-3">
                  Total: ₹{Number(order.total).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Freight Details */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 block text-[10px]">Logistics Partner</span>
                <span className="text-zinc-900 font-semibold">{order.transporter || 'VRL Logistics Express'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Lorry Receipt (LR)</span>
                <span className="text-amber-700 font-mono font-bold">{order.lr_number || 'VRL-7729104'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Payment Terms</span>
                <span className="text-zinc-900 font-semibold capitalize">{order.payment_mode?.replace(/_/g, ' ')}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-3xl bg-white border border-zinc-200 overflow-hidden shadow-sm">
              <div className="p-4 md:p-6 border-b border-zinc-100 text-xs font-bold text-zinc-700 uppercase tracking-wider bg-zinc-50/50">
                Consignment Items List ({order.items.length} Products)
              </div>
              <div className="divide-y divide-zinc-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 md:p-6 hover:bg-zinc-50 transition">
                    <div className="w-16 h-16 bg-zinc-50 rounded-xl overflow-hidden p-2 flex items-center justify-center shrink-0 border border-zinc-200">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-zinc-900 truncate">{item.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        Qty: {item.quantity} units × ₹{item.unit_price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-amber-700 font-mono shrink-0">
                      ₹{item.line_total.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 md:p-6 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center text-xs">
                <span className="text-zinc-600">Total B2B Contractual Invoice (Tax Included)</span>
                <span className="text-xl font-black text-zinc-900 font-mono">
                  ₹{Number(order.total).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
