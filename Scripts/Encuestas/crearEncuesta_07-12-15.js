var arrPlantillas=new Array();
var idFormulario=0;
var idUser="";
var idRol="";
var arregloPreguntas={};//NUEVO OBJETO PARA ALMACENAR ARRAY CON ESTRUCTURA JSON

function iniciarCrearEncuesta(){
 var val=recibirValorEncuesta();
 //console.log("load");
 cargarPreguntas();
 cargarRangos();    
 
// cargarUsuario();
  document.getElementById("btnCrearEncuesta").addEventListener("click",crearEncuesta,false);
// document.getElementById("btnAgregarPlantilla").addEventListener("click",crearPlantilla,false);
 //document.getElementById("btnAgregarPlantilla").addEventListener("click",cargarPlantilla,false);
 if(val["idFormulario"]!=undefined){
   // idFormulario=val["idFormulario"]; 
   
    seleccionarPlantilla(val["idFormulario"]);
    var ancla=document.getElementById("volver");
    ancla.setAttribute("href","/menuAdministrador.html?idUser="+idUser+"&rol="+idRol);
 }else{
     console.log(val["idUser"]);
     console.log(val["rol"]);
     idRol=val["rol"];
     idUser=val["idUser"];
     var ancla=document.getElementById("volver");
     ancla.setAttribute("href","/menuAdministrador.html?idUser="+idUser+"&rol="+idRol);
   //  cargarListasPlantillas();
 }   
 

}

function cargarRangos(){
    var divRangos=document.getElementById("divRangos");
    
  //  console.log(divRangos.childNodes[1]);//label
    var rn = new rangos("obtenerRangos");
    var respuesta=rn.metodo();
    respuesta.success(function(respServidor){
        var dtJson=eval(respServidor);
        console.log(dtJson);
        divRangos.innerHTML="";
        var lista=document.createElement("ul");
        for(var i in dtJson){
            var rUno=dtJson[i].Uno.split(",");
            var rDos=dtJson[i].Dos.split(",");
            var rTres=dtJson[i].Tres.split(",");
            var rCuatro=dtJson[i].Cuatro.split(",");
             
            
            var elementoLista=document.createElement("li");
            var lbl=document.createElement("h4");
            var txt=document.createTextNode("De "+rUno[0]+" A "+rUno[1]+" De "+rDos[0]+" A "+rDos[1]+" De "+rTres[0]+" A "+rTres[1]+" Entre "+rCuatro[0]+" y "+rCuatro[1]);
            lbl.appendChild(txt);
            
            var rdbtn=document.createElement("input");
            rdbtn.setAttribute("type","radio");
            rdbtn.setAttribute("id","rango_"+dtJson[i].IdRango);
            rdbtn.setAttribute("name","rango");
            elementoLista.appendChild(rdbtn);
            elementoLista.appendChild(lbl);
            lista.appendChild(elementoLista);
        }
        divRangos.appendChild(lista);
        
    }).fail(function(){
        divRangos.innerHTML="";
    });
}
function seleccionarPlantilla(id){

    cargarPlantillaEncuesta("divFormPlantilla", id);
    console.log(arrPlantillas);
}

function recibirValorEncuesta(){

    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};   
    for ( var i = 0; i < paramarr.length; i++) {
	    var tmparr = paramarr[i].split("=");
	    params[tmparr[0]] = tmparr[1];
   
     }
     return params;
}
function cargarPlantilla(){
    var elements=document.getElementsByName("plantillas");
    
    var el;
    for(var i in elements){
      
         if(elements[i].checked == true){
           el=elements[i].id.split("_");  
           
	}
	
    }
    idFormulario=el[1];
    //console.log(el);
    cargarPlantillaEncuesta("divFormPlantilla", el[1]);
    console.log(arrPlantillas);
}
function limpiarFormPlantilla(){
    var elements=document.getElementsByName("plantillas");
    document.getElementById("txbNombreEncuesta").value="";
    document.getElementById("txbCantMuestra").value="";
    for(var i in elements){
        console.log(elements[i]);
         if(elements[i].checked == true){
             
            elements[i].checked = false;
	}
	
    }
}
function limpiarPreguntasDelFormulario(){
    //alert("HOla");
    //var divPreguntas=document.getElementsByName("seleccionada");
    var divPlantillaEncuesta=document.getElementById("divFormPlantilla");
    //console.log(divPlantillaEncuesta.childNodes.length);
    for(var i=divPlantillaEncuesta.childNodes.length;i>=0;i--){
      //  console.log(i);
       // console.log(divPlantillaEncuesta.childNodes[2]);
        if(divPlantillaEncuesta.childNodes[i]!=undefined){
            divPlantillaEncuesta.removeChild(divPlantillaEncuesta.childNodes[i]);
        }
        
        
    }
    
} 
function crearEncuesta(){
    var rdbtn=document.getElementsByName("rango");
        var rango;
        var seleccionado=false;
        for(var i in rdbtn){
            if(rdbtn[i].checked==true){
                 rango=rdbtn[i].id.split("_");
                 seleccionado=true;
            }
        }
    
           var hdIdUser=document.getElementById("hdIdUser");
           if(Object.keys(arregloPreguntas).length > 0 && document.getElementById("txbNombreEncuesta").value.length > 0 && seleccionado ){
               var enc = new encuesta("registrarEncuesta",
                         document.getElementById("txbNombreEncuesta").value,
                         "0",
                         arregloPreguntas,
                         idUser,
                         rango[1]
                         );
                 var respEnc = enc.metodo();                       
                 respEnc.success(function(respServidor)
                 {
                   if(respServidor!=false){
                       if(confirm("Encuesta creada exitosamente \ndesea crear otra encuesta? precione ACEPTAR \nsi desea salir presione CANCELAR")){
                        limpiarPreguntasDelFormulario();  
                        location.reload(true);
                     }else{
                        
                         location.href="/menuAdministrador.html?idUser="+idUser+"&rol="+idRol;
                     }  
                     document.getElementById("txbNombreEncuesta").value="";
                   }else{
                       alert("Opsss algo sucedio intentalo nuevamente");
                   }
                     
                     
                 }).fail(function(){});
            
           }else{
               alert("Recuerda asignar un nombre y un rango a la encuesta");
           }
           
}
function quitarPregunta(id){
    var divPrincipal=document.getElementById("divFormPlantilla");
    //for (var h in divPrincipal.childNodes){
     for (var h = 0;h<divPrincipal.childNodes.length;h++){   
        console.log(id+"<=>"+h+"==>"+divPrincipal.childNodes[h].id);
        if(divPrincipal.childNodes[h].id==id && divPrincipal.childNodes[h] != undefined){
            
            console.log(divPrincipal.childNodes[h]);
            divPrincipal.removeChild(divPrincipal.childNodes[h]);
        }
    }
    console.log(divPrincipal.childNodes.length);
    //console.log("id boton => "+id);
    var j=0;
    for(var i in arrPlantillas){
         
        if(arrPlantillas[i]==id){
            j=i;
            arrPlantillas.splice(j,1);//elimino el elemento del array
            
            document.getElementById("hdArray").value=arrPlantillas;
    
       //     console.log("posicion del elemento en el array "+i);
      //      console.log("valor del elemento del array "+arrPlantillas[i]);
        }
        //j++;
        
    }
    //console.log(j);
    console.log(arrPlantillas);
    idFormulario="0";
    
    
}
function eliminarPreguntaAbierta(id){
    var divPrincipal=document.getElementById("divAbiertas");
     var pregunta=document.getElementById(id);  
     var btnPregunta=document.getElementById("btnA_"+id);  
     var btnCondicion=document.getElementsByName("btnSE_"+id);
     if(pregunta!=undefined){
        btnPregunta.setAttribute("onclick","agregarPreguntaAbierta("+pregunta.id+");"); 
        btnPregunta.setAttribute("value","agregar pregunta"); 
        pregunta.setAttribute("name","Abiertas");
        divPrincipal.appendChild(pregunta);   
        eliminarElementoArray(id);
       
        for(var i in btnCondicion){
            //
            console.log(btnCondicion[i]);
            if(btnCondicion[i].style!=undefined){
                btnCondicion[i].style.display='none';
            }
        }
        
        var condicion=document.getElementsByName("divCondicion");
        for(var i in condicion){
            if(condicion[i].style!=undefined){
               condicion[i].style.display='none';
            }
        }

     }
    
}



