import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Lock, Plus, Check, Filter, X,
  Eye, Package, ShieldCheck, ChevronRight,
  TrendingUp, Award, Layers, Sparkles, SlidersHorizontal
} from 'lucide-react';
import { getB2BCatalog, DEFAULT_B2B_CATEGORIES } from '../data/siteContent';
import { useB2BAuth } from '../context/B2BAuthContext';
import { useB2BCart } from '../context/B2BCartContext';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function Catalog() {
  const { vendor, isAuthenticated } = useB2BAuth();
  const { addToCart } = useB2BCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState(true);

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [modalProduct, setModalProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedIds, setAddedIds] = useState({});

  useEffect(() => {
    setLoading(true);
    getB2BCatalog(vendor?.id)
      .then(({ products: prods, guest: isGuest }) => {
        setProducts(prods);
        setGuest(isGuest);

        const initialQty = {};
        prods.forEach((p) => {
          initialQty[p.product_id] = p.min_qty || 1;
        });
        setQuantities(initialQty);
      })
      .finally(() => setLoading(false));
  }, [vendor?.id, isAuthenticated]);

  const handleQtyChange = (productId, delta, minQty) => {
    setQuantities((prev) => {
      const current = prev[productId] || minQty || 1;
      const next = Math.max(minQty || 1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.product_id] || product.min_qty || 1;
    addToCart(product, qty);
    setAddedIds((prev) => ({ ...prev, [product.product_id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.product_id]: false }));
    }, 1500);
  };

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' ||
          p.category_name?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          p.category_slug?.toLowerCase().includes(selectedCategory.toLowerCase());

        const query = search.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.name?.toLowerCase().includes(query) ||
          p.item_code?.toLowerCase().includes(query) ||
          p.category_name?.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.dealer_price || a.mrp) - (b.dealer_price || b.mrp);
        if (sortBy === 'price-desc') return (b.dealer_price || b.mrp) - (a.dealer_price || a.mrp);
        if (sortBy === 'moq-asc') return (a.min_qty || 1) - (b.min_qty || 1);
        return 0;
      });
  }, [products, selectedCategory, search, sortBy]);

  const categories = ['All', 'Kitchen Appliances', 'Heating Appliances', 'Summer Collection', 'Winter Collection'];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 w-full flex-1">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
              <Link to="/" className="hover:text-amber-600">Home</Link>
              <span>/</span>
              <span className="text-zinc-800 font-medium">Product Catalog</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              Wholesale Product Catalog
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Factory direct inventory with volume tier slabs and verified BIS / ISI certification.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by appliance, model code..."
              className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-xs"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Guest Warning Pill - Light */}
        {guest && (
          <div className="flex items-center justify-between flex-wrap gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300">
                <Lock size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-900">
                  Guest Mode: Showing Estimated Retail MRP
                </div>
                <div className="text-[11px] text-amber-800/80">
                  Sign in with your verified Vendor ID to unlock your contractual wholesale dealer rates and 30-day credit terms.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-zinc-800 bg-white border border-zinc-300 hover:border-amber-400 px-3.5 py-1.5 rounded-xl transition shadow-xs"
              >
                Partner Login
              </Link>
              <Link
                to="/register"
                className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 px-4 py-1.5 rounded-xl shadow-xs transition hover:brightness-105"
              >
                Apply for Dealership
              </Link>
            </div>
          </div>
        )}

        {/* Category Pills & Sorting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 mb-8">
          {/* Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-zinc-950 shadow-xs'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-zinc-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-800 focus:outline-none focus:border-amber-500 shadow-xs cursor-pointer"
            >
              <option value="featured">Featured Fast-Movers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="moq-asc">Lowest MOQ First</option>
            </select>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-zinc-500">Loading wholesale catalog...</p>
          </div>
        )}

        {/* Product Cards Grid - Clean White Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => {
            const qty = quantities[p.product_id] || p.min_qty || 1;
            const isAdded = addedIds[p.product_id];

            return (
              <div
                key={p.product_id}
                className="rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group relative"
              >
                <div>
                  {/* Image Stage */}
                  <div className="aspect-square rounded-xl bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden mb-3.5 border border-zinc-100">
                    {p.badge && (
                      <span className="absolute top-2.5 left-2.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-zinc-950 shadow-xs z-10">
                        {p.badge}
                      </span>
                    )}

                    {/* Quick View Button */}
                    <button
                      type="button"
                      onClick={() => setModalProduct(p)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white hover:bg-amber-400 hover:text-black text-zinc-600 border border-zinc-200 opacity-0 group-hover:opacity-100 transition-all z-10 shadow-xs cursor-pointer"
                      title="Quick Specs & Slabs"
                    >
                      <Eye size={14} />
                    </button>

                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Header info */}
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                    <span className="font-mono text-zinc-600 font-semibold">{p.item_code}</span>
                    <span className="text-amber-700 font-bold uppercase">{p.category_name}</span>
                  </div>

                  <h3
                    onClick={() => setModalProduct(p)}
                    className="text-xs md:text-sm font-bold text-zinc-900 line-clamp-2 leading-snug cursor-pointer group-hover:text-amber-600 transition-colors"
                  >
                    {p.name}
                  </h3>
                </div>

                {/* Pricing & Slabs */}
                <div className="mt-4 pt-3 border-t border-zinc-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">
                        {guest ? 'Retail MRP' : 'Dealer Rate'}
                      </span>
                      <span className="text-base md:text-lg font-black text-amber-600 font-mono">
                        ₹{Number(guest ? p.mrp : p.dealer_price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {!guest && (
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 block">MRP</span>
                        <span className="text-xs text-zinc-400 line-through">
                          ₹{Number(p.mrp).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Slabs hint */}
                  <div className="flex items-center justify-between text-[11px] bg-zinc-50 border border-zinc-200 rounded-xl px-2.5 py-1.5">
                    <span className="text-zinc-600">MOQ: <strong className="text-zinc-900">{p.min_qty} Units</strong></span>
                    <button
                      type="button"
                      onClick={() => setModalProduct(p)}
                      className="text-amber-700 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Layers size={11} /> Slabs
                    </button>
                  </div>

                  {/* Add to Cart with Quantity Stepper */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-xl p-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.product_id, -1, p.min_qty)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-amber-700">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.product_id, 1, p.min_qty)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(p)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-zinc-950 shadow-xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} /> Added
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-zinc-200 mt-6 shadow-xs">
            <Package className="mx-auto text-zinc-400 mb-3" size={36} />
            <h3 className="text-base font-bold text-zinc-800">No appliances found</h3>
            <p className="text-xs text-zinc-500 mt-1">Try resetting your search query or category filter.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-zinc-100 text-xs font-bold text-amber-700 hover:bg-zinc-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Quick View & Volume Slabs Modal - Light Card */}
      {modalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-scaleIn text-zinc-900">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setModalProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Product Image */}
              <div className="aspect-square bg-zinc-50 rounded-2xl flex items-center justify-center p-6 border border-zinc-200">
                <img
                  src={modalProduct.image_url}
                  alt={modalProduct.name}
                  className="max-h-56 max-w-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {modalProduct.item_code}
                </span>
                <h3 className="text-lg font-black text-zinc-900 leading-snug">
                  {modalProduct.name}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {modalProduct.description}
                </p>

                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Master Packing</span>
                    <span className="text-zinc-900 font-semibold">{modalProduct.carton_pack || 'Standard Master Carton'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Warranty Support</span>
                    <span className="text-amber-700 font-semibold">{modalProduct.warranty}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Dealer Unit Cost</span>
                    <span className="text-2xl font-black text-amber-600 font-mono">
                      ₹{Number(modalProduct.dealer_price).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block">Consumer MRP</span>
                    <span className="text-sm font-semibold text-zinc-400 line-through">
                      ₹{Number(modalProduct.mrp).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Volume Tier Slabs Table */}
            {modalProduct.slabs && (
              <div className="mt-6 pt-5 border-t border-zinc-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3 flex items-center gap-1.5">
                  <Layers size={14} /> Contracted Volume Slab Discount Matrix
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-zinc-100 text-zinc-600 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3 rounded-l-lg">Quantity Slab</th>
                        <th className="py-2.5 px-3">Price / Unit</th>
                        <th className="py-2.5 px-3">Effective Margin</th>
                        <th className="py-2.5 px-3 rounded-r-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 font-mono">
                      {modalProduct.slabs.map((slab, i) => (
                        <tr key={i} className="hover:bg-zinc-50 transition">
                          <td className="py-2.5 px-3 text-zinc-900 font-semibold">{slab.min_qty}+ Units</td>
                          <td className="py-2.5 px-3 text-amber-700 font-bold">₹{slab.price.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-emerald-700 font-bold">{slab.margin}</td>
                          <td className="py-2.5 px-3">
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(modalProduct, slab.min_qty);
                                setModalProduct(null);
                              }}
                              className="px-2.5 py-1 rounded bg-amber-400 text-zinc-950 font-sans font-bold text-[10px] hover:brightness-105 cursor-pointer shadow-2xs"
                            >
                              Add {slab.min_qty} Units
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Specifications Specs */}
            {modalProduct.specs && (
              <div className="mt-5 pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {modalProduct.specs.map((s, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                      <span className="text-zinc-500 block text-[10px]">{s.label}</span>
                      <span className="text-zinc-900 font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
