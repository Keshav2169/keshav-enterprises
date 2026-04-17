import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Phone, Mail, MapPin, 
  Settings, Wrench, Shield, Zap, Factory, ArrowRight,
  CheckCircle2, ExternalLink, MessageCircle, Activity, Droplets,
  Search, Layers, Target, Cpu, ArrowLeft, Paperclip, 
  Filter, FileText, Hexagon, Cog, LifeBuoy, ChevronLeft
} from 'lucide-react';

// --- DESIGN TOKENS & CONSTANTS ---
const CONTACT_INFO = {
  phones: ['+91 9149229448', '+91 6397363268'], 
  email: 'ksengg007@gmail.com',
  secondaryEmail: 'ppshekher71@gmail.com',
  marketingEmail: 'ksenggmrkt007@gmail.com',
  address: 'Dayanand Nagar Gali No.2, Near Subash Ki Chakki, Shamli – 247776, U.P., India',
  whatsapp: '6397363268', 
  indiamart: 'https://www.indiamart.com/keshav-enterprises-shamli/',
  gmapsShare: 'https://share.google/uLc4GwsGec5eM62Ep' 
};

// --- DATA MODELS (EXTRACTED FROM PDFS & BROCHURES) ---
const SERVICES = [
  { id: 'srv_1', title: 'Turbine Erection & Commissioning', icon: <Cog className="w-7 h-7" />, desc: 'Expert erection and commissioning for steam turbines, pumps, compressors, and condensers. Includes complete OEM coordination and documentation.' },
  { id: 'srv_2', title: 'Turnkey Overhauling & Maintenance', icon: <Wrench className="w-7 h-7" />, desc: 'Executed by ex-OEM engineers. Includes pre-shutdown planning, condition reporting, and 24x7 emergency troubleshooting.' },
  { id: 'srv_3', title: 'Precision Reverse Engineering', icon: <Hexagon className="w-7 h-7" />, desc: '3D scanning, CMM, copying lathe, and PMI testing capabilities for turbines ranging from 5 kW to 27 MW.' },
  { id: 'srv_5', title: 'Lube Oil Flushing', icon: <Droplets className="w-7 h-7" />, desc: 'ISO-compliant flushing using high-capacity mobile centrifuge systems, complete with rigorous oil sampling and reporting.' }
];

