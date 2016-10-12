<?php
header('Content-Type:text/html; Charset="UTF-8"');  
include("../Modelo/modelo.php");
if(isset($_POST["datos"])){
    $post =  json_decode($_POST["datos"]);
    $operacion=$post->operacion;    
   
    switch ($operacion){
         case "TodasLasZonas":             
            $zn = new zona();
            $zn->getAlls();
            echo json_encode($zn->filas);
            break;
         case "TodasLasZonasPorMuestra":
             $zn= new zona();
             //$zn->zonasPorMuestra($post->NombreZona);
             $zn->zonasPorMuestra($post->NombreZona);
             $arr=array();
             $i=0;
             foreach ($zn->filas as $value) {
                 $arr[$i]=  array_map('utf8_encode', $value);
                 $i++;
                 
             }
             echo json_encode($arr);
             
             break;
         case "TodosLosConcesionarios":
            $conc=new concesionario();
            $conc->getAlls();
            echo json_encode($conc->filas);
            break;
         case "UnConcesionarios":
            $conc=new concesionario();
            $conc->get($post->nombreConcesionario);
            echo json_encode($conc->filas);
            break;
         case "ConcesionariosPorZona":
        //    var_dump($post);
            if($post->idZona!="T"){
                $conc=new concesionario();            
                $conc->getPorZona($post->idZona);
                //var_dump($conc->filas);
                if(count($conc->filas)>0){
                    echo json_encode($conc->filas);
                }else{
                    echo json_encode("No hay coincidencias");
                }
            }else{
                 $conc=new concesionario();            
                $conc->getAlls();
                //var_dump($conc->filas);
                if(count($conc->filas)>0){
                    echo json_encode($conc->filas);
                }else{
                    echo json_encode("No hay coincidencias");
                }
            }
            break;
         case "ConcesionarioPorZonaEnMuestra":
             //var_dump($post);
              $conc=new concesionario();            
            $conc->obtenerConcesionarioEnMuestra($post->director,$post->idZona);
            //var_dump($conc->filas);
            if(count($conc->filas)>0){
                $arr=array();
                $i=0;
                foreach ($conc->filas as $value) {
                    $arr[$i]=array_map('utf8_encode', $value);
                    $i++;
                }
                //var_dump($arr);
                echo json_encode($arr);
            }else{
                echo json_encode("No hay coincidencias");
            }
             break;
         case "regDetalleMuestra":
            // var_dump($post);
             $enc=new encuesta();
             $nuevoDetalle=array("encuesta"=>$post->encuesta,
                                 "concesionario"=>$post->concesionario,
                                 "usuario"=>$post->usuario,  
                                 "muestra"=>$post->muestra,   
                                "rangoUno"=>$post->rangoUno,
                                "rangoDos"=>$post->rangoDos,
                                "rangoTres"=>$post->rangoTres,
                                "rangoCuatro"=>$post->rangoCuatro);
              //var_dump($nuevoDetalle);
             $totalRangos=$post->rangoUno+$post->rangoDos+$post->rangoTres+$post->rangoCuatro;
             
             
             
             
             if($enc->crearDetalleMuestra($nuevoDetalle)){
                $enc->actualizarAsignadas($post->encuesta, $totalRangos);
                //$enc->asociarUsuario($post->encuesta,$post->usuario);
                $enc->asociarUsuario($post->encuesta,$post->usuario,$totalRangos); 
                echo json_encode($enc->mensaje);
             }else{
                 echo json_encode($enc->mensaje);
             }
             
             
             
             
             /*$enc->obtenerAsignadas($post->encuesta);
             if(count($enc->filas) > 0){
                 echo json_encode($enc->filas);

            }else{
                echo json_encode("Ha ocurrido un evento inprevisto al crear solicitar informacion a la base de datos");
            }*/
             break;
         case "regZona":
             $zon=new zona();
             $nuevaZona=array("NombreZona"=>$post->NombreZona,"directorZona"=>$post->director);
             $zon->set($nuevaZona);
             echo json_encode($zon->mensaje);
             break;
         case "regConcesionario":
             
             $con=new concesionario();
             $con->consultar_codigo($post->idZona);
             $cod=$con->filas[0]["codigo"]+1;
             $nuevoConcesionario=array("codigo_concesionario"=>$post->idZona."00".$cod,"nombreConcesionario"=>$post->nombreConcesionario,
                                       "director"=>$post->director,
                                        "idZona"=>$post->idZona);
             
            $con->set($nuevoConcesionario);
             
             echo json_encode($con->mensaje);
             break;
         case "asociarRangosAunaEncuesta":
             $enc=new encuesta();
             echo json_encode($enc->asociarRangos($post->encuesta, $post->rangoUno));             
             break;
         case "asociarMuestraAunaEncuesta":
             
                //var_dump($post);
             
                $encuesta= new encuesta();
                $date = new DateTime($post->fechaCreacion);
                $arrNuevaEncuesta=array("nombreEncuesta"=>$post->usuario,
                                        "fechaCreacion"=>$date->format("Y-m-d H:i:s"),
                                        "idForm"=>$post->concesionario,                                           
                                        "Fk_Id_Usuario"=>$post->muestra,    
                                         "estado"=>"En espera" );
                //var_dump($arrNuevaEncuesta);                         
                if($encuesta->setPlantilla($arrNuevaEncuesta)){
                    //echo $encuesta->ultimoRegistroInsertado;
                  // echo json_encode($encuesta->mensaje);
                    $mue =  new muestra();
                    if($mue->asociarEncuestaAunaMuestra($post->encuesta,$encuesta->idEncuesta)){
                        $enc=new encuesta();
                        $enc->cambioEstado('Lista para proceso', $encuesta->idEncuesta);
                        echo json_encode(true);
                    }else{
                        echo json_encode(false);   
                    }
               }  else {
                   echo json_encode(false);   
               }
             
             
             //echo "IdEncuesta ".$encuesta->idEncuesta;
             //echo "IdMuestra ".$post->encuesta;
             
             break;
         case "obterUsuarioEntrevista":
                $mue=new muestra();
                $cadena=array("usuario"=>$post->usuario,"estado"=>"En proceso");
                $mue->setCambiaEstado($cadena);
                /*AQUI CAMBIA ESTADO DE LA MUESTRA POR EN PROCESO*/
                $mue->get($post->usuario);
             echo json_encode($mue->filas);
             break;         
         case "actUsuarioEntrevista":
             $mue=new muestra();
                $cadena=array("usuario"=>$post->usuario,"estado"=>"efectivo");
                $mue->setCambiaEstado($cadena);
                $mue->mensaje;
             break;
         case "obtenerDetalleAsignadas":
             //var_dump($post);
             $muestra=new muestra();
             $muestra->obtenerValorRangosEncuesta($post->encuesta);
             $muestraDos=new muestra();
             $muestraTres=new muestra();
             $muestraTres->obtenerAsignadasConcesionario($post->encuesta, $post->usuario,$post->concesionario);
             //var_dump($muestra->filas);
             foreach ($muestra->filas as $key => $value) {
                 //echo $value["Uno"];
                 $arrUno=  explode(",",$value["Uno"]);
                 $arrDos=  explode(",",$value["Dos"] );
                 $arrTres=  explode(",",$value["Tres"]);
                 $arrCuatro=  explode(",",$value["Cuatro"]);
                 
             }
             //echo $arrUno[0].",".$arrUno[1];
             //$muestraDos->obtenerCantidadMuestra($post->encuesta, $post->usuario,$post->concesionario, $arrUno[0], $arrUno[1]);
             //$muestraDos->obtenerCantidadMuestra($post->encuesta, $post->usuario,$post->concesionario, $arrDos[0], $arrDos[1]);
             //$muestraDos->obtenerCantidadMuestra($post->encuesta, $post->usuario,$post->concesionario, $arrTres[0], $arrTres[1]);
             //$muestraDos->obtenerCantidadMuestra($post->encuesta, $post->usuario,$post->concesionario, $arrCuatro[0], $arrCuatro[1]);
             
             //var_dump($muestra->filas);
             //var_dump($muestraDos->filas);
             //var_dump($muestraTres->filas);
             $arr=array();
             $j=0;
             //foreach ($muestraDos->filas as $key => $value) {
             /*for ($i=0;$i<count($muestraDos->filas)-1;$i++){  
                 if($muestraDos->filas[$i]["rango"]!=NULL && $muestraTres->filas[$i]["rangoUno"] != NULL && $muestraTres->filas[$i]["rangoDos"] != NULL && $muestraTres->filas[$i]["rangoTres"] != NULL && $muestraTres->filas[$i]["rangoCuatro"] != NULL){
                    $arr[$j]=(int)$muestraDos->filas[$i]["rango"];
                 }   
                 
             }*/
             //var_dump($muestraDos->filas);
             if( $muestraTres->filas[0]["rangoUno"] != NULL ){
                    //$arr[0]=(int)$muestraDos->filas[0]["registros"]-(int)$muestraTres->filas[0]["rangoUno"];
                 $arr[0]=(int)$muestraTres->filas[0]["rangoUno"];
             }else{
                 $arr[0]=0;
             }
             
             if( $muestraTres->filas[0]["rangoDos"] != NULL ){
                    //$arr[1]=(int)$muestraDos->filas[1]["registros"]-(int)$muestraTres->filas[0]["rangoDos"];
                 $arr[1]=(int)$muestraTres->filas[0]["rangoDos"];
             }else{
                 $arr[1]=0;
             }
             
             if( $muestraTres->filas[0]["rangoTres"] != NULL ){
                    //$arr[2]=(int)$muestraDos->filas[2]["registros"]-(int)$muestraTres->filas[0]["rangoTres"];
                 $arr[2]=(int)$muestraTres->filas[0]["rangoTres"];
             }else{
                 $arr[2]=0;
             }
             
             if( $muestraTres->filas[0]["rangoCuatro"] != NULL ){
                    //$arr[3]=(int)$muestraDos->filas[3]["registros"]-(int)$muestraTres->filas[0]["rangoCuatro"];
                 $arr[3]=(int)$muestraTres->filas[0]["rangoCuatro"];
             }else{
                 $arr[3]=0;
             }
             //$arr[0]=(int)$muestraDos->filas[0]["rango"]-(int)$muestraTres->filas[0]["rangoUno"];
             //$arr[1]=(int)$muestraDos->filas[1]["rango"]-(int)$muestraTres->filas[0]["rangoDos"];
             //$arr[2]=(int)$muestraDos->filas[2]["rango"]-(int)$muestraTres->filas[0]["rangoTres"];
             //$arr[3]=(int)$muestraDos->filas[3]["rango"]-(int)$muestraTres->filas[0]["rangoCuatro"];
             echo json_encode($arr);
             break;
         case "obtenerCantidadMuestraZona":
             $muestra=new muestra();
             $muestra->obtenerCantidadMuestraZona($post->encuesta, $post->usuario, $post->concesionario);
             if($muestra->filas[0]["registros"]!=NULL){
                echo json_encode($muestra->filas[0]["registros"]); 
             }else{
                 echo json_encode(FALSE); 
             }
             
             break;
         case "obtenerCantidadMuestraConcesionario":
             $muestra=new muestra();
             $muestra->obtenerValorRangosEncuesta($post->encuesta);
             $muestraDos=new muestra();
             $muestraTres=new muestra();
             //$muestraTres->obtenerCantidadMuestra($post->encuesta, $post->muestra,$post->concesionario);
             //muestra->obtenerCantidadMuestra($post->encuesta,$idMuestra,$concesionario,$rUno,$rDos);

             //var_dump($muestra->filas);
             foreach ($muestra->filas as $key => $value) {
                 //echo $value["Uno"];
                 $arrUno=  explode(",",$value["Uno"]);
                 $arrDos=  explode(",",$value["Dos"] );
                 $arrTres=  explode(",",$value["Tres"]);
                 $arrCuatro=  explode(",",$value["Cuatro"]);
                 
             }
             //echo $arrUno[0].",".$arrUno[1];
             $muestraDos->obtenerCantidadMuestra($post->encuesta, $post->muestra,$post->concesionario, $arrUno[0], $arrUno[1]);
             $muestraDos->obtenerCantidadMuestra($post->encuesta, $post->muestra,$post->concesionario, $arrDos[0], $arrDos[1]);
             $muestraDos->obtenerCantidadMuestra($post->encuesta, $post->muestra,$post->concesionario, $arrTres[0], $arrTres[1]);
             $muestraDos->obtenerCantidadMuestra($post->encuesta, $post->muestra,$post->concesionario, $arrCuatro[0], $arrCuatro[1]);
             
             //var_dump($muestra->filas);
             //var_dump($muestraDos->filas);
            // var_dump($muestraTres->filas);
             $arr=array();
             $j=0;
           
             if($muestraDos->filas[0]["registros"]!=NULL && $muestra->filas[0]["Uno"] != NULL ){
                    //$arr[0]=(int)$muestraDos->filas[0]["registros"]-(int)$muestraTres->filas[0]["rangoUno"];
                 $arr[0]=(int)$muestraDos->filas[0]["registros"];
             }else{
                 $arr[0]=(int)$muestraDos->filas[0]["registros"];
             }
             
             if($muestraDos->filas[1]["registros"]!=NULL && $muestra->filas[0]["Dos"] != NULL ){
                    //$arr[1]=(int)$muestraDos->filas[1]["registros"]-(int)$muestraTres->filas[0]["rangoDos"];
                 $arr[1]=(int)$muestraDos->filas[1]["registros"];
             }else{
                 $arr[1]=(int)$muestraDos->filas[1]["registros"];
             }
             
             if($muestraDos->filas[2]["registros"]!=NULL && $muestra->filas[0]["Tres"] != NULL ){
                    //$arr[2]=(int)$muestraDos->filas[2]["registros"]-(int)$muestraTres->filas[0]["rangoTres"];
                 $arr[2]=(int)$muestraDos->filas[2]["registros"];
             }else{
                 $arr[2]=(int)$muestraDos->filas[2]["registros"];
             }
             
             if($muestraDos->filas[3]["registros"]!=NULL && $muestra->filas[0]["Tres"] != NULL ){
                    //$arr[3]=(int)$muestraDos->filas[3]["registros"]-(int)$muestraTres->filas[0]["rangoCuatro"];
                 $arr[3]=(int)$muestraDos->filas[3]["registros"];
             }else{
                 $arr[3]=(int)$muestraDos->filas[3]["registros"];
             }
             //$arr[0]=(int)$muestraDos->filas[0]["rango"]-(int)$muestraTres->filas[0]["rangoUno"];
             //$arr[1]=(int)$muestraDos->filas[1]["rango"]-(int)$muestraTres->filas[0]["rangoDos"];
             //$arr[2]=(int)$muestraDos->filas[2]["rango"]-(int)$muestraTres->filas[0]["rangoTres"];
             //$arr[3]=(int)$muestraDos->filas[3]["rango"]-(int)$muestraTres->filas[0]["rangoCuatro"];
             echo json_encode($arr);
             /*var_dump($post); 
             $muestra=new muestra();
             $muestraDos=new muestra();
             $muestraDos->obtenerValorRangosEncuesta($post->encuesta);
             $muestra->obtenerCantidadMuestra($post->encuesta,$idMuestra,$concesionario,$rUno,$rDos);
                     
             if($muestra->filas[0]["registros"]!=NULL){
                echo json_encode($muestra->filas[0]["registros"]); 
             }else{
                 echo json_encode(FALSE); 
             }*/
             
             break;    
         case "obtenerRangos":
             $muestra=new muestra();
             $muestra->obtenerValorRangos();
             echo json_encode($muestra->filas);
             break;
         case "obtenerRangosEncuesta":
             //var_dump($post);
             $form=new formulario();
             $form->obtener_id_formulario_de_una_encuesta($post->encuesta);
             
             //var_dump($form->filas);
             if(count($form->filas)>0){
                 $muestra=new muestra();
             
                $muestra->obtenerValorRangosEncuesta($post->encuesta);
                //$muestra->obtenerValorRangosEncuesta($form->filas[0]["IdFormulario"]);
                $arr=array();
                $i=0;
                foreach ($muestra->filas as $key => $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                }
                echo json_encode($arr);
             }else{
                 echo json_encode(FALSE);
             }
             
             break;
         case "obtenerMuestras":
             $mue=new muestra();
             
             $mue->obtenerMuestrasAsociadasEncuesta($post->encuesta);
           
             echo json_encode($mue->filas);
             break;
         case "obtenerMuestrasSinEncuesta":
             $mue=new muestra();
             $mue->obtenerMuestrasSinEncuesta();
             $arr=array();
             $i=0;
             if(count($mue->filas)>0){
                 foreach ($mue->filas as $value) {
                    $arr[$i]=  array_map('utf8_encode', $value);
                    $i++;
                 }
                 echo json_encode($arr);
             }else{
                 echo json_encode(false);
             }
             
             break;
         case "obtnerZonasRepMensual":
             $zona = new zona();
             $zona->zonasRepMensual($post->NombreZona);
             foreach ($zona->filas as $key => $value) {
                 $arr[$i]=  array_map('utf8_encode', $value);
                 $i++;
             }
             echo json_encode($arr);
             break;
         case "crearRango":
             $mue=new muestra();
             $nuevoRango=array(
                         "uno"=>$post->rangoUno,
                         "dos"=>$post->rangoDos,
                         "tres"=>$post->rangoTres,
                         "cuatro"=>$post->rangoCuatro
             );
             
             $mue->setRango($nuevoRango);
             echo json_encode($mue->mensaje);                     
             break;
         case "eliminarConcesionario":
             $con=new concesionario();            
             echo json_encode($con->eliminarConcesionario($post->nombreConcesionario));
             break;
         case "eliminarZona":
             $zn=new zona();            
             echo json_encode($zn->eliminarZona($post->NombreZona));
             break;
         case "editarConcesionario":
             $con=new concesionario();
             echo json_encode($con->editarConcesionario($post->idZona, $post->nombreConcesionario, $post->director));
                 
             
             break;
         case "editarZona":
             $zn=new zona();
             echo json_encode($zn->editarZona($post->id, $post->NombreZona, $post->director));
             break;
         
         case "consultarTodasLasMuestra":
             $mt=new muestra();
             $mt->getAlls();
             
             if(count($mt->filas)>0){
             $arr=array();
             $i=0;
                 foreach ($mt->filas as $key => $value) {
                 $arr[$i]=  array_map('utf8_encode', $value);
                 $i++;
             }
             echo json_encode($arr);
             }else{
                 echo json_encode(false);
             }
             break;
         case "consultarMuestra":
             //var_dump($post->encuesta);
             $mt=new muestra();
             $mt->obtenerUnaMuestra($post->encuesta);
             if(count($mt->filas)>0){
                 $arr=array();
                 $i=0;
                foreach ($mt->filas as $key => $value) {
                 $arr[$i]=  array_map('utf8_encode', $value);
                 $i++;
             }
             echo json_encode($arr);
             }else{
                 echo json_encode(false);
             }
             break;
         case "elminarMuestra":
             $mu=new muestra();
             echo json_encode($mu->eliminarDescripcionMuestra($post->encuesta));
             
             break;
         case "consultarDetalleMuestra":
             //var_dump($post);
             if($post->usuario=="*"){
                $user=new usuario();
                
                $arr=array();
                //var_dump($user->filas);
                
                    
                    $mu=new muestra();
                    $mu->consultarDetalleMuestraPorEncuesta($post->encuesta);
                    
                    $a=0;
                    //var_dump(count($mu->filas));
                    
                        foreach($mu->filas as  $value) {
                            $arr[$a]=  array_map('utf8_encode', $value);
                            $a++;
                        }
                    
                    
                    
                
                echo json_encode($arr);
             }else{
                $mu=new muestra();
                $mu->consultarDetalleMuestra($post->encuesta, $post->usuario);
                $arr=array();
                $a=0;

                foreach ($mu->filas as  $value) {
                    $arr[$a]=  array_map('utf8_encode', $value);
                    $a++;
                }
                echo json_encode($arr);
             }
             
             break;
         case "consultarZona":
             $zn=new zona();
             $zn->get($post->NombreZona);
             $arr=array();
             $a=0;
             
             foreach ($zn->filas as  $value) {
                 $arr[$a]=  array_map('utf8_encode', $value);
                 $a++;
             }
             echo json_encode($arr);
             break;
        
         
    }
}