function Iniciar(){

    document.getElementById("selEncuestaReporte").addEventListener("change",encuestaSeleccionada,false);
    document.getElementById("selReporteZona").addEventListener("change",concesionarioPorZona,false);
    document.getElementById("btnReporte").addEventListener("click",generarInforme,false);
  //  document.getElementById("btnExportar").addEventListener("click",exportarXls,false);
/*    document.getElementById("btnReporteGeneralZona").addEventListener("click",reporteGeneralZona,false);
    document.getElementById("btnReporteGeneralConcesionario").addEventListener("click",reporteGeneralConcesionario,false);
    document.getElementById("btnReporteGeneral").addEventListener("click",reporteGeneral,false);
  */     
    CargarSelectEncuestas();
    
}
function limpiarForm(){
    var filas=document.querySelectorAll(".filas");
    //alert(filas.length);
    if(filas.length>0){
        for(var i in filas){
     //   console.log(filas[i].innerHTML);
        filas[i].innerHTML="";
    }
    }
    
}
function generarInforme(){
    var selConc=document.getElementById("selReporteConcesionario");
    var selItem=document.getElementById("selReporteZona");
    var hdInc=document.getElementById("hdIdEncuestaReporte");
    var div=document.getElementById("divReporte");
    var chb =document.getElementsByName("rango");
    var selGeneral=document.getElementById("selEncuestaReporte");
    var operacionSinRango;
    var operacionConRango;
    var arrRango=new Array();
    if(selItem.value == "0" )
    {
        //    alert("hola");
            if (chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                operacionSinRango="repEncuestaZonasSinRangoTodasLasZonas"; 
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                arrRango.push(chb[0].value);
                operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            }else  if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                arrRango.push(chb[1].value);
                operacionConRango="repEncuestaZonasConRangoTodasLasZonas"; 

            }else  if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                arrRango.push(chb[2].value);
                operacionConRango="repEncuestaZonasConRangoTodasLasZonas";

            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                   arrRango.push(chb[3].value); 
                   operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
                //Aqui evaluo dos opciones seleccionadas
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                  arrRango.push(chb[0].value);
                  arrRango.push(chb[1].value);
                  operacionConRango="repEncuestaZonasConRangoTodasLasZonas";

            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                   arrRango.push(chb[1].value);
                   arrRango.push(chb[2].value);
                   operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[3].value);
                    operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            //Aqui evaluo tres opciones seleccionadas

            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
                operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                  arrRango.push(chb[1].value);
                  arrRango.push(chb[2].value);
                  arrRango.push(chb[3].value);
                  operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    arrRango.push(chb[3].value);
                    operacionConRango="repEncuestaZonasConRangoTodasLasZonas";


            }//Aqui evaluo cuatro opciones seleccionadas
            else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaZonasConRangoTodasLasZonas";
            }

        
       }
    else if(selItem.value!="0" && selItem.value!="--" && selConc.value!="--" && selConc.value=="0")
    {
            if (chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                operacionSinRango="repEncuestaZonasSinRangoUnaLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                    arrRango.push(chb[0].value);
                    operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            }else  if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                arrRango.push(chb[1].value);
                operacionConRango="repEncuestaZonasConRangoUnaLasZonas";

            }else  if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                        arrRango.push(chb[2].value);
                        operacionConRango="repEncuestaZonasConRangoUnaLasZonas";

            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                   arrRango.push(chb[3].value); 
                   operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
                //Aqui evaluo dos opciones seleccionadas
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                  arrRango.push(chb[0].value);
                  arrRango.push(chb[1].value);
                  operacionConRango="repEncuestaZonasConRangoUnaLasZonas";

            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                   arrRango.push(chb[1].value);
                   arrRango.push(chb[2].value);
                   operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[3].value);
                    operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            //Aqui evaluo tres opciones seleccionadas

            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
                operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                  arrRango.push(chb[1].value);
                  arrRango.push(chb[2].value);
                  arrRango.push(chb[3].value);
                  operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    arrRango.push(chb[3].value);
                    operacionConRango="repEncuestaZonasConRangoUnaLasZonas";


            }//Aqui evaluo cuatro opciones seleccionadas
            else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaZonasConRangoUnaLasZonas";
            }


    
    }
    else if(selItem.value!="0" && selItem.value!="--" && selConc.value=="--" )
    {       
            if (chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
            operacionSinRango="generalZonaSinRango";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                    arrRango.push(chb[0].value);
                    //console.log(arrRango);
            }else  if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                arrRango.push(chb[1].value);

            }else  if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                        arrRango.push(chb[2].value);

            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                   arrRango.push(chb[3].value); 
                //Aqui evaluo dos opciones seleccionadas
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                  arrRango.push(chb[0].value);
                  arrRango.push(chb[1].value);

            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                   arrRango.push(chb[1].value);
                   arrRango.push(chb[2].value);
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
            
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[3].value);
            //Aqui evaluo tres opciones seleccionadas

            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                  arrRango.push(chb[1].value);
                  arrRango.push(chb[2].value);
                  arrRango.push(chb[3].value);
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    arrRango.push(chb[3].value);


            }//Aqui evaluo cuatro opciones seleccionadas
            else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
            }


    }
    else if(selConc.value!="--" && selConc.value!="0" && selItem.value!="--" && selItem.value!="0" )
    {
            if (chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                operacionSinRango="repEncuestaUnConcesionarioSinRango";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                    arrRango.push(chb[0].value);
                     operacionConRango="repEncuestaUnConcesionarioConRango";
            }else  if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                arrRango.push(chb[1].value);
                operacionConRango="repEncuestaUnConcesionarioConRango";
            }else  if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                        arrRango.push(chb[2].value);
                        operacionConRango="repEncuestaUnConcesionarioConRango";

            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                   arrRango.push(chb[3].value); 
                   operacionConRango="repEncuestaUnConcesionarioConRango";
                //Aqui evaluo dos opciones seleccionadas
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                  arrRango.push(chb[0].value);
                  arrRango.push(chb[1].value);
                  operacionConRango="repEncuestaUnConcesionarioConRango";

            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                   arrRango.push(chb[1].value);
                   arrRango.push(chb[2].value);
                   operacionConRango="repEncuestaUnConcesionarioConRango";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    operacionConRango="repEncuestaUnConcesionarioConRango";
            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaUnConcesionarioConRango";
            
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaUnConcesionarioConRango";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[3].value);
                    operacionConRango="repEncuestaUnConcesionarioConRango";
            //Aqui evaluo tres opciones seleccionadas

            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
                operacionConRango="repEncuestaUnConcesionarioConRango";
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaUnConcesionarioConRango";
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                  arrRango.push(chb[1].value);
                  arrRango.push(chb[2].value);
                  arrRango.push(chb[3].value);
                  operacionConRango="repEncuestaUnConcesionarioConRango";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    arrRango.push(chb[3].value);
                    operacionConRango="repEncuestaUnConcesionarioConRango";


            }//Aqui evaluo cuatro opciones seleccionadas
            else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaUnConcesionarioConRango";
            }

        
    }
    else if(selItem.value=="--")
    {
            if (chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                operacionSinRango="repEncuestaGeneralSinRango"; 
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==false ){
                    arrRango.push(chb[0].value);
                    operacionConRango="repEncuestaGeneralConRango";
            }else  if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                arrRango.push(chb[1].value);
                operacionConRango="repEncuestaGeneralConRango";    
            }else  if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                        arrRango.push(chb[2].value);
                        operacionConRango="repEncuestaGeneralConRango";

            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                   arrRango.push(chb[3].value); 
                   operacionConRango="repEncuestaGeneralConRango";
                //Aqui evaluo dos opciones seleccionadas
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==false){
                  arrRango.push(chb[0].value);
                  arrRango.push(chb[1].value);
                  operacionConRango="repEncuestaGeneralConRango";

            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                   arrRango.push(chb[1].value);
                   arrRango.push(chb[2].value);
                   operacionConRango="repEncuestaGeneralConRango";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==false){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    operacionConRango="repEncuestaGeneralConRango";
            }else if(chb[0].checked==false && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaGeneralConRango";
            
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[1].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaGeneralConRango";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==false && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[3].value);
                    operacionConRango="repEncuestaGeneralConRango";
            //Aqui evaluo tres opciones seleccionadas

            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==false){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                operacionConRango="repEncuestaGeneralConRango";
                arrRango.push(chb[2].value);
            }else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==false && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                operacionConRango="repEncuestaGeneralConRango";
                arrRango.push(chb[3].value);
            }else if(chb[0].checked==false && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                  arrRango.push(chb[1].value);
                  arrRango.push(chb[2].value);
                  arrRango.push(chb[3].value);
                  operacionConRango="repEncuestaGeneralConRango";
            }else if(chb[0].checked==true && chb[1].checked==false && chb[2].checked==true && chb[3].checked==true){
                    arrRango.push(chb[0].value);
                    arrRango.push(chb[2].value);
                    arrRango.push(chb[3].value);
                    operacionConRango="repEncuestaGeneralConRango";


            }//Aqui evaluo cuatro opciones seleccionadas
            else if(chb[0].checked==true && chb[1].checked==true && chb[2].checked==true && chb[3].checked==true){
                arrRango.push(chb[0].value);
                arrRango.push(chb[1].value);
                arrRango.push(chb[2].value);
                arrRango.push(chb[3].value);
                operacionConRango="repEncuestaGeneralConRango";
            }

                
    }
    
    if(arrRango.length > 0){
        
        switch(operacionConRango){
            case "repEncuestaGeneralConRango":
                var repo=new reporte("repEncuestaGeneralConRango",hdInc.value,"0","0",arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ); 
                        //console.log(respServ);
                         crearTablasReporteConRango(dtJson);
                    }).fail(function(){});
                break;
            case "repEncuestaZonasConRangoTodasLasZonas":
                    var repo=new reporte("repEncuestaZonasConRango",hdInc.value,"0","0",arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ);
                         //console.log(respServ);
                    }).fail(function(){});
                    break;
            case "repEncuestaZonasConRangoUnaLasZonas":
                    var repo=new reporte("repEncuestaZonasConRango",hdInc.value,selItem.value,"0",arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ);
                         
                        
                        
                        //console.log(respServ);
                    }).fail(function(){});
                    break;
             case "repEncuestaTodosConcesionarioConRango":
                     var repo=new reporte("repEncuestaConcesionarioConRango",hdInc.value,selItem.value,"0",arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ);
                        // console.log(respServ);
                    }).fail(function(){});
                    break;
             case "repEncuestaUnConcesionarioConRango":
                     var repo=new reporte("repEncuestaConcesionarioConRango",hdInc.value,selItem.value,selConc.value,arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ);
                        //  console.log(respServ);
                    }).fail(function(){});
                    break;
               
                default:
                alert(operacionConRango);
                break;
        }
        
    }else{
        
        switch(operacionSinRango){
            case "repEncuestaGeneralSinRango":
                var repo=new reporte("repEncuestaGeneralSinRango",hdInc.value,"0","0","0");
                var respuesta=repo.metodo();
                alert(operacionSinRango);
                respuesta.success(function(respServ){
                       //
                   //    console.log(respServ);
                       var dtJson=eval(respServ); 
                       crearTablasReporteGeneralSinRango(dtJson);
                       
                }).fail(function(){
                    alert("error");
                });
            break;
             case "repEncuestaZonasSinRangoTodasLasZonas":
                    var repo=new reporte("repEncuestaZonasSinRango",hdInc.value,"0","0",arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ);
                        //console.log(respServ);
                        crearTablaReporteZonaSinRango(dtJson);
                    }).fail(function(){});
                    break;
              case "repEncuestaZonasSinRangoUnaLasZonas":
                    var repo=new reporte("repEncuestaZonasSinRango",hdInc.value,selItem.value,"0",arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ);
                        // console.log(respServ);
                        crearTablaReporteZonaSinRango(dtJson);
                    }).fail(function(){});
                    break;
             case "repEncuestaTodosConcesionarioSinRango":
                     var repo=new reporte("repEncuestaConcesionarioSinRango",hdInc.value,selItem.value,"0",arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ); 
                        //console.log(respServ);
                    }).fail(function(){});
                    break;
             case "repEncuestaUnConcesionarioSinRango":
                     var repo=new reporte("repEncuestaConcesionarioSinRango",hdInc.value,selItem.value,selConc.value,arrRango);
                    var respuesta=repo.metodo();
                    respuesta.success(function(respServ){
                        var dtJson=eval(respServ);
                        // console.log(respServ);
                    }).fail(function(){});
                    break;
            default:
                alert(operacionSinRango);
                break;
        }
    }
 
    
       
}
function crearTablaReporteZonaSinRango(dtJson){
    var divReporte = document.getElementById("divReporte");
    var tabla = document.createElement("table");
    var tbody=document.createElement("tbody");
    var thead=document.createElement("thead");
    var arrIdPregunta=new Array();
    var arrPregunta=new Array();
    var arrRespuesta=new Array();
    var arrNombreZona=new Array();
    var arrPorcentajeRango=new Array();
    var arrTotalRespuesta=new Array();
    var arrPorcentajeTotalEncuesta=new Array();
    var arrTotalEncuesta=new Array();
    var a=0;
    divReporte.innerHTML="";
   var i=0;
    if(arrIdPregunta.length==0){
              arrIdPregunta.push(dtJson[0].IdPreguntas);
              arrPregunta.push(dtJson[0].pregunta);
              arrNombreZona.push(dtJson[0].NombreZona);
    } 
    //console.log(arrIdPregunta);
    var tamanio=Object.keys(dtJson).length;
        for(var j in dtJson){
        
            if(arrNombreZona[a]==dtJson[j].NombreZona){
                             //arrNombreZona.push(dtJson[j].NombreZona);
            }else{
              arrNombreZona.push(dtJson[j].NombreZona);
              a++;
            }
        }
        a=0;
        for(var j in dtJson){
            //console.log(dtJson[j].IdPreguntas); 
               //for(var h in arrIdPregunta){
                    if(arrIdPregunta[a]==dtJson[j].IdPreguntas )
                    { 
                         //console.log(i++);   
                    }
                    else
                    {
                    //console.log(dtJson[j].IdPreguntas);  
                     arrIdPregunta.push(dtJson[j].IdPreguntas);
                     arrPregunta.push(dtJson[j].pregunta);
                    

                    a++;
                    i=0;    
                    }
              // }
                //arrRespuesta.push(dtJson[j].Respuesta);
                
        }
                 console.debug(arrIdPregunta);
                 console.debug(arrNombreZona);
                 //console.debug(arrRespuesta);
                /* console.debug(arrTotalRango);
                 console.debug(arrPorcentajeRango);
                 console.debug(arrTotalRespuesta);
                 console.debug(arrPorcentajeTotalEncuesta);
                 console.debug(arrTotalEncuesta);*/
 
            
        

    a=0;
    var tam=(arrIdPregunta.length-1)/2;
    for(var i=0;i < tam;i++){
        var fila = document.createElement("tr");
        var celda = document.createElement("td");
        var txtNode=document.createTextNode(arrPregunta[i]);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        fila.setAttribute("id",arrIdPregunta[i]);
       
            for(var d in arrNombreZona){
                var filaZn = document.createElement("tr");
                filaZn.setAttribute("id",arrNombreZona[d]);
                fila.appendChild(filaZn);
            }
       
       
        tbody.appendChild(fila);
        
      
    }
    /*
     for(var i in tbody.childNodes){
        for(var i in arrNombreZona){
          if(tbody.childNodes[i].nodeType==Node.ELEMENT_NODE){
             var filaZn = document.createElement("tr");
             filaZn.setAttribute("id",arrNombreZona[i]);
             fila.appendChild(filaZn);
             tbody.appendChild(fila);   
          }    
        }
    }
  */      
    tabla.appendChild(tbody);
    tabla.setAttribute("id","tablaReporteSinRango");
    divReporte.appendChild(tabla);
    var filaSel;
    var filaSelZn;
    for(var i in tbody.childNodes){
       for(var j in dtJson){
            //console.log(dtJson);
        if(tbody.childNodes[i].nodeType==Node.ELEMENT_NODE){
     
            if(tbody.childNodes[i].id==dtJson[j].IdPreguntas){
                 filaSel=document.getElementById(dtJson[j].IdPreguntas);
                 var tr=tbody.childNodes[i];
                 console.log(tr);
                 var trZona=tr.childNodes;
                 //console.log(trZona);
                 for(var k in trZona){
                     console.log(trZona[k].id);
                      if(trZona[k].id==dtJson[j].NombreZona){
                          filaSelZn=document.getElementById(dtJson[j].NombreZona);  
                          //alert(tr.id);
                            var celda = document.createElement("td");  
                         //var fila = document.createElement("tr");  


                        var txtNode=document.createTextNode(dtJson[j].NombreZona+""+dtJson[j].Respuesta+" "+dtJson[j].porcentaje);

                        celda.appendChild(txtNode);
                        filaSelZn.appendChild(celda);
                        filaSel.appendChild(filaSelZn);
                        console.log(filaSelZn);
                      }
                     
                        
                     //filaSel.appendChild(fila);
                 }
                 
                  
                   

             }
        }
       }
    }
    
    var rep=0;
    

    tabla.appendChild(tbody);

    divReporte.appendChild(tabla);
    
}
function crearTablaReporteConceSinRango(dtJson){}
function crearTablasReporteGeneralSinRango(dtJson){
    //console.log(dtJson);
    var divReporte = document.getElementById("divReporte");
    var tabla = document.createElement("table");
    var tbody=document.createElement("tbody");
    var thead=document.createElement("thead");
    var arrIdPregunta=new Array();
    var arrPregunta=new Array();
    var arrRespuesta=new Array();
    var arrTotalRango=new Array();
    var arrPorcentajeRango=new Array();
    var arrTotalRespuesta=new Array();
    var arrPorcentajeTotalEncuesta=new Array();
    var arrTotalEncuesta=new Array();
    var a=0;
    divReporte.innerHTML="";
   
    if(arrIdPregunta.length==0){
              arrIdPregunta.push(dtJson[0].IdPreguntas);
              arrPregunta.push(dtJson[0].pregunta);
    } 
    var tamanio=Object.keys(dtJson).length;
   
        for(var j in dtJson){
            
                if(arrIdPregunta[a]==dtJson[j].IdPreguntas)
                {
            
                }
                else
                {
               // console.log(dtJson[j].IdPreguntas);  
                 arrIdPregunta.push(dtJson[j].IdPreguntas);
                 arrPregunta.push(dtJson[j].pregunta);
                 
                 /*arrTotalRango.push(dtJson[j].totalRango);
                 arrPorcentajeRango.push(dtJson[j].porcentajeRango);
                 arrTotalRespuesta.push(dtJson[j].TotalRespuestas);
                 arrPorcentajeTotalEncuesta.push(dtJson[j].PorcentajeTotalEncuesta);
                 arrTotalEncuesta.push(dtJson[j].TotalEncuesta);
                 */
                a++;
         
                }
                //arrRespuesta.push(dtJson[j].Respuesta);
                
        }
                 console.debug(arrIdPregunta);
                 console.debug(arrPregunta);
                 //console.debug(arrRespuesta);
                /* console.debug(arrTotalRango);
                 console.debug(arrPorcentajeRango);
                 console.debug(arrTotalRespuesta);
                 console.debug(arrPorcentajeTotalEncuesta);
                 console.debug(arrTotalEncuesta);*/
 
            
        

    a=0;
    for(var i=0;i<arrIdPregunta.length-1;i++){
        var fila = document.createElement("tr");
        var celda = document.createElement("td");
        var txtNode=document.createTextNode(arrPregunta[i]);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        fila.setAttribute("id",arrIdPregunta[i]);
        tbody.appendChild(fila);
        
      
    }
    tabla.appendChild(tbody);
    tabla.setAttribute("id","tablaReporteSinRango");
    divReporte.appendChild(tabla);
    var filaSel;
    
    for(var i in tbody.childNodes){
       for(var j in dtJson){
            //console.log(dtJson);
        if(tbody.childNodes[i].nodeType==Node.ELEMENT_NODE){
     
            if(tbody.childNodes[i].id==dtJson[j].IdPreguntas){
                   filaSel=document.getElementById(dtJson[j].IdPreguntas);          

                   var celda = document.createElement("td");  
                    var fila = document.createElement("tr");  

                    
                   var txtNode=document.createTextNode(dtJson[j].Respuesta+" "+dtJson[j].porcentajeRango);

                   celda.appendChild(txtNode);
                   fila.appendChild(celda);
                   filaSel.appendChild(fila);
                   //filaSel.appendChild(celda);
             }
        }
       }
    }
    
    var rep=0;
    

    tabla.appendChild(tbody);

    divReporte.appendChild(tabla);
    
}


