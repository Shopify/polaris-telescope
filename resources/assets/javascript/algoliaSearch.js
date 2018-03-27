import algoliasearch from 'algoliasearch';

const index = initialize();

function initialize() {
  const client = algoliasearch('VPPOBYF1PX', '091510b9b683bba2cb9988391ddd224c');
  return client.initIndex('telescope');
}

export default function algoliaSearch(query) {
  return index.search(query);
}
