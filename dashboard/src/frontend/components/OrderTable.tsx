import { Order } from '../../dashboard';
import { formatPrice } from '../formats';
import styles from '../../../styles/OrderTable.module.css';

const OrderRow = (props: { order: Order }) => (
  <tr className={styles.row}>
    <td className={styles.orderId}>{props.order.orderId}</td>
    <td className={styles.orderPlaced}>{props.order.orderPlaced.toLocaleDateString()}</td>
    <td className={styles.productName}>{props.order.productName}</td>
    <td className={styles.price}>{formatPrice(props.order.price)}</td>
    <td>{props.order.firstName}</td>
    <td>{props.order.lastName}</td>
    <td>{props.order.address}</td>
    <td>{props.order.email}</td>
    <td className={styles.status}>{props.order.status}</td>
  </tr>
);

const Header = () => (
  <thead>
    <tr>
      <th>Order ID</th>
      <th>Order Placed</th>
      <th>Product Name</th>
      <th>Price</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Address</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
);

const OrderTable = (props: { orders: Order[] }) => (
  <table className={styles.table}>
    <caption className={styles.caption}>Recent orders</caption>
    <Header />
    <tbody>
      {props.orders.map((order) => (
        <OrderRow key={order.orderId} order={order} />
      ))}
    </tbody>
  </table>
);

export default OrderTable;
