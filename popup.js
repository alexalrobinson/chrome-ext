//you see this when you click on the extension in your browser

const background = document.querySelector('#background');
const txt = document.querySelector('#txt');
const rangeslider = document.getElementById("sliderRange"); 
const output = document.getElementById("demo");
const refreshButton = document.getElementById("refreshButton");
const darkmode = document.querySelector("#toggle");

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
  txt.value = data.txt;
  darkmode.value = data.darkmode;
});

darkmode.onchange = function(element){
  const dark = element.target.value;
  chrome.storage.sync.set({darkmode: dark, background:"#030303", txt:"#ffffff"}, function() {
    console.log(`Changed darkmode`);
  });
  reloadRecentTab();
}

background.onchange = function(element) {
  const color = element.target.value; 
  chrome.storage.sync.set({background: color}, function() {
    console.log(`Changed background`);
  });
  reloadRecentTab();
};

txt.onchange = function(element) {
  const color = element.target.value;
  chrome.storage.sync.set({txt: color}, function(){
    console.log(`Changed text color`);
  });
  reloadRecentTab();
}

rangeslider.oninput = function() { 
  output.innerHTML = this.value;
  chrome.storage.sync.set({layers: this.value}, function () {
    console.log("Changed # of layers");
  });
  reloadRecentTab();
};

refreshButton.onclick = function() {
  reloadRecentTab();
};