
window.addEventListener("load",iniciarApp,false);
//Variables Globales
var idUsuario;
var idEncuesta;
var idMuestra;
var rol;

//Funcion Inicial que agrega eventos a eleemntos de la aplicacion 
function iniciarApp(){
        InicioAdmin();
        document.getElementById("asignarMuestraUno").addEventListener("click",iniciarDetalleEncuesta,false);
        document.getElementById("asignarMuestraDos").addEventListener("click",iniciarDetalleEncuesta,false);
        document.getElementById("asignarMuestraTres").addEventListener("click",iniciarAsociarBaseDatos,false);
        document.getElementById("asignarMuestraCuatro").addEventListener("click",iniciarAsociarBaseDatos,false);
        document.getElementById("btnCrearPregunta").addEventListener("click",registrarPregunta,false);
        document.getElementById("selTipoPregunta").addEventListener("change",selecTipoPregunta,false);
        document.getElementById("impEncu").addEventListener("click",iniciarImportarEncuesta,false);
        document.getElementById("selMuestras").addEventListener("change",function(){
        //alert(this.value);
        //alert(this[this.selectedIndex].innerHTML);
        var divLista=document.getElementById("listaMuestras");
        divLista.innerHTML="";
        var btn=document.createElement("input");
         btn.setAttribute("onclick","asignarAEncuesta('"+this.value+"','"+this[this.selectedIndex].innerHTML+"');");
         btn.setAttribute("type","button");
         btn.setAttribute("value","asociar a encuesta");
        divLista.appendChild(btn);
        
        
        
        
    },false);
    
    document.getElementById("zona").addEventListener("click",iniciarMenuZonas,false);
    document.getElementById("regUsu").addEventListener("click",iniciarUsuario,false);
    document.getElementById("h4MisPreguntas").addEventListener("click",function(){
        location.href="crearEncuestas.html";
    },false);
   
}
/*Funcion para cargar los controles de el formulario para asociar una base de datos a una encuesta*/
function iniciarAsociarBaseDatos(){
    cargarMuestras();
    consultarFormularios("selEncuestaAsociacion");
}
/*Funcion para iniciar los controles de el formulario para crear el detalle de la encuesta*/
function iniciarDetalleEncuesta(){
    cargarUsuarios(); 
    cargarEncuestasListasProceso();
    document.getElementById("selZonaMuestra").addEventListener("change",obtenerDetalleMuestraZona,false);
    document.getElementById("selZonaMuestra").addEventListener("change",cargarConcesionario,false);
    document.getElementById("selZonaMuestra").addEventListener("change",limpiarNumeroRegistros,false);
    document.getElementById("btnAsociar").addEventListener("click",crearDetalleMuestra,false);
    document.getElementById("btnAsociar").addEventListener("click",consultarCantidadMuestra,false);
    document.getElementById("selAsignarMuestraEncuesta").addEventListener("change",cargarMuestra,false);
    document.getElementById("selAsignarMuestraEncuesta").addEventListener("change",consultarCantidadMuestra,false);
    document.getElementById("selAsignarMuestraEncuesta").addEventListener("change",cargaRangosAdminMuestra,false);
    document.getElementById("selConcesionarioMuestra").addEventListener("change",obtenerDetalleMuestra,false);
    
    
}
/*Funcion para iniciar ñlalas caracteristicas de importacion*/
function iniciarImportarEncuesta(){

    consultarFormularios("selAplicativo");
    document.getElementById("btnImportarEncuesta").addEventListener("click",subirArchivoEncuesta,false);
    document.getElementById("selAplicativo").addEventListener("click",validarCasillas,false);
}
/*Funcion para mostrar la encuesta  que se va importar para verificar que casillas corresponde en el archivo*/
function validarCasillas(){
    console.log(this.value);
    if(this.value>0){
        var enc= new encuesta("obtenerEncuestaPlantillas",this.value,"");    
        var resPen=enc.metodo();

        resPen.success(function(respSer){

        console.log(respSer);
        dibujarPlnatillaEncuestaValidarImportacion(respSer);

        }).fail(function(){});
    }
}
function dibujarPlnatillaEncuestaValidarImportacion(d){
    var div=document.getElementById("divVerificar");
    div.innerHTML="";
    for(var i in d){
        console.log(d[i].ArgumentoPregunta);
        console.log(d[i].TipoPregunta);
        var ul=document.createElement("ul");        
        var li=document.createElement("li");
        var h4=document.createElement("h4");
        h4.innerHTML=d[i].ArgumentoPregunta;
        li.appendChild(h4);
        switch(d[i].TipoPregunta){
            case "Abierta":
                
                    var inp=document.createElement("input");
                    li.appendChild(inp);
                    var casilla=document.createElement("input");
                    casilla.setAttribute("placeholder"," celda de excel ejem: C3");
                    casilla.setAttribute("id",d[i].respuestas[r].IdRespuestaPreguntas);
                    casilla.setAttribute("placeholder"," celda de excel ejem: C3");
                    casilla.setAttribute("id",d[i].respuestas[r].IdRespuestaPreguntas);                      
                    li.appendChild(casilla);
                    ul.appendChild(li);
                    var li=document.createElement("li");
                    ul.appendChild(li);
                
                break;
            case "AbiertaCategoria":
                var sel=document.createElement("select");
                for(var r in d[i].respuestas){
                    console.log(d[i].respuestas[r]);     
                    var opt=document.createElement("option");
                    opt.setAttribute("value",d[i].respuestas[r].IdRespuestaPreguntas);
                    opt.innerHTML=d[i].respuestas[r].Respuesta;
                    sel.appendChild(opt); 
                    li.appendChild(sel);
                    var casilla=document.createElement("input");
                    casilla.setAttribute("placeholder"," celda de excel ejem: C3");
                    casilla.setAttribute("id",d[i].respuestas[r].IdRespuestaPreguntas);
                    li.appendChild(casilla);
                    ul.appendChild(li);
                    var li=document.createElement("li");
                    ul.appendChild(li);

                }
                break;
           case "Cerrada":
               
               for(var r in d[i].respuestas){
                   
                    console.log(d[i].respuestas[r]);     
                    var inp=document.createElement("input");
                    inp.setAttribute("type","radio");
                    var h=document.createElement("h4");
                    h.innerHTML=d[i].respuestas[r].Respuesta;
                    if(d[i].respuestas[r].Comentario!=""){
                     h.innerHTML=d[i].respuestas[r].Comentario;    
                    }
                    li.appendChild(h);
                    li.appendChild(inp);
                    var casilla=document.createElement("input");
                    casilla.setAttribute("placeholder"," celda de excel ejem: C3");
                    casilla.setAttribute("id",d[i].respuestas[r].IdRespuestaPreguntas);
                    li.appendChild(casilla);
                    ul.appendChild(li);
                    var li=document.createElement("li");
                    ul.appendChild(li);

                }
                break;
            case "CerradaMultiple":
                for(var r in d[i].respuestas){
                   
                    console.log(d[i].respuestas[r]);     
                    var inp=document.createElement("input");
                    inp.setAttribute("type","checkbox");
                    var h=document.createElement("h4");
                    h.innerHTML=d[i].respuestas[r].Respuesta;
                    
                    li.appendChild(h);
                    li.appendChild(inp);
                    var casilla=document.createElement("input");
                    casilla.setAttribute("placeholder"," celda de excel ejem: C3");
                    casilla.setAttribute("id",d[i].respuestas[r].IdRespuestaPreguntas);
                    li.appendChild(casilla);
                    ul.appendChild(li);
                    var li=document.createElement("li");
                    ul.appendChild(li);

                }
                break;
            case "GrupoPreguntas":
                for(var r in d[i].respuestas){
                   
                    console.log(d[i].respuestas[r]);     
                    var inp=document.createElement("input");
                    inp.setAttribute("type","radio");
                    var h=document.createElement("h4");
                    h.innerHTML=d[i].respuestas[r].Respuesta;
                    
                    li.appendChild(h);
                    li.appendChild(inp);
                    var casilla=document.createElement("input");
                    casilla.setAttribute("placeholder"," celda de excel ejem: C3");
                    casilla.setAttribute("id",d[i].respuestas[r].IdRespuestaPreguntas);
                    li.appendChild(casilla);
                    ul.appendChild(li);
                    var li=document.createElement("li");
                    ul.appendChild(li);

                }
                break;
            case "Rankin":
                for(var r in d[i].respuestas){
                   
                    console.log(d[i].respuestas[r]);     
                    var inp=document.createElement("input");
                    inp.setAttribute("type","radio");
                    var h=document.createElement("h4");
                    h.innerHTML=d[i].respuestas[r].Respuesta;                    
                    li.appendChild(h);
                    li.appendChild(inp);
                    var casilla=document.createElement("input");
                    casilla.setAttribute("placeholder"," celda de excel ejem: C3");
                    casilla.setAttribute("id",d[i].respuestas[r].IdRespuestaPreguntas);
                    li.appendChild(casilla);
                    ul.appendChild(li);
                    var li=document.createElement("li");
                    ul.appendChild(li);

                }
                break;
            
        }
        div.appendChild(ul);
        
    }
}
/*Funcion para subir la encuesta finalizada en .xlsx*/
function subirArchivoEncuesta(){
    
    if($("#flvMiEncuesta")[0].files[0] )
    {           
            var arch = $("#flvMiEncuesta")[0].files[0];
            var nombreArchivo=arch.name;
            var extension=nombreArchivo.substring(nombreArchivo.lastIndexOf('.')+1);
            var tam=arch.size;
            var tipo=arch.type;	
            //var file=document.getElementById('formCargarMuestra');
            var file =jQuery('#flvMiEncuesta');
            var formData=new FormData(document.getElementById('formImportarMuestraEncuesta'));
           
            //formData.append("clave",valor);
            //formData.append("idRangos",rango);
             formData.append("archivo",arch);
             //formData.append("operacion","crearMuestra");
             formData.append("operacion","importarEncuesta");
             formData.append("nombre","");
             formData.append("fechaSubida",horaCliente());
            
             
            if(esExcel(extension) ){
            
                    var f=document.getElementById("formVerificar");
                    console.log(f); 
            
                    var pet =peticionAjaxUpload('subir_muestra',formData);
                   
                    pet.success(function(response){
                                //var respuesta=JSON.stringify(response);
                               // console.log(response);
                                 var datosJSON=eval(response); 
                                 
                                console.log(datosJSON);
                                /*
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
                                         document.getElementById("divNoRegistrados").style.display='none';
                                         resp.innerHTML="";
                                         alert("Se han creado "+datosJSON.numeroDeRegistros+" registros ");
                                         document.getElementById("txbNombreMuestra").value="";
                                         file.replaceWith( file = file.val('').clone(true));
                                     }
                                 }  
                                 else{
                                     alert(datosJSON.mensaje);
                                        var noRegistrados=new Array();
                                         for(var i in datosJSON.registrosNoRegistrados){
                                             console.log(datosJSON.registrosNoRegistrados[i]);
                                             noRegistrados.push(datosJSON.registrosNoRegistrados[i]);
                                         }
                                            dibujarTablaNoregistrados(noRegistrados,"divNoRegistrados");
                                            document.getElementById("divNoRegistrados").style.display='block';
                                            document.getElementById("txbNombreMuestra").value="";
                                            file.replaceWith( file = file.val('').clone(true));                                     
                                 } */                              
                    }).fail(function(){
                         //resp.innerHTML="Ha ocurrido un error ";
                         alert("Ha ocurrido un error");
                     });




            }
            else{
                
                    file.replaceWith( file = file.val('').clone(true));
                    alert("archivo no valido");
                
                
            }
     }
     else{
         alert("No hay Base de datos cargada para subir ");
     }
}
/*Funcion para recibir los valores de login.html*/
function InicioAdmin(){
    if(sessionStorage["usuarioLogueado"]!=undefined){
        var valores=JSON.parse(sessionStorage["usuarioLogueado"]);
        rol=valores.rol;
        idUsuario=valores.idUsuario;
        if(rol=='3'){
             IniciarAnclas(valores);
        }else{
            alert("Usted no tiene permisos para ingresar");
        location.href="index.html";

        }
    }else{
        alert("Por favor ingrese correctamente al sistema!☻");
        location.href="index.html";
    }
   
   
   
   //Inicio para valore GET
  /*  var valores=recibirValorGet();
    if(valores['rol']=='3'){
        console.log("valores get admin");  
        console.log(valores);  
        rol=valores['rol'];
        idUsuario=valores['idUser'];
         IniciarAnclas(valores);
    }else{
        alert("Usted no tiene permisos para ingresar a esta pagina");
        location.href="/";
    }*/
}
/* Funcion que inicializa los valores para las anclas */
function IniciarAnclas(valores){
    
    var menReportes=document.getElementById("aReportes");
    var encuestaUno=document.getElementById("aEncuestasUno");
    var encuestaDos=document.getElementById("aEncuestasDos");
    var consultarEncuestaUno=document.getElementById("aConsultarEncuestaUno");
    var consultarEncuestaDos=document.getElementById("aConsultarEncuestaDos");
    var salir=document.getElementById("aSalir");
    
    menReportes.setAttribute("href","reportes.html");
    
    encuestaUno.setAttribute("href","crearEncuestas.html");
    encuestaDos.setAttribute("href","crearEncuestas.html");
    salir.setAttribute("onclick","salir("+valores.idUsuario+");");
    consultarEncuestaUno.setAttribute("href","consultarEncuestas.html");
    consultarEncuestaDos.setAttribute("href","consultarEncuestas.html");
  
}
/*Funcion que inicializa el formulario para las zonas*/
function iniciarMenuZonas(){
    document.getElementById("creConse").addEventListener("click",cargarZona,false);
    document.getElementById("conConse").addEventListener("click",cargarZona,false);
    document.getElementById("conZona").addEventListener("click",cargarZona,false);
    document.getElementById("conConse").addEventListener("click",cargarConcesionarioZona,false);
    document.getElementById("btnCrearZona").addEventListener("click",crearZona,false);
    document.getElementById("btnCrearConcesionario").addEventListener("click",crearConcesionario,false);
    document.getElementById("selBuscarZona").addEventListener("change",buscarConcesionario,false);
    document.getElementById("selBuscarZona").addEventListener("change",cargarConcesionarioZona,false);
    document.getElementById("selBuscarZonaDos").addEventListener("change",buscarConcesionario,false);
    document.getElementById("selBuscarConc").addEventListener("change",buscarConcesionario,false);
}
/*Funcion para cargar los valores del fomulario usuario*/
function iniciarUsuario(){
    cargarRol(); 
    
    document.getElementById("btnRegistrarUsuario").addEventListener("click",crearUsuario,false);
    document.getElementById("txbConfirmarClave").addEventListener("change",validarValoresClave,false);
  
}
/*Funcion para obtener la cantidad de registros disponibles en la base de datos para una zona determinada*/
function obtenerDetalleMuestraZona(){
    var valoresRangos= new muestra("obtenerCantidadMuestraZona",idEncuesta,this.value,idMuestra);
    var respuesta= valoresRangos.metodo();
    respuesta.success(function(respServ){
        var dtJson=eval(respServ);
        console.log(dtJson);
        //var lbl=document.createElement("label");
        //var txt=document.createTextNode(dtJson[0]);
        //lbl.appendChild(txt);
        document.getElementById("lblZona").innerHTML="";
        document.getElementById("lblZona").innerHTML=" Disponibles "+dtJson;
        document.getElementById("lblConce").innerHTML="";
    }).fail(function(){});
}
/*Funcion que consulta los concesionarios de una zona determinada para la base de datos*/
function cargarConcesionario(){
    
   
    var sel=document.getElementById("selConcesionarioMuestra");
         /*AQUI LIMPIAR SELECT ANTES DE CARAGRLO NUEVAMENTE*/
          if(sel.length>0){
                sel.innerHTML="";
                
           }
           
           var con=new concesionario("ConcesionarioPorZonaEnMuestra","",idMuestra,this.value);
              var respCon=con.metodo();
              respCon.success(function(respServidor){

                 var dtJson=eval(respServidor);
                   crearSelectConcesionario(sel,dtJson);
              }).fail(function(){});
      
}
/*Funcion para limpiar valores de los rangos*/
function limpiarNumeroRegistros(){
    document.getElementById("lblRuno").innerHTML="";       
    document.getElementById("lblRdos").innerHTML="";
    document.getElementById("lblRtres").innerHTML="";
    document.getElementById("lblRcuatro").innerHTML="";
        
}
/*Funcion para registrar en la tabla detalle encuesta muestra */
function crearDetalleMuestra(){
    var hdidEncu=document.getElementById("hdidEncu");
    var selEnc=document.getElementById("selEncuestaAsignarMuestra");
    var selConc = document.getElementById("selConcesionarioMuestra");
    var selUser=document.getElementById("selUsuarioMuestra");
    var rUno=document.getElementById("txbRangoUno");
    var rDos=document.getElementById("txbRangoDos");
    var rTres=document.getElementById("txbRangoTres");
    var rCuatro=document.getElementById("txbRangoCuatro");
    var hdIdMuestra=document.getElementById("hdMuestra");
    var hdAsig=document.getElementById("hdCantAsignadas");
    var hdMues=document.getElementById("hdCantMuestreo");
    var h = document.getElementById("idRes");
    var selZn=document.getElementById("selZonaMuestra");   
    
    
    var divUno=document.getElementById("divRangoUno");
    var divDos=document.getElementById("divRangoDos");
    var divTres=document.getElementById("divRangoTres");
    var divCuatro=document.getElementById("divRangoCuatro");
    
    if((selConc.value !== undefined)
        
        && (selUser.value !== "0")    
        && (rUno.value !== "")
        &&(rDos.value !== "")
        &&(rTres.value !== "")
        &&(rCuatro.value !== "")
    //    && (hdIdMuestra.value !== "")
       
            ){
          var raUno=Number(rUno.value);
          var raDos=Number(rDos.value);
          var raTres=Number(rTres.value);
          var raCuatro=Number(rCuatro.value);
          var muestraAsigNum=Number(hdAsig.value);
          var muestraNum=Number(hdMues.value);
           
        
        
        //alert(raUno+2);
           var rTotal=(raUno)+(raDos)+(raTres)+(raCuatro);
          // alert(rTotal);
           console.log(idEncuesta);
            //if(rTotal<=(muestraNum-muestraAsigNum) && rTotal>0){
              if(rTotal>0){
               var mues=new muestra("regDetalleMuestra",
                                idEncuesta,
                                selConc.value,
                                selUser.value,
                                idMuestra,
                                rUno.value,
                                rDos.value,
                                rTres.value,
                                rCuatro.value);
             var respMuestra=mues.metodo();
             respMuestra.success(function(respServidor){
                
                    if(respServidor == "Asociacion exitosa"){
                        hdAsig.value=muestraAsigNum+rTotal;
                       alert(respServidor);
                       h.innerHTML="";
                       consultarCantidadMuestra();
                       limpiarFormPreguntasMuestra();
                          selConc.value="0";
                          selUser.value="0";
                          selZn.value="0";
                          limpiarNumeroRegistros();
                           document.getElementById("lblZona").innerHTML="";
                           document.getElementById("lblConce").innerHTML="";
                          
             
                   }else{
                     //  alert(respServidor);
                       selConc.value="0";
                       selUser.value="0";
                       selZn.value="0";
                       h.innerHTML="";
                       //selEnc.value="0";
                       document.getElementById("selAsignarMuestra").value="0";
                       //consultarCantidadMuestra();
                       limpiarFormPreguntasMuestra();
                       limpiarNumeroRegistros();
                   }
                
             }).fail(function(){});
             
            }else{
                alert("Esta intentando ingresar una cantidad que sobrepasa la muestra de la encuesta");
                       selConc.value="0";
                       selUser.value="0";
                       selZn.value="0";
                       h.innerHTML="";
                       document.getElementById("selEncuestas").value="0";
                       document.getElementById("selAsignarMuestra").value="0";
               // h.innerHTML="";
                 limpiarNumeroRegistros();
                limpiarFormPreguntasMuestraTexto();
                //limpiarNumeroRegistros();
                
            } 
       
    }else{
        alert("Hay campos vacios");
    }
}
/*Funcion para consultar la cantidad de registros disponibles en la base de datos*/
function consultarCantidadMuestra(){
    //alert("AQUI CONSULTAR ASIGNADAS");
    var h=document.getElementById("idRes");
  
   if(this.value!=undefined){
        var encuesta_id=this.value;
   }else{
       var encuesta_id=idEncuesta;
   } 
   //alert(encuesta_id);
    var cantMuestra = document.getElementById("hdCantMuestreo");
    var cantAsignadas=document.getElementById("hdCantAsignadas");
    h.innerHTML="";
        var enc= new encuesta("obtenerCantidadMuestra",encuesta_id);
        var respEnc=enc.metodo();
        respEnc.success(function(respServidor){
            if(respServidor!="No hay coincidencias"){
                var dtJson=eval(respServidor);
                
               // console.log(dtJson[0].CantidadMuestra);
                cantMuestra.value=dtJson[0].CantidadMuestra;
                cantAsignadas.value=dtJson[0].Asignadas;
                
                //var txt=document.createTextNode("Ha asignado "+dtJson[0].Asignadas +" de "+dtJson[0].CantidadMuestra);
                var txt=document.createTextNode("Ha asignado "+dtJson[0].CantidadMuestra);
               // h.appendChild(txt);
              /*  if(cantMuestra.value == cantAsignadas.value){
                     var encDos=new encuesta("cambiarEstadoEncuesta",encuesta_id,"En Proceso");   
                     var res=encDos.metodo();
                      res.success(function(){
                        
                      //  sel.innerHTML="";
                   //     selEnc.innerHTML="";
                   //      consultarFormularios();
                         location.reload(); 
                      }).fail(function(){});
                }*/                
            }else{
               // alert(respServidor);
            }
        }).fail(function(){});
    
    
}
/*Funcion para consultar una base de datos asociada a una encuesta*/
function cargarMuestra(){
  
    var mue= new muestra("obtenerMuestras",this.value);
    idEncuesta=this.value;
    var respMues=mue.metodo();
    
    respMues.success(function(respServ){
        
        var dtJson=eval(respServ);
        console.log(dtJson);
        var dtJson=eval(respServ);
        console.log("Id Muestra "+dtJson[0].IdDescripcionMuestra);
         if( dtJson[0].IdDescripcionMuestra!= undefined){
            idMuestra=dtJson[0].IdDescripcionMuestra;
            //console.log("Id Muestra valor variable "+idMuestra);
            cargarZonasDeUnaBaseDeDatos();
         }
        
    }).fail(function(){});
    
 
}
/*Funcion que consulta los rangos asignados a una encuesta*/
function cargaRangosAdminMuestra(){
   
    var divUno=document.getElementById("divRangoUno");
    var divDos=document.getElementById("divRangoDos");
    var divTres=document.getElementById("divRangoTres");
    var divCuatro=document.getElementById("divRangoCuatro");
    divUno.innerHTML="";
    divDos.innerHTML="";
    divTres.innerHTML="";
    divCuatro.innerHTML="";
   
    var ran= new rangos("obtenerRangosEncuesta",this.value);
    var resp=ran.metodo();
    resp.success(function(respSer){
        var dtJson=eval(respSer);
        for(var i in dtJson){
             var rUno=dtJson[i].Uno.split(",");
            var rDos=dtJson[i].Dos.split(",");
            var rTres=dtJson[i].Tres.split(",");
            var rCuatro=dtJson[i].Cuatro.split(",");
            
             var lblUno=document.createElement("h4");
             var lblUnoR=document.createElement("h4");
             lblUnoR.setAttribute("id","lblRuno");
             var txtUno=document.createTextNode("De "+rUno[0]+" A "+rUno[1]);
             lblUno.appendChild(txtUno);
             var inputUno=document.createElement("input");
             inputUno.setAttribute("id","txbRangoUno");
             inputUno.setAttribute("placeholder","Ingrese la cantidad");
             inputUno.setAttribute("onchange","validarCantidades('txbRangoUno');");
             divUno.appendChild(lblUno);
             divUno.appendChild(inputUno);
             divUno.appendChild(lblUnoR);
             
             var lblDos=document.createElement("h4");
             var txtDos=document.createTextNode("De "+rDos[0]+" A "+rDos[1]);
             var lblRDos=document.createElement("h4");
             lblRDos.setAttribute("id","lblRdos");
             lblDos.appendChild(txtDos);
             var inputDos=document.createElement("input");
             inputDos.setAttribute("id","txbRangoDos");
             inputDos.setAttribute("placeholder","Ingrese la cantidad");
             inputDos.setAttribute("onchange","validarCantidades('txbRangoDos');"); 
             divDos.appendChild(lblDos);
             divDos.appendChild(inputDos);
             divDos.appendChild(lblRDos);
             
             var lblTres=document.createElement("h4");
             var txtTres=document.createTextNode("De "+rTres[0]+" A "+rTres[1]);
             var lblRtres=document.createElement("h4");
             lblRtres.setAttribute("id","lblRtres");
             
             lblTres.appendChild(txtTres);
             var inputTres=document.createElement("input");
             inputTres.setAttribute("id","txbRangoTres");
             inputTres.setAttribute("placeholder","Ingrese la cantidad");
             inputTres.setAttribute("onchange","validarCantidades('txbRangoTres');");
             divTres.appendChild(lblTres);
             divTres.appendChild(inputTres);
             divTres.appendChild(lblRtres);
             
             var lblCuatro=document.createElement("h4");
             var txtCuatro=document.createTextNode("De "+rCuatro[0]+" A "+rCuatro[1]);
             var lblRcuatro=document.createElement("h4");
             lblRcuatro.setAttribute("id","lblRcuatro");
             lblCuatro.appendChild(txtCuatro);             
             var inputCuatro=document.createElement("input");
             inputCuatro.setAttribute("id","txbRangoCuatro");
             inputCuatro.setAttribute("placeholder","Ingrese la cantidad");
             inputCuatro.setAttribute("onchange","validarCantidades('txbRangoCuatro');");
             divCuatro.appendChild(lblCuatro);
             divCuatro.appendChild(inputCuatro);
             divCuatro.appendChild(lblRcuatro);
        }
    }).fail(function(){});
}
/* Funcion para consultar los registros disponibles por concesionario en una base de datos */
function obtenerDetalleMuestra(){
   //alert(this.id);
    var selEnc=document.getElementById("selEncuestas");
    //var selMuestra=document.getElementById("selAsignarMuestra");
    var valoresRangos= new muestra("obtenerDetalleAsignadas",idEncuesta,this.value,idMuestra);
    var uno=0;
    var dos=0;
    var tres=0;
    var cuatro=0;
    var totalAsignado=0;
    var respuesta= valoresRangos.metodo();
    respuesta.success(function(respServ)
    {
        var dtJson=eval(respServ);
        console.log(dtJson);
        //var lbl=document.createElement("label");
        //var txt=document.createTextNode(dtJson[0]);
        //lbl.appendChild(txt);
        totalAsignado=dtJson[0]+dtJson[1]+dtJson[2]+dtJson[3];
        uno=dtJson[0];
         dos=dtJson[1];
         tres=dtJson[2];
         cuatro=dtJson[3];
         console.log(uno);
         console.log(dos);
         console.log(tres);
         console.log(cuatro);
        /*document.getElementById("lblRuno").innerHTML="";
        document.getElementById("lblRuno").innerHTML=" Disponibles "+dtJson[0];
        document.getElementById("rUno").value=dtJson[0];
        document.getElementById("lblRdos").innerHTML="";
        document.getElementById("lblRdos").innerHTML=" Disponibles "+dtJson[1];
        document.getElementById("rDos").value=dtJson[1];
        document.getElementById("lblRtres").innerHTML="";
        document.getElementById("lblRtres").innerHTML=" Disponibles "+dtJson[2];
        document.getElementById("rTres").value=dtJson[2];
        document.getElementById("lblRcuatro").innerHTML="";
        document.getElementById("lblRcuatro").innerHTML=" Disponibles "+dtJson[3];
        document.getElementById("rCuatro").setAttribute("value",dtJson[3]);
        document.getElementById("lblConce").innerHTML="";
        document.getElementById("lblConce").innerHTML=" Disponibles "+total;*/
        
         //alert(document.getElementById("rCuatro").value);
    })
    .fail(function(){});
   console.log("Encuesta=>"+idEncuesta);
   console.log("concesionario=>"+this.value);
   console.log("Muestra=>"+idMuestra);
    var valoresRangos= new muestra("obtenerCantidadMuestraConcesionario",idEncuesta,this.value,"",idMuestra);
    var respuesta= valoresRangos.metodo();
    respuesta.success(function(respServ){
        var dtJson=eval(respServ);
        console.log(dtJson);
        //var lbl=document.createElement("label");
        //var txt=document.createTextNode(dtJson[0]);
        //lbl.appendChild(txt);
        var total=dtJson[0]+dtJson[1]+dtJson[2]+dtJson[3];
        
        
        if(dtJson[0]<uno){
            var disponibleUno=uno-dtJson[0];
        }else{
            var disponibleUno=dtJson[0]-uno;
        }
        if(dtJson[1]<dos){
            var disponibleDos=dos-dtJson[1];
        }else{
            var disponibleDos=dtJson[1]-dos;
        }
        if(dtJson[2]<tres){
            var disponibleTres=tres-dtJson[2];
        }else{
            var disponibleTres=dtJson[2]-tres;
        }
        if(dtJson[3]<cuatro){
            var disponibleCuatro=cuatro-dtJson[3];
        }else{
            var disponibleCuatro=dtJson[3]-cuatro;
        }
        
        if(totalAsignado<total){
            var totalDisponible=total-totalAsignado;
        }else{
            var totalDisponible=totalAsignado-total;
        }
        
        console.log(disponibleUno);
         console.log(disponibleDos);
         console.log(disponibleTres);
         console.log(disponibleCuatro);
        if(disponibleUno==0){
            document.getElementById("txbRangoUno").value="0";
        }
        
        if(disponibleDos==0){
            document.getElementById("txbRangoDos").value="0";
        }
        
        if(disponibleTres==0){
            document.getElementById("txbRangoTres").value="0";
        }
        
        if(disponibleCuatro==0){
            document.getElementById("txbRangoCuatro").value="0";
        }
        
        document.getElementById("lblRuno").innerHTML="";
        document.getElementById("lblRuno").innerHTML=" Disponibles "+disponibleUno;
        document.getElementById("rUno").value=disponibleUno;
        document.getElementById("lblRdos").innerHTML="";
        document.getElementById("lblRdos").innerHTML=" Disponibles "+disponibleDos;
        document.getElementById("rDos").value=disponibleDos;
        document.getElementById("lblRtres").innerHTML="";
        document.getElementById("lblRtres").innerHTML=" Disponibles "+disponibleTres;
        document.getElementById("rTres").value=disponibleTres;
        document.getElementById("lblRcuatro").innerHTML="";
        document.getElementById("lblRcuatro").innerHTML=" Disponibles "+disponibleCuatro;
        document.getElementById("rCuatro").setAttribute("value",disponibleCuatro);
        document.getElementById("lblConce").innerHTML="";
        document.getElementById("lblConce").innerHTML=" Disponibles "+totalDisponible;
        
         //alert(document.getElementById("rCuatro").value);
    }).fail(function(){});
}
/*Funcion para consultar los concesionarios de acuerdo a una zona especifica*/
function cargarConcesionarioZona(){
  
    switch(this.id){
        case "selBuscarZona":
            var conce= new concesionario("ConcesionariosPorZona","","",this.value);
            var respCon=conce.metodo();
            respCon.success(function(respServidor){
                if(respServidor!="No hay coincidencias"){
                    var dtJson=eval(respServidor);
                    var sel=document.getElementById("selBuscarConc");
                    sel.innerHTML="";
                   //this.innerHTML="";
                   crearSelectConcesionario(sel,dtJson);
                   
                }else{
                    //alert(respServidor);
                }
            }).fail(function(){});
            break;
            
            default:
                 var cns=new zona("TodosLosConcesionarios","");
                var respCns=cns.metodo();
                respCns.success(function(respServidor){
                    var sel=document.getElementById("selBuscarConc");
                    var dtJson=eval(respServidor);
                    crearSelectConcesionario(sel,dtJson);
                }).fail(function(){});
                break;
    }
}
/*Funcion para consultar las zonas */
function cargarZona(){
   
        var Zn=new zona("TodasLasZonas","");
        var respZn=Zn.metodo();
        respZn.success(function(respServidor){
            var sel=document.getElementById("selZona");
            sel.innerHTML="";
            var dtJson=eval(respServidor);
            crearSelectZonasDos(sel,dtJson);
            var sel=document.getElementById("selBuscarZona");
            sel.innerHTML="";
            var dtJson=eval(respServidor);
            crearSelectZonasDos(sel,dtJson);
            var sel=document.getElementById("selBuscarZonaDos");
            sel.innerHTML="";
            var dtJson=eval(respServidor);
            crearSelectZonasDos(sel,dtJson);
        }).fail(function(){});
}
/*Funcion para registrar una zona*/
function crearZona(){
    var selZona= document.getElementById("txbZona");
    var selDirZona= document.getElementById("txbDirectorZona");
    if(selZona.value != ""){
        var zn= new zona("regZona",selZona.value,selDirZona.value);
        var resZn=zn.metodo();
        resZn.success(function(resServidor){
         alert(resServidor);   
          selZona.value="";
          selDirZona.value="";
            
         cargarZona();
         ZonaBuscar();
        }).fail(function(){});
    }else{
        alert("por favor ingrese un nombre para la zona");
    }
}
/*Funcion para crear un concesionario*/
function crearConcesionario(){
    var selConc=document.getElementById("txbConcesionario");
     var selDir=document.getElementById("txbDirector");
     var selZona=document.getElementById("selZona");
    if(selConc.value!="" && selZona.value!="0"){
        var con=new concesionario("regConcesionario",selConc.value,selDir.value,selZona.value);
        var resCon=con.metodo();
        resCon.success(function(resSer){
            alert(resSer);
            selConc.value="";
            selDir.value="";
            selZona.value="";
            cargarConcesionarioZona();
        }).fail(function(){});
    }else{
         alert("por favor ingrese un nombre para la zona");
    }
}
/*Funcion para buscar un concesionario*/
function buscarConcesionario(){
//     document.getElementById("editar").style.display='none';
     document.getElementById("divConcesionarios").style.display='block';
     
   switch(this.id){
       case "selBuscarZonaDos":
           
           var Zn=new zona("consultarZona",this.value);
            var respZn=Zn.metodo();
            respZn.success(function(respServidor){
                //var sel=document.getElementById("selZona");
                var dtJson=eval(respServidor);
                crearTablaZonas(dtJson,"divZonas");
            }).fail(function(){});
        break;
       case "selBuscarZona":
           if(this.value=="T"){
               var Zn=new zona("TodasLasZonas","");
            var respZn=Zn.metodo();
            respZn.success(function(respServidor){
                //var sel=document.getElementById("selZona");
                var dtJson=eval(respServidor);
                crearTablaZonas(dtJson,"divConcesionarios");
            }).fail(function(){});
           }else{
               var conce= new concesionario("ConcesionariosPorZona","","",this.value);
                var respCon=conce.metodo();
                respCon.success(function(respServidor){
                    if(respServidor!="No hay coincidencias"){
                        var dtJson=eval(respServidor);
                       crearTablaConcesionario(dtJson); 
                    }else{
                        alert(respServidor);
                    }
                }).fail(function(){});
           }
           break;
       case "selBuscarConc":
             var conce= new concesionario("UnConcesionarios",this.value,"",this.value);
            var respCon=conce.metodo();
            respCon.success(function(respServidor){
                if(respServidor!="No hay coincidencias"){
                    var dtJson=eval(respServidor);
                   crearTablaConcesionario(dtJson); 
                }else{
                    alert(respServidor);
                }
            }).fail(function(){});
       break;
   }
}
/*Funcion para registrar un usuario*/
function crearUsuario(){
    var ultActividad= horaCliente();
    //console.log(ultActividad);
     var clave=document.getElementById("txbclave");
    // var claveDos=document.getElementById("txbConfirmarClave");
    if(document.getElementById("txbNombres").value !="" && document.getElementById("txbCedula").value!="" && document.getElementById("txbRespuesta").value!="" &&  document.getElementById("selPregunta").value != "0" && document.getElementById("selRol").value != "0"){
        var user = new usuario("crearUsuario",
                          document.getElementById("txbNombres").value,
                          document.getElementById("txbApellidos").value,
                          document.getElementById("txbCedula").value,
                          document.getElementById("txbEmail").value,
                          clave.value,
                          document.getElementById("selPregunta").value,       
                          document.getElementById("txbRespuesta").value,
                          ultActividad,
                          document.getElementById("selRol").value
                         );
                 
     var respUser=user.crear();
     
    respUser.success(function(respServidor){
        limpiarFormPreguntasRegistrUsuario();
        alert(respServidor);
         
     }).fail(function(){
         alert("Error al crear usuario");
     });
    }else{
        alert("Claves no coinciden");
        clave.value="";
        claveDos.value="";
    }
}
/*Funcion para validar valores de la clave*/
function validarValoresClave(){
    var txbclave=document.getElementById("txbclave");
    if(this.value!=txbclave.value){
        alert("Contraseñas no coinciden");
        txbclave.value="";
        this.value="";  
    }
}
/*Funcion para obtener las bases de datos disponibles */
function cargarMuestras(){
     var mues=new muestra("obtenerMuestrasSinEncuesta");
     
     var respuesta=mues.metodo();
     respuesta.success(function(respuestaServidor){
         if(respuestaServidor!=false){
             var dtJson=eval(respuestaServidor);
             var sel=document.getElementById("selListasMuestras");
        //     sel.innerHTML="";
          //   crearSelectMuestra(sel,dtJson);
            // crearlistaMuestras(dtJson);
            var selMuestras=document.getElementById("selMuestras");
            selMuestras.innerHTML="";
           
            crearSelectMuestraDos(selMuestras,dtJson);
         }else{
              var divListaMuestras=document.getElementById("listaMuestras");
              divListaMuestras.innerHTML="No hay bases de datos para asignar";
         }
     }).fail(function(){});
     
 }
 /*Funcion que */
