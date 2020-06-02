console.log("Runs on page load");

chrome.storage.sync.get(null, function(data) {
	console.log(data);
	if(data.darkmode)
	{
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
	//Applies selected color to body
	document.body.style.backgroundColor = data.background;
	document.getElementsByTagName('body')[0].style.backgroundColor = data.background;
	
	//Applies selected color to head
	document.getElementsByTagName('head')[0].style.backgroundColor = data.background;
	
	//Applies selected color to header
	document.getElementsByTagName('header')[0].style.backgroundColor = data.background;
	
	//var numItems = $('div.item').length; - attempt to count number of div containers before applying color to them. Should be fixed and "60" in the iteration should be replaced with this var numItems.
	//                  Doing so causes divs that may not have been desired to override to be overridden. 
	//                  One solution would be to allow the user to set the number of divs to recolor so that they may tailor to more niche sites
	//Iterates through 30 div containers and applies style changes to each one - works for websites such as reddit where changing the body and header is not sufficient.

	//HOW TO ACCESS SLIDER VALUE HERE?
	for (let i = 0; i < rangeslider.value; i++)
	{
		document.getElementsByTagName('div')[i].style.backgroundColor = data.background;
	}
	
	
});