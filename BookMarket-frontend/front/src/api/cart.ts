import request, { type ApiResponse } from './request'

export interface CartItem {
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
    stock: number
    sellerId: number
    sellerName: string
  }
  quantity: number
  price: number
  createdAt: string
}

export function getCart(): Promise<ApiResponse<CartItem[]>> {
  return request.get('/cart')
}

export function addToCart(bookId: number, quantity = 1): Promise<ApiResponse<CartItem>> {
  return request.post('/cart', { bookId, quantity })
}

export function updateCartItem(id: number, quantity: number): Promise<ApiResponse<CartItem>> {
  return request.put(`/cart/${id}`, { quantity })
}

export function removeCartItem(id: number): Promise<ApiResponse<null>> {
  return request.delete(`/cart/${id}`)
}

export function clearCart(): Promise<ApiResponse<null>> {
  return request.delete('/cart')
}
