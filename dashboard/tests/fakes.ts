import { DashboardBuilderObserver } from '../src/backend/dashboardBuilder';
import { Datetime } from '../src/base';
import { Order, OrderRepository } from '../src/dashboard';

export class FakeOrderRepository implements OrderRepository {
  orders: Order[];

  constructor(orders: Order[]) {
    this.orders = orders;
  }

  async *listAllOrders(): AsyncGenerator<Order, any, unknown> {
    for (const order of this.orders) {
      yield order;
    }
  }
}

export class FakeDatetime implements Datetime {
  date: Date;

  constructor(date?: Date) {
    this.date = date || new Date();
  }

  year(): number {
    return this.date.getFullYear();
  }
  month(): number {
    return this.date.getMonth();
  }
}

export class FakeDashboardBuilderObserver implements DashboardBuilderObserver {
  async airtableDataFetched(params: { numRecords: number }): Promise<void> {}
  async errorWhileFetchingData(params: { error: Error }): Promise<void> {}
}
