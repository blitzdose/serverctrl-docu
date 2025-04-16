import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Control from everywhere',
    Svg: require('@site/static/img/devices.svg').default,
    description: (
      <>
       ServerCtrl lets you control you Spigot/Paper server from any device though
       native apps or the universal web interface.
      </>
    ),
  },
  {
    title: 'Beautiful UI',
    Svg: require('@site/static/img/flower.svg').default,
    description: (
      <>
        Say goodbye to ugly web panels and complicated functionality. ServerCtrl makes
        it easy to control your server.
      </>
    ),
  },
  {
    title: 'Open Source',
    Svg: require('@site/static/img/code.svg').default,
    description: (
      <>
        ServerCtrl is fully open source. Found flaws in the code? <a target='_blank' href='https://github.com/blitzdose/ServerCtrl/issues'>Tell me!</a>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
