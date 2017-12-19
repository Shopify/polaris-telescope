import React from 'react';
import PropTypes from 'prop-types';

import styles from './Search.scss';

class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active || false,
      hits: this.props.hits || [],
      activePath: this.props || '',
    };

    this.listItem = this.listItem.bind(this);
    this.onAction = this.onAction.bind(this);
    this.resultList = this.resultList.bind(this);
    this.resultListClassName = this.resultListClassName.bind(this);
    this.setResultListRef = this.setResultListRef.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active,
      hits: nextProps.hits,
      activePath: nextProps.activePath,
    });
    this.resultListNode.scrollTop = nextProps.scrollTop;
  }

  onAction(hit) {
    this.props.onItemClick({path: hit.objectID, title: hit.title});
  }

  setResultListRef(node) {
    if (node == null) { return; }
    this.resultListNode = node;
  }

  resultListWrapperClassName() {
    return this.state.active
      ? [styles.ResultListWrapper, styles.ResultListWrapperActive].join(' ')
      : [styles.ResultListWrapper];
  }

  resultListClassName() {
    return this.state.active
      ? [styles.ResultList, styles.ResultListActive].join(' ')
      : [styles.ResultList];
  }

  listItem(hit, itemKey) {
    let listItemClassName = this.props.cursor === itemKey
      ? [styles.ResultListItem, styles.ResultListItemSelected].join(' ')
      : [styles.ResultListItem];

    if (this.state.activePath === hit.objectID) {
      listItemClassName = [styles.ResultListItem, styles.ResultListItemActive].join(' ');
    }

    return (
      <li
        className={listItemClassName}
        key={itemKey}
        onFocus={this.props.onListItemHover.bind(null, itemKey)}
        onMouseOver={this.props.onListItemHover.bind(null, itemKey)}
        onClick={this.onAction.bind(null, hit)}
      >
        <span>
          {hit.title}
        </span>
        <span>
          {hit.category}
        </span>
      </li>
    );
  }

  resultList() {
    let resultList = null;

    if (this.state.hits.length > 0) {
      resultList = this.state.hits.map((hit, i) => this.listItem(hit, i));
    } else {
      resultList = (
        <span className={styles.ResultListNoResult}>Sorry, no results.</span>
      );
    }

    return resultList;
  }

  render() {
    return (
      <div className={this.resultListWrapperClassName()}>
        <ul
          ref={this.setResultListRef}
          onKeyDown={this.handleKeyDown}
          className={this.resultListClassName()}
        >
          {this.resultList()}
        </ul>
      </div>
    );
  }
}

ResultList.propTypes = {
  active: PropTypes.bool,
  hits: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  cursor: PropTypes.number,
  scrollTop: PropTypes.number,
  activePath: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
  onListItemHover: PropTypes.func,
};

export default ResultList;
