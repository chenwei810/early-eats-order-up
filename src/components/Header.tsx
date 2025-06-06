
import { Link } from 'react-router-dom';
import { ShoppingCart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';

const Header = () => {
  const getCartItemCount = useCartStore((state) => state.getCartItemCount);
  const itemCount = getCartItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">晨</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">晨光早餐店</h1>
            <p className="text-xs text-gray-500">Morning Light Cafe</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
            首頁
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
            餐點菜單
          </Link>
          <Link to="/order-status" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
            訂單查詢
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link to="/admin/login">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-500">
              <Settings className="w-4 h-4 mr-1" />
              管理
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="outline" size="sm" className="relative border-gray-200 hover:border-orange-500">
              <ShoppingCart className="w-4 h-4 mr-2" />
              購物車
              {itemCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 text-white border-0"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
