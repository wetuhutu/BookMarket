# 书市项目API接口文档

## 1. 接口概述

### 1.1 基础信息
- **接口协议**：HTTPS
- **数据格式**：JSON
- **字符编码**：UTF-8
- **请求头**：
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`（需要认证的接口）

### 1.2 基础URL
- **开发环境**：`http://localhost:3000/api`
- **生产环境**：`https://api.bookmarket.com/api`

### 1.3 通用响应格式

#### 成功响应
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

#### 错误响应
```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```

### 1.4 错误码说明

| 错误码 | 说明 |
|-------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权，需要登录 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
| 1001 | 用户名或密码错误 |
| 1002 | 用户已存在 |
| 1003 | 验证码错误 |
| 1004 | 验证码已过期 |
| 2001 | 书籍不存在 |
| 2002 | 库存不足 |
| 3001 | 订单不存在 |
| 3002 | 订单状态错误 |
| 4001 | 购物车商品不存在 |
| 5001 | 文件上传失败 |

---

## 2. 用户认证接口

### 2.1 用户注册

**接口名称**：用户注册

**请求方法**：POST

**URL路径**：`/auth/register`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| phone | String | 是 | 手机号 |
| code | String | 是 | 验证码 |
| username | String | 是 | 用户名（4-20个字符） |
| password | String | 是 | 密码（6-20个字符） |
| email | String | 否 | 邮箱 |

**请求示例**：
```json
{
  "phone": "13800138000",
  "code": "123456",
  "username": "张三",
  "password": "123456",
  "email": "zhangsan@example.com"
}
```

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| token | String | 访问令牌 |
| user | Object | 用户信息 |

**响应示例**：
```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "张三",
      "phone": "13800138000",
      "email": "zhangsan@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "level": "普通会员",
      "points": 0,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}
```

---

### 2.2 用户登录

**接口名称**：用户登录

**请求方法**：POST

**URL路径**：`/auth/login`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| account | String | 是 | 账号（手机号/邮箱/用户名） |
| password | String | 是 | 密码 |
| type | String | 否 | 登录类型（password/sms），默认password |

**请求示例**：
```json
{
  "account": "13800138000",
  "password": "123456",
  "type": "password"
}
```

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| token | String | 访问令牌 |
| user | Object | 用户信息 |

**响应示例**：
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "张三",
      "phone": "13800138000",
      "email": "zhangsan@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "level": "普通会员",
      "points": 2580,
      "isSeller": false,
      "sellerInfo": null
    }
  }
}
```

---

### 2.3 手机验证码登录

**接口名称**：手机验证码登录

**请求方法**：POST

**URL路径**：`/auth/sms-login`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| phone | String | 是 | 手机号 |
| code | String | 是 | 验证码 |

**请求示例**：
```json
{
  "phone": "13800138000",
  "code": "123456"
}
```

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| token | String | 访问令牌 |
| user | Object | 用户信息 |

**响应示例**：
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "张三",
      "phone": "13800138000",
      "avatar": "https://example.com/avatar.jpg",
      "level": "普通会员",
      "points": 2580
    }
  }
}
```

---

### 2.4 发送验证码

**接口名称**：发送验证码

**请求方法**：POST

**URL路径**：`/auth/send-code`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| phone | String | 是 | 手机号 |
| type | String | 是 | 类型（register/login/reset） |

**请求示例**：
```json
{
  "phone": "13800138000",
  "type": "register"
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "验证码已发送",
  "data": null
}
```

---

### 2.5 忘记密码

**接口名称**：重置密码

**请求方法**：POST

**URL路径**：`/auth/reset-password`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| phone | String | 是 | 手机号 |
| code | String | 是 | 验证码 |
| newPassword | String | 是 | 新密码（6-20个字符） |

**请求示例**：
```json
{
  "phone": "13800138000",
  "code": "123456",
  "newPassword": "123456"
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "密码重置成功",
  "data": null
}
```

---

### 2.6 用户登出

**接口名称**：用户登出

**请求方法**：POST

