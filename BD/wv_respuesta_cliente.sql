-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Oct 08, 2016 at 10:26 PM
-- Server version: 5.5.52-cll-lve
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mohansof_socamarketing`
--

-- --------------------------------------------------------

--
-- Structure for view `wv_respuesta_cliente`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`mohansof`@`localhost` SQL SECURITY DEFINER VIEW `wv_respuesta_cliente` AS (select `mt`.`IdMuestra` AS `IdMuestra`,`mt`.`Nombre` AS `Nombre`,`mt`.`Parentesco` AS `Parentesco`,`mt`.`TelUno` AS `TelUno`,`mt`.`TelDos` AS `TelDos`,`mt`.`CelUno` AS `CelUno`,`mt`.`CelDos` AS `CelDos`,`mt`.`CelTres` AS `CelTres`,`mt`.`Cupo` AS `Cupo`,`mt`.`Contrato` AS `Contrato`,`mt`.`Ciudad` AS `Ciudad`,`mt`.`Concesionario` AS `Concesionario`,`mt`.`Asesor` AS `Asesor`,`mt`.`CodVendedor` AS `CodVendedor`,`mt`.`CodAsesor` AS `CodAsesor`,`mt`.`CuotasPagas` AS `CuotasPagas`,`mt`.`CuotasMora` AS `CuotasMora`,`mt`.`CuotasSeleccion` AS `CuotasSeleccion`,`mt`.`rango` AS `rango`,`mt`.`Fk_Id_descripcion_muestra` AS `Fk_Id_descripcion_muestra`,`mt`.`EstadoMuestra` AS `EstadoMuestra`,`mt`.`ObservacionesRegistro` AS `ObservacionesRegistro`,`ent`.`IdEntrevista` AS `IdEntrevista`,`ent`.`Fecha` AS `Fecha`,`ent`.`Fk_Id_Muestra` AS `Fk_Id_Muestra`,`ent`.`Fk_Id_Usuario` AS `Fk_Id_Usuario`,`ent`.`Fk_Id_Encuesta` AS `Fk_Id_Encuesta`,`ent`.`Estado` AS `Estado`,`ent`.`Observaciones` AS `Observaciones`,`res`.`IdRespuesta` AS `IdRespuesta`,`res`.`Fk_Id_Entrevista` AS `Fk_Id_Entrevista`,`res`.`Fk_Respuesta_Pregunta` AS `Fk_Respuesta_Pregunta`,`res`.`ComentarioUsuario` AS `ComentarioUsuario`,`rp`.`IdRespuestaPreguntas` AS `IdRespuestaPreguntas`,`rp`.`Fk_Id_Pregunta` AS `Fk_Id_Pregunta`,`rp`.`Respuesta` AS `Respuesta`,`rp`.`Comentario` AS `Comentario`,`rp`.`NivelOptimo` AS `NivelOptimo` from (((`registros_muestra` `mt` join `entrevista` `ent` on((`mt`.`IdMuestra` = `ent`.`Fk_Id_Muestra`))) join `respuesta_usuario` `res` on((`ent`.`IdEntrevista` = `res`.`Fk_Id_Entrevista`))) join `respuestas_preguntas` `rp` on((`rp`.`IdRespuestaPreguntas` = `res`.`Fk_Respuesta_Pregunta`))));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
