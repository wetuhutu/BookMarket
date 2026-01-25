# 首页后端接口文档

## 📚 接口文件结构

```
src/api/
├── index.ts          # API导出索引
├── request.ts        # Axios请求封装
├── book.ts           # 书籍相关接口
├── auth.ts           # 认证相关接口
├── cart.ts           # 购物车相关接口
├── favorite.ts       # 收藏相关接口
├── mock.ts           # Mock数据
└── mockApi.ts        # Mock API服务
```

---

## 🔌 首页所需接口

### 1. 获取热门分类
```typescript
import { getCategories } from '@/api'

const response = await getCategories()
console.log(response.data)
```

**接口**: `GET /api/books/categories`

**响应**:
```typescript
{
  code: 200
  message: "success"
  data: Category[]
}
```

---

### 2. 获取热门推荐书籍
```typescript
import { getHotBooks } from '@/api'

const response = await getHotBooks(4)
console.log(response.data)
```

**接口**: `GET /api/books/hot?limit=4`

**响应**:
```typescript
{
  code: 200
  message: "success"
  data: Book[]
}
```

---

### 3. 获取书籍列表
```typescript
import { getBooks } from '@/api'

const response = await getBooks({
  page: 1,
  pageSize: 12,
  category: 'tech',
  sortBy: 'price_asc'
})
console.log(response.data)
```

**接口**: `GET /api/books?page=1&pageSize=12&category=tech&sortBy=price_asc`

**响应**:
```typescript
{
  code: 200
  message: "success"
  data: {
    list: Book[]
    total: number
    page: number
    pageSize: number
  }
}
```

---

## 🧪 使用Mock数据测试

### 方式一：直接使用Mock API

```typescript
import { mockApi } from '@/api/mockApi'

// 获取热门分类
const categories = await mockApi.getCategories()

// 获取热门书籍
const hotBooks = await mockApi.getHotBooks(4)

// 获取书籍列表
const books = await mockApi.getBooks({ page: 1, pageSize: 12 })
```

### 方式二：修改API文件使用Mock

在 `src/api/book.ts` 中临时修改：

```typescript
import { mockApi } from './mockApi'

export function getCategories(): Promise<ApiResponse<Category[]>> {
  // 使用Mock数据
  return mockApi.getCategories()
  // 或者使用真实接口
  // return request.get('/books/categories')
}
```

---

## 📋 接口数据类型

### Category（分类）
```typescript
interface Category {
  id: string          // 分类ID
  name: string        // 分类名称
  icon: string        // 分类图标
  count: number       // 书籍数量
}
```

### Book（书籍）
```typescript
interface Book {
  id: number                    // 书籍ID
  title: string                 // 书名
  author: string                // 作者
  isbn?: string                 // ISBN
  publisher?: string            // 出版社
  publishDate?: string          // 出版时间
  pages?: number                // 页数
  category: string              // 分类
  condition: string             // 新旧程度
  price: number                 // 售价
  originalPrice?: number        // 原价
  stock: number                 // 库存
  cover: string                 // 封面URL
  images: string[]              // 图片URL数组
  description: string           // 描述
  sellerId: number              // 卖家ID
  sellerName: string            // 卖家名称
  sellerLevel: string           // 卖家等级
  sellerRating: number          // 卖家评分
  isVerified: boolean           // 是否认证
  createdAt: string             // 创建时间
}
```

---

## 🔧 环境变量配置

### 开发环境 (.env.development)
```bash
VITE_APP_TITLE=书市
VITE_API_BASE_URL=http://localhost:3000/api
VITE_UPLOAD_URL=http://localhost:3000/upload
VITE_APP_ENV=development
```

### 生产环境 (.env.production)
```bash
VITE_APP_TITLE=书市
VITE_API_BASE_URL=https://api.bookmarket.com/api
VITE_UPLOAD_URL=https://api.bookmarket.com/upload
VITE_APP_ENV=production
```

---

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问首页
```
http://localhost:5173/
```

---

## 📝 测试清单

### 首页功能测试
- [ ] 导航栏显示正常
- [ ] Hero区域显示正常
- [ ] 热门分类显示（6个）
- [ ] 热门推荐显示（4本）
- [ ] 平台特色显示（4个）
- [ ] 页脚显示正常

### 接口测试
- [ ] `/api/books/categories` 返回分类数据
- [ ] `/api/books/hot` 返回热门书籍
- [ ] `/api/books` 返回书籍列表

### 交互测试
- [ ] 分类卡片点击跳转
- [ ] 书籍卡片点击查看详情
- [ ] 按钮悬停效果
- [ ] 响应式布局

---

## 🐛 常见问题

### 1. 接口请求失败
检查：
- 后端服务是否启动
- 环境变量配置是否正确
- 接口地址是否可访问

### 2. 数据不显示
检查：
- 浏览器控制台是否有错误
- API响应数据格式是否正确
- 前端代码是否有错误

### 3. 图片加载失败
检查：
- 图片URL是否正确
- 图片服务器是否可访问
- 网络连接是否正常

---

## 📖 相关文档

- [测试指南](./TESTING.md) - 详细的测试步骤
- [API接口文档](../项目指导文件/06-API接口文档.md) - 完整的API文档
- [项目需求文档](../项目指导文件/01-项目需求分析文档.md) - 需求分析

---

## 🎯 下一步

1. 连接真实后端进行集成测试
2. 完善错误处理和加载状态
3. 添加单元测试和E2E测试
4. 性能优化和代码分割
