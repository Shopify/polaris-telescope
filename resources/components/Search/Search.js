import React from 'react';
import PropTypes from 'prop-types';

import styles from './Search.scss';
import Icon from './Icon';
import Badge from './Badge';
import ResultList from './ResultList';
import algoliaSearch from '../../assets/javascript/algoliaSearch';
import trekkie from '../../assets/javascript/trekkie';

const BLOCKEDKEYS = [13, 16, 17, 18, 37, 38, 39, 40, 91, 93];

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      focused: false,
      totalHits: 0,
      hits: [],
      path: '',
      query: this.props.query || '',
      cursor: 0,
      resultListScrollTop: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.handleAlgoliaSearch = this.handleAlgoliaSearch.bind(this);
    this.handleResultListClick = this.handleResultListClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleResultListItemHover = this.handleResultListItemHover.bind(this);
    this.forceSearch = this.forceSearch.bind(this);
    this.setSearchInputRef = this.setSearchInputRef.bind(this);
    this.dispachSearch = this.dispachSearch.bind(this);
    this.updateResultListScrollTop = this.updateResultListScrollTop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query === this.state.query) { return; }

    this.setState({query: nextProps.query}, this.forceSearch);
  }

  forceSearch() {
    if (this.state.query.length === 0) { return this.dispachSearch('/'); }
    algoliaSearch(this.state.query)
      .then((content) => {
        this.updateResult(content);
        this.onBlur();
        return this.dispachSearch(content.hits[0] ? content.hits[0].objectID : '/');
      })
      .catch();
    return true;
  }

  dispachSearch(path) {
    this.setState({path});
    this.props.onSearch(path);
  }

  handleAlgoliaSearch() {
    if (this.state.query.length === 0) { return; }
    algoliaSearch(this.state.query)
      .then((content) => this.updateResult(content))
      .catch();
  }

  onMouseLeave() {
    this.setState({active: this.state.focused});
  }

  onFocus() {
    this.setState({
      focused: true,
      active: true,
    });
  }

  focus() {
    this.searchInput.focus();
  }

  onBlur() {
    this.setState({
      active: false,
    });

    setTimeout(() => this.setState({focused: false}), 150);
  }

  updateResult(content) {
    if (this.state.query) {
      this.setState({
        totalHits: content.hits.length,
        hits: content.hits,
      });
    } else {
      this.setState({
        totalHits: 0,
        cursor: 0,
        hits: [],
      });
    }
    if (this.state.cursor > content.hits.length - 1) {
      this.setState({cursor: 0});
    }
  }

  updateResultListScrollTop() {
    const elementHeight = 50;
    const maxResultListHeight = 360;

    const element = this.state.cursor;
    const elementOffsetTop = elementHeight * element;
    const resultListHeight = Math.min(this.state.hits.length * elementHeight, maxResultListHeight);

    if (this.state.resultListScrollTop > elementOffsetTop) {
      this.setState({resultListScrollTop: elementOffsetTop});
    } else if (elementOffsetTop + elementHeight > this.state.resultListScrollTop + resultListHeight) {
      this.setState({resultListScrollTop: elementOffsetTop + elementHeight - resultListHeight});
    }
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    trekkie(this.state.query, 'onsearch-webview');
    this.searchInput.blur();
    this.props.onUpdate(this.state.query);
    this.forceSearch();
    event.preventDefault();
  }

  handleResultListClick(newQuery) {
    trekkie(newQuery.title, 'onsearch-webview');
    this.searchInput.blur();
    this.setState({query: newQuery.title});
    this.props.onUpdate(this.state.query);
    this.dispachSearch(newQuery.path);
  }

  handleKeyUp(event) {
    if (BLOCKEDKEYS.includes(event.keyCode)) { return; }
    this.handleAlgoliaSearch();
  }

  handleKeyDown(event) {
    const {cursor, hits} = this.state;

    if (cursor > hits.length) {
      this.setState({cursor: 0});
    }

    if (event.keyCode === 38 && cursor > 0) {
      this.setState((prevState) => ({
        cursor: prevState.cursor - 1,
      }), this.updateResultListScrollTop);
    } else if (event.keyCode === 40 && cursor < hits.length - 1) {
      this.setState((prevState) => ({
        cursor: prevState.cursor + 1,
      }), this.updateResultListScrollTop);
    }

    if (event.keyCode === 13) {
      const newHit = this.state.hits[cursor];
      this.handleResultListClick({path: newHit.objectID, title: newHit.title});
    }

    if (BLOCKEDKEYS.includes(event.keyCode) && event.keyCode != 37 && event.keyCode != 39) {
      event.preventDefault();
    }
  }

  handleResultListItemHover(newCursor) {
    this.setState({cursor: newCursor});
  }

  setSearchInputRef(node = null) {
    if (node == null) { return; }
    this.searchInput = node;
  }

  render() {
    return (
      <form
        className={styles.Search}
        onSubmit={this.handleSubmit}
      >
        <div className={styles.InputGroup}>
          <input
            ref={this.setSearchInputRef}
            type="text"
            spellCheck="false"
            placeholder="Type to search in Polaris"
            value={this.state.query}
            className={styles.Input}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onMouseLeave={this.onMouseLeave}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          <Badge
            active={this.state.active}
            visible={this.state.query.length > 0}
            total={this.state.totalHits}
          />
          <Icon active={this.state.active} />
        </div>
        <ResultList
          active={this.state.focused && this.state.query.length > 0}
          hits={this.state.hits}
          cursor={this.state.cursor}
          scrollTop={this.state.resultListScrollTop}
          activePath={this.state.path}
          onListItemHover={this.handleResultListItemHover}
          onItemClick={this.handleResultListClick}
        />
      </form>
    );
  }
}

Search.propTypes = {
  query: PropTypes.string,
  onSearch: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default Search;
