// JavaScript Document

function getElementPosition() {
		var offsetTrail = this;
		var offsetLeft = 0;
		var offsetTop = 0;
		while (offsetTrail && offsetTrail.nodeName!=document.documentElement) {
			offsetLeft += offsetTrail.offsetLeft;
			offsetTop += offsetTrail.offsetTop;
			offsetTrail = offsetTrail.offsetParent;
		}
		return {left:offsetLeft, top:offsetTop};
}

function getElementsByClassName(rel,scope){
    var col=[];
	var sc=scope || document;
    var tCol=sc.getElementsByTagName('*');
    for(var ii=0;ii<tCol.length;ii++)
        if(tCol[ii].className==rel)
            col.push(tCol[ii])
    return col;
}  
function getElementsByRelName(rel){
    var col=[];
    var tCol=document.getElementsByTagName('*');
    for(var ii=0;ii<tCol.length;ii++)
        if(tCol[ii].rel==rel || tCol[ii].getAttribute('rel')==rel)
            col.push(tCol[ii])
    return col;
}
function cancelEvent(e){
	if(e && e.preventDefault)
		e.preventDefault();
	else if(window.event)
		window.event.returnValue=false;
}
function stopEvent(e){
	if(e && e.stopPropagation)
		e.stopPropagation();
	else if(window.event)
		window.event.cancelBubble=true;
}
function getCSS(o,prop){
    if(window.getComputedStyle){
        return document.defaultView.getComputedStyle(o,null).getPropertyValue(prop); 
    }else{ 
        var re = /(-([a-z]){1})/g; 
        if (prop == 'float') prop = 'styleFloat'; 
        if (re.test(prop)) { 
            prop = prop.replace(re, function () { 
                return arguments[2].toUpperCase(); 
            }); 
        } 
        return o.currentStyle[prop] ? o.currentStyle[prop] : null; 
    } 
}  
function getPos(e){
	var ev=e || window.event;
	var obj=ev.target || ev.srcElement;
	posX=ev.offsetX || ev.layerX  || 0;
	posY=ev.offsetY || ev.layerY || 0;
	return {x:posX,y:posY}
} 
function getAbsolutePosMouse(e){
	var ev=e || window.event;
	var xScroll=self.pageXOffset || (document.documentElement.scrollLeft+document.body.scrollLeft) || 0;
	var yScroll=self.pageYOffset || (document.documentElement.scrollTop+document.body.scrollTop) || 0;
	var posX=ev.clientX+xScroll;
	var posY=ev.clientY+yScroll;
	return {x:posX,y:posY}
}
function clearSelection() {
	if(window.permSel)return;
	var sel ;
	if(document.selection && document.selection.empty){
		try{document.selection.empty() ;}catch(err){}
	} else if(window.getSelection) {
		sel=window.getSelection();
	if(sel && sel.removeAllRanges)
		sel.removeAllRanges() ;
	}
}

function getNextHighestDepth(){
    var tCol=document.getElementsByTagName('*');
    var z=0;
        for(var i=0,l=tCol.length;i<l;i++){
            if(tCol[i].style.zIndex>z){
                z=tCol[i].style.zIndex;
            }
            
        }
    return ++z;
}
function compartir(){
	var left=(screen.width-660)/2;
    var top=(screen.height-360)/2;
    window.open('compartir.php','_blank', 'width=660,height=360,resizable=yes,top='+top+',left='+left);
}
function fbs_click(u,t){
	if(t)
	window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=760,height=636,scrollbars=yes');
	else
	window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u),'sharer','toolbar=0,status=0,width=760,height=500,scrollbars=yes');
	return false;
	}
function twitter_click(u,t,user){
	window.open('http://twitter.com/intent/tweet?status=RT+%40'+user+'+'+encodeURIComponent(t)+' '+encodeURIComponent(u),'sharer','toolbar=0,status=0,width=900,height=636,scrollbars=yes');return false;
} 
function twitter_click2(t){
	window.open('http://twitter.com/intent/tweet?status='+encodeURIComponent(t),'','toolbar=0,status=0,width=760,height=500,scrollbars=yes');
} 
function twitter_click3(t){
	window.location='http://twitter.com/intent/tweet?status='+encodeURIComponent(t);
} 
function removeChildNodes(parent){
	while(parent.hasChildNodes()){
		parent.removeChild(parent.childNodes[0])
	}
}
function pinterest(url,src,desc){
	var pinturl='http://pinterest.com/pin/create/button/?url='+encodeURIComponent(url)+'&media='+encodeURIComponent(src)+'&description='+encodeURIComponent(desc);
	window.open(pinturl,'','toolbar=0,status=0,width=760,height=500,scrollbars=yes');
}
function plusone(url){
	var plusoneurl='https://plus.google.com/share?url='+encodeURIComponent(url);
	window.open(plusoneurl,'','toolbar=0,status=0,width=760,height=500,scrollbars=yes');
}
function adjs(url){
    var oldsc=document.getElementById("old_sc");
       if(oldsc)
            document.getElementsByTagName('body')[0].removeChild(oldsc);
    var sc=document.createElement('script');
    sc.id="old_sc";
    sc.src=url+'&'+new Date().getTime();
    document.getElementsByTagName('body')[0].appendChild(sc);
}
var DR=function(f){
	if(document.addEventListener){
		var func=function(){f();document.removeEventListener('DOMContentLoaded',func,false);}
		document.addEventListener('DOMContentLoaded',func,false);
	}else{
		function r(f){/in/.test(document.readyState)?setTimeout(function(){r(f);},9):f();};
		r(f);
	}
}
DR=addLoadEvent;
function getScript(url,callback){
			var js = document.createElement('script');
			js.src = url;
			if(callback){
				if(js.addEventListener){
					js.addEventListener('load',callback,false);
				}else{
					js.onreadystatechange=function(){
						if(js.readyState=='complete' || js.readyState=='loaded'){
							callback();
						}
					}
    			}
			}
			var html = document.documentElement;
			html.insertBefore(js, html.lastChild);
}
var ns={};