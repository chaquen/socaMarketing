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
-- Structure for view `vw_condiciones`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`mohansof`@`localhost` SQL SECURITY DEFINER VIEW `vw_condiciones` AS select `c`.`IdCondicion` AS `IdCondicion`,`c`.`tipoCondicion` AS `tipoCondicion`,`dc`.`IdDetalleCondicion` AS `IdDetalleCondicion`,`dc`.`Fk_Id_Condicion` AS `Fk_Id_Condicion`,`dc`.`Fk_Id_Detalle_Formulario` AS `Fk_Id_Detalle_Formulario`,`dc`.`Fk_Id_Respuesta_Pregunta` AS `Fk_Id_Respuesta_Pregunta`,`dc`.`Pregunta_Condicion` AS `Pregunta_Condicion` from (`condicion` `c` join `detalle_condicion` `dc` on((`c`.`IdCondicion` = `dc`.`Fk_Id_Condicion`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
