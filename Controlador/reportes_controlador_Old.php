        <?php
header('Content-Type:text/html; Charset="UTF-8"');  
include("../Modelo/modelo.php");
//var_dump($_POST["datos"]);
if(isset($_POST["datos"])){
    $post =  json_decode($_POST["datos"]);
$operacion=$post->operacion;

switch ($operacion) {
        case "buscarEncuesta":
            //var_dump($post);
            $enc= new encuesta();
             //Buscar encuestas finalizadas   
            //$enc->encuestaPorEstado('Finalizada');
            //Buscar encuestas finalizadas y que tengan en comun un formulario
            $enc->encuestaPorFormulario($post->idEncuesta,'Finalizada');
            if(count($enc->filas)>0){
                echo json_encode($enc->filas);                   
            }else{
                echo json_encode(false);
            // echo json_encode("No hay encuestas finalizadas");
            }        
            break;
        case "buscarCompararEncuesta":
            //var_dump($post);
            $enc= new encuesta();
           
            $enc->encuestasFinalizadasConLaMismaPlantilla($post->idEncuesta,'Finalizada');
            if(count($enc->filas)>0){
                echo json_encode($enc->filas);                   
            }else{
                echo json_encode(false);
            // echo json_encode("No hay encuestas finalizadas");
            }       
            break;
        case "encuestasParaReporte":    
            $encu=new encuesta();
            $encu->encuestaPorEstado("Finalizada");
            $arr=array();
            $i=0;
            foreach ($encu->filas as $value) {
                $arr[$i]=array_map('utf8_encode',$value);
                $i++;
            }
            echo json_encode($arr);
            break;
        case "buscarZonasPorEncuesta":
            $zn = new zona();
            $zn->zonasEncuesta($post->idEncuesta);
            //var_dump($zn->filas);
            echo json_encode($zn->filas);
            break;
        case "buscarConcPorZonaEnc":
            $cns=new concesionario();
            //$cns->concesionarioEncuesta($post->idEncuesta,$post->idZona);
            $cns->getPorZona($post->idZona);
            echo json_encode($cns->filas);
            break;
        case "buscarEncuestaPorFecha":
          //  var_dump($post);
            //echo $fechaUno=new DateTime();
            
            
            $enc=new encuesta();
            if($enc->buscarFinalizadasPorFecha($post->idZona." 00:00:00",$post->idEncuesta." 23:59:59")){
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
        
        case "reporteEncuestaGeneralFiltro":
            
            //var_dump($post);     
              $encuesta = new encuesta();
              //$pregunta= new preguntas();
              $zn= new zona();
              //$pregunta->get($post->idPregunta);
             
              /*Obtengo las preguntas,respuestas de     la encuesta */
              if($post->idZona==0 AND $post->idPregunta==0){
                   $zn->zonasEncuesta($post->idEncuesta);  
                  if($encuesta->getReporte($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                    foreach ($encuesta->filas as $value) {
                         $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["pregunta"]),
                                                 "tipo"=>utf8_encode($value["Tipo"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 

                        $i++;
                    }
                    //var_dump($arrPreguntas);
                      $encuesta->filas=array();  
                        $arrFinal=array();
                           
                          foreach ($zn->filas as  $valor) {
                             foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);
                                     $j=0; 
                                     //var_dump($respuestas);
                                     
                                     //echo $val["tipo"]."=>".$valor["IdZona"]."";
                                      foreach ($respuestas as  $valRes) {
                                          
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                 $salir=true;
                                                 $comm=false;
                                                break;
                                              case "Cerrada":
                                                 $encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],  trim(utf8_decode($valRes)));
                                                  $salir=false;
                                                  $comm=false;
                                                  break;
                                              case "CerradaComentario":
                                                 
                                                  //$p=0;
                                                  //echo count($respuestas);
                                                  //foreach ($respuestas as $key => $value) {
                                                  //echo $valRes."-";
                                                  $res=explode(";",$valRes);
                                                  // echo $res[0]."*".$j
                                                  //var_dump($res);
                                                 
                                                   if(count($res)==2){
                                                      // echo count($res)."----<br>----";
                                                       foreach($res as $r){
                                         //                  echo "res=>".$res[0]."/";
                                           //                echo $valor["IdZona"];
                                                          
                                                       $encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],trim(utf8_decode($r)));
                                       //                   $encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$res[0]);
                                                    }    
                                                   }else{
                                                     $encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],trim(utf8_decode($valRes)));
                                                        
                                                   } 
                                                 
                                                  $salir=false;
                                                  $comm=true;
                                                  break;
                                              
                                              case "CerradaMultiple":
                                                  
                                                  $encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],  trim(utf8_decode($valRes)));
                                                  $salir=false;
                                                  $comm=false;
                                                 
                                                  break;
                                          }
                                          
                                          if($salir){
                                              break;                                              
                                          }
                                           
                                          
                                      }
                                      if($comm){
                                                
                                                $encuesta->encuestaReporteRankZonasAbiertas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"]);
                                            }
                                      if($salir){
                                          $encuesta->encuestaReporteRankZonasAbiertas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"]);
                                      }
                                  }
                                  
                          }

                          $i=0;
                       //   echo $encuesta->mensaje;
                         // var_dump($encuesta->filas);
                          foreach ($encuesta->filas as $value) {
                              
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                          
                          //
                          echo json_encode($arrFinal);  
                          //var_dump($encuesta->filas);   
                 }else{
                //    echo json_encode($encuesta->mensaje);
                 }
             
              }
              else if($post->idZona !=0 AND $post->idPregunta==0){
                       
                  if($encuesta->getReporte($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                    foreach ($encuesta->filas as $value) {
                       
                        $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["pregunta"]),
                                                 "tipo"=>utf8_encode($value["Tipo"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 

                        $i++;
                    }
                      $encuesta->filas=array();  
                        $arrFinal=array();

                        
                             foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);
                                     //var_dump($respuestas);
                                      foreach ($respuestas as  $valRes) {
                                          
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  
                                                  $salir=true;
                                                  $comm=false;
                                                break;
                                              case "Cerrada":
                                                  $encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],  trim(utf8_decode($valRes)));
                                                   $salir=false;
                                                  $comm=false;
                                                  break;
                                              case "CerradaComentario":
                                                 
                                                  
                                                    $res=explode(";",$valRes);
                                                    //echo $res[0];
                                                    //var_dump($valRes);
                                                    //$encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],$res[0]);
                                                   foreach($res as $r){
                                                       //echo $r;
                                                       $encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],  trim(utf8_decode($r)));
                                                    }
                                               
                                                    $salir=false;
                                                    $comm=true;
                                                  break;
                                             
                                              case "CerradaMultiple":
                                                  $encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],  trim(utf8_decode($valRes)));
                                                   $salir=false;
                                                  $comm=false;
                                                  break;
                                          }
                                          
                                          if($salir){
                                              break;                                              
                                          }
                                        /*  if($comm){
                                             break;
                                            }*/
                                          
                                      }
                                      if($comm){
                                              //echo $post->idEncuesta."-";
                                                $encuesta->encuestaReporteRankZonasAbiertas($post->idEncuesta, $post->idZona,$val["IdPregunta"]);
                                            }
                                      if($salir){
                                          $encuesta->encuestaReporteRankZonasAbiertas($post->idEncuesta, $post->idZona,$val["IdPregunta"]);
                                      }  
                                  }
                       
                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                          //echo 'preguntas por zona';  
                          echo json_encode($arrFinal);
              }
              
                          
                }
              else if($post->idZona!=0 AND $post->idPregunta!=0){
                  
                   if($encuesta->getReporte($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();
                    $i=0;
                    foreach ($encuesta->filas as $value) {
                                               $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["pregunta"]),
                                                 "tipo"=>utf8_encode($value["Tipo"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 

                        $i++;
                    }
                      $encuesta->filas=array();  
                        $arrFinal=array();
                         $idConc= $post->idPregunta;   
                         
                          foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                    //
                                          foreach ($respuestas as  $valRes) {
                                         
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  // echo $val["IdPregunta"]."".$val["tipo"]."<br>";
                                                  $salir=true;
                                                  $comm=false;
                                                break;
                                              case "Cerrada":
                                                  $encuesta->encuestaReporteConcesionario($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  $salir=false;
                                                  $comm=false;
                                                  break;
                                              case "CerradaComentario":
                                                  
                                                   $resp=explode(";",$valRes);
                                                  //echo $resp[0];
                                                   $encuesta->encuestaReporteConcesionario($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"], trim(utf8_decode($resp[0])));
                                                  $salir=false;
                                                  $comm=true;
                                                  //var_dump($encuesta->filas);   
                                                  break;
                                              case "CerradaMultiple":
                                                  $encuesta->encuestaReporteConcesionario($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  $salir=false;
                                                  $comm=false;
                                                  break;
                                          }
                                          
                                            if($salir){
                                                break;                                              
                                            }
                                            
                                          
                                      }
                                      if($comm){
                                                $encuesta->encuestaReporteConcesionarioAbierta($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"]);
                                            }     
                                      
                                      if($salir){
                                          //echo $post->idEncuesta."-".$post->idZona."-".$idConc."-".$val["IdPregunta"];
                                          $encuesta->encuestaReporteConcesionarioAbierta($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"]);
                                          //var_dump($encuesta->filas);
                                      }
                                          
                                      }
                                  }
            
                          

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                   //    var_dump($encuesta->filas);
                      //    echo 'pregunta por concesionario';
                                      echo json_encode($arrFinal);
          //AQUI }
          
         } 
         
            break;
        case "reporteEncuestaGeneral":
            //var_dump($post);
              $encue = new encuesta();
              
                   $resQuery=$encue->getReporte($post->idEncuesta);
                 //  echo  $resQuery;
                  if($resQuery){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                   
                        foreach ($encue->filas as $value) {
                            $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["ArgumentoPregunta"]),
                                                 "tipo"=>utf8_encode($value["TipoPregunta"]),
                                               //  "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]),
                                                "rango"=>$post->idZona
                                                    ); 

                            
                            $i++;
                        }
                   
                   //   encuesta->filas=array();  
                        $enc=new encuesta();
                        $arrFinal=array();
                       // var_dump($arrPreguntas);    
                        foreach ($arrPreguntas as $key => $val) {
                                    // $respuestas =  explode(",",$val["opcRespuesta"]);
                                      //foreach ($respuestas as  $valRes) {
                                      foreach ($val["rango"] as  $valRes) {
                                          //var_dump($val);
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  $enc->encuestaReportePreguntaRangoAbierta($post->idEncuesta,$val["IdPregunta"],trim(utf8_decode($valRes)));
                                                  //$salir=true;
                                                break;
                                              case "Cerrada":
                                                 
                                                  $enc->encuestaReportePreguntaRango($post->idEncuesta, $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                 
                                                 // $salir=false;
                                                  break;
                                              case "CerradaComentario":
                                                  
                                                 
                                                 
                                                  //$salir=true;
                                                  $enc->encuestaReportePreguntaRango($post->idEncuesta, $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  $enc->encuestaReportePreguntaRangoAbierta($post->idEncuesta,$val["IdPregunta"],trim(utf8_decode($valRes)));
                                                  
                                                  break;
                                                  case "CerradaMultiple":
                                                 
                                                  $enc->encuestaReportePreguntaRango($post->idEncuesta, $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                 
                                               //   $salir=false;
                                                  break;
                                          }
                                          
                                        /*  if($salir){
                                              break;                                              
                                          }*/
                                          
                                      }
                                      /*if($salir){
                                          //$enc->encuestaReportePreguntaRangoAbierta($post->idEncuesta,$val["IdPregunta"]);
                                      } */ 
                                  } 
                        
                        
                         

                          $i=0;
               
                          foreach ($enc->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                          //var_dump($arrFinal);   
                         echo json_encode($arrFinal);  
       //       
                 }else{
                     
                    echo json_encode($encue->mensaje);
                 }
            break; 
        case "reporteConcesionariosPorZona":
              $encuesta = new encuesta();
              $concesionario= new concesionario();
              
              //$zn= new zona();
              //$zn->zonasEncuesta($post->idEncuesta);  
              //$concesionario->concesionarioEncuesta($post->idEncuesta);
              //$concesionario->getPorZona($idZona);
               if($encuesta->getReporte($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                    foreach ($encuesta->filas as $value) {
                        $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["ArgumentoPregunta"]),
                                                 "tipo"=>utf8_encode($value["TipoPregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 

                        $i++;
                    }
                      $encuesta->filas=array();  
                        $arrFinal=array();
                        // $idConc= $post->idPregunta;   
                       //  var_dump($arrPreguntas);
                     //    foreach ($zn->filas as  $z) {
                           //$concesionario->getPorZona($post->idZona);
                           $concesionario->concesionarioEncuesta($post->idEncuesta, $post->idZona);
                           //var_dump($concesionario->filas );
                           foreach ($concesionario->filas as $cns){
                               
                               foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {
                                          
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  
                                               
                                                  $salir=true;
                                                break;
                                              case "Cerrada":
                                                 $encuesta->encuestaReporteConcesionario($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  //
                                                 
                                                  $salir=false;
                                                  break;
                                              case "CerradaComentario":
                                                  
                                                  $p=0;
                                                  foreach ($respuestas as $key => $value) {
                                                    $res[$p]=explode(";",$value);
                                                    $encuesta->encuestaReporteConcesionario($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], trim(utf8_decode($res[$p][0])));
                                                    $p++;
                                                  }
                                                  $salir=true;
                                                  
                                                  
                                                  
                                                  break;
                                                  case "CerradaMultiple":
                                                 $encuesta->encuestaReporteConcesionario($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  //
                                                 
                                                  $salir=false;
                                                  break;
                                          }
                                          
                                          if($salir){
                                              break;                                              
                                          }
                                          
                                      }
                                      if($salir){
                                      $encuesta->encuestaReporteConcesionarioAbierta($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"]);
                                      }  
                               
                               
                               
                               /*foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);
                                       //echo $cns["IdConcesionario"]; 
                                      foreach ($respuestas as  $valRes) {
                                            $encuesta->encuestaReporteConcesionario($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], $valRes);
                                 //         $encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],$valRes);
                                      }
                            
                                      */
                               }
                           }
                            
                        //}
                          

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                //          var_dump($encuesta->filas);
                      //    echo 'pregunta por concesionario';
                          echo json_encode($arrFinal);
               }
            break;
        case "reporteConcesionariosPorZonaSinRango":
            $encuesta = new encuesta();
              $concesionario= new concesionario();
              
              //$zn= new zona();
              //$zn->zonasEncuesta($post->idEncuesta);  
              //$concesionario->concesionarioEncuesta($post->idEncuesta);
              //$concesionario->getPorZona($idZona);
               if($encuesta->getReporte($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                    foreach ($encuesta->filas as $value) {
                       $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["ArgumentoPregunta"]),
                                                 "tipo"=>utf8_encode($value["TipoPregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 


                        $i++;
                    }
                      $encuesta->filas=array();  
                        $arrFinal=array();
                         $idConc= $post->idPregunta;   
                       //  var_dump($arrPreguntas);
                     //    foreach ($zn->filas as  $z) {
                           $concesionario->getPorZona($post->idZona);
                           //var_dump($concesionario->filas );
                           foreach ($concesionario->filas as $cns){
                               
                               
                               foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {
                                          
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  $salir=true;
                                                break;
                                              case "Cerrada":
                                                  $encuesta->encuestaReporteConcesionarioSinRango($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  $salir=false;
                                                  break;
                                              case "CerradaComentario":
                                                  
                                                                                                  $p=0;
                                                  foreach ($respuestas as $key => $value) {
                                                    $res[$p]=explode(";",$value);
                                                    $encuesta->encuestaReporteConcesionarioSinRango($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], trim(utf8_decode($res[$p][0])));
                                                    //$encuesta->encuestaReportePreguntaZona($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$res[$p][0]);
                                                    $p++;
                                                  }
                                                  
                                                  
                         //                          $res =  explode(";",$valRes);
                                                   
                                                  
                                                  $salir=true;
                                                  break;
                                                  case "CerradaMultiple":
                                                  $encuesta->encuestaReporteConcesionarioSinRango($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  $salir=false;
                                                  break;
                                          }
                                          
                                          if($salir){
                                              break;                                              
                                          }
                                          
                                      }
                                      if($salir){
                                          $encuesta->encuestaReporteConcesionarioSinRangoAbierto($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"]);
                                          //$enc->encuestaReportePreguntaRangoAbierta($post->idEncuesta,$val["IdPregunta"]);
                                      }  
                                  }
                               
                               
                               /*foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);
                                       //echo $cns["IdConcesionario"]; 
                                      foreach ($respuestas as  $valRes) {
                                            $encuesta->encuestaReporteConcesionarioSinRango($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], $valRes);
                                 //         $encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],$valRes);
                                      }
                            
                                      
                               }*/
                           }
                            
                        //}
                          

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                //          var_dump($encuesta->filas);
                      //    echo 'pregunta por concesionario';
                          echo json_encode($arrFinal);
               }
  
            break;
        case "reporteEncuestaGeneralFiltroPregunta":
                     
              $encuesta = new encuesta();
              //$pregunta= new preguntas();
              $zn= new zona();
              //$pregunta->get($post->idPregunta);
             
              /*Obtengo las preguntas,respuestas de la encuesta */
              if($post->idZona==0 AND $post->idPregunta==0)
                  {
                   $zn->zonasEncuesta($post->idEncuesta);  
                  if($encuesta->getReporte($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();
                    $i=0;
                    
                    //var_dump($encuesta->filas);
                    
                    foreach ($encuesta->filas as $value) {
                       $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["ArgumentoPregunta"]),
                                                 "tipo"=>utf8_encode($value["TipoPregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 


                        $i++;
                    }
                      $encuesta->filas=array();  
                        $arrFinal=array();
                            
                          foreach ($zn->filas as  $valor) {
                            foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);
                                        //var_dump($respuestas);
                                     //echo count($respuestas)."-";
                                      for($i=0;$i<count($respuestas);$i++){ 
                        //                     echo $respuestas[$i];
                                      //foreach ($respuestas as  $valRes) {
                                          //var_dump($valRes);
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  $salir=true;
                                                break;
                                              case "Cerrada":
                                                  //echo   $respuestas[$i]."->"."Completamente Insatisfecho"."--";
                                                 // if($respuestas[$i]==="Completamente Insatisfecho"){ 
                                                   // echo   $respuestas[$i]."--";  
                                                      $encuesta->encuestaReportePreguntaZona($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],  trim(utf8_decode($respuestas[$i])));  
                                                  //}     
                                                  
                                                  //$encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$valRes);
                                                  $salir=false;
                                                  break;
                                              case "CerradaComentario":
                                                 
                                                  $p=0;
                                                  foreach ($respuestas as $key => $value) {
                                                    $res[$p]=explode(";",$value);
                                                    $encuesta->encuestaReportePreguntaZona($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],  trim(utf8_decode($res[$p][0])));
                                                    $p++;
                                                  }
                                               
                                                  $salir=true;
                                                  break;
                                                  case "CerradaMultiple":
                                                 
                                                      $encuesta->encuestaReportePreguntaZona($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],  trim(utf8_decode($respuestas[$i])));  
                                                 
                                                  $salir=false;
                                                  break;
                                          }
                                          
                                          if($salir){
                                              break;                                              
                                          }
                                          
                                      }
                                      if($salir){
                                          $encuesta->encuestaReportePreguntaZonaAbierta($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"]);
                                          //$enc->encuestaReportePreguntaRangoAbierta($post->idEncuesta,$val["IdPregunta"]);
                                      }  
                                  }
                            /*
                              foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {

                                          $encuesta->encuestaReportePreguntaZona($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$valRes);
                                      }
                                  }
                              */    
                          }

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              
                              //    var_dump($value);
                              
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                          
                          echo json_encode($arrFinal);  
               //var_dump($encuesta->filas);   
                 }else{
                //    echo json_encode($encuesta->mensaje);
                 }
             
              }
              else if($post->idZona !=0 AND $post->idPregunta==0)
                  {
                       
                  if($encuesta->getReporte($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                    foreach ($encuesta->filas as $value) {
                       $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["ArgumentoPregunta"]),
                                                 "tipo"=>utf8_encode($value["TipoPregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 

                        $i++;
                    }
                      $encuesta->filas=array();  
                        $arrFinal=array();

                            foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);
                                        //var_dump($respuestas);
                                     //echo count($respuestas)."-";
                                      for($i=0;$i<count($respuestas);$i++){ 
                                             
                                     // foreach ($respuestas as  $valRes) {
                                          //var_dump($valRes);
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  $salir=true;
                                                  $comm=false;
                                                break;
                                              case "Cerrada":
                                                  $encuesta->encuestaReportePreguntaZona($post->idEncuesta, $post->idZona,$val["IdPregunta"],  trim(utf8_decode($respuestas[$i])));
                                                  //$encuesta->encuestaReportePreguntaZona($post->idEncuesta, $post->idZona,$val["IdPregunta"],$valRes);
                                                 
                                                  
                                                  //$encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$valRes);
                                                  $salir=false;
                                                  $comm=false;
                                                  break;
                                              case "CerradaComentario":
                                                 /*
                                                  echo $i;
                                                   echo $respuestas[$i]."*";
                                                  $p=0;
                                                *///  foreach ($respuestas as $key => $value) {
                                                $res=explode(";",$respuestas[$i]);
                                                    //$res=explode(";",$valRes);
                                                  /*  var_dump($valRes);
                                                    //*/
                                                //var_dump($respuestas[$i]);
                                                    //echo $res;
                                                    foreach ($res as $value) {
                                                        $encuesta->encuestaReportePreguntaZona($post->idEncuesta, $post->idZona,$val["IdPregunta"],  trim(utf8_decode($value)));
                                                    }
                                                    
                                                    
                                                  //}
                                               
                                                 $salir=false;
                                                  $comm=true;
                                                  break;
                                                  case "CerradaMultiple":
                                                  $encuesta->encuestaReportePreguntaZona($post->idEncuesta, $post->idZona,$val["IdPregunta"],  trim(utf8_decode($respuestas[$i])));
                                                  $salir=false;
                                                  $comm=false;
                                                  break;
                                          }
                                          
                                          if($salir){
                                              break;                                              
                                          }
                                          
                                          
                                      }
                                      if($salir){
                                          
                                          $encuesta->encuestaReportePreguntaZonaAbierta($post->idEncuesta, $post->idZona,$val["IdPregunta"]);
                                          //$enc->encuestaReportePreguntaRangoAbierta($post->idEncuesta,$val["IdPregunta"]);
                                      }
                                    /*  if($salir){
                                              break;                                              
                                       }*/                                                                             
                                     
                                  }
                                  if($comm){
                                              
                                  
                                  
                                    $encuesta->encuestaReportePreguntaZonaAbierta($post->idEncuesta, $post->idZona,$val["IdPregunta"]);
                                  }
                                    
                        
                        
                        
                        
                        //
                        
                           /*  foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {

                                          $encuesta->encuestaReportePreguntaZona($post->idEncuesta, $post->idZona,$val["IdPregunta"],$valRes);
                                      }
                                  }
                                  
                          */

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                          //echo 'preguntas por zona';  
                          echo json_encode($arrFinal);
              }
              
                          
          }
               else if($post->idZona!=0 AND $post->idPregunta!=0)
                 {
                      if($encuesta->getReporte($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                    foreach ($encuesta->filas as $value) {
                       $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["ArgumentoPregunta"]),
                                                 "tipo"=>utf8_encode($value["TipoPregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 
                        $i++;
                    }
                      $encuesta->filas=array();  
                        $arrFinal=array();
                         $idConc= $post->idPregunta;   
                       //  var_dump($arrPreguntas);
                         
                         
                         
                         foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);
                                        //var_dump($respuestas);
                                     //echo count($respuestas)."-";
                                      //for($i=0;$i<count($respuestas);$i++){ 
                        //                     echo $respuestas[$i];
                                      foreach ($respuestas as  $valRes) {
                                      //    var_dump($val["tipo"]);
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  $idPregunta =$val["IdPregunta"] ;
                                                  //$salirAbierta=true;
                                                  $salir=true;
                                                break;
                                              case "Cerrada":
                                                  
                                                 
                                                  $encuesta->encuestaReportePreguntaConcesionario($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  //$encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$valRes);
                                                  $salir=false;
                                                  break;
                                              case "CerradaComentario":
                                                 
                                                  $p=0;
                                                  foreach ($respuestas as $key => $value) {
                                                    $res[$p]=explode(";",$value);
                                                    $encuesta->encuestaReportePreguntaConcesionario($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"],  trim(utf8_decode($res[$p][0])));
                                                    
                                                    $p++;
                                                  }
                                               
                                                  $salir=true;
                                                  break;
                                                  case "CerradaMultiple":
                                                  
                                                 
                                                  $encuesta->encuestaReportePreguntaConcesionario($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"], trim(utf8_decode($valRes)));
                                                  //$encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$valRes);
                                                  $salir=false;
                                                  break;
                                          }
                                          
                                          if($salir){
                                              break;                                              
                                          }
                                        /*  if($salirAbierta){
                                              break;                                              
                                          }*/
                                      }
                                      if($salir){
                                          
                                          $encuesta->encuestaReportePreguntaConcesionarioAbierta($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"]);
                                         // $encuesta->encuestaReportePreguntaZonaAbierta($post->idEncuesta, $post->idZona,$val["IdPregunta"]);
                                          //$enc->encuestaReportePreguntaRangoAbierta($post->idEncuesta,$val["IdPregunta"]);
                                      }  
                                  }
                              /*    if($salirAbierta){
                                          
                                          $encuesta->encuestaReportePreguntaConcesionarioAbierta($post->idEncuesta, $post->idZona,$idConc, $idPregunta);
                                         // $encuesta->encuestaReportePreguntaZonaAbierta($post->idEncuesta, $post->idZona,$val["IdPregunta"]);
                                          //$enc->encuestaReportePreguntaRangoAbierta($post->idEncuesta,$val["IdPregunta"]);
                                      }*/   
                         //
                           /*  foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {
                                            $encuesta->encuestaReportePreguntaConcesionario($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"], $valRes);
                                 //         $encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],$valRes);
                                      }
                                  }
                                  
                          */

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                   //       var_dump($encuesta->filas);
                      //    echo 'pregunta por concesionario';
                          echo json_encode($arrFinal);
          }
          
         }
                else{
                 var_dump($post);
                } 
     
            break;    
        case "reporteEncuestaGeneralPregunta":
            //var_dump($post);
               $encue = new encuesta();
              //$pregunta= new preguntas();
              //$zn= new zona();
               //$zn->zonasEncuesta($post->idEncuesta);  
            //echo $post->idEncuesta;
                   $resQuery=$encue->getReporte($post->idEncuesta);
                 //  echo  $resQuery;
                  if( $resQuery>0){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                   
                        foreach ($encue->filas as $value) {
                          $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["ArgumentoPregunta"]),
                                                 "tipo"=>utf8_encode($value["TipoPregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 
                            $i++;
                        }
                        //var_dump($arrPreguntas);
                   
                   //   encuesta->filas=array();  
                        $enc=new encuesta();
                        $arrFinal=array();

                         // foreach ($zn->filas as  $valor) {
                        foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {
                                          
                                          switch($val["tipo"]){
                                              case "Abierta":
                                                  $tipo=$val["tipo"];
                                                  $salir=true;
                                                break;
                                              case "Cerrada":
                                                  $enc->encuestaReportePreguntaGeneral($post->idEncuesta, $val["IdPregunta"], trim(utf8_decode($valRes)),$post->idZona);
                                                    $salir=false;
                                                  break;
                                              case "CerradaComentario":
                                                  $p=0;
                                                   foreach ($respuestas as $key => $value) {
                                                    $res[$p]=explode(";",$value);
                                                    $enc->encuestaReportePreguntaGeneral($post->idEncuesta, $val["IdPregunta"], trim(utf8_decode($res[$p][0])),$post->idZona);
                                                    //$enc->encuestaReportePreguntaGeneral($post->idEncuesta, $val["IdPregunta"], $res[$p][0]);
                                                    //$encuesta->encuestaReporteConcesionarioSinRango($post->idEncuesta, $post->idZona,$cns["IdConcesionario"], $val["IdPregunta"], $res[$p][0]);
                                                    //$encuesta->encuestaReportePreguntaZona($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$res[$p][0]);
                                                    $p++;
                                                  }
                                                  
                                                  
                                                   $salir=true;
                                                  break;
                                               case "CerradaMultiple":
                                                  $enc->encuestaReportePreguntaGeneral($post->idEncuesta, $val["IdPregunta"], trim(utf8_decode($valRes)),$post->idZona);
                                                  
                                                  $salir=false;
                                                  break;
                                          }
                                          
                                          if($salir){
                                              break;
                                              
                                          }
                                          
                                      }
                                      if($salir){
                                          
                                          $enc->encuestaReportePreguntaGeneralAbierta($post->idEncuesta, $val["IdPregunta"]);
                                         // if($tipo=="Abierta"){
                                          //    $enc->encuestaReportePreguntaGeneralAbiertaRes($post->idEncuesta, $val["IdPregunta"]);
                                          //}
                                          
                                      }  
                                  } 
                        
                        
                        
                        
                        
                        /*     foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {
                                          //  echo $valRes;
                                             $v=  explode(";", $valRes);
                                             $enc->encuestaReportePreguntaGeneral($post->idEncuesta, $val["IdPregunta"], $v[0]);
                                         // $encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$valRes);
                                      }
                                  }
                                  */
                         // }

                          $i=0;
                           //var_dump($enc->filas);   
                //          var_dump($encuesta->filas);
                       //   echo $encuesta->mensaje;
                          foreach ($enc->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }

                         echo json_encode($arrFinal);  
       //       
                 }else{
                     
                    echo json_encode($encue->mensaje);
                 }
            break;
       
        case "reporteEncuesta":
                     
              $encuesta = new encuesta();
               //echo $post->nombreEncuesta;
            //var_dump($post);
            
                if($encuesta->getReporte($post->idEncuesta)){
                   $arr=array();
                   $i=0;
                   foreach ($encuesta->filas as $value) {
                 //      $arr[$i++]=utf8_encode($value);
                      $arr[$i++]=  array_map('utf8_encode', $value);
                   }

                   echo json_encode($arr);
              //     var_dump($arr);
                }else{
                    echo json_encode(false);
                }
            break;
        case "obtenerReportePorZonaPregunta":
            $enc=new encuesta();
            $pregunta= new preguntas();
            $zn= new zona();
            $pregunta->get($post->idPregunta);
            $zn->zonasEncuesta($post->idEncuesta);
            $arrRespuestas=array();            
            //var_dump($pregunta->filas);
            $arrRespuestas=explode(",",$pregunta->filas[0]["OpcionesDeRespuesta"]);
            //var_dump($arrRespuestas);
            foreach ($zn->filas as $clave => $valor) {
           //     foreach ($arrRespuestas as $key => $value) {
                    $enc->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"], $post->idPregunta, $post->respuesta);
                   //  $enc->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"], $post->idPregunta, $value);
             //   }
            }
                $arr=array();
                $i=0;
                foreach ($enc->filas as $value) {
                    $arr[$i++]=  array_map('utf8_encode', $value);
                }

                echo json_encode($arr);  
                    
            break;
        case "obtenerRealizadasUsuarios":
            $usr=new usuario();
            $usr->obtenerUsuarioPorEncuesta($post->idEncuesta);
            echo json_encode($usr->filas);
            break;
        case "reporteEncuestaForm":
                     
              $encuesta = new encuesta();
               //echo $post->nombreEncuesta;
                if($encuesta->getReporteForm($post->idEncuesta)){
                   $arr=array();
                   $i=0;
                   foreach ($encuesta->filas as $value) {
                 //      $arr[$i++]=utf8_encode($value);
                      $arr[$i++]=  array_map('utf8_encode', $value);
                   }

                   echo json_encode($arr);
                   //var_dump($arr);
                }else{
                    echo json_encode($encuesta->mensaje);
                }
            break;
        
            
        case "reporteDetalleMuestraZona":
            $encuesta = new encuesta();
            $encuestaDos=new encuesta();
            $encuesta->obtenerReporteDetalleMuestra($post->idEncuesta);
            
            
            $arr=array();
            $i=0;
            foreach ($encuesta->filas as $value) {
                $arr[$i] = array_map('utf8_encode', $value);                
                $i++;
            }
            
            $encuestaDos=new encuesta();
            $encuestaDos->obtenerTotalesReporteDetalleMuestra($post->idEncuesta);
            $arr["Totales"]=$encuestaDos->filas ;
            
            //var_dump($arr);
            echo json_encode($arr);
            break;
        case "reporteDetalleMuestraConZona":
               
                $encuesta = new encuesta();
                $encuestaDos=new encuesta();
                
    
               $encuesta->obtenerReporteDetalleMuestraConce($post->idEncuesta,$post->idZona);
                $arr=array();
                $i=0;
                foreach ($encuesta->filas as $value) {
                    $arr[$i] = array_map('utf8_encode', $value);                
                    $i++;
                }
                $encuestaDos->obtenerTotalesReporteDetalleMuestraConce($post->idEncuesta,$post->idZona);
                $arr["Totales"]=$encuestaDos->filas;
               
               
               
               echo json_encode($arr);
               //var_dump($encuesta->filas);
            break;
        case "reporteDetalleMuestraTodosCon":
                $zn=new zona();
                $zn->zonasEncuesta($post->idEncuesta);    
                $encuesta = new encuesta();
               
               
                foreach ($zn->filas as $key => $value) {
                     $encuesta->obtenerReporteDetalleMuestraConce($post->idEncuesta,$value["IdZona"]);   
                }
                echo json_encode($encuesta->filas);
                //var_dump($encuesta->filas);
            break;
        case "reporteDetalleMuestraUnConcesionario":
            $enc=new encuesta();
            $enc->obtenerReporteDetalleMuestraUnConcesionario($post->idEncuesta, $post->idPregunta);
            //var_dump($enc->filas);
            $arr=array();
            $i=0;
            foreach ($enc->filas as $key => $value) {
                $arr[$i]=  array_map('utf8_encode', $value);
                $i++;
            }
            
            echo json_encode($arr);
            break;
           
            
        case "reporMensualTodasZonas":
         //   var_dump($post);
              $encuesta = new encuesta();

              $zn= new zona();
              //$pregunta->get($post->idPregunta);
             
              /*Obtengo las preguntas,respuestas de la encuesta */
              if($post->zona==0 AND $post->concesionario==0){
                   //$zn->zonasEncuesta($post->idEncuesta);  
                  if($encuesta->getReporteform($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();
                    $i=0;
                    /*foreach ($encuesta->filas as $value) {
                       $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["pregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 

                        $i++;
                    }*/
                      $encuesta->filas=array();  
                        $arrFinal=array();

                     //     foreach ($zn->filas as  $valor) {
                             //foreach ($arrPreguntas as $key => $val) {
                               //      $respuestas =  explode(",",$val["opcRespuesta"]);

                                 //     foreach ($respuestas as  $valRes) {

                                          //$encuesta->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"],$val["IdPregunta"],$valRes);
                                   //   }
                                 // }
                                  
                       //   }

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                          
                          echo json_encode($arrFinal);  
        //       var_dump($encuesta->filas);   
                 
                          
                          }else{
                //    echo json_encode($encuesta->mensaje);
                 }
             
              }
              else if( $post->zona!=0 AND $post->concesionario==0){
                       
                  if($encuesta->getReporteForm($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();
                    $i=0;
                    /*foreach ($encuesta->filas as $value) {
                       $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["pregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 

                        $i++;
                    }*/
                      $encuesta->filas=array();  
                        $arrFinal=array();

                         
                       /*      foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {

                                          $encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],$valRes);
                                      }
                                  }
                         */         
                          

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                          //echo 'preguntas por zona';  
                          echo json_encode($arrFinal);
              }
              
                          
          }
             else if($post->zona!=0 AND $post->concesionario!=0){
                      if($encuesta->getReporteForm($post->idEncuesta)){
                    $arr=array();
                    $arrPreguntas=array();
                    $opcRespuesta=array();
                    $respuestas=array();;
                    $i=0;
                    /*foreach ($encuesta->filas as $value) {
                       $arrPreguntas[$i]=array("IdPregunta" => utf8_encode($value["IdPreguntas"]),
                                                 "arg" => utf8_encode($value["pregunta"]),
                                                 "opcRespuesta" => utf8_encode($value["OpcionesDeRespuesta"]) ); 

                        $i++;
                    }*/
                      $encuesta->filas=array();  
                        $arrFinal=array();
                         $idConc= $post->idPregunta;   
                       //  var_dump($arrPreguntas);
                       /*      foreach ($arrPreguntas as $key => $val) {
                                     $respuestas =  explode(",",$val["opcRespuesta"]);

                                      foreach ($respuestas as  $valRes) {
                                            $encuesta->encuestaReporteConcesionario($post->idEncuesta, $post->idZona,$idConc, $val["IdPregunta"], $valRes);
                                 //         $encuesta->encuestaReporteRankZonas($post->idEncuesta, $post->idZona,$val["IdPregunta"],$valRes);
                                      }
                                  }
                                  
                         */ 

                          $i=0;
                       //   echo $encuesta->mensaje;
                          foreach ($encuesta->filas as $value) {
                              $arrFinal[$i++]=  array_map('utf8_encode', $value);
                          }
                   //       var_dump($encuesta->filas);
                      //    echo 'pregunta por concesionario';
                          echo json_encode($arrFinal);
          }
          
         } 
     
            break;
        case "reporMensualTodosConcesionarios":
            
            break;
        case "reporMensualUnaZona":
            
            break;
        case "reporMensualUnConcesionario":
            
            break;
     
        
        default:
            break;
        /*     case "obtenerReportePorZona":
            $enc=new encuesta();
            $pregunta= new preguntas
            $zn= new zona();
            $pregunta->get($post->idPregunta);
            $zn->zonasEncuesta($post->idEncuesta);
            $arrRespuestas=array();            
            //var_dump($pregunta->filas);
            $arrRespuestas=explode(",",$pregunta->filas[0]["OpcionesDeRespuesta"]);
            //var_dump($arrRespuestas);
            foreach ($zn->filas as $clave => $valor) {
                foreach ($arrRespuestas as $key => $value) {
                    $enc->encuestaReporteRankZonas($post->idEncuesta, $valor["IdZona"], $post->idPregunta, $value);
                }
            }
                $arr=array();
                $i=0;
                foreach ($enc->filas as $value) {
                    $arr[$i++]=  array_map('utf8_encode', $value);
                }

                echo json_encode($arr);  
                    
            break;*/
    }
 }

 ?>
 

