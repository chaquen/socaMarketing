window.addEventListener("load",generarGraficos,false);

function generarGraficos(){
    var divPincipal=document.getElementById("divGraficos");
    var barra=document.createElement("div");
    barra.setAttribute("class","barras");
    barra.style.width=150+"px";
    barra.style.height=800+"px";
    divPincipal.appendChild(barra);
    
    /*var barra=document.createElement("div");
    barra.setAttribute("class","barras");
    barra.style.width=150+"px";
    barra.style.height=70+"%";
    divPincipal.appendChild(barra);
    
    var barra=document.createElement("div");
    barra.setAttribute("class","barras");
    barra.style.width=150+"px";
    barra.style.height=60+"%";
    divPincipal.appendChild(barra);
    
    var barra=document.createElement("div");
    barra.setAttribute("class","barras");
    barra.style.width=150+"px";
    barra.style.height=40+"%";
    divPincipal.appendChild(barra);
    
    var barra=document.createElement("div");
    barra.setAttribute("class","barras");
    barra.style.width=150+"px";
    barra.style.height=100+"px";
    //divPincipal.appendChild(barra);
    */
    console.log(divPincipal);
}