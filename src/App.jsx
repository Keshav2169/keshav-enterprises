import React, {
  useState, useEffect, useRef, useCallback, useMemo, memo
} from 'react';
import {
  Menu, X, ChevronRight, Phone, Mail, MapPin,
  Settings, Wrench, Shield, Zap, Factory, ArrowRight,
  CheckCircle2, ExternalLink, MessageCircle, Activity, Droplets,
  Search, Layers, Target, Cpu, ArrowLeft, Paperclip,
  Filter, Hexagon, Cog, LifeBuoy, ChevronLeft,
  Award, Clock, TrendingUp, Users, Globe
} from 'lucide-react';

const CONTACT_INFO = {
  phones: ['+91 9149229448', '+91 6397363268'],
  email: 'ksengg007@gmail.com',
  secondaryEmail: 'ppshekher71@gmail.com',
  marketingEmail: 'ksenggmrkt007@gmail.com',
  address: 'Dayanand Nagar Gali No.2, Near Subash Ki Chakki, Shamli – 247776, U.P., India',
  whatsapp: '6397363268',
  indiamart: 'https://www.indiamart.com/keshav-enterprises-shamli/',
  gmapsShare: 'https://share.google/uLc4GwsGec5eM62Ep',
  gst: '09BRTPS5029K1ZC',
};

// PERF FIX: nav links defined outside component to prevent re-creation on every render
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Industries', path: '/industries' },
  { name: 'Contact', path: '/contact' },
];

const OEMS = ['Triveni','Siemens','BHEL','Belliss & Morcom','Maxwatt','Man Turbo','Chola Turbo','DLF-Skoda','KKK','ABB'];

// PERF FIX: icon map instead of JSX in data arrays (prevents React serialization issues)
const SERVICE_ICONS = { srv_1: Cog, srv_2: Wrench, srv_3: Hexagon, srv_4: Activity, srv_5: Droplets, srv_6: Target };

const SERVICES = [
  { id:'srv_1', title:'Turbine Erection & Commissioning',
    desc:'Expert erection and commissioning for steam turbines, pumps, compressors, fans, condensers, EOT cranes, and steam/water/air pipeline work. Includes complete OEM coordination and documentation.',
    details:['Steam turbines, pumps, compressors, fans, condensers','EOT cranes, steel structure & pipe line work','Construction supervision to OEM specs & applicable standards','Coordination with OEM throughout all phases','Complete documentation for handover to operations','Development & execution of pre-commissioning procedures','Assist with start-up and fine tuning to operational needs'],
    oems:['Triveni','Siemens','BHEL','Belliss India','Maxwatt'] },
  { id:'srv_2', title:'Turnkey Overhauling & Maintenance',
    desc:'Executed by ex-OEM engineers from Triveni, Siemens, BHEL, Belliss, and more. Includes pre-shutdown planning, on-site condition reporting, comprehensive spares management, and 24x7 emergency troubleshooting.',
    details:['Pre-shutdown planning with detailed scope of rotating equipment','Onsite inspection of stocked spare parts with shortfall reports','Ex-OEM engineers: Triveni, Belliss, Maxwatt, Man Turbo, BHEL, Siemens, KKK, ABB','All clearances, gaps and sizes measured and recorded','Condition report with recommendations for each component','Turnkey basis: tools, tackles, consumables & manpower provided','24x7 emergency response with engineers at multiple locations'],
    oems:['Triveni','Belliss India','Maxwatt','Man Turbo','BHEL','Siemens','KKK','ABB'] },
  { id:'srv_3', title:'Precision Reverse Engineering',
    desc:'PMI-verified reverse engineering using 3D laser scanners, CMM, and copying lathes for turbines from 5 kW to 27 MW. Generate full manufacturing drawings with tolerances, concentricity, pre/post heat treatment specs.',
    details:['3D Laser Scanner, CMM & Coordinate Measuring Machine at site/workshop','PMI testing for exact identification of material composition','Copying lathe for precision dimensional replication','Engineering drawings with tolerances, finish, parallelity, concentricity','Pre/post heat treatment specifications included','Rough machining, pre-final and final machining drawings','Covers turbines from 5 kW to 27 MW (Back Pressure or Condensing)','Single/Multi stage, Drive or Power, Horizontal or Vertical'],
    oems:['Triveni','Siemens','BHEL','All Makes'] },
  { id:'srv_4', title:'Dynamic Balancing & Rotor Machining',
    desc:'Precision rotor machining (grinding, polishing, journal undersizing) at our workshop lathes, plus ISO/API standard dynamic balancing from 50 to 2000 kg with full compliance reporting.',
    details:['Journal grinding & polishing with minimum undersizing technique','Labyrinth portion machining on precision lathes','Rotor set concentric at all portions before machining','Dynamic balancing 50-2000 kg to ISO/API standards','Balancing machines with latest vibration monitoring systems','Mechanical and electrical run-out identification pre-installation','Comprehensive balancing report documenting ISO/API compliance'],
    oems:['All Turbine Makes'] },
  { id:'srv_5', title:'Lube Oil Flushing',
    desc:'ISO-compliant flushing using purpose-built mobile centrifuge filter systems. Achieves maximum cleanliness and de-watering following construction or during scheduled maintenance.',
    details:['Purpose-built mobile centrifuge filter system','Targets system cleanliness per ISO 4406:99 standards','Oil sampling and reporting undertaken per ISO standards','Effective for post-construction and scheduled maintenance','Superior de-watering and contamination removal','Solid particle removal from 4 to 25 microns','System flow rates handled up to 6,000 l/min'],
    oems:['All Systems'] },
  { id:'srv_6', title:'Machine Alignment',
    desc:'Expert machine alignment using latest technology to eliminate misalignment, one of the primary causes of equipment failure. Covers turbines, gearboxes, pumps, fans, alternators, and induction generators.',
    details:['Turbine to gearbox & gearbox to mill gearbox alignment','Fan, pump, alternator, induction generator alignment','Machine levelling & pipe strain measurements on any frame size','Fiberizor, shredder alignment','Latest alignment technology for highest standards','Detailed alignment reporting with exact results','Covers any size machine frame in any location'],
    oems:['All Makes'] },
];

