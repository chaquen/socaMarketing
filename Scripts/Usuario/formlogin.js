function Iniciar(){
    //document.getElementById("").addEventListener("keypress",function(e){
    document.getElementById("txbclave").addEventListener("keypress",function(e){
        if(e.keyCode==13){
            Ingresar();
        }
    },false);
    document.getElementById("btnLoginApp").addEventListener("click",Ingresar,false);
}



window.addEventListener("load",Iniciar,false);