function consultarFormularios(id){  
   // alert("hola");
    var sel=document.getElementById(id);
    console.log(id);
    console.log(sel);
    var enc= new encuesta("consultarFormularios","","");
    
    var resPen=enc.metodo();
    
    resPen.success(function(respSer){
        
     
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
/*Funcion que dibuja las bases de datos */
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
 /*Funcion que dibuja las bases de datos */

 /*Funcion que redrecciona a la pagina para consultar una base de datos*/
 function consultarMuestra(id){
     location.href="/consultarMuestra.html?idM="+id;
 }
 /*Funcion que asocia una base de datos a una encuesta*/
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
                 alert("Base de datos asociada exitosamente");
                 //location.reload(true);
                 cargarMuestras();
             }else{
                 alert("Ha ocurrido un error por favor comuniquese con su administrador");
             }
         }).fail(function(){});
     }
 }
 /*Funcion para subir un archivo CSV*/
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
            
             
            if(esCsv(extension) ){
                    
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
                                         document.getElementById("divNoRegistrados").style.display='none';
                                         resp.innerHTML="";
                                         alert("Se han creado "+datosJSON.numeroDeRegistros+" registros ");
                                         document.getElementById("txbNombreMuestra").value="";
                                         file.replaceWith( file = file.val('').clone(true));
                                     }
                                 }  else{
                                     alert(datosJSON.mensaje);
                                        var noRegistrados=new Array();
                                         for(var i in datosJSON.registrosNoRegistrados){
                                             console.log(datosJSON.registrosNoRegistrados[i]);
                                             noRegistrados.push(datosJSON.registrosNoRegistrados[i]);
                                         }
                                            dibujarTablaNoregistrados(noRegistrados,"divNoRegistrados");
                                            document.getElementById("divNoRegistrados").style.display='block';
                                            document.getElementById("txbNombreMuestra").value="";
                                            file.replaceWith( file = file.val('').clone(true));                                     
                                 }                               
                    }).fail(function(){
                         resp.innerHTML="Ha ocurrido un error ";
                         alert("Ha ocurrido un error");
                     });




            }
            else{
                
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
/*Funcion para consultar todos los roles de la aplicacion*/
function cargarRol(){
 var rl= new rol_app("getAllRoles","","");
 var resp=rl.metodo();
 resp.success(function(respServidor){
     var dtJson=eval(respServidor);
     var sel=document.getElementById("selRol");   
     crearSelectRol(sel,dtJson);
 }).fail(function(){});
}
/*Funcion para limpiar el formulario de registo del usuario*/
function limpiarFormPreguntasRegistrUsuario(){
    //alert("Limpiar");
    var form=document.getElementById("formRegistroUsuario");
    for(var i in form.elements ){
        console.log(form.elements[i].type);
        if(form.elements[i].type=="text" || form.elements[i].type=="email" || form.elements[i].type=="password"){
            form.elements[i].value="";
        }
    }
}
/*Funcion para consultar las xonas de una base de datos*/
function cargarZonasDeUnaBaseDeDatos(){
   // alert("Id Muetra en la funcion "+idMuestra); 
    var Zn=new zona("TodasLasZonasPorMuestra",idMuestra);
    var respZn=Zn.metodo();
    respZn.success(function(respServidor){

        var sel=document.getElementById("selZonaMuestra");
        sel.innerHTML="";
        var dtJson=eval(respServidor);
        crearSelectZonas(sel,dtJson);
    }).fail(function(){});
}

/*Funcion para eliminar una zona*/
function eliminarZona(id){
//    alert(id);
var zn=new zona("eliminarZona",id);
var res=zn.metodo();
res.success(function(resp){
    
  if(resp){
        alert("Zona eliminada con exito");
        location.reload(true); 
  }else{
        alert("Ha ocurrido un error por favor comuniquese con su administrador");
        location.reload(true); 
  }
}).fail(function(){});
}
/*Funcion para eliminar un concesionario*/
function eliminarConcesionario(id){
//    alert(id);
var cn=new concesionario("eliminarConcesionario",id);
var res=cn.metodo();
res.success(function(resp){
    
    if(resp){
        alert("Concesionario eliminada con exito");
       location.reload(true);
   }else{
       alert("Ha ocurrido un error por favor comuniquese con su administrador");
        location.reload(true); 
   }
    
}).fail(function(){});
}
/*Funcion para mostarr los daos de la zona a editar*/
function editarZona(id,nombre,director,tipo){
    /*alert(id);
    alert(nombre);
    alert(director);
    alert(tipo);*/
    tipoOperador=tipo;
    var div=document.getElementById("divZonas");
     document.getElementById("nombreZn").innerHTML="";
     document.getElementById("nombreZn").innerHTML=nombre;
    div.style.display='none';
    document.getElementById("editarZona").style.display='block';
    document.getElementById("hdIdEditar").value=id;
   // document.getElementById("txbNombre").value=nombre;   
   //document.getElementById("txbDirector").value=""+director+"";
}
/*Funcion para editar un concesionario o una zona*/
function editarConcesionario(id,nombre,director,tipo){
    /*alert(id);
    alert(nombre);
    alert(director);
    alert(tipo);*/
    tipoOperador=tipo;
    var div=document.getElementById("divConcesionarios");
    div.style.display='none';
    document.getElementById("editarConcesionario").style.display='block';
   document.getElementById("hdIdEditar").value=id;
   document.getElementById("nombre").innerHTML="";
   document.getElementById("nombre").innerHTML=nombre;
   document.getElementById("director").innerHTML="";
   document.getElementById("director").innerHTML=director;
   // document.getElementById("txbNombre").value=nombre;
   //document.getElementById("txbDirector").value=""+director+"";
}
function editar(){
    
    switch(tipoOperador){
        case "Concesionario":
            
           
            if(document.getElementById("txbNombreEditar").value!=""){
                var nuevoNombre=document.getElementById("txbNombreEditar").value;
            }else{
                var nuevoNombre=document.getElementById("director").innerHTML;
            }
            if(document.getElementById("txbDirectorEditar").value!=""){
              //  alert(document.getElementById("txbDirector").value);
                var nuevoDirector=document.getElementById("txbDirectorEditar").value;
            }else{
                var nuevoDirector=document.getElementById("director").innerHTML;
            }
           
           var con=new concesionario("editarConcesionario",nuevoNombre,nuevoDirector, document.getElementById("hdIdEditar").value);
            var respuesta=con.metodo();
            respuesta.success(function(res){
                if(res){
                    alert("concesionario editado con exito");
                    
                      document.getElementById("txbNombreEditar").value="";
                      document.getElementById("txbDirectorEditar").value="";
                      document.getElementById("hdIdEditar").value="";
                      location.reload(true);
                   
                }else{
                    alert("Ha ocurrido un error por favor intentelo nuevamnete");
                   
                     document.getElementById("txbNombreEditar").value="";
                      document.getElementById("txbDirectorEditar").value="";
                      document.getElementById("hdIdEditar").value="";
                       location.reload(true);
                }
            }).fail(function(){});
            break;
        case "Zona":
             
             if(document.getElementById("txbNombreEditarZn").value!=""){
                var nuevoNombre=document.getElementById("txbNombreEditarZn").value;
            }else{
                var nuevoNombre=document.getElementById("director").innerHTML;
            }
            
            if(document.getElementById("txbDirectorEditarZn").value!=""){
              //  alert(document.getElementById("txbDirector").value);
                var nuevoDirector=document.getElementById("txbDirectorEditarZn").value;
            }else{
                var nuevoDirector=document.getElementById("director").innerHTML;
            }
            
             var zn=new zona("editarZona", nuevoNombre,nuevoDirector, document.getElementById("hdIdEditarZn").value);
            var respuesta=zn.metodo();
            respuesta.success(function(res){
                if(res){
                    alert("Zona editada con exito");
                    
                     document.getElementById("txbNombreEditarZn").value="";
                      document.getElementById("txbDirectorEditarZn").value="";
                      document.getElementById("hdIdEditarZn").value="";
                      location.reload(true);
                }else{
                    alert("Ha ocurrido un error por favor intentelo nuevamnete");
                  
                     document.getElementById("txbNombreEditar").value="";
                      document.getElementById("txbDirectorEditar").value="";
                      document.getElementById("hdIdEditar").value="";
                        location.reload(true);
                }
            }).fail(function(){});
            break;
        default:
            alert("Ha ocurrido un error por favor intente nuevamente la operación");
            break;    
    }
}
/*
 * Funcion para registrar una pregunta en el servidor
 * @returns {undefined}
 */
function registrarPregunta(){
 var tipo=document.getElementById("selTipoPregunta");
 var argumento=document.getElementById("txbPregunta");
 
 var tok=false;
 switch(tipo.value){
     case "CerradaComentario":
         if(document.getElementById("txbPregunta").value != ""){
        
        var res=document.getElementsByName("respuestas");
        var comen=document.getElementsByName("comentario");
        var nivel=document.getElementsByName("nivel");
        
        var tamResp=document.getElementsByName("respuestas").length;
        //alert(tamResp);
        
            var btn=document.getElementsByName("btnAddPregunta");
            var tipo=btn[0].id.substring(14);
       //     alert(tipo);
           /* var arrRespuestas = new Array();                
            for(var i=0;i<tamResp;i++ ){
                if(res[i].value != "" ){
                    arrRespuestas[i]=res[i].value+";"+comen[i].value;
                    tok=true;
                } 
            }*/
            var respuestas={};
            var tam=0;
            for(var i=0;i<tamResp;i++ ){
                if(res[i].value != "" ){
                   // arrRespuestas[i]=res[i].value+";"+comen[i].value;
                    tok=true;
                    respuestas[i]={
                        respuesta:res[i].value,
                        comentario:comen[i].value,
                        nivelOptimo:nivel[i].value
                    };
                    tam++;
                } 
            }
       if(tam<=1){
            tok=false; 
            alert("Por favor ingrese al menos dos opción para la respuesta ");
           
        }    
     }
         else{
            tok=false;
            alert("Por favor ingrese una pregunta");
         
        }
        break;
    case "Abierta":
        var tipo="Abierta";
        var respuestas={};
        tok=true;
        break;
    case "AbiertaCategoria":
        if(document.getElementById("txbPregunta").value != ""){

                    var res=document.getElementsByName("respuestas");
                    var nivel=document.getElementsByName("nivel");
                    var tamResp=document.getElementsByName("respuestas").length;
                    //alert(tamResp);
                    
                        var btn=document.getElementsByName("btnAddPregunta");
                        var tipo="AbiertaCategoria";
                   //     alert(tipo);
                        /*var arrRespuestas = new Array();                
                        for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != ""){
                                arrRespuestas[i]=res[i].value;
                                tok=true;
                            } 
                        }*/
                        var respuestas={};
                        var tam=0;
                        for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != "" ){
                                //arrRespuestas[i]=res[i].value;
                                tok=true;
                                respuestas[i]={
                                    respuesta:res[i].value,
                                    nivelOptimo:nivel[i].value
                                };
                                tam++;
                            } 
                        }
                        
                     if(tam<=1){
                        tok=false; 
                        alert("Por favor ingrese al menos dos opción para la respuesta ");
                   

                     }    
                  }else{
                   tok=false;
                    alert("Por favor ingrese una pregunta");
                   
                 }
        break;
    case "Rankin":
                if(document.getElementById("txbPregunta").value != ""){

                    var res=document.getElementsByName("respuestas");
                    var nivel=document.getElementsByName("nivel");
                    var tamResp=document.getElementsByName("respuestas").length;
                    //alert(tamResp);
                    
                        var btn=document.getElementsByName("btnAddPregunta");
                        var tipo=btn[0].id.substring(14);
                   //     alert(tipo);
                        /*var arrRespuestas = new Array();                
                        for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != ""){
                                arrRespuestas[i]=res[i].value;
                                tok=true;
                            } 
                        }*/
                        var respuestas={};
                        var tam=0;
                        for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != "" ){
                                //arrRespuestas[i]=res[i].value;
                                tok=true;
                                respuestas[i]={
                                    respuesta:res[i].value,
                                    nivelOptimo:"0"
                                };
                                tam++;
                            } 
                        }
                    if(tam<=1){
                        tok=false; 
                        alert("Por favor ingrese al menos dos opción para la respuesta ");
                         
                     }    
                  }else{
                    tok=false;
                    alert("Por favor ingrese una pregunta");
                     

                 }
        break;
    case "Cerrada":
        if(document.getElementById("txbPregunta").value != ""){

                    var res=document.getElementsByName("respuestas");
                    var nivel=document.getElementsByName("nivel");
                   
                    var tamResp=document.getElementsByName("respuestas").length;
                    //alert(tamResp);
                    
                        var btn=document.getElementsByName("btnAddPregunta");
                        var tipo=btn[0].id.substring(14);
                   //     alert(tipo);
                        /*var arrRespuestas = new Array();                
                        for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != ""){
                                arrRespuestas[i]=res[i].value;
                                tok=true;
                            } 
                        }*/
                        //console.log(res);        
                        var respuestas={};
                         var tam=0;
                         var a=0;
                        for(var r in res){
                            if(res[r].id!=undefined){
                                tok=true;
                                tam++;
                                //console.log(res[r].id.split("_"));   
                                var subres=document.getElementsByName("subRes_"+r);
                                console.log(subres);
                                if(subres.length>0){
                                    for(var sr in subres){
                                        if(subres[sr].value){
                                           console.log(subres[sr].value);   
                                           respuestas[a]={
                                               respuesta:res[r].value,
                                               comentario:subres[sr].value,
                                               nivelOptimo:nivel[r].value
                                           };
                                           a++;
                                        }
                                 
                                    }
                                }else{
                                    respuestas[a]={
                                               respuesta:res[r].value,
                                               comentario:"",
                                               nivelOptimo:nivel[r].value
                                           };
                                           a++;
                                }
                                
                                 
                                 
                            }
                            
                        }
                        console.log(respuestas);        
                        
                       
                        /*for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != "" ){
                                //arrRespuestas[i]=res[i].value;
                                tok=true;
                                
                                respuestas[i]={
                                    respuesta:res[i].value,
                                    comentario:subres[i].value,
                                    nivelOptimo:nivel[i].value
                                };
                                tam++;
                            } 
                        }*/
                    if(tam<=1){
                        tok=false; 
                        alert("Por favor ingrese al menos dos opción para la respuesta ");
                         
                     }    
                  }
                else{
                    tok=false;
                    alert("Por favor ingrese una pregunta");
                     

                 }
        break;
    case "GrupoPreguntas":
        if(document.getElementById("txbPregunta").value != ""){

                    var res=document.getElementsByName("respuestas");
                    var nivel=document.getElementsByName("nivel");
                   
                    var tamResp=document.getElementsByName("respuestas").length;
                    //alert(tamResp);
                    
                        var btn=document.getElementsByName("btnAddPregunta");
                        var tipo=btn[0].id.substring(14);
                   //     alert(tipo);
                        /*var arrRespuestas = new Array();                
                        for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != ""){
                                arrRespuestas[i]=res[i].value;
                                tok=true;
                            } 
                        }*/
                        //console.log(res);        
                        var respuestas={};
                         var tam=0;
                         var a=0;
                        for(var r in res){
                            if(res[r].id!=undefined){
                                tok=true;
                                tam++;
                                //console.log(res[r].id.split("_"));   
                                var subres=document.getElementsByName("subRes_"+r);
                                console.log(subres);
                                if(subres.length>0){
                                    for(var sr in subres){
                                        if(subres[sr].value){
                                           console.log(subres[sr].value);   
                                           respuestas[a]={
                                               respuesta:res[r].value,
                                               comentario:subres[sr].value,
                                               nivelOptimo:nivel[r].value
                                           };
                                           a++;
                                        }
                                 
                                    }
                                }else{
                                    respuestas[a]={
                                               respuesta:res[r].value,
                                               comentario:"",
                                               nivelOptimo:nivel[r].value
                                           };
                                           a++;
                                }
                                
                                 
                                 
                            }
                            
                        }
                        console.log(respuestas);        
                        
                       
                        /*for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != "" ){
                                //arrRespuestas[i]=res[i].value;
                                tok=true;
                                
                                respuestas[i]={
                                    respuesta:res[i].value,
                                    comentario:subres[i].value,
                                    nivelOptimo:nivel[i].value
                                };
                                tam++;
                            } 
                        }*/
                    if(tam<=1){
                        tok=false; 
                        alert("Por favor ingrese al menos dos opción para la respuesta ");
                         
                     }    
                  }
                else{
                    tok=false;
                    alert("Por favor ingrese una pregunta");
                     

                 }
        break;
    default:
                if(document.getElementById("txbPregunta").value != ""){

                    var res=document.getElementsByName("respuestas");
                    var nivel=document.getElementsByName("nivel");
                    var tamResp=document.getElementsByName("respuestas").length;
                    //alert(tamResp);
                    
                        var btn=document.getElementsByName("btnAddPregunta");
                        var tipo=btn[0].id.substring(14);
                   //     alert(tipo);
                        /*var arrRespuestas = new Array();                
                        for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != ""){
                                arrRespuestas[i]=res[i].value;
                                tok=true;
                            } 
                        }*/
                        var respuestas={};
                        var tam=0;
                        for(var i=0;i<tamResp;i++ ){
                            if(res[i].value != "" ){
                                //arrRespuestas[i]=res[i].value;
                                tok=true;
                                respuestas[i]={
                                    respuesta:res[i].value,
                                    nivelOptimo:nivel[i].value
                                };
                                tam++;
                            } 
                        }
                    if(tam<=1){
                        tok=false; 
                        alert("Por favor ingrese al menos dos opción para la respuesta ");
                         
                     }    
                  }
                else{
                    tok=false;
                    alert("Por favor ingrese una pregunta");
                     

                 }
        break;
         
 }
 
 if(tok==true){
        //alert(tipo);
        var preg=new pregunta("registarPregunta",tipo,document.getElementById("txbPregunta").value,respuestas);
        var resp=preg.metodo();
        resp.success(function(respJs){
            alert(respJs);
            limpiarFormPreguntas();
            document.getElementById("selTipoPregunta").value="Abierta";
        });
    }
    
 
    
}
/*
 * Funcion que limpia el formulario 
 * @returns {undefined}
 */
