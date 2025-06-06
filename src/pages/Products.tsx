
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { ProductCategory } from '@/types';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  useEffect(() => {
    const category = searchParams.get('category') as ProductCategory;
    if (category && ['burger', 'sandwich', 'drink', 'dessert'].includes(category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all' as ProductCategory, name: '全部商品', icon: '🍽️' },
    { id: 'burger' as ProductCategory, name: '漢堡類', icon: '🍔' },
    { id: 'sandwich' as ProductCategory, name: '三明治', icon: '🥪' },
    { id: 'drink' as ProductCategory, name: '飲料', icon: '☕' },
    { id: 'dessert' as ProductCategory, name: '點心', icon: '🧁' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient">美味菜單</h1>
          <p className="text-gray-600 text-lg">
            精心準備的新鮮早餐，滿足您的味蕾
          </p>
        </div>

        {/* Category Filter */}
        <Card className="mb-8 bg-white border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">商品分類</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "flex items-center space-x-2 bg-orange-500 text-white hover:bg-orange-600" 
                    : "flex items-center space-x-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              此分類暫無商品
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
