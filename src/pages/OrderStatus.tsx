
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Clock, CheckCircle, Package, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { toast } from '@/hooks/use-toast';

const OrderStatus = () => {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';
  
  const [orderId, setOrderId] = useState(initialOrderId);
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 模擬訂單資料
  const mockOrderData = {
    id: orderId,
    customerName: '王先生',
    customerPhone: '0912345678',
    status: 'preparing',
    createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10分鐘前
    pickupTime: new Date(Date.now() + 10 * 60 * 1000), // 10分鐘後
    items: [
      { name: '經典牛肉漢堡', quantity: 2, price: 120 },
      { name: '美式咖啡', quantity: 1, price: 45 },
    ],
    total: 285,
    notes: '不要洋蔥，謝謝'
  };

  const handleSearch = async () => {
    if (!orderId.trim()) {
      toast({
        title: "請輸入訂單編號",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // 模擬 API 查詢
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (orderId.startsWith('ORD')) {
        setOrderData(mockOrderData);
      } else {
        setOrderData(null);
        toast({
          title: "找不到訂單",
          description: "請確認訂單編號是否正確",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "查詢失敗",
        description: "請稍後再試",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          label: '已接單', 
          color: 'bg-primary', 
          icon: Clock,
          description: '您的訂單已確認，準備開始製作'
        };
      case 'preparing':
        return { 
          label: '製作中', 
          color: 'bg-blue-600', 
          icon: Coffee,
          description: '我們正在為您精心製作美味餐點'
        };
      case 'ready':
        return { 
          label: '可取餐', 
          color: 'bg-blue-700', 
          icon: Package,
          description: '您的餐點已準備完成，請前來取餐'
        };
      case 'completed':
        return { 
          label: '已完成', 
          color: 'bg-gray-500', 
          icon: CheckCircle,
          description: '訂單已完成，感謝您的光臨'
        };
      default:
        return { 
          label: '未知狀態', 
          color: 'bg-gray-500', 
          icon: Clock,
          description: ''
        };
    }
  };

  // 如果有初始訂單編號，自動查詢
  useState(() => {
    if (initialOrderId) {
      handleSearch();
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gradient">訂單查詢</h1>
          
          {/* 搜尋表單 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>查詢訂單狀態</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="orderId" className="sr-only">訂單編號</Label>
                  <Input
                    id="orderId"
                    placeholder="請輸入訂單編號 (例：ORD1234567890)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isLoading ? '查詢中...' : '查詢'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 訂單結果 */}
          {orderData && (
            <div className="space-y-6">
              {/* 訂單狀態 */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="mb-4">
                      {(() => {
                        const statusInfo = getStatusInfo(orderData.status);
                        const IconComponent = statusInfo.icon;
                        return (
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${statusInfo.color} text-white mb-4`}>
                            <IconComponent className="w-8 h-8" />
                          </div>
                        );
                      })()}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {getStatusInfo(orderData.status).label}
                    </h2>
                    <p className="text-muted-foreground">
                      {getStatusInfo(orderData.status).description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 訂單詳情 */}
              <Card>
                <CardHeader>
                  <CardTitle>訂單詳情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">訂單編號</p>
                      <p className="font-semibold">{orderData.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">顧客姓名</p>
                      <p className="font-semibold">{orderData.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">訂購時間</p>
                      <p className="font-semibold">{orderData.createdAt.toLocaleString('zh-TW')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">預計取餐時間</p>
                      <p className="font-semibold text-primary">{orderData.pickupTime.toLocaleString('zh-TW')}</p>
                    </div>
                  </div>

                  {/* 訂單項目 */}
                  <div className="space-y-2">
                    <p className="font-semibold">訂購項目</p>
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground ml-2">x {item.quantity}</span>
                        </div>
                        <span className="font-semibold">NT$ {item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 text-lg font-bold">
                      <span>總計</span>
                      <span className="text-primary">NT$ {orderData.total}</span>
                    </div>
                  </div>

                  {/* 備註 */}
                  {orderData.notes && (
                    <div>
                      <p className="font-semibold">備註</p>
                      <p className="text-muted-foreground">{orderData.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
