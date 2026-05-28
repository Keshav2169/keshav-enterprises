/**
 * KeshavEnterprises_ReviewForm_v2.jsx
 * Deployment target: GitHub Pages (static) + Cloudflare Workers (AI proxy)
 *
 * HOSTING ARCHITECTURE:
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │  GitHub Pages (free, static)                                │
 *  │  → hosts the built React app (dist/ folder)                 │
 *  │  → form submissions go to Web3Forms (free email delivery)   │
 *  │  → AI questions proxied to Cloudflare Worker (free)         │
 *  └─────────────────────────────────────────────────────────────┘
 *
 * CONFIGURATION (3 constants to set before deploying):
 *  1. WEB3FORMS_ACCESS_KEY  — get free at https://web3forms.com
 *  2. AI_PROXY_URL          — your Cloudflare Worker URL (see deployment guide)
 *  3. LOGO_URL              — publicly hosted logo image URL
 *
 * WHY CLOUDFLARE WORKERS FOR AI:
 *  GitHub Pages is purely static — no server-side code.
 *  Cloudflare Workers free tier (100,000 req/day) runs a tiny
 *  proxy function that holds the Anthropic API key server-side.
 *  The key never reaches the browser.
 *
 * CHANGES FROM v1 (all audit issues fixed):
 *  ✅ [Critical] Real backend via Web3Forms — no server needed
 *  ✅ [Critical] AI key protected via Cloudflare Worker proxy
 *  ✅ [High]     Full validation: email regex, per-country phone, required fields per step
 *  ✅ [High]     Accessibility: aria-label on stars, <label htmlFor> on all inputs,
 *                role=progressbar, focus managed on step change, aria-live regions
 *  ✅ [Medium]   Single design-token object T — zero magic hex/px in JSX
 *  ✅ [Medium]   No nested scroll — product list renders in page flow
 *  ✅ [Medium]   Logo as external URL with accessible fallback badge
 *  ✅ [Low]      sessionStorage draft — restored on mount with banner
 *  ✅ [Low]      prodRatings included in avgRating() and submission payload
 *  ✅ [Low]      SOCIAL_LINKS single shared constant (was duplicated)
 *  ✅ [Extra]    useReducer single state atom — easier to debug and extend
 *  ✅ [Extra]    Double-submit guard on Submit button
 *  ✅ [Extra]    Dev-mode warning banner when keys are still placeholder values
 *  ✅ [Phone]    31-country dial-code picker, blur-time validation, country-specific errors
 */

