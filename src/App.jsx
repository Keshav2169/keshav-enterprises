import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Phone, Mail, MapPin, 
  Settings, Wrench, Shield, Zap, Factory, ArrowRight,
  CheckCircle2, Download, ExternalLink, MessageCircle, Activity, Droplets,
  Search, SlidersHorizontal, Layers, Target, Navigation
} from 'lucide-react';

// --- DESIGN TOKENS & CONSTANTS ---
const COLORS = {
  primary: '#002147', // Deep Navy
  accent: '#1E40AF',  // Bright Royal Blue
  text: '#111827',    // Near Black for maximum visibility
  background: '#FFFFFF', // Pure White
  sectionBg: '#F3F4F6' // Light Gray
};

const CONTACT_INFO = {
  phones: ['+91 9149229448', '+91 6397363268'], 
  email: 'ksengg007@gmail.com',
  secondaryEmail: 'ppshekher71@gmail.com',
  address: 'Dayanand Nagar Gali No.2, Near Subash Ki Chakki, Shamli – 247776, U.P., India',
  whatsapp: '919149229448', 
  indiamart: 'https://www.indiamart.com/keshav-enterprises-shamli/',
  gmapsShare: 'https://share.google/uLc4GwsGec5eM62Ep' 
};

// --- DATA MODELS ---
const SERVICES = [
  { id: 'srv_1', title: 'Turbine Erection & Commissioning', icon: <CheckCircle2 className="w-6 h-6" />, desc: 'Expert erection and commissioning for steam turbines, pumps, compressors, and condensers. Includes complete OEM coordination and documentation.' },
  { id: 'srv_2', title: 'Turnkey Overhauling & Maintenance', icon: <Wrench className="w-6 h-6" />, desc: 'Executed by ex-OEM engineers. Includes pre-shutdown planning, condition reporting, and 24x7 emergency troubleshooting.' },
  { id: 'srv_3', title: 'Precision Reverse Engineering', icon: <Settings className="w-6 h-6" />, desc: '3D scanning, CMM, copying lathe, and PMI testing capabilities for turbines ranging from 5 kW to 27 MW.' },
  { id: 'srv_4', title: 'Dynamic Balancing & Alignment', icon: <Activity className="w-6 h-6" />, desc: 'ISO/API standard dynamic balancing (50–2000 kg capacity), vibration monitoring, and precision laser alignment.' },
  { id: 'srv_5', title: 'Lube Oil Flushing', icon: <Droplets className="w-6 h-6" />, desc: 'ISO-compliant flushing using high-capacity mobile centrifuge systems, complete with rigorous oil sampling and reporting.' }
];

