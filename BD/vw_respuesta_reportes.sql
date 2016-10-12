-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Oct 08, 2016 at 10:25 PM
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
-- Structure for view `vw_respuesta_reportes`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`mohansof`@`localhost` SQL SECURITY DEFINER VIEW `vw_respuesta_reportes` AS (select `ru`.`IdRespuesta` AS `IdRespuesta`,`ru`.`Fk_Id_Entrevista` AS `Fk_Id_Entrevista`,`ru`.`Fk_Respuesta_Pregunta` AS `Fk_Respuesta_Pregunta`,`ru`.`ComentarioUsuario` AS `ComentarioUsuario`,`ent`.`IdEntrevista` AS `IdEntrevista`,`ent`.`Fecha` AS `Fecha`,`ent`.`Fk_Id_Muestra` AS `Fk_Id_Muestra`,`ent`.`Fk_Id_Usuario` AS `Fk_Id_Usuario`,`ent`.`Fk_Id_Encuesta` AS `Fk_Id_Encuesta`,`ent`.`Estado` AS `Estado`,`ent`.`Observaciones` AS `Observaciones`,`rm`.`IdMuestra` AS `IdMuestra`,`rm`.`Nombre` AS `Nombre`,`rm`.`Parentesco` AS `Parentesco`,`rm`.`TelUno` AS `TelUno`,`rm`.`TelDos` AS `TelDos`,`rm`.`CelUno` AS `CelUno`,`rm`.`CelDos` AS `CelDos`,`rm`.`CelTres` AS `CelTres`,`rm`.`Cupo` AS `Cupo`,`rm`.`Contrato` AS `Contrato`,`rm`.`Ciudad` AS `Ciudad`,`rm`.`Concesionario` AS `Concesionario`,`rm`.`Asesor` AS `Asesor`,`rm`.`CodVendedor` AS `CodVendedor`,`rm`.`CodAsesor` AS `CodAsesor`,`rm`.`CuotasPagas` AS `CuotasPagas`,`rm`.`CuotasMora` AS `CuotasMora`,`rm`.`CuotasSeleccion` AS `CuotasSeleccion`,`rm`.`rango` AS `rango`,`rm`.`Fk_Id_descripcion_muestra` AS `Fk_Id_descripcion_muestra`,`rm`.`EstadoMuestra` AS `EstadoMuestra`,`rm`.`ObservacionesRegistro` AS `ObservacionesRegistro`,`c`.`IdConcesionario` AS `IdConcesionario`,`c`.`NombreConcesionario` AS `NombreConcesionario`,`c`.`Director` AS `Director`,`c`.`Fk_Id_Zona` AS `Fk_Id_Zona`,`c`.`EstadoConcesionario` AS `EstadoConcesionario`,`z`.`IdZona` AS `IdZona`,`z`.`NombreZona` AS `NombreZona`,`z`.`DirectorZona` AS `DirectorZona`,`z`.`EstadoZona` AS `EstadoZona` from ((((`respuesta_usuario` `ru` join `entrevista` `ent` on((`ru`.`Fk_Id_Entrevista` = `ent`.`IdEntrevista`))) join `registros_muestra` `rm` on((`rm`.`IdMuestra` = `ent`.`Fk_Id_Muestra`))) join `concesionario` `c` on((`c`.`IdConcesionario` = `rm`.`Concesionario`))) join `zona` `z` on((`z`.`IdZona` = `c`.`Fk_Id_Zona`))));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
