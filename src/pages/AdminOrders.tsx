
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  items: { name: string; quantity: number; price: number }[];
  createdAt: string;
  notes?: string;
}

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminAuth');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }

    // 模擬訂單資料
    const mockOrders: Order[] = [
      {
        id: 'ORD001',
        customer: '王小明',
        email: 'wang@example.com',
        phone: '0912-345-678',
        total: 185,
        status: 'preparing',
        items: [
          { name: '招牌漢堡', quantity: 1, price: 120 },
          { name: '美式咖啡', quantity: 1, price: 65 }
        ],
        createdAt: '2024-06-09 10:30',
        notes: '不要洋蔥'
      },
      {
        id: 'ORD002',
        customer: '李小華',
        email: 'lee@example.com',
        phone: '0923-456-789',
        total: 95,
        status: 'ready',
        items: [
          { name: '火腿三明治', quantity: 1, price: 80 },
          { name: '柳橙汁', quantity: 1, price: 15 }
        ],
        createdAt: '2024-06-09 10:25'
      },
      {
        id: 'ORD003',
        customer: '陳大同',
        email: 'chen@example.com',
        phone: '0934-567-890',
        total: 240,
        status: 'pending',
        items: [
          { name: '總匯三明治', quantity: 2, price: 100 },
          { name: '拿鐵咖啡', quantity: 2, price: 70 }
        ],
        createdAt: '2024-06-09 10:20'
      },
      {
        id: 'ORD004',
        customer: '張美玲',
        email: 'zhang@example.com',
        phone: '0945-678-901',
        total: 120,
        status: 'completed',
        items: [
          { name: '蛋餅', quantity: 1, price: 45 },
          { name: '奶茶', quantity: 1, price: 75 }
        ],
        createdAt: '2024-06-09 10:15'
      }
    ];
    setOrders(mockOrders);
  }, [navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">已接單</Badge>;
      case 'preparing':
        return <Badge className="bg-orange-500 text-white">製作中</Badge>;
      case 'ready':
        return <Badge className="bg-green-500 text-white">可取餐</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-gray-300 text-gray-700">已完成</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">已取消</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-300 text-gray-700">未知</Badge>;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "訂單狀態已更新",
      description: `訂單 ${orderId} 狀態已更新為${getStatusText(newStatus)}`,
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '已接單';
      case 'preparing': return '製作中';
      case 'ready': return '可取餐';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回儀表板
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gradient">訂單管理</h1>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="搜尋訂單編號或顧客姓名..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-300"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="篩選狀態" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">全部狀態</SelectItem>
                    <SelectItem value="pending">已接單</SelectItem>
                    <SelectItem value="preparing">製作中</SelectItem>
                    <SelectItem value="ready">可取餐</SelectItem>
                    <SelectItem value="completed">已完成</SelectItem>
                    <SelectItem value="cancelled">已取消</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">訂單列表 ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700">訂單編號</TableHead>
                  <TableHead className="text-gray-700">顧客資訊</TableHead>
                  <TableHead className="text-gray-700">訂單內容</TableHead>
                  <TableHead className="text-gray-700">金額</TableHead>
                  <TableHead className="text-gray-700">狀態</TableHead>
                  <TableHead className="text-gray-700">訂單時間</TableHead>
                  <TableHead className="text-gray-700">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-gray-900">{order.id}</TableCell>
                    <TableCell>
                      <div className="text-gray-900">
                        <p className="font-semibold">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm">
                            {item.name} x{item.quantity}
                          </p>
                        ))}
                        {order.notes && (
                          <p className="text-xs text-orange-600 mt-1">備註: {order.notes}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900">NT$ {order.total}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-gray-600">{order.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                        >
                          <SelectTrigger className="w-32 bg-white border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="pending">已接單</SelectItem>
                            <SelectItem value="preparing">製作中</SelectItem>
                            <SelectItem value="ready">可取餐</SelectItem>
                            <SelectItem value="completed">已完成</SelectItem>
                            <SelectItem value="cancelled">已取消</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;
