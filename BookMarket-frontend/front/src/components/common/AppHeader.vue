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

          <!-- 登录后显示用户头像和下拉菜单 -->
          <div 
            v-if="isLoggedIn" 
            class="relative" 
            @mouseenter="showDropdown"
            @mouseleave="hideDropdownWithDelay"
            ref="dropdownRef"
          >
            <div class="flex items-center space-x-2">
              <button 
                @click="toggleDropdown" 
                class="hidden sm:block focus:outline-none"
              >
                <img 
                  :src="userAvatar" 
                  alt="用户头像" 
                  class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  @error="setDefaultAvatar"
                />
              </button>
            </div>
            
            <!-- 下拉菜单 -->
            <div 
              v-show="dropdownVisible" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200"
              @mouseenter="keepDropdownVisible"
              @mouseleave="leaveDropdown"
            >
              <router-link 
                to="/user" 
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                @click="hideDropdown"
              >
                <i class="fas fa-user mr-2"></i>个人资料
              </router-link>
              <router-link 
                to="/orders" 
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                @click="hideDropdown"
              >
                <i class="fas fa-box mr-2"></i>我的订单
              </router-link>
              <hr class="my-2" />
              <a 
                href="#" 
                @click.prevent="handleLogout"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>退出登录
              </a>
            </div>
          </div>
          
          <!-- 未登录时显示登录和注册按钮 -->
          <div v-else class="flex items-center space-x-2">
            <router-link to="/login" class="hidden sm:block px-4 py-2 text-primary font-medium hover:text-primary-dark transition-colors">登录</router-link>
            <router-link to="/register" class="px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors">注册</router-link>
          </div>

          <button class="md:hidden p-2 text-gray-600">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 用户登录状态
const isLoggedIn = ref(false)
// 用户头像
const userAvatar = ref('')

// 检查用户登录状态
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
    // 获取用户信息中的头像
    const userInfoStr = localStorage.getItem('userInfo')
    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr)
        userAvatar.value = userInfo.avatar || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPkE8L3RleHQ+PC9zdmc+'
      } catch (error) {
        console.error('解析用户信息失败:', error)
        userAvatar.value = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPkE8L3RleHQ+PC9zdmc+'
      }
    } else {
      userAvatar.value = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPkE8L3RleHQ+PC9zdmc+'
    }
  } else {
    isLoggedIn.value = false
    userAvatar.value = ''
  }
}



// 下拉菜单显示状态
const dropdownVisible = ref(false)

// 设置默认头像
const setDefaultAvatar = () => {
  userAvatar.value = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPkE8L3RleHQ+PC9zdmc+'
}

// 切换下拉菜单显示状态
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

// 跟踪鼠标是否在下拉菜单区域内
let isMouseOverDropdown = false

// 显示下拉菜单
const showDropdown = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  dropdownVisible.value = true
}

// 保持下拉菜单可见
const keepDropdownVisible = () => {
  isMouseOverDropdown = true
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  dropdownVisible.value = true
}

// 鼠标离开下拉菜单
const leaveDropdown = () => {
  isMouseOverDropdown = false
  hideDropdownWithDelay()
}

// 延迟隐藏下拉菜单
let hideTimeout: number | null = null

const hideDropdown = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  dropdownVisible.value = false
}

const hideDropdownWithDelay = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
  hideTimeout = window.setTimeout(() => {
    // 只有当鼠标不在下拉菜单上时才隐藏
    if (!isMouseOverDropdown) {
      dropdownVisible.value = false
    }
  }, 300) // 300ms延迟，让用户有时间移动到菜单上
}

import { logout } from '@/api/auth'

// 退出登录处理函数
const handleLogout = async () => {
  try {
    // 调用退出登录API
    await logout()
  } catch (error) {
    console.error('退出登录API调用失败:', error)
    // 即使API调用失败也清除本地存储，确保用户能退出
  } finally {
    // 清除本地存储的认证信息
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    
    // 更新登录状态
    isLoggedIn.value = false
    userAvatar.value = ''
    
    // 刷新页面或跳转到首页
    window.location.href = '/'
  }
}

// 初始化时检查登录状态
onMounted(() => {
  checkLoginStatus()
  
  // 监听storage变化，以便在其他标签页登录/登出时更新状态
  window.addEventListener('storage', checkLoginStatus)
  
  // 点击页面其他地方时关闭下拉菜单
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target instanceof HTMLElement && !target.closest('.relative')) {
      dropdownVisible.value = false
    }
  })
})

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('storage', checkLoginStatus)
})
</script>

<style scoped>
</style>
