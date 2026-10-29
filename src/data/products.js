/**
 * Lazlo.Electro demo catalog.
 * Prices are reference numbers (see i18n/format.js for the dirham display).
 */

export const CATEGORIES = [
  { id: "gaming", label: "Gaming" },
  { id: "business", label: "Business" },
  { id: "student", label: "Student" },
  { id: "pro", label: "Professional" },
];

export const BRANDS = [
  { id: "apple", label: "Apple" },
  { id: "dell", label: "Dell" },
  { id: "hp", label: "HP" },
  { id: "lenovo", label: "Lenovo" },
  { id: "asus", label: "ASUS" },
  { id: "acer", label: "Acer" },
  { id: "msi", label: "MSI" },
  { id: "microsoft", label: "Microsoft" },
];

export const products = [
  {
    id: "macbook-air-m2",
    name: "Apple MacBook Air M2",
    brand: "apple",
    category: "student",
    price: 999,
    originalPrice: 1199,
    ram: "8GB RAM",
    storage: "256GB SSD",
    screen: '13.6"',
    rating: 4.5,
    reviews: 128,
    image: "/img/macbook-air-m2.jpg",
    alt: "Apple MacBook Air M2 in silver, three-quarter rear view",
  },
  {
    id: "asus-rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14",
    brand: "asus",
    category: "gaming",
    price: 1199,
    originalPrice: 1499,
    ram: "16GB RAM",
    storage: "512GB SSD",
    screen: '14"',
    rating: 4.7,
    reviews: 96,
    image: "/img/rog-zephyrus.jpg",
    imageClass: "img--rog",
    alt: "ASUS ROG Zephyrus G14 gaming laptop with a white chassis",
  },
  {
    id: "dell-xps-13-plus",
    name: "Dell XPS 13 Plus",
    brand: "dell",
    category: "business",
    price: 1349,
    originalPrice: 1499,
    ram: "16GB RAM",
    storage: "512GB SSD",
    screen: '13.4"',
    rating: 4.4,
    reviews: 74,
    image: "/img/dell-xps.jpg",
    alt: "Dell XPS 13 Plus ultrabook with a dark abstract wallpaper",
  },
  {
    id: "hp-spectre-x360-14",
    name: "HP Spectre x360 14",
    brand: "hp",
    category: "business",
    price: 1099,
    originalPrice: 1349,
    ram: "16GB RAM",
    storage: "1TB SSD",
    screen: '14"',
    rating: 4.6,
    reviews: 88,
    image: "/img/hp-spectre.jpg",
    alt: "HP Spectre x360 14 laptop with a warm gradient wallpaper",
  },
  {
    id: "macbook-pro-14",
    name: "Apple MacBook Pro 14",
    brand: "apple",
    category: "pro",
    price: 1899,
    originalPrice: 2099,
    ram: "16GB RAM",
    storage: "1TB SSD",
    screen: '14.2"',
    rating: 4.8,
    reviews: 112,
    image: "/img/macbook-pro14.jpg",
    alt: "Apple MacBook Pro 14 lit by soft purple and pink light",
  },
  {
    id: "dell-latitude-7440",
    name: "Dell Latitude 7440",
    brand: "dell",
    category: "business",
    price: 1279,
    originalPrice: 1499,
    ram: "16GB RAM",
    storage: "512GB SSD",
    screen: '14"',
    rating: 4.3,
    reviews: 61,
    image: "/img/dell-latitude.jpg",
    alt: "Dell Latitude 7440 business laptop in graphite",
  },
  {
    id: "lenovo-ideapad-slim-5",
    name: "Lenovo IdeaPad Slim 5",
    brand: "lenovo",
    category: "student",
    price: 649,
    originalPrice: 799,
    ram: "16GB RAM",
    storage: "512GB SSD",
    screen: '15.6"',
    rating: 4.2,
    reviews: 143,
    image: "/img/lenovo-ideapad.jpg",
    alt: "Lenovo IdeaPad Slim 5 thin-and-light laptop, frontal view",
  },
  {
    id: "macbook-air-m3",
    name: "Apple MacBook Air M3",
    brand: "apple",
    category: "student",
    price: 1299,
    originalPrice: 1499,
    ram: "16GB RAM",
    storage: "512GB SSD",
    screen: '15"',
    rating: 4.9,
    reviews: 57,
    image: "/img/macbook-air-m3.jpg",
    alt: "Apple MacBook Air M3 on an outdoor desk with a mountain wallpaper",
  },
];

export function getProduct(id) {
  return products.find((product) => product.id === id);
}

export function getBrand(id) {
  return BRANDS.find((brand) => brand.id === id);
}

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id);
}

export function discountPercent(product) {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}

// Price display (Moroccan dirham) and localized spec lines live in i18n/format.js;
// re-exported here so the whole app keeps a single import path.
export { formatPrice, formatSpecs } from "../i18n/format.js";

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((product) => {
    const brand = getBrand(product.brand)?.label ?? "";
    return (
      product.name.toLowerCase().includes(q) ||
      brand.toLowerCase().includes(q) ||
      product.ram.toLowerCase().includes(q) ||
      product.storage.toLowerCase().includes(q)
    );
  });
}
