function Iniciar(){
    InicioAsesor();
   
}
function IniciarAnclas(valores){
    
   
    var salir=document.getElementById("aSalir");
    //encuesta.setAttribute("href","/listaFormularios.html?idUser="+valores['idUser']+'&rol='+valores['rol']);
    
    //usuarios.setAttribute("href","/cambioClave.html?idUser="+valores['idUser']);
    
    
    salir.setAttribute("onclick","salir("+valores["idUser"]+");");
    //salir.setAttribute("href","/");
    
}

function InicioAsesor(){
    var idUser=document.getElementById("hdIdUsuarioAsesor");
    var Rol=document.getElementById("hdrol");
    var nombreUsuario=document.getElementById("nombreUsuario");
    var valores=recibirValorGet();
   // dump(valores['rol']);
    if(valores['rol'] =='4'){
        Rol.value=valores['rol'];
        idUser.value=valores['idUser'];
        var us=new usuario("buscarUsuario",valores["idUser"]);
        var respuesta=us.crear();
        respuesta.success(function(respuestaServidor){
            var dtJson=eval(respuestaServidor);
            //console.log(dtJson[0].Nombre);
            nombreUsuario.innerHTML=dtJson[0].Nombre+" "+dtJson[0].Apellido;
        }).fail(function(){});
        IniciarAnclas(valores);
    }else{
        alert("Usted no tiene permisos para ingresar a esta pagina");
        location.href="/";
    }
}



window.addEventListener("load",Iniciar,false);

