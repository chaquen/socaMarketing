/*
 * Function que envia una peticion post al servidor
 * 
 * @returns {$.ajax()}
 */
function funPeticion(){
    
    var datos=JSON.stringify(this); 
    console.log(datos);
    return $.ajax({
        url:"Controlador/"+this.url+"_controlador.php",
        data:{datos:datos},
	type:"post",
        dataType:"json"
                      
    });
}
/*
 * Funcion para subir un archivo al servidor 
 * @param {type} url
 * @param {type} parametros
 * @param {type} divRes
 * @returns {undefined}
 */
function peticionAjaxUpload(url,parametros){
				     	        
       console.log(parametros);
       var resp = document.getElementById("divResp");
       resp.innerHTML="Cargando...";
		return $.ajax({
			data:parametros,
			url: "Controlador/"+url+"_controlador.php",
			type:'post',
                        dataType:"json",
			//Requeridos para subir archivo
			cache:false,
			contentType:false,
			processData:false
			
		});		
}

/*
 *Funcion para crear la tabla con el listado de los formularios 
 */
function crearTablaListaFormularios(datosJson,idUsuario,rol){
    console.log(datosJson);
    var tam=Object.keys(datosJson).length;
        
        var lista=document.getElementById("tablaFormularios");
       // var lista=document.getElementById("tblForms");
     //alert(tam/2);  
        //var elementoLista=document.createElement("li");
        //var a=0;
        var i=0;
     //  while(i<tam/2){
             //  var fila=document.createElement("tr");
           //    var d=0;
             for(var a in datosJson){
                    //alert(Number(datosJson[a].AsignadasUsuario)-Number(datosJson[a].RealizadasUsuario)); 
                    var li=document.createElement("li");
                    var texto=document.createElement("H4");
                    var textDos=document.createElement("H5");
                    var hidden=document.createElement("input");
                    var nodoTexto=document.createTextNode(datosJson[a].NombreEncuesta);
                    var ancla=document.createElement("a");
                    var num=Number(datosJson[a].AsignadasUsuario)-Number(datosJson[a].RealizadasUsuario);
                    var realizadas=document.createTextNode("pendientes: "+String(num));
                   
                    li.setAttribute("onClick","irAEntrevista("+datosJson[a].IdEncuesta+","+idUsuario+","+rol+");");
                    
                    hidden.setAttribute("type","hidden");
                    hidden.setAttribute("name","idForm");
                    hidden.setAttribute("value",datosJson[a].IdFormulario);

                    texto.appendChild(nodoTexto);
                    textDos.appendChild(realizadas);    
                    li.appendChild(hidden);
                    
                    ancla.appendChild(texto);
                    ancla.appendChild(textDos);
                    
                    li.appendChild(ancla);
                    lista.appendChild(li);
        }      
        
        //  div.appendChild(tabla);
        
}
function irAEntrevista(idEnc,idUser,rol){
    location.href="/SocaMarketing/Entrevistas.html?idEnc="+idEnc+"&idUser="+idUser+"&rol="+rol;
}

