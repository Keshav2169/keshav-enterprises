import React, {
  useState, useEffect, useRef, useCallback, useMemo, memo
} from 'react';
import {
  Menu, X, ChevronRight, Phone, Mail, MapPin,
  Settings, Wrench, Shield, Zap, Factory, ArrowRight,
  CheckCircle2, ExternalLink, MessageCircle, Activity, Droplets,
  Search, Layers, Target, Cpu, ArrowLeft, Paperclip,
  Filter, Hexagon, Cog, LifeBuoy, ChevronLeft,
  Award, Clock, TrendingUp, Users, Globe, BookOpen, Tag, Calendar, User,
  Star, Building2, Gauge, FlaskConical, Hammer, BarChart3, Eye,
  ChevronDown, Play, Briefcase, Heart, Lightbulb, Truck
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   CONTACT & SITE CONFIG
   ───────────────────────────────────────────────────────────── */
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
  linkedin: 'https://www.linkedin.com/in/keshav-enterprises-825a473b8',
  linkedinHandle: 'Keshav Enterprises',
  instagram: 'https://www.instagram.com/ksengg007?igsh=b3BrNDRpdHhkMDBm',
  instagramHandle: '@ksengg007',
};

const NAV_LINKS = [
  { name: 'Home',       path: '/' },
  { name: 'About',      path: '/about' },
  { name: 'Services',   path: '/services' },
  { name: 'Products',   path: '/products' },
  { name: 'Industries', path: '/industries' },
  { name: 'Blog',       path: '/blog' },
  { name: 'Contact',    path: '/contact' },
];

const OEMS = ['Triveni','Siemens','BHEL','Belliss & Morcom','Maxwatt','Man Turbo','Chola Turbo','DLF-Skoda','KKK','ABB'];

const SERVICE_ICONS = { srv_1: Cog, srv_2: Wrench, srv_3: Hexagon, srv_4: Activity, srv_5: Droplets, srv_6: Target };

/* ─────────────────────────────────────────────────────────────
   SERVICES DATA
   ───────────────────────────────────────────────────────────── */
const SERVICES = [
  { id:'srv_1', image:'service-turbine-erection.webp',
    title:'Turbine Erection & Commissioning',
    desc:'Expert erection and commissioning for steam turbines, pumps, compressors, fans, condensers, EOT cranes, and steam/water/air pipeline work. Includes complete OEM coordination and documentation.',
    details:['Steam turbines, pumps, compressors, fans, condensers','EOT cranes, steel structure & pipe line work','Construction supervision to OEM specs & applicable standards','Coordination with OEM throughout all phases','Complete documentation for handover to operations','Development & execution of pre-commissioning procedures','Assist with start-up and fine tuning to operational needs'],
    oems:['Triveni','Siemens','BHEL','Belliss India','Maxwatt'] },
  { id:'srv_2', image:'service-overhauling.webp',
    title:'Turnkey Overhauling & Maintenance',
    desc:'Executed by ex-OEM engineers from Triveni, Siemens, BHEL, Belliss, and more. Includes pre-shutdown planning, on-site condition reporting, comprehensive spares management, and 24x7 emergency troubleshooting.',
    details:['Pre-shutdown planning with detailed scope of rotating equipment','Onsite inspection of stocked spare parts with shortfall reports','Ex-OEM engineers: Triveni, Belliss, Maxwatt, Man Turbo, BHEL, Siemens, KKK, ABB','All clearances, gaps and sizes measured and recorded','Condition report with recommendations for each component','Turnkey basis: tools, tackles, consumables & manpower provided','24x7 emergency response with engineers at multiple locations'],
    oems:['Triveni','Belliss India','Maxwatt','Man Turbo','BHEL','Siemens','KKK','ABB'] },
  { id:'srv_3', image:'service-reverse-engineering.webp',
    title:'Precision Reverse Engineering',
    desc:'PMI-verified reverse engineering using 3D laser scanners, CMM, and copying lathes for turbines from 5 kW to 27 MW. Generate full manufacturing drawings with tolerances, concentricity, pre/post heat treatment specs.',
    details:['3D Laser Scanner, CMM & Coordinate Measuring Machine at site/workshop','PMI testing for exact identification of material composition','Copying lathe for precision dimensional replication','Engineering drawings with tolerances, finish, parallelity, concentricity','Pre/post heat treatment specifications included','Rough machining, pre-final and final machining drawings','Covers turbines from 5 kW to 27 MW (Back Pressure or Condensing)'],
    oems:['Triveni','Siemens','BHEL','All Makes'] },
  { id:'srv_4', image:'service-dynamic-balancing.webp',
    title:'Dynamic Balancing & Rotor Machining',
    desc:'Precision rotor machining (grinding, polishing, journal undersizing) at our workshop lathes, plus ISO/API standard dynamic balancing from 50 to 2000 kg with full compliance reporting.',
    details:['Journal grinding & polishing with minimum undersizing technique','Labyrinth portion machining on precision lathes','Rotor set concentric at all portions before machining','Dynamic balancing 50-2000 kg to ISO/API standards','Balancing machines with latest vibration monitoring systems','Mechanical and electrical run-out identification pre-installation','Comprehensive balancing report documenting ISO/API compliance'],
    oems:['All Turbine Makes'] },
  { id:'srv_5', image:'service-lube-oil-flushing.webp',
    title:'Lube Oil Flushing',
    desc:'ISO-compliant flushing using purpose-built mobile centrifuge filter systems. Achieves maximum cleanliness and de-watering following construction or during scheduled maintenance.',
    details:['Purpose-built mobile centrifuge filter system','Targets system cleanliness per ISO 4406:99 standards','Oil sampling and reporting undertaken per ISO standards','Effective for post-construction and scheduled maintenance','Superior de-watering and contamination removal','Solid particle removal from 4 to 25 microns','System flow rates handled up to 6,000 l/min'],
    oems:['All Systems'] },
  { id:'srv_6', image:'service-machine-alignment.webp',
    title:'Machine Alignment',
    desc:'Expert machine alignment using latest technology to eliminate misalignment, one of the primary causes of equipment failure. Covers turbines, gearboxes, pumps, fans, alternators, and induction generators.',
    details:['Turbine to gearbox & gearbox to mill gearbox alignment','Fan, pump, alternator, induction generator alignment','Machine levelling & pipe strain measurements on any frame size','Fiberizor, shredder alignment','Latest alignment technology for highest standards','Detailed alignment reporting with exact results','Covers any size machine frame in any location'],
    oems:['All Makes'] },
];

