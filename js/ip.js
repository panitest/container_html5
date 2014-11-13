// JavaScript Document
ns.terms='';
ns.apps={};
ns.mipos=[-34.607603,-58.446414];
ns.deviceData=['','','',''];//user_id,os_version,os,mobile_model

function irA(elTo){
	var pos=getElementPosition.call(elTo);
	var fin=pos.top;
	var inicio=self.pageYOffset || (document.body.scrollTop+document.documentElement.scrollTop);
	var t=new Transition(SineCurve,500,function(p){ 
        if(fin<inicio){ 
            var delta=inicio-fin; 
            scrollTo(0,(inicio-(p*delta))); 
        } 
        else{ 
            var delta=fin-inicio; 
             scrollTo(0,(inicio+(p*delta))); 
        } 
    }); 
    t.run(); 
    t=null;
	
	
}

function actionDescarga(url){
	$('cuerpo').style.height='0px';
	$('cuerpo').style.visibility='hidden';
	scrollTo(0,0);
	var h=document.documentElement.clientHeight;
	$('mapa').style.height=h+'px';
	$('mapa').style.visibility='visible';
	$('mapa').innerHTML='<iframe style="margin-top:62px; overflow-x: hidden; overflow-y: scroll; height:'+(h-62)+'px" src="'+url+'?latitud='+ns.mipos[0]+'&longitud='+ns.mipos[1]+'&'+(+new Date())+'&user_id='+ns.deviceData[0]+'&os_version='+ns.deviceData[1]+'&os='+ns.deviceData[2]+'&mobile_model='+ns.deviceData[3]+'" width="100%" height="'+(h-62)+'" allowtransparency="true" id="appmapa" frameborder="0"></iframe>';
	
}

function selectApp(name){
	var appdata=ns.apps['Apps'],i=0,l=appdata.length,app='';
	for(;i<l;i++){
		if(appdata[i]['name']==name){
			app=appdata[i];
			break;
		}
	}
	markSelected(name);
	$('envprinc').innerHTML='<div onclick="actionDescarga(&quot;'+app['url']+'&quot;)"><div id="btdescarga"><img src="http://container.ilab.acrons.net/'+app['image'].split('../').join('')+'" width="57" height="57">'+name+'<span></span></div>    <div id="descripapp">'+app['description']+'</div></div>';
	irA($('app'));
	
	
}
function getCatNameById(catid){
	var cats=ns.cats['data'],i=0,l=cats.length;
	for(;i<l;i++){
		if(cats[i].id==catid){
			return cats[i].name;
		}
	}
	return 0;
}
function markSelected(name){
	
	var els=$('optsdestacados').getElementsByTagName('div'),i=0,l=els.length;
	for(;i<l;i++){
		if(els[i].getElementsByTagName('label')[0].innerHTML==name){
			els[i].className='btdest btselected';
		}else{
			els[i].className='btdest';
		}
	}
}
function markSelectedCat(catname){
	
	var els=$('optscats').getElementsByTagName('div'),i=0,l=els.length;
	for(;i<l;i++){
		if(els[i].getElementsByTagName('label')[0].innerHTML==catname){
			els[i].className='btcat btcatselected';
		}else{
			els[i].className='btcat';
		}
	}
}
function renderDestacadas(destacadas){
	var html='',i=0,l=destacadas.length;
	for(;i<l;i++){
		html+='<div onclick="selectApp(&quot;'+destacadas[i]['name']+'&quot;)" class="btdest"><span></span><img src="http://container.ilab.acrons.net/'+destacadas[i]['image'].split('../').join('')+'" width="50" height="50" border="0"><label>'+destacadas[i]['name']+'</label></div>';
	}
	$('optsdestacados').innerHTML=html;
	selectApp(destacadas[0]['name']);
}
function renderCategorias(cats){
	var html='',i=0,j,l=cats.length,ll=ns.apps['Apps'].length,vacia;
	for(;i<l;i++){
		vacia=1;
		for(j=0;j<ll;j++){
			if(ns.apps['Apps'][j]['category']==cats[i]['id']){
				vacia=0;
			}
		}
		if(!vacia){
		html+='<div onclick="showItems('+cats[i]['id']+')" class="btcat"><span></span><img src="http://container.ilab.acrons.net/imgs/'+cats[i]['image']+'" width="50"><label>'+cats[i]['name']+'</label></div>';
		}
	}
	$('optscats').innerHTML=html;
}
function showItems(catid){
	
	
	var apps=ns.apps['Apps'],i=0,l=apps.length,html='';
	for(;i<l;i++){
		if(apps[i].category==catid){
			html+='<div onclick="actionDescarga(&quot;'+apps[i]['url']+'&quot;)" id="abajoicon" class="btdesticon"><img src="http://container.ilab.acrons.net/'+apps[i]['image'].split('../').join('')+'" width="50" height="50"><label>'+apps[i]['name']+'</label></div>';
		}
	}
	$('icons').style.visibility='visible';
	
	$('icons').innerHTML=html;
	var catname=getCatNameById(catid);
	markSelectedCat(catname);
	$('title3').innerHTML=catname;
	$('title3').style.visibility='visible';
	 irA($('title3'));
}

