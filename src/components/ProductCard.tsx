
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "加入購物車成功！",
      description: `${product.name} 已加入購物車`,
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      burger: '漢堡',
      sandwich: '三明治',
      drink: '飲料',
      dessert: '點心'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <Card className="card-hover group">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge 
            className="absolute top-2 left-2 bg-primary text-primary-foreground"
          >
            {getCategoryLabel(product.category)}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              NT$ {product.price}
            </span>
            {!product.available && (
              <Badge variant="destructive">暫時缺貨</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={!product.available}
          className="w-full btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          加入購物車
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
