<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
<<<<<<< HEAD
      <!-- 标题区域 -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <span class="text-4xl">📚</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">创建账户</h1>
        <p class="text-gray-600">请填写以下信息注册新账户</p>
      </div>

      <!-- 注册表单 -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- 用户名 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">用户名</label>
          <input
            v-model="registerForm.username"
            type="text"
            placeholder="请输入用户名"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <!-- 手机号 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">手机号</label>
          <input
            v-model="registerForm.phone"
            type="tel"
            placeholder="请输入手机号"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <!-- 邮箱（可选） -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">邮箱（可选）</label>
          <input
            v-model="registerForm.email"
            type="email"
            placeholder="请输入邮箱地址"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <!-- 密码 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
          <input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <!-- 确认密码 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <!-- 验证码 -->
        <div class="flex gap-3">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">验证码</label>
            <input
              v-model="registerForm.code"
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

        <!-- 提示信息 -->
        <div v-if="errorMessage" class="text-red-500 text-sm text-center py-2">
          {{ errorMessage }}
        </div>

        <!-- 注册按钮 -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          :disabled="loading"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <i class="fas fa-spinner fa-spin mr-2"></i> 注册中...
          </span>
          <span v-else>注册</span>
        </button>
      </form>

      <!-- 其他选项 -->
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          已有账户？
          <router-link to="/login" class="text-primary hover:underline">立即登录</router-link>
        </p>
      </div>

      <!-- 分割线 -->
      <div class="my-6 flex items-center">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-4 text-gray-500 text-sm">其他方式注册</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <!-- 社交注册 -->
      <div class="flex justify-center gap-6">
        <button 
          @click="socialRegister('wechat')"
          class="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
          title="微信注册"
        >
          <i class="fab fa-weixin text-xl"></i>
        </button>
        <button 
          @click="socialRegister('qq')"
          class="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
          title="QQ注册"
        >
          <i class="fab fa-qq text-xl"></i>
        </button>
        <button 
          @click="socialRegister('weibo')"
          class="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
          title="微博注册"
        >
          <i class="fab fa-weibo text-xl"></i>
        </button>
      </div>
=======
      <h1 class="text-3xl font-bold text-gray-900 mb-6 text-center">注册</h1>
      <p class="text-gray-600">注册页面开发中...</p>
>>>>>>> 1b7f4da4194fd316326824322df97b8d129d39a2
    </div>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register, sendCode, socialLogin } from '@/api/auth'

// 路由实例
const router = useRouter()

// 注册表单数据
const registerForm = reactive({
  phone: '',
  code: '',
  username: '',
  password: '',
  email: ''
})

// 确认密码
const confirmPassword = ref('')

// 加载状态
const loading = ref(false)

// 错误消息
const errorMessage = ref('')

// 验证码倒计时
const countdown = ref(0)
let countdownTimer: number | null = null

// 注册处理函数
const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    // 验证表单数据
    if (!registerForm.username) {
      errorMessage.value = '请输入用户名'
      return
    }
    
    if (!registerForm.phone) {
      errorMessage.value = '请输入手机号'
      return
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(registerForm.phone)) {
      errorMessage.value = '请输入正确的手机号'
      return
    }

    if (!registerForm.password) {
      errorMessage.value = '请输入密码'
      return
    }

    if (registerForm.password !== confirmPassword.value) {
      errorMessage.value = '两次输入的密码不一致'
      return
    }



    // 调用注册API
    const response = await register({
      phone: registerForm.phone,
      code: registerForm.code,
      username: registerForm.username,
      password: registerForm.password,
      email: registerForm.email || undefined
    })

    if (response.code === 200) {
      // 注册成功，存储token和用户信息
      const { token, user } = response.data
      
      // 存储token到localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(user))
      
      // 显示成功提示
      alert('注册成功！')
      
      // 跳转到首页或其他页面
      router.push('/')
    } else {
      errorMessage.value = response.message || '注册失败'
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    errorMessage.value = error.response?.data?.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 发送短信验证码
const sendSmsCode = async () => {
  if (!registerForm.phone) {
    errorMessage.value = '请输入手机号'
    return
  }

  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(registerForm.phone)) {
    errorMessage.value = '请输入正确的手机号'
    return
  }

  try {
    const response = await sendCode({
      phone: registerForm.phone,
      type: 'register'
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

// 社交注册
const socialRegister = async (provider: 'wechat' | 'qq' | 'weibo') => {
  errorMessage.value = ''
  
  try {
    // 这里只是模拟社交注册流程
    // 实际应用中需要集成对应的SDK
    alert(`即将跳转到${provider === 'wechat' ? '微信' : provider === 'qq' ? 'QQ' : '微博'}注册`)
    
    // 模拟成功注册
    // 在真实环境中，这里会是真实的社交注册逻辑
  } catch (error: any) {
    console.error('Social register error:', error)
    errorMessage.value = '社交注册失败，请稍后重试'
  }
}
=======
>>>>>>> 1b7f4da4194fd316326824322df97b8d129d39a2
</script>
