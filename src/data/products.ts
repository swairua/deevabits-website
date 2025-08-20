
export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: 'panels' | 'inverters' | 'batteries' | 'accessories';
  features: string[];
  description: string;
  specifications?: Record<string, string>;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "jinko-solar-panel-540w",
    name: "Jinko Solar Panel 540W",
    price: 25000,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "panels",
    features: ["Monocrystalline", "25-year warranty", "High efficiency"],
    description: "Premium monocrystalline solar panel with industry-leading efficiency and durability.",
    specifications: {
      "Power Output": "540W",
      "Efficiency": "21.2%",
      "Voltage": "24V",
      "Warranty": "25 years"
    },
    inStock: true
  },
  {
    id: "2",
    slug: "mppt-charge-controller-60a",
    name: "MPPT Solar Charge Controller 60A",
    price: 18500,
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "accessories",
    features: ["60A capacity", "LCD display", "Multiple protections"],
    description: "Advanced MPPT charge controller with LCD display and comprehensive protection features.",
    specifications: {
      "Current Rating": "60A",
      "System Voltage": "12V/24V Auto",
      "Display": "LCD",
      "Efficiency": ">98%"
    },
    inStock: true
  },
  {
    id: "3",
    slug: "lithium-battery-200ah",
    name: "Lithium Battery 200Ah LiFePO4",
    price: 85000,
    image: "https://images.unsplash.com/photo-1609613734620-7418b6143c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "batteries",
    features: ["LiFePO4 technology", "10-year lifespan", "Fast charging"],
    description: "High-capacity lithium iron phosphate battery with extended lifespan and fast charging capability.",
    specifications: {
      "Capacity": "200Ah",
      "Voltage": "12V",
      "Cycle Life": "6000+ cycles",
      "Chemistry": "LiFePO4"
    },
    inStock: true
  },
  {
    id: "4",
    slug: "pure-sine-wave-inverter-5kw",
    name: "Pure Sine Wave Inverter 5kW",
    price: 45000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "inverters",
    features: ["Pure sine wave", "Remote monitoring", "Surge protection"],
    description: "High-power pure sine wave inverter with advanced monitoring and protection features.",
    specifications: {
      "Power Output": "5000W",
      "Wave Type": "Pure Sine Wave",
      "Input Voltage": "24V DC",
      "Output Voltage": "230V AC"
    },
    inStock: true
  },
  {
    id: "5",
    slug: "solar-panel-100w-portable",
    name: "Portable Solar Panel 100W",
    price: 12000,
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "panels",
    features: ["Foldable design", "Weather resistant", "USB output"],
    description: "Compact and portable solar panel perfect for camping and mobile applications.",
    inStock: true
  },
  {
    id: "6",
    slug: "gel-battery-100ah",
    name: "Deep Cycle Gel Battery 100Ah",
    price: 35000,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "batteries",
    features: ["Deep cycle", "Maintenance free", "Long lifespan"],
    description: "Reliable gel battery designed for deep cycle applications with maintenance-free operation.",
    inStock: true
  },
  {
    id: "7",
    slug: "solar-street-light-100w",
    name: "Solar Street Light 100W LED",
    price: 28000,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "accessories",
    features: ["All-in-one design", "Motion sensor", "Remote control"],
    description: "Complete solar street lighting solution with integrated battery and smart controls.",
    inStock: true
  },
  {
    id: "8",
    slug: "solar-water-pump-1hp",
    name: "Solar Water Pump 1HP",
    price: 95000,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "accessories",
    features: ["Submersible pump", "MPPT controller included", "Stainless steel"],
    description: "Efficient solar-powered water pump system for irrigation and water supply applications.",
    inStock: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'panels', name: 'Solar Panels' },
  { id: 'inverters', name: 'Inverters' },
  { id: 'batteries', name: 'Batteries' },
  { id: 'accessories', name: 'Accessories' }
];
