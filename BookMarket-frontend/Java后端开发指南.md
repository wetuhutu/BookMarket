# Java后端开发指南

## 📋 基于前端API文档的后端开发指导

本文档基于已生成的前端API文档，提供Java后端开发的详细指导。

---

## 🎯 技术栈推荐

### 核心框架
- **Spring Boot 3.x** - 主框架
- **Spring Security** - 安全认证
- **Spring Data JPA** - 数据访问
- **MySQL 8.0** - 数据库
- **Redis** - 缓存

### 工具库
- **Lombok** - 简化代码
- **Hutool** - 工具类库
- **JWT** - Token认证
- **Swagger/Knife4j** - API文档
- **MapStruct** - 对象映射

### 构建工具
- **Maven** 或 **Gradle**

---

## 📁 项目结构规划

```
bookmarket-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── bookmarket/
│   │   │           ├── BookMarketApplication.java
│   │   │           ├── config/              # 配置类
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   ├── CorsConfig.java
│   │   │           │   ├── SwaggerConfig.java
│   │   │           │   └── RedisConfig.java
│   │   │           ├── controller/          # 控制器
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── BookController.java
│   │   │           │   ├── CartController.java
│   │   │           │   ├── UserController.java
│   │   │           │   └── FavoriteController.java
│   │   │           ├── service/             # 服务层
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── BookService.java
│   │   │           │   ├── CartService.java
│   │   │           │   └── UserService.java
│   │   │           ├── service/impl/        # 服务实现
│   │   │           ├── repository/          # 数据访问层
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── BookRepository.java
│   │   │           │   ├── CartRepository.java
│   │   │           │   └── FavoriteRepository.java
│   │   │           ├── entity/              # 实体类
│   │   │           │   ├── User.java
│   │   │           │   ├── Book.java
│   │   │           │   ├── Cart.java
│   │   │           │   ├── Favorite.java
│   │   │           │   └── Category.java
│   │   │           ├── dto/                # 数据传输对象
│   │   │           │   ├── request/
│   │   │           │   │   ├── LoginRequest.java
│   │   │           │   │   ├── RegisterRequest.java
│   │   │           │   │   └── BookQueryRequest.java
│   │   │           │   └── response/
│   │   │           │       ├── ApiResponse.java
│   │   │           │       ├── BookResponse.java
│   │   │           │       └── UserResponse.java
│   │   │           ├── vo/                 # 视图对象
│   │   │           │   ├── BookVO.java
│   │   │           │   └── CategoryVO.java
│   │   │           ├── mapper/             # 对象映射
│   │   │           │   ├── BookMapper.java
│   │   │           │   └── UserMapper.java
│   │   │           ├── common/             # 公共类
│   │   │           │   ├── constant/
│   │   │           │   │   ├── ErrorCode.java
│   │   │           │   │   └── RedisKey.java
│   │   │           │   ├── exception/
│   │   │           │   │   ├── BusinessException.java
│   │   │           │   │   └── GlobalExceptionHandler.java
│   │   │           │   ├── util/
│   │   │           │   │   ├── JwtUtil.java
│   │   │           │   │   └── PasswordUtil.java
│   │   │           │   └── annotation/
│   │   │           │       └── RequireAuth.java
│   │   │           └── interceptor/        # 拦截器
│   │   │               ├── AuthInterceptor.java
│   │   │               └── LoginInterceptor.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       └── application-prod.yml
│   └── test/
│       └── java/
└── pom.xml
```

---

## 🔌 API接口开发顺序

### 第一阶段：基础接口（优先级最高）

#### 1. 书籍相关接口
```
GET    /api/books/categories      # 获取热门分类
GET    /api/books/hot             # 获取热门书籍
GET    /api/books                 # 获取书籍列表
GET    /api/books/:id             # 获取书籍详情
GET    /api/books/search          # 搜索书籍
```

#### 2. 认证相关接口
```
POST   /api/auth/register         # 用户注册
POST   /api/auth/login            # 用户登录
POST   /api/auth/logout           # 用户登出
POST   /api/auth/send-code        # 发送验证码
```

### 第二阶段：核心功能接口

#### 3. 用户相关接口
```
GET    /api/user/profile          # 获取用户信息
PUT    /api/user/profile          # 更新用户信息
```

#### 4. 购物车相关接口
```
GET    /api/cart                  # 获取购物车
POST   /api/cart                  # 添加到购物车
PUT    /api/cart/:id              # 更新购物车
DELETE /api/cart/:id              # 删除购物车项
```

#### 5. 收藏相关接口
```
GET    /api/favorites             # 获取收藏列表
POST   /api/favorites             # 添加收藏
DELETE /api/favorites/:id         # 取消收藏
```

---

## 📊 数据库设计

### 核心表结构

