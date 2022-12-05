import { Order } from '../src/dashboard';
import { LastMonthOrderCounter, RecentOrders, StatusCounter, TotalRevenueAggregate } from '../src/backend/filters';
import { FakeDatetime } from './fakes';
import { makeOrder } from './makers';

describe('LastMonthOrderCountFilter', () => {
  test('Without order', () => {
    const filter = new LastMonthOrderCounter(new Date('2022-12-25'));

    expect(filter.numberOfOrders()).toEqual(0);
  });

  test('With a matching order', () => {
    const filter = new LastMonthOrderCounter(new Date('2022-12-25'));

    const order: Order = makeOrder({
      orderPlaced: new Date('2022-12-25'),
    });
    filter.update(order);

    expect(filter.numberOfOrders()).toEqual(1);
  });

  test('With a non matching order', () => {
    const filter = new LastMonthOrderCounter(new Date('2022-03-25'));

    const order: Order = makeOrder({
      orderPlaced: new Date('2022-12-25'),
    });
    filter.update(order);

    expect(filter.numberOfOrders()).toEqual(0);
  });

  test('With a multiple orders', () => {
    const filter = new LastMonthOrderCounter(new Date('2022-04-29'));

    filter.update(makeOrder({ orderPlaced: new Date('2022-12-25') }));
    filter.update(makeOrder({ orderPlaced: new Date('2022-04-25') }));
    filter.update(makeOrder({ orderPlaced: new Date('2022-04-25') }));
    filter.update(makeOrder({ orderPlaced: new Date('2022-04-25') }));
    filter.update(makeOrder({ orderPlaced: new Date('2022-12-25') }));

    expect(filter.numberOfOrders()).toEqual(3);
  });
});

describe('StatusCounter', () => {
  test('Without order', () => {
    const filter = new StatusCounter('shipped');

    expect(filter.numberOfOrders()).toEqual(0);
  });

  test('With a matching order', () => {
    const filter = new StatusCounter('shipped');

    const order: Order = makeOrder({
      status: 'shipped',
    });
    filter.update(order);

    expect(filter.numberOfOrders()).toEqual(1);
  });

  test('With a non matching order', () => {
    const filter = new StatusCounter('shipped');

    const order: Order = makeOrder({
      status: 'placed',
    });
    filter.update(order);

    expect(filter.numberOfOrders()).toEqual(0);
  });

  test('With a multiple orders', () => {
    const filter = new StatusCounter('shipped');

    filter.update(makeOrder({ status: 'placed' }));
    filter.update(makeOrder({ status: 'shipped' }));
    filter.update(makeOrder({ status: 'shipped' }));
    filter.update(makeOrder({ status: 'shipped' }));
    filter.update(makeOrder({ status: 'placed' }));

    expect(filter.numberOfOrders()).toEqual(3);
  });
});

describe('TotalRevenueAggregate', () => {
  test('Without order', () => {
    const filter = new TotalRevenueAggregate();

    expect(filter.revenue()).toEqual('0.00');
  });

  test('With a single order', () => {
    const filter = new TotalRevenueAggregate();

    const order: Order = makeOrder({
      price: '12.33',
    });
    filter.update(order);

    expect(filter.revenue()).toEqual('12.33');
  });

  test('With a multiple orders', () => {
    const filter = new TotalRevenueAggregate();

    filter.update(makeOrder({ price: '1.33' }));
    filter.update(makeOrder({ price: '2.33' }));
    filter.update(makeOrder({ price: '3.33' }));
    filter.update(makeOrder({ price: '4.33' }));

    expect(filter.revenue()).toEqual('11.32');
  });
});

describe('RecentOrders', () => {
  test('Without order', () => {
    const filter = new RecentOrders(3);

    expect(filter.orders()).toHaveLength(0);
  });

  test('With a less than a limit orders', () => {
    const filter = new RecentOrders(3);

    filter.update(makeOrder());
    filter.update(makeOrder());

    expect(filter.orders()).toHaveLength(2);
  });

  test('With matching number of orders', () => {
    const filter = new RecentOrders(3);

    filter.update(makeOrder());
    filter.update(makeOrder());
    filter.update(makeOrder());

    expect(filter.orders()).toHaveLength(3);
  });

  test('With more orders', () => {
    const filter = new RecentOrders(3);

    filter.update(makeOrder({ price: '12.33' }));
    filter.update(makeOrder({ price: '12.33' }));
    filter.update(makeOrder({ price: '12.33' }));
    filter.update(makeOrder({ price: '12.33' }));
    filter.update(makeOrder({ price: '12.33' }));
    filter.update(makeOrder({ price: '12.33' }));
    filter.update(makeOrder({ price: '33.12' }));

    expect(filter.orders()).toHaveLength(3);
    expect(filter.orders()[0].price).toEqual('33.12');
  });
});
