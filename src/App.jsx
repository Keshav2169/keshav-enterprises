import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, CheckCircle2, 
  Settings, Wrench, PenTool, Cpu, ArrowRight, ExternalLink,
  Factory, Zap, Droplet, ShieldCheck, Award, MessageCircle
} from 'lucide-react';

// --- DATA STORE ---

const COMPANY_INFO = {
  name: "Keshav Enterprises",
  phone1: "+91 91492299448",
  phone2: "+91 6397363268",
  email: "ksengg007@gmail.com",
  address: "Gali no.02 Near Subash Ki Chakki, Dayanand Nagar, Shamli-247776, Uttar Pradesh, India",
  whatsapp: "9191492299448",
  indiamart: "https://www.indiamart.com/keshav-enterprises-shamli/"
};

const SERVICES = [
  {
    id: "field-services",
    icon: <Settings size={40} className="text-blue-600" />,
    title: "Field Services & Overhauls",
    short: "Comprehensive on-site inspection, planned overhauls, and 24x7 emergency troubleshooting.",
    details: [
      "Pre-Shutdown Planning & Assessment",
      "Turbine Overhauling (Triveni, Belliss, Siemens, BHEL, etc.)",
      "Machine Alignment (Laser & Dial Gauge)",
      "Erection & Commissioning of Turbines & Pumps",
      "Lube Oil Flushing (ISO Standards)"
    ]
  },
  {
    id: "workshop-services",
    icon: <Wrench size={40} className="text-blue-600" />,
    title: "Workshop Services",
    short: "Precision rotor machining, dynamic balancing, and component refurbishment.",
    details: [
      "Rotor Machining, Grinding & Polishing",
      "Dynamic Balancing (50kg to 2000kg as per ISO/API)",
      "Labyrinth & Journal Undersizing",
      "Component Re-babbitting & Repair",
      "Hydro Testing & Inspection"
    ]
  },
  {
    id: "engineering-services",
    icon: <PenTool size={40} className="text-blue-600" />,
    title: "Engineering Services",
    short: "Detail thermal/mechanical calculations and manufacturing drawings.",
    details: [
      "Turbine Engineering (5 KW to 27 MW)",
      "Upgradation & Retrofitting Support",
      "Specification Development for Brought-out Items",
      "Lube Oil System Design & Engineering",
      "Re-powering to Increase Efficiency"
    ]
  },
  {
    id: "reverse-engineering",
    icon: <Cpu size={40} className="text-blue-600" />,
    title: "Reverse Engineering",
    short: "Advanced 3D scanning, PMI, and drawing generation for obsolete components.",
    details: [
      "Positive Material Identification (PMI)",
      "3D Laser Scanning & Coordinate Measuring",
      "Equivalent Indian Material Suggestions",
      "Tolerancing & Machining Standard Drawings",
      "OEM-Quality Spare Replication"
    ]
  }
];

