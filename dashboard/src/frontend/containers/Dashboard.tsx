import useSWR from 'swr';

import { Dashboard, DashboardResponse } from '../../dashboard';
import OrderTable from '../components/OrderTable';
import StatCard from '../components/StatCard';
import StatBox from '../components/StatsBox';
import { formatPrice } from '../formats';

import styles from '../../../styles/Dashboard.module.css';
import Loading from '../components/Loading';
import Error from '../components/Error';

function useDashboardAPI() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(() => `/api/dashboard`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const dashboardResponse: DashboardResponse = data;

  if (dashboardResponse?.dashboard) {
    for (const order of dashboardResponse.dashboard.mostRecentOrders) {
      order.orderPlaced = new Date(order.orderPlaced);
    }
  }

  return {
    dashboard: dashboardResponse?.dashboard,
    isLoading: !error && !data,
    error: error || dashboardResponse?.error,
  };
}

const DashboardContainer = () => {
  const { dashboard, isLoading, error } = useDashboardAPI();

  if (isLoading) return <Loading />;
  if (error) {
    return <Error description={error} />;
  }

  return (
    <div className={styles.main}>
      <StatBox>
        <StatCard title="Total number of orders" value={dashboard!.totalOrderNumber.toString()} />
        <StatCard title="Orders of this month" value={dashboard!.totalOrderNumberThisMonth.toString()} />
        <StatCard title="Orders in progress" value={dashboard!.numberOfOrdersInProgress.toString()} />
        <StatCard title="Revenue" value={formatPrice(dashboard!.totalRevenue)} />
      </StatBox>
      <OrderTable orders={dashboard!.mostRecentOrders} />
    </div>
  );
};

export default DashboardContainer;
