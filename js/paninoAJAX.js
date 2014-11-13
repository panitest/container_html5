// JavaScript Document
/*credits: Andrés Fernández*/
String.prototype.tratarResponseText=function(){
    var pat=/<script[^>]*>([\S\s]*?)<\/script[^>]*>/ig;
    var pat2=/\bsrc=[^>\s]+\b/g;
    var elementos = this.match(pat) || [];
    for(i=0;i<elementos.length;i++) {
        var nuevoScript = document.createElement('script');
        nuevoScript.type = 'text/javascript';
        var tienesrc=elementos[i].match(pat2) || [];
        if(tienesrc.length){
            nuevoScript.src=tienesrc[0].split("'").join('').split('"').join('').split('src=').join('').split(' ').join('');
        }else{
            var elemento = elementos[i].replace(pat,'$1');
            nuevoScript.text = elemento;
        }
        document.getElementsByTagName('body')[0].appendChild(nuevoScript);
    }
    return this.replace(pat,'');
} 

function http(){
	if(typeof window.XMLHttpRequest!='undefined'){
		return new XMLHttpRequest();	
	}else{
		try{
			return new ActiveXObject('Microsoft.XMLHTTP');
		}catch(e){
			alert('Su navegador no soporta AJAX');
			return false;
		}	
	}	
}







var rns={};
function request(url,callback,params,t){
	if(rns.xmlHttpTimeout){
		clearTimeout(rns.xmlHttpTimeout);
	}
	var H=new http(),q= t || 0;
	if(!H)return;
	var signo=url.indexOf('?')==-1 ? '?' :'&';
	H.open('post',url+signo+new Date().getTime(),true);
	rns.xmlHttpTimeout=setTimeout(function(){
		H.onreadystatechange=function(){}
		H.abort();
		H=null;	
		q++;
		/*if(q<3)
			request(url,callback,params,q);*/
		alert('Se produjo un error. Por favor intentalo nuevamente en unos minutos.');
			
	},30000);
	H.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	H.onreadystatechange=function(){
		if(H.readyState==4 && H.status == 200){
			clearTimeout(rns.xmlHttpTimeout);
			callback(H.responseText);
			H.onreadystatechange=function(){}
			H.abort();
			H=null;
		}
	}
	var p='';
	for(var i in params){
		p+='&'+i+'='+encodeURIComponent(params[i]);	
	}
	H.send(p);
}