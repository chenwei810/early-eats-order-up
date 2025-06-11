
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 檢查 build 準備狀態...');

const requiredFiles = [
  'src/main.tsx',
  'src/App.tsx',
  'src/pages/Index.tsx',
  'index.html',
  'vite.config.ts',
  'package.json'
];

const requiredDirs = [
  'src/components',
  'src/pages',
  'src/store'
];

let allGood = true;

// 檢查必要檔案
console.log('\n📁 檢查必要檔案:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ 缺少: ${file}`);
    allGood = false;
  }
});

// 檢查必要目錄
console.log('\n📂 檢查必要目錄:');
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}`);
  } else {
    console.log(`❌ 缺少: ${dir}`);
    allGood = false;
  }
});

// 檢查 package.json 中的 scripts
console.log('\n📦 檢查 package.json scripts:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts || {};
  
  if (scripts.build) {
    console.log(`✅ build script: ${scripts.build}`);
  } else {
    console.log('❌ 缺少 build script');
    allGood = false;
  }
  
  if (scripts.preview) {
    console.log(`✅ preview script: ${scripts.preview}`);
  } else {
    console.log('⚠️  建議新增 preview script');
  }
} catch (error) {
  console.log('❌ 無法讀取 package.json');
  allGood = false;
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 所有檢查通過！可以進行 build');
  console.log('\n建議的 build 流程:');
  console.log('1. npm install');
  console.log('2. npm run build');
  console.log('3. npm run preview (本地測試)');
} else {
  console.log('❌ 發現問題，請修正後再進行 build');
  process.exit(1);
}
