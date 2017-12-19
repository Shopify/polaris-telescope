
import React from 'react';
import PropTypes from 'prop-types';

import styles from './Search.scss';

class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      visible: false,
      total: this.props.total || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active,
      visible: nextProps.visible,
      total: nextProps.total,
    });
  }

  badgeClassName() {
    let searchIconClass;
    searchIconClass = this.state.active
      ? [styles.Badge, styles.BadgeActive].join(' ')
      : [styles.Badge];
    searchIconClass = this.state.visible
      ? [[...searchIconClass].join(''), styles.BadgeVisible].join(' ')
      : [...searchIconClass].join('');
    return searchIconClass;
  }

  render() {
    return (
      <div className={this.badgeClassName()}>
        <span>{this.state.total}</span>
      </div>
    );
  }
}

Badge.propTypes = {
  active: PropTypes.bool,
  visible: PropTypes.bool,
  total: PropTypes.number,
};

export default Badge;
