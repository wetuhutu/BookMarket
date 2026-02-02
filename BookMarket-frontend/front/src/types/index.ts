export interface Book {
  id: number
  title: string
  subtitle?: string
  author: string
  isbn?: string
  publisher?: string
  publishDate?: string
  pages?: number
  categoryId: string
  condition: string
  price: number
  originalPrice?: number
  stock: number
  cover: string
  images: string[]
  description: string
  tableOfContents?: string[]
  sellerId: number
  sellerName: string
  sellerLevel: string
  sellerRating: number
  isVerified: boolean
  createdAt: string
}

export interface Seller {
  id: number
  name: string
  avatar: string
  level: string
  isVerified: boolean
  rating: number
  salesCount: number
  soldCount: number
  positiveRate: number
  description: string
}

export interface Review {
  id: number
  userId: number
  userName: string
  userAvatar: string
  rating: number
  content: string
  createdAt: string
}

export interface ReviewStatistics {
  rating: number
  totalCount: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
}

export interface Feature {
  id: string
  icon: string
  title: string
  description: string
}
