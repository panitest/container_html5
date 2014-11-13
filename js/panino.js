// JavaScript Document
/*credits: Andrés Fernández*/
if (!Array.prototype.forEach){
    Array.prototype.forEach = function(fun){
        if (typeof fun != "function") throw new TypeError();
          for (var i = 0,l=this.length; i < l; i++) {
               if (i in this) fun.call(arguments[1], this[i], i);
          }
          return this;
    }
}
var panino=(function(){
/* ---- métodos privados ---- */
	var metodosPrivados={
		addEvent: function(type, fn ) {
			if ( this.addEventListener ) {
				this.addEventListener( type, fn, false );
			} else if(this.attachEvent){
				var _this=this;
				var f= function(){fn.call(_this,window.event);}
				this.attachEvent( 'on'+type, f);
				this[fn.toString()+type]=f;
			}else{
				this['on'+type]=fn;
			}
			var ev={_obj:this,_evType:type,_fn:fn};
			window.EvRegister=window.EvRegister || [];
    		window.EvRegister.push(ev);
			return this;
		},
		removeEvent: function(type, fn ) {
			if( this.removeEventListener){
				this.removeEventListener( type, fn, false );
			}
    		else if(this.detachEvent){
				this.detachEvent('on'+type,this[fn.toString()+type]);
				this[fn.toString()+type]=null;
			}
			else{
	 	 		this['on'+type]=function(){};
			}
			for (var ii= 0, l=window.EvRegister.length; ii < l ; ii++) {
        		if (window.EvRegister[ii]._evType== type && window.EvRegister[ii]._obj==this && window.EvRegister[ii]._fn==fn) {
            		window.EvRegister.splice(ii, 1);
            		break;
					
        		}
    		} 
    		return this;
   		 },
		 css:function(propiedad,valor){
		 	if(!valor)
				return this.style[propiedad];
			this.style[propiedad]=valor;
			return this;
		 },
		 hover:function(a,b){
		 	this.addEvent('mouseover', a );
			this.addEvent('mouseout', b );
			return this;
		 },
		 alfa:function(value){
			this.style.opacity = value;
    		this.style.MozOpacity = value;
    		this.style.KhtmlOpacity = value;
    		this.style.filter = 'alpha(opacity=' + value*100 + ')';
    		this.style.zoom=1;
			return this;
		},
		toggle:function(callback){
			this.style.display=this.style.display!='block'?'block':'none';
			if(typeof callback=='function')
				callback();
			return this;
		},
		extendido:true
		 
	}
/* ---- métodos públicos ---- */
	return{
		extend:function(el,obj){
			if(el.extendido && el!=metodosPrivados)return el;
			for(var i in obj)
				el[i]=obj[i];
			return el;
		},
		get:function(id){
			if(!document.getElementById(id))return false;
			return panino.extend(document.getElementById(id),metodosPrivados);
		},
		getO:function(obj){
			return panino.extend(obj,metodosPrivados);
		},
		add:function(obj){
			panino.extend(metodosPrivados,obj);
		},
		getByCollection:function(col,ctx){
            var d=ctx || document,ret=[],i,l=col.length;
            for(i=0;i<l;i++){
                ret.push(col[i]);
            }
            ret.forEach(function(el){panino.extend(el,metodosPrivados);});
			if(ret.extendido)return ret;
            for(var n in metodosPrivados){
                        if(typeof metodosPrivados[n]=='function'){
                            (function(){
                                  var mp=metodosPrivados[n];
                                  ret[n]=function(){
                                        var args=[].slice.call(arguments);
                                        ret.forEach(function(el){mp.apply(el,args)});
                                      return ret;
                                   }
                           })();
                        }else{
                            (function(){
                                ret[n]=metodosPrivados[n];
                            })();
                        }
            }
            return ret;
        },
		unregisterAllEvents:function(){
			if(window.EvRegister)
			while (window.EvRegister.length > 0) {
       			panino.getO(window.EvRegister[0]._obj).removeEvent(window.EvRegister[0]._evType,window.EvRegister[0]._fn);
    		}
			window.EvRegister=null;
			for(var i=0,el;el=document.getElementsByTagName('*')[i];i++)
				if(el.extendido)
					for(var ii in metodosPrivados)
						el[ii]=null;
			panino=null;
		}
	}	
})();
var $=panino.get;
var $$=panino.getByCollection;
//panino.getO(window).addEvent('unload',panino.unregisterAllEvents);
var domCompatible=function(){
	/*---- dom compat ----*/
	var a=[];
	if(!document.getElementById || !document.createTextNode || !document.createElement || !document.removeChild || !document.createDocumentFragment || !a.push) return false;
	/*---- box model compat ----*/
	var test = document.createElement('div');
	test.style.visibility = 'hidden';
	test.style.width = '100px';
	test.style.padding = '100px';
	document.getElementsByTagName('body')[0].appendChild(test);
	var w = test.offsetWidth || 0;
	if(w!=300) {return false;}
	document.getElementsByTagName('body')[0].removeChild(test);
	return true;
}

/*credits: Simon Willison*/
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}