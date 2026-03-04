#!/bin/bash

# Funshell Next.js 数据库初始化脚本

echo "🚀 开始初始化数据库..."

# 设置数据库连接
export DATABASE_URL="postgresql://neondb_owner:npg_oUrKj4wkPsa3@ep-young-night-a1cdepmh-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

echo "📦 安装依赖..."
npm install

echo "🗄️  推送数据库 Schema..."
npx prisma db push

echo "🌱 填充初始数据..."
npx prisma db seed

echo "✅ 数据库初始化完成！"
echo ""
echo "📊 数据库信息："
echo "  - 5个产品已创建"
echo "  - 测试 API Key: fsk_test_key_for_development_only"
echo ""
echo "🎉 现在可以测试 API 了！"
