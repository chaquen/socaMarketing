function Iniciar(){
    recibirValor();
}
function aceptar(idMuestra){
    var idUser=document.getElementById("hdIdUsuario");
    var idEnc=document.getElementById("hdIdEncuesta");
    var rango=document.getElementById(idMuestra);
    
    
    window.location="/Vista/Encuestas/Asesor/registrarEncuesta.html?nomEnc="+idEnc.value+"&nomUser="+idUser.value+"&idMues="+idMuestra+"&rango="+rango.name;
    
    
    
    
    /*ENVIAR A ENTREVISTA*/
    
   // alert(idMuestra);
}
function cancelar(idMuestra){
    //alert(idMuestra);
    /*ELIMINRA DE LA LISTA*/
}

function hacerEncuesta(idMuestra){
    
}

function recibirValor(){
    var idUser=document.getElementById("hdIdUsuario");
    var idEnc=document.getElementById("hdIdEncuesta");
  
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};
   
    for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
    }
    if (params['nomEnc']) {
       var valor=params['nomEnc'];
       var arr=valor.split("%20");
    /*   var encuesta="";
       for(i in arr){
        encuesta+=arr[i]+" ";
       }*/
       console.log('El valor del parámetro variable es: '+params['nomUser']+"=>"+params['nomEnc']);
        //cargarUsuarioMuestra(params['nomEnc'],params['nomUser']);
        ObtenerEntrevista(params['nomEnc'],params['nomUser']);
       idUser.value=params['nomUser'];
       idEnc.value=params['nomEnc'];
       //console.log('El valor del parámetro variable es: '+trim(encuesta));
      
    } else {
       alert("Ha ocurrido un error ingresa nuevamente al sistema");
    }
}

