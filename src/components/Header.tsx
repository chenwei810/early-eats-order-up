
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';

const Header = () => {
  const getCartItemCount = useCartStore((state) => state.getCartItemCount);
  const itemCount = getCartItemCount();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 breakfast-gradient rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">晨</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">晨光早餐店</h1>
            <p className="text-xs text-muted-foreground">Morning Light Cafe</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            首頁
          </Link>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors">
            餐點菜單
          </Link>
          <Link to="/order-status" className="text-foreground hover:text-primary transition-colors">
            訂單查詢
          </Link>
        </nav>

        <Link to="/cart">
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="w-4 h-4 mr-2" />
            購物車
            {itemCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
