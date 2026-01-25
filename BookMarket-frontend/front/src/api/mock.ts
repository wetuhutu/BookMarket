import type { Book, Category } from '@/types'

export const mockCategories: Category[] = [
  { id: 'literature', name: '文学小说', icon: '📖', count: 2345 },
  { id: 'tech', name: '计算机技术', icon: '💻', count: 1876 },
  { id: 'education', name: '教育教材', icon: '🎓', count: 3421 },
  { id: 'art', name: '艺术设计', icon: '🎨', count: 987 },
  { id: 'business', name: '经管励志', icon: '💼', count: 1234 },
  { id: 'science', name: '自然科学', icon: '🔬', count: 765 }
]

export const mockHotBooks: Book[] = [
  {
    id: 1,
    title: 'JavaScript高级程序设计',
    author: 'Nicholas C. Zakas',
    isbn: '978-7-115-54538-1',
    publisher: '人民邮电出版社',
    publishDate: '2020-09',
    pages: 864,
    category: 'tech',
    condition: '90',
    price: 45.00,
    originalPrice: 99.00,
    stock: 1,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop'
    ],
    description: '本书为9成新，封面有轻微使用痕迹，内页整洁无笔记无划痕',
    sellerId: 1,
    sellerName: '书香阁',
    sellerLevel: '金牌卖家',
    sellerRating: 4.9,
    isVerified: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: '深入理解计算机系统',
    author: 'Randal E. Bryant',
    isbn: '978-7-111-54493-7',
    publisher: '机械工业出版社',
    publishDate: '2016-11',
    pages: 737,
    category: 'tech',
    condition: '80',
    price: 68.00,
    originalPrice: 139.00,
    stock: 2,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop'
    ],
    description: '8成新，内页有少量笔记，不影响阅读',
    sellerId: 2,
    sellerName: '技术书店',
    sellerLevel: '银牌卖家',
    sellerRating: 4.7,
    isVerified: true,
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: 3,
    title: '设计模式：可复用面向对象软件的基础',
    author: 'Erich Gamma 等',
    isbn: '978-7-111-07575-2',
    publisher: '机械工业出版社',
    publishDate: '2000-09',
    pages: 254,
    category: 'tech',
    condition: 'new',
    price: 35.00,
    originalPrice: 55.00,
    stock: 1,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop'
    ],
    description: '全新未拆封，正版保证',
    sellerId: 3,
    sellerName: '编程书屋',
    sellerLevel: '金牌卖家',
    sellerRating: 4.8,
    isVerified: true,
    createdAt: '2024-01-13T09:20:00Z'
  },
  {
    id: 4,
    title: '人月神话',
    author: 'Frederick P. Brooks Jr.',
    isbn: '978-7-302-07209-6',
    publisher: '清华大学出版社',
    publishDate: '2002-11',
    pages: 336,
    category: 'tech',
    condition: '70',
    price: 28.00,
    originalPrice: 48.00,
    stock: 3,
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop'
    ],
    description: '7成新，封面有磨损，内页完整',
    sellerId: 4,
    sellerName: '旧书回收站',
    sellerLevel: '普通卖家',
    sellerRating: 4.5,
    isVerified: false,
    createdAt: '2024-01-12T14:10:00Z'
  }
]

export const mockBooks: Book[] = [
  ...mockHotBooks,
  {
    id: 5,
    title: '代码整洁之道',
    author: 'Robert C. Martin',
    isbn: '978-7-115-21685-2',
    publisher: '人民邮电出版社',
    publishDate: '2010-01',
    pages: 388,
    category: 'tech',
    condition: '90',
    price: 32.00,
    originalPrice: 59.00,
    stock: 2,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    images: [],
    description: '9成新，内页整洁',
    sellerId: 1,
    sellerName: '书香阁',
    sellerLevel: '金牌卖家',
    sellerRating: 4.9,
    isVerified: true,
    createdAt: '2024-01-11T10:00:00Z'
  },
  {
    id: 6,
    title: '重构：改善既有代码的设计',
    author: 'Martin Fowler',
    isbn: '978-7-115-50947-4',
    publisher: '人民邮电出版社',
    publishDate: '2019-03',
    pages: 445,
    category: 'tech',
    condition: '80',
    price: 55.00,
    originalPrice: 89.00,
    stock: 1,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    images: [],
    description: '8成新，有少量笔记',
    sellerId: 2,
    sellerName: '技术书店',
    sellerLevel: '银牌卖家',
    sellerRating: 4.7,
    isVerified: true,
    createdAt: '2024-01-10T15:30:00Z'
  }
]
