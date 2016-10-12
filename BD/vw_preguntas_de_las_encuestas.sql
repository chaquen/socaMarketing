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
-- Structure for view `vw_preguntas_de_las_encuestas`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`mohansof`@`localhost` SQL SECURITY DEFINER VIEW `vw_preguntas_de_las_encuestas` AS select `e`.`IdEncuesta` AS `IdEncuesta`,`e`.`NombreEncuesta` AS `NombreEncuesta`,`e`.`FechaCreacionEncuesta` AS `FechaCreacionEncuesta`,`e`.`FechaFinalizacion` AS `FechaFinalizacion`,`e`.`CantidadMuestra` AS `CantidadMuestra`,`e`.`Fk_Id_Usuario_Creador` AS `Fk_Id_Usuario_Creador`,`e`.`Estado` AS `Estado`,`e`.`Realizadas` AS `Realizadas`,`e`.`Asignadas` AS `Asignadas`,`def`.`Id_detalle_encuesta` AS `Id_detalle_encuesta`,`def`.`Fk_Id_encuesta` AS `Fk_Id_encuesta`,`def`.`Fk_Id_Formulario_Encuesta` AS `Fk_Id_Formulario_Encuesta`,`f`.`IdFormulario` AS `IdFormulario`,`f`.`NombreFormulario` AS `NombreFormulario`,`f`.`FechaCreacion` AS `FechaCreacion`,`f`.`Fk_Id_Empleado_creador` AS `Fk_Id_Empleado_creador`,`f`.`EstadoFormulario` AS `EstadoFormulario`,`f`.`Fk_Id_Rango` AS `Fk_Id_Rango`,`dfp`.`IdDetalleFormulario` AS `IdDetalleFormulario`,`dfp`.`Fk_Id_Formulario` AS `Fk_Id_Formulario`,`dfp`.`Fk_Id_Pregunta` AS `Fk_Id_Pregunta`,`dfp`.`NumeroPregunta` AS `NumeroPregunta`,`dfp`.`Condicion` AS `Condicion`,`p`.`IdPreguntas` AS `IdPreguntas`,`p`.`TipoPregunta` AS `TipoPregunta`,`p`.`ArgumentoPregunta` AS `ArgumentoPregunta`,`p`.`EstadoPregunta` AS `EstadoPregunta` from ((((`encuesta` `e` join `detalle_encuesta_formulario` `def` on((`e`.`IdEncuesta` = `def`.`Fk_Id_encuesta`))) join `formulario` `f` on((`f`.`IdFormulario` = `def`.`Fk_Id_Formulario_Encuesta`))) join `detalle_formulario_preguntas` `dfp` on((`dfp`.`Fk_Id_Formulario` = `f`.`IdFormulario`))) join `preguntas` `p` on((`p`.`IdPreguntas` = `dfp`.`Fk_Id_Pregunta`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
