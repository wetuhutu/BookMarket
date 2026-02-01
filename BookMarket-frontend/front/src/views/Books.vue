<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="pt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav class="flex items-center text-sm text-gray-500 mb-8">
          <router-link to="/" class="hover:text-primary transition-colors">首页</router-link>
          <i class="fas fa-chevron-right mx-2 text-xs"></i>
          <span class="text-gray-900">全部书籍</span>
        </nav>

        <div class="flex flex-col lg:flex-row gap-8">
          <aside class="lg:w-64 flex-shrink-0">
            <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-search mr-2 text-primary"></i>关键字搜索
              </h3>
              <div class="relative mb-6">
                <input v-model="searchKeyword" @keyup.enter="handleSearch" type="text" placeholder="搜索书名、作者、ISBN..." class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>

              <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-filter mr-2 text-primary"></i>书籍分类
              </h3>
              <ul class="space-y-2 mb-6">
                <li>
                  <a href="#" @click.prevent="selectCategory('')" :class="['filter-item block px-3 py-2 rounded-lg text-gray-700', { active: !selectedCategory }]">全部</a>
                </li>
                <li v-for="category in categories" :key="category.id">
                  <a href="#" @click.prevent="selectCategory(category.id)" :class="['filter-item block px-3 py-2 rounded-lg text-gray-700', { active: selectedCategory === category.id }]">
                    {{ category.name }}
                  </a>
                </li>
              </ul>

              <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-yen-sign mr-2 text-primary"></i>价格区间
              </h3>
              <ul class="space-y-2 mb-6">
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="priceRanges" value="all" @change="handlePriceChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': priceRanges === 'all' }]">
                      <span v-if="priceRanges === 'all'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">全部</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="priceRanges" value="range1" @change="handlePriceChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': priceRanges === 'range1' }]">
                      <span v-if="priceRanges === 'range1'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">0-20元</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="priceRanges" value="range2" @change="handlePriceChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': priceRanges === 'range2' }]">
                      <span v-if="priceRanges === 'range2'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">20-50元</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="priceRanges" value="range3" @change="handlePriceChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': priceRanges === 'range3' }]">
                      <span v-if="priceRanges === 'range3'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">50-100元</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="priceRanges" value="range4" @change="handlePriceChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': priceRanges === 'range4' }]">
                      <span v-if="priceRanges === 'range4'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">100元以上</span>
                  </label>
                </li>
              </ul>

              <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-star mr-2 text-primary"></i>新旧程度
              </h3>
              <ul class="space-y-2 mb-6">
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="conditionRanges" value="all" @change="handleConditionChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': conditionRanges === 'all' }]">
                      <span v-if="conditionRanges === 'all'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">全部</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="conditionRanges" value="new" @change="handleConditionChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': conditionRanges === 'new' }]">
                      <span v-if="conditionRanges === 'new'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">全新</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="conditionRanges" value="range90" @change="handleConditionChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': conditionRanges === 'range90' }]">
                      <span v-if="conditionRanges === 'range90'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">9成新</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="conditionRanges" value="range80" @change="handleConditionChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': conditionRanges === 'range80' }]">
                      <span v-if="conditionRanges === 'range80'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">8成新</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="conditionRanges" value="range70" @change="handleConditionChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': conditionRanges === 'range70' }]">
                      <span v-if="conditionRanges === 'range70'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">7成新</span>
                  </label>
                </li>
                <li>
                  <label class="radio-wrapper flex items-center cursor-pointer">
                    <input type="radio" v-model="conditionRanges" value="range60" @change="handleConditionChange" class="hidden">
                    <span :class="['radio-custom w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center', { 'bg-primary border-primary': conditionRanges === 'range60' }]">
                      <span v-if="conditionRanges === 'range60'" class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                    <span class="text-gray-700">6成新及以下</span>
                  </label>
                </li>
              </ul>

              <button @click="resetFilters" class="w-full py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                <i class="fas fa-redo mr-2"></i>重置筛选
              </button>
            </div>
          </aside>

          <div class="flex-1">
            <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="text-gray-600">
                  共找到 <strong class="text-gray-900">{{ total }}</strong> 本二手书
                </div>
                <div class="flex items-center gap-4">
                  <select v-model="sortBy" @change="fetchBooks" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="default">默认排序</option>
                    <option value="price_asc">价格从低到高</option>
                    <option value="price_desc">价格从高到低</option>
                    <option value="newest">最新发布</option>
                    <option value="condition">成色优先</option>
                  </select>
                  <div class="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button @click="viewMode = 'grid'" :class="['px-3 py-2', viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100']">
                      <i class="fas fa-th-large"></i>
                    </button>
                    <button @click="viewMode = 'list'" :class="['px-3 py-2', viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100']">
                      <i class="fas fa-list"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="loading" class="flex justify-center items-center py-20">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>

            <div v-else-if="books.length === 0" class="text-center py-20">
              <i class="fas fa-book-open text-6xl text-gray-300 mb-4"></i>
              <p class="text-gray-500 text-lg">暂无符合条件的书籍</p>
            </div>

            <div v-else :class="['grid gap-6', viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1']">
              <div v-for="book in books" :key="book.id" class="book-card bg-white rounded-2xl overflow-hidden shadow-md">
                <div class="relative">
                  <img :src="book.cover" :alt="book.title" class="w-full h-64 object-cover" />
                  <span :class="getConditionClass(book.condition)" class="absolute top-4 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full">{{ getConditionText(book.condition) }}</span>
                  <button @click="toggleFavorite(book)" class="absolute top-4 left-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-colors" :class="isFavorite(book.id) ? 'text-red-500 hover:bg-white' : 'text-gray-400 hover:text-red-500 hover:bg-white'">
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
                <div class="p-5">
                  <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ book.title }}</h3>
                  <p class="text-sm text-gray-600 mb-3">作者：{{ book.author }}</p>
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <span class="text-xl font-bold text-primary">¥{{ book.price.toFixed(2) }}</span>
                      <span v-if="book.originalPrice" class="text-sm text-gray-400 line-through ml-2">¥{{ book.originalPrice.toFixed(2) }}</span>
                    </div>
                    <span :class="getSellerLevelClass(book.sellerLevel)" class="text-xs px-2 py-1 rounded-full">{{ book.sellerLevel }}</span>
                  </div>
                  <div class="flex gap-2">
                    <router-link :to="`/books/${book.id}`" class="flex-1 text-center py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">查看详情</router-link>
                    <button @click="addToCart(book)" class="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                      <i class="fas fa-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="totalPages > 1" class="mt-8 flex justify-center">
              <nav class="flex items-center gap-2">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" :class="['px-4 py-2 border border-gray-300 rounded-lg', currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100']">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button v-for="page in displayPages" :key="page" @click="goToPage(page)" :class="['px-4 py-2 rounded-lg', page === currentPage ? 'bg-primary text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100']">
                  {{ page }}
                </button>
                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" :class="['px-4 py-2 border border-gray-300 rounded-lg', currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100']">
                  <i class="fas fa-chevron-right"></i>
                </button>
                <span class="ml-4 text-gray-600">第 {{ currentPage }}/{{ totalPages }} 页，共 {{ total }} 条</span>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import type { Book, Category } from '@/types'
import { getCategories, getBooks } from '@/api/book'

const route = useRoute()
const router = useRouter()

const categories = ref<Category[]>([])
const books = ref<Book[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(12)
const loading = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref<'default' | 'price_asc' | 'price_desc' | 'newest' | 'sales' | 'condition'>('default')
const selectedCategory = ref('')
const searchKeyword = ref('')

const priceRanges = ref('all')

const conditionRanges = ref('all')

const favorites = ref<number[]>([])

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const displayPages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i)
      }
      pages.push(totalPages.value)
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(1)
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push(currentPage.value - 1)
      pages.push(currentPage.value)
      pages.push(currentPage.value + 1)
      pages.push(totalPages.value)
    }
  }
  
  return pages
})