**URL路径**：`/auth/logout`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "登出成功",
  "data": null
}
```

---

### 2.7 第三方登录

**接口名称**：第三方登录

**请求方法**：POST

**URL路径**：`/auth/social-login`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| provider | String | 是 | 第三方平台（wechat/qq/weibo） |
| code | String | 是 | 授权码 |

**请求示例**：
```json
{
  "provider": "wechat",
  "code": "auth_code_123"
}
```

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| token | String | 访问令牌 |
| user | Object | 用户信息 |
| isNewUser | Boolean | 是否新用户 |

**响应示例**：
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "张三",
      "avatar": "https://example.com/avatar.jpg",
      "level": "普通会员",
      "points": 0
    },
    "isNewUser": false
  }
}
```

---

## 3. 用户接口

### 3.1 获取用户信息

**接口名称**：获取当前用户信息

**请求方法**：GET

**URL路径**：`/user/profile`

**请求头**：
- `Authorization: Bearer {token}`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | Number | 用户ID |
| username | String | 用户名 |
| phone | String | 手机号 |
| email | String | 邮箱 |
| avatar | String | 头像URL |
| level | String | 会员等级 |
| points | Number | 积分 |
| isSeller | Boolean | 是否卖家 |
| sellerInfo | Object | 卖家信息 |
| createdAt | String | 创建时间 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "张三",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "level": "普通会员",
    "points": 2580,
    "isSeller": false,
    "sellerInfo": null,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

### 3.2 更新用户信息

**接口名称**：更新用户信息

**请求方法**：PUT

**URL路径**：`/user/profile`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| username | String | 否 | 用户名 |
| email | String | 否 | 邮箱 |
| avatar | String | 否 | 头像URL |

**请求示例**：
```json
{
  "username": "李四",
  "email": "lisi@example.com"
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 1,
    "username": "李四",
    "email": "lisi@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

---

### 3.3 上传头像

**接口名称**：上传用户头像

**请求方法**：POST

**URL路径**：`/user/avatar`

**请求头**：
- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| file | File | 是 | 头像文件 |

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| url | String | 头像URL |

**响应示例**：
```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "url": "https://example.com/avatar/123.jpg"
  }
}
```

---

### 3.4 获取收货地址列表

**接口名称**：获取用户收货地址

**请求方法**：GET

**URL路径**：`/user/addresses`

**请求头**：
- `Authorization: Bearer {token}`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | Number | 地址ID |
| receiverName | String | 收货人姓名 |
| receiverPhone | String | 收货人电话 |
| province | String | 省份 |
| city | String | 城市 |
| district | String | 区县 |
| detailAddress | String | 详细地址 |
| isDefault | Boolean | 是否默认地址 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "receiverName": "张三",
      "receiverPhone": "13800138000",
      "province": "北京市",
      "city": "北京市",
      "district": "朝阳区",
      "detailAddress": "某某小区1号楼101",
      "isDefault": true
    }
  ]
}
```

---

### 3.5 添加收货地址

**接口名称**：添加收货地址

**请求方法**：POST

**URL路径**：`/user/addresses`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| receiverName | String | 是 | 收货人姓名 |
| receiverPhone | String | 是 | 收货人电话 |
| province | String | 是 | 省份 |
| city | String | 是 | 城市 |
| district | String | 是 | 区县 |
| detailAddress | String | 是 | 详细地址 |
| isDefault | Boolean | 否 | 是否默认地址 |

**请求示例**：
```json
{
  "receiverName": "张三",
  "receiverPhone": "13800138000",
  "province": "北京市",
  "city": "北京市",
  "district": "朝阳区",
  "detailAddress": "某某小区1号楼101",
  "isDefault": true
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "添加成功",
  "data": {
    "id": 2,
    "receiverName": "张三",
    "receiverPhone": "13800138000",
    "province": "北京市",
    "city": "北京市",
    "district": "朝阳区",
    "detailAddress": "某某小区1号楼101",
    "isDefault": true
  }
}
```

---

### 3.6 更新收货地址

**接口名称**：更新收货地址

**请求方法**：PUT

