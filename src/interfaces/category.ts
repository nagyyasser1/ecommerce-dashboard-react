export interface SubCategory {
  active: any;
  id: string;
  name: string;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  pageTitle: string;
  metaDescription: string;
  picUrl: string;
  active: boolean;
  subCategories: SubCategory[];
}
