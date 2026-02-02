<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <!-- 标题区域 -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <span class="text-4xl">📚</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
        <p class="text-gray-600">请登录您的账户</p>
      </div>

      <!-- 切换标签 -->
      <div class="flex bg-gray-100 rounded-full p-1 mb-6">
        <button 
          @click="activeTab = 'password'"
          :class="['flex-1 py-2 px-4 rounded-full text-center text-sm font-medium transition-colors', activeTab === 'password' ? 'bg-white text-primary shadow-sm' : 'text-gray-600']"
        >
          密码登录
        </button>
        <button 
          @click="activeTab = 'sms'"
          :class="['flex-1 py-2 px-4 rounded-full text-center text-sm font-medium transition-colors', activeTab === 'sms' ? 'bg-white text-primary shadow-sm' : 'text-gray-600']"
        >
          短信登录
        </button>
      </div>

      <!-- 登录表单 -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- 密码登录表单 -->
        <div v-if="activeTab === 'password'">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">账号</label>
            <input
              v-model="loginForm.account"
              type="text"
              placeholder="请输入手机号/邮箱/用户名"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <!-- 短信登录表单 -->
        <div v-else-if="activeTab === 'sms'">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">手机号</label>
            <input
              v-model="smsForm.phone"
              type="tel"
              placeholder="请输入手机号"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">验证码</label>
              <input
                v-model="smsForm.code"
                type="text"
                placeholder="请输入验证码"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
            </div>
            <div class="self-end pb-1">
              <button
                type="button"
                @click="sendSmsCode"
                :disabled="countdown > 0"
                :class="['px-4 py-3 rounded-xl font-medium', countdown > 0 ? 'bg-gray-200 text-gray-500' : 'bg-primary text-white hover:bg-primary-dark']"
              >
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 提示信息 -->
        <div v-if="errorMessage" class="text-red-500 text-sm text-center py-2">
          {{ errorMessage }}
        </div>

        <!-- 登录按钮 -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          :disabled="loading"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <i class="fas fa-spinner fa-spin mr-2"></i> 登录中...
          </span>
          <span v-else>登录</span>
        </button>
      </form>

      <!-- 其他选项 -->
      <div class="mt-6 flex justify-between items-center">
        <router-link to="/forgot-password" class="text-primary text-sm hover:underline">忘记密码？</router-link>
        <router-link to="/register" class="text-primary text-sm hover:underline">立即注册</router-link>
      </div>

      <!-- 分割线 -->
      <div class="my-6 flex items-center">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-4 text-gray-500 text-sm">其他方式登录</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <!-- 社交登录 -->
      <div class="flex justify-center gap-6">
        <button 
          @click="socialLogin('wechat')"
          class="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
          title="微信登录"
        >
          <i class="fab fa-weixin text-xl"></i>
        </button>
        <button 
          @click="socialLogin('qq')"
          class="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
          title="QQ登录"
        >
          <i class="fab fa-qq text-xl"></i>
        </button>
        <button 
          @click="socialLogin('weibo')"
          class="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
          title="微博登录"
        >
          <i class="fab fa-weibo text-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login, smsLogin, sendCode, socialLogin } from '@/api/auth'
import { useStorage } from '@vueuse/core'

// 路由实例
const router = useRouter()

// 激活的标签页
const activeTab = ref<'password' | 'sms'>('password')

// 登录表单数据
const loginForm = reactive({
  account: '',
  password: ''
})

// 短信登录表单数据
const smsForm = reactive({
  phone: '',
  code: ''
})

// 加载状态
const loading = ref(false)

// 错误消息
const errorMessage = ref('')

// 验证码倒计时
const countdown = ref(0)
let countdownTimer: number | null = null

// 登录处理函数
const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    let response
    if (activeTab.value === 'password') {
      // 密码登录
      if (!loginForm.account || !loginForm.password) {
        errorMessage.value = '请输入账号和密码'
        return
      }
      
      response = await login({
        account: loginForm.account,
        password: loginForm.password,
        type: 'password'
      })
    } else {
      // 短信登录
      if (!smsForm.phone || !smsForm.code) {
        errorMessage.value = '请输入手机号和验证码'
        return
      }
      
      response = await smsLogin({
        phone: smsForm.phone,
        code: smsForm.code
      })
    }

    if (response.code === 200) {
      // 登录成功，存储token和用户信息
      const { token, user } = response.data
      
      // 存储token到localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(user))
      
      // 显示成功提示
      alert('登录成功！')
      
      // 跳转到首页或其他页面
      const redirect = router.currentRoute.value.query.redirect?.toString() || '/'
      router.push(redirect)
    } else {
      errorMessage.value = response.message || '登录失败'
    }
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error.response?.data?.message || '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 发送短信验证码
const sendSmsCode = async () => {
  if (!smsForm.phone) {
    errorMessage.value = '请输入手机号'
    return
  }

  // 简单验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(smsForm.phone)) {
    errorMessage.value = '请输入正确的手机号'
    return
  }

  try {
    const response = await sendCode({
      phone: smsForm.phone,
      type: 'login'
    })

    if (response.code === 200) {
      // 开始倒计时
      startCountdown()
      errorMessage.value = '验证码已发送'
    } else {
      errorMessage.value = response.message || '发送失败'
    }
  } catch (error: any) {
    console.error('Send code error:', error)
    errorMessage.value = error.response?.data?.message || '发送失败，请稍后重试'
  }
}

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60
  if (countdownTimer) clearInterval(countdownTimer)
  
  countdownTimer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (countdownTimer) clearInterval(countdownTimer)
      countdownTimer = null
    }
  }, 1000)
}

// 社交登录
const socialLogin = async (provider: 'wechat' | 'qq' | 'weibo') => {
  errorMessage.value = ''
  
  try {
    // 这里只是模拟社交登录流程
    // 实际应用中需要集成对应的SDK
    alert(`即将跳转到${provider === 'wechat' ? '微信' : provider === 'qq' ? 'QQ' : '微博'}登录`)
    
    // 模拟成功登录
    // 在真实环境中，这里会是真实的社交登录逻辑
  } catch (error: any) {
    console.error('Social login error:', error)
    errorMessage.value = '社交登录失败，请稍后重试'
  }
}
</script>