**URL路径**：`/user/addresses/:id`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| receiverName | String | 否 | 收货人姓名 |
| receiverPhone | String | 否 | 收货人电话 |
| province | String | 否 | 省份 |
| city | String | 否 | 城市 |
| district | String | 否 | 区县 |
| detailAddress | String | 否 | 详细地址 |
| isDefault | Boolean | 否 | 是否默认地址 |

**请求示例**：
```json
{
  "receiverName": "李四",
  "detailAddress": "某某小区2号楼202"
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 2,
    "receiverName": "李四",
    "detailAddress": "某某小区2号楼202"
  }
}
```

---

### 3.7 删除收货地址

**接口名称**：删除收货地址

**请求方法**：DELETE

**URL路径**：`/user/addresses/:id`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

### 3.8 获取用户统计

**接口名称**：获取用户统计数据

**请求方法**：GET

**URL路径**：`/user/stats`

**请求头**：
- `Authorization: Bearer {token}`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| pendingPayment | Number | 待付款订单数 |
| pendingShipment | Number | 待发货订单数 |
| pendingReceipt | Number | 待收货订单数 |
| pendingReview | Number | 待评价订单数 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "pendingPayment": 12,
    "pendingShipment": 5,
    "pendingReceipt": 3,
    "pendingReview": 8
  }
}
```

---

## 4. 书籍接口

### 4.1 获取书籍列表

**接口名称**：获取书籍列表

**请求方法**：GET

**URL路径**：`/books`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认12 |
| category | String | 否 | 分类筛选 |
| priceMin | Number | 否 | 最低价格 |
| priceMax | Number | 否 | 最高价格 |
| condition | String | 否 | 新旧程度（new/90/80/70/60） |
| keyword | String | 否 | 搜索关键词 |
| sortBy | String | 否 | 排序方式（default/price_asc/price_desc/newest/sales/condition） |

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| list | Array | 书籍列表 |
| total | Number | 总数量 |
| page | Number | 当前页码 |
| pageSize | Number | 每页数量 |

**书籍数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | Number | 书籍ID |
| title | String | 书名 |
| author | String | 作者 |
| isbn | String | ISBN |
| publisher | String | 出版社 |
| publishDate | String | 出版时间 |
| category | String | 分类 |
| condition | String | 新旧程度 |
| price | Number | 售价 |
| originalPrice | Number | 原价 |
| stock | Number | 库存 |
| cover | String | 封面URL |
| images | Array | 图片URL数组 |
| description | String | 描述 |
| sellerId | Number | 卖家ID |
| sellerName | String | 卖家名称 |
| sellerLevel | String | 卖家等级 |
| sellerRating | Number | 卖家评分 |
| isVerified | Boolean | 是否认证卖家 |
| createdAt | String | 发布时间 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "title": "JavaScript高级程序设计（第4版）",
        "author": "Nicholas C. Zakas",
        "isbn": "978-7-115-54538-1",
        "publisher": "人民邮电出版社",
        "publishDate": "2020-09",
        "category": "tech",
        "condition": "90",
        "price": 45.00,
        "originalPrice": 99.00,
        "stock": 1,
        "cover": "https://example.com/book1.jpg",
        "images": [
          "https://example.com/book1.jpg",
          "https://example.com/book1-1.jpg"
        ],
        "description": "本书为9成新，封面有轻微使用痕迹...",
        "sellerId": 1,
        "sellerName": "书香阁",
        "sellerLevel": "金牌卖家",
        "sellerRating": 4.9,
        "isVerified": true,
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "total": 2456,
    "page": 1,
    "pageSize": 12
  }
}
```

---

### 4.2 获取书籍详情

**接口名称**：获取书籍详情

**请求方法**：GET

