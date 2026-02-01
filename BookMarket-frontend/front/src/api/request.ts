import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = 'http://localhost:8080/api'

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data
    
    console.log('=== Response Interceptor ===')
    console.log('Request URL:', response.config.url)
    console.log('Response status:', response.status)
    console.log('Original response data:', data)
    console.log('Response data type:', typeof data)
    console.log('Has data.data property:', data && data.data)
    
    if (data && data.data) {
      const responseData = data.data
      
      console.log('Response data.data:', responseData)
      console.log('Response data.data type:', typeof responseData)
      
      if (Array.isArray(responseData)) {
        console.log('Response data is array, length:', responseData.length)
        responseData.forEach((item: any) => {
          if (item.images && typeof item.images === 'string') {
            try {
              item.images = JSON.parse(item.images)
            } catch (e) {
              console.error('Failed to parse images string:', e)
              item.images = []
            }
          }
        })
      } else if (typeof responseData === 'object' && responseData.images && typeof responseData.images === 'string') {
        console.log('Response data has images property, parsing...')
        try {
          responseData.images = JSON.parse(responseData.images)
        } catch (e) {
          console.error('Failed to parse images string:', e)
          responseData.images = []
        }
      }
    }
    
    console.log('Processed response data:', data)
    console.log('=== End Response Interceptor ===')
    return data
  },
  (error) => {
    const { response } = error
    if (response) {
      switch (response.status) {
        case 401:
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          console.error('没有权限访问')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error(response.data?.message || '请求失败')
      }
    } else {
      console.error('网络错误，请检查网络连接')
    }
    return Promise.reject(error)
  }
)

export default instance

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PageData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
