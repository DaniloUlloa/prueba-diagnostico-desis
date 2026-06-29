function AJAXPOST(Pagina, Variables,Obj, MsjLoad, FuncionListo, FuncionCarga, Conexion){
	if (MsjLoad == null || MsjLoad == false){MsjLoad= '<center>Espere un momento...</center>';}
	//if (FuncionCarga == null){if (Obj == null){Obj= false;}else{Obj.innerHTML = MsjLoad;}}
	document.body.style.cursor = "wait";
	$("a").css("cursor","wait");
	$("#div_cargando").fadeIn("fast");
	var Conexion = crearXMLHttpRequest();
	Conexion.open("POST",Pagina, true);
	Conexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	Conexion.send(Variables);
	
	Conexion.onreadystatechange = ProcesarCambioEstado;
		function ProcesarCambioEstado(){
			if (Conexion.readyState == 4){
				if(Obj != false){
					$(Obj).fadeOut("fast",function(){$(Obj).html(Conexion.responseText);});
					$(Obj).fadeIn("normal",function(){
						if (FuncionListo != null && FuncionListo != false){
							x = FuncionListo;
							x(Conexion);
						}else{
							if(typeof(carga_pagina) == "function")carga_pagina();	
						}
					});
				}else{
					if (FuncionListo != null){
						x = FuncionListo;
						x(Conexion);
					}
				}
				$("#div_cargando").fadeOut("fast");
				$("a").css("cursor","pointer");
				document.body.style.cursor = "auto";
			}else{
				if (FuncionCarga == null){
					//if(Obj != false){Obj.innerHTML = MsjLoad;}
				}else{
					x = FuncionCarga;
					x(Conexion);
				}
			}
		}
	return Conexion;
}

function SoloEnviar(Pagina, Variables, Callback){
	document.body.style.cursor = "wait";
	$("a").css("cursor","wait");
	$("#div_cargando").fadeIn("fast");
	var Conexion = crearXMLHttpRequest();
	Conexion.open("POST",Pagina, true);
	Conexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	Conexion.send(Variables);
	Conexion.onreadystatechange = function(){
		if(Conexion.readyState == 4){
			if(Callback != null){
				x = Callback;
				x(Conexion);
			}
			$("#div_cargando").fadeOut("fast");
			$("a").css("cursor","pointer");
			document.body.style.cursor = "auto";
		}
	}
}

function crearXMLHttpRequest(){
  var xmlHttp=null;
  if (window.ActiveXObject) 
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  else 
    if (window.XMLHttpRequest) 
      xmlHttp = new XMLHttpRequest();
  return xmlHttp;
}

function simbolos(a){
 do{
  a = a.replace('+','%2B');
  a = a.replace('%u2013','-');
 }
 while(a.indexOf('+') >= 0 || a.indexOf('%u2013') >= 0);
 return a;
}
//FIN FUNCUINES AJAX