/* ─────────────────────────────────────────────────────────────
   PRODUCTS DATA
   ───────────────────────────────────────────────────────────── */
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
    desc:'Glass fiber breather filter elements preventing airborne contamination and moisture ingress into hydraulic and lube oil reservoirs.',
    usage:'Hydraulic tanks, gearboxes, and lube oil reservoirs for all steam turbine, compressor, and industrial machinery applications.',
    features:['Eaton 01.NBF series dimensional compatible — nominal sizes 25-125','Filter media: Glass fiber fleece (VL) — hydrophobic construction','Prevents airborne particulate and moisture ingestion','High dirt-holding capacity for extended service intervals','Viton (V) sealing for chemical resistance','Filtration grade: 3 VL micron for fine airborne contamination','Protects system cleanliness per ISO 4406:99'],
    specs:{'Series Compatibility':'Eaton 01.NBF (Sizes: 25, 40, 55, 85, 125)','Filter Media':'Glass Fiber Fleece (VL) — hydrophobic','Filtration Grade':'3 VL','Sealing':'Viton (V)','Installation':'Tank breather mount','Standards':'ISO 16889, ISO 4406:99 compatible'},
    images:['air-breather-filter-1.webp','air-breather-filter-2.webp','air-breather-filter-3.webp'] },
  { id:'prod_f5', category:'Industrial Filtration', title:'Hydraulic Suction Strainer Elements (AS/TS Series)',
    desc:'SS wire mesh suction filter elements for protecting sensitive hydraulic pumps. Inside-to-outside flow configuration.',
    usage:'Immersed in hydraulic reservoirs protecting system pumps; turbine auxiliary lube oil pump suction protection.',
    features:['Eaton 01.AS / 01.TS dimensional compatible','SS Wire Mesh (G) media — 10, 25, 40, 80 µm grades','Inside-to-outside flow configuration','Low pressure drop prevents pump cavitation','Cleanable and reusable construction','Double open end (B) design for secure tank mounting'],
    specs:{'Series Compatibility':'Eaton 01.AS (180-631) / 01.TS (210-625)','Filter Media':'SS Wire Mesh (G)','Filtration Grades':'10, 25, 40, 80 µm','Flow Direction':'Inside-to-outside (suction)','End Design':'Double open end (B)','Application':'Tank-immersed suction pump protection'},
    images:['hydraulic-suction-strainer-1.webp','hydraulic-suction-strainer-2.webp','hydraulic-suction-strainer-3.webp'] },
  { id:'prod_f6', category:'Industrial Filtration', title:'WaterSorp Offline Filter Elements (WSNR Series)',
    desc:'Dual-function WaterSorp elements combining glass fiber filtration with water absorption layer. Removes solids AND absorbs free/emulsified water.',
    usage:'Offline filtration in side-stream return lines of turbine lube oil systems; extends oil life and protects bearings from water-induced damage.',
    features:['Eaton 01.WSNR WaterSorp dimensional compatible — sizes 250, 630, 1000','Media: Glass fiber fleece with integrated water absorption layer (WVG)','Dual-action: removes solids AND absorbs free/emulsified water simultaneously','Significantly reduces oil aging — extends drain intervals','Max operating pressure: 10 bar (145 psi)','Sealing: Nitrile or Viton'],
    specs:{'Series Compatibility':'Eaton 01.WSNR (Sizes: 250, 630, 1000)','Filter Media':'Glass fiber fleece + water absorption layer (WVG)','Filtration Grades':'3 WVG, 10 WVG','Max Pressure':'10 bar (145 psi)','End Design':'Double open end (B)','Function':'Particulate removal + water absorption'},
    images:['watersorp-filter-1.webp','watersorp-filter-2.webp','watersorp-filter-3.webp'] },
  { id:'prod_f7', category:'Industrial Filtration', title:'PTFE Hydrophobic Air & Gas Filter Elements',
    desc:'Hydrophobic PTFE filtration elements for critical compressed air and process gas applications. Moisture-repellent construction prevents water droplet passage.',
    usage:'Compressed air systems, process gases, instrument air, and venting applications where moisture and chemical resistance are critical.',
    features:['Hydrophobic PTFE (Polytetrafluoroethylene) filter media','Moisture-repellent — water droplets cannot pass through media','High chemical resistance — compatible with aggressive gases','Temperature range: -20 to +260 deg C','Cleanable and regenerable in most applications'],
    specs:{'Filter Media':'Hydrophobic PTFE','Temperature Range':'-20 to +260 deg C','Function':'Fine particulate + moisture separation','Chemical Resistance':'Excellent — wide pH range','Application':'Compressed air, process gas, instrument air'},
    images:['ptfe-air-filter-1.webp','ptfe-air-filter-2.webp','ptfe-air-filter-3.webp'] },
  { id:'prod_st1', category:'Industrial Strainers', title:'Simplex Basket Strainer',
    desc:'Engineered and fabricated to ASME VIII Div.1 and ASME B31.3 for high-pressure pipeline protection.',
    usage:'Liquid, viscous, and gaseous media filtration in high-pressure pipelines; protects valves, meters, and process equipment.',
    features:['Design standard: ASME VIII Div.1, ASME B31.3','MOC: Cast Steel or Stainless Steel','Pressure ratings: ASME Class 125, 150, 300, 600','Standard SS perforated basket internals','Optional: Davit lifts, quick-open closures, DP gauges'],
    specs:{'Design Standard':'ASME VIII Div.1, ASME B31.3','MOC':'Cast Steel, SS 304/316','Pressure Rating':'ASME Class 125, 150, 300, 600','Basket Internals':'SS Perforated Basket','End Connections':'Flanged, Butt-Weld, Screwed'},
    images:['simplex-basket-strainer-1.webp','simplex-basket-strainer-2.webp','simplex-basket-strainer-3.webp'] },
  { id:'prod_st2', category:'Industrial Strainers', title:'Duplex Basket Strainer',
    desc:'Continuous-service duplex strainer enabling basket cleaning without process shutdown via three-way changeover valve.',
    usage:'Continuous flow systems requiring zero-downtime operation; critical process lines where shutdown is unacceptable.',
    features:['Continuous service — no shutdown or flow interruption required','Three-way changeover valve for fast chamber switching','Design: ASME VIII Div.1, ASME B31.3','DP gauges available for clogging monitoring','Integrated pressure balance valve for easy changeover'],
    specs:{'Operation Mode':'Continuous (no shutdown)','Changeover':'Three-way ball valve','Design Standard':'ASME VIII Div.1, ASME B31.3','MOC':'Cast Steel, SS 304/316','Pressure Rating':'ASME Class 125, 150, 300, 600'},
    images:['duplex-basket-strainer-1.webp','duplex-basket-strainer-2.webp','duplex-basket-strainer-3.webp'] },
  { id:'prod_st3', category:'Industrial Strainers', title:'Conical (Temporary) Strainer',
    desc:'Welded conical strainer installed between standard flanges to remove foreign matter during commissioning or startup.',
    usage:'Pipeline protection for downstream equipment; commissioning to catch weld splatter and construction debris.',
    features:['Welded conical mesh element','Installed between standard pipeline flanges','MOC: Stainless Steel SS 304/316 standard','ASME Class 125, 150, 300, 600 available'],
    specs:{'Design':'Welded conical wire mesh element','MOC':'SS 304/316','Pressure Rating':'ASME Class 125-600','End Connections':'Flanged, Butt-Weld, Screwed'},
    images:['conical-strainer-1.webp','conical-strainer-2.webp','conical-strainer-3.webp'] },
  { id:'prod_st4', category:'Industrial Strainers', title:'Y-Type Strainer',
    desc:'Cast and welded Y-type strainer for liquid and gaseous pipelines. Y-configuration allows easy blow-off cleanout without line shutdown.',
    usage:'General pipeline protection; steam, water, gas, oil, and chemical service lines.',
    features:['Cast and welded design — horizontal & vertical configurations','MOC: Cast Iron, Cast Steel, SS 304/316','Pressure ratings: ASME Class 125, 150, 300, 600','Easy blow-off cleanout port'],
    specs:{'Design':'Cast & Welded Y-configuration','MOC':'Cast Iron, Cast Steel, SS 304/316','Pressure Rating':'ASME Class 125, 150, 300, 600','Cleanout':'Blow-off port'},
    images:['y-type-strainer-1.webp','y-type-strainer-2.webp','y-type-strainer-3.webp'] },
  { id:'prod_e1', category:'Expansion Joints', title:'Stainless Steel Metallic Bellows Expansion Joint',
    desc:'Multi-ply SS metallic bellows absorbing thermal expansion in piping systems. Available DN 15 to DN 12,000.',
    usage:'High-pressure steam exhaust systems, chemical process pipes, heat exchanger connections.',
    features:['Material: SS 304/316L, Duplex, Incoloy 825/925, Inconel 625, Titanium, Hastelloy','Dimension range: DN 15 to DN 12,000','Pressure: Up to 150 barg (2176 psi)','Design codes: EN 14917, EJMA, ASME VIII Div.1, ASME B31.1/B31.3','Compliance: PED 2014/68/EC, AD2000'],
    specs:{'Material':'SS 304/316L, Duplex, Incoloy, Inconel, Hastelloy, Titanium','Dimension Range':'DN 15 to DN 12,000','Max Pressure':'150 barg (2176 psi)','Design Codes':'EN 14917, EJMA, ASME VIII Div.1, ASME B31.1/B31.3'},
    images:['ss-metallic-bellows-1.webp','ss-metallic-bellows-2.webp','ss-metallic-bellows-3.webp'] },
  { id:'prod_e2', category:'Expansion Joints', title:'Double Arch Rubber Expansion Joint',
    desc:'Heavy-duty double arch rubber joint with approx. 2x the movement capacity of single arch.',
    usage:'Pumps, chillers, cooling towers, heavy fluid systems requiring greater movement.',
    features:['Double arch design: ~2x movement vs. single arch','Simultaneously absorbs axial, lateral, and angular movements','Reduces system noise and vibration','Tie rod assembly available and recommended'],
    specs:{'Architecture':'Double arch (twin convolution) rubber','Movement':'Axial, Lateral, Angular','Ends':'Flanged (standard)','Tie Rods':'Available — specially recommended'},
    images:['double-arch-rubber-joint-1.webp','double-arch-rubber-joint-2.webp','double-arch-rubber-joint-3.webp'] },
  { id:'prod_e3', category:'Expansion Joints', title:'Single Arch Rubber Expansion Joint',
    desc:'Standard single arch rubber expansion joint absorbing thermal movements and mechanical vibrations.',
    usage:'HVAC systems, water piping, light industrial fluid lines, pump discharge and suction connections.',
    features:['Single arch convolution rubber construction','Absorbs thermal expansion and contraction','Reduces mechanical vibration transmission','Flanged ends standard (PN10/PN16)'],
    specs:{'Architecture':'Single arch convolution','Compounds':'EPDM / Neoprene (CR) / NBR','End Connections':'Flanged (PN10/PN16)'},
    images:['single-arch-rubber-joint-1.webp','single-arch-rubber-joint-2.webp','single-arch-rubber-joint-3.webp'] },
  { id:'prod_e4', category:'Expansion Joints', title:'Universal Metallic Expansion Joint',
    desc:'Twin-bellows metallic joint with intermediate pipe absorbing any combination of axial, lateral, and angular movement.',
    usage:'Complex piping requiring multi-axis movement; cryogenic lines, power plant crossovers.',
    features:['Twin bellows + intermediate pipe (universal configuration)','Absorbs axial, lateral, angular in any combination','Material: SS 304/316L, Duplex, Incoloy, Inconel','Dimension range: DN 15 to DN 12,000'],
    specs:{'Architecture':'Twin bellows + intermediate pipe','Material':'SS 304/316L, Duplex, Incoloy, Inconel','Dimension Range':'DN 15 to DN 12,000'},
    images:['universal-expansion-joint-1.webp','universal-expansion-joint-2.webp','universal-expansion-joint-3.webp'] },
  { id:'prod_e5', category:'Expansion Joints', title:'Non-Metallic Fabric Expansion Joint',
    desc:'Multi-layer fabric/PTFE/rubber composite joints. 5-layer construction. Handles up to 1200 deg C.',
    usage:'Boilers, bag filters, ESPs, gas turbine installations, cement plants.',
    features:['5-layer construction: abrasion liner + insulation + PTFE foil + cover + reinforcement','Temperature capability: up to 1200 deg C','Styles: Belt, convoluted, vertical flange, floating sleeve, insulation bolster'],
    specs:{'Construction':'5-layer multi-material composite','Max Temperature':'Up to 1200 deg C','Materials':'PTFE, rubber, ceramic fiber, fiberglass, Nomex'},
    images:['non-metallic-expansion-joint-1.webp','non-metallic-expansion-joint-2.webp','non-metallic-expansion-joint-3.webp'] },
  { id:'prod_e6', category:'Expansion Joints', title:'Pressure Balance Expansion Joint',
    desc:'In-line pressure balance joint absorbing axial movement and lateral deflection while neutralizing pressure thrust.',
    usage:'Turbine steam crossovers, pump connections, piping loops where pressure thrust must be contained.',
    features:['In-line pressure balance design neutralizes pressure thrust','Absorbs axial movement while containing thrust','Full pressure, movement, and fatigue test certification'],
    specs:{'Architecture':'In-line pressure balance bellows assembly','Function':'Neutralizes pressure thrust forces','Design Codes':'EN 14917, EJMA, ASME VIII Div.1'},
    images:['pressure-balance-joint-1.webp','pressure-balance-joint-2.webp','pressure-balance-joint-3.webp'] },
  { id:'prod_ts1', category:'Turbine Spares', title:'Carbon & Graphite Gland Sealing Rings',
    desc:'Precision machined carbon and graphite seal rings for steam turbine gland sealing. Self-lubricating material maintains tight clearances at extreme temperatures.',
    usage:'Steam turbine gland sealing for pressure retention at shaft exits.',
    features:['Self-lubricating carbon/graphite — no additional lubrication required','High temperature resistance: up to 600 deg C continuous','Grades: Carbon graphite, electrographite, silicon carbide'],
    specs:{'Material Grades':'Carbon graphite / Electrographite / Silicon Carbide','Max Temperature':'Up to 600 deg C continuous','Lubrication':'Self-lubricating'},
    images:['black-carbon-sealing-rings-1.webp','black-carbon-sealing-rings-2.webp','black-carbon-sealing-rings-3.webp'] },
  { id:'prod_ts2', category:'Turbine Spares', title:'Labyrinth Shaft Sealing Packings',
    desc:'Custom manufactured labyrinth seal segments and packings for steam turbine shaft sealing. High-temperature alloy with erosion-resistant teeth.',
    usage:'Steam turbine shaft sealing between rotating and stationary components.',
    features:['High-temperature alloy: 410SS, Monel, Stellite options','Precision machined to OEM diametral clearance specs','Radial, axial, and combined labyrinth configurations'],
    specs:{'Material':'410SS, Monel, Stellite','Configurations':'Radial, Axial, Combined labyrinth','Design Types':'Caulked-in or Spring-back (retractable)'},
    images:['labyrinth-sealing-packings-1.webp','labyrinth-sealing-packings-2.webp','labyrinth-sealing-packings-3.webp'] },
  { id:'prod_ts3', category:'Turbine Spares', title:'Babbitt Journal Bearings & Thrust Pads',
    desc:'Precision machined white metal (babbitt) journal and thrust bearings. Ultrasonic bond testing verifies babbitt-to-shell adhesion.',
    usage:'High-speed rotor support in steam turbines, compressors, and gearboxes.',
    features:['White metal (babbitt) — Tin-base or Lead-base per OEM specification','Precision CNC machined journal bearing bores','Ultrasonic bond testing verifies babbitt adhesion — 100% tested'],
    specs:{'Babbitt Metal':'White Metal — Tin-base or Lead-base','Bearing Types':'Journal bearing + Thrust Pad','Bond Integrity Test':'Ultrasonic — 100%'},
    images:['babbitt-bearings-1.webp','babbitt-bearings-2.webp','babbitt-bearings-3.webp'] },
  { id:'prod_ts4', category:'Turbine Spares', title:'Emergency Stop Valves (ESV)',
    desc:'Mission-critical turbine emergency stop valves reverse-engineered to precise dimensional standards. Stellite hard-faced seating surfaces.',
    usage:'Turbine over-speed protection; primary emergency shutdown valve in steam admission circuit.',
    features:['Reverse-engineered from OEM samples using 3D scanning and CMM','Stellite hard-faced seat and plug internals for erosion resistance','Spring-loaded rapid-closure mechanism — fail-safe closed'],
    specs:{'Function':'Emergency shutdown — fail-safe closed','Actuation':'Spring-loaded + pneumatic or hydraulic trip','Seat/Plug Material':'Stellite hard-faced'},
    images:['emergency-stop-valve-1.webp','emergency-stop-valve-2.webp','emergency-stop-valve-3.webp'] },
  { id:'prod_ts5', category:'Turbine Spares', title:'Turbine Lube Oil Pumps & Mechanical Seals',
    desc:'OEM-dimensionally-matched replacement main and auxiliary lube oil pumps with precision mechanical seals.',
    usage:'Main and auxiliary lube oil systems in power generation turbines.',
    features:['Exact OEM dimensional match verified against drawing','Gear pump type — high volumetric efficiency','Precision mechanical face seal assembly — no packing'],
    specs:{'Pump Type':'Gear pump (main / auxiliary lube oil service)','Shaft Sealing':'Precision mechanical face seal','Testing':'Pressure and flow performance test at rated conditions'},
    images:['turbine-oil-pumps-1.webp','turbine-oil-pumps-2.webp','turbine-oil-pumps-3.webp'] },
  { id:'prod_ts6', category:'Turbine Spares', title:'High-Purity Electrographite Sealing Rings',
    desc:'Specialized high-purity electrographite sealing rings for extreme temperature and pressure steam environments.',
    usage:'High-temperature steam gland sealing in power generation turbines.',
    features:['High-purity electrographite material grade','Extreme temperature resistance: up to 700 deg C and above','Superior oxidation resistance versus standard carbon grades'],
    specs:{'Material':'High-purity electrographite','Max Temperature':'Up to 700 deg C+','Lubrication':'Self-lubricating'},
    images:['high-purity-graphite-rings-1.webp','high-purity-graphite-rings-2.webp','high-purity-graphite-rings-3.webp'] },
  { id:'prod_ts7', category:'Turbine Spares', title:'Complete Turbine Rotor Assemblies',
    desc:'Fully manufactured and dynamically balanced turbine rotor assemblies built to exact OEM tolerances.',
    usage:'Complete rotating element replacement for steam turbines.',
    features:['Manufactured from reverse-engineered OEM drawings with PMI material verification','Material: Alloy steel (CrMoV, 12% Cr) per steam conditions','Dynamic balancing 50-2,000 kg to ISO 1940 / API 670'],
    specs:{'Rotor Material':'Alloy Steel (CrMoV, 12% Cr)','Dynamic Balancing':'ISO 1940 / API 670 (50-2,000 kg)','Blade Root Options':'Finger-tree, T-root, Dove-tail'},
    images:['rotor-assembly-1.webp','rotor-assembly-2.webp','rotor-assembly-3.webp'] },
  { id:'prod_ts8', category:'Turbine Spares', title:'Precision Turbine Gears & Worm Wheels',
    desc:'High-precision gear sets and worm wheel assemblies reverse-engineered for turbine gearboxes and speed reducers.',
    usage:'Turbine gearboxes, speed reducers, governor drive gear trains.',
    features:['Exact OEM gear ratios replicated via precision reverse engineering','Gear types: Spur, helical, bevel, and worm gear configurations','Precision hobbing and gear grinding to DIN Grade 6-8 quality'],
    specs:{'Gear Types':'Spur, Helical, Bevel, Worm','Quality Grade':'DIN Grade 6-8','Heat Treatment':'Case hardening, through hardening, nitriding'},
    images:['gears-worm-wheels-1.webp','gears-worm-wheels-2.webp','gears-worm-wheels-3.webp'] },
  { id:'prod_ts9', category:'Turbine Spares', title:'Turbine Nozzles & Diaphragms',
    desc:'Critical steam path components engineered to direct and accelerate steam flow across each turbine stage for maximum efficiency.',
    usage:'Internal steam path of high-pressure industrial steam turbines.',
    features:['Steam path design optimized for efficiency','Material: 13% Cr steel, 316L SS, Incoloy for high-temperature stages','Material upgrade available: Titanium or higher-alloy for life extension'],
    specs:{'Material':'13% Cr Steel, 316L SS, Incoloy','Surface Treatment':'Erosion and corrosion resistant'},
    images:['nozzles-diaphragms-1.webp','nozzles-diaphragms-2.webp','nozzles-diaphragms-3.webp'] },
  { id:'prod_ts10', category:'Turbine Spares', title:'Mechanical Centrifugal Speed Governors',
    desc:'Precision mechanical centrifugal governor assemblies maintaining exact RPM control in steam turbines.',
    usage:'Turbine speed control and over-speed prevention.',
    features:['Fly-weight centrifugal mechanism with calibrated speeder springs','High sensitivity: detects speed deviations within +/-1% RPM','Calibrated setpoint before dispatch from workshop'],
    specs:{'Governor Type':'Mechanical centrifugal fly-weight','Speed Sensitivity':'+/-1% RPM deviation','Over-speed Trip':'Typically 10% above rated speed'},
    images:['mechanical-governors-1.webp','mechanical-governors-2.webp','mechanical-governors-3.webp'] },
  { id:'prod_ts11', category:'Turbine Spares', title:'Turbine Throttle (Control) Valves',
    desc:'High-pressure throttle and control valves for precise steam flow regulation into turbine stages.',
    usage:'Steam turbine inlet throttle control and multi-valve admission.',
    features:['Stellite-trimmed stem, seat and plug internals','Body: Alloy steel (Cr-Mo) or SS 316','Hydrotest at 1.5x DP; seat leakage tested'],
    specs:{'Internals':'Stellite 6 trimmed','Body':'Alloy steel Cr-Mo / SS 316','Testing':'Hydrotest 1.5x DP + seat leakage test'},
    images:['throttle-valves-1.webp','throttle-valves-2.webp','throttle-valves-3.webp'] },
  { id:'prod_r1', category:'Industrial Rubber Products', title:'Custom Extruded Rubber Profiles & Seals',
    desc:'High-quality extruded rubber profiles in EPDM, Neoprene, Nitrile, and Natural Rubber for industrial sealing and dampening.',
    usage:'Sealing panels, machine covers, door and window seals, industrial enclosure gaskets.',
    features:['Custom cross-section extrusion to customer drawing or sample','Materials: EPDM, Neoprene (CR), Nitrile (NBR), Natural Rubber','Hardness range: 40-80 Shore A per application'],
    specs:{'Material Options':'EPDM, Neoprene (CR), Nitrile (NBR), Natural Rubber','Hardness Range':'40-80 Shore A','Temperature Range':'-40 to +150 deg C'},
    images:['extruded-rubber-profile-1.webp','extruded-rubber-profile-2.webp','extruded-rubber-profile-3.webp'] },
  { id:'prod_r2', category:'Industrial Rubber Products', title:'Heavy Duty Anti-Vibration Rubber Mounts',
    desc:'Industrial-grade anti-vibration rubber mounts bonded to steel plates for isolating heavy rotating machinery.',
    usage:'Vibration isolation for turbine-generator sets, compressors, diesel generators, cooling tower fans.',
    features:['Natural rubber to steel plate bonded (vulcanized) construction','Significantly reduces structure-borne noise and vibration','Types: Cylindrical, sandwich, conical, and bobbin mounts'],
    specs:{'Construction':'Rubber-to-steel bonded (vulcanized)','Mount Types':'Cylindrical, sandwich, conical, bobbin','Operating Temperature':'-30 to +70 deg C'},
    images:['rubber-mounts-1.webp','rubber-mounts-2.webp','rubber-mounts-3.webp'] },
  { id:'prod_h1', category:'Flexible Hoses & Assemblies', title:'SS Corrugated Flexible Metal Hose Assemblies',
    desc:'Stainless steel corrugated hose with braided outer sheath for high-temperature, high-pressure, and chemically aggressive fluid transfer.',
    usage:'High-temperature steam lines, chemical transfer, vibration absorption at pump/compressor connections.',
    features:['SS 304 / SS 316L corrugated inner hose','OD range: 1/2 to 14 inch (DN 15 to DN 350)','Temperature: -20 to +350 deg C'],
    specs:{'Hose Material':'SS 304 / SS 316L corrugated + SS wire braid','Size Range':'1/2 to 14 inch','Temperature Range':'-20 to +350 deg C'},
    images:['ss-corrugated-flexible-hose-1.webp','ss-corrugated-flexible-hose-2.webp','ss-corrugated-flexible-hose-3.webp'] },
  { id:'prod_h2', category:'Flexible Hoses & Assemblies', title:'PTFE Lined Smooth Bore Hose Assemblies',
    desc:'Smooth bore PTFE-lined hose with stainless steel outer braid. Non-stick inner surface prevents product contamination.',
    usage:'Pharmaceutical fluid transfer, aggressive acids/alkalis, solvents, food-grade process lines.',
    features:['Smooth bore PTFE inner tube — non-stick, non-contaminating','Chemically inert to virtually all industrial chemicals','Operating temperature: -60 to +260 deg C'],
    specs:{'Inner Tube':'Smooth bore PTFE','Outer Braid':'SS 304 / SS 316','Temperature Range':'-60 to +260 deg C'},
    images:['ptfe-lined-hose-1.webp','ptfe-lined-hose-2.webp','ptfe-lined-hose-3.webp'] },
  { id:'prod_h3', category:'Flexible Hoses & Assemblies', title:'High-Pressure Hydraulic Rubber Hose Assemblies',
    desc:'Steel wire braid and spiral-reinforced rubber hydraulic hoses for extreme pressure service.',
    usage:'Heavy machinery hydraulic systems, turbine hydraulic control lines, industrial power units.',
    features:['Inner tube: Oil-resistant nitrile rubber','Working pressure: Up to 420 bar','Standards: EN 853, EN 856, SAE 100R1/R2/R12/R13'],
    specs:{'Reinforcement':'Steel wire braid / 4-wire spiral wrap','Max Working Pressure':'Up to 420 bar','Standards':'EN 853, EN 856, SAE 100R1/R2/R12/R13'},
    images:['hydraulic-rubber-hose-1.webp','hydraulic-rubber-hose-2.webp','hydraulic-rubber-hose-3.webp'] },
  { id:'prod_ee1', category:'Electronic Equipments', title:'Eddy Current Non-Contact Vibration Probes',
    desc:'High-precision non-contact eddy current displacement sensors for continuous turbine shaft vibration and axial position monitoring. API 670 compliant.',
    usage:'Continuous monitoring of shaft radial vibration, thrust position, and axial displacement in high-speed steam turbines.',
    features:['Non-contact eddy current measurement principle','API 670 Standard compliant for machinery protection systems','Frequency response: DC to 10 kHz measurement bandwidth'],
    specs:{'Measurement Principle':'Non-contact eddy current displacement','Standard Compliance':'API 670','Frequency Response':'DC to 10 kHz','Sensitivity':'8 mV/µm (standard calibration)'},
    images:['vibration-probe-shinkawa-1.webp','vibration-probe-shinkawa-2.webp','vibration-probe-shinkawa-3.webp'] },
];

