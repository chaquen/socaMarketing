function IniciarAdminRol(){
    cargarRolModulo();
    cargarModulos();
    document.getElementById("btnCrearRol").addEventListener("click",crearRol,false);
    document.getElementById("btnAsignarPermisos").addEventListener("click",asignarPermisos,false);
}
function cargarRolModulo(){
    var rl= new rol_app("getAllRoles","","");
 var resp=rl.metodo();
 resp.success(function(respServidor){
     var dtJson=eval(respServidor);
     var sel=document.getElementById("selRolModulo");
     crearSelectRol(sel,dtJson);
 }).fail(function(){});
}
function cargarModulos(){
    var mod=new modulo("getAllModulos","","","");
    var respMod=mod.crear();
    respMod.success(function(respServ){
        var dtJson=eval(respServ);
        var sel=document.getElementById("selModulo");
        crearSelectModulos(sel,dtJson);
    }).fail(function(){});
}
function crearRol(){
    
 var objRol=new rol_app("crearRol",
          document.getElementById("txbNombreRol").value,
          document.getElementById("txaDescripcionRol").value);   
 var respSer=objRol.metodo();
 respSer.success(function(respServidor){
     alert(respServidor);
 }).fail(function(){});
}
function asignarPermisos(){
    
    var selRol=document.getElementById("selRolModulo");
    var selMod=document.getElementById("selModulo");
   if(selRol.value != "0" && selMod.value != "0" ){
        var permiso=document.getElementsByName("permisos");
        var valor= new Array();
        var j=0;
        for(i in permiso){
            if(permiso[i].checked===true){
                valor[j]=1;
                j++;
            }else{
                valor[j]=0;
                j++;
            }

        }
        console.log(valor);
        var per=new permisos("asignarPermiso",selRol.value,selMod.value,valor[0],valor[1],valor[2],valor[3]);
        var resPer=per.metodo();
        resPer.success(function(respServidor){

        }).fail(function(){});

   }else{
       alert("seleccione un modulo y un rol");
   }
    
}
//window.addEventListener("load",Iniciar,false);