function agregarPreguntaAbierta(id,argumento){
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var btnPregunta=document.getElementById("btnA_"+id);
  var pregunta=document.getElementById(id);
  
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var pregunta=document.getElementById(id);
  var btnCondicion=document.getElementsByName("btnSE_"+id);
  for(var i in btnCondicion){
      //btnCondicion[i].style.display='block';
      //console.log(btnCondicion[i]);
      if(btnCondicion[i].style!= undefined){
       //   console.log(btnCondicion[i]);
          btnCondicion[i].style.display='block';
      }
      
  }
  var condicion=document.getElementsByName("divCondicion");
  for(var i in condicion){
        //condicion[i].style.display='block';
       //console.log(condicion[i]);
       if(condicion[i].style!=undefined){
           condicion[i].style.display='block';
       }
       
       
  }
  
  pregunta.setAttribute("name","seleccionada");
  btnPregunta.setAttribute("value","Quitar pregunta");
  btnPregunta.setAttribute("onclick","eliminarPreguntaAbierta("+id+");");
  divPrincipal.appendChild(pregunta);
  agregarElementoArray(id,argumento);
  
  //
  
}

function eliminarPreguntaCerrada(id){
    var divPrincipal=document.getElementById("divCerradas");
     var pregunta=document.getElementById(id);  
     var btnPregunta=document.getElementById("btnA_"+id);  
     var btnCondicion=document.getElementsByName("btnSE_"+id);
     if(pregunta!=undefined){
        btnPregunta.setAttribute("onclick","agregarPreguntaCerrada("+pregunta.id+");"); 
        btnPregunta.setAttribute("value","agregar pregunta"); 
        pregunta.setAttribute("name","Cerradas");
        divPrincipal.appendChild(pregunta);   
        eliminarElementoArray(id);
       
        for(var i in btnCondicion){
            //
            console.log(btnCondicion[i]);
            if(btnCondicion[i].style!=undefined){
                btnCondicion[i].style.display='none';
            }
        }
        
        var condicion=document.getElementsByName("divCondicion");
        for(var i in condicion){
            if(condicion[i].style!=undefined){
               condicion[i].style.display='none';
            }
        }

     }
     
     
}
function agregarPreguntaCerrada(id,argumento){
 //alert("Cerrada");
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var btnPregunta=document.getElementById("btnA_"+id);
  var pregunta=document.getElementById(id);
  
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var pregunta=document.getElementById(id);
  var btnCondicion=document.getElementsByName("btnSE_"+id);
  for(var i in btnCondicion){
      //btnCondicion[i].style.display='block';
      //console.log(btnCondicion[i]);
      if(btnCondicion[i].style!= undefined){
       //   console.log(btnCondicion[i]);
          btnCondicion[i].style.display='block';
      }
      
  }
  var condicion=document.getElementsByName("divCondicion");
  for(var i in condicion){
        //condicion[i].style.display='block';
       //console.log(condicion[i]);
       if(condicion[i].style!=undefined){
           condicion[i].style.display='block';
       }
       
       
  }
  
  pregunta.setAttribute("name","seleccionada");
  btnPregunta.setAttribute("value","Quitar pregunta");
  btnPregunta.setAttribute("onclick","eliminarPreguntaCerrada("+id+");");
  divPrincipal.appendChild(pregunta);
  agregarElementoArray(id,argumento);
}   

