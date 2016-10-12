function Iniciar(){
    //cargarPreguntas();
    document.getElementById("selTipoPregunta").addEventListener("change",selecTipoPregunta,false);
    document.getElementById("btnCrearPregunta").addEventListener("click",registrarPregunta,false);
}
/*
 * Funcion para registrar una pregunta en el servidor
 * @returns {undefined}
 */
function registrarPregunta(){
 
 var tok=false;
 
 if(document.getElementById("selTipoPregunta").value == "Cerrada" || document.getElementById("selTipoPregunta").value == "CerradaMultiple"){
    if(document.getElementById("txbPregunta").value != ""){
        
        var res=document.getElementsByName("respuestas");
        
        var tamResp=document.getElementsByName("respuestas").length;
        //alert(tamResp);
        if(tamResp>1){
            var btn=document.getElementsByName("btnAddPregunta");
            var tipo=btn[0].id.substring(14);
       //     alert(tipo);
            var arrRespuestas = new Array();                
            for(var i=0;i<tamResp;i++ ){
                if(res[i].value != ""){
                    arrRespuestas[i]=res[i].value;
                    tok=true;
                } 
            }
        }else{
            alert("Por favor ingrese al menos dos opcion para la respuesta ");
        }    
     }else{
         alert("Por favor ingrese una pregunta");
     }
     
 }else if(document.getElementById("selTipoPregunta").value == "CerradaComentario" ){
    if(document.getElementById("txbPregunta").value != ""){
        
        var res=document.getElementsByName("respuestas");
        var comen=document.getElementsByName("comentario");
        var tamResp=document.getElementsByName("respuestas").length;
        //alert(tamResp);
        if(tamResp>1){
            var btn=document.getElementsByName("btnAddPregunta");
            var tipo=btn[0].id.substring(14);
       //     alert(tipo);
            var arrRespuestas = new Array();                
            for(var i=0;i<tamResp;i++ ){
                if(res[i].value != "" ){
                    arrRespuestas[i]=res[i].value+";"+comen[i].value;
                    tok=true;
                } 
            }
        }else{
            alert("Por favor ingrese al menos dos opcion para la respuesta ");
        }    
     }else{
         alert("Por favor ingrese una pregunta");
     }
     
 }else{
    var tipo="Abierta";
    tok=true;
    var arrRespuestas = new Array();
 } 
 if(tok==true){
        //alert(tipo);
        var preg=new pregunta("registarPregunta",tipo,document.getElementById("txbPregunta").value,arrRespuestas);
        var resp=preg.metodo();
        resp.success(function(respJs){
            alert(respJs);
            limpiarForm();
        });
    }
    
 
    
}
/*
 * Funcion que limpia el formulario 
 * @returns {undefined}
 */
function limpiarForm(){
    //alert("Qu ieres limpiar el formulario");
   var div=document.getElementById("dvOpcionesRespuesta");
   var tam=document.getElementsByName("btnAddPregunta").length;
   var tamResp=document.getElementsByName("respuestas").length;
    //console.log(tam);
    if(tam>0){
        var el=document.getElementsByName("btnAddPregunta");
           //console.log(el[0].id);
           div.removeChild(el[0]);
           div.removeEventListener("click",CrearPregunta);
           
     }
     if(tamResp>0){
         var respuestas=document.getElementsByName("respuestas");
         var comentarios=document.getElementsByName("comentario");
         var nivel=document.getElementsByName("nivel");
         for(var i=0;i<tamResp;i++){
             //console.log(respuestas[0]);
             div.removeChild(respuestas[0]);
             if(comentarios[0]!=undefined){
                 div.removeChild(comentarios[0]);
             }
             div.removeChild(nivel[0]);
         }         
     }
   document.getElementById("txbPregunta").value="";
}
/*
 *Funcion que crea los input para las respuestas 
 */
