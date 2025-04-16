import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Roadmap from '@site/src/components/Roadmap'

import Heading from '@theme/Heading';
import styles from './index.module.css';
import { Suspense } from 'react';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.darkHeader, styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="title_white">
          Roadmap
        </Heading>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Roadmap`}
      description="Roadmap">
      <HomepageHeader />
      <main>
        <Suspense fallback={<p>loading...</p>}>
            <Roadmap></Roadmap>
        </Suspense>
      </main>
    </Layout>
  );
}