<?php
header('Content-Type:text/html; Charset="UTF-8"');  
include("../Modelo/modelo.php");
//var_dump($_POST["datos"]);
if(isset($_POST["datos"])){
    $post =  json_decode($_POST["datos"]);
    $operacion=$post->operacion;

    switch ($operacion) {
           case "registarPregunta":
            //var_dump($post);
            if($post->pregunta!=""){
                $pregunta= new preguntas();
                $nueva=array("tipo"=>$post->tipo,
                         "pregunta"=>$post->pregunta,
                          "respuestas"=>$post->respuestas  );
                if($pregunta->set($nueva)){
                    echo json_encode($pregunta->mensaje);
                }else{
                 echo json_encode($pregunta->mensaje);
                }   
            }
            break;
           
           case "consultarTodas":
               function codificarRespuestas($arr=  array()){
                        $arrCod=array();
                        $e=0;
                       foreach ($arr as $value) {
                           //$arrCod[$e]=  array_map('utf8_encode', $value);
                           $arrCod[$e]= $value;
                           $e++;
                       }
                       
                       return $arrCod;
                               
                }
               $preguntas = new preguntas();
               $preguntaDos = new preguntas();
               $preguntas->getAlls();
               //var_dump($preguntas->filas);
               if(count($preguntas->filas)>0){
                   $arr=array();
                   $i=0;
                   foreach ($preguntas->filas as $v) {
                    //echo $v["IdPreguntas"];   
                    //$arr[$i]=array_map('utf8_encode', $v);
                      $arr[$i]= $v; 
                    
                    $preguntaDos->obtenerRespuestas($v["IdPreguntas"]);
                    if(count($preguntaDos->filas)>0){
                        //var_dump($preguntaDos->filas);
                        $arr[$i]["respuestas"]=  codificarRespuestas($preguntaDos->filas);
                    }   
                    $i++;
                   }
                   
                  // var_dump($arr);
                   echo json_encode($arr);
                       
            }
            break;
           case "obtenerPregunta":
               $preg= new preguntas();
               $preg->get($post->pregunta);
                    $arr=array();
                   $i=0;
                   foreach ($preg->filas as $v) {
                    $arr[$i++]=array_map('utf8_encode', $v);
                   }
                   
                   echo json_encode($arr);
                 //  var_dump($arr);
             break;
    
         }
    }
?>