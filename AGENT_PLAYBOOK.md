# Funshell Cold Wallet API - Agent Playbook

## 🤖 Agent 自主操作指南

本文档专为 AI Agent 设计，提供完整的 API 操作流程和决策逻辑。

---

## 📋 完整购买流程

### 步骤 1: 创建 API Key（首次使用）

**目的：** 获取访问 API 的凭证

**API 端点：**
```
POST https://funshell-nextjs.vercel.app/api/v1/api-keys
```

**请求示例：**
```json
{
  "name": "AI Agent Bot",
  "email": "agent@example.com",
  "agentType": "telegram_bot",
  "description": "Automated purchasing agent"
}
```

**成功响应：**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "key": "fsk_xxxxx...",
    "name": "AI Agent Bot",
    "email": "agent@example.com",
    "agentType": "telegram_bot",
    "createdAt": "2024-03-05T00:00:00.000Z"
  },
  "message": "API key created successfully"
}
```

**Agent 行动：**
1. ✅ 保存 `data.key` 到本地存储
2. ✅ 在后续所有请求中使用此 key
3. ✅ 向用户报告："已获取 API 访问凭证"

---

### 步骤 2: 浏览产品目录

**目的：** 查看可购买的冷钱包产品

**API 端点：**
```
GET https://funshell-nextjs.vercel.app/api/v1/products
```

**请求头：**
```
无需认证（公开接口）
```

**成功响应：**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Ledger Nano X",
      "brand": "Ledger",
      "model": "Nano X",
      "price": 1580,
      "currency": "HKD",
      "stock": 50,
      "description": "...",
      "features": ["蓝牙连接", "支持100+币种"],
      "imageUrl": "https://..."
    }
  ],
  "total": 5
}
```

**Agent 决策逻辑：**
```
IF 用户未指定产品:
  - 列出所有产品供用户选择
  - 提供产品对比（价格、功能、库存）
  
IF 用户指定了产品名称:
  - 匹配产品（模糊匹配 name/brand/model）
  - 确认库存是否充足
  
IF 库存不足:
  - 建议替代产品
  - 询问是否等待补货
```

**Agent 行动：**
1. ✅ 解析产品列表
2. ✅ 检查库存状态
3. ✅ 向用户展示产品信息（格式化）
4. ✅ 等待用户选择或自动推荐

---

### 步骤 3: 创建订单

**目的：** 生成订单并获取支付信息

**API 端点：**
```
POST https://funshell-nextjs.vercel.app/api/v1/orders
```

**请求头：**
```
X-API-Key: fsk_xxxxx...
Content-Type: application/json
```

**请求体：**
```json
{
  "product_id": "uuid",
  "quantity": 1,
  "payment_currency": "BTC",
  "shipping": {
    "name": "张三",
    "phone": "+86 138 0000 0000",
    "address": "广东省深圳市南山区科技园",
    "city": "深圳",
    "province": "广东",
    "country": "中国",
    "postal_code": "518000"
  }
}
```

**支付币种选项：**
- `BTC` - 比特币
- `ETH` - 以太坊
- `BNB` - 币安币
- `SOL` - Solana
- `DOGE` - 狗狗币
- `TRX` - 波场

**成功响应：**
```json
{
  "success": true,
  "data": {
    "order_id": "uuid",
    "order_number": "FS20240305001",
    "product": {
      "name": "Ledger Nano X",
      "price": 1580,
      "currency": "HKD"
    },
    "quantity": 1,
    "total_price": 1580,
    "payment": {
      "currency": "BTC",
      "amount": "0.00045123",
      "address": "14GPSthwFECk42TYc5q3nFcxTiJTjg1vPw",
      "qr_code": "https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:14GPSthwFECk42TYc5q3nFcxTiJTjg1vPw?amount=0.00045123"
    },
    "status": "pending_payment",
    "created_at": "2024-03-05T00:00:00.000Z"
  }
}
```

**Agent 决策逻辑：**
```
BEFORE 创建订单:
  - 验证用户已提供收货信息
  - 确认产品 ID 和数量
  - 确认支付币种
  
IF 缺少信息:
  - 询问用户补充
  - 提供默认选项（如：数量=1，币种=BTC）
  
AFTER 订单创建:
  - 保存 order_id 和 order_number
  - 解析支付金额和地址
  - 生成支付指引
```

