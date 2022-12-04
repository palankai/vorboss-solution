import { Children, ReactElement } from 'react';
import styles from '../../../styles/StatBox.module.css';

const StatBox = (props: { children: ReactElement[] }) => <div className={styles.statbox}>{props.children}</div>;

export default StatBox;
