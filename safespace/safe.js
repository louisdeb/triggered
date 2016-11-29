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
    remove(node);
  }

  /* Explore the children nodes which match the regex and are a DIV. */
  matchingChildren.forEach(function(child, index, childrenObj) {
    explore(child);
  });
}

/* Performs regex matching. */
function containsMatch(string) {
  let regex = /test string/g;
  return string.match(regex);
}

/* Removes a node. 
   Checks the URL to see if we can remove a larger section of the page, defined 
   by the match in the inner node. */
function remove(node) {
  if (document.URL.includes(".facebook.")) {
    removeOnFacebook(node);
  }

  node.remove();
}

function removeOnFacebook(node) {
  let desiredClass = "userContentWrapper";

  while (node != null) {
    let nodeClass = node.className;

    if (nodeClass.includes(desiredClass) || node.parentNode == null) {
      node.remove();
      node = null;
    } else {
      node = node.parentNode;
    }
  }
}

// TODO: Notice updates to page content and recheck page
// e.g. When scrolling down on Facebook and new content appears it does not
// get removed. 