const PRODUCTS = [
  { id:'prod_f1', category:'Industrial Filtration', title:'Triveni Turbine Lube Oil Filter Elements',
    desc:'OEM-compatible lube oil filter elements for Triveni steam turbine lubrication systems. Ensures optimum fluid cleanliness per API 614 for extended bearing life.',
    usage:'Primary lube oil filtration in Triveni steam turbines used in sugar mills, power plants, paper mills, distilleries and agro industries.',
    features:['Triveni OEM Compatible — 180 GPM (approx. 680 LPM) rated flow','Filter media: Glass Fiber Fleece (VG) multilayer pleated construction','Filtration fineness: 6 VG, 10 VG, 16 VG, 25 VG grades available','High dirt-holding capacity; consistent efficiency at elevated differential pressure','High collapse resistance per ISO 2941','Material compatibility verified per ISO 2943','Sealing options: Nitrile (P) or Viton (V)','IS27 anti-static specification for oils below 300 pS/m conductivity','Compatible with mineral oils, emulsions, synthetic hydraulic/lube fluids','HSN Code: 8421'],
    specs:{'Flow Capacity':'180 GPM (680 LPM rated)','Filtration Fineness':'6-25 µm (beta20µm(c) >= 200 per ISO 16889)','Max Operating Pressure':'10 bar (145 psi)','Filter Media':'Glass Fiber Fleece (VG); SS Wire Mesh (G) available','Sealing Material':'Nitrile (P) / Viton (V)','OEM Compatibility':'Triveni Steam Turbines — all models','Standards':'ISO 16889, API 614','Anti-Static Option':'IS27 spec — oils below 300 pS/m conductivity','HSN Code':'8421'},
    images:['180-gpm-lube-filter-1.webp','180-gpm-lube-filter-2.webp','180-gpm-lube-filter-3.webp'] },
  { id:'prod_f2', category:'Industrial Filtration', title:'Siemens Turbine Control Oil Filter Elements',
    desc:'High-performance control oil filter elements for Siemens industrial turbines. Microglass deep media with IS27 anti-static specification protects hydraulic control systems.',
    usage:'Hydraulic control systems in Siemens industrial turbines; prevents electrostatic discharge in low-conductivity synthetic control oils.',
    features:['850 LPM flow rating for duplex turbine control filter applications','Microglass deep media — Eaton 01.E series dimensional compatible','IS27 Electrostatic Critical Application specification','Anti-static prevents discharge in synthetic oils below 300 pS/m','High collapse pressure per ISO 2941','Filtration fineness: 3 VG, 6 VG, 10 VG, 16 VG, 25 VG','Operating pressure: up to 16 bar (DWF series) / 63 bar (DU duplex series)','Sealing: Nitrile or Viton','ASME compliant: EN13445, AD2000, ASME Sec. VIII Div. 1','PED/CE certified housings available'],
    specs:{'Flow Capacity':'850 LPM (duplex control filter)','Filtration Fineness':'3-25 µm (microglass VG)','Max Operating Pressure':'Up to 63 bar (DU duplex housing)','Filter Media':'Microglass (VG) with IS27 anti-static treatment','Anti-Static Spec':'IS27 — oils below 300 pS/m conductivity','Housing Series':'DWF / DU / DA/EDA Duplex series compatible','Standards':'EN13445, AD2000, ASME Sec. VIII Div. 1, PED 2014/68/EC','OEM Compatibility':'Siemens industrial turbine control systems'},
    images:['850-lpm-siemens-filter-1.webp','850-lpm-siemens-filter-2.webp','850-lpm-siemens-filter-3.webp'] },
  { id:'prod_f3', category:'Industrial Filtration', title:'SS Wire Mesh (CEP) Centrifugal Filter Elements',
    desc:'Stainless steel wire mesh filter elements with single or multi-layer pleated construction. Surface filtration principle; cleanable and reusable. Ideal for high-temperature applications.',
    usage:'High-temperature fluid and gas filtration, hydraulic and lubrication systems where cleanable/reusable elements are preferred.',
    features:['SS 304 / SS 316 stainless steel wire mesh construction','Single or multi-layer pleated weave designs','Surface filtration principle (vs. depth filtration)','Available rating: 5-1500 µm or per special requirement','High collapse resistance and high burst strength','Compatible with wide range of hydraulic & lubrication fluids','Cleanable and reusable — reduced lifecycle cost','HSN Code: 8421'],
    specs:{'Material':'SS 304 / SS 316 Wire Mesh','Filtration Range':'5-1500 µm (custom available)','Construction':'Single or multi-layer pleated weave','Filtration Type':'Surface filtration','Reusability':'Cleanable & reusable','Fluid Compatibility':'All hydraulic & lubrication fluids','HSN Code':'8421'},
    images:['wire-mesh-centrifugal-filter-1.webp','wire-mesh-centrifugal-filter-2.webp','wire-mesh-centrifugal-filter-3.webp'] },
  { id:'prod_f4', category:'Industrial Filtration', title:'Tank Breather Filter Elements (NBF Series)',
    desc:'Glass fiber breather filter elements (Eaton 01.NBF dimensional compatible) preventing airborne contamination and moisture ingress into hydraulic and lube oil reservoirs.',
    usage:'Hydraulic tanks, gearboxes, and lube oil reservoirs for all steam turbine, compressor, and industrial machinery applications.',
    features:['Eaton 01.NBF series dimensional compatible — nominal sizes 25-125','Filter media: Glass fiber fleece (VL) — hydrophobic construction','Prevents airborne particulate and moisture ingestion','High dirt-holding capacity for extended service intervals','Viton (V) sealing for chemical resistance','Filtration grade: 3 VL micron for fine airborne contamination','Protects system cleanliness per ISO 4406:99','Tank-mount design with easy one-hand servicing'],
    specs:{'Series Compatibility':'Eaton 01.NBF (Sizes: 25, 40, 55, 85, 125)','Filter Media':'Glass Fiber Fleece (VL) — hydrophobic','Filtration Grade':'3 VL','Sealing':'Viton (V)','Installation':'Tank breather mount','Standards':'ISO 16889, ISO 4406:99 compatible'},
    images:['air-breather-filter-1.webp','air-breather-filter-2.webp','air-breather-filter-3.webp'] },
  { id:'prod_f5', category:'Industrial Filtration', title:'Hydraulic Suction Strainer Elements (AS/TS Series)',
    desc:'SS wire mesh suction filter elements (Eaton 01.AS / 01.TS dimensional compatible) for protecting sensitive hydraulic pumps. Inside-to-outside flow configuration.',
    usage:'Immersed in hydraulic reservoirs protecting system pumps; turbine auxiliary lube oil pump suction protection.',
    features:['Eaton 01.AS (sizes 180-631) / 01.TS (sizes 210-625) dimensional compatible','SS Wire Mesh (G) media — 10, 25, 40, 80 µm grades','Inside-to-outside flow configuration (unique to suction elements)','Low pressure drop prevents pump cavitation','Cleanable and reusable construction','Double open end (B) design for secure tank mounting','IS27 anti-static spec available for special applications'],
    specs:{'Series Compatibility':'Eaton 01.AS (180-631) / 01.TS (210-625)','Filter Media':'SS Wire Mesh (G)','Filtration Grades':'10, 25, 40, 80 µm','Flow Direction':'Inside-to-outside (suction)','End Design':'Double open end (B)','Application':'Tank-immersed suction pump protection'},
    images:['hydraulic-suction-strainer-1.webp','hydraulic-suction-strainer-2.webp','hydraulic-suction-strainer-3.webp'] },
  { id:'prod_f6', category:'Industrial Filtration', title:'WaterSorp Offline Filter Elements (WSNR Series)',
    desc:'Dual-function WaterSorp elements (Eaton 01.WSNR dimensional compatible) combining glass fiber filtration with water absorption layer. Removes solids AND absorbs free/emulsified water.',
    usage:'Offline filtration in side-stream return lines of turbine lube oil systems; extends oil life and protects bearings from water-induced damage.',
    features:['Eaton 01.WSNR WaterSorp dimensional compatible — sizes 250, 630, 1000','Media: Glass fiber fleece with integrated water absorption layer (WVG)','Dual-action: removes solids AND absorbs free/emulsified water simultaneously','Significantly reduces oil aging — extends drain intervals','High particulate retention via microglass pre-filter layer','Max operating pressure: 10 bar (145 psi)','Double open end (B) for WSNR housings','Sealing: Nitrile or Viton'],
    specs:{'Series Compatibility':'Eaton 01.WSNR (Sizes: 250, 630, 1000)','Filter Media':'Glass fiber fleece + water absorption layer (WVG)','Filtration Grades':'3 WVG, 10 WVG','Max Pressure':'10 bar (145 psi)','End Design':'Double open end (B)','Sealing':'Nitrile / Viton','Function':'Particulate removal + water absorption'},
    images:['watersorp-filter-1.webp','watersorp-filter-2.webp','watersorp-filter-3.webp'] },
  { id:'prod_f7', category:'Industrial Filtration', title:'PTFE Hydrophobic Air & Gas Filter Elements',
    desc:'Hydrophobic PTFE filtration elements for critical compressed air and process gas applications. Moisture-repellent construction prevents water droplet passage.',
    usage:'Compressed air systems, process gases, instrument air, and venting applications where moisture and chemical resistance are critical.',
    features:['Hydrophobic PTFE (Polytetrafluoroethylene) filter media','Moisture-repellent — water droplets cannot pass through media','High chemical resistance — compatible with aggressive gases','High flow rates at low differential pressure','Temperature range: -20 to +260 deg C','Cleanable and regenerable in most applications'],
    specs:{'Filter Media':'Hydrophobic PTFE','Temperature Range':'-20 to +260 deg C','Function':'Fine particulate + moisture separation','Chemical Resistance':'Excellent — wide pH range','Application':'Compressed air, process gas, instrument air','Key Feature':'Hydrophobic — water cannot penetrate media'},
    images:['ptfe-air-filter-1.webp','ptfe-air-filter-2.webp','ptfe-air-filter-3.webp'] },
  { id:'prod_st1', category:'Industrial Strainers', title:'Simplex Basket Strainer',
    desc:'Engineered and fabricated to ASME VIII Div.1 and ASME B31.3 for high-pressure pipeline protection. Low pressure drop at high velocities with SS perforated basket internals.',
    usage:'Liquid, viscous, and gaseous media filtration in high-pressure pipelines; protects valves, meters, and process equipment.',
    features:['Design standard: ASME VIII Div.1, ASME B31.3','MOC: Cast Steel or Stainless Steel; others on request','Pressure ratings: ASME Class 125, 150, 300, 600','Standard SS perforated basket internals','Low pressure drop at high flow velocities','Vents and drain connections as standard','Optional: Davit lifts, quick-open closures, DP gauges','Horizontal and vertical configurations','End connections: Flanged, butt-weld, screwed'],
    specs:{'Design Standard':'ASME VIII Div.1, ASME B31.3','MOC':'Cast Steel, SS 304/316 (others on request)','Pressure Rating':'ASME Class 125, 150, 300, 600','Basket Internals':'SS Perforated Basket (standard)','End Connections':'Flanged, Butt-Weld, Screwed','Orientation':'Horizontal or Vertical','Optional':'Davit lifts, Quick-open closures, DP Gauges'},
    images:['simplex-basket-strainer-1.webp','simplex-basket-strainer-2.webp','simplex-basket-strainer-3.webp'] },
  { id:'prod_st2', category:'Industrial Strainers', title:'Duplex Basket Strainer',
    desc:'Continuous-service duplex strainer enabling basket cleaning without process shutdown. Three-way changeover valve diverts flow while dirty basket is serviced.',
    usage:'Continuous flow systems requiring zero-downtime operation; critical process lines where shutdown is unacceptable.',
    features:['Continuous service — no shutdown or flow interruption required','Three-way changeover valve for fast chamber switching','Design: ASME VIII Div.1, ASME B31.3','MOC: Cast Steel or Stainless Steel','Pressure ratings: ASME Class 125, 150, 300, 600','SS perforated basket internals as standard','DP gauges available for clogging monitoring','Integrated pressure balance valve for easy changeover'],
    specs:{'Operation Mode':'Continuous (no shutdown)','Changeover':'Three-way ball valve','Design Standard':'ASME VIII Div.1, ASME B31.3','MOC':'Cast Steel, SS 304/316','Pressure Rating':'ASME Class 125, 150, 300, 600','Monitoring':'DP Gauges available'},
    images:['duplex-basket-strainer-1.webp','duplex-basket-strainer-2.webp','duplex-basket-strainer-3.webp'] },
  { id:'prod_st3', category:'Industrial Strainers', title:'Conical (Temporary) Strainer',
    desc:'Welded conical strainer installed between standard flanges to remove foreign matter during commissioning or startup.',
    usage:'Pipeline protection for downstream equipment; commissioning to catch weld splatter and construction debris.',
    features:['Welded conical mesh element','Installed between standard pipeline flanges','MOC: Stainless Steel SS 304/316 standard','Mesh size: Customizable per application','ASME Class 125, 150, 300, 600 available','Horizontal and vertical installation','End connections: Flanged, butt-weld, screwed'],
    specs:{'Design':'Welded conical wire mesh element','MOC':'SS 304/316','Mesh':'Customizable per requirement','Pressure Rating':'ASME Class 125-600','End Connections':'Flanged, Butt-Weld, Screwed','Installation':'Horizontal or Vertical'},
    images:['conical-strainer-1.webp','conical-strainer-2.webp','conical-strainer-3.webp'] },
  { id:'prod_st4', category:'Industrial Strainers', title:'Y-Type Strainer',
    desc:'Cast and welded Y-type strainer for liquid and gaseous pipelines. Y-configuration allows easy blow-off cleanout without line shutdown.',
    usage:'General pipeline protection; steam, water, gas, oil, and chemical service lines protecting downstream equipment.',
    features:['Cast and welded design — horizontal & vertical configurations','MOC: Cast Iron, Cast Steel, SS 304/316','Pressure ratings: ASME Class 125, 150, 300, 600','Easy blow-off cleanout port — no full disassembly','Mesh element size per application requirement','Service: Steam, water, gas, oil, chemical media'],
    specs:{'Design':'Cast & Welded Y-configuration','MOC':'Cast Iron, Cast Steel, SS 304/316','Pressure Rating':'ASME Class 125, 150, 300, 600','Cleanout':'Blow-off port','Media':'Steam, water, gas, oil, chemicals','End Connections':'Flanged, Butt-Weld, Screwed'},
    images:['y-type-strainer-1.webp','y-type-strainer-2.webp','y-type-strainer-3.webp'] },
  { id:'prod_e1', category:'Expansion Joints', title:'Stainless Steel Metallic Bellows Expansion Joint',
    desc:'Multi-ply SS metallic bellows absorbing thermal expansion in piping systems. Available DN 15 to DN 12,000. Fatigue, yield, and rupture tested per EJMA/ASME standards.',
    usage:'High-pressure steam exhaust systems, chemical process pipes, heat exchanger connections, and piping requiring thermal movement compensation.',
    features:['Material: SS 304/316L, Duplex, Incoloy 825/925, Inconel 625, Titanium, Hastelloy','Dimension range: DN 15 to DN 12,000','Pressure: Up to 150 barg (2176 psi); higher with ring reinforcement','Design codes: EN 14917, EJMA, ASME VIII Div.1, ASME B31.1/B31.3','Testing: Pneumatic, hydrostatic, airjet, vacuum, dye penetrant','Movement tests: Axial, lateral, angular; fatigue life cycle test','Forming: Rolling, punch, hydraulic bellows forming','Compliance: PED 2014/68/EC, AD2000'],
    specs:{'Material':'SS 304/316L, Duplex, Incoloy, Inconel, Hastelloy, Titanium','Dimension Range':'DN 15 to DN 12,000','Max Pressure':'150 barg (2176 psi); higher with reinforcement','Design Codes':'EN 14917, EJMA, ASME VIII Div.1, ASME B31.1/B31.3','Testing':'Pneumatic, hydrostatic, vacuum, dye penetrant, movement','Compliance':'PED 2014/68/EC, AD2000','Forming Methods':'Rolling, Punch, Hydraulic'},
    images:['ss-metallic-bellows-1.webp','ss-metallic-bellows-2.webp','ss-metallic-bellows-3.webp'] },
  { id:'prod_e2', category:'Expansion Joints', title:'Double Arch Rubber Expansion Joint',
    desc:'Heavy-duty double arch rubber joint with approx. 2x the movement capacity of single arch. Absorbs multi-directional movements, reduces noise, compensates misalignment.',
    usage:'Pumps, chillers, cooling towers, heavy fluid systems requiring greater movement than single arch allows.',
    features:['Double arch design: ~2x movement vs. single arch','Simultaneously absorbs axial, lateral, and angular movements','Reduces system noise and vibration','Compensates pipeline misalignment or offset','High-quality rubber compound','Tie rod assembly available and recommended','Flanged ends for standard installation'],
    specs:{'Architecture':'Double arch (twin convolution) rubber','Movement':'Axial, Lateral, Angular (dual-arch capacity)','Ends':'Flanged (standard)','Tie Rods':'Available — specially recommended','Applications':'Pumps, chillers, cooling towers'},
    images:['double-arch-rubber-joint-1.webp','double-arch-rubber-joint-2.webp','double-arch-rubber-joint-3.webp'] },
  { id:'prod_e3', category:'Expansion Joints', title:'Single Arch Rubber Expansion Joint',
    desc:'Standard single arch rubber expansion joint absorbing thermal movements and mechanical vibrations. Cost-effective for HVAC, water piping, and light industrial fluid lines.',
    usage:'HVAC systems, water piping, light industrial fluid lines, pump discharge and suction connections.',
    features:['Single arch convolution rubber construction','Absorbs thermal expansion and contraction','Reduces mechanical vibration transmission','Corrosion-resistant rubber compound','Available with or without internal sleeve','Flanged ends standard (PN10/PN16)','Wide arch variant available for larger movements'],
    specs:{'Architecture':'Single arch convolution','Compounds':'EPDM / Neoprene (CR) / NBR','End Connections':'Flanged (PN10/PN16)','Sleeve':'Optional — protects against particle impingement','Applications':'HVAC, water, light industrial'},
    images:['single-arch-rubber-joint-1.webp','single-arch-rubber-joint-2.webp','single-arch-rubber-joint-3.webp'] },
  { id:'prod_e4', category:'Expansion Joints', title:'Universal Metallic Expansion Joint',
    desc:'Twin-bellows metallic joint with intermediate pipe absorbing any combination of axial, lateral, and angular movement.',
    usage:'Complex piping requiring multi-axis movement; cryogenic lines, power plant crossovers.',
    features:['Twin bellows + intermediate pipe (universal configuration)','Absorbs axial, lateral, angular in any combination','Can absorb contraction in cryogenic applications','Tie rod assembly recommended for pressure thrust control','Material: SS 304/316L, Duplex, Incoloy, Inconel','Dimension range: DN 15 to DN 12,000','Design per EN 14917, EJMA, ASME VIII Div.1'],
    specs:{'Architecture':'Twin bellows + intermediate pipe','Movement':'Axial + Lateral + Angular (combined)','Material':'SS 304/316L, Duplex, Incoloy, Inconel','Dimension Range':'DN 15 to DN 12,000','Tie Rods':'Recommended (pressure thrust)','Design Codes':'EN 14917, EJMA, ASME VIII Div.1'},
    images:['universal-expansion-joint-1.webp','universal-expansion-joint-2.webp','universal-expansion-joint-3.webp'] },
  { id:'prod_e5', category:'Expansion Joints', title:'Non-Metallic Fabric Expansion Joint',
    desc:'Multi-layer fabric/PTFE/rubber composite joints with 5-layer construction. Internal abrasion liner, insulation, PTFE foil, outer cover, reinforcement. Handles up to 1200 deg C.',
    usage:'Boilers, bag filters, ESPs, gas turbine installations, cement plants, incineration, power station flue gas ductwork.',
    features:['5-layer construction: abrasion liner + insulation + PTFE foil + cover + reinforcement','Temperature capability: up to 1200 deg C (refractory-lined duct)','Styles: Belt, convoluted, vertical flange, floating sleeve, insulation bolster','Materials: PTFE, rubber, ceramic fiber, fiberglass, Nomex','Large axial, lateral, and angular movement capacity','Maximum vibration damping vs. metallic alternatives'],
    specs:{'Construction':'5-layer multi-material composite','Max Temperature':'Up to 1200 deg C (refractory-lined)','Materials':'PTFE, rubber, ceramic fiber, fiberglass, Nomex','Available Styles':'Belt, convoluted, vertical flange, floating sleeve, bolster','Applications':'Boilers, ESP, bag filters, gas turbines, cement, incineration','Movement':'Axial + Lateral + Angular (large capacity)'},
    images:['non-metallic-expansion-joint-1.webp','non-metallic-expansion-joint-2.webp','non-metallic-expansion-joint-3.webp'] },
  { id:'prod_e6', category:'Expansion Joints', title:'Pressure Balance Expansion Joint',
    desc:'In-line pressure balance joint absorbing axial movement and lateral deflection while neutralizing pressure thrust. Reduces piping support and anchor loads.',
    usage:'Turbine steam crossovers, pump connections, piping loops where pressure thrust must be contained.',
    features:['In-line pressure balance design neutralizes pressure thrust','Absorbs axial movement while containing thrust','Absorbs lateral deflection without anchor overloading','Material: SS 304/316L, Incoloy, Inconel','Design per EN 14917, EJMA, ASME VIII Div.1','Full pressure, movement, and fatigue test certification'],
    specs:{'Architecture':'In-line pressure balance bellows assembly','Function':'Neutralizes pressure thrust forces','Material':'SS 304/316L, Incoloy, Inconel','Design Codes':'EN 14917, EJMA, ASME VIII Div.1','Movement':'Axial + Lateral (thrust-balanced)','Testing':'Full pressure, movement, fatigue certification'},
    images:['pressure-balance-joint-1.webp','pressure-balance-joint-2.webp','pressure-balance-joint-3.webp'] },
  { id:'prod_ts1', category:'Turbine Spares', title:'Carbon & Graphite Gland Sealing Rings',
    desc:'Precision machined carbon and graphite seal rings for steam turbine gland sealing. Self-lubricating material maintains tight clearances at extreme temperatures.',
    usage:'Steam turbine gland sealing for pressure retention at shaft exits; gas turbine labyrinth shaft sealing.',
    features:['Self-lubricating carbon/graphite — no additional lubrication required','Precision CNC machined to OEM dimensional specifications','High temperature resistance: up to 600 deg C continuous','Low coefficient of friction — minimal shaft wear','Chemical inertness with steam, gases, most process media','Grades: Carbon graphite, electrographite, silicon carbide','Manufactured to tight clearances per OEM drawings'],
    specs:{'Material Grades':'Carbon graphite / Electrographite / Silicon Carbide','Max Temperature':'Up to 600 deg C continuous','Lubrication':'Self-lubricating (no oil required)','Application':'Turbine gland sealing at shaft exits','Machining':'Precision CNC to OEM dimensions'},
    images:['black-carbon-sealing-rings-1.webp','black-carbon-sealing-rings-2.webp','black-carbon-sealing-rings-3.webp'] },
  { id:'prod_ts2', category:'Turbine Spares', title:'Labyrinth Shaft Sealing Packings',
    desc:'Custom manufactured labyrinth seal segments and packings for steam turbine shaft sealing. High-temperature alloy with erosion-resistant teeth machined to OEM tight-clearance specifications.',
    usage:'Steam turbine shaft sealing between rotating and stationary components; prevents steam leakage along shaft at multiple pressure stages.',
    features:['High-temperature alloy: 410SS, Monel, Stellite options','Erosion-resistant labyrinth teeth profile','Precision machined to OEM diametral clearance specs','Radial, axial, and combined labyrinth configurations','Caulked-in and spring-back (retractable) designs available','Manufactured from reverse-engineered OEM drawings','PMI material verification before machining','Dimensional inspection report provided'],
    specs:{'Material':'410SS, Monel, Stellite — per OEM specification','Configurations':'Radial, Axial, Combined labyrinth','Design Types':'Caulked-in or Spring-back (retractable)','Clearances':'Precision OEM diametral clearance specification','Verification':'PMI material testing + dimensional inspection'},
    images:['labyrinth-sealing-packings-1.webp','labyrinth-sealing-packings-2.webp','labyrinth-sealing-packings-3.webp'] },
  { id:'prod_ts3', category:'Turbine Spares', title:'Babbitt Journal Bearings & Thrust Pads',
    desc:'Precision machined white metal (babbitt) journal and thrust bearings for critical rotating turbine equipment. Ultrasonic bond testing verifies babbitt-to-shell adhesion.',
    usage:'High-speed rotor support in steam turbines, compressors, and gearboxes; thrust load management in turbine thrust bearing housings.',
    features:['White metal (babbitt) — Tin-base or Lead-base per OEM specification','Precision CNC machined journal bearing bores to OEM tolerance','Thrust pads: Tilting pad or fixed profile designs available','Ultrasonic bond testing verifies babbitt adhesion — 100% tested','Shell material: Cast steel, bronze, or SS per application','Oil distribution grooves and feed holes machined precisely','High load capacity with hydrodynamic oil film support','Exact OEM dimensional replication via 3D scanning and CMM'],
    specs:{'Babbitt Metal':'White Metal — Tin-base or Lead-base','Shell Material':'Cast Steel, Bronze, SS (per OEM)','Bearing Types':'Journal bearing + Thrust Pad (tilting or fixed)','Bond Integrity Test':'Ultrasonic bond integrity verification — 100%','Machining':'Precision CNC to OEM tolerance','Dimensional Verification':'3D scanning + CMM measurement'},
    images:['babbitt-bearings-1.webp','babbitt-bearings-2.webp','babbitt-bearings-3.webp'] },
  { id:'prod_ts4', category:'Turbine Spares', title:'Emergency Stop Valves (ESV)',
    desc:'Mission-critical turbine emergency stop valves reverse-engineered and manufactured to precise dimensional standards. Stellite hard-faced seating surfaces for long service life.',
    usage:'Turbine over-speed protection; primary emergency shutdown valve in steam admission circuit.',
    features:['Reverse-engineered from OEM samples using 3D scanning and CMM','Stellite hard-faced seat and plug internals for erosion resistance','Spring-loaded rapid-closure mechanism — fail-safe closed','High-pressure pneumatic/hydraulic actuation available','Body material: Alloy steel (Cr-Mo) or SS 316','Hydrotest: 1.5x design pressure','Seat leakage test conducted per applicable standards','PMI verification + dimensional inspection report supplied'],
    specs:{'Function':'Emergency shutdown — fail-safe closed position','Actuation':'Spring-loaded + pneumatic or hydraulic trip','Seat/Plug Material':'Stellite hard-faced (erosion resistant)','Body Material':'Alloy steel Cr-Mo / SS 316','Pressure Testing':'Hydrotest at 1.5x design pressure','Seat Leakage':'Tested per applicable standards','Verification':'PMI certification + dimensional inspection report'},
    images:['emergency-stop-valve-1.webp','emergency-stop-valve-2.webp','emergency-stop-valve-3.webp'] },
  { id:'prod_ts5', category:'Turbine Spares', title:'Turbine Lube Oil Pumps & Mechanical Seals',
    desc:'OEM-dimensionally-matched replacement main and auxiliary lube oil pumps with precision mechanical seals. High volumetric efficiency with leak-proof mechanical seal assemblies.',
    usage:'Main and auxiliary lube oil systems in power generation turbines; supplying pressurized oil to bearings, governors, and control systems.',
    features:['Exact OEM dimensional match verified against drawing','Gear pump type — high volumetric efficiency','Precision mechanical face seal assembly — no packing','Shaft and gear dimensions verified per OEM drawing','Materials: Cast iron body, SS shaft, bronze bushing','Performance tested at rated pressure and flow before dispatch','Engineering drawing supplied with each pump'],
    specs:{'Pump Type':'Gear pump (main / auxiliary lube oil service)','Shaft Sealing':'Precision mechanical face seal','Materials':'Cast iron body / SS shaft / Bronze bushing','Testing':'Pressure and flow performance test at rated conditions','Documentation':'Engineering drawing supplied with each unit'},
    images:['turbine-oil-pumps-1.webp','turbine-oil-pumps-2.webp','turbine-oil-pumps-3.webp'] },
  { id:'prod_ts6', category:'Turbine Spares', title:'High-Purity Electrographite Sealing Rings',
    desc:'Specialized high-purity electrographite sealing rings for extreme temperature and pressure steam environments. Excellent thermal conductivity dissipates heat from gland area efficiently.',
    usage:'High-temperature steam gland sealing in power generation turbines; extreme pressure shaft sealing where standard carbon grades are inadequate.',
    features:['High-purity electrographite material grade','Excellent thermal conductivity for efficient gland heat dissipation','Extreme temperature resistance: up to 700 deg C and above','Chemical inertness with superheated steam and all process gases','Superior oxidation resistance versus standard carbon grades','Low friction coefficient — extends seal and shaft service life','Precision CNC machined to OEM dimensional specifications','Self-lubricating — eliminates need for external lubrication'],
    specs:{'Material':'High-purity electrographite','Max Temperature':'Up to 700 deg C+ (superheated steam service)','Thermal Conductivity':'High — effective gland heat dissipation','Chemical Resistance':'Steam, all process gases, chemicals','Lubrication':'Self-lubricating','Machining':'Precision CNC to OEM specification'},
    images:['high-purity-graphite-rings-1.webp','high-purity-graphite-rings-2.webp','high-purity-graphite-rings-3.webp'] },
  { id:'prod_ts7', category:'Turbine Spares', title:'Complete Turbine Rotor Assemblies',
    desc:'Fully manufactured and dynamically balanced turbine rotor assemblies built to exact OEM tolerances. Covers all stages from rough machining through to final precision machining and ISO/API dynamic balancing.',
    usage:'Complete rotating element replacement for steam turbines; re-wheeling of existing shafts with new discs and blades.',
    features:['Manufactured from reverse-engineered OEM drawings with PMI material verification','Material: Alloy steel (CrMoV, 12% Cr) per steam conditions','Precision machined: rough machining > pre-final > final','Dynamic balancing 50-2,000 kg to ISO 1940 / API 670','Complete balancing report with mechanical and electrical run-out data','Blade attachment options: Finger-tree, T-root, or dove-tail','Material upgrades available for life extension programs','Ready for immediate installation with full inspection certificates'],
    specs:{'Rotor Material':'Alloy Steel (CrMoV, 12% Cr) per steam conditions','Dynamic Balancing':'ISO 1940 / API 670 (capacity: 50-2,000 kg)','Machining Stages':'Rough machining > Pre-final > Final machining','Blade Root Options':'Finger-tree, T-root, Dove-tail','Documentation':'Full inspection certificate + balancing report','Material Upgrades':'Available for life extension programs'},
    images:['rotor-assembly-1.webp','rotor-assembly-2.webp','rotor-assembly-3.webp'] },
  { id:'prod_ts8', category:'Turbine Spares', title:'Precision Turbine Gears & Worm Wheels',
    desc:'High-precision gear sets and worm wheel assemblies reverse-engineered for turbine gearboxes and speed reducers. Precision hobbed with exact gear ratios and heat-treated for maximum wear resistance.',
    usage:'Turbine gearboxes, speed reducers, governor drive gear trains, and auxiliary equipment gear drives.',
    features:['Exact OEM gear ratios replicated via precision reverse engineering','Gear types: Spur, helical, bevel, and worm gear configurations','Precision hobbing and gear grinding to DIN Grade 6-8 quality','Heat treatment: Case hardening, through hardening, or nitriding','Material: Alloy steel (20MnCr5, 42CrMo4) per OEM specification','Surface hardness: 58-62 HRC (case hardened) or 250-320 HB (through hardened)','Gear profile and tooth geometry verified against OEM sample','Noise and vibration tests conducted post-assembly'],
    specs:{'Gear Types':'Spur, Helical, Bevel, Worm','Quality Grade':'DIN Grade 6-8 (precision hobbed/ground)','Material':'Alloy Steel — 20MnCr5, 42CrMo4','Heat Treatment':'Case hardening, through hardening, nitriding','Surface Hardness':'58-62 HRC (case) / 250-320 HB (through)','Verification':'Profile, tooth geometry, noise/vibration tests'},
    images:['gears-worm-wheels-1.webp','gears-worm-wheels-2.webp','gears-worm-wheels-3.webp'] },
  { id:'prod_ts9', category:'Turbine Spares', title:'Turbine Nozzles & Diaphragms',
    desc:'Critical steam path components engineered to direct and accelerate steam flow across each turbine stage for maximum efficiency. High-temperature erosion-resistant alloys.',
    usage:'Internal steam path of high-pressure industrial steam turbines; each pressure stage nozzle block and stationary diaphragm.',
    features:['Steam path design optimized for efficiency — nozzle angle and throat area per OEM','Material: 13% Cr steel, 316L SS, Incoloy for high-temperature stages','Erosion and corrosion-resistant surface treatment','Precise throat dimensions maintained per OEM specification','Diaphragm construction: Welded or cast per application','Integral or replaceable nozzle block designs available','Material upgrade available: Titanium or higher-alloy for life extension','Full dimensional inspection + PMI material certificate supplied'],
    specs:{'Material':'13% Cr Steel, 316L SS, Incoloy (stage-dependent)','Nozzle Design':'Optimized nozzle angle + throat area per OEM','Surface Treatment':'Erosion and corrosion resistant','Diaphragm Type':'Welded or cast; integral/replaceable nozzle block','Material Upgrades':'Titanium/high-alloy for life extension','Documentation':'Dimensional inspection + PMI material certificate'},
    images:['nozzles-diaphragms-1.webp','nozzles-diaphragms-2.webp','nozzles-diaphragms-3.webp'] },
  { id:'prod_ts10', category:'Turbine Spares', title:'Mechanical Centrifugal Speed Governors',
    desc:'Precision mechanical centrifugal governor assemblies maintaining exact RPM control in steam turbines. Fly-weight mechanism, speeder spring, and pilot valve assemblies included.',
    usage:'Turbine speed control and over-speed prevention; primary speed governing device in steam turbines without electronic governors.',
    features:['Fly-weight centrifugal mechanism with calibrated speeder springs','Pilot valve assembly for hydraulic amplification of control signal','High sensitivity: detects speed deviations within +/-1% RPM','Over-speed trip setpoint: typically 10% above rated speed','Robust all-mechanical design for continuous unattended operation','Calibrated setpoint before dispatch from workshop','Complete dimensional and performance test report provided'],
    specs:{'Governor Type':'Mechanical centrifugal fly-weight','Speed Sensitivity':'+/-1% RPM deviation detection','Over-speed Trip':'Typically 10% above rated operating speed','Control Amplification':'Hydraulic pilot valve (oil pressure signal)','Calibration':'Setpoint calibrated before dispatch','Documentation':'Performance test report supplied'},
    images:['mechanical-governors-1.webp','mechanical-governors-2.webp','mechanical-governors-3.webp'] },
  { id:'prod_ts11', category:'Turbine Spares', title:'Turbine Throttle (Control) Valves',
    desc:'High-pressure throttle and control valves for precise steam flow regulation into turbine stages. Stellite-trimmed internals for erosion resistance at high velocities.',
    usage:'Steam turbine inlet throttle control and multi-valve admission for power and back-pressure control.',
    features:['Stellite-trimmed stem, seat and plug internals','Body: Alloy steel (Cr-Mo) or SS 316 per steam conditions','Custom equal-percentage or linear flow characteristics','High-pressure rated (to turbine design pressure)','Rapid response action for governor integration','Hydraulic or pneumatic actuator options','Seat and plug hardness: 40-45 HRC (Stellite 6)','Hydrotest at 1.5x DP; seat leakage tested'],
    specs:{'Internals':'Stellite 6 trimmed (seat + plug + stem)','Body':'Alloy steel Cr-Mo / SS 316','Flow Characteristics':'Equal-percentage or linear (custom)','Actuation':'Hydraulic or pneumatic','Hardness':'40-45 HRC (Stellite 6)','Testing':'Hydrotest 1.5x DP + seat leakage test'},
    images:['throttle-valves-1.webp','throttle-valves-2.webp','throttle-valves-3.webp'] },
  { id:'prod_r1', category:'Industrial Rubber Products', title:'Custom Extruded Rubber Profiles & Seals',
    desc:'High-quality extruded rubber profiles in EPDM, Neoprene, Nitrile, and Natural Rubber for industrial sealing and dampening. Custom cross-section shapes produced to customer drawing.',
    usage:'Sealing panels, machine covers, door and window seals, industrial enclosure gaskets, vibration damping strip applications.',
    features:['Custom cross-section extrusion to customer drawing or sample','Materials: EPDM, Neoprene (CR), Nitrile (NBR), Natural Rubber','EPDM: Excellent weathering, ozone, UV resistance for outdoor use','Neoprene: Oil and flame resistant properties','Nitrile: Superior oil and fuel resistance','Hardness range: 40-80 Shore A per application','Operating temperature: -40 to +150 deg C (EPDM grade)','Available with pressure-sensitive adhesive backing'],
    specs:{'Material Options':'EPDM, Neoprene (CR), Nitrile (NBR), Natural Rubber','Hardness Range':'40-80 Shore A (customizable)','Operating Temperature':'-40 to +150 deg C (EPDM grade)','Profile':'Custom cross-section per drawing or sample','Backing Option':'Pressure-sensitive adhesive backing available','Supply Format':'Standard rolls or cut-to-length'},
    images:['extruded-rubber-profile-1.webp','extruded-rubber-profile-2.webp','extruded-rubber-profile-3.webp'] },
  { id:'prod_r2', category:'Industrial Rubber Products', title:'Heavy Duty Anti-Vibration Rubber Mounts',
    desc:'Industrial-grade anti-vibration rubber mounts bonded to steel plates for isolating heavy rotating machinery. Reduces structure-borne noise and vibration transmission.',
    usage:'Vibration isolation for turbine-generator sets, compressors, diesel generators, cooling tower fans, and heavy industrial machinery.',
    features:['Natural rubber to steel plate bonded (vulcanized) construction','High load bearing capacity per mounting point','Significantly reduces structure-borne noise and vibration','Protects foundations from dynamic machinery loads','Operating temperature: -30 to +70 deg C (continuous)','Types: Cylindrical, sandwich, conical, and bobbin mounts','Custom load ratings and natural frequency specifications available'],
    specs:{'Construction':'Rubber-to-steel bonded (vulcanized)','Mount Types':'Cylindrical, sandwich, conical, bobbin','Material':'Natural Rubber / Neoprene + Mild Steel','Operating Temperature':'-30 to +70 deg C continuous','Load Rating':'Custom per application requirement','Applications':'Turbine-generator, compressor, heavy machinery isolation'},
    images:['rubber-mounts-1.webp','rubber-mounts-2.webp','rubber-mounts-3.webp'] },
  { id:'prod_h1', category:'Flexible Hoses & Assemblies', title:'SS Corrugated Flexible Metal Hose Assemblies',
    desc:'Stainless steel corrugated hose with braided outer sheath for high-temperature, high-pressure, and chemically aggressive fluid transfer. Absorbs thermal expansion, vibration, and misalignment.',
    usage:'High-temperature steam lines, chemical transfer, vibration absorption at pump/compressor connections, cryogenic lines.',
    features:['SS 304 / SS 316L corrugated inner hose','Single or double SS braided outer sheath','OD range: 1/2 to 14 inch (DN 15 to DN 350)','Temperature: -20 to +350 deg C','Working pressure: 0.6 to 1.6 MPa (standard)','Ends: SS 304/316 BSP, NPT, BSPP threaded or flanged','Tested per ISO 10380 and SAE J1610','Absorbs axial, lateral, and angular movements simultaneously'],
    specs:{'Hose Material':'SS 304 / SS 316L corrugated + SS wire braid','Size Range':'1/2 to 14 inch (DN 15 to DN 350)','Temperature Range':'-20 to +350 deg C','Working Pressure':'0.6-1.6 MPa (single braid); higher with double braid','End Fittings':'BSP, NPT, Flanged — SS 304/316','Test Standards':'ISO 10380, SAE J1610'},
    images:['ss-corrugated-flexible-hose-1.webp','ss-corrugated-flexible-hose-2.webp','ss-corrugated-flexible-hose-3.webp'] },
  { id:'prod_h2', category:'Flexible Hoses & Assemblies', title:'PTFE Lined Smooth Bore Hose Assemblies',
    desc:'Smooth bore PTFE-lined hose with stainless steel outer braid. Non-stick inner surface prevents product contamination. Maximum chemical resistance for aggressive chemicals and high-purity applications.',
    usage:'Pharmaceutical fluid transfer, aggressive acids/alkalis, solvents, semiconductor chemicals, food-grade process lines.',
    features:['Smooth bore PTFE inner tube — non-stick, non-contaminating','SS 304 / SS 316 outer braided sheath','Chemically inert to virtually all industrial chemicals','FDA-compliant PTFE grade available for food and pharma','Operating temperature: -60 to +260 deg C','Working pressure: Up to 40 bar (size-dependent)','Anti-static conductive PTFE available','End fittings: NPT, BSP, flanged, tri-clamp'],
    specs:{'Inner Tube':'Smooth bore PTFE (FDA grade available)','Outer Braid':'SS 304 / SS 316','Temperature Range':'-60 to +260 deg C','Max Working Pressure':'Up to 40 bar (size-dependent)','Chemical Resistance':'Virtually all industrial chemicals','End Fittings':'Swaged SS — NPT, BSP, flanged, tri-clamp'},
    images:['ptfe-lined-hose-1.webp','ptfe-lined-hose-2.webp','ptfe-lined-hose-3.webp'] },
  { id:'prod_h3', category:'Flexible Hoses & Assemblies', title:'High-Pressure Hydraulic Rubber Hose Assemblies',
    desc:'Steel wire braid and spiral-reinforced rubber hydraulic hoses for extreme pressure service. Oil and weather-resistant cover suitable for turbine hydraulic control systems.',
    usage:'Heavy machinery hydraulic systems, turbine hydraulic control lines, industrial power units, mobile equipment hydraulics.',
    features:['Inner tube: Oil-resistant nitrile rubber','Reinforcement: High-tensile steel wire braid or 4-wire spiral wrap','Outer cover: Oil, weather, and abrasion-resistant black rubber','Working pressure: Up to 420 bar (4-spiral wrap, size-dependent)','MSHA approval for mining and hazardous location applications','Standards: EN 853, EN 856, SAE 100R1/R2/R12/R13','Operating temperature: -40 to +120 deg C','End fittings: Crimped CS/SS — JIC, BSP, NPT, SAE flange'],
    specs:{'Inner Tube':'Oil-resistant Nitrile (NBR) rubber','Reinforcement':'Steel wire braid / 4-wire spiral wrap','Outer Cover':'Oil/weather/abrasion-resistant rubber','Max Working Pressure':'Up to 420 bar (4-spiral, size-dependent)','Temperature Range':'-40 to +120 deg C','Standards':'EN 853, EN 856, SAE 100R1/R2/R12/R13, MSHA'},
    images:['hydraulic-rubber-hose-1.webp','hydraulic-rubber-hose-2.webp','hydraulic-rubber-hose-3.webp'] },
  { id:'prod_ee1', category:'Electronic Equipments', title:'Eddy Current Non-Contact Vibration Probes',
    desc:'High-precision non-contact eddy current displacement sensors for continuous turbine shaft vibration and axial position monitoring. API 670 standard compliant.',
    usage:'Continuous monitoring of shaft radial vibration, thrust position, and axial displacement in high-speed steam turbines, compressors, and rotating machinery.',
    features:['Non-contact eddy current measurement principle — no physical shaft contact','Measures shaft radial vibration amplitude and axial displacement','API 670 Standard compliant for machinery protection systems','Frequency response: DC to 10 kHz measurement bandwidth','Signal output: 4-20 mA (4-wire) or -24V DC voltage per driver','Probe measurement range: 0.25-2.5 mm (calibrated at 1.0 mm nominally)','Temperature: Probe -50 to +175 deg C; driver electronics -40 to +85 deg C','Sensitivity: 8 mV per µm standard calibration','Integral cable: Armoured stainless steel for harsh industrial environments'],
    specs:{'Measurement Principle':'Non-contact eddy current displacement','Standard Compliance':'API 670 — Machinery Protection Systems','Frequency Response':'DC to 10 kHz bandwidth','Signal Output':'4-20 mA or -24V DC (driver-dependent)','Sensitivity':'8 mV/µm (standard calibration)','Probe Gap Range':'0.25-2.5 mm (calibrated at 1.0 mm nominal)','Probe Temperature Rating':'-50 to +175 deg C','Cable Type':'Armoured stainless steel'},
    images:['vibration-probe-shinkawa-1.webp','vibration-probe-shinkawa-2.webp','vibration-probe-shinkawa-3.webp'] },
];

