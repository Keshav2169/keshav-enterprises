import React, {
  useState, useEffect, useRef, useCallback, useMemo, memo, Suspense, lazy
} from 'react';
import {
  Menu, X, ChevronRight, Phone, Mail, MapPin,
  Settings, Wrench, Shield, Zap, Factory, ArrowRight,
  CheckCircle2, ExternalLink, MessageCircle, Activity, Droplets,
  Search, Layers, Target, Cpu, ArrowLeft, Paperclip,
  Filter, Hexagon, Cog, LifeBuoy, ChevronLeft,
  Award, Clock, TrendingUp, Users, Globe, BookOpen, Tag, Calendar, User,
  Building2, Copy, Check, PhoneCall
} from 'lucide-react';

const CONTACT_INFO = {
  phones: ['+91 9149229448', '+91 6397363268'],
  email: 'ksengg007@gmail.com',
  infoEmail: 'info.ksengg007@gmail.com',
  secondaryEmail: 'ppshekher71@gmail.com',
  marketingEmail: 'ksenggmrkt007@gmail.com',
  address: 'Dayanand Nagar Gali No.2, Near Subash Ki Chakki, Shamli – 247776, U.P., India',
  whatsapp: '6397363268',
  indiamart: 'https://www.indiamart.com/keshav-enterprises-shamli/',
  gmapsShare: 'https://share.google/uLc4GwsGec5eM62Ep',
  gst: '09BOSPS3115K1ZC',
  msme: 'UDYAM-UP-47-0071234', // ← update with your actual Udyam registration number
  // ── SOCIAL MEDIA ──
  linkedin: 'https://www.linkedin.com/in/keshav-enterprises-825a473b8',
  linkedinHandle: 'Keshav Enterprises',
  instagram: 'https://www.instagram.com/ksengg007?igsh=b3BrNDRpdHhkMDBm',
  instagramHandle: '@ksengg007',
  twitter: 'https://x.com/ksengg007',
  twitterHandle: '@ksengg007',
  reddit: 'https://www.reddit.com/user/NoDragonfly4979/',
  redditHandle: 'Keshav Enterprises',
  youtube: 'https://www.youtube.com/@ksengg007',
  youtubeHandle: '@ksengg007',
  facebook: 'https://www.facebook.com/ksengg007',
  facebookHandle: 'Keshav Enterprises',
};

// PERF FIX: nav links defined outside component to prevent re-creation on every render
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Industries', path: '/industries' },
  { name: 'Contact', path: '/contact' },
];

const OEMS = ['Triveni', 'Siemens', 'BHEL', 'Belliss & Morcom', 'Maxwatt', 'Man Turbo', 'Chola Turbo', 'DLF-Skoda', 'KKK', 'ABB'];

// PERF FIX: icon map instead of JSX in data arrays (prevents React serialization issues)
const SERVICE_ICONS = { srv_1: Cog, srv_2: Wrench, srv_3: Hexagon, srv_4: Activity, srv_5: Droplets, srv_6: Target };

// IMAGE FILENAMES FOR SERVICES — upload these to your /public folder
// Each service card will show this as a background image with 90% opacity overlay
// If image is not uploaded, the existing dot-pattern placeholder shows automatically
const SERVICES = [
  {
    id: 'srv_1',
    // Upload a photo of turbine erection/installation work on site
    image: 'service-turbine-erection.webp',
    title: 'Turbine Erection & Commissioning',
    desc: 'Expert erection and commissioning for steam turbines, pumps, compressors, fans, condensers, EOT cranes, and steam/water/air pipeline work. Includes complete OEM coordination and documentation.',
    details: ['Steam turbines, pumps, compressors, fans, condensers', 'EOT cranes, steel structure & pipe line work', 'Construction supervision to OEM specs & applicable standards', 'Coordination with OEM throughout all phases', 'Complete documentation for handover to operations', 'Development & execution of pre-commissioning procedures', 'Assist with start-up and fine tuning to operational needs'],
    oems: ['Triveni', 'Siemens', 'BHEL', 'Belliss India', 'Maxwatt']
  },
  {
    id: 'srv_2',
    // Upload a photo of turbine overhauling work — disassembled rotor, bearing inspection etc.
    image: 'service-overhauling.webp',
    title: 'Turnkey Overhauling & Maintenance',
    desc: 'Executed by ex-OEM engineers from Triveni, Siemens, BHEL, Belliss, and more. Includes pre-shutdown planning, on-site condition reporting, comprehensive spares management, and 24x7 emergency troubleshooting.',
    details: ['Pre-shutdown planning with detailed scope of rotating equipment', 'Onsite inspection of stocked spare parts with shortfall reports', 'Ex-OEM engineers: Triveni, Belliss, Maxwatt, Man Turbo, BHEL, Siemens, KKK, ABB', 'All clearances, gaps and sizes measured and recorded', 'Condition report with recommendations for each component', 'Turnkey basis: tools, tackles, consumables & manpower provided', '24x7 emergency response with engineers at multiple locations'],
    oems: ['Triveni', 'Belliss India', 'Maxwatt', 'Man Turbo', 'BHEL', 'Siemens', 'KKK', 'ABB']
  },
  {
    id: 'srv_3',
    // Upload a photo of 3D scanning, CMM measurement, or engineering drawings
    image: 'service-reverse-engineering.webp',
    title: 'Precision Reverse Engineering',
    desc: 'PMI-verified reverse engineering using 3D laser scanners, CMM, and copying lathes for turbines from 5 kW to 27 MW. Generate full manufacturing drawings with tolerances, concentricity, pre/post heat treatment specs.',
    details: ['3D Laser Scanner, CMM & Coordinate Measuring Machine at site/workshop', 'PMI testing for exact identification of material composition', 'Copying lathe for precision dimensional replication', 'Engineering drawings with tolerances, finish, parallelity, concentricity', 'Pre/post heat treatment specifications included', 'Rough machining, pre-final and final machining drawings', 'Covers turbines from 5 kW to 27 MW (Back Pressure or Condensing)', 'Single/Multi stage, Drive or Power, Horizontal or Vertical'],
    oems: ['Triveni', 'Siemens', 'BHEL', 'All Makes']
  },
  {
    id: 'srv_4',
    // Upload a photo of the dynamic balancing machine or rotor being balanced
    image: 'service-dynamic-balancing.webp',
    title: 'Dynamic Balancing & Rotor Machining',
    desc: 'Precision rotor machining (grinding, polishing, journal undersizing) at our workshop lathes, plus ISO/API standard dynamic balancing from 50 to 2000 kg with full compliance reporting.',
    details: ['Journal grinding & polishing with minimum undersizing technique', 'Labyrinth portion machining on precision lathes', 'Rotor set concentric at all portions before machining', 'Dynamic balancing 50-2000 kg to ISO/API standards', 'Balancing machines with latest vibration monitoring systems', 'Mechanical and electrical run-out identification pre-installation', 'Comprehensive balancing report documenting ISO/API compliance'],
    oems: ['All Turbine Makes']
  },
  {
    id: 'srv_5',
    // Upload a photo of the mobile centrifuge filter system or lube oil flushing rig
    image: 'service-lube-oil-flushing.webp',
    title: 'Lube Oil Flushing',
    desc: 'ISO-compliant flushing using purpose-built mobile centrifuge filter systems. Achieves maximum cleanliness and de-watering following construction or during scheduled maintenance.',
    details: ['Purpose-built mobile centrifuge filter system', 'Targets system cleanliness per ISO 4406:99 standards', 'Oil sampling and reporting undertaken per ISO standards', 'Effective for post-construction and scheduled maintenance', 'Superior de-watering and contamination removal', 'Solid particle removal from 4 to 25 microns', 'System flow rates handled up to 6,000 l/min'],
    oems: ['All Systems']
  },
  {
    id: 'srv_6',
    // Upload a photo of laser alignment equipment on a turbine-generator set
    image: 'service-machine-alignment.webp',
    title: 'Machine Alignment',
    desc: 'Expert machine alignment using latest technology to eliminate misalignment, one of the primary causes of equipment failure. Covers turbines, gearboxes, pumps, fans, alternators, and induction generators.',
    details: ['Turbine to gearbox & gearbox to mill gearbox alignment', 'Fan, pump, alternator, induction generator alignment', 'Machine levelling & pipe strain measurements on any frame size', 'Fiberizor, shredder alignment', 'Latest alignment technology for highest standards', 'Detailed alignment reporting with exact results', 'Covers any size machine frame in any location'],
    oems: ['All Makes']
  },
];