**URL路径**：`/books/:id`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | Number | 书籍ID |
| title | String | 书名 |
| author | String | 作者 |
| isbn | String | ISBN |
| publisher | String | 出版社 |
| publishDate | String | 出版时间 |
| pages | Number | 页数 |
| category | String | 分类 |
| condition | String | 新旧程度 |
| price | Number | 售价 |
| originalPrice | Number | 原价 |
| stock | Number | 库存 |
| cover | String | 封面URL |
| images | Array | 图片URL数组 |
| description | String | 描述 |
| seller | Object | 卖家信息 |
| reviews | Object | 评价信息 |
| createdAt | String | 发布时间 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "title": "JavaScript高级程序设计（第4版）",
    "author": "Nicholas C. Zakas",
    "isbn": "978-7-115-54538-1",
    "publisher": "人民邮电出版社",
    "publishDate": "2020-09",
    "pages": 864,
    "category": "tech",
    "condition": "90",
    "price": 45.00,
    "originalPrice": 99.00,
    "stock": 1,
    "cover": "https://example.com/book1.jpg",
    "images": [
      "https://example.com/book1.jpg",
      "https://example.com/book1-1.jpg",
      "https://example.com/book1-2.jpg",
      "https://example.com/book1-3.jpg"
    ],
    "description": "本书为9成新，封面有轻微使用痕迹，内页整洁无笔记无划痕...",
    "seller": {
      "id": 1,
      "name": "书香阁",
      "avatar": "https://example.com/seller1.jpg",
      "level": "金牌卖家",
      "isVerified": true,
      "rating": 4.9,
      "salesCount": 2341,
      "positiveRate": 99.2,
      "description": "专注计算机技术类书籍，保证正版，发货迅速，欢迎选购！"
    },
    "reviews": {
      "rating": 4.9,
      "totalCount": 128,
      "distribution": {
        "5": 121,
        "4": 5,
        "3": 1,
        "2": 1,
        "1": 0
      }
    },
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

### 4.3 获取分类列表

**接口名称**：获取书籍分类

**请求方法**：GET

**URL路径**：`/books/categories`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | String | 分类ID |
| name | String | 分类名称 |
| icon | String | 图标 |
| count | Number | 书籍数量 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "literature",
      "name": "文学小说",
      "icon": "📖",
      "count": 2345
    },
    {
      "id": "tech",
      "name": "计算机技术",
      "icon": "💻",
      "count": 1876
    },
    {
      "id": "education",
      "name": "教育教材",
      "icon": "🎓",
      "count": 3421
    }
  ]
}
```

---

### 4.4 搜索书籍

**接口名称**：搜索书籍

**请求方法**：GET

**URL路径**：`/books/search`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| keyword | String | 是 | 搜索关键词 |
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认12 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [],
    "total": 0,
    "page": 1,
    "pageSize": 12
  }
}
```

---

## 5. 购物车接口

### 5.1 获取购物车

**接口名称**：获取购物车列表

**请求方法**：GET

**URL路径**：`/cart`

**请求头**：
- `Authorization: Bearer {token}`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | Number | 购物车项ID |
| bookId | Number | 书籍ID |
| book | Object | 书籍信息 |
| quantity | Number | 数量 |
| price | Number | 价格 |
| createdAt | String | 添加时间 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "bookId": 1,
      "book": {
        "id": 1,
        "title": "JavaScript高级程序设计（第4版）",
        "author": "Nicholas C. Zakas",
        "cover": "https://example.com/book1.jpg",
        "condition": "90",
        "price": 45.00,
        "originalPrice": 99.00,
        "stock": 1,
        "sellerId": 1,
        "sellerName": "书香阁"
      },
      "quantity": 1,
      "price": 45.00,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### 5.2 添加到购物车

**接口名称**：添加商品到购物车

**请求方法**：POST

**URL路径**：`/cart`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| bookId | Number | 是 | 书籍ID |
| quantity | Number | 是 | 数量 |

**请求示例**：
```json
{
  "bookId": 1,
  "quantity": 1
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "添加成功",
  "data": {
    "id": 1,
    "bookId": 1,
    "quantity": 1
  }
}
```

---

### 5.3 更新购物车

**接口名称**：更新购物车商品数量

**请求方法**：PUT

**URL路径**：`/cart/:id`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| quantity | Number | 是 | 数量 |

**请求示例**：
```json
{
  "quantity": 2
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 1,
    "quantity": 2
  }
}
```

---

### 5.4 删除购物车商品

**接口名称**：从购物车删除商品

**请求方法**：DELETE

**URL路径**：`/cart/:id`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

### 5.5 清空购物车

**接口名称**：清空购物车

**请求方法**：DELETE

