import { mockCategories, mockHotBooks, mockBooks } from './mock'
import type { Book, Seller, Review, ReviewStatistics } from '@/types'

const DELAY = 300

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const mockSellers: Record<number, Seller> = {
  1: {
    id: 1,
    name: '书香阁',
    avatar: 'https://i.pravatar.cc/150?img=1',
    level: 'gold',
    isVerified: true,
    rating: 4.9,
    salesCount: 2341,
    soldCount: 12345,
    positiveRate: 0.992,
    description: '专注计算机技术类书籍，保证正版，发货迅速，欢迎选购！'
  },
  2: {
    id: 2,
    name: '技术书店',
    avatar: 'https://i.pravatar.cc/150?img=2',
    level: 'silver',
    isVerified: true,
    rating: 4.7,
    salesCount: 1567,
    soldCount: 8765,
    positiveRate: 0.985,
    description: '专业技术书籍，品质保证，诚信经营'
  },
  3: {
    id: 3,
    name: '编程书屋',
    avatar: 'https://i.pravatar.cc/150?img=3',
    level: 'gold',
    isVerified: true,
    rating: 4.8,
    salesCount: 2100,
    soldCount: 10234,
    positiveRate: 0.988,
    description: '编程类书籍专营店，新书二手书都有'
  },
  4: {
    id: 4,
    name: '旧书回收站',
    avatar: 'https://i.pravatar.cc/150?img=4',
    level: 'normal',
    isVerified: false,
    rating: 4.5,
    salesCount: 890,
    soldCount: 4567,
    positiveRate: 0.975,
    description: '各类二手书籍回收与销售'
  }
}

const mockReviews: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      userId: 2,
      userName: '张三',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      content: '书籍成色很好，和描述一致，推荐购买！',
      createdAt: '2024-01-10T15:30:00Z'
    },
    {
      id: 2,
      userId: 3,
      userName: '李四',
      userAvatar: 'https://i.pravatar.cc/150?img=6',
      rating: 5,
      content: '发货很快，包装完好，书很新，满意！',
      createdAt: '2024-01-08T10:20:00Z'
    },
    {
      id: 3,
      userId: 4,
      userName: '王五',
      userAvatar: 'https://i.pravatar.cc/150?img=7',
      rating: 4,
      content: '整体不错，就是封面有点小瑕疵，但不影响阅读',
      createdAt: '2024-01-05T14:15:00Z'
    }
  ]
}

const mockReviewStats: Record<number, ReviewStatistics> = {
  1: {
    rating: 4.9,
    totalCount: 128,
    distribution: { 5: 121, 4: 5, 3: 1, 2: 1, 1: 0 }
  }
}

export const mockApi = {
  async getCategories() {
    await delay(DELAY)
    return {
      code: 200,
      message: 'success',
      data: mockCategories
    }
  },

  async getHotBooks(limit = 4) {
    await delay(DELAY)
    return {
      code: 200,
      message: 'success',
      data: mockHotBooks.slice(0, limit)
    }
  },

  async getBooks(params: any = {}) {
    await delay(DELAY)
    const { page = 1, pageSize = 12, category, sortBy } = params

    let filteredBooks = [...mockBooks]

    if (category) {
      filteredBooks = filteredBooks.filter(book => book.category === category)
    }

    if (sortBy === 'price_asc') {
      filteredBooks.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_desc') {
      filteredBooks.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      filteredBooks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const list = filteredBooks.slice(start, end)

    return {
      code: 200,
      message: 'success',
      data: {
        list,
        total: filteredBooks.length,
        page,
        pageSize
      }
    }
  },

  async getBookDetail(id: number) {
    await delay(DELAY)
    const book = mockBooks.find(b => b.id === id)

    if (!book) {
      return {
        code: 404,
        message: '书籍不存在',
        data: null
      }
    }

    console.log('Mock API returning book:', book)
    console.log('Book images type:', typeof book.images)
    console.log('Book images is array:', Array.isArray(book.images))

    return {
      code: 200,
      message: 'success',
      data: book
    }
  },

  async getBookSeller(bookId: number) {
    await delay(DELAY)
    const book = mockBooks.find(b => b.id === bookId)

    if (!book) {
      console.error('Book not found for ID:', bookId)
      return {
        code: 404,
        message: '书籍不存在',
        data: null
      }
    }

    console.log('Book found:', book)
    console.log('Book sellerId:', book.sellerId)
    console.log('Available seller IDs:', Object.keys(mockSellers))
    console.log('Mock sellers:', mockSellers)

    const seller = mockSellers[book.sellerId] || mockSellers[1]
    console.log('Selected seller:', seller)
    
    return {
      code: 200,
      message: 'success',
      data: seller
    }
  },

  async getBookReviews(bookId: number, params: any = {}) {
    await delay(DELAY)
    const { page = 1, pageSize = 10 } = params
    const book = mockBooks.find(b => b.id === bookId)

    if (!book) {
      return {
        code: 404,
        message: '书籍不存在',
        data: null
      }
    }

    const reviews = mockReviews[bookId] || []
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const list = reviews.slice(start, end)

    return {
      code: 200,
      message: 'success',
      data: {
        list,
        total: reviews.length,
        page,
        pageSize
      }
    }
  },

  async getBookReviewStatistics(bookId: number) {
    await delay(DELAY)
    const book = mockBooks.find(b => b.id === bookId)

    if (!book) {
      return {
        code: 404,
        message: '书籍不存在',
        data: null
      }
    }

    const stats = mockReviewStats[bookId] || {
      rating: book.sellerRating,
      totalCount: Math.floor(Math.random() * 200) + 50,
      distribution: {
        5: Math.floor(Math.random() * 100) + 50,
        4: Math.floor(Math.random() * 30) + 10,
        3: Math.floor(Math.random() * 10) + 5,
        2: Math.floor(Math.random() * 5) + 1,
        1: Math.floor(Math.random() * 3)
      }
    }

    return {
      code: 200,
      message: 'success',
      data: stats
    }
  },

  async getRelatedBooks(bookId: number, limit = 4) {
    await delay(DELAY)
    const book = mockBooks.find(b => b.id === bookId)

    if (!book) {
      return {
        code: 404,
        message: '书籍不存在',
        data: null
      }
    }

    const relatedBooks = mockBooks
      .filter(b => b.id !== bookId && b.categoryId === book.categoryId)
      .slice(0, limit)

    return {
      code: 200,
      message: 'success',
      data: relatedBooks
    }
  },

  async searchBooks(keyword: string, page = 1, pageSize = 12) {
    await delay(DELAY)
    const filteredBooks = mockBooks.filter(book =>
      book.title.toLowerCase().includes(keyword.toLowerCase()) ||
      book.author.toLowerCase().includes(keyword.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(keyword.toLowerCase())
    )

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const list = filteredBooks.slice(start, end)

    return {
      code: 200,
      message: 'success',
      data: {
        list,
        total: filteredBooks.length,
        page,
        pageSize
      }
    }
  }
}
