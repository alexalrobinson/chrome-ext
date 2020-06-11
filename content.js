console.log("Runs on page load");

const body = document.querySelector("body");
const firstLayerDivs = document.querySelectorAll("body > div");
const head = document.getElementsByTagName('head')[0];
let allElts = document.querySelectorAll("*");
const images = document.querySelectorAll("img");
const html = document.querySelector("html");

//utility functions to invert color
function invertColor(hex) {
	if (hex.indexOf('#') === 0) {
			hex = hex.slice(1);
	}
	// convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
			throw new Error('Invalid HEX color.');
	}
	// invert color components
	var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
			g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
			b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
	// pad each with zeros and return
	return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
	len = len || 2;
	var zeros = new Array(len).join('0');
	return (zeros + str).slice(-len);
}

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
	let css;
	let background = data.background;
	let txt = data.txt;
	if(data.darkmode){
    css = `html {-webkit-filter: invert(100%); -moz-filter: invert(100%); -o-filter: invert(100%); -ms-filter: invert(100%); }`;
		background = invertColor(data.background);
		txt = invertColor(data.txt);
	}
	else {
		css = 'html {-webkit-filter: invert(0%); -moz-filter: invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }';
	}
	const invert = "invert(100%)";
	for (elt of allElts){
		if(elt.style["background-image"] && data.darkmode) elt.style["background-blend-mode"] = "difference";
		if((elt.tagName === "IMG" && data.darkmode) || !elt.textContent){
			elt.style["-webkit-filter"] = invert;
			elt.style["-moz-filter"] = invert;
			elt.style["-o-filter"] = invert;
			elt.style["-ms-filter"] = invert;
		}
		else {
			elt.style.color = txt;
		}
	}
	const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
	head.appendChild(style);
	
	//Applies selected color or image to body
	if (data.img){
		body.style["background-image"] = `url('${data.img}')`;
	  if (data.darkmode) body.style["background-blend-mode"] = "difference";
	}
	else body.style.backgroundColor = background;
	
	//Applies selected color to head
	head.style.backgroundColor = background;

	if(data.layers){
		divLayer(firstLayerDivs, 0, data.layers, background);
	}
	
	//Applies selected color to text
	body.style.color = txt;

	//Applies selected color to header, moved to bottom because it sometimes fails due to CORS policy
	document.getElementsByTagName('header')[0].style.backgroundColor = background;
});