const PRODUCT_CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

/* ─────────────────────────────────────────────────────────────
   INDUSTRIES DATA
   ───────────────────────────────────────────────────────────── */
const INDUSTRIES = [
  { id:'ind_1', title:'Power Generation', Icon:Zap,
    color:'from-yellow-500/20 to-amber-600/10', border:'border-yellow-500/30', accent:'text-yellow-500',
    image:'industry-power-generation.webp',
    desc:'Supplying critical overhauling services and OEM-compatible spares to thermal power plants operating steam turbines from 5 MW to 27 MW. Our ex-OEM engineers ensure maximum plant availability.',
    useCases:['Steam turbine major and minor overhauling','Turbine erection and commissioning','Lube oil system flushing per ISO 4406:99','Rotor dynamic balancing and alignment','Emergency stop valve manufacturing','Filter elements and strainers supply'],
    turbines:'5 MW – 27 MW' },
  { id:'ind_2', title:'Sugar Mills & Distilleries', Icon:Factory,
    color:'from-green-500/20 to-emerald-600/10', border:'border-green-500/30', accent:'text-green-500',
    image:'industry-sugar-mills.webp',
    desc:"Serving India's sugar industry with specialized back-pressure steam turbine services. Scheduled overhauling during off-season and emergency breakdown support during crushing season.",
    useCases:['Back-pressure turbine overhauling (inter-season)','Triveni and Belliss turbine specialist services','Carbon and graphite gland ring supply','Labyrinth packing manufacturing','Lube oil filtration products supply','Emergency 24x7 breakdown support'],
    turbines:'Triveni, Belliss & Morcom, Maxwatt' },
  { id:'ind_3', title:'Paper & Pulp Mills', Icon:Layers,
    color:'from-blue-500/20 to-cyan-600/10', border:'border-blue-500/30', accent:'text-blue-500',
    image:'industry-paper-mills.webp',
    desc:'Paper mills operate steam turbines continuously and require precision maintenance to maintain uptime. We provide planned shutdown overhauling and critical spare components.',
    useCases:['Continuous-operation turbine maintenance planning','Duplex basket strainer supply for process lines','Expansion joint and bellows supply','Turbine spares manufacturing to OEM standards','Machine alignment services','Vibration monitoring equipment supply'],
    turbines:'Siemens, BHEL, Triveni' },
  { id:'ind_4', title:'Oil & Gas Industries', Icon:Droplets,
    color:'from-orange-500/20 to-red-600/10', border:'border-orange-500/30', accent:'text-orange-500',
    image:'industry-oil-gas.webp',
    desc:'Oil and gas facilities demand the highest standards of precision engineering for turbine-driven compressors and pumps. Our API-compliant products meet the stringent requirements of upstream and downstream facilities.',
    useCases:['API 614-compliant lube oil filter elements','API 670-compliant vibration monitoring probes','PTFE-lined hose assemblies for chemical transfer','High-pressure hydraulic rubber hose assemblies','Babbitt bearing manufacturing for compressor trains','Dynamic balancing per ISO 1940/API 670'],
    turbines:'Siemens, Man Turbo, KKK, ABB' },
  { id:'ind_5', title:'Petrochemical & Refineries', Icon:Activity,
    color:'from-purple-500/20 to-violet-600/10', border:'border-purple-500/30', accent:'text-purple-500',
    image:'industry-petrochemical.webp',
    desc:'Petrochemical plants and refineries require specialized metallic expansion joints, high-performance strainers, and precision turbine spares capable of handling aggressive media at elevated temperatures.',
    useCases:['Metallic bellows expansion joints (DN 15-12,000)','High-temperature PTFE filter and hose products','ASME-code strainers for process pipelines','Inconel and Hastelloy expansion bellows','Turbine steam path component manufacturing','High-pressure control valve manufacturing'],
    turbines:'All major makes' },
  { id:'ind_6', title:'Agro & Food Processing', Icon:Shield,
    color:'from-teal-500/20 to-cyan-600/10', border:'border-teal-500/30', accent:'text-teal-500',
    image:'industry-agro-food.webp',
    desc:'Agro-processing industries rely on steam for power generation and process heating. We supply filtration products, rubber components, and turbine maintenance services.',
    useCases:['Steam turbine maintenance for agro co-gen plants','FDA-grade PTFE hose for food-grade transfer lines','Rubber expansion joints for pump connections','Anti-vibration mounts for machinery isolation','Tank breather filters for oil storage systems','Y-type strainers for process fluid lines'],
    turbines:'Triveni, Maxwatt, Chola Turbo' },
];

/* ─────────────────────────────────────────────────────────────
   BLOG DATA
   ───────────────────────────────────────────────────────────── */
