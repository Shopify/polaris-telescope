import {dispatchToWebview} from './utils';

export function onSelectionChanged(context) {
  const actionContext = context.actionContext;
  const document = actionContext.document;

  const layerName = String(document.selectedLayers().layers()[0].name());
  dispatchToWebview('SEARCH', layerName, 'onchange-sketch');
}
