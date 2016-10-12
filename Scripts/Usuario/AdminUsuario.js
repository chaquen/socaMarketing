//var idUsuario;
function iniciarAdminUsuario(){
  cargarRol(); 
    document.getElementById("btnRegistrarUsuario").addEventListener("click",crearUsuario,false);
    document.getElementById("txbConfirmarClave").addEventListener("change",validarValoresClave,false);
  
  
      
}
function validarValoresClave(){
    var txbclave=document.getElementById("txbclave");
    if(this.value!=txbclave.value){
        alert("Contraseñas no coinciden");
        txbclave.value="";
        this.value="";  
    }
}
function consultarUsuario(){
   
    /*AQUI CODIGO PARA CONSULATR SUSUARIOS*/
    var txbUser=document.getElementById("txbCedulaBuscar");
    if(txbUser.value.length > 0){
        var user=new usuario("buscarUsuarioPorCedula",txbUser.value);
        var respuesta=user.crear();
         respuesta.success(function(respuestaServi){
             if(respuestaServi){
                  var dtJson=eval(respuestaServi);
                  tablaConsultaUsuario(dtJson);
                }else{
                 alert("Ha ocurrido un error por favor comuniquese con los administradores");
             }
             
             
             
         }).fail(function (){});
    }
}
function tablaConsultaUsuario(datos){
    var divPrincipal=document.getElementById("listaUsuarios");
    divPrincipal.innerHTML="";
    var tabla = document.createElement("table");
    var thead=document.createElement("thead");
    var fila = document.createElement("tr");
    var celda = document.createElement("td");
    var hNombre=document.createElement("h4");
    hNombre.innerHTML="Nombres";
    celda.appendChild(hNombre);
    fila.appendChild(celda);
    
    var celda = document.createElement("td");
    var hCedula=document.createElement("h4");
    hCedula.innerHTML="Cedula";
    celda.appendChild(hCedula);
    fila.appendChild(celda);
    
    var celda = document.createElement("td");
    var hEmail=document.createElement("h4");
    hEmail.innerHTML="Email";
    celda.appendChild(hEmail);
    fila.appendChild(celda);
    
    var celda = document.createElement("td");
    var hUltAccion=document.createElement("h4");
    hUltAccion.innerHTML="Ultimo inicio de sesión";
    celda.appendChild(hUltAccion);
    fila.appendChild(celda);
    
    var celda = document.createElement("td");
    var hEditar=document.createElement("h4");
    hEditar.innerHTML="Editar";
    celda.appendChild(hEditar);
    fila.appendChild(celda);
    
    
    var celda = document.createElement("td");
    var hEliminar=document.createElement("h4");
    hEliminar.innerHTML="Eliminar";
    celda.appendChild(hEliminar);
    fila.appendChild(celda);
    thead.appendChild(fila);
    tabla.appendChild(thead);
    
    for(var i in datos){
        var fila = document.createElement("tr");
        
        var celda = document.createElement("td");
        var hNombre=document.createElement("h4");
        hNombre.innerHTML=datos[i].Nombre+" "+datos[i].Apellido;
        celda.appendChild(hNombre);
        fila.appendChild(celda);
        
        var celda = document.createElement("td");
        var hCedula=document.createElement("h4");
        hCedula.innerHTML=datos[i].Cedula;
        celda.appendChild(hCedula);
        fila.appendChild(celda);
        
        var celda = document.createElement("td");
        var hEmail=document.createElement("h4");
        hEmail.innerHTML=datos[i].Email;
        celda.appendChild(hEmail);
        fila.appendChild(celda);
        
        
        var celda = document.createElement("td");
        var hUltimaActividad=document.createElement("h4");
        hUltimaActividad.innerHTML=datos[i].UltimaActividad;
        celda.appendChild(hUltimaActividad);
        fila.appendChild(celda);
        
        var celda = document.createElement("td");
        var btnEditar=document.createElement("input");
        btnEditar.setAttribute("value","Editar");
        btnEditar.setAttribute("onClick","editarUsuario('"+datos[i].IdUsuario+"','"+datos[i].Nombre+"','"+datos[i].Apellido+"','"+datos[i].Email+"');");
        btnEditar.setAttribute("type","button");
        celda.appendChild(btnEditar);
        fila.appendChild(celda);
        tabla.appendChild(fila);
        
        var celda = document.createElement("td");
        var btnEliminar=document.createElement("input");
        btnEliminar.setAttribute("value","Desabilitar");
        btnEliminar.setAttribute("onClick","eliminarUsuario("+datos[i].IdUsuario+");");
        btnEliminar.setAttribute("type","button");
        celda.appendChild(btnEliminar);
        fila.appendChild(celda);
        tabla.appendChild(fila);
    }
    divPrincipal.appendChild(tabla);
    
}
function editarUsuario(id,nombre,apellido,email){
    var txtNuevoNombre=document.getElementById("txbNuevoNombreUsuario");
    var txtNuevoApellido=document.getElementById("txbNuevoAppelidoUsuario");
    var txtNuevoEmail=document.getElementById("txbNuevoEmail");
    txtNuevoNombre.value=nombre;
    txtNuevoApellido.value=apellido;
    txtNuevoEmail.value=email;
    idUsuario=id;
    
}