**URL路径**：`/cart`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "清空成功",
  "data": null
}
```

---

## 6. 订单接口

### 6.1 获取订单列表

**接口名称**：获取订单列表

**请求方法**：GET

**URL路径**：`/orders`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认10 |
| status | String | 否 | 订单状态（all/pending/paid/shipped/completed/cancelled） |

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | Number | 订单ID |
| orderNo | String | 订单号 |
| status | String | 订单状态 |
| items | Array | 订单项数组 |
| totalAmount | Number | 总金额 |
| shippingFee | Number | 运费 |
| discount | Number | 优惠金额 |
| finalAmount | Number | 实付金额 |
| address | Object | 收货地址 |
| createdAt | String | 下单时间 |
| paidAt | String | 支付时间 |
| shippedAt | String | 发货时间 |
| receivedAt | String | 收货时间 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "orderNo": "202401150001",
        "status": "pending",
        "items": [
          {
            "id": 1,
            "bookId": 1,
            "book": {
              "id": 1,
              "title": "JavaScript高级程序设计（第4版）",
              "author": "Nicholas C. Zakas",
              "cover": "https://example.com/book1.jpg",
              "condition": "90"
            },
            "quantity": 1,
            "price": 45.00
          }
        ],
        "totalAmount": 45.00,
        "shippingFee": 0.00,
        "discount": 0.00,
        "finalAmount": 45.00,
        "address": {
          "receiverName": "张三",
          "receiverPhone": "13800138000",
          "province": "北京市",
          "city": "北京市",
          "district": "朝阳区",
          "detailAddress": "某某小区1号楼101"
        },
        "createdAt": "2024-01-15T14:32:18Z",
        "paidAt": null,
        "shippedAt": null,
        "receivedAt": null
      }
    ],
    "total": 28,
    "page": 1,
    "pageSize": 10
  }
}
```

---

### 6.2 获取订单详情

**接口名称**：获取订单详情

**请求方法**：GET

**URL路径**：`/orders/:id`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "orderNo": "202401150001",
    "status": "pending",
    "items": [
      {
        "id": 1,
        "bookId": 1,
        "book": {
          "id": 1,
          "title": "JavaScript高级程序设计（第4版）",
          "author": "Nicholas C. Zakas",
          "cover": "https://example.com/book1.jpg",
          "condition": "90",
          "price": 45.00
        },
        "quantity": 1,
        "price": 45.00
      }
    ],
    "totalAmount": 45.00,
    "shippingFee": 0.00,
    "discount": 0.00,
    "finalAmount": 45.00,
    "address": {
      "receiverName": "张三",
      "receiverPhone": "13800138000",
      "province": "北京市",
      "city": "北京市",
      "district": "朝阳区",
      "detailAddress": "某某小区1号楼101"
    },
    "createdAt": "2024-01-15T14:32:18Z",
    "paidAt": null,
    "shippedAt": null,
    "receivedAt": null
  }
}
```

---

### 6.3 创建订单

**接口名称**：创建订单

**请求方法**：POST

**URL路径**：`/orders`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| items | Array | 是 | 订单项数组 |
| addressId | Number | 是 | 收货地址ID |

**请求示例**：
```json
{
  "items": [
    {
      "bookId": 1,
      "quantity": 1
    }
  ],
  "addressId": 1
}
```

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| orderId | Number | 订单ID |
| orderNo | String | 订单号 |
| finalAmount | Number | 实付金额 |

**响应示例**：
```json
{
  "code": 200,
  "message": "订单创建成功",
  "data": {
    "orderId": 1,
    "orderNo": "202401150001",
    "finalAmount": 45.00
  }
}
```

---

### 6.4 取消订单

**接口名称**：取消订单

**请求方法**：PUT

**URL路径**：`/orders/:id/cancel`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "订单已取消",
  "data": null
}
```

---

### 6.5 支付订单

**接口名称**：支付订单

**请求方法**：PUT

**URL路径**：`/orders/:id/pay`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| paymentMethod | String | 是 | 支付方式（alipay/wechat/balance） |

