
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 增加更詳細的日誌來追蹤問題
console.log('🚀 Starting application...');
console.log('Current URL:', window.location.href);
console.log('Base URL:', document.baseURI);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found');
  throw new Error('Root element not found');
}

console.log('✅ Root element found, creating React root...');

try {
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log('✅ React app rendered successfully');
} catch (error) {
  console.error('❌ Failed to render React app:', error);
  // 在 production 環境下顯示友好的錯誤訊息
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: Arial, sans-serif;">
        <div style="text-align: center; padding: 20px;">
          <h1 style="color: #ef4444; margin-bottom: 16px;">應用載入失敗</h1>
          <p style="color: #6b7280; margin-bottom: 16px;">請檢查瀏覽器控制台以獲取更多資訊</p>
          <button onclick="window.location.reload()" style="background-color: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
            重新載入
          </button>
        </div>
      </div>
    `;
  }
}