const PRODUCTS = [
  // --- CATEGORY 1: Industrial Filtration & Strainers (15) ---
  { id: 'prod_f1', category: 'Industrial Filtration', title: '180 GPM Lube Hydraulic Oil Filter', desc: 'Designed specifically for turbine oil systems ensuring optimum fluid cleanliness and extended bearing life.', usage: 'Primary lube oil filtration in Triveni steam turbines.', features: ['180 GPM Flow Capacity', 'OEM Triveni Compatible', 'High Particulate Retention'] },
  { id: 'prod_f2', category: 'Industrial Filtration', title: '850 LPM Siemens Turbine Filter Element', desc: 'High-performance control oil filter replacement specifically manufactured for Siemens turbines.', usage: 'Maintaining hydraulic control systems in Siemens industrial turbines.', features: ['850 LPM Rating', 'Microglass Deep Media', 'High Collapse Pressure'] },
  { id: 'prod_f3', category: 'Industrial Filtration', title: 'Simplex Basket Strainer', desc: 'Provides heavy equipment protection with remarkably low pressure drop at high flow velocities.', usage: 'General pipeline debris removal for liquids and gases.', features: ['ASME #125 to #600 Ratings', 'Quick Open Closures', 'SS Perforated Basket'] },
  { id: 'prod_f4', category: 'Industrial Filtration', title: 'Duplex Basket Strainer', desc: 'Allows continuous flow during filter element changeouts for mission-critical uninterrupted systems.', usage: 'Uninterrupted continuous flow systems needing 24/7 filtration.', features: ['Continuous Uninterrupted Flow', 'Cast Steel & SS MOC', 'DP Gauge Integration'] },
  { id: 'prod_f5', category: 'Industrial Filtration', title: 'Y-Type Strainer', desc: 'Standard pipeline protection against solid particulates for liquid, gas, and steam applications.', usage: 'Inline pipeline protection for steam and chemical processing.', features: ['Flanged & Butt Weld Ends', 'Horizontal/Vertical Mount', 'Easy Maintenance'] },
  { id: 'prod_f6', category: 'Industrial Filtration', title: 'Conical / Temporary Strainer', desc: 'Ideal for system start-ups and flushing operations to catch debris before regular operation.', usage: 'Commissioning and startup flushing of new piping networks.', features: ['Cost-Effective Protection', 'Custom Mesh Sizes', 'Easy Flange Installation'] },
  { id: 'prod_f7', category: 'Industrial Filtration', title: 'Hydraulic Suction Strainer', desc: 'Protects hydraulic pumps from coarse contamination residing in the main reservoir.', usage: 'In-tank pump protection for heavy industrial hydraulics.', features: ['Submerged Operation', 'Stainless Steel Mesh', 'Ultra Low Pressure Drop'] },
  { id: 'prod_f8', category: 'Industrial Filtration', title: 'High-Pressure Filter Element (01.E)', desc: 'In-line pressure filtration up to 2320 psi to protect sensitive servo valves and hydraulic motors.', usage: 'High-pressure hydraulic lines and servo valve protection.', features: ['Sizes 30 to 1350', 'Up to 160 Bar Pressure', 'Multi-Layer Media'] },
  { id: 'prod_f9', category: 'Industrial Filtration', title: 'Return-Line Filter Element (01.NR)', desc: 'DIN 24550-4 standard compliant elements for system return lines to reduce oil aging.', usage: 'Reducing fluid contamination and oil aging in return lines.', features: ['Sizes 63 to 1000', '145 PSI / 10 Bar', 'DIN 24550-4 Compliant'] },
  { id: 'prod_f10', category: 'Industrial Filtration', title: 'Air Breather Filter Element (01.NBF)', desc: 'Protects hydraulic fluid reservoirs from ambient airborne contamination and moisture.', usage: 'Tank breather filtration for ambient moisture control.', features: ['Moisture Resistance', 'High Dirt Holding Capacity', 'Sizes 25 to 125'] },
  { id: 'prod_f11', category: 'Industrial Filtration', title: 'Lubrication Filter Element', desc: 'For large-scale lubrication modules ensuring continuous bearing and gear protection.', usage: 'Large-scale bearing and gearbox lubrication modules.', features: ['Sizes 631 to 4001', 'High Flow Dynamics', 'Optimal Cleanliness Class'] },
  { id: 'prod_f12', category: 'Industrial Filtration', title: 'Wire Mesh Filter Element', desc: 'Washable and reusable stainless steel mesh elements intended for coarse filtration applications.', usage: 'High-temperature environments requiring reusable filtration.', features: ['Pleated Design', 'High Temp Resistance', 'Reusable & Cleanable'] },
  { id: 'prod_f13', category: 'Industrial Filtration', title: 'Cep Strainer Filter', desc: 'Specialized heavy-duty strainers constructed for customized industrial processing applications.', usage: 'Heavy-duty customized industrial and chemical processing.', features: ['Rugged Build Quality', 'Custom Dimensions', 'Long Service Life'] },
  { id: 'prod_f14', category: 'Industrial Filtration', title: 'WaterSorp Filter Element', desc: 'Advanced media that absorbs free and emulsified water directly from the lubricating oil.', usage: 'Absorbing free/emulsified water from turbine lube oil.', features: ['Moisture Removal', 'Prevents Rapid Oxidation', 'Improves Oil Life'] },
  { id: 'prod_f15', category: 'Industrial Filtration', title: 'Mobile Centrifugal Oil Cleaner', desc: 'Complete centrifuge systems for on-site, ISO-compliant lube oil flushing and conditioning.', usage: 'On-site ISO-compliant lube oil flushing and purification.', features: ['High Capacity Centrifuge', 'Particle Counting Support', 'Turnkey Operation'] },

  // --- CATEGORY 2: Expansion Joints & Bellows (10) ---
  { id: 'prod_e1', category: 'Expansion Joints', title: 'Stainless Steel Metallic Bellows', desc: 'Absorbs thermal expansion and vibration in high-pressure exhaust and process pipe systems.', usage: 'High-pressure steam exhaust and chemical process pipes.', features: ['Multi-Ply SS Construction', 'High Temp Resistance', 'Fatigue & Yield Tested'] },
  { id: 'prod_e2', category: 'Expansion Joints', title: 'Double Arch Rubber Expansion Joint', desc: 'Provides substantially higher movement capability and vibration dampening over single arch models.', usage: 'High movement vibration dampening in cooling water lines.', features: ['Axial & Lateral Movement', 'Superior Noise Reduction', 'High Flexibility'] },
  { id: 'prod_e3', category: 'Expansion Joints', title: 'Single Arch Rubber Expansion Joint', desc: 'Standard vibration and thermal movement absorption for general industrial piping networks.', usage: 'Standard pipe stress prevention in HVAC and water systems.', features: ['Compact Design footprint', 'Durable Elastomer', 'Prevents Pipe Stress'] },
  { id: 'prod_e4', category: 'Expansion Joints', title: 'Wide Arch Expansion Bellow', desc: 'Designed for fluid systems requiring significant axial compression and extension ranges.', usage: 'Fluid systems needing significant axial compression.', features: ['High Movement Range', 'Self-Cleaning Arch Design', 'Low Spring Rate'] },
  { id: 'prod_e5', category: 'Expansion Joints', title: 'Flanged Rubber Expansion Joint', desc: 'Allows for easy and secure installation within standard flanged piping infrastructure.', usage: 'Secure integration into standard flanged piping infrastructure.', features: ['Carbon/SS Flange Options', 'Secure Leak-proof Sealing', 'Vibration Dampening'] },
  { id: 'prod_e6', category: 'Expansion Joints', title: 'Butt Weld Expansion Joint', desc: 'Permanent welded integration intended for high-pressure, seamless piping environments.', usage: 'High-pressure seamless welded piping in power plants.', features: ['Weld-End Preparation', '100% Leak-Proof', 'High Pressure Rating'] },
  { id: 'prod_e7', category: 'Expansion Joints', title: 'Fabric Expansion Joints', desc: 'Ideal for gas turbine exhausts and low-pressure hot gas ducting needing large compensations.', usage: 'Gas turbine exhaust and low-pressure hot gas ducting.', features: ['Extreme Temperatures', 'Large Duct Sizes', 'Corrosion Resistant'] },
  { id: 'prod_e8', category: 'Expansion Joints', title: 'Heavy-Duty Industrial Bellows', desc: 'Massive scale expansion joints manufactured for extreme industrial applications.', usage: 'Extreme Oil & Gas, Nuclear, and heavy fluid applications.', features: ['DN 15 to 12.000 Sizes', 'Up to 150 BARG', 'API/ASME Compliant'] },
  { id: 'prod_e9', category: 'Expansion Joints', title: 'PTFE Lined Expansion Joints', desc: 'Highly chemically resistant joints designed to handle aggressive acids and corrosive media.', usage: 'Corrosive chemical processing and acid transport pipelines.', features: ['100% Virgin PTFE Liner', 'Extreme Chemical Resistance', 'Non-Stick Surface'] },
  { id: 'prod_e10', category: 'Expansion Joints', title: 'Universal Expansion Joints', desc: 'Dual-bellow assemblies connected by a center spool to absorb multi-directional movements.', usage: 'Absorbing large lateral and axial movements in complex piping.', features: ['Multi-Directional Flex', 'Center Spool Design', 'Custom Lengths'] },

  // --- CATEGORY 3: Turbine Spares & Seals (12) ---
  { id: 'prod_ts1', category: 'Turbine Spares', title: 'Black Carbon Sealing Rings', desc: 'Precision machined black carbon rings offering superior steam turbine gland sealing.', usage: 'Steam turbine gland sealing for pressure retention.', features: ['Self-Lubricating Material', 'High Temp Resistance', 'Precise Clearances'] },
  { id: 'prod_ts2', category: 'Turbine Spares', title: 'High-Temperature Graphite Rings', desc: 'Advanced graphite sealing solutions engineered for extreme pressure environments.', usage: 'Extreme pressure and temperature steam sealing.', features: ['Thermal Stability', 'Chemical Resistance', 'Meets OEM Specifications'] },
  { id: 'prod_ts3', category: 'Turbine Spares', title: 'Labyrinth Seal Rings', desc: 'Complex tortuous path seals designed to minimize steam or gas leakage along the rotor shaft.', usage: 'Minimizing steam/gas leakage on high-speed rotor shafts.', features: ['Bronze, Alloy, or SS', 'High Speed Rating', 'Exact CNC Tolerances'] },
  { id: 'prod_ts4', category: 'Turbine Spares', title: 'Labyrinth Packings', desc: 'Complete packing sets for inner casing and inter-stage sealing within the turbine.', usage: 'Inner casing and inter-stage steam sealing within turbines.', features: ['Spring Backed Design', 'High Durability', 'Custom Manufactured'] },
  { id: 'prod_ts5', category: 'Turbine Spares', title: 'Rotor Assemblies', desc: 'Fully balanced and tested replacement rotors ready for drop-in industrial turbine installation.', usage: 'Drop-in replacement for damaged or aged turbine rotors.', features: ['Dynamic Balanced (ISO)', 'NDT Flaw Tested', 'Ready to Install'] },
  { id: 'prod_ts6', category: 'Turbine Spares', title: 'Journal Bearings', desc: 'White metal babbitted bearings ensuring stable and smooth rotor dynamics under heavy load.', usage: 'Supporting rotor weight and ensuring stable shaft dynamics.', features: ['Ultrasonic Tested Babbitt', 'Optimized Oil Wedge', 'High Load Capacity'] },
  { id: 'prod_ts7', category: 'Turbine Spares', title: 'Thrust Bearings', desc: 'Tilting pad and fixed profile thrust bearings crafted to handle massive axial rotor loads.', usage: 'Absorbing axial thrust loads from the spinning turbine rotor.', features: ['High Axial Load', 'Direct Lubrication Paths', 'Temperature Monitored'] },
  { id: 'prod_ts8', category: 'Turbine Spares', title: 'Mechanical Governors', desc: 'Precision speed control linkage components ensuring reliable and steady turbine RPM.', usage: 'Regulating turbine speed and RPM under varying loads.', features: ['Woodward/OEM Compatible', 'Responsive Regulation', 'Flyweight Assemblies'] },
  { id: 'prod_ts9', category: 'Turbine Spares', title: 'Main Oil Pumps (MOP)', desc: 'Shaft-driven primary oil pumps ensuring critical lubrication flow during operation.', usage: 'Providing primary lubrication flow during turbine operation.', features: ['Gear/Centrifugal Types', 'High Reliability', 'Tested Flow Rates'] },
  { id: 'prod_ts10', category: 'Turbine Spares', title: 'High-Grade Turbine Blades', desc: 'Reverse-engineered moving and stationary blades utilizing 3D scanning and CNC milling.', usage: 'Replacement of eroded or damaged moving/stationary blades.', features: ['Alloy Steel / Titanium', 'Root CNC Machining', 'Moment Weighed'] },
  { id: 'prod_ts11', category: 'Turbine Spares', title: 'Turbine Fasteners & Bolting', desc: 'High-tensile, heat-resistant studs and cap nuts designed for securing turbine casings.', usage: 'Securing high-pressure turbine upper and lower casings.', features: ['High-Tensile Alloys', 'Creep Resistant', 'Precise Threading'] },
  { id: 'prod_ts12', category: 'Turbine Spares', title: 'White Metal Babbitt Remetalling', desc: 'Expert remetalling services and custom babbitt poured bearings for heavy industrial rotors.', usage: 'Reconditioning worn out heavy-duty industrial bearings.', features: ['Centrifugal Casting', 'Dye Penetrant Tested', 'Custom Alloy Mix'] },

  // --- CATEGORY 4: Hose Pipes & Flexible Tubing (6) ---
  { id: 'prod_h1', category: 'Hose Pipes', title: 'Stainless Steel Corrugated Flexible Hose', desc: 'High-quality stainless steel corrugated hoses designed for conveying highly corrosive chemicals and extreme temperature fluids.', usage: 'High-temperature steam, chemical transfer, and vibration absorption in rigid piping.', features: ['SS 304/316L Construction', 'High Temperature Resistance', 'Braided for High Pressure'] },
  { id: 'prod_h2', category: 'Hose Pipes', title: 'PTFE Smoothbore Flexible Hose', desc: 'Smoothbore PTFE lined hoses reinforced with stainless steel braiding for maximum chemical resistance and purity.', usage: 'Pharmaceutical, food processing, and aggressive chemical transport.', features: ['100% Virgin PTFE Liner', 'Non-Stick FDA Approved', 'SS 304 Outer Braid'] },
  { id: 'prod_h3', category: 'Hose Pipes', title: 'Industrial Rubber Hose', desc: 'Heavy-duty rubber hoses reinforced with synthetic yarn or steel wire for pneumatic, water, and abrasive material transfer.', usage: 'Pneumatic lines, cooling water systems, and industrial washdown.', features: ['EPDM / NBR Rubber', 'High Abrasion Resistance', 'Flexible & Kink-Resistant'] },
  { id: 'prod_h4', category: 'Hose Pipes', title: 'Composite Chemical Transfer Hose', desc: 'Multi-layer thermoplastic composite hoses with inner and outer wire helixes for safe chemical and hydrocarbon transfer.', usage: 'Ship-to-shore chemical transfer and tank truck unloading.', features: ['Lightweight & Flexible', 'Chemical/Acid Resistant', 'Inner/Outer Steel Wire Helix'] },
  { id: 'prod_h5', category: 'Hose Pipes', title: 'High-Pressure Hydraulic Hose', desc: 'Steel-wire reinforced hydraulic hoses engineered to withstand extreme impulse pressures in hydraulic fluid power systems.', usage: 'Hydraulic control systems, heavy machinery, and earth-moving equipment.', features: ['SAE/EN Standard Compliant', 'High Burst Pressure', 'Oil & Weather Resistant Cover'] },
  { id: 'prod_h6', category: 'Hose Pipes', title: 'Interlocked Exhaust Flexible Hose', desc: 'Fully interlocked metallic hoses designed specifically to absorb engine exhaust vibrations and thermal expansion.', usage: 'Diesel engine exhausts, generator sets, and heavy vehicle exhausts.', features: ['Galvanized or SS Material', 'High Flexibility', 'Absorbs Heavy Vibration'] }
];

