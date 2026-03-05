# 加密冷钱包购买 Skill

## 📦 Skill 信息

- **名称**: crypto_cold_wallet_purchase
- **显示名称**: 加密冷钱包购买
- **版本**: 1.0.0
- **分类**: 电商
- **图标**: 🔐

## 🎯 功能概述

这是一个完整的自动化购买技能，让 AI Agent 能够自主完成加密货币冷钱包的购买流程，包括：

- ✅ 浏览产品目录
- ✅ 创建购买订单
- ✅ 生成加密货币支付地址
- ✅ 确认支付交易
- ✅ 查询订单状态
- ✅ 追踪物流信息
- ✅ 自动提醒和通知

## 💰 支持的加密货币

- BTC (比特币)
- ETH (以太坊)
- BNB (币安币)
- SOL (Solana)
- DOGE (狗狗币)
- TRX (波场)

## 🚀 快速开始

### 1. 加载 Skill

```python
# Python 示例
from agent_framework import Agent

agent = Agent()
agent.load_skill("crypto_cold_wallet_purchase", 
                 config_file="SKILL_DEFINITION.json")
```

```javascript
// JavaScript 示例
const agent = new Agent();
await agent.loadSkill('crypto_cold_wallet_purchase', {
  configFile: 'SKILL_DEFINITION.json'
});
```

### 2. 配置（可选）

```json
{
  "default_currency": "BTC",
  "auto_check_interval": 21600,
  "payment_reminder_interval": 7200
}
```

### 3. 使用示例

```python
# 用户输入
user_input = "我想买冷钱包"

# Agent 自动处理
response = agent.process(user_input)
# → 显示产品列表

user_input = "我要 Ledger Nano X"
response = agent.process(user_input)
# → 询问收货信息

user_input = "张三，138 0000 0000，深圳市南山区科技园，深圳，广东，518000"
response = agent.process(user_input)
# → 创建订单，显示支付信息

user_input = "已支付，tx: a1b2c3d4e5f6..."
response = agent.process(user_input)
# → 确认支付成功
```

## 🎭 意图识别

Skill 自动识别以下用户意图：

### 1. browse_products（浏览产品）
**触发示例**:
- "我想买冷钱包"
- "有什么冷钱包可以买"
- "显示所有产品"
- "查看冷钱包列表"
- "推荐一个冷钱包"

### 2. create_order（创建订单）
**触发示例**:
- "我要买 Ledger Nano X"
- "下单购买"
- "创建订单"
- "我要这个"
- "购买第一个"

### 3. confirm_payment（确认支付）
**触发示例**:
- "我已经支付了"
- "支付完成"
- "交易哈希是 xxx"
- "tx hash: xxx"
- "已转账"

### 4. check_order_status（查询订单）
**触发示例**:
- "订单状态"
- "我的订单怎么样了"
- "发货了吗"
- "查询订单"
- "物流信息"

## 🔄 完整工作流程

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 初始化                                                    │
│    → 创建 API Key                                            │
│    → 保存凭证                                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. 浏览产品                                                  │
│    → 获取产品列表                                            │
│    → 展示给用户                                              │
│    → 等待用户选择                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. 收集信息                                                  │
│    → 询问收货信息（如果未提供）                              │
│    → 确认支付币种                                            │
│    → 确认数量                                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. 创建订单                                                  │
│    → 调用 API 创建订单                                       │
│    → 获取支付地址和金额                                      │
│    → 显示支付信息                                            │
│    → 设置支付提醒                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. 等待支付                                                  │
│    → 每 2 小时提醒用户                                       │
│    → 回答支付相关问题                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. 确认支付                                                  │
│    → 接收交易哈希                                            │
│    → 验证格式                                                │
│    → 提交确认                                                │
│    → 设置订单跟踪                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. 订单跟踪                                                  │
│    → 每 6 小时检查状态                                       │
│    → 状态变化时通知用户                                      │
│    → 提供物流信息                                            │
└─────────────────────────────────────────────────────────────┘
```

## 📊 状态管理

### 持久化数据（需要保存）
```json
{
  "api_key": "fsk_xxxxx...",
  "api_key_id": "uuid",
  "user_info": {
    "name": "张三",
    "email": "user@example.com"
  },
  "shipping_info": {
    "name": "张三",
    "phone": "+86 138 0000 0000",
    "address": "深圳市南山区科技园",
    "city": "深圳",
    "province": "广东",
    "country": "中国",
    "postal_code": "518000"
  },
  "active_orders": [
    {
      "order_id": "uuid",
      "order_number": "FS20240305001",
      "status": "shipped",
      "created_at": "2024-03-05T00:00:00.000Z"
    }
  ]
}
```

### 会话数据（临时）
```json
{
  "current_order_id": "uuid",
  "selected_product": {
    "id": "uuid",
    "name": "Ledger Nano X"
  },
  "payment_currency": "BTC"
}
```

## ⏰ 定时任务

### 1. 检查活跃订单
- **间隔**: 每 6 小时
- **条件**: 有活跃订单
- **动作**: 查询订单状态，如有变化则通知用户

### 2. 清理已完成订单
- **间隔**: 每 24 小时
- **条件**: 有超过 7 天的已完成订单
- **动作**: 从活跃列表中移除

### 3. 支付提醒
- **间隔**: 每 2 小时
- **条件**: 订单状态为 pending_payment
- **动作**: 提醒用户完成支付

## 🚨 错误处理

### 重试策略
```json
{
  "max_attempts": 3,
  "backoff": "exponential",
  "initial_delay": 1000
}
```

### 降级方案
- **API 错误**: 转人工客服
- **网络错误**: 稍后重试
- **验证错误**: 请求用户重新输入

### 常见错误处理

| 错误类型 | Agent 行动 |
|---------|-----------|
| API Key 无效 | 自动重新创建 API Key |
| 库存不足 | 推荐替代产品 |
| 订单不存在 | 检查订单号，提供帮助 |
| 支付超时 | 建议重新下单 |
| 交易哈希格式错误 | 提示正确格式 |

## 💬 对话示例

### 示例 1: 完整购买流程

```
User: 我想买冷钱包

