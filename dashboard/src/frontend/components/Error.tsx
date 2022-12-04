import styles from '../../../styles/Error.module.css';

const Error = (props: { description: string }) => (
  <div className={styles.errorbox}>
    <div className={styles.title}>Error</div>
    <code className={styles.description}>{props.description}</code>
  </div>
);

export default Error;
