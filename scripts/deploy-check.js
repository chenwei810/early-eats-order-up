
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 檢查部署構建...');

const distDir = 'dist';
const requiredFiles = [
  'index.html',
  '.htaccess'
];

let allGood = true;

// 檢查 dist 目錄是否存在
if (!fs.existsSync(distDir)) {
  console.log('❌ dist 目錄不存在，請先執行 npm run build');
  process.exit(1);
}

// 檢查必要檔案
console.log('\n📁 檢查構建檔案:');
requiredFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ 缺少: ${file}`);
    allGood = false;
  }
});

// 檢查 index.html 內容
console.log('\n🔍 檢查 index.html 配置:');
try {
  const indexPath = path.join(distDir, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  if (indexContent.includes('<base href="./"/>')) {
    console.log('✅ base href 設定正確');
  } else {
    console.log('⚠️  建議檢查 base href 設定');
  }
  
  if (indexContent.includes('src="./')) {
    console.log('✅ 相對路徑設定正確');
  } else {
    console.log('⚠️  建議檢查腳本路徑設定');
  }
} catch (error) {
  console.log('❌ 無法讀取 index.html');
  allGood = false;
}

// 檢查資源檔案
console.log('\n📦 檢查資源檔案:');
const assetsDir = path.join(distDir, 'assets');
if (fs.existsSync(assetsDir)) {
  const assets = fs.readdirSync(assetsDir);
  const jsFiles = assets.filter(f => f.endsWith('.js'));
  const cssFiles = assets.filter(f => f.endsWith('.css'));
  
  console.log(`✅ JS 檔案: ${jsFiles.length} 個`);
  console.log(`✅ CSS 檔案: ${cssFiles.length} 個`);
} else {
  console.log('❌ assets 目錄不存在');
  allGood = false;
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 部署檢查通過！');
  console.log('\n📋 部署步驟:');
  console.log('1. 將 dist 目錄中的所有檔案上傳到您的服務器');
  console.log('2. 確保服務器支援 .htaccess 檔案');
  console.log('3. 如果使用 Nginx，請配置相應的重寫規則');
  console.log('\n🌐 如果仍有問題，請檢查:');
  console.log('- 服務器是否支援 mod_rewrite');
  console.log('- 瀏覽器控制台是否有錯誤訊息');
  console.log('- 網路標籤是否顯示 404 的具體檔案');
} else {
  console.log('❌ 發現問題，請修正後重新構建');
  process.exit(1);
}