Agent: 📦 以下是可购买的冷钱包：

1. Ledger Nano X - 1580 HKD
   品牌：Ledger | 型号：Nano X
   库存：50 件
   支持蓝牙连接，100+币种

2. Ledger Nano S Plus - 980 HKD
   品牌：Ledger | 型号：Nano S Plus
   库存：100 件
   USB连接，性价比高

3. Trezor Model T - 2380 HKD
   品牌：Trezor | 型号：Model T
   库存：30 件
   触摸屏，开源固件

请告诉我您想要哪一款？

---

User: 我要 Ledger Nano X，用 BTC 支付

Agent: 好的！请提供收货信息：

1️⃣ 姓名
2️⃣ 电话
3️⃣ 详细地址
4️⃣ 城市
5️⃣ 省份
6️⃣ 邮编

您可以一次性提供，或分步告诉我

---

User: 张三，138 0000 0000，深圳市南山区科技园，深圳，广东，518000

Agent: ✅ 订单创建成功！

📦 订单信息：
订单号：FS20240305001
产品：Ledger Nano X
数量：1
总价：1580 HKD

💰 支付信息：
币种：BTC
金额：0.00045123 BTC
地址：14GPSthwFECk42TYc5q3nFcxTiJTjg1vPw

⏰ 请在 24 小时内完成支付
支付后请告诉我交易哈希（TX Hash）

---

User: 已支付，tx: a1b2c3d4e5f6789...

Agent: ✅ 支付已确认！

订单号：FS20240305001
状态：已支付
交易哈希：a1b2c3d4e5f6789...

我们将在 1-2 个工作日内发货
您可以随时查询订单状态

---

User: 订单发货了吗？

Agent: 🚚 订单已发货！

订单号：FS20240305001
快递公司：顺丰速运
快递单号：SF1234567890
预计送达：1-3 天

查询物流：https://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/SF1234567890
```

## 🔧 集成方式

### 方式 1: 直接加载 JSON

```python
import json

with open('SKILL_DEFINITION.json', 'r') as f:
    skill_config = json.load(f)

agent.register_skill(skill_config['skill'])
```

### 方式 2: 使用 Skill Manager

```python
from agent_framework import SkillManager

skill_manager = SkillManager()
skill_manager.install('crypto_cold_wallet_purchase', 
                      source='SKILL_DEFINITION.json')

agent.enable_skill('crypto_cold_wallet_purchase')
```

### 方式 3: 远程加载

```python
agent.load_skill_from_url(
    'https://funshell-nextjs.vercel.app/SKILL_DEFINITION.json'
)
```

## 📚 相关文档

- **Skill 定义**: `SKILL_DEFINITION.json`
- **详细指南**: `AGENT_PLAYBOOK.md`
- **工作流配置**: `AGENT_WORKFLOW.json`
- **在线文档**: https://funshell-nextjs.vercel.app/agent/index.html

## 🛠️ 自定义配置

### 修改默认币种

```json
{
  "default_currency": "ETH"
}
```

### 调整检查间隔

```json
{
  "auto_check_interval": 10800,
  "payment_reminder_interval": 3600
}
```

### 自定义消息模板

```python
agent.set_message_template('order_created', 
    "🎉 订单 {{order_number}} 创建成功！\n请支付 {{amount}} {{currency}}"
)
```

## 🎯 最佳实践

1. **初始化时机**: 在 Agent 启动时自动初始化 Skill
2. **状态持久化**: 使用数据库或文件保存用户状态
3. **错误日志**: 记录所有 API 调用和错误
4. **用户体验**: 使用 Emoji 和格式化输出
5. **主动服务**: 订单状态变化时主动通知用户

## 📞 技术支持

- **邮箱**: support@funshell.com
- **文档**: https://funshell-nextjs.vercel.app/agent/index.html
- **GitHub**: https://github.com/zivcheung-bit/funshell-nextjs

## 📄 许可证

MIT License

---

**最后更新**: 2024-03-05  
**版本**: 1.0.0
