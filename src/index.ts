import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('hatchdev-4', 'postgres', '**ekOmzI11', {
  host: 'localhost',
  dialect: 'postgres'
});

app.use(express.json());


const logger = (req: Request, res: Response, next: () => void) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
}

app.use(logger);



type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  rating: number;
  reviews: number;
  images: string[];
  colors: string[];
  sizes?: number[];
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description:
      "Premium wireless headphones with noise cancellation and crystal-clear sound.",
    price: 85000,
    discountPrice: 69999,
    category: "Electronics",
    brand: "SoundPro",
    sku: "ELEC-001",
    stock: 45,
    rating: 4.8,
    reviews: 124,
    images: ["/images/headphones-1.jpg", "/images/headphones-2.jpg"],
    colors: ["Black", "White", "Blue"],
    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-10-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Classic Leather Backpack",
    slug: "classic-leather-backpack",
    description:
      "A stylish and durable leather backpack suitable for work, school, and travel.",
    price: 55000,
    discountPrice: null,
    category: "Fashion",
    brand: "UrbanStyle",
    sku: "FAS-002",
    stock: 28,
    rating: 4.5,
    reviews: 86,
    images: ["/images/backpack-1.jpg", "/images/backpack-2.jpg"],
    colors: ["Brown", "Black"],
    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-10-03T12:30:00Z",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description:
      "Track your daily activities, heart rate, sleep patterns, and fitness goals.",
    price: 120000,
    discountPrice: 99999,
    category: "Electronics",
    brand: "FitTech",
    sku: "ELEC-003",
    stock: 12,
    rating: 4.7,
    reviews: 203,
    images: ["/images/watch-1.jpg", "/images/watch-2.jpg"],
    colors: ["Black", "Silver", "Rose Gold"],
    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-10-05T09:15:00Z",
  },
  {
    id: 4,
    name: "Minimalist Ceramic Coffee Mug",
    slug: "minimalist-ceramic-coffee-mug",
    description:
      "Elegant ceramic coffee mug with a comfortable handle and modern design.",
    price: 8500,
    discountPrice: null,
    category: "Home & Kitchen",
    brand: "HomeEssentials",
    sku: "HOM-004",
    stock: 100,
    rating: 4.3,
    reviews: 52,
    images: ["/images/mug-1.jpg", "/images/mug-2.jpg"],
    colors: ["White", "Beige", "Black"],
    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-10-07T14:00:00Z",
  },
  {
    id: 5,
    name: "Men's Casual Sneakers",
    slug: "mens-casual-sneakers",
    description:
      "Comfortable everyday sneakers with a lightweight sole and breathable material.",
    price: 45000,
    discountPrice: 38000,
    category: "Footwear",
    brand: "StepUp",
    sku: "FOO-005",
    stock: 0,
    rating: 4.6,
    reviews: 167,
    images: ["/images/sneakers-1.jpg", "/images/sneakers-2.jpg"],
    colors: ["White", "Black", "Grey"],
    sizes: [40, 41, 42, 43, 44],
    isFeatured: false,
    isAvailable: false,
    createdAt: "2026-10-09T16:45:00Z",
  },
  {
    id: 6,
    name: "Portable Power Bank 20000mAh",
    slug: "portable-power-bank-20000mah",
    description:
      "High-capacity fast-charging power bank for smartphones and other devices.",
    price: 32000,
    discountPrice: 27500,
    category: "Electronics",
    brand: "PowerMax",
    sku: "ELEC-006",
    stock: 65,
    rating: 4.9,
    reviews: 312,
    images: ["/images/powerbank-1.jpg", "/images/powerbank-2.jpg"],
    colors: ["Black", "White"],
    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-10-11T11:20:00Z",
  },
  {
    id: 7,
    name: "Luxury Skincare Gift Set",
    slug: "luxury-skincare-gift-set",
    description:
      "A complete skincare collection designed to keep your skin hydrated and refreshed.",
    price: 65000,
    discountPrice: 58000,
    category: "Beauty",
    brand: "GlowNaturals",
    sku: "BEA-007",
    stock: 19,
    rating: 4.4,
    reviews: 94,
    images: ["/images/skincare-1.jpg", "/images/skincare-2.jpg"],
    colors: [],
    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-10-13T08:30:00Z",
  },
  {
    id: 8,
    name: "Adjustable Office Chair",
    slug: "adjustable-office-chair",
    description:
      "Ergonomic office chair with lumbar support, adjustable height, and breathable mesh.",
    price: 185000,
    discountPrice: 159000,
    category: "Furniture",
    brand: "ComfortSpace",
    sku: "FUR-008",
    stock: 8,
    rating: 4.7,
    reviews: 71,
    images: ["/images/chair-1.jpg", "/images/chair-2.jpg"],
    colors: ["Black", "Grey"],
    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-10-15T13:10:00Z",
  },
];

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

app.get("/users", (req: Request, res: Response) => {
  res.status(200).json({ message: "Users" });
});

app.get("/products", (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const price = Number(req.query.price);
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);
  //const priceRange = req.query.priceRange as string | undefined;

  // Start with every product, then narrow it down with each filter that was sent.
  // This way filters can be combined, e.g. /products?category=Electronics&maxPrice=50000
  let result = products;

  if (price) {
    result = result.filter((p) => p.price === price);
  }

  if (minPrice) {
    result = result.filter((p) => p.price >= minPrice);
  }

  if (maxPrice) {
    result = result.filter((p) => p.price <= maxPrice);
  }

  // if (priceRange) {
  //   const [min, max] = priceRange.split("-").map(Number);
  //   result = result.filter((p) => p.price >= min && p.price <= max);
  // }

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Only ONE response is sent per request.
  res.status(200).json({
    message: "Products retrieved successfully",
    count: result.length,
    data: result,
  });
});

app.get("/products/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const foundProduct = products.find((p) => p.id === id);

  if (!foundProduct) {
    return res.status(404).json({ message: `Product with id ${id} not found` });
  }

  res.status(200).json({
    message: `Product with id ${id} retrieved successfully`,
    data: foundProduct,
  });
});

// app.get("/price", (req: Request, res: Response) => {
//   const price = Number(req.query.price);

//   const productsByPrice = products.filter((p) => p.price >= price);

//   res.status(200).json({
//     message: `Products with price --- ${price} retrieved successfully`,
//     data: productsByPrice,
//   });
// });


app.post("/products", (req: Request, res: Response) => {
  const { name, price, category } = req.body ?? {};

  // Basic validation: these fields are required
  if (!name || typeof price !== "number" || !category) {
    return res.status(400).json({
      message: "name, price (number) and category are required",
    });
  }

  // Give the new product the next available id
  const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct: Product = {
    slug: name.toLowerCase().trim().replace(/\s+/g, "-"),
    description: "",
    discountPrice: null,
    brand: "",
    sku: "",
    stock: 0,
    rating: 0,
    reviews: 0,
    images: [],
    colors: [],
    isFeatured: false,
    isAvailable: true,
    ...req.body, // values sent by the client override the defaults above
    id: nextId, // the server always decides the id
    createdAt: new Date().toISOString(),
  };

  // push() changes the real products array, so the new product is kept
  products.push(newProduct);

  res.status(201).json({ message: "Product added successfully", data: newProduct });
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Server is running on port ${PORT}`);
});