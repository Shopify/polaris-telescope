import React from 'react';
import PropTypes from 'prop-types';

import styles from './Page.scss';

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default function Page({children = null}) {
  return (
    <main className={styles.Page}>
      {children}
    </main>
  );
}
