export interface SubCategory {
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
  subCategories: SubCategory[];
}