function crearTablaReporteZonaConRango(dtJson){}
function crearTablaReporteConceConRango(dtJson){}
function crearTablasReporteConRango(dtJson){
    var divReporte = document.getElementById("divReporte");
    var tabla = document.createElement("table");
    var tbody=document.createElement("tbody");
    var thead=document.createElement("thead");
    var arrIdPregunta=new Array();
    var arrPregunta=new Array();
    var arrRespuesta=new Array();
    var arrTotalRango=new Array();
    var arrPorcentajeRango=new Array();
    var arrTotalRespuesta=new Array();
    var arrPorcentajeTotalEncuesta=new Array();
    var arrTotalEncuesta=new Array();
    var a=0;
    divReporte.innerHTML="";
   
    if(arrIdPregunta.length==0){
              arrIdPregunta.push(dtJson[0].IdPreguntas);
              arrPregunta.push(dtJson[0].pregunta);
    } 
    var tamanio=Object.keys(dtJson).length;
   
        for(var j in dtJson){
            
                if(arrIdPregunta[a]==dtJson[j].IdPreguntas)
                {
            
                }
                else
                {
               // console.log(dtJson[j].IdPreguntas);  
                 arrIdPregunta.push(dtJson[j].IdPreguntas);
                 arrPregunta.push(dtJson[j].pregunta);
                 
                 /*arrTotalRango.push(dtJson[j].totalRango);
                 arrPorcentajeRango.push(dtJson[j].porcentajeRango);
                 arrTotalRespuesta.push(dtJson[j].TotalRespuestas);
                 arrPorcentajeTotalEncuesta.push(dtJson[j].PorcentajeTotalEncuesta);
                 arrTotalEncuesta.push(dtJson[j].TotalEncuesta);
                 */
                a++;
         
                }
                //arrRespuesta.push(dtJson[j].Respuesta);
                
        }
                 console.debug(arrIdPregunta);
                 console.debug(arrPregunta);
                 //console.debug(arrRespuesta);
                /* console.debug(arrTotalRango);
                 console.debug(arrPorcentajeRango);
                 console.debug(arrTotalRespuesta);
                 console.debug(arrPorcentajeTotalEncuesta);
                 console.debug(arrTotalEncuesta);*/
 
                 
        

    a=0;
    for(var i=0;i<arrIdPregunta.length-1;i++){
        var fila = document.createElement("tr");
        var celda = document.createElement("td");
        var txtNode=document.createTextNode(arrPregunta[i]);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        fila.setAttribute("id",arrIdPregunta[i]);
        tbody.appendChild(fila);
        
      
    }
    tabla.appendChild(tbody);
    tabla.setAttribute("id","tablaReporteSinRango");
    divReporte.appendChild(tabla);
    var filaSel;
    
    for(var i in tbody.childNodes){
       for(var j in dtJson){
            //console.log(dtJson);
        if(tbody.childNodes[i].nodeType==Node.ELEMENT_NODE){
     
            if(tbody.childNodes[i].id==dtJson[j].IdPreguntas){
                   filaSel=document.getElementById(dtJson[j].IdPreguntas);          

                   var celda = document.createElement("td");  


                    
                   var txtNode=document.createTextNode(dtJson[j].Respuesta+" "+dtJson[j].porcentajeRango);

                   celda.appendChild(txtNode);
                   filaSel.appendChild(celda);
             }
        }
       }
    }
    
    var rep=0;
    

    tabla.appendChild(tbody);

    divReporte.appendChild(tabla);
}

