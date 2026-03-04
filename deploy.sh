#!/bin/bash

echo "🚀 Funshell Next.js API - 一键部署到 Vercel"
echo "================================================"
echo ""

# 检查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI 已就绪"
echo ""

# 检查是否已登录
echo "🔐 检查 Vercel 登录状态..."
if ! vercel whoami &> /dev/null; then
    echo "📝 请登录 Vercel..."
    vercel login
fi

echo "✅ 已登录 Vercel"
echo ""

# 部署
echo "🚀 开始部署..."
vercel --prod

echo ""
echo "================================================"
echo "✅ 部署完成！"
echo ""
echo "📋 下一步："
echo "1. 在 Vercel Dashboard 配置环境变量："
echo "   - DATABASE_URL (PostgreSQL 连接字符串)"
echo "   - JWT_SECRET (随机字符串，至少32字符)"
echo ""
echo "2. 初始化数据库："
echo "   vercel env pull .env.local"
echo "   npm run prisma:push"
echo "   npm run seed"
echo ""
echo "3. 测试 API："
echo "   curl https://your-project.vercel.app/api/health"
echo ""
echo "🎉 祝你使用愉快！"