function agregarPreguntaCerradaComentario(id,argumento){
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var btnPregunta=document.getElementById("btnA_"+id);
  var pregunta=document.getElementById(id);
  
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var pregunta=document.getElementById(id);
  var btnCondicion=document.getElementsByName("btnSE_"+id);
  for(var i in btnCondicion){
      //btnCondicion[i].style.display='block';
      //console.log(btnCondicion[i]);
      if(btnCondicion[i].style!= undefined){
       //   console.log(btnCondicion[i]);
          btnCondicion[i].style.display='block';
      }
      
  }
  var condicion=document.getElementsByName("divCondicion");
  for(var i in condicion){
        //condicion[i].style.display='block';
       //console.log(condicion[i]);
       if(condicion[i].style!=undefined){
           condicion[i].style.display='block';
       }
       
       
  }
  
  pregunta.setAttribute("name","seleccionada");
  btnPregunta.setAttribute("value","Quitar pregunta");
  btnPregunta.setAttribute("onclick","eliminarPreguntaCerradaComentario("+id+");");
  divPrincipal.appendChild(pregunta);
  agregarElementoArray(id,argumento);
  
 
 }
function eliminarPreguntaCerradaComentario(id){
    var divPrincipal=document.getElementById("divCerradasComentario");
     var pregunta=document.getElementById(id);  
     var btnPregunta=document.getElementById("btnA_"+id);  
     var btnCondicion=document.getElementsByName("btnSE_"+id);
     if(pregunta!=undefined){
        btnPregunta.setAttribute("onclick","agregarPreguntaCerradaComentario("+pregunta.id+");"); 
        btnPregunta.setAttribute("value","agregar pregunta"); 
        pregunta.setAttribute("name","CerradaComentario");
        divPrincipal.appendChild(pregunta);   
        eliminarElementoArray(id);
       
        for(var i in btnCondicion){
            //
            console.log(btnCondicion[i]);
            if(btnCondicion[i].style!=undefined){
                btnCondicion[i].style.display='none';
            }
        }
        
        var condicion=document.getElementsByName("divCondicion");
        for(var i in condicion){
            if(condicion[i].style!=undefined){
               condicion[i].style.display='none';
            }
        }

     }
     
    
   // alert(id);
  
 }
 
function agregarPreguntaCerradaMultiple(id,argumento){
    
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var preguntas=document.getElementById(id);
  preguntas.setAttribute("onclick","eliminarPreguntaCerradaMultiple("+id+");");
  preguntas.setAttribute("name","seleccionada");
  divPrincipal.appendChild(preguntas);
  agregarElementoArray(id,argumento);
}
function eliminarPreguntaCerradaMultiple(id,argumento){
    
    var divPrincipal=document.getElementById("divCerradasMultiple");  
    var preguntas=document.getElementById(id);
    if(preguntas!=undefined){
         preguntas.setAttribute("onclick","agregarPreguntaCerradaMultiple("+id+");");
         preguntas.setAttribute("name","CerradaMultiple");
         divPrincipal.appendChild(preguntas);
         eliminarElementoArray(id,argumento);
    }
} 

