//you see this when you click on the extension in your browser

let background = document.querySelector('#background');

chrome.storage.sync.get(null, function(data) {
  background.value = data.background;
});

background.onchange = function(element) {
    let id = element.target.id;
    let color = element.target.value; 
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: `document.body.style.backgroundColor= "${color}";`}
    );
  });
  chrome.storage.sync.set({background: color}, function() {
    console.log(`Changed ${id}`);
  });
};