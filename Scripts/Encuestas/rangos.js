function Iniciar(){
    document.getElementById("btnCrearRango").addEventListener("click",crearRango,false);
    
}
function crearRango(){
    var rUnoA=document.getElementById("txbrangoUnoA").value;
    var rUnoB=document.getElementById("txbrangoUnoB").value;
    var rDosA=document.getElementById("txbrangoDosA").value;
    var rDosB=document.getElementById("txbrangoDosB").value;
    var rTresA=document.getElementById("txbrangoTresA").value;
    var rTresB=document.getElementById("txbrangoTresB").value;
    var rCuatroA=document.getElementById("txbrangoCuatroA").value;
    var rCuatroB=document.getElementById("txbrangoCuatroB").value;
    var Uno=rUnoA+','+rUnoB;
    var Dos=rDosA+','+rDosB;
    var Tres=rTresA+','+rTresB;
    var Cuatro=rCuatroA+','+rCuatroB;
    var rng=new rangos("crearRango","",Uno,Dos,Tres,Cuatro);
    var resp=rng.metodo();
    resp.success(function(respServ){
       //console.log(respServ);
        alert(respServ);
        
    }).fail(function(){});
    limpiarForm();
}
function limpiarForm(){
   document.getElementById("txbrangoUnoA").value="";
   document.getElementById("txbrangoUnoB").value="";
   document.getElementById("txbrangoDosA").value="";
   document.getElementById("txbrangoDosB").value="";
   document.getElementById("txbrangoTresA").value="";
   document.getElementById("txbrangoTresB").value="";
   document.getElementById("txbrangoCuatroA").value="";
   document.getElementById("txbrangoCuatroB").value="";
}
window.addEventListener("load",Iniciar,false);