/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectFormulario(objselect,datos){
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una encuesta--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
      objselect.appendChild(opcion);
     for (var i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdFormulario;
        opcion.innerHTML=datos[i].NombreFormulario;
        //opcion.innerHTML=datos[i].NombreFormulario.substring(10);
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}
function crearSelectPreguntasSalto(objselect,datos,IdPregunta){
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una pregunta--";
       
      objselect.appendChild(opcion);
      var valorSalida=0;
     for (var i in datos){
        console.debug(datos[i]);
        console.log(IdPregunta);
        console.log(i);
        if(IdPregunta==datos[i].idPregunta){
            valorSalida=i;
            break;
            
        }

      }
      console.log(valorSalida);
      for (var j in datos){
        if(j > valorSalida  ){
                 console.debug(datos[j]);
                console.log(IdPregunta);
                console.log(j);
                if(IdPregunta!=datos[j].idPregunta){
                    
                   var opcion=document.createElement("option");
                   var v=Number(j);
                   opcion.value=v+1;
                   opcion.innerHTML=datos[j].argumento;
                   objselect.appendChild(opcion);

                }
        }

      }
}

/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectMuestra(objselect,datos){
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una muestra--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    for (var i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdDescripcionMuestra;
        opcion.innerHTML=datos[i].NombreMuestra+" ("+datos[i].registros+")";
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}
function crearSelectMuestraDos(objselect,datos){
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una base de datos--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    for (var i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdDescripcionMuestra;
        opcion.innerHTML=datos[i].NombreMuestra;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}
/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectRol(objselect,datos){
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione un rol--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    //var select = document.getElementById("selCategoria");
    for (i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdRol;
        opcion.innerHTML=datos[i].NombreRol;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}

/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectUsuario(objselect,datos){
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione un usuario--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    //var select = document.getElementById("selCategoria");
    for (i in datos){
        
        var opcion=document.createElement('option');
        //opcion.value=datos[i].IdUsuario+"_"+datos[i].Nombre+" "+datos[i].Apellido;
        opcion.value=datos[i].IdUsuario;
        opcion.innerHTML=datos[i].Nombre+" "+datos[i].Apellido;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}

/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectModulos(objselect,datos){
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione un modulo--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    //var select = document.getElementById("selCategoria");
    for (i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdModulo;
        opcion.innerHTML=datos[i].NombreModulo;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}
/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectEncuestas(objselect,datos){
    
    //alert(objselect.childNodes.length);
    //console.log(objselect.childNodes.length);
    console.log(datos);
    
    if(objselect!=null){
        for(var i =objselect.childNodes.length ;objselect.childNodes.length < i;i--){
               console.log(objselect.chilNodes[0]);
               objselect.chilNodes[i].removeChild(objselect.childNodes[i]);
        }
    
    //console.log("Tamaño despues de eliminar nodos "+objselect.childNodes.length);
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una encuesta--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    //var select = document.getElementById("selCategoria");
    for (i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdEncuesta;
        opcion.innerHTML=datos[i].NombreEncuesta;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
      
    }
}

/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectEncuestasDos(objselect,datos){
  //  console.log(objselect);
    //alert(datos);
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una encuesta--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    //var select = document.getElementById("selCategoria");
    for (var i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdEncuesta;
        opcion.innerHTML=datos[i].NombreEncuesta;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}
/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectZonas(objselect,datos){
        objselect.innerHTML="";
        var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una zona--";
        objselect.appendChild(opcion);
         var opcion=document.createElement('option');
        opcion.value="T";
        opcion.innerHTML="--Todas las zona--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    //var select = document.getElementById("selCategoria");
    for (i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdZona;
        opcion.innerHTML=datos[i].NombreZona;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}
function crearSelectZonasDos(objselect,datos){
        objselect.innerHTML="";
        var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una zona--";
        objselect.appendChild(opcion);
        //console.debug(i+"->"+datos[i].NombreCategoria);
     objselect.appendChild(opcion);
    //var select = document.getElementById("selCategoria");
    for (i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdZona;
        opcion.innerHTML=datos[i].NombreZona;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}

/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectZonasReportes(objselect,datos){
     var opcionCero=document.createElement('option');
        opcionCero.value="--";
        opcionCero.innerHTML="--seleccione una zonas--";
    var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="Todas las zonas";
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcionCero);
        objselect.appendChild(opcion);
    //var select = document.getElementById("selCategoria");
    for (i in datos){
        
        var opcion=document.createElement('option');
        opcion.value=datos[i].IdZona;
        opcion.innerHTML=datos[i].NombreZona;
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);

      }  
}
/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectConcesionario(objselect,datos){
   
        var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="--Seleccione una concesionario--";
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcion);
       //var select = document.getElementById("selCategoria");
       for (i in datos){
        
            var opcion=document.createElement('option');
            opcion.value=datos[i].IdConcesionario;
            opcion.innerHTML=datos[i].NombreConcesionario;
          //  console.debug(i+"->"+datos[i].IdConcesionario);
            objselect.appendChild(opcion);

      }  
   
}

/*
 * @param {string} elemento
 * @param {json} datos
 * @returns {undefined}
 */
function crearSelectConcesionarioReportes(objselect,datos){
   
        var opcionCero=document.createElement('option');
        opcionCero.value="--";
        opcionCero.innerHTML="--Seleccione un concesionario--";    
        var opcion=document.createElement('option');
        opcion.value="0";
        opcion.innerHTML="Todos los concesionarios";
        //console.debug(i+"->"+datos[i].NombreCategoria);
        objselect.appendChild(opcionCero);
        objselect.appendChild(opcion);
       //var select = document.getElementById("selCategoria");
       for (var i in datos){
            if(datos[i].IdConcesionario==undefined){
                break;
            }
            var opcion=document.createElement('option');
            opcion.value=datos[i].IdConcesionario;
            opcion.innerHTML=datos[i].NombreConcesionario;
            console.debug(i+"->"+datos[i].IdConcesionario);
            console.debug(i+"->"+datos[i].NombreConcesionario);
            objselect.appendChild(opcion);

      }  
   
}

/*
 * Funcion que valida que el archivo se una Csv
 * @param {type} extension
 * @returns {Boolean}
 */
function esCsv(extension){
    	  
          var opc=extension.toLowerCase();
      //  alert("extencion del archivo es {"+opc+"}");
    	switch(opc){
    		case 'csv':
    			return true;
    		break;
    		default: 
                    
    		 return false;
                 
    		break; 
    	}
}

/*
 * Funcion que valida que el archivo se una Csv
 * @param {type} extension
 * @returns {Boolean}
 */
function esExcel(extension){
    	  
          var opc=extension.toLowerCase();
      //  alert("extencion del archivo es {"+opc+"}");
    	switch(opc){
    		case 'xlsx':
    			return true;
    		break;
    		default: 
                    
    		 return false;
                 
    		break; 
    	}
}

/*
 *Funcion que enlaza una encuesta a un div especifico 
 * 
 */
function cargarEncuesta(id_div,nom_encuesta){
    
    var enc=new encuesta("obtenerEncuesta",nom_encuesta,"");
    var resp=enc.metodo();
    resp.success(function(respServidor){
        //console.log(respServidor);        
        var dtJson=eval(respServidor);
        var tam=Object.keys(dtJson).length;
        var div=document.getElementById(id_div);
        k=1;
        /*
        for(el in dtJson){
            console.log(dtJson[el].pregunta);
            console.log(dtJson[el].Tipo);
            console.log(dtJson[el].OpcionesDeRespuesta);
            //console.log("--");
        }*/
        var hidden=document.getElementById("hdIdEncusta");
        hidden.value=dtJson[0].IdEncuesta;
        for(el in dtJson){
            
            var divDos=document.createElement("div");
            //divDos.className="";
            var lblPregunta=document.createElement("label");
            var txtPregunta=document.createTextNode(k+"-"+dtJson[el].pregunta);
            lblPregunta.appendChild(txtPregunta);
            divDos.appendChild(lblPregunta);
            switch(dtJson[el].Tipo){
                case "Abierta":
                    var inpText=document.createElement("input");
                    inpText.setAttribute("type","text");
                    inpText.setAttribute("id",dtJson[el].IdPreguntas);
                    inpText.setAttribute("name","Abiertas_"+dtJson[el].IdPreguntas);
                    var divTres=document.createElement("div");
                    divTres.appendChild(inpText);
                    divDos.appendChild(divTres);
                    
                  break;
              case "Cerrada":
                  var respuestas = dtJson[el].OpcionesDeRespuesta.split(",");   
                  
                  for(i in respuestas){
                        var lblRadio=document.createElement("label");
                        var divTres=document.createElement("div");
                        
                        txtNodo=document.createTextNode(respuestas[i]);
                        
                        var rdbtn=document.createElement("input");
                        rdbtn.setAttribute("type","radio");
                        rdbtn.setAttribute("name","Cerrada_"+dtJson[el].IdPreguntas);
                        rdbtn.setAttribute("value",respuestas[i]);
                        lblRadio.appendChild(txtNodo);
                        divTres.className="divTres";                       
                        divTres.appendChild(rdbtn);
                        divTres.appendChild(lblRadio);
                        divDos.appendChild(divTres);
                  }
                 break;
              case "CerradaComentario":
                  var respuestas = dtJson[el].OpcionesDeRespuesta.split(",");   
                  for(i in respuestas){
                      var lblRadio=document.createElement("label");
                        var divTres=document.createElement("div");
                    
                                var rdbtn=document.createElement("input");
                                rdbtn.setAttribute("type","radio");
                                rdbtn.setAttribute("name","CerradaComentario_"+dtJson[el].IdPreguntas);
                                var txtNodo=document.createTextNode(respuestas[i]);    
                                rdbtn.setAttribute("value",respuestas[i]);
                                lblRadio.appendChild(txtNodo);
                                var lab=document.createElement("h5");
                                lab.appendChild(txtNodo);
                                divTres.appendChild(lblRadio);
                                
                                
                                divTres.appendChild(rdbtn);
                                
                                divTres.appendChild(lab);
                                
                        divTres.appendChild(lblRadio);
                        //divDos.appendChild(divTres);
                  }
                  var input = document.createElement("input");
                  input.setAttribute("type","text");
                  input.setAttribute("name","CerradaComentario_"+dtJson[el].IdPreguntas);
                  input.setAttribute("id",dtJson[el].IdPreguntas);
                  divDos.appendChild(input);
                 break;
              case "CerradaMultiple":
                   var respuestas = dtJson[el].OpcionesDeRespuesta.split(",");   
                  for(i in respuestas){
                      var lblRadio=document.createElement("label");
                        var divTres=document.createElement("div");
                    
                                var rdbtn=document.createElement("input");
                                rdbtn.setAttribute("type","checkbox");
                                rdbtn.setAttribute("name","CerradaMultiple_"+dtJson[el].IdPreguntas);
                                var txtNodo=document.createTextNode(respuestas[i]);    
                                rdbtn.setAttribute("value",respuestas[0]);
                                lblRadio.appendChild(txtNodo);
                                var lab=document.createElement("label");
                                lab.appendChild(txtNodo);
                                //divTres.appendChild(lblRadio);
                                
                                
                                divTres.appendChild(rdbtn);
                                
                                divTres.appendChild(lab);
                                
                        divTres.appendChild(lblRadio);
                        divDos.appendChild(divTres);
                  }
                 break;
            }
            div.appendChild(divDos);
            //console.log("--");
            k++;
        }
        
    }).fail();
}
/*
 *Funcion con estructura de las preguntas  
 */

/**
 *Muesta la lista de llas plantilals 
 */
function cargarListasPlantillas(){
        var form=new encuesta("consultarEncuestasPorAgente","");
         var respForm = form.metodo();
         respForm.success(function(respServidor){
            var datJson=eval(respServidor);
           var divPlanillas = document.getElementById("divListarPlantillas");
          
           for(i in datJson){
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
        }).fail();
}


function cargarEncuestaDos(id_div,nom_encuesta){
    //alert(nom_encuesta);
    var enc=new encuesta("obtenerEncuesta",nom_encuesta,"");
    var resp=enc.metodo();
    resp.success(function(respServidor){
        console.log(respServidor);        
        var dtJson=eval(respServidor);
        var tam=Object.keys(dtJson).length;
        var divPrincipal=document.getElementById(id_div);
        var labNombre=document.getElementById("nomEncuesta");
        //labNombre.innerHTML="";
        divPrincipal.innerHTML="";
        var hidden=document.getElementById("hdIdEncuesta");
         var datosJson=eval(respServidor);
            //var tam=Object.keys(datosJson).length;
            var i=0;
            var l=1;
         // alert(tam);
            hidden.value=nom_encuesta;  
            var txtNombre=document.createTextNode(datosJson[0].NombreEncuesta);
          //  labNombre.appendChild(txtNombre);
            //console.debug(datosJson[0].pregunta);
             
             var divGrupo=document.createElement("div");
            for(var elemento in datosJson){
                //console.log(datosJson[elemento].pregunta);
               
              
                switch(datosJson[elemento].Tipo){
                    case "Abierta":
                   
                  
                          
                           var ul=document.createElement("ul");
                           
                           ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                           //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                           ul.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas); 
                           
                           var li = document.createElement("li");
                           var argumento=document.createElement("h3");
                           var txtArgumento=document.createTextNode(datosJson[elemento].pregunta);
                           argumento.appendChild(txtArgumento);
                           li.appendChild(argumento);
                           ul.appendChild(li);
                           
                           //var li = document.createElement("li");
                           var respuesta=document.createElement("input");
                           respuesta.setAttribute("type","text");
                           respuesta.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas);
                           respuesta.setAttribute("placeholder","respuesta");                           
                           respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                           li.appendChild(respuesta);
                           ul.appendChild(li);
                            
                            
                            
                           
                        divPrincipal.appendChild(ul);
                    
                  
                       
                        break;
                    case "Cerrada":
                      
                    
                         var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         //ul.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                         var li = document.createElement("li");
                         var argumento=document.createElement("h3");
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
                            opcion.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                            var respuestaOpcion=document.createElement("h4");
                            var txtRespuesta=document.createTextNode(strRespuestas[i]);
                            respuestaOpcion.appendChild(txtRespuesta);
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            ul.appendChild(li);
                            
                         }
                        
                        
                          divPrincipal.appendChild(ul);
                        
                        break;
                    case "CerradaComentario":
                         
                         var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                         ul.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                         var li = document.createElement("li");
                         var argumento=document.createElement("h3");
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
                            var respuestaOpcion=document.createElement("h4");
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
                           
                           divPrincipal.appendChild(ul);
                        break;
                    case "CerradaMultiple":
                        
                         var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                       //  ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                         //ul.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                         var li = document.createElement("li");
                         var argumento=document.createElement("h3");
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
                            opcion.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                            var respuestaOpcion=document.createElement("h4");
                            var txtRespuesta=document.createTextNode(strRespuestas[i]);
                            respuestaOpcion.appendChild(txtRespuesta);
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            ul.appendChild(li);
                            
                         }
                         divPrincipal.appendChild(ul);
                       
                    break;
                }
               
                
                 
                
            }

        }).fail();

}

/*Funcion para dibujar una tabla con los concesioanrios */
function crearTablaConcesionario(dtJson){
    console.log(dtJson);
    var div=document.getElementById("divConcesionarios");
    var tabla=document.createElement("table");
    console.log(div.childNodes.length);
   
    if(div.childNodes.length > 1){
     
        div.innerHTML="";
        for(var i in dtJson){
            var nombre=dtJson[i].NombreConcesionario;
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dtJson[i].CodigoConcesionario);
            h3.appendChild(txt);
            celda.appendChild(h3);
            fila.appendChild(celda);
            
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dtJson[i].NombreConcesionario);
            h3.appendChild(txt);
              celda.appendChild(h3);
            fila.appendChild(celda);
           
           if(dtJson[i].Director==""){
                var dir="--";
            }else{
                var dir=dtJson[i].Director;    
                }
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dir);
            h3.appendChild(txt);
            celda.appendChild(h3);
            fila.appendChild(celda);
            
            
             var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",dtJson[i].IdConcesionario);
            btn.setAttribute("value","Eliminar");
             btn.setAttribute("type","button");
            btn.setAttribute("onClick","eliminarConcesionario("+dtJson[i].IdConcesionario+")");
            celda.appendChild(btn);
            fila.appendChild(celda);

             var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",dtJson[i].IdConcesionario);
            btn.setAttribute("value","Editar");
             btn.setAttribute("type","button");
            btn.setAttribute("onClick","editarConcesionario('"+dtJson[i].IdConcesionario+"','"+nombre.trim()+"','"+dir+","+"Concesionario"+"')");
            celda.appendChild(btn);
            fila.appendChild(celda);   
            
            
            tabla.appendChild(fila);
        }

         div.appendChild(tabla);
        
    }else{
        div.innerHTML="";
        for(var i in dtJson){
          var nombre=dtJson[i].NombreConcesionario;
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dtJson[i].CodigoConcesionario);
            h3.appendChild(txt);
            celda.appendChild(h3);
            fila.appendChild(celda);
            
            
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dtJson[i].NombreConcesionario);
            h3.appendChild(txt);
            celda.appendChild(h3);
           fila.appendChild(celda);
         //   alert(dtJson[i].Director);
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            if(dtJson[i].Director==""){
                var dir="--";
            }else{
                var dir=dtJson[i].Director;    
                }
            var txt=document.createTextNode(dir);
            h3.appendChild(txt);
            celda.appendChild(h3);
             fila.appendChild(celda);

              var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",dtJson[i].IdConcesionario);
            btn.setAttribute("value","Eliminar");
             btn.setAttribute("type","button");
            btn.setAttribute("onClick","eliminarConcesionario("+dtJson[i].IdConcesionario+")");
            celda.appendChild(btn);
            fila.appendChild(celda);   

             var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",dtJson[i].IdConcesionario);
            btn.setAttribute("value","Editar");
             btn.setAttribute("type","button");
            btn.setAttribute("onClick","editarConcesionario('"+dtJson[i].IdConcesionario+"','"+nombre.trim()+"','"+dir+"','"+"Concesionario"+"')");
            celda.appendChild(btn);
            fila.appendChild(celda);   
                

            tabla.appendChild(fila);
        }

         div.appendChild(tabla);
    }
    
}
function crearTablaZonas(dtJson,div){
    console.log(dtJson);
    var div=document.getElementById(div);
    var tabla=document.createElement("table");
    console.log(div.childNodes.length);
   
    if(div.childNodes.length >= 1){
     
        div.innerHTML="";
        for(var i in dtJson){
            var nombre=dtJson[i].NombreZona;
            var fila=document.createElement("tr");
            /*var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dtJson[i].IdZona);
            h3.appendChild(txt);
            celda.appendChild(h3);
            fila.appendChild(celda);*/
            
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dtJson[i].NombreZona);
            h3.appendChild(txt);
              celda.appendChild(h3);
            fila.appendChild(celda);
           // alert(dtJson[i].Director);
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            if(dtJson[i].DirectorZona==""){
                var dir="--";
            }else{
                var dir=dtJson[i].DirectorZona;    
                }
            var txt=document.createTextNode(dir);
            h3.appendChild(txt);
            celda.appendChild(h3);
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",dtJson[i].IdZona);
            btn.setAttribute("value","Eliminar");
             btn.setAttribute("type","button");
            btn.setAttribute("onClick","eliminarZona("+dtJson[i].IdZona+")");
            celda.appendChild(btn);
            fila.appendChild(celda);
            
            var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",dtJson[i].IdZona);
            btn.setAttribute("value","Editar");
             btn.setAttribute("type","button");
            btn.setAttribute("onClick","editarZona('"+dtJson[i].IdZona+"','"+nombre.trim()+"','"+dir+"','"+"Zona"+"')");
            celda.appendChild(btn);
            fila.appendChild(celda);
            
            tabla.appendChild(fila);
        }

         div.appendChild(tabla);
        
    }else{
        div.innerHTML="";
        for(var i in dtJson){
            var nombre=dtJson[i].NombreZona;
          var fila=document.createElement("tr");
           /*var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dtJson[i].IdZona);
            h3.appendChild(txt);
            celda.appendChild(h3);
            fila.appendChild(celda);*/
            
            
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
            var txt=document.createTextNode(dtJson[i].NombreZona);
            h3.appendChild(txt);
            celda.appendChild(h3);
           fila.appendChild(celda);
         //   alert(dtJson[i].Director);
            var celda=document.createElement("td");
            var h3=document.createElement("h3");
             if(dtJson[i].DirectorZona==""){
                var dir="--";
            }else{
                var dir=dtJson[i].Director;    
                }
            var txt=document.createTextNode(dir);
            h3.appendChild(txt);
            celda.appendChild(h3);
             fila.appendChild(celda);

             var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",dtJson[i].IdZona);
            btn.setAttribute("value","Editar");
             btn.setAttribute("type","button");
            btn.setAttribute("onClick","editarZona('"+dtJson[i].IdZona+"','"+nombre.trim()+"','"+dir+"','"+"Zona"+"')");
            celda.appendChild(btn);
            fila.appendChild(celda);

            tabla.appendChild(fila);
        }

         div.appendChild(tabla);
    }
    
}

