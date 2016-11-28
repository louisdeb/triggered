let body = document.getElementsByTagName('BODY')[0];

if (containsMatch(body.textContent) != null) {
  explore(body);
}

function explore(node) {
  let children = node.childNodes;
  let matchingChildren = [];

  /* Populate matching children. We drop any non-matching children to avoid
     exceeding call stack limit. */
  children.forEach(function(child, index, childrenObj) {
    if (containsMatch(child.textContent) != null && child.nodeName == 'DIV') {
      matchingChildren.push(child);
    }
  });

  /* If there are no children DIVs which match, delete this DIV. */
  if (matchingChildren.length == 0) {
    // We have to check for other types of node containing matches here.
    node.remove();
  }

  /* Explore the children nodes which match the regex and are a DIV. */
  matchingChildren.forEach(function(child, index, childrenObj) {
    explore(child);
  });
}

/* Performs regex matching. */
function containsMatch(string) {
  let regex = /test match/g;
  return string.match(regex);
}

// TODO: Notice updates to page content and recheck page
// e.g. When scrolling down on Facebook and new content appears, does it get removed?
// Prediction: no
// Tested with "commented" 