**请求示例**：
```json
{
  "paymentMethod": "alipay"
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "支付成功",
  "data": {
    "orderId": 1,
    "paidAt": "2024-01-15T14:35:00Z"
  }
}
```

---

### 6.6 确认收货

**接口名称**：确认收货

**请求方法**：PUT

**URL路径**：`/orders/:id/confirm`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "确认收货成功",
  "data": null
}
```

---

### 6.7 获取订单统计

**接口名称**：获取订单统计

**请求方法**：GET

**URL路径**：`/orders/stats`

**请求头**：
- `Authorization: Bearer {token}`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| pendingPayment | Number | 待付款订单数 |
| pendingShipment | Number | 待发货订单数 |
| pendingReceipt | Number | 待收货订单数 |
| pendingReview | Number | 待评价订单数 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "pendingPayment": 12,
    "pendingShipment": 5,
    "pendingReceipt": 3,
    "pendingReview": 8
  }
}
```

---

## 7. 卖家接口

### 7.1 获取卖家信息

**接口名称**：获取卖家信息

**请求方法**：GET

**URL路径**：`/seller/profile`

**请求头**：
- `Authorization: Bearer {token}`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | Number | 卖家ID |
| name | String | 店铺名称 |
| avatar | String | 头像URL |
| level | String | 卖家等级 |
| isVerified | Boolean | 是否认证 |
| rating | Number | 评分 |
| salesCount | Number | 销售数量 |
| positiveRate | Number | 好评率 |
| description | String | 店铺简介 |
| createdAt | String | 创建时间 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "书香阁",
    "avatar": "https://example.com/seller1.jpg",
    "level": "金牌卖家",
    "isVerified": true,
    "rating": 4.9,
    "salesCount": 2341,
    "positiveRate": 99.2,
    "description": "专注计算机技术类书籍，保证正版，发货迅速，欢迎选购！",
    "createdAt": "2023-01-01T00:00:00Z"
  }
}
```

---

### 7.2 更新卖家信息

**接口名称**：更新卖家信息

**请求方法**：PUT

**URL路径**：`/seller/profile`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| name | String | 否 | 店铺名称 |
| avatar | String | 否 | 头像URL |
| description | String | 否 | 店铺简介 |

**请求示例**：
```json
{
  "name": "技术书屋",
  "description": "专注计算机技术类书籍"
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 1,
    "name": "技术书屋",
    "description": "专注计算机技术类书籍"
  }
}
```

---

### 7.3 获取在售书籍

**接口名称**：获取卖家在售书籍

**请求方法**：GET

**URL路径**：`/seller/books`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认10 |
| status | String | 否 | 状态（all/on_sale/sold/offline） |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [],
    "total": 128,
    "page": 1,
    "pageSize": 10
  }
}
```

---

### 7.4 发布书籍

**接口名称**：发布新书籍

**请求方法**：POST

**URL路径**：`/seller/books`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | String | 是 | 书名 |
| author | String | 是 | 作者 |
| isbn | String | 否 | ISBN |
| publisher | String | 否 | 出版社 |
| publishDate | String | 否 | 出版时间 |
| category | String | 是 | 分类 |
| condition | String | 是 | 新旧程度 |
| description | String | 是 | 描述 |
| price | Number | 是 | 售价 |
| originalPrice | Number | 否 | 原价 |
| stock | Number | 是 | 库存 |
| images | Array | 是 | 图片URL数组 |

**请求示例**：
```json
{
  "title": "JavaScript高级程序设计（第4版）",
  "author": "Nicholas C. Zakas",
  "isbn": "978-7-115-54538-1",
  "publisher": "人民邮电出版社",
  "publishDate": "2020-09",
  "category": "tech",
  "condition": "90",
  "description": "本书为9成新，封面有轻微使用痕迹，内页整洁无笔记无划痕",
  "price": 45.00,
  "originalPrice": 99.00,
  "stock": 1,
  "images": [
    "https://example.com/book1.jpg",
    "https://example.com/book1-1.jpg"
  ]
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "发布成功",
  "data": {
    "id": 1,
    "title": "JavaScript高级程序设计（第4版）"
  }
}
```

---

### 7.5 更新书籍

