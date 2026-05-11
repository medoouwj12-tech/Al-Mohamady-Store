export const products = [
  {
    name: 'Chronograph Luxury Watch',
    price: 499.99,
    description: 'Meticulously crafted from premium stainless steel, this chronograph watch is a statement of elegance and precision. Features a scratch-resistant sapphire crystal and water resistance up to 50 meters.',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop'
    ],
    video: 'https://cdn.pixabay.com/video/2021/04/09/70570-536098254_large.mp4',
    brand: 'Rolex',
    categoryName: 'Accessories', // We will map this to ObjectId in the seeder
    stock: 15,
    ratings: 4.8,
    numReviews: 120,
    isFeatured: true,
    variants: []
  },
  {
    name: 'Leather Messenger Bag',
    price: 299.99,
    description: 'A masterpiece of Italian leather craftsmanship. Perfect for the modern professional with dedicated compartments for your laptop and daily essentials.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop'
    ],
    brand: 'Gucci',
    categoryName: 'Bags',
    stock: 8,
    ratings: 4.9,
    numReviews: 85,
    isFeatured: true,
    variants: []
  },
  {
    name: 'Silk Aviator Glasses',
    price: 159.99,
    description: 'Lightweight titanium frame mixed with premium silk detailing. Protects against 100% of UV rays while ensuring you look flawlessly stylish.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop'
    ],
    brand: 'Ray-Ban',
    categoryName: 'Eyewear',
    stock: 25,
    ratings: 4.5,
    numReviews: 45,
    isFeatured: true,
    variants: []
  },
  {
    name: 'Royal Oud Perfume',
    price: 199.99,
    description: 'An enchanting blend of rare oud wood, warm spices, and exotic florals. Long-lasting luxury fragrance that leaves a memorable trail.',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47724263f?q=80&w=600&auto=format&fit=crop'
    ],
    brand: 'Tom Ford',
    categoryName: 'Fragrance',
    stock: 40,
    ratings: 4.7,
    numReviews: 210,
    isFeatured: true,
    variants: []
  },
  {
    name: 'Gold Cufflinks',
    price: 149.99,
    description: 'Solid 18k gold plated cufflinks designed for the modern gentleman. The perfect finishing touch to any tailored suit.',
    images: [
      'https://images.unsplash.com/photo-1599643477874-c483a90327f9?q=80&w=600&auto=format&fit=crop'
    ],
    brand: 'Cartier',
    categoryName: 'Accessories',
    stock: 12,
    ratings: 4.6,
    numReviews: 32,
    isFeatured: false,
    variants: []
  },
  {
    name: 'Classic Leather Loafers',
    price: 350.00,
    description: 'Hand-stitched genuine leather loafers offering supreme comfort without compromising on style. Perfect for both formal and smart-casual occasions.',
    images: [
      'https://images.unsplash.com/photo-1614252235314-8c037803309a?q=80&w=600&auto=format&fit=crop'
    ],
    brand: 'Prada',
    categoryName: 'Footwear',
    stock: 5,
    ratings: 5.0,
    numReviews: 12,
    isFeatured: false,
    variants: []
  }
];
