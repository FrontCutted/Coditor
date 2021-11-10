function dl(content, filename = 'code.txt') {
  let link = document.createElement('a');
  link.download = filename;
  let blob = new Blob([content], {type: 'text/plain'});
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
function cp(){
  var codes = document.getElementById("codes");
  var filename = document.getElementById("filename");
  dl(codes.value, filename.value);
}