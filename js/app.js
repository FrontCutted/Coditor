function dl(content, filename = 'code.txt') {
  let link = document.createElement('a');
  link.download = filename;
  let blob = new Blob([content], {type: 'text/plain'});
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
function cp(){
  var codes = document.getElementById('codes').value;
  var name = document.getElementById('filename').value;
  dl(codes, name);
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}