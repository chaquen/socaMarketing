function Iniciar(){
   document.getElementById("selEncuesta").addEventListener("change",obtenerRealizadas,false);
   //document.getElementById("").addEventListener("",,false);
   cargarEncuestasEnProceso();
}
function obtenerRealizadas(){
    var sel=document.getElementById("selEncuesta");
    var tabla=document.getElementById("tblConsEncUsu");

    if(sel.value!="0"){
        var usCant=new reporte("obtenerRealizadasUsuarios",sel.value);
        var res=usCant.metodo();
        res.success(function(respServ){
            var dtJson=eval(respServ);
            tablaUsuariopoEnc(dtJson);
        }).fail(function(){});
    }else{
          tabla.innerHTML="";
    }
}
function tablaUsuariopoEnc(datos){
    var tabla=document.getElementById("tblConsEncUsu");
    
    if(tabla.childNodes.length>0){
        tabla.innerHTML="";
    }
    var thead=document.createElement("thead"); 
    
    var celda=document.createElement("td");
    var lblUsr=document.createElement("label");
    var txt=document.createTextNode("Usuario");
    lblUsr.appendChild(txt);
    celda.appendChild(lblUsr);
    thead.appendChild(celda);
    
    var celda=document.createElement("td");
    var lblAsig=document.createElement("label");
    var txt=document.createTextNode("Asignadas");
    lblAsig.appendChild(txt);
    celda.appendChild(lblAsig);
    thead.appendChild(celda);
    
    var celda=document.createElement("td");
    var lblReal=document.createElement("label");
    var txt=document.createTextNode("Realizadas");
    lblReal.appendChild(txt);
    celda.appendChild(lblReal);
    thead.appendChild(celda);
    
    var celda=document.createElement("td");
    var lblUsr=document.createElement("label");
    var txt=document.createTextNode("Inicio de sesion");
    lblUsr.appendChild(txt);
    celda.appendChild(lblUsr);
    thead.appendChild(celda);
    tabla.appendChild(thead);
    
    
    for(var i in datos){
      var fila=document.createElement("tr"); 
      
      var celda=document.createElement("td");
      var lbl=document.createElement("label");
      var txt=document.createTextNode(datos[i].Nombre);
      lbl.appendChild(txt);
      celda.appendChild(lbl);
      fila.appendChild(celda);
      
      var celda=document.createElement("td");
      var lbl=document.createElement("label");
      var txt=document.createTextNode(datos[i].AsignadasUsuario);
      lbl.appendChild(txt);
      celda.appendChild(lbl);
      fila.appendChild(celda);
      
      var celda=document.createElement("td");
      var lbl=document.createElement("label");
      var txt=document.createTextNode(datos[i].RealizadasUsuario);
      lbl.appendChild(txt);
      celda.appendChild(lbl);
      fila.appendChild(celda);
      tabla.appendChild(fila); 
      
      var celda=document.createElement("td");
      var lbl=document.createElement("label");
      var txt=document.createTextNode(datos[i].UltimaActividad);
      lbl.appendChild(txt);
      celda.appendChild(lbl);
      fila.appendChild(celda);
      tabla.appendChild(fila);
    }
    
}

function cargarEncuestasEnProceso(){
        var enc= new encuesta("obtenerEncuestaEnProceso","","");
    var resPen=enc.metodo();
    resPen.success(function(respSer){
        var sel=document.getElementById("selEncuesta");
      
        if(respSer!="No hay coincidencias"){
            var dtJs=eval(respSer);
            crearSelectEncuestas(sel,dtJs);
      
        }else{
            alert(respSer);
        }
    }).fail(function(){});
}

window.addEventListener("load",Iniciar,false);