
export const APP_NAME = "Lumina Estates";

// Simulating a YAML file content
export const YAML_DATA_SOURCE = `
- id: "prop_001"
  title: "Skyper Pool Apartment"
  description: "Experience luxury living in the heart of the city. This stunning apartment features floor-to-ceiling windows, a private infinity pool, and smart home integration. The open-plan living area is perfect for entertaining, while the master suite offers a sanctuary of calm."
  price: 1450000
  currency: "$"
  address: "124 Cloud Avenue, Downtown"
  city: "Metropolis"
  type: "Apartment"
  specs:
    beds: 3
    baths: 2
    sqft: 1850
  tags: ["Pool", "Smart Home", "View"]
  agent:
    name: "Sarah Jenkins"
    phone: "+1 555 0123"
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1512918760532-3ad83864e3c5?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1200"
  isNew: true

- id: "prop_002"
  title: "Cedar Residence"
  description: "A harmonious blend of nature and modern architecture. This cedar-clad residence sits on a wooded lot, offering privacy and tranquility. Features include a chef's kitchen, radiant floor heating, and a spacious outdoor deck."
  price: 1250000
  currency: "$"
  address: "88 Forest Lane, Green Hills"
  city: "Oakwood"
  type: "Villa"
  specs:
    beds: 4
    baths: 3
    sqft: 2400
  tags: ["Garden", "Eco-Friendly", "Garage"]
  agent:
    name: "Michael Chen"
    phone: "+1 555 0199"
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1600596542815-2a4d9f799051?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"

- id: "prop_003"
  title: "Lakeside Loft"
  description: "Industrial chic meets lakeside calm. This converted warehouse loft boasts exposed brick walls, 20-foot ceilings, and direct access to the marina. Ideal for creative professionals looking for an inspiring space."
  price: 850000
  currency: "$"
  address: "42 Marina Way, The Docks"
  city: "Lakeside"
  type: "Studio"
  specs:
    beds: 1
    baths: 1.5
    sqft: 1100
  tags: ["Waterfront", "Loft", "Historic"]
  agent:
    name: "Jessica Alba"
    phone: "+1 555 0888"
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200"

- id: "prop_004"
  title: "Modern Glass Penthouse"
  description: "The crown jewel of the skyline. This triplex penthouse offers 360-degree views, a private elevator, and a rooftop terrace with a jacuzzi. Designed by world-renowned architects for the ultimate luxury experience."
  price: 3200000
  currency: "$"
  address: "1 Skyline Blvd, Financial District"
  city: "Metropolis"
  type: "Penthouse"
  specs:
    beds: 5
    baths: 4.5
    sqft: 4500
  tags: ["Penthouse", "Luxury", "Concierge"]
  agent:
    name: "David Sterling"
    phone: "+1 555 9999"
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1600607686459-02eb32149b5c?auto=format&fit=crop&q=80&w=1200"

- id: "prop_005"
  title: "Suburban Family Haven"
  description: "Perfect for growing families. This classic colonial home features a large backyard, a finished basement, and proximity to top-rated schools. Recently renovated kitchen and master bath."
  price: 950000
  currency: "$"
  address: "15 Maple Street"
  city: "Suburbia"
  type: "Villa"
  specs:
    beds: 4
    baths: 2.5
    sqft: 2800
  tags: ["Family", "School District", "Backyard"]
  agent:
    name: "Karen Miller"
    phone: "+1 555 4444"
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200"

- id: "prop_006"
  title: "Minimalist Desert Oasis"
  description: "A striking modern structure in the middle of the desert landscape. Features solar power, water recycling, and breathtaking sunset views."
  price: 1800000
  currency: "$"
  address: "77 Dune Road"
  city: "Palm Springs"
  type: "Villa"
  specs:
    beds: 3
    baths: 3
    sqft: 3200
  tags: ["Desert", "Modern", "Pool"]
  agent:
    name: "Alex Rivera"
    phone: "+1 555 7777"
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200"

- id: "prop_007"
  title: "Historic Brownstone"
  description: "Immaculately restored 19th-century brownstone. Original woodwork, high ceilings, and a private garden oasis in the city."
  price: 2600000
  currency: "$"
  address: "458 West End Ave"
  city: "New York"
  type: "Apartment"
  specs:
    beds: 4
    baths: 3.5
    sqft: 3800
  tags: ["Historic", "Garden", "Fireplace"]
  agent:
    name: "Sarah Jenkins"
    phone: "+1 555 0123"
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1200"

- id: "prop_008"
  title: "Beachfront Bungalow"
  description: "Step directly onto the sand from your patio. This cozy bungalow offers the ultimate beach lifestyle with modern amenities."
  price: 1100000
  currency: "$"
  address: "22 Ocean Drive"
  city: "Santa Monica"
  type: "Villa"
  specs:
    beds: 2
    baths: 2
    sqft: 1500
  tags: ["Beachfront", "Cozy", "View"]
  agent:
    name: "Jessica Alba"
    phone: "+1 555 0888"
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200"

- id: "prop_009"
  title: "Alpine Ski Chalet"
  description: "The ultimate winter getaway. This timber-frame ski chalet offers direct slope access, a massive stone fireplace, and a heated outdoor terrace for après-ski relaxation."
  price: 2150000
  currency: "$"
  address: "450 Powder Ridge"
  city: "Aspen"
  type: "Villa"
  specs:
    beds: 5
    baths: 4
    sqft: 4200
  tags: ["Ski-in/Ski-out", "Mountain View", "Fireplace"]
  agent:
    name: "David Sterling"
    phone: "+1 555 9999"
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
  images:
    - "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1200"
    - "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=1200"
  isNew: true
`;

export const NEIGHBORHOODS = [
  {
    name: "Metropolis",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
    description: "Vibrant city life with luxury high-rises."
  },
  {
    name: "Oakwood",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=800",
    description: "Peaceful suburban greenery and estates."
  },
  {
    name: "Lakeside",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&q=80&w=800",
    description: "Waterfront living and scenic views."
  },
  {
    name: "Aspen",
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800",
    description: "Winter retreats and mountain escapes."
  }
];

export const TESTIMONIALS = [
  {
    name: "Marcus Thorne",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    quote: "Lumina Estates found me an off-market gem that has appreciated 20% in just one year. Their market intelligence is unmatched."
  },
  {
    name: "Elena Rodriguez",
    role: "First-time Buyer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100",
    quote: "I was overwhelmed by the process until I met Sarah from Lumina. She guided me through every step with patience and expertise."
  },
  {
    name: "James & Arthur",
    role: "Homeowners",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    quote: "Selling our family home was emotional, but the team handled it with such grace and got us a price we never dreamed possible."
  }
];
