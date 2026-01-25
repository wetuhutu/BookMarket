export interface Book {
  id: number
  title: string
  author: string
  isbn?: string
  publisher?: string
  publishDate?: string
  pages?: number
  category: string
  condition: string
  price: number
  originalPrice?: number
  stock: number
  cover: string
  images: string[]
  description: string
  sellerId: number
  sellerName: string
  sellerLevel: string
  sellerRating: number
  isVerified: boolean
  createdAt: string
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
