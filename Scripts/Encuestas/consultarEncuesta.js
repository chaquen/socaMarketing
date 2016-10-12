var idFormulario=0;
var User;
function Iniciar(){
    
    if(User=obtener_session_storage("usuarioLogueado")){
       buscarEncuesta();
       
    }else{
       alert("Por favor ingrese correctamente al sistema ☻");
       location.href="index.html";
    }
    
    
   // document.getElementById("btnCrearEncuestaPlan257tilla").addEventListener("click",buscarEncuesta,false);
    //alert("Hola");
    
}
function cargarRangos(idForm){
    //alert(idForm);
    idFormulario=idForm;
    //alert(idFormulario);
    var divRangos=document.getElementById("divRangos");
    divRangos.style.display='block';  //  console.log(divRangos.childNodes[1]);//label
    var rn = new rangos("obtenerRangos");
    var respuesta=rn.metodo();
    respuesta.success(function(respServidor){
        var dtJson=eval(respServidor);
        //console.log(dtJson);
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
            rdbtn.setAttribute("value",dtJson[i].IdRango);
            elementoLista.appendChild(rdbtn);
            elementoLista.appendChild(lbl);
            lista.appendChild(elementoLista);
        }
            var elementoLista=document.createElement("li");
            var btnCrear=document.createElement("input");
            btnCrear.setAttribute("type","button");
            btnCrear.setAttribute("id",idForm);
            btnCrear.setAttribute("value","Editar rango");
            elementoLista.appendChild(btnCrear);
            btnCrear.setAttribute("onClick","editarRangoEncuesta()");
            lista.appendChild(elementoLista);
        divRangos.appendChild(lista);
        
    }).fail(function(){
        divRangos.innerHTML="";
    });
}


