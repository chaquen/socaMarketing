function Iniciar(){
    cargarFormularios();
}
function recibirValorLista(){
    
    var idUser=document.getElementById("hdIdUsuario");
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};
    for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
    }  
    console.log(params);  
    return params;
    
}
//Funcion para listar los 
function cargarFormularios(){
  // var ancla=document.getElementById("aMenuPrincipal");
    var valores=recibirValorLista();
    //alert(valores['idUser']);
    if(valores['rol']=='4'){
        var form=new encuesta("consultarEncuestasPorAgente",valores['idUser']);
    var respForm=form.metodo();
    respForm.success(function(respServidor){
        //console.debug(respServidor);
        if(respServidor!="Usted no tiene encuestas pendientes para realizar"){
            var datosJson=eval(respServidor);
              console.log(datosJson);
            crearTablaListaFormularios(datosJson,valores['idUser'],valores['rol']);
           // ancla.setAttribute("href","/usuario.html?idUser="+valores['idUser']+"&rol="+valores['rol']);
        }else{
            //alert("hOLA");
                alert(respServidor);
            //location.href="/index.html";
            //location.href="/usuario.html?idUser="+valores['idUser']+"&rol="+valores['rol'];
        }
        
        }).fail(function(){
            alert("Ha ocurrido un error durante el proceso");
        });
    }else{
        alert("Usted no tiene permisos para ingresar a esta pagina");
    }
}

window.addEventListener("load",Iniciar,false);