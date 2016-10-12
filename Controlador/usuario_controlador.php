<?php
//session_start();
header('Content-Type:text/html; Charset="UTF-8"');  
include("../Modelo/modelo.php");
//var_dump($_POST["datos"]);
if(isset($_POST["datos"])){
    $post =  json_decode($_POST["datos"]);
    $operacion=$post->operacion;
    
    switch ($operacion){
        case "crearRol":
            $objRol=new roles();
            
            $date = new DateTime($post->fechaRegistro);
            $date->format('Y-m-d H:i:s');
                       $nuevoRol=array("nombreRol"=>$post->nombreRol,
                                        "descripcionRol"=>$post->descripcion,
                                         "fechaRegistro"=>$date->format('Y-m-d H:i:s'));
           if($objRol->set($nuevoRol)){
               echo json_encode($objRol->mensaje);
           }else{
               echo json_encode($objRol->mensaje);
           }
            break;
        case "getAllRoles":
            $rol= new roles();
            $rol->getAlls();
            //echo count($rol->filas);
            if(count($rol->filas)>0){
                echo json_encode($rol->filas);
            }else{
                echo json_encode("No hay coincidencias");
            } 
            
            break;
        case "crearUsuario":
            //var_dump($post);
            //date_default_timezone_set('America/Bogota');
      //      echo $post->ultimaActividad;
            
           $date = new DateTime($post->ultimaActividad);
           //;  
            $nuevoUser=array("nombres"=>$post->nombres,
                            "apellidos"=>$post->apellidos,
                            "cedula"=>$post->cedula,
                            "email"=>$post->email,
                            "clave"=>$post->clave,
                            "preguntaSeguridad"=>$post->preguntaSeguridad,
                            "respuesta"=>$post->respuesta,
                            "ultimaActividad"=>$date->format('Y-m-d H:i:s'),
                             "rol"=>$post->rol,                
                            );
            $user= new usuario();
            $user->set($nuevoUser);
            echo json_encode($user->mensaje);
            
            break;
        case "consultarAsesor":
            $user= new usuario();
            $user->getAlls();
            if(count($user->filas)>0){
                //echo json_encode($user->filas);
                $arr=array();
                $i=0;
                foreach ($user->filas as  $value) {
                    $arr[$i]=array_map('utf8_encode',$value);
                    $i++;
                }
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            } 
            break;
        case "buscarUsuarioPorCedula":
            $user=new usuario();
            $user->get($post->nombres,$post->nombres);
            $arr=array();
            $i=0;
            foreach ($user->filas as $value) {
                $arr[$i]=array_map('utf8_encode',$value);
                $i++;
            }
            echo json_encode($arr);
            break;
        case "editarUsuario":
            $usuario=new usuario();
            //var_dump($post);
            $nuevosDatos=array("nombre"=>$post->nombres,"apellido"=>$post->apellidos,"email"=>$post->email,"idUsuario"=>$post->cedula);
            echo json_encode($usuario->editarUsuario($nuevosDatos));
            break;
        case "eliminarUsuario":
            $usuario=new usuario();
            echo json_encode($usuario->eliminarUsuario($post->nombres));
            break;
        case "asociarUserEncuesta":
            $enc=new encuesta();
            $rangoTotal=$post->rangoUno+$post->rangoDos+$post->rangoTres;
            $asociacion=array("idEncuesta"=>$post->idEncuesta,
                               "idUsuario"=>$post->idUsuario,
                               "rangoUno"=>$post->rangoUno,
                                "rangoDos"=>$post->rangoDos,
                                "rangoTres"=>$post->rangoTres,
                                 "rangoTotal"=>$rangoTotal);
            $enc->asociarUsuario($asociacion);
            echo json_encode($enc->mensaje);
            break;
        case "login":
            //var_dump($post);
            $user= new usuario();
            
            if($user->Ingresar($post->user,$post->pass,$post->ultimaActividad)){
              
                     //session_start();
                   //  $_SESSION["usuario"]=$user;
                     $userArray=array("idUsuario"=>$user->idUsuario,
                                    "email"=>$user->email,
                                    "nombre"=>$user->nombres,
                                    "apellidos"=>$user->apellidos,    
                                    "cedula"=>$user->cedula,
                                   "rol"=>$user->rol);
                   //  $_SESSION["usuario"]=$userArray;
                     
              echo json_encode($userArray);
            }else{
                $userArray=array("rol"=>$user->mensaje);
                echo json_encode($userArray);
            }
            break;
        case "getAllModulos":
            $mod= new modulos();
            $mod->getAlls();
           // var_dump($mod->filas);
            if(count($mod->filas)>0){
                
                echo json_encode($mod->filas);
            }else{
                json_encode("No hay coincidencias");
            }
            break;
        case "asignarPermiso":
            
            $mod=new modulos();
            $permisos=array("rol"=>$post->rol,
                              "modulo"=>$post->modulo,
                              "consultar"=>$post->consultar,
                               "registrar"=>$post->registrar,
                               "actualizar"=>$post->actualizar,
                               "eliminar"=>$post->eliminar );
            
            $mod->setPermisos($permisos);
            echo json_encode($mod->mensaje);    
            //var_dump($post);
            break;
        case "olvidoPass":
            $usuario=new usuario();
            $usuario->olvidoClave($post->user, $post->user);
            //var_dump($usuario->sentencia_Sql);
            echo json_encode($usuario->pregunta);
            //var_dump($usuario->pregunta);
            break;
        case "validarRespuesta":
          //  var_dump($post);
            $usuario=new usuario();
            
            $usuario->validarRespuesta($post->respuesta,$post->user,$post->ultimaActividad );
            //var_dump($usuario->filas);
            echo json_encode($usuario->mensaje);
            break;
        case "cambioPass":
            
            $usuario=new usuario();
            $usuario->getId($post->usuario);
            
            if($usuario->cedula!=null){
                echo $usuario->cedula;
                $usuario->cambioClave($usuario->cedula,$post->nuevaClave,$post->ultimaActividad);
                echo json_encode($usuario->mensaje); 
            }else{
                echo json_encode("No hay coincidencias"); 
            }
            
            break;
        case "obtenerTodosLosUsuarios":
             $user= new usuario();
            $user->obtenerTodosLosUsuarios();
            if(count($user->filas)>0){
                //echo json_encode($user->filas);
                $arr=array();
                $i=0;
                foreach ($user->filas as  $value) {
                    $arr[$i]=array_map('utf8_encode',$value);
                    $i++;
                }
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            } 
            
            break;
        case "cerrarSesion":
            $us = new usuario();
            echo json_encode($us->cerrarSesion($post->ultimaActividad,$post->nombres));
            break;
        case "buscarUsuario":
            $us=new usuario();
            $us->getId($post->nombres);
            $arr=array();
            $a=0;
            foreach ($us->filas as $value) {
                $arr[$a]=  array_map('utf8_encode', $value);
                $a++;
            }
            echo json_encode($arr);
            break;
    }
}


?>