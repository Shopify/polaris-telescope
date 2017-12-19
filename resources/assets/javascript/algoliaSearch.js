import algoliasearch from 'algoliasearch';

const index = initialize();

function initialize() {
  const client = algoliasearch('VPPOBYF1PX', '7b5cb1cfd32091ade772492262a88989');
  return client.initIndex('polaris');
}

export default function algoliaSearch(query) {
  return index.search(query);
}