const RAW_PRODUCTS = [
  {
    id: 'prod_f1', category: 'Industrial Filtration', title: 'Triveni Turbine Lube Oil Filter Elements',
    desc: 'OEM-compatible lube oil filter elements for Triveni steam turbine lubrication systems. Ensures optimum fluid cleanliness per API 614 for extended bearing life.',
    usage: 'Primary lube oil filtration in Triveni steam turbines used in sugar mills, power plants, paper mills, distilleries and agro industries.',
    features: ['Triveni OEM Compatible — 180 GPM (approx. 680 LPM) rated flow', 'Filter media: Glass Fiber Fleece (VG) multilayer pleated construction', 'Filtration fineness: 6 VG, 10 VG, 16 VG, 25 VG grades available', 'High dirt-holding capacity; consistent efficiency at elevated differential pressure', 'High collapse resistance per ISO 2941', 'Material compatibility verified per ISO 2943', 'Sealing options: Nitrile (P) or Viton (V)', 'IS27 anti-static specification for oils below 300 pS/m conductivity', 'Compatible with mineral oils, emulsions, synthetic hydraulic/lube fluids', 'HSN Code: 8421'],
    specs: { 'Flow Capacity': '180 GPM (680 LPM rated)', 'Filtration Fineness': '6-25 µm (beta20µm(c) >= 200 per ISO 16889)', 'Max Operating Pressure': '10 bar (145 psi)', 'Filter Media': 'Glass Fiber Fleece (VG); SS Wire Mesh (G) available', 'Sealing Material': 'Nitrile (P) / Viton (V)', 'OEM Compatibility': 'Triveni Steam Turbines — all models', 'Standards': 'ISO 16889, API 614', 'Anti-Static Option': 'IS27 spec — oils below 300 pS/m conductivity', 'HSN Code': '8421' },
    images: ['180-gpm-lube-filter-1.webp', '180-gpm-lube-filter-2.webp', '180-gpm-lube-filter-3.webp', '180-gpm-lube-filter-4.webp', '180-gpm-lube-filter-5.webp', '180-gpm-lube-filter-6.webp']
  },
  {
    id: 'prod_f2', category: 'Industrial Filtration', title: 'Siemens Turbine Filter Elements',
    desc: 'High-performance control oil filter elements for Siemens industrial turbines. Microglass deep media with IS27 anti-static specification protects hydraulic control systems.',
    usage: 'Hydraulic control systems in Siemens industrial turbines; prevents electrostatic discharge in low-conductivity synthetic control oils.',
    features: ['850 LPM flow rating for duplex turbine control filter applications', 'Microglass deep media — Eaton 01.E series dimensional compatible', 'IS27 Electrostatic Critical Application specification', 'Anti-static prevents discharge in synthetic oils below 300 pS/m', 'High collapse pressure per ISO 2941', 'Filtration fineness: 3 VG, 6 VG, 10 VG, 16 VG, 25 VG', 'Operating pressure: up to 16 bar (DWF series) / 63 bar (DU duplex series)', 'Sealing: Nitrile or Viton', 'ASME compliant: EN13445, AD2000, ASME Sec. VIII Div. 1', 'PED/CE certified housings available'],
    specs: { 'Flow Capacity': '850 LPM (duplex control filter)', 'Filtration Fineness': '3-25 µm (microglass VG)', 'Max Operating Pressure': 'Up to 63 bar (DU duplex housing)', 'Filter Media': 'Microglass (VG) with IS27 anti-static treatment', 'Anti-Static Spec': 'IS27 — oils below 300 pS/m conductivity', 'Housing Series': 'DWF / DU / DA/EDA Duplex series compatible', 'Standards': 'EN13445, AD2000, ASME Sec. VIII Div. 1, PED 2014/68/EC', 'OEM Compatibility': 'Siemens industrial turbine control systems' },
    images: ['850-lpm-siemens-filter-1.webp', '850-lpm-siemens-filter-2.webp', '850-lpm-siemens-filter-3.webp', '850-lpm-siemens-filter-4.webp', '850-lpm-siemens-filter-5.webp', '850-lpm-siemens-filter-6.webp']
  },
  {
    id: 'prod_f3', category: 'Industrial Filtration', title: 'SS Wire Mesh (CEP) Centrifugal Filter Elements',
    desc: 'Stainless steel wire mesh filter elements with single or multi-layer pleated construction. Surface filtration principle; cleanable and reusable. Ideal for high-temperature applications.',
    usage: 'High-temperature fluid and gas filtration, hydraulic and lubrication systems where cleanable/reusable elements are preferred.',
    features: ['SS 304 / SS 316 stainless steel wire mesh construction', 'Single or multi-layer pleated weave designs', 'Surface filtration principle (vs. depth filtration)', 'Available rating: 5-1500 µm or per special requirement', 'High collapse resistance and high burst strength', 'Compatible with wide range of hydraulic & lubrication fluids', 'Cleanable and reusable — reduced lifecycle cost', 'HSN Code: 8421'],
    specs: { 'Material': 'SS 304 / SS 316 Wire Mesh', 'Filtration Range': '5-1500 µm (custom available)', 'Construction': 'Single or multi-layer pleated weave', 'Filtration Type': 'Surface filtration', 'Reusability': 'Cleanable & reusable', 'Fluid Compatibility': 'All hydraulic & lubrication fluids', 'HSN Code': '8421' },
    images: ['wire-mesh-centrifugal-filter-1.webp', 'wire-mesh-centrifugal-filter-2.webp', 'wire-mesh-centrifugal-filter-3.webp', 'wire-mesh-centrifugal-filter-4.webp', 'wire-mesh-centrifugal-filter-5.webp', 'wire-mesh-centrifugal-filter-6.webp']
  },
  {
    id: 'prod_f4', category: 'Industrial Filtration', title: 'Tank Breather Filter Elements (NBF Series)',
    desc: 'Glass fiber breather filter elements (Eaton 01.NBF dimensional compatible) preventing airborne contamination and moisture ingress into hydraulic and lube oil reservoirs.',
    usage: 'Hydraulic tanks, gearboxes, and lube oil reservoirs for all steam turbine, compressor, and industrial machinery applications.',
    features: ['Eaton 01.NBF series dimensional compatible — nominal sizes 25-125', 'Filter media: Glass fiber fleece (VL) — hydrophobic construction', 'Prevents airborne particulate and moisture ingestion', 'High dirt-holding capacity for extended service intervals', 'Viton (V) sealing for chemical resistance', 'Filtration grade: 3 VL micron for fine airborne contamination', 'Protects system cleanliness per ISO 4406:99', 'Tank-mount design with easy one-hand servicing'],
    specs: { 'Series Compatibility': 'Eaton 01.NBF (Sizes: 25, 40, 55, 85, 125)', 'Filter Media': 'Glass Fiber Fleece (VL) — hydrophobic', 'Filtration Grade': '3 VL', 'Sealing': 'Viton (V)', 'Installation': 'Tank breather mount', 'Standards': 'ISO 16889, ISO 4406:99 compatible' },
    images: ['air-breather-filter-1.webp', 'air-breather-filter-2.webp', 'air-breather-filter-3.webp', 'air-breather-filter-4.webp', 'air-breather-filter-5.webp', 'air-breather-filter-6.webp']
  },
  {
    id: 'prod_f5', category: 'Industrial Filtration', title: 'Hydraulic Suction Strainer Elements (AS/TS Series)',
    desc: 'SS wire mesh suction filter elements (Eaton 01.AS / 01.TS dimensional compatible) for protecting sensitive hydraulic pumps. Inside-to-outside flow configuration.',
    usage: 'Immersed in hydraulic reservoirs protecting system pumps; turbine auxiliary lube oil pump suction protection.',
    features: ['Eaton 01.AS (sizes 180-631) / 01.TS (sizes 210-625) dimensional compatible', 'SS Wire Mesh (G) media — 10, 25, 40, 80 µm grades', 'Inside-to-outside flow configuration (unique to suction elements)', 'Low pressure drop prevents pump cavitation', 'Cleanable and reusable construction', 'Double open end (B) design for secure tank mounting', 'IS27 anti-static spec available for special applications'],
    specs: { 'Series Compatibility': 'Eaton 01.AS (180-631) / 01.TS (210-625)', 'Filter Media': 'SS Wire Mesh (G)', 'Filtration Grades': '10, 25, 40, 80 µm', 'Flow Direction': 'Inside-to-outside (suction)', 'End Design': 'Double open end (B)', 'Application': 'Tank-immersed suction pump protection' },
    images: ['hydraulic-suction-strainer-1.webp', 'hydraulic-suction-strainer-2.webp', 'hydraulic-suction-strainer-3.webp', 'hydraulic-suction-strainer-4.webp', 'hydraulic-suction-strainer-5.webp', 'hydraulic-suction-strainer-6.webp']
  },
  {
    id: 'prod_f6', category: 'Industrial Filtration', title: 'WaterSorp Offline Filter Elements (WSNR Series)',
    desc: 'Dual-function WaterSorp elements (Eaton 01.WSNR dimensional compatible) combining glass fiber filtration with water absorption layer. Removes solids AND absorbs free/emulsified water.',
    usage: 'Offline filtration in side-stream return lines of turbine lube oil systems; extends oil life and protects bearings from water-induced damage.',
    features: ['Eaton 01.WSNR WaterSorp dimensional compatible — sizes 250, 630, 1000', 'Media: Glass fiber fleece with integrated water absorption layer (WVG)', 'Dual-action: removes solids AND absorbs free/emulsified water simultaneously', 'Significantly reduces oil aging — extends drain intervals', 'High particulate retention via microglass pre-filter layer', 'Max operating pressure: 10 bar (145 psi)', 'Double open end (B) for WSNR housings', 'Sealing: Nitrile or Viton'],
    specs: { 'Series Compatibility': 'Eaton 01.WSNR (Sizes: 250, 630, 1000)', 'Filter Media': 'Glass fiber fleece + water absorption layer (WVG)', 'Filtration Grades': '3 WVG, 10 WVG', 'Max Pressure': '10 bar (145 psi)', 'End Design': 'Double open end (B)', 'Sealing': 'Nitrile / Viton', 'Function': 'Particulate removal + water absorption' },
    images: ['watersorp-filter-1.webp', 'watersorp-filter-2.webp', 'watersorp-filter-3.webp', 'watersorp-filter-4.webp', 'watersorp-filter-5.webp', 'watersorp-filter-6.webp']
  },
  {
    id: 'prod_f7', category: 'Industrial Filtration', title: 'PTFE Hydrophobic Air & Gas Filter Elements',
    desc: 'Hydrophobic PTFE filtration elements for critical compressed air and process gas applications. Moisture-repellent construction prevents water droplet passage.',
    usage: 'Compressed air systems, process gases, instrument air, and venting applications where moisture and chemical resistance are critical.',
    features: ['Hydrophobic PTFE (Polytetrafluoroethylene) filter media', 'Moisture-repellent — water droplets cannot pass through media', 'High chemical resistance — compatible with aggressive gases', 'High flow rates at low differential pressure', 'Temperature range: -20 to +260 deg C', 'Cleanable and regenerable in most applications'],
    specs: { 'Filter Media': 'Hydrophobic PTFE', 'Temperature Range': '-20 to +260 deg C', 'Function': 'Fine particulate + moisture separation', 'Chemical Resistance': 'Excellent — wide pH range', 'Application': 'Compressed air, process gas, instrument air', 'Key Feature': 'Hydrophobic — water cannot penetrate media' },
    images: ['ptfe-air-filter-1.webp', 'ptfe-air-filter-2.webp', 'ptfe-air-filter-3.webp', 'ptfe-air-filter-4.webp', 'ptfe-air-filter-5.webp', 'ptfe-air-filter-6.webp']
  },
  {
    id: 'prod_f8', category: 'Industrial Filtration', title: 'Return-Line Filter Elements',
    desc: 'Precision filter elements for hydraulic and lubrication system return lines, removing contaminants before oil re-enters the reservoir. Low pressure-drop design maintains system efficiency at high flow rates.',
    usage: 'Return lines in turbine lube oil systems, hydraulic power units, industrial machinery, and lubrication circuits.',
    features: ['Designed for return-line duty — low differential pressure at full flow', 'Filter media options: Glass Fibre (VG), Paper (P), SS Wire Mesh (G)', 'MOC: Carbon Steel or Stainless Steel housing', 'Prevents contaminated oil from returning to main reservoir', 'Maintains system cleanliness per ISO 4406 standards', 'Compatible with mineral oils, emulsions, and synthetic fluids', 'Available in multiple flow sizes and micron ratings', 'Bypass valve option for cold-start protection'],
    specs: { 'Application': 'Return-line filtration — hydraulic & lube oil systems', 'Filter Media': 'Glass Fibre (VG) / Paper (P) / SS Wire Mesh (G)', 'MOC': 'Carbon Steel / Stainless Steel', 'Filtration Range': '4 µm to 40 µm (media-dependent)', 'Bypass': 'Bypass valve available for cold-start protection', 'Standards': 'ISO 4406 cleanliness compliance' },
    images: ['return-line-filter-1.webp', 'return-line-filter-2.webp', 'return-line-filter-3.webp', 'return-line-filter-4.webp', 'return-line-filter-5.webp', 'return-line-filter-6.webp']
  },
  {
    id: 'prod_f9', category: 'Industrial Filtration', title: 'Duplex Control Oil Filter Assembly',
    desc: 'High-precision duplex filter assemblies for turbine control oil circuits. Allows live element changeover without interrupting oil flow to the governing system — critical for continuous plant operation.',
    usage: 'Turbine governing and control oil hydraulic circuits where uninterrupted filtration is mandatory for plant safety and continuity.',
    features: ['Duplex (twin-chamber) design — continuous operation without shutdown', 'Live online element changeover via 3-way changeover valve', 'Critical for turbine governor and control systems', 'MOC: Stainless Steel housing and internals', 'Filtration accuracy: 5 to 25 µm', 'Operating pressure: Up to 63 bar (size-dependent)', 'Differential pressure indicator for element condition monitoring', 'ASME compliant: ASME Sec. VIII Div.1'],
    specs: { 'Configuration': 'Duplex twin-chamber for continuous duty', 'Changeover': 'Live 3-way changeover valve — no shutdown', 'MOC': 'Stainless Steel', 'Filtration Accuracy': '5 to 25 µm', 'Max Pressure': 'Up to 63 bar (DU duplex series)', 'Monitoring': 'Differential pressure indicator', 'Standards': 'ASME Sec. VIII Div.1', 'Application': 'Turbine governor / control oil circuits' },
    images: ['control-oil-filter-duplex-1.webp', 'control-oil-filter-duplex-2.webp', 'control-oil-filter-duplex-3.webp', 'control-oil-filter-duplex-4.webp', 'control-oil-filter-duplex-5.webp', 'control-oil-filter-duplex-6.webp']
  },
  {
    id: 'prod_f10', category: 'Industrial Filtration', title: 'Duplex Fabricated Filter Housing',
    desc: 'Twin-chamber fabricated filter assemblies for systems that cannot tolerate shutdown for filter cleaning. A manual changeover valve keeps one chamber in service while the other is serviced offline.',
    usage: 'Process lines, industrial fluid systems, fuel oil, and lube oil applications requiring continuous filtration without production interruption.',
    features: ['Twin-chamber design — one in service, one offline for maintenance', 'Manual 2-way or 3-way ball valve / butterfly valve changeover', 'MOC: MS Fabricated, CS, SS 304, SS 316', 'Filtration down to 40 µm standard; finer on request', 'Operating pressure: Up to 20 kg/cm² standard; higher on request', 'Full drain and vent provisions on each chamber', 'Optional DP gauges for element condition monitoring', 'Custom dimensions available for retrofit and new installation'],
    specs: { 'Configuration': 'Twin-chamber duplex', 'Changeover Valve': '2-way or 3-way ball valve / butterfly valve', 'MOC': 'MS Fabricated / CS / SS 304 / SS 316', 'Filtration': 'Down to 40 µm (finer on request)', 'Max Pressure': 'Up to 20 kg/cm² standard; higher on request', 'Options': 'DP gauges, drain/vent connections', 'Custom': 'Dimensions available for retrofit' },
    images: ['duplex-fabricated-filter-1.webp', 'duplex-fabricated-filter-2.webp', 'duplex-fabricated-filter-3.webp', 'duplex-fabricated-filter-4.webp', 'duplex-fabricated-filter-5.webp', 'duplex-fabricated-filter-6.webp']
  },
  {
    id: 'prod_f11', category: 'Industrial Filtration', title: 'Reverse Osmosis (RO) Filter Assemblies',
    desc: 'Reverse osmosis filter assemblies and replacement membranes for industrial water treatment and process water purification. Supplied as complete systems or as individual replacement elements to match existing installations.',
    usage: 'Industrial process water purification, boiler feed water treatment, cooling tower make-up water, and high-purity water generation.',
    features: ['Complete RO assemblies or replacement elements/membranes', 'Removes dissolved salts, bacteria, particulates, and organics', 'Supplied to match existing system specifications', 'Boiler feed water treatment — prevents scale and corrosion', 'Cooling tower make-up water conditioning', 'Process water purification for chemical and pharmaceutical applications', 'High-purity water generation for critical industrial processes', 'Pre-treatment and post-treatment element options available'],
    specs: { 'Type': 'Reverse Osmosis membranes and assemblies', 'Function': 'Dissolved solids, bacteria, and particulate removal', 'Supply Format': 'Complete assemblies or replacement elements', 'Applications': 'Boiler feed, cooling tower, process water, high-purity water', 'Membrane Options': 'As per existing system specification', 'Industries': 'Power plants, chemical, pharmaceutical, food processing' },
    images: ['ro-filter-1.webp', 'ro-filter-2.webp', 'ro-filter-3.webp', 'ro-filter-4.webp', 'ro-filter-5.webp', 'ro-filter-6.webp']
  },
  {
    id: 'prod_st1', category: 'Industrial Strainers', title: 'Simplex Basket Strainer',
    desc: 'Engineered and fabricated to ASME VIII Div.1 and ASME B31.3 for high-pressure pipeline protection. Low pressure drop at high velocities with SS perforated basket internals.',
    usage: 'Liquid, viscous, and gaseous media filtration in high-pressure pipelines; protects valves, meters, and process equipment.',
    features: ['Design standard: ASME VIII Div.1, ASME B31.3', 'MOC: Cast Steel or Stainless Steel; others on request', 'Pressure ratings: ASME Class 125, 150, 300, 600', 'Standard SS perforated basket internals', 'Low pressure drop at high flow velocities', 'Vents and drain connections as standard', 'Optional: Davit lifts, quick-open closures, DP gauges', 'Horizontal and vertical configurations', 'End connections: Flanged, butt-weld, screwed'],
    specs: { 'Design Standard': 'ASME VIII Div.1, ASME B31.3', 'MOC': 'Cast Steel, SS 304/316 (others on request)', 'Pressure Rating': 'ASME Class 125, 150, 300, 600', 'Basket Internals': 'SS Perforated Basket (standard)', 'End Connections': 'Flanged, Butt-Weld, Screwed', 'Orientation': 'Horizontal or Vertical', 'Optional': 'Davit lifts, Quick-open closures, DP Gauges' },
    images: ['simplex-basket-strainer-1.webp', 'simplex-basket-strainer-2.webp', 'simplex-basket-strainer-3.webp', 'simplex-basket-strainer-4.webp', 'simplex-basket-strainer-5.webp', 'simplex-basket-strainer-6.webp']
  },
  {
    id: 'prod_st2', category: 'Industrial Strainers', title: 'Duplex Basket Strainer',
    desc: 'Continuous-service duplex strainer enabling basket cleaning without process shutdown. Three-way changeover valve diverts flow while dirty basket is serviced.',
    usage: 'Continuous flow systems requiring zero-downtime operation; critical process lines where shutdown is unacceptable.',
    features: ['Continuous service — no shutdown or flow interruption required', 'Three-way changeover valve for fast chamber switching', 'Design: ASME VIII Div.1, ASME B31.3', 'MOC: Cast Steel or Stainless Steel', 'Pressure ratings: ASME Class 125, 150, 300, 600', 'SS perforated basket internals as standard', 'DP gauges available for clogging monitoring', 'Integrated pressure balance valve for easy changeover'],
    specs: { 'Operation Mode': 'Continuous (no shutdown)', 'Changeover': 'Three-way ball valve', 'Design Standard': 'ASME VIII Div.1, ASME B31.3', 'MOC': 'Cast Steel, SS 304/316', 'Pressure Rating': 'ASME Class 125, 150, 300, 600', 'Monitoring': 'DP Gauges available' },
    images: ['duplex-basket-strainer-1.webp', 'duplex-basket-strainer-2.webp', 'duplex-basket-strainer-3.webp', 'duplex-basket-strainer-4.webp', 'duplex-basket-strainer-5.webp', 'duplex-basket-strainer-6.webp']
  },
  {
    id: 'prod_st3', category: 'Industrial Strainers', title: 'Conical (Temporary) Strainer',
    desc: 'Welded conical strainer installed between standard flanges to remove foreign matter during commissioning or startup.',
    usage: 'Pipeline protection for downstream equipment; commissioning to catch weld splatter and construction debris.',
    features: ['Welded conical mesh element', 'Installed between standard pipeline flanges', 'MOC: Stainless Steel SS 304/316 standard', 'Mesh size: Customizable per application', 'ASME Class 125, 150, 300, 600 available', 'Horizontal and vertical installation', 'End connections: Flanged, butt-weld, screwed'],
    specs: { 'Design': 'Welded conical wire mesh element', 'MOC': 'SS 304/316', 'Mesh': 'Customizable per requirement', 'Pressure Rating': 'ASME Class 125-600', 'End Connections': 'Flanged, Butt-Weld, Screwed', 'Installation': 'Horizontal or Vertical' },
    images: ['conical-strainer-1.webp', 'conical-strainer-2.webp', 'conical-strainer-3.webp', 'conical-strainer-4.webp', 'conical-strainer-5.webp', 'conical-strainer-6.webp']
  },
  {
    id: 'prod_st4', category: 'Industrial Strainers', title: 'Y-Type Strainer',
    desc: 'Cast and welded Y-type strainer for liquid and gaseous pipelines. Y-configuration allows easy blow-off cleanout without line shutdown.',
    usage: 'General pipeline protection; steam, water, gas, oil, and chemical service lines protecting downstream equipment.',
    features: ['Cast and welded design — horizontal & vertical configurations', 'MOC: Cast Iron, Cast Steel, SS 304/316', 'Pressure ratings: ASME Class 125, 150, 300, 600', 'Easy blow-off cleanout port — no full disassembly', 'Mesh element size per application requirement', 'Service: Steam, water, gas, oil, chemical media'],
    specs: { 'Design': 'Cast & Welded Y-configuration', 'MOC': 'Cast Iron, Cast Steel, SS 304/316', 'Pressure Rating': 'ASME Class 125, 150, 300, 600', 'Cleanout': 'Blow-off port', 'Media': 'Steam, water, gas, oil, chemicals', 'End Connections': 'Flanged, Butt-Weld, Screwed' },
    images: ['y-type-strainer-1.webp', 'y-type-strainer-2.webp', 'y-type-strainer-3.webp', 'y-type-strainer-4.webp', 'y-type-strainer-5.webp', 'y-type-strainer-6.webp']
  },
  {
    id: 'prod_st5', category: 'Industrial Strainers', title: 'Pot / Bucket Type Strainer',
    desc: 'Large-capacity pot-type strainer with generous internal basket volume for high contamination-load applications. Less frequent cleaning required, low pressure drop even when partially fouled.',
    usage: 'High-contamination process lines, fuel oil systems, cooling water, and slurry services where large debris volumes are expected.',
    features: ['Generously sized pot body — high dirt-holding capacity', 'Lower cleaning frequency vs. standard basket strainers', 'Low pressure drop even at partial basket loading', 'MOC: WCB Casted, CS, SS 304/316, MS Fabricated', 'Ratings up to ASME Class 2500', 'Designed to ASME VIII Div.1', 'Horizontal and vertical configurations available', 'Optional differential pressure gauge for fouling monitoring', 'Cover lifting options: davit arm, crane eye bolt'],
    specs: { 'Design': 'Large-volume pot/bucket body strainer', 'MOC': 'WCB Casted / CS / SS 304/316 / MS Fabricated', 'Pressure Rating': 'Up to ASME Class 2500', 'Design Standard': 'ASME VIII Div.1', 'Orientation': 'Horizontal or Vertical', 'Key Advantage': 'High dirt-holding capacity — reduced cleaning intervals', 'Optional': 'DP Gauge, davit arm cover lift' },
    images: ['pot-bucket-strainer-1.webp', 'pot-bucket-strainer-2.webp', 'pot-bucket-strainer-3.webp', 'pot-bucket-strainer-4.webp', 'pot-bucket-strainer-5.webp', 'pot-bucket-strainer-6.webp']
  },
  {
    id: 'prod_e1', category: 'Expansion Joints', title: 'Stainless Steel Metallic Bellows Expansion Joint',
    desc: 'Multi-ply SS metallic bellows absorbing thermal expansion in piping systems. Available DN 15 to DN 12,000. Fatigue, yield, and rupture tested per EJMA/ASME standards.',
    usage: 'High-pressure steam exhaust systems, chemical process pipes, heat exchanger connections, and piping requiring thermal movement compensation.',
    features: ['Material: SS 304/316L, Duplex, Incoloy 825/925, Inconel 625, Titanium, Hastelloy', 'Dimension range: DN 15 to DN 12,000', 'Pressure: Up to 150 barg (2176 psi); higher with ring reinforcement', 'Design codes: EN 14917, EJMA, ASME VIII Div.1, ASME B31.1/B31.3', 'Testing: Pneumatic, hydrostatic, airjet, vacuum, dye penetrant', 'Movement tests: Axial, lateral, angular; fatigue life cycle test', 'Forming: Rolling, punch, hydraulic bellows forming', 'Compliance: PED 2014/68/EC, AD2000'],
    specs: { 'Material': 'SS 304/316L, Duplex, Incoloy, Inconel, Hastelloy, Titanium', 'Dimension Range': 'DN 15 to DN 12,000', 'Max Pressure': '150 barg (2176 psi); higher with reinforcement', 'Design Codes': 'EN 14917, EJMA, ASME VIII Div.1, ASME B31.1/B31.3', 'Testing': 'Pneumatic, hydrostatic, vacuum, dye penetrant, movement', 'Compliance': 'PED 2014/68/EC, AD2000', 'Forming Methods': 'Rolling, Punch, Hydraulic' },
    images: ['ss-metallic-bellows-1.webp', 'ss-metallic-bellows-2.webp', 'ss-metallic-bellows-3.webp', 'ss-metallic-bellows-4.webp', 'ss-metallic-bellows-5.webp', 'ss-metallic-bellows-6.webp']
  },
  {
    id: 'prod_e1b', category: 'Expansion Joints', title: 'Axial Expansion Joint',
    desc: 'Single-bellows axial expansion joint absorbing thermal expansion and contraction along the longitudinal pipe axis. The most widely used expansion joint type in steam, process gas, and hot water pipelines.',
    usage: 'Steam pipelines, pump connections, heat exchanger inlet/outlet connections, hot water systems in power plants, sugar mills, paper mills, and refineries.',
    features: ['Absorbs axial compression and extension from thermal cycling', 'Single-bellow design — compact and cost-effective', 'Available with or without inner sleeve, cover/shroud, and tie rods', 'Inner sleeve protects bellow from high-velocity media erosion', 'Materials: SS 304/316/321, Duplex, Inconel, Incoloy, Hastelloy', 'DN 15 to DN 12,000; pressure up to 150 bar G', 'Design codes: EJMA, ASME VIII Div.1, ASME B31.1/B31.3', 'Full hydrostatic/pneumatic test certification and material traceability'],
    specs: { 'Movement Absorbed': 'Axial — compression and extension along pipe axis', 'Bellow Design': 'Single bellows', 'Materials': 'SS 304/316/321, Duplex, Inconel, Incoloy, Hastelloy', 'Size Range': 'DN 15 to DN 12,000', 'Pressure': 'Up to 150 bar G', 'Design Codes': 'EJMA, ASME VIII Div.1, ASME B31.1/B31.3', 'Accessories': 'Inner sleeve, cover/shroud, tie rods (optional)', 'Testing': 'Hydrostatic / Pneumatic certified' },
    images: ['axial-expansion-joint-1.webp', 'axial-expansion-joint-2.webp', 'axial-expansion-joint-3.webp', 'axial-expansion-joint-4.webp', 'axial-expansion-joint-5.webp', 'axial-expansion-joint-6.webp']
  },
  {
    id: 'prod_e2', category: 'Expansion Joints', title: 'Double Arch Rubber Expansion Joint',
    desc: 'Heavy-duty double arch rubber joint with approx. 2x the movement capacity of single arch. Absorbs multi-directional movements, reduces noise, compensates misalignment.',
    usage: 'Pumps, chillers, cooling towers, heavy fluid systems requiring greater movement than single arch allows.',
    features: ['Double arch design: ~2x movement vs. single arch', 'Simultaneously absorbs axial, lateral, and angular movements', 'Reduces system noise and vibration', 'Compensates pipeline misalignment or offset', 'High-quality rubber compound', 'Tie rod assembly available and recommended', 'Flanged ends for standard installation'],
    specs: { 'Architecture': 'Double arch (twin convolution) rubber', 'Movement': 'Axial, Lateral, Angular (dual-arch capacity)', 'Ends': 'Flanged (standard)', 'Tie Rods': 'Available — specially recommended', 'Applications': 'Pumps, chillers, cooling towers' },
    images: ['double-arch-rubber-joint-1.webp', 'double-arch-rubber-joint-2.webp', 'double-arch-rubber-joint-3.webp', 'double-arch-rubber-joint-4.webp', 'double-arch-rubber-joint-5.webp', 'double-arch-rubber-joint-6.webp']
  },
  {
    id: 'prod_e3', category: 'Expansion Joints', title: 'Single Arch Rubber Expansion Joint',
    desc: 'Standard single arch rubber expansion joint absorbing thermal movements and mechanical vibrations. Cost-effective for HVAC, water piping, and light industrial fluid lines.',
    usage: 'HVAC systems, water piping, light industrial fluid lines, pump discharge and suction connections.',
    features: ['Single arch convolution rubber construction', 'Absorbs thermal expansion and contraction', 'Reduces mechanical vibration transmission', 'Corrosion-resistant rubber compound', 'Available with or without internal sleeve', 'Flanged ends standard (PN10/PN16)', 'Wide arch variant available for larger movements'],
    specs: { 'Architecture': 'Single arch convolution', 'Compounds': 'EPDM / Neoprene (CR) / NBR', 'End Connections': 'Flanged (PN10/PN16)', 'Sleeve': 'Optional — protects against particle impingement', 'Applications': 'HVAC, water, light industrial' },
    images: ['single-arch-rubber-joint-1.webp', 'single-arch-rubber-joint-2.webp', 'single-arch-rubber-joint-3.webp', 'single-arch-rubber-joint-4.webp', 'single-arch-rubber-joint-5.webp', 'single-arch-rubber-joint-6.webp']
  },
  {
    id: 'prod_e3b', category: 'Expansion Joints', title: 'Wide Arch Rubber Expansion Bellow',
    desc: 'Wide arch rubber bellow providing maximum movement absorption and superior vibration isolation. Specifically recommended with a tie rod assembly for internal pressure control. Ideal for high-vibration pump and motor connections.',
    usage: 'High-vibration pump and motor connections, heavy-duty industrial piping with significant thermal movement, applications requiring maximum flexibility and shock isolation.',
    features: ['Maximum axial, lateral, and angular movement absorption', 'Superior vibration, noise, and shock isolation vs. single/double arch', 'Wide arch convolution design for greater flexibility', 'Tie rod assembly specially recommended for pressure control', 'Absorbs pipe misalignment and offset in the line', 'Materials: EPDM, Neoprene, Nitrile, Natural Rubber per media', 'Flanged ends — standard ASME / DIN drilling', 'Operating pressure per media and temperature requirements'],
    specs: { 'Movement': 'Maximum axial, lateral, angular + vibration and shock', 'Arch Design': 'Wide arch for maximum flexibility', 'Tie Rods': 'Recommended for internal pressure control', 'Materials': 'EPDM / Neoprene / Nitrile / Natural Rubber', 'End Connections': 'Flanged (ASME / DIN)', 'Applications': 'High-vibration pumps, motors, heavy-duty industrial piping', 'Advantage': 'Maximum flexibility and shock isolation vs. standard arch' },
    images: ['wide-arch-rubber-joint-1.webp', 'wide-arch-rubber-joint-2.webp', 'wide-arch-rubber-joint-3.webp', 'wide-arch-rubber-joint-4.webp', 'wide-arch-rubber-joint-5.webp', 'wide-arch-rubber-joint-6.webp']
  },
  {
    id: 'prod_e3c', category: 'Expansion Joints', title: 'Industrial Heat Exchanger Bellows',
    desc: 'Metallic bellows designed for fixed tube-sheet heat exchangers to relieve differential thermal expansion between the shell and tube bundle. Supplied to ASME VIII Div.1 with full documentation for shell-and-tube heat exchanger applications.',
    usage: 'Shell-and-tube heat exchangers, condensers, coolers, and process heat exchangers in refineries, chemical plants, and power stations.',
    features: ['Relieves differential thermal expansion between shell and tube bundle', 'Integral to fixed tube-sheet heat exchanger design', 'Manufactured to ASME VIII Div.1 with full documentation', 'Materials: SS 304, SS 316, SS 316L, Duplex per service', 'Prevents over-stressing of tube-to-tubesheet joints', 'Reduces shell nozzle loads on connected equipment', 'Custom dimensions per exchanger design specification', 'Full material traceability and test certification'],
    specs: { 'Application': 'Fixed tube-sheet shell-and-tube heat exchangers', 'Function': 'Relieves differential thermal expansion — shell vs. tube bundle', 'Design Standard': 'ASME VIII Div.1', 'Materials': 'SS 304 / SS 316 / SS 316L / Duplex', 'Industries': 'Refineries, chemical plants, power stations', 'Documentation': 'Full material traceability and test certificates' },
    images: ['heat-exchanger-bellow-1.webp', 'heat-exchanger-bellow-2.webp', 'heat-exchanger-bellow-3.webp', 'heat-exchanger-bellow-4.webp', 'heat-exchanger-bellow-5.webp', 'heat-exchanger-bellow-6.webp']
  },
  {
    id: 'prod_e4', category: 'Expansion Joints', title: 'Universal Metallic Expansion Joint',
    desc: 'Twin-bellows metallic joint with intermediate pipe absorbing any combination of axial, lateral, and angular movement.',
    usage: 'Complex piping requiring multi-axis movement; cryogenic lines, power plant crossovers.',
    features: ['Twin bellows + intermediate pipe (universal configuration)', 'Absorbs axial, lateral, angular in any combination', 'Can absorb contraction in cryogenic applications', 'Tie rod assembly recommended for pressure thrust control', 'Material: SS 304/316L, Duplex, Incoloy, Inconel', 'Dimension range: DN 15 to DN 12,000', 'Design per EN 14917, EJMA, ASME VIII Div.1'],
    specs: { 'Architecture': 'Twin bellows + intermediate pipe', 'Movement': 'Axial + Lateral + Angular (combined)', 'Material': 'SS 304/316L, Duplex, Incoloy, Inconel', 'Dimension Range': 'DN 15 to DN 12,000', 'Tie Rods': 'Recommended (pressure thrust)', 'Design Codes': 'EN 14917, EJMA, ASME VIII Div.1' },
    images: ['universal-expansion-joint-1.webp', 'universal-expansion-joint-2.webp', 'universal-expansion-joint-3.webp', 'universal-expansion-joint-4.webp', 'universal-expansion-joint-5.webp', 'universal-expansion-joint-6.webp']
  },
  {
    id: 'prod_e5', category: 'Expansion Joints', title: 'Non-Metallic Fabric Expansion Joint',
    desc: 'Multi-layer fabric/PTFE/rubber composite joints with 5-layer construction. Internal abrasion liner, insulation, PTFE foil, outer cover, reinforcement. Handles up to 1200 deg C.',
    usage: 'Boilers, bag filters, ESPs, gas turbine installations, cement plants, incineration, power station flue gas ductwork.',
    features: ['5-layer construction: abrasion liner + insulation + PTFE foil + cover + reinforcement', 'Temperature capability: up to 1200 deg C (refractory-lined duct)', 'Styles: Belt, convoluted, vertical flange, floating sleeve, insulation bolster', 'Materials: PTFE, rubber, ceramic fiber, fiberglass, Nomex', 'Large axial, lateral, and angular movement capacity', 'Maximum vibration damping vs. metallic alternatives'],
    specs: { 'Construction': '5-layer multi-material composite', 'Max Temperature': 'Up to 1200 deg C (refractory-lined)', 'Materials': 'PTFE, rubber, ceramic fiber, fiberglass, Nomex', 'Available Styles': 'Belt, convoluted, vertical flange, floating sleeve, bolster', 'Applications': 'Boilers, ESP, bag filters, gas turbines, cement, incineration', 'Movement': 'Axial + Lateral + Angular (large capacity)' },
    images: ['non-metallic-expansion-joint-1.webp', 'non-metallic-expansion-joint-2.webp', 'non-metallic-expansion-joint-3.webp', 'non-metallic-expansion-joint-4.webp', 'non-metallic-expansion-joint-5.webp', 'non-metallic-expansion-joint-6.webp']
  },
  {
    id: 'prod_e6', category: 'Expansion Joints', title: 'Pressure Balance Expansion Joint',
    desc: 'In-line pressure balance joint absorbing axial movement and lateral deflection while neutralizing pressure thrust. Reduces piping support and anchor loads.',
    usage: 'Turbine steam crossovers, pump connections, piping loops where pressure thrust must be contained.',
    features: ['In-line pressure balance design neutralizes pressure thrust', 'Absorbs axial movement while containing thrust', 'Absorbs lateral deflection without anchor overloading', 'Material: SS 304/316L, Incoloy, Inconel', 'Design per EN 14917, EJMA, ASME VIII Div.1', 'Full pressure, movement, and fatigue test certification'],
    specs: { 'Architecture': 'In-line pressure balance bellows assembly', 'Function': 'Neutralizes pressure thrust forces', 'Material': 'SS 304/316L, Incoloy, Inconel', 'Design Codes': 'EN 14917, EJMA, ASME VIII Div.1', 'Movement': 'Axial + Lateral (thrust-balanced)', 'Testing': 'Full pressure, movement, fatigue certification' },
    images: ['pressure-balance-joint-1.webp', 'pressure-balance-joint-2.webp', 'pressure-balance-joint-3.webp', 'pressure-balance-joint-4.webp', 'pressure-balance-joint-5.webp', 'pressure-balance-joint-6.webp']
  },
  {
    id: 'prod_e7', category: 'Expansion Joints', title: 'Ring Reinforced Metallic Expansion Joint',
    desc: 'High-pressure metallic expansion joint with external equalizing rings fitted between convolutions to prevent squirm and improve pressure stability well beyond standard bellows limits.',
    usage: 'High-pressure steam lines, refinery and petrochemical process lines, ammonia/fertilizer piping, and other services where standard bellows pressure capacity is insufficient.',
    features: ['Equalizing rings support each convolution and resist pressure-induced instability', 'Suitable for axial, lateral, and angular movement compensation by design type', 'Multi-ply bellows plus ring reinforcement for pressure integrity and long cycle life', 'Field-proven in very high-pressure applications exceeding 16 bar and up to 185 bar class projects', 'Available in SS, duplex, Inconel, Incoloy, Hastelloy, and other high alloys', 'Designed and tested per EJMA, EN 14917, ASME VIII Div.1 / B31.3'],
    specs: { 'Type': 'Ring reinforced metallic bellow assembly', 'Pressure Capability': 'High-pressure service; project-specific designs up to 185 bar class', 'Movement': 'Axial / Lateral / Angular (as configured)', 'Materials': 'SS 304/316/321, Duplex, Inconel, Incoloy, Hastelloy', 'Design Codes': 'EJMA, EN 14917, ASME VIII Div.1, ASME B31.3', 'Testing': 'Hydrostatic / pneumatic pressure test with full documentation' },
    images: ['ring-reinforced-expansion-joint-1.webp', 'ring-reinforced-expansion-joint-2.webp', 'ring-reinforced-expansion-joint-3.webp', 'ring-reinforced-expansion-joint-4.webp', 'ring-reinforced-expansion-joint-5.webp', 'ring-reinforced-expansion-joint-6.webp']
  },
  {
    id: 'prod_e8', category: 'Expansion Joints', title: 'Externally Pressurised Expansion Joint',
    desc: 'Externally pressurised bellows design where system pressure acts on the outside of the convolutions, enabling very large axial movement under pressure without the instability limits of conventional internal-pressure bellows.',
    usage: 'Long steam pipelines, buried district heating lines, underground process piping, and installations requiring large axial compensation in compact space.',
    features: ['External pressure loading provides stabilizing effect on bellows geometry', 'Very large axial compression stroke capability for long thermal runs', 'Bellows protected inside outer housing for improved mechanical protection', 'Excellent solution for underground or externally insulated installations', 'Available across DN 15 to DN 12,000 project range', 'Supports high-alloy material options for severe temperature/corrosion duty'],
    specs: { 'Type': 'Externally pressurised axial compensator', 'Primary Movement': 'Large axial compression / extension', 'Nominal Range': 'DN 15 to DN 12,000', 'Materials': 'SS 304/316/321, Duplex, Inconel, Incoloy, Hastelloy, Alloy 59', 'Design Standards': 'EJMA, EN 14917, ASME / EN code compliance per project', 'Typical Use': 'Buried lines, long pipe runs, district heating and steam networks' },
    images: ['externally-pressurised-joint-1.webp', 'externally-pressurised-joint-2.webp', 'externally-pressurised-joint-3.webp', 'externally-pressurised-joint-4.webp', 'externally-pressurised-joint-5.webp', 'externally-pressurised-joint-6.webp']
  },
  {
    id: 'prod_e9', category: 'Expansion Joints', title: 'Lateral Metallic Expansion Joint',
    desc: 'Lateral expansion joint engineered to absorb perpendicular piping movement (offset/shear) with controlled pressure thrust transfer using tie rods.',
    usage: 'Pump suction/discharge lines, compressor nozzles, offset process piping, and water/wastewater manifolds requiring sideways flexibility.',
    features: ['Designed for lateral displacement in one or multiple planes', 'Single bellow for moderate movement and twin-bellow options for larger offset', 'Tie rods provided to control pressure thrust and protect connected equipment', 'Inner sleeve option available for high-velocity flow service', 'Suitable for DN 15 to DN 12,000 custom projects', 'Designed per EJMA with material selection to process media and temperature'],
    specs: { 'Type': 'Lateral movement metallic expansion joint', 'Primary Movement': 'Lateral (perpendicular) displacement', 'Configuration': 'Single bellow or double lateral with intermediate spool', 'Tie Rods': 'Standard / recommended for pressure thrust control', 'Materials': 'SS 304/316/321, Duplex, high alloys', 'Design Code': 'EJMA / EN 14917 / ASME (project dependent)' },
    images: ['lateral-expansion-joint-1.webp', 'lateral-expansion-joint-2.webp', 'lateral-expansion-joint-3.webp', 'lateral-expansion-joint-4.webp', 'lateral-expansion-joint-5.webp', 'lateral-expansion-joint-6.webp']
  },
  {
    id: 'prod_e10', category: 'Expansion Joints', title: 'Angular Hinged / Gimbal Expansion Joint',
    desc: 'Pin-restrained angular expansion joint (hinged or gimbal type) for controlled rotational movement in one or two planes while resisting pressure thrust loads.',
    usage: 'High-temperature gas lines, steel plant ducting, power plant flue systems, and complex routed piping where angular compensation is preferred over axial loops.',
    features: ['Hinged design controls rotation in one plane with pin support', 'Gimbal design permits multi-plane angular movement with ring frame stability', 'Typically installed in pairs or multi-joint systems for controlled thermal growth', 'Reduces nozzle and anchor loads in complex pipe stress layouts', 'Available with weld ends or flanged ends to match site standards', 'Compatible with high-temperature alloys including 321, 309, Inconel classes'],
    specs: { 'Type': 'Angular restrained metallic expansion joint', 'Variants': 'Hinged (single plane) / Gimbal (multi-plane)', 'Primary Movement': 'Angular rotation', 'Pressure Thrust': 'Restrained by hinge/gimbal hardware', 'Temperature Capability': 'High-temperature service with suitable alloy selection', 'Standards': 'EJMA, EN 14917, ASME code-based design' },
    images: ['angular-hinged-gimbal-joint-1.webp', 'angular-hinged-gimbal-joint-2.webp', 'angular-hinged-gimbal-joint-3.webp', 'angular-hinged-gimbal-joint-4.webp', 'angular-hinged-gimbal-joint-5.webp', 'angular-hinged-gimbal-joint-6.webp']
  },
  {
    id: 'prod_e11', category: 'Expansion Joints', title: 'Metallic Vibration Absorber',
    desc: 'Short-length metallic bellow assembly designed for vibration isolation at rotating equipment connections, minimizing transmission of vibration and structure-borne noise.',
    usage: 'Pump and compressor connections, fan/blower lines, HVAC piping, and turbine auxiliary lines where high-frequency vibration control is required.',
    features: ['High flexibility at short face-to-face lengths for machinery isolation', 'Absorbs micro-movements and cyclic vibration with low spring reaction', 'Available with or without tie rods depending on movement and pressure design', 'Helps protect seals, bearings, nozzles, and supports from vibration fatigue', 'Can be supplied as metallic bellow type or braided short flexible assembly', 'Custom-designed for frequency spectrum, pressure, and nozzle load limits'],
    specs: { 'Type': 'Vibration isolation metallic bellow', 'Primary Function': 'Vibration damping + small axial/lateral compensation', 'Application Points': 'Pump, compressor, blower, fan nozzles', 'Construction': 'Short axial bellows; optional restraint hardware', 'Materials': 'SS 304/316/321 and process-suitable alloys', 'Design Basis': 'EJMA movement/stress criteria with project nozzle load checks' },
    images: ['metallic-vibration-absorber-1.webp', 'metallic-vibration-absorber-2.webp', 'metallic-vibration-absorber-3.webp', 'metallic-vibration-absorber-4.webp', 'metallic-vibration-absorber-5.webp', 'metallic-vibration-absorber-6.webp']
  },
  {
    id: 'prod_e12', category: 'Expansion Joints', title: 'Elbow Pressure Balanced Expansion Joint',
    desc: 'Pressure balanced elbow configuration with dual flow bellows and balancing element to absorb movement on two pipe legs while neutralizing pressure thrust at bend locations.',
    usage: 'Steam crossover elbows, compressor house bends, refinery process elbows, and constrained pipe corridors where large anchors are impractical.',
    features: ['Balances pressure thrust at elbow geometry to reduce structural anchor demand', 'Absorbs axial movement from both pipe legs in compact footprint', 'Improves flexibility where pipe loops are not feasible', 'Tie rods and limiters configured to suit design movement envelope', 'Suitable for high-temperature and moderate-to-high pressure lines', 'Delivered with calculation package and movement verification'],
    specs: { 'Type': 'Elbow pressure balanced bellows assembly', 'Primary Movement': 'Axial movement in two legs (thrust balanced)', 'Pressure Thrust': 'Neutralized by balance chamber design', 'Configuration': 'Two flow bellows + balancing bellows at elbow', 'Materials': 'SS 304/316/321, duplex, high-alloy options', 'Design Standards': 'EJMA / EN / ASME code-based engineering' },
    images: ['elbow-pressure-balance-joint-1.webp', 'elbow-pressure-balance-joint-2.webp', 'elbow-pressure-balance-joint-3.webp', 'elbow-pressure-balance-joint-4.webp', 'elbow-pressure-balance-joint-5.webp', 'elbow-pressure-balance-joint-6.webp']
  },
  {
    id: 'prod_e13', category: 'Expansion Joints', title: 'Steam Crossover Piping Bellows',
    desc: 'Large-diameter metallic bellows for turbine crossover and reheater piping where high temperature, differential casing growth, and strict reliability requirements govern design.',
    usage: 'HP-IP / IP-LP steam crossover lines, reheater interconnections, extraction piping, and back-pressure exhaust runs.',
    features: ['Engineered for high-temperature steam service and large thermal growth differentials', 'Can be configured as universal or pressure-balanced architecture', 'Low spring-rate design minimizes nozzle loading on connected equipment', 'Multi-ply bellows construction for fatigue life under cyclic start-stop duty', 'Inner sleeves and flow liners available for high-velocity steam', 'Project documentation includes movement, stress, and test records'],
    specs: { 'Type': 'Crossover steam line expansion bellows', 'Service': 'High-temperature steam turbine piping', 'Movement': 'Axial / lateral / angular (as configured)', 'Construction': 'Single, universal, or pressure-balanced design', 'Materials': 'SS 321/316, high-temperature alloys', 'Design Compliance': 'EJMA + power/process piping code basis' },
    images: ['steam-crossover-bellows-1.webp', 'steam-crossover-bellows-2.webp', 'steam-crossover-bellows-3.webp', 'steam-crossover-bellows-4.webp', 'steam-crossover-bellows-5.webp', 'steam-crossover-bellows-6.webp']
  },
  {
    id: 'prod_e14', category: 'Expansion Joints', title: 'FCCU High-Temperature Expansion Joint',
    desc: 'Severe-duty expansion joint for catalyst-laden high-temperature process gas systems, designed for thermal cycling, erosion resistance, and long service life in refinery cracking units.',
    usage: 'Regenerator flue gas lines, reactor/riser sections, delayed coker connections, and high-temperature refinery gas ducting.',
    features: ['Designed for elevated temperatures with erosive process media', 'Erosion-resistant liners and sleeves for particle-laden gas flow', 'Multi-layer bellows options for extended fatigue life', 'Refractory-compatible and externally insulated configurations available', 'High-alloy material selection for corrosion plus temperature resistance', 'Inspection and testing package supports critical-service QA requirements'],
    specs: { 'Type': 'Heavy-duty FCCU metallic expansion joint', 'Temperature Class': 'High-temperature process gas duty', 'Media': 'Catalyst-laden / corrosive refinery gas streams', 'Construction': 'Multi-ply bellows with protective liner options', 'Alloys': '310/321 SS, Inconel, Incoloy, Hastelloy options', 'Design Basis': 'EJMA with refinery service-specific checks' },
    images: ['fccu-expansion-joint-1.webp', 'fccu-expansion-joint-2.webp', 'fccu-expansion-joint-3.webp', 'fccu-expansion-joint-4.webp', 'fccu-expansion-joint-5.webp', 'fccu-expansion-joint-6.webp']
  },
  {
    id: 'prod_e15', category: 'Expansion Joints', title: 'Jacketed Expansion Joint',
    desc: 'Dual-path assembly with process medium in the inner line and heating/cooling utility in outer jacket, enabling controlled product temperature while compensating thermal movement.',
    usage: 'Bitumen, wax, resin, polymer, viscous chemical lines, and temperature-controlled process transfer systems.',
    features: ['Inner flow path and outer jacket engineered as integrated thermal system', 'Maintains media temperature to prevent solidification or condensation', 'Supports steam, hot-oil, or glycol utility jacket circuits', 'Accommodates axial and lateral expansion in both inner and outer shells', 'Designed for hygienic, chemical, or industrial process conditions', 'Custom nozzle/end configurations for retrofit or new installations'],
    specs: { 'Type': 'Jacketed expansion bellows assembly', 'Process Paths': 'Inner process line + outer utility jacket', 'Utility Media': 'Steam / hot oil / thermal fluid / glycol', 'Primary Movement': 'Axial + lateral compensation', 'Materials': 'SS 304/316/321 and application-specific alloys', 'Design Standards': 'EJMA + pressure piping code requirements' },
    images: ['jacketed-expansion-joint-1.webp', 'jacketed-expansion-joint-2.webp', 'jacketed-expansion-joint-3.webp', 'jacketed-expansion-joint-4.webp', 'jacketed-expansion-joint-5.webp', 'jacketed-expansion-joint-6.webp']
  },
  {
    id: 'prod_e16', category: 'Expansion Joints', title: 'Clamshell Retrofit Bellows',
    desc: 'Split-shell replacement bellows designed for in-situ installation around existing piping, minimizing shutdown time where full line dismantling is difficult.',
    usage: 'Emergency replacement of failed bellows, confined maintenance zones, and large-diameter systems where pipe removal is costly.',
    features: ['Two-piece clamshell construction for around-pipe installation', 'Reduces outage duration by avoiding major pipe disassembly', 'Suitable for retrofit in inaccessible plant locations', 'Welded in place by qualified procedures for pressure integrity', 'Can be tailored for temporary or long-term service strategy', 'Ideal for maintenance-critical lines requiring quick restoration'],
    specs: { 'Type': 'Split-shell retrofit expansion bellows', 'Installation': 'In-situ around existing piping', 'Primary Benefit': 'Reduced shutdown and dismantling effort', 'Service': 'Repair / replacement / retrofit projects', 'Construction': 'Two half-shell sections welded on site', 'Engineering': 'Site-specific dimensions and movement validation' },
    images: ['clamshell-bellows-1.webp', 'clamshell-bellows-2.webp', 'clamshell-bellows-3.webp', 'clamshell-bellows-4.webp', 'clamshell-bellows-5.webp', 'clamshell-bellows-6.webp']
  },
  {
    id: 'prod_e17', category: 'Expansion Joints', title: 'Lens Type Expansion Joint',
    desc: 'Single-convolution lens profile expansion joint offering robust, stiffer movement control for low-stroke and high-pressure applications.',
    usage: 'Heat exchanger nozzles, short-stroke pressure lines, and services where conventional multi-convolution bellows are too flexible.',
    features: ['Lens profile provides high structural stiffness', 'Suitable for limited movement with stronger pressure handling', 'Simple geometry supports robust operation in demanding duty', 'Lower movement per unit compared with multi-convolution bellows', 'Can be configured with weld ends or flanged connections', 'Optimized for compact installations with controlled flexibility requirements'],
    specs: { 'Type': 'Lens profile metallic expansion joint', 'Primary Movement': 'Small axial and limited angular compensation', 'Spring Rate': 'Higher than standard multi-convolution bellows', 'Pressure Class': 'Well-suited for high-pressure low-stroke duty', 'Connections': 'Weld-end / flanged options', 'Applications': 'Heat exchangers and short movement runs' },
    images: ['lens-expansion-joint-1.webp', 'lens-expansion-joint-2.webp', 'lens-expansion-joint-3.webp', 'lens-expansion-joint-4.webp', 'lens-expansion-joint-5.webp', 'lens-expansion-joint-6.webp']
  },
  {
    id: 'prod_e18', category: 'Expansion Joints', title: 'Rectangular Expansion Joint',
    desc: 'Rectangular or square-profile expansion joint engineered for duct systems, compensating thermal growth and vibration where circular bellows are not suitable.',
    usage: 'Boiler flue ducts, ESP/bag filter connections, kiln/incinerator ducting, and large HVAC air handling trunks.',
    features: ['Designed for rectangular/square duct geometry', 'Corner and convolution design optimized for thermal fatigue resistance', 'Absorbs axial, lateral, and angular movement in duct systems', 'Available with liners, insulation interfaces, and protective covers', 'Suitable for high-temperature gas and low-pressure large-area flow', 'Custom dimensions for retrofit and greenfield duct layouts'],
    specs: { 'Type': 'Rectangular duct expansion joint', 'Movement': 'Axial + lateral + angular', 'Service': 'Gas/air/flue duct systems', 'Construction': 'Formed metallic convolutions with reinforced corners', 'Accessories': 'Liners / shrouds / insulation interfaces', 'Design Compliance': 'Duct movement and stress-based project calculations' },
    images: ['rectangular-expansion-joint-1.webp', 'rectangular-expansion-joint-2.webp', 'rectangular-expansion-joint-3.webp', 'rectangular-expansion-joint-4.webp', 'rectangular-expansion-joint-5.webp', 'rectangular-expansion-joint-6.webp']
  },
  {
    id: 'prod_e19', category: 'Expansion Joints', title: 'District Heating Expansion Joint',
    desc: 'Expansion joint package for long buried hot-water networks, designed for reliable axial compensation, insulation compatibility, and long maintenance intervals.',
    usage: 'Municipal heating loops, industrial hot-water distribution, CHP utility lines, and pre-insulated underground pipeline systems.',
    features: ['Designed for underground and pre-insulated piping architecture', 'Externally pressurised options for large axial stroke compensation', 'Supports long thermal growth spans with fewer loop requirements', 'Corrosion-protected construction for buried service conditions', 'Engineered for long design life and low maintenance operation', 'Integrated with project-specific insulation and casing details'],
    specs: { 'Type': 'District heating expansion compensator', 'Primary Movement': 'Large axial compensation', 'Typical Medium': 'Hot water / thermal water networks', 'Installation': 'Buried and pre-insulated systems', 'Pressure-Temperature Class': 'Utility network duty (project specific)', 'Design Standards': 'District heating and pressure piping design requirements' },
    images: ['district-heating-joint-1.webp', 'district-heating-joint-2.webp', 'district-heating-joint-3.webp', 'district-heating-joint-4.webp', 'district-heating-joint-5.webp', 'district-heating-joint-6.webp']
  },
  {
    id: 'prod_e20', category: 'Expansion Joints', title: 'Tank Farm Service Expansion Bellows',
    desc: 'Expansion bellows for storage terminals to absorb tank settlement, nozzle offset, and thermal movement between fixed manifolds and tank-connected piping.',
    usage: 'Crude/product tank farms, chemical storage terminals, LNG/LPG handling manifolds, and transfer/loading lines.',
    features: ['Compensates differential settlement between tank shell and fixed piping', 'Handles combined thermal and mechanical displacement at terminal nozzles', 'Supports liquid and vapor duty lines with project-specific sealing design', 'Available for ambient, hot-service, and cryogenic terminal applications', 'Designed for operational flexibility during loading/unloading cycles', 'Can be supplied with restraint hardware to match nozzle load criteria'],
    specs: { 'Type': 'Tank farm movement compensation bellows', 'Primary Duty': 'Settlement + thermal growth absorption', 'Service Media': 'Hydrocarbon / chemical / cryogenic terminal fluids', 'Movement': 'Axial + lateral + angular (as designed)', 'Materials': 'SS 304/316, duplex, low-temperature alloy options', 'Design Basis': 'Terminal piping load and movement calculations' },
    images: ['tank-farm-bellows-1.webp', 'tank-farm-bellows-2.webp', 'tank-farm-bellows-3.webp', 'tank-farm-bellows-4.webp', 'tank-farm-bellows-5.webp', 'tank-farm-bellows-6.webp']
  },
  {
    id: 'prod_e21', category: 'Expansion Joints', title: 'Cryogenic LNG / LPG Expansion Joint',
    desc: 'Cryogenic-rated metallic expansion joint for very low-temperature liquefied gas service, maintaining ductility and sealing integrity under severe thermal contraction.',
    usage: 'LNG/LPG transfer lines, cryogenic storage terminals, ship loading headers, and low-temperature process units.',
    features: ['Engineered for cryogenic duty down to LNG service temperature ranges', 'Low-temperature material selection for toughness and fatigue resistance', 'Suitable for dynamic thermal cycling in loading and unloading operations', 'Can be designed for terminal, process, and marine-support infrastructure', 'Supports compact routing while reducing thermal stress on nozzles', 'Comes with full material traceability and cryogenic service documentation'],
    specs: { 'Type': 'Cryogenic metallic expansion bellows', 'Temperature Capability': 'Low-temperature liquefied gas service', 'Primary Movement': 'Axial + lateral compensation', 'Material Options': 'Austenitic SS and cryogenic-grade alloys', 'Applications': 'LNG/LPG pipelines and transfer systems', 'Quality Package': 'Material certificates + test documentation' },
    images: ['lng-lpg-expansion-joint-1.webp', 'lng-lpg-expansion-joint-2.webp', 'lng-lpg-expansion-joint-3.webp', 'lng-lpg-expansion-joint-4.webp', 'lng-lpg-expansion-joint-5.webp', 'lng-lpg-expansion-joint-6.webp']
  },
  {
    id: 'prod_e22', category: 'Expansion Joints', title: 'Scrubber / Exhaust Gas Cleaning Expansion Joint',
    desc: 'Corrosion-resistant expansion joint for wet and acidic exhaust gas cleaning systems, handling combined thermal load, condensate chemistry, and vibration.',
    usage: 'Industrial flue gas cleaning lines, marine-equivalent scrubber loops, desulfurization systems, and hot-wet gas exhaust headers.',
    features: ['Designed for hot gas plus wet acidic condensate environments', 'Material selection prioritizes corrosion resistance at operating temperature', 'Handles axial and angular displacement in exhaust treatment circuits', 'Liner and drain-conscious configurations available for condensate control', 'Suitable for large-diameter low-pressure exhaust duct service', 'Supports long-term reliability in sulfur- and moisture-bearing media'],
    specs: { 'Type': 'Exhaust gas cleaning service expansion joint', 'Media': 'Hot gas with moisture/acid condensate', 'Primary Movement': 'Axial + angular compensation', 'Materials': '316L, duplex, and high-corrosion-resistance alloys', 'Service Range': 'Exhaust treatment and scrubber ducting', 'Design Focus': 'Corrosion + thermal cycling durability' },
    images: ['scrubber-egc-joint-1.webp', 'scrubber-egc-joint-2.webp', 'scrubber-egc-joint-3.webp', 'scrubber-egc-joint-4.webp', 'scrubber-egc-joint-5.webp', 'scrubber-egc-joint-6.webp']
  },
  {
    id: 'prod_e23', category: 'Expansion Joints', title: 'Hygienic Sanitary Expansion Joint',
    desc: 'Sanitary-grade metallic expansion joint for hygienic process systems with smooth internal geometry, cleanability, and contamination-safe design.',
    usage: 'Food, beverage, pharmaceutical, and biotech process pipelines requiring CIP/SIP-compatible thermal movement compensation.',
    features: ['Smooth internal profile to minimize retention and contamination risk', 'Designed for clean-in-place and sterilize-in-place process practices', 'Sanitary materials and finishing for hygienic duty piping', 'Supports thermal growth without compromising process integrity', 'Optional polished internal surface grades for high-purity service', 'Suitable for aseptic and controlled-product transfer lines'],
    specs: { 'Type': 'Hygienic process expansion bellows', 'Service': 'Sanitary and high-purity process piping', 'Primary Movement': 'Axial + lateral compensation', 'Design Priority': 'Cleanability and contamination control', 'Construction': 'Sanitary-finish metallic bellows assembly', 'Applications': 'Food, pharma, biotech, beverage lines' },
    images: ['hygienic-expansion-joint-1.webp', 'hygienic-expansion-joint-2.webp', 'hygienic-expansion-joint-3.webp', 'hygienic-expansion-joint-4.webp', 'hygienic-expansion-joint-5.webp', 'hygienic-expansion-joint-6.webp']
  },
  {
    id: 'prod_e24', category: 'Expansion Joints', title: 'Hinged Single-Plane Expansion Joint',
    desc: 'Single-plane angular expansion joint with hinge mechanism restraining axial and lateral movement while absorbing thermal rotation in one defined plane. Supplied in pairs or triplets for directional thermal management.',
    usage: 'Power plant steam headers, industrial pipelines, and duct systems where directional thermal growth must be controlled in one plane.',
    features: ['Hinge mechanism allows angular rotation in one plane only', 'Axial and lateral movement restrained by hinge hardware — no uncontrolled displacement', 'Reduces anchor and guide loads when used in pairs/triplet systems', 'Suitable for steam, gas, and liquid service at high temperatures', 'Available with weld ends or flanged connections', 'Compatible with high-temperature alloys for severe-duty applications', 'Designed per EJMA and EN 14917 for movement and fatigue life'],
    specs: { 'Type': 'Hinged single-plane angular expansion joint', 'Primary Movement': 'Angular (single plane rotation)', 'Restrained Movements': 'Axial and Lateral RESTRAINED by hinge', 'Installation': 'In pairs or triplets for directional thermal management', 'Materials': 'SS 304/316/321, high-temperature alloys', 'Design Codes': 'EJMA, EN 14917, ASME B31.1/B31.3', 'Connections': 'Weld-end or flanged' },
    images: ['hinged-expansion-joint-1.webp', 'hinged-expansion-joint-2.webp', 'hinged-expansion-joint-3.webp', 'hinged-expansion-joint-4.webp', 'hinged-expansion-joint-5.webp', 'hinged-expansion-joint-6.webp']
  },
  {
    id: 'prod_e25', category: 'Expansion Joints', title: 'T-Type Pressure Balance Expansion Joint',
    desc: 'T-configuration pressure balance expansion joint for branch or junction piping, absorbing axial movement while neutralizing pressure thrust at direction changes in T-shaped pipe layouts.',
    usage: 'Branch piping junctions, T-piece connections in steam and process lines, and systems where pressure thrust at direction changes must be eliminated.',
    features: ['T-shaped design addresses movement at branch/junction points in piping', 'Balances pressure thrust at direction changes — eliminates massive anchors', 'Absorbs axial thermal expansion from both main and branch legs', 'Minimizes structural anchor and support requirements at T-junctions', 'High-alloy bellows for steam and process gas duty', 'Full EJMA calculation package with movement and stress verification', 'Available with flanged or weld-end connections'],
    specs: { 'Type': 'T-type pressure balance expansion joint', 'Configuration': 'T-shaped; balancing bellows + flow bellows at junction', 'Primary Movement': 'Axial from main and branch legs', 'Pressure Thrust': 'Balanced — T-configuration neutralizes thrust loads', 'Materials': 'SS 304/316/321, Duplex, Incoloy, Inconel', 'Design Standards': 'EJMA, EN 14917, ASME VIII Div.1', 'Applications': 'T-junction steam lines, process gas branch connections' },
    images: ['t-pressure-balance-joint-1.webp', 't-pressure-balance-joint-2.webp', 't-pressure-balance-joint-3.webp', 't-pressure-balance-joint-4.webp', 't-pressure-balance-joint-5.webp', 't-pressure-balance-joint-6.webp']
  },
  {
    id: 'prod_e26', category: 'Expansion Joints', title: 'Octagonal Profile Expansion Joint',
    desc: 'Eight-sided octagonal bellows expansion joint offering enhanced structural strength over circular profiles, absorbing thermal expansion and mechanical vibration in demanding industrial piping and duct systems.',
    usage: 'Heavy-duty piping systems, industrial ventilation, and process gas lines requiring improved structural integrity and vibration resistance beyond standard round bellows.',
    features: ['Octagonal (eight-sided) cross-section — improves structural strength vs. round profile', 'Absorbs axial thermal expansion and contraction under cyclic duty', 'Handles mechanical vibration in addition to thermal movement', 'Suitable for high-pressure or reinforced industrial piping systems', 'Enhanced durability in demanding environments with heavy mechanical stress', 'Custom dimensions per project piping geometry and movement requirements', 'Available in SS 304/316 and high-alloy materials for temperature resistance'],
    specs: { 'Type': 'Octagonal profile metallic expansion joint', 'Cross-Section': 'Eight-sided (octagonal) — higher strength than circular', 'Primary Movement': 'Axial (thermal expansion/contraction)', 'Additional Function': 'Mechanical vibration absorption', 'Materials': 'SS 304/316/321, process-suitable alloys', 'Design Codes': 'EJMA, EN 14917, project-specific calculations', 'Connections': 'Weld-end or flanged to match pipe geometry' },
    images: ['octagonal-expansion-joint-1.webp', 'octagonal-expansion-joint-2.webp', 'octagonal-expansion-joint-3.webp', 'octagonal-expansion-joint-4.webp', 'octagonal-expansion-joint-5.webp', 'octagonal-expansion-joint-6.webp']
  },
  {
    id: 'prod_e27', category: 'Expansion Joints', title: 'Thick Wall Heavy-Duty Expansion Joint',
    desc: 'Reinforced thick-wall expansion joint engineered for extreme pressure, high temperature, and heavy mechanical stress, delivering minimal deformation and superior durability in the most demanding industrial environments.',
    usage: 'High-pressure steam lines, heavy process piping, chemical reactors, and industrial systems where standard bellows wall thickness is insufficient for operating conditions.',
    features: ['Thick/reinforced wall construction for maximum pressure and stress resistance', 'Minimal deformation under extreme pressure and temperature cycles', 'Superior service life in harsh operating conditions vs. standard bellows', 'Suitable for applications with high mechanical loading and vibration', 'Available with internal sleeves and external protection shrouds', 'Full hydrostatic and pneumatic testing with pressure certification', 'Materials selected for combined pressure, temperature, and corrosion duty'],
    specs: { 'Type': 'Thick wall heavy-duty metallic expansion joint', 'Construction': 'Reinforced bellows with increased wall thickness', 'Pressure Capability': 'High-pressure service beyond standard bellows limits', 'Temperature Class': 'High-temperature heavy industrial duty', 'Primary Function': 'Axial movement absorption with extreme durability', 'Materials': 'SS 316/321, Duplex, Inconel, Hastelloy options', 'Testing': 'Full hydrostatic + pneumatic pressure certification' },
    images: ['thick-wall-expansion-joint-1.webp', 'thick-wall-expansion-joint-2.webp', 'thick-wall-expansion-joint-3.webp', 'thick-wall-expansion-joint-4.webp', 'thick-wall-expansion-joint-5.webp', 'thick-wall-expansion-joint-6.webp']
  },
  {
    id: 'prod_e28', category: 'Expansion Joints', title: 'MS Slip Type Expansion Joint',
    desc: 'Mild steel telescoping slip-type expansion joint using a sliding inner pipe within an outer sleeve to absorb linear thermal movement. Simpler construction than bellows type, ideal for large axial strokes in standard industrial piping.',
    usage: 'Steam distribution lines, industrial process piping, and utility systems requiring straightforward linear thermal expansion absorption at moderate pressure conditions.',
    features: ['Telescoping slip mechanism provides linear axial movement absorption', 'Mild steel (MS) construction — robust and cost-effective for standard conditions', 'Simpler design than bellows type — easier site maintenance and inspection', 'Packing gland provides sealing around sliding inner pipe', 'Suitable for steam, water, and industrial gas service at moderate pressures', 'Available in various nominal bore sizes to suit process piping standards', 'Custom end connections (flanged or weld-end) per site requirements'],
    specs: { 'Type': 'MS slip-type (telescoping) expansion joint', 'Construction': 'Mild steel outer sleeve + sliding inner pipe', 'Primary Movement': 'Axial (thermal expansion/contraction)', 'Sealing': 'Packing gland around sliding pipe', 'Material': 'Mild Steel (MS) — IS 2062 / equivalent grade', 'Service': 'Steam, water, industrial gas at moderate pressure', 'Connections': 'Flanged or weld-end as specified' },
    images: ['ms-slip-expansion-joint-1.webp', 'ms-slip-expansion-joint-2.webp', 'ms-slip-expansion-joint-3.webp', 'ms-slip-expansion-joint-4.webp', 'ms-slip-expansion-joint-5.webp', 'ms-slip-expansion-joint-6.webp']
  },
  {
    id: 'prod_e29', category: 'Expansion Joints', title: 'Industrial Airflow Damper',
    desc: 'Precision-engineered industrial damper for regulating or controlling airflow, gas flow, and flue gas within industrial duct and HVAC systems. Available in manual and motorized actuator configurations for energy-efficient flow management.',
    usage: 'Industrial chimneys, boiler flue gas ducts, HVAC ventilation systems, process air handling units, and industrial exhaust systems requiring controlled airflow regulation.',
    features: ['Manual or motorized/automatic actuation for precise flow control', 'Regulates volume, temperature, and pressure of air and gas flows', 'Suitable for hot flue gas, combustion air, and general ventilation ducts', 'Improves energy efficiency by optimizing airflow in system operation', 'Available in butterfly, louvre, and guillotine damper configurations', 'MS or SS construction — material selected per service temperature and media', 'Custom sizing for retrofit or new installation in industrial duct systems'],
    specs: { 'Type': 'Industrial airflow and gas flow damper', 'Configurations': 'Butterfly / Louvre / Guillotine damper types', 'Actuation': 'Manual or motorized (pneumatic/electric actuator)', 'Materials': 'Mild Steel (MS) / Stainless Steel (SS) per service', 'Service': 'HVAC, flue gas, combustion air, ventilation ducts', 'Applications': 'Boilers, chimneys, HVAC, industrial ducts, boiler systems', 'Sizing': 'Custom to duct dimensions and flow requirements' },
    images: ['industrial-damper-1.webp', 'industrial-damper-2.webp', 'industrial-damper-3.webp', 'industrial-damper-4.webp', 'industrial-damper-5.webp', 'industrial-damper-6.webp']
  },
  {
    id: 'prod_e30', category: 'Expansion Joints', title: 'Dismantling Joint',
    desc: 'Mechanical dismantling joint designed for easy disassembly and reassembly of piping sections during maintenance without damaging adjacent components. Provides axial adjustment for quick removal and reinstallation of pumps, valves, and equipment.',
    usage: 'Pump and compressor suction/discharge connections, valve maintenance points, water treatment systems, and industrial piping requiring regular equipment removal and reinstallation.',
    features: ['Designed for quick and damage-free disassembly of connected piping or equipment', 'Provides axial adjustment (typically 50–300 mm) for equipment removal clearance', 'Eliminates need for pipe cutting or flange grinding during maintenance', 'Reduces downtime significantly at regular maintenance points', 'Available in flanged connection configuration for standard piping', 'MS and SS material options for water, chemical, and industrial service', 'Suitable for pump connections, valve maintenance, and instrumentation takeoffs'],
    specs: { 'Type': 'Mechanical dismantling joint (adjustable)', 'Primary Function': 'Easy maintenance disassembly without pipe damage', 'Adjustment Range': 'Typically 50–300 mm axial travel (project specific)', 'Construction': 'Mild Steel or Stainless Steel per service', 'Connections': 'Flanged ends (ANSI/PN as specified)', 'Applications': 'Pumps, valves, water treatment, industrial piping', 'Typical Bore Range': 'DN 50 to DN 600 (custom larger sizes available)' },
    images: ['dismantling-joint-1.webp', 'dismantling-joint-2.webp', 'dismantling-joint-3.webp', 'dismantling-joint-4.webp', 'dismantling-joint-5.webp', 'dismantling-joint-6.webp']
  },
  {
    id: 'prod_e31', category: 'Expansion Joints', title: 'MS & SS Industrial Duct Systems',
    desc: 'Custom-fabricated mild steel and stainless steel duct systems for industrial air, gas, and fume conveyance. MS ducts deliver cost-effective strength for standard environments while SS ducts provide superior corrosion resistance for aggressive and hygienic applications.',
    usage: 'Industrial ventilation systems, fume extraction, exhaust air handling, chemical plant gas conveyance, food and pharmaceutical manufacturing, and boiler or furnace gas duct connections.',
    features: ['MS Ducts: Cost-effective Mild Steel construction for standard industrial environments', 'SS Ducts: Stainless Steel for corrosive, high-temperature, or hygienic environments', 'Custom fabricated to exact site dimensions and layout requirements', 'Available in rectangular, circular, and special cross-section profiles', 'Welded, flanged, or clamped joint options per system design', 'Compatible with expansion joints, dampers, and filtration equipment', 'Suitable for high-temperature flue gas, chemical fumes, and clean-room ventilation'],
    specs: { 'Type': 'Custom fabricated industrial duct systems', 'MS Material': 'Mild Steel IS 2062 — cost-effective, strong, standard environments', 'SS Material': 'SS 304 / 316 — corrosion resistant, long lifespan, hygienic', 'Cross-Sections': 'Rectangular, circular, and special profiles', 'Joint Types': 'Welded, flanged, clamped connections', 'Service Media': 'Air, gas, fumes, exhaust, chemical vapour, hot flue gas', 'Applications': 'Industrial ventilation, fume extraction, HVAC, boiler gas ducts' },
    images: ['ms-ss-duct-1.webp', 'ms-ss-duct-2.webp', 'ms-ss-duct-3.webp', 'ms-ss-duct-4.webp', 'ms-ss-duct-5.webp', 'ms-ss-duct-6.webp']
  },
  {
    id: 'prod_ts1', category: 'Turbine Spares', title: 'Carbon & Graphite Gland Sealing Rings',
    desc: 'Precision machined carbon and graphite seal rings for steam turbine gland sealing. Self-lubricating material maintains tight clearances at extreme temperatures.',
    usage: 'Steam turbine gland sealing for pressure retention at shaft exits; gas turbine labyrinth shaft sealing.',
    features: ['Self-lubricating carbon/graphite — no additional lubrication required', 'Precision CNC machined to OEM dimensional specifications', 'High temperature resistance: up to 600 deg C continuous', 'Low coefficient of friction — minimal shaft wear', 'Chemical inertness with steam, gases, most process media', 'Grades: Carbon graphite, electrographite, silicon carbide', 'Manufactured to tight clearances per OEM drawings'],
    specs: { 'Material Grades': 'Carbon graphite / Electrographite / Silicon Carbide', 'Max Temperature': 'Up to 600 deg C continuous', 'Lubrication': 'Self-lubricating (no oil required)', 'Application': 'Turbine gland sealing at shaft exits', 'Machining': 'Precision CNC to OEM dimensions' },
    images: ['black-carbon-sealing-rings-1.webp', 'black-carbon-sealing-rings-2.webp', 'black-carbon-sealing-rings-3.webp', 'black-carbon-sealing-rings-4.webp', 'black-carbon-sealing-rings-5.webp', 'black-carbon-sealing-rings-6.webp']
  },
  {
    id: 'prod_ts2', category: 'Turbine Spares', title: 'Labyrinth Shaft Sealing Packings',
    desc: 'Custom manufactured labyrinth seal segments and packings for steam turbine shaft sealing. High-temperature alloy with erosion-resistant teeth machined to OEM tight-clearance specifications.',
    usage: 'Steam turbine shaft sealing between rotating and stationary components; prevents steam leakage along shaft at multiple pressure stages.',
    features: ['High-temperature alloy: 410SS, Monel, Stellite options', 'Erosion-resistant labyrinth teeth profile', 'Precision machined to OEM diametral clearance specs', 'Radial, axial, and combined labyrinth configurations', 'Caulked-in and spring-back (retractable) designs available', 'Manufactured from reverse-engineered OEM drawings', 'PMI material verification before machining', 'Dimensional inspection report provided'],
    specs: { 'Material': '410SS, Monel, Stellite — per OEM specification', 'Configurations': 'Radial, Axial, Combined labyrinth', 'Design Types': 'Caulked-in or Spring-back (retractable)', 'Clearances': 'Precision OEM diametral clearance specification', 'Verification': 'PMI material testing + dimensional inspection' },
    images: ['labyrinth-sealing-packings-1.webp', 'labyrinth-sealing-packings-2.webp', 'labyrinth-sealing-packings-3.webp', 'labyrinth-sealing-packings-4.webp', 'labyrinth-sealing-packings-5.webp', 'labyrinth-sealing-packings-6.webp']
  },
  {
    id: 'prod_ts3', category: 'Turbine Spares', title: 'Babbitt Journal Bearings & Thrust Pads',
    desc: 'Precision machined white metal (babbitt) journal and thrust bearings for critical rotating turbine equipment. Ultrasonic bond testing verifies babbitt-to-shell adhesion.',
    usage: 'High-speed rotor support in steam turbines, compressors, and gearboxes; thrust load management in turbine thrust bearing housings.',
    features: ['White metal (babbitt) — Tin-base or Lead-base per OEM specification', 'Precision CNC machined journal bearing bores to OEM tolerance', 'Thrust pads: Tilting pad or fixed profile designs available', 'Ultrasonic bond testing verifies babbitt adhesion — 100% tested', 'Shell material: Cast steel, bronze, or SS per application', 'Oil distribution grooves and feed holes machined precisely', 'High load capacity with hydrodynamic oil film support', 'Exact OEM dimensional replication via 3D scanning and CMM'],
    specs: { 'Babbitt Metal': 'White Metal — Tin-base or Lead-base', 'Shell Material': 'Cast Steel, Bronze, SS (per OEM)', 'Bearing Types': 'Journal bearing + Thrust Pad (tilting or fixed)', 'Bond Integrity Test': 'Ultrasonic bond integrity verification — 100%', 'Machining': 'Precision CNC to OEM tolerance', 'Dimensional Verification': '3D scanning + CMM measurement' },
    images: ['babbitt-bearings-1.webp', 'babbitt-bearings-2.webp', 'babbitt-bearings-3.webp', 'babbitt-bearings-4.webp', 'babbitt-bearings-5.webp', 'babbitt-bearings-6.webp']
  },
  {
    id: 'prod_ts4', category: 'Turbine Spares', title: 'Emergency Stop Valves (ESV)',
    desc: 'Mission-critical turbine emergency stop valves reverse-engineered and manufactured to precise dimensional standards. Stellite hard-faced seating surfaces for long service life.',
    usage: 'Turbine over-speed protection; primary emergency shutdown valve in steam admission circuit.',
    features: ['Reverse-engineered from OEM samples using 3D scanning and CMM', 'Stellite hard-faced seat and plug internals for erosion resistance', 'Spring-loaded rapid-closure mechanism — fail-safe closed', 'High-pressure pneumatic/hydraulic actuation available', 'Body material: Alloy steel (Cr-Mo) or SS 316', 'Hydrotest: 1.5x design pressure', 'Seat leakage test conducted per applicable standards', 'PMI verification + dimensional inspection report supplied'],
    specs: { 'Function': 'Emergency shutdown — fail-safe closed position', 'Actuation': 'Spring-loaded + pneumatic or hydraulic trip', 'Seat/Plug Material': 'Stellite hard-faced (erosion resistant)', 'Body Material': 'Alloy steel Cr-Mo / SS 316', 'Pressure Testing': 'Hydrotest at 1.5x design pressure', 'Seat Leakage': 'Tested per applicable standards', 'Verification': 'PMI certification + dimensional inspection report' },
    images: ['emergency-stop-valve-1.webp', 'emergency-stop-valve-2.webp', 'emergency-stop-valve-3.webp', 'emergency-stop-valve-4.webp', 'emergency-stop-valve-5.webp', 'emergency-stop-valve-6.webp']
  },
  {
    id: 'prod_ts5', category: 'Turbine Spares', title: 'Turbine Lube Oil Pumps & Mechanical Seals',
    desc: 'OEM-dimensionally-matched replacement main and auxiliary lube oil pumps with precision mechanical seals. High volumetric efficiency with leak-proof mechanical seal assemblies.',
    usage: 'Main and auxiliary lube oil systems in power generation turbines; supplying pressurized oil to bearings, governors, and control systems.',
    features: ['Exact OEM dimensional match verified against drawing', 'Gear pump type — high volumetric efficiency', 'Precision mechanical face seal assembly — no packing', 'Shaft and gear dimensions verified per OEM drawing', 'Materials: Cast iron body, SS shaft, bronze bushing', 'Performance tested at rated pressure and flow before dispatch', 'Engineering drawing supplied with each pump'],
    specs: { 'Pump Type': 'Gear pump (main / auxiliary lube oil service)', 'Shaft Sealing': 'Precision mechanical face seal', 'Materials': 'Cast iron body / SS shaft / Bronze bushing', 'Testing': 'Pressure and flow performance test at rated conditions', 'Documentation': 'Engineering drawing supplied with each unit' },
    images: ['turbine-oil-pumps-1.webp', 'turbine-oil-pumps-2.webp', 'turbine-oil-pumps-3.webp', 'turbine-oil-pumps-4.webp', 'turbine-oil-pumps-5.webp', 'turbine-oil-pumps-6.webp']
  },
  {
    id: 'prod_ts6', category: 'Turbine Spares', title: 'High-Purity Electrographite Sealing Rings',
    desc: 'Specialized high-purity electrographite sealing rings for extreme temperature and pressure steam environments. Excellent thermal conductivity dissipates heat from gland area efficiently.',
    usage: 'High-temperature steam gland sealing in power generation turbines; extreme pressure shaft sealing where standard carbon grades are inadequate.',
    features: ['High-purity electrographite material grade', 'Excellent thermal conductivity for efficient gland heat dissipation', 'Extreme temperature resistance: up to 700 deg C and above', 'Chemical inertness with superheated steam and all process gases', 'Superior oxidation resistance versus standard carbon grades', 'Low friction coefficient — extends seal and shaft service life', 'Precision CNC machined to OEM dimensional specifications', 'Self-lubricating — eliminates need for external lubrication'],
    specs: { 'Material': 'High-purity electrographite', 'Max Temperature': 'Up to 700 deg C+ (superheated steam service)', 'Thermal Conductivity': 'High — effective gland heat dissipation', 'Chemical Resistance': 'Steam, all process gases, chemicals', 'Lubrication': 'Self-lubricating', 'Machining': 'Precision CNC to OEM specification' },
    images: ['high-purity-graphite-rings-1.webp', 'high-purity-graphite-rings-2.webp', 'high-purity-graphite-rings-3.webp', 'high-purity-graphite-rings-4.webp', 'high-purity-graphite-rings-5.webp', 'high-purity-graphite-rings-6.webp']
  },
  {
    id: 'prod_ts7', category: 'Turbine Spares', title: 'Complete Turbine Rotor Assemblies',
    desc: 'Fully manufactured and dynamically balanced turbine rotor assemblies built to exact OEM tolerances. Covers all stages from rough machining through to final precision machining and ISO/API dynamic balancing.',
    usage: 'Complete rotating element replacement for steam turbines; re-wheeling of existing shafts with new discs and blades.',
    features: ['Manufactured from reverse-engineered OEM drawings with PMI material verification', 'Material: Alloy steel (CrMoV, 12% Cr) per steam conditions', 'Precision machined: rough machining > pre-final > final', 'Dynamic balancing 50-2,000 kg to ISO 1940 / API 670', 'Complete balancing report with mechanical and electrical run-out data', 'Blade attachment options: Finger-tree, T-root, or dove-tail', 'Material upgrades available for life extension programs', 'Ready for immediate installation with full inspection certificates'],
    specs: { 'Rotor Material': 'Alloy Steel (CrMoV, 12% Cr) per steam conditions', 'Dynamic Balancing': 'ISO 1940 / API 670 (capacity: 50-2,000 kg)', 'Machining Stages': 'Rough machining > Pre-final > Final machining', 'Blade Root Options': 'Finger-tree, T-root, Dove-tail', 'Documentation': 'Full inspection certificate + balancing report', 'Material Upgrades': 'Available for life extension programs' },
    images: ['rotor-assembly-1.webp', 'rotor-assembly-2.webp', 'rotor-assembly-3.webp', 'rotor-assembly-4.webp', 'rotor-assembly-5.webp', 'rotor-assembly-6.webp']
  },
  {
    id: 'prod_ts8', category: 'Turbine Spares', title: 'Precision Turbine Gears & Worm Wheels',
    desc: 'High-precision gear sets and worm wheel assemblies reverse-engineered for turbine gearboxes and speed reducers. Precision hobbed with exact gear ratios and heat-treated for maximum wear resistance.',
    usage: 'Turbine gearboxes, speed reducers, governor drive gear trains, and auxiliary equipment gear drives.',
    features: ['Exact OEM gear ratios replicated via precision reverse engineering', 'Gear types: Spur, helical, bevel, and worm gear configurations', 'Precision hobbing and gear grinding to DIN Grade 6-8 quality', 'Heat treatment: Case hardening, through hardening, or nitriding', 'Material: Alloy steel (20MnCr5, 42CrMo4) per OEM specification', 'Surface hardness: 58-62 HRC (case hardened) or 250-320 HB (through hardened)', 'Gear profile and tooth geometry verified against OEM sample', 'Noise and vibration tests conducted post-assembly'],
    specs: { 'Gear Types': 'Spur, Helical, Bevel, Worm', 'Quality Grade': 'DIN Grade 6-8 (precision hobbed/ground)', 'Material': 'Alloy Steel — 20MnCr5, 42CrMo4', 'Heat Treatment': 'Case hardening, through hardening, nitriding', 'Surface Hardness': '58-62 HRC (case) / 250-320 HB (through)', 'Verification': 'Profile, tooth geometry, noise/vibration tests' },
    images: ['gears-worm-wheels-1.webp', 'gears-worm-wheels-2.webp', 'gears-worm-wheels-3.webp', 'gears-worm-wheels-4.webp', 'gears-worm-wheels-5.webp', 'gears-worm-wheels-6.webp']
  },
  {
    id: 'prod_ts9', category: 'Turbine Spares', title: 'Turbine Nozzles & Diaphragms',
    desc: 'Critical steam path components engineered to direct and accelerate steam flow across each turbine stage for maximum efficiency. High-temperature erosion-resistant alloys.',
    usage: 'Internal steam path of high-pressure industrial steam turbines; each pressure stage nozzle block and stationary diaphragm.',
    features: ['Steam path design optimized for efficiency — nozzle angle and throat area per OEM', 'Material: 13% Cr steel, 316L SS, Incoloy for high-temperature stages', 'Erosion and corrosion-resistant surface treatment', 'Precise throat dimensions maintained per OEM specification', 'Diaphragm construction: Welded or cast per application', 'Integral or replaceable nozzle block designs available', 'Material upgrade available: Titanium or higher-alloy for life extension', 'Full dimensional inspection + PMI material certificate supplied'],
    specs: { 'Material': '13% Cr Steel, 316L SS, Incoloy (stage-dependent)', 'Nozzle Design': 'Optimized nozzle angle + throat area per OEM', 'Surface Treatment': 'Erosion and corrosion resistant', 'Diaphragm Type': 'Welded or cast; integral/replaceable nozzle block', 'Material Upgrades': 'Titanium/high-alloy for life extension', 'Documentation': 'Dimensional inspection + PMI material certificate' },
    images: ['nozzles-diaphragms-1.webp', 'nozzles-diaphragms-2.webp', 'nozzles-diaphragms-3.webp', 'nozzles-diaphragms-4.webp', 'nozzles-diaphragms-5.webp', 'nozzles-diaphragms-6.webp']
  },
  {
    id: 'prod_ts10', category: 'Turbine Spares', title: 'Mechanical Centrifugal Speed Governors',
    desc: 'Precision mechanical centrifugal governor assemblies maintaining exact RPM control in steam turbines. Fly-weight mechanism, speeder spring, and pilot valve assemblies included.',
    usage: 'Turbine speed control and over-speed prevention; primary speed governing device in steam turbines without electronic governors.',
    features: ['Fly-weight centrifugal mechanism with calibrated speeder springs', 'Pilot valve assembly for hydraulic amplification of control signal', 'High sensitivity: detects speed deviations within +/-1% RPM', 'Over-speed trip setpoint: typically 10% above rated speed', 'Robust all-mechanical design for continuous unattended operation', 'Calibrated setpoint before dispatch from workshop', 'Complete dimensional and performance test report provided'],
    specs: { 'Governor Type': 'Mechanical centrifugal fly-weight', 'Speed Sensitivity': '+/-1% RPM deviation detection', 'Over-speed Trip': 'Typically 10% above rated operating speed', 'Control Amplification': 'Hydraulic pilot valve (oil pressure signal)', 'Calibration': 'Setpoint calibrated before dispatch', 'Documentation': 'Performance test report supplied' },
    images: ['mechanical-governors-1.webp', 'mechanical-governors-2.webp', 'mechanical-governors-3.webp', 'mechanical-governors-4.webp', 'mechanical-governors-5.webp', 'mechanical-governors-6.webp']
  },
  {
    id: 'prod_ts11', category: 'Turbine Spares', title: 'Turbine Throttle (Control) Valves',
    desc: 'High-pressure throttle and control valves for precise steam flow regulation into turbine stages. Stellite-trimmed internals for erosion resistance at high velocities.',
    usage: 'Steam turbine inlet throttle control and multi-valve admission for power and back-pressure control.',
    features: ['Stellite-trimmed stem, seat and plug internals', 'Body: Alloy steel (Cr-Mo) or SS 316 per steam conditions', 'Custom equal-percentage or linear flow characteristics', 'High-pressure rated (to turbine design pressure)', 'Rapid response action for governor integration', 'Hydraulic or pneumatic actuator options', 'Seat and plug hardness: 40-45 HRC (Stellite 6)', 'Hydrotest at 1.5x DP; seat leakage tested'],
    specs: { 'Internals': 'Stellite 6 trimmed (seat + plug + stem)', 'Body': 'Alloy steel Cr-Mo / SS 316', 'Flow Characteristics': 'Equal-percentage or linear (custom)', 'Actuation': 'Hydraulic or pneumatic', 'Hardness': '40-45 HRC (Stellite 6)', 'Testing': 'Hydrotest 1.5x DP + seat leakage test' },
    images: ['throttle-valves-1.webp', 'throttle-valves-2.webp', 'throttle-valves-3.webp', 'throttle-valves-4.webp', 'throttle-valves-5.webp', 'throttle-valves-6.webp']
  },
  {
    id: 'prod_r1', category: 'Industrial Rubber Products', title: 'Custom Extruded Rubber Profiles & Seals',
    desc: 'High-quality extruded rubber profiles in EPDM, Neoprene, Nitrile, and Natural Rubber for industrial sealing and dampening. Custom cross-section shapes produced to customer drawing.',
    usage: 'Sealing panels, machine covers, door and window seals, industrial enclosure gaskets, vibration damping strip applications.',
    features: ['Custom cross-section extrusion to customer drawing or sample', 'Materials: EPDM, Neoprene (CR), Nitrile (NBR), Natural Rubber', 'EPDM: Excellent weathering, ozone, UV resistance for outdoor use', 'Neoprene: Oil and flame resistant properties', 'Nitrile: Superior oil and fuel resistance', 'Hardness range: 40-80 Shore A per application', 'Operating temperature: -40 to +150 deg C (EPDM grade)', 'Available with pressure-sensitive adhesive backing'],
    specs: { 'Material Options': 'EPDM, Neoprene (CR), Nitrile (NBR), Natural Rubber', 'Hardness Range': '40-80 Shore A (customizable)', 'Operating Temperature': '-40 to +150 deg C (EPDM grade)', 'Profile': 'Custom cross-section per drawing or sample', 'Backing Option': 'Pressure-sensitive adhesive backing available', 'Supply Format': 'Standard rolls or cut-to-length' },
    images: ['extruded-rubber-profile-1.webp', 'extruded-rubber-profile-2.webp', 'extruded-rubber-profile-3.webp', 'extruded-rubber-profile-4.webp', 'extruded-rubber-profile-5.webp', 'extruded-rubber-profile-6.webp']
  },
  {
    id: 'prod_r2', category: 'Industrial Rubber Products', title: 'Heavy Duty Anti-Vibration Rubber Mounts',
    desc: 'Industrial-grade anti-vibration rubber mounts bonded to steel plates for isolating heavy rotating machinery. Reduces structure-borne noise and vibration transmission.',
    usage: 'Vibration isolation for turbine-generator sets, compressors, diesel generators, cooling tower fans, and heavy industrial machinery.',
    features: ['Natural rubber to steel plate bonded (vulcanized) construction', 'High load bearing capacity per mounting point', 'Significantly reduces structure-borne noise and vibration', 'Protects foundations from dynamic machinery loads', 'Operating temperature: -30 to +70 deg C (continuous)', 'Types: Cylindrical, sandwich, conical, and bobbin mounts', 'Custom load ratings and natural frequency specifications available'],
    specs: { 'Construction': 'Rubber-to-steel bonded (vulcanized)', 'Mount Types': 'Cylindrical, sandwich, conical, bobbin', 'Material': 'Natural Rubber / Neoprene + Mild Steel', 'Operating Temperature': '-30 to +70 deg C continuous', 'Load Rating': 'Custom per application requirement', 'Applications': 'Turbine-generator, compressor, heavy machinery isolation' },
    images: ['rubber-mounts-1.webp', 'rubber-mounts-2.webp', 'rubber-mounts-3.webp', 'rubber-mounts-4.webp', 'rubber-mounts-5.webp', 'rubber-mounts-6.webp']
  },
  {
    id: 'prod_h1', category: 'Flexible Hoses & Assemblies', title: 'SS Corrugated Flexible Metal Hose Assemblies',
    desc: 'Stainless steel corrugated hose with braided outer sheath for high-temperature, high-pressure, and chemically aggressive fluid transfer. Absorbs thermal expansion, vibration, and misalignment.',
    usage: 'High-temperature steam lines, chemical transfer, vibration absorption at pump/compressor connections, cryogenic lines.',
    features: ['SS 304 / SS 316L corrugated inner hose', 'Single or double SS braided outer sheath', 'OD range: 1/2 to 14 inch (DN 15 to DN 350)', 'Temperature: -20 to +350 deg C', 'Working pressure: 0.6 to 1.6 MPa (standard)', 'Ends: SS 304/316 BSP, NPT, BSPP threaded or flanged', 'Tested per ISO 10380 and SAE J1610', 'Absorbs axial, lateral, and angular movements simultaneously'],
    specs: { 'Hose Material': 'SS 304 / SS 316L corrugated + SS wire braid', 'Size Range': '1/2 to 14 inch (DN 15 to DN 350)', 'Temperature Range': '-20 to +350 deg C', 'Working Pressure': '0.6-1.6 MPa (single braid); higher with double braid', 'End Fittings': 'BSP, NPT, Flanged — SS 304/316', 'Test Standards': 'ISO 10380, SAE J1610' },
    images: ['ss-corrugated-flexible-hose-1.webp', 'ss-corrugated-flexible-hose-2.webp', 'ss-corrugated-flexible-hose-3.webp', 'ss-corrugated-flexible-hose-4.webp', 'ss-corrugated-flexible-hose-5.webp', 'ss-corrugated-flexible-hose-6.webp']
  },
  {
    id: 'prod_h1b', category: 'Flexible Hoses & Assemblies', title: 'SS Hose Pre-Fitted Assemblies',
    desc: 'Complete stainless steel hose assemblies with pre-fitted and tested end fittings for immediate installation. Combines SS corrugated hose flexibility with leak-proof sealed end connections — ready to bolt on.',
    usage: 'Critical fluid transfer in refineries, chemical processing, steam systems, hydraulic lines, food processing, and pharmaceutical plants where assembled and tested hoses are required.',
    features: ['Pre-fitted end fittings — ready to install, no site assembly required', 'Pressure-tested assembly — full leakage test before despatch', 'Material grades: SS 304, SS 316 hose and fittings', 'Working pressure: Up to 40 bar', 'Hose lengths: 1 m to 30 m; custom lengths available', 'End connections: Female threaded, flanged, nipple, camlock, quick release', 'Single and double wire braid configurations available', 'ISO 10380 compliant; traceability documentation available'],
    specs: { 'Construction': 'SS corrugated hose with pre-fitted tested end fittings', 'Material Grades': 'SS 304 / SS 316', 'Working Pressure': 'Up to 40 bar', 'Hose Length': '1 m to 30 m; custom lengths available', 'End Connections': 'Female Threaded, Flanged, Nipple, Camlock, Quick Release', 'Testing': 'Full pressure and leakage test before despatch', 'Standard': 'ISO 10380' },
    images: ['ss-hose-assembly-1.webp', 'ss-hose-assembly-2.webp', 'ss-hose-assembly-3.webp', 'ss-hose-assembly-4.webp', 'ss-hose-assembly-5.webp', 'ss-hose-assembly-6.webp']
  },
  {
    id: 'prod_h1c', category: 'Flexible Hoses & Assemblies', title: 'Generator & Engine Exhaust Bellows',
    desc: 'Specialised single-bellow expansion joints for generator exhaust connections and engine exhaust systems. Temperature-rated for hot exhaust gas service with SS 316L construction. Available in round or rectangular configuration with interlock liner option.',
    usage: 'Diesel generator exhaust connections, gas engine exhaust systems, industrial engine compartments, and automotive exhaust ducting.',
    features: ['Flanged ends — round or rectangular configuration available', 'SS 316L construction — rated for exhaust gas temperatures to +400°C', 'Single bellow design — absorbs axial and lateral exhaust movement', 'Interlock liner option to prevent vibration fatigue on bellows', 'Absorbs engine vibration and thermal expansion from exhaust system', 'Prevents exhaust load transmission to engine block or silencer', 'Available bore sizes: 25 mm to 150 mm', 'Quick installation with standard flange drilling'],
    specs: { 'Material': 'SS 316L', 'Temperature Range': '-20°C to +400°C', 'Configuration': 'Single bellow — round or rectangular', 'Bore Size': '25 mm to 150 mm', 'End Connections': 'Flanged', 'Liner Option': 'Interlock liner for vibration protection', 'Applications': 'Generator exhaust, engine exhaust systems, automotive' },
    images: ['generator-exhaust-bellow-1.webp', 'generator-exhaust-bellow-2.webp', 'generator-exhaust-bellow-3.webp', 'generator-exhaust-bellow-4.webp', 'generator-exhaust-bellow-5.webp', 'generator-exhaust-bellow-6.webp']
  },
  {
    id: 'prod_h2', category: 'Flexible Hoses & Assemblies', title: 'PTFE Lined Smooth Bore Hose Assemblies',
    desc: 'Smooth bore PTFE-lined hose with stainless steel outer braid. Non-stick inner surface prevents product contamination. Maximum chemical resistance for aggressive chemicals and high-purity applications.',
    usage: 'Pharmaceutical fluid transfer, aggressive acids/alkalis, solvents, semiconductor chemicals, food-grade process lines.',
    features: ['Smooth bore PTFE inner tube — non-stick, non-contaminating', 'SS 304 / SS 316 outer braided sheath', 'Chemically inert to virtually all industrial chemicals', 'FDA-compliant PTFE grade available for food and pharma', 'Operating temperature: -60 to +260 deg C', 'Working pressure: Up to 40 bar (size-dependent)', 'Anti-static conductive PTFE available', 'End fittings: NPT, BSP, flanged, tri-clamp'],
    specs: { 'Inner Tube': 'Smooth bore PTFE (FDA grade available)', 'Outer Braid': 'SS 304 / SS 316', 'Temperature Range': '-60 to +260 deg C', 'Max Working Pressure': 'Up to 40 bar (size-dependent)', 'Chemical Resistance': 'Virtually all industrial chemicals', 'End Fittings': 'Swaged SS — NPT, BSP, flanged, tri-clamp' },
    images: ['ptfe-lined-hose-1.webp', 'ptfe-lined-hose-2.webp', 'ptfe-lined-hose-3.webp', 'ptfe-lined-hose-4.webp', 'ptfe-lined-hose-5.webp', 'ptfe-lined-hose-6.webp']
  },
  {
    id: 'prod_h3', category: 'Flexible Hoses & Assemblies', title: 'High-Pressure Hydraulic Rubber Hose Assemblies',
    desc: 'Steel wire braid and spiral-reinforced rubber hydraulic hoses for extreme pressure service. Oil and weather-resistant cover suitable for turbine hydraulic control systems.',
    usage: 'Heavy machinery hydraulic systems, turbine hydraulic control lines, industrial power units, mobile equipment hydraulics.',
    features: ['Inner tube: Oil-resistant nitrile rubber', 'Reinforcement: High-tensile steel wire braid or 4-wire spiral wrap', 'Outer cover: Oil, weather, and abrasion-resistant black rubber', 'Working pressure: Up to 420 bar (4-spiral wrap, size-dependent)', 'MSHA approval for mining and hazardous location applications', 'Standards: EN 853, EN 856, SAE 100R1/R2/R12/R13', 'Operating temperature: -40 to +120 deg C', 'End fittings: Crimped CS/SS — JIC, BSP, NPT, SAE flange'],
    specs: { 'Inner Tube': 'Oil-resistant Nitrile (NBR) rubber', 'Reinforcement': 'Steel wire braid / 4-wire spiral wrap', 'Outer Cover': 'Oil/weather/abrasion-resistant rubber', 'Max Working Pressure': 'Up to 420 bar (4-spiral, size-dependent)', 'Temperature Range': '-40 to +120 deg C', 'Standards': 'EN 853, EN 856, SAE 100R1/R2/R12/R13, MSHA' },
    images: ['hydraulic-rubber-hose-1.webp', 'hydraulic-rubber-hose-2.webp', 'hydraulic-rubber-hose-3.webp', 'hydraulic-rubber-hose-4.webp', 'hydraulic-rubber-hose-5.webp', 'hydraulic-rubber-hose-6.webp']
  },
  {
    id: 'prod_ee1', category: 'Electronic Equipments', title: 'Vibration Sensors (Shinkawa)',
    desc: 'High-precision non-contact eddy current displacement sensors for continuous turbine shaft vibration and axial position monitoring. API 670 standard compliant.',
    usage: 'Continuous monitoring of shaft radial vibration, thrust position, and axial displacement in high-speed steam turbines, compressors, and rotating machinery.',
    features: ['Non-contact eddy current measurement principle — no physical shaft contact', 'Measures shaft radial vibration amplitude and axial displacement', 'API 670 Standard compliant for machinery protection systems', 'Frequency response: DC to 10 kHz measurement bandwidth', 'Signal output: 4-20 mA (4-wire) or -24V DC voltage per driver', 'Probe measurement range: 0.25-2.5 mm (calibrated at 1.0 mm nominally)', 'Temperature: Probe -50 to +175 deg C; driver electronics -40 to +85 deg C', 'Sensitivity: 8 mV per µm standard calibration', 'Integral cable: Armoured stainless steel for harsh industrial environments'],
    specs: { 'Measurement Principle': 'Non-contact eddy current displacement', 'Standard Compliance': 'API 670 — Machinery Protection Systems', 'Frequency Response': 'DC to 10 kHz bandwidth', 'Signal Output': '4-20 mA or -24V DC (driver-dependent)', 'Sensitivity': '8 mV/µm (standard calibration)', 'Probe Gap Range': '0.25-2.5 mm (calibrated at 1.0 mm nominal)', 'Probe Temperature Rating': '-50 to +175 deg C', 'Cable Type': 'Armoured stainless steel' },
    images: ['vibration-probe-shinkawa-1.webp', 'vibration-probe-shinkawa-2.webp', 'vibration-probe-shinkawa-3.webp', 'vibration-probe-shinkawa-4.webp', 'vibration-probe-shinkawa-5.webp', 'vibration-probe-shinkawa-6.webp']
  },
];