function cargarPreguntas(){
    var divPlantilla=document.getElementById("divFormPlantilla");
    var preg = new pregunta("consultarTodas","","","");
    var respuesta=preg.metodo();
    
 //   var respuesta=preg.metodo();
    
        respuesta.success(function(respServidor){
            //console.log(respServidor);
            
            var datosJson=eval(respServidor);
            var tamanio=Object.keys(datosJson).length;
            i=0;
            console.debug(datosJson[0]);
            for(var elemento in datosJson){
                //console.log(datosJson[elemento].pregunta);
                switch(datosJson[elemento].Tipo){
                    case "Abierta": 
                           var divAbiertas=document.getElementById("divAbiertas");
                           var ul=document.createElement("ul");
                           ul.setAttribute("name","Abiertas");
                           ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                           //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                           
                           
                           var li = document.createElement("li");
                           var argumento=document.createElement("h4");
                           var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                           argumento.appendChild(txtArgumento);
                           li.appendChild(argumento);
                           ul.appendChild(li);
                           
                           var li = document.createElement("li");
                           var respuesta=document.createElement("input");
                           respuesta.setAttribute("type","text");
                           respuesta.setAttribute("placeholder","respuesta");                           
                           respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                           li.appendChild(respuesta);
                           ul.appendChild(li);
                           
                           
                           var btnAgregar=document.createElement("input");
                            btnAgregar.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].pregunta+"');");
                            btnAgregar.setAttribute("value","agregar pregunta");
                            btnAgregar.setAttribute("type","button");
                            btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                           ul.appendChild(btnAgregar);
                           divAbiertas.appendChild(ul);
                           
                          
                        break;
                    case "Cerrada":
                         var divCerradas=document.getElementById("divCerradas");
                         var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         ul.setAttribute("name","Cerradas");
                         var li = document.createElement("li");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         ul.appendChild(li);
                         
                        var strRespuestas=datosJson[elemento].respuestas;
                       
                        for(var i in strRespuestas){
                            
                            var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","radio");
                            opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                            respuestaOpcion.appendChild(txtRespuesta);
                            
                            var btnCondicion=document.createElement("a");
                            btnCondicion.setAttribute("onclick","agregarCondicion("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"');");
                            btnCondicion.innerHTML="Agregar condicion";
                            btnCondicion.setAttribute("href","");
                            //btnCondicion.setAttribute("type","button");
                            btnCondicion.setAttribute("name","btnSE_"+datosJson[elemento].IdPreguntas);
                            btnCondicion.style.display='none';
                            
                            var divCondicion=document.createElement("div");
                            divCondicion.setAttribute("name","divCondicion");
                            divCondicion.setAttribute("id","divCondicion_"+strRespuestas[i].IdRespuestaPreguntas);
                            var input=document.createElement("a");
                            input.setAttribute("id","salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input.innerHTML="Salto";
                            input.setAttribute("href","");
                            //input.setAttribute("type","button");
                            //input.setAttribute("value","Salto");
                            input.setAttribute("onclick","agregarSalto("+datosJson[elemento].IdPreguntas+","+strRespuestas[i].IdRespuestaPreguntas+")");
                            input.style.display='none';
                            var select=document.createElement("select");
                            select.setAttribute("id","sel_salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            select.setAttribute("onchange","seleccionarSalto("+datosJson[elemento].IdPreguntas+","+strRespuestas[i].IdRespuestaPreguntas+")");
                            select.style.display='none';
                            var input2=document.createElement("a");
                            input2.setAttribute("id","se_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            //input2.setAttribute("type","button");
                            //input2.setAttribute("value","SubEncuesta");
                            input2.innerHTML="Sub encuesta";
                            input2.setAttribute("href","");
                            input2.style.display='none';
                            input2.setAttribute("onclick","agregarSubEncuesta()");
                            var input3=document.createElement("a");
                            input3.setAttribute("id","fin_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input3.innerHTML="Finalizar encuesta";
                            input3.setAttribute("href","");
                            //input3.setAttribute("type","button");
                            //input3.setAttribute("value","Finalizar encuesta");
                            input3.setAttribute("onclick","agregarCondicionFinalizacionEncuesta("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"')");
                            input3.style.display='none';
                            divCondicion.appendChild(input);
                            divCondicion.appendChild(select);   
                            divCondicion.appendChild(input2);
                            divCondicion.appendChild(input3);
                            
                            divCondicion.style.display="none";
                            
                            var btnAgregar=document.createElement("input");
                            btnAgregar.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].pregunta+"');");
                            btnAgregar.setAttribute("value","agregar pregunta");
                            btnAgregar.setAttribute("type","button");
                            btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                            
                            
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            li.appendChild(btnCondicion);
                            li.appendChild(divCondicion);
                            
                            ul.appendChild(li);
                            strRespuestas[i].IdRespuestaPreguntas++;
                         }
                         li.appendChild(btnAgregar);
                         ul.appendChild(li);
                         divCerradas.appendChild(ul);
                         
                        break;
                    case "CerradaComentario":
                         var divCerradaComentario=document.getElementById("divCerradasComentario");
                         var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         ul.setAttribute("name","CerradasComentario");
                         var li = document.createElement("li");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         ul.appendChild(li);
                         
                        var strRespuestas=datosJson[elemento].respuestas;
                       
                        for(var i in strRespuestas){
                            
                            var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","radio");
                            opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                            respuestaOpcion.appendChild(txtRespuesta);
                            
                            var btnCondicion=document.createElement("a");
                            btnCondicion.setAttribute("onclick","agregarCondicion("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"');");
                            btnCondicion.innerHTML="Agregar condicion";
                            btnCondicion.setAttribute("href","");
                            //btnCondicion.setAttribute("type","button");
                            btnCondicion.setAttribute("name","btnSE_"+datosJson[elemento].IdPreguntas);
                            btnCondicion.style.display='none';
                            
                            var divCondicion=document.createElement("div");
                            divCondicion.setAttribute("name","divCondicion");
                            divCondicion.setAttribute("id","divCondicion_"+strRespuestas[i].IdRespuestaPreguntas);
                            var input=document.createElement("a");
                            input.setAttribute("id","salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input.innerHTML="Salto";
                            input.setAttribute("href","");
                            //input.setAttribute("type","button");
                            //input.setAttribute("value","Salto");
                            input.setAttribute("onclick","agregarSalto("+datosJson[elemento].IdPreguntas+","+strRespuestas[i].IdRespuestaPreguntas+")");
                            input.style.display='none';
                            var select=document.createElement("select");
                            select.setAttribute("id","sel_salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            select.setAttribute("onchange","seleccionarSalto("+datosJson[elemento].IdPreguntas+","+strRespuestas[i].IdRespuestaPreguntas+")");
                            select.style.display='none';
                            var input2=document.createElement("a");
                            input2.setAttribute("id","se_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            //input2.setAttribute("type","button");
                            //input2.setAttribute("value","SubEncuesta");
                            input2.innerHTML="Sub encuesta";
                            input2.setAttribute("href","");
                            input2.style.display='none';
                            input2.setAttribute("onclick","agregarSubEncuesta()");
                            var input3=document.createElement("a");
                            input3.setAttribute("id","fin_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input3.innerHTML="Finalizar encuesta";
                            input3.setAttribute("href","");
                            //input3.setAttribute("type","button");
                            //input3.setAttribute("value","Finalizar encuesta");
                            input3.setAttribute("onclick","agregarCondicionFinalizacionEncuesta("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"')");
                            input3.style.display='none';
                            divCondicion.appendChild(input);
                            divCondicion.appendChild(select);   
                            divCondicion.appendChild(input2);
                            divCondicion.appendChild(input3);
                            
                            divCondicion.style.display="none";
                            
                            var btnAgregar=document.createElement("input");
                            btnAgregar.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].pregunta+"');");
                            btnAgregar.setAttribute("value","agregar pregunta");
                            btnAgregar.setAttribute("type","button");
                            btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                            
                            
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            li.appendChild(btnCondicion);
                            li.appendChild(divCondicion);
                            
                            ul.appendChild(li);
                            strRespuestas[i].IdRespuestaPreguntas++;
                         }
                         li.appendChild(btnAgregar);
                         ul.appendChild(li);
                         divCerradaComentario.appendChild(ul);
                         
                        break;    
                    case "CerradaComentarioOld":
                         var divCerradaComentario=document.getElementById("divCerradasComentario");
                         var ul=document.createElement("ul");   
                         ul.setAttribute("name","CerradasComentario");
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                         
                         var li = document.createElement("li");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         ul.appendChild(li);
                         
                         var strRespuestas=datosJson[elemento].respuestas;
                         
                         for(var i in strRespuestas){
                            
                            var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","radio");
                            opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                            opcion.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                            respuestaOpcion.appendChild(txtRespuesta);
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            ul.appendChild(li);
                            
                         }
                         var li = document.createElement("li");
                           var respuesta=document.createElement("input");
                           respuesta.setAttribute("type","text");
                           respuesta.setAttribute("placeholder","respuesta");                           
                           respuesta.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                           respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                           li.appendChild(respuesta);
                           ul.appendChild(li);
                           
                         divCerradaComentario.appendChild(ul);
                        break;
                    case "CerradaMultiple":
                         //alert(datosJson[elemento].IdPreguntas);
                         var divCerradaMultiple=document.getElementById("divCerradasMultiple");
                         var ul=document.createElement("ul");
                         ul.setAttribute("name","CerradaMultiple");
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         ul.setAttribute("onClick","agregarPreguntaCerradaMultiple("+datosJson[elemento].IdPreguntas+");");
                         var li = document.createElement("li");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         ul.appendChild(li);
                            
                         
                         var strRespuestas=datosJson[elemento].respuestas;
                         for(var i in strRespuestas){
                            
                            var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","checkbox");
                            opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                            respuestaOpcion.appendChild(txtRespuesta);
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            ul.appendChild(li);
                            
                         }
                         divCerradaMultiple.appendChild(ul);
                        break;
                }
            }
            
            
        }).fail(function(){
            alert("ha ocurrido un error");
        });
}

function cargarPreguntasSubEncuesta(){
    alert("Seleciona las preguntas que quieras usar");
    /*var divPlantillas=document.getElementById("divFormPlantilla");
    divPlantillas.innerHTML="";*/
    var preg = new pregunta("consultarTodas","","","");
    var respuesta=preg.metodo();
    
 //   var respuesta=preg.metodo();
    
        respuesta.success(function(respServidor){
            //console.log(respServidor);
            
            var datosJson=eval(respServidor);
            var tamanio=Object.keys(datosJson).length;
            i=0;
            //console.debug(datosJson[0].pregunta);
            for(var elemento in datosJson){
                //console.log(datosJson[elemento].pregunta);
                switch(datosJson[elemento].Tipo){
                    case "Abierta": 
                           var divAbiertas=document.getElementById("divAbiertas");
                           divAbiertas.setAttribute("class","tipoPregunta2");
                           var ul=document.createElement("ul");
                           
                           ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                           ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                           
                           
                           var li = document.createElement("li");
                           var argumento=document.createElement("h4");
                           var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                           argumento.appendChild(txtArgumento);
                           li.appendChild(argumento);
                           ul.appendChild(li);
                           
                           var li = document.createElement("li");
                           var respuesta=document.createElement("input");
                           respuesta.setAttribute("type","text");
                           respuesta.setAttribute("placeholder","respuesta");                           
                           respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                           li.appendChild(respuesta);
                           ul.appendChild(li);
                           
                           
                           divAbiertas.appendChild(ul);
                          
                        break;
                    case "Cerrada":
                         var divCerradas=document.getElementById("divCerradas");
                         divCerradas.setAttribute("class","tipoPregunta2");
                         var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         
                         var li = document.createElement("li");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         ul.appendChild(li);
                         
                         var strRespuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                         
                         for(var i in strRespuestas){
                            
                            var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","radio");
                            opcion.setAttribute("value",strRespuestas[i]);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i]);
                            respuestaOpcion.appendChild(txtRespuesta);
                            
                            /*var btnCondicion=document.createElement("input");
                            btnCondicion.setAttribute("onclick","agregarCondicion("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"');");
                            btnCondicion.setAttribute("value","agregar condicion");
                            btnCondicion.setAttribute("type","button");
                            btnCondicion.setAttribute("name","btnSE_"+datosJson[elemento].IdPreguntas);
                            btnCondicion.style.display='none';
                            
                            var divCondicion=document.createElement("div");
                            divCondicion.setAttribute("id","divCondicion_"+strRespuestas[i].IdRespuestaPreguntas);
                            var input=document.createElement("input");
                            input.setAttribute("id","salto_"+strRespuestas[i].IdRespuestaPreguntas);
                            input.setAttribute("type","button");
                            input.setAttribute("value","Salto");
                            input.style.display='none';
                            var input2=document.createElement("input");
                            input2.setAttribute("id","se_"+strRespuestas[i].IdRespuestaPreguntas);
                            input2.setAttribute("type","button");
                            input2.setAttribute("value","SubEncuesta");
                            input2.style.display='none';
                            var input3=document.createElement("input");
                            input3.setAttribute("id","fin_"+strRespuestas[i].IdRespuestaPreguntas);
                            input3.setAttribute("type","button");
                            input3.setAttribute("onclick","agregarCondicionFinalizacionEncuesta("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i]+"')");
                            input3.setAttribute("value","Finalizar encuesta");
                            
                            input3.style.display='none';
                            divCondicion.appendChild(input);
                            divCondicion.appendChild(input2);
                            divCondicion.appendChild(input3);
                            divCondicion.style.display="none";
                            */
                            var btnAgregar=document.createElement("input");
                            btnAgregar.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                            btnAgregar.setAttribute("value","agregar pregunta");
                            btnAgregar.setAttribute("type","button");
                            btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                            
                            
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            //li.appendChild(btnCondicion);
                            //li.appendChild(divCondicion);
                            
                            ul.appendChild(li);
                            strRespuestas[i].IdRespuestaPreguntas++;
                         }
                         li.appendChild(btnAgregar);
                         ul.appendChild(li);
                         divCerradas.appendChild(ul);
                         
                        break;
                    case "CerradaComentario":
                         var divCerradaComentario=document.getElementById("divCerradasComentario");
                         divCerradaComentario.setAttribute("class","tipoPregunta2");
                         var ul=document.createElement("ul");   
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                         
                         var li = document.createElement("li");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         ul.appendChild(li);
                         
                         var strRespuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                         for(var i in strRespuestas){
                            
                            var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","radio");
                            opcion.setAttribute("value",strRespuestas[i]);
                            opcion.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i]);
                            respuestaOpcion.appendChild(txtRespuesta);
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            ul.appendChild(li);
                            
                         }
                         var li = document.createElement("li");
                           var respuesta=document.createElement("input");
                           respuesta.setAttribute("type","text");
                           respuesta.setAttribute("placeholder","respuesta");                           
                           respuesta.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                           respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                           li.appendChild(respuesta);
                           ul.appendChild(li);
                           
                         divCerradaComentario.appendChild(ul);
                        break;
                    case "CerradaMultiple":
                         //alert(datosJson[elemento].IdPreguntas);
                         var divCerradaMultiple=document.getElementById("divCerradasMultiple");
                         divCerradaMultiple.setAttribute("class","tipoPregunta2");
                         var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         ul.setAttribute("onClick","agregarPreguntaCerradaMultiple("+datosJson[elemento].IdPreguntas+");");
                         var li = document.createElement("li");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         ul.appendChild(li);
                            
                         
                         var strRespuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                         for(var i in strRespuestas){
                            
                            var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","checkbox");
                            opcion.setAttribute("value",strRespuestas[i]);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i]);
                            respuestaOpcion.appendChild(txtRespuesta);
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            ul.appendChild(li);
                            
                         }
                         divCerradaMultiple.appendChild(ul);
                        break;
                }
            }
            
            
        }).fail(function(){
            alert("ha ocurrido un error");
        });
}
function cargarPlantillaEncuesta(id_div,nom_encuesta){
   var enc=new encuesta("obtenerEncuestaPlantillas",nom_encuesta,"");
    var resp=enc.metodo();
    resp.success(function(respServidor){
        //console.log(respServidor);        
        var datosJson=eval(respServidor);
        var tam=Object.keys(datosJson).length;
        var divPrincipal=document.getElementById(id_div);
        //divPrincipal.innerHTML="";
        var k=1;
       
        for(var elemento in datosJson){
            //var divDos=document.createElement("div");
            //divDos.className="";
            //var lblPregunta=document.createElement("h4");
            //var txtPregunta=document.createTextNode(datosJson[elemento].pregunta);
            //lblPregunta.appendChild(txtPregunta);
            //divDos.appendChild(lblPregunta);
            
            console.log("array => "+arrPlantillas);
            var existePregunta=true;
            for(var i in arrPlantillas){
                /*AQUI VALIDAR QUE NO EXISTA ELEMENTO EN LA LISTA*/
                 console.log(arrPlantillas[i]+"IdPregunta => "+datosJson[elemento].IdPreguntas);
                if(arrPlantillas[i]==datosJson[elemento].IdPreguntas){
                    //console.log(arrPlantillas[i]+"IdPregunta => "+datosJson[elemento].IdPreguntas);
                    existePregunta=false;    
                }else{
                    // existePregunta=true;
                }
            }
            //alert(existePregunta);
            if(existePregunta==true){
                arrPlantillas.push(datosJson[elemento].IdPreguntas);
                //console.log(arrPlantillas);
                document.getElementById("hdArray").value=arrPlantillas;
                switch(datosJson[elemento].Tipo){
                        case "Abierta":
                            
                           var ul=document.createElement("ul");
                           
                           ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                           ul.setAttribute("name","seleccionada");
                           //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                           
                           
                           var li = document.createElement("li");
                           var argumento=document.createElement("h4");
                           var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                           argumento.appendChild(txtArgumento);
                           li.appendChild(argumento);
                           ul.appendChild(li);
                           
                           var li = document.createElement("li");
                           var respuesta=document.createElement("input");
                           respuesta.setAttribute("type","text");
                           respuesta.setAttribute("placeholder","respuesta");                           
                           respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                           li.appendChild(respuesta);
                           ul.appendChild(li);
                           
                           var li = document.createElement("li");
                           var btnEliminar=document.createElement("input");
                           btnEliminar.setAttribute("type","button");
                           btnEliminar.setAttribute("value","eliminar");
                           btnEliminar.setAttribute("id","eliminar_"+datosJson[elemento].IdPreguntas);
                           btnEliminar.setAttribute("onclick","quitarPregunta("+datosJson[elemento].IdPreguntas+");");
                           li.appendChild(btnEliminar);
                           ul.appendChild(li);
                           
                           divPrincipal.appendChild(ul);
                           
                        

                            break;
                        case "Cerrada":
                            var ul=document.createElement("ul");
                            
                            ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                            ul.setAttribute("name","seleccionada");
                            //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");

                            var li = document.createElement("li");
                            var argumento=document.createElement("h4");
                            var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                            argumento.appendChild(txtArgumento);
                            li.appendChild(argumento);
                            ul.appendChild(li);

                            var strRespuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                            for(var i in strRespuestas){

                               var li =document.createElement("li");
                               var opcion=document.createElement("input");
                               opcion.setAttribute("type","radio");
                               opcion.setAttribute("value",strRespuestas[i]);
                               var respuestaOpcion=document.createElement("h3");
                               var txtRespuesta=document.createTextNode(strRespuestas[i]);
                               respuestaOpcion.appendChild(txtRespuesta);
                               li.appendChild(opcion);
                               li.appendChild(respuestaOpcion);
                               ul.appendChild(li);

                            }
                            var li=document.createElement("li"); 
                            var btnEliminar=document.createElement("input");
                            btnEliminar.setAttribute("type","button");
                            btnEliminar.setAttribute("value","eliminar");
                            btnEliminar.setAttribute("id","eliminar_"+datosJson[elemento].IdPreguntas);
                            btnEliminar.setAttribute("onclick","quitarPregunta("+datosJson[elemento].IdPreguntas+");");                           
                            li.appendChild(btnEliminar)
                            
                            ul.appendChild(li);
                            divPrincipal.appendChild(ul);
                            
                            break;
                        case "CerradaComentario":
                            var ul=document.createElement("ul");
                            
                            ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                            ul.setAttribute("name","seleccionada");
                            //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");

                            var li = document.createElement("li");
                            var argumento=document.createElement("h4");
                            var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                            argumento.appendChild(txtArgumento);
                            li.appendChild(argumento);
                            ul.appendChild(li);

                            var strRespuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                            for(var i in strRespuestas){

                               var li =document.createElement("li");
                               var opcion=document.createElement("input");
                               opcion.setAttribute("type","radio");
                               opcion.setAttribute("value",strRespuestas[i]);
                               var respuestaOpcion=document.createElement("h3");
                               var txtRespuesta=document.createTextNode(strRespuestas[i]);
                               respuestaOpcion.appendChild(txtRespuesta);
                               li.appendChild(opcion);
                               li.appendChild(respuestaOpcion);
                               ul.appendChild(li);

                            }
                            var li = document.createElement("li");
                            var respuesta=document.createElement("input");
                            respuesta.setAttribute("type","text");
                            respuesta.setAttribute("placeholder","respuesta");                           
                            respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                            li.appendChild(respuesta);
                            ul.appendChild(li);
                            
                            
                            var btnEliminar=document.createElement("input");
                            btnEliminar.setAttribute("type","button");
                            btnEliminar.setAttribute("value","eliminar");
                            btnEliminar.setAttribute("id","eliminar_"+datosJson[elemento].IdPreguntas);
                            btnEliminar.setAttribute("onclick","quitarPregunta("+datosJson[elemento].IdPreguntas+");");                           
                            li.appendChild(btnEliminar);
                            ul.appendChild(li);
                            
                            divPrincipal.appendChild(ul); 
              
                     break;
                  case "CerradaMultiple":
                      
                      
                            var ul=document.createElement("ul");
                            
                            ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                            ul.setAttribute("name","seleccionada");
                            //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");

                            var li = document.createElement("li");
                            var argumento=document.createElement("h4");
                            var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                            argumento.appendChild(txtArgumento);
                            li.appendChild(argumento);
                            ul.appendChild(li);

                            var strRespuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                            for(var i in strRespuestas){

                               var li =document.createElement("li");
                               var opcion=document.createElement("input");
                               opcion.setAttribute("type","radio");
                               opcion.setAttribute("value",strRespuestas[i]);
                               var respuestaOpcion=document.createElement("h3");
                               var txtRespuesta=document.createTextNode(strRespuestas[i]);
                               respuestaOpcion.appendChild(txtRespuesta);
                               li.appendChild(opcion);
                               li.appendChild(respuestaOpcion);
                               ul.appendChild(li);

                            }
                            
                            var li=document.createElement("li");
                            var btnEliminar=document.createElement("input");
                            btnEliminar.setAttribute("type","button");
                            btnEliminar.setAttribute("value","eliminar");
                            btnEliminar.setAttribute("id","eliminar_"+datosJson[elemento].IdPreguntas);
                            btnEliminar.setAttribute("onclick","quitarPregunta("+datosJson[elemento].IdPreguntas+");");                           
                            li.appendChild(btnEliminar);
                            ul.appendChild(li);
                            
                            divPrincipal.appendChild(ul);
                            
                      
                   
                     break;
                }
              //  divPrincipal.appendChild(divDos);
                //console.log("--");
                k++;
            }
        }
        
    }).fail();
}