const PRODUCT_CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

const INDUSTRIES = [
  { id:'ind_1', title:'Power Generation', Icon:Zap, color:'from-yellow-500/20 to-amber-600/10', border:'border-yellow-500/30', accent:'text-yellow-500',
    desc:'Supplying critical overhauling services and OEM-compatible spares to thermal power plants operating steam turbines from 5 MW to 27 MW. Our ex-OEM engineers ensure maximum plant availability.',
    useCases:['Steam turbine major and minor overhauling','Turbine erection and commissioning','Lube oil system flushing per ISO 4406:99','Rotor dynamic balancing and alignment','Emergency stop valve manufacturing','Filter elements and strainers supply'],
    turbines:'5 MW – 27 MW' },
  { id:'ind_2', title:'Sugar Mills & Distilleries', Icon:Factory, color:'from-green-500/20 to-emerald-600/10', border:'border-green-500/30', accent:'text-green-500',
    desc:"Serving India's sugar industry with specialized back-pressure steam turbine services. Scheduled overhauling during off-season and emergency breakdown support during crushing season.",
    useCases:['Back-pressure turbine overhauling (inter-season)','Triveni and Belliss turbine specialist services','Carbon and graphite gland ring supply','Labyrinth packing manufacturing','Lube oil filtration products supply','Emergency 24x7 breakdown support'],
    turbines:'Triveni, Belliss & Morcom, Maxwatt' },
  { id:'ind_3', title:'Paper & Pulp Mills', Icon:Layers, color:'from-blue-500/20 to-cyan-600/10', border:'border-blue-500/30', accent:'text-blue-500',
    desc:'Paper mills operate steam turbines continuously and require precision maintenance to maintain uptime. We provide planned shutdown overhauling and critical spare components.',
    useCases:['Continuous-operation turbine maintenance planning','Duplex basket strainer supply for process lines','Expansion joint and bellows supply','Turbine spares manufacturing to OEM standards','Machine alignment services','Vibration monitoring equipment supply'],
    turbines:'Siemens, BHEL, Triveni' },
  { id:'ind_4', title:'Oil & Gas Industries', Icon:Droplets, color:'from-orange-500/20 to-red-600/10', border:'border-orange-500/30', accent:'text-orange-500',
    desc:'Oil and gas facilities demand the highest standards of precision engineering for turbine-driven compressors and pumps. Our API-compliant products meet the stringent requirements of upstream and downstream facilities.',
    useCases:['API 614-compliant lube oil filter elements','API 670-compliant vibration monitoring probes','PTFE-lined hose assemblies for chemical transfer','High-pressure hydraulic rubber hose assemblies','Babbitt bearing manufacturing for compressor trains','Dynamic balancing per ISO 1940/API 670'],
    turbines:'Siemens, Man Turbo, KKK, ABB' },
  { id:'ind_5', title:'Petrochemical & Refineries', Icon:Activity, color:'from-purple-500/20 to-violet-600/10', border:'border-purple-500/30', accent:'text-purple-500',
    desc:'Petrochemical plants and refineries require specialized metallic expansion joints, high-performance strainers, and precision turbine spares capable of handling aggressive media at elevated temperatures.',
    useCases:['Metallic bellows expansion joints (DN 15-12,000)','High-temperature PTFE filter and hose products','ASME-code strainers for process pipelines','Inconel and Hastelloy expansion bellows','Turbine steam path component manufacturing','High-pressure control valve manufacturing'],
    turbines:'All major makes' },
  { id:'ind_6', title:'Agro & Food Processing', Icon:Shield, color:'from-teal-500/20 to-cyan-600/10', border:'border-teal-500/30', accent:'text-teal-500',
    desc:'Agro-processing industries rely on steam for power generation and process heating. We supply filtration products, rubber components, and turbine maintenance services to keep agro-industrial steam systems running.',
    useCases:['Steam turbine maintenance for agro co-gen plants','FDA-grade PTFE hose for food-grade transfer lines','Rubber expansion joints for pump connections','Anti-vibration mounts for machinery isolation','Tank breather filters for oil storage systems','Y-type strainers for process fluid lines'],
    turbines:'Triveni, Maxwatt, Chola Turbo' },
];

