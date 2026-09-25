/**
 * ElexoPlus B2B Portal - Shared Content & Data Engine
 * Synchronized with D2C brand assets, endpoints, and catalog models.
 */

export const B2B_API_BASE = "https://b2b.elexoplus.in/api_2/b2b";
export const D2C_STORE_URL = "https://elexoplus.com";

export const ENDPOINTS = {
  auth: `${B2B_API_BASE}/auth.php`,
  register: `${B2B_API_BASE}/vendor-register.php`,
  catalog: `${B2B_API_BASE}/catalog.php`,
  dashboard: `${B2B_API_BASE}/vendor-dashboard.php`,
  documents: `${B2B_API_BASE}/vendor-documents.php`,
  checkout: `${B2B_API_BASE}/checkout.php`,
  verifyPayment: `${B2B_API_BASE}/verify-payment.php`,
  trackOrder: `${B2B_API_BASE}/track-order.php`,
  orders: `${B2B_API_BASE}/track-order.php`,
  profile: `${B2B_API_BASE}/vendor-profile.php`,
};

export const DOC_TYPES = [
  { key: 'photo', label: 'Owner / Authorized Signatory Photo' },
  { key: 'visiting_card', label: 'Business Card / Visiting Card' },
  { key: 'aadhaar', label: 'Aadhaar Card (Applicant)' },
  { key: 'pan', label: 'Individual PAN Card' },
  { key: 'firm_pan', label: 'Firm / Company PAN Card' },
  { key: 'gst_certificate', label: 'GST Registration Certificate' },
  { key: 'cheque', label: 'Cancelled Cheque (Bank Account Proof)' },
  { key: 'primary_sign', label: 'Authorized Primary Signature' },
  { key: 'company_seal', label: 'Company Seal / Stamp (Optional)' },
];

export const VENDOR_TYPES = [
  'Authorized Dealer',
  'Regional Distributor',
  'Super Stockist',
  'C & F Partner',
  'Institutional Vendor'
];

export const B2B_PARTNER_TIERS = [
  {
    type: 'Authorized Dealer',
    badge: 'Retail Channel',
    tagline: 'For appliance showrooms, retail hardware & electrical outlets',
    margin: '24% - 28%',
    creditTerms: 'Net 15 Days',
    minOrderValue: '₹25,000',
    color: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    benefits: [
      'Direct factory billing with GST input credit',
      'Priority warranty spares & dealer replacement',
      'Point-of-Sale display banners & digital marketing assets',
      'Quarterly slab rebate incentives'
    ]
  },
  {
    type: 'Regional Distributor',
    badge: 'District Exclusive',
    tagline: 'Territory distribution across multi-counter dealer networks',
    margin: '30% - 34%',
    creditTerms: 'Net 30 Days',
    minOrderValue: '₹1,50,000',
    popular: true,
    color: 'from-orange-500/25 to-amber-600/15',
    borderColor: 'border-primary',
    benefits: [
      'Territory protection with assigned sub-dealer PIN codes',
      'Revolving credit ledger with wallet cashback',
      'Full marketing collateral & van branding support',
      'Dedicated Area Sales Manager (ASM) support'
    ]
  },
  {
    type: 'Super Stockist',
    badge: 'State / Zone Level',
    tagline: 'High-volume warehousing hubs feeding secondary distributor lines',
    margin: '36% - 40%',
    creditTerms: 'Net 45 Days',
    minOrderValue: '₹5,00,000',
    color: 'from-amber-600/20 to-yellow-500/15',
    borderColor: 'border-yellow-400/40',
    benefits: [
      'Maximum tier slab pricing & volume target kickbacks',
      'Direct truckload (FTL) dispatches directly from factory',
      'Customized enterprise credit limits up to ₹25 Lakhs',
      'Executive desk & priority production scheduling'
    ]
  }
];

