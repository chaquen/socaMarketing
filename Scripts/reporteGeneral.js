var listaReportePregunta;
window.addEventListener("load",iniciarReporteGeneral,false);
var v;

function iniciarReporteGeneral(){
    
    
    v=recibirValorGet();
    console.log(v);
    obtenerReporteG(v);
    
    
}
function obtenerReporteG(v){
     
    
   
    
    
    var preguntaGeneral=new reporte("reporteGeneralPreguntaEspecifico",v.enc,v.pre);
    var respuesta=preguntaGeneral.metodo();
    respuesta.success(function(respuestaServidor){
        var datos=eval(respuestaServidor);
        //console.log(respuestaServidor);
        listaReportePregunta=datos;        
        //console.log(listaReportePregunta[0].TipoPregunta);
        
        switch(listaReportePregunta[0].TipoPregunta){
            case "Abierta":
                dibujarTablaReporteGeneralAbierta(listaReportePregunta);

                break;               
            case "Rankin":
                dibujarTablaReporteGeneralRankin(listaReportePregunta);
                
                break;
            case "Cerrada":
                dibujarTablaReporteGeneral(listaReportePregunta);
                dibujarPreguntasReporteGeneral(listaReportePregunta,"divReporteGrafico");
                break;            
             case "AbiertaCategoria":
                dibujarTablaReporteGeneral(listaReportePregunta[0].general);
                dibujarTablaReporteGeneralAbiertaCategoria(listaReportePregunta[0].comentario);
                dibujarPreguntasReporteGeneral(listaReportePregunta[0],"divReporteGrafico");
                break;   
            case "CerradaComentario":
                dibujarTablaReporteGeneral(listaReportePregunta[0].general);
                dibujarTablaReporteGeneralAbiertaCategoria(listaReportePregunta[0].comentario);     
                dibujarPreguntasReporteGeneral(listaReportePregunta[0],"divReporteGrafico");
                break;
            case "CerradaMultiple":
                dibujarTablaReporteGeneral(listaReportePregunta);
                dibujarPreguntasReporteGeneral(listaReportePregunta,"divReporteGrafico");
               
                
                
                break;
            default :
                console.log(listaReportePregunta);
                break;
                
        }
        
        
        
    }).fail(function(){});
    
}

