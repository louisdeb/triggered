let body = getBodyElements();

for (var i = 0; i < body.length; i++) {
  let node = body[i];
  if (containsMatch(node.textContent) != null) {
    // Node contains match
  }
}

function getBodyElements() {
  let all = document.getElementsByTagName("*");
  let elements = [].slice.call(all);
  let bodyIndex = elements.map(function(e) { return e.nodeName; }).indexOf('BODY');
  return elements.slice(bodyIndex, elements.length - 1);
}

function containsMatch(string) {
  let regex = /TestMatchString/g;
  return string.match(regex);
}
