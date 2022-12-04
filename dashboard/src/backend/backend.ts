import { AirtableOrderRepository, ConsoleObserver } from './adapters';
import { Clock } from '../base';
import { OrderRepository } from '../dashboard';
import { DashboardBuilderObserver } from './dashboardBuilder';

export interface Backend {
  clock: Clock;
  orders: OrderRepository;
  orderLimit: number;
  observer: DashboardBuilderObserver;
}

export async function ensureBackend(): Promise<Backend> {
  const airtableSecretKey = process.env.AIRTABLE_SECRET_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (airtableSecretKey == undefined) {
    throw new Error('Missing Airtable Secret Key');
  }
  if (baseId == undefined) {
    throw new Error('Missing Airtable Base ID');
  }
  const observer = new ConsoleObserver();
  const backend: Backend = {
    clock: new Clock(),
    orders: new AirtableOrderRepository(airtableSecretKey, baseId),
    orderLimit: 10,
    observer,
  };

  return backend;
}
