import trekkie from './trekkie';

export default function(dispatch) {
  window.sketchBridge = (jsonData) => {
    switch (jsonData.action) {
      case 'SEARCH':
        trekkie(jsonData.payload, jsonData.origin);
        return dispatch(jsonData.payload);
      default:
        throw new Error('unknown action received from the bridge');
    }
  };
}
