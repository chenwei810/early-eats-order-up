
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import Header from '@/components/Header';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/hooks/use-toast';
import { CustomerInfo } from '@/types';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerInfo>();

  const onSubmit = async (data: CustomerInfo) => {
    setIsSubmitting(true);
    
    try {
      // 模擬提交訂單
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderId = `ORD${Date.now()}`;
      
      // 清空購物車
      clearCart();
      
      // 導向確認頁面
      navigate(`/order-confirmation?orderId=${orderId}&name=${encodeURIComponent(data.name)}`);
      
      toast({
        title: "訂單提交成功！",
        description: `訂單編號：${orderId}`,
      });
    } catch (error) {
      toast({
        title: "訂單提交失敗",
        description: "請稍後再試或聯繫客服",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-4">購物車是空的</h2>
              <p className="text-muted-foreground mb-6">
                請先選購商品再進行結帳
              </p>
              <Button onClick={() => navigate('/products')} className="btn-primary">
                開始選購
              </Button>
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gradient">結帳</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 顧客資訊表單 */}
            <Card>
              <CardHeader>
                <CardTitle>顧客資訊</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名 *</Label>
                    <Input
                      id="name"
                      {...register('name', { required: '請輸入姓名' })}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">電話號碼 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone', { 
                        required: '請輸入電話號碼',
                        pattern: {
                          value: /^09\d{8}$/,
                          message: '請輸入正確的手機號碼格式 (09xxxxxxxx)'
                        }
                      })}
                      placeholder="09xxxxxxxx"
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">備註</Label>
                    <Textarea
                      id="notes"
                      {...register('notes')}
                      placeholder="特殊要求或備註事項..."
                      rows={3}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full btn-primary text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '處理中...' : `確認訂購 NT$ ${cart.total}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* 訂單摘要 */}
            <Card>
              <CardHeader>
                <CardTitle>訂單摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          NT$ {item.product.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          NT$ {item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>總計</span>
                  <span className="text-primary">NT$ {cart.total}</span>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• 預計製作時間：15-20 分鐘</p>
                  <p>• 請準時前來取餐</p>
                  <p>• 如有問題請聯繫：02-1234-5678</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