function cargarListasPlantillas(){
        var form=new encuesta("consultarFormularios","");
         var respForm = form.metodo();
         respForm.success(function(respServidor){
            var datJson=eval(respServidor);
           var divPlanillas = document.getElementById("divListarPlantillas");
          //console.log(datJson);
           for(var i in datJson){
            var div = document.createElement("div");
            var rbtn=document.createElement("input");
             var lbl= document.createElement("label");
             var txt=document.createTextNode(datJson[i].NombreFormulario);
             rbtn.setAttribute("type","radio");
             rbtn.setAttribute("value",datJson[i].NombreFormulario);
             rbtn.setAttribute("id","form_"+datJson[i].IdFormulario);
             rbtn.setAttribute("name","plantillas");
             lbl.appendChild(txt);             
             div.appendChild(rbtn);
             div.appendChild(lbl);
             divPlanillas.appendChild(div);
           }
           
           
     }).fail(function(){});
     
 }
window.addEventListener("load",iniciarCrearEncuesta,false);

/*Funcion para agregar  subpreguntas */
function agregarCondicion(idPregunta,IdRespuesta){
    
    for(var i in arregloPreguntas){
        if(arregloPreguntas[i].idPregunta==idPregunta){
            arregloPreguntas[i].condicion=true;
            
        }
    }
    var divPregunta=document.getElementById(idPregunta);
    console.log(divPregunta.childElementCount);
    console.log("id elemento"+IdRespuesta);
    console.log(divPregunta.childNodes[IdRespuesta]);
    document.getElementById("divCondicion_"+IdRespuesta);
    document.getElementById("salto_"+idPregunta+"_"+IdRespuesta).style.display='block';
    document.getElementById("se_"+idPregunta+"_"+IdRespuesta).style.display='block';
    document.getElementById("fin_"+idPregunta+"_"+IdRespuesta).style.display='block';
    
}

