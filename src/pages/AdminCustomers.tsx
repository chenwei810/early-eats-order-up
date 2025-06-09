
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Mail, Phone, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const AdminCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminAuth');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }

    // 模擬顧客資料
    const mockCustomers: Customer[] = [
      {
        id: 'C001',
        name: '王小明',
        email: 'wang@example.com',
        phone: '0912-345-678',
        totalOrders: 15,
        totalSpent: 2250,
        lastOrderDate: '2024-06-09',
        status: 'active',
        joinDate: '2024-03-15'
      },
      {
        id: 'C002',
        name: '李小華',
        email: 'lee@example.com',
        phone: '0923-456-789',
        totalOrders: 8,
        totalSpent: 1420,
        lastOrderDate: '2024-06-08',
        status: 'active',
        joinDate: '2024-04-20'
      },
      {
        id: 'C003',
        name: '陳大同',
        email: 'chen@example.com',
        phone: '0934-567-890',
        totalOrders: 22,
        totalSpent: 3680,
        lastOrderDate: '2024-06-09',
        status: 'active',
        joinDate: '2024-02-10'
      },
      {
        id: 'C004',
        name: '張美玲',
        email: 'zhang@example.com',
        phone: '0945-678-901',
        totalOrders: 5,
        totalSpent: 750,
        lastOrderDate: '2024-05-25',
        status: 'inactive',
        joinDate: '2024-05-01'
      },
      {
        id: 'C005',
        name: '林志明',
        email: 'lin@example.com',
        phone: '0956-789-012',
        totalOrders: 12,
        totalSpent: 1890,
        lastOrderDate: '2024-06-07',
        status: 'active',
        joinDate: '2024-03-28'
      }
    ];
    setCustomers(mockCustomers);
  }, [navigate]);

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return customer.name.toLowerCase().includes(searchLower) ||
           customer.email.toLowerCase().includes(searchLower) ||
           customer.phone.includes(searchTerm);
  });

  const getCustomerLevel = (totalSpent: number) => {
    if (totalSpent >= 3000) return { level: 'VIP', color: 'bg-yellow-500 text-white' };
    if (totalSpent >= 1500) return { level: '金牌', color: 'bg-orange-500 text-white' };
    if (totalSpent >= 500) return { level: '銀牌', color: 'bg-gray-400 text-white' };
    return { level: '一般', color: 'bg-gray-200 text-gray-800' };
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpentPerCustomer = totalRevenue / totalCustomers;

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
            <h1 className="text-3xl font-bold text-gradient">顧客管理</h1>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">{totalCustomers}</div>
              <p className="text-sm text-gray-600">總顧客數</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
              <p className="text-sm text-gray-600">活躍顧客</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">NT$ {totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-gray-600">總消費金額</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">NT$ {Math.round(avgSpentPerCustomer).toLocaleString()}</div>
              <p className="text-sm text-gray-600">平均消費</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6 bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜尋顧客姓名、電話或Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">顧客列表 ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700">顧客資訊</TableHead>
                  <TableHead className="text-gray-700">聯絡方式</TableHead>
                  <TableHead className="text-gray-700">訂單統計</TableHead>
                  <TableHead className="text-gray-700">消費金額</TableHead>
                  <TableHead className="text-gray-700">顧客等級</TableHead>
                  <TableHead className="text-gray-700">最後訂單</TableHead>
                  <TableHead className="text-gray-700">狀態</TableHead>
                  <TableHead className="text-gray-700">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const customerLevel = getCustomerLevel(customer.totalSpent);
                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="text-gray-900">
                          <p className="font-semibold">{customer.name}</p>
                          <p className="text-sm text-gray-600">ID: {customer.id}</p>
                          <p className="text-xs text-gray-500">加入: {customer.joinDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">
                          <div className="flex items-center space-x-1 mb-1">
                            <Mail className="w-3 h-3 text-gray-500" />
                            <span className="text-sm">{customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-gray-500" />
                            <span className="text-sm">{customer.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">
                        <div className="text-center">
                          <p className="font-semibold text-lg">{customer.totalOrders}</p>
                          <p className="text-xs text-gray-500">筆訂單</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">
                        NT$ {customer.totalSpent.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={customerLevel.color}>
                          {customerLevel.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{customer.lastOrderDate}</TableCell>
                      <TableCell>
                        {customer.status === 'active' ? (
                          <Badge className="bg-green-500 text-white">活躍</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">非活躍</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCustomers;