function encuestaReporteNoCopiaFuncional(datosJson,id_div){
        //console.log(datosJson);
        var tam=Object.keys(datosJson).length;
        var divPrincipal=document.getElementById(id_div);
        var tbl=document.createElement("table");
        var tr=document.createElement("tr");
        
      //  var labNombre=document.getElementById("hNombre");
       //alert(divPrincipal.childNodes.length);
        var hidden=document.getElementById("hdIdEncuestaReporte");
        
        
           var i=0;
            hidden.value=datosJson[0].IdPreguntas;  
            var txtNombre=document.createTextNode(datosJson[0].NombreEncuesta);
          //  labNombre.appendChild(txtNombre);
            //console.debug(datosJson[0].pregunta);
            for(var elemento in datosJson){
              
                
                switch(datosJson[elemento].Tipo){
                    case "Abierta":
                        var tr=document.createElement("tr");
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divUno=document.createElement("div");
                        var divDos=document.createElement("div");
                        var divCuatro=document.createElement("div");
                        
                        var txbResp=document.createElement("input");
                        txbResp.setAttribute("type","text");
			txbResp.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas);
                        txbResp.setAttribute("id",datosJson[elemento].IdPreguntas);
                        txbResp.setAttribute("placeholder","respuesta.");
                        
                        label.appendChild(txtLabel);
                        
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
            //          divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        //divCuatro.setAttribute("onclick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                        //divDos.setAttribute("name","Abiertas");
                        divDos.className="divDos";
                        divDos.appendChild(label);
                        
                    //    divCuatro.className="divCuatro";
                     //   divCuatro.appendChild(txbResp); 
                        divUno.className="divUno";
                        divUno.appendChild(divDos);
                     //   divUno.appendChild(divCuatro);
                       tr.appendChild(divUno);
                        //divPrincipal.appendChild(divUno);
                       //divPrincipal.appendChild(tr);
                       tbl.appendChild(tr);
                        break;
                    case "Cerrada":
                      
                        var tr=document.createElement("tr");
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divUno=document.createElement("div");
                        var divDos=document.createElement("div");
                        var divValores=document.createElement("div");
                       //  divValores.setAttribute("class","divRespuestas");
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
              //          divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        
                        
                        divDos.className="divDos";
                        divDos.appendChild(label);
                        divUno.appendChild(divDos);
                     //   divUno.appendChild(divValores);    
                        //var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                       /* for(i in respuestas){
                            var Elementolista=document.createElement("li");
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
		            rad.setAttribute("name","Cerrada");
                         //   j++;
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            lista.className="divTres";
                            divTres.appendChild(rad);
                            divTres.appendChild(labelRes);
                            divUno.appendChild(divTres);
                        }
                       */ 
                      
                      /*  var lista=document.createElement("ul");
                        for(i in respuestas){
                           
                            var elementoLista=document.createElement("li");
                            elementoLista.className="divTres";
                            var labelRes=document.createElement("label");
                        /*    var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
                            rad.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                            rad.setAttribute("value",respuestas[i]);
                          
                            //console.log(respuestas[i]);
                          var txtLabelRes=document.createTextNode(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            elementoLista.setAttribute("id",respuestas[i]);
                            //elementoLista.appendChild(rad);
                            elementoLista.appendChild(labelRes);
                            lista.appendChild(elementoLista);
                            divUno.appendChild(lista);
                        }
                     */
                        tr.appendChild(divUno);
                        //divPrincipal.appendChild(divUno);
                        //divPrincipal.appendChild(tr);
                        tbl.appendChild(tr);
                        
                        // divPrincipal.appendChild(divUno);
                        
                        break;
                    case "CerradaComentario":
                        var tr=document.createElement("tr");
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divCuatro=document.createElement("div");
                        var divDos=document.createElement("div");
                        var divUno=document.createElement("div");
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                     //   divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        divDos.appendChild(label);
                        divDos.className="divDos";
                        divUno.appendChild(divDos);
                        
                        
                        
                    /*    
                        var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                        var lista=document.createElement("ul");
                        for(i in respuestas){
                            //li
                            //var divTres=document.createElement("div");
                            var elementoLista=document.createElement("li");
                            elementoLista.className="divTres";
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
		            rad.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                            rad.setAttribute("value",respuestas[i]);
                        //   j++;
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            //elementoLista.appendChild(rad);
                            elementoLista.appendChild(labelRes);
                            lista.appendChild(elementoLista);
                            divUno.appendChild(lista);
                        }
                        */
                      /* divCuatro.className="divCuatro";
                        var input = document.createElement("input");
                        input.setAttribute("type","text");
                        input.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                        input.setAttribute("id",+datosJson[elemento].IdPreguntas);
                        divUno.appendChild(input);
                        */
                       
                        tr.appendChild(divUno);
                        tbl.appendChil(tr);
                        
                        //divPrincipal.appendChild(divUno);
                        //divPrincipal.appendChild(tr);
                         //divPrincipal.appendChild(divUno);
                        
                        
                        break;
                    case "CerradaMultiple":
                     
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                       
                        var divDos=document.createElement("div");
                        var divUno=document.createElement("div");
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                      //  divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        divDos.appendChild(label);
                        divUno.appendChild(divDos);
                        
                    /*    var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                        for(i in respuestas){
                            var divTres=document.createElement("div");
                            divTres.className="divTres";
                            var labelRes=document.createElement("label");
                        /*    var chb=document.createElement("input");
                            chb.setAttribute("type","checkbox");
                            chb.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                            chb.setAttribute("value",respuestas[i]);
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            divTres.appendChild(chb);
                            divTres.appendChild(labelRes);
                            divUno.appendChild(divTres);
                        }*/
                      divPrincipal.appendChild(divUno);
                        break;
                }
               tbl.appendChild(tr);
               tbl.setAttribute("id","tblReporte");
               divPrincipal.appendChild(tbl);
            }

  
}
function encuestaReporte(datosJson,id_div){
        //console.log(datosJson);
        var tam=Object.keys(datosJson).length;
        var divPrincipal=document.getElementById(id_div);
       
        
      //  var labNombre=document.getElementById("hNombre");
       //alert(divPrincipal.childNodes.length);
        var hidden=document.getElementById("hdIdEncuestaReporte");
        
        
           var i=0;
            hidden.value=datosJson[0].IdPreguntas;  
            var txtNombre=document.createTextNode(datosJson[0].NombreEncuesta);
          //  labNombre.appendChild(txtNombre);
            //console.debug(datosJson[0].pregunta);
            for(var elemento in datosJson){
              
                
                switch(datosJson[elemento].Tipo){
                    case "Abierta":
                        
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divUno=document.createElement("table");
                        var divDos=document.createElement("tr");
                        var divCuatro=document.createElement("div");
                        
                        var txbResp=document.createElement("input");
                        txbResp.setAttribute("type","text");
			txbResp.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas);
                        txbResp.setAttribute("id",datosJson[elemento].IdPreguntas);
                        txbResp.setAttribute("placeholder","respuesta.");
                        
                        label.appendChild(txtLabel);
                        
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
            //          divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        //divCuatro.setAttribute("onclick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                        //divDos.setAttribute("name","Abiertas");
                        divDos.className="divDos";
                        divDos.appendChild(label);
                        
                    //    divCuatro.className="divCuatro";
                     //   divCuatro.appendChild(txbResp); 
                        divUno.className="divUno";
                        divUno.appendChild(divDos);
                     //   divUno.appendChild(divCuatro);
                       
                        divPrincipal.appendChild(divUno);
                       //divPrincipal.appendChild(tr);
                       
                        break;
                    case "Cerrada":
                      
                       
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divUno=document.createElement("table");
                        var divDos=document.createElement("tr");
                        var divValores=document.createElement("div");
                       //  divValores.setAttribute("class","divRespuestas");
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
              //          divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        
                        
                        divDos.className="divDos";
                        divDos.appendChild(label);
                        divUno.appendChild(divDos);
                     //   divUno.appendChild(divValores);    
                        //var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                       /* for(i in respuestas){
                            var Elementolista=document.createElement("li");
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
		            rad.setAttribute("name","Cerrada");
                         //   j++;
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            lista.className="divTres";
                            divTres.appendChild(rad);
                            divTres.appendChild(labelRes);
                            divUno.appendChild(divTres);
                        }
                       */ 
                      
                      /*  var lista=document.createElement("ul");
                        for(i in respuestas){
                           
                            var elementoLista=document.createElement("li");
                            elementoLista.className="divTres";
                            var labelRes=document.createElement("label");
                        /*    var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
                            rad.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                            rad.setAttribute("value",respuestas[i]);
                          
                            //console.log(respuestas[i]);
                          var txtLabelRes=document.createTextNode(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            elementoLista.setAttribute("id",respuestas[i]);
                            //elementoLista.appendChild(rad);
                            elementoLista.appendChild(labelRes);
                            lista.appendChild(elementoLista);
                            divUno.appendChild(lista);
                        }
                     */
                        
                        divPrincipal.appendChild(divUno);
                        
                        // divPrincipal.appendChild(divUno);
                        
                        break;
                    case "CerradaComentario":
                        
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divCuatro=document.createElement("div");
                        var divDos=document.createElement("tr");
                        var divUno=document.createElement("table");
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                     //   divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        divDos.appendChild(label);
                        divDos.className="divDos";
                        divUno.appendChild(divDos);
                        
                        
                        
                    /*    
                        var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                        var lista=document.createElement("ul");
                        for(i in respuestas){
                            //li
                            //var divTres=document.createElement("div");
                            var elementoLista=document.createElement("li");
                            elementoLista.className="divTres";
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
		            rad.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                            rad.setAttribute("value",respuestas[i]);
                        //   j++;
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            //elementoLista.appendChild(rad);
                            elementoLista.appendChild(labelRes);
                            lista.appendChild(elementoLista);
                            divUno.appendChild(lista);
                        }
                        */
                      /* divCuatro.className="divCuatro";
                        var input = document.createElement("input");
                        input.setAttribute("type","text");
                        input.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                        input.setAttribute("id",+datosJson[elemento].IdPreguntas);
                        divUno.appendChild(input);
                        */
                       
                        
                        divPrincipal.appendChild(divUno);
                        //divPrincipal.appendChild(tr);
                         //divPrincipal.appendChild(divUno);
                        
                        
                        break;
                    case "CerradaMultiple":
                     
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                       
                        var divDos=document.createElement("tr");
                        var divUno=document.createElement("table");
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                      //  divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        divDos.appendChild(label);
                        divUno.appendChild(divDos);
                        
                    /*    var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                        for(i in respuestas){
                            var divTres=document.createElement("div");
                            divTres.className="divTres";
                            var labelRes=document.createElement("label");
                        /*    var chb=document.createElement("input");
                            chb.setAttribute("type","checkbox");
                            chb.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                            chb.setAttribute("value",respuestas[i]);
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            divTres.appendChild(chb);
                            divTres.appendChild(labelRes);
                            divUno.appendChild(divTres);
                        }*/
                      divPrincipal.appendChild(divUno);
                        break;
                }
              
            }

  
}
function encuestaReporteMensual(datosJson,id_div){
        //console.log(datosJson);
        var tam=Object.keys(datosJson).length;
        var divPrincipal=document.getElementById(id_div);
      //  var labNombre=document.getElementById("hNombre");
       //alert(divPrincipal.childNodes.length);
     //   var hidden=document.getElementById("hdIdEncuestaReporte");
        
        
           var i=0;
       //     hidden.value=datosJson[0].IdPreguntas;  
            var txtNombre=document.createTextNode(datosJson[0].NombreEncuesta);
          //  labNombre.appendChild(txtNombre);
            
            for(var elemento in datosJson){
       //     console.debug(datosJson[elemento].pregunta);  
                
                switch(datosJson[elemento].Tipo){
                    case "Abierta":
    /*        
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divUno=document.createElement("div");
                        var divDos=document.createElement("div");
                        var divCuatro=document.createElement("div");
                        
                        var txbResp=document.createElement("input");
                        txbResp.setAttribute("type","text");
			txbResp.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas);
                        txbResp.setAttribute("id",datosJson[elemento].IdPreguntas);
                        txbResp.setAttribute("placeholder","respuesta.");
                        
                        label.appendChild(txtLabel);
                        
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
            //          divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        //divCuatro.setAttribute("onclick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                        //divDos.setAttribute("name","Abiertas");
                        divDos.className="divDos";
                        divDos.appendChild(label);
                        
                        divCuatro.className="divCuatro";
                        divCuatro.appendChild(txbResp); 
                        divUno.className="divUno";
                        divUno.appendChild(divDos);
                        divUno.appendChild(divCuatro);
                        divPrincipal.appendChild(divUno);
      */                 
                        break;
                    case "Cerrada":
                      
                    
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divUno=document.createElement("div");
                        var divDos=document.createElement("div");
                        var divValores=document.createElement("div");
                       //  divValores.setAttribute("class","divRespuestas");
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
              //          divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        
                        
                        divDos.className="divDos";
                        divDos.appendChild(label);
                        divUno.appendChild(divDos);
                     //   divUno.appendChild(divValores);    
                        //var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                       /* for(i in respuestas){
                            var Elementolista=document.createElement("li");
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
		            rad.setAttribute("name","Cerrada");
                         //   j++;
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            lista.className="divTres";
                            divTres.appendChild(rad);
                            divTres.appendChild(labelRes);
                            divUno.appendChild(divTres);
                        }
                       */ 
                      
                      /*  var lista=document.createElement("ul");
                        for(i in respuestas){
                           
                            var elementoLista=document.createElement("li");
                            elementoLista.className="divTres";
                            var labelRes=document.createElement("label");
                        /*    var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
                            rad.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                            rad.setAttribute("value",respuestas[i]);
                          
                            //console.log(respuestas[i]);
                          var txtLabelRes=document.createTextNode(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            elementoLista.setAttribute("id",respuestas[i]);
                            //elementoLista.appendChild(rad);
                            elementoLista.appendChild(labelRes);
                            lista.appendChild(elementoLista);
                            divUno.appendChild(lista);
                        }
                     */
                        
                        
                         divPrincipal.appendChild(divUno);
                        
                        break;
                    case "CerradaComentario":
                        
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divCuatro=document.createElement("div");
                        var divDos=document.createElement("div");
                        var divUno=document.createElement("div");
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                     //   divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        divDos.appendChild(label);
                        divDos.className="divDos";
                        divUno.appendChild(divDos);
                        
                        
                        
                    /*    
                        var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                        var lista=document.createElement("ul");
                        for(i in respuestas){
                            //li
                            //var divTres=document.createElement("div");
                            var elementoLista=document.createElement("li");
                            elementoLista.className="divTres";
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
		            rad.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                            rad.setAttribute("value",respuestas[i]);
                        //   j++;
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            //elementoLista.appendChild(rad);
                            elementoLista.appendChild(labelRes);
                            lista.appendChild(elementoLista);
                            divUno.appendChild(lista);
                        }
                        */
                      /* divCuatro.className="divCuatro";
                        var input = document.createElement("input");
                        input.setAttribute("type","text");
                        input.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                        input.setAttribute("id",+datosJson[elemento].IdPreguntas);
                        divUno.appendChild(input);
                        */
                         divPrincipal.appendChild(divUno);
                        
                        
                        break;
                    case "CerradaMultiple":
                     
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                       
                        var divDos=document.createElement("div");
                        var divUno=document.createElement("div");
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                      //  divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        divDos.appendChild(label);
                        divUno.appendChild(divDos);
                        
                    /*    var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                        for(i in respuestas){
                            var divTres=document.createElement("div");
                            divTres.className="divTres";
                            var labelRes=document.createElement("label");
                        /*    var chb=document.createElement("input");
                            chb.setAttribute("type","checkbox");
                            chb.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                            chb.setAttribute("value",respuestas[i]);
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            divTres.appendChild(chb);
                            divTres.appendChild(labelRes);
                            divUno.appendChild(divTres);
                        }*/
                      divPrincipal.appendChild(divUno);
                        break;
                }
            }

  
}