function agregarElementoArray(id,argumento){
  
  var tam=Object.keys(arregloPreguntas).length;  
  for(var i =0;i<=tam;i++) {
      if( arregloPreguntas[i]!=undefined && arregloPreguntas[i].idPregunta==id ){
          console.log(arregloPreguntas[i]);
          var existe=true;
        break;
      }else{
         var existe=false;
          break;
      }
  }
   if(!existe){
       
       arregloPreguntas[tam]={
            idPregunta:id,
            argumento:argumento,
            condicion:false,            
            listaCondiciones:{
                
            }
          };
   }
   
   console.log("LINEA 793");
   console.log(arregloPreguntas);
  
      idFormulario="0";
}

function eliminarElementoArray(id){
    
    for(var i in arregloPreguntas){
        console.log("LINEA 808");
        console.log(arregloPreguntas[i]);
        console.log(id);
        if(arregloPreguntas[i].idPregunta == id){
            
            delete arregloPreguntas[i];
            
            console.log(arregloPreguntas[i]);
        }
    }
    console.log("LINEA 815");
    console.log(arregloPreguntas);
    idFormulario="0";
}
/*Funcion para mostrar un select con las preguntas agregadads al formulario*/
function agregarSalto(IdPregunta,IdRespuesta){
    
 alert("Selecciona la pregunta a la que quieres saltar");    
 
 for(var i in arregloPreguntas){
       console.log(arregloPreguntas[i]);
 }
 
 //console.log("sel_salto_"+IdRespuesta+"_"+IdPregunta);
 //console.log(document.getElementById("sel_salto_"+IdPregunta+"_"+IdRespuesta));
 crearSelectPreguntasSalto(document.getElementById("sel_salto_"+IdPregunta+"_"+IdRespuesta),arregloPreguntas,IdPregunta);
 document.getElementById("sel_salto_"+IdPregunta+"_"+IdRespuesta).style.display='block';
}
function agregarSubEncuesta(IdRespuesta){
    //document.getElementById("div");   
    //alert("Agrega las preguntas");
    cargarPreguntasSubEncuesta();
    
}
function agregarCondicionFinalizacionEncuesta(idPregunta,resp){
    console.log("1166=> idPregunta "+idPregunta);
    console.log(resp);
    if(confirm("Desea que al seleccionar esta respuesta se finalize la encuesta")){
        for(var i in arregloPreguntas){
            if(arregloPreguntas[i].idPregunta==idPregunta){
                console.log(Object.keys(arregloPreguntas[i].listaCondiciones).length);
                if(Object.keys(arregloPreguntas[i].listaCondiciones).length>=1){
                        var pos=Object.keys(arregloPreguntas[i].listaCondiciones).length;
                        arregloPreguntas[i].listaCondiciones[pos]={
                            respuesta:resp,
                            tipoCondicion:"_final_",
                            pregunta_de_la_condicion:0,
                            idPreguntaCondicion:0
                        };
                }else{
                    var pos=Object.keys(arregloPreguntas[i].listaCondiciones).length;
                    arregloPreguntas[i].listaCondiciones[0]={
                        respuesta:resp,
                        tipoCondicion:"_final_",
                        pregunta_de_la_condicion:0,
                        idPreguntaCondicion:0
                    };
                }
                
                console.log(arregloPreguntas[i].listaCondiciones[pos    ]);
                console.log(Object.keys(arregloPreguntas[i].listaCondiciones).length);
                break;
            }
        }
        
    }
}
function seleccionarSalto(IdPregunta,IdRespuesta){
   var sel=document.getElementById("sel_salto_"+IdPregunta+"_"+IdRespuesta);
   console.log(sel.value);
   for(var i in arregloPreguntas){
       if(arregloPreguntas[i].idPregunta==IdPregunta){
            arregloPreguntas[i].listaCondiciones={
                    respuesta:IdRespuesta,
                    tipoCondicion:"_salto_",
                    pregunta_de_la_condicion:sel.value,
                    idPreguntaCondicion:0
                    
                };
                console.log(arregloPreguntas[i]);
                break;
       }
   }
}

