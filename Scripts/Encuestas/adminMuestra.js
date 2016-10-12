    var idEncuesta=0;
    var idMuestra=0;
    
function iniciarAdminMuestra(){
//    cargarZonas();
    cargarUsuarios();   
//    cargarEncuestasSinCantidadMuestra();
//    cargarRangos();
    cargarEncuestasListasProceso();
    //cargarEncuestasSinRango();  
    document.getElementById("selZonaMuestra").addEventListener("change",obtenerDetalleMuestraZona,false);
    document.getElementById("selZonaMuestra").addEventListener("change",cargarConcesionario,false);
    document.getElementById("selZonaMuestra").addEventListener("change",limpiarNumeroRegistros,false);
    
    
    
    //document.getElementById("btncrearCantidadMuestra").addEventListener("click",cambiarCantidadMuestra,false);
    document.getElementById("btnAsociar").addEventListener("click",crearDetalleMuestra,false);
    document.getElementById("btnAsociar").addEventListener("click",consultarCantidadMuestra,false);
    
    document.getElementById("selAsignarMuestraEncuesta").addEventListener("change",cargarMuestra,false);
    document.getElementById("selAsignarMuestraEncuesta").addEventListener("change",consultarCantidadMuestra,false);
    document.getElementById("selAsignarMuestraEncuesta").addEventListener("change",cargaRangosAdminMuestra,false);
    //document.getElementById("selEncuestas").addEventListener("change",agregarChange,false);
    
    //document.getElementById("selAsignarMuestraEncuesta").addEventListener("change",cargarZonas,false);
//    document.getElementById("selAsignarMuestra").addEventListener("change",obtenerMuestra,false);
    document.getElementById("selConcesionarioMuestra").addEventListener("change",obtenerDetalleMuestra,false);
    //document.getElementById("selConcesionarioMuestra").addEventListener("change",cargarUsuarios,false);
    
    /*
    document.getElementById("txbRangoUno").addEventListener("change",validarCantidades,false);
    document.getElementById("txbRangoDos").addEventListener("change",validarCantidades,false);
    document.getElementById("txbRangoTres").addEventListener("change",validarCantidades,false);
    document.getElementById("txbRangoCuatro").addEventListener("change",validarCantidades,false);
    */
    //document.getElementById("btnAsociarRangoAencuesta").addEventListener("click",asociarRangoAencuesta,false);
    
    /*ELEMENTO DE OTRO SCRIPT*/
    
   // document.getElementById("btnSubirMuestra").addEventListener("click",cargarEncuestasListasProceso,false);
}
/*Funcion para obtener la cantidad de rehgistros disponibles en la base de datos para una zona determinada*/
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
/*Funcion para agregar una funcion al evento change de las cuatro cajas de texto que van a recibir las cantidades de cada encuesta por rango*/
function agregarChange(){
    document.getElementById("txbRangoUno").addEventListener("change",validarCantidades,false);
    document.getElementById("txbRangoDos").addEventListener("change",validarCantidades,false);
    document.getElementById("txbRangoTres").addEventListener("change",validarCantidades,false);
    document.getElementById("txbRangoCuatro").addEventListener("change",validarCantidades,false);
}

function asociarRangoAencuesta(){
    var selEncuestaSinRango=document.getElementById("selEncuestasRango");
    var rdbtn=document.getElementsByName("rango");
                var rango;
                for(var i in rdbtn){
                    if(rdbtn[i].checked==true){
                         rango=rdbtn[i].id;
                    }
                }
    var rn=new rangos("asociarRangosAunaEncuesta",selEncuestaSinRango.value,rango);            
    var respuesta=rn.metodo();
    respuesta.success(function(respuestaServidor){
        if(respuestaServidor){
            alert("Asociacion exitosa");
        }else{
            alert("Ha ocurrido un error por favor comuniquese con su administrador");
        }
    }).fail(function(){});

                
}