function CargarSelectEncuestas(){
     var repor= new reporte("buscarEncuesta","","");
        var respRepor=repor.metodo();
        respRepor.success(function(respServidor){
          var sel=document.getElementById("selEncuestaReporte");  
          var dtJson=eval(respServidor);
          crearSelectEncuestas(sel,dtJson);
        }).fail(function(){
            
        });
}
function encuestaSeleccionada(){
    
    var sel=document.getElementById("selEncuestaReporte");
    var selConc=document.getElementById("selReporteConcesionario");
   var selItem=document.getElementById("selReporteZona");
    var hdInc=document.getElementById("hdIdEncuestaReporte");
    var hNombreEncusta=document.getElementById("hNombreEncusta");
    var div=document.getElementById("divReporte");
    cargarRangosReportes(sel.value);
    if(sel.value!="0"){
        hdInc.value=sel.value;
       // alert(hdInc.value);
        if(hNombreEncusta.childNodes.length>0){
           hNombreEncusta.innerHTML=""; 
        }
        var text=document.createTextNode(sel.options[sel.selectedIndex].text);
        hNombreEncusta.appendChild(text);
        
        
         if(hdInc.value!="0"){
            
              
            var rep=new reporte("buscarZonasPorEncuesta",hdInc.value);
            var respuesta=rep.metodo();
            respuesta.success(function(respServidor){
                var dtJson=eval(respServidor);
              
                if(selItem.length<1){
                    crearSelectZonasReportes(selItem,dtJson);
                     //crearSelectConcesionarioReportes(selConc);
                     
               }else{
              //      alert(selItem.length);
                    selItem.innerHTML="";
                    crearSelectZonasReportes(selItem,dtJson);
                     //crearSelectConcesionarioReportes(selConc);
               }
            }).fail(function(){});
            /*Aqui contruyo la estreuctura de la pagina*/
         /*   var preguntas=new reporte("reporteEncuesta",hdInc.value);
            var respSer=preguntas.metodo();
            respSer.success(function(resSer){
                var dtJson=eval(resSer);
                 div.innerHTML="";
                encuestaReporte(dtJson,"divReporte");

            }).fail(function(){});
           */ 
            
        }else{
            alert("seleccione una encuesta por favor");
        }
    }
    else if(sel.value == "0"){
        selConc.innerHTML="";
        selItem.innerHTML="";
        hNombreEncusta.innerHTML="";
         div.innerHTML="";
         
    } 
}
function cargarRangosReportes(idEncuesta){
    var div=document.getElementById("divRangosReporte");
    div.innerHTML="";	
    var ran= new rangos("obtenerRangosEncuesta",idEncuesta);
    var resp=ran.metodo();
    resp.success(function(respSer){
        var dtJson=eval(respSer);
        for(var i in dtJson){
             var rUno=dtJson[i].Uno.split(",");
            var rDos=dtJson[i].Dos.split(",");
            var rTres=dtJson[i].Tres.split(",");
            var rCuatro=dtJson[i].Cuatro.split(",");
            
             var chbxUno=document.createElement("input");
             var lblUno=document.createElement("label");    
	     var txtUno=document.createTextNode("Entre "+rUno[0]+" y "+rUno[1]);
             lblUno.appendChild(txtUno);
            // var inputUno=document.createElement("input");
	     chbxUno.setAttribute("value","Uno");
             chbxUno.setAttribute("name","rango");
	     chbxUno.setAttribute("type","checkbox");	
             chbxUno.checked=true;
             //inputUno.setAttribute("id","txbRangoUno");
	     div.appendChild(chbxUno);	
             div.appendChild(lblUno);
             //div.appendChild(inputUno);
             
	     var chbxDos=document.createElement("input");
             var lblDos=document.createElement("label");
             var txtDos=document.createTextNode("Entre "+rDos[0]+" y "+rDos[1]);
             lblDos.appendChild(txtDos);
             //var inputDos=document.createElement("input");
             //inputDos.setAttribute("id","txbRangoDos");
	     chbxDos.checked=true;
             chbxDos.setAttribute("value","Dos");
             chbxDos.setAttribute("name","rango");
	     chbxDos.setAttribute("type","checkbox");	
             div.appendChild(chbxDos);	             
             div.appendChild(lblDos);
             //div.appendChild(inputDos);
             
	     var chbxTres=document.createElement("input");
             var lblTres=document.createElement("label");
             var txtTres=document.createTextNode("Entre "+rTres[0]+" y "+rTres[1]);
             lblTres.appendChild(txtTres);
             //var inputTres=document.createElement("input");
             //inputTres.setAttribute("id","txbRangoTres");
             chbxTres.checked=true;
             chbxTres.setAttribute("value","Tres");
             chbxTres.setAttribute("name","rango");
	     chbxTres.setAttribute("type","checkbox");	
             div.appendChild(chbxTres);	             
	     div.appendChild(lblTres);
             //div.appendChild(inputTres);
             
             var chbxCuatro=document.createElement("input");
             var lblCuatro=document.createElement("label");
             var txtCuatro=document.createTextNode("Entre "+rCuatro[0]+" y "+rCuatro[1]);
             lblCuatro.appendChild(txtCuatro);             
             //var inputCuatro=document.createElement("input");
             //inputCuatro.setAttribute("id","txbRangoCuatro");
	     chbxCuatro.setAttribute("value","Cuatro");
             chbxCuatro.setAttribute("name","rango");
             chbxCuatro.checked=true;
	     chbxCuatro.setAttribute("type","checkbox");	
	     div.appendChild(chbxCuatro);	
             div.appendChild(lblCuatro);
             //div.appendChild(inputCuatro);
        }
    }).fail(function(){});
}

