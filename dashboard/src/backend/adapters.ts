import Airtable, { FieldSet, Table, Record } from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';

import { Order, OrderRepository } from '../dashboard';
import { DashboardBuilderObserver } from './dashboardBuilder';

export class AirtableOrderRepository implements OrderRepository {
  private base: AirtableBase;

  constructor(apiKey: string, baseId: string) {
    this.base = new Airtable({ apiKey }).base(baseId);
  }

  async *listAllOrders(): AsyncGenerator<Order, any, unknown> {
    const query = await this.base('Orders').select({
      view: 'Grid view',
      sort: [{ field: 'order_placed', direction: 'asc' }],
    });
    const all = await query.all();
    for (const record of all) {
      const order: Order = {
        orderId: asString(record, 'order_id'),
        orderPlaced: new Date(asString(record, 'order_placed')),
        productName: asString(record, 'product_name'),
        price: asString(record, 'price'),
        firstName: asString(record, 'first_name'),
        lastName: asString(record, 'last_name'),
        address: asString(record, 'address'),
        email: asString(record, 'email'),
        status: asString(record, 'order_status'),
      };
      yield order;
    }
  }
}

function asString(record: Record<FieldSet>, field: string, def = ''): string {
  return record.fields[field]?.toString() || def;
}

export class ConsoleObserver implements DashboardBuilderObserver {
  async airtableDataFetched(params: { numRecords: number; timeSpentMS: number }): Promise<void> {
    console.log(
      `Data fetched (${(params.timeSpentMS / 1000).toFixed(2)}s) from Aritable, number of records: ${
        params.numRecords
      }`,
    );
  }
  async errorWhileFetchingData(params: { error: Error }): Promise<void> {
    console.log(`Error while fetching data: ${params.error}`);
  }
}
