if ('serviceWorker' in navigator) {
  let url = 'sw.js';
  navigator.serviceWorker.register(url);
}