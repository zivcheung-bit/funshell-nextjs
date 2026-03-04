# 🚀 快速开始指南

## 5分钟部署到 Vercel

### 步骤 1: 准备数据库（2分钟）

选择以下任一数据库服务：

#### 选项 A: Vercel Postgres（推荐）
```bash
1. 访问 https://vercel.com/dashboard
2. 创建项目后，进入 Storage -> Create Database
3. 选择 Postgres
4. 自动配置 DATABASE_URL
```

#### 选项 B: Supabase（免费 500MB）
```bash
1. 访问 https://supabase.com
2. 创建新项目
3. Settings -> Database -> Connection string
4. 复制 URI 格式的连接字符串
```

#### 选项 C: Neon（免费 3GB）
```bash
1. 访问 https://neon.tech
2. 创建项目
3. 复制连接字符串
```

---

### 步骤 2: 部署到 Vercel（2分钟）

```bash
# 运行一键部署脚本
./deploy.sh

# 或手动部署
npm install -g vercel
vercel login
vercel --prod
```

---

### 步骤 3: 配置环境变量（1分钟）

在 Vercel Dashboard -> Settings -> Environment Variables 添加：

```bash
DATABASE_URL=postgresql://username:password@host:5432/database?sslmode=require
JWT_SECRET=your_random_secret_min_32_chars_here
```

生成随机 JWT_SECRET：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 步骤 4: 初始化数据库（1分钟）

```bash
# 拉取环境变量
vercel env pull .env.local

# 推送数据库 schema
npm run prisma:push

# 填充测试数据
npm run seed
```

---

### 步骤 5: 测试 API ✅

```bash
# 健康检查
curl https://your-project.vercel.app/api/health

# 创建 API Key
curl -X POST https://your-project.vercel.app/api/v1/api-keys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Agent",
    "email": "agent@example.com",
    "agentType": "claude"
  }'

# 获取产品列表
curl https://your-project.vercel.app/api/v1/products \
  -H "X-API-Key: YOUR_API_KEY"
```

---

## 🎉 完成！

你的 API 现在已经在线：
- 🌐 URL: https://your-project.vercel.app
- 📚 API 文档: 查看 README.md
- 🔑 测试 API Key: `fsk_test_key_for_development_only`

---

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 设置 DATABASE_URL

# 3. 初始化数据库
npm run db:setup

# 4. 启动开发服务器
npm run dev
```

访问 http://localhost:3000/api/health

---

## 常见问题

### 数据库连接失败？
确保连接字符串包含 `?sslmode=require`

### Prisma Client 未生成？
运行 `npm run prisma:generate`

### 环境变量未生效？
重新部署：`vercel --prod --force`

---

## 下一步

- 📖 阅读完整文档: README.md
- 🚀 查看部署指南: VERCEL_DEPLOYMENT.md
- 🔧 配置区块链 API（可选）

祝你使用愉快！🎉
