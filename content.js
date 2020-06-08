console.log("Runs on page load");

const body = document.querySelector("body");
const firstLayerDivs = document.querySelectorAll("body > div");
let allElts = document.querySelectorAll("*");
const images = document.querySelectorAll("img");
const html = document.querySelector("html");

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
	for(elt of allElts){
		if(elt.tagName !== "CODE" && elt.tagName !== "PRE" && elt.tagName !== "SPAN"){
			if(data.darkmode && (elt.style.display === "block" || elt.style || elt.style.display ==="flex")){
				elt.style["background-color"] = data.background;
				elt.style.backgroundColor = data.background;
			}
			elt.style["color"] = data.txt;
			elt.style.color = data.txt;
			if(elt.style.border || elt.style["border-color"]){
				elt.style["border-color"] = data.txt;
			}
		}
		else if (elt.tagName === "CODE"){
			elt.style["color"] = "black";
			elt.style.color = "black";
		}
	}
	//Applies selected color to body
	body.style.backgroundColor = data.background;
	body.style.color = data.text;
	
	//Applies selected color to head
	document.getElementsByTagName('head')[0].style.backgroundColor = data.background;

	if(data.layers){
		divLayer(firstLayerDivs, 0, data.layers, data.background);
	}
	
	//Applies selected color to text
	body.style.color = data.txt;

	//Applies selected color to header, moved to bottom because it sometimes fails due to CORS policy
	document.getElementsByTagName('header')[0].style.backgroundColor = data.background;
});