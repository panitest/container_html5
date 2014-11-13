// JavaScript Document
/*credits: Andrés Fernández, based in http://ajaxcookbook.org/transitions-animation-effects/ */
function transicion(curva,ms,callback,obj){
	obj.onMotionFinished=obj.onMotionFinished || function(){}
	obj.onMotionStart=obj.onMotionStart || function(){}
	obj.onMotionProgress=obj.onMotionProgress || function(){}
    obj.globalIntervaloN=1;
    this.ant=0.01;
	this.fotograma=0;
    this.done_=false;
    var _this=this;
    this.start=new Date().getTime();
    this.init=function(){
        setTimeout(function(){
				_this.fotograma++;
				if(_this.fotograma==1){
					obj.onMotionStart();
				}
                if(!_this.next()){
                    callback(1);
					obj.onMotionFinished();
                    _this.done_=true;
                    obj.globalIntervaloN=0;
                    return;
                }
                callback(_this.next());
				obj.onMotionProgress(_this.next())
                _this.init();
            },13);
    }
    this.next=function(){
        var now=new Date().getTime();
        if((now-this.start)>ms)
            return false;
        return this.ant=curva((now-this.start+.001)/ms,this.ant);
    }
}
function elasticoFuerte(p){
    if(p<=0.6){
        return Math.pow(p*5/3,2);}
    else{
        return Math.pow((p-0.8)*5,2)*0.6+0.6;
    }
}
function elasticoSuave(p){
    if(p<=0.6){
        return Math.pow(p*5/3,2);
    }else{
        return Math.pow((p-0.8)*5,2)*0.4+0.6;
    }
}
function desacelerado(p){
    var maxValue=1, minValue=.001, totalP=1, k=.25;
    var delta = maxValue - minValue; 
    var stepp = minValue+(Math.pow(((1 / totalP) * p), k) * delta); 
    return stepp; 
}
function acelerado(p){
    var maxValue=1, minValue=.001, totalP=1, k=7;
    var delta = maxValue - minValue; 
    var stepp = minValue+(Math.pow(((1 / totalP) * p), k) * delta); 
    return stepp; 
}
function senoidal(p,ant){
    return (1 - Math.cos(p * Math.PI)) / 2;
}
function ejecutar(obj,efectos,ms,curva){
   var t=new transicion(
    curva,ms,function(p){
        
        for (var i=0;efectos[i];i++){
            if(efectos[i].fin<efectos[i].inicio){
                var delta=efectos[i].inicio-efectos[i].fin;
				if(efectos[i].propCSS!='scrollLeft' && efectos[i].propCSS!='scrollTop' && efectos[i].propCSS!='backgroundPosition'){
                	try{obj.style[efectos[i].propCSS]=(efectos[i].inicio-(p*delta))+efectos[i].u;}catch(e){}
				}
				if(efectos[i].propCSS=='scrollLeft' || efectos[i].propCSS=='scrollTop'){
					  try{obj[efectos[i].propCSS]=(efectos[i].inicio-(p*delta));}catch(e){}
				}
				if(efectos[i].propCSS=='backgroundPosition'){
					  try{obj.style[efectos[i].propCSS]='0 '+(efectos[i].inicio-(p*delta))+'px';}catch(e){}
				}
                if(efectos[i].propCSS=='opacity'){
                    try{ obj.style.zoom=1;
                    obj.style.MozOpacity = (efectos[i].inicio-(p*delta));
                    obj.style.KhtmlOpacity = (efectos[i].inicio-(p*delta));
                    obj.style.filter='alpha(opacity='+100*(efectos[i].inicio-(p*delta))+')';}catch(e){}
                }
            }
            else{
                var delta=efectos[i].fin-efectos[i].inicio;
				if(efectos[i].propCSS!='scrollLeft' && efectos[i].propCSS!='scrollTop' && efectos[i].propCSS!='backgroundPosition')
                   try{obj.style[efectos[i].propCSS]=(efectos[i].inicio+(p*delta))+efectos[i].u ;}catch(e){}
				if(efectos[i].propCSS=='scrollLeft' || efectos[i].propCSS=='scrollTop'){
					  try{obj[efectos[i].propCSS]=(efectos[i].inicio+(p*delta));}catch(e){}
				}
				if(efectos[i].propCSS=='backgroundPosition'){
					  try{obj.style[efectos[i].propCSS]='0 '+(efectos[i].inicio+(p*delta))+'px';}catch(e){}
				}
                if(efectos[i].propCSS=='opacity'){
                    try{ obj.style.zoom=1;
                    obj.style.MozOpacity = (efectos[i].inicio+(p*delta));
                    obj.style.KhtmlOpacity = (efectos[i].inicio+(p*delta));
                    obj.style.filter='alpha(opacity='+100*(efectos[i].inicio+(p*delta))+')';}catch(e){}
                }
            }
        }
        
    },obj);
    t.init();
    t=null;
  
}
var globalCola=[];
var globalIntervaloId=null;
function encolar(f,obj){ globalCola.push(f);
    if(!globalIntervaloId){
        globalIntervaloId=setInterval(function(){
            if(!globalCola.length){
                clearInterval(globalIntervaloId);
                globalIntervaloId=null;
            }
            if(!obj.globalIntervaloN){
                var ae=globalCola.shift();
                if(typeof ae=='function')
                    ae();
            }
        },13);
    }
}
function fx(obj,efectos,ms,cola,curva){
    if(!obj.globalIntervaloN)
        ejecutar(obj,efectos,ms,curva);
    else {
        if(cola)
            return encolar(function(){ejecutar(obj,efectos,ms,curva);},obj);
        else
            return;
    }    
   
} 
/*
sample:
fx($('cuadro'),[
    {'inicio':0,'fin':350,'u':'px','propCSS':'width'},
    {'inicio':0,'fin':350,'u':'px','propCSS':'height'},
    {'inicio':0,'fin':1,'u':'','propCSS':'opacity'}
    ],1000,true,desacelerado);
*/