const BLOG_POSTS = [
  {
    id: 'post_1', slug: 'steam-turbine-overhauling-checklist',
    title: 'The Complete Steam Turbine Overhauling Checklist for Plant Engineers',
    excerpt: 'A practical, step-by-step checklist covering pre-shutdown planning, inspection protocols, clearance recording, and post-overhaul commissioning for steam turbines up to 27 MW.',
    date: '2026-03-15', author: 'Keshav Enterprises Engineering Team', readTime: '8 min read',
    tags: ['Overhauling', 'Steam Turbines', 'Maintenance'], coverImage: 'blog-turbine-overhaul.webp',
    content: [
      { type:'h2', text:'Why a Structured Checklist Matters' },
      { type:'p', text:'Unplanned turbine shutdowns cost Indian power and sugar plants lakhs of rupees per hour. A structured overhauling checklist ensures nothing is missed during planned maintenance windows — reducing the risk of early failure after recommissioning and avoiding costly repeat shutdowns.' },
      { type:'h2', text:'1. Pre-Shutdown Planning (4–6 Weeks Before)' },
      { type:'p', text:'Begin with a detailed scope of work covering all rotating equipment in the train. Inspect all stocked spare parts and generate a shortfall report. Order critical items — bearings, seals, labyrinth packings, carbon rings — with adequate lead time.' },
      { type:'list', items:['Confirm OEM clearance data for all turbine stages','Arrange lube oil flushing equipment','Book ex-OEM engineers if required','Prepare condition monitoring baseline readings'] },
      { type:'h2', text:'2. Shutdown & Isolation' },
      { type:'p', text:'Follow the OEM-specified shutdown procedure. Allow adequate cool-down time before breaking any flanges. Lock out / tag out all energy sources including steam, lube oil, condensate, and control air.' },
      { type:'h2', text:'3. Disassembly & Inspection' },
      { type:'p', text:'Record all clearances, gaps, and fits before removing components. Photograph every stage. Measure rotor run-out at journal, thrust collar, and coupling faces.' },
      { type:'list', items:['Bearing clearances (radial and axial)','Labyrinth seal diametral clearances','Coupling alignment offset and angularity','Carbon ring face condition and spring tension'] },
      { type:'h2', text:'4. Workshop Repairs & Replacements' },
      { type:'p', text:'Send the rotor for journal grinding and dynamic balancing if run-out or vibration readings were outside tolerance. All rotor balancing should be performed to ISO 1940 or API 670 standards.' },
      { type:'h2', text:'5. Lube Oil Flushing' },
      { type:'p', text:'Before commissioning, flush the lube oil system with a mobile centrifuge filter system targeting ISO 4406:99 cleanliness class 16/14/11 or better. Never commission a turbine without completing an oil flush.' },
      { type:'cta', text:'Need expert overhauling engineers for your next planned shutdown? Our ex-OEM team covers Triveni, Siemens, BHEL, Belliss & Morcom, and more.' },
    ],
  },
  {
    id: 'post_2', slug: 'lube-oil-contamination-turbine-bearings',
    title: 'How Lube Oil Contamination Destroys Turbine Bearings — And How to Prevent It',
    excerpt: 'Water ingress, solid particles, and oxidation are the three leading causes of premature turbine bearing failure. Here is how to identify each contamination type and what filtration products to use.',
    date: '2026-02-28', author: 'Keshav Enterprises Engineering Team', readTime: '6 min read',
    tags: ['Lube Oil', 'Bearings', 'Filtration', 'Preventive Maintenance'], coverImage: 'blog-lube-oil.webp',
    content: [
      { type:'h2', text:'The Hidden Bearing Killer' },
      { type:'p', text:'Turbine babbitt bearings are precision components operating on a hydrodynamic oil film just a few microns thick. Studies show that over 70% of turbine bearing failures are lubrication-related.' },
      { type:'h2', text:'Contamination Type 1: Solid Particles' },
      { type:'p', text:'Particles above 10 microns can scratch bearing surfaces. Target system cleanliness: ISO 4406:99 Class 16/14/11 or better for turbine bearings.' },
      { type:'h2', text:'Contamination Type 2: Water Ingress' },
      { type:'p', text:'Water in lube oil causes hydrogen embrittlement of babbitt, promotes oxidation, and supports bacterial growth. Even 200 ppm of free water significantly reduces oil film strength.' },
      { type:'list', items:['Check filter differential pressure weekly','Inspect tank breather filter monthly','Conduct oil sampling every 30 days','Install WaterSorp elements if water contamination is detected'] },
      { type:'cta', text:'We supply ISO 16889-compliant lube oil filter elements compatible with Triveni, Siemens, BHEL, and all major turbine makes. Request a quote via WhatsApp.' },
    ],
  },
  {
    id: 'post_3', slug: 'reverse-engineering-turbine-spares-india',
    title: 'Reverse Engineering Turbine Spares: How We Recreate Obsolete Components in India',
    excerpt: 'When OEM spare parts are unavailable or have 18-month lead times, reverse engineering offers a reliable alternative. Here is the step-by-step process we use at Keshav Enterprises.',
    date: '2026-01-20', author: 'Keshav Enterprises Engineering Team', readTime: '7 min read',
    tags: ['Reverse Engineering', 'Turbine Spares', 'Manufacturing'], coverImage: 'blog-reverse-engineering.webp',
    content: [
      { type:'h2', text:'Why Reverse Engineer Turbine Parts?' },
      { type:'p', text:'Many Indian industrial plants operate turbines that are 20–40 years old. OEM lead times for machined components routinely exceed 12–18 months.' },
      { type:'h2', text:'Step 1: 3D Laser Scanning & CMM Measurement' },
      { type:'p', text:'For complex profiles, we use a 3D laser scanner to capture complete geometry. For simpler rotationally-symmetric parts, CMM captures critical dimensions with micron-level accuracy.' },
      { type:'h2', text:'Step 2: PMI Material Testing' },
      { type:'p', text:'Positive Material Identification (PMI) using XRF or optical emission spectrometry identifies the exact alloy composition of the original component.' },
      { type:'cta', text:'Have an obsolete spare you need reverse-engineered? Send us a photo and your turbine details on WhatsApp — we will assess feasibility within 24 hours.' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS (marquee + animations injected once)
   ───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Barlow+Condensed:wght@600;700;800;900&display=swap');

  :root {
    --navy: #0A1628;
    --navy-mid: #0D1F3C;
    --navy-light: #152B50;
    --blue: #1E6FFF;
    --blue-glow: rgba(30,111,255,0.3);
    --steel: #8CA0BE;
    --wa: #25D366;
  }

  * { font-family: 'Barlow', sans-serif; }
  .font-display { font-family: 'Barlow Condensed', sans-serif; }

  @keyframes ke-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes ke-marquee-slow { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes ke-spin-slow { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
  @keyframes ke-spin-rev { 0%{transform:rotate(0deg)} 100%{transform:rotate(-360deg)} }
  @keyframes ke-pulse-ring { 0%,100%{box-shadow:0 0 0 0 var(--blue-glow)} 50%{box-shadow:0 0 0 20px transparent} }
  @keyframes ke-float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes ke-fade-up { 0%{opacity:0;transform:translateY(32px)} 100%{opacity:1;transform:translateY(0)} }
  @keyframes ke-fade-in { 0%{opacity:0} 100%{opacity:1} }
  @keyframes ke-slide-right { 0%{opacity:0;transform:translateX(-32px)} 100%{opacity:1;transform:translateX(0)} }
  @keyframes ke-counter { 0%{opacity:0;transform:scale(0.7)} 100%{opacity:1;transform:scale(1)} }
  @keyframes ke-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes grid-pulse { 0%,100%{opacity:0.04} 50%{opacity:0.10} }

  .ke-marquee { animation:ke-marquee 80s linear infinite; display:flex; width:max-content; will-change:transform; }
  .ke-marquee-slow { animation:ke-marquee-slow 160s linear infinite; display:flex; width:max-content; will-change:transform; }
  .ke-marquee:hover,.ke-marquee-slow:hover { animation-play-state:paused; }

  .anim-fade-up   { animation: ke-fade-up 0.8s ease-out both; }
  .anim-fade-in   { animation: ke-fade-in 0.6s ease-out both; }
  .anim-slide-right { animation: ke-slide-right 0.7s ease-out both; }
  .anim-counter   { animation: ke-counter 0.5s ease-out both; }
  .anim-shimmer   { background: linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent); background-size:200% 100%; animation:ke-shimmer 2s infinite; }

  .delay-100 { animation-delay:0.1s; }
  .delay-200 { animation-delay:0.2s; }
  .delay-300 { animation-delay:0.3s; }
  .delay-400 { animation-delay:0.4s; }
  .delay-500 { animation-delay:0.5s; }
  .delay-600 { animation-delay:0.6s; }
  .delay-700 { animation-delay:0.7s; }
  .delay-800 { animation-delay:0.8s; }

  .glass { background:rgba(255,255,255,0.04); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.08); }
  .glass-dark { background:rgba(10,22,40,0.85); backdrop-filter:blur(20px); border:1px solid rgba(30,111,255,0.12); }
  .glass-card { background:rgba(255,255,255,0.03); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.06); }

  .text-gradient { background:linear-gradient(135deg,#60a5fa,#3b82f6,#93c5fd); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .text-gradient-gold { background:linear-gradient(135deg,#fbbf24,#f59e0b,#fde68a); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .text-gradient-white { background:linear-gradient(135deg,#ffffff,#94a3b8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .bg-grid { background-image:linear-gradient(rgba(30,111,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,0.06) 1px,transparent 1px); background-size:48px 48px; animation:grid-pulse 6s ease-in-out infinite; }
  .bg-hex { background-image:radial-gradient(rgba(30,111,255,0.08) 1px,transparent 1px); background-size:28px 28px; }

  .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }

  .glow-blue { box-shadow:0 0 40px rgba(30,111,255,0.25); }
  .glow-blue-sm { box-shadow:0 0 20px rgba(30,111,255,0.2); }
  .glow-green { box-shadow:0 0 30px rgba(37,211,102,0.35); }

  .border-glow { border:1px solid rgba(30,111,255,0.3); }

  .scrollbar-hide::-webkit-scrollbar { display:none; }
  .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }

  .nav-link-active { color:#60a5fa !important; }
  .nav-link-active::after { content:''; display:block; height:2px; background:#3b82f6; border-radius:2px; margin-top:2px; }
`;

/* ─────────────────────────────────────────────────────────────
   JSON-LD SCHEMAS
   ───────────────────────────────────────────────────────────── */
const SITE_URL = 'https://keshaventerprises.in';
const OG_IMAGE  = `${SITE_URL}/og-image.webp`;
const SITE_KEYWORDS = 'turbine maintenance India, steam turbine overhauling, turbine reverse engineering, industrial turbine spares, lube oil filter elements, expansion joints India, Triveni turbine service, BHEL turbine spares, turbine erection Uttar Pradesh, Shamli engineering';

const LOCAL_SCHEMA = {
  '@context':'https://schema.org','@type':['LocalBusiness','ProfessionalService'],
  name:'Keshav Enterprises',description:'Precision industrial turbine engineering — overhauling, reverse engineering, dynamic balancing, lube oil flushing, and OEM-compatible spares for steam turbines 5 kW to 27 MW.',
  url:'https://keshaventerprises.in',telephone:['+919149229448','+916397363268'],email:'ksengg007@gmail.com',
  address:{'@type':'PostalAddress',streetAddress:'Dayanand Nagar Gali No.2, Near Subash Ki Chakki',addressLocality:'Shamli',addressRegion:'Uttar Pradesh',postalCode:'247776',addressCountry:'IN'},
  geo:{'@type':'GeoCoordinates',latitude:29.4476,longitude:77.3003},
  sameAs:['https://www.indiamart.com/keshav-enterprises-shamli/','https://www.linkedin.com/in/keshav-enterprises-825a473b8','https://www.instagram.com/ksengg007'],
};

const FAQ_SCHEMA = {
  '@context':'https://schema.org','@type':'FAQPage',
  mainEntity:[
    {'@type':'Question',name:'What turbine makes does Keshav Enterprises service?',acceptedAnswer:{'@type':'Answer',text:'Keshav Enterprises services all major turbine makes including Triveni, Siemens, BHEL, Belliss & Morcom, Maxwatt, Man Turbo, Chola Turbo, DLF-Skoda, KKK, and ABB — covering turbines from 5 kW to 27 MW.'}},
    {'@type':'Question',name:'Does Keshav Enterprises offer emergency turbine breakdown support?',acceptedAnswer:{'@type':'Answer',text:'Yes. Keshav Enterprises provides 24×7 emergency turbine breakdown support with engineers stationed at multiple locations across India.'}},
  ]
};

/* ─────────────────────────────────────────────────────────────
   UTILITY
   ───────────────────────────────────────────────────────────── */
const waMsg = (text) => `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;

const getCategoryIcon = (category) => {
  const cls = 'w-16 h-16 text-slate-600 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-500';
  switch(category){
    case 'Industrial Filtration': return <Filter className={cls}/>;
    case 'Industrial Strainers': return <Droplets className={cls}/>;
    case 'Expansion Joints': return <Layers className={cls}/>;
    case 'Turbine Spares': return <Cog className={cls}/>;
    case 'Flexible Hoses & Assemblies': return <Activity className={cls}/>;
    case 'Industrial Rubber Products': return <Hexagon className={cls}/>;
    case 'Electronic Equipments': return <Cpu className={cls}/>;
    default: return <Settings className="w-16 h-16 text-slate-600"/>;
  }
};

/* ─────────────────────────────────────────────────────────────
   SEO HEAD
   ───────────────────────────────────────────────────────────── */
const SEOHead = memo(({title, description, schema, pageType, canonicalPath, publishedTime}) => {
  useEffect(()=>{
    const fullTitle = title ? `${title} | Keshav Enterprises` : 'Keshav Enterprises | Industrial Turbine Engineering — Shamli, UP';
    const fullDesc = description || 'Precision turbine engineering, overhauling, reverse engineering, and OEM-compatible industrial spares — Keshav Enterprises, Shamli, UP, India.';
    const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL;
    document.title = fullTitle;
    const sm=(sel,attr,val,content)=>{let t=document.querySelector(sel);if(!t){t=document.createElement('meta');t.setAttribute(attr,val);document.head.appendChild(t);}t.content=content;};
    const sl=(rel,href)=>{let t=document.querySelector(`link[rel="${rel}"]`);if(!t){t=document.createElement('link');t.rel=rel;document.head.appendChild(t);}t.href=href;};
    sm('meta[name="description"]','name','description',fullDesc);
    sm('meta[name="keywords"]','name','keywords',SITE_KEYWORDS);
    sm('meta[name="robots"]','name','robots','index, follow, max-snippet:-1, max-image-preview:large');
    sm('meta[name="author"]','name','author','Keshav Enterprises');
    sm('meta[name="theme-color"]','name','theme-color','#0A1628');
    sl('canonical',canonical);
    sm('meta[property="og:title"]','property','og:title',fullTitle);
    sm('meta[property="og:description"]','property','og:description',fullDesc);
    sm('meta[property="og:type"]','property','og:type',pageType==='article'?'article':'website');
    sm('meta[property="og:url"]','property','og:url',canonical);
    sm('meta[property="og:image"]','property','og:image',OG_IMAGE);
    sm('meta[name="twitter:card"]','name','twitter:card','summary_large_image');
    sm('meta[name="geo.region"]','name','geo.region','IN-UP');
    sm('meta[name="geo.placename"]','name','geo.placename','Shamli, Uttar Pradesh');
    if(schema){let ld=document.getElementById('ld-json');if(!ld){ld=document.createElement('script');ld.id='ld-json';ld.type='application/ld+json';document.head.appendChild(ld);}ld.textContent=JSON.stringify(schema);}
  },[title,description,schema,pageType,canonicalPath,publishedTime]);
  return null;
});

/* ─────────────────────────────────────────────────────────────
   OEM LOGO ITEM — PNG first, styled text fallback
   Matches reference: large clean brand name, on white strip
   ───────────────────────────────────────────────────────────── */
const OEM_FALLBACK_STYLES = {
  'Triveni':          { color:'#003087', fontSize:'1.35rem', weight:'900', italic:false },
  'Siemens':          { color:'#009999', fontSize:'1.5rem',  weight:'900', italic:false },
  'BHEL':             { color:'#003087', fontSize:'1.35rem', weight:'900', italic:false },
  'Belliss & Morcom': { color:'#0a5c36', fontSize:'1.1rem',  weight:'800', italic:false },
  'Maxwatt':          { color:'#cc0000', fontSize:'1.35rem', weight:'900', italic:false },
  'Man Turbo':        { color:'#cc0000', fontSize:'1.1rem',  weight:'900', italic:false },
  'Chola Turbo':      { color:'#003087', fontSize:'1.2rem',  weight:'800', italic:false },
  'DLF-Skoda':        { color:'#1a1a1a', fontSize:'1.2rem',  weight:'800', italic:false },
  'KKK':              { color:'#1a1a1a', fontSize:'1.5rem',  weight:'900', italic:false },
  'ABB':              { color:'#ff0000', fontSize:'1.8rem',  weight:'900', italic:false },
};

const OEMLogoItem = memo(({oem, logoFile}) => {
  const [err, setErr] = useState(false);
  const s = OEM_FALLBACK_STYLES[oem] || {color:'#1a1a1a', fontSize:'1.2rem', weight:'800'};
  if (logoFile && !err) {
    return (
      <img
        src={logoFile}
        alt={oem}
        width="160" height="60"
        loading="lazy"
        decoding="async"
        className="max-h-12 max-w-[140px] md:max-w-[160px] object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
        onError={()=>setErr(true)}
      />
    );
  }
  /* Styled text fallback — matches reference image typography */
  return (
    <span
      className="whitespace-nowrap select-none transition-all duration-300 opacity-60 hover:opacity-100"
      style={{
        color: s.color,
        fontSize: s.fontSize,
        fontWeight: s.weight,
        fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
      }}
    >
      {oem}
    </span>
  );
});

/* ─────────────────────────────────────────────────────────────
   BRAND LOGO
   ───────────────────────────────────────────────────────────── */
const BrandLogo = memo(({scrolled, forceWhite, navigate}) => {
  const [imgErr, setImgErr] = useState(false);
  const tc = forceWhite ? 'text-white' : (scrolled ? 'text-white' : 'text-white');
  return (
    <a href="#/" onClick={e=>{e.preventDefault();navigate('/');}} aria-label="Keshav Enterprises — Home"
      className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm">
      {!imgErr
        ? <img src="keshav-logo.png" alt="Keshav Enterprises" width="48" height="48"
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
            onError={()=>setImgErr(true)}/>
        : <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-blue-400/30">
            <Settings className="w-6 h-6 text-white" aria-hidden="true"/>
          </div>}
      <div className={`font-display font-black text-xl sm:text-2xl tracking-tight ${tc} flex items-center uppercase`}>
        KESHAV<span className="text-blue-400 mx-1">·</span>ENTERPRISES
      </div>
    </a>
  );
});

/* ─────────────────────────────────────────────────────────────
   TRUST BADGES
   ───────────────────────────────────────────────────────────── */
const MakeInIndiaBadge = memo(() => {
  const [e,sE]=useState(false);
  return (
    <div className="inline-flex items-center space-x-3 glass px-4 py-2.5 rounded-lg shadow-xl w-fit" role="img" aria-label="Make In India — Vocal For Local">
      {!e?<img src="make-in-india.png" alt="Make In India" width="32" height="32" className="h-8 object-contain" onError={()=>sE(true)}/>:<div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"><Zap className="w-4 h-4 text-white" aria-hidden="true"/></div>}
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none uppercase tracking-widest">Make In India</span>
        <span className="text-blue-300 text-[11px] font-bold leading-none uppercase tracking-wider mt-1">Vocal For Local</span>
      </div>
    </div>
  );
});

const IndiaMartBadge = memo(() => {
  const [e,sE]=useState(false);
  return (
    <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer"
      aria-label="View on IndiaMART — Verified Supplier 4.3/5"
      className="inline-flex items-center space-x-3 glass px-4 py-2.5 rounded-lg shadow-xl hover:bg-white/10 transition-colors group cursor-pointer w-fit">
      {!e?<div className="h-8 bg-white rounded px-1.5 flex items-center justify-center"><img src="indiamart-logo.png" alt="IndiaMART" width="60" height="20" className="h-5 object-contain" onError={()=>sE(true)}/></div>
         :<div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true"/></div>}
      <div className="flex flex-col justify-center border-l border-white/20 pl-3">
        <span className="text-white font-black text-sm leading-none tracking-widest">IndiaMART Verified</span>
        <span className="text-yellow-400 text-[10px] font-black leading-none uppercase tracking-wider mt-1.5" aria-label="4.3 out of 5 stars">
          ★★★★★ <span className="text-blue-300 ml-1.5 tracking-widest">4.3/5</span>
        </span>
      </div>
    </a>
  );
});

/* ─────────────────────────────────────────────────────────────
   PRODUCT CARD
   ───────────────────────────────────────────────────────────── */
const ProductCard = memo(({product, navigate}) => {
  const [imgErr,setImgErr]=useState(false);
  const pImg=product.images?.[0];
  return (
    <article onClick={()=>navigate(`/product/${product.id}`)}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group flex flex-col h-full cursor-pointer focus-within:ring-4 focus-within:ring-blue-500/50">
      <div className="h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent z-10 group-hover:opacity-0 transition-opacity" aria-hidden="true"/>
        <span className="absolute top-4 left-4 bg-white/95 text-slate-900 border border-slate-200 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded z-20 shadow-sm">{product.category}</span>
        {pImg&&!imgErr
          ?<img src={pImg} alt={product.title} loading="lazy" decoding="async" width="400" height="192"
              className="w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
              onError={()=>setImgErr(true)}/>
          :<div className="z-0 bg-slate-100 w-full h-full flex items-center justify-center" aria-hidden="true">{getCategoryIcon(product.category)}</div>}
      </div>
      <div className="p-6 flex-1 flex flex-col bg-white">
        <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
          <a href={`#/product/${product.id}`} onClick={e=>{e.stopPropagation();e.preventDefault();navigate(`/product/${product.id}`);}} className="focus:outline-none focus-visible:underline">{product.title}</a>
        </h3>
        <p className="text-slate-600 text-sm mb-5 leading-relaxed line-clamp-2 flex-1">{product.desc}</p>
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
          <a href={waMsg(`Hello KESHAV ENTERPRISES, I need a quotation for: ${product.title}.`)}
            target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
            className="flex-1 bg-[#25D366] text-white flex items-center justify-center py-3 text-xs font-black rounded-lg hover:bg-[#1ebe5d] transition-all">
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" aria-hidden="true"/> RFQ
          </a>
          <div className="flex-1 bg-slate-900 text-white flex items-center justify-center py-3 text-xs font-black rounded-lg group-hover:bg-blue-600 transition-all pointer-events-none">
            View Specs <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform"/>
          </div>
        </div>
      </div>
    </article>
  );
});

/* ─────────────────────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────────────────────── */
const Navbar = memo(({currentPath, navigate}) => {
  const [isOpen,setIsOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const menuRef=useRef(null);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>20);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h);},[]);
  useEffect(()=>{if(!isOpen)return;const h=(e)=>{if(menuRef.current&&!menuRef.current.contains(e.target))setIsOpen(false);};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);},[isOpen]);
  useEffect(()=>{const h=(e)=>{if(e.key==='Escape')setIsOpen(false);};document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h);},[]);
  const isActive=useCallback((path)=>{
    if(path==='/'&&currentPath!=='/')return false;
    if(currentPath.startsWith('/product/')&&path==='/products')return true;
    if(currentPath.startsWith('/blog/')&&path==='/blog')return true;
    return currentPath.startsWith(path);
  },[currentPath]);
  const handleNav=useCallback((path)=>{navigate(path);setIsOpen(false);},[navigate]);
  return (
    <nav ref={menuRef} role="navigation" aria-label="Main navigation"
      className={`fixed w-full z-50 transition-all duration-400 ${scrolled?'py-3 bg-[#0A1628]/95 backdrop-blur-xl border-b border-blue-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.4)]':'py-5 bg-transparent border-b border-transparent'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-[100] font-bold">Skip to main content</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <BrandLogo scrolled={scrolled} navigate={navigate}/>
          <div className="hidden lg:flex space-x-1 items-center">
            {NAV_LINKS.map(link=>(
              <a key={link.name} href={`#${link.path}`}
                onClick={e=>{e.preventDefault();handleNav(link.path);}}
                aria-current={isActive(link.path)?'page':undefined}
                className={`relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all focus:outline-none rounded-lg ${isActive(link.path)?'text-blue-400 bg-blue-500/10':'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                {link.name}
                {isActive(link.path)&&<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full"/>}
              </a>
            ))}
            <a href="#/contact" onClick={e=>{e.preventDefault();handleNav('/contact');}}
              className="ml-3 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-black text-sm uppercase tracking-wider hover:bg-blue-500 transition-all shadow-lg glow-blue-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
              Get Quote
            </a>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={()=>setIsOpen(!isOpen)} aria-label={isOpen?'Close navigation menu':'Open navigation menu'}
              aria-expanded={isOpen} aria-controls="mobile-nav"
              className="p-2 rounded text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              {isOpen?<X className="h-7 w-7" aria-hidden="true"/>:<Menu className="h-7 w-7" aria-hidden="true"/>}
            </button>
          </div>
        </div>
      </div>
      {isOpen&&(
        <div id="mobile-nav" className="lg:hidden absolute top-full left-0 w-full bg-[#0A1628]/98 backdrop-blur-xl shadow-2xl border-t border-blue-900/30" role="menu">
          <div className="px-4 py-6 space-y-1">
            {NAV_LINKS.map(link=>(
              <a key={link.name} href={`#${link.path}`} role="menuitem"
                onClick={e=>{e.preventDefault();handleNav(link.path);}}
                aria-current={isActive(link.path)?'page':undefined}
                className={`flex items-center w-full px-5 py-4 rounded-xl text-base font-black tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive(link.path)?'text-blue-400 bg-blue-500/10':'text-slate-200 hover:text-white hover:bg-white/5'}`}>
                {link.name}
              </a>
            ))}
            <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to get a technical quote.')} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 bg-[#25D366] text-white px-5 py-4 rounded-xl text-base font-black">
              <MessageCircle className="w-5 h-5" aria-hidden="true"/> WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
});

/* ─────────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────────── */
const Footer = memo(({navigate}) => (
  <footer className="bg-[#060E1C] text-slate-300 pt-20 pb-8 border-t border-blue-900/30" role="contentinfo">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="mb-6"><BrandLogo scrolled={false} forceWhite={true} navigate={navigate}/></div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">20+ years of excellence in industrial turbine engineering and precision manufacturing. Delivering reliability to power, sugar, and process industries across India.</p>
          <div className="flex flex-col space-y-4"><MakeInIndiaBadge/><IndiaMartBadge/></div>
        </div>
        <nav aria-label="Footer quick links">
          <h3 className="text-sm font-black mb-6 text-white tracking-widest uppercase">Quick Links</h3>
          <div className="w-8 h-0.5 bg-blue-600 mb-6" aria-hidden="true"/>
          <ul className="space-y-3">
            {NAV_LINKS.map(link=>(
              <li key={link.name}>
                <a href={`#${link.path}`} onClick={e=>{e.preventDefault();navigate(link.path);}}
                  className="text-slate-400 text-sm hover:text-white hover:translate-x-1 transition-all flex items-center focus:outline-none focus-visible:underline">
                  <ChevronRight className="w-3.5 h-3.5 mr-2 text-blue-500" aria-hidden="true"/> {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-sm font-black mb-6 text-white tracking-widest uppercase">Our Services</h3>
          <div className="w-8 h-0.5 bg-blue-600 mb-6" aria-hidden="true"/>
          <ul className="space-y-3">
            {['Overhauling & Maintenance','Reverse Engineering','Turbine Erection','Spares Manufacturing','Dynamic Balancing','Lube Oil Flushing'].map(s=>(
              <li key={s} className="text-slate-400 text-sm flex items-center">
                <ChevronRight className="w-3.5 h-3.5 mr-2 text-blue-500 shrink-0" aria-hidden="true"/> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-black mb-6 text-white tracking-widest uppercase">Contact</h3>
          <div className="w-8 h-0.5 bg-blue-600 mb-6" aria-hidden="true"/>
          <address className="not-italic">
            <ul className="space-y-5">
              <li className="flex items-start"><MapPin className="w-4 h-4 text-blue-500 mr-3 mt-0.5 shrink-0" aria-hidden="true"/><span className="text-slate-400 text-sm leading-relaxed">{CONTACT_INFO.address}</span></li>
              <li className="flex items-start"><Phone className="w-4 h-4 text-blue-500 mr-3 mt-0.5 shrink-0" aria-hidden="true"/>
                <div className="text-slate-400 text-sm space-y-1">
                  {CONTACT_INFO.phones.map(p=><div key={p}><a href={`tel:${p.replace(/\s/g,'')}`} className="hover:text-white transition-colors">{p}</a></div>)}
                </div>
              </li>
              <li className="flex items-start"><Mail className="w-4 h-4 text-blue-500 mr-3 mt-0.5 shrink-0" aria-hidden="true"/>
                <div className="text-slate-400 text-sm space-y-1">
                  <div><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a></div>
                  <div><a href={`mailto:${CONTACT_INFO.marketingEmail}`} className="hover:text-white transition-colors">{CONTACT_INFO.marketingEmail}</a></div>
                </div>
              </li>
            </ul>
          </address>
        </div>
      </div>
      {/* Social + copyright */}
      <div className="border-t border-slate-800/60 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-10 h-10 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/30 flex items-center justify-center hover:bg-[#0A66C2] transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer" aria-label="IndiaMART"
              className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center hover:bg-green-600 transition-colors">
              <ExternalLink className="w-4 h-4 text-white" aria-hidden="true"/>
            </a>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-slate-500 text-xs">© 2026 KESHAV ENTERPRISES. GST: {CONTACT_INFO.gst}</p>
            <p className="text-slate-600 text-xs mt-1">Shamli, Uttar Pradesh, India</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
));

/* ─────────────────────────────────────────────────────────────
   FLOATING BUTTONS
   ───────────────────────────────────────────────────────────── */
const FloatingButtons = memo(() => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <a href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g,'')}`}
      className="flex items-center gap-2 bg-[#0A1628]/90 backdrop-blur-sm border border-blue-800/50 text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#152B50] hover:scale-105 transition-all group font-bold text-sm"
      aria-label={`Call Keshav Enterprises: ${CONTACT_INFO.phones[0]}`}>
      <Phone className="w-4 h-4 text-blue-400" aria-hidden="true"/>
      <span className="hidden group-hover:block">{CONTACT_INFO.phones[0]}</span>
    </a>
    <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to request a technical quote.')}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat with Keshav Enterprises on WhatsApp"
      className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_24px_rgba(37,211,102,0.5)] hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300 group relative">
      <MessageCircle className="w-7 h-7" aria-hidden="true"/>
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chat with an Engineer</span>
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" aria-hidden="true"/>
    </a>
  </div>
));

/* ─────────────────────────────────────────────────────────────
   PRODUCT DETAIL PAGE
   ───────────────────────────────────────────────────────────── */
const ProductDetailPage = ({productId, navigate}) => {
  const [activeImg,setActiveImg]=useState(0);
  const [imgErr,setImgErr]=useState(false);
  const [tab,setTab]=useState('specs');
  const product=useMemo(()=>PRODUCTS.find(p=>p.id===productId),[productId]);
  useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});setActiveImg(0);setImgErr(false);setTab('specs');},[productId]);
  const related=useMemo(()=>product?PRODUCTS.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,3):[],[product]);
  if(!product) return (
    <main id="main-content" className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center bg-slate-50">
      <div><Settings className="w-20 h-20 text-slate-300 mx-auto mb-6" aria-hidden="true"/>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Product Not Found</h1>
        <button onClick={()=>navigate('/products')} className="text-blue-600 font-bold hover:underline">Return to Catalog</button>
      </div>
    </main>
  );
  const activeImage=product.images?.[activeImg];
  return (
    <main id="main-content" className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs font-black text-slate-500 mb-8 uppercase tracking-widest flex-wrap gap-2 pt-4">
          <button onClick={()=>navigate('/products')} className="hover:text-blue-600 transition-colors flex items-center focus:outline-none focus-visible:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" aria-hidden="true"/> Catalog
          </button>
          <span aria-hidden="true">/</span>
          <button onClick={()=>navigate('/products')} className="hover:text-blue-600 transition-colors text-slate-400 focus:outline-none focus-visible:underline">{product.category}</button>
          <span aria-hidden="true">/</span>
          <span className="text-slate-800 truncate max-w-[200px] md:max-w-full normal-case font-bold" aria-current="page">{product.title}</span>
        </nav>
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 lg:p-10 bg-white flex flex-col items-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden mb-6 shadow-inner">
                {activeImage&&!imgErr
                  ?<img src={activeImage} alt={`${product.title} view ${activeImg+1}`} loading="lazy" decoding="async" width="500" height="500"
                      className="w-full h-full object-contain p-8 mix-blend-multiply" onError={()=>setImgErr(true)}/>
                  :<div className="flex flex-col items-center justify-center opacity-30 w-full h-full" aria-hidden="true">
                    {getCategoryIcon(product.category)}
                    <span className="mt-4 font-bold text-slate-500 uppercase tracking-widest text-sm">Image Pending</span>
                  </div>}
              </div>
              {product.images?.length>1&&(
                <div className="flex gap-3 w-full overflow-x-auto pb-3 scrollbar-hide">
                  {product.images.map((img,idx)=>(
                    <button key={idx} onClick={()=>{setActiveImg(idx);setImgErr(false);}} aria-label={`View image ${idx+1}`} aria-pressed={activeImg===idx}
                      className={`shrink-0 w-16 h-16 bg-white rounded-xl border-2 overflow-hidden transition-all focus:outline-none ${activeImg===idx?'border-blue-600 shadow-lg scale-105':'border-slate-200 hover:border-blue-400 opacity-70 hover:opacity-100'}`}>
                      <img src={img} alt="" loading="lazy" width="64" height="64" className="w-full h-full object-cover p-1.5 mix-blend-multiply"
                        onError={e=>{e.target.closest('button').style.display='none';}}/>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col">
              <div className="mb-4"><span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-md">{product.category}</span></div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">{product.title}</h1>
              <p className="text-slate-600 text-base mb-7 leading-relaxed">{product.desc}</p>
              <div className="mb-7 bg-slate-900 p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true"><Factory className="w-24 h-24 text-white"/></div>
                <div className="relative z-10">
                  <h2 className="font-black text-blue-400 text-xs uppercase tracking-widest mb-2 flex items-center"><Target className="w-4 h-4 mr-2" aria-hidden="true"/> Primary Application</h2>
                  <p className="text-white text-sm leading-relaxed">{product.usage}</p>
                </div>
              </div>
              <div role="tablist" className="mb-5">
                <div className="flex border-b border-slate-200 mb-5 gap-1">
                  {[['specs','Technical Data'],['features','Key Features']].map(([k,label])=>(
                    <button key={k} role="tab" aria-selected={tab===k} onClick={()=>setTab(k)}
                      className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-t-lg transition-all focus:outline-none ${tab===k?'bg-blue-600 text-white':'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                      {label}
                    </button>
                  ))}
                </div>
                {tab==='specs'&&product.specs&&(
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse"><caption className="sr-only">Technical specifications for {product.title}</caption>
                      <tbody className="divide-y divide-slate-100">
                        {Object.entries(product.specs).map(([k,v],i)=>(
                          <tr key={i} className={`hover:bg-blue-50/30 ${i%2===0?'bg-white':'bg-slate-50/50'}`}>
                            <th scope="row" className="p-3.5 w-2/5 text-slate-500 font-black text-[10px] uppercase tracking-widest border-r border-slate-100 text-left">{k}</th>
                            <td className="p-3.5 text-slate-800 font-semibold text-sm leading-relaxed">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {tab==='features'&&(
                  <ul className="border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
                    {product.features.map((f,i)=>(
                      <li key={i} className="bg-white hover:bg-slate-50 transition-colors p-4 text-slate-700 text-sm flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mr-3 shrink-0 mt-0.5" aria-hidden="true"/>{f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-auto pt-7 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
                <a href={waMsg(`Hello KESHAV ENTERPRISES, I am interested in: *${product.title}*. Please share technical specs and quote.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-black text-base hover:bg-[#1ebe5d] transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                  <MessageCircle className="w-5 h-5 mr-2.5" aria-hidden="true"/> Request Quote via WhatsApp
                </a>
                <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-white border-2 border-slate-900 text-slate-900 py-4 rounded-xl font-black text-base hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                  <ExternalLink className="w-5 h-5 mr-2.5" aria-hidden="true"/> View on IndiaMART
                </a>
              </div>
            </div>
          </div>
        </div>
        {related.length>0&&(
          <section aria-labelledby="related-heading" className="mt-10">
            <h2 id="related-heading" className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p=><ProductCard key={p.id} product={p} navigate={navigate}/>)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
   ───────────────────────────────────────────────────────────── */
const HomePage = ({navigate}) => {
  const [loaded,setLoaded]=useState(false);
  const [heroErr,setHeroErr]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),80);return()=>clearTimeout(t);},[]);
  const featuredProducts=useMemo(()=>PRODUCTS.slice(0,16),[]);

  return (
    <main id="main-content" className="bg-white">
      <SEOHead title="Industrial Turbine Engineering & Spares — Shamli, UP" schema={LOCAL_SCHEMA} canonicalPath="/" pageType="website"/>
      <style>{GLOBAL_CSS}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1628]" aria-labelledby="hero-heading">
        {/* ── FULL-BLEED HERO BACKGROUND at 90% opacity — cinematic blend ── */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* The main image at 90% — rich and eye-catching */}
          {!heroErr&&<img src="hero-background.png" alt="" width="1920" height="1080" fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{opacity:0.90}}
            onError={()=>setHeroErr(true)}/>}
          {/* Left gradient — keeps text legible, fades into navy */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/75 to-[#0A1628]/20"/>
          {/* Bottom gradient — grounds the section */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/30"/>
          {/* Subtle color grade — deepens blues, adds atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-cyan-950/20"/>
          {/* Grain-like grid texture for industrial feel */}
          <div className="bg-grid absolute inset-0" style={{opacity:0.035}}/>
          {/* Blue glow orb — makes image blend feel intentional */}
          <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]"/>
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px]"/>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left — text content */}
          <div className="w-full lg:w-[58%]">
            <div className={`transition-all duration-1000 ${loaded?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <MakeInIndiaBadge/><IndiaMartBadge/>
              </div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5 anim-slide-right delay-100">
                <div className="w-10 h-0.5 bg-blue-400 rounded-full"/>
                <span className="font-display text-blue-400 font-black uppercase tracking-[0.25em] text-sm">Industrial Turbine Engineering</span>
              </div>
              <h1 id="hero-heading" className="font-display font-black text-white leading-[1.0] tracking-tight mb-6 anim-fade-up delay-200"
                style={{fontSize:'clamp(3rem,7vw,5.5rem)'}}>
                PRECISION<br/>
                <span className="text-gradient">ENGINEERING</span><br/>
                FOR MAXIMUM<br/>
                <span className="text-white/70">UPTIME.</span>
              </h1>
              <div className="glass border-l-4 border-l-blue-400 p-5 mb-10 max-w-xl rounded-r-2xl anim-fade-up delay-400">
                <p className="text-slate-200 text-lg leading-relaxed">
                  Complete turbine overhauling, rapid reverse engineering, and OEM-compatible spares for steam turbines <strong className="text-white">5 kW to 27 MW</strong>. Trusted across India's power generation and process industries.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 anim-fade-up delay-500">
                <button onClick={()=>navigate('/contact')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-blue-500 transition-all flex items-center justify-center shadow-[0_0_40px_rgba(30,111,255,0.4)] hover:shadow-[0_0_60px_rgba(30,111,255,0.6)] group hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                  Request Technical Quote <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" aria-hidden="true"/>
                </button>
                <a href={waMsg('Hi KESHAV ENTERPRISES, we have an emergency breakdown. Please assist immediately.')}
                  target="_blank" rel="noopener noreferrer"
                  className="glass text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <LifeBuoy className="mr-3 w-5 h-5 text-cyan-400" aria-hidden="true"/> Emergency Breakdown
                </a>
              </div>
            </div>
          </div>

          {/* Right — floating stat cards over the background image */}
          <div className="w-full lg:w-[38%] flex flex-col gap-4 anim-fade-in delay-600" aria-hidden="true">
            {[
              {label:'Turbine Range',value:'5 kW – 27 MW',sub:'Back-pressure & condensing',color:'text-blue-400',border:'border-blue-500/30'},
              {label:'OEM Brands',value:'10+ Covered',sub:'Triveni · Siemens · BHEL & more',color:'text-cyan-400',border:'border-cyan-500/30'},
              {label:'Emergency Support',value:'24 × 7',sub:'Multi-location engineer response',color:'text-green-400',border:'border-green-500/30'},
              {label:'Experience',value:'20+ Years',sub:'Of industrial turbine expertise',color:'text-yellow-400',border:'border-yellow-500/30'},
            ].map(({label,value,sub,color,border},i)=>(
              <div key={i} className={`glass-dark rounded-2xl px-6 py-5 border ${border} shadow-xl hover:-translate-x-1 transition-transform`}>
                <div className={`font-black text-[10px] uppercase tracking-[0.25em] mb-1 ${color}`}>{label}</div>
                <div className="font-display font-black text-white text-2xl md:text-3xl mb-0.5">{value}</div>
                <div className="text-slate-400 text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60" aria-hidden="true">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400 to-transparent"/>
        </div>
      </section>

      {/* ── OEM BRANDS MARQUEE — white strip with real PNG logos ── */}
      <section className="bg-white py-10 border-y border-slate-200 overflow-hidden" aria-label="OEM-compatible brands">
        <div className="max-w-7xl mx-auto px-4 mb-7">
          <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.3em]">OEM-Compatible &amp; Trusted By Industry Leaders</p>
        </div>
        <div className="relative w-full overflow-hidden flex items-center" aria-hidden="true">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 w-20 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"/>
          <div className="absolute right-0 top-0 w-20 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"/>
          <div className="ke-marquee gap-0 px-4 items-center">
            {[...OEMS,...OEMS].map((oem,i)=>{
              /* Each OEM gets its exact logo filename — upload these PNGs to /public */
              const logoMap = {
                'Triveni':       'triveni-logo.png',
                'Siemens':       'siemens-logo.png',
                'BHEL':          'bhel-logo.png',
                'Belliss & Morcom': 'belliss-logo.png',
                'Maxwatt':       'maxwatt-logo.png',
                'Man Turbo':     'man-turbo-logo.png',
                'Chola Turbo':   'chola-turbo-logo.png',
                'DLF-Skoda':     'dlf-skoda-logo.png',
                'KKK':           'kkk-logo.png',
                'ABB':           'abb-logo.png',
              };
              const logoFile = logoMap[oem] || '';
              return (
                <div key={i} className="shrink-0 flex items-center justify-center px-10 md:px-14 h-20 border-r border-slate-100 last:border-r-0 group">
                  {/* Logo image — try to load first */}
                  <OEMLogoItem oem={oem} logoFile={logoFile}/>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0A1628] py-16" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Company statistics</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {Icon:Clock,stat:'20+',label:'Years Experience',sub:'In turbine engineering'},
              {Icon:Settings,stat:'10+',label:'OEM Brands',sub:'Triveni, Siemens, BHEL & more'},
              {Icon:TrendingUp,stat:'27 MW',label:'Max Turbine',sub:'5 kW to 27 MW range'},
              {Icon:Users,stat:'24×7',label:'Emergency Support',sub:'Multi-location engineers'},
            ].map(({Icon,stat,label,sub},i)=>(
              <div key={i} className="text-center group">
                <div className="w-14 h-14 bg-blue-600/15 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20 group-hover:bg-blue-600/30 transition-colors">
                  <Icon className="w-7 h-7 text-blue-400" aria-hidden="true"/>
                </div>
                <div className="font-display font-black text-white text-3xl md:text-4xl tracking-tight mb-1">{stat}</div>
                <div className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-xs text-slate-500">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS MARQUEE ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200 overflow-hidden" aria-labelledby="featured-products-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex justify-between items-end gap-6">
          <div>
            <h2 id="featured-products-heading" className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">Featured Engineering Products</h2>
            <div className="w-16 h-1.5 bg-blue-600 rounded-full" aria-hidden="true"/>
          </div>
          <button onClick={()=>navigate('/products')} className="hidden sm:flex items-center font-black text-blue-600 hover:text-blue-800 text-base group focus:outline-none focus-visible:underline">
            Full Catalog <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
          </button>
        </div>
        <div className="relative w-full overflow-hidden" aria-hidden="true">
          <div className="absolute left-0 top-0 w-12 md:w-24 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"/>
          <div className="absolute right-0 top-0 w-12 md:w-24 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"/>
          <div className="ke-marquee-slow gap-5 px-4 py-4">
            {[...featuredProducts,...featuredProducts].map((product,i)=>(
              <div key={`${product.id}-${i}`} onClick={()=>navigate(`/product/${product.id}`)}
                className="group flex flex-col shrink-0 w-64 md:w-72 bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="h-44 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden">
                  <span className="absolute top-3 left-3 bg-white/95 text-slate-900 border border-slate-200 text-[9px] font-black px-2 py-1 uppercase tracking-widest rounded z-20 shadow-sm">{product.category}</span>
                  {product.images?.[0]
                    ?<img src={product.images[0]} alt={product.title} loading="lazy" decoding="async" width="288" height="176"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={e=>{e.target.style.display='none';}}/>
                    :<div className="w-full h-full flex items-center justify-center" aria-hidden="true">{getCategoryIcon(product.category)}</div>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-black text-slate-900 mb-1.5 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{product.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">{product.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500">View Details</span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white" aria-hidden="true"/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center sm:hidden px-4">
          <button onClick={()=>navigate('/products')} className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-blue-600 transition-all flex items-center justify-center text-base">
            View Full Catalog <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true"/>
          </button>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24 md:py-32 bg-white" aria-labelledby="services-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">What We Do</span>
            <h2 id="services-preview-heading" className="font-display font-black text-slate-900 text-4xl md:text-5xl tracking-tight mb-4">Technical Services</h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-5" aria-hidden="true"/>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">End-to-end turbine lifecycle services from erection through overhauling to precision reverse engineering.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((service,i)=>{
              const Icon=SERVICE_ICONS[service.id];
              return (
                <div key={service.id} className={`group bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all anim-fade-up delay-${(i+1)*100}`}>
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" aria-hidden="true"/>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{service.desc}</p>
                  <button onClick={()=>navigate('/services')} aria-label={`Learn more about ${service.title}`}
                    className="text-blue-600 font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all focus:outline-none focus-visible:underline">
                    Learn More <ArrowRight className="w-3.5 h-3.5" aria-hidden="true"/>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <button onClick={()=>navigate('/services')} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-base hover:bg-blue-600 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              View All Services <ArrowRight className="inline ml-2 w-5 h-5" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES — image card grid matching Industries page style ── */}
      <section className="py-20 bg-[#0A1628] border-y border-blue-900/30" aria-labelledby="industries-home-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <span className="text-blue-400 font-black text-xs uppercase tracking-[0.25em] mb-3 block">Who We Serve</span>
              <h2 id="industries-home-heading" className="font-display font-black text-white text-3xl md:text-4xl tracking-tight">Industries We Serve</h2>
              <div className="w-16 h-0.5 bg-blue-500 mt-4" aria-hidden="true"/>
            </div>
            <button onClick={()=>navigate('/industries')} className="text-blue-400 font-black text-sm hover:text-white transition-colors flex items-center gap-2 group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map(ind=>{
              const {Icon}=ind;
              return (
                <button key={ind.id} onClick={()=>navigate('/industries')}
                  className="relative rounded-2xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-left"
                  style={{minHeight:'220px'}}
                  aria-label={`View ${ind.title} services`}>
                  {/* Background image */}
                  {ind.image && (
                    <img src={ind.image} alt="" aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy" width="420" height="220"
                      onError={e=>{e.target.style.display='none';}}/>
                  )}
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${ind.color} opacity-60`}/>
                  <div className="absolute inset-0 bg-[#0A1628]/55 group-hover:bg-[#0A1628]/40 transition-colors duration-300"/>
                  {/* Content */}
                  <div className="relative z-10 p-7 h-full flex flex-col justify-between" style={{minHeight:'220px'}}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${ind.border} bg-black/30 backdrop-blur-sm mb-auto`}>
                      <Icon className={`w-6 h-6 ${ind.accent}`} aria-hidden="true"/>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-white font-display font-black text-xl tracking-tight mb-1 drop-shadow">{ind.title}</h3>
                      <p className={`text-xs font-black ${ind.accent} uppercase tracking-widest opacity-80`}>{ind.turbines}</p>
                      <div className="mt-3 flex items-center gap-2 text-white/60 group-hover:text-white/90 transition-colors">
                        <span className="text-xs font-bold">View Services</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
                      </div>
                    </div>
                  </div>
                  {/* Hover border */}
                  <div className={`absolute inset-0 rounded-2xl border-2 ${ind.border} opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none`}/>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-slate-50" aria-labelledby="why-us-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">Why Keshav Enterprises</span>
              <h2 id="why-us-heading" className="font-display font-black text-slate-900 text-4xl md:text-5xl tracking-tight mb-6">Precision Manufacturing.<br/><span className="text-blue-600">Zero Compromise.</span></h2>
              <div className="w-20 h-1 bg-blue-600 mb-8 rounded-full" aria-hidden="true"/>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                We manufacture high-tolerance turbine spares, industrial strainers, and metallic expansion bellows (DN 15 to DN 12,000). Using 3D laser scanning, CMM, and PMI testing, we recreate obsolete components to exact specifications — drastically reducing plant downtime.
              </p>
              <div className="space-y-4">
                {[
                  {Icon:Eye,'label':'Ex-OEM Engineers',text:'Team of engineers from Triveni, Siemens, BHEL, Belliss, KKK & ABB'},
                  {Icon:Gauge,'label':'ISO/API Standards',text:'Dynamic balancing 50–2,000 kg to ISO 1940/API 670 certification'},
                  {Icon:FlaskConical,'label':'PMI Material Testing',text:'3D scanning + CMM + XRF ensures exact material & dimensional match'},
                  {Icon:Truck,'label':'Reduced Lead Times',text:'In-house reverse engineering eliminates 12–18 month OEM wait times'},
                ].map(({Icon,label,text},i)=>(
                  <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" aria-hidden="true"/>
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-sm mb-1">{label}</div>
                      <div className="text-slate-500 text-sm leading-relaxed">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {[
                  {Icon:Cog,label:'Turbine Overhauling',sub:'All major OEMs',color:'from-blue-600/20 to-blue-800/10',border:'border-blue-500/30',accent:'text-blue-400'},
                  {Icon:FlaskConical,label:'Reverse Engineering',sub:'3D Scan + CMM + PMI',color:'from-purple-600/20 to-purple-800/10',border:'border-purple-500/30',accent:'text-purple-400'},
                  {Icon:Gauge,label:'Dynamic Balancing',sub:'ISO 1940 / API 670',color:'from-cyan-600/20 to-cyan-800/10',border:'border-cyan-500/30',accent:'text-cyan-400'},
                  {Icon:Droplets,label:'Lube Oil Flushing',sub:'ISO 4406:99',color:'from-green-600/20 to-green-800/10',border:'border-green-500/30',accent:'text-green-400'},
                  {Icon:Target,label:'Machine Alignment',sub:'Laser precision',color:'from-orange-600/20 to-orange-800/10',border:'border-orange-500/30',accent:'text-orange-400'},
                  {Icon:Wrench,label:'Erection & Commission',sub:'OEM documentation',color:'from-yellow-600/20 to-yellow-800/10',border:'border-yellow-500/30',accent:'text-yellow-400'},
                ].map(({Icon,label,sub,color,border,accent},i)=>(
                  <div key={i} className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300 group`}>
                    <div className={`w-10 h-10 bg-black/30 rounded-xl flex items-center justify-center border ${border}`}>
                      <Icon className={`w-5 h-5 ${accent}`} aria-hidden="true"/>
                    </div>
                    <div>
                      <div className="text-white font-black text-sm leading-tight mb-1">{label}</div>
                      <div className={`text-[10px] font-black ${accent} uppercase tracking-wider opacity-70`}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-blue-600 py-20 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-hex opacity-30" aria-hidden="true"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 id="cta-heading" className="font-display font-black text-white text-4xl md:text-5xl tracking-tight mb-5">Ready to Get Started?</h2>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Talk to our engineering team about your specific turbine or plant requirements.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button onClick={()=>navigate('/contact')} className="bg-white text-blue-600 px-10 py-4 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Request a Technical Quote
            </button>
            <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to discuss a project requirement.')} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-3 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300">
              <MessageCircle className="w-6 h-6" aria-hidden="true"/> WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ─────────────────────────────────────────────────────────────
   ABOUT PAGE  ← NEW
   ───────────────────────────────────────────────────────────── */
const AboutPage = ({navigate}) => {
  const milestones = [
    {year:'2000s',title:'Foundation',desc:'Founded in Shamli, UP as a specialist turbine maintenance outfit serving local sugar mills with hands-on overhauling.'},
    {year:'2005',title:'OEM Expertise',desc:'Built a team of ex-OEM engineers from Triveni, BHEL, and Belliss & Morcom — enabling true like-for-like maintenance standards.'},
    {year:'2010',title:'Reverse Engineering',desc:'Invested in 3D laser scanning and CMM equipment to offer in-house reverse engineering for obsolete turbine components.'},
    {year:'2015',title:'Product Range Expansion',desc:'Launched a comprehensive product line covering industrial filtration, expansion joints, strainers, rubber products, and flexible hoses.'},
    {year:'2020',title:'ISO/API Balancing',desc:'Commissioned dynamic balancing machines to ISO 1940 / API 670 standards — handling rotors from 50 to 2,000 kg.'},
    {year:'2026',title:'Pan-India Reach',desc:'Today serving power, sugar, paper, oil & gas, petrochemical, and agro industries across India with 24×7 emergency support.'},
  ];

  const values = [
    {Icon:Shield,'label':'Engineering Integrity','text':'Every component, every clearance, every dimension documented and verified. No shortcuts on safety-critical equipment.'},
    {Icon:Target,'label':'OEM-Grade Standards','text':'Ex-OEM engineers from Triveni, Siemens, BHEL, and ABB — delivering maintenance at the same level as the original manufacturer.'},
    {Icon:Lightbulb,'label':'Innovation in Reverse Engineering','text':'3D scanning and PMI testing give clients access to obsolete spares without 18-month OEM lead times.'},
    {Icon:Heart,'label':'Customer Uptime First','text':'We measure success in plant availability. 24×7 emergency response because shutdowns don\'t follow business hours.'},
  ];

  return (
    <main id="main-content" className="pt-24 pb-20 bg-white min-h-screen">
      <SEOHead title="About Keshav Enterprises — 20+ Years of Turbine Engineering Excellence"
        description="Keshav Enterprises — 20+ years of industrial turbine engineering, reverse engineering, and OEM-compatible spare parts manufacturing from Shamli, UP, India."
        canonicalPath="/about" pageType="website"/>
      <style>{GLOBAL_CSS}</style>

      {/* Hero banner */}
      <div className="bg-[#0A1628] text-white py-24 mb-0 relative overflow-hidden">
        <div className="bg-grid absolute inset-0" aria-hidden="true"/>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" aria-hidden="true"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <span className="text-blue-400 font-black text-xs uppercase tracking-[0.25em] mb-4 block">Our Story</span>
            <h1 className="font-display font-black text-white leading-tight tracking-tight mb-6" style={{fontSize:'clamp(2.5rem,5vw,4rem)'}}>
              TWO DECADES OF<br/>
              <span className="text-gradient">PRECISION ENGINEERING</span>
            </h1>
            <div className="w-20 h-0.5 bg-blue-500 mb-6" aria-hidden="true"/>
            <p className="text-slate-300 text-xl leading-relaxed max-w-2xl">
              From a specialist turbine maintenance outfit in Shamli, Uttar Pradesh — to a trusted, pan-India engineering partner for power plants, sugar mills, refineries, and process industries. Built on ex-OEM expertise. Driven by zero-tolerance for plant downtime.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button onClick={()=>navigate('/services')} className="bg-blue-600 text-white px-7 py-3.5 rounded-xl font-black text-sm hover:bg-blue-500 transition-all flex items-center gap-2 group">
                Our Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
              </button>
              <button onClick={()=>navigate('/contact')} className="glass text-white border border-white/20 px-7 py-3.5 rounded-xl font-black text-sm hover:bg-white/10 transition-all">
                Contact Engineering Team
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 hidden lg:block" aria-hidden="true">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(30,111,255,0.2)]" style={{width:'320px',height:'320px'}}>
              <img src="hero-background.png" alt="" width="320" height="320" className="w-full h-full object-cover opacity-50"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent"/>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-display font-black text-white text-4xl mb-1">20+</div>
                <div className="text-blue-300 text-xs font-black uppercase tracking-widest">Years of Engineering Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {stat:'20+',label:'Years in Business'},
              {stat:'10+',label:'OEM Brands Covered'},
              {stat:'27 MW',label:'Max Turbine Handled'},
              {stat:'24×7',label:'Emergency Response'},
            ].map(({stat,label},i)=>(
              <div key={i}>
                <div className="font-display font-black text-white text-3xl md:text-4xl mb-1">{stat}</div>
                <div className="text-blue-100 text-xs font-black uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Company overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">Who We Are</span>
            <h2 className="font-display font-black text-slate-900 text-4xl tracking-tight mb-5">Engineering Partners for India's Industrial Backbone</h2>
            <div className="w-16 h-1 bg-blue-600 mb-6 rounded-full" aria-hidden="true"/>
            <div className="space-y-5 text-slate-600 text-base leading-relaxed">
              <p>Keshav Enterprises is a precision industrial engineering company headquartered in Shamli, Uttar Pradesh. For over two decades, we have provided specialist turbine maintenance, reverse engineering, and OEM-compatible spare parts to India's most demanding industrial sectors.</p>
              <p>Our engineering team includes ex-OEM specialists from Triveni, Siemens, BHEL, Belliss & Morcom, Man Turbo, KKK, and ABB — providing clients with the same level of technical expertise as the original equipment manufacturers, at a fraction of the lead time and cost.</p>
              <p>We cover steam turbines from 5 kW to 27 MW — back-pressure and condensing, horizontal and vertical, single and multi-stage. Our workshop is equipped with 3D laser scanners, CMM coordinate measuring machines, dynamic balancing machines (50–2,000 kg), and precision CNC lathes for in-house manufacture of critical rotating components.</p>
              <p>With IndiaMART TrustSeal Verified status and a 4.3/5 buyer rating, we are a recognized and trusted supplier across power plants, sugar mills, paper mills, oil & gas facilities, petrochemical plants, and agro industries across India.</p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="font-black text-xl mb-4 tracking-tight">Core Capabilities</h3>
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
                ].map((item,i)=>(
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true"/>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" aria-hidden="true"/>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base mb-1">Our Location</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                  <p className="text-slate-500 text-xs mt-2 font-bold">GST: {CONTACT_INFO.gst}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">What Drives Us</span>
            <h2 className="font-display font-black text-slate-900 text-4xl tracking-tight">Our Core Values</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" aria-hidden="true"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {values.map(({Icon,label,text},i)=>(
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all group text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                  <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" aria-hidden="true"/>
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
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">Our Journey</span>
            <h2 className="font-display font-black text-slate-900 text-4xl tracking-tight">Company Milestones</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" aria-hidden="true"/>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-200 rounded-full" aria-hidden="true"/>
            <div className="space-y-10">
              {milestones.map(({year,title,desc},i)=>(
                <div key={i} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${i%2===0?'md:flex-row':'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md" style={{top:'1.5rem'}} aria-hidden="true"/>
                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-[45%] ${i%2===0?'md:mr-auto md:pr-12':'md:ml-auto md:pl-12'}`}>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all">
                      <span className="font-display font-black text-blue-600 text-2xl block mb-1">{year}</span>
                      <h3 className="font-black text-slate-900 text-lg mb-2 tracking-tight">{title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OEM compatibility — styled like Image 2 */}
        <div className="bg-[#0D1F3C] rounded-3xl p-10 md:p-16 text-center mb-12 relative overflow-hidden border border-blue-900/40">
          {/* Background texture */}
          <div className="absolute inset-0 bg-hex opacity-20" aria-hidden="true"/>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-blue-600/10 blur-3xl" aria-hidden="true"/>
          <div className="relative z-10">
            <span className="text-blue-400 font-black text-xs uppercase tracking-[0.25em] mb-4 block">OEM Expertise</span>
            <h2 className="font-display font-black text-white text-3xl md:text-5xl tracking-tight mb-4 leading-tight">
              10+ OEM Brands.<br/>One Engineering Partner.
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto mb-12 leading-relaxed">Our ex-OEM engineers have hands-on experience with all major turbine makes. No learning curve. No guesswork. Just authoritative technical expertise.</p>
            {/* OEM brand pills — styled exactly like Image 2 */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {OEMS.map((oem,i)=>(
                <div key={oem} className="group relative overflow-hidden bg-[#152B50] hover:bg-blue-600 border border-blue-800/60 hover:border-blue-400 px-6 py-3 rounded-full transition-all duration-300 cursor-default hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(30,111,255,0.4)]">
                  <div className="absolute inset-0 anim-shimmer opacity-0 group-hover:opacity-100"/>
                  <span className="relative z-10 text-white font-display font-black text-sm md:text-base uppercase tracking-widest whitespace-nowrap">{oem}</span>
                </div>
              ))}
            </div>
            {/* Decorative bottom line */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-600" aria-hidden="true"/>
              <span className="text-blue-400 font-black text-xs uppercase tracking-[0.25em]">5 kW to 27 MW Coverage</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-600" aria-hidden="true"/>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="font-display font-black text-slate-900 text-3xl mb-4">Work With Our Team</h3>
          <p className="text-slate-600 text-base max-w-xl mx-auto mb-8">Whether you need emergency breakdown support, planned overhauling, or obsolete spare procurement — our engineers are ready.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=>navigate('/contact')} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black text-base hover:bg-blue-500 transition-all shadow-lg flex items-center justify-center gap-2 group">
              Contact Engineering Team <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
            </button>
            <a href={waMsg('Hi KESHAV ENTERPRISES, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-black text-base hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2 shadow-lg">
              <MessageCircle className="w-5 h-5" aria-hidden="true"/> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ─────────────────────────────────────────────────────────────
   SERVICES PAGE
   ───────────────────────────────────────────────────────────── */
const ServicesPage = ({navigate}) => (
  <main id="main-content" className="pt-24 pb-20 bg-white">
    <SEOHead title="Turbine Services — Overhauling, Erection & Reverse Engineering"
      description="Complete turbine overhauling, reverse engineering, erection & commissioning, dynamic balancing, lube oil flushing, and machine alignment for steam turbines 5 kW to 27 MW."
      canonicalPath="/services" pageType="website" schema={FAQ_SCHEMA}/>
    <style>{GLOBAL_CSS}</style>
    <div className="bg-[#0A1628] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <span className="text-blue-400 font-black text-xs uppercase tracking-[0.25em] mb-4 block">What We Do</span>
        <h1 className="font-display font-black text-white text-5xl md:text-6xl tracking-tight mb-5 drop-shadow-lg">Technical Services</h1>
        <div className="w-20 h-0.5 bg-blue-500 mb-7 rounded-full" aria-hidden="true"/>
        <p className="text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed">Specialized mechanical solutions for industrial rotating equipment from 5 kW to 27 MW — ensuring peak reliability across power, sugar, paper, refinery, and petrochemical industries.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-24">
        {SERVICES.map((service,index)=>{
          const Icon=SERVICE_ICONS[service.id];
          return (
            <div key={service.id} className={`flex flex-col md:flex-row gap-16 items-start group ${index%2!==0?'md:flex-row-reverse':''}`}>
              <div className="md:w-2/5 w-full shrink-0">
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 sticky top-28 relative bg-[#0A1628]">
                  {service.image&&(<img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width="560" height="420" onError={e=>{e.target.style.display='none';}}/>)}
                  <div className="absolute inset-0 bg-hex opacity-10" aria-hidden="true"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/20 to-transparent z-10"/>
                  <div className="absolute top-5 left-5 z-20">
                    <div className="flex items-center gap-3 glass-dark px-4 py-2.5 rounded-xl shadow-lg">
                      <div className="w-9 h-9 bg-blue-600/30 rounded-lg flex items-center justify-center border border-blue-500/30 shrink-0">
                        <Icon className="w-5 h-5 text-blue-300" aria-hidden="true"/>
                      </div>
                      <span className="text-white font-black text-xs uppercase tracking-widest">{service.title}</span>
                    </div>
                  </div>
                  {!service.image&&(
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20">
                        <Icon className="w-14 h-14 text-blue-400" aria-hidden="true"/>
                      </div>
                    </div>
                  )}
                  {service.oems&&(
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">OEM Expertise</p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.oems.slice(0,6).map(oem=>(
                          <span key={oem} className="text-[10px] font-black text-slate-200 glass-dark px-2.5 py-1 rounded-full uppercase tracking-wide border border-white/10">{oem}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:w-3/5 w-full">
                <div className="text-blue-600 font-black tracking-widest text-xs uppercase mb-4 flex items-center">
                  <span className="w-8 h-0.5 bg-blue-600 mr-3"/> Service {(index+1).toString().padStart(2,'0')}
                </div>
                <h2 className="font-display font-black text-slate-900 text-4xl md:text-5xl mb-5 tracking-tight leading-tight">{service.title}</h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">{service.desc}</p>
                <div className="mb-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 px-6 py-4"><h3 className="font-black text-white text-xs uppercase tracking-widest">What We Deliver</h3></div>
                  <ul className="divide-y divide-slate-100">
                    {service.details.map((detail,i)=>(
                      <li key={i} className="flex items-start px-6 py-4 hover:bg-blue-50/30 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mr-3 shrink-0 mt-0.5" aria-hidden="true"/>
                        <span className="text-slate-700 text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={()=>navigate('/contact')} aria-label={`Inquire about ${service.title}`}
                  className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl font-black text-base hover:bg-slate-900 hover:text-white transition-colors shadow-sm hover:shadow-lg flex items-center group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
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

/* ─────────────────────────────────────────────────────────────
   PRODUCTS PAGE
   ───────────────────────────────────────────────────────────── */
const ProductsPage = ({navigate}) => {
  const [activeCategory,setActiveCategory]=useState('All');
  const [searchQuery,setSearchQuery]=useState('');
  const categoryScrollRef=useRef(null);
  const [showLeft,setShowLeft]=useState(false);
  const [showRight,setShowRight]=useState(true);
  const handleScroll=useCallback(()=>{if(!categoryScrollRef.current)return;const {scrollLeft,scrollWidth,clientWidth}=categoryScrollRef.current;setShowLeft(scrollLeft>5);setShowRight(Math.ceil(scrollLeft+clientWidth)<scrollWidth-5);},[]);
  useEffect(()=>{handleScroll();const t=setTimeout(handleScroll,250);window.addEventListener('resize',handleScroll,{passive:true});return()=>{clearTimeout(t);window.removeEventListener('resize',handleScroll);};},[activeCategory,handleScroll]);
  const scrollCats=useCallback((dir)=>{categoryScrollRef.current?.scrollBy({left:dir==='left'?-350:350,behavior:'smooth'});},[]);
  const filtered=useMemo(()=>PRODUCTS.filter(p=>{
    if(activeCategory!=='All'&&p.category!==activeCategory)return false;
    const q=searchQuery.toLowerCase().trim();
    if(!q)return true;
    return p.title.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)||(p.usage&&p.usage.toLowerCase().includes(q))||p.features.some(f=>f.toLowerCase().includes(q));
  }),[activeCategory,searchQuery]);
  const counts=useMemo(()=>PRODUCT_CATEGORIES.reduce((a,c)=>{a[c]=c==='All'?PRODUCTS.length:PRODUCTS.filter(p=>p.category===c).length;return a;},{}),[]);
  return (
    <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title="Product Catalog — Turbine Spares, Filters, Expansion Joints"
        description={`${PRODUCTS.length} precision-engineered industrial products: turbine spares, filter elements, expansion joints, strainers, flexible hoses, rubber products, and electronic equipment.`}
        canonicalPath="/products" pageType="website"/>
      <style>{GLOBAL_CSS}</style>
      <div className="bg-[#0A1628] text-white py-20 mb-12 relative overflow-hidden border-b-8 border-blue-600">
        <div className="bg-grid absolute inset-0" aria-hidden="true"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <h1 className="font-display font-black text-white text-4xl md:text-6xl mb-5 tracking-tight">Industrial Products</h1>
          <div className="w-16 h-0.5 bg-blue-500 mb-5 rounded-full" aria-hidden="true"/>
          <p className="text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed">{PRODUCTS.length} precision-engineered products across {PRODUCT_CATEGORIES.length-1} categories. ISO/API/ASME compliant with full technical specifications.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5">
          <div className="relative w-full max-w-2xl mx-auto md:mx-0">
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <input id="product-search" type="search" placeholder="Search products, specs, applications..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-200 rounded-2xl text-base font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-md"/>
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 pointer-events-none" aria-hidden="true"/>
            {searchQuery&&<button onClick={()=>setSearchQuery('')} aria-label="Clear search" className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" aria-hidden="true"/></button>}
          </div>
          <div className="relative w-full flex items-center" role="group" aria-label="Filter by product category">
            <div className={`absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none transition-opacity ${showLeft?'opacity-100':'opacity-0'}`} aria-hidden="true"/>
            <button onClick={()=>scrollCats('left')} aria-label="Scroll categories left" className={`absolute left-0 z-20 w-9 h-9 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all focus:outline-none ${showLeft?'opacity-100':'opacity-0 pointer-events-none'}`}><ChevronLeft className="w-5 h-5" aria-hidden="true"/></button>
            <div ref={categoryScrollRef} onScroll={handleScroll} className="flex gap-2.5 overflow-x-auto w-full pb-5 pt-1 px-12 snap-x scroll-smooth scrollbar-hide">
              {PRODUCT_CATEGORIES.map(cat=>(
                <button key={cat} onClick={()=>setActiveCategory(cat)} aria-pressed={activeCategory===cat}
                  className={`snap-start shrink-0 px-4 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all duration-300 border-2 flex items-center gap-2 focus:outline-none ${activeCategory===cat?'bg-slate-900 text-white border-slate-900 shadow-lg scale-105':'bg-white text-slate-600 border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm'}`}>
                  {cat}<span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeCategory===cat?'bg-white/20 text-white':'bg-slate-100 text-slate-500'}`}>{counts[cat]}</span>
                </button>
              ))}
            </div>
            <div className={`absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none transition-opacity ${showRight?'opacity-100':'opacity-0'}`} aria-hidden="true"/>
            <button onClick={()=>scrollCats('right')} aria-label="Scroll categories right" className={`absolute right-0 z-20 w-9 h-9 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all focus:outline-none ${showRight?'opacity-100':'opacity-0 pointer-events-none'}`}><ChevronRight className="w-5 h-5" aria-hidden="true"/></button>
          </div>
          {(searchQuery||activeCategory!=='All')&&(
            <div className="flex items-center gap-3 -mt-1" role="status" aria-live="polite">
              <span className="text-xs font-bold text-slate-500">{filtered.length} product{filtered.length!==1?'s':''} found</span>
              <button onClick={()=>{setSearchQuery('');setActiveCategory('All');}} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"><X className="w-3.5 h-3.5" aria-hidden="true"/>Clear</button>
            </div>
          )}
        </div>
        {filtered.length>0
          ?<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7" role="list">
              {filtered.map(p=><div key={p.id} role="listitem"><ProductCard product={p} navigate={navigate}/></div>)}
            </div>
          :<div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-300 shadow-sm" role="status">
              <Search className="w-16 h-16 text-slate-200 mx-auto mb-5" aria-hidden="true"/>
              <h2 className="text-2xl font-black text-slate-900 mb-2">No products found</h2>
              <p className="text-slate-500 mb-8">Try adjusting your search or category filter.</p>
              <button onClick={()=>{setSearchQuery('');setActiveCategory('All');}} className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black hover:bg-blue-700 transition-colors shadow-lg">Clear all filters</button>
            </div>}
      </div>
    </main>
  );
};

/* ─────────────────────────────────────────────────────────────
   INDUSTRIES PAGE
   ───────────────────────────────────────────────────────────── */
const IndustriesPage = ({navigate}) => (
  <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
    <SEOHead title="Industries Served — Power, Sugar, Oil & Gas, Petrochemical"
      description="Keshav Enterprises serves power plants, sugar mills, paper mills, oil & gas, petrochemical, and agro industries with specialized turbine engineering and industrial products."
      canonicalPath="/industries" pageType="website"/>
    <style>{GLOBAL_CSS}</style>
    <div className="bg-[#0A1628] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <h1 className="font-display font-black text-white text-5xl md:text-6xl tracking-tight mb-5 drop-shadow-lg">Industries We Serve</h1>
        <div className="w-20 h-0.5 bg-blue-500 mb-7 rounded-full" aria-hidden="true"/>
        <p className="text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed">Specialized turbine engineering and industrial product solutions across six major industry verticals.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        {INDUSTRIES.map((ind,index)=>{
          const {Icon}=ind;
          return (
            <article key={ind.id} className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-slate-200 bg-white">
              <div className={`flex flex-col ${index%2!==0?'lg:flex-row-reverse':'lg:flex-row'}`}>
                <div className="lg:w-2/5 relative overflow-hidden min-h-[380px] lg:min-h-[440px] flex-shrink-0">
                  {ind.image&&(<img src={ind.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{opacity:0.9}} loading="lazy" width="560" height="440" onError={e=>{e.target.style.display='none';}}/>)}
                  <div className={`absolute inset-0 bg-gradient-to-br ${ind.color}`}/>
                  <div className="absolute inset-0 bg-[#0A1628]/60"/>
                  <div className="relative z-10 w-full h-full p-10 flex flex-col items-center justify-center gap-6">
                    <div className="w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/25 shadow-2xl group-hover:scale-110 group-hover:bg-white/25 transition-all duration-500">
                      <Icon className="w-12 h-12 text-white drop-shadow-lg" aria-hidden="true"/>
                    </div>
                    <div className="text-center">
                      <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-lg leading-tight mb-3">{ind.title}</h2>
                      <div className="h-0.5 w-16 rounded-full mx-auto mb-4 bg-white/50" aria-hidden="true"/>
                      <p className={`text-sm font-black ${ind.accent} bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full uppercase tracking-widest border border-white/10`}>{ind.turbines}</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                      {ind.useCases.slice(0,3).map((uc,i)=>(
                        <span key={i} className="text-[10px] font-black text-white/90 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full uppercase tracking-wide">
                          {uc.split(' ').slice(0,3).join(' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-3/5 p-10 lg:p-14 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`w-2 h-2 rounded-full ${ind.accent.replace('text-','bg-')}`}/>
                    <span className={`text-xs font-black ${ind.accent} uppercase tracking-widest`}>Industry Focus</span>
                  </div>
                  <h3 className="font-display font-black text-slate-900 text-2xl tracking-tight mb-4">{ind.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-7 border-l-4 border-slate-200 pl-5">{ind.desc}</p>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Key Applications</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9">
                    {ind.useCases.map((uc,i)=>(
                      <li key={i} className={`flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors`}>
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${ind.accent}`} aria-hidden="true"/>
                        <span className="text-slate-700 text-sm leading-snug">{uc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                    <button onClick={()=>navigate('/contact')} className="flex-1 bg-slate-900 text-white px-7 py-3.5 rounded-xl font-black text-sm hover:bg-blue-600 transition-all shadow-sm flex items-center justify-center gap-2 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                      Get a Quote <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true"/>
                    </button>
                    <a href={waMsg(`Hello KESHAV ENTERPRISES, I need engineering services for my ${ind.title} facility.`)} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] text-white px-7 py-3.5 rounded-xl font-black text-sm hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2 shadow-sm">
                      <MessageCircle className="w-4 h-4" aria-hidden="true"/> WhatsApp
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

/* ─────────────────────────────────────────────────────────────
   BLOG PAGES
   ───────────────────────────────────────────────────────────── */
const BlogPage = ({navigate}) => (
  <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
    <SEOHead title="Engineering Blog — Turbine Maintenance & Industrial Insights"
      description="Technical articles on steam turbine overhauling, lube oil filtration, reverse engineering, and industrial maintenance best practices from Keshav Enterprises."
      canonicalPath="/blog" pageType="website"/>
    <style>{GLOBAL_CSS}</style>
    <div className="bg-[#0A1628] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6"><BookOpen className="w-8 h-8 text-blue-400" aria-hidden="true"/></div>
        <h1 className="font-display font-black text-white text-5xl md:text-6xl tracking-tight mb-5">Engineering Blog</h1>
        <div className="w-20 h-0.5 bg-blue-500 mb-7 rounded-full" aria-hidden="true"/>
        <p className="text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed">Technical insights on turbine maintenance, lube oil systems, reverse engineering, and industrial best practices.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {BLOG_POSTS.length>0&&(
        <div className="mb-14 group cursor-pointer" onClick={()=>navigate(`/blog/${BLOG_POSTS[0].slug}`)}>
          <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-72 lg:h-auto bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <img src={BLOG_POSTS[0].coverImage} alt={BLOG_POSTS[0].title} loading="eager" width="600" height="400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={e=>{e.target.style.display='none';}}/>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/80 to-blue-900/40 flex items-center justify-center"><BookOpen className="w-24 h-24 text-white/20" aria-hidden="true"/></div>
                <span className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest rounded-full shadow-lg">Featured</span>
              </div>
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {BLOG_POSTS[0].tags.map(tag=><span key={tag} className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>)}
                </div>
                <h2 className="font-display font-black text-slate-900 text-3xl md:text-4xl mb-4 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                  <a href={`#/blog/${BLOG_POSTS[0].slug}`} onClick={e=>{e.stopPropagation();e.preventDefault();navigate(`/blog/${BLOG_POSTS[0].slug}`);}} className="focus:outline-none">{BLOG_POSTS[0].title}</a>
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-7">{BLOG_POSTS[0].excerpt}</p>
                <div className="flex items-center gap-5 text-xs text-slate-500 font-medium mb-7 flex-wrap">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-500" aria-hidden="true"/>{new Date(BLOG_POSTS[0].date).toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'})}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-500" aria-hidden="true"/>{BLOG_POSTS[0].readTime}</span>
                </div>
                <button onClick={()=>navigate(`/blog/${BLOG_POSTS[0].slug}`)} className="self-start bg-slate-900 text-white px-7 py-3.5 rounded-xl font-black hover:bg-blue-600 transition-all shadow-sm flex items-center gap-2.5">
                  Read Article <ArrowRight className="w-4 h-4" aria-hidden="true"/>
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
      {BLOG_POSTS.length>1&&(
        <div>
          <h2 className="font-display font-black text-slate-900 text-2xl mb-7 tracking-tight">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {BLOG_POSTS.slice(1).map(post=>(
              <article key={post.id} onClick={()=>navigate(`/blog/${post.slug}`)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group cursor-pointer flex flex-col">
                <div className="h-52 bg-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
                  <img src={post.coverImage} alt={post.title} loading="lazy" width="400" height="208" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e=>{e.target.style.display='none';}}/>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/70 to-blue-900/30 flex items-center justify-center"><BookOpen className="w-14 h-14 text-white/20" aria-hidden="true"/></div>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0,2).map(tag=><span key={tag} className="bg-slate-100 text-slate-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">{tag}</span>)}
                  </div>
                  <h3 className="font-black text-slate-900 text-lg mb-3 leading-tight tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    <a href={`#/blog/${post.slug}`} onClick={e=>{e.stopPropagation();e.preventDefault();navigate(`/blog/${post.slug}`);}} className="focus:outline-none">{post.title}</a>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium flex-wrap">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-blue-400" aria-hidden="true"/>{new Date(post.date).toLocaleDateString('en-IN',{month:'short',day:'numeric',year:'numeric'})}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-400" aria-hidden="true"/>{post.readTime}</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white" aria-hidden="true"/>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center">
        <h2 className="font-display font-black text-white text-2xl tracking-tight mb-3">Have a Technical Question?</h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto mb-7 leading-relaxed">Our engineering team is available 24×7. Reach us on WhatsApp for immediate technical assistance or project quotes.</p>
        <a href={waMsg('Hi KESHAV ENTERPRISES, I read your blog and have a technical question.')} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-xl font-black text-base hover:bg-[#1ebe5d] transition-all shadow-lg">
          <MessageCircle className="w-5 h-5" aria-hidden="true"/> Ask Our Engineers
        </a>
      </div>
    </div>
  </main>
);

const BlogPostPage = ({slug, navigate}) => {
  const post=useMemo(()=>BLOG_POSTS.find(p=>p.slug===slug),[slug]);
  const others=useMemo(()=>post?BLOG_POSTS.filter(p=>p.id!==post.id).slice(0,2):[],[post]);
  useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});},[slug]);
  if(!post) return (
    <main id="main-content" className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center bg-slate-50">
      <div><BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-5" aria-hidden="true"/>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Post Not Found</h1>
        <button onClick={()=>navigate('/blog')} className="text-blue-600 font-bold hover:underline">Back to Blog</button>
      </div>
    </main>
  );
  const renderBlock=(block,i)=>{
    switch(block.type){
      case 'h2': return <h2 key={i} className="font-display font-black text-slate-900 text-2xl md:text-3xl mt-12 mb-5 tracking-tight">{block.text}</h2>;
      case 'p': return <p key={i} className="text-slate-700 text-base leading-relaxed mb-5">{block.text}</p>;
      case 'list': return (<ul key={i} className="mb-7 space-y-3">{block.items.map((item,j)=>(<li key={j} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" aria-hidden="true"/>{item}</li>))}</ul>);
      case 'cta': return (
        <div key={i} className="my-9 bg-blue-600 rounded-2xl p-7 flex flex-col sm:flex-row items-center gap-5">
          <p className="text-white font-bold text-base leading-relaxed flex-1">{block.text}</p>
          <a href={waMsg(`Hi KESHAV ENTERPRISES, I read your article "${post.title}" and would like to know more.`)} target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-white text-blue-600 px-7 py-3.5 rounded-xl font-black hover:bg-blue-50 transition-all flex items-center gap-2">
            <MessageCircle className="w-4 h-4" aria-hidden="true"/>WhatsApp
          </a>
        </div>
      );
      default: return null;
    }
  };
  return (
    <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title={post.title} description={post.excerpt} canonicalPath={`/blog/${post.slug}`} pageType="article" publishedTime={post.date}/>
      <style>{GLOBAL_CSS}</style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs font-black text-slate-500 mb-8 uppercase tracking-widest flex-wrap gap-2 pt-4">
          <button onClick={()=>navigate('/blog')} className="hover:text-blue-600 transition-colors flex items-center focus:outline-none focus-visible:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" aria-hidden="true"/>Blog
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-slate-800 truncate max-w-[250px] md:max-w-full normal-case font-bold" aria-current="page">{post.title}</span>
        </nav>
        <div className="h-64 md:h-80 bg-slate-900 rounded-3xl overflow-hidden mb-9 flex items-center justify-center relative">
          <img src={post.coverImage} alt={post.title} loading="eager" width="896" height="320" className="w-full h-full object-cover opacity-60" onError={e=>{e.target.style.display='none';}}/>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"/>
          <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
            <div className="flex flex-wrap gap-2 mb-3">{post.tags.map(tag=><span key={tag} className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>)}</div>
            <h1 className="font-display font-black text-white text-2xl md:text-3xl leading-tight tracking-tight">{post.title}</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium mb-9 pb-9 border-b border-slate-200">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-blue-500" aria-hidden="true"/>{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-500" aria-hidden="true"/>{new Date(post.date).toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'})}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-500" aria-hidden="true"/>{post.readTime}</span>
        </div>
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 mb-10">
          {post.content.map((block,i)=>renderBlock(block,i))}
        </div>
        <div className="bg-slate-900 rounded-2xl p-7 mb-10 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1"><h3 className="font-black text-white text-lg mb-1.5">Found this useful?</h3><p className="text-slate-400 text-sm">Contact us for a technical consultation.</p></div>
          <a href={waMsg(`Hi KESHAV ENTERPRISES, I read "${post.title}" and would like to discuss.`)} target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] text-white px-7 py-3.5 rounded-xl font-black hover:bg-[#1ebe5d] transition-all flex items-center gap-2">
            <MessageCircle className="w-4 h-4" aria-hidden="true"/>Discuss on WhatsApp
          </a>
        </div>
        {others.length>0&&(
          <section aria-labelledby="related-posts-heading">
            <h2 id="related-posts-heading" className="font-display font-black text-slate-900 text-xl mb-5 tracking-tight">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {others.map(op=>(
                <article key={op.id} onClick={()=>navigate(`/blog/${op.slug}`)}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer">
                  <div className="flex flex-wrap gap-2 mb-3">{op.tags.slice(0,2).map(t=><span key={t} className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">{t}</span>)}</div>
                  <h3 className="font-black text-slate-900 text-base mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    <a href={`#/blog/${op.slug}`} onClick={e=>{e.stopPropagation();e.preventDefault();navigate(`/blog/${op.slug}`);}} className="focus:outline-none">{op.title}</a>
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">{op.excerpt}</p>
                  <span className="text-blue-600 font-bold text-xs flex items-center gap-1">Read Article <ArrowRight className="w-3.5 h-3.5" aria-hidden="true"/></span>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

/* ─────────────────────────────────────────────────────────────
   CONTACT PAGE
   ───────────────────────────────────────────────────────────── */
const ContactPage = () => {
  const [name,setName]=useState(''); const [email,setEmail]=useState('');
  const [phone,setPhone]=useState(''); const [iType,setIType]=useState('');
  const [details,setDetails]=useState(''); const [status,setStatus]=useState('idle');
  const [errors,setErrors]=useState({});
  const validate=()=>{const e={};if(!name.trim())e.name='Company name is required';if(!email.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))e.email='Valid email is required';if(!phone.trim()||phone.replace(/\D/g,'').length<10)e.phone='Valid phone number required';if(!iType)e.iType='Please select an inquiry type';if(!details.trim()||details.length<20)e.details='Please provide details (min 20 characters)';return e;};
  const handleSubmit=()=>{const e=validate();if(Object.keys(e).length>0){setErrors(e);return;}setErrors({});setStatus('loading');const msg=`*New RFQ from Keshav Enterprises Website*\n\n*Company:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Inquiry Type:* ${iType}\n\n*Details:*\n${details}`;setTimeout(()=>{window.open(waMsg(msg),'_blank','noopener');setStatus('success');},800);};
  const ic=(err)=>`w-full px-5 py-4 bg-slate-50 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${err?'border-red-400 bg-red-50':'border-slate-200'}`;
  return (
    <main id="main-content" className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEOHead title="Contact Engineering Team — Request a Technical Quote"
        description="Contact Keshav Enterprises for turbine engineering RFQs, reverse engineering quotes, and 24x7 emergency breakdown support."
        canonicalPath="/contact" pageType="website" schema={FAQ_SCHEMA}/>
      <style>{GLOBAL_CSS}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8 flex flex-col items-center">
          <h1 className="font-display font-black text-slate-900 text-4xl md:text-6xl mb-5 tracking-tight">Contact Engineering</h1>
          <div className="w-20 h-1 bg-blue-600 mb-5 rounded-full" aria-hidden="true"/>
          <p className="text-slate-600 text-lg max-w-xl leading-relaxed">Reach our engineering team for technical specifications, reverse engineering quotes, or 24×7 emergency overhauling support.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          <div className="lg:col-span-1 space-y-5">
            {[
              {Icon:Phone,title:'Direct Lines',content:<div className="space-y-2">{CONTACT_INFO.phones.map(p=><a key={p} href={`tel:${p.replace(/\s/g,'')}`} className="block text-slate-600 font-bold text-sm hover:text-blue-600 transition-colors">{p}</a>)}</div>},
              {Icon:Mail,title:'Email (RFQs)',content:<div className="space-y-2">{[CONTACT_INFO.email,CONTACT_INFO.marketingEmail].map(e=><a key={e} href={`mailto:${e}`} className="block text-slate-600 font-bold text-xs hover:text-blue-600 transition-colors break-all">{e}</a>)}</div>},
              {Icon:MapPin,title:'Our Facility',content:<p className="text-slate-600 font-medium text-xs leading-relaxed">{CONTACT_INFO.address}</p>},
            ].map(({Icon,title,content},i)=>(
              <div key={i} className="bg-white p-7 border border-slate-200 rounded-2xl shadow-sm flex items-start space-x-4 hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100"><Icon className="w-6 h-6 text-blue-600" aria-hidden="true"/></div>
                <div><h3 className="font-black text-slate-900 text-base mb-2">{title}</h3>{content}</div>
              </div>
            ))}
            <a href={CONTACT_INFO.indiamart} target="_blank" rel="noopener noreferrer"
              className="bg-slate-900 p-7 border border-slate-800 rounded-2xl shadow-lg flex items-start space-x-4 hover:border-blue-500 transition-colors group block w-full">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500/50 transition-colors"><CheckCircle2 className="w-6 h-6 text-green-400" aria-hidden="true"/></div>
              <div>
                <h3 className="font-black text-white text-base mb-1">IndiaMART Verified</h3>
                <p className="text-yellow-400 font-bold text-xs mb-1" aria-label="4.3 out of 5 stars">★★★★★ <span className="text-slate-300 ml-1">4.3/5 Rating</span></p>
                <p className="text-blue-400 font-black text-[10px] uppercase tracking-widest">TrustSeal Supplier</p>
              </div>
            </a>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50">
              <div className="mb-7 border-b border-slate-100 pb-6">
                <h2 className="font-display font-black text-slate-900 text-2xl tracking-tight">Request a Technical Quote</h2>
                <p className="text-slate-500 text-sm mt-2">Your inquiry will be sent to our engineering team via WhatsApp.</p>
              </div>
              {status==='success'&&(
                <div role="status" aria-live="polite" className="mb-7 p-5 bg-green-50 border border-green-200 text-green-800 font-black rounded-xl flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" aria-hidden="true"/>
                  Inquiry sent via WhatsApp. Our engineers will respond within 24 hours.
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <div>
                  <label htmlFor="c-name" className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Company Name *</label>
                  <input id="c-name" type="text" value={name} onChange={e=>setName(e.target.value)} aria-required="true" aria-invalid={!!errors.name} className={ic(errors.name)}/>
                  {errors.name&&<p role="alert" className="text-red-600 text-xs font-bold mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Email Address *</label>
                  <input id="c-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} aria-required="true" aria-invalid={!!errors.email} className={ic(errors.email)}/>
                  {errors.email&&<p role="alert" className="text-red-600 text-xs font-bold mt-1.5">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <div>
                  <label htmlFor="c-phone" className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Phone Number *</label>
                  <input id="c-phone" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" aria-required="true" aria-invalid={!!errors.phone} className={ic(errors.phone)}/>
                  {errors.phone&&<p role="alert" className="text-red-600 text-xs font-bold mt-1.5">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="c-type" className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Inquiry Type *</label>
                  <select id="c-type" value={iType} onChange={e=>setIType(e.target.value)} aria-required="true" className={ic(errors.iType)+' appearance-none cursor-pointer'}>
                    <option value="" disabled>Select an option...</option>
                    <option value="Filter Element RFQ">Filter Element RFQ</option>
                    <option value="Expansion Joint RFQ">Expansion Joint / Bellows RFQ</option>
                    <option value="Turbine Spares RFQ">Turbine Spares RFQ</option>
                    <option value="Turbine Overhauling Service">Turbine Overhauling Service</option>
                    <option value="Reverse Engineering">Reverse Engineering / 3D Scanning</option>
                    <option value="Lube Oil Flushing">Lube Oil Flushing Service</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {errors.iType&&<p role="alert" className="text-red-600 text-xs font-bold mt-1.5">{errors.iType}</p>}
                </div>
              </div>
              <div className="mb-7">
                <label htmlFor="c-details" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Requirements / RFQ Details *</label>
                <textarea id="c-details" rows={5} value={details} onChange={e=>setDetails(e.target.value)} aria-required="true" aria-invalid={!!errors.details}
                  className={ic(errors.details)+' resize-none'}
                  placeholder="Include: OEM/turbine make, model number, quantity, drawing number, or any technical specifications..."/>
                {errors.details&&<p role="alert" className="text-red-600 text-xs font-bold mt-1.5">{errors.details}</p>}
              </div>
              <div className="mb-8 p-5 bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl hover:border-blue-400 transition-colors">
                <label htmlFor="c-files" className="flex items-center text-xs font-black text-slate-700 mb-2.5 uppercase tracking-widest cursor-pointer">
                  <Paperclip className="w-4 h-4 mr-2" aria-hidden="true"/> Attach Technical Drawings (Optional)
                </label>
                <input id="c-files" type="file" multiple aria-label="Attach technical drawings (optional)"
                  className="w-full text-slate-700 text-sm file:cursor-pointer file:mr-3 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-blue-600 transition-all cursor-pointer outline-none"/>
              </div>
              <button type="button" onClick={handleSubmit} disabled={status==='loading'}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(30,111,255,0.3)] hover:shadow-[0_0_30px_rgba(30,111,255,0.5)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                {status==='loading'
                  ?<><span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"/>Submitting...</>
                  :<><MessageCircle className="w-5 h-5" aria-hidden="true"/>Submit via WhatsApp</>}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 border border-slate-200 rounded-3xl shadow-xl">
          <div className="flex items-center mb-5 px-4 pt-4">
            <MapPin className="w-5 h-5 text-blue-600 mr-3" aria-hidden="true"/>
            <h2 className="font-display font-black text-slate-900 text-xl tracking-tight">Our Manufacturing Facility — Shamli, U.P.</h2>
          </div>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
            <iframe title="Keshav Enterprises location map"
              src="https://maps.google.com/maps?q=Keshav%20Enterprises,%20Shamli,%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 rounded-2xl"/>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ─────────────────────────────────────────────────────────────
   APP ROOT
   ───────────────────────────────────────────────────────────── */
export default function App() {
  const [currentPath,setCurrentPath]=useState(()=>window.location.hash.replace('#','')||'/');
  useEffect(()=>{
    const h=()=>setCurrentPath(window.location.hash.replace('#','')||'/');
    window.addEventListener('popstate',h);
    return()=>window.removeEventListener('popstate',h);
  },[]);
  const navigate=useCallback((path)=>{
    window.history.pushState(null,'',`#${path}`);
    setCurrentPath(path);
    requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'smooth'}));
  },[]);
  const page=useMemo(()=>{
    if(currentPath.startsWith('/product/')) return <ProductDetailPage productId={currentPath.split('/')[2]} navigate={navigate}/>;
    if(currentPath.startsWith('/blog/')) return <BlogPostPage slug={currentPath.replace('/blog/','')} navigate={navigate}/>;
    switch(currentPath){
      case '/': return <HomePage navigate={navigate}/>;
      case '/about': return <AboutPage navigate={navigate}/>;
      case '/blog': case '/blog/': return <BlogPage navigate={navigate}/>;
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