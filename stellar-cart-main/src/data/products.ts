export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  glowColor: 'cyan' | 'purple' | 'pink' | 'gold' | 'green' | 'blue';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  glowColor: 'cyan' | 'purple' | 'pink' | 'gold' | 'green' | 'blue';
  productCount: number;
}

export const categories: Category[] = [
  { id: 'clothes', name: 'Fashion', icon: '👗', glowColor: 'pink', productCount: 2400 },
  { id: 'electronics', name: 'Electronics', icon: '🎧', glowColor: 'cyan', productCount: 1800 },
  { id: 'food', name: 'Food Items', icon: '🍱', glowColor: 'gold', productCount: 950 },
  { id: 'fruits', name: 'Fruits & Veggies', icon: '🍎', glowColor: 'green', productCount: 620 },
  { id: 'juices', name: 'Fresh Juices', icon: '🧃', glowColor: 'purple', productCount: 340 },
  { id: 'icecream', name: 'Ice Cream', icon: '🍦', glowColor: 'pink', productCount: 280 },
  { id: 'streetfood', name: 'Street Food', icon: '🌶️', glowColor: 'gold', productCount: 450 },
  { id: 'lifestyle', name: 'Lifestyle', icon: '✨', glowColor: 'blue', productCount: 1200 },
];