function encuestaReportePregunta(datosJson,id_div){
   
        var tam=Object.keys(datosJson).length;
        var divPrincipal=document.getElementById(id_div);
        var i=0;
    
    
    
            console.debug(datosJson[0]);
            for(elemento in datosJson){
              
                
                switch(datosJson[elemento].Tipo){
                    case "Abierta":
            
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divUno=document.createElement("div");
                        var divDos=document.createElement("div");
                        var divCuatro=document.createElement("div");
                        
                        var txbResp=document.createElement("input");
                        txbResp.setAttribute("type","text");
			txbResp.setAttribute("name","reporte");
                        txbResp.setAttribute("id",datosJson[elemento].IdPreguntas);
                        txbResp.setAttribute("placeholder","respuesta.");
                        
                        label.appendChild(txtLabel);
                        
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                    //  divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        //divCuatro.setAttribute("onclick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                        //divDos.setAttribute("name","Abiertas");
                        divDos.className="divDos";
                        divDos.appendChild(label);
                        
                        divCuatro.className="divCuatro";
                        divCuatro.appendChild(txbResp); 
                        divUno.className="divUno";
                        divUno.appendChild(divDos);
                        divUno.appendChild(divCuatro);
                        divPrincipal.appendChild(divUno);
                       
                        break;
                    case "Cerrada":
                      
                    
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divUno=document.createElement("div");
                        var divDos=document.createElement("div");
                        
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                   //     divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        
                        
                        divDos.className="divDos";
                        divDos.appendChild(label);
                        divUno.appendChild(divDos);
                     
                        var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                       /* for(i in respuestas){
                            var Elementolista=document.createElement("li");
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
		            rad.setAttribute("name","Cerrada");
                         //   j++;
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            lista.className="divTres";
                            divTres.appendChild(rad);
                            divTres.appendChild(labelRes);
                            divUno.appendChild(divTres);
                        }
                       */ 
                        var lista=document.createElement("ul");
                        for(i in respuestas){
                           
                            var elementoLista=document.createElement("li");
                            elementoLista.className="divTres";
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
                            rad.setAttribute("name","reporte");
                            rad.setAttribute("value",respuestas[i]);
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            elementoLista.appendChild(rad);
                            elementoLista.appendChild(labelRes);
                            lista.appendChild(elementoLista);
                            divUno.appendChild(lista);
                        }
                     
                        
                        
                         divPrincipal.appendChild(divUno);
                        
                        break;
                    case "CerradaComentario":
                        
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                        var divCuatro=document.createElement("div");
                        var divDos=document.createElement("div");
                        var divUno=document.createElement("div");
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
          //            divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        divDos.appendChild(label);
                        divDos.className="divDos";
                        divUno.appendChild(divDos);
                        
                        
                        
                        
                        var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                        var lista=document.createElement("ul");
                        for(i in respuestas){
                            //li
                            //var divTres=document.createElement("div");
                            var elementoLista=document.createElement("li");
                            elementoLista.className="divTres";
                            var labelRes=document.createElement("label");
                            var rad=document.createElement("input");
                            rad.setAttribute("type","radio");
		            rad.setAttribute("name","reporte");
                            rad.setAttribute("value",respuestas[i]);
                        //   j++;
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            elementoLista.appendChild(rad);
                            elementoLista.appendChild(labelRes);
                            lista.appendChild(elementoLista);
                            divUno.appendChild(lista);
                        }
                        
                       divCuatro.className="divCuatro";
                        var input = document.createElement("input");
                        input.setAttribute("type","text");
                        input.setAttribute("name","reporte");
                        input.setAttribute("id",+datosJson[elemento].IdPreguntas);
                        divUno.appendChild(input);
                
                         divPrincipal.appendChild(divUno);
                        
                        
                        break;
                    case "CerradaMultiple":
                     
                        var label=document.createElement("label");
                        var txtLabel=document.createTextNode(datosJson[elemento].IdPreguntas+"- "+datosJson[elemento].pregunta);
                       
                        var divDos=document.createElement("div");
                        var divUno=document.createElement("div");
                         
                        divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
          //              divUno.setAttribute("onclick","generarReporte("+datosJson[elemento].IdPreguntas+");");
                        divUno.className="divUno";
                        
                        label.setAttribute("name","preguntas");
                        label.appendChild(txtLabel);
                        
                        divDos.appendChild(label);
                        divUno.appendChild(divDos);
                        
                        var respuestas=datosJson[elemento].OpcionesDeRespuesta.split(",");
                        //var j =0;
                        for(i in respuestas){
                            var divTres=document.createElement("div");
                            divTres.className="divTres";
                            var labelRes=document.createElement("label");
                            var chb=document.createElement("input");
                            chb.setAttribute("type","checkbox");
                            chb.setAttribute("name","reporte");
                            chb.setAttribute("value",respuestas[i]);
                            var txtLabelRes=document.createTextNode(respuestas[i]);
                            //console.log(respuestas[i]);
                            labelRes.appendChild(txtLabelRes);
                            divTres.appendChild(chb);
                            divTres.appendChild(labelRes);
                            divUno.appendChild(divTres);
                        }
                      divPrincipal.appendChild(divUno);
                        break;
                }
            }

  
}


