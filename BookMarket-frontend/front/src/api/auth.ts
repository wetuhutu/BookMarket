import request, { type ApiResponse } from './request'

export interface LoginParams {
  account: string
  password: string
  type?: 'password' | 'sms'
}

export interface RegisterParams {
  phone: string
  code: string
  username: string
  password: string
  email?: string
}

export interface SmsLoginParams {
  phone: string
  code: string
}

export interface SendCodeParams {
  phone: string
  type: 'register' | 'login' | 'reset'
}

export interface ResetPasswordParams {
  phone: string
  code: string
  newPassword: string
}

export interface SocialLoginParams {
  provider: 'wechat' | 'qq' | 'weibo'
  code: string
}

export interface UserInfo {
  id: number
  username: string
  phone: string
  email?: string
  avatar: string
  level: string
  points: number
  isSeller: boolean
  sellerInfo?: any
  createdAt: string
}

export function login(params: LoginParams): Promise<ApiResponse<{ token: string; user: UserInfo }>> {
  return request.post('/auth/login', params)
}

export function register(params: RegisterParams): Promise<ApiResponse<{ token: string; user: UserInfo }>> {
  return request.post('/auth/register', params)
}

export function smsLogin(params: SmsLoginParams): Promise<ApiResponse<{ token: string; user: UserInfo }>> {
  return request.post('/auth/sms-login', params)
}

export function sendCode(params: SendCodeParams): Promise<ApiResponse<null>> {
  return request.post('/auth/send-code', params)
}

export function resetPassword(params: ResetPasswordParams): Promise<ApiResponse<null>> {
  return request.post('/auth/reset-password', params)
}

export function socialLogin(params: SocialLoginParams): Promise<ApiResponse<{ token: string; user: UserInfo; isNewUser: boolean }>> {
  return request.post('/auth/social-login', params)
}

export function logout(): Promise<ApiResponse<null>> {
  return request.post('/auth/logout')
}

export function getUserInfo(): Promise<ApiResponse<UserInfo>> {
  return request.get('/user/profile')
}

export function updateUserInfo(params: Partial<UserInfo>): Promise<ApiResponse<UserInfo>> {
  return request.put('/user/profile', params)
}