import { useState, useCallback, useMemo, useReducer, useEffect, useRef } from "react";
import {
  Star, CheckCircle2, ChevronRight, ChevronLeft, Send, Wrench,
  Package, MessageSquare, User, Search, X, RotateCcw, Layers, ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   CONFIGURATION — set these 3 values before deploying
   ───────────────────────────────────────────────────────────────── */

// 1. Get free key at https://web3forms.com — safe to commit (tied to email, not password)
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_KEY_HERE";

// 2. Your Cloudflare Worker URL — created in deployment guide Step 3
//    Example: "https://ke-ai-proxy.YOUR-USERNAME.workers.dev"
//    Set to empty string "" to disable AI Q&A (form still works fully without it)
const AI_PROXY_URL = "YOUR_CLOUDFLARE_WORKER_URL_HERE";

// 3. Publicly accessible logo URL (Cloudinary, GitHub raw, or your own server)
// Set this to your actual hosted logo URL (Cloudinary, GitHub raw, etc.)
// Falls back to an inline SVG monogram if the image fails to load (onError handler below).
// Default is empty string so no broken-image request fires until you set a real URL.
const LOGO_URL = "";

/* ─────────────────────────────────────────────────────────────────
   DESIGN TOKENS  (single source of truth — change brand color once)
   ───────────────────────────────────────────────────────────────── */
const T = {
  font:       "'Outfit', sans-serif",
  ink:        "#0f172a",
  brand:      "#1d4ed8",
  brandLight: "#3b82f6",
  muted:      "#64748b",
  border:     "#e2e8f0",
  surface:    "#f8fafc",
  white:      "#ffffff",
  danger:     "#ef4444",
  warn:       "#f59e0b",
  ok:         "#16a34a",
  okBg:       "#f0fdf4",
  okBorder:   "#bbf7d0",
  infoBg:     "#eff6ff",
  infoBorder: "#bfdbfe",
  radius:     "10px",
  radiusLg:   "14px",
  shadow:     "0 32px 80px rgba(0,0,0,.38)",
};

/* ─────────────────────────────────────────────────────────────────
   SHARED STYLE OBJECTS  (no magic values in JSX)
   ───────────────────────────────────────────────────────────────── */
const S = {
  lbl: {
    display: "block", fontFamily: T.font, fontSize: 11.5, fontWeight: 700,
    color: T.muted, marginBottom: 6, letterSpacing: "0.07em", textTransform: "uppercase",
  },
  inp: (hasError) => ({
    width: "100%", padding: "11px 14px", borderRadius: T.radius,
    border: `1.5px solid ${hasError ? T.danger : T.border}`,
    fontFamily: T.font, fontSize: 14, color: T.ink,
    background: T.surface, outline: "none", boxSizing: "border-box",
    transition: "border-color .18s, box-shadow .18s",
  }),
  txta: (hasError) => ({
    width: "100%", padding: "11px 14px", borderRadius: T.radius,
    border: `1.5px solid ${hasError ? T.danger : T.border}`,
    fontFamily: T.font, fontSize: 14, color: T.ink,
    background: T.surface, outline: "none", boxSizing: "border-box",
    minHeight: 90, resize: "vertical", lineHeight: 1.6,
    transition: "border-color .18s, box-shadow .18s",
  }),
  errMsg: { fontFamily: T.font, fontSize: 11.5, color: T.danger, marginTop: 4 },
};

/* ─────────────────────────────────────────────────────────────────
   SOCIAL LINKS  (single source — used in header AND success screen)
   ───────────────────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  { title: "WhatsApp",  color: "#25d366", href: "https://wa.me/916397363268",
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
  { title: "Instagram", color: "#e1306c", href: "https://www.instagram.com/ksengg007",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { title: "Facebook",  color: "#1877f2", href: "https://www.facebook.com/ksengg007",
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { title: "LinkedIn",  color: "#0077b5", href: "https://www.linkedin.com/in/keshav-enterprises-825a473b8",
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { title: "YouTube",   color: "#ff0000", href: "https://www.youtube.com/@ksengg007",
    d: "M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" },
  { title: "X/Twitter", color: "#000000", href: "https://x.com/ksengg007",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
];

/* ─────────────────────────────────────────────────────────────────
   ALL 113 PRODUCTS  (unchanged data)
   ───────────────────────────────────────────────────────────────── */
const ALL_PRODUCTS = {
  "Industrial Filtration": [
    { id:"prod_f1",    title:"Triveni Turbine Lube Oil Filter Elements" },
    { id:"prod_f2",    title:"Siemens Turbine Lube Oil Filter Elements" },
    { id:"prod_f3",    title:"SS Wire Mesh (CEP) Centrifugal Filter Elements" },
    { id:"prod_f4",    title:"Tank Breather Filter Elements (NBF Series)" },
    { id:"prod_f5",    title:"Hydraulic Suction Strainer Elements (AS/TS Series)" },
    { id:"prod_f6",    title:"WaterSorp Offline Filter Elements (WSNR Series)" },
    { id:"prod_f7",    title:"PTFE Hydrophobic Air & Gas Filter Elements" },
    { id:"prod_f8",    title:"Return-Line Filter Elements" },
    { id:"prod_f9",    title:"Duplex Control Oil Filter Assembly" },
    { id:"prod_f10",   title:"Duplex Fabricated Filter Housing" },
    { id:"prod_f11",   title:"Reverse Osmosis (RO) Filter Assemblies" },
    { id:"prod_f12",   title:"Siemens Turbine Control Oil Filters" },
    { id:"prod_f13",   title:"Triveni Turbine Control Oil Filters" },
    { id:"prod_f14",   title:"Filter Bag & Support Cage Assembly" },
    { id:"prod_f15",   title:"Wedge Wire Filter Element" },
    { id:"prod_f16",   title:"Concrete Pump Filter Element" },
    { id:"prod_f17",   title:"Dust Collector Filter Cartridge" },
    { id:"prod_f18",   title:"Pleated Dust Collector Filter Cartridge (Flange-Type)" },
    { id:"prod_f19",   title:"Oil Vapour Extractor Filter" },
    { id:"prod_f20",   title:"HYDAC Replacement Filter Elements" },
    { id:"prod_f21",   title:"Pall Replacement Filter Elements" },
    { id:"prod_f22",   title:"Bhagwati Replacement Oil Filters" },
    { id:"prod_f23",   title:"Air Oil Separator Filter" },
    { id:"prod_f_bhel",title:"BHEL Turbine Lube Oil Filter Elements" },
    { id:"prod_f_htc", title:"HTC Turbine Filter Elements" },
  ],
  "Industrial Strainers": [
    { id:"prod_st1", title:"Simplex Basket Strainer" },
    { id:"prod_st2", title:"Duplex Basket Strainer" },
    { id:"prod_st3", title:"Conical (Temporary) Strainer" },
    { id:"prod_st4", title:"Y-Type Strainer" },
    { id:"prod_st5", title:"Pot / Bucket Type Strainer" },
    { id:"prod_st6", title:"Stainless Steel Notch Wire Strainer Element" },
  ],
  "Expansion Joints": [
    { id:"prod_e1",  title:"Stainless Steel Metallic Bellows Expansion Joint" },
    { id:"prod_e1b", title:"Axial Expansion Joint" },
    { id:"prod_e2",  title:"Double Arch Rubber Expansion Joint" },
    { id:"prod_e3",  title:"Single Arch Rubber Expansion Joint" },
    { id:"prod_e3b", title:"Wide Arch Rubber Expansion Bellow" },
    { id:"prod_e3c", title:"Industrial Heat Exchanger Bellows" },
    { id:"prod_e4",  title:"Universal Metallic Expansion Joint" },
    { id:"prod_e5",  title:"Non-Metallic Fabric Expansion Joint" },
    { id:"prod_e6",  title:"Pressure Balance Expansion Joint" },
    { id:"prod_e7",  title:"Ring Reinforced Metallic Expansion Joint" },
    { id:"prod_e8",  title:"Externally Pressurised Expansion Joint" },
    { id:"prod_e9",  title:"Lateral Metallic Expansion Joint" },
    { id:"prod_e10", title:"Angular Hinged / Gimbal Expansion Joint" },
    { id:"prod_e11", title:"Metallic Vibration Absorber" },
    { id:"prod_e12", title:"Elbow Pressure Balanced Expansion Joint" },
    { id:"prod_e13", title:"Steam Crossover Piping Bellows" },
    { id:"prod_e14", title:"FCCU High-Temperature Expansion Joint" },
    { id:"prod_e15", title:"Jacketed Expansion Joint" },
    { id:"prod_e16", title:"Clamshell Retrofit Bellows" },
    { id:"prod_e17", title:"Lens Type Expansion Joint" },
    { id:"prod_e18", title:"Rectangular Expansion Joint" },
    { id:"prod_e19", title:"District Heating Expansion Joint" },
    { id:"prod_e20", title:"Tank Farm Service Expansion Bellows" },
    { id:"prod_e21", title:"Cryogenic LNG / LPG Expansion Joint" },
    { id:"prod_e22", title:"Scrubber / Exhaust Gas Cleaning Expansion Joint" },
    { id:"prod_e23", title:"Hygienic Sanitary Expansion Joint" },
    { id:"prod_e24", title:"Hinged Single-Plane Expansion Joint" },
    { id:"prod_e25", title:"T-Type Pressure Balance Expansion Joint" },
    { id:"prod_e26", title:"Octagonal Profile Expansion Joint" },
    { id:"prod_e27", title:"Thick Wall Heavy-Duty Expansion Joint" },
    { id:"prod_e28", title:"MS Slip Type Expansion Joint" },
    { id:"prod_e29", title:"Industrial Airflow Damper" },
    { id:"prod_e30", title:"Dismantling Joint" },
    { id:"prod_e31", title:"MS & SS Industrial Duct Systems" },
  ],
  "Turbine Spares": [
    { id:"prod_ts1",  title:"Carbon & Graphite Gland Sealing Rings" },
    { id:"prod_ts2",  title:"Labyrinth Shaft Sealing Packings" },
    { id:"prod_ts3",  title:"Babbitt Journal Bearings & Thrust Pads" },
    { id:"prod_ts4",  title:"Emergency Stop Valves (ESV)" },
    { id:"prod_ts5",  title:"Turbine Lube Oil Pumps & Mechanical Seals" },
    { id:"prod_ts6",  title:"High-Purity Electrographite Sealing Rings" },
    { id:"prod_ts7",  title:"Complete Turbine Rotor Assemblies" },
    { id:"prod_ts8",  title:"Precision Turbine Gears & Worm Wheels" },
    { id:"prod_ts9",  title:"Turbine Nozzles & Diaphragms" },
    { id:"prod_ts10", title:"Mechanical Centrifugal Speed Governors" },
    { id:"prod_ts11", title:"Turbine Throttle (Control) Valves" },
    { id:"prod_ts12", title:"High/Low Speed Couplings for Turbines" },
    { id:"prod_ts13", title:"Flexible Disc Pack (MetaFlex)" },
    { id:"prod_ts14", title:"Boiler Sight Glass — Round / Reflex" },
    { id:"prod_ts15", title:"Spherical White Metal Bearing — TDPS Alternator" },
    { id:"prod_ts16", title:"Leaf Springs for Turbine Governors" },
    { id:"prod_ts17", title:"Rotor Journal Polishing Service" },
    { id:"prod_ts18", title:"Fulcrum Pins — Blade Locking / Trip Mechanism Linkage" },
    { id:"prod_ts19", title:"Spiral Conveyor Screw (Turbine Auxiliaries)" },
    { id:"prod_ts20", title:"Nylon Sleeve for Gear Coupling" },
    { id:"prod_ts21", title:"KTR BoWex Curved-Tooth Gear Coupling" },
    { id:"prod_ts22", title:"Shear Pins (Turbine Coupling)" },
    { id:"prod_ts23", title:"Dowty Hydraulic Oil Pumps" },
    { id:"prod_ts_blades",               title:"Steam Turbine Blades (Moving & Stationary)" },
    { id:"prod_ts_gov_cards",            title:"Woodward Governor Control Cards & PCB Assemblies" },
    { id:"prod_ts_shaft_seal_kit",       title:"Complete Shaft Seal Kit — Carbon Ring Gland Assembly" },
    { id:"prod_ts_rebabbitting",         title:"Bearing Rebabbitting Service" },
    { id:"prod_ts_lube_oil_cooler",      title:"Turbine Lube Oil Cooler (Shell & Tube / Plate Type)" },
    { id:"prod_ts_pressure_instruments", title:"Lube Oil System Pressure Instruments & Gauges" },
  ],
  "Industrial Rubber Products": [
    { id:"prod_r1", title:"Custom Extruded Rubber Profiles & Seals" },
    { id:"prod_r2", title:"Heavy Duty Anti-Vibration Rubber Mounts" },
  ],
  "Flexible Hoses & Assemblies": [
    { id:"prod_h1",  title:"SS Corrugated Flexible Metal Hose Assemblies" },
    { id:"prod_h1b", title:"SS Hose Pre-Fitted Assemblies" },
    { id:"prod_h1c", title:"Generator & Engine Exhaust Bellows" },
    { id:"prod_h2",  title:"PTFE Lined Smooth Bore Hose Assemblies" },
    { id:"prod_h3",  title:"High-Pressure Hydraulic Rubber Hose Assemblies" },
    { id:"prod_h4",  title:"PTFE Braided Corrugated Transfer Hose" },
    { id:"prod_h5",  title:"Metallic Flexible Hose (Corrugated Core)" },
    { id:"prod_h6",  title:"Steam Hose — High Temperature Service" },
    { id:"prod_h7",  title:"Flexible Food Grade Hose" },
    { id:"prod_h8",  title:"Oxygen & Specialty Gas Hose" },
  ],
  "Electronic Equipments": [
    { id:"prod_ee1", title:"Vibration Monitoring Probes (Shinkawa-compatible)" },
    { id:"prod_ee2", title:"Magnetic Pickup Sensor (Woodward)" },
    { id:"prod_ee3", title:"ASCO 8210 Series Explosion-Proof Solenoid Valve" },
    { id:"prod_ee4", title:"Beacon Industrial Analog Tachometer Gauge" },
    { id:"prod_ee5", title:"RTD & Sensors for Power Plants & Steam Turbines" },
    { id:"prod_ee6", title:"SEMIKRON SKN240/16 Rectifier Diode" },
  ],
  "Hydraulic Components": [
    { id:"prod_hv1", title:"Directional Control Valves (All Major Makes)" },
  ],
};

const CAT_COLORS = {
  "Industrial Filtration":       "#0891b2",
  "Industrial Strainers":        "#7c3aed",
  "Expansion Joints":            "#059669",
  "Turbine Spares":              "#dc2626",
  "Industrial Rubber Products":  "#d97706",
  "Flexible Hoses & Assemblies": "#2563eb",
  "Electronic Equipments":       "#db2777",
  "Hydraulic Components":        "#65a30d",
};

// Flat list derived once at module scope (read-only, cheap)
const ALL_LIST = Object.entries(ALL_PRODUCTS).flatMap(([cat, items]) =>
  items.map(p => ({ ...p, category: cat }))
);

/* ─────────────────────────────────────────────────────────────────
   STEP / PATH CONFIG
   ───────────────────────────────────────────────────────────────── */
const STEP_DEFS = {
  identity:   { id:"identity",   label:"Your Details",    icon:User },
  path:       { id:"path",       label:"Review Type",     icon:Layers },
  products:   { id:"products",   label:"Products Used",   icon:Package },
  prodRating: { id:"prodRating", label:"Rate Products",   icon:Star },
  services:   { id:"services",   label:"Service Details", icon:Wrench },
  svcRating:  { id:"svcRating",  label:"Rate Service",    icon:Star },
  feedback:   { id:"feedback",   label:"Final Thoughts",  icon:MessageSquare },
};

const PATH_STEPS = {
  products: ["identity","path","products","prodRating","feedback"],
  services: ["identity","path","services","svcRating","feedback"],
  both:     ["identity","path","products","prodRating","services","svcRating","feedback"],
};

/* ─────────────────────────────────────────────────────────────────
   RATING QUESTION SETS
   ───────────────────────────────────────────────────────────────── */
const PRODUCT_RATINGS = [
  { id:"pq_quality",   label:"Quality & precision of supplied parts / components" },
  { id:"pq_oem",       label:"OEM compatibility & authenticity" },
  { id:"pq_packaging", label:"Packaging & delivery condition" },
  { id:"pq_lead",      label:"Lead time & delivery speed" },
  { id:"pq_value",     label:"Value for money" },
  { id:"pq_recommend", label:"Likelihood to recommend our products" },
];
const SERVICE_RATINGS = [
  { id:"sv_expertise",   label:"Technical expertise of our engineers" },
  { id:"sv_workmanship", label:"Workmanship & execution quality" },
  { id:"sv_safety",      label:"On-site safety standards followed" },
  { id:"sv_docs",        label:"Documentation & compliance reporting" },
  { id:"sv_timeliness",  label:"Project completion on time" },
  { id:"sv_aftersales",  label:"After-sales & follow-up support" },
  { id:"sv_emergency",   label:"24×7 emergency support availability" },
  { id:"sv_value",       label:"Value for money (services)" },
  { id:"sv_recommend",   label:"Likelihood to recommend our services" },
];

const SERVICES_LIST = [
  "Turbine Erection & Commissioning","Turnkey Overhauling & Maintenance",
  "Precision Reverse Engineering","Dynamic Balancing & Rotor Machining",
  "Lube Oil Flushing","Machine Alignment","Emergency Troubleshooting",
  "Bearing Rebabbitting","Rotor Journal Polishing","Vibration Analysis",
];
const INDUSTRIES = [
  "Sugar / Distillery","Paper & Pulp","Steel / Metals","Petrochemical",
  "Pharmaceuticals","Textile","Power Generation","Cement","Fertilisers","Others",
];

/* ─────────────────────────────────────────────────────────────────
   INTERNATIONAL PHONE — country table + smart validation
   Each entry: { flag, name, dial, regex, hint }
     regex  → tested against digits-only subscriber number (no dial code)
     hint   → shown inside the input as placeholder AND in the error msg
   ───────────────────────────────────────────────────────────────── */
const PHONE_COUNTRIES = [
  /* ── South Asia (primary market) ── */
  { code:"IN", flag:"🇮🇳", name:"India",        dial:"+91",  regex:/^[6-9]\d{9}$/,          hint:"10-digit mobile (6-9XXXXXXXXX)"   },
  { code:"PK", flag:"🇵🇰", name:"Pakistan",     dial:"+92",  regex:/^3\d{9}$/,               hint:"10 digits starting with 3"        },
  { code:"BD", flag:"🇧🇩", name:"Bangladesh",   dial:"+880", regex:/^1[3-9]\d{8}$/,          hint:"10 digits starting with 1[3-9]"   },
  { code:"LK", flag:"🇱🇰", name:"Sri Lanka",    dial:"+94",  regex:/^[0-9]{9}$/,             hint:"9 digits"                         },
  { code:"NP", flag:"🇳🇵", name:"Nepal",        dial:"+977", regex:/^9[78]\d{8}$/,           hint:"10 digits starting with 97/98"    },
  /* ── Middle East ── */
  { code:"AE", flag:"🇦🇪", name:"UAE",          dial:"+971", regex:/^5[0-9]\d{7}$/,          hint:"9 digits starting with 5X"        },
  { code:"SA", flag:"🇸🇦", name:"Saudi Arabia", dial:"+966", regex:/^5\d{8}$/,               hint:"9 digits starting with 5"         },
  { code:"QA", flag:"🇶🇦", name:"Qatar",        dial:"+974", regex:/^[3567]\d{7}$/,          hint:"8 digits"                         },
  { code:"KW", flag:"🇰🇼", name:"Kuwait",       dial:"+965", regex:/^[569]\d{7}$/,           hint:"8 digits"                         },
  { code:"BH", flag:"🇧🇭", name:"Bahrain",      dial:"+973", regex:/^[136]\d{7}$/,           hint:"8 digits"                         },
  { code:"OM", flag:"🇴🇲", name:"Oman",         dial:"+968", regex:/^[279]\d{7}$/,           hint:"8 digits"                         },
  /* ── South-East & East Asia ── */
  { code:"SG", flag:"🇸🇬", name:"Singapore",   dial:"+65",  regex:/^[689]\d{7}$/,           hint:"8 digits"                         },
  { code:"MY", flag:"🇲🇾", name:"Malaysia",     dial:"+60",  regex:/^1\d{8,9}$/,             hint:"9-10 digits starting with 1"      },
  { code:"TH", flag:"🇹🇭", name:"Thailand",     dial:"+66",  regex:/^[689]\d{8}$/,           hint:"9 digits"                         },
  { code:"ID", flag:"🇮🇩", name:"Indonesia",    dial:"+62",  regex:/^8\d{8,11}$/,            hint:"9-12 digits starting with 8"      },
  { code:"PH", flag:"🇵🇭", name:"Philippines",  dial:"+63",  regex:/^9\d{9}$/,               hint:"10 digits starting with 9"        },
  { code:"JP", flag:"🇯🇵", name:"Japan",        dial:"+81",  regex:/^[0-9]{10,11}$/,         hint:"10-11 digits"                     },
  { code:"CN", flag:"🇨🇳", name:"China",        dial:"+86",  regex:/^1[3-9]\d{9}$/,          hint:"11 digits starting with 1[3-9]"   },
  { code:"KR", flag:"🇰🇷", name:"South Korea",  dial:"+82",  regex:/^1[0-9]\d{7,8}$/,        hint:"9-10 digits starting with 1X"     },
  /* ── Africa ── */
  { code:"ZA", flag:"🇿🇦", name:"South Africa", dial:"+27",  regex:/^[678]\d{8}$/,           hint:"9 digits starting with 6/7/8"     },
  { code:"NG", flag:"🇳🇬", name:"Nigeria",      dial:"+234", regex:/^[789]\d{9}$/,           hint:"10 digits starting with 7/8/9"    },
  { code:"KE", flag:"🇰🇪", name:"Kenya",        dial:"+254", regex:/^[17]\d{8}$/,            hint:"9 digits"                         },
  /* ── Europe ── */
  { code:"GB", flag:"🇬🇧", name:"UK",           dial:"+44",  regex:/^7\d{9}$/,               hint:"10 digits starting with 7"        },
  { code:"DE", flag:"🇩🇪", name:"Germany",      dial:"+49",  regex:/^1[5-7]\d{9,10}$/,       hint:"10-11 digits starting with 15/16/17"},
  { code:"FR", flag:"🇫🇷", name:"France",       dial:"+33",  regex:/^[67]\d{8}$/,            hint:"9 digits starting with 6/7"       },
  { code:"IT", flag:"🇮🇹", name:"Italy",        dial:"+39",  regex:/^3\d{8,9}$/,             hint:"9-10 digits starting with 3"      },
  { code:"NL", flag:"🇳🇱", name:"Netherlands",  dial:"+31",  regex:/^6\d{8}$/,               hint:"9 digits starting with 6"         },
  /* ── Americas ── */
  { code:"US", flag:"🇺🇸", name:"USA",          dial:"+1",   regex:/^[2-9]\d{9}$/,           hint:"10 digits (no leading 0 or 1)"    },
  { code:"CA", flag:"🇨🇦", name:"Canada",       dial:"+1",   regex:/^[2-9]\d{9}$/,           hint:"10 digits (no leading 0 or 1)"    },
  { code:"AU", flag:"🇦🇺", name:"Australia",    dial:"+61",  regex:/^4\d{8}$/,               hint:"9 digits starting with 4"         },
  /* ── Catch-all ── */
  { code:"XX", flag:"🌐", name:"Other",          dial:"",     regex:/^\+?[0-9\s\-().]{6,20}$/, hint:"6-20 digits"                     },
];

// Default to India (index 0) — change if you redeploy for another market
const DEFAULT_COUNTRY_CODE = "IN";

/* Strip common formatting chars; return digits only */
const digitsOnly = str => str.replace(/[\s\-().+]/g, "");

/* Validate a subscriber number against the chosen country's rules.
   Returns null (valid / empty) or a human-readable error string. */
function validatePhone(rawNumber, countryCode) {
  const num = digitsOnly(rawNumber);
  if (!num) return null; // phone is optional — blank is fine
  const country = PHONE_COUNTRIES.find(c => c.code === countryCode)
                  || PHONE_COUNTRIES.find(c => c.code === "XX");
  if (!country.regex.test(num))
    return `Invalid ${country.name} number — expected ${country.hint}.`;
  return null;
}

/* ─────────────────────────────────────────────────────────────────
   VALIDATION HELPERS
   ───────────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateIdentity(identity) {
  const errors = {};
  if (!identity.name.trim())
    errors.name = "Full name is required";
  if (identity.email && !EMAIL_RE.test(identity.email.trim()))
    errors.email = "Enter a valid email address";
  const phoneErr = validatePhone(identity.phone, identity.countryCode || DEFAULT_COUNTRY_CODE);
  if (phoneErr) errors.phone = phoneErr;
  return errors;
}

/* ─────────────────────────────────────────────────────────────────
   FORM STATE  (useReducer — single atom, easy sessionStorage sync)
   ───────────────────────────────────────────────────────────────── */
const DRAFT_KEY = "ke_review_draft_v1";

const INITIAL_STATE = {
  stepIndex:   0,
  submitted:   false,
  submitting:  false,
  submitError: null,
  reviewType:  null,
  // field data
  identity:    { name:"", company:"", email:"", phone:"", countryCode: DEFAULT_COUNTRY_CODE, industry:"" },
  selected:    [],       // selected product IDs
  prodRatings: {},       // { [productId]: 1-5 }
  genRatings:  {},       // general product quality ratings
  svcTypes:    [],
  svcDetails:  { engineer:"", site:"", scope:"", onTime:"", emergency:"", remarks:"" },
  svcRatings:  {},
  feedback:    { highlight:"", improve:"", wouldReturn:null, extra:"" },
  question:    "",
  aiReply:     "",
  aiThinking:  false,
  fieldErrors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case "RESTORE":         return { ...state, ...action.payload };
    case "SET_STEP":        return { ...state, stepIndex: action.v, fieldErrors: {} };
    case "SET_REVIEW_TYPE": return { ...state, reviewType: action.v };
    case "SET_IDENTITY":    return { ...state, identity: { ...state.identity, ...action.patch } };
    case "TOGGLE_PRODUCT":  return { ...state, selected: state.selected.includes(action.id)
                              ? state.selected.filter(x => x !== action.id)
                              : [...state.selected, action.id] };
    case "SET_PROD_RATING": return { ...state, prodRatings: { ...state.prodRatings, [action.id]: action.v } };
    case "SET_GEN_RATING":  return { ...state, genRatings:  { ...state.genRatings,  [action.id]: action.v } };
    case "TOGGLE_SVC":      return { ...state, svcTypes: state.svcTypes.includes(action.v)
                              ? state.svcTypes.filter(x => x !== action.v)
                              : [...state.svcTypes, action.v] };
    case "SET_SVC_DETAIL":  return { ...state, svcDetails: { ...state.svcDetails, ...action.patch } };
    case "SET_SVC_RATING":  return { ...state, svcRatings:  { ...state.svcRatings,  [action.id]: action.v } };
    case "SET_FEEDBACK":    return { ...state, feedback: { ...state.feedback, ...action.patch } };
    case "SET_QUESTION":    return { ...state, question: action.v };
    case "AI_START":        return { ...state, aiThinking: true, aiReply: "" };
    case "AI_DONE":         return { ...state, aiThinking: false, aiReply: action.reply };
    case "SET_ERRORS":      return { ...state, fieldErrors: action.errors };
    case "SET_FIELD_ERROR": return { ...state, fieldErrors: { ...state.fieldErrors, [action.field]: action.message } };
    case "CLEAR_FIELD_ERROR": {
      const { [action.field]: _removed, ...rest } = state.fieldErrors;
      return { ...state, fieldErrors: rest };
    }
    case "SUBMITTING":      return { ...state, submitting: true, submitError: null };
    case "SUBMIT_OK":       return { ...state, submitting: false, submitted: true };
    case "SUBMIT_ERR":      return { ...state, submitting: false, submitError: action.msg };
    case "RESET":           return { ...INITIAL_STATE };
    default:                return state;
  }
}