function limpiarFormPreguntas(){
    //alert("Qu ieres limpiar el formulario");
   var div=document.getElementById("dvOpcionesRespuesta");
   var tam=document.getElementsByName("btnAddPregunta").length;
   var tamResp=document.getElementsByName("respuestas").length;
   var liPadre=document.getElementById("liBtnAgregarRespuesta");
    //console.log(tam);
    if(tam>0){
        var el=document.getElementsByName("btnAddPregunta");
           //console.log(el[0].id);
           liPadre.removeChild(el[0]);
           liPadre.removeEventListener("click",CrearPregunta);
           
     }
     if(tamResp>0){
         div.innerHTML="";
         /*
         var respuestas=document.getElementsByName("respuestas");
         var comentarios=document.getElementsByName("comentario");
         var nivel=document.getElementsByName("nivel");
         var subRes;
         for(var i=0;i<tamResp;i++){
             //console.log(respuestas[0]);
             
             
             if(respuestas[0]!=undefined){
                  div.removeChild(respuestas[0]);
             }
             if(comentarios[0]!=undefined){
                 div.removeChild(comentarios[0]);
             }
             if(nivel[0]!=undefined){
                 div.removeChild(nivel[0]);
             }
             
         } */        
     }
   document.getElementById("txbPregunta").value="";
}
/*
 *Funcion que crea los input para las respuestas 
 */
