import React from 'react';
import PropTypes from 'prop-types';

import styles from './Search.scss';

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active,
    });
  }

  render() {
    const searchIconClass = this.state.active
      ? [styles.SearchIcon, styles.SearchIconActive].join(' ')
      : styles.SearchIcon;

    return (
      <div className={styles.Icon}>
        <svg
          className={searchIconClass}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z" />
        </svg>
      </div>
    );
  }
}

Icon.propTypes = {
  active: PropTypes.bool,
};

export default Icon;
