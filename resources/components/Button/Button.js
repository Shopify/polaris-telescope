import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.scss';

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default function Button({onClick, children = null}) {
  return (
    <button className={styles.Button} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
