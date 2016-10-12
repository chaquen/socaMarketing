function Iniciar(){
    cargarSelectPlantillas();
    document.getElementById("selFormReporteMensual").addEventListener("change",cargarZonasRepoMensual,false);
    document.getElementById("selReporteZonaMensual").addEventListener("change",cargarConcesionarioRepoMensual,false);
    document.getElementById("btnReporteMensual").addEventListener("click",obtenerReporte,false);
}

function cargarConcesionarioRepoMensual(){
    var sel=document.getElementById("selFormReporteMensual");
    var objselect=document.getElementById("selReporteZonaMensual");
    var objselectCns=document.getElementById("selReporteConcesionarioMensual");
    objselectCns.innerHTML="";
    if(objselect.value != "--" && objselect.value != "0"){
        var cns = new concesionario("ConcesionariosPorZona","","",objselect.value);
        var res=cns.metodo();
        res.success(function(respServ){
            var dtJson=eval(respServ);            
            crearSelectConcesionarioReportes(objselectCns,dtJson);
        }).fail(function(){});
    }else if(objselect.value === "0"){
        var cns = new concesionario("TodosLosConcesionarios");
        var res=cns.metodo();
        res.success(function(respServ){
            var dtJson=eval(respServ);            
            crearSelectConcesionarioReportes(objselectCns,dtJson);
        }).fail(function(){});
    }
}
function cargarZonasRepoMensual(){
    var sel=document.getElementById("selFormReporteMensual");
    var objselect=document.getElementById("selReporteZonaMensual");
    var div=document.getElementById("divReporteMensual");
    var hd=document.getElementById("hdIdEncuestaReporteMensual");
    objselect.innerHTML="";
    if(sel.value != "0"){
        var zn = new zona("obtnerZonasRepMensual",sel.value);
        var res=zn.metodo();
        res.success(function(respServ){
             var dtJson=eval(respServ);            
            crearSelectZonasReportes(objselect,dtJson);
            
        }).fail(function(){});
        
        var preguntas=new reporte("reporteEncuestaForm",sel.value);
            var respSer=preguntas.metodo();
            respSer.success(function(resSer){
                var dtJson=eval(resSer);
                div.innerHTML="";
                encuestaReporteMensual(dtJson,"divReporteMensual");

            }).fail(function(){});
         hd.value=sel.value;   
    }
    
}
function cargarSelectPlantillas(){
    var enc= new encuesta("consultarFormularios");
    var res=enc.metodo();
    res.success(function(respServ){
        var dtJson=eval(respServ);
        var objselect=document.getElementById("selFormReporteMensual");
        crearSelectFormulario(objselect,dtJson);
        
    }).fail(function(){});
}
function obtenerReporte(){
    var selZona=document.getElementById("selReporteZonaMensual");
    var selCons=document.getElementById("selReporteConcesionarioMensual");
    var selEnc=document.getElementById("selFormReporteMensual");
    var div=document.getElementById("divReporteMensual");
    if(selEnc.value!="0" && selZona.value!="--"){
            if(selZona.value === "0" && selCons.value === "--"){
                alert("todas las zonas");
                var reporMensual = new reporteMensual("reporMensualTodasZonas","","",selZona.value,"0");
                var respReporMen=reporMensual.metodo();
                respReporMen.success(function(respServ){        
                    
                    var dtJson=eval(respServ);

                    var tam=Object.keys(dtJson).length;

             //       console.log(div.childNodes);
                    for(var i in div.childNodes){
                     if(div.childNodes[i].nodeType=Node.ELEMENT_NODE){
                             for(var j in dtJson){
           //                      console.log(dtJson[j]);
                                 if(div.childNodes[i].id===dtJson[j].IdPreguntas){
                                     crearTablaRankingGeneralPregunta(dtJson[j],div.childNodes[i].id);

                                 }
                             }
                         }
                     }
                    
                }).fail(function(){});
            }
            if(selZona.value==="0" && selCons.value==="0"){
                alert("todos los concesionarios de todas las zonas");
                var reporMensual = new reporteMensual("reporMensualTodosConcesionarios");
                var respReporMen=reporMensual.metodo();
                respReporMen.success(function(respServ){        
                }).fail(function(){});
            }
            if(selZona.value==="0" &&  selCons.value!="0" && selCons.value!="--"){
                alert("un concesionario especifico de todas las zonas");
                
            }
            if(selZona.value !="0" && selZona.value !="--" &&  selCons.value === "0" ){
                alert("una zona especifica con todos los concesionarios");   
            }
            if(selZona.value!="0" &&  selCons.value!="0" && selCons.value!="--"){
                alert("un concesionario especifico de una zona especifica");
            }
            
    }
    
    
    
}
//**
/*Funcion prara crera la tabla de los ranking por Zona*/
function crearTablaRankingGeneralPregunta(datos,div){
    
              var divReporte=document.getElementById(div);
   
      //          var tabla=document.createElement("table");
                var fila=document.createElement("tr");
                var Zona=document.createElement("label");

                var respuestas=document.createElement("label");
                var textRes=document.createTextNode(datos.totalRango);
                var txtRespuesta=document.createElement("label");
               
                var resp=document.createTextNode(datos.Respuesta);
                var tRespuestas=document.createElement("label");
                
                var textsuma=document.createTextNode(datos.TotalRespuestas);
                var porcentaje=document.createElement("label");
                
                var textPorce=document.createTextNode(datos.porcentajeRango);

                
                
                txtRespuesta.appendChild(resp);
                var celda=document.createElement("td");
                celda.appendChild(txtRespuesta);
                fila.appendChild(celda);
                //tabla.appendChild(fila);
                
                respuestas.appendChild(textRes);
                var celda=document.createElement("td");
                celda.appendChild(respuestas);
                fila.appendChild(celda);
   //             tabla.appendChild(fila);
                
                tRespuestas.appendChild(textsuma);
                var celda=document.createElement("td");
                celda.appendChild(tRespuestas);
                fila.appendChild(celda);
   //             tabla.appendChild(fila);
                
                porcentaje.appendChild(textPorce);
                var celda=document.createElement("td");
                celda.appendChild(porcentaje);
                fila.appendChild(celda);
    //            tabla.appendChild(fila);
                
                fila.setAttribute("class","filas");
        //        tabla.appendChild(fila);
                divReporte.appendChild(fila);
          
          //          return fila;
}

window.addEventListener("load",Iniciar,false);