
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Edit, Trash2, Image, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'burger' | 'sandwich' | 'drink' | 'dessert';
  available: boolean;
  image: string;
}

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminAuth');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }

    // 模擬商品資料
    const mockProducts: Product[] = [
      {
        id: 'P001',
        name: '招牌漢堡',
        description: '新鮮牛肉、生菜、番茄、特製醬料',
        price: 120,
        category: 'burger',
        available: true,
        image: '/placeholder.svg'
      },
      {
        id: 'P002',
        name: '火腿三明治',
        description: '優質火腿、新鮮蔬菜、吐司',
        price: 80,
        category: 'sandwich',
        available: true,
        image: '/placeholder.svg'
      },
      {
        id: 'P003',
        name: '美式咖啡',
        description: '精選咖啡豆現煮',
        price: 65,
        category: 'drink',
        available: true,
        image: '/placeholder.svg'
      },
      {
        id: 'P004',
        name: '起司蛋糕',
        description: '手工製作起司蛋糕',
        price: 90,
        category: 'dessert',
        available: false,
        image: '/placeholder.svg'
      }
    ];
    setProducts(mockProducts);
  }, [navigate]);

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'burger': return '漢堡類';
      case 'sandwich': return '三明治';
      case 'drink': return '飲料';
      case 'dessert': return '點心';
      default: return '未知';
    }
  };

  const toggleProductAvailability = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, available: !product.available } : product
    ));
    const product = products.find(p => p.id === productId);
    toast({
      title: "商品狀態已更新",
      description: `${product?.name} 已${product?.available ? '下架' : '上架'}`,
    });
  };

  const deleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "商品已刪除",
      description: `${product?.name} 已從菜單中移除`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
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
            <h1 className="text-3xl font-bold text-gradient">商品管理</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Home className="w-4 h-4 mr-2" />
                客戶介面
              </Button>
            </Link>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              新增商品
            </Button>
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
                    placeholder="搜尋商品名稱或描述..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-300"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="篩選分類" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">全部分類</SelectItem>
                    <SelectItem value="burger">漢堡類</SelectItem>
                    <SelectItem value="sandwich">三明治</SelectItem>
                    <SelectItem value="drink">飲料</SelectItem>
                    <SelectItem value="dessert">點心</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">商品列表 ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700">圖片</TableHead>
                  <TableHead className="text-gray-700">商品資訊</TableHead>
                  <TableHead className="text-gray-700">分類</TableHead>
                  <TableHead className="text-gray-700">價格</TableHead>
                  <TableHead className="text-gray-700">狀態</TableHead>
                  <TableHead className="text-gray-700">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-300 text-gray-700">
                        {getCategoryName(product.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900">NT$ {product.price}</TableCell>
                    <TableCell>
                      {product.available ? (
                        <Badge className="bg-green-500 text-white">上架中</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">已下架</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleProductAvailability(product.id)}
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          {product.available ? '下架' : '上架'}
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default AdminProducts;
