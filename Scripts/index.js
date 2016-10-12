/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Iniciar(){
    document.getElementById("btnEnviar").addEventListener("click",pregunta,false);
};
function pregunta(){
    console.debug(document.getElementsByName('1'));
}
window.addEventListener("load",Iniciar,false);