const PRODUCTS = [
  {
    id: "turbine-spares",
    title: "Turbine & Power Plant Spares",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    description: "OEM quality replacement parts and highly precise turbine components manufactured to exact specifications.",
    specs: ["Complete Rotor Assembly", "Carbon Rings", "Bearings with Thrust Pads", "Gears & Labyrinths", "Mechanical Governors", "Main & Aux Oil Pumps"],
    applications: "Steam Turbines (Triveni, Siemens, Belliss, BHEL), Compressors, Heavy Duty Pumps."
  },
  {
    id: "industrial-filters",
    title: "Oil & Hydraulic Filters",
    image: "https://images.unsplash.com/photo-1611078810237-67469796e625?auto=format&fit=crop&w=800&q=80",
    description: "High-performance filtration solutions for hydraulic fluids, lubrication systems, and industrial liquids to maintain maximum cleanliness.",
    specs: ["Glass Fiber Fleece (VG) Depth Filtration", "Paper (P) Cellulose Fiber", "SS Wiremesh Surface Filtration (5-1500μ)"],
    applications: "Lube Oil Systems, Control Oil Systems, Return-line, Suction Strainers, R.O. Filters."
  },
  {
    id: "expansion-joints",
    title: "Expansion Joints & Bellows",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    description: "Metallic and non-metallic stress-relieving solutions to absorb thermal expansion and mechanical vibration in piping.",
    specs: ["Stainless Steel Metallic Bellows", "Fabric Expansion Joints", "Rubber Bellows (Single/Double/Wide Arch)", "Universal & Rectangular Joints"],
    applications: "Ducting Systems, Heat Exchangers, High-Temp Exhausts, Pipeline Misalignment."
  },
  {
    id: "industrial-strainers",
    title: "Industrial Strainers",
    image: "https://images.unsplash.com/photo-1563452675059-efa1e2e7a787?auto=format&fit=crop&w=800&q=80",
    description: "Robust strainers designed to remove foreign matter from pipelines, protecting pumps, meters, and valves.",
    specs: ["Simplex Basket Strainers", "Duplex Type Strainers", "Y-Type Strainers", "Conical Strainers", "Cast/Stainless Steel (ASME #125 to #600)"],
    applications: "Chemical Lines, Water Treatment, Oil & Gas piping, Sugar Mill processing lines."
  },
  {
    id: "orings-cords",
    title: "O-Rings & Cords",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=800&q=80",
    description: "High-quality industrial O-rings and rubber cords designed for reliable static and dynamic sealing in demanding environments.",
    specs: ["Viton, Silicone, NBR, EPDM materials", "High Temperature Resistance", "Custom Sized Rubber Cords", "Chemical Resistant Seals"],
    applications: "Turbine sealing, hydraulic cylinders, pumps, valves, and general high-pressure industrial sealing."
  },
  {
    id: "electrical-equipments",
    title: "Electrical Equipments",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive range of industrial electrical equipments, control panels, and automation components for seamless plant operation.",
    specs: ["Control & Relay Panels", "Switchgears & Breakers", "Automation Spares (PLC/SCADA)", "Sensors & Transmitters", "Industrial Cabling Solutions"],
    applications: "Power plant control rooms, sugar mill automation, heavy machinery control, and industrial power distribution."
  }
];

const INDUSTRIES = [
  { name: "Power Plants", icon: <Zap size={32} /> },
  { name: "Sugar Mills", icon: <Factory size={32} /> },
  { name: "Paper Mills", icon: <Factory size={32} /> },
  { name: "Refineries", icon: <Droplet size={32} /> },
  { name: "Petro-Chemicals", icon: <ShieldCheck size={32} /> },
  { name: "Agro-Industries", icon: <Award size={32} /> }
];

