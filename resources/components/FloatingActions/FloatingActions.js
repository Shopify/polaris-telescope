import React from 'react';
import PropTypes from 'prop-types';

import styles from './FloatingActions.scss';

FloatingActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default function FloatingActions({children = null}) {
  return (
    <div className={styles.FloatingActions}>
      {children}
    </div>
  );
}
