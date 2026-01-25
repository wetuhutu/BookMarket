# Java后端快速开始指南

## 🚀 5分钟快速上手

---

## 步骤1：创建项目（2分钟）

### 使用Spring Initializr

1. 访问 https://start.spring.io/
2. 配置项目信息：
   - **Project**: Maven
   - **Language**: Java
   - **Spring Boot**: 3.2.x
   - **Group**: com.bookmarket
   - **Artifact**: bookmarket-backend
   - **Name**: bookmarket-backend
   - **Package name**: com.bookmarket
   - **Packaging**: Jar
   - **Java**: 17

3. 添加依赖：
   - ✅ Spring Web
   - ✅ Spring Data JPA
   - ✅ MySQL Driver
   - ✅ Spring Security
   - ✅ Validation
   - ✅ Lombok

4. 点击 "GENERATE" 下载项目
5. 解压到 `d:\Downloads\BookMarket\BookMarket-backend`

---

## 步骤2：配置数据库（1分钟）

### 创建数据库

```sql
CREATE DATABASE bookmarket CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 配置 application.yml

编辑 `src/main/resources/application.yml`:

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: bookmarket-backend

  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/bookmarket?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: your_password

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

# JWT配置
jwt:
  secret: your-secret-key-at-least-256-bits-long-for-jwt-token-generation
  expiration: 86400000
```

---

## 步骤3：创建第一个接口（2分钟）

### 1. 创建统一响应类

创建 `src/main/java/com/bookmarket/dto/response/ApiResponse.java`:

```java
package com.bookmarket.dto.response;

import lombok.Data;

@Data
public class ApiResponse<T> {
    private Integer code;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(200);
        response.setMessage("success");
        response.setData(data);
        return response;
    }

    public static <T> ApiResponse<T> error(Integer code, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(code);
        response.setMessage(message);
        return response;
    }
}
```

### 2. 创建分类VO类

创建 `src/main/java/com/bookmarket/vo/CategoryVO.java`:

```java
package com.bookmarket.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryVO {
    private String id;
    private String name;
    private String icon;
    private Integer count;
}
```

### 3. 创建Controller

创建 `src/main/java/com/bookmarket/controller/BookController.java`:

```java
package com.bookmarket.controller;

import com.bookmarket.dto.response.ApiResponse;
import com.bookmarket.vo.CategoryVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    @GetMapping("/categories")
    public ApiResponse<List<CategoryVO>> getCategories() {
        List<CategoryVO> categories = new ArrayList<>();
        categories.add(new CategoryVO("literature", "文学小说", "📖", 2345));
        categories.add(new CategoryVO("tech", "计算机技术", "💻", 1876));
        categories.add(new CategoryVO("education", "教育教材", "🎓", 3421));
        categories.add(new CategoryVO("art", "艺术设计", "🎨", 987));
        categories.add(new CategoryVO("business", "经管励志", "💼", 1234));
        categories.add(new CategoryVO("science", "自然科学", "🔬", 765));
        return ApiResponse.success(categories);
    }
}
```

---

## 步骤4：运行项目（30秒）

### 使用IDE运行

1. 在IDE中打开项目
2. 找到 `BookMarketBackendApplication.java`
3. 右键点击 "Run"

### 使用命令行运行

```bash
cd d:\Downloads\BookMarket\BookMarket-backend
mvn spring-boot:run
```

---

## 步骤5：测试接口（30秒）

### 使用浏览器测试

访问: `http://localhost:8080/api/books/categories`

应该看到以下响应：

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
    }
  ]
}
```

### 使用Postman测试

1. 创建新请求
2. 方法: `GET`
3. URL: `http://localhost:8080/api/books/categories`
4. 点击 "Send"

---

## 🎯 下一步：实现更多接口

### 添加热门书籍接口

在 `BookController.java` 中添加：

