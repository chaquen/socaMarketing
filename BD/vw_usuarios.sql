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
-- Structure for view `vw_usuarios`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`mohansof`@`localhost` SQL SECURITY DEFINER VIEW `vw_usuarios` AS select `u`.`IdUsuario` AS `IdUsuario`,`u`.`Nombre` AS `Nombre`,`u`.`Apellido` AS `Apellido`,`u`.`Cedula` AS `Cedula`,`u`.`Email` AS `Email`,`u`.`Clave` AS `Clave`,`u`.`PreguntaSeguridad` AS `PreguntaSeguridad`,`u`.`Respuesta` AS `Respuesta`,`u`.`UltimaActividad` AS `UltimaActividad`,`u`.`Fk_Id_Rol` AS `Fk_Id_Rol`,`u`.`EstadoUsuario` AS `EstadoUsuario`,`r`.`IdRol` AS `IdRol`,`r`.`NombreRol` AS `NombreRol`,`r`.`Descripcion` AS `Descripcion`,`r`.`FechaRegistro` AS `FechaRegistro`,`r`.`Estado` AS `Estado` from (`usuario` `u` join `roles` `r` on((`u`.`Fk_Id_Rol` = `r`.`IdRol`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
