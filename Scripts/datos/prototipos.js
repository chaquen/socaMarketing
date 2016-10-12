
function rol_app(operacion,nombreRol,descripcionRol){
    this.nombreRol=nombreRol;
    this.descripcion=descripcionRol;
    this.operacion=operacion;
    this.fechaRegistro=horaCliente();
    this.url="usuario";
    this.metodo=funPeticion;
}
function modulo(operacion,nombreModulo,descripcionModulo,fechaRegistro){
    this.nombreModulo=nombreModulo;
    this.descripcionModulo=descripcionModulo;
    this.fechaRegistro=fechaRegistro;
    this.operacion=operacion;
    this.url="usuario";
    this.crear=funPeticion;
}
function usuario(operacion,nombres,apellidos,cedula,email,clave,preguntaSeguridad,respuesta,ultimaActividad,rol){
    this.nombres=nombres;
    this.apellidos=apellidos;
    this.cedula=cedula;
    this.email=email;
    this.clave=clave;
    this.preguntaSeguridad=preguntaSeguridad;
    this.respuesta=respuesta;
    this.rol=rol;
    this.ultimaActividad=horaCliente();
    this.url="usuario";
    this.operacion=operacion;
    this.crear=funPeticion;
    
}
function login(user,pass){
    this.user=user;
    this.pass=pass;
    this.operacion="login";
    this.url="usuario";
    this.logIn=funPeticion;
    this.ultimaActividad=horaCliente();
    //console.log(this);
}
function cambioClave(usuario,nuevaClave){
    this.usuario=usuario;
    this.nuevaClave=nuevaClave;
    this.operacion="cambioPass";
    this.url="usuario";
    this.cambioPass=funPeticion;
    this.ultimaActividad=horaCliente();
}
function olvidoPass(operacion,user,respuesta){
    this.user=user;
    this.respuesta=respuesta;
    this.operacion=operacion;
    this.url="usuario";
    this.recordar=funPeticion;
    this.ultimaActividad=horaCliente();
   // console.log(this);

}
function AsociarUserEncuesta(operacion,encuesta,usuario,rangoUno,rangoDos,rangoTres){
    this.operacion=operacion;
    this.idEncuesta=encuesta;
    this.idUsuario=usuario;
    this.rangoUno=rangoUno;
    this.rangoDos=rangoDos;
    this.rangoTres=rangoTres;
    this.url="usuario";
    this.metodo=funPeticion;
          
    
}
function encuesta(operacion,nombre,muestra,preguntas,idUser,idRango){
  this.nombreEncuesta=nombre;
  this.fechaCreacion=horaCliente();
  this.nombreFormulario=nombre; 
  this.Fk_Id_Empleado=idUser;
  this.muestra=muestra;
  this.preguntas=preguntas;
  this.rango=idRango;
  this.url="encuesta";
  this.operacion=operacion;
  this.metodo=funPeticion;
 // console.log(this);
}
function permisos(operacion,rol,modulo,consultar,registrar,actualizar,eliminar){
    this.operacion=operacion;
    this.rol=rol;
    this.modulo=modulo;
    this.consultar=consultar;
    this.registrar=registrar;
    this.actualizar=actualizar;
    this.eliminar=eliminar;
    this.url="usuario";
    this.metodo=funPeticion;
    console.log(this);
    
}
function pregunta(operacion,tipo,pregunta,respuestas){
    this.tipo=tipo;
    this.pregunta=pregunta;
    this.respuestas=respuestas;
    this.operacion=operacion;
    this.url="preguntas";
    this.metodo=funPeticion;
    
}

