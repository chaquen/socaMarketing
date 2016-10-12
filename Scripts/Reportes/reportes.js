window.addEventListener("load",iniciarReportes,false);
var idEncuesta=0;
var idFormulario=0;
var idZona=0;
var idConcesionario=0;
var idUsuario=0;
var User;
var rol="";
var tUno="";
var tDos="";
var tTres="";
var tCuatro="";
var listaDetalleMuestra={};
var listaRankingZona={};
var listaRankingConcesionario={};
var listaReporteGeneralPreguntas={};
function iniciarReportes(){
    
    var volver=document.getElementById("volver");
    var val=recibirValorGet();
   if(User=obtener_session_storage("usuarioLogueado")){
       
       idUsuario=User.idUsuario;
       rol=User.rol;
       volver.setAttribute("href","menuAdministrador.html");
       CargarSelectEncuestas(); 
       document.getElementById("selEncuestaReporte").addEventListener("change",encuestaSeleccionada,false);
       document.getElementById("selReporteZona").addEventListener("change",concesionarioPorZona,false);
       document.getElementById("selReporteConcesionario").addEventListener("change",function(){
          idConcesionario=this.value; 
           
       },false);
       document.getElementById("btnReporte").addEventListener("click",generarReporte,false);
       //document.getElementById("aExportarPDF").addEventListener("click",Html2Pdf,false);
       document.getElementById("aExportarPDF").addEventListener("click",imprimirHoja,false);
       /*document.getElementById("selTipoGrafico").addEventListener("change",function(){
           dibujarGraficosReporte();
       },true);*/
       
          // console.log(google.charts.load('current', {packages: ['corechart']}));
           google.charts.load('current', {packages: ['corechart']});
       
       
   }else{
       alert("Por favor ingrese correctamente al sistema ☻");
       location.href="index.html";
   }   
    
    /*if(val["idFormulario"]!=undefined){
       idEncuesta=val["idEncuesta"];
       idFormulario=val["idFormulario"];
       CargarSelectEncuestas(); 
       encuestaSeleccionada();
       idUsuario=val["idUser"];
       rol=val["rol"];
       volver.setAttribute("href","menuAdministrador.html?idUser="+idUsuario+"&rol="+rol);
       
       document.getElementById("selEncuestaReporte").addEventListener("change",encuestaSeleccionada,false);
       document.getElementById("selReporteZona").addEventListener("change",concesionarioPorZona,false);
       document.getElementById("selReporteConcesionario").addEventListener("change",function(){
          idConcesionario=this.value; 
           
       },false);
       document.getElementById("btnReporte").addEventListener("click",generarReporte,false);
      
   }*/
  
   
   
 
}
function imprimirHoja(){
    //document.getElementById("formReporte").style.display='none';
    window.print();
}
//Funcion para generar al peticion ajax para obtener el reporte
function generarReporte(){
    var selZona=document.getElementById("selReporteZona");
    var selConcesionario=document.getElementById("selReporteConcesionario");
    var chbRuno=document.getElementById("Uno");
    var chbRdos=document.getElementById("Dos");
    var chbRtres=document.getElementById("Tres");
    var chbRcuatro=document.getElementById("Cuatro");
   //Si la zona y el concesionario no han sido seleccionado
    if(idZona==0 && idConcesionario==0){
        obtenerMuestra();//ok
        obtenerPreguntasReporte();//OK
        obtenerComparativo();//OK
        obtenerRankingZona();//AQUI OBTENGO EL RANKIN POR ZONAS
        obtenerReportePreguntaGeneral();
        
        //google.charts.setOnLoadCallback(dibujarReporteGeneralColumnas);
        
        
    }else if(idZona!=0 && idConcesionario==0){
        obtenerMuestra();//ok
        obtenerPreguntasReporte();//OK
        obtenerComparativo();//OK
        obtenerRankingConcesionario();//ok
        obtenerReportePreguntaGeneral();

        
        
        
    }else if(idZona!=0 && idConcesionario!=0){
        obtenerMuestra();//ok
        obtenerPreguntasReporte();//OK
        obtenerComparativo();//OK
        obtenerRankingConcesionario();//ok
    }
    //obtenerMuestra();//ok
    //obtenerPreguntasReporte();//OK
    //obtenerComparativo();//OK
    //Falta
    
}
function obtenerReportePreguntaGeneral(){
    var preguntaGeneral=new reporte("reporteGeneralPregunta",idEncuesta);
    var respuesta=preguntaGeneral.metodo();
    respuesta.success(function(respuestaServidor){
        var datos=eval(respuestaServidor);
        listaReporteGeneralPreguntas=datos;
        dibujarGraficosReporte();
    }).fail(function(){});
}
/*Funcion para consultar las preguntas de una encuesta*/
function obtenerPreguntasReporte(){
    
   var comparativo=new reporte("reportePreguntasEncuesta",idEncuesta);
    var respuesta=comparativo.metodo();
    respuesta.success(function(respuestaServidor){
        var datos=eval(respuestaServidor);
        if(idZona==0 && idConcesionario==0){
            dibujarPreguntasComparativo(datos,"divReporte");
            dibujarPreguntasRankingZona(datos,"divReporteRankingZonas");
            dibujarPreguntasReporteGeneral(datos,"divReportePreguntaGeneral");
            
        }else if(idZona!=0 && idConcesionario==0){
            dibujarPreguntasComparativo(datos,"divReporte");
            dibujarPreguntasRankingConcesionario(datos,"divReporteRankingZonas");
            dibujarPreguntasReporteGeneral(datos,"divReportePreguntaGeneral");         
            
        }else if(idZona==0 && idConcesionario!=0){
            dibujarPreguntasComparativo(datos,"divReporte");
            dibujarPreguntasRankingConcesionario(datos,"divReporteRankingZonas");
            dibujarPreguntasReporteGeneral(datos,"divReportePreguntaGeneral");         
        }else if(idZona!=0 && idConcesionario!=0){
            dibujarPreguntasComparativo(datos,"divReporte");
            dibujarPreguntasRankingConcesionario(datos,"divReporteRankingZonas");
            dibujarPreguntasReporteGeneral(datos,"divReportePreguntaGeneral");         
        }else{
            console.log(listaDetalleMuestra);
        }
        
        
        
        
    }).fail(function(){});
}
/*FFuncion para dibujar reporte general de cada pregunta*/
function dibujarPreguntasReporteGeneral(datos,div){
    var div=document.getElementById(div);
    div.innerHTML="";
    var a=1;
    for(var i in datos){
        var divDos=document.createElement("div");           
        var h4=document.createElement("h4");
        h4.innerHTML=(a)+" "+datos[i].ArgumentoPregunta;
        divDos.appendChild(h4);
        //
        var tabla=document.createElement("table");            
        var thead=document.createElement("thead");
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML="Nivel";
        celda.appendChild(h4);
        fila.appendChild(celda);

        var celda=document.createElement("td");
        celda.setAttribute("id","tdRespuestas");
        var h4=document.createElement("h4");
        h4.innerHTML="#";
        celda.appendChild(h4);
        fila.appendChild(celda);
        var celda=document.createElement("td");
        celda.setAttribute("id","tdRespuestas");
        var h4=document.createElement("h4");
        h4.innerHTML="%";
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        thead.appendChild(fila);
        
        tabla.appendChild(thead);	
        //
        a++;
        
        divDos.appendChild(tabla);
        div.appendChild(divDos);
        var respuestas=datos[i].respuestas;
        for(var r in respuestas){
            //console.log(respuestas[r]);
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var h4=document.createElement("h4");
            h4.innerHTML=respuestas[r].Respuesta;
            celda.appendChild(h4);
            fila.appendChild(celda);
            var h4=document.createElement("h4");
            h4.setAttribute("id","mTotal_"+respuestas[r].IdRespuestaPreguntas);
            h4.innerHTML="0";
            celda.appendChild(h4);
            fila.appendChild(celda);
            var h4=document.createElement("h4");
            h4.setAttribute("id","pTotal_"+respuestas[r].IdRespuestaPreguntas);
            h4.innerHTML="0";
            celda.appendChild(h4);
            fila.appendChild(celda);

            tabla.appendChild(fila);
            divDos.appendChild(tabla);
            div.appendChild(divDos);
        }
        
        var canvasGrafico=document.createElement("div");
        canvasGrafico.setAttribute("id","divGrafico_"+datos[i].IdPreguntas);
        divDos.appendChild(canvasGrafico);
        div.appendChild(divDos);
        
        
        
    }
    
    //console.log(div);
    
}

