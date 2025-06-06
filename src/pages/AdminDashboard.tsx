
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  LogOut,
  Clock,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 檢查登入狀態
    const isLoggedIn = localStorage.getItem('adminAuth');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }

    // 更新時間
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: "已登出",
      description: "感謝您的使用",
    });
    navigate('/admin/login');
  };

  // 模擬統計資料
  const stats = {
    todayOrders: 23,
    todayRevenue: 2850,
    pendingOrders: 5,
    totalCustomers: 156
  };

  // 模擬最近訂單
  const recentOrders = [
    { id: 'ORD001', customer: '王小明', total: 185, status: 'preparing', time: '10:30' },
    { id: 'ORD002', customer: '李小華', total: 95, status: 'ready', time: '10:25' },
    { id: 'ORD003', customer: '陳大同', total: 240, status: 'pending', time: '10:20' },
    { id: 'ORD004', customer: '張美玲', total: 120, status: 'completed', time: '10:15' },
    { id: 'ORD005', customer: '林志明', total: 85, status: 'pending', time: '10:10' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">已接單</Badge>;
      case 'preparing':
        return <Badge className="bg-orange-500">製作中</Badge>;
      case 'ready':
        return <Badge className="bg-green-500">可取餐</Badge>;
      case 'completed':
        return <Badge variant="outline">已完成</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient">管理後台</h1>
            <p className="text-muted-foreground">晨光早餐店 管理系統</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">當前時間</p>
              <p className="font-semibold">{currentTime.toLocaleString('zh-TW')}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              登出
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 統計卡片 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日訂單</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayOrders}</div>
              <p className="text-xs text-muted-foreground">
                +12% 較昨日
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日營收</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NT$ {stats.todayRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% 較昨日
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待處理訂單</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">
                需要立即處理
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總顧客數</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                本月新增 23 位
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 最近訂單 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                最近訂單
                <Link to="/admin/orders">
                  <Button variant="outline" size="sm">查看全部</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.customer} • {order.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">NT$ {order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/admin/orders">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Package className="w-6 h-6 mb-2" />
                    訂單管理
                  </Button>
                </Link>
                
                <Link to="/admin/products">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <ShoppingBag className="w-6 h-6 mb-2" />
                    商品管理
                  </Button>
                </Link>
                
                <Link to="/admin/analytics">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    營收分析
                  </Button>
                </Link>
                
                <Button variant="outline" className="w-full h-20 flex flex-col">
                  <Users className="w-6 h-6 mb-2" />
                  顧客管理
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
