import Decimal from 'decimal.js';
import { Clock, Datetime } from '../base';
import { Dashboard, Order, OrderRepository } from '../dashboard';
import { LastMonthOrderCounter, RecentOrders, StatusCounter, TotalRevenueAggregate } from './filters';

export interface DashboardBuilderObserver {
  airtableDataFetched(params: { numRecords: number; timeSpentMS: number }): Promise<void>;
  errorWhileFetchingData(params: { error: Error }): Promise<void>;
}

export interface buildDashboardParams {
  orders: OrderRepository;
  clock: Clock;
  orderLimit: number;
  observer: DashboardBuilderObserver;
}

export async function buildDashboard(params: buildDashboardParams): Promise<Dashboard> {
  let totalOrderNumber = 0;
  const lastMonthOrderCounter = new LastMonthOrderCounter(params.clock.date);
  const inProgressCounter = new StatusCounter('in_progress');
  const totalRevenueAggregate = new TotalRevenueAggregate();
  const recentOrders = new RecentOrders(params.orderLimit);

  for await (const order of params.orders.listAllOrders()) {
    totalOrderNumber += 1;
    lastMonthOrderCounter.update(order);
    inProgressCounter.update(order);
    totalRevenueAggregate.update(order);
    recentOrders.update(order);
  }

  const dashboard: Dashboard = {
    totalOrderNumber,
    totalOrderNumberThisMonth: lastMonthOrderCounter.value(),
    numberOfOrdersInProgress: inProgressCounter.value(),
    totalRevenue: totalRevenueAggregate.value(),
    mostRecentOrders: recentOrders.value(),
  };
  return dashboard;
}
