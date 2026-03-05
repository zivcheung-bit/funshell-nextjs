const fs = require('fs');
const path = require('path');

const products = [
  { name: 'OneKey Classic 1S', file: 'onekey-classic-1s.svg', color: '#667eea' },
  { name: 'OneKey Pro', file: 'onekey-pro.svg', color: '#764ba2' },
  { name: 'OneKey Mini', file: 'onekey-mini.svg', color: '#f093fb' },
  { name: 'Ledger Nano X', file: 'ledger-nano-x.svg', color: '#000000' },
  { name: 'Ledger Nano S Plus', file: 'ledger-nano-s-plus.svg', color: '#1a1a1a' },
  { name: 'Ledger Stax', file: 'ledger-stax.svg', color: '#333333' },
  { name: 'Trezor Model T', file: 'trezor-model-t.svg', color: '#01b757' },
  { name: 'Trezor Safe 3', file: 'trezor-safe-3.svg', color: '#00ab51' },
  { name: 'Keypal Pro', file: 'keypal-pro.svg', color: '#ff6b6b' },
  { name: 'imKey Pro', file: 'imkey-pro.svg', color: '#4ecdc4' },
];

const dir = path.join(__dirname, '../public/images/products');

products.forEach(product => {
  const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${product.color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" dy=".3em">${product.name}</text>
</svg>`;
  
  fs.writeFileSync(path.join(dir, product.file), svg);
  console.log(`✅ Created ${product.file}`);
});

console.log('\n✅ All placeholder images created!');
