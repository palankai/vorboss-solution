import styles from '../../../styles/StatCard.module.css';

const StatCard = (props: { title: string; value: string }) => (
  <div className={styles.card}>
    <div className={styles.title}>{props.title}</div>
    <div className={styles.value}>{props.value}</div>
  </div>
);

export default StatCard;
