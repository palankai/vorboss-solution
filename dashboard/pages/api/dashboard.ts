// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ensureBackend } from '../../src/backend/backend';
import { Dashboard, DashboardResponse } from '../../src/dashboard';
import { buildDashboard } from '../../src/backend/dashboardBuilder';
import { ensureError } from '../../src/base';

export default async function handler(req: NextApiRequest, res: NextApiResponse<DashboardResponse>) {
  try {
    const response = await loadDashboard();
    res.status(200).json({ dashboard: response });
  } catch (ex) {
    res.status(500).json({ error: ensureError(ex).toString() });
  }
}

async function loadDashboard(): Promise<Dashboard> {
  const backend = await ensureBackend();
  try {
    const start = performance.now();
    const dashboard: Dashboard = await buildDashboard(backend);
    const end = performance.now();
    backend.observer.airtableDataFetched({
      numRecords: dashboard.totalOrderNumber,
      timeSpentMS: end - start,
    });
    return dashboard;
  } catch (ex) {
    backend.observer.errorWhileFetchingData({ error: ensureError(ex) });
    throw ex;
  }
}
