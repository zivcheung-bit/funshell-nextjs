# Funshell 冷钱包 API 演示前端

## 📁 文件说明

- `index.html` - 完整功能演示页面
- `test.html` - API 测试页面

## 🚀 使用方法

### 本地开发
直接在浏览器打开 HTML 文件即可使用。

### 生产环境
部署后访问：
- https://your-domain.vercel.app/demo/index.html
- https://your-domain.vercel.app/demo/test.html

## 🎨 功能模块

### 1. 创建 API Key
- 输入名称和权限
- 自动生成 API Key
- 显示创建结果

### 2. 浏览产品
- 查看所有冷钱包产品
- 显示价格、库存、规格

### 3. 创建订单
- 选择产品和数量
- 填写收货信息
- 选择支付币种
- 生成支付二维码

### 4. 查询订单
- 输入订单 ID
- 查看订单详情
- 显示支付状态

## 🔧 配置

修改 HTML 文件中的 API 地址：

```javascript
const API_BASE_URL = 'https://your-domain.vercel.app';
```

## 📱 响应式设计

- 支持桌面端（1200px+）
- 支持平板端（768px-1199px）
- 支持移动端（<768px）

## 🎨 UI 特性

- 渐变紫色主题
- 卡片式布局
- 标签页导航
- 一键复制功能
- QR 码展示
- 加载动画
