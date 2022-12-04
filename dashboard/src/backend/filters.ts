import Decimal from 'decimal.js';
import { Datetime } from '../base';
import { Order } from '../dashboard';

export class LastMonthOrderCounter {
  private counter: number;
  private year: number;
  private month: number;

  constructor(date: Date) {
    this.counter = 0;
    this.year = date.getFullYear();
    this.month = date.getMonth();
  }

  value(): number {
    return this.counter;
  }

  update(order: Order) {
    if (order.orderPlaced.getFullYear() == this.year && order.orderPlaced.getMonth() == this.month) {
      this.counter += 1;
    }
  }
}

export class StatusCounter {
  private counter: number;
  private status: string;

  constructor(status: string) {
    this.counter = 0;
    this.status = status;
  }

  value(): number {
    return this.counter;
  }

  update(order: Order) {
    if (order.status === this.status) {
      this.counter += 1;
    }
  }
}

export class TotalRevenueAggregate {
  private sum: Decimal;

  constructor() {
    this.sum = new Decimal(0);
  }

  value(): string {
    return this.sum.toFixed(2);
  }

  update(order: Order) {
    this.sum = Decimal.add(this.sum, new Decimal(order.price));
  }
}

export class RecentOrders {
  private orders: Order[];
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;
    this.orders = [];
  }

  value(): Order[] {
    return [...this.orders].reverse();
  }

  update(order: Order) {
    this.orders.push(order);
    if (this.orders.length > this.limit) {
      this.orders = this.orders.slice(-this.limit);
    }
  }
}