export const DEFAULT_B2B_CATEGORIES = [
  {
    id: 1,
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    image: "/assets/Kitchen-BYeIJkbK.png",
    count: "5 Models",
    description: "Auto-clean chimneys, gas stoves, heavy-duty mixers & smart induction"
  },
  {
    id: 2,
    name: "Heating Appliances",
    slug: "heating-appliances",
    image: "/assets/heating-Cimz2wTQ.png",
    count: "4 Models",
    description: "Glassline storage geysers & waterproof safety immersion rods"
  },
  {
    id: 3,
    name: "Summer Collection",
    slug: "summer-collection",
    image: "/assets/Summer-BgV9wR3f.png",
    count: "3 Models",
    description: "High-velocity BLDC ceiling fans & whisper-quiet ventilation units"
  },
  {
    id: 4,
    name: "Winter Collection",
    slug: "winter-collection",
    image: "/assets/Winter-7A8mnezP.png",
    count: "3 Models",
    description: "Advanced room convector heaters & instant water purifiers"
  },
];

export const DEFAULT_B2B_PRODUCTS = [
  {
    product_id: 101,
    item_code: "EP-CH-9001",
    name: "ElexoPlus Curve Glass Auto-Clean Kitchen Chimney (90cm)",
    category_name: "Kitchen Appliances",
    category_slug: "kitchen-appliances",
    image_url: "/assets/Chimney-YOfkthXd.png",
    mrp: 18990,
    dealer_price: 11490,
    distributor_price: 10490,
    min_qty: 2,
    carton_pack: "2 Units / Master Crate",
    warranty: "5-Year Motor Warranty / 2-Year Comprehensive",
    has_slab: true,
    badge: "Flagship Chimney",
    slabs: [
      { min_qty: 2, price: 11490, margin: "39.5%" },
      { min_qty: 6, price: 10990, margin: "42.1%" },
      { min_qty: 15, price: 10450, margin: "45.0%" },
    ],
    specs: [
      { label: "Suction Power", value: "1450 m³/hr Turbo Suction" },
      { label: "Filter Type", value: "Baffle-less Dry Heat Auto Clean" },
      { label: "Control", value: "Motion Sensor & Feather Touch" },
      { label: "Motor", value: "100% Sealed Pure Copper Motor" }
    ],
    description: "High-grade curved tempered glass design with heat auto-clean technology and intelligent motion gesture control, engineered for smoke-free Indian cooking."
  },
  {
    product_id: 102,
    item_code: "EP-GS-303",
    name: "ElexoPlus Toughened Glass 3-Burner Gas Stove (Auto-Ignition)",
    category_name: "Kitchen Appliances",
    category_slug: "kitchen-appliances",
    image_url: "/assets/Gas_stove-D7GTxQgm.png",
    mrp: 7490,
    dealer_price: 4490,
    distributor_price: 4090,
    min_qty: 4,
    carton_pack: "4 Units / Master Carton",
    warranty: "2-Year On-Site Comprehensive",
    has_slab: true,
    badge: "Fast Mover",
    slabs: [
      { min_qty: 4, price: 4490, margin: "40.0%" },
      { min_qty: 12, price: 4250, margin: "43.2%" },
      { min_qty: 30, price: 3990, margin: "46.7%" },
    ],
    specs: [
      { label: "Burner Material", value: "100% Heavy Forged Brass" },
      { label: "Glass Surface", value: "8mm Shatterproof Thermal Glass" },
      { label: "Pan Support", value: "Cast-Iron Grip with Spill Trays" },
      { label: "Ignition", value: "Multi-Spark Pulse Auto Ignition" }
    ],
    description: "Sleek 8mm toughened black glass body with heavy tri-pin brass burners, thermally insulated rubber legs, and high fuel thermal efficiency."
  },
  {
    product_id: 103,
    item_code: "EP-IND-2000",
    name: "ElexoPlus Smart Touch 2000W Induction Cooktop",
    category_name: "Kitchen Appliances",
    category_slug: "kitchen-appliances",
    image_url: "/assets/induction-ISIp3-gA.png",
    mrp: 4290,
    dealer_price: 2490,
    distributor_price: 2250,
    min_qty: 6,
    carton_pack: "6 Units / Master Carton",
    warranty: "2-Year Comprehensive Warranty",
    has_slab: true,
    badge: "High Margin",
    slabs: [
      { min_qty: 6, price: 2490, margin: "41.9%" },
      { min_qty: 18, price: 2350, margin: "45.2%" },
      { min_qty: 50, price: 2190, margin: "48.9%" },
    ],
    specs: [
      { label: "Power Output", value: "2000W Fast-Heating IGBT" },
      { label: "Plate Material", value: "A-Grade Crystal Glass Plate" },
      { label: "Safety", value: "Auto-Off & Surge Protection" },
      { label: "Presets", value: "8 Indian Cooking Menus" }
    ],
    description: "Micro-crystal glass surface with dual-core IGBT module, Indian culinary presets, intelligent pan sensor, and power surge protection up to 2500V."
  },
  {
    product_id: 104,
    item_code: "EP-MX-750",
    name: "ElexoPlus TurboMix 750W Heavy-Duty Mixer Grinder (3 Jars)",
    category_name: "Kitchen Appliances",
    category_slug: "kitchen-appliances",
    image_url: "/assets/mixer_grinder-D6UOhBih.png",
    mrp: 5490,
    dealer_price: 3190,
    distributor_price: 2890,
    min_qty: 4,
    carton_pack: "4 Units / Master Carton",
    warranty: "3-Year Motor Warranty / 2-Year Product",
    has_slab: true,
    badge: "Top Rated",
    slabs: [
      { min_qty: 4, price: 3190, margin: "41.8%" },
      { min_qty: 16, price: 2990, margin: "45.5%" },
      { min_qty: 40, price: 2820, margin: "48.6%" },
    ],
    specs: [
      { label: "Motor", value: "750W Pure Copper High-Torque" },
      { label: "Jars Included", value: "1.5L Wet, 1.0L Dry, 0.4L Chutney" },
      { label: "Blade System", value: "Hardened Stainless Steel 304" },
      { label: "Coupler", value: "Self-Lubricating Nylon Couplers" }
    ],
    description: "Built for tough Indian spices and heavy batter grinding. Overload circuit breaker, dynamic motor balance, and ergonomic leak-proof jar locking."
  },
  {
    product_id: 105,
    item_code: "EP-KT-18",
    name: "ElexoPlus InstaBoil 1.8L Stainless Steel Electric Kettle",
    category_name: "Kitchen Appliances",
    category_slug: "kitchen-appliances",
    image_url: "/assets/electric_kettle-CMK_4aNs.png",
    mrp: 1890,
    dealer_price: 990,
    distributor_price: 890,
    min_qty: 12,
    carton_pack: "12 Units / Master Carton",
    warranty: "1-Year Replacement Warranty",
    has_slab: true,
    badge: "Volume Driver",
    slabs: [
      { min_qty: 12, price: 990, margin: "47.6%" },
      { min_qty: 36, price: 920, margin: "51.3%" },
      { min_qty: 100, price: 850, margin: "55.0%" },
    ],
    specs: [
      { label: "Capacity", value: "1.8 Liters Large Tank" },
      { label: "Power", value: "1500W Rapid Boil Element" },
      { label: "Body", value: "Food-Grade SS 304 Interior" },
      { label: "Safety", value: "Strix Controller Auto-Shutoff" }
    ],
    description: "Rapid boiling kettle with concealed heating element, 360-degree cordless swivel base, dry-boil cutoff, and illuminated LED power indicator."
  },
  {
    product_id: 106,
    item_code: "EP-WP-RO9",
    name: "ElexoPlus AquaPure RO+UV+Copper Mineral Water Purifier",
    category_name: "Winter Collection",
    category_slug: "winter-collection",
    image_url: "/assets/Water_purifier-B00hNnct.png",
    mrp: 16490,
    dealer_price: 9890,
    distributor_price: 8990,
    min_qty: 2,
    carton_pack: "2 Units / Master Crate",
    warranty: "2-Year On-Site Comprehensive",
    has_slab: true,
    badge: "Health Series",
    slabs: [
      { min_qty: 2, price: 9890, margin: "40.0%" },
      { min_qty: 8, price: 9350, margin: "43.3%" },
      { min_qty: 20, price: 8850, margin: "46.3%" },
    ],
    specs: [
      { label: "Filtration", value: "9-Stage RO + UV + UF + Copper" },
      { label: "Storage", value: "10 Liters Food-Grade Reservoir" },
      { label: "Purification Rate", value: "15 Liters/Hour High Flow" },
      { label: "Membrane", value: "80 GPD Dupont Filmtec RO" }
    ],
    description: "Active Copper & Zinc infused mineralization with smart LED tank status, UV sterilization in storage tank, and high-TDS water handling up to 2000 ppm."
  },
  {
    product_id: 107,
    item_code: "EP-FN-EX200",
    name: "ElexoPlus WhisperFlow High-Velocity Exhaust / Ventilation Fan",
    category_name: "Summer Collection",
    category_slug: "summer-collection",
    image_url: "/assets/ventilation_fan-COpz0dPc.png",
    mrp: 2390,
    dealer_price: 1390,
    distributor_price: 1220,
    min_qty: 8,
    carton_pack: "8 Units / Master Carton",
    warranty: "2-Year Replacement Warranty",
    has_slab: true,
    badge: "Commercial Grade",
    slabs: [
      { min_qty: 8, price: 1390, margin: "41.8%" },
      { min_qty: 24, price: 1290, margin: "46.0%" },
      { min_qty: 60, price: 1190, margin: "50.2%" },
    ],
    specs: [
      { label: "Sweep Size", value: "200mm / 8 Inch Aero Blade" },
      { label: "Air Delivery", value: "520 m³/hr High Suction" },
      { label: "Motor", value: "Double Ball Bearing 100% Copper" },
      { label: "Louver", value: "Automatic Gravity Backdraft Shutters" }
    ],
    description: "Quiet aerodynamic blades engineered for kitchens, bathrooms, and commercial cabins. Resists rust and humidity with automatic bird-guard back shutters."
  },
  {
    product_id: 108,
    item_code: "EP-GS-25L",
    name: "ElexoPlus PyroWarm 25L Glassline Storage Geyser",
    category_name: "Heating Appliances",
    category_slug: "heating-appliances",
    image_url: "/assets/heating-Cimz2wTQ.png",
    mrp: 12990,
    dealer_price: 7690,
    distributor_price: 6990,
    min_qty: 2,
    carton_pack: "2 Units / Master Crate",
    warranty: "7-Year Tank / 3-Year Element / 2-Year Comprehensive",
    has_slab: true,
    badge: "5-Star Energy",
    slabs: [
      { min_qty: 2, price: 7690, margin: "40.8%" },
      { min_qty: 6, price: 7250, margin: "44.1%" },
      { min_qty: 18, price: 6850, margin: "47.2%" },
    ],
    specs: [
      { label: "Tank Coating", value: "Blue Diamond Titanium Enamel" },
      { label: "Pressure Rating", value: "8 Bar Suitable for High-Rise" },
      { label: "Heating Element", value: "Incoloy 800 Heavy-Duty 2000W" },
      { label: "Insulation", value: "High Density PUF Insulation" }
    ],
    description: "BEE 5-star rated storage water heater with dual safety thermostat, glass-lined anti-corrosion tank, and magnesium anode rod for hard water resilience."
  },
  {
    product_id: 109,
    item_code: "EP-IR-1500",
    name: "ElexoPlus ShockSafe 1500W Waterproof Immersion Heating Rod",
    category_name: "Heating Appliances",
    category_slug: "heating-appliances",
    image_url: "/assets/immersion_rod-C9FVi8PA.png",
    mrp: 990,
    dealer_price: 490,
    distributor_price: 430,
    min_qty: 20,
    carton_pack: "20 Units / Master Carton",
    warranty: "1-Year Replacement Warranty",
    has_slab: true,
    badge: "Essential Seller",
    slabs: [
      { min_qty: 20, price: 490, margin: "50.5%" },
      { min_qty: 60, price: 450, margin: "54.5%" },
      { min_qty: 150, price: 410, margin: "58.5%" },
    ],
    specs: [
      { label: "Power Rating", value: "1500W Instant Heating" },
      { label: "Waterproof Level", value: "IPX7 Complete Water Resistant" },
      { label: "Plating", value: "Nickel Plated Anti-Corrosive Copper" },
      { label: "Bucket Clamp", value: "Safe Nylon Hanging Clip Included" }
    ],
    description: "ISI marked 1500W heating rod with safe rubber sealed handle, heavy copper tube with nickel plating for rapid boiling, and built-in water depth indicator."
  },
  {
    product_id: 110,
    item_code: "EP-FAN-1200",
    name: "ElexoPlus AeroBreeze BLDC 1200mm Ceiling Fan (Remote Control)",
    category_name: "Summer Collection",
    category_slug: "summer-collection",
    image_url: "/assets/Summer-BgV9wR3f.png",
    mrp: 4990,
    dealer_price: 2990,
    distributor_price: 2690,
    min_qty: 4,
    carton_pack: "4 Units / Master Carton",
    warranty: "3-Year On-Site Comprehensive",
    has_slab: true,
    badge: "65% Power Saving",
    slabs: [
      { min_qty: 4, price: 2990, margin: "40.0%" },
      { min_qty: 16, price: 2790, margin: "44.0%" },
      { min_qty: 40, price: 2590, margin: "48.0%" },
    ],
    specs: [
      { label: "Motor", value: "28W Energy-Efficient BLDC" },
      { label: "Air Delivery", value: "235 CMM High Breeze Flow" },
      { label: "Speed", value: "370 RPM at Full Boost" },
      { label: "Features", value: "RF Remote with Sleep & Boost Timers" }
    ],
    description: "Modern energy-saving BLDC fan runs seamlessly on home inverters, consumes only 28W, and operates whisper-quiet with smart remote control."
  },
  {
    product_id: 111,
    item_code: "EP-RH-2000",
    name: "ElexoPlus WinterComfort 2000W Halogen Room Heater",
    category_name: "Winter Collection",
    category_slug: "winter-collection",
    image_url: "/assets/Winter-7A8mnezP.png",
    mrp: 3290,
    dealer_price: 1890,
    distributor_price: 1680,
    min_qty: 6,
    carton_pack: "6 Units / Master Carton",
    warranty: "1-Year Replacement Warranty",
    has_slab: true,
    badge: "Instant Warmth",
    slabs: [
      { min_qty: 6, price: 1890, margin: "42.5%" },
      { min_qty: 18, price: 1750, margin: "46.8%" },
      { min_qty: 50, price: 1620, margin: "50.7%" },
    ],
    specs: [
      { label: "Heating Rods", value: "3 Quartz / Halogen Tubes" },
      { label: "Heat Settings", value: "400W / 800W / 1200W Selection" },
      { label: "Safety Cutoff", value: "Automatic Tip-Over Switch" },
      { label: "Oscillation", value: "70-Degree Wide Angle Sweep" }
    ],
    description: "Instant halogen radiant heating with safety grill, wide-angle motorized oscillation, thermal fuse, and automatic switch-off if accidentally tilted."
  },
  {
    product_id: 112,
    item_code: "EP-PRO-800",
    name: "ElexoPlus ProChef Commercial Grade Electric Multi-Cooker",
    category_name: "Kitchen Appliances",
    category_slug: "kitchen-appliances",
    image_url: "/assets/product-BICEL6TG.png",
    mrp: 6990,
    dealer_price: 3990,
    distributor_price: 3590,
    min_qty: 4,
    carton_pack: "4 Units / Master Carton",
    warranty: "2-Year Comprehensive Warranty",
    has_slab: true,
    badge: "Pro Series",
    slabs: [
      { min_qty: 4, price: 3990, margin: "42.9%" },
      { min_qty: 12, price: 3750, margin: "46.3%" },
      { min_qty: 32, price: 3490, margin: "50.0%" },
    ],
    specs: [
      { label: "Capacity", value: "5.5 Liters Non-Stick Pot" },
      { label: "Power", value: "1800W Heavy-Duty Ring Element" },
      { label: "Functions", value: "Saute, Steam, Boil, Slow Cook, Fry" },
      { label: "Thermostat", value: "Precision Stepless Dial Control" }
    ],
    description: "Versatile commercial-ready multi-cooker with non-stick granite coating, tempered glass lid with steam escape vent, and cool-touch silicone handles."
  }
];

/**
 * Fetch catalog products with fallback to rich local catalog
 */
export async function getB2BCatalog(vendorId) {
  const url = vendorId ? `${ENDPOINTS.catalog}?vendor_id=${vendorId}` : ENDPOINTS.catalog;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP error");
    const data = await res.json();
    if (data.success && Array.isArray(data.products) && data.products.length > 0) {
      // normalize with local assets if missing or external
      return {
        products: data.products.map(p => ({
          ...p,
          image_url: p.image_url || '/assets/product-BICEL6TG.png'
        })),
        guest: !!data.guest
      };
    }
  } catch {
    // API not reachable; return rich fallback catalog
  }

  return {
    products: DEFAULT_B2B_PRODUCTS,
    guest: !vendorId
  };
}