// FULLY COMPREHENSIVE PRODUCT LIST (ALL STANDARDIZED WITH 3 .WEBP IMAGE SLOTS)
const PRODUCTS = [
  // --- FILTRATION ---
  { id: 'prod_f1', category: 'Industrial Filtration', title: '180 GPM Lube Hydraulic Oil Filter', desc: 'Designed specifically for turbine oil systems ensuring optimum fluid cleanliness and extended bearing life.', usage: 'Primary lube oil filtration in Triveni steam turbines.', features: ['180 GPM Flow Capacity', 'OEM Triveni Compatible', 'High Particulate Retention'], images: ['180-gpm-lube-filter-1.webp', '180-gpm-lube-filter-2.webp', '180-gpm-lube-filter-3.webp'] },
  { id: 'prod_f2', category: 'Industrial Filtration', title: '850 LPM Siemens Turbine Filter Element', desc: 'High-performance control oil filter replacement specifically manufactured for Siemens turbines.', usage: 'Maintaining hydraulic control systems in Siemens industrial turbines.', features: ['850 LPM Rating', 'Microglass Deep Media', 'High Collapse Pressure', 'Electrostatic Critical Application (IS27)'], images: ['850-lpm-siemens-filter-1.webp', '850-lpm-siemens-filter-2.webp', '850-lpm-siemens-filter-3.webp'] },
  { id: 'prod_f3', category: 'Industrial Filtration', title: 'Wire Mesh Centrifugal Filter', desc: 'Stainless steel wire mesh filters (Cep Strainer Filters) designed for rigorous industrial use and easy cleaning.', usage: 'High-temperature fluid and gas filtration.', features: ['SS 304/316 Wire Mesh', 'Cleanable and Reusable', 'High Collapse Pressure', 'HSN Code: 8421'], images: ['wire-mesh-centrifugal-filter-1.webp', 'wire-mesh-centrifugal-filter-2.webp', 'wire-mesh-centrifugal-filter-3.webp'] },
  { id: 'prod_f4', category: 'Industrial Filtration', title: 'Air Breather Filter Element', desc: 'Prevents airborne contaminants and moisture from entering hydraulic and lube oil reservoirs.', usage: 'Hydraulic tanks, gearboxes, and lube oil reservoirs.', features: ['High Dirt Holding Capacity', 'Moisture Absorption', 'Easy Replacement'], images: ['air-breather-filter-1.webp', 'air-breather-filter-2.webp', 'air-breather-filter-3.webp'] },
  { id: 'prod_f5', category: 'Industrial Filtration', title: 'Hydraulic Suction Strainer', desc: 'Designed to protect hydraulic pumps and control systems from coarse contamination.', usage: 'Immersed in hydraulic reservoirs to protect system pumps.', features: ['Stainless Steel Wire Mesh', 'Low Pressure Drop', 'Reusable & Cleanable', 'Protects Pumps from Cavitation'], images: ['hydraulic-suction-strainer-1.webp', 'hydraulic-suction-strainer-2.webp', 'hydraulic-suction-strainer-3.webp'] },
  { id: 'prod_f6', category: 'Industrial Filtration', title: 'WaterSorp Filter Elements', desc: 'Simultaneously removes solid particles and absorbs free and emulsified water from hydraulic and lube oils.', usage: 'Off-line filtration in side-stream return lines of lube oil systems.', features: ['Absorbs Free/Emulsified Water', 'Reduces Oil Aging', 'High Particulate Retention', 'Nominal Sizes: 250–1,000 (10 bar)'], images: ['watersorp-filter-1.webp', 'watersorp-filter-2.webp', 'watersorp-filter-3.webp'] },
  { id: 'prod_f7', category: 'Industrial Filtration', title: 'PTFE Air & Gas Filters', desc: 'Specialized hydrophobic PTFE filtration for critical compressed air and process gas applications.', usage: 'Compressed air systems, process gases, and venting applications.', features: ['Hydrophobic PTFE Media', 'High Flow Rates', 'Chemical Resistance', 'Moisture Repellent'], images: ['ptfe-air-filter-1.webp', 'ptfe-air-filter-2.webp', 'ptfe-air-filter-3.webp'] },

  // --- STRAINERS ---
  { id: 'prod_st1', category: 'Industrial Strainers', title: 'Simplex Basket Strainer', desc: 'Designed to meet rigorous customer requirements for high-pressure applications, offering perfect protection against undesirable particles.', usage: 'Liquid, viscous, and gaseous media filtration in pipelines.', features: ['MOC: Cast Steel, SS', 'Ratings: ASME #125, #150, #300, #600', 'Low Pressure Drop at High Velocities', 'SS Perforated Baskets', 'Davit Lifts & Quick Open Closures'], images: ['simplex-basket-strainer-1.webp', 'simplex-basket-strainer-2.webp', 'simplex-basket-strainer-3.webp'] },
  { id: 'prod_st2', category: 'Industrial Strainers', title: 'Duplex Type Basket Strainer', desc: 'Allows continuous operation during cleaning. Cost-effective protection for piping systems, industrial valves, and plant equipment.', usage: 'Continuous flow fluid systems requiring zero downtime.', features: ['Continuous Service w/o Shutdown', 'MOC: Cast Steel, SS', 'ASME Code Compliant', 'DP Gauges Available'], images: ['duplex-basket-strainer-1.webp', 'duplex-basket-strainer-2.webp', 'duplex-basket-strainer-3.webp'] },
  { id: 'prod_st3', category: 'Industrial Strainers', title: 'Conical Strainer', desc: 'Welded design strainer with mesh, installed between standard flanges to remove foreign matter and protect pumps, meters, and valves.', usage: 'Pipeline protection for downstream mechanical equipment.', features: ['MOC: Stainless Steel', 'Customizable Mesh Sizes', 'Welded Design', 'Standard Flange Installation'], images: ['conical-strainer-1.webp', 'conical-strainer-2.webp', 'conical-strainer-3.webp'] },
  { id: 'prod_st4', category: 'Industrial Strainers', title: 'Y-Type Strainer', desc: 'Robust Y-Type Strainer designed for liquid and gas lines to mechanically remove solids from flowing media.', usage: 'General purpose pipeline filtration and equipment protection.', features: ['MOC: Cast Iron, Cast Steel, SS', 'Easy Blow-Off Cleanout', 'High Pressure Rating Capabilities'], images: ['y-type-strainer-1.webp', 'y-type-strainer-2.webp', 'y-type-strainer-3.webp'] },
  
  // --- EXPANSION JOINTS & BELLOWS ---
  { id: 'prod_e1', category: 'Expansion Joints', title: 'Stainless Steel Metallic Bellows', desc: 'Absorbs thermal expansion and vibration in high-pressure exhaust and process pipe systems.', usage: 'High-pressure steam exhaust and chemical process pipes.', features: ['Multi-Ply SS Construction', 'High Temp Resistance', 'Fatigue & Yield Tested'], images: ['ss-metallic-bellows-1.webp', 'ss-metallic-bellows-2.webp', 'ss-metallic-bellows-3.webp'] },
  { id: 'prod_e2', category: 'Expansion Joints', title: 'Double Arch Rubber Expansion Joint', desc: 'Heavy-duty rubber expansion joint designed to absorb greater multi-directional movements and vibrations.', usage: 'Pumps, chillers, cooling towers, and heavy fluid systems.', features: ['Double Arch Design', 'High Flexibility', 'Noise & Vibration Reduction', 'Flanged Ends'], images: ['double-arch-rubber-joint-1.webp', 'double-arch-rubber-joint-2.webp', 'double-arch-rubber-joint-3.webp'] },
  { id: 'prod_e3', category: 'Expansion Joints', title: 'Single Arch Rubber Expansion Joint', desc: 'Standard rubber expansion joint for absorbing thermal movements and mechanical vibrations in pipelines.', usage: 'HVAC, water piping, and light industrial fluid lines.', features: ['Single Arch Configuration', 'Corrosion Resistant', 'Durable Rubber Compound'], images: ['single-arch-rubber-joint-1.webp', 'single-arch-rubber-joint-2.webp', 'single-arch-rubber-joint-3.webp'] },
  { id: 'prod_e4', category: 'Expansion Joints', title: 'Universal Expansion Joint', desc: 'Engineered with tie rod assembly to absorb multi-directional movements in complex piping configurations.', usage: 'Complex piping systems requiring lateral and angular movement absorption.', features: ['Twin Bellows Construction', 'Tie Rod Assembly Recommended', 'Maximum Flexibility'], images: ['universal-expansion-joint-1.webp', 'universal-expansion-joint-2.webp', 'universal-expansion-joint-3.webp'] },
  { id: 'prod_e5', category: 'Expansion Joints', title: 'Rectangular Expansion Joint', desc: 'Custom manufactured rectangular joints demanded for specific ducting and low-pressure ventilation systems.', usage: 'Exhaust gas ducting, ventilation, and low-pressure large volume lines.', features: ['Custom Dimensions Available', 'Vibration Isolation', 'High Temperature Resistance'], images: ['rectangular-expansion-joint-1.webp', 'rectangular-expansion-joint-2.webp', 'rectangular-expansion-joint-3.webp'] },
  { id: 'prod_e6', category: 'Expansion Joints', title: 'Dismantling Joint', desc: 'Mechanical joint designed to allow easy disassembly of connected piping components or machinery for maintenance.', usage: 'Pump, valve, and meter installations requiring quick access.', features: ['Easy Disassembly', 'High Tensile Tie Rods', 'Prevents Part Damage', 'Custom Dimensions'], images: ['dismantling-joint-1.webp', 'dismantling-joint-2.webp', 'dismantling-joint-3.webp'] },
  { id: 'prod_e7', category: 'Expansion Joints', title: 'Pressure Balance Expansion Joint', desc: 'Engineered to absorb axial movement and lateral deflection while continuously maintaining system pressure balance.', usage: 'Turbine crossovers, pump connections, and complex piping loops.', features: ['In-Line Pressure Balance', 'Absorbs Axial/Lateral Movement', 'Reduces Anchor Loads', 'High Pressure Capacity'], images: ['pressure-balance-joint-1.webp', 'pressure-balance-joint-2.webp', 'pressure-balance-joint-3.webp'] },
  { id: 'prod_e8', category: 'Expansion Joints', title: 'Thick Wall Expansion Joint', desc: 'Heavy-duty expansion joints manufactured with thicker plies to handle extreme pressure, abrasive media, or high-corrosion environments.', usage: 'Heavy industry, heat exchangers, and abrasive fluid pipelines.', features: ['Thick Wall Construction', 'High Fatigue Life', 'Erosion Resistant', 'Custom Convolution Profiles'], images: ['thick-wall-joint-1.webp', 'thick-wall-joint-2.webp', 'thick-wall-joint-3.webp'] },
  { id: 'prod_e9', category: 'Expansion Joints', title: 'Octagonal Expansion Joint', desc: 'Custom non-circular expansion joints engineered for specific ducting and low-pressure ventilation.', usage: 'Boilers, HVAC, chimneys, and industrial ducting.', features: ['Octagonal Profile', 'Accommodates Thermal Expansion', 'Vibration Isolation', 'Low Pressure Applications'], images: ['octagonal-expansion-joint-1.webp', 'octagonal-expansion-joint-2.webp', 'octagonal-expansion-joint-3.webp'] },
  { id: 'prod_e10', category: 'Expansion Joints', title: 'Non-Metallic Fabric Expansion Joint', desc: 'Fabric, PTFE, and rubber matrix joints designed to absorb thermal expansion and severe vibration in gas and air ducts.', usage: 'Boilers, bag filters, Electrostatic Precipitators (ESPs).', features: ['PTFE/Fabric/Rubber Matrices', 'High Temperature Resistance', 'Maximum Vibration Dampening', 'Large Movement Absorption'], images: ['non-metallic-expansion-joint-1.webp', 'non-metallic-expansion-joint-2.webp', 'non-metallic-expansion-joint-3.webp'] },
  { id: 'prod_e11', category: 'Expansion Joints', title: 'Slip Type Expansion Joint', desc: 'Sleeve-driven expansion joint designed to absorb large amounts of axial thermal expansion in straight piping runs.', usage: 'Long, straight piping systems with significant thermal expansion.', features: ['High Axial Movement Capacity', 'Internally Guided', 'Minimal Space Requirement', 'Packing Gland Design'], images: ['slip-type-expansion-joint-1.webp', 'slip-type-expansion-joint-2.webp', 'slip-type-expansion-joint-3.webp'] },
  { id: 'prod_e12', category: 'Expansion Joints', title: 'Industrial Dampers', desc: 'Precision-engineered flow control devices to regulate air or gas flow within complex industrial duct systems.', usage: 'HVAC systems, industrial chimneys, and gas exhaust lines.', features: ['Manual or Actuated Control', 'High Temperature Rated', 'Tight Shut-Off Sealing', 'Corrosion Resistant Body'], images: ['industrial-damper-1.webp', 'industrial-damper-2.webp', 'industrial-damper-3.webp'] },

  // --- TURBINE SPARES ---
  { id: 'prod_ts1', category: 'Turbine Spares', title: 'Black Carbon Sealing Rings', desc: 'Precision machined black carbon and graphite rings offering superior steam turbine gland sealing.', usage: 'Steam turbine gland sealing for pressure retention.', features: ['Self-Lubricating Material', 'High Temp Resistance', 'Precise Clearances'], images: ['black-carbon-sealing-rings-1.webp', 'black-carbon-sealing-rings-2.webp', 'black-carbon-sealing-rings-3.webp'] },
  { id: 'prod_ts2', category: 'Turbine Spares', title: 'Labyrinth Sealing Packings', desc: 'Custom manufactured labyrinth seals to prevent steam or gas leakage in rotating machinery.', usage: 'Steam turbine shaft sealing.', features: ['High Temperature Alloy', 'Tight Clearances', 'Erosion Resistant'], images: ['labyrinth-sealing-packings-1.webp', 'labyrinth-sealing-packings-2.webp', 'labyrinth-sealing-packings-3.webp'] },
  { id: 'prod_ts3', category: 'Turbine Spares', title: 'Babbitt Bearings with Thrust Pads', desc: 'Precision machined white metal (babbitt) journal and thrust bearings for critical rotating equipment.', usage: 'High-speed rotor support in steam turbines and compressors.', features: ['High Load Capacity', 'Exact OEM Dimensions', 'Ultrasonic Bond Tested'], images: ['babbitt-bearings-1.webp', 'babbitt-bearings-2.webp', 'babbitt-bearings-3.webp'] },
  { id: 'prod_ts4', category: 'Turbine Spares', title: 'Emergency Stop Valves (ESV)', desc: 'Mission-critical shut-off valves reverse-engineered and manufactured to precise OEM standards.', usage: 'Turbine over-speed protection and emergency shutdown.', features: ['Rapid Closure Response', 'High Pressure Tested', 'Stellite Hard-Faced Seats'], images: ['emergency-stop-valve-1.webp', 'emergency-stop-valve-2.webp', 'emergency-stop-valve-3.webp'] },
  { id: 'prod_ts5', category: 'Turbine Spares', title: 'Turbine Oil Pumps & Seals', desc: 'OEM-grade replacement oil pumps and mechanical seals designed specifically for Triveni, Siemens, and Belliss turbines.', usage: 'Main and auxiliary lube oil systems in power generation turbines.', features: ['Exact OEM Match', 'High Volumetric Efficiency', 'Leak-Proof Mechanical Seals'], images: ['turbine-oil-pumps-1.webp', 'turbine-oil-pumps-2.webp', 'turbine-oil-pumps-3.webp'] },
  { id: 'prod_ts6', category: 'Turbine Spares', title: 'High-Purity Graphite Rings', desc: 'Specialized graphite sealing rings designed for extreme temperature and pressure environments where standard carbon degrades.', usage: 'High-temperature steam and gas turbine sealing.', features: ['Excellent Thermal Conductivity', 'Extreme Temperature Resistance', 'Chemical Inertness'], images: ['high-purity-graphite-rings-1.webp', 'high-purity-graphite-rings-2.webp', 'high-purity-graphite-rings-3.webp'] },
  { id: 'prod_ts7', category: 'Turbine Spares', title: 'Complete Rotor Assemblies', desc: 'Fully manufactured and dynamically balanced turbine rotor assemblies built to exact OEM tolerances.', usage: 'Core rotating component replacements for steam turbines.', features: ['ISO/API Standard Balancing', 'Precision Machined', 'Material Upgrades Available', 'Ready for Installation'], images: ['rotor-assembly-1.webp', 'rotor-assembly-2.webp', 'rotor-assembly-3.webp'] },
  { id: 'prod_ts8', category: 'Turbine Spares', title: 'Gears & Worm Wheels', desc: 'High-precision gear sets and worm wheels reverse-engineered for heavy-duty industrial rotating equipment.', usage: 'Turbine gearboxes, speed reducers, and heavy machinery.', features: ['Exact OEM Gear Ratios', 'High Wear Resistance', 'Precision Hobbed', 'Heat Treated for Durability'], images: ['gears-worm-wheels-1.webp', 'gears-worm-wheels-2.webp', 'gears-worm-wheels-3.webp'] },
  { id: 'prod_ts9', category: 'Turbine Spares', title: 'Nozzles & Diaphragms', desc: 'Critical steam path components engineered to direct steam flow and maximize turbine stage efficiency.', usage: 'Internal steam path of high-pressure industrial turbines.', features: ['Erosion/Corrosion Resistant', 'Optimized Steam Path Design', 'High Temperature Alloys', 'Precise Throat Dimensions'], images: ['nozzles-diaphragms-1.webp', 'nozzles-diaphragms-2.webp', 'nozzles-diaphragms-3.webp'] },
  { id: 'prod_ts10', category: 'Turbine Spares', title: 'Mechanical Governors', desc: 'Speed regulation systems manufactured to maintain precise RPM control in rotating machinery.', usage: 'Turbine speed control and over-speed prevention.', features: ['High Sensitivity Response', 'Robust Mechanical Design', 'OEM Calibrated', 'Continuous Operation Rated'], images: ['mechanical-governors-1.webp', 'mechanical-governors-2.webp', 'mechanical-governors-3.webp'] },
  { id: 'prod_ts11', category: 'Turbine Spares', title: 'Throttle Valves', desc: 'High-pressure throttle valves engineered for precise control of steam flow into turbine systems.', usage: 'Steam turbine inlet and stage control.', features: ['Stellite Internal Trims', 'High Pressure Sealing', 'Custom Flow Characteristics', 'Rapid Response Action'], images: ['throttle-valves-1.webp', 'throttle-valves-2.webp', 'throttle-valves-3.webp'] },

  // --- INDUSTRIAL RUBBER PRODUCTS ---
  { id: 'prod_r1', category: 'Industrial Rubber Products', title: 'Extruded Rubber Profiles', desc: 'High-quality extruded rubber profiles customized for industrial sealing and dampening applications.', usage: 'Sealing panels, doors, and industrial enclosures.', features: ['Custom Extrusion Shapes', 'High Weather Resistance', 'Excellent Elasticity', 'Available in EPDM/Neoprene'], images: ['extruded-rubber-profile-1.webp', 'extruded-rubber-profile-2.webp', 'extruded-rubber-profile-3.webp'] },
  { id: 'prod_r2', category: 'Industrial Rubber Products', title: 'Heavy Duty Rubber Mounts', desc: 'Anti-vibration rubber mounts designed to isolate heavy machinery and protect against structural damage.', usage: 'Vibration isolation for generators, compressors, and heavy industrial machinery.', features: ['High Load Bearing Capacity', 'Reduces Noise & Vibration', 'Durable Natural Rubber', 'Easy Installation'], images: ['rubber-mounts-1.webp', 'rubber-mounts-2.webp', 'rubber-mounts-3.webp'] },

  // --- FLEXIBLE HOSES & ASSEMBLIES ---
  { id: 'prod_h1', category: 'Flexible Hoses & Assemblies', title: 'Stainless Steel Corrugated Flexible Hose', desc: 'High-quality stainless steel corrugated hoses designed for conveying highly corrosive chemicals and extreme temperature fluids.', usage: 'High-temperature steam, chemical transfer, and vibration absorption in rigid piping.', features: ['SS 304/316L Construction', 'High Temperature Resistance', 'Braided for High Pressure'], images: ['ss-corrugated-flexible-hose-1.webp', 'ss-corrugated-flexible-hose-2.webp', 'ss-corrugated-flexible-hose-3.webp'] },
  { id: 'prod_h2', category: 'Flexible Hoses & Assemblies', title: 'PTFE Lined Smooth Bore Hoses', desc: 'Engineered with a smooth PTFE inner core and stainless steel braiding for maximum chemical resistance and hygiene.', usage: 'Aggressive chemicals, pharmaceuticals, and high-purity fluid transfer.', features: ['Chemically Inert PTFE Core', 'SS 304/316 Outer Braid', 'High Temperature Tolerance', 'Non-Stick Surface'], images: ['ptfe-lined-hose-1.webp', 'ptfe-lined-hose-2.webp', 'ptfe-lined-hose-3.webp'] },
  { id: 'prod_h3', category: 'Flexible Hoses & Assemblies', title: 'Heavy-Duty Composite Hoses', desc: 'Multi-layer thermoplastic hoses designed for safe, flexible, and lightweight transfer of petroleum and aggressive chemicals.', usage: 'Petroleum transfer, chemical processing, and ship-to-shore operations.', features: ['Multi-Layer Thermoplastic', 'Extremely Lightweight & Flexible', 'Internal & External Wire Helices', '100% Aromatic Resistant'], images: ['composite-hose-1.webp', 'composite-hose-2.webp', 'composite-hose-3.webp'] },
  { id: 'prod_h4', category: 'Flexible Hoses & Assemblies', title: 'Interlocked Galvanized Steel Hoses', desc: 'Highly durable strip-wound interlocked hoses providing excellent crush resistance and mechanical protection.', usage: 'Exhaust systems, ventilation, dry bulk material handling, and cable armor.', features: ['High Crush Resistance', 'Galvanized/Stainless Steel Options', 'Excellent Flexibility', 'Abrasion Resistant'], images: ['interlocked-steel-hose-1.webp', 'interlocked-steel-hose-2.webp', 'interlocked-steel-hose-3.webp'] },
  { id: 'prod_h5', category: 'Flexible Hoses & Assemblies', title: 'High-Pressure Hydraulic Rubber Hoses', desc: 'Steel wire reinforced rubber hoses built to withstand extreme hydraulic pressures and severe environmental conditions.', usage: 'Heavy machinery, turbine hydraulic control systems, and industrial power units.', features: ['High-Tensile Steel Wire Braid', 'Oil & Weather Resistant Cover', 'Extreme Pressure Ratings', 'MSHA Approved'], images: ['hydraulic-rubber-hose-1.webp', 'hydraulic-rubber-hose-2.webp', 'hydraulic-rubber-hose-3.webp'] },

  // --- OTHERS ---
  { id: 'prod_ee1', category: 'Electronic Equipments', title: 'Vibration Probe (Shinkawa Make)', desc: 'High-precision non-contact eddy current vibration displacement sensors designed for continuous monitoring of turbine shaft vibration and axial position.', usage: 'Continuous monitoring of shaft vibration, thrust, and axial displacement in high-speed rotating machinery.', features: ['High Frequency Response', 'Extreme Temperature Tolerance', 'API 670 Standard Compliant'], images: ['vibration-probe-shinkawa-1.webp', 'vibration-probe-shinkawa-2.webp', 'vibration-probe-shinkawa-3.webp'] }
];

