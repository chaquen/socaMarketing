var tipoOperador="";
function iniciarZonas(){
    cargarZona();
    ZonaBuscar();
    cargarConcesionarioZona();
   // document.getElementById("editar").style.display='none';
    document.getElementById("btnCrearZona").addEventListener("click",crearZona,false);
    document.getElementById("btnCrearConcesionario").addEventListener("click",crearConcesionario,false);
    document.getElementById("selBuscarZona").addEventListener("change",buscarConcesionario,false);
    document.getElementById("selBuscarZona").addEventListener("change",cargarConcesionarioZona,false);
    document.getElementById("selBuscarConc").addEventListener("change",buscarConcesionario,false);
  //  document.getElementById("btnEditar").addEventListener("click",editar,false);
  //  document.getElementById("txbDirector").addEventListener("change",hola,false);
}
function buscarConcesionario(){
    //     document.getElementById("editar").style.display='none';
         document.getElementById("divConcesionarios").style.display='block';

       switch(this.id){
           case "selBuscarZona":
               if(this.value=="T"){
                   var Zn=new zona("TodasLasZonas","");
                var respZn=Zn.metodo();
                respZn.success(function(respServidor){
                    //var sel=document.getElementById("selZona");
                    var dtJson=eval(respServidor);
                    crearTablaZonas(dtJson);
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
function ZonaBuscar(){
  
        var Zn=new zona("TodasLasZonas","");
        var respZn=Zn.metodo();
        respZn.success(function(respServidor){
            var sel=document.getElementById("selBuscarZona");
            var dtJson=eval(respServidor);
            crearSelectZonas(sel,dtJson);
        }).fail(function(){});
}
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
function cargarZona(){
   
        var Zn=new zona("TodasLasZonas","");
        var respZn=Zn.metodo();
        respZn.success(function(respServidor){
            var sel=document.getElementById("selZona");
            sel.innerHTML="";
            var dtJson=eval(respServidor);
            crearSelectZonas(sel,dtJson);
        }).fail(function(){});
}
function cargarConcesionarioZona(){
  //alert("Hola zn");
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

function editarZona(id,nombre,director,tipo){
    /*alert(id);
    alert(nombre);
    alert(director);
    alert(tipo);*/
    tipoOperador=tipo;
    var div=document.getElementById("divConcesionarios");
     document.getElementById("nombre").innerHTML="";
     document.getElementById("nombre").innerHTML=nombre;
    div.style.display='none';
    document.getElementById("editar").style.display='block';
    document.getElementById("hdIdEditar").value=id;
   // document.getElementById("txbNombre").value=nombre;   
   //document.getElementById("txbDirector").value=""+director+"";
}
function editarConcesionario(id,nombre,director,tipo){
    /*alert(id);
    alert(nombre);
    alert(director);
    alert(tipo);*/
    tipoOperador=tipo;
    var div=document.getElementById("divConcesionarios");
    div.style.display='none';
    document.getElementById("editar").style.display='block';
   document.getElementById("hdIdEditar").value=id;
   document.getElementById("nombre").innerHTML="";
   document.getElementById("nombre").innerHTML=nombre;
   document.getElementById("director").innerHTML="";
   document.getElementById("director").innerHTML=director;
   // document.getElementById("txbNombre").value=nombre;
   //document.getElementById("txbDirector").value=""+director+"";
}
function editar(){
    //document.getElementById("txbDirector").value="";
    //document.getElementById("nombre").value="";
    alert(document.getElementById("txbNombreEditar").value);
    alert(document.getElementById("txbDirectorEditar").value);
    alert(document.getElementById("hdIdEditar").value);
    switch(tipoOperador){
        case "Concesionario":
            
            alert(document.getElementById("txbNombreEditar").value);
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
             alert(document.getElementById("txbNombreEditar").value);
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
             var zn=new zona("editarZona", nuevoNombre,nuevoDirector, document.getElementById("hdIdEditar").value);
            var respuesta=zn.metodo();
            respuesta.success(function(res){
                if(res){
                    alert("Zona editada con exito");
                    
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
        default:
            alert("Ha ocurrido un error por favor intente nuevamente la operación");
            break;    
    }
}
//window.addEventListener("load",Iniciar,false);

