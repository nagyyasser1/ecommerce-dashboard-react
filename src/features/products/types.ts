export interface Product {
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
