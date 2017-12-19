import React from 'react';
import PropTypes from 'prop-types';

import styles from './EmptyState.scss';

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default function EmptyState({title, message}) {
  return (
    <div className={styles.EmptyState}>
      <div className={styles.EmptyStateMessageWrap}>
        <h1 className={styles.Title}>{title}</h1>
        <p className={styles.Message}>{message}</p>
      </div>
    </div>
  );
}
