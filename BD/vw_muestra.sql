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
-- Structure for view `vw_muestra`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`mohansof`@`localhost` SQL SECURITY DEFINER VIEW `vw_muestra` AS select `muestra`.`IdDescripcionMuestra` AS `IdDescripcionMuestra`,`muestra`.`NombreMuestra` AS `NombreMuestra`,`muestra`.`FechaSubida` AS `FechaSubida`,`muestra`.`Estado` AS `Estado`,`muestra`.`registros` AS `registros`,`muestra`.`Fk_Id_Encuesta` AS `Fk_Id_Encuesta` from `muestra`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