DR(
   	function(){
		getScript('http://api.movistar.acrons.net/p1.php?'+(+new Date()),function(){$('text_terms').innerHTML=ns.terms;getScript(
				  'http://www.disegnocentell.com.ar/mapa/p2.php?'+(+new Date()),
				  function(){
					  var appdata=ns.apps_sin_filtrar['Apps'],i=0,l=appdata.length;
					  ns.apps['Apps']=[];
					  var destacadas=[];
					  for(;i<l;i++){
						  if(appdata[i]['important']==1 && appdata[i]['offline']==0){
							  destacadas.push(appdata[i]);
						  }
						  if(appdata[i]['offline']==0){
						      ns.apps['Apps'].push(appdata[i]);
					  	  }
					  }
					  
					  renderDestacadas(destacadas);
					  renderCategorias(ns.cats['data']); 
					  iniciarApp();
				  }
				 
		);});
		
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){ns.mipos=[position.coords.latitude,position.coords.longitude]});
		 }
	}
);
function iniciarApp(){
		setTimeout(
			function(){
				
					if(localStorage.getItem('acepto')=='ok'){
						$('terminos').style.display='none';
						$('app').style.height='auto';
						$('app').style.visibility='visible';
						$('app').style.opacity='0';
						fx($('app'),[{'inicio':0,'fin':1,'u':'','propCSS':'opacity'}],1000,true,senoidal);
						$('tap').onMotionFinished=function(){
							$('tap').style.height='0';
							$('tap').style.visibility='hidden';
						}
						fx($('tap'),[{'inicio':1,'fin':0,'u':'','propCSS':'opacity'}],500,true,senoidal);
					}else{
						$('app').style.height='0';
						$('app').style.visibility='hidden';
						
						$('terminos').style.height='100%';
						$('terminos').style.visibility='visible';
						$('terminos').style.opacity='0';
						fx($('terminos'),[{'inicio':0,'fin':1,'u':'','propCSS':'opacity'}],1000,true,senoidal);
						$('tap').onMotionFinished=function(){
							$('tap').style.height='0';
							$('tap').style.visibility='hidden';
						}
						fx($('tap'),[{'inicio':1,'fin':0,'u':'','propCSS':'opacity'}],500,true,senoidal);
					}
				
				
				},2000		   
		);
		
		$('continuar').addEvent(
			'click',
			function(){
				if(!$('chacepto').checked){
					alerta('Debe aceptar los T&eacute;rminos y condiciones',300);
				}else{
						$('f1').submit();
						scrollTo(0,0);
						localStorage.setItem('acepto','ok');
          				$('app').style.visibility='visible';
						$('app').style.height='auto';
						$('app').style.opacity='0';
						fx($('app'),[{'inicio':0,'fin':1,'u':'','propCSS':'opacity'}],1000,true,senoidal);
						$('terminos').onMotionFinished=function(){
							$('terminos').style.height='0';
							$('terminos').style.visibility='hidden';
						}
						fx($('terminos'),[{'inicio':1,'fin':0,'u':'','propCSS':'opacity'}],500,true,senoidal);
       				 
					
				}
			}
		);
		$('text_terms').innerHTML=ns.terms;
		
		$('tricon').addEvent('click',showHideMenu);
		
		
		
		$('lathome').addEvent('click',function(){
				showHideMenu();
				scrollTo(0,0);
				$('mapa').innerHTML='';
				$('mapa').style.height='0';
				$('mapa').style.visibility='hidden';
				$('mapa').innerHTML='';
				$('cuerpo').style.height='717px';
				$('cuerpo').style.visibility='visible';
				
				
											   });
		
		$('button_home').addEvent('click',function(){
				scrollTo(0,0);
				$('mapa').innerHTML='';
				$('mapa').style.height='0';
				$('mapa').style.visibility='hidden';
				$('mapa').innerHTML='';
				$('cuerpo').style.height='717px';
				$('cuerpo').style.visibility='visible';
				});
		
	} 


function showHideMenu(){
	if($('cuerpo').className!='contenedorgeneralizq'){
		$('cuerpo').className='contenedorgeneralizq';
		$('header').className='contenedorgeneralizq';
		$('menulateral').className='menuizq';
	}else{
		$('header').className='contenedorgeneralder';
		$('cuerpo').className='contenedorgeneralder';
		$('menulateral').className='menuder';
	}	
}
/*
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
		$('user_id').value=device.uuid;
		$('os_version').value=device.version;
		$('os').value=device.platform;
		$('mobile_model').value=device.model;
		var md=new MobileDetect(navigator.userAgent);
		$('mobile_maker').value=md.phone() || 'Unknown';
}*/