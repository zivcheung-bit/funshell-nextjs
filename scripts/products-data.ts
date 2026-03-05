// 从 funshell.io 爬取的产品数据
export const products = [
  // OneKey 系列
  {
    name: "OneKey Classic 1S",
    brand: "OneKey",
    model: "Classic 1S",
    price: 399,
    currency: "HKD",
    description: "开源硬件钱包，支持蓝牙连接，安全芯片保护",
    image: "/images/products/onekey-classic-1s.svg",
    stock: 50,
    features: ["蓝牙连接", "开源固件", "安全芯片", "支持1000+币种"]
  },
  {
    name: "OneKey Pro",
    brand: "OneKey",
    model: "Pro",
    price: 1299,
    currency: "HKD",
    description: "专业级硬件钱包，触摸屏操作，支持NFT显示",
    image: "/images/products/onekey-pro.svg",
    stock: 30,
    features: ["触摸屏", "NFT显示", "蓝牙+USB", "开源固件"]
  },
  {
    name: "OneKey Mini",
    brand: "OneKey",
    model: "Mini",
    price: 299,
    currency: "HKD",
    description: "便携式硬件钱包，小巧轻便，适合日常使用",
    image: "/images/products/onekey-mini.svg",
    stock: 100,
    features: ["超便携", "USB-C", "开源", "性价比高"]
  },

  // Ledger 系列
  {
    name: "Ledger Nano X",
    brand: "Ledger",
    model: "Nano X",
    price: 1580,
    currency: "HKD",
    description: "支持蓝牙连接的硬件钱包，可管理5500+加密资产",
    image: "/images/products/ledger-nano-x.svg",
    stock: 50,
    features: ["蓝牙连接", "100+币种", "移动端支持", "安全芯片"]
  },
  {
    name: "Ledger Nano S Plus",
    brand: "Ledger",
    model: "Nano S Plus",
    price: 980,
    currency: "HKD",
    description: "升级版Nano S，更大屏幕，支持更多应用",
    image: "/images/products/ledger-nano-s-plus.svg",
    stock: 100,
    features: ["USB连接", "大屏幕", "5500+资产", "性价比高"]
  },
  {
    name: "Ledger Stax",
    brand: "Ledger",
    model: "Stax",
    price: 3280,
    currency: "HKD",
    description: "E-Ink触摸屏，由iPod之父设计，旗舰级硬件钱包",
    image: "/images/products/ledger-stax.svg",
    stock: 20,
    features: ["E-Ink屏幕", "无线充电", "蓝牙", "NFT显示"]
  },

  // Trezor 系列
  {
    name: "Trezor Model T",
    brand: "Trezor",
    model: "Model T",
    price: 2380,
    currency: "HKD",
    description: "触摸屏硬件钱包，开源固件，支持1000+币种",
    image: "/images/products/trezor-model-t.svg",
    stock: 30,
    features: ["触摸屏", "开源固件", "USB-C", "密码管理"]
  },
  {
    name: "Trezor Safe 3",
    brand: "Trezor",
    model: "Safe 3",
    price: 1180,
    currency: "HKD",
    description: "新一代Trezor，安全芯片+开源固件",
    image: "/images/products/trezor-safe-3.svg",
    stock: 50,
    features: ["安全芯片", "开源", "USB-C", "触摸按钮"]
  },

  // Keypal 系列
  {
    name: "Keypal Pro",
    brand: "Keypal",
    model: "Pro",
    price: 899,
    currency: "HKD",
    description: "国产硬件钱包，支持多链资产管理",
    image: "/images/products/keypal-pro.svg",
    stock: 60,
    features: ["多链支持", "中文界面", "USB-C", "安全芯片"]
  },

  // imKey 系列
  {
    name: "imKey Pro",
    brand: "imKey",
    model: "Pro",
    price: 799,
    currency: "HKD",
    description: "CC EAL6+安全芯片，银行级安全标准",
    image: "/images/products/imkey-pro.svg",
    stock: 40,
    features: ["EAL6+芯片", "蓝牙连接", "中文支持", "多链资产"]
  }
];
