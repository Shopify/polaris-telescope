/* globals NSWorkspace, NSURL */

import {createWebview, dispatchToWebview} from './utils';

export default function(context) {
  const selectedLayerName = getSelectedLayer(context);
  const handlers = {
    reportIssue: () => {
      const nsurl = NSURL.URLWithString(
        'https://github.com/Shopify/polaris-telescope/issues/new',
      );
      NSWorkspace.sharedWorkspace().openURL(nsurl);
    },
    appLoaded: () => {
      checkForSelectedLayer(selectedLayerName);
    },
  };

  createWebview(context, handlers, 'Polaris Telescope');
}

function checkForSelectedLayer(selectedLayerName) {
  if (!selectedLayerName) {
    return;
  }
  dispatchToWebview('SEARCH', String(selectedLayerName), 'onload-sketch');
}

function getSelectedLayer(context) {
  const sketchAPI = context.api();
  const selectedLayers = sketchAPI.selectedDocument.selectedLayers;

  let selectedLayerName;
  selectedLayers.iterate((layer) => {
    selectedLayerName = layer.name;
  });
  return selectedLayerName;
}
