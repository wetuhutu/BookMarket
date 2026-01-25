import { mockCategories, mockHotBooks, mockBooks } from './mock'

const DELAY = 300

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
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

    return {
      code: 200,
      message: 'success',
      data: {
        ...book,
        seller: {
          id: book.sellerId,
          name: book.sellerName,
          avatar: 'https://i.pravatar.cc/150?img=' + book.sellerId,
          level: book.sellerLevel,
          isVerified: book.isVerified,
          rating: book.sellerRating,
          salesCount: Math.floor(Math.random() * 5000) + 100,
          positiveRate: 95 + Math.random() * 5,
          description: '专注计算机技术类书籍，保证正版，发货迅速，欢迎选购！'
        },
        reviews: {
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
      }
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
