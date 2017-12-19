import React from 'react';
import PropTypes from 'prop-types';

import styles from './StyleguidePage.scss';

StyleguidePage.propTypes = {
  to: PropTypes.string,
};

export default function StyleguidePage({to = ''}) {
  const styleguideURL = 'https://polaris.shopify.com';
  const url = addSearchParamToURL(styleguideURL + to, 'headless');

  return (
    <iframe
      title="Styleguide Page"
      className={styles.StyleguidePage}
      src={url}
    />
  );
}

function addSearchParamToURL(url, searchParamName, searchParamValue = '') {
  const parsedURL = new URL(url);
  const searchParams = parsedURL.searchParams;
  searchParams.append(searchParamName, searchParamValue);
  parsedURL.search = `?${searchParams.toString()}`;
  return parsedURL.href;
}
