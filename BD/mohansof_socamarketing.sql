-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Oct 08, 2016 at 10:21 PM
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
CREATE DATABASE IF NOT EXISTS `mohansof_socamarketing` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mohansof_socamarketing`;

-- --------------------------------------------------------

--
-- Table structure for table `concesionario`
--

CREATE TABLE IF NOT EXISTS `concesionario` (
  `IdConcesionario` int(11) NOT NULL AUTO_INCREMENT,
  `CodigoConcesionario` varchar(6) NOT NULL,
  `NombreConcesionario` varchar(256) NOT NULL,
  `Director` varchar(55) NOT NULL,
  `Fk_Id_Zona` int(11) NOT NULL,
  `EstadoConcesionario` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdConcesionario`),
  KEY `Fk_Id_Zona` (`Fk_Id_Zona`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=86 ;

-- --------------------------------------------------------

--
-- Table structure for table `condicion`
--

CREATE TABLE IF NOT EXISTS `condicion` (
  `IdCondicion` int(11) NOT NULL AUTO_INCREMENT,
  `tipoCondicion` enum('_final_','_salto_','_subencuesta_') COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`IdCondicion`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla que almacena los registros de las preguntas de una subencuesta' AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_condicion`
--

CREATE TABLE IF NOT EXISTS `detalle_condicion` (
  `IdDetalleCondicion` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Condicion` int(11) NOT NULL,
  `Fk_Id_Detalle_Formulario` int(11) NOT NULL,
  `Fk_Id_Respuesta_Pregunta` int(11) DEFAULT NULL,
  `Pregunta_Condicion` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdDetalleCondicion`),
  KEY `Fk_Id_Condicion` (`Fk_Id_Condicion`,`Fk_Id_Detalle_Formulario`,`Fk_Id_Respuesta_Pregunta`),
  KEY `Fk_Id_Detalle_Formulario` (`Fk_Id_Detalle_Formulario`),
  KEY `Fk_Id_Pregunta` (`Fk_Id_Respuesta_Pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_encuesta_formulario`
--

CREATE TABLE IF NOT EXISTS `detalle_encuesta_formulario` (
  `Id_detalle_encuesta` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_encuesta` int(11) NOT NULL,
  `Fk_Id_Formulario_Encuesta` int(11) NOT NULL,
  PRIMARY KEY (`Id_detalle_encuesta`),
  KEY `Fk_Id_encuesta` (`Fk_Id_encuesta`),
  KEY `Fk_Id_Formulario_Encuesta` (`Fk_Id_Formulario_Encuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_encuesta_muestra`
--

CREATE TABLE IF NOT EXISTS `detalle_encuesta_muestra` (
  `IdDetalleEncuestaMuestra` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Concesionario` int(11) NOT NULL,
  `Fk_Id_Encuesta` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `Fk_Id_Muestra` int(11) NOT NULL,
  `RangoUno` int(11) NOT NULL,
  `RangoDos` int(11) NOT NULL,
  `RangoTres` int(11) NOT NULL,
  `RangoCuatro` int(11) NOT NULL,
  `Estado` enum('en espera','procesada') NOT NULL DEFAULT 'en espera',
  `RealizadasDetalleRangoUno` int(11) NOT NULL,
  `RealizadasDetalleRangoDos` int(11) NOT NULL,
  `RealizadasDetalleRangoTres` int(11) NOT NULL,
  `RealizadasDetalleRangoCuatro` int(11) NOT NULL,
  PRIMARY KEY (`IdDetalleEncuestaMuestra`),
  KEY `Fk_Id_Concesionario` (`Fk_Id_Concesionario`),
  KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`),
  KEY `Fk_Id_Muestra` (`Fk_Id_Muestra`),
  KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_encuesta_usuario`
--

CREATE TABLE IF NOT EXISTS `detalle_encuesta_usuario` (
  `IdDetalleEncuesta_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Encuesta` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `RealizadasRangoUno` int(11) NOT NULL DEFAULT '0',
  `RealizadasRangoDos` int(11) NOT NULL DEFAULT '0',
  `RealizadasRangoTres` int(11) NOT NULL DEFAULT '0',
  `RealizadasRangoCuatro` int(11) NOT NULL,
  `AsignadasUsuario` int(11) NOT NULL,
  `RealizadasUsuario` int(11) NOT NULL,
  PRIMARY KEY (`IdDetalleEncuesta_Usuario`),
  KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`),
  KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_formulario_preguntas`
--

CREATE TABLE IF NOT EXISTS `detalle_formulario_preguntas` (
  `IdDetalleFormulario` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Formulario` int(11) NOT NULL,
  `Fk_Id_Pregunta` int(11) NOT NULL,
  `NumeroPregunta` int(11) NOT NULL,
  `Condicion` enum('0','1') NOT NULL,
  PRIMARY KEY (`IdDetalleFormulario`),
  KEY `Fk_Id_Formulario` (`Fk_Id_Formulario`),
  KEY `Fk_Id_Pregunta` (`Fk_Id_Pregunta`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=117 ;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_roles_modulos`
--

CREATE TABLE IF NOT EXISTS `detalle_roles_modulos` (
  `IdRol_Detalle_roles_modulos` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_id_rol` int(11) NOT NULL,
  `Fk_id_modulo` int(11) NOT NULL,
  `consultar` enum('0','1') NOT NULL,
  `registrar` enum('0','1') NOT NULL,
  `editar` enum('0','1') NOT NULL,
  `eliminar` enum('0','1') NOT NULL,
  PRIMARY KEY (`IdRol_Detalle_roles_modulos`),
  KEY `Fk_id_modulo` (`Fk_id_modulo`),
  KEY `Fk_id_rol` (`Fk_id_rol`),
  KEY `Fk_id_rol_2` (`Fk_id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que relaciona los modulos y los roles con sus respectivos permisos' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `encuesta`
--

CREATE TABLE IF NOT EXISTS `encuesta` (
  `IdEncuesta` int(11) NOT NULL AUTO_INCREMENT,
  `NombreEncuesta` varchar(256) NOT NULL,
  `FechaCreacionEncuesta` datetime NOT NULL,
  `FechaFinalizacion` datetime NOT NULL,
  `CantidadMuestra` int(11) NOT NULL,
  `Fk_Id_Usuario_Creador` int(11) NOT NULL,
  `Estado` enum('Finalizada','En espera','En Proceso','Lista para proceso','Sin muestra') NOT NULL DEFAULT 'Sin muestra',
  `Realizadas` int(11) NOT NULL DEFAULT '0',
  `Asignadas` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdEncuesta`),
  KEY `Fk_Id_Usuario_Creador` (`Fk_Id_Usuario_Creador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `entrevista`
--

CREATE TABLE IF NOT EXISTS `entrevista` (
  `IdEntrevista` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha` datetime NOT NULL,
  `Fk_Id_Muestra` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `Fk_Id_Encuesta` int(11) NOT NULL,
  `Estado` enum('NC','NDR','TE','ND','EQ','NE','EF','ME','BZ','CL','AP','CF','VLL','DL') NOT NULL COMMENT 'NC=>No contesta, NDR=>No desea responder,TE=>Telefono errado,ND=>No hay datos,EQ=>Equivocado,NE=>No efectiva,EF=>Efectiva,ME=>Actualizacion/Asistencia,BZ=>Buzon,CL=>Colgo llamada,AP=>Apagado,CF=>Confirmar,VLL=>Volver a llamar, DL=>Delicado',
  `Observaciones` varchar(256) NOT NULL,
  PRIMARY KEY (`IdEntrevista`),
  KEY `Fk_Id_Muestra` (`Fk_Id_Muestra`),
  KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`),
  KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `formulario`
--

CREATE TABLE IF NOT EXISTS `formulario` (
  `IdFormulario` int(11) NOT NULL AUTO_INCREMENT,
  `NombreFormulario` varchar(55) NOT NULL,
  `FechaCreacion` datetime NOT NULL,
  `Fk_Id_Empleado_creador` int(11) NOT NULL,
  `EstadoFormulario` enum('0','1') NOT NULL DEFAULT '1',
  `Fk_Id_Rango` int(11) NOT NULL,
  PRIMARY KEY (`IdFormulario`),
  KEY `Fk_Id_Empleado_creador` (`Fk_Id_Empleado_creador`),
  KEY `Fk_Id_Rango` (`Fk_Id_Rango`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

-- --------------------------------------------------------

--
-- Table structure for table `modulos`
--

CREATE TABLE IF NOT EXISTS `modulos` (
  `IdModulo` int(11) NOT NULL AUTO_INCREMENT,
  `NombreModulo` varchar(20) NOT NULL,
  `DescripcionModulo` varchar(256) NOT NULL,
  `FechaRegistro` datetime NOT NULL,
  `Estado` enum('0','1','2') NOT NULL,
  PRIMARY KEY (`IdModulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la definición de módulos de la aplicacion' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `muestra`
--

CREATE TABLE IF NOT EXISTS `muestra` (
  `IdDescripcionMuestra` int(11) NOT NULL AUTO_INCREMENT,
  `NombreMuestra` varchar(256) NOT NULL,
  `FechaSubida` datetime NOT NULL,
  `Estado` enum('En espera','Proceso','Finalizada') NOT NULL DEFAULT 'En espera',
  `registros` int(11) NOT NULL,
  `Fk_Id_Encuesta` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdDescripcionMuestra`),
  KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `preguntas`
--

CREATE TABLE IF NOT EXISTS `preguntas` (
  `IdPreguntas` int(11) NOT NULL AUTO_INCREMENT,
  `TipoPregunta` enum('Abierta','Cerrada','CerradaMultiple','CerradaComentario','AbiertaCategoria') NOT NULL,
  `ArgumentoPregunta` varchar(256) NOT NULL,
  `EstadoPregunta` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdPreguntas`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=55 ;

-- --------------------------------------------------------

--
-- Table structure for table `promedios`
--

CREATE TABLE IF NOT EXISTS `promedios` (
  `IdPromedio` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Encuesta` int(11) NOT NULL,
  `Fk_Id_Concesionario` int(11) NOT NULL,
  `Fk_Id_Respuesta_Pregunta` int(11) NOT NULL,
  `RespuestaPromedio` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `NumeroRespuestas` int(11) NOT NULL,
  `FechaFinalizacion` datetime NOT NULL,
  PRIMARY KEY (`IdPromedio`),
  KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`),
  KEY `Fk_Id_Concesionario` (`Fk_Id_Concesionario`),
  KEY `Fk_Id_Respuesta_Pregunta` (`Fk_Id_Respuesta_Pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `rangos`
--

CREATE TABLE IF NOT EXISTS `rangos` (
  `IdRango` int(11) NOT NULL AUTO_INCREMENT,
  `Uno` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Dos` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Tres` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Cuatro` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `CeldaMuestra` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'CuotasSeleccion',
  PRIMARY KEY (`IdRango`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `registros_muestra`
--

CREATE TABLE IF NOT EXISTS `registros_muestra` (
  `IdMuestra` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `Parentesco` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `TelUno` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `TelDos` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `CelUno` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `CelDos` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `CelTres` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `Cupo` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `Contrato` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `Ciudad` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Concesionario` int(11) NOT NULL,
  `CodVendedor` int(11) NOT NULL,
  `CodAsesor` int(11) NOT NULL,
  `Asesor` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `CuotasPagas` double NOT NULL,
  `CuotasMora` double NOT NULL,
  `CuotasSeleccion` double NOT NULL,
  `rango` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Fk_Id_descripcion_muestra` int(11) NOT NULL,
  `EstadoMuestra` enum('pendiente','en proceso','descartado','reprocesar','efectivo') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'pendiente',
  `ObservacionesRegistro` varchar(256) COLLATE utf8_spanish_ci DEFAULT NULL,
  `IdAsesor` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdMuestra`),
  KEY `Concesionario` (`Concesionario`),
  KEY `Fk_Id_descripcion_muestra` (`Fk_Id_descripcion_muestra`),
  KEY `IdAsesor` (`IdAsesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `respuestas_preguntas`
--

CREATE TABLE IF NOT EXISTS `respuestas_preguntas` (
  `IdRespuestaPreguntas` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Pregunta` int(11) NOT NULL,
  `Respuesta` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `Comentario` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `NivelOptimo` int(11) NOT NULL,
  PRIMARY KEY (`IdRespuestaPreguntas`),
  KEY `Fk_Id_Pregunta` (`Fk_Id_Pregunta`),
  KEY `Fk_Id_Pregunta_2` (`Fk_Id_Pregunta`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=146 ;

-- --------------------------------------------------------

--
-- Table structure for table `respuesta_usuario`
--

CREATE TABLE IF NOT EXISTS `respuesta_usuario` (
  `IdRespuesta` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Entrevista` int(11) NOT NULL,
  `Fk_Respuesta_Pregunta` int(11) DEFAULT NULL,
  `ComentarioUsuario` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`IdRespuesta`),
  KEY `Fk_Id_Entrevista` (`Fk_Id_Entrevista`),
  KEY `Fk_Respuesta_Pregunta` (`Fk_Respuesta_Pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `IdRol` int(11) NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(20) NOT NULL,
  `Descripcion` varchar(256) NOT NULL,
  `FechaRegistro` datetime NOT NULL,
  `Estado` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Tabla que contendrá los roles de la aplicacion' AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(55) NOT NULL,
  `Apellido` varchar(55) NOT NULL,
  `Cedula` int(20) NOT NULL,
  `Email` varchar(55) NOT NULL,
  `Clave` varchar(256) NOT NULL,
  `PreguntaSeguridad` enum('Nombre mascota?','Materia favorita?','Empresa desarrolladora?','Nombre banda/artista favorita?','Hincha de?') NOT NULL,
  `Respuesta` varchar(55) NOT NULL,
  `UltimaActividad` datetime NOT NULL,
  `Fk_Id_Rol` int(11) NOT NULL,
  `EstadoUsuario` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

-- --------------------------------------------------------

--
-- Table structure for table `zona`
--

CREATE TABLE IF NOT EXISTS `zona` (
  `IdZona` int(11) NOT NULL AUTO_INCREMENT,
  `NombreZona` varchar(256) NOT NULL,
  `DirectorZona` varchar(55) NOT NULL,
  `EstadoZona` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdZona`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detalle_condicion`
--
ALTER TABLE `detalle_condicion`
  ADD CONSTRAINT `detalle_condicion_condicion ` FOREIGN KEY (`Fk_Id_Condicion`) REFERENCES `condicion` (`IdCondicion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_condicion_detalle_formulario_pregunta` FOREIGN KEY (`Fk_Id_Detalle_Formulario`) REFERENCES `detalle_formulario_preguntas` (`IdDetalleFormulario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_condicion_respuesta_pregunta` FOREIGN KEY (`Fk_Id_Respuesta_Pregunta`) REFERENCES `respuestas_preguntas` (`IdRespuestaPreguntas`);

--
-- Constraints for table `detalle_encuesta_formulario`
--
ALTER TABLE `detalle_encuesta_formulario`
  ADD CONSTRAINT `detalle_encuesta_encuesta` FOREIGN KEY (`Fk_Id_encuesta`) REFERENCES `encuesta` (`IdEncuesta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_encuesta_formulario` FOREIGN KEY (`Fk_Id_Formulario_Encuesta`) REFERENCES `formulario` (`IdFormulario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detalle_encuesta_muestra`
--
ALTER TABLE `detalle_encuesta_muestra`
  ADD CONSTRAINT `detalle_encuesta_muestra_` FOREIGN KEY (`Fk_Id_Muestra`) REFERENCES `muestra` (`IdDescripcionMuestra`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_encuesta_muestra_concesionario` FOREIGN KEY (`Fk_Id_Concesionario`) REFERENCES `concesionario` (`IdConcesionario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_encuesta_muestra_encuesta` FOREIGN KEY (`Fk_Id_Encuesta`) REFERENCES `encuesta` (`IdEncuesta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_encuesta_muestra_usuario` FOREIGN KEY (`Fk_Id_Usuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detalle_encuesta_usuario`
--
ALTER TABLE `detalle_encuesta_usuario`
  ADD CONSTRAINT `detalle_encuesta_usuario` FOREIGN KEY (`Fk_Id_Usuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_encuesta_usuario_encuesta` FOREIGN KEY (`Fk_Id_Encuesta`) REFERENCES `encuesta` (`IdEncuesta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detalle_formulario_preguntas`
--
ALTER TABLE `detalle_formulario_preguntas`
  ADD CONSTRAINT `detalle_formulario_preguntas` FOREIGN KEY (`Fk_Id_Pregunta`) REFERENCES `preguntas` (`IdPreguntas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_formulario_preguntas_formulario` FOREIGN KEY (`Fk_Id_Formulario`) REFERENCES `formulario` (`IdFormulario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detalle_roles_modulos`
--
ALTER TABLE `detalle_roles_modulos`
  ADD CONSTRAINT `detalle_roles_modulos_modulo` FOREIGN KEY (`Fk_id_modulo`) REFERENCES `modulos` (`IdModulo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_roles_modulos_rol` FOREIGN KEY (`Fk_id_rol`) REFERENCES `roles` (`IdRol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `encuesta`
--
ALTER TABLE `encuesta`
  ADD CONSTRAINT `encuesta_usuario` FOREIGN KEY (`Fk_Id_Usuario_Creador`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `entrevista`
--
ALTER TABLE `entrevista`
  ADD CONSTRAINT `entrevista_encuesta` FOREIGN KEY (`Fk_Id_Encuesta`) REFERENCES `encuesta` (`IdEncuesta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entrevista_muestra` FOREIGN KEY (`Fk_Id_Muestra`) REFERENCES `registros_muestra` (`IdMuestra`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entrevista_usuario` FOREIGN KEY (`Fk_Id_Usuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `formulario`
--
ALTER TABLE `formulario`
  ADD CONSTRAINT `formulario_rangos` FOREIGN KEY (`Fk_Id_Rango`) REFERENCES `rangos` (`IdRango`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `formulario_usuario` FOREIGN KEY (`Fk_Id_Empleado_creador`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `muestra`
--
ALTER TABLE `muestra`
  ADD CONSTRAINT `muestra_encuesta` FOREIGN KEY (`Fk_Id_Encuesta`) REFERENCES `encuesta` (`IdEncuesta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `promedios`
--
ALTER TABLE `promedios`
  ADD CONSTRAINT `promedios_concesionario` FOREIGN KEY (`Fk_Id_Concesionario`) REFERENCES `concesionario` (`IdConcesionario`),
  ADD CONSTRAINT `promedios_encuesta` FOREIGN KEY (`Fk_Id_Encuesta`) REFERENCES `encuesta` (`IdEncuesta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `promedios_respuesta_pregunta` FOREIGN KEY (`Fk_Id_Respuesta_Pregunta`) REFERENCES `respuestas_preguntas` (`IdRespuestaPreguntas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `registros_muestra`
--
ALTER TABLE `registros_muestra`
  ADD CONSTRAINT `registro_muestra_concesionario` FOREIGN KEY (`Concesionario`) REFERENCES `concesionario` (`IdConcesionario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `registro_muestra_muestra` FOREIGN KEY (`Fk_Id_descripcion_muestra`) REFERENCES `muestra` (`IdDescripcionMuestra`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `respuestas_preguntas`
--
ALTER TABLE `respuestas_preguntas`
  ADD CONSTRAINT `respuestas_preguntas` FOREIGN KEY (`Fk_Id_Pregunta`) REFERENCES `preguntas` (`IdPreguntas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `respuesta_usuario`
--
ALTER TABLE `respuesta_usuario`
  ADD CONSTRAINT `respuesta_usuario_entrevista` FOREIGN KEY (`Fk_Id_Entrevista`) REFERENCES `entrevista` (`IdEntrevista`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuesta_usuario_respuesta_pregunta` FOREIGN KEY (`Fk_Respuesta_Pregunta`) REFERENCES `respuestas_preguntas` (`IdRespuestaPreguntas`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
