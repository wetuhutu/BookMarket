import request, { type ApiResponse } from './request'

export interface FavoriteItem {
  id: number
  bookId: number
  book: {
    id: number
    title: string
    author: string
    cover: string
    condition: string
    price: number
    originalPrice?: number
    sellerName: string
    sellerLevel: string
  }
  createdAt: string
}

export function getFavorites(page = 1, pageSize = 10): Promise<ApiResponse<{ list: FavoriteItem[]; total: number }>> {
  return request.get('/favorites', { params: { page, pageSize } })
}

export function addFavorite(bookId: number): Promise<ApiResponse<FavoriteItem>> {
  return request.post('/favorites', { bookId })
}

export function removeFavorite(id: number): Promise<ApiResponse<null>> {
  return request.delete(`/favorites/${id}`)
}

export function checkFavorite(bookId: number): Promise<ApiResponse<{ isFavorite: boolean }>> {
  return request.get(`/favorites/check/${bookId}`)
}