function dibujarTablaReporteGeneral(d){
    var divReportGeneral=document.getElementById("divReportGeneral");
    var tabla=document.createElement("table");
    var fila=document.createElement("tr");
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML=d[0].ArgumentoPregunta;
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Numero de respuestas";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Porcentaje";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    
    tabla.appendChild(fila);
     divReportGeneral.appendChild(tabla);
    for(var e in d){
        console.log(d[e]);
        var fila=document.createElement("tr");
        
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].Respuesta;
        celda.appendChild(h4);
        fila.appendChild(celda);
           
       
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].Muestra;
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=formato_numero(d[e].PorcentajeGeneral,"0",".",",")+"%";
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        tabla.appendChild(fila);
        
    }
    divReportGeneral.appendChild(tabla);
}
function dibujarTablaReporteGeneralRankin(d){
    var divReportGeneral=document.getElementById("divReportGeneral");
    var tabla=document.createElement("table");
    var fila=document.createElement("tr");
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML=d[0].ArgumentoPregunta;
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Orden";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Numero de respuestas";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    tabla.appendChild(fila);
     divReportGeneral.appendChild(tabla);
    for(var e in d){
        console.log(d[e]);
        var fila=document.createElement("tr");
        
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].Respuesta;
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].ComentarioUsuario;
        celda.appendChild(h4);
        fila.appendChild(celda);
        
       
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].Muestra;
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        tabla.appendChild(fila);
        
    }
    divReportGeneral.appendChild(tabla);
}
function dibujarTablaReporteGeneralAbierta(d){
    console.log(d);
    var divReportGeneral=document.getElementById("divReportGeneral");
    

    var tabla=document.createElement("table");
    var fila=document.createElement("tr");
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML=d[0].ArgumentoPregunta;
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Muestra";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Respuesta";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    tabla.appendChild(fila);
     divReportGeneral.appendChild(tabla);
    for(var e in d){
        console.log(d[e]);
        var fila=document.createElement("tr");
        
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].ComentarioUsuario;
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].Muestra;
        celda.appendChild(h4);
        fila.appendChild(celda);
        
       var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].PorcentajeGeneral+" %";
        celda.appendChild(h4);
        fila.appendChild(celda);
       
        
        
        
        tabla.appendChild(fila);
        
    }
    divReportGeneral.appendChild(tabla);
     
    google.charts.setOnLoadCallback(dibujarReporteGeneralAbierta);
}
function dibujarTablaReporteGeneralAbiertaCategoria(d){
    console.log(d);
    var divReportGeneral=document.getElementById("divReportGeneral");
    var tabla=document.createElement("table");
    var fila=document.createElement("tr");
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML=d[0].ArgumentoPregunta;
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Opcion";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Muestra";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h4=document.createElement("h4");
    h4.innerHTML="Porcentaje";
    celda.appendChild(h4);
    fila.appendChild(celda);
    
    tabla.appendChild(fila);
     divReportGeneral.appendChild(tabla);
    for(var e in d){
        console.log(d[e]);
        var fila=document.createElement("tr");
        
        
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].ComentarioUsuario;
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].Respuesta;
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].Muestra;
        celda.appendChild(h4);
        fila.appendChild(celda);
       
       
        
        var celda=document.createElement("td");
        var h4=document.createElement("h4");
        h4.innerHTML=d[e].PorcentajeGeneral+" %";
        celda.appendChild(h4);
        fila.appendChild(celda);
        
        tabla.appendChild(fila);
        
    }
    divReportGeneral.appendChild(tabla);
    //google.charts.setOnLoadCallback(dibujarReporteGeneral);
}
function dibujarPreguntasReporteGeneral(datos,div){
    var div=document.getElementById(div);
    console.log(div);
    console.log(datos);
    div.innerHTML="";
    var a=1;
    if(datos.general==undefined){
        var d=datos;
    }else{
        var d=datos.general;
    }
    
    //for(var i in d){
        console.log(d[0]);
        var divDos=document.createElement("div");           
        var h4=document.createElement("h4");
        h4.innerHTML=(1)+" "+d[0].ArgumentoPregunta;
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
        
        var canvasGrafico=document.createElement("div");
        canvasGrafico.setAttribute("id","divGrafico_"+d[0].Fk_Respuesta_Pregunta);
        divDos.appendChild(canvasGrafico);
        div.appendChild(divDos);
        
        console.log(canvasGrafico);
        
        
        
    //}
    
    //console.log(div);
    google.charts.setOnLoadCallback(dibujarReporteGeneral);
}
function dibujarReporteGeneral(){
    console.log(listaReportePregunta);
    if(listaReportePregunta[0].general==undefined){
        var datos=listaReportePregunta;
    }else{
        var datos=listaReportePregunta[0].general;
    }
    
    
    console.log(datos);
    var datosGraficos={
        label:"",
        datos:[['respuesta','pregunta']]
               
    };
    
    var a=0;
    for(var e in datos){
        var datoGrafico=[];
    
       // for(var a in datos[e]){
    //            console.log(datos[e][a]);
            /*var mTotal=document.getElementById("mTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(mTotal!=null){
                mTotal.innerHTML="";
                mTotal.innerHTML=datos[e][a].Muestra;
            }
            
            var pTotal=document.getElementById("pTotal_"+datos[e][a].Fk_Respuesta_Pregunta);
            if(pTotal!=null){
                pTotal.innerHTML="";        
                pTotal.innerHTML=datos[e][a].PorcentajeGeneral;
            }*/
            
        
            var d1=datos[e].Respuesta;
            var d2=Number(datos[e].Muestra);   
            
            var dt=[];
            dt.push(d1);
            dt.push(d2);
            
            datoGrafico.push(dt);
                
            datosGraficos[e]=  datoGrafico;
            datosGraficos[e].label=datos[e].ArgumentoPregunta;
            datosGraficos[e].idRespuesta=datos[e].Fk_Respuesta_Pregunta;
            datosGraficos.datos.push(dt);    
        //}
    
        
    }
        console.log(datosGraficos);
        console.log(datosGraficos.datos);
  
 
   for(var o in datosGraficos){
        //console.log(o);
        //console.log(document.getElementById('divGrafico_'+datosGraficos[o].idRespuesta));
        //console.log(datosGraficos[o]);
        //console.log(datosGraficos[o].label);
         var opciones={
             titulo: datosGraficos[o].label,
             ancho:1000,
             bar:{groupWidth:'35%'},
             legend:{position:'none'},
             es3D:true,
             hoyo:0.4
         };
        
         /*var dGrafico=new google.visualization.DataTable();
         dGrafico.addColumn("string","Element");
         dGrafico.addColumn("number","Percentage");*/
         
         if(datosGraficos[o].label!=undefined){
             //dGrafico.addRows(datosGraficos[o]);       
         
            /*var grafico=new google.visualization.ColumnChart(document.getElementById('divGrafico_'+datosGraficos[o].idRespuesta));
            grafico.draw(dGrafico,opciones);*/
            console.log(datosGraficos);
            dibujarGrafico(datosGraficos,document.getElementById('divGrafico_'+datosGraficos[o].idRespuesta),opciones,document.getElementById('selTipoGrafico').value);
            console.log(document.getElementById('divGrafico_'+datosGraficos[o].idRespuesta));
         }else{
             console.log(datosGraficos[o]);
         }
         
       
    }
    
    
}
function dibujarPreguntasReporteGeneralAbierta(datos,div){
    var div=document.getElementById(div);
    console.log(div);
    console.log(datos);
    div.innerHTML="";
    var a=1;
    
        console.log(datos[0]);
        var divDos=document.createElement("div");           
        var h4=document.createElement("h4");
        h4.innerHTML=(a)+" "+datos[0].ArgumentoPregunta;
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
        
        var canvasGrafico=document.createElement("div");
        canvasGrafico.setAttribute("id","divGrafico_"+datos[0].Fk_Respuesta_Pregunta);
        divDos.appendChild(canvasGrafico);
        div.appendChild(divDos);
        
        console.log(canvasGrafico);
        
        
        
    
    
    //console.log(div);
    google.charts.setOnLoadCallback(dibujarReporteGeneralAbierta);
}
function dibujarReporteGeneralAbierta(){
    var  datos=listaReportePregunta;
    
    console.log(datos);
    var datosGraficos={
        label:"",
        datos:[['Pregunta','Respuesta']]
    };
    
    var a=0;
    for(var e in datos){
        var datoGrafico=[];
    
            
            var d1=datos[e].ComentarioUsuario;
            console.log(d1);
            var d2=Number(datos[e].Muestra);   
            console.log(d2);
            var dt=[];
            dt.push(d1);//clave
            dt.push(d2);//valor
            datoGrafico.push(dt);
        
            datosGraficos[e]=  datoGrafico;
            datosGraficos[e].label=datos[e].ArgumentoPregunta;
            datosGraficos[e].idRespuesta=datos[e].Fk_Respuesta_Pregunta;
     
        
    }
        console.log(datosGraficos);
         var opciones={
             titulo: datosGraficos[0].label,
             ancho:1000,
             bar:{groupWidth:'35%'},
             legend:{position:'none'},
             es3D:true,
             hoyo:0.4
         };
        
        
         
         if(datosGraficos[0].label!=undefined){
            console.log("--");
            dibujarGrafico(datosGraficos,document.getElementById('divGrafico_'+datosGraficos[0].idRespuesta),opciones,document.getElementById('selTipoGrafico').value);
           
         }else{
             console.log(datosGraficos[0]);
         } 
}
