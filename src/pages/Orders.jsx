import React, { useEffect, useState } from 'react';
import {
  Truck, Package, CheckCircle2, Clock, Calendar,
  ArrowRight, FileText, Download, ShieldCheck, MapPin, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ENDPOINTS, DEFAULT_B2B_PRODUCTS } from '../data/siteContent';
import { useB2BAuth } from '../context/B2BAuthContext';
import PortalLayout from '../components/PortalLayout';

const defaultFallbackOrders = [
  {
    order_id: 'EP-ORD-8821',
    razorpay_order_id: 'EP-ORD-8821',
    created_at: '24 Sep 2026, 04:15 PM',
    status: 'In Transit',
    payment_terms: '30-Day Revolving Credit',
    full_amount: 82450,
    items_count: 14,
    transporter: 'VRL Logistics Express',
    lr_number: 'VRL-7729104',
    dispatch_date: '25 Sep 2026',
    estimated_arrival: '28 Sep 2026',
    scans: [
      { status: 'Out for Local Line Delivery', location: 'Regional Hub Depot', time: 'Today, 09:30 AM' },
      { status: 'Transshipment Hub Cleared', location: 'Jaipur Central Hub', time: '25 Sep, 11:20 PM' },
      { status: 'Full Truckload Dispatched', location: 'Bhiwadi Factory Warehouse', time: '25 Sep, 02:40 PM' },
      { status: 'Palletized & QC Inspected', location: 'Plant 1 Packing Bay', time: '24 Sep, 05:00 PM' },
    ],
    items: [
      { name: DEFAULT_B2B_PRODUCTS[0].name, qty: 4, price: DEFAULT_B2B_PRODUCTS[0].dealer_price },
      { name: DEFAULT_B2B_PRODUCTS[1].name, qty: 6, price: DEFAULT_B2B_PRODUCTS[1].dealer_price },
      { name: DEFAULT_B2B_PRODUCTS[2].name, qty: 4, price: DEFAULT_B2B_PRODUCTS[2].dealer_price },
    ]
  },
  {
    order_id: 'EP-ORD-8794',
    razorpay_order_id: 'EP-ORD-8794',
    created_at: '18 Sep 2026, 11:30 AM',
    status: 'Delivered',
    payment_terms: 'Dealer Wallet Settlement',
    full_amount: 145900,
    items_count: 26,
    transporter: 'TCI Freight Services',
    lr_number: 'TCI-662810',
    dispatch_date: '19 Sep 2026',
    estimated_arrival: '22 Sep 2026 (Delivered)',
    scans: [
      { status: 'Consignment Received & Signed', location: 'Dealer Destination Showroom', time: '22 Sep, 03:15 PM' },
      { status: 'Arrived at Destination Station', location: 'Delhi Goods Yard', time: '21 Sep, 08:45 AM' },
      { status: 'Dispatched from Factory Hub', location: 'Bhiwadi Plant Bay 3', time: '19 Sep, 06:00 PM' }
    ],
    items: [
      { name: DEFAULT_B2B_PRODUCTS[3].name, qty: 12, price: DEFAULT_B2B_PRODUCTS[3].dealer_price },
      { name: DEFAULT_B2B_PRODUCTS[7].name, qty: 6, price: DEFAULT_B2B_PRODUCTS[7].dealer_price },
      { name: DEFAULT_B2B_PRODUCTS[9].name, qty: 8, price: DEFAULT_B2B_PRODUCTS[9].dealer_price }
    ]
  }
];

