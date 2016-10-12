var idUser;
function Iniciar(){
    document.getElementById("btnCambioPass").addEventListener("click",cambiarPass,false);
    document.getElementById("selUsuario").addEventListener("change",cambioValorUsuario,false);
    //var valor=recibirValorGet();
    //idUser=valor["idUser"];
    cargarUsuarios();
}
function cambioValorUsuario(){
    if(this.value!=0){
        idUser=this.value;
       // alert(idUser);
    }
}
function cargarUsuarios(){
    var user= new usuario("obtenerTodosLosUsuarios","","","","","","","","");
    var resUser=user.crear();
    var sel=document.getElementById("selUsuario");
        sel.innerHTML="";
    resUser.success(function(respUserServer){
        var dtJson=eval(respUserServer);
        
        crearSelectUsuario(sel,dtJson);
    }).fail(function(){});
}


function cambiarPass(){
    var valGet=recibirValorGet();
    var pass=document.getElementById("txbNuevaClave");
    var passConfir=document.getElementById("txbConfNuevaClave");
    if(validarValores(pass.value,passConfir.value)){
       var cambio=new cambioClave(idUser,document.getElementById("txbNuevaClave").value);
       var respCambio=cambio.cambioPass(valGet['idUser'],pass.value);
       respCambio.success(function(respServidor){
           alert(respServidor);
       }).fail(function(){});
     
    }else{
        alert("claves no coinciden");
    }
 
}
window.addEventListener("load",Iniciar,false);