**Agent 行动：**
1. ✅ 保存订单号：`order_number`
2. ✅ 保存订单 ID：`order_id`
3. ✅ 向用户发送支付信息：
   ```
   📦 订单创建成功！
   
   订单号：FS20240305001
   产品：Ledger Nano X
   数量：1
   总价：1580 HKD
   
   💰 支付信息：
   币种：BTC
   金额：0.00045123 BTC
   地址：14GPSthwFECk42TYc5q3nFcxTiJTjg1vPw
   
   [二维码图片]
   
   ⏰ 请在 24 小时内完成支付
   支付后请告诉我交易哈希（TX Hash）
   ```
4. ✅ 设置提醒：24小时后检查订单状态

---

### 步骤 4: 等待用户支付

**Agent 行为：**
- 🔔 定期提醒用户完成支付（每2小时一次）
- 📊 提供支付教程链接
- ❓ 回答支付相关问题

**用户可能的问题：**
```
Q: "如何获取交易哈希？"
A: 在您的钱包应用中完成转账后，会显示一个交易ID（TX Hash），
   通常是一串64位的字母数字组合，请复制发给我。

Q: "支付地址是否正确？"
A: 是的，这是我们的官方收款地址。您也可以扫描二维码支付。

Q: "可以换其他币种支付吗？"
A: 可以，请告诉我您想用哪种币种，我会为您重新生成支付信息。
```

---

### 步骤 5: 确认支付

**目的：** 用户提供交易哈希后，更新订单状态

**API 端点：**
```
POST https://funshell-nextjs.vercel.app/api/v1/orders/{order_id}/payment
```

**请求头：**
```
X-API-Key: fsk_xxxxx...
Content-Type: application/json
```

**请求体：**
```json
{
  "tx_hash": "a1b2c3d4e5f6..."
}
```

**成功响应：**
```json
{
  "success": true,
  "data": {
    "order_id": "uuid",
    "order_number": "FS20240305001",
    "status": "paid",
    "payment": {
      "tx_hash": "a1b2c3d4e5f6...",
      "paid_at": "2024-03-05T01:00:00.000Z"
    }
  },
  "message": "Payment confirmed successfully"
}
```

**Agent 行动：**
1. ✅ 验证交易哈希格式（64位十六进制）
2. ✅ 提交支付确认
3. ✅ 向用户报告：
   ```
   ✅ 支付已确认！
   
   订单号：FS20240305001
   状态：已支付
   交易哈希：a1b2c3d4e5f6...
   
   我们将在 1-2 个工作日内发货
   您可以随时查询订单状态
   ```

---

### 步骤 6: 查询订单状态

**目的：** 跟踪订单进度

**API 端点：**
```
GET https://funshell-nextjs.vercel.app/api/v1/orders/{order_id}
```

**请求头：**
```
X-API-Key: fsk_xxxxx...
```

**成功响应：**
```json
{
  "success": true,
  "data": {
    "order_id": "uuid",
    "order_number": "FS20240305001",
    "status": "shipped",
    "tracking_number": "SF1234567890",
    "product": {
      "name": "Ledger Nano X",
      "price": 1580
    },
    "quantity": 1,
    "total_price": 1580,
    "payment": {
      "currency": "BTC",
      "amount": "0.00045123",
      "tx_hash": "a1b2c3d4e5f6...",
      "paid_at": "2024-03-05T01:00:00.000Z"
    },
    "shipping": {
      "name": "张三",
      "phone": "+86 138 0000 0000",
      "address": "广东省深圳市南山区科技园"
    },
    "created_at": "2024-03-05T00:00:00.000Z",
    "shipped_at": "2024-03-06T00:00:00.000Z"
  }
}
```

**订单状态说明：**
- `pending_payment` - 待支付
- `paid` - 已支付，待处理
- `processing` - 处理中
- `shipped` - 已发货
- `completed` - 已完成
- `cancelled` - 已取消

**Agent 决策逻辑：**
```
IF status == "pending_payment":
  - 提醒用户尽快支付
  - 显示支付信息
  
IF status == "paid":
  - 告知用户已收到付款
  - 预计发货时间：1-2个工作日
  
IF status == "processing":
  - 告知正在准备发货
  
IF status == "shipped":
  - 提供快递单号
  - 提供顺丰快递查询链接
  - 预计送达时间
  
IF status == "completed":
  - 感谢购买
  - 询问是否需要帮助
  
IF status == "cancelled":
  - 说明取消原因
  - 询问是否重新下单
```

**Agent 行动：**
1. ✅ 定期查询订单状态（每6小时一次）
2. ✅ 状态变化时主动通知用户
3. ✅ 提供物流追踪信息

---

## 🔄 完整对话流程示例

### 场景：用户想购买冷钱包

