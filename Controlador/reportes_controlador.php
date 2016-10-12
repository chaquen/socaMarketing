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
            //$enc->encuestaPorFormulario($post->idEncuesta,'Finalizada');
            $enc->encuestaPorFormulario($post->idEncuesta,'%');
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
            //var_dump($post);
            $encu1=new encuesta();
            $encu2=new encuesta();
            $encu3=new encuesta();
            
            $encu1->encuestaPorEstado("Finalizada");            
            $encu2->encuestaPorEstado("En proceso");
            $encu3->encuestaPorEstado("Lista para proceso");
            $arr=array();
            $i=0;
            foreach ($encu1->filas as $value) {
                $arr[$i]=array_map('utf8_encode',$value);
                $i++;
            }
            foreach ($encu2->filas as $value) {
                $arr[$i]=array_map('utf8_encode',$value);
                $i++;
            }
            foreach ($encu3->filas as $value) {
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
        
       
        case "reporteGeneralPregunta":
            $enc=new encuesta();
            $enc->getReporte($post->idEncuesta);
            $rep=new reporte();
            
            $arrP=array();
            $i=0;
            $arr=array();
            $j=0;
            
            foreach ($enc->filas as $r){
                $arrP[$i]=  array_map('utf8_encode', $r);
                
                $i++;
            }
            foreach ($arrP as  $value) {
                //echo ($value["IdPreguntas"]);
                $rep->encuestaReportePreguntaGeneral($post->idEncuesta,$value["IdPreguntas"]);
                 foreach ($rep->filas as $r){
                    $arr[$value["IdPreguntas"]][$j]=  array_map('utf8_encode', $r);
                    $j++;
                }
            }
            //var_dump($arr);
            echo json_encode($arr);
            break;
        case "reporteGeneralPreguntaEspecifico":
            $p=new preguntas();
            $rep=new reporte();
            $p->get($post->idZona);
            
           
            //echo $p->filas[0]["TipoPregunta"];
            switch($p->filas[0]["TipoPregunta"]){
                case "Rankin":
                    $rep->encuestaReportePreguntaRankinGeneral($post->idEncuesta,$post->idZona);
                    echo json_encode($rep->filas);
                    break;
                case "Abierta":
                    $rep->encuestaReportePreguntaAbiertaGeneral($post->idEncuesta,$post->idZona);
                    echo json_encode($rep->filas);
                    break;
                case "AbiertaCategoria":
                    //echo $p->filas[0]["TipoPregunta"]."linea 139";
                    $rep->encuestaReportePreguntaGeneral($post->idEncuesta,$post->idZona);
                    $re=new reporte();
                    $re->encuestaReportePreguntaAbiertaCategoriaGeneral($post->idEncuesta,$post->idZona);
                    $arr=array();
                    $arr2=array();
                    $i=0;
                    foreach($rep->filas as $v){
                       // var_dump($v);
                        $arr[$i]=array_map('utf8_encode', $v);
                        $i++;
                    }
                    $i=0;
                    foreach($re->filas as $v){
                        //var_dump($v);
                        $arr2[$i]=  array_map('utf8_encode', $v);
                        $i++;
                    }
                    //var_dump(array(array("general"=>$rep->filas,"comentario"=>$r->filas,"TipoPregunta"=>"CerradaComentario")));
                    echo json_encode(array(array("general"=> $arr ,"comentario"=> $arr2,"TipoPregunta"=>"AbiertaCategoria")));
                    
                    break;
                case "CerradaComentario":
                    
                    $rep->encuestaReportePreguntaGeneral($post->idEncuesta,$post->idZona);
                    $re=new reporte();
                    $re->encuestaReportePreguntaAbiertaGeneral($post->idEncuesta,$post->idZona);
                    $arr=array();
                    $arr2=array();
                    $i=0;
                     foreach($rep->filas as $v){
                       // var_dump($v);
                        $arr[$i]=array_map('utf8_encode', $v);
                        $i++;
                    }
                    $i=0;
                    foreach($re->filas as $v){
                        //var_dump($v);
                        $arr2[$i]=  array_map('utf8_encode', $v);
                        $i++;
                    }
                    //var_dump(array(array("general"=>$rep->filas,"comentario"=>$r->filas,"TipoPregunta"=>"CerradaComentario")));
                    echo json_encode(array(array("general"=> $arr ,"comentario"=> $arr2,"TipoPregunta"=>"CerradaComentario")));
                    
                    
                    break;
                default:
                    $rep->encuestaReportePreguntaGeneral($post->idEncuesta,$post->idZona);
                    
                    echo json_encode($rep->filas);
                    break;
            }

           //echo "☻";
           //var_dump($rep->filas);
           //echo $rep->sentencia_Sql;
            
            
           
            
            break;
            
        case "obtenerMuestraReporte":
            //var_dump($post);
            $repo=new reporte();
            $repo->obtenerReporteDetalleMuestra($post->idEncuesta,$post->idZona,$post->idConcesionario);
            //var_dump($repo->filas);
            //echo $repo->sentencia_Sql;
            $arr=array();
            $i=0;
            foreach ($repo->filas as $r){
                $arr[$i]=  array_map('utf8_encode', $r);
                $i++;
            }
            echo json_encode($arr);
            
            break;
        case "reporteDetalleMuestraConZona":
               
                $encuesta = new encuesta();
                $encuestaDos=new encuesta();
                
    
                $encuesta->obtenerReporteDetalleMuestraConcesionarios($post->idEncuesta,$post->idZona);
                $arr=array();
                $i=0;
                foreach ($encuesta->filas as $value) {
                    $arr[$i] = array_map('utf8_encode', $value);                
                    $i++;
                }
                $encuestaDos->obtenerTotalesReporteDetalleMuestraConcesionario($post->idEncuesta,$post->idZona);
                $arr["Totales"]=$encuestaDos->filas;
               
               
               
               echo json_encode($arr);
               //var_dump($encuesta->filas);
            break;
        case "obtenerComparativoReporte":
            //var_dump($post);
            $repo=new reporte();
            $enc=new encuesta();
            $enc->getReporte($post->idEncuesta);
            $arrP=array();
            $i=0;
            $arr=array();
            $j=0;
            
            foreach ($enc->filas as $r){
                $arrP[$i]=  array_map('utf8_encode', $r);
                $i++;
            }
            //var_dump($arrP);
            foreach ($arrP as  $value) {
                //var_dump($value);
                if($value["TipoPregunta"]=="Rankin"){
                    $repo->encuestaReportePreguntaRankinGeneral($post->idEncuesta, $value["IdPreguntas"]);
                }else{
                    $repo->encuestaReportePreguntaGeneral($post->idEncuesta, $value["IdPreguntas"]);
                }
                
                
                 foreach ($repo->filas as $r){
                    $arr[$j]=  array_map('utf8_encode', $r);
                    $j++;
                }
            }
            
            //var_dump($repo->filas);
            
           
            echo json_encode($arr);
            break;
        case "obtenerRankingZona":
            $repo=new reporte();
            $enc=new encuesta();
            $enc->getReporte($post->idEncuesta);
            $arrP=array();
            $i=0;
            $arr=array();
            $j=0;
            
            foreach ($enc->filas as $r){
                $arrP[$i]=  array_map('utf8_encode', $r);
                $i++;
            }
            //var_dump($arrP);
            foreach ($arrP as  $value) {
                //echo ($value["IdPreguntas"]);
                $repo->encuestaReportePreguntaGeneralRangos($post->idEncuesta, $value["IdPreguntas"],$post->idZona);
                $re=new reporte();
                 foreach ($repo->filas as $r){
                    /**
                     * AQUI CONSULTAR TOTAL REALIZADO POR UNA ZONA DETERMINADA Y EDITAR EL VALOR
                     * 
                     */
                     
                     $re->obtenerNumeroDeEncuestasRealizadasPorZona($post->idEncuesta,$r["IdZona"]);
                    //var_dump($r["TotalRealizadas"]);
                     
                    
                     $r["TotalRealizadas"]=$re->filas[0]["Realizadas"];
                     $r["PorcentajeGeneral"]=$r["Muestra"]/$re->filas[0]["Realizadas"]*100;
                    $arr[$j]=  array_map('utf8_encode', $r);
                    $j++;
                    $re->filas=array();
                }
            }
            
            //var_dump($arr);
            
           
            echo json_encode($arr);
            break;
        case "obtenerRankingConcesionario":
            $repo=new reporte();
            $enc=new encuesta();
            $enc->getReporte($post->idEncuesta);
            $arrP=array();
            $i=0;
            $arr=array();
            $j=0;
            
            foreach ($enc->filas as $r){
                $arrP[$i]=  array_map('utf8_encode', $r);
                $i++;
            }
            
            foreach ($arrP as  $value) {
                //echo ($value["IdPreguntas"]);
                //var_dump($value);
                $repo->encuestaReportePreguntaGeneralRangosConcesionario($post->idEncuesta, $value["IdPreguntas"],$post->idZona,$post->idConcesionario);
                $re=new reporte();
                 foreach ($repo->filas as $r){
                                        
                     $re->obtenerNumeroDeEncuestasRealizadasPorConcesionario($post->idEncuesta,$r["IdConcesionario"]);
                    //var_dump($r["TotalRealizadas"]);
                     
                    
                     $r["TotalRealizadas"]=$re->filas[0]["Realizadas"];
                     $r["PorcentajeGeneral"]=$r["Muestra"]/$re->filas[0]["Realizadas"]*100;
                         
                     $arr[$j]=  array_map('utf8_encode', $r);
                     $j++;
                     $re->filas=array();
                }
            }
            
            //var_dump($repo->filas);
            
           
            echo json_encode($arr);
            break;
        case "reportePreguntasEncuesta":
                     
              $encuesta = new encuesta();
              $pre=new preguntas();
               //echo $post->nombreEncuesta;
            //var_dump($post);
            
                if($encuesta->getReporte($post->idEncuesta)){
                   $arr=array();
                   $i=0;
                   ;
                   foreach ($encuesta->filas as $value) {
                 //      $arr[$i++]=utf8_encode($value);
                      $arr[$i]=  array_map('utf8_encode', $value);
                      $pre->obtenerRespuestas($value["IdPreguntas"]);
                      $j=0;
                      foreach ($pre->filas as $value) {
                 
                         $arr[$i]["respuestas"][$j]=  array_map('utf8_encode', $value);
                         $j++;
                     }
                     $i++;
                   }
                   
                   
                   

                   echo json_encode($arr);
                   //var_dump($arr);
                }else{
                    echo json_encode(false);
                }
            break;
        
         
        
        default:
            break;
       
    }
 }

 ?>
 