const MAX_PRODUCT_IMAGES = 6;
const buildExtraImageNames = (baseImage, totalCount) => {
  const dot = baseImage.lastIndexOf('.');
  if (dot <= 0) return [];
  const ext = baseImage.slice(dot);
  const root = baseImage.slice(0, dot).replace(/-\d+$/, '');
  return Array.from({ length: totalCount }, (_, i) => `${root}-${i + 1}${ext}`);
};

const PRODUCTS = RAW_PRODUCTS.map((product) => {
  const imgs = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  if (imgs.length >= MAX_PRODUCT_IMAGES) return { ...product, images: imgs.slice(0, MAX_PRODUCT_IMAGES) };
  if (imgs.length === 0) return { ...product, images: [] };
  const generated = buildExtraImageNames(imgs[0], MAX_PRODUCT_IMAGES);
  const merged = [...new Set([...imgs, ...generated])].slice(0, MAX_PRODUCT_IMAGES);
  return { ...product, images: merged };
});

const PRODUCT_CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

const INDUSTRIES = [
  {
    id: 'ind_1', title: 'Power Generation', Icon: Zap,
    color: 'from-yellow-500/20 to-amber-600/10', border: 'border-yellow-500/30', accent: 'text-yellow-500',
    // Upload this image to your /public folder — e.g. a photo of a power plant turbine hall
    image: 'industry-power-generation.webp',
    desc: 'Supplying critical overhauling services and OEM-compatible spares to thermal power plants operating steam turbines from 5 MW to 27 MW. Our ex-OEM engineers ensure maximum plant availability.',
    useCases: ['Steam turbine major and minor overhauling', 'Turbine erection and commissioning', 'Lube oil system flushing per ISO 4406:99', 'Rotor dynamic balancing and alignment', 'Emergency stop valve manufacturing', 'Filter elements and strainers supply'],
    turbines: '5 MW – 27 MW'
  },
  {
    id: 'ind_2', title: 'Sugar Mills & Distilleries', Icon: Factory,
    color: 'from-green-500/20 to-emerald-600/10', border: 'border-green-500/30', accent: 'text-green-500',
    // Upload a photo of a sugar mill or cane crushing plant
    image: 'industry-sugar-mills.webp',
    desc: "Serving India's sugar industry with specialized back-pressure steam turbine services. Scheduled overhauling during off-season and emergency breakdown support during crushing season.",
    useCases: ['Back-pressure turbine overhauling (inter-season)', 'Triveni and Belliss turbine specialist services', 'Carbon and graphite gland ring supply', 'Labyrinth packing manufacturing', 'Lube oil filtration products supply', 'Emergency 24x7 breakdown support'],
    turbines: 'Triveni, Belliss & Morcom, Maxwatt'
  },
  {
    id: 'ind_3', title: 'Paper & Pulp Mills', Icon: Layers,
    color: 'from-blue-500/20 to-cyan-600/10', border: 'border-blue-500/30', accent: 'text-blue-500',
    // Upload a photo of a paper mill or pulp processing facility
    image: 'industry-paper-mills.webp',
    desc: 'Paper mills operate steam turbines continuously and require precision maintenance to maintain uptime. We provide planned shutdown overhauling and critical spare components.',
    useCases: ['Continuous-operation turbine maintenance planning', 'Duplex basket strainer supply for process lines', 'Expansion joint and bellows supply', 'Turbine spares manufacturing to OEM standards', 'Machine alignment services', 'Vibration monitoring equipment supply'],
    turbines: 'Siemens, BHEL, Triveni'
  },
  {
    id: 'ind_4', title: 'Oil & Gas Industries', Icon: Droplets,
    color: 'from-orange-500/20 to-red-600/10', border: 'border-orange-500/30', accent: 'text-orange-500',
    // Upload a photo of an oil refinery or gas processing plant
    image: 'industry-oil-gas.webp',
    desc: 'Oil and gas facilities demand the highest standards of precision engineering for turbine-driven compressors and pumps. Our API-compliant products meet the stringent requirements of upstream and downstream facilities.',
    useCases: ['API 614-compliant lube oil filter elements', 'API 670-compliant vibration monitoring probes', 'PTFE-lined hose assemblies for chemical transfer', 'High-pressure hydraulic rubber hose assemblies', 'Babbitt bearing manufacturing for compressor trains', 'Dynamic balancing per ISO 1940/API 670'],
    turbines: 'Siemens, Man Turbo, KKK, ABB'
  },
  {
    id: 'ind_5', title: 'Petrochemical & Refineries', Icon: Activity,
    color: 'from-purple-500/20 to-violet-600/10', border: 'border-purple-500/30', accent: 'text-purple-500',
    // Upload a photo of a petrochemical complex or refinery at night
    image: 'industry-petrochemical.webp',
    desc: 'Petrochemical plants and refineries require specialized metallic expansion joints, high-performance strainers, and precision turbine spares capable of handling aggressive media at elevated temperatures.',
    useCases: ['Metallic bellows expansion joints (DN 15-12,000)', 'High-temperature PTFE filter and hose products', 'ASME-code strainers for process pipelines', 'Inconel and Hastelloy expansion bellows', 'Turbine steam path component manufacturing', 'High-pressure control valve manufacturing'],
    turbines: 'All major makes'
  },
  {
    id: 'ind_6', title: 'Agro & Food Processing', Icon: Shield,
    color: 'from-teal-500/20 to-cyan-600/10', border: 'border-teal-500/30', accent: 'text-teal-500',
    // Upload a photo of an agro-processing or food plant
    image: 'industry-agro-food.webp',
    desc: 'Agro-processing industries rely on steam for power generation and process heating. We supply filtration products, rubber components, and turbine maintenance services to keep agro-industrial steam systems running.',
    useCases: ['Steam turbine maintenance for agro co-gen plants', 'FDA-grade PTFE hose for food-grade transfer lines', 'Rubber expansion joints for pump connections', 'Anti-vibration mounts for machinery isolation', 'Tank breather filters for oil storage systems', 'Y-type strainers for process fluid lines'],
    turbines: 'Triveni, Maxwatt, Chola Turbo'
  },
  {
    id: 'ind_7', title: 'Cement & Construction', Icon: Building2,
    color: 'from-stone-500/20 to-gray-600/10', border: 'border-stone-500/30', accent: 'text-stone-400',
    image: 'industry-cement.webp',
    desc: 'Cement plants operate in some of the most abrasive and dust-laden environments in industry. Rotary kilns, ball mills, vertical roller mills, and compressors demand precision-grade filtration, sealing, and flexible piping solutions to sustain 24×7 continuous operation at 330+ days per year.',
    useCases: [
      'Lube oil filter elements for kiln gearbox & mill circulation systems',
      'Duplex basket strainers for cooling water & process pipelines',
      'Axial & universal metallic expansion joints for kiln exhaust ducts',
      'Rubber expansion joints for pump discharge & cooling tower piping',
      'Anti-vibration mounts for crusher, mill & compressor isolation',
      'SS corrugated hose assemblies for high-temp & abrasive media transfer',
      'Y-type & conical strainers for raw meal slurry lines',
      'Babbitt bearings for kiln support rollers & compressor trains',
    ],
    turbines: 'Kiln Drives · Ball Mills · VRMs · Compressors'
  },
];

