<?php
    //CONTSTANTES CONFIGURACION DE LA CONEXION A LA BASE DE DATOS 
    define('DB_HOST','localhost');
    define('DB_USUARIO','root');
    define('DB_NOMBRE','mohansof_socamarketing');
    define('DB_PASS', '');
   // define('DB_PUERTO','3306');
    //Ambiente  produccion
    /*define('DB_HOST','localhost');
    define('DB_USUARIO','mohansof_socaAdm');
    define('DB_NOMBRE','mohansof_socamarketing');
    define('DB_PASS', '@#{yZ^VmTIJ*');*/
    //Ambiente pruebas
    /*define('DB_HOST','localhost');
    define('DB_USUARIO','mohansof_socaAdm');
    define('DB_NOMBRE','mohansof_prueba_socamarketing');
    define('DB_PASS', '@#{yZ^VmTIJ*');*/
    
    //define('DB_PUERTO','2082');
    /*
     * Clase abstracta que sirve de modelo para la conexion y crud de una base de datos 
     */    
    abstract class ModeloBasedeDatos{
//        //protected $db_nombre='mohansof_soca_data';
	public $sentencia_Sql;
	public $filas=array();
	public $conexion;
	public $ultimoRegistroInsertado;	 
        public $filasAfectadas;
		/** 
		 * Metodo para abrir la conexion  a la base de datos
		 * */		 
		private function abrir_conexion(){
			//Instancio un objeto de tipo Mysqli
			$this->conexion= new mysqli(DB_HOST,
	     					    DB_USUARIO,
						    DB_PASS,
						    DB_NOMBRE);			
               
                       if($this->conexion->connect_error){
                             $archivo=fopen("../Logs/error.log", "a");	
                             $mensaje ='Mysql Error ['.date("d-m-y H:i:s",time()).'] ('.$this->conexion->connect_errno.') '.$this->conexion->connect_error."\n";				 
                             if(fputs($archivo, $mensaje)){
                                    fclose($archivo);
                                     return FALSE;
                             }				 
                       }else{
                     //      var_dump( $this->conexion);
                            return TRUE;
                       }
									
		}
		/**
		 *Metodo para cerrar la conexion a la base de datos 
		 */		 
		private function cerrar_conexion(){
			$this->conexion->close();
			
                }
		/*
		 * Metodo para ejecutar una sentencia SQL de tipo
		 * 
		 * DELETE
		 * UPDATE
		 * INSERT
		 * 
		 * */
		public function ejecutar_function_sql(){
			if($this->abrir_conexion()){
				//Ejecuto sentencia
                            ////echo $this->sentencia_Sql;
                            $this->conexion->set_charset('utf8');						
			   if ($resultado=$this->conexion->query($this->sentencia_Sql)) {
                               $this->ultimoRegistroInsertado=$this->conexion->insert_id;  
                               $this->filasAfectadas=$resultado->fetch_object();
                               //echo $this->ultimoRegistroInsertado."--";
                               //var_dump($resultado);
                               //var_dump($this->filasAfectadas->respuestas);  
			   	   $this->cerrar_conexion();
                                   
                                   if($this->filasAfectadas->respuestas=="0"){
                                       return FALSE;
                                   }else{
                                       return TRUE;
                                   }
				   
				} else {
                                  //echo $this->conexion->error;  
                                    //echo "--".$this->sentencia_Sql."--";
                                   $this->cerrar_conexion();
			           return FALSE;
				}				
			}			
		}
                
                /*
		 * Metodo para ejecutar una sentencia SQL de tipo
		 * 
		 * DELETE
		 * UPDATE
		 * INSERT
		 * 
		 * */
		public function ejecutar_sentencia_sql(){
			if($this->abrir_conexion()){
				//Ejecuto sentencia
                            ////echo $this->sentencia_Sql;
                            //$this->conexion->set_charset('utf8');						
			   if ($this->conexion->query($this->sentencia_Sql)!==FALSE) {
                               $this->ultimoRegistroInsertado=$this->conexion->insert_id;  
                               $this->filasAfectadas=$this->conexion->affected_rows;
                               //echo $this->ultimoRegistroInsertado."--";
                                   //echo $this->conexion->error;  
			   	   $this->cerrar_conexion();
				   return TRUE;
				} else {
                                  //echo $this->conexion->error;  
                                    //echo "--".$this->sentencia_Sql."--";
                                   $this->cerrar_conexion();
			           return FALSE;
				}				
			}			
		}
                
		/*
		 * Metodo para ejecutar una sentencia SQL de tipo
		 * 
		 * SELECT
		 * 
		 * */
		public function ejecutar_consulta_sql(){
			if ($this->abrir_conexion()) {
			//	echo $this->sentencia_Sql."<br>";
				if ($resultado=$this->conexion->query($this->sentencia_Sql)) {
                                        
                                        $this->conexion->set_charset("utf8");
                                        
					while ($this->filas[]=$resultado->fetch_assoc()); 
						
					$resultado->close();	
					$this->cerrar_conexion();
					//var_dump($this->filas);
					array_pop($this->filas);
					
                                }else{
                                    //echo $this->conexion->connect_error;  
                                }
			}
			
		}
                
                public function ejecutar_consulta_sql_procedure(){
			if ($this->abrir_conexion()) {
			//	echo $this->sentencia_Sql."<br>";
				if ($resultado=$this->conexion->query($this->sentencia_Sql)) {
                                        
                                        //$this->conexion->set_charset("utf8");
                                        
					while ($this->filas[]=$resultado->fetch_assoc()); 
						
					$resultado->close();	
					$this->cerrar_conexion();
					//var_dump($this->filas);
					array_pop($this->filas);
					
                                }else{
                                    //echo $this->conexion->connect_error;  
                                }
			}
			
		}
		
                public function ultimoRegistro(){
                    
                    $this->ejecutar_consulta_sql();
                    if(count($this->filas) == 1){
                      //      var_dump($this->filas);
                        foreach ($this->filas as  $value) {
                            $id = $value["id"];
                        }
                       // echo $id;
                        return $id;
                    }
                }
		//Metodos abstractos
		abstract protected function set();
		abstract protected function get();
		abstract protected function getAlls();
		//abstract protected function editar(editarProducto = array());
		//abstract protected function darDeBaja();
	}
    /*
    * Clase para encriptar datos
     * */
    class Encriptar {
		
        private $longitudSailt ;
     
	    
		/*
     	* Metodo encargado de encriptar una cadena con un sailt o cadena para decodificar nuevamente el HASH
     	*/
    	public function encriptarConSalt($dato, $tipo = 'sha1'){
        //Genero el valor "Sailt" a partir de un uniqueId y de tamaño definido en la longitud del "sailt"
        $salt=  substr(uniqid(rand(),TRUE),0,  $this->longitudSailt);
			//Evaluo que exista el tipo de codificacion valido para PHP
	        if(in_array($tipo,  hash_algos())){
	            //Encrpta el dato convertido a minusculas junto al "Sailt"
	            $encriptar=$salt.strtolower($dato);
				
	            $datoEncriptadoConSailt = hash($tipo,$encriptar);
	            //Agrego el tamaño del "Sailt" al inicio de la cadena y el "Sailt" al final.
	            //longitud+HASH+sailt
	            return $this->longitudSailt.$datoEncriptadoConSailt.$salt;
	        }  else {
	            return "Error : algoritmo no encontrado";
	        }

    	}
    	
		/*
     	* Metodo encargado de desencriptar una cadena 
     	* Return arreglo con tres indices longitud,HASH,salt
     	*/
    	public function desencriptarHash($cadena){
	        //Obtengo una cadena parcial con el tamaño del sailt
	        $arrHash['longitud']= substr($cadena, 0,1);
	        //Obtengo la cadena parcial con el HASH al conocer la longitud del "sailt"
	        $arrHash['hash']=  substr($cadena, 1,  strlen($cadena)-($arrHash['longitud']+1));
	        //str_Replace("Elemento a buscar","Valor por el cual remplazar","Donde se va a buscar") 
	        $arrHash['salt']= str_replace($arrHash['hash'],'',  substr($cadena, 1));
	        return $arrHash;
    	}
    //Metodo para evaluar el nivel de seguridad de la contraseña
	public function evaluarSeguridadPass($contrasenia) {
	        $nivelSeguridad=0;
	        $consecutivos=0;
	        
	        //Convierte un string en un array
	           $arrString = \str_split($contrasenia);
	           
	        //Evaluo el tamaño de la contraseña
	        if (strlen($contrasenia)>= 8) {
	            $nivelSeguridad++;
	        }
	        if(\strlen($contrasenia) >= 16){
	            $nivelSeguridad++;
	        }
	        //Evaluo que contenga mayusculas y minusculas
	        if(strtoupper($contrasenia) != $contrasenia){
	            $nivelSeguridad++;
	        }
	        //Evaluo el numero de simbolos que contiene
	        preg_match_all('/[!@#$%&*\/=?,;.:\-_+^\\\]/',$contrasenia, $simbolos);
	           $nivelSeguridad+=sizeof($simbolos[0]);
	           //remuevo los valores repetidos y cuento los caracteres unicos
	           $unicos =  sizeof(array_unique($arrString));
	           
	           $nivelSeguridad+=$unicos;
	           //Recorro el array para validar los caracteres repetidos
	               for($i=0;$i<count($arrString);$i++){
	                   if($i > 0){
	                      if($arrString[$i-1] === $arrString[$i]){
	                       $consecutivos++;
	                      }
	                   }
	               }
	               //Resto la cantidad de coincidencias de los niveles e seguridad
	               $nivelSeguridad -= $consecutivos;
	               
	               return $nivelSeguridad;
	    }
		
	public function __construct() {
	        //Genero el valor aleatorio para el tamaño del "Salt"
	      $this->longitudSailt= \rand(0, 9);
	}
		
  }
    /*
     * Clase que representa la entidad pregunta
     */    
    class preguntas extends ModeloBasedeDatos{
        public $IdPregunta;
        public $Tipo;
        public $pregunta;
        public $opcionRespuesta;
        public $mensaje;
       
        function set($nueva =  array()){
            if(array_key_exists("tipo", $nueva) and
               array_key_exists("pregunta", $nueva)
               and array_key_exists("respuestas", $nueva)){
            
           foreach ($nueva as $key => $value) {
               $$key=$value;
           }
           
            $this->sentencia_Sql="INSERT INTO preguntas (TipoPregunta,ArgumentoPregunta)"
                   . "VALUES('$tipo','$pregunta')";
            
                if($this->ejecutar_sentencia_sql()){    
                    $idPregunta=$this->ultimoRegistroInsertado;
                    //echo $idPregunta;
                    //var_dump($respuestas);
                    if($tipo=="Abierta"){
                        $this->sentencia_Sql="INSERT INTO respuestas_preguntas (Fk_Id_Pregunta,Respuesta,NivelOptimo)"
                                        . "VALUES('$idPregunta','','') ";
                                if($this->ejecutar_sentencia_sql() == FALSE){
                                    $this->sentencia_Sql="DELETE preguntas WHERE IdPreguntas = '$idPregunta'";
                                    $this->ejecutar_sentencia_sql();
                                    return false;
                                }
                    }
                    foreach ($respuestas as $v) {
                       
                        
                          //echo $idPregunta;
                         switch($tipo){
                             
                              case "AbiertaCategoria":
                                 $this->sentencia_Sql="INSERT INTO respuestas_preguntas (Fk_Id_Pregunta,Respuesta,NivelOptimo)"
                                        . "VALUES('$idPregunta','$v->respuesta','$v->nivelOptimo') ";
                                if($this->ejecutar_sentencia_sql() == FALSE){
                                    $this->sentencia_Sql="DELETE preguntas WHERE IdPreguntas = '$idPregunta'";
                                    $this->ejecutar_sentencia_sql();
                                    return false;
                                }
                                 break;   
                             case "Cerrada":
                                  $this->sentencia_Sql="INSERT INTO respuestas_preguntas (Fk_Id_Pregunta,Respuesta,Comentario,NivelOptimo)"
                                        . "VALUES('$idPregunta','$v->respuesta','$v->comentario','$v->nivelOptimo') ";
                                if($this->ejecutar_sentencia_sql() == FALSE){
                                    $this->sentencia_Sql="DELETE preguntas WHERE IdPreguntas = '$idPregunta'";
                                    $this->ejecutar_sentencia_sql();
                                    return false;
                                }
                                 break;
                             case "CerradaComentario":
                                 $this->sentencia_Sql="INSERT INTO respuestas_preguntas (Fk_Id_Pregunta,Respuesta,Comentario,NivelOptimo)"
                                        . "VALUES('$idPregunta','$v->respuesta','$v->comentario','$v->nivelOptimo') ";
                                    if($this->ejecutar_sentencia_sql() == FALSE){
                                        $this->sentencia_Sql="DELETE preguntas WHERE IdPreguntas = '$idPregunta'";
                                        $this->ejecutar_sentencia_sql();
                                        return false;
                                    }
                                 break;
                             case "CerradaMultiple":
                                 $this->sentencia_Sql="INSERT INTO respuestas_preguntas (Fk_Id_Pregunta,Respuesta,NivelOptimo)"
                                        . "VALUES('$idPregunta','$v->respuesta','$v->nivelOptimo') ";
                                if($this->ejecutar_sentencia_sql() == FALSE){
                                    $this->sentencia_Sql="DELETE preguntas WHERE IdPreguntas = '$idPregunta'";
                                    $this->ejecutar_sentencia_sql();
                                    return false;
                                }
                                 break;
                             case "Rankin":
                                 $this->sentencia_Sql="INSERT INTO respuestas_preguntas (Fk_Id_Pregunta,Respuesta,NivelOptimo)"
                                        . "VALUES('$idPregunta','$v->respuesta','$v->nivelOptimo') ";
                                if($this->ejecutar_sentencia_sql() == FALSE){
                                    $this->sentencia_Sql="DELETE preguntas WHERE IdPreguntas = '$idPregunta'";
                                    $this->ejecutar_sentencia_sql();
                                    return false;
                                }
                                 break;
                              case "GrupoPreguntas":
                                  $this->sentencia_Sql="INSERT INTO respuestas_preguntas (Fk_Id_Pregunta,Respuesta,Comentario,NivelOptimo)"
                                        . "VALUES('$idPregunta','$v->respuesta','$v->comentario','$v->nivelOptimo') ";
                                if($this->ejecutar_sentencia_sql() == FALSE){
                                    $this->sentencia_Sql="DELETE preguntas WHERE IdPreguntas = '$idPregunta'";
                                    $this->ejecutar_sentencia_sql();
                                    return false;
                                }
                                  break;
                     
                         }
                          
                    }
                    $this->mensaje="pregunta creada con exito";
                    return true;
                }
                else{  
                    $this->mensaje="No hemos podido crear la pregunta";
                    return false;
                }      
           }
        }
        function get($numero=''){
            if ($numero != '') {
                $this->sentencia_Sql="SELECT * FROM preguntas WHERE IdPreguntas='$numero'";
                $this->ejecutar_consulta_sql();
            }
        }
        function getAlls(){
            $this->sentencia_Sql="SELECT * FROM preguntas";
            $this->ejecutar_consulta_sql();
        }
        function obtenerRespuestas($idPregunta){
            $this->filas=array();
            $this->sentencia_Sql="SELECT * FROM respuestas_preguntas WHERE Fk_Id_Pregunta = '$idPregunta'";
            $this->ejecutar_consulta_sql();
           /// var_dump($this->filas);
        }
        function obtenerCondicion($idDetalle){
            $this->sentencia_Sql="SELECT * FROM detalle_condicion WHERE Fk_Id_Detalle_Formulario='$idDetalle'";
            $this->ejecutar_consulta_sql();
        }
        function __construct() {
            
        }
        function __destruct() {
            unset($this);
        }
    }
   /*
     * Clase que representa la entidad formulario
     */
    class formulario extends ModeloBasedeDatos{
        public $idFormulario;
        public $nombreFormulario;
        public  $fechaCreacion;
        public $usuario;
        public $preguntas=array();
        public $mensaje; 
        
        function set($nuevoForm =  array()){
            if(count($nuevoForm)>0){
               foreach ($nuevoForm as $key => $value) {
                 $$key=$value;
              }
                 $this->sentencia_Sql="INSERT INTO formulario(NombreFormulario,FechaCreacion,Fk_Id_Empleado_creador)"
                   . "VALUES('$nombreFormulario','$fechaCreacion','$Fk_Id_Empleado')";
           if($this->ejecutar_sentencia_sql()){
               
                 $this->sentencia_Sql="SELECT MAX(IdFormulario) as id FROM formulario";
                $this->idFormulario=  $this->ultimoRegistro(); 
                 //var_dump($preguntas);
                $i=1;
                    foreach ($preguntas as $value) {
                        
                        if($value->condicion==false){
                            $sub=0;
                        }else{
                           //var_dump($value->listaCondiciones);
                            $sub=1;
                        }
                        $this->sentencia_Sql="INSERT INTO detalle_formulario_preguntas(Fk_Id_Formulario,Fk_Id_Pregunta,NumeroPregunta,Condicion)"
                        . "VALUES('$this->idFormulario','$value->idPregunta','$i','$sub')";
                        
                        if($this->ejecutar_sentencia_sql()){
                            $idDetalle=$this->ultimoRegistroInsertado;
                            if($value->condicion==true){
                                //var_dump($value->listaCondiciones);
                                /*AQUI ARREGLO DE SUBENCUESTA QUE FALTA ENVIAR DESDE JS*/
                                foreach ($value->listaCondiciones as $v) {
                                    //echo (count($value->listaCondiciones));
                                    //$listaCondiciones=count($value->listaCondiciones); 
                                    /*echo "****";
                                    var_dump($v);
                                    echo "****";*/
                                    /*$idPreguntaCondicion=$val->idPreguntaCondicion; 
                                    $tipoCondicion=$val->tipoCondicion;
                                    $pregunta_de_la_condicion=$val->pregunta_de_la_condicion;
                                    $respuesta=$val ->respuesta;*/

                                     if($v->tipoCondicion =="2"){
                                       $this->sentencia_Sql="INSERT INTO detalle_condicion"
                                          . "(Fk_Id_Condicion,Fk_Id_Detalle_Formulario,Fk_Id_Respuesta_Pregunta,Pregunta_Condicion)"
                                          . "VALUES('2','$idDetalle','$v->respuesta','$v->pregunta_de_la_condicion')";
                                         $this->ejecutar_sentencia_sql();
                                     }else if($v->tipoCondicion=="1"){
                                       $this->sentencia_Sql="INSERT INTO detalle_condicion"
                                          . "(Fk_Id_Condicion,Fk_Id_Detalle_Formulario,Fk_Id_Respuesta_Pregunta)"
                                          . "VALUES('1','$idDetalle','$v->respuesta')";
                                         $this->ejecutar_sentencia_sql();
                                     }
                                }
                                
                            }
                               $this->mensaje="formulario creado con exito";
                         $i++;      
                        }  else {
                                   $this->mensaje="no hemos podido crear formulario";
                                   $this->sentencia_Sql="DELETE FROM formulario WHERE IdFormulario = '$this->idFormulario'";
                                   $this->ejecutar_sentencia_sql();
                                   return false;
                        }
                        
                    }
                    return true;
              }else{
               $this->mensaje="no hemos podido crear formulario";
               return false;
              }
              
           }  else {
                $this->mensaje="Hay campos inexistentes";
                return false;
           }
           
        }
        function ultimoRegistroForm() {
             $this->sentencia_Sql="SELECT MAX(IdFormulario) as id FROM formulario";
            
            return $this->ultimoRegistro();
            
        }
        function get( $nombreForm = ''){
            
            if ($nombreForm != '') {
                $this->sentencia_Sql='SELECT NombreFormulario,FechaCreacion,IdPreguntas,pregunta,OpcionesDeRespuesta,Tipo '
                        . '            FROM formulario,detalle_formulario_preguntas,preguntas '
                        . '             WHERE Fk_Id_Pregunta = IdPreguntas AND '
                        . '              NombreFormulario="'.$nombreForm.'" AND Fk_Id_Formulario ='.$nombreForm;
                $this->ejecutar_consulta_sql();
            }
        }
        function getPlantillas(){
            
             $this->sentencia_Sql="SELECT frm.IdFormulario,frm.NombreFormulario ,COUNT(frm.IdFormulario) 'numeroDePreguntas' FROM formulario frm INNER JOIN detalle_formulario_preguntas dt_frm_pre ON frm.IdFormulario=dt_frm_pre.Fk_Id_Formulario GROUP BY frm.IdFormulario";
            $this->ejecutar_consulta_sql();
        }
        function getAlls(){
            $this->sentencia_Sql="SELECT * FROM formulario WHERE EstadoFormulario = '1'";
            $this->ejecutar_consulta_sql();
            if(count($this->filas)==0){
                $this->mensaje="No hay coincidencias en su busqueda";
            }
        }
        function obtener_id_formulario_de_una_encuesta($encuesta=''){
             $this->sentencia_Sql="SELECT IdFormulario FROM formulario form "
                     . "INNER JOIN detalle_encuesta_formulario def "
                     . "ON form.IdFormulario=def.Fk_Id_Formulario_Encuesta AND def.Fk_Id_encuesta='$encuesta'";
            $this->ejecutar_consulta_sql();
        }
        function __construct() {
            
        }
        function __destruct() {
            unset($this);
        }
    }
     /*
     * Clase que representa la entidad encuesta
     */
    class encuesta extends ModeloBasedeDatos{
        public $idEncuesta;
        public $nombreEncuesta;
        public $cantidadMuestreo;
        public $formulario;
        public $usuario;
        public $mensaje;
        
        public function editarRangoEncuestas($idFormulario,$idRango){
            $this->sentencia_Sql="UPDATE formulario SET Fk_Id_Rango ='$idRango' WHERE IdFormulario = '$idFormulario'";
            return $this->ejecutar_sentencia_sql();
        }
        public function asociarUsuario($idEncuesta='',$idUsuario='',$totalAsignadas){
             $this->filas=array();
                     
                 $this->sentencia_Sql="SELECT * FROM detalle_encuesta_usuario deu "
                    . "         WHERE deu.Fk_Id_Encuesta = '$idEncuesta' "
                    . "         AND deu.Fk_Id_Usuario ='$idUsuario'";
            $this->ejecutar_consulta_sql();
          //  var_dump($this->filas);
             $registros =  count($this->filas);
            if( $registros < 1){
              $this->sentencia_Sql="INSERT INTO detalle_encuesta_usuario(Fk_Id_Encuesta,Fk_Id_Usuario,AsignadasUsuario)"
                    . "VALUES('$idEncuesta','$idUsuario','$totalAsignadas')";
                if($this->ejecutar_sentencia_sql()){
                    $this->mensaje="Asociacion exitosa";
                }else{
                        $this->mensaje="Fallo al asociar usuario a la encuesta";
                }   
            }else{
                $this->sentencia_Sql="UPDATE detalle_encuesta_usuario "
                     . " SET AsignadasUsuario = AsignadasUsuario +". $totalAsignadas 
                     . " WHERE Fk_Id_Encuesta = '$idEncuesta' AND Fk_Id_Usuario = '$idUsuario'";
                if($this->ejecutar_sentencia_sql()){
                    $this->mensaje="Asociacion exitosa";
                }else{
                    $this->mensaje="Fallo al actualizar la cantidad de entrevistas asignadas por usuario a la encuesta";
                }
            } 
             
        }
        public function setPlantilla($nuevaEncuesta=array()){
             
            if(array_key_exists("nombreEncuesta", $nuevaEncuesta)
                    
            and array_key_exists("idForm", $nuevaEncuesta)){
                foreach ($nuevaEncuesta as $key => $value) {
                    $$key=$value;
                }   
                
                    $this->sentencia_Sql="INSERT INTO encuesta(NombreEncuesta,FechaCreacionEncuesta,Fk_Id_Usuario_Creador)"
                    . "VALUES('$nombreEncuesta','$fechaCreacion','$Fk_Id_Usuario')";
                if($this->ejecutar_sentencia_sql()){
                      $this->sentencia_Sql="SELECT MAX(IdEncuesta) as id FROM encuesta";
                    $this->idEncuesta=$this->ultimoRegistro();
                    
                      $this->sentencia_Sql="INSERT INTO detalle_encuesta_formulario(Fk_Id_encuesta,Fk_Id_Formulario_Encuesta)"
                    . "VALUES('$this->idEncuesta','$idForm')";
                    if($this->ejecutar_sentencia_sql()){
                        $this->mensaje="Plantillas creada con exito";
                        return TRUE;
                    }else{
                        
                        $this->sentencia_Sql="DELETE encuesta WHERE IdEncuesta='$this->idEncuesta'";
                        $this->ejecutar_sentencia_sql();
                        return FALSE;
                    }
                    
                }else{
                     $this->mensaje="Error al crear encuesta";
                     return FALSE;
                }
                
                
            }
        }
        public function set($nuevaEncuesta=array()){
         if(array_key_exists("nombreEncuesta", $nuevaEncuesta)
            and array_key_exists("muestra", $nuevaEncuesta)
            and array_key_exists("idForm", $nuevaEncuesta)){
            foreach ($nuevaEncuesta as $key => $value) {
                $$key=$value;
            }
            $this->sentencia_Sql="INSERT INTO encuesta(NombreEncuesta,FechaCreacion,CantidadMuestra,Fk_Id_Usuario_Creador,Fk_Id_Rango)"
                    . "VALUES('$nombreEncuesta','$fechaCreacion','$muestra','$Fk_Id_Usuario','$idRango')";
            
            if($this->ejecutar_sentencia_sql()){
               
                $this->sentencia_Sql="SELECT MAX(IdEncuesta) AS id FROM encuesta";
                $id=$this->ultimoRegistro();
                  $this->sentencia_Sql="INSERT INTO detalle_encuesta_formulario(Fk_Id_encuesta,Fk_Id_Formulario)"
                        . "VALUES('$id','$idForm')";
                if($this->ejecutar_sentencia_sql()){
                    $this->mensaje="Encuesta creada con exito";
                    return true;
                }else{
                    $this->mensaje="No hemos podido crear el detalle de la encuesta";
                    
                    $this->sentencia_Sql="DELETE FROM encuesta WHERE IdEncuesta='$id'";
                    $this->ejecutar_sentencia_sql();
                    return false;
                }
                
            }  else {
                $this->mensaje="No hemos podido crear la encuesta";
                return false;
            }
         }   
        }
        public function actualizarRealizadasEncuesta($idEncuesta='',$fecha){
              $this->sentencia_Sql="UPDATE encuesta SET Realizadas = Realizadas + 1 WHERE IdEncuesta= '$idEncuesta'";
            if($this->ejecutar_sentencia_sql()){
                $this->filas=array();
                 $this->sentencia_Sql="SELECT * FROM encuesta WHERE IdEncuesta='$idEncuesta'";
                 $this->ejecutar_consulta_sql();
                // var_dump($this->filas);
                foreach ($this->filas as $key => $value) {
                    if((int)$value["CantidadMuestra"]==(int)$value["Realizadas"]){
                      $this->sentencia_Sql="UPDATE encuesta SET Estado ='Finalizada',FechaFinalizacion='$fecha' WHERE IdEncuesta='$idEncuesta'";
                        if($this->ejecutar_sentencia_sql()){
                            $this->sentencia_Sql="UPDATE promedios "
                                                  . "SET FechaFinalizacion='$fecha'"
                                                  . " WHERE Fk_Id_Encuesta='$idEncuesta'";
                            $this->ejecutar_sentencia_sql();
                        }
                        
                    }else if((int)$value["Realizadas"]==1){
                         $this->sentencia_Sql="UPDATE encuesta SET Estado ='En proceso' WHERE IdEncuesta='$idEncuesta'"; 
                        $this->ejecutar_sentencia_sql();
                    }
                    
                }
                $this->mensaje="Encuestas realizadas actualizada";
            }else{
                $this->mensaje="Error al actualizar las encuestas realizadas";
            }
        }
        function crearDetalleMuestra($nuevoDetalle=  array()){
               if(array_key_exists("encuesta", $nuevoDetalle)
                    and array_key_exists("concesionario", $nuevoDetalle)
                     and array_key_exists("usuario", $nuevoDetalle)
                    and array_key_exists("rangoUno", $nuevoDetalle)
                    and array_key_exists("rangoDos", $nuevoDetalle)
                    and array_key_exists("rangoTres", $nuevoDetalle)
                    and array_key_exists("rangoCuatro", $nuevoDetalle)){
                   foreach ($nuevoDetalle as $key => $value) {
                  	  $$key=$value;
                   }
                 
		 $this->sentencia_Sql="INSERT INTO detalle_encuesta_muestra (Fk_Id_Concesionario,Fk_Id_Encuesta,Fk_Id_Usuario,Fk_Id_Muestra,RangoUno,RangoDos,RangoTres,RangoCuatro)"
                        . "VALUES('$concesionario','$encuesta','$usuario','$muestra ','$rangoUno','$rangoDos','$rangoTres','$rangoCuatro')";
                
                if ($this->ejecutar_sentencia_sql()){
                    $this->mensaje="Detalle creado con exito";
                           return true;
                      
                }else{
                    $this->mensaje="Ha ocurido un error al insertar detalle";
                    return false;
                }

	
	}   
     }
        function obtenerUsuariosPorEncuesta($idEncuesta){
            $this->sentencia_Sql="SELECT * FROM detalle_encuesta_muestra dem"
                            . " INNER JOIN usuario usu "
                            . "ON dem.Fk_Id_Usuario = usu.IdUsuario "
                            . "WHERE dem.Fk_Id_Encuesta= '$idEncuesta' "
                            . "AND dem.Estado= 'en espera' GROUP BY dem.Fk_Id_Usuario ";
                $this->ejecutar_consulta_sql();
        }
        public function get($idEncuesta=''){
            
            if ($idEncuesta!="") {
                  $this->sentencia_Sql="SELECT * FROM preguntas pre INNER JOIN 
                                        detalle_formulario_preguntas dtform on pre.IdPreguntas = 
                                        dtform.Fk_Id_Pregunta INNER JOIN formulario form ON 
                                        dtform.Fk_Id_Formulario = form.IdFormulario INNER 
                                        JOIN detalle_encuesta_formulario dtenc ON 
                                        dtenc.Fk_Id_Formulario_Encuesta = form.IdFormulario INNER 
                                        JOIN encuesta enc ON dtenc.Fk_Id_encuesta = 
                                        enc.IdEncuesta  and enc.IdEncuesta =
                                        ('$idEncuesta') ";
                     //                   . "AND enc.Estado='Lista para proceso'";
                $this->ejecutar_consulta_sql();
                
                if(count($this->filas)>0){
                   return true;
                }else{
                    $this->mensaje="No hay coincidencias";
                    return false;
                }
                   
                
            }
        }
        
        public function getPlantilla($idEncuesta=''){
            
            if ($idEncuesta!="") {
                 $this->sentencia_Sql="SELECT * FROM preguntas pre "
                         . "INNER JOIN detalle_formulario_preguntas dtform ON pre.IdPreguntas = dtform.Fk_Id_Pregunta "
                         . "INNER JOIN formulario form ON dtform.Fk_Id_Formulario = form.IdFormulario "
                         . "AND form.IdFormulario = '$idEncuesta'";
                     //
                $this->ejecutar_consulta_sql();
                
                if(count($this->filas)>0){
                   return true;
                }else{
                    $this->mensaje="No hay coincidencias";
                    return false;
                }
                   
                
            }
        }

        public function getAlls(){
            $this->sentencia_Sql="SELECT * FROM vw_mis_encuestas WHERE Estado LIKE('En espera')";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaPorEstado($estado=''){
           $this->sentencia_Sql="SELECT * FROM vw_mis_encuestas WHERE Estado LIKE('$estado')";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaSinCantidadMuestra(){
            $this->sentencia_Sql="SELECT * FROM encuesta WHERE  CantidadMuestra ='0'";
            $this->ejecutar_consulta_sql();
        }
        function buscarFinalizadasPorFecha($fechaUno,$fechaDos){
            $this->sentencia_Sql="SELECT * FROM encuesta enc WHERE enc.FechaFinalizacion >= '$fechaDos' AND enc.FechaFinalizacion <= '$fechaUno' AND enc.Estado='Finalizada' ";
            $this->ejecutar_consulta_sql();
            if(count($this->filas)>0){
                return true;
            }else{
                return false;
            }
        }
        public function cambiarCantidadMuestra($idEncuesta='',$cantidadMuestra=''){
            $this->sentencia_Sql="UPDATE encuesta SET CantidadMuestra='$cantidadMuestra', Estado='Lista para proceso' WHERE IdEncuesta='$idEncuesta'";
            if($this->ejecutar_sentencia_sql()){
                return true;
            }else{
                return false;
                
            }
        }
        public function encuestasSinRango(){
            $this->sentencia_Sql="SELECT * FROM encuesta WHERE Fk_Id_Rango=0";
            $this->ejecutar_consulta_sql();
                    
        }
        public function encuestaPorFormulario($idForm='',$estado=''){
            if($estado=="%"){
                     $this->sentencia_Sql="SELECT * FROM encuesta enc "
                     . "INNER JOIN detalle_encuesta_formulario def ON def.Fk_Id_encuesta = enc.IdEncuesta "
                     . "AND def.FK_Id_Formulario_Encuesta='$idForm' "
                     . "INNER JOIN formulario f ON f.IdFormulario='$idForm' "
                     . "INNER JOIN rangos r ON f.Fk_Id_Rango=r.IdRango";
            }else{
                      $this->sentencia_Sql="SELECT * FROM encuesta enc "
                     . "INNER JOIN detalle_encuesta_formulario def ON def.Fk_Id_encuesta = enc.IdEncuesta "// AND enc.Estado='$estado' "
                     . "AND def.FK_Id_Formulario_Encuesta='$idForm'"
                     . "INNER JOIN formulario f ON f.IdFormulario='$idForm' "
                     . "INNER JOIN rangos r ON f.Fk_Id_Rango=r.IdRango";
            }
            $this->ejecutar_consulta_sql();
        }
        public function encuestasFinalizadasConLaMismaPlantilla($idEncuesta,$estado){
            $this->sentencia_Sql="SELECT * FROM encuesta enc INNER JOIN detalle_encuesta_formulario def ON enc.IdEncuesta=def.Fk_Id_Encuesta WHERE def.Fk_Id_Formulario_Encuesta =(SELECT def.Fk_Id_Formulario_Encuesta FROM detalle_encuesta_formulario def WHERE def.Fk_Id_Encuesta='$idEncuesta') AND enc.IdEncuesta!= '$idEncuesta' AND enc.Estado='$estado'";
            $this->ejecutar_consulta_sql();
        }
        
        public function cambioEstado($estado='',$idEncuesta='' ){
             $this->sentencia_Sql="UPDATE encuesta SET Estado='$estado' WHERE IdEncuesta='$idEncuesta'";
            if($this->ejecutar_sentencia_sql()){
                return true;
            }else{
                return false;
            }
        }
        
        public function encuestasPorUsuario($idUsuario='',$estado){
           // $this->filas=array();
              $this->sentencia_Sql="SELECT * FROM encuesta enc "
                    . "            INNER JOIN detalle_encuesta_usuario deu ON enc.IdEncuesta=deu.Fk_Id_Encuesta "
                    . "            INNER JOIN usuario usr ON usr.IdUsuario = deu.Fk_Id_Usuario "
                    . "            AND enc.Estado='$estado' "
                    . "            AND usr.IdUsuario='$idUsuario' AND enc.Realizadas <= enc.CantidadMuestra GROUP BY enc.IdEncuesta";
        
            $this->ejecutar_consulta_sql();
        }        
        public function actualizarAsignadas($idEncuesta,$sumaRangos){
          $this->sentencia_Sql="UPDATE encuesta SET CantidadMuestra = CantidadMuestra + ".$sumaRangos." ,Asignadas=Asignadas+ ".$sumaRangos." WHERE IdEncuesta='$idEncuesta'";
            if($this->ejecutar_sentencia_sql()){
                $this->mensaje="Asignacion exitosa";
            }else{
                $this->mensaje="Error al actualizar la cantidad de asignadas";
            }
        }
        public function obtenerAsignadas($idEncuesta){
             $this->sentencia_Sql="SELECT * FROM encuesta WHERE IdEncuesta='$idEncuesta'";
            $this->ejecutar_consulta_sql();
        }
        public function obtenerMuestrayRealizadas($param) {
            $this->sentencia_Sql="SELECT * FROM encuesta WHERE IdEncuesta='$param'";
            $this->ejecutar_consulta_sql();
        }
        /*REPORTES*/
        /*
         * Metodo para obtener las preguntas de una encuesta para el reporte 
         */
        public function getReporte($idEncuesta='',$idZona='',$idConcesionario=''){
                        
            $this->filas=array();
            if ($idEncuesta!="") {
                      $this->sentencia_Sql="SELECT * FROM preguntas pre INNER JOIN 
                                        detalle_formulario_preguntas dtform on pre.IdPreguntas = 
                                        dtform.Fk_Id_Pregunta INNER JOIN formulario form ON 
                                        dtform.Fk_Id_Formulario = form.IdFormulario INNER 
                                        JOIN detalle_encuesta_formulario dtenc ON 
                                        dtenc.Fk_Id_Formulario_Encuesta = form.IdFormulario INNER 
                                        JOIN encuesta enc ON dtenc.Fk_Id_encuesta = 
                                        enc.IdEncuesta  and enc.IdEncuesta =
                                        ('$idEncuesta') ";
                                       // . "AND enc.Estado='Finalizada'";
                $this->ejecutar_consulta_sql();
                //$this->mensaje=count($this->filas); 
                //var_dump($this->filas);
                $filas = count($this->filas);
               
                if($filas>0){
                //    echo $filas;
                   return TRUE;
                }else{
               
                    $this->mensaje="No hay coincidencias para su busqueda";
                    //$this->mensaje=$filas;
                    return FALSE;
                }
                   
                
            }
        }
        public function getReporteForm($idFormulario=''){
            $this->filas=array();
            if ($idFormulario!="") {
                  $this->sentencia_Sql="SELECT * FROM preguntas pre "
                            . "INNER JOIN detalle_formulario_preguntas dfp "
                            . "ON dfp.Fk_Id_Pregunta=pre.IdPreguntas "
                            . "WHERE dfp.Fk_Id_Formulario = '$idFormulario' ";
                                        
                $this->ejecutar_consulta_sql();
                //$this->mensaje=count($this->filas); 
                //var_dump($this->filas);
                $filas = count($this->filas);
               
                if($filas>0){
                //    echo $filas;
                   return TRUE;
                }else{
               
                    $this->mensaje="No hay coincidencias para su busqueda";
                    //$this->mensaje=$filas;
                    return FALSE;
                }
                   
                
            }
        }
        public function obtenerReporteDetalleMuestra($idEncuesta){
            $this->sentencia_Sql="SELECT zn.IdZona,zn.NombreZona,"
                    . "zn.DirectorZona 'gerenteZona',"
                    . "SUM(dem.RangoUno) 'Uno',"
                    . "SUM(dem.RangoDos)'Dos',"
                    . "SUM(dem.RangoTres)'Tres',"
                    . "SUM(dem.RangoCuatro)'Cuatro', "
                    . "SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro) 'TotalMuestra', "
                    . "CONCAT( "
                    . " TRUNCATE( "
                    . "     (SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro))"
                    . "         *100/("
                    . "         SELECT CantidadMuestra FROM encuesta WHERE IdEncuesta='$idEncuesta') ,2) ) 'TotalPorcentaje' "
                    . " FROM zona zn "
                    . " INNER JOIN concesionario cns ON cns.Fk_Id_Zona=zn.IdZona "
                    . " INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                    . " AND dem.Fk_Id_Encuesta='$idEncuesta' "
                    . "GROUP BY zn.NombreZona";
            $this->ejecutar_consulta_sql();
        }
        public function obtenerTotalesReporteDetalleMuestra($idEncuesta){
             $this->sentencia_Sql="SELECT SUM(RangoUno) 'Uno',SUM(RangoDos) 'Dos',SUM(RangoTres) 'Tres',SUM(RangoCuatro) 'Cuatro',SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) 'totalEncuesta', CONCAT(TRUNCATE(( SUM(RangoUno+RangoDos+RangoTres+RangoCuatro)*100/SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) ),2)) 'totalPorcentajeEncuesta' FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta'";
            $this->ejecutar_consulta_sql();
        }
        
        public function obtenerReporteDetalleMuestraConcesionarios($idEncuesta,$idZona){
             if($idZona==0){
                  $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario,cns.Director,"
                                    . " SUM(dem.RangoUno) 'Uno',"
                                    . " SUM(dem.RangoDos)'Dos',"
                                    . " SUM(dem.RangoTres)'Tres',"
                                    . " SUM(dem.RangoCuatro)'Cuatro', "
                                     . " SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro) 'TotalMuestra', "
                                . " CONCAT( "
                                    . " TRUNCATE( "
                                        . " ( SUM(dem.RangoUno) + SUM(dem.RangoDos) + SUM(dem.RangoTres) + SUM(dem.RangoCuatro)"
                    . "                     )*100/("
                    . "                        SELECT CantidadMuestra "
                    . "                         FROM encuesta "
                    . "                         WHERE IdEncuesta='$idEncuesta') "
                    . "                    ,2) "
                    . "            ) 'TotalPorcentaje' "
                    . "                 FROM zona zn "
                    . "            INNER JOIN concesionario cns ON cns.Fk_Id_Zona=zn.IdZona "
                    . "            INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                    . "             AND dem.Fk_Id_Encuesta='$idEncuesta' "
                    . "            GROUP BY cns.NombreConcesionario";
             }else{
                  $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario,cns.Director,"
                                    . " SUM(dem.RangoUno) 'Uno',"
                                    . " SUM(dem.RangoDos)'Dos',"
                                    . " SUM(dem.RangoTres)'Tres',"
                                    . " SUM(dem.RangoCuatro)'Cuatro', "
                                     . " SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro) 'TotalMuestra', "
                                . " CONCAT( "
                                    . " TRUNCATE( "
                                        . " ( SUM(dem.RangoUno) + SUM(dem.RangoDos) + SUM(dem.RangoTres) + SUM(dem.RangoCuatro)"
                    . "                     )*100/("
                    . "                        SELECT CantidadMuestra "
                    . "                         FROM encuesta "
                    . "                         WHERE IdEncuesta='$idEncuesta') "
                    . "                    ,2) "
                    . "            ) 'TotalPorcentaje' "
                    . "                 FROM zona zn "
                    . "            INNER JOIN concesionario cns ON cns.Fk_Id_Zona=zn.IdZona "
                    . "            INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                    . "             AND dem.Fk_Id_Encuesta='$idEncuesta' "
                    . "             AND zn.IdZona='$idZona' "
                    . "            GROUP BY cns.NombreConcesionario";
             }
            $this->ejecutar_consulta_sql();
        }
        public function obtenerTotalesReporteDetalleMuestraConcesionario($idEncuesta,$idZona){
            if($idZona==0){
                $this->sentencia_Sql="SELECT SUM(RangoUno) 'Uno',SUM(RangoDos) 'Dos',SUM(RangoTres) 'Tres',SUM(RangoCuatro) 'Cuatro' ,SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) 'totalEncuesta',"
                        . " CONCAT( TRUNCATE(( SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) *100 / SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) ) ,2), '%')"
                         . " 'totalPorcentajeEncuesta' FROM detalle_encuesta_muestra dem "
                                    . "INNER JOIN concesionario cns "
                                    . "ON dem.Fk_Id_Concesionario = cns.IdConcesionario "
                                    . " WHERE dem.Fk_Id_Encuesta='$idEncuesta' ";   
            }else{
                $this->sentencia_Sql="SELECT SUM(RangoUno) 'Uno',SUM(RangoDos) 'Dos',SUM(RangoTres) 'Tres',SUM(RangoCuatro) 'Cuatro' ,"
                        . "SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) 'totalEncuesta', "
                        . "CONCAT( TRUNCATE(( SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) *100 / SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) ) ,2), '%') "
                        . "'totalPorcentajeEncuesta' FROM detalle_encuesta_muestra dem "
                        . "INNER JOIN concesionario cns "
                        . "ON dem.Fk_Id_Concesionario = cns.IdConcesionario "
                        . "WHERE dem.Fk_Id_Encuesta='$idEncuesta' "
                        . "AND cns.Fk_Id_Zona='$idZona'";   
            } 
            $this->ejecutar_consulta_sql();
        }
        public function obtenerReporteDetalleMuestraUnConcesionario($idEncuesta,$idZona){
              $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario,cns.Director,"
                                    . " SUM(dem.RangoUno) 'Uno',"
                                    . " SUM(dem.RangoDos)'Dos',"
                                    . " SUM(dem.RangoTres)'Tres',"
                                    . " SUM(dem.RangoCuatro)'Cuatro', "
                                     . " SUM(dem.RangoUno) + SUM(dem.RangoDos) + SUM(dem.RangoTres) + SUM(dem.RangoCuatro) 'TotalMuestra', "
                                . "CONCAT( "
                                    . "TRUNCATE( "
                                        . "( SUM(dem.RangoUno) + SUM(dem.RangoDos) + SUM(dem.RangoTres) + SUM(dem.RangoCuatro)"
                    . "                     )*100/("
                    . "                        SELECT CantidadMuestra "
                    . "                         FROM encuesta "
                    . "                         WHERE IdEncuesta='$idEncuesta') "
                    . "                    ,2) "
                    . "            ) 'TotalPorcentaje' "
                    . "                 FROM zona zn "
                    . "            INNER JOIN concesionario cns ON cns.Fk_Id_Zona=zn.IdZona "
                    . "            INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                    . "             AND dem.Fk_Id_Encuesta='$idEncuesta' "
                    . "             AND cns.IdConcesionario='$idZona' "
                    . "            GROUP BY cns.NombreConcesionario";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReporteRankZonas($idEnc,$idZona,$idPreg,$respuesta){
                 $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,mt.rango,zn.NombreZona,pre.pregunta,res.Respuesta,COUNT(res.Respuesta)  respuestas,
                    (  SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem
                        INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                        WHERE cns.Fk_Id_Zona='$idZona' 
                        AND dem.Fk_Id_Encuesta='$idEnc'
                    )  suma,
                    enc.CantidadMuestra,
                    CONCAT
                    (   TRUNCATE (count(res.Respuesta)*100/(SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem 
                            INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario
                            WHERE cns.Fk_Id_Zona='$idZona'
                            AND dem.Fk_Id_Encuesta='$idEnc')
                        ,2)
                    ) porcentaje,
                     CONCAT
                    (   TRUNCATE (
                        (SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra
 dem
                        INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 

                        WHERE cns.Fk_Id_Zona='$idZona' 
                        AND dem.Fk_Id_Encuesta='$idEnc')*100/(enc.CantidadMuestra)
                        ,2)
                    ) porcentajeTotal
                    
                   
                    FROM respuesta res INNER JOIN 
                    entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                    INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                    INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas
                    INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario =  cns.IdConcesionario AND cns.IdConcesionario = mt.Concesionario
                    INNER JOIN zona zn ON  cns.Fk_Id_Zona=zn.IdZona 
                    WHERE enc.IdEncuesta='$idEnc' 
                    AND pre.IdPreguntas='$idPreg'
                    AND res.Respuesta LIKE('$respuesta')
                    AND zn.IdZona='$idZona'
                        
                    GROUP BY mt.rango";
            $this->ejecutar_consulta_sql();
            //var_dump($this->filas);
        }
        public function encuestaReporteRankZonasAbiertas($idEnc,$idZona,$idPreg){
               $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,mt.rango,zn.NombreZona,pre.pregunta,res.Comentario,COUNT(res.Comentario)  respuestas,
                    (  SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem
                        INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                        WHERE cns.Fk_Id_Zona='$idZona' 
                        AND dem.Fk_Id_Encuesta='$idEnc'
                    )  suma,
                    enc.CantidadMuestra,
                    CONCAT
                    (   TRUNCATE (count(res.Comentario)*100/(
                            SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem 
                            INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario
                            WHERE cns.Fk_Id_Zona='$idZona'
                            AND dem.Fk_Id_Encuesta='$idEnc')
                        ,2)
                    ) porcentaje
                    FROM respuesta res INNER JOIN 
                    entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                    INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                    INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas
                    INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario =  cns.IdConcesionario AND cns.IdConcesionario = mt.Concesionario
                    INNER JOIN zona zn ON  cns.Fk_Id_Zona=zn.IdZona 
                    WHERE enc.IdEncuesta='$idEnc' 
                    AND pre.IdPreguntas='$idPreg'
                    
                    AND zn.IdZona='$idZona'
                        
                    GROUP BY mt.rango,res.Comentario";
            $this->ejecutar_consulta_sql();
            
        }
        
        public function encuestaReporteConcesionario($idEnc,$idZona,$idConc,$idPreg,$respuesta){
              $this->sentencia_Sql="SELECT mt.rango,pre.IdPreguntas,pre.Tipo,zn.NombreZona,cns.NombreConcesionario,res.Respuesta,
                COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Respuesta)*100/(
                SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                FROM detalle_encuesta_muestra dem 
                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                'porcentajeRango',
                (
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' 
                    AND cns.Fk_Id_Zona='$idZona' 
                    AND cns.IdConcesionario='$idConc'
                ) 'EncuestasPorConcesionario'
               FROM respuesta res 
               INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
               INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
               INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
               INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
               INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
               INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                AND cns.IdConcesionario = mt.Concesionario 
               INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
               WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'
                AND res.Respuesta LIKE('$respuesta') 
               GROUP BY cns.NombreConcesionario,mt.rango";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReporteConcesionarioAbierta($idEnc,$idZona,$idConc,$idPreg){
              $this->sentencia_Sql="SELECT mt.rango,pre.IdPreguntas,pre.Tipo,zn.NombreZona,cns.NombreConcesionario,res.Comentario,
                COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Comentario)*100/(
                SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                FROM detalle_encuesta_muestra dem 
                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                'porcentajeRango',
                (
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' 
                    AND cns.Fk_Id_Zona='$idZona' 
                    AND cns.IdConcesionario='$idConc'
                ) 'EncuestasPorConcesionario'
               FROM respuesta res 
               INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
               INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
               INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
               INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
               INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
               INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                AND cns.IdConcesionario = mt.Concesionario 
               INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
               WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'
                
               GROUP BY cns.NombreConcesionario,mt.rango,res.Comentario";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReporteConcesionarioSinRango($idEnc,$idZona,$idConc,$idPreg,$respuesta){
             $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,zn.NombreZona,cns.NombreConcesionario,res.Respuesta,
                COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Respuesta)*100/(
                SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                FROM detalle_encuesta_muestra dem 
                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                'porcentajeRango',
                (
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' 
                    AND cns.Fk_Id_Zona='$idZona' 
                    AND cns.IdConcesionario='$idConc'
                ) 'EncuestasPorConcesionario'
               FROM respuesta res 
               INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
               INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
               INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
               INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
               INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
               INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                AND cns.IdConcesionario = mt.Concesionario 
               INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
               WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'
                AND res.Respuesta LIKE('$respuesta') 
               GROUP BY cns.NombreConcesionario";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReporteConcesionarioSinRangoAbierto($idEnc,$idZona,$idConc,$idPreg){
             $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,zn.NombreZona,cns.NombreConcesionario,res.Comentario,
                COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Comentario)*100/(
                SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                FROM detalle_encuesta_muestra dem 
                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                'porcentajeRango',
                (
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' 
                    AND cns.Fk_Id_Zona='$idZona' 
                    AND cns.IdConcesionario='$idConc'
                ) 'EncuestasPorConcesionario'
               FROM respuesta res 
               INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
               INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
               INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
               INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
               INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
               INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                AND cns.IdConcesionario = mt.Concesionario 
               INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
               WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'
                
               GROUP BY cns.NombreConcesionario,res.Comentario";
            $this->ejecutar_consulta_sql();
        }/*
         public function encuestaReportePreguntaRango($idEnc,$idPreg,$respuesta){
              $this->sentencia_Sql="SELECT mt.rango,pre.IdPreguntas,pre.Tipo,pre.pregunta,res.Respuesta,COUNT(*) 'totalRango',
                                CONCAT(TRUNCATE (count(*)*100/(
                                    SELECT COUNT(*) FROM respuesta res INNER JOIN entrevista ent 
                                    ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                       WHERE ent.Fk_Id_Encuesta='$idEnc' "
                                   . " AND res.Fk_Id_Pregunta='$idPreg' 
                                        AND res.Respuesta LIKE('$respuesta') 
                                    ),2)) 'porcentajeRango' ,
                                (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "             AND res.Fk_Id_Pregunta='$idPreg' AND res.Respuesta LIKE('$respuesta')
                                    ) 'TotalRespuestas'
                                ,CONCAT(
                                  TRUNCATE (
                                      (SELECT COUNT(*) FROM respuesta res INNER JOIN entrevista ent 
                                      ON res.Fk_Id_Entrevista = ent.IdEntrevista INNER JOIN registros_muestra mt ON 
                                        ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "                 AND res.Fk_Id_Pregunta='$idPreg' "
                    . "                 AND res.Respuesta LIKE('$respuesta') )
                                      *100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' 
                                    AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'PorcentajeTotalEncuesta',
                                    (
                                     SELECT enc.Realizadas FROM encuesta enc WHERE enc.IdEncuesta='$idEnc'
                                   ) 'TotalEncuesta'

                                FROM respuesta res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                                INNER JOIN  encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                                INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
                                INNER JOIN detalle_encuesta_muestra dem ON  dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                                AND cns.IdConcesionario = mt.Concesionario 
                                INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona
                                WHERE enc.IdEncuesta='$idEnc' 
                                AND pre.IdPreguntas='$idPreg' 
                                AND res.Respuesta LIKE('$respuesta')
                                GROUP BY res.Respuesta,mt.rango";
            $this->ejecutar_consulta_sql();
          //  var_dump($this->filas);
        }*/
         public function encuestaReportePreguntaRango($idEncuesta,$idPregunta,$rango){
             $this->sentencia_Sql="SELECT mt.Rango,res.Fk_Respuesta_Pregunta 'IdPreguntas',pre.TipoPregunta,res.Fk_Respuesta_Pregunta,COUNT(res.Fk_Respuesta_Pregunta) 'TotalRespuesta',"
                     . "(SELECT SUM(RangoUno+RangoDos+RangoTres+RangoCuatro)  FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 'TotalEncuesta',
                            CONCAT(TRUNCATE((
                                COUNT(res.Fk_Respuesta_Pregunta)*100/(
                                    SELECT COUNT(*)FROM respuesta_usuario res INNER JOIN entrevista ent 
                                    ON res.Fk_Id_Entrevista=ent.IdEntrevista
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE mt.Rango ='$rango' AND res.Fk_Respuesta_Pregunta='$idPregunta' "
                                    . "AND ent.Fk_Id_Encuesta='$idEncuesta'
                                    ) 
                                ),2) ) 'PorcentajeRango',
                                (SELECT COUNT(*)FROM respuesta_usuario res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista=ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                WHERE mt.Rango ='$rango' 
                                AND res.Fk_Respuesta_Pregunta='$idPregunta' 
                                AND ent.Fk_Id_Encuesta='$idEncuesta') 'TotalRango'
                                FROM respuesta_usuario res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista=ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                INNER JOIN preguntas pre ON pre.IdPreguntas=res.Fk_Respuesta_Pregunta  
                                WHERE  mt.rango='$rango' AND res.Fk_Respuesta_Pregunta='$idPregunta' 
                                AND ent.Fk_Id_Encuesta='$idEncuesta'  'TotalRango'
                       GROUP BY res.Fk_Respuesta_Pregunta";
             $this->ejecutar_consulta_sql();


             /*$this->sentencia_Sql="SELECT mt.Rango,res.Fk_Id_Pregunta 'IdPreguntas',pre.Tipo,res.Respuesta,COUNT(res.Respuesta) 'TotalRespuesta',"
                     . "(SELECT SUM(RangoUno+RangoDos+RangoTres+RangoCuatro)  FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 'TotalEncuesta',
                            CONCAT(TRUNCATE((
                                COUNT(res.Respuesta)*100/(
                                    SELECT COUNT(*)FROM respuesta_usuario res INNER JOIN entrevista ent ON res.Fk_Id_Entrevista=ent.IdEntrevista
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE mt.Rango ='$rango' AND res.Fk_Respuesta_Pregunta='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'
                                    ) 
                                ),2) ) 'PorcentajeRango',
                                (SELECT COUNT(*)FROM respuesta_usuario res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista=ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                WHERE mt.Rango ='$rango' "
                                . "AND res.Fk_Id_Pregunta='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta') 'TotalRango'"
                     . "FROM respuesta_usuario res INNER JOIN entrevista ent ON res.Fk_Id_Entrevista=ent.IdEntrevista INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra INNER JOIN preguntas pre ON pre.IdPreguntas=res.Fk_Id_Pregunta   WHERE  mt.rango='$rango' AND res.Fk_Id_Pregunta='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'  'TotalRango'
                       GROUP BY res.Respuesta";*/
             
         }
         public function encuestaReportePreguntaRangoAbierta($idEncuesta,$idPregunta,$rango){
               $this->sentencia_Sql="SELECT mt.Rango,res.Fk_Id_Pregunta 'IdPreguntas',pre.Tipo,res.Comentario,COUNT(res.Comentario) 'TotalRespuesta',(SELECT SUM(RangoUno+RangoDos+RangoTres+RangoCuatro)  FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 'TotalRango',CONCAT(TRUNCATE((
                                COUNT(res.Respuesta)*100/(
                                    SELECT COUNT(*)FROM respuesta res INNER JOIN entrevista ent ON res.Fk_Id_Entrevista=ent.IdEntrevista INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra WHERE mt.Rango ='$rango' AND res.Fk_Id_Pregunta='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'

                                    ) 
                                ),2)  ) 'PorcentajeRango',(SELECT COUNT(*)FROM respuesta res INNER JOIN Entrevista ent ON res.Fk_Id_Entrevista=ent.IdEntrevista INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra WHERE mt.Rango ='$rango' AND res.Fk_Id_Pregunta='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta') 'TotalRango'
                                FROM respuesta res INNER JOIN Entrevista ent ON res.Fk_Id_Entrevista=ent.IdEntrevista INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra INNER JOIN preguntas pre ON pre.IdPreguntas=res.Fk_Id_Pregunta WHERE  mt.rango='$rango' AND res.Fk_Id_Pregunta='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'
                                GROUP BY res.Comentario";
             $this->ejecutar_consulta_sql();
         }
        
        
        
        
        /*
         * 
         * Estas  consultas dse van a descartar
        public function encuestaReportePreguntaRango($idEnc,$idPreg,$respuesta){
              $this->sentencia_Sql="SELECT mt.rango,pre.IdPreguntas,pre.Tipo,pre.pregunta,res.Respuesta,COUNT(*) 'totalRango',
                                CONCAT(TRUNCATE (count(*)*100/(
                                    SELECT COUNT(*) FROM respuesta res INNER JOIN entrevista ent 
                                    ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                       WHERE ent.Fk_Id_Encuesta='$idEnc' "
                                   . " AND res.Fk_Id_Pregunta='$idPreg' 
                                        AND res.Respuesta LIKE('$respuesta') 
                                    ),2)) 'porcentajeRango' ,
                                (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "             AND res.Fk_Id_Pregunta='$idPreg' AND res.Respuesta LIKE('$respuesta')
                                    ) 'TotalRespuestas'
                                ,CONCAT(
                                  TRUNCATE (
                                      (SELECT COUNT(*) FROM respuesta res INNER JOIN entrevista ent 
                                      ON res.Fk_Id_Entrevista = ent.IdEntrevista INNER JOIN registros_muestra mt ON 
                                        ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "                 AND res.Fk_Id_Pregunta='$idPreg' "
                    . "                 AND res.Respuesta LIKE('$respuesta') )
                                      *100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' 
                                    AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'PorcentajeTotalEncuesta',
                                    (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                                    . "AND res.Fk_Id_Pregunta='$idPreg' 
                                   ) 'TotalEncuesta'

                                FROM respuesta res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                                INNER JOIN  encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                                INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
                                INNER JOIN detalle_encuesta_muestra dem ON  dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                                AND cns.IdConcesionario = mt.Concesionario 
                                INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona
                                WHERE enc.IdEncuesta='$idEnc' 
                                AND pre.IdPreguntas='$idPreg' 
                                AND res.Respuesta LIKE('$respuesta')
                                GROUP BY res.Respuesta,mt.rango";
            $this->ejecutar_consulta_sql();
          //  var_dump($this->filas);
        }
        
        public function encuestaReportePreguntaRangoAbierta($idEnc,$idPreg,$respuesta=''){
                $this->sentencia_Sql="SELECT mt.rango,pre.IdPreguntas,pre.Tipo,pre.pregunta,res.Comentario,COUNT(*) 'totalRango',
                                CONCAT(TRUNCATE (count(*)*100/(
                                    SELECT COUNT(*) FROM respuesta resp INNER JOIN entrevista ent 
                                    ON resp.Fk_Id_Entrevista = ent.IdEntrevista 
                                       WHERE ent.Fk_Id_Encuesta='$idEnc' AND resp.Fk_Id_Pregunta='$idPreg'     
             
                                        AND res.Comentario=resp.Comentario GROUP BY resp.Comentario  
                                    ),2)) 'porcentajeRango' ,
                                (
                                    SELECT COUNT(*) FROM respuesta resp 
                                    INNER JOIN entrevista ent ON resp.Fk_Id_Entrevista = ent.IdEntrevista
 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc'  AND resp.Fk_Id_Pregunta='$idPreg' AND res.Comentario=resp.Comentario
                                        GROUP BY resp.Comentario 
                                    ) 'TotalRespuestas'
                                ,CONCAT(
                                  TRUNCATE (
                                      (SELECT COUNT(*) FROM respuesta resp INNER JOIN entrevista ent 

                                      ON resp.Fk_Id_Entrevista = ent.IdEntrevista INNER JOIN registros_muestra mt
 ON 
                                        ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEnc'                  AND res.Fk_Id_Pregunta
='19' AND res.Comentario=resp.Comentario GROUP BY resp.Comentario                    )
                                      *100/(
                                    SELECT COUNT(*) FROM respuesta resp 
                                    INNER JOIN entrevista ent ON resp.Fk_Id_Entrevista = ent.IdEntrevista
 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' 
                                    AND resp.Fk_Id_Pregunta='$idPreg'
                                    AND res.Comentario=resp.Comentario GROUP BY resp.Comentario       
                                    ),2)) 'PorcentajeTotalEncuesta',
                                    (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista
 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' AND res.Fk_Id_Pregunta='$idPreg' 
                                   ) 'TotalEncuesta'

                                FROM respuesta res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista
 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                                INNER JOIN  encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                                INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
                                INNER JOIN detalle_encuesta_muestra dem ON  dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                                AND cns.IdConcesionario = mt.Concesionario 
                                INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona
                                WHERE enc.IdEncuesta='$idEnc' 
                                AND pre.IdPreguntas='$idPreg'                                 
                                GROUP BY res.Comentario,mt.rango";
               //echo "**";
            $this->ejecutar_consulta_sql();
          //  var_dump($this->filas);
        }
        */
        
        public function encuestaReportePreguntaGeneral($idEnc,$idPreg,$respuesta,$idEncAnterior){
               $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,pre.pregunta,res.Respuesta,COUNT(*) 'totalRango',
                                CONCAT(TRUNCATE (count(*)*100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'porcentajeRango' ,
                                (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "             AND res.Fk_Id_Pregunta='$idPreg' AND res.Respuesta LIKE('$respuesta')
                                    ) 'TotalRespuestas'
                                ,CONCAT(
                                  TRUNCATE (
                                      (SELECT COUNT(*) FROM respuesta res INNER JOIN entrevista ent 
                                      ON res.Fk_Id_Entrevista = ent.IdEntrevista INNER JOIN registros_muestra mt ON 
                                        ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "                 AND res.Fk_Id_Pregunta='$idPreg' "
                    . "                 AND res.Respuesta LIKE('$respuesta') )
                                      *100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' 
                                    AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'PorcentajeTotalEncuesta',
                                    (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                                    . "AND res.Fk_Id_Pregunta='$idPreg' 
                                   ) 'TotalEncuesta',
                                CONCAT(
                                  TRUNCATE(
                                       (SELECT COUNT(*) FROM respuesta res 
                                        INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista
                                        INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEncAnterior' AND res.Fk_Id_Pregunta='$idPreg' 
                                            AND res.Respuesta LIKE('$respuesta'))
                                      *100/(SELECT COUNT(*) FROM respuesta res 
                                        INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista
                                        INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEncAnterior' AND res.Fk_Id_Pregunta='$idPreg'
                                          )
                                    
                                    ,2)
                                ) 'GeneralAnterior'
                                FROM respuesta res
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                                INNER JOIN  encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                                INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
                                INNER JOIN detalle_encuesta_muestra dem ON  dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                                AND cns.IdConcesionario = mt.Concesionario 
                                INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona
                                WHERE enc.IdEncuesta='$idEnc' 
                                AND pre.IdPreguntas='$idPreg' 
                                AND res.Respuesta LIKE('$respuesta')";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaGeneralAbierta($idEnc,$idPreg){
             $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,pre.pregunta,res.Comentario,COUNT(*) 'totalRango',
                                CONCAT(TRUNCATE (count(*)*100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'porcentajeRango' ,
                                (
                                    SELECT COUNT(*) FROM respuesta resp 
                                    INNER JOIN entrevista ent ON resp.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "             AND resp.Fk_Id_Pregunta='$idPreg'  AND resp.Comentario = res.Comentario
                                    ) 'TotalRespuestas'
                                ,CONCAT(
                                  TRUNCATE (
                                      (SELECT COUNT(*) FROM respuesta resp INNER JOIN entrevista ent 
                                      ON resp.Fk_Id_Entrevista = ent.IdEntrevista INNER JOIN registros_muestra mt ON 
                                        ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "                 AND res.Fk_Id_Pregunta='$idEnc' "
                    . "                 AND resp.Comentario = res.Comentario )
                                      *100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' 
                                    AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'PorcentajeTotalEncuesta',
                                    (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                                    . "AND res.Fk_Id_Pregunta='$idPreg' 
                                   ) 'Total Encuesta'

                                FROM respuesta res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                                INNER JOIN  encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                                INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
                                INNER JOIN detalle_encuesta_muestra dem ON  dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                                AND cns.IdConcesionario = mt.Concesionario 
                                INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona
                                WHERE enc.IdEncuesta='$idEnc' 
                                AND pre.IdPreguntas='$idPreg' "
                     . "GROUP BY  res.Comentario";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaGeneralAbiertaRes($idEnc,$idPreg){
             $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,pre.pregunta,res.Respuesta,COUNT(*) 'totalRango',
                                CONCAT(TRUNCATE (count(*)*100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'porcentajeRango' ,
                                (
                                    SELECT COUNT(*) FROM respuesta resp 
                                    INNER JOIN entrevista ent ON resp.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "             AND resp.Fk_Id_Pregunta='$idPreg'  AND  resp.Respuesta = res.Respuesta
                                    ) 'TotalRespuestas'
                                ,CONCAT(
                                  TRUNCATE (
                                      (SELECT COUNT(*) FROM respuesta resp INNER JOIN entrevista ent 
                                      ON resp.Fk_Id_Entrevista = ent.IdEntrevista INNER JOIN registros_muestra mt ON 
                                        ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "                 AND res.Fk_Id_Pregunta='$idEnc' "
                    . "                 AND  resp.Respuesta = res.Respuesta )
                                      *100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' 
                                    AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'PorcentajeTotalEncuesta',
                                    (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                                    . "AND res.Fk_Id_Pregunta='$idPreg' 
                                   ) 'Total Encuesta'

                                FROM respuesta res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                                INNER JOIN  encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                                INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
                                INNER JOIN detalle_encuesta_muestra dem ON  dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                                AND cns.IdConcesionario = mt.Concesionario 
                                INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona
                                WHERE enc.IdEncuesta='$idEnc' 
                                AND pre.IdPreguntas='$idPreg' "
                     . "GROUP BY res.Respuesta";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaConcesionario($idEnc,$idZona,$idConc,$idPreg,$respuesta){
           $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,zn.NombreZona,cns.NombreConcesionario,res.Respuesta,
                COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Respuesta)*100/(
                SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                FROM detalle_encuesta_muestra dem 
                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                'porcentajeRango',
                (
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' 
                    AND cns.Fk_Id_Zona='$idZona' 
                    AND cns.IdConcesionario='$idConc'
                ) 'EncuestasPorConcesionario'
               FROM respuesta res 
               INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
               INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
               INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
               INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
               INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
               INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                AND cns.IdConcesionario = mt.Concesionario 
               INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
               WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'
                AND res.Respuesta LIKE('$respuesta') 
               GROUP BY cns.NombreConcesionario";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaConcesionarioAbierta($idEnc,$idZona,$idConc,$idPreg){
               $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,zn.NombreZona,cns.NombreConcesionario,res.Comentario,
                    COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Comentario)*100/(
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                    'porcentajeRango',
                    (
                        SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                        FROM detalle_encuesta_muestra dem 
                        INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                        WHERE dem.Fk_Id_Encuesta='$idEnc' 
                        AND cns.Fk_Id_Zona='$idZona' 
                        AND cns.IdConcesionario='$idConc'
                    ) 'EncuestasPorConcesionario'
                   FROM respuesta res 
                   INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                   INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                   INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                   INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
                   INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
                   INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                    AND cns.IdConcesionario = mt.Concesionario 
                   INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
                   WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                    AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'

                   GROUP BY cns.NombreConcesionario,res.Comentario";
                $this->ejecutar_consulta_sql();
            }
        public function encuestaReportePreguntaZona($idEnc,$idZona,$idPreg,$respuesta){
            //echo $respuesta."--";
                 //if($respuesta=="Completamente Insatisfecho"){  
                     $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,zn.NombreZona,pre.pregunta,res.Respuesta,COUNT(res.Respuesta)  respuestas,
                        (  SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem
                            INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                            WHERE cns.Fk_Id_Zona='$idZona' 
                            AND dem.Fk_Id_Encuesta='$idEnc'
                        )  suma,
                        enc.CantidadMuestra,
                        CONCAT
                        (   TRUNCATE (count(res.Respuesta)*100/(SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario
                                WHERE cns.Fk_Id_Zona='$idZona'
                                AND dem.Fk_Id_Encuesta='$idEnc')
                            ,2)
                        ) porcentaje,
                         CONCAT
                        (   TRUNCATE (
                            (SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra
     dem
                            INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 

                            WHERE cns.Fk_Id_Zona='$idZona' 
                            AND dem.Fk_Id_Encuesta='$idEnc')*100/(enc.CantidadMuestra)
                            ,2)
                        ) porcentajeTotal



                        FROM respuesta res INNER JOIN 
                        entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                        INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                        INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                        INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas
                        INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta
                        INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario =  cns.IdConcesionario AND cns.IdConcesionario = mt.Concesionario
                        INNER JOIN zona zn ON  cns.Fk_Id_Zona=zn.IdZona 
                        WHERE enc.IdEncuesta='$idEnc' 
                        AND pre.IdPreguntas='$idPreg'
                        AND res.Respuesta LIKE('$respuesta')
                        AND zn.IdZona='$idZona' ";
                        $this->ejecutar_consulta_sql();
                 //}



              /*
                foreach ($this->filas as $key => $value) {
                    if(array_key_exists("Respuesta", $value)){
                       if($value["Respuesta"]==NULL && $value["Tipo"]!="Abierta"){
                           //echo $respuesta;
                           $value["Respuesta"]=$respuesta;

                           //echo $value["Respuesta"];
                       } //
                        //echo $value["Respuesta"];

                        //echo $value[$key];
                    }else{
                        //echo $value["Comentario"];
                    }
                }
                */

           //     var_dump($this->filas);
                //echo "--";
            }
        public function encuestaReportePreguntaZonaAbierta($idEnc,$idZona,$idPreg){
                  $this->sentencia_Sql="SELECT pre.IdPreguntas,pre.Tipo,zn.NombreZona,pre.pregunta,res.Comentario,COUNT(res.Comentario)  respuestas,
                        (  SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem
                            INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                            WHERE cns.Fk_Id_Zona='$idZona' 
                            AND dem.Fk_Id_Encuesta='$idEnc'
                        )  suma,
                        enc.CantidadMuestra,
                        CONCAT
                        (   TRUNCATE (count(res.Respuesta)*100/(SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario
                                WHERE cns.Fk_Id_Zona='$idZona'
                                AND dem.Fk_Id_Encuesta='$idEnc')
                            ,2)
                        ) porcentaje
                        FROM respuesta res INNER JOIN 
                        entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                        INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                        INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                        INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas
                        INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta
                        INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario =  cns.IdConcesionario AND cns.IdConcesionario = mt.Concesionario
                        INNER JOIN zona zn ON  cns.Fk_Id_Zona=zn.IdZona 
                        WHERE enc.IdEncuesta='$idEnc' 
                        AND pre.IdPreguntas='$idPreg'                    
                        AND zn.IdZona='$idZona'"
                        . "GROUP BY res.Comentario";
                $this->ejecutar_consulta_sql();
            }   
        function _construct() {
            
        }
        function _destruct(){
            unset($this);
        }
     
                
    }
    /*
     * Clase  que permite realizar empleados
     */
    class reporte extends ModeloBasedeDatos{
     
        public function set($nuevaEncuesta=array()){
            
        }
        function getAlls(){
           
        }
         function get(){
            
        }
        
        
         public function getReporte($idEncuesta=''){
            $this->filas=array();
            if ($idEncuesta!="") {
                  $this->sentencia_Sql="SELECT * FROM preguntas pre INNER JOIN 
                                        detalle_formulario_preguntas dtform on pre.IdPreguntas = 
                                        dtform.Fk_Id_Pregunta INNER JOIN formulario form ON 
                                        dtform.Fk_Id_Formulario = form.IdFormulario INNER 
                                        JOIN detalle_encuesta_formulario dtenc ON 
                                        dtenc.Fk_Id_Formulario = form.IdFormulario INNER 
                                        JOIN encuesta enc ON dtenc.Fk_Id_encuesta = 
                                        enc.IdEncuesta  and enc.IdEncuesta =
                                        ('$idEncuesta') "
                                        . "AND enc.Estado='Finalizada'";
                $this->ejecutar_consulta_sql();
                //$this->mensaje=count($this->filas); 
                //var_dump($this->filas);
                $filas = count($this->filas);
               
                if($filas>0){
                //    echo $filas;
                   return true;
                }else{
               
                    $this->mensaje="No hay coincidencias para su busqueda";
                    //$this->mensaje=$filas;
                    return false;
                }
                   
                
            }
        }
        public function getReporteForm($idFormulario=''){
            $this->filas=array();
            if ($idFormulario!="") {
                  $this->sentencia_Sql="SELECT * FROM preguntas pre "
                            . "INNER JOIN detalle_formulario_preguntas dfp "
                            . "ON dfp.Fk_Id_Pregunta=pre.IdPreguntas "
                            . "WHERE dfp.Fk_Id_Formulario = '$idFormulario' ";
                                        
                $this->ejecutar_consulta_sql();
                //$this->mensaje=count($this->filas); 
                //var_dump($this->filas);
                $filas = count($this->filas);
               
                if($filas>0){
                //    echo $filas;
                   return true;
                }else{
               
                    $this->mensaje="No hay coincidencias para su busqueda";
                    //$this->mensaje=$filas;
                    return false;
                }
                   
                
            }
        }
        public function obtenerReporteDetalleMuestra($idEncuesta,$idZona,$idConcesionario){
            if($idZona==0 && $idConcesionario==0){
                $this->sentencia_Sql="SELECT zn .IdZona,zn.NombreZona,"
                    . "zn.DirectorZona 'gerenteZona',"
                    . "SUM(dem.RangoUno) 'Uno',"
                    . "SUM(dem.RangoDos)'Dos',"
                    . "SUM(dem.RangoTres)'Tres',"
                    . "SUM(dem.RangoCuatro)'Cuatro', "
                    . "SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro) 'TotalMuestra', "
                    . "CONCAT( "
                    . " TRUNCATE( "
                    . "     (SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro))"
                    . "         *100/("
                    . "         SELECT CantidadMuestra FROM encuesta WHERE IdEncuesta='$idEncuesta') ,2) ) 'TotalPorcentaje' "
                    . " FROM zona zn "
                    . " INNER JOIN concesionario cns ON cns.Fk_Id_Zona=zn.IdZona "
                    . " INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                    . " AND dem.Fk_Id_Encuesta='$idEncuesta'  GROUP BY zn.IdZona";
            }else if($idZona != 0 && $idConcesionario==0){
                $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario,cns.Director,"
                    . "SUM(dem.RangoUno) 'Uno',"
                    . "SUM(dem.RangoDos)'Dos',"
                    . "SUM(dem.RangoTres)'Tres',"
                    . "SUM(dem.RangoCuatro)'Cuatro', "
                    . "SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro) 'TotalMuestra', "
                    . "CONCAT( "
                    . " TRUNCATE( "
                    . "     (SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro))"
                    . "         *100/("
                    . "         SELECT CantidadMuestra FROM encuesta WHERE IdEncuesta='$idEncuesta') ,2) ) 'TotalPorcentaje' "
                    . " FROM zona zn "
                    . " INNER JOIN concesionario cns ON cns.Fk_Id_Zona=zn.IdZona "
                    . " INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                    . " AND dem.Fk_Id_Encuesta='$idEncuesta' AND zn.IdZona='$idZona'"
                    . "GROUP BY cns.IdConcesionario";
            }else if($idZona != 0 && $idConcesionario!=0){
                $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario,cns.Director,"
                        . " SUM(dem.RangoUno) 'Uno', "
                        . " SUM(dem.RangoDos)'Dos', "
                        . " SUM(dem.RangoTres)'Tres', "
                        . " SUM(dem.RangoCuatro)'Cuatro', "
                        . " SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro) 'TotalMuestra',"
                        . " CONCAT( TRUNCATE( "
                        . "( SUM(dem.RangoUno) + SUM(dem.RangoDos) + SUM(dem.RangoTres) + SUM(dem.RangoCuatro) )"
                        . "   *100/( "
                        . "     SELECT CantidadMuestra FROM encuesta WHERE IdEncuesta='$idEncuesta') ,2) ) 'TotalPorcentaje' "
                        . "     FROM zona zn "
                        . "     INNER JOIN concesionario cns "
                        . "     ON cns.Fk_Id_Zona=zn.IdZona "
                        . "     INNER JOIN detalle_encuesta_muestra dem "
                        . "     ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                        . "     AND dem.Fk_Id_Encuesta='$idEncuesta' "
                        . "     AND cns.IdConcesionario='$idConcesionario' ";
                        
            }else if($idZona == 0 && $idConcesionario!=0){
                $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario,cns.Director,"
                        . " SUM(dem.RangoUno) 'Uno', "
                        . " SUM(dem.RangoDos)'Dos', "
                        . " SUM(dem.RangoTres)'Tres', "
                        . " SUM(dem.RangoCuatro)'Cuatro', "
                        . " SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro) 'TotalMuestra',"
                        . " CONCAT( TRUNCATE( "
                        . "( SUM(dem.RangoUno) + SUM(dem.RangoDos) + SUM(dem.RangoTres) + SUM(dem.RangoCuatro) )"
                        . "   *100/( "
                        . "     SELECT CantidadMuestra FROM encuesta WHERE IdEncuesta='$idEncuesta') ,2) ) 'TotalPorcentaje' "
                        . "     FROM zona zn "
                        . "     INNER JOIN concesionario cns "
                        . "     ON cns.Fk_Id_Zona=zn.IdZona "
                        . "     INNER JOIN detalle_encuesta_muestra dem "
                        . "     ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                        . "     AND dem.Fk_Id_Encuesta='$idEncuesta' "
                        . "     AND cns.IdConcesionario='$idConcesionario' ";
                        
            }
            
            //echo $this->sentencia_Sql;
            $this->ejecutar_consulta_sql();
        }
        public function obtenerReporteDetalleMuestraConce($idEncuesta,$idZona){
            $this->sentencia_Sql="SELECT cns.NombreConcesionario,cns.Director,"
                                    . " SUM(dem.RangoUno) 'Uno',"
                                    . "SUM(dem.RangoDos)'Dos',"
                                    . "SUM(dem.RangoTres)'Tres',"
                                    . "SUM(dem.RangoCuatro)'Cuatro', "
                                     . "SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro) 'TotalMuestra', "
                                . "CONCAT( "
                                    . "TRUNCATE( "
                                        . "(SUM(dem.RangoUno)+SUM(dem.RangoDos)+SUM(dem.RangoTres)+SUM(dem.RangoCuatro)"
                    . "                     )*100/("
                    . "                        SELECT CantidadMuestra "
                    . "                         FROM encuesta "
                    . "                         WHERE IdEncuesta='$idEncuesta') "
                    . "                    ,2) "
                    . "            ) 'TotalPorcentaje' "
                    . "                 FROM zona zn "
                    . "            INNER JOIN concesionario cns ON cns.Fk_Id_Zona=zn.IdZona "
                    . "            INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Concesionario=cns.IdConcesionario "
                    . "             AND dem.Fk_Id_Encuesta='$idEncuesta' "
                    . "             AND zn.IdZona='$idZona' "
                    . "            GROUP BY cns.NombreConcesionario";
            $this->ejecutar_consulta_sql();
        }
        
    public function encuestaReporteRankZonasRango($idEnc,$idZona,$idPreg,$respuesta,$rango){
             $this->sentencia_Sql="SELECT pre.IdPreguntas,mt.rango,zn.NombreZona,pre.pregunta,res.Respuesta,COUNT(res.Respuesta)  respuestas,
                    (  SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem
                        INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                        WHERE cns.Fk_Id_Zona='$idZona' 
                        AND dem.Fk_Id_Encuesta='$idEnc'
                    )  suma,
                    enc.CantidadMuestra,
                    CONCAT
                    (   TRUNCATE (count(res.Respuesta)*100/(SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem 
                            INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario
                            WHERE cns.Fk_Id_Zona='$idZona'
                            AND dem.Fk_Id_Encuesta='$idEnc')
                        ,2)
                    ) porcentaje
                    FROM respuesta res INNER JOIN 
                    entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                    INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                    INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas
                    INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario =  cns.IdConcesionario AND cns.IdConcesionario = mt.Concesionario
                    INNER JOIN zona zn ON  cns.Fk_Id_Zona=zn.IdZona 
                    WHERE enc.IdEncuesta='$idEnc' 
                    AND pre.IdPreguntas='$idPreg'
                    AND res.Respuesta LIKE('$respuesta')
                    AND zn.IdZona='$idZona'
                    AND mt.Rango='$rango'        
                    GROUP BY mt.rango";
            $this->ejecutar_consulta_sql();
           
        }
     public function encuestaReporteConcesionarioRango($idEnc,$idZona,$idConc,$idPreg,$respuesta,$rango){
             $this->sentencia_Sql="SELECT mt.rango,pre.IdPreguntas,zn.NombreZona,cns.NombreConcesionario,res.Respuesta,
                COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Respuesta)*100/(
                SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                FROM detalle_encuesta_muestra dem 
                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                'porcentajeRango',
                (
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' 
                    AND cns.Fk_Id_Zona='$idZona' 
                    AND cns.IdConcesionario='$idConc'
                ) 'EncuestasPorConcesionario'
               FROM respuesta res 
               INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
               INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
               INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
               INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
               INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
               INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                AND cns.IdConcesionario = mt.Concesionario 
               INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
               WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'
                AND res.Respuesta LIKE('$respuesta') 
                AND mt.Rango='$rango'
               GROUP BY cns.NombreConcesionario,mt.rango";
             
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReporteConcesionarioSinRango($idEnc,$idZona,$idConc,$idPreg,$respuesta){
             $this->sentencia_Sql="SELECT pre.IdPreguntas,zn.NombreZona,cns.NombreConcesionario,res.Respuesta,
                COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Respuesta)*100/(
                SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                FROM detalle_encuesta_muestra dem 
                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                'porcentajeRango',
                (
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' 
                    AND cns.Fk_Id_Zona='$idZona' 
                    AND cns.IdConcesionario='$idConc'
                ) 'EncuestasPorConcesionario'
               FROM respuesta res 
               INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
               INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
               INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
               INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
               INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
               INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                AND cns.IdConcesionario = mt.Concesionario 
               INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
               WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'
                AND res.Respuesta LIKE('$respuesta') 
               GROUP BY cns.NombreConcesionario";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaRango($idEnc,$idPreg,$respuesta,$rango){
             $this->sentencia_Sql="SELECT mt.rango,pre.IdPreguntas,pre.pregunta,res.Respuesta,COUNT(*) 'totalRango',
                                CONCAT(TRUNCATE (count(*)*100/(
                                    SELECT COUNT(*) FROM respuesta res INNER JOIN entrevista ent 
                                    ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                       WHERE ent.Fk_Id_Encuesta='$idEnc' AND res.Fk_Id_Pregunta='$idPreg'  "
                    . "                 AND res.Fk_Id_Pregunta='$idPreg' 
                                        AND res.Respuesta LIKE('$respuesta') 
                                    ),2)) 'porcentajeRango' ,
                                (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "             AND res.Fk_Id_Pregunta='$idPreg' AND res.Respuesta LIKE('$respuesta')
                                    ) 'TotalRespuestas'
                                ,CONCAT(
                                  TRUNCATE (
                                      (SELECT COUNT(*) FROM respuesta res INNER JOIN entrevista ent 
                                      ON res.Fk_Id_Entrevista = ent.IdEntrevista INNER JOIN registros_muestra mt ON 
                                        ent.Fk_Id_Muestra=mt.IdMuestra 
                                        WHERE ent.Fk_Id_Encuesta='$idEnc' "
                    . "                 AND res.Fk_Id_Pregunta='$idEnc' "
                    . "                 AND res.Respuesta LIKE('$respuesta') )
                                      *100/(
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' 
                                    AND res.Fk_Id_Pregunta='$idPreg'
                                    ),2)) 'PorcentajeTotalEncuesta',
                                    (
                                    SELECT COUNT(*) FROM respuesta res 
                                    INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra=mt.IdMuestra 
                                    WHERE ent.Fk_Id_Encuesta='$idEnc' "
                                    . "AND res.Fk_Id_Pregunta='$idPreg' 
                                   ) 'Total Encuesta'

                                FROM respuesta res 
                                INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                                INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                                INNER JOIN  encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                                INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
                                INNER JOIN detalle_encuesta_muestra dem ON  dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
                                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                                AND cns.IdConcesionario = mt.Concesionario 
                                INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona
                                WHERE enc.IdEncuesta='$idEnc' 
                                AND pre.IdPreguntas='$idPreg' 
                                AND res.Respuesta LIKE('$respuesta')
                                AND mt.Rango='$rango'
                                GROUP BY res.Respuesta,mt.rango";
            $this->ejecutar_consulta_sql();
          //  var_dump($this->filas);
        }
        public function encuestaReportePreguntaGeneral($idEncuesta,$idPregunta){
            $this->filas=array();
                  $this->sentencia_Sql="SELECT IdPreguntas,TipoPregunta,ArgumentoPregunta,Comentario,Fk_Respuesta_Pregunta,Respuesta,ComentarioUsuario,
                                    COUNT(Respuesta) 'Muestra',
                                    (SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                            FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 'TotalRealizadas',
                                    CONCAT(TRUNCATE(
                                           (COUNT(Respuesta)/(
                                           SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                                                 FROM detalle_encuesta_muestra dem 
                                                                 WHERE dem.Fk_Id_Encuesta='$idEncuesta'
                                                              )*100),2)) 'PorcentajeGeneral',
                                    rp.NivelOptimo  FROM respuesta_usuario ru 
                                    INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
                                    INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
                                    INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
                                    INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
                                    INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
                                    INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
                                    INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
                                    WHERE p.IdPreguntas='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'
                                    GROUP BY ru.Fk_Respuesta_Pregunta ORDER BY Muestra DESC";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaAbiertaGeneral($idEncuesta,$idPregunta){
            $this->filas=array();
                  $this->sentencia_Sql="SELECT IdPreguntas,TipoPregunta,ArgumentoPregunta,Comentario,Concesionario,NombreConcesionario,NombreZona,Fk_Respuesta_Pregunta,Respuesta,ComentarioUsuario,
                                    COUNT(Respuesta) 'Muestra',
                                    (SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                            FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 'TotalRealizadas',
                                    CONCAT(TRUNCATE(
                                           (COUNT(Respuesta)/(
                                           SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                                                 FROM detalle_encuesta_muestra dem 
                                                                 WHERE dem.Fk_Id_Encuesta='$idEncuesta'
                                                              )*100),2)) 'PorcentajeGeneral',
                                    rp.NivelOptimo  FROM respuesta_usuario ru 
                                    INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
                                    INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
                                    INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
                                    INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
                                    INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
                                    INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
                                    INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
                                    WHERE p.IdPreguntas='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'
                                    GROUP BY ru.ComentarioUsuario ORDER BY Muestra DESC";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaAbiertaCategoriaGeneral($idEncuesta,$idPregunta){
            $this->filas=array();
                  $this->sentencia_Sql="SELECT IdPreguntas,Concesionario,TipoPregunta,ArgumentoPregunta,Comentario,Concesionario,NombreConcesionario,Fk_Respuesta_Pregunta,Respuesta,ComentarioUsuario,
                                    COUNT(Respuesta) 'Muestra',
                                    (SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                            FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 'TotalRealizadas',
                                    CONCAT(TRUNCATE(
                                           (COUNT(Respuesta)/(
                                           SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                                                 FROM detalle_encuesta_muestra dem 
                                                                 WHERE dem.Fk_Id_Encuesta='$idEncuesta'
                                                              )*100),2)) 'PorcentajeGeneral',
                                    rp.NivelOptimo  FROM respuesta_usuario ru 
                                    INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
                                    INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
                                    INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
                                    INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
                                    INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
                                    INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
                                    INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
                                    WHERE p.IdPreguntas='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'
                                    GROUP BY ru.Fk_Respuesta_Pregunta,ru.ComentarioUsuario ORDER BY Muestra DESC";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaRankinGeneral($idEncuesta,$idPregunta){
            $this->filas=array();
                 $this->sentencia_Sql="SELECT IdPreguntas,TipoPregunta,ArgumentoPregunta,Comentario,Fk_Respuesta_Pregunta,Respuesta,ComentarioUsuario,
                                    COUNT(Respuesta) 'Muestra',
                                    (SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                            FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 'TotalRealizadas',
                                    TRUNCATE((SELECT COUNT(Respuesta) /( 
                                                                        SELECT 
                                                                                SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                                                         FROM detalle_encuesta_muestra dem 
                                                                         WHERE dem.Fk_Id_Encuesta='$idEncuesta') * 100 ),2)
                                                                             'PorcentajeGeneral',
                                    rp.NivelOptimo  FROM respuesta_usuario ru 
                                    INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
                                    INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
                                    INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
                                    INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
                                    INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
                                    INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
                                    INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
                                    WHERE p.IdPreguntas='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'
                                    GROUP BY ru.Fk_Respuesta_Pregunta,ru.ComentarioUsuario ORDER BY Fk_Respuesta_Pregunta DESC";
            $this->ejecutar_consulta_sql();
        }
        public function obtenerNumeroDeEncuestasRealizadasPorZona($idEncuesta,$idZona){
            $this->sentencia_Sql="SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 'Realizadas'"
                                 . "FROM detalle_encuesta_muestra dem "
                                  . "INNER JOIN concesionario c "
                                   . "ON dem.Fk_Id_Concesionario=c.IdConcesionario "
                                    . "WHERE dem.Fk_Id_Encuesta='$idEncuesta' AND c.Fk_Id_Zona='$idZona'";
            $this->ejecutar_consulta_sql();
        }
        public function obtenerNumeroDeEncuestasRealizadasPorConcesionario($idEncuesta,$idConcesionario){
            $this->sentencia_Sql="SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 'Realizadas'"
                                 . "FROM detalle_encuesta_muestra dem "
                                  . "INNER JOIN concesionario c "
                                   . "ON dem.Fk_Id_Concesionario=c.IdConcesionario "
                                    . "WHERE dem.Fk_Id_Encuesta='$idEncuesta' AND c.IdConcesionario='$idConcesionario'";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaGeneralRangos($idEncuesta,$idPregunta,$idZona){
            if($idZona==0){
                $this->sentencia_Sql="SELECT IdZona,NombreZona,rango,IdPreguntas,ArgumentoPregunta,Comentario,IdRespuestaPreguntas,Respuesta,ComentarioUsuario,COUNT(Respuesta) 'Muestra',"
                    . "(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) "
                    . "FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 
                        'TotalRealizadas',
                        CONCAT(TRUNCATE((COUNT(Respuesta)/
                        (SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro)
                        FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta')*100),2)) 'PorcentajeGeneral',rp.NivelOptimo  
                        FROM respuesta_usuario ru 
                            INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
                            INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
                            INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
                            INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
                            INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
                            INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
                            INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
                            WHERE p.IdPreguntas='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta'
                        GROUP BY z.IdZona,rm.rango,ru.Fk_Respuesta_Pregunta ORDER BY z.IdZona,rm.rango";
            
            }else{
                $this->sentencia_Sql="SELECT IdZona,NombreZona,rango,IdPreguntas,ArgumentoPregunta,Comentario,IdRespuestaPreguntas,Respuesta,ComentarioUsuario,COUNT(Respuesta) 'Muestra',"
                    . "(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) "
                    . "FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta') 
                        'TotalRealizadas',
                        CONCAT(TRUNCATE((COUNT(Respuesta)/
                        (SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro)
                        FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='$idEncuesta')*100),2)) 'PorcentajeGeneral',rp.NivelOptimo  
                        FROM respuesta_usuario ru 
                            INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
                            INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
                            INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
                            INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
                            INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
                            INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
                            INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
                            WHERE p.IdPreguntas='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta' AND z.IdZona='$idZona'
                        GROUP BY z.IdZona,rm.rango,ru.Fk_Respuesta_Pregunta ORDER BY z.IdZona,rm.rango";
            
            }
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaGeneralRangosConcesionario($idEncuesta,$idPregunta,$idZona,$idConcesionario){
            if($idConcesionario==0){
                $this->sentencia_Sql="SELECT IdZona,
                                        NombreZona,
                                        IdConcesionario,
                                        NombreConcesionario,
                                        rango,
                                        IdPreguntas,
                                        ArgumentoPregunta,
                                        Comentario,IdRespuestaPreguntas,Respuesta,ComentarioUsuario,
                                        COUNT(Respuesta) 'Muestra',
                                        (SELECT 
                                            SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                            FROM detalle_encuesta_muestra dem 
                                            INNER JOIN concesionario c ON dem.Fk_Id_Concesionario=c.IdConcesionario 
                                            WHERE dem.Fk_Id_Encuesta='$idEncuesta' AND c.Fk_Id_Zona='$idZona') 'TotalRealizadas', 
                                        CONCAT(
                                            TRUNCATE(
                                                        (
                                                            COUNT(Respuesta)/
                                                                (SELECT 
                                                                    SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                                                        FROM detalle_encuesta_muestra dem 
                                                                        INNER JOIN concesionario c ON dem.Fk_Id_Concesionario=c.IdConcesionario 
                                                                        WHERE dem.Fk_Id_Encuesta='$idEncuesta' AND c.Fk_Id_Zona='$idZona')*100),2))
                                                                     'PorcentajeGeneral',
                                         rp.NivelOptimo FROM respuesta_usuario ru 
                                    INNER JOIN entrevista ent ON ru.Fk_Id_Entrevista=ent.IdEntrevista     
                                    INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra     
                                    INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario 
                                    INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona     
                                    INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta     
                                    INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta 
                                    INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta 

                                WHERE p.IdPreguntas='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta' AND z.IdZona='$idZona'
                                GROUP BY c.IdConcesionario,rm.rango,ru.Fk_Respuesta_Pregunta 
                                ORDER BY c.IdConcesionario,rm.rango";
            
            }else{
                $this->sentencia_Sql="SELECT IdZona,
                                        NombreZona,
                                        IdConcesionario,
                                        NombreConcesionario,
                                        rango,
                                        IdPreguntas,
                                        ArgumentoPregunta,
                                        Comentario,IdRespuestaPreguntas,Respuesta,ComentarioUsuario,
                                        COUNT(Respuesta) 'Muestra',
                                        (SELECT 
                                            SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                            FROM detalle_encuesta_muestra dem 
                                            INNER JOIN concesionario c ON dem.Fk_Id_Concesionario=c.IdConcesionario 
                                            WHERE dem.Fk_Id_Encuesta='$idEncuesta' AND c.Fk_Id_Zona='$idZona' AND c.IdConcesionario='$idConcesionario') 'TotalRealizadas', 
                                        CONCAT(
                                            TRUNCATE(
                                                        (
                                                            COUNT(Respuesta)/
                                                                (SELECT 
                                                                    SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                                                                        FROM detalle_encuesta_muestra dem 
                                                                        INNER JOIN concesionario c ON dem.Fk_Id_Concesionario=c.IdConcesionario 
                                                                        WHERE dem.Fk_Id_Encuesta='$idEncuesta' AND c.Fk_Id_Zona='$idZona' AND c.IdConcesionario='$idConcesionario')*100),2))
                                                                     'PorcentajeGeneral',
                                         rp.NivelOptimo FROM respuesta_usuario ru 
                                    INNER JOIN entrevista ent ON ru.Fk_Id_Entrevista=ent.IdEntrevista     
                                    INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra     
                                    INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario 
                                    INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona     
                                    INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta     
                                    INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta 
                                    INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta 

                                WHERE p.IdPreguntas='$idPregunta' AND ent.Fk_Id_Encuesta='$idEncuesta' AND z.IdZona='$idZona' AND c.IdConcesionario='$idConcesionario'
                                GROUP BY c.IdConcesionario,rm.rango,ru.Fk_Respuesta_Pregunta 
                                ORDER BY c.IdConcesionario,rm.rango";
            
            }
            $this->ejecutar_consulta_sql();
        }
       
        
        public function encuestaReportePreguntaConcesionario($idEnc,$idZona,$idConc,$idPreg,$respuesta){
           $this->sentencia_Sql="SELECT pre.IdPreguntas,zn.NombreZona,cns.NombreConcesionario,res.Respuesta,
                COUNT(cns.NombreConcesionario) 'totalRango', CONCAT(TRUNCATE (count(res.Respuesta)*100/(
                SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                FROM detalle_encuesta_muestra dem 
                INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                WHERE dem.Fk_Id_Encuesta='$idEnc' AND cns.Fk_Id_Zona='$idZona' AND cns.IdConcesionario='$idConc'),2))
                'porcentajeRango',
                (
                    SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) 
                    FROM detalle_encuesta_muestra dem 
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                    WHERE dem.Fk_Id_Encuesta='$idEnc' 
                    AND cns.Fk_Id_Zona='$idZona' 
                    AND cns.IdConcesionario='$idConc'
                ) 'EncuestasPorConcesionario'
               FROM respuesta res 
               INNER JOIN entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
               INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
               INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
               INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas 
               INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta 
               INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario = cns.IdConcesionario 
                AND cns.IdConcesionario = mt.Concesionario 
               INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona 
               WHERE enc.IdEncuesta='$idEnc' AND pre.IdPreguntas='$idPreg' 
                AND zn.IdZona='$idZona' AND cns.IdConcesionario='$idConc'
                AND res.Respuesta LIKE('$respuesta') 
               GROUP BY cns.NombreConcesionario";
            $this->ejecutar_consulta_sql();
        }
        public function encuestaReportePreguntaZona($idEnc,$idZona,$idPreg,$respuesta){
            $this->sentencia_Sql="SELECT pre.IdPreguntas,zn.NombreZona,pre.pregunta,res.Respuesta,COUNT(res.Respuesta)  respuestas,
                    (  SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem
                        INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario 
                        WHERE cns.Fk_Id_Zona='$idZona' 
                        AND dem.Fk_Id_Encuesta='$idEnc'
                    )  suma,
                    enc.CantidadMuestra,
                    CONCAT
                    (   TRUNCATE (count(res.Respuesta)*100/(SELECT SUM(dem.RangoUno+dem.RangoDos+dem.RangoTres+dem.RangoCuatro) FROM detalle_encuesta_muestra dem 
                            INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario=cns.IdConcesionario
                            WHERE cns.Fk_Id_Zona='$idZona'
                            AND dem.Fk_Id_Encuesta='$idEnc')
                        ,2)
                    ) porcentaje
                    FROM respuesta res INNER JOIN 
                    entrevista ent ON res.Fk_Id_Entrevista = ent.IdEntrevista 
                    INNER JOIN registros_muestra mt ON ent.Fk_Id_Muestra = mt.IdMuestra 
                    INNER JOIN encuesta enc ON ent.Fk_Id_Encuesta= enc.IdEncuesta 
                    INNER JOIN preguntas pre ON res.Fk_Id_Pregunta = pre.IdPreguntas
                    INNER JOIN detalle_encuesta_muestra dem ON dem.Fk_Id_Encuesta = ent.Fk_Id_Encuesta
                    INNER JOIN concesionario cns ON dem.Fk_Id_Concesionario =  cns.IdConcesionario AND cns.IdConcesionario = mt.Concesionario
                    INNER JOIN zona zn ON  cns.Fk_Id_Zona=zn.IdZona 
                    WHERE enc.IdEncuesta='$idEnc' 
                    AND pre.IdPreguntas='$idPreg'
                    AND res.Respuesta LIKE('$respuesta')
                    AND zn.IdZona='$idZona'";
            $this->ejecutar_consulta_sql();
        }
    
        
    }
    /*
     * Clase que representa la entidad usuario
    */
    class usuario extends ModeloBasedeDatos {
    
        public $idUsuario;
        public $nombres;
        public $apellidos;
        public $cedula;
        public $email;
        public $estado;
        public $clave;
        public $preguntaSeguridad;
        public $respuestaSeguridad;
        public $ultimaActividad;
        public $mensaje;
        public $rol;
        public $registrar;
        public $consultar;
        public $actualizar;
        public $eliminar;
        public $encriptar;


        /*
         * Metodo para generar una clave aleatoria
         */
	private function generarClave(){
			
	     $arr=array(
			"a","b","c","d","e","f","h","i","j","k","l","m","n","o","p","q","r"."s","t","u","v","w","x","y","z",
			"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","W","X","Y","Z",
			"0","1","2","3","4","5","6","7","8","9","/","*","-","_","@","#","$","&"
		);
			//reodernacion del array aleatoriamente
		shuffle($arr);
		$clave="";
		//Recorro y concateno el array hasta su posicion numero 10  
		for($i=0;$i<10;$i++){
			$clave.=$arr[$i];
		}
	        return $clave;
	}
        
        /*
         * Metodo para cerrar sesion
         */
	function cerrarSesion($fecha,$idUsuario){
		
                $date = new DateTime($fecha);
                
                //Obtengo la fecha actual del sistema
		$this->ultimaActividad=$date->format('Y-m-d H:i:s');
		//Actualizo ña fecha de ultima actividada en el sistema
		 $this->sentencia_Sql="UPDATE usuario SET UltimaActividad='".$this->ultimaActividad."' WHERE IdUsuario ='".$idUsuario."'";
		if($this->ejecutar_sentencia_sql()){
	         	return TRUE;
		}else{
			return FALSE;
		}
	}
        /*
        * Metodo para logear un usuario
	* */
	function Ingresar($user='',$pass='',$fechaCliente){
		if($user != " " and $pass != " "){
		 //Obtengo el usuario
		 
	           if ($this->getLogin($user,$user)) {
                       //var_dump($this->filas);
		        $encriptar=new Encriptar();
                        
                        $clave=$encriptar->desencriptarHash($this->clave);
			$evaluar=$clave['salt'].strtolower($pass);					
			$resultado=$clave['longitud'].hash('sha1',$evaluar).$clave['salt'];
                        /*echo $resultado."--";
                        echo $this->clave;*/
		           if ($this->clave == $resultado) {
                               $date = new DateTime($fechaCliente);                                
		         	$this->ultimaActividad=$date->format('Y-m-d H:i:s');
                                 $this->sentencia_Sql="UPDATE usuario SET "
                                                      . "UltimaActividad='$this->ultimaActividad'   "
                                                      . "WHERE IdUsuario = '$this->idUsuario' ";
                                if($this->ejecutar_sentencia_sql()){
                                $this->mensaje="Bienvenido ".$this->nombres." !";
				return TRUE;
                           }else{
                               $this->mensaje="Hemos presentado con nuestro servidor le pedimos por favor se comunique con su administrador";
                               return FALSE;
                           }
			   }else{
				  $this->mensaje="Contraseña no coincide";
				  return FALSE;
			    }					
		   }else{
			$this->mensaje=$user." no esta registrado en nuestra base de datos";
		        return FALSE;
                   }	
		}else{
		  $this->mensaje="Hay campos vacios";
	          return FALSE;	
		}
	}
       	//Cambiar clave del usuario
	function cambioClave($cedula,$nuevaPass='',$fechaCliente){
		if($nuevaPass != " "){
	        	$this->get($cedula,$cedula);
                       // echo count($this->filas);
			if(count($this->filas) == 1){                                
                                 $date = new DateTime($fechaCliente);                                
		         	 $this->ultimaActividad=$date->format('Y-m-d H:i:s');
                                 $encriptar=new Encriptar();
				 $claveEncriptada=$encriptar->encriptarConSalt($nuevaPass);
                                         $this->sentencia_Sql="UPDATE usuario SET Clave = '$claveEncriptada', "
                                                      . "UltimaActividad='$this->ultimaActividad'   "
                                                      . "WHERE IdUsuario = '$this->idUsuario' ";
				if ($this->ejecutar_sentencia_sql()) {
					$this->mensaje="Clave actualizada con exito";
					return TRUE;
				}else{
					$this->mensaje="No hemos podido actualizar la clave intentelo nuevamente";
					return FALSE;
				}
			}
		}
	}
        
        //Metodo para buscar la pregunta de seguridad para un usuario
	function olvidoClave($email='',$cedula=''){
		if ($email != " ") {
			$this->get($email,$cedula);
                        //echo count($this->filas);
			if (count($this->filas) >= 1) {
				foreach ($this->filas as $value) {
					$this->pregunta=$value["PreguntaSeguridad"];						
				}
			}else{
				$this->pregunta=$email." no se encuentra registrado en nuestra base de datos";
			}
		}
	}
	//Metodo para validar la respuesta suministrada por el usuario para recuperar su clave 
	function validarRespuesta($respuesta = '',$idUser='',$fechaCiente){
           // echo $respuesta;
		if ($respuesta != " ") {
                 $this->get($idUser, $idUser);  
		//Encriptacion de la respuesta suministrada por el usuario para su validacion
                 $encri=new Encriptar();
		 $respEncript=$encri->desencriptarHash($this->respuesta);
		 $evaluar=$respEncript['salt'].strtolower($respuesta);
		 $resultado=$respEncript['longitud'].hash('sha1',$evaluar).$respEncript['salt'];
		 /*var_dump($resultado);
                 echo "!<br>";
                 var_dump($this->respuesta);
                */
			if($this->respuesta == $resultado){
				//Generar una clave aleatoria
				$nuevaClave =$this->generarClave();
				//Cambiar clave del usuario
				if ($this->cambioClave($nuevaClave,$nuevaClave,$fechaCiente)) {
				//Enviar email al usuario con su nueva clave
					if (mail($this->email, "Cambio de contraseña", "Su  nueva clave es ".$nuevaClave." por favor cambie esta clave por su seguridad")) {
					     $this->mensaje="Hemos enviado una nueva clave a su correo registrado ".$this->email." por favor cambie la clave la proxima vez que ingrese al sistema ";
									
					}else{
					     $this->mensaje="Hemos tenido problemas para enviar la nueva clave a su email registrado por favor cominiquese con su administrador ";
					}						
                                }else{
                                    $this->mensaje="Opps ha ocurrido un error al tratar de cambiar la contraseña por favor comunquese con su administrador";
                                }			 	
			}else{
				 $this->mensaje="Respuesta no coincide ";
				
			}
                }else{
                    $this->mensaje="suministre una respuesta";
                }
	}

        /**
	 *Metodo para insertar un usuario 
	 */		 
	function set($nuevoUsuario=array()){
		if (array_key_exists('nombres',$nuevoUsuario)
			and array_key_exists('email',$nuevoUsuario)
			and array_key_exists('clave', $nuevoUsuario)
			and array_key_exists('preguntaSeguridad', $nuevoUsuario)
			and array_key_exists('respuesta', $nuevoUsuario)
			) {
                              

	                  $this->get($nuevoUsuario["email"],$nuevoUsuario["cedula"]);
                          
			    if ($nuevoUsuario["email"] != $this->email and $nuevoUsuario["cedula"] != $this->cedula) {
				foreach ($nuevoUsuario as $key => $value) {
				    $$key=$value;
				}
				 //Encriptacion de la respuesta suminstrada por el usuario
                                 $encriptar=new Encriptar();
                                 $respuestaEncriptada=$encriptar->encriptarConSalt(strtolower($respuesta),'sha1'); 		
			         //$respuestaEncriptada=$this->encriptar->encriptarConSalt(strtolower($respuesta),'sha1');
				 //$claveEncriptada=$this->encriptar->encriptarConSalt(strtolower($clave),'sha1');
                                 
			        
                                
                                $encriptarDos=new Encriptar();
                                $claveEncriptada=$encriptarDos->encriptarConSalt(strtolower($clave),'sha1');
				//var_dump($this);
                                     $this->sentencia_Sql="INSERT INTO usuario(Nombre,Apellido,Cedula,Email,Clave,PreguntaSeguridad,Respuesta,UltimaActividad,Fk_Id_Rol) 
				                     VALUES('$nombres','$apellidos','$cedula','$email','$claveEncriptada','$preguntaSeguridad','$respuestaEncriptada','$ultimaActividad','$rol')";
					
					//Ejecuto sentencia
					if ($this->ejecutar_sentencia_sql()) {
                                            $this->mensaje=$nombres." se ha registrado correctamente";
                                            
					}else{
						$this->mensaje="No se pudo crear el usuario";
						return FALSE;
					}
				}else{
					$this->mensaje='El Usuario con C.C '.$nuevoUsuario["cedula"].'  ya existe';
				}
                        
		}  else {
                    $this->mensaje="array no cincide con la estructura solicitada para el registro ";
                }
        }
        /*
	 * Metodo para obtener un usuario
	 * */
	function get($emailUser='',$cedula=''){
		if ($emailUser!= " ") {
                     $this->sentencia_Sql="SELECT * FROM usuario WHERE Email LIKE ('$emailUser') or Cedula  = '$cedula' and EstadoUsuario = '1'";
			$this->ejecutar_consulta_sql();
			if (count($this->filas) == 1) {
					foreach ($this->filas as $value) {
						$this->nombres=$value["Nombre"];
                                                $this->apellidos=$value["Apellido"];
                                                $this->cedula=$value["Cedula"];
						$this->email=$value["Email"];
						$this->idUsuario=$value["IdUsuario"];
						$this->clave=$value["Clave"];
						$this->pregunta=$value["PreguntaSeguridad"];
						$this->respuesta=$value["Respuesta"];
						$this->ultimaActividad=$value["UltimaActividad"];
                                                $this->estado=$value["EstadoUsuario"];
					}
                        }else{
                            return false;
                        }
				
			}
	}
        
        function getId($id){
		if ($id!= " ") {
                     $this->sentencia_Sql="SELECT * FROM usuario WHERE IdUsuario='$id' and EstadoUsuario = '1'";
			$this->ejecutar_consulta_sql();
			if (count($this->filas) == 1) {
					foreach ($this->filas as $value) {
						$this->nombres=$value["Nombre"];
                                                $this->apellidos=$value["Apellido"];
                                                $this->cedula=$value["Cedula"];
						$this->email=$value["Email"];
						$this->idUsuario=$value["IdUsuario"];
						$this->clave=$value["Clave"];
						$this->pregunta=$value["PreguntaSeguridad"];
						$this->respuesta=$value["Respuesta"];
						$this->ultimaActividad=$value["UltimaActividad"];
                                                $this->estado=$value["EstadoUsuario"];
					}
                        }else{
                            return false;
                        }
				
			}
	}
        /*
         * Metodo para obtener un usuario
         * */
         function getLogin($emailUser='',$cedula=''){
            if ($emailUser!= " ") {
                     $this->sentencia_Sql="SELECT * FROM vw_usuarios usr WHERE usr.Cedula LIKE ('$cedula') OR usr.email LIKE ('$emailUser') OR usr.Nombre LIKE('$emailUser') AND usr.EstadoUsuario='1'"
                                            . " LIMIT 1";
                    $this->ejecutar_consulta_sql();
                    if (count($this->filas) == 1) {
                      
                         foreach ($this->filas as $value) {
                                            $this->nombres=$value["Nombre"];
                                            $this->apellidos=$value["Apellido"];
                                            $this->cedula=$value["Cedula"];
                                            $this->email=$value["Email"];
                                            $this->idUsuario=$value["IdUsuario"];
                                            $this->clave=$value["Clave"];
                                          //  $this->pregunta=$value["PreguntaSeguridad"];
                                            //$this->respuesta=$value["Respuesta"];
                                            $this->ultimaActividad=$value["UltimaActividad"];
                                            $this->estado=$value["EstadoUsuario"];
                                            $this->rol=$value["IdRol"];
                                          /*  $this->consultar=$value["consultar"];
                                            $this->registrar=$value["registrar"];
                                            $this->eliminar=$value["eliminar"];
                                            $this->actualizar=$value["editar"];*/
                                            /*Aqui  permisos*/
                                    }
                        return true;
                    }else{
                        return false;
                    }

                    }
    }
		
        /*
	 * Metodo para obtener varios usuarios
	 * */
	function getAlls(){
           $this->sentencia_Sql="SELECT * FROM usuario WHERE EstadoUsuario = '1' AND Fk_Id_Rol='4'";
	   $this->ejecutar_consulta_sql();
	}
        function obtenerTodosLosUsuarios(){
           $this->sentencia_Sql="SELECT * FROM usuario WHERE EstadoUsuario = '1' AND Fk_Id_Rol <> '5'";
	   $this->ejecutar_consulta_sql();
	}
        
        function obtenerUsuarioPorEncuesta($idEncuesta){
            $this->sentencia_Sql="SELECT usr.Nombre,usr.UltimaActividad,dem.AsignadasUsuario,dem.RealizadasUsuario "
                    . " FROM usuario usr "
                    . " INNER JOIN detalle_encuesta_usuario dem "
                    . " ON dem.Fk_Id_Usuario = usr.IdUsuario "
                    . " AND dem.Fk_Id_Encuesta='$idEncuesta'";
            
            $this->ejecutar_consulta_sql();
        }
        function obtenerUnUsuarioPorEncuesta($idEncuesta,$idUsuario){
            $this->sentencia_Sql="SELECT usr.Nombre,dem.AsignadasUsuario,dem.RealizadasUsuario "
                    . "FROM usuario usr "
                    . "INNER JOIN detalle_encuesta_usuario dem "
                    . "ON dem.Fk_Id_Usuario = usr.IdUsuario "
                    . "AND dem.Fk_Id_Encuesta='$idEncuesta' "
                    . "AND dem.Fk_Id_Usuario='$idUsuario' ";
            
            $this->ejecutar_consulta_sql();
        }
        function editarUsuario($nuevosDatos=  array()){
            foreach ($nuevosDatos as $key => $value) {
                $$key=$value;
            }
             $this->sentencia_Sql="UPDATE usuario SET nombre='$nombre' , Apellido='$apellido', Email='$email' WHERE IdUsuario='$idUsuario'";
            if($this->ejecutar_sentencia_sql()){
                return true;
            }else{
                return false;
            }
        }
        function eliminarUsuario($id){
            $this->sentencia_Sql="UPDATE usuario SET EstadoUsuario='0' WHERE IdUsuario='$id'";
            if($this->ejecutar_sentencia_sql()){
                return true;
            }else{
                return false;
            }
        }
        
        
        function asignarRol(){}
        function asignarPermisos(){}
        function cambiarPermiso(){}
        function cambiarRol(){}
        
        function _construct(){
            $this->encriptar=new Encriptar();
        }
        function _destruct(){
            unset($this);
        }
        
        
    }
    /*
     * Clase que representa la entidad roles
     */
    class roles extends ModeloBasedeDatos{
        public $idRol;
        public $nombreRol;
        public $descripcionRol;
        public $fechaRegistro;
        public $estado;
        public $mensaje;
        
        function get($nombreRol=''){
            if($nombreRol != ""){
                $this->sentencia_Sql="SELECT * FROM roles WHERE nombreRol LIKE ('$nombreRol') AND Estado = '1'";
                $this->ejecutar_consulta_sql();
                if(count($this->filas)==1){
                    foreach($this->filas as $valor){
                        $this->idRol=$valor["IdRol"];
                        $this->nombreRol=$valor["NombreRol"];
                        $this->descripcionRol=$valor["Descripcion"];
                        $this->fechaRegistro=$valor["FechaRegistro"];
                        $this->estado=$valor["Estado"];
                    }
                }
            }
        }
        function getAlls() {
            $this->sentencia_Sql="SELECT * FROM roles WHERE Estado = '1'";
            $this->ejecutar_consulta_sql();
        }
        
        function set($nuevoRol=array()){
            if(array_key_exists("nombreRol", $nuevoRol)
               and array_key_exists("descripcionRol", $nuevoRol)){
               $this->get($nuevoRol["nombreRol"]);
                if($nuevoRol["nombreRol"] != $this->nombreRol){
                    foreach ($nuevoRol as $key => $value) {
                        $$key=$value;
                    }
                    $this->sentencia_Sql="INSERT INTO roles (NombreRol,Descripcion,FechaRegistro)"
                            . "VALUES('$nombreRol','$descripcionRol','$fechaRegistro')";
                    if($this->ejecutar_sentencia_sql()){
                        $this->mensaje="Rol creado exitosamente";
                        return TRUE;
                    }else{
                        $this->mensaje="Error al crear el rol";
                        return FALSE;
                    }
                }
            }
        }
        
        function _construct(){}
        function _destruct(){
            unsert($this);
        }
    }
    /*
     * Clase que representa la entidad modulos
     */
    class modulos extends ModeloBasedeDatos{
        public $idModulo;
        public $nombreModulo;
        public  $descripcionModulo;
        public  $estado;
        public  $mensaje;
        function get($modulo=''){
            if($modulo != ''){
                $this->sentencia_Sql="SELECT * FROM modulos WHERE nombreModulo LIKE('$modulo') Estado = '1'";
                $this->ejecutar_consulta_sql();
                if(count($this->filas)==1){
                    foreach ($this->filas as $value){
                        $this->idModulo=$value["IdModulo"];
                        $this->nombreModulo=$value["NombreModulo"];
                        $this->descripcionModulo=$value["DesxcripcionModulo"];
                        $this->estado=$value["Estado"];
                    }
                }
            }
        }
        function getAlls(){
            $this->sentencia_Sql="SELECT * FROM modulos WHERE Estado = '1'";
            $this->ejecutar_consulta_sql();
        }
        function set($nuevoMudulo=array()){
            if(array_key_exists("nombreModulo", $nuevoMudulo) and array_key_exists("descripcionModulo", $nuevoMudulo) ){
                $this->get($nuevoMudulo["nombreModulo"]);
                if($this->nombreModulo!=$nuevoMudulo["nombreModulo"]){
                    foreach ($nuevoMudulo as $key => $value) {
                        $$key=$value;
                    }
                    $this->sentencia_Sql="INSERT INTO modulos(NombreModulo,DescripcionModulo,FechaRegistro)"
                            . "VALUES '$nombreModulo','$descripcionModulo','$fechaRegistro'";
                    if($this->ejecutar_sentencia_sql()){
                        $this->mensaje="Modulo creado satisfactoriamnete";
                        return TRUE;        
                    }else{
                        $this->mensaje="No hemos podido crear el modulo";
                        return FALSE;
                    }
                }
            }
        }
        function setPermisos($permisos=array()){
            if(array_key_exists("rol", $permisos) and
                    array_key_exists("modulo",$permisos)){
                foreach ($permisos as $key => $value) {
                    $$key=$value;
                }
                $this->sentencia_Sql="INSERT INTO detalle_roles_modulos (Fk_id_rol,Fk_id_modulo,consultar,registrar,editar,eliminar)"
                        . "VALUES('$rol','$modulo','$consultar','$registrar','$actualizar','$eliminar')";
                if($this->ejecutar_sentencia_sql()){
                    $this->mensaje="Permisos asignados con exito";
                }  else {
                    $this->mensaje="Fallo al insertar permisos";
                }
            }
            
        }
        function _construct(){}
        function _destruct(){
            unsert($this);
        }
    }
    /*
     * Clase que representa la entidad entrevista
     */
    class entrevista extends ModeloBasedeDatos{
        public $IdEntrevista;
        public $Fecha;
        public $objUsuario;
        public $objCLiente;
        public $objEncuesta;
        public $respuestas=array();
        public $estado;
        public $mensaje;
        
        public function __construct() {
            $objusuario=new usuario();
      
            $objEncuesta=new encuesta();
        }   
            
        function set($nuevoEntrevista=array()){
            //var_dump($nuevoEntrevista);
            
               if(array_key_exists("fk_id_encuesta", $nuevoEntrevista)){

                   foreach ($nuevoEntrevista as $key => $value) {
                       $$key=$value;
                   }
                  // var_dump($res);
                     $this->sentencia_Sql="INSERT INTO entrevista (Fecha,Fk_Id_Muestra,Fk_Id_Usuario,Fk_Id_Encuesta,Estado,Observaciones)"
                           . "VALUES('$fecha','$fk_id_cliente','$fk_id_usuario','$fk_id_encuesta','$estado','$observaciones')";
                     
                    if($this->ejecutar_sentencia_sql()){
            
                       $this->sentencia_Sql="SELECT MAX(IdEntrevista) as id FROM entrevista WHERE Estado='EF'";
                       $this->ejecutar_consulta_sql();
                       $Fk_Id_Entrevista=  $this->filas[0]["id"];    
                       $respuesta="";
                       $comentario="";
                       $arr=array();
                       //var_dump($res);
                       $accion=false;
                       foreach($res as $k=> $v){
                           switch($v->tipo){
                               case "Abiertas":
                                   if($v->respuesta!=""){
                                       $this->sentencia_Sql="INSERT INTO respuesta_usuario (Fk_Id_Entrevista,Fk_Respuesta_Pregunta,ComentarioUsuario)"
                                       . "VALUES('$Fk_Id_Entrevista','$v->respuesta','$v->comentario')";
                                        $accion=$this->ejecutar_sentencia_sql();
                                   }
                                   
                                   break;
                               case "AbiertaCategoria":
                                   if($v->comentario!="" && $v->respuesta!=""){
                                        $this->sentencia_Sql="INSERT INTO respuesta_usuario (Fk_Id_Entrevista,Fk_Respuesta_Pregunta,ComentarioUsuario)"
                                        . "VALUES('$Fk_Id_Entrevista','$v->comentario','$v->respuesta')";
                                        $accion=$this->ejecutar_sentencia_sql();
                                   }
                                   break;
                               case "Cerrada":
                                   if($v->respuesta!=""){
                                        $this->sentencia_Sql="INSERT INTO respuesta_usuario (Fk_Id_Entrevista,Fk_Respuesta_Pregunta)"
                                           . "VALUES('$Fk_Id_Entrevista','$v->respuesta')";
                                       $accion=$this->ejecutar_sentencia_sql();
                                   }   
                                   break;
                               case "CerradaComentario":
                                   if($v->respuesta!="" && $v->comentario!=""){
                                       $this->sentencia_Sql="INSERT INTO respuesta_usuario (Fk_Id_Entrevista,Fk_Respuesta_Pregunta,ComentarioUsuario)"
                                       . "VALUES('$Fk_Id_Entrevista','$v->respuesta','$v->comentario')";
                                       $accion=$this->ejecutar_sentencia_sql();
                                   }
                                    
                                   break;
                               case "CerradaMultiple":
                                   //var_dump($v->respuesta);
                                   
                                       
                                   
                                   foreach ($v->respuesta as $re) {
                                        if($re->r!=""){
                                            $this->sentencia_Sql="INSERT INTO respuesta_usuario (Fk_Id_Entrevista,Fk_Respuesta_Pregunta)"
                                           . "VALUES('$Fk_Id_Entrevista','$re->r')";
                                            $accion=$this->ejecutar_sentencia_sql();
                                        }
                                   }
                                    
                                   break;
                               case "Rankin":
                                   
                                   foreach ($v->respuesta as $re) {
                                        if($re->r!=""){
                                            $this->sentencia_Sql="SELECT fun_insertar_respuesta_usuario('$Fk_Id_Entrevista','$re->r','$re->p') as respuestas ";
                                            if($this->ejecutar_function_sql()){
                                               $accion=TRUE; 
                                            }else{
                                                $accion=TRUE;
                                            }
                                        }
                                   }
                                    
                                   
                                   break;
                                   
                           }
                           
                           
                           //var_dump($accion);
                           if(!$accion){
                               //echo "**".$this->sentencia_Sql."**";
                           }else{
                               //echo "--".$this->sentencia_Sql."--";
                           }
                       }
                       
                       return $accion;
                    }else{
                        $this->mensaje="Ha ocurrido un error en nuestro servidor Base de datos";
                        return FALSE;
                       
                    }
           }
   }
        //
        
        function setDescartada($nuevoEntrevista=array()){
                if(array_key_exists("fk_id_encuesta", $nuevoEntrevista)){

                   foreach ($nuevoEntrevista as $key => $value) {
                       $$key=$value;
                   }
                  // var_dump($res);
                     $this->sentencia_Sql="INSERT  INTO entrevista (Fecha,Fk_Id_Muestra,Fk_Id_Usuario,Fk_Id_Encuesta,Estado,Observaciones)"
                           . "VALUES('$fecha','$fk_id_cliente','$fk_id_usuario','$fk_id_encuesta','$estado','$observaciones')";

                    if($this->ejecutar_sentencia_sql()){
                     return TRUE;
                        
                    }else{
                        return FALSE;
                    }
            }
        }
        //                       
        function get(){}       
        function getAlls(){}
        function obtenerRegistradas($idUser,$rango){
            $this->sentencia_Sql="SELECT RealizadasRango".$rango." FROM detalle_encuesta_usuario dem WHERE dem.Fk_Id_Usuario = '$idUser'";
            $this->ejecutar_consulta_sql();
        }
        function actualizarRealizadasUsuario($cadena=array()){
            foreach ($cadena as $key => $value) {
                $$key=$value;
            }
                   $this->sentencia_Sql="UPDATE detalle_encuesta_usuario SET RealizadasRango".$rango."= RealizadasRango".$rango." + 1 ,RealizadasUsuario=RealizadasUsuario+1"
                    . " WHERE Fk_Id_Encuesta='$idEncuesta' AND Fk_Id_Usuario =". $idUsuario; 
            
            if($this->ejecutar_sentencia_sql()){
                return TRUE;
              }else{
                return FALSE;
                
            }
        }
    }
     /*
     * Clase que representa la entidad muestra
     */  
    class muestra extends ModeloBasedeDatos{
        public  $idMuestra;
        public  $mensaje;
                
        function setDescartada($cadena=""){
              $this->sentencia_Sql="INSERT INTO muestra (Nombre,Apellido,Parentesco,Celular,Contrato,Cupo,Concesionario,CuotasPagas,rango,Fk_Id_descripcion_muestra) VALUES($cadena)";
                 if($this->ejecutar_sentencia_sql()){
                     $this->mensaje="Muestra insertada con exito";
                    return true;
                    
                 }else{
                     $this->mensaje="Fallo al registrara registro";   
                //    echo $this->mensaje=$this->sentencia_Sql;
                     return false;
                 }
         }
        function obtenerUnaMuestra($idMuestra=''){
            $this->sentencia_Sql="SELECT * FROM registros_muestra mt INNER JOIN concesionario cn ON mt.Concesionario=cn.IdConcesionario WHERE Fk_Id_descripcion_muestra='$idMuestra'";
            $this->ejecutar_consulta_sql();
        }
        function set($cadena=""){
              $this->sentencia_Sql="INSERT INTO registros_muestra  (Nombre,TelUno,TelDos,CelUno,CelDos,CelTres,Cupo,Contrato,Ciudad,Concesionario,CodVendedor,CodAsesor,Asesor,CuotasPagas,CuotasMora,CuotasSeleccion,rango,Fk_Id_descripcion_muestra)"
                                            . "VALUES($cadena)";
           // echo "<br>";
                 if($this->ejecutar_sentencia_sql()){
                     $this->mensaje="Muestra insertada con exito";
                    return true;
                    
                 }else{
                     $this->mensaje="Fallo al registrar registro";   
                //    echo $this->mensaje=$this->sentencia_Sql;
                     return false;
                 }
         }
        function setActualizarMuestra($cadena=array()){
            foreach ($cadena as $key => $value) {
                $$key=$value;
            }
            
               $this->sentencia_Sql="UPDATE registros_muestra SET EstadoMuestra = '$estado',Parentesco='$Parentesco' WHERE IdMuestra=".$idMuestra;
                 
                 if($this->ejecutar_sentencia_sql()){
                     $this->mensaje="Muestra actualizada con exito";
                    return true;
                    
                 }else{
                     $this->mensaje="Fallo al actualizar registro";   
                     return false;
                 }
        }
         
        function setDescripcionMuestra($nombre,$fecha){
              $this->sentencia_Sql="INSERT INTO muestra (NombreMuestra,FechaSubida)"
                 . "VALUES('$nombre','$fecha')";
                 if($this->ejecutar_sentencia_sql()){
                     $this->mensaje="Muestra insertada con exito";
                    return true; 
                    
                 }else{
                     $this->mensaje="Fallo al registrara registro";   
                     return false;
                 }
        }
        function eliminarDescripcionMuestra($idMuestra){
               $this->sentencia_Sql="DELETE FROM muestra WHERE IdDescripcionMuestra = '$idMuestra' AND Estado = 'En espera'";
                if($this->ejecutar_sentencia_sql()){
                    return $this->filasAfectadas;
                }else{
                    return false;
                }
        }
        function asociarEncuestaAunaMuestra($idMuestra,$idEncuesta){
                $this->sentencia_Sql="UPDATE muestra SET Fk_Id_Encuesta ='$idEncuesta',Estado='Proceso' WHERE IdDescripcionMuestra='$idMuestra' ";
            if($this->ejecutar_sentencia_sql()){
                return true;
            }else{
                return false;
            }
        }
                
        function ultimoRegistroMuestra() {
             $this->sentencia_Sql="SELECT MAX(IdDescripcionMuestra) as id FROM muestra";
            
            return $this->ultimoRegistro();
            
        }
        function get($idMuestra=''){
            $this->sentencia_Sql="SELECT * FROM muestra WHERE IdMuestra = '$idMuestra'";
            $this->ejecutar_consulta_sql();
        }
	function getAlls(){
             $this->sentencia_Sql="SELECT * FROM muestra";  
             $this->ejecutar_consulta_sql();
        }
        function obtenerMuestrasSinEncuesta(){
            $this->sentencia_Sql="SELECT * FROM muestra dem WHERE dem.estado='En espera' ORDER BY dem.IdDescripcionMuestra DESC ";
                $this->ejecutar_consulta_sql();
            
        }
        function obtenerMuestrasAsociadasEncuesta($idEncuesta=''){
            //$this->sentencia_Sql="SELECT * FROM muestra WHERE Fk_Id_Encuesta  ='$idEncuesta'";
            $this->sentencia_Sql="SELECT dm.IdDescripcionMuestra,dm.NombreMuestra,COUNT(dm.IdDescripcionMuestra) 'registros' FROM muestra dm INNER JOIN registros_muestra mt ON  dm.Fk_Id_Encuesta ='$idEncuesta' GROUP BY dm.IdDescripcionMuestra";
             //echo $this->sentencia_Sql="SELECT dm.IdDescripcionMuestra,dm.NombreMuestra,COUNT(dm.IdDescripcionMuestra) 'registros' FROM muestra dm INNER JOIN registros_muestra mt ON mt.Fk_Id_descripcion_muestra = dm.IdDescripcionMuestra AND dm.Fk_Id_Encuesta ='$idEncuesta' GROUP BY dm.IdDescripcionMuestra";
            $this->ejecutar_consulta_sql();
            
        }
        /*
         * Funcion para actualizar la cantidad de registros aceptados en la tabla muestra
         */
        function actualizarCantidadMuestra($idMuestra,$numeroDeRegistros){
            $n=(int)$numeroDeRegistros;
            $this->sentencia_Sql="UPDATE muestra SET registros = registros + ".$n." WHERE IdDescripcionMuestra ='$idMuestra'";
            if($this->ejecutar_sentencia_sql()){
              return true;  
            }else{
                return false;
            }
                   
        }
        
        /*metodo para consultar todos los rangos
         */
        function obtenerValorRangos(){
            $this->sentencia_Sql="SELECT * FROM rangos";
            $this->ejecutar_consulta_sql();
        }
        /*Metodo para consultar el rango asignado a un formulario */
        function obtenerValorRangosEncuesta($idEncuesta){
                  $this->sentencia_Sql="SELECT * FROM formulario form "
                    . "INNER JOIN rangos rg "
                        . "ON rg.IdRango=form.Fk_Id_Rango "
                    . "INNER JOIN detalle_encuesta_formulario def "
                        . "ON def.Fk_Id_Formulario_Encuesta=form.IdFormulario "
                      //. "AND form.IdFormulario='$idform' LIMIT 1";
                        . "AND def.Fk_Id_Encuesta='$idEncuesta' LIMIT 1";
            $this->ejecutar_consulta_sql();
        }
        /**
         * Metodo para consultar la tabla muestra para obtener cuantos registros hay 
         * disponibles para una Base de datos asociada a una encuesta 
         */
        function obtenerCantidadMuestra($idEncuesta,$idMuestra,$concesionario,$rUno,$rDos){
             $uno=$rUno;
            
              $this->sentencia_Sql="SELECT mt.Concesionario,COUNT(mt.IdMuestra) 'registros' FROM registros_muestra mt "
                                . "INNER JOIN muestra dm "
                                    . "ON dm.IdDescripcionMuestra = mt.Fk_Id_descripcion_muestra "
                                    . "AND dm.Fk_Id_Encuesta ='$idEncuesta' "
                                    . "AND mt.CuotasSeleccion >= '$uno' "
                                    . "AND mt.CuotasSeleccion <= '$rDos' "
                                    . "AND dm.IdDescripcionMuestra='$idMuestra' "
                                    . "AND mt.Concesionario='$concesionario'";
            $this->ejecutar_consulta_sql();
        }
        /*Metodo para consultar la tabla muestra para consultar cueantos registros hay disponibles para una zona determinada*/
        function obtenerCantidadMuestraZona($idEncuesta,$idMuestra,$idZona){
            
            if($idZona!="T"){
                 $this->sentencia_Sql="SELECT zn.NombreZona,COUNT(mt.IdMuestra) 'registros' FROM registros_muestra mt "
                                        . "INNER JOIN muestra dm "
                                            . "ON dm.IdDescripcionMuestra = mt.Fk_Id_descripcion_muestra "
                                        . "INNER JOIN concesionario cns "
                                            . "ON cns.IdConcesionario = mt.Concesionario "
                                        . "INNER JOIN zona zn "
                                              . "ON cns.Fk_Id_Zona=zn.IdZona "
                                              . "AND dm.Fk_Id_Encuesta ='$idEncuesta' "
                                              . "AND dm.IdDescripcionMuestra='$idMuestra' "
                                              . "AND zn.IdZona='$idZona'";   
            }else{
                  $this->sentencia_Sql="SELECT COUNT(mt.IdMuestra) 'registros' FROM registros_muestra mt "
                          . "INNER JOIN muestra dm "
                                . "ON dm.IdDescripcionMuestra = mt.Fk_Id_descripcion_muestra "
                          . "INNER JOIN concesionario cns "
                                . "ON cns.IdConcesionario = mt.Concesionario "
                          . "INNER JOIN zona zn "
                            . "ON cns.Fk_Id_Zona=zn.IdZona "
                            . "AND dm.Fk_Id_Encuesta ='$idEncuesta' "
                            . "AND dm.IdDescripcionMuestra='$idMuestra'";
            }
            
              
            $this->ejecutar_consulta_sql();
        }
        /*Metodo que consulta la tabla detalle_encuesta_muestra */
        function obtenerAsignadas($idEncuesta,$idMuesta){
            $this->sentencia_Sql="SELECT SUM(rangoUno) 'rangoUno', "
                     . "SUM(rangoDos) 'rangoDos' , "
                     . "SUM(rangoTres) 'rangoTres', "
                     . "SUM(rangoCuatro)'rangoCuatro', "
                     . "SUM(rangoUno+rangoDos+rangoTres+rangoCuatro) 'TotalAsignadas' "
                     . "FROM detalle_encuesta_muestra dem "
                     . "WHERE dem.Fk_Id_Encuesta = '$idEncuesta' AND dem.Fk_Id_Muestra='$idMuesta'";
            $this->ejecutar_consulta_sql();
        }
        /*Metodo que consulta la tabla detalle_encuesta_muestra */
        function obtenerAsignadasConcesionario($idEncuesta,$idMuesta,$idConcesionario){
            $this->sentencia_Sql="SELECT SUM(rangoUno) 'rangoUno', "
                     . "SUM(rangoDos) 'rangoDos' , "
                     . "SUM(rangoTres) 'rangoTres', "
                     . "SUM(rangoCuatro)'rangoCuatro', "
                     . "SUM(rangoUno+rangoDos+rangoTres+rangoCuatro) 'TotalAsignadas' "
                     . "FROM detalle_encuesta_muestra dem "
                     . "WHERE dem.Fk_Id_Encuesta = '$idEncuesta' AND dem.Fk_Id_Muestra='$idMuesta'  AND dem.Fk_Id_Concesionario='$idConcesionario'";
            $this->ejecutar_consulta_sql();
        }
        /*Funcion que consulta  la tabla detalle_encuesta_muestra para obtener las encuestas asignadas a un usuario 
         * en una encuesta determinada*/
        function obtenerRangos($idEncuesta,$idUsuario,$limit=0,$idConcesionario){
             
             if($limit==1){
                 $this->sentencia_Sql="SELECT * FROM detalle_encuesta_muestra dem "
                      . "INNER JOIN detalle_encuesta_usuario deu ON deu.Fk_Id_Usuario = dem.Fk_Id_Usuario "
                      . "INNER JOIN detalle_encuesta_formulario def ON def.Fk_Id_encuesta = deu.Fk_Id_Encuesta "
                      . "INNER JOIN formulario form ON form.IdFormulario=def.Fk_Id_Formulario_Encuesta "
                      . "INNER JOIN rangos rng ON form.Fk_Id_Rango= rng.IdRango "
                      . "WHERE dem.Fk_Id_Encuesta='$idEncuesta' "
                      . "AND deu.Fk_Id_Encuesta='$idEncuesta' "
                      . "AND dem.Fk_Id_Usuario='$idUsuario' "
                      . "AND dem.Fk_Id_Concesionario='$idConcesionario'"
                      . "AND dem.Estado ='en espera' "
                      . "LIMIT 1";  
             }else{
              $this->sentencia_Sql="SELECT * FROM detalle_encuesta_muestra dem "
                      . "INNER JOIN detalle_encuesta_usuario deu ON deu.Fk_Id_Usuario = dem.Fk_Id_Usuario "
                      . "INNER JOIN detalle_encuesta_formulario def ON def.Fk_Id_encuesta = deu.Fk_Id_Encuesta "
                      . "INNER JOIN formulario form ON form.IdFormulario=def.Fk_Id_Formulario_Encuesta "
                      . "INNER JOIN rangos rng ON form.Fk_Id_Rango= rng.IdRango "
                      . "WHERE dem.Fk_Id_Encuesta='$idEncuesta' "
                      . "AND deu.Fk_Id_Encuesta='$idEncuesta' "
                      . "AND dem.Fk_Id_Usuario='$idUsuario' "
                      . "AND dem.Estado ='en espera' ";
                      //. "LIMIT 1";  
            
             }
            $this->ejecutar_consulta_sql();
        }
        
        /*
         * Metodo que consulta la tabla muestra para obtener una muestra que posea las caracteristicas necesarias para ser entrevistada
         */
        function seleccionarMuestraEntrevistaRango($idUsuario,$idConcesionario,$valUno,$valDos,$celda,$estado,$idEncuesta){
            $uno=$valUno-1;
            $this->filas=array();
            //echo "-".$estado."-";
                   //$this->sentencia_Sql="";
                   $this->sentencia_Sql="SELECT * FROM registros_muestra  mt"
                                    . " INNER JOIN detalle_encuesta_muestra dem"
                                    . " ON mt.Fk_Id_descripcion_muestra=dem.Fk_Id_Muestra"
                                    . " INNER JOIN concesionario cns ON cns.IdConcesionario=dem.Fk_Id_Concesionario"
                                    . " INNER JOIN zona zn ON zn.IdZona=cns.Fk_Id_Zona"    
                                    . " AND mt.Concesionario='$idConcesionario'"
                                    . " AND dem.Fk_Id_Concesionario='$idConcesionario'"
                                    . " AND mt.$celda >= ".$uno." AND mt.$celda <= ".$valDos
                                    . " AND mt.EstadoMuestra = '$estado'"
                                    . " AND dem.Fk_Id_Usuario = '$idUsuario'"
                                    . "AND dem.Fk_Id_Encuesta='$idEncuesta'"
                                    . " LIMIT 1";              
                    
                  $this->ejecutar_consulta_sql();
                   //var_dump($this->filas);
                  if(count($this->filas)>0){
                      foreach ($this->filas as $key => $value) {
                         $idMuestra=$value["IdMuestra"];
                            $this->sentencia_Sql="UPDATE registros_muestra "                                               
                                                . " SET  EstadoMuestra='en proceso',IdAsesor='$idUsuario'"
                                                . "WHERE IdMuestra = '$idMuestra'";
                         return $this->ejecutar_sentencia_sql();
                          //var_dump($mue->filas);    
                     }
                  }else{
                      $this->sentencia_Sql="SELECT * FROM registros_muestra  mt"
                                    . " INNER JOIN detalle_encuesta_muestra dem"
                                    . " ON mt.Fk_Id_descripcion_muestra=dem.Fk_Id_Muestra"
                                    . " INNER JOIN concesionario cns ON cns.IdConcesionario=dem.Fk_Id_Concesionario"
                                    . " INNER JOIN zona zn ON zn.IdZona=cns.Fk_Id_Zona"    
                                    . " AND mt.Concesionario='$idConcesionario'"
                                    . " AND dem.Fk_Id_Concesionario='$idConcesionario'"
                                    . " AND mt.$celda >= ".$uno." AND mt.$celda <= ".$valDos
                                    . " AND mt.EstadoMuestra = 'en proceso'"
                                    . " AND dem.Fk_Id_Usuario = '$idUsuario'"
                                    . "AND dem.Fk_Id_Encuesta='$idEncuesta'"
                                    . " LIMIT 1";
                         $this->ejecutar_consulta_sql();
                  }  
                  
                   
        }
        
       
        /*
         * Metodo paraa actualizar una fila de la tabla detalle_encuesta_muestra y darla por finalizada 
         */
        function cambiarEstadoDetalleEncuestaMuestra($param=array()) {
           
            
            foreach ($param as $key => $value) {
                $$key=$value;
            }
              $this->sentencia_Sql="UPDATE detalle_encuesta_muestra "
                                    . "SET Estado= 'procesada' "
                                    . "WHERE Fk_Id_Encuesta='$idEncuesta'"
                                    . " AND Fk_Id_Usuario='$idUsuario' "
                                    . "AND IdDetalleEncuestaMuestra = '$idDetalleEncuesta'";
            $this->ejecutar_sentencia_sql();
        }
        /**
         * Metodo para actualizar una fila de la tabla detalle_encuesta_usuario que almacena en su informacion las encuestas realizadas 
         * por un usuario 
         */
        function cambiarDetalleEncuestaUsuario($param=array()) {
            
            foreach ($param as $key => $value) {
                $$key=$value;
            }
             $this->sentencia_Sql="UPDATE detalle_encuesta_usuario "
                                    . "SET RealizadasRangoUno = 0 ,"
                                    . "RealizadasRangoDos = 0,"
                                    . "RealizadasRangoTres = 0,"
                                    . "RealizadasRangoCuatro = 0"    
                                    . " WHERE Fk_Id_Encuesta = '$idEncuesta'"
                                    . " AND Fk_Id_Usuario='$idUsuario' ";
                            $this->ejecutar_sentencia_sql();
         
    }
    
        /*Metodo para cambiar el estado de una fila de la tabla detalle_encuesta_muestra a procesada 
        **/
        function cambiarMuestraEnDetalleEncuestaMuestra($idMuestra,$idEncuesta,$idUsuario){
          $this->sentencia_Sql="	UPDATE detalle_encuesta_muestra SET Fk_Id_Muestra = '$idMuestra' "
                                 . "WHERE Fk_Id_Encuesta='$idEncuesta' "
                                . "AND Fk_Id_Usuario='$idUsuario'"
                              . " AND Estado != 'procesada'";
                      $this->ejecutar_sentencia_sql();
        }
        /*Metodo para cambiar el estado dela tabla muestra y agregar una observacion */
        function setCambiaEstadoMuestra($cadena=  array()){
            foreach ($cadena as $key => $value) {
                $$key=$value;
            }
            $this->sentencia_Sql="UPDATE registros_muestra SET EstadoMuestra='$estado',ObservacionesRegistro ='$observaciones' WHERE IdMuestra='$idMuestra'";
            return $this->ejecutar_sentencia_sql();
            
        }
        /*Metodo para reistrar un nuevo rango*/
        function setRango($rangos=array()){
            foreach ($rangos as $key => $value) {
                $$key=$value;
            }
            $this->sentencia_Sql="INSERT INTO rangos (Uno,Dos,Tres,Cuatro) VALUES('$uno','$dos','$tres','$cuatro')";
            if($this->ejecutar_sentencia_sql()){
                $this->mensaje="Rangos creados con exito";
                return TRUE;
            }else{
                $this->mensaje="Hemos presentado un error al crear los rangos intentelo nuevamnete o comuniquese con su administrador";
                return FALSE;              
            }
        }
        
        /*Metodo para actualizar las entrevistas realizadas en la tabla detalle encuesta muestra*/
        function actualizarRealizadasDetalleRango($rango,$idDetalle){
            $this->sentencia_Sql="UPDATE detalle_encuesta_muestra SET RealizadasDetalleRango".$rango." = RealizadasDetalleRango".$rango." + 1 WHERE IdDetalleEncuestaMuestra='$idDetalle'";
            return $this->ejecutar_sentencia_sql();
        }
        /*Metodo para consultar la vista vw_detalle_muestra*/
        function consultarDetalleMuestra($idEncuesta,$idUsuario){
            $this->sentencia_Sql="SELECT * FROM vw_detalle_encuesta_muestra "
                                . "WHERE Fk_Id_Encuesta='$idEncuesta' "
                                . "AND IdUsuario='$idUsuario' ";
            $this->ejecutar_consulta_sql();
        }
        function consultarDetalleMuestraPorEncuesta($idEncuesta){
            $this->sentencia_Sql="SELECT * FROM vw_detalle_encuesta_muestra "
                                . "WHERE Fk_Id_Encuesta='$idEncuesta'";
                                
            $this->ejecutar_consulta_sql();
        }
    }
    /*
     * Clase que representa la entidad zona
     */
    class zona extends ModeloBasedeDatos{
        public $idZona;
        public  $nombreZona;
        public $mensaje;
        
        public function set($nuevaZona=array()){
            if(array_key_exists("NombreZona", $nuevaZona)){
                $nZona=$nuevaZona["NombreZona"];
                $dirZona=$nuevaZona["directorZona"];
                $this->sentencia_Sql="INSERT INTO zona (NombreZona,DirectorZona)"
                        . "VALUES('$nZona','$dirZona')";
                if ($this->ejecutar_sentencia_sql()){
                    $this->mensaje="Zona creada con exito";
                }else{
                    $this->mensaje="Ha ocurrido un error al crear Zona";
                }
                
            }
        }
        function zonasEncuesta($idEncuesta){
            $this->sentencia_Sql="SELECT zn.IdZona,zn.NombreZona FROM zona zn 
                                    INNER JOIN concesionario cns ON zn.IdZona=cns.Fk_Id_Zona 
                                    INNER JOIN detalle_encuesta_muestra dem ON cns.IdConcesionario=dem.Fk_Id_Concesionario 
                                    WHERE dem.Fk_Id_Encuesta='$idEncuesta' 
                                    GROUP BY zn.NombreZona";
            $this->ejecutar_consulta_sql();
        }
        function zonasRepMensual($idForm){
            $this->sentencia_Sql="SELECT * FROM zona zn "
                                . "INNER JOIN concesionario cns "
                                . "ON cns.Fk_Id_Zona = zn.IdZona "
                                . "INNER JOIN promedios pro "
                                . "ON pro.Fk_Id_Concesionario = cns.IdConcesionario "
                                . "INNER JOIN detalle_encuesta_formulario def "
                                . "ON def.Fk_Id_Encuesta=pro.Fk_Id_Encuesta "
                                . "AND def.Fk_Id_Formulario_Encuesta='$idForm' "
                                . "GROUP BY cns.Fk_Id_Zona";
            $this->ejecutar_consulta_sql();
        }
         function zonasPorEncuesta($idMuestra=''){
             $this->sentencia_Sql="SELECT * FROM registros_muestra mt INNER JOIN concesionario cns ON mt.Concesionario=cns.IdConcesionario INNER JOIN zona zn ON zn.IdZona=cns.Fk_Id_Zona AND mt.Fk_Id_descripcion_muestra AND mt.Fk_Id_descripcion_muestra='$idMuestra' GROUP BY zn.NombreZona";
            $this->ejecutar_consulta_sql();
        }
        function zonasPorMuestra($idMuestra=''){
             $this->sentencia_Sql="SELECT zn.IdZona,zn.NombreZona FROM registros_muestra mt INNER JOIN concesionario cns ON mt.Concesionario=cns.IdConcesionario INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona AND mt.Fk_Id_descripcion_muestra='$idMuestra' GROUP BY zn.NombreZona";
            $this->ejecutar_consulta_sql();
        }
        function get($id=''){
            $this->sentencia_Sql="SELECT * FROM zona WHERE IdZona='$id' AND EstadoZona='1'";
            $this->ejecutar_consulta_sql();
        }
        function getAlls(){
            $this->sentencia_Sql="SELECT * FROM zona WHERE EstadoZona = '1'";
            $this->ejecutar_consulta_sql();
        }
        function eliminarZona($idZona){
              $this->sentencia_Sql="UPDATE zona SET EstadoZona='0' WHERE IdZona='$idZona'";
            if($this->ejecutar_sentencia_sql()){
                return TRUE;
            }  else {
                return FALSE;
            }
        }
        function editarZona($id,$nombre,$director){
              $this->sentencia_Sql="UPDATE zona SET NombreZona='$nombre', DirectorZona='$director' WHERE IdZona='$id'";
            if($this->ejecutar_sentencia_sql()){
                return true;
            }else{
                return false;
            }
        }
        
    }
     /*
     * Clase que representa la entidad concesionario
     */
    class concesionario extends ModeloBasedeDatos{
        public $idConcesionario;
        public $nombreConcesionario;
        public $director;
        public $mensaje;
        
        public function set($nuevoConcesionario=array()){
            if(array_key_exists("nombreConcesionario", $nuevoConcesionario)
                    and array_key_exists("director", $nuevoConcesionario)
                    and array_key_exists("idZona", $nuevoConcesionario)){
                foreach ($nuevoConcesionario as $key => $value) {
                    $$key=$value;
                }
                $this->sentencia_Sql="INSERT INTO concesionario(CodigoConcesionario,NombreConcesionario,Director,Fk_Id_Zona)"
                        . "VALUES('$codigo_concesionario','$nombreConcesionario','$director','$idZona')";
                if($this->ejecutar_sentencia_sql()){
                    $this->mensaje="Concesionario creado con exito";
                }else{
                    $this->mensaje="HA OCURRIDO UN ERROR ";
                }
            }
        }
        
        function get($idConcesionario=''){
            $this->sentencia_Sql="SELECT * FROM concesionario WHERE IdConcesionario='$idConcesionario'";
            $this->ejecutar_consulta_sql();
        }
        function concesionarioEncuesta($idEncuesta,$idZona){
            if($idZona==""){
                $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario FROM concesionario cns 
                                    INNER JOIN zona zn ON zn.IdZona=cns.Fk_Id_Zona 
                                    INNER JOIN detalle_encuesta_muestra dem ON cns.IdConcesionario=dem.Fk_Id_Concesionario 
                                    WHERE dem.Fk_Id_Encuesta='$idEncuesta' 
                                    GROUP BY cns.NombreConcesionario";
                $this->ejecutar_consulta_sql();
            }else{
                $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario FROM concesionario cns 
                                    INNER JOIN zona zn ON zn.IdZona=cns.Fk_Id_Zona 
                                    INNER JOIN detalle_encuesta_muestra dem ON cns.IdConcesionario=dem.Fk_Id_Concesionario 
                                    WHERE dem.Fk_Id_Encuesta='$idEncuesta' AND zn.IdZona='$idZona'
                                    GROUP BY cns.NombreConcesionario";
            $this->ejecutar_consulta_sql();
            }
        }
        function getPorZona($idZona=''){
            $this->filas=array();
            if($idZona!=""){
                $this->sentencia_Sql="SELECT * FROM concesionario WHERE Fk_Id_Zona = '$idZona' and EstadoConcesionario = '1'";
                $this->ejecutar_consulta_sql();                
            }
        }
        function obtenerConcesionarioEnMuestra($idMuestra='',$idZona=''){
            if($idZona=="T"){
                 $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario FROM registros_muestra mt INNER JOIN concesionario cns ON mt.Concesionario=cns.IdConcesionario INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona  AND mt.Fk_Id_descripcion_muestra='$idMuestra' GROUP BY cns.IdConcesionario";
            }else{
                $this->sentencia_Sql="SELECT cns.IdConcesionario,cns.NombreConcesionario FROM registros_muestra mt INNER JOIN concesionario cns ON mt.Concesionario=cns.IdConcesionario INNER JOIN zona zn ON cns.Fk_Id_Zona=zn.IdZona AND zn.IdZona='$idZona' AND mt.Fk_Id_descripcion_muestra='$idMuestra' GROUP BY cns.IdConcesionario";
            }
            $this->ejecutar_consulta_sql();
        }
        function getAlls(){
             $this->sentencia_Sql="SELECT * FROM concesionario WHERE EstadoConcesionario = '1'";
            $this->ejecutar_consulta_sql();
        }
        function eliminarConcesionario($idConc){
            $this->sentencia_Sql="UPDATE concesionario SET EstadoConcesionario='0' WHERE IdConcesionario='$idConc'";
            if($this->ejecutar_sentencia_sql()){
                return TRUE;
            }  else {
                return FALSE;
            }
        }
        function editarConcesionario($id,$nombre,$director){
            $this->sentencia_Sql="UPDATE concesionario SET NombreConcesionario='$nombre', Director='$director' WHERE IdConcesionario='$id'";
            if($this->ejecutar_sentencia_sql()){
                return true;
            }else{
                return false;
            }
                
        }
        function consultar_codigo($id_zona){
            $this->sentencia_Sql="CALL pa_consultar_codigo_concesionario('$id_zona')";
            $this->ejecutar_consulta_sql_procedure();
            
            
        }
    }
?>  