**接口名称**：更新书籍信息

**请求方法**：PUT

**URL路径**：`/seller/books/:id`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | String | 否 | 书名 |
| author | String | 否 | 作者 |
| isbn | String | 否 | ISBN |
| publisher | String | 否 | 出版社 |
| publishDate | String | 否 | 出版时间 |
| category | String | 否 | 分类 |
| condition | String | 否 | 新旧程度 |
| description | String | 否 | 描述 |
| price | Number | 否 | 售价 |
| originalPrice | Number | 否 | 原价 |
| stock | Number | 否 | 库存 |
| images | Array | 否 | 图片URL数组 |

**响应示例**：
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 1,
    "title": "JavaScript高级程序设计（第4版）"
  }
}
```

---

### 7.6 删除书籍

**接口名称**：删除书籍

**请求方法**：DELETE

**URL路径**：`/seller/books/:id`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

### 7.7 获取卖家订单

**接口名称**：获取卖家订单列表

**请求方法**：GET

**URL路径**：`/seller/orders`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认10 |
| status | String | 否 | 订单状态（all/pending/paid/shipped/completed/cancelled） |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

---

### 7.8 发货

**接口名称**：订单发货

**请求方法**：PUT

**URL路径**：`/seller/orders/:id/ship`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| trackingNumber | String | 是 | 物流单号 |
| logisticsCompany | String | 是 | 物流公司 |

**请求示例**：
```json
{
  "trackingNumber": "SF1234567890",
  "logisticsCompany": "顺丰速运"
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "发货成功",
  "data": {
    "orderId": 1,
    "shippedAt": "2024-01-16T10:00:00Z"
  }
}
```

---

### 7.9 获取收益

**接口名称**：获取卖家收益

**请求方法**：GET

**URL路径**：`/seller/revenue`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| startDate | String | 否 | 开始日期 |
| endDate | String | 否 | 结束日期 |

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| totalRevenue | Number | 总收益 |
| totalOrders | Number | 总订单数 |
| totalBooks | Number | 总售出书籍 |
| pendingAmount | Number | 待结算金额 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalRevenue": 50000.00,
    "totalOrders": 200,
    "totalBooks": 2341,
    "pendingAmount": 1500.00
  }
}
```

---

### 7.10 获取卖家统计

**接口名称**：获取卖家统计数据

**请求方法**：GET

**URL路径**：`/seller/stats`

**请求头**：
- `Authorization: Bearer {token}`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| onSale | Number | 在售数量 |
| sold | Number | 已售数量 |
| rating | Number | 评分 |
| positiveRate | Number | 好评率 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "onSale": 128,
    "sold": 2341,
    "rating": 4.9,
    "positiveRate": 99.2
  }
}
```

---

## 8. 收藏接口

### 8.1 获取收藏列表

**接口名称**：获取用户收藏

**请求方法**：GET

**URL路径**：`/favorites`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认12 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [],
    "total": 50,
    "page": 1,
    "pageSize": 12
  }
}
```

---

### 8.2 添加收藏

**接口名称**：添加收藏

**请求方法**：POST

**URL路径**：`/favorites`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| bookId | Number | 是 | 书籍ID |

**请求示例**：
```json
{
  "bookId": 1
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "收藏成功",
  "data": {
    "id": 1,
    "bookId": 1
  }
}
```

---

### 8.3 取消收藏

**接口名称**：取消收藏

**请求方法**：DELETE

**URL路径**：`/favorites/:id`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "取消收藏成功",
  "data": null
}
```

---

### 8.4 检查是否收藏

**接口名称**：检查书籍是否已收藏

**请求方法**：GET

**URL路径**：`/favorites/check/:bookId`

**请求头**：
- `Authorization: Bearer {token}`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| isFavorite | Boolean | 是否已收藏 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "isFavorite": true
  }
}
```

---

## 9. 评价接口

### 9.1 获取评价列表

**接口名称**：获取书籍评价

**请求方法**：GET

