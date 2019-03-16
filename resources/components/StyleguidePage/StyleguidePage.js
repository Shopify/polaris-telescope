import React from 'react';
import styles from './StyleguidePage.scss';

export default function StyleguidePage() {
  const styleguideURL = 'https://polaris-icons.shopify.com';

  return (
    <iframe
      title="Styleguide Page"
      className={styles.StyleguidePage}
      src={styleguideURL}
    />
  );
}
