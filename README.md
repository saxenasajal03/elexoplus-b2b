# ElexoPlus B2B Wholesale & Partner Portal

[![Deploy to GitHub Pages](https://github.com/saxenasajal03/elexoplus-b2b/actions/workflows/deploy.yml/badge.svg)](https://github.com/saxenasajal03/elexoplus-b2b/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-amber.svg)](https://saxenasajal03.github.io/elexoplus-b2b/)

Official B2B procurement, dealer network, and wholesale distribution portal for **ElexoPlus** home appliances (Kitchen Chimneys, Auto-Ignition Gas Stoves, Induction Cooktops, Electric Kettles, Heavy-Duty Mixer Grinders, Immersion Rods, and Water Purifiers).

---

## 🌐 Live Portal

- **GitHub Pages URL**: [https://saxenasajal03.github.io/elexoplus-b2b/](https://saxenasajal03.github.io/elexoplus-b2b/)
- **D2C Store Reference**: [https://saxenasajal03.github.io/elexoplus-b2b/](https://saxenasajal03.github.io/elexoplus/)

---

## 🔑 Demo Credentials (1-Click Login Available)

For quick demonstration and offline evaluation, 1-click test credentials are built right into the **Login screen**:

| Partner Role | Vendor Code / ID | Password | Assigned Credit Limit | Initial Wallet Balance |
| :--- | :--- | :--- | :--- | :--- |
| **Authorized Dealer** | `EPIV-DEL-0091` | `Password@123` | ₹5,00,000 | ₹24,500 |
| **Regional Distributor** | `EPIV-DST-0042` | `Password@123` | ₹15,00,000 | ₹68,400 |
| **Super Stockist** | `EPIV-SS-0018` | `Password@123` | ₹25,00,000 | ₹1,25,000 |

*(Any custom vendor code can also be entered to explore the portal with standard dealer permissions).*

---

## 🚀 Key Portal Features

1. **Brand Theme & Light UI**:
   - Styled to match the modern Light Theme of the ElexoPlus brand with high-contrast typography (Nunito), warm amber accents, and responsive layout.
2. **Wholesale Pricing & Volume Slab Matrix**:
   - Tiered discounts for Master Cartons (5+, 10+, 20+ cartons) with automated Minimum Order Quantity (MOQ) validation.
3. **Wholesale Cart & Commercial Checkout**:
   - Live 18% GST input credit breakdown, credit limit utilization meter, and simulated purchase order issuance.
4. **Order Tracking with Lorry Receipt (LR)**:
   - Full logistics tracking timeline with carrier name, LR number, dispatched consignments, and tax invoices.
5. **KYC & Compliance Vault**:
   - Verified compliance status tracker for GSTIN, PAN, Bank Proof, Signatures, and Company Seal.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 6
- **Routing**: React Router v7 (with base path & SPA deep-link redirect)
- **Styling**: Tailwind CSS v4 + Lucide React Icons
- **Deployment**: Automated GitHub Actions to GitHub Pages

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/saxenasajal03/elexoplus-b2b.git

# Navigate to project directory
cd elexoplus-b2b

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Built for ElexoPlus India Pvt Limited.
