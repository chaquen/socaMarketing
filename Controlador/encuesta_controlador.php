<?php
header('Content-Type:text/html; Charset="UTF-8"');  
include("../Modelo/modelo.php");


if(isset($_POST["datos"])){
    $post =  json_decode($_POST["datos"]);
    $operacion=$post->operacion;
    switch ($operacion) {
        case "registrarPlantilla":
         // var_dump($post);
        /*AQUI REGISTRO UN FORMULARIO YA REGISTRADO O PLANTILLA*/
         if($post->nombreEncuesta != "" and $post->nombreFormulario!=""){
             $encuesta= new encuesta();
             $date = new DateTime($post->fechaCreacion);
             $arrNuevaEncuesta=array("nombreEncuesta"=>$post->nombreEncuesta,
                                     "fechaCreacion"=>$date->format("Y-m-d H:i:s"),
                                     "idForm"=>$post->idForm,
                                     "muestra"=>0,   
                                     "Fk_Id_Usuario"=>$post->Fk_Id_Empleado,
                                      "estado"=>"En espera",
                                      "idRango"=>$post->muestra  
                     );
            //    var_dump($arrNuevaEncuesta);                       
             if($encuesta->setPlantilla($arrNuevaEncuesta)){
              echo json_encode($encuesta->mensaje);
            }  else {
                echo json_encode($encuesta->mensaje);
            }
         }
        break;
        
        case "registrarEncuesta":
            //var_dump($post);
            
            $form=new formulario();

            $date = new DateTime($post->fechaCreacion);

            $nuevoForm= array("nombreFormulario"=>$post->nombreFormulario,
                            "fechaCreacion"=>$date->format('Y-m-d H:i:s'),
                             "Fk_Id_Empleado"=>$post->Fk_Id_Empleado, 
                             //"idRango"=>$post->rango,
                             "preguntas"=>$post->preguntas);    
            //var_dump($nuevoForm["preguntas"]);
            if($form->set($nuevoForm)){
                echo json_encode(true); 
            }else{
                echo json_encode(false); 
            }
            break;
        case "obtenerEncuesta":
            function codificarRespuestas($arr=  array()){
                        $arrCod=array();
                        $e=0;
                       foreach ($arr as $value) {
                           $arrCod[$e]=  array_map('utf8_encode', $value);
                           $e++;
                       }
                       //var_dump($arrCod);
                       return $arrCod;
                               
                }
                $encuesta = new encuesta();
                $preguntaDos = new preguntas();
                $preguntaTres = new preguntas();
               //echo $post->nombreEncuesta;
                if($encuesta->get($post->nombreEncuesta)){
                   $arr=array();
                   $i=0;
                   foreach ($encuesta->filas as $value) {
                       $arr[$i]=  array_map('utf8_encode', $value);
                       $preguntaDos->obtenerRespuestas($value["IdPreguntas"]);
                        if(count($preguntaDos->filas)>0){
                          //var_dump($preguntaDos->filas);
                            $arr[$i]["respuestas"]=  codificarRespuestas($preguntaDos->filas);
                        }
                        if($value["Condicion"]==1){
                            $preguntaTres->obtenerCondicion($value["IdDetalleFormulario"]);
                            $e=0;
                            foreach ($preguntaTres->filas as $p){
                                $arr[$i]["condiciones"][$e]=$p;
                                $e++;
                            }
                            $preguntaTres->filas=array();
                        }
                        $i++;
                   }
                   //var_dump($arr); 
                   echo json_encode($arr);
                 // var_dump($arr);
                }
                else{
                    echo json_encode($encuesta->mensaje);
                }
            //    var_dump($encuesta->filas);
            break;        
        case "obtenerEncuestaPlantillas":
                $encuesta = new encuesta();
               //echo $post->nombreEncuesta;
                if($encuesta->getPlantilla($post->nombreEncuesta)){
                    $respuestas=new preguntas();
                   $arr=array();
                   $i=0;
                   foreach ($encuesta->filas as $value) {
                       //$arr[$i]=  array_map('utf8_encode', $value);
                       $arr[$i]=  $value;
                       $respuestas->obtenerRespuestas($value["Fk_Id_Pregunta"]);
                       $e=0;
                       foreach ($respuestas->filas as $r) {
                           //$arr[$i]["respuestas"][$e]=  array_map('utf8_encode',$r);
                           $arr[$i]["respuestas"][$e]=  $r;
                           $e++;
                       }
                       $i++;
                       
                   }

                   echo json_encode($arr);
                  //var_dump($arr);
                }else{
                    echo json_encode($encuesta->mensaje);
                }
            //    var_dump($encuesta->filas);
            break;    
        case "obtenerEncuestaSinMuestra";
            $enc= new encuesta();
            $estado="Sin muestra";
            $enc->encuestaPorEstado($estado);
            if(count($enc->filas)>0){
                $arr=array();
                $a=0;
                foreach ($enc->filas as $value) {
                    $arr[$a]=  array_map('utf8_encode', $value);
                    $a++;
                }
                echo json_encode($arr); 
                //echo json_encode($enc->filas);
            }else{
                echo json_encode("No hay coincidencias");
            }
            break;
        case "cambiarEstadoEncuesta":
        $enc= new encuesta();
        $enc->cambioEstado($post->muestra, $post->nombreEncuesta);

        break;
        case "obtenerTodasEncuestas":
           $enc= new encuesta();
           $enc->getAlls();
           if(count($enc->filas)>0){
               echo json_encode($enc->filas);
           }else{
               echo json_encode($enc->mensaje);
           }
        break;
        case 'consultarEncuestasPorAgente':
                $enc=new encuesta();
                $enc->encuestasPorUsuario($post->nombreEncuesta,"Lista para proceso");
                $enc->encuestasPorUsuario($post->nombreEncuesta,"En proceso");
                if(count($enc->filas)>0){
                  $arr=array();
                  $i=0;
                  foreach ($enc->filas as $key => $value) {
                      $arr[$i]=array_map('utf8_encode',$value);
                      $i++;
                  }
                  echo json_encode($arr);
               }else{

                   echo json_encode("Usted no tiene encuestas pendientes para realizar");
               }
                    
            
           break;
        case 'consultarFormularios':
            $frm=new formulario();
             $frm->getAlls();
             if(count($frm->filas)>0){
                 $arr=array();
                 $i=0;
                 foreach ($frm->filas as $key => $value) {
                     $arr[$i]=  array_map('utf8_encode',$value);
                     $i++;
                 }
                 echo json_encode($arr);
             }else{
                 echo json_encode("No hay coincidencias");
             }             

           break;
        case "obtenerCantidadMuestra":
            $enc=new encuesta();
            $enc->obtenerAsignadas($post->nombreEncuesta);
            if(count($enc->filas)>0){
               $arr=array();
               $i=0;
               foreach ($enc->filas as $key => $value) {
                   $arr[$i]= array_map('utf8_encode', $value);
                   $i++;
               }
               echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            }
        break;
        case "obtenerEncuestaListasProceso":
            $enc= new encuesta();
            $estado="Lista para proceso";
            $enc->encuestaPorEstado($estado);
            
            if(count($enc->filas)>0){
                $arr=array();
                $i=0;
                foreach ($enc->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            }
            break;
        case "obtenerEncuestaSinMuestra":
            $enc= new encuesta();
            $estado="Sin muestra";
            $enc->encuestaPorEstado($estado);
            
            if(count($enc->filas)>0){
                $arr=array();
                $i=0;
                foreach ($enc->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            }
            break;
        case "obtenerEncuestaEnProceso":
            $enc= new encuesta();
            $encuestaDos=new encuesta();
            $estado="En proceso";            
            $estadoDos="Lista para proceso";
            $enc->encuestaPorEstado($estado);
            $encuestaDos->encuestaPorEstado($estadoDos);
            if(count($enc->filas)>0 || count($encuestaDos->filas)>0){
               $arr=array();
                $i=0;
                foreach ($enc->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                
                
                foreach ($encuestaDos->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            }
            break;
        case "obtenerEncuestaEnEspera":
               $enc= new encuesta();
            $estado="En espera";
            //$estado="Lista para proceso";
            $enc->encuestaPorEstado($estado);
            if(count($enc->filas)>0){
                $arr=array();
                $i=0;
                foreach ($enc->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            }
            break;
        case "obtenerUsuariosPorEncuesta":
            $enc = new encuesta();
            $enc->obtenerUsuariosPorEncuesta($post->nombreEncuesta);
            if(count($enc->filas)>0){
              $arr=array();
                $i=0;
                foreach ($enc->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            }
            break;
        case "obtenerEncuestaSinCantidadMuestra":
            $enc= new encuesta();
            
            $enc->encuestaSinCantidadMuestra();
            
            if(count($enc->filas)>0){
                $arr=array();
                $i=0;
                foreach ($enc->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            }
            
            
            break;
        case "actualizarCantidadMuestraGeneral":
            $en=new encuesta();
            if($en->cambiarCantidadMuestra($post->nombreEncuesta, $post->muestra)){
                echo json_encode(true);
            }else{
                echo json_encode(false);
            }
            
            break;
        case "ConsultarTodosLosFormularios":
            $form=new formulario();
            $form->getPlantillas();
            $arr=array();
            $i=0;
            if(count($form->filas)>0){
                foreach ($form->filas as $key => $value) {
                 $arr[$i]=  array_map('utf8_encode', $value);
                 $i++;
                }
                echo json_encode($arr);
            }else{
                echo json_encode(false);
            }
            break;
        case "encuestaPorFormulario":
//            var_dump($post);
            $enc=new encuesta();
            $enc->encuestaPorFormulario($post->nombreEncuesta, "%");
            if(count($enc->filas)>0){
               $arr=array();
                $i=0;
                foreach ($enc->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                
                echo json_encode($arr);
            }else{
                echo json_encode(false);
            }
            
            break;
        case "obtenerEncuestasSinRango":
            $enc=new encuesta();
            $enc->encuestasSinRango();
            if(count($enc->filas)>0){
                $arr=array();
                $i=0;
                foreach ($enc->filas as $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                echo json_encode($arr);
            }else{
                echo json_encode(false);
            }
            break;
        case "editarRangoEncuesta":
            //var_dump($post);
            $enc=new encuesta();
            echo json_encode($enc->editarRangoEncuestas($post->nombreFormulario, $post->muestra));
            break;
        default:
            echo json_encode("No ha definido operacion");
            break;
    }
}
?>  