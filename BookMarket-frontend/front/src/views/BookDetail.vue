<template>
  <div class="bg-gray-50 min-h-screen">
    <AppHeader />
    
    <main class="pt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav class="flex items-center text-sm text-gray-500 mb-8">
          <router-link to="/" class="hover:text-primary transition-colors">首页</router-link>
          <i class="fas fa-chevron-right mx-2 text-xs"></i>
          <router-link to="/books" class="hover:text-primary transition-colors">全部书籍</router-link>
          <i class="fas fa-chevron-right mx-2 text-xs"></i>
          <router-link :to="`/books?category=${book.categoryId}`" class="hover:text-primary transition-colors">{{ categoryName }}</router-link>
          <i class="fas fa-chevron-right mx-2 text-xs"></i>
          <span class="text-gray-900">{{ book.title }}</span>
        </nav>

        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <i class="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button @click="fetchBookDetail" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            重新加载
          </button>
        </div>

        <template v-else>
          <section class="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-8">
            <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <div class="relative mb-4">
                  <img :src="currentImage" :alt="book.title" class="w-full rounded-xl shadow-lg">
                </div>
                <div class="grid grid-cols-4 gap-3">
                  <img
                    v-for="(image, index) in book.images"
                    :key="index"
                    :src="image"
                    :alt="`缩略图 ${index + 1}`"
                    :class="['thumbnail w-full h-20 object-cover rounded-lg border-2 cursor-pointer', currentImage === image ? 'border-primary' : 'border-transparent']"
                    @click="currentImage = image"
                  >
                </div>
              </div>

              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{{ book.title }}</h1>
                <p v-if="book.subtitle" class="text-gray-500 mb-4">{{ book.subtitle }}</p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{{ categoryName }}</span>
                  <span :class="['px-3 py-1 text-sm rounded-full', conditionClass]">{{ conditionText }}</span>
                  <span v-if="book.sellerLevel === 'gold'" class="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">金牌卖家</span>
                </div>

                <div class="flex items-end gap-4 mb-6">
                  <div class="text-4xl font-bold text-primary">¥{{ book.price.toFixed(2) }}</div>
                  <div v-if="book.originalPrice" class="text-gray-400 line-through text-xl mb-1">¥{{ book.originalPrice.toFixed(2) }}</div>
                  <div v-if="book.originalPrice" class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-1">
                    {{ Math.round((book.price / book.originalPrice) * 10) / 10 }}折
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span class="text-gray-500">作者：</span>
                    <span class="text-gray-900 font-medium">{{ book.author }}</span>
                  </div>
                  <div v-if="book.publisher">
                    <span class="text-gray-500">出版社：</span>
                    <span class="text-gray-900 font-medium">{{ book.publisher }}</span>
                  </div>
                  <div v-if="book.publishDate">
                    <span class="text-gray-500">出版时间：</span>
                    <span class="text-gray-900 font-medium">{{ book.publishDate }}</span>
                  </div>
                  <div v-if="book.isbn">
                    <span class="text-gray-500">ISBN：</span>
                    <span class="text-gray-900 font-medium">{{ book.isbn }}</span>
                  </div>
                  <div v-if="book.pages">
                    <span class="text-gray-500">页数：</span>
                    <span class="text-gray-900 font-medium">{{ book.pages }}页</span>
                  </div>
                  <div>
                    <span class="text-gray-500">新旧程度：</span>
                    <span class="text-gray-900 font-medium">{{ conditionText }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 mb-6">
                  <span class="text-gray-500">库存：</span>
                  <span :class="book.stock > 0 ? 'text-accent' : 'text-red-500'" class="font-medium">
                    {{ book.stock > 0 ? `有货（仅${book.stock}件）` : '暂时缺货' }}
                  </span>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mb-6">
                  <button class="flex-1 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    <i class="fas fa-bolt mr-2"></i>立即购买
                  </button>
                  <button class="flex-1 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors">
                    <i class="fas fa-cart-plus mr-2"></i>加入购物车
                  </button>
                  <button class="px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-colors">
                    <i class="fas fa-heart"></i>
                  </button>
                  <button class="px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-primary hover:text-primary transition-colors">
                    <i class="fas fa-share-alt"></i>
                  </button>
                </div>

                <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span class="flex items-center"><i class="fas fa-check-circle text-accent mr-2"></i>7天无理由退换</span>
                  <span class="flex items-center"><i class="fas fa-check-circle text-accent mr-2"></i>正版保证</span>
                  <span class="flex items-center"><i class="fas fa-check-circle text-accent mr-2"></i>资金担保</span>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <i class="fas fa-store mr-2 text-primary"></i>卖家信息
            </h2>
            
            <div class="bg-gray-100 p-4 rounded-lg mb-6 text-xs font-mono">
              <div class="font-bold mb-2">DEBUG: Seller Object</div>
              <pre>{{ JSON.stringify(seller, null, 2) }}</pre>
            </div>
            
            <div class="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div class="relative">
                <img :src="seller.avatar" :alt="seller.name" class="w-20 h-20 rounded-full object-cover">
                <span v-if="seller.level === 'gold'" class="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">金牌</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold text-gray-900">{{ seller.name }}</h3>
                  <span v-if="seller.level === 'gold'" class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">金牌卖家</span>
                  <span v-if="seller.isVerified" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">已认证</span>
                </div>
                <div class="flex items-center gap-2 mb-3">
                  <div class="flex text-yellow-400">
                    <i v-for="i in 5" :key="i" :class="i <= Math.floor(seller.rating || 0) ? 'fas fa-star' : 'fas fa-star-half-alt'"></i>
                  </div>
                  <span class="text-gray-600">{{ typeof seller.rating === 'number' ? seller.rating.toFixed(1) : '0.0' }}分</span>
                </div>
                <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <span>在售：{{ seller.salesCount || 0 }}本</span>
                  <span>已售：{{ (seller.soldCount || 0).toLocaleString() }}本</span>
                  <span>好评率：{{ typeof seller.positiveRate === 'number' ? (seller.positiveRate * 100).toFixed(1) : '0.0' }}%</span>
                </div>
                <p class="text-gray-600 text-sm">{{ seller.description }}</p>
              </div>
              <div class="flex gap-3">
                <button class="px-6 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                  <i class="fas fa-comment-dots mr-2"></i>联系卖家
                </button>
                <button class="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                  <i class="fas fa-store mr-2"></i>进入店铺
                </button>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
            <div class="flex border-b border-gray-200 mb-6">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                :class="['tab-btn px-6 py-3 font-medium', activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary']"
                @click="activeTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <div v-show="activeTab === 'description'" class="tab-content">
              <div class="prose max-w-none">
                <h3 class="text-lg font-bold text-gray-900 mb-4">内容简介</h3>
                <p class="text-gray-600 mb-6 leading-relaxed">{{ book.description }}</p>
                
                <h3 v-if="book.tableOfContents && book.tableOfContents.length > 0" class="text-lg font-bold text-gray-900 mb-4">目录</h3>
                <ul v-if="book.tableOfContents && book.tableOfContents.length > 0" class="space-y-2 text-gray-600 mb-6">
                  <li v-for="(chapter, index) in book.tableOfContents" :key="index" class="flex items-center">
                    <i class="fas fa-chevron-right text-primary mr-2 text-sm"></i>{{ chapter }}
                  </li>
                </ul>

                <h3 class="text-lg font-bold text-gray-900 mb-4">书籍状况说明</h3>
                <p class="text-gray-600 leading-relaxed">{{ getConditionDescription() }}</p>
              </div>
            </div>

            <div v-show="activeTab === 'reviews'" class="tab-content">
              <div class="grid md:grid-cols-2 gap-8 mb-8">
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                  <div class="flex items-center justify-between mb-4">
                    <div class="text-5xl font-bold text-primary">{{ typeof reviewStats.rating === 'number' ? reviewStats.rating.toFixed(1) : '0.0' }}</div>
                    <div class="flex text-yellow-400 text-2xl">
                      <i v-for="i in 5" :key="i" :class="i <= Math.floor(reviewStats.rating || 0) ? 'fas fa-star' : 'fas fa-star-half-alt'"></i>
                    </div>
                  </div>
                  <div class="text-gray-600">{{ reviewStats.totalCount || 0 }}条评价</div>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600 w-12">好评</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div class="bg-accent h-full" :style="{ width: getPercentage((reviewStats.distribution[5] || 0) + (reviewStats.distribution[4] || 0), reviewStats.totalCount || 0) }"></div>
                    </div>
                    <span class="text-sm text-gray-600 w-10">{{ getPercentage((reviewStats.distribution[5] || 0) + (reviewStats.distribution[4] || 0), reviewStats.totalCount || 0) }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600 w-12">中评</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div class="bg-yellow-400 h-full" :style="{ width: getPercentage(reviewStats.distribution[3] || 0, reviewStats.totalCount || 0) }"></div>
                    </div>
                    <span class="text-sm text-gray-600 w-10">{{ getPercentage(reviewStats.distribution[3] || 0, reviewStats.totalCount || 0) }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600 w-12">差评</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div class="bg-red-400 h-full" :style="{ width: getPercentage((reviewStats.distribution[2] || 0) + (reviewStats.distribution[1] || 0), reviewStats.totalCount || 0) }"></div>
                    </div>
                    <span class="text-sm text-gray-600 w-10">{{ getPercentage((reviewStats.distribution[2] || 0) + (reviewStats.distribution[1] || 0), reviewStats.totalCount || 0) }}</span>
                  </div>
                </div>
              </div>

              <div class="space-y-6">
                <div v-for="review in reviews" :key="review.id" class="review-item bg-gray-50 rounded-xl p-6">
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <img :src="review.userAvatar" :alt="review.userName" class="w-10 h-10 rounded-full">
                      <div>
                        <div class="font-medium text-gray-900">{{ review.userName }}</div>
                        <div class="flex text-yellow-400 text-sm">
                          <i v-for="i in 5" :key="i" :class="i <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
                        </div>
                      </div>
                    </div>
                    <span class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</span>
                  </div>
                  <p class="text-gray-600">{{ review.content }}</p>
                </div>
              </div>

              <div class="mt-8 text-center">
                <button class="px-8 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors">
                  查看全部评价
                </button>
              </div>
            </div>

            <div v-show="activeTab === 'shipping'" class="tab-content">
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-truck mr-2 text-primary"></i>配送方式
                  </h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start"><i class="fas fa-check text-accent mr-3 mt-1"></i>快递配送：支持全国大部分地区，偏远地区除外</li>
                    <li class="flex items-start"><i class="fas fa-check text-accent mr-3 mt-1"></i>配送时间：下单后24小时内发货，一般3-5天送达</li>
                    <li class="flex items-start"><i class="fas fa-check text-accent mr-3 mt-1"></i>运费说明：全场包邮</li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-undo mr-2 text-primary"></i>退换货政策
                  </h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start"><i class="fas fa-check text-accent mr-3 mt-1"></i>支持7天无理由退换货</li>
                    <li class="flex items-start"><i class="fas fa-check text-accent mr-3 mt-1"></i>商品需保持原包装完好，不影响二次销售</li>
                    <li class="flex items-start"><i class="fas fa-check text-accent mr-3 mt-1"></i>退货运费由买家承担（质量问题除外）</li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-info-circle mr-2 text-primary"></i>注意事项
                  </h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start"><i class="fas fa-exclamation-circle text-yellow-500 mr-3 mt-1"></i>二手商品可能存在轻微使用痕迹，属正常现象</li>
                    <li class="flex items-start"><i class="fas fa-exclamation-circle text-yellow-500 mr-3 mt-1"></i>收到商品后请及时检查，如有问题请联系卖家</li>
                    <li class="flex items-start"><i class="fas fa-exclamation-circle text-yellow-500 mr-3 mt-1"></i>请确认收货地址准确，避免配送失败</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <i class="fas fa-book-open mr-2 text-primary"></i>相关推荐
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <router-link v-for="book in recommendedBooks" :key="book.id" :to="`/books/${book.id}`" class="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img :src="book.cover" :alt="book.title" class="w-full h-48 object-cover">
                <div class="p-4">
                  <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ book.title }}</h3>
                  <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-primary">¥{{ book.price.toFixed(2) }}</span>
                    <span v-if="book.originalPrice" class="text-sm text-gray-400 line-through">¥{{ book.originalPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </section>
        </template>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import type { Book, Seller, Review, ReviewStatistics } from '@/types'
import { getBookDetail, getBookSeller, getBookReviews, getBookReviewStatistics, getRelatedBooks } from '@/api'

const route = useRoute()

const loading = ref(true)
const error = ref<string | null>(null)
const currentImage = ref('')

const book = ref<Book>({
  id: 0,
  title: '',
  author: '',
  categoryId: '',
  condition: '',
  price: 0,
  stock: 0,
  cover: '',
  images: [],
  description: '',
  sellerId: 0,
  sellerName: '',
  sellerLevel: '',
  sellerRating: 0,
  isVerified: false,
  createdAt: ''
})

const seller = ref<Seller>({
  id: 0,
  name: '',
  avatar: '',
  level: '',
  isVerified: false,
  rating: 0,
  salesCount: 0,
  soldCount: 0,
  positiveRate: 0,
  description: ''
})

const reviews = ref<Review[]>([])

const reviewStats = ref<ReviewStatistics>({
  rating: 0,
  totalCount: 0,
  distribution: {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  }
})

const recommendedBooks = ref<Book[]>([])

const tabs = computed(() => [
  { id: 'description', label: '商品详情' },
  { id: 'reviews', label: `用户评价（${reviewStats.value.totalCount}）` },
  { id: 'shipping', label: '配送说明' }
])

const activeTab = ref('description')

const categoryName = computed(() => {
  const categories: Record<string, string> = {
    tech: '计算机技术',
    literature: '文学小说',
    history: '历史传记',
    science: '自然科学',
    art: '艺术设计',
    education: '教育考试'
  }
  return categories[book.value.categoryId] || '其他'
})

const conditionText = computed(() => book.value.condition)

const conditionClass = computed(() => {
  const condition = book.value.condition
  if (condition.includes('9') || condition.includes('九')) return 'bg-accent text-white'
  if (condition.includes('8') || condition.includes('八')) return 'bg-orange-500 text-white'
  if (condition.includes('7') || condition.includes('七')) return 'bg-yellow-500 text-white'
  return 'bg-gray-200 text-gray-700'
})

const getConditionDescription = () => {
  const condition = book.value.condition
  if (condition.includes('9') || condition.includes('九')) return '本书为9成新，封面有轻微使用痕迹，内页整洁无笔记无划痕，装订完好。'
  if (condition.includes('8') || condition.includes('八')) return '本书为8成新，封面有使用痕迹，内页基本整洁，可能有少量笔记。'
  if (condition.includes('7') || condition.includes('七')) return '本书为7成新，封面有明显使用痕迹，内页有笔记或划痕。'
  return '本书为二手书，请以实物为准。'
}

const getPercentage = (count: number, total: number) => {
  if (total === 0) return '0%'
  return `${Math.round((count / total) * 100)}%`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const fetchBookDetail = async () => {
  try {
    loading.value = true
    error.value = null
    
    const bookId = Number(route.params.id)
    if (!bookId) {
      error.value = '无效的书籍ID'
      loading.value = false
      return
    }

    console.log('Fetching book detail for ID:', bookId)

    const [bookRes, sellerRes, reviewsRes, statsRes, relatedRes] = await Promise.all([
      getBookDetail(bookId),
      getBookSeller(bookId),
      getBookReviews(bookId, { page: 1, pageSize: 3 }),
      getBookReviewStatistics(bookId),
      getRelatedBooks(bookId, 4)
    ])

    console.log('API Responses:', { bookRes, sellerRes, reviewsRes, statsRes, relatedRes })

    if (bookRes.data) {
      book.value = bookRes.data
      
      if (typeof book.value.images === 'string') {
        try {
          book.value.images = JSON.parse(book.value.images)
        } catch (e) {
          console.error('Failed to parse images string:', e)
          book.value.images = []
        }
      }
      
      if (!Array.isArray(book.value.images)) {
        book.value.images = []
      }
      
      console.log('Book data:', book.value)
      console.log('Book images type:', typeof book.value.images)
      console.log('Book images value:', book.value.images)
      console.log('Book images is array:', Array.isArray(book.value.images))
      console.log('Book cover:', book.value.cover)
      if (book.value.images && book.value.images.length > 0) {
        currentImage.value = book.value.images[0]
      } else if (book.value.cover) {
        currentImage.value = book.value.cover
      }
      console.log('Current image:', currentImage.value)
    } else {
      console.error('Book data is null or undefined')
      error.value = '书籍数据加载失败'
    }

    console.log('Seller API response:', sellerRes)
    console.log('Seller response data:', sellerRes.data)
    console.log('Seller response code:', sellerRes.code)
    console.log('Seller response message:', sellerRes.message)
    
    if (sellerRes.data) {
      console.log('Raw seller data from backend:', sellerRes.data)
      
      const rawSeller: any = sellerRes.data
      
      seller.value = {
        id: rawSeller.id || 0,
        name: rawSeller.name || rawSeller.username || '未知卖家',
        avatar: rawSeller.avatar || 'https://i.pravatar.cc/150?img=1',
        level: rawSeller.level || rawSeller.sellerLevel || 'normal',
        isVerified: rawSeller.isVerified || rawSeller.sellerIsVerified === 1 || rawSeller.sellerIsVerified === true,
        rating: rawSeller.rating || rawSeller.sellerRating || 0,
        salesCount: rawSeller.salesCount || rawSeller.sellerSalesCount || 0,
        soldCount: rawSeller.soldCount || 0,
        positiveRate: rawSeller.positiveRate || rawSeller.sellerPositiverate || 0,
        description: rawSeller.description || rawSeller.sellerDescription || ''
      }
      
      console.log('Transformed seller.value:', seller.value)
      console.log('Seller name:', seller.value.name)
      console.log('Seller avatar:', seller.value.avatar)
      console.log('Seller level:', seller.value.level)
      console.log('Seller rating:', seller.value.rating)
      console.log('Seller salesCount:', seller.value.salesCount)
      console.log('Seller soldCount:', seller.value.soldCount)
      console.log('Seller positiveRate:', seller.value.positiveRate)
      console.log('Seller description:', seller.value.description)
    } else {
      console.error('Seller data is null or undefined, using default values')
      console.log('Full seller response:', JSON.stringify(sellerRes, null, 2))
      seller.value = {
        id: 0,
        name: '未知卖家',
        avatar: 'https://i.pravatar.cc/150?img=1',
        level: 'normal',
        isVerified: false,
        rating: 0,
        salesCount: 0,
        soldCount: 0,
        positiveRate: 0,
        description: ''
      }
    }

    if (reviewsRes.data?.list && Array.isArray(reviewsRes.data.list)) {
      reviews.value = reviewsRes.data.list
      console.log('Reviews data:', reviews.value)
    } else {
      console.error('Reviews data is null or undefined, using empty array')
      reviews.value = []
    }

    if (statsRes.data) {
      reviewStats.value = statsRes.data
      console.log('Review stats:', reviewStats.value)
    } else {
      console.error('Review stats is null or undefined, using default values')
      reviewStats.value = {
        rating: 0,
        totalCount: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      }
    }

    if (relatedRes.data && Array.isArray(relatedRes.data)) {
      recommendedBooks.value = relatedRes.data
      console.log('Related books:', recommendedBooks.value)
    } else {
      console.error('Related books is null or undefined, using empty array')
      recommendedBooks.value = []
    }
  } catch (err) {
    console.error('Failed to fetch book detail:', err)
    error.value = '加载书籍详情失败，请稍后重试'
  } finally {
    loading.value = false
    console.log('Loading finished, loading.value:', loading.value)
  }
}

onMounted(() => {
  fetchBookDetail()
})
</script>

<style scoped>
.glass-effect {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.thumbnail {
  transition: all 0.2s ease;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.tab-btn {
  transition: all 0.3s ease;
}

.review-item {
  transition: all 0.3s ease;
}

.review-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