export const products: Product[] = [
  // Fashion
  { id: 'f1', name: 'Neon Cyberpunk Jacket', price: 4999, originalPrice: 7999, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', category: 'clothes', rating: 4.8, reviews: 342, badge: 'HOT', glowColor: 'pink' },
  { id: 'f2', name: 'Holographic Sneakers', price: 3499, originalPrice: 5499, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'clothes', rating: 4.6, reviews: 218, badge: 'NEW', glowColor: 'purple' },
  { id: 'f3', name: 'Smart LED T-Shirt', price: 1999, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', category: 'clothes', rating: 4.3, reviews: 156, glowColor: 'cyan' },
  { id: 'f4', name: 'Futuristic Sunglasses', price: 2499, originalPrice: 3999, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', category: 'clothes', rating: 4.7, reviews: 89, badge: 'TRENDING', glowColor: 'gold' },
  { id: 'f5', name: 'Cybernetic Watch', price: 9999, originalPrice: 12999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: 'clothes', rating: 4.9, reviews: 541, badge: 'EXCLUSIVE', glowColor: 'pink' },

  // Electronics
  { id: 'e1', name: 'Neural VR Headset Pro', price: 29999, originalPrice: 39999, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=400&fit=crop', category: 'electronics', rating: 4.9, reviews: 1024, badge: 'BEST SELLER', glowColor: 'cyan' },
  { id: 'e2', name: 'Quantum Earbuds X1', price: 7999, originalPrice: 11999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop', category: 'electronics', rating: 4.7, reviews: 567, badge: 'HOT', glowColor: 'purple' },
  { id: 'e3', name: 'Holo Smartwatch Ultra', price: 14999, image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop', category: 'electronics', rating: 4.5, reviews: 445, glowColor: 'blue' },
  { id: 'e4', name: 'AI Speaker Cube', price: 5999, originalPrice: 8999, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', category: 'electronics', rating: 4.4, reviews: 312, badge: '40% OFF', glowColor: 'green' },
  { id: 'e5', name: 'Neon Gamepad Controller', price: 3499, image: 'https://images.unsplash.com/photo-1592840496694-26d035b5ce3d?w=400&h=400&fit=crop', category: 'electronics', rating: 4.8, reviews: 852, badge: 'GAMER', glowColor: 'purple' },

  // Food Items
  { id: 'fd1', name: 'Organic Spice Collection', price: 899, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', category: 'food', rating: 4.6, reviews: 234, glowColor: 'gold' },
  { id: 'fd2', name: 'Premium Dry Fruits Box', price: 1499, originalPrice: 2199, image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400&h=400&fit=crop', category: 'food', rating: 4.8, reviews: 178, badge: 'PREMIUM', glowColor: 'gold' },
  { id: 'fd3', name: 'Artisan Chocolate Set', price: 699, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop', category: 'food', rating: 4.5, reviews: 321, glowColor: 'pink' },
  { id: 'fd4', name: 'Exotic Tea Collection', price: 599, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop', category: 'food', rating: 4.3, reviews: 145, glowColor: 'green' },
  { id: 'fd5', name: 'Gourmet Cheese Selection', price: 1299, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop', category: 'food', rating: 4.9, reviews: 412, badge: 'PREMIUM', glowColor: 'gold' },

  // Fresh Juices
  { id: 'j1', name: 'Cold Press Green Detox', price: 199, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=400&fit=crop', category: 'juices', rating: 4.7, reviews: 89, badge: 'FRESH', glowColor: 'green' },
  { id: 'j2', name: 'Tropical Mango Blast', price: 149, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop', category: 'juices', rating: 4.9, reviews: 234, badge: 'POPULAR', glowColor: 'gold' },
  { id: 'j3', name: 'Berry Antioxidant Mix', price: 249, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop', category: 'juices', rating: 4.6, reviews: 112, glowColor: 'purple' },
  { id: 'j4', name: 'Citrus Immunity Boost', price: 179, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop', category: 'juices', rating: 4.4, reviews: 67, glowColor: 'gold' },
  { id: 'j5', name: 'Watermelon Splash', price: 159, image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&h=400&fit=crop', category: 'juices', rating: 4.8, reviews: 254, glowColor: 'pink' },

  // Fruits & Veggies
  { id: 'fv1', name: 'Organic Fruit Basket', price: 599, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop', category: 'fruits', rating: 4.8, reviews: 445, badge: 'ORGANIC', glowColor: 'green' },
  { id: 'fv2', name: 'Farm Fresh Veggies Box', price: 399, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop', category: 'fruits', rating: 4.6, reviews: 312, glowColor: 'green' },
  { id: 'fv3', name: 'Exotic Avocado Pack', price: 499, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop', category: 'fruits', rating: 4.5, reviews: 178, glowColor: 'green' },
  { id: 'fv4', name: 'Berry Mix Premium', price: 349, image: 'https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=400&h=400&fit=crop', category: 'fruits', rating: 4.7, reviews: 201, badge: 'SEASONAL', glowColor: 'pink' },
  { id: 'fv5', name: 'Fresh Dragonfruit', price: 299, image: 'https://images.unsplash.com/photo-1526656754098-9ad5ed3a8a3a?w=400&h=400&fit=crop', category: 'fruits', rating: 4.6, reviews: 133, glowColor: 'blue' },

  // Ice Cream
  { id: 'ic1', name: 'Galaxy Swirl Sundae', price: 299, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop', category: 'icecream', rating: 4.9, reviews: 567, badge: 'FAVORITE', glowColor: 'pink' },
  { id: 'ic2', name: 'Neon Mint Chocolate', price: 249, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop', category: 'icecream', rating: 4.7, reviews: 234, glowColor: 'cyan' },
  { id: 'ic3', name: 'Mango Tango Gelato', price: 199, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=400&fit=crop', category: 'icecream', rating: 4.6, reviews: 189, glowColor: 'gold' },
  { id: 'ic4', name: 'Triple Berry Blast', price: 349, originalPrice: 449, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=400&fit=crop', category: 'icecream', rating: 4.8, reviews: 312, badge: 'NEW', glowColor: 'purple' },
  { id: 'ic5', name: 'Matcha Green Tea Cone', price: 279, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&h=400&fit=crop', category: 'icecream', rating: 4.6, reviews: 156, glowColor: 'green' },

  // Street Food
  { id: 'sf1', name: 'Spicy Gobi Manchurian', price: 149, image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=400&fit=crop', category: 'streetfood', rating: 4.8, reviews: 890, badge: 'ICONIC', glowColor: 'gold' },
  { id: 'sf2', name: 'Loaded Chaat Platter', price: 199, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', category: 'streetfood', rating: 4.9, reviews: 1200, badge: 'LEGEND', glowColor: 'gold' },
  { id: 'sf3', name: 'Paneer Tikka Roll', price: 129, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop', category: 'streetfood', rating: 4.5, reviews: 445, glowColor: 'pink' },
  { id: 'sf4', name: 'Masala Dosa Special', price: 179, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=400&fit=crop', category: 'streetfood', rating: 4.7, reviews: 678, badge: 'TOP RATED', glowColor: 'green' },
  { id: 'sf5', name: 'Mumbai Vada Pav', price: 99, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=400&fit=crop', category: 'streetfood', rating: 4.8, reviews: 1540, glowColor: 'gold' },

  // Lifestyle
  { id: 'l1', name: 'Ambient LED Light Panel', price: 2999, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop', category: 'lifestyle', rating: 4.6, reviews: 234, badge: '40% OFF', glowColor: 'blue' },
  { id: 'l2', name: 'Smart Aroma Diffuser', price: 1999, image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&h=400&fit=crop', category: 'lifestyle', rating: 4.4, reviews: 167, glowColor: 'purple' },
  { id: 'l3', name: 'Zen Garden Desktop Kit', price: 899, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop', category: 'lifestyle', rating: 4.7, reviews: 312, badge: 'TRENDING', glowColor: 'green' },
  { id: 'l4', name: 'Crystal Meditation Set', price: 1499, image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&h=400&fit=crop', category: 'lifestyle', rating: 4.5, reviews: 189, glowColor: 'cyan' },
  { id: 'l5', name: 'Galaxy Projector Lamp', price: 3499, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=400&fit=crop', category: 'lifestyle', rating: 4.9, reviews: 1243, badge: 'BEST SELLER', glowColor: 'purple' },
];
