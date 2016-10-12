<?php
include("../Modelo/modelo.php");
include("../Classes/PHPExcel.php"); 
//var_dump($_POST["operacion"]);
if(isset($_POST["operacion"])){
   
    switch ($_POST["operacion"]) {
    
        case "editarMuestra":
            if(isset($_FILES["archivo"]["name"])){  
               $directorio="../Archivos/";
                //Obtengo el nombre del archivo
                $nombre=basename($_FILES["archivo"]["name"]);
                //Asigno direccion completa de la ubicacion del archivo
                 $file=$directorio.$nombre;
                   if(move_uploaded_file($_FILES["archivo"]["tmp_name"], $file)){
                        //$nuevoNombre=$directorio."muestra.csv";
                       //rename($file,$nuevoNombre);
                   //    echo $nuevoNombre;
                        $gestor=fopen("../Archivos/".$nombre, "r");
                           // var_dump($gestor);
                            $registros=0;
                            $numNoRegistrados=0;
                            $IdConcesionario=0;
                            $muestra=new muestra();
                            $muestraDos=new muestra();
                            $concesionario=new concesionario();
                            $concesionario->getAlls();
                            //var_dump($concesionario->filas);
                            $arrNoRegistrados=array();
                            $idMuestra=$_POST["idBaseDeDatos"];
                            //$enc=  new encuesta();
                            $tam=0;   
                            $primeraFila=0;
                            while($datos =  fgetcsv($gestor,0,",")){
                                if($primeraFila>=0){
                                    $cadena="";
                                    $cadenaNoRegistrados="";
                                    //echo $datos[0];
                                    $fila=explode(";", $datos[0]);
                                    if(count($fila)==1){
                                        $fila=explode("|", $datos[0]);
                                    }else{
                                        //echo count($fila);
                                        //var_dump($fila);
                                    }
                                    $noRegistrado=FALSE;  
                                    //var_dump($fila);
                                    //echo count($fila);
                                     for($i=0;$i <= 15;$i++){
        
                                        if($i == 15){
                                            //echo $i;
                                            
                                                if($noRegistrado){
                                                    $cadena.="'". utf8_encode(trim($fila[$i]))."'";
                                                    break;
                                                }else{
                                                   
                                                    if($fila[$i] >= 1 AND $fila[$i]<=12){
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','1 A 12'";
                                                    }else if($fila[$i] > 12 AND $fila[$i]<=18){
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','13 A 18'";
                                                    }else if($fila[$i] > 18 AND $fila[$i]<=24){
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','19 A 24'";
                                                    }else if($fila[$i] > 24 AND $fila[$i]<=30){
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','25 A 30'";
                                                    }else if($fila[$i] > 30 AND $fila[$i]<=36){
                                                        
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','31 A 36'";
                                                    }else if($fila[$i] > 36 AND $fila[$i]<=40){   
                                                        //echo $fila[$i]."--";
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','37 A 40'";                                                
                                                    }else if($fila[$i] > 40 AND $fila[$i]<=84){                                                    
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','41 A 84'";                                                
                                                    }
                                                     break;
                                                }
                                                
                                                   

                                         }
                                         else{
                                                
                                                if($i ==  9){
                                                    $tamConcesionarios=count($concesionario->filas);
                                                    $b=0;
                                                    //echo $tamConcesionarios;
                                                    foreach ($concesionario->filas as $value) {
                                                    //for($j=0;$j<=$concesionario->filas;$j++){  
                                                       //echo "*-*-*".$value["NombreConcesionario"]."->".$fila[$i]."*-*-*";
                                                       // echo "***********************************************";
                                                       // echo $fila[$i]."<br>";
                                                       // echo "***********************************************";

                                                        if(trim($fila[$i])===trim($value["CodigoConcesionario"])){
                                                      
                                                            //echo "-------------------------------------------";
                                                            //echo $fila[$i]."<br>";
                                                            //echo "-------------------------------------------";
                                                            $IdConcesionario=$value["IdConcesionario"];
                                                            $noRegistrado=FALSE;
                                                           
                                                            break;
                                                        }  else {
                                                              
                                                            $noRegistrado=TRUE;
                                                            
                                                        }                                                        
                                                    } 
                                                    
                                                    if($noRegistrado){
                                                        $cadena.="'". trim($fila[$i]) ."',";
                                                       /* echo "-------------------------------------------";
                                                        echo $fila[$i]."<br>";
                                                        echo "-------------------------------------------";*/
                                                    }else{
                                                        $cadena.="'".$IdConcesionario."',";
                                                    }
                                                }else{
                                                    //echo $fila[$i];
                                                    if($fila[$i]=="" || $fila[$i]==" "){
                                                    //echo $i."--";
                                                        $cadena.="'----',";
                                                        
                                                    }else{
                                                        $cadena.="'".trim($fila[$i])."',";
                                                         
                                                        
                                                    }
                                                    
                                                }
                                                
                                                
                                         
                                         }
                                     }
                                     //echo "-*-*-*-*-*-*-*-*-";
                                     //echo $cadenaNoRegistrados."-*-*-*-*-*-*-*";
                                     
                                        if($noRegistrado==FALSE){
                                            //echo $cadena;
                                            $cadena.=",'$idMuestra'";
                                            if($tam > 0 AND $muestraDos->set($cadena)){
                                               $registros++;
                                            }
                                        }else{
                                            if($tam>0){
                                              $numNoRegistrados++;   
                                               $arrNoRegistrados[$numNoRegistrados]=$cadena;
                                              // echo "***********".$cadena."**********";
                                            }
                                               
                                            
                                            //var_dump($fila);
                                           
                                        }
                                     
                                        //$arr=  explode(",", $cadena);
                                        //var_dump($arr);
                                        
                                      $tam++;
                                }else{
                                    $primeraFila++;
                                }
                                          
                            }
                                    //echo $numNoRegistrados;    
                               if($registros>0){
                                        //var_dump($arrNoRegistrados);
                                        if($numNoRegistrados>=1){
                                            //echo $registros;    
                                             $muestraDos->actualizarCantidadMuestra($idMuestra,$registros);
                                             fclose ($gestor);
                                             //echo $registros;    
                                             
                                           
                                             $arrRespuesta=array("respuesta"=>TRUE,"noRegistrados"=>TRUE,"numeroDeRegistros"=>$registros,"registrosNoRegistrados"=>$arrNoRegistrados);
                                             //var_dump($arrRespuesta);
                                             echo json_encode($arrRespuesta);   
                                             
                                             
                                        }else if($numNoRegistrados == 0 ){
                                             $muestra->actualizarCantidadMuestra($idMuestra,$registros);
                                             fclose ($gestor);
                                             $arrRespuesta=array("respuesta"=>TRUE,"noRegistrados"=>FALSE,"numeroDeRegistros"=>$registros);
                                             //var_dump($arrRespuesta);
                                             echo json_encode($arrRespuesta);
                                        }
                                    }else{
                                        $muestra->eliminarDescripcionMuestra($idMuestra);
                                        fclose ($gestor);
                                        
                                        $arrCadena=  explode(",", $cadenaNoRegistrados);
                                        $arrRespuesta=array("respuesta"=>TRUE,"noRegistrados"=>TRUE,"numeroDeRegistros"=>$registros,"registrosNoRegistrados"=>$arrNoRegistrados);
                                        echo json_encode($arrRespuesta);
                                    }
                           
                            
                            
                    }
                    else{
                        $arrRespuesta=array("respuesta"=>FALSE,"mensajeError"=>"Imposible mover el archivo de su ruta temporal");
                        echo json_encode($arrRespuesta);
                    }
                       
    }
            else{
                $arrRespuesta=array("respuesta"=>FALSE,"mensajeError"=>"No hay un archivo en la peticion");
                echo json_encode($arrRespuesta);
            }
            break;
       
        case "crearMuestra":
            //var_dump($_POST);
            if(isset($_FILES["archivo"]["name"])){  
               $directorio="../Archivos/";
               
                //Obtengo el nombre del archivo
                $nombre=basename($_FILES["archivo"]["name"]);
                //Asigno direccion completa de la ubicacion del archivo
                 $file=$directorio.$nombre;
                   if(move_uploaded_file($_FILES["archivo"]["tmp_name"], $file)){
                        //$nuevoNombre=$directorio."muestra.csv";
                       //rename($file,$nuevoNombre);
                   //    echo $nuevoNombre;
                        $gestor=fopen("../Archivos/".$nombre, "r");
                           // var_dump($gestor);
                            $registros=0;
                            $numNoRegistrados=0;
                            $IdConcesionario=0;
                            $muestra=new muestra();
                            $muestraDos=new muestra();
                            $concesionario=new concesionario();
                            $fecha = new DateTime($_POST["fechaSubida"]);
                            $concesionario->getAlls();
                            $arrNoRegistrados=array();
                            //$enc=  new encuesta();
                            
                           
                            $nombre=$_POST["nombre"];
                 
                             if($muestra->setDescripcionMuestra(trim($nombre),$fecha->format('Y-m-d H:i:s'))){
                                $muestra->filas=array();
                                $idMuestra=$muestra->ultimoRegistroMuestra();
                                 $tam=0;
                                 $primeraFila=0;
                                 while($datos =  fgetcsv($gestor,0,",")){ 
                                    if($primeraFila>=0){
                                        $cadena="";
                                    $cadenaNoRegistrados="";
                                    //echo $datos[0];
                                    $fila=explode("|", $datos[0]);
                                    if(count($fila)==1){
                                        $fila=explode(";", $datos[0]);  
                                    }
                                    //
                                    $noRegistrado=FALSE;  
                                    
                                    //echo "[".count($fila)."]";
                                    //var_dump($fila);
                                     for($i=0;$i <= 15;$i++){
                                       if($i == 15){
                                            //echo "{".$i."}";
                                            
                                                if($noRegistrado){
                                                    $cadena.="'". utf8_encode(trim($fila[$i]))."'";
                                                    break;
                                                }else{
                                                   
                                                    if($fila[$i] >= 1 AND $fila[$i]<=12){
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','1 A 12'";
                                                    }else if($fila[$i] > 12 AND $fila[$i]<=18){
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','13 A 18'";
                                                    }else if($fila[$i] > 18 AND $fila[$i]<=24){
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','19 A 24'";
                                                    }else if($fila[$i] > 24 AND $fila[$i]<=30){
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','25 A 30'";
                                                    }else if($fila[$i] > 30 AND $fila[$i]<=36){
                                                        
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','31 A 36'";
                                                    }else if($fila[$i] > 36 AND $fila[$i]<=40){   
                                                        //echo $fila[$i]."--";
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','37 A 40'";                                                
                                                    }else if($fila[$i] > 40 AND $fila[$i]<=84){                                                    
                                                        $cadena.="'". utf8_encode(trim($fila[$i]))  ."','41 A 84'";                                                
                                                    }
                                                     break;
                                                }
                                        }
                                        
                                        
                                            //echo "{".$i."}";
                                            //echo $i."=>{".$fila[$i]."}";
                                             //Verifico el concesionario
                                                if($i ==  9){
                                                    //echo $i."=>{".$fila[$i]."}";
                                                    $tamConcesionarios=count($concesionario->filas);
                                                    $b=0;
                                                    //echo $tamConcesionarios;
                                                    //var_dump($concesionario->filas);
                                                    foreach ($concesionario->filas as $value) {
                                                    //for($j=0;$j<=$concesionario->filas;$j++){  
                                                       /*echo "*-*-*".$value["NombreConcesionario"]."->".$fila[$i]."*-*-*";
                                                        echo "***********************************************";
                                                        echo $fila[$i]."<br>";
                                                       echo "***********************************************";*/
                                                        $conUno=trim($value["CodigoConcesionario"]);
                                                        $conDos=trim($fila[$i]);
                                                        //echo $conUno;
                                                        //echo $conDos;
                                                        if(trim($conDos)===trim($conUno)){
                                                      
                                                            /*echo "-------------------------------------------";
                                                            echo $fila[$i]."<br>";
                                                            echo "-------------------------------------------";*/
                                                            $IdConcesionario=$value["IdConcesionario"];
                                                            $noRegistrado=FALSE;
                                                           
                                                            break;
                                                        }  else {
                                                              
                                                            $noRegistrado=TRUE;
                                                            
                                                        }                                                        
                                                    } 
                                                    
                                                    if($noRegistrado){
                                                        $cadena.="'". trim($fila[$i]) ."',";
                                                       /* echo "-------------------------------------------";
                                                        echo $fila[$i]."<br>";
                                                        echo "-------------------------------------------";*/
                                                    }else{
                                                        if($IdConcesionario!=0){
                                                            $cadena.="'".$IdConcesionario."',";
                                                        }else{
                                                            $cadena.="'". trim($fila[$i]) ."',";
                                                            $noRegistrado=TRUE;
                                                        }
                                                        
                                                    }
                                                }
                                                else{
//                                                    echo $fila[$i];
                                                    //Verifico si la casilla esta vacia
                                                    if($fila[$i]=="" || $fila[$i]==" "){
                                                    //echo $i."--";
                                                        $cadena.="'----',";
                                                        
                                                    }else{
                                                        $cadena.="'".trim($fila[$i])."',";
                                                         
                                                        
                                                    }
                                                    
                                                }
                                                
                                                
                                         
                                         
                                     }
                                     //echo "-*-*-*-*-*-*-*-*-";
                                     //echo $cadenaNoRegistrados."-*-*-*-*-*-*-*";
                                     
                                        if($noRegistrado==FALSE){
                                            //echo $cadena;
                                            //echo $idMuestra;
                                            $cadena.=",'$idMuestra'";
                                            /*echo "**";
                                            echo $cadena;
                                            echo "**";*/
                                            if($tam > 0 AND $muestraDos->set($cadena)){
                                               $registros++;
                                            }
                                        }
                                        else{
                                            if($tam>0){
                                              $numNoRegistrados++;   
                                               $arrNoRegistrados[$numNoRegistrados]=$cadena;
                                              // echo "***********".$cadena."**********";
                                            }
                                               
                                            
                                            //var_dump($fila);
                                           
                                        }
                                           
                                      $tam++;
                                    }
                                    else{
                                        $primeraFila++;
                                    }    
                                 }                                             
                                 if($registros>0){
                                        //var_dump($arrNoRegistrados);
                                    if($numNoRegistrados>=1){
                                            //echo $registros;    
                                             $muestraDos->actualizarCantidadMuestra($idMuestra,$registros);
                                             fclose ($gestor);
                                             //echo $registros;    
                                             
                                           
                                             $arrRespuesta=array("respuesta"=>TRUE,"noRegistrados"=>TRUE,"numeroDeRegistros"=>$registros,"registrosNoRegistrados"=>$arrNoRegistrados);
                                             //var_dump($arrRespuesta);
                                             echo json_encode($arrRespuesta);   
                                             
                                             
                                        }else if($numNoRegistrados == 0 ){
                                             $muestra->actualizarCantidadMuestra($idMuestra,$registros);
                                             fclose ($gestor);
                                             $arrRespuesta=array("respuesta"=>TRUE,"noRegistrados"=>FALSE,"numeroDeRegistros"=>$registros);
                                             //var_dump($arrRespuesta);
                                             echo json_encode($arrRespuesta);
                                        }
                                    }
                                    else{
                                        $muestra->eliminarDescripcionMuestra($idMuestra);
                                        fclose ($gestor);
                                        
                                        $arrCadena=  explode(",", $cadenaNoRegistrados);
                                        $arrRespuesta=array("respuesta"=>FALSE,"noRegistrados"=>TRUE,"numeroDeRegistros"=>$registros,"registrosNoRegistrados"=>$arrNoRegistrados,"mensaje"=>"No hemos podido registrar ningun registro por favor verifique los datos que esta intentanto registrar");
                                        echo json_encode($arrRespuesta);
                                    }
                                    
                                   
                                      
                            }
                            else{
                                
                                $arrRespuesta=array("respuesta"=>FALSE,"mensaje"=>"No hemos podido registrar el nombre ".$nombre." para la base de datos");
                                echo json_encode($arrRespuesta);   
                            }
                            
                    }else{
                        $arrRespuesta=array("respuesta"=>FALSE,"mensajeError"=>"Imposible mover el archivo de su ruta temporal");
                        echo json_encode($arrRespuesta);
                    }
                       
            }else{
                $arrRespuesta=array("respuesta"=>FALSE,"mensajeError"=>"No hay un archivo en la peticion");
                 echo json_encode($arrRespuesta);
            }
            break;
            
        case "importarEncuesta":
            
                   $file="../Archivos/";
                   if(move_uploaded_file($_FILES["archivo"]["tmp_name"], $file.$_FILES["archivo"]["name"])){
                       
                   }
            
            
            $pFilename="../Archivos/".$_FILES['archivo']['name'];
            $objPHPExcel = PHPExcel_IOFactory::load($pFilename);
            $hoja=$objPHPExcel->getActiveSheet()->toArray(null,TRUE,TRUE,TRUE);
            
            foreach ($hoja as $key => $value) {
                //echo "-".$value[$key]."-";
                echo '<br>*****************';
                echo "<br>[".$key."]<br>";
                //var_dump($value);
                foreach ($value as $k => $v) {

                    if(!isset($v[$k])){
                        //var_dump($v);
                        echo "[".$key."]"."[".$k."] => [".$v."]<br>";
                    }

                }

                echo '*****************</br>';

            }
           //var_dump($_POST);
           //var_dump($_FILES['archivo']['name']);
           break;
        default:
            break;
        }

    }
?>