function entrevista(operacion,idEncuesta,respuestas,estado,idCliente,idUsuario,rango,concesionario,Parentesco,tipo,observaciones){
    /*AQUI REGISTRAR RESPUESTAS PARA LA ENCUESTA*/
    this.operacion=operacion;
    this.fk_id_Encuesta=idEncuesta;
    this.respuestas=respuestas;
    this.fecha=horaCliente();
    this.fk_id_cliente=idCliente;
    this.fk_id_usuario=idUsuario;
    this.fk_id_concesionario=concesionario;
    this.Parentesco=Parentesco;
    this.tipo=tipo;
    this.estado=estado;
    this.rango=rango;
    this.observaciones=observaciones;
    this.url="entrevista";
    this.metodo=funPeticion;
}
function muestra(operacion,encuesta,concesionario,usuario,Idmuestra,rangoUno,rangoDos,rangoTres,rangoCuatro){
    this.operacion=operacion;
    this.encuesta=encuesta;
    this.concesionario=concesionario;
    this.muestra=Idmuestra;
    this.usuario=usuario;
    this.rangoUno=rangoUno;
    this.rangoDos=rangoDos;
    this.rangoTres=rangoTres;
    this.rangoCuatro=rangoCuatro;
    this.fechaCreacion=horaCliente();
    this.url="muestra";
    this.metodo=funPeticion;
}
function zona(operacion,nombreZona,director,id){
    this.NombreZona=nombreZona;   
    this.operacion=operacion;
    this.director=director;
    this.id=id;
    this.url="muestra";
    this.metodo=funPeticion;
}
function concesionario(operacion,nombreConsecionario,director,idZona){
    this.nombreConcesionario=nombreConsecionario;
    this.director=director;
    this.idZona=idZona;
    this.operacion=operacion;
    this.url="muestra";
    this.metodo=funPeticion;
        
}

function reporteMensual(operacion,fechaUno,fechaDos,zona,concesionario){
    this.operacion=operacion;
    this.url="reportes_mensual";
    this.fechaUno=fechaUno;
    this.fechaDos=fechaDos;
    this.zona=zona;
    this.concesionario=concesionario;
    this.metodo=funPeticion;
}
function reporte(operacion,idEncuesta,idZona,idConcesionario,respuesta,rangoUno,rangoDos,rangoTres){
    this.idEncuesta=idEncuesta;
    this.idZona=idZona;
    this.idConcesionario=idConcesionario;
    this.respuesta=respuesta;
    this.rangoUno=rangoUno;
    this.rangoDos=rangoDos;
    this.rangoTres=rangoTres;
    this.operacion=operacion;
    this.url="reportes";   
    this.metodo=funPeticion;    
}
/*function reporte(operacion,idEncuesta,idZona,idConcesionario,rangos){
    this.idEncuesta=idEncuesta;
    this.idZona=idZona;
    this.idConcesionario=idConcesionario;
    this.rangos=rangos;
    this.operacion=operacion;
    this.url="reportes_alternativa";
    this.metodo=funPeticion;    
}*/
function cliente(operacion,IdMuestra,Nombre,Apellido,Parentesco,Celular,Contrato,Cupo,CuotasPagas,Concesionario){
    this.operacion=operacion;
    this.idMuestra=IdMuestra;
    this.nombre=Nombre;
    this.apellido=Apellido;
    this.Parentesco=Parentesco;
    this.celular=Celular;
    this.contrato=Contrato;
    this.cupo=Cupo;
    this.cuotasPagas=CuotasPagas;
    this.concesionario=Concesionario;
    this.metodo=funPeticion;
    this.url="muestra";
    
    
}

function exportar(operacion){
    this.operacion=operacion;
    this.url="exportar";
    this.metodo=funPeticion;
}

function rangos(operacion,idEncuesta,rangoUno,rangoDos,rangoTres,rangoCuatro){
    this.operacion=operacion;
    this.encuesta=idEncuesta;
    this.rangoUno=rangoUno;
    this.rangoDos=rangoDos;
    this.rangoTres=rangoTres;
    this.rangoCuatro=rangoCuatro;
    this.metodo=funPeticion;
    this.url="muestra";
}