export default function Orders() {
  const { vendor, dealer } = useB2BAuth();
  const currentPartner = vendor || dealer || {};

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${ENDPOINTS.trackOrder}?vendor_id=${currentPartner.id || 'demo'}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.orders) && d.orders.length > 0) {
          setOrders(d.orders);
          setSelectedOrder(d.orders[0]);
        } else {
          setOrders(defaultFallbackOrders);
          setSelectedOrder(defaultFallbackOrders[0]);
        }
      })
      .catch(() => {
        setOrders(defaultFallbackOrders);
        setSelectedOrder(defaultFallbackOrders[0]);
      })
      .finally(() => setLoading(false));
  }, [currentPartner.id]);

  return (
    <PortalLayout>
      <div className="space-y-6 font-sans text-zinc-900">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <h1 className="text-2xl font-black text-zinc-900">Orders & Consignment Tracking</h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Live factory dispatch status, Lorry Receipt (LR) tracking, and GST tax invoice records.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-amber-400 hover:brightness-105 text-zinc-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
          >
            <Package size={15} />
            <span>Place New Order</span>
          </Link>
        </div>

        {/* Orders Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Orders List - Clean White Cards */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">
              Order History ({orders.length})
            </span>

            {orders.map((o) => {
              const isSelected = selectedOrder?.order_id === o.order_id;
              const isDelivered = o.status === 'Delivered';
              return (
                <button
                  key={o.order_id}
                  onClick={() => setSelectedOrder(o)}
                  className={`w-full text-left rounded-2xl p-4 transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/60 border-amber-400 shadow-sm'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono text-xs font-bold text-zinc-900">{o.order_id}</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isDelivered
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-zinc-500 flex items-center gap-2">
                    <Clock size={12} className="text-zinc-400" />
                    <span>{o.created_at}</span>
                  </div>

                  <div className="flex justify-between items-baseline mt-3 pt-2.5 border-t border-zinc-100">
                    <span className="text-xs text-zinc-500 font-sans">{o.payment_terms}</span>
                    <span className="text-sm font-black text-amber-700 font-mono">
                      ₹{Number(o.full_amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Order Detail & Live Tracking Card */}
          {selectedOrder && (
            <div className="lg:col-span-7 rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 space-y-6 shadow-sm">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-zinc-900 font-mono">{selectedOrder.order_id}</span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    Booked on {selectedOrder.created_at}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Downloading Proforma Invoice for ${selectedOrder.order_id}...`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-zinc-800 transition cursor-pointer"
                >
                  <Download size={13} />
                  <span>Tax Invoice (PDF)</span>
                </button>
              </div>

              {/* Logistics & LR Slip Information */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                  <Truck size={16} /> Freight Consignment Slip
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Transporter / Carrier</span>
                    <span className="text-zinc-900 font-semibold">{selectedOrder.transporter || 'Direct Logistics'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Lorry Receipt (LR) No</span>
                    <span className="text-amber-700 font-mono font-bold">{selectedOrder.lr_number || 'LR-PENDING'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Factory Dispatch Point</span>
                    <span className="text-zinc-900 font-semibold">Bhiwadi Hub 1</span>
                  </div>
                </div>
              </div>

              {/* Live Tracking Timeline */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-3 flex items-center gap-1.5">
                  <MapPin size={14} className="text-amber-600" /> Transit Scan Milestones
                </h3>

                <div className="space-y-4 pl-2 border-l-2 border-amber-400/60 ml-2">
                  {(selectedOrder.scans || []).map((scan, idx) => (
                    <div key={idx} className="relative pl-4">
                      <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white"></div>
                      <div className="text-xs font-bold text-zinc-900">{scan.status}</div>
                      <div className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5">
                        <span>{scan.location}</span>
                        <span>·</span>
                        <span className="text-zinc-400">{scan.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items Breakdown */}
              {selectedOrder.items && (
                <div className="pt-4 border-t border-zinc-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Order Items & Master Packaging
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
                        <div className="min-w-0 pr-3">
                          <div className="font-semibold text-zinc-900 truncate">{item.name}</div>
                          <div className="text-[10px] text-zinc-500">Qty: {item.qty} units × ₹{item.price.toLocaleString('en-IN')}</div>
                        </div>
                        <span className="font-mono font-bold text-zinc-900 shrink-0">
                          ₹{(item.qty * item.price).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs">
                    <span className="text-zinc-600">Total B2B Contractual Invoice (Tax Included):</span>
                    <span className="text-lg font-black text-amber-700 font-mono">
                      ₹{Number(selectedOrder.full_amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