function concesionarioPorZona(){
    var sel=document.getElementById("selEncuestaReporte");
    var selConc=document.getElementById("selReporteConcesionario");
   var selItem=document.getElementById("selReporteZona");
    var hdInc=document.getElementById("hdIdEncuestaReporte");
    var hNombreEncusta=document.getElementById("hNombreEncusta");
   //alert("Hola");
    if(hdInc.value!="0" && selItem.value!="0" && selItem.value!="--"){
            var rep=new reporte("buscarConcPorZonaEnc","",selItem.value);
            var respuesta=rep.metodo();
            respuesta.success(function(respServidor){
                var dtJson=eval(respServidor);
              
                if(selConc.length<1){
                    crearSelectConcesionarioReportes(selConc,dtJson);
               }else{
              //      alert(selItem.length);
                    selConc.innerHTML="";
                    crearSelectConcesionarioReportes(selConc,dtJson);
               }
            }).fail(function(){});
            
            
        }else{
             selConc.innerHTML="";
            //alert("seleccione una encuesta por favor");
        }
}
function reporDetalleMuestra(repoDtMuestra){
    var hdInc=document.getElementById("hdIdEncuestaReporte");
    var selZona=document.getElementById("selReporteZona");
    var div=document.getElementById("divMuestra");
   div.innerHTML="";
    //alert(repoDtMuestra);
    switch(repoDtMuestra){
                case"reporteDetalleMuestraZona":
                    var repDetMuestra=new reporte("reporteDetalleMuestraZona",hdInc.value);
                                         var resp=repDetMuestra.metodo();
                                         resp.success(function(respServ){
                                             var dtJson=eval(respServ);
                                             crearTablaDetalleMuestraZonas(dtJson,"divMuestra");
                                             
                                     }).fail(function(){});
            
                    break;
                    
                case"reporteDetalleMuestraConZona":
                    var repDetMuestra=new reporte("reporteDetalleMuestraConZona",hdInc.value,selZona.value);
                                         var resp=repDetMuestra.metodo();
                                         resp.success(function(respServ){
                                              console.log(respServ);
                                             var dtJson=eval(respServ);
                                             crearTablaDetalleMuestraConce(dtJson,"divMuestra");
                                             
                                     }).fail(function(){});
            
                    
                    break;
                 case"reporteDetalleMuestraTodosCon":
                    var repDetMuestra=new reporte("reporteDetalleMuestraTodosCon",hdInc.value);
                                         var resp=repDetMuestra.metodo();
                                         resp.success(function(respServ){
                                             var dtJson=eval(respServ);
                                             console.log(respServ);
                                             crearTablaDetalleMuestraConce(dtJson,"divMuestra");
                                             
                                     }).fail(function(){});
            
                    
                    break;
                
                    default:
                        alert("default");
                        break;

            }
       

}
function crearTablaDetalleMuestraZonas(datos,IdDiv){
    var div=document.getElementById(IdDiv);
    var tabla=document.createElement("table");
    div.innerHTML="";
    var thead=document.createElement("thead");
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Nombre Zona");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Gerente zona");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Uno");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Dos");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Tres");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Cuatro");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("TotalMuestra");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("TotalPorcentaje");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    tabla.appendChild(thead);
    for(var i in datos){
        
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].NombreZona);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].gerenteZona);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Uno);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Dos);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Tres);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Cuatro);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].TotalMuestra);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].TotalPorcentaje);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        tabla.appendChild(fila);
        
        
    }
    div.appendChild(tabla);
}
function crearTablaDetalleMuestraConce(datos,IdDiv){
    var div=document.getElementById(IdDiv);
    var tabla=document.createElement("table");
    div.innerHTML="";
    var thead=document.createElement("thead");
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Nombre concesionario");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Director concesionario");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Uno");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Dos");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Tres");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("Cuatro");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("TotalMuestra");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    var fila=document.createElement("tr");
    var celda=document.createElement("td");
    var txtNode=document.createTextNode("TotalPorcentaje");
    celda.appendChild(txtNode);
    //fila.appendChild(celda);
    thead.appendChild(celda);
    tabla.appendChild(thead);
    for(var i in datos){
        
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].NombreConcesionario);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Director);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Uno);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Dos);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Tres);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].Cuatro);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].TotalMuestra);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        var txtNode=document.createTextNode(datos[i].TotalPorcentaje);
        celda.appendChild(txtNode);
        fila.appendChild(celda);
        tabla.appendChild(fila);
        
        
    }
    div.appendChild(tabla);
}

window.addEventListener("load",Iniciar,false);