// ─── GLOBAL CSS (injected once, never re-created) ────────────────────────
const MARQUEE_CSS = `
  /* ── Animations ── */
  @keyframes ke-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  .ke-marquee{animation:ke-marquee 80s linear infinite;display:flex;width:max-content;will-change:transform;contain:layout style}
  .ke-marquee-slow{animation:ke-marquee 160s linear infinite;display:flex;width:max-content;will-change:transform;contain:layout style}
  .ke-marquee:hover,.ke-marquee-slow:hover{animation-play-state:paused}
  .scrollbar-hide::-webkit-scrollbar{display:none}
  .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
  /* Keep content visible by default; JS reveal can still add .visible without hiding blocks */
  .lazy-section{opacity:1;transform:none;transition:opacity .55s ease,transform .55s ease}
  .lazy-section.visible{opacity:1;transform:none}

  @keyframes ke-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  .skeleton-shimmer{
    position:absolute;inset:0;z-index:0;
    background:linear-gradient(110deg,rgba(148,163,184,.18) 8%,rgba(226,232,240,.55) 18%,rgba(148,163,184,.18) 33%);
    background-size:200% 100%;
    animation:ke-shimmer 1.25s linear infinite;
  }
  .media-img{opacity:0;transition:opacity .35s ease}
  .media-img.is-loaded{opacity:1}

  /* font-display:swap prevents invisible-text Lighthouse warning */
  @font-face{font-family:'Barlow Condensed';font-style:normal;font-weight:600 900;font-display:swap;src:local('Barlow Condensed')}
  @font-face{font-family:'Barlow';font-style:normal;font-weight:400 900;font-display:swap;src:local('Barlow')}

  /* PERF: content-visibility on below-fold sections reduces render cost */
  .cv-auto{content-visibility:auto;contain-intrinsic-size:0 600px}

  /* PERF: image delivery - explicit dimensions prevent layout shifts */
  img{max-width:100%;height:auto;display:block}

  /* PERF: Reduce forced reflow - GPU-composited transforms only */
  .ke-marquee,.ke-marquee-slow{transform:translateZ(0);backface-visibility:hidden}

  /* PERF: paint containment on heavy sections reduces repaint area */
  section:not(.hero-section){contain:paint}

  /* Hero image mobile display fix */
  .hero-mobile-vignette{display:none}
  .hero-bg-img{opacity:0.90;object-position:center center}
  @media(max-width:767px){
    /* Paint image on the full hero section for consistent mobile coverage */
    .hero-section{
      background-image:url('hero-background.png');
      background-size:cover;
      background-position:center center;
      background-repeat:no-repeat;
    }
    .hero-bg-layer{display:none!important}
    .hero-desktop-grad{display:block!important}
    .hero-mobile-vignette{display:none!important}
    .hero-glow-orb{display:none!important}
    .hero-bottom-overlay{background:linear-gradient(to top,rgba(10,25,47,0.45),transparent)!important}
    /* Reduce main-thread work on mobile - limit expensive blur filters */
    .backdrop-blur-xl{backdrop-filter:blur(8px)!important;-webkit-backdrop-filter:blur(8px)!important}
  }

  /* Font visibility on mobile — only boost contrast inside dark sections, not globally */
  @media(max-width:640px){
    .bg-\\[\\#0A192F\\] .text-slate-400,.bg-slate-900 .text-slate-400,.bg-slate-800 .text-slate-400{color:#9ab1c8!important}
    .bg-\\[\\#0A192F\\] .text-slate-500,.bg-slate-900 .text-slate-500,.bg-slate-800 .text-slate-500{color:#7f97b0!important}
    p{font-size:max(15px,1em);line-height:1.65}
    .hero-h1{font-size:clamp(2.2rem,9vw,3.6rem)!important;line-height:1.08!important;text-shadow:0 2px 10px rgba(0,0,0,0.45)}
    .glass-hero p{color:#d0e4f5!important}
    .eyebrow-label{color:#60a5fa!important;letter-spacing:0.18em!important}
  }

  /* Centre section headings on mobile with targeted exceptions */
  @media(max-width:767px){
    section h1,section h2,section h3,
    main>div>h1,main>div>h2{text-align:center}
    .section-divider{margin-left:auto!important;margin-right:auto!important}
    nav[aria-label="Breadcrumb"] *,
    label,input,select,textarea,
    footer h3,footer li,footer p,
    address *,
    [role="tabpanel"] *,
    .keep-left,
    .keep-left h1,.keep-left h2,.keep-left h3{text-align:left!important}
    article .bg-white h2,article .bg-white p{text-align:left!important}
    .md\\:w-3\\/5 h2,.md\\:w-3\\/5 p,
    .lg\\:col-span-7 h1,.lg\\:col-span-7 p{text-align:left!important}
  }

  /* CLS-safe aspect-ratio containers */
  .product-img-wrap{aspect-ratio:1/1;contain:layout style;overflow:hidden}
  .service-img-wrap{aspect-ratio:4/3;contain:layout style;overflow:hidden}
  .product-card-img{aspect-ratio:400/192;width:100%;object-fit:cover}

  /* Tap targets and safe area on mobile */
  @media(max-width:767px){
    a[href],button{-webkit-tap-highlight-color:rgba(30,111,255,0.15);min-height:44px}
    .floating-buttons{padding-bottom:max(1.5rem,env(safe-area-inset-bottom,0px))}
  }

  /* Respect prefers-reduced-motion */
  @media(prefers-reduced-motion:reduce){
    .ke-marquee,.ke-marquee-slow{animation:none;transform:none}
    .lazy-section,.lazy-section.visible{opacity:1;transform:none;transition:none}
    *{transition-duration:0.01ms!important;animation-duration:0.01ms!important}
  }

  /* Consolidated reusable button patterns - reduces CSS payload */
  .btn-primary{background:#2563eb;color:#fff;font-weight:900;border-radius:0.75rem;transition:background 0.2s,transform 0.2s;display:inline-flex;align-items:center;justify-content:center;gap:0.5rem}
  .btn-primary:hover{background:#3b82f6;transform:translateY(-2px)}
  .btn-wa{background:#25D366;color:#fff;font-weight:900;border-radius:0.75rem;transition:background 0.2s;display:inline-flex;align-items:center;justify-content:center;gap:0.5rem}
  .btn-wa:hover{background:#1ebe5d}
  .card-hover{transition:box-shadow 0.3s,transform 0.3s,border-color 0.3s}
  .card-hover:hover{box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);transform:translateY(-4px)}
`;

// ─── LOCAL BUSINESS JSON-LD SCHEMA ────────────────────────────
const LOCAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: 'Keshav Enterprises',
  alternateName: 'Keshav Engg',
  description: 'Precision industrial turbine engineering — overhauling, reverse engineering, dynamic balancing, lube oil flushing, and OEM-compatible spares for steam turbines 5 kW to 27 MW. Serving power, sugar, paper, oil & gas, and petrochemical industries across India.',
  url: 'https://keshaventerprises.in',
  logo: 'https://keshaventerprises.in/keshav-logo.png',
  image: 'https://keshaventerprises.in/og-image.webp',
  telephone: ['+919149229448', '+916397363268'],
  email: 'ksengg007@gmail.com',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Bank Transfer, Cheque',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dayanand Nagar Gali No.2, Near Subash Ki Chakki',
    addressLocality: 'Shamli',
    addressRegion: 'Uttar Pradesh',
    postalCode: '247776',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.4476,
    longitude: 77.3003
  },
  openingHours: 'Mo-Sa 09:00-18:00',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00', closes: '18:00'
  },
  areaServed: [
    { '@type': 'Country', 'name': 'India' },
    { '@type': 'State', 'name': 'Uttar Pradesh' },
    { '@type': 'State', 'name': 'Punjab' },
    { '@type': 'State', 'name': 'Haryana' },
    { '@type': 'State', 'name': 'Maharashtra' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Industrial Turbine Engineering Services',
    itemListElement: [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Turbine Overhauling & Maintenance' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Precision Reverse Engineering' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Dynamic Balancing & Rotor Machining' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Lube Oil Flushing' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Machine Alignment' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Turbine Erection & Commissioning' } }
    ]
  },
  sameAs: [
    'https://www.indiamart.com/keshav-enterprises-shamli/',
    'https://www.linkedin.com/in/keshav-enterprises-825a473b8',
    'https://www.instagram.com/ksengg007',
    'https://x.com/ksengg007',
    'https://www.reddit.com/user/NoDragonfly4979/',
    'https://www.youtube.com/@ksengg007',
    'https://www.facebook.com/ksengg007'
  ],
  knowsAbout: [
    'Steam Turbine Maintenance', 'Turbine Reverse Engineering', 'Lube Oil Filtration',
    'Industrial Expansion Joints', 'Turbine Spares Manufacturing', 'Dynamic Balancing',
    'Triveni Turbines', 'Siemens Turbines', 'BHEL Turbines', 'Belliss and Morcom Turbines'
  ]
};

// ─── FAQ SCHEMA for Services/Contact pages ───────────────────
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What turbine makes does Keshav Enterprises service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keshav Enterprises services all major turbine makes including Triveni, Siemens, BHEL, Belliss & Morcom, Maxwatt, Man Turbo, Chola Turbo, DLF-Skoda, KKK, and ABB — covering turbines from 5 kW to 27 MW.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does Keshav Enterprises offer emergency turbine breakdown support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Keshav Enterprises provides 24×7 emergency turbine breakdown support with engineers stationed at multiple locations across India. Contact us on WhatsApp at +91 6397363268 for immediate assistance.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the power range of turbines Keshav Enterprises can overhaul?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keshav Enterprises handles steam turbines from 5 kW to 27 MW — both back-pressure and condensing types, horizontal and vertical, single and multi-stage.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can Keshav Enterprises reverse engineer obsolete turbine parts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Using 3D laser scanners, CMM coordinate measuring machines, and PMI material testing, Keshav Enterprises reverse engineers obsolete turbine components to exact OEM dimensional and material standards.'
      }
    },
    {
      '@type': 'Question',
      name: 'Where is Keshav Enterprises located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keshav Enterprises is located at Dayanand Nagar Gali No.2, Near Subash Ki Chakki, Shamli – 247776, Uttar Pradesh, India.'
      }
    }
  ]
};

