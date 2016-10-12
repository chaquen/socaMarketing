var arrPlantillas=new Array();//CAMBIARPOR OBJETO JSON
var idFormulario=0;
var idUser="";
var idRol="";
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
        for(var i in rdbtn){
            if(rdbtn[i].checked==true){
                 rango=rdbtn[i].id.split("_");
            }
        }
    
    var hdIdUser=document.getElementById("hdIdUser");
  //  var idPlantilla=document.getElementById("--");
           //if(divPreguntas.length>0){
           console.log(arrPlantillas.length);
           if(arrPlantillas.length>0 && document.getElementById("txbNombreEncuesta").value.length>0 && rango[1]!=undefined){
               /*var arrPreguntas=new Array();
                console.log(divPreguntas);
                  for(var i in divPreguntas){
                     arrPreguntas.push(divPreguntas[i].id);
                  }*/
                 var enc = new encuesta("registrarEncuesta",
                         document.getElementById("txbNombreEncuesta").value,
                         "0",
                         arrPlantillas,
                         idUser,
                         rango[1]
                         );
                    //alert(idRol);
                     //alert(idUser);
                 var respEnc = enc.metodo();                       
                 respEnc.success(function(respServidor)
                 {
                   
                     if(confirm("Encuesta creada exitosamente \ndesea crear otra encuesta? precione ACEPTAR \nsi desea salir presione CANCELAR")){
                        limpiarPreguntasDelFormulario();  
                        location.reload(true);
                     }else{
                        
                         location.href="/menuAdministrador.html?idUser="+idUser+"&rol="+idRol;
                     }  
                     
                     
                     //  location.href="/crearEncuestas.html";
                     document.getElementById("txbNombreEncuesta").value="";
                     //document.getElementById("txbCantMuestra").value="";
                    // location.reload(true); 
                 }).fail(function(){});        
           }
           else{
               if(arrPlantillas.length<=0){
                   alert("No ha seleccionado ninguna pregunta");
               }else if(document.getElementById("txbNombreEncuesta").value.length==0){
                   alert("Por favor ingrese un nombre para la encuesta");
               }
               
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
    if(pregunta!=undefined){
        
        pregunta.setAttribute("onclick","agregarPreguntaAbierta("+pregunta.id+");"); 
        pregunta.setAttribute("name","Abiertas");
        divPrincipal.appendChild(pregunta);    
        eliminarElementoArray(id);        
    }
}
function eliminarElementoArray(id){
    for(var i in arrPlantillas){
        if(arrPlantillas[i]==id){
            arrPlantillas.splice(i,1);
            document.getElementById("hdArray").value=arrPlantillas;
        }
    }
    console.log(arrPlantillas);
    idFormulario="0";
}
function agregarElementoArray(id){
  //for(var i in arrPlantillas){
  if(arrPlantillas.length==0){
      arrPlantillas.push(''+id+''); 
      document.getElementById("hdArray").value=arrPlantillas;
  }
   for(var i =0;i<=arrPlantillas.length-1;i++) {
      if(arrPlantillas[i]==id){
          console.log(arrPlantillas[i])
        break;
      }else{
          arrPlantillas.push(''+id+''); 
          //alert(id);
          document.getElementById("hdArray").value=arrPlantillas;
          break;
      }
  }
//  console.log(arrPlantillas.length);
      console.log(arrPlantillas);
      idFormulario="0";
}
function agregarPreguntaAbierta(id){
  
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var pregunta=document.getElementById(id);  
  pregunta.setAttribute("onclick","eliminarPreguntaAbierta("+id+");");
  pregunta.setAttribute("name","seleccionada");
  divPrincipal.appendChild(pregunta);
  agregarElementoArray(id);
  
  //console.log(arrPlantillas);
}

function eliminarPreguntaCerrada(id){
    var divPrincipal=document.getElementById("divCerradas");
     var pregunta=document.getElementById(id);  
     if(pregunta!=undefined){
         pregunta.setAttribute("onclick","agregarPreguntaCerrada("+pregunta.id+");"); 
        pregunta.setAttribute("name","Cerradas");
        divPrincipal.appendChild(pregunta);   
        eliminarElementoArray(id);
     }
     
}
function agregarPreguntaCerrada(id){
  //alert("Cerrada");
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var pregunta=document.getElementById(id);
   
      /*
                    var valSeparado=preguntas[i].value.split("_");
                    var rbtn=document.createElement("input");
                    var lbl= document.createElement("label");
                    var txt=document.createTextNode(valSeparado[1]);
                    rbtn.setAttribute("type","checkbox");
                     rbtn.setAttribute("name","listaPreguntas");
                    rbtn.setAttribute("value",valSeparado[0]);
                    lbl.appendChild(txt);
                    div.appendChild(rbtn);
                    div.appendChild(lbl);
                    preguntas[i].checked=false;
                    preguntas[i].setAttribute("name","seleccionada");
              */
              pregunta.setAttribute("onclick","eliminarPreguntaCerrada("+id+");");
              pregunta.setAttribute("name","seleccionada");
              divPrincipal.appendChild(pregunta);
              agregarElementoArray(id);
}   

function agregarPreguntaCerradaComentario(id){
    
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var preguntas=document.getElementById(id);
  preguntas.setAttribute("onclick","eliminarPreguntaCerradaComentario("+id+");");
   preguntas.setAttribute("name","seleccionada");
  divPrincipal.appendChild(preguntas);
   agregarElementoArray(id);
 }
function eliminarPreguntaCerradaComentario(id){
   // alert(id);
  var divPrincipal=document.getElementById("divCerradasComentario");  
  var preguntas=document.getElementById(id);
  if(preguntas!=undefined){
      preguntas.setAttribute("onclick","agregarPreguntaCerradaComentario("+id+");");
      preguntas.setAttribute("name","CerradaComentario");
      divPrincipal.appendChild(preguntas);
      eliminarElementoArray(id);
  }
 }
 
function agregarPreguntaCerradaMultiple(id){
    
  var divPrincipal=document.getElementById("divFormPlantilla");  
  var preguntas=document.getElementById(id);
  preguntas.setAttribute("onclick","eliminarPreguntaCerradaMultiple("+id+");");
  preguntas.setAttribute("name","seleccionada");
  divPrincipal.appendChild(preguntas);
  agregarElementoArray(id);
}
function eliminarPreguntaCerradaMultiple(id){
    
    var divPrincipal=document.getElementById("divCerradasMultiple");  
    var preguntas=document.getElementById(id);
    if(preguntas!=undefined){
         preguntas.setAttribute("onclick","agregarPreguntaCerradaMultiple("+id+");");
         preguntas.setAttribute("name","CerradaMultiple");
         divPrincipal.appendChild(preguntas);
         eliminarElementoArray(id);
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
            //console.debug(datosJson[0].pregunta);
            for(var elemento in datosJson){
                //console.log(datosJson[elemento].pregunta);
                switch(datosJson[elemento].Tipo){
                    case "Abierta": 
                           var divAbiertas=document.getElementById("divAbiertas");
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
                         var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         
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
                         divCerradas.appendChild(ul);
                        break;
                    case "CerradaComentario":
                         var divCerradaComentario=document.getElementById("divCerradasComentario");
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