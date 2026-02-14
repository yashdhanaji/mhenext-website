import {
  Battery, Shield, Gauge, Settings, Leaf, Wrench, Warehouse, Factory, Package, Truck, Star, Box, Zap, Clock, Cpu, ThermometerSnowflake, Weight, Cog
} from 'lucide-react';

// ─── Icon lookup (for serialisable data → component) ────────────────────────
const iconMap = {
  Battery, Shield, Gauge, Settings, Leaf, Wrench, Warehouse, Factory, Package, Truck, Star, Box, Zap, Clock, Cpu, ThermometerSnowflake, Weight, Cog
};

export const resolveIcon = (key) => iconMap[key] || Box;

// ─── Product Data Map (keyed by slug) ───────────────────────────────────────
export const productDataMap = {
  /* ── 1. Electric Forklift 2 Ton ─────────────────────────────────────────────── */
  'electric-forklift': {
    slug: "electric-forklift",
    name: "Electric Forklift 2 Ton",
    category: "Electric Forklifts",
    eyebrow: "Electric Counterbalance",
    has3DModel: true,
    shortDesc: "Zero-emission powerhouse delivering 1.5–2.5 tons of lifting capacity with 8+ hours of continuous runtime.",
    description: "Zero emissions. Maximum performance. Our electric counterbalance forklift delivers 1.5–2.5 tons of lifting power with 8+ hours of continuous operation — engineered for the modern warehouse.",
    images: [
        "https://5.imimg.com/data5/SELLER/Default/2024/10/462384798/MB/JV/NQ/44181569/2-ton-electric-forklift-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/10/459012692/RA/VD/HM/15aborwatches/electric-forklift-2-ton-side.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/10/459012692/RA/VD/HM/15aborwatches/electric-forklift-2-ton-rear.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/10/459012692/RA/VD/HM/15aborwatches/electric-forklift-2-ton-cabin.jpg"
    ],
    badges: [
        "Electric",
        "2 Ton"
    ],
    quickSpecs: [
        {
            value: "2.5T",
            label: "Max Capacity"
        },
        {
            value: "6.0m",
            label: "Lift Height"
        },
        {
            value: "8h+",
            label: "Runtime"
        },
        {
            value: "0",
            label: "Emissions"
        }
    ],
    specs: [
        {
            label: "Load Capacity",
            value: "1,500 – 2,500 kg"
        },
        {
            label: "Max Lift Height",
            value: "4,500 – 6,000 mm"
        },
        {
            label: "Battery System",
            value: "48V / 80V Li-ion"
        },
        {
            label: "Charging Time",
            value: "6 – 8 hours"
        },
        {
            label: "Turning Radius",
            value: "1,950 – 2,100 mm"
        },
        {
            label: "Travel Speed",
            value: "20 km/h (loaded)"
        }
    ],
    features: [
        "Regenerative braking system",
        "Ergonomic operator cabin",
        "Digital display dashboard",
        "Anti-rollback on inclines",
        "Low-noise operation (<70 dB)",
        "Side-shift as standard"
    ],
    applications: [
        "Warehousing",
        "Manufacturing",
        "Cold Storage",
        "Logistics",
        "Retail",
        "Distribution"
    ],
    fullSpecs: [
        {
            label: "Load Capacity",
            value: "1.5 – 2.5 Ton"
        },
        {
            label: "Max Lift Height",
            value: "6,000 mm"
        },
        {
            label: "Battery Voltage",
            value: "48V / 80V"
        },
        {
            label: "Battery Capacity",
            value: "400 – 700 Ah"
        },
        {
            label: "Charging Time",
            value: "6 – 8 hrs"
        },
        {
            label: "Runtime",
            value: "8+ hours"
        },
        {
            label: "Travel Speed",
            value: "20 km/h"
        },
        {
            label: "Turning Radius",
            value: "1,950 mm"
        },
        {
            label: "Overall Width",
            value: "1,150 mm"
        },
        {
            label: "Fork Length",
            value: "1,070 mm"
        },
        {
            label: "Ground Clearance",
            value: "95 mm"
        },
        {
            label: "Service Weight",
            value: "3,200 – 4,800 kg"
        }
    ],
    fullFeatures: [
        {
            icon: "Battery",
            title: "Advanced Battery System",
            desc: "High-capacity lithium-ion batteries with intelligent BMS for optimal charge cycles and extended lifespan."
        },
        {
            icon: "Shield",
            title: "Safety Systems",
            desc: "Integrated seat belt interlock, overhead guard, and automatic speed reduction when cornering."
        },
        {
            icon: "Gauge",
            title: "Precision Hydraulics",
            desc: "Proportional hydraulic controls for smooth, precise load positioning and micro-inch accuracy."
        },
        {
            icon: "Settings",
            title: "Smart Controls",
            desc: "Digital dashboard with fault diagnostics, hour meter, battery indicator, and customizable performance modes."
        },
        {
            icon: "Leaf",
            title: "Zero Emissions",
            desc: "Fully electric drivetrain produces zero direct emissions — ideal for indoor operations and sustainability goals."
        },
        {
            icon: "Wrench",
            title: "Easy Maintenance",
            desc: "Tilt-forward cabin design gives full access to all components. Fewer moving parts than ICE equivalents."
        }
    ],
    fullApplications: [
        {
            icon: "Warehouse",
            name: "Warehousing",
            desc: "Pallet movement, racking, and inventory management in distribution centers."
        },
        {
            icon: "Factory",
            name: "Manufacturing",
            desc: "Production line supply, raw material handling, and finished goods staging."
        },
        {
            icon: "Package",
            name: "Cold Storage",
            desc: "Rated for cold chain environments down to -25°C with condensation-proof electronics."
        },
        {
            icon: "Truck",
            name: "Logistics & 3PL",
            desc: "High-throughput dock operations, container loading, and cross-docking."
        },
        {
            icon: "Star",
            name: "Retail Fulfillment",
            desc: "E-commerce pick-pack operations and backroom inventory management."
        },
        {
            icon: "Box",
            name: "General Cargo",
            desc: "Versatile handling for mixed loads across various industry verticals."
        }
    ],
    downloads: [
        {
            name: "Product Brochure",
            size: "PDF · 4.2 MB"
        },
        {
            name: "Technical Specifications",
            size: "PDF · 1.8 MB"
        },
        {
            name: "Maintenance Guide",
            size: "PDF · 2.1 MB"
        },
        {
            name: "Safety Data Sheet",
            size: "PDF · 890 KB"
        }
    ],
    relatedSlugs: [
        "electric-forklift-3t",
        "electric-forklift-5t",
        "three-wheel-electric-forklift"
    ]
},

  /* ── 2. Electric Forklift 3 Ton ─────────────────────────────────────────────── */
  'electric-forklift-3t': {
    slug: "electric-forklift-3t",
    name: "Electric Forklift 3 Ton",
    category: "Electric Forklifts",
    eyebrow: "Electric Counterbalance",
    has3DModel: false,
    shortDesc: "Heavy-duty electric forklift with 3-ton capacity for demanding warehouse and logistics operations.",
    description: "Step up to 3-ton capability without sacrificing efficiency. Our 3-ton electric forklift combines robust lifting power with zero-emission operation — built for warehouses that need more muscle.",
    images: [
        "https://5.imimg.com/data5/SELLER/Default/2023/3/294694578/YP/GU/LI/3-ton-electric-forklift.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/3/294694578/YP/GU/LI/3-ton-electric-forklift-side.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/3/294694578/YP/GU/LI/3-ton-electric-forklift-rear.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/3/294694578/YP/GU/LI/3-ton-electric-forklift-cabin.jpg"
    ],
    badges: [
        "Electric",
        "3 Ton"
    ],
    quickSpecs: [
        {
            value: "3.0T",
            label: "Max Capacity"
        },
        {
            value: "6.5m",
            label: "Lift Height"
        },
        {
            value: "7h+",
            label: "Runtime"
        },
        {
            value: "0",
            label: "Emissions"
        }
    ],
    specs: [
        {
            label: "Load Capacity",
            value: "2,500 – 3,000 kg"
        },
        {
            label: "Max Lift Height",
            value: "5,000 – 6,500 mm"
        },
        {
            label: "Battery System",
            value: "80V Li-ion"
        },
        {
            label: "Charging Time",
            value: "6 – 8 hours"
        },
        {
            label: "Turning Radius",
            value: "2,200 mm"
        },
        {
            label: "Travel Speed",
            value: "18 km/h (loaded)"
        }
    ],
    features: [
        "Regenerative braking system",
        "Full-suspension operator seat",
        "Multi-function LCD display",
        "Automatic parking brake",
        "Low-noise operation (<72 dB)",
        "Integrated side-shift"
    ],
    applications: [
        "Warehousing",
        "Manufacturing",
        "Logistics",
        "Distribution",
        "Construction",
        "Paper & Pulp"
    ],
    fullSpecs: [
        {
            label: "Load Capacity",
            value: "2.5 – 3.0 Ton"
        },
        {
            label: "Max Lift Height",
            value: "6,500 mm"
        },
        {
            label: "Battery Voltage",
            value: "80V"
        },
        {
            label: "Battery Capacity",
            value: "500 – 800 Ah"
        },
        {
            label: "Charging Time",
            value: "6 – 8 hrs"
        },
        {
            label: "Runtime",
            value: "7+ hours"
        },
        {
            label: "Travel Speed",
            value: "18 km/h"
        },
        {
            label: "Turning Radius",
            value: "2,200 mm"
        },
        {
            label: "Overall Width",
            value: "1,250 mm"
        },
        {
            label: "Fork Length",
            value: "1,150 mm"
        },
        {
            label: "Ground Clearance",
            value: "100 mm"
        },
        {
            label: "Service Weight",
            value: "4,500 – 5,200 kg"
        }
    ],
    fullFeatures: [
        {
            icon: "Battery",
            title: "High-Capacity Battery",
            desc: "80V lithium-ion power pack with smart BMS delivers consistent output even under heavy loads."
        },
        {
            icon: "Shield",
            title: "Enhanced Safety",
            desc: "Blue safety light, overhead guard, and automatic deceleration in corners for operator protection."
        },
        {
            icon: "Gauge",
            title: "Precision Hydraulics",
            desc: "Dual-action proportional valves for smooth, jerk-free lifting and tilting movements."
        },
        {
            icon: "Settings",
            title: "Digital Controls",
            desc: "LCD dashboard with real-time diagnostics, performance modes, and programmable speed limits."
        },
        {
            icon: "Leaf",
            title: "Eco-Friendly",
            desc: "Zero tailpipe emissions and low energy consumption make it ideal for indoor operations."
        },
        {
            icon: "Wrench",
            title: "Service Access",
            desc: "Tilt-forward cabin and modular component layout for fast, hassle-free maintenance."
        }
    ],
    fullApplications: [
        {
            icon: "Warehouse",
            name: "Warehousing",
            desc: "Heavy pallet handling, block stacking, and high-throughput dock operations."
        },
        {
            icon: "Factory",
            name: "Manufacturing",
            desc: "Raw material supply, die handling, and work-in-progress movement on production floors."
        },
        {
            icon: "Truck",
            name: "Logistics & 3PL",
            desc: "Container stuffing, cross-docking, and trailer loading for 3PL facilities."
        },
        {
            icon: "Package",
            name: "Distribution",
            desc: "Order consolidation and outbound staging in distribution centers."
        },
        {
            icon: "Star",
            name: "Construction Supply",
            desc: "Handling building materials, steel sections, and heavy packaged goods."
        },
        {
            icon: "Box",
            name: "Paper & Pulp",
            desc: "Roll and bale handling in paper mills and packaging plants."
        }
    ],
    downloads: [
        {
            name: "Product Brochure",
            size: "PDF · 4.5 MB"
        },
        {
            name: "Technical Specifications",
            size: "PDF · 1.9 MB"
        },
        {
            name: "Maintenance Guide",
            size: "PDF · 2.3 MB"
        },
        {
            name: "Safety Data Sheet",
            size: "PDF · 920 KB"
        }
    ],
    relatedSlugs: [
        "electric-forklift",
        "electric-forklift-5t",
        "electric-forklift-8t"
    ]
},

  /* ── 3. Electric Forklift 5 Ton ─────────────────────────────────────────────── */
  'electric-forklift-5t': {
    slug: "electric-forklift-5t",
    name: "Electric Forklift 5 Ton",
    category: "Electric Forklifts",
    eyebrow: "Electric Heavy Duty",
    has3DModel: false,
    shortDesc: "5-ton electric forklift for heavy industrial loads with advanced battery management and zero emissions.",
    description: "Serious lifting, zero compromise. The 5-ton electric forklift handles the heaviest warehouse loads while keeping your facility emission-free — backed by an 80V high-capacity battery system.",
    images: [
        "https://5.imimg.com/data5/SELLER/Default/2023/6/316215893/MK/QW/ZA/5-ton-electric-forklift.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/6/316215893/MK/QW/ZA/5-ton-electric-forklift-side.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/6/316215893/MK/QW/ZA/5-ton-electric-forklift-rear.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/6/316215893/MK/QW/ZA/5-ton-electric-forklift-cabin.jpg"
    ],
    badges: [
        "Electric",
        "5 Ton"
    ],
    quickSpecs: [
        {
            value: "5.0T",
            label: "Max Capacity"
        },
        {
            value: "6.0m",
            label: "Lift Height"
        },
        {
            value: "6h+",
            label: "Runtime"
        },
        {
            value: "0",
            label: "Emissions"
        }
    ],
    specs: [
        {
            label: "Load Capacity",
            value: "4,000 – 5,000 kg"
        },
        {
            label: "Max Lift Height",
            value: "4,500 – 6,000 mm"
        },
        {
            label: "Battery System",
            value: "80V Li-ion"
        },
        {
            label: "Charging Time",
            value: "7 – 9 hours"
        },
        {
            label: "Turning Radius",
            value: "2,600 mm"
        },
        {
            label: "Travel Speed",
            value: "16 km/h (loaded)"
        }
    ],
    features: [
        "Heavy-duty drive axle",
        "Full-suspension cabin",
        "Multi-function colour display",
        "Automatic speed reduction",
        "Regenerative braking",
        "Fork positioner as standard"
    ],
    applications: [
        "Heavy Manufacturing",
        "Steel & Metal",
        "Warehousing",
        "Logistics",
        "Ports",
        "Construction"
    ],
    fullSpecs: [
        {
            label: "Load Capacity",
            value: "4.0 – 5.0 Ton"
        },
        {
            label: "Max Lift Height",
            value: "6,000 mm"
        },
        {
            label: "Battery Voltage",
            value: "80V"
        },
        {
            label: "Battery Capacity",
            value: "700 – 1,000 Ah"
        },
        {
            label: "Charging Time",
            value: "7 – 9 hrs"
        },
        {
            label: "Runtime",
            value: "6+ hours"
        },
        {
            label: "Travel Speed",
            value: "16 km/h"
        },
        {
            label: "Turning Radius",
            value: "2,600 mm"
        },
        {
            label: "Overall Width",
            value: "1,450 mm"
        },
        {
            label: "Fork Length",
            value: "1,200 mm"
        },
        {
            label: "Ground Clearance",
            value: "115 mm"
        },
        {
            label: "Service Weight",
            value: "7,200 – 8,500 kg"
        }
    ],
    fullFeatures: [
        {
            icon: "Battery",
            title: "High-Output Battery",
            desc: "80V system with up to 1,000 Ah capacity and intelligent thermal management for sustained heavy loads."
        },
        {
            icon: "Shield",
            title: "Reinforced Safety",
            desc: "Load backrest extension, rear-view camera, and blue spot warning lights for yard safety."
        },
        {
            icon: "Gauge",
            title: "Heavy-Duty Hydraulics",
            desc: "Oversized cylinders and proportional flow control for precise positioning of heavy loads."
        },
        {
            icon: "Settings",
            title: "Advanced Telematics",
            desc: "Fleet management ready with CAN-bus diagnostics and wireless performance monitoring."
        },
        {
            icon: "Leaf",
            title: "Clean Operation",
            desc: "Zero direct emissions and significantly lower noise levels compared to diesel counterparts."
        },
        {
            icon: "Wrench",
            title: "Rugged Build",
            desc: "Heavy-duty frame, reinforced mast, and accessible service points designed for high-utilisation sites."
        }
    ],
    fullApplications: [
        {
            icon: "Factory",
            name: "Heavy Manufacturing",
            desc: "Die, mould, and heavy component handling on factory floors."
        },
        {
            icon: "Cog",
            name: "Steel & Metal",
            desc: "Coil, sheet, and bar handling in steel service centres and metal fabrication."
        },
        {
            icon: "Warehouse",
            name: "Warehousing",
            desc: "Double-pallet handling and block stacking in large distribution centres."
        },
        {
            icon: "Truck",
            name: "Logistics",
            desc: "Heavy container loading, unloading, and yard shuttle operations."
        },
        {
            icon: "Package",
            name: "Ports & Terminals",
            desc: "Cargo handling in port warehouses and intermodal terminals."
        },
        {
            icon: "Box",
            name: "Construction Supply",
            desc: "Handling precast concrete, steel beams, and bulk building materials."
        }
    ],
    downloads: [
        {
            name: "Product Brochure",
            size: "PDF · 5.1 MB"
        },
        {
            name: "Technical Specifications",
            size: "PDF · 2.2 MB"
        },
        {
            name: "Maintenance Guide",
            size: "PDF · 2.6 MB"
        },
        {
            name: "Safety Data Sheet",
            size: "PDF · 950 KB"
        }
    ],
    relatedSlugs: [
        "electric-forklift-3t",
        "electric-forklift-8t",
        "electric-forklift-10t"
    ]
},

  /* ── 4. Electric Forklift 8 Ton ─────────────────────────────────────────────── */
  'electric-forklift-8t': {
    slug: "electric-forklift-8t",
    name: "Electric Forklift 8 Ton",
    category: "Electric Forklifts",
    eyebrow: "Electric Heavy Duty",
    has3DModel: false,
    shortDesc: "Electric Forklift, With Battery & Charger, Capacity: 8000 Kgs, Lift Height: 3000~6000 mm",
    description: "Electric Forklift, With Battery & Charger, Capacity: 8000 Kgs, Lift Height: 3000~6000 mm, With Solid Tire, With Various Attachments",
    images: [
        "https://5.imimg.com/data5/SELLER/Default/2023/8/330458712/XY/AB/CD/8-ton-electric-forklift.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/8/330458712/XY/AB/CD/8-ton-electric-forklift-side.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/8/330458712/XY/AB/CD/8-ton-electric-forklift-rear.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/8/330458712/XY/AB/CD/8-ton-electric-forklift-cabin.jpg"
    ],
    badges: [
        "Electric",
        "8 Ton"
    ],
    quickSpecs: [
        {
            value: "8000 Kgs",
            label: "Capacity"
        },
        {
            value: "5000 mm",
            label: "Lifting Height"
        },
        {
            value: "Electric",
            label: "Fuel Type"
        }
    ],
    specs: [
        {
            label: "Lifting Height",
            value: "5000 mm"
        },
        {
            label: "Capacity",
            value: "8000 Kgs"
        },
        {
            label: "Usage/Application",
            value: "Lifting"
        },
        {
            label: "Accessories",
            value: "Pallet Lifter"
        },
        {
            label: "Brand",
            value: "MHE NEXT"
        },
        {
            label: "Fuel Type",
            value: "Electric"
        },
        {
            label: "Warranty",
            value: "12 Months"
        },
        {
            label: "Minimum order quantity",
            value: "1 Piece"
        }
    ],
    features: [
        "With Battery & Charger",
        "Capacity: 8000 Kgs",
        "Lift Height: 3000~6000 mm",
        "With Solid Tire",
        "With Various Attachments"
    ],
    applications: [
        "Steel Industry",
        "Heavy Manufacturing",
        "Ports",
        "Timber",
        "Precast Concrete",
        "Shipyards"
    ],
    fullSpecs: [
        {
            label: "Lifting Height",
            value: "5000 mm"
        },
        {
            label: "Capacity",
            value: "8000 Kgs"
        },
        {
            label: "Usage/Application",
            value: "Lifting"
        },
        {
            label: "Accessories",
            value: "Pallet Lifter"
        },
        {
            label: "Brand",
            value: "MHE NEXT"
        },
        {
            label: "Fuel Type",
            value: "Electric"
        },
        {
            label: "Warranty",
            value: "12 Months"
        },
        {
            label: "Minimum order quantity",
            value: "1 Piece"
        }
    ],
    fullFeatures: [
        {
            icon: "Battery",
            title: "96V Power System",
            desc: "High-voltage lithium-ion battery with rapid charge option and thermal management for heavy-duty cycles."
        },
        {
            icon: "Shield",
            title: "Maximum Safety",
            desc: "360° visibility aids, load moment indicator, and automatic speed governor for safe heavy-load handling."
        },
        {
            icon: "Gauge",
            title: "Industrial Hydraulics",
            desc: "Load-sensing pump with proportional valves for precise control of loads up to 8 tonnes."
        },
        {
            icon: "Settings",
            title: "Fleet Telematics",
            desc: "Built-in GPS tracking, operator access control, and remote diagnostics for fleet managers."
        },
        {
            icon: "Leaf",
            title: "Green Alternative",
            desc: "Replaces diesel forklifts in heavy applications — reducing carbon footprint and fuel costs."
        },
        {
            icon: "Wrench",
            title: "Industrial Durability",
            desc: "Reinforced frame, heavy-duty mast, and sealed components for harsh industrial environments."
        }
    ],
    fullApplications: [
        {
            icon: "Cog",
            name: "Steel Industry",
            desc: "Coil handling, plate stacking, and heavy bar transport in steel plants."
        },
        {
            icon: "Factory",
            name: "Heavy Manufacturing",
            desc: "Machine component, die, and mould movement on industrial shop floors."
        },
        {
            icon: "Truck",
            name: "Ports & Logistics",
            desc: "Heavy cargo handling in port warehouses, CFS, and ICD facilities."
        },
        {
            icon: "Package",
            name: "Timber & Plywood",
            desc: "Log handling, lumber stacking, and plywood bundle transport."
        },
        {
            icon: "Box",
            name: "Precast Concrete",
            desc: "Moving heavy precast elements, pipes, and concrete blocks."
        },
        {
            icon: "Star",
            name: "Shipyards",
            desc: "Engine, equipment, and heavy component handling in shipbuilding facilities."
        }
    ],
    downloads: [
        {
            name: "Product Brochure",
            size: "PDF · 5.8 MB"
        },
        {
            name: "Technical Specifications",
            size: "PDF · 2.5 MB"
        },
        {
            name: "Maintenance Guide",
            size: "PDF · 3.0 MB"
        },
        {
            name: "Safety Data Sheet",
            size: "PDF · 1.0 MB"
        }
    ],
    relatedSlugs: [
        "electric-forklift-5t",
        "electric-forklift-10t",
        "electric-forklift-3t"
    ]
},

  /* ── 5. Electric Forklift 10 Ton ────────────────────────────────────────────── */
  'electric-forklift-10t': {
    slug: "electric-forklift-10t",
    name: "Electric Forklift 10 Ton",
    category: "Electric Forklifts",
    eyebrow: "Electric Super Heavy",
    has3DModel: false,
    shortDesc: "10-ton electric forklift for the most extreme lifting requirements — steel, ports, and heavy industry.",
    description: "The ultimate electric workhorse. Our 10-ton forklift delivers maximum lifting capability with a fully electric drivetrain — designed for steel plants, ports, and heavy industry where diesel replacement is the goal.",
    images: [
        "https://5.imimg.com/data5/SELLER/Default/2023/10/348921567/EF/GH/IJ/10-ton-electric-forklift.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/10/348921567/EF/GH/IJ/10-ton-electric-forklift-side.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/10/348921567/EF/GH/IJ/10-ton-electric-forklift-rear.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/10/348921567/EF/GH/IJ/10-ton-electric-forklift-cabin.jpg"
    ],
    badges: [
        "Electric",
        "10 Ton"
    ],
    quickSpecs: [
        {
            value: "10T",
            label: "Max Capacity"
        },
        {
            value: "5.0m",
            label: "Lift Height"
        },
        {
            value: "5h+",
            label: "Runtime"
        },
        {
            value: "0",
            label: "Emissions"
        }
    ],
    specs: [
        {
            label: "Load Capacity",
            value: "8,000 – 10,000 kg"
        },
        {
            label: "Max Lift Height",
            value: "4,000 – 5,000 mm"
        },
        {
            label: "Battery System",
            value: "96V Li-ion"
        },
        {
            label: "Charging Time",
            value: "9 – 11 hours"
        },
        {
            label: "Turning Radius",
            value: "3,500 mm"
        },
        {
            label: "Travel Speed",
            value: "12 km/h (loaded)"
        }
    ],
    features: [
        "Triple AC motor drivetrain",
        "Load moment display",
        "Full-cabin air conditioning",
        "360° camera system",
        "Automatic tilt levelling",
        "Heavy-duty wet disc brakes"
    ],
    applications: [
        "Steel Plants",
        "Shipyards",
        "Ports",
        "Mining",
        "Heavy Engineering",
        "Power Plants"
    ],
    fullSpecs: [
        {
            label: "Load Capacity",
            value: "8.0 – 10.0 Ton"
        },
        {
            label: "Max Lift Height",
            value: "5,000 mm"
        },
        {
            label: "Battery Voltage",
            value: "96V"
        },
        {
            label: "Battery Capacity",
            value: "1,200 – 1,500 Ah"
        },
        {
            label: "Charging Time",
            value: "9 – 11 hrs"
        },
        {
            label: "Runtime",
            value: "5+ hours"
        },
        {
            label: "Travel Speed",
            value: "12 km/h"
        },
        {
            label: "Turning Radius",
            value: "3,500 mm"
        },
        {
            label: "Overall Width",
            value: "2,050 mm"
        },
        {
            label: "Fork Length",
            value: "1,520 mm"
        },
        {
            label: "Ground Clearance",
            value: "150 mm"
        },
        {
            label: "Service Weight",
            value: "16,000 – 18,000 kg"
        }
    ],
    fullFeatures: [
        {
            icon: "Battery",
            title: "Maximum Power",
            desc: "96V high-capacity lithium-ion system with fast-charge support and active cooling for non-stop heavy duty."
        },
        {
            icon: "Shield",
            title: "Total Safety Suite",
            desc: "Load moment indicator, 360° cameras, proximity sensors, and automatic speed governing for ultra-heavy loads."
        },
        {
            icon: "Gauge",
            title: "Mega Hydraulics",
            desc: "Oversized cylinders with electronic load-sensing for smooth handling of 10-tonne loads."
        },
        {
            icon: "Settings",
            title: "Connected Fleet",
            desc: "Full telematics suite with OTA updates, operator scoring, and predictive maintenance alerts."
        },
        {
            icon: "Leaf",
            title: "Diesel Replacement",
            desc: "Designed as a direct diesel replacement — eliminating fuel costs and emissions in heavy applications."
        },
        {
            icon: "Wrench",
            title: "Built to Last",
            desc: "Extra-heavy-duty frame, reinforced counterweight, and sealed drivetrain for the harshest environments."
        }
    ],
    fullApplications: [
        {
            icon: "Cog",
            name: "Steel Plants",
            desc: "Coil, slab, and billet handling in integrated steel manufacturing facilities."
        },
        {
            icon: "Star",
            name: "Shipyards",
            desc: "Heavy component, engine, and hull-section movement in shipbuilding yards."
        },
        {
            icon: "Truck",
            name: "Ports & Terminals",
            desc: "Break-bulk cargo handling, heavy container operations, and yard transport."
        },
        {
            icon: "Factory",
            name: "Mining & Minerals",
            desc: "Equipment, ore, and heavy material transport in mining operations."
        },
        {
            icon: "Package",
            name: "Heavy Engineering",
            desc: "Turbine, generator, and heavy machinery handling in engineering workshops."
        },
        {
            icon: "Box",
            name: "Power Plants",
            desc: "Transformer, turbine, and heavy equipment movement in power generation facilities."
        }
    ],
    downloads: [
        {
            name: "Product Brochure",
            size: "PDF · 6.2 MB"
        },
        {
            name: "Technical Specifications",
            size: "PDF · 2.8 MB"
        },
        {
            name: "Maintenance Guide",
            size: "PDF · 3.4 MB"
        },
        {
            name: "Safety Data Sheet",
            size: "PDF · 1.1 MB"
        }
    ],
    relatedSlugs: [
        "electric-forklift-8t",
        "electric-forklift-5t",
        "heli-make-forklift"
    ]
},

  /* ── 6. Three Wheel Electric Forklift ───────────────────────────────────────── */
  'three-wheel-electric-forklift': {
    slug: "three-wheel-electric-forklift",
    name: "Three Wheel Electric Forklift",
    category: "Electric Forklifts",
    eyebrow: "Three Wheel Electric",
    has3DModel: false,
    shortDesc: "Ultra-compact three-wheel design for tight spaces with exceptional manoeuvrability and zero emissions.",
    description: "Navigate the tightest aisles with ease. The three-wheel electric forklift offers an unmatched turning radius and compact footprint — perfect for small warehouses, retail backrooms, and confined spaces.",
    images: [
        "https://5.imimg.com/data5/SELLER/Default/2024/1/375682941/TW/EF/LK/three-wheel-electric-forklift.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/1/375682941/TW/EF/LK/three-wheel-electric-forklift-side.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/1/375682941/TW/EF/LK/three-wheel-electric-forklift-rear.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/1/375682941/TW/EF/LK/three-wheel-electric-forklift-cabin.jpg"
    ],
    badges: [
        "Electric",
        "Compact"
    ],
    quickSpecs: [
        {
            value: "2.0T",
            label: "Max Capacity"
        },
        {
            value: "5.5m",
            label: "Lift Height"
        },
        {
            value: "8h+",
            label: "Runtime"
        },
        {
            value: "1.6m",
            label: "Turn Radius"
        }
    ],
    specs: [
        {
            label: "Load Capacity",
            value: "1,500 – 2,000 kg"
        },
        {
            label: "Max Lift Height",
            value: "4,000 – 5,500 mm"
        },
        {
            label: "Battery System",
            value: "48V Li-ion"
        },
        {
            label: "Charging Time",
            value: "5 – 7 hours"
        },
        {
            label: "Turning Radius",
            value: "1,600 mm"
        },
        {
            label: "Travel Speed",
            value: "16 km/h (loaded)"
        }
    ],
    features: [
        "Ultra-tight turning radius",
        "Low step-in height",
        "Ergonomic mini-lever controls",
        "Electric power steering",
        "Compact 3-wheel chassis",
        "Regenerative braking"
    ],
    applications: [
        "Small Warehouses",
        "Retail",
        "Food & Beverage",
        "Pharmaceuticals",
        "Print & Packaging",
        "Electronics"
    ],
    fullSpecs: [
        {
            label: "Load Capacity",
            value: "1.5 – 2.0 Ton"
        },
        {
            label: "Max Lift Height",
            value: "5,500 mm"
        },
        {
            label: "Battery Voltage",
            value: "48V"
        },
        {
            label: "Battery Capacity",
            value: "300 – 500 Ah"
        },
        {
            label: "Charging Time",
            value: "5 – 7 hrs"
        },
        {
            label: "Runtime",
            value: "8+ hours"
        },
        {
            label: "Travel Speed",
            value: "16 km/h"
        },
        {
            label: "Turning Radius",
            value: "1,600 mm"
        },
        {
            label: "Overall Width",
            value: "1,050 mm"
        },
        {
            label: "Fork Length",
            value: "1,000 mm"
        },
        {
            label: "Ground Clearance",
            value: "85 mm"
        },
        {
            label: "Service Weight",
            value: "2,800 – 3,500 kg"
        }
    ],
    fullFeatures: [
        {
            icon: "Battery",
            title: "Efficient Battery",
            desc: "48V lithium-ion battery with opportunity charging support for minimal downtime in multi-shift operations."
        },
        {
            icon: "Shield",
            title: "Stability Control",
            desc: "Active stability system, curve speed control, and anti-tip technology for safe three-wheel operation."
        },
        {
            icon: "Gauge",
            title: "Compact Hydraulics",
            desc: "Responsive hydraulic system optimised for the small frame — smooth and precise in tight spaces."
        },
        {
            icon: "Settings",
            title: "Intuitive Controls",
            desc: "Mini-lever steering, programmable speed settings, and a compact digital instrument cluster."
        },
        {
            icon: "Leaf",
            title: "Indoor Friendly",
            desc: "Zero emissions, ultra-low noise, and no fumes — perfect for enclosed spaces and food-grade facilities."
        },
        {
            icon: "Wrench",
            title: "Easy Service",
            desc: "Flip-up hood and accessible battery compartment for quick maintenance and battery swaps."
        }
    ],
    fullApplications: [
        {
            icon: "Warehouse",
            name: "Small Warehouses",
            desc: "Narrow-aisle pallet handling where standard forklifts cannot operate."
        },
        {
            icon: "Star",
            name: "Retail",
            desc: "Backroom stocking, receiving, and store replenishment in retail environments."
        },
        {
            icon: "Package",
            name: "Food & Beverage",
            desc: "Cold room and production floor handling with zero-emission operation."
        },
        {
            icon: "Factory",
            name: "Pharmaceuticals",
            desc: "Clean-room compatible operation in pharmaceutical warehouses and labs."
        },
        {
            icon: "Box",
            name: "Print & Packaging",
            desc: "Paper roll and packaging material handling in compact production areas."
        },
        {
            icon: "Truck",
            name: "Electronics",
            desc: "Sensitive component handling in electronics manufacturing and distribution."
        }
    ],
    downloads: [
        {
            name: "Product Brochure",
            size: "PDF · 3.8 MB"
        },
        {
            name: "Technical Specifications",
            size: "PDF · 1.6 MB"
        },
        {
            name: "Maintenance Guide",
            size: "PDF · 1.9 MB"
        },
        {
            name: "Safety Data Sheet",
            size: "PDF · 850 KB"
        }
    ],
    relatedSlugs: [
        "electric-forklift",
        "electric-forklift-3t",
        "heli-make-forklift"
    ]
},

  /* ── 7. Heli Electric Forklift ──────────────────────────────────────────────── */
  'heli-make-forklift': {
    slug: "heli-make-forklift",
    name: "Heli Electric Forklift",
    category: "Electric Forklifts",
    eyebrow: "Heli Brand",
    has3DModel: false,
    shortDesc: "Globally trusted Heli-brand electric forklift with proven reliability and competitive total cost of ownership.",
    description: "Backed by the world's largest forklift manufacturer. The Heli electric forklift combines global engineering standards with competitive pricing — a reliable workhorse trusted across industries worldwide.",
    images: [
        "https://5.imimg.com/data5/SELLER/Default/2024/4/412587369/HE/LI/FK/heli-electric-forklift.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/4/412587369/HE/LI/FK/heli-electric-forklift-side.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/4/412587369/HE/LI/FK/heli-electric-forklift-rear.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/4/412587369/HE/LI/FK/heli-electric-forklift-cabin.jpg"
    ],
    badges: [
        "Heli",
        "Value"
    ],
    quickSpecs: [
        {
            value: "3.5T",
            label: "Max Capacity"
        },
        {
            value: "6.0m",
            label: "Lift Height"
        },
        {
            value: "7h+",
            label: "Runtime"
        },
        {
            value: "0",
            label: "Emissions"
        }
    ],
    specs: [
        {
            label: "Load Capacity",
            value: "1,500 – 3,500 kg"
        },
        {
            label: "Max Lift Height",
            value: "4,500 – 6,000 mm"
        },
        {
            label: "Battery System",
            value: "48V / 80V Li-ion"
        },
        {
            label: "Charging Time",
            value: "6 – 8 hours"
        },
        {
            label: "Turning Radius",
            value: "2,050 – 2,300 mm"
        },
        {
            label: "Travel Speed",
            value: "18 km/h (loaded)"
        }
    ],
    features: [
        "Heli-proven AC drive system",
        "Curtis/Zapi controllers",
        "Comfortable operator cabin",
        "Wide-view mast design",
        "Standard side-shift",
        "Low total cost of ownership"
    ],
    applications: [
        "Warehousing",
        "Manufacturing",
        "Logistics",
        "FMCG",
        "Automotive",
        "General Industry"
    ],
    fullSpecs: [
        {
            label: "Load Capacity",
            value: "1.5 – 3.5 Ton"
        },
        {
            label: "Max Lift Height",
            value: "6,000 mm"
        },
        {
            label: "Battery Voltage",
            value: "48V / 80V"
        },
        {
            label: "Battery Capacity",
            value: "400 – 800 Ah"
        },
        {
            label: "Charging Time",
            value: "6 – 8 hrs"
        },
        {
            label: "Runtime",
            value: "7+ hours"
        },
        {
            label: "Travel Speed",
            value: "18 km/h"
        },
        {
            label: "Turning Radius",
            value: "2,050 mm"
        },
        {
            label: "Overall Width",
            value: "1,150 – 1,280 mm"
        },
        {
            label: "Fork Length",
            value: "1,070 – 1,150 mm"
        },
        {
            label: "Ground Clearance",
            value: "95 – 105 mm"
        },
        {
            label: "Service Weight",
            value: "3,400 – 5,800 kg"
        }
    ],
    fullFeatures: [
        {
            icon: "Battery",
            title: "Flexible Battery Options",
            desc: "Available in lead-acid or lithium-ion configurations to match your budget and operational needs."
        },
        {
            icon: "Shield",
            title: "Proven Safety",
            desc: "Heli's standard safety package includes overhead guard, seat switch, and parking brake interlock."
        },
        {
            icon: "Gauge",
            title: "Reliable Hydraulics",
            desc: "Time-tested hydraulic system with smooth proportional controls and low maintenance requirements."
        },
        {
            icon: "Settings",
            title: "Standard Controls",
            desc: "Intuitive dashboard with battery indicator, hour meter, and fault code display."
        },
        {
            icon: "Leaf",
            title: "Clean & Quiet",
            desc: "Full electric operation with zero emissions — suitable for indoor and food-industry applications."
        },
        {
            icon: "Wrench",
            title: "Wide Service Network",
            desc: "Backed by Heli's global parts network and local service support for minimal downtime."
        }
    ],
    fullApplications: [
        {
            icon: "Warehouse",
            name: "Warehousing",
            desc: "Standard pallet handling, racking, and storage operations in warehouses of all sizes."
        },
        {
            icon: "Factory",
            name: "Manufacturing",
            desc: "Production line feeding, WIP handling, and finished goods movement."
        },
        {
            icon: "Truck",
            name: "Logistics",
            desc: "Loading, unloading, and sorting operations in logistics hubs and courier facilities."
        },
        {
            icon: "Package",
            name: "FMCG",
            desc: "Fast-moving consumer goods handling in production and distribution facilities."
        },
        {
            icon: "Cog",
            name: "Automotive",
            desc: "Component handling, assembly-line supply, and finished vehicle logistics."
        },
        {
            icon: "Box",
            name: "General Industry",
            desc: "Versatile material handling across a wide range of industrial applications."
        }
    ],
    downloads: [
        {
            name: "Product Brochure",
            size: "PDF · 4.0 MB"
        },
        {
            name: "Technical Specifications",
            size: "PDF · 1.7 MB"
        },
        {
            name: "Maintenance Guide",
            size: "PDF · 2.0 MB"
        },
        {
            name: "Safety Data Sheet",
            size: "PDF · 880 KB"
        }
    ],
    relatedSlugs: [
        "electric-forklift",
        "electric-forklift-3t",
        "three-wheel-electric-forklift"
    ]
},
};

// ─── Product Categories (derived from productDataMap) ───────────────────────
// Groups products by their `category` field for the listing page
const categoryOrder = ["Electric Forklifts"];

const grouped = {};
for (const product of Object.values(productDataMap)) {
  if (!grouped[product.category]) grouped[product.category] = [];
  grouped[product.category].push({
    name: product.name,
    desc: product.shortDesc,
    image: product.images[0],
    badges: product.badges,
    specs: product.quickSpecs.slice(0, 3).map((s) => `${s.value} ${s.label}`),
    link: `/products/${product.slug}`,
  });
}

export const productCategories = categoryOrder.map((cat) => ({
  category: cat,
  products: grouped[cat] || [],
}));