function realizarEdicion(){
    var txtNuevoNombre=document.getElementById("txbNuevoNombreUsuario");
    var txtNuevoApellido=document.getElementById("txbNuevoAppelidoUsuario");
    var txtNuevoEmail=document.getElementById("txbNuevoEmail");
    var divPrincipal=document.getElementById("listaUsuarios");
    var txt=document.getElementById("txbCedulaBuscar");
    var usr=new usuario("editarUsuario",txtNuevoNombre.value,txtNuevoApellido.value,idUsuario,txtNuevoEmail.value);
    var respuesta=usr.crear();
    respuesta.success(function(respuestaServidor){
        if(respuestaServidor){
            txt.value="";
            divPrincipal.innerHTML="";
            document.getElementById("txbNuevoNombreUsuario").value="";
            document.getElementById("txbNuevoAppelidoUsuario").value="";
            document.getElementById("txbNuevoEmail").value="";
    
            alert("usuario editado con exito");
        }else{
            
        }
        
    }).fail(function(){});
}
function eliminarUsuario(id){
    var divPrincipal=document.getElementById("listaUsuarios");
    var txt=document.getElementById("txbCedulaBuscar");
    var usr=new usuario("eliminarUsuario",id);
    var respuesta=usr.crear();
    respuesta.success(function(respuestaServidor){
        if(respuestaServidor){
            alert("usuario eliminado con exito");
            txt.value="";
            divPrincipal.innerHTML="";
            document.getElementById("txbNuevoNombreUsuario").value="";
            document.getElementById("txbNuevoAppelidoUsuario").value="";
            document.getElementById("txbNuevoEmail").value="";
        }else{
            alert("Ha ocurrido un error por favor comunicate con tu administrador");
        }
        
    }).fail(function(){});
}


function cargarRol(){
 var rl= new rol_app("getAllRoles","","");
 var resp=rl.metodo();
 resp.success(function(respServidor){
     var dtJson=eval(respServidor);
     var sel=document.getElementById("selRol");
     console.log(dtJson);
     crearSelectRol(sel,dtJson);
 }).fail(function(){});
}
function crearUsuario(){
    var ultActividad= horaCliente();
    //console.log(ultActividad);
     var clave=document.getElementById("txbclave");
    // var claveDos=document.getElementById("txbConfirmarClave");
    if(document.getElementById("txbNombres").value !="" && document.getElementById("txbCedula").value!="" && document.getElementById("txbRespuesta").value!="" &&  document.getElementById("selPregunta").value != "0" && document.getElementById("selRol").value != "0"){
        var user = new usuario("crearUsuario",
                          document.getElementById("txbNombres").value,
                          document.getElementById("txbApellidos").value,
                          document.getElementById("txbCedula").value,
                          document.getElementById("txbEmail").value,
                          clave.value,
                          document.getElementById("selPregunta").value,       
                          document.getElementById("txbRespuesta").value,
                          ultActividad,
                          document.getElementById("selRol").value
                         );
                 
     var respUser=user.crear();
     
    respUser.success(function(respServidor){
        limpiarFormRegistrUsuario();
        alert(respServidor);
         
     }).fail(function(){
         alert("Error al crear usuario");
     });
    }else{
        alert("Claves no coinciden");
        clave.value="";
        claveDos.value="";
    }
}

function limpiarFormRegistrUsuario(){
    //alert("Limpiar");
    var form=document.getElementById("formRegistroUsuario");
    for(var i in form.elements ){
        console.log(form.elements[i].type);
        if(form.elements[i].type=="text" || form.elements[i].type=="email" || form.elements[i].type=="password"){
            form.elements[i].value="";
        }
    }
}


//window.addEventListener("load",iniciarAdminUsuario,false);
