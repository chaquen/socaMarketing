
function iniciarAsociarEncuestaMuestra(){
 //document.getElementById("selEncuestas").addEventListener("change");  
 
 cargarMuestras();
 consultarFormularios();
}


function consultarFormularios(){  
   // alert("hola");
    var sel=document.getElementById("selEncuestaAsociacion");
    
    var enc= new encuesta("consultarFormularios","","");
    
    var resPen=enc.metodo();
    
    resPen.success(function(respSer){
        
      //  var selAsig=document.getElementById("selEncuestaAsignarMuestra");
        if(respSer!="No hay coincidencias"){
            var dtJs=eval(respSer);
            sel.innerHTML="";
            crearSelectFormulario(sel,dtJs);
      //      crearSelectEncuestas(selAsig,dtJs);
            
        }else{
            //alert(respSer);
        }
    }).fail(function(){});
}
function cargarMuestras(){
     var mues=new muestra("obtenerMuestrasSinEncuesta");
     
     var respuesta=mues.metodo();
     respuesta.success(function(respuestaServidor){
         if(respuestaServidor!=false){
             var dtJson=eval(respuestaServidor);
             var sel=document.getElementById("selListasMuestras");
        //     sel.innerHTML="";
          //   crearSelectMuestra(sel,dtJson);
             crearlistaMuestras(dtJson);
         }else{
              var divListaMuestras=document.getElementById("listaMuestras");
              divListaMuestras.innerHTML="No hay bases de datos para asignar";
         }
     }).fail(function(){});
     
 }
 
 function crearlistaMuestras(datos){
     var divListaMuestras=document.getElementById("listaMuestras");
     divListaMuestras.innerHTML="";
     var lista=document.createElement("ul");
     for(var i in datos){
         
         var elementoLista=document.createElement("li");
         
         var h=document.createElement("h3");
         //h.setAttribute("onclick","");
         h.innerHTML=datos[i].NombreMuestra+" ("+datos[i].registros+")";
         elementoLista.appendChild(h);
         lista.appendChild(elementoLista);
         
         var btn=document.createElement("input");
         btn.setAttribute("onclick","consultarMuestra("+datos[i].IdDescripcionMuestra+");");
         btn.setAttribute("type","button");
         btn.setAttribute("value","consultar");
         elementoLista.appendChild(btn);
         
         var btn=document.createElement("input");
         btn.setAttribute("onclick","asignarAEncuesta('"+datos[i].IdDescripcionMuestra+"','"+datos[i].NombreMuestra+"');");
         btn.setAttribute("type","button");
         btn.setAttribute("value","asociar a encuesta");
         elementoLista.appendChild(btn);
         
         lista.appendChild(elementoLista);
     }
     divListaMuestras.appendChild(lista);
 }
 function consultarMuestra(id){
     location.href="/consultarMuestra.html?idM="+id;
 }
 function asignarAEncuesta(id,nombre){
     
     var selEnc=document.getElementById("selEncuestaAsociacion");
     if(selEnc.value!="0"){
        // alert(id);
       // alert(idUsuario);
        selEnc.options[selEnc.selectedIndex].text;
        
         var mues=new muestra("asociarMuestraAunaEncuesta",id,selEnc.options[selEnc.selectedIndex].value,nombre,idUsuario);
         var respuesta=mues.metodo();
         respuesta.success(function(respuestaServidor){
             if(respuestaServidor){
                 alert("Base de datos asociada exitosaMente");
                 location.reload(true);
             }else{
                 alert("Ha ocurrido un error por favor comuniquese con su administrador");
             }
         }).fail(function(){});
     }
 }
 window.addEventListener("load",iniciarAsociarEncuestaMuestra,false);