function obtenerPreguntas(id){
  //  alert(id);
  idFormulario=id;
  var enc=new encuesta("obtenerEncuestaPlantillas",id);
  var respuesta=enc.metodo();
  respuesta.success(function(respuestaServidor){
      var dtJson=eval(respuestaServidor);
      document.getElementById("divVerPreguntas").innerHTML="";
      cargarEncuestaPlantillas("divVerPreguntas",dtJson);
      
  }).fail(function(){});
}
function buscarEncuesta(){
    //alert("Hola");
    var txt=document.getElementById("txbNombreEncuesta");
  
        var enc=new encuesta("ConsultarTodosLosFormularios");
        var respuesta=enc.metodo();
        respuesta.success(function(respuestaServidor){
            if(respuestaServidor!=false){
                var dtJson=eval(respuestaServidor);
                verPlantillas(dtJson,"divPlantilla");
                document.getElementById("divVerPreguntas").innerHTML="";
                document.getElementById("divTablaDetalleEncuestaMuestra").innerHTML="";
            }else{
                document.getElementById("divPlantilla").innerHTML="";
                document.getElementById("divVerPreguntas").innerHTML="";
                document.getElementById("divTablaDetalleEncuestaMuestra").innerHTML="";
                
                alert("No hay coincidencias");
            }
           
           
        }).fail(function(){});
    
}
function verPlantillas(datos,idDiv){
    console.log(datos);
    var div=document.getElementById(idDiv);
    div.innerHTML="";
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    
    var fila=document.createElement("tr");
    var celdaUno=document.createElement("td");
    var h=document.createElement("h3");
    var texto=document.createTextNode("Nombre encuesta");
    h.appendChild(texto);
    celdaUno.appendChild(h);
    var celdaDos=document.createElement("td");
    var h=document.createElement("h3");
    var texto=document.createTextNode("Número de preguntas");
    h.appendChild(texto);
    celdaDos.appendChild(h);
    var celdaTres=document.createElement("td");
    var h=document.createElement("h3");
    var texto=document.createTextNode("Editar");
    h.appendChild(texto);
    celdaTres.appendChild(h);
    var celdaCuatro=document.createElement("td");
    var h=document.createElement("h3");
    var texto=document.createTextNode("Lista de encuestas");
    h.appendChild(texto);
    celdaCuatro.appendChild(h);
    var celdaCinco=document.createElement("td");
    var h=document.createElement("h3");
    var texto=document.createTextNode("Editar rango encuesta");
    h.appendChild(texto);
    celdaCinco.appendChild(h);
    fila.appendChild(celdaUno);
    fila.appendChild(celdaDos);
    fila.appendChild(celdaTres);
    fila.appendChild(celdaCuatro);
    fila.appendChild(celdaCinco);
    thead.appendChild(fila);
    tabla.appendChild(thead);
    for(var i in datos){
        
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].NombreFormulario);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].numeroDePreguntas);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
       
        var celda=document.createElement("td");
        var btn=document.createElement("input");
        btn.setAttribute("id",datos[i].IdFormulario);
        btn.setAttribute("value","Ver preguntas");
        btn.setAttribute("onClick","obtenerPreguntas("+datos[i].IdFormulario+")");
        btn.setAttribute("type","button");
        celda.appendChild(btn);
        fila.appendChild(celda);
        
        
        var celda=document.createElement("td");
        var btn=document.createElement("input");
        btn.setAttribute("id",datos[i].IdFormulario);
        btn.setAttribute("value","Ver encuestas");
        btn.setAttribute("onClick","obtenerEncuestas("+datos[i].IdFormulario+")");
        btn.setAttribute("type","button");
        celda.appendChild(btn);
         fila.appendChild(celda);
         
        var celda=document.createElement("td");
        var btnCrear=document.createElement("input");
        btnCrear.setAttribute("type","button");
        btnCrear.setAttribute("value","Editar rango");
        btnCrear.setAttribute("onClick","cargarRangos("+datos[i].IdFormulario+");");
        
        celda.appendChild(btnCrear);
        fila.appendChild(celda);
        
        tabla.appendChild(fila);
    }
    div.appendChild(tabla);
    //console.log(tabla);
}
function cargarEncuestaPlantillas(id_div,datosJson){
    console.log(datosJson);
    var tam=Object.keys(datosJson).length;
    var divPrincipal=document.getElementById(id_div);
    divPrincipal.innerHTML="";
    //console.debug(datosJson[0].pregunta);
    var h=document.createElement("h3");
    var txt=document.createTextNode(datosJson[0].NombreFormulario);
    h.appendChild(txt);
    divPrincipal.appendChild(h);
    for(var elemento in datosJson){
       
        if(datosJson[elemento].ArgumentoPregunta!=undefined){
            switch(datosJson[elemento].TipoPregunta){
                case "Abierta":
                     console.log(datosJson[elemento].ArgumentoPregunta);
              //     
                    var label=document.createElement("label");
                    var txtLabel=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
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
                   // divUno.setAttribute("onclick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
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
                case "AbiertaCategoria":
                     console.log(datosJson[elemento].ArgumentoPregunta);
              //     
                    var label=document.createElement("label");
                    var txtLabel=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
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
                   // divUno.setAttribute("onclick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                    //divCuatro.setAttribute("onclick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                    //divDos.setAttribute("name","Abiertas");
                    if(datosJson[elemento].respuestas != undefined){
                        var respuestas=datosJson[elemento].respuestas
                        var select=document.createElement("select");
                        for(var i in respuestas){
                            var opt=document.createElement("option");
                            opt.innerHTML=respuestas[i];
                            select.appendChild(opt);
                        
                        }   
                    }
                    
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
                     console.log(datosJson[elemento].ArgumentoPregunta);

                    var label=document.createElement("label");
                    var txtLabel=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                    var divUno=document.createElement("div");
                    var divDos=document.createElement("div");


                    divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                //    divUno.setAttribute("onclick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");

                    divUno.className="divUno";

                    label.setAttribute("name","seleccionada");
                    label.appendChild(txtLabel);



                    divDos.className="divDos";
                    divDos.appendChild(label);
                    divUno.appendChild(divDos);
                    if(datosJson[elemento].respuestas != undefined){
                        var respuestas=datosJson[elemento].respuestas
                        var lista=document.createElement("ul");
                        for(var i in respuestas){

                        var elementoLista=document.createElement("li");
                        elementoLista.className="divTres";
                        var labelRes=document.createElement("label");
                        var rad=document.createElement("input");
                        rad.setAttribute("type","radio");
                        rad.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                        rad.setAttribute("value",respuestas[i]);
                        var txtLabelRes=document.createTextNode(respuestas[i].Respuesta);
                        //console.log(respuestas[i]);
                        labelRes.appendChild(txtLabelRes);
                        elementoLista.appendChild(rad);
                        elementoLista.appendChild(labelRes);
                        lista.appendChild(elementoLista);
                        divUno.appendChild(lista);
                    }
                    }


                     divPrincipal.appendChild(divUno);

                    break;
                case "CerradaComentario":
                     console.log(datosJson[elemento].ArgumentoPregunta);
                    var label=document.createElement("label");
                    var txtLabel=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                    var divCuatro=document.createElement("div");
                    var divDos=document.createElement("div");
                    var divUno=document.createElement("div");

                    divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                  //  divUno.setAttribute("onclick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                    divUno.className="divUno";

                    label.setAttribute("name","preguntas");
                    label.appendChild(txtLabel);

                    divDos.appendChild(label);
                    divDos.className="divDos";
                    divUno.appendChild(divDos);



                    //console.log(datosJson[elemento].OpcionesDeRespuesta);
                    if(datosJson[elemento].respuestas!=undefined){
                        var respuestas=datosJson[elemento].respuestas;
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
                        rad.setAttribute("value",respuestas[i].IdRespuestaPreguntas);
                    //   j++;
                        var txtLabelRes=document.createTextNode(respuestas[i].Respuesta);
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
                    input.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                    input.setAttribute("id",+datosJson[elemento].IdPreguntas);
                    divUno.appendChild(input);

                     divPrincipal.appendChild(divUno);

                    }

                    break;
                case "CerradaMultiple":
                     console.log(datosJson[elemento].ArgumentoPregunta);
                    var label=document.createElement("label");
                    var txtLabel=document.createTextNode(datosJson[elemento].ArgumentoPregunta);

                    var divDos=document.createElement("div");
                    var divUno=document.createElement("div");

                    divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                 //   divUno.setAttribute("onclick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                    divUno.className="divUno";

                    label.setAttribute("name","preguntas");
                    label.appendChild(txtLabel);

                    divDos.appendChild(label);
                    divUno.appendChild(divDos);

                    var respuestas=datosJson[elemento].respuestas;
                    //var j =0;
                    for(i in respuestas){
                        var divTres=document.createElement("div");
                        divTres.className="divTres";
                        var labelRes=document.createElement("label");
                        var chb=document.createElement("input");
                        chb.setAttribute("type","checkbox");
                        chb.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                        chb.setAttribute("value",respuestas[i]);
                        var txtLabelRes=document.createTextNode(respuestas[i].Respuesta);
                        //console.log(respuestas[i]);
                        labelRes.appendChild(txtLabelRes);
                        divTres.appendChild(chb);
                        divTres.appendChild(labelRes);
                        divUno.appendChild(divTres);
                    }
                  divPrincipal.appendChild(divUno);
                    break;
                 case "Rankin":
                     console.log(datosJson[elemento].ArgumentoPregunta);

                    var label=document.createElement("label");
                    var txtLabel=document.createTextNode(datosJson[elemento].ArgumentoPregunta);
                    var divUno=document.createElement("div");
                    var divDos=document.createElement("div");


                    divUno.setAttribute("id",datosJson[elemento].IdPreguntas);
                //    divUno.setAttribute("onclick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");

                    divUno.className="divUno";

                    label.setAttribute("name","seleccionada");
                    label.appendChild(txtLabel);



                    divDos.className="divDos";
                    divDos.appendChild(label);
                    divUno.appendChild(divDos);
                    var num=1;
                    if(datosJson[elemento].respuestas != undefined){
                        var respuestas=datosJson[elemento].respuestas
                        var lista=document.createElement("ul");
                        for(var i in respuestas){

                        var elementoLista=document.createElement("li");
                        elementoLista.className="divTres";
                        var labelRes=document.createElement("label");
                        /*var rad=document.createElement("input");
                        rad.setAttribute("type","radio");
                        rad.setAttribute("name","Rankin_"+datosJson[elemento].IdPreguntas);
                        rad.setAttribute("value",respuestas[i]);*/
                        var txtLabelRes=document.createTextNode(num+" - "+respuestas[i].Respuesta);
                        //console.log(respuestas[i]);
                        labelRes.appendChild(txtLabelRes);
                        //elementoLista.appendChild(rad);
                        elementoLista.appendChild(labelRes);
                        lista.appendChild(elementoLista);
                        divUno.appendChild(lista);
                        num++;
                    }
                    }


                     divPrincipal.appendChild(divUno);

                    break;   
                    
                    
                    
            }
        }
    }  
    var btnEditar=document.createElement("input");
    btnEditar.setAttribute("id",idFormulario);
    btnEditar.setAttribute("type","button");
    btnEditar.setAttribute("value","editar encuesta");
    btnEditar.setAttribute("onClick","editarFormulario("+idFormulario+");");
    
    
    
    divPrincipal.appendChild(btnEditar);
    console.log(divPrincipal);
}

