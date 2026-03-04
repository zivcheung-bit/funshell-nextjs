# Funshell Cold Wallet API - Next.js + PostgreSQL

RESTful API for AI agents to purchase cold wallets with cryptocurrency payments.

## 🚀 技术栈

- **框架**: Next.js 15 (App Router)
- **数据库**: PostgreSQL + Prisma ORM
- **语言**: TypeScript
- **部署**: Vercel (Serverless)

---

## 📋 快速开始

### 1. 安装依赖

```bash
cd funshell-nextjs
npm install
```

### 2. 配置数据库

#### 本地开发（使用 Docker）

```bash
# 启动 PostgreSQL
docker run --name funshell-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=funshell_db \
  -p 5432:5432 \
  -d postgres:16

# 或者使用 docker-compose
docker-compose up -d
```

#### 云数据库（推荐生产环境）

使用以下任一服务：
- **Vercel Postgres** (推荐，与 Vercel 集成)
- **Supabase** (免费 500MB)
- **Neon** (免费 3GB)
- **Railway** (免费 500MB)

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，设置 DATABASE_URL
```

### 4. 初始化数据库

```bash
# 推送数据库 schema
npm run prisma:push

# 填充测试数据
npm run seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000/api/health 验证 API 运行。

---

## 🌐 API 端点

### 健康检查
```bash
GET /api/health
```

### API Key 管理
```bash
POST /api/v1/api-keys          # 创建 API Key
GET  /api/v1/api-keys          # 获取当前 API Key 信息
```

### 产品管理
```bash
GET /api/v1/products           # 获取产品列表
GET /api/v1/products/:id       # 获取产品详情
```

### 订单管理
```bash
POST   /api/v1/orders          # 创建订单
GET    /api/v1/orders          # 获取订单列表
GET    /api/v1/orders/:id      # 获取订单详情
DELETE /api/v1/orders/:id      # 取消订单
```

---

## 🧪 测试 API

### 1. 健康检查
```bash
curl http://localhost:3000/api/health
```

### 2. 创建 API Key
```bash
curl -X POST http://localhost:3000/api/v1/api-keys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Agent",
    "email": "agent@example.com",
    "agentType": "claude"
  }'
```

### 3. 获取产品列表
```bash
curl http://localhost:3000/api/v1/products \
  -H "X-API-Key: YOUR_API_KEY"
```

### 4. 创建订单
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "product_id": "PRODUCT_ID",
    "quantity": 1,
    "payment_currency": "BTC",
    "shipping": {
      "name": "John Doe",
      "phone": "+852 1234 5678",
      "address": "123 Main St",
      "city": "Hong Kong",
      "country": "Hong Kong",
      "postal_code": "000000"
    }
  }'
```

---

## 🚀 部署到 Vercel

### 方式 1: Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 添加环境变量
vercel env add DATABASE_URL
vercel env add JWT_SECRET

# 部署到生产环境
vercel --prod
```

### 方式 2: GitHub 集成

1. 推送代码到 GitHub
2. 访问 https://vercel.com/new
3. 导入 GitHub 仓库
4. 添加环境变量
5. 点击 Deploy

### 环境变量配置

在 Vercel Dashboard 添加：

```
DATABASE_URL=postgresql://...
JWT_SECRET=your_random_secret_min_32_chars
```

---

## 📁 项目结构

```
funshell-nextjs/
├── app/
│   ├── api/
│   │   ├── health/
│   │   │   └── route.ts          # 健康检查
│   │   └── v1/
│   │       ├── api-keys/
│   │       │   └── route.ts      # API Key 管理
│   │       ├── products/
│   │       │   ├── route.ts      # 产品列表
│   │       │   └── [id]/
│   │       │       └── route.ts  # 产品详情
│   │       └── orders/
│   │           ├── route.ts      # 订单列表/创建
│   │           └── [id]/
│   │               └── route.ts  # 订单详情/取消
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── prisma.ts                 # Prisma 客户端
│   └── utils.ts                  # 工具函数
├── prisma/
│   ├── schema.prisma             # 数据库 Schema
│   └── seed.ts                   # 数据填充脚本
├── middleware.ts                 # API Key 验证中间件
├── .env                          # 环境变量
├── .env.example                  # 环境变量示例
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄️ 数据库 Schema

### ApiKey (api_keys)
- id, key, name, email, agentType
- isActive, createdAt, updatedAt

### Product (products)
- id, name, brand, model, description
- price, currency, stock, imageUrl, features
- isActive, createdAt, updatedAt

### Order (orders)
- id, orderNumber, apiKeyId, productId
- quantity, totalPrice, currency
- paymentCurrency, paymentAmount, paymentAddress
- shippingName, shippingPhone, shippingAddress...
- status, createdAt, updatedAt, expiresAt...

---

## 🔧 Prisma 命令

```bash
# 生成 Prisma Client
npm run prisma:generate

# 推送 schema 到数据库
npm run prisma:push

# 创建迁移
npm run prisma:migrate

# 打开 Prisma Studio（数据库 GUI）
npm run prisma:studio

# 填充测试数据
npm run seed

# 一键设置数据库
npm run db:setup
```

---

## 🌟 特性

- ✅ Next.js 15 App Router
- ✅ TypeScript 类型安全
- ✅ PostgreSQL + Prisma ORM
- ✅ RESTful API 设计
- ✅ API Key 认证
- ✅ 中间件验证
- ✅ 多币种支付（BTC, ETH, USDT, TRX）
- ✅ 订单管理
- ✅ Serverless 部署
- ✅ 自动扩展
- ✅ 全球 CDN

---

## 📊 测试数据

运行 `npm run seed` 后会创建：

### 产品（5个）
- Ledger Nano X (1299 HKD, 库存: 50)
- Ledger Nano S Plus (799 HKD, 库存: 100)
- Trezor Model T (1899 HKD, 库存: 30)
- Trezor One (599 HKD, 库存: 80)
- Coldcard Mk4 (1199 HKD, 库存: 20)

### 测试 API Key
```
fsk_test_key_for_development_only
```

---

## 💰 费用

### Vercel（免费）
- 100 GB 带宽/月
- 100 小时函数执行时间/月
- 自动 HTTPS
- 全球 CDN

### Vercel Postgres（免费）
- 256 MB 存储
- 60 小时计算时间/月

### Supabase（免费）
- 500 MB 数据库
- 无限 API 请求

---

## 📞 支持

- 📧 Email: support@funshell.io
- 🌐 Website: https://funshell.io

---

## 📄 License

MIT License
