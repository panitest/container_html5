// JavaScript Document
/*credits: Andrés Fernández*/
function set_opacity(div, val) {
			div.style.opacity = val;
    		div.style.MozOpacity = val;
    		div.style.KhtmlOpacity = val;
    		div.style.filter = 'alpha(opacity=' + val*100 + ')';
    		div.style.zoom=1;
} 
var popup;
function getWindowData(){
	var widthViewport,heightViewport,xScroll,yScroll,widthTotal,heightTotal;
	if (typeof window.innerWidth != 'undefined'){
    	widthViewport= window.innerWidth-17;
        heightViewport= window.innerHeight-17;
	}else if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !='undefined' && document.documentElement.clientWidth != 0){
        widthViewport=document.documentElement.clientWidth;
        heightViewport=document.documentElement.clientHeight;
	}else{
		widthViewport= document.getElementsByTagName('body')[0].clientWidth;
        heightViewport=document.getElementsByTagName('body')[0].clientHeight;
	}
	xScroll=self.pageXOffset || (document.documentElement.scrollLeft+document.body.scrollLeft);
	yScroll=self.pageYOffset || (document.documentElement.scrollTop+document.body.scrollTop);
	widthTotal=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth,widthViewport);
	heightTotal=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,heightViewport);
	return [widthViewport,heightViewport,xScroll,yScroll,widthTotal,heightTotal];
}

	

function alargar(){
	var pagina=getWindowData();
	if(! document.getElementById('overlay')){
		var ov=document.createElement('div');
		ov.id='overlay';
		ov.style.zIndex='9000';
		var selects = document.getElementsByTagName("select");
        	for (var i = 0; i != selects.length; i++) {
                selects[i].style.visibility = "hidden";
        	}
		var objects = document.getElementsByTagName("object");
        	for (var i = 0; i != objects.length; i++) {
                objects[i].style.visibility = "hidden";
        	}
		var embeds = document.getElementsByTagName("embed");
        	for (var i = 0; i != embeds.length; i++) {
                embeds[i].style.visibility = "hidden";
        	}
		ov.style.backgroundColor='black';
	try{set_opacity(ov, .8,'panino5001');}catch(e){}
		document.getElementsByTagName('body')[0].appendChild(ov);
		set_opacity($('overlay'), .8,'panino5001');
	}
	document.getElementById('overlay').style.position='absolute';
	document.getElementById('overlay').style.height=pagina[5]+'px';
	document.getElementById('overlay').style.width=pagina[4]+'px';;
	document.getElementById('overlay').style.top=document.getElementById('overlay').style.left=0;
}

function ventana(W,H){
	
	$('qq').innerHTML='';
	$('qq').style.width=W+'px';
	$('qq').style.height=H+'px';
	$('qq').style.backgroundImage='url(images/ajax-loader.gif)';
	window.popup=true;
	var pagina=getWindowData();
	$('qq').style.top=(pagina[1]/2)-(H/2)+pagina[3]+'px';
	$('qq').style.left=(pagina[0]/2)-(W/2)+pagina[2]+'px';
	$('qq').style.zIndex='10000';
	alargar();
}

function cerrar(){
	window.popup=false;
	var selects = document.getElementsByTagName("select");
        for (var i = 0; i != selects.length; i++) {
                selects[i].style.visibility = "visible";
        }
	var objects = document.getElementsByTagName("object");
        	for (var i = 0; i != objects.length; i++) {
                objects[i].style.visibility = "visible";
        	}
		var embeds = document.getElementsByTagName("embed");
        	for (var i = 0; i != embeds.length; i++) {
                embeds[i].style.visibility = "visible";
        	}
	$('qq').innerHTML='';
	$('qq').style.top='-1500px';
	$('qq').style.left='-1500px';
	$('qq').style.zIndex='10';
	if(document.getElementById('overlay'))
		document.getElementsByTagName('body')[0].removeChild(document.getElementById('overlay'));
	 if(ns && ns.postAlert){
		 ns.postAlert();
	 }
	 ns.postAlert=null;
}


function repos(){
	if(window.popup){cerrar();}
}

