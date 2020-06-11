//you see this when you check extension options in the menu, currently identical to the popup

const background = document.querySelector('#background');
const txt = document.querySelector('#txt');
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
  txt.value = data.txt;
});

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