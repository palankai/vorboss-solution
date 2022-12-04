export interface Order {
  orderId: string;
  orderPlaced: Date;
  productName: string;
  price: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  status: string;
}

export interface Dashboard {
  totalOrderNumber: number;
  totalOrderNumberThisMonth: number;
  numberOfOrdersInProgress: number;
  totalRevenue: string;
  mostRecentOrders: Order[];
}

export interface DashboardResponse {
  dashboard?: Dashboard;
  error?: string;
}

export interface OrderRepository {
  listAllOrders(): AsyncGenerator<Order>;
}