onMounted(async () => {
  await fetchCategories()
  
  const category = route.query.category as string
  if (category) {
    selectedCategory.value = category
  }
  
  await fetchBooks()
})

watch(() => route.query.category, async (newCategory) => {
  if (newCategory) {
    selectedCategory.value = newCategory as string
    currentPage.value = 1
    await fetchBooks()
  }
})

async function fetchCategories() {
  try {
    const res = await getCategories()
    if (res.code === 200) {
      categories.value = res.data
    }
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

async function fetchBooks() {
  loading.value = true
  try {
    const params: any = {
      page: currentPage.value,
      pageSize: pageSize.value,
      sortBy: sortBy.value
    }
    
    if (searchKeyword.value.trim()) {
      params.keyword = searchKeyword.value.trim()
    }
    
    if (selectedCategory.value) {
      params.category = selectedCategory.value
    }
    
    const priceParams = getPriceParams()
    if (priceParams.priceMin !== undefined) {
      params.priceMin = priceParams.priceMin
    }
    if (priceParams.priceMax !== undefined) {
      params.priceMax = priceParams.priceMax
    }
    
    const conditionParams = getConditionParams()
    if (conditionParams.condition) {
      params.condition = conditionParams.condition
    }
    
    const res = await getBooks(params)
    if (res.code === 200) {
      books.value = res.data.list
      total.value = res.data.total
    }
  } catch (error) {
    console.error('获取书籍列表失败:', error)
  } finally {
    loading.value = false
  }
}

function selectCategory(categoryId: string) {
  selectedCategory.value = categoryId
  currentPage.value = 1
  fetchBooks()
}

function handlePriceChange() {
  currentPage.value = 1
  fetchBooks()
}

function handleConditionChange() {
  currentPage.value = 1
  fetchBooks()
}

function handleSearch() {
  currentPage.value = 1
  fetchBooks()
}

function getPriceParams() {
  if (priceRanges.value === 'all') {
    return {}
  }
  
  let min: number | undefined
  let max: number | undefined = undefined
  
  if (priceRanges.value === 'range1') {
    min = 0
    max = 20
  } else if (priceRanges.value === 'range2') {
    min = 20
    max = 50
  } else if (priceRanges.value === 'range3') {
    min = 50
    max = 100
  } else if (priceRanges.value === 'range4') {
    min = 100
  }
  
  return { priceMin: min, priceMax: max }
}

function getConditionParams() {
  if (conditionRanges.value === 'all') {
    return {}
  }
  
  const conditionMap: Record<string, string> = {
    'new': '全新',
    'range90': '九成新',
    'range80': '八成新',
    'range70': '七成新',
    'range60': '六成新及以下'
  }
  
  return { condition: conditionMap[conditionRanges.value] }
}

function resetFilters() {
  selectedCategory.value = ''
  searchKeyword.value = ''
  priceRanges.value = 'all'
  conditionRanges.value = 'all'
  sortBy.value = 'default'
  currentPage.value = 1
  fetchBooks()
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchBooks()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function getConditionClass(condition: string): string {
  const classes: Record<string, string> = {
    '全新': 'bg-accent',
    '九成新': 'bg-accent',
    '八成新': 'bg-secondary',
    '七成新': 'bg-orange-500',
    '六成新及以下': 'bg-red-500'
  }
  return classes[condition] || 'bg-gray-500'
}

function getConditionText(condition: string): string {
  return condition
}

function getSellerLevelClass(level: string): string {
  const classes: Record<string, string> = {
    '金牌卖家': 'bg-yellow-100 text-yellow-700',
    '银牌卖家': 'bg-blue-100 text-blue-700',
    '认证卖家': 'bg-blue-100 text-blue-700',
    '普通卖家': 'bg-gray-100 text-gray-700'
  }
  return classes[level] || 'bg-gray-100 text-gray-700'
}

function isFavorite(bookId: number): boolean {
  return favorites.value.includes(bookId)
}

function toggleFavorite(book: Book) {
  const index = favorites.value.indexOf(book.id)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(book.id)
  }
}

function addToCart(book: Book) {
  console.log('添加到购物车:', book)
}
</script>

<style scoped>
.filter-item {
  transition: all 0.2s ease;
}

.filter-item:hover {
  background: #f3f4f6;
  padding-left: 1rem;
}

.filter-item.active {
  background: #eef2ff;
  color: #6366f1;
  font-weight: 500;
}

.book-card {
  transition: all 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
</style>
