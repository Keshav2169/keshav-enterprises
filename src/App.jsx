import {
	Activity,
	ArrowLeft,
	ArrowRight,
	Award,
	BookOpen,
	Building2,
	Calendar,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Clock,
	Cog,
	Cpu,
	Droplets,
	ExternalLink,
	Factory,
	Filter,
	Globe,
	Hexagon,
	Layers,
	LifeBuoy,
	Mail,
	MapPin,
	Menu,
	MessageCircle,
	Paperclip,
	Phone,
	PhoneCall,
	Search,
	Settings,
	Shield,
	Target,
	TrendingUp,
	User,
	Users,
	Wrench,
	X,
	Zap,
} from 'lucide-react';
import React, {
	memo,
	Suspense,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

const CONTACT_INFO = {
	phones: ['+91 9149229448', '+91 6397363268'],
	email: 'ksengg007@gmail.com',
	infoEmail: 'info.ksengg007@gmail.com',
	secondaryEmail: 'ppshekher71@gmail.com',
	marketingEmail: 'ksenggmrkt007@gmail.com',
	address:
		'Dayanand Nagar Gali No.2, Near Subash Ki Chakki, Shamli – 247776, U.P., India',
	whatsapp: '6397363268',
	indiamart: 'https://www.indiamart.com/keshav-enterprises-shamli/',
	gmapsShare: 'https://share.google/uLc4GwsGec5eM62Ep',
	gst: '09BOSPS3115K1ZC',
	msme: 'UDYAM-UP-47-0071234',
	// ── BUSINESS DIRECTORIES ──
	googleBusiness: 'https://share.google/B7KVUQrAcCh86oSyu',
	googleMapsEmbed:
		'https://maps.google.com/maps?q=Keshav+Enterprises+Shamli+Uttar+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed',
	tradeindia:
		'https://www.tradeindia.com/keshav-enterprises-73664698/product-services.html',
	exportersindia:
		'https://www.exportersindia.com/keshav-enterprises-shamli/about-us.htm',
	justdial:
		'https://www.justdial.com/Shamli/Keshav-Enterprises-Near-Subash-Ki-Chakki-Dayanand-Nagar/9999PX131-X131-230101014709-T5P8_BZDET/products-Turbine-Spare-Part?pid=&nid=&jdmid=&showSearch=0',
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

const OEMS = [
	'Triveni',
	'Siemens',
	'BHEL',
	'Belliss & Morcom',
	'Maxwatt',
	'Man Turbo',
	'Chola Turbo',
	'DLF-Skoda',
	'KKK',
	'ABB',
];

// PERF FIX: icon map instead of JSX in data arrays (prevents React serialization issues)
const SERVICE_ICONS = {
	srv_1: Cog,
	srv_2: Wrench,
	srv_3: Hexagon,
	srv_4: Activity,
	srv_5: Droplets,
	srv_6: Target,
	srv_7: Search,
};

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
		details: [
			'Steam turbines, pumps, compressors, fans, condensers',
			'EOT cranes, steel structure & pipe line work',
			'Construction supervision to OEM specs & applicable standards',
			'Coordination with OEM throughout all phases',
			'Complete documentation for handover to operations',
			'Development & execution of pre-commissioning procedures',
			'Assist with start-up and fine tuning to operational needs',
		],
		oems: ['Triveni', 'Siemens', 'BHEL', 'Belliss India', 'Maxwatt'],
	},
	{
		id: 'srv_2',
		// Upload a photo of turbine overhauling work — disassembled rotor, bearing inspection etc.
		image: 'service-overhauling.webp',
		title: 'Turnkey Overhauling & Maintenance',
		desc: 'Executed by ex-OEM engineers from Triveni, Siemens, BHEL, Belliss, and more. Includes pre-shutdown planning, on-site condition reporting, comprehensive spares management, and 24x7 emergency troubleshooting.',
		details: [
			'Pre-shutdown planning with detailed scope of rotating equipment',
			'Onsite inspection of stocked spare parts with shortfall reports',
			'Ex-OEM engineers: Triveni, Belliss, Maxwatt, Man Turbo, BHEL, Siemens, KKK, ABB',
			'All clearances, gaps and sizes measured and recorded',
			'Condition report with recommendations for each component',
			'Turnkey basis: tools, tackles, consumables & manpower provided',
			'24x7 emergency response with engineers at multiple locations',
		],
		oems: [
			'Triveni',
			'Belliss India',
			'Maxwatt',
			'Man Turbo',
			'BHEL',
			'Siemens',
			'KKK',
			'ABB',
		],
	},
	{
		id: 'srv_3',
		// Upload a photo of 3D scanning, CMM measurement, or engineering drawings
		image: 'service-reverse-engineering.webp',
		title: 'Precision Reverse Engineering',
		desc: 'PMI-verified reverse engineering using 3D laser scanners, CMM, and copying lathes for turbines from 5 kW to 27 MW. Generate full manufacturing drawings with tolerances, concentricity, pre/post heat treatment specs.',
		details: [
			'3D Laser Scanner, CMM & Coordinate Measuring Machine at site/workshop',
			'PMI testing for exact identification of material composition',
			'Copying lathe for precision dimensional replication',
			'Engineering drawings with tolerances, finish, parallelity, concentricity',
			'Pre/post heat treatment specifications included',
			'Rough machining, pre-final and final machining drawings',
			'Covers turbines from 5 kW to 27 MW (Back Pressure or Condensing)',
			'Single/Multi stage, Drive or Power, Horizontal or Vertical',
		],
		oems: ['Triveni', 'Siemens', 'BHEL', 'All Makes'],
	},
	{
		id: 'srv_4',
		// Upload a photo of the dynamic balancing machine or rotor being balanced
		image: 'service-dynamic-balancing.webp',
		title: 'Dynamic Balancing & Rotor Machining',
		desc: 'Precision rotor machining (grinding, polishing, journal undersizing) at our workshop lathes, plus ISO/API standard dynamic balancing from 50 to 2000 kg with full compliance reporting.',
		details: [
			'Journal grinding & polishing with minimum undersizing technique',
			'Labyrinth portion machining on precision lathes',
			'Rotor set concentric at all portions before machining',
			'Dynamic balancing 50-2000 kg to ISO/API standards',
			'Balancing machines with latest vibration monitoring systems',
			'Mechanical and electrical run-out identification pre-installation',
			'Comprehensive balancing report documenting ISO/API compliance',
		],
		oems: ['All Turbine Makes'],
	},
	{
		id: 'srv_5',
		// Upload a photo of the mobile centrifuge filter system or lube oil flushing rig
		image: 'service-lube-oil-flushing.webp',
		title: 'Lube Oil Flushing',
		desc: 'ISO-compliant flushing using purpose-built mobile centrifuge filter systems. Achieves maximum cleanliness and de-watering following construction or during scheduled maintenance.',
		details: [
			'Purpose-built mobile centrifuge filter system',
			'Targets system cleanliness per ISO 4406:99 standards',
			'Oil sampling and reporting undertaken per ISO standards',
			'Effective for post-construction and scheduled maintenance',
			'Superior de-watering and contamination removal',
			'Solid particle removal from 4 to 25 microns',
			'System flow rates handled up to 6,000 l/min',
		],
		oems: ['All Systems'],
	},
	{
		id: 'srv_6',
		// Upload a photo of laser alignment equipment on a turbine-generator set
		image: 'service-machine-alignment.webp',
		title: 'Machine Alignment',
		desc: 'Expert machine alignment using latest technology to eliminate misalignment, one of the primary causes of equipment failure. Covers turbines, gearboxes, pumps, fans, alternators, and induction generators.',
		details: [
			'Turbine to gearbox & gearbox to mill gearbox alignment',
			'Fan, pump, alternator, induction generator alignment',
			'Machine levelling & pipe strain measurements on any frame size',
			'Fiberizor, shredder alignment',
			'Latest alignment technology for highest standards',
			'Detailed alignment reporting with exact results',
			'Covers any size machine frame in any location',
		],
		oems: ['All Makes'],
	},
	{
		id: 'srv_7',
		// Upload a photo of engineers diagnosing turbine with vibration analyser / laptop on-site
		image: 'service-troubleshooting.webp',
		title: 'Troubleshooting Service',
		desc: 'Rapid on-site fault diagnosis for steam turbines experiencing vibration, bearing failure, governor instability, steam leakage, oil contamination, or unexpected trips. Ex-OEM engineers deploy with full diagnostic instrumentation for root-cause identification and corrective action.',
		details: [
			'High vibration — imbalance, misalignment, bearing wear, rub diagnosis',
			'Governor hunting, speed instability & overspeed trip investigation',
			'Bearing oil contamination — carbon ring seal & lube system analysis',
			'Steam gland leakage — labyrinth seal, packing & gland steam pressure issues',
			'Blade fouling, erosion & steam path efficiency loss analysis',
			'Unexpected trip investigation — oil pressure, temperature & control system faults',
			'24x7 emergency deployment across India with all diagnostic equipment',
		],
		oems: [
			'Triveni',
			'Siemens',
			'BHEL',
			'Belliss India',
			'Maxwatt',
			'Man Turbo',
			'KKK',
			'ABB',
		],
	},
];

const RAW_PRODUCTS = [
	{
		id: 'prod_f1',
		category: 'Industrial Filtration',
		title: 'Triveni Turbine Lube Oil Filter Elements',
		desc: 'OEM-compatible lube oil filter elements for Triveni steam turbine lubrication systems. Ensures optimum fluid cleanliness per API 614 for extended bearing life.',
		usage:
			'Primary lube oil filtration in Triveni steam turbines used in sugar mills, power plants, paper mills, distilleries and agro industries.',
		features: [
			'Triveni OEM Compatible — 180 GPM (approx. 680 LPM) rated flow',
			'Filter media: Glass Fiber Fleece (VG) multilayer pleated construction',
			'Filtration fineness: 6 VG, 10 VG, 16 VG, 25 VG grades available',
			'High dirt-holding capacity; consistent efficiency at elevated differential pressure',
			'High collapse resistance per ISO 2941',
			'Material compatibility verified per ISO 2943',
			'Sealing options: Nitrile (P) or Viton (V)',
			'IS27 anti-static specification for oils below 300 pS/m conductivity',
			'Compatible with mineral oils, emulsions, synthetic hydraulic/lube fluids',
			'HSN Code: 8421',
		],
		specs: {
			'Flow Capacity': '180 GPM (680 LPM rated)',
			'Filtration Fineness': '6-25 µm (beta20µm(c) >= 200 per ISO 16889)',
			'Max Operating Pressure': '10 bar (145 psi)',
			'Filter Media': 'Glass Fiber Fleece (VG); SS Wire Mesh (G) available',
			'Sealing Material': 'Nitrile (P) / Viton (V)',
			'OEM Compatibility': 'Triveni Steam Turbines — all models',
			Standards: 'ISO 16889, API 614',
			'Anti-Static Option': 'IS27 spec — oils below 300 pS/m conductivity',
			'HSN Code': '8421',
		},
		images: [
			'180-gpm-lube-filter-1.webp',
			'180-gpm-lube-filter-2.webp',
			'180-gpm-lube-filter-3.webp',
			'180-gpm-lube-filter-4.webp',
			'180-gpm-lube-filter-5.webp',
			'180-gpm-lube-filter-6.webp',
			'180-gpm-lube-filter-7.webp',
			'180-gpm-lube-filter-8.webp',
			'180-gpm-lube-filter-9.webp',
			'180-gpm-lube-filter-10.webp',
			'180-gpm-lube-filter-11.webp',
			'180-gpm-lube-filter-12.webp',
		],
	},
	{
		id: 'prod_f2',
		category: 'Industrial Filtration',
		title: 'Siemens Turbine Filter Elements',
		desc: 'High-performance control oil filter elements for Siemens industrial turbines. Microglass deep media with IS27 anti-static specification protects hydraulic control systems.',
		usage:
			'Hydraulic control systems in Siemens industrial turbines; prevents electrostatic discharge in low-conductivity synthetic control oils.',
		features: [
			'850 LPM flow rating for duplex turbine control filter applications',
			'Microglass deep media — Eaton 01.E series dimensional compatible',
			'IS27 Electrostatic Critical Application specification',
			'Anti-static prevents discharge in synthetic oils below 300 pS/m',
			'High collapse pressure per ISO 2941',
			'Filtration fineness: 3 VG, 6 VG, 10 VG, 16 VG, 25 VG',
			'Operating pressure: up to 16 bar (DWF series) / 63 bar (DU duplex series)',
			'Sealing: Nitrile or Viton',
			'ASME compliant: EN13445, AD2000, ASME Sec. VIII Div. 1',
			'PED/CE certified housings available',
		],
		specs: {
			'Flow Capacity': '850 LPM (duplex control filter)',
			'Filtration Fineness': '3-25 µm (microglass VG)',
			'Max Operating Pressure': 'Up to 63 bar (DU duplex housing)',
			'Filter Media': 'Microglass (VG) with IS27 anti-static treatment',
			'Anti-Static Spec': 'IS27 — oils below 300 pS/m conductivity',
			'Housing Series': 'DWF / DU / DA/EDA Duplex series compatible',
			Standards: 'EN13445, AD2000, ASME Sec. VIII Div. 1, PED 2014/68/EC',
			'OEM Compatibility': 'Siemens industrial turbine control systems',
		},
		images: [
			'850-lpm-siemens-filter-1.webp',
			'850-lpm-siemens-filter-2.webp',
			'850-lpm-siemens-filter-3.webp',
			'850-lpm-siemens-filter-4.webp',
			'850-lpm-siemens-filter-5.webp',
			'850-lpm-siemens-filter-6.webp',
			'850-lpm-siemens-filter-7.webp',
			'850-lpm-siemens-filter-8.webp',
			'850-lpm-siemens-filter-9.webp',
			'850-lpm-siemens-filter-10.webp',
			'850-lpm-siemens-filter-11.webp',
			'850-lpm-siemens-filter-12.webp',
		],
	},
	{
		id: 'prod_f3',
		category: 'Industrial Filtration',
		title: 'SS Wire Mesh (CEP) Centrifugal Filter Elements',
		desc: 'Stainless steel wire mesh filter elements with single or multi-layer pleated construction. Surface filtration principle; cleanable and reusable. Ideal for high-temperature applications.',
		usage:
			'High-temperature fluid and gas filtration, hydraulic and lubrication systems where cleanable/reusable elements are preferred.',
		features: [
			'SS 304 / SS 316 stainless steel wire mesh construction',
			'Single or multi-layer pleated weave designs',
			'Surface filtration principle (vs. depth filtration)',
			'Available rating: 5-1500 µm or per special requirement',
			'High collapse resistance and high burst strength',
			'Compatible with wide range of hydraulic & lubrication fluids',
			'Cleanable and reusable — reduced lifecycle cost',
			'HSN Code: 8421',
		],
		specs: {
			Material: 'SS 304 / SS 316 Wire Mesh',
			'Filtration Range': '5-1500 µm (custom available)',
			Construction: 'Single or multi-layer pleated weave',
			'Filtration Type': 'Surface filtration',
			Reusability: 'Cleanable & reusable',
			'Fluid Compatibility': 'All hydraulic & lubrication fluids',
			'HSN Code': '8421',
		},
		images: [
			'wire-mesh-centrifugal-filter-1.webp',
			'wire-mesh-centrifugal-filter-2.webp',
			'wire-mesh-centrifugal-filter-3.webp',
			'wire-mesh-centrifugal-filter-4.webp',
			'wire-mesh-centrifugal-filter-5.webp',
			'wire-mesh-centrifugal-filter-6.webp',
			'wire-mesh-centrifugal-filter-7.webp',
			'wire-mesh-centrifugal-filter-8.webp',
			'wire-mesh-centrifugal-filter-9.webp',
			'wire-mesh-centrifugal-filter-10.webp',
			'wire-mesh-centrifugal-filter-11.webp',
			'wire-mesh-centrifugal-filter-12.webp',
		],
	},
	{
		id: 'prod_f4',
		category: 'Industrial Filtration',
		title: 'Tank Breather Filter Elements (NBF Series)',
		desc: 'Glass fiber breather filter elements (Eaton 01.NBF dimensional compatible) preventing airborne contamination and moisture ingress into hydraulic and lube oil reservoirs.',
		usage:
			'Hydraulic tanks, gearboxes, and lube oil reservoirs for all steam turbine, compressor, and industrial machinery applications.',
		features: [
			'Eaton 01.NBF series dimensional compatible — nominal sizes 25-125',
			'Filter media: Glass fiber fleece (VL) — hydrophobic construction',
			'Prevents airborne particulate and moisture ingestion',
			'High dirt-holding capacity for extended service intervals',
			'Viton (V) sealing for chemical resistance',
			'Filtration grade: 3 VL micron for fine airborne contamination',
			'Protects system cleanliness per ISO 4406:99',
			'Tank-mount design with easy one-hand servicing',
		],
		specs: {
			'Series Compatibility': 'Eaton 01.NBF (Sizes: 25, 40, 55, 85, 125)',
			'Filter Media': 'Glass Fiber Fleece (VL) — hydrophobic',
			'Filtration Grade': '3 VL',
			Sealing: 'Viton (V)',
			Installation: 'Tank breather mount',
			Standards: 'ISO 16889, ISO 4406:99 compatible',
		},
		images: [
			'air-breather-filter-1.webp',
			'air-breather-filter-2.webp',
			'air-breather-filter-3.webp',
			'air-breather-filter-4.webp',
			'air-breather-filter-5.webp',
			'air-breather-filter-6.webp',
			'air-breather-filter-7.webp',
			'air-breather-filter-8.webp',
			'air-breather-filter-9.webp',
			'air-breather-filter-10.webp',
			'air-breather-filter-11.webp',
			'air-breather-filter-12.webp',
		],
	},
	{
		id: 'prod_f5',
		category: 'Industrial Filtration',
		title: 'Hydraulic Suction Strainer Elements (AS/TS Series)',
		desc: 'SS wire mesh suction filter elements (Eaton 01.AS / 01.TS dimensional compatible) for protecting sensitive hydraulic pumps. Inside-to-outside flow configuration.',
		usage:
			'Immersed in hydraulic reservoirs protecting system pumps; turbine auxiliary lube oil pump suction protection.',
		features: [
			'Eaton 01.AS (sizes 180-631) / 01.TS (sizes 210-625) dimensional compatible',
			'SS Wire Mesh (G) media — 10, 25, 40, 80 µm grades',
			'Inside-to-outside flow configuration (unique to suction elements)',
			'Low pressure drop prevents pump cavitation',
			'Cleanable and reusable construction',
			'Double open end (B) design for secure tank mounting',
			'IS27 anti-static spec available for special applications',
		],
		specs: {
			'Series Compatibility': 'Eaton 01.AS (180-631) / 01.TS (210-625)',
			'Filter Media': 'SS Wire Mesh (G)',
			'Filtration Grades': '10, 25, 40, 80 µm',
			'Flow Direction': 'Inside-to-outside (suction)',
			'End Design': 'Double open end (B)',
			Application: 'Tank-immersed suction pump protection',
		},
		images: [
			'hydraulic-suction-strainer-1.webp',
			'hydraulic-suction-strainer-2.webp',
			'hydraulic-suction-strainer-3.webp',
			'hydraulic-suction-strainer-4.webp',
			'hydraulic-suction-strainer-5.webp',
			'hydraulic-suction-strainer-6.webp',
			'hydraulic-suction-strainer-7.webp',
			'hydraulic-suction-strainer-8.webp',
			'hydraulic-suction-strainer-9.webp',
			'hydraulic-suction-strainer-10.webp',
			'hydraulic-suction-strainer-11.webp',
			'hydraulic-suction-strainer-12.webp',
		],
	},
	{
		id: 'prod_f6',
		category: 'Industrial Filtration',
		title: 'WaterSorp Offline Filter Elements (WSNR Series)',
		desc: 'Dual-function WaterSorp elements (Eaton 01.WSNR dimensional compatible) combining glass fiber filtration with water absorption layer. Removes solids AND absorbs free/emulsified water.',
		usage:
			'Offline filtration in side-stream return lines of turbine lube oil systems; extends oil life and protects bearings from water-induced damage.',
		features: [
			'Eaton 01.WSNR WaterSorp dimensional compatible — sizes 250, 630, 1000',
			'Media: Glass fiber fleece with integrated water absorption layer (WVG)',
			'Dual-action: removes solids AND absorbs free/emulsified water simultaneously',
			'Significantly reduces oil aging — extends drain intervals',
			'High particulate retention via microglass pre-filter layer',
			'Max operating pressure: 10 bar (145 psi)',
			'Double open end (B) for WSNR housings',
			'Sealing: Nitrile or Viton',
		],
		specs: {
			'Series Compatibility': 'Eaton 01.WSNR (Sizes: 250, 630, 1000)',
			'Filter Media': 'Glass fiber fleece + water absorption layer (WVG)',
			'Filtration Grades': '3 WVG, 10 WVG',
			'Max Pressure': '10 bar (145 psi)',
			'End Design': 'Double open end (B)',
			Sealing: 'Nitrile / Viton',
			Function: 'Particulate removal + water absorption',
		},
		images: [
			'watersorp-filter-1.webp',
			'watersorp-filter-2.webp',
			'watersorp-filter-3.webp',
			'watersorp-filter-4.webp',
			'watersorp-filter-5.webp',
			'watersorp-filter-6.webp',
			'watersorp-filter-7.webp',
			'watersorp-filter-8.webp',
			'watersorp-filter-9.webp',
			'watersorp-filter-10.webp',
			'watersorp-filter-11.webp',
			'watersorp-filter-12.webp',
		],
	},
	{
		id: 'prod_f7',
		category: 'Industrial Filtration',
		title: 'PTFE Hydrophobic Air & Gas Filter Elements',
		desc: 'Hydrophobic PTFE filtration elements for critical compressed air and process gas applications. Moisture-repellent construction prevents water droplet passage.',
		usage:
			'Compressed air systems, process gases, instrument air, and venting applications where moisture and chemical resistance are critical.',
		features: [
			'Hydrophobic PTFE (Polytetrafluoroethylene) filter media',
			'Moisture-repellent — water droplets cannot pass through media',
			'High chemical resistance — compatible with aggressive gases',
			'High flow rates at low differential pressure',
			'Temperature range: -20 to +260 deg C',
			'Cleanable and regenerable in most applications',
		],
		specs: {
			'Filter Media': 'Hydrophobic PTFE',
			'Temperature Range': '-20 to +260 deg C',
			Function: 'Fine particulate + moisture separation',
			'Chemical Resistance': 'Excellent — wide pH range',
			Application: 'Compressed air, process gas, instrument air',
			'Key Feature': 'Hydrophobic — water cannot penetrate media',
		},
		images: [
			'ptfe-air-filter-1.webp',
			'ptfe-air-filter-2.webp',
			'ptfe-air-filter-3.webp',
			'ptfe-air-filter-4.webp',
			'ptfe-air-filter-5.webp',
			'ptfe-air-filter-6.webp',
			'ptfe-air-filter-7.webp',
			'ptfe-air-filter-8.webp',
			'ptfe-air-filter-9.webp',
			'ptfe-air-filter-10.webp',
			'ptfe-air-filter-11.webp',
			'ptfe-air-filter-12.webp',
		],
	},
	{
		id: 'prod_f8',
		category: 'Industrial Filtration',
		title: 'Return-Line Filter Elements',
		desc: 'Precision filter elements for hydraulic and lubrication system return lines, removing contaminants before oil re-enters the reservoir. Low pressure-drop design maintains system efficiency at high flow rates.',
		usage:
			'Return lines in turbine lube oil systems, hydraulic power units, industrial machinery, and lubrication circuits.',
		features: [
			'Designed for return-line duty — low differential pressure at full flow',
			'Filter media options: Glass Fibre (VG), Paper (P), SS Wire Mesh (G)',
			'MOC: Carbon Steel or Stainless Steel housing',
			'Prevents contaminated oil from returning to main reservoir',
			'Maintains system cleanliness per ISO 4406 standards',
			'Compatible with mineral oils, emulsions, and synthetic fluids',
			'Available in multiple flow sizes and micron ratings',
			'Bypass valve option for cold-start protection',
		],
		specs: {
			Application: 'Return-line filtration — hydraulic & lube oil systems',
			'Filter Media': 'Glass Fibre (VG) / Paper (P) / SS Wire Mesh (G)',
			MOC: 'Carbon Steel / Stainless Steel',
			'Filtration Range': '4 µm to 40 µm (media-dependent)',
			Bypass: 'Bypass valve available for cold-start protection',
			Standards: 'ISO 4406 cleanliness compliance',
		},
		images: [
			'return-line-filter-1.webp',
			'return-line-filter-2.webp',
			'return-line-filter-3.webp',
			'return-line-filter-4.webp',
			'return-line-filter-5.webp',
			'return-line-filter-6.webp',
			'return-line-filter-7.webp',
			'return-line-filter-8.webp',
			'return-line-filter-9.webp',
			'return-line-filter-10.webp',
			'return-line-filter-11.webp',
			'return-line-filter-12.webp',
		],
	},
	{
		id: 'prod_f9',
		category: 'Industrial Filtration',
		title: 'Duplex Control Oil Filter Assembly',
		desc: 'High-precision duplex filter assemblies for turbine control oil circuits. Allows live element changeover without interrupting oil flow to the governing system — critical for continuous plant operation.',
		usage:
			'Turbine governing and control oil hydraulic circuits where uninterrupted filtration is mandatory for plant safety and continuity.',
		features: [
			'Duplex (twin-chamber) design — continuous operation without shutdown',
			'Live online element changeover via 3-way changeover valve',
			'Critical for turbine governor and control systems',
			'MOC: Stainless Steel housing and internals',
			'Filtration accuracy: 5 to 25 µm',
			'Operating pressure: Up to 63 bar (size-dependent)',
			'Differential pressure indicator for element condition monitoring',
			'ASME compliant: ASME Sec. VIII Div.1',
		],
		specs: {
			Configuration: 'Duplex twin-chamber for continuous duty',
			Changeover: 'Live 3-way changeover valve — no shutdown',
			MOC: 'Stainless Steel',
			'Filtration Accuracy': '5 to 25 µm',
			'Max Pressure': 'Up to 63 bar (DU duplex series)',
			Monitoring: 'Differential pressure indicator',
			Standards: 'ASME Sec. VIII Div.1',
			Application: 'Turbine governor / control oil circuits',
		},
		images: [
			'control-oil-filter-duplex-1.webp',
			'control-oil-filter-duplex-2.webp',
			'control-oil-filter-duplex-3.webp',
			'control-oil-filter-duplex-4.webp',
			'control-oil-filter-duplex-5.webp',
			'control-oil-filter-duplex-6.webp',
			'control-oil-filter-duplex-7.webp',
			'control-oil-filter-duplex-8.webp',
			'control-oil-filter-duplex-9.webp',
			'control-oil-filter-duplex-10.webp',
			'control-oil-filter-duplex-11.webp',
			'control-oil-filter-duplex-12.webp',
		],
	},
	{
		id: 'prod_f10',
		category: 'Industrial Filtration',
		title: 'Duplex Fabricated Filter Housing',
		desc: 'Twin-chamber fabricated filter assemblies for systems that cannot tolerate shutdown for filter cleaning. A manual changeover valve keeps one chamber in service while the other is serviced offline.',
		usage:
			'Process lines, industrial fluid systems, fuel oil, and lube oil applications requiring continuous filtration without production interruption.',
		features: [
			'Twin-chamber design — one in service, one offline for maintenance',
			'Manual 2-way or 3-way ball valve / butterfly valve changeover',
			'MOC: MS Fabricated, CS, SS 304, SS 316',
			'Filtration down to 40 µm standard; finer on request',
			'Operating pressure: Up to 20 kg/cm² standard; higher on request',
			'Full drain and vent provisions on each chamber',
			'Optional DP gauges for element condition monitoring',
			'Custom dimensions available for retrofit and new installation',
		],
		specs: {
			Configuration: 'Twin-chamber duplex',
			'Changeover Valve': '2-way or 3-way ball valve / butterfly valve',
			MOC: 'MS Fabricated / CS / SS 304 / SS 316',
			Filtration: 'Down to 40 µm (finer on request)',
			'Max Pressure': 'Up to 20 kg/cm² standard; higher on request',
			Options: 'DP gauges, drain/vent connections',
			Custom: 'Dimensions available for retrofit',
		},
		images: [
			'duplex-fabricated-filter-1.webp',
			'duplex-fabricated-filter-2.webp',
			'duplex-fabricated-filter-3.webp',
			'duplex-fabricated-filter-4.webp',
			'duplex-fabricated-filter-5.webp',
			'duplex-fabricated-filter-6.webp',
			'duplex-fabricated-filter-7.webp',
			'duplex-fabricated-filter-8.webp',
			'duplex-fabricated-filter-9.webp',
			'duplex-fabricated-filter-10.webp',
			'duplex-fabricated-filter-11.webp',
			'duplex-fabricated-filter-12.webp',
		],
	},
	{
		id: 'prod_f11',
		category: 'Industrial Filtration',
		title: 'Reverse Osmosis (RO) Filter Assemblies',
		desc: 'Reverse osmosis filter assemblies and replacement membranes for industrial water treatment and process water purification. Supplied as complete systems or as individual replacement elements to match existing installations.',
		usage:
			'Industrial process water purification, boiler feed water treatment, cooling tower make-up water, and high-purity water generation.',
		features: [
			'Complete RO assemblies or replacement elements/membranes',
			'Removes dissolved salts, bacteria, particulates, and organics',
			'Supplied to match existing system specifications',
			'Boiler feed water treatment — prevents scale and corrosion',
			'Cooling tower make-up water conditioning',
			'Process water purification for chemical and pharmaceutical applications',
			'High-purity water generation for critical industrial processes',
			'Pre-treatment and post-treatment element options available',
		],
		specs: {
			Type: 'Reverse Osmosis membranes and assemblies',
			Function: 'Dissolved solids, bacteria, and particulate removal',
			'Supply Format': 'Complete assemblies or replacement elements',
			Applications:
				'Boiler feed, cooling tower, process water, high-purity water',
			'Membrane Options': 'As per existing system specification',
			Industries: 'Power plants, chemical, pharmaceutical, food processing',
		},
		images: [
			'ro-filter-1.webp',
			'ro-filter-2.webp',
			'ro-filter-3.webp',
			'ro-filter-4.webp',
			'ro-filter-5.webp',
			'ro-filter-6.webp',
			'ro-filter-7.webp',
			'ro-filter-8.webp',
			'ro-filter-9.webp',
			'ro-filter-10.webp',
			'ro-filter-11.webp',
			'ro-filter-12.webp',
		],
	},
	{
		id: 'prod_st1',
		category: 'Industrial Strainers',
		title: 'Simplex Basket Strainer',
		desc: 'Engineered and fabricated to ASME VIII Div.1 and ASME B31.3 for high-pressure pipeline protection. Low pressure drop at high velocities with SS perforated basket internals.',
		usage:
			'Liquid, viscous, and gaseous media filtration in high-pressure pipelines; protects valves, meters, and process equipment.',
		features: [
			'Design standard: ASME VIII Div.1, ASME B31.3',
			'MOC: Cast Steel or Stainless Steel; others on request',
			'Pressure ratings: ASME Class 125, 150, 300, 600',
			'Standard SS perforated basket internals',
			'Low pressure drop at high flow velocities',
			'Vents and drain connections as standard',
			'Optional: Davit lifts, quick-open closures, DP gauges',
			'Horizontal and vertical configurations',
			'End connections: Flanged, butt-weld, screwed',
		],
		specs: {
			'Design Standard': 'ASME VIII Div.1, ASME B31.3',
			MOC: 'Cast Steel, SS 304/316 (others on request)',
			'Pressure Rating': 'ASME Class 125, 150, 300, 600',
			'Basket Internals': 'SS Perforated Basket (standard)',
			'End Connections': 'Flanged, Butt-Weld, Screwed',
			Orientation: 'Horizontal or Vertical',
			Optional: 'Davit lifts, Quick-open closures, DP Gauges',
		},
		images: [
			'simplex-basket-strainer-1.webp',
			'simplex-basket-strainer-2.webp',
			'simplex-basket-strainer-3.webp',
			'simplex-basket-strainer-4.webp',
			'simplex-basket-strainer-5.webp',
			'simplex-basket-strainer-6.webp',
			'simplex-basket-strainer-7.webp',
			'simplex-basket-strainer-8.webp',
			'simplex-basket-strainer-9.webp',
			'simplex-basket-strainer-10.webp',
			'simplex-basket-strainer-11.webp',
			'simplex-basket-strainer-12.webp',
		],
	},
	{
		id: 'prod_st2',
		category: 'Industrial Strainers',
		title: 'Duplex Basket Strainer',
		desc: 'Continuous-service duplex strainer enabling basket cleaning without process shutdown. Three-way changeover valve diverts flow while dirty basket is serviced.',
		usage:
			'Continuous flow systems requiring zero-downtime operation; critical process lines where shutdown is unacceptable.',
		features: [
			'Continuous service — no shutdown or flow interruption required',
			'Three-way changeover valve for fast chamber switching',
			'Design: ASME VIII Div.1, ASME B31.3',
			'MOC: Cast Steel or Stainless Steel',
			'Pressure ratings: ASME Class 125, 150, 300, 600',
			'SS perforated basket internals as standard',
			'DP gauges available for clogging monitoring',
			'Integrated pressure balance valve for easy changeover',
		],
		specs: {
			'Operation Mode': 'Continuous (no shutdown)',
			Changeover: 'Three-way ball valve',
			'Design Standard': 'ASME VIII Div.1, ASME B31.3',
			MOC: 'Cast Steel, SS 304/316',
			'Pressure Rating': 'ASME Class 125, 150, 300, 600',
			Monitoring: 'DP Gauges available',
		},
		images: [
			'duplex-basket-strainer-1.webp',
			'duplex-basket-strainer-2.webp',
			'duplex-basket-strainer-3.webp',
			'duplex-basket-strainer-4.webp',
			'duplex-basket-strainer-5.webp',
			'duplex-basket-strainer-6.webp',
			'duplex-basket-strainer-7.webp',
			'duplex-basket-strainer-8.webp',
			'duplex-basket-strainer-9.webp',
			'duplex-basket-strainer-10.webp',
			'duplex-basket-strainer-11.webp',
			'duplex-basket-strainer-12.webp',
		],
	},
	{
		id: 'prod_st3',
		category: 'Industrial Strainers',
		title: 'Conical (Temporary) Strainer',
		desc: 'Welded conical strainer installed between standard flanges to remove foreign matter during commissioning or startup.',
		usage:
			'Pipeline protection for downstream equipment; commissioning to catch weld splatter and construction debris.',
		features: [
			'Welded conical mesh element',
			'Installed between standard pipeline flanges',
			'MOC: Stainless Steel SS 304/316 standard',
			'Mesh size: Customizable per application',
			'ASME Class 125, 150, 300, 600 available',
			'Horizontal and vertical installation',
			'End connections: Flanged, butt-weld, screwed',
		],
		specs: {
			Design: 'Welded conical wire mesh element',
			MOC: 'SS 304/316',
			Mesh: 'Customizable per requirement',
			'Pressure Rating': 'ASME Class 125-600',
			'End Connections': 'Flanged, Butt-Weld, Screwed',
			Installation: 'Horizontal or Vertical',
		},
		images: [
			'conical-strainer-1.webp',
			'conical-strainer-2.webp',
			'conical-strainer-3.webp',
			'conical-strainer-4.webp',
			'conical-strainer-5.webp',
			'conical-strainer-6.webp',
			'conical-strainer-7.webp',
			'conical-strainer-8.webp',
			'conical-strainer-9.webp',
			'conical-strainer-10.webp',
			'conical-strainer-11.webp',
			'conical-strainer-12.webp',
		],
	},
	{
		id: 'prod_st4',
		category: 'Industrial Strainers',
		title: 'Y-Type Strainer',
		desc: 'Cast and welded Y-type strainer for liquid and gaseous pipelines. Y-configuration allows easy blow-off cleanout without line shutdown.',
		usage:
			'General pipeline protection; steam, water, gas, oil, and chemical service lines protecting downstream equipment.',
		features: [
			'Cast and welded design — horizontal & vertical configurations',
			'MOC: Cast Iron, Cast Steel, SS 304/316',
			'Pressure ratings: ASME Class 125, 150, 300, 600',
			'Easy blow-off cleanout port — no full disassembly',
			'Mesh element size per application requirement',
			'Service: Steam, water, gas, oil, chemical media',
		],
		specs: {
			Design: 'Cast & Welded Y-configuration',
			MOC: 'Cast Iron, Cast Steel, SS 304/316',
			'Pressure Rating': 'ASME Class 125, 150, 300, 600',
			Cleanout: 'Blow-off port',
			Media: 'Steam, water, gas, oil, chemicals',
			'End Connections': 'Flanged, Butt-Weld, Screwed',
		},
		images: [
			'y-type-strainer-1.webp',
			'y-type-strainer-2.webp',
			'y-type-strainer-3.webp',
			'y-type-strainer-4.webp',
			'y-type-strainer-5.webp',
			'y-type-strainer-6.webp',
			'y-type-strainer-7.webp',
			'y-type-strainer-8.webp',
			'y-type-strainer-9.webp',
			'y-type-strainer-10.webp',
			'y-type-strainer-11.webp',
			'y-type-strainer-12.webp',
		],
	},
	{
		id: 'prod_st5',
		category: 'Industrial Strainers',
		title: 'Pot / Bucket Type Strainer',
		desc: 'Large-capacity pot-type strainer with generous internal basket volume for high contamination-load applications. Less frequent cleaning required, low pressure drop even when partially fouled.',
		usage:
			'High-contamination process lines, fuel oil systems, cooling water, and slurry services where large debris volumes are expected.',
		features: [
			'Generously sized pot body — high dirt-holding capacity',
			'Lower cleaning frequency vs. standard basket strainers',
			'Low pressure drop even at partial basket loading',
			'MOC: WCB Casted, CS, SS 304/316, MS Fabricated',
			'Ratings up to ASME Class 2500',
			'Designed to ASME VIII Div.1',
			'Horizontal and vertical configurations available',
			'Optional differential pressure gauge for fouling monitoring',
			'Cover lifting options: davit arm, crane eye bolt',
		],
		specs: {
			Design: 'Large-volume pot/bucket body strainer',
			MOC: 'WCB Casted / CS / SS 304/316 / MS Fabricated',
			'Pressure Rating': 'Up to ASME Class 2500',
			'Design Standard': 'ASME VIII Div.1',
			Orientation: 'Horizontal or Vertical',
			'Key Advantage':
				'High dirt-holding capacity — reduced cleaning intervals',
			Optional: 'DP Gauge, davit arm cover lift',
		},
		images: [
			'pot-bucket-strainer-1.webp',
			'pot-bucket-strainer-2.webp',
			'pot-bucket-strainer-3.webp',
			'pot-bucket-strainer-4.webp',
			'pot-bucket-strainer-5.webp',
			'pot-bucket-strainer-6.webp',
			'pot-bucket-strainer-7.webp',
			'pot-bucket-strainer-8.webp',
			'pot-bucket-strainer-9.webp',
			'pot-bucket-strainer-10.webp',
			'pot-bucket-strainer-11.webp',
			'pot-bucket-strainer-12.webp',
		],
	},
	{
		id: 'prod_e1',
		category: 'Expansion Joints',
		title: 'Stainless Steel Metallic Bellows Expansion Joint',
		desc: 'Multi-ply SS metallic bellows absorbing thermal expansion in piping systems. Available DN 15 to DN 12,000. Fatigue, yield, and rupture tested per EJMA/ASME standards.',
		usage:
			'High-pressure steam exhaust systems, chemical process pipes, heat exchanger connections, and piping requiring thermal movement compensation.',
		features: [
			'Material: SS 304/316L, Duplex, Incoloy 825/925, Inconel 625, Titanium, Hastelloy',
			'Dimension range: DN 15 to DN 12,000',
			'Pressure: Up to 150 barg (2176 psi); higher with ring reinforcement',
			'Design codes: EN 14917, EJMA, ASME VIII Div.1, ASME B31.1/B31.3',
			'Testing: Pneumatic, hydrostatic, airjet, vacuum, dye penetrant',
			'Movement tests: Axial, lateral, angular; fatigue life cycle test',
			'Forming: Rolling, punch, hydraulic bellows forming',
			'Compliance: PED 2014/68/EC, AD2000',
		],
		specs: {
			Material: 'SS 304/316L, Duplex, Incoloy, Inconel, Hastelloy, Titanium',
			'Dimension Range': 'DN 15 to DN 12,000',
			'Max Pressure': '150 barg (2176 psi); higher with reinforcement',
			'Design Codes': 'EN 14917, EJMA, ASME VIII Div.1, ASME B31.1/B31.3',
			Testing: 'Pneumatic, hydrostatic, vacuum, dye penetrant, movement',
			Compliance: 'PED 2014/68/EC, AD2000',
			'Forming Methods': 'Rolling, Punch, Hydraulic',
		},
		images: [
			'ss-metallic-bellows-1.webp',
			'ss-metallic-bellows-2.webp',
			'ss-metallic-bellows-3.webp',
			'ss-metallic-bellows-4.webp',
			'ss-metallic-bellows-5.webp',
			'ss-metallic-bellows-6.webp',
			'ss-metallic-bellows-7.webp',
			'ss-metallic-bellows-8.webp',
			'ss-metallic-bellows-9.webp',
			'ss-metallic-bellows-10.webp',
			'ss-metallic-bellows-11.webp',
			'ss-metallic-bellows-12.webp',
		],
	},
	{
		id: 'prod_e1b',
		category: 'Expansion Joints',
		title: 'Axial Expansion Joint',
		desc: 'Single-bellows axial expansion joint absorbing thermal expansion and contraction along the longitudinal pipe axis. The most widely used expansion joint type in steam, process gas, and hot water pipelines.',
		usage:
			'Steam pipelines, pump connections, heat exchanger inlet/outlet connections, hot water systems in power plants, sugar mills, paper mills, and refineries.',
		features: [
			'Absorbs axial compression and extension from thermal cycling',
			'Single-bellow design — compact and cost-effective',
			'Available with or without inner sleeve, cover/shroud, and tie rods',
			'Inner sleeve protects bellow from high-velocity media erosion',
			'Materials: SS 304/316/321, Duplex, Inconel, Incoloy, Hastelloy',
			'DN 15 to DN 12,000; pressure up to 150 bar G',
			'Design codes: EJMA, ASME VIII Div.1, ASME B31.1/B31.3',
			'Full hydrostatic/pneumatic test certification and material traceability',
		],
		specs: {
			'Movement Absorbed': 'Axial — compression and extension along pipe axis',
			'Bellow Design': 'Single bellows',
			Materials: 'SS 304/316/321, Duplex, Inconel, Incoloy, Hastelloy',
			'Size Range': 'DN 15 to DN 12,000',
			Pressure: 'Up to 150 bar G',
			'Design Codes': 'EJMA, ASME VIII Div.1, ASME B31.1/B31.3',
			Accessories: 'Inner sleeve, cover/shroud, tie rods (optional)',
			Testing: 'Hydrostatic / Pneumatic certified',
		},
		images: [
			'axial-expansion-joint-1.webp',
			'axial-expansion-joint-2.webp',
			'axial-expansion-joint-3.webp',
			'axial-expansion-joint-4.webp',
			'axial-expansion-joint-5.webp',
			'axial-expansion-joint-6.webp',
			'axial-expansion-joint-7.webp',
			'axial-expansion-joint-8.webp',
			'axial-expansion-joint-9.webp',
			'axial-expansion-joint-10.webp',
			'axial-expansion-joint-11.webp',
			'axial-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e2',
		category: 'Expansion Joints',
		title: 'Double Arch Rubber Expansion Joint',
		desc: 'Heavy-duty double arch rubber joint with approx. 2x the movement capacity of single arch. Absorbs multi-directional movements, reduces noise, compensates misalignment.',
		usage:
			'Pumps, chillers, cooling towers, heavy fluid systems requiring greater movement than single arch allows.',
		features: [
			'Double arch design: ~2x movement vs. single arch',
			'Simultaneously absorbs axial, lateral, and angular movements',
			'Reduces system noise and vibration',
			'Compensates pipeline misalignment or offset',
			'High-quality rubber compound',
			'Tie rod assembly available and recommended',
			'Flanged ends for standard installation',
		],
		specs: {
			Architecture: 'Double arch (twin convolution) rubber',
			Movement: 'Axial, Lateral, Angular (dual-arch capacity)',
			Ends: 'Flanged (standard)',
			'Tie Rods': 'Available — specially recommended',
			Applications: 'Pumps, chillers, cooling towers',
		},
		images: [
			'double-arch-rubber-joint-1.webp',
			'double-arch-rubber-joint-2.webp',
			'double-arch-rubber-joint-3.webp',
			'double-arch-rubber-joint-4.webp',
			'double-arch-rubber-joint-5.webp',
			'double-arch-rubber-joint-6.webp',
			'double-arch-rubber-joint-7.webp',
			'double-arch-rubber-joint-8.webp',
			'double-arch-rubber-joint-9.webp',
			'double-arch-rubber-joint-10.webp',
			'double-arch-rubber-joint-11.webp',
			'double-arch-rubber-joint-12.webp',
		],
	},
	{
		id: 'prod_e3',
		category: 'Expansion Joints',
		title: 'Single Arch Rubber Expansion Joint',
		desc: 'Standard single arch rubber expansion joint absorbing thermal movements and mechanical vibrations. Cost-effective for HVAC, water piping, and light industrial fluid lines.',
		usage:
			'HVAC systems, water piping, light industrial fluid lines, pump discharge and suction connections.',
		features: [
			'Single arch convolution rubber construction',
			'Absorbs thermal expansion and contraction',
			'Reduces mechanical vibration transmission',
			'Corrosion-resistant rubber compound',
			'Available with or without internal sleeve',
			'Flanged ends standard (PN10/PN16)',
			'Wide arch variant available for larger movements',
		],
		specs: {
			Architecture: 'Single arch convolution',
			Compounds: 'EPDM / Neoprene (CR) / NBR',
			'End Connections': 'Flanged (PN10/PN16)',
			Sleeve: 'Optional — protects against particle impingement',
			Applications: 'HVAC, water, light industrial',
		},
		images: [
			'single-arch-rubber-joint-1.webp',
			'single-arch-rubber-joint-2.webp',
			'single-arch-rubber-joint-3.webp',
			'single-arch-rubber-joint-4.webp',
			'single-arch-rubber-joint-5.webp',
			'single-arch-rubber-joint-6.webp',
			'single-arch-rubber-joint-7.webp',
			'single-arch-rubber-joint-8.webp',
			'single-arch-rubber-joint-9.webp',
			'single-arch-rubber-joint-10.webp',
			'single-arch-rubber-joint-11.webp',
			'single-arch-rubber-joint-12.webp',
		],
	},
	{
		id: 'prod_e3b',
		category: 'Expansion Joints',
		title: 'Wide Arch Rubber Expansion Bellow',
		desc: 'Wide arch rubber bellow providing maximum movement absorption and superior vibration isolation. Specifically recommended with a tie rod assembly for internal pressure control. Ideal for high-vibration pump and motor connections.',
		usage:
			'High-vibration pump and motor connections, heavy-duty industrial piping with significant thermal movement, applications requiring maximum flexibility and shock isolation.',
		features: [
			'Maximum axial, lateral, and angular movement absorption',
			'Superior vibration, noise, and shock isolation vs. single/double arch',
			'Wide arch convolution design for greater flexibility',
			'Tie rod assembly specially recommended for pressure control',
			'Absorbs pipe misalignment and offset in the line',
			'Materials: EPDM, Neoprene, Nitrile, Natural Rubber per media',
			'Flanged ends — standard ASME / DIN drilling',
			'Operating pressure per media and temperature requirements',
		],
		specs: {
			Movement: 'Maximum axial, lateral, angular + vibration and shock',
			'Arch Design': 'Wide arch for maximum flexibility',
			'Tie Rods': 'Recommended for internal pressure control',
			Materials: 'EPDM / Neoprene / Nitrile / Natural Rubber',
			'End Connections': 'Flanged (ASME / DIN)',
			Applications:
				'High-vibration pumps, motors, heavy-duty industrial piping',
			Advantage: 'Maximum flexibility and shock isolation vs. standard arch',
		},
		images: [
			'wide-arch-rubber-joint-1.webp',
			'wide-arch-rubber-joint-2.webp',
			'wide-arch-rubber-joint-3.webp',
			'wide-arch-rubber-joint-4.webp',
			'wide-arch-rubber-joint-5.webp',
			'wide-arch-rubber-joint-6.webp',
			'wide-arch-rubber-joint-7.webp',
			'wide-arch-rubber-joint-8.webp',
			'wide-arch-rubber-joint-9.webp',
			'wide-arch-rubber-joint-10.webp',
			'wide-arch-rubber-joint-11.webp',
			'wide-arch-rubber-joint-12.webp',
		],
	},
	{
		id: 'prod_e3c',
		category: 'Expansion Joints',
		title: 'Industrial Heat Exchanger Bellows',
		desc: 'Metallic bellows designed for fixed tube-sheet heat exchangers to relieve differential thermal expansion between the shell and tube bundle. Supplied to ASME VIII Div.1 with full documentation for shell-and-tube heat exchanger applications.',
		usage:
			'Shell-and-tube heat exchangers, condensers, coolers, and process heat exchangers in refineries, chemical plants, and power stations.',
		features: [
			'Relieves differential thermal expansion between shell and tube bundle',
			'Integral to fixed tube-sheet heat exchanger design',
			'Manufactured to ASME VIII Div.1 with full documentation',
			'Materials: SS 304, SS 316, SS 316L, Duplex per service',
			'Prevents over-stressing of tube-to-tubesheet joints',
			'Reduces shell nozzle loads on connected equipment',
			'Custom dimensions per exchanger design specification',
			'Full material traceability and test certification',
		],
		specs: {
			Application: 'Fixed tube-sheet shell-and-tube heat exchangers',
			Function:
				'Relieves differential thermal expansion — shell vs. tube bundle',
			'Design Standard': 'ASME VIII Div.1',
			Materials: 'SS 304 / SS 316 / SS 316L / Duplex',
			Industries: 'Refineries, chemical plants, power stations',
			Documentation: 'Full material traceability and test certificates',
		},
		images: [
			'heat-exchanger-bellow-1.webp',
			'heat-exchanger-bellow-2.webp',
			'heat-exchanger-bellow-3.webp',
			'heat-exchanger-bellow-4.webp',
			'heat-exchanger-bellow-5.webp',
			'heat-exchanger-bellow-6.webp',
			'heat-exchanger-bellow-7.webp',
			'heat-exchanger-bellow-8.webp',
			'heat-exchanger-bellow-9.webp',
			'heat-exchanger-bellow-10.webp',
			'heat-exchanger-bellow-11.webp',
			'heat-exchanger-bellow-12.webp',
		],
	},
	{
		id: 'prod_e4',
		category: 'Expansion Joints',
		title: 'Universal Metallic Expansion Joint',
		desc: 'Twin-bellows metallic joint with intermediate pipe absorbing any combination of axial, lateral, and angular movement.',
		usage:
			'Complex piping requiring multi-axis movement; cryogenic lines, power plant crossovers.',
		features: [
			'Twin bellows + intermediate pipe (universal configuration)',
			'Absorbs axial, lateral, angular in any combination',
			'Can absorb contraction in cryogenic applications',
			'Tie rod assembly recommended for pressure thrust control',
			'Material: SS 304/316L, Duplex, Incoloy, Inconel',
			'Dimension range: DN 15 to DN 12,000',
			'Design per EN 14917, EJMA, ASME VIII Div.1',
		],
		specs: {
			Architecture: 'Twin bellows + intermediate pipe',
			Movement: 'Axial + Lateral + Angular (combined)',
			Material: 'SS 304/316L, Duplex, Incoloy, Inconel',
			'Dimension Range': 'DN 15 to DN 12,000',
			'Tie Rods': 'Recommended (pressure thrust)',
			'Design Codes': 'EN 14917, EJMA, ASME VIII Div.1',
		},
		images: [
			'universal-expansion-joint-1.webp',
			'universal-expansion-joint-2.webp',
			'universal-expansion-joint-3.webp',
			'universal-expansion-joint-4.webp',
			'universal-expansion-joint-5.webp',
			'universal-expansion-joint-6.webp',
			'universal-expansion-joint-7.webp',
			'universal-expansion-joint-8.webp',
			'universal-expansion-joint-9.webp',
			'universal-expansion-joint-10.webp',
			'universal-expansion-joint-11.webp',
			'universal-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e5',
		category: 'Expansion Joints',
		title: 'Non-Metallic Fabric Expansion Joint',
		desc: 'Multi-layer fabric/PTFE/rubber composite joints with 5-layer construction. Internal abrasion liner, insulation, PTFE foil, outer cover, reinforcement. Handles up to 1200 deg C.',
		usage:
			'Boilers, bag filters, ESPs, gas turbine installations, cement plants, incineration, power station flue gas ductwork.',
		features: [
			'5-layer construction: abrasion liner + insulation + PTFE foil + cover + reinforcement',
			'Temperature capability: up to 1200 deg C (refractory-lined duct)',
			'Styles: Belt, convoluted, vertical flange, floating sleeve, insulation bolster',
			'Materials: PTFE, rubber, ceramic fiber, fiberglass, Nomex',
			'Large axial, lateral, and angular movement capacity',
			'Maximum vibration damping vs. metallic alternatives',
		],
		specs: {
			Construction: '5-layer multi-material composite',
			'Max Temperature': 'Up to 1200 deg C (refractory-lined)',
			Materials: 'PTFE, rubber, ceramic fiber, fiberglass, Nomex',
			'Available Styles':
				'Belt, convoluted, vertical flange, floating sleeve, bolster',
			Applications:
				'Boilers, ESP, bag filters, gas turbines, cement, incineration',
			Movement: 'Axial + Lateral + Angular (large capacity)',
		},
		images: [
			'non-metallic-expansion-joint-1.webp',
			'non-metallic-expansion-joint-2.webp',
			'non-metallic-expansion-joint-3.webp',
			'non-metallic-expansion-joint-4.webp',
			'non-metallic-expansion-joint-5.webp',
			'non-metallic-expansion-joint-6.webp',
			'non-metallic-expansion-joint-7.webp',
			'non-metallic-expansion-joint-8.webp',
			'non-metallic-expansion-joint-9.webp',
			'non-metallic-expansion-joint-10.webp',
			'non-metallic-expansion-joint-11.webp',
			'non-metallic-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e6',
		category: 'Expansion Joints',
		title: 'Pressure Balance Expansion Joint',
		desc: 'In-line pressure balance joint absorbing axial movement and lateral deflection while neutralizing pressure thrust. Reduces piping support and anchor loads.',
		usage:
			'Turbine steam crossovers, pump connections, piping loops where pressure thrust must be contained.',
		features: [
			'In-line pressure balance design neutralizes pressure thrust',
			'Absorbs axial movement while containing thrust',
			'Absorbs lateral deflection without anchor overloading',
			'Material: SS 304/316L, Incoloy, Inconel',
			'Design per EN 14917, EJMA, ASME VIII Div.1',
			'Full pressure, movement, and fatigue test certification',
		],
		specs: {
			Architecture: 'In-line pressure balance bellows assembly',
			Function: 'Neutralizes pressure thrust forces',
			Material: 'SS 304/316L, Incoloy, Inconel',
			'Design Codes': 'EN 14917, EJMA, ASME VIII Div.1',
			Movement: 'Axial + Lateral (thrust-balanced)',
			Testing: 'Full pressure, movement, fatigue certification',
		},
		images: [
			'pressure-balance-joint-1.webp',
			'pressure-balance-joint-2.webp',
			'pressure-balance-joint-3.webp',
			'pressure-balance-joint-4.webp',
			'pressure-balance-joint-5.webp',
			'pressure-balance-joint-6.webp',
			'pressure-balance-joint-7.webp',
			'pressure-balance-joint-8.webp',
			'pressure-balance-joint-9.webp',
			'pressure-balance-joint-10.webp',
			'pressure-balance-joint-11.webp',
			'pressure-balance-joint-12.webp',
		],
	},
	{
		id: 'prod_e7',
		category: 'Expansion Joints',
		title: 'Ring Reinforced Metallic Expansion Joint',
		desc: 'High-pressure metallic expansion joint with external equalizing rings fitted between convolutions to prevent squirm and improve pressure stability well beyond standard bellows limits.',
		usage:
			'High-pressure steam lines, refinery and petrochemical process lines, ammonia/fertilizer piping, and other services where standard bellows pressure capacity is insufficient.',
		features: [
			'Equalizing rings support each convolution and resist pressure-induced instability',
			'Suitable for axial, lateral, and angular movement compensation by design type',
			'Multi-ply bellows plus ring reinforcement for pressure integrity and long cycle life',
			'Field-proven in very high-pressure applications exceeding 16 bar and up to 185 bar class projects',
			'Available in SS, duplex, Inconel, Incoloy, Hastelloy, and other high alloys',
			'Designed and tested per EJMA, EN 14917, ASME VIII Div.1 / B31.3',
		],
		specs: {
			Type: 'Ring reinforced metallic bellow assembly',
			'Pressure Capability':
				'High-pressure service; project-specific designs up to 185 bar class',
			Movement: 'Axial / Lateral / Angular (as configured)',
			Materials: 'SS 304/316/321, Duplex, Inconel, Incoloy, Hastelloy',
			'Design Codes': 'EJMA, EN 14917, ASME VIII Div.1, ASME B31.3',
			Testing: 'Hydrostatic / pneumatic pressure test with full documentation',
		},
		images: [
			'ring-reinforced-expansion-joint-1.webp',
			'ring-reinforced-expansion-joint-2.webp',
			'ring-reinforced-expansion-joint-3.webp',
			'ring-reinforced-expansion-joint-4.webp',
			'ring-reinforced-expansion-joint-5.webp',
			'ring-reinforced-expansion-joint-6.webp',
			'ring-reinforced-expansion-joint-7.webp',
			'ring-reinforced-expansion-joint-8.webp',
			'ring-reinforced-expansion-joint-9.webp',
			'ring-reinforced-expansion-joint-10.webp',
			'ring-reinforced-expansion-joint-11.webp',
			'ring-reinforced-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e8',
		category: 'Expansion Joints',
		title: 'Externally Pressurised Expansion Joint',
		desc: 'Externally pressurised bellows design where system pressure acts on the outside of the convolutions, enabling very large axial movement under pressure without the instability limits of conventional internal-pressure bellows.',
		usage:
			'Long steam pipelines, buried district heating lines, underground process piping, and installations requiring large axial compensation in compact space.',
		features: [
			'External pressure loading provides stabilizing effect on bellows geometry',
			'Very large axial compression stroke capability for long thermal runs',
			'Bellows protected inside outer housing for improved mechanical protection',
			'Excellent solution for underground or externally insulated installations',
			'Available across DN 15 to DN 12,000 project range',
			'Supports high-alloy material options for severe temperature/corrosion duty',
		],
		specs: {
			Type: 'Externally pressurised axial compensator',
			'Primary Movement': 'Large axial compression / extension',
			'Nominal Range': 'DN 15 to DN 12,000',
			Materials:
				'SS 304/316/321, Duplex, Inconel, Incoloy, Hastelloy, Alloy 59',
			'Design Standards':
				'EJMA, EN 14917, ASME / EN code compliance per project',
			'Typical Use':
				'Buried lines, long pipe runs, district heating and steam networks',
		},
		images: [
			'externally-pressurised-joint-1.webp',
			'externally-pressurised-joint-2.webp',
			'externally-pressurised-joint-3.webp',
			'externally-pressurised-joint-4.webp',
			'externally-pressurised-joint-5.webp',
			'externally-pressurised-joint-6.webp',
			'externally-pressurised-joint-7.webp',
			'externally-pressurised-joint-8.webp',
			'externally-pressurised-joint-9.webp',
			'externally-pressurised-joint-10.webp',
			'externally-pressurised-joint-11.webp',
			'externally-pressurised-joint-12.webp',
		],
	},
	{
		id: 'prod_e9',
		category: 'Expansion Joints',
		title: 'Lateral Metallic Expansion Joint',
		desc: 'Lateral expansion joint engineered to absorb perpendicular piping movement (offset/shear) with controlled pressure thrust transfer using tie rods.',
		usage:
			'Pump suction/discharge lines, compressor nozzles, offset process piping, and water/wastewater manifolds requiring sideways flexibility.',
		features: [
			'Designed for lateral displacement in one or multiple planes',
			'Single bellow for moderate movement and twin-bellow options for larger offset',
			'Tie rods provided to control pressure thrust and protect connected equipment',
			'Inner sleeve option available for high-velocity flow service',
			'Suitable for DN 15 to DN 12,000 custom projects',
			'Designed per EJMA with material selection to process media and temperature',
		],
		specs: {
			Type: 'Lateral movement metallic expansion joint',
			'Primary Movement': 'Lateral (perpendicular) displacement',
			Configuration: 'Single bellow or double lateral with intermediate spool',
			'Tie Rods': 'Standard / recommended for pressure thrust control',
			Materials: 'SS 304/316/321, Duplex, high alloys',
			'Design Code': 'EJMA / EN 14917 / ASME (project dependent)',
		},
		images: [
			'lateral-expansion-joint-1.webp',
			'lateral-expansion-joint-2.webp',
			'lateral-expansion-joint-3.webp',
			'lateral-expansion-joint-4.webp',
			'lateral-expansion-joint-5.webp',
			'lateral-expansion-joint-6.webp',
			'lateral-expansion-joint-7.webp',
			'lateral-expansion-joint-8.webp',
			'lateral-expansion-joint-9.webp',
			'lateral-expansion-joint-10.webp',
			'lateral-expansion-joint-11.webp',
			'lateral-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e10',
		category: 'Expansion Joints',
		title: 'Angular Hinged / Gimbal Expansion Joint',
		desc: 'Pin-restrained angular expansion joint (hinged or gimbal type) for controlled rotational movement in one or two planes while resisting pressure thrust loads.',
		usage:
			'High-temperature gas lines, steel plant ducting, power plant flue systems, and complex routed piping where angular compensation is preferred over axial loops.',
		features: [
			'Hinged design controls rotation in one plane with pin support',
			'Gimbal design permits multi-plane angular movement with ring frame stability',
			'Typically installed in pairs or multi-joint systems for controlled thermal growth',
			'Reduces nozzle and anchor loads in complex pipe stress layouts',
			'Available with weld ends or flanged ends to match site standards',
			'Compatible with high-temperature alloys including 321, 309, Inconel classes',
		],
		specs: {
			Type: 'Angular restrained metallic expansion joint',
			Variants: 'Hinged (single plane) / Gimbal (multi-plane)',
			'Primary Movement': 'Angular rotation',
			'Pressure Thrust': 'Restrained by hinge/gimbal hardware',
			'Temperature Capability':
				'High-temperature service with suitable alloy selection',
			Standards: 'EJMA, EN 14917, ASME code-based design',
		},
		images: [
			'angular-hinged-gimbal-joint-1.webp',
			'angular-hinged-gimbal-joint-2.webp',
			'angular-hinged-gimbal-joint-3.webp',
			'angular-hinged-gimbal-joint-4.webp',
			'angular-hinged-gimbal-joint-5.webp',
			'angular-hinged-gimbal-joint-6.webp',
			'angular-hinged-gimbal-joint-7.webp',
			'angular-hinged-gimbal-joint-8.webp',
			'angular-hinged-gimbal-joint-9.webp',
			'angular-hinged-gimbal-joint-10.webp',
			'angular-hinged-gimbal-joint-11.webp',
			'angular-hinged-gimbal-joint-12.webp',
		],
	},
	{
		id: 'prod_e11',
		category: 'Expansion Joints',
		title: 'Metallic Vibration Absorber',
		desc: 'Short-length metallic bellow assembly designed for vibration isolation at rotating equipment connections, minimizing transmission of vibration and structure-borne noise.',
		usage:
			'Pump and compressor connections, fan/blower lines, HVAC piping, and turbine auxiliary lines where high-frequency vibration control is required.',
		features: [
			'High flexibility at short face-to-face lengths for machinery isolation',
			'Absorbs micro-movements and cyclic vibration with low spring reaction',
			'Available with or without tie rods depending on movement and pressure design',
			'Helps protect seals, bearings, nozzles, and supports from vibration fatigue',
			'Can be supplied as metallic bellow type or braided short flexible assembly',
			'Custom-designed for frequency spectrum, pressure, and nozzle load limits',
		],
		specs: {
			Type: 'Vibration isolation metallic bellow',
			'Primary Function':
				'Vibration damping + small axial/lateral compensation',
			'Application Points': 'Pump, compressor, blower, fan nozzles',
			Construction: 'Short axial bellows; optional restraint hardware',
			Materials: 'SS 304/316/321 and process-suitable alloys',
			'Design Basis':
				'EJMA movement/stress criteria with project nozzle load checks',
		},
		images: [
			'metallic-vibration-absorber-1.webp',
			'metallic-vibration-absorber-2.webp',
			'metallic-vibration-absorber-3.webp',
			'metallic-vibration-absorber-4.webp',
			'metallic-vibration-absorber-5.webp',
			'metallic-vibration-absorber-6.webp',
			'metallic-vibration-absorber-7.webp',
			'metallic-vibration-absorber-8.webp',
			'metallic-vibration-absorber-9.webp',
			'metallic-vibration-absorber-10.webp',
			'metallic-vibration-absorber-11.webp',
			'metallic-vibration-absorber-12.webp',
		],
	},
	{
		id: 'prod_e12',
		category: 'Expansion Joints',
		title: 'Elbow Pressure Balanced Expansion Joint',
		desc: 'Pressure balanced elbow configuration with dual flow bellows and balancing element to absorb movement on two pipe legs while neutralizing pressure thrust at bend locations.',
		usage:
			'Steam crossover elbows, compressor house bends, refinery process elbows, and constrained pipe corridors where large anchors are impractical.',
		features: [
			'Balances pressure thrust at elbow geometry to reduce structural anchor demand',
			'Absorbs axial movement from both pipe legs in compact footprint',
			'Improves flexibility where pipe loops are not feasible',
			'Tie rods and limiters configured to suit design movement envelope',
			'Suitable for high-temperature and moderate-to-high pressure lines',
			'Delivered with calculation package and movement verification',
		],
		specs: {
			Type: 'Elbow pressure balanced bellows assembly',
			'Primary Movement': 'Axial movement in two legs (thrust balanced)',
			'Pressure Thrust': 'Neutralized by balance chamber design',
			Configuration: 'Two flow bellows + balancing bellows at elbow',
			Materials: 'SS 304/316/321, duplex, high-alloy options',
			'Design Standards': 'EJMA / EN / ASME code-based engineering',
		},
		images: [
			'elbow-pressure-balance-joint-1.webp',
			'elbow-pressure-balance-joint-2.webp',
			'elbow-pressure-balance-joint-3.webp',
			'elbow-pressure-balance-joint-4.webp',
			'elbow-pressure-balance-joint-5.webp',
			'elbow-pressure-balance-joint-6.webp',
			'elbow-pressure-balance-joint-7.webp',
			'elbow-pressure-balance-joint-8.webp',
			'elbow-pressure-balance-joint-9.webp',
			'elbow-pressure-balance-joint-10.webp',
			'elbow-pressure-balance-joint-11.webp',
			'elbow-pressure-balance-joint-12.webp',
		],
	},
	{
		id: 'prod_e13',
		category: 'Expansion Joints',
		title: 'Steam Crossover Piping Bellows',
		desc: 'Large-diameter metallic bellows for turbine crossover and reheater piping where high temperature, differential casing growth, and strict reliability requirements govern design.',
		usage:
			'HP-IP / IP-LP steam crossover lines, reheater interconnections, extraction piping, and back-pressure exhaust runs.',
		features: [
			'Engineered for high-temperature steam service and large thermal growth differentials',
			'Can be configured as universal or pressure-balanced architecture',
			'Low spring-rate design minimizes nozzle loading on connected equipment',
			'Multi-ply bellows construction for fatigue life under cyclic start-stop duty',
			'Inner sleeves and flow liners available for high-velocity steam',
			'Project documentation includes movement, stress, and test records',
		],
		specs: {
			Type: 'Crossover steam line expansion bellows',
			Service: 'High-temperature steam turbine piping',
			Movement: 'Axial / lateral / angular (as configured)',
			Construction: 'Single, universal, or pressure-balanced design',
			Materials: 'SS 321/316, high-temperature alloys',
			'Design Compliance': 'EJMA + power/process piping code basis',
		},
		images: [
			'steam-crossover-bellows-1.webp',
			'steam-crossover-bellows-2.webp',
			'steam-crossover-bellows-3.webp',
			'steam-crossover-bellows-4.webp',
			'steam-crossover-bellows-5.webp',
			'steam-crossover-bellows-6.webp',
			'steam-crossover-bellows-7.webp',
			'steam-crossover-bellows-8.webp',
			'steam-crossover-bellows-9.webp',
			'steam-crossover-bellows-10.webp',
			'steam-crossover-bellows-11.webp',
			'steam-crossover-bellows-12.webp',
		],
	},
	{
		id: 'prod_e14',
		category: 'Expansion Joints',
		title: 'FCCU High-Temperature Expansion Joint',
		desc: 'Severe-duty expansion joint for catalyst-laden high-temperature process gas systems, designed for thermal cycling, erosion resistance, and long service life in refinery cracking units.',
		usage:
			'Regenerator flue gas lines, reactor/riser sections, delayed coker connections, and high-temperature refinery gas ducting.',
		features: [
			'Designed for elevated temperatures with erosive process media',
			'Erosion-resistant liners and sleeves for particle-laden gas flow',
			'Multi-layer bellows options for extended fatigue life',
			'Refractory-compatible and externally insulated configurations available',
			'High-alloy material selection for corrosion plus temperature resistance',
			'Inspection and testing package supports critical-service QA requirements',
		],
		specs: {
			Type: 'Heavy-duty FCCU metallic expansion joint',
			'Temperature Class': 'High-temperature process gas duty',
			Media: 'Catalyst-laden / corrosive refinery gas streams',
			Construction: 'Multi-ply bellows with protective liner options',
			Alloys: '310/321 SS, Inconel, Incoloy, Hastelloy options',
			'Design Basis': 'EJMA with refinery service-specific checks',
		},
		images: [
			'fccu-expansion-joint-1.webp',
			'fccu-expansion-joint-2.webp',
			'fccu-expansion-joint-3.webp',
			'fccu-expansion-joint-4.webp',
			'fccu-expansion-joint-5.webp',
			'fccu-expansion-joint-6.webp',
			'fccu-expansion-joint-7.webp',
			'fccu-expansion-joint-8.webp',
			'fccu-expansion-joint-9.webp',
			'fccu-expansion-joint-10.webp',
			'fccu-expansion-joint-11.webp',
			'fccu-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e15',
		category: 'Expansion Joints',
		title: 'Jacketed Expansion Joint',
		desc: 'Dual-path assembly with process medium in the inner line and heating/cooling utility in outer jacket, enabling controlled product temperature while compensating thermal movement.',
		usage:
			'Bitumen, wax, resin, polymer, viscous chemical lines, and temperature-controlled process transfer systems.',
		features: [
			'Inner flow path and outer jacket engineered as integrated thermal system',
			'Maintains media temperature to prevent solidification or condensation',
			'Supports steam, hot-oil, or glycol utility jacket circuits',
			'Accommodates axial and lateral expansion in both inner and outer shells',
			'Designed for hygienic, chemical, or industrial process conditions',
			'Custom nozzle/end configurations for retrofit or new installations',
		],
		specs: {
			Type: 'Jacketed expansion bellows assembly',
			'Process Paths': 'Inner process line + outer utility jacket',
			'Utility Media': 'Steam / hot oil / thermal fluid / glycol',
			'Primary Movement': 'Axial + lateral compensation',
			Materials: 'SS 304/316/321 and application-specific alloys',
			'Design Standards': 'EJMA + pressure piping code requirements',
		},
		images: [
			'jacketed-expansion-joint-1.webp',
			'jacketed-expansion-joint-2.webp',
			'jacketed-expansion-joint-3.webp',
			'jacketed-expansion-joint-4.webp',
			'jacketed-expansion-joint-5.webp',
			'jacketed-expansion-joint-6.webp',
			'jacketed-expansion-joint-7.webp',
			'jacketed-expansion-joint-8.webp',
			'jacketed-expansion-joint-9.webp',
			'jacketed-expansion-joint-10.webp',
			'jacketed-expansion-joint-11.webp',
			'jacketed-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e16',
		category: 'Expansion Joints',
		title: 'Clamshell Retrofit Bellows',
		desc: 'Split-shell replacement bellows designed for in-situ installation around existing piping, minimizing shutdown time where full line dismantling is difficult.',
		usage:
			'Emergency replacement of failed bellows, confined maintenance zones, and large-diameter systems where pipe removal is costly.',
		features: [
			'Two-piece clamshell construction for around-pipe installation',
			'Reduces outage duration by avoiding major pipe disassembly',
			'Suitable for retrofit in inaccessible plant locations',
			'Welded in place by qualified procedures for pressure integrity',
			'Can be tailored for temporary or long-term service strategy',
			'Ideal for maintenance-critical lines requiring quick restoration',
		],
		specs: {
			Type: 'Split-shell retrofit expansion bellows',
			Installation: 'In-situ around existing piping',
			'Primary Benefit': 'Reduced shutdown and dismantling effort',
			Service: 'Repair / replacement / retrofit projects',
			Construction: 'Two half-shell sections welded on site',
			Engineering: 'Site-specific dimensions and movement validation',
		},
		images: [
			'clamshell-bellows-1.webp',
			'clamshell-bellows-2.webp',
			'clamshell-bellows-3.webp',
			'clamshell-bellows-4.webp',
			'clamshell-bellows-5.webp',
			'clamshell-bellows-6.webp',
			'clamshell-bellows-7.webp',
			'clamshell-bellows-8.webp',
			'clamshell-bellows-9.webp',
			'clamshell-bellows-10.webp',
			'clamshell-bellows-11.webp',
			'clamshell-bellows-12.webp',
		],
	},
	{
		id: 'prod_e17',
		category: 'Expansion Joints',
		title: 'Lens Type Expansion Joint',
		desc: 'Single-convolution lens profile expansion joint offering robust, stiffer movement control for low-stroke and high-pressure applications.',
		usage:
			'Heat exchanger nozzles, short-stroke pressure lines, and services where conventional multi-convolution bellows are too flexible.',
		features: [
			'Lens profile provides high structural stiffness',
			'Suitable for limited movement with stronger pressure handling',
			'Simple geometry supports robust operation in demanding duty',
			'Lower movement per unit compared with multi-convolution bellows',
			'Can be configured with weld ends or flanged connections',
			'Optimized for compact installations with controlled flexibility requirements',
		],
		specs: {
			Type: 'Lens profile metallic expansion joint',
			'Primary Movement': 'Small axial and limited angular compensation',
			'Spring Rate': 'Higher than standard multi-convolution bellows',
			'Pressure Class': 'Well-suited for high-pressure low-stroke duty',
			Connections: 'Weld-end / flanged options',
			Applications: 'Heat exchangers and short movement runs',
		},
		images: [
			'lens-expansion-joint-1.webp',
			'lens-expansion-joint-2.webp',
			'lens-expansion-joint-3.webp',
			'lens-expansion-joint-4.webp',
			'lens-expansion-joint-5.webp',
			'lens-expansion-joint-6.webp',
			'lens-expansion-joint-7.webp',
			'lens-expansion-joint-8.webp',
			'lens-expansion-joint-9.webp',
			'lens-expansion-joint-10.webp',
			'lens-expansion-joint-11.webp',
			'lens-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e18',
		category: 'Expansion Joints',
		title: 'Rectangular Expansion Joint',
		desc: 'Rectangular or square-profile expansion joint engineered for duct systems, compensating thermal growth and vibration where circular bellows are not suitable.',
		usage:
			'Boiler flue ducts, ESP/bag filter connections, kiln/incinerator ducting, and large HVAC air handling trunks.',
		features: [
			'Designed for rectangular/square duct geometry',
			'Corner and convolution design optimized for thermal fatigue resistance',
			'Absorbs axial, lateral, and angular movement in duct systems',
			'Available with liners, insulation interfaces, and protective covers',
			'Suitable for high-temperature gas and low-pressure large-area flow',
			'Custom dimensions for retrofit and greenfield duct layouts',
		],
		specs: {
			Type: 'Rectangular duct expansion joint',
			Movement: 'Axial + lateral + angular',
			Service: 'Gas/air/flue duct systems',
			Construction: 'Formed metallic convolutions with reinforced corners',
			Accessories: 'Liners / shrouds / insulation interfaces',
			'Design Compliance':
				'Duct movement and stress-based project calculations',
		},
		images: [
			'rectangular-expansion-joint-1.webp',
			'rectangular-expansion-joint-2.webp',
			'rectangular-expansion-joint-3.webp',
			'rectangular-expansion-joint-4.webp',
			'rectangular-expansion-joint-5.webp',
			'rectangular-expansion-joint-6.webp',
			'rectangular-expansion-joint-7.webp',
			'rectangular-expansion-joint-8.webp',
			'rectangular-expansion-joint-9.webp',
			'rectangular-expansion-joint-10.webp',
			'rectangular-expansion-joint-11.webp',
			'rectangular-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e19',
		category: 'Expansion Joints',
		title: 'District Heating Expansion Joint',
		desc: 'Expansion joint package for long buried hot-water networks, designed for reliable axial compensation, insulation compatibility, and long maintenance intervals.',
		usage:
			'Municipal heating loops, industrial hot-water distribution, CHP utility lines, and pre-insulated underground pipeline systems.',
		features: [
			'Designed for underground and pre-insulated piping architecture',
			'Externally pressurised options for large axial stroke compensation',
			'Supports long thermal growth spans with fewer loop requirements',
			'Corrosion-protected construction for buried service conditions',
			'Engineered for long design life and low maintenance operation',
			'Integrated with project-specific insulation and casing details',
		],
		specs: {
			Type: 'District heating expansion compensator',
			'Primary Movement': 'Large axial compensation',
			'Typical Medium': 'Hot water / thermal water networks',
			Installation: 'Buried and pre-insulated systems',
			'Pressure-Temperature Class': 'Utility network duty (project specific)',
			'Design Standards':
				'District heating and pressure piping design requirements',
		},
		images: [
			'district-heating-joint-1.webp',
			'district-heating-joint-2.webp',
			'district-heating-joint-3.webp',
			'district-heating-joint-4.webp',
			'district-heating-joint-5.webp',
			'district-heating-joint-6.webp',
			'district-heating-joint-7.webp',
			'district-heating-joint-8.webp',
			'district-heating-joint-9.webp',
			'district-heating-joint-10.webp',
			'district-heating-joint-11.webp',
			'district-heating-joint-12.webp',
		],
	},
	{
		id: 'prod_e20',
		category: 'Expansion Joints',
		title: 'Tank Farm Service Expansion Bellows',
		desc: 'Expansion bellows for storage terminals to absorb tank settlement, nozzle offset, and thermal movement between fixed manifolds and tank-connected piping.',
		usage:
			'Crude/product tank farms, chemical storage terminals, LNG/LPG handling manifolds, and transfer/loading lines.',
		features: [
			'Compensates differential settlement between tank shell and fixed piping',
			'Handles combined thermal and mechanical displacement at terminal nozzles',
			'Supports liquid and vapor duty lines with project-specific sealing design',
			'Available for ambient, hot-service, and cryogenic terminal applications',
			'Designed for operational flexibility during loading/unloading cycles',
			'Can be supplied with restraint hardware to match nozzle load criteria',
		],
		specs: {
			Type: 'Tank farm movement compensation bellows',
			'Primary Duty': 'Settlement + thermal growth absorption',
			'Service Media': 'Hydrocarbon / chemical / cryogenic terminal fluids',
			Movement: 'Axial + lateral + angular (as designed)',
			Materials: 'SS 304/316, duplex, low-temperature alloy options',
			'Design Basis': 'Terminal piping load and movement calculations',
		},
		images: [
			'tank-farm-bellows-1.webp',
			'tank-farm-bellows-2.webp',
			'tank-farm-bellows-3.webp',
			'tank-farm-bellows-4.webp',
			'tank-farm-bellows-5.webp',
			'tank-farm-bellows-6.webp',
			'tank-farm-bellows-7.webp',
			'tank-farm-bellows-8.webp',
			'tank-farm-bellows-9.webp',
			'tank-farm-bellows-10.webp',
			'tank-farm-bellows-11.webp',
			'tank-farm-bellows-12.webp',
		],
	},
	{
		id: 'prod_e21',
		category: 'Expansion Joints',
		title: 'Cryogenic LNG / LPG Expansion Joint',
		desc: 'Cryogenic-rated metallic expansion joint for very low-temperature liquefied gas service, maintaining ductility and sealing integrity under severe thermal contraction.',
		usage:
			'LNG/LPG transfer lines, cryogenic storage terminals, ship loading headers, and low-temperature process units.',
		features: [
			'Engineered for cryogenic duty down to LNG service temperature ranges',
			'Low-temperature material selection for toughness and fatigue resistance',
			'Suitable for dynamic thermal cycling in loading and unloading operations',
			'Can be designed for terminal, process, and marine-support infrastructure',
			'Supports compact routing while reducing thermal stress on nozzles',
			'Comes with full material traceability and cryogenic service documentation',
		],
		specs: {
			Type: 'Cryogenic metallic expansion bellows',
			'Temperature Capability': 'Low-temperature liquefied gas service',
			'Primary Movement': 'Axial + lateral compensation',
			'Material Options': 'Austenitic SS and cryogenic-grade alloys',
			Applications: 'LNG/LPG pipelines and transfer systems',
			'Quality Package': 'Material certificates + test documentation',
		},
		images: [
			'lng-lpg-expansion-joint-1.webp',
			'lng-lpg-expansion-joint-2.webp',
			'lng-lpg-expansion-joint-3.webp',
			'lng-lpg-expansion-joint-4.webp',
			'lng-lpg-expansion-joint-5.webp',
			'lng-lpg-expansion-joint-6.webp',
			'lng-lpg-expansion-joint-7.webp',
			'lng-lpg-expansion-joint-8.webp',
			'lng-lpg-expansion-joint-9.webp',
			'lng-lpg-expansion-joint-10.webp',
			'lng-lpg-expansion-joint-11.webp',
			'lng-lpg-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e22',
		category: 'Expansion Joints',
		title: 'Scrubber / Exhaust Gas Cleaning Expansion Joint',
		desc: 'Corrosion-resistant expansion joint for wet and acidic exhaust gas cleaning systems, handling combined thermal load, condensate chemistry, and vibration.',
		usage:
			'Industrial flue gas cleaning lines, marine-equivalent scrubber loops, desulfurization systems, and hot-wet gas exhaust headers.',
		features: [
			'Designed for hot gas plus wet acidic condensate environments',
			'Material selection prioritizes corrosion resistance at operating temperature',
			'Handles axial and angular displacement in exhaust treatment circuits',
			'Liner and drain-conscious configurations available for condensate control',
			'Suitable for large-diameter low-pressure exhaust duct service',
			'Supports long-term reliability in sulfur- and moisture-bearing media',
		],
		specs: {
			Type: 'Exhaust gas cleaning service expansion joint',
			Media: 'Hot gas with moisture/acid condensate',
			'Primary Movement': 'Axial + angular compensation',
			Materials: '316L, duplex, and high-corrosion-resistance alloys',
			'Service Range': 'Exhaust treatment and scrubber ducting',
			'Design Focus': 'Corrosion + thermal cycling durability',
		},
		images: [
			'scrubber-egc-joint-1.webp',
			'scrubber-egc-joint-2.webp',
			'scrubber-egc-joint-3.webp',
			'scrubber-egc-joint-4.webp',
			'scrubber-egc-joint-5.webp',
			'scrubber-egc-joint-6.webp',
			'scrubber-egc-joint-7.webp',
			'scrubber-egc-joint-8.webp',
			'scrubber-egc-joint-9.webp',
			'scrubber-egc-joint-10.webp',
			'scrubber-egc-joint-11.webp',
			'scrubber-egc-joint-12.webp',
		],
	},
	{
		id: 'prod_e23',
		category: 'Expansion Joints',
		title: 'Hygienic Sanitary Expansion Joint',
		desc: 'Sanitary-grade metallic expansion joint for hygienic process systems with smooth internal geometry, cleanability, and contamination-safe design.',
		usage:
			'Food, beverage, pharmaceutical, and biotech process pipelines requiring CIP/SIP-compatible thermal movement compensation.',
		features: [
			'Smooth internal profile to minimize retention and contamination risk',
			'Designed for clean-in-place and sterilize-in-place process practices',
			'Sanitary materials and finishing for hygienic duty piping',
			'Supports thermal growth without compromising process integrity',
			'Optional polished internal surface grades for high-purity service',
			'Suitable for aseptic and controlled-product transfer lines',
		],
		specs: {
			Type: 'Hygienic process expansion bellows',
			Service: 'Sanitary and high-purity process piping',
			'Primary Movement': 'Axial + lateral compensation',
			'Design Priority': 'Cleanability and contamination control',
			Construction: 'Sanitary-finish metallic bellows assembly',
			Applications: 'Food, pharma, biotech, beverage lines',
		},
		images: [
			'hygienic-expansion-joint-1.webp',
			'hygienic-expansion-joint-2.webp',
			'hygienic-expansion-joint-3.webp',
			'hygienic-expansion-joint-4.webp',
			'hygienic-expansion-joint-5.webp',
			'hygienic-expansion-joint-6.webp',
			'hygienic-expansion-joint-7.webp',
			'hygienic-expansion-joint-8.webp',
			'hygienic-expansion-joint-9.webp',
			'hygienic-expansion-joint-10.webp',
			'hygienic-expansion-joint-11.webp',
			'hygienic-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e24',
		category: 'Expansion Joints',
		title: 'Hinged Single-Plane Expansion Joint',
		desc: 'Single-plane angular expansion joint with hinge mechanism restraining axial and lateral movement while absorbing thermal rotation in one defined plane. Supplied in pairs or triplets for directional thermal management.',
		usage:
			'Power plant steam headers, industrial pipelines, and duct systems where directional thermal growth must be controlled in one plane.',
		features: [
			'Hinge mechanism allows angular rotation in one plane only',
			'Axial and lateral movement restrained by hinge hardware — no uncontrolled displacement',
			'Reduces anchor and guide loads when used in pairs/triplet systems',
			'Suitable for steam, gas, and liquid service at high temperatures',
			'Available with weld ends or flanged connections',
			'Compatible with high-temperature alloys for severe-duty applications',
			'Designed per EJMA and EN 14917 for movement and fatigue life',
		],
		specs: {
			Type: 'Hinged single-plane angular expansion joint',
			'Primary Movement': 'Angular (single plane rotation)',
			'Restrained Movements': 'Axial and Lateral RESTRAINED by hinge',
			Installation: 'In pairs or triplets for directional thermal management',
			Materials: 'SS 304/316/321, high-temperature alloys',
			'Design Codes': 'EJMA, EN 14917, ASME B31.1/B31.3',
			Connections: 'Weld-end or flanged',
		},
		images: [
			'hinged-expansion-joint-1.webp',
			'hinged-expansion-joint-2.webp',
			'hinged-expansion-joint-3.webp',
			'hinged-expansion-joint-4.webp',
			'hinged-expansion-joint-5.webp',
			'hinged-expansion-joint-6.webp',
			'hinged-expansion-joint-7.webp',
			'hinged-expansion-joint-8.webp',
			'hinged-expansion-joint-9.webp',
			'hinged-expansion-joint-10.webp',
			'hinged-expansion-joint-11.webp',
			'hinged-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e25',
		category: 'Expansion Joints',
		title: 'T-Type Pressure Balance Expansion Joint',
		desc: 'T-configuration pressure balance expansion joint for branch or junction piping, absorbing axial movement while neutralizing pressure thrust at direction changes in T-shaped pipe layouts.',
		usage:
			'Branch piping junctions, T-piece connections in steam and process lines, and systems where pressure thrust at direction changes must be eliminated.',
		features: [
			'T-shaped design addresses movement at branch/junction points in piping',
			'Balances pressure thrust at direction changes — eliminates massive anchors',
			'Absorbs axial thermal expansion from both main and branch legs',
			'Minimizes structural anchor and support requirements at T-junctions',
			'High-alloy bellows for steam and process gas duty',
			'Full EJMA calculation package with movement and stress verification',
			'Available with flanged or weld-end connections',
		],
		specs: {
			Type: 'T-type pressure balance expansion joint',
			Configuration: 'T-shaped; balancing bellows + flow bellows at junction',
			'Primary Movement': 'Axial from main and branch legs',
			'Pressure Thrust': 'Balanced — T-configuration neutralizes thrust loads',
			Materials: 'SS 304/316/321, Duplex, Incoloy, Inconel',
			'Design Standards': 'EJMA, EN 14917, ASME VIII Div.1',
			Applications: 'T-junction steam lines, process gas branch connections',
		},
		images: [
			't-pressure-balance-joint-1.webp',
			't-pressure-balance-joint-2.webp',
			't-pressure-balance-joint-3.webp',
			't-pressure-balance-joint-4.webp',
			't-pressure-balance-joint-5.webp',
			't-pressure-balance-joint-6.webp',
			't-pressure-balance-joint-7.webp',
			't-pressure-balance-joint-8.webp',
			't-pressure-balance-joint-9.webp',
			't-pressure-balance-joint-10.webp',
			't-pressure-balance-joint-11.webp',
			't-pressure-balance-joint-12.webp',
		],
	},
	{
		id: 'prod_e26',
		category: 'Expansion Joints',
		title: 'Octagonal Profile Expansion Joint',
		desc: 'Eight-sided octagonal bellows expansion joint offering enhanced structural strength over circular profiles, absorbing thermal expansion and mechanical vibration in demanding industrial piping and duct systems.',
		usage:
			'Heavy-duty piping systems, industrial ventilation, and process gas lines requiring improved structural integrity and vibration resistance beyond standard round bellows.',
		features: [
			'Octagonal (eight-sided) cross-section — improves structural strength vs. round profile',
			'Absorbs axial thermal expansion and contraction under cyclic duty',
			'Handles mechanical vibration in addition to thermal movement',
			'Suitable for high-pressure or reinforced industrial piping systems',
			'Enhanced durability in demanding environments with heavy mechanical stress',
			'Custom dimensions per project piping geometry and movement requirements',
			'Available in SS 304/316 and high-alloy materials for temperature resistance',
		],
		specs: {
			Type: 'Octagonal profile metallic expansion joint',
			'Cross-Section':
				'Eight-sided (octagonal) — higher strength than circular',
			'Primary Movement': 'Axial (thermal expansion/contraction)',
			'Additional Function': 'Mechanical vibration absorption',
			Materials: 'SS 304/316/321, process-suitable alloys',
			'Design Codes': 'EJMA, EN 14917, project-specific calculations',
			Connections: 'Weld-end or flanged to match pipe geometry',
		},
		images: [
			'octagonal-expansion-joint-1.webp',
			'octagonal-expansion-joint-2.webp',
			'octagonal-expansion-joint-3.webp',
			'octagonal-expansion-joint-4.webp',
			'octagonal-expansion-joint-5.webp',
			'octagonal-expansion-joint-6.webp',
			'octagonal-expansion-joint-7.webp',
			'octagonal-expansion-joint-8.webp',
			'octagonal-expansion-joint-9.webp',
			'octagonal-expansion-joint-10.webp',
			'octagonal-expansion-joint-11.webp',
			'octagonal-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e27',
		category: 'Expansion Joints',
		title: 'Thick Wall Heavy-Duty Expansion Joint',
		desc: 'Reinforced thick-wall expansion joint engineered for extreme pressure, high temperature, and heavy mechanical stress, delivering minimal deformation and superior durability in the most demanding industrial environments.',
		usage:
			'High-pressure steam lines, heavy process piping, chemical reactors, and industrial systems where standard bellows wall thickness is insufficient for operating conditions.',
		features: [
			'Thick/reinforced wall construction for maximum pressure and stress resistance',
			'Minimal deformation under extreme pressure and temperature cycles',
			'Superior service life in harsh operating conditions vs. standard bellows',
			'Suitable for applications with high mechanical loading and vibration',
			'Available with internal sleeves and external protection shrouds',
			'Full hydrostatic and pneumatic testing with pressure certification',
			'Materials selected for combined pressure, temperature, and corrosion duty',
		],
		specs: {
			Type: 'Thick wall heavy-duty metallic expansion joint',
			Construction: 'Reinforced bellows with increased wall thickness',
			'Pressure Capability':
				'High-pressure service beyond standard bellows limits',
			'Temperature Class': 'High-temperature heavy industrial duty',
			'Primary Function': 'Axial movement absorption with extreme durability',
			Materials: 'SS 316/321, Duplex, Inconel, Hastelloy options',
			Testing: 'Full hydrostatic + pneumatic pressure certification',
		},
		images: [
			'thick-wall-expansion-joint-1.webp',
			'thick-wall-expansion-joint-2.webp',
			'thick-wall-expansion-joint-3.webp',
			'thick-wall-expansion-joint-4.webp',
			'thick-wall-expansion-joint-5.webp',
			'thick-wall-expansion-joint-6.webp',
			'thick-wall-expansion-joint-7.webp',
			'thick-wall-expansion-joint-8.webp',
			'thick-wall-expansion-joint-9.webp',
			'thick-wall-expansion-joint-10.webp',
			'thick-wall-expansion-joint-11.webp',
			'thick-wall-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e28',
		category: 'Expansion Joints',
		title: 'MS Slip Type Expansion Joint',
		desc: 'Mild steel telescoping slip-type expansion joint using a sliding inner pipe within an outer sleeve to absorb linear thermal movement. Simpler construction than bellows type, ideal for large axial strokes in standard industrial piping.',
		usage:
			'Steam distribution lines, industrial process piping, and utility systems requiring straightforward linear thermal expansion absorption at moderate pressure conditions.',
		features: [
			'Telescoping slip mechanism provides linear axial movement absorption',
			'Mild steel (MS) construction — robust and cost-effective for standard conditions',
			'Simpler design than bellows type — easier site maintenance and inspection',
			'Packing gland provides sealing around sliding inner pipe',
			'Suitable for steam, water, and industrial gas service at moderate pressures',
			'Available in various nominal bore sizes to suit process piping standards',
			'Custom end connections (flanged or weld-end) per site requirements',
		],
		specs: {
			Type: 'MS slip-type (telescoping) expansion joint',
			Construction: 'Mild steel outer sleeve + sliding inner pipe',
			'Primary Movement': 'Axial (thermal expansion/contraction)',
			Sealing: 'Packing gland around sliding pipe',
			Material: 'Mild Steel (MS) — IS 2062 / equivalent grade',
			Service: 'Steam, water, industrial gas at moderate pressure',
			Connections: 'Flanged or weld-end as specified',
		},
		images: [
			'ms-slip-expansion-joint-1.webp',
			'ms-slip-expansion-joint-2.webp',
			'ms-slip-expansion-joint-3.webp',
			'ms-slip-expansion-joint-4.webp',
			'ms-slip-expansion-joint-5.webp',
			'ms-slip-expansion-joint-6.webp',
			'ms-slip-expansion-joint-7.webp',
			'ms-slip-expansion-joint-8.webp',
			'ms-slip-expansion-joint-9.webp',
			'ms-slip-expansion-joint-10.webp',
			'ms-slip-expansion-joint-11.webp',
			'ms-slip-expansion-joint-12.webp',
		],
	},
	{
		id: 'prod_e29',
		category: 'Expansion Joints',
		title: 'Industrial Airflow Damper',
		desc: 'Precision-engineered industrial damper for regulating or controlling airflow, gas flow, and flue gas within industrial duct and HVAC systems. Available in manual and motorized actuator configurations for energy-efficient flow management.',
		usage:
			'Industrial chimneys, boiler flue gas ducts, HVAC ventilation systems, process air handling units, and industrial exhaust systems requiring controlled airflow regulation.',
		features: [
			'Manual or motorized/automatic actuation for precise flow control',
			'Regulates volume, temperature, and pressure of air and gas flows',
			'Suitable for hot flue gas, combustion air, and general ventilation ducts',
			'Improves energy efficiency by optimizing airflow in system operation',
			'Available in butterfly, louvre, and guillotine damper configurations',
			'MS or SS construction — material selected per service temperature and media',
			'Custom sizing for retrofit or new installation in industrial duct systems',
		],
		specs: {
			Type: 'Industrial airflow and gas flow damper',
			Configurations: 'Butterfly / Louvre / Guillotine damper types',
			Actuation: 'Manual or motorized (pneumatic/electric actuator)',
			Materials: 'Mild Steel (MS) / Stainless Steel (SS) per service',
			Service: 'HVAC, flue gas, combustion air, ventilation ducts',
			Applications: 'Boilers, chimneys, HVAC, industrial ducts, boiler systems',
			Sizing: 'Custom to duct dimensions and flow requirements',
		},
		images: [
			'industrial-damper-1.webp',
			'industrial-damper-2.webp',
			'industrial-damper-3.webp',
			'industrial-damper-4.webp',
			'industrial-damper-5.webp',
			'industrial-damper-6.webp',
			'industrial-damper-7.webp',
			'industrial-damper-8.webp',
			'industrial-damper-9.webp',
			'industrial-damper-10.webp',
			'industrial-damper-11.webp',
			'industrial-damper-12.webp',
		],
	},
	{
		id: 'prod_e30',
		category: 'Expansion Joints',
		title: 'Dismantling Joint',
		desc: 'Mechanical dismantling joint designed for easy disassembly and reassembly of piping sections during maintenance without damaging adjacent components. Provides axial adjustment for quick removal and reinstallation of pumps, valves, and equipment.',
		usage:
			'Pump and compressor suction/discharge connections, valve maintenance points, water treatment systems, and industrial piping requiring regular equipment removal and reinstallation.',
		features: [
			'Designed for quick and damage-free disassembly of connected piping or equipment',
			'Provides axial adjustment (typically 50–300 mm) for equipment removal clearance',
			'Eliminates need for pipe cutting or flange grinding during maintenance',
			'Reduces downtime significantly at regular maintenance points',
			'Available in flanged connection configuration for standard piping',
			'MS and SS material options for water, chemical, and industrial service',
			'Suitable for pump connections, valve maintenance, and instrumentation takeoffs',
		],
		specs: {
			Type: 'Mechanical dismantling joint (adjustable)',
			'Primary Function': 'Easy maintenance disassembly without pipe damage',
			'Adjustment Range': 'Typically 50–300 mm axial travel (project specific)',
			Construction: 'Mild Steel or Stainless Steel per service',
			Connections: 'Flanged ends (ANSI/PN as specified)',
			Applications: 'Pumps, valves, water treatment, industrial piping',
			'Typical Bore Range': 'DN 50 to DN 600 (custom larger sizes available)',
		},
		images: [
			'dismantling-joint-1.webp',
			'dismantling-joint-2.webp',
			'dismantling-joint-3.webp',
			'dismantling-joint-4.webp',
			'dismantling-joint-5.webp',
			'dismantling-joint-6.webp',
			'dismantling-joint-7.webp',
			'dismantling-joint-8.webp',
			'dismantling-joint-9.webp',
			'dismantling-joint-10.webp',
			'dismantling-joint-11.webp',
			'dismantling-joint-12.webp',
		],
	},
	{
		id: 'prod_e31',
		category: 'Expansion Joints',
		title: 'MS & SS Industrial Duct Systems',
		desc: 'Custom-fabricated mild steel and stainless steel duct systems for industrial air, gas, and fume conveyance. MS ducts deliver cost-effective strength for standard environments while SS ducts provide superior corrosion resistance for aggressive and hygienic applications.',
		usage:
			'Industrial ventilation systems, fume extraction, exhaust air handling, chemical plant gas conveyance, food and pharmaceutical manufacturing, and boiler or furnace gas duct connections.',
		features: [
			'MS Ducts: Cost-effective Mild Steel construction for standard industrial environments',
			'SS Ducts: Stainless Steel for corrosive, high-temperature, or hygienic environments',
			'Custom fabricated to exact site dimensions and layout requirements',
			'Available in rectangular, circular, and special cross-section profiles',
			'Welded, flanged, or clamped joint options per system design',
			'Compatible with expansion joints, dampers, and filtration equipment',
			'Suitable for high-temperature flue gas, chemical fumes, and clean-room ventilation',
		],
		specs: {
			Type: 'Custom fabricated industrial duct systems',
			'MS Material':
				'Mild Steel IS 2062 — cost-effective, strong, standard environments',
			'SS Material':
				'SS 304 / 316 — corrosion resistant, long lifespan, hygienic',
			'Cross-Sections': 'Rectangular, circular, and special profiles',
			'Joint Types': 'Welded, flanged, clamped connections',
			'Service Media':
				'Air, gas, fumes, exhaust, chemical vapour, hot flue gas',
			Applications:
				'Industrial ventilation, fume extraction, HVAC, boiler gas ducts',
		},
		images: [
			'ms-ss-duct-1.webp',
			'ms-ss-duct-2.webp',
			'ms-ss-duct-3.webp',
			'ms-ss-duct-4.webp',
			'ms-ss-duct-5.webp',
			'ms-ss-duct-6.webp',
			'ms-ss-duct-7.webp',
			'ms-ss-duct-8.webp',
			'ms-ss-duct-9.webp',
			'ms-ss-duct-10.webp',
			'ms-ss-duct-11.webp',
			'ms-ss-duct-12.webp',
		],
	},
	{
		id: 'prod_ts1',
		category: 'Turbine Spares',
		title: 'Carbon & Graphite Gland Sealing Rings',
		desc: 'Precision machined carbon and graphite seal rings for steam turbine gland sealing. Self-lubricating material maintains tight clearances at extreme temperatures.',
		usage:
			'Steam turbine gland sealing for pressure retention at shaft exits; gas turbine labyrinth shaft sealing.',
		features: [
			'Self-lubricating carbon/graphite — no additional lubrication required',
			'Precision CNC machined to OEM dimensional specifications',
			'High temperature resistance: up to 600 deg C continuous',
			'Low coefficient of friction — minimal shaft wear',
			'Chemical inertness with steam, gases, most process media',
			'Grades: Carbon graphite, electrographite, silicon carbide',
			'Manufactured to tight clearances per OEM drawings',
		],
		specs: {
			'Material Grades': 'Carbon graphite / Electrographite / Silicon Carbide',
			'Max Temperature': 'Up to 600 deg C continuous',
			Lubrication: 'Self-lubricating (no oil required)',
			Application: 'Turbine gland sealing at shaft exits',
			Machining: 'Precision CNC to OEM dimensions',
		},
		images: [
			'black-carbon-sealing-rings-1.webp',
			'black-carbon-sealing-rings-2.webp',
			'black-carbon-sealing-rings-3.webp',
			'black-carbon-sealing-rings-4.webp',
			'black-carbon-sealing-rings-5.webp',
			'black-carbon-sealing-rings-6.webp',
			'black-carbon-sealing-rings-7.webp',
			'black-carbon-sealing-rings-8.webp',
			'black-carbon-sealing-rings-9.webp',
			'black-carbon-sealing-rings-10.webp',
			'black-carbon-sealing-rings-11.webp',
			'black-carbon-sealing-rings-12.webp',
		],
	},
	{
		id: 'prod_ts2',
		category: 'Turbine Spares',
		title: 'Labyrinth Shaft Sealing Packings',
		desc: 'Custom manufactured labyrinth seal segments and packings for steam turbine shaft sealing. High-temperature alloy with erosion-resistant teeth machined to OEM tight-clearance specifications.',
		usage:
			'Steam turbine shaft sealing between rotating and stationary components; prevents steam leakage along shaft at multiple pressure stages.',
		features: [
			'High-temperature alloy: 410SS, Monel, Stellite options',
			'Erosion-resistant labyrinth teeth profile',
			'Precision machined to OEM diametral clearance specs',
			'Radial, axial, and combined labyrinth configurations',
			'Caulked-in and spring-back (retractable) designs available',
			'Manufactured from reverse-engineered OEM drawings',
			'PMI material verification before machining',
			'Dimensional inspection report provided',
		],
		specs: {
			Material: '410SS, Monel, Stellite — per OEM specification',
			Configurations: 'Radial, Axial, Combined labyrinth',
			'Design Types': 'Caulked-in or Spring-back (retractable)',
			Clearances: 'Precision OEM diametral clearance specification',
			Verification: 'PMI material testing + dimensional inspection',
		},
		images: [
			'labyrinth-sealing-packings-1.webp',
			'labyrinth-sealing-packings-2.webp',
			'labyrinth-sealing-packings-3.webp',
			'labyrinth-sealing-packings-4.webp',
			'labyrinth-sealing-packings-5.webp',
			'labyrinth-sealing-packings-6.webp',
			'labyrinth-sealing-packings-7.webp',
			'labyrinth-sealing-packings-8.webp',
			'labyrinth-sealing-packings-9.webp',
			'labyrinth-sealing-packings-10.webp',
			'labyrinth-sealing-packings-11.webp',
			'labyrinth-sealing-packings-12.webp',
		],
	},
	{
		id: 'prod_ts3',
		category: 'Turbine Spares',
		title: 'Babbitt Journal Bearings & Thrust Pads',
		desc: 'Precision machined white metal (babbitt) journal and thrust bearings for critical rotating turbine equipment. Ultrasonic bond testing verifies babbitt-to-shell adhesion.',
		usage:
			'High-speed rotor support in steam turbines, compressors, and gearboxes; thrust load management in turbine thrust bearing housings.',
		features: [
			'White metal (babbitt) — Tin-base or Lead-base per OEM specification',
			'Precision CNC machined journal bearing bores to OEM tolerance',
			'Thrust pads: Tilting pad or fixed profile designs available',
			'Ultrasonic bond testing verifies babbitt adhesion — 100% tested',
			'Shell material: Cast steel, bronze, or SS per application',
			'Oil distribution grooves and feed holes machined precisely',
			'High load capacity with hydrodynamic oil film support',
			'Exact OEM dimensional replication via 3D scanning and CMM',
		],
		specs: {
			'Babbitt Metal': 'White Metal — Tin-base or Lead-base',
			'Shell Material': 'Cast Steel, Bronze, SS (per OEM)',
			'Bearing Types': 'Journal bearing + Thrust Pad (tilting or fixed)',
			'Bond Integrity Test': 'Ultrasonic bond integrity verification — 100%',
			Machining: 'Precision CNC to OEM tolerance',
			'Dimensional Verification': '3D scanning + CMM measurement',
		},
		images: [
			'babbitt-bearings-1.webp',
			'babbitt-bearings-2.webp',
			'babbitt-bearings-3.webp',
			'babbitt-bearings-4.webp',
			'babbitt-bearings-5.webp',
			'babbitt-bearings-6.webp',
			'babbitt-bearings-7.webp',
			'babbitt-bearings-8.webp',
			'babbitt-bearings-9.webp',
			'babbitt-bearings-10.webp',
			'babbitt-bearings-11.webp',
			'babbitt-bearings-12.webp',
		],
	},
	{
		id: 'prod_ts4',
		category: 'Turbine Spares',
		title: 'Emergency Stop Valves (ESV)',
		desc: 'Mission-critical turbine emergency stop valves reverse-engineered and manufactured to precise dimensional standards. Stellite hard-faced seating surfaces for long service life.',
		usage:
			'Turbine over-speed protection; primary emergency shutdown valve in steam admission circuit.',
		features: [
			'Reverse-engineered from OEM samples using 3D scanning and CMM',
			'Stellite hard-faced seat and plug internals for erosion resistance',
			'Spring-loaded rapid-closure mechanism — fail-safe closed',
			'High-pressure pneumatic/hydraulic actuation available',
			'Body material: Alloy steel (Cr-Mo) or SS 316',
			'Hydrotest: 1.5x design pressure',
			'Seat leakage test conducted per applicable standards',
			'PMI verification + dimensional inspection report supplied',
		],
		specs: {
			Function: 'Emergency shutdown — fail-safe closed position',
			Actuation: 'Spring-loaded + pneumatic or hydraulic trip',
			'Seat/Plug Material': 'Stellite hard-faced (erosion resistant)',
			'Body Material': 'Alloy steel Cr-Mo / SS 316',
			'Pressure Testing': 'Hydrotest at 1.5x design pressure',
			'Seat Leakage': 'Tested per applicable standards',
			Verification: 'PMI certification + dimensional inspection report',
		},
		images: [
			'emergency-stop-valve-1.webp',
			'emergency-stop-valve-2.webp',
			'emergency-stop-valve-3.webp',
			'emergency-stop-valve-4.webp',
			'emergency-stop-valve-5.webp',
			'emergency-stop-valve-6.webp',
			'emergency-stop-valve-7.webp',
			'emergency-stop-valve-8.webp',
			'emergency-stop-valve-9.webp',
			'emergency-stop-valve-10.webp',
			'emergency-stop-valve-11.webp',
			'emergency-stop-valve-12.webp',
		],
	},
	{
		id: 'prod_ts5',
		category: 'Turbine Spares',
		title: 'Turbine Lube Oil Pumps & Mechanical Seals',
		desc: 'OEM-dimensionally-matched replacement main and auxiliary lube oil pumps with precision mechanical seals. High volumetric efficiency with leak-proof mechanical seal assemblies.',
		usage:
			'Main and auxiliary lube oil systems in power generation turbines; supplying pressurized oil to bearings, governors, and control systems.',
		features: [
			'Exact OEM dimensional match verified against drawing',
			'Gear pump type — high volumetric efficiency',
			'Precision mechanical face seal assembly — no packing',
			'Shaft and gear dimensions verified per OEM drawing',
			'Materials: Cast iron body, SS shaft, bronze bushing',
			'Performance tested at rated pressure and flow before dispatch',
			'Engineering drawing supplied with each pump',
		],
		specs: {
			'Pump Type': 'Gear pump (main / auxiliary lube oil service)',
			'Shaft Sealing': 'Precision mechanical face seal',
			Materials: 'Cast iron body / SS shaft / Bronze bushing',
			Testing: 'Pressure and flow performance test at rated conditions',
			Documentation: 'Engineering drawing supplied with each unit',
		},
		images: [
			'turbine-oil-pumps-1.webp',
			'turbine-oil-pumps-2.webp',
			'turbine-oil-pumps-3.webp',
			'turbine-oil-pumps-4.webp',
			'turbine-oil-pumps-5.webp',
			'turbine-oil-pumps-6.webp',
			'turbine-oil-pumps-7.webp',
			'turbine-oil-pumps-8.webp',
			'turbine-oil-pumps-9.webp',
			'turbine-oil-pumps-10.webp',
			'turbine-oil-pumps-11.webp',
			'turbine-oil-pumps-12.webp',
		],
	},
	{
		id: 'prod_ts6',
		category: 'Turbine Spares',
		title: 'High-Purity Electrographite Sealing Rings',
		desc: 'Specialized high-purity electrographite sealing rings for extreme temperature and pressure steam environments. Excellent thermal conductivity dissipates heat from gland area efficiently.',
		usage:
			'High-temperature steam gland sealing in power generation turbines; extreme pressure shaft sealing where standard carbon grades are inadequate.',
		features: [
			'High-purity electrographite material grade',
			'Excellent thermal conductivity for efficient gland heat dissipation',
			'Extreme temperature resistance: up to 700 deg C and above',
			'Chemical inertness with superheated steam and all process gases',
			'Superior oxidation resistance versus standard carbon grades',
			'Low friction coefficient — extends seal and shaft service life',
			'Precision CNC machined to OEM dimensional specifications',
			'Self-lubricating — eliminates need for external lubrication',
		],
		specs: {
			Material: 'High-purity electrographite',
			'Max Temperature': 'Up to 700 deg C+ (superheated steam service)',
			'Thermal Conductivity': 'High — effective gland heat dissipation',
			'Chemical Resistance': 'Steam, all process gases, chemicals',
			Lubrication: 'Self-lubricating',
			Machining: 'Precision CNC to OEM specification',
		},
		images: [
			'high-purity-graphite-rings-1.webp',
			'high-purity-graphite-rings-2.webp',
			'high-purity-graphite-rings-3.webp',
			'high-purity-graphite-rings-4.webp',
			'high-purity-graphite-rings-5.webp',
			'high-purity-graphite-rings-6.webp',
			'high-purity-graphite-rings-7.webp',
			'high-purity-graphite-rings-8.webp',
			'high-purity-graphite-rings-9.webp',
			'high-purity-graphite-rings-10.webp',
			'high-purity-graphite-rings-11.webp',
			'high-purity-graphite-rings-12.webp',
		],
	},
	{
		id: 'prod_ts7',
		category: 'Turbine Spares',
		title: 'Complete Turbine Rotor Assemblies',
		desc: 'Fully manufactured and dynamically balanced turbine rotor assemblies built to exact OEM tolerances. Covers all stages from rough machining through to final precision machining and ISO/API dynamic balancing.',
		usage:
			'Complete rotating element replacement for steam turbines; re-wheeling of existing shafts with new discs and blades.',
		features: [
			'Manufactured from reverse-engineered OEM drawings with PMI material verification',
			'Material: Alloy steel (CrMoV, 12% Cr) per steam conditions',
			'Precision machined: rough machining > pre-final > final',
			'Dynamic balancing 50-2,000 kg to ISO 1940 / API 670',
			'Complete balancing report with mechanical and electrical run-out data',
			'Blade attachment options: Finger-tree, T-root, or dove-tail',
			'Material upgrades available for life extension programs',
			'Ready for immediate installation with full inspection certificates',
		],
		specs: {
			'Rotor Material': 'Alloy Steel (CrMoV, 12% Cr) per steam conditions',
			'Dynamic Balancing': 'ISO 1940 / API 670 (capacity: 50-2,000 kg)',
			'Machining Stages': 'Rough machining > Pre-final > Final machining',
			'Blade Root Options': 'Finger-tree, T-root, Dove-tail',
			Documentation: 'Full inspection certificate + balancing report',
			'Material Upgrades': 'Available for life extension programs',
		},
		images: [
			'rotor-assembly-1.webp',
			'rotor-assembly-2.webp',
			'rotor-assembly-3.webp',
			'rotor-assembly-4.webp',
			'rotor-assembly-5.webp',
			'rotor-assembly-6.webp',
			'rotor-assembly-7.webp',
			'rotor-assembly-8.webp',
			'rotor-assembly-9.webp',
			'rotor-assembly-10.webp',
			'rotor-assembly-11.webp',
			'rotor-assembly-12.webp',
		],
	},
	{
		id: 'prod_ts8',
		category: 'Turbine Spares',
		title: 'Precision Turbine Gears & Worm Wheels',
		desc: 'High-precision gear sets and worm wheel assemblies reverse-engineered for turbine gearboxes and speed reducers. Precision hobbed with exact gear ratios and heat-treated for maximum wear resistance.',
		usage:
			'Turbine gearboxes, speed reducers, governor drive gear trains, and auxiliary equipment gear drives.',
		features: [
			'Exact OEM gear ratios replicated via precision reverse engineering',
			'Gear types: Spur, helical, bevel, and worm gear configurations',
			'Precision hobbing and gear grinding to DIN Grade 6-8 quality',
			'Heat treatment: Case hardening, through hardening, or nitriding',
			'Material: Alloy steel (20MnCr5, 42CrMo4) per OEM specification',
			'Surface hardness: 58-62 HRC (case hardened) or 250-320 HB (through hardened)',
			'Gear profile and tooth geometry verified against OEM sample',
			'Noise and vibration tests conducted post-assembly',
		],
		specs: {
			'Gear Types': 'Spur, Helical, Bevel, Worm',
			'Quality Grade': 'DIN Grade 6-8 (precision hobbed/ground)',
			Material: 'Alloy Steel — 20MnCr5, 42CrMo4',
			'Heat Treatment': 'Case hardening, through hardening, nitriding',
			'Surface Hardness': '58-62 HRC (case) / 250-320 HB (through)',
			Verification: 'Profile, tooth geometry, noise/vibration tests',
		},
		images: [
			'gears-worm-wheels-1.webp',
			'gears-worm-wheels-2.webp',
			'gears-worm-wheels-3.webp',
			'gears-worm-wheels-4.webp',
			'gears-worm-wheels-5.webp',
			'gears-worm-wheels-6.webp',
			'gears-worm-wheels-7.webp',
			'gears-worm-wheels-8.webp',
			'gears-worm-wheels-9.webp',
			'gears-worm-wheels-10.webp',
			'gears-worm-wheels-11.webp',
			'gears-worm-wheels-12.webp',
		],
	},
	{
		id: 'prod_ts9',
		category: 'Turbine Spares',
		title: 'Turbine Nozzles & Diaphragms',
		desc: 'Critical steam path components engineered to direct and accelerate steam flow across each turbine stage for maximum efficiency. High-temperature erosion-resistant alloys.',
		usage:
			'Internal steam path of high-pressure industrial steam turbines; each pressure stage nozzle block and stationary diaphragm.',
		features: [
			'Steam path design optimized for efficiency — nozzle angle and throat area per OEM',
			'Material: 13% Cr steel, 316L SS, Incoloy for high-temperature stages',
			'Erosion and corrosion-resistant surface treatment',
			'Precise throat dimensions maintained per OEM specification',
			'Diaphragm construction: Welded or cast per application',
			'Integral or replaceable nozzle block designs available',
			'Material upgrade available: Titanium or higher-alloy for life extension',
			'Full dimensional inspection + PMI material certificate supplied',
		],
		specs: {
			Material: '13% Cr Steel, 316L SS, Incoloy (stage-dependent)',
			'Nozzle Design': 'Optimized nozzle angle + throat area per OEM',
			'Surface Treatment': 'Erosion and corrosion resistant',
			'Diaphragm Type': 'Welded or cast; integral/replaceable nozzle block',
			'Material Upgrades': 'Titanium/high-alloy for life extension',
			Documentation: 'Dimensional inspection + PMI material certificate',
		},
		images: [
			'nozzles-diaphragms-1.webp',
			'nozzles-diaphragms-2.webp',
			'nozzles-diaphragms-3.webp',
			'nozzles-diaphragms-4.webp',
			'nozzles-diaphragms-5.webp',
			'nozzles-diaphragms-6.webp',
			'nozzles-diaphragms-7.webp',
			'nozzles-diaphragms-8.webp',
			'nozzles-diaphragms-9.webp',
			'nozzles-diaphragms-10.webp',
			'nozzles-diaphragms-11.webp',
			'nozzles-diaphragms-12.webp',
		],
	},
	{
		id: 'prod_ts10',
		category: 'Turbine Spares',
		title: 'Mechanical Centrifugal Speed Governors',
		desc: 'Precision mechanical centrifugal governor assemblies maintaining exact RPM control in steam turbines. Fly-weight mechanism, speeder spring, and pilot valve assemblies included.',
		usage:
			'Turbine speed control and over-speed prevention; primary speed governing device in steam turbines without electronic governors.',
		features: [
			'Fly-weight centrifugal mechanism with calibrated speeder springs',
			'Pilot valve assembly for hydraulic amplification of control signal',
			'High sensitivity: detects speed deviations within +/-1% RPM',
			'Over-speed trip setpoint: typically 10% above rated speed',
			'Robust all-mechanical design for continuous unattended operation',
			'Calibrated setpoint before dispatch from workshop',
			'Complete dimensional and performance test report provided',
		],
		specs: {
			'Governor Type': 'Mechanical centrifugal fly-weight',
			'Speed Sensitivity': '+/-1% RPM deviation detection',
			'Over-speed Trip': 'Typically 10% above rated operating speed',
			'Control Amplification': 'Hydraulic pilot valve (oil pressure signal)',
			Calibration: 'Setpoint calibrated before dispatch',
			Documentation: 'Performance test report supplied',
		},
		images: [
			'mechanical-governors-1.webp',
			'mechanical-governors-2.webp',
			'mechanical-governors-3.webp',
			'mechanical-governors-4.webp',
			'mechanical-governors-5.webp',
			'mechanical-governors-6.webp',
			'mechanical-governors-7.webp',
			'mechanical-governors-8.webp',
			'mechanical-governors-9.webp',
			'mechanical-governors-10.webp',
			'mechanical-governors-11.webp',
			'mechanical-governors-12.webp',
		],
	},
	{
		id: 'prod_ts11',
		category: 'Turbine Spares',
		title: 'Turbine Throttle (Control) Valves',
		desc: 'High-pressure throttle and control valves for precise steam flow regulation into turbine stages. Stellite-trimmed internals for erosion resistance at high velocities.',
		usage:
			'Steam turbine inlet throttle control and multi-valve admission for power and back-pressure control.',
		features: [
			'Stellite-trimmed stem, seat and plug internals',
			'Body: Alloy steel (Cr-Mo) or SS 316 per steam conditions',
			'Custom equal-percentage or linear flow characteristics',
			'High-pressure rated (to turbine design pressure)',
			'Rapid response action for governor integration',
			'Hydraulic or pneumatic actuator options',
			'Seat and plug hardness: 40-45 HRC (Stellite 6)',
			'Hydrotest at 1.5x DP; seat leakage tested',
		],
		specs: {
			Internals: 'Stellite 6 trimmed (seat + plug + stem)',
			Body: 'Alloy steel Cr-Mo / SS 316',
			'Flow Characteristics': 'Equal-percentage or linear (custom)',
			Actuation: 'Hydraulic or pneumatic',
			Hardness: '40-45 HRC (Stellite 6)',
			Testing: 'Hydrotest 1.5x DP + seat leakage test',
		},
		images: [
			'throttle-valves-1.webp',
			'throttle-valves-2.webp',
			'throttle-valves-3.webp',
			'throttle-valves-4.webp',
			'throttle-valves-5.webp',
			'throttle-valves-6.webp',
			'throttle-valves-7.webp',
			'throttle-valves-8.webp',
			'throttle-valves-9.webp',
			'throttle-valves-10.webp',
			'throttle-valves-11.webp',
			'throttle-valves-12.webp',
		],
	},
	{
		id: 'prod_r1',
		category: 'Industrial Rubber Products',
		title: 'Custom Extruded Rubber Profiles & Seals',
		desc: 'High-quality extruded rubber profiles in EPDM, Neoprene, Nitrile, and Natural Rubber for industrial sealing and dampening. Custom cross-section shapes produced to customer drawing.',
		usage:
			'Sealing panels, machine covers, door and window seals, industrial enclosure gaskets, vibration damping strip applications.',
		features: [
			'Custom cross-section extrusion to customer drawing or sample',
			'Materials: EPDM, Neoprene (CR), Nitrile (NBR), Natural Rubber',
			'EPDM: Excellent weathering, ozone, UV resistance for outdoor use',
			'Neoprene: Oil and flame resistant properties',
			'Nitrile: Superior oil and fuel resistance',
			'Hardness range: 40-80 Shore A per application',
			'Operating temperature: -40 to +150 deg C (EPDM grade)',
			'Available with pressure-sensitive adhesive backing',
		],
		specs: {
			'Material Options': 'EPDM, Neoprene (CR), Nitrile (NBR), Natural Rubber',
			'Hardness Range': '40-80 Shore A (customizable)',
			'Operating Temperature': '-40 to +150 deg C (EPDM grade)',
			Profile: 'Custom cross-section per drawing or sample',
			'Backing Option': 'Pressure-sensitive adhesive backing available',
			'Supply Format': 'Standard rolls or cut-to-length',
		},
		images: [
			'extruded-rubber-profile-1.webp',
			'extruded-rubber-profile-2.webp',
			'extruded-rubber-profile-3.webp',
			'extruded-rubber-profile-4.webp',
			'extruded-rubber-profile-5.webp',
			'extruded-rubber-profile-6.webp',
			'extruded-rubber-profile-7.webp',
			'extruded-rubber-profile-8.webp',
			'extruded-rubber-profile-9.webp',
			'extruded-rubber-profile-10.webp',
			'extruded-rubber-profile-11.webp',
			'extruded-rubber-profile-12.webp',
		],
	},
	{
		id: 'prod_r2',
		category: 'Industrial Rubber Products',
		title: 'Heavy Duty Anti-Vibration Rubber Mounts',
		desc: 'Industrial-grade anti-vibration rubber mounts bonded to steel plates for isolating heavy rotating machinery. Reduces structure-borne noise and vibration transmission.',
		usage:
			'Vibration isolation for turbine-generator sets, compressors, diesel generators, cooling tower fans, and heavy industrial machinery.',
		features: [
			'Natural rubber to steel plate bonded (vulcanized) construction',
			'High load bearing capacity per mounting point',
			'Significantly reduces structure-borne noise and vibration',
			'Protects foundations from dynamic machinery loads',
			'Operating temperature: -30 to +70 deg C (continuous)',
			'Types: Cylindrical, sandwich, conical, and bobbin mounts',
			'Custom load ratings and natural frequency specifications available',
		],
		specs: {
			Construction: 'Rubber-to-steel bonded (vulcanized)',
			'Mount Types': 'Cylindrical, sandwich, conical, bobbin',
			Material: 'Natural Rubber / Neoprene + Mild Steel',
			'Operating Temperature': '-30 to +70 deg C continuous',
			'Load Rating': 'Custom per application requirement',
			Applications: 'Turbine-generator, compressor, heavy machinery isolation',
		},
		images: [
			'rubber-mounts-1.webp',
			'rubber-mounts-2.webp',
			'rubber-mounts-3.webp',
			'rubber-mounts-4.webp',
			'rubber-mounts-5.webp',
			'rubber-mounts-6.webp',
			'rubber-mounts-7.webp',
			'rubber-mounts-8.webp',
			'rubber-mounts-9.webp',
			'rubber-mounts-10.webp',
			'rubber-mounts-11.webp',
			'rubber-mounts-12.webp',
		],
	},
	{
		id: 'prod_h1',
		category: 'Flexible Hoses & Assemblies',
		title: 'SS Corrugated Flexible Metal Hose Assemblies',
		desc: 'Stainless steel corrugated hose with braided outer sheath for high-temperature, high-pressure, and chemically aggressive fluid transfer. Absorbs thermal expansion, vibration, and misalignment.',
		usage:
			'High-temperature steam lines, chemical transfer, vibration absorption at pump/compressor connections, cryogenic lines.',
		features: [
			'SS 304 / SS 316L corrugated inner hose',
			'Single or double SS braided outer sheath',
			'OD range: 1/2 to 14 inch (DN 15 to DN 350)',
			'Temperature: -20 to +350 deg C',
			'Working pressure: 0.6 to 1.6 MPa (standard)',
			'Ends: SS 304/316 BSP, NPT, BSPP threaded or flanged',
			'Tested per ISO 10380 and SAE J1610',
			'Absorbs axial, lateral, and angular movements simultaneously',
		],
		specs: {
			'Hose Material': 'SS 304 / SS 316L corrugated + SS wire braid',
			'Size Range': '1/2 to 14 inch (DN 15 to DN 350)',
			'Temperature Range': '-20 to +350 deg C',
			'Working Pressure':
				'0.6-1.6 MPa (single braid); higher with double braid',
			'End Fittings': 'BSP, NPT, Flanged — SS 304/316',
			'Test Standards': 'ISO 10380, SAE J1610',
		},
		images: [
			'ss-corrugated-flexible-hose-1.webp',
			'ss-corrugated-flexible-hose-2.webp',
			'ss-corrugated-flexible-hose-3.webp',
			'ss-corrugated-flexible-hose-4.webp',
			'ss-corrugated-flexible-hose-5.webp',
			'ss-corrugated-flexible-hose-6.webp',
			'ss-corrugated-flexible-hose-7.webp',
			'ss-corrugated-flexible-hose-8.webp',
			'ss-corrugated-flexible-hose-9.webp',
			'ss-corrugated-flexible-hose-10.webp',
			'ss-corrugated-flexible-hose-11.webp',
			'ss-corrugated-flexible-hose-12.webp',
		],
	},
	{
		id: 'prod_h1b',
		category: 'Flexible Hoses & Assemblies',
		title: 'SS Hose Pre-Fitted Assemblies',
		desc: 'Complete stainless steel hose assemblies with pre-fitted and tested end fittings for immediate installation. Combines SS corrugated hose flexibility with leak-proof sealed end connections — ready to bolt on.',
		usage:
			'Critical fluid transfer in refineries, chemical processing, steam systems, hydraulic lines, food processing, and pharmaceutical plants where assembled and tested hoses are required.',
		features: [
			'Pre-fitted end fittings — ready to install, no site assembly required',
			'Pressure-tested assembly — full leakage test before despatch',
			'Material grades: SS 304, SS 316 hose and fittings',
			'Working pressure: Up to 40 bar',
			'Hose lengths: 1 m to 30 m; custom lengths available',
			'End connections: Female threaded, flanged, nipple, camlock, quick release',
			'Single and double wire braid configurations available',
			'ISO 10380 compliant; traceability documentation available',
		],
		specs: {
			Construction: 'SS corrugated hose with pre-fitted tested end fittings',
			'Material Grades': 'SS 304 / SS 316',
			'Working Pressure': 'Up to 40 bar',
			'Hose Length': '1 m to 30 m; custom lengths available',
			'End Connections':
				'Female Threaded, Flanged, Nipple, Camlock, Quick Release',
			Testing: 'Full pressure and leakage test before despatch',
			Standard: 'ISO 10380',
		},
		images: [
			'ss-hose-assembly-1.webp',
			'ss-hose-assembly-2.webp',
			'ss-hose-assembly-3.webp',
			'ss-hose-assembly-4.webp',
			'ss-hose-assembly-5.webp',
			'ss-hose-assembly-6.webp',
			'ss-hose-assembly-7.webp',
			'ss-hose-assembly-8.webp',
			'ss-hose-assembly-9.webp',
			'ss-hose-assembly-10.webp',
			'ss-hose-assembly-11.webp',
			'ss-hose-assembly-12.webp',
		],
	},
	{
		id: 'prod_h1c',
		category: 'Flexible Hoses & Assemblies',
		title: 'Generator & Engine Exhaust Bellows',
		desc: 'Specialised single-bellow expansion joints for generator exhaust connections and engine exhaust systems. Temperature-rated for hot exhaust gas service with SS 316L construction. Available in round or rectangular configuration with interlock liner option.',
		usage:
			'Diesel generator exhaust connections, gas engine exhaust systems, industrial engine compartments, and automotive exhaust ducting.',
		features: [
			'Flanged ends — round or rectangular configuration available',
			'SS 316L construction — rated for exhaust gas temperatures to +400°C',
			'Single bellow design — absorbs axial and lateral exhaust movement',
			'Interlock liner option to prevent vibration fatigue on bellows',
			'Absorbs engine vibration and thermal expansion from exhaust system',
			'Prevents exhaust load transmission to engine block or silencer',
			'Available bore sizes: 25 mm to 150 mm',
			'Quick installation with standard flange drilling',
		],
		specs: {
			Material: 'SS 316L',
			'Temperature Range': '-20°C to +400°C',
			Configuration: 'Single bellow — round or rectangular',
			'Bore Size': '25 mm to 150 mm',
			'End Connections': 'Flanged',
			'Liner Option': 'Interlock liner for vibration protection',
			Applications: 'Generator exhaust, engine exhaust systems, automotive',
		},
		images: [
			'generator-exhaust-bellow-1.webp',
			'generator-exhaust-bellow-2.webp',
			'generator-exhaust-bellow-3.webp',
			'generator-exhaust-bellow-4.webp',
			'generator-exhaust-bellow-5.webp',
			'generator-exhaust-bellow-6.webp',
			'generator-exhaust-bellow-7.webp',
			'generator-exhaust-bellow-8.webp',
			'generator-exhaust-bellow-9.webp',
			'generator-exhaust-bellow-10.webp',
			'generator-exhaust-bellow-11.webp',
			'generator-exhaust-bellow-12.webp',
		],
	},
	{
		id: 'prod_h2',
		category: 'Flexible Hoses & Assemblies',
		title: 'PTFE Lined Smooth Bore Hose Assemblies',
		desc: 'Smooth bore PTFE-lined hose with stainless steel outer braid. Non-stick inner surface prevents product contamination. Maximum chemical resistance for aggressive chemicals and high-purity applications.',
		usage:
			'Pharmaceutical fluid transfer, aggressive acids/alkalis, solvents, semiconductor chemicals, food-grade process lines.',
		features: [
			'Smooth bore PTFE inner tube — non-stick, non-contaminating',
			'SS 304 / SS 316 outer braided sheath',
			'Chemically inert to virtually all industrial chemicals',
			'FDA-compliant PTFE grade available for food and pharma',
			'Operating temperature: -60 to +260 deg C',
			'Working pressure: Up to 40 bar (size-dependent)',
			'Anti-static conductive PTFE available',
			'End fittings: NPT, BSP, flanged, tri-clamp',
		],
		specs: {
			'Inner Tube': 'Smooth bore PTFE (FDA grade available)',
			'Outer Braid': 'SS 304 / SS 316',
			'Temperature Range': '-60 to +260 deg C',
			'Max Working Pressure': 'Up to 40 bar (size-dependent)',
			'Chemical Resistance': 'Virtually all industrial chemicals',
			'End Fittings': 'Swaged SS — NPT, BSP, flanged, tri-clamp',
		},
		images: [
			'ptfe-lined-hose-1.webp',
			'ptfe-lined-hose-2.webp',
			'ptfe-lined-hose-3.webp',
			'ptfe-lined-hose-4.webp',
			'ptfe-lined-hose-5.webp',
			'ptfe-lined-hose-6.webp',
			'ptfe-lined-hose-7.webp',
			'ptfe-lined-hose-8.webp',
			'ptfe-lined-hose-9.webp',
			'ptfe-lined-hose-10.webp',
			'ptfe-lined-hose-11.webp',
			'ptfe-lined-hose-12.webp',
		],
	},
	{
		id: 'prod_h3',
		category: 'Flexible Hoses & Assemblies',
		title: 'High-Pressure Hydraulic Rubber Hose Assemblies',
		desc: 'Steel wire braid and spiral-reinforced rubber hydraulic hoses for extreme pressure service. Oil and weather-resistant cover suitable for turbine hydraulic control systems.',
		usage:
			'Heavy machinery hydraulic systems, turbine hydraulic control lines, industrial power units, mobile equipment hydraulics.',
		features: [
			'Inner tube: Oil-resistant nitrile rubber',
			'Reinforcement: High-tensile steel wire braid or 4-wire spiral wrap',
			'Outer cover: Oil, weather, and abrasion-resistant black rubber',
			'Working pressure: Up to 420 bar (4-spiral wrap, size-dependent)',
			'MSHA approval for mining and hazardous location applications',
			'Standards: EN 853, EN 856, SAE 100R1/R2/R12/R13',
			'Operating temperature: -40 to +120 deg C',
			'End fittings: Crimped CS/SS — JIC, BSP, NPT, SAE flange',
		],
		specs: {
			'Inner Tube': 'Oil-resistant Nitrile (NBR) rubber',
			Reinforcement: 'Steel wire braid / 4-wire spiral wrap',
			'Outer Cover': 'Oil/weather/abrasion-resistant rubber',
			'Max Working Pressure': 'Up to 420 bar (4-spiral, size-dependent)',
			'Temperature Range': '-40 to +120 deg C',
			Standards: 'EN 853, EN 856, SAE 100R1/R2/R12/R13, MSHA',
		},
		images: [
			'hydraulic-rubber-hose-1.webp',
			'hydraulic-rubber-hose-2.webp',
			'hydraulic-rubber-hose-3.webp',
			'hydraulic-rubber-hose-4.webp',
			'hydraulic-rubber-hose-5.webp',
			'hydraulic-rubber-hose-6.webp',
			'hydraulic-rubber-hose-7.webp',
			'hydraulic-rubber-hose-8.webp',
			'hydraulic-rubber-hose-9.webp',
			'hydraulic-rubber-hose-10.webp',
			'hydraulic-rubber-hose-11.webp',
			'hydraulic-rubber-hose-12.webp',
		],
	},
	// ── NEW PRODUCTS — FLEXIBLE HOSES & ASSEMBLIES (from FlexhoseIndia catalog) ──
	{
		id: 'prod_h4',
		category: 'Flexible Hoses & Assemblies',
		title: 'PTFE Braided Corrugated Transfer Hose',
		desc: 'Premium PTFE-core corrugated hose with stainless steel outer braid for chemical-resistant fluid transfer. Combines PTFE chemical inertness with corrugated flexibility and SS304/316 braid reinforcement for high-pressure duty.',
		usage:
			'Pharmaceutical liquid and gas transfer, aggressive chemical lines (acids, alkalis, solvents), food-grade process lines, and high-purity fluid transfer in refineries and chemical plants.',
		features: [
			'PTFE corrugated inner core — inert to virtually all industrial chemicals',
			'SS304 or SS316 single/double wire braid outer reinforcement',
			'Working pressure: up to 100 bar (single braid); higher with double braid',
			'Temperature range: -60 deg C to +260 deg C continuous service',
			'FDA-compliant PTFE grade available for food and pharmaceutical applications',
			'Anti-static conductive PTFE option for flammable media',
			'End fittings: NPT, BSP, flanged, tri-clamp, camlock per application',
			'ISO 10380 compliant — pressure-tested assembly before dispatch',
			'Zero product contamination — smooth PTFE bore, non-stick surface',
			'Custom lengths and end connections per site specification',
		],
		specs: {
			'Inner Tube': 'PTFE corrugated (FDA grade available)',
			Braid: 'SS 304 / SS 316 single or double wire braid',
			'Working Pressure': 'Up to 100 bar (single braid, size-dependent)',
			'Temperature Range': '-60 deg C to +260 deg C',
			'Size Range': '1/4 inch to 4 inch (DN 6 to DN 100)',
			'Chemical Resistance': 'Virtually all industrial chemicals — PTFE inert',
			Standards: 'ISO 10380, FDA 21 CFR 177.1550 (food grade)',
			'End Connections': 'NPT, BSP, Flanged, Tri-clamp, Camlock',
		},
		images: [
			'ptfe-braided-hose-1.webp',
			'ptfe-braided-hose-2.webp',
			'ptfe-braided-hose-3.webp',
			'ptfe-braided-hose-4.webp',
			'ptfe-braided-hose-5.webp',
			'ptfe-braided-hose-6.webp',
			'ptfe-braided-hose-7.webp',
			'ptfe-braided-hose-8.webp',
			'ptfe-braided-hose-9.webp',
			'ptfe-braided-hose-10.webp',
			'ptfe-braided-hose-11.webp',
			'ptfe-braided-hose-12.webp',
		],
	},
	{
		id: 'prod_h5',
		category: 'Flexible Hoses & Assemblies',
		title: 'Metallic Flexible Hose (Corrugated Core)',
		desc: 'General-purpose corrugated stainless steel flexible hose for industrial fluid and gas transfer. Helical or annular corrugated core in SS304/316L with optional single wire braid. Cost-effective and stocked in standard sizes for rapid dispatch.',
		usage:
			'Industrial piping flexibility connections, vibration absorption at pump and compressor nozzles, steam lines, water and gas transfer, HVAC thermal systems, and boiler feed connections.',
		features: [
			'Corrugated SS inner hose — helical or annular corrugation per application',
			'Materials: SS 304, SS 316, SS 316L per service requirements',
			'Size range: 1/2 inch to 6 inch nominal bore (DN 12 to DN 150)',
			'Pressure rating: 25 to 63 bar depending on bore and braid configuration',
			'Single SS wire braid standard — double braid for higher pressure',
			'Temperature range: -40 deg C to +400 deg C (SS316L grade)',
			'End connections: flanged, threaded (BSP/NPT), nipple, or plain end',
			'Unit lengths: 300 mm, 500 mm, 1 m, 1.5 m, 2 m, 3 m, 6 m, custom',
			'ISO 10380 compliant with pressure and leak test before dispatch',
			'Stocked sizes available for same-day dispatch on standard requirements',
		],
		specs: {
			'Core Material': 'SS 304 / SS 316 / SS 316L corrugated',
			'Corrugation Type': 'Helical (standard) or Annular (high-pressure)',
			'Nominal Bore': '1/2 inch to 6 inch (DN 12 to DN 150)',
			'Pressure Rating': '25–63 bar (size and braid dependent)',
			'Temperature Range': '-40 deg C to +400 deg C (SS316L)',
			Braid: 'Single or Double SS wire braid',
			'End Connections': 'Flanged / Threaded BSP/NPT / Nipple / Plain',
			Standard: 'ISO 10380',
		},
		images: [
			'metallic-flexible-hose-1.webp',
			'metallic-flexible-hose-2.webp',
			'metallic-flexible-hose-3.webp',
			'metallic-flexible-hose-4.webp',
			'metallic-flexible-hose-5.webp',
			'metallic-flexible-hose-6.webp',
			'metallic-flexible-hose-7.webp',
			'metallic-flexible-hose-8.webp',
			'metallic-flexible-hose-9.webp',
			'metallic-flexible-hose-10.webp',
			'metallic-flexible-hose-11.webp',
			'metallic-flexible-hose-12.webp',
		],
	},
	{
		id: 'prod_h6',
		category: 'Flexible Hoses & Assemblies',
		title: 'Steam Hose — High Temperature Service',
		desc: 'Purpose-built high-temperature steam hose rated for continuous saturated and superheated steam service. SS316L corrugated core with braid reinforcement handles thermal cycling, condensate, and steam pressures in industrial boiler and heat exchanger applications.',
		usage:
			'Steam injection lines, boiler connections, heat exchanger flexible connections, steam trap bypass lines, and high-temperature process steam in power plants, sugar mills, paper mills, and distilleries.',
		features: [
			'Dedicated steam service design — rated for saturated and superheated steam',
			'Inner core: SS316L corrugated — resists chloride stress corrosion cracking',
			'Operating temperature: continuous service up to 350 deg C steam',
			'Working pressure: up to 100 bar (size-dependent; high-pressure steam duty)',
			'Single or double SS wire braid reinforcement for pressure retention',
			'End fittings: heavy-duty flanged or screwed for secure steam connections',
			'Thermal cycling rated — withstands repeated start-stop duty on boiler lines',
			'Condensate-resistant construction — no deterioration from wet steam service',
			'All assemblies pressure-tested at 1.5× working pressure before dispatch',
			'Available bore sizes: 1/2 inch to 4 inch in standard lengths',
		],
		specs: {
			Service: 'Saturated and superheated steam — dedicated duty',
			'Core Material': 'SS 316L corrugated',
			'Max Temperature': 'Up to 350 deg C (superheated steam service)',
			'Working Pressure': 'Up to 100 bar (size-dependent)',
			'Bore Range': '1/2 inch to 4 inch (DN 12 to DN 100)',
			Braid: 'Single or Double SS wire braid',
			'End Connections': 'Heavy-duty flanged or screwed BSP/NPT',
			'Pressure Test': '1.5× working pressure before dispatch',
		},
		images: [
			'steam-hose-1.webp',
			'steam-hose-2.webp',
			'steam-hose-3.webp',
			'steam-hose-4.webp',
			'steam-hose-5.webp',
			'steam-hose-6.webp',
			'steam-hose-7.webp',
			'steam-hose-8.webp',
			'steam-hose-9.webp',
			'steam-hose-10.webp',
			'steam-hose-11.webp',
			'steam-hose-12.webp',
		],
	},
	{
		id: 'prod_h7',
		category: 'Flexible Hoses & Assemblies',
		title: 'Flexible Food Grade Hose',
		desc: 'FDA-compliant food-grade flexible hose for hygienic fluid and gas transfer in food processing, beverage, dairy, and pharmaceutical plants. Smooth polished bore, CIP/SIP compatible construction with sanitary end fittings.',
		usage:
			'Food-grade liquid and gas transfer in dairy plants, breweries, beverage production, edible oil processing, pharmaceutical fluid handling, and any application requiring hygienic piping with FDA-approved materials.',
		features: [
			'Food-grade materials: FDA 21 CFR compliant inner tube and seals',
			'Smooth polished bore — minimises retention and microbial growth risk',
			'CIP (Clean-In-Place) and SIP (Sterilize-In-Place) compatible construction',
			'Inner tube: food-grade PTFE, silicone, or polished SS316L per service',
			'Operating temperature: -40 deg C to +150 deg C (EPDM/SS grades)',
			'Working pressure: up to 16 bar (food-grade service)',
			'Sanitary end fittings: tri-clamp (DIN/SMS/ISO), plain end, or flanged',
			'Electro-polished internal surface available for highest hygiene rating',
			'Non-toxic, non-tainting, odourless — no product contamination',
			'EHEDG and 3-A Sanitary Standards compatible on request',
		],
		specs: {
			'Inner Tube': 'Food-grade PTFE / Silicone / Polished SS316L',
			Compliance: 'FDA 21 CFR — food and pharmaceutical grade',
			'Temperature Range': '-40 deg C to +150 deg C',
			'Working Pressure': 'Up to 16 bar',
			Surface: 'Electro-polished internal bore (Ra ≤ 0.8 µm)',
			'End Fittings': 'Tri-clamp DIN/SMS/ISO / Flanged / Plain end',
			'CIP/SIP': 'Compatible',
			Standards: 'FDA 21 CFR, EHEDG, 3-A Sanitary (on request)',
		},
		images: [
			'food-grade-hose-1.webp',
			'food-grade-hose-2.webp',
			'food-grade-hose-3.webp',
			'food-grade-hose-4.webp',
			'food-grade-hose-5.webp',
			'food-grade-hose-6.webp',
			'food-grade-hose-7.webp',
			'food-grade-hose-8.webp',
			'food-grade-hose-9.webp',
			'food-grade-hose-10.webp',
			'food-grade-hose-11.webp',
			'food-grade-hose-12.webp',
		],
	},
	{
		id: 'prod_h8',
		category: 'Flexible Hoses & Assemblies',
		title: 'Oxygen & Specialty Gas Hose',
		desc: 'Stainless steel corrugated hose for oxygen, nitrogen, LPG, and specialty industrial gas transfer. Cleaned and degreased for oxygen service with oil-free construction. Suitable for cryogenic service on liquid nitrogen and LOX lines.',
		usage:
			'Oxygen distribution systems, liquid nitrogen transfer, LPG flexible connections, industrial gas cylinder pigtails, cryogenic plant connections, and specialty gas transfer in pharmaceutical and chemical plants.',
		features: [
			'Oxygen-service cleaned and degreased — no hydrocarbon contamination',
			'Inner core: SS316L corrugated — compatible with all industrial gases',
			'Cryogenic-rated to -200 deg C for liquid oxygen and nitrogen service',
			'Working pressure: up to 100 bar (gas cylinder duty)',
			'Single SS braid — meets gas industry hose safety requirements',
			'End fittings: CGA, DIN 477, BS341, NPT, BSP or flanged per gas type',
			'Oil-free construction throughout — mandatory for oxidising gas service',
			'Pressure-tested and certified before dispatch with gas tightness verification',
			'UV and ozone resistant outer cover on rubber-sheathed variants',
			'Available bore sizes: 1/4 inch to 2 inch for standard gas service',
		],
		specs: {
			Service: 'Oxygen, nitrogen, LPG, specialty industrial gases',
			'Core Material': 'SS 316L corrugated — gas-cleaned and degreased',
			'Cryogenic Rating':
				'Down to -200 deg C (liquid oxygen / nitrogen service)',
			'Working Pressure': 'Up to 100 bar (size-dependent)',
			'Bore Range': '1/4 inch to 2 inch',
			'End Connections': 'CGA / DIN 477 / BS341 / NPT / BSP / Flanged',
			'Oil-Free': 'Yes — mandatory for oxidising gas service',
			Test: 'Pressure and gas-tightness certified before dispatch',
		},
		images: [
			'oxygen-gas-hose-1.webp',
			'oxygen-gas-hose-2.webp',
			'oxygen-gas-hose-3.webp',
			'oxygen-gas-hose-4.webp',
			'oxygen-gas-hose-5.webp',
			'oxygen-gas-hose-6.webp',
			'oxygen-gas-hose-7.webp',
			'oxygen-gas-hose-8.webp',
			'oxygen-gas-hose-9.webp',
			'oxygen-gas-hose-10.webp',
			'oxygen-gas-hose-11.webp',
			'oxygen-gas-hose-12.webp',
		],
	},
	// ── NEW PRODUCT — INDUSTRIAL FILTRATION ──
	{
		id: 'prod_f14',
		category: 'Industrial Filtration',
		title: 'Filter Bag & Support Cage Assembly',
		desc: 'Complete baghouse filter bag and support cage assembly for industrial dust collection systems. Filter bags retain particulate from process gas streams while the structural wire cage maintains bag shape under filtration and pulse-jet cleaning loads. Supplied as matched bag-and-cage sets or separately as replacement components.',
		usage:
			'Dust collection in cement plants (kiln exhaust, raw mill, clinker cooler), power plants (fly ash collection, ESP bypass), steel mills (furnace fume extraction), chemical plants, grain handling facilities, and any pulse-jet or reverse-air baghouse dust collector installation.',
		features: [
			'Filter Bag — fabric media options: polyester, polypropylene, PTFE, PPS, fibreglass, aramid (Nomex) per process temperature and chemistry',
			'Filtration efficiency: ≥99.9% at 1–10 µm particle size (media-dependent)',
			'Temperature range: up to 150 deg C (polyester/polypropylene); up to 260 deg C (PTFE membrane/PPS); up to 300 deg C+ (fibreglass, aramid)',
			'PTFE membrane-coated bags available for sub-micron and sticky dust applications',
			'Support Cage — rigid wire construction in low-carbon steel, galvanised steel, SS304, or SS316L',
			'Cage wire: 10, 12, or 20 vertical stringer wires welded to horizontal support rings (4, 6, or 8 inch spacing)',
			'Cage surface treatments: galvanised (standard), epoxy powder-coated, silicon-coated, or SS for corrosive and high-humidity service',
			'Cage top designs: rolled flange (top-load), split ring (bottom-load), snap-band, or collar-venturi per baghouse design',
			'Two-piece cage option for 150 inch and 300 inch long bags with finger, slide-lock, or twist-lock connectors',
			'Venturi insert supplied with cage for pulse-jet cleaning efficiency improvement',
			'Custom dimensions: cage diameter 4 to 8 inch; cage length 1,000 to 9,000 mm per OEM baghouse specification',
			'Compatible with pulse-jet, shaker, and reverse-air cleaning systems',
			'Dimensional tolerance: vertical wire spacing ±2 mm; no burrs or sharp edges per quality standard',
			'Seam options: sewn, welded, or heat-set with reinforced ring hardware and anti-blowout collar',
		],
		specs: {
			'Bag Fabrics':
				'Polyester / PP / PTFE Membrane / PPS / Fibreglass / Aramid (Nomex)',
			'Temperature (bag)':
				'Up to 150 deg C (polyester); 260 deg C (PTFE/PPS); 300 deg C+ (fibreglass)',
			'Filtration Efficiency': '≥99.9% at 1–10 µm (PTFE membrane grade)',
			'Cage Material': 'Galvanised CS / Epoxy-coated CS / SS 304 / SS 316L',
			'Cage Diameter': '4 inch to 8 inch (100 mm to 200 mm)',
			'Cage Length': '1,000 to 9,000 mm (custom to baghouse spec)',
			'Vertical Wires': '10, 12, or 20 stringers (application dependent)',
			'Ring Spacing': '4 inch, 6 inch, or 8 inch horizontal support rings',
			'Cage Top': 'Rolled flange / Split ring / Snap-band / Collar-venturi',
			'Cleaning System': 'Pulse-jet / Shaker / Reverse-air compatible',
			Venturi: 'Included for pulse-jet installations',
			Custom: 'Dimensions per OEM baghouse drawing',
		},
		images: [
			'filter-bag-cage-1.webp',
			'filter-bag-cage-2.webp',
			'filter-bag-cage-3.webp',
			'filter-bag-cage-4.webp',
			'filter-bag-cage-5.webp',
			'filter-bag-cage-6.webp',
			'filter-bag-cage-7.webp',
			'filter-bag-cage-8.webp',
			'filter-bag-cage-9.webp',
			'filter-bag-cage-10.webp',
			'filter-bag-cage-11.webp',
			'filter-bag-cage-12.webp',
		],
	},
	{
		id: 'prod_ee1',
		category: 'Electronic Equipments',
		title: 'Vibration Monitoring Probes (Shinkawa-compatible)',
		desc: 'High-precision non-contact eddy current displacement sensors for continuous turbine shaft vibration and axial position monitoring. API 670 standard compliant.',
		usage:
			'Continuous monitoring of shaft radial vibration, thrust position, and axial displacement in high-speed steam turbines, compressors, and rotating machinery.',
		features: [
			'Non-contact eddy current measurement principle — no physical shaft contact',
			'Measures shaft radial vibration amplitude and axial displacement',
			'API 670 Standard compliant for machinery protection systems',
			'Frequency response: DC to 10 kHz measurement bandwidth',
			'Signal output: 4-20 mA (4-wire) or -24V DC voltage per driver',
			'Probe measurement range: 0.25-2.5 mm (calibrated at 1.0 mm nominally)',
			'Temperature: Probe -50 to +175 deg C; driver electronics -40 to +85 deg C',
			'Sensitivity: 8 mV per µm standard calibration',
			'Integral cable: Armoured stainless steel for harsh industrial environments',
		],
		specs: {
			'Measurement Principle': 'Non-contact eddy current displacement',
			'Standard Compliance': 'API 670 — Machinery Protection Systems',
			'Frequency Response': 'DC to 10 kHz bandwidth',
			'Signal Output': '4-20 mA or -24V DC (driver-dependent)',
			Sensitivity: '8 mV/µm (standard calibration)',
			'Probe Gap Range': '0.25-2.5 mm (calibrated at 1.0 mm nominal)',
			'Probe Temperature Rating': '-50 to +175 deg C',
			'Cable Type': 'Armoured stainless steel',
		},
		images: [
			'vibration-probe-shinkawa-1.webp',
			'vibration-probe-shinkawa-2.webp',
			'vibration-probe-shinkawa-3.webp',
			'vibration-probe-shinkawa-4.webp',
			'vibration-probe-shinkawa-5.webp',
			'vibration-probe-shinkawa-6.webp',
			'vibration-probe-shinkawa-7.webp',
			'vibration-probe-shinkawa-8.webp',
			'vibration-probe-shinkawa-9.webp',
			'vibration-probe-shinkawa-10.webp',
			'vibration-probe-shinkawa-11.webp',
			'vibration-probe-shinkawa-12.webp',
		],
	},
	{
		id: 'prod_ee2',
		category: 'Electronic Equipments',
		title: 'Magnetic Pickup Sensor (Woodward)',
		desc: 'Genuine Woodward variable reluctance magnetic speed pickup (MPU) for precise shaft speed feedback to Woodward governors and digital turbine control systems. Passive, self-powered, zero-maintenance design for continuous duty on steam turbines running at 3000–3600 RPM.',
		usage:
			'Primary speed sensing input for Woodward 505/505D/505E digital governors, 2301 and 7206 governor amplifiers, and standalone overspeed trip systems on Triveni, BHEL, Siemens, KKK, and Maxwatt steam turbines. Monitors turbine rotor speed via the governor gear wheel (tooth gear / flywheel) to provide closed-loop speed regulation, load control, and overspeed protection throughout startup, synchronisation, and full-load operation.',
		features: [
			'Variable reluctance (passive) sensor — generates its own AC voltage signal from gear tooth motion; no external power supply required',
			'Compatible with Woodward 505, 505D, 505E, 2301, 7206, and MicroNet governor systems — drop-in replacement for OEM speed sensors',
			'Stainless steel housing — resists turbine lube oil, steam condensate, high ambient temperatures up to +100 deg C, and mechanical vibration',
			'Air gap setting: 0.25–1.02 mm (0.010–0.040 inch) from gear tooth OD; output ≥ 1.5 V ac rms at minimum governing speed',
			'Thread options: 5/8–18 UNF (standard short/long), 3/4–20 UNF (heavy duty), and M18×1.5 metric models for Indian OEM turbine housings',
			'DC coil resistance: 114–250 Ω depending on model (short standard 220 Ω max; long standard / metric 250 Ω max)',
			'CSA/ATEX explosion-proof models available — rated Ex d IIC T5, Class I Div 1 Group A-D for hazardous area installations',
			'SIL 3 certified versions available for safety-instrumented overspeed shutdown loops per IEC 61511',
			'Compatible gear tooth pitch: diametral pitch 8–20 (gear module 1.27–3.2); suitable for governor gear wheels on all common Indian steam turbine designs',
			'Mating connector: MS3106A-10SL-4S (standard models); flying leads with 1/2-inch NPT conduit entry on explosion-proof models',
		],
		specs: {
			'Sensor Type': 'Variable Reluctance (Passive Magnetic Pickup)',
			'OEM Compatibility':
				'Woodward 505 / 505D / 505E / 2301 / 7206 / MicroNet governors',
			'Turbine Compatibility':
				'Triveni, BHEL, Siemens, KKK, Maxwatt, Man Turbo, Belliss & Morcom',
			'Output Signal':
				'AC voltage — amplitude proportional to shaft speed (≥ 1.5 V ac rms at min speed)',
			'Air Gap (Installation)':
				'0.25–1.02 mm (0.010–0.040 inch) radial to gear OD',
			'Gear Tooth Pitch': 'Diametral pitch 8–20 / Gear module 1.27–3.2',
			'Ambient Temperature':
				'-40 deg C to +100 deg C (standard); up to +120 deg C conduit seal compound',
			'Coil Resistance': '114–250 Ω DC (model-dependent; short std 220 Ω max)',
			'Operating Pressure (tip)': '3 bar max (CSA/ATEX); 10 bar at NPT fitting',
			'Thread Standard': '5/8-18 UNF / 3/4-20 UNF / M18×1.5 metric',
			'Housing Material': 'Stainless steel',
			'Hazardous Area Rating':
				'Ex d IIC T5 / ATEX EN60079-0 & -1 / CSA Class I Div 1 Grp A-D (ATEX models)',
			'SIL Rating': 'SIL 3 (certified .SIL variants per IEC 61511)',
			Maintenance:
				'Zero — no periodic maintenance required; not field-repairable',
			'Reference Manual': 'Woodward Manual 82510 Rev V (Aug 2022)',
		},
		images: [
			'woodward-magnetic-pickup-1.webp',
			'woodward-magnetic-pickup-2.webp',
			'woodward-magnetic-pickup-3.webp',
			'woodward-magnetic-pickup-4.webp',
			'woodward-magnetic-pickup-5.webp',
			'woodward-magnetic-pickup-6.webp',
			'woodward-magnetic-pickup-7.webp',
			'woodward-magnetic-pickup-8.webp',
			'woodward-magnetic-pickup-9.webp',
			'woodward-magnetic-pickup-10.webp',
			'woodward-magnetic-pickup-11.webp',
			'woodward-magnetic-pickup-12.webp',
		],
	},
	// ── NEW PRODUCTS ADDED MAY 2026 ──
	{
		id: 'prod_f12',
		category: 'Industrial Filtration',
		title: 'Siemens Turbine Control Oil Filters',
		desc: 'OEM-compatible control oil filter elements for Siemens industrial steam turbine hydraulic governing systems. Microglass deep-bed media with IS27 anti-static specification protects sensitive electrohydraulic servo valves.',
		usage:
			'Control oil filtration in Siemens turbine hydraulic governing circuits protecting servo valves, actuators, and pilot valves from particle contamination.',
		features: [
			'Siemens turbine control oil system compatible — duplex filter housings',
			'Microglass deep-bed media with IS27 anti-static treatment',
			'Flow rating: 350–850 LPM depending on turbine model',
			'Filtration fineness: 3, 6, 10, 16, 25 µm (beta ratings per ISO 16889)',
			'Anti-static IS27 spec prevents electrostatic discharge in synthetic control oils below 300 pS/m',
			'Max operating pressure: up to 63 bar (duplex housing)',
			'Sealing: Nitrile (standard) or Viton for high-temperature synthetic oils',
			'ASME / PED / CE compliant housing options',
			'Dimensional compatible with Eaton / Parker / HYDAC standard elements',
			'HSN Code: 8421',
		],
		specs: {
			'Flow Capacity': '350–850 LPM (model dependent)',
			'Filtration Fineness': '3–25 µm (microglass deep bed)',
			'Anti-Static Rating': 'IS27 — for oils below 300 pS/m',
			'Max Pressure': 'Up to 63 bar (duplex configuration)',
			'Seal Material': 'Nitrile or Viton',
			Standards: 'ISO 16889, PED 2014/68/EC, ASME Sec VIII',
			'OEM Compatibility': 'Siemens industrial steam turbines — all models',
			'HSN Code': '8421',
		},
		images: [
			'siemens-control-oil-filter-1.webp',
			'siemens-control-oil-filter-2.webp',
			'siemens-control-oil-filter-3.webp',
			'siemens-control-oil-filter-4.webp',
			'siemens-control-oil-filter-5.webp',
			'siemens-control-oil-filter-6.webp',
			'siemens-control-oil-filter-7.webp',
			'siemens-control-oil-filter-8.webp',
			'siemens-control-oil-filter-9.webp',
			'siemens-control-oil-filter-10.webp',
			'siemens-control-oil-filter-11.webp',
			'siemens-control-oil-filter-12.webp',
		],
	},
	{
		id: 'prod_f13',
		category: 'Industrial Filtration',
		title: 'Triveni Turbine Control Oil Filters',
		desc: 'OEM-matched control oil filter elements for Triveni steam turbine electrohydraulic governing systems. Designed to maintain ISO 4406 cleanliness class 16/14/11 protecting high-sensitivity servo valves.',
		usage:
			'Control oil filtration in Triveni turbine governing systems — particularly critical during commissioning and post-overhaul startup to protect servo valves from particle-induced failure.',
		features: [
			'Triveni turbine governing system compatible — drop-in element replacement',
			'Filtration fineness: 6, 10, 16, 25 µm (ISO 16889 beta ratings)',
			'Glass fiber fleece (VG) or Microglass media options',
			'Targets system cleanliness: ISO 4406 Class 16/14/11',
			'High collapse resistance per ISO 2941; high burst integrity',
			'IS27 anti-static specification where synthetic oils are used',
			'Sealing: Nitrile (P) or Viton (V) end caps',
			'Compatible with mineral and synthetic turbine control oils',
			'Exact OEM dimensional replacement — no housing modification required',
			'HSN Code: 8421',
		],
		specs: {
			'Flow Capacity': '120–350 LPM (turbine model dependent)',
			'Filtration Grade': '6–25 µm glass fiber fleece (ISO 16889)',
			'Target Cleanliness': 'ISO 4406 Class 16/14/11',
			'Seal Options': 'Nitrile / Viton end caps',
			'Collapse Rating': 'Per ISO 2941 (high)',
			'OEM Compatibility': 'Triveni steam turbines — all models',
			'Oil Compatibility': 'Mineral & synthetic turbine control oils',
			'HSN Code': '8421',
		},
		images: [
			'triveni-control-oil-filter-1.webp',
			'triveni-control-oil-filter-2.webp',
			'triveni-control-oil-filter-3.webp',
			'triveni-control-oil-filter-4.webp',
			'triveni-control-oil-filter-5.webp',
			'triveni-control-oil-filter-6.webp',
			'triveni-control-oil-filter-7.webp',
			'triveni-control-oil-filter-8.webp',
			'triveni-control-oil-filter-9.webp',
			'triveni-control-oil-filter-10.webp',
			'triveni-control-oil-filter-11.webp',
			'triveni-control-oil-filter-12.webp',
		],
	},
	{
		id: 'prod_ts12',
		category: 'Turbine Spares',
		title: 'High/Low Speed Couplings for Turbines',
		desc: 'Precision-manufactured high-speed and low-speed flexible couplings for turbine-gearbox and gearbox-driven equipment connections. Reverse-engineered to exact OEM dimensions with full dimensional and PMI verification.',
		usage:
			'Turbine to gearbox (high-speed) and gearbox to generator or mill (low-speed) shaft coupling applications in power generation and process industries.',
		features: [
			'Covers high-speed (turbine-to-gearbox) and low-speed (gearbox-to-load) coupling positions',
			'Types: Gear couplings, disc pack couplings, jaw/flexible element couplings',
			'Reverse-engineered to OEM dimensions using 3D scanning and CMM measurement',
			'PMI material verification: Alloy steel (40CrMo4, 42CrMo4) with heat treatment certificates',
			'Dynamic balancing of assembled coupling to ISO 1940 Grade G2.5',
			'High-speed coupling: Precision crowned gear teeth — allows up to 1.5 deg angular misalignment',
			'Low-speed coupling: Rubber or polyurethane flexible element for vibration damping',
			'Torque ratings from 500 Nm to 500 kNm available on request',
			'Interference-fit hub bores with keyway to DIN 6885 or OEM specification',
			'Full documentation: Material certificate, balancing report, dimensional inspection',
		],
		specs: {
			'Coupling Types': 'Gear, Disc Pack, Jaw / Flexible Element',
			'Speed Range':
				'High-speed (up to 12,000 RPM) / Low-speed (up to 1,500 RPM)',
			Material: '40CrMo4 / 42CrMo4 alloy steel — per OEM spec',
			'Torque Range': '500 Nm to 500 kNm (application specific)',
			'Balance Grade': 'ISO 1940 Grade G2.5',
			'Bore Type': 'Interference fit + keyway (DIN 6885 / OEM spec)',
			'Angular Misalignment': 'Up to 1.5 deg (gear coupling)',
			Documentation: 'Material cert + PMI + balancing report + dim inspection',
		},
		images: [
			'turbine-coupling-high-low-1.webp',
			'turbine-coupling-high-low-2.webp',
			'turbine-coupling-high-low-3.webp',
			'turbine-coupling-high-low-4.webp',
			'turbine-coupling-high-low-5.webp',
			'turbine-coupling-high-low-6.webp',
			'turbine-coupling-high-low-7.webp',
			'turbine-coupling-high-low-8.webp',
			'turbine-coupling-high-low-9.webp',
			'turbine-coupling-high-low-10.webp',
			'turbine-coupling-high-low-11.webp',
			'turbine-coupling-high-low-12.webp',
		],
	},
	{
		id: 'prod_ts13',
		category: 'Turbine Spares',
		title: 'Flexible Disc Pack (MetaFlex)',
		desc: 'High-performance flexible disc pack coupling elements for turbine-generator sets. Laminated stainless steel disc packs transmit high torque while accommodating angular, axial, and radial misalignment without lubrication.',
		usage:
			'Turbine-generator flexible coupling intermediate element; used where maintenance-free, zero-backlash torque transmission is required between turbine output shaft and alternator.',
		features: [
			'Laminated stainless steel disc construction — no lubrication required',
			'Zero backlash — suitable for precision speed control and torsional sensitive drives',
			'Accommodates angular misalignment up to 1 deg, axial ±2 mm, radial 0.1 mm',
			'Torque capacity: 200 Nm to 200 kNm (disc pack size dependent)',
			'Material: SS 301 or SS 17-7PH spring-hardened stainless steel discs',
			'Fatigue-rated for 10^7 cycles — suitable for continuous turbine operation',
			'Temperature rated: -40 deg C to +200 deg C without performance degradation',
			'Replaces OEM MetaFlex, Bibby, Lovejoy, Rexnord disc pack designs',
			'Bolt pattern and disc OD matched to OEM coupling hub dimensions',
			'Inspection report and material traceability certificate supplied',
		],
		specs: {
			Type: 'Laminated stainless steel flexible disc pack',
			'Disc Material': 'SS 301 / SS 17-7PH spring hardened',
			'Torque Range': '200 Nm – 200 kNm (size dependent)',
			'Angular Misalignment': 'Up to 1 deg',
			'Axial Displacement': '±2 mm',
			'Fatigue Life': '10^7 cycles (continuous turbine duty)',
			'Operating Temperature': '-40 deg C to +200 deg C',
			'OEM Equivalents': 'MetaFlex, Bibby, Lovejoy, Rexnord disc pack designs',
			Lubrication: 'None required — maintenance-free',
		},
		images: [
			'metaflex-disc-pack-1.webp',
			'metaflex-disc-pack-2.webp',
			'metaflex-disc-pack-3.webp',
			'metaflex-disc-pack-4.webp',
			'metaflex-disc-pack-5.webp',
			'metaflex-disc-pack-6.webp',
			'metaflex-disc-pack-7.webp',
			'metaflex-disc-pack-8.webp',
			'metaflex-disc-pack-9.webp',
			'metaflex-disc-pack-10.webp',
			'metaflex-disc-pack-11.webp',
			'metaflex-disc-pack-12.webp',
		],
	},
	{
		id: 'prod_ts14',
		category: 'Turbine Spares',
		title: 'Boiler Sight Glass — Round / Reflex',
		desc: 'Industrial boiler sight glasses in round and reflex pattern for visual water level indication in steam boilers, pressure vessels, and condensate systems. Rated for high-pressure, high-temperature steam service.',
		usage:
			'Steam boiler water level gauges, pressure vessel liquid level indication, condensate drum observation, and deaerator level monitoring.',
		features: [
			'Round sight glass: 360 deg viewing, ideal for pressure vessel and tank applications',
			'Reflex sight glass: Utilizes prism optics — steam appears dark, water appears bright for clear level reading',
			'Borosilicate glass (Type I) — rated for continuous high-temperature and thermal shock service',
			'Pressure rating: Up to 64 bar (PN64) depending on size and design',
			'Temperature rating: Up to 400 deg C (steam service)',
			'Body materials: Carbon steel, SS 304, SS 316 per process conditions',
			'Connections: Flanged (ANSI / DIN) or screwed BSP / NPT',
			'Mica shields available for chemical protection of glass in corrosive condensates',
			'Full face or raised face gasket options per ASME B16.5 / DIN 2543',
			'Safety shield available for personnel protection in high-pressure service',
		],
		specs: {
			'Glass Type': 'Borosilicate (Type I) — thermal shock resistant',
			Style: 'Round (360 deg) / Reflex (prism optic)',
			'Pressure Rating': 'Up to PN64 (64 bar)',
			'Temperature Rating': 'Up to 400 deg C (steam)',
			'Body Material': 'CS / SS 304 / SS 316',
			'Connection Types': 'Flanged ANSI/DIN / Screwed BSP-NPT',
			'Mica Shield': 'Available for corrosive condensate protection',
			Applications: 'Steam boilers, pressure vessels, condensate drums',
		},
		images: [
			'boiler-sight-glass-1.webp',
			'boiler-sight-glass-2.webp',
			'boiler-sight-glass-3.webp',
			'boiler-sight-glass-4.webp',
			'boiler-sight-glass-5.webp',
			'boiler-sight-glass-6.webp',
			'boiler-sight-glass-7.webp',
			'boiler-sight-glass-8.webp',
			'boiler-sight-glass-9.webp',
			'boiler-sight-glass-10.webp',
			'boiler-sight-glass-11.webp',
			'boiler-sight-glass-12.webp',
		],
	},
	{
		id: 'prod_ee3',
		category: 'Electronic Equipments',
		title: 'ASCO 8210 Series Explosion-Proof Solenoid Valve',
		desc: 'ASCO 8210 series general purpose explosion-proof solenoid valves for turbine trip, lube oil, steam seal, and process control applications. ATEX/IECEx and NEMA 7/9 rated for hazardous area installation.',
		usage:
			'Turbine emergency trip oil drain, steam admission/trip solenoids, lube oil system control, process media isolation, and safety instrumented system (SIS) actuating valves in Zone 1/Zone 2 hazardous areas.',
		features: [
			'ASCO 8210 series — two-way normally closed or normally open configurations',
			'Explosion-proof: ATEX Ex d IIC T4/T5, IECEx certified; NEMA 7 & 9 rated',
			'Coil ratings: 24V DC, 110V AC, 220V AC (50/60 Hz) — specify at order',
			'Orifice sizes: 1/4 to 2 inch (DN6 to DN50) per pilot or direct-acting design',
			'Body materials: Brass, SS 316, or NBR/Viton seals per process media',
			'Ambient temperature: -20 to +50 deg C standard; -40 deg C low-temp option',
			'Response time: 10–60 ms (direct acting) for fast turbine trip applications',
			'IP65 / IP66 minimum enclosure protection',
			'SIL 2 certified versions available for SIS loop integrity',
			'Suitable for steam, air, water, oil, gas, and chemical service per seal material',
		],
		specs: {
			Series: 'ASCO 8210 General Purpose Solenoid',
			Configuration: '2-way NC or NO; pilot or direct acting',
			Voltage: '24V DC / 110V AC / 220V AC (50/60 Hz)',
			'Orifice Range': '1/4 to 2 inch (DN6 to DN50)',
			'Body Material': 'Brass / SS 316',
			'Seal Material': 'NBR / Viton (per process media)',
			'Explosion Proof': 'ATEX Ex d IIC T4/T5, IECEx, NEMA 7/9',
			'IP Rating': 'IP65 / IP66',
			'Ambient Temp': '-20 to +50 deg C (std); -40 deg C option',
			'SIL Rating': 'SIL 2 available',
			'Response Time': '10–60 ms (direct acting)',
		},
		images: [
			'asco-solenoid-valve-8210-1.webp',
			'asco-solenoid-valve-8210-2.webp',
			'asco-solenoid-valve-8210-3.webp',
			'asco-solenoid-valve-8210-4.webp',
			'asco-solenoid-valve-8210-5.webp',
			'asco-solenoid-valve-8210-6.webp',
			'asco-solenoid-valve-8210-7.webp',
			'asco-solenoid-valve-8210-8.webp',
			'asco-solenoid-valve-8210-9.webp',
			'asco-solenoid-valve-8210-10.webp',
			'asco-solenoid-valve-8210-11.webp',
			'asco-solenoid-valve-8210-12.webp',
		],
	},
	{
		id: 'prod_ts15',
		category: 'Turbine Spares',
		title: 'Spherical White Metal Bearing — TDPS Alternator',
		desc: 'Precision spherical (self-aligning) white metal journal bearings for TDPS alternators used with Triveni and other steam turbine-generator sets. Babbitt-lined with ultrasonic bond integrity verification.',
		usage:
			'Journal bearing support for alternator rotors in TDPS (Triveni-Driven Power Station) turbine-generator sets; accommodates shaft deflection and alignment tolerance in generator bearing housings.',
		features: [
			'Spherical outer surface allows self-alignment within housing — compensates for shaft sag and misalignment',
			'White metal (babbitt) lining: Tin-base alloy per BS3332 / ASTM B23 Grade 2',
			'Precision CNC machined to OEM diametral clearance specifications',
			'Ultrasonic bond test: 100% babbitt-to-shell bond integrity verification',
			'Shell material: Cast steel or LM2 aluminium alloy per OEM design',
			'Oil distribution grooves and pressure dam machined per OEM drawing',
			'Radial clearance: 0.10–0.25 mm (application dependent)',
			'Dimensional verification via CMM against OEM drawing',
			'Supplied with full inspection report and material certificate',
		],
		specs: {
			'Bearing Type': 'Spherical self-aligning white metal journal bearing',
			'Babbitt Alloy': 'Tin-base (BS3332 / ASTM B23 Grade 2)',
			'Shell Material': 'Cast steel / LM2 aluminium alloy',
			'Bond Test': 'Ultrasonic 100% bond integrity verification',
			'Radial Clearance': '0.10–0.25 mm (OEM specification)',
			Machining: 'Precision CNC to OEM tolerance + CMM verification',
			Application: 'TDPS alternator generator bearing',
			Documentation: 'Full inspection report + material certificate',
		},
		images: [
			'tdps-alternator-bearing-1.webp',
			'tdps-alternator-bearing-2.webp',
			'tdps-alternator-bearing-3.webp',
			'tdps-alternator-bearing-4.webp',
			'tdps-alternator-bearing-5.webp',
			'tdps-alternator-bearing-6.webp',
			'tdps-alternator-bearing-7.webp',
			'tdps-alternator-bearing-8.webp',
			'tdps-alternator-bearing-9.webp',
			'tdps-alternator-bearing-10.webp',
			'tdps-alternator-bearing-11.webp',
			'tdps-alternator-bearing-12.webp',
		],
	},
	{
		id: 'prod_ee4',
		category: 'Electronic Equipments',
		title: 'Beacon Industrial Analog Tachometer Gauge',
		desc: 'Robust industrial analog panel tachometer for direct shaft speed indication in turbine control panels. Robust movement with IP54 sealed case for steam turbine house environments.',
		usage:
			'Local turbine speed indication on turbine control panels, operator consoles, and local instrument enclosures in sugar mills, power plants, and paper mills.',
		features: [
			"Analog moving-iron or D'Arsonval movement for turbine speed display",
			'Input from magnetic pickup (MPU) or proximity sensor — 4-20 mA or pulse input options',
			'Scale ranges: 0-1500, 0-3000, 0-3600, 0-5000, 0-6000 RPM (specify)',
			'Dial size: 96x96 mm or 144x144 mm panel-mount square bezel',
			'Accuracy: ±1% full scale deflection',
			'IP54 front bezel protection — suitable for turbine house environments',
			'Alarm contacts: Optional 1 or 2 set-point SPDT relay outputs for overspeed alarm',
			'Operating temperature: 0 to +55 deg C',
			'Panel cutout: 92x92 mm (96mm case) or 138x138 mm (144mm case)',
			'Compatible makes: Beacon, Yokins, Elmeasure, Automatic Systems',
		],
		specs: {
			Type: 'Industrial analog panel tachometer',
			'Input Signal': 'MPU pulse / 4-20 mA (selectable)',
			'Scale Range': '0–3000 / 0–6000 RPM (custom available)',
			'Dial Size': '96x96 mm or 144x144 mm',
			Accuracy: '±1% FSD',
			'IP Rating': 'IP54 (front)',
			'Alarm Output': 'Optional 1–2 SPDT relay contacts',
			'Operating Temp': '0 to +55 deg C',
			'Compatible Brands': 'Beacon, Yokins, Elmeasure, Automatic Systems',
		},
		images: [
			'beacon-tachometer-gauge-1.webp',
			'beacon-tachometer-gauge-2.webp',
			'beacon-tachometer-gauge-3.webp',
			'beacon-tachometer-gauge-4.webp',
			'beacon-tachometer-gauge-5.webp',
			'beacon-tachometer-gauge-6.webp',
			'beacon-tachometer-gauge-7.webp',
			'beacon-tachometer-gauge-8.webp',
			'beacon-tachometer-gauge-9.webp',
			'beacon-tachometer-gauge-10.webp',
			'beacon-tachometer-gauge-11.webp',
			'beacon-tachometer-gauge-12.webp',
		],
	},
	{
		id: 'prod_ts16',
		category: 'Turbine Spares',
		title: 'Leaf Springs for Turbine Governors',
		desc: 'Precision-manufactured flat leaf springs for turbine mechanical centrifugal governors, trip mechanisms, and valve actuating linkages. Manufactured from spring steel to exact OEM temper, thickness, and width specifications.',
		usage:
			'Speeder spring assemblies in mechanical centrifugal governors, governor fly-weight return springs, trip reset mechanisms, and valve-closing spring packs on Triveni, BHEL, Belliss, and Maxwatt steam turbines.',
		features: [
			'Material: EN45A / 55SiCr7 spring steel — hardened and tempered to HRC 44–48',
			'Manufactured to exact OEM thickness (±0.01 mm) and width (±0.1 mm) dimensions',
			'Custom profile: straight, tapered, and multi-leaf pack configurations available',
			'Shot peened surface for improved fatigue resistance and longer service life',
			'Spring rate (stiffness) verified against OEM specification or measured from original',
			'Operating temperature: -20 to +120 deg C (spring steel grade)',
			'Surface treatment: Cadmium plate, phosphate, or oil-quench per OEM',
			'Batch material certification: EN 10204 Type 3.1 mill certificate',
			'Used in: Speeder spring packs, trip spring assemblies, valve return springs',
			'Dimensional inspection report provided with each order',
		],
		specs: {
			Material: 'EN45A / 55SiCr7 spring steel — H&T HRC 44–48',
			'Thickness Tolerance': '±0.01 mm to OEM specification',
			'Profile Options': 'Straight, tapered, multi-leaf pack',
			'Surface Treatment': 'Shot peened + cadmium / phosphate / oil coat',
			'Operating Temperature': '-20 to +120 deg C',
			'Material Certificate': 'EN 10204 Type 3.1 mill certificate',
			Applications:
				'Governor speeder springs, trip springs, valve return springs',
			'OEM Compatibility': 'Triveni, BHEL, Belliss, Maxwatt, Siemens turbines',
		},
		images: [
			'turbine-leaf-springs-1.webp',
			'turbine-leaf-springs-2.webp',
			'turbine-leaf-springs-3.webp',
			'turbine-leaf-springs-4.webp',
			'turbine-leaf-springs-5.webp',
			'turbine-leaf-springs-6.webp',
			'turbine-leaf-springs-7.webp',
			'turbine-leaf-springs-8.webp',
			'turbine-leaf-springs-9.webp',
			'turbine-leaf-springs-10.webp',
			'turbine-leaf-springs-11.webp',
			'turbine-leaf-springs-12.webp',
		],
	},
	{
		id: 'prod_ts17',
		category: 'Turbine Spares',
		title: 'Rotor Journal Polishing Service',
		desc: 'In-situ or workshop precision journal polishing service for turbine and alternator rotors. Restores bearing surface finish to Ra 0.4 µm or better without removal of the rotor from the machine — minimizing outage duration.',
		usage:
			'Restoration of turbine rotor journal surfaces after bearing failure, contaminated oil damage, or corrosion; alternator rotor slip ring and journal polishing during planned maintenance.',
		features: [
			'In-situ polishing using purpose-built on-site grinding and polishing equipment',
			'Achieves surface finish Ra ≤ 0.4 µm (N5) — OEM bearing seating specification',
			'Minimum material removal technique: 0.005–0.025 mm per pass for undersizing control',
			'Roundness and taper check via dial gauge before and after polishing',
			'Vibration measurement pre/post polishing to verify improvement',
			'Can be performed with rotor in-situ (without full disassembly) in most turbine configurations',
			'Workshop journal grinding on lathes available for more severe damage cases',
			'Polishing report: before/after surface finish (Ra), roundness, and taper measurements',
			'Compatible with all turbine makes: Triveni, BHEL, Siemens, KKK, Man Turbo, Belliss',
			'Emergency breakdown polishing service available 24x7',
		],
		specs: {
			Process: 'In-situ or workshop journal grinding and polishing',
			'Surface Finish Achieved': 'Ra ≤ 0.4 µm (N5) — OEM specification',
			'Material Removal': '0.005–0.025 mm per pass (minimum undersizing)',
			Measurement: 'Roundness + taper + Ra before/after verification',
			Availability: '24x7 emergency breakdown response',
			'OEM Compatibility':
				'All turbine makes — Triveni, BHEL, Siemens, KKK, Man Turbo, Belliss',
			Documentation: 'Full polishing report with before/after measurements',
		},
		images: [
			'rotor-journal-polishing-1.webp',
			'rotor-journal-polishing-2.webp',
			'rotor-journal-polishing-3.webp',
			'rotor-journal-polishing-4.webp',
			'rotor-journal-polishing-5.webp',
			'rotor-journal-polishing-6.webp',
			'rotor-journal-polishing-7.webp',
			'rotor-journal-polishing-8.webp',
			'rotor-journal-polishing-9.webp',
			'rotor-journal-polishing-10.webp',
			'rotor-journal-polishing-11.webp',
			'rotor-journal-polishing-12.webp',
		],
	},
	{
		id: 'prod_ee5',
		category: 'Electronic Equipments',
		title: 'RTD & Sensors for Power Plants & Steam Turbines',
		desc: 'Complete range of Resistance Temperature Detectors (RTDs), thermocouples, and process sensors for turbine bearing temperature, lube oil temperature, steam temperature, and exhaust gas monitoring.',
		usage:
			'Bearing metal temperature (babbitt), lube oil inlet/outlet temperature, steam chest temperature, exhaust temperature, and cooling water temperature monitoring in steam turbines and power plant auxiliaries.',
		features: [
			'PT100 RTD (3-wire or 4-wire) — IEC 60751 Class A and Class B accuracy',
			'Thermocouples: Type K, J, T, E per IEC 60584 — for high-temperature steam and exhaust',
			'Bearing RTDs: Embedded babbitt type — direct white metal temperature measurement',
			'Simplex and duplex element configurations for SIS redundancy requirements',
			'Thermowell designs: Tapered, straight, flanged per ASME B16.20 / IEC 61010',
			'Connection heads: IP65 die-cast aluminium or SS — with HART or MODBUS transmitters',
			'Temperature range: -50 to +600 deg C (RTD); up to +1200 deg C (thermocouple)',
			'ATEX Ex d / Ex ia rated versions for hazardous area steam turbine house',
			'Response time: 5–30 seconds (insertion probe); 1–5 seconds (surface mount)',
			'Compatible DCS/PLC: Yokogawa, ABB, Siemens, Honeywell, Emerson systems',
		],
		specs: {
			'RTD Type': 'PT100 — IEC 60751 Class A / Class B (3-wire/4-wire)',
			'Thermocouple Types': 'K, J, T, E (IEC 60584)',
			'Temperature Range': 'RTD: -50 to +600 deg C; TC: up to +1200 deg C',
			'Accuracy (PT100)': 'Class A: ±(0.15 + 0.002|T|) deg C',
			'Element Config': 'Simplex / Duplex (for SIS redundancy)',
			'Connection Head': 'IP65 die-cast Al / SS with optional HART transmitter',
			'ATEX Rating': 'Ex d / Ex ia (hazardous area versions)',
			'DCS Compatibility': 'Yokogawa, ABB, Siemens, Honeywell, Emerson',
		},
		images: [
			'rtd-sensors-turbine-1.webp',
			'rtd-sensors-turbine-2.webp',
			'rtd-sensors-turbine-3.webp',
			'rtd-sensors-turbine-4.webp',
			'rtd-sensors-turbine-5.webp',
			'rtd-sensors-turbine-6.webp',
			'rtd-sensors-turbine-7.webp',
			'rtd-sensors-turbine-8.webp',
			'rtd-sensors-turbine-9.webp',
			'rtd-sensors-turbine-10.webp',
			'rtd-sensors-turbine-11.webp',
			'rtd-sensors-turbine-12.webp',
		],
	},
	{
		id: 'prod_ee6',
		category: 'Electronic Equipments',
		title: 'SEMIKRON SKN240/16 Rectifier Diode',
		desc: 'SEMIKRON SKN240/16 stud-mount power rectifier diode for alternator AVR excitation circuits and turbine-generator rectifier bridges. 240 A average forward current, 1600 V peak reverse voltage.',
		usage:
			'Rotating diode bridge rectifiers in brushless alternators, static AVR excitation panels, turbine-driven generator control circuits, and industrial power rectification in sugar mill and power plant alternators.',
		features: [
			'Average forward current IFAV: 240 A (standard recovery stud diode)',
			'Repetitive peak reverse voltage VRRM: 1600 V',
			'Peak non-repetitive surge current IFSM: 6000 A (10 ms half-sine)',
			'Forward voltage VF: 1.4 V at rated current',
			'ISO M16 threaded stud mount — anode to stud (SKN designation)',
			'Hermetic metal case with glass insulator — vibration and humidity resistant',
			'Max junction temperature Tj: 180 deg C; case temperature Tc: 130 deg C',
			'Suitable for cooling via air or water-cooled heatsinks',
			'Direct replacement for legacy Westcode, International Rectifier stud diodes',
			'Supplied singly or in matched sets for 3-phase bridge configurations',
		],
		specs: {
			'Part Number': 'SEMIKRON SKN240/16',
			'Average Forward Current (IFAV)': '240 A',
			'Peak Reverse Voltage (VRRM)': '1600 V',
			'Surge Current (IFSM)': '6000 A (10 ms)',
			'Forward Voltage (VF)': '1.4 V at rated If',
			'Mount Type': 'ISO M16 threaded stud — anode to stud',
			'Max Junction Temp (Tj)': '180 deg C',
			'Max Case Temp (Tc)': '130 deg C',
			'Case Style': 'Hermetic metal / glass insulator',
			Application: 'Alternator AVR excitation, generator rectifier bridges',
		},
		images: [
			'semikron-skn240-16-1.webp',
			'semikron-skn240-16-2.webp',
			'semikron-skn240-16-3.webp',
			'semikron-skn240-16-4.webp',
			'semikron-skn240-16-5.webp',
			'semikron-skn240-16-6.webp',
			'semikron-skn240-16-7.webp',
			'semikron-skn240-16-8.webp',
			'semikron-skn240-16-9.webp',
			'semikron-skn240-16-10.webp',
			'semikron-skn240-16-11.webp',
			'semikron-skn240-16-12.webp',
		],
	},
	{
		id: 'prod_ts18',
		category: 'Turbine Spares',
		title: 'Fulcrum Pins — Blade Locking / Trip Mechanism Linkage',
		desc: 'Precision hardened fulcrum pins for turbine trip mechanism linkages, blade locking assemblies, and governor valve pivot points. Manufactured from alloy steel with hard chrome or nitride surface treatment for maximum wear resistance.',
		usage:
			'Trip latch fulcrum pivots, governor valve linkage pivot pins, blade locking pin mechanisms, and all rotating/oscillating pin joints in steam turbine trip and governing systems.',
		features: [
			'Hardened alloy steel: EN24 / EN36 / 17-4PH stainless per application',
			'Case hardened: 58–62 HRC surface, tough core for impact resistance',
			'Hard chrome plating (25–50 µm) or ion nitriding for wear and corrosion resistance',
			'Dimensional tolerance: h6/h7 shaft fit for precision pin joints',
			'Surface finish: Ra ≤ 0.4 µm (ground and polished bearing surface)',
			'Custom profiles: straight, stepped, grooved, and flanged fulcrum pin designs',
			'Reverse-engineered from OEM sample using CMM dimensional measurement',
			'PMI material verification before hardening and surface treatment',
			'Fatigue rated for high-cycle oscillating duty in governor mechanisms',
			'Supplied individually or as matched sets with retaining clips per OEM design',
		],
		specs: {
			Material: 'EN24 / EN36 / 17-4PH SS — per OEM specification',
			'Surface Hardness': '58–62 HRC (case hardened)',
			'Surface Treatment': 'Hard chrome 25–50 µm or ion nitriding',
			'Dimensional Tolerance': 'h6/h7 shaft fit',
			'Surface Finish': 'Ra ≤ 0.4 µm (ground + polished)',
			'Profile Options': 'Straight, stepped, grooved, flanged',
			'Material Verification': 'PMI test before heat treatment',
			Applications:
				'Trip latch pivots, governor linkages, blade locking mechanisms',
		},
		images: [
			'turbine-fulcrum-pins-1.webp',
			'turbine-fulcrum-pins-2.webp',
			'turbine-fulcrum-pins-3.webp',
			'turbine-fulcrum-pins-4.webp',
			'turbine-fulcrum-pins-5.webp',
			'turbine-fulcrum-pins-6.webp',
			'turbine-fulcrum-pins-7.webp',
			'turbine-fulcrum-pins-8.webp',
			'turbine-fulcrum-pins-9.webp',
			'turbine-fulcrum-pins-10.webp',
			'turbine-fulcrum-pins-11.webp',
			'turbine-fulcrum-pins-12.webp',
		],
	},
	{
		id: 'prod_ts19',
		category: 'Turbine Spares',
		title: 'Spiral Conveyor Screw (Turbine Auxilaries)',
		desc: 'Precision fabricated spiral screw conveyors for turbine auxiliary and power plant material handling systems. Custom-manufactured to OEM pitch, diameter, and helix angle specifications in carbon steel, SS, or wear-resistant alloy.',
		usage:
			'Ash conveying, biomass feeding, chemical dosing screws, boiler bed material handling, and turbine auxiliary system material conveyors in power plants and process industries.',
		features: [
			'Custom helical screw fabrication: diameter 100 mm to 600 mm, length up to 12 m per section',
			'Materials: MS (mild steel), SS 304/316, AISI 410 or Hardox for abrasive media',
			'Screw pitch: Standard (pitch = OD) or customized for flow rate requirements',
			'Shaft options: Solid, hollow, or sectional with bolted couplings for field assembly',
			'Blade thickness: 4–16 mm depending on abrasion and load requirements',
			'Hard-face weld overlays: Chromium carbide or tungsten carbide for abrasive ash/sand media',
			'Trough, inlet, and discharge assemblies fabricated to match OEM layout',
			'Surface treatment: Hot-dip galvanizing, epoxy paint, or SS cladding per media',
			'Dimensional tolerance per CEMA Standard or customer specification',
			'Static balance check on assembled screw before dispatch',
		],
		specs: {
			'Diameter Range': '100 mm to 600 mm',
			'Max Length per Section': 'Up to 12 m',
			Materials: 'MS / SS 304/316 / Hardox (abrasive service)',
			'Blade Thickness': '4–16 mm (load and abrasion dependent)',
			'Hard-face Option': 'Chromium carbide / tungsten carbide overlay',
			'Shaft Type': 'Solid / hollow / sectional bolted',
			Standard: 'CEMA Standard or per customer spec',
			Applications:
				'Ash conveying, biomass feed, boiler bed material, chemical dosing',
		},
		images: [
			'spiral-conveyor-screw-1.webp',
			'spiral-conveyor-screw-2.webp',
			'spiral-conveyor-screw-3.webp',
			'spiral-conveyor-screw-4.webp',
			'spiral-conveyor-screw-5.webp',
			'spiral-conveyor-screw-6.webp',
			'spiral-conveyor-screw-7.webp',
			'spiral-conveyor-screw-8.webp',
			'spiral-conveyor-screw-9.webp',
			'spiral-conveyor-screw-10.webp',
			'spiral-conveyor-screw-11.webp',
			'spiral-conveyor-screw-12.webp',
		],
	},
	{
		id: 'prod_ts20',
		category: 'Turbine Spares',
		title: 'Nylon Sleeve for Gear Coupling',
		desc: 'Precision injection-moulded and machined nylon (polyamide) sleeves for gear couplings used in turbine auxiliary and driven equipment connections. Replaces OEM nylon/polyurethane flexible elements.',
		usage:
			'Gear coupling nylon sleeve replacement in turbine-auxiliary drives, pump couplings, fan drives, and compressor coupling assemblies where flexible nylon element is the standard OEM design.',
		features: [
			'Material: Nylon 6 / Nylon 66 (PA6/PA66) or Polyurethane per application',
			'Precision machined internal gear profile — exact tooth count, module, and pressure angle to OEM',
			'Hardness: 90–100 Shore D (Nylon 66); 40–80 Shore A (PU flexible grade)',
			'Operating temperature: -20 to +100 deg C (PA66); -40 to +80 deg C (PU)',
			'High torsional flexibility — absorbs shock loads and angular misalignment',
			'Self-lubricating polyamide — no external lubrication required for normal service',
			'Replaces OEM sleeves for Fenner, Lovejoy, KTR, Bibby, and local make couplings',
			'Available in split (two-piece) or solid designs for easy installation without shaft removal',
			'Custom colours available for visual maintenance identification',
			'Dimensional inspection report against OEM or sample dimensions',
		],
		specs: {
			Material: 'PA6 / PA66 Nylon or Polyurethane (PU)',
			'Gear Profile':
				'Internal gear — exact OEM tooth count, module, pressure angle',
			Hardness: '90–100 Shore D (Nylon) / 40–80 Shore A (PU)',
			'Operating Temperature': '-20 to +100 deg C (PA66)',
			Design: 'Split (2-piece) or solid — OEM profile match',
			Lubrication: 'Self-lubricating (no grease required)',
			'OEM Equivalents': 'Fenner, Lovejoy, KTR, Bibby, local make sleeves',
			Application:
				'Turbine-auxiliary, pump, fan, compressor gear coupling drives',
		},
		images: [
			'nylon-coupling-sleeve-1.webp',
			'nylon-coupling-sleeve-2.webp',
			'nylon-coupling-sleeve-3.webp',
			'nylon-coupling-sleeve-4.webp',
			'nylon-coupling-sleeve-5.webp',
			'nylon-coupling-sleeve-6.webp',
			'nylon-coupling-sleeve-7.webp',
			'nylon-coupling-sleeve-8.webp',
			'nylon-coupling-sleeve-9.webp',
			'nylon-coupling-sleeve-10.webp',
			'nylon-coupling-sleeve-11.webp',
			'nylon-coupling-sleeve-12.webp',
		],
	},
	{
		id: 'prod_ts21',
		category: 'Turbine Spares',
		title: 'KTR BoWex Curved-Tooth Gear Coupling',
		desc: 'KTR BoWex® series curved-tooth gear couplings — maintenance-free, torsionally stiff flexible couplings for turbine and pump drives. Polyamide (nylon) sleeve with steel hub construction. Accommodates axial, radial, and angular misalignment via double-cardanic curved-tooth principle.',
		usage:
			'Turbine auxiliary drives, hydraulic pump couplings, fan drives, generator coupling, and general industrial power transmission applications where maintenance-free operation and misalignment compensation are required.',
		features: [
			'KTR BoWex® double-cardanic curved-tooth gear principle — no restoring forces from angular/radial displacement',
			'Polyamide (PA66) sleeve with crowned curved-tooth internal gear profile — maintenance-free (no lubrication)',
			'Zero periodic fluctuation of angular velocity — suitable for speed-sensitive applications',
			'Accommodates angular misalignment: up to 1.5 deg; radial: up to 0.35 mm; axial: ±1.5 mm',
			'Torque range: 8 Nm (BoWex junior 14) to 9,200 Nm (BoWex 160) — specify size',
			'Speed range: up to 12,000 RPM (size dependent)',
			'Hub material: Cast iron (EN-GJL-250) or steel (C45) per application',
			'Bore options: Cylindrical plain bore or taper bore to DIN 6885 Sheet 1',
			'Can be assembled in horizontal or vertical shaft orientation',
			'Drop-in replacement for KTR BoWex M, M-C, junior, and I series couplings',
		],
		specs: {
			Brand: 'KTR Systems — BoWex® Series',
			'Coupling Principle': 'Double-cardanic curved-tooth gear',
			'Sleeve Material': 'Polyamide PA66 (self-lubricating)',
			'Hub Material': 'Cast iron EN-GJL-250 or C45 steel',
			'Torque Range': '8 Nm to 9,200 Nm (size dependent)',
			'Max Speed': 'Up to 12,000 RPM (size dependent)',
			'Angular Misalignment': 'Up to 1.5 deg',
			'Radial Displacement': 'Up to 0.35 mm',
			'Bore Type': 'Cylindrical or taper bore (DIN 6885 Sheet 1)',
			Lubrication: 'None — maintenance-free (PA66 sleeve)',
			Orientation: 'Horizontal or vertical assembly',
		},
		images: [
			'ktr-bowex-coupling-1.webp',
			'ktr-bowex-coupling-2.webp',
			'ktr-bowex-coupling-3.webp',
			'ktr-bowex-coupling-4.webp',
			'ktr-bowex-coupling-5.webp',
			'ktr-bowex-coupling-6.webp',
			'ktr-bowex-coupling-7.webp',
			'ktr-bowex-coupling-8.webp',
			'ktr-bowex-coupling-9.webp',
			'ktr-bowex-coupling-10.webp',
			'ktr-bowex-coupling-11.webp',
			'ktr-bowex-coupling-12.webp',
		],
	},
	{
		id: 'prod_f15',
		category: 'Industrial Filtration',
		title: 'Wedge Wire Filter Element',
		desc: 'Precision stainless steel wedge wire filter elements with V-shaped profile wire resistance-welded to longitudinal support rods. Non-clogging geometry and continuous slot design deliver higher flow capacity and lower pressure drop than mesh alternatives.',
		usage:
			'Liquid and gas filtration in water treatment, oil and gas processing, chemical plants, food and beverage, and industrial pipeline strainer housings where backwashable and reusable elements are required.',
		features: [
			'V-shaped profile wire — particles contact only two points, preventing wedging and enabling easy backwash cleaning',
			'Resistance-welded construction — profile wire welded to support rods at every contact point for exceptional rigidity',
			'Filtration slot size: 20 µm to 3000 µm (custom slot widths available on request)',
			'Materials: SS 304, SS 316, SS 316L; Duplex 2205/2507, Hastelloy, Titanium for aggressive media',
			'Max differential pressure: 300 psi (20.7 bar) — higher with external support cage design',
			'Temperature range: up to 260 deg C (synthetic seals); up to 815 deg C (metallic NPT connections)',
			'Flow direction: inside-to-outside or outside-to-inside per application requirement',
			'Continuous slot geometry maximises open area vs. perforated plate or wire mesh alternatives',
			'Cleanable and reusable — backwash, backflush, or air/gas blow cleaning compatible',
			'End connections: male/female thread, flanged, clamp, or plain weld-end per housing',
			'Diameter range: 19 mm to 2000 mm; length up to 6000 mm (custom per OEM housing)',
			'HSN Code: 8421',
		],
		specs: {
			Material:
				'SS 304 / SS 316 / SS 316L / Duplex 2205 / Hastelloy / Titanium',
			'Slot Size Range': '20 µm to 3000 µm (custom)',
			'Max Differential Pressure':
				'300 psi (20.7 bar); higher with support cage',
			'Temperature Range':
				'Up to 260 deg C (synthetic seals); up to 815 deg C (metallic connections)',
			'Flow Direction': 'Inside-to-outside or outside-to-inside',
			'Diameter Range': '19 mm to 2000 mm',
			Length: 'Up to 6000 mm (custom)',
			Cleaning: 'Backwash / backflush / air blow — reusable',
			'End Connections': 'Threaded / Flanged / Clamp / Weld-end',
			Applications:
				'Water treatment, oil & gas, chemical, food & beverage, pipeline strainers',
			'HSN Code': '8421',
		},
		images: [
			'wedge-wire-filter-1.webp',
			'wedge-wire-filter-2.webp',
			'wedge-wire-filter-3.webp',
			'wedge-wire-filter-4.webp',
			'wedge-wire-filter-5.webp',
			'wedge-wire-filter-6.webp',
			'wedge-wire-filter-7.webp',
			'wedge-wire-filter-8.webp',
			'wedge-wire-filter-9.webp',
			'wedge-wire-filter-10.webp',
			'wedge-wire-filter-11.webp',
			'wedge-wire-filter-12.webp',
		],
	},

	{
		id: 'prod_f16',
		category: 'Industrial Filtration',
		title: 'Concrete Pump Filter Element',
		desc: 'Heavy-duty hydraulic filter elements for concrete pump hydraulic systems. Designed to withstand high collapse pressure in construction equipment hydraulics and maintain ISO 4406 system cleanliness protecting sensitive proportional valves and variable displacement pumps.',
		usage:
			'Suction, pressure, and return line filtration in concrete pump hydraulic circuits on Schwing, Putzmeister, Sany, CIFA, and Zoomlion concrete pumps. Protects hydraulic pistons, control valves, and pump internals from particle-induced wear.',
		features: [
			'Compatible with major concrete pump brands: Schwing, Putzmeister, Sany, CIFA, Zoomlion — cross-reference supplied',
			'Suction filter elements: 50–100 µm coarse grade for pump inlet protection without cavitation',
			'Return and pressure line elements: 5–20 µm fine grade for servo valve and pump protection',
			'High collapse pressure rating: up to 210 bar (3045 psi) for high-pressure line applications',
			'Beta efficiency: β10(c) ≥ 200 per ISO 16889 (return/pressure line grades)',
			'Filter media options: glass fiber, cellulose, and stainless steel wire mesh per application position',
			'Bypass valve integration: compatible with housing bypass at 3.5–6 bar differential for cold-start protection',
			'Maintains ISO 4406 cleanliness class 16/14/11 in return-line duty',
			'Sealing: Nitrile (NBR) standard; Viton (FKM) for synthetic hydraulic fluid service',
			'Physical dimensions matched to OEM housing — no modification required',
			'HSN Code: 8421',
		],
		specs: {
			'Compatible Makes':
				'Schwing, Putzmeister, Sany, CIFA, Zoomlion concrete pumps',
			'Suction Line Micron': '50–100 µm (coarse, pump inlet)',
			'Return/Pressure Line Micron': '5–20 µm (fine, valve/pump protection)',
			'Max Collapse Pressure': 'Up to 210 bar (3045 psi)',
			'Beta Rating': 'β10(c) ≥ 200 per ISO 16889',
			'Filter Media': 'Glass fiber / Cellulose / SS wire mesh (per position)',
			'Bypass Valve': '3.5–6 bar cracking pressure (cold-start protection)',
			'Target Cleanliness': 'ISO 4406 Class 16/14/11',
			'Seal Material': 'Nitrile (NBR) / Viton (FKM)',
			'HSN Code': '8421',
		},
		images: [
			'concrete-pump-filter-1.webp',
			'concrete-pump-filter-2.webp',
			'concrete-pump-filter-3.webp',
			'concrete-pump-filter-4.webp',
			'concrete-pump-filter-5.webp',
			'concrete-pump-filter-6.webp',
			'concrete-pump-filter-7.webp',
			'concrete-pump-filter-8.webp',
			'concrete-pump-filter-9.webp',
			'concrete-pump-filter-10.webp',
			'concrete-pump-filter-11.webp',
			'concrete-pump-filter-12.webp',
		],
	},

	{
		id: 'prod_f17',
		category: 'Industrial Filtration',
		title: 'Dust Collector Filter Cartridge',
		desc: 'Industrial dust collector filter cartridges in polyester, cellulose/polyester blend, spunbond polyester, and PTFE membrane media. High-efficiency MERV 10–16 rated cartridges for pulse-jet, shaker, and reverse-air baghouse and cartridge dust collectors.',
		usage:
			'Particulate capture in cement plant dust collectors, steel mill fume extraction, grain handling, chemical plant dust control, woodworking, metalworking, pharmaceutical manufacturing, and general industrial air filtration systems.',
		features: [
			'Media options: cellulose/polyester blend (80/20) for general duty; spunbond polyester for moisture and abrasion resistance',
			'PTFE membrane coating available for sub-micron dust, sticky particles, and high-humidity applications',
			'Flame retardant (FR) and antistatic/conductive media available for spark and explosive dust environments',
			'Efficiency: MERV 10–16; PTFE membrane grade achieves 99.9%+ at 0.5 µm particle size',
			'Standard operating temperature: up to 82 deg C (cellulose/polyester); specialty media to 200 deg C+',
			'End cap options: galvanised metal, stainless steel, or polyurethane — open/closed, bolt-hole, or flange',
			'Inner and outer expanded metal retainer for structural support under pulse-jet cleaning loads',
			'Compatible with all major dust collector brands: Donaldson Torit, Camfil, Farr, AAF, Nordic, and local makes',
			'Custom OD, ID, and length to match existing housing — cross-reference by OEM part number',
			'Gasket-sealed ends for airtight clean-air/dirty-air separation — no bypass leakage',
			'HSN Code: 8421',
		],
		specs: {
			'Media Types':
				'Cellulose/Polyester (80/20) / Spunbond Polyester / PTFE Membrane',
			'Efficiency Rating': 'MERV 10–16; 99.9%+ at 0.5 µm (PTFE grade)',
			'Operating Temperature':
				'Up to 82 deg C (standard); 200 deg C+ (specialty media)',
			'End Cap Material': 'Galvanised steel / Stainless steel / Polyurethane',
			Retainer: 'Inner/outer expanded metal (pulse-jet compatible)',
			'Cleaning System': 'Pulse-jet / shaker / reverse-air compatible',
			'Special Treatments':
				'Flame retardant (FR) / Antistatic / Conductive (ATEX)',
			'Compatible Brands':
				'Donaldson Torit, Camfil, Farr, AAF, Nordic, all major makes',
			'Custom Sizing': 'OD, ID, length per OEM housing specification',
			'HSN Code': '8421',
		},
		images: [
			'dust-collector-cartridge-1.webp',
			'dust-collector-cartridge-2.webp',
			'dust-collector-cartridge-3.webp',
			'dust-collector-cartridge-4.webp',
			'dust-collector-cartridge-5.webp',
			'dust-collector-cartridge-6.webp',
			'dust-collector-cartridge-7.webp',
			'dust-collector-cartridge-8.webp',
			'dust-collector-cartridge-9.webp',
			'dust-collector-cartridge-10.webp',
			'dust-collector-cartridge-11.webp',
			'dust-collector-cartridge-12.webp',
		],
	},

	{
		id: 'prod_f18',
		category: 'Industrial Filtration',
		title: 'Pleated Dust Collector Filter Cartridge (Flange-Type)',
		desc: 'Flange-mounted pleated filter cartridges for dust collectors requiring a secure, leak-proof tubesheet seal. High pleat count maximises filtration surface area in compact length. Flange design ensures airtight clean-air/dirty-air separation — eliminates bypass leakage common with snap-in cartridges.',
		usage:
			'Replacement filter cartridges for flange-type dust collector housings in cement, power, steel, pharmaceutical, food processing, and chemical industries. Compatible with Donaldson Torit, Camfil Farr, and other major OEM flange-mount collectors.',
		features: [
			'Flanged top end cap — bolted seal to tubesheet for zero-bypass filtration integrity',
			'High pleat count design: maximises filtration area per unit length vs. standard round cartridges',
			'Media: spunbond polyester (standard), cellulose/polyester blend, PTFE membrane per dust type',
			'Efficiency: MERV 14–16 standard; PTFE membrane grade achieves 99.99% at 0.3–0.5 µm',
			'Flange OD: 12.75 inch, 13.8 inch, 13.9 inch, or custom to OEM specification',
			'End cap: galvanised steel, SS 304, or polyurethane — closed bottom with gasket for housing seal',
			'Inner metal retainer (expanded steel or perforated) — resists pulse-jet cleaning collapse',
			'Operating temperature: up to 93 deg C standard; PTFE and PPS grades for higher temperatures',
			'Antistatic and flame-retardant media options for ATEX-classified dust environments',
			'Cross-reference by OEM part number — Donaldson, Camfil, Nordic, and local collector makes',
			'HSN Code: 8421',
		],
		specs: {
			'Mounting Style':
				'Flange-type — bolted to tubesheet for zero-bypass seal',
			'Standard Flange OD':
				'12.75 inch / 13.8 inch / 13.9 inch (custom available)',
			'Media Options':
				'Spunbond polyester / Cellulose-polyester blend / PTFE membrane',
			'Filtration Efficiency': 'MERV 14–16; 99.99% at 0.3 µm (PTFE membrane)',
			'Operating Temperature':
				'Up to 93 deg C (standard); higher with specialty media',
			'End Cap Material': 'Galvanised steel / SS 304 / Polyurethane',
			'Core/Retainer': 'Expanded steel inner retainer — pulse-jet rated',
			'Special Options': 'Antistatic / Flame retardant (ATEX)',
			'Compatible OEMs':
				'Donaldson Torit, Camfil Farr, Nordic Air, and all major makes',
			'HSN Code': '8421',
		},
		images: [
			'pleated-flange-cartridge-1.webp',
			'pleated-flange-cartridge-2.webp',
			'pleated-flange-cartridge-3.webp',
			'pleated-flange-cartridge-4.webp',
			'pleated-flange-cartridge-5.webp',
			'pleated-flange-cartridge-6.webp',
			'pleated-flange-cartridge-7.webp',
			'pleated-flange-cartridge-8.webp',
			'pleated-flange-cartridge-9.webp',
			'pleated-flange-cartridge-10.webp',
			'pleated-flange-cartridge-11.webp',
			'pleated-flange-cartridge-12.webp',
		],
	},

	{
		id: 'prod_st6',
		category: 'Industrial Strainers',
		title: 'Stainless Steel Notch Wire Strainer Element',
		desc: 'Single-layer notch wire strainer elements fabricated by winding precision-notched stainless steel wire around a rigid cylindrical support frame. The notched wire creates exact, non-distorting filtration slots — ideal for high-viscosity, high-temperature, and backwashable strainer applications.',
		usage:
			'Replacement strainer elements for Y-type, basket, and pot strainers in ship fuel oil systems (heavy oil C), turbine lube oil suction lines, hydraulic circuits, food processing lines, and industrial pipeline strainers where cleanable, semi-permanent elements are preferred.',
		features: [
			'Single-layer notched wire construction — slot size does not change or distort after cleaning',
			'Filtration accuracy: 10 µm to 250 µm (custom slot widths on request)',
			'Materials: SS 304, SS 304L, SS 316, SS 316L for corrosion resistance across wide pH range',
			'High structural strength — withstands significant differential pressure and abrasive flow conditions',
			'Cleanable by backwashing, backflushing, or compressed air/gas blow — semi-permanent element',
			'High open area vs. woven mesh — lower pressure drop at equivalent filtration rating',
			'Cylindrical or conical profiles to fit simplex, duplex, Y-type, and basket strainer housings',
			'Suitable for high-viscosity fluids: heavy fuel oil, gear oil, polymer solutions',
			'Visual cleanliness verification after cleaning — no hidden contamination retention',
			'Custom dimensions per OEM strainer housing drawing',
			'HSN Code: 8421',
		],
		specs: {
			Construction:
				'Single-layer notched wire wound on rigid cylindrical support',
			Material: 'SS 304 / SS 304L / SS 316 / SS 316L',
			'Slot Size Range': '10 µm to 250 µm (custom available)',
			Shape: 'Cylindrical or conical per strainer housing',
			'Cleaning Method': 'Backwash / backflush / compressed air blow',
			Reusability:
				'Semi-permanent (no replacement unless mechanically damaged)',
			Advantages: 'Non-distorting slot, high open area, low pressure drop',
			Applications:
				'Ship fuel, turbine lube oil, hydraulics, food processing, pipeline strainers',
			'Custom Sizing': 'Per OEM strainer housing drawing',
			'HSN Code': '8421',
		},
		images: [
			'notch-wire-strainer-1.webp',
			'notch-wire-strainer-2.webp',
			'notch-wire-strainer-3.webp',
			'notch-wire-strainer-4.webp',
			'notch-wire-strainer-5.webp',
			'notch-wire-strainer-6.webp',
			'notch-wire-strainer-7.webp',
			'notch-wire-strainer-8.webp',
			'notch-wire-strainer-9.webp',
			'notch-wire-strainer-10.webp',
			'notch-wire-strainer-11.webp',
			'notch-wire-strainer-12.webp',
		],
	},

	{
		id: 'prod_f19',
		category: 'Industrial Filtration',
		title: 'Oil Vapour Extractor Filter',
		desc: 'High-efficiency oil mist and vapour extractor filter elements using borosilicate glass fiber coalescing media. Captures oil aerosols from 0.1–0.3 µm at 99.97–99.98% efficiency — protecting downstream equipment and meeting clean-air environmental standards.',
		usage:
			'Downstream of oil-flooded rotary screw and reciprocating compressors, turbine crankcase vents, gearbox breathers, and large rotating machine lubrication systems where oil mist must be captured before discharge to atmosphere or clean process air.',
		features: [
			'Borosilicate glass fiber coalescing media captures oil aerosols from 0.1–0.3 µm particle size',
			'Filtration efficiency: 99.97–99.98% removal of submicron oil mist and vapour',
			'Residual oil carryover: 1–3 mg/m³ at rated flow — protects downstream equipment and environment',
			'Initial pressure drop: less than 0.5–1.0 psi (0.035–0.07 bar) — low energy impact on compressor',
			'Operating temperature: up to 105 deg C continuous; short-term to 120 deg C',
			'Operating pressure: up to 200 psi (13.8 bar) ASME-rated pressure vessel housings',
			'Service life: 2000–4000 hours (environment and oil quality dependent)',
			'Collapse pressure resistance: 5 bar (70 psi) minimum differential — structural integrity maintained',
			'Integral automatic or zero-air-loss condensate drain for separated oil removal',
			'Differential pressure gauge port for element condition monitoring and service interval indication',
			'Compatible with mineral, synthetic, and semi-synthetic compressor lubricants',
			'HSN Code: 8421',
		],
		specs: {
			'Filter Media': 'Borosilicate glass fiber coalescing',
			'Particle Capture Range': '0.1–0.3 µm oil aerosols',
			'Filtration Efficiency': '99.97–99.98% removal of oil mist',
			'Residual Oil Carryover': '1–3 mg/m³ at rated flow',
			'Initial Pressure Drop': '< 0.5–1.0 psi (0.035–0.07 bar)',
			'Max Operating Temperature':
				'Up to 105 deg C continuous; 120 deg C short-term',
			'Max Operating Pressure': 'Up to 200 psi (13.8 bar)',
			'Collapse Resistance': '5 bar (70 psi) minimum differential',
			'Service Life': '2000–4000 operating hours',
			Drain: 'Automatic or zero-air-loss condensate drain',
			'Oil Compatibility':
				'Mineral / synthetic / semi-synthetic compressor lubricants',
			'HSN Code': '8421',
		},
		images: [
			'oil-vapour-extractor-filter-1.webp',
			'oil-vapour-extractor-filter-2.webp',
			'oil-vapour-extractor-filter-3.webp',
			'oil-vapour-extractor-filter-4.webp',
			'oil-vapour-extractor-filter-5.webp',
			'oil-vapour-extractor-filter-6.webp',
			'oil-vapour-extractor-filter-7.webp',
			'oil-vapour-extractor-filter-8.webp',
			'oil-vapour-extractor-filter-9.webp',
			'oil-vapour-extractor-filter-10.webp',
			'oil-vapour-extractor-filter-11.webp',
			'oil-vapour-extractor-filter-12.webp',
		],
	},

	{
		id: 'prod_f20',
		category: 'Industrial Filtration',
		title: 'HYDAC Replacement Filter Elements',
		desc: 'High-performance replacement filter elements dimensionally and functionally compatible with HYDAC filter housings. Microglass (Betamicron/Optimicron) and stainless steel wire mesh media — manufactured to match or exceed original HYDAC collapse pressure, beta efficiency, and seal specifications.',
		usage:
			'Hydraulic and lubrication systems using HYDAC filter housings across industrial machinery, turbine control oil circuits, injection moulding machines, machine tools, and mobile hydraulic equipment.',
		features: [
			'Compatible with HYDAC housing series: 0060, 0110, 0160, 0240, 0330, 0500, 0660, 1300 D/R/T series and more',
			'Filter media: Betamicron (BN4HC) microglass or Optimicron (ON) — matched to OEM specification',
			'Absolute filtration ratings: β10(c) ≥ 1000 (99.9% efficiency at rated micron)',
			'Micron ratings available: 3, 6, 10, 16, 25 µm per HYDAC model code requirement',
			'Collapse/burst pressure: 10, 20, or 30 bar depending on series — per OEM specification',
			'Flow direction: outside-in (standard HYDAC configuration)',
			'Operating temperature: -30 deg C to +100 deg C (NBR seals); -20 to +120 deg C (Viton seals)',
			'Seal materials: NBR (standard) or FKM/Viton for high-temperature and synthetic fluid service',
			'HYDAC model code decoded and cross-referenced for exact drop-in fit',
			'ISO 16889, ISO 2941, ISO 2943, ISO 3968 tested and certified',
			'HSN Code: 8421',
		],
		specs: {
			'Compatible Housings': 'HYDAC 0060 to 1300 D/R/T series and variants',
			'Filter Media': 'Microglass (BN4HC / ON equivalent) or SS wire mesh',
			'Absolute Rating': 'β10(c) ≥ 1000 (99.9% efficiency at rated micron)',
			'Micron Ratings': '3, 6, 10, 16, 25 µm',
			'Collapse Pressure': '10, 20, or 30 bar (series dependent)',
			'Flow Direction': 'Outside-in (standard HYDAC configuration)',
			'Temperature Range': '-30 to +100 deg C (NBR); -20 to +120 deg C (Viton)',
			'Seal Options': 'NBR (standard) / FKM-Viton (high temperature/synthetic)',
			Standards: 'ISO 16889, ISO 2941, ISO 2943, ISO 3968',
			'HSN Code': '8421',
		},
		images: [
			'hydac-replacement-filter-1.webp',
			'hydac-replacement-filter-2.webp',
			'hydac-replacement-filter-3.webp',
			'hydac-replacement-filter-4.webp',
			'hydac-replacement-filter-5.webp',
			'hydac-replacement-filter-6.webp',
			'hydac-replacement-filter-7.webp',
			'hydac-replacement-filter-8.webp',
			'hydac-replacement-filter-9.webp',
			'hydac-replacement-filter-10.webp',
			'hydac-replacement-filter-11.webp',
			'hydac-replacement-filter-12.webp',
		],
	},

	// Products 8–13 of 13 new products (May 2026)

	{
		id: 'prod_f21',
		category: 'Industrial Filtration',
		title: 'Pall Replacement Filter Elements',
		desc: 'Drop-in replacement filter elements for Pall Corporation filter housings. Microglass and stainless steel media — matched to Pall HC, HH, and UE series dimensional and performance specifications including collapse pressure, beta efficiency, and O-ring sealing.',
		usage:
			'Hydraulic power units, turbine lube and control oil systems, aerospace ground support, industrial machinery, and process filtration systems using Pall filter housings where cost-effective OEM-equivalent elements are required.',
		features: [
			'Compatible with Pall housing series: HC, HH, UE, AEW, LCS, HNF, FAX, and HXX series elements',
			'Microglass filter media — equivalent to Pall Ultipleat and High Capacity element performance',
			'Absolute filtration rating: β10(c) ≥ 1000; β3(c) ≥ 1000 for fine-grade elements',
			'Micron ratings: 3, 6, 10, 16, 25 µm (specify Pall part number for exact cross-reference)',
			'Collapse/burst pressure: per Pall original spec — ISO 2941 verified (typically 10–20 bar)',
			'Fluid compatibility: mineral oils, phosphate ester (Skydrol), synthetic hydraulic fluids, water glycol',
			'Seal materials: Nitrile (NBR), Viton (FKM), or EPDM per Pall original seal specification',
			'Outside-in flow direction — standard Pall housing configuration',
			'Full dimensional match: OD, ID, length, and end connection to OEM drawing',
			'ISO 16889, ISO 2941, ISO 2943, ISO 3968 performance tested',
			'HSN Code: 8421',
		],
		specs: {
			'Compatible Pall Series': 'HC, HH, UE, AEW, LCS, HNF, FAX, HXX series',
			'Filter Media': 'Microglass (Ultipleat equivalent)',
			'Absolute Rating': 'β10(c) ≥ 1000; β3(c) ≥ 1000 (fine grade)',
			'Micron Ratings': '3, 6, 10, 16, 25 µm',
			'Collapse Pressure':
				'Per Pall OEM spec — ISO 2941 verified (10–20 bar typical)',
			'Fluid Compatibility':
				'Mineral oil / Phosphate ester (Skydrol) / Synthetic / Water glycol',
			'Seal Options': 'NBR / Viton (FKM) / EPDM (per Pall original)',
			'Flow Direction': 'Outside-in (standard Pall configuration)',
			Standards: 'ISO 16889, ISO 2941, ISO 2943, ISO 3968',
			'HSN Code': '8421',
		},
		images: [
			'pall-replacement-filter-1.webp',
			'pall-replacement-filter-2.webp',
			'pall-replacement-filter-3.webp',
			'pall-replacement-filter-4.webp',
			'pall-replacement-filter-5.webp',
			'pall-replacement-filter-6.webp',
			'pall-replacement-filter-7.webp',
			'pall-replacement-filter-8.webp',
			'pall-replacement-filter-9.webp',
			'pall-replacement-filter-10.webp',
			'pall-replacement-filter-11.webp',
			'pall-replacement-filter-12.webp',
		],
	},

	{
		id: 'prod_f22',
		category: 'Industrial Filtration',
		title: 'Bhagwati Replacement Oil Filters',
		desc: 'One-to-one compatible replacement filter elements for Bhagwati Filters (Ahmedabad) hydraulic and lubrication filter housings. ISO 9001:2015 certified media — glass fiber, Hydroclean, paper, and SS wire mesh options matched to original Bhagwati part numbers.',
		usage:
			'Hydraulic and lube oil systems across Indian industry using Bhagwati filter housings — machine tools, injection moulding, industrial presses, CNC machinery, turbine auxiliary systems, and general hydraulic power units across sugar mills, paper mills, and process plants.',
		features: [
			'Bhagwati filter housing compatible — exact part number cross-reference supplied on request',
			'Media options: glass fiber, Hydroclean absolute, paper, and SS wire mesh per application',
			'Hydroclean absolute media: β10(c) ≥ 200; β6(c) ≥ 200 efficiency ratings',
			'Micron ratings: 3, 6, 10, 25, 40, 60 µm standard range',
			'Pressure filter elements: up to 210 bar (high-pressure line service)',
			'Return line elements: low pressure-drop design for system efficiency',
			'Duplex filter elements: for Bhagwati duplex housing continuous-duty installations',
			'Basket strainer elements: Y-type, conical, and basket strainer internals',
			'In-house quality testing: bubble point, end-load, and hydrostatic pressure verification',
			'ISO 9001:2015 certified manufacturing — India-based supplier for fast delivery',
			'HSN Code: 8421',
		],
		specs: {
			Manufacturer: 'Bhagwati Filters Pvt. Ltd. — ISO 9001:2015 certified',
			'Media Types': 'Glass fiber / Hydroclean Absolute / Paper / SS wire mesh',
			'Hydroclean Efficiency': 'β10(c) ≥ 200; β6(c) ≥ 200',
			'Micron Ratings': '3, 6, 10, 25, 40, 60 µm',
			'Pressure Line Rating': 'Up to 210 bar',
			Applications:
				'Hydraulic, lube oil, duplex housings, basket and Y-type strainers',
			'Quality Testing': 'Bubble point / End-load / Hydrostatic pressure test',
			'Supply Advantage':
				'India-based — fast delivery, local technical support',
			'HSN Code': '8421',
		},
		images: [
			'bhagwati-replacement-filter-1.webp',
			'bhagwati-replacement-filter-2.webp',
			'bhagwati-replacement-filter-3.webp',
			'bhagwati-replacement-filter-4.webp',
			'bhagwati-replacement-filter-5.webp',
			'bhagwati-replacement-filter-6.webp',
			'bhagwati-replacement-filter-7.webp',
			'bhagwati-replacement-filter-8.webp',
			'bhagwati-replacement-filter-9.webp',
			'bhagwati-replacement-filter-10.webp',
			'bhagwati-replacement-filter-11.webp',
			'bhagwati-replacement-filter-12.webp',
		],
	},

	{
		id: 'prod_f23',
		category: 'Industrial Filtration',
		title: 'Air Oil Separator Filter',
		desc: 'Borosilicate glass fiber coalescing air-oil separator elements for oil-flooded rotary screw compressors. Removes entrained oil aerosols from compressed air before delivery — achieves residual oil carryover of 1–3 mg/m³ at nominal duty.',
		usage:
			'Primary air-oil separation in oil-flooded rotary screw compressors (Atlas Copco, Kaeser, Ingersoll Rand, Elgi, Kirloskar, and all major brands). Protects downstream compressed air equipment and prevents excessive oil consumption.',
		features: [
			'Borosilicate glass fiber depth media — coalesces submicron oil droplets via direct interception, impaction, and Brownian motion',
			'Residual oil carryover: 1–3 mg/m³ at rated flow and pressure',
			'Initial pressure drop: 0.15–0.3 bar (2–4 psi) on new element',
			'Service life: 2000–4000 operating hours (dependent on oil quality and air inlet filtration)',
			'Operating temperature: up to 110 deg C continuous; 120 deg C short-term peak',
			'Collapse pressure resistance: minimum 5 bar (70 psi) differential structural integrity',
			'Compatible with mineral, semi-synthetic, and synthetic compressor lubricants',
			'OEM cross-reference for Atlas Copco, Kaeser, Ingersoll Rand, Elgi, Kirloskar, Chicago Pneumatic',
			'Monitoring: differential pressure gauge port — replace at 1 bar (14 psi) DP or at service hour interval',
			'Available as replacement element only or complete spin-on separator assembly',
			'HSN Code: 8421',
		],
		specs: {
			'Filter Media': 'Borosilicate glass fiber coalescing depth media',
			'Residual Oil Carryover': '1–3 mg/m³ at rated flow',
			'Initial Pressure Drop': '0.15–0.3 bar (2–4 psi)',
			'Max Operating Temperature':
				'Up to 110 deg C (continuous); 120 deg C (peak)',
			'Collapse Resistance': 'Minimum 5 bar (70 psi) differential',
			'Service Life': '2000–4000 operating hours',
			'Compatible Brands':
				'Atlas Copco, Kaeser, Ingersoll Rand, Elgi, Kirloskar, Chicago Pneumatic',
			'Oil Compatibility':
				'Mineral / semi-synthetic / synthetic compressor lubricants',
			'Replacement Interval': 'At 1 bar DP or per service hour schedule',
			'HSN Code': '8421',
		},
		images: [
			'air-oil-separator-filter-1.webp',
			'air-oil-separator-filter-2.webp',
			'air-oil-separator-filter-3.webp',
			'air-oil-separator-filter-4.webp',
			'air-oil-separator-filter-5.webp',
			'air-oil-separator-filter-6.webp',
			'air-oil-separator-filter-7.webp',
			'air-oil-separator-filter-8.webp',
			'air-oil-separator-filter-9.webp',
			'air-oil-separator-filter-10.webp',
			'air-oil-separator-filter-11.webp',
			'air-oil-separator-filter-12.webp',
		],
	},

	{
		id: 'prod_ts22',
		category: 'Turbine Spares',
		title: 'Shear Pins (Turbine Coupling)',
		desc: 'Precision-engineered shear pins for turbine coupling torque-limiting protection. Act as mechanical fuses — shear at a calibrated load to disconnect the drive train and protect turbine gearboxes, rotors, and driven equipment from damage during sudden torque overload events.',
		usage:
			'Turbine coupling overload protection on Triveni, BHEL, Siemens, KKK, Man Turbo, and Belliss & Morcom steam turbines. Installed in coupling flanges between turbine and gearbox, or gearbox and driven equipment — sugar mill crushers, pumps, fans, and compressors.',
		features: [
			'Precision shear-groove machined to calibrated shear load — fails cleanly at design torque',
			'Separation factor: 2.5–3.0× rated running torque to shear point — no premature fatigue failure under normal operation',
			'Material: carbon steel (EN8, EN9) or alloy steel (EN24, EN36) per torque and impact requirements',
			'Heat-treated and hardened — uniform hardness ensures consistent shear load across all pins in a set',
			'Multiple pin sets designed to shear simultaneously — equal torsional loading via tight-tolerance pin hole positioning',
			'Post-shear: coupling halves run independently via integral bearing — controlled rotor run-down without equipment damage',
			'Quick-change design — shear pins replaceable without coupling removal or shaft realignment',
			'Torque range: 500 Nm to 500 kNm (specify coupling size and OEM turbine model)',
			'Reverse-engineered from OEM sample using CMM dimensional measurement and material PMI',
			'Supplied as matched sets with anti-seize compound for reliable extraction after a shear event',
		],
		specs: {
			Function:
				'Torque-limiting mechanical fuse — protects drivetrain from overload',
			'Separation Factor': '2.5–3.0× rated running torque to shear point',
			Material:
				'EN8/EN9 carbon steel or EN24/EN36 alloy steel (per torque requirement)',
			'Heat Treatment':
				'Hardened and tempered — uniform shear load across pin set',
			'Torque Range': '500 Nm to 500 kNm (application specific)',
			'Post-Shear Behaviour':
				'Coupling halves run independently — controlled coast-down',
			Replacement: 'Quick-change without coupling removal or realignment',
			'OEM Compatibility':
				'Triveni, BHEL, Siemens, KKK, Man Turbo, Belliss & Morcom turbines',
			Documentation: 'PMI material cert + dimensional inspection report',
			Supply: 'Matched sets with anti-seize compound',
		},
		images: [
			'turbine-shear-pins-1.webp',
			'turbine-shear-pins-2.webp',
			'turbine-shear-pins-3.webp',
			'turbine-shear-pins-4.webp',
			'turbine-shear-pins-5.webp',
			'turbine-shear-pins-6.webp',
			'turbine-shear-pins-7.webp',
			'turbine-shear-pins-8.webp',
			'turbine-shear-pins-9.webp',
			'turbine-shear-pins-10.webp',
			'turbine-shear-pins-11.webp',
			'turbine-shear-pins-12.webp',
		],
	},

	{
		id: 'prod_ts23',
		category: 'Turbine Spares',
		title: 'Dowty Hydraulic Oil Pumps',
		desc: 'Replacement and overhauled Dowty (Dynamatic Technologies) hydraulic gear pumps for industrial and turbine auxiliary hydraulic systems. Pressure-balanced bushing design with hardened steel gears — rated for continuous duty at up to 210 bar (3000 psi).',
		usage:
			'Turbine auxiliary hydraulic systems, machine tool hydraulic power units, industrial presses, injection moulding machines, and mobile hydraulic equipment using Dowty 0P, 1P, 2P, or 3P series gear pumps.',
		features: [
			'Dowty (Dynamatic Technologies) series: 0P, 1P, 2P, 3P frame sizes — displacement 0.80 to 151.33 cc/rev',
			'Continuous operating pressure: up to 210 bar (3000 psi) — intermittent to 250 bar',
			'Speed range: 600 RPM minimum to 3500–4000 RPM maximum (model dependent)',
			'Pressure-balanced bushing technology — maintains high volumetric efficiency under load',
			'Housing: aluminium alloy (0P/1P light duty) or cast iron (2P/3P heavy duty)',
			'Hardened steel gear set — wear-resistant for long service life at rated pressure',
			'Configurations: single, double (tandem), triple, and quadruple combinations available',
			'Mounting: SAE flange mount with BSP or metric port options',
			'Rotation: clockwise or counter-clockwise — specify at order',
			'OEM model code decoded from nameplate — exact displacement, porting, and shaft specification matched',
			'New manufacture or OEM-spec overhauled units available — pressure and flow tested before dispatch',
		],
		specs: {
			Brand: 'Dowty / Dynamatic Technologies gear pump',
			Series: '0P, 1P, 2P, 3P frame sizes',
			'Displacement Range': '0.80 to 151.33 cc/rev',
			'Max Continuous Pressure': '210 bar (3000 psi)',
			'Speed Range': '600 to 3500–4000 RPM (model dependent)',
			'Housing Material': 'Aluminium alloy (0P/1P) / Cast iron (2P/3P)',
			'Gear Material': 'Hardened steel',
			Configurations: 'Single / tandem / triple / quadruple',
			Mounting: 'SAE flange — BSP or metric ports',
			Service: 'New manufacture or OEM-spec overhauled + performance tested',
		},
		images: [
			'dowty-hydraulic-pump-1.webp',
			'dowty-hydraulic-pump-2.webp',
			'dowty-hydraulic-pump-3.webp',
			'dowty-hydraulic-pump-4.webp',
			'dowty-hydraulic-pump-5.webp',
			'dowty-hydraulic-pump-6.webp',
			'dowty-hydraulic-pump-7.webp',
			'dowty-hydraulic-pump-8.webp',
			'dowty-hydraulic-pump-9.webp',
			'dowty-hydraulic-pump-10.webp',
			'dowty-hydraulic-pump-11.webp',
			'dowty-hydraulic-pump-12.webp',
		],
	},

	{
		id: 'prod_hv1',
		category: 'Hydraulic Components',
		title: 'Directional Control Valves (All Major Makes)',
		desc: 'Industrial hydraulic directional control valves from all major manufacturers — Bosch Rexroth, Parker, Yuken, Vickers, Atos, and Duplomatic. Solenoid, manual, and pilot-operated configurations in standard CETOP 3, 5, 7 (D03/D05/D08) mounting sizes for industrial hydraulic systems.',
		usage:
			'Hydraulic system directional flow control in turbine auxiliary systems, industrial presses, injection moulding machines, steel plant hydraulics, sugar mill hydraulic drives, machine tools, and all industrial hydraulic power units requiring 4/2, 4/3, or 5/2 directional valve control.',
		features: [
			'Makes available: Bosch Rexroth, Parker Hannifin, Yuken, Vickers (Eaton), Atos, Duplomatic, Wandfluh, and equivalents',
			'Valve types: 4/2-way, 4/3-way, 5/2-way directional spool valves; 2/2-way poppet valves',
			'Actuation options: solenoid-operated (24V DC, 110V AC, 220V AC), manual lever, pilot-operated, or combination',
			'Mounting interface: CETOP 3 (D03 / NG6), CETOP 5 (D05 / NG10), CETOP 7 (D07 / NG16) per ISO 4401',
			'Flow capacity: 15 LPM (CETOP 3) up to 350 LPM (CETOP 7) at rated pressure drop',
			'Maximum operating pressure: 315–350 bar (cartridge and cetop series dependent)',
			'Spool centre configurations: closed-centre, open-centre, tandem-centre, float-centre as required',
			'Coil connectors: DIN 43650 (Euro), AMP Junior Timer, or conduit box per installation requirement',
			'ATEX explosion-proof solenoids available for hazardous area industrial installations',
			'Proportional directional valves available for variable flow and position control applications',
			'Spare solenoid coils and spool kits stocked for fast maintenance turnaround',
		],
		specs: {
			'Makes Supplied':
				'Bosch Rexroth / Parker / Yuken / Vickers (Eaton) / Atos / Duplomatic',
			'Valve Types': '4/2, 4/3, 5/2 spool; 2/2 poppet directional valves',
			Actuation:
				'Solenoid (24V DC / 110V AC / 220V AC) / Manual / Pilot / Combination',
			'Mounting Standard': 'ISO 4401 — CETOP 3/D03 / CETOP 5/D05 / CETOP 7/D07',
			'Flow Capacity': '15–350 LPM (size dependent)',
			'Max Pressure': 'Up to 350 bar',
			'Spool Centre': 'Closed / Open / Tandem / Float (specify at order)',
			'Coil Connector': 'DIN 43650 / AMP Junior Timer / Conduit box',
			'ATEX Option':
				'Explosion-proof solenoids for Zone 1/Zone 2 hazardous areas',
			Proportional:
				'Proportional directional valves available for variable control',
		},
		images: [
			'directional-control-valve-1.webp',
			'directional-control-valve-2.webp',
			'directional-control-valve-3.webp',
			'directional-control-valve-4.webp',
			'directional-control-valve-5.webp',
			'directional-control-valve-6.webp',
			'directional-control-valve-7.webp',
			'directional-control-valve-8.webp',
			'directional-control-valve-9.webp',
			'directional-control-valve-10.webp',
			'directional-control-valve-11.webp',
			'directional-control-valve-12.webp',
		],
	},
];

const MAX_PRODUCT_IMAGES = 12;
const buildExtraImageNames = (baseImage, totalCount) => {
	const dot = baseImage.lastIndexOf('.');
	if (dot <= 0) return [];
	const ext = baseImage.slice(dot);
	const root = baseImage.slice(0, dot).replace(/-\d+$/, '');
	return Array.from({ length: totalCount }, (_, i) => `${root}-${i + 1}${ext}`);
};

const PRODUCTS = RAW_PRODUCTS.map((product) => {
	const imgs = Array.isArray(product.images)
		? product.images.filter(Boolean)
		: [];
	if (imgs.length >= MAX_PRODUCT_IMAGES)
		return { ...product, images: imgs.slice(0, MAX_PRODUCT_IMAGES) };
	if (imgs.length === 0) return { ...product, images: [] };
	const generated = buildExtraImageNames(imgs[0], MAX_PRODUCT_IMAGES);
	const merged = [...new Set([...imgs, ...generated])].slice(
		0,
		MAX_PRODUCT_IMAGES,
	);
	return { ...product, images: merged };
});

const PRODUCT_CATEGORIES = ['All', ...new Set(PRODUCTS.map((p) => p.category))];

const INDUSTRIES = [
	{
		id: 'ind_1',
		title: 'Power Generation',
		Icon: Zap,
		color: 'from-yellow-500/20 to-amber-600/10',
		border: 'border-yellow-500/30',
		accent: 'text-yellow-500',
		// Upload this image to your /public folder — e.g. a photo of a power plant turbine hall
		image: 'industry-power-generation.webp',
		desc: 'Supplying critical overhauling services and OEM-compatible spares to thermal power plants operating steam turbines from 5 MW to 27 MW. Our ex-OEM engineers ensure maximum plant availability.',
		useCases: [
			'Steam turbine major and minor overhauling',
			'Turbine erection and commissioning',
			'Lube oil system flushing per ISO 4406:99',
			'Rotor dynamic balancing and alignment',
			'Emergency stop valve manufacturing',
			'Filter elements and strainers supply',
		],
		turbines: '5 MW – 27 MW',
	},
	{
		id: 'ind_2',
		title: 'Sugar Mills & Distilleries',
		Icon: Factory,
		color: 'from-green-500/20 to-emerald-600/10',
		border: 'border-green-500/30',
		accent: 'text-green-500',
		// Upload a photo of a sugar mill or cane crushing plant
		image: 'industry-sugar-mills.webp',
		desc: "Serving India's sugar industry with specialized back-pressure steam turbine services. Scheduled overhauling during off-season and emergency breakdown support during crushing season.",
		useCases: [
			'Back-pressure turbine overhauling (inter-season)',
			'Triveni and Belliss turbine specialist services',
			'Carbon and graphite gland ring supply',
			'Labyrinth packing manufacturing',
			'Lube oil filtration products supply',
			'Emergency 24x7 breakdown support',
		],
		turbines: 'Triveni, Belliss & Morcom, Maxwatt',
	},
	{
		id: 'ind_3',
		title: 'Paper & Pulp Mills',
		Icon: Layers,
		color: 'from-blue-500/20 to-cyan-600/10',
		border: 'border-blue-500/30',
		accent: 'text-blue-500',
		// Upload a photo of a paper mill or pulp processing facility
		image: 'industry-paper-mills.webp',
		desc: 'Paper mills operate steam turbines continuously and require precision maintenance to maintain uptime. We provide planned shutdown overhauling and critical spare components.',
		useCases: [
			'Continuous-operation turbine maintenance planning',
			'Duplex basket strainer supply for process lines',
			'Expansion joint and bellows supply',
			'Turbine spares manufacturing to OEM standards',
			'Machine alignment services',
			'Vibration monitoring equipment supply',
		],
		turbines: 'Siemens, BHEL, Triveni',
	},
	{
		id: 'ind_4',
		title: 'Oil & Gas Industries',
		Icon: Droplets,
		color: 'from-orange-500/20 to-red-600/10',
		border: 'border-orange-500/30',
		accent: 'text-orange-500',
		// Upload a photo of an oil refinery or gas processing plant
		image: 'industry-oil-gas.webp',
		desc: 'Oil and gas facilities demand the highest standards of precision engineering for turbine-driven compressors and pumps. Our API-compliant products meet the stringent requirements of upstream and downstream facilities.',
		useCases: [
			'API 614-compliant lube oil filter elements',
			'API 670-compliant vibration monitoring probes',
			'PTFE-lined hose assemblies for chemical transfer',
			'High-pressure hydraulic rubber hose assemblies',
			'Babbitt bearing manufacturing for compressor trains',
			'Dynamic balancing per ISO 1940/API 670',
		],
		turbines: 'Siemens, Man Turbo, KKK, ABB',
	},
	{
		id: 'ind_5',
		title: 'Petrochemical & Refineries',
		Icon: Activity,
		color: 'from-purple-500/20 to-violet-600/10',
		border: 'border-purple-500/30',
		accent: 'text-purple-500',
		// Upload a photo of a petrochemical complex or refinery at night
		image: 'industry-petrochemical.webp',
		desc: 'Petrochemical plants and refineries require specialized metallic expansion joints, high-performance strainers, and precision turbine spares capable of handling aggressive media at elevated temperatures.',
		useCases: [
			'Metallic bellows expansion joints (DN 15-12,000)',
			'High-temperature PTFE filter and hose products',
			'ASME-code strainers for process pipelines',
			'Inconel and Hastelloy expansion bellows',
			'Turbine steam path component manufacturing',
			'High-pressure control valve manufacturing',
		],
		turbines: 'All major makes',
	},
	{
		id: 'ind_6',
		title: 'Agro & Food Processing',
		Icon: Shield,
		color: 'from-teal-500/20 to-cyan-600/10',
		border: 'border-teal-500/30',
		accent: 'text-teal-500',
		// Upload a photo of an agro-processing or food plant
		image: 'industry-agro-food.webp',
		desc: 'Agro-processing industries rely on steam for power generation and process heating. We supply filtration products, rubber components, and turbine maintenance services to keep agro-industrial steam systems running.',
		useCases: [
			'Steam turbine maintenance for agro co-gen plants',
			'FDA-grade PTFE hose for food-grade transfer lines',
			'Rubber expansion joints for pump connections',
			'Anti-vibration mounts for machinery isolation',
			'Tank breather filters for oil storage systems',
			'Y-type strainers for process fluid lines',
		],
		turbines: 'Triveni, Maxwatt, Chola Turbo',
	},
	{
		id: 'ind_7',
		title: 'Cement & Construction',
		Icon: Building2,
		color: 'from-stone-500/20 to-gray-600/10',
		border: 'border-stone-500/30',
		accent: 'text-stone-400',
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
		turbines: 'Kiln Drives · Ball Mills · VRMs · Compressors',
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
  .lazy-section{opacity:0;transform:translateY(10px);transition:opacity .3s ease,transform .3s ease}
  .lazy-section.visible{opacity:1;transform:none}

  @keyframes ke-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  .skeleton-shimmer{
    position:absolute;inset:0;z-index:0;
    background:linear-gradient(110deg,rgba(148,163,184,.18) 8%,rgba(226,232,240,.55) 18%,rgba(148,163,184,.18) 33%);
    background-size:200% 100%;
    animation:ke-shimmer 1.25s linear infinite;
  }
  /* Enhanced skeleton with product icon placeholder */
  .skeleton-product{
    position:absolute;inset:0;z-index:1;
    display:flex;align-items:center;justify-content:center;flex-direction:column;
  }
  .skeleton-product::before{
    content:'';width:48px;height:48px;border-radius:12px;
    background:linear-gradient(135deg,rgba(148,163,184,.15),rgba(148,163,184,.08));
    animation:ke-shimmer 1.25s linear infinite;
    background-size:200% 100%;
  }
  .skeleton-product::after{
    content:'';width:80px;height:10px;border-radius:5px;margin-top:12px;
    background:linear-gradient(110deg,rgba(148,163,184,.12) 8%,rgba(226,232,240,.35) 18%,rgba(148,163,184,.12) 33%);
    background-size:200% 100%;
    animation:ke-shimmer 1.25s linear infinite;
  }
  /* Product image container gradient for contrast */
  .product-img-bg{
    background:radial-gradient(ellipse at 50% 60%,rgba(241,245,249,1) 0%,rgba(226,232,240,.4) 70%,rgba(203,213,225,.15) 100%);
  }
  .media-img{opacity:0;transition:opacity .35s ease}
  .media-img.is-loaded{opacity:1}

  /* font-display:swap prevents invisible-text Lighthouse warning */
  @font-face{font-family:'Barlow Condensed';font-style:normal;font-weight:600 900;font-display:swap;src:local('Barlow Condensed')}
  @font-face{font-family:'Barlow';font-style:normal;font-weight:400 900;font-display:swap;src:local('Barlow')}

  /* PERF: content-visibility on below-fold sections */
  .cv-auto{content-visibility:auto;contain-intrinsic-size:0 600px}

  /* Prevent flow images from overflowing; exclude absolute/fixed cover images so h-full is preserved */
  img:not([class*="absolute"]):not([class*="fixed"]){max-width:100%;height:auto;display:block}
  /* Absolute/fixed cover images: ensure object-cover fills parent correctly */
  img.absolute,img.fixed{display:block;}

  /* GPU compositing for marquees */
  .ke-marquee,.ke-marquee-slow{transform:translateZ(0);backface-visibility:hidden}

  /* Paint containment */
  section:not(.hero-section){contain:paint}

  /* ─── HERO MOBILE ─── */
  .hero-mobile-vignette{display:none}
  .hero-bg-img{opacity:0.90;object-position:center center}
  @media(max-width:767px){
    .hero-section{
      background-image:linear-gradient(to right,rgba(10,25,47,0.95),rgba(10,25,47,0.7),rgba(10,25,47,0.4)),url('hero-background.png');
      background-size:cover;
      background-position:center center;
      background-repeat:no-repeat;
    }
    .hero-bg-layer{display:none!important}
    .hero-desktop-grad{display:none!important}
    .hero-mobile-vignette{display:none!important}
    .hero-glow-orb{display:none!important}
    .hero-bottom-overlay{background:linear-gradient(to top,rgba(10,25,47,0.9),transparent)!important}
    .backdrop-blur-xl{backdrop-filter:blur(8px)!important;-webkit-backdrop-filter:blur(8px)!important}
  }

  /* ─── MOBILE TYPOGRAPHY BOOST ─── */
  @media(max-width:640px){
    .bg-\\[\\#0A192F\\] .text-slate-400,.bg-slate-900 .text-slate-400,.bg-slate-800 .text-slate-400{color:#9ab1c8!important}
    .bg-\\[\\#0A192F\\] .text-slate-500,.bg-slate-900 .text-slate-500,.bg-slate-800 .text-slate-500{color:#7f97b0!important}
    p{font-size:max(15px,1em);line-height:1.65}
    .hero-h1{font-size:clamp(2.2rem,9vw,3.6rem)!important;line-height:1.08!important;text-shadow:0 2px 10px rgba(0,0,0,0.45)}
    .glass-hero p{color:#d0e4f5!important}
    .eyebrow-label{color:#60a5fa!important;letter-spacing:0.18em!important}
  }

  /* ─── MOBILE HEADING ALIGNMENT ─── */
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

  /* ─── CLS-SAFE ASPECT RATIO CONTAINERS ─── */
  .product-img-wrap{aspect-ratio:1/1;contain:layout style;overflow:hidden}
  .service-img-wrap{aspect-ratio:4/3;contain:layout style;overflow:hidden}
  .product-card-img{aspect-ratio:400/192;width:100%;object-fit:cover}

  /* ─── FOOTER SOCIAL CARDS — MOBILE RESPONSIVE ─── */
  /* Social cards collapse gracefully on small screens */
  .social-card{
    min-width:0!important;
    width:100%;
    max-width:100%;
    flex-shrink:1;
  }
  @media(max-width:640px){
    /* Social card grid: 1 column on phones, 2 on wider phones */
    .social-cards-grid{
      display:grid!important;
      grid-template-columns:1fr 1fr;
      gap:0.75rem;
      width:100%;
    }
    .social-card{
      min-width:0!important;
      padding:0.75rem!important;
      gap:0.625rem!important;
    }
    .social-card .social-handle{font-size:13px!important}
    .social-card .social-sub{display:none}
  }
  @media(max-width:380px){
    .social-cards-grid{grid-template-columns:1fr}
  }

  /* ─── DIGITAL PROFILES STRIP — MOBILE ─── */
  .dir-card{
    min-width:0!important;
    flex-shrink:1;
  }
  @media(max-width:640px){
    .dir-cards-grid{
      display:grid!important;
      grid-template-columns:1fr 1fr;
      gap:0.625rem;
      width:100%;
    }
    .dir-card{
      padding:0.75rem 0.875rem!important;
      gap:0.5rem!important;
      min-width:0!important;
    }
    .dir-card .dir-badge{font-size:10px!important}
  }
  @media(max-width:380px){
    .dir-cards-grid{grid-template-columns:1fr}
  }

  /* ─── PRODUCT DETAIL — THUMBNAIL STRIP ─── */
  @media(max-width:640px){
    .thumb-strip{gap:0.5rem!important;padding-bottom:0.5rem!important}
    .thumb-strip button{width:3.5rem!important;height:3.5rem!important;min-height:3.5rem!important}
  }

  /* ─── FEATURED PRODUCTS STRIP — CARD SIZE ─── */
  @media(max-width:480px){
    .fp-card{width:13rem!important}
  }

  /* ─── SERVICE DETAIL — STEP CONNECTOR ─── */
  @media(max-width:640px){
    .sd-step-gap{gap:0.875rem!important}
    .sd-step-num{width:2.5rem!important;height:2.5rem!important;font-size:0.75rem!important;flex-shrink:0}
  }

  /* ─── CONTACT FORM — EMAIL OVERFLOW ─── */
  .email-link{
    word-break:break-all;
    overflow-wrap:anywhere;
    min-width:0;
  }

  /* ─── ABOUT PAGE TIMELINE — MOBILE ─── */
  @media(max-width:767px){
    .timeline-connector{left:1rem!important}
    .timeline-card{margin-left:3rem!important;margin-right:0!important}
  }

  /* ─── INDUSTRIES PAGE — HERO BADGE OVERFLOW ─── */
  @media(max-width:480px){
    .ind-oem-chips{gap:0.375rem!important}
    .ind-oem-chip{font-size:9px!important;padding:0.25rem 0.5rem!important}
  }

  /* ─── TAP TARGETS + SAFE AREA ─── */
  @media(max-width:767px){
    a[href],button{-webkit-tap-highlight-color:rgba(30,111,255,0.15);min-height:44px}
    .floating-buttons{padding-bottom:max(1.5rem,env(safe-area-inset-bottom,0px))}
  }

  /* ─── REDUCED MOTION ─── */
  @media(prefers-reduced-motion:reduce){
    .ke-marquee,.ke-marquee-slow{animation:none;transform:none}
    .lazy-section,.lazy-section.visible{opacity:1;transform:none;transition:none}
    *{transition-duration:0.01ms!important;animation-duration:0.01ms!important}
  }

  /* ─── REUSABLE BUTTON UTILITIES ─── */
  .btn-primary{background:#2563eb;color:#fff;font-weight:900;border-radius:0.75rem;transition:background 0.2s,transform 0.2s;display:inline-flex;align-items:center;justify-content:center;gap:0.5rem}
  .btn-primary:hover{background:#3b82f6;transform:translateY(-2px)}
  .btn-wa{background:#25D366;color:#fff;font-weight:900;border-radius:0.75rem;transition:background 0.2s;display:inline-flex;align-items:center;justify-content:center;gap:0.5rem}
  .btn-wa:hover{background:#1ebe5d}
  .card-hover{transition:box-shadow 0.3s,transform 0.3s,border-color 0.3s}
  .card-hover:hover{box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);transform:translateY(-4px)}

  /* ─── GLOBAL OVERFLOW GUARD ─── */
  html,body{overflow-x:hidden;max-width:100vw}
  *{box-sizing:border-box}
`;

// ─── LOCAL BUSINESS JSON-LD SCHEMA ────────────────────────────
const LOCAL_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': ['LocalBusiness', 'ProfessionalService'],
	name: 'Keshav Enterprises',
	alternateName: 'Keshav Engg',
	description:
		'Precision industrial turbine engineering — overhauling, reverse engineering, dynamic balancing, lube oil flushing, and OEM-compatible spares for steam turbines 5 kW to 27 MW. Serving power, sugar, paper, oil & gas, and petrochemical industries across India.',
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
		addressCountry: 'IN',
	},
	geo: {
		'@type': 'GeoCoordinates',
		latitude: 29.4476,
		longitude: 77.3003,
	},
	openingHours: 'Mo-Sa 09:00-18:00',
	openingHoursSpecification: {
		'@type': 'OpeningHoursSpecification',
		dayOfWeek: [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		],
		opens: '09:00',
		closes: '18:00',
	},
	areaServed: [
		{ '@type': 'Country', name: 'India' },
		{ '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
		{ '@type': 'AdministrativeArea', name: 'Punjab' },
		{ '@type': 'AdministrativeArea', name: 'Haryana' },
		{ '@type': 'AdministrativeArea', name: 'Maharashtra' },
	],
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Industrial Turbine Engineering Services',
		itemListElement: [
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Turbine Overhauling & Maintenance',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Precision Reverse Engineering',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Dynamic Balancing & Rotor Machining',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: 'Lube Oil Flushing' },
			},
			{
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: 'Machine Alignment' },
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Turbine Erection & Commissioning',
				},
			},
		],
	},
	sameAs: [
		'https://www.indiamart.com/keshav-enterprises-shamli/',
		'https://share.google/B7KVUQrAcCh86oSyu',
		'https://www.tradeindia.com/keshav-enterprises-73664698/product-services.html',
		'https://www.exportersindia.com/keshav-enterprises-shamli/about-us.htm',
		'https://www.justdial.com/Shamli/Keshav-Enterprises-Near-Subash-Ki-Chakki-Dayanand-Nagar/9999PX131-X131-230101014709-T5P8_BZDET/products-Turbine-Spare-Part',
		'https://www.linkedin.com/in/keshav-enterprises-825a473b8',
		'https://www.instagram.com/ksengg007',
		'https://x.com/ksengg007',
		'https://www.reddit.com/user/NoDragonfly4979/',
		'https://www.youtube.com/@ksengg007',
		'https://www.facebook.com/ksengg007',
	],
	knowsAbout: [
		'Steam Turbine Maintenance',
		'Turbine Reverse Engineering',
		'Lube Oil Filtration',
		'Industrial Expansion Joints',
		'Turbine Spares Manufacturing',
		'Dynamic Balancing',
		'Triveni Turbines',
		'Siemens Turbines',
		'BHEL Turbines',
		'Belliss and Morcom Turbines',
	],
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
				text: 'Keshav Enterprises services all major turbine makes including Triveni, Siemens, BHEL, Belliss & Morcom, Maxwatt, Man Turbo, Chola Turbo, DLF-Skoda, KKK, and ABB — covering turbines from 5 kW to 27 MW.',
			},
		},
		{
			'@type': 'Question',
			name: 'Does Keshav Enterprises offer emergency turbine breakdown support?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Yes. Keshav Enterprises provides 24×7 emergency turbine breakdown support with engineers stationed at multiple locations across India. Contact us on WhatsApp at +91 6397363268 for immediate assistance.',
			},
		},
		{
			'@type': 'Question',
			name: 'What is the power range of turbines Keshav Enterprises can overhaul?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Keshav Enterprises handles steam turbines from 5 kW to 27 MW — both back-pressure and condensing types, horizontal and vertical, single and multi-stage.',
			},
		},
		{
			'@type': 'Question',
			name: 'Can Keshav Enterprises reverse engineer obsolete turbine parts?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Yes. Using 3D laser scanners, CMM coordinate measuring machines, and PMI material testing, Keshav Enterprises reverse engineers obsolete turbine components to exact OEM dimensional and material standards.',
			},
		},
		{
			'@type': 'Question',
			name: 'Where is Keshav Enterprises located?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Keshav Enterprises is located at Dayanand Nagar Gali No.2, Near Subash Ki Chakki, Shamli – 247776, Uttar Pradesh, India.',
			},
		},
	],
};

// ─── UTILITY ──────────────────────────────────────────────────
const waMsg = (text) =>
	`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;

const getCategoryIcon = (category) => {
	const cls =
		'w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500';
	switch (category) {
		case 'Industrial Filtration':
			return <Filter className={cls} />;
		case 'Industrial Strainers':
			return <Droplets className={cls} />;
		case 'Expansion Joints':
			return <Layers className={cls} />;
		case 'Turbine Spares':
			return <Cog className={cls} />;
		case 'Flexible Hoses & Assemblies':
			return <Activity className={cls} />;
		case 'Industrial Rubber Products':
			return <Hexagon className={cls} />;
		case 'Electronic Equipments':
			return <Cpu className={cls} />;
		default:
			return <Settings className="w-16 h-16 text-slate-300" />;
	}
};

// PERF: preconnect and dns-prefetch injected once at module level —
// avoids re-querying/creating DOM nodes on every page transition.
if (typeof document !== 'undefined') {
	const addLink = (rel, href, crossOrigin) => {
		const sel = `link[rel="${rel}"][href="${href}"]`;
		if (!document.querySelector(sel)) {
			const el = document.createElement('link');
			el.rel = rel;
			el.href = href;
			if (crossOrigin !== undefined) el.crossOrigin = crossOrigin;
			document.head.appendChild(el);
		}
	};
	addLink('preconnect', 'https://fonts.googleapis.com');
	addLink('preconnect', 'https://fonts.gstatic.com', '');
	addLink('dns-prefetch', 'https://api.whatsapp.com');
	addLink('dns-prefetch', 'https://www.indiamart.com');
	// Hero image preload is injected conditionally in the App component
	// only when the user is on the homepage — see App() useEffect.
}

// ─── ANALYTICS: GA4 + Microsoft Clarity ──────────────────────
// HOW TO USE:
//   1. Replace 'G-XXXXXXXXXX' below with your real GA4 Measurement ID
//      (Google Analytics → Admin → Data Streams → Web → Measurement ID)
//   2. Replace 'XXXXXXXXXX' in the Clarity block with your real Clarity Project ID
//      (clarity.microsoft.com → Settings → Setup)
//   3. Both are injected once at module load — no re-injection on route changes.
//
const GA4_ID = 'G-XXXXXXXXXX'; // ← REPLACE with your GA4 Measurement ID
const CLARITY_ID = 'XXXXXXXXXX'; // ← REPLACE with your Clarity Project ID

if (typeof document !== 'undefined') {
	// ── Google Analytics 4 ──
	if (
		!document.getElementById('ga4-script') &&
		!GA4_ID.includes('XXXXXXXXXX')
	) {
		const s1 = document.createElement('script');
		s1.id = 'ga4-script';
		s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
		s1.async = true;
		document.head.appendChild(s1);

		const s2 = document.createElement('script');
		s2.id = 'ga4-init';
		s2.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}',{page_path:window.location.hash});`;
		document.head.appendChild(s2);

		// Track hash-based SPA navigation
		window.addEventListener('popstate', () => {
			if (typeof window.gtag !== 'undefined') {
				window.gtag('event', 'page_view', { page_path: window.location.hash });
			}
		});
	}

	// ── Microsoft Clarity ──
	if (
		!document.getElementById('clarity-script') &&
		!CLARITY_ID.includes('XXXXXXXXXX')
	) {
		const cs = document.createElement('script');
		cs.id = 'clarity-script';
		cs.type = 'text/javascript';
		cs.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`;
		document.head.appendChild(cs);
	}
}

// ─── SEO HEAD ─────────────────────────────────────────────────
// SITE_URL: Update this to your live domain once deployed
// IMPORTANT: Generate a sitemap.xml at /public/sitemap.xml covering all 105 product
// pages (/product/*), 7 service pages (/service/*), 7 industry pages (/industry/*),
// blog posts, and static pages. Also add /public/robots.txt pointing to the sitemap.
const SITE_URL = 'https://keshaventerprises.in';
const OG_IMAGE = `${SITE_URL}/og-image.webp`; // Upload a 1200x630 px og-image.webp to /public
const SITE_KEYWORDS =
	'turbine maintenance India, steam turbine overhauling, turbine reverse engineering, industrial turbine spares, lube oil filter elements, expansion joints India, Triveni turbine service, BHEL turbine spares, turbine erection Uttar Pradesh, Shamli engineering';

const SEOHead = memo(
	({ title, description, schema, pageType, canonicalPath, publishedTime }) => {
		useEffect(() => {
			const fullTitle = title
				? `${title} | Keshav Enterprises`
				: 'Keshav Enterprises | Industrial Turbine Engineering — Shamli, UP';
			const fullDesc =
				description ||
				'Precision turbine engineering, overhauling, reverse engineering, and OEM-compatible industrial spares — Keshav Enterprises, Shamli, UP, India.';
			const canonical = canonicalPath
				? `${SITE_URL}${canonicalPath}`
				: SITE_URL;

			document.title = fullTitle;

			const sm = (sel, attr, val, content) => {
				let t = document.querySelector(sel);
				if (!t) {
					t = document.createElement('meta');
					t.setAttribute(attr, val);
					document.head.appendChild(t);
				}
				t.content = content;
			};
			const sl = (rel, href, attrs) => {
				const key = attrs?.as
					? `link[rel="${rel}"][as="${attrs.as}"][href="${href}"]`
					: `link[rel="${rel}"][href="${href}"]`;
				let t =
					document.querySelector(key) ||
					document.querySelector(
						`link[rel="${rel}"]${attrs?.as ? '' : ''}${!attrs?.as ? `[href="${href}"]` : ''}`,
					);
				if (!t) {
					t = document.createElement('link');
					t.rel = rel;
					document.head.appendChild(t);
				}
				t.href = href;
				if (attrs)
					Object.entries(attrs).forEach(([k, v]) => {
						if (k === 'crossorigin') t.crossOrigin = v;
						else t.setAttribute(k, v);
					});
			};

			// ── Core meta ──
			sm('meta[name="description"]', 'name', 'description', fullDesc);
			sm('meta[name="keywords"]', 'name', 'keywords', SITE_KEYWORDS);
			sm(
				'meta[name="robots"]',
				'name',
				'robots',
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			);
			sm('meta[name="author"]', 'name', 'author', 'Keshav Enterprises');
			sm('meta[name="theme-color"]', 'name', 'theme-color', '#0A192F');

			// ── Canonical ──
			sl('canonical', canonical);

			// ── Viewport meta ──
			if (!document.querySelector('meta[name="viewport"]')) {
				const vm = document.createElement('meta');
				vm.name = 'viewport';
				vm.content = 'width=device-width, initial-scale=1, maximum-scale=5';
				document.head.appendChild(vm);
			}

			// ── LLM / AI Crawler Discovery (llms.txt standard) ──
			// Helps AI assistants (ChatGPT, Gemini, Claude, Perplexity) find structured content
			sl('help', `${SITE_URL}/llms.txt`, {
				type: 'text/plain',
				title: 'LLM-readable site summary',
			});
			sl('help', `${SITE_URL}/llms-full.txt`, {
				type: 'text/plain',
				title: 'LLM-readable full catalog',
			});

			// ── Open Graph ──
			sm('meta[property="og:title"]', 'property', 'og:title', fullTitle);
			sm(
				'meta[property="og:description"]',
				'property',
				'og:description',
				fullDesc,
			);
			sm(
				'meta[property="og:type"]',
				'property',
				'og:type',
				pageType === 'article' ? 'article' : 'website',
			);
			sm('meta[property="og:url"]', 'property', 'og:url', canonical);
			sm('meta[property="og:image"]', 'property', 'og:image', OG_IMAGE);
			sm(
				'meta[property="og:image:width"]',
				'property',
				'og:image:width',
				'1200',
			);
			sm(
				'meta[property="og:image:height"]',
				'property',
				'og:image:height',
				'630',
			);
			sm(
				'meta[property="og:image:alt"]',
				'property',
				'og:image:alt',
				'Keshav Enterprises — Industrial Turbine Engineering, Shamli, UP',
			);
			sm('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');
			sm(
				'meta[property="og:site_name"]',
				'property',
				'og:site_name',
				'Keshav Enterprises',
			);
			if (pageType === 'article' && publishedTime) {
				sm(
					'meta[property="article:published_time"]',
					'property',
					'article:published_time',
					publishedTime,
				);
				sm(
					'meta[property="article:author"]',
					'property',
					'article:author',
					'Keshav Enterprises Engineering Team',
				);
				sm(
					'meta[property="article:section"]',
					'property',
					'article:section',
					'Industrial Engineering',
				);
			}

			// ── Twitter Card ──
			sm(
				'meta[name="twitter:card"]',
				'name',
				'twitter:card',
				'summary_large_image',
			);
			sm('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
			sm(
				'meta[name="twitter:description"]',
				'name',
				'twitter:description',
				fullDesc,
			);
			sm('meta[name="twitter:image"]', 'name', 'twitter:image', OG_IMAGE);
			sm(
				'meta[name="twitter:image:alt"]',
				'name',
				'twitter:image:alt',
				'Keshav Enterprises — Industrial Turbine Engineering',
			);

			// ── Geo ──
			sm('meta[name="geo.region"]', 'name', 'geo.region', 'IN-UP');
			sm(
				'meta[name="geo.placename"]',
				'name',
				'geo.placename',
				'Shamli, Uttar Pradesh',
			);
			sm(
				'meta[name="geo.position"]',
				'name',
				'geo.position',
				'29.4476;77.3003',
			);
			sm('meta[name="ICBM"]', 'name', 'ICBM', '29.4476, 77.3003');

			// ── JSON-LD ──
			if (schema) {
				let ld = document.getElementById('ld-json');
				if (!ld) {
					ld = document.createElement('script');
					ld.id = 'ld-json';
					ld.type = 'application/ld+json';
					document.head.appendChild(ld);
				}
				ld.textContent = JSON.stringify(schema);
			}
		}, [title, description, schema, pageType, canonicalPath, publishedTime]);
		return null;
	},
);
SEOHead.displayName = 'SEOHead';

// ─── BRAND LOGO ───────────────────────────────────────────────
const BrandLogo = memo(({ scrolled, forceWhite, navigate }) => {
	const [imgErr, setImgErr] = useState(false);
	const tc = forceWhite
		? 'text-white'
		: scrolled
			? 'text-slate-900'
			: 'text-white';

	return (
		<button
			type="button"
			onClick={() => navigate('/')}
			aria-label="Keshav Enterprises — Home"
			className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
		>
			{/* HARD WRAPPER FIX */}
			<div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 overflow-hidden rounded-lg flex items-center justify-center">
				{!imgErr ? (
					<img
						src="keshav-logo.png"
						alt="Keshav Enterprises"
						width="48"
						height="48"
						loading="eager"
						decoding="async"
						fetchPriority="high"
						className="w-full h-full object-contain group-hover:scale-105"
						onError={() => setImgErr(true)}
					/>
				) : (
					<div className="w-full h-full rounded-xl bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-blue-400/30">
						<Settings
							className="w-5 h-5 sm:w-6 sm:h-6 text-white"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>

			<div
				className={`font-black text-xl sm:text-2xl tracking-tight ${tc} flex items-center`}
			>
				KESHAV ENTERPRISES
			</div>
		</button>
	);
});
BrandLogo.displayName = 'BrandLogo';

const MakeInIndiaBadge = memo(() => {
	const [e, sE] = useState(false);
	return (
		<div
			className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl w-fit"
			role="img"
			aria-label="Make In India — Vocal For Local"
		>
			{!e ? (
				<img
					src="make-in-india.png"
					alt="Make In India"
					width="32"
					height="32"
					loading="lazy"
					decoding="async"
					fetchPriority="low"
					className="h-8 object-contain"
					onError={() => sE(true)}
				/>
			) : (
				<div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
					<Zap className="w-4 h-4 text-white" aria-hidden="true" />
				</div>
			)}
			<div className="flex flex-col justify-center border-l border-white/20 pl-3">
				<span className="text-white font-black text-sm leading-none uppercase tracking-widest">
					Make In India
				</span>
				<span className="text-white text-[11px] font-extrabold leading-none uppercase tracking-wider mt-1">
					Vocal For Local
				</span>
			</div>
		</div>
	);
});
MakeInIndiaBadge.displayName = 'MakeInIndiaBadge';

const IndiaMartBadge = memo(() => {
	const [e, sE] = useState(false);
	return (
		<a
			href={CONTACT_INFO.indiamart}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="View Keshav Enterprises on IndiaMART — Verified Supplier 4.3/5 rating"
			className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20 shadow-xl hover:bg-white/10 transition-colors group cursor-pointer w-fit"
		>
			{!e ? (
				<div className="h-8 bg-white rounded px-1.5 flex items-center justify-center">
					<img
						src="indiamart-logo.png"
						alt="IndiaMART"
						width="60"
						height="20"
						loading="lazy"
						decoding="async"
						fetchPriority="low"
						className="h-5 object-contain"
						onError={() => sE(true)}
					/>
				</div>
			) : (
				<div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700">
					<CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
				</div>
			)}
			<div className="flex flex-col justify-center border-l border-white/20 pl-3">
				<span className="text-white font-black text-sm leading-none tracking-widest">
					IndiaMART Verified
				</span>
				<span
					role="img"
					className="text-yellow-400 text-[10px] font-extrabold leading-none uppercase tracking-wider mt-1.5"
					aria-label="4.3 out of 5 stars"
				>
					★★★★★{' '}
					<span className="text-blue-200 ml-1.5 tracking-widest">
						4.3/5 RATING
					</span>
				</span>
			</div>
		</a>
	);
});
IndiaMartBadge.displayName = 'IndiaMartBadge';

// ─── PRODUCT CARD (Memoized) ─────────────────────────────────
const ProductCard = memo(({ product, navigate, priority = false }) => {
	const [imgErr, setImgErr] = useState(false);
	const [imgLoaded, setImgLoaded] = useState(false);
	const pImg = product.images?.[0];
	return (
		<button
			type="button"
			onClick={() => navigate(`/product/${product.id}`)}
			aria-label={`View ${product.title}`}
			className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group flex flex-col h-full cursor-pointer outline-none focus-within:ring-4 focus-within:ring-blue-500/50 w-full text-left"
		>
			{/* Fixed-height image container prevents layout shift (CLS fix) */}
			{/* key={pImg} remounts subtree when image changes, resetting imgErr/imgLoaded without an effect */}
			<div key={pImg} className="h-64 product-img-bg border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
				<span className="absolute top-3 left-3 bg-white/95 text-slate-900 border border-slate-200 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded z-20 shadow-sm backdrop-blur-sm">
					{product.category}
				</span>
				{pImg && !imgErr ? (
					<>
						{!imgLoaded && (
							<>
								<div className="skeleton-shimmer" aria-hidden="true" />
								<div className="skeleton-product" aria-hidden="true" />
							</>
						)}
						<div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 z-0">
							<img
								src={pImg}
								alt={product.title}
								loading={priority ? 'eager' : 'lazy'}
								decoding={priority ? 'sync' : 'async'}
								fetchPriority={priority ? 'high' : 'low'}
								className={`media-img max-w-full max-h-full w-auto h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? 'is-loaded' : ''}`}
								onLoad={() => setImgLoaded(true)}
								onError={() => {
									setImgErr(true);
									setImgLoaded(false);
								}}
							/>
						</div>
					</>
				) : (
					<div
						className="z-0 w-full h-full flex items-center justify-center bg-slate-100/60"
						aria-hidden="true"
					>
						{getCategoryIcon(product.category)}
					</div>
				)}
			</div>
			<div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
				<h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
					<a
						href={`#/product/${product.id}`}
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							navigate(`/product/${product.id}`);
						}}
						className="focus:outline-none focus-visible:underline"
					>
						{product.title}
					</a>
				</h3>
				<p className="text-slate-600 font-medium text-sm md:text-base mb-6 leading-relaxed line-clamp-2">
					{product.desc}
				</p>
				<div className="mb-6 flex items-start bg-blue-50/50 p-4 rounded-lg border border-blue-100/50 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
					<Target
						className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0"
						aria-hidden="true"
					/>
					<p className="text-sm text-slate-700 font-medium leading-relaxed line-clamp-2">
						<strong className="text-slate-900 font-bold">Application: </strong>
						{product.usage}
					</p>
				</div>
				<div className="flex flex-col xl:flex-row gap-3 mt-auto pt-5 border-t border-slate-100">
					<a
						href={waMsg(
							`Hello KESHAV ENTERPRISES, I need a quotation for: ${product.title}.`,
						)}
						target="_blank"
						rel="noopener noreferrer"
						onClick={(e) => e.stopPropagation()}
						aria-label={`Request quote for ${product.title} via WhatsApp`}
						className="flex-1 bg-[#25D366] text-white flex items-center justify-center py-3.5 text-sm font-bold rounded-lg hover:bg-[#1ebe5d] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
					>
						<MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" /> RFQ /
						WhatsApp
					</a>
					<div
						className="flex-1 bg-slate-900 text-white flex items-center justify-center py-3.5 text-sm font-bold rounded-lg group-hover:bg-blue-600 transition-all pointer-events-none"
						aria-hidden="true"
					>
						Technical Specs{' '}
						<ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
					</div>
				</div>
			</div>
		</button>
	);
});
ProductCard.displayName = 'ProductCard';

// ─── LANGUAGE SWITCHER ────────────────────────────────────────
const LANGUAGES = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'hi', name: 'Hindi', flag: '🇮🇳' },
	{ code: 'zh-CN', name: 'Mandarin', flag: '🇨🇳' },
	{ code: 'es', name: 'Spanish', flag: '🇪🇸' },
	{ code: 'fr', name: 'French', flag: '🇫🇷' },
	{ code: 'ar', name: 'Arabic', flag: '🇦🇪' },
	{ code: 'ru', name: 'Russian', flag: '🇷🇺' },
	{ code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
	{ code: 'de', name: 'German', flag: '🇩🇪' },
	{ code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

// Cookie helpers (avoids direct document.cookie access per lint rules)
const getCookie = (name) => {
	const match = document.cookie.match(
		new RegExp(
			`(?:^|; )${name.replace(/([.$?*|{}()[\]/+^])/g, '\\$1')}=([^;]*)`,
		),
	);
	return match ? decodeURIComponent(match[1]) : undefined;
};
const setCookie = (name, value, attrs = {}) => {
	let str = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
	if (attrs.path) str += `; path=${attrs.path}`;
	if (attrs.domain) str += `; domain=${attrs.domain}`;
	// biome-ignore lint/suspicious/noDocumentCookie: direct assignment required for cookie write
	document.cookie = str;
};

const LanguageSwitcher = memo(({ scrolled }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentLang, setCurrentLang] = useState(() => {
		const langVal = getCookie('googtrans');
		if (langVal) {
			const langMatch = langVal.match(/^\/en\/(.+)$/);
			if (langMatch) return langMatch[1];
		}
		return 'en';
	});
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const changeLanguage = (langCode) => {
		setCurrentLang(langCode);
		setIsOpen(false);
		setCookie('googtrans', `/en/${langCode}`, {
			path: '/',
			domain: window.location.hostname,
		});
		setCookie('googtrans', `/en/${langCode}`, { path: '/' }); // for localhost and IP addresses
		window.location.reload();
	};

	const activeLang =
		LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Change Language"
				className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm ${scrolled ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600' : 'bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md'}`}
			>
				<span aria-hidden="true" className="text-base leading-none">
					{activeLang.flag}
				</span>
				<span className="hidden xl:inline-block">
					{activeLang.code.toUpperCase()}
				</span>
				<svg
					aria-hidden="true"
					className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-250">
					<div className="max-h-80 overflow-y-auto py-2 scrollbar-hide">
						{LANGUAGES.map((lang) => (
							<button
								type="button"
								key={lang.code}
								onClick={() => changeLanguage(lang.code)}
								className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center gap-3 transition-colors hover:bg-blue-50 focus:outline-none focus:bg-blue-50 ${currentLang === lang.code ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'}`}
							>
								<span className="text-lg leading-none">{lang.flag}</span>
								{lang.name}
								{currentLang === lang.code && (
									<CheckCircle2
										className="w-4 h-4 ml-auto text-blue-500"
										aria-hidden="true"
									/>
								)}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
});
LanguageSwitcher.displayName = 'LanguageSwitcher';

// ─── NAVBAR ───────────────────────────────────────────────────
const Navbar = memo(({ currentPath, navigate }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [scrolled, setScrolled] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const menuRef = useRef(null);
	const searchInputRef = useRef(null);
	// PERF: ref mirrors query so outside-click handler reads current value without
	// needing query in its dependency array (which would re-register on every keystroke)
	const queryRef = useRef('');
	// PERF: mirror isOpen/isSearchOpen in refs so scroll handler reads current values
	// without needing them in its deps array (which caused listener re-registration on every toggle)
	const isOpenRef = useRef(false);
	const isSearchOpenRef = useRef(false);

	useEffect(() => {
		isOpenRef.current = isOpen;
	}, [isOpen]);
	useEffect(() => {
		isSearchOpenRef.current = isSearchOpen;
	}, [isSearchOpen]);

	useEffect(() => {
		let scrollTimeout;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setScrolled(currentScrollY > 20);

			// Smart hide/show logic: Hide while scrolling, show when stopped
			if (
				currentScrollY < 100 ||
				isOpenRef.current ||
				isSearchOpenRef.current
			) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}

			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				setIsVisible(true);
			}, 350); // Show after 350ms of no scrolling
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(scrollTimeout);
		};
	}, []);

	const prevSearchOpenRef = useRef(isSearchOpen);
	useEffect(() => {
		if (isSearchOpen && window.innerWidth >= 1024) {
			setTimeout(() => searchInputRef.current?.focus(), 100);
		}
		if (prevSearchOpenRef.current && !isSearchOpen) {
			// Clear query after close — deferred to avoid setState cascade
			const t = setTimeout(() => setQuery(''), 0);
			return () => clearTimeout(t);
		}
		prevSearchOpenRef.current = isSearchOpen;
	}, [isSearchOpen]);

	// AUDIT FIX: Body scroll lock when mobile menu/search is open
	useEffect(() => {
		if (typeof document === 'undefined') return;
		if ((isOpen || isSearchOpen) && window.innerWidth < 1024) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen, isSearchOpen]);

	const q = query.toLowerCase().trim();
	// keep ref in sync for the event handler
	useEffect(() => {
		queryRef.current = query;
	}, [query]);
	const searchResults = useMemo(() => {
		if (!q) return [];
		return [
			...SERVICES.filter(
				(s) =>
					s.title?.toLowerCase().includes(q) ||
					s.desc?.toLowerCase().includes(q),
			).map((s) => ({
				id: s.id,
				title: s.title,
				desc: s.desc,
				type: 'Service',
				path: `/service/${s.id}`,
				image: s.image,
			})),
			...RAW_PRODUCTS.filter(
				(p) =>
					p.title?.toLowerCase().includes(q) ||
					p.desc?.toLowerCase().includes(q) ||
					p.category?.toLowerCase().includes(q),
			).map((p) => ({
				id: p.id,
				title: p.title,
				desc: p.desc,
				type: 'Product',
				category: p.category,
				path: `/product/${p.id}`,
				image: p.images?.[0],
			})),
		].slice(0, 8);
	}, [q]);

	// PERF: combine outside-click and Escape into one effect with one pair of listeners
	useEffect(() => {
		const onMouse = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsOpen(false);
				// read latest query via ref to avoid adding query to deps (would re-register on every keystroke)
				setIsSearchOpen((prev) => {
					if (!queryRef.current) return false;
					return prev;
				});
			}
		};
		const onKey = (e) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
				setIsSearchOpen(false);
			}
		};
		document.addEventListener('mousedown', onMouse);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onMouse);
			document.removeEventListener('keydown', onKey);
		};
	}, []);
	const isActive = useCallback(
		(path) => {
			if (path === '/' && currentPath !== '/') return false;
			if (currentPath.startsWith('/product/') && path === '/products')
				return true;
			return currentPath.startsWith(path);
		},
		[currentPath],
	);
	const handleNav = useCallback(
		(path) => {
			navigate(path);
			setIsOpen(false);
		},
		[navigate],
	);
	return (
		<nav
			ref={menuRef}
			aria-label="Main navigation"
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.3,0,0,1)] border-b ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-white/97 backdrop-blur-xl border-slate-200 shadow-lg py-2' : 'bg-[#0A192F]/95 backdrop-blur-sm border-white/10 py-3'}`}
		>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-100 font-bold"
			>
				Skip to main content
			</a>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">
					<BrandLogo scrolled={scrolled} navigate={navigate} />
					<div className="hidden lg:flex items-center gap-1 xl:gap-2">
						{NAV_LINKS.map((link) => (
							<a
								key={link.name}
								href={`#${link.path}`}
								onClick={(e) => {
									e.preventDefault();
									handleNav(link.path);
								}}
								aria-current={isActive(link.path) ? 'page' : undefined}
								className={`relative px-3 py-2 text-[13px] font-bold uppercase tracking-wider transition-all duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group
                  ${
										isActive(link.path)
											? scrolled
												? 'text-blue-600'
												: 'text-white'
											: scrolled
												? 'text-slate-600 hover:text-slate-900'
												: 'text-slate-300 hover:text-white'
									}`}
							>
								{link.name}
								<span
									className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300
                  ${isActive(link.path) ? 'w-3/4 bg-blue-500' : 'w-0 group-hover:w-1/2 bg-blue-400/60'}`}
									aria-hidden="true"
								/>
							</a>
						))}
						{/* search + language switcher */}
						<div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200/20">
							<search
								className="relative flex items-center"
								onMouseEnter={() => setIsSearchOpen(true)}
								onMouseLeave={() => {
									if (!query) setIsSearchOpen(false);
								}}
							>
								<div
									className={`absolute right-full mr-2 flex items-center overflow-hidden transition-all duration-500 ease-in-out z-50 ${isSearchOpen ? 'w-64 xl:w-80 opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'}`}
								>
									<input
										ref={searchInputRef}
										type="text"
										placeholder="Search products & services..."
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										className={`w-64 xl:w-80 border rounded-full py-2.5 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-lg ${scrolled ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-500' : 'bg-slate-800/95 backdrop-blur border-slate-700 text-white placeholder:text-slate-400'}`}
									/>
								</div>
								<button
									type="button"
									onClick={() => {
										if (isSearchOpen) {
											setIsSearchOpen(false);
											setQuery('');
										} else {
											setIsSearchOpen(true);
										}
									}}
									aria-label="Search"
									className={`p-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 relative z-60
                    ${scrolled ? 'bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'}
                    ${isSearchOpen ? 'ml-1' : ''}`}
								>
									<Search
										className="w-4.5 h-4.5"
										aria-hidden="true"
										style={{ width: '18px', height: '18px' }}
									/>
								</button>
								{isSearchOpen && query && (
									<div className="absolute top-full right-0 mt-6 w-125 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-200">
										<div className="max-h-[60vh] overflow-y-auto p-2">
											{searchResults.length === 0 ? (
												<div className="p-6 text-center text-slate-500 font-medium text-sm">
													No results found for &ldquo;{query}&rdquo;
												</div>
											) : (
												<ul className="space-y-1">
													{searchResults.map((r) => (
														<li key={r.id}>
															<button
																type="button"
																onClick={() => {
																	setIsSearchOpen(false);
																	setQuery('');
																	navigate(r.path);
																	setIsOpen(false);
																}}
																className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors flex flex-col gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
															>
																<div className="flex gap-3 w-full items-center">
																	<div className="w-12 h-12 shrink-0 rounded bg-slate-100 border border-slate-200/50 overflow-hidden flex items-center justify-center relative shadow-sm">
																		<span className="text-slate-400 font-black text-xs uppercase tracking-widest">
																			{r.title.substring(0, 2)}
																		</span>
																		{r.image && (
																			<img
																				src={r.image}
																				alt=""
																				className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
																				onError={(e) => {
																					e.target.style.display = 'none';
																				}}
																			/>
																		)}
																	</div>
																	<div className="flex-1 min-w-0 flex flex-col justify-center">
																		<div className="flex justify-between items-start">
																			<span className="font-bold text-slate-900 text-sm line-clamp-2 pr-2">
																				{r.title}
																			</span>
																			<div className="flex items-center gap-1 shrink-0 ml-2 mt-0.5">
																				{r.type === 'Product' && (
																					<span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
																						{r.category}
																					</span>
																				)}
																				<span
																					className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${r.type === 'Product' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}
																				>
																					{r.type}
																				</span>
																			</div>
																		</div>
																		<span className="text-xs text-slate-500 line-clamp-1 mt-0.5">
																			{r.desc}
																		</span>
																	</div>
																</div>
															</button>
														</li>
													))}
												</ul>
											)}
										</div>
									</div>
								)}
							</search>
						</div>
						<button
							type="button"
							onClick={() => handleNav('/contact')}
							className={`ml-2 px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide whitespace-nowrap transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300
                ${scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-400 ring-1 ring-white/20'}`}
						>
							Get Quote
						</button>
					</div>
					{/* Mobile controls */}
					<div className="lg:hidden flex items-center gap-1.5">
						<LanguageSwitcher scrolled={scrolled} />
						<button
							type="button"
							onClick={() => {
								if (isSearchOpen) {
									setIsSearchOpen(false);
									setQuery('');
								} else {
									setIsSearchOpen(true);
								}
							}}
							aria-label="Search products and services"
							className={`p-2.5 rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${scrolled ? 'bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'}`}
						>
							<Search className="h-5 w-5" aria-hidden="true" />
						</button>
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							aria-label={
								isOpen ? 'Close navigation menu' : 'Open navigation menu'
							}
							aria-expanded={isOpen}
							aria-controls="mobile-nav"
							className={`p-2.5 rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${scrolled ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'}`}
						>
							{isOpen ? (
								<X className="h-5 w-5" aria-hidden="true" />
							) : (
								<Menu className="h-5 w-5" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>
			{/* Mobile drawer */}
			{(isOpen || isSearchOpen) && (
				<div
					id="mobile-nav"
					className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 max-h-[85vh] overflow-y-auto"
					role="menu"
				>
					{isSearchOpen && (
						<div className="px-4 pt-4 pb-3 border-b border-slate-100">
							<div className="relative">
								<Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
								<input
									type="text"
									placeholder="Search products & services..."
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="w-full bg-slate-100 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-500 text-sm"
								/>
							</div>
							{query && (
								<div className="max-h-[45vh] overflow-y-auto mt-2 bg-white rounded-xl border border-slate-100 shadow-inner">
									{searchResults.length === 0 ? (
										<div className="p-4 text-center text-slate-500 text-sm">
											No results for &ldquo;{query}&rdquo;
										</div>
									) : (
										<ul className="divide-y divide-slate-100">
											{searchResults.map((r) => (
												<li key={r.id}>
													<button
														type="button"
														onClick={() => {
															setIsSearchOpen(false);
															setQuery('');
															navigate(r.path);
															setIsOpen(false);
														}}
														className="w-full text-left p-3 hover:bg-slate-50 transition-colors flex gap-3 items-center focus:outline-none"
													>
														<div className="w-10 h-10 shrink-0 rounded-lg bg-slate-100 border border-slate-200/50 overflow-hidden flex items-center justify-center relative">
															<span className="text-slate-400 font-black text-xs">
																{r.title.substring(0, 2)}
															</span>
															{r.image && (
																<img
																	src={r.image}
																	alt=""
																	className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
																	onError={(e) => {
																		e.target.style.display = 'none';
																	}}
																/>
															)}
														</div>
														<div className="flex-1 min-w-0">
															<span className="font-bold text-slate-900 text-sm line-clamp-1 block">
																{r.title}
															</span>
															<span
																className={`text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${r.type === 'Product' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}
															>
																{r.type}
															</span>
														</div>
													</button>
												</li>
											))}
										</ul>
									)}
								</div>
							)}
						</div>
					)}
					{isOpen && !query && (
						<div className="px-4 py-5">
							<ul className="space-y-1 mb-5">
								{NAV_LINKS.map((link) => (
									<li key={link.name}>
										<a
											href={`#${link.path}`}
											role="menuitem"
											onClick={(e) => {
												e.preventDefault();
												handleNav(link.path);
											}}
											aria-current={isActive(link.path) ? 'page' : undefined}
											className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-bold tracking-tight transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                        ${isActive(link.path) ? 'text-blue-600 bg-blue-50 border border-blue-100' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
										>
											{link.name}
											{isActive(link.path) && (
												<span
													className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"
													aria-hidden="true"
												/>
											)}
										</a>
									</li>
								))}
							</ul>
							<div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
								<a
									href={waMsg(
										'Hi KESHAV ENTERPRISES, I would like to get a technical quote.',
									)}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3.5 rounded-xl text-sm font-black tracking-wide shadow-md"
								>
									<MessageCircle className="w-5 h-5" aria-hidden="true" />{' '}
									WhatsApp Us
								</a>
								<a
									href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g, '')}`}
									className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-black tracking-wide border transition-all
                    ${scrolled ? 'bg-slate-900 text-white border-slate-800 hover:bg-blue-700' : 'bg-slate-900 text-white border-slate-700'}`}
								>
									<Phone className="w-4 h-4" aria-hidden="true" />{' '}
									{CONTACT_INFO.phones[0]}
								</a>
							</div>
						</div>
					)}
				</div>
			)}
		</nav>
	);
});
Navbar.displayName = 'Navbar';

// ─── FOOTER ───────────────────────────────────────────────────
const Footer = memo(({ navigate }) => (
	<footer
		className="bg-slate-950 text-slate-400 font-sans border-t-4 border-blue-600 cv-auto"
		role="contentinfo"
	>
		{/* Top accent line */}
		<div className="h-0.5 w-full bg-blue-500" aria-hidden="true" />

		{/* ── Pre-footer CTA band ── */}
		<div className="bg-linear-to-r from-slate-950 via-blue-900 to-slate-950 border-b border-blue-900/50 relative overflow-hidden">
			<div
				className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"
				aria-hidden="true"
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="text-center md:text-left">
						<h2 className="text-white font-serif italic text-2xl md:text-3xl tracking-wide mb-2 drop-shadow-md">
							Need a quote or have an emergency breakdown?
						</h2>
						<p className="text-blue-200 font-mono text-sm tracking-wide uppercase font-semibold drop-shadow-sm">
							Our engineering team responds within 24 hours
						</p>
					</div>
					<div className="flex flex-wrap gap-4 shrink-0 justify-center">
						<a
							href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g, '')}`}
							className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 border border-blue-500/50 hover:border-blue-400 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all focus:outline-none shadow-[0_4px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.4)] hover:-translate-y-1"
						>
							<Phone
								className="w-5 h-5 text-blue-300 group-hover:text-white shrink-0"
								aria-hidden="true"
							/>
							{CONTACT_INFO.phones[0]}
						</a>
						<a
							href={waMsg(
								'Hi KESHAV ENTERPRISES, I would like to request a technical quote.',
							)}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fbc5a] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all focus:outline-none shadow-[0_4px_20px_rgba(37,211,102,0.2)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.4)] hover:-translate-y-1"
						>
							<MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
							WhatsApp Now
						</a>
					</div>
				</div>
			</div>
		</div>

		{/* ── Main footer body ── */}
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
			{/* ── 4-column grid ── */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-12 gap-y-16 mb-20">
				{/* Col 1 — Brand (4 cols) */}
				<div className="lg:col-span-4">
					<div className="mb-6">
						<BrandLogo scrolled={false} forceWhite={true} navigate={navigate} />
					</div>
					<p className="text-slate-300 font-sans text-sm leading-relaxed mb-8 max-w-sm">
						20+ years delivering ex-OEM turbine engineering, precision reverse
						engineering, and certified industrial spares across India.
					</p>

					{/* Credential chips */}
					<div className="flex flex-col gap-4 mb-8">
						{[
							{
								imgSrc: 'msme-logo.png',
								Icon: Shield,
								iconColor: 'text-emerald-400',
								title: 'MSME Registered',
								sub: CONTACT_INFO.msme,
							},
							{
								imgSrc: 'indiamart-logo.png',
								Icon: Award,
								iconColor: 'text-amber-400',
								title: 'IndiaMART TrustSeal',
								sub: '4.3★ Verified Supplier',
							},
							{
								imgSrc: 'make-in-india.png',
								Icon: Globe,
								iconColor: 'text-cyan-400',
								title: 'Make In India',
								sub: 'Manufactured in India',
							},
						].map(({ imgSrc, Icon, iconColor, title, sub }) => (
							<div
								key={title}
								className="flex items-center gap-5 bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 shadow-md rounded-2xl p-4 w-fit transition-all hover:translate-x-2"
							>
								<div className="w-14 h-14 shrink-0 flex items-center justify-center relative bg-white rounded-xl p-2 border border-slate-200 shadow-inner">
									<img
										src={imgSrc}
										alt={title}
										className="w-full h-full object-contain"
										onError={(e) => {
											e.target.style.display = 'none';
											e.target.nextElementSibling.style.display = 'block';
										}}
									/>
									<Icon
										className={`w-full h-full ${iconColor} hidden`}
										aria-hidden="true"
									/>
								</div>
								<div>
									<p className="text-white font-bold text-sm uppercase tracking-wider mb-1">
										{title}
									</p>
									<p className="text-blue-400 font-mono text-xs tracking-widest">
										{sub}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* OEM compatibility */}
					<p className="font-bold text-[10px] text-blue-500 uppercase tracking-[0.2em] mb-2">
						OEM Compatible With
					</p>
					<p className="text-slate-400 font-mono text-xs leading-relaxed">
						{OEMS.join(' · ')}
					</p>
				</div>

				{/* Col 2 — Navigate (2 cols) */}
				<nav className="lg:col-span-2" aria-label="Footer site links">
					<h3 className="font-bold text-[11px] text-white uppercase tracking-[0.2em] mb-6 border-b border-slate-800 pb-2 inline-block">
						Navigate
					</h3>
					<ul className="space-y-4">
						{NAV_LINKS.map((link) => (
							<li key={link.name}>
								<a
									href={`#${link.path}`}
									onClick={(e) => {
										e.preventDefault();
										navigate(link.path);
									}}
									className="text-slate-400 hover:text-white font-medium text-sm transition-colors flex items-center gap-3 group focus:outline-none w-fit"
								>
									<ChevronRight
										className="w-4 h-4 text-blue-500/50 group-hover:text-blue-400 transition-colors"
										aria-hidden="true"
									/>
									<span>{link.name}</span>
								</a>
							</li>
						))}
					</ul>
				</nav>

				{/* Col 3 — Services (3 cols) */}
				<div className="lg:col-span-3">
					<h3 className="font-bold text-[11px] text-white uppercase tracking-[0.2em] mb-6 border-b border-slate-800 pb-2 inline-block">
						Core Services
					</h3>
					<ul className="space-y-4">
						{[
							{ label: 'Turbine Erection', id: 'srv_1' },
							{ label: 'Turnkey Overhauling', id: 'srv_2' },
							{ label: 'Reverse Engineering', id: 'srv_3' },
							{ label: 'Dynamic Balancing', id: 'srv_4' },
							{ label: 'Lube Oil Flushing', id: 'srv_5' },
							{ label: 'Machine Alignment', id: 'srv_6' },
						].map(({ label, id }) => (
							<li key={id}>
								<a
									href={`#/service/${id}`}
									onClick={(e) => {
										e.preventDefault();
										navigate(`/service/${id}`);
									}}
									className="text-slate-400 hover:text-white font-medium text-sm transition-colors flex items-center gap-3 group focus:outline-none w-fit"
								>
									<Hexagon
										className="w-3.5 h-3.5 text-blue-500/50 group-hover:text-blue-400 transition-colors"
										aria-hidden="true"
									/>
									<span>{label}</span>
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* Col 4 — Contact (3 cols) */}
				<address className="lg:col-span-3 not-italic">
					<h3 className="font-bold text-[11px] text-white uppercase tracking-[0.2em] mb-6 border-b border-slate-800 pb-2 inline-block">
						Contact Us
					</h3>

					<div className="space-y-5">
						{/* Address */}
						<div className="flex items-start gap-4 group">
							<div className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:border-blue-500/50 transition-colors">
								<MapPin className="w-4 h-4 text-blue-400" aria-hidden="true" />
							</div>
							<p className="text-slate-400 text-sm leading-relaxed">
								{CONTACT_INFO.address}
							</p>
						</div>

						{/* Phones */}
						<div className="flex items-start gap-4 group">
							<div className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:border-blue-500/50 transition-colors">
								<Phone className="w-4 h-4 text-blue-400" aria-hidden="true" />
							</div>
							<div className="flex flex-col gap-1.5 mt-1">
								{CONTACT_INFO.phones.map((p) => (
									<a
										key={p}
										href={`tel:${p.replace(/\s/g, '')}`}
										className="text-slate-300 hover:text-white font-mono text-sm transition-colors focus:outline-none focus-visible:underline"
									>
										{p}
									</a>
								))}
							</div>
						</div>

						{/* Emails — all 4 addresses */}
						<div className="flex items-start gap-4 group">
							<div className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:border-blue-500/50 transition-colors">
								<Mail className="w-4 h-4 text-blue-400" aria-hidden="true" />
							</div>
							<div className="flex flex-col gap-2 mt-1 min-w-0 flex-1">
								{[
									{ addr: CONTACT_INFO.email, label: 'General' },
									{ addr: CONTACT_INFO.infoEmail, label: 'Info' },
									{ addr: CONTACT_INFO.secondaryEmail, label: 'Director' },
									{ addr: CONTACT_INFO.marketingEmail, label: 'Marketing' },
								].map(({ addr, label }) => (
									<a
										key={addr}
										href={`mailto:${addr}`}
										className="flex flex-col text-slate-300 hover:text-white text-sm transition-colors focus:outline-none focus-visible:underline group/email"
									>
										<span className="truncate group-hover/email:text-blue-300 transition-colors">
											{addr}
										</span>
										<span className="font-mono text-[9px] uppercase tracking-widest text-slate-600 group-hover/email:text-blue-500 transition-colors">
											{label}
										</span>
									</a>
								))}
							</div>
						</div>
					</div>
				</address>
			</div>

			{/* ── Divider ── */}
			<div className="h-px w-full bg-slate-800 mb-12" />

			{/* ── Social media links ── */}
			<div className="mb-14">
				<div className="flex flex-wrap justify-center gap-3">
					{[
						{
							href: CONTACT_INFO.linkedin,
							label: `LinkedIn — ${CONTACT_INFO.linkedinHandle}`,
							name: 'LinkedIn',
							bg: '#0A66C2',
						},
						{
							href: CONTACT_INFO.youtube,
							label: `YouTube — ${CONTACT_INFO.youtubeHandle}`,
							name: 'YouTube',
							bg: '#FF0000',
						},
						{
							href: CONTACT_INFO.instagram,
							label: `Instagram — ${CONTACT_INFO.instagramHandle}`,
							name: 'Instagram',
							bg: '#E1306C',
						},
						{
							href: CONTACT_INFO.facebook,
							label: `Facebook — ${CONTACT_INFO.facebookHandle}`,
							name: 'Facebook',
							bg: '#1877F2',
						},
						{
							href: CONTACT_INFO.twitter,
							label: `X — ${CONTACT_INFO.twitterHandle}`,
							name: 'X',
							bg: '#000000',
						},
						{
							href: CONTACT_INFO.reddit,
							label: `Reddit — ${CONTACT_INFO.redditHandle}`,
							name: 'Reddit',
							bg: '#FF4500',
						},
					].map(({ href, label, name, bg }) => (
						<a
							key={name}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className="flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-300 px-5 py-4 rounded-xl transition-all hover:bg-slate-50 shadow-md hover:shadow-lg hover:-translate-y-1 group focus:outline-none w-[calc(50%-6px)] sm:w-auto"
						>
							<span
								aria-hidden="true"
								className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-white transition-colors shrink-0 shadow-sm border border-slate-100"
								style={{ color: bg }}
							>
								{name === 'X' ? (
									<svg
										aria-hidden="true"
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
									</svg>
								) : name === 'LinkedIn' ? (
									<svg
										aria-hidden="true"
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
								) : name === 'YouTube' ? (
									<svg
										aria-hidden="true"
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
									</svg>
								) : name === 'Instagram' ? (
									<svg
										aria-hidden="true"
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
									</svg>
								) : name === 'Facebook' ? (
									<svg
										aria-hidden="true"
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z" />
									</svg>
								) : (
									<svg
										aria-hidden="true"
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M14.2 15.6c-.5.5-1.3.5-1.8 0-.4-.5-.4-1.3 0-1.8.5-.5 1.3-.5 1.8 0 .5.5.5 1.3 0 1.8zm-4.4 0c-.5.5-1.3.5-1.8 0-.5-.5-.5-1.3 0-1.8.5-.5 1.3-.5 1.8 0 .5.5.5 1.3 0 1.8zm4.4-7.5 2.2.5c.1 0 .2 0 .3-.1l1.5-1.5c.5-.5.5-1.3 0-1.8s-1.3-.5-1.8 0l-1 1-1.5-.3c-1-.7-2.3-1.1-3.6-1.1-3.5 0-6.4 2.3-7.5 5.5H1.5C.7 10.3 0 11 0 11.8v.4c0 .8.7 1.5 1.5 1.5h1c.5 3.8 3.8 6.7 7.8 6.7s7.3-2.9 7.8-6.7h1c.8 0 1.5-.7 1.5-1.5v-.4c0-.8-.7-1.5-1.5-1.5h-1.2c-.5-1-1.2-1.8-2-2.5z" />
									</svg>
								)}
							</span>
							<span
								className="font-black text-base tracking-wide transition-colors"
								style={{ color: bg }}
							>
								{name}
							</span>
						</a>
					))}
				</div>
			</div>

			{/* ── Industries served ── */}
			<div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-10">
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
					<div className="flex-1">
						<p className="font-bold text-[11px] text-white uppercase tracking-[0.2em] mb-4">
							Industries Served
						</p>
						<div className="flex flex-wrap gap-2">
							{[
								{
									name: 'Power Generation',
									text: 'text-yellow-400',
									bg: 'bg-yellow-500/15',
									border: 'border-yellow-500/30',
								},
								{
									name: 'Sugar Mills',
									text: 'text-green-400',
									bg: 'bg-green-500/15',
									border: 'border-green-500/30',
								},
								{
									name: 'Paper & Pulp',
									text: 'text-blue-400',
									bg: 'bg-blue-500/15',
									border: 'border-blue-500/30',
								},
								{
									name: 'Oil & Gas',
									text: 'text-orange-400',
									bg: 'bg-orange-500/15',
									border: 'border-orange-500/30',
								},
								{
									name: 'Petrochemical',
									text: 'text-purple-400',
									bg: 'bg-purple-500/15',
									border: 'border-purple-500/30',
								},
								{
									name: 'Agro & Food',
									text: 'text-teal-400',
									bg: 'bg-teal-500/15',
									border: 'border-teal-500/30',
								},
								{
									name: 'Cement',
									text: 'text-stone-400',
									bg: 'bg-stone-500/15',
									border: 'border-stone-500/30',
								},
							].map((ind) => (
								<span
									key={ind.name}
									className={`text-xs ${ind.text} ${ind.bg} ${ind.border} border px-3 py-1.5 rounded-full font-bold`}
								>
									{ind.name}
								</span>
							))}
						</div>
					</div>
					<div className="lg:text-right shrink-0">
						<p className="font-bold text-[11px] text-white uppercase tracking-[0.2em] mb-2">
							Capability Range
						</p>
						<p className="text-white font-black text-3xl tracking-tight">
							5 kW <span className="text-slate-600 font-normal mx-1">–</span> 27
							MW
						</p>
					</div>
				</div>
			</div>

			{/* ── Bottom copyright bar ── */}
			<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-800">
				<p className="text-slate-400 text-sm">
					© {new Date().getFullYear()} Keshav Enterprises. All rights reserved.
				</p>
				<p className="text-slate-400 text-sm flex items-center gap-2">
					<span>GST:</span>
					<span className="text-slate-300 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
						{CONTACT_INFO.gst}
					</span>
				</p>
			</div>
		</div>
	</footer>
));
Footer.displayName = 'Footer';

// ─── DIGITAL PROFILES STRIP ──────────────────────────────────
// PERF: Defined outside component — constant data, no reason to recreate on every render
const DIGITAL_PROFILES = [
	{
		name: 'Google Business',
		href: CONTACT_INFO.googleBusiness,
		badge: 'Google Verified',
		badgeColor: '#1a56db',
		badgeBg: '#e8f0fe',
		imgSrc: 'google-business.webp',
		imgAlt: 'Google Business',
	},
	{
		name: 'IndiaMART',
		href: CONTACT_INFO.indiamart,
		badge: '4.3★ TrustSeal',
		badgeColor: '#b45309',
		badgeBg: '#fef3c7',
		imgSrc: 'indiamart.webp',
		imgAlt: 'IndiaMART',
	},
	{
		name: 'TradeIndia',
		href: CONTACT_INFO.tradeindia,
		badge: 'Verified Supplier',
		badgeColor: '#1e40af',
		badgeBg: '#dbeafe',
		imgSrc: 'tradeindia.webp',
		imgAlt: 'TradeIndia',
	},
	{
		name: 'ExporterIndia',
		href: CONTACT_INFO.exportersindia,
		badge: 'Export Ready',
		badgeColor: '#166534',
		badgeBg: '#dcfce7',
		imgSrc: 'exportersindia.webp',
		imgAlt: 'ExporterIndia',
	},
	{
		name: 'JustDial',
		href: CONTACT_INFO.justdial,
		badge: 'Local Verified',
		badgeColor: '#9a3412',
		badgeBg: '#ffedd5',
		imgSrc: 'justdial.webp',
		imgAlt: 'JustDial',
	},
];

const DigitalProfilesStrip = memo(() => {
	const profiles = DIGITAL_PROFILES;

	return (
		<section
			aria-labelledby="digital-profiles-heading"
			className="bg-slate-50 py-14 border-t border-slate-200 cv-auto"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<p className="text-xs font-black text-slate-500 uppercase tracking-[0.25em] mb-3">
						Find Us Everywhere
					</p>
					<h2
						id="digital-profiles-heading"
						className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-3"
					>
						Verified Across India&apos;s Top Business Directories
					</h2>
					<p className="text-slate-500 font-medium text-sm max-w-xl mx-auto">
						Our business profile is verified and active on every major B2B and
						local search platform in India.
					</p>
				</div>
				<div className="flex flex-wrap justify-center gap-4 dir-cards-grid">
					{profiles.map((p) => (
						<a
							key={p.name}
							href={p.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`View Keshav Enterprises on ${p.name}`}
							className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl px-5 py-4 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dir-card"
						>
							<div
								className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-slate-100"
								style={{ backgroundColor: p.badgeBg }}
							>
								<img
									src={p.imgSrc}
									alt={p.imgAlt}
									className="w-7 h-7 object-contain"
									loading="lazy"
									decoding="async"
									fetchPriority="low"
									width="28"
									height="28"
								/>
							</div>
							<div className="flex flex-col min-w-0">
								<span className="font-black text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors truncate">
									{p.name}
								</span>
								<span
									className="text-[11px] font-black mt-1 px-2 py-0.5 rounded-full w-fit"
									style={{ color: p.badgeColor, backgroundColor: p.badgeBg }}
								>
									{p.badge}
								</span>
							</div>
							<ExternalLink
								className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-400 transition-colors ml-auto shrink-0"
								aria-hidden="true"
							/>
						</a>
					))}
				</div>
			</div>
		</section>
	);
});
DigitalProfilesStrip.displayName = 'DigitalProfilesStrip';

// ─── WHATSAPP + CALL FAB ─────────────────────────────────────
const FloatingButtons = memo(() => (
	<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
		<a
			href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g, '')}`}
			className="flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-full shadow-lg hover:bg-slate-50 hover:scale-105 transition-all group font-bold text-sm"
			aria-label={`Call Keshav Enterprises: ${CONTACT_INFO.phones[0]}`}
		>
			<Phone className="w-4 h-4 text-blue-600" aria-hidden="true" />
			<span className="hidden group-hover:block">{CONTACT_INFO.phones[0]}</span>
		</a>
		<a
			href={waMsg(
				'Hi KESHAV ENTERPRISES, I would like to request a technical quote.',
			)}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Chat with Keshav Enterprises on WhatsApp"
			className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300 group relative"
		>
			<MessageCircle className="w-7 h-7" aria-hidden="true" />
			<span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
				Speak directly with an engineer
			</span>
		</a>
	</div>
));
FloatingButtons.displayName = 'FloatingButtons';

// ─── PRODUCT DETAIL PAGE ─────────────────────────────────────
// PERF: memo prevents re-render when parent re-renders but productId/navigate are unchanged
const ProductDetailPage = memo(({ productId, navigate }) => {
	const [activeImg, setActiveImg] = useState(0);
	const [imgErr, setImgErr] = useState(false);
	const [imgLoaded, setImgLoaded] = useState(false);
	const [tab, setTab] = useState('specs');
	const product = useMemo(
		() => PRODUCTS.find((p) => p.id === productId),
		[productId],
	);

	const [prevProductId, setPrevProductId] = useState(productId);
	if (productId !== prevProductId) {
		setPrevProductId(productId);
		setActiveImg(0);
		setImgErr(false);
		setImgLoaded(false);
		setTab('specs');
	}
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [productId]);

	const [prevActiveImg, setPrevActiveImg] = useState(activeImg);
	if (activeImg !== prevActiveImg) {
		setPrevActiveImg(activeImg);
		setImgLoaded(false);
		setImgErr(false);
	}
	const related = useMemo(
		() =>
			product
				? PRODUCTS.filter(
						(p) => p.category === product.category && p.id !== product.id,
					).slice(0, 3)
				: [],
		[product],
	);
	const productSchema = useMemo(
		() =>
			product
				? {
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
									seller: {
										'@type': 'Organization',
										name: 'Keshav Enterprises',
									},
									priceCurrency: 'INR',
									priceSpecification: {
										'@type': 'PriceSpecification',
										priceCurrency: 'INR',
									},
								},
								manufacturer: {
									'@type': 'Organization',
									name: 'Keshav Enterprises',
									url: 'https://keshaventerprises.in',
								},
							},
							{
								'@type': 'BreadcrumbList',
								itemListElement: [
									{
										'@type': 'ListItem',
										position: 1,
										name: 'Products',
										item: 'https://keshaventerprises.in/#/products',
									},
									{ '@type': 'ListItem', position: 2, name: product.category },
									{
										'@type': 'ListItem',
										position: 3,
										name: product.title,
										item: `https://keshaventerprises.in/#/product/${product.id}`,
									},
								],
							},
						],
					}
				: null,
		[product],
	);
	if (!product)
		return (
			<main
				id="main-content"
				tabIndex={-1}
				className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center bg-slate-50"
			>
				<SEOHead title="Product Not Found" />
				<div>
					<Settings
						className="w-20 h-20 text-slate-300 mx-auto mb-6"
						aria-hidden="true"
					/>
					<h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
						Product Not Found
					</h1>
					<button
						type="button"
						onClick={() => navigate('/products')}
						className="text-blue-600 font-bold hover:underline text-lg"
					>
						Return to Catalog
					</button>
				</div>
			</main>
		);
	const activeImage = product.images?.[activeImg];
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className="pt-28 pb-20 bg-slate-50 min-h-screen"
		>
			<SEOHead
				title={`${product.title} | ${product.category}`}
				description={`${product.desc} — Keshav Enterprises, Shamli, UP.`}
				schema={productSchema}
				canonicalPath={`/product/${product.id}`}
				pageType="website"
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<nav
					aria-label="Breadcrumb"
					className="flex items-center text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest flex-wrap gap-2"
				>
					<button
						type="button"
						onClick={() => navigate('/products')}
						className="hover:text-blue-600 transition-colors flex items-center focus:outline-none focus-visible:underline"
					>
						<ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Catalog
					</button>
					<span aria-hidden="true" className="mx-1">
						/
					</span>
					<button
						type="button"
						onClick={() => navigate('/products')}
						className="hover:text-blue-600 transition-colors text-slate-400 focus:outline-none focus-visible:underline"
					>
						{product.category}
					</button>
					<span aria-hidden="true" className="mx-1">
						/
					</span>
					<span
						className="text-slate-800 truncate max-w-50 md:max-w-full"
						aria-current="page"
					>
						{product.title}
					</span>
				</nav>
				<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200 mb-10">
					<div className="grid grid-cols-1 lg:grid-cols-12">
						<div className="lg:col-span-5 p-8 lg:p-10 bg-white flex flex-col items-center border-b lg:border-b-0 lg:border-r border-slate-100">
							<div
								className="w-full aspect-square product-img-bg rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden mb-6 shadow-inner"
								role="img"
								aria-label={`Product image of ${product.title}`}
							>
								{activeImage && !imgErr ? (
									<>
										{!imgLoaded && (
											<>
												<div className="skeleton-shimmer" aria-hidden="true" />
												<div className="skeleton-product" aria-hidden="true" />
											</>
										)}
										<div className="absolute inset-0 flex items-center justify-center p-6">
											<img
												src={activeImage}
												alt={`${product.title} view ${activeImg + 1}`}
												loading="eager"
												decoding="async"
												fetchPriority="high"
												className={`media-img max-w-full max-h-full w-auto h-auto object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.1)] ${imgLoaded ? 'is-loaded' : ''}`}
												onLoad={() => setImgLoaded(true)}
												onError={() => {
													setImgErr(true);
													setImgLoaded(false);
												}}
											/>
										</div>
									</>
								) : (
									<div
										className="flex flex-col items-center justify-center opacity-30"
										aria-hidden="true"
									>
										{getCategoryIcon(product.category)}
										<span className="mt-6 font-bold text-slate-500 uppercase tracking-widest text-sm">
											Image Pending
										</span>
									</div>
								)}
							</div>
							{product.images?.length > 1 && (
								<ul
									className="flex gap-4 w-full overflow-x-auto pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] thumb-strip list-none m-0 p-0"
									aria-label="Product thumbnails"
								>
									{product.images.map((img, idx) => (
										<li key={img} className="shrink-0">
											<button
												type="button"
												onClick={() => {
													setActiveImg(idx);
													setImgErr(false);
													setImgLoaded(false);
												}}
												aria-label={`View image ${idx + 1}`}
												aria-pressed={activeImg === idx}
												className={`w-20 h-20 bg-white rounded-xl border-2 overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeImg === idx ? 'border-blue-600 shadow-lg scale-105' : 'border-slate-200 hover:border-blue-400 opacity-70 hover:opacity-100'}`}
											>
												<img
													src={img}
													alt=""
													loading="lazy"
													width="80"
													height="80"
													className="w-full h-full object-contain p-1.5 mix-blend-multiply"
													onError={(e) => {
														e.target.closest('button').style.display = 'none';
													}}
												/>
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="lg:col-span-7 p-8 lg:p-12 flex flex-col bg-linear-to-br from-white to-slate-50/50">
							<div className="mb-5">
								<span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-4 py-2 uppercase tracking-widest rounded-md shadow-sm">
									{product.category}
								</span>
							</div>
							<h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-5 leading-[1.1] tracking-tight">
								{product.title}
							</h1>
							<p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">
								{product.desc}
							</p>
							<div className="mb-8 bg-slate-900 p-6 rounded-2xl shadow-lg relative overflow-hidden">
								<div
									className="absolute top-0 right-0 p-4 opacity-10"
									aria-hidden="true"
								>
									<Factory className="w-32 h-32 text-white" />
								</div>
								<div className="relative z-10">
									<h2 className="font-black text-blue-400 text-sm uppercase tracking-widest mb-3 flex items-center">
										<Target className="w-5 h-5 mr-3" aria-hidden="true" />{' '}
										Primary Industrial Application
									</h2>
									<p className="text-white font-medium text-base leading-relaxed">
										{product.usage}
									</p>
								</div>
							</div>
							<div
								role="tablist"
								aria-label="Product information"
								className="mb-6"
							>
								<div className="flex border-b border-slate-200 mb-6 gap-1">
									{[
										['specs', 'Technical Data'],
										['features', 'Key Features'],
									].map(([k, label]) => (
										<button
											type="button"
											key={k}
											role="tab"
											id={`tab-${k}`}
											aria-controls={`panel-${k}`}
											aria-selected={tab === k}
											onClick={() => setTab(k)}
											className={`px-5 py-3 text-sm font-black uppercase tracking-wider rounded-t-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${tab === k ? 'bg-blue-600 text-white border-b-2 border-blue-600 -mb-px' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
										>
											{label}
										</button>
									))}
								</div>
								<div
									id={`panel-${tab}`}
									role="tabpanel"
									aria-labelledby={`tab-${tab}`}
								>
									{tab === 'specs' && product.specs && (
										<div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
											<table className="w-full text-left border-collapse min-w-[320px]">
												<caption className="sr-only">
													Technical specifications for {product.title}
												</caption>
												<tbody className="divide-y divide-slate-100">
													{Object.entries(product.specs).map(([k, v], i) => (
														<tr
															key={k}
															className={`transition-colors hover:bg-blue-50/30 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
														>
															<th
																scope="row"
																className="p-4 w-2/5 text-slate-500 font-black text-xs uppercase tracking-widest border-r border-slate-100 text-left"
															>
																{k}
															</th>
															<td className="p-4 text-slate-800 font-semibold text-sm leading-relaxed">
																{v}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									)}
									{tab === 'features' && (
										<ul className="border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
											{product.features.map((f) => (
												<li
													key={f}
													className="bg-white hover:bg-slate-50 transition-colors p-4 md:p-5 text-slate-800 font-medium text-sm flex items-start"
												>
													<CheckCircle2
														className="w-5 h-5 text-blue-500 mr-4 shrink-0 mt-0.5"
														aria-hidden="true"
													/>
													{f}
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
							<div className="mt-auto pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-5">
								<a
									href={waMsg(
										`Hello KESHAV ENTERPRISES, I am interested in: *${product.title}*. Please share technical specs and quote.`,
									)}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 bg-[#25D366] text-white py-5 rounded-xl font-black text-lg hover:bg-[#1ebe5d] transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
								>
									<MessageCircle className="w-6 h-6 mr-3" aria-hidden="true" />{' '}
									Request Quote via WhatsApp
								</a>
								<a
									href={CONTACT_INFO.indiamart}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 bg-white border-2 border-slate-900 text-slate-900 py-5 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-all shadow-sm hover:-translate-y-0.5 flex items-center justify-center tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
								>
									<ExternalLink className="w-6 h-6 mr-3" aria-hidden="true" />{' '}
									View on IndiaMART
								</a>
							</div>
						</div>
					</div>
				</div>
				{related.length > 0 && (
					<section aria-labelledby="related-heading" className="mt-10">
						<h2
							id="related-heading"
							className="text-2xl font-black text-slate-900 mb-6 tracking-tight"
						>
							Related Products in {product.category}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{related.map((p) => (
								<ProductCard key={p.id} product={p} navigate={navigate} />
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	);
});
ProductDetailPage.displayName = 'ProductDetailPage';

// ─── FEATURED PRODUCTS STRIP ─────────────────────────────────
// rAF auto-scroll + seamless infinite loop + touch drag + nav arrows
const CARD_W = 296; // card width (w-72 = 288px) + gap (8px) ≈ 296px
const SPEED = 0.7; // px per animation frame (~42px/s at 60fps)

const FeaturedProductImage = memo(({ product }) => {
	const [imgLoaded, setImgLoaded] = useState(false);
	const [imgErr, setImgErr] = useState(false);
	const pImg = product.images?.[0];
	return (
		<div
			className="h-48 product-img-bg border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0"
			style={{ minHeight: '12rem' }}
		>
			<span className="absolute top-3 left-3 bg-white/95 text-slate-900 border border-slate-200 text-[9px] font-black px-2.5 py-1 uppercase tracking-widest rounded z-20 shadow-sm pointer-events-none backdrop-blur-sm">
				{product.category}
			</span>
			{pImg && !imgErr ? (
				<>
					{!imgLoaded && (
						<>
							<div className="skeleton-shimmer" aria-hidden="true" />
							<div className="skeleton-product" aria-hidden="true" />
						</>
					)}
					<div className="absolute inset-0 flex items-center justify-center p-3 z-0">
						<img
							src={pImg}
							alt={product.title}
							loading="lazy"
							decoding="async"
							fetchPriority="low"
							className={`media-img max-w-full max-h-full w-auto h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-700 group-hover:scale-110 pointer-events-none ${imgLoaded ? 'is-loaded' : ''}`}
							onLoad={() => setImgLoaded(true)}
							onError={() => {
								setImgErr(true);
								setImgLoaded(false);
							}}
						/>
					</div>
				</>
			) : (
				<div
					className="z-0 w-full h-full flex items-center justify-center pointer-events-none bg-slate-100/60"
					aria-hidden="true"
				>
					{getCategoryIcon(product.category)}
				</div>
			)}
		</div>
	);
});
FeaturedProductImage.displayName = 'FeaturedProductImage';

const FeaturedProductsStrip = memo(({ products, navigate }) => {
	const trackRef = useRef(null); // scrollable div
	const rafRef = useRef(null); // requestAnimationFrame id
	const sectionRef = useRef(null); // section element — used to gate rAF
	const isVisible = useRef(false); // true when section is in viewport
	const isPaused = useRef(false); // pause flag — ref so no re-render
	const isDragging = useRef(false); // drag in progress
	const dragStartX = useRef(0); // pointer x when drag began
	const dragStartSL = useRef(0); // scrollLeft when drag began
	const resumeTimer = useRef(null); // debounce timer for arrow resume
	const [canLeft, setCanLeft] = useState(false);
	const [canRight, setCanRight] = useState(true);

	// doubled list for seamless loop
	const doubled = useMemo(() => [...products, ...products], [products]);
	const halfW = useMemo(() => products.length * CARD_W, [products.length]);

	// ── rAF loop ─────────────────────────────────────────────────
	// PERF: arrow state is sampled every 12 frames (~5x/s) instead of 60fps
	// to avoid triggering 60 React re-renders per second from the rAF loop.
	// PERF: rAF is gated by isVisible — it fully stops when scrolled off-screen.
	const frameCount = useRef(0);
	const tickRef = useRef(null);

	useEffect(() => {
		tickRef.current = () => {
			const el = trackRef.current;
			if (!el || !isVisible.current) {
				rafRef.current = requestAnimationFrame(tickRef.current);
				return;
			}
			if (!isPaused.current) {
				el.scrollLeft += SPEED;
				// seamless reset: when we've scrolled past the first copy, snap back
				if (el.scrollLeft >= halfW) el.scrollLeft -= halfW;
			}
			// update arrow visibility only every 12 frames (~5 updates/s) to avoid
			// calling setState 60 times/s which forces 60 full React re-renders/s
			frameCount.current = (frameCount.current + 1) % 12;
			if (frameCount.current === 0) {
				setCanLeft(el.scrollLeft > 4);
				setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
			}
			rafRef.current = requestAnimationFrame(tickRef.current);
		};
		rafRef.current = requestAnimationFrame(tickRef.current);
		return () => {
			cancelAnimationFrame(rafRef.current);
			clearTimeout(resumeTimer.current);
		};
		// halfW changes only when products list changes — rAF restarts correctly
	}, [halfW]);

	// ── Visibility gate — stop rAF when section is off-screen ────
	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;
		const io = new IntersectionObserver(
			([entry]) => { isVisible.current = entry.isIntersecting; },
			{ rootMargin: '200px 0px 200px 0px', threshold: 0 },
		);
		io.observe(section);
		return () => io.disconnect();
	}, []);

	// ── Pause / resume helpers ────────────────────────────────────
	const pause = useCallback(() => {
		isPaused.current = true;
	}, []);
	const resume = useCallback(() => {
		isPaused.current = false;
	}, []);

	// ── Mouse drag ───────────────────────────────────────────────
	const onMouseDown = useCallback(
		(e) => {
			pause();
			isDragging.current = true;
			dragStartX.current = e.pageX;
			dragStartSL.current = trackRef.current?.scrollLeft ?? 0;
			// prevent text selection while dragging
			e.currentTarget.style.userSelect = 'none';
		},
		[pause],
	);

	const onMouseMove = useCallback((e) => {
		if (!isDragging.current) return;
		const delta = dragStartX.current - e.pageX;
		if (trackRef.current)
			trackRef.current.scrollLeft = dragStartSL.current + delta;
	}, []);

	const onMouseUp = useCallback(
		(e) => {
			isDragging.current = false;
			e.currentTarget.style.userSelect = '';
			resume();
		},
		[resume],
	);

	const onMouseLeave = useCallback(
		(e) => {
			if (isDragging.current) {
				isDragging.current = false;
				e.currentTarget.style.userSelect = '';
			}
			resume();
		},
		[resume],
	);

	const onMouseEnter = useCallback(() => {
		pause();
	}, [pause]);

	// ── Touch drag ───────────────────────────────────────────────
	const onTouchStart = useCallback(
		(e) => {
			pause();
			isDragging.current = true;
			dragStartX.current = e.touches[0].pageX;
			dragStartSL.current = trackRef.current?.scrollLeft ?? 0;
		},
		[pause],
	);

	const onTouchMove = useCallback((e) => {
		if (!isDragging.current) return;
		const delta = dragStartX.current - e.touches[0].pageX;
		if (trackRef.current)
			trackRef.current.scrollLeft = dragStartSL.current + delta;
	}, []);

	const onTouchEnd = useCallback(() => {
		isDragging.current = false;
		resume();
	}, [resume]);

	// ── Nav arrow click ───────────────────────────────────────────
	// Pause while the smooth scroll animation plays, resume after 1.2 s
	const scrollBy = useCallback(
		(dir) => {
			pause();
			clearTimeout(resumeTimer.current);
			const el = trackRef.current;
			if (el) el.scrollBy({ left: dir * CARD_W * 3, behavior: 'smooth' });
			resumeTimer.current = setTimeout(resume, 1200);
		},
		[pause, resume],
	);

	// ── Guard click from drag ─────────────────────────────────────
	// If the user dragged more than 6px, suppress the card click
	const guardClick = useCallback(
		(cb) => (e) => {
			const dist = Math.abs(
				(trackRef.current?.scrollLeft ?? 0) - dragStartSL.current,
			);
			if (dist > 6) {
				e.stopPropagation();
				e.preventDefault();
				return;
			}
			cb(e);
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			className="bg-slate-50 py-20 border-b border-slate-200 lazy-section cv-auto"
			aria-labelledby="featured-products-heading"
		>
			{/* ── Header ── */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row justify-between items-end gap-6">
				<div>
					<h2
						id="featured-products-heading"
						className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4"
					>
						Featured Engineering Products
					</h2>
					<div
						className="section-divider w-20 h-1.5 bg-blue-600 rounded-full shadow-md"
						aria-hidden="true"
					/>
				</div>
				<div className="flex items-center gap-4">
					{/* Nav arrows */}
					{/* biome-ignore lint/a11y/useSemanticElements: toolbar grouping, not a form fieldset */}
					<div role="group" className="flex gap-2" aria-label="Scroll products">
						<button
							type="button"
							onClick={() => scrollBy(-1)}
							disabled={!canLeft}
							aria-label="Scroll left"
							className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${canLeft ? 'border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50' : 'border-slate-200 text-slate-300 cursor-not-allowed'}`}
						>
							<ChevronLeft className="w-5 h-5" aria-hidden="true" />
						</button>
						<button
							type="button"
							onClick={() => scrollBy(1)}
							disabled={!canRight}
							aria-label="Scroll right"
							className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${canRight ? 'border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50' : 'border-slate-200 text-slate-300 cursor-not-allowed'}`}
						>
							<ChevronRight className="w-5 h-5" aria-hidden="true" />
						</button>
					</div>
					<button
						type="button"
						onClick={() => navigate('/products')}
						className="hidden sm:flex items-center font-black text-blue-600 hover:text-blue-800 transition-colors text-lg tracking-tight group focus:outline-none focus-visible:underline"
					>
						View Complete Catalog
						<ArrowRight
							className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
							aria-hidden="true"
						/>
					</button>
				</div>
			</div>

			{/* ── Track ── */}
			<div className="relative">
				{/* Edge fade-out gradients */}
				<div className="absolute left-0 top-0 w-16 md:w-28 h-full bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 w-16 md:w-28 h-full bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

				{/* Scrollable track — overflow hidden on section, auto here lets JS control scrollLeft */}
				<ul
					ref={trackRef}
					className="flex gap-5 px-6 py-5 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none list-none m-0 p-0"
					style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch' }}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					aria-label="Featured products — scroll to browse"
				>
					{doubled.map((product, i) => (
						<li key={`fp-${product.id}-${i}`} className="shrink-0 w-64 md:w-72">
							<button
								type="button"
								onClick={guardClick(() => navigate(`/product/${product.id}`))}
								aria-label={product.title}
								className="group flex flex-col w-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer fp-card focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-left h-full"
							>
								{/* Image — fixed height prevents CLS */}
								<FeaturedProductImage product={product} />

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
											<ArrowRight
												className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors"
												aria-hidden="true"
											/>
										</div>
									</div>
								</div>
							</button>
						</li>
					))}
				</ul>
			</div>

			{/* Mobile CTA */}
			<div className="mt-8 flex justify-center sm:hidden px-4">
				<button
					type="button"
					onClick={() => navigate('/products')}
					className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-md flex items-center justify-center text-base"
				>
					View Complete Catalog{' '}
					<ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
				</button>
			</div>
		</section>
	);
});
FeaturedProductsStrip.displayName = 'FeaturedProductsStrip';

// ─── HOME PAGE ────────────────────────────────────────────────
// PERF: inject global CSS once at module parse time — avoids re-injecting
// on every HomePage mount and eliminates the <style> element inside JSX.
if (
	typeof document !== 'undefined' &&
	!document.getElementById('ke-global-css')
) {
	const styleEl = document.createElement('style');
	styleEl.id = 'ke-global-css';
	styleEl.textContent = MARQUEE_CSS;
	document.head.appendChild(styleEl);
}
const FEATURED_PRODUCTS = (() => {
	const shuffled = [...PRODUCTS];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
})();

const HomePage = memo(({ navigate }) => {
	// PERF FIX: initialise loaded=true immediately — eliminates the old 100ms
	// setTimeout that forced a second render before hero text became visible,
	// delaying LCP and causing a brief flash of invisible above-fold content.
	const [loaded] = useState(true);
	const [heroErr, setHeroErr] = useState(false);
	const [lang] = useState('en'); // 'en' | 'hi'
	const featuredProducts = FEATURED_PRODUCTS;

	const heroContent = {
		en: {
			headline: (
				<>
					Precision Engineering for
					<br />
					<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500">
						Maximum Uptime.
					</span>
				</>
			),
			sub: 'Ex-OEM engineers for Triveni, Siemens, BHEL & 7 more brands. Every overhaul, spare, and service comes with documentation you can take to management — on time, every time.',
			cta1: 'Request a Technical Quote',
			cta2: 'Emergency Breakdown',
		},
		hi: {
			headline: (
				<>
					अधिकतम अपटाइम के लिए
					<br />
					<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500">
						प्रेसिशन इंजीनियरिंग।
					</span>
				</>
			),
			sub: 'Triveni, Siemens, BHEL सहित 10 OEM ब्रांड के पूर्व-इंजीनियर। हर ओवरहॉल, स्पेयर और सर्विस के साथ पूरी डॉक्युमेंटेशन — समय पर, हर बार।',
			cta1: 'तकनीकी कोटेशन मांगें',
			cta2: 'आपातकालीन ब्रेकडाउन',
		},
	};
	const h = heroContent[lang];
	return (
		<main id="main-content" tabIndex={-1} className="bg-white">
			<SEOHead
				title="Industrial Turbine Engineering & Spares — Shamli, UP"
				schema={LOCAL_SCHEMA}
				canonicalPath="/"
				pageType="website"
			/>
			{/* Hero */}
			<section className="hero-section relative bg-[#0A192F] min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden">
				<div className="hero-bg-layer absolute inset-0 z-0" aria-hidden="true">
					{!heroErr && (
						<img
							src="hero-background.png"
							alt=""
							width="1920"
							height="1080"
							fetchPriority="high"
							loading="eager"
							decoding="async"
							sizes="100vw"
							className="hero-bg-img absolute inset-0 w-full h-full object-cover"
							onError={() => setHeroErr(true)}
						/>
					)}
					{/* Mobile: top+bottom vignette — image centre stays fully visible */}
					<div
						className="hero-mobile-vignette absolute inset-0"
						style={{
							background:
								'linear-gradient(to bottom,rgba(10,25,47,0.55) 0%,rgba(10,25,47,0.10) 25%,rgba(10,25,47,0.10) 65%,rgba(10,25,47,0.80) 100%)',
						}}
					/>

					{/* Desktop: left-to-right fade for text panel readability */}
					<div className="hero-desktop-grad absolute inset-0 bg-linear-to-r from-[#0A192F]/90 via-[#0A192F]/55 to-[#0A192F]/10" />

					{/* Bottom ground — both viewports */}
					<div className="hero-bottom-overlay absolute inset-0 bg-linear-to-t from-[#0A192F]/70 via-transparent to-transparent z-10" />

					{/* Glow orbs — desktop only */}
					<div className="hero-glow-orb absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
					<div className="hero-glow-orb absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px]" />
				</div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
					<div className="w-full lg:w-3/5">
						<div
							className={`transform transition-all duration-1000 ease-out ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
						>
							{/* Badges */}
							<div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
								<MakeInIndiaBadge />
								<IndiaMartBadge />
							</div>

							{/* Hero headline */}
							<h1
								id="hero-heading"
								className="hero-h1 text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl text-center lg:text-left"
							>
								{h.headline}
							</h1>

							{/* Pain-point subtext — speaks to procurement heads and plant managers */}
							<div className="glass-hero bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl border-l-4 border-l-cyan-400 p-5 mb-8 max-w-xl shadow-xl mx-auto lg:mx-0">
								<p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed">
									{h.sub}
								</p>
							</div>

							{/* Micro trust-proof strip — reduces fear of contacting an unknown vendor */}
							<div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 mb-8">
								{[
									{ Icon: CheckCircle2, text: '20+ years in service' },
									{ Icon: Shield, text: 'PMI-certified spares' },
									{ Icon: Clock, text: '24×7 emergency response' },
								].map(({ Icon, text }) => (
									<div
										key={text}
										className="flex items-center gap-2 text-slate-300 text-sm font-bold"
									>
										<Icon
											className="w-4 h-4 text-cyan-400 shrink-0"
											aria-hidden="true"
										/>
										<span>{text}</span>
									</div>
								))}
							</div>

							{/* CTAs */}
							<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 justify-center lg:justify-start">
								<button
									type="button"
									onClick={() => navigate('/contact')}
									className="bg-blue-600 text-white px-8 py-4 md:py-5 rounded-xl font-black hover:bg-blue-500 transition-all flex items-center justify-center text-lg md:text-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] group tracking-tight hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 min-h-13"
								>
									{h.cta1}{' '}
									<ArrowRight
										className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform"
										aria-hidden="true"
									/>
								</button>
								<a
									href={waMsg(
										'Hi KESHAV ENTERPRISES, we have an emergency breakdown. Please assist immediately.',
									)}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-white/5 text-white border border-white/20 px-8 py-4 md:py-5 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center text-lg backdrop-blur-md hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-13"
								>
									<LifeBuoy
										className="mr-3 w-6 h-6 text-cyan-400 shrink-0"
										aria-hidden="true"
									/>{' '}
									{h.cta2}
								</a>
							</div>
						</div>
					</div>

					{/* Right-side proof cards — addresses biggest fear: "will this vendor let me down?" */}
					<div
						className="w-full lg:w-2/5 hidden lg:flex flex-col gap-5"
						aria-hidden="true"
					>
						{[
							{
								delay: 'delay-300',
								label: 'No Learning Curve',
								Icon: Award,
								title: 'Ex-OEM Engineers',
								sub: 'Our team has worked inside Triveni, Siemens, BHEL & Belliss — the same expertise, delivered to your plant.',
							},
							{
								delay: 'delay-500',
								label: 'Every Job Documented',
								Icon: CheckCircle2,
								title: 'Report on Delivery',
								sub: 'PMI certs, balancing reports, alignment records, condition reports — handed over at job completion.',
							},
							{
								delay: 'delay-700',
								label: 'When Minutes Matter',
								Icon: PhoneCall,
								title: '24×7 Emergency',
								sub: 'Engineers at multiple locations across India. Call us at 2 AM — someone answers.',
							},
						].map(({ delay, label, Icon, title, sub }, i) => (
							<div
								key={label}
								className={`bg-linear-to-br from-[#0A192F]/80 to-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 ${delay} hover:border-blue-400/40 hover:-translate-y-2 group ${i === 1 ? 'ml-10' : i === 2 ? 'ml-3' : ''} ${loaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}
							>
								<div className="flex justify-between items-start mb-3">
									<div className="text-blue-300 text-xs font-black uppercase tracking-widest">
										{label}
									</div>
									<Icon
										className="w-5 h-5 text-blue-400"
										aria-hidden="true"
									/>
								</div>
								<div className="text-2xl font-black text-white tracking-tighter mb-2">
									{title}
								</div>
								<div className="text-sm text-slate-400 font-medium leading-relaxed">
									{sub}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* OEM Brands */}
			<section
				className="bg-white py-12 md:py-16 border-b border-slate-100 overflow-hidden"
				aria-label="OEM-compatible brands"
			>
				<div className="max-w-7xl mx-auto px-4 mb-8">
					<p className="text-center text-sm font-black text-slate-600 uppercase tracking-widest">
						OEM-Compatible &amp; Trusted By Industry Leaders
					</p>
				</div>
				<div
					className="relative w-full overflow-hidden flex items-center"
					aria-hidden="true"
				>
					<div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
					<div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
					<div className="ke-marquee gap-8 md:gap-16 px-4">
						{[...OEMS, ...OEMS].map((oem, i) => (
							<div
								key={`oem-${oem}-${i}`}
								className="flex items-center justify-center shrink-0 w-40 md:w-56 h-20 p-2"
							>
								<img
									src={`${oem.toLowerCase().replace(/[^a-z0-9]/g, '-')}-logo.png`}
									alt={`${oem} logo`}
									width="160"
									height="60"
									loading="lazy"
									decoding="async"
									fetchPriority="low"
									className="max-h-full max-w-full object-contain"
									onError={(e) => {
										const p = e.target.parentElement;
										if (p) {
											e.target.style.display = 'none';
											const fb = p.querySelector('.oem-fallback');
											if (fb) fb.style.display = 'flex';
										}
									}}
								/>
								<div
									className="oem-fallback items-center justify-center space-x-3 w-full"
									style={{ display: 'none' }}
								>
									<Factory className="w-8 h-8 text-slate-300 shrink-0" />
									<span className="text-sm md:text-base font-black text-slate-700 tracking-widest uppercase truncate">
										{oem}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* Stats */}
			<section
				className="bg-slate-900 py-12 md:py-14 border-b border-slate-800"
				aria-labelledby="stats-heading"
			>
				<h2 id="stats-heading" className="sr-only">
					Company statistics
				</h2>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
						{[
							{
								Icon: Clock,
								stat: '20+',
								label: 'Years Experience',
								sub: 'In turbine engineering',
							},
							{
								Icon: Settings,
								stat: '10+',
								label: 'OEM Brands',
								sub: 'Triveni, Siemens, BHEL & more',
							},
							{
								Icon: TrendingUp,
								stat: '27 MW',
								label: 'Max Turbine',
								sub: 'Upto 27M.W.',
							},
							{
								Icon: Users,
								stat: '24x7',
								label: 'Emergency Support',
								sub: 'Multi-location response',
							},
						].map(({ Icon, stat, label, sub }) => (
							<div key={label} className="text-center">
								<div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
									<Icon
										className="w-6 h-6 text-blue-400"
										aria-hidden="true"
									/>
								</div>
								<div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">
									{stat}
								</div>
								<div className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-1">
									{label}
								</div>
								<div className="text-xs text-slate-400 font-medium">{sub}</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* ── Segment Empathy Bar — speaks to each visitor type's real concern ── */}
			<section
				className="bg-white py-14 border-b border-slate-100 lazy-section cv-auto"
				aria-labelledby="why-us-heading"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<p
						id="why-us-heading"
						className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-10"
					>
						Why Engineers &amp; Plant Managers Choose Keshav Enterprises
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								Icon: Award,
								title: 'Same expertise as your OEM',
								body: 'Our engineers were trained inside Triveni, Siemens, BHEL, and Belliss. No learning curve on your machine.',
								color: 'text-blue-600',
								bg: 'bg-blue-50',
								border: 'border-blue-100',
							},
							{
								Icon: CheckCircle2,
								title: 'Documentation at handover',
								body: 'PMI certificates, balancing reports, condition reports, and ISO cleanliness certification — delivered with every job.',
								color: 'text-emerald-600',
								bg: 'bg-emerald-50',
								border: 'border-emerald-100',
							},
							{
								Icon: Clock,
								title: 'Faster than OEM sourcing',
								body: 'OEM spares take 12–26 weeks. We reverse-engineer, manufacture, and ship certified components in a fraction of the time.',
								color: 'text-amber-600',
								bg: 'bg-amber-50',
								border: 'border-amber-100',
							},
							{
								Icon: PhoneCall,
								title: '24×7 — someone always answers',
								body: "Multi-location engineers across India. Whether it's a scheduled overhaul or a 2 AM trip — we show up.",
								color: 'text-red-600',
								bg: 'bg-red-50',
								border: 'border-red-100',
							},
						].map(({ Icon, title, body, color, bg, border }) => (
							<div
								key={title}
								className={`bg-white border ${border} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all group`}
							>
								<div
									className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4 border ${border}`}
								>
									<Icon
										className={`w-6 h-6 ${color}`}
										aria-hidden="true"
									/>
								</div>
								<h3 className="font-black text-slate-900 text-base mb-2 leading-snug">
									{title}
								</h3>
								<p className="text-slate-500 text-sm leading-relaxed">{body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Featured Products Strip — rAF auto-scroll + touch drag + nav arrows ── */}
			<FeaturedProductsStrip products={featuredProducts} navigate={navigate} />
			{/* Services Preview */}
			<section
				className="py-24 md:py-32 bg-white border-t border-slate-200 cv-auto lazy-section"
				aria-labelledby="services-preview-heading"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<span className="text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">
							End-to-End Turbine Lifecycle
						</span>
						<h2
							id="services-preview-heading"
							className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6"
						>
							Technical Services
						</h2>
						<div
							className="section-divider w-24 h-1.5 bg-blue-600 rounded-full mx-auto mb-6"
							aria-hidden="true"
						/>
						<p className="text-slate-600 font-medium text-xl max-w-3xl mx-auto leading-relaxed">
							From erection to emergency breakdown — the same ex-OEM engineers,
							every time.
						</p>
					</div>

					{/* Pain-aware service cards */}
					{(() => {
						const painLines = {
							srv_1:
								'Starting a new turbine installation and need OEM-level supervision without OEM wait times?',
							srv_2:
								'Tired of vendors who show up under-equipped and deliver no job report?',
							srv_3:
								"OEM quoted months for a spare that's no longer in production?",
							srv_4:
								"Recurring vibration after alignment and bearing replacement — the root cause hasn't been fixed?",
							srv_5:
								'ISO 4406 particle count keeps failing and commissioning is delayed?',
							srv_6:
								'Misalignment is the primary cause of premature bearing failure in your machine?',
							srv_7:
								'Turbine tripped unexpectedly and nobody in the plant can explain why?',
						};
						return (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
								{SERVICES.map((service) => {
									const Icon = SERVICE_ICONS[service.id];
									return (
										<button
											type="button"
											key={service.id}
											onClick={() => navigate(`/service/${service.id}`)}
											className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all group text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
											aria-label={`View details for ${service.title}`}
										>
											<div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
												<Icon
													className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors"
													aria-hidden="true"
												/>
											</div>
											<h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
												{service.title}
											</h3>
											{/* Empathy line — addresses the visitor's specific pain */}
											<p className="text-blue-600/80 text-xs font-bold italic mb-3 leading-snug">
												{painLines[service.id]}
											</p>
											<p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
												{service.desc}
											</p>
											<span className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
												View Full Details{' '}
												<ArrowRight
													className="w-4 h-4 group-hover:translate-x-1 transition-transform"
													aria-hidden="true"
												/>
											</span>
										</button>
									);
								})}
							</div>
						);
					})()}

					<div className="text-center mt-12">
						<button
							type="button"
							onClick={() => navigate('/services')}
							className="bg-slate-900 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-600 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
						>
							View All Services{' '}
							<ArrowRight className="inline ml-3 w-5 h-5" aria-hidden="true" />
						</button>
					</div>
				</div>
			</section>
			{/* ── TESTIMONIALS ── */}
			<section
				className="py-20 md:py-28 bg-white border-t border-slate-100 cv-auto lazy-section"
				aria-labelledby="testimonials-heading"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-14">
						<p className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3">
							From the Plants We Serve
						</p>
						<h2
							id="testimonials-heading"
							className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4"
						>
							What Plant Managers Say
						</h2>
						<div
							className="section-divider w-20 h-1.5 bg-blue-600 rounded-full mx-auto"
							aria-hidden="true"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								quote:
									'Their ex-Triveni engineers handled our 12 MW turbine overhaul during the annual shutdown — all clearances documented, rotor balanced, and back online ahead of schedule. First time in six years we had zero issues at first start-up.',
								name: 'Plant Manager',
								company: 'Sugar & Co-Gen Plant',
								location: 'Uttar Pradesh',
								service: 'Turbine Overhauling',
							},
							{
								quote:
									'We had a critical bearing failure at 2 AM during peak crushing season. Keshav Enterprises had an engineer at site by morning with the replacement Babbitt bearing ready. Downtime was under 14 hours — that saved us crores in cane losses.',
								name: 'Maintenance Head',
								company: 'Sugar Mill',
								location: 'Haryana',
								service: 'Emergency Breakdown Response',
							},
							{
								quote:
									'OEM spares for our 28-year-old Belliss & Morcom turbine had 18-month lead times. Keshav reverse-engineered the rotor shaft and labyrinth rings in 6 weeks with full PMI certificates. Quality was indistinguishable from OEM.',
								name: 'Chief Engineer',
								company: 'Paper Mill & Power Plant',
								location: 'Punjab',
								service: 'Reverse Engineering',
							},
						].map(({ quote, name, company, location, service }) => (
							<figure
								key={name}
								className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
							>
								{/* Service tag */}
								<span className="self-start text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-6">
									{service}
								</span>
								{/* Stars */}
								<div
									role="img"
									className="flex gap-1 mb-5"
									aria-label="5 out of 5 stars"
								>
									{[1, 2, 3, 4, 5].map((s) => (
										<svg
											key={s}
											className="w-4 h-4 text-yellow-400 fill-yellow-400"
											viewBox="0 0 20 20"
											aria-hidden="true"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									))}
								</div>
								{/* Quote */}
								<blockquote className="flex-1 text-slate-700 font-medium text-sm md:text-base leading-relaxed mb-6">
									<span
										className="text-blue-200 text-4xl font-black leading-none select-none"
										aria-hidden="true"
									>
										&ldquo;
									</span>
									{quote}
								</blockquote>
								{/* Attribution */}
								<figcaption className="flex items-center gap-4 pt-5 border-t border-slate-200">
									<div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-200 flex items-center justify-center shrink-0">
										<Users
											className="w-5 h-5 text-blue-600"
											aria-hidden="true"
										/>
									</div>
									<div>
										<p className="font-black text-slate-900 text-sm">{name}</p>
										<p className="text-slate-500 font-medium text-xs">
											{company} · {location}
										</p>
									</div>
								</figcaption>
							</figure>
						))}
					</div>
					{/* Nudge to leave review */}
					<p className="text-center text-slate-400 font-medium text-sm mt-10">
						We&apos;ve served 100+ plants across India.{' '}
						<a
							href={CONTACT_INFO.googleBusiness}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 font-bold hover:underline focus:outline-none focus-visible:underline"
						>
							Leave us a Google review →
						</a>
					</p>
				</div>
			</section>

			{/* Capabilities */}
			<section
				className="py-24 md:py-32 bg-slate-50 border-t border-slate-200 cv-auto lazy-section"
				aria-labelledby="capabilities-heading"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center md:text-left">
						<h2
							id="capabilities-heading"
							className="text-slate-900 text-4xl md:text-5xl font-black mb-6 tracking-tight"
						>
							Precision Manufacturing.
						</h2>
						<div
							className="section-divider w-24 h-1.5 bg-blue-600 mb-8 rounded-full mx-auto md:mx-0"
							aria-hidden="true"
						/>
						<p className="text-slate-600 font-medium text-xl mb-12 leading-relaxed">
							We manufacture high-tolerance turbine spares, industrial
							strainers, and metallic expansion bellows (DN 15 to DN 12,000).
							Using 3D laser scanning, CMM, and PMI testing, we recreate
							obsolete components to exact specifications, drastically reducing
							plant downtime.
						</p>
						<ul
							className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left"
							aria-label="Manufacturing capabilities"
						>
							{[
								'Reduced lead times vs. OEM sourcing (Triveni, Siemens, BHEL)',
								'Material upgrades: Duplex, Incoloy, Inconel, Titanium, Hastelloy',
								'ISO/API standard dynamic balancing (50-2,000 kg capacity)',
								'Custom expansion bellows (DN 15-12,000, up to 150 barg)',
								'Filter elements per ISO 16889, API 614, ASME & EN standards',
								'Lube oil systems per ISO 4406:99 cleanliness classification',
							].map((item) => (
								<li
									key={item}
									className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all"
								>
									<Shield
										className="w-7 h-7 text-blue-500 mr-4 shrink-0"
										aria-hidden="true"
									/>
									<span className="text-slate-800 font-bold text-base leading-snug">
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
			{/* Two-path CTA — addresses both visitor types: planned work vs emergency */}
			<section
				className="bg-[#0A192F] py-20 lazy-section cv-auto"
				aria-labelledby="cta-heading"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2
							id="cta-heading"
							className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
						>
							How Can We Help You Today?
						</h2>
						<p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">
							Whether you&apos;re planning ahead or dealing with an unplanned
							breakdown — there&apos;s a right path for you.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						{/* Path 1 — Planned work */}
						<div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition-all">
							<div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-5 border border-blue-500/30">
								<Settings
									className="w-6 h-6 text-blue-400"
									aria-hidden="true"
								/>
							</div>
							<h3 className="text-xl font-black text-white mb-3">
								Planned Overhaul or RFQ
							</h3>
							<p className="text-slate-400 text-sm leading-relaxed mb-6">
								Scheduled maintenance, spare procurement, expansion joint
								supply, or filter element orders. Share your requirements and
								get a detailed technical quote.
							</p>
							<div className="flex flex-col gap-3">
								<button
									type="button"
									onClick={() => navigate('/contact')}
									className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-xl font-black text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
								>
									Request a Technical Quote{' '}
									<ArrowRight
										className="w-4 h-4 group-hover:translate-x-1 transition-transform"
										aria-hidden="true"
									/>
								</button>
								<a
									href={`mailto:${CONTACT_INFO.infoEmail}`}
									className="w-full bg-white/5 text-slate-300 border border-white/10 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
								>
									<Mail className="w-4 h-4" aria-hidden="true" /> Email Our
									Engineering Team
								</a>
							</div>
						</div>
						{/* Path 2 — Emergency */}
						<div className="bg-white/5 border border-red-500/20 rounded-2xl p-8 hover:border-red-400/40 transition-all">
							<div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-5 border border-red-500/20">
								<LifeBuoy className="w-6 h-6 text-red-400" aria-hidden="true" />
							</div>
							<h3 className="text-xl font-black text-white mb-3">
								Emergency Breakdown — Right Now
							</h3>
							<p className="text-slate-400 text-sm leading-relaxed mb-6">
								Turbine tripped? High vibration? Unexpected shutdown? Our
								engineers are reachable 24×7. Call or WhatsApp immediately —
								every hour offline has a cost.
							</p>
							<div className="flex flex-col gap-3">
								<a
									href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g, '')}`}
									className="w-full bg-red-600 text-white px-6 py-3.5 rounded-xl font-black text-sm hover:bg-red-500 transition-all flex items-center justify-center gap-2"
								>
									<Phone className="w-4 h-4" aria-hidden="true" /> Call Now —{' '}
									{CONTACT_INFO.phones[0]}
								</a>
								<a
									href={waMsg(
										'URGENT: My turbine has tripped / has a breakdown. I need immediate engineering support. Please call back.',
									)}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-black text-sm hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2"
								>
									<MessageCircle className="w-4 h-4" aria-hidden="true" />{' '}
									WhatsApp Emergency
								</a>
							</div>
						</div>
					</div>
					{/* Reassurance strip below CTAs */}
					<div className="flex flex-wrap justify-center gap-8 mt-10">
						{[
							'No obligation technical consultation',
							'Confidential RFQ handling',
							'Response within 24 hours (planned) or within the hour (emergency)',
						].map((item) => (
							<div
								key={item}
								className="flex items-center gap-2 text-slate-400 text-sm font-medium"
							>
								<CheckCircle2
									className="w-4 h-4 text-blue-400 shrink-0"
									aria-hidden="true"
								/>
								<span>{item}</span>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
});
HomePage.displayName = 'HomePage';

// ─── ABOUT PAGE ───────────────────────────────────────────────
const AboutPage = memo(({ navigate }) => {
	const milestones = [
		{
			year: '2000s',
			title: 'Foundation',
			desc: 'Founded in Shamli, UP as a specialist turbine maintenance outfit serving local sugar mills with hands-on overhauling expertise.',
		},
		{
			year: '2005',
			title: 'OEM Expertise',
			desc: 'Built a dedicated team of ex-OEM engineers from Triveni, BHEL, and Belliss & Morcom — enabling true like-for-like OEM maintenance standards.',
		},
		{
			year: '2010',
			title: 'Reverse Engineering',
			desc: 'Invested in 3D laser scanning and CMM equipment to offer in-house reverse engineering for obsolete turbine components with zero OEM dependency.',
		},
		{
			year: '2015',
			title: 'Product Range Expansion',
			desc: 'Launched a comprehensive industrial product line covering filtration, expansion joints, strainers, rubber products, and flexible hose assemblies.',
		},
		{
			year: '2020',
			title: 'ISO/API Balancing',
			desc: 'Commissioned dynamic balancing machines to ISO 1940 / API 670 standards — handling rotors from 50 to 2,000 kg.',
		},
		{
			year: '2026',
			title: 'Pan-India Reach',
			desc: 'Today serving power, sugar, paper, oil & gas, petrochemical, and agro industries across India with 24×7 emergency engineering support.',
		},
	];
	const values = [
		{
			Icon: Shield,
			label: 'Engineering Integrity',
			text: 'Every component, every clearance, every dimension documented and verified. No shortcuts on safety-critical rotating equipment.',
		},
		{
			Icon: Target,
			label: 'OEM-Grade Standards',
			text: 'Ex-OEM engineers from Triveni, Siemens, BHEL, and ABB delivering maintenance at the same standard as the original manufacturer.',
		},
		{
			Icon: Zap,
			label: 'Innovation in Reverse Engineering',
			text: '3D scanning and PMI testing give clients access to obsolete spares without 12–18 month OEM lead times.',
		},
		{
			Icon: Users,
			label: 'Customer Uptime First',
			text: 'We measure success in plant availability. 24×7 emergency response because shutdowns do not follow business hours.',
		},
	];
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className="pt-24 pb-20 bg-white min-h-screen"
		>
			<SEOHead
				title="About Keshav Enterprises — 20+ Years of Turbine Engineering Excellence"
				description="Keshav Enterprises — 20+ years of industrial turbine engineering, reverse engineering, and OEM-compatible spare parts manufacturing from Shamli, UP, India."
				canonicalPath="/about"
				pageType="website"
			/>

			{/* ── HERO BANNER — "OUR STORY" with background image ── */}
			<div className="bg-[#0A192F] text-white relative overflow-hidden">
				{/* About story background image — upload about-story-bg.png to /public/
            Recommended: wide industrial turbine workshop/factory floor photo
            Size: 1920×900px, compressed < 250KB */}
				<img
					src="about-story-bg.png"
					alt=""
					aria-hidden="true"
					width="1920"
					height="900"
					loading="eager"
					decoding="async"
					className="absolute inset-0 w-full h-full pointer-events-none select-none"
					style={{
						opacity: 0.45,
						objectFit: 'cover',
						objectPosition: 'center center',
					}}
					onError={(e) => {
						e.target.style.display = 'none';
					}}
				/>

				{/* Gradient overlays — left side darker for text legibility, right opens up */}
				<div className="absolute inset-0 bg-linear-to-r from-[#0A192F]/92 via-[#0A192F]/60 to-[#0A192F]/25" />
				<div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/80 via-transparent to-[#0A192F]/40" />

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						<div>
							<div className="flex items-center gap-3 mb-5">
								<div className="w-8 h-0.5 bg-blue-400 rounded-full" />
								<span className="eyebrow-label text-blue-400 font-black text-xs uppercase tracking-[0.25em]">
									Our Story
								</span>
							</div>
							<h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-6">
								Two Decades of
								<br />
								<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500">
									Precision Engineering
								</span>
							</h1>
							<div className="section-divider w-20 h-0.5 bg-blue-500 mb-8 rounded-full" />
							<div className="glass-hero bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-blue-500 px-5 py-4 rounded-r-2xl mb-7">
								<p className="text-white text-lg font-bold leading-relaxed italic">
									&ldquo;Zero tolerance for plant downtime — that&apos;s not a
									slogan. It&apos;s the engineering standard every client holds
									us to.&rdquo;
								</p>
							</div>
							<p className="text-slate-300 text-base leading-relaxed mb-6">
								From a specialist turbine maintenance outfit in Shamli, Uttar
								Pradesh — to a trusted pan-India engineering partner for power
								plants, sugar mills, refineries, and process industries. Built
								on ex-OEM expertise from{' '}
								<strong className="text-white">
									Triveni, Siemens, BHEL, Man Turbo, KKK
								</strong>{' '}
								and ABB. Driven by one mandate: maximum uptime.
							</p>
							<div className="flex flex-wrap gap-2 mb-10">
								{[
									'Ex-OEM Engineers',
									'3D Laser Scanning',
									'CMM Precision',
									'24×7 Response',
									'IndiaMART TrustSeal',
									'Make In India',
									'MSME Registered',
								].map((tag) => (
									<span
										key={tag}
										className="bg-white/5 border border-blue-500/30 text-blue-200 text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full"
									>
										{tag}
									</span>
								))}
							</div>
							<div className="flex flex-wrap gap-3">
								<button
									type="button"
									onClick={() => navigate('/services')}
									className="bg-blue-600 text-white px-7 py-3.5 rounded-xl font-black text-sm hover:bg-blue-500 transition-all flex items-center gap-2 group shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 min-h-11"
								>
									Our Services{' '}
									<ArrowRight
										className="w-4 h-4 group-hover:translate-x-1 transition-transform"
										aria-hidden="true"
									/>
								</button>
								<button
									type="button"
									onClick={() => navigate('/contact')}
									className="bg-white/5 text-white border border-white/20 px-7 py-3.5 rounded-xl font-black text-sm hover:bg-white/10 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-11"
								>
									Contact Engineering Team
								</button>
							</div>
						</div>
						{/* Right — stat cards */}
						<div className="hidden lg:grid grid-cols-2 gap-4">
							{[
								{ stat: '20+', label: 'Years in Business', sub: 'Since 2000' },
								{
									stat: '10+',
									label: 'OEM Brands',
									sub: 'Triveni · Siemens · BHEL',
								},
								{ stat: '27 MW', label: 'Max Turbine', sub: 'Upto 27M.W.' },
								{
									stat: '24×7',
									label: 'Emergency Support',
									sub: 'Multi-location engineers',
								},
							].map(({ stat, label, sub }) => (
								<div
									key={label}
									className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform"
								>
									<div className="text-3xl font-black text-white tracking-tight mb-1">
										{stat}
									</div>
									<div className="text-xs font-black text-blue-300 uppercase tracking-widest mb-1">
										{label}
									</div>
									<div className="text-xs text-slate-400">{sub}</div>
								</div>
							))}
							<div className="col-span-2 bg-blue-600/20 border border-blue-500/30 rounded-2xl p-5 flex items-center gap-4">
								<CheckCircle2
									className="w-8 h-8 text-green-400 shrink-0"
									aria-hidden="true"
								/>
								<div>
									<div className="text-white font-black text-sm">
										IndiaMART TrustSeal Verified
									</div>
									<div className="text-slate-400 text-xs mt-0.5">
										50+ buyer reviews · 4.3/5 rating
									</div>
								</div>
							</div>
							<div className="col-span-2 bg-green-700/20 border border-green-500/30 rounded-2xl p-5 flex items-center gap-4">
								<Shield
									className="w-8 h-8 text-green-400 shrink-0"
									aria-hidden="true"
								/>
								<div>
									<div className="text-white font-black text-sm">
										MSME Registered
									</div>
									<div className="text-slate-400 text-xs mt-0.5">
										Udyam Certified Enterprise · Govt. of India
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className="h-1 w-full bg-linear-to-r from-transparent via-blue-500 to-transparent"
					aria-hidden="true"
				/>
			</div>

			{/* Stats bar */}
			<div className="bg-blue-600 py-10 sm:py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
						{[
							{ stat: '20+', label: 'Years in Business', sub: 'Since 2000' },
							{
								stat: '10+',
								label: 'OEM Brands Covered',
								sub: 'Triveni · Siemens · BHEL',
							},
							{
								stat: '27 MW',
								label: 'Max Turbine Handled',
								sub: 'Upto 27M.W.',
							},
							{
								stat: '24×7',
								label: 'Emergency Response',
								sub: 'Multi-location engineers',
							},
						].map(({ stat, label, sub }) => (
							<div key={label}>
								<div className="text-3xl md:text-4xl font-black text-white tracking-tight mb-0.5">
									{stat}
								</div>
								<div className="text-blue-100 text-xs font-black uppercase tracking-widest mb-0.5">
									{label}
								</div>
								<div className="text-blue-200/70 text-xs">{sub}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
				{/* Company overview */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16 lg:mb-24">
					<div>
						<span className="eyebrow-label text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">
							Who We Are
						</span>
						<h2 className="keep-left text-4xl font-black text-slate-900 tracking-tight mb-5">
							Engineering Partners for India&apos;s Industrial Backbone
						</h2>
						<div className="section-divider w-16 h-1 bg-blue-600 mb-6 rounded-full" />
						<div className="space-y-4 text-slate-600 text-base leading-relaxed keep-left">
							<p>
								Keshav Enterprises is a precision industrial engineering company
								headquartered in Shamli, Uttar Pradesh. For over two decades, we
								have provided specialist turbine maintenance, reverse
								engineering, and OEM-compatible spare parts to India&apos;s most
								demanding industrial sectors.
							</p>
							<p>
								Our engineering team includes ex-OEM specialists from Triveni,
								Siemens, BHEL, Belliss &amp; Morcom, Man Turbo, KKK, and ABB —
								providing clients with the same level of technical expertise as
								the original equipment manufacturers, at a fraction of the lead
								time and cost.
							</p>
							<p>
								We cover steam turbines from 5 kW to 27 MW — back-pressure and
								condensing, horizontal and vertical, single and multi-stage. Our
								workshop is equipped with 3D laser scanners, CMM coordinate
								measuring machines, dynamic balancing machines (50–2,000 kg),
								and precision CNC lathes.
							</p>
						</div>
					</div>
					<div className="space-y-5">
						<div className="bg-slate-900 rounded-3xl p-8 text-white">
							<h3 className="keep-left font-black text-xl mb-4 tracking-tight">
								Core Capabilities
							</h3>
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
								].map((item) => (
									<li
										key={item}
										className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
									>
										<CheckCircle2
											className="w-4 h-4 text-blue-400 shrink-0 mt-0.5"
											aria-hidden="true"
										/>
										{item}
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
									<h3 className="keep-left font-black text-slate-900 text-base mb-1">
										Our Location
									</h3>
									<p className="text-slate-600 text-sm leading-relaxed keep-left">
										{CONTACT_INFO.address}
									</p>
									<p className="text-slate-500 text-xs mt-2 font-bold keep-left">
										GST: {CONTACT_INFO.gst}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Values */}
				<div className="mb-24">
					<div className="text-center mb-12">
						<span className="eyebrow-label text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">
							What Drives Us
						</span>
						<h2 className="text-4xl font-black text-slate-900 tracking-tight">
							Our Core Values
						</h2>
						<div
							className="section-divider w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"
							aria-hidden="true"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
						{values.map(({ Icon, label, text }) => (
							<div
								key={label}
								className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all group text-center"
							>
								<div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
									<Icon
										className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors"
										aria-hidden="true"
									/>
								</div>
								<h3 className="font-black text-slate-900 text-base mb-3 tracking-tight">
									{label}
								</h3>
								<p className="text-slate-500 text-sm leading-relaxed">{text}</p>
							</div>
						))}
					</div>
				</div>

				{/* Timeline */}
				<div className="mb-24">
					<div className="text-center mb-12">
						<span className="eyebrow-label text-blue-600 font-black text-xs uppercase tracking-[0.25em] mb-3 block">
							Our Journey
						</span>
						<h2 className="text-4xl font-black text-slate-900 tracking-tight">
							Company Milestones
						</h2>
						<div
							className="section-divider w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"
							aria-hidden="true"
						/>
					</div>
					<div className="relative">
						<div
							className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-600 via-blue-400 to-blue-200 rounded-full timeline-connector"
							aria-hidden="true"
						/>
						<div className="space-y-10">
							{milestones.map(({ year, title, desc }, i) => (
								<div
									key={year}
									className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
								>
									<div
										className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md"
										style={{ top: '1.5rem' }}
										aria-hidden="true"
									/>
									<div
										className={`ml-12 md:ml-0 md:w-[45%] timeline-card ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
									>
										<div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all keep-left">
											<span className="text-blue-600 text-2xl font-black block mb-1">
												{year}
											</span>
											<h3 className="keep-left font-black text-slate-900 text-lg mb-2 tracking-tight">
												{title}
											</h3>
											<p className="text-slate-500 text-sm leading-relaxed">
												{desc}
											</p>
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
						<span className="eyebrow-label text-blue-400 font-black text-xs uppercase tracking-[0.25em] mb-4 block">
							OEM Expertise
						</span>
						<h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
							10+ OEM Brands.
							<br />
							One Engineering Partner.
						</h2>
						<p className="text-slate-400 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
							Our ex-OEM engineers have hands-on experience with all major
							turbine makes. No learning curve. Authoritative technical
							expertise from day one.
						</p>
						<div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
							{OEMS.map((oem) => (
								<div
									key={oem}
									className="bg-[#152B50] hover:bg-blue-600 border border-blue-800/60 hover:border-blue-400 px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
								>
									<span className="text-white font-black text-sm uppercase tracking-widest whitespace-nowrap">
										{oem}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* CTA */}
				<div className="text-center">
					<h3 className="text-3xl font-black text-slate-900 mb-4">
						Ready to Work With Our Engineering Team?
					</h3>
					<p className="text-slate-600 text-base max-w-xl mx-auto mb-8">
						Whether you need emergency breakdown support, a planned overhaul
						partner, or a second source for obsolete spares — we respond with a
						technical answer, not a brochure.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							type="button"
							onClick={() => navigate('/contact')}
							className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black text-base hover:bg-blue-500 transition-all shadow-lg flex items-center justify-center gap-2 group"
						>
							Contact Engineering Team{' '}
							<ArrowRight
								className="w-5 h-5 group-hover:translate-x-1 transition-transform"
								aria-hidden="true"
							/>
						</button>
						<a
							href={waMsg(
								'Hi KESHAV ENTERPRISES, I would like to discuss a project.',
							)}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-black text-base hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2 shadow-lg"
						>
							<MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp
						</a>
					</div>
				</div>
			</div>
		</main>
	);
});
AboutPage.displayName = 'AboutPage';

// HOW TO UPDATE BLOGS:
// 1. Add a new object to this BLOG_POSTS array following the same structure
// 2. Set a unique id (e.g. 'post_4'), slug (url-friendly, e.g. 'my-new-post')
// 3. Fill in title, excerpt, content (supports paragraphs as array), tags, date, author
// 4. Save the file and redeploy — the new post appears automatically on /blog
const BLOG_POSTS = [
	{
		id: 'post_1',
		slug: 'steam-turbine-overhauling-checklist',
		title:
			'The Complete Steam Turbine Overhauling Checklist for Plant Engineers',
		excerpt:
			'A practical, step-by-step checklist covering pre-shutdown planning, inspection protocols, clearance recording, and post-overhaul commissioning for steam turbines up to 27 MW.',
		date: '2026-03-15',
		author: 'Keshav Enterprises Engineering Team',
		readTime: '8 min read',
		tags: ['Overhauling', 'Steam Turbines', 'Maintenance'],
		coverImage: 'blog-turbine-overhaul.webp',
		content: [
			{ type: 'h2', text: 'Why a Structured Checklist Matters' },
			{
				type: 'p',
				text: 'Unplanned turbine shutdowns cost Indian power and sugar plants lakhs of rupees per hour. A structured overhauling checklist ensures nothing is missed during planned maintenance windows — reducing the risk of early failure after recommissioning and avoiding costly repeat shutdowns.',
			},
			{ type: 'h2', text: '1. Pre-Shutdown Planning (4–6 Weeks Before)' },
			{
				type: 'p',
				text: 'Begin with a detailed scope of work covering all rotating equipment in the train. Inspect all stocked spare parts and generate a shortfall report. Order critical items — bearings, seals, labyrinth packings, carbon rings — with adequate lead time. Arrange for specialized tools: alignment laser, vibration analyser, dial indicators, and feeler gauges.',
			},
			{
				type: 'list',
				items: [
					'Confirm OEM clearance data for all turbine stages',
					'Arrange lube oil flushing equipment (mobile centrifuge filter unit)',
					'Book ex-OEM engineers if required for major overhaul',
					'Prepare condition monitoring baseline readings (vibration, temperature, pressure)',
				],
			},
			{ type: 'h2', text: '2. Shutdown & Isolation' },
			{
				type: 'p',
				text: 'Follow the OEM-specified shutdown procedure. Allow adequate cool-down time before breaking any flanges. Lock out / tag out all energy sources including steam, lube oil, condensate, and control air. Drain the lube oil system completely before disassembly.',
			},
			{ type: 'h2', text: '3. Disassembly & Inspection' },
			{
				type: 'p',
				text: 'Record all clearances, gaps, and fits before removing components — these are essential for comparison with OEM specification and for detecting wear trends. Photograph every stage. Measure rotor run-out at journal, thrust collar, and coupling faces.',
			},
			{
				type: 'list',
				items: [
					'Bearing clearances (radial and axial)',
					'Labyrinth seal diametral clearances',
					'Coupling alignment offset and angularity',
					'Carbon ring face condition and spring tension',
					'Nozzle and diaphragm condition and throat dimensions',
					'ESV seat and disc condition',
				],
			},
			{ type: 'h2', text: '4. Workshop Repairs & Replacements' },
			{
				type: 'p',
				text: 'Send the rotor for journal grinding and dynamic balancing if run-out or vibration readings were outside tolerance. Replace carbon and graphite gland rings, labyrinth packings, and babbitt bearings as per condition report. All rotor balancing should be performed to ISO 1940 or API 670 standards.',
			},
			{ type: 'h2', text: '5. Reassembly & Alignment' },
			{
				type: 'p',
				text: 'Reassemble in reverse order with new gaskets and fastener torque per OEM specifications. Perform final rotor alignment using laser alignment equipment — turbine to gearbox and gearbox to generator. Record all clearances post-assembly and confirm they are within OEM tolerance.',
			},
			{ type: 'h2', text: '6. Lube Oil Flushing' },
			{
				type: 'p',
				text: 'Before commissioning, flush the lube oil system with a mobile centrifuge filter system targeting ISO 4406:99 cleanliness class 16/14/11 or better. Take oil samples before and after flushing and retain reports. Never commission a turbine without completing an oil flush — bearing failures from contaminated oil account for a significant portion of post-overhaul failures.',
			},
			{ type: 'h2', text: '7. Commissioning & First Run' },
			{
				type: 'p',
				text: 'Follow the OEM pre-commissioning procedure step by step. Monitor vibration, bearing temperatures, and lube oil pressure continuously during the first run-up. Confirm ESV and governor operation. Fine-tune alignment if vibration levels are elevated. Document all commissioning readings for the plant maintenance record.',
			},
			{
				type: 'cta',
				text: 'Need expert overhauling engineers for your next planned shutdown? Our ex-OEM team covers Triveni, Siemens, BHEL, Belliss & Morcom, and more.',
			},
		],
	},
	{
		id: 'post_2',
		slug: 'lube-oil-contamination-turbine-bearings',
		title:
			'How Lube Oil Contamination Destroys Turbine Bearings — And How to Prevent It',
		excerpt:
			'Water ingress, solid particles, and oxidation are the three leading causes of premature turbine bearing failure. Here is how to identify each contamination type and what filtration products to use to prevent damage.',
		date: '2026-02-28',
		author: 'Keshav Enterprises Engineering Team',
		readTime: '6 min read',
		tags: ['Lube Oil', 'Bearings', 'Filtration', 'Preventive Maintenance'],
		coverImage: 'blog-lube-oil.webp',
		content: [
			{ type: 'h2', text: 'The Hidden Bearing Killer' },
			{
				type: 'p',
				text: 'Turbine babbitt bearings are precision components operating on a hydrodynamic oil film just a few microns thick. Any contamination of the lube oil system — solid particles, water, or degraded oil — destroys this film, leading to direct metal contact and accelerated wear. Studies show that over 70% of turbine bearing failures are lubrication-related.',
			},
			{ type: 'h2', text: 'Contamination Type 1: Solid Particles' },
			{
				type: 'p',
				text: 'Particles above 10 microns can scratch bearing surfaces. Particles in the 1–10 micron range are most damaging — they enter the oil film clearance and cause three-body abrasion. Sources include post-construction debris, wear particles from gears, and dirt entering through tank breathers.',
			},
			{
				type: 'p',
				text: 'Solution: Install high-efficiency lube oil filter elements (ISO 16889, beta-ratio ≥200 at 10 microns) in the main filter housing. Use tank breather filter elements (3 VL glass fibre) to prevent ingestion of airborne particulates. Target system cleanliness: ISO 4406:99 Class 16/14/11 or better for turbine bearings.',
			},
			{ type: 'h2', text: 'Contamination Type 2: Water Ingress' },
			{
				type: 'p',
				text: 'Water in lube oil causes hydrogen embrittlement of babbitt, promotes oxidation, and supports bacterial growth. Even 200 ppm of free water significantly reduces oil film strength. Sources include steam gland leaks, condensation in the tank, and cooler tube failures.',
			},
			{
				type: 'p',
				text: 'Solution: Install WaterSorp offline filter elements in the side-stream return line. These dual-function elements simultaneously remove solid particles and absorb free and emulsified water. Regular oil sampling (monthly) per ISO standards will detect water early.',
			},
			{ type: 'h2', text: 'Contamination Type 3: Oil Oxidation & Degradation' },
			{
				type: 'p',
				text: 'High operating temperatures and the presence of metal catalysts cause turbine oil to oxidise, forming varnish deposits and acidic by-products. These deposits clog filter elements, stick to bearing surfaces, and accelerate wear.',
			},
			{
				type: 'p',
				text: 'Solution: Monitor acid number (AN) and viscosity trends. WaterSorp offline filtration extends oil life by removing the water and particles that catalyse oxidation. Plan oil changes before the acid number exceeds OEM limits.',
			},
			{
				type: 'list',
				items: [
					'Check filter differential pressure weekly — replace element at 3.5–4 bar ΔP',
					'Inspect tank breather filter monthly',
					'Conduct oil sampling every 30 days and trend results',
					'Install WaterSorp elements if water contamination is detected',
					'Flush the system with mobile centrifuge filter after any major repair',
				],
			},
			{
				type: 'cta',
				text: 'We supply ISO 16889-compliant lube oil filter elements compatible with Triveni, Siemens, BHEL, and all major turbine makes. Request a quote via WhatsApp.',
			},
		],
	},
	{
		id: 'post_3',
		slug: 'reverse-engineering-turbine-spares-india',
		title:
			'Reverse Engineering Turbine Spares: How We Recreate Obsolete Components in India',
		excerpt:
			'When OEM spare parts are unavailable, have 18-month lead times, or are priced prohibitively, reverse engineering offers a reliable alternative. Here is the step-by-step process we use at Keshav Enterprises.',
		date: '2026-01-20',
		author: 'Keshav Enterprises Engineering Team',
		readTime: '7 min read',
		tags: [
			'Reverse Engineering',
			'Turbine Spares',
			'Manufacturing',
			'3D Scanning',
		],
		coverImage: 'blog-reverse-engineering.webp',
		content: [
			{ type: 'h2', text: 'Why Reverse Engineer Turbine Parts?' },
			{
				type: 'p',
				text: 'Many Indian industrial plants operate turbines that are 20–40 years old. Original equipment manufacturers have discontinued certain models, merged with other companies, or simply stopped stocking spares for older machines. Lead times from overseas OEMs for machined components routinely exceed 12–18 months — unacceptable when a sugar mill has a fixed crushing season or a power plant has a contract penalty for each day offline.',
			},
			{
				type: 'h2',
				text: 'Step 1: Component Acquisition & Initial Assessment',
			},
			{
				type: 'p',
				text: 'We start with the worn or broken component itself — or the mating part if the original is beyond measurement. The component is cleaned and visually assessed to determine which surfaces are still measurable and which have been degraded by wear or damage.',
			},
			{ type: 'h2', text: 'Step 2: 3D Laser Scanning & CMM Measurement' },
			{
				type: 'p',
				text: 'For complex profiles — rotor blades, nozzle blocks, diaphragms, governor components — we use a 3D laser scanner to capture the complete geometry as a point cloud. For simpler rotationally-symmetric parts — journal bearing housings, labyrinth ring grooves, seal rings — a coordinate measuring machine (CMM) captures critical dimensions with micron-level accuracy.',
			},
			{
				type: 'list',
				items: [
					'All critical dimensions recorded with tolerances',
					'Concentricity and parallelism of mating faces checked',
					'Thread forms, keyway depths, and interference fits measured',
					'Surface finish specifications noted where measurable',
				],
			},
			{ type: 'h2', text: 'Step 3: PMI Material Testing' },
			{
				type: 'p',
				text: 'Positive Material Identification (PMI) using portable X-ray fluorescence (XRF) or optical emission spectrometry identifies the exact alloy composition of the original component. This is critical — a rotor shaft in 12% Cr steel behaves very differently from a 1% Cr-Mo shaft. Getting the material wrong means the reverse-engineered part will fail prematurely.',
			},
			{ type: 'h2', text: 'Step 4: Engineering Drawing Generation' },
			{
				type: 'p',
				text: 'From the scan data, CMM measurements, and material test results, our engineers generate a complete manufacturing drawing. This includes all dimensions with tolerances, surface finish specifications, pre- and post-heat treatment procedures, material specification, and inspection requirements.',
			},
			{ type: 'h2', text: 'Step 5: Machining & Quality Control' },
			{
				type: 'p',
				text: 'Machining is performed in three stages: rough machining to near-final dimensions, heat treatment if required (stress relieving, quench and temper, nitriding), and final precision machining. Each stage is inspected against the engineering drawing. Rotors are dynamically balanced to ISO 1940 / API 670 standards before dispatch.',
			},
			{ type: 'h2', text: 'Turbines We Cover' },
			{
				type: 'p',
				text: 'We have reverse-engineered components for steam turbines from 5 kW to 27 MW across all major makes: Triveni, Siemens, BHEL, Belliss & Morcom, Maxwatt, Man Turbo, Chola Turbo, DLF-Skoda, KKK, and ABB. Both back-pressure and condensing turbines, horizontal and vertical, single and multi-stage.',
			},
			{
				type: 'cta',
				text: 'Have an obsolete spare you need reverse-engineered? Send us a photo and your turbine details on WhatsApp — we will assess feasibility within 24 hours.',
			},
		],
	},
	{
		id: 'post_4',
		slug: 'belliss-morcom-turbine-common-faults-india',
		title:
			'Belliss & Morcom Turbine Common Faults — Field Guide for Indian Plants',
		excerpt:
			'Belliss & Morcom steam turbines are widely used in Indian sugar mills and co-gen plants. Here are the most common faults our ex-OEM engineers encounter and how to diagnose and fix them.',
		date: '2026-03-18',
		author: 'Keshav Enterprises Engineering Team',
		readTime: '8 min read',
		tags: [
			'Belliss & Morcom',
			'Troubleshooting',
			'Steam Turbine',
			'Sugar Mill',
		],
		coverImage: 'blog-belliss-morcom.webp',
		content: [
			{
				type: 'p',
				text: 'Belliss & Morcom (now Howden) turbines are found in hundreds of Indian sugar mills, co-generation plants, and industrial facilities. Our engineers have worked on Belliss units for over 20 years across UP, Punjab, Maharashtra, and Karnataka. Here are the faults we encounter most frequently — and the correct way to diagnose and resolve each one.',
			},
			{ type: 'h2', text: 'Fault 1: High Vibration at Operating Speed' },
			{
				type: 'p',
				text: 'The most common complaint on Belliss turbines is elevated vibration, typically detected by operators as increased noise and confirmed by portable vibration analysis. The leading root causes, in order of frequency, are: (1) rotor imbalance from deposit build-up on blades, (2) journal bearing wear — especially after long runs between overhauls, and (3) misalignment between the turbine and gearbox due to pipe strain or foundation settling.',
			},
			{
				type: 'list',
				items: [
					'Check bearing temperatures first — elevated temperature alongside high vibration almost always indicates bearing condition issues',
					'Take a portable vibration reading at all four bearing housings and compare to baseline (1× and 2× running speed)',
					'If 1× dominant: imbalance or misalignment. If 2× dominant: bearing looseness or misalignment. Sub-synchronous: oil whirl',
					'Inspect the coupling for wear and correct assembly before concluding misalignment is a turbine problem',
				],
			},
			{ type: 'h2', text: 'Fault 2: Governor Hunting / Speed Instability' },
			{
				type: 'p',
				text: 'Belliss turbines use a centrifugal fly-ball governor or hydraulic governor depending on the model and vintage. Speed hunting — cyclic overshoot above and below setpoint — is typically caused by: worn pivot pins and fly-balls in centrifugal governors, incorrect droop setting, control valve actuator hysteresis, or steam pressure fluctuations from the boiler exceeding the governor authority.',
			},
			{
				type: 'p',
				text: 'Before dismantling the governor, confirm the steam supply pressure is stable. If supply pressure is fluctuating more than ±0.5 bar, the boiler control loop is the primary problem — the governor cannot compensate for large supply swings. Once boiler stability is confirmed, the governor pivot pins and fly-ball weights should be inspected for wear and replaced if clearances are excessive.',
			},
			{ type: 'h2', text: 'Fault 3: Steam Gland Leakage' },
			{
				type: 'p',
				text: 'Belliss turbines use labyrinth gland seals and gland steam systems to control leakage at the shaft ends. Visible steam leakage at the gland area in normal operation indicates: worn or damaged labyrinth strips, incorrect gland steam pressure setting, or shaft eccentricity causing uneven clearance around the labyrinth.',
			},
			{
				type: 'list',
				items: [
					'Measure shaft eccentricity at the gland area using a dial gauge — if runout exceeds 0.05 mm, the rotor condition must be assessed',
					'Check gland steam pressure versus saturation conditions — condensing water in the gland steam supply line causes severe labyrinth erosion',
					'Labyrinth strip replacement is a planned outage item — do not attempt to reduce clearances by shimming strips in situ',
				],
			},
			{
				type: 'h2',
				text: 'Fault 4: Lube Oil High Temperature or Low Pressure',
			},
			{
				type: 'p',
				text: 'Lube oil system faults on Belliss turbines account for more unplanned trips than any other cause. High oil temperature (above 55°C at bearing inlet) typically means the lube oil cooler is fouled — clean the cooler shell and tube bundle. Low oil pressure trips occur when the relief valve is set incorrectly, filter differential pressure is high (element needs replacement), or the oil pump is worn and losing volumetric efficiency.',
			},
			{
				type: 'cta',
				text: 'Need our ex-Belliss & Morcom engineers for an overhaul, vibration analysis, or emergency fault diagnosis? Contact us on WhatsApp for a same-day response.',
			},
		],
	},
	{
		id: 'post_5',
		slug: 'iso-4406-lube-oil-cleanliness-guide',
		title:
			'How to Read an ISO 4406 Lube Oil Cleanliness Report — A Guide for Maintenance Engineers',
		excerpt:
			'ISO 4406 particle count reports from oil labs are often misunderstood. This guide explains exactly what the numbers mean, how to set cleanliness targets for turbine bearing systems, and when to act.',
		date: '2026-04-05',
		author: 'Keshav Enterprises Engineering Team',
		readTime: '6 min read',
		tags: ['Lube Oil', 'ISO 4406', 'Filtration', 'Predictive Maintenance'],
		coverImage: 'blog-iso-4406.webp',
		content: [
			{
				type: 'p',
				text: 'Every month, thousands of oil analysis reports land in plant maintenance offices across India — and most of them are filed without being understood. ISO 4406 cleanliness codes are the single most actionable number in that report. Getting them wrong costs bearings. Getting them right extends turbine life.',
			},
			{ type: 'h2', text: 'What Does an ISO 4406 Code Mean?' },
			{
				type: 'p',
				text: 'An ISO 4406:99 cleanliness code has three numbers, for example 18/16/13. Each number is a "range code" representing a particle count per millilitre of oil at three different particle sizes: 4 µm(c), 6 µm(c), and 14 µm(c). The "(c)" suffix means the count uses the optical particle counter calibration per ISO 11171 — do not compare with older reports that used the uncalibrated method.',
			},
			{
				type: 'list',
				items: [
					'Range code 14 = 80–160 particles/mL',
					'Range code 16 = 320–640 particles/mL',
					'Range code 18 = 1,280–2,560 particles/mL',
					'Range code 20 = 5,120–10,240 particles/mL',
					'Each step up = doubling of contamination level',
				],
			},
			{ type: 'h2', text: 'What Cleanliness Target Do You Need?' },
			{
				type: 'p',
				text: 'For steam turbine journal bearing and lube oil systems, the target is typically ISO 4406:99 Class 16/14/11 — this is the minimum requirement in API 614. Many OEMs including Triveni and Siemens specify 15/13/10 for turbines with hydraulic control systems. After a major overhaul or lube oil flush, the system should achieve 16/14/11 before oil-in to prevent bearing contamination damage during run-up.',
			},
			{ type: 'h2', text: 'When Should You Act?' },
			{
				type: 'p',
				text: 'If your routine oil analysis report shows the 6 µm(c) range code (middle number) at 17 or higher — one step above target — investigate immediately. Check filter differential pressure (replace if approaching 3.5–4 bar), inspect tank breather condition, and sample the inlet and outlet of the filter housing separately to locate where contamination is entering. If the water content report shows more than 0.1% water — replace the filter elements and schedule an offline WaterSorp filtration run.',
			},
			{ type: 'h2', text: 'The Cost of Ignoring a Deteriorating Code' },
			{
				type: 'p',
				text: 'Particles in the 4–10 µm range are the most damaging — they are exactly the right size to enter the hydrodynamic oil film between a rotating journal and Babbitt bearing surface and cause three-body abrasion. A turbine running with ISO cleanliness code 20/18/15 instead of 16/14/11 has approximately 100× more damaging particles than target. Bearing surfaces degrade progressively and the failure is gradual until it is not — then it is a 48-hour emergency and a Babbitt re-pour.',
			},
			{
				type: 'cta',
				text: 'We supply ISO 16889-compliant filter elements for all major turbine makes and can advise on lube oil flushing to achieve the correct cleanliness class before your next startup. Contact us on WhatsApp.',
			},
		],
	},
];

// ─── BLOG LIST PAGE ────────────────────────────────────────────
const BlogPage = memo(({ navigate }) => (
	<main
		id="main-content"
		tabIndex={-1}
		className="pt-24 pb-20 bg-slate-50 min-h-screen"
	>
		<SEOHead
			title="Engineering Blog — Turbine Maintenance & Industrial Insights"
			description="Technical articles on steam turbine overhauling, lube oil filtration, reverse engineering, and industrial maintenance best practices from Keshav Enterprises."
			canonicalPath="/blog"
			pageType="website"
		/>
		<div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
			<div
				className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem]"
				aria-hidden="true"
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
				<div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6">
					<BookOpen className="w-8 h-8 text-blue-400" aria-hidden="true" />
				</div>
				<h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">
					Engineering Blog
				</h1>
				<div
					className="section-divider w-24 h-1.5 bg-blue-500 mb-8 rounded-full"
					aria-hidden="true"
				/>
				<p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
					Technical insights on turbine maintenance, lube oil systems, reverse
					engineering, and industrial best practices — from our engineering
					team.
				</p>
			</div>
		</div>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Featured post */}
			{BLOG_POSTS.length > 0 && (
				<div
					role="article"
					className="mb-16 group cursor-pointer w-full text-left"
					onClick={() => navigate(`/blog/${BLOG_POSTS[0].slug}`)}
				>
					<article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-300 transition-all duration-300">
						<div className="grid grid-cols-1 lg:grid-cols-2">
							<div className="h-72 lg:h-auto bg-slate-100 flex items-center justify-center relative overflow-hidden">
								<div className="skeleton-shimmer" aria-hidden="true" />
								<img
									src={BLOG_POSTS[0].coverImage}
									alt={BLOG_POSTS[0].title}
									loading="eager"
									decoding="async"
									fetchPriority="high"
									width="600"
									height="400"
									style={{ aspectRatio: '600/400' }}
									className="media-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
									onLoad={(e) => {
										e.currentTarget.classList.add('is-loaded');
									}}
									onError={(e) => {
										e.target.style.display = 'none';
									}}
								/>
								<div className="absolute inset-0 bg-linear-to-br from-[#0A192F]/80 to-blue-900/40 flex items-center justify-center">
									<BookOpen
										className="w-24 h-24 text-white/20"
										aria-hidden="true"
									/>
								</div>
								<span className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest rounded-full shadow-lg">
									Featured
								</span>
							</div>
							<div className="p-10 lg:p-12 flex flex-col justify-center">
								<div className="flex flex-wrap gap-2 mb-5">
									{BLOG_POSTS[0].tags.map((tag) => (
										<span
											key={tag}
											className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
										>
											{tag}
										</span>
									))}
								</div>
								<h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
									<a
										href={`#/blog/${BLOG_POSTS[0].slug}`}
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											navigate(`/blog/${BLOG_POSTS[0].slug}`);
										}}
										className="focus:outline-none focus-visible:underline"
									>
										{BLOG_POSTS[0].title}
									</a>
								</h2>
								<p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">
									{BLOG_POSTS[0].excerpt}
								</p>
								<div className="flex items-center gap-6 text-sm text-slate-500 font-medium mb-8 flex-wrap">
									<span className="flex items-center gap-2">
										<Calendar
											className="w-4 h-4 text-blue-500"
											aria-hidden="true"
										/>
										{new Date(BLOG_POSTS[0].date).toLocaleDateString('en-IN', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</span>
									<span className="flex items-center gap-2">
										<Clock
											className="w-4 h-4 text-blue-500"
											aria-hidden="true"
										/>
										{BLOG_POSTS[0].readTime}
									</span>
								</div>
								<button
									type="button"
									onClick={() => navigate(`/blog/${BLOG_POSTS[0].slug}`)}
									className="self-start bg-slate-900 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-sm flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
								>
									Read Article{' '}
									<ArrowRight className="w-5 h-5" aria-hidden="true" />
								</button>
							</div>
						</div>
					</article>
			</div>
			)}
			{/* Remaining posts grid */}
			{BLOG_POSTS.length > 1 && (
				<div>
					<h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
						More Articles
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{BLOG_POSTS.slice(1).map((post) => (
							<button
								type="button"
								key={post.id}
								onClick={() => navigate(`/blog/${post.slug}`)}
								aria-label={`Read post: ${post.title}`}
								className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group cursor-pointer flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-left w-full"
							>
								<div className="h-52 bg-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
									<div className="skeleton-shimmer" aria-hidden="true" />
									<img
										src={post.coverImage}
										alt={post.title}
										loading="lazy"
										decoding="async"
										fetchPriority="low"
										width="400"
										height="208"
										style={{ aspectRatio: '400/208' }}
										className="media-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
										onLoad={(e) => {
											e.currentTarget.classList.add('is-loaded');
										}}
										onError={(e) => {
											e.target.style.display = 'none';
										}}
									/>
									<div className="absolute inset-0 bg-linear-to-br from-[#0A192F]/70 to-blue-900/30 flex items-center justify-center">
										<BookOpen
											className="w-16 h-16 text-white/20"
											aria-hidden="true"
										/>
									</div>
								</div>
								<div className="p-7 flex flex-col flex-1">
									<div className="flex flex-wrap gap-2 mb-4">
										{post.tags.slice(0, 2).map((tag) => (
											<span
												key={tag}
												className="bg-slate-100 text-slate-600 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider"
											>
												{tag}
											</span>
										))}
									</div>
									<h3 className="text-xl font-black text-slate-900 mb-3 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
										<a
											href={`#/blog/${post.slug}`}
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												navigate(`/blog/${post.slug}`);
											}}
											className="focus:outline-none focus-visible:underline"
										>
											{post.title}
										</a>
									</h3>
									<p className="text-slate-600 font-medium text-sm leading-relaxed mb-5 line-clamp-3">
										{post.excerpt}
									</p>
									<div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
										<div className="flex items-center gap-4 text-xs text-slate-500 font-medium flex-wrap">
											<span className="flex items-center gap-1.5">
												<Calendar
													className="w-3.5 h-3.5 text-blue-400"
													aria-hidden="true"
												/>
												{new Date(post.date).toLocaleDateString('en-IN', {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
												})}
											</span>
											<span className="flex items-center gap-1.5">
												<Clock
													className="w-3.5 h-3.5 text-blue-400"
													aria-hidden="true"
												/>
												{post.readTime}
											</span>
										</div>
										<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm">
											<ArrowRight
												className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors"
												aria-hidden="true"
											/>
										</div>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			)}
			{/* CTA */}
			<div className="mt-20 bg-slate-900 rounded-3xl p-12 text-center">
				<h2 className="text-3xl font-black text-white tracking-tight mb-4">
					Have a Technical Question?
				</h2>
				<p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto mb-8">
					Our engineering team is available 24x7. Reach us on WhatsApp for
					immediate technical assistance or project quotes.
				</p>
				<a
					href={waMsg(
						'Hi KESHAV ENTERPRISES, I read your blog and have a technical question.',
					)}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-[#1ebe5d] transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
				>
					<MessageCircle className="w-6 h-6" aria-hidden="true" /> Ask Our
					Engineers
				</a>
			</div>
		</div>
	</main>
));
BlogPage.displayName = 'BlogPage';

// ─── BLOG POST PAGE ────────────────────────────────────────────
const BlogPostPage = ({ slug, navigate }) => {
	const post = useMemo(() => BLOG_POSTS.find((p) => p.slug === slug), [slug]);
	const others = useMemo(
		() => (post ? BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2) : []),
		[post],
	);
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [slug]);
	if (!post)
		return (
			<main
				id="main-content"
				tabIndex={-1}
				className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center bg-slate-50"
			>
				<SEOHead title="Post Not Found" />
				<div>
					<BookOpen
						className="w-20 h-20 text-slate-300 mx-auto mb-6"
						aria-hidden="true"
					/>
					<h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
						Post Not Found
					</h1>
					<button
						type="button"
						onClick={() => navigate('/blog')}
						className="text-blue-600 font-bold hover:underline text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
					>
						Back to Blog
					</button>
				</div>
			</main>
		);
	const renderBlock = (block, i) => {
		switch (block.type) {
			case 'h2':
				return (
					<h2
						key={`block-${block.type}-${i}`}
						className="text-2xl md:text-3xl font-black text-slate-900 mt-12 mb-5 tracking-tight"
					>
						{block.text}
					</h2>
				);
			case 'p':
				return (
					<p
						key={`block-${i}`}
						className="text-slate-700 font-medium text-lg leading-relaxed mb-6"
					>
						{block.text}
					</p>
				);
			case 'list':
				return (
					<ul key={`block-${i}`} className="mb-8 space-y-3">
						{block.items.map((item) => (
							<li
								key={item}
								className="flex items-start gap-3 text-slate-700 font-medium text-base leading-relaxed"
							>
								<CheckCircle2
									className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
									aria-hidden="true"
								/>
								{item}
							</li>
						))}
					</ul>
				);
			case 'cta':
				return (
					<div
						key={`block-${i}`}
						className="my-10 bg-blue-600 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6"
					>
						<p className="text-white font-bold text-lg leading-relaxed flex-1">
							{block.text}
						</p>
						<a
							href={waMsg(
								`Hi KESHAV ENTERPRISES, I read your article "${post.title}" and would like to know more.`,
							)}
							target="_blank"
							rel="noopener noreferrer"
							className="shrink-0 bg-white text-blue-600 px-8 py-4 rounded-xl font-black hover:bg-blue-50 transition-all flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
						>
							<MessageCircle className="w-5 h-5" aria-hidden="true" />
							WhatsApp Us
						</a>
					</div>
				);
			default:
				return null;
		}
	};
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className="pt-24 pb-20 bg-slate-50 min-h-screen"
		>
			<SEOHead
				title={post.title}
				description={post.excerpt}
				canonicalPath={`/blog/${post.slug}`}
				pageType="article"
				publishedTime={post.date}
			/>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<nav
					aria-label="Breadcrumb"
					className="flex items-center text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest flex-wrap gap-2 pt-4"
				>
					<button
						type="button"
						onClick={() => navigate('/blog')}
						className="hover:text-blue-600 transition-colors flex items-center focus:outline-none focus-visible:underline"
					>
						<ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
						Blog
					</button>
					<span aria-hidden="true" className="mx-1">
						/
					</span>
					<span
						className="text-slate-800 truncate max-w-62.5 md:max-w-full normal-case"
						aria-current="page"
					>
						{post.title}
					</span>
				</nav>
				{/* Hero */}
				<div className="h-72 md:h-96 bg-slate-900 rounded-3xl overflow-hidden mb-10 flex items-center justify-center relative">
					<div className="skeleton-shimmer" aria-hidden="true" />
					<img
						src={post.coverImage}
						alt={post.title}
						loading="eager"
						decoding="async"
						fetchPriority="high"
						width="896"
						height="384"
						style={{ aspectRatio: '896/384' }}
						className="media-img w-full h-full object-cover opacity-60"
						onLoad={(e) => {
							e.currentTarget.classList.add('is-loaded');
						}}
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/>
					<div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
					<div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
						<div className="flex flex-wrap gap-2 mb-4">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
								>
									{tag}
								</span>
							))}
						</div>
						<h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
							{post.title}
						</h1>
					</div>
				</div>
				{/* Meta */}
				<div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium mb-10 pb-10 border-b border-slate-200">
					<span className="flex items-center gap-2">
						<User className="w-4 h-4 text-blue-500" aria-hidden="true" />
						{post.author}
					</span>
					<span className="flex items-center gap-2">
						<Calendar className="w-4 h-4 text-blue-500" aria-hidden="true" />
						{new Date(post.date).toLocaleDateString('en-IN', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</span>
					<span className="flex items-center gap-2">
						<Clock className="w-4 h-4 text-blue-500" aria-hidden="true" />
						{post.readTime}
					</span>
				</div>
				{/* Content */}
				<div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-12">
					{post.content.map((block, i) => (
						<React.Fragment key={`block-${block.type}-${i}`}>
							{renderBlock(block, i)}
						</React.Fragment>
					))}
				</div>
				{/* Share */}
				<div className="bg-slate-900 rounded-2xl p-8 mb-12 flex flex-col sm:flex-row items-center gap-6">
					<div className="flex-1">
						<h3 className="text-xl font-black text-white mb-2">
							Found this article useful?
						</h3>
						<p className="text-slate-400 font-medium text-sm">
							Share with your maintenance team or contact us for a technical
							consultation.
						</p>
					</div>
					<a
						href={waMsg(
							`Hi KESHAV ENTERPRISES, I read "${post.title}" on your website and would like to discuss.`,
						)}
						target="_blank"
						rel="noopener noreferrer"
						className="shrink-0 bg-[#25D366] text-white px-8 py-4 rounded-xl font-black hover:bg-[#1ebe5d] transition-all flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
					>
						<MessageCircle className="w-5 h-5" aria-hidden="true" />
						Discuss on WhatsApp
					</a>
				</div>
				{/* Related posts */}
				{others.length > 0 && (
					<section aria-labelledby="related-posts-heading">
						<h2
							id="related-posts-heading"
							className="text-2xl font-black text-slate-900 mb-6 tracking-tight"
						>
							More Articles
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{others.map((op) => (
								<button
									type="button"
									key={op.id}
									onClick={() => navigate(`/blog/${op.slug}`)}
									aria-label={`Read post: ${op.title}`}
									className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-left w-full"
								>
									<div className="flex flex-wrap gap-2 mb-3">
										{op.tags.slice(0, 2).map((t) => (
											<span
												key={t}
												className="bg-slate-100 text-slate-600 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider"
											>
												{t}
											</span>
										))}
									</div>
									<h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
										<a
											href={`#/blog/${op.slug}`}
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												navigate(`/blog/${op.slug}`);
											}}
											className="focus:outline-none focus-visible:underline"
										>
											{op.title}
										</a>
									</h3>
									<p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2 mb-4">
										{op.excerpt}
									</p>
									<span className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
										Read Article{' '}
										<ArrowRight className="w-4 h-4" aria-hidden="true" />
									</span>
								</button>
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	);
};

// ─── SERVICES PAGE ────────────────────────────────────────────
const ServicesPage = memo(({ navigate }) => (
	<main id="main-content" tabIndex={-1} className="pt-24 pb-20 bg-white">
		<SEOHead
			title="Turbine Services — Overhauling, Erection & Reverse Engineering"
			description="Complete turbine overhauling, reverse engineering, erection & commissioning, dynamic balancing, lube oil flushing, and machine alignment for steam turbines 5 kW to 27 MW."
			canonicalPath="/services"
			pageType="website"
			schema={FAQ_SCHEMA}
		/>
		<div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
			<div
				className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem]"
				aria-hidden="true"
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
				<h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">
					Technical Services
				</h1>
				<div
					className="section-divider w-24 h-1.5 bg-blue-500 mb-8 rounded-full"
					aria-hidden="true"
				/>
				<p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
					Specialized mechanical solutions for industrial rotating equipment
					from 5 kW to 27 MW. Ensuring peak reliability across power generation,
					sugar mills, paper mills, refineries, and petrochemical industries.
				</p>
			</div>
		</div>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="space-y-24 mt-12 cv-auto">
				{SERVICES.map((service, index) => {
					const Icon = SERVICE_ICONS[service.id];
					return (
						<div
							key={service.id}
							className={`flex flex-col md:flex-row gap-16 items-start group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
						>
							<div className="md:w-2/5 w-full shrink-0">
								{/* Service image card — sticky while scrolling on desktop — clickable */}
								<button
									type="button"
									onClick={() => navigate(`/service/${service.id}`)}
									className="w-full aspect-4/3 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 sticky top-28 bg-[#0A192F] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 cursor-pointer"
									aria-label={`View full details for ${service.title}`}
								>
									{/* Full-size service photo at full opacity — upload to /public */}
									{service.image && (
										<img
											src={service.image}
											alt={service.title}
											className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
											loading="lazy"
											decoding="async"
											fetchPriority="low"
											width="560"
											height="420"
											style={{ aspectRatio: '560/420' }}
											onError={(e) => {
												e.target.style.display = 'none';
											}}
										/>
									)}

									{/* Dark fallback layer — visible only when no image */}
									<div
										className="absolute inset-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-size-[16px_16px]"
										aria-hidden="true"
									/>

									{/* Bottom scrim — ensures OEM chips are always readable */}
									<div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/95 via-[#0A192F]/20 to-transparent z-10" />

									{/* Top-left service label badge */}
									<div className="absolute top-5 left-5 z-20">
										<div className="flex items-center gap-3 bg-[#0A192F]/70 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl shadow-lg">
											<div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 shrink-0">
												<Icon
													className="w-5 h-5 text-blue-400"
													aria-hidden="true"
												/>
											</div>
											<span className="text-white font-black text-xs uppercase tracking-widest leading-tight">
												{service.title}
											</span>
										</div>
									</div>

									{/* Fallback center icon — shows when no image uploaded yet */}
									{!service.image && (
										<div className="relative z-10 w-full h-full flex items-center justify-center">
											<div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20">
												<Icon
													className="w-14 h-14 text-blue-400"
													aria-hidden="true"
												/>
											</div>
										</div>
									)}

									{/* OEM chips at bottom */}
									{service.oems && (
										<section
											className="absolute bottom-0 left-0 right-0 z-20 p-5"
											aria-label={`OEM expertise: ${service.oems.join(', ')}`}
										>
											<p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">
												OEM Expertise
											</p>
											<div className="flex flex-wrap gap-1.5">
												{service.oems.slice(0, 6).map((oem) => (
													<span
														key={oem}
														className="text-[10px] font-black text-slate-200 bg-slate-800/80 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wide border border-white/10 ind-oem-chip"
													>
														{oem}
													</span>
												))}
												{service.oems.length > 6 && (
													<span className="text-[10px] font-black text-blue-300 bg-blue-900/50 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wide border border-blue-500/20">
														+{service.oems.length - 6} more
													</span>
												)}
											</div>
										</section>
									)}
								</button>
							</div>
							<div className="md:w-3/5 w-full">
								<div
									className="text-blue-600 font-black tracking-widest text-sm uppercase mb-5 flex items-center"
									aria-hidden="true"
								>
									<span className="w-10 h-0.5 bg-blue-600 mr-4" /> Service{' '}
									{(index + 1).toString().padStart(2, '0')}
								</div>
								<button
									type="button"
									onClick={() => navigate(`/service/${service.id}`)}
									className="text-left group/title focus:outline-none focus-visible:underline mb-6 block w-full"
									aria-label={`View full details for ${service.title}`}
								>
									<h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight group-hover/title:text-blue-600 transition-colors duration-300 flex items-start gap-3">
										{service.title}
										<ArrowRight
											className="w-8 h-8 mt-2 shrink-0 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300 text-blue-600"
											aria-hidden="true"
										/>
									</h2>
								</button>
								<p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">
									{service.desc}
								</p>
								<div className="mb-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
									<div className="bg-slate-900 px-6 py-4">
										<h3 className="font-black text-white text-sm uppercase tracking-widest">
											What We Deliver
										</h3>
									</div>
									<ul className="divide-y divide-slate-100">
										{service.details.map((detail) => (
											<li
												key={detail}
												className="flex items-start px-6 py-4 hover:bg-blue-50/30 transition-colors"
											>
												<CheckCircle2
													className="w-5 h-5 text-blue-500 mr-4 shrink-0 mt-0.5"
													aria-hidden="true"
												/>
												<span className="text-slate-700 font-medium text-sm leading-relaxed">
													{detail}
												</span>
											</li>
										))}
									</ul>
								</div>
								<div className="flex flex-wrap gap-4">
									<button
										type="button"
										onClick={() => navigate(`/service/${service.id}`)}
										aria-label={`View full details for ${service.title}`}
										className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-blue-500 transition-all shadow-md hover:shadow-xl flex items-center group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
									>
										View Full Details{' '}
										<ArrowRight
											className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
											aria-hidden="true"
										/>
									</button>
									<button
										type="button"
										onClick={() => navigate('/contact')}
										aria-label={`Inquire about ${service.title}`}
										className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-colors shadow-sm hover:shadow-lg flex items-center group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
									>
										Inquire About This Service{' '}
										<ArrowRight
											className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
											aria-hidden="true"
										/>
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	</main>
));
ServicesPage.displayName = 'ServicesPage';

// ─── SERVICE DETAIL DATA ──────────────────────────────
const SERVICE_DETAIL_DATA = {
	srv_1: {
		tagline:
			'OEM-Coordinated Erection from First Foundation Bolt to First Steam',
		accentColor: '#2563eb',
		keyStats: [
			{ value: '10+', label: 'OEM Makes Commissioned' },
			{ value: '5kW–27MW', label: 'Power Range Handled' },
			{ value: '100%', label: 'OEM-Spec Documentation' },
			{ value: '24×7', label: 'Site Support Available' },
		],
		whyUs:
			"A single clearance set wrong during erection can destroy a bearing within hours of first steam. Our ex-OEM field engineers have personally commissioned the same machine types you're installing — they know exactly what the OEM specification means in practice, not just on paper.",
		overview:
			'Turbine erection and commissioning is the most critical phase of any power plant or industrial project. Errors during erection — incorrect alignment, improper clearances, wrong torques — compound into expensive failures within the first year of operation. Keshav Enterprises brings ex-OEM field engineers who have commissioned Triveni, Siemens, BHEL, Belliss, and Maxwatt turbines across power plants, sugar mills, paper mills, and process industries. Every hold point is witnessed, every clearance is recorded, and every safety system is proof-tested before steam is admitted. Our documentation package meets client, insurer, and OEM handover requirements.',
		procedures: [
			{
				step: '01',
				title: 'Pre-Erection Engineering Review',
				icon: BookOpen,
				desc: 'Detailed review of OEM erection manual, GA drawings, P&IDs, and civil foundation drawings. Identification of all hold points, witness points, and documentation requirements before first equipment lift. Erection sequence and critical path agreed with client project team.',
			},
			{
				step: '02',
				title: 'Foundation & Baseplate Preparation',
				icon: Layers,
				desc: 'Precision levelling and grouting of turbine baseplate to within 0.05 mm/m. Chock machining and installation. Foundation bolt tensioning to OEM-specified torques using calibrated hydraulic wrenches. Epoxy grout preparation, pouring, and cure monitoring with temperature logging.',
			},
			{
				step: '03',
				title: 'Equipment Setting & Rough Alignment',
				icon: Target,
				desc: 'Precision positioning of turbine casing, gearbox, and driven equipment on baseplates. Rough shaft alignment using dial gauges and laser equipment to within 0.1 mm before coupling fit. Soft foot check and correction at all machine feet before final alignment.',
			},
			{
				step: '04',
				title: 'Internal Assembly & Clearance Setting',
				icon: Cog,
				desc: 'Rotor drop measurement, gland clearance setting (radial and axial), labyrinth seal fit, thrust bearing installation, and journal bearing clearance setting. All clearances recorded against OEM specification in the site clearance register. Rotor end float measured and confirmed within OEM limits.',
			},
			{
				step: '05',
				title: 'Piping & Auxiliary Systems Connection',
				icon: Activity,
				desc: 'Steam inlet, exhaust, extraction, and drain piping connections with correct pipe support and spring hangers. Nozzle loads verified within OEM limits — pipe strain eliminated before final connection. Lube oil, control oil, gland steam, and instrumentation piping completed and leak-tested.',
			},
			{
				step: '06',
				title: 'Pre-Commissioning Checks & Flushing',
				icon: Droplets,
				desc: 'Lube oil system flush to ISO 4406 cleanliness standard, confirmed by particle count. Control and trip system functional checks. Safety system proof tests performed and documented: over-speed trip, low oil pressure trip, high bearing temperature trip, emergency stop valve operation.',
			},
			{
				step: '07',
				title: 'First Fire, Run-Up & Commissioning',
				icon: Zap,
				desc: 'Controlled first start with listening test at slow roll. Speed run-up in defined stages with continuous vibration and bearing temperature monitoring. Governor response and dead-band testing. Over-speed trip test at 110% rated speed. Load acceptance testing and full-load operational handover with commissioning report.',
			},
		],
		tools: [
			{
				name: 'Laser Shaft Alignment',
				detail: 'Pruftechnik Rotalign Pro / SKF TKSA series',
				icon: Target,
			},
			{
				name: 'Vibration Analyser',
				detail: 'Real-time FFT, 8-channel data acquisition',
				icon: Activity,
			},
			{
				name: 'Precision Dial Gauges',
				detail: '0.001 mm resolution, CMM-grade',
				icon: Cog,
			},
			{
				name: 'Hydraulic Torque Wrenches',
				detail: 'Calibrated torque multipliers for foundation bolts',
				icon: Wrench,
			},
			{
				name: 'Borescope',
				detail: 'Rigid & flexible for internal inspection',
				icon: Search,
			},
			{
				name: 'Thermocouple Loggers',
				detail: 'Multi-point thermal survey during first run',
				icon: TrendingUp,
			},
			{
				name: 'Ultrasonic Flow Meters',
				detail: 'Pipeline commissioning flow verification',
				icon: Droplets,
			},
		],
		standards: [
			{
				code: 'ASME PTC 6',
				desc: 'Steam Turbines Performance Test Code',
				body: 'ASME',
			},
			{
				code: 'ISO 10816 / 20816',
				desc: 'Mechanical vibration limits for rotating machinery',
				body: 'ISO',
			},
			{
				code: 'API 670',
				desc: 'Machinery protection: over-speed and vibration trips',
				body: 'API',
			},
			{
				code: 'API 686',
				desc: 'Recommended practice for machinery installation',
				body: 'API',
			},
			{
				code: 'IS 3639',
				desc: 'Foundation bolt and anchor standards',
				body: 'BIS',
			},
			{
				code: 'OEM Manuals',
				desc: 'Triveni, Siemens, BHEL, Belliss, Maxwatt erection procedures',
				body: 'OEM',
			},
		],
	},
	srv_2: {
		tagline: 'Turnkey Shutdown Planning to Zero-Defect Restart',
		accentColor: '#0891b2',
		keyStats: [
			{ value: '8+', label: 'OEM Makes Overhauled' },
			{ value: '20+', label: 'Years Field Experience' },
			{ value: '0.001mm', label: 'Clearance Resolution' },
			{ value: '24×7', label: 'Emergency Response' },
		],
		whyUs:
			'A poorly executed overhaul is worse than no overhaul — it introduces new clearance errors, contamination, and re-assembly faults. Our engineers were trained by the OEMs. They know what tolerances actually mean at operating temperature and speed, not just what they say in the manual.',
		overview:
			'Turbine overhauling is not a maintenance activity — it is a precision engineering intervention. Keshav Enterprises deploys ex-OEM engineers from Triveni, Siemens, BHEL, Belliss, Maxwatt, Man Turbo, KKK, and ABB to execute turnkey overhauls with the same discipline and documentation standards as the original manufacturer. Every overhaul begins 4–6 weeks before shutdown with scope finalisation, spares pre-inspection, and manpower mobilisation planning. Every component is measured before disassembly, during strip-down, and after reassembly. A written condition report, clearance register, and photographic record is produced for every overhaul — creating a baseline for the next outage.',
		procedures: [
			{
				step: '01',
				title: 'Pre-Shutdown Planning & Scope Finalization',
				icon: BookOpen,
				desc: 'Review of previous overhaul records, operational data, vibration history, and performance trends 4–6 weeks before shutdown. Definition of scope, critical spares list, consumables list, and manpower mobilisation plan. Pre-shutdown inspection of stocked spare parts with shortfall report issued to client.',
			},
			{
				step: '02',
				title: 'Site Mobilization & Tooling Setup',
				icon: Wrench,
				desc: 'Full overhaul tool kit deployed: hydraulic jacks, precision chain blocks, rotor handling slings, dedicated measurement instruments, lapping tools, and the complete overhaul documentation package. Tool condition checks and instrument calibration verification before work begins.',
			},
			{
				step: '03',
				title: 'Disassembly & Initial Inspection',
				icon: Search,
				desc: 'Controlled disassembly with all pre-disassembly measurements recorded: bearing clearances, shaft runout, gland clearances, coupling alignment, and rotor end float. Every component photographed. Condition noted against OEM specification before cleaning.',
			},
			{
				step: '04',
				title: 'Component Inspection & Condition Reporting',
				icon: Activity,
				desc: 'Visual, dimensional, and NDT inspection of rotor, blades, bearings, glands, casing, all valves, and coupling. Crack detection using dye penetrant or magnetic particle methods on critical components. Written condition report with specific recommendation for each component: replace, repair, or reuse with justification.',
			},
			{
				step: '05',
				title: 'Component Repair & Spare Part Installation',
				icon: Cog,
				desc: 'Babbitt re-metalling and precision machining of journal bearings, labyrinth seal replacement, blade inspection and selective replacement, journal polishing (Ra 0.4 μm), casing joint face lapping, gland packing replacement, and valve seat lapping to blue-match standard.',
			},
			{
				step: '06',
				title: 'Reassembly & Clearance Setting',
				icon: Target,
				desc: 'Precise reassembly with all clearances set and recorded against OEM specification: journal bearing clearances (diametral and axial), labyrinth seal radial and axial clearances, gland clearances, coupling alignment, and rotor end float. All readings entered in the clearance register and compared against previous overhaul baseline.',
			},
			{
				step: '07',
				title: 'Recommissioning & Handover',
				icon: Zap,
				desc: 'Post-overhaul lube oil system recommissioning flush to ISO 4406. Safety system proof test: over-speed trip, low oil pressure trip, emergency stop valve. Monitored start-up with vibration and bearing temperature trending. Written clearance for full load with complete overhaul documentation package handed to client.',
			},
		],
		tools: [
			{
				name: 'Precision Dial & Bore Gauges',
				detail: '0.001 mm resolution clearance measurement',
				icon: Target,
			},
			{
				name: 'Laser Shaft Alignment',
				detail: 'Final coupling alignment verification',
				icon: Activity,
			},
			{
				name: 'Portable Balancing Machine',
				detail: 'In-situ rotor trim balancing',
				icon: Cog,
			},
			{
				name: 'Babbitt Casting Equipment',
				detail: 'Centrifugal casting for bearing re-metalling',
				icon: Factory,
			},
			{
				name: 'Surface Lapping Plates',
				detail: 'All grades for valve seats and casing faces',
				icon: Layers,
			},
			{
				name: 'Ultrasonic Thickness Gauge',
				detail: 'Casing wall erosion measurement',
				icon: Search,
			},
			{
				name: '8-Channel Vibration Analyser',
				detail: 'Real-time FFT during monitored restart',
				icon: TrendingUp,
			},
		],
		standards: [
			{
				code: 'API 614',
				desc: 'Lubrication, shaft sealing, and oil-control systems',
				body: 'API',
			},
			{
				code: 'API 670',
				desc: 'Vibration and over-speed protection systems',
				body: 'API',
			},
			{
				code: 'ISO 1940',
				desc: 'Dynamic balancing quality grades for rotating components',
				body: 'ISO',
			},
			{
				code: 'ASME B31.1',
				desc: 'Power piping for steam connections',
				body: 'ASME',
			},
			{
				code: 'ISO 9001',
				desc: 'Quality management system for overhaul documentation',
				body: 'ISO',
			},
			{
				code: 'OEM Manuals',
				desc: 'Triveni, Siemens, BHEL, Belliss, Man Turbo, KKK, ABB',
				body: 'OEM',
			},
		],
	},
	srv_3: {
		tagline: '3D Scanning to Production Drawing — Eliminating OEM Dependency',
		accentColor: '#7c3aed',
		keyStats: [
			{ value: '5kW–27MW', label: 'Turbine Range Covered' },
			{ value: '0.001mm', label: 'CMM Measurement Resolution' },
			{ value: '100%', label: 'PMI Material Verified' },
			{ value: 'GD&T', label: 'Full Tolerance Drawings' },
		],
		whyUs:
			'When an OEM stops supporting a machine, a simple worn rotor or broken diaphragm can force a plant shutdown for months. Our reverse engineering process recreates the exact material, geometry, and heat treatment specification — with full manufacturing drawings — so any competent machine shop can manufacture the part.',
		overview:
			'When OEM drawings are unavailable, the OEM is no longer active, or lead times are measured in years, Keshav Enterprises can reverse-engineer any turbine component from 5 kW to 27 MW to a full production-ready drawing set. Our process uses 3D laser scanners, CMM coordinate measuring machines, and XRF PMI material identification — the same tools used by major OEM engineering teams — to generate complete manufacturing drawings with all tolerances, surface finishes, heat treatment sequences, and material specifications. We have successfully reverse-engineered rotors, diaphragms, nozzle blocks, labyrinth seals, bearings, governors, and steam path components for Triveni, Siemens, BHEL, DLF-Skoda, Belliss, and Maxwatt turbines.',
		procedures: [
			{
				step: '01',
				title: 'Component Receipt & Initial Assessment',
				icon: Search,
				desc: 'Safe receipt of the worn or original reference component. Initial visual inspection, cleaning, and comprehensive photography. Assessment of damage, wear zones, and critical measurement surfaces to determine the optimal measurement strategy and datum scheme before any measurement begins.',
			},
			{
				step: '02',
				title: 'PMI Material Identification',
				icon: Shield,
				desc: 'Positive Material Identification using XRF (X-ray fluorescence) analyser on multiple locations to identify exact alloy composition. Hardness testing (Rockwell, Brinell, Vickers) to determine heat treatment condition. Material grade confirmed and matched to nearest current standard before measurement begins — no guessing on alloy.',
			},
			{
				step: '03',
				title: '3D Laser Scanning & CMM Measurement',
				icon: Hexagon,
				desc: 'Full 3D scan of component exterior using portable laser scanner — point cloud accuracy to 0.05 mm. Critical internal dimensions and tolerances (bore, keyway, spline, thread form, pitch, and lead) measured on CMM with 0.001 mm resolution. Datum scheme established from functional bearing surfaces.',
			},
			{
				step: '04',
				title: 'Engineering Drawing Generation',
				icon: BookOpen,
				desc: 'CAD model developed from scan data and CMM measurements. Full 2D manufacturing drawing produced with: all linear and angular dimensions, GD&T tolerances (concentricity, cylindricity, parallelism, roundness, runout), surface finish callouts (Ra values in μm), thread form and class standards, and a complete datum reference frame.',
			},
			{
				step: '05',
				title: 'Heat Treatment & Surface Treatment Specification',
				icon: Zap,
				desc: 'Full machining sequence defined: pre-machining stress relief, rough machining, normalising or hardening, pre-final and final machining stages. Heat treatment conditions specified with temperature (°C), soak time, quench medium, and target hardness. Surface treatment specs: nitriding depth, case hardness, carburising, or hard chrome plating as required.',
			},
			{
				step: '06',
				title: 'Material Procurement & Manufacturing',
				icon: Factory,
				desc: 'Material procured against PMI-identified specification with EN 10204 Type 3.1 mill certificate. CNC machining executed through each defined stage with in-process dimensional inspection at each stage. All inspection data recorded in a manufacturing data pack.',
			},
			{
				step: '07',
				title: 'Final Inspection & Delivery',
				icon: CheckCircle2,
				desc: 'Complete dimensional inspection report against the engineering drawing. PMI re-verification on the finished component confirms correct alloy was used throughout. Surface finish measurement. Hardness testing on critical surfaces. Full traceability documentation pack supplied with every component.',
			},
		],
		tools: [
			{
				name: '3D Laser Scanner',
				detail: 'Faro Focus / Creaform HandySCAN — 0.05 mm accuracy',
				icon: Hexagon,
			},
			{
				name: 'CMM — Coordinate Measuring Machine',
				detail: 'Bridge type & portable arm, 0.001 mm resolution',
				icon: Target,
			},
			{
				name: 'XRF PMI Analyser',
				detail: 'Olympus Vanta — alloy identification on-site',
				icon: Search,
			},
			{
				name: 'Hardness Tester',
				detail: 'Rockwell, Brinell, Vickers — heat treatment verification',
				icon: Shield,
			},
			{
				name: 'Profilometer',
				detail: 'Surface roughness tester — Ra 0.001 μm resolution',
				icon: Activity,
			},
			{
				name: 'Copying Lathe',
				detail: 'Digital readout for rotational component replication',
				icon: Cog,
			},
			{
				name: 'CAD Software',
				detail: 'SolidWorks / AutoCAD — GD&T drawing generation',
				icon: BookOpen,
			},
		],
		standards: [
			{
				code: 'ISO 1101',
				desc: 'Geometrical tolerancing (GD&T) for drawings',
				body: 'ISO',
			},
			{
				code: 'ISO 286',
				desc: 'Limits and fits system for shafts and bores',
				body: 'ISO',
			},
			{
				code: 'ISO 1302',
				desc: 'Surface texture indication on engineering drawings',
				body: 'ISO',
			},
			{
				code: 'EN 10204',
				desc: 'Material traceability certificates (Type 3.1)',
				body: 'EN',
			},
			{
				code: 'ASTM E1417',
				desc: 'PMI and NDT testing standards',
				body: 'ASTM',
			},
			{
				code: 'OEM Specification',
				desc: 'Matched to original OEM material and tolerance intent',
				body: 'OEM',
			},
		],
	},
	srv_4: {
		tagline:
			'ISO-Grade Balancing — Because Rotor Forces Grow With the Square of Speed',
		accentColor: '#d97706',
		keyStats: [
			{ value: '50–2000kg', label: 'Rotor Capacity' },
			{ value: 'G1.0', label: 'Balance Grade Achievable' },
			{ value: '0.001mm', label: 'Dial Gauge Resolution' },
			{ value: 'ISO/API', label: 'Certified Standards' },
		],
		whyUs:
			"A rotor at 3,000 RPM generates 100× more imbalance force than at 300 RPM. The same residual imbalance that is invisible at slow speed will destroy a bearing at full speed. We balance to ISO 1940 Grade G1.0 where required — not just 'good enough'.",
		overview:
			'Rotor imbalance is one of the most common and most preventable causes of turbine bearing failure, seal damage, and shortened rotor life. Keshav Enterprises performs precision journal machining and ISO 1940 / API 670 dynamic balancing for rotors from 50 kg to 2,000 kg at our dedicated workshop facility. The rotor is first machined to restore geometric integrity — round journals, concentric labyrinth lands, correct surface finish — before balancing. This sequence matters: balancing a geometrically distorted rotor merely masks the problem. Our balancing reports document initial unbalance, correction planes, mass corrections, residual unbalance, and the ISO balance grade achieved, providing full traceability for your maintenance records.',
		procedures: [
			{
				step: '01',
				title: 'Rotor Receipt & Initial Measurement',
				icon: Search,
				desc: 'Rotor received and cleaned. Initial mechanical runout measured using precision dial gauges at all journals, coupling fits, and labyrinth lands on a precision static stand. Electrical runout checked. All diameters measured and recorded versus OEM specification — out-of-round, taper, and journal undersizing documented.',
			},
			{
				step: '02',
				title: 'Journal Condition Assessment',
				icon: Activity,
				desc: 'Surface finish measured using profilometer at 3 positions around each journal circumference. Visual inspection for scoring, Babbitt transfer, corrosion pitting, and wear patterns. Hardness checked. Minimum material removal calculated to restore geometry and finish within OEM limits.',
			},
			{
				step: '03',
				title: 'Journal Grinding & Polishing',
				icon: Cog,
				desc: 'Precision cylindrical grinding of journals on CNC grinding machine: roundness restored to 0.005 mm max, taper to 0.005 mm per 100 mm max. Ground surface polished to Ra 0.4 μm (OEM bearing surface specification) using precision polishing lathe. Absolute minimum material removed to preserve shaft life.',
			},
			{
				step: '04',
				title: 'Labyrinth & Gland Portion Machining',
				icon: Hexagon,
				desc: 'Re-machining of labyrinth seal lands, gland areas, balance disc faces, and coupling fits on precision CNC lathes. All surfaces set concentric to journal datum before machining using a 4-jaw chuck and dial gauge zeroing — essential to maintain rotor geometric integrity and avoid introducing new runout.',
			},
			{
				step: '05',
				title: 'Dynamic Balancing — Two-Plane Correction',
				icon: Target,
				desc: 'Rotor mounted in hard-bearing dynamic balancing machine. Initial unbalance measured simultaneously in two correction planes (coupling end and governor/impeller end). Trial masses applied and removed. Balancing iterations repeated until residual unbalance in each plane meets ISO 1940 / API 670 grade specified for this rotor service.',
			},
			{
				step: '06',
				title: 'Post-Balance Runout Check',
				icon: TrendingUp,
				desc: 'Mechanical and electrical runout re-measured post-balancing at all journal positions. Comparison against pre-balance baseline confirms improvement from machining and balancing. Any residual runout exceeding OEM limits is investigated — if caused by bent shaft, straightening or replacement is recommended.',
			},
			{
				step: '07',
				title: 'Documentation & Dispatch',
				icon: BookOpen,
				desc: 'Complete balancing report issued: initial unbalance (g·mm), correction plane locations, correction masses applied, final residual unbalance in each plane, balance grade achieved (G1.0, G2.5, G6.3), and all runout measurements. PMI certificate and hardness test results attached. Rotor packed and dispatched with documentation.',
			},
		],
		tools: [
			{
				name: 'Hard-Bearing Balancing Machine',
				detail: '50–2,000 kg, 100–10,000 RPM capacity',
				icon: Activity,
			},
			{
				name: 'CNC Cylindrical Grinding Machine',
				detail: 'Precision dressing system, 0.001 mm control',
				icon: Cog,
			},
			{
				name: 'Precision Polishing Lathe',
				detail: 'Microfinish to Ra 0.4 μm journal surface',
				icon: Hexagon,
			},
			{
				name: 'Profilometer',
				detail: 'Surface roughness — Ra 0.001 μm resolution',
				icon: TrendingUp,
			},
			{
				name: 'Precision Dial Gauges',
				detail: '0.001 mm — runout and diameter measurement',
				icon: Target,
			},
			{
				name: 'Portable Balancing Analyser',
				detail: 'In-situ field balancing capability',
				icon: Search,
			},
			{
				name: 'Digital Stroboscope',
				detail: 'Phase angle measurement for balancing corrections',
				icon: Zap,
			},
		],
		standards: [
			{
				code: 'ISO 1940-1',
				desc: 'Balance quality requirements for rigid rotors',
				body: 'ISO',
			},
			{
				code: 'ISO 21940',
				desc: 'Mechanical vibration: rotor balancing vocabulary and procedures',
				body: 'ISO',
			},
			{
				code: 'API 670',
				desc: 'Vibration, axial-position, and bearing temperature monitoring',
				body: 'API',
			},
			{
				code: 'API 612',
				desc: 'Special-purpose steam turbines — balancing requirements',
				body: 'API',
			},
			{
				code: 'ISO 1101',
				desc: 'Geometrical tolerancing applied to machining drawings',
				body: 'ISO',
			},
			{
				code: 'OEM Specification',
				desc: 'Triveni, Siemens, BHEL, Man Turbo, KKK balance grades',
				body: 'OEM',
			},
		],
	},
	srv_5: {
		tagline: 'ISO 4406 Cleanliness Class 16/14/11 — Certified Before Oil-In',
		accentColor: '#0284c7',
		keyStats: [
			{ value: '16/14/11', label: 'ISO 4406 Target Class' },
			{ value: '6,000 L/min', label: 'Max System Flow Rate' },
			{ value: '3μm', label: 'Final Filtration Rating' },
			{ value: '100%', label: 'Lab-Certified Particle Count' },
		],
		whyUs:
			'New and recently overhauled turbines are destroyed by construction debris — weld slag, pipe scale, sand, and metal swarf — within hours of first startup. Oil flushing is not optional: it is the single most cost-effective insurance against a catastrophic bearing failure on a brand-new overhaul.',
		overview:
			'Lube oil system contamination is the primary cause of bearing failures in new and recently overhauled turbines. Construction debris entering the lube oil system during installation or overhaul can destroy bearings and journal surfaces within hours of startup. Keshav Enterprises performs professional lube oil flushing using purpose-built mobile centrifuge filter systems to achieve ISO 4406:99 cleanliness class 16/14/11 — the minimum standard for steam turbine bearing lubrication. Our process is fully documented: oil sample results at every stage, progressive filter upgrade records, and a final laboratory-certified particle count certificate are provided before the system is handed back for oil-in.',
		procedures: [
			{
				step: '01',
				title: 'System Survey & Flushing Plan',
				icon: Search,
				desc: 'Review of system P&ID, oil volume, pipe bore sizes, heat exchanger configuration, and bearing housing layout. Development of flushing flow path using hydraulic calculations to achieve turbulent flow (Reynolds number above 4,000) in every pipe section. Temporary bypass spools and blind flanges identified and designed where required.',
			},
			{
				step: '02',
				title: 'Temporary Flushing Circuit Installation',
				icon: Wrench,
				desc: 'Installation of temporary bypass pipework around bearings, control valves, instrumentation, and other sensitive equipment that must not see flush debris. Connection of mobile flushing unit. Installation of temporary wire mesh target strainers at flush return points for debris monitoring.',
			},
			{
				step: '03',
				title: 'Initial Flush — High Flow Rate',
				icon: Droplets,
				desc: 'System charged with flushing oil (or process oil if compatible). Flushing pump operated at maximum achievable flow rate for maximum turbulence. Oil temperature thermally cycled between 30°C and 70°C at 30-minute intervals — thermal cycling stresses pipe walls and dislodges adhered scale and debris. Target strainers inspected and cleaned at each interval.',
			},
			{
				step: '04',
				title: 'Contamination Monitoring & Particle Count',
				icon: Activity,
				desc: 'Oil samples drawn per ISO 4021 clean sample extraction procedure at each stage. Particle count measured using automatic particle counter per ISO 11500 — reporting counts at ≥4μm, ≥6μm, ≥14μm, and ≥21μm. Results plotted on a cleanliness progress chart against the ISO 4406 target class.',
			},
			{
				step: '05',
				title: 'Progressive Filter Upgrade',
				icon: Layers,
				desc: 'As gross contamination is removed, filter element micron rating progressively reduced through stages: 25μm → 10μm → 6μm → 3μm absolute. Centrifuge de-watering unit operated continuously throughout flushing to remove free and emulsified water. Karl Fischer water content tested to confirm de-watering effectiveness.',
			},
			{
				step: '06',
				title: 'Final Acceptance Particle Count',
				icon: CheckCircle2,
				desc: 'Minimum three consecutive clean oil samples drawn at intervals must all achieve the target ISO 4406 class 16/14/11. Final samples submitted to accredited laboratory for independent verification. Written certificate of oil cleanliness — signed, stamped, and traceable to the laboratory — issued to client.',
			},
			{
				step: '07',
				title: 'System Restoration & Oil Fill',
				icon: Zap,
				desc: 'All temporary bypass spools and blind flanges removed. All bearings, sensitive instruments, and critical equipment reconnected. System refilled with filtered, new process oil passed through a 3μm absolute filter during filling. Final particle count on system oil after fill confirms target maintained. System handed over for startup.',
			},
		],
		tools: [
			{
				name: 'Mobile Centrifuge Filter Unit',
				detail: 'Up to 6,000 L/min system flow rates',
				icon: Droplets,
			},
			{
				name: 'Automatic Particle Counter',
				detail: 'ISO 11500 compliant — online real-time monitoring',
				icon: Activity,
			},
			{
				name: 'Karl Fischer Titrator',
				detail: 'Free water content measurement in lube oil',
				icon: Layers,
			},
			{
				name: 'Oil Sampling Kit',
				detail: 'ISO 4021 clean extraction from pressurised lines',
				icon: Search,
			},
			{
				name: 'Oil Heater',
				detail: 'Thermal cycling: 30°C to 70°C for debris dislodging',
				icon: Zap,
			},
			{
				name: 'Target Strainer Set',
				detail: '25, 10, 3μm mesh for stage debris monitoring',
				icon: Filter,
			},
			{
				name: 'Bypass Spool Set',
				detail: 'Custom fabricated bypass spools and blind flanges',
				icon: Wrench,
			},
		],
		standards: [
			{
				code: 'ISO 4406:99',
				desc: 'Hydraulic fluid cleanliness classification — target 16/14/11',
				body: 'ISO',
			},
			{
				code: 'ISO 11500',
				desc: 'Particle count determination using automatic methods',
				body: 'ISO',
			},
			{
				code: 'ISO 4021',
				desc: 'Hydraulic fluid contamination analysis and sampling',
				body: 'ISO',
			},
			{
				code: 'API 614',
				desc: 'Lubrication, shaft sealing, and oil-control systems',
				body: 'API',
			},
			{
				code: 'ASTM D6304',
				desc: 'Karl Fischer water content measurement in lubricating oils',
				body: 'ASTM',
			},
			{
				code: 'OEM Specification',
				desc: 'Triveni, Siemens, BHEL, Man Turbo lube oil cleanliness requirements',
				body: 'OEM',
			},
		],
	},
	srv_6: {
		tagline:
			'Laser-Precision Alignment — Eliminating the #1 Cause of Bearing Failure',
		accentColor: '#059669',
		keyStats: [
			{ value: '0.05mm', label: 'Alignment Tolerance Achieved' },
			{ value: '50%', label: 'Bearing Failures From Misalignment' },
			{ value: '80%', label: 'Bearing Life Lost at 0.05mm Offset' },
			{ value: 'Any Size', label: 'Machine Frame Covered' },
		],
		whyUs:
			'Misalignment as small as 0.05 mm at the coupling can reduce bearing life by 80% and generate forces that propagate through seals, couplings, and the entire drivetrain. Laser alignment takes hours — a bearing failure takes weeks and costs far more. We align hot, not just cold.',
		overview:
			'Shaft misalignment is responsible for up to 50% of all rotating equipment bearing failures in Indian industry. Even misalignments invisible to the naked eye generate enormous cyclic forces on bearings, seals, and couplings at operating speed. Keshav Enterprises performs precision laser shaft alignment using Pruftechnik and SKF systems for turbines, gearboxes, pumps, fans, alternators, and induction generators of any frame size. Critically, we calculate and apply hot alignment offsets — the cold alignment is deliberately set to account for thermal growth, so the machine runs straight at operating temperature. Our alignment reports show before/after readings, shim history, and final values against OEM tolerance.',
		procedures: [
			{
				step: '01',
				title: 'Pre-Alignment Checks',
				icon: Search,
				desc: 'Verification of soft foot condition (machine frame distortion when bolts are tightened) using precision dial gauges at all feet — 0.05 mm or less required before alignment proceeds. Pipe strain measurement to identify forces imposed on machine nozzles by connected pipework. Bearing clearance check and thermal growth calculation from OEM data or site measurements.',
			},
			{
				step: '02',
				title: 'Laser Alignment System Setup',
				icon: Target,
				desc: 'Mounting of laser transmitter and receiver heads on shafts using precision magnetic brackets. System zeroed and shaft rotation tolerance verified. All relevant dimensions entered into alignment software: coupling diameter, hub-to-hub shaft separation, and measurement distance. Bracket sag compensation verified and applied.',
			},
			{
				step: '03',
				title: 'Initial Misalignment Measurement',
				icon: Activity,
				desc: "Shafts rotated through the measurement arc (three positions: 12, 3, and 9 o'clock). Software calculates actual misalignment: angular misalignment (mrad) and offset (mm) at the coupling face, and the required correction at each machine foot in the vertical and horizontal planes simultaneously.",
			},
			{
				step: '04',
				title: 'Shim & Jackscrew Correction',
				icon: Layers,
				desc: 'Calculated shim corrections applied to the stationary machine feet. Stainless steel precision shims installed or removed in the correct configuration to correct vertical misalignment. Horizontal correction made using alignment jackscrews at machine feet with the laser still active for real-time feedback during correction.',
			},
			{
				step: '05',
				title: 'Hot Alignment Compensation',
				icon: Zap,
				desc: 'Thermal growth of machine casing from cold to operating temperature calculated from OEM thermal growth data or measured using DBSE (distance between shaft ends) monitoring and thermal imaging. Cold alignment target deliberately offset so the machine achieves the correct hot running alignment at full load and temperature.',
			},
			{
				step: '06',
				title: 'Final Measurement & Tolerance Verification',
				icon: CheckCircle2,
				desc: 'Final laser measurement confirms alignment within OEM tolerance — typically: angular misalignment 0.05 mrad max, offset 0.05 mm max at coupling. All four feet re-checked for soft foot 0.05 mm or less. Coupling bolts torqued to OEM specification using calibrated digital torque wrench.',
			},
			{
				step: '07',
				title: 'Alignment Report & Bolt Torque',
				icon: BookOpen,
				desc: 'Detailed alignment report generated by the laser system software: pre-alignment readings, shim changes at each foot, correction vectors applied, and final achieved values against OEM tolerance. Foundation bolt torques recorded. Report signed and issued — forms part of the maintenance record baseline for future alignments.',
			},
		],
		tools: [
			{
				name: 'Pruftechnik Rotalign Pro',
				detail: 'OPTALIGN series — wireless laser alignment',
				icon: Target,
			},
			{
				name: 'SKF TKSA 71',
				detail: 'Wireless laser alignment with app-based reporting',
				icon: Activity,
			},
			{
				name: 'Precision Dial Gauges',
				detail: 'Soft foot measurement — 0.001 mm resolution',
				icon: Cog,
			},
			{
				name: 'SS Precision Shim Sets',
				detail: '0.025 to 3.0 mm in 0.025 mm increments',
				icon: Layers,
			},
			{
				name: 'Digital Torque Wrenches',
				detail: 'Coupling and foundation bolt torquing',
				icon: Wrench,
			},
			{
				name: 'Vibration Analyser',
				detail: 'Pre and post alignment vibration comparison',
				icon: TrendingUp,
			},
			{
				name: 'Thermal Imaging Camera',
				detail: 'Hot bearing and coupling temperature survey',
				icon: Zap,
			},
		],
		standards: [
			{
				code: 'ISO 10816-3 / 20816-3',
				desc: 'Vibration severity evaluation for machines >15 kW',
				body: 'ISO',
			},
			{
				code: 'API 686',
				desc: 'Recommended practice for machinery installation and alignment',
				body: 'API',
			},
			{
				code: 'ASME B31.3',
				desc: 'Process piping nozzle load limits at machine connections',
				body: 'ASME',
			},
			{
				code: 'ISO 1940',
				desc: 'Residual imbalance limits post-alignment correction',
				body: 'ISO',
			},
			{
				code: 'API 612',
				desc: 'Special-purpose steam turbines — alignment requirements',
				body: 'API',
			},
			{
				code: 'OEM Tolerance',
				desc: 'Triveni, Siemens, BHEL, Belliss, Man Turbo, KKK alignment specs',
				body: 'OEM',
			},
		],
	},
	srv_7: {
		tagline:
			'Root Cause Found. Corrective Action Deployed. Turbine Back Online.',
		accentColor: '#dc2626',
		keyStats: [
			{ value: '24×7', label: 'Emergency Deployment' },
			{ value: '10+', label: 'OEM Makes Diagnosed' },
			{ value: 'FFT+Thermal', label: 'Dual Diagnostic Method' },
			{ value: '48hr', label: 'Post-Repair Trend Monitoring' },
		],
		whyUs:
			'A misdiagnosed fault repaired without finding its root cause will fail again — often sooner than the first time. We do not guess. We measure, analyse the spectrum, strip only what the data tells us to strip, confirm the root cause physically, and fix it with the same team that found it.',
		overview:
			"Unplanned turbine trips and unexplained performance degradation cost industrial plants millions in lost production every year. Keshav Enterprises deploys ex-OEM troubleshooting engineers with full diagnostic instrumentation to identify, document, and rectify the precise root cause of any steam turbine fault — from high vibration and bearing failure to governor instability, oil contamination, and steam leakage. We cover all turbine makes from 5 kW to 27 MW across the full spectrum of India's process and power industries. Our methodology is systematic: online measurement first, physical inspection targeted by the data, root cause confirmed in writing, and corrective action executed by the same team that diagnosed the fault.",
		procedures: [
			{
				step: '01',
				title: 'Emergency Mobilisation & Site Data Collection',
				icon: Zap,
				desc: '24×7 response deployment to site with full diagnostic kit. Collection of all available operational data: vibration history, DCS trip logs, oil analysis reports, bearing temperature trends, steam condition logs, and maintenance records. Interview of operations and maintenance personnel who witnessed the fault event.',
			},
			{
				step: '02',
				title: 'Baseline Vibration & Performance Measurement',
				icon: Activity,
				desc: 'Online vibration measurement at all bearing housings: overall vibration level (mm/s RMS), real-time FFT spectrum analysis, 1X and 2X amplitude and phase angle, sub-synchronous and high-frequency components. Steam inlet/exhaust pressure, temperature, and flow benchmarked against design duty. Bearing temperatures mapped using thermal imaging camera.',
			},
			{
				step: '03',
				title: 'Fault Signature Identification & Hypothesis',
				icon: Search,
				desc: 'Analysis of vibration spectrum, phase data, bearing temperature map, and oil sample results to build the fault signature. Each potential root cause systematically mapped against measured evidence: imbalance (dominant 1X), misalignment (dominant 2X), bearing wear (sub-synchronous or bearing defect frequencies), rub (sub-harmonics, high 1X), looseness (multiple harmonics), or steam path fouling (thermal bow).',
			},
			{
				step: '04',
				title: 'Targeted Strip-Down & Physical Inspection',
				icon: Wrench,
				desc: 'Minimum-invasive disassembly targeting only the suspected fault zone — not a full strip unless data demands it. Physical measurement of bearing clearances, shaft runout, coupling alignment, gland seal clearances, and labyrinth seal fits compared against OEM specification. All findings photographed and dimensionally documented.',
			},
			{
				step: '05',
				title: 'Root Cause Confirmation & Written RCA Report',
				icon: BookOpen,
				desc: 'Formal root cause analysis (RCA) report combining on-machine data, strip-down measurements, and OEM specification comparison. Root cause classified and confirmed in writing. Contributing factors identified. Corrective action plan with priority ranking, parts required, estimated downtime, and recommended preventive measures issued to client before work begins.',
			},
			{
				step: '06',
				title: 'Corrective Action Execution',
				icon: Cog,
				desc: 'Direct execution of the corrective action by the same troubleshooting team: rotor re-balancing, bearing replacement and clearance setting, laser alignment correction, gland seal and labyrinth packing replacement, lube oil system flush to ISO 4406, governor overhaul and calibration, or control system calibration. All corrective work documented against OEM specification.',
			},
			{
				step: '07',
				title: 'Post-Repair Commissioning & 48-Hour Trend Monitoring',
				icon: TrendingUp,
				desc: 'Monitored restart with continuous vibration and bearing temperature data logging during speed run-up. Post-repair vibration levels compared against pre-fault baseline and OEM acceptance limits (ISO 10816-3). 48-hour continuous trend monitoring at full load before written clearance report issued and turbine returned to unattended operation.',
			},
		],
		tools: [
			{
				name: 'Multi-Channel Vibration Analyser',
				detail: 'Real-time FFT — CSI 2140 / SKF Microlog class',
				icon: Activity,
			},
			{
				name: 'Proximity Probes',
				detail: 'Eddy current shaft vibration — API 670 standard',
				icon: TrendingUp,
			},
			{
				name: 'Thermal Imaging Camera',
				detail: 'FLIR / Testo — bearing and steam path thermal survey',
				icon: Zap,
			},
			{
				name: 'Stroboscope + Phase Reference',
				detail: '1X amplitude and phase angle measurement',
				icon: Search,
			},
			{
				name: 'Portable Oil Particle Counter',
				detail: 'ISO 11500 — lube oil contamination on-site',
				icon: Droplets,
			},
			{
				name: 'Borescope',
				detail: 'Rigid & flexible — blade inspection without full strip',
				icon: Hexagon,
			},
			{
				name: 'XRF PMI Analyser',
				detail: 'Alloy identification of failed components',
				icon: Shield,
			},
			{
				name: 'Laser Shaft Alignment System',
				detail: 'Coupling and bearing alignment confirmation',
				icon: Target,
			},
			{
				name: 'Karl Fischer Titrator',
				detail: 'Free water content in lube oil — contamination check',
				icon: Layers,
			},
			{
				name: 'Governor Calibration Equipment',
				detail: 'Speed reference and control system instruments',
				icon: Cog,
			},
		],
		standards: [
			{
				code: 'ISO 10816-3 / 20816-3',
				desc: 'Vibration severity limits for industrial machines >15 kW',
				body: 'ISO',
			},
			{
				code: 'API 670',
				desc: 'Machinery protection: vibration, axial position, temperature',
				body: 'API',
			},
			{
				code: 'API 612',
				desc: 'Special-purpose steam turbines for petroleum and chemical service',
				body: 'API',
			},
			{
				code: 'ISO 4406:99',
				desc: 'Lube oil cleanliness classification',
				body: 'ISO',
			},
			{
				code: 'ASME PTC 6',
				desc: 'Steam turbine performance test code for efficiency benchmarking',
				body: 'ASME',
			},
			{
				code: 'ISO 14224',
				desc: 'Reliability and maintenance data collection for equipment',
				body: 'ISO',
			},
			{
				code: 'OEM Manuals',
				desc: 'Triveni, Siemens, BHEL, Belliss, Man Turbo, KKK, ABB',
				body: 'OEM',
			},
		],
		faultMatrix: [
			{
				symptom: 'High vibration — 1X dominant',
				causes: [
					'Rotor imbalance (residual or deposit-induced)',
					'Rotor bow (thermal or mechanical)',
					'Excessive bearing clearance',
				],
				action: 'Dynamic balancing, rotor inspection, bearing replacement',
			},
			{
				symptom: 'High vibration — 2X dominant',
				causes: [
					'Shaft misalignment (angular or offset)',
					'Coupling fault',
					'Casing distortion / pipe strain',
				],
				action: 'Laser alignment, coupling inspection, pipe strain measurement',
			},
			{
				symptom: 'Sub-synchronous vibration',
				causes: [
					'Oil whirl / oil whip in journal bearings',
					'Rub-induced instability',
					'Loose bearing fit',
				],
				action:
					'Bearing clearance reset, lube oil pressure/viscosity check, rub clearance inspection',
			},
			{
				symptom: 'High-frequency vibration (>3X)',
				causes: [
					'Blade fouling or erosion',
					'Looseness in foundation or bearing cap',
					'Gear mesh fault (gearbox)',
				],
				action:
					'Blade inspection (borescope), bearing cap torque check, gearbox inspection',
			},
			{
				symptom: 'Bearing oil contamination / water in oil',
				causes: [
					'Carbon ring gland seal wear',
					'Gland steam pressure too high',
					'Condensate ingress via exhaust',
				],
				action:
					'Carbon ring replacement, gland steam pressure reset, lube oil system flush',
			},
			{
				symptom: 'Steam gland leakage',
				causes: [
					'Labyrinth seal wear (excessive clearance)',
					'Gland packing worn or damaged',
					'Gland steam pressure incorrectly set',
				],
				action:
					'Labyrinth seal replacement, gland packing replacement, gland steam controller calibration',
			},
			{
				symptom: 'Governor hunting / speed instability',
				causes: [
					'Governor linkage wear or sticktion',
					'Dirty oil / sludge in PG-PL governor',
					'Compensation needle valve maladjustment',
				],
				action:
					'Governor linkage overhaul, governor oil flush and refill, needle valve re-calibration',
			},
			{
				symptom: 'Low lube oil pressure trip',
				causes: [
					'Oil pump wear',
					'Oil cooler fouling / high oil temperature',
					'Pressure relief valve stuck open',
					'Low oil level or cavitation',
				],
				action:
					'Oil pump inspection, cooler cleaning, PRV inspection, oil level and system check',
			},
			{
				symptom: 'Overspeed trip — spurious or actual',
				causes: [
					'Trip pin wear or incorrect setting',
					'Governor valve passing steam',
					'Actuator or control oil fault',
				],
				action:
					'Trip pin inspection and re-setting, governor valve seat inspection, control system check',
			},
			{
				symptom: 'Power output / efficiency loss',
				causes: [
					'Blade fouling (steam purity / attemperating water contamination)',
					'Seal strip wear (increased steam bypass)',
					'Nozzle erosion or blockage',
				],
				action:
					'Borescope inspection, seal strip replacement, nozzle inspection and cleaning',
			},
		],
	},
};

// ─── SERVICE DETAIL PAGE ─────────────────────────────────────
// CSS injected once. Matches site theme: #0A192F navy, blue-600 primary,
// slate-200 borders, rounded-2xl cards, blue-50 hover tints.
const SERVICE_DETAIL_CSS = `
@keyframes sdFadeUp  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
@keyframes sdBarFill { from { width:0 }  to { width:56px } }

.sd-reveal      { opacity:0 }
.sd-reveal-stat { opacity:0 }
.sd-step-line   { transform-origin:top; transform:scaleY(0);
                  transition:transform 0.5s ease 0.1s }

.sd-reveal.sd-visible      { animation:sdFadeUp 0.45s ease forwards }
.sd-reveal-stat.sd-visible { animation:sdFadeUp 0.35s ease forwards }
.sd-step-line.sd-visible   { transform:scaleY(1) }

/* Matches site .section-divider: rounded pill, blue-600 */
.sd-accent-bar { width:0; height:6px; border-radius:9999px; background:#2563eb;
  animation:sdBarFill 0.6s ease 0.2s forwards }

/* Procedure card — matches site card hover: border-blue-300 shadow lift */
.sd-proc-row { transition:border-color 0.2s, box-shadow 0.2s, transform 0.2s }
.sd-proc-row:hover { border-color:#93c5fd; box-shadow:0 8px 24px -4px rgba(37,99,235,0.12); transform:translateY(-2px) }

/* Tool / Standard rows — blue-50 tint matches site hover */
.sd-tool-row { transition:background 0.15s }
.sd-tool-row:hover { background:#eff6ff }
.sd-std-row  { transition:background 0.15s }
.sd-std-row:hover  { background:#eff6ff }
.sd-fault-row { transition:background 0.15s }
.sd-fault-row:hover { background:#f8fafc }

/* Stat block separator — white/10 on dark bg matches site stats bar */
.sd-stat-block { border-right:1px solid rgba(255,255,255,0.08) }
.sd-stat-block:last-child { border-right:none }

/* Sidebar nav — active = blue-600 matching CTA button */
.sd-sidenav-active { background:#2563eb; color:#fff }
.sd-sidenav-item   { transition:background 0.15s, color 0.15s }
.sd-sidenav-item:hover:not(.sd-sidenav-active) { background:#eff6ff; color:#1d4ed8 }

@media(prefers-reduced-motion:reduce){
  .sd-reveal,.sd-reveal-stat { opacity:1!important; animation:none!important }
  .sd-step-line { transform:scaleY(1)!important; transition:none!important }
  .sd-accent-bar { width:56px!important; animation:none!important }
}
`;

// ─── SERVICE DETAIL PAGE ─────────────────────────────────────
// SERVICE_DETAIL_CSS defined above

const ServiceDetailPage = memo(({ serviceId, navigate }) => {
	const service = SERVICES.find((s) => s.id === serviceId);
	const detail = SERVICE_DETAIL_DATA[serviceId];
	const Icon = SERVICE_ICONS[serviceId];
	const serviceIndex = SERVICES.findIndex((s) => s.id === serviceId);
	const prevService = serviceIndex > 0 ? SERVICES[serviceIndex - 1] : null;
	const nextService =
		serviceIndex < SERVICES.length - 1 ? SERVICES[serviceIndex + 1] : null;
	const [heroVisible, setHeroVisible] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	// Inject CSS once
	useEffect(() => {
		const id = 'sd-css';
		if (!document.getElementById(id)) {
			const s = document.createElement('style');
			s.id = id;
			s.textContent = SERVICE_DETAIL_CSS;
			document.head.appendChild(s);
		}
	}, []);

	// Scroll-to-top + hero entrance on service change
	const [prevServiceId, setPrevServiceId] = useState(serviceId);
	if (serviceId !== prevServiceId) {
		setPrevServiceId(serviceId);
		setHeroVisible(false);
		setScrollY(0);
	}
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });
		const t = setTimeout(() => setHeroVisible(true), 60);
		return () => clearTimeout(t);
	}, [serviceId]);

	// Reading progress + parallax
	useEffect(() => {
		const h = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', h, { passive: true });
		return () => window.removeEventListener('scroll', h);
	}, []);

	// IntersectionObserver — reveal sd-reveal* and sd-step-line
	useEffect(() => {
		const selectors = '.sd-reveal, .sd-reveal-stat, .sd-step-line';
		const els = document.querySelectorAll(selectors);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					const siblings = Array.from(e.target.parentElement?.children || []);
					const idx = siblings.indexOf(e.target);
					const delay = Math.min(idx * 55, 330);
					setTimeout(() => e.target.classList.add('sd-visible'), delay);
					io.unobserve(e.target);
				}
			},
			{ threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
		);
		for (const el of els) {
			io.observe(el);
		}
		return () => io.disconnect();
	}, [serviceId]);

	const docH =
		typeof document !== 'undefined'
			? document.documentElement.scrollHeight - window.innerHeight
			: 1;
	const progress = Math.min(100, docH > 0 ? (scrollY / docH) * 100 : 0);

	const hs = (delay) => ({
		opacity: heroVisible ? 1 : 0,
		transform: heroVisible ? 'translateY(0)' : 'translateY(14px)',
		transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
	});

	if (!service || !detail)
		return (
			<main
				id="main-content"
				tabIndex={-1}
				className="pt-24 pb-20 bg-white min-h-screen flex items-center justify-center"
			>
				<div className="text-center">
					<h1 className="text-3xl font-black text-slate-900 mb-4">
						Service Not Found
					</h1>
					<button
						type="button"
						onClick={() => navigate('/services')}
						className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-500 transition-all"
					>
						Back to Services
					</button>
				</div>
			</main>
		);

	return (
		<main id="main-content" tabIndex={-1} className="pt-24 pb-24 bg-white">
			<SEOHead
				title={`${service.title} — Keshav Enterprises`}
				description={`${service.desc} Ex-OEM engineers. ISO/API standard procedures. 24×7 availability across India.`}
				canonicalPath={`/service/${serviceId}`}
				pageType="website"
			/>

			{/* Reading progress bar — blue-600 matching site CTA */}
			<div
				className="fixed top-0 left-0 right-0 z-60 h-0.75 bg-slate-200"
				aria-hidden="true"
			>
				<div
					className="h-full bg-blue-600 transition-[width] duration-75 ease-linear"
					style={{ width: `${progress}%` }}
				/>
			</div>

			{/* ══ HERO — #0A192F navy matching site Navbar / ServicesPage hero ══ */}
			<div
				className="bg-[#0A192F] text-white relative overflow-hidden"
				style={{ borderBottom: '8px solid #2563eb', minHeight: '480px' }}
			>
				{/* Grid texture — matches ServicesPage hero */}
				<div
					className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem]"
					aria-hidden="true"
				/>

				{/* Service photo — object-cover fills the container */}
				{service.image && (
					<img
						src={service.image}
						alt=""
						aria-hidden="true"
						className="absolute inset-0 w-full h-full object-cover opacity-35"
						loading="eager"
						decoding="async"
						fetchPriority="high"
						width="1200"
						height="420"
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/>
				)}
				{/* Gradient — left dark for text legibility, right opens up to show image */}
				<div className="absolute inset-0 bg-linear-to-r from-[#0A192F]/90 via-[#0A192F]/60 to-[#0A192F]/30" />
				{/* Bottom fade — ensures stat bar reads cleanly over image */}
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0A192F]/70 to-transparent" />

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					{/* Breadcrumb */}
					<nav aria-label="Breadcrumb" className="mb-10" style={hs(0)}>
						<ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
							<li>
								<button
									type="button"
									onClick={() => navigate('/')}
									className="hover:text-slate-300 transition-colors focus:outline-none focus-visible:underline"
								>
									Home
								</button>
							</li>
							<li aria-hidden="true" className="text-slate-700">
								/
							</li>
							<li>
								<button
									type="button"
									onClick={() => navigate('/services')}
									className="hover:text-slate-300 transition-colors focus:outline-none focus-visible:underline"
								>
									Services
								</button>
							</li>
							<li aria-hidden="true" className="text-slate-700">
								/
							</li>
							<li className="text-slate-400">{service.title}</li>
						</ol>
					</nav>

					<div className="flex items-start gap-8">
						{/* Icon box — matches site stat icon wells: bg-blue-600/20 border-blue-500/30 */}
						{Icon && (
							<div
								className="hidden sm:flex shrink-0 mt-1 w-16 h-16 rounded-2xl items-center justify-center bg-blue-600/20 border border-blue-500/30"
								style={{
									opacity: heroVisible ? 1 : 0,
									transform: heroVisible ? 'none' : 'scale(0.85)',
									transition:
										'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
								}}
							>
								<Icon className="w-8 h-8 text-blue-400" aria-hidden="true" />
							</div>
						)}

						<div className="flex-1 min-w-0">
							{/* Label — matches site blue-400 label style */}
							<p
								className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4"
								style={hs(0.1)}
							>
								Technical Service
							</p>
							<h1
								className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5 text-white drop-shadow-lg"
								style={hs(0.18)}
							>
								{service.title}
							</h1>
							{/* Section divider — matches site .section-divider pill */}
							<div className="sd-accent-bar mb-6" aria-hidden="true" />
							<p
								className="text-slate-300 font-medium text-base md:text-xl max-w-2xl leading-relaxed"
								style={hs(0.26)}
							>
								{detail.tagline}
							</p>

							{/* Key stats — matches site stats bar pattern (bg-blue-600/20 icon wells on slate-900) */}
							{detail.keyStats && (
								<div
									className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-10 overflow-hidden rounded-xl border border-white/10"
									style={hs(0.34)}
								>
									{detail.keyStats.map((stat) => (
										<div
											key={stat.label}
											className="sd-stat-block bg-slate-800/60 backdrop-blur-sm px-4 py-5 text-center"
										>
											<div className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
												{stat.value}
											</div>
											<div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mt-1 leading-tight">
												{stat.label}
											</div>
										</div>
									))}
								</div>
							)}

							{/* OEM chips — matches site OEM chips on ServicesPage card */}
							{service.oems && (
								<div className="mt-6" style={hs(0.42)}>
									<p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">
										OEM Expertise
									</p>
									<div className="flex flex-wrap gap-1.5">
										{service.oems.map((oem) => (
											<span
												key={oem}
												className="text-[10px] font-black text-slate-200 bg-slate-800/80 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wide border border-white/10"
											>
												{oem}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* ══ BODY ══ */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
				{/* Mobile CTA strip — shown only on mobile, above main content */}
				<div className="flex flex-col sm:flex-row gap-3 mb-8 lg:hidden">
					<a
						href={waMsg(
							`Hello KESHAV ENTERPRISES, I need a quote for *${service.title}*. Please contact me.`,
						)}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-2 flex-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-4 font-black text-sm transition-colors rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 min-h-13"
					>
						<MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />{' '}
						Get a Quote on WhatsApp
					</a>
					<button
						type="button"
						onClick={() => navigate('/contact')}
						className="flex items-center justify-center gap-2 flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-black text-sm transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 min-h-13"
					>
						Submit Formal RFQ{' '}
						<ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">
					{/* ── MAIN COLUMN ── */}
					<div className="lg:col-span-2 space-y-20">
						{/* Why Us — matches site blue-50 bg callout blocks */}
						{detail.whyUs && (
							<div className="sd-reveal bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
								<div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
									<Shield
										className="w-5 h-5 text-blue-600"
										aria-hidden="true"
									/>
								</div>
								<div>
									<p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
										Why Keshav Enterprises
									</p>
									<p className="text-slate-800 font-semibold text-sm leading-relaxed">
										{detail.whyUs}
									</p>
								</div>
							</div>
						)}

						{/* Overview */}
						<section aria-labelledby="overview-heading">
							<div className="sd-reveal flex items-center gap-4 mb-5">
								<span className="w-10 h-0.5 bg-blue-600" aria-hidden="true" />
								<h2
									id="overview-heading"
									className="font-black uppercase tracking-widest text-xs text-slate-500"
								>
									Service Overview
								</h2>
							</div>
							<p className="sd-reveal text-slate-600 font-medium text-base leading-relaxed">
								{detail.overview}
							</p>
						</section>

						{/* Procedures */}
						<section aria-labelledby="procedure-heading">
							<div className="sd-reveal flex items-center gap-4 mb-4">
								<span className="w-10 h-0.5 bg-blue-600" aria-hidden="true" />
								<h2
									id="procedure-heading"
									className="font-black uppercase tracking-widest text-xs text-slate-500"
								>
									Step-by-Step Procedure
								</h2>
							</div>
							<h3 className="sd-reveal text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-10">
								How Our Engineers Execute This
							</h3>

							<div className="space-y-4">
								{detail.procedures.map((proc, i) => {
									const PIcon = proc.icon;
									return (
										<div
											key={proc.label}
											className="sd-reveal sd-proc-row bg-white border border-slate-200 rounded-2xl overflow-hidden flex gap-0 shadow-sm"
											style={{ animationDelay: `${i * 50}ms` }}
										>
											{/* Step column — #0A192F matching site dark headers */}
											<div className="w-16 shrink-0 bg-[#0A192F] flex flex-col items-center justify-start pt-5 gap-2 pb-5">
												<span className="text-xs font-black text-blue-400 leading-none">
													{proc.step}
												</span>
												{PIcon && (
													<PIcon
														className="w-4 h-4 text-slate-500 mt-1"
														aria-hidden="true"
													/>
												)}
												{i < detail.procedures.length - 1 && (
													<div
														className="sd-step-line w-px flex-1 bg-slate-700 mt-2"
														aria-hidden="true"
													/>
												)}
											</div>
											{/* Content */}
											<div className="flex-1 min-w-0 px-6 py-5">
												<h4 className="text-sm font-black text-slate-900 mb-2 tracking-tight">
													{proc.title}
												</h4>
												<p className="text-slate-600 font-medium text-sm leading-relaxed">
													{proc.desc}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</section>

						{/* Tools & Equipment */}
						<section aria-labelledby="tools-heading">
							<div className="sd-reveal flex items-center gap-4 mb-4">
								<span className="w-10 h-0.5 bg-blue-600" aria-hidden="true" />
								<h2
									id="tools-heading"
									className="font-black uppercase tracking-widest text-xs text-slate-500"
								>
									Tools &amp; Equipment
								</h2>
							</div>
							<h3 className="sd-reveal text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8">
								Instrumentation We Deploy
							</h3>

							{/* Table matches site "What We Deliver" pattern */}
							<div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
								<div className="bg-[#0A192F] px-6 py-4 flex gap-6">
									<span className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-8">
										No.
									</span>
									<span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
										Equipment / Instrument
									</span>
								</div>
								<ul className="divide-y divide-slate-100">
									{detail.tools.map((tool, i) => {
										const TIcon = tool.icon;
										return (
											<li
												key={tool.name}
												className="sd-reveal sd-tool-row flex items-start px-6 py-4 gap-4"
												style={{ animationDelay: `${i * 40}ms` }}
											>
												<span className="text-[11px] font-black text-slate-400 w-8 pt-0.5 shrink-0">
													{String(i + 1).padStart(2, '0')}
												</span>
												<div className="flex items-start gap-3 flex-1 min-w-0">
													{TIcon && (
														<div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
															<TIcon
																className="w-4 h-4 text-blue-600"
																aria-hidden="true"
															/>
														</div>
													)}
													<div>
														<p className="font-black text-slate-900 text-sm">
															{tool.name}
														</p>
														<p className="text-slate-500 text-xs font-medium mt-0.5">
															{tool.detail}
														</p>
													</div>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</section>

						{/* Fault Diagnosis Matrix — srv_7 only */}
						{detail.faultMatrix && (
							<section aria-labelledby="fault-matrix-heading">
								<div className="sd-reveal flex items-center gap-4 mb-4">
									<span
										className="w-10 h-0.5 bg-blue-600"
										aria-hidden="true"
									/>
									<h2
										id="fault-matrix-heading"
										className="font-black uppercase tracking-widest text-xs text-slate-500"
									>
										Fault Diagnosis Matrix
									</h2>
								</div>
								<h3 className="sd-reveal text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-3">
									Symptom → Root Cause → Corrective Action
								</h3>
								<p className="sd-reveal text-slate-500 font-medium text-sm mb-10 leading-relaxed">
									Systematic reference built from decades of OEM and field
									experience. Used to move from symptom to confirmed root cause
									in minimum time.
								</p>
								<div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
									<div className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_2fr] bg-[#0A192F] min-w-135">
										{[
											'Symptom Observed',
											'Possible Root Causes',
											'Corrective Action',
										].map((h) => (
											<div
												key={h}
												className="px-5 py-3.5 border-r border-slate-700 last:border-r-0"
											>
												<span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
													{h}
												</span>
											</div>
										))}
									</div>
									{detail.faultMatrix.map((row, i) => (
										<div
											key={`fault-${row.symptom}`}
											className="sd-reveal sd-fault-row grid grid-cols-1 sm:grid-cols-[2fr_2fr_2fr] divide-y sm:divide-y-0 sm:divide-x divide-slate-100 border-b border-slate-100 last:border-b-0 min-w-135"
											style={{ animationDelay: `${i * 45}ms` }}
										>
											<div className="px-5 py-4">
												<p className="text-sm font-black text-slate-900">
													{row.symptom}
												</p>
											</div>
											<div className="px-5 py-4">
												<ul className="space-y-1.5">
													{row.causes.map((c, ci) => (
														<li
															key={`${c}-${ci}`}
															className="flex items-start gap-2"
														>
															<span
																className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"
																aria-hidden="true"
															/>
															<span className="text-xs text-slate-600 font-medium leading-snug">
																{c}
															</span>
														</li>
													))}
												</ul>
											</div>
											<div className="px-5 py-4 bg-blue-50/40">
												<p className="text-xs text-slate-700 font-semibold leading-snug">
													{row.action}
												</p>
											</div>
										</div>
									))}
								</div>
							</section>
						)}

						{/* Standards & Compliance */}
						<section aria-labelledby="standards-heading">
							<div className="sd-reveal flex items-center gap-4 mb-4">
								<span className="w-10 h-0.5 bg-blue-600" aria-hidden="true" />
								<h2
									id="standards-heading"
									className="font-black uppercase tracking-widest text-xs text-slate-500"
								>
									Standards &amp; Compliance
								</h2>
							</div>
							<h3 className="sd-reveal text-2xl font-black text-slate-900 tracking-tight mb-8">
								International Standards We Work To
							</h3>
							<div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
								<ul className="divide-y divide-slate-100">
									{detail.standards.map((std, i) => (
										<li
											key={std.code}
											className="sd-reveal sd-std-row flex items-start gap-4 px-6 py-4"
											style={{ animationDelay: `${i * 40}ms` }}
										>
											{/* Body badge — blue-50 matches site card accent pattern */}
											<span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded uppercase tracking-wider shrink-0 mt-0.5 min-w-11 text-center">
												{std.body}
											</span>
											<div>
												<p className="font-black text-slate-900 text-sm">
													{std.code}
												</p>
												<p className="text-slate-500 font-medium text-xs mt-0.5">
													{std.desc}
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
						</section>

						{/* Bottom CTA — matches site bg-slate-900 CTA section */}
						<section
							aria-labelledby="cta-service-heading"
							className="sd-reveal bg-slate-900 p-8 md:p-10 text-white rounded-2xl"
						>
							<p className="text-blue-400 font-black text-xs uppercase tracking-widest mb-3">
								Ready to Start?
							</p>
							<h3
								id="cta-service-heading"
								className="text-2xl font-black tracking-tight mb-3"
							>
								{service.title}
							</h3>
							<p className="text-slate-400 font-medium mb-8 max-w-lg leading-relaxed text-sm">
								Speak directly to our ex-OEM engineers about your turbine make,
								site conditions, and shutdown window.
							</p>
							<div className="flex flex-col sm:flex-row gap-3">
								<a
									href={waMsg(
										`Hello KESHAV ENTERPRISES, I need a quote for *${service.title}*. Please contact me.`,
									)}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3.5 rounded-xl font-black text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 shadow-lg"
								>
									<MessageCircle
										className="w-4 h-4 shrink-0"
										aria-hidden="true"
									/>{' '}
									WhatsApp Us Now
								</a>
								<button
									type="button"
									onClick={() => navigate('/contact')}
									className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-black text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 shadow-lg"
								>
									Submit Formal RFQ{' '}
									<ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
								</button>
							</div>
						</section>
					</div>

					{/* ── SIDEBAR ── */}
					<aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
						{/* What We Deliver — matches site "What We Deliver" card */}
						<div className="sd-reveal bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
							<div className="bg-[#0A192F] px-5 py-4 flex items-center gap-3">
								<div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30">
									<CheckCircle2
										className="w-4 h-4 text-blue-400"
										aria-hidden="true"
									/>
								</div>
								<h3 className="font-black text-white text-sm uppercase tracking-widest">
									What We Deliver
								</h3>
							</div>
							<ul className="divide-y divide-slate-100">
								{service.details.map((d) => (
									<li
										key={d}
										className="flex items-start px-5 py-3.5 hover:bg-blue-50/30 transition-colors"
									>
										<CheckCircle2
											className="w-4 h-4 text-blue-500 mr-3 shrink-0 mt-0.5"
											aria-hidden="true"
										/>
										<span className="text-slate-700 font-medium text-sm leading-relaxed">
											{d}
										</span>
									</li>
								))}
							</ul>
						</div>

						{/* WhatsApp CTA — matches site btn-wa */}
						<a
							href={waMsg(
								`Hello KESHAV ENTERPRISES, I need a quote for *${service.title}*. Please contact me.`,
							)}
							target="_blank"
							rel="noopener noreferrer"
							className="sd-reveal flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-4 font-black text-sm transition-colors rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
						>
							<MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />{' '}
							Get a Quote on WhatsApp
						</a>

						{/* RFQ button — matches site btn-primary */}
						<button
							type="button"
							onClick={() => navigate('/contact')}
							className="sd-reveal w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-black text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 flex items-center justify-center gap-2"
						>
							Submit Formal RFQ{' '}
							<ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
						</button>

						{/* All Services Nav — matches site card header pattern */}
						<div className="sd-reveal bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
							<div className="bg-[#0A192F] px-5 py-4">
								<h4 className="font-black text-white text-sm uppercase tracking-widest">
									All Services
								</h4>
							</div>
							<nav aria-label="Service navigation">
								<ul className="divide-y divide-slate-100">
									{SERVICES.map((s) => {
										const SIcon = SERVICE_ICONS[s.id];
										const isActive = s.id === serviceId;
										return (
											<li key={s.id}>
												<button
													type="button"
													onClick={() => navigate(`/service/${s.id}`)}
													className={`sd-sidenav-item w-full flex items-center gap-3 px-5 py-3.5 text-sm font-bold transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${isActive ? 'sd-sidenav-active' : 'text-slate-700'}`}
													aria-current={isActive ? 'page' : undefined}
												>
													{SIcon && (
														<SIcon
															className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-200' : 'text-blue-500'}`}
															aria-hidden="true"
														/>
													)}
													<span className="flex-1 leading-tight">
														{s.title}
													</span>
													{isActive && (
														<ChevronRight
															className="w-3.5 h-3.5 shrink-0 text-blue-200"
															aria-hidden="true"
														/>
													)}
												</button>
											</li>
										);
									})}
								</ul>
							</nav>
						</div>
					</aside>
				</div>

				{/* Prev / Next — matches site border-slate-200 card pattern */}
				{(prevService || nextService) && (
					<nav
						aria-label="Adjacent service navigation"
						className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4"
					>
						{prevService ? (
							<button
								type="button"
								onClick={() => navigate(`/service/${prevService.id}`)}
								className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
							>
								<div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
									<ChevronLeft
										className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors"
										aria-hidden="true"
									/>
								</div>
								<div className="min-w-0">
									<p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">
										Previous
									</p>
									<p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors text-sm truncate">
										{prevService.title}
									</p>
								</div>
							</button>
						) : (
							<div />
						)}
						{nextService && (
							<button
								type="button"
								onClick={() => navigate(`/service/${nextService.id}`)}
								className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all group text-right justify-end sm:col-start-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
							>
								<div className="min-w-0 text-right">
									<p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">
										Next
									</p>
									<p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors text-sm truncate">
										{nextService.title}
									</p>
								</div>
								<div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
									<ChevronRight
										className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors"
										aria-hidden="true"
									/>
								</div>
							</button>
						)}
					</nav>
				)}
			</div>
		</main>
	);
});
ServiceDetailPage.displayName = 'ServiceDetailPage';

// ─── PRODUCTS PAGE ────────────────────────────────────────────
const ProductsPage = memo(({ navigate }) => {
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
		return () => {
			clearTimeout(t);
			window.removeEventListener('resize', handleScroll);
		};
	}, [activeCategory, handleScroll]);
	const scrollCats = useCallback((dir) => {
		categoryScrollRef.current?.scrollBy({
			left: dir === 'left' ? -350 : 350,
			behavior: 'smooth',
		});
	}, []);
	// PERF FIX: useMemo for filtering
	const filtered = useMemo(
		() =>
			PRODUCTS.filter((p) => {
				if (activeCategory !== 'All' && p.category !== activeCategory)
					return false;
				const q = searchQuery.toLowerCase().trim();
				if (!q) return true;
				return (
					p.title.toLowerCase().includes(q) ||
					p.desc.toLowerCase().includes(q) ||
					p.usage?.toLowerCase().includes(q) ||
					p.features.some((f) => f.toLowerCase().includes(q))
				);
			}),
		[activeCategory, searchQuery],
	);
	const counts = useMemo(
		() =>
			PRODUCT_CATEGORIES.reduce((a, c) => {
				a[c] =
					c === 'All'
						? PRODUCTS.length
						: PRODUCTS.filter((p) => p.category === c).length;
				return a;
			}, {}),
		[],
	);
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className="pt-24 pb-20 bg-slate-50 min-h-screen"
		>
			<SEOHead
				title="Product Catalog — Turbine Spares, Filters, Expansion Joints"
				description={`${PRODUCTS.length} precision-engineered industrial products: turbine spares, filter elements, expansion joints, strainers, flexible hoses, rubber products, and electronic equipment.`}
				canonicalPath="/products"
				pageType="website"
			/>
			<div className="bg-[#0A192F] text-white py-20 mb-12 relative overflow-hidden border-b-8 border-blue-600">
				<div
					className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem]"
					aria-hidden="true"
				/>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
					<h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
						Industrial Products
					</h1>
					<div
						className="section-divider w-20 h-1.5 bg-blue-500 mb-6 rounded-full"
						aria-hidden="true"
					/>
					<p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl leading-relaxed">
						{PRODUCTS.length} precision-engineered products across{' '}
						{PRODUCT_CATEGORIES.length - 1} categories. ISO/API/ASME compliant
						with full technical specifications.
					</p>
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-12 flex flex-col gap-6">
					<div className="relative w-full max-w-2xl mx-auto md:mx-0">
						<label htmlFor="product-search" className="sr-only">
							Search products by name, specification, or application
						</label>
						<input
							id="product-search"
							type="search"
							placeholder="Search products, specs, applications..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-md"
						/>
						<Search
							className="absolute left-5 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400 pointer-events-none"
							aria-hidden="true"
						/>
						{searchQuery && (
							<button
								type="button"
								onClick={() => setSearchQuery('')}
								aria-label="Clear search"
								className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
							>
								<X className="w-5 h-5" aria-hidden="true" />
							</button>
						)}
					</div>
					{/* biome-ignore lint/a11y/useSemanticElements: toolbar grouping, not a form fieldset */}
					<div
						className="relative w-full flex items-center mt-2"
						role="group"
						aria-label="Filter by product category"
					>
						<button
							type="button"
							onClick={() => scrollCats('left')}
							aria-label="Scroll categories left"
							className={`absolute left-1 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
						>
							<ChevronLeft
								className="w-5 h-5 md:w-6 md:h-6"
								aria-hidden="true"
							/>
						</button>
						<div
							ref={categoryScrollRef}
							onScroll={handleScroll}
							style={{ scrollPaddingInline: '3rem' }}
							className="flex gap-2 sm:gap-3 overflow-x-auto w-full pb-6 pt-2 px-12 sm:px-14 md:px-16 snap-x snap-mandatory scroll-smooth relative z-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
						>
							{PRODUCT_CATEGORIES.map((cat) => (
								<button
									type="button"
									key={cat}
									onClick={() => setActiveCategory(cat)}
									aria-pressed={activeCategory === cat}
									className={`snap-start shrink-0 px-5 py-3 rounded-full text-sm font-black whitespace-nowrap transition-all duration-300 border-2 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm'}`}
								>
									{cat}
									<span
										className={`text-xs px-1.5 py-0.5 rounded-full font-black ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}
									>
										{counts[cat]}
									</span>
								</button>
							))}
						</div>
						<button
							type="button"
							onClick={() => scrollCats('right')}
							aria-label="Scroll categories right"
							className={`absolute right-1 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
						>
							<ChevronRight
								className="w-5 h-5 md:w-6 md:h-6"
								aria-hidden="true"
							/>
						</button>
					</div>
					{(searchQuery || activeCategory !== 'All') && (
						<div
							className="flex items-center gap-3 -mt-2"
							role="status"
							aria-live="polite"
						>
							<span className="text-sm font-bold text-slate-500">
								{filtered.length} product{filtered.length !== 1 ? 's' : ''}{' '}
								found
							</span>
							<button
								type="button"
								onClick={() => {
									setSearchQuery('');
									setActiveCategory('All');
								}}
								className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors focus:outline-none focus-visible:underline"
							>
								<X className="w-4 h-4" aria-hidden="true" />
								Clear filters
							</button>
						</div>
					)}
				</div>
				{filtered.length > 0 ? (
					<ul
						className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
						aria-label={`${filtered.length} products`}
					>
						{filtered.map((p, idx) => (
							<li key={p.id}>
								<ProductCard
									product={p}
									navigate={navigate}
									priority={idx < 6}
								/>
							</li>
						))}
					</ul>
				) : (
					<div
						className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-300 shadow-sm"
						role="status"
					>
						<Search
							className="w-20 h-20 text-slate-200 mx-auto mb-6"
							aria-hidden="true"
						/>
						<h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
							No products found
						</h2>
						<p className="text-slate-500 font-medium text-lg">
							Try adjusting your search or category filter.
						</p>
						<button
							type="button"
							onClick={() => {
								setSearchQuery('');
								setActiveCategory('All');
							}}
							className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
						>
							Clear all filters
						</button>
					</div>
				)}
			</div>
		</main>
	);
});
ProductsPage.displayName = 'ProductsPage';

// ─── INDUSTRY DETAIL PAGE ─────────────────────────────────────────────
const INDUSTRY_DETAILS = {
	ind_1: {
		heroSub:
			'Steam turbines from 5 MW to 27 MW — thermal, co-gen & captive power',
		overview: `India's thermal and captive power sector depends on the uninterrupted performance of steam turbines operating under continuous load. Keshav Enterprises has deep OEM-era expertise — our engineers were trained by turbine manufacturers before founding the company — giving us the ability to reverse-engineer, manufacture, and overhaul every major sub-system of a power plant steam turbine to OEM tolerances.`,
		challenges: [
			{
				title: 'Continuous High-Load Operation',
				desc: 'Steam turbines in power plants run at 3000–3600 RPM under sustained full-load conditions, placing extreme stress on bearings, seals, and rotating assemblies.',
			},
			{
				title: 'Lube Oil Contamination',
				desc: 'Particulate and water ingression into the lube oil system can rapidly degrade bearing surfaces. ISO 4406:99 cleanliness targets must be maintained continuously.',
			},
			{
				title: 'Thermal Expansion in Steam Lines',
				desc: 'High-temperature steam piping undergoes significant thermal cycling. Without properly engineered expansion joints, piping stress causes flange leaks and turbine nozzle damage.',
			},
			{
				title: 'Rotor Vibration & Balance Drift',
				desc: 'Deposit build-up and erosion cause progressive balance shift in rotors, increasing vibration and accelerating bearing wear if not caught early.',
			},
		],
		products: [
			{
				name: 'Lube Oil Filter Elements (180 GPM)',
				purpose:
					'Maintains ISO 4406:99 cleanliness in turbine lube oil systems, protecting journal bearings and thrust bearings from abrasive wear.',
				features: [
					'Glass fiber fleece VG media, 6–25 µm fineness',
					'IS27 anti-static spec for synthetic oils',
					'Triveni, Siemens, BHEL OEM compatible',
				],
			},
			{
				name: 'Steam Crossover Bellows',
				purpose:
					'Absorbs thermal expansion between HP/LP turbine sections and the crossover pipe, eliminating stress transfer to turbine nozzle flanges.',
				features: [
					'High-cycle SS bellows, EJMA standard',
					'Operating temp up to 550°C',
					'Custom flanged ends to OEM dimensions',
				],
			},
			{
				name: 'Babbitt Journal & Thrust Bearings',
				purpose:
					'White-metal lined bearings precisely machined to OEM profiles for turbine rotors — critical for shaft stability at high speed.',
				features: [
					'White metal (Babbitt) poured & precision-machined',
					'All turbine makes: Triveni, Siemens, BHEL, KKK',
					'Interference fit verified on CMM',
				],
			},
			{
				name: 'Emergency Stop Valves',
				purpose:
					'Safety-critical valve that trips the turbine on overspeed or lube oil low pressure — manufactured to OEM trip pressure settings.',
				features: [
					'CNC machined body from EN8/EN19 forgings',
					'Spring-loaded trip mechanism',
					'Tested at 1.5× working pressure before dispatch',
				],
			},
			{
				name: 'Vibration Monitoring Probes (Shinkawa-compatible)',
				purpose:
					'Proximity probes for continuous rotor vibration monitoring per API 670, enabling predictive maintenance before bearing failure occurs.',
				features: [
					'Shinkawa, Bently Nevada compatible',
					'Eddy-current non-contact sensing',
					'Alert and danger setpoints per API 670',
				],
			},
			{
				name: 'Turbine Oil Pumps (Main & Aux)',
				purpose:
					'Supplies pressurized lube oil to all bearings. Auxiliary pump takes over during run-up and run-down when main shaft-driven pump output is insufficient.',
				features: [
					'Gear pump design, fitted to turbine skid',
					'All major OEM dimensions available',
					'Relief valve set to OEM pressure specification',
				],
			},
		],
		keyFacts: [
			'27 MW maximum turbine capacity handled',
			'20+ years OEM-trained engineering experience',
			'API 614 & ISO 4406:99 compliant products',
			'24×7 emergency breakdown support',
		],
	},
	ind_2: {
		heroSub:
			'Back-pressure & extraction-condensing turbines in sugar & distillery co-gen',
		overview: `India's sugar industry runs intensive 150–180 day crushing seasons where turbine availability is directly tied to cane crushing throughput. Keshav Enterprises specialises in inter-season overhauling for back-pressure turbines — the workhorses of sugar co-generation — and provides 24×7 emergency spares support during the crushing season when shutdowns are most costly.`,
		challenges: [
			{
				title: 'Short Inter-Season Overhaul Window',
				desc: 'Turbines must be completely overhauled, parts replaced, and commissioned before the next crushing season starts — often a window of just 90–120 days.',
			},
			{
				title: 'Carbon & Gland Seal Wear',
				desc: 'Back-pressure turbines use carbon gland rings to prevent steam leakage. These wear continuously and require accurate replacement at every overhaul.',
			},
			{
				title: 'Molasses & Juice Contamination',
				desc: 'Process areas generate sticky airborne particulates. Breather filters and strainers on lube oil systems must be maintained to prevent contamination.',
			},
			{
				title: 'Emergency Season Breakdowns',
				desc: 'A turbine trip during peak crushing causes immediate cane pile-up. Emergency spares and rapid response can mean the difference between a 4-hour and 4-day stoppage.',
			},
		],
		products: [
			{
				name: 'Carbon & Graphite Gland Sealing Rings',
				purpose:
					'Prevents steam leakage past the turbine shaft at gland areas. Precision-machined to OEM shaft and housing dimensions.',
				features: [
					'High-purity carbon/graphite grades',
					'All turbine makes: Triveni, Belliss & Morcom, Maxwatt',
					'Machined in-house to ±0.01 mm tolerance',
				],
			},
			{
				name: 'Labyrinth Sealing Packings',
				purpose:
					'Inter-stage and shaft-end labyrinth seals that reduce steam leakage between turbine stages, directly improving thermal efficiency.',
				features: [
					'SS, brass or monel material options',
					'OEM tooth profile maintained',
					'New or repaired strips fitted to existing housings',
				],
			},
			{
				name: 'Lube Oil Filter Elements (Triveni-compatible)',
				purpose:
					'Ensures clean lube oil supply to turbine bearings throughout the crushing season, preventing bearing failures during critical production periods.',
				features: [
					'180 GPM flow rating',
					'IS27 anti-static specification',
					'Inter-season replacement recommended',
				],
			},
			{
				name: 'Air Breather Filters',
				purpose:
					'Protects the lube oil reservoir from airborne dust and sugar particulates — critical in sugar mill environments where ambient dust loading is extreme.',
				features: [
					'Fine-mesh desiccant breather design',
					'Prevents moisture and dust ingression',
					'Visual saturation indicator',
				],
			},
			{
				name: 'Simplex & Duplex Basket Strainers',
				purpose:
					'Installed in lube oil and cooling water circuits to catch debris before it reaches bearings and heat exchangers.',
				features: [
					'SS mesh baskets, cleanable and reusable',
					'ANSI flanged or screwed ends',
					'Duplex for zero-downtime strainer cleaning',
				],
			},
			{
				name: 'Rotor Balancing Service',
				purpose:
					'Dynamic balancing of turbine rotors after re-blading or bearing replacement, restoring smooth operation within ISO 1940 G1.0 specification.',
				features: [
					'Dynamic balancing to ISO 1940/1 G1.0',
					'Two-plane balancing on all rotor types',
					'Balance certificate issued with job report',
				],
			},
		],
		keyFacts: [
			'Triveni & Belliss turbine specialist services',
			'24×7 emergency season support',
			'All carbon/graphite grades machined in-house',
			'Inter-season overhauls completed within window',
		],
	},
	ind_3: {
		heroSub:
			'Continuous-run turbines, expansion joints & process filtration for paper mills',
		overview: `Paper and pulp mills operate steam turbines around the clock, 350+ days per year, making planned maintenance windows extremely tight. The process also involves corrosive bleach, hot water, and high-pressure steam — all demanding filtration and sealing products rated for aggressive media. Keshav Enterprises supplies the complete range of products needed to keep paper mill steam and process systems running.`,
		challenges: [
			{
				title: 'Minimal Downtime Windows',
				desc: 'A paper machine shutdown costs lakhs per hour. Turbine overhauls must be planned months ahead and executed with zero rework — every component must be right the first time.',
			},
			{
				title: 'Corrosive Process Media',
				desc: 'Bleach, chlorinated compounds, and caustic process fluids attack standard materials. Filtration and hose products must use compatible media and seals.',
			},
			{
				title: 'High-Temperature Steam Piping',
				desc: 'Paper mill boilers generate high-pressure steam at 250–400°C. Steam piping expansion joints must handle both high temperature and cycle fatigue.',
			},
			{
				title: 'Vibration from Paper Machines',
				desc: 'High-speed paper machines generate continuous broadband vibration. Anti-vibration mounts and flexible hose connections are essential to isolate equipment.',
			},
		],
		products: [
			{
				name: 'Duplex Basket Strainers',
				purpose:
					'Installed on process water, white water, and cooling water lines. Duplex design allows basket cleaning without stopping flow — critical in continuous-run plants.',
				features: [
					'SS316 baskets for corrosive media',
					'Plug cock bypass valve included',
					'ANSI 150 to 600 flange ratings available',
				],
			},
			{
				name: 'SS Metallic Bellows Expansion Joints',
				purpose:
					'Absorbs thermal expansion in high-pressure steam piping, pulp process lines, and bleach plant piping without transferring stress to equipment nozzles.',
				features: [
					'SS316L bellows for corrosion resistance',
					'DN15 to DN1200 range',
					'EJMA design standard, pressure tested',
				],
			},
			{
				name: 'Rubber Expansion Joints (Double-Arch)',
				purpose:
					'Provides flexible connection on pump suction and discharge in water treatment, white water, and effluent systems — isolates pump vibration from piping.',
				features: [
					'Natural rubber or EPDM tube options',
					'PN10/16 flanged ends',
					'Up to 150°C service temperature',
				],
			},
			{
				name: 'PTFE-Lined Hose Assemblies',
				purpose:
					'Chemical transfer hoses for bleach, caustic, and acid lines in the bleach plant — PTFE lining provides total resistance to aggressive process chemicals.',
				features: [
					'PTFE inner core, SS braid reinforcement',
					'Full vacuum rated',
					'EN14420-compliant end fittings',
				],
			},
			{
				name: 'Anti-Vibration Mounts',
				purpose:
					'Resilient mounts fitted under paper machine drives, pumps, and turbine pedestals to isolate and dampen machinery vibration transmitted to the building structure.',
				features: [
					'Neoprene-steel sandwich design',
					'Load range 50 kg to 5000 kg per mount',
					'Frequency tuned to machine RPM',
				],
			},
			{
				name: 'Turbine Spares (Siemens, BHEL, Triveni)',
				purpose:
					'OEM-equivalent turbine spares manufactured from certified materials for planned overhaul kits — nozzles, diaphragms, gland rings, and bearing housings.',
				features: [
					'Reverse-engineered from OEM drawings',
					'Material certificates supplied',
					'CMM dimensional inspection report',
				],
			},
		],
		keyFacts: [
			'350+ days per year continuous operation supported',
			'SS316L products for corrosive media',
			'Zero-downtime duplex strainer solutions',
			'Complete overhaul kits planned and supplied',
		],
	},
	ind_4: {
		heroSub:
			'API 614-compliant filtration, Babbitt bearings & precision hose for oil & gas facilities',
		overview: `Upstream, midstream, and downstream oil and gas facilities operate turbine-driven compressors and pumps under some of the harshest conditions in industry. Every component in the lube oil and control oil system must meet API standards. Keshav Enterprises supplies API 614-compliant filter elements, Babbitt bearings, and precision-engineered hose assemblies qualified for use in hazardous-area equipment.`,
		challenges: [
			{
				title: 'API 614 Lube Oil System Compliance',
				desc: 'All lube oil system components for turbine-driven equipment in oil and gas must comply with API 614, specifying materials, cleanliness, and pressure ratings.',
			},
			{
				title: 'Hazardous Area Filtration',
				desc: 'Synthetic control oils in turbine control systems have low conductivity. Filter elements must carry IS27 anti-static specification to prevent electrostatic discharge.',
			},
			{
				title: 'High-Pressure Hose Integrity',
				desc: 'Hydraulic and instrument hose assemblies in oil and gas carry pressures up to 420 bar. Failure means spill and fire risk — zero compromise on quality or certification.',
			},
			{
				title: 'Remote Location Rapid Supply',
				desc: 'Offshore platforms and remote upstream facilities need fast spares supply. Critical spares held in stock and dispatched same day on emergency orders.',
			},
		],
		products: [
			{
				name: 'Control Oil Filter Elements (IS27 Anti-Static)',
				purpose:
					'For turbine electro-hydraulic control (EHC) systems using synthetic phosphate-ester or ester-based control oils with conductivity below 300 pS/m.',
				features: [
					'IS27 anti-static certification',
					'Microglass VG media, 3–25 µm',
					'Siemens, Man Turbo, KKK compatible',
				],
			},
			{
				name: 'Babbitt Bearing Manufacturing',
				purpose:
					'Journal and thrust bearings for turbine-driven compressors and pumps, white-metal lined to precise profiles matching the original OEM bearing geometry.',
				features: [
					'White metal composition per ASTM B23',
					'Precision-bored to <0.01 mm tolerance',
					'All makes: Man Turbo, KKK, Siemens, ABB',
				],
			},
			{
				name: 'PTFE-Lined Hose Assemblies',
				purpose:
					'Chemical and instrumentation hose for aggressive fluid transfer in oil and gas processing — resistant to crude oil, H2S, methanol, and inhibitors.',
				features: [
					'PTFE core, SS316 braid or stainless overbraid',
					'Pressure rated to 420 bar (selected assemblies)',
					'BS EN ISO 10380 compliant assemblies available',
				],
			},
			{
				name: 'Hydraulic Rubber Hose Assemblies',
				purpose:
					'High-pressure hydraulic hose for control actuators, BOP systems, and hydraulic power units on drilling and processing equipment.',
				features: [
					'4-wire and 6-wire spiral construction',
					'Working pressure up to 400 bar',
					'Parker, Gates, Manuli-compatible fittings',
				],
			},
			{
				name: 'Duplex Fabricated Filter Housings',
				purpose:
					'Custom-fabricated duplex filter vessels for lube oil and control oil systems, ASME code stamped for compliance with API 614 vessels requirements.',
				features: [
					'ASME Sec. VIII Div. 1 code stamped',
					'Material: CS, SS304, SS316 per service',
					'PED/CE certified for export projects',
				],
			},
			{
				name: 'Vibration Monitoring Probes',
				purpose:
					'Proximity probes and monitoring systems compatible with API 670 turbomachinery protection systems for compressor and turbine trains.',
				features: [
					'Bently Nevada, Shinkawa-compatible',
					'IP67 rated probe housing',
					'Alert and danger relay outputs',
				],
			},
		],
		keyFacts: [
			'API 614 & IS27 compliant products',
			'Babbitt bearings for all major OEMs',
			'Same-day emergency dispatch available',
			'ASME code-stamped pressure vessels',
		],
	},
	ind_5: {
		heroSub:
			'Metallic expansion joints, high-temp strainers & precision spares for refineries & petrochemical plants',
		overview: `Refineries and petrochemical complexes handle hydrocarbons, acids, and aggressive chemicals at extreme temperatures and pressures. Metallic expansion joints, process strainers, and precision turbine spares must withstand thermal cycling, corrosive media, and high-cycle fatigue. Keshav Enterprises manufactures these products to EJMA, ASME, and API standards for the most demanding refinery applications.`,
		challenges: [
			{
				title: 'Extreme Temperature Cycling',
				desc: 'Refinery steam cracking and distillation columns cycle between ambient and 600°C+ service temperatures. Expansion joints must survive millions of flex cycles without fatigue failure.',
			},
			{
				title: 'Corrosive & Hydrogen-Rich Media',
				desc: 'H2S, HF, amine solvents, and hydrogen service require Inconel, Hastelloy, or duplex stainless bellows — standard SS304/316 is insufficient.',
			},
			{
				title: 'ASME & API Code Compliance',
				desc: 'Pressure vessels, piping, and bellows in refineries must comply with ASME Sec. VIII and API codes. Third-party inspection and material traceability are mandatory.',
			},
			{
				title: 'FCCU Catalyst Erosion',
				desc: 'Fluid Catalytic Cracking Units carry entrained catalyst particles at 700°C+. Expansion joints in regenerator and reactor lines face extreme erosion and thermal shock.',
			},
		],
		products: [
			{
				name: 'FCCU Expansion Joints',
				purpose:
					'Purpose-designed for the extreme service conditions of regenerator-reactor transfer lines — high temperature, catalyst erosion, and thermal shock resistance.',
				features: [
					'Inconel 625 or 800HT bellows material',
					'Refractory lined for catalyst service',
					'Cycle-life analysis per EJMA 10th edition',
				],
			},
			{
				name: 'Axial & Universal Metallic Expansion Joints',
				purpose:
					'Standard process line bellows for absorbing thermal expansion in crude oil, product, and steam piping throughout the refinery complex.',
				features: [
					'DN15 to DN12,000 manufacturing range',
					'SS316L, Inconel, Hastelloy, Duplex SS grades',
					'ASME Sec. VIII Div. 1 design code',
				],
			},
			{
				name: 'High-Pressure Simplex & Duplex Strainers',
				purpose:
					'In-line strainers on crude oil charge lines, product transfer lines, and compressor suction piping to protect equipment from scale and debris.',
				features: [
					'ASME pressure vessel code design',
					'Perforated plate + mesh basket construction',
					'PN40 to PN160 pressure classes available',
				],
			},
			{
				name: 'Jacketed Expansion Joints',
				purpose:
					'For heat-traced and cryogenic service piping where the process medium must be maintained at temperature — LNG, molten sulfur, and bitumen lines.',
				features: [
					'Inner bellows + outer jacket construction',
					'Steam trace or electric trace connection ports',
					'Cryogenic-grade SS321 option for LNG service',
				],
			},
			{
				name: 'Turbine Steam Path Components',
				purpose:
					'Nozzle blocks, diaphragms, and blade carriers for turbine-driven compressor drives — manufactured from alloy steel to OEM profiles.',
				features: [
					'CNC machined from certified forgings',
					'Material: Cr-Mo alloy steel, 17-4PH SS',
					'Profile verified by 3D CMM measurement',
				],
			},
			{
				name: 'Pressure-Balanced Expansion Joints',
				purpose:
					'Eliminates pressure thrust forces on sensitive equipment nozzles in high-pressure refinery service — protects compressor and pump flanges.',
				features: [
					'Tie-rod eliminated pressure thrust design',
					'Reduces nozzle loads to near zero',
					'Available in tied and untied configurations',
				],
			},
		],
		keyFacts: [
			'Inconel, Hastelloy & duplex SS bellows',
			'EJMA 10th edition design standard',
			'ASME code pressure vessels & bellows',
			'FCCU and extreme service specialists',
		],
	},
	ind_6: {
		heroSub:
			'Steam turbine co-gen, filtration & rubber products for agro-processing facilities',
		overview: `Agro-processing — from rice milling and solvent extraction to dairy and food manufacturing — increasingly uses captive steam co-generation to reduce energy costs. These facilities need reliable turbine maintenance, food-grade hose and filter products, and vibration isolation solutions for sensitive processing machinery. Keshav Enterprises provides the full range of products and services needed across the agro-industrial sector.`,
		challenges: [
			{
				title: 'Food-Grade Material Requirements',
				desc: 'Hose, seals, and filtration in food contact areas must use FDA-approved materials — PTFE, food-grade EPDM, and stainless steel with polished surfaces.',
			},
			{
				title: 'Seasonal Load Variation',
				desc: 'Agro co-gen turbines see wide load variation with crop seasons. This leads to faster blade erosion and thermal cycling fatigue than in constant-load power plants.',
			},
			{
				title: 'Tank Breathing Contamination',
				desc: 'Edible oil storage tanks must be protected from airborne dust and moisture through the breather path — contamination affects product quality and shelf life.',
			},
			{
				title: 'Machinery Vibration in Food Plants',
				desc: 'Hammer mills, centrifuges, and packaging machinery transmit vibration to floors and adjacent equipment. Isolation is required to maintain hygienic connections.',
			},
		],
		products: [
			{
				name: 'FDA-Grade PTFE Hose Assemblies',
				purpose:
					'Flexible hose for food-grade fluid transfer — CIP/SIP chemical circulation, product lines, and steam injection in food-grade environments.',
				features: [
					'PTFE inner core, FDA 21 CFR 177.1550 compliant',
					'Electro-polished SS316 end fittings',
					'Tri-clover (sanitary) end connections available',
				],
			},
			{
				name: 'Air Breather & Tank Breather Filters',
				purpose:
					'Protects edible oil storage tanks from dust and moisture ingression through the vent path — prevents contamination of stored product.',
				features: [
					'Desiccant silica gel + fine particulate media',
					'Visual saturation colour indicator',
					'Replacement cartridge design for easy servicing',
				],
			},
			{
				name: 'Y-Type & Conical Strainers',
				purpose:
					'Inline strainers on process fluid lines, pump suction, and boiler feed water systems — protect equipment from scale and process debris.',
				features: [
					'SS mesh basket, mesh size 40 to 400 µm',
					'Screwed or flanged connections',
					'Simple inline cleanout without line break',
				],
			},
			{
				name: 'Rubber Anti-Vibration Mounts',
				purpose:
					'Isolates vibration from hammer mills, centrifuges, compressors, and packaging machinery — protects both the machine and adjacent food processing areas.',
				features: [
					'Neoprene or natural rubber compound options',
					'Conical, bobbin, and sandwich mount profiles',
					'Rated load from 30 kg to 3000 kg per mount',
				],
			},
			{
				name: 'Rubber Expansion Joints (Single-Arch)',
				purpose:
					'Flexible pump connector on cooling water, chilled water, and process water circuits — absorbs pump vibration and thermal movement.',
				features: [
					'EPDM or natural rubber tube',
					'PN10/16 flanged, also screwed ends',
					'Working temperature –20°C to +130°C',
				],
			},
			{
				name: 'Steam Turbine Maintenance (Triveni, Maxwatt)',
				purpose:
					'Planned overhaul of agro co-gen back-pressure steam turbines — gland ring replacement, bearing inspection, and rotor balance check.',
				features: [
					'Inter-season overhaul scheduling',
					'Carbon gland ring machined in-house',
					'Trial run and vibration sign-off included',
				],
			},
		],
		keyFacts: [
			'FDA 21 CFR compliant hose products',
			'Agro co-gen turbine specialist',
			'Tank breather filters for edible oil storage',
			'Complete pump vibration isolation solutions',
		],
	},
	ind_7: {
		heroSub:
			'Lube oil filtration, expansion joints, strainers & vibration isolation for cement plant machinery',
		overview: `Cement manufacturing is one of the most abrasive and dust-laden industrial environments on earth. Rotary kilns operating at 200–400°C shell temperature, ball mills running continuously for months, and crusher trains generating massive dust clouds place extreme demands on every lubrication, sealing, and piping component. Keshav Enterprises supplies the precision-grade filtration, expansion joints, and anti-vibration solutions that keep cement plants running at 330+ days per year.`,
		challenges: [
			{
				title: 'Extreme Dust & Abrasive Contamination',
				desc: 'Cement plants generate 1–3 tonnes of dust per day per kiln. This airborne abrasive enters lube oil systems, breather vents, and filter housings — accelerating wear and causing filter bypass if not properly managed.',
			},
			{
				title: 'Kiln Gearbox Oil Contamination',
				desc: 'Rotary kiln gearboxes operate on circulation lubrication systems at ISO VG 220–460. Clinker dust and thermal contamination degrade oil rapidly — high-efficiency filtration is critical to extending oil change intervals and protecting expensive gear sets.',
			},
			{
				title: 'Thermal Expansion in Kiln Exhaust Ducting',
				desc: 'Kiln exhaust gas ducts operate at 250–450°C and undergo significant thermal expansion. Without properly designed metallic or fabric expansion joints, duct sections crack, leak, and allow hot gas escape — a safety and efficiency hazard.',
			},
			{
				title: 'Crusher & Mill Vibration',
				desc: 'Ball mills, vertical roller mills, and jaw crushers generate intense broadband vibration that transmits through foundations to adjacent equipment and instrumentation, causing fatigue failures and measurement errors.',
			},
		],
		products: [
			{
				name: 'Lube Oil Filter Elements (Kiln & Mill Gearboxes)',
				purpose:
					'High-efficiency filter elements for kiln gearbox oil circulation systems — removes abrasive clinker particles and wear debris before they damage gear teeth and roller bearings.',
				features: [
					'Glass fiber fleece media, 6–25 µm fineness',
					'High dirt-holding capacity for dust-laden environments',
					'ISO VG 220–460 synthetic & mineral oil compatible',
					'Beta efficiency ≥200 per ISO 16889',
				],
			},
			{
				name: 'Duplex Basket Strainers (Cooling Water & Process Lines)',
				purpose:
					'Installed on kiln cooling water systems, compressor water cooling, and raw meal slurry pipelines to protect pumps, heat exchangers, and instrumentation from scale and debris.',
				features: [
					'SS mesh baskets, 100–1000 µm mesh options',
					'Duplex design: zero-downtime basket cleaning',
					'ANSI 150 to ANSI 600 flange ratings',
					'SS316 for corrosive cooling water service',
				],
			},
			{
				name: 'Axial Metallic Expansion Joints (Kiln Exhaust Ducts)',
				purpose:
					'Compensates thermal expansion in hot gas ductwork between the kiln, cyclone pre-heater tower, and waste heat boiler — eliminates thermally induced stress cracking in duct sections.',
				features: [
					'SS321 bellows for high-temperature service',
					'Single and universal (dual-bellows) configurations',
					'Flanged to match existing duct dimensions',
					'Flow liner included to protect bellows from gas erosion',
				],
			},
			{
				name: 'Rectangular Non-Metallic (Fabric) Expansion Joints',
				purpose:
					'Used in large rectangular ductwork at clinker cooler vent, raw mill fan connections, and electrostatic precipitator (ESP) ductwork — handles misalignment and thermal movement in non-circular sections.',
				features: [
					'PTFE-coated glass fabric or Nomex composite',
					'Temperature capability to 450°C continuous',
					'Custom-made to rectangular duct dimensions',
					'Bolted frame assembly for on-site installation',
				],
			},
			{
				name: 'Rubber Anti-Vibration Mounts & Pads',
				purpose:
					'Fitted under ball mill drive units, vertical roller mill gearboxes, and crusher bearing housings to isolate and attenuate machinery vibration transmitted to plant structures.',
				features: [
					'Natural rubber or neoprene compound',
					'Sandwich, bobbin, and anti-vibration pad profiles',
					'Load capacity from 200 kg to 10,000 kg per mount',
					'Frequency-tuned to mill and crusher operating RPM',
				],
			},
			{
				name: 'Air Breather & Tank Breather Filters (Lube Oil Reservoirs)',
				purpose:
					'Prevents airborne cement dust and moisture from entering lube oil reservoirs through the vent path — the leading cause of premature oil and bearing failure in cement plants.',
				features: [
					'High-efficiency particulate media + silica gel desiccant',
					'Rated to ISO cleanliness requirements',
					'Colour-change saturation indicator',
					'Direct-mount and remote-mount configurations',
				],
			},
			{
				name: 'SS Corrugated Flexible Hose Assemblies',
				purpose:
					'High-pressure flexible connections on kiln cooling water inlets, hydraulic slide gate actuators, and compressed air lines — resists heat, pressure, and vibration where rigid piping would fail.',
				features: [
					'SS316L corrugated inner hose, SS braid reinforcement',
					'Working pressure to 200 bar (selected assemblies)',
					'End fittings: ANSI flanged, BSP/NPT screwed, or hydraulic',
					'Temperature range –196°C to +600°C',
				],
			},
			{
				name: 'Conical & Y-Type Strainers (Raw Mill & Conveyor Pumps)',
				purpose:
					'Temporary and permanent strainers on raw material slurry pumps, kiln water spray systems, and compressed air supply lines — protect downstream valves and instruments.',
				features: [
					'Perforated basket, mesh lining available',
					'Winged or screwed flush plug for cleaning',
					'CS, SS304, SS316 body materials',
					'In stock for rapid dispatch',
				],
			},
		],
		keyFacts: [
			'330+ days/year continuous operation supported',
			'Dust-resistant filtration products stocked',
			'High-temp expansion joints up to 450°C',
			'Complete vibration isolation solutions',
		],
	},
};

// Maps industry product names to their product IDs for direct deep-linking
const INDUSTRY_PRODUCT_IDS = {
	// ind_1 — Power Generation
	'Lube Oil Filter Elements (180 GPM)': 'prod_f1',
	'Steam Crossover Bellows': 'prod_e13',
	'Babbitt Journal & Thrust Bearings': 'prod_ts3',
	'Emergency Stop Valves': 'prod_ts4',
	'Vibration Monitoring Probes (Shinkawa-compatible)': 'prod_ee1',
	'Turbine Oil Pumps (Main & Aux)': 'prod_ts5',
	// ind_2 — Sugar Mills
	'Carbon & Graphite Gland Sealing Rings': 'prod_ts1',
	'Labyrinth Sealing Packings': 'prod_ts2',
	'Lube Oil Filter Elements (Triveni-compatible)': 'prod_f1',
	'Air Breather Filters': 'prod_f4',
	'Simplex & Duplex Basket Strainers': 'prod_st2',
	'Rotor Balancing Service': null,
	// ind_3 — Paper Mills
	'Duplex Basket Strainers': 'prod_st2',
	'SS Metallic Bellows Expansion Joints': 'prod_e1',
	'Rubber Expansion Joints (Double-Arch)': 'prod_e2',
	'PTFE-Lined Hose Assemblies': 'prod_h2',
	'Anti-Vibration Mounts': 'prod_r2',
	'Turbine Spares (Siemens, BHEL, Triveni)': null,
	// ind_4 — Oil & Gas
	'Control Oil Filter Elements (IS27 Anti-Static)': 'prod_f2',
	'Babbitt Bearing Manufacturing': 'prod_ts3',
	'Hydraulic Rubber Hose Assemblies': 'prod_h3',
	'Duplex Fabricated Filter Housings': 'prod_f10',
	'Vibration Monitoring Probes': 'prod_ee1',
	// ind_5 — Petrochemical
	'FCCU Expansion Joints': 'prod_e14',
	'Axial & Universal Metallic Expansion Joints': 'prod_e4',
	'High-Pressure Simplex & Duplex Strainers': 'prod_st2',
	'Jacketed Expansion Joints': 'prod_e15',
	'Turbine Steam Path Components': 'prod_ts9',
	'Pressure-Balanced Expansion Joints': 'prod_e6',
	// ind_6 — Agro & Food
	'FDA-Grade PTFE Hose Assemblies': 'prod_h2',
	'Air Breather & Tank Breather Filters': 'prod_f4',
	'Y-Type & Conical Strainers': 'prod_st4',
	'Rubber Anti-Vibration Mounts': 'prod_r2',
	'Rubber Expansion Joints (Single-Arch)': 'prod_e3',
	'Steam Turbine Maintenance (Triveni, Maxwatt)': null,
	// ind_7 — Cement
	'Lube Oil Filter Elements (Kiln & Mill Gearboxes)': 'prod_f1',
	'Duplex Basket Strainers (Cooling Water & Process Lines)': 'prod_st2',
	'Axial Metallic Expansion Joints (Kiln Exhaust Ducts)': 'prod_e1b',
	'Rectangular Non-Metallic (Fabric) Expansion Joints': 'prod_e18',
	'Rubber Anti-Vibration Mounts & Pads': 'prod_r2',
	'Air Breather & Tank Breather Filters (Lube Oil Reservoirs)': 'prod_f4',
	'SS Corrugated Flexible Hose Assemblies': 'prod_h1',
	'Conical & Y-Type Strainers (Raw Mill & Conveyor Pumps)': 'prod_st3',
};

const IndustryDetailPage = ({ industryId, navigate }) => {
	const ind = INDUSTRIES.find((i) => i.id === industryId);
	const detail = INDUSTRY_DETAILS[industryId];
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [industryId]);

	if (!ind || !detail)
		return (
			<main
				id="main-content"
				tabIndex={-1}
				className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-slate-50"
			>
				<div className="text-center">
					<Building2 className="w-20 h-20 text-slate-300 mx-auto mb-6" />
					<h1 className="text-3xl font-black text-slate-900 mb-4">
						Industry Not Found
					</h1>
					<button
						type="button"
						onClick={() => navigate('/industries')}
						className="text-blue-600 font-bold hover:underline"
					>
						Back to Industries
					</button>
				</div>
			</main>
		);

	const { Icon } = ind;
	return (
		<main id="main-content" tabIndex={-1} className="bg-slate-50 min-h-screen">
			<SEOHead
				title={`${ind.title} | Industrial Solutions — Keshav Enterprises`}
				description={`${ind.desc} — Keshav Enterprises, Shamli, UP.`}
				canonicalPath={`/industry/${ind.id}`}
				pageType="website"
			/>

			{/* ── Hero ── */}
			<div className="bg-[#0A192F] text-white pt-28 pb-20 relative overflow-hidden border-b-8 border-blue-600">
				<div
					className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem]"
					aria-hidden="true"
				/>
				{ind.image && (
					<img
						src={ind.image}
						alt=""
						aria-hidden="true"
						loading="eager"
						decoding="async"
						fetchPriority="high"
						className="absolute inset-0 w-full h-full object-cover opacity-35"
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/>
				)}
				{/* Reduced overlay so industry image is visible — gradient fades left edge only */}
				<div
					className="absolute inset-0 bg-linear-to-r from-[#0A192F]/80 via-[#0A192F]/55 to-[#0A192F]/25"
					aria-hidden="true"
				/>
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<nav
						aria-label="Breadcrumb"
						className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-10"
					>
						<button
							type="button"
							onClick={() => navigate('/industries')}
							className="hover:text-blue-400 transition-colors flex items-center gap-1 focus:outline-none focus-visible:underline"
						>
							<ArrowLeft className="w-3.5 h-3.5" /> Industries
						</button>
						<ChevronRight className="w-3.5 h-3.5 opacity-40" />
						<span className={ind.accent}>{ind.title}</span>
					</nav>
					<div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
						<div
							className={`w-20 h-20 rounded-2xl bg-linear-to-br ${ind.color} border ${ind.border} flex items-center justify-center shrink-0 shadow-2xl`}
						>
							<Icon className={`w-10 h-10 ${ind.accent}`} />
						</div>
						<div>
							<div
								className={`inline-block text-xs font-black ${ind.accent} uppercase tracking-widest mb-3 bg-white/5 px-3 py-1 rounded-full border border-white/10`}
							>
								Industry Focus
							</div>
							<h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
								{ind.title}
							</h1>
							<p className="text-slate-100 font-medium text-lg">
								{detail.heroSub}
							</p>
						</div>
					</div>
					{/* Key Facts Strip */}
					<div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
						{detail.keyFacts.map((fact) => (
							<div
								key={fact.label}
								className="bg-white/[0.07] border border-white/[0.14] rounded-xl px-5 py-4 flex items-start gap-3"
							>
								<CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
								<span className="text-white/90 font-semibold text-sm leading-snug">
									{fact}
								</span>
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
								<div
									className={`w-1.5 h-8 rounded-full ${ind.accent.replace('text-', 'bg-')}`}
								/>
								<h2 className="text-2xl font-black text-slate-900 tracking-tight">
									Industry Overview
								</h2>
							</div>
							<p className="text-slate-600 font-medium text-lg leading-relaxed">
								{detail.overview}
							</p>
						</div>
						<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
							<h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-5">
								Key Applications
							</h3>
							<ul className="space-y-3">
								{ind.useCases.slice(0, 6).map((uc) => (
									<li key={uc} className="flex items-start gap-3">
										<CheckCircle2
											className={`w-4 h-4 shrink-0 mt-0.5 ${ind.accent}`}
										/>
										<span className="text-slate-700 font-medium text-sm leading-snug">
											{uc}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{/* ── Challenges ── */}
				<section aria-label="Industry challenges">
					<div className="flex items-center gap-3 mb-8">
						<div
							className={`w-1.5 h-8 rounded-full ${ind.accent.replace('text-', 'bg-')}`}
						/>
						<h2 className="text-2xl font-black text-slate-900 tracking-tight">
							Key Challenges We Solve
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{detail.challenges.map((c, i) => (
							<div
								key={c.title}
								className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 hover:border-blue-200 hover:shadow-md transition-all"
							>
								<div className="flex items-start gap-4">
									<div
										className={`w-10 h-10 rounded-xl bg-linear-to-br ${ind.color} border ${ind.border} flex items-center justify-center shrink-0`}
									>
										<span className={`text-lg font-black ${ind.accent}`}>
											{i + 1}
										</span>
									</div>
									<div>
										<h3 className="font-black text-slate-900 text-base mb-2">
											{c.title}
										</h3>
										<p className="text-slate-600 font-medium text-sm leading-relaxed">
											{c.desc}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* ── Products ── */}
				<section aria-label="Products we supply">
					<div className="flex items-center gap-3 mb-8">
						<div
							className={`w-1.5 h-8 rounded-full ${ind.accent.replace('text-', 'bg-')}`}
						/>
						<h2 className="text-2xl font-black text-slate-900 tracking-tight">
							Products We Supply for {ind.title}
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{detail.products.map((prod) => {
							const prodId = INDUSTRY_PRODUCT_IDS[prod.name];
							const isClickable = !!prodId;
							const cardInner = (
								<>
									<div
										className={`h-1.5 w-full rounded-t-2xl bg-linear-to-r ${ind.color.replace('/20', '').replace('/10', '')} from-blue-600 to-blue-400`}
									/>
									<div className="p-7 flex flex-col flex-1">
										<div className="flex items-start gap-3 mb-4">
											<div
												className={`w-9 h-9 rounded-xl bg-linear-to-br ${ind.color} border ${ind.border} flex items-center justify-center shrink-0 mt-0.5`}
											>
												<Settings className={`w-4 h-4 ${ind.accent}`} />
											</div>
											<h3 className="font-black text-slate-900 text-base leading-snug">
												{prod.name}
											</h3>
										</div>
										<p className="text-slate-600 font-medium text-sm leading-relaxed mb-5 flex-1">
											{prod.purpose}
										</p>
										<ul className="space-y-1.5 mb-6">
											{prod.features.map((f, j) => (
												<li
													key={`${f}-${j}`}
													className="flex items-start gap-2"
												>
													<div
														className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${ind.accent.replace('text-', 'bg-')}`}
													/>
													<span className="text-slate-600 text-xs font-semibold leading-snug">
														{f}
													</span>
												</li>
											))}
										</ul>
										<span
											className={`mt-auto text-xs font-black uppercase tracking-widest ${ind.accent} flex items-center gap-1`}
										>
											{isClickable ? 'View Product' : 'View in Catalog'}{' '}
											<ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
										</span>
									</div>
								</>
							);
							return isClickable ? (
								<button
									type="button"
									key={prod.name}
									className={`bg-white rounded-2xl border border-slate-200 shadow-sm transition-all flex flex-col w-full text-left hover:shadow-lg hover:border-blue-300 cursor-pointer group`}
									onClick={() => navigate(`/product/${prodId}`)}
									aria-label={`View product: ${prod.name}`}
								>
									{cardInner}
								</button>
							) : (
								<div
									key={prod.name}
									className="bg-white rounded-2xl border border-slate-200 shadow-sm transition-all flex flex-col"
								>
									{cardInner}
								</div>
							);
						})}
					</div>
				</section>

				{/* ── CTA ── */}
				<section
					aria-label="Get in touch"
					className="bg-slate-900 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 shadow-xl"
				>
					<div className="flex-1">
						<h2 className="text-3xl font-black text-white mb-3 tracking-tight">
							Ready to Discuss Your {ind.title} Requirements?
						</h2>
						<p className="text-slate-300 font-medium text-base leading-relaxed">
							Our engineers have hands-on experience with the unique challenges
							of your industry. Contact us for a technical consultation or
							request a quote today.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row md:flex-col gap-4 shrink-0">
						<button
							type="button"
							onClick={() => navigate('/contact')}
							className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-500 transition-all shadow-lg flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
						>
							Get a Quote <ArrowRight className="w-5 h-5" />
						</button>
						<a
							href={waMsg(
								`Hello KESHAV ENTERPRISES, I need solutions for my ${ind.title} facility.`,
							)}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-black hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-3 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
						>
							<MessageCircle className="w-5 h-5" /> WhatsApp Us
						</a>
					</div>
				</section>
			</div>
		</main>
	);
};

// ─── INDUSTRIES PAGE ─────────────────────────────────────────
const IndustriesPage = memo(({ navigate }) => (
	<main
		id="main-content"
		tabIndex={-1}
		className="pt-24 pb-20 bg-slate-50 min-h-screen"
	>
		<SEOHead
			title="Industries Served — Power, Sugar, Oil & Gas, Petrochemical, Cement"
			description="Keshav Enterprises serves power plants, sugar mills, paper mills, oil & gas, petrochemical, agro, and cement industries with specialized turbine engineering and industrial products."
			canonicalPath="/industries"
			pageType="website"
		/>
		<div className="bg-[#0A192F] text-white py-24 mb-16 border-b-8 border-blue-600 relative overflow-hidden">
			<div
				className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem]"
				aria-hidden="true"
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
				<h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">
					Industries We Serve
				</h1>
				<div
					className="section-divider w-24 h-1.5 bg-blue-500 mb-8 rounded-full"
					aria-hidden="true"
				/>
				<p className="text-slate-300 font-medium max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
					Specialized turbine engineering and industrial product solutions
					across seven major industry verticals.
				</p>
			</div>
		</div>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="space-y-12">
				{INDUSTRIES.map((ind, index) => {
					const { Icon } = ind;
					return (
						<div
							key={ind.id}
							className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-500 group border border-slate-200 bg-white cursor-pointer w-full text-left"
							onClick={() => navigate(`/industry/${ind.id}`)}
							role="region"
							aria-label={`${ind.title} industry section`}
						>
							<div
								className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
							>
								{/* ── LEFT PANEL: full background image + overlay infographic ── */}
								<div
									className="lg:w-2/5 relative overflow-hidden min-h-70 sm:min-h-85 lg:min-h-110 shrink-0"
									style={{ isolation: 'isolate' }}
								>
									{/* Background photo — object-cover fills the absolute container; no aspectRatio on img */}
									{ind.image && (
										<img
											src={ind.image}
											alt=""
											aria-hidden="true"
											className="absolute inset-0 w-full h-full object-cover object-center"
											style={{ opacity: 0.9 }}
											loading="lazy"
											decoding="async"
											fetchPriority="low"
											width="560"
											height="440"
											onError={(e) => {
												e.target.style.display = 'none';
											}}
										/>
									)}
									{/* Fallback gradient when no image or image fails — always present as base */}
									<div
										className={`absolute inset-0 bg-linear-to-br ${ind.color}`}
									/>
									{/* Dark scrim so white text is readable over any photo */}
									<div className="absolute inset-0 bg-[#0A192F]/60" />
									{/* Subtle vignette at edges */}
									<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,25,47,0.5)_100%)]" />

									{/* Infographic content — sits fully on top of image+overlays */}
									<div className="relative z-10 w-full h-full p-10 flex flex-col items-center justify-center gap-6">
										{/* Category icon badge */}
										<div className="w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/25 shadow-2xl group-hover:scale-110 group-hover:bg-white/25 transition-all duration-500">
											<Icon
												className="w-12 h-12 text-white drop-shadow-lg"
												aria-hidden="true"
											/>
										</div>
										{/* Title */}
										<div className="text-center">
											<h2 className="text-3xl font-black text-white tracking-tight drop-shadow-lg leading-tight mb-3">
												{ind.title}
											</h2>
											{/* Accent rule */}
											<div
												className={`h-1 w-16 rounded-full mx-auto mb-4 bg-white/50`}
											/>
											<p
												className={`text-sm font-black ${ind.accent} bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full uppercase tracking-widest border border-white/10 drop-shadow`}
											>
												{ind.turbines}
											</p>
										</div>
										{/* Mini use-case pills shown on the image panel */}
										<div className="flex flex-wrap justify-center gap-2 max-w-xs ind-oem-chips">
											{ind.useCases.slice(0, 3).map((uc) => (
												<span
													key={uc}
													className="text-[10px] font-black text-white/90 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full uppercase tracking-wide"
												>
													{uc.split(' ').slice(0, 3).join(' ')}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* ── RIGHT PANEL: description, full use-cases, CTAs ── */}
								<div className="lg:w-3/5 p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-white">
									{/* Section label */}
									<div className={`inline-flex items-center gap-2 mb-6`}>
										<div
											className={`w-2 h-2 rounded-full ${ind.accent.replace('text-', 'bg-')}`}
										/>
										<span
											className={`text-xs font-black ${ind.accent} uppercase tracking-widest`}
										>
											Industry Focus
										</span>
									</div>
									<h3 className="text-2xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
										{ind.title}
									</h3>
									<p className="text-slate-600 font-medium text-base leading-relaxed mb-8 border-l-4 border-slate-200 pl-5">
										{ind.desc}
									</p>
									<h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-5">
										Key Applications &amp; Products
									</h4>
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
										{ind.useCases.map((uc) => (
											<li
												key={uc}
												className="flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors"
											>
												<CheckCircle2
													className={`w-4 h-4 shrink-0 mt-0.5 ${ind.accent}`}
													aria-hidden="true"
												/>
												<span className="text-slate-700 font-medium text-sm leading-snug">
													{uc}
												</span>
											</li>
										))}
									</ul>
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												navigate(`/industry/${ind.id}`);
											}}
											aria-label={`Explore ${ind.title} solutions in detail`}
											className="bg-blue-600 text-white px-5 py-3.5 rounded-xl font-black hover:bg-blue-500 transition-all shadow-sm flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group/btn text-sm"
										>
											Explore Solutions{' '}
											<ArrowRight
												className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
												aria-hidden="true"
											/>
										</button>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												navigate('/contact');
											}}
											aria-label={`Get a quote for ${ind.title} services`}
											className="bg-slate-900 text-white px-5 py-3.5 rounded-xl font-black hover:bg-blue-600 transition-all shadow-sm flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 group/btn text-sm"
										>
											Get a Quote{' '}
											<ArrowRight
												className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
												aria-hidden="true"
											/>
										</button>
										<a
											href={waMsg(
												`Hello KESHAV ENTERPRISES, I need engineering services for my ${ind.title} facility.`,
											)}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => e.stopPropagation()}
											aria-label={`WhatsApp inquiry for ${ind.title}`}
											className="bg-[#25D366] text-white px-5 py-3.5 rounded-xl font-black hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 text-sm"
										>
											<MessageCircle className="w-4 h-4" aria-hidden="true" />{' '}
											WhatsApp
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	</main>
));
IndustriesPage.displayName = 'IndustriesPage';

// ─── CONTACT PAGE ─────────────────────────────────────────────
const ContactPage = memo(() => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [iType, setIType] = useState('');
	const [details, setDetails] = useState('');
	const [status, setStatus] = useState('idle');
	const [errors, setErrors] = useState({});
	const validate = useCallback(() => {
		const e = {};
		if (!name.trim()) e.name = 'Company name is required';
		if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			e.email = 'Valid email is required';
		if (!phone.trim() || phone.replace(/\D/g, '').length < 10)
			e.phone = 'Valid phone number required (10+ digits)';
		if (!iType) e.iType = 'Please select an inquiry type';
		if (!details.trim() || details.length < 20)
			e.details = 'Please provide details (min 20 characters)';
		return e;
	}, [name, email, phone, iType, details]);
	const handleSubmit = useCallback(() => {
		const e = validate();
		if (Object.keys(e).length > 0) {
			setErrors(e);
			return;
		}
		setErrors({});
		setStatus('loading');
		const msg = `*New RFQ from Keshav Enterprises Website*\n\n*Company:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Inquiry Type:* ${iType}\n\n*Details:*\n${details}`;
		setTimeout(() => {
			window.open(waMsg(msg), '_blank', 'noopener');
			setStatus('success');
		}, 800);
	}, [validate, name, email, phone, iType, details]);
	const inputClass = (err) =>
		`w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-slate-50 border rounded-xl font-medium text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${err ? 'border-red-400 bg-red-50' : 'border-slate-200'}`;
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className="pt-24 pb-20 bg-slate-50 min-h-screen"
		>
			<SEOHead
				title="Contact Engineering Team — Request a Technical Quote"
				description="Contact Keshav Enterprises for turbine engineering RFQs, reverse engineering quotes, and 24x7 emergency breakdown support. Phone: +91 9149229448."
				canonicalPath="/contact"
				pageType="website"
				schema={FAQ_SCHEMA}
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
					<h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
						Talk to an Engineer
					</h1>
					<div
						className="section-divider w-24 h-1.5 bg-blue-600 mb-6 rounded-full"
						aria-hidden="true"
					/>
					<p className="text-lg font-medium text-slate-500 max-w-2xl mb-6">
						Share your requirements below. Our engineering team — not a sales
						desk — reviews every inquiry and responds with a technical answer
						within 24 hours.
					</p>
					{/* Fear-reduction trust row */}
					<div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
						{[
							{ Icon: Shield, text: 'Confidential RFQ handling' },
							{ Icon: CheckCircle2, text: 'No obligation consultation' },
							{
								Icon: Clock,
								text: '24-hour response (emergency: within the hour)',
							},
						].map(({ Icon, text }) => (
							<div
								key={text}
								className="flex items-center gap-2 text-slate-500 text-sm font-bold"
							>
								<Icon
									className="w-4 h-4 text-blue-500 shrink-0"
									aria-hidden="true"
								/>
								<span>{text}</span>
							</div>
						))}
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
					<div className="lg:col-span-1 space-y-6">
						{[
							{
								Icon: Phone,
								title: 'Direct Lines',
								content: (
									<div className="space-y-2">
										{CONTACT_INFO.phones.map((p) => (
											<a
												key={p}
												href={`tel:${p.replace(/\s/g, '')}`}
												className="block text-slate-600 font-bold text-base hover:text-blue-600 transition-colors"
											>
												{p}
											</a>
										))}
									</div>
								),
							},
							{
								Icon: Mail,
								title: 'Email (RFQs)',
								content: (
									<div className="space-y-2">
										{[
											CONTACT_INFO.email,
											CONTACT_INFO.infoEmail,
											CONTACT_INFO.marketingEmail,
										].map((e) => (
											<a
												key={e}
												href={`mailto:${e}`}
												className="block text-slate-600 font-bold text-sm hover:text-blue-600 transition-colors break-all"
											>
												{e}
											</a>
										))}
									</div>
								),
							},
							{
								Icon: MapPin,
								title: 'Facility Address',
								content: (
									<p className="text-slate-600 font-bold text-sm leading-relaxed">
										{CONTACT_INFO.address}
									</p>
								),
							},
						].map(({ Icon, title, content }) => (
							<div
								key={title}
								className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex items-start space-x-5 hover:border-blue-200 transition-colors"
							>
								<div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
									<Icon
										className="w-7 h-7 text-blue-600"
										aria-hidden="true"
									/>
								</div>
								<div>
									<h3 className="font-black text-slate-900 text-lg mb-2">
										{title}
									</h3>
									{content}
								</div>
							</div>
						))}
						<a
							href={CONTACT_INFO.indiamart}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="View Keshav Enterprises on IndiaMART"
							className="bg-slate-900 p-8 border border-slate-800 rounded-3xl shadow-lg flex items-start space-x-5 hover:border-blue-500 transition-colors group w-full"
						>
							<div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500/50 transition-colors">
								<CheckCircle2
									className="w-7 h-7 text-green-400"
									aria-hidden="true"
								/>
							</div>
							<div>
								<h3 className="font-black text-white text-lg mb-1">
									IndiaMART Verified
								</h3>
								<p className="text-yellow-400 font-bold text-sm mb-1.5">
									<span className="sr-only">4.3 out of 5 stars</span>
									<span aria-hidden="true">★★★★★</span>{' '}
									<span className="text-slate-300 ml-1">4.3/5 Rating</span>
								</p>
								<p className="text-blue-400 font-black text-xs uppercase tracking-widest">
									TrustSeal Supplier
								</p>
							</div>
						</a>
					</div>
					<div className="lg:col-span-2">
						<div className="bg-white p-8 md:p-12 border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50">
							<div className="flex flex-col mb-8 border-b border-slate-100 pb-6">
								<h2 className="text-3xl font-black text-slate-900 tracking-tight">
									Request a Technical Quote
								</h2>
								<p className="text-slate-500 font-medium text-sm mt-2">
									Your details go directly to our engineering team — not a call
									centre. We will send a technical response, not a generic
									brochure.
								</p>
							</div>
							{status === 'success' && (
								<div
									role="status"
									aria-live="polite"
									className="mb-8 p-6 bg-green-50 border border-green-200 text-green-800 font-black rounded-xl flex items-center shadow-sm text-lg"
								>
									<CheckCircle2
										className="w-8 h-8 mr-4 text-green-500 shrink-0"
										aria-hidden="true"
									/>
									Your inquiry has been sent to our engineers via WhatsApp. We
									will respond within 24 hours.
								</div>
							)}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
								<div>
									<label
										htmlFor="c-name"
										className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest"
									>
										Company Name <span aria-hidden="true">*</span>
									</label>
									<input
										id="c-name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										aria-required="true"
										aria-invalid={!!errors.name}
										aria-describedby={errors.name ? 'err-name' : undefined}
										className={inputClass(errors.name)}
									/>
									{errors.name && (
										<p
											id="err-name"
											role="alert"
											className="text-red-600 text-xs font-bold mt-2"
										>
											{errors.name}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="c-email"
										className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest"
									>
										Email Address <span aria-hidden="true">*</span>
									</label>
									<input
										id="c-email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										aria-required="true"
										aria-invalid={!!errors.email}
										aria-describedby={errors.email ? 'err-email' : undefined}
										className={inputClass(errors.email)}
									/>
									{errors.email && (
										<p
											id="err-email"
											role="alert"
											className="text-red-600 text-xs font-bold mt-2"
										>
											{errors.email}
										</p>
									)}
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
								<div>
									<label
										htmlFor="c-phone"
										className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest"
									>
										Phone Number <span aria-hidden="true">*</span>
									</label>
									<input
										id="c-phone"
										type="tel"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										placeholder="+91 XXXXX XXXXX"
										aria-required="true"
										aria-invalid={!!errors.phone}
										aria-describedby={errors.phone ? 'err-phone' : undefined}
										className={`${inputClass(errors.phone)} placeholder:text-slate-500`}
									/>
									{errors.phone && (
										<p
											id="err-phone"
											role="alert"
											className="text-red-600 text-xs font-bold mt-2"
										>
											{errors.phone}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="c-type"
										className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-widest"
									>
										Inquiry Type <span aria-hidden="true">*</span>
									</label>
									<select
										id="c-type"
										value={iType}
										onChange={(e) => setIType(e.target.value)}
										aria-required="true"
										aria-invalid={!!errors.iType}
										aria-describedby={errors.iType ? 'err-type' : undefined}
										className={`${inputClass(errors.iType)} appearance-none cursor-pointer`}
									>
										<option value="" disabled>
											Select your requirement...
										</option>
										<option value="Turbine Overhauling Service">
											Turbine Overhauling (Planned / Scheduled)
										</option>
										<option value="Emergency Breakdown Support">
											Emergency Breakdown — Need Immediate Support
										</option>
										<option value="Turbine Erection & Commissioning">
											Turbine Erection &amp; Commissioning
										</option>
										<option value="Reverse Engineering">
											Reverse Engineering / Obsolete Spare
										</option>
										<option value="Dynamic Balancing">
											Dynamic Balancing &amp; Rotor Machining
										</option>
										<option value="Lube Oil Flushing">
											Lube Oil Flushing (ISO 4406 Certification)
										</option>
										<option value="Machine Alignment">
											Machine Alignment Service
										</option>
										<option value="Troubleshooting">
											Troubleshooting — Vibration / Governor / Trip
										</option>
										<option value="Filter Element RFQ">
											Filter Element RFQ (specify OEM make)
										</option>
										<option value="Turbine Spares RFQ">
											Turbine Spares RFQ (Bearings / Seals / Valves)
										</option>
										<option value="Expansion Joint RFQ">
											Expansion Joint / Bellows RFQ
										</option>
										<option value="Strainer RFQ">
											Strainer / Hose Assembly RFQ
										</option>
										<option value="General Inquiry">General Inquiry</option>
									</select>
									{errors.iType && (
										<p
											id="err-type"
											role="alert"
											className="text-red-600 text-xs font-bold mt-2"
										>
											{errors.iType}
										</p>
									)}
								</div>
							</div>
							<div className="mb-8">
								<label
									htmlFor="c-details"
									className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3"
								>
									Requirements / RFQ Details <span aria-hidden="true">*</span>
								</label>
								<textarea
									id="c-details"
									rows={6}
									value={details}
									onChange={(e) => setDetails(e.target.value)}
									aria-required="true"
									aria-invalid={!!errors.details}
									aria-describedby={errors.details ? 'err-details' : undefined}
									className={`${inputClass(errors.details)} resize-none shadow-inner`}
									placeholder="Tell us about your requirement — OEM/turbine make, model, quantity, part number, drawing reference, or describe the fault/symptom you're experiencing. The more detail you share, the faster and more useful our response will be."
								/>
								{errors.details && (
									<p
										id="err-details"
										role="alert"
										className="text-red-600 text-xs font-bold mt-2"
									>
										{errors.details}
									</p>
								)}
							</div>
							<div className="mb-10 p-6 bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl hover:border-blue-400 transition-colors">
								<label
									htmlFor="c-files"
									className="flex items-center text-sm font-black text-slate-700 mb-3 uppercase tracking-widest cursor-pointer"
								>
									<Paperclip className="w-5 h-5 mr-3" aria-hidden="true" />{' '}
									Attach Technical Drawings / Datasheet (Optional)
								</label>
								<input
									id="c-files"
									type="file"
									multiple
									aria-label="Attach technical drawings or datasheets (optional)"
									className="w-full text-slate-700 file:cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-slate-900 file:text-white hover:file:bg-blue-600 transition-all cursor-pointer outline-none"
								/>
							</div>
							<button
								type="button"
								onClick={handleSubmit}
								disabled={status === 'loading'}
								className="w-full bg-blue-600 text-white py-5 rounded-xl font-black text-xl hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
								aria-live="polite"
							>
								{status === 'loading' ? (
									<>
										<span
											className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
											aria-hidden="true"
										/>
										Sending to Engineering Team...
									</>
								) : (
									<>
										<MessageCircle className="w-6 h-6" aria-hidden="true" />
										Send to Engineering Team via WhatsApp
									</>
								)}
							</button>
							<p className="text-center text-slate-400 text-xs font-medium mt-4">
								Your details are confidential and used only to respond to your
								inquiry.
							</p>
						</div>
					</div>
				</div>
				<div className="mt-12 space-y-6">
					{/* Google Business CTA card */}
					<div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
						<div
							className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100"
							style={{ backgroundColor: '#e8f0fe' }}
						>
							<svg
								width="28"
								height="28"
								viewBox="0 0 24 24"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
						</div>
						<div className="flex-1 text-center sm:text-left">
							<h3 className="font-black text-slate-900 text-lg mb-1">
								Find Us on Google Business
							</h3>
							<p className="text-slate-500 font-medium text-sm leading-relaxed">
								Search{' '}
								<strong className="text-slate-700">
									&ldquo;Keshav Enterprises Shamli&rdquo;
								</strong>{' '}
								on Google Maps — view our profile, get directions, or leave a
								review to help other buyers find us.
							</p>
						</div>
						<a
							href={CONTACT_INFO.googleBusiness}
							target="_blank"
							rel="noopener noreferrer"
							className="shrink-0 bg-[#4285F4] text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-[#3367d6] transition-all shadow-md flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 min-h-11"
						>
							<ExternalLink className="w-4 h-4" aria-hidden="true" /> View on
							Google
						</a>
					</div>

					{/* Embedded Google Map */}
					<div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
						<div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
							<MapPin
								className="w-5 h-5 text-blue-600 shrink-0"
								aria-hidden="true"
							/>
							<h2 className="font-black text-slate-900 text-lg tracking-tight">
								Our Manufacturing Facility — Shamli, U.P.
							</h2>
						</div>
						<div className="w-full h-100 relative bg-slate-100">
							<iframe
								title="Keshav Enterprises location map — Shamli, Uttar Pradesh"
								src={CONTACT_INFO.googleMapsEmbed}
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="absolute inset-0"
							/>
						</div>
						<div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
							<p className="text-slate-500 font-medium text-sm">
								{CONTACT_INFO.address}
							</p>
							<div className="flex gap-3 shrink-0 flex-wrap justify-center sm:justify-end">
								<a
									href={CONTACT_INFO.googleBusiness}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-[#4285F4] text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-[#3367d6] transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 min-h-11"
								>
									<ExternalLink className="w-4 h-4" aria-hidden="true" /> Google
									Business
								</a>
								<a
									href={CONTACT_INFO.gmapsShare}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-blue-600 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 min-h-11"
								>
									<MapPin className="w-4 h-4" aria-hidden="true" /> Get
									Directions
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
});
ContactPage.displayName = 'ContactPage';

// ─── ERROR BOUNDARY (Audit Fix: prevents full-page crashes) ──
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}
	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}
	componentDidCatch(error, errorInfo) {
		// Log to console; replace with Sentry.captureException(error) when available
		console.error('[ErrorBoundary]', error, errorInfo);
	}
	render() {
		if (this.state.hasError) {
			return (
				<main
					id="main-content"
					tabIndex={-1}
					className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4"
				>
					<div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
						<Shield className="w-10 h-10 text-red-500" aria-hidden="true" />
					</div>
					<h1 className="text-3xl font-black text-slate-900 mb-3">
						Something went wrong
					</h1>
					<p className="text-slate-500 font-medium text-center max-w-md mb-8">
						An unexpected error occurred. Please refresh the page or contact our
						team for assistance.
					</p>
					<div className="flex gap-4">
						<button
							type="button"
							onClick={() => {
								this.setState({ hasError: false, error: null });
								window.location.hash = '#/';
								window.location.reload();
							}}
							className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
						>
							Go to Home
						</button>
						<a
							href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hi, I encountered an error on your website.')}`}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1ebe5d] transition-all flex items-center gap-2"
						>
							<MessageCircle className="w-4 h-4" /> WhatsApp Us
						</a>
					</div>
				</main>
			);
		}
		return this.props.children;
	}
}

// ─── 404 NOT FOUND PAGE (Audit Fix: unknown routes) ──────────
const NotFoundPage = memo(({ navigate }) => (
	<main
		id="main-content"
		tabIndex={-1}
		className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4"
	>
		<SEOHead
			title="Page Not Found — 404"
			description="The page you're looking for doesn't exist. Browse our products and services."
			canonicalPath="/404"
		/>
		<div className="text-center max-w-lg">
			<p className="text-8xl font-black text-blue-600 mb-4">404</p>
			<h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
				Page Not Found
			</h1>
			<p className="text-slate-500 font-medium mb-8">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
				Let us help you find what you need.
			</p>
			<div className="flex flex-col sm:flex-row gap-4 justify-center">
				<button
					type="button"
					onClick={() => navigate('/')}
					className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
				>
					<ArrowLeft className="w-4 h-4" /> Go Home
				</button>
				<button
					type="button"
					onClick={() => navigate('/products')}
					className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
				>
					Browse Products
				</button>
				<a
					href={waMsg(
						"Hi, I couldn't find a page on your website. Can you help?",
					)}
					target="_blank"
					rel="noopener noreferrer"
					className="bg-[#25D366] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#1ebe5d] transition-all shadow-md flex items-center justify-center gap-2"
				>
					<MessageCircle className="w-4 h-4" /> WhatsApp
				</a>
			</div>
		</div>
	</main>
));
NotFoundPage.displayName = 'NotFoundPage';

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {
	const [currentPath, setCurrentPath] = useState(
		() => window.location.hash.replace('#', '') || '/',
	);
	// AUDIT FIX: aria-live region for screen reader route announcements
	const [routeAnnouncement, setRouteAnnouncement] = useState('');

	// Stable window listeners — registered once
	useEffect(() => {
		const h = () => {
			const newPath = window.location.hash.replace('#', '') || '/';
			setCurrentPath(newPath);
			// AUDIT FIX: scroll to top on back/forward navigation
			window.scrollTo({ top: 0 });
			// AUDIT FIX: move focus to main content for screen readers
			setTimeout(() => document.getElementById('main-content')?.focus(), 100);
		};
		window.addEventListener('popstate', h);

		// ── PERF: Back/Forward Cache (bfcache) fix ──
		// Prevents "Page prevented back/forward cache restoration" Lighthouse warning.
		const handlePageHide = () => {
			/* intentionally empty — keeps bfcache eligible */
		};
		window.addEventListener('pagehide', handlePageHide);

		return () => {
			window.removeEventListener('popstate', h);
			window.removeEventListener('pagehide', handlePageHide);
		};
	}, []);

	// ── PERF: Inject hero image preload ONLY on homepage to avoid
	// "preloaded but not used" warning on other routes.
	// Filename matches the actual <img src> used in HomePage: hero-background.png
	useEffect(() => {
		const PRELOAD_ID = 'hero-bg-preload';
		if (currentPath === '/') {
			if (!document.getElementById(PRELOAD_ID)) {
				const pl = document.createElement('link');
				pl.id = PRELOAD_ID;
				pl.rel = 'preload';
				pl.as = 'image';
				pl.href = 'hero-background.png';
				pl.setAttribute('fetchpriority', 'high');
				document.head.appendChild(pl);
			}
		} else {
			// Remove preload when navigating away so it doesn't linger
			document.getElementById(PRELOAD_ID)?.remove();
		}
	}, [currentPath]);

	// ── GOOGLE TRANSLATE INIT ──
	useEffect(() => {
		if (
			typeof window === 'undefined' ||
			document.getElementById('google-translate-script')
		)
			return;

		// Inject custom CSS to hide Google Translate bar and highlights
		const style = document.createElement('style');
		style.innerHTML = `
      body { top: 0 !important; }
      .skiptranslate iframe, .goog-te-banner-frame { display: none !important; }
      #google_translate_element { display: none !important; }
      .goog-tooltip, .goog-tooltip:hover { display: none !important; }
      .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    `;
		document.head.appendChild(style);

		window.googleTranslateElementInit = () => {
			new window.google.translate.TranslateElement(
				{
					pageLanguage: 'en',
					includedLanguages: 'en,hi,zh-CN,es,fr,ar,ru,pt,de,ja',
					autoDisplay: false,
				},
				'google_translate_element',
			);
		};

		const gtScript = document.createElement('script');
		gtScript.id = 'google-translate-script';
		gtScript.src =
			'//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
		gtScript.async = true;
		document.body.appendChild(gtScript);

		const gtDiv = document.createElement('div');
		gtDiv.id = 'google_translate_element';
		document.body.appendChild(gtDiv);
	}, []);

	// ── PERF: Pre-paint viewport stamp ──
	// Runs synchronously after DOM commit but BEFORE the browser paints the
	// frame. Any .lazy-section already inside the viewport (e.g. the hero
	// sub-sections on fast connections) gets .visible stamped immediately so
	// it never flashes invisible for even one frame.
	useLayoutEffect(() => {
		for (const el of document.querySelectorAll('.lazy-section')) {
			const r = el.getBoundingClientRect();
			if (r.top < window.innerHeight + 200) {
				el.classList.add('visible');
			}
		}
	}, [currentPath]);

	// ── PERF: Intersection Observer — re-observe after each route change ──
	// rootMargin '200px' bottom pre-triggers sections 200px BEFORE they scroll into
	// view so content is already visible when the user reaches it.
	// threshold:0 fires as soon as even 1px is within the extended root.
	// No idle/timeout delay — observe immediately so above-fold sections fire at load.
	useEffect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					e.target.classList.add('visible');
					io.unobserve(e.target);
				}
			},
			{ rootMargin: '0px 0px 200px 0px', threshold: 0 },
		);

		for (const el of document.querySelectorAll('.lazy-section:not(.visible)')) {
			io.observe(el);
		}

		return () => {
			io.disconnect();
		};
	}, [currentPath]);

	const navigate = useCallback((path) => {
		window.history.pushState(null, '', `#${path}`);
		setCurrentPath(path);
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// AUDIT FIX: move focus to main content after navigation for a11y
		setTimeout(() => document.getElementById('main-content')?.focus(), 150);
		// AUDIT FIX: announce route change to screen readers
		const pageName =
			path === '/'
				? 'Home'
				: path.replace(/^\//, '').replace(/\//g, ' — ').replace(/-/g, ' ');
		setRouteAnnouncement(`Navigated to ${pageName} page`);
	}, []);

	// Route resolution — AUDIT FIX: removed useMemo wrapper (JSX inside memo is an anti-pattern),
	// added NotFoundPage for unknown routes instead of falling through to HomePage
	const renderPage = () => {
		if (currentPath.startsWith('/product/'))
			return (
				<ProductDetailPage
					productId={currentPath.split('/')[2]}
					navigate={navigate}
				/>
			);
		if (currentPath.startsWith('/blog/'))
			return (
				<BlogPostPage
					slug={currentPath.replace('/blog/', '')}
					navigate={navigate}
				/>
			);
		if (currentPath.startsWith('/industry/'))
			return (
				<IndustryDetailPage
					industryId={currentPath.split('/')[2]}
					navigate={navigate}
				/>
			);
		if (currentPath.startsWith('/service/'))
			return (
				<ServiceDetailPage
					serviceId={currentPath.split('/')[2]}
					navigate={navigate}
				/>
			);
		switch (currentPath) {
			case '/':
				return <HomePage navigate={navigate} />;
			case '/about':
				return <AboutPage navigate={navigate} />;
			case '/blog':
				return <BlogPage navigate={navigate} />;
			case '/blog/':
				return <BlogPage navigate={navigate} />;
			case '/services':
				return <ServicesPage navigate={navigate} />;
			case '/products':
				return <ProductsPage navigate={navigate} />;
			case '/industries':
				return <IndustriesPage navigate={navigate} />;
			case '/contact':
				return <ContactPage />;
			default:
				return <NotFoundPage navigate={navigate} />;
		}
	};

	return (
		<div className="font-sans min-h-screen flex flex-col bg-white selection:bg-blue-600 selection:text-white text-[#111827]">
			{/* AUDIT FIX: aria-live region for screen reader route change announcements */}
			<div
				className="sr-only"
				aria-live="assertive"
				aria-atomic="true"
				role="status"
			>
				{routeAnnouncement}
			</div>
			<Navbar currentPath={currentPath} navigate={navigate} />
			<div className="flex-1 flex flex-col">
				<ErrorBoundary>
					<Suspense
						fallback={
							<div className="flex-1 flex items-center justify-center min-h-[60vh]">
								<span className="sr-only">Loading…</span>
							</div>
						}
					>
						{renderPage()}
					</Suspense>
				</ErrorBoundary>
			</div>
			<DigitalProfilesStrip />
			<Footer navigate={navigate} />
			<FloatingButtons />
		</div>
	);
}