**URL路径**：`/books/:id/reviews`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认10 |

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | Number | 评价ID |
| userId | Number | 用户ID |
| username | String | 用户名 |
| avatar | String | 头像URL |
| rating | Number | 评分 |
| content | String | 评价内容 |
| images | Array | 评价图片 |
| createdAt | String | 评价时间 |
| likes | Number | 点赞数 |
| reply | Object | 卖家回复 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [],
    "total": 128,
    "page": 1,
    "pageSize": 10
  }
}
```

---

### 9.2 提交评价

**接口名称**：提交商品评价

**请求方法**：POST

**URL路径**：`/orders/:orderId/reviews`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| bookId | Number | 是 | 书籍ID |
| rating | Number | 是 | 评分（1-5） |
| content | String | 是 | 评价内容 |
| images | Array | 否 | 评价图片 |

**请求示例**：
```json
{
  "bookId": 1,
  "rating": 5,
  "content": "书籍很好，成色很新，发货很快！",
  "images": [
    "https://example.com/review1.jpg"
  ]
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "评价成功",
  "data": {
    "id": 1,
    "rating": 5,
    "content": "书籍很好，成色很新，发货很快！"
  }
}
```

---

### 9.3 卖家回复评价

**接口名称**：卖家回复评价

**请求方法**：POST

**URL路径**：`/seller/reviews/:id/reply`

**请求头**：
- `Authorization: Bearer {token}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| content | String | 是 | 回复内容 |

**请求示例**：
```json
{
  "content": "感谢您的评价，祝您阅读愉快！"
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "回复成功",
  "data": {
    "id": 1,
    "reply": {
      "content": "感谢您的评价，祝您阅读愉快！",
      "createdAt": "2024-01-16T10:00:00Z"
    }
  }
}
```

---

### 9.4 点赞评价

**接口名称**：点赞评价

**请求方法**：POST

**URL路径**：`/reviews/:id/like`

**请求头**：
- `Authorization: Bearer {token}`

**响应示例**：
```json
{
  "code": 200,
  "message": "点赞成功",
  "data": {
    "likes": 10
  }
}
```

---

## 10. 上传接口

### 10.1 上传图片

**接口名称**：上传图片

**请求方法**：POST

**URL路径**：`/upload/image`

**请求头**：
- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| file | File | 是 | 图片文件 |

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| url | String | 图片URL |
| filename | String | 文件名 |
| size | Number | 文件大小 |

**响应示例**：
```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "url": "https://example.com/uploads/abc123.jpg",
    "filename": "abc123.jpg",
    "size": 102400
  }
}
```

---

### 10.2 批量上传图片

**接口名称**：批量上传图片

**请求方法**：POST

**URL路径**：`/upload/images`

**请求头**：
- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| files | File[] | 是 | 图片文件数组 |

**响应示例**：
```json
{
  "code": 200,
  "message": "上传成功",
  "data": [
    {
      "url": "https://example.com/uploads/abc123.jpg",
      "filename": "abc123.jpg",
      "size": 102400
    },
    {
      "url": "https://example.com/uploads/def456.jpg",
      "filename": "def456.jpg",
      "size": 102400
    }
  ]
}
```

---

## 11. 搜索接口

### 11.1 获取热门搜索

**接口名称**：获取热门搜索关键词

**请求方法**：GET

**URL路径**：`/search/hot-keywords`

**响应数据结构**：

| 字段名 | 类型 | 说明 |
|-------|------|------|
| keyword | String | 关键词 |
| count | Number | 搜索次数 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "keyword": "JavaScript",
      "count": 10000
    },
    {
      "keyword": "Vue",
      "count": 8000
    }
  ]
}
```

---

### 11.2 获取搜索建议

**接口名称**：获取搜索建议

**请求方法**：GET

**URL路径**：`/search/suggestions`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| keyword | String | 是 | 搜索关键词 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    "JavaScript高级程序设计",
    "JavaScript权威指南",
    "JavaScript设计模式"
  ]
}
```

---

## 12. 总结

本文档详细列出了书市项目的所有API接口，包括接口名称、请求方法、URL路径、请求参数、响应数据结构和错误码说明。开发团队应严格按照本文档进行前后端对接，确保接口调用的准确性和一致性。

如有任何疑问，请及时与后端开发团队沟通。
