import request, { type ApiResponse, type PageData } from './request'
import type { Book, Category } from '@/types'

export interface BookListParams {
  page?: number
  pageSize?: number
  category?: string
  priceMin?: number
  priceMax?: number
  condition?: string
  keyword?: string
  sortBy?: 'default' | 'price_asc' | 'price_desc' | 'newest' | 'sales' | 'condition'
}

export interface BookDetail extends Book {
  seller: {
    id: number
    name: string
    avatar: string
    level: string
    isVerified: boolean
    rating: number
    salesCount: number
    positiveRate: number
    description: string
  }
  reviews: {
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
}

export function getCategories(): Promise<ApiResponse<Category[]>> {
  return request.get('/books/categories')
}

export function getBooks(params: BookListParams): Promise<ApiResponse<PageData<Book>>> {
  return request.get('/books', { params })
}

export function getBookDetail(id: number): Promise<ApiResponse<BookDetail>> {
  return request.get(`/books/${id}`)
}

export function searchBooks(keyword: string, page = 1, pageSize = 12): Promise<ApiResponse<PageData<Book>>> {
  return request.get('/books/search', {
    params: { keyword, page, pageSize }
  })
}

export function getHotBooks(limit = 4): Promise<ApiResponse<Book[]>> {
  return request.get('/books/hot', { params: { limit } })
}