function  CrearPregunta(){
    var div=document.getElementById("dvOpcionesRespuesta");
    var btn=document.getElementsByName("btnAddPregunta");
    
  //console.debug(btn);
     switch(btn[0].id){
         case "btnAddPreguntaAbierta":
             var elementoRes=document.createElement("input");
             elementoRes.setAttribute("type","text");
             elementoRes.setAttribute("name","respuestas");
             var tamRes=document.getElementsByName("respuestas").length;
             
             elementoRes.setAttribute("id","resp_"+tamRes);
             //elementoRes.focus();             
             var num=tamRes;
             num++;
             elementoRes.setAttribute("placeholder","opción  "+num+" ej. Si");
             //elemntoRes.focus();
             div.appendChild(elementoRes);
             
             
             var elementoRes2=document.createElement("input");
             elementoRes2.setAttribute("type","text");
             elementoRes2.setAttribute("name","nivel");
             var tamRes=document.getElementsByName("nivel").length;
             
             elementoRes2.setAttribute("id","niv_"+tamRes);
             //elementoRes.focus();             
             var num=tamRes;
             num++;
             elementoRes2.setAttribute("placeholder","nivel optimo "+num+" ej. 85%");
             
             div.appendChild(elementoRes2);
              
             
             break;
         case "btnAddPreguntaCerrada":
             var tamRes=document.getElementsByName("respuestas").length;
             var n=new Number(tamRes);
             var num=tamRes;  
             if(document.getElementById('txtNumSubRes_'+(n-1))!=undefined){
                 document.getElementById('txtNumSubRes_'+(n-1)).style.display='none';
                 document.getElementById('btnNumSubRes_'+(n-1)).style.display='none';
             }
             console.log(document.getElementById('txtNumSubRes_'+(n-1)));
             console.log(n);
             console.log(n-1);
             var elementoRes=document.createElement("input");
             elementoRes.setAttribute("type","text");
             elementoRes.setAttribute("name","respuestas");
             elementoRes.setAttribute("id","resp_"+tamRes);
             elementoRes.setAttribute("placeholder","opción  "+num+" ej. Si");
             div.appendChild(elementoRes);
             //elemntoRes.focus();
             
             var elementoRes2=document.createElement("input");
             elementoRes2.setAttribute("type","text");
             elementoRes2.setAttribute("name","nivel");
             var tamRes=document.getElementsByName("nivel").length;
             
             elementoRes2.setAttribute("id","niv_"+tamRes);
             //elementoRes.focus();             
             
             num++;
             elementoRes2.setAttribute("placeholder","nivel optimo "+num+" ej. 85%");
             div.appendChild(elementoRes2);
             
             var elementoRes3=document.createElement("input");
             elementoRes3.setAttribute("type","text");
             elementoRes3.setAttribute("value","numero de respuestas");
             elementoRes3.setAttribute("id","txtNumSubRes_"+tamRes);
             div.appendChild(elementoRes3);
             
             var elementoRes4=document.createElement("input");
             elementoRes4.setAttribute("type","button");
             elementoRes4.setAttribute("value","agregar");
             elementoRes4.setAttribute("id","btnNumSubRes_"+tamRes);
             elementoRes4.setAttribute("onclick","agregarSubRespuestas('"+tamRes+"')");
             div.appendChild(elementoRes4);
             
             
              
             
             break;
         case "btnAddPreguntaCerradaMultiple":
             elementoRes=document.createElement("input");
             elementoRes.setAttribute("type","text");
             elementoRes.setAttribute("name","respuestas");
             var tamRes=document.getElementsByName("respuestas").length;
             elementoRes.setAttribute("id","resp_"+tamRes);
             var num=tamRes;
             num++;
             elementoRes.setAttribute("placeholder","opción "+num+" ej. Si ");
             div.appendChild(elementoRes);
             
             var elementoRes2=document.createElement("input");
             elementoRes2.setAttribute("type","text");
             elementoRes2.setAttribute("name","nivel");
             var tamRes=document.getElementsByName("nivel").length;
             
             elementoRes2.setAttribute("id","niv_"+tamRes);
             //elementoRes.focus();             
             var num=tamRes;
             num++;
             elementoRes2.setAttribute("placeholder","nivel optimo "+num+" ej. 85%");
             
             div.appendChild(elementoRes2);
              
             break;
         case "btnAddPreguntaCerradaComentario":
             
             var elementoRes=document.createElement("input");
             var elementoComentario=document.createElement("input");
             
             
              elementoRes.setAttribute("type","text");
              elementoRes.setAttribute("name","respuestas");
             
              var tamRes=document.getElementsByName("respuestas").length;
              elementoRes.setAttribute("id","resp_"+tamRes);
              var num=tamRes;
              num++;
              elementoRes.setAttribute("placeholder","opción "+num+" ej. Si");
              
              elementoComentario.setAttribute("type","text");
              elementoComentario.setAttribute("name","comentario");
             
              var tamRes=document.getElementsByName("comentario").length;
              elementoComentario.setAttribute("id","com_"+tamRes);
              elementoComentario.setAttribute("placeholder","Comentario "+num+" ej. Por que?");
                
             
            div.appendChild(elementoRes);
            div.appendChild(elementoComentario);
            var elementoRes2=document.createElement("input");
             elementoRes2.setAttribute("type","text");
             elementoRes2.setAttribute("name","nivel");
             var tamRes=document.getElementsByName("nivel").length;
             
             elementoRes2.setAttribute("id","niv_"+tamRes);
             //elementoRes.focus();             
             var num=tamRes;
             num++;
             elementoRes2.setAttribute("placeholder","nivel optimo "+num+" ej. 85%");
             
             div.appendChild(elementoRes2);
              
             
                 //var tok=false;
             break;
             
         case "btnAddComentario":
             var elementoRes=document.createElement("input");
              elementoRes.setAttribute("type","text");
              elementoRes.setAttribute("name","respuestas");
             
             var tamRes=document.getElementsByName("respuestas").length;
              elementoRes.setAttribute("id","resp_"+tamRes);
              var num=tamRes;
              num++;
              elementoRes.setAttribute("placeholder","comentario "+num+" ej. Por que?");
             
             
              div.appendChild(elementoRes);
              
              
              
              var elementoRes2=document.createElement("input");
             elementoRes2.setAttribute("type","text");
             elementoRes2.setAttribute("name","nivel");
             var tamRes=document.getElementsByName("nivel").length;
             
             elementoRes2.setAttribute("id","niv_"+tamRes);
             //elementoRes.focus();             
             var num=tamRes;
             num++;
             elementoRes.setAttribute("placeholder","nivel optimo "+num+" ej. 85%");
             
             div.appendChild(elementoRes2);
             
            
            
            
             break;
         case "btnAddPreguntaRankin":
             var elementoRes=document.createElement("input");
             elementoRes.setAttribute("type","text");
             elementoRes.setAttribute("name","respuestas");
             var tamRes=document.getElementsByName("respuestas").length;
             
             elementoRes.setAttribute("id","resp_"+tamRes);
             //elementoRes.focus();             
             var num=tamRes;
             num++;
             elementoRes.setAttribute("placeholder","opción  "+num+" ej. Si");
             div.appendChild(elementoRes);
             //elemntoRes.focus();
             
             /*var elementoRes2=document.createElement("input");
             elementoRes2.setAttribute("type","text");
             elementoRes2.setAttribute("name","nivel");
             var tamRes=document.getElementsByName("nivel").length;
             
             elementoRes2.setAttribute("id","niv_"+tamRes);
             //elementoRes.focus();             
             var num=tamRes;
             num++;
             elementoRes2.setAttribute("placeholder","nivel optimo "+num+" ej. 85%");
             
             div.appendChild(elementoRes2);*/
              
             
            break;
        case "btnAddPreguntaGrupoPreguntas":
            var tamRes=document.getElementsByName("respuestas").length;
             var n=new Number(tamRes);
             var num=tamRes;  
             if(document.getElementById('txtNumSubRes_'+(n-1))!=undefined){
                 document.getElementById('txtNumSubRes_'+(n-1)).style.display='none';
                 document.getElementById('btnNumSubRes_'+(n-1)).style.display='none';
             }
             console.log(document.getElementById('txtNumSubRes_'+(n-1)));
             console.log(n);
             console.log(n-1);
             var elementoRes=document.createElement("input");
             elementoRes.setAttribute("type","text");
             elementoRes.setAttribute("name","respuestas");
             elementoRes.setAttribute("id","resp_"+tamRes);
             elementoRes.setAttribute("placeholder","opción  "+num+" ej. Si");
             div.appendChild(elementoRes);
             //elemntoRes.focus();
             
             var elementoRes2=document.createElement("input");
             elementoRes2.setAttribute("type","text");
             elementoRes2.setAttribute("name","nivel");
             var tamRes=document.getElementsByName("nivel").length;
             
             elementoRes2.setAttribute("id","niv_"+tamRes);
             //elementoRes.focus();             
             
             num++;
             elementoRes2.setAttribute("placeholder","nivel optimo "+num+" ej. 85%");
             div.appendChild(elementoRes2);
             
             var elementoRes3=document.createElement("input");
             elementoRes3.setAttribute("type","text");
             elementoRes3.setAttribute("value","numero de respuestas");
             elementoRes3.setAttribute("id","txtNumSubRes_"+tamRes);
             div.appendChild(elementoRes3);
             
             var elementoRes4=document.createElement("input");
             elementoRes4.setAttribute("type","button");
             elementoRes4.setAttribute("value","agregar");
             elementoRes4.setAttribute("id","btnNumSubRes_"+tamRes);
             elementoRes4.setAttribute("onclick","agregarSubRespuestas('"+tamRes+"')");
             div.appendChild(elementoRes4);
            break;
      
     }
  }
