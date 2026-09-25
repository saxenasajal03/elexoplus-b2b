import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Wallet, ShieldCheck, TrendingUp, Package,
  Percent, Clock, Sparkles, CheckCircle2, ChevronRight,
  Calculator, Truck, Award, Building2, ExternalLink, Zap
} from 'lucide-react';
import {
  B2B_PARTNER_TIERS, DEFAULT_B2B_CATEGORIES,
  getB2BCatalog, D2C_STORE_URL
} from '../data/siteContent';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const heroAppliances = [
  {
    badge: "Fast-Moving Flagship",
    name: "ElexoPlus Curve Glass Auto-Clean Chimney",
    sub: "90cm Motion Sensor · 1450 m³/hr Suction",
    dealerPrice: "₹11,490",
    mrp: "₹18,990",
    margin: "39.5% Margin",
    image: "/assets/Chimney-YOfkthXd.png"
  },
  {
    badge: "High-Volume Retailer",
    name: "ElexoPlus Toughened 3-Burner Gas Stove",
    sub: "Heavy Brass Burners · Auto-Ignition",
    dealerPrice: "₹4,490",
    mrp: "₹7,490",
    margin: "40.0% Margin",
    image: "/assets/Gas_stove-D7GTxQgm.png"
  },
  {
    badge: "Smart Cooking Range",
    name: "ElexoPlus Smart Touch 2000W Induction",
    sub: "A-Grade Crystal Glass · Dual IGBT",
    dealerPrice: "₹2,490",
    mrp: "₹4,290",
    margin: "41.9% Margin",
    image: "/assets/induction-ISIp3-gA.png"
  },
  {
    badge: "Heavy-Duty Performer",
    name: "ElexoPlus TurboMix 750W Mixer Grinder",
    sub: "100% Copper Motor · 3 SS Jars",
    dealerPrice: "₹3,190",
    mrp: "₹5,490",
    margin: "41.8% Margin",
    image: "/assets/mixer_grinder-D6UOhBih.png"
  }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [calcOrderValue, setCalcOrderValue] = useState(150000);

  useEffect(() => {
    getB2BCatalog().then(({ products: prods }) => {
      setProducts(prods.slice(0, 8));
    });
  }, []);

  // Hero auto-slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroAppliances.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Profit calculation logic
  const calculatedMrpTurnover = Math.round(calcOrderValue * 1.58);
  const calculatedGrossProfit = calculatedMrpTurnover - calcOrderValue;
  const calculatedGstCredit = Math.round(calcOrderValue * 0.18);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <SiteHeader />

      {/* Hero Section - Light D2C Styling */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 pt-10 pb-16 md:py-24">
        {/* Glow backdrop elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-300/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100/90 border border-amber-300/80 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
              <Sparkles size={14} className="text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
              Pan-India B2B Distribution & Wholesale Portal
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-zinc-900">
              Direct Factory Supply.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                Unbeatable Margins
              </span>{' '}
              for Appliance Dealers.
            </h1>

            <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-2xl">
              Procure certified home & kitchen appliances directly from ElexoPlus manufacturing. Unlock volume slab discounts, 100% GST input credit, 30-day credit lines, and 48-hour priority dispatch.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/register"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:brightness-105 text-zinc-950 font-black text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all duration-200"
              >
                <span>Become an Authorized Partner</span>
                <ArrowRight size={17} />
              </Link>
              <Link
                to="/catalog"
                className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs hover:border-amber-400 transition-all duration-200"
              >
                <span>Browse Wholesale Catalog</span>
              </Link>
            </div>

            {/* Live Trust Badges */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-zinc-200 text-xs">
              <div>
                <div className="text-xl md:text-2xl font-black text-amber-600">up to 48%</div>
                <div className="text-zinc-500 font-medium">Dealer Gross Margin</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-zinc-900">100% GST</div>
                <div className="text-zinc-500 font-medium">Compliant Input Credit</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-orange-600">48-Hr SLA</div>
                <div className="text-zinc-500 font-medium">Factory Dispatch Guarantee</div>
              </div>
            </div>
          </div>

          {/* Right Showcase Card - Clean White Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100 rounded-full blur-2xl pointer-events-none"></div>

              {/* Slide Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  {heroAppliances[activeHeroSlide].badge}
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {heroAppliances[activeHeroSlide].margin}
                </span>
              </div>

              {/* Product Image Stage */}
              <div className="relative aspect-4/3 flex items-center justify-center my-4 bg-zinc-50/80 rounded-2xl p-4">
                <img
                  src={heroAppliances[activeHeroSlide].image}
                  alt={heroAppliances[activeHeroSlide].name}
                  className="max-h-56 max-w-full object-contain filter drop-shadow-md transition-all duration-700 animate-float"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-2 mt-4">
                <h3 className="text-lg font-bold text-zinc-900 leading-tight">
                  {heroAppliances[activeHeroSlide].name}
                </h3>
                <p className="text-xs text-zinc-500">
                  {heroAppliances[activeHeroSlide].sub}
                </p>

                <div className="flex items-baseline justify-between pt-3 border-t border-zinc-100">
                  <div>
                    <span className="text-xs text-zinc-500 block">Dealer Net Rate:</span>
                    <span className="text-2xl font-black text-amber-600">
                      {heroAppliances[activeHeroSlide].dealerPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-500 block">Retail MRP:</span>
                    <span className="text-sm font-semibold text-zinc-400 line-through">
                      {heroAppliances[activeHeroSlide].mrp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center gap-1.5 mt-5">
                {heroAppliances.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveHeroSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeHeroSlide === i ? 'w-8 bg-amber-500' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid with D2C Assets */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              Procurement Categories
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-900 mt-1">
              Engineered For Reliability & High Retail Turn
            </h2>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition"
          >
            <span>View Full 2026 Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEFAULT_B2B_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl overflow-hidden"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {cat.count}
                </span>
                <h3 className="text-lg font-bold text-zinc-900 mt-3 group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 aspect-4/3 flex items-center justify-center bg-zinc-50/70 rounded-xl p-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-36 max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-500 group-hover:text-amber-600 transition-colors">
                <span>Browse Range</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Partner Tier Slabs - Clean Light Layout */}
      <section className="bg-zinc-50 border-y border-zinc-200 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              Partner Programs
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-900 mt-1">
              Tier-Based Pricing Slabs & Credit Terms
            </h2>
            <p className="text-zinc-600 text-sm mt-3">
              Whether you run an appliance retail showroom or manage a multi-district distribution network, ElexoPlus provides structured contracted rates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {B2B_PARTNER_TIERS.map((tier) => (
              <div
                key={tier.type}
                className={`relative rounded-3xl bg-white border border-zinc-200 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                  tier.popular ? 'ring-2 ring-amber-400 shadow-md -translate-y-1' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">
                      {tier.badge}
                    </span>
                    <span className="text-xs font-bold text-zinc-500">
                      Min: {tier.minOrderValue}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900">{tier.type}</h3>
                  <p className="text-xs text-zinc-500 mt-1 mb-5">{tier.tagline}</p>

                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2 mb-6">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Partner Margin Slab</span>
                      <span className="text-amber-600 font-extrabold text-sm">{tier.margin}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Credit Facility</span>
                      <span className="text-zinc-900 font-bold">{tier.creditTerms}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Program Benefits
                    </span>
                    {tier.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                        <CheckCircle2 size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100">
                  <Link
                    to="/register"
                    className="w-full block text-center py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-zinc-100 hover:bg-amber-400 hover:text-black text-zinc-800 transition duration-200"
                  >
                    Apply For {tier.type}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Dealer Margin Calculator - Light Card */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 w-full">
        <div className="rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 border border-zinc-200 p-6 md:p-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-amber-700 text-xs font-black uppercase tracking-wider mb-2">
              <Calculator size={15} /> Dealer Profitability Engine
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900">
              Calculate Your Estimated Monthly Margin
            </h2>
            <p className="text-zinc-600 text-xs md:text-sm mt-1">
              Select your expected monthly billing volume to estimate retail turnover, net profit, and input tax credit savings.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Input Slider */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-zinc-700">Monthly Wholesale Order Value</span>
                  <span className="text-xl font-black text-amber-600 font-mono">
                    ₹{calcOrderValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={calcOrderValue}
                  onChange={(e) => setCalcOrderValue(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
                  <span>₹25,000 (Starter)</span>
                  <span>₹5,00,000</span>
                  <span>₹10,00,000 (Bulk Hub)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-xs">
                  <span className="text-zinc-500 block mb-1">Standard Margin Range</span>
                  <span className="text-zinc-900 font-bold">36% - 42% on MRP</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-xs">
                  <span className="text-zinc-500 block mb-1">Applicable GST Rate</span>
                  <span className="text-zinc-900 font-bold">18% ITC Deductible</span>
                </div>
              </div>
            </div>

            {/* Output Card */}
            <div className="lg:col-span-5 rounded-2xl bg-white border border-amber-300 p-6 shadow-md space-y-4">
              <div>
                <span className="text-xs text-zinc-500 block">Estimated Retail MRP Turnover</span>
                <span className="text-2xl font-black text-zinc-900 font-mono">
                  ₹{calculatedMrpTurnover.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-y border-zinc-100">
                <span className="text-xs font-semibold text-zinc-600">Gross Dealer Margin</span>
                <span className="text-lg font-black text-emerald-600 font-mono">
                  + ₹{calculatedGrossProfit.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600">GST Input Tax Credit (ITC)</span>
                <span className="text-amber-600 font-bold font-mono">
                  ₹{calculatedGstCredit.toLocaleString('en-IN')}
                </span>
              </div>

              <Link
                to="/register"
                className="w-full block text-center py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:brightness-105 shadow-sm transition duration-200"
              >
                Lock In Dealer Rates Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Catalog Preview */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              High Turn Inventory
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mt-1">
              Top Wholesale Fast-Movers
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
          >
            <span>Explore All Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <div
              key={p.product_id}
              className="rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 p-3 md:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg group"
            >
              <div>
                {/* Image Stage */}
                <div className="aspect-square rounded-xl bg-zinc-50 flex items-center justify-center p-3 relative overflow-hidden mb-3">
                  {p.badge && (
                    <span className="absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-zinc-950 shadow-xs">
                      {p.badge}
                    </span>
                  )}
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  {p.category_name}
                </div>
                <h4 className="text-xs md:text-sm font-bold text-zinc-900 line-clamp-2 mt-1 group-hover:text-amber-600 transition-colors">
                  {p.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Wholesale Rate</span>
                    <span className="text-sm md:text-base font-black text-amber-600">
                      ₹{Number(p.dealer_price).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block">MRP</span>
                    <span className="text-xs text-zinc-400 line-through">
                      ₹{Number(p.mrp).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 mt-1.5 flex items-center justify-between">
                  <span>MOQ: {p.min_qty} Units</span>
                  <span className="text-emerald-600 font-semibold">In Stock</span>
                </div>

                <Link
                  to="/catalog"
                  className="mt-3 w-full flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-amber-400 hover:text-black text-zinc-800 text-xs font-bold py-2 rounded-xl transition duration-200"
                >
                  <span>Order Slabs</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Certifications Banner */}
      <section className="bg-zinc-50 border-y border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <Award className="mx-auto text-amber-600 mb-2" size={28} />
            <div className="text-base font-black text-zinc-900">ISO 9001:2015</div>
            <div className="text-xs text-zinc-500 mt-0.5">Certified Safety Standards</div>
          </div>
          <div className="p-4">
            <Truck className="mx-auto text-amber-600 mb-2" size={28} />
            <div className="text-base font-black text-zinc-900">Direct Bhiwadi Dispatch</div>
            <div className="text-xs text-zinc-500 mt-0.5">Full & Partial Truckload Hub</div>
          </div>
          <div className="p-4">
            <ShieldCheck className="mx-auto text-amber-600 mb-2" size={28} />
            <div className="text-base font-black text-zinc-900">2-Year On-Site Service</div>
            <div className="text-xs text-zinc-500 mt-0.5">Pan-India Technician Network</div>
          </div>
          <div className="p-4">
            <Zap className="mx-auto text-amber-600 mb-2" size={28} />
            <div className="text-base font-black text-zinc-900">Revolving Credit Line</div>
            <div className="text-xs text-zinc-500 mt-0.5">30-Day Working Capital Support</div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-20 w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mx-auto mb-5 shadow-xs">
          <Building2 size={28} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
          Ready to Grow Your Appliance Business?
        </h2>
        <p className="text-zinc-600 text-sm md:text-base max-w-xl mx-auto mt-3 mb-8">
          Submit your dealer application in under 3 minutes. Our regional sales team will verify your GST and approve your portal credit line within 24 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:brightness-105 text-zinc-950 font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition-all duration-200"
          >
            <span>Start Dealer Application</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-300 hover:border-zinc-400 text-zinc-800 font-bold text-xs px-6 py-3.5 rounded-xl transition"
          >
            <span>Browse Products as Guest</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
