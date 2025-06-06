
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const customerName = searchParams.get('name');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const pickupTime = new Date(currentTime.getTime() + 20 * 60 * 1000); // 20分鐘後

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-4">找不到訂單資訊</h2>
              <Link to="/products">
                <Button className="btn-primary">返回選購</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 成功訊息 */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-green-800 mb-2">
                訂單成功！
              </h1>
              <p className="text-green-700">
                感謝您的訂購，我們正在為您準備美味的早餐
              </p>
            </CardContent>
          </Card>

          {/* 訂單資訊 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>訂單詳情</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">訂單編號</p>
                  <p className="text-2xl font-bold text-primary">{orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">顧客姓名</p>
                  <p className="text-lg font-semibold">{customerName || '顧客'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">訂購時間</p>
                  <p className="font-medium">{currentTime.toLocaleString('zh-TW')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">預計取餐時間</p>
                  <p className="font-medium text-primary">{pickupTime.toLocaleString('zh-TW')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 店家資訊 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>店家資訊</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">地址</p>
                  <p className="text-muted-foreground">台北市中山區民生東路123號</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">聯絡電話</p>
                  <p className="text-muted-foreground">02-1234-5678</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">營業時間</p>
                  <p className="text-muted-foreground">每日 06:00 - 14:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 操作按鈕 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`/order-status?orderId=${orderId}`} className="flex-1">
              <Button variant="outline" className="w-full">
                查看訂單狀態
              </Button>
            </Link>
            <Link to="/products" className="flex-1">
              <Button className="w-full btn-primary">
                繼續訂購
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