const PRODUCT_CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

const OEMS = ['Triveni', 'Siemens', 'BHEL', 'Belliss & Morcom', 'Alstom', 'GE', 'Maxwatt', 'Man Turbo', 'Chola Turbo', 'DLF-Skoda', 'KKK', 'ABB'];

// --- REUSABLE COMPONENTS ---

// 1. Robust Brand Logo Component
const BrandLogo = ({ scrolled, forceWhite, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const textColor = forceWhite ? 'text-white' : (scrolled ? 'text-[#002147]' : 'text-white');

  return (
    <div className="flex items-center space-x-3 cursor-pointer group" onClick={onClick}>
      {!imgError ? (
        <img 
          src="keshav-logo.png" 
          alt="KESHAV ENTERPRISES Logo" 
          className="h-12 w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 bg-white rounded-sm p-1 shadow-sm"
          onError={() => setImgError(true)} 
        />
      ) : (
        <div className="h-10 w-10 bg-[#1E40AF] rounded-sm flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500 shadow-sm">
          <Settings className="w-6 h-6 text-white" />
        </div>
      )}
      <div className={`font-black text-2xl tracking-tight ${textColor}`}>
        KESHAV ENTERPRISES<span className="text-[#1E40AF]">.</span>
      </div>
    </div>
  );
};

// 2. High-Visibility Make In India Badge
const MakeInIndiaBadge = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="inline-flex items-center space-x-3 bg-white px-4 py-2 rounded-md border border-gray-200 shadow-md">
      {!imgError ? (
        <img 
          src="make-in-india.png" 
          alt="Make In India" 
          className="h-8 object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="flex flex-col justify-center border-l border-gray-200 pl-3">
        <span className="text-[#002147] font-black text-sm leading-none uppercase tracking-widest">Make In India</span>
        <span className="text-gray-800 text-[10px] font-extrabold leading-none uppercase tracking-wider mt-1">Vocal For Local</span>
      </div>
    </div>
  );
};

const getCategoryIcon = (category) => {
  switch(category) {
    case 'Industrial Filtration': return <Droplets className="w-16 h-16 text-[#002147] opacity-20 group-hover:scale-110 group-hover:text-[#1E40AF] transition-all duration-500" />;
    case 'Expansion Joints': return <Layers className="w-16 h-16 text-[#002147] opacity-20 group-hover:scale-110 group-hover:text-[#1E40AF] transition-all duration-500" />;
    case 'Turbine Spares': return <Settings className="w-16 h-16 text-[#002147] opacity-20 group-hover:scale-110 group-hover:text-[#1E40AF] transition-all duration-500" />;
    case 'Hose Pipes': return <Activity className="w-16 h-16 text-[#002147] opacity-20 group-hover:scale-110 group-hover:text-[#1E40AF] transition-all duration-500" />;
    default: return <Settings className="w-16 h-16 text-[#002147] opacity-20 group-hover:scale-110 transition-transform duration-500" />;
  }
};

const ProductCard = ({ product }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full w-full text-left">
    <div className="h-40 bg-[#F3F4F6] border-b border-gray-200 flex items-center justify-center relative overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
      <span className="absolute top-4 left-4 bg-[#002147] text-white text-[11px] font-black px-3 py-1.5 uppercase tracking-wider rounded-sm z-10 shadow-sm">
        {product.category}
      </span>
      {getCategoryIcon(product.category)}
    </div>
    
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-black text-[#002147] mb-2 leading-tight group-hover:text-[#1E40AF] transition-colors">{product.title}</h3>
      <p className="text-gray-900 font-semibold text-sm mb-4 leading-relaxed line-clamp-3">{product.desc}</p>
      
      <div className="mb-5 flex items-start bg-blue-50/70 p-4 rounded-md border border-blue-200">
        <Target className="w-5 h-5 text-[#1E40AF] mr-3 mt-0.5 shrink-0" />
        <p className="text-sm text-gray-900 font-bold leading-relaxed line-clamp-2">
          <strong className="text-[#002147] font-black">Usage: </strong> 
          {product.usage}
        </p>
      </div>

      <div className="mb-6 flex-1 bg-gray-50/80 rounded-md p-5 border border-gray-200">
        <h4 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-3">Key Specifications</h4>
        <ul className="space-y-3">
          {product.features.map((feature, i) => (
            <li key={i} className="text-sm font-bold text-gray-900 flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#1E40AF] mr-3 mt-0.5 shrink-0" />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col xl:flex-row gap-3 mt-auto pt-4 border-t border-gray-200">
        <a 
          href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello KESHAV ENTERPRISES, I need a quotation and more details regarding your product: ${product.title}.`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-[#25D366] text-white flex items-center justify-center py-3 text-sm font-black rounded-md hover:bg-[#1ebe5d] transition-colors shadow-md"
        >
          <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
        </a>
        <a 
          href={CONTACT_INFO.indiamart} 
          target="_blank" 
          rel="noreferrer"
          className="flex-1 border-2 border-[#002147] text-[#002147] flex items-center justify-center py-3 text-sm font-black rounded-md hover:bg-[#002147] hover:text-white transition-colors shadow-md"
        >
          <ExternalLink className="w-5 h-5 mr-2" /> IndiaMART
        </a>
      </div>
    </div>
  </div>
);

const Navbar = ({ currentRoute, setCurrentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNav = (path) => {
    setCurrentRoute(path);
    setIsOpen(false);
    window.scrollTo(0,0);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FFFFFF] shadow-md py-3' : 'bg-[#002147] text-white py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <BrandLogo scrolled={scrolled} onClick={() => handleNav('/')} />

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => handleNav(link.path)}
                className={`text-sm font-black uppercase tracking-wider transition-colors hover:text-[#1E40AF] ${
                  currentRoute === link.path 
                    ? 'text-[#1E40AF]' 
                    : scrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleNav('/contact')}
              className="bg-[#002147] text-white px-6 py-2.5 rounded-sm font-black hover:bg-[#1E40AF] transition-colors shadow-lg shadow-blue-900/30"
            >
              Get Quote
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-[#002147]' : 'text-white'}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FFFFFF] shadow-xl border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNav(link.path)}
                className={`block w-full text-left px-4 py-4 rounded-md text-base font-black ${
                  currentRoute === link.path ? 'text-[#1E40AF] bg-blue-50' : 'text-gray-900 hover:text-[#1E40AF] hover:bg-gray-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setCurrentRoute }) => (
  <footer className="bg-[#001124] text-white pt-16 pb-8 border-t-[6px] border-[#1E40AF]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="mb-6">
            <BrandLogo scrolled={false} forceWhite={true} onClick={() => {setCurrentRoute('/'); window.scrollTo(0,0);}} />
          </div>
          <p className="text-gray-200 font-bold text-sm leading-relaxed mb-6">
            20+ years of excellence in industrial turbine engineering, reverse engineering, and manufacturing. Delivering precision to power, sugar, and process industries.
          </p>
          <div className="flex flex-col space-y-5">
            <MakeInIndiaBadge />
            <a href={CONTACT_INFO.indiamart} target="_blank" rel="noreferrer" className="text-gray-100 hover:text-white font-black transition-colors flex items-center underline decoration-[#1E40AF] decoration-2 underline-offset-4">
              IndiaMART TrustSeal Profile <ExternalLink className="w-4 h-4 ml-1.5"/>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-black mb-6 text-white border-b-2 border-gray-700 pb-2 inline-block">Quick Links</h3>
          <ul className="space-y-4">
            {['Home', 'Services', 'Products', 'About', 'Contact'].map(link => (
              <li key={link}>
                <button onClick={() => {setCurrentRoute(link === 'Home' ? '/' : `/${link.toLowerCase()}`); window.scrollTo(0,0);}} className="text-gray-300 font-bold hover:text-white hover:translate-x-1 transition-all flex items-center text-sm">
                  <ChevronRight className="w-4 h-4 mr-2 text-[#1E40AF]" /> {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black mb-6 text-white border-b-2 border-gray-700 pb-2 inline-block">Our Services</h3>
          <ul className="space-y-4">
            <li className="text-gray-300 font-bold text-sm flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-[#1E40AF]" /> Turnkey Overhauling</li>
            <li className="text-gray-300 font-bold text-sm flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-[#1E40AF]" /> Reverse Engineering</li>
            <li className="text-gray-300 font-bold text-sm flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-[#1E40AF]" /> Dynamic Balancing</li>
            <li className="text-gray-300 font-bold text-sm flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-[#1E40AF]" /> Spares Manufacturing</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black mb-6 text-white border-b-2 border-gray-700 pb-2 inline-block">Contact Us</h3>
          <ul className="space-y-5">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 text-[#1E40AF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-200 font-bold text-sm leading-relaxed">{CONTACT_INFO.address}</span>
            </li>
            <li className="flex items-start">
              <Phone className="w-5 h-5 text-[#1E40AF] mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-gray-200 font-bold text-sm space-y-1">
                <div>{CONTACT_INFO.phones[0]}</div>
                <div>{CONTACT_INFO.phones[1]}</div>
              </div>
            </li>
            <li className="flex items-start">
              <Mail className="w-5 h-5 text-[#1E40AF] mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-gray-200 font-bold text-sm space-y-1">
                <div>{CONTACT_INFO.email}</div>
                <div>{CONTACT_INFO.secondaryEmail}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 font-bold text-sm">© 2026 KESHAV ENTERPRISES. GST: 09**********1ZC. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppFab = () => (
  <a 
    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi KESHAV ENTERPRISES, I would like to request a technical quote.`}
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300 z-50 group"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-7 h-7" />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-900 text-sm font-black px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Chat with an Engineer
    </span>
  </a>
);

const ProductSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1280) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= PRODUCTS.length - itemsPerView) return 0;
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [itemsPerView]);

  return (
    <section className="py-24 bg-[#F3F4F6] overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#002147] mb-4">Explore Our High-Performance Catalog</h2>
        <p className="text-gray-900 font-bold text-lg max-w-2xl mx-auto">
          Over 35+ precision-engineered components, including industrial filtration, expansion bellows, and OEM-compatible turbine spares.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="overflow-hidden rounded-lg pb-6">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {PRODUCTS.map(product => (
              <div 
                key={product.id} 
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2 overflow-hidden max-w-sm mx-auto h-2 bg-gray-200 rounded-full">
           <div className="bg-[#1E40AF] h-full rounded-full transition-all duration-700 ease-in-out" style={{ width: `${((currentIndex + itemsPerView) / PRODUCTS.length) * 100}%` }}></div>
        </div>
      </div>
    </section>
  );
};


const HomePage = ({ setCurrentRoute }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="animate-in fade-in duration-500 bg-[#FFFFFF]">
      
      <section className="relative bg-[#001124] min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden">
        
        <div className="absolute inset-0 z-0 bg-[#001124]">
          {!heroImgError && (
            <img 
              src="hero-background.png" 
              alt="Industrial Engineering & Manufacturing" 
              className="absolute inset-0 w-full h-full object-cover opacity-10"
              onError={() => setHeroImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001124] via-[#002147]/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#001124] via-transparent to-transparent z-10 opacity-90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="w-full lg:w-3/5">
            <div className={`transform transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              
              <div className="flex flex-wrap items-center gap-5 mb-8">
                <MakeInIndiaBadge />
                <div className="inline-flex items-center space-x-2 bg-[#1E40AF]/20 px-4 py-2.5 rounded-md border border-[#1E40AF]/40 backdrop-blur-md shadow-md">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-white text-[11px] font-black tracking-widest uppercase">IndiaMART TrustSeal Verified</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
                Engineered for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-blue-300">
                  Maximum Uptime.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-100 font-bold mb-10 max-w-xl leading-relaxed border-l-4 border-[#1E40AF] pl-6 shadow-sm">
                No compromises. We deliver ISO-grade dynamic balancing, rapid reverse engineering, and OEM-compatible turbine spares designed to keep your plant running 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                <button onClick={() => setCurrentRoute('/contact')} className="bg-[#1E40AF] text-white px-8 py-4 rounded-md font-black hover:bg-[#FFFFFF] hover:text-[#002147] transition-all duration-300 flex items-center justify-center text-lg shadow-xl shadow-blue-900/40 group border border-[#1E40AF]">
                  Request Technical Quote
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="bg-[#001124]/50 text-white border-2 border-white/30 px-8 py-4 rounded-md font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-lg backdrop-blur-md">
                  <Activity className="mr-3 w-6 h-6 text-green-400" />
                  Emergency Breakdown
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 hidden lg:flex flex-col gap-6 relative">
            <div className={`bg-[#002147]/60 backdrop-blur-md border border-[#1E40AF]/40 p-6 rounded-lg shadow-2xl transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="text-gray-300 text-xs font-black uppercase tracking-widest">Service Capacity</div>
                <Zap className="w-5 h-5 text-[#1E40AF]" />
              </div>
              <div className="text-3xl font-black text-white">5 kW – 27 MW</div>
              <div className="text-sm text-gray-200 font-bold mt-2">Full-spectrum steam turbine overhauling & commissioning.</div>
            </div>

            <div className={`bg-[#002147]/60 backdrop-blur-md border border-[#1E40AF]/40 p-6 rounded-lg shadow-2xl transform transition-all duration-1000 delay-500 ml-12 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="text-gray-300 text-xs font-black uppercase tracking-widest">Dynamic Balancing</div>
                <Settings className="w-5 h-5 text-[#1E40AF] animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="text-3xl font-black text-white">50 – 2000 kg</div>
              <div className="text-sm text-gray-200 font-bold mt-2">ISO/API standard precision rotor balancing.</div>
            </div>

            <div className={`bg-[#002147]/60 backdrop-blur-md border border-[#1E40AF]/40 p-6 rounded-lg shadow-2xl transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="text-gray-300 text-xs font-black uppercase tracking-widest">OEM Compatibility</div>
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-3xl font-black text-white">100% Guaranteed</div>
              <div className="text-sm text-gray-200 font-bold mt-2">Triveni, Siemens, BHEL, Belliss India & more.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-12 border-b border-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <p className="text-center text-sm font-black text-gray-900 uppercase tracking-widest mb-8">Compatible With Major OEMs & Trusted By Industry Leaders</p>
          <div className="flex justify-center flex-wrap gap-8 md:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {OEMS.slice(0, 8).map((oem, i) => (
              <div key={i} className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
                {oem.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#002147] text-3xl md:text-4xl font-black mb-6">Core Engineering Capabilities</h2>
            <p className="text-gray-900 font-bold text-lg leading-relaxed">Comprehensive mechanical solutions for rotating equipment, minimizing downtime and maximizing output up to 27 MW.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.slice(0, 4).map((service) => (
              <div key={service.id} className="bg-[#FFFFFF] p-8 border border-gray-200 rounded-lg shadow-md hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F3F4F6] rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-[#1E40AF]/10 text-[#1E40AF] rounded-md flex items-center justify-center mb-6 relative z-10 group-hover:bg-[#1E40AF] group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-[#002147] mb-3 relative z-10">{service.title}</h3>
                <p className="text-gray-900 font-bold text-sm leading-relaxed relative z-10">{service.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-14 text-center">
            <button onClick={() => setCurrentRoute('/services')} className="text-[#002147] font-black text-lg flex items-center justify-center mx-auto hover:text-[#1E40AF] transition-colors">
              View All Services <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FFFFFF] relative border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h2 className="text-[#002147] text-3xl md:text-4xl font-black mb-8">Precision Manufacturing & Reverse Engineering</h2>
            <p className="text-gray-900 font-bold text-lg mb-8 leading-relaxed">
              We manufacture high-tolerance turbine spares, 180 GPM / 850 LPM industrial filters, and expansion bellows (DN 15-12.000). Using advanced 3D scanning and PMI testing, we recreate obsolete components to exact OEM specifications.
            </p>
            <ul className="space-y-5 mb-10 text-left inline-block">
              {[
                'Reduced lead times vs. OEM sourcing (Triveni, Siemens, BHEL)',
                'Material upgrades (Glass fibre, SS mesh, Carbon Sealing Rings)',
                'Stringent quality control & 50-2000kg dynamic balancing',
                'Custom fabrication (Thick wall, Octagonal, Double Arch Bellows)'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-900 font-black text-lg">
                  <Shield className="w-6 h-6 text-[#1E40AF] mr-4 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-center md:justify-start">
              <button onClick={() => setCurrentRoute('/about')} className="bg-[#002147] text-white px-8 py-4 rounded-md font-black hover:bg-[#1E40AF] transition-colors shadow-lg">
                Learn About Us
              </button>
              <a href={CONTACT_INFO.indiamart} target="_blank" rel="noreferrer" className="flex items-center justify-center px-8 py-4 border-2 border-gray-300 rounded-md text-gray-900 hover:text-[#1E40AF] hover:border-[#1E40AF] font-black transition-colors bg-gray-50 hover:bg-white">
                View IndiaMART Profile <ExternalLink className="w-5 h-5 ml-2.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductSlideshow />

      <section className="bg-[#002147] py-20 border-t-8 border-[#1E40AF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Optimize Your Plant's Performance?</h2>
          <p className="text-white font-bold text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Contact our engineering team for specialized consultation, 24x7 emergency breakdown support, or a technical quotation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button onClick={() => setCurrentRoute('/contact')} className="bg-[#1E40AF] text-white px-10 py-5 rounded-md font-black text-lg hover:bg-[#FFFFFF] hover:text-[#002147] transition-all duration-300 flex items-center justify-center text-lg shadow-2xl w-full sm:w-auto border-2 border-[#1E40AF]">
              Contact Engineering Team
            </button>
            <div className="text-white font-bold text-xl flex items-center bg-[#001124] px-8 py-5 rounded-md border border-gray-700">
              <span className="mr-3 text-gray-400">or Call:</span> 
              <a href={`tel:${CONTACT_INFO.phones[0].replace(/ /g, '')}`} className="font-black text-2xl hover:text-[#1E40AF] transition-colors tracking-wider">
                {CONTACT_INFO.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ServicesPage = ({ setCurrentRoute }) => (
  <main className="pt-24 pb-20 animate-in fade-in duration-500 bg-[#FFFFFF]">
    <div className="bg-[#002147] text-white py-16 mb-16 border-b-8 border-[#1E40AF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6">Engineering & Technical Services</h1>
        <p className="text-gray-200 font-bold max-w-3xl mx-auto text-xl leading-relaxed">
          Specialized mechanical solutions for industrial rotating equipment (up to 27 MW), ensuring peak reliability across power generation, sugar mills, and refineries.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {SERVICES.map((service, index) => (
        <div key={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-1/2">
            <div className="w-full aspect-video bg-[#F3F4F6] rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden group shadow-md">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                 {React.cloneElement(service.icon, { className: 'w-12 h-12 text-[#002147]' })}
               </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="text-[#1E40AF] font-black tracking-widest text-sm uppercase mb-3">Service {(index + 1).toString().padStart(2, '0')}</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#002147] mb-6">{service.title}</h2>
            <p className="text-gray-900 font-bold text-lg mb-8 leading-relaxed">
              {service.desc} We utilize state-of-the-art diagnostic tools and adhere strictly to OEM guidelines to deliver unparalleled service quality.
            </p>
            <ul className="space-y-4 mb-10">
              {['Rigorous OEM Standard Compliance', 'Detailed Technical & Condition Reporting', 'Ex-OEM Engineering Expertise'].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#1E40AF] mr-4 shrink-0 mt-0.5" />
                  <span className="text-gray-900 font-black text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setCurrentRoute('/contact')} className="border-2 border-[#002147] text-[#002147] px-8 py-3 rounded-md font-black text-lg hover:bg-[#1E40AF] hover:border-[#1E40AF] hover:text-white transition-colors shadow-sm">
              Inquire About This Service
            </button>
          </div>
        </div>
      ))}
    </div>
  </main>
);

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.usage && product.usage.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-24 pb-20 animate-in fade-in duration-500 bg-[#F3F4F6]">
       <div className="bg-[#002147] text-white py-16 mb-12 relative overflow-hidden border-b-8 border-[#1E40AF]">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Industrial Products & Spares</h1>
          <p className="text-gray-200 font-bold max-w-3xl mx-auto text-xl leading-relaxed">
            Explore our comprehensive catalog of 35+ high-performance industrial components. 
            Precision engineered for mission-critical rotating equipment and fluid systems.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-[#1E40AF]/30 rounded-xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div>
            <h3 className="text-[#002147] font-black text-2xl flex items-center mb-2">
              TrustSeal Verified IndiaMART Supplier
              <CheckCircle2 className="w-7 h-7 text-green-500 ml-3" />
            </h3>
            <p className="text-gray-900 font-bold text-base">Explore our complete catalog of Carbon Sealing Rings, Lube Oil Filters, and Expansion Joints verified on our official IndiaMART portal.</p>
          </div>
          <a 
            href={CONTACT_INFO.indiamart} 
            target="_blank" 
            rel="noreferrer"
            className="mt-6 md:mt-0 bg-[#002147] text-white px-8 py-4 rounded-md font-black hover:bg-[#1E40AF] transition-colors flex items-center whitespace-nowrap shadow-xl text-lg"
          >
            View Store on IndiaMART <ExternalLink className="w-5 h-5 ml-3" />
          </a>
        </div>

        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-3 overflow-x-auto w-full md:w-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {PRODUCT_CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-md text-sm font-black whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === category 
                    ? 'bg-[#002147] text-white border-2 border-[#002147]' 
                    : 'bg-white border-2 border-gray-300 text-gray-900 hover:border-[#1E40AF] hover:text-[#1E40AF]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search products, usage, or specs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-300 rounded-md text-base font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className="mb-8 flex items-center text-base font-black text-gray-900 border-b-2 border-gray-300 pb-4">
           <SlidersHorizontal className="w-5 h-5 mr-3 text-[#1E40AF]" />
           Showing {filteredProducts.length} Product{filteredProducts.length !== 1 && 's'}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-xl border-2 border-dashed border-gray-400 shadow-sm">
             <Settings className="w-16 h-16 text-gray-400 mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }} />
             <h3 className="text-2xl font-black text-[#002147]">No products found</h3>
             <p className="text-gray-900 font-bold text-lg mt-3">Try adjusting your search criteria or viewing a different category.</p>
             <button 
               onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
               className="mt-8 bg-[#002147] text-white px-8 py-3 rounded-md font-black hover:bg-[#1E40AF] transition-colors shadow-md"
             >
               Clear all filters
             </button>
          </div>
        )}
      </div>
    </main>
  );
};

const AboutPage = () => (
  <main className="pt-24 pb-20 animate-in fade-in duration-500 bg-[#FFFFFF]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-[#002147] mb-8 leading-tight">Engineering Excellence, Rooted in Precision.</h1>
          <p className="text-gray-900 font-bold text-lg mb-6 leading-relaxed">
            Based in Shamli, Uttar Pradesh, KESHAV ENTERPRISES has established itself over the past two decades as a premier partner for heavy industries relying on rotating equipment. We bridge the gap between high OEM costs and the critical need for reliable, precision-engineered replacements.
          </p>
          <p className="text-gray-900 font-bold text-lg mb-10 leading-relaxed">
            Our state-of-the-art facility is equipped for advanced metallurgical analysis, high-tolerance machining, 3D scanning, and dynamic balancing (up to 2000 kg). We ensure every component meets the rigorous demands of OEMs like Triveni, Siemens, BHEL, and Belliss India.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="border-l-8 border-[#1E40AF] pl-5 bg-gray-50 py-4 rounded-r-md">
              <div className="text-4xl font-black text-[#002147]">20+</div>
              <div className="text-sm font-black text-gray-800 uppercase tracking-widest mt-1">Years Experience</div>
            </div>
            <div className="border-l-8 border-[#1E40AF] pl-5 bg-gray-50 py-4 rounded-r-md">
              <div className="text-4xl font-black text-[#002147]">100%</div>
              <div className="text-sm font-black text-gray-800 uppercase tracking-widest mt-1">OEM Compatibility</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-[#F3F4F6] rounded-xl relative z-10 border-2 border-gray-200 overflow-hidden flex items-center justify-center shadow-2xl">
             <Factory className="w-40 h-40 text-gray-300" />
             <div className="absolute bottom-6 right-6 bg-white p-5 rounded-md shadow-xl flex items-center space-x-4 border-2 border-gray-100">
               <MapPin className="w-8 h-8 text-[#1E40AF]" />
               <div>
                 <div className="font-black text-[#002147] text-base uppercase tracking-wider">Headquarters</div>
                 <div className="text-sm font-bold text-gray-800 mt-0.5">Shamli, U.P., India</div>
               </div>
             </div>
          </div>
          <div className="absolute -top-8 -right-8 w-full h-full bg-[#002147] rounded-xl z-0"></div>
        </div>
      </div>

      <div className="bg-[#002147] py-20 px-8 rounded-xl text-center shadow-2xl border-t-8 border-[#1E40AF]">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-12">Industries We Serve</h2>
        <div className="flex flex-wrap justify-center gap-5">
          {['Power Generation', 'Sugar & Distilleries', 'Cement Plants', 'Paper & Pulp', 'Petrochemicals', 'Fertilizers', 'Steel', 'Nuclear', 'Oil & Gas'].map((industry, i) => (
            <span key={i} className="px-8 py-4 bg-white/10 text-white border-2 border-white/20 rounded-md font-black text-base hover:bg-[#1E40AF] transition-colors cursor-default shadow-sm">
              {industry}
            </span>
          ))}
        </div>
      </div>
    </div>
  </main>
);

const ContactPage = () => {
  const [formState, setFormState] = useState({ status: 'idle', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ status: 'loading', message: '' });
    setTimeout(() => {
      setFormState({ status: 'success', message: 'Technical Inquiry sent successfully. Our engineers will contact you shortly.' });
      e.target.reset();
    }, 1500);
  };

  return (
    <main className="pt-24 pb-20 bg-[#F3F4F6] min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-[#002147] mb-6">Contact Engineering</h1>
          <p className="text-gray-900 font-bold text-xl leading-relaxed">Send your technical RFQs, manufacturing drawings, or tender documents. Our engineering team provides rapid, precise responses for all industrial requirements.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md flex items-start space-x-5">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0 border border-blue-100">
                <Phone className="w-7 h-7 text-[#1E40AF]" />
              </div>
              <div>
                <h3 className="font-black text-[#002147] text-lg mb-2">Direct Lines</h3>
                <p className="text-gray-900 font-black text-base hover:text-[#1E40AF] cursor-pointer mb-1">{CONTACT_INFO.phones[0]}</p>
                <p className="text-gray-900 font-black text-base hover:text-[#1E40AF] cursor-pointer">{CONTACT_INFO.phones[1]}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md flex items-start space-x-5">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0 border border-blue-100">
                <Mail className="w-7 h-7 text-[#1E40AF]" />
              </div>
              <div>
                <h3 className="font-black text-[#002147] text-lg mb-2">Email (RFQs)</h3>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-900 font-black text-base hover:text-[#1E40AF] block mb-1">{CONTACT_INFO.email}</a>
                <a href={`mailto:${CONTACT_INFO.secondaryEmail}`} className="text-gray-900 font-black text-base hover:text-[#1E40AF] block">{CONTACT_INFO.secondaryEmail}</a>
              </div>
            </div>

            <div className="bg-white p-1 border border-gray-200 rounded-lg shadow-xl overflow-hidden">
              <div className="p-6 pb-4">
                <div className="flex items-start space-x-5 mb-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0 border border-blue-100">
                    <MapPin className="w-7 h-7 text-[#1E40AF]" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#002147] text-lg mb-2">Facility Location</h3>
                    <p className="text-gray-900 font-bold text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-56 bg-[#F3F4F6] border-y border-gray-200 relative flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="w-12 h-12 text-[#1E40AF] mb-3 opacity-50" />
                <h4 className="text-[#002147] font-black text-lg">Shamli, Uttar Pradesh</h4>
                <p className="text-gray-600 font-bold text-sm mt-1">Click below to open exact routing in Google Maps.</p>
              </div>

              <div className="p-4 bg-gray-50">
                <a 
                  href={CONTACT_INFO.gmapsShare} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full bg-[#1E40AF] text-white py-3.5 rounded-md flex items-center justify-center font-black hover:bg-[#002147] transition-colors text-sm shadow-md"
                >
                  <Navigation className="w-5 h-5 mr-2" /> Get Google Maps Directions
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-gray-200 rounded-xl shadow-xl">
              <h2 className="text-3xl font-black text-[#002147] mb-8 border-b-2 border-gray-100 pb-5">Request a Technical Quote</h2>
              
              {formState.status === 'success' && (
                <div className="mb-8 p-5 bg-green-50 border-2 border-green-200 text-green-900 font-black rounded-md flex items-center shadow-sm text-lg">
                  <CheckCircle2 className="w-7 h-7 mr-3 text-green-600 shrink-0" />
                  {formState.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Company Name *</label>
                  <input required type="text" className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-md font-bold text-gray-900 focus:ring-0 focus:border-[#1E40AF] outline-none transition-all" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Contact Person *</label>
                  <input required type="text" className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-md font-bold text-gray-900 focus:ring-0 focus:border-[#1E40AF] outline-none transition-all" placeholder="Your full name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Email Address *</label>
                  <input required type="email" className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-md font-bold text-gray-900 focus:ring-0 focus:border-[#1E40AF] outline-none transition-all" placeholder="name@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Phone Number *</label>
                  <input required type="tel" className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-md font-bold text-gray-900 focus:ring-0 focus:border-[#1E40AF] outline-none transition-all" placeholder="+91 9149229448" />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Primary Inquiry Category</label>
                <select className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-md font-bold text-gray-900 focus:ring-0 focus:border-[#1E40AF] outline-none transition-all">
                  <option>Turbine Spares (Carbon Rings, Seals, Bearings)</option>
                  <option>Filtration (Siemens/Triveni Oil Filters)</option>
                  <option>Expansion Joints & Bellows</option>
                  <option>Maintenance & Overhauling Service</option>
                  <option>Reverse Engineering Inquiry</option>
                </select>
              </div>

              <div className="mb-10">
                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Technical Requirements / Scope of Work *</label>
                <textarea required rows={6} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-md font-bold text-gray-900 focus:ring-0 focus:border-[#1E40AF] outline-none transition-all resize-none" placeholder="Provide OEM details, part numbers, capacities (e.g. MW or RPM), or paste your RFQ scope here..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formState.status === 'loading'}
                className="w-full bg-[#002147] text-white py-5 rounded-md font-black text-lg hover:bg-[#1E40AF] transition-colors flex items-center justify-center disabled:opacity-70 shadow-lg border-2 border-[#002147]"
              >
                {formState.status === 'loading' ? (
                  <span className="flex items-center">Transmitting Data <span className="animate-spin ml-3 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span></span>
                ) : (
                  <span className="flex items-center">Submit Technical Inquiry <ArrowRight className="ml-3 w-6 h-6" /></span>
                )}
              </button>
              <p className="text-sm text-gray-700 font-bold text-center mt-5">By submitting, you agree to our data processing guidelines. Formal NDA available upon request.</p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');

  const renderPage = () => {
    switch (currentRoute) {
      case '/': return <HomePage setCurrentRoute={setCurrentRoute} />;
      case '/services': return <ServicesPage setCurrentRoute={setCurrentRoute} />;
      case '/products': return <ProductsPage setCurrentRoute={setCurrentRoute} />;
      case '/about': return <AboutPage setCurrentRoute={setCurrentRoute} />;
      case '/contact': return <ContactPage />;
      default: return <HomePage setCurrentRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-[#FFFFFF] selection:bg-[#1E40AF] selection:text-white text-[#111827]">
      <Navbar currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
      
      <div className="flex-1 flex flex-col">
        {renderPage()}
      </div>

      <Footer setCurrentRoute={setCurrentRoute} />
      <WhatsAppFab />
    </div>
  );
}