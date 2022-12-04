import { Clock } from '../src/base';
import { Order } from '../src/dashboard';
import { buildDashboard, buildDashboardParams } from '../src/backend/dashboardBuilder';
import { FakeDashboardBuilderObserver, FakeDatetime, FakeOrderRepository } from './fakes';
import { makeOrder } from './makers';

function ensureBuildDashboardParams(overrides?: {
  orders?: Order[];
  date?: Date;
  orderLimit?: number;
}): buildDashboardParams {
  const repo = new FakeOrderRepository(overrides?.orders || []);
  const clock = new Clock(overrides?.date);
  const observer = new FakeDashboardBuilderObserver();
  return {
    orders: repo,
    clock: clock,
    orderLimit: overrides?.orderLimit || 3,
    observer,
  };
}

test('DashboardBuilder if there are no orders', async () => {
  const dashboard = await buildDashboard(ensureBuildDashboardParams());

  expect(dashboard.totalOrderNumber).toEqual(0);
  expect(dashboard.totalOrderNumberThisMonth).toEqual(0);
  expect(dashboard.totalRevenue).toEqual('0.00');
  expect(dashboard.numberOfOrdersInProgress).toEqual(0);
  expect(dashboard.mostRecentOrders).toHaveLength(0);
});

test('DashboardBuilder with a single order', async () => {
  const singleOrder: Order = makeOrder({
    orderPlaced: new Date('2022-12-25'),
    price: '12.33',
    status: 'in_progress',
  });

  const dashboard = await buildDashboard(
    ensureBuildDashboardParams({
      date: new Date('2022-12-31'),
      orders: [singleOrder],
    }),
  );

  expect(dashboard.totalOrderNumber).toEqual(1);
  expect(dashboard.totalOrderNumberThisMonth).toEqual(1);
  expect(dashboard.totalRevenue).toEqual('12.33');
  expect(dashboard.numberOfOrdersInProgress).toEqual(1);
  expect(dashboard.mostRecentOrders).toHaveLength(1);
});

test('DashboardBuilder multiple orders', async () => {
  const dashboard = await buildDashboard(
    ensureBuildDashboardParams({
      date: new Date('2022-12-31'),
      orderLimit: 3,
      orders: [
        makeOrder({
          orderPlaced: new Date('2022-08-25'),
          price: '1.00',
          status: 'shipped',
        }),
        makeOrder({
          orderPlaced: new Date('2022-09-25'),
          price: '1.00',
          status: 'shipped',
        }),
        makeOrder({
          orderPlaced: new Date('2022-10-25'),
          price: '1.00',
          status: 'shipped',
        }),
        makeOrder({
          orderPlaced: new Date('2022-11-25'),
          price: '1.00',
          status: 'in_progress',
        }),
        makeOrder({
          orderPlaced: new Date('2022-12-25'),
          price: '1.00',
          status: 'in_progress',
        }),
      ],
    }),
  );

  expect(dashboard.totalOrderNumber).toEqual(5);
  expect(dashboard.totalOrderNumberThisMonth).toEqual(1);
  expect(dashboard.totalRevenue).toEqual('5.00');
  expect(dashboard.numberOfOrdersInProgress).toEqual(2);
  expect(dashboard.mostRecentOrders).toHaveLength(3);
});
