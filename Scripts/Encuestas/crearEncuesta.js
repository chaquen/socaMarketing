var arrPlantillas=new Array();
var idFormulario=0;
var idUser="";
var idRol="";
var arregloPreguntas={};//NUEVO OBJETO PARA ALMACENAR ARRAY CON ESTRUCTURA JSON
var usuarioLogueado;
function iniciarCrearEncuesta(){
 if(sessionStorage.usuarioLogueado!=undefined){
      usuarioLogueado=JSON.parse(sessionStorage["usuarioLogueado"]); 
      idUser=usuarioLogueado.idUsuario;
      idRol=usuarioLogueado.rol;   
 }
 //console.log("load");
 cargarPreguntas("liFormPlantilla");
 //cargarRangos();    
 var ancla=document.getElementById("volver");
 ancla.setAttribute("href","menuAdministrador.html");   

 document.getElementById("btnCrearEncuesta").addEventListener("click",crearEncuesta,false);
   
 

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





function limpiarPreguntasDelFormulario(){
    //alert("HOla");
    //var divPreguntas=document.getElementsByName("seleccionada");
    var divPlantillaEncuesta=document.getElementById("liFormPlantilla");
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
        var seleccionado=true;
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
                         ""
                         );
                 var respEnc = enc.metodo();                       
                 respEnc.success(function(respServidor)
                 {
                   if(respServidor!=false){
                       if(confirm("Encuesta creada exitosamente \ndesea crear otra encuesta? precione ACEPTAR \nsi desea salir presione CANCELAR")){
                        limpiarPreguntasDelFormulario();  
                        //location.reload(true);
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
  var divPrincipal=document.getElementById("liFormPlantilla");  
  var btnPregunta=document.getElementById("btnA_"+id);
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
  var divPrincipal=document.getElementById("liFormPlantilla");  
  var btnPregunta=document.getElementById("btnA_"+id);
  var pregunta=document.getElementById(id);
  
  var divPrincipal=document.getElementById("liFormPlantilla");  
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
  var divPrincipal=document.getElementById("liFormPlantilla");  
  var btnPregunta=document.getElementById("btnA_"+id);
  var pregunta=document.getElementById(id);
  
  var divPrincipal=document.getElementById("liFormPlantilla");  
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
  var divPrincipal=document.getElementById("liFormPlantilla");  
  var btnPregunta=document.getElementById("btnA_"+id);
  var pregunta=document.getElementById(id);
  
  var divPrincipal=document.getElementById("liFormPlantilla");  
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
  btnPregunta.setAttribute("onclick","eliminarPreguntaCerradaMultiple("+id+");");
  divPrincipal.appendChild(pregunta);
  agregarElementoArray(id,argumento);
  //
  /*
  var divPrincipal=document.getElementById("liFormPlantilla");  
  var preguntas=document.getElementById("btnA_"+id);
  preguntas.setAttribute("onclick","eliminarPreguntaCerradaMultiple("+id+");");
  preguntas.setAttribute("value","Agregar pregunta"); 
  preguntas.setAttribute("name","seleccionada");
  divPrincipal.appendChild(preguntas);
  agregarElementoArray(id,argumento);*/
}
function eliminarPreguntaCerradaMultiple(id,argumento){
    var divPrincipal=document.getElementById("divCerradaMultiple");
     var pregunta=document.getElementById(id);  
     var btnPregunta=document.getElementById("btnA_"+id);  
     var btnCondicion=document.getElementsByName("btnSE_"+id);
     if(pregunta!=undefined){
        btnPregunta.setAttribute("onclick","agregarPreguntaCerradaMultiple("+pregunta.id+");"); 
        btnPregunta.setAttribute("value","agregar pregunta"); 
        pregunta.setAttribute("name","CerradaMultiple");
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
    /*var divPrincipal=document.getElementById("divCerradasMultiple");  
    var preguntas=document.getElementById("btnA_"+id);
    if(preguntas!=undefined){
         preguntas.setAttribute("onclick","agregarPreguntaCerradaMultiple("+id+");");
         preguntas.setAttribute("name","CerradaMultiple");
         preguntas.setAttribute("value","Quitar pregunta"); 
         divPrincipal.appendChild(preguntas);
         eliminarElementoArray(id,argumento);
    }*/
} 


function eliminarPreguntaRankin(id){
    var divPrincipal=document.getElementById("divRankin");
     var pregunta=document.getElementById(id);  
     var btnPregunta=document.getElementById("btnA_"+id);  
     var btnCondicion=document.getElementsByName("btnSE_"+id);
     if(pregunta!=undefined){
        btnPregunta.setAttribute("onclick","agregarPreguntaRankin("+pregunta.id+");"); 
        btnPregunta.setAttribute("value","agregar pregunta"); 
        pregunta.setAttribute("name","Rankin");
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
function agregarPreguntaRankin(id,argumento){
 //alert("Cerrada");
  var divPrincipal=document.getElementById("liFormPlantilla");  
  var btnPregunta=document.getElementById("btnA_"+id);
  var pregunta=document.getElementById(id);
  
  var divPrincipal=document.getElementById("liFormPlantilla");  
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
  btnPregunta.setAttribute("onclick","eliminarPreguntaRankin("+id+");");
  divPrincipal.appendChild(pregunta);
  agregarElementoArray(id,argumento);
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
                            tipoCondicion:"1",
                            pregunta_de_la_condicion:0,
                            idPreguntaCondicion:0
                        };
                }else{
                    var pos=Object.keys(arregloPreguntas[i].listaCondiciones).length;
                    arregloPreguntas[i].listaCondiciones[pos]={
                        respuesta:resp,
                        tipoCondicion:"1",
                        pregunta_de_la_condicion:0,
                        idPreguntaCondicion:0
                    };  
                }
                
                console.log(arregloPreguntas[i].listaCondiciones[pos]);
                console.log(Object.keys(arregloPreguntas[i].listaCondiciones).length);
                break;
            }
        }
        
    }
}
function seleccionarSalto(IdPregunta,IdRespuesta){
   var sel=document.getElementById("sel_salto_"+IdPregunta+"_"+IdRespuesta);
   var tam;
   console.log(sel.value);
   for(var i in arregloPreguntas){
       if(arregloPreguntas[i].idPregunta==IdPregunta){
           
            tam=Object.keys(arregloPreguntas[i].listaCondiciones).length;
           
            arregloPreguntas[i].listaCondiciones[tam]={
                    respuesta:IdRespuesta,//respuesta de la condicion
                    tipoCondicion:"2",//_salto_
                    pregunta_de_la_condicion:sel.value,//pregunta al a cual va a saltar
                    idPreguntaCondicion:IdPregunta
                    
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
function ocultarRankin(){                                                                     
    var a=document.getElementsByName("Rankin");
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
