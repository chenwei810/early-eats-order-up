
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Phone, Star, Utensils, Coffee, Cake } from 'lucide-react';
import Header from '@/components/Header';

const Index = () => {
  const features = [
    {
      icon: <Utensils className="w-8 h-8 text-blue-500" />,
      title: "新鮮食材",
      description: "每日嚴選優質食材，確保每一口都是最佳品質"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "快速出餐",
      description: "平均15分鐘完成製作，讓您不必久等"
    },
    {
      icon: <Coffee className="w-8 h-8 text-blue-500" />,
      title: "香醇咖啡",
      description: "精選咖啡豆現煮，為您開啟美好一天"
    }
  ];

  const popularItems = [
    {
      name: "招牌蛋餅",
      description: "酥脆餅皮配上嫩滑雞蛋",
      price: "NT$ 45",
      rating: 4.8
    },
    {
      name: "燻雞總匯三明治",
      description: "豐富配料，營養滿分",
      price: "NT$ 85",
      rating: 4.9
    },
    {
      name: "經典奶茶",
      description: "香濃奶茶，溫暖人心",
      price: "NT$ 35",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              晨光早餐店
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              每天為您準備最美味的早餐
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              從經典台式早餐到創意料理，我們用心製作每一份餐點，讓您的一天從美好的味覺體驗開始
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <Button className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                  立即點餐
                </Button>
              </Link>
              <Link to="/order-status">
                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 text-lg px-8 py-4 rounded-lg font-semibold">
                  查詢訂單
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              為什麼選擇我們？
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              我們致力於提供最優質的早餐體驗
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              人氣推薦
            </h2>
            <p className="text-gray-600 text-lg">
              顧客最愛的經典餐點
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {popularItems.map((item, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                    {item.name}
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-500">{item.price}</span>
                    <Link to="/products">
                      <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                        點餐
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              店家資訊
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">營業時間</h3>
              <p className="text-gray-600">
                週一至週日<br />
                06:00 - 14:00
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">店家地址</h3>
              <p className="text-gray-600">
                台北市中正區<br />
                早餐街123號
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">聯絡電話</h3>
              <p className="text-gray-600">
                (02) 1234-5678
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">晨</span>
            </div>
            <h3 className="text-xl font-bold">晨光早餐店</h3>
          </div>
          <p className="text-gray-400">
            © 2024 晨光早餐店 Morning Light Cafe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