// ─── STATIC MARQUEE CSS (Performance Fix — no <style> inside component) ──
const MARQUEE_CSS = `
  @keyframes ke-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  .ke-marquee{animation:ke-marquee 80s linear infinite;display:flex;width:max-content;will-change:transform}
  .ke-marquee-slow{animation:ke-marquee 160s linear infinite;display:flex;width:max-content;will-change:transform}
  .ke-marquee:hover,.ke-marquee-slow:hover{animation-play-state:paused}
  .scrollbar-hide::-webkit-scrollbar{display:none}
  .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
`;

// ─── LOCAL BUSINESS JSON-LD SCHEMA ────────────────────────────
const LOCAL_SCHEMA = {
  '@context':'https://schema.org','@type':'LocalBusiness',
  name:'Keshav Enterprises',
  description:'Industrial turbine engineering, overhauling, reverse engineering, and OEM-compatible spares manufacturer — Shamli, UP, India',
  url:'https://keshaventerprises.in',
  telephone:['+919149229448','+916397363268'],
  email:'ksengg007@gmail.com',
  address:{'@type':'PostalAddress',streetAddress:'Dayanand Nagar Gali No.2, Near Subash Ki Chakki',addressLocality:'Shamli',addressRegion:'Uttar Pradesh',postalCode:'247776',addressCountry:'IN'},
  geo:{'@type':'GeoCoordinates',latitude:29.4476,longitude:77.3003},
  openingHours:'Mo-Sa 09:00-18:00',
  sameAs:['https://www.indiamart.com/keshav-enterprises-shamli/'],
};