#### 1. 用户表 (user)
```sql
CREATE TABLE `user` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
  `phone` VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
  `email` VARCHAR(100) COMMENT '邮箱',
  `password` VARCHAR(255) NOT NULL COMMENT '密码（加密）',
  `avatar` VARCHAR(500) COMMENT '头像URL',
  `level` VARCHAR(20) DEFAULT '普通会员' COMMENT '会员等级',
  `points` INT DEFAULT 0 COMMENT '积分',
  `is_seller` TINYINT(1) DEFAULT 0 COMMENT '是否卖家',
  `seller_level` VARCHAR(20) COMMENT '卖家等级',
  `is_verified` TINYINT(1) DEFAULT 0 COMMENT '是否认证',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone (`phone`),
  INDEX idx_username (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

#### 2. 分类表 (category)
```sql
CREATE TABLE `category` (
  `id` VARCHAR(50) PRIMARY KEY COMMENT '分类ID（英文标识）',
  `name` VARCHAR(50) NOT NULL COMMENT '分类名称',
  `icon` VARCHAR(10) NOT NULL COMMENT '分类图标（emoji）',
  `description` VARCHAR(200) COMMENT '分类描述',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分类表';
```

#### 3. 书籍表 (book)
```sql
CREATE TABLE `book` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL COMMENT '书名',
  `author` VARCHAR(100) NOT NULL COMMENT '作者',
  `isbn` VARCHAR(20) UNIQUE COMMENT 'ISBN',
  `publisher` VARCHAR(100) COMMENT '出版社',
  `publish_date` VARCHAR(20) COMMENT '出版时间',
  `pages` INT COMMENT '页数',
  `category_id` VARCHAR(50) NOT NULL COMMENT '分类ID',
  `condition` VARCHAR(20) NOT NULL COMMENT '新旧程度',
  `price` DECIMAL(10,2) NOT NULL COMMENT '售价',
  `original_price` DECIMAL(10,2) COMMENT '原价',
  `stock` INT DEFAULT 1 COMMENT '库存',
  `cover` VARCHAR(500) NOT NULL COMMENT '封面URL',
  `images` JSON COMMENT '图片数组',
  `description` TEXT COMMENT '描述',
  `seller_id` BIGINT NOT NULL COMMENT '卖家ID',
  `seller_name` VARCHAR(50) NOT NULL COMMENT '卖家名称',
  `seller_level` VARCHAR(20) COMMENT '卖家等级',
  `seller_rating` DECIMAL(3,2) DEFAULT 0.00 COMMENT '卖家评分',
  `is_verified` TINYINT(1) DEFAULT 0 COMMENT '是否认证',
  `sales_count` INT DEFAULT 0 COMMENT '销量',
  `status` TINYINT DEFAULT 1 COMMENT '状态：1-在售，0-下架',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (`category_id`),
  INDEX idx_seller (`seller_id`),
  INDEX idx_price (`price`),
  INDEX idx_created (`created_at`),
  FULLTEXT idx_title_author (`title`, `author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='书籍表';
```

#### 4. 购物车表 (cart)
```sql
CREATE TABLE `cart` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `book_id` BIGINT NOT NULL COMMENT '书籍ID',
  `quantity` INT DEFAULT 1 COMMENT '数量',
  `price` DECIMAL(10,2) NOT NULL COMMENT '添加时的价格',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_book (`user_id`, `book_id`),
  INDEX idx_user (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车表';
```

#### 5. 收藏表 (favorite)
```sql
CREATE TABLE `favorite` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `book_id` BIGINT NOT NULL COMMENT '书籍ID',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_book (`user_id`, `book_id`),
  INDEX idx_user (`user_id`),
  INDEX idx_book (`book_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收藏表';
```

#### 6. 订单表 (order)
```sql
CREATE TABLE `order` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `order_no` VARCHAR(32) NOT NULL UNIQUE COMMENT '订单号',
  `buyer_id` BIGINT NOT NULL COMMENT '买家ID',
  `seller_id` BIGINT NOT NULL COMMENT '卖家ID',
  `book_id` BIGINT NOT NULL COMMENT '书籍ID',
  `quantity` INT DEFAULT 1 COMMENT '数量',
  `price` DECIMAL(10,2) NOT NULL COMMENT '单价',
  `total_price` DECIMAL(10,2) NOT NULL COMMENT '总价',
  `status` VARCHAR(20) DEFAULT 'pending' COMMENT '订单状态',
  `payment_status` VARCHAR(20) DEFAULT 'unpaid' COMMENT '支付状态',
  `shipping_status` VARCHAR(20) DEFAULT 'unshipped' COMMENT '物流状态',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `paid_at` DATETIME COMMENT '支付时间',
  `shipped_at` DATETIME COMMENT '发货时间',
  `received_at` DATETIME COMMENT '收货时间',
  INDEX idx_buyer (`buyer_id`),
  INDEX idx_seller (`seller_id`),
  INDEX idx_status (`status`),
  FOREIGN KEY (`buyer_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`seller_id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';
```

#### 7. 评价表 (review)
```sql
CREATE TABLE `review` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `book_id` BIGINT NOT NULL COMMENT '书籍ID',
  `user_id` BIGINT NOT NULL COMMENT '评价用户ID',
  `user_name` VARCHAR(50) NOT NULL COMMENT '评价用户名称',
  `user_avatar` VARCHAR(500) COMMENT '评价用户头像',
  `rating` TINYINT NOT NULL COMMENT '评分（1-5）',
  `content` TEXT COMMENT '评价内容',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_book (`book_id`),
  INDEX idx_user (`user_id`),
  INDEX idx_rating (`rating`),
  FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评价表';
```

## 📝 开发注意事项

### 1. 接口响应格式
所有接口必须统一使用以下格式：
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 2. 错误码规范
```java
public enum ErrorCode {
    SUCCESS(200, "成功"),
    BAD_REQUEST(400, "请求参数错误"),
    UNAUTHORIZED(401, "未授权"),
    FORBIDDEN(403, "禁止访问"),
    NOT_FOUND(404, "资源不存在"),
    INTERNAL_ERROR(500, "服务器内部错误"),
    USER_NOT_FOUND(1001, "用户不存在"),
    USER_EXISTS(1002, "用户已存在"),
    BOOK_NOT_FOUND(2001, "书籍不存在"),
    STOCK_INSUFFICIENT(2002, "库存不足");
}
```

### 3. 跨域配置
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

## 📚 参考文档

- [Spring Boot官方文档](https://spring.io/projects/spring-boot)
- [Spring Data JPA文档](https://spring.io/projects/spring-data-jpa)
- [Knife4j文档](https://doc.xiaominfo.com/)
- [JWT文档](https://jwt.io/)

