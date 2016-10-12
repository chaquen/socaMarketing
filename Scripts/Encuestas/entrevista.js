var itemGrupo=1;
var arrPaginas=new Array();
var idAgente=0;
var idEncuestaRealizada=0;
var idClienteEntrevistado=0;
var datosJson;
var arregloPreguntas={};
function Iniciar(){
  
    recibirValor();
    ocultarDiv();
    obtenerRestanteEntrevista();
    document.getElementById('btnCancelarEntrevista').addEventListener("click",registrarCancelacion,false);
    document.getElementById("selParentesco").addEventListener("change",obtenerParentesco,false);
    document.getElementById('btnEnviarEncuesta').addEventListener("click",EnviarFormulario,false);
    document.getElementById("btnAgrupadas").addEventListener("click",cambiarDiseno,false);//AGREGAR EVENTO PARA CAMBIAR DISEÑO DE LAS ENCUEESTAS
    document.getElementById("btnLista").addEventListener("click",cambiarDiseno,false);
}
function cambiarDiseno(){
    switch (this.id){
        case "btnAgrupadas":
            document.getElementById("divPreguntas").innerHTML="";
            dibujarEncuestaAgrupada(datosJson,Object.keys(datosJson).length,"divPreguntas","");
            break;
        case "btnLista":
            document.getElementById("divPreguntas").innerHTML="";
            dibujarEncuesta(datosJson,"divPreguntas","");
            break;
    }
}
function ocultarDiv(){
    document.getElementById("divCancelacion").style.display='none';
    document.getElementById("divParentesco").style.display='none';
    document.getElementById("selParentesco").style.display='none';
    document.getElementById("formRegEncuesta").style.display='none';
    document.getElementById("divFinalizarEntevista").style.display='none';
     
}
function MostrarDiv(){
    document.getElementById("divParentesco").style.display='block';
    document.getElementById("selParentesco").style.display='block';
}
function recibirValor(){
   var salirEntrevista=document.getElementById("salirEntrevista");
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};
    for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
    }
    if (params['idEnc']!=undefined) {
      
       idAgente=params['idUser'];
      idEncuestaRealizada=params['idEnc'];
       //idUser.value=params['idUser'];
       //idEnc.value=params['nomEnc'];
       //idMue.value=params['idMues'];
       //console.log("id encuesta "+idEncuestaRealizada);
       //console.log("id agente "+idAgente);
       salirEntrevista.setAttribute("href","usuario.html?idUser="+idAgente+"&rol="+params['rol']);
       ObtenerEntrevista(idEncuestaRealizada,idAgente);
        
     //  rango.value=params['rango'];
       
       
     //  cargarEncuestaDos("divPreguntas",params['nomEnc']);
       //console.log('El valor del parámetro variable es: '+trim(encuesta));
       
    } else {
       alert("Ha ocurrido un error ingresa nuevamente al sistema");
    }
}
function obtenerRestanteEntrevista(){
   
    var realizadas=new entrevista("obtenerRealizadas",
                                  idEncuestaRealizada
                                  ,""
                                  ,""
                                  ,""
                                  ,idAgente);
    
    var resp=realizadas.metodo();
    resp.success(function(respServ){
        var reali=document.getElementById("hRealizadas");
        var dtJson=eval(respServ);
        //var num=Number(dtJson[0].AsignadasUsuario)-Number(dtJson[0].RealizadasUsuario);
        var text=document.createTextNode("Realizadas: "+dtJson[0].RealizadasUsuario+" de "+dtJson[0].AsignadasUsuario);
        reali.appendChild(text);
    }).fail(function(){});
}
function ObtenerEntrevista(idEncuesta,idUsuario){
 
 //var divEntrevista=document.getElementById("divEntrevistas");
 var idEnc=document.getElementById("hdIdEncuesta");
 var idUse=document.getElementById("hdIdUsuario");

 var enc=new encuesta("obtenerEncuesta",idEncuesta);
 var respuesta=enc.metodo();
 respuesta.success(function(respServidor){
     
     var dtJson=eval(respServidor);
     //console.log();
     document.getElementById("hNombreEncuesta").innerHTML=dtJson[0].NombreEncuesta;
 }).fail(function(){});
 
 
 
 var entre = new entrevista("obtenerCliente"
                            ,idEncuesta
                            ,""
                            ,""
                            ,""
                            ,idUsuario);    
 var res=entre.metodo();
 res.success(function(respSer)
 {
//     console.log(respSer);
     //alert(respSer);
     if(respSer.respuesta==undefined)
     {
  //     console.log(respSer);
        var dtJson=eval(respSer);
        var tam=Object.keys(dtJson).length;
        if(tam>0){
    //      console.log(dtJson);  
            var textNodeAsesor=document.createTextNode(dtJson[0].Asesor);
            var textNodeNombreUsuario=document.createTextNode(dtJson[0].Nombre);
            var textNodeZona=document.createTextNode(dtJson[0].NombreZona);
            var textNodeConcesionario=document.createTextNode(dtJson[0].NombreConcesionario);
            var textNodeTelUno=document.createTextNode(dtJson[0].TelUno);
            var textNodeTelDos=document.createTextNode(dtJson[0].TelDos);
            var textNodeCelUno=document.createTextNode(dtJson[0].CelUno);
            var textNodeCelDos=document.createTextNode(dtJson[0].CelDos);
            var textNodeCelTres=document.createTextNode(dtJson[0].CelTres);
            var textNodeCupo=document.createTextNode(dtJson[0].Cupo);
            var textNodeContrato=document.createTextNode(dtJson[0].Contrato);
            var textNodeCuotasPagas=document.createTextNode(dtJson[0].CuotasPagas);
            var textNodeObservaciones=document.createTextNode(dtJson[0].ObservacionesRegistro);
            if(dtJson[0].CuotasMora > 0){
                var textNodeCuotasMora=document.createTextNode(dtJson[0].CuotasMora);
                document.getElementById("hCuotasMora").appendChild(textNodeCuotasMora);
            }
            var textNodeDirectorZona=document.createTextNode(dtJson[0].DirectorZona);
            document.getElementById("NombreZona").appendChild(textNodeZona);
            document.getElementById("hNombreConcesionario").appendChild(textNodeConcesionario);
            document.getElementById("nomUser").appendChild(textNodeNombreUsuario);
            document.getElementById("hAsesor").appendChild(textNodeAsesor);
            document.getElementById("hTelefonoUno").appendChild(textNodeTelUno);
            document.getElementById("hTelefonoDos").appendChild(textNodeTelDos);
            document.getElementById("hCelularUno").appendChild(textNodeCelUno);
            document.getElementById("hCelularDos").appendChild(textNodeCelDos);
            document.getElementById("hCelularTres").appendChild(textNodeCelTres);
            document.getElementById("hCupo").appendChild(textNodeCupo);
            document.getElementById("hContrato").appendChild(textNodeContrato);
            document.getElementById("hCuotasPagas").appendChild(textNodeCuotasPagas);
            document.getElementById("hObservaciones").appendChild(textNodeObservaciones);
            document.getElementById("hDirectorZona").appendChild(textNodeDirectorZona);
            
            
            var btnAceptar=document.getElementById("btnAceptar");
            var btnCancelar=document.getElementById("btnCancelar");
            btnAceptar.setAttribute("type","button");
            btnAceptar.setAttribute("value","Si");
            btnAceptar.setAttribute("onclick","hacerEncuesta('"+idEncuestaRealizada+"','"+dtJson[0].IdMuestra+"','"+dtJson[0].Nombre+"','"+dtJson[0].CuotasSeleccion+"','"+dtJson[0].Concesionario+"');");            
            btnCancelar.setAttribute("type","button");
            btnCancelar.setAttribute("value","No");
            btnCancelar.setAttribute("onclick",'cancelarEncuesta('+dtJson[0].IdMuestra+');');
                
        }
     }else{
         alert(respSer.mensaje);
         
     }
    
 }
         ).fail(function(){});
}

