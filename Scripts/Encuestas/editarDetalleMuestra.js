var idBaseDatos;
var rUno,rDos,rTres,rCuatro;
function Iniciar(){
    cargarEncuestasEnProceso();
    document.getElementById("selEncuestaListas").addEventListener("change",consultarUsuariosAsignados,false);
    document.getElementById("selUsuAsignado").addEventListener("change",consultarDetalleEncuestaMuestra,false);
    
	
}

function cargarEncuestasEnProceso(){
    //var enc= new encuesta("obtenerEncuestaListasProceso","","");
    var enc= new encuesta("obtenerEncuestaEnProceso","","");
    var resPen=enc.metodo();
    resPen.success(function(respSer){
        var sel=document.getElementById("selEncuestaListas");
      
        if(respSer!="No hay coincidencias"){
            var dtJs=eval(respSer);
            sel.innerHTML="";
            crearSelectEncuestas(sel,dtJs);
            rUno=dtJs[0].Uno.split(",");
            rDos=dtJs[0].Dos.split(",");
            rTres=dtJs[0].Tres.split(",");
            rCuatro=dtJs[0].Cuatro.split(",");
        }else{
            alert(respSer);
        }
    }).fail(function(){});
} 
function consultarUsuariosAsignados(){
  
    var selEnc=document.getElementById("selEncuestaListas");
     var selUsu=document.getElementById("selUsuAsignado");
    if(selEnc.value!="0"){
       // alert(selEnc.value);
       var enc= new encuesta("obtenerUsuariosPorEncuesta",selEnc.value);
       var res= enc.metodo();
       res.success(function(respSer){
           if(respSer!="No hay coincidencias"){
               var dtJson=eval(respSer);
               if(selUsu.length>0){
                selUsu.innerHTML="";   
               }
               crearSelectUsuario(selUsu,dtJson);
           }else{
               alert(respSer);
           }
       }).fail(function(){});
    }
}
function consultarDetalleEncuestaMuestra(){
   
    var selEnc=document.getElementById("selEncuestaListas");    
    var mt=new muestra("consultarDetalleMuestra",selEnc.value,"",this.value);
    var respuesta=mt.metodo();
    respuesta.success(function(respuestaServidor){
        console.log(respuestaServidor);
        var dtJson=eval(respuestaServidor);
        dibujarTablaDetalleEncuestaMuestra(dtJson,"divTablaDetalleEncuestaMuestra");
    }).fail(function(){});
}
function dibujarTablaDetalleEncuestaMuestra(datos,id_div){
    var divPrincipal=document.getElementById(id_div);
    divPrincipal.innerHTML="";
    var tabla=document.createElement("table");
    tabla.className="tblMuestra";
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");
    var fila=document.createElement("tr");
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Agente";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Concesionario";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Total asignadas";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Total realizadas";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Asignadas rango "+rUno[0]+" a "+rUno[1];
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Realizadas rango "+rUno[0]+" a "+rUno[1];
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Asignadas rango "+rDos[0]+" a "+rDos[1];
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Realizadas rango "+rDos[0]+" a "+rDos[1];
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Asignadas rango "+rTres[0]+" a "+rTres[1];
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Realizadas rango "+rTres[0]+" a "+rTres[1];
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Asignadas rango "+rCuatro[0]+" a "+rCuatro[1];
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Realizadas rango "+rCuatro[0]+" a "+rCuatro[1];
    celda.appendChild(h);
    fila.appendChild(celda);
    
    thead.appendChild(fila);
    tabla.appendChild(thead);
    for(var i in datos){
        idBaseDatos=datos[i].Fk_Id_Muestra;
        var fila=document.createElement("tr");
    
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].NombreAgente;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].CodigoConcesionario+" "+datos[i].NombreConcesionario;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].TotalAsignadas;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].TotalRealizadas;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].AsignadasRangoUno;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].RealizadasDetalleRangoUno;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].AsignadasRangoDos;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].RealizadasDetalleRangoDos;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].AsignadasRangoTres;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].RealizadasDetalleRangoTres;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].AsignadasRangoCuatro;
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h4");
        h.innerHTML=datos[i].RealizadasDetalleRangoCuatro;
        celda.appendChild(h);
        fila.appendChild(celda);
        tbody.appendChild(fila);
    }
    tabla.appendChild(tbody);
    divPrincipal.appendChild(tabla);
    //alert("id base de datos "+idBaseDatos);
}