function  CrearPregunta(){
    var div=document.getElementById("dvOpcionesRespuesta");
    var btn=document.getElementsByName("btnAddPregunta");
  //console.debug(btn);
     switch(btn[0].id){
         case "btnAddPreguntaCerrada":
             var elementoRes=document.createElement("input");
             elementoRes.setAttribute("type","text");
             elementoRes.setAttribute("name","respuestas");
             var tamRes=document.getElementsByName("respuestas").length;
             elementoRes.setAttribute("id","resp_"+tamRes);
             //elementoRes.focus();             
             elementoRes.setAttribute("placeholder","opción numero "+tamRes);
             //elemntoRes.focus();
             div.appendChild(elementoRes);
              
             
             break;
         case "btnAddPreguntaCerradaMultiple":
             elementoRes=document.createElement("input");
             elementoRes.setAttribute("type","text");
             elementoRes.setAttribute("name","respuestas");
             var tamRes=document.getElementsByName("respuestas").length;
             elementoRes.setAttribute("id","resp_"+tamRes);
             elementoRes.setAttribute("placeholder","opción numero "+tamRes);
             div.appendChild(elementoRes);
              
             break;
         case "btnAddPreguntaCerradaComentario":
             
             var elementoRes=document.createElement("input");
             var elementoComentario=document.createElement("input");
             
             
              elementoRes.setAttribute("type","text");
              elementoRes.setAttribute("name","respuestas");
             
              var tamRes=document.getElementsByName("respuestas").length;
              elementoRes.setAttribute("id","resp_"+tamRes);
              elementoRes.setAttribute("placeholder","opción numero "+tamRes);
             
               elementoComentario.setAttribute("type","text");
              elementoComentario.setAttribute("name","comentario");
             
              var tamRes=document.getElementsByName("comentario").length;
              elementoComentario.setAttribute("id","com_"+tamRes);
              elementoComentario.setAttribute("placeholder","Comentario "+tamRes);
                
             
            div.appendChild(elementoRes);
            div.appendChild(elementoComentario);
             
             
              //var tok=false;
             break;
             
         case "btnAddComentario":
             var elementoRes=document.createElement("input");
              elementoRes.setAttribute("type","text");
              elementoRes.setAttribute("name","respuestas");
             
             var tamRes=document.getElementsByName("respuestas").length;
              elementoRes.setAttribute("id","resp_"+tamRes);
              elementoRes.setAttribute("placeholder","comentario "+tamRes);
             
                div.appendChild(elementoRes);
              
             break;
      
     }
  }
/*
 *Funcion que agrega el boton para aagregar respuestas 
 */
function selecTipoPregunta(){
   var div=document.getElementById("dvOpcionesRespuesta");
   var tam=document.getElementsByName("btnAddPregunta").length;
    var tamResp=document.getElementsByName("respuestas").length;
    var liPadre=document.getElementById("liBtnAgregarRespuesta");
    console.log(tam);
    if(tam>0){
        var el=document.getElementsByName("btnAddPregunta");
  //         console.log(el[0].id);
             div.removeChild(el[0]);
             div.removeEventListener("click",CrearPregunta);
             if(tamResp>0){
                 var respuestas=document.getElementsByName("respuestas");
                  for(var i=0;i<tamResp;i++){
                    //console.log(respuestas[0]);
                    div.removeChild(respuestas[0]);
                  }    
             }
     }
     
    var li=document.creteElement("li");
    switch(document.getElementById("selTipoPregunta").value){
       
        case "Cerrada":
            var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaCerrada");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            liPadre.appendChild(addInput);
            break;
        case "CerradaMultiple":
            
            var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaCerradaMultiple");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            liPadre.appendChild(addInput);
            
            break;
        case "CerradaComentario":
            
            var addInput=document.createElement("input");
            addInput.setAttribute("type","button");
            addInput.setAttribute("id","btnAddPreguntaCerradaComentario");
            addInput.setAttribute("name","btnAddPregunta");
            addInput.setAttribute("value","agregar respuesta");
            addInput.addEventListener("click",CrearPregunta);
            
           /* var H=document.createElement("label");
            var txt=document.createTextNode("Para agregar un comentario agrege ';"+"' despues de la respuesta ejemplo: No;porque?" );
            H.appendChild(txt);
            /*var addInputCom=document.createElement("input");
            addInputCom.setAttribute("type","button");
            addInputCom.setAttribute("id","btnAddComentario");
            addInputCom.setAttribute("name","btnAddPregunta");
            addInputCom.setAttribute("value","agregar comentario");
            addInputCom.addEventListener("click",CrearPregunta);
            */
           /*div.appendChild(H);*/
           liPadre.appendChild(addInput);
            break;
    }
    //div.appendChild(li);
    //var el=document.getElementsByName("btnAddPregunta");
   //console.log(el[0].id);
    
}

window.addEventListener("load",Iniciar,false);