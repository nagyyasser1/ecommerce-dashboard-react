import { Product } from "./types";

export const products: Product[] = [
  {
    name: "Awesome T-Shirt",
    slug: "awesome-t-shirt",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton. Perfect for everyday wear.",
    short_description: "Look awesome in this comfy t-shirt",
    price: 19.99,
    page_title: "Awesome T-Shirt | Your Brand Name",
    meta_description:
      "A comfortable, stylish t-shirt made from high-quality cotton. Shop now!",
    visible: true,
    tags: ["t-shirt", "cotton", "casual"],
    images: ["t-shirt1.jpg", "t-shirt1-back.jpg"],
    category: 1, // Replace with the ID of your Clothing category
  },
  {
    name: "Elegant Laptop Sleeve",
    slug: "elegant-laptop-sleeve",
    description:
      "Protect your laptop in style with this sleek and elegant laptop sleeve. Made from premium materials for superior durability.",
    short_description: "Keep your laptop safe and stylish",
    price: 39.95,
    page_title: "Elegant Laptop Sleeve | Your Brand Name",
    meta_description:
      "Protect your laptop in style with this premium laptop sleeve. Shop now!",
    visible: true,
    tags: ["laptop sleeve", "laptop case", "electronics"],
    images: ["laptop-sleeve1.jpg"],
    category: 3, // Replace with the ID of your Electronics category
  },
  {
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    description:
      "Enjoy crystal-clear sound and freedom of movement with these wireless headphones. Featuring long battery life and comfortable design.",
    short_description: "Listen without limits with wireless headphones",
    price: 79.99,
    old_price: 99.99,
    page_title: "Wireless Headphones | Your Brand Name",
    meta_description:
      "Enjoy amazing sound with these wireless headphones. Shop now!",
    visible: false,
    tags: ["headphones", "wireless", "electronics"],
    images: ["headphones1.jpg", "headphones1-charging-case.jpg"],
    category: 3, // Replace with the ID of your Electronics category
  },
  {
    name: "Refined Leather Notebook",
    slug: "refined-leather-notebook",
    description:
      "Write down your thoughts and ideas in style with this luxurious leather notebook. Features premium paper and a beautiful design.",
    short_description: "Write in style with a leather notebook",
    price: 24.99,
    page_title: "Refined Leather Notebook | Your Brand Name",
    meta_description:
      "A luxurious leather notebook for all your writing needs. Shop now!",
    visible: true,
    tags: ["notebook", "leather", "office supplies"],
    images: ["notebook1.jpg", "notebook1-open.jpg"],
    category: 4, // Replace with the ID of your Office Supplies category
  },
  {
    name: "Classic Backpack",
    slug: "classic-backpack",
    description:
      "A spacious and versatile backpack for everyday use. Made from durable materials with multiple compartments for organization.",
    short_description: "Carry everything you need in style",
    price: 49.99,
    page_title: "Classic Backpack | Your Brand Name",
    meta_description:
      "A spacious and versatile backpack for everyday use. Shop now!",
    visible: true,
    tags: ["backpack", "bag", "travel"],
    images: ["backpack1.jpg", "backpack1-side.jpg"],
    category: 5, // Replace with the ID of your Travel category
  },
];