const PRODUCT_CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];
const OEMS = ['Triveni', 'Siemens', 'BHEL', 'Belliss & Morcom', 'Alstom', 'GE', 'Maxwatt', 'Man Turbo', 'Chola Turbo', 'DLF-Skoda', 'KKK', 'ABB'];

// --- SEO & UX HELPERS ---

const SEOHead = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | Keshav Enterprises` : 'Keshav Enterprises | Industrial Turbine Engineering';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || 'Keshav Enterprises delivers precision industrial turbine engineering, overhauling & maintenance, and OEM-compatible spares for power and processing plants.';
  }, [title, description]);
  return null;
};

// --- REUSABLE COMPONENTS ---

const BrandLogo = ({ scrolled, forceWhite, navigate }) => {
  const [imgError, setImgError] = useState(false);
  const textColor = forceWhite ? 'text-white' : (scrolled ? 'text-slate-900' : 'text-white');

  return (
    <a 
      href="#/" 
      onClick={(e) => { e.preventDefault(); navigate('/'); }}
      className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
    >
      {!imgError ? (
        <img 
          src="keshav-logo.png" 
          alt="Keshav Enterprises Logo" 
          className="h-10 sm:h-12 w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
          onError={() => setImgError(true)} 
        />
      ) : (
        <div className="relative flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-md transform group-hover:scale-105 transition-all duration-500 border border-blue-400/30 overflow-hidden">
          <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-white transform group-hover:rotate-90 transition-transform duration-700" />
        </div>
      )}
      <div className={`font-black text-xl sm:text-2xl tracking-tight ${textColor} flex items-center`}>
        KESHAV ENTERPRISES<span className="text-blue-500 ml-0.5">.</span>
      </div>
    </a>
  );
};

const MakeInIndiaBadge = () => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl">
      {!imgError ? (
        <img src="make-in-india.png" alt="Make In India" className="h-8 object-contain" onError={() => setImgError(true)} />
      ) : (
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none uppercase tracking-widest">Make In India</span>
        <span className="text-slate-300 text-[10px] font-extrabold leading-none uppercase tracking-wider mt-1">Vocal For Local</span>
      </div>
    </div>
  );
};

const IndiaMartBadge = () => {
  return (
    <a href={CONTACT_INFO.indiamart} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl hover:bg-white/10 transition-colors group cursor-pointer">
      <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-blue-400 transition-colors">
        <CheckCircle2 className="w-4 h-4 text-green-400" />
      </div>
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none tracking-widest flex items-center">
          IndiaMART Verified
        </span>
        <span className="text-yellow-400 text-[10px] font-extrabold leading-none uppercase tracking-wider mt-1.5 flex items-center">
          ★★★★★ <span className="text-blue-200 ml-1.5 tracking-widest">4.3/5 RATING</span>
        </span>
      </div>
    </a>
  );
};

const getCategoryIcon = (category) => {
  switch(category) {
    case 'Industrial Filtration': return <Filter className="w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500" />;
    case 'Industrial Strainers': return <Droplets className="w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500" />;
    case 'Expansion Joints': return <Layers className="w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500" />;
    case 'Turbine Spares': return <Cog className="w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500" />;
    case 'Flexible Hoses & Assemblies': return <Activity className="w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500" />;
    case 'Industrial Rubber Products': return <Hexagon className="w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500" />;
    case 'Electronic Equipments': return <Cpu className="w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500" />;
    default: return <Settings className="w-16 h-16 text-slate-300 group-hover:scale-110 transition-transform duration-500" />;
  }
};

const ProductCard = ({ product, navigate }) => {
  const [imgError, setImgError] = useState(false);
  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : null;

  const altText = `${product.title} manufactured by Keshav Enterprises`;

  return (
    <a 
      href={`#/product/${product.id}`}
      onClick={(e) => { e.preventDefault(); navigate(`/product/${product.id}`); }}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group flex flex-col h-full w-full text-left outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50"
    >
      <div className="h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent z-10 pointer-events-none transition-opacity group-hover:opacity-0"></div>
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded z-20 shadow-sm">
          {product.category}
        </span>
        
        {primaryImage && !imgError ? (
          <img 
            src={primaryImage} 
            alt={altText}
            loading="lazy"
            decoding="async" 
            className="w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="z-0 relative">
            {getCategoryIcon(product.category)}
          </div>
        )}
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col pointer-events-auto bg-gradient-to-b from-white to-slate-50/50">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">{product.title}</h3>
        <p className="text-slate-600 font-medium text-sm md:text-base mb-6 leading-relaxed line-clamp-2">{product.desc}</p>
        
        <div className="mb-6 flex items-start bg-blue-50/50 p-4 rounded-lg border border-blue-100/50 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
          <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-700 font-medium leading-relaxed line-clamp-2">
            <strong className="text-slate-900 font-bold">Application: </strong> 
            {product.usage}
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-3 mt-auto pt-5 border-t border-slate-100">
          <object className="flex-1">
             <a 
               href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello KESHAV ENTERPRISES, I need a quotation and more details regarding your product: ${product.title}.`}
               target="_blank"
               rel="noreferrer"
               className="w-full bg-[#25D366] text-white flex items-center justify-center py-3.5 text-sm font-bold rounded-lg hover:bg-[#1ebe5d] transition-all shadow-sm hover:shadow-md"
               aria-label={`Ask for quote for ${product.title} on WhatsApp`}
             >
               <MessageCircle className="w-4 h-4 mr-2" /> RFQ / WhatsApp
             </a>
          </object>
          <div className="flex-1 bg-slate-900 text-white flex items-center justify-center py-3.5 text-sm font-bold rounded-lg group-hover:bg-blue-600 transition-all shadow-sm hover:shadow-md pointer-events-none">
             Technical Specs <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </a>
  );
};

const Navbar = ({ currentPath, navigate }) => {
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
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && currentPath !== '/') return false;
    if (currentPath.startsWith(path)) return true;
    if (currentPath.startsWith('/product/') && path === '/products') return true;
    return false;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-3' : 'bg-[#0A192F] border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <BrandLogo scrolled={scrolled} navigate={navigate} />

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={`#${link.path}`}
                onClick={(e) => { e.preventDefault(); navigate(link.path); }}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive(link.path)
                    ? (scrolled ? 'text-blue-600' : 'text-blue-400')
                    : (scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-300 hover:text-white')
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#/contact"
              onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              className="bg-blue-600 text-white px-7 py-2.5 rounded font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
            >
              Get Quote
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-slate-900' : 'text-white'} aria-label="Toggle Menu">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.path}`}
                onClick={(e) => { e.preventDefault(); navigate(link.path); setIsOpen(false); }}
                className={`block w-full text-left px-5 py-4 rounded-xl text-lg font-black tracking-tight ${
                  isActive(link.path) ? 'text-blue-600 bg-blue-50 border border-blue-100' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ navigate }) => (
  <footer className="bg-[#0A192F] text-slate-300 pt-20 pb-8 border-t-[8px] border-blue-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="mb-6">
            <BrandLogo scrolled={false} forceWhite={true} navigate={navigate} />
          </div>
          <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8">
            20+ years of excellence in industrial turbine engineering, reverse engineering, and manufacturing. Delivering precision to power, sugar, and process industries.
          </p>
          <div className="flex flex-col space-y-4">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/10 w-fit">
              <Zap className="w-5 h-5 text-orange-500" />
              <div className="flex flex-col justify-center border-l border-white/20 pl-3">
                <span className="text-white font-black text-sm leading-none uppercase tracking-widest">Make In India</span>
              </div>
            </div>
            
            <a href={CONTACT_INFO.indiamart} target="_blank" rel="noreferrer" className="group flex flex-col space-y-2 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-md border border-white/10 hover:border-blue-500/50 transition-colors w-fit">
              <span className="text-white font-bold text-sm flex items-center tracking-wide">
                IndiaMART TrustSeal <CheckCircle2 className="w-4 h-4 text-green-400 ml-2"/>
              </span>
              <span className="text-yellow-400 text-xs font-black flex items-center tracking-widest">
                ★★★★★ <span className="text-slate-400 ml-2 font-medium tracking-normal">4.3/5 (90% Response)</span>
              </span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Quick Links</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6"></div>
          <ul className="space-y-4">
            {['Home', 'Services', 'Products', 'Contact'].map(link => (
              <li key={link}>
                <a 
                  href={`#${link === 'Home' ? '/' : `/${link.toLowerCase()}`}`}
                  onClick={(e) => { e.preventDefault(); navigate(link === 'Home' ? '/' : `/${link.toLowerCase()}`); }} 
                  className="text-slate-400 font-medium hover:text-white hover:translate-x-1 transition-all flex items-center text-sm"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-blue-500" /> {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Our Services</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6"></div>
          <ul className="space-y-4">
            <li className="text-slate-400 font-medium text-sm flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-blue-500" /> Overhauling & Maintenance</li>
            <li className="text-slate-400 font-medium text-sm flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-blue-500" /> Reverse Engineering</li>
            <li className="text-slate-400 font-medium text-sm flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-blue-500" /> Turbine Erection</li>
            <li className="text-slate-400 font-medium text-sm flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-blue-500" /> Spares Manufacturing</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Contact Us</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6"></div>
          <ul className="space-y-6">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-slate-400 font-medium text-sm leading-relaxed">{CONTACT_INFO.address}</span>
            </li>
            <li className="flex items-start">
              <Phone className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-slate-400 font-medium text-sm space-y-1">
                <div>{CONTACT_INFO.phones[0]}</div>
                <div>{CONTACT_INFO.phones[1]}</div>
              </div>
            </li>
            <li className="flex items-start">
              <Mail className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-slate-400 font-medium text-sm space-y-1">
                <div>{CONTACT_INFO.email}</div>
                <div>{CONTACT_INFO.marketingEmail}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-500 font-medium text-sm">© 2026 KESHAV ENTERPRISES. GST: 09**********1ZC. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppFab = () => (
  <a 
    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi KESHAV ENTERPRISES, I would like to request a technical quote.`}
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300 z-50 group"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-7 h-7" />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Chat with an Engineer
    </span>
  </a>
);

// --- PAGES ---

const ProductDetailsPage = ({ productId, navigate }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mainImgError, setMainImgError] = useState(false);

  const product = PRODUCTS.find(p => p.id === productId);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0,0); }, [productId]);

  if (!product) {
    return (
      <main className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center bg-slate-50">
        <SEOHead title="Product Not Found" />
        <div>
          <Settings className="w-20 h-20 text-slate-300 mx-auto mb-6 animate-spin" />
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Product Not Found</h1>
          <button onClick={() => navigate('/products')} className="text-blue-600 font-bold hover:underline text-lg">
            Return to Catalog
          </button>
        </div>
      </main>
    );
  }

  const hasImages = product.images && product.images.length > 0;
  const activeImage = hasImages ? product.images[activeImageIndex] : null;

  return (
    <main className="pt-28 pb-20 animate-in fade-in duration-500 bg-slate-50 min-h-screen">
      <SEOHead 
        title={`${product.title} | ${product.category}`} 
        description={`Keshav Enterprises manufactures ${product.title}. ${product.desc}`} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Industry Standard Breadcrumbs */}
        <div className="flex items-center text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest">
          <button onClick={() => navigate('/products')} className="hover:text-blue-600 transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Catalog
          </button>
          <span className="mx-3">/</span>
          <span className="text-slate-400">{product.category}</span>
          <span className="mx-3">/</span>
          <span className="text-slate-800 truncate max-w-[200px] md:max-w-full">{product.title}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Image Gallery (Left Side - 5 cols) */}
            <div className="lg:col-span-5 p-8 lg:p-10 bg-white flex flex-col items-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden mb-6 group shadow-inner">
                {activeImage && !mainImgError ? (
                  <img 
                    src={activeImage} 
                    alt={`${product.title} - View ${activeImageIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                    onError={() => setMainImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center opacity-30">
                    {getCategoryIcon(product.category)}
                    <span className="mt-6 font-bold text-slate-500 uppercase tracking-widest text-sm">Image Pending</span>
                  </div>
                )}
              </div>

              {hasImages && product.images.length > 1 && (
                <div className="flex gap-4 w-full overflow-x-auto pb-4 px-2 scrollbar-hide">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => { setActiveImageIndex(idx); setMainImgError(false); }}
                      className={`shrink-0 w-20 h-20 bg-white rounded-xl border-2 overflow-hidden transition-all ${activeImageIndex === idx ? 'border-blue-600 shadow-lg scale-105' : 'border-slate-200 hover:border-blue-400 opacity-70 hover:opacity-100'}`}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${idx+1}`} 
                        loading="lazy" 
                        className="w-full h-full object-cover p-2 mix-blend-multiply" 
                        onError={(e) => { e.target.parentElement.style.display = 'none'; }} 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Specs (Right Side - 7 cols) */}
            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col bg-gradient-to-br from-white to-slate-50/50">
              <div className="mb-5">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-4 py-2 uppercase tracking-widest rounded-md shadow-sm">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">{product.title}</h1>
              <p className="text-slate-600 font-medium text-lg md:text-xl mb-10 leading-relaxed">{product.desc}</p>
              
              <div className="mb-10 bg-slate-900 p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Factory className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-black text-blue-400 text-sm uppercase tracking-widest mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-3" /> Primary Industrial Application
                  </h3>
                  <p className="text-white font-medium text-lg leading-relaxed">{product.usage}</p>
                </div>
              </div>

              {/* Professional Engineering Specs Table */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-6">
                  <h3 className="font-black text-slate-900 text-xl tracking-tight">Technical Specifications</h3>
                  <button className="hidden sm:flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                    <FileText className="w-4 h-4 mr-1.5" /> Download PDF Datasheet
                  </button>
                </div>
                
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-slate-100">
                      {product.features.map((feature, i) => (
                        <tr key={i} className="bg-white hover:bg-slate-50 transition-colors">
                          <td className="p-4 md:p-5 text-slate-800 font-medium text-base flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 mr-4 shrink-0" />
                            {feature}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-auto pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-5">
                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello KESHAV ENTERPRISES, I am interested in purchasing or getting technical details for: *${product.title}*. Please assist.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#25D366] text-white py-5 rounded-xl font-black text-lg hover:bg-[#1ebe5d] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center tracking-tight"
                >
                  <MessageCircle className="w-6 h-6 mr-3" /> Request Quote via WhatsApp
                </a>
                <a 
                  href={CONTACT_INFO.indiamart} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 bg-white border-2 border-slate-900 text-slate-900 py-5 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center tracking-tight"
                >
                  <ExternalLink className="w-6 h-6 mr-3" /> View on IndiaMART
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

const HomePage = ({ navigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="animate-in fade-in duration-700 bg-[#FFFFFF]">
      <SEOHead title="Industrial Turbine Engineering & Spares" />
      
      {/* Premium Hero Section */}
      <section className="relative bg-[#0A192F] min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* Immersive Background */}
        <div className="absolute inset-0 z-0 bg-[#0A192F]">
          {!heroImgError && (
            <img 
              src="hero-background.png" 
              alt="Industrial Engineering Facility" 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              onError={() => setHeroImgError(true)}
            />
          )}
          
          {/* Glowing Orbs for Modern Depth */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/40 rounded-full blur-[128px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-[128px] pointer-events-none"></div>

          {/* Elegant High-Tech Blueprint Grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_80%,transparent_100%)]"></div>
          
          {/* Overlay Gradients to perfectly blend the 90% opacity image */}
          <div className="absolute inset-0 bg-[#0A192F]/40 z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/60 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-transparent to-transparent z-10 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-3/5">
            <div className={`transform transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              
              {/* Trust Hook Tags */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <MakeInIndiaBadge />
                <IndiaMartBadge />
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl">
                Precision Engineering for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                  Maximum Uptime.
                </span>
              </h1>
              
              {/* Glassmorphism Descriptive Box */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-r-2xl border-l-4 border-l-cyan-400 p-5 mb-10 max-w-xl shadow-xl">
                <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
                  We deliver complete overhauling & maintenance, rapid reverse engineering, and OEM-compatible turbine spares. Trusted by power generation and process industries across India.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                <button onClick={() => navigate('/contact')} className="bg-blue-600 text-white px-8 py-4 md:py-5 rounded-xl font-black hover:bg-blue-500 transition-all duration-300 flex items-center justify-center text-lg md:text-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] group tracking-tight hover:-translate-y-1">
                  Request Technical Quote
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="bg-white/5 text-white border border-white/20 px-8 py-4 md:py-5 rounded-xl font-bold hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center text-lg backdrop-blur-md shadow-xl hover:-translate-y-1">
                  <LifeBuoy className="mr-3 w-6 h-6 text-cyan-400" />
                  Emergency Breakdown
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 hidden lg:flex flex-col gap-6 relative">
            {/* Hook Card 1 - Experience */}
            <div className={`bg-gradient-to-br from-[#0A192F]/80 to-slate-900/80 backdrop-blur-xl border border-white/10 p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-1000 delay-300 hover:border-blue-400/40 hover:-translate-y-2 group ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="text-blue-300 text-xs font-black uppercase tracking-widest group-hover:text-blue-200 transition-colors">Proven Experience</div>
                <Shield className="w-6 h-6 text-blue-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter drop-shadow-sm mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">10+ Years Expertise</div>
              <div className="text-sm text-slate-400 font-medium">Trusted by power, sugar, and process industries nationwide.</div>
            </div>

            {/* Hook Card 2 - Service */}
            <div className={`bg-gradient-to-br from-[#0A192F]/80 to-slate-900/80 backdrop-blur-xl border border-white/10 p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-1000 delay-500 ml-12 hover:border-blue-400/40 hover:-translate-y-2 group ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="text-blue-300 text-xs font-black uppercase tracking-widest group-hover:text-blue-200 transition-colors">Technical Services</div>
                <Wrench className="w-6 h-6 text-blue-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter drop-shadow-sm mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">Zero Downtime</div>
              <div className="text-sm text-slate-400 font-medium">24/7 emergency support & complete overhauling & maintenance.</div>
            </div>

            {/* Hook Card 3 - Products */}
            <div className={`bg-gradient-to-br from-[#0A192F]/80 to-slate-900/80 backdrop-blur-xl border border-white/10 p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-1000 delay-700 ml-4 hover:border-blue-400/40 hover:-translate-y-2 group ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="text-blue-300 text-xs font-black uppercase tracking-widest group-hover:text-blue-200 transition-colors">Precision Products</div>
                <Factory className="w-6 h-6 text-blue-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter drop-shadow-sm mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">OEM-Grade Spares</div>
              <div className="text-sm text-slate-400 font-medium">Advanced reverse engineering & custom filtration systems.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Scrolling OEM Marquee (Industry Standard Upgrade) */}
      <section className="bg-white py-12 md:py-16 border-b border-slate-100 overflow-hidden">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 80s linear infinite;
          }
          .animate-marquee-slow {
            display: flex;
            width: max-content;
            animation: marquee 160s linear infinite;
          }
          .animate-marquee:hover, .animate-marquee-slow:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <p className="text-center text-sm font-black text-slate-400 uppercase tracking-widest">Compatible With Major OEMs & Trusted By Industry Leaders</p>
        </div>
        
        <div className="relative w-full overflow-hidden bg-white flex items-center">
          {/* Left/Right Fade Masks */}
          <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee gap-8 md:gap-16 px-4">
            {/* Render list twice for infinite loop effect */}
            {[...OEMS, ...OEMS].map((oem, i) => (
              <div key={i} className="group flex items-center justify-center shrink-0 w-48 md:w-64 h-24 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <img 
                  src={`${oem.toLowerCase().replace(/[^a-z0-9]/g, '-')}-logo.png`} 
                  alt={`${oem} Logo`} 
                  className="max-h-full max-w-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.classList.remove('hidden');
                    e.target.nextElementSibling.classList.add('flex');
                  }}
                />
                <div className="hidden items-center justify-center space-x-3 w-full">
                  <Factory className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors duration-500 shrink-0" />
                  <span className="text-sm md:text-base font-black text-slate-700 tracking-widest uppercase truncate group-hover:text-blue-600 transition-colors duration-300">
                    {oem}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Products Marquee */}
      <section className="bg-slate-50 py-20 border-b border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Featured Engineering Products</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full shadow-md"></div>
          </div>
          <button onClick={() => navigate('/products')} className="hidden sm:flex items-center font-black text-blue-600 hover:text-blue-800 transition-colors text-lg tracking-tight group">
            View Complete Catalog <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Left/Right Fade Masks for Products */}
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee-slow gap-6 px-4 py-4">
            {[...PRODUCTS, ...PRODUCTS].map((product, i) => (
              <a 
                key={`${product.id}-${i}`}
                href={`#/product/${product.id}`}
                onClick={(e) => { e.preventDefault(); navigate(`/product/${product.id}`); }}
                className="group flex flex-col shrink-0 w-72 md:w-80 bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-blue-500/50 cursor-pointer"
              >
                <div className="h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent z-10 pointer-events-none transition-opacity group-hover:opacity-0"></div>
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded z-20 shadow-sm">
                    {product.category}
                  </span>
                  
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      loading="lazy"
                      decoding="async" 
                      className="w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.classList.remove('hidden');
                        e.target.nextElementSibling.classList.add('flex');
                      }}
                    />
                  ) : null}
                  <div className={`${product.images && product.images.length > 0 ? 'hidden' : 'flex'} z-0 relative flex-col items-center justify-center`}>
                    {getCategoryIcon(product.category)}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-slate-50/50">
                  <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2">{product.title}</h3>
                  <p className="text-slate-600 font-medium text-sm mb-4 leading-relaxed line-clamp-2">{product.desc}</p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Explore Details</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm">
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center sm:hidden px-4">
          <button onClick={() => navigate('/products')} className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-md flex items-center justify-center text-base">
            View Complete Catalog <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h2 className="text-slate-900 text-4xl md:text-5xl font-black mb-6 tracking-tight">Precision Manufacturing.</h2>
            <div className="w-24 h-1.5 bg-blue-600 mb-8 rounded-full mx-auto md:mx-0"></div>
            <p className="text-slate-600 font-medium text-xl mb-12 leading-relaxed">
              We manufacture high-tolerance turbine spares, industrial strainers, and expansion bellows (DN 15-12.000). Using advanced 3D scanning and PMI testing, we recreate obsolete components to exact OEM specifications, drastically reducing plant downtime.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                'Reduced lead times vs. OEM sourcing (Triveni, Siemens, BHEL)',
                'Material upgrades (Glass fibre, SS mesh, Carbon Sealing Rings)',
                'Comprehensive Overhauling & Maintenance Services',
                'Custom fabrication (Thick wall, Octagonal, Double Arch Bellows)'
              ].map((item, i) => (
                <div key={i} className="flex items-start bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md hover:bg-white transition-all">
                  <Shield className="w-7 h-7 text-blue-500 mr-4 shrink-0" /> 
                  <span className="text-slate-800 font-bold text-base md:text-lg leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ServicesPage = ({ navigate }) => (
  <main className="pt-24 pb-20 animate-in fade-in duration-500 bg-[#FFFFFF]">
    <SEOHead title="Turbine Services & Overhauling" description="Complete overhauling & maintenance, reverse engineering, and erection services for steam turbines up to 27MW." />
    
    <div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">Technical Services</h1>
        <div className="w-24 h-1.5 bg-blue-500 mb-8 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
          Specialized mechanical solutions for industrial rotating equipment (up to 27 MW), ensuring peak reliability across power generation, sugar mills, and refineries.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-32 mt-20">
        {SERVICES.map((service, index) => (
          <div key={service.id} className={`flex flex-col md:flex-row gap-16 items-center group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/2 w-full">
              <div className="w-full aspect-[4/3] bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-center relative overflow-hidden shadow-xl shadow-slate-200/50 group-hover:border-blue-200 group-hover:shadow-2xl transition-all duration-500">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
                 <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700 border border-slate-100">
                   {React.cloneElement(service.icon, { className: 'w-14 h-14 text-blue-600' })}
                 </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="text-blue-600 font-black tracking-widest text-sm uppercase mb-5 flex items-center">
                 <span className="w-10 h-0.5 bg-blue-600 mr-4"></span>
                 Service {(index + 1).toString().padStart(2, '0')}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{service.title}</h2>
              <p className="text-slate-600 font-medium text-lg md:text-xl mb-10 leading-relaxed">
                {service.desc} We utilize state-of-the-art diagnostic tools and adhere strictly to OEM guidelines to deliver unparalleled service quality.
              </p>
              <button onClick={() => navigate('/contact')} className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-colors shadow-sm hover:shadow-lg flex items-center group/btn">
                Inquire About This Service <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

const ProductsPage = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Slider State & Refs
  const categoryScrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setShowLeftArrow(scrollLeft > 5);
      // Ensure robust cross-browser overflow check
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    // Initial check
    handleScroll();
    // Re-check after brief delay to allow layout and fonts to render
    const timer = setTimeout(handleScroll, 250);
    window.addEventListener('resize', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeCategory]);

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.usage && product.usage.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-24 pb-20 animate-in fade-in duration-500 bg-slate-50 min-h-screen">
       <SEOHead title="Product Catalog | Spares & Filtration" />
       
       <div className="bg-[#0A192F] text-white py-20 mb-12 relative overflow-hidden border-b-8 border-blue-600">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">Industrial Products</h1>
          <div className="w-20 h-1.5 bg-blue-500 mb-6 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl leading-relaxed">
            Explore our comprehensive catalog of high-performance industrial components. 
            Precision engineered for mission-critical rotating equipment and fluid systems.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6">
          <div className="relative w-full max-w-2xl mx-auto md:mx-0">
            <input 
              type="text" 
              placeholder="Search products, usage, or specs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-md"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400" />
          </div>

          {/* Interactive Category Slider */}
          <div className="relative w-full flex items-center group mt-2">
            
            {/* Left Scroll Indicator & Button */}
            <div className={`absolute left-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`}></div>
            <button
              onClick={() => scrollCategories('left')}
              className={`absolute left-0 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 hover:shadow-lg transition-all hover:scale-110 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={categoryScrollRef}
              onScroll={handleScroll}
              className="flex gap-3 overflow-x-auto w-full pb-6 pt-2 px-12 md:px-16 snap-x snap-mandatory scroll-smooth relative z-0 scrollbar-hide" 
            >
              {PRODUCT_CATEGORIES.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`snap-start shrink-0 px-6 py-3.5 rounded-full text-base font-black whitespace-nowrap transition-all duration-300 border-2 ${
                    activeCategory === category 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right Scroll Indicator & Button */}
            <div className={`absolute right-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`}></div>
            <button
              onClick={() => scrollCategories('right')}
              className={`absolute right-0 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 hover:shadow-lg transition-all hover:scale-110 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-300 shadow-sm">
             <Search className="w-20 h-20 text-slate-200 mx-auto mb-6" />
             <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">No products found</h3>
             <p className="text-slate-500 font-medium text-lg">Try adjusting your search or category filter.</p>
             <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}} className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition-colors shadow-lg">
               Clear all filters
             </button>
          </div>
        )}
      </div>
    </main>
  );
};

const ContactPage = () => {
  const [formState, setFormState] = useState({ status: 'idle', message: '', rfqBody: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ ...formState, status: 'loading', message: '' });
    setTimeout(() => {
      setFormState({ status: 'success', message: 'Technical Inquiry sent successfully. Our engineers will contact you shortly.', rfqBody: '' });
      e.target.reset();
    }, 1500);
  };

  return (
    <main className="pt-24 pb-20 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <SEOHead title="Contact Engineering Team" description="Send RFQs or request a technical quote for turbine engineering and spares." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight drop-shadow-sm">Contact Engineering</h1>
          <div className="w-24 h-1.5 bg-blue-600 mb-6 rounded-full shadow-md"></div>
          <p className="text-lg font-medium text-slate-500 max-w-2xl">
            Reach out to our engineering and procurement team for technical specifications, reverse engineering quotes, or emergency overhauling support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex items-start space-x-5 hover:border-blue-200 transition-colors">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-2">Direct Lines</h3>
                <p className="text-slate-600 font-bold text-base">{CONTACT_INFO.phones[0]}</p>
                <p className="text-slate-600 font-bold text-base">{CONTACT_INFO.phones[1]}</p>
              </div>
            </div>
            
            <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex items-start space-x-5 hover:border-blue-200 transition-colors">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-2">Email (RFQs)</h3>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-600 font-bold text-base hover:text-blue-600 block">{CONTACT_INFO.email}</a>
                <a href={`mailto:${CONTACT_INFO.marketingEmail}`} className="text-slate-600 font-bold text-base hover:text-blue-600 block">{CONTACT_INFO.marketingEmail}</a>
              </div>
            </div>
            
            <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex items-start space-x-5 hover:border-blue-200 transition-colors">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-2">Facility</h3>
                <p className="text-slate-600 font-bold text-sm leading-relaxed">{CONTACT_INFO.address}</p>
              </div>
            </div>

            <a href={CONTACT_INFO.indiamart} target="_blank" rel="noreferrer" className="bg-slate-900 p-8 border border-slate-800 rounded-3xl shadow-lg flex items-start space-x-5 hover:border-blue-500 transition-colors group block w-full">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                <CheckCircle2 className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <h3 className="font-black text-white text-lg mb-1 tracking-wide">IndiaMART Verified</h3>
                <p className="text-yellow-400 font-bold text-sm mb-1.5 tracking-widest">★★★★★ <span className="text-slate-300 ml-1 tracking-normal">4.3/5 Rating</span></p>
                <p className="text-blue-400 font-black text-xs uppercase tracking-widest">TrustSeal Supplier</p>
              </div>
            </a>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50">
              <div className="flex flex-col mb-8 border-b border-slate-100 pb-6">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight">Request a Technical Quote</h2>
              </div>
              
              {formState.status === 'success' && (
                <div className="mb-8 p-6 bg-green-50 border border-green-200 text-green-800 font-black rounded-xl flex items-center shadow-sm text-lg">
                  <CheckCircle2 className="w-8 h-8 mr-4 text-green-500 shrink-0" />
                  {formState.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Company Name *</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Email Address *</label>
                  <input required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Phone Number *</label>
                  <input required type="tel" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Inquiry Type *</label>
                  <select required defaultValue="" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Select an option...</option>
                    <option value="product">Product RFQ / Specification</option>
                    <option value="service">Turbine Overhauling Service</option>
                    <option value="reverse-engineering">Reverse Engineering</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Requirements / RFQ Details *</label>
                </div>

                <textarea 
                  required 
                  rows="6"
                  value={formState.rfqBody}
                  onChange={(e) => setFormState({...formState, rfqBody: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-inner"
                  placeholder="Enter your technical specifications or RFQ details here..."
                ></textarea>
              </div>

              <div className="mb-10 p-6 bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl hover:border-blue-400 transition-colors group">
                <label className="flex items-center text-sm font-black text-slate-700 mb-3 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                  <Paperclip className="w-5 h-5 mr-3" /> Attach Technical Drawings (Optional)
                </label>
                <input type="file" multiple className="w-full text-slate-700 file:cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-slate-900 file:text-white hover:file:bg-blue-600 transition-all cursor-pointer outline-none" />
              </div>

              <button type="submit" disabled={formState.status === 'loading'} className="w-full bg-blue-600 text-white py-5 rounded-xl font-black text-xl hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                Submit Technical Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Immersive Google Maps Embed */}
        <div className="mt-12 bg-white p-4 md:p-6 border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50">
          <div className="flex items-center mb-6 px-4 pt-4">
            <MapPin className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Our Manufacturing Facility</h3>
          </div>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
             <iframe 
                title="Keshav Enterprises Location"
                src="https://maps.google.com/maps?q=Keshav%20Enterprises,%20Shamli,%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
             ></iframe>
          </div>
        </div>

      </div>
    </main>
  );
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState(null, '', '#' + path);
    setCurrentPath(path);
  };

  const renderPage = () => {
    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.split('/')[2];
      return <ProductDetailsPage productId={productId} navigate={navigate} />;
    }
    switch (currentPath) {
      case '/': return <HomePage navigate={navigate} />;
      case '/services': return <ServicesPage navigate={navigate} />;
      case '/products': return <ProductsPage navigate={navigate} />;
      case '/contact': return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-[#FFFFFF] selection:bg-blue-600 selection:text-white text-[#111827]">
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <Navbar currentPath={currentPath} navigate={navigate} />
      <div className="flex-1 flex flex-col">{renderPage()}</div>
      <Footer navigate={navigate} />
      <WhatsAppFab />
    </div>
  );
}