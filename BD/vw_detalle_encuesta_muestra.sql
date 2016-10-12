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
-- Structure for view `vw_detalle_encuesta_muestra`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`mohansof`@`localhost` SQL SECURITY DEFINER VIEW `vw_detalle_encuesta_muestra` AS select `usr`.`IdUsuario` AS `IdUsuario`,concat(`usr`.`Nombre`,`usr`.`Apellido`) AS `NombreAgente`,`cns`.`IdConcesionario` AS `IdConcesionario`,`cns`.`CodigoConcesionario` AS `CodigoConcesionario`,`cns`.`NombreConcesionario` AS `NombreConcesionario`,sum((((`dem`.`RangoUno` + `dem`.`RangoDos`) + `dem`.`RangoTres`) + `dem`.`RangoCuatro`)) AS `TotalAsignadas`,sum((((`dem`.`RealizadasDetalleRangoUno` + `dem`.`RealizadasDetalleRangoDos`) + `dem`.`RealizadasDetalleRangoTres`) + `dem`.`RealizadasDetalleRangoCuatro`)) AS `TotalRealizadas`,`dem`.`IdDetalleEncuestaMuestra` AS `IdDetalleEncuestaMuestra`,`dem`.`Fk_Id_Encuesta` AS `Fk_Id_Encuesta`,`dem`.`Fk_Id_Usuario` AS `Fk_Id_Usuario`,`dem`.`Fk_Id_Muestra` AS `Fk_Id_Muestra`,`dem`.`RangoUno` AS `AsignadasRangoUno`,`dem`.`RealizadasDetalleRangoUno` AS `RealizadasDetalleRangoUno`,`dem`.`RangoDos` AS `AsignadasRangoDos`,`dem`.`RealizadasDetalleRangoDos` AS `RealizadasDetalleRangoDos`,`dem`.`RangoTres` AS `AsignadasRangoTres`,`dem`.`RealizadasDetalleRangoTres` AS `RealizadasDetalleRangoTres`,`dem`.`RangoCuatro` AS `AsignadasRangoCuatro`,`dem`.`RealizadasDetalleRangoCuatro` AS `RealizadasDetalleRangoCuatro`,`dem`.`Estado` AS `EstadoDetalle` from ((`detalle_encuesta_muestra` `dem` join `concesionario` `cns` on((`dem`.`Fk_Id_Concesionario` = `cns`.`IdConcesionario`))) join `usuario` `usr` on((`dem`.`Fk_Id_Usuario` = `usr`.`IdUsuario`))) group by `dem`.`IdDetalleEncuestaMuestra`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