function obtenerParentesco(){
    
    var sel=document.getElementById("selParentesco");
    var div=document.getElementById("divParentesco");
    div.innerHTML="";
     if(sel.value!="Titular"){
        var txt = document.createElement("input");
        txt.setAttribute("id","txtParentesco");
        txt.setAttribute("type","text");
        txt.setAttribute("placeholder","Escriba aqui el nombre");
        div.appendChild(txt);
        
    }else{
      
           div.innerHTML="";
    }
    
}
function hacerEncuesta(idEncuesta,idMuestra,nombre,rango,concesionario){
     document.getElementById("formRegEncuesta").style.display='block';
      document.getElementById("divCancelacion").style.display='none';
    var hdMuestra=document.getElementById("hdIdMuestra");
    var userName=document.getElementById("nomUser");
    var hdrango=document.getElementById("hdRango");
    var hdconce=document.getElementById("hdConcesionario");
    //alert(rango);
    hdMuestra.value=idMuestra;
    userName.value=nombre;
    hdconce.value=concesionario;
    hdrango.value=rango;
    //alert("rango=>"+rango);
    //var numRango=Number(cuotas);
    //alert(cuotas);
    /*if(cuotas<12){
        rango.value="Uno";
    }else if(numRango > 13 && numRango < 18){
        rango.value="Dos";
    }else{
        rango.value="Tres";
    }*/
    MostrarDiv();
   // cargarEncuestaDos("divPreguntas",idEncuesta);
    cargarEncuestaAgrupadaDeACuatro("divPreguntas",idEncuestaRealizada);
}
function cancelarEncuesta(idMuestra){
    document.getElementById("divCancelacion").style.display='block';
    document.getElementById("formRegEncuesta").style.display='none';
    document.getElementById("divParentesco").style.display='none';
    document.getElementById("selParentesco").style.display='none';
    idClienteEntrevistado=idMuestra;
    
   
}
function registrarCancelacion(){
    
   var sel=document.getElementById("selCancelacion"); 
   var idEnc=document.getElementById("hdIdEncuesta");
   var idUser=document.getElementById("hdIdUsuario");   
   var hd=document.getElementById("hdIdMuestra");
   var txbObservacion=document.getElementById("txbObservacionesCancelacion");
   if(sel.value != "0" && txbObservacion.value.length > 0){
       var canEntre=new entrevista("cancelarEntrevista",idEncuestaRealizada,"",sel.value,idClienteEntrevistado,idAgente,"","","","",txbObservacion.value);
        var res=canEntre.metodo();
        res.success(function(resSer){
            
          if(resSer != false){
              alert("Registro exitoso");
               ocultarDiv();
               location.reload(true);
          }else{
              alert("Ha ocurrido un error");
               ocultarDiv();
               location.reload(true);
          }
       //    alert("hola");
        }).fail(function(){});
   }else{
       alert("Por favor selecciona una opcion y escribe una observación para hacer el registro de la cancelación");
   }
}
function EnviarFormulario(){
var idUser=document.getElementById("hdIdUsuario");
var idMue=document.getElementById("hdIdMuestra");
var rango=document.getElementById("hdRango");
var hdconce=document.getElementById("hdConcesionario");
var selParentesco=document.getElementById("selParentesco");
var observaciones=document.getElementById("idObservaciones");

var Parentesco="";
if(selParentesco.value!="Titular" && selParentesco.value!="--"){
    Parentesco=selParentesco.value+"=>"+document.getElementById("txtParentesco").value;
}else if(selParentesco.value=="Titular"){
    Parentesco=selParentesco.value;
}
if(Parentesco!="")
{
    var tipoPreg;
    var arrTipo=new Array();
    var valor="";
     var valorD="";
    var valComentario=new Array();
    var arrResp=new Array();
    var arrRespMultiple=new Array();
    var form=document.getElementById("formRegEncuesta");
    var elementos=form.elements;    
    console.log(elementos);
    console.log(elementos.length);
    /*AQUI INSERTAR CLIENTE A LA BASE DE DATOS*/    
    
        var a=0;
        var ran=0;
        var respuestaUsuario={};
        var r={};
        var res={};
        for(var i in elementos){
            if(elementos[i].checked === true || elementos[i].type== "text" || elementos[i].type=="select-one" ){

               var tipo=elementos[i].name.split("_"); 
               //console.log(elementos[i]);
               
               
               
               switch(tipo[0]){
                   case "Abiertas":
                       
                       if(respuestaUsuario[tipo[1]]==undefined){
                            var rA=elementos[i].id.split("_");
                            respuestaUsuario[tipo[1]]={
                                tipo:"Abiertas",
                                respuesta:rA[1],
                                comentario:elementos[i].value
                
                            };
                       }
                       
                       
                        
                       /*var tipoPreg="Abiertas";
                       var key = tipo[1];
                        valor=elementos[i].value;
                        arrResp[key]=valor;
                        arrTipo[key]=tipoPreg;
                        console.log(arrTipo);*/
                       break;
                       case "AbiertaCategoria":
                       var c=document.getElementById("selAbierta_"+tipo[1]);
                       if(respuestaUsuario[tipo[1]]==undefined){
                            respuestaUsuario[tipo[1]]={
                                tipo:"AbiertaCategoria",
                                respuesta:elementos[i].value,
                                comentario:c.value
                
                            };
                       }
             
                       break;
                   case "Cerrada":
                       respuestaUsuario[tipo[1]]={
                                tipo:"Cerrada",
                                respuesta:elementos[i].value
                       };
                       /*var tipoPreg="Cerrada";
                       var key = tipo[1];
                        valor=elementos[i].value;
                        arrResp[key]=valor;
                        arrTipo[key]=tipoPreg;
                        console.log(arrTipo);*/
                        break;
                   case "CerradaComentario":
                       var c=document.getElementById("txbCerradaComentario"+tipo[1]);
                       if(respuestaUsuario[tipo[1]]==undefined){
                            respuestaUsuario[tipo[1]]={
                                     tipo:"CerradaComentario",
                                     respuesta:elementos[i].value,
                                     comentario:c.value

                            };
                        }
                       /*var tipoPreg="CerradaComentario";
                       var key = tipo[1];
                       //console.log(elementos[i].type);
                          if(elementos[i].type== "text"){
                           valComentario[1]=elementos[i].value;
                           arrResp[key]=valComentario;
        //                   alert(elementos[i].value);
                             arrTipo[key]=tipoPreg;   
                          }
                          
                        arrTipo[key]=tipoPreg;
                        valComentario=elementos[i].value.split(";");
                       */
                            
                        
                       break;
                   case "CerradaMultiple":
                       //verifico que no exista el objeto con el indice de la pregunta
                       //console.log(tipo[1]);
                        if(respuestaUsuario[tipo[1]]==undefined){
                            r={};
                            r[a]={
                                r:elementos[i].value
                            };
                            
                            respuestaUsuario[tipo[1]]={
                                  tipo:"CerradaMultiple",
                                  respuesta:r
                            };
                            /*console.log("Primera asignacion");
                            console.log(respuestaUsuario[tipo[1]].respuesta);*/
                        }else{
                            
                            r[a]={
                                r:elementos[i].value
                            };
                           /* console.log("Antes de la asignacion");
                            console.log(respuestaUsuario[tipo[1]].respuesta);
                            console.log(r);*/
                            respuestaUsuario[tipo[1]].respuesta=r;
                            /*console.log("Despues de la asignacion");
                            console.log(respuestaUsuario[tipo[1]].respuesta);*/
                        }
                           
                       
                       /*var tipoPreg="CerradaMultiple";    
                       
                        var keyMultiple = tipo[1];
                        var opc=elementos[i].value+",";
                        //console.log(valorD);
               //         console.log(elementos[i].value);
                        valorD+=opc;
                        arrRespMultiple[keyMultiple]=valorD;
                        arrTipo[keyMultiple]=tipoPreg;*/

                       break;
                       
                    case "Rankin":
                        var insertar=true;
                        console.log(elementos[i]);
                        console.log(tipo[1]);
                        console.log(tipo[2]);
                        if(respuestaUsuario[tipo[1]]==undefined){
                            res={};
                            respuestaUsuario[tipo[1]]={
                                  tipo:"Rankin"
                            };
                            
                            res[a]={
                                r:tipo[2],
                                p:elementos[i].value
                                
                            };
                            
                            respuestaUsuario[tipo[1]].respuesta=res;    
                            
                            
                            
                        }else{
                            
                            res[a]={
                                r:tipo[2],
                                p:elementos[i].value
                            };
                            console.log("Antes de la asignacion");
                            console.log(respuestaUsuario[tipo[1]].respuesta);
                            
                         
                                respuestaUsuario[tipo[1]].respuesta=res;    
                            
                            
                            
                            console.log("Despues de la asignacion");
                            console.log(respuestaUsuario[tipo[1]].respuesta);
                        }
                        
                        ran++;
                        
                       
                       /*var tipoPreg="Cerrada";
                       var key = tipo[1];
                        valor=elementos[i].value;
                        arrResp[key]=valor;
                        arrTipo[key]=tipoPreg;
                        console.log(arrTipo);*/
                        break;   
                       
               }
               a++;

            }
           // console.log(elementos[i]);
           // console.log(elementos[i].type);

        }
        //console.log(arrRespMultiple);
        /*var arreglo=new Array();
        for(var a in arrRespMultiple){
            arreglo[a]=arrRespMultiple[a].split(",");
            
            arrResp[a]=arreglo[a];
        }*/
            
        //console.log(arrResp);
        /*var arregloRespuestas=new Array();
        var arrAsoc=new Array();

        for(var i in arrResp){
            //console.debug(i+"=>"+arrResp[i]);
            if(arrResp[i] != null || arrResp[i] != ""){
               //arregloRespuestas[i]=arrResp[i]; 
               arrAsoc[i]=[arrResp[i]];
               //arrAsoc[arrAsoc[1]]=[];
                //console.debug(i+"=>"+arrAsoc[i]); 
            }

         }*/
        console.log(respuestaUsuario);    
        //console.log(arrTipo);
        //arregloRespuestas=arrAsoc;
        //console.log(arregloRespuestas);
        //if(arregloRespuestas.length => 0){
            var idEnc= document.getElementById("hdIdEncuesta").value;
            var mues= new muestra("actUsuarioEntrevista");
            var entr=new entrevista("regEntrevista",
                                    idEncuestaRealizada,
                                    respuestaUsuario,
                                    /*arregloRespuestas,*/
                                    "EF",
                                    idMue.value,
                                    idAgente,
                                    rango.value,
                                    hdconce.value,
                                    Parentesco,
                                    arrTipo,
                                    observaciones.value);
            var respEntre= entr.metodo();    
            respEntre.success(function (respServidor)
            {
                console.log(respServidor);
              if(respServidor == true   ){
                alert("Encuesta registrada exitosamente");   
                limpiarForm();
                document.getElementById("selParentesco").value="--";
                ObtenerEntrevista(idEncuestaRealizada,idAgente);
                
                location.reload();
                 
              }else if(respServidor!=false){
                alert("Ha ocurrido un error en el sistema por favor comuniquese con el administrador");
                limpiarForm();
                document.getElementById("selParentesco").value="--";                
                //ObtenerEntrevista(idEncuestaRealizada,idAgente);
                //location.reload();
  
              }else{
                  alert("Ha ocurrido un error en el sistema por favor comuniquese cn el administrador");
              }
                
                //location.href="/Vista/Encuestas/Asesor/seleccionarEntrevista.html?nomEnc="+idEnc+"&nomUser="+idUser.value;

            }).fail(function (){});
}
else{
    alert("seleccione un Parentesco");
}
    /*}else{
        alert("por favor ingrese datos en la encuesta");
    }*/ 
}