```java
@GetMapping("/hot")
public ApiResponse<List<BookVO>> getHotBooks(@RequestParam(defaultValue = "4") Integer limit) {
    List<BookVO> books = new ArrayList<>();
    books.add(new BookVO(1L, "JavaScript高级程序设计", "Nicholas C. Zakas",
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
            "90", 45.00, 99.00, "书香阁", "金牌卖家", 4.9, true));
    books.add(new BookVO(2L, "深入理解计算机系统", "Randal E. Bryant",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
            "80", 68.00, 139.00, "技术书店", "银牌卖家", 4.7, true));
    books.add(new BookVO(3L, "设计模式", "Erich Gamma",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
            "new", 35.00, 55.00, "编程书屋", "金牌卖家", 4.8, true));
    books.add(new BookVO(4L, "人月神话", "Frederick P. Brooks",
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
            "70", 28.00, 48.00, "旧书回收站", "普通卖家", 4.5, false));
    return ApiResponse.success(books.stream().limit(limit).toList());
}
```

创建 `BookVO.java`:

```java
package com.bookmarket.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookVO {
    private Long id;
    private String title;
    private String author;
    private String cover;
    private String condition;
    private Double price;
    private Double originalPrice;
    private String sellerName;
    private String sellerLevel;
    private Double sellerRating;
    private Boolean isVerified;
}
```

---

## 📚 完整开发流程

### 1. 创建实体类 (Entity)
```java
@Entity
@Table(name = "book")
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    // ... 其他字段
}
```

### 2. 创建Repository
```java
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCategory(String category);
}
```

### 3. 创建Service
```java
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getHotBooks(Integer limit) {
        return bookRepository.findAll().stream().limit(limit).toList();
    }
}
```

### 4. 创建Controller
```java
@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/hot")
    public ApiResponse<List<Book>> getHotBooks(@RequestParam(defaultValue = "4") Integer limit) {
        return ApiResponse.success(bookService.getHotBooks(limit));
    }
}
```

---

## 🔧 常用依赖添加

### 添加到 pom.xml

```xml
<!-- Redis -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>

<!-- Hutool工具类 -->
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.25</version>
</dependency>

<!-- Knife4j API文档 -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
    <version>4.4.0</version>
</dependency>
```

---

## 🐛 常见问题

### 1. 端口被占用
修改 `application.yml` 中的端口:
```yaml
server:
  port: 8081
```

### 2. 数据库连接失败
检查:
- MySQL服务是否启动
- 数据库是否创建
- 用户名密码是否正确
- URL格式是否正确

### 3. 找不到依赖
```bash
mvn clean install
```

### 4. 跨域问题
添加跨域配置:
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

---

## 📖 推荐学习资源

### 官方文档
- [Spring Boot官方文档](https://spring.io/projects/spring-boot)
- [Spring Data JPA文档](https://spring.io/projects/spring-data-jpa)
- [MySQL文档](https://dev.mysql.com/doc/)

### 视频教程
- B站搜索：Spring Boot入门
- 尚硅谷Spring Boot教程
- 黑马程序员Spring Boot教程

### 书籍推荐
- 《Spring Boot实战》
- 《Java EE开发的颠覆者：Spring Boot实战》
- 《Spring Cloud微服务实战》

---

## 🎯 开发顺序建议

### 第一天：基础框架
1. 创建项目
2. 配置数据库
3. 创建统一响应类
4. 实现分类接口（Mock数据）

### 第二天：书籍接口
1. 创建Book实体
2. 创建BookRepository
3. 创建BookService
4. 实现热门书籍接口
5. 实现书籍列表接口

### 第三天：认证接口
1. 配置JWT
2. 创建User实体
3. 实现注册接口
4. 实现登录接口

### 第四天：其他接口
1. 购物车接口
2. 收藏接口
3. 用户接口

---

## 📞 获取帮助

### 查看文档
- [Java后端开发指南.md](./Java后端开发指南.md) - 完整开发指南
- [接口开发清单.md](./接口开发清单.md) - 接口开发清单
- [API接口文档.md](./项目指导文件/06-API接口文档.md) - API文档

### 常用命令
```bash
# 编译项目
mvn clean compile

# 运行项目
mvn spring-boot:run

# 打包项目
mvn clean package

# 跳过测试打包
mvn clean package -DskipTests
```

---

现在您已经可以开始Java后端开发了！祝您开发顺利！🚀
