import request, { type ApiResponse, type PageData } from './request'
import { mockApi } from './mockApi'
import type { Book, Category, Seller, Review, ReviewStatistics } from '@/types'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export interface BookListParams {
  page?: number
  pageSize?: number
  category?: string
  priceMin?: number
  priceMax?: number
  condition?: '全新' | '九成新' | '八成新' | '七成新' | '六成新及以下'
  keyword?: string
  sortBy?: 'default' | 'price_asc' | 'price_desc' | 'newest' | 'sales' | 'condition'
}

export interface BookReviewsParams {
  page?: number
  pageSize?: number
}

export function getCategories(): Promise<ApiResponse<Category[]>> {
  if (USE_MOCK) {
    return mockApi.getCategories()
  }
  return request.get('/books/categories')
}

export function getBooks(params: BookListParams): Promise<ApiResponse<PageData<Book>>> {
  if (USE_MOCK) {
    return mockApi.getBooks(params)
  }
  return request.get('/books', { params })
}

export function getBookDetail(id: number): Promise<ApiResponse<Book>> {
  if (USE_MOCK) {
    return mockApi.getBookDetail(id)
  }
  return request.get(`/books/${id}`)
}

export function getBookSeller(id: number): Promise<ApiResponse<Seller>> {
  console.log('getBookSeller called with id:', id)
  console.log('USE_MOCK:', USE_MOCK)
  console.log('Request URL:', `/books/${id}/seller`)
  if (USE_MOCK) {
    console.log('Using mock API for seller')
    return mockApi.getBookSeller(id)
  }
  console.log('Using real API for seller')
  return request.get(`/books/${id}/seller`)
}

export function getBookReviews(id: number, params?: BookReviewsParams): Promise<ApiResponse<PageData<Review>>> {
  if (USE_MOCK) {
    return mockApi.getBookReviews(id, params)
  }
  return request.get(`/books/${id}/reviews`, { params })
}

export function getBookReviewStatistics(id: number): Promise<ApiResponse<ReviewStatistics>> {
  if (USE_MOCK) {
    return mockApi.getBookReviewStatistics(id)
  }
  return request.get(`/books/${id}/reviews/statistics`)
}

export function getRelatedBooks(id: number, limit = 4): Promise<ApiResponse<Book[]>> {
  if (USE_MOCK) {
    return mockApi.getRelatedBooks(id, limit)
  }
  return request.get(`/books/${id}/related`, { params: { limit } })
}

export function searchBooks(keyword: string, page = 1, pageSize = 12): Promise<ApiResponse<PageData<Book>>> {
  if (USE_MOCK) {
    return mockApi.searchBooks(keyword, page, pageSize)
  }
  return request.get('/books/search', {
    params: { keyword, page, pageSize }
  })
}

export function getHotBooks(limit = 4): Promise<ApiResponse<Book[]>> {
  if (USE_MOCK) {
    return mockApi.getHotBooks(limit)
  }
  return request.get('/books/hot', { params: { limit } })
}
