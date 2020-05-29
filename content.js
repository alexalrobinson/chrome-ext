console.log("Runs on page load");

chrome.storage.sync.get(null, function(data) {
	console.log(data);
	if(data.darkmode){
		//implement darkmode here, my hacky solution doesn't seem to be working out
		const css = `
		html {
			-webkit-filter: invert(100%); 
			-moz-filter: invert(100%); 
			-o-filter: invert(100%);
			-ms-filter: invert(100%); 
		}
		img {
			-webkit-filter: invert(0%); 
			-moz-filter: invert(0%); 
			-o-filter: invert(0%);
			-ms-filter: invert(0%); 
		}`;
		head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	}
	document.body.style.backgroundColor = data.background;
});