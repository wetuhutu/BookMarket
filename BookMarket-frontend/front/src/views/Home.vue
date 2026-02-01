<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="pt-16">
      <section class="gradient-bg text-white py-20 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                让闲置书籍<br>焕发新生
              </h1>
              <p class="text-xl md:text-2xl mb-8 text-white/90">
                安全、便捷、实惠的二手书交易平台
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <router-link to="/books" class="btn-primary px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                  <i class="fas fa-book-open mr-2"></i>浏览书籍
                </router-link>
                <router-link to="/seller" class="px-8 py-4 rounded-full text-lg font-semibold bg-white text-primary hover:bg-gray-100 transition-colors shadow-lg">
                  <i class="fas fa-plus-circle mr-2"></i>我要卖书
                </router-link>
              </div>
            </div>
            <div class="hidden lg:block">
              <div class="relative">
                <div class="absolute inset-0 bg-white/20 rounded-3xl transform rotate-6"></div>
                <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop" alt="二手书交易" class="relative rounded-3xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">热门分类</h2>
            <p class="text-gray-600 text-lg">探索各类二手书籍，找到你心仪的好书</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <router-link v-for="category in categories" :key="category.id" :to="`/books?category=${category.id}`" class="category-card bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center cursor-pointer">
              <div class="text-5xl mb-4">{{ category.icon }}</div>
              <h3 class="font-semibold text-gray-900 mb-1">{{ category.name }}</h3>
              <p class="text-sm text-gray-600">{{ category.count }} 本</p>
            </router-link>
          </div>
        </div>
      </section>

      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-12">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">热门推荐</h2>
              <p class="text-gray-600 text-lg">精选优质二手书籍，超值优惠</p>
            </div>
            <router-link to="/books" class="hidden md:flex items-center text-primary font-semibold hover:text-primary-dark transition-colors">
              查看更多 <i class="fas fa-arrow-right ml-2"></i>
            </router-link>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="book in hotBooks" :key="book.id" class="book-card bg-white rounded-2xl overflow-hidden shadow-md">
              <div class="relative">
                <img :src="book.cover" :alt="book.title" class="w-full h-64 object-cover" />
                <span :class="getConditionClass(book.condition)" class="absolute top-4 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full">{{ getConditionText(book.condition) }}</span>
              </div>
              <div class="p-5">
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ book.title }}</h3>
                <p class="text-sm text-gray-600 mb-3">作者：{{ book.author }}</p>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <span class="text-xl font-bold text-primary">¥{{ book.price.toFixed(2) }}</span>
                    <span v-if="book.originalPrice" class="text-sm text-gray-400 line-through ml-2">¥{{ book.originalPrice.toFixed(2) }}</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <router-link :to="`/books/${book.id}`" class="flex-1 text-center py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">查看详情</router-link>
                  <button class="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                    <i class="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 text-center md:hidden">
            <router-link to="/books" class="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors">
              查看更多 <i class="fas fa-arrow-right ml-2"></i>
            </router-link>
          </div>
        </div>
      </section>

      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">平台特色</h2>
            <p class="text-gray-600 text-lg">为什么选择书市？</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="feature in features" :key="feature.id" :class="feature.bgClass" class="feature-card rounded-2xl p-8 text-center">
              <div class="text-6xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import type { Category, Book } from '@/types'
import { getCategories, getHotBooks } from '@/api/book'

const categories = ref<Category[]>([])
const hotBooks = ref<Book[]>([])

const features = ref([
  { id: '1', icon: '🛡️', title: '安全保障', description: '实名认证、资金担保交易，让买卖更放心', bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100' },
  { id: '2', icon: '💰', title: '价格实惠', description: '二手书价格仅为新书的3-5折，省钱又环保', bgClass: 'bg-gradient-to-br from-green-50 to-green-100' },
  { id: '3', icon: '🚚', title: '物流便捷', description: '全国包邮，快速发货，7天无理由退换', bgClass: 'bg-gradient-to-br from-purple-50 to-purple-100' },
  { id: '4', icon: '⭐', title: '诚信交易', description: '完善的评价体系，真实的买家评价', bgClass: 'bg-gradient-to-br from-pink-50 to-pink-100' }
])

onMounted(async () => {
  try {
    const categoriesRes = await getCategories()
    if (categoriesRes.code === 200) {
      categories.value = categoriesRes.data
    }

    const hotBooksRes = await getHotBooks(4)
    if (hotBooksRes.code === 200) {
      hotBooks.value = hotBooksRes.data
    }
  } catch (error) {
    console.error('获取首页数据失败:', error)
  }
})

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
</script>

<style scoped>
</style>