function horaCliente(){
    var anio= new Date();
    var mes= new Date();
    var dia=new Date();
    var hora=new Date(); 
    var minuto= new Date();
    var segundo= new Date();
    mes.getUTCMonth();
    /*var ultActividad=Date.UTC(anio.getFullYear(),
                              mes.getMonth(),
                              dia.getDate(),
                              hora.getHours(),
                              minuto.getMinutes(),
                              segundo.getSeconds());*/
   // console.log(ultActividad);
    //console.log(anio.getFullYear()+"-"+mes.getMonth()+"-"+dia.getDate()+" "+hora.getHours()+":"+minuto.getMinutes()+":"+segundo.getSeconds());
    //return ultActividad;
     
     var ultActividad=anio.getFullYear()+"-"+(mes.getMonth()+1)+"-"+dia.getDate()+" "+hora.getHours()+":"+minuto.getMinutes()+":"+segundo.getSeconds();
     return ultActividad;
    
}

/*
 * Funcion para convertir los valores enviados por GET 
 * a un array
 * 
 * @returns {recibirValorGet.tmparr}
 */
function recibirValorGet(){
   
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};
    
    for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    } 
    console.log("parametros GET"); 
    console.log(params);
    return params;
      
}


/*
 * valida dos valores string
 * 
 */
