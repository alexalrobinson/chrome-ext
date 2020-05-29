//the first script that runs. is always running in the background
console.log("Background running");

chrome.runtime.onInstalled.addListener(function() {
  //change default background to #303030 when dark mode is implemented
  chrome.storage.sync.set({background: '#ccccff', darkmode: true}, function() {
    console.log("Default is Dark Mode");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {schemes: ['https', 'http']}
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});