import React from 'react';

import pluginCall from 'sketch-module-web-view/client';

import {
  EmptyState,
  Page,
  FloatingActions,
  Button,
  Search,
  StyleguidePage,
} from './components';
import bridgeHandler from '../assets/javascript/handlers';

function buttonClicked() {
  pluginCall('reportIssue');
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasStyleguidePage: false,
      showError: false,
      searchQuery: '',
      styleguidePagePath: '',
    };
    bridgeHandler((searchQuery) => this.updateSearch(searchQuery));

    this.updateSearch = this.updateSearch.bind(this);
    this.updateStyleguidePage = this.updateStyleguidePage.bind(this);
    this.showFloatingActions = this.showFloatingActions.bind(this);
    this.pageContent = this.pageContent.bind(this);
    this.setSearchRef = this.setSearchRef.bind(this);
  }

  componentDidMount() {
    pluginCall('appLoaded');
  }

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown.bind(this));
  }

  updateSearch(searchQuery) {
    this.setState({searchQuery});
  }

  updateStyleguidePage(path) {
    this.setState({
      styleguidePagePath: path,
      hasStyleguidePage: path.length > 1,
      showError: path.length === 1,
    });
  }

  onKeyDown() {
    this.search.focus();
  }

  setSearchRef(node) {
    if (node == null) { return; }
    this.search = node;
  }

  showFloatingActions() {
    if (this.state.hasStyleguidePage) { return null; }

    return (
      <FloatingActions>
        <Button
          onClick={buttonClicked}
        >
          Report issue
        </Button>
      </FloatingActions>
    );
  }

  pageContent() {
    return this.state.hasStyleguidePage ? (
      <StyleguidePage to={this.state.styleguidePagePath} />
    )
    : (
      <EmptyState
        title={this.state.showError ? 'No Results…' : 'Get started…'}
        message={
          this.state.showError
          ? 'Try again with a new Layer or a different search term.'
          : 'Click on a Layer in Sketch or start to type to search.'
        }
      />
    );
  }

  render() {
    return (
      <Page
        onKeyDown={this.onKeyDown}
        tabIndex="0"
      >
        <Search
          ref={this.setSearchRef}
          query={this.state.searchQuery}
          onUpdate={this.updateSearch}
          onSearch={this.updateStyleguidePage}
        />
        {this.pageContent()}
        {this.showFloatingActions()}
      </Page>
    );
  }
}