function limpiarForm(){
    var form=document.getElementById("formRegEncuesta");
    //console.log();
    for(i in form.elements){
        if(form.elements[i].checked===true ){
            console.log(form.elements[i].value);
            form.elements[i].checked=false;
        }else if(form.elements[i].type == "text" ){
            console.log(form.elements[i].value);
             form.elements[i].value="";
        }
    }
}


window.addEventListener("load",Iniciar,false);

/*
 * 
 * @param {type} id_pagina
 * @returns {undefined}
 * Funcion que agrupa las preguntas en divs
 * 
 */
function cargarEncuestaAgrupadaDeACuatro(id_div,nom_encuesta){
    
    
    var enc=new encuesta("obtenerEncuesta",nom_encuesta,"");
    var resp=enc.metodo();
    
   
    resp.success(function(respServidor)
    {
        //var datosJson=eval(respServidor);
        datosJson=eval(respServidor);
        var tam=Object.keys(datosJson).length;
        console.log(tam);
        //dibujarEncuestaAgrupada(datosJson,tam,id_div,nom_encuesta);
        dibujarEncuesta(datosJson,id_div,nom_encuesta);
    }).fail(function(){});
    
    
}
function dibujarEncuestaAgrupada(datosJson,tam,id_div,nom_encuesta){
    var i=0;
    var grupo=0;
    var divPaginas=document.getElementById("divPaginas");
   
    var hidden=document.getElementById("hdIdEncuesta");
    var divPrincipal=document.getElementById(id_div);
    var labNombre=document.getElementById("nomEncuesta");
    divPrincipal.innerHTML="";
    var numPregunta=0;
    
    
    if(tam <=4){
           document.getElementById("divFinalizarEntevista").style.display='block'; 
           hidden.value=nom_encuesta;  
            var txtNombre=document.createTextNode(datosJson[0].NombreEncuesta);
            var divGrupo=document.createElement("div");
            var divId=1;
            divGrupo.setAttribute("id","pagina_"+divId);
            divGrupo.setAttribute("name","pagina");      
            divGrupo.setAttribute("class","mostrar");      
            var hPagina=document.createElement("input");
            hPagina.setAttribute("id","pg_"+divId+"");
            hPagina.setAttribute("value",divId);
            hPagina.setAttribute("type","button");
            hPagina.setAttribute("onClick","ocultarPagina("+divId+");");
            //divPaginas.appendChild(hPagina);
            arrPaginas.push(divId);
            for(var elemento in datosJson){

                switch(datosJson[elemento].Tipo){
                        case "Abierta":



                               var ul=document.createElement("ul");

                               ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                               //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                               //ul.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas); 

                               var li = document.createElement("li");
                               var argumento=document.createElement("h3");
                               numPregunta++;
                               var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
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

                            break;
                        case "AbiertaCategoria":



                               var ul=document.createElement("ul");

                               ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                               //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                               //ul.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas); 

                               var li = document.createElement("li");
                               var argumento=document.createElement("h3");
                               numPregunta++;
                               var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
                               argumento.appendChild(txtArgumento);
                               li.appendChild(argumento);
                               ul.appendChild(li);

                               var li = document.createElement("li");
                               var respuesta=document.createElement("input");
                               respuesta.setAttribute("type","text");
                               respuesta.setAttribute("name","AbiertaCategoria_"+datosJson[elemento].IdPreguntas);
                               respuesta.setAttribute("placeholder","respuesta");                           
                               respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                               li.appendChild(respuesta);
                               ul.appendChild(li);
                               var select =document.createElement("select");
                               select.setAttribute("id","selAbierta_"+datosJson[elemento].IdPreguntas)
                               var strRespuestas=datosJson[elemento].respuestas;
                               console.log(strRespuestas);
                               for(var i in strRespuestas){

                                
                                var opcion=document.createElement("option");
                                //opcion.setAttribute("type","radio");
                                opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                                //opcion.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                                opcion.innerHTML=strRespuestas[i].Respuesta;
                                 
                                select.appendChild(opcion);
                                
                                

                             }
                             li.appendChild(select);

                            break;    
                        case "Cerrada":


                             var ul=document.createElement("ul");

                             ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                             //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
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


                      //       divGrupo.appendChild(ul);

                            break;
                        case "CerradaComentario":

                             var ul=document.createElement("ul");

                             //ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                             //ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                             ul.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
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

                        //   divGrupo.appendChild(ul);
                            break;
                        case "CerradaMultiple":

                             var ul=document.createElement("ul");

                             ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                           //  ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
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
                           //  divGrupo.appendChild(ul);

                        break;
                    }
                
                 divGrupo.appendChild(ul);
                 divPrincipal.appendChild(divGrupo);
                 //divPrincipal.appendChild(divPaginas);
            }
        }
        else{
            hidden.value=nom_encuesta;  
            var txtNombre=document.createTextNode(datosJson[0].NombreEncuesta);
            var divGrupo=document.createElement("div");
            var divId=1;
            divGrupo.setAttribute("id","pagina_"+divId);
            divGrupo.setAttribute("name","pagina");      
            divGrupo.setAttribute("class","mostrar");      
            var hPagina=document.createElement("input");
            hPagina.setAttribute("id","pg_"+divId+"");
            hPagina.setAttribute("value",divId);
            hPagina.setAttribute("type","button");
            hPagina.setAttribute("onClick","ocultarPagina("+divId+");");
            divPaginas.appendChild(hPagina);
            arrPaginas.push(divId);
            for(var elemento in datosJson){

                switch(datosJson[elemento].Tipo){
                        case "Abierta":



                               var ul=document.createElement("ul");

                               ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                               //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                               //ul.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas); 

                               var li = document.createElement("li");
                               var argumento=document.createElement("h3");
                               numPregunta++;
                               var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
                               argumento.appendChild(txtArgumento);
                               li.appendChild(argumento);
                               ul.appendChild(li);

                               var li = document.createElement("li");
                               var respuesta=document.createElement("input");
                               respuesta.setAttribute("type","text");
                               respuesta.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas);
                               respuesta.setAttribute("placeholder","respuesta");                           
                               respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                               li.appendChild(respuesta);
                               ul.appendChild(li);
                               

                           break;
                           case "AbiertaCategoria":



                               var ul=document.createElement("ul");

                               ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                               //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                               //ul.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas); 

                               var li = document.createElement("li");
                               var argumento=document.createElement("h3");
                               numPregunta++;
                               var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
                               argumento.appendChild(txtArgumento);
                               li.appendChild(argumento);
                               ul.appendChild(li);

                               var li = document.createElement("li");
                               var respuesta=document.createElement("input");
                               respuesta.setAttribute("type","text");
                               respuesta.setAttribute("name","AbiertaCategoria_"+datosJson[elemento].IdPreguntas);
                               respuesta.setAttribute("placeholder","respuesta");                           
                               respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                               li.appendChild(respuesta);
                               ul.appendChild(li);
                               
                               
                               var select =document.createElement("select");
                               select.setAttribute("id","selAbierta_"+datosJson[elemento].IdPreguntas)
                               var strRespuestas=datosJson[elemento].respuestas;
                               console.log(strRespuestas);
                               for(var i in strRespuestas){

                                
                                var opcion=document.createElement("option");
                                //opcion.setAttribute("type","radio");
                                opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                                //opcion.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                                opcion.innerHTML=strRespuestas[i].Respuesta;
                                 
                                select.appendChild(opcion);
                                
                                

                             }
                             li.appendChild(select);

                           break;
                        
                        case "Cerrada":


                             var ul=document.createElement("ul");

                             ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                             //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
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

                            break;
                        case "CerradaComentario":

                             var ul=document.createElement("ul");

                             ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                             //ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
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

                        //   divGrupo.appendChild(ul);
                            break;
                        case "CerradaMultiple":

                             var ul=document.createElement("ul");

                             //ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                           //  ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].pregunta);
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
                           //  divGrupo.appendChild(ul);

                        break;
                    }

                 grupo++;
                 if(grupo==5){
                     var divGrupo=document.createElement("div");
                     divId++;
                     divGrupo.setAttribute("id","pagina_"+divId);
                     divGrupo.setAttribute("name","pagina");
                     divGrupo.setAttribute("class","ocultar");
                     grupo=1;
                     var hPagina=document.createElement("input");


                      hPagina.setAttribute("id","pg_"+divId+"");
                      hPagina.setAttribute("value",divId);
                      hPagina.setAttribute("type","button");

                      hPagina.setAttribute("onClick","ocultarPagina("+divId+");");
                      divPaginas.appendChild(hPagina);
                      arrPaginas.push(divId);
                 }

                 divGrupo.appendChild(ul);
                 divPrincipal.appendChild(divGrupo);
                 //divPrincipal.appendChild(divPaginas);
            }
        }    

}
/*Funcion para mostrar la encuesta en una sola lista*/
function dibujarEncuesta(datosJson,id_div,nom_encuesta){
            var i=0;
            var grupo=0;
            var divPaginas=document.getElementById("divPaginas");
            var hidden=document.getElementById("hdIdEncuesta");
            var divPrincipal=document.getElementById(id_div);
            var labNombre=document.getElementById("nomEncuesta");
            divPrincipal.innerHTML="";
            divPaginas.innerHTML="";
            document.getElementById("divFinalizarEntevista").style.display='block'; 
            hidden.value=nom_encuesta;  
            var txtNombre=document.createTextNode(datosJson[0].NombreEncuesta);
            var numPregunta=0;
            //console.log(datosJson);
             for(var elemento in datosJson){
                 arregloPreguntas=datosJson;
                switch(datosJson[elemento].TipoPregunta){
                        case "Abierta":



                               var ul=document.createElement("ul");

                               ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                               //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                               //ul.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas); 

                               var li = document.createElement("li");
                               var argumento=document.createElement("h3");
                               numPregunta++;
                               var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].ArgumentoPregunta);
                               argumento.appendChild(txtArgumento);
                               li.appendChild(argumento);
                               ul.appendChild(li);

                               //var li = document.createElement("li");
                               var respuesta=document.createElement("input");
                               respuesta.setAttribute("type","text");
                               respuesta.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas);
                               respuesta.setAttribute("placeholder","respuesta");                           
                               respuesta.setAttribute("id","txt_"+datosJson[elemento].respuestas[0].IdRespuestaPreguntas);
                               li.appendChild(respuesta);
                               ul.appendChild(li);




                         //    divGrupo.appendChild(ul);



                            break;         
                        case "AbiertaCategoria":



                               var ul=document.createElement("ul");

                               ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                               //ul.setAttribute("onClick","agregarPreguntaAbierta("+datosJson[elemento].IdPreguntas+");");
                               //ul.setAttribute("name","Abiertas_"+datosJson[elemento].IdPreguntas); 

                               var li = document.createElement("li");
                               var argumento=document.createElement("h3");
                               numPregunta++;
                               var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].ArgumentoPregunta);
                               argumento.appendChild(txtArgumento);
                               li.appendChild(argumento);
                               ul.appendChild(li);

                               //var li = document.createElement("li");
                               var respuesta=document.createElement("input");
                               respuesta.setAttribute("type","text");
                               respuesta.setAttribute("name","AbiertaCategoria_"+datosJson[elemento].IdPreguntas);
                               respuesta.setAttribute("placeholder","respuesta");                           
                               respuesta.setAttribute("id",datosJson[elemento].IdPreguntas);
                               li.appendChild(respuesta);
                               var select =document.createElement("select");
                               select.setAttribute("id","selAbierta_"+datosJson[elemento].IdPreguntas);
                               var opcion=document.createElement("option");
                                //opcion.setAttribute("type","radio");
                               opcion.setAttribute("value","");
                                //opcion.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                               opcion.innerHTML="--Selecciona una opcion--";
                                
                               select.appendChild(opcion);
                               var strRespuestas=datosJson[elemento].respuestas;
                               console.log(strRespuestas);
                               for(var i in strRespuestas){

                                
                                var opcion=document.createElement("option");
                                //opcion.setAttribute("type","radio");
                                opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                                //opcion.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                                opcion.innerHTML=strRespuestas[i].Respuesta;
                                 
                                select.appendChild(opcion);
                                
                                

                             }
                             li.appendChild(select);
                              ul.appendChild(li);




                         //    divGrupo.appendChild(ul);



                            break;
                        case "Cerrada":


                             var ul=document.createElement("ul");

                             ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                             //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].ArgumentoPregunta);
                             argumento.appendChild(txtArgumento);
                             li.appendChild(argumento);
                             ul.appendChild(li);

                             var strRespuestas=datosJson[elemento].respuestas;
                             for(var i in strRespuestas){

                                var li =document.createElement("li");
                                var opcion=document.createElement("input");
                                opcion.setAttribute("type","radio");
                                opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                                opcion.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                                var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                                if(datosJson[elemento].Condicion=="1"){
                                   // console.log(datosJson[elemento].condiciones);
                                    for(var e in datosJson[elemento].condiciones){
                                        //console.log(datosJson[elemento].condiciones[e].Fk_Id_Condicion);
                                        switch(datosJson[elemento].condiciones[e].Fk_Id_Condicion){
                                            case "2"://_salto_
                                                //alert("Uyy hay una condicion");
                                                //alert(strRespuestas[i].Respuesta);
                                                //typeof strRespuestas[i].IdRespuestaPreguntas;
                                                //typeof datosJson[elemento].condiciones[e].Fk_Id_Pregunta;
                                                if(strRespuestas[i].IdRespuestaPreguntas==datosJson[elemento].condiciones[e].Fk_Id_Respuesta_Pregunta){
                                                    //alert("Uyyy que paso por que no llego aqui");
                                                    //console.log(datosJson[elemento].condiciones[e].Fk_Id_Respuesta_Pregunta);
                                                    //console.log(strRespuestas[i].IdRespuestaPreguntas);
                                                    txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta+"(Saltar a siguiente pregunta)");
                                                    //opcion.setAttribute("onchange","agregarSaltoOld("+strRespuestas[i].IdRespuestaPreguntas+","+datosJson[elemento].condiciones[e].Pregunta_Condicion+","+datosJson[elemento].NumeroPregunta+")");
                                                    opcion.setAttribute("onchange","agregarSalto("+datosJson[elemento].IdPreguntas+","+datosJson[elemento].NumeroPregunta+","+datosJson[elemento].condiciones[e].Pregunta_Condicion+")");
                                                }
                                                break;
                                            case "1"://_final_
                                                if(strRespuestas[i].IdRespuestaPreguntas==datosJson[elemento].condiciones[e].Fk_Id_Respuesta_Pregunta){
                                                
                                                    txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta+"(Finalizar encuesta)");
                                                    opcion.setAttribute("onchange","agregarFinal("+strRespuestas[i].IdRespuestaPreguntas+")");
                                                            //+","+datosJson[elemento].condiciones[e].pregunta_de_la_condicion+","+datosJson[elemento].NumeroPregunta+")");
                                                }
                                                break;
                                            case "":
                                                break;
                                        }
                                    }
                                }
                                //console.log(datosJson[elemento].Condicion);                                
                                var respuestaOpcion=document.createElement("h4");
                                
                                respuestaOpcion.appendChild(txtRespuesta);
                                li.appendChild(opcion);
                                li.appendChild(respuestaOpcion);
                                ul.appendChild(li);

                             }


                      //       divGrupo.appendChild(ul);

                            break;
                        case "CerradaComentario":

                             var ul=document.createElement("ul");

                             ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                             //ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","CerradaComentario_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].ArgumentoPregunta);
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
                                var respuestaOpcion=document.createElement("h4");
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
                               respuesta.setAttribute("id","txbCerradaComentario"+datosJson[elemento].IdPreguntas);
                               li.appendChild(respuesta);
                               ul.appendChild(li);

                        //   divGrupo.appendChild(ul);
                            break;
                        case "CerradaMultiple":

                             var ul=document.createElement("ul");

                             ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                           //  ul.setAttribute("onClick","agregarPreguntaCerradaComentario("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].ArgumentoPregunta);
                             argumento.appendChild(txtArgumento);
                             li.appendChild(argumento);
                             ul.appendChild(li);
                             var strRespuestas=datosJson[elemento].respuestas;
                             for(var i in strRespuestas){

                                var li =document.createElement("li");
                                var opcion=document.createElement("input");
                                opcion.setAttribute("type","checkbox");
                                opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                                opcion.setAttribute("name","CerradaMultiple_"+datosJson[elemento].IdPreguntas);
                                var respuestaOpcion=document.createElement("h4");
                                var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                                respuestaOpcion.appendChild(txtRespuesta);
                                li.appendChild(opcion);
                                li.appendChild(respuestaOpcion);
                                ul.appendChild(li);

                             }
                           //  divGrupo.appendChild(ul);

                        break;
                        case "Rankin":


                             var ul=document.createElement("ul");

                             ul.setAttribute("id",datosJson[elemento].IdPreguntas);
                             //ul.setAttribute("onClick","agregarPreguntaCerrada("+datosJson[elemento].IdPreguntas+");");
                             //ul.setAttribute("name","Cerrada_"+datosJson[elemento].IdPreguntas);
                             var li = document.createElement("li");
                             var argumento=document.createElement("h3");
                             numPregunta++;
                             var txtArgumento=document.createTextNode(numPregunta+"-"+datosJson[elemento].ArgumentoPregunta);
                             argumento.appendChild(txtArgumento);
                             li.appendChild(argumento);
                             ul.appendChild(li);

                             var strRespuestas=datosJson[elemento].respuestas;
                             console.log(datosJson[elemento].respuestas);
                             console.log(datosJson[elemento].respuestas.length);
                             var cuantasRespuestas=datosJson[elemento].respuestas.length;
                             for(var i in strRespuestas){

                                var li =document.createElement("li");
                                /*var opcion=document.createElement("input");
                                opcion.setAttribute("type","radio");
                                opcion.setAttribute("value",strRespuestas[i].IdRespuestaPreguntas);
                                opcion.setAttribute("name","Rankin_"+datosJson[elemento].IdPreguntas);*/
                                var txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta);
                                
                                var select=document.createElement("select");
                                //select.setAttribute("id","sel_ran_"+strRespuestas[i].IdRespuestaPreguntas);
                                select.setAttribute("name","Rankin_"+datosJson[elemento].IdPreguntas+"_"+strRespuestas[i].IdRespuestaPreguntas);
                                select.setAttribute("onchange","validarRankin('"+strRespuestas[i].IdRespuestaPreguntas+"');");
                                for (var r=1;r<=cuantasRespuestas;r++){
                                    var opt=document.createElement("option");
                                    opt.value=r;
                                    opt.innerHTML=r;
                                    select.appendChild(opt);
                                }
                                
                                /*
                                if(datosJson[elemento].Condicion=="1"){
                                   // console.log(datosJson[elemento].condiciones);
                                    for(var e in datosJson[elemento].condiciones){
                                        //console.log(datosJson[elemento].condiciones[e].Fk_Id_Condicion);
                                        switch(datosJson[elemento].condiciones[e].Fk_Id_Condicion){
                                            case "2"://_salto_
                                                //alert("Uyy hay una condicion");
                                                //alert(strRespuestas[i].Respuesta);
                                                //typeof strRespuestas[i].IdRespuestaPreguntas;
                                                //typeof datosJson[elemento].condiciones[e].Fk_Id_Pregunta;
                                                if(strRespuestas[i].IdRespuestaPreguntas==datosJson[elemento].condiciones[e].Fk_Id_Respuesta_Pregunta){
                                                    //alert("Uyyy que paso por que no llego aqui");
                                                    //console.log(datosJson[elemento].condiciones[e].Fk_Id_Respuesta_Pregunta);
                                                    //console.log(strRespuestas[i].IdRespuestaPreguntas);
                                                    txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta+"(Saltar a siguiente pregunta)");
                                                    //opcion.setAttribute("onchange","agregarSaltoOld("+strRespuestas[i].IdRespuestaPreguntas+","+datosJson[elemento].condiciones[e].Pregunta_Condicion+","+datosJson[elemento].NumeroPregunta+")");
                                                    opcion.setAttribute("onchange","agregarSalto("+datosJson[elemento].IdPreguntas+","+datosJson[elemento].NumeroPregunta+","+datosJson[elemento].condiciones[e].Pregunta_Condicion+")");
                                                }
                                                break;
                                            case "1"://_final_
                                                if(strRespuestas[i].IdRespuestaPreguntas==datosJson[elemento].condiciones[e].Fk_Id_Respuesta_Pregunta){
                                                
                                                    txtRespuesta=document.createTextNode(strRespuestas[i].Respuesta+"(Finalizar encuesta)");
                                                    opcion.setAttribute("onchange","agregarFinal("+strRespuestas[i].IdRespuestaPreguntas+")");
                                                            //+","+datosJson[elemento].condiciones[e].pregunta_de_la_condicion+","+datosJson[elemento].NumeroPregunta+")");
                                                }
                                                break;
                                            case "":
                                                break;
                                        }
                                    }
                                }
                                */
                    
                               //console.log(datosJson[elemento].Condicion);                                
                                var respuestaOpcion=document.createElement("h4");
                                
                                respuestaOpcion.appendChild(txtRespuesta);
                                li.appendChild(select);
                                li.appendChild(respuestaOpcion);
                                ul.appendChild(li);

                             }


                      //       divGrupo.appendChild(ul);

                            break;
                    }
               
                 divPrincipal.appendChild(ul);
            }
}
function validarRankin(id){
    var elemento=document.getElementById("sel_ran_"+id);
    var elementosPorNombre=document.getElementsByName("sel_ran");
    console.log("Mi id es => "+id);
    console.log(elemento);
    console.log(elementosPorNombre);
    console.log("Has seleccionado la opcion => "+elemento.value);
    
} 
/*
 * 
 * @param {type} id_pagina
 * @returns {undefined}
 * Funcion que muestra el div de la pagina
 */
