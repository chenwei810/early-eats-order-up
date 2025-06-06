
import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const categories = [
    { id: 'burger', name: '漢堡類', icon: '🍔', count: products.filter(p => p.category === 'burger').length },
    { id: 'sandwich', name: '三明治', icon: '🥪', count: products.filter(p => p.category === 'sandwich').length },
    { id: 'drink', name: '飲料', icon: '☕', count: products.filter(p => p.category === 'drink').length },
    { id: 'dessert', name: '點心', icon: '🧁', count: products.filter(p => p.category === 'dessert').length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-breakfast-100 via-breakfast-50 to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient animate-fade-in">
              晨光早餐店
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
              新鮮現做 • 溫暖美味 • 每一口都是幸福的滋味
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/products">
                <Button size="lg" className="btn-primary text-lg px-8 py-4">
                  立即訂購
                </Button>
              </Link>
              <Link to="/order-status">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  查詢訂單
                </Button>
              </Link>
            </div>
            
            {/* Store Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">營業時間</p>
                    <p className="text-sm text-muted-foreground">06:00 - 14:00</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">訂購專線</p>
                    <p className="text-sm text-muted-foreground">02-1234-5678</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">店面地址</p>
                    <p className="text-sm text-muted-foreground">台北市中山區</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">精選分類</h2>
            <p className="text-muted-foreground text-lg">
              探索我們豐富多樣的早餐選擇
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/products?category=${category.id}`}>
                <Card className="card-hover cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <Badge variant="secondary">
                      {category.count} 項商品
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">熱門推薦</h2>
            <p className="text-muted-foreground text-lg">
              顧客最愛的經典美味
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="btn-primary">
                查看完整菜單
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-coffee-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">晨光早餐店</h3>
              <p className="text-coffee-200 mb-4">
                提供最新鮮、最美味的早餐，讓您的每一天都從美好開始。
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">營業資訊</h3>
              <div className="space-y-2 text-coffee-200">
                <p>營業時間：06:00 - 14:00</p>
                <p>電話：02-1234-5678</p>
                <p>地址：台北市中山區民生東路123號</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">快速連結</h3>
              <div className="space-y-2">
                <Link to="/products" className="block text-coffee-200 hover:text-white transition-colors">
                  線上訂購
                </Link>
                <Link to="/order-status" className="block text-coffee-200 hover:text-white transition-colors">
                  訂單查詢
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-coffee-600 mt-8 pt-8 text-center text-coffee-300">
            <p>&copy; 2024 晨光早餐店. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
