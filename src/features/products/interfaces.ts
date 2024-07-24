export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  old_price?: number;
  page_title: string;
  meta_description: string;
  visible: boolean;
  tags: string[];
  images: string[];
  category: Category;
  variants?: Variant[];
}

export interface Variant {
  color: string;
  size: number;
  quantity: number;
}

export interface Category {
  name: string;
  id: number;
}

export interface CreateProductData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  old_price: number;
  page_title: string;
  meta_description: string;
  category: number;
  tags?: string[];
  images?: Array<string>;
  visible: boolean;
  variants?: Array<{
    quantity: number;
    color: string;
    size: number;
  }>;
}
