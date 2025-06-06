
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  available: boolean;
}

export type ProductCategory = 'all' | 'burger' | 'sandwich' | 'drink' | 'dessert';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  pickupTime: string;
  notes?: string;
  status: OrderStatus;
  createdAt: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';

export interface CustomerInfo {
  name: string;
  phone: string;
  notes?: string;
}
