
function iniciarSubirMuestra(){
  
//         consultarFormularios();
//    cargarRangos();
   
    
}

/*
 *  Funcion que se encarga de serializar y subir el archivo al servidor 
*/	 
function subirArchivo(archivo){
    var txtNombreMuestra=document.getElementById("txbNombreMuestra");
    if($("#"+archivo+"")[0].files[0] !== undefined && txtNombreMuestra.value.length>0)
    {           
            var arch = $("#"+archivo+"")[0].files[0];
            var nombreArchivo=arch.name;
            var extension=nombreArchivo.substring(nombreArchivo.lastIndexOf('.')+1);
            var tam=arch.size;
            var tipo=arch.type;	
            //var file=document.getElementById('formCargarMuestra');
            var file =jQuery('#flvArchivoMuestra');
            var formData=new FormData(document.getElementById('formCargarMuestra'));


            //formData.append("clave",valor);
            //formData.append("idRangos",rango);
             formData.append("archivo",arch);
             //formData.append("operacion","crearMuestra");
             formData.append("operacion","crearMuestra");
             formData.append("nombre",txtNombreMuestra.value);
             formData.append("fechaSubida",horaCliente());
             //formData.append("idEncuesta",sel.value);
             
            if(esCsv(extension)){
                    
                    var pet =peticionAjaxUpload('subir_muestra',formData);
                   
                    var resp = document.getElementById("divResp");

                    pet.success(function(response){
                                //var respuesta=JSON.stringify(response);
                               // console.log(response);
                                 var datosJSON=eval(response); 
                                 
                               // console.log(datosJSON);
                                 if(datosJSON.respuesta){
                                     if(datosJSON.noRegistrados){
                                          resp.innerHTML="";
                                         alert("Se han creado "+datosJSON.numeroDeRegistros+" registros pero algunos registros fueron rechazados");
                                         console.log(datosJSON.registrosNoRegistrados);
                                         var noRegistrados=new Array();
                                         for(var i in datosJSON.registrosNoRegistrados){
                                             noRegistrados.push(datosJSON.registrosNoRegistrados[i]);
                                         }
                                            dibujarTablaNoregistrados(noRegistrados,"divNoRegistrados");
                                            document.getElementById("divNoRegistrados").style.display='block';
                                            document.getElementById("txbNombreMuestra").value="";
                                            file.replaceWith( file = file.val('').clone(true));
                                     }else{
                                         //document.getElementById("divNoRegistrados").style.display='none';
                                         resp.innerHTML="";
                                         alert("Se han creado "+datosJSON.numeroDeRegistros+" registros ");
                                         document.getElementById("txbNombreMuestra").value="";
                                         file.replaceWith( file = file.val('').clone(true));
                                     }
                                 }else{
                                     alert(datosJSON.mensaje);
                                     
                                 }
                                 
                                 
                                 
                                 
                                 
                        
                     }).fail(function(){
                         resp.innerHTML="Ha ocurrido un error ";
                         alert("Ha ocurrido un error");
                     });




            }else{
                file.replaceWith( file = file.val('').clone(true));
                alert("archivo no valido");
            }
     }
     else{
         alert("No hay Base de datos cargada para subir ");
     }
	
}
/*Funcion para dibujar una tabla con los clientes que no se han podido registrar en la base de datos*/
function dibujarTablaNoregistrados(datos,div_id){
    var divPrincipal=document.getElementById(div_id);
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var fila=document.createElement("tr");
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="NOMBRE";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="TELEFONO UNO";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="TELEFONO DOS";
    celda.appendChild(h);
    fila.appendChild(celda);

    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CELULAR UNO";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CELULAR DOS";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CELULAR TRES";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CUPO";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CONTRATO";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CIUDAD";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CONCESIONARIO";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="ASESOR";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CODIGO VENDEDOR";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CODIGO ASESOR";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CUOTAS PAGAS";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="CUOTAS MORA";
    celda.appendChild(h);
    fila.appendChild(celda);
    
        
    thead.appendChild(fila);
    tabla.appendChild(thead);
    var cuerpo=document.createElement("tbody");
    var datosSeparados=new Array();
    for(var i in datos){
        var fila=document.createElement("tr");
        datosSeparados=datos[i].split(",");
        for(var d in datosSeparados){
            var celda=document.createElement("td");
            var h=document.createElement("h4");
            var dato=datosSeparados[d].split("'");
            console.log(dato);
            h.innerHTML=dato[1];
            celda.appendChild(h);
            fila.appendChild(celda);      
        }
        
        cuerpo.appendChild(fila);
        
    }
    tabla.setAttribute("style","display:none");
    tabla.appendChild(cuerpo);
    divPrincipal.appendChild(tabla);
    
}