function obtenerEncuestas(id){
    //alert(id);
    idFormulario=id;
    var div=document.getElementById("divVerPreguntas");
    div.innerHTML="";
    var enc=new encuesta("encuestaPorFormulario",id);
    var respuesta=enc.metodo();
    respuesta.success(function(respuestaServidor){
        if(respuestaServidor!=false){
            //console.log(respuestaServidor);
            var datos=eval(respuestaServidor);
            listarEncuestas(div,datos);
        }else{
            div.innerHTML="";
            alert("No hay coincidencias");
        }
    }).fail(function(){});
}
function listarEncuestas(div,datos){
    var tabla=document.createElement("table");
   
    var thead=document.createElement("thead");
   
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Nombre encuesta");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    //var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Estado");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    //var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Fecha creación");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    //var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Fecha finalización");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    //var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Cantidad muestra");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    //var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Asignadas");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    
    //var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Realizadas");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    /*var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Ver");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    */
    thead.appendChild(fila);
    tabla.appendChild(thead);
    for(var i in datos){
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].NombreEncuesta);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        //var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].Estado);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        //var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].FechaCreacionEncuesta);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        //var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].FechaFinalizacion);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        //var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].CantidadMuestra);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        
        //var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        celda.setAttribute("onclick","consultarDetalleEncuestaMuestra("+datos[i].IdEncuesta+");");
        var txt=document.createTextNode(datos[i].Asignadas);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        //var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].Realizadas);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        tabla.appendChild(fila);
        
        if(datos[i].Estado=="Finalizada"){
             /*var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",datos[i].IdEncuesta);
            btn.setAttribute("type","button");
            btn.setAttribute("value","Ver reporte");
            btn.setAttribute("onClick","verReporte("+datos[i].IdEncuesta+");");
            //var txt=document.createTextNode();
            
            celda.appendChild(btn);
            fila.appendChild(celda);
            tabla.appendChild(fila);*/
        }else if(datos[i].Estado=="En proceso" || datos[i].Estado=="Lista para proceso"){
            /*var celda=document.createElement("td");
            var btn=document.createElement("input");
            btn.setAttribute("id",datos[i].IdEncuesta);
            btn.setAttribute("type","button");
            btn.setAttribute("value","Editar muestra");
            btn.setAttribute("onClick","editarDetalleMuestra("+datos[i].IdEncuesta+");");
            celda.appendChild(btn);
            fila.appendChild(celda);
            tabla.appendChild(fila);*/  
        }
    }
    div.appendChild(tabla);
}
function crearEncuesta(idForm){
    var txt=document.getElementById("IdForm_"+idForm);
    var rango;
    if(txt.value.length>0){
       // alert(idForm);
        var items=document.getElementsByName("rango");
        for(var i in items){
            if(items[i].checked==true){
                rango=items[i].id;
                var rn=rango.split("_");
                console.log(rn[1]);
            }
        }
        var enc=new encuesta("registrarPlantilla",txt.value,rn[1],"",User.idUsuario,idForm);
        var respuesta=enc.metodo();
        respuesta.success(function(resp){
            console.log(resp);
            alert(resp);
            document.getElementById("divRangos").style.display='none';
            txt.value="";
        }).fail(function(){});
    }else{
        alert("Por favor ingrese un nombre para la encuesta");
    }
        
}
function editarDetalleMuestra(id){
    location.href="editarDetalleMuestra.html";
}
function verReporte(id){
    location.href="reportes.html?idEncuesta="+id+"&idFormulario="+idFormulario;
}
function editarFormulario(){
 // alert("Te pedimos disculpas estamos trabajando para mejorar el modulo de edicion de encuestas");
    
   location.href="editarEncuesta.html?idFormulario="+idFormulario;
}
function editarRangoEncuesta(){
    var rango=document.getElementsByName("rango");
    
    for(var i in rango){
        if(rango[i].checked==true){
        var ranValue=rango[i].id.split("_");
        //alert(ranValue[1]);
        }
    }
    if(ranValue!=undefined){
       //console.log("rango "+ranValue);
        var encu=new encuesta("editarRangoEncuesta",idFormulario,ranValue[1]);
        var respuesta=encu.metodo();
        respuesta.success(function(respuestaServidor){
            if(respuestaServidor){
                document.getElementById("divRangos").innerHTML="";
                alert("Rango editado con exito");

            }else{
                alert("Ha ocurrido un error al editar el rango");
            }
        }).fail(function(){}); 
    }else{
        alert("Seleccione un rango");
    }
    
    
}
function consultarDetalleEncuestaMuestra(idEncuesta){
    
    var mt=new muestra("consultarDetalleMuestra",idEncuesta,"concesionario","*","");
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
    h.innerHTML="Asignadas rango uno";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Realizadas rango uno";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Asignadas rango dos";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Realizadas rango dos";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Asignadas rango tres";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Realizadas rango tres";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Asignadas rango cuatro";
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h4");
    h.innerHTML="Realizadas rango cuatro";
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
        h.innerHTML=datos[i].NombreConcesionario;
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
window.addEventListener("load",Iniciar,false);
