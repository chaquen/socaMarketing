<?php
header('Content-Type:text/html; Charset="UTF-8"');  
include("../Modelo/modelo.php");
//var_dump($_POST["datos"]);

if(isset($_POST["datos"])){
    $post =  json_decode($_POST["datos"]);
    $operacion=$post->operacion;
    switch ($operacion) {
    
     case "obtenerCliente":
         //var_dump($post);
         $mue=new muestra();
         $arregloRespuesta=array();
         $finBusqueda=FALSE;
         $mue->obtenerRangos($post->fk_id_Encuesta, $post->fk_id_usuario,0,0);
         $estadoBusqueda="pendiente";
        //echo "Numero de filas retornadas en la consulta ".count($mue->filas);
        //var_dump($mue->filas);
         $filas=array();
        if(count($mue->filas)>0){
           $filas=$mue->filas; 
            //recorro los valores de la consulta para determinar si finalizo el detalle
           while($finBusqueda!=TRUE){
               
               foreach ($filas as $key => $value){
                   
                //echo (int)$value["AsignadasUsuario"]."-";
                //echo (int)$value["RealizadasUsuario"];
          //          echo "-".$value["Fk_Id_Concesionario"]."";
                   /*echo $value["RealizadasDetalleRangoUno"]."-";
                   echo $value["RealizadasDetalleRangoDos"]."-";
                   echo $value["RealizadasDetalleRangoTres"]."-";
                   echo $value["RealizadasDetalleRangoCuatro"]."-";*/
                   
                   $realizadas=(int)$value["RealizadasDetalleRangoUno"]+(int)$value["RealizadasDetalleRangoDos"]+(int)$value["RealizadasDetalleRangoTres"]+(int)$value["RealizadasDetalleRangoCuatro"];
                   //echo $realizadas;
                    if($realizadas <= (int)$value["AsignadasUsuario"] ){

                        $valoresUno=explode(",",$value["Uno"]);//Separo los valores de los rangos asignados asignados como primer rango  
                        $valoresDos=explode(",",$value["Dos"]);//Separo los valores de los rangos asignados asignados como segundo rango
                        $valoresTres=explode(",",$value["Tres"]);//Separo los valores de los rangos asignados asignados como tercer rango
                        $valoresCuatro=explode(",",$value["Cuatro"]);//Separo los valores de los rangos asignados asignados como cuarto rango
                        $celda=$value["CeldaMuestra"];
                        /*Array con los valores de los rengos asignados para una 
                        fila de la taba detalle_encuesta_muestra*/
                        $arrRangos=array("RangoUno"=>$value["RangoUno"],
                                                    "RangoDos"=>$value["RangoDos"],
                                                    "RangoTres"=>$value["RangoTres"],
                                                    "RangoCuatro"=>$value["RangoCuatro"]);  

                        /*var_dump($valoresUno);
                        //var_dump($valoresDos);
                        //var_dump($valoresTres);
                        //var_dump($valoresCuatro);*/
                        /*echo "****Realizadas rango uno***";
                        echo $value["RealizadasRangoUno"];
                        echo "***Asignadas rango uno****";
                        echo $value["RangoUno"];
                        echo "****Realizadas rango dos***";
                        echo $value["RealizadasRangoDos"];
                        echo "***Asignadas rango dos****";
                        echo $value["RangoDos"];

                        echo "****Realizadas rango tres***";
                        echo $value["RealizadasRangoTres"];
                        echo "***Asignadas rango tres****";
                        echo $value["RangoTres"];

                        echo "****Realizadas rango cuatro***";
                        echo $value["RealizadasRangoCuatro"];
                        echo "***Asignadas rango cuatro****";
                        echo    $value["RangoCuatro"];
                        */
                       $i=0; 
                       foreach ($arrRangos as $k => $v){
                           //Evaluo que las realizadas de acuerdo a un rango no superen las asignadas para ese rango 
                           //ej. RealizadasRangoUno < asignadas RangoUno y RangoUno > 0
                               if((int)$value["RealizadasDetalle".$k] < (int)$v && $v > 0 ) {

                               switch ($k){
                                   case "RangoUno":
                                       $valUno=$valoresUno[0];
                                       $valDos=$valoresUno[1];  
                                       break;
                                   case "RangoDos":
                                       $valUno=$valoresDos[0];
                                       $valDos=$valoresDos[1];
                                       break;
                                   case "RangoTres":
                                       $valUno=$valoresTres[0];
                                       $valDos=$valoresTres[1];
                                       break;
                                   case "RangoCuatro":
                                       $valUno=$valoresCuatro[0];
                                       $valDos=$valoresCuatro[1];
                                       break;

                               }
                               /*Valido que ninguno de los dos rangos sea cero*/
                               if($valUno != 0 || $valDos != 0 ){
                                   
                                          $mue->seleccionarMuestraEntrevistaRango($value["Fk_Id_Usuario"], $value["Fk_Id_Concesionario"], $valUno, $valDos,$celda,$estadoBusqueda,$value["Fk_Id_Encuesta"]);
                                           $arr=array();
                                            $i=0;
                                            foreach ($mue->filas as $valor) {
                                                $arr[$i++]=array_map('utf8_encode', $valor);
                                            }
                                       
                                       
                                }
                            }

                                if($i>0){
                                    $arregloRespuesta=$arr;
                                    break;

                                }

                        }//Fin foreach de los asignadas por rango


                      }
                    //Fin bloque condicional si realizadas <= asignadas

                    //Evaluo que hay un registro que mostrar al usuario
                    if(count($arregloRespuesta)>0){
                       
                       $finBusqueda=TRUE;
                       break;
                    }
                

                }//Fin ciclo con los detalles de la encuesta
                
                
                if($estadoBusqueda=="pendiente" && count($arregloRespuesta) == 0){
              
                     $estadoBusqueda="reprocesar";
                    //echo "hoola";
                }else{
                    $finBusqueda=TRUE;
                }
                /**
                 * Busqueda de registros para reproceso
                 */
               
               
                    
            
           }//Fin Ciclo While para validar que no hay ningun registro para la encuesta 
           //No hay pendientes ni por reprocesar
            
            //Fin del ciclo foreach principal
            //
            if(count($arregloRespuesta) > 0){
              echo json_encode($arregloRespuesta);
            }else{    
              $arrRespuestaError=array("respuesta"=>FALSE,"mensaje"=>"No hay ningun registro en la base de datos que cumpla los rangos de evaluación ");
              
              echo json_encode($arrRespuestaError);
            }
            
         }
         else{
           $arrRespuestaError=array("respuesta"=>FALSE,"mensaje"=>"Usted ya finalizo las encuestas asignadas");
                
              echo json_encode($arrRespuestaError);
            }
         break;
     case "regEntrevista":
            $entre= new entrevista();
            $muestra=new muestra(); 
            $enc=new encuesta();
            $res=array();
            $resTipo;
            //var_dump($post);
            
            $i=0;
          
            $date = new DateTime($post->fecha);
            
            $nuevaEntrevista=array("estado"=>$post->estado,
                                   "res"=>$post->respuestas,
                                   "estado"=>$post->estado, 
                                   "fk_id_usuario"=>$post->fk_id_usuario,
                                    "fk_id_cliente"=>$post->fk_id_cliente,
                                    "fk_id_encuesta"=>$post->fk_id_Encuesta,
                                    "Fk_Id_Concesionario"=>$post->fk_id_concesionario,
                                    "tipo"=>$post->tipo,
                                    "fecha"=>$date->format('Y-m-d H:i:s'),
                                    "observaciones"=>$post->observaciones);
           
            //Registro la entrevista
            //var_dump($nuevaEntrevista);
            if($entre->set($nuevaEntrevista)){
                $muestra= new muestra();
                $muestra->obtenerValorRangosEncuesta($post->fk_id_Encuesta);
                
                ///var_dump($muestra->filas);
                //echo "--";
                foreach ($muestra->filas as $value) {
                    $varUno=explode(",",$value["Uno"] );
                    $varDos=explode(",",$value["Dos"] );
                    $varTres=explode(",",$value["Tres"] );
                    $varCuatro=explode(",",$value["Cuatro"] );
                    //var_dump((float)$post->rango);
                      //  var_dump($muestra->filas);
                    if((float)$post->rango >= (int)$varUno[0] && (float)$post->rango <= (int)$varUno[1]){
                         $ran="Uno";
                    }else if((float)$post->rango >= (int)$varDos[0]-1 && (float)$post->rango <= (int)$varDos[1]){
                         $ran="Dos";
                    }else if((float)$post->rango >= (int)$varTres[0]-1 && (float)$post->rango <= (int)$varTres[1]){
                         $ran="Tres";
                    }else if((float)$post->rango >= (int)$varCuatro[0]-1 && (float)$post->rango<=(int)$varCuatro[1]){
                         $ran="Cuatro";
                    }
                    
                }
                
               //echo $ran;
                $cadena=array("idEncuesta"=>$post->fk_id_Encuesta,
                              "rango"=>$ran,
                               "idUsuario"=>$post->fk_id_usuario);
                //Actualizo el valor de entrevistas por rango
                if($entre->actualizarRealizadasUsuario($cadena)){
                    $mueDetalle=new muestra();
                    
                    $mue=new muestra();
                    $mue->obtenerRangos($post->fk_id_Encuesta, $post->fk_id_usuario,1,$post->fk_id_concesionario);
                     foreach ($mue->filas as $key => $value){
                         $idDetalle=$value["IdDetalleEncuestaMuestra"];   
                         $mueDetalle->actualizarRealizadasDetalleRango($ran, $idDetalle);    
                     }
                     
                     $mue=new muestra();
                    $mue->obtenerRangos($post->fk_id_Encuesta, $post->fk_id_usuario,1,$post->fk_id_concesionario);
                    //echo "**";
                    //var_dump($mue->filas);
                    $idDetalle=0;
                    foreach ($mue->filas as $key => $value){
                        $idDetalle=$value["IdDetalleEncuestaMuestra"];    
                        
                       /* echo $value["RealizadasDetalleRangoUno"];
                        echo "**";
                        echo $value["RangoUno"];
                        echo "**";
                        echo $value["RealizadasDetalleRangoDos"];
                        echo "**";
                        echo $value["RangoDos"];
                        echo "**";
                        echo $value["RealizadasDetalleRangoTres"];
                        echo "**";
                        echo $value["RangoTres"];
                        echo "**";
                        echo $value["RealizadasDetalleRangoCuatro"];

                        echo "**";
                        echo $value["RangoCuatro"];*/
                        
                        if((int)$value["RealizadasDetalleRangoUno"] == (int)$value["RangoUno"]
                                && (int)$value["RealizadasDetalleRangoDos"] == (int)$value["RangoDos"]
                                && (int)$value["RealizadasDetalleRangoTres"] == (int)$value["RangoTres"]
                                && (int)$value["RealizadasDetalleRangoCuatro"] == (int)$value["RangoCuatro"]){
                            $param=array("idEncuesta"=>$post->fk_id_Encuesta,
                                          "idUsuario"=>$post->fk_id_usuario,
                                          "idDetalleEncuesta"=>$value["IdDetalleEncuestaMuestra"]  );
                                        
                            $mue->cambiarEstadoDetalleEncuestaMuestra($param);
                            $mue->cambiarDetalleEncuestaUsuario($param);
                        }


                    }
                    
                    
                    $enc->actualizarRealizadasEncuesta($post->fk_id_Encuesta,$date->format('Y-m-d H:i:s'));

                    $camEstado=array("idMuestra"=>$post->fk_id_cliente,
                                       "Parentesco"=>$post->Parentesco, 
                                      "estado"=>"efectivo" );
                    
                     if($muestra->setActualizarMuestra($camEstado)){
                          echo json_encode(TRUE);
                     }else{
                           echo json_encode(FALSE);
                     }

                }
            }
            else{
                echo json_encode($entre->mensaje);
            }
           break;    
     case "cancelarEntrevista":
        //echo  $post->estado;
         $mues=new muestra();
         $estado="";
         if($post->estado){
             /*NC=>No contesta,
              * NDR=>No desea responder,
              * TE=>Telefono errado,
              * ND=>No hay datos,
              * EQ=>Equivocado,
              * NE=>No efectiva,
              * EF=>Efectiva,
              * ME=>Actualizacion/Asistencia,
              * BZ=>Buzon,
              * CL=>Colgo llamada,
              * AP=>Apagado,
              * CF=>Confirmar,
              * VLL=>Volver a llamar, 
              * DL=>Delicado*/
             switch ($post->estado){
                 case "NDR":
                     $estado="descartado";
                     break;
                 case "EQ":
                     $estado="descartado";
                     break;
                 case "ND":
                     $estado="descartado";
                     break;
                 case "TE":
                     $estado="descartado";
                     break;
                 case "NE":
                     $estado="descartado";
                     break;
                 case "CL":
                     $estado="descartado";
                     break;
                  case "DL":
                     $estado="descartado";
                     break;
                 case "BZ":
                     $estado="reprocesar";
                     break;
                 case "AP":
                     $estado="reprocesar";
                     break;
                 case "VLL":
                     $estado="reprocesar";
                     break;
                 case "CF":
                     $estado="reprocesar";
                     break;
                 case "NC":
                     $estado="reprocesar";
                     break;
                 default :
                     $estado="reprocesar"; 
                     break;
             }
         }
         //echo $estado;
         $cadena=array("idMuestra"=>$post->fk_id_cliente,
                        "estado"=>$estado,
                        "observaciones"=>$post->observaciones);
         $entrevista = new entrevista();         
         $date = new DateTime($post->fecha);

         $nuevaEntrevista = array("fecha"=>$date->format('Y-m-d H:i:s'),
                                   "fk_id_cliente"=>$post->fk_id_cliente,
                                   "fk_id_usuario"=>$post->fk_id_usuario,
                                    "fk_id_encuesta"=>$post->fk_id_Encuesta,
                                     "estado"=>$post->estado,
                                     "observaciones"=>$post->observaciones);
         if($entrevista->setDescartada($nuevaEntrevista)){
            $mues->setCambiaEstadoMuestra($cadena);             
            
            echo json_encode(TRUE);
         }  else {
             echo json_encode(FALSE);
         }
         
         
         break;
     case "obtenerRealizadas":
        $usuario= new usuario();
         $usuario->obtenerUnUsuarioPorEncuesta($post->fk_id_Encuesta,$post->fk_id_usuario);
         echo json_encode($usuario->filas);
         //var_dump($usuario->filas);
        break;
    }
}
?>