function ObtenerEntrevista(idEncuesta,idUsuario){
 var divEntrevista=document.getElementById("divEntrevistas");
 var entre = new entrevista("obtenerCliente"
                            ,idEncuesta
                            ,""
                            ,""
                            ,""
                            ,idUsuario);    
 var res=entre.metodo();
 res.success(function(respSer){
     var dtJson=eval(respSer);
     var btnAceptar=document.createElement("input");
     var lbl=document.createElement("label");
     var text=document.createTextNode(dtJson[0].Nombre+" "+dtJson[0].Apellido);
     btnAceptar.setAttribute("type","button");
     btnAceptar.setAttribute("value","si");
     btnAceptar.setAttribute("onclick",'hacerEncuesta('+dtJson[0].IdMuestra+');');
     lbl.appendChild(text);
     //lbl.setAttribute("id",dtJson[0].IdMuestra);
     divEntrevista.appendChild(lbl);
     divEntrevista.appendChild(btnAceptar);
     console.log(dtJson);
 }).fail();
}
/*
function cargarUsuarioMuestra(idEncuesta,idUsuario){
    var mueUno=new muestra("ObtenerMuestraEntrevistaRangoUno",
                            idEncuesta,
                            "",idUsuario);
    var mueDos=new muestra("ObtenerMuestraEntrevistaRangoDos",
                            idEncuesta,
                            "",idUsuario);
    var mueTres=new muestra("ObtenerMuestraEntrevistaRangoTres",
                             idEncuesta,
                            "",idUsuario); 
    var respUno = mueUno.metodo();
    respUno.success(function(respServidor){
        var dtJson=eval(respServidor);
        console.log("Rango Uno");
        var divRUno=document.getElementById("divEntreRangoUno");
        var tam=Object.keys(dtJson).length;
        console.log(tam);
        if(tam>1){
            for(i in dtJson){
                
                if(dtJson[i].IdMuestra!== undefined){
                       var div=document.createElement("div");
                       //div.setAtribute("","");
                       var nodoUno=document.createElement("label");
                       var textoNodo=document.createTextNode(dtJson[i].Nombre+" "+dtJson[i].Apellido);
                       nodoUno.appendChild(textoNodo);

                       var nodoDos=document.createElement("label");
                       var textoNodoDos=document.createTextNode(dtJson[i].Celular);
                       nodoDos.appendChild(textoNodoDos);

                       var btnAceptar=document.createElement("input");
                       btnAceptar.setAttribute("id",dtJson[i].IdMuestra);
                       btnAceptar.setAttribute("value","Entrevistar");
                       btnAceptar.setAttribute("name","Uno");
                       btnAceptar.setAttribute("type","button");
                       btnAceptar.setAttribute("onclick",'aceptar('+dtJson[i].IdMuestra+');false;');

                       var btnCancelar=document.createElement("input");
                       btnCancelar.setAttribute("id",dtJson[i].IdMuestra);
                       btnCancelar.setAttribute("value","Cancelar");
                       btnCancelar.setAttribute("type","button");
                       btnCancelar.setAttribute("onclick",'cancelar('+dtJson[i].IdMuestra+');false;');


                       div.appendChild(nodoUno);
                       div.appendChild(nodoDos);
                       div.appendChild(btnAceptar);
                       div.appendChild(btnCancelar);
                       divRUno.appendChild(div);
                }
               
            }
            
        }
        
    }).fail(function(){});
    
    var respDos = mueDos.metodo();
    respDos.success(function(respServidor){
        var dtJson=eval(respServidor);
        console.log("Rango Dos");
        var divRDos=document.getElementById("divEntreRangoDos");
        var tam=Object.keys(dtJson).length;
        console.log(tam);
        if(tam>1){
            for(i in dtJson){
                if(dtJson[i].IdMuestra!== undefined){
                            console.log(dtJson[i]);
                     var div=document.createElement("div");
                     //div.setAtribute("","");
                     var nodoUno=document.createElement("label");
                     var textoNodo=document.createTextNode(dtJson[i].Nombre+" "+dtJson[i].Apellido);
                     nodoUno.appendChild(textoNodo);

                     var nodoDos=document.createElement("label");
                     var textoNodoDos=document.createTextNode(dtJson[i].Celular);
                     nodoDos.appendChild(textoNodoDos);

                      var btnAceptar=document.createElement("input");
                     btnAceptar.setAttribute("id",dtJson[i].IdMuestra);
                     btnAceptar.setAttribute("value","Entrevistar");
                     btnAceptar.setAttribute("name","Dos");
                     btnAceptar.setAttribute("type","button");
                     btnAceptar.setAttribute("onclick",'aceptar('+dtJson[i].IdMuestra+');false;');

                     var btnCancelar=document.createElement("input");
                     btnCancelar.setAttribute("id",dtJson[i].IdMuestra);
                     btnCancelar.setAttribute("value","Cancelar");
                     btnCancelar.setAttribute("type","button");
                     btnCancelar.setAttribute("onclick",'cancelar('+dtJson[i].IdMuestra+');false;');

                     div.appendChild(nodoUno);
                     div.appendChild(nodoDos);
                     div.appendChild(btnAceptar);
                     div.appendChild(btnCancelar);
                     divRDos.appendChild(div);
                }
            }
            
        }
        
    }).fail(function(){});
    
    var respTres = mueTres.metodo();
    respTres.success(function(respServidor){
        var dtJson=eval(respServidor);
        console.log("Rango Tres");
        var divRTres=document.getElementById("divEntreRangoTres");
        var tam=Object.keys(dtJson).length;
        console.log(tam);
        if(tam>1){
            for(i in dtJson){
                if(dtJson[i].IdMuestra!== undefined){
                                //console.log(dtJson[i]);
                       var div=document.createElement("div");
                       //div.setAtribute("","");
                       var nodoUno=document.createElement("label");
                       var textoNodo=document.createTextNode(dtJson[i].Nombre+" "+dtJson[i].Apellido);
                       nodoUno.appendChild(textoNodo);

                       var nodoDos=document.createElement("label");
                       var textoNodoDos=document.createTextNode(dtJson[i].Celular);
                       nodoDos.appendChild(textoNodoDos);

                        var btnAceptar=document.createElement("input");
                       btnAceptar.setAttribute("id",dtJson[i].IdMuestra);
                       btnAceptar.setAttribute("value","Entrevistar");
                       btnAceptar.setAttribute("name","Tres");
                       btnAceptar.setAttribute("type","button");
                       btnAceptar.setAttribute("onclick",'aceptar('+dtJson[i].IdMuestra+');false;');

                       var btnCancelar=document.createElement("input");
                       btnCancelar.setAttribute("id",dtJson[i].IdMuestra);
                       btnCancelar.setAttribute("value","Cancelar");
                       btnCancelar.setAttribute("type","button");
                       btnCancelar.setAttribute("onclick",'cancelar('+dtJson[i].IdMuestra+');false;');

                       div.appendChild(nodoUno);
                       div.appendChild(nodoDos);
                       div.appendChild(btnAceptar);
                       div.appendChild(btnCancelar);
                       divRTres.appendChild(div);
                }
            }
            
        }
        
    }).fail(function(){});
}
*/
window.addEventListener("load",Iniciar,false);