function validarCantidades(id){
//alert(id);
var txt=document.getElementById(id);
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
            var raDos=Number(lblDos.value);
            var compararDos=Number(txt.value);
            if(compararDos>raDos ){
                alert("Esta intentando asignar un numero mayor de registros disponibles en la base de datos ");
                txt.value="";
            }
            console.log(compararDos);
            console.log(raDos);
            break;
        case "txbRangoTres":
            var lblTres=document.getElementById("rTres");      
            var raTres=Number(lblTres.value);
            var compararTres=Number(txt.value);
            if(compararTres>raTres ){
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
            if(compararCuatro>raCuatro      ){
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
function cambiarCantidadMuestra(){
    // alert(this.id);
    var sel=document.getElementById("selEncuestas");
     var txb=document.getElementById("txbCantidadMuestra");
     
    var enc=new encuesta("actualizarCantidadMuestraGeneral",sel.value,txb.value);
    var respuesta=enc.metodo();
    respuesta.success(function(respServ){
        var dtJson=eval(respServ);
        //var sel=document.getElementById("selEncuestas");
        //crearSelectEncuestas(sel,dtJson);
        if(respServ==true){
            txb.value="";
            alert("Cantidad de encuestas actualizado con exito");
//            cambiarValoresOcultos();
            sel.value=0;
   //location.reload(true);
            
        }else{
            alert("Ha ocurrido un problema por favor comuniquese con su administrador");
        }
    }).fail(function(){});
}

function limpiarNumeroRegistros(){
    document.getElementById("lblRuno").innerHTML="";
       
    document.getElementById("lblRdos").innerHTML="";

    document.getElementById("lblRtres").innerHTML="";
    document.getElementById("lblRcuatro").innerHTML="";
        
}
function obtenerDetalleMuestra(){
   //alert(this.id);
    var selEnc=document.getElementById("selEncuestas");
    //var selMuestra=document.getElementById("selAsignarMuestra");
    var valoresRangos= new muestra("obtenerDetalleAsignadas",idEncuesta,this.value,idMuestra);
    var respuesta= valoresRangos.metodo();
    respuesta.success(function(respServ){
        var dtJson=eval(respServ);
        console.log(dtJson[0]);
        //var lbl=document.createElement("label");
        //var txt=document.createTextNode(dtJson[0]);
        //lbl.appendChild(txt);
        var total=dtJson[0]+dtJson[1]+dtJson[2]+dtJson[3];
        
        document.getElementById("lblRuno").innerHTML="";
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
        document.getElementById("lblConce").innerHTML=" Disponibles "+total;
        
         //alert(document.getElementById("rCuatro").value);
    }).fail(function(){});
}
function cargaRangosAdminMuestra(){
   //alert("HOLA");
   // var hdIdEnc=document.getElementById("hdidEncu"); 
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
             inputCuatro.setAttribute("onchange","validarCantidades(txbRangoCuatro);");
             divCuatro.appendChild(lblCuatro);
             divCuatro.appendChild(inputCuatro);
             divCuatro.appendChild(lblRcuatro);
        }
    }).fail(function(){});
}
function cargarMuestra(){
    //alert("IdEncuesta"+this.value);
    
    // var hdIdEnc=document.getElementById("hdidEncu"); 
    var mue= new muestra("obtenerMuestras",this.value);
    idEncuesta=this.value;
    var respMues=mue.metodo();
    
    respMues.success(function(respServ){
        
        var dtJson=eval(respServ);
        console.log(dtJson);
        var dtJson=eval(respServ);
        //console.log("Id Muestra "+dtJson[0].IdDescripcionMuestra);
         if( dtJson[0].IdDescripcionMuestra!= undefined){
            idMuestra=dtJson[0].IdDescripcionMuestra;
            //console.log("Id Muestra valor variable "+idMuestra);
            cargarZonas();
         }
        
    }).fail(function(){});
    
    /*var selMuestra=document.getElementById("selAsignarMuestra");
    var respMues=mue.metodo();
    selMuestra.innerHTML="";
    respMues.success(function(respServ){
        var dtJson=eval(respServ);
        crearSelectMuestra(selMuestra,dtJson);
    }).fail(function(){});*/
}
function obtenerMuestra(){
    var mt=new muestra("obtenerMuestraEncuesta",this.value);
    var respuesta=mt.metodo();
    respuesta.success(function(respuestaServidor){
        alert(respuestaServidor);
    }).fail(function(){});
}
function cambiarValoresOcultos(){
    var selEnc=document.getElementById("selEncuestas");
    var hdIdEnc=document.getElementById("hdidEncu"); 
    var divUno=document.getElementById("divRangoUno");
    var divDos=document.getElementById("divRangoDos");
    var divTres=document.getElementById("divRangoTres");
    var divCuatro=document.getElementById("divRangoCuatro");
    hdIdEnc.value=selEnc.value;
    divUno.innerHTML="";
    divDos.innerHTML="";
    divTres.innerHTML="";
    divCuatro.innerHTML="";
    cargaRangosAdminMuestra();
    cargarMuestra();
    consultarCantidadMuestra();
    
}
/*Funcion para consultar la cantidad de registros disonibles*/
function consultarCantidadMuestra(){
    //alert("AQUI CONSULTAR ASIGNADAS");
    var h=document.getElementById("idRes");
  //  var selEnc=document.getElementById("selEncuestaAsignarMuestra");
    //var hdIdEnc=document.getElementById("hdidEncu");    
    //hdIdEnc.value=selEnc.value;
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
                h.appendChild(txt);
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
/*Funcion para registrar un detalle muestra*/
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
           
         /*var lblUno=document.getElementById("lblRuno");      
         var lblDos=document.getElementById("lblRdos");      
         var lblTres=document.getElementById("lblRtres");      
         var lblCuatro=document.getElementById("lblRcuatro");     
         var compararUno=Number(lblUno.value);
         var compararDos=Number(lblDos.value);
         var compararTres=Number(lblTres.value);
         var compararCuatro=Number(lblCuatro.value);
           */
        
        
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
                       limpiarFormMuestra();
                          selConc.value="0";
                          selUser.value="0";
                          selZn.value="0";
                          limpiarNumeroRegistros();
                           document.getElementById("lblZona").innerHTML="";
                           document.getElementById("lblConce").innerHTML="";
                          
                          
                          
                         /* divUno.innerHTML="";
                          divDos.innerHTML="";
                          divTres.innerHTML="";
                          divCuatro.innerHTML="";*/
                     //     document.getElementById("selAsignarMuestra").value="0";
                          //document.getElementById("selEncuestas").value="0";
                          
                     //  limpiarNumeroRegistros();
       //                location.reload(true);
                   }else{
                     //  alert(respServidor);
                       selConc.value="0";
                       selUser.value="0";
                       selZn.value="0";
                       h.innerHTML="";
                       //selEnc.value="0";
                       document.getElementById("selAsignarMuestra").value="0";
                       //consultarCantidadMuestra();
                       limpiarFormMuestra();
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
                limpiarFormMuestraTexto();
                //limpiarNumeroRegistros();
                
            } 
       
    }else{
        alert("Hay campos vacios");
    }
}
function limpiarFormMuestra(){
    //alert("hola");
    var form=document.getElementById("formAsocMuestraEncuesta");
    
    for(i in form.elements){
        //console.log(form.elements[i].type);
        if(form.elements[i].type == "text" ){
            //console.log(form.elements[i].value);
             form.elements[i].value="";
        }
        /*if(form.elements[i].type == "select-one"){
		var sl = form.elements[i];
         //       sl.selectedIndex=0;
                
	}*/
	
    }
}
function limpiarFormMuestraTexto(){
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
function cargarEncuestasListasProceso(){
    //alert("Hola");
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
            alert(respSer);
        }
    }).fail(function(){});
}
function cargarEncuestasSinCantidadMuestra(){
    var enc=new encuesta("obtenerEncuestaSinCantidadMuestra");
    var respuesta=enc.metodo();
    respuesta.success(function(respServ){
        var dtJson=eval(respServ);
        var sel=document.getElementById("selEncuestas");
        sel.innerHTML="";
        crearSelectEncuestas(sel,dtJson);
    }).fail(function(){});

}
function cargarZonas(){
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
function cargarUsuarios(){
    var user= new usuario("consultarAsesor","","","","","","","","");
    var resUser=user.crear();
    var sel=document.getElementById("selUsuarioMuestra");
        sel.innerHTML="";
    resUser.success(function(respUserServer){
        var dtJson=eval(respUserServer);
        
        crearSelectUsuario(sel,dtJson);
    }).fail(function(){});
}
/*Funcion para obtner los concesionarios*/
function cargarConcesionario(){
    //alert("Hola");
    //var selMuestra=document.getElementById("selAsignarMuestra");
   // var selZona=document.getElementById("selZonaMuestra");
    var sel=document.getElementById("selConcesionarioMuestra");
     //console.log(selMuestra.value);
     
        
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

    

//window.addEventListener("load",iniciarAdminMuestra,false);



function cargarEncuestasSinRango(){
    var selEncRangos=document.getElementById("selEncuestasRango");
    var enc=new encuesta("obtenerEncuestasSinRango");    
    var respuesta=enc.metodo();
     respuesta.success(function(respuestaServidor){
        var dtJson=eval(respuestaServidor);
        crearSelectEncuestas(selEncRangos,dtJson);
    }).fail(function(){
        
    });
}