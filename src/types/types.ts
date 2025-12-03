export interface Agent {
  name: string;
  image: string;
  phone: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  specs: {
    beds: number;
    baths: number;
    sqft: number;
  };
  type: 'Apartment' | 'Villa' | 'Penthouse' | 'Studio';
  tags: string[];
  images: string[];
  agent: Agent;
  isNew?: boolean;
}

export interface FilterState {
  search: string;
  minPrice: number;
  maxPrice: number;
  type: string;
}