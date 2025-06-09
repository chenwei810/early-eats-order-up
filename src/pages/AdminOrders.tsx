
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useOrderStore, Order } from '@/store/orderStore';

const AdminOrders = () => {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminAuth');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-secondary text-secondary-foreground">已接單</Badge>;
      case 'preparing':
        return <Badge className="bg-primary text-primary-foreground">製作中</Badge>;
      case 'ready':
        return <Badge className="bg-primary text-primary-foreground">可取餐</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-border text-foreground">已完成</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">已取消</Badge>;
      default:
        return <Badge variant="outline" className="border-border text-foreground">未知</Badge>;
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-accent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回儀表板
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gradient">訂單管理</h1>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋訂單編號或顧客姓名..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="篩選狀態" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
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
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">訂單列表 ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {orders.length === 0 ? '暫無訂單' : '找不到符合條件的訂單'}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">訂單編號</TableHead>
                    <TableHead className="text-foreground">顧客資訊</TableHead>
                    <TableHead className="text-foreground">訂單內容</TableHead>
                    <TableHead className="text-foreground">金額</TableHead>
                    <TableHead className="text-foreground">狀態</TableHead>
                    <TableHead className="text-foreground">訂單時間</TableHead>
                    <TableHead className="text-foreground">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-foreground">{order.id}</TableCell>
                      <TableCell>
                        <div className="text-foreground">
                          <p className="font-semibold">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-foreground">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-sm">
                              {item.name} x{item.quantity}
                            </p>
                          ))}
                          {order.notes && (
                            <p className="text-xs text-primary mt-1">備註: {order.notes}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">NT$ {order.total}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{order.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleUpdateOrderStatus(order.id, value as Order['status'])}
                          >
                            <SelectTrigger className="w-32 bg-background border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover">
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;
