# API Key 使用说明

## 问题解答

### 1. 前台创建订单显示 "Authentication failed"

**原因：** 用户输入的 API Key 无效或不存在

**解决方法：**
1. 确保先在"创建 API Key"模块创建了有效的 API Key
2. 复制生成的 API Key（格式：`fsk_xxxxx...`）
3. 在"创建订单"模块的"API Key"字段粘贴这个 Key
4. 确保 API Key 没有多余的空格

**测试步骤：**
```
1. 访问 https://funshell-nextjs.vercel.app/demo/index.html
2. 在第一个模块"创建 API Key"中填写信息
3. 点击"生成 API Key"
4. 复制显示的 API Key（以 fsk_ 开头）
5. 在"创建订单"模块中粘贴这个 API Key
6. 填写其他信息后提交
```

### 2. 管理后台 API Key 传递方式

**正确的传递方式：**

- **Header 名称：** `X-Admin-Key`（大小写不敏感）
- **Header 值：** `fsk_admin_xxxxx...`（64位十六进制）

**示例代码：**

```javascript
// JavaScript
fetch('https://funshell-nextjs.vercel.app/api/admin/orders', {
  headers: {
    'X-Admin-Key': 'fsk_admin_a1b2c3d4...'
  }
})

// cURL
curl -H "X-Admin-Key: fsk_admin_a1b2c3d4..." \
  https://funshell-nextjs.vercel.app/api/admin/orders

// Python
import requests
headers = {'X-Admin-Key': 'fsk_admin_a1b2c3d4...'}
response = requests.get('https://funshell-nextjs.vercel.app/api/admin/orders', headers=headers)
```

## API Key 类型对比

| 类型 | Header 名称 | Key 前缀 | 用途 | 获取方式 |
|------|------------|---------|------|---------|
| 用户 API Key | `X-API-Key` | `fsk_` | 创建订单、查询订单 | `/demo/index.html` 创建 |
| 管理员 API Key | `X-Admin-Key` | `fsk_admin_` | 管理所有订单 | `/admin/generate-key.html` 生成 |

## 完整测试流程

### 测试用户端

1. **创建 API Key**
   ```
   访问：https://funshell-nextjs.vercel.app/demo/index.html
   填写：姓名、邮箱、Agent类型
   获得：fsk_xxxxx...
   ```

2. **浏览产品**
   ```
   无需 API Key
   直接查看 5 款冷钱包
   ```

3. **创建订单**
   ```
   输入：刚才创建的 API Key
   选择：产品、数量、支付币种
   填写：收货信息
   获得：订单号和支付地址
   ```

4. **查询订单**
   ```
   输入：API Key + 订单号
   查看：订单状态、支付信息
   ```

### 测试管理端

1. **生成管理员 API Key**
   ```
   访问：https://funshell-nextjs.vercel.app/admin/generate-key.html
   输入：funshell-admin-2024
   获得：fsk_admin_xxxxx...
   ```

2. **使用管理后台**
   ```
   访问：https://funshell-nextjs.vercel.app/admin/index.html
   输入：管理员 API Key
   点击：保存
   查看：所有订单
   ```

## 常见错误

### "Admin API key is required"
- **原因：** 没有传递 `X-Admin-Key` header
- **解决：** 确保在 HTTP 请求中添加 header

### "Invalid admin API key format"
- **原因：** API Key 格式不正确
- **解决：** 确保 Key 以 `fsk_admin_` 开头

### "Authentication failed"
- **原因：** 用户 API Key 无效或已失效
- **解决：** 重新创建 API Key

### "API key is required"
- **原因：** 访问受保护的端点时没有传递 `X-API-Key`
- **解决：** 在 header 中添加有效的用户 API Key

## 调试技巧

### 检查 API Key 是否有效

```bash
# 测试用户 API Key
curl -H "X-API-Key: fsk_xxxxx..." \
  https://funshell-nextjs.vercel.app/api/v1/products

# 测试管理员 API Key
curl -H "X-Admin-Key: fsk_admin_xxxxx..." \
  https://funshell-nextjs.vercel.app/api/admin/orders
```

### 浏览器开发者工具

1. 打开 F12 开发者工具
2. 切换到 Network 标签
3. 提交表单
4. 查看请求的 Headers 部分
5. 确认 `X-API-Key` 或 `X-Admin-Key` 是否正确传递

## 安全提示

- ⚠️ 不要在公开场合分享 API Key
- ⚠️ 管理员 API Key 拥有完整权限，务必保密
- ⚠️ 定期更换管理员密钥（ADMIN_SECRET）
- ⚠️ 生产环境使用强密码