/*
 *  Funcion que se encarga de serializar y subir el archivo al servidor 
*/	 
function subirArchivoEditarDetalleEncMuestra(archivo){
     var selEnc =document.getElementById("selEncuestaListas");
     var selUsua=document.getElementById("selUsuAsignado");	
    if(selEnc.value!="0" && selUsua.value!="0"){
       if($("#"+archivo+"")[0].files[0] !== undefined){   
	
   		
                
		
		var arch = $("#"+archivo+"")[0].files[0];
		var nombreArchivo=arch.name;
		var extension=nombreArchivo.substring(nombreArchivo.lastIndexOf('.')+1);
		var tam=arch.size;
		var tipo=arch.type;	
               
		var file =jQuery('#flvArchivoEdiMuestra');
                var formData=new FormData(document.getElementById('formEditarDetaEncuMuestra'));
		
		
		
                 formData.append("archivo",arch);
                 formData.append("operacion","editarMuestra");
                 formData.append("idBaseDeDatos",idBaseDatos);                 
                 //alert(Date.getHours());
		if(esCsv(extension)){
			
			var pet =peticionAjaxUpload('subir_muestra',formData);
                    
                        
	                pet.success(function(response){
                                     var datosJSON=eval(response); 
                                     console.log(datosJSON);
                                   if(datosJSON.respuesta==true){
                                      alert("Registro actualizado con exito");                        
                                     limpiarFormEdiMuestra();
                                     file.replaceWith( file = file.val('').clone(true));  
                                     var resp = document.getElementById("divResp");
                                     resp.innerHTML="";
                                     
                                   }
                                     
                                    
                                       
                         }).fail(function(){
                             alert("Ha occurrido un error");
                         });
                       
                        
			
			
	 	}else{
                    file.replaceWith( file = file.val('').clone(true));
                    alert("archivo no valido");
                }
         }
        
    }
}
function limpiarFormEdiMuestra(){
    //alert("hola");
    var form=document.getElementById("formEditarDetaEncuMuestra");
    
    for(i in form.elements){
       
        if(form.elements[i].type == "select-one"){
		var sl = form.elements[i];
                sl.selectedIndex=0;
                
	}
	
    }
}
window.addEventListener("load",Iniciar,false);

function subirArchivoEditarDetalleEncMuestraCopia(archivo){
     var selEnc =document.getElementById("selEncuestaListas");
     var selUsua=document.getElementById("selUsuAsignado");	
    if(selEnc.value!="0" && selUsua.value!="0"){
       if($("#"+archivo+"")[0].files[0] !== undefined){   
	
   		
                var hdIdDetaEnc=document.getElementById("hdidEncu");
		
		var arch = $("#"+archivo+"")[0].files[0];
		var nombreArchivo=arch.name;
		var extension=nombreArchivo.substring(nombreArchivo.lastIndexOf('.')+1);
		var tam=arch.size;
		var tipo=arch.type;	
               
		var file =jQuery('#flvArchivoEdiMuestra');
                var formData=new FormData(document.getElementById('formEditarDetaEncuMuestra'));
		
		
		
                 formData.append("archivo",arch);
                 formData.append("operacion","editarMuestra");
                 formData.append("fechaSubida",horaCliente());
                 formData.append("idEncuesta",selEnc.value);
                 formData.append("idUsuario",selUsua.value);
                 //alert(Date.getHours());
		if(esCsv(extension)){
			
			var pet =peticionAjaxUpload('subir_muestra',formData);
                    
                        
	                pet.success(function(response){
                                   //  var datosJSON=eval(response); 
                                     alert(response);                        
                                     limpiarFormEdiMuestra();
                                     file.replaceWith( file = file.val('').clone(true));  
                                    
                                       
                         }).fail(function(){
                             alert("Ha occurrido un error");
                         });
                       
                        
			
			
	 	}else{
                    file.replaceWith( file = file.val('').clone(true));
                    alert("archivo no valido");
                }
         }
        
    }
}