//you see this when you click on the extension in your browser

const background = document.querySelector('#background');
const txt = document.querySelector('#txt');
const rangeslider = document.getElementById("sliderRange"); 
const output = document.getElementById("demo");
const refreshButton = document.getElementById("refreshButton");
const darkmode = document.getElementById("toggle");
const backgroundImg = document.getElementById("background-img");
const upload = document.getElementById("upload");
const remove = document.getElementById("remove");

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
  darkmode.checked = data.darkmode;
});

darkmode.onchange = function(element){
  element.target.checked ? txt.value = "#ffffff" : txt.value = "#000000";
  chrome.storage.sync.set({darkmode: element.target.checked, txt: txt.value}, function() {
    console.log(`Changed darkmode`);
  });
  reloadRecentTab();
}

background.onchange = function(element) {
  chrome.storage.sync.set({background: element.target.value}, function() {
    console.log(`Changed background`);
  });
  reloadRecentTab();
};

txt.onchange = function(element) {
  chrome.storage.sync.set({txt: element.target.value}, function(){
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

upload.onclick = function() {
  chrome.storage.sync.set({img: backgroundImg.value}, function() {
    console.log("changed image");
  });
  reloadRecentTab();
};

remove.onclick = function() {
  chrome.storage.sync.set({img: false}, function() {
    console.log("removed image");
  });
  reloadRecentTab();
};