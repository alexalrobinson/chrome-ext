console.log("Runs on page load");

function divLayer(divs, currNum, endNum, color){
	if(currNum < endNum){
		for (div of divs){
			if(div.tagName === "DIV"){
				div.style.backgroundColor=color;
				console.log(div.children || "no more children");
				if(div.childElementCount){
					divLayer(div.children, currNum++, endNum, color);
				}
			}
		}
	}
}

chrome.storage.sync.get(null, function(data) {
	console.log(data);
	if(data.darkmode){
		console.log("dark mode to-do");
	}
	//Applies selected color to body
	document.querySelector('body').style.backgroundColor = data.background;
	
	//Applies selected color to head
	document.getElementsByTagName('head')[0].style.backgroundColor = data.background;

	const divLayers = 3;
	const divs = document.querySelectorAll('body > div');
	if(divLayers){
		divLayer(divs, 0, divLayers, data.background);
	}
	
	//Applies selected color to header, moved to bottom because it sometimes fails due to CORS policy
	document.getElementsByTagName('header')[0].style.backgroundColor = data.background;
});