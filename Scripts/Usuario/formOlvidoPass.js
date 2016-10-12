function Iniciar(){
    document.getElementById('btnOlvidoPass').addEventListener("click",recordarPregunta,false);
    document.getElementById('btnRecordar').addEventListener("click",recordarRespuesta,false);
}
function recordarPregunta(){
    //alert("Hola");
    var lblPrg=document.getElementById("lblPreguntaSeguridad");
    lblPrg.innerHTML="";
    var cc=document.getElementById('txbCedula');
    var olpass=new olvidoPass("olvidoPass",cc.value,"");
    var respOlPass=olpass.recordar();
    respOlPass.success(function(respServidor){
        //var valJsno=eval(respServidor);
        var txtNode=document.createTextNode(respServidor);
        console.log(respServidor);
        //alert(valJsno[0].preguntaSeguridad);
        lblPrg.appendChild(txtNode);
        
    }).fail(function(){
        
    });
}
function recordarRespuesta(){
    var msn=document.getElementById("respOlvClaveDos");
    msn.innerHTML="";
    var cc=document.getElementById('txbCedula');
    var respuesta=document.getElementById('txbResp');
    //alert(cc.value);
    var comprobarResp=new olvidoPass("validarRespuesta",  
                      cc.value,
                      respuesta.value);
    var respComp=comprobarResp.recordar();
    respComp.success(function(respServidor){
        
        var txtNode=document.createTextNode(respServidor);
        msn.appendChild(txtNode);
    }).fail(function(){
        
    });
}

window.addEventListener("load",Iniciar,false);