function ocultarPagina(id_pagina){
  
  document.getElementById("pagina_"+id_pagina).className="mostrar";  
  for(var i in arrPaginas){
      if(arrPaginas[i]!=id_pagina){
          document.getElementById("pagina_"+arrPaginas[i]).className="ocultar";  
      }
  }
  
  if(arrPaginas.length==id_pagina){
     document.getElementById("divFinalizarEntevista").style.display='block'; 
  }else{
      document.getElementById("divFinalizarEntevista").style.display='none'; 
  }
  }
  
function agregarSalto(idPregunta,numPregunta,numPreguntaSalto){
     if(confirm("Desea saltar  pregunta "+numPreguntaSalto)){
          console.log(numPregunta);
      console.log(numPreguntaSalto);
      var ap=arregloPreguntas;
      for(var i in ap){
           //console.log(ap[i].NumeroPregunta);
           //console.log(numPregunta);
          if(ap[i].NumeroPregunta<= numPregunta && ap[i].NumeroPregunta < numPreguntaSalto){
              console.log("visible");
              console.log("Numero de pregunta "+ap[i].NumeroPregunta);
              //console.log(ap[i]);
              //document.getElementById(ap[i].IdPreguntas).style.display='block';
          }else if( ap[i].NumeroPregunta >= numPregunta && ap[i].NumeroPregunta > numPreguntaSalto){
              console.log("visible");
              console.log("Numero de pregunta "+ap[i].NumeroPregunta);
              //console.log(ap[i]);
              //document.getElementById(ap[i].IdPreguntas).style.display='block';
          }else if(ap[i].NumeroPregunta == numPreguntaSalto){
              console.log("visible");
              console.log("Numero de pregunta "+ap[i].NumeroPregunta);
              //console.log(ap[i]);
              //document.getElementById(ap[i].IdPreguntas).style.display='block';
          }else{
               console.log("invisible");
              console.log("Numero de pregunta "+ap[i].NumeroPregunta);
              console.log(ap[i]);
              console.log(ap[i].IdPreguntas);
              document.getElementById(ap[i].IdPreguntas).style.display='none';
              console.log(document.getElementById(ap[i].IdPreguntas).style.display);
          }
      }
     }
  }
function agregarFinal(idRespuesta,numPregunta,numPreguntaCondicion){
      if(confirm("desea finalizar la encuesta")){
          EnviarFormulario();
      }
  }