// ─── UTILITY ──────────────────────────────────────────────────
const waMsg = (text) => `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;

const getCategoryIcon = (category) => {
  const cls = 'w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500';
  switch(category){
    case 'Industrial Filtration': return <Filter className={cls}/>;
    case 'Industrial Strainers': return <Droplets className={cls}/>;
    case 'Expansion Joints': return <Layers className={cls}/>;
    case 'Turbine Spares': return <Cog className={cls}/>;
    case 'Flexible Hoses & Assemblies': return <Activity className={cls}/>;
    case 'Industrial Rubber Products': return <Hexagon className={cls}/>;
    case 'Electronic Equipments': return <Cpu className={cls}/>;
    default: return <Settings className="w-16 h-16 text-slate-300"/>;
  }
};

// ─── SEO HEAD (Accessibility + SEO Fix) ──────────────────────
const SEOHead = memo(({title, description, schema}) => {
  useEffect(() => {
    document.title = title ? `${title} | Keshav Enterprises` : 'Keshav Enterprises | Industrial Turbine Engineering — Shamli, UP';
    const setMeta = (sel, attr, val, content) => {
      let t = document.querySelector(sel); if(!t){t=document.createElement('meta');t.setAttribute(attr,val);document.head.appendChild(t);} t.content=content;
    };
    setMeta('meta[name="description"]','name','description', description || 'Precision turbine engineering, overhauling, reverse engineering, and OEM-compatible industrial spares — Keshav Enterprises, Shamli, UP, India.');
    setMeta('meta[property="og:title"]','property','og:title', title ? `${title} | Keshav Enterprises` : 'Keshav Enterprises | Industrial Turbine Engineering');
    setMeta('meta[property="og:description"]','property','og:description', description || 'Precision turbine engineering and OEM-compatible industrial spares — Shamli, UP, India.');
    setMeta('meta[property="og:type"]','property','og:type','website');
    setMeta('meta[property="og:locale"]','property','og:locale','en_IN');
    setMeta('meta[name="geo.region"]','name','geo.region','IN-UP');
    setMeta('meta[name="geo.placename"]','name','geo.placename','Shamli, Uttar Pradesh');
    setMeta('meta[name="geo.position"]','name','geo.position','29.4476;77.3003');
    setMeta('meta[name="ICBM"]','name','ICBM','29.4476, 77.3003');
    if(schema){
      let ld=document.getElementById('ld-json');
      if(!ld){ld=document.createElement('script');ld.id='ld-json';ld.type='application/ld+json';document.head.appendChild(ld);}
      ld.textContent=JSON.stringify(schema);
    }
  },[title,description,schema]);
  return null;
});

// ─── BRAND LOGO ───────────────────────────────────────────────
const BrandLogo = memo(({scrolled, forceWhite, navigate}) => {
  const [imgErr, setImgErr] = useState(false);
  const tc = forceWhite ? 'text-white' : (scrolled ? 'text-slate-900' : 'text-white');
  return (
    <a href="#/" onClick={e=>{e.preventDefault();navigate('/');}} aria-label="Keshav Enterprises — Home"
      className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm">
      {!imgErr
        ? <img src="keshav-logo.png" alt="Keshav Enterprises" width="48" height="48"
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
            onError={()=>setImgErr(true)}/>
        : <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-blue-400/30">
            <Settings className="w-6 h-6 text-white" aria-hidden="true"/>
          </div>
      }
      <div className={`font-black text-xl sm:text-2xl tracking-tight ${tc} flex items-center`}>
        KESHAV ENTERPRISES<span className="text-blue-500 ml-0.5" aria-hidden="true">.</span>
      </div>
    </a>
  );
});

const MakeInIndiaBadge = memo(() => {
  const [e,sE] = useState(false);
  return (
    <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl w-fit" role="img" aria-label="Make In India — Vocal For Local">
      {!e ? <img src="make-in-india.png" alt="Make In India" width="32" height="32" className="h-8 object-contain" onError={()=>sE(true)}/> : <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"><Zap className="w-4 h-4 text-white" aria-hidden="true"/></div>}
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none uppercase tracking-widest">Make In India</span>
        <span className="text-slate-300 text-[10px] font-extrabold leading-none uppercase tracking-wider mt-1">Vocal For Local</span>
      </div>
    </div>
  );
});

const IndiaMartBadge = memo(() => {
  const [e,sE] = useState(false);
  return (
    <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer"
      aria-label="View Keshav Enterprises on IndiaMART — Verified Supplier 4.3/5 rating"
      className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl hover:bg-white/10 transition-colors group cursor-pointer w-fit">
      {!e ? <div className="h-8 bg-white rounded px-1.5 flex items-center justify-center"><img src="indiamart-logo.png" alt="IndiaMART" width="60" height="20" className="h-5 object-contain" onError={()=>sE(true)}/></div>
           : <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true"/></div>}
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none tracking-widest">IndiaMART Verified</span>
        <span className="text-yellow-400 text-[10px] font-extrabold leading-none uppercase tracking-wider mt-1.5" aria-label="4.3 out of 5 stars">
          ★★★★★ <span className="text-blue-200 ml-1.5 tracking-widest">4.3/5 RATING</span>
        </span>
      </div>
    </a>
  );
});

// ─── PRODUCT CARD (Memoized) ─────────────────────────────────
const ProductCard = memo(({product, navigate}) => {
  const [imgErr, setImgErr] = useState(false);
  const pImg = product.images?.[0];
  return (
    <article onClick={()=>navigate(`/product/${product.id}`)}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group flex flex-col h-full cursor-pointer outline-none focus-within:ring-4 focus-within:ring-blue-500/50">
      <div className="h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent z-10 group-hover:opacity-0 transition-opacity" aria-hidden="true"/>
        <span className="absolute top-4 left-4 bg-white/95 text-slate-900 border border-slate-200 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded z-20 shadow-sm">{product.category}</span>
        {pImg && !imgErr
          ? <img src={pImg} alt={product.title} loading="lazy" decoding="async" width="400" height="192"
              className="w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
              onError={()=>setImgErr(true)}/>
          : <div className="z-0" aria-hidden="true">{getCategoryIcon(product.category)}</div>}
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col bg-gradient-to-b from-white to-slate-50/50">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
          <a href={`#/product/${product.id}`} onClick={e=>{e.stopPropagation();e.preventDefault();navigate(`/product/${product.id}`);}} className="focus:outline-none focus-visible:underline">{product.title}</a>
        </h3>
        <p className="text-slate-600 font-medium text-sm md:text-base mb-6 leading-relaxed line-clamp-2">{product.desc}</p>
        <div className="mb-6 flex items-start bg-blue-50/50 p-4 rounded-lg border border-blue-100/50 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
          <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" aria-hidden="true"/>
          <p className="text-sm text-slate-700 font-medium leading-relaxed line-clamp-2"><strong className="text-slate-900 font-bold">Application: </strong>{product.usage}</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-3 mt-auto pt-5 border-t border-slate-100">
          <a href={waMsg(`Hello KESHAV ENTERPRISES, I need a quotation for: ${product.title}.`)}
            target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
            aria-label={`Request quote for ${product.title} via WhatsApp`}
            className="flex-1 bg-[#25D366] text-white flex items-center justify-center py-3.5 text-sm font-bold rounded-lg hover:bg-[#1ebe5d] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true"/> RFQ / WhatsApp
          </a>
          <div className="flex-1 bg-slate-900 text-white flex items-center justify-center py-3.5 text-sm font-bold rounded-lg group-hover:bg-blue-600 transition-all pointer-events-none" aria-hidden="true">
            Technical Specs <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform"/>
          </div>
        </div>
      </div>
    </article>
  );
});