/*Funcion para agregar otras respuestas a unna respuesta de una pregunta cerrada*/  
function agregarSubRespuestas(num){
    var div=document.getElementById("dvOpcionesRespuesta");
     var numRes=document.getElementById("txtNumSubRes_"+num);
    for(var i = 1;i<=numRes.value;i++){
       
        var elementoRes=document.createElement("input");
        //  elementoRes.setAttribute("id","subRes_"+num+"_"+i);
        elementoRes.setAttribute("type","text");
        elementoRes.setAttribute("name","subRes_"+num);
        elementoRes.setAttribute("placeholder","ingresa tu opcion aqui");
        div.appendChild(elementoRes);
    }
    
}  
/*
 *Funcion que agrega el boton para aagregar respuestas 
 */
function selecTipoPregunta(){
    //alert(this.value);
   var div=document.getElementById("dvOpcionesRespuesta");
   var tam=document.getElementsByName("btnAddPregunta").length;
    var tamResp=document.getElementsByName("respuestas").length;
    var liPadre=document.getElementById("liBtnAgregarRespuesta");
    console.log(tam);
    if(tam>0){
        var el=document.getElementsByName("btnAddPregunta");
          console.log(el[0].id);
             liPadre.removeChild(el[0]);
             liPadre.removeEventListener("click",CrearPregunta);
             if(tamResp>0){
                 var respuestas=document.getElementsByName("respuestas");
                 var comentario=document.getElementsByName("comentario");
                 var nivel=document.getElementsByName("nivel");
                  for(var i=0;i<tamResp;i++){
                    console.log(respuestas[0]);
                    if(respuestas[0]!=undefined){
                        div.removeChild(respuestas[0]);
                    }
                    console.log(comentario[0]);
                    if(comentario[0]!=undefined){
                        div.removeChild(comentario[0]);
                    }
                    console.log(nivel[0]);
                    if(nivel[0]!=undefined){
                        div.removeChild(nivel[0]);
                    }
                  }    
             }
     }
     
    switch(document.getElementById("selTipoPregunta").value){
        case "AbiertaCategoria":
            var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaAbierta");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            liPadre.appendChild(addInput);
            break;
        case "Cerrada":
            var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaCerrada");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            liPadre.appendChild(addInput);
            break;
        case "CerradaMultiple":
            
            var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaCerradaMultiple");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            liPadre.appendChild(addInput);
            
            break;
        case "CerradaComentario":
            
            var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaCerradaComentario");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            
           /* var H=document.createElement("label");
            var txt=document.createTextNode("Para agregar un comentario agrege ';"+"' despues de la respuesta ejemplo: No;porque?" );
            H.appendChild(txt);
            /*var addInputCom=document.createElement("input");
            addInputCom.setAttribute("type","button");
            addInputCom.setAttribute("id","btnAddComentario");
            addInputCom.setAttribute("name","btnAddPregunta");
            addInputCom.setAttribute("value","agregar comentario");
            addInputCom.addEventListener("click",CrearPregunta);
            */
           /*div.appendChild(H);*/
           liPadre.appendChild(addInput);
            break;
            
        case "Rankin":
            var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaRankin");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            liPadre.appendChild(addInput);
            break;
        case "GrupoPreguntas":
             var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaGrupoPreguntas");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            liPadre.appendChild(addInput);
            break;
            
    }
    //var el=document.getElementsByName("btnAddPregunta");
   //console.log(el[0].id);
    
}
/*Funcion para consultar todos los usuarios con rol de agente*/
function cargarUsuarios(){
    var user= new usuario("consultarAsesor","","","","","","","","");
    var resUser=user.crear();
    resUser.success(function(respUserServer){
        var dtJson=eval(respUserServer);
       /* var sel=document.getElementById("selUsuario");
        sel.innerHTML="";
        crearSelectUsuario(sel,dtJson);*/
        
        var sel=document.getElementById("selUsuarioMuestra");
        sel.innerHTML="";
        crearSelectUsuario(sel,dtJson);
        
        
    }).fail(function(){});
}
/*Funcion que consulta las encuestas que tienen una base de datos asignada*/
function cargarEncuestasListasProceso(){
    
    var enc= new encuesta("obtenerEncuestaListasProceso","","");
    var resPen=enc.metodo();
    //var sel=document.getElementById("selEncuestas");
    
    var sel=document.getElementById("selAsignarMuestraEncuesta");
    console.log(sel.innerHTML);
    sel.innerHTML="";
    console.log(sel.innerHTML);
    resPen.success(function(respSer){
        
        if(respSer!="No hay coincidencias"){
            var dtJs=eval(respSer);
           console.log(dtJs);
            crearSelectEncuestas(sel,dtJs);
      
        }else{
            alert("No hay encuestas pendientes para asignar");
        }
    }).fail(function(){});
}
/*Funcion para validar que la cantidad ingresada para encuetas por concesionario no supere la cantidad de registros en la base de datos*/
function validarCantidades(id){

var txt=document.getElementById(id);
console.log(txt.value);
    switch(id){
        case "txbRangoUno":              
            var lblUno=document.getElementById("rUno");      
            var compararUno=Number(lblUno.value);
            var raUno=Number(txt.value);
            if(raUno>compararUno ){
                alert("Esta intentando asignar un numero mayor de registros disponibles en la base de datos ");
                txt.value="";
            }
            console.log(compararUno);
            console.log(raUno);
            
            break;
        case "txbRangoDos":
            var lblDos=document.getElementById("rDos");      
            var compararDos=Number(lblDos.value);
            var raDos=Number(txt.value);
            if(raDos>compararDos ){
                alert("Esta intentando asignar un numero mayor de registros disponibles en la base de datos ");
                txt.value="";
            }
            console.log(compararDos);//0
            console.log(raDos);//1
            break;
        case "txbRangoTres":
            var lblTres=document.getElementById("rTres");      
            var compararTres=Number(lblTres.value);
            var raTres=Number(txt.value);
            if(raTres>compararTres ){
                alert("Esta intentando asignar un numero mayor de registros disponibles en la base de datos ");
                txt.value="";
            }
            console.log(txt.id);
            console.log(compararTres);
            console.log(raTres);
            break;
        case "txbRangoCuatro":
            var lblCuatro=document.getElementById("rCuatro");     
            var compararCuatro=Number(lblCuatro.value);
            var raCuatro=Number(txt.value);
            if(raCuatro>compararCuatro){
                
                alert("Esta intentando asignar un numero mayor de registros disponibles en la base de datos ");
                txt.value="";
            }
            console.log(txt.id);
            console.log(compararCuatro);
            console.log(raCuatro);
            break;
    }
          
          
          
          
          //var muestraAsigNum=Number(hdAsig.value);
          //var muestraNum=Number(hdMues.value);
           
         
         
         
         
         
         
         
         
          
}
/*Funcion para lipiar el formulario de la asignacion de encuestas*/
function limpiarFormPreguntasMuestra(){
    //alert("hola");
    var form=document.getElementById("formAsocMuestraEncuesta");
    
    for(i in form.elements){
        //console.log(form.elements[i].type);
        if(form.elements[i].type == "text" ){
            //console.log(form.elements[i].value);
             form.elements[i].value="";
        }
        
    }
}