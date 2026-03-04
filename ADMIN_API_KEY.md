# 管理员 API Key 使用指南

## 生成管理员 API Key

1. 访问：`https://funshell-nextjs.vercel.app/admin/generate-key.html`
2. 输入管理员密钥（ADMIN_SECRET）
3. 点击"生成 API Key"
4. 复制生成的 API Key

## 默认管理员密钥

```
funshell-admin-2024
```

**⚠️ 生产环境请务必修改此密钥！**

在 Vercel 环境变量中设置：
```
ADMIN_SECRET=your-secure-secret-here
```

## 使用管理后台

1. 访问：`https://funshell-nextjs.vercel.app/admin/index.html`
2. 输入管理员 API Key
3. 点击"保存"
4. 开始管理订单

## API Key 格式

管理员 API Key 格式：
```
fsk_admin_[64位十六进制字符串]
```

示例：
```
fsk_admin_a1b2c3d4e5f6...
```

## 管理后台功能

- ✅ 查看所有订单
- ✅ 按状态筛选订单
- ✅ 搜索订单（订单号、客户姓名、电话）
- ✅ 查看订单详情
- ✅ 更新订单状态
- ✅ 添加快递单号
- ✅ 添加订单备注
- ✅ 实时统计数据

## API 端点

### 获取所有订单
```bash
GET /api/admin/orders
Headers: X-Admin-Key: fsk_admin_xxx
```

### 获取单个订单
```bash
GET /api/admin/orders/{order_id}
Headers: X-Admin-Key: fsk_admin_xxx
```

### 更新订单
```bash
PATCH /api/admin/orders/{order_id}
Headers: 
  X-Admin-Key: fsk_admin_xxx
  Content-Type: application/json
Body:
{
  "status": "shipped",
  "tracking_number": "SF1234567890",
  "notes": "已发货"
}
```

## 给 Bot 使用

将生成的管理员 API Key 提供给您的 Telegram Bot 或其他自动化工具，它们可以：

1. 定期查询新订单
2. 检测支付状态变化
3. 自动通知您有新订单
4. 更新订单状态
5. 添加快递单号

### Bot 示例代码

```javascript
const ADMIN_API_KEY = 'fsk_admin_xxx';
const API_BASE = 'https://funshell-nextjs.vercel.app';

// 获取待处理订单
async function checkNewOrders() {
  const response = await fetch(`${API_BASE}/api/admin/orders?status=paid`, {
    headers: {
      'X-Admin-Key': ADMIN_API_KEY
    }
  });
  
  const data = await response.json();
  
  if (data.success && data.data.length > 0) {
    // 通知管理员
    for (const order of data.data) {
      await notifyAdmin(`
🆕 新订单！
订单号: ${order.order_number}
客户: ${order.shipping.name}
产品: ${order.product.name}
金额: ${order.total_price} ${order.currency}
支付: ${order.payment.amount} ${order.payment.currency}
      `);
    }
  }
}

// 每5分钟检查一次
setInterval(checkNewOrders, 5 * 60 * 1000);
```

## 安全提示

1. ⚠️ 不要在公开场合分享管理员 API Key
2. ⚠️ 定期更换管理员密钥（ADMIN_SECRET）
3. ⚠️ 生产环境使用强密码
4. ⚠️ 考虑添加 IP 白名单限制
5. ⚠️ 记录所有管理操作日志

## 下一步优化

- [ ] 将管理员 API Key 存储到数据库
- [ ] 添加 API Key 过期时间
- [ ] 添加操作日志记录
- [ ] 添加 IP 白名单
- [ ] 添加多管理员支持
- [ ] 添加权限分级（只读、编辑、完全控制）