// ─── UTILITY ──────────────────────────────────────────────────
const waMsg = (text) => `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;

const getCategoryIcon = (category) => {
  const cls = 'w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500';
  switch (category) {
    case 'Industrial Filtration': return <Filter className={cls} />;
    case 'Industrial Strainers': return <Droplets className={cls} />;
    case 'Expansion Joints': return <Layers className={cls} />;
    case 'Turbine Spares': return <Cog className={cls} />;
    case 'Flexible Hoses & Assemblies': return <Activity className={cls} />;
    case 'Industrial Rubber Products': return <Hexagon className={cls} />;
    case 'Electronic Equipments': return <Cpu className={cls} />;
    default: return <Settings className="w-16 h-16 text-slate-300" />;
  }
};

// ─── SEO HEAD (Accessibility + SEO Fix) ──────────────────────
// ─── SEO HEAD ─────────────────────────────────────────────────
// SITE_URL: Update this to your live domain once deployed
const SITE_URL = 'https://keshaventerprises.in';
const OG_IMAGE = `${SITE_URL}/og-image.webp`; // Upload a 1200x630 px og-image.webp to /public
const SITE_KEYWORDS = 'turbine maintenance India, steam turbine overhauling, turbine reverse engineering, industrial turbine spares, lube oil filter elements, expansion joints India, Triveni turbine service, BHEL turbine spares, turbine erection Uttar Pradesh, Shamli engineering';

const SEOHead = memo(({ title, description, schema, pageType, canonicalPath, publishedTime }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | Keshav Enterprises` : 'Keshav Enterprises | Industrial Turbine Engineering — Shamli, UP';
    const fullDesc = description || 'Precision turbine engineering, overhauling, reverse engineering, and OEM-compatible industrial spares — Keshav Enterprises, Shamli, UP, India.';
    const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL;

    document.title = fullTitle;

    const sm = (sel, attr, val, content) => {
      let t = document.querySelector(sel);
      if (!t) { t = document.createElement('meta'); t.setAttribute(attr, val); document.head.appendChild(t); }
      t.content = content;
    };
    const sl = (rel, href, attrs) => {
      const key = attrs?.as ? `link[rel="${rel}"][as="${attrs.as}"][href="${href}"]` : `link[rel="${rel}"][href="${href}"]`;
      let t = document.querySelector(key) || document.querySelector(`link[rel="${rel}"]${attrs?.as ? '' : ''}${!attrs?.as ? `[href="${href}"]` : ''}`);
      if (!t) { t = document.createElement('link'); t.rel = rel; document.head.appendChild(t); }
      t.href = href;
      if (attrs) Object.entries(attrs).forEach(([k, v]) => { if (k === 'crossorigin') t.crossOrigin = v; else t.setAttribute(k, v); });
    };

    // ── Core meta ──
    sm('meta[name="description"]', 'name', 'description', fullDesc);
    sm('meta[name="keywords"]', 'name', 'keywords', SITE_KEYWORDS);
    sm('meta[name="robots"]', 'name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    sm('meta[name="author"]', 'name', 'author', 'Keshav Enterprises');
    sm('meta[name="theme-color"]', 'name', 'theme-color', '#0A192F');

    // ── Canonical ──
    sl('canonical', canonical);

    // ── PERF: Network dependency tree fix — preconnect critical origins early ──
    // These tell the browser to establish TCP+TLS connections before HTML finishes parsing
    if (!document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {
      sl('preconnect', 'https://fonts.googleapis.com');
    }
    if (!document.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]')) {
      const pc = document.createElement('link');
      pc.rel = 'preconnect'; pc.href = 'https://fonts.gstatic.com'; pc.crossOrigin = '';
      document.head.appendChild(pc);
    }
    if (!document.querySelector('link[rel="dns-prefetch"][href="https://api.whatsapp.com"]')) {
      sl('dns-prefetch', 'https://api.whatsapp.com');
    }
    if (!document.querySelector('link[rel="dns-prefetch"][href="https://www.indiamart.com"]')) {
      sl('dns-prefetch', 'https://www.indiamart.com');
    }

    // ── PERF: LCP request discovery — preload hero image on homepage ──
    // Without this, the browser discovers the image only after CSS/JS parse
    if (!canonicalPath || canonicalPath === '/') {
      if (!document.querySelector('link[rel="preload"][as="image"]')) {
        const pl = document.createElement('link');
        pl.rel = 'preload'; pl.as = 'image'; pl.href = 'hero-background.png';
        pl.setAttribute('fetchPriority', 'high');
        pl.setAttribute('type', 'image/png');
        document.head.appendChild(pl);
      }
    }

    // ── Viewport meta ──
    if (!document.querySelector('meta[name="viewport"]')) {
      const vm = document.createElement('meta'); vm.name = 'viewport';
      vm.content = 'width=device-width, initial-scale=1, maximum-scale=5';
      document.head.appendChild(vm);
    }

    // ── Open Graph ──
    sm('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    sm('meta[property="og:description"]', 'property', 'og:description', fullDesc);
    sm('meta[property="og:type"]', 'property', 'og:type', pageType === 'article' ? 'article' : 'website');
    sm('meta[property="og:url"]', 'property', 'og:url', canonical);
    sm('meta[property="og:image"]', 'property', 'og:image', OG_IMAGE);
    sm('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    sm('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    sm('meta[property="og:image:alt"]', 'property', 'og:image:alt', 'Keshav Enterprises — Industrial Turbine Engineering, Shamli, UP');
    sm('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');
    sm('meta[property="og:site_name"]', 'property', 'og:site_name', 'Keshav Enterprises');
    if (pageType === 'article' && publishedTime) {
      sm('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
      sm('meta[property="article:author"]', 'property', 'article:author', 'Keshav Enterprises Engineering Team');
      sm('meta[property="article:section"]', 'property', 'article:section', 'Industrial Engineering');
    }

    // ── Twitter Card ──
    sm('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    sm('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    sm('meta[name="twitter:description"]', 'name', 'twitter:description', fullDesc);
    sm('meta[name="twitter:image"]', 'name', 'twitter:image', OG_IMAGE);
    sm('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', 'Keshav Enterprises — Industrial Turbine Engineering');

    // ── Geo ──
    sm('meta[name="geo.region"]', 'name', 'geo.region', 'IN-UP');
    sm('meta[name="geo.placename"]', 'name', 'geo.placename', 'Shamli, Uttar Pradesh');
    sm('meta[name="geo.position"]', 'name', 'geo.position', '29.4476;77.3003');
    sm('meta[name="ICBM"]', 'name', 'ICBM', '29.4476, 77.3003');

    // ── JSON-LD ──
    if (schema) {
      let ld = document.getElementById('ld-json');
      if (!ld) { ld = document.createElement('script'); ld.id = 'ld-json'; ld.type = 'application/ld+json'; document.head.appendChild(ld); }
      ld.textContent = JSON.stringify(schema);
    }
  }, [title, description, schema, pageType, canonicalPath, publishedTime]);
  return null;
});

// ─── BRAND LOGO ───────────────────────────────────────────────
const BrandLogo = memo(({ scrolled, forceWhite, navigate }) => {
  const [imgErr, setImgErr] = useState(false);
  const tc = forceWhite ? 'text-white' : (scrolled ? 'text-slate-900' : 'text-white');

  return (
    <a href="#/" onClick={e => { e.preventDefault(); navigate('/'); }} aria-label="Keshav Enterprises — Home"
      className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm">

      {/* HARD WRAPPER FIX */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 overflow-hidden rounded-lg flex items-center justify-center">
        {!imgErr
          ? <img src="keshav-logo.png" alt="Keshav Enterprises" width="48" height="48"
            className="w-full h-full object-contain group-hover:scale-105 ..."
            onError={() => setImgErr(true)} />
          : <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-blue-400/30">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
          </div>
        }
      </div>

      <div className={`font-black text-xl sm:text-2xl tracking-tight ${tc} flex items-center`}>
        KESHAV ENTERPRISES<span className="text-blue-500 ml-0.5" aria-hidden="true">.</span>
      </div>
    </a>
  );
});

const MakeInIndiaBadge = memo(() => {
  const [e, sE] = useState(false);
  return (
    <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl w-fit" role="img" aria-label="Make In India — Vocal For Local">
      {!e ? <img src="make-in-india.png" alt="Make In India" width="32" height="32" className="h-8 object-contain" onError={() => sE(true)} /> : <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"><Zap className="w-4 h-4 text-white" aria-hidden="true" /></div>}
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none uppercase tracking-widest">Make In India</span>
        <span className="text-white text-[11px] font-extrabold leading-none uppercase tracking-wider mt-1">Vocal For Local</span>
      </div>
    </div>
  );
});

const IndiaMartBadge = memo(() => {
  const [e, sE] = useState(false);
  return (
    <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer"
      aria-label="View Keshav Enterprises on IndiaMART — Verified Supplier 4.3/5 rating"
      className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl hover:bg-white/10 transition-colors group cursor-pointer w-fit">
      {!e ? <div className="h-8 bg-white rounded px-1.5 flex items-center justify-center"><img src="indiamart-logo.png" alt="IndiaMART" width="60" height="20" className="h-5 object-contain" onError={() => sE(true)} /></div>
        : <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" /></div>}
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none tracking-widest">IndiaMART Verified</span>
        <span className="text-yellow-400 text-[10px] font-extrabold leading-none uppercase tracking-wider mt-1.5" aria-label="4.3 out of 5 stars">
          ★★★★★ <span className="text-blue-200 ml-1.5 tracking-widest">4.3/5 RATING</span>
        </span>
      </div>
    </a>
  );
});

const MSMEBadge = memo(() => {
  const [e, sE] = useState(false);
  return (
    <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl w-fit" role="img" aria-label="MSME Registered — Udyam Certified Enterprise">
      {!e
        ? <img src="msme-logo.png" alt="MSME Udyam Registered" width="36" height="36" className="h-8 object-contain" onError={() => sE(true)} />
        : <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center"><Shield className="w-4 h-4 text-white" aria-hidden="true" /></div>
      }
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none uppercase tracking-widest">MSME Registered</span>
        <span className="text-green-300 text-[11px] font-extrabold leading-none uppercase tracking-wider mt-1">Udyam Certified</span>
      </div>
    </div>
  );
});

// ─── PRODUCT CARD (Memoized) ─────────────────────────────────
const ProductCard = memo(({ product, navigate }) => {
  const [imgErr, setImgErr] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const pImg = product.images?.[0];
  useEffect(() => { setImgErr(false); setImgLoaded(false); }, [pImg]);
  return (
    <article onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group flex flex-col h-full cursor-pointer outline-none focus-within:ring-4 focus-within:ring-blue-500/50">
      {/* Fixed-height image container prevents layout shift (CLS fix) */}
      <div className="h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0" style={{ minHeight: '12rem' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent z-10 group-hover:opacity-0 transition-opacity" aria-hidden="true" />
        <span className="absolute top-4 left-4 bg-white/95 text-slate-900 border border-slate-200 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded z-20 shadow-sm">{product.category}</span>
        {pImg && !imgErr
          ? <>
            {!imgLoaded && <div className="skeleton-shimmer" aria-hidden="true" />}
            <img src={pImg} alt={product.title}
            loading="lazy" decoding="async"
            width="400" height="192"
            fetchPriority="low"
            className={`media-img w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? 'is-loaded' : ''}`}
            style={{ aspectRatio: '400/192' }}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgErr(true); setImgLoaded(false); }} />
          </>
          : <div className="z-0 w-full h-full flex items-center justify-center bg-slate-100" aria-hidden="true">{getCategoryIcon(product.category)}</div>}
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
          <a href={`#/product/${product.id}`} onClick={e => { e.stopPropagation(); e.preventDefault(); navigate(`/product/${product.id}`); }} className="focus:outline-none focus-visible:underline">{product.title}</a>
        </h3>
        <p className="text-slate-600 font-medium text-sm md:text-base mb-6 leading-relaxed line-clamp-2">{product.desc}</p>
        <div className="mb-6 flex items-start bg-blue-50/50 p-4 rounded-lg border border-blue-100/50 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
          <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm text-slate-700 font-medium leading-relaxed line-clamp-2"><strong className="text-slate-900 font-bold">Application: </strong>{product.usage}</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-3 mt-auto pt-5 border-t border-slate-100">
          <a href={waMsg(`Hello KESHAV ENTERPRISES, I need a quotation for: ${product.title}.`)}
            target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            aria-label={`Request quote for ${product.title} via WhatsApp`}
            className="flex-1 bg-[#25D366] text-white flex items-center justify-center py-3.5 text-sm font-bold rounded-lg hover:bg-[#1ebe5d] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" /> RFQ / WhatsApp
          </a>
          <div className="flex-1 bg-slate-900 text-white flex items-center justify-center py-3.5 text-sm font-bold rounded-lg group-hover:bg-blue-600 transition-all pointer-events-none" aria-hidden="true">
            Technical Specs <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
});

// ─── NAVBAR ───────────────────────────────────────────────────
const Navbar = memo(({ currentPath, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [isOpen]);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, []);
  const isActive = useCallback((path) => {
    if (path === '/' && currentPath !== '/') return false;
    if (currentPath.startsWith('/product/') && path === '/products') return true;
    return currentPath.startsWith(path);
  }, [currentPath]);
  const handleNav = useCallback((path) => { navigate(path); setIsOpen(false); }, [navigate]);
  return (
    <nav ref={menuRef} role="navigation" aria-label="Main navigation"
      className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-3' : 'bg-[#0A192F] border-transparent py-5'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-[100] font-bold">Skip to main content</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <BrandLogo scrolled={scrolled} navigate={navigate} />
          <div className="hidden lg:flex space-x-6 items-center">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={`#${link.path}`}
                onClick={e => { e.preventDefault(); handleNav(link.path); }}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`py-2 text-sm font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:underline ${isActive(link.path) ? (scrolled ? 'text-blue-600' : 'text-blue-400') : (scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-300 hover:text-white')}`}>
                {link.name}
              </a>
            ))}
            <a href="#/contact" onClick={e => { e.preventDefault(); handleNav('/contact'); }}
              className="bg-blue-600 text-white px-7 py-2.5 rounded font-bold hover:bg-blue-500 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
              Get Quote
            </a>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen} aria-controls="mobile-nav"
              className={`p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              {isOpen ? <X className="h-7 w-7" aria-hidden="true" /> : <Menu className="h-7 w-7" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div id="mobile-nav" className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100" role="menu">
          <div className="px-4 py-6 space-y-2">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={`#${link.path}`} role="menuitem"
                onClick={e => { e.preventDefault(); handleNav(link.path); }}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`block w-full text-left px-5 py-4 rounded-xl text-lg font-black tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive(link.path) ? 'text-blue-600 bg-blue-50 border border-blue-100' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}>
                {link.name}
              </a>
            ))}
            <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to get a technical quote.')} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 bg-[#25D366] text-white px-5 py-4 rounded-xl text-lg font-black">
              <MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
});

// ─── FOOTER ───────────────────────────────────────────────────
const Footer = memo(({ navigate }) => (
  <footer className="bg-[#0A192F] text-slate-300 pt-20 pb-8 border-t-[8px] border-blue-600" role="contentinfo">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="mb-6"><BrandLogo scrolled={false} forceWhite={true} navigate={navigate} /></div>
          <p className="text-slate-300 font-medium text-sm leading-relaxed mb-8">20+ years of excellence in industrial turbine engineering, reverse engineering, and precision manufacturing. Delivering reliability to power, sugar, and process industries across India.</p>
          <div className="flex flex-col space-y-4 mt-6"><MakeInIndiaBadge /><IndiaMartBadge /><MSMEBadge /></div>
        </div>
        <nav aria-label="Footer quick links">
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Quick Links</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6" aria-hidden="true" />
          <ul className="space-y-4">
            {NAV_LINKS.map(link => (
              <li key={link.name}>
                <a href={`#${link.path}`} onClick={e => { e.preventDefault(); navigate(link.path); }}
                  className="text-slate-300 font-medium hover:text-white hover:translate-x-1 transition-all flex items-center text-sm focus:outline-none focus-visible:underline">
                  <ChevronRight className="w-4 h-4 mr-2 text-blue-500" aria-hidden="true" /> {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Our Services</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6" aria-hidden="true" />
          <ul className="space-y-4">
            {['Overhauling & Maintenance', 'Reverse Engineering', 'Turbine Erection', 'Spares Manufacturing', 'Dynamic Balancing', 'Lube Oil Flushing'].map(s => (
              <li key={s} className="text-slate-300 font-medium text-sm flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-500 shrink-0" aria-hidden="true" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Contact Us</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6" aria-hidden="true" />
          <address className="not-italic">
            <ul className="space-y-6">
              <li className="flex items-start"><MapPin className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" aria-hidden="true" /><span className="text-slate-300 font-medium text-sm leading-relaxed">{CONTACT_INFO.address}</span></li>
              <li className="flex items-start">
                <div className="text-sm space-y-2 w-full">
                  {CONTACT_INFO.phones.map(p => (
                    <div key={p} className="flex items-center gap-2 group/phone">
                      <a href={`tel:${p.replace(/\s/g, '')}`}
                        className="flex items-center gap-2.5 flex-1 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 rounded-xl px-4 py-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                        <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                        <span className="text-slate-200 font-semibold tracking-wide">{p}</span>
                        <span className="ml-auto text-[10px] text-blue-400 font-black uppercase tracking-widest opacity-0 group-hover/phone:opacity-100 transition-opacity">Tap to Call</span>
                      </a>
                      <CopyBtn text={p} />
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-sm space-y-2 w-full">
                  {[
                    { addr: CONTACT_INFO.email, label: 'General' },
                    { addr: CONTACT_INFO.infoEmail, label: 'Info' },
                    { addr: CONTACT_INFO.marketingEmail, label: 'Sales' },
                  ].map(({ addr, label }) => (
                    <div key={addr} className="flex items-center gap-2 group/mail">
                      <a href={`mailto:${addr}`}
                        className="flex items-center gap-2.5 flex-1 min-w-0 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 rounded-xl px-4 py-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                        <Mail className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                        <span className="text-slate-200 font-semibold truncate">{addr}</span>
                        <span className="ml-auto shrink-0 text-[10px] text-blue-400 font-black uppercase tracking-widest bg-blue-900/40 px-2 py-0.5 rounded-full">{label}</span>
                      </a>
                      <CopyBtn text={addr} />
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </address>
        </div>
      </div>
      {/* ── Social Media + Copyright Bar ── */}
      <div className="border-t border-slate-700/60 pt-10 mb-8">
        {/* "Follow Us" heading */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.25em] mb-5">Connect With Us</p>
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">

            {/* ── LinkedIn Card ── */}
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer"
              aria-label={`Keshav Enterprises on LinkedIn — ${CONTACT_INFO.linkedinHandle}`}
              className="group relative flex items-center gap-4 bg-gradient-to-br from-[#0A66C2]/15 to-[#004182]/10 hover:from-[#0A66C2] hover:to-[#004182] border border-[#0A66C2]/30 hover:border-[#0A66C2] px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(10,102,194,0.5)] min-w-[220px] overflow-hidden">
              {/* Shine sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              {/* Logo box */}
              <div className="w-11 h-11 bg-[#0A66C2] rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-[0_0_15px_rgba(10,102,194,0.6)] transition-shadow">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              {/* Text */}
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-[#4FA3F7] group-hover:text-blue-200 uppercase tracking-[0.2em] leading-none mb-1 transition-colors">LinkedIn</span>
                <span className="text-base font-black text-white leading-tight truncate">{CONTACT_INFO.linkedinHandle}</span>
                <span className="text-[10px] text-slate-300 group-hover:text-blue-200/70 font-medium transition-colors mt-0.5">View Profile →</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white/60 transition-colors ml-auto shrink-0" aria-hidden="true" />
            </a>

            {/* ── Instagram Card ── */}
            <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer"
              aria-label={`Keshav Enterprises on Instagram — ${CONTACT_INFO.instagramHandle}`}
              className="group relative flex items-center gap-4 bg-gradient-to-br from-[#E1306C]/15 via-[#833ab4]/10 to-[#fcb045]/10 hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] border border-[#E1306C]/30 hover:border-transparent px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(225,48,108,0.45)] min-w-[220px] overflow-hidden">
              {/* Shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              {/* Logo box — Instagram gradient */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg flex-shrink-0 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] group-hover:shadow-[0_0_15px_rgba(225,48,108,0.6)] transition-shadow">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              {/* Text */}
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-[#f472b6] group-hover:text-pink-100 uppercase tracking-[0.2em] leading-none mb-1 transition-colors">Instagram</span>
                <span className="text-base font-black text-white leading-tight truncate">{CONTACT_INFO.instagramHandle}</span>
                <span className="text-[10px] text-slate-300 group-hover:text-pink-100/70 font-medium transition-colors mt-0.5">View Profile →</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white/60 transition-colors ml-auto shrink-0" aria-hidden="true" />
            </a>

            {/* ── Reddit Card ── */}
            <a href={CONTACT_INFO.reddit} target="_blank" rel="noopener noreferrer"
              aria-label={`Keshav Enterprises on Reddit — ${CONTACT_INFO.redditHandle}`}
              className="group relative flex items-center gap-4 bg-gradient-to-br from-[#FF4500]/15 to-[#FF6A33]/10 hover:from-[#FF4500] hover:to-[#FF6A33] border border-[#FF4500]/30 hover:border-[#FF4500] px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,69,0,0.45)] min-w-[220px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <div className="w-11 h-11 bg-[#FF4500] rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-[0_0_15px_rgba(255,69,0,0.6)] transition-shadow">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.2 15.6c-.5.5-1.3.5-1.8 0-.4-.5-.4-1.3 0-1.8.5-.5 1.3-.5 1.8 0 .5.5.5 1.3 0 1.8zm-4.4 0c-.5.5-1.3.5-1.8 0-.5-.5-.5-1.3 0-1.8.5-.5 1.3-.5 1.8 0 .5.5.5 1.3 0 1.8zm4.4-7.5 2.2.5c.1 0 .2 0 .3-.1l1.5-1.5c.5-.5.5-1.3 0-1.8s-1.3-.5-1.8 0l-1 1-1.5-.3c-1-.7-2.3-1.1-3.6-1.1-3.5 0-6.4 2.3-7.5 5.5H1.5C.7 10.3 0 11 0 11.8v.4c0 .8.7 1.5 1.5 1.5h1c.5 3.8 3.8 6.7 7.8 6.7s7.3-2.9 7.8-6.7h1c.8 0 1.5-.7 1.5-1.5v-.4c0-.8-.7-1.5-1.5-1.5h-1.2c-.5-1-1.2-1.8-2-2.5z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-[#ffb08f] group-hover:text-orange-100 uppercase tracking-[0.2em] leading-none mb-1 transition-colors">Reddit</span>
                <span className="text-base font-black text-white leading-tight truncate">{CONTACT_INFO.redditHandle}</span>
                <span className="text-[10px] text-slate-300 group-hover:text-orange-100/70 font-medium transition-colors mt-0.5">View Profile →</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white/60 transition-colors ml-auto shrink-0" aria-hidden="true" />
            </a>

            {/* ── YouTube Card ── */}
            <a href={CONTACT_INFO.youtube} target="_blank" rel="noopener noreferrer"
              aria-label={`Keshav Enterprises on YouTube — ${CONTACT_INFO.youtubeHandle}`}
              className="group relative flex items-center gap-4 bg-gradient-to-br from-[#FF0000]/15 to-[#CC0000]/10 hover:from-[#FF0000] hover:to-[#CC0000] border border-[#FF0000]/30 hover:border-[#FF0000] px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,0,0,0.45)] min-w-[220px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <div className="w-11 h-11 bg-[#FF0000] rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-[0_0_15px_rgba(255,0,0,0.6)] transition-shadow">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-[#fca5a5] group-hover:text-red-100 uppercase tracking-[0.2em] leading-none mb-1 transition-colors">YouTube</span>
                <span className="text-base font-black text-white leading-tight truncate">{CONTACT_INFO.youtubeHandle}</span>
                <span className="text-[10px] text-slate-300 group-hover:text-red-100/70 font-medium transition-colors mt-0.5">View Channel →</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white/60 transition-colors ml-auto shrink-0" aria-hidden="true" />
            </a>

            {/* ── Facebook Card ── */}
            <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer"
              aria-label={`Keshav Enterprises on Facebook — ${CONTACT_INFO.facebookHandle}`}
              className="group relative flex items-center gap-4 bg-gradient-to-br from-[#1877F2]/15 to-[#145DBF]/10 hover:from-[#1877F2] hover:to-[#145DBF] border border-[#1877F2]/30 hover:border-[#1877F2] px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(24,119,242,0.45)] min-w-[220px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <div className="w-11 h-11 bg-[#1877F2] rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-[0_0_15px_rgba(24,119,242,0.6)] transition-shadow">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-[#93c5fd] group-hover:text-blue-100 uppercase tracking-[0.2em] leading-none mb-1 transition-colors">Facebook</span>
                <span className="text-base font-black text-white leading-tight truncate">{CONTACT_INFO.facebookHandle}</span>
                <span className="text-[10px] text-slate-300 group-hover:text-blue-100/70 font-medium transition-colors mt-0.5">View Page →</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white/60 transition-colors ml-auto shrink-0" aria-hidden="true" />
            </a>

            {/* ── Twitter / X Card ── */}
            <a href={CONTACT_INFO.twitter} target="_blank" rel="noopener noreferrer"
              aria-label={`Keshav Enterprises on X (Twitter) — ${CONTACT_INFO.twitterHandle}`}
              className="group relative flex items-center gap-4 bg-gradient-to-br from-slate-800/60 to-slate-900/40 hover:from-slate-900 hover:to-slate-800 border border-slate-600/30 hover:border-slate-400 px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] min-w-[220px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <div className="w-11 h-11 bg-slate-900 border border-slate-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-shadow">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-white uppercase tracking-[0.2em] leading-none mb-1 transition-colors">X (Twitter)</span>
                <span className="text-base font-black text-white leading-tight truncate">{CONTACT_INFO.twitterHandle}</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-200/70 font-medium transition-colors mt-0.5">View Profile →</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white/60 transition-colors ml-auto shrink-0" aria-hidden="true" />
            </a>

          </div>
        </div>

        {/* Copyright row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-slate-800/60">
          <p className="text-slate-500 font-medium text-sm">© 2026 KESHAV ENTERPRISES. GST: {CONTACT_INFO.gst}. All rights reserved.</p>
          <p className="text-slate-600 font-medium text-xs">Shamli, Uttar Pradesh, India — Power · Sugar · Process Industries</p>
        </div>
      </div>
    </div>
  </footer>
));

// ─── WHATSAPP + CALL FAB ─────────────────────────────────────
const FloatingButtons = memo(() => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <a href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g, '')}`}
      className="flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-full shadow-lg hover:bg-slate-50 hover:scale-105 transition-all group font-bold text-sm"
      aria-label={`Call Keshav Enterprises: ${CONTACT_INFO.phones[0]}`}>
      <Phone className="w-4 h-4 text-blue-600" aria-hidden="true" />
      <span className="hidden group-hover:block">{CONTACT_INFO.phones[0]}</span>
    </a>
    <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to request a technical quote.')}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat with Keshav Enterprises on WhatsApp"
      className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300 group relative">
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chat with an Engineer</span>
    </a>
  </div>
));

// ─── PRODUCT DETAIL PAGE ─────────────────────────────────────
const ProductDetailPage = ({ productId, navigate }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [imgErr, setImgErr] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [tab, setTab] = useState('specs');
  const product = useMemo(() => PRODUCTS.find(p => p.id === productId), [productId]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveImg(0); setImgErr(false); setImgLoaded(false); setTab('specs'); }, [productId]);
  useEffect(() => { setImgLoaded(false); setImgErr(false); }, [activeImg, productId]);
  const related = useMemo(() => product ? PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3) : [], [product]);
  const productSchema = useMemo(() => product ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.title,
        description: product.desc,
        category: product.category,
        brand: { '@type': 'Brand', name: 'Keshav Enterprises' },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'Keshav Enterprises' },
          priceCurrency: 'INR',
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR' }
        },
        manufacturer: { '@type': 'Organization', name: 'Keshav Enterprises', url: 'https://keshaventerprises.in' }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Products', item: 'https://keshaventerprises.in/#/products' },
          { '@type': 'ListItem', position: 2, name: product.category },
          { '@type': 'ListItem', position: 3, name: product.title, item: `https://keshaventerprises.in/#/product/${product.id}` }
        ]
      }
    ]
  } : null, [product]);
  if (!product) return (
    <main id="main-content" className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center bg-slate-50">
      <SEOHead title="Product Not Found" />
      <div><Settings className="w-20 h-20 text-slate-300 mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Product Not Found</h1>
        <button onClick={() => navigate('/products')} className="text-blue-600 font-bold hover:underline text-lg">Return to Catalog</button>
      </div>
    </main>
  );
  const activeImage = product.images?.[activeImg];
  return (
    <main id="main-content" className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title={`${product.title} | ${product.category}`} description={`${product.desc} — Keshav Enterprises, Shamli, UP.`} schema={productSchema} canonicalPath={`/product/${product.id}`} pageType="website" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest flex-wrap gap-2">
          <button onClick={() => navigate('/products')} className="hover:text-blue-600 transition-colors flex items-center focus:outline-none focus-visible:underline">
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Catalog
          </button>
          <span aria-hidden="true" className="mx-1">/</span>
          <button onClick={() => navigate('/products')} className="hover:text-blue-600 transition-colors text-slate-400 focus:outline-none focus-visible:underline">{product.category}</button>
          <span aria-hidden="true" className="mx-1">/</span>
          <span className="text-slate-800 truncate max-w-[200px] md:max-w-full" aria-current="page">{product.title}</span>
        </nav>
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 lg:p-10 bg-white flex flex-col items-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden mb-6 shadow-inner"
                role="img" aria-label={`Product image of ${product.title}`}>
                {activeImage && !imgErr
                  ? <>
                    {!imgLoaded && <div className="skeleton-shimmer" aria-hidden="true" />}
                    <img src={activeImage} alt={`${product.title} view ${activeImg + 1}`}
                    loading="eager" decoding="async"
                    fetchPriority="high"
                    width="500" height="500"
                    style={{ aspectRatio: '1/1' }}
                    className={`media-img w-full h-full object-contain p-8 mix-blend-multiply ${imgLoaded ? 'is-loaded' : ''}`}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => { setImgErr(true); setImgLoaded(false); }} />
                  </>
                  : <div className="flex flex-col items-center justify-center opacity-30" aria-hidden="true">
                    {getCategoryIcon(product.category)}
                    <span className="mt-6 font-bold text-slate-500 uppercase tracking-widest text-sm">Image Pending</span>
                  </div>
                }
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-4 w-full overflow-x-auto pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="list" aria-label="Product thumbnails">
                  {product.images.map((img, idx) => (
                    <button key={idx} role="listitem"
                      onClick={() => { setActiveImg(idx); setImgErr(false); setImgLoaded(false); }}
                      aria-label={`View image ${idx + 1}`} aria-pressed={activeImg === idx}
                      className={`shrink-0 w-20 h-20 bg-white rounded-xl border-2 overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeImg === idx ? 'border-blue-600 shadow-lg scale-105' : 'border-slate-200 hover:border-blue-400 opacity-70 hover:opacity-100'}`}>
                      <img src={img} alt="" loading="lazy" width="80" height="80" className="w-full h-full object-cover p-2 mix-blend-multiply"
                        onError={e => { e.target.closest('button').style.display = 'none'; }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col bg-gradient-to-br from-white to-slate-50/50">
              <div className="mb-5"><span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-4 py-2 uppercase tracking-widest rounded-md shadow-sm">{product.category}</span></div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-5 leading-[1.1] tracking-tight">{product.title}</h1>
              <p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">{product.desc}</p>
              <div className="mb-8 bg-slate-900 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true"><Factory className="w-32 h-32 text-white" /></div>
                <div className="relative z-10">
                  <h2 className="font-black text-blue-400 text-sm uppercase tracking-widest mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-3" aria-hidden="true" /> Primary Industrial Application
                  </h2>
                  <p className="text-white font-medium text-base leading-relaxed">{product.usage}</p>
                </div>
              </div>
              <div role="tablist" aria-label="Product information" className="mb-6">
                <div className="flex border-b border-slate-200 mb-6 gap-1">
                  {[['specs', 'Technical Data'], ['features', 'Key Features']].map(([k, label]) => (
                    <button key={k} role="tab" id={`tab-${k}`} aria-controls={`panel-${k}`} aria-selected={tab === k}
                      onClick={() => setTab(k)}
                      className={`px-5 py-3 text-sm font-black uppercase tracking-wider rounded-t-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${tab === k ? 'bg-blue-600 text-white border-b-2 border-blue-600 -mb-px' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                      {label}
                    </button>
                  ))}
                </div>
                <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
                  {tab === 'specs' && product.specs && (
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <caption className="sr-only">Technical specifications for {product.title}</caption>
                        <tbody className="divide-y divide-slate-100">
                          {Object.entries(product.specs).map(([k, v], i) => (
                            <tr key={i} className={`transition-colors hover:bg-blue-50/30 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                              <th scope="row" className="p-4 w-2/5 text-slate-500 font-black text-xs uppercase tracking-widest border-r border-slate-100 text-left">{k}</th>
                              <td className="p-4 text-slate-800 font-semibold text-sm leading-relaxed">{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {tab === 'features' && (
                    <ul className="border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
                      {product.features.map((f, i) => (
                        <li key={i} className="bg-white hover:bg-slate-50 transition-colors p-4 md:p-5 text-slate-800 font-medium text-sm flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 mr-4 shrink-0 mt-0.5" aria-hidden="true" />{f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="mt-auto pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-5">
                <a href={waMsg(`Hello KESHAV ENTERPRISES, I am interested in: *${product.title}*. Please share technical specs and quote.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white py-5 rounded-xl font-black text-lg hover:bg-[#1ebe5d] transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                  <MessageCircle className="w-6 h-6 mr-3" aria-hidden="true" /> Request Quote via WhatsApp
                </a>
                <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-white border-2 border-slate-900 text-slate-900 py-5 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-all shadow-sm hover:-translate-y-0.5 flex items-center justify-center tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                  <ExternalLink className="w-6 h-6 mr-3" aria-hidden="true" /> View on IndiaMART
                </a>
              </div>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-10">
            <h2 id="related-heading" className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Related Products in {product.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

// ─── FEATURED PRODUCTS STRIP ─────────────────────────────────
// rAF auto-scroll + seamless infinite loop + touch drag + nav arrows
const CARD_W = 296; // card width (w-72 = 288px) + gap (8px) ≈ 296px
const SPEED = 0.7; // px per animation frame (~42px/s at 60fps)

const FeaturedProductsStrip = memo(({ products, navigate }) => {
  const trackRef = useRef(null);   // scrollable div
  const rafRef = useRef(null);   // requestAnimationFrame id
  const isPaused = useRef(false);  // pause flag — ref so no re-render
  const isDragging = useRef(false);  // drag in progress
  const dragStartX = useRef(0);      // pointer x when drag began
  const dragStartSL = useRef(0);      // scrollLeft when drag began
  const resumeTimer = useRef(null);   // debounce timer for arrow resume
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // doubled list for seamless loop
  const doubled = useMemo(() => [...products, ...products], [products]);
  const halfW = useMemo(() => products.length * CARD_W, [products.length]);

  // ── rAF loop ─────────────────────────────────────────────────
  const tick = useCallback(() => {
    const el = trackRef.current;
    if (!el) { rafRef.current = requestAnimationFrame(tick); return; }
    if (!isPaused.current) {
      el.scrollLeft += SPEED;
      // seamless reset: when we've scrolled past the first copy, snap back
      if (el.scrollLeft >= halfW) el.scrollLeft -= halfW;
    }
    // update arrow visibility
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    rafRef.current = requestAnimationFrame(tick);
  }, [halfW]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); clearTimeout(resumeTimer.current); };
  }, [tick]);

  // ── Pause / resume helpers ────────────────────────────────────
  const pause = useCallback(() => { isPaused.current = true; }, []);
  const resume = useCallback(() => { isPaused.current = false; }, []);

  // ── Mouse drag ───────────────────────────────────────────────
  const onMouseDown = useCallback(e => {
    pause();
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartSL.current = trackRef.current?.scrollLeft ?? 0;
    // prevent text selection while dragging
    e.currentTarget.style.userSelect = 'none';
  }, [pause]);

  const onMouseMove = useCallback(e => {
    if (!isDragging.current) return;
    const delta = dragStartX.current - e.pageX;
    if (trackRef.current) trackRef.current.scrollLeft = dragStartSL.current + delta;
  }, []);

  const onMouseUp = useCallback(e => {
    isDragging.current = false;
    e.currentTarget.style.userSelect = '';
    resume();
  }, [resume]);

  const onMouseLeave = useCallback(e => {
    if (isDragging.current) {
      isDragging.current = false;
      e.currentTarget.style.userSelect = '';
    }
    resume();
  }, [resume]);

  const onMouseEnter = useCallback(() => { pause(); }, [pause]);

  // ── Touch drag ───────────────────────────────────────────────
  const onTouchStart = useCallback(e => {
    pause();
    isDragging.current = true;
    dragStartX.current = e.touches[0].pageX;
    dragStartSL.current = trackRef.current?.scrollLeft ?? 0;
  }, [pause]);

  const onTouchMove = useCallback(e => {
    if (!isDragging.current) return;
    const delta = dragStartX.current - e.touches[0].pageX;
    if (trackRef.current) trackRef.current.scrollLeft = dragStartSL.current + delta;
  }, []);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    resume();
  }, [resume]);

  // ── Nav arrow click ───────────────────────────────────────────
  // Pause while the smooth scroll animation plays, resume after 1.2 s
  const scrollBy = useCallback((dir) => {
    pause();
    clearTimeout(resumeTimer.current);
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * CARD_W * 3, behavior: 'smooth' });
    resumeTimer.current = setTimeout(resume, 1200);
  }, [pause, resume]);

  // ── Guard click from drag ─────────────────────────────────────
  // If the user dragged more than 6px, suppress the card click
  const guardClick = useCallback((cb) => (e) => {
    const dist = Math.abs((trackRef.current?.scrollLeft ?? 0) - dragStartSL.current);
    if (dist > 6) { e.stopPropagation(); e.preventDefault(); return; }
    cb(e);
  }, []);

  return (
    <section className="bg-slate-50 py-20 border-b border-slate-200 lazy-section" aria-labelledby="featured-products-heading">
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row justify-between items-end gap-6">
        <div>
          <h2 id="featured-products-heading" className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Featured Engineering Products
          </h2>
          <div className="section-divider w-20 h-1.5 bg-blue-600 rounded-full shadow-md" aria-hidden="true" />
        </div>
        <div className="flex items-center gap-4">
          {/* Nav arrows */}
          <div className="flex gap-2" aria-label="Scroll products">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${canLeft ? 'border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50' : 'border-slate-200 text-slate-300 cursor-not-allowed'}`}>
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${canRight ? 'border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50' : 'border-slate-200 text-slate-300 cursor-not-allowed'}`}>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="hidden sm:flex items-center font-black text-blue-600 hover:text-blue-800 transition-colors text-lg tracking-tight group focus:outline-none focus-visible:underline">
            View Complete Catalog
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Track ── */}
      <div className="relative">
        {/* Edge fade-out gradients */}
        <div className="absolute left-0 top-0 w-16 md:w-28 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 md:w-28 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Scrollable track — overflow hidden on section, auto here lets JS control scrollLeft */}
        <div
          ref={trackRef}
          className="flex gap-5 px-6 py-5 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="list"
          aria-label="Featured products — scroll to browse"
        >
          {doubled.map((product, i) => (
            <article
              key={`${product.id}-${i}`}
              role="listitem"
              onClick={guardClick(() => navigate(`/product/${product.id}`))}
              className="group flex flex-col shrink-0 w-64 md:w-72 bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              aria-label={product.title}>

              {/* Image — fixed height prevents CLS */}
              <div
                className="h-44 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0"
                style={{ minHeight: '11rem' }}>
                <span className="absolute top-3 left-3 bg-white/95 text-slate-900 border border-slate-200 text-[9px] font-black px-2.5 py-1 uppercase tracking-widest rounded z-20 shadow-sm pointer-events-none">
                  {product.category}
                </span>
                {product.images?.[0]
                  ? <img
                    src={product.images[0]}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width="288" height="176"
                    style={{ aspectRatio: '288/176' }}
                    className="w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                    onError={e => { e.target.style.display = 'none'; }} />
                  : <div className="z-0 w-full h-full flex items-center justify-center pointer-events-none" aria-hidden="true">
                    {getCategoryIcon(product.category)}
                  </div>}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col bg-white">
                <h3 className="text-base font-black text-slate-900 mb-1.5 leading-tight group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2 pointer-events-none">
                  {product.title}
                </h3>
                <p className="text-slate-500 font-medium text-xs leading-relaxed mb-4 line-clamp-2 flex-1 pointer-events-none">
                  {product.desc}
                </p>
                <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors pointer-events-none">
                    View Details
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 flex justify-center sm:hidden px-4">
        <button
          onClick={() => navigate('/products')}
          className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-md flex items-center justify-center text-base">
          View Complete Catalog <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
});

// ─── HOME PAGE ────────────────────────────────────────────────
const HomePage = ({ navigate }) => {
  const [loaded, setLoaded] = useState(false);
  const [heroErr, setHeroErr] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  const featuredProducts = useMemo(() => PRODUCTS, []);
  return (
    <main id="main-content" className="bg-white">
      <SEOHead title="Industrial Turbine Engineering & Spares — Shamli, UP" schema={LOCAL_SCHEMA} canonicalPath="/" pageType="website" />
      <style>{MARQUEE_CSS}</style>
      {/* Hero */}
      <section className="hero-section relative bg-[#0A192F] min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden" >
        <div className="hero-bg-layer absolute inset-0 z-0" aria-hidden="true">
          {!heroErr && <img src="hero-background.png" alt="" width="1920" height="1080"
            fetchPriority="high" loading="eager" decoding="async" sizes="100vw"
            className="hero-bg-img absolute inset-0 w-full h-full object-cover"
            onError={() => setHeroErr(true)} />
          }
          {/* Mobile: top+bottom vignette — image centre stays fully visible */}
          <div className="hero-mobile-vignette absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(10,25,47,0.55) 0%,rgba(10,25,47,0.10) 25%,rgba(10,25,47,0.10) 65%,rgba(10,25,47,0.80) 100%)' }}/>

          {/* Desktop: left-to-right fade for text panel readability */}
          <div className="hero-desktop-grad absolute inset-0 bg-gradient-to-r from-[#0A192F]/90 via-[#0A192F]/55 to-[#0A192F]/10" />

          {/* Bottom ground — both viewports */}
          <div className="hero-bottom-overlay absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-transparent z-10" />

          {/* Glow orbs — desktop only */}
          <div className="hero-glow-orb absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
          <div className="hero-glow-orb absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-3/5">
            <div className={`transform transition-all duration-1000 ease-out ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"><MakeInIndiaBadge /><IndiaMartBadge /></div>
              <h1 id="hero-heading" className="hero-h1 text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl text-center lg:text-left">
                Precision Engineering for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">Maximum Uptime.</span>
              </h1>
              <div className="glass-hero bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl border-l-4 border-l-cyan-400 p-5 mb-10 max-w-xl shadow-xl mx-auto lg:mx-0">
                <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed">
                  Complete overhauling &amp; maintenance, rapid reverse engineering, and OEM-compatible turbine spares for turbines from 5 kW to 27 MW. Trusted across India's power generation and process industries.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 justify-center lg:justify-start">
                <button onClick={() => navigate('/contact')}
                  className="bg-blue-600 text-white px-8 py-4 md:py-5 rounded-xl font-black hover:bg-blue-500 transition-all flex items-center justify-center text-lg md:text-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] group tracking-tight hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 min-h-[52px]">
                  Request Technical Quote <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </button>
                <a href={waMsg('Hi KESHAV ENTERPRISES, we have an emergency breakdown. Please assist immediately.')}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-white/5 text-white border border-white/20 px-8 py-4 md:py-5 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center text-lg backdrop-blur-md hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[52px]">
                  <LifeBuoy className="mr-3 w-6 h-6 text-cyan-400 shrink-0" aria-hidden="true" /> Emergency Breakdown
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 hidden lg:flex flex-col gap-6" aria-hidden="true">
            {[
              { delay: 'delay-300', label: 'Proven Experience', Icon: Shield, title: '5 kW – 27 MW', sub: 'Power range for erection, overhauling, and reverse engineering.' },
              { delay: 'delay-500', label: 'Technical Services', Icon: Wrench, title: 'Zero Downtime', sub: '24x7 emergency support & 10 OEM-compatible turbine brands covered.' },
              { delay: 'delay-700', label: 'Precision Products', Icon: Factory, title: 'OEM-Grade Spares', sub: '3D scanning, CMM & PMI for reverse-engineered ISO/API parts.' },
            ].map(({ delay, label, Icon, title, sub }, i) => (
              <div key={i} className={`bg-gradient-to-br from-[#0A192F]/80 to-slate-900/80 backdrop-blur-xl border border-white/10 p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 ${delay} hover:border-blue-400/40 hover:-translate-y-2 group ${i === 1 ? 'ml-12' : i === 2 ? 'ml-4' : ''} ${loaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-blue-300 text-xs font-black uppercase tracking-widest">{label}</div>
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white tracking-tighter mb-2">{title}</div>
                <div className="text-sm text-slate-400 font-medium">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* OEM Brands */}
      <section className="bg-white py-12 md:py-16 border-b border-slate-100 overflow-hidden lazy-section" aria-label="OEM-compatible brands">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <p className="text-center text-sm font-black text-slate-600 uppercase tracking-widest">OEM-Compatible &amp; Trusted By Industry Leaders</p>
        </div>
        <div className="relative w-full overflow-hidden flex items-center" aria-hidden="true">
          <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="ke-marquee gap-8 md:gap-16 px-4">
            {[...OEMS, ...OEMS].map((oem, i) => (
              <div key={i} className="flex items-center justify-center shrink-0 w-40 md:w-56 h-20 p-2">
                <img src={`${oem.toLowerCase().replace(/[^a-z0-9]/g, '-')}-logo.png`} alt={`${oem} logo`}
                  width="160" height="60" loading="lazy" decoding="async"
                  className="max-h-full max-w-full object-contain"
                  onError={e => { const p = e.target.parentElement; if (p) { e.target.style.display = 'none'; const fb = p.querySelector('.oem-fallback'); if (fb) fb.style.display = 'flex'; } }} />
                <div className="oem-fallback items-center justify-center space-x-3 w-full" style={{ display: 'none' }}>
                  <Factory className="w-8 h-8 text-slate-300 shrink-0" />
                  <span className="text-sm md:text-base font-black text-slate-700 tracking-widest uppercase truncate">{oem}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="bg-slate-900 py-12 md:py-14 border-b border-slate-800 lazy-section" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Company statistics</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { Icon: Clock, stat: '20+', label: 'Years Experience', sub: 'In turbine engineering' },
              { Icon: Settings, stat: '10+', label: 'OEM Brands', sub: 'Triveni, Siemens, BHEL & more' },
              { Icon: TrendingUp, stat: '27 MW', label: 'Max Turbine', sub: 'Upto 27M.W.' },
              { Icon: Users, stat: '24x7', label: 'Emergency Support', sub: 'Multi-location response' },
            ].map(({ Icon, stat, label, sub }, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <Icon className="w-6 h-6 text-blue-400" aria-hidden="true" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">{stat}</div>
                <div className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-xs text-slate-400 font-medium">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Featured Products Strip — rAF auto-scroll + touch drag + nav arrows ── */}
      <FeaturedProductsStrip products={featuredProducts} navigate={navigate} />
      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-200 cv-auto lazy-section" aria-labelledby="services-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="services-preview-heading" className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Technical Services</h2>
            <div className="section-divider w-24 h-1.5 bg-blue-600 rounded-full mx-auto mb-6" aria-hidden="true" />
            <p className="text-slate-600 font-medium text-xl max-w-3xl mx-auto leading-relaxed">End-to-end turbine lifecycle services from erection through overhauling to precision reverse engineering.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service => {
              const Icon = SERVICE_ICONS[service.id];
              return (
                <div key={service.id} className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">{service.desc}</p>
                  <button onClick={() => navigate('/services')} aria-label={`Learn more about ${service.title}`}
                    className="text-blue-600 font-bold text-sm flex items-center group-hover:gap-2 transition-all focus:outline-none focus-visible:underline">
                    Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate('/services')}
              className="bg-slate-900 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-600 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              View All Services <ArrowRight className="inline ml-3 w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
      {/* Capabilities */}
      <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200 cv-auto lazy-section" aria-labelledby="capabilities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h2 id="capabilities-heading" className="text-slate-900 text-4xl md:text-5xl font-black mb-6 tracking-tight">Precision Manufacturing.</h2>
            <div className="section-divider w-24 h-1.5 bg-blue-600 mb-8 rounded-full mx-auto md:mx-0" aria-hidden="true" />
            <p className="text-slate-600 font-medium text-xl mb-12 leading-relaxed">
              We manufacture high-tolerance turbine spares, industrial strainers, and metallic expansion bellows (DN 15 to DN 12,000). Using 3D laser scanning, CMM, and PMI testing, we recreate obsolete components to exact specifications, drastically reducing plant downtime.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left" aria-label="Manufacturing capabilities">
              {['Reduced lead times vs. OEM sourcing (Triveni, Siemens, BHEL)', 'Material upgrades: Duplex, Incoloy, Inconel, Titanium, Hastelloy', 'ISO/API standard dynamic balancing (50-2,000 kg capacity)', 'Custom expansion bellows (DN 15-12,000, up to 150 barg)', 'Filter elements per ISO 16889, API 614, ASME & EN standards', 'Lube oil systems per ISO 4406:99 cleanliness classification'].map((item, i) => (
                <li key={i} className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                  <Shield className="w-7 h-7 text-blue-500 mr-4 shrink-0" aria-hidden="true" />
                  <span className="text-slate-800 font-bold text-base leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-blue-600 py-20 lazy-section" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Ready to Get Started?</h2>
          <p className="text-blue-100 font-medium text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Talk to our engineering team about your specific turbine or plant requirements.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button onClick={() => navigate('/contact')}
              className="bg-white text-blue-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Request a Technical Quote
            </button>
            <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to discuss a project requirement.')} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-3 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300">
              <MessageCircle className="w-6 h-6" aria-hidden="true" /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

// ─── ABOUT PAGE ───────────────────────────────────────────────
const AboutPage = ({ navigate }) => {
  const milestones = [
    { year: '2000s', title: 'Foundation', desc: 'Founded in Shamli, UP as a specialist turbine maintenance outfit serving local sugar mills with hands-on overhauling expertise.' },
    { year: '2005', title: 'OEM Expertise', desc: 'Built a dedicated team of ex-OEM engineers from Triveni, BHEL, and Belliss & Morcom — enabling true like-for-like OEM maintenance standards.' },
    { year: '2010', title: 'Reverse Engineering', desc: 'Invested in 3D laser scanning and CMM equipment to offer in-house reverse engineering for obsolete turbine components with zero OEM dependency.' },
    { year: '2015', title: 'Product Range Expansion', desc: 'Launched a comprehensive industrial product line covering filtration, expansion joints, strainers, rubber products, and flexible hose assemblies.' },
    { year: '2020', title: 'ISO/API Balancing', desc: 'Commissioned dynamic balancing machines to ISO 1940 / API 670 standards — handling rotors from 50 to 2,000 kg.' },
    { year: '2026', title: 'Pan-India Reach', desc: 'Today serving power, sugar, paper, oil & gas, petrochemical, and agro industries across India with 24×7 emergency engineering support.' },
  ];
  const values = [
    { Icon: Shield, label: 'Engineering Integrity', text: 'Every component, every clearance, every dimension documented and verified. No shortcuts on safety-critical rotating equipment.' },
    { Icon: Target, label: 'OEM-Grade Standards', text: 'Ex-OEM engineers from Triveni, Siemens, BHEL, and ABB delivering maintenance at the same standard as the original manufacturer.' },
    { Icon: Zap, label: 'Innovation in Reverse Engineering', text: '3D scanning and PMI testing give clients access to obsolete spares without 12–18 month OEM lead times.' },
    { Icon: Users, label: 'Customer Uptime First', text: 'We measure success in plant availability. 24×7 emergency response because shutdowns do not follow business hours.' },
  ];
  return (
    <main id="main-content" className="pt-24 pb-20 bg-white min-h-screen">
      <SEOHead title="About Keshav Enterprises — 20+ Years of Turbine Engineering Excellence"
        description="Keshav Enterprises — 20+ years of industrial turbine engineering, reverse engineering, and OEM-compatible spare parts manufacturing from Shamli, UP, India."
        canonicalPath="/about" pageType="website" />

      {/* ── HERO BANNER — "OUR STORY" with background image ── */}
      <div className="bg-[#0A192F] text-white relative overflow-hidden">

        {/* About story background image — upload about-story-bg.webp to /public/
            Recommended: wide industrial turbine workshop/factory floor photo
            Size: 1920×900px, compressed WebP < 250KB
            Shows at 18% opacity — adds depth without competing with text */}
        <img
          src="about-story-bg.webp"
          alt=""
          aria-hidden="true"
          width="1920"
          height="900"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: 0.18, objectPosition: 'center 40%' }}
          onError={e => { e.target.style.display = 'none'; }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/70 to-[#0A192F]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-[#0A192F]/30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-0.5 bg-blue-400 rounded-full" />
                <span className="eyebrow-label text-blue-400 font-black text-xs uppercase tracking-[0.25em]">Our Story</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.0] tracking-tight mb-6">
                Two Decades of<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">Precision Engineering</span>
              </h1>
              <div className="section-divider w-20 h-0.5 bg-blue-500 mb-8 rounded-full" />
              <div className="glass-hero bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-blue-500 px-5 py-4 rounded-r-2xl mb-7">
                <p className="text-white text-lg font-bold leading-relaxed italic">
                  "Zero tolerance for plant downtime — that's not a slogan. It's the engineering standard every client holds us to."
                </p>
              </div>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                From a specialist turbine maintenance outfit in Shamli, Uttar Pradesh — to a trusted pan-India engineering partner for power plants, sugar mills, refineries, and process industries. Built on ex-OEM expertise from <strong className="text-white">Triveni, Siemens, BHEL, Man Turbo, KKK</strong> and ABB. Driven by one mandate: maximum uptime.
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Ex-OEM Engineers', '3D Laser Scanning', 'CMM Precision', '24×7 Response', 'IndiaMART TrustSeal', 'Make In India', 'MSME Registered'].map(tag => (
                  <span key={tag} className="bg-white/5 border border-blue-500/30 text-blue-200 text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/services')}
                  className="bg-blue-600 text-white px-7 py-3.5 rounded-xl font-black text-sm hover:bg-blue-500 transition-all flex items-center gap-2 group shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 min-h-[44px]">
                  Our Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
                <button onClick={() => navigate('/contact')}
                  className="bg-white/5 text-white border border-white/20 px-7 py-3.5 rounded-xl font-black text-sm hover:bg-white/10 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px]">
                  Contact Engineering Team
                </button>
              </div>
            </div>
            {/* Right — stat cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { stat: '20+', label: 'Years in Business', sub: 'Since 2000' },
                { stat: '10+', label: 'OEM Brands', sub: 'Triveni · Siemens · BHEL' },
                { stat: '27 MW', label: 'Max Turbine', sub: 'Upto 27M.W.' },
                { stat: '24×7', label: 'Emergency Support', sub: 'Multi-location engineers' },
              ].map(({ stat, label, sub }, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                  <div className="text-3xl font-black text-white tracking-tight mb-1">{stat}</div>
                  <div className="text-xs font-black text-blue-300 uppercase tracking-widest mb-1">{label}</div>
                  <div className="text-xs text-slate-400">{sub}</div>
                </div>
              ))}
              <div className="col-span-2 bg-blue-600/20 border border-blue-500/30 rounded-2xl p-5 flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-green-400 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-white font-black text-sm">IndiaMART TrustSeal Verified</div>
                  <div className="text-slate-400 text-xs mt-0.5">50+ buyer reviews · 4.3/5 rating</div>
                </div>
              </div>
              <div className="col-span-2 bg-green-700/20 border border-green-500/30 rounded-2xl p-5 flex items-center gap-4">
                <Shield className="w-8 h-8 text-green-400 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-white font-black text-sm">MSME Registered</div>
                  <div className="text-slate-400 text-xs mt-0.5">Udyam Certified Enterprise · Govt. of India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" aria-hidden="true" />
      </div>

      {/* Stats bar */}
      <div className="bg-blue-600 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '20+', label: 'Years in Business', sub: 'Since 2000' },
              { stat: '10+', label: 'OEM Brands Covered', sub: 'Triveni · Siemens · BHEL' },
              { stat: '27 MW', label: 'Max Turbine Handled', sub: 'Upto 27M.W.' },
              { stat: '24×7', label: 'Emergency Response', sub: 'Multi-location engineers' },
            ].map(({ stat, label, sub }, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight mb-0.5">{stat}</div>
                <div className="text-blue-100 text-xs font-black uppercase tracking-widest mb-0.5">{label}</div>
                <div className="text-blue-200/70 text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Company overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <span className="eyebrow-label text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">Who We Are</span>
            <h2 className="keep-left text-4xl font-black text-slate-900 tracking-tight mb-5">Engineering Partners for India's Industrial Backbone</h2>
            <div className="section-divider w-16 h-1 bg-blue-600 mb-6 rounded-full" />
            <div className="space-y-4 text-slate-600 text-base leading-relaxed keep-left">
              <p>Keshav Enterprises is a precision industrial engineering company headquartered in Shamli, Uttar Pradesh. For over two decades, we have provided specialist turbine maintenance, reverse engineering, and OEM-compatible spare parts to India's most demanding industrial sectors.</p>
              <p>Our engineering team includes ex-OEM specialists from Triveni, Siemens, BHEL, Belliss & Morcom, Man Turbo, KKK, and ABB — providing clients with the same level of technical expertise as the original equipment manufacturers, at a fraction of the lead time and cost.</p>
              <p>We cover steam turbines from 5 kW to 27 MW — back-pressure and condensing, horizontal and vertical, single and multi-stage. Our workshop is equipped with 3D laser scanners, CMM coordinate measuring machines, dynamic balancing machines (50–2,000 kg), and precision CNC lathes.</p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="keep-left font-black text-xl mb-4 tracking-tight">Core Capabilities</h3>
              <ul className="space-y-3">
                {[
                  'Turbine erection, commissioning, and turnkey overhauling',
                  'Precision reverse engineering using 3D laser scanning & CMM',
                  'Dynamic balancing to ISO 1940 / API 670 (50–2,000 kg)',
                  'Lube oil flushing per ISO 4406:99 cleanliness classification',
                  'Machine alignment using latest laser alignment technology',
                  'Manufacturing: filter elements, expansion joints, strainers',
                  'Turbine spares: bearings, seals, rotors, governors, valves',
                  '24×7 emergency breakdown response, multi-location engineers',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="keep-left font-black text-slate-900 text-base mb-1">Our Location</h3>
                  <p className="text-slate-600 text-sm leading-relaxed keep-left">{CONTACT_INFO.address}</p>
                  <p className="text-slate-500 text-xs mt-2 font-bold keep-left">GST: {CONTACT_INFO.gst}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="eyebrow-label text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">What Drives Us</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Core Values</h2>
            <div className="section-divider w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {values.map(({ Icon, label, text }, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all group text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                  <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <h3 className="font-black text-slate-900 text-base mb-3 tracking-tight">{label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="eyebrow-label text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">Our Journey</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Company Milestones</h2>
            <div className="section-divider w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" aria-hidden="true" />
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-200 rounded-full" aria-hidden="true" />
            <div className="space-y-10">
              {milestones.map(({ year, title, desc }, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md" style={{ top: '1.5rem' }} aria-hidden="true" />
                  <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all keep-left">
                      <span className="text-blue-600 text-2xl font-black block mb-1">{year}</span>
                      <h3 className="keep-left font-black text-slate-900 text-lg mb-2 tracking-tight">{title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OEM compatibility */}
        <div className="bg-[#0D1F3C] rounded-3xl p-10 md:p-16 text-center mb-12 relative overflow-hidden border border-blue-900/40">
          <div className="relative z-10">
            <span className="eyebrow-label text-blue-400 font-black text-xs uppercase tracking-[0.25em] mb-4 block">OEM Expertise</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              10+ OEM Brands.<br />One Engineering Partner.
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto mb-10 leading-relaxed">Our ex-OEM engineers have hands-on experience with all major turbine makes. No learning curve. Authoritative technical expertise from day one.</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {OEMS.map(oem => (
                <div key={oem} className="bg-[#152B50] hover:bg-blue-600 border border-blue-800/60 hover:border-blue-400 px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5">
                  <span className="text-white font-black text-sm uppercase tracking-widest whitespace-nowrap">{oem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-black text-slate-900 mb-4">Work With Our Team</h3>
          <p className="text-slate-600 text-base max-w-xl mx-auto mb-8">Whether you need emergency breakdown support, planned overhauling, or obsolete spare procurement — our engineers are ready.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/contact')} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black text-base hover:bg-blue-500 transition-all shadow-lg flex items-center justify-center gap-2 group">
              Contact Engineering Team <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-black text-base hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2 shadow-lg">
              <MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>

      </div>
    </main>
  );
};


// HOW TO UPDATE BLOGS:
// 1. Add a new object to this BLOG_POSTS array following the same structure
// 2. Set a unique id (e.g. 'post_4'), slug (url-friendly, e.g. 'my-new-post')
// 3. Fill in title, excerpt, content (supports paragraphs as array), tags, date, author
// 4. Save the file and redeploy — the new post appears automatically on /blog
const BLOG_POSTS = [
  {
    id: 'post_1',
    slug: 'steam-turbine-overhauling-checklist',
    title: 'The Complete Steam Turbine Overhauling Checklist for Plant Engineers',
    excerpt: 'A practical, step-by-step checklist covering pre-shutdown planning, inspection protocols, clearance recording, and post-overhaul commissioning for steam turbines up to 27 MW.',
    date: '2026-03-15',
    author: 'Keshav Enterprises Engineering Team',
    readTime: '8 min read',
    tags: ['Overhauling', 'Steam Turbines', 'Maintenance'],
    coverImage: 'blog-turbine-overhaul.webp',
    content: [
      { type: 'h2', text: 'Why a Structured Checklist Matters' },
      { type: 'p', text: 'Unplanned turbine shutdowns cost Indian power and sugar plants lakhs of rupees per hour. A structured overhauling checklist ensures nothing is missed during planned maintenance windows — reducing the risk of early failure after recommissioning and avoiding costly repeat shutdowns.' },
      { type: 'h2', text: '1. Pre-Shutdown Planning (4–6 Weeks Before)' },
      { type: 'p', text: 'Begin with a detailed scope of work covering all rotating equipment in the train. Inspect all stocked spare parts and generate a shortfall report. Order critical items — bearings, seals, labyrinth packings, carbon rings — with adequate lead time. Arrange for specialized tools: alignment laser, vibration analyser, dial indicators, and feeler gauges.' },
      { type: 'list', items: ['Confirm OEM clearance data for all turbine stages', 'Arrange lube oil flushing equipment (mobile centrifuge filter unit)', 'Book ex-OEM engineers if required for major overhaul', 'Prepare condition monitoring baseline readings (vibration, temperature, pressure)'] },
      { type: 'h2', text: '2. Shutdown & Isolation' },
      { type: 'p', text: 'Follow the OEM-specified shutdown procedure. Allow adequate cool-down time before breaking any flanges. Lock out / tag out all energy sources including steam, lube oil, condensate, and control air. Drain the lube oil system completely before disassembly.' },
      { type: 'h2', text: '3. Disassembly & Inspection' },
      { type: 'p', text: 'Record all clearances, gaps, and fits before removing components — these are essential for comparison with OEM specification and for detecting wear trends. Photograph every stage. Measure rotor run-out at journal, thrust collar, and coupling faces.' },
      { type: 'list', items: ['Bearing clearances (radial and axial)', 'Labyrinth seal diametral clearances', 'Coupling alignment offset and angularity', 'Carbon ring face condition and spring tension', 'Nozzle and diaphragm condition and throat dimensions', 'ESV seat and disc condition'] },
      { type: 'h2', text: '4. Workshop Repairs & Replacements' },
      { type: 'p', text: 'Send the rotor for journal grinding and dynamic balancing if run-out or vibration readings were outside tolerance. Replace carbon and graphite gland rings, labyrinth packings, and babbitt bearings as per condition report. All rotor balancing should be performed to ISO 1940 or API 670 standards.' },
      { type: 'h2', text: '5. Reassembly & Alignment' },
      { type: 'p', text: 'Reassemble in reverse order with new gaskets and fastener torque per OEM specifications. Perform final rotor alignment using laser alignment equipment — turbine to gearbox and gearbox to generator. Record all clearances post-assembly and confirm they are within OEM tolerance.' },
      { type: 'h2', text: '6. Lube Oil Flushing' },
      { type: 'p', text: 'Before commissioning, flush the lube oil system with a mobile centrifuge filter system targeting ISO 4406:99 cleanliness class 16/14/11 or better. Take oil samples before and after flushing and retain reports. Never commission a turbine without completing an oil flush — bearing failures from contaminated oil account for a significant portion of post-overhaul failures.' },
      { type: 'h2', text: '7. Commissioning & First Run' },
      { type: 'p', text: 'Follow the OEM pre-commissioning procedure step by step. Monitor vibration, bearing temperatures, and lube oil pressure continuously during the first run-up. Confirm ESV and governor operation. Fine-tune alignment if vibration levels are elevated. Document all commissioning readings for the plant maintenance record.' },
      { type: 'cta', text: 'Need expert overhauling engineers for your next planned shutdown? Our ex-OEM team covers Triveni, Siemens, BHEL, Belliss & Morcom, and more.' },
    ],
  },
  {
    id: 'post_2',
    slug: 'lube-oil-contamination-turbine-bearings',
    title: 'How Lube Oil Contamination Destroys Turbine Bearings — And How to Prevent It',
    excerpt: 'Water ingress, solid particles, and oxidation are the three leading causes of premature turbine bearing failure. Here is how to identify each contamination type and what filtration products to use to prevent damage.',
    date: '2026-02-28',
    author: 'Keshav Enterprises Engineering Team',
    readTime: '6 min read',
    tags: ['Lube Oil', 'Bearings', 'Filtration', 'Preventive Maintenance'],
    coverImage: 'blog-lube-oil.webp',
    content: [
      { type: 'h2', text: 'The Hidden Bearing Killer' },
      { type: 'p', text: 'Turbine babbitt bearings are precision components operating on a hydrodynamic oil film just a few microns thick. Any contamination of the lube oil system — solid particles, water, or degraded oil — destroys this film, leading to direct metal contact and accelerated wear. Studies show that over 70% of turbine bearing failures are lubrication-related.' },
      { type: 'h2', text: 'Contamination Type 1: Solid Particles' },
      { type: 'p', text: 'Particles above 10 microns can scratch bearing surfaces. Particles in the 1–10 micron range are most damaging — they enter the oil film clearance and cause three-body abrasion. Sources include post-construction debris, wear particles from gears, and dirt entering through tank breathers.' },
      { type: 'p', text: 'Solution: Install high-efficiency lube oil filter elements (ISO 16889, beta-ratio ≥200 at 10 microns) in the main filter housing. Use tank breather filter elements (3 VL glass fibre) to prevent ingestion of airborne particulates. Target system cleanliness: ISO 4406:99 Class 16/14/11 or better for turbine bearings.' },
      { type: 'h2', text: 'Contamination Type 2: Water Ingress' },
      { type: 'p', text: 'Water in lube oil causes hydrogen embrittlement of babbitt, promotes oxidation, and supports bacterial growth. Even 200 ppm of free water significantly reduces oil film strength. Sources include steam gland leaks, condensation in the tank, and cooler tube failures.' },
      { type: 'p', text: 'Solution: Install WaterSorp offline filter elements in the side-stream return line. These dual-function elements simultaneously remove solid particles and absorb free and emulsified water. Regular oil sampling (monthly) per ISO standards will detect water early.' },
      { type: 'h2', text: 'Contamination Type 3: Oil Oxidation & Degradation' },
      { type: 'p', text: 'High operating temperatures and the presence of metal catalysts cause turbine oil to oxidise, forming varnish deposits and acidic by-products. These deposits clog filter elements, stick to bearing surfaces, and accelerate wear.' },
      { type: 'p', text: 'Solution: Monitor acid number (AN) and viscosity trends. WaterSorp offline filtration extends oil life by removing the water and particles that catalyse oxidation. Plan oil changes before the acid number exceeds OEM limits.' },
      { type: 'list', items: ['Check filter differential pressure weekly — replace element at 3.5–4 bar ΔP', 'Inspect tank breather filter monthly', 'Conduct oil sampling every 30 days and trend results', 'Install WaterSorp elements if water contamination is detected', 'Flush the system with mobile centrifuge filter after any major repair'] },
      { type: 'cta', text: 'We supply ISO 16889-compliant lube oil filter elements compatible with Triveni, Siemens, BHEL, and all major turbine makes. Request a quote via WhatsApp.' },
    ],
  },
  {
    id: 'post_3',
    slug: 'reverse-engineering-turbine-spares-india',
    title: 'Reverse Engineering Turbine Spares: How We Recreate Obsolete Components in India',
    excerpt: 'When OEM spare parts are unavailable, have 18-month lead times, or are priced prohibitively, reverse engineering offers a reliable alternative. Here is the step-by-step process we use at Keshav Enterprises.',
    date: '2026-01-20',
    author: 'Keshav Enterprises Engineering Team',
    readTime: '7 min read',
    tags: ['Reverse Engineering', 'Turbine Spares', 'Manufacturing', '3D Scanning'],
    coverImage: 'blog-reverse-engineering.webp',
    content: [
      { type: 'h2', text: 'Why Reverse Engineer Turbine Parts?' },
      { type: 'p', text: 'Many Indian industrial plants operate turbines that are 20–40 years old. Original equipment manufacturers have discontinued certain models, merged with other companies, or simply stopped stocking spares for older machines. Lead times from overseas OEMs for machined components routinely exceed 12–18 months — unacceptable when a sugar mill has a fixed crushing season or a power plant has a contract penalty for each day offline.' },
      { type: 'h2', text: 'Step 1: Component Acquisition & Initial Assessment' },
      { type: 'p', text: 'We start with the worn or broken component itself — or the mating part if the original is beyond measurement. The component is cleaned and visually assessed to determine which surfaces are still measurable and which have been degraded by wear or damage.' },
      { type: 'h2', text: 'Step 2: 3D Laser Scanning & CMM Measurement' },
      { type: 'p', text: 'For complex profiles — rotor blades, nozzle blocks, diaphragms, governor components — we use a 3D laser scanner to capture the complete geometry as a point cloud. For simpler rotationally-symmetric parts — journal bearing housings, labyrinth ring grooves, seal rings — a coordinate measuring machine (CMM) captures critical dimensions with micron-level accuracy.' },
      { type: 'list', items: ['All critical dimensions recorded with tolerances', 'Concentricity and parallelism of mating faces checked', 'Thread forms, keyway depths, and interference fits measured', 'Surface finish specifications noted where measurable'] },
      { type: 'h2', text: 'Step 3: PMI Material Testing' },
      { type: 'p', text: 'Positive Material Identification (PMI) using portable X-ray fluorescence (XRF) or optical emission spectrometry identifies the exact alloy composition of the original component. This is critical — a rotor shaft in 12% Cr steel behaves very differently from a 1% Cr-Mo shaft. Getting the material wrong means the reverse-engineered part will fail prematurely.' },
      { type: 'h2', text: 'Step 4: Engineering Drawing Generation' },
      { type: 'p', text: 'From the scan data, CMM measurements, and material test results, our engineers generate a complete manufacturing drawing. This includes all dimensions with tolerances, surface finish specifications, pre- and post-heat treatment procedures, material specification, and inspection requirements.' },
      { type: 'h2', text: 'Step 5: Machining & Quality Control' },
      { type: 'p', text: 'Machining is performed in three stages: rough machining to near-final dimensions, heat treatment if required (stress relieving, quench and temper, nitriding), and final precision machining. Each stage is inspected against the engineering drawing. Rotors are dynamically balanced to ISO 1940 / API 670 standards before dispatch.' },
      { type: 'h2', text: 'Turbines We Cover' },
      { type: 'p', text: 'We have reverse-engineered components for steam turbines from 5 kW to 27 MW across all major makes: Triveni, Siemens, BHEL, Belliss & Morcom, Maxwatt, Man Turbo, Chola Turbo, DLF-Skoda, KKK, and ABB. Both back-pressure and condensing turbines, horizontal and vertical, single and multi-stage.' },
      { type: 'cta', text: 'Have an obsolete spare you need reverse-engineered? Send us a photo and your turbine details on WhatsApp — we will assess feasibility within 24 hours.' },
    ],
  },
];

// ─── BLOG LIST PAGE ────────────────────────────────────────────
const BlogPage = ({ navigate }) => (
  <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
    <SEOHead
      title="Engineering Blog — Turbine Maintenance & Industrial Insights"
      description="Technical articles on steam turbine overhauling, lube oil filtration, reverse engineering, and industrial maintenance best practices from Keshav Enterprises." canonicalPath="/blog" pageType="website" />
    <div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6">
          <BookOpen className="w-8 h-8 text-blue-400" aria-hidden="true" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">Engineering Blog</h1>
        <div className="section-divider w-24 h-1.5 bg-blue-500 mb-8 rounded-full" aria-hidden="true" />
        <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
          Technical insights on turbine maintenance, lube oil systems, reverse engineering, and industrial best practices — from our engineering team.
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Featured post */}
      {BLOG_POSTS.length > 0 && (
        <div className="mb-16 group cursor-pointer" onClick={() => navigate(`/blog/${BLOG_POSTS[0].slug}`)}>
          <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-300 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-72 lg:h-auto bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="skeleton-shimmer" aria-hidden="true" />
                <img src={BLOG_POSTS[0].coverImage} alt={BLOG_POSTS[0].title}
                  loading="eager" decoding="async" fetchPriority="high"
                  width="600" height="400"
                  style={{ aspectRatio: '600/400' }}
                  className="media-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onLoad={e => { e.currentTarget.classList.add('is-loaded'); }}
                  onError={e => { e.target.style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F]/80 to-blue-900/40 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/20" aria-hidden="true" />
                </div>
                <span className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest rounded-full shadow-lg">Featured</span>
              </div>
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-5">
                  {BLOG_POSTS[0].tags.map(tag => (
                    <span key={tag} className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                  <a href={`#/blog/${BLOG_POSTS[0].slug}`} onClick={e => { e.stopPropagation(); e.preventDefault(); navigate(`/blog/${BLOG_POSTS[0].slug}`); }} className="focus:outline-none focus-visible:underline">
                    {BLOG_POSTS[0].title}
                  </a>
                </h2>
                <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">{BLOG_POSTS[0].excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-slate-500 font-medium mb-8 flex-wrap">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" aria-hidden="true" />{new Date(BLOG_POSTS[0].date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" aria-hidden="true" />{BLOG_POSTS[0].readTime}</span>
                </div>
                <button onClick={() => navigate(`/blog/${BLOG_POSTS[0].slug}`)}
                  className="self-start bg-slate-900 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-sm flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                  Read Article <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
      {/* Remaining posts grid */}
      {BLOG_POSTS.length > 1 && (
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(1).map(post => (
              <article key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group cursor-pointer flex flex-col">
                <div className="h-52 bg-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
                  <div className="skeleton-shimmer" aria-hidden="true" />
                  <img src={post.coverImage} alt={post.title}
                    loading="lazy" decoding="async" fetchPriority="low"
                    width="400" height="208"
                    style={{ aspectRatio: '400/208' }}
                    className="media-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onLoad={e => { e.currentTarget.classList.add('is-loaded'); }}
                    onError={e => { e.target.style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F]/70 to-blue-900/30 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white/20" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                    <a href={`#/blog/${post.slug}`} onClick={e => { e.stopPropagation(); e.preventDefault(); navigate(`/blog/${post.slug}`); }} className="focus:outline-none focus-visible:underline">{post.title}</a>
                  </h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium flex-wrap">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />{new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />{post.readTime}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm">
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      {/* CTA */}
      <div className="mt-20 bg-slate-900 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-black text-white tracking-tight mb-4">Have a Technical Question?</h2>
        <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto mb-8">Our engineering team is available 24x7. Reach us on WhatsApp for immediate technical assistance or project quotes.</p>
        <a href={waMsg('Hi KESHAV ENTERPRISES, I read your blog and have a technical question.')} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-[#1ebe5d] transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300">
          <MessageCircle className="w-6 h-6" aria-hidden="true" /> Ask Our Engineers
        </a>
      </div>
    </div>
  </main>
);

// ─── BLOG POST PAGE ────────────────────────────────────────────
const BlogPostPage = ({ slug, navigate }) => {
  const post = useMemo(() => BLOG_POSTS.find(p => p.slug === slug), [slug]);
  const others = useMemo(() => post ? BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2) : [], [post]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [slug]);
  if (!post) return (
    <main id="main-content" className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center bg-slate-50">
      <SEOHead title="Post Not Found" />
      <div>
        <BookOpen className="w-20 h-20 text-slate-300 mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Post Not Found</h1>
        <button onClick={() => navigate('/blog')} className="text-blue-600 font-bold hover:underline text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Back to Blog</button>
      </div>
    </main>
  );
  const renderBlock = (block, i) => {
    switch (block.type) {
      case 'h2': return <h2 key={i} className="text-2xl md:text-3xl font-black text-slate-900 mt-12 mb-5 tracking-tight">{block.text}</h2>;
      case 'p': return <p key={i} className="text-slate-700 font-medium text-lg leading-relaxed mb-6">{block.text}</p>;
      case 'list': return (
        <ul key={i} className="mb-8 space-y-3">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-slate-700 font-medium text-base leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" aria-hidden="true" />{item}
            </li>
          ))}
        </ul>
      );
      case 'cta': return (
        <div key={i} className="my-10 bg-blue-600 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <p className="text-white font-bold text-lg leading-relaxed flex-1">{block.text}</p>
          <a href={waMsg(`Hi KESHAV ENTERPRISES, I read your article "${post.title}" and would like to know more.`)} target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-white text-blue-600 px-8 py-4 rounded-xl font-black hover:bg-blue-50 transition-all flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />WhatsApp Us
          </a>
        </div>
      );
      default: return null;
    }
  };
  return (
    <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title={post.title} description={post.excerpt} canonicalPath={`/blog/${post.slug}`} pageType="article" publishedTime={post.date} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest flex-wrap gap-2 pt-4">
          <button onClick={() => navigate('/blog')} className="hover:text-blue-600 transition-colors flex items-center focus:outline-none focus-visible:underline">
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />Blog
          </button>
          <span aria-hidden="true" className="mx-1">/</span>
          <span className="text-slate-800 truncate max-w-[250px] md:max-w-full normal-case" aria-current="page">{post.title}</span>
        </nav>
        {/* Hero */}
        <div className="h-72 md:h-96 bg-slate-900 rounded-3xl overflow-hidden mb-10 flex items-center justify-center relative">
          <div className="skeleton-shimmer" aria-hidden="true" />
          <img src={post.coverImage} alt={post.title}
            loading="eager" decoding="async" fetchPriority="high"
            width="896" height="384"
            style={{ aspectRatio: '896/384' }}
            className="media-img w-full h-full object-cover opacity-60"
            onLoad={e => { e.currentTarget.classList.add('is-loaded'); }}
            onError={e => { e.target.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">{post.title}</h1>
          </div>
        </div>
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium mb-10 pb-10 border-b border-slate-200">
          <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-500" aria-hidden="true" />{post.author}</span>
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" aria-hidden="true" />{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" aria-hidden="true" />{post.readTime}</span>
        </div>
        {/* Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-12">
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>
        {/* Share */}
        <div className="bg-slate-900 rounded-2xl p-8 mb-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-black text-white mb-2">Found this article useful?</h3>
            <p className="text-slate-400 font-medium text-sm">Share with your maintenance team or contact us for a technical consultation.</p>
          </div>
          <a href={waMsg(`Hi KESHAV ENTERPRISES, I read "${post.title}" on your website and would like to discuss.`)} target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] text-white px-8 py-4 rounded-xl font-black hover:bg-[#1ebe5d] transition-all flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />Discuss on WhatsApp
          </a>
        </div>
        {/* Related posts */}
        {others.length > 0 && (
          <section aria-labelledby="related-posts-heading">
            <h2 id="related-posts-heading" className="text-2xl font-black text-slate-900 mb-6 tracking-tight">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {others.map(op => (
                <article key={op.id} onClick={() => navigate(`/blog/${op.slug}`)}
                  className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {op.tags.slice(0, 2).map(t => <span key={t} className="bg-slate-100 text-slate-600 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">{t}</span>)}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    <a href={`#/blog/${op.slug}`} onClick={e => { e.stopPropagation(); e.preventDefault(); navigate(`/blog/${op.slug}`); }} className="focus:outline-none focus-visible:underline">{op.title}</a>
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2 mb-4">{op.excerpt}</p>
                  <span className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read Article <ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

// ─── SERVICES PAGE ────────────────────────────────────────────
const ServicesPage = ({ navigate }) => (
  <main id="main-content" className="pt-24 pb-20 bg-white">
    <SEOHead title="Turbine Services — Overhauling, Erection & Reverse Engineering"
      description="Complete turbine overhauling, reverse engineering, erection & commissioning, dynamic balancing, lube oil flushing, and machine alignment for steam turbines 5 kW to 27 MW." canonicalPath="/services" pageType="website" schema={FAQ_SCHEMA} />
    <div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">Technical Services</h1>
        <div className="section-divider w-24 h-1.5 bg-blue-500 mb-8 rounded-full" aria-hidden="true" />
        <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
          Specialized mechanical solutions for industrial rotating equipment from 5 kW to 27 MW. Ensuring peak reliability across power generation, sugar mills, paper mills, refineries, and petrochemical industries.
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-24 mt-12 cv-auto">
        {SERVICES.map((service, index) => {
          const Icon = SERVICE_ICONS[service.id];
          return (
            <div key={service.id} className={`flex flex-col md:flex-row gap-16 items-start group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-2/5 w-full shrink-0">
                {/* Service image card — sticky while scrolling on desktop */}
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 sticky top-28 relative bg-[#0A192F]">

                  {/* Full-size service photo at full opacity — upload to /public */}
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      width="560" height="420"
                      style={{ aspectRatio: '560/420' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  )}

                  {/* Dark fallback layer — visible only when no image */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true" />

                  {/* Bottom scrim — ensures OEM chips are always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-[#0A192F]/20 to-transparent z-10" />

                  {/* Top-left service label badge */}
                  <div className="absolute top-5 left-5 z-20">
                    <div className="flex items-center gap-3 bg-[#0A192F]/70 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl shadow-lg">
                      <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 shrink-0">
                        <Icon className="w-5 h-5 text-blue-400" aria-hidden="true" />
                      </div>
                      <span className="text-white font-black text-xs uppercase tracking-widest leading-tight">{service.title}</span>
                    </div>
                  </div>

                  {/* Fallback center icon — shows when no image uploaded yet */}
                  {!service.image && (
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20">
                        <Icon className="w-14 h-14 text-blue-400" aria-hidden="true" />
                      </div>
                    </div>
                  )}

                  {/* OEM chips at bottom */}
                  {service.oems && (
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5" aria-label={`OEM expertise: ${service.oems.join(', ')}`}>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">OEM Expertise</p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.oems.slice(0, 6).map(oem => (
                          <span key={oem} className="text-[10px] font-black text-slate-200 bg-slate-800/80 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wide border border-white/10">{oem}</span>
                        ))}
                        {service.oems.length > 6 && (
                          <span className="text-[10px] font-black text-blue-300 bg-blue-900/50 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wide border border-blue-500/20">+{service.oems.length - 6} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:w-3/5 w-full">
                <div className="text-blue-600 font-black tracking-widest text-sm uppercase mb-5 flex items-center" aria-hidden="true">
                  <span className="w-10 h-0.5 bg-blue-600 mr-4" /> Service {(index + 1).toString().padStart(2, '0')}
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{service.title}</h2>
                <p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">{service.desc}</p>
                <div className="mb-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 px-6 py-4">
                    <h3 className="font-black text-white text-sm uppercase tracking-widest">What We Deliver</h3>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start px-6 py-4 hover:bg-blue-50/30 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mr-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-slate-700 font-medium text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => navigate('/contact')} aria-label={`Inquire about ${service.title}`}
                  className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-colors shadow-sm hover:shadow-lg flex items-center group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                  Inquire About This Service <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </main>
);

// ─── PRODUCTS PAGE ────────────────────────────────────────────
const ProductsPage = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const handleScroll = useCallback(() => {
    if (!categoryScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
    setShowLeft(scrollLeft > 5);
    setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
  }, []);
  useEffect(() => {
    handleScroll();
    const t = setTimeout(handleScroll, 250);
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('resize', handleScroll); };
  }, [activeCategory, handleScroll]);
  const scrollCats = useCallback((dir) => {
    categoryScrollRef.current?.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
  }, []);
  // PERF FIX: useMemo for filtering
  const filtered = useMemo(() => PRODUCTS.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || (p.usage && p.usage.toLowerCase().includes(q)) || p.features.some(f => f.toLowerCase().includes(q));
  }), [activeCategory, searchQuery]);
  const counts = useMemo(() => PRODUCT_CATEGORIES.reduce((a, c) => { a[c] = c === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === c).length; return a; }, {}), []);
  return (
    <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title="Product Catalog — Turbine Spares, Filters, Expansion Joints"
        description={`${PRODUCTS.length} precision-engineered industrial products: turbine spares, filter elements, expansion joints, strainers, flexible hoses, rubber products, and electronic equipment.`} canonicalPath="/products" pageType="website" />
      <div className="bg-[#0A192F] text-white py-20 mb-12 relative overflow-hidden border-b-8 border-blue-600">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">Industrial Products</h1>
          <div className="section-divider w-20 h-1.5 bg-blue-500 mb-6 rounded-full" aria-hidden="true" />
          <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl leading-relaxed">{PRODUCTS.length} precision-engineered products across {PRODUCT_CATEGORIES.length - 1} categories. ISO/API/ASME compliant with full technical specifications.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6">
          <div className="relative w-full max-w-2xl mx-auto md:mx-0">
            <label htmlFor="product-search" className="sr-only">Search products by name, specification, or application</label>
            <input id="product-search" type="search" placeholder="Search products, specs, applications..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-md" />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400 pointer-events-none" aria-hidden="true" />
            {searchQuery && <button onClick={() => setSearchQuery('')} aria-label="Clear search" className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"><X className="w-5 h-5" aria-hidden="true" /></button>}
          </div>
          <div className="relative w-full flex items-center mt-2" role="group" aria-label="Filter by product category">
            {showLeft && (
              <div className="absolute left-0 top-0 bottom-6 w-20 md:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" aria-hidden="true" />
            )}
            <button onClick={() => scrollCats('left')} aria-label="Scroll categories left" className={`absolute left-1 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ChevronLeft className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" /></button>
            <div ref={categoryScrollRef} onScroll={handleScroll} style={{ scrollPaddingInline: '3.5rem' }} className="flex gap-3 overflow-x-auto w-full pb-6 pt-2 px-14 md:px-16 snap-x snap-mandatory scroll-smooth relative z-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {PRODUCT_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} aria-pressed={activeCategory === cat}
                  className={`snap-start shrink-0 px-5 py-3 rounded-full text-sm font-black whitespace-nowrap transition-all duration-300 border-2 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm'}`}>
                  {cat}<span className={`text-xs px-1.5 py-0.5 rounded-full font-black ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{counts[cat]}</span>
                </button>
              ))}
            </div>
            <button onClick={() => scrollCats('right')} aria-label="Scroll categories right" className={`absolute right-1 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ChevronRight className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" /></button>
            {showRight && (
              <div className="absolute right-0 top-0 bottom-6 w-20 md:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" aria-hidden="true" />
            )}
          </div>
          {(searchQuery || activeCategory !== 'All') && (
            <div className="flex items-center gap-3 -mt-2" role="status" aria-live="polite">
              <span className="text-sm font-bold text-slate-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</span>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors focus:outline-none focus-visible:underline"><X className="w-4 h-4" aria-hidden="true" />Clear filters</button>
            </div>
          )}
        </div>
        {filtered.length > 0
          ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" role="list" aria-label={`${filtered.length} products`}>
            {filtered.map(p => <div key={p.id} role="listitem"><ProductCard product={p} navigate={navigate} /></div>)}
          </div>
          : <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-300 shadow-sm" role="status">
            <Search className="w-20 h-20 text-slate-200 mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">No products found</h2>
            <p className="text-slate-500 font-medium text-lg">Try adjusting your search or category filter.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Clear all filters</button>
          </div>
        }
      </div>
    </main>
  );
};

// ─── COPY BUTTON (used in footer contact infographics) ───────────────
const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);
  return (
    <button onClick={handleCopy} aria-label={`Copy ${text}`}
      className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${copied ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-blue-500/40 hover:text-blue-400'}`}>
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

// ─── INDUSTRY DETAIL PAGE ─────────────────────────────────────────────
const INDUSTRY_DETAILS = {
  ind_1: {
    heroSub: 'Steam turbines from 5 MW to 27 MW — thermal, co-gen & captive power',
    overview: `India's thermal and captive power sector depends on the uninterrupted performance of steam turbines operating under continuous load. Keshav Enterprises has deep OEM-era expertise — our engineers were trained by turbine manufacturers before founding the company — giving us the ability to reverse-engineer, manufacture, and overhaul every major sub-system of a power plant steam turbine to OEM tolerances.`,
    challenges: [
      { title: 'Continuous High-Load Operation', desc: 'Steam turbines in power plants run at 3000–3600 RPM under sustained full-load conditions, placing extreme stress on bearings, seals, and rotating assemblies.' },
      { title: 'Lube Oil Contamination', desc: 'Particulate and water ingression into the lube oil system can rapidly degrade bearing surfaces. ISO 4406:99 cleanliness targets must be maintained continuously.' },
      { title: 'Thermal Expansion in Steam Lines', desc: 'High-temperature steam piping undergoes significant thermal cycling. Without properly engineered expansion joints, piping stress causes flange leaks and turbine nozzle damage.' },
      { title: 'Rotor Vibration & Balance Drift', desc: 'Deposit build-up and erosion cause progressive balance shift in rotors, increasing vibration and accelerating bearing wear if not caught early.' },
    ],
    products: [
      { name: 'Lube Oil Filter Elements (180 GPM)', purpose: 'Maintains ISO 4406:99 cleanliness in turbine lube oil systems, protecting journal bearings and thrust bearings from abrasive wear.', features: ['Glass fiber fleece VG media, 6–25 µm fineness', 'IS27 anti-static spec for synthetic oils', 'Triveni, Siemens, BHEL OEM compatible'] },
      { name: 'Steam Crossover Bellows', purpose: 'Absorbs thermal expansion between HP/LP turbine sections and the crossover pipe, eliminating stress transfer to turbine nozzle flanges.', features: ['High-cycle SS bellows, EJMA standard', 'Operating temp up to 550°C', 'Custom flanged ends to OEM dimensions'] },
      { name: 'Babbitt Journal & Thrust Bearings', purpose: 'White-metal lined bearings precisely machined to OEM profiles for turbine rotors — critical for shaft stability at high speed.', features: ['White metal (Babbitt) poured & precision-machined', 'All turbine makes: Triveni, Siemens, BHEL, KKK', 'Interference fit verified on CMM'] },
      { name: 'Emergency Stop Valves', purpose: 'Safety-critical valve that trips the turbine on overspeed or lube oil low pressure — manufactured to OEM trip pressure settings.', features: ['CNC machined body from EN8/EN19 forgings', 'Spring-loaded trip mechanism', 'Tested at 1.5× working pressure before dispatch'] },
      { name: 'Vibration Monitoring Probes (Shinkawa-compatible)', purpose: 'Proximity probes for continuous rotor vibration monitoring per API 670, enabling predictive maintenance before bearing failure occurs.', features: ['Shinkawa, Bently Nevada compatible', 'Eddy-current non-contact sensing', 'Alert and danger setpoints per API 670'] },
      { name: 'Turbine Oil Pumps (Main & Aux)', purpose: 'Supplies pressurized lube oil to all bearings. Auxiliary pump takes over during run-up and run-down when main shaft-driven pump output is insufficient.', features: ['Gear pump design, fitted to turbine skid', 'All major OEM dimensions available', 'Relief valve set to OEM pressure specification'] },
    ],
    keyFacts: ['27 MW maximum turbine capacity handled', '20+ years OEM-trained engineering experience', 'API 614 & ISO 4406:99 compliant products', '24×7 emergency breakdown support'],
  },
  ind_2: {
    heroSub: 'Back-pressure & extraction-condensing turbines in sugar & distillery co-gen',
    overview: `India's sugar industry runs intensive 150–180 day crushing seasons where turbine availability is directly tied to cane crushing throughput. Keshav Enterprises specialises in inter-season overhauling for back-pressure turbines — the workhorses of sugar co-generation — and provides 24×7 emergency spares support during the crushing season when shutdowns are most costly.`,
    challenges: [
      { title: 'Short Inter-Season Overhaul Window', desc: 'Turbines must be completely overhauled, parts replaced, and commissioned before the next crushing season starts — often a window of just 90–120 days.' },
      { title: 'Carbon & Gland Seal Wear', desc: 'Back-pressure turbines use carbon gland rings to prevent steam leakage. These wear continuously and require accurate replacement at every overhaul.' },
      { title: 'Molasses & Juice Contamination', desc: 'Process areas generate sticky airborne particulates. Breather filters and strainers on lube oil systems must be maintained to prevent contamination.' },
      { title: 'Emergency Season Breakdowns', desc: 'A turbine trip during peak crushing causes immediate cane pile-up. Emergency spares and rapid response can mean the difference between a 4-hour and 4-day stoppage.' },
    ],
    products: [
      { name: 'Carbon & Graphite Gland Sealing Rings', purpose: 'Prevents steam leakage past the turbine shaft at gland areas. Precision-machined to OEM shaft and housing dimensions.', features: ['High-purity carbon/graphite grades', 'All turbine makes: Triveni, Belliss & Morcom, Maxwatt', 'Machined in-house to ±0.01 mm tolerance'] },
      { name: 'Labyrinth Sealing Packings', purpose: 'Inter-stage and shaft-end labyrinth seals that reduce steam leakage between turbine stages, directly improving thermal efficiency.', features: ['SS, brass or monel material options', 'OEM tooth profile maintained', 'New or repaired strips fitted to existing housings'] },
      { name: 'Lube Oil Filter Elements (Triveni-compatible)', purpose: 'Ensures clean lube oil supply to turbine bearings throughout the crushing season, preventing bearing failures during critical production periods.', features: ['180 GPM flow rating', 'IS27 anti-static specification', 'Inter-season replacement recommended'] },
      { name: 'Air Breather Filters', purpose: 'Protects the lube oil reservoir from airborne dust and sugar particulates — critical in sugar mill environments where ambient dust loading is extreme.', features: ['Fine-mesh desiccant breather design', 'Prevents moisture and dust ingression', 'Visual saturation indicator'] },
      { name: 'Simplex & Duplex Basket Strainers', purpose: 'Installed in lube oil and cooling water circuits to catch debris before it reaches bearings and heat exchangers.', features: ['SS mesh baskets, cleanable and reusable', 'ANSI flanged or screwed ends', 'Duplex for zero-downtime strainer cleaning'] },
      { name: 'Rotor Balancing Service', purpose: 'Dynamic balancing of turbine rotors after re-blading or bearing replacement, restoring smooth operation within ISO 1940 G1.0 specification.', features: ['Dynamic balancing to ISO 1940/1 G1.0', 'Two-plane balancing on all rotor types', 'Balance certificate issued with job report'] },
    ],
    keyFacts: ['Triveni & Belliss turbine specialist services', '24×7 emergency season support', 'All carbon/graphite grades machined in-house', 'Inter-season overhauls completed within window'],
  },
  ind_3: {
    heroSub: 'Continuous-run turbines, expansion joints & process filtration for paper mills',
    overview: `Paper and pulp mills operate steam turbines around the clock, 350+ days per year, making planned maintenance windows extremely tight. The process also involves corrosive bleach, hot water, and high-pressure steam — all demanding filtration and sealing products rated for aggressive media. Keshav Enterprises supplies the complete range of products needed to keep paper mill steam and process systems running.`,
    challenges: [
      { title: 'Minimal Downtime Windows', desc: 'A paper machine shutdown costs lakhs per hour. Turbine overhauls must be planned months ahead and executed with zero rework — every component must be right the first time.' },
      { title: 'Corrosive Process Media', desc: 'Bleach, chlorinated compounds, and caustic process fluids attack standard materials. Filtration and hose products must use compatible media and seals.' },
      { title: 'High-Temperature Steam Piping', desc: 'Paper mill boilers generate high-pressure steam at 250–400°C. Steam piping expansion joints must handle both high temperature and cycle fatigue.' },
      { title: 'Vibration from Paper Machines', desc: 'High-speed paper machines generate continuous broadband vibration. Anti-vibration mounts and flexible hose connections are essential to isolate equipment.' },
    ],
    products: [
      { name: 'Duplex Basket Strainers', purpose: 'Installed on process water, white water, and cooling water lines. Duplex design allows basket cleaning without stopping flow — critical in continuous-run plants.', features: ['SS316 baskets for corrosive media', 'Plug cock bypass valve included', 'ANSI 150 to 600 flange ratings available'] },
      { name: 'SS Metallic Bellows Expansion Joints', purpose: 'Absorbs thermal expansion in high-pressure steam piping, pulp process lines, and bleach plant piping without transferring stress to equipment nozzles.', features: ['SS316L bellows for corrosion resistance', 'DN15 to DN1200 range', 'EJMA design standard, pressure tested'] },
      { name: 'Rubber Expansion Joints (Double-Arch)', purpose: 'Provides flexible connection on pump suction and discharge in water treatment, white water, and effluent systems — isolates pump vibration from piping.', features: ['Natural rubber or EPDM tube options', 'PN10/16 flanged ends', 'Up to 150°C service temperature'] },
      { name: 'PTFE-Lined Hose Assemblies', purpose: 'Chemical transfer hoses for bleach, caustic, and acid lines in the bleach plant — PTFE lining provides total resistance to aggressive process chemicals.', features: ['PTFE inner core, SS braid reinforcement', 'Full vacuum rated', 'EN14420-compliant end fittings'] },
      { name: 'Anti-Vibration Mounts', purpose: 'Resilient mounts fitted under paper machine drives, pumps, and turbine pedestals to isolate and dampen machinery vibration transmitted to the building structure.', features: ['Neoprene-steel sandwich design', 'Load range 50 kg to 5000 kg per mount', 'Frequency tuned to machine RPM'] },
      { name: 'Turbine Spares (Siemens, BHEL, Triveni)', purpose: 'OEM-equivalent turbine spares manufactured from certified materials for planned overhaul kits — nozzles, diaphragms, gland rings, and bearing housings.', features: ['Reverse-engineered from OEM drawings', 'Material certificates supplied', 'CMM dimensional inspection report'] },
    ],
    keyFacts: ['350+ days per year continuous operation supported', 'SS316L products for corrosive media', 'Zero-downtime duplex strainer solutions', 'Complete overhaul kits planned and supplied'],
  },
  ind_4: {
    heroSub: 'API 614-compliant filtration, Babbitt bearings & precision hose for oil & gas facilities',
    overview: `Upstream, midstream, and downstream oil and gas facilities operate turbine-driven compressors and pumps under some of the harshest conditions in industry. Every component in the lube oil and control oil system must meet API standards. Keshav Enterprises supplies API 614-compliant filter elements, Babbitt bearings, and precision-engineered hose assemblies qualified for use in hazardous-area equipment.`,
    challenges: [
      { title: 'API 614 Lube Oil System Compliance', desc: 'All lube oil system components for turbine-driven equipment in oil and gas must comply with API 614, specifying materials, cleanliness, and pressure ratings.' },
      { title: 'Hazardous Area Filtration', desc: 'Synthetic control oils in turbine control systems have low conductivity. Filter elements must carry IS27 anti-static specification to prevent electrostatic discharge.' },
      { title: 'High-Pressure Hose Integrity', desc: 'Hydraulic and instrument hose assemblies in oil and gas carry pressures up to 420 bar. Failure means spill and fire risk — zero compromise on quality or certification.' },
      { title: 'Remote Location Rapid Supply', desc: 'Offshore platforms and remote upstream facilities need fast spares supply. Critical spares held in stock and dispatched same day on emergency orders.' },
    ],
    products: [
      { name: 'Control Oil Filter Elements (IS27 Anti-Static)', purpose: 'For turbine electro-hydraulic control (EHC) systems using synthetic phosphate-ester or ester-based control oils with conductivity below 300 pS/m.', features: ['IS27 anti-static certification', 'Microglass VG media, 3–25 µm', 'Siemens, Man Turbo, KKK compatible'] },
      { name: 'Babbitt Bearing Manufacturing', purpose: 'Journal and thrust bearings for turbine-driven compressors and pumps, white-metal lined to precise profiles matching the original OEM bearing geometry.', features: ['White metal composition per ASTM B23', 'Precision-bored to <0.01 mm tolerance', 'All makes: Man Turbo, KKK, Siemens, ABB'] },
      { name: 'PTFE-Lined Hose Assemblies', purpose: 'Chemical and instrumentation hose for aggressive fluid transfer in oil and gas processing — resistant to crude oil, H2S, methanol, and inhibitors.', features: ['PTFE core, SS316 braid or stainless overbraid', 'Pressure rated to 420 bar (selected assemblies)', 'BS EN ISO 10380 compliant assemblies available'] },
      { name: 'Hydraulic Rubber Hose Assemblies', purpose: 'High-pressure hydraulic hose for control actuators, BOP systems, and hydraulic power units on drilling and processing equipment.', features: ['4-wire and 6-wire spiral construction', 'Working pressure up to 400 bar', 'Parker, Gates, Manuli-compatible fittings'] },
      { name: 'Duplex Fabricated Filter Housings', purpose: 'Custom-fabricated duplex filter vessels for lube oil and control oil systems, ASME code stamped for compliance with API 614 vessels requirements.', features: ['ASME Sec. VIII Div. 1 code stamped', 'Material: CS, SS304, SS316 per service', 'PED/CE certified for export projects'] },
      { name: 'Vibration Monitoring Probes', purpose: 'Proximity probes and monitoring systems compatible with API 670 turbomachinery protection systems for compressor and turbine trains.', features: ['Bently Nevada, Shinkawa-compatible', 'IP67 rated probe housing', 'Alert and danger relay outputs'] },
    ],
    keyFacts: ['API 614 & IS27 compliant products', 'Babbitt bearings for all major OEMs', 'Same-day emergency dispatch available', 'ASME code-stamped pressure vessels'],
  },
  ind_5: {
    heroSub: 'Metallic expansion joints, high-temp strainers & precision spares for refineries & petrochemical plants',
    overview: `Refineries and petrochemical complexes handle hydrocarbons, acids, and aggressive chemicals at extreme temperatures and pressures. Metallic expansion joints, process strainers, and precision turbine spares must withstand thermal cycling, corrosive media, and high-cycle fatigue. Keshav Enterprises manufactures these products to EJMA, ASME, and API standards for the most demanding refinery applications.`,
    challenges: [
      { title: 'Extreme Temperature Cycling', desc: 'Refinery steam cracking and distillation columns cycle between ambient and 600°C+ service temperatures. Expansion joints must survive millions of flex cycles without fatigue failure.' },
      { title: 'Corrosive & Hydrogen-Rich Media', desc: 'H2S, HF, amine solvents, and hydrogen service require Inconel, Hastelloy, or duplex stainless bellows — standard SS304/316 is insufficient.' },
      { title: 'ASME & API Code Compliance', desc: 'Pressure vessels, piping, and bellows in refineries must comply with ASME Sec. VIII and API codes. Third-party inspection and material traceability are mandatory.' },
      { title: 'FCCU Catalyst Erosion', desc: 'Fluid Catalytic Cracking Units carry entrained catalyst particles at 700°C+. Expansion joints in regenerator and reactor lines face extreme erosion and thermal shock.' },
    ],
    products: [
      { name: 'FCCU Expansion Joints', purpose: 'Purpose-designed for the extreme service conditions of regenerator-reactor transfer lines — high temperature, catalyst erosion, and thermal shock resistance.', features: ['Inconel 625 or 800HT bellows material', 'Refractory lined for catalyst service', 'Cycle-life analysis per EJMA 10th edition'] },
      { name: 'Axial & Universal Metallic Expansion Joints', purpose: 'Standard process line bellows for absorbing thermal expansion in crude oil, product, and steam piping throughout the refinery complex.', features: ['DN15 to DN12,000 manufacturing range', 'SS316L, Inconel, Hastelloy, Duplex SS grades', 'ASME Sec. VIII Div. 1 design code'] },
      { name: 'High-Pressure Simplex & Duplex Strainers', purpose: 'In-line strainers on crude oil charge lines, product transfer lines, and compressor suction piping to protect equipment from scale and debris.', features: ['ASME pressure vessel code design', 'Perforated plate + mesh basket construction', 'PN40 to PN160 pressure classes available'] },
      { name: 'Jacketed Expansion Joints', purpose: 'For heat-traced and cryogenic service piping where the process medium must be maintained at temperature — LNG, molten sulfur, and bitumen lines.', features: ['Inner bellows + outer jacket construction', 'Steam trace or electric trace connection ports', 'Cryogenic-grade SS321 option for LNG service'] },
      { name: 'Turbine Steam Path Components', purpose: 'Nozzle blocks, diaphragms, and blade carriers for turbine-driven compressor drives — manufactured from alloy steel to OEM profiles.', features: ['CNC machined from certified forgings', 'Material: Cr-Mo alloy steel, 17-4PH SS', 'Profile verified by 3D CMM measurement'] },
      { name: 'Pressure-Balanced Expansion Joints', purpose: 'Eliminates pressure thrust forces on sensitive equipment nozzles in high-pressure refinery service — protects compressor and pump flanges.', features: ['Tie-rod eliminated pressure thrust design', 'Reduces nozzle loads to near zero', 'Available in tied and untied configurations'] },
    ],
    keyFacts: ['Inconel, Hastelloy & duplex SS bellows', 'EJMA 10th edition design standard', 'ASME code pressure vessels & bellows', 'FCCU and extreme service specialists'],
  },
  ind_6: {
    heroSub: 'Steam turbine co-gen, filtration & rubber products for agro-processing facilities',
    overview: `Agro-processing — from rice milling and solvent extraction to dairy and food manufacturing — increasingly uses captive steam co-generation to reduce energy costs. These facilities need reliable turbine maintenance, food-grade hose and filter products, and vibration isolation solutions for sensitive processing machinery. Keshav Enterprises provides the full range of products and services needed across the agro-industrial sector.`,
    challenges: [
      { title: 'Food-Grade Material Requirements', desc: 'Hose, seals, and filtration in food contact areas must use FDA-approved materials — PTFE, food-grade EPDM, and stainless steel with polished surfaces.' },
      { title: 'Seasonal Load Variation', desc: 'Agro co-gen turbines see wide load variation with crop seasons. This leads to faster blade erosion and thermal cycling fatigue than in constant-load power plants.' },
      { title: 'Tank Breathing Contamination', desc: 'Edible oil storage tanks must be protected from airborne dust and moisture through the breather path — contamination affects product quality and shelf life.' },
      { title: 'Machinery Vibration in Food Plants', desc: 'Hammer mills, centrifuges, and packaging machinery transmit vibration to floors and adjacent equipment. Isolation is required to maintain hygienic connections.' },
    ],
    products: [
      { name: 'FDA-Grade PTFE Hose Assemblies', purpose: 'Flexible hose for food-grade fluid transfer — CIP/SIP chemical circulation, product lines, and steam injection in food-grade environments.', features: ['PTFE inner core, FDA 21 CFR 177.1550 compliant', 'Electro-polished SS316 end fittings', 'Tri-clover (sanitary) end connections available'] },
      { name: 'Air Breather & Tank Breather Filters', purpose: 'Protects edible oil storage tanks from dust and moisture ingression through the vent path — prevents contamination of stored product.', features: ['Desiccant silica gel + fine particulate media', 'Visual saturation colour indicator', 'Replacement cartridge design for easy servicing'] },
      { name: 'Y-Type & Conical Strainers', purpose: 'Inline strainers on process fluid lines, pump suction, and boiler feed water systems — protect equipment from scale and process debris.', features: ['SS mesh basket, mesh size 40 to 400 µm', 'Screwed or flanged connections', 'Simple inline cleanout without line break'] },
      { name: 'Rubber Anti-Vibration Mounts', purpose: 'Isolates vibration from hammer mills, centrifuges, compressors, and packaging machinery — protects both the machine and adjacent food processing areas.', features: ['Neoprene or natural rubber compound options', 'Conical, bobbin, and sandwich mount profiles', 'Rated load from 30 kg to 3000 kg per mount'] },
      { name: 'Rubber Expansion Joints (Single-Arch)', purpose: 'Flexible pump connector on cooling water, chilled water, and process water circuits — absorbs pump vibration and thermal movement.', features: ['EPDM or natural rubber tube', 'PN10/16 flanged, also screwed ends', 'Working temperature –20°C to +130°C'] },
      { name: 'Steam Turbine Maintenance (Triveni, Maxwatt)', purpose: 'Planned overhaul of agro co-gen back-pressure steam turbines — gland ring replacement, bearing inspection, and rotor balance check.', features: ['Inter-season overhaul scheduling', 'Carbon gland ring machined in-house', 'Trial run and vibration sign-off included'] },
    ],
    keyFacts: ['FDA 21 CFR compliant hose products', 'Agro co-gen turbine specialist', 'Tank breather filters for edible oil storage', 'Complete pump vibration isolation solutions'],
  },
  ind_7: {
    heroSub: 'Lube oil filtration, expansion joints, strainers & vibration isolation for cement plant machinery',
    overview: `Cement manufacturing is one of the most abrasive and dust-laden industrial environments on earth. Rotary kilns operating at 200–400°C shell temperature, ball mills running continuously for months, and crusher trains generating massive dust clouds place extreme demands on every lubrication, sealing, and piping component. Keshav Enterprises supplies the precision-grade filtration, expansion joints, and anti-vibration solutions that keep cement plants running at 330+ days per year.`,
    challenges: [
      { title: 'Extreme Dust & Abrasive Contamination', desc: 'Cement plants generate 1–3 tonnes of dust per day per kiln. This airborne abrasive enters lube oil systems, breather vents, and filter housings — accelerating wear and causing filter bypass if not properly managed.' },
      { title: 'Kiln Gearbox Oil Contamination', desc: 'Rotary kiln gearboxes operate on circulation lubrication systems at ISO VG 220–460. Clinker dust and thermal contamination degrade oil rapidly — high-efficiency filtration is critical to extending oil change intervals and protecting expensive gear sets.' },
      { title: 'Thermal Expansion in Kiln Exhaust Ducting', desc: 'Kiln exhaust gas ducts operate at 250–450°C and undergo significant thermal expansion. Without properly designed metallic or fabric expansion joints, duct sections crack, leak, and allow hot gas escape — a safety and efficiency hazard.' },
      { title: 'Crusher & Mill Vibration', desc: 'Ball mills, vertical roller mills, and jaw crushers generate intense broadband vibration that transmits through foundations to adjacent equipment and instrumentation, causing fatigue failures and measurement errors.' },
    ],
    products: [
      { name: 'Lube Oil Filter Elements (Kiln & Mill Gearboxes)', purpose: 'High-efficiency filter elements for kiln gearbox oil circulation systems — removes abrasive clinker particles and wear debris before they damage gear teeth and roller bearings.', features: ['Glass fiber fleece media, 6–25 µm fineness', 'High dirt-holding capacity for dust-laden environments', 'ISO VG 220–460 synthetic & mineral oil compatible', 'Beta efficiency ≥200 per ISO 16889'] },
      { name: 'Duplex Basket Strainers (Cooling Water & Process Lines)', purpose: 'Installed on kiln cooling water systems, compressor water cooling, and raw meal slurry pipelines to protect pumps, heat exchangers, and instrumentation from scale and debris.', features: ['SS mesh baskets, 100–1000 µm mesh options', 'Duplex design: zero-downtime basket cleaning', 'ANSI 150 to ANSI 600 flange ratings', 'SS316 for corrosive cooling water service'] },
      { name: 'Axial Metallic Expansion Joints (Kiln Exhaust Ducts)', purpose: 'Compensates thermal expansion in hot gas ductwork between the kiln, cyclone pre-heater tower, and waste heat boiler — eliminates thermally induced stress cracking in duct sections.', features: ['SS321 bellows for high-temperature service', 'Single and universal (dual-bellows) configurations', 'Flanged to match existing duct dimensions', 'Flow liner included to protect bellows from gas erosion'] },
      { name: 'Rectangular Non-Metallic (Fabric) Expansion Joints', purpose: 'Used in large rectangular ductwork at clinker cooler vent, raw mill fan connections, and electrostatic precipitator (ESP) ductwork — handles misalignment and thermal movement in non-circular sections.', features: ['PTFE-coated glass fabric or Nomex composite', 'Temperature capability to 450°C continuous', 'Custom-made to rectangular duct dimensions', 'Bolted frame assembly for on-site installation'] },
      { name: 'Rubber Anti-Vibration Mounts & Pads', purpose: 'Fitted under ball mill drive units, vertical roller mill gearboxes, and crusher bearing housings to isolate and attenuate machinery vibration transmitted to plant structures.', features: ['Natural rubber or neoprene compound', 'Sandwich, bobbin, and anti-vibration pad profiles', 'Load capacity from 200 kg to 10,000 kg per mount', 'Frequency-tuned to mill and crusher operating RPM'] },
      { name: 'Air Breather & Tank Breather Filters (Lube Oil Reservoirs)', purpose: 'Prevents airborne cement dust and moisture from entering lube oil reservoirs through the vent path — the leading cause of premature oil and bearing failure in cement plants.', features: ['High-efficiency particulate media + silica gel desiccant', 'Rated to ISO cleanliness requirements', 'Colour-change saturation indicator', 'Direct-mount and remote-mount configurations'] },
      { name: 'SS Corrugated Flexible Hose Assemblies', purpose: 'High-pressure flexible connections on kiln cooling water inlets, hydraulic slide gate actuators, and compressed air lines — resists heat, pressure, and vibration where rigid piping would fail.', features: ['SS316L corrugated inner hose, SS braid reinforcement', 'Working pressure to 200 bar (selected assemblies)', 'End fittings: ANSI flanged, BSP/NPT screwed, or hydraulic', 'Temperature range –196°C to +600°C'] },
      { name: 'Conical & Y-Type Strainers (Raw Mill & Conveyor Pumps)', purpose: 'Temporary and permanent strainers on raw material slurry pumps, kiln water spray systems, and compressed air supply lines — protect downstream valves and instruments.', features: ['Perforated basket, mesh lining available', 'Winged or screwed flush plug for cleaning', 'CS, SS304, SS316 body materials', 'In stock for rapid dispatch'] },
    ],
    keyFacts: ['330+ days/year continuous operation supported', 'Dust-resistant filtration products stocked', 'High-temp expansion joints up to 450°C', 'Complete vibration isolation solutions'],
  },
};

const IndustryDetailPage = ({ industryId, navigate }) => {
  const ind = INDUSTRIES.find(i => i.id === industryId);
  const detail = INDUSTRY_DETAILS[industryId];
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [industryId]);

  if (!ind || !detail) return (
    <main id="main-content" className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <Building2 className="w-20 h-20 text-slate-300 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-slate-900 mb-4">Industry Not Found</h1>
        <button onClick={() => navigate('/industries')} className="text-blue-600 font-bold hover:underline">Back to Industries</button>
      </div>
    </main>
  );

  const { Icon } = ind;
  return (
    <main id="main-content" className="bg-slate-50 min-h-screen">
      <SEOHead
        title={`${ind.title} | Industrial Solutions — Keshav Enterprises`}
        description={`${ind.desc} — Keshav Enterprises, Shamli, UP.`}
        canonicalPath={`/industry/${ind.id}`} pageType="website"
      />

      {/* ── Hero ── */}
      <div className="bg-[#0A192F] text-white pt-28 pb-20 relative overflow-hidden border-b-8 border-blue-600">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        {ind.image && (
          <img src={ind.image} alt="" aria-hidden="true" loading="eager"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            onError={e => { e.target.style.display = 'none'; }} />
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-10">
            <button onClick={() => navigate('/industries')} className="hover:text-blue-400 transition-colors flex items-center gap-1 focus:outline-none focus-visible:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> Industries
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <span className={ind.accent}>{ind.title}</span>
          </nav>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${ind.color} border ${ind.border} flex items-center justify-center shrink-0 shadow-2xl`}>
              <Icon className={`w-10 h-10 ${ind.accent}`} />
            </div>
            <div>
              <div className={`inline-block text-xs font-black ${ind.accent} uppercase tracking-widest mb-3 bg-white/5 px-3 py-1 rounded-full border border-white/10`}>Industry Focus</div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">{ind.title}</h1>
              <p className="text-slate-300 font-medium text-lg">{detail.heroSub}</p>
            </div>
          </div>
          {/* Key Facts Strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {detail.keyFacts.map((fact, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-200 font-semibold text-sm leading-snug">{fact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── Overview ── */}
        <section aria-label="Industry overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-1.5 h-8 rounded-full ${ind.accent.replace('text-', 'bg-')}`} />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Industry Overview</h2>
              </div>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">{detail.overview}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-5">Key Applications</h3>
              <ul className="space-y-3">
                {ind.useCases.slice(0, 6).map((uc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${ind.accent}`} />
                    <span className="text-slate-700 font-medium text-sm leading-snug">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Challenges ── */}
        <section aria-label="Industry challenges">
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-1.5 h-8 rounded-full ${ind.accent.replace('text-', 'bg-')}`} />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Key Challenges We Solve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {detail.challenges.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ind.color} border ${ind.border} flex items-center justify-center shrink-0`}>
                    <span className={`text-lg font-black ${ind.accent}`}>{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base mb-2">{c.title}</h3>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Products ── */}
        <section aria-label="Products we supply">
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-1.5 h-8 rounded-full ${ind.accent.replace('text-', 'bg-')}`} />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Products We Supply for {ind.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {detail.products.map((prod, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all group flex flex-col">
                <div className={`h-1.5 w-full rounded-t-2xl bg-gradient-to-r ${ind.color.replace('/20', '').replace('/10', '')} from-blue-600 to-blue-400`} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${ind.color} border ${ind.border} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Settings className={`w-4 h-4 ${ind.accent}`} />
                    </div>
                    <h3 className="font-black text-slate-900 text-base leading-snug">{prod.name}</h3>
                  </div>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed mb-5 flex-1">{prod.purpose}</p>
                  <ul className="space-y-1.5 mb-6">
                    {prod.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${ind.accent.replace('text-', 'bg-')}`} />
                        <span className="text-slate-600 text-xs font-semibold leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/products')}
                    className={`mt-auto text-xs font-black uppercase tracking-widest ${ind.accent} hover:underline flex items-center gap-1 focus:outline-none`}>
                    View in Catalog <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section aria-label="Get in touch" className="bg-slate-900 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Ready to Discuss Your {ind.title} Requirements?</h2>
            <p className="text-slate-300 font-medium text-base leading-relaxed">Our engineers have hands-on experience with the unique challenges of your industry. Contact us for a technical consultation or request a quote today.</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-4 shrink-0">
            <button onClick={() => navigate('/contact')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-500 transition-all shadow-lg flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              Get a Quote <ArrowRight className="w-5 h-5" />
            </button>
            <a href={waMsg(`Hello KESHAV ENTERPRISES, I need solutions for my ${ind.title} facility.`)} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-black hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-3 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

// ─── INDUSTRIES PAGE ─────────────────────────────────────────
const IndustriesPage = ({ navigate }) => (
  <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
    <SEOHead title="Industries Served — Power, Sugar, Oil & Gas, Petrochemical, Cement"
      description="Keshav Enterprises serves power plants, sugar mills, paper mills, oil & gas, petrochemical, agro, and cement industries with specialized turbine engineering and industrial products." canonicalPath="/industries" pageType="website" />
    <div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">Industries We Serve</h1>
        <div className="section-divider w-24 h-1.5 bg-blue-500 mb-8 rounded-full" aria-hidden="true" />
        <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">Specialized turbine engineering and industrial product solutions across seven major industry verticals.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        {INDUSTRIES.map((ind, index) => {
          const { Icon } = ind;
          return (
            <article key={ind.id}
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-500 group border border-slate-200 bg-white cursor-pointer"
              onClick={() => navigate(`/industry/${ind.id}`)}
              role="button" tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/industry/${ind.id}`)}
              aria-label={`Read more about our ${ind.title} solutions`}>
              <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

                {/* ── LEFT PANEL: full background image + overlay infographic ── */}
                <div className="lg:w-2/5 relative overflow-hidden min-h-[380px] lg:min-h-[440px] flex-shrink-0">
                  {/* Background photo at opacity 90% — upload image to /public with filename from ind.image */}
                  {ind.image && (
                    <img
                      src={ind.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: 0.90, aspectRatio: '560/440' }}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      width="560" height="440"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  )}
                  {/* Fallback gradient when no image or image fails — always present as base */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${ind.color}`} />
                  {/* Dark scrim so white text is readable over any photo */}
                  <div className="absolute inset-0 bg-[#0A192F]/60" />
                  {/* Subtle vignette at edges */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,25,47,0.5)_100%)]" />

                  {/* Infographic content — sits fully on top of image+overlays */}
                  <div className="relative z-10 w-full h-full p-10 flex flex-col items-center justify-center gap-6">
                    {/* Category icon badge */}
                    <div className="w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/25 shadow-2xl group-hover:scale-110 group-hover:bg-white/25 transition-all duration-500">
                      <Icon className="w-12 h-12 text-white drop-shadow-lg" aria-hidden="true" />
                    </div>
                    {/* Title */}
                    <div className="text-center">
                      <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-lg leading-tight mb-3">{ind.title}</h2>
                      {/* Accent rule */}
                      <div className={`h-1 w-16 rounded-full mx-auto mb-4 bg-white/50`} />
                      <p className={`text-sm font-black ${ind.accent} bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full uppercase tracking-widest border border-white/10 drop-shadow`}>{ind.turbines}</p>
                    </div>
                    {/* Mini use-case pills shown on the image panel */}
                    <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                      {ind.useCases.slice(0, 3).map((uc, i) => (
                        <span key={i} className="text-[10px] font-black text-white/90 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full uppercase tracking-wide">
                          {uc.split(' ').slice(0, 3).join(' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT PANEL: description, full use-cases, CTAs ── */}
                <div className="lg:w-3/5 p-10 lg:p-14 flex flex-col justify-center bg-white">
                  {/* Section label */}
                  <div className={`inline-flex items-center gap-2 mb-6`}>
                    <div className={`w-2 h-2 rounded-full ${ind.accent.replace('text-', 'bg-')}`} />
                    <span className={`text-xs font-black ${ind.accent} uppercase tracking-widest`}>Industry Focus</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-5 leading-tight">{ind.title}</h3>
                  <p className="text-slate-600 font-medium text-base leading-relaxed mb-8 border-l-4 border-slate-200 pl-5">{ind.desc}</p>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-5">Key Applications &amp; Products</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                    {ind.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${ind.accent}`} aria-hidden="true" />
                        <span className="text-slate-700 font-medium text-sm leading-snug">{uc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                    <button onClick={e => { e.stopPropagation(); navigate(`/industry/${ind.id}`); }} aria-label={`Explore ${ind.title} solutions in detail`}
                      className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-500 transition-all shadow-sm flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group/btn">
                      Explore Solutions <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); navigate('/contact'); }} aria-label={`Get a quote for ${ind.title} services`}
                      className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-sm flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 group/btn">
                      Get a Quote <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                    </button>
                    <a href={waMsg(`Hello KESHAV ENTERPRISES, I need engineering services for my ${ind.title} facility.`)} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      aria-label={`WhatsApp inquiry for ${ind.title}`}
                      className="flex-1 bg-[#25D366] text-white px-8 py-4 rounded-xl font-black hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                      <MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp
                    </a>
                  </div>
                </div>

              </div>
            </article>
          );
        })}
      </div>
    </div>
  </main>
);

// ─── CONTACT PAGE ─────────────────────────────────────────────
const ContactPage = () => {
  const [name, setName] = useState(''); const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); const [iType, setIType] = useState('');
  const [details, setDetails] = useState(''); const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Company name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email is required';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone number required (10+ digits)';
    if (!iType) e.iType = 'Please select an inquiry type';
    if (!details.trim() || details.length < 20) e.details = 'Please provide details (min 20 characters)';
    return e;
  };
  const handleSubmit = () => {
    const e = validate(); if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({}); setStatus('loading');
    const msg = `*New RFQ from Keshav Enterprises Website*\n\n*Company:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Inquiry Type:* ${iType}\n\n*Details:*\n${details}`;
    setTimeout(() => { window.open(waMsg(msg), '_blank', 'noopener'); setStatus('success'); }, 800);
  };
  const inputClass = (err) => `w-full px-5 py-4 bg-slate-50 border rounded-xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${err ? 'border-red-400 bg-red-50' : 'border-slate-200'}`;
  return (
    <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title="Contact Engineering Team — Request a Technical Quote"
        description="Contact Keshav Enterprises for turbine engineering RFQs, reverse engineering quotes, and 24x7 emergency breakdown support. Phone: +91 9149229448." canonicalPath="/contact" pageType="website" schema={FAQ_SCHEMA} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Contact Engineering</h1>
          <div className="section-divider w-24 h-1.5 bg-blue-600 mb-6 rounded-full" aria-hidden="true" />
          <p className="text-lg font-medium text-slate-500 max-w-2xl">Reach our engineering team for technical specifications, reverse engineering quotes, or 24x7 emergency overhauling support.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1 space-y-6">
            {[
              { Icon: Phone, title: 'Direct Lines', content: <div className="space-y-2">{CONTACT_INFO.phones.map(p => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-slate-600 font-bold text-base hover:text-blue-600 transition-colors">{p}</a>)}</div> },
              { Icon: Mail, title: 'Email (RFQs)', content: <div className="space-y-2">{[CONTACT_INFO.email, CONTACT_INFO.infoEmail, CONTACT_INFO.marketingEmail].map(e => <a key={e} href={`mailto:${e}`} className="block text-slate-600 font-bold text-sm hover:text-blue-600 transition-colors break-all">{e}</a>)}</div> },
              { Icon: MapPin, title: 'Facility Address', content: <p className="text-slate-600 font-bold text-sm leading-relaxed">{CONTACT_INFO.address}</p> },
            ].map(({ Icon, title, content }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex items-start space-x-5 hover:border-blue-200 transition-colors">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100"><Icon className="w-7 h-7 text-blue-600" aria-hidden="true" /></div>
                <div><h3 className="font-black text-slate-900 text-lg mb-2">{title}</h3>{content}</div>
              </div>
            ))}
            <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer" aria-label="View Keshav Enterprises on IndiaMART"
              className="bg-slate-900 p-8 border border-slate-800 rounded-3xl shadow-lg flex items-start space-x-5 hover:border-blue-500 transition-colors group block w-full">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500/50 transition-colors"><CheckCircle2 className="w-7 h-7 text-green-400" aria-hidden="true" /></div>
              <div>
                <h3 className="font-black text-white text-lg mb-1">IndiaMART Verified</h3>
                <p className="text-yellow-400 font-bold text-sm mb-1.5" aria-label="4.3 out of 5 stars">★★★★★ <span className="text-slate-300 ml-1">4.3/5 Rating</span></p>
                <p className="text-blue-400 font-black text-xs uppercase tracking-widest">TrustSeal Supplier</p>
              </div>
            </a>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50">
              <div className="flex flex-col mb-8 border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Request a Technical Quote</h2>
                <p className="text-slate-500 font-medium text-sm mt-2">Your inquiry will be sent to our engineering team via WhatsApp.</p>
              </div>
              {status === 'success' && (
                <div role="status" aria-live="polite" className="mb-8 p-6 bg-green-50 border border-green-200 text-green-800 font-black rounded-xl flex items-center shadow-sm text-lg">
                  <CheckCircle2 className="w-8 h-8 mr-4 text-green-500 shrink-0" aria-hidden="true" />
                  Your inquiry has been sent to our engineers via WhatsApp. We will respond within 24 hours.
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label htmlFor="c-name" className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Company Name <span aria-hidden="true">*</span></label>
                  <input id="c-name" type="text" value={name} onChange={e => setName(e.target.value)} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} className={inputClass(errors.name)} />
                  {errors.name && <p id="err-name" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Email Address <span aria-hidden="true">*</span></label>
                  <input id="c-email" type="email" value={email} onChange={e => setEmail(e.target.value)} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} className={inputClass(errors.email)} />
                  {errors.email && <p id="err-email" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label htmlFor="c-phone" className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Phone Number <span aria-hidden="true">*</span></label>
                  <input id="c-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" aria-required="true" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} className={`${inputClass(errors.phone)} placeholder:text-slate-500`} />
                  {errors.phone && <p id="err-phone" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="c-type" className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Inquiry Type <span aria-hidden="true">*</span></label>
                  <select id="c-type" value={iType} onChange={e => setIType(e.target.value)} aria-required="true" aria-invalid={!!errors.iType} aria-describedby={errors.iType ? 'err-type' : undefined} className={inputClass(errors.iType) + ' appearance-none cursor-pointer'}>
                    <option value="" disabled>Select an option...</option>
                    <option value="Filter Element RFQ">Filter Element RFQ (specify OEM)</option>
                    <option value="Expansion Joint RFQ">Expansion Joint / Bellows RFQ</option>
                    <option value="Turbine Spares RFQ">Turbine Spares (Triveni/Siemens/BHEL)</option>
                    <option value="Turbine Overhauling Service">Turbine Overhauling Service</option>
                    <option value="Reverse Engineering">Reverse Engineering / 3D Scanning</option>
                    <option value="Lube Oil Flushing">Lube Oil Flushing Service</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {errors.iType && <p id="err-type" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.iType}</p>}
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="c-details" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Requirements / RFQ Details <span aria-hidden="true">*</span></label>
                <textarea id="c-details" rows={6} value={details} onChange={e => setDetails(e.target.value)} aria-required="true" aria-invalid={!!errors.details} aria-describedby={errors.details ? 'err-details' : undefined}
                  className={inputClass(errors.details) + ' resize-none shadow-inner'}
                  placeholder="Include: OEM/turbine make, model number, quantity, drawing number, or any technical specifications..." />
                {errors.details && <p id="err-details" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.details}</p>}
              </div>
              <div className="mb-10 p-6 bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl hover:border-blue-400 transition-colors">
                <label htmlFor="c-files" className="flex items-center text-sm font-black text-slate-700 mb-3 uppercase tracking-widest cursor-pointer">
                  <Paperclip className="w-5 h-5 mr-3" aria-hidden="true" /> Attach Technical Drawings / Datasheet (Optional)
                </label>
                <input id="c-files" type="file" multiple aria-label="Attach technical drawings or datasheets (optional)"
                  className="w-full text-slate-700 file:cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-slate-900 file:text-white hover:file:bg-blue-600 transition-all cursor-pointer outline-none" />
              </div>
              <button type="button" onClick={handleSubmit} disabled={status === 'loading'}
                className="w-full bg-blue-600 text-white py-5 rounded-xl font-black text-xl hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                aria-live="polite">
                {status === 'loading'
                  ? <><span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />Submitting...</>
                  : <><MessageCircle className="w-6 h-6" aria-hidden="true" />Submit via WhatsApp</>}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-white p-4 md:p-6 border border-slate-200 rounded-3xl shadow-xl">
          <div className="flex items-center mb-6 px-4 pt-4">
            <MapPin className="w-6 h-6 text-blue-600 mr-3" aria-hidden="true" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Our Manufacturing Facility — Shamli, U.P.</h2>
          </div>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
            <iframe title="Keshav Enterprises location map — Shamli, Uttar Pradesh"
              src="https://maps.google.com/maps?q=Keshav%20Enterprises,%20Shamli,%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const h = () => setCurrentPath(window.location.hash.replace('#', '') || '/');
    window.addEventListener('popstate', h);

    // ── PERF: Back/Forward Cache (bfcache) fix ──
    // Prevents "Page prevented back/forward cache restoration" Lighthouse warning.
    // The main blocker is unload event listeners — we use pagehide instead.
    // Also ensure no beforeunload listeners are added elsewhere.
    const handlePageHide = () => {/* intentionally empty — keeps bfcache eligible */ };
    window.addEventListener('pagehide', handlePageHide);

    // ── PERF: Intersection Observer for below-fold sections ──
    // Adds .visible class when sections enter viewport → CSS fade-in
    // This defers rendering work until content is actually needed
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
    // Observe all lazy sections (added after paint)
    const observeLazy = () => {
      document.querySelectorAll('.lazy-section').forEach(el => io.observe(el));
    };
    // Run after first paint
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(observeLazy);
    } else {
      setTimeout(observeLazy, 200);
    }

    return () => {
      window.removeEventListener('popstate', h);
      window.removeEventListener('pagehide', handlePageHide);
      io.disconnect();
    };
  }, []);

  const navigate = useCallback((path) => {
    window.history.pushState(null, '', `#${path}`);
    setCurrentPath(path);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }, []);

  // PERF: useMemo prevents re-creating page component on every render
  const page = useMemo(() => {
    if (currentPath.startsWith('/product/')) return <ProductDetailPage productId={currentPath.split('/')[2]} navigate={navigate} />;
    if (currentPath.startsWith('/blog/')) return <BlogPostPage slug={currentPath.replace('/blog/', '')} navigate={navigate} />;
    if (currentPath.startsWith('/industry/')) return <IndustryDetailPage industryId={currentPath.split('/')[2]} navigate={navigate} />;
    switch (currentPath) {
      case '/': return <HomePage navigate={navigate} />;
      case '/about': return <AboutPage navigate={navigate} />;
      case '/blog': return <BlogPage navigate={navigate} />;
      case '/blog/': return <BlogPage navigate={navigate} />;
      case '/services': return <ServicesPage navigate={navigate} />;
      case '/products': return <ProductsPage navigate={navigate} />;
      case '/industries': return <IndustriesPage navigate={navigate} />;
      case '/contact': return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  }, [currentPath, navigate]);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white selection:bg-blue-600 selection:text-white text-[#111827]">
      <Navbar currentPath={currentPath} navigate={navigate} />
      <div className="flex-1 flex flex-col">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[60vh]"><span className="sr-only">Loading…</span></div>}>
          {page}
        </Suspense>
      </div>
      <Footer navigate={navigate} />
      <FloatingButtons />
    </div>
  );
}