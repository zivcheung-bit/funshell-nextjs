# Vercel 部署指南

## 🚀 快速部署（5分钟）

### 准备工作

1. **Vercel 账号**
   - 访问 https://vercel.com/signup
   - 使用 GitHub/GitLab/Email 注册

2. **数据库选择**（任选其一）

   #### 选项 1: Vercel Postgres（推荐）
   ```bash
   # 在 Vercel Dashboard 中
   1. 进入项目
   2. Storage -> Create Database
   3. 选择 Postgres
   4. 自动配置 DATABASE_URL
   ```

   #### 选项 2: Supabase（免费 500MB）
   ```bash
   1. 访问 https://supabase.com
   2. 创建项目
   3. 获取连接字符串：
      Settings -> Database -> Connection string (URI)
   ```

   #### 选项 3: Neon（免费 3GB）
   ```bash
   1. 访问 https://neon.tech
   2. 创建项目
   3. 复制连接字符串
   ```

---

## 📋 部署步骤

### 方式 1: Vercel CLI（推荐）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 进入项目目录
cd funshell-nextjs

# 4. 部署
vercel

# 5. 添加环境变量
vercel env add DATABASE_URL
# 粘贴你的数据库连接字符串

vercel env add JWT_SECRET
# 输入随机字符串（至少32字符）

# 6. 部署到生产环境
vercel --prod
```

### 方式 2: GitHub 集成（自动部署）

```bash
# 1. 推送代码到 GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/funshell-nextjs.git
git push -u origin main

# 2. 在 Vercel Dashboard
1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库
3. 配置环境变量（见下方）
4. 点击 Deploy

# 3. 自动部署
每次推送到 main 分支，Vercel 会自动部署
```

---

## 🔧 环境变量配置

在 Vercel Dashboard -> Settings -> Environment Variables 添加：

### 必需变量

```bash
# 数据库连接
DATABASE_URL=postgresql://username:password@host:5432/database?sslmode=require

# JWT 密钥（生成随机字符串）
JWT_SECRET=your_random_secret_min_32_chars_here

# 环境
NODE_ENV=production
```

### 可选变量（区块链功能）

```bash
# Infura（ETH/USDT）
INFURA_PROJECT_ID=your_infura_project_id

# Etherscan（ETH 交易验证）
ETHERSCAN_API_KEY=your_etherscan_api_key

# TronGrid（TRX）
TRONGRID_API_KEY=your_trongrid_api_key
```

---

## 🗄️ 数据库初始化

### 使用 Vercel Postgres

```bash
# 1. 在 Vercel Dashboard 创建 Postgres 数据库
# 2. 自动配置 DATABASE_URL

# 3. 本地连接到 Vercel Postgres
vercel env pull .env.local

# 4. 推送 schema
npm run prisma:push

# 5. 填充数据
npm run seed
```

### 使用 Supabase/Neon

```bash
# 1. 设置 DATABASE_URL
export DATABASE_URL="postgresql://..."

# 2. 推送 schema
npm run prisma:push

# 3. 填充数据
npm run seed
```

---

## ✅ 验证部署

### 1. 健康检查
```bash
curl https://your-project.vercel.app/api/health
```

预期响应：
```json
{
  "success": true,
  "message": "Funshell Cold Wallet API is running",
  "timestamp": "2024-03-04T...",
  "platform": "Next.js + PostgreSQL",
  "version": "2.0.0"
}
```

### 2. 创建 API Key
```bash
curl -X POST https://your-project.vercel.app/api/v1/api-keys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Agent",
    "email": "test@example.com",
    "agentType": "claude"
  }'
```

### 3. 获取产品列表
```bash
curl https://your-project.vercel.app/api/v1/products \
  -H "X-API-Key: YOUR_API_KEY"
```

---

## 🔄 自动部署流程

### GitHub 集成后

```bash
# 1. 修改代码
git add .
git commit -m "Update API"
git push origin main

# 2. Vercel 自动检测并部署
# 3. 1-2分钟后自动上线
# 4. 收到部署通知邮件
```

---

## 📊 Vercel 免费额度

### Hobby Plan（免费）
- ✅ 100 GB 带宽/月
- ✅ 100 小时函数执行时间/月
- ✅ 无限部署
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动扩展

### Vercel Postgres（免费）
- ✅ 256 MB 存储
- ✅ 60 小时计算时间/月
- ✅ 自动备份

---

## 🛠️ 常见问题

### 1. 数据库连接失败

```bash
# 检查 DATABASE_URL 格式
postgresql://username:password@host:5432/database?sslmode=require

# 确保添加 ?sslmode=require（云数据库需要）
```

### 2. Prisma Client 未生成

```bash
# 在 package.json 添加
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}

# Vercel 会在部署时自动运行
```

### 3. 环境变量未生效

```bash
# 确保在 Vercel Dashboard 添加环境变量
# 重新部署
vercel --prod --force
```

### 4. 数据库 Schema 未同步

```bash
# 本地推送 schema
npm run prisma:push

# 或在 Vercel 部署后运行
vercel env pull .env.local
npm run prisma:push
```

---

## 🎯 生产环境优化

### 1. 数据库连接池

Prisma 自动管理连接池，无需额外配置。

### 2. 日志配置

```typescript
// lib/prisma.ts
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
})
```

### 3. 错误监控

推荐集成：
- Sentry（错误追踪）
- Vercel Analytics（性能监控）

---

## 📈 扩展建议

### 升级到 Pro Plan（$20/月）

- 更多带宽和计算时间
- 更大的数据库
- 优先支持
- 团队协作

### 数据库升级

- Vercel Postgres Pro
- Supabase Pro
- 自建 PostgreSQL（AWS RDS/DigitalOcean）

---

## 🎉 部署完成！

现在你的 API 已经在线：
- 🌐 URL: https://your-project.vercel.app
- 📚 文档: https://your-project.vercel.app/api/health
- 🔑 创建 API Key 开始使用

祝你使用愉快！🚀