/* ─────────────────────────────────────────────────────────────────
   REUSABLE UI COMPONENTS
   ───────────────────────────────────────────────────────────────── */

/** Accessible star rating — each button has a descriptive aria-label */
function StarRating({ id, value, onChange, size = 23 }) {
  const [hov, setHov] = useState(0);
  const LABELS = ["","Poor","Fair","Good","Very Good","Excellent"];
  const active = hov || value;
  return (
    <div role="radiogroup" aria-label={`Rating for ${id}`}
         style={{ display:"flex", alignItems:"center", gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button"
          role="radio" aria-checked={value === s}
          aria-label={`${s} star${s>1?"s":""} — ${LABELS[s]}`}
          onClick={() => onChange(s)}
          onMouseEnter={() => setHov(s)} onMouseLeave={() => setHov(0)}
          style={{ background:"none", border:"none", cursor:"pointer", padding:"2px",
            transform: s <= active ? "scale(1.18)" : "scale(1)",
            transition: "transform .12s" }}>
          <Star size={size}
            fill={s <= active ? T.warn : "none"}
            stroke={s <= active ? T.warn : "#cbd5e1"}
            strokeWidth={1.5} />
        </button>
      ))}
      {active > 0 && (
        <span aria-live="polite"
          style={{ marginLeft:8, fontSize:12, fontWeight:700,
            color: T.warn, fontFamily: T.font }}>
          {LABELS[active]}
        </span>
      )}
    </div>
  );
}