// ─── NAVBAR ───────────────────────────────────────────────────
const Navbar = memo(({currentPath, navigate}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>20);
    window.addEventListener('scroll',h,{passive:true});
    return ()=>window.removeEventListener('scroll',h);
  },[]);
  useEffect(()=>{
    if(!isOpen)return;
    const h=(e)=>{if(menuRef.current&&!menuRef.current.contains(e.target))setIsOpen(false);};
    document.addEventListener('mousedown',h);
    return ()=>document.removeEventListener('mousedown',h);
  },[isOpen]);
  useEffect(()=>{
    const h=(e)=>{if(e.key==='Escape')setIsOpen(false);};
    document.addEventListener('keydown',h);
    return ()=>document.removeEventListener('keydown',h);
  },[]);
  const isActive = useCallback((path)=>{
    if(path==='/'&&currentPath!=='/')return false;
    if(currentPath.startsWith('/product/')&&path==='/products')return true;
    return currentPath.startsWith(path);
  },[currentPath]);
  const handleNav = useCallback((path)=>{navigate(path);setIsOpen(false);},[navigate]);
  return (
    <nav ref={menuRef} role="navigation" aria-label="Main navigation"
      className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled?'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-3':'bg-[#0A192F] border-transparent py-5'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-[100] font-bold">Skip to main content</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <BrandLogo scrolled={scrolled} navigate={navigate}/>
          <div className="hidden lg:flex space-x-6 items-center">
            {NAV_LINKS.map(link=>(
              <a key={link.name} href={`#${link.path}`}
                onClick={e=>{e.preventDefault();handleNav(link.path);}}
                aria-current={isActive(link.path)?'page':undefined}
                className={`text-sm font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:underline ${isActive(link.path)?(scrolled?'text-blue-600':'text-blue-400'):(scrolled?'text-slate-600 hover:text-blue-600':'text-slate-300 hover:text-white')}`}>
                {link.name}
              </a>
            ))}
            <a href="#/contact" onClick={e=>{e.preventDefault();handleNav('/contact');}}
              className="bg-blue-600 text-white px-7 py-2.5 rounded font-bold hover:bg-blue-500 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
              Get Quote
            </a>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={()=>setIsOpen(!isOpen)} aria-label={isOpen?'Close navigation menu':'Open navigation menu'}
              aria-expanded={isOpen} aria-controls="mobile-nav"
              className={`p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${scrolled?'text-slate-900':'text-white'}`}>
              {isOpen?<X className="h-7 w-7" aria-hidden="true"/>:<Menu className="h-7 w-7" aria-hidden="true"/>}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div id="mobile-nav" className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100" role="menu">
          <div className="px-4 py-6 space-y-2">
            {NAV_LINKS.map(link=>(
              <a key={link.name} href={`#${link.path}`} role="menuitem"
                onClick={e=>{e.preventDefault();handleNav(link.path);}}
                aria-current={isActive(link.path)?'page':undefined}
                className={`block w-full text-left px-5 py-4 rounded-xl text-lg font-black tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive(link.path)?'text-blue-600 bg-blue-50 border border-blue-100':'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}>
                {link.name}
              </a>
            ))}
            <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to get a technical quote.')} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 bg-[#25D366] text-white px-5 py-4 rounded-xl text-lg font-black">
              <MessageCircle className="w-5 h-5" aria-hidden="true"/> WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
});

// ─── FOOTER ───────────────────────────────────────────────────
const Footer = memo(({navigate}) => (
  <footer className="bg-[#0A192F] text-slate-300 pt-20 pb-8 border-t-[8px] border-blue-600" role="contentinfo">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="mb-6"><BrandLogo scrolled={false} forceWhite={true} navigate={navigate}/></div>
          <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8">20+ years of excellence in industrial turbine engineering, reverse engineering, and precision manufacturing. Delivering reliability to power, sugar, and process industries across India.</p>
          <div className="flex flex-col space-y-4 mt-6"><MakeInIndiaBadge/><IndiaMartBadge/></div>
        </div>
        <nav aria-label="Footer quick links">
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Quick Links</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6" aria-hidden="true"/>
          <ul className="space-y-4">
            {NAV_LINKS.map(link=>(
              <li key={link.name}>
                <a href={`#${link.path}`} onClick={e=>{e.preventDefault();navigate(link.path);}}
                  className="text-slate-400 font-medium hover:text-white hover:translate-x-1 transition-all flex items-center text-sm focus:outline-none focus-visible:underline">
                  <ChevronRight className="w-4 h-4 mr-2 text-blue-500" aria-hidden="true"/> {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Our Services</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6" aria-hidden="true"/>
          <ul className="space-y-4">
            {['Overhauling & Maintenance','Reverse Engineering','Turbine Erection','Spares Manufacturing','Dynamic Balancing','Lube Oil Flushing'].map(s=>(
              <li key={s} className="text-slate-400 font-medium text-sm flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-500 shrink-0" aria-hidden="true"/> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Contact Us</h3>
          <div className="w-12 h-1 bg-blue-600 mb-6" aria-hidden="true"/>
          <address className="not-italic">
            <ul className="space-y-6">
              <li className="flex items-start"><MapPin className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" aria-hidden="true"/><span className="text-slate-400 font-medium text-sm leading-relaxed">{CONTACT_INFO.address}</span></li>
              <li className="flex items-start"><Phone className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" aria-hidden="true"/>
                <div className="text-slate-400 font-medium text-sm space-y-1">
                  {CONTACT_INFO.phones.map(p=><div key={p}><a href={`tel:${p.replace(/\s/g,'')}`} className="hover:text-white transition-colors">{p}</a></div>)}
                </div>
              </li>
              <li className="flex items-start"><Mail className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" aria-hidden="true"/>
                <div className="text-slate-400 font-medium text-sm space-y-1">
                  <div><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a></div>
                  <div><a href={`mailto:${CONTACT_INFO.marketingEmail}`} className="hover:text-white transition-colors">{CONTACT_INFO.marketingEmail}</a></div>
                </div>
              </li>
            </ul>
          </address>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 font-medium text-sm">© 2026 KESHAV ENTERPRISES. GST: {CONTACT_INFO.gst}. All rights reserved.</p>
        <p className="text-slate-600 font-medium text-xs">Shamli, Uttar Pradesh, India — Power · Sugar · Process Industries</p>
      </div>
    </div>
  </footer>
));

// ─── WHATSAPP + CALL FAB ─────────────────────────────────────
const FloatingButtons = memo(() => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <a href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g,'')}`}
      className="flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-full shadow-lg hover:bg-slate-50 hover:scale-105 transition-all group font-bold text-sm"
      aria-label={`Call Keshav Enterprises: ${CONTACT_INFO.phones[0]}`}>
      <Phone className="w-4 h-4 text-blue-600" aria-hidden="true"/>
      <span className="hidden group-hover:block">{CONTACT_INFO.phones[0]}</span>
    </a>
    <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to request a technical quote.')}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat with Keshav Enterprises on WhatsApp"
      className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300 group relative">
      <MessageCircle className="w-7 h-7" aria-hidden="true"/>
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chat with an Engineer</span>
    </a>
  </div>
));

// ─── PRODUCT DETAIL PAGE ─────────────────────────────────────
const ProductDetailPage = ({productId, navigate}) => {
  const [activeImg, setActiveImg] = useState(0);
  const [imgErr, setImgErr] = useState(false);
  const [tab, setTab] = useState('specs');
  const product = useMemo(()=>PRODUCTS.find(p=>p.id===productId),[productId]);
  useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});setActiveImg(0);setImgErr(false);setTab('specs');},[productId]);
  const related = useMemo(()=>product?PRODUCTS.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,3):[],[product]);
  const productSchema = useMemo(()=>product?{'@context':'https://schema.org','@type':'Product',name:product.title,description:product.desc,category:product.category,brand:{'@type':'Brand',name:'Keshav Enterprises'},offers:{'@type':'Offer',availability:'https://schema.org/InStock',seller:{'@type':'Organization',name:'Keshav Enterprises'},priceCurrency:'INR'}}:null,[product]);
  if(!product) return (
    <main id="main-content" className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center bg-slate-50">
      <SEOHead title="Product Not Found"/>
      <div><Settings className="w-20 h-20 text-slate-300 mx-auto mb-6" aria-hidden="true"/>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Product Not Found</h1>
        <button onClick={()=>navigate('/products')} className="text-blue-600 font-bold hover:underline text-lg">Return to Catalog</button>
      </div>
    </main>
  );
  const activeImage = product.images?.[activeImg];
  return (
    <main id="main-content" className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title={`${product.title} | ${product.category}`} description={`${product.desc} — Keshav Enterprises, Shamli, UP.`} schema={productSchema}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest flex-wrap gap-2">
          <button onClick={()=>navigate('/products')} className="hover:text-blue-600 transition-colors flex items-center focus:outline-none focus-visible:underline">
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true"/> Catalog
          </button>
          <span aria-hidden="true" className="mx-1">/</span>
          <button onClick={()=>navigate('/products')} className="hover:text-blue-600 transition-colors text-slate-400 focus:outline-none focus-visible:underline">{product.category}</button>
          <span aria-hidden="true" className="mx-1">/</span>
          <span className="text-slate-800 truncate max-w-[200px] md:max-w-full" aria-current="page">{product.title}</span>
        </nav>
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 lg:p-10 bg-white flex flex-col items-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden mb-6 shadow-inner"
                role="img" aria-label={`Product image of ${product.title}`}>
                {activeImage && !imgErr
                  ? <img src={activeImage} alt={`${product.title} view ${activeImg+1}`} loading="lazy" decoding="async" width="500" height="500"
                      className="w-full h-full object-contain p-8 mix-blend-multiply" onError={()=>setImgErr(true)}/>
                  : <div className="flex flex-col items-center justify-center opacity-30" aria-hidden="true">
                      {getCategoryIcon(product.category)}
                      <span className="mt-6 font-bold text-slate-500 uppercase tracking-widest text-sm">Image Pending</span>
                    </div>
                }
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-4 w-full overflow-x-auto pb-4 px-2 scrollbar-hide" role="list" aria-label="Product thumbnails">
                  {product.images.map((img,idx)=>(
                    <button key={idx} role="listitem"
                      onClick={()=>{setActiveImg(idx);setImgErr(false);}}
                      aria-label={`View image ${idx+1}`} aria-pressed={activeImg===idx}
                      className={`shrink-0 w-20 h-20 bg-white rounded-xl border-2 overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeImg===idx?'border-blue-600 shadow-lg scale-105':'border-slate-200 hover:border-blue-400 opacity-70 hover:opacity-100'}`}>
                      <img src={img} alt="" loading="lazy" width="80" height="80" className="w-full h-full object-cover p-2 mix-blend-multiply"
                        onError={e=>{e.target.closest('button').style.display='none';}}/>
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
                <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true"><Factory className="w-32 h-32 text-white"/></div>
                <div className="relative z-10">
                  <h2 className="font-black text-blue-400 text-sm uppercase tracking-widest mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-3" aria-hidden="true"/> Primary Industrial Application
                  </h2>
                  <p className="text-white font-medium text-base leading-relaxed">{product.usage}</p>
                </div>
              </div>
              <div role="tablist" aria-label="Product information" className="mb-6">
                <div className="flex border-b border-slate-200 mb-6 gap-1">
                  {[['specs','Technical Data'],['features','Key Features']].map(([k,label])=>(
                    <button key={k} role="tab" id={`tab-${k}`} aria-controls={`panel-${k}`} aria-selected={tab===k}
                      onClick={()=>setTab(k)}
                      className={`px-5 py-3 text-sm font-black uppercase tracking-wider rounded-t-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${tab===k?'bg-blue-600 text-white border-b-2 border-blue-600 -mb-px':'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                      {label}
                    </button>
                  ))}
                </div>
                <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
                  {tab==='specs' && product.specs && (
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <caption className="sr-only">Technical specifications for {product.title}</caption>
                        <tbody className="divide-y divide-slate-100">
                          {Object.entries(product.specs).map(([k,v],i)=>(
                            <tr key={i} className={`transition-colors hover:bg-blue-50/30 ${i%2===0?'bg-white':'bg-slate-50/50'}`}>
                              <th scope="row" className="p-4 w-2/5 text-slate-500 font-black text-xs uppercase tracking-widest border-r border-slate-100 text-left">{k}</th>
                              <td className="p-4 text-slate-800 font-semibold text-sm leading-relaxed">{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {tab==='features' && (
                    <ul className="border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
                      {product.features.map((f,i)=>(
                        <li key={i} className="bg-white hover:bg-slate-50 transition-colors p-4 md:p-5 text-slate-800 font-medium text-sm flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 mr-4 shrink-0 mt-0.5" aria-hidden="true"/>{f}
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
                  <MessageCircle className="w-6 h-6 mr-3" aria-hidden="true"/> Request Quote via WhatsApp
                </a>
                <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-white border-2 border-slate-900 text-slate-900 py-5 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-all shadow-sm hover:-translate-y-0.5 flex items-center justify-center tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                  <ExternalLink className="w-6 h-6 mr-3" aria-hidden="true"/> View on IndiaMART
                </a>
              </div>
            </div>
          </div>
        </div>
        {related.length>0 && (
          <section aria-labelledby="related-heading" className="mt-10">
            <h2 id="related-heading" className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Related Products in {product.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p=><ProductCard key={p.id} product={p} navigate={navigate}/>)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────
const HomePage = ({navigate}) => {
  const [loaded, setLoaded] = useState(false);
  const [heroErr, setHeroErr] = useState(false);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),100);return()=>clearTimeout(t);},[]);
  const featuredProducts = useMemo(()=>PRODUCTS.slice(0,16),[]);
  return (
    <main id="main-content" className="bg-white">
      <SEOHead title="Industrial Turbine Engineering & Spares — Shamli, UP" schema={LOCAL_SCHEMA}/>
      <style>{MARQUEE_CSS}</style>
      {/* Hero */}
      <section className="relative bg-[#0A192F] min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {!heroErr&&<img src="hero-background.png" alt="" width="1920" height="1080" fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover opacity-90" onError={()=>setHeroErr(true)}/>}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/40 rounded-full blur-[128px]"/>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-[128px]"/>
          <div className="absolute inset-0 bg-[#0A192F]/50 z-10"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/60 to-transparent z-10"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-transparent to-transparent z-10"/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-3/5">
            <div className={`transform transition-all duration-1000 ease-out ${loaded?'translate-y-0 opacity-100':'translate-y-12 opacity-0'}`}>
              <div className="flex flex-wrap items-center gap-4 mb-8"><MakeInIndiaBadge/><IndiaMartBadge/></div>
              <h1 id="hero-heading" className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl">
                Precision Engineering for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">Maximum Uptime.</span>
              </h1>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-r-2xl border-l-4 border-l-cyan-400 p-5 mb-10 max-w-xl shadow-xl">
                <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed">
                  Complete overhauling &amp; maintenance, rapid reverse engineering, and OEM-compatible turbine spares for turbines from 5 kW to 27 MW. Trusted across India's power generation and process industries.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                <button onClick={()=>navigate('/contact')}
                  className="bg-blue-600 text-white px-8 py-4 md:py-5 rounded-xl font-black hover:bg-blue-500 transition-all flex items-center justify-center text-lg md:text-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] group tracking-tight hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                  Request Technical Quote <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" aria-hidden="true"/>
                </button>
                <a href={waMsg('Hi KESHAV ENTERPRISES, we have an emergency breakdown. Please assist immediately.')}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-white/5 text-white border border-white/20 px-8 py-4 md:py-5 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center text-lg backdrop-blur-md hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <LifeBuoy className="mr-3 w-6 h-6 text-cyan-400" aria-hidden="true"/> Emergency Breakdown
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 hidden lg:flex flex-col gap-6" aria-hidden="true">
            {[
              {delay:'delay-300',label:'Proven Experience',Icon:Shield,title:'5 kW – 27 MW',sub:'Power range for erection, overhauling, and reverse engineering.'},
              {delay:'delay-500',label:'Technical Services',Icon:Wrench,title:'Zero Downtime',sub:'24x7 emergency support & 10 OEM-compatible turbine brands covered.'},
              {delay:'delay-700',label:'Precision Products',Icon:Factory,title:'OEM-Grade Spares',sub:'3D scanning, CMM & PMI for reverse-engineered ISO/API parts.'},
            ].map(({delay,label,Icon,title,sub},i)=>(
              <div key={i} className={`bg-gradient-to-br from-[#0A192F]/80 to-slate-900/80 backdrop-blur-xl border border-white/10 p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 ${delay} hover:border-blue-400/40 hover:-translate-y-2 group ${i===1?'ml-12':i===2?'ml-4':''} ${loaded?'translate-x-0 opacity-100':'translate-x-16 opacity-0'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-blue-300 text-xs font-black uppercase tracking-widest">{label}</div>
                  <Icon className="w-6 h-6 text-blue-400"/>
                </div>
                <div className="text-3xl font-black text-white tracking-tighter mb-2">{title}</div>
                <div className="text-sm text-slate-400 font-medium">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* OEM Brands */}
      <section className="bg-white py-12 md:py-16 border-b border-slate-100 overflow-hidden" aria-label="OEM-compatible brands">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <p className="text-center text-sm font-black text-slate-400 uppercase tracking-widest">OEM-Compatible &amp; Trusted By Industry Leaders</p>
        </div>
        <div className="relative w-full overflow-hidden flex items-center" aria-hidden="true">
          <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"/>
          <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"/>
          <div className="ke-marquee gap-8 md:gap-16 px-4">
            {[...OEMS,...OEMS].map((oem,i)=>(
              <div key={i} className="flex items-center justify-center shrink-0 w-40 md:w-56 h-20 p-2">
                <img src={`${oem.toLowerCase().replace(/[^a-z0-9]/g,'-')}-logo.png`} alt={`${oem} logo`} width="160" height="60"
                  className="max-h-full max-w-full object-contain"
                  onError={e=>{e.target.style.display='none';e.target.nextElementSibling?.classList.replace('hidden','flex');}}/>
                <div className="hidden items-center justify-center space-x-3 w-full">
                  <Factory className="w-8 h-8 text-slate-300 shrink-0"/>
                  <span className="text-sm md:text-base font-black text-slate-500 tracking-widest uppercase truncate">{oem}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="bg-slate-900 py-12 md:py-14 border-b border-slate-800" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Company statistics</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              {Icon:Clock,stat:'20+',label:'Years Experience',sub:'In turbine engineering'},
              {Icon:Settings,stat:'10+',label:'OEM Brands',sub:'Triveni, Siemens, BHEL & more'},
              {Icon:TrendingUp,stat:'27 MW',label:'Max Turbine',sub:'5 kW to 27 MW range'},
              {Icon:Users,stat:'24x7',label:'Emergency Support',sub:'Multi-location response'},
            ].map(({Icon,stat,label,sub},i)=>(
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <Icon className="w-6 h-6 text-blue-400" aria-hidden="true"/>
                </div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">{stat}</div>
                <div className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-xs text-slate-500 font-medium">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Products Marquee */}
      <section className="bg-slate-50 py-20 border-b border-slate-200 overflow-hidden" aria-labelledby="featured-products-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row justify-between items-end gap-6">
          <div>
            <h2 id="featured-products-heading" className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Featured Engineering Products</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full shadow-md" aria-hidden="true"/>
          </div>
          <button onClick={()=>navigate('/products')} className="hidden sm:flex items-center font-black text-blue-600 hover:text-blue-800 transition-colors text-lg tracking-tight group focus:outline-none focus-visible:underline">
            View Complete Catalog <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
          </button>
        </div>
        <div className="relative w-full overflow-hidden flex items-center" aria-hidden="true">
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"/>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"/>
          <div className="ke-marquee-slow gap-6 px-4 py-4">
            {[...featuredProducts,...featuredProducts].map((product,i)=>(
              <div key={`${product.id}-${i}`} onClick={()=>navigate(`/product/${product.id}`)}
                className="group flex flex-col shrink-0 w-72 md:w-80 bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
                  <span className="absolute top-4 left-4 bg-white/95 text-slate-900 border border-slate-200 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded z-20 shadow-sm">{product.category}</span>
                  {product.images?.[0]
                    ? <img src={product.images[0]} alt={product.title} loading="lazy" decoding="async" width="320" height="192"
                        className="w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                        onError={e=>{e.target.style.display='none';}}/>
                    : <div className="z-0" aria-hidden="true">{getCategoryIcon(product.category)}</div>}
                </div>
                <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-slate-50/50">
                  <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2">{product.title}</h3>
                  <p className="text-slate-600 font-medium text-sm mb-4 leading-relaxed line-clamp-2">{product.desc}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Explore Details</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm">
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" aria-hidden="true"/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center sm:hidden px-4">
          <button onClick={()=>navigate('/products')} className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-md flex items-center justify-center text-base">
            View Complete Catalog <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true"/>
          </button>
        </div>
      </section>
      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-200" aria-labelledby="services-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="services-preview-heading" className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Technical Services</h2>
            <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto mb-6" aria-hidden="true"/>
            <p className="text-slate-600 font-medium text-xl max-w-3xl mx-auto leading-relaxed">End-to-end turbine lifecycle services from erection through overhauling to precision reverse engineering.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service=>{
              const Icon = SERVICE_ICONS[service.id];
              return (
                <div key={service.id} className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" aria-hidden="true"/>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">{service.desc}</p>
                  <button onClick={()=>navigate('/services')} aria-label={`Learn more about ${service.title}`}
                    className="text-blue-600 font-bold text-sm flex items-center group-hover:gap-2 transition-all focus:outline-none focus-visible:underline">
                    Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <button onClick={()=>navigate('/services')}
              className="bg-slate-900 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-600 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              View All Services <ArrowRight className="inline ml-3 w-5 h-5" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </section>
      {/* Capabilities */}
      <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200" aria-labelledby="capabilities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h2 id="capabilities-heading" className="text-slate-900 text-4xl md:text-5xl font-black mb-6 tracking-tight">Precision Manufacturing.</h2>
            <div className="w-24 h-1.5 bg-blue-600 mb-8 rounded-full mx-auto md:mx-0" aria-hidden="true"/>
            <p className="text-slate-600 font-medium text-xl mb-12 leading-relaxed">
              We manufacture high-tolerance turbine spares, industrial strainers, and metallic expansion bellows (DN 15 to DN 12,000). Using 3D laser scanning, CMM, and PMI testing, we recreate obsolete components to exact specifications, drastically reducing plant downtime.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left" aria-label="Manufacturing capabilities">
              {['Reduced lead times vs. OEM sourcing (Triveni, Siemens, BHEL)','Material upgrades: Duplex, Incoloy, Inconel, Titanium, Hastelloy','ISO/API standard dynamic balancing (50-2,000 kg capacity)','Custom expansion bellows (DN 15-12,000, up to 150 barg)','Filter elements per ISO 16889, API 614, ASME & EN standards','Lube oil systems per ISO 4406:99 cleanliness classification'].map((item,i)=>(
                <li key={i} className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                  <Shield className="w-7 h-7 text-blue-500 mr-4 shrink-0" aria-hidden="true"/>
                  <span className="text-slate-800 font-bold text-base leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-blue-600 py-20" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Ready to Get Started?</h2>
          <p className="text-blue-100 font-medium text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Talk to our engineering team about your specific turbine or plant requirements.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button onClick={()=>navigate('/contact')}
              className="bg-white text-blue-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Request a Technical Quote
            </button>
            <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to discuss a project requirement.')} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-3 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300">
              <MessageCircle className="w-6 h-6" aria-hidden="true"/> WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

// ─── ABOUT PAGE ───────────────────────────────────────────────
const AboutPage = ({navigate}) => (
  <main id="main-content" className="pt-24 pb-20 bg-white">
    <SEOHead title="About Keshav Enterprises | 20+ Years Turbine Engineering"
      description="Keshav Enterprises — Shamli, UP. 20+ years delivering precision turbine engineering, overhauling, reverse engineering, and OEM-compatible spares to India's power and process industries."/>
    <div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">About Keshav Enterprises</h1>
        <div className="w-24 h-1.5 bg-blue-500 mb-8 rounded-full" aria-hidden="true"/>
        <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
          20+ years of precision engineering excellence serving India's power generation, sugar, paper, and process industries from Shamli, Uttar Pradesh.
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mb-24" aria-labelledby="about-intro">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="about-intro" className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Who We Are</h2>
            <div className="w-20 h-1.5 bg-blue-600 mb-8" aria-hidden="true"/>
            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-6">Keshav Enterprises is a specialized industrial engineering company based in Shamli, Uttar Pradesh, India. Established with a mission to deliver precision turbine engineering services and OEM-compatible industrial components, we have served India's most demanding industrial sectors for over two decades.</p>
            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-6">Our team comprises ex-OEM engineers from Triveni, Siemens, BHEL, Belliss &amp; Morcom, Man Turbo, KKK, and ABB — engineers with deep hands-on experience with the specific machines they service. This OEM-level expertise, combined with state-of-the-art reverse engineering tools (3D laser scanners, CMM, PMI testing), makes Keshav Enterprises the preferred maintenance partner for hundreds of industrial plants across India.</p>
            <p className="text-slate-600 font-medium text-lg leading-relaxed">We are a <strong className="text-slate-900">Make in India</strong> company and <strong className="text-slate-900">IndiaMART TrustSeal Verified</strong> supplier with a 4.3/5 customer rating.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[{Icon:Clock,stat:'20+',label:'Years Experience',color:'bg-blue-50 border-blue-200'},
              {Icon:Settings,stat:'10+',label:'OEM Brands',color:'bg-green-50 border-green-200'},
              {Icon:TrendingUp,stat:'27 MW',label:'Max Capacity',color:'bg-orange-50 border-orange-200'},
              {Icon:Award,stat:'4.3 ★',label:'IndiaMART Rating',color:'bg-yellow-50 border-yellow-200'},
            ].map(({Icon,stat,label,color},i)=>(
              <div key={i} className={`${color} border rounded-2xl p-8 text-center`}>
                <Icon className="w-8 h-8 text-blue-600 mx-auto mb-4" aria-hidden="true"/>
                <div className="text-3xl font-black text-slate-900 tracking-tight mb-2">{stat}</div>
                <div className="text-sm font-bold text-slate-600 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mb-24 bg-slate-900 rounded-3xl p-12 md:p-16" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="text-4xl font-black text-white tracking-tight mb-6 text-center">Our Mission</h2>
        <div className="w-20 h-1.5 bg-blue-500 mb-12 mx-auto" aria-hidden="true"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[{Icon:Target,title:'Maximum Uptime',desc:'To minimize unplanned downtime for our clients by providing rapid, precise turbine maintenance and a reliable supply of OEM-compatible spares — when and where they need them.'},
            {Icon:Shield,title:'OEM-Level Precision',desc:'To reverse-engineer and manufacture turbine components to exact OEM dimensional and material standards, ensuring drop-in compatibility and reliable long-term performance.'},
            {Icon:Globe,title:'Make in India',desc:"To contribute to India's industrial self-reliance by providing locally-manufactured, globally-competitive turbine spares and engineering services, reducing dependence on expensive overseas OEM sources."},
          ].map(({Icon,title,desc},i)=>(
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Icon className="w-8 h-8 text-blue-400" aria-hidden="true"/>
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">{title}</h3>
              <p className="text-slate-400 font-medium text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-24" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 text-center">Why Choose Keshav Enterprises?</h2>
        <div className="w-24 h-1.5 bg-blue-600 mb-12 mx-auto" aria-hidden="true"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{Icon:Award,title:'Ex-OEM Engineers',desc:'Our team includes engineers with direct OEM experience from Triveni, Siemens, BHEL, Belliss, Man Turbo, KKK, and ABB — providing genuine OEM-level insight on every job.'},
            {Icon:Settings,title:'3D Reverse Engineering',desc:'We use 3D laser scanners, CMM measurement, and PMI material testing to reverse-engineer obsolete or unavailable components to exact OEM standards.'},
            {Icon:Zap,title:'24x7 Emergency Response',desc:'Engineers stationed at multiple locations ensure rapid response to emergency turbine breakdowns — minimizing costly production stoppages.'},
            {Icon:Shield,title:'ISO/API Compliance',desc:'All manufactured components and services comply with relevant ISO, API, ASME, and EN standards, providing traceable quality documentation.'},
            {Icon:TrendingUp,title:'Reduced Lead Times',desc:'Our in-house manufacturing capability dramatically reduces delivery lead times versus ordering directly from overseas OEM sources.'},
            {Icon:Globe,title:'Complete Lifecycle Support',desc:'From turbine erection and commissioning through to end-of-life reverse engineering and rotor replacement — a complete lifecycle engineering partner.'},
          ].map(({Icon,title,desc},i)=>(
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" aria-hidden="true"/>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-blue-600 rounded-3xl p-12 text-center" aria-labelledby="about-cta">
        <h2 id="about-cta" className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6">Partner With Our Engineering Team</h2>
        <p className="text-blue-100 font-medium text-lg max-w-2xl mx-auto mb-8">Contact us to discuss your turbine maintenance requirements or request a technical quote.</p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button onClick={()=>navigate('/contact')} className="bg-white text-blue-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Contact Engineering Team</button>
          <button onClick={()=>navigate('/services')} className="bg-white/10 border border-white/30 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white">View Our Services</button>
        </div>
      </section>
    </div>
  </main>
);

// ─── SERVICES PAGE ────────────────────────────────────────────
const ServicesPage = ({navigate}) => (
  <main id="main-content" className="pt-24 pb-20 bg-white">
    <SEOHead title="Turbine Services — Overhauling, Erection & Reverse Engineering"
      description="Complete turbine overhauling, reverse engineering, erection & commissioning, dynamic balancing, lube oil flushing, and machine alignment for steam turbines 5 kW to 27 MW."/>
    <div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">Technical Services</h1>
        <div className="w-24 h-1.5 bg-blue-500 mb-8 rounded-full" aria-hidden="true"/>
        <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
          Specialized mechanical solutions for industrial rotating equipment from 5 kW to 27 MW. Ensuring peak reliability across power generation, sugar mills, paper mills, refineries, and petrochemical industries.
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-24 mt-12">
        {SERVICES.map((service,index)=>{
          const Icon = SERVICE_ICONS[service.id];
          return (
            <div key={service.id} className={`flex flex-col md:flex-row gap-16 items-start group ${index%2!==0?'md:flex-row-reverse':''}`}>
              <div className="md:w-2/5 w-full shrink-0">
                <div className="w-full aspect-[4/3] bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-center relative overflow-hidden shadow-xl group-hover:border-blue-200 group-hover:shadow-2xl transition-all duration-500 sticky top-28">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true"/>
                  <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700 border border-slate-100">
                    <Icon className="w-14 h-14 text-blue-600" aria-hidden="true"/>
                  </div>
                  {service.oems && (
                    <div className="absolute bottom-4 left-4 right-4" aria-label={`OEM expertise: ${service.oems.join(', ')}`}>
                      <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">OEM Expertise</p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.oems.slice(0,6).map(oem=>(
                            <span key={oem} className="text-[10px] font-black text-slate-300 bg-slate-700/60 px-2 py-1 rounded uppercase tracking-wide">{oem}</span>
                          ))}
                          {service.oems.length>6&&<span className="text-[10px] font-black text-blue-400 bg-blue-900/40 px-2 py-1 rounded uppercase tracking-wide">+{service.oems.length-6} more</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:w-3/5 w-full">
                <div className="text-blue-600 font-black tracking-widest text-sm uppercase mb-5 flex items-center" aria-hidden="true">
                  <span className="w-10 h-0.5 bg-blue-600 mr-4"/> Service {(index+1).toString().padStart(2,'0')}
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{service.title}</h2>
                <p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">{service.desc}</p>
                <div className="mb-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 px-6 py-4">
                    <h3 className="font-black text-white text-sm uppercase tracking-widest">What We Deliver</h3>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {service.details.map((detail,i)=>(
                      <li key={i} className="flex items-start px-6 py-4 hover:bg-blue-50/30 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mr-4 shrink-0 mt-0.5" aria-hidden="true"/>
                        <span className="text-slate-700 font-medium text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={()=>navigate('/contact')} aria-label={`Inquire about ${service.title}`}
                  className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-colors shadow-sm hover:shadow-lg flex items-center group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                  Inquire About This Service <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true"/>
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
const ProductsPage = ({navigate}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const handleScroll = useCallback(()=>{
    if(!categoryScrollRef.current)return;
    const {scrollLeft,scrollWidth,clientWidth}=categoryScrollRef.current;
    setShowLeft(scrollLeft>5);
    setShowRight(Math.ceil(scrollLeft+clientWidth)<scrollWidth-5);
  },[]);
  useEffect(()=>{
    handleScroll();
    const t=setTimeout(handleScroll,250);
    window.addEventListener('resize',handleScroll,{passive:true});
    return()=>{clearTimeout(t);window.removeEventListener('resize',handleScroll);};
  },[activeCategory,handleScroll]);
  const scrollCats = useCallback((dir)=>{
    categoryScrollRef.current?.scrollBy({left:dir==='left'?-350:350,behavior:'smooth'});
  },[]);
  // PERF FIX: useMemo for filtering
  const filtered = useMemo(()=>PRODUCTS.filter(p=>{
    if(activeCategory!=='All'&&p.category!==activeCategory)return false;
    const q=searchQuery.toLowerCase().trim();
    if(!q)return true;
    return p.title.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)||(p.usage&&p.usage.toLowerCase().includes(q))||p.features.some(f=>f.toLowerCase().includes(q));
  }),[activeCategory,searchQuery]);
  const counts = useMemo(()=>PRODUCT_CATEGORIES.reduce((a,c)=>{a[c]=c==='All'?PRODUCTS.length:PRODUCTS.filter(p=>p.category===c).length;return a;},{}),[]);
  return (
    <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title="Product Catalog — Turbine Spares, Filters, Expansion Joints"
        description={`${PRODUCTS.length} precision-engineered industrial products: turbine spares, filter elements, expansion joints, strainers, flexible hoses, rubber products, and electronic equipment.`}/>
      <div className="bg-[#0A192F] text-white py-20 mb-12 relative overflow-hidden border-b-8 border-blue-600">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">Industrial Products</h1>
          <div className="w-20 h-1.5 bg-blue-500 mb-6 rounded-full" aria-hidden="true"/>
          <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl leading-relaxed">{PRODUCTS.length} precision-engineered products across {PRODUCT_CATEGORIES.length-1} categories. ISO/API/ASME compliant with full technical specifications.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6">
          <div className="relative w-full max-w-2xl mx-auto md:mx-0">
            <label htmlFor="product-search" className="sr-only">Search products by name, specification, or application</label>
            <input id="product-search" type="search" placeholder="Search products, specs, applications..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-md"/>
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400 pointer-events-none" aria-hidden="true"/>
            {searchQuery&&<button onClick={()=>setSearchQuery('')} aria-label="Clear search" className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"><X className="w-5 h-5" aria-hidden="true"/></button>}
          </div>
          <div className="relative w-full flex items-center mt-2" role="group" aria-label="Filter by product category">
            <div className={`absolute left-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none transition-opacity ${showLeft?'opacity-100':'opacity-0'}`} aria-hidden="true"/>
            <button onClick={()=>scrollCats('left')} aria-label="Scroll categories left" className={`absolute left-0 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showLeft?'opacity-100':'opacity-0 pointer-events-none'}`}><ChevronLeft className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true"/></button>
            <div ref={categoryScrollRef} onScroll={handleScroll} className="flex gap-3 overflow-x-auto w-full pb-6 pt-2 px-12 md:px-16 snap-x snap-mandatory scroll-smooth relative z-0 scrollbar-hide">
              {PRODUCT_CATEGORIES.map(cat=>(
                <button key={cat} onClick={()=>setActiveCategory(cat)} aria-pressed={activeCategory===cat}
                  className={`snap-start shrink-0 px-5 py-3 rounded-full text-sm font-black whitespace-nowrap transition-all duration-300 border-2 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeCategory===cat?'bg-slate-900 text-white border-slate-900 shadow-lg scale-105':'bg-white text-slate-600 border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm'}`}>
                  {cat}<span className={`text-xs px-1.5 py-0.5 rounded-full font-black ${activeCategory===cat?'bg-white/20 text-white':'bg-slate-100 text-slate-500'}`}>{counts[cat]}</span>
                </button>
              ))}
            </div>
            <div className={`absolute right-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none transition-opacity ${showRight?'opacity-100':'opacity-0'}`} aria-hidden="true"/>
            <button onClick={()=>scrollCats('right')} aria-label="Scroll categories right" className={`absolute right-0 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showRight?'opacity-100':'opacity-0 pointer-events-none'}`}><ChevronRight className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true"/></button>
          </div>
          {(searchQuery||activeCategory!=='All')&&(
            <div className="flex items-center gap-3 -mt-2" role="status" aria-live="polite">
              <span className="text-sm font-bold text-slate-500">{filtered.length} product{filtered.length!==1?'s':''} found</span>
              <button onClick={()=>{setSearchQuery('');setActiveCategory('All');}} className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors focus:outline-none focus-visible:underline"><X className="w-4 h-4" aria-hidden="true"/>Clear filters</button>
            </div>
          )}
        </div>
        {filtered.length>0
          ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" role="list" aria-label={`${filtered.length} products`}>
              {filtered.map(p=><div key={p.id} role="listitem"><ProductCard product={p} navigate={navigate}/></div>)}
            </div>
          : <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-300 shadow-sm" role="status">
              <Search className="w-20 h-20 text-slate-200 mx-auto mb-6" aria-hidden="true"/>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">No products found</h2>
              <p className="text-slate-500 font-medium text-lg">Try adjusting your search or category filter.</p>
              <button onClick={()=>{setSearchQuery('');setActiveCategory('All');}} className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Clear all filters</button>
            </div>
        }
      </div>
    </main>
  );
};

// ─── INDUSTRIES PAGE ─────────────────────────────────────────
const IndustriesPage = ({navigate}) => (
  <main id="main-content" className="pt-24 pb-20 bg-white">
    <SEOHead title="Industries Served — Power, Sugar, Oil & Gas, Petrochemical"
      description="Keshav Enterprises serves power plants, sugar mills, paper mills, oil & gas, petrochemical, and agro industries with specialized turbine engineering and industrial products."/>
    <div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">Industries We Serve</h1>
        <div className="w-24 h-1.5 bg-blue-500 mb-8 rounded-full" aria-hidden="true"/>
        <p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">Specialized turbine engineering and industrial product solutions across six major industry verticals.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-16">
        {INDUSTRIES.map((ind,index)=>{
          const {Icon} = ind;
          return (
            <article key={ind.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className={`flex flex-col ${index%2!==0?'lg:flex-row-reverse':'lg:flex-row'}`}>
                <div className={`lg:w-2/5 bg-gradient-to-br ${ind.color} border-b lg:border-b-0 ${index%2!==0?'lg:border-l':'lg:border-r'} ${ind.border} p-12 flex flex-col items-center justify-center`}>
                  <div className={`w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl border ${ind.border} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`w-12 h-12 ${ind.accent}`} aria-hidden="true"/>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 text-center tracking-tight mb-3">{ind.title}</h2>
                  <div className={`text-sm font-black ${ind.accent} uppercase tracking-widest text-center`}>{ind.turbines}</div>
                </div>
                <div className="lg:w-3/5 p-10 lg:p-12">
                  <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">{ind.desc}</p>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-5">Key Applications & Products</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {ind.useCases.map((uc,i)=>(
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${ind.accent}`} aria-hidden="true"/>
                        <span className="text-slate-700 font-medium text-sm leading-relaxed">{uc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={()=>navigate('/contact')} aria-label={`Get a quote for ${ind.title} services`}
                      className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-sm flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                      Get a Quote <ArrowRight className="w-5 h-5" aria-hidden="true"/>
                    </button>
                    <a href={waMsg(`Hello KESHAV ENTERPRISES, I need engineering services for my ${ind.title} facility.`)} target="_blank" rel="noopener noreferrer"
                      aria-label={`WhatsApp inquiry for ${ind.title}`}
                      className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-black hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                      <MessageCircle className="w-5 h-5" aria-hidden="true"/> WhatsApp
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
  const [name,setName]=useState(''); const [email,setEmail]=useState('');
  const [phone,setPhone]=useState(''); const [iType,setIType]=useState('');
  const [details,setDetails]=useState(''); const [status,setStatus]=useState('idle');
  const [errors,setErrors]=useState({});
  const validate = ()=>{
    const e={};
    if(!name.trim()) e.name='Company name is required';
    if(!email.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email='Valid email is required';
    if(!phone.trim()||phone.replace(/\D/g,'').length<10) e.phone='Valid phone number required (10+ digits)';
    if(!iType) e.iType='Please select an inquiry type';
    if(!details.trim()||details.length<20) e.details='Please provide details (min 20 characters)';
    return e;
  };
  const handleSubmit = ()=>{
    const e=validate(); if(Object.keys(e).length>0){setErrors(e);return;}
    setErrors({}); setStatus('loading');
    const msg = `*New RFQ from Keshav Enterprises Website*\n\n*Company:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Inquiry Type:* ${iType}\n\n*Details:*\n${details}`;
    setTimeout(()=>{window.open(waMsg(msg),'_blank','noopener');setStatus('success');},800);
  };
  const inputClass = (err) => `w-full px-5 py-4 bg-slate-50 border rounded-xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${err?'border-red-400 bg-red-50':'border-slate-200'}`;
  return (
    <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title="Contact Engineering Team — Request a Technical Quote"
        description="Contact Keshav Enterprises for turbine engineering RFQs, reverse engineering quotes, and 24x7 emergency breakdown support. Phone: +91 9149229448."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Contact Engineering</h1>
          <div className="w-24 h-1.5 bg-blue-600 mb-6 rounded-full" aria-hidden="true"/>
          <p className="text-lg font-medium text-slate-500 max-w-2xl">Reach our engineering team for technical specifications, reverse engineering quotes, or 24x7 emergency overhauling support.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1 space-y-6">
            {[
              {Icon:Phone,title:'Direct Lines',content:<div className="space-y-2">{CONTACT_INFO.phones.map(p=><a key={p} href={`tel:${p.replace(/\s/g,'')}`} className="block text-slate-600 font-bold text-base hover:text-blue-600 transition-colors">{p}</a>)}</div>},
              {Icon:Mail,title:'Email (RFQs)',content:<div className="space-y-2">{[CONTACT_INFO.email,CONTACT_INFO.marketingEmail].map(e=><a key={e} href={`mailto:${e}`} className="block text-slate-600 font-bold text-sm hover:text-blue-600 transition-colors break-all">{e}</a>)}</div>},
              {Icon:MapPin,title:'Facility Address',content:<p className="text-slate-600 font-bold text-sm leading-relaxed">{CONTACT_INFO.address}</p>},
            ].map(({Icon,title,content},i)=>(
              <div key={i} className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex items-start space-x-5 hover:border-blue-200 transition-colors">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100"><Icon className="w-7 h-7 text-blue-600" aria-hidden="true"/></div>
                <div><h3 className="font-black text-slate-900 text-lg mb-2">{title}</h3>{content}</div>
              </div>
            ))}
            <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer" aria-label="View Keshav Enterprises on IndiaMART"
              className="bg-slate-900 p-8 border border-slate-800 rounded-3xl shadow-lg flex items-start space-x-5 hover:border-blue-500 transition-colors group block w-full">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500/50 transition-colors"><CheckCircle2 className="w-7 h-7 text-green-400" aria-hidden="true"/></div>
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
              {status==='success'&&(
                <div role="status" aria-live="polite" className="mb-8 p-6 bg-green-50 border border-green-200 text-green-800 font-black rounded-xl flex items-center shadow-sm text-lg">
                  <CheckCircle2 className="w-8 h-8 mr-4 text-green-500 shrink-0" aria-hidden="true"/>
                  Your inquiry has been sent to our engineers via WhatsApp. We will respond within 24 hours.
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label htmlFor="c-name" className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Company Name <span aria-hidden="true">*</span></label>
                  <input id="c-name" type="text" value={name} onChange={e=>setName(e.target.value)} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name?'err-name':undefined} className={inputClass(errors.name)}/>
                  {errors.name&&<p id="err-name" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Email Address <span aria-hidden="true">*</span></label>
                  <input id="c-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email?'err-email':undefined} className={inputClass(errors.email)}/>
                  {errors.email&&<p id="err-email" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label htmlFor="c-phone" className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Phone Number <span aria-hidden="true">*</span></label>
                  <input id="c-phone" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" aria-required="true" aria-invalid={!!errors.phone} aria-describedby={errors.phone?'err-phone':undefined} className={inputClass(errors.phone)}/>
                  {errors.phone&&<p id="err-phone" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="c-type" className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Inquiry Type <span aria-hidden="true">*</span></label>
                  <select id="c-type" value={iType} onChange={e=>setIType(e.target.value)} aria-required="true" aria-invalid={!!errors.iType} aria-describedby={errors.iType?'err-type':undefined} className={inputClass(errors.iType)+' appearance-none cursor-pointer'}>
                    <option value="" disabled>Select an option...</option>
                    <option value="Filter Element RFQ">Filter Element RFQ (specify OEM)</option>
                    <option value="Expansion Joint RFQ">Expansion Joint / Bellows RFQ</option>
                    <option value="Turbine Spares RFQ">Turbine Spares (Triveni/Siemens/BHEL)</option>
                    <option value="Turbine Overhauling Service">Turbine Overhauling Service</option>
                    <option value="Reverse Engineering">Reverse Engineering / 3D Scanning</option>
                    <option value="Lube Oil Flushing">Lube Oil Flushing Service</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {errors.iType&&<p id="err-type" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.iType}</p>}
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="c-details" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Requirements / RFQ Details <span aria-hidden="true">*</span></label>
                <textarea id="c-details" rows={6} value={details} onChange={e=>setDetails(e.target.value)} aria-required="true" aria-invalid={!!errors.details} aria-describedby={errors.details?'err-details':undefined}
                  className={inputClass(errors.details)+' resize-none shadow-inner'}
                  placeholder="Include: OEM/turbine make, model number, quantity, drawing number, or any technical specifications..."/>
                {errors.details&&<p id="err-details" role="alert" className="text-red-600 text-xs font-bold mt-2">{errors.details}</p>}
              </div>
              <div className="mb-10 p-6 bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl hover:border-blue-400 transition-colors">
                <label htmlFor="c-files" className="flex items-center text-sm font-black text-slate-700 mb-3 uppercase tracking-widest cursor-pointer">
                  <Paperclip className="w-5 h-5 mr-3" aria-hidden="true"/> Attach Technical Drawings / Datasheet (Optional)
                </label>
                <input id="c-files" type="file" multiple aria-label="Attach technical drawings or datasheets (optional)"
                  className="w-full text-slate-700 file:cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-slate-900 file:text-white hover:file:bg-blue-600 transition-all cursor-pointer outline-none"/>
              </div>
              <button type="button" onClick={handleSubmit} disabled={status==='loading'}
                className="w-full bg-blue-600 text-white py-5 rounded-xl font-black text-xl hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                aria-live="polite">
                {status==='loading'
                  ? <><span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"/>Submitting...</>
                  : <><MessageCircle className="w-6 h-6" aria-hidden="true"/>Submit via WhatsApp</>}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-white p-4 md:p-6 border border-slate-200 rounded-3xl shadow-xl">
          <div className="flex items-center mb-6 px-4 pt-4">
            <MapPin className="w-6 h-6 text-blue-600 mr-3" aria-hidden="true"/>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Our Manufacturing Facility — Shamli, U.P.</h2>
          </div>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
            <iframe title="Keshav Enterprises location map — Shamli, Uttar Pradesh"
              src="https://maps.google.com/maps?q=Keshav%20Enterprises,%20Shamli,%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"/>
          </div>
        </div>
      </div>
    </main>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {
  const [currentPath, setCurrentPath] = useState(()=>window.location.hash.replace('#','')||'/');
  useEffect(()=>{
    const h=()=>setCurrentPath(window.location.hash.replace('#','')||'/');
    window.addEventListener('popstate',h);
    return()=>window.removeEventListener('popstate',h);
  },[]);
  const navigate = useCallback((path)=>{
    window.history.pushState(null,'',`#${path}`);
    setCurrentPath(path);
    requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'smooth'}));
  },[]);
  // PERF FIX: useMemo for page rendering
  const page = useMemo(()=>{
    if(currentPath.startsWith('/product/')) return <ProductDetailPage productId={currentPath.split('/')[2]} navigate={navigate}/>;
    switch(currentPath){
      case '/': return <HomePage navigate={navigate}/>;
      case '/about': return <AboutPage navigate={navigate}/>;
      case '/services': return <ServicesPage navigate={navigate}/>;
      case '/products': return <ProductsPage navigate={navigate}/>;
      case '/industries': return <IndustriesPage navigate={navigate}/>;
      case '/contact': return <ContactPage/>;
      default: return <HomePage navigate={navigate}/>;
    }
  },[currentPath,navigate]);
  return (
    <div className="font-sans min-h-screen flex flex-col bg-white selection:bg-blue-600 selection:text-white text-[#111827]">
      <Navbar currentPath={currentPath} navigate={navigate}/>
      <div className="flex-1 flex flex-col">{page}</div>
      <Footer navigate={navigate}/>
      <FloatingButtons/>
    </div>
  );
}
