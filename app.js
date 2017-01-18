let STORAGE_KEY = 'triggering';
let ENTER_BUTTON_ID = 13;
let input;

/* Our horrible non JQuery way of checking if the DOM is loaded. */
document.addEventListener('DOMContentLoaded', function() {
  /* Add event listener to the input field. */
  input = document.getElementById('filter-input');
  input.addEventListener('keypress', inputPress);

  /* Populate filtered words list. */
});

function inputPress(event) {
  if (event.keyCode != ENTER_BUTTON_ID) {
    return;
  }
  
  let inputString = input.value;
  if (inputString == null || inputString == "") { return; }

  /* Add word to filtered words list. */
  addWord(inputString);
}

function addWord(word) {
  /* Get stored object. */
  chrome.storage.sync.get(STORAGE_KEY, function (result) {
    let storedWords = result.triggering;
    if (storedWords == null) {
      storedWords = [];
    }

    /* If the word is not already stored, add it and save. */
    if (storedWords.indexOf(word) == -1) {
      storedWords.push(word);
      chrome.storage.sync.set({STORAGE_KEY: storedWords}, function() {
        console.log('saved ' + storedWords);
      });
    }
  });
}