function ocultarAbiertas(){                                                                     
    var a=document.getElementsByName("Abiertas");
    for(var i in a){
        if(a[i]!=undefined && a[i].style!=undefined){}
            if(a[i].style.display=='none'){
                a[i].style.display='block';
            }else{
                a[i].style.display='none';
            }       
    }
}
function ocultarCerradas(){                                                                     
    var a=document.getElementsByName("Cerradas");
   for(var i in a){
        if(a[i]!=undefined && a[i].style!=undefined){}
            if(a[i].style.display=='none'){
                a[i].style.display='block';
            }else{
                a[i].style.display='none';
            }       
    }
}
function ocultarCerradaMultiple(){                                                                     
    var a=document.getElementsByName("CerradaMultiple");
    for(var i in a){
        if(a[i]!=undefined && a[i].style!=undefined){}
            if(a[i].style.display=='none'){
                a[i].style.display='block';
            }else{
                a[i].style.display='none';
            }       
    }
}

function ocultarCerradaComentario(){
    var a=document.getElementsByName("CerradasComentario");
    for(var i in a){
        if(a[i]!=undefined && a[i].style!=undefined){}
            if(a[i].style.display=='none'){
                a[i].style.display='block';
            }else{
                a[i].style.display='none';
            }       
    }
}

function ocultarOpcionMultiple(){
    var a=document.getElementsByName("CerradaMultiple");
    for(var i in a){
        if(a[i]!=undefined){}
            if(a[i].style.display=='none'){
                a[i].style.display='block';
            }else{
                a[i].style.display='none';
            }       
    }
}
