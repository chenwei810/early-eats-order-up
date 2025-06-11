
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
  
  // 檢查腳本路徑
  if (indexContent.includes('src="/src/main')) {
    console.log('❌ 檢測到開發環境路徑，這會導致部署問題');
    console.log('   請確保 build 過程正確替換了資源路徑');
    allGood = false;
  } else {
    console.log('✅ 生產環境資源路徑正確');
  }
  
  // 檢查是否有 script 標籤
  const scriptMatches = indexContent.match(/<script[^>]*>/g);
  if (scriptMatches && scriptMatches.length > 0) {
    console.log(`✅ 找到 ${scriptMatches.length} 個腳本標籤`);
    scriptMatches.forEach((script, index) => {
      console.log(`   腳本 ${index + 1}: ${script}`);
    });
  } else {
    console.log('❌ 沒有找到腳本標籤');
    allGood = false;
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
  jsFiles.forEach(file => console.log(`   - ${file}`));
  
  console.log(`✅ CSS 檔案: ${cssFiles.length} 個`);
  cssFiles.forEach(file => console.log(`   - ${file}`));
  
  if (jsFiles.length === 0) {
    console.log('❌ 沒有 JS 檔案，這會導致應用無法運行');
    allGood = false;
  }
} else {
  console.log('❌ assets 目錄不存在');
  allGood = false;
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 部署檢查通過！');
  console.log('\n📋 部署步驟:');
  console.log('1. 將 dist 目錄中的所有檔案上傳到您的服務器根目錄');
  console.log('2. 確保服務器支援 .htaccess 檔案（Apache）');
  console.log('3. 如果使用 Nginx，請配置相應的重寫規則');
  console.log('\n🌐 部署後如果仍有問題，請檢查:');
  console.log('- 瀏覽器開發者工具的 Console 標籤中的錯誤訊息');
  console.log('- Network 標籤中是否有 404 或其他錯誤');
  console.log('- 服務器是否正確配置了 MIME 類型');
} else {
  console.log('❌ 發現問題，請修正後重新構建');
  process.exit(1);
}
