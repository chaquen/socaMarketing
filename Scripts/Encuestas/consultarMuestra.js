var idMuestra;
function Iniciar(){
//    alert("Hola");

   var valoresGet=recibirValorGet();
   if(valoresGet["idM"]!=undefined){
     //  alert(valoresGet["idM"]);
       document.getElementById("selMuestras").style.display='none';
       document.getElementById("anclaExportar").style.display='none';
       idMuestra=valoresGet["idM"];
        cargarMuestra();
   }else{
      // alert("sin get");
       cargarSelectMuestra(); 
       document.getElementById("selMuestras").addEventListener("change",cargarMuestra,false);
        document.getElementById("selMuestras").addEventListener("change",crearBtnEliminarMuestra,false);
       document.getElementById("anclaExportar").style.display='none';
   }
   
}
function crearBtnEliminarMuestra(){
    var divConsultaMuestra=document.getElementById("divConsultaMuestra");
    divConsultaMuestra.innerHTML="";
    var btnEliminar=document.createElement("input");
    btnEliminar.setAttribute("type","button");
    btnEliminar.setAttribute("value","Eliminar la base de datos "+this[this.selectedIndex].text);
    btnEliminar.setAttribute("onclick","eliminarMuestra("+this.value+");");
    divConsultaMuestra.appendChild(btnEliminar);
   
}
function eliminarMuestra(idMuestra){
    if(confirm("Esta seguro de eliminar esta base de datos")){
       var mt=new muestra("elminarMuestra",idMuestra);
        var respuesta=mt.metodo();
        respuesta.success(function(respuestaServidor){
            if(respuestaServidor){
                alert("Base de datos eliminada con exito");
                location.reload();
            }else{
                alert("No se ha podido eliminar la base de datos puede que este asociada a una encuesta");
            }
        }).fail(function(){}); 
    }
}
function cargarSelectMuestra(){
    var mt=new muestra("consultarTodasLasMuestra",this.value);
    var respuesta=mt.metodo();
    respuesta.success(function(respuestaServidor){
        if(respuestaServidor!=false){
            var dtJson=eval(respuestaServidor);
            var sel=document.getElementById("selMuestras");
            sel.innerHTML="";
            crearSelectMuestraDos(sel,dtJson);
            
            document.getElementById("anclaExportar").style.display='block';
        }else{
            alert("No hay muestras ");
            //location.href="/menuAdministrador.html";
        }
        
    }).fail(function(){}); 
} 
function cargarMuestra(){
    
    if(idMuestra!=undefined){
        var valor=idMuestra;
    }else{
        var valor=this.value;
    }
    
   // alert(valor);
    var mt=new muestra("consultarMuestra",valor);
    var respuesta=mt.metodo();
    respuesta.success(function(respuestaServidor){
       if(respuestaServidor!=false){
           var dtJson=eval(respuestaServidor);
            crearTablaMuestra(dtJson,"divMuestra");
       }
    }).fail(function(){});
}
function crearTablaMuestra(datos,idDiv){
    
    var tabla=document.getElementById(idDiv);
    console.log(tabla);
    tabla.innerHTML="";
   // var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var fila=document.createElement("tr");

    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("#");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Nombre");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Parentesco");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Telefono");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Telefono");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Celular");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Celular");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Cupo");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Contrato");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Ciudad");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Concesionario");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Codigo Asesor");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Asesor");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Codigo vendedor");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Cuotas pagas");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Cuotas en mora");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Rango");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    var celda=document.createElement("td");
    var h=document.createElement("h3");
    var txt=document.createTextNode("Estado");
    h.appendChild(txt);
    celda.appendChild(h);
    fila.appendChild(celda);
    
    thead.appendChild(fila);
    tabla.appendChild(thead);
    var a=1;
    for(var i in datos){
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(a);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        
        
        //var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].Nombre);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
       
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].Parentesco);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].TelUno);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
       
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].TelDos);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].CelUno);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].CelDos);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].CelTres);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].Cupo);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].Ciudad);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].NombreConcesionario);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].CodAsesor);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].Asesor);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].CodVendedor);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].CuotasPagas);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].CuotasMora);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].rango);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        var txt=document.createTextNode(datos[i].EstadoMuestra);
        h.appendChild(txt);
        celda.appendChild(h);
        fila.appendChild(celda);
        
        a++;
        tabla.appendChild(fila);
        
    }
    //div.appendChild(tabla);
    
}



window.addEventListener("load",Iniciar,false);