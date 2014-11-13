// JavaScript Document
/*credits: Andrés Fernández, based in http://ajaxcookbook.org/transitions-animation-effects/ */
function Transition(curva,ms,callback) {
	this.onMotionFinished=function(){};
	this.ant=0.01;
	this.done_=false;
	var _this=this;
	this.start=new Date().getTime();
	this.run=function(){
		window.animationOn=1;
		setTimeout(function(){
				if(!_this.next()){
					callback(1);
					_this.done_=true;
					window.animationOn=0;
					_this.onMotionFinished();
					return;
				}
				callback(_this.next());
				_this.run();
			},13);
	}
	this.next=function(){
		var now=new Date().getTime();
		if((now-this.start)>ms)
			return false;
		return this.ant=curva((now-this.start+.001)/ms,this.ant);
	}
}

function SineCurve(percentage) {
	return (1 - Math.cos(percentage * Math.PI)) / 2;
}

function easing(p){
	 var maxValue=1, minValue=.001, totalP=1, k=.25;
    var delta = maxValue - minValue; 
    var stepp = minValue+(Math.pow(((1 / totalP) * p), k) * delta); 
    return stepp; 
}

function LinearCurve(percentage) {
	return percentage;
}
function elasticoSuave(p){
    if(p<=0.6){
        return Math.pow(p*5/3,2);
    }else{
        return Math.pow((p-0.8)*5,2)*0.4+0.6;
    }
}