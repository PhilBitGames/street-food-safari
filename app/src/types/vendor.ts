export interface Location {
  lat: number;
  lng: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  spicy: boolean;
  vegan: boolean;
}

export interface Vendor {
  city: string;
  cuisine: string;
  description: string;
  id: string;
  isFavorite: boolean;
  isFeatured: boolean;
  location: Location;
  menu: MenuItem[];
  name: string;
  priceLevel: string;
  rating: number;
  thumbnail: string;
}