/*Funcion para dibujar tabla comparativa*/
function dibujarPreguntasComparativo(datos,div){
    var div=document.getElementById(div);
    div.innerHTML="";
    var tabla=document.createElement("table");   
    tabla.className="tblComparativo";
    //var thead=document.createElement("thead");
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    //var h4=document.createElement("h4");
    //h4.innerHTML="Pregunta";
    //celda.appendChild(h4);
    celda.innerHTML="Pregunta";
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    celda.setAttribute("id","tdRespuestas");
    //var h4=document.createElement("h4");
    //h4.innerHTML="Respuesta";
    celda.innerHTML="Respuesta";
    //celda.appendChild(h4);
    fila.appendChild(celda);
    tabla.appendChild(fila);
    var j=1;
    var k=0;
    //tabla.appendChild(thead);
    for(var i in datos){
        console.log(datos[i]);
        var filaA=document.createElement("tr");
        
        var filaB=document.createElement("tr");
        
        
        
        var celda=document.createElement("td");
        //console.log(datos[i].IdPreguntas);
        celda.setAttribute("rowspan","2");
        //var h4=document.createElement("h4");
        celda.innerHTML=datos[i].ArgumentoPregunta;
        //celda.appendChild(h4);
        filaA.appendChild(celda);
        
        for(var e in datos[i].respuestas){
            
            var celda=document.createElement("td");
            
            celda.innerHTML=datos[i].respuestas[e].Respuesta;
            celda.setAttribute("id","respPreg_"+datos[i].respuestas[e].IdRespuestaPreguntas);
            //celda.appendChild(h4);
            filaA.appendChild(celda);
            //
             var celda=document.createElement("td");
            celda.innerHTML="0";
            celda.setAttribute("id","porcPreg_"+datos[i].respuestas[e].IdRespuestaPreguntas);
            
            //celda.appendChild(h4);
            filaB.appendChild(celda);
            
            
          
            /*var celda=document.createElement("td");
             var h4=document.createElement("h5");
            h4.innerHTML="Estandar ";
            celda.appendChild(h4);
            filaB.appendChild(celda);
            var h4=document.createElement("h5");
            h4.innerHTML=datos[i].respuestas[e].NivelOptimo+"%";
            h4.setAttribute("id","eOpt_"+datos[i].respuestas[e].IdRespuestaPreguntas);
            celda.appendChild(h4);
            filaB.appendChild(celda);*/
            
            //console.log(datos[i].IdPreguntas);
            j++;
            //break;
        }
        
        if(k<j){
            k=j;
            j=1;
        }
        
        tabla.appendChild(filaA);
        tabla.appendChild(filaB);
    }
    div.appendChild(tabla);
    
    document.getElementById("tdRespuestas").setAttribute("colspan",k+1);
    
    
}
/*Funcion para Dibujar la tabla comparativo */
function dibujarComparativo(datos){
    
   
    var Fila;
    var h4Dos;
    var h4Tres;
    var h4Cuatro;
    for(var i in datos){
            h4Dos=document.getElementById("respPreg_"+datos[i].Fk_Respuesta_Pregunta);
            //h4Tres=document.getElementById("eOpt_"+datos[i].Fk_Respuesta_Pregunta);
            h4Cuatro=document.getElementById("porcPreg_"+datos[i].Fk_Respuesta_Pregunta);
            if(h4Dos!=null &&  h4Cuatro!=null){
                //h4Dos.innerHTML="xx";
                //h4Tres.innerHTML="xxx";
                var sr=new String(datos[i].PorcentajeGeneral);
                //console.log(sr);
                 h4Cuatro.innerHTML=sr+"%";
                 h4Cuatro.value=datos[i].Muestra;
                
            }else{
                console.log(h4Dos);
                console.log(h4Cuatro);
                console.log(datos[i].Fk_Respuesta_Pregunta);
            }
            
    }
        
        
}
//Funcion para dibujar las preguntas para el ranking Zonas
function dibujarPreguntasRankingZona(datos,div){
    var div=document.getElementById(div);
    div.innerHTML="";
    var numP=1;
    for(var i in datos){
        var divPregunta=document.createElement("div");
        divPregunta.className="divTabla";
        divPregunta.setAttribute("id","divRanZona_"+datos[i].IdPreguntas);
        
        
            var a=document.createElement("a");
            a.setAttribute("href","reporteGeneral.html?enc="+datos[i].IdEncuesta+"&pre="+datos[i].IdPreguntas);
            var h4=document.createElement("h4");
            h4.innerHTML=numP+" "+datos[i].ArgumentoPregunta;
            a.appendChild(h4);
            divPregunta.appendChild(a);
        /*
            var h4=document.createElement("h4");
            h4.innerHTML=numP+" "+datos[i].ArgumentoPregunta;
            divPregunta.appendChild(h4);
        */  
        //console.log(datos[i].TipoPregunta);
        //div.appendChild(divPregunta);
        numP++;
           for(var e in datos[i].respuestas){
               //Primera tabla
               var divCero=document.createElement("div");
                var divTabla1=document.createElement("div");
                var tabla1=document.createElement("table");
                tabla1.className="zona";
                var fila=document.createElement("tr");

                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="Rankin";
                celda.appendChild(h4);
                fila.appendChild(celda);

                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="Zona";
                celda.appendChild(h4);
                fila.appendChild(celda);

                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="Muestra";
                celda.appendChild(h4);
                fila.appendChild(celda);

                tabla1.appendChild(fila);
                tabla1.setAttribute("name","tblZonas");
                var j=1;
                for(var a in listaDetalleMuestra){
                    var fila=document.createElement("tr");
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=j++;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=listaDetalleMuestra[a].NombreZona;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=listaDetalleMuestra[a].TotalMuestra;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla1.appendChild(fila);
                }
                
                divTabla1.appendChild(tabla1);             
                divCero.appendChild(divTabla1);             
                
                //Segunda tabla
                var divTabla2=document.createElement("div");
                var tabla2=document.createElement("table");
                tabla2.className="rango";
                //primera fila
                var fila=document.createElement("tr");
                //console.log(datos[i].respuestas[e].Respuesta);
                var celda=document.createElement("td");
                celda.setAttribute("colspan","8");
                var h4=document.createElement("h4");
                h4.innerHTML=datos[i].respuestas[e].Respuesta;
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla2.appendChild(fila);
                //segunda fila
                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=tUno;
                celda.appendChild(h4);
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=tDos;
                celda.appendChild(h4);
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=tTres;
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=tCuatro;
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla2.appendChild(fila);
                //Trecera fila
                var fila=document.createElement("tr");

                //Tercera fila
                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla2.appendChild(fila);
                //divPregunta.appendChild(tabla);
                //var tablaDos=document.createElement("table");
                tabla2.setAttribute("id","tblRespuesta_"+datos[i].respuestas[e].IdRespuestaPreguntas);
                //Valores
                //de las respuestas este conjuto de datos debe ser diferente y no tener los datos de los que se han realizado y no los valores esperados
                for(var a in listaDetalleMuestra){
                    var fila=document.createElement("tr");
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","mReg_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Uno");//Porcentaje
                    console.log(listaDetalleMuestra[a]);
                    h4.innerHTML="0";
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML="0";
                    h4.setAttribute("id","pTotal_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Uno");//realziadas
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","mReg_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Dos");
                    h4.innerHTML="0";
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML="0";
                    h4.setAttribute("id","pTotal_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Dos");
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","mReg_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Tres");
                    h4.innerHTML="0";
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML="0";
                    h4.setAttribute("id","pTotal_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Tres");
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla2.appendChild(fila);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","mReg_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Cuatro");
                    h4.innerHTML="0";
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML="0";
                    h4.setAttribute("id","pTotal_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Cuatro");
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla2.appendChild(fila);
                
                }
                divTabla2.appendChild(tabla2);
                divCero.appendChild(divTabla2);
                //TercerTabla
                var divTabla3=document.createElement("div");
                var tabla3=document.createElement("table");
                tabla3.className="Estandar";
                var fila=document.createElement("tr");

                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=datos[i].respuestas[e].Respuesta;
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla3.appendChild(fila);

                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                
                tabla3.appendChild(fila);
                //divPregunta.appendChild(tabla3);
                //var tablaDos=document.createElement("table");
                tabla3.setAttribute("name","tblTotalZonas");
                for(var a in listaDetalleMuestra){
                    var fila=document.createElement("tr");
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","h4_estandar_numero_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas);
                    h4.innerHTML="0";
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML="0,0";
                    h4.setAttribute("id","h4_estandar_porcentaje_"+listaDetalleMuestra[a].IdZona+"_"+datos[i].respuestas[e].IdRespuestaPreguntas);
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla3.appendChild(fila);
                }
                divTabla3.appendChild(tabla3);
                divCero.appendChild(divTabla3);
                //Cuarta tabla
                var divTabla4=document.createElement("div");
                var tabla4=document.createElement("table");
                tabla4.className="Estandar";
                var fila=document.createElement("tr");

                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=datos[i].respuestas[e].Respuesta;
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla4.appendChild(fila);

                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="Estandar Optimo   ";
                celda.appendChild(h4);
                fila.appendChild(celda);
                               
                tabla4.appendChild(fila);
                divCero.appendChild(tabla4);
                //var tablaDos=document.createElement("table");
                tabla4.setAttribute("name","tblTotalZonas");
               
                    var fila=document.createElement("tr");
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=datos[i].respuestas[e].NivelOptimo+"%";
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla4.appendChild(fila);
                
                divTabla4.appendChild(tabla4);
                divCero.appendChild(divTabla4);
                
                divPregunta.appendChild(divCero);    
           }
           div.appendChild(divPregunta);
        
        
           
        
    }
    
}
function dibujarPreguntasRankingConcesionario(datos,div){
    var div=document.getElementById(div);
    div.innerHTML="";
    var numP=1;
    for(var i in datos){
        console.log(datos[i]);
        var divPregunta=document.createElement("div");
        divPregunta.className="divTabla";
        divPregunta.setAttribute("id","divRanConcesionario_"+datos[i].IdPreguntas);
        var a=document.createElement("a");
        a.setAttribute("href","reporteGeneral.html?enc="+datos[i].IdEncuesta+"&pre="+datos[i].IdPreguntas);
        var h4=document.createElement("h4");
        h4.innerHTML=numP+" "+datos[i].ArgumentoPregunta;
        a.appendChild(h4);
        divPregunta.appendChild(a);
        /*var h4=document.createElement("h4");
        h4.innerHTML=numP+" "+datos[i].ArgumentoPregunta;
        divPregunta.appendChild(h4);*/
        //div.appendChild(divPregunta);
        numP++;
           for(var e in datos[i].respuestas){
               //Primera tabla
               var divCero=document.createElement("div");
                var divTabla1=document.createElement("div");
                var tabla1=document.createElement("table");
                tabla1.className="zona";
                var fila=document.createElement("tr");

                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="Rankin";
                celda.appendChild(h4);
                fila.appendChild(celda);

                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="Concesionario";
                celda.appendChild(h4);
                fila.appendChild(celda);

                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="Muestra";
                celda.appendChild(h4);
                fila.appendChild(celda);

                tabla1.appendChild(fila);
                tabla1.setAttribute("name","tblConcesioanrio");
                var j=1;
                for(var a in listaDetalleMuestra){
                    var fila=document.createElement("tr");
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=j++;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=listaDetalleMuestra[a].NombreConcesionario;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=listaDetalleMuestra[a].TotalMuestra;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla1.appendChild(fila);
                }
                
                divTabla1.appendChild(tabla1);             
                divCero.appendChild(divTabla1);             
                
                //Segunda tabla
                var divTabla2=document.createElement("div");
                var tabla2=document.createElement("table");
                tabla2.className="rango";
                //primera fila
                var fila=document.createElement("tr");
                //console.log(datos[i].respuestas[e].Respuesta);
                var celda=document.createElement("td");
                celda.setAttribute("colspan","8");
                var h4=document.createElement("h4");
                h4.innerHTML=datos[i].respuestas[e].Respuesta;
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla2.appendChild(fila);
                //segunda fila
                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=tUno;
                celda.appendChild(h4);
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=tDos;
                celda.appendChild(h4);
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=tTres;
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=tCuatro;
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla2.appendChild(fila);
                //Trecera fila
                var fila=document.createElement("tr");

                //Tercera fila
                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla2.appendChild(fila);
                //divPregunta.appendChild(tabla);
                //var tablaDos=document.createElement("table");
                tabla2.setAttribute("id","tblRespuesta_"+datos[i].respuestas[e].IdRespuestaPreguntas);
                //Valores
                //de las respuestas este conjuto de datos debe ser diferente y no tener los datos de los que se han realizado y no los valores esperados
                for(var a in listaDetalleMuestra){
                    var fila=document.createElement("tr");
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","mReg_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Uno");//Porcentaje
                    console.log(listaDetalleMuestra[a]);
                    h4.innerHTML=0;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=0;
                    h4.setAttribute("id","pTotal_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Uno");//realziadas
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","mReg_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Dos");
                    h4.innerHTML=0;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=0;
                    h4.setAttribute("id","pTotal_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Dos");
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","mReg_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Tres");
                    h4.innerHTML=0;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=0;
                    h4.setAttribute("id","pTotal_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Tres");
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla2.appendChild(fila);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.setAttribute("id","mReg_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Cuatro");
                    h4.innerHTML=0;
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=0;
                    h4.setAttribute("id","pTotal_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas+"_Cuatro");
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla2.appendChild(fila);
                     
                }
                divTabla2.appendChild(tabla2);
                divCero.appendChild(divTabla2);
                //TercerTabla
                var divTabla3=document.createElement("div");
                var tabla3=document.createElement("table");
                tabla3.className="Estandar";
                var fila=document.createElement("tr");

                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=datos[i].respuestas[e].Respuesta;
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla3.appendChild(fila);

                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="#";
                celda.appendChild(h4);
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="%";
                celda.appendChild(h4);
                fila.appendChild(celda);
                
                tabla3.appendChild(fila);
                //divPregunta.appendChild(tabla3);
                //var tablaDos=document.createElement("table");
                tabla3.setAttribute("name","tblTotalConcesioanrio");
                for(var a in listaDetalleMuestra){
                    console.log(listaDetalleMuestra);
                    var fila=document.createElement("tr");
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=0;
                    h4.setAttribute("id","h4_estandar_numero_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas);
                    
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=0;
                    h4.setAttribute("id","h4_estandar_porcentaje_"+listaDetalleMuestra[a].IdConcesionario+"_"+datos[i].respuestas[e].IdRespuestaPreguntas);
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla3.appendChild(fila);
                }
                divTabla3.appendChild(tabla3);
                divCero.appendChild(divTabla3);
                //Cuarta tabla
                var divTabla4=document.createElement("div");
                var tabla4=document.createElement("table");
                tabla4.className="Estandar";
                var fila=document.createElement("tr");

                var celda=document.createElement("td");
                celda.setAttribute("colspan","2");
                var h4=document.createElement("h4");
                h4.innerHTML=datos[i].respuestas[e].Respuesta;
                celda.appendChild(h4);
                fila.appendChild(celda);
                tabla4.appendChild(fila);

                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var h4=document.createElement("h4");
                h4.innerHTML="Estandar Optimo   ";
                celda.appendChild(h4);
                fila.appendChild(celda);
                               
                tabla4.appendChild(fila);
                divCero.appendChild(tabla4);
                //var tablaDos=document.createElement("table");
                tabla4.setAttribute("name","tblTotalZonas");
               
                    var fila=document.createElement("tr");
                    var celda=document.createElement("td");
                    var h4=document.createElement("h4");
                    h4.innerHTML=datos[i].respuestas[e].NivelOptimo+"%";
                    celda.appendChild(h4);
                    fila.appendChild(celda);
                    tabla4.appendChild(fila);
                
                divTabla4.appendChild(tabla4);
                divCero.appendChild(divTabla4);
                
                divPregunta.appendChild(divCero);    
           }
           div.appendChild(divPregunta);
        
        
           
        
    }
}
/*Funcion para para obtener el rankig de los concesionarios*/
function obtenerRankingConcesionario(){
    
    var muestra=new reporte("obtenerRankingConcesionario",idEncuesta,idZona,0);
    var respuesta=muestra.metodo();
    respuesta.success(function(respuestaServidor){
        listaRankingConcesionario =eval(respuestaServidor);
        console.log(listaRankingConcesionario);
        dibujarRankingConcesionario(listaRankingConcesionario);
        
        
    }).fail(function(){});
    
}
/*Funcion para enlazar los datos a la tabla que contiene el rankin de concesionarios */
function dibujarRankingConcesionario(datos){
    for(var e in datos){
        /*console.log(datos[e].rango);
        console.log(tUno);
        console.log(tDos);
        console.log(tTres);
        console.log(tCuatro);
        console.log(datos[e].IdZona);
        console.log(datos[e].IdRespuestaPreguntas);*/
        switch("Entre "+datos[e].rango){
            case tUno:
                var hUno=document.getElementById("pTotal_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Uno");
                //console.log(hUno);
                if(hUno!=null){
                    hUno.innerHTML="";
                    hUno.innerHTML=formato_numero(datos[e].PorcentajeGeneral,"2",",",".");
                }
                
                var hDos=document.getElementById("mReg_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Uno");
                if(hDos!=null){
                    hDos.innerHTML="";
                    hDos.innerHTML=datos[e].Muestra;
                    hDos.value=datos[e].Muestra;
                }
                
                //console.log(hUno);
                //console.log(hDos);
                break;
            case tDos:
                var hUno=document.getElementById("pTotal_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Dos");
                if(hUno!=null){
                    hUno.innerHTML="";
                    hUno.innerHTML=formato_numero(datos[e].PorcentajeGeneral,"2",",",".");
                }
                var hDos=document.getElementById("mReg_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Dos");
                if(hDos!=null){
                    hDos.innerHTML="";
                    hDos.innerHTML=datos[e].Muestra;
                    hDos.value=datos[e].Muestra;
                }
                break;
            case tTres:
                var hUno=document.getElementById("pTotal_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Tres");
                if(hUno!=null){
                    hUno.innerHTML="";
                    hUno.innerHTML=formato_numero(datos[e].PorcentajeGeneral,"2",",",".");
                }
                var hDos=document.getElementById("mReg_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Tres");
                if(hDos!=null){
                    hDos.innerHTML="";
                    hDos.innerHTML=datos[e].Muestra;
                    hDos.value=datos[e].Muestra;
                }
                break;
            case tCuatro:
                var hUno=document.getElementById("pTotal_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Cuatro");
               if(hUno!=null){
                    hUno.innerHTML="";
                    hUno.innerHTML=formato_numero(datos[e].PorcentajeGeneral,"2",",",".");
                }
                var hDos=document.getElementById("mReg_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Cuatro");
                if(hDos!=null){
                    hDos.innerHTML="";
                    hDos.innerHTML=datos[e].Muestra;
                    hDos.value=datos[e].Muestra;
                }
                break;
            default:
                //alert("Hey que paso");
            break
        }
        
        
    }
    var total=0,u=0,d=0,t=0,c=0,por=0;
    for(var e in datos){
        //console.log(datos[e].IdConcesionario);
        
        var uno=document.getElementById("mReg_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Uno");
        if(uno!=null && uno.value!=undefined){
            u=Number(uno.value);
            //console.log(u);
        }else{
            u=0;
        }
        
        var dos=document.getElementById("mReg_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Dos");
        if(dos !=null && dos.value!=undefined){
            d=Number(dos.value);
            //console.log(d);
        }else{
            d=0;
        }
        
        var tres=document.getElementById("mReg_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Tres");
        if(tres !=null && tres.value!=undefined){
            t=Number(tres.value);
           // console.log(t); 
        
        }else{
            t=0;
        }
        
        var cuatro=document.getElementById("mReg_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas+"_Cuatro");
        if(cuatro !=null && cuatro.value!=undefined){
            c=Number(cuatro.value);
          //  console.log(c);
        }else{
            c=0;
        }
        
        total=u+d+t+c;
        //console.log(total);
        var r=Number(datos[e].TotalRealizadas);
        por=total/r*100;       
       // console.log();
       // console.log(document.getElementById("h4_estandar_porcentaje_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas));
        //console.log("h4_estandar_porcentaje_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas);
        if(document.getElementById("h4_estandar_numero_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas)!=null){
            document.getElementById("h4_estandar_numero_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas).innerHTML=total;
            document.getElementById("h4_estandar_porcentaje_"+datos[e].IdConcesionario+"_"+datos[e].IdRespuestaPreguntas).innerHTML=formato_numero(por,"2",",",".");
        }
        
        
        
        
    }
}
/*Funcion para enlazar los datos a la tabla*/
function dibujarRankingZonas(datos){
    for(var e in datos){
        /*console.log(datos[e].rango);
        console.log(tUno);
        console.log(tDos);
        console.log(tTres);
        console.log(tCuatro);
        console.log(datos[e].IdZona);
        console.log(datos[e].IdRespuestaPreguntas);*/
        var intTotalRealizadas=0;
        switch("Entre "+datos[e].rango){
            case tUno:
                var hUno=document.getElementById("pTotal_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Uno");
                //console.log(hUno);
                if(hUno!=null){
                    hUno.innerHTML="";
                    hUno.innerHTML=formato_numero(datos[e].PorcentajeGeneral,"2",",",".");
                }
                
                var hDos=document.getElementById("mReg_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Uno");
                if(hDos!=null){
                    hDos.innerHTML="";
                    hDos.innerHTML=datos[e].Muestra;
                    hDos.value=datos[e].Muestra;
                }
                
                //console.log(hUno);
                //console.log(hDos);
                break;
            case tDos:
                var hUno=document.getElementById("pTotal_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Dos");
                if(hUno!=null){
                    hUno.innerHTML="";
                    hUno.innerHTML=formato_numero(datos[e].PorcentajeGeneral,"2",",",".");
                }
                var hDos=document.getElementById("mReg_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Dos");
                if(hDos!=null){
                    hDos.innerHTML="";
                    hDos.innerHTML=datos[e].Muestra;
                    hDos.value=datos[e].Muestra;
                }
                break;
            case tTres:
                var hUno=document.getElementById("pTotal_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Tres");
                if(hUno!=null){
                    hUno.innerHTML="";
                    hUno.innerHTML=formato_numero(datos[e].PorcentajeGeneral,"2",",",".");
                }
                var hDos=document.getElementById("mReg_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Tres");
                if(hDos!=null){
                    hDos.innerHTML="";
                    hDos.innerHTML=datos[e].Muestra;
                    hDos.value=datos[e].Muestra;
                }
                break;
            case tCuatro:
                var hUno=document.getElementById("pTotal_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Cuatro");
               if(hUno!=null){
                    hUno.innerHTML="";
                    hUno.innerHTML=formato_numero(datos[e].PorcentajeGeneral,"2",",",".");
                }
                var hDos=document.getElementById("mReg_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Cuatro");
                if(hDos!=null){
                    hDos.innerHTML="";
                    hDos.innerHTML=datos[e].Muestra;
                    hDos.value=datos[e].Muestra;
                    
                }   
                break;
            default:
                //alert("Hey que paso");
            break
        }
        
                    
            
        
        
        
        
    }
    var total=0,u=0,d=0,t=0,c=0,por=0;
    for(var e in datos){
        var uno=document.getElementById("mReg_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Uno");
        //console.log(uno.value);
        var dos=document.getElementById("mReg_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Dos");
        //console.log(dos.value);
        var tres=document.getElementById("mReg_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Tres");
        //console.log(tres.value);
        var cuatro=document.getElementById("mReg_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas+"_Cuatro");
        //console.log(cuatro.value);
        if(uno.value!=undefined){
            u=Number(uno.value);
            //console.log(u);
        }else{
            u=0;
        }
        if(dos.value!=undefined){
            d=Number(dos.value);
            //console.log(d);
        }else{
            d=0;
        }
        
        if(tres.value!=undefined){
            t=Number(tres.value);
            //console.log(t); 
        
        }else{
            t=0;
        }
        
        if(cuatro.value!=undefined){
            c=Number(cuatro.value);
            //console.log(c);
        }else{
            c=0;
        }
        
        total=u+d+t+c;
        //console.log(total);
        var r=Number(datos[e].TotalRealizadas);
        por=total/r*100;       
        document.getElementById("h4_estandar_numero_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas).innerHTML=total;
        document.getElementById("h4_estandar_porcentaje_"+datos[e].IdZona+"_"+datos[e].IdRespuestaPreguntas).innerHTML=formato_numero(por,"2",",",".");
        
        
        
    }
}
/*Funcion para obtenr el ranking de las zonas*/
function obtenerRankingZona(){
    /*var muestra=new reporte("obtenerMuestraReporte",idEncuesta,0,0);
    var respuesta=muestra.metodo();
    respuesta.success(function(respuestaServidor){
        var datos=eval(respuestaServidor);
        console.log(datos);
    }).fail(function(){});*/
    
    var muestra=new reporte("obtenerRankingZona",idEncuesta,idZona,idConcesionario);
    var respuesta=muestra.metodo();
    respuesta.success(function(respuestaServidor){
        listaRankingZona =eval(respuestaServidor);
        console.log(listaRankingZona);
         dibujarRankingZonas(listaRankingZona);
        
        
    }).fail(function(){});
    
    
}
/*Funcioj para consultar el comparativo de la zona*/
function obtenerComparativo(){
    var comparativo=new reporte("obtenerComparativoReporte",idEncuesta,idZona,idConcesionario);
    var respuesta=comparativo.metodo();
    respuesta.success(function(respuestaServidor){
        var datos=eval(respuestaServidor);
        console.log(datos);
        dibujarComparativo(datos);
    }).fail(function(){});
}

//Funcion para obtener la muestra de una encuesta
function obtenerMuestra(){
    var muestra=new reporte("obtenerMuestraReporte",idEncuesta,idZona,idConcesionario);
    var respuesta=muestra.metodo();
    respuesta.success(function(respuestaServidor){
        listaDetalleMuestra=eval(respuestaServidor);
        if(idZona==0 && idConcesionario==0){
            console.log(listaDetalleMuestra);
            crearTablaDetalleMuestraZonas(listaDetalleMuestra,"divMuestra");
        }else if(idZona!=0 && idConcesionario==0){
            console.log(listaDetalleMuestra);
            crearTablaDetalleMuestraConcesionario(listaDetalleMuestra,"divMuestra");
        }else if(idZona==0 && idConcesionario!=0){
            console.log(listaDetalleMuestra);
            crearTablaDetalleMuestraConcesionario(listaDetalleMuestra,"divMuestra");
        }else if(idZona!=0 && idConcesionario!=0){
            console.log(listaDetalleMuestra);
            crearTablaDetalleMuestraConcesionario(listaDetalleMuestra,"divMuestra");
        }else{
            console.log(listaDetalleMuestra);
        }
        //crearTablaDetalleMuestraZonas(datos,"divMuestra");
    }).fail(function(){});
}
/*FUNCION PARA DIBUJAR LA TABLA CON EL DETALLE DE LA ENCUESTA*/
function crearTablaDetalleMuestraZonas(datos,IdDiv){
    if(document.getElementById("tblDtMuestra")!=null){
        document.getElementById("tblDtMuestra").innerHTML="";
    }
    var r1=0;
    var r2=0;
    var r3=0;
    var r4=0;
    var t1=0;
    var t2=0;
    //console.log(datos);
    var div=document.getElementById(IdDiv);
    var tabla=document.createElement("table");
    tabla.className="tblMuestra";
    
    //var thead=document.createElement("thead");
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    celda.innerHTML="Zona";
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    celda.innerHTML="Gerente";
    fila.appendChild(celda);
        
    var celda=document.createElement("td");
    celda.innerHTML=tUno;
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    celda.innerHTML=tDos;
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    celda.innerHTML=tTres;
    fila.appendChild(celda);

    var celda=document.createElement("td");
    celda.innerHTML=tCuatro;
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    celda.setAttribute("colspan","2");
    celda.innerHTML="Total Zona";
    fila.appendChild(celda);
    tabla.appendChild(fila);
    for(var i in datos){
        console.log(datos[i]);
        if(datos[i].NombreZona!=undefined){     
           var fila=document.createElement("tr");
           
           var celda=document.createElement("td");
           celda.innerHTML=datos[i].NombreZona;
           
           fila.appendChild(celda);

           var celda=document.createElement("td");
           celda.innerHTML=datos[i].gerenteZona;
           fila.appendChild(celda);

           var celda=document.createElement("td");
           celda.innerHTML=datos[i].Uno;
           fila.appendChild(celda);

           var celda=document.createElement("td");
           celda.innerHTML=datos[i].Dos;
           fila.appendChild(celda);

           var celda=document.createElement("td");
           celda.innerHTML=datos[i].Tres;
          
           fila.appendChild(celda);

           var celda=document.createElement("td");
           celda.innerHTML=datos[i].Cuatro;
         
           fila.appendChild(celda);

           var celda=document.createElement("td");
           celda.innerHTML=datos[i].TotalMuestra;
           fila.appendChild(celda);
           
           var celda=document.createElement("td");
           celda.innerHTML=datos[i].TotalPorcentaje+"%";
           
            fila.appendChild(celda);
           

            tabla.appendChild(fila);
            r1+=Number(datos[i].Uno);
            r2+=Number(datos[i].Dos);
            r3+=Number(datos[i].Tres);
            r4+=Number(datos[i].Cuatro);
            t1+=Number(datos[i].TotalMuestra);
            t2+=Number(datos[i].TotalPorcentaje);
       }
       
    }
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    celda.setAttribute("colspan","2");
    celda.innerHTML="Total";
    fila.appendChild(celda);
    tabla.appendChild(fila);
    var celda=document.createElement("td");
    celda.innerHTML=r1;
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
    celda.innerHTML=r2;
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
     celda.innerHTML=r3;
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
    celda.innerHTML=r4;
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
    celda.innerHTML=t1;
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
    celda.innerHTML=formato_numero(t2,2,",",".")+"%";
    fila.appendChild(celda);
    
    tabla.appendChild(fila);
   
    tabla.setAttribute("id","tblDtMuestra");
    div.appendChild(tabla);
}
/*FUNCION PARA DIBUJAR LA TABLA CON EL DETALLE DE LA ENCUESTA*/
function crearTablaDetalleMuestraConcesionario(datos,IdDiv){
    if(document.getElementById("tblDtMuestra")!=null){
       
        document.getElementById("tblDtMuestra").innerHTML="";
    }else{
        console.log(document.getElementById("tblDtMuestra"));
    }
    var r1=0;
    var r2=0;
    var r3=0;
    var r4=0;
    var t1=0;
    var t2=0;
    console.log(datos);
    var div=document.getElementById(IdDiv);
    var tabla=document.createElement("table");
    tabla.className="tblMuestra";
    div.innerHTML="";
    
    var fila=document.createElement("tr");
    
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Concesionario");
    celda.appendChild(txtNode);
    fila.appendChild(celda);
    
    
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Director");
    celda.appendChild(txtNode);
    fila.appendChild(celda);
    
    
    var celda=document.createElement("td");
    var txtNode=document.createTextNode(tUno);
    celda.appendChild(txtNode);
    fila.appendChild(celda);
    
    
    var celda=document.createElement("td");
    var txtNode=document.createTextNode(tDos);
    celda.appendChild(txtNode);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var txtNode=document.createTextNode(tTres);
    celda.appendChild(txtNode);
    fila.appendChild(celda);
    
    
    var celda=document.createElement("td");
    var txtNode=document.createTextNode(tCuatro);
    celda.appendChild(txtNode);
    fila.appendChild(celda);
    
    
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Total Concesionarios");
    celda.setAttribute("colspan","2");
    celda.appendChild(txtNode);
    fila.appendChild(celda);
    
    
    tabla.appendChild(fila);
    
    for(var i in datos){
        
        if(datos[i].NombreConcesionario!=undefined){ 
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var txtNode=document.createTextNode(datos[i].NombreConcesionario);
            celda.appendChild(txtNode);
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var txtNode=document.createTextNode(datos[i].Director);
            celda.appendChild(txtNode);
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var txtNode=document.createTextNode(datos[i].Uno);
            celda.appendChild(txtNode);
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var txtNode=document.createTextNode(datos[i].Dos);
            celda.appendChild(txtNode);
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var txtNode=document.createTextNode(datos[i].Tres);
            celda.appendChild(txtNode);
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var txtNode=document.createTextNode(datos[i].Cuatro);
            celda.appendChild(txtNode);
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var txtNode=document.createTextNode(datos[i].TotalMuestra);
            celda.appendChild(txtNode);
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var txtNode=document.createTextNode(datos[i].TotalPorcentaje);
            celda.appendChild(txtNode);
            fila.appendChild(celda);
            tabla.appendChild(fila);
            r1+=Number(datos[i].Uno);
            r2+=Number(datos[i].Dos);
            r3+=Number(datos[i].Tres);
            r4+=Number(datos[i].Cuatro);
            t1+=Number(datos[i].TotalMuestra);
            t2+=Number(datos[i].TotalPorcentaje);
        }
        
    }
    console.log(tabla);
    
    /*Aqui agregi totales*/
    
    
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    celda.setAttribute("colspan","2");
    celda.innerHTML="Total";
    fila.appendChild(celda);
    tabla.appendChild(fila);
    var celda=document.createElement("td");
    celda.innerHTML=formato_numero(r1,2,",",".");
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
    celda.innerHTML=formato_numero(r2,2,",",".");
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
     celda.innerHTML=formato_numero(r3,2,",",".");
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
    celda.innerHTML=formato_numero(r4,2,",",".");
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
    celda.innerHTML=formato_numero(t1,2,",",".");
    fila.appendChild(celda);
    tabla.appendChild(fila);
     var celda=document.createElement("td");
    celda.innerHTML=formato_numero(t2,2,",",".")+"%";
    fila.appendChild(celda);
    
    tabla.appendChild(fila);
   
    
    tabla.setAttribute("id","tblDtMuestra");
    div.appendChild(tabla);
}
//funcion para obtener los concesionarios
function concesionarioPorZona(){
    
    var sel=document.getElementById("selEncuestaReporte");
    var selConc=document.getElementById("selReporteConcesionario");
   var selItem=document.getElementById("selReporteZona");
    var hdInc=document.getElementById("hdIdEncuestaReporte");
    var hNombreEncusta=document.getElementById("hNombreEncusta");
   //alert(idEncuesta);
    if(hdInc.value!="0" &&  selItem.value!="--"){
        idZona=selItem.value;
        idConcesionario=0;
          //  var rep=new reporte("buscarConcPorZonaEnc",hdInc.value,selItem.value);
            var rep=new reporte("reporteDetalleMuestraConZona",idEncuesta,selItem.value);
            var respuesta=rep.metodo();
            respuesta.success(function(respServidor){
                var dtJson=eval(respServidor);
                //console.log(dtJson);
                if(selConc.length<1){
                    crearSelectConcesionarioReportes(selConc,dtJson);
               }else{
              //      alert(selItem.length);
                    selConc.innerHTML="";
                    crearSelectConcesionarioReportes(selConc,dtJson);
               }
            }).fail(function(){});
            
            
        }
}
//Funcion para cargar las encudestas finalizadas
function CargarSelectEncuestas(){
     if(this.value==undefined){
         var val=idFormulario;
         var get=true;
     }else{
         var val=this.value
         var get=false;
     }
     //alert(val);
    // var objselect=document.getElementById("selFormReporteMensual");
     if(get==true){
         var repor= new reporte("encuestasParaReporte");
   
        var respRepor=repor.metodo();
        respRepor.success(function(respServidor)
        {
          var sel=document.getElementById("selEncuestaReporte");  
          var dtJson=eval(respServidor);
          
          for(var i in dtJson){
              if(dtJson[i].IdEncuesta==idEncuesta){
                var dtJsonElemento=dtJson[i];   
              }
          }
         // console.log(dtJsonElemento);
         sel.innerHTML="";
         crearSelectEncuestasDos(sel,dtJson);
          
          
         sel.value=idEncuesta;
         
        }).fail(function(){
            
        });
     }else{
         var repor= new reporte("buscarEncuesta",val);
   
        var respRepor=repor.metodo();
        respRepor.success(function(respServidor)
        {
             var sel=document.getElementById("selEncuestaReporte");  
               sel.innerHTML="";
           if(respServidor!=false){
           console.log(respServidor);
            var dtJson=eval(respServidor);
            crearSelectEncuestas(sel,dtJson);
          
           }else{
               sel.innerHTML="";
               var opt=document.createElement("option");
               opt.value="0";
               opt.inneHTML="--No hay encuestas finalizadas--";
               sel.appendChild(opt);
           }
          
        }).fail(function(){
            
        });
     }
}
//funcion para obtener los valores de las zonas correspondientes a la encuesta 
function encuestaSeleccionada(){
    
    var sel=document.getElementById("selEncuestaReporte");
    var selConc=document.getElementById("selReporteConcesionario");
   var selItem=document.getElementById("selReporteZona");
    var hdInc=document.getElementById("hdIdEncuestaReporte");
    var hNombreEncusta=document.getElementById("hNombreEncusta");
    var div=document.getElementById("divReporte");
    var divMuestra=document.getElementById("divMuestra").innerHTML="";
    //alert(sel.value);
    document.getElementById("divRangosReporte").innerHTML="";
    cargarRangosReportes(sel.value);
  // hdInc.value=sel.value;
  idEncuesta=sel.value;
 // alert(idEncuesta);
    if(sel.value!="0"){
        
        console.log(idEncuesta);
        if(hNombreEncusta.childNodes.length>0){
           hNombreEncusta.innerHTML=""; 
        }
        var text=document.createTextNode(sel.options[sel.selectedIndex].text);
        hNombreEncusta.appendChild(text);
        
        
         if(idEncuesta!="0"){
            
              
            var rep=new reporte("buscarZonasPorEncuesta",idEncuesta);
            var respuesta=rep.metodo();
            respuesta.success(function(respServidor){
                var dtJson=eval(respServidor);
              
                if(selItem.length<1){
                    crearSelectZonasReportes(selItem,dtJson);
                     //crearSelectConcesionarioReportes(selConc);
                     
               }else{
              //      alert(selItem.length);
                    selItem.innerHTML="";
                    crearSelectZonasReportes(selItem,dtJson);
                     //crearSelectConcesionarioReportes(selConc);
               }
            }).fail(function(){});
            /*Aqui contruyo la estreuctura de la pagina*/
            var preguntas=new reporte("reporteEncuesta",idEncuesta);
            var respSer=preguntas.metodo();
            respSer.success(function(resSer){
                if(resSer!=false){
                    var dtJson=eval(resSer);
                    div.innerHTML="";
                    encuestaReporte(dtJson,div.id);
                }else{
                    alert("No hay coincidencias");
                    div.innerHTML="";
                }
               //encuestaReporteCopiaFuncional(dtJson,"divReporte");
               agregarEventoChbox();
            }).fail(function(){});
             
            
        }else{
            alert("seleccione una encuesta por favor");
        }
    }
    else if(sel.value == "0"){
        selConc.innerHTML="";
        selItem.innerHTML="";
        hNombreEncusta.innerHTML="";
         div.innerHTML="";
         
    } 
}
//funcion para obtener los valores de los rangos correspondientes a la encuesta 
function cargarRangosReportes(idEncuesta){
    var div=document.getElementById("divRangosReporte");
    div.innerHTML="";	
    var ran= new rangos("obtenerRangosEncuesta",idEncuesta);
    var resp=ran.metodo();
    resp.success(function(respSer){
        var dtJson=eval(respSer);
        for(var i in dtJson){
            
            
           
            var rUno=dtJson[i].Uno.split(",");
            var rDos=dtJson[i].Dos.split(",");
            var rTres=dtJson[i].Tres.split(",");
            var rCuatro=dtJson[i].Cuatro.split(",");
            
            tUno="Entre "+rUno[0]+" A "+rUno[1];
            tDos="Entre "+rDos[0]+" A "+rDos[1];
            tTres="Entre "+rTres[0]+" A "+rTres[1];
            tCuatro="Entre "+rCuatro[0]+" A "+rCuatro[1];
            
            
             var chbxUno=document.createElement("input");
             var lblUno=document.createElement("h4");    
	     var txtUno=document.createTextNode("Entre "+rUno[0]+" A "+rUno[1]);
             if(rUno[1]==84){
                 
                var rUnoDos=" A 84";
             }else{
                 var rUnoDos=" A "+rUno[1];
             }
             lblUno.appendChild(txtUno);
            // var inputUno=document.createElement("input");
	    // chbxUno.setAttribute("value","Uno");
             chbxUno.setAttribute("value",rUno[0]+rUnoDos);
             chbxUno.setAttribute("name","rango");
             chbxUno.setAttribute("id","Uno");
	     chbxUno.setAttribute("type","checkbox");	
             chbxUno.checked=true;
             //inputUno.setAttribute("id","txbRangoUno");
	     //div.appendChild(chbxUno);	
             //div.appendChild(lblUno);
             //div.appendChild(inputUno);
             
	     var chbxDos=document.createElement("input");
             var lblDos=document.createElement("h4");
             var txtDos=document.createTextNode("Entre "+rDos[0]+" y "+rDos[1]);
             lblDos.appendChild(txtDos);
             //var inputDos=document.createElement("input");
             //inputDos.setAttribute("id","txbRangoDos");
	     chbxDos.checked=true;
             //chbxDos.setAttribute("value","Dos");
             if(rDos[1]==84){
                 
                var rDosDos=" A 84";
             }else{
                 var rDosDos=" A "+rDos[1];
             }
             chbxDos.setAttribute("value",rDos[0]+rDosDos);
             chbxDos.setAttribute("name","rango");
             chbxDos.setAttribute("id","Dos");
	     chbxDos.setAttribute("type","checkbox");	
             //div.appendChild(chbxDos);	             
             //div.appendChild(lblDos);
             //div.appendChild(inputDos);
             
	     var chbxTres=document.createElement("input");
             var lblTres=document.createElement("h4");
             var txtTres=document.createTextNode("Entre "+rTres[0]+" y "+rTres[1]);
             lblTres.appendChild(txtTres);
             //var inputTres=document.createElement("input");
             //inputTres.setAttribute("id","txbRangoTres");
             chbxTres.checked=true;
             if(rTres[1]==84){
                 
                var rTresDos=" A 84";
             }else{
                 var rTresDos=" A "+rTres[1];
             }
             //chbxTres.setAttribute("value","Tres");
             chbxTres.setAttribute("value",rTres[0]+rTresDos);
             chbxTres.setAttribute("id","Tres");
             chbxTres.setAttribute("name","rango");
	     chbxTres.setAttribute("type","checkbox");	
             //div.appendChild(chbxTres);	             
	     //div.appendChild(lblTres);
             //div.appendChild(inputTres);
             
             var chbxCuatro=document.createElement("input");
             var lblCuatro=document.createElement("h4");
             var txtCuatro=document.createTextNode("Entre "+rCuatro[0]+" y "+rCuatro[1]);
             chbxCuatro.setAttribute("id","Cuatro");
             lblCuatro.appendChild(txtCuatro);             
             //var inputCuatro=document.createElement("input");
             //inputCuatro.setAttribute("id","txbRangoCuatro");
	     //chbxCuatro.setAttribute("value","Cuatro");
             if(rCuatro[1]==84){
                 
                var rCuatroDos=" A 84";
             }else{
                 var rCuatroDos=" A "+rCuatro[1];
             }
             chbxCuatro.setAttribute("value",rCuatro[0]+rCuatroDos);
             chbxCuatro.setAttribute("name","rango");
             chbxCuatro.checked=true;
	     chbxCuatro.setAttribute("type","checkbox");	
	     //div.appendChild(chbxCuatro);	
             //div.appendChild(lblCuatro);
             //div.appendChild(inputCuatro);
        }
    }).fail(function(){});
}


/**GRAFICOS
 * 
 * */
function dibujarGraficosReporte(){
   
        var sel=document.getElementById("selTipoGrafico");
       
        if(sel!=null){
            var s=sel.value;
        }else{
            var s="Columana";
        }
        
        switch(s){
            case "Columna":
                dibujarReporteGeneralColumnas();
                break;
            case "Torta":
                dibujarReporteGeneralTorta();
                break;
            case "Torta3D":
                dibujarReporteGeneralTorta3D();
                break;
            case "Dona":
                dibujarReporteGeneralDona();
                break;
            default:
                dibujarReporteGeneral();
                break;
            
            
                
        }
    
    
}
function dibujarReporteGeneralColumnas(){
    var datos=listaReporteGeneralPreguntas;
    var datosGraficos={
        label:"",
        datos:[]
    };
    
    var a=0;
    for(var e in datos){
        var datoGrafico=[];
    
        for(var a in datos[e]){
    //            console.log(datos[e][a]);
            var mTotal=document.getElementById("mTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(mTotal!=null){
                mTotal.innerHTML="";
                mTotal.innerHTML=datos[e][a].Muestra;
            }
            console.log(mTotal);
            var pTotal=document.getElementById("pTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(pTotal!=null){
                pTotal.innerHTML="";        
                pTotal.innerHTML=datos[e][a].PorcentajeGeneral;
            }
            console.log(pTotal);
        
            var d1=datos[e][a].Respuesta;
            var d2=Number(datos[e][a].Muestra);   
            var dt=[];
            dt.push(d1);
            dt.push(d2);
            datoGrafico.push(dt);
        
            datosGraficos[e]=  datoGrafico;
            datosGraficos[e].label=datos[e][a].ArgumentoPregunta;
            datosGraficos[e].idRespuesta=datos[e][a].Fk_Respuesta_Pregunta;
            
        }
    
        
    }
        console.log(datosGraficos);
  
 
   for(var o in datosGraficos){
        console.log(o);
        console.log(datosGraficos[o]);
        
         var opciones={
             title: datosGraficos[o].label,
             width:200,
             bar:{groupWidth:'35%'}
         };
         var dGrafico=new google.visualization.DataTable();
         dGrafico.addColumn("string","Element");
         dGrafico.addColumn("number","Percentage");
         console.log(datosGraficos[o]);
         dGrafico.addRows(datosGraficos[o]);       
         
         var grafico=new google.visualization.ColumnChart(document.getElementById('divGrafico_'+o));
         grafico.draw(dGrafico,opciones);
       //dibujarGrafico(datosGraficos,document.getElementById('divGrafico_'+o),opciones,"Columna");
    }
    
    
}
function dibujarReporteGeneralTorta(){
    var datos=listaReporteGeneralPreguntas;
    var datosGraficos={
        label:"",
        datos:[['respuesta','pregunta']]
    };
    
    var a=0;
    for(var e in datos){
        var datoGrafico=[];
        
        for(var a in datos[e]){
    //            console.log(datos[e][a]);
            var mTotal=document.getElementById("mTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(mTotal!=null){
                mTotal.innerHTML="";
                mTotal.innerHTML=datos[e][a].Muestra;
            }
            console.log(mTotal);
            var pTotal=document.getElementById("pTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(pTotal!=null){
                pTotal.innerHTML="";        
                pTotal.innerHTML=datos[e][a].PorcentajeGeneral;
            }
            console.log(pTotal);
            var dt=[];
            var d1=datos[e][a].Respuesta;
            var d2=Number(datos[e][a].Muestra);   
            
            dt.push(d1);
            dt.push(d2);
            datoGrafico.push(dt);
            console.log(datoGrafico);
            datosGraficos[e]=  datoGrafico;
            datosGraficos[e].label=datos[e][a].ArgumentoPregunta;
            datosGraficos[e].idRespuesta=datos[e][a].Fk_Respuesta_Pregunta;
            datosGraficos.datos.push(dt);
        }
    
        
    }
        console.log(datosGraficos);
  
 
   for(var o in datosGraficos){
        console.log(o);
        console.log(datosGraficos[o]);
        
         var opciones={
             title: datosGraficos[o].label,
             width:200,
             backgroundColor:'#BDBDBD',
                    colors: ['1B4DD7','0CE010', '071C57','E00C1B','E0DC0C','0CE06F'],
                    axes: {
                        x: {
                          0: { side: 'top', label: 'White to move'} // Top x-axis.
                        }
                      },
                    bar:{groupWidth:'90%'}  
         };
         var dGrafico=new google.visualization.arrayToDataTable(datosGraficos[o]);
         /*dGrafico.addColumn("string","Element");
         dGrafico.addColumn("number","Percentage");
         console.log(datosGraficos[o]);
         dGrafico.addRows(datosGraficos[o]);       */
         
         var grafico=new google.visualization.PieChart(document.getElementById('divGrafico_'+o));
         grafico.draw(dGrafico,opciones);
       //dibujarGrafico(datosGraficos,document.getElementById('divGrafico_'+o),opciones,"Columna");
    }
    
    
}
function dibujarReporteGeneralTorta3D(){
    var datos=listaReporteGeneralPreguntas;
    var datosGraficos={
        label:"",
        datos:[]
    };
    
    var a=0;
    for(var e in datos){
        var datoGrafico=[];
    
        for(var a in datos[e]){
    //            console.log(datos[e][a]);
            var mTotal=document.getElementById("mTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(mTotal!=null){
                mTotal.innerHTML="";
                mTotal.innerHTML=datos[e][a].Muestra;
            }
            console.log(mTotal);
            var pTotal=document.getElementById("pTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(pTotal!=null){
                pTotal.innerHTML="";        
                pTotal.innerHTML=datos[e][a].PorcentajeGeneral;
            }
            console.log(pTotal);
        
            var d1=datos[e][a].Respuesta;
            var d2=Number(datos[e][a].Muestra);   
            var dt=[];
            dt.push(d1);
            dt.push(d2);
            datoGrafico.push(dt);
        
            datosGraficos[e]=  datoGrafico;
            datosGraficos[e].label=datos[e][a].ArgumentoPregunta;
            datosGraficos[e].idRespuesta=datos[e][a].Fk_Respuesta_Pregunta;
            
        }
    
        
    }
        console.log(datosGraficos);
  
 
   for(var o in datosGraficos){
        console.log(o);
        console.log(datosGraficos[o]);
        
         var opciones={
             title: datosGraficos[o].label,
             width:200,
             bar:{groupWidth:'35%'}
         };
         var dGrafico=new google.visualization.DataTable();
         dGrafico.addColumn("string","Element");
         dGrafico.addColumn("number","Percentage");
         console.log(datosGraficos[o]);
         dGrafico.addRows(datosGraficos[o]);       
         
         var grafico=new google.visualization.ColumnChart(document.getElementById('divGrafico_'+o));
         grafico.draw(dGrafico,opciones);
       //dibujarGrafico(datosGraficos,document.getElementById('divGrafico_'+o),opciones,"Columna");
    }
    
    
}
function dibujarReporteGeneralDona(){
    var datos=listaReporteGeneralPreguntas;
    var datosGraficos={
        label:"",
        datos:[]
    };
    
    var a=0;
    for(var e in datos){
        var datoGrafico=[];
    
        for(var a in datos[e]){
    //            console.log(datos[e][a]);
            var mTotal=document.getElementById("mTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(mTotal!=null){
                mTotal.innerHTML="";
                mTotal.innerHTML=datos[e][a].Muestra;
            }
            console.log(mTotal);
            var pTotal=document.getElementById("pTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(pTotal!=null){
                pTotal.innerHTML="";        
                pTotal.innerHTML=datos[e][a].PorcentajeGeneral;
            }
            console.log(pTotal);
        
            var d1=datos[e][a].Respuesta;
            var d2=Number(datos[e][a].Muestra);   
            var dt=[];
            dt.push(d1);
            dt.push(d2);
            datoGrafico.push(dt);
        
            datosGraficos[e]=  datoGrafico;
            datosGraficos[e].label=datos[e][a].ArgumentoPregunta;
            datosGraficos[e].idRespuesta=datos[e][a].Fk_Respuesta_Pregunta;
            
        }
    
        
    }
        console.log(datosGraficos);
  
 
   for(var o in datosGraficos){
        console.log(o);
        console.log(datosGraficos[o]);
        
         var opciones={
             title: datosGraficos[o].label,
             width:200,
             bar:{groupWidth:'35%'}
         };
         var dGrafico=new google.visualization.DataTable();
         dGrafico.addColumn("string","Element");
         dGrafico.addColumn("number","Percentage");
         console.log(datosGraficos[o]);
         dGrafico.addRows(datosGraficos[o]);       
         
         var grafico=new google.visualization.ColumnChart(document.getElementById('divGrafico_'+o));
         grafico.draw(dGrafico,opciones);
       //dibujarGrafico(datosGraficos,document.getElementById('divGrafico_'+o),opciones,"Columna");
    }
    
    
}
function dibujarReporteGeneral(){
    var datos=listaReporteGeneralPreguntas;
    var datosGraficos={
        label:"",
        datos:[]
    };
    
    var a=0;
    for(var e in datos){
        var datoGrafico=[];
    
        for(var a in datos[e]){
    //            console.log(datos[e][a]);
            var mTotal=document.getElementById("mTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(mTotal!=null){
                mTotal.innerHTML="";
                mTotal.innerHTML=datos[e][a].Muestra;
            }
            console.log(mTotal);
            var pTotal=document.getElementById("pTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(pTotal!=null){
                pTotal.innerHTML="";        
                pTotal.innerHTML=datos[e][a].PorcentajeGeneral;
            }
            console.log(pTotal);
        
            var d1=datos[e][a].Respuesta;
            var d2=Number(datos[e][a].Muestra);   
            var dt=[];
            dt.push(d1);
            dt.push(d2);
            datoGrafico.push(dt);
        
            datosGraficos[e]=  datoGrafico;
            datosGraficos[e].label=datos[e][a].ArgumentoPregunta;
            datosGraficos[e].idRespuesta=datos[e][a].Fk_Respuesta_Pregunta;
            
        }
    
        
    }
        console.log(datosGraficos);
  
 
   for(var o in datosGraficos){
        console.log(o);
        console.log(datosGraficos[o]);
        
         var opciones={
             title: datosGraficos[o].label,
             width:200,
             bar:{groupWidth:'35%'}
         };
         var dGrafico=new google.visualization.DataTable();
         dGrafico.addColumn("string","Element");
         dGrafico.addColumn("number","Percentage");
         console.log(datosGraficos[o]);
         dGrafico.addRows(datosGraficos[o]);       
         
         var grafico=new google.visualization.ColumnChart(document.getElementById('divGrafico_'+o));
         grafico.draw(dGrafico,opciones);
       //dibujarGrafico(datosGraficos,document.getElementById('divGrafico_'+o),opciones,"Columna");
    }
    
    
}
