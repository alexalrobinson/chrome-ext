//you see this when you click on the extension in your browser

const background = document.querySelector('#background');
const rangeslider = document.getElementById("sliderRange"); 
const output = document.getElementById("demo");

const reloadRecentTab = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: "content.js"}
    );
  });
};

chrome.storage.sync.get(null, function(data) {
  background.value = data.background;
  rangeslider.value = data.layers;
  output.innerHTML = data.layers;
});

background.onchange = function(element) {
  const color = element.target.value; 
  chrome.storage.sync.set({background: color}, function() {
    console.log(`Changed background`);
  });
  reloadRecentTab();
};

rangeslider.oninput = function() { 
  output.innerHTML = this.value;
  chrome.storage.sync.set({layers: this.value}, function () {
    console.log("Changed # of layers");
  });
  reloadRecentTab();
};