function validarValores(valUno,valDos){
   
    
    if(valUno.value===valDos.value){
        return true;
    }else{
        return false;
    }
} 
/*
 * 
 * @param {type} id
 * @returns {undefined}
 * Funcion para cerrar sesion
 */
function salir(id){
   
   if(confirm("Desea salir de la aplicación")){
        var us=new usuario("cerrarSesion",id);
        var respuesta=us.crear();
        respuesta.success(function(respuestaServidor){
            sessionStorage.clear();
            location.href="index.html";
            window.close();
        }).fail(function(){});
   }
}    

function Ingresar(){
    var usuario=document.getElementById("txbUsuario");
    var clave=document.getElementById("txbclave");
   if(usuario.value!="" && clave.value!=""){
       //alert(usuario.value+" "+clave.value);
       var user=usuario.value;
        var Ingresar=new login(user.trim(),clave.value.trim());
        var resp = Ingresar.logIn();  
        resp.success(function(rspServidor){
           
            var dtJson=eval(rspServidor);
            console.log(dtJson);
            switch(dtJson.rol){
                case "3":
                    var user={};
                    user={
                        idUsuario:dtJson.idUsuario,
                        rol:dtJson.rol,
                        nombre:dtJson.nombre+" "+dtJson.apellidos
                    };
                    sessionStorage["usuarioLogueado"]=JSON.stringify(user);
                    console.log(sessionStorage["usuarioLogueado"]);
                    //location.href="/menuAdministrador.html?idUser="+dtJson.idUsuario+"&rol="+dtJson.rol;
                            usuario.value="";
                            clave.value="";
                            var w=window;
                            w.fullScreen=true;
                            var ancho= screen.availWidth-10;
                            var largo=screen.availHeight-150;
                            if(w.open("menuAdministrador.html",dtJson.nombre+" "+dtJson.apellidos,"menubar=no,toolbar=no,width="+ancho+","+"height="+largo+",resizable=no,location=no")==null){
                                 alert("Parece que tiene desabilitadas las ventanas emergentes en su navegador por favor cambie la configuracion para tener acceso");   
                            }else{
                                location.href="index.html";
                            }
                    
                    break;
                case "4":
                    var user={};
                    user={
                        idUsuario:dtJson.idUsuario,
                        rol:dtJson.rol,
                        nombre:dtJson.nombre+" "+dtJson.apellidos
                    };
                    sessionStorage["usuarioLogueado"]=JSON.stringify(user);
                    console.log(sessionStorage["usuarioLogueado"]);
                    // location.href="/usuario.html?idUser="+dtJson.idUsuario+"&rol="+dtJson.rol;
                    usuario.value="";
                            clave.value="";
                            var w=window;
                            w.fullScreen=true;
                            var ancho= screen.availWidth-10;
                            var largo=screen.availHeight-150;
                            if(w.open("usuario.html",dtJson.nombre+" "+dtJson.apellidos,"menubar=no,toolbar=no,width="+ancho+","+"height="+largo+",resizable=no,location=no")==null){
                                 alert("Parece que tiene desabilitadas las ventanas emergentes en su navegador por favor cambie la configuracion para tener acceso");   
                            }else{
                                location.href="index.html";
                            }
                  break;
                default:    
                   
                    alert("Usted no tiene permisos para ingresar al sistema");
                    location.href="index.html";
                    break;
                    
            }
           /*AQUI LOGICA PARA LA REDIRECCION DE ACUERDO AL ROL DEL USUARIO*/
         //   location.href="/Vista/Encuestas/registrarEncuesta.html";
        }).fail(function (){});
   }else{
       alert("Ingrese usuario y contraseña");
   }  
        
    
}
/*Funcion para consultar todas las preguntas*/
function cargarPreguntas(id_div){
    var divPlantilla=document.getElementById(id_div);
    var preg = new pregunta("consultarTodas","","","");
    var respuesta=preg.metodo();
//console.log(divPlantilla);    
 //   var respuesta=preg.metodo();
    
        respuesta.success(function(respServidor){
            //console.log(respServidor);
            
            var datosJson=eval(respServidor);
            var tamanio=Object.keys(datosJson).length;
            i=0;
  //          console.debug(datosJson);
            for(var elemento in datosJson){
//                console.log(datosJson[elemento].TipoPregunta);
                switch(datosJson[elemento].TipoPregunta){
                    case "Abierta": 
                           var liAbiertas=document.getElementById("liAbiertas");
                           
                           //ul.setAttribute("name","Abiertas");
                           //ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                           //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                           
                           
                           var li = document.createElement("li");
                           li.setAttribute("name","Abiertas");
                           li.setAttribute("id",datosJson[elemento].IdPreguntas);
                           var argumento=document.createElement("h4");
                           var txtArgumento=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                           argumento.appendChild(txtArgumento);
                           li.appendChild(argumento);
                           //ul.appendChild(li);
                           
                           //var li = document.createElement("li");
                           var respuesta=document.createElement("input");
                           respuesta.setAttribute("type","text");
                           respuesta.setAttribute("placeholder","respuesta");                           
                           respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                           li.appendChild(respuesta);
                           //ul.appendChild(li);
                           
                           //var li = document.createElement("li");
                           var btnAgregar=document.createElement("input");
                            btnAgregar.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].ArgumentoPregunta+"');");
                            btnAgregar.setAttribute("value","agregar pregunta");
                            btnAgregar.setAttribute("type","button");
                            btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                            li.appendChild(btnAgregar);
                            //ul.appendChild(li);
                            liAbiertas.appendChild(li);
                           
                          
                        break;                    
                    case "AbiertaCategoria": 
                           var liAbiertas=document.getElementById("liAbiertas");
                           /*var ul=document.createElement("ul");
                           ul.setAttribute("name","Abiertas");
                           ul.setAttribute("id",datosJson[elemento].IdPreguntas);*/
                           //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                           
                           
                           var li = document.createElement("li");
                           li.setAttribute("name","Abiertas");
                           li.setAttribute("id",datosJson[elemento].IdPreguntas);
                           var argumento=document.createElement("h4");
                           var txtArgumento=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                           argumento.appendChild(txtArgumento);
                           li.appendChild(argumento);
                           //ul.appendChild(li);
                           
                           //var li = document.createElement("li");
                           var respuesta=document.createElement("input");
                           respuesta.setAttribute("type","text");
                           respuesta.setAttribute("placeholder","respuesta");                           
                           respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                           li.appendChild(respuesta);
                           //ul.appendChild(li);
                           
                           //var li = document.createElement("li");
                            var btnAgregar=document.createElement("input");
                            btnAgregar.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].ArgumentoPregunta+"');");
                            btnAgregar.setAttribute("value","agregar pregunta");
                            btnAgregar.setAttribute("type","button");
                            btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                            li.appendChild(btnAgregar);
                           // ul.appendChild(li);
                           liAbiertas.appendChild(li);
                           
                          
                        break;
                    case "Cerrada":
                         var liCerradas=document.getElementById("liCerradas");
                         /*var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         ul.setAttribute("name","Cerradas");*/
                         var li = document.createElement("li");
                        li.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         li.setAttribute("name","Cerradas"); 
                        var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         //ul.appendChild(li);
                         
                        var strRespuestas=datosJson[elemento].respuestas;
                       console.log(li);
                        for(var i in strRespuestas){
                            
                            //var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","radio");
                            opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                            respuestaOpcion.appendChild(txtRespuesta);
                            
                            var btnCondicion=document.createElement("a");
                            btnCondicion.setAttribute("onclick","agregarCondicion("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"');");
                            btnCondicion.innerHTML="Agregar condicion";
                            //btnCondicion.setAttribute("href","");
                            //btnCondicion.setAttribute("type","button");
                            btnCondicion.setAttribute("name","btnSE_"+datosJson[elemento].IdPreguntas);
                            btnCondicion.style.display='none';
                            
                            var divCondicion=document.createElement("div");
                            divCondicion.setAttribute("name","divCondicion");
                            divCondicion.setAttribute("id","divCondicion_"+strRespuestas[i].IdRespuestaPreguntas);
                            var input=document.createElement("a");
                            input.setAttribute("id","salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input.innerHTML="Salto";
                            //input.setAttribute("href","");
                            //input.setAttribute("type","button");
                            input.setAttribute("value","Salto");
                            input.setAttribute("onclick","agregarSalto("+datosJson[elemento].IdPreguntas+","+strRespuestas[i].IdRespuestaPreguntas+")");
                            input.style.display='none';
                            var select=document.createElement("select");
                            select.setAttribute("id","sel_salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            select.setAttribute("onchange","seleccionarSalto("+datosJson[elemento].IdPreguntas+","+strRespuestas[i].IdRespuestaPreguntas+")");
                            select.style.display='none';
                            var input2=document.createElement("a");
                            input2.setAttribute("id","se_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                         
                            var input3=document.createElement("a");
                            input3.setAttribute("id","fin_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input3.innerHTML="Finalizar encuesta";
                            //input3.setAttribute("href","");
                            //input3.setAttribute("type","button");
                            //input3.setAttribute("value","Finalizar encuesta");
                            input3.setAttribute("onclick","agregarCondicionFinalizacionEncuesta("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"')");
                            input3.style.display='none';
                            divCondicion.appendChild(input);
                            divCondicion.appendChild(select);   
                            divCondicion.appendChild(input2);
                            divCondicion.appendChild(input3);
                            
                            divCondicion.style.display="none";
                            
                            
                            
                            
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            li.appendChild(btnCondicion);
                            li.appendChild(divCondicion);
                            
                            //ul.appendChild(li);
                            strRespuestas[i].IdRespuestaPreguntas++;
                         }
                         //var li =document.createElement("li");
                         var btnAgregar=document.createElement("input");
                         btnAgregar.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].ArgumentoPregunta+"');");
                         btnAgregar.setAttribute("value","agregar pregunta");
                         btnAgregar.setAttribute("type","button");
                         btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                         li.appendChild(btnAgregar);
                         //ul.appendChild(li);
                         liCerradas.appendChild(li);
                         
                        break;
                    case "CerradaComentario":
                         var liCerradaComentario=document.getElementById("liCerradasComentario");
                         /*var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         ul.setAttribute("name","CerradasComentario");*/
                         var li = document.createElement("li");
                         
                         
                         li.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         li.setAttribute("name","CerradasComentario");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         //ul.appendChild(li);
                         
                        var strRespuestas=datosJson[elemento].respuestas;
                       
                        for(var i in strRespuestas){
                            
                            //var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","radio");
                            opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                            respuestaOpcion.appendChild(txtRespuesta);
                            
                            var btnCondicion=document.createElement("a");
                            btnCondicion.setAttribute("onclick","agregarCondicion("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"');");
                            btnCondicion.innerHTML="Agregar condicion";
                            //btnCondicion.setAttribute("href","");
                            //btnCondicion.setAttribute("type","button");
                            btnCondicion.setAttribute("name","btnSE_"+datosJson[elemento].IdPreguntas);
                            btnCondicion.style.display='none';
                            
                            var divCondicion=document.createElement("div");
                            divCondicion.setAttribute("name","divCondicion");
                            divCondicion.setAttribute("id","divCondicion_"+strRespuestas[i].IdRespuestaPreguntas);
                            var input=document.createElement("a");
                            input.setAttribute("id","salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input.innerHTML="Salto";
                            //input.setAttribute("href","");
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
                           
                            var input3=document.createElement("a");
                            input3.setAttribute("id","fin_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input3.innerHTML="Finalizar encuesta";
                            //input3.setAttribute("href","");
                            //input3.setAttribute("type","button");
                            //input3.setAttribute("value","Finalizar encuesta");
                            input3.setAttribute("onclick","agregarCondicionFinalizacionEncuesta("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"')");
                            input3.style.display='none';
                            divCondicion.appendChild(input);
                            divCondicion.appendChild(select);   
                            divCondicion.appendChild(input2);
                            divCondicion.appendChild(input3);
                            
                            divCondicion.style.display="none";
                            
                            
                            
                            
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            li.appendChild(btnCondicion);
                            li.appendChild(divCondicion);
                            
                            //ul.appendChild(li);
                            strRespuestas[i].IdRespuestaPreguntas++;
                         }
                          //var li =document.createElement("li");
                         var btnAgregar=document.createElement("input");
                            btnAgregar.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].ArgumentoPregunta+"');");
                            btnAgregar.setAttribute("value","agregar pregunta");
                            btnAgregar.setAttribute("type","button");
                            btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                         li.appendChild(btnAgregar);
                         //ul.appendChild(li);
                         liCerradaComentario.appendChild(li);
                         
                        break;    
                    case "CerradaMultiple":
                        var liCerradas=document.getElementById("liCerradasMultiple");
                         /*var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         ul.setAttribute("name","CerradaMultiple");*/
                         var li = document.createElement("li");
                         li.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         li.setAttribute("name","CerradaMultiple");
                         var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         //ul.appendChild(li);
                         
                        var strRespuestas=datosJson[elemento].respuestas;
                       
                        for(var i in strRespuestas){
                            
                            //var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","checkbox");
                            opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                            respuestaOpcion.appendChild(txtRespuesta);
                            
                           
                            
                            
                            
                            
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            
                           
                            
                            //ul.appendChild(li);
                            strRespuestas[i].IdRespuestaPreguntas++;
                         }
                         
                         //var li =document.createElement("li");
                         var btnAgregar=document.createElement("input");
                            btnAgregar.setAttribute("onClick","agregarPreguntaCerradaMultiple("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].ArgumentoPregunta+"');");  
                            btnAgregar.setAttribute("value","agregar pregunta");
                            btnAgregar.setAttribute("type","button");
                            btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                         
                         li.appendChild(btnAgregar);
                         //ul.appendChild(li);
                         liCerradas.appendChild(li);
                         
                        break;
                        
                        case "Rankin":
                         var liCerradas=document.getElementById("liRankin");
                         /*var ul=document.createElement("ul");
                         
                         ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         ul.setAttribute("name","Cerradas");*/
                         var li = document.createElement("li");
                        li.setAttribute("id",datosJson[elemento].IdPreguntas);
                         //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                         li.setAttribute("name","Rankin"); 
                        var argumento=document.createElement("h4");
                         var txtArgumento=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                         argumento.appendChild(txtArgumento);
                         li.appendChild(argumento);
                         //ul.appendChild(li);
                         
                        var strRespuestas=datosJson[elemento].respuestas;
                       console.log(li);
                        for(var i in strRespuestas){
                            
                            //var li =document.createElement("li");
                            var opcion=document.createElement("input");
                            opcion.setAttribute("type","radio");
                            opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                            var respuestaOpcion=document.createElement("h3");
                            var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                            respuestaOpcion.appendChild(txtRespuesta);
                            
                            var btnCondicion=document.createElement("a");
                            btnCondicion.setAttribute("onclick","agregarCondicion("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"');");
                            btnCondicion.innerHTML="Agregar condicion";
                            //btnCondicion.setAttribute("href","");
                            //btnCondicion.setAttribute("type","button");
                            btnCondicion.setAttribute("name","btnSE_"+datosJson[elemento].IdPreguntas);
                            btnCondicion.style.display='none';
                            
                            var divCondicion=document.createElement("div");
                            divCondicion.setAttribute("name","divCondicion");
                            divCondicion.setAttribute("id","divCondicion_"+strRespuestas[i].IdRespuestaPreguntas);
                            var input=document.createElement("a");
                            input.setAttribute("id","salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input.innerHTML="Salto";
                            //input.setAttribute("href","");
                            //input.setAttribute("type","button");
                            input.setAttribute("value","Salto");
                            input.setAttribute("onclick","agregarSalto("+datosJson[elemento].IdPreguntas+","+strRespuestas[i].IdRespuestaPreguntas+")");
                            input.style.display='none';
                            var select=document.createElement("select");
                            select.setAttribute("id","sel_salto_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            select.setAttribute("onchange","seleccionarSalto("+datosJson[elemento].IdPreguntas+","+strRespuestas[i].IdRespuestaPreguntas+")");
                            select.style.display='none';
                            var input2=document.createElement("a");
                            input2.setAttribute("id","se_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                         
                            var input3=document.createElement("a");
                            input3.setAttribute("id","fin_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                            input3.innerHTML="Finalizar encuesta";
                            //input3.setAttribute("href","");
                            //input3.setAttribute("type","button");
                            //input3.setAttribute("value","Finalizar encuesta");
                            input3.setAttribute("onclick","agregarCondicionFinalizacionEncuesta("+datosJson[elemento].IdPreguntas+",'"+strRespuestas[i].IdRespuestaPreguntas+"')");
                            input3.style.display='none';
                            divCondicion.appendChild(input);
                            divCondicion.appendChild(select);   
                            divCondicion.appendChild(input2);
                            divCondicion.appendChild(input3);
                            
                            divCondicion.style.display="none";
                            
                            
                            
                            
                            li.appendChild(opcion);
                            li.appendChild(respuestaOpcion);
                            //li.appendChild(btnCondicion);
                            //li.appendChild(divCondicion);
                            
                            //ul.appendChild(li);
                            strRespuestas[i].IdRespuestaPreguntas++;
                         }
                         //var li =document.createElement("li");
                         var btnAgregar=document.createElement("input");
                         btnAgregar.setAttribute("onClick","agregarPreguntaRankin("+datosJson[elemento].IdPreguntas+",'"+datosJson[elemento].ArgumentoPregunta+"');");
                         btnAgregar.setAttribute("value","agregar pregunta");
                         btnAgregar.setAttribute("type","button");
                         btnAgregar.setAttribute("id","btnA_"+datosJson[elemento].IdPreguntas);
                         li.appendChild(btnAgregar);
                         //ul.appendChild(li);
                         liCerradas.appendChild(li);
                         
                        break;
                        
                        
                        
                }
            }
            
            
        }).fail(function(){
            alert("ha ocurrido un error");
        });
}
/*Funcion para consultar session storage*/
function obtener_session_storage(nombreSession){
    if(sessionStorage[nombreSession]!=undefined){
       var sesion=JSON.parse(sessionStorage[nombreSession]);
       return sesion;
    }else{
        return false;
    }
}
/*Funcion tomada del sitio 
 * http://www.antisacsor.com/articulo/10_98_dar-formato-a-numeros-en-javascript
 * Para dar formato a los numeros*/
/**
 * Da formato a un número para su visualización
 *
 * @param {(number|string)} numero Número que se mostrará
 * @param {number} [decimales=null] Nº de decimales (por defecto, auto); admite valores negativos
 * @param {string} [separadorDecimal=","] Separador decimal
 * @param {string} [separadorMiles=""] Separador de miles
 * @returns {string} Número formateado o cadena vacía si no es un número
 *
 * @version 2014-07-18
 */

function formato_numero(numero, decimales, separador_decimal, separador_miles){ // v2007-08-06
    numero=parseFloat(numero);
    if(isNaN(numero)){
        return "";
    }

    if(decimales!==undefined){
        // Redondeamos
        numero=numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

    if(separador_miles){
        // Añadimos los separadores de miles
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
        while(miles.test(numero)) {
            numero=numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}
/*
 * 
 * @param {type} datos  dtaos de tipo array ['clave','valor']
 * @param {type} div  objeto de tipo <div>
 * @param {type} opciones objeto con la estructura 
 * @returns {undefined}
 */
function dibujarGrafico(datos,div,opc,tipoGrafico){
    var grafico;
    var opciones={};
    console.log(tipoGrafico);
    console.log(datos);
    console.log(datos.datos);
    console.log(opc);
    switch(tipoGrafico){
        case "Columna":
            var dGrafico=new google.visualization.DataTable();
                dGrafico.addColumn("string","Element");
                dGrafico.addColumn("number","Percentage");
                var d=datos.datos.splice(0,1);
                console.log(d);
                console.log(datos.datos);
                dGrafico.addRows(datos.datos);       
                opciones={
                    title: opc.titulo,
                    width:opc.ancho,
                    bar:{groupWidth:'35%'},
                    legend:{position:'none'},
                    backgroundColor:'#BDBDBD',
                    colors: ['1B4DD7','0CE010', '071C57','E00C1B','E0DC0C','0CE06F']
                };
            grafico=new google.visualization.ColumnChart(div);
            break;
        case "Torta":
            opciones={
                    title: opc.titulo,
                    width:opc.ancho,
                    backgroundColor:'#BDBDBD',
                    colors: ['1B4DD7','0CE010', '071C57','E00C1B','E0DC0C','0CE06F'],
                    axes: {
                        x: {
                          0: { side: 'top', label: 'White to move'} // Top x-axis.
                        }
                      },
                    bar:{groupWidth:'90%'}  
                };
                console.log(datos.datos);
                console.log(datos.datos[0]);
                console.log(datos.datos[1]);
                var d=datos.datos;
                //d.push(datos.datos);
                console.log(d);
                /*d=[['Que actividad ', 'Numero'],
          ['Cinco',     11],
          ['Dos',      2],
          ['SeisSeisSeis',  2],
          ['Watch TV', 2],
          ['Sleep',    7]];*/
                console.log(d);
            var dGrafico=new google.visualization.arrayToDataTable(d);
            grafico=new google.visualization.PieChart(div);
            
            break;
        case "Dona":
            opciones={
                    title: opc.titulo,
                    width:opc.ancho,
                    pieHole:opc.hoyo,
                    backgroundColor:'#BDBDBD'
                    
                };
                
                console.log(datos.datos);
                console.log(datos.datos[0]);
                console.log(datos.datos[1]);
                var d=datos.datos;
                //d.push(datos.datos);
                console.log(d);
                /*d=[['Que actividad ', 'Numero'],
          ['Cinco',     11],
          ['Dos',      2],
          ['SeisSeisSeis',  2],
          ['Watch TV', 2],
          ['Sleep',    7]];*/
                console.log(d);
            var dGrafico=new google.visualization.arrayToDataTable(d);
            grafico=new google.visualization.PieChart(div);
            
            break;
         case "Torta3D":
             
            opciones={
                    title: opc.titulo,
                    width:opc.ancho,
                    is3D:opc.es3D,
                    backgroundColor:'#BDBDBD',
                    colors: ['1B4DD7','0CE010', '071C57','E00C1B','E0DC0C','0CE06F']
                    
                };
                console.log(datos.datos);
                console.log(datos.datos[0]);
                console.log(datos.datos[1]);
                var d=datos.datos;
                //d.push(datos.datos);
                console.log(d);
                /*d=[['Que actividad ', 'Numero'],
          ['Cinco',     11],
          ['Dos',      2],
          ['SeisSeisSeis',  2],
          ['Watch TV', 2],
          ['Sleep',    7]];*/
                console.log(d);
            var dGrafico=new google.visualization.arrayToDataTable(d);
            grafico=new google.visualization.PieChart(div);
            break;   
                
    }
    
    grafico.draw(dGrafico,opciones);
}