// --- COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-300 shadow-sm hover:shadow-md";
  const variants = {
    primary: "bg-blue-700 text-white hover:bg-blue-800 hover:-translate-y-0.5 px-6 py-3",
    secondary: "bg-gray-800 text-white hover:bg-gray-900 hover:-translate-y-0.5 px-6 py-3",
    outline: "border-2 border-blue-700 text-blue-700 hover:bg-blue-50 hover:-translate-y-0.5 px-6 py-3",
    whatsapp: "bg-green-600 text-white hover:bg-green-700 hover:-translate-y-0.5 px-6 py-3"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- PAGES ---

const HomePage = ({ navigate }) => (
  <div className="animate-in fade-in duration-500">
    {/* HERO */}
    <section className="relative h-[80vh] flex items-center bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80" alt="Industrial Plant" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <ShieldCheck size={16} /> ISO Quality Assured & MSME Registered
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Precision Engineering & <span className="text-blue-400">Turbine Solutions</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Minimizing downtime and maximizing efficiency. Expert Erection, Overhauling, & Supply of premium spares for Power Plants, Sugar Mills, and Refineries.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => navigate('contact')}>Request a Quote</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('services')}>Explore Services</Button>
          </div>
        </div>
      </div>
    </section>

    {/* TRUST BAR */}
    <section className="bg-blue-900 py-6 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-blue-800">
          <div>
            <div className="text-3xl font-bold mb-1">10+</div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">24/7</div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">Emergency Support</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">OEM</div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">Quality Standards</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">100+</div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">Projects Completed</div>
          </div>
        </div>
      </div>
    </section>

    {/* CORE SERVICES */}
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Engineering Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">From complete turbine overhauls to precision reverse engineering, we provide end-to-end mechanical solutions.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 mb-6">{s.short}</p>
              <button onClick={() => navigate('services')} className="text-blue-600 font-semibold flex items-center hover:text-blue-800">
                Learn more <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PRODUCTS PREVIEW */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Premium Industrial Products</h2>
            <p className="text-lg text-gray-600">Manufactured to exacting tolerances for maximum reliability in critical operations.</p>
          </div>
          <Button variant="outline" className="hidden md:flex" onClick={() => navigate('products')}>View All Catalog</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((p, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
              <div className="sm:w-2/5 h-48 sm:h-auto relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col justify-center sm:w-3/5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.description}</p>
                <button onClick={() => navigate(`product/${p.id}`)} className="text-blue-700 font-medium hover:text-blue-900 flex items-center mt-auto">
                  View Specifications <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" onClick={() => navigate('products')}>View All Catalog</Button>
        </div>
      </div>
    </section>

    {/* CTA / CONTACT PREVIEW */}
    <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-800 rounded-full blur-3xl opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Facing an Unexpected Equipment Failure?</h2>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">Our rapid-response field engineers are available 24/7 for troubleshooting and emergency overhauls.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="whatsapp" onClick={() => window.open(`https://wa.me/${COMPANY_INFO.whatsapp}`, '_blank')}>
            <MessageCircle size={20} className="mr-2" /> WhatsApp Us Now
          </Button>
          <Button variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100" onClick={() => window.open(`tel:${COMPANY_INFO.phone1}`, '_self')}>
            <Phone size={20} className="mr-2" /> Call {COMPANY_INFO.phone1}
          </Button>
        </div>
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="animate-in fade-in duration-500 pb-20">
    <div className="bg-gray-900 text-white py-20 relative">
       <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
       <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Keshav Enterprises</h1>
          <p className="text-xl text-gray-300 max-w-2xl">A legacy of precision engineering, driven by a commitment to quality and client success.</p>
       </div>
    </div>

    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Profile</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              <strong>KESHAV ENTERPRISES</strong> is proud to introduce ourselves as a proficient and experienced team of turbine inspection, erection, commissioning, and maintenance professionals in the power generation sector.
            </p>
            <p className="mb-4">
              Located in Shamli, Uttar Pradesh, we are a growth-oriented, professionally managed organization equipped with a state-of-the-art office and workshop. We specialize in servicing Power Plants, Sugar Mills, Paper Mills, Refineries, and Petro-Chemical Industries.
            </p>
            <p>
              Promoted by a group of engineers possessing over a decade of hands-on experience, we excel in overhauling and troubleshooting multi-brand turbines, alongside manufacturing and supplying high-grade industrial spares such as Oil Filters, Expansion Bellows, and Strainers.
            </p>
          </div>
        </div>
        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
          <p className="text-gray-700 italic mb-8">
            "To provide best quality products & services by maintaining high standards of manufacturing, low cost, on-time delivery, customized products, and ultimate client satisfaction."
          </p>
          <h3 className="text-xl font-bold text-blue-900 mb-4">Our Commitment</h3>
          <ul className="space-y-3">
            {[
              "Provide a full range of high-quality products and services.",
              "Carry out all aspects of work to a high level of professionalism.",
              "Deliver qualitative, guaranteed workmanship."
            ].map((item, i) => (
              <li key={i} className="flex items-start text-gray-700">
                <CheckCircle2 size={20} className="text-green-500 mr-3 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="animate-in fade-in duration-500 pb-20 bg-gray-50">
    <div className="bg-blue-900 text-white py-16">
       <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-200 max-w-2xl">End-to-end mechanical and thermal solutions for heavy rotating equipment.</p>
       </div>
    </div>

    <div className="container mx-auto px-6 py-16">
      <div className="space-y-16">
        {SERVICES.map((srv, idx) => (
          <div key={srv.id} className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2">
              <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    {srv.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{srv.title}</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">{srv.short}</p>
                <ul className="space-y-3">
                  {srv.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 size={20} className="text-blue-600 mr-3 shrink-0 mt-1" />
                      <span className="text-gray-700 font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-inner">
               <img 
                 src={`https://images.unsplash.com/photo-${idx === 0 ? '1581092160562-40aa028fa108' : idx === 1 ? '1504328345606-18bbc8c9d7d1' : idx===2 ? '1581092335397-9583eb92d232' : '1621905252507-b35492d0098b'}?auto=format&fit=crop&w=1000&q=80`} 
                 alt={srv.title} 
                 className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" 
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProductsPage = ({ navigate }) => (
  <div className="animate-in fade-in duration-500 pb-20">
    <div className="bg-slate-900 text-white py-16 text-center">
       <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Industrial Products & Spares</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Manufactured to global standards. Available for nationwide delivery.</p>
       </div>
    </div>

    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((prod) => (
          <div key={prod.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="h-56 relative overflow-hidden group">
              <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{prod.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{prod.description}</p>
              <Button className="w-full" onClick={() => navigate(`product/${prod.id}`)}>View Specifications</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
         <h2 className="text-2xl font-bold text-gray-900 mb-4">Looking for a custom specification?</h2>
         <p className="text-gray-600 mb-6">We provide bespoke manufacturing and reverse engineering for obsolete OEM parts.</p>
         <Button variant="outline" onClick={() => navigate('contact')}>Contact Engineering Team</Button>
      </div>
    </div>
  </div>
);

const ProductDetail = ({ id, navigate }) => {
  const product = PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    return <div className="py-20 text-center"><h2 className="text-2xl">Product not found.</h2><button onClick={()=>navigate('products')} className="text-blue-600 mt-4 underline">Back to Products</button></div>;
  }

  return (
    <div className="animate-in fade-in duration-500 pb-20 bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-6">
           <button onClick={() => navigate('products')} className="text-gray-500 hover:text-blue-600 mb-4 flex items-center text-sm font-medium">
             <ChevronRight size={16} className="rotate-180 mr-1"/> Back to Catalog
           </button>
           <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{product.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <img src={product.image} alt={product.title} className="w-full h-auto rounded-xl object-cover aspect-[4/3]" />
          </div>

          {/* Details */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Description</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{product.description}</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Technical Specifications & Types</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <CheckCircle2 size={18} className="text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span className="font-medium">{spec}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Industry Applications</h3>
              <p className="text-gray-700 font-medium bg-gray-100 p-4 rounded-lg">{product.applications}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
               <Button variant="primary" className="flex-1" onClick={() => window.open(`tel:${COMPANY_INFO.phone1}`, '_self')}>
                 <Phone size={18} className="mr-2" /> Call for Pricing
               </Button>
               <Button variant="whatsapp" className="flex-1" onClick={() => window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=I am inquiring about ${product.title}`, '_blank')}>
                 <MessageCircle size={18} className="mr-2" /> WhatsApp Inquiry
               </Button>
               <Button variant="outline" className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50" onClick={() => window.open(COMPANY_INFO.indiamart, '_blank')}>
                 <ExternalLink size={18} className="mr-2" /> IndiaMART
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndustriesPage = () => (
  <div className="animate-in fade-in duration-500 pb-20">
    <div className="bg-gray-900 text-white py-16 text-center">
       <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Industries We Serve</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Providing critical infrastructure support across diverse industrial sectors.</p>
       </div>
    </div>
    
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {INDUSTRIES.map((ind, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 hover:shadow-lg transition-all duration-300 group">
             <div className="text-blue-600 flex justify-center mb-4 group-hover:scale-110 transition-transform">
               {ind.icon}
             </div>
             <h3 className="text-xl font-bold text-gray-900">{ind.name}</h3>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Valuable Clients</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center opacity-70 grayscale">
          {/* Simulated Client Logos with Text to maintain independence from external assets */}
          {["Kuantum", "ISGEC", "SAEL", "CBL", "Trident Group", "Satia Industries", "Wave Industries", "Triveni", "Jindal", "Rana Group"].map((client, i) => (
            <div key={i} className="text-center font-extrabold text-xl md:text-2xl text-gray-600">
              {client.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your inquiry. Our engineering team will contact you shortly.");
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 bg-gray-50">
      <div className="bg-blue-900 text-white py-16 text-center">
         <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">Get in touch with our experts for service requests, quotes, or general inquiries.</p>
         </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Reach Out Directly</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full text-blue-700 mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Office & Workshop</h4>
                  <p className="text-gray-600">{COMPANY_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full text-blue-700 mr-4">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600"><a href={`tel:${COMPANY_INFO.phone1}`} className="hover:text-blue-600">{COMPANY_INFO.phone1}</a></p>
                  <p className="text-gray-600"><a href={`tel:${COMPANY_INFO.phone2}`} className="hover:text-blue-600">{COMPANY_INFO.phone2}</a></p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full text-blue-700 mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600"><a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-blue-600">{COMPANY_INFO.email}</a></p>
                </div>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden relative border border-gray-300 shadow-inner flex items-center justify-center">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="text-center relative z-10">
                 <MapPin size={48} className="mx-auto text-red-500 mb-2 drop-shadow-md" />
                 <span className="font-bold text-gray-700 bg-white/80 px-3 py-1 rounded-md backdrop-blur-sm">Shamli, Uttar Pradesh</span>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company / Your Name *</label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Enter phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Enter email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirement / Message *</label>
                <textarea required rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Describe your requirement..."></textarea>
              </div>
              <Button type="submit" className="w-full mt-2">Submit Request</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LAYOUT & MAIN APP ---

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    
    // Simulate simple SEO tags updates
    const titleBase = "Keshav Enterprises | ";
    const titles = {
      home: "Turbine Engineering & Power Plant Solutions",
      about: "About Us",
      services: "Engineering & Field Services",
      products: "Industrial Products & Spares",
      industries: "Industries Served",
      contact: "Contact Us"
    };
    
    const routeKey = currentRoute.split('/')[0];
    document.title = titleBase + (titles[routeKey] || "Premium Industrial Spares");
  }, [currentRoute]);

  const navigate = (route) => {
    setCurrentRoute(route);
  };

  const NavLinks = ({ mobile = false }) => {
    const links = [
      { name: 'Home', id: 'home' },
      { name: 'About Us', id: 'about' },
      { name: 'Services', id: 'services' },
      { name: 'Products', id: 'products' },
      { name: 'Industries', id: 'industries' },
      { name: 'Contact', id: 'contact' },
    ];

    return (
      <ul className={`${mobile ? 'flex flex-col space-y-4 text-lg' : 'flex space-x-8 text-sm font-semibold'}`}>
        {links.map((link) => {
          const isActive = currentRoute === link.id || currentRoute.startsWith(`${link.id}/`);
          return (
            <li key={link.id}>
              <button 
                onClick={() => navigate(link.id)}
                className={`transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} uppercase tracking-wide`}
              >
                {link.name}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        {/* Top bar */}
        <div className="bg-gray-900 text-gray-300 py-1.5 text-xs hidden sm:block">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><Phone size={12} className="mr-1"/> {COMPANY_INFO.phone1}</span>
              <span className="flex items-center"><Mail size={12} className="mr-1"/> {COMPANY_INFO.email}</span>
            </div>
            <div className="flex items-center space-x-4">
               <a href={COMPANY_INFO.indiamart} target="_blank" rel="noreferrer" className="hover:text-white flex items-center">
                 <ExternalLink size={12} className="mr-1"/> IndiaMART Profile
               </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="w-12 h-12 bg-blue-700 text-white flex items-center justify-center rounded-lg font-black text-2xl shadow-inner group-hover:bg-blue-800 transition-colors">
              KE
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-gray-900 uppercase leading-none">Keshav</div>
              <div className="text-sm font-semibold tracking-widest text-blue-700 uppercase leading-none mt-1">Enterprises</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <NavLinks />
          </nav>

          {/* CTA / Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:flex text-sm py-2 px-4" onClick={() => navigate('contact')}>Get Quote</Button>
            <button 
              className="lg:hidden text-gray-900 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl p-6 flex flex-col items-center animate-in slide-in-from-top-2">
            <NavLinks mobile />
            <div className="w-full h-px bg-gray-200 my-4"></div>
            <Button className="w-full" onClick={() => navigate('contact')}>Get Quote</Button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        {currentRoute === 'home' && <HomePage navigate={navigate} />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'services' && <ServicesPage />}
        {currentRoute === 'products' && <ProductsPage navigate={navigate} />}
        {currentRoute.startsWith('product/') && <ProductDetail id={currentRoute.split('/')[1]} navigate={navigate} />}
        {currentRoute === 'industries' && <IndustriesPage />}
        {currentRoute === 'contact' && <ContactPage />}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-[6px] border-blue-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Branding */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white text-blue-700 flex items-center justify-center rounded-md font-black text-xl">KE</div>
                <div>
                  <div className="text-lg font-black tracking-tight text-white uppercase leading-none">Keshav</div>
                  <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase leading-none mt-1">Enterprises</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Proficient and experienced team of turbine Inspection, Erection, Commissioning & Maintenance Company in the field of Power Generation.
              </p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Make_In_India.png" alt="Make in India" className="h-10 opacity-70 filter brightness-200 grayscale" />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Products', 'Contact'].map((item) => (
                  <li key={item}>
                    <button onClick={() => navigate(item.toLowerCase().replace(' ', ''))} className="text-gray-400 hover:text-white transition-colors flex items-center text-sm">
                      <ChevronRight size={14} className="mr-2 text-blue-500" /> {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Link */}
            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Our Products</h4>
              <ul className="space-y-3">
                {PRODUCTS.map((prod) => (
                  <li key={prod.id}>
                    <button onClick={() => navigate(`product/${prod.id}`)} className="text-gray-400 hover:text-white transition-colors flex items-center text-sm text-left">
                      <ChevronRight size={14} className="mr-2 text-blue-500 shrink-0" /> <span className="truncate">{prod.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-start">
                  <Phone size={18} className="mr-3 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">{COMPANY_INFO.phone1}<br/>{COMPANY_INFO.phone2}</span>
                </li>
                <li className="flex items-start">
                  <Mail size={18} className="mr-3 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">{COMPANY_INFO.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Keshav Enterprises. All rights reserved.</p>
            <p className="mt-2 md:mt-0">MSME Registered | Quality Assured</p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button 
          onClick={() => window.open(`tel:${COMPANY_INFO.phone1}`, '_self')}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300"
          title="Call Now"
        >
          <Phone size={24} />
        </button>
        <button 
          onClick={() => window.open(`https://wa.me/${COMPANY_INFO.whatsapp}`, '_blank')}
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
          title="WhatsApp Us"
        >
          <MessageCircle size={28} />
        </button>
      </div>
    </div>
  );
}