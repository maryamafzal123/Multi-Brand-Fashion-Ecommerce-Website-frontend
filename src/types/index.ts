export interface User {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  product_count: number;
}

export interface ProductImage {
  id: number;
  image: string;
  is_primary: boolean;
  order: number;
}

export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  stock: number;
  extra_price: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: Category;
  price: number;
  old_price: number | null;
  discount_percent: number;
  age_range: string;
  gender: 'women' | 'girls' | 'unisex';
  is_featured: boolean;
  in_stock: boolean;
  primary_image: string | null;
  description?: string;
  stock?: number;
  images?: ProductImage[];
  variants?: ProductVariant[];
  created_at?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  variant?: ProductVariant;
  age_range: string;
  stock: number;
}

export interface Address {
  id: number;
  label: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  is_default: boolean;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: string;
  payment_method: string;
  payment_status: string;
  subtotal: number;
  delivery_charge: number;
  total: number;
  notes: string;
  items: OrderItem[];
  created_at: string;
}

export interface ApiResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
  data?: T;
}