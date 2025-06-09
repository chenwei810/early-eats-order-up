
import { create } from 'zustand';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  items: OrderItem[];
  createdAt: string;
  notes?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],

  addOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now()}`,
      createdAt: new Date().toLocaleString('zh-TW'),
      status: 'pending'
    };

    set((state) => ({
      orders: [newOrder, ...state.orders]
    }));
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    }));
  },

  getOrderById: (orderId) => {
    const { orders } = get();
    return orders.find(order => order.id === orderId);
  }
}));
