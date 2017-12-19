export default function trekkie(query, origin) {
  let timeout = 0;
  const interval = setInterval(() => {
    if (window.trekkie && timeout <= 10) {
      window.trekkie.track('polaris-telescope-search-event', {
        PTsearchQuery: query,
        PTsearchOrigin: origin,
      });
      clearInterval(interval);
    } else {
      timeout++;
    }
  }, 100);
}