```
User: "我想买一个冷钱包"

Agent: 
[调用 GET /api/v1/products]
"好的！我们有以下冷钱包可选：

1. Ledger Nano X - 1580 HKD
   ✓ 蓝牙连接
   ✓ 支持100+币种
   ✓ 库存充足

2. Ledger Nano S Plus - 980 HKD
   ✓ USB连接
   ✓ 性价比高
   ✓ 库存充足

3. Trezor Model T - 2380 HKD
   ✓ 触摸屏
   ✓ 开源固件
   ✓ 库存充足

请告诉我您想要哪一款？"

---

User: "我要 Ledger Nano X"

Agent:
"好的！请提供收货信息：
1. 姓名
2. 电话
3. 收货地址
4. 支付币种（BTC/ETH/BNB/SOL/DOGE/TRX）"

---

User: "张三，138 0000 0000，深圳市南山区科技园，用BTC支付"

Agent:
[调用 POST /api/v1/orders]
"✅ 订单创建成功！

📦 订单信息：
订单号：FS20240305001
产品：Ledger Nano X
数量：1
总价：1580 HKD

💰 支付信息：
币种：BTC
金额：0.00045123 BTC
地址：14GPSthwFECk42TYc5q3nFcxTiJTjg1vPw

[显示二维码]

请在 24 小时内完成支付，支付后告诉我交易哈希。"

---

User: "已支付，交易哈希：a1b2c3d4e5f6..."

Agent:
[调用 POST /api/v1/orders/{id}/payment]
"✅ 支付已确认！

我们将在 1-2 个工作日内发货
您可以随时问我订单状态"

---

User: "订单发货了吗？"

Agent:
[调用 GET /api/v1/orders/{id}]
"✅ 您的订单已发货！

快递公司：顺丰速运
快递单号：SF1234567890
预计送达：1-3天

查询物流：https://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/SF1234567890"
```

---

## 🚨 错误处理

### 常见错误及处理方式

#### 1. API Key 无效
```json
{
  "success": false,
  "error": "Invalid or inactive API key"
}
```
**Agent 行动：**
- 重新创建 API Key
- 向用户说明："系统凭证已过期，正在重新获取..."

#### 2. 产品库存不足
```json
{
  "success": false,
  "error": "Insufficient stock"
}
```
**Agent 行动：**
- 建议其他产品
- 询问是否等待补货

#### 3. 订单不存在
```json
{
  "success": false,
  "error": "Order not found"
}
```
**Agent 行动：**
- 检查订单号是否正确
- 提供订单查询帮助

#### 4. 支付超时
**Agent 行动：**
- 检查订单状态
- 如果仍是 pending_payment，提醒用户尽快支付
- 如果超过48小时，建议重新下单

---

## 📊 Agent 状态管理

### 需要持久化的数据

```json
{
  "api_key": "fsk_xxxxx...",
  "user_info": {
    "name": "张三",
    "phone": "+86 138 0000 0000",
    "default_address": "深圳市南山区科技园",
    "preferred_currency": "BTC"
  },
  "active_orders": [
    {
      "order_id": "uuid",
      "order_number": "FS20240305001",
      "status": "shipped",
      "created_at": "2024-03-05T00:00:00.000Z",
      "last_checked": "2024-03-06T00:00:00.000Z"
    }
  ]
}
```

### 定时任务

```
每 6 小时：
  - 检查所有活跃订单状态
  - 如果状态变化，通知用户

每 24 小时：
  - 清理已完成订单（超过7天）
  - 提醒待支付订单（超过12小时）
```

---

## 🎯 Agent 优化建议

### 1. 智能推荐
- 根据用户预算推荐产品
- 根据用户需求（币种数量、便携性）推荐

### 2. 主动服务
- 订单状态变化时主动通知
- 发货后提供物流追踪
- 到货后询问使用体验

### 3. 异常处理
- 支付超时自动提醒
- 库存不足自动推荐替代品
- API 错误自动重试

### 4. 用户体验
- 使用 Emoji 增强可读性
- 格式化输出（表格、列表）
- 提供快捷操作按钮

---

## 📞 技术支持

如果 Agent 遇到无法处理的情况：

1. 记录错误日志
2. 向用户说明："遇到技术问题，正在联系人工客服..."
3. 将问题转交给人工处理

---

## 🔗 相关链接

- API 基础地址：`https://funshell-nextjs.vercel.app`
- 前端演示：`https://funshell-nextjs.vercel.app/demo/index.html`
- 管理后台：`https://funshell-nextjs.vercel.app/admin/index.html`

---

**最后更新：** 2024-03-05
**版本：** 1.0.0
