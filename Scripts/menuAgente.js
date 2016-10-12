window.addEventListener("load",iniciarAppAgente,false);
var idAgente;
var rol;
function iniciarAppAgente(){
    if(sessionStorage["usuarioLogueado"]!=undefined){
        var valores=JSON.parse(sessionStorage["usuarioLogueado"]);
        rol=valores.rol;
        idAgente=valores.idUsuario;
        if(rol=="4"){
            var us=new usuario("buscarUsuario",idAgente);
            var respuesta=us.crear();
            respuesta.success(function(respuestaServidor){
                var dtJson=eval(respuestaServidor);

                nombreUsuario.innerHTML=dtJson[0].Nombre+" "+dtJson[0].Apellido;
                var salir=document.getElementById("aSalir");
                salir.setAttribute("onclick","salir("+idAgente+");");
                cargarFormularios();

            }).fail(function(){});
        }else{
            alert("Usted no tiene permisos para ingresar a esta pagina");
            location.href="index.html";
        }
    }else{
        alert("Por favor Ingrese correctamente al sistema!☻");
    }
    
     
    
    /*Inicio para valores get*/
  /*  var nombreUsuario=document.getElementById("nombreUsuario");
    var valores=recibirValorGet();
     if(valores['rol'] =='4'){
        //Rol.value=valores['rol'];
        //idUser.value=valores['idUser'];
        idAgente=valores['idUser'];
        rol=valores['rol'];
        console.log(idAgente);
        console.log(rol);
        var us=new usuario("buscarUsuario",valores["idUser"]);
        var respuesta=us.crear();
        respuesta.success(function(respuestaServidor){
            var dtJson=eval(respuestaServidor);
           
            nombreUsuario.innerHTML=dtJson[0].Nombre+" "+dtJson[0].Apellido;
            var salir=document.getElementById("aSalir");
            salir.setAttribute("onclick","salir("+idAgente+");");
            cargarFormularios();
            
        }).fail(function(){});
      
    }else{
        alert("Usted no tiene permisos para ingresar a esta pagina");
        location.href="/";
    }*/
}

function cargarFormularios(){
    console.log(idAgente);
    console.log(rol);
   
    var form=new encuesta("consultarEncuestasPorAgente",idAgente);
    var respForm=form.metodo();
    respForm.success(function(respServidor){
       
        if(respServidor!="Usted no tiene encuestas pendientes para realizar"){
            var datosJson=eval(respServidor);
              console.log(datosJson);
            crearTablaListaFormularios(datosJson,idAgente,rol);
        
        }else{
         
                alert(respServidor);
        
        }
        
        }).fail(function(){
            alert("Ha ocurrido un error durante el proceso");
        });
   
}