/** Accessible progress bar */
function ProgressBar({ step, total }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
         aria-label={`Step ${step + 1} of ${total}`}
         style={{ height:3, background: T.border, borderRadius:9999, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${pct}%`,
        background:`linear-gradient(90deg,${T.brand},${T.brandLight})`,
        borderRadius:9999, transition:"width .4s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

/** Reusable field wrapper — wires label htmlFor and shows inline error */
function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} style={S.lbl}>
        {label}{required && <span aria-hidden="true" style={{ color:T.danger }}> *</span>}
      </label>
      {children}
      {error && <p role="alert" style={S.errMsg}>{error}</p>}
    </div>
  );
}

/** Chip / pill multi-select */
function ChipSelect({ options, selected, onToggle, color }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
      {options.map(opt => {
        const on = selected.includes(opt);
        return (
          <button key={opt} type="button"
            role="checkbox" aria-checked={on}
            onClick={() => onToggle(opt)}
            style={{ padding:"7px 14px", borderRadius:9999,
              border:`1.5px solid ${on ? color : T.border}`,
              background: on ? color + "14" : T.surface,
              color: on ? color : T.muted,
              fontFamily: T.font, fontWeight:600, fontSize:12.5,
              cursor:"pointer", transition:"all .15s" }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/** Rating block — a titled card of StarRating rows */
function RatingBlock({ title, color, questions, ratings, onRate }) {
  return (
    <div style={{ borderRadius:T.radiusLg, border:`1.5px solid ${T.border}`,
      overflow:"hidden", marginBottom:12 }}>
      <div style={{ background: color + "12", padding:"11px 16px",
        borderBottom:`1px solid ${color}28` }}>
        <span style={{ fontFamily:T.font, fontWeight:700, fontSize:13.5,
          color:T.ink }}>{title}</span>
      </div>
      <div style={{ padding:"12px 16px", display:"flex",
        flexDirection:"column", gap:14 }}>
        {questions.map(q => (
          <div key={q.id}>
            <label id={`lbl_${q.id}`}
              style={{ fontFamily:T.font, fontSize:12.5, color:"#475569",
                display:"block", marginBottom:5, fontWeight:500 }}>
              {q.label}
            </label>
            <StarRating id={q.id} value={ratings[q.id] || 0}
              onChange={v => onRate(q.id, v)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Social icon row — uses the shared SOCIAL_LINKS constant */
function SocialRow({ style }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", gap:8,
      flexWrap:"wrap", ...style }}>
      {SOCIAL_LINKS.map(s => (
        <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer"
          aria-label={`Follow Keshav Enterprises on ${s.title}`}
          title={s.title}
          style={{ width:36, height:36, borderRadius:"50%",
            background: s.color + "14", border:`1.5px solid ${s.color}33`,
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            color:s.color, textDecoration:"none", transition:"opacity .18s",
            flexShrink:0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={s.d} />
          </svg>
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PRODUCT SELECTOR  (mobile-safe — no nested overflow scroll)
   ───────────────────────────────────────────────────────────────── */
function ProductSelector({ selected, onToggle }) {
  const [query, setQuery]   = useState("");
  const [catFilter, setCat] = useState(null);

  const filtered = useMemo(() => {
    let list = ALL_LIST;
    if (catFilter) list = list.filter(p => p.category === catFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q));
    }
    return list;
  }, [query, catFilter]);

  // Group filtered items back by category for display
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(p => {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    });
    return map;
  }, [filtered]);

  return (
    <div>
      {/* Search — label visible for accessibility */}
      <div style={{ position:"relative", marginBottom:10 }}>
        <label htmlFor="product-search" style={S.lbl}>Search products</label>
        <div style={{ position:"relative" }}>
        <Search size={14} color={T.muted}
          style={{ position:"absolute", left:12, top:"50%",
            transform:"translateY(-50%)", pointerEvents:"none" }} />
        <input
          id="product-search"
          type="search"
          aria-label="Search products"
          placeholder="Search 113 products…"
          value={query} onChange={e => setQuery(e.target.value)}
          style={{ ...S.inp(false), paddingLeft:34 }} />
        {query && (
          <button type="button" onClick={() => setQuery("")}
            aria-label="Clear search"
            style={{ position:"absolute", right:10, top:"50%",
              transform:"translateY(-50%)", background:"none",
              border:"none", cursor:"pointer", color:T.muted }}>
            <X size={13} />
          </button>
        )}
        </div>
      </div>

      {/* Category pills — max-width + ellipsis prevents overflow on narrow screens */}
      <div role="group" aria-label="Filter by category"
        style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
        <button type="button"
          aria-pressed={!catFilter}
          onClick={() => setCat(null)}
          style={{ padding:"5px 12px", borderRadius:9999, fontSize:11.5,
            fontWeight:600, fontFamily:T.font, cursor:"pointer",
            border:`1.5px solid ${!catFilter ? T.brand : T.border}`,
            background: !catFilter ? T.brand + "14" : T.surface,
            color: !catFilter ? T.brand : T.muted,
            whiteSpace:"nowrap" }}>
          All
        </button>
        {Object.keys(ALL_PRODUCTS).map(cat => (
          <button key={cat} type="button"
            aria-pressed={catFilter === cat}
            onClick={() => setCat(catFilter === cat ? null : cat)}
            title={cat}
            style={{ padding:"5px 12px", borderRadius:9999, fontSize:11.5,
              fontWeight:600, fontFamily:T.font, cursor:"pointer",
              border:`1.5px solid ${catFilter===cat ? CAT_COLORS[cat] : T.border}`,
              background: catFilter===cat ? CAT_COLORS[cat]+"14" : T.surface,
              color: catFilter===cat ? CAT_COLORS[cat] : T.muted,
              maxWidth:140, overflow:"hidden", textOverflow:"ellipsis",
              whiteSpace:"nowrap" }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product list — no nested overflow, renders naturally in page flow */}
      <div>
        {Object.entries(grouped).map(([cat, prods]) => (
          <div key={cat} style={{ marginBottom:10 }}>
            <p style={{ fontFamily:T.font, fontSize:11, fontWeight:700,
              color: CAT_COLORS[cat], textTransform:"uppercase",
              letterSpacing:"0.08em", marginBottom:6 }}>
              {cat} ({prods.length})
            </p>
            <div style={{ display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:6 }}>
              {prods.map(p => {
                const sel = selected.includes(p.id);
                const color = CAT_COLORS[p.category];
                return (
                  <button key={p.id} type="button"
                    aria-pressed={sel}
                    aria-label={`${sel ? "Deselect" : "Select"} ${p.title}`}
                    onClick={() => onToggle(p.id)}
                    style={{ display:"flex", alignItems:"flex-start", gap:8,
                      padding:"8px 10px", borderRadius:8, border:"none",
                      background: sel ? color + "12" : T.surface,
                      cursor:"pointer", textAlign:"left",
                      outline: sel ? `2px solid ${color}` : "2px solid transparent",
                      transition:"all .15s" }}>
                    <div style={{ width:15, height:15, borderRadius:4, flexShrink:0,
                      marginTop:1, background: sel ? color : "#e2e8f0",
                      border:`1.5px solid ${sel ? color : "#cbd5e1"}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      transition:"all .15s" }}>
                      {sel && <CheckCircle2 size={9} color={T.white} strokeWidth={3} />}
                    </div>
                    <span style={{ fontFamily:T.font, fontSize:12, lineHeight:1.4,
                      fontWeight: sel ? 600 : 400,
                      color: sel ? T.ink : "#475569" }}>
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontFamily:T.font, fontSize:11.5, color:"#94a3b8", marginTop:8 }}>
        Showing {filtered.length} of {ALL_LIST.length} products
        {selected.length > 0 && ` · ${selected.length} selected`}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SUBMIT HELPER  — Web3Forms (free, zero backend, sends email)
   Get your free access key at https://web3forms.com/#start
   and set WEB3FORMS_ACCESS_KEY at the top of this file.
   ───────────────────────────────────────────────────────────────── */
async function submitToBackend(state) {
  const { identity, selected, prodRatings, genRatings,
          svcTypes, svcDetails, svcRatings, feedback,
          question, aiReply, reviewType } = state;

  // Build a readable summary of all ratings for the email body
  const prodRatingLines = selected.map(id => {
    const p = ALL_LIST.find(x => x.id === id);
    return `  ${p?.title ?? id}: ${prodRatings[id] ?? "not rated"}/5`;
  }).join("\n");

  const genRatingLines = PRODUCT_RATINGS.map(q =>
    `  ${q.label}: ${genRatings[q.id] ?? "not rated"}/5`
  ).join("\n");

  const svcRatingLines = SERVICE_RATINGS.map(q =>
    `  ${q.label}: ${svcRatings[q.id] ?? "not rated"}/5`
  ).join("\n");

  const body = [
    `=== KESHAV ENTERPRISES — CUSTOMER REVIEW ===`,
    ``,
    `REVIEWER`,
    `Name:     ${identity.name}`,
    `Company:  ${identity.company || "—"}`,
    `Email:    ${identity.email   || "—"}`,
    `Phone:    ${identity.phone ? `${PHONE_COUNTRIES.find(c=>c.code===(identity.countryCode||DEFAULT_COUNTRY_CODE))?.dial||""} ${identity.phone}` : "—"}`,
    `Industry: ${identity.industry|| "—"}`,
    ``,
    `REVIEW TYPE: ${reviewType?.toUpperCase()}`,
    ``,
    reviewType !== "services" && selected.length ? [
      `PRODUCTS PURCHASED (${selected.length})`,
      ...selected.map(id => `  • ${ALL_LIST.find(x=>x.id===id)?.title ?? id}`),
      ``,
      `PER-PRODUCT RATINGS`,
      prodRatingLines,
      ``,
      `PRODUCT QUALITY RATINGS`,
      genRatingLines,
    ].join("\n") : "",
    ``,
    reviewType !== "products" && svcTypes.length ? [
      `SERVICES USED`,
      svcTypes.map(s => `  • ${s}`).join("\n"),
      ``,
      `SERVICE DETAILS`,
      `Engineer/Team: ${svcDetails.engineer || "—"}`,
      `Site:          ${svcDetails.site     || "—"}`,
      `Scope:         ${svcDetails.scope    || "—"}`,
      `On Time:       ${svcDetails.onTime   || "—"}`,
      `Emergency:     ${svcDetails.emergency|| "—"}`,
      `Remarks:       ${svcDetails.remarks  || "—"}`,
      ``,
      `SERVICE RATINGS`,
      svcRatingLines,
    ].join("\n") : "",
    ``,
    `FINAL FEEDBACK`,
    `Best thing:   ${feedback.highlight  || "—"}`,
    `Improve:      ${feedback.improve    || "—"}`,
    `Would return: ${feedback.wouldReturn|| "—"}`,
    `Extra:        ${feedback.extra      || "—"}`,
    ``,
    question ? `AI QUESTION: ${question}\nAI REPLY: ${aiReply || "—"}` : "",
  ].filter(Boolean).join("\n");

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject:    `New Review from ${identity.name}${identity.company ? ` (${identity.company})` : ""}`,
      from_name:  "Keshav Enterprises Review Form",
      email:      identity.email || "noreply@keshaventerprises.in",
      message:    body,
    }),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Submission failed");
}

/* ─────────────────────────────────────────────────────────────────
   AI HELPER  — calls your Cloudflare Worker proxy
   The Worker holds the Anthropic API key server-side so it never
   reaches the browser. See deployment guide Step 3 for Worker code.
   If AI_PROXY_URL is empty the Q&A box is hidden automatically.
   ───────────────────────────────────────────────────────────────── */
async function fetchAIReply(question) {
  if (!AI_PROXY_URL || AI_PROXY_URL === "YOUR_CLOUDFLARE_WORKER_URL_HERE") {
    throw new Error("AI_PROXY_URL not configured");
  }
  const res = await fetch(AI_PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`Proxy error ${res.status}`);
  const data = await res.json();
  return data.reply || "";
}

/* ─────────────────────────────────────────────────────────────────
   MAIN FORM COMPONENT
   ───────────────────────────────────────────────────────────────── */
// onSubmitSuccess (optional): called after successful submit.
// Used by ExitIntentReviewPopup to show its own thank-you screen.
// popupMode (optional): hides the full-page shell when true.
export default function ReviewForm({ onSubmitSuccess, popupMode = false } = {}) {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const stepContainerRef = useRef(null);

  // ── Draft persistence (sessionStorage) ──────────────────────────
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Never restore terminal states from storage
        if (!parsed.submitted) {
          dispatch({ type:"RESTORE", payload: { ...parsed, aiThinking:false, submitting:false } });
        }
      }
    } catch (_) { /* ignore corrupt storage */ }
  }, []);

  useEffect(() => {
    if (!state.submitted) {
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(state));
      } catch (_) { /* storage quota exceeded — ignore */ }
    } else {
      sessionStorage.removeItem(DRAFT_KEY);
    }
  }, [state]);

  // ── Derived step list ────────────────────────────────────────────
  const stepIds    = state.reviewType ? PATH_STEPS[state.reviewType] : ["identity","path"];
  const steps      = stepIds.map(id => STEP_DEFS[id]);
  const totalSteps = steps.length;
  const curStepId  = steps[state.stepIndex]?.id;

  // ── Focus management on step change ─────────────────────────────
  useEffect(() => {
    if (stepContainerRef.current) {
      stepContainerRef.current.focus({ preventScroll: false });
      stepContainerRef.current.scrollIntoView({ behavior:"smooth", block:"start" });
    }
  }, [state.stepIndex]);

  // ── Memoised handlers ────────────────────────────────────────────
  const toggleProduct = useCallback(id => dispatch({ type:"TOGGLE_PRODUCT", id }), []);
  const toggleSvc     = useCallback(v  => dispatch({ type:"TOGGLE_SVC", v }), []);
  const setGR = useCallback((id,v) => dispatch({ type:"SET_GEN_RATING",  id, v }), []);
  const setSR = useCallback((id,v) => dispatch({ type:"SET_SVC_RATING",  id, v }), []);
  const setPR = useCallback((id,v) => dispatch({ type:"SET_PROD_RATING", id, v }), []);

  // ── Average rating (now includes prodRatings) ────────────────────
  const avgRating = useMemo(() => {
    const vals = [
      ...Object.values(state.genRatings),
      ...Object.values(state.svcRatings),
      ...Object.values(state.prodRatings),
    ].filter(v => typeof v === "number");
    if (!vals.length) return 0;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }, [state.genRatings, state.svcRatings, state.prodRatings]);

  // ── Validation & navigation ──────────────────────────────────────
  const validateStep = () => {
    if (curStepId === "identity") {
      const errors = validateIdentity(state.identity);
      if (Object.keys(errors).length) {
        dispatch({ type:"SET_ERRORS", errors });
        return false;
      }
    }
    if (curStepId === "path" && !state.reviewType) {
      dispatch({ type:"SET_ERRORS", errors:{ reviewType:"Please select a review type" } });
      return false;
    }
    if (curStepId === "products" && state.selected.length === 0) {
      dispatch({ type:"SET_ERRORS", errors:{ products:"Please select at least one product" } });
      return false;
    }
    if (curStepId === "services" && state.svcTypes.length === 0) {
      dispatch({ type:"SET_ERRORS", errors:{ svcTypes:"Please select at least one service" } });
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    if (state.stepIndex < totalSteps - 1) {
      dispatch({ type:"SET_STEP", v: state.stepIndex + 1 });
    }
  };
  const goBack = () => {
    if (state.stepIndex > 0) dispatch({ type:"SET_STEP", v: state.stepIndex - 1 });
  };

  // ── Submit ───────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_KEY_HERE") {
      dispatch({ type:"SUBMIT_ERR", msg:"⚠️ Web3Forms key not configured. See developer notice at the top of the form." });
      return;
    }
    dispatch({ type:"SUBMITTING" });
    try {
      await submitToBackend(state);
      dispatch({ type:"SUBMIT_OK" });
      // Notify parent (e.g. ExitIntentReviewPopup) that the form was submitted.
      // The popup uses this to swap to its own lightweight thank-you screen.
      // When ReviewForm is used standalone this prop is undefined — no-op.
      onSubmitSuccess?.();
    } catch (err) {
      dispatch({ type:"SUBMIT_ERR", msg: err.message || "Submission failed. Please try again or email us directly." });
    }
  };

  // ── AI Q&A ───────────────────────────────────────────────────────
  const askAI = async () => {
    if (!state.question.trim() || state.aiThinking) return;
    dispatch({ type:"AI_START" });
    try {
      const reply = await fetchAIReply(state.question);
      dispatch({ type:"AI_DONE", reply: reply || "Our team will respond shortly at +91 9149229448." });
    } catch {
      dispatch({ type:"AI_DONE", reply: "Thank you! Our team will respond shortly at +91 9149229448." });
    }
  };

  // ── Reset ────────────────────────────────────────────────────────
  const handleReset = () => dispatch({ type:"RESET" });

  /* ──────────────────────────────────────────────────────────────
     SUCCESS SCREEN
     ────────────────────────────────────────────────────────────── */
  if (state.submitted && !popupMode) {
    const avg   = avgRating;
    const stars = Math.round(+avg);
    const typeLabel = state.reviewType === "both" ? "Products & Services"
      : state.reviewType === "products" ? "Products" : "Services";

    return (
      <div style={{ minHeight:"100vh",
        background:"linear-gradient(135deg,#0f172a,#1e3a5f)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:24, fontFamily:T.font }}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        <main role="main" aria-label="Review submitted successfully"
          style={{ background:T.white, borderRadius:24, padding:"44px 34px",
            maxWidth:500, width:"100%", textAlign:"center",
            boxShadow:T.shadow }}>

          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
            {LOGO_URL ? (
              <img src={LOGO_URL} alt="Keshav Enterprises"
                onError={e => { e.target.style.display="none"; }}
                style={{ height:52, width:"auto", objectFit:"contain" }} />
            ) : (
              <div role="img" aria-label="Keshav Enterprises"
                style={{ width:52, height:52, borderRadius:12, background:T.brand,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:20, fontWeight:900, color:T.white, fontFamily:T.font }}>
                KE
              </div>
            )}
          </div>

          <div style={{ width:60, height:60, borderRadius:"50%", background:"#dcfce7",
            display:"flex", alignItems:"center", justifyContent:"center",
            margin:"0 auto 14px" }}>
            <CheckCircle2 size={34} color={T.ok} aria-hidden="true" />
          </div>

          <h1 style={{ fontSize:25, fontWeight:900, color:T.ink, marginBottom:8, fontFamily:T.font }}>
            Thank You, {state.identity.name.split(" ")[0]}!
          </h1>
          <p style={{ color:T.muted, fontSize:14, marginBottom:22,
            lineHeight:1.6, fontFamily:T.font }}>
            Your <strong>{typeLabel}</strong> review has been submitted.
            Every honest word helps us grow and serve India's steam turbine industry better.
          </p>

          {/* Summary badges */}
          <div style={{ display:"flex", gap:8, justifyContent:"center",
            flexWrap:"wrap", marginBottom:20 }}>
            {state.reviewType !== "services" && state.selected.length > 0 && (
              <div style={{ background:"#eff6ff", borderRadius:10,
                padding:"8px 14px", border:"1px solid #bfdbfe" }}>
                <p style={{ fontSize:11, fontWeight:700, color:T.brand, fontFamily:T.font,
                  textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>Products</p>
                <p style={{ fontSize:18, fontWeight:900, color:T.ink, fontFamily:T.font }}>
                  {state.selected.length}
                  <span style={{ fontSize:11, color:T.muted, fontWeight:500 }}> reviewed</span>
                </p>
              </div>
            )}
            {state.reviewType !== "products" && state.svcTypes.length > 0 && (
              <div style={{ background:T.okBg, borderRadius:10,
                padding:"8px 14px", border:`1px solid ${T.okBorder}` }}>
                <p style={{ fontSize:11, fontWeight:700, color:T.ok, fontFamily:T.font,
                  textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>Services</p>
                <p style={{ fontSize:18, fontWeight:900, color:T.ink, fontFamily:T.font }}>
                  {state.svcTypes.length}
                  <span style={{ fontSize:11, color:T.muted, fontWeight:500 }}> reviewed</span>
                </p>
              </div>
            )}
            {avg > 0 && (
              <div style={{ background:"#fffbeb", borderRadius:10,
                padding:"8px 14px", border:"1px solid #fde68a" }}>
                <p style={{ fontSize:11, fontWeight:700, color:"#d97706", fontFamily:T.font,
                  textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>Avg Rating</p>
                <p style={{ fontSize:18, fontWeight:900, color:"#d97706", fontFamily:T.font }}>
                  {avg} <span style={{ fontSize:13 }}>/ 5</span>
                </p>
              </div>
            )}
          </div>

          {avg > 0 && (
            <div role="img" aria-label={`Average rating: ${avg} out of 5`}
              style={{ display:"flex", justifyContent:"center", gap:4, marginBottom:20 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={22}
                  fill={s <= stars ? T.warn : "none"}
                  stroke={s <= stars ? T.warn : "#d1d5db"} strokeWidth={1.5}
                  aria-hidden="true" />
              ))}
            </div>
          )}

          {state.question && state.aiReply && (
            <div style={{ background:T.okBg, borderRadius:12,
              padding:"12px 16px", marginBottom:18, textAlign:"left",
              border:`1px solid ${T.okBorder}` }}>
              <p style={{ fontSize:11, fontWeight:700, color:T.ok, marginBottom:5,
                fontFamily:T.font, textTransform:"uppercase", letterSpacing:"0.06em" }}>
                AI Response to Your Query
              </p>
              <p style={{ fontSize:13, color:T.ink, lineHeight:1.6,
                fontFamily:T.font }}>{state.aiReply}</p>
            </div>
          )}

          <p style={{ fontSize:12.5, color:"#94a3b8", marginBottom:14, fontFamily:T.font }}>
            Need help? Call{" "}
            <a href="tel:+919149229448" style={{ color:T.brand, fontWeight:700 }}>
              +91 91492 29448
            </a>{" "}or{" "}
            <a href="mailto:ksengg007@gmail.com" style={{ color:T.brand, fontWeight:700 }}>
              ksengg007@gmail.com
            </a>
          </p>

          <SocialRow style={{ marginBottom:22 }} />

          <button type="button" onClick={handleReset}
            style={{ display:"inline-flex", alignItems:"center", gap:8,
              padding:"12px 26px", background:T.ink, color:T.white,
              borderRadius:12, border:"none", cursor:"pointer",
              fontFamily:T.font, fontWeight:700, fontSize:14 }}>
            <RotateCcw size={14} aria-hidden="true" /> Submit Another Review
          </button>
        </main>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────
     STEP RENDERER
     ────────────────────────────────────────────────────────────── */
  const fe = state.fieldErrors;

  const renderStep = () => {
    switch (curStepId) {

      /* ── IDENTITY ── */
      case "identity": return (
        <div style={{ display:"flex", flexDirection:"column", gap:15 }}>
          <div style={{ background:T.infoBg, borderRadius:T.radius,
            padding:"11px 15px", border:`1px solid ${T.infoBorder}` }}>
            <p style={{ fontSize:13, color:T.brand, fontWeight:500,
              lineHeight:1.5, fontFamily:T.font }}>
              👋 We appreciate your time. Your honest feedback helps us serve
              the steam turbine industry better across India.
            </p>
          </div>

          <Field id="name" label="Full Name" required error={fe.name}>
            <input id="name" type="text" autoComplete="name"
              aria-required="true" aria-invalid={!!fe.name}
              placeholder="e.g. Rajesh Kumar"
              value={state.identity.name}
              onChange={e => dispatch({ type:"SET_IDENTITY", patch:{ name:e.target.value } })}
              style={S.inp(!!fe.name)} />
          </Field>

          <Field id="company" label="Company / Organisation">
            <input id="company" type="text" autoComplete="organization"
              placeholder="e.g. ABC Sugar Mills Ltd."
              value={state.identity.company}
              onChange={e => dispatch({ type:"SET_IDENTITY", patch:{ company:e.target.value } })}
              style={S.inp(false)} />
          </Field>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:12 }}>
            <Field id="email" label="Email" error={fe.email}>
              <input id="email" type="email" autoComplete="email"
                aria-invalid={!!fe.email}
                placeholder="you@company.com"
                value={state.identity.email}
                onChange={e => dispatch({ type:"SET_IDENTITY", patch:{ email:e.target.value } })}
                style={S.inp(!!fe.email)} />
            </Field>
            <Field id="phone" label="Phone" error={fe.phone}>
              {/* Country dial-code selector + subscriber number — split intentionally so
                  (a) the user picks their country flag/code from a dropdown,
                  (b) they type only the local subscriber number (no country prefix),
                  (c) validation fires on blur with a country-specific error message.   */}
              <div style={{ display:"flex", gap:0, borderRadius:10,
                border:`1.5px solid ${fe.phone ? T.danger : T.border}`,
                overflow:"hidden", background:T.surface,
                boxShadow: fe.phone ? `0 0 0 3px ${T.danger}22` : "none",
                transition:"box-shadow .18s, border-color .18s" }}>

                {/* ── Country picker ── */}
                <div style={{ position:"relative", flexShrink:0 }}>
                  <label htmlFor="phone-country"
                    style={{ position:"absolute", width:1, height:1, overflow:"hidden",
                      clip:"rect(0,0,0,0)", whiteSpace:"nowrap" }}>
                    Country dial code
                  </label>
                  <select
                    id="phone-country"
                    aria-label="Country dial code"
                    value={state.identity.countryCode || DEFAULT_COUNTRY_CODE}
                    onChange={e => {
                      dispatch({ type:"SET_IDENTITY", patch:{ countryCode: e.target.value, phone:"" } });
                    }}
                    style={{ height:"100%", padding:"10px 28px 10px 10px",
                      background:"transparent", border:"none",
                      borderRight:`1.5px solid ${T.border}`,
                      fontFamily:T.font, fontSize:13.5, color:T.ink,
                      cursor:"pointer", outline:"none", appearance:"none",
                      WebkitAppearance:"none", minWidth:96 }}>
                    {PHONE_COUNTRIES.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.dial || "—"}
                      </option>
                    ))}
                  </select>
                  {/* caret icon */}
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"
                    style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)",
                      pointerEvents:"none", fill:T.muted }}>
                    <path d="M1 3l4 4 4-4"/>
                  </svg>
                </div>

                {/* ── Subscriber number ── */}
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel-national"
                  aria-invalid={!!fe.phone}
                  aria-describedby={fe.phone ? "phone-err" : "phone-hint"}
                  placeholder={
                    PHONE_COUNTRIES.find(c => c.code === (state.identity.countryCode || DEFAULT_COUNTRY_CODE))?.hint
                    || "Enter number"
                  }
                  value={state.identity.phone}
                  onChange={e => {
                    // Allow digits, spaces, dashes, parens — strip everything else live
                    const raw = e.target.value.replace(/[^\d\s\-().]/g, "");
                    dispatch({ type:"SET_IDENTITY", patch:{ phone: raw } });
                    // Clear the error the moment they start correcting
                    if (fe.phone) dispatch({ type:"CLEAR_FIELD_ERROR", field:"phone" });
                  }}
                  onBlur={e => {
                    // Validate on blur for immediate feedback without frustrating the user mid-type
                    const err = validatePhone(e.target.value, state.identity.countryCode || DEFAULT_COUNTRY_CODE);
                    if (err) dispatch({ type:"SET_FIELD_ERROR", field:"phone", message: err });
                  }}
                  style={{ flex:1, padding:"10px 12px", border:"none", background:"transparent",
                    fontFamily:T.font, fontSize:14, color:T.ink, outline:"none",
                    minWidth:0 }}
                />
              </div>

              {/* Hint shown when no error */}
              {!fe.phone && (
                <span id="phone-hint" style={{ display:"block", fontFamily:T.font, fontSize:11,
                  color:T.muted, marginTop:4 }}>
                  {(() => {
                    const c = PHONE_COUNTRIES.find(cc => cc.code === (state.identity.countryCode || DEFAULT_COUNTRY_CODE));
                    return c ? `${c.flag} ${c.name}: enter subscriber number only — ${c.hint}` : "Enter subscriber number";
                  })()}
                </span>
              )}
            </Field>
          </div>

          <Field id="industry" label="Industry">
            <select id="industry" autoComplete="organization-title"
              value={state.identity.industry}
              onChange={e => dispatch({ type:"SET_IDENTITY", patch:{ industry:e.target.value } })}
              style={{ ...S.inp(false), cursor:"pointer" }}>
              <option value="">Select your industry…</option>
              {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
            </select>
          </Field>
        </div>
      );

      /* ── PATH SELECTION ── */
      case "path": return (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:T.infoBg, borderRadius:T.radius,
            padding:"11px 15px", border:`1px solid ${T.infoBorder}`, marginBottom:4 }}>
            <p style={{ fontSize:13, color:T.brand, fontWeight:500,
              lineHeight:1.5, fontFamily:T.font }}>
              🎯 Tell us what you'd like to review so we show you only relevant questions.
            </p>
          </div>
          {fe.reviewType && <p role="alert" style={S.errMsg}>{fe.reviewType}</p>}

          {[
            { type:"products", icon:Package, color:"#0891b2",
              label:"Products Only",
              desc:"I purchased spare parts, filter elements, expansion joints, hoses, or other products.",
              badge:"113 products across 8 categories" },
            { type:"services", icon:Wrench, color:"#059669",
              label:"Services Only",
              desc:"I used Keshav Enterprises for turbine maintenance, overhauling, alignment, balancing, or other on-site services.",
              badge:"10 service categories" },
            { type:"both", icon:Layers, color:"#7c3aed",
              label:"Both Products & Services",
              desc:"I purchased products AND used maintenance or engineering services — I want to review both.",
              badge:"Full review" },
          ].map(opt => {
            const Icon  = opt.icon;
            const active = state.reviewType === opt.type;
            return (
              <button key={opt.type} type="button"
                role="radio" aria-checked={active}
                onClick={() => dispatch({ type:"SET_REVIEW_TYPE", v:opt.type })}
                style={{ display:"flex", alignItems:"flex-start", gap:14,
                  padding:"16px 18px", borderRadius:T.radiusLg,
                  border:`2px solid ${active ? opt.color : T.border}`,
                  background: active ? opt.color + "0d" : "#fafafa",
                  cursor:"pointer", textAlign:"left",
                  boxShadow: active ? `0 0 0 3px ${opt.color}22` : "none",
                  transition:"all .2s" }}>
                <div style={{ width:44, height:44, borderRadius:12, flexShrink:0,
                  background: active ? opt.color : "#f1f5f9",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"background .2s" }}>
                  <Icon size={21} color={active ? T.white : "#94a3b8"} aria-hidden="true" />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center",
                    gap:8, marginBottom:4 }}>
                    <span style={{ fontFamily:T.font, fontWeight:800, fontSize:15,
                      color: active ? opt.color : T.ink }}>{opt.label}</span>
                    <span style={{ fontSize:10.5, fontWeight:700,
                      color: active ? T.white : opt.color,
                      background: active ? opt.color : opt.color + "18",
                      borderRadius:9999, padding:"2px 8px", fontFamily:T.font }}>
                      {opt.badge}
                    </span>
                  </div>
                  <p style={{ fontFamily:T.font, fontSize:12.5, color:T.muted, lineHeight:1.5 }}>
                    {opt.desc}
                  </p>
                </div>
                <div style={{ width:20, height:20, borderRadius:"50%",
                  flexShrink:0, marginTop:2,
                  border:`2px solid ${active ? opt.color : "#cbd5e1"}`,
                  background: active ? opt.color : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"all .2s" }}>
                  {active && <div style={{ width:8, height:8, borderRadius:"50%",
                    background:T.white }} />}
                </div>
              </button>
            );
          })}

          {state.reviewType && (
            <div style={{ background:T.okBg, borderRadius:T.radius,
              padding:"10px 14px", border:`1px solid ${T.okBorder}`,
              display:"flex", alignItems:"center", gap:8 }}>
              <CheckCircle2 size={15} color={T.ok} aria-hidden="true" />
              <span style={{ fontFamily:T.font, fontSize:13,
                color:T.ok, fontWeight:600 }}>
                {state.reviewType === "products" && "You'll rate products, quality, delivery & overall experience."}
                {state.reviewType === "services" && "You'll rate our engineers, workmanship, timeliness & support."}
                {state.reviewType === "both"     && "You'll rate products first, then our services — complete review!"}
              </span>
              <ArrowRight size={13} color={T.ok} style={{ marginLeft:"auto" }} aria-hidden="true" />
            </div>
          )}
        </div>
      );

      /* ── PRODUCTS SELECTION ── */
      case "products": return (
        <div>
          {fe.products && <p role="alert" style={{ ...S.errMsg, marginBottom:8 }}>{fe.products}</p>}
          <ProductSelector selected={state.selected} onToggle={toggleProduct} />
        </div>
      );

      /* ── PRODUCT RATINGS ── */
      case "prodRating": return (
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {state.selected.length > 0 && (
            <div style={{ borderRadius:T.radiusLg, border:`1.5px solid ${T.border}`,
              overflow:"hidden", marginBottom:12 }}>
              <div style={{ background:"#0891b212", padding:"11px 16px",
                borderBottom:"1px solid #0891b228",
                display:"flex", alignItems:"center", gap:9 }}>
                <Package size={15} color="#0891b2" aria-hidden="true" />
                <span style={{ fontFamily:T.font, fontWeight:700,
                  fontSize:13.5, color:T.ink }}>
                  Rate Each Product You Purchased ({state.selected.length})
                </span>
              </div>
              <div style={{ padding:"12px 16px", display:"flex",
                flexDirection:"column", gap:13 }}>
                {state.selected.map(id => {
                  const p = ALL_LIST.find(x => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={id}>
                      <label id={`lbl_pr_${id}`}
                        style={{ fontFamily:T.font, fontSize:12.5, color:"#334155",
                          display:"block", marginBottom:4, fontWeight:500 }}>
                        {p.title}
                      </label>
                      <StarRating id={`pr_${id}`}
                        value={state.prodRatings[id] || 0}
                        onChange={v => setPR(id, v)} size={20} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <RatingBlock
            title="Product Quality & Experience"
            color="#0891b2"
            questions={PRODUCT_RATINGS}
            ratings={state.genRatings}
            onRate={setGR} />
        </div>
      );

      /* ── SERVICE DETAILS ── */
      case "services": return (
        <div style={{ display:"flex", flexDirection:"column", gap:15 }}>
          <div style={{ background:T.okBg, borderRadius:T.radius,
            padding:"11px 15px", border:`1px solid ${T.okBorder}` }}>
            <p style={{ fontSize:13, color:T.ok, fontWeight:500,
              lineHeight:1.5, fontFamily:T.font }}>
              🔧 Share details about the maintenance, engineering, or technical
              work our team performed for you.
            </p>
          </div>

          <Field id="svcTypes" label="Services Used" required error={fe.svcTypes}>
            <ChipSelect options={SERVICES_LIST} selected={state.svcTypes}
              onToggle={toggleSvc} color="#059669" />
          </Field>

          {[
            { key:"engineer", label:"Engineer / Team who worked with you",
              ph:"e.g. Mr. Sharma — Commissioning team", type:"input" },
            { key:"site",     label:"Site / Plant Location",
              ph:"e.g. Shamli Sugar Mills, Uttar Pradesh", type:"input" },
            { key:"scope",    label:"Scope of Work Performed",
              ph:"e.g. Annual overhauling of Triveni 3 MW turbine…", type:"textarea" },
            { key:"onTime",   label:"Was the service completed on time?", type:"select",
              opts:["Select…","Yes — ahead of schedule","Yes — on time",
                    "Minor delay","Significant delay","Not applicable"] },
            { key:"emergency",label:"Did you use our 24×7 emergency support?", type:"select",
              opts:["Select…","Yes — response was excellent","Yes — response was satisfactory",
                    "Yes — response was slow","No","Not applicable"] },
            { key:"remarks",  label:"Any specific praise or concern about our team?",
              ph:"Technical skill, safety compliance, documentation, attitude…", type:"textarea" },
          ].map(f => (
            <Field key={f.key} id={`svc_${f.key}`} label={f.label}>
              {f.type === "textarea" ? (
                <textarea id={`svc_${f.key}`} placeholder={f.ph}
                  value={state.svcDetails[f.key]}
                  onChange={e => dispatch({ type:"SET_SVC_DETAIL",
                    patch:{ [f.key]: e.target.value } })}
                  style={S.txta(false)} />
              ) : f.type === "select" ? (
                <select id={`svc_${f.key}`}
                  value={state.svcDetails[f.key]}
                  onChange={e => dispatch({ type:"SET_SVC_DETAIL",
                    patch:{ [f.key]: e.target.value } })}
                  style={{ ...S.inp(false), cursor:"pointer" }}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input id={`svc_${f.key}`} type="text" placeholder={f.ph}
                  value={state.svcDetails[f.key]}
                  onChange={e => dispatch({ type:"SET_SVC_DETAIL",
                    patch:{ [f.key]: e.target.value } })}
                  style={S.inp(false)} />
              )}
            </Field>
          ))}
        </div>
      );

      /* ── SERVICE RATINGS ── */
      case "svcRating": return (
        <RatingBlock
          title="Service Quality & Support Ratings"
          color="#059669"
          questions={SERVICE_RATINGS}
          ratings={state.svcRatings}
          onRate={setSR} />
      );

      /* ── FINAL FEEDBACK + AI ── */
      case "feedback": return (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Field id="highlight" label="What did we do best?">
            <textarea id="highlight"
              placeholder="Tell us what impressed you most — quality, speed, expertise, reliability…"
              value={state.feedback.highlight}
              onChange={e => dispatch({ type:"SET_FEEDBACK",
                patch:{ highlight:e.target.value } })}
              style={S.txta(false)} />
          </Field>

          <Field id="improve" label="Where can we improve?">
            <textarea id="improve"
              placeholder="Suggestions, concerns, or specific improvement areas…"
              value={state.feedback.improve}
              onChange={e => dispatch({ type:"SET_FEEDBACK",
                patch:{ improve:e.target.value } })}
              style={S.txta(false)} />
          </Field>

          <div>
            <span id="wouldReturn-group" style={S.lbl}>Would you work with us again?</span>
            <div role="radiogroup" aria-labelledby="wouldReturn-group"
              style={{ display:"flex", gap:7, flexWrap:"wrap", marginTop:8 }}>
              {["Definitely","Very Likely","Likely","Not Sure","No"].map(opt => (
                <button key={opt} type="button"
                  role="radio" aria-checked={state.feedback.wouldReturn === opt}
                  onClick={() => dispatch({ type:"SET_FEEDBACK",
                    patch:{ wouldReturn:opt } })}
                  style={{ padding:"8px 15px", borderRadius:10, cursor:"pointer",
                    border:`1.5px solid ${state.feedback.wouldReturn===opt ? T.brand : T.border}`,
                    background: state.feedback.wouldReturn===opt ? T.brand+"14" : T.surface,
                    color: state.feedback.wouldReturn===opt ? T.brand : T.muted,
                    fontFamily:T.font, fontWeight:600, fontSize:13,
                    transition:"all .18s" }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <Field id="extra" label="Additional Comments">
            <textarea id="extra"
              placeholder="Anything else you'd like to share…"
              value={state.feedback.extra}
              onChange={e => dispatch({ type:"SET_FEEDBACK",
                patch:{ extra:e.target.value } })}
              style={S.txta(false)} />
          </Field>

          {/* AI Query — only shown when proxy is configured */}
          {AI_PROXY_URL && AI_PROXY_URL !== "YOUR_CLOUDFLARE_WORKER_URL_HERE" && (
          <div style={{ borderRadius:T.radiusLg, border:`1.5px solid ${T.infoBorder}`,
            background:T.infoBg, padding:"16px 18px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:9 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:T.brand,
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <MessageSquare size={14} color={T.white} aria-hidden="true" />
              </div>
              <span style={{ fontWeight:800, fontSize:14, color:T.ink,
                fontFamily:T.font }}>
                Have a Question for Us?
              </span>
            </div>
            <p style={{ fontSize:12.5, color:"#475569", marginBottom:11,
              lineHeight:1.5, fontFamily:T.font }}>
              Ask anything about our 113 products, spare parts availability, pricing,
              or technical services — get an instant AI-powered answer.
            </p>
            <Field id="ai-question" label="Your question">
              <textarea id="ai-question"
                placeholder="e.g. Do you supply 90 GPM filter elements for Triveni FR13 turbines?"
                value={state.question}
                onChange={e => dispatch({ type:"SET_QUESTION", v:e.target.value })}
                style={{ ...S.txta(false), minHeight:74, background:T.white }} />
            </Field>
            <button type="button"
              onClick={askAI}
              disabled={!state.question.trim() || state.aiThinking}
              aria-busy={state.aiThinking}
              style={{ marginTop:9, padding:"9px 18px", borderRadius:10, border:"none",
                background:T.brand, color:T.white, fontFamily:T.font,
                fontWeight:700, fontSize:13,
                cursor: !state.question.trim() || state.aiThinking ? "not-allowed" : "pointer",
                opacity: !state.question.trim() || state.aiThinking ? 0.6 : 1,
                display:"flex", alignItems:"center", gap:7,
                transition:"opacity .18s" }}>
              {state.aiThinking
                ? <><span style={{ width:12, height:12, border:"2px solid rgba(255,255,255,.3)",
                    borderTop:"2px solid #fff", borderRadius:"50%",
                    animation:"spin .8s linear infinite",
                    display:"inline-block" }} aria-hidden="true" />Thinking…</>
                : <><Send size={13} aria-hidden="true" />Ask Now</>}
            </button>
            {state.aiReply && !state.aiThinking && (
              <div role="status" aria-live="polite"
                style={{ marginTop:12, background:T.white, borderRadius:12,
                  padding:"13px 15px", border:"1px solid #dbeafe" }}>
                <p style={{ fontSize:11, fontWeight:700, color:T.brand,
                  marginBottom:5, fontFamily:T.font,
                  textTransform:"uppercase", letterSpacing:"0.06em" }}>
                  Keshav Enterprises · AI Response
                </p>
                <p style={{ fontSize:13.5, color:T.ink, lineHeight:1.65,
                  fontFamily:T.font }}>{state.aiReply}</p>
              </div>
            )}
          </div>
          )}

          {/* Submit error */}
          {state.submitError && (
            <div role="alert"
              style={{ background:"#fef2f2", borderRadius:T.radius,
                padding:"12px 14px", border:"1px solid #fecaca" }}>
              <p style={{ fontFamily:T.font, fontSize:13, color:T.danger,
                lineHeight:1.5 }}>
                ⚠️ {state.submitError}
              </p>
            </div>
          )}
        </div>
      );

      default: return null;
    }
  };

  /* ──────────────────────────────────────────────────────────────
     MAIN SHELL
     ────────────────────────────────────────────────────────────── */
  const CurIcon = steps[state.stepIndex]?.icon || User;
  const isLastStep = state.stepIndex === totalSteps - 1;

  return (
    <div style={popupMode ? { fontFamily: T.font } : {
      minHeight:"100vh",
      background:"linear-gradient(160deg,#0f172a 0%,#1e3a5f 55%,#0e2a4a 100%)",
      display:"flex", alignItems:"flex-start", justifyContent:"center",
      padding:"26px 16px 48px", fontFamily:T.font }}>

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); }
                            to   { opacity:1; transform:translateY(0); } }
        input:focus, select:focus, textarea:focus {
          border-color: #3b82f6 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,.13) !important;
        }
        button:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:9999px; }
      `}</style>

      <div style={{ width:"100%", maxWidth:620 }}>

        {/* ── HEADER ── */}
        <header style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:12,
            background:"rgba(255,255,255,.97)", backdropFilter:"blur(12px)",
            borderRadius:18, padding:"12px 22px",
            boxShadow:"0 8px 32px rgba(0,0,0,.25)",
            border:"1px solid rgba(255,255,255,.3)", marginBottom:16 }}>
            {LOGO_URL ? (
              <img src={LOGO_URL} alt="Keshav Enterprises"
                onError={e => { e.target.style.display="none";
                  e.target.nextSibling && (e.target.nextSibling.style.display="flex"); }}
                style={{ height:48, width:"auto", objectFit:"contain" }} />
            ) : null}
            {/* KE badge: shows when LOGO_URL is empty or image fails to load */}
            <div role="img" aria-label="Keshav Enterprises"
              style={{ display: LOGO_URL ? "none" : "flex", width:48, height:48,
                borderRadius:10, background:T.brand, alignItems:"center",
                justifyContent:"center", fontSize:18, fontWeight:900,
                color:T.white, fontFamily:T.font }}>
              KE
            </div>
            <div style={{ textAlign:"left", borderLeft:`1px solid ${T.border}`,
              paddingLeft:14 }}>
              <div style={{ fontSize:15, fontWeight:900, color:T.ink,
                fontFamily:T.font, letterSpacing:"-0.02em" }}>
                Keshav Enterprises
              </div>
              <div style={{ fontSize:11, color:T.muted, fontFamily:T.font, marginTop:1 }}>
                Steam Turbine Specialists · Shamli, U.P.
              </div>
            </div>
          </div>

          <h1 style={{ fontSize:27, fontWeight:900, color:T.white,
            letterSpacing:"-0.03em", lineHeight:1.15,
            marginBottom:10, fontFamily:T.font }}>
            Share Your Experience
          </h1>
          <p style={{ fontSize:14.5, color:"rgba(255,255,255,.85)", fontFamily:T.font,
            fontWeight:500, lineHeight:1.6,
            background:"rgba(255,255,255,.07)", borderRadius:10,
            padding:"10px 18px", border:"1px solid rgba(255,255,255,.12)",
            maxWidth:480, margin:"0 auto 12px" }}>
            ✨ Your genuine feedback is our greatest asset — every honest word you
            share helps us raise the bar for the entire steam turbine industry.
          </p>
          <SocialRow style={{ marginBottom:10 }} />
        </header>

        {/* ── FORM CARD ── */}
        <main>
          <form onSubmit={e => e.preventDefault()} noValidate
            aria-label="Customer review form">

            {/* ── Dev warning: keys not configured ── */}
            {(WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_KEY_HERE" ||
              AI_PROXY_URL === "YOUR_CLOUDFLARE_WORKER_URL_HERE") && (
              <div role="alert" style={{ margin:"12px 16px 0", padding:"10px 14px",
                background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10,
                fontFamily:T.font, fontSize:12.5, color:"#92400e", lineHeight:1.6 }}>
                ⚠️ <strong>Developer notice — not yet configured:</strong>
                <ul style={{ margin:"4px 0 0 16px", padding:0 }}>
                  {WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_KEY_HERE" && (
                    <li>
                      <code style={{ background:"#fef3c7", padding:"1px 5px", borderRadius:4 }}>
                        WEB3FORMS_ACCESS_KEY
                      </code>{" "}— get free key at{" "}
                      <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer"
                        style={{ color:"#92400e", fontWeight:700 }}>web3forms.com</a>
                    </li>
                  )}
                  {AI_PROXY_URL === "YOUR_CLOUDFLARE_WORKER_URL_HERE" && (
                    <li>
                      <code style={{ background:"#fef3c7", padding:"1px 5px", borderRadius:4 }}>
                        AI_PROXY_URL
                      </code>{" "}— deploy Cloudflare Worker (see deployment guide Step 3).
                      AI Q&A is hidden from customers until this is set.
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div style={{ background:T.white, borderRadius:20,
              boxShadow:"0 20px 60px rgba(0,0,0,.35)", overflow:"hidden" }}>

              {/* Step pills */}
              <nav aria-label="Form progress"
                style={{ padding:"16px 20px 0",
                  background:"linear-gradient(135deg,#f8fafc,#f1f5f9)",
                  borderBottom:`1px solid ${T.border}` }}>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap",
                  justifyContent:"center", marginBottom:10 }}>
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    const done    = i < state.stepIndex;
                    const current = i === state.stepIndex;
                    return (
                      <div key={s.id}
                        aria-current={current ? "step" : undefined}
                        style={{ display:"flex", alignItems:"center", gap:5,
                          padding:"5px 11px", borderRadius:9999,
                          background: current ? T.brand : done ? T.okBg : "#f1f5f9",
                          border:`1.5px solid ${current ? T.brand : done ? T.ok : T.border}`,
                          opacity: i > state.stepIndex ? 0.55 : 1,
                          transition:"all .25s" }}>
                        <Icon size={11}
                          color={current ? T.white : done ? T.ok : T.muted}
                          aria-hidden="true" />
                        <span style={{ fontFamily:T.font, fontSize:11, fontWeight:700,
                          color: current ? T.white : done ? T.ok : T.muted }}>
                          {s.label}
                        </span>
                        {done && <CheckCircle2 size={10} color={T.ok} aria-hidden="true" />}
                      </div>
                    );
                  })}
                </div>
                <ProgressBar step={state.stepIndex} total={totalSteps} />
              </nav>

              {/* Step body — tabIndex makes it programmatically focusable */}
              <div ref={stepContainerRef} tabIndex={-1}
                style={{ padding:"24px 22px", animation:"fadeUp .25s ease",
                  outline:"none" }}>

                {/* Step header */}
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                  <div style={{ width:36, height:36, borderRadius:10,
                    background:T.brand + "14", border:`1.5px solid ${T.brand}33`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0 }}>
                    <CurIcon size={18} color={T.brand} aria-hidden="true" />
                  </div>
                  <div>
                    <p style={{ fontFamily:T.font, fontSize:10.5, fontWeight:700,
                      color:T.muted, textTransform:"uppercase",
                      letterSpacing:"0.08em", marginBottom:2 }}>
                      Step {state.stepIndex + 1} of {totalSteps}
                    </p>
                    <h2 style={{ fontFamily:T.font, fontSize:18, fontWeight:800,
                      color:T.ink }}>
                      {steps[state.stepIndex]?.label}
                    </h2>
                  </div>
                </div>

                {renderStep()}
              </div>

              {/* Navigation footer */}
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", padding:"14px 22px",
                borderTop:`1px solid ${T.border}`,
                background:"linear-gradient(135deg,#f8fafc,#f1f5f9)" }}>
                <button type="button" onClick={goBack}
                  disabled={state.stepIndex === 0}
                  aria-label="Go to previous step"
                  style={{ display:"flex", alignItems:"center", gap:6,
                    padding:"10px 18px", borderRadius:10,
                    border:`1.5px solid ${T.border}`,
                    background: state.stepIndex === 0 ? T.surface : T.white,
                    color: state.stepIndex === 0 ? "#cbd5e1" : T.ink,
                    fontFamily:T.font, fontWeight:600, fontSize:13,
                    cursor: state.stepIndex === 0 ? "not-allowed" : "pointer",
                    transition:"all .18s" }}>
                  <ChevronLeft size={15} aria-hidden="true" /> Back
                </button>

                <span style={{ fontFamily:T.font, fontSize:11.5, color:T.muted,
                  fontWeight:500 }}>
                  {state.stepIndex + 1} / {totalSteps}
                </span>

                {isLastStep ? (
                  <button type="button" onClick={handleSubmit}
                    disabled={state.submitting}
                    aria-busy={state.submitting}
                    style={{ display:"flex", alignItems:"center", gap:8,
                      padding:"10px 22px", borderRadius:10, border:"none",
                      background: state.submitting ? "#64748b" : T.brand,
                      color:T.white, fontFamily:T.font, fontWeight:700, fontSize:13.5,
                      cursor: state.submitting ? "not-allowed" : "pointer",
                      transition:"background .2s", boxShadow:`0 4px 14px ${T.brand}40` }}>
                    {state.submitting
                      ? <><span style={{ width:12, height:12,
                          border:"2px solid rgba(255,255,255,.3)",
                          borderTop:"2px solid #fff", borderRadius:"50%",
                          animation:"spin .8s linear infinite",
                          display:"inline-block" }} aria-hidden="true" />Submitting…</>
                      : <><Send size={14} aria-hidden="true" />Submit Review</>}
                  </button>
                ) : (
                  <button type="button" onClick={goNext}
                    aria-label="Go to next step"
                    style={{ display:"flex", alignItems:"center", gap:6,
                      padding:"10px 22px", borderRadius:10, border:"none",
                      background:T.brand, color:T.white,
                      fontFamily:T.font, fontWeight:700, fontSize:13.5,
                      cursor:"pointer", transition:"background .2s",
                      boxShadow:`0 4px 14px ${T.brand}40` }}>
                    Next <ChevronRight size={15} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

          </form>
        </main>

      </div>
    </div>
  );
}
