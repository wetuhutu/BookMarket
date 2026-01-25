<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass-effect shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-3xl">📚</span>
            <span class="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">书市</span>
          </router-link>
        </div>

        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="nav-link text-gray-900 font-medium">首页</router-link>
          <router-link to="/books" class="nav-link text-gray-600 hover:text-gray-900 font-medium">全部书籍</router-link>
          <router-link to="/seller" class="nav-link text-gray-600 hover:text-gray-900 font-medium">卖家中心</router-link>
        </nav>

        <div class="flex items-center space-x-4">
          <div class="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <i class="fas fa-search text-gray-400 mr-2"></i>
            <input type="text" placeholder="搜索书名、作者、ISBN..." class="bg-transparent outline-none w-48 text-sm" />
          </div>

          <router-link to="/cart" class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <i class="fas fa-shopping-cart text-xl"></i>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
          </router-link>

          <router-link to="/login" class="hidden sm:block px-4 py-2 text-primary font-medium hover:text-primary-dark transition-colors">登录</router-link>
          <router-link to="/register" class="px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors">注册</router-link>

          <button class="md:hidden p-2 text-gray-600">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
