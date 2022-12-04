/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import DashboardContainer from '../src/frontend/containers/Dashboard';
import styles from '../styles/Index.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Alice's Dashboard</title>
        <meta name="description" content="Alice's Order Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Alice's Order Dashboard</h1>
        <DashboardContainer />
      </main>
    </div>
  );
}
