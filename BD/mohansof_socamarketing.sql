-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2016 at 06:19 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mohansof_socamarketing`
--

-- --------------------------------------------------------

--
-- Table structure for table `concesionario`
--

CREATE TABLE `concesionario` (
  `IdConcesionario` int(11) NOT NULL,
  `CodigoConcesionario` varchar(6) NOT NULL,
  `NombreConcesionario` varchar(256) NOT NULL,
  `Director` varchar(55) NOT NULL,
  `Fk_Id_Zona` int(11) NOT NULL,
  `EstadoConcesionario` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `condicion`
--

CREATE TABLE `condicion` (
  `IdCondicion` int(11) NOT NULL,
  `tipoCondicion` enum('_final_','_salto_','_subencuesta_') COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla que almacena los registros de las preguntas de una subencuesta';

-- --------------------------------------------------------

--
-- Table structure for table `detalle_condicion`
--

CREATE TABLE `detalle_condicion` (
  `IdDetalleCondicion` int(11) NOT NULL,
  `Fk_Id_Condicion` int(11) NOT NULL,
  `Fk_Id_Detalle_Formulario` int(11) NOT NULL,
  `Fk_Id_Respuesta_Pregunta` int(11) DEFAULT NULL,
  `Pregunta_Condicion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_encuesta_formulario`
--

CREATE TABLE `detalle_encuesta_formulario` (
  `Id_detalle_encuesta` int(11) NOT NULL,
  `Fk_Id_encuesta` int(11) NOT NULL,
  `Fk_Id_Formulario_Encuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_encuesta_muestra`
--

CREATE TABLE `detalle_encuesta_muestra` (
  `IdDetalleEncuestaMuestra` int(11) NOT NULL,
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
  `RealizadasDetalleRangoCuatro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_encuesta_usuario`
--

CREATE TABLE `detalle_encuesta_usuario` (
  `IdDetalleEncuesta_Usuario` int(11) NOT NULL,
  `Fk_Id_Encuesta` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `RealizadasRangoUno` int(11) NOT NULL DEFAULT '0',
  `RealizadasRangoDos` int(11) NOT NULL DEFAULT '0',
  `RealizadasRangoTres` int(11) NOT NULL DEFAULT '0',
  `RealizadasRangoCuatro` int(11) NOT NULL,
  `AsignadasUsuario` int(11) NOT NULL,
  `RealizadasUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_formulario_preguntas`
--

CREATE TABLE `detalle_formulario_preguntas` (
  `IdDetalleFormulario` int(11) NOT NULL,
  `Fk_Id_Formulario` int(11) NOT NULL,
  `Fk_Id_Pregunta` int(11) NOT NULL,
  `NumeroPregunta` int(11) NOT NULL,
  `Condicion` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detalle_formulario_preguntas`
--

INSERT INTO `detalle_formulario_preguntas` (`IdDetalleFormulario`, `Fk_Id_Formulario`, `Fk_Id_Pregunta`, `NumeroPregunta`, `Condicion`) VALUES
(1, 1, 27, 1, '0'),
(2, 1, 29, 2, '0'),
(3, 1, 30, 3, '0'),
(4, 1, 31, 4, '0'),
(5, 1, 32, 5, '0'),
(6, 1, 33, 6, '0'),
(7, 1, 34, 7, '0'),
(8, 1, 35, 8, '0'),
(9, 1, 36, 9, '0'),
(10, 1, 37, 10, '0'),
(11, 1, 38, 11, '0'),
(12, 1, 39, 12, '0'),
(13, 1, 40, 13, '0'),
(14, 1, 41, 14, '0'),
(15, 1, 42, 15, '0'),
(16, 1, 43, 16, '0'),
(17, 1, 44, 17, '0'),
(18, 1, 45, 18, '0'),
(19, 1, 46, 19, '0'),
(20, 1, 47, 20, '0'),
(21, 1, 48, 21, '0'),
(22, 1, 49, 22, '0'),
(23, 1, 52, 23, '0'),
(24, 1, 51, 24, '0'),
(25, 1, 50, 25, '0'),
(26, 1, 53, 26, '0');

-- --------------------------------------------------------

--
-- Table structure for table `detalle_roles_modulos`
--

CREATE TABLE `detalle_roles_modulos` (
  `IdRol_Detalle_roles_modulos` int(11) NOT NULL,
  `Fk_id_rol` int(11) NOT NULL,
  `Fk_id_modulo` int(11) NOT NULL,
  `consultar` enum('0','1') NOT NULL,
  `registrar` enum('0','1') NOT NULL,
  `editar` enum('0','1') NOT NULL,
  `eliminar` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que relaciona los modulos y los roles con sus respectivos permisos';

-- --------------------------------------------------------

--
-- Table structure for table `encuesta`
--

CREATE TABLE `encuesta` (
  `IdEncuesta` int(11) NOT NULL,
  `NombreEncuesta` varchar(256) NOT NULL,
  `FechaCreacionEncuesta` datetime NOT NULL,
  `FechaFinalizacion` datetime NOT NULL,
  `CantidadMuestra` int(11) NOT NULL,
  `Fk_Id_Usuario_Creador` int(11) NOT NULL,
  `Estado` enum('Finalizada','En espera','En Proceso','Lista para proceso','Sin muestra') NOT NULL DEFAULT 'Sin muestra',
  `Realizadas` int(11) NOT NULL DEFAULT '0',
  `Asignadas` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `entrevista`
--

CREATE TABLE `entrevista` (
  `IdEntrevista` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Fk_Id_Muestra` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `Fk_Id_Encuesta` int(11) NOT NULL,
  `Estado` enum('NC','NDR','TE','ND','EQ','NE','EF','ME','BZ','CL','AP','CF','VLL','DL') NOT NULL COMMENT 'NC=>No contesta, NDR=>No desea responder,TE=>Telefono errado,ND=>No hay datos,EQ=>Equivocado,NE=>No efectiva,EF=>Efectiva,ME=>Actualizacion/Asistencia,BZ=>Buzon,CL=>Colgo llamada,AP=>Apagado,CF=>Confirmar,VLL=>Volver a llamar, DL=>Delicado',
  `Observaciones` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `formulario`
--

CREATE TABLE `formulario` (
  `IdFormulario` int(11) NOT NULL,
  `NombreFormulario` varchar(55) NOT NULL,
  `FechaCreacion` datetime NOT NULL,
  `Fk_Id_Empleado_creador` int(11) NOT NULL,
  `EstadoFormulario` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `formulario`
--

INSERT INTO `formulario` (`IdFormulario`, `NombreFormulario`, `FechaCreacion`, `Fk_Id_Empleado_creador`, `EstadoFormulario`) VALUES
(1, 'Aplicativo suscriptores', '2016-10-09 23:27:16', 1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `modulos`
--

CREATE TABLE `modulos` (
  `IdModulo` int(11) NOT NULL,
  `NombreModulo` varchar(20) NOT NULL,
  `DescripcionModulo` varchar(256) NOT NULL,
  `FechaRegistro` datetime NOT NULL,
  `Estado` enum('0','1','2') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la definición de módulos de la aplicacion';

-- --------------------------------------------------------

--
-- Table structure for table `muestra`
--

CREATE TABLE `muestra` (
  `IdDescripcionMuestra` int(11) NOT NULL,
  `NombreMuestra` varchar(256) NOT NULL,
  `FechaSubida` datetime NOT NULL,
  `Estado` enum('En espera','Proceso','Finalizada') NOT NULL DEFAULT 'En espera',
  `registros` int(11) NOT NULL,
  `Fk_Id_Encuesta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `preguntas`
--

CREATE TABLE `preguntas` (
  `IdPreguntas` int(11) NOT NULL,
  `TipoPregunta` enum('Abierta','Cerrada','CerradaMultiple','CerradaComentario','AbiertaCategoria','Rankin','GrupoPreguntas') NOT NULL,
  `ArgumentoPregunta` varchar(256) NOT NULL,
  `EstadoPregunta` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `preguntas`
--

INSERT INTO `preguntas` (`IdPreguntas`, `TipoPregunta`, `ArgumentoPregunta`, `EstadoPregunta`) VALUES
(27, 'Cerrada', 'Â Â¿Hace cuÃ¡nto tiempo tiene el plan de ChevyPlan?', '1'),
(29, 'Cerrada', ' Â¿Porque medio se enterÃ³ de ChevyPlan?', '1'),
(30, 'Cerrada', '2. Â¿Tiene Ud. Conocimiento  que las cuotas de ahorro son administradas por una fiduciaria?', '1'),
(31, 'CerradaComentario', 'Â¿Hasta el momento que tan satisfecho se ha sentido con el plan de ChevyPlan?', '1'),
(32, 'Cerrada', ' Â¿ChevyPlan es una empresa sÃ³lida y segura?', '1'),
(33, 'Cerrada', ' Â¿ChevyPlan tiene el respaldo de Chevrolet?', '1'),
(34, 'Cerrada', 'Â¿ChevyPlan tiene un costo financiero bajo en comparaciÃ³n con otras alternativas de crÃ©dito para adquirir vehÃ­culo?		', '1'),
(35, 'Cerrada', ' Â¿Las cuotas mensuales son bajas frente a otras alternativas de crÃ©dito para adquirir vehÃ­culo?		', '1'),
(36, 'Cerrada', 'Â¿Las asambleas mensuales de adjudicaciÃ³n son confiables?		', '1'),
(37, 'Cerrada', 'Â¿ChevyPlan es vigilado por la superintendencia de sociedades?		', '1'),
(38, 'Cerrada', 'Ha visitado la pÃ¡gina web de ChevyPlan?	', '1'),
(39, 'Cerrada', 'Â¿RecibiÃ³ la carpeta de bienvenida a ChevyPlan que se envÃ­a por correo certificado?	', '1'),
(40, 'Cerrada', 'Â¿LeyÃ³ la  carpeta?	', '1'),
(41, 'Cerrada', 'Conoce el programa de: Referidos', '1'),
(42, 'Cerrada', 'Conoce el programa de: Mega  Cumplidos', '1'),
(43, 'Cerrada', 'Conoce el programa de: VIP', '1'),
(44, 'Cerrada', 'Conoce el programa de: Rifas', '1'),
(45, 'Cerrada', ' Â¿Su asesor comercial le presentÃ³ con claridad  Y precisiÃ³n el plan de ahorro?	 	', '1'),
(46, 'Cerrada', 'Â¿Su asesor comercial fue honesto?	 	', '1'),
(47, 'CerradaComentario', 'Â¿CÃ³mo califica el servicio ofrecido por el asesor comercial en el MOMENTO de adquirir el plan de ChevyPlan?', '1'),
(48, 'Cerrada', ' Â¿Su asesor comercial lo ha contactado para informarle de su plan de ahorro?', '1'),
(49, 'Cerrada', 'Â¿CuÃ¡ndo fue la Ãºltima vez que lo contacto su asesor comercial, para ofrecerle atenciÃ³n y  servicio a su plan?', '1'),
(50, 'CerradaComentario', 'Â¿CÃ³mo califica el servicio ofrecido por el asesor comercial ahora DESPUES de haber adquirido el plan de ahorro con ChevyPlan?			 			', '1'),
(51, 'Cerrada', 'Â¿Usted se a comunicado  con la lÃ­nea de atenciÃ³n y servicio al cliente, en la oficina principal de ChvyPlan en BogotÃ¡?', '1'),
(52, 'Cerrada', ' Â¿CÃ³mo califica la atenciÃ³n a sus inquietudes  y la informaciÃ³n suministrada por la linea de atenciÃ³n y servicio al cliente?		 		', '1'),
(53, 'Cerrada', '22. Â¿A tenido contacto con un representante de Chevyplan en su concesionario, para aclarar inquietudes sobre su plan de ahorro?', '1'),
(54, 'GrupoPreguntas', 'De los siguientes atributos los cuales asocia directamente con ChevyPlan Es tan  amable de responder (si â€“ No â€“ No Sabe) De acuerdo!', '1');

-- --------------------------------------------------------

--
-- Table structure for table `promedios`
--

CREATE TABLE `promedios` (
  `IdPromedio` int(11) NOT NULL,
  `Fk_Id_Encuesta` int(11) NOT NULL,
  `Fk_Id_Concesionario` int(11) NOT NULL,
  `Fk_Id_Respuesta_Pregunta` int(11) NOT NULL,
  `RespuestaPromedio` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `NumeroRespuestas` int(11) NOT NULL,
  `FechaFinalizacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rangos`
--

CREATE TABLE `rangos` (
  `IdRango` int(11) NOT NULL,
  `Uno` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Dos` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Tres` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Cuatro` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `CeldaMuestra` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'CuotasSeleccion'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registros_muestra`
--

CREATE TABLE `registros_muestra` (
  `IdMuestra` int(11) NOT NULL,
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
  `IdAsesor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `respuestas_preguntas`
--

CREATE TABLE `respuestas_preguntas` (
  `IdRespuestaPreguntas` int(11) NOT NULL,
  `Fk_Id_Pregunta` int(11) NOT NULL,
  `Respuesta` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `Comentario` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `NivelOptimo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `respuestas_preguntas`
--

INSERT INTO `respuestas_preguntas` (`IdRespuestaPreguntas`, `Fk_Id_Pregunta`, `Respuesta`, `Comentario`, `NivelOptimo`) VALUES
(33, 27, 'Entre 1 y 12 meses', '', 0),
(34, 27, 'Entre 13 y 18 meses', '', 0),
(35, 27, 'Entre 19 y 24 meses', '', 0),
(42, 29, 'Oficina Principal de ChevyPlan', '', 0),
(43, 29, 'Concesionario Chevrolet', '', 0),
(44, 29, 'Publicidad		', 'Prensa', 0),
(45, 29, 'Publicidad		', 'Diario', 0),
(46, 29, 'Publicidad		', 'PeriÃ³dico ', 0),
(47, 29, 'Revista', '', 0),
(48, 29, 'TelevisiÃ³n Nal.', '', 0),
(49, 29, 'TelevisiÃ³n por cable', '', 0),
(50, 29, 'Internet', '', 0),
(51, 29, 'Otro medio de publicidad', '', 0),
(52, 29, 'Centro Comercial ', '', 0),
(53, 29, 'Referido â€“ Amigo', '', 0),
(54, 29, 'Lo contactaron telefÃ³nicamente ', '', 0),
(55, 29, 'Asesor comercial', '', 0),
(56, 29, 'Plan adicional', '', 0),
(57, 29, 'No recuerda', '', 0),
(58, 30, 'Si', '', 0),
(59, 30, 'No', '', 0),
(60, 31, 'Completamente Satisfecho', 'por que?', 0),
(61, 31, 'Satisfecho', 'por que?', 0),
(62, 31, 'Poco Satisfecho', 'por que?', 0),
(63, 31, 'Insatisfecho', 'por que?', 0),
(64, 31, 'Completamente Insatisfecho', 'por que?', 0),
(65, 32, 'SI', '', 0),
(66, 32, 'NO', '', 0),
(67, 32, 'No Sabe', '', 0),
(68, 33, 'SI', '', 0),
(69, 33, 'NO', '', 0),
(70, 33, 'No Sabe', '', 0),
(71, 34, 'SI', '', 0),
(72, 34, 'NO', '', 0),
(73, 34, 'No Sabe', '', 0),
(74, 35, 'Si', '', 0),
(75, 35, 'No', '', 0),
(76, 35, 'No Sabe', '', 0),
(77, 36, 'Si', '', 0),
(78, 36, 'No', '', 0),
(79, 36, 'No Sabe', '', 0),
(80, 37, 'Si', '', 0),
(81, 37, 'No', '', 0),
(82, 37, 'No Sabe', '', 0),
(83, 38, 'Si', '', 0),
(84, 38, 'No', '', 0),
(85, 39, 'SI', '', 0),
(86, 39, 'No', '', 0),
(87, 40, 'Si', '', 0),
(88, 40, 'No', '', 0),
(89, 41, 'Si', '', 0),
(90, 41, 'No', '', 0),
(91, 42, 'Si', '', 0),
(92, 42, 'No', '', 0),
(93, 43, 'Si', '', 0),
(94, 43, 'No', '', 0),
(95, 44, 'Si', '', 0),
(96, 44, 'No', '', 0),
(97, 45, 'Si', '', 0),
(98, 45, 'No', '', 0),
(99, 46, 'Si', '', 0),
(100, 46, 'No', '', 0),
(101, 47, 'Buena', 'Por que?', 0),
(102, 47, 'Regular', 'Por que?', 0),
(103, 47, 'Mala', 'Por que?', 0),
(104, 48, 'Si', '', 0),
(105, 48, 'No', '', 0),
(106, 49, 'DE 1 A 30 DÃAS', '', 0),
(107, 49, 'DE 2 A 3 MESES', '', 0),
(108, 49, 'MÃS DE TRES MESES', '', 0),
(109, 50, 'Buena', 'por que?', 0),
(110, 50, 'Regular', 'por que?', 0),
(111, 50, 'Mala', 'por que?', 0),
(112, 51, 'Si', '', 0),
(113, 51, 'No', '', 0),
(114, 52, 'buena', '', 0),
(115, 52, 'regular', '', 0),
(116, 52, 'mala', '', 0),
(117, 53, 'Si', '', 0),
(118, 53, 'No', '', 0),
(119, 54, 'Â¿ChevyPlan es una empresa sÃ³lida y segura?', 'SI', 0),
(120, 54, 'Â¿ChevyPlan es una empresa sÃ³lida y segura?', 'NO', 0),
(121, 54, 'Ortra pregunta marica', 'SI', 0),
(122, 54, 'Ortra pregunta marica', 'NO', 0),
(123, 54, 'Ortra pregunta marica', 'NS/NR', 0);

-- --------------------------------------------------------

--
-- Table structure for table `respuesta_usuario`
--

CREATE TABLE `respuesta_usuario` (
  `IdRespuesta` int(11) NOT NULL,
  `Fk_Id_Entrevista` int(11) NOT NULL,
  `Fk_Respuesta_Pregunta` int(11) DEFAULT NULL,
  `ComentarioUsuario` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `IdRol` int(11) NOT NULL,
  `NombreRol` varchar(20) NOT NULL,
  `Descripcion` varchar(256) NOT NULL,
  `FechaRegistro` datetime NOT NULL,
  `Estado` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que contendrá los roles de la aplicacion';

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`IdRol`, `NombreRol`, `Descripcion`, `FechaRegistro`, `Estado`) VALUES
(3, 'Administrador', 'Rol encargado de administrar la aplicacion                                    \n                                ', '2011-01-11 22:15:43', '1'),
(4, 'Agente', 'Rol encargado de ejecutar las encuestas                                    \n                                ', '2011-01-12 07:45:11', '1'),
(5, 'root', 'Usuario con todos los privilegios', '2015-07-28 21:47:16', '1');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `IdUsuario` int(11) NOT NULL,
  `Nombre` varchar(55) NOT NULL,
  `Apellido` varchar(55) NOT NULL,
  `Cedula` int(20) NOT NULL,
  `Email` varchar(55) NOT NULL,
  `Clave` varchar(256) NOT NULL,
  `PreguntaSeguridad` enum('Nombre mascota?','Materia favorita?','Empresa desarrolladora?','Nombre banda/artista favorita?','Hincha de?') NOT NULL,
  `Respuesta` varchar(55) NOT NULL,
  `UltimaActividad` datetime NOT NULL,
  `Fk_Id_Rol` int(11) NOT NULL,
  `EstadoUsuario` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `Nombre`, `Apellido`, `Cedula`, `Email`, `Clave`, `PreguntaSeguridad`, `Respuesta`, `UltimaActividad`, `Fk_Id_Rol`, `EstadoUsuario`) VALUES
(1, 'Edgar Adrian', 'Guzman', 1073684233, 'edgar.guzman21@gmail.com', '28862fa70b77a11ec2d0a45d6ec73d34a6c4198c539', 'Empresa desarrolladora?', '466196062e58eeb456ca7f035ee37611f5589cdbb3250', '2016-10-10 18:17:40', 3, '1');

-- --------------------------------------------------------

--
-- Table structure for table `zona`
--

CREATE TABLE `zona` (
  `IdZona` int(11) NOT NULL,
  `NombreZona` varchar(256) NOT NULL,
  `DirectorZona` varchar(55) NOT NULL,
  `EstadoZona` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `concesionario`
--
ALTER TABLE `concesionario`
  ADD PRIMARY KEY (`IdConcesionario`),
  ADD KEY `Fk_Id_Zona` (`Fk_Id_Zona`);

--
-- Indexes for table `condicion`
--
ALTER TABLE `condicion`
  ADD PRIMARY KEY (`IdCondicion`);

--
-- Indexes for table `detalle_condicion`
--
ALTER TABLE `detalle_condicion`
  ADD PRIMARY KEY (`IdDetalleCondicion`),
  ADD KEY `Fk_Id_Condicion` (`Fk_Id_Condicion`,`Fk_Id_Detalle_Formulario`,`Fk_Id_Respuesta_Pregunta`),
  ADD KEY `Fk_Id_Detalle_Formulario` (`Fk_Id_Detalle_Formulario`),
  ADD KEY `Fk_Id_Pregunta` (`Fk_Id_Respuesta_Pregunta`);

--
-- Indexes for table `detalle_encuesta_formulario`
--
ALTER TABLE `detalle_encuesta_formulario`
  ADD PRIMARY KEY (`Id_detalle_encuesta`),
  ADD KEY `Fk_Id_encuesta` (`Fk_Id_encuesta`),
  ADD KEY `Fk_Id_Formulario_Encuesta` (`Fk_Id_Formulario_Encuesta`);

--
-- Indexes for table `detalle_encuesta_muestra`
--
ALTER TABLE `detalle_encuesta_muestra`
  ADD PRIMARY KEY (`IdDetalleEncuestaMuestra`),
  ADD KEY `Fk_Id_Concesionario` (`Fk_Id_Concesionario`),
  ADD KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`),
  ADD KEY `Fk_Id_Muestra` (`Fk_Id_Muestra`),
  ADD KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`);

--
-- Indexes for table `detalle_encuesta_usuario`
--
ALTER TABLE `detalle_encuesta_usuario`
  ADD PRIMARY KEY (`IdDetalleEncuesta_Usuario`),
  ADD KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`),
  ADD KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`);

--
-- Indexes for table `detalle_formulario_preguntas`
--
ALTER TABLE `detalle_formulario_preguntas`
  ADD PRIMARY KEY (`IdDetalleFormulario`),
  ADD KEY `Fk_Id_Formulario` (`Fk_Id_Formulario`),
  ADD KEY `Fk_Id_Pregunta` (`Fk_Id_Pregunta`);

--
-- Indexes for table `detalle_roles_modulos`
--
ALTER TABLE `detalle_roles_modulos`
  ADD PRIMARY KEY (`IdRol_Detalle_roles_modulos`),
  ADD KEY `Fk_id_modulo` (`Fk_id_modulo`),
  ADD KEY `Fk_id_rol` (`Fk_id_rol`),
  ADD KEY `Fk_id_rol_2` (`Fk_id_rol`);

--
-- Indexes for table `encuesta`
--
ALTER TABLE `encuesta`
  ADD PRIMARY KEY (`IdEncuesta`),
  ADD KEY `Fk_Id_Usuario_Creador` (`Fk_Id_Usuario_Creador`);

--
-- Indexes for table `entrevista`
--
ALTER TABLE `entrevista`
  ADD PRIMARY KEY (`IdEntrevista`),
  ADD KEY `Fk_Id_Muestra` (`Fk_Id_Muestra`),
  ADD KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`),
  ADD KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`);

--
-- Indexes for table `formulario`
--
ALTER TABLE `formulario`
  ADD PRIMARY KEY (`IdFormulario`),
  ADD KEY `Fk_Id_Empleado_creador` (`Fk_Id_Empleado_creador`);

--
-- Indexes for table `modulos`
--
ALTER TABLE `modulos`
  ADD PRIMARY KEY (`IdModulo`);

--
-- Indexes for table `muestra`
--
ALTER TABLE `muestra`
  ADD PRIMARY KEY (`IdDescripcionMuestra`),
  ADD KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`);

--
-- Indexes for table `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`IdPreguntas`);

--
-- Indexes for table `promedios`
--
ALTER TABLE `promedios`
  ADD PRIMARY KEY (`IdPromedio`),
  ADD KEY `Fk_Id_Encuesta` (`Fk_Id_Encuesta`),
  ADD KEY `Fk_Id_Concesionario` (`Fk_Id_Concesionario`),
  ADD KEY `Fk_Id_Respuesta_Pregunta` (`Fk_Id_Respuesta_Pregunta`);

--
-- Indexes for table `rangos`
--
ALTER TABLE `rangos`
  ADD PRIMARY KEY (`IdRango`);

--
-- Indexes for table `registros_muestra`
--
ALTER TABLE `registros_muestra`
  ADD PRIMARY KEY (`IdMuestra`),
  ADD KEY `Concesionario` (`Concesionario`),
  ADD KEY `Fk_Id_descripcion_muestra` (`Fk_Id_descripcion_muestra`),
  ADD KEY `IdAsesor` (`IdAsesor`);

--
-- Indexes for table `respuestas_preguntas`
--
ALTER TABLE `respuestas_preguntas`
  ADD PRIMARY KEY (`IdRespuestaPreguntas`),
  ADD KEY `Fk_Id_Pregunta` (`Fk_Id_Pregunta`),
  ADD KEY `Fk_Id_Pregunta_2` (`Fk_Id_Pregunta`);

--
-- Indexes for table `respuesta_usuario`
--
ALTER TABLE `respuesta_usuario`
  ADD PRIMARY KEY (`IdRespuesta`),
  ADD KEY `Fk_Id_Entrevista` (`Fk_Id_Entrevista`),
  ADD KEY `Fk_Respuesta_Pregunta` (`Fk_Respuesta_Pregunta`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`IdRol`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`);

--
-- Indexes for table `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`IdZona`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `concesionario`
--
ALTER TABLE `concesionario`
  MODIFY `IdConcesionario` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `condicion`
--
ALTER TABLE `condicion`
  MODIFY `IdCondicion` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `detalle_condicion`
--
ALTER TABLE `detalle_condicion`
  MODIFY `IdDetalleCondicion` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `detalle_encuesta_formulario`
--
ALTER TABLE `detalle_encuesta_formulario`
  MODIFY `Id_detalle_encuesta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `detalle_encuesta_muestra`
--
ALTER TABLE `detalle_encuesta_muestra`
  MODIFY `IdDetalleEncuestaMuestra` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `detalle_encuesta_usuario`
--
ALTER TABLE `detalle_encuesta_usuario`
  MODIFY `IdDetalleEncuesta_Usuario` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `detalle_formulario_preguntas`
--
ALTER TABLE `detalle_formulario_preguntas`
  MODIFY `IdDetalleFormulario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `detalle_roles_modulos`
--
ALTER TABLE `detalle_roles_modulos`
  MODIFY `IdRol_Detalle_roles_modulos` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `encuesta`
--
ALTER TABLE `encuesta`
  MODIFY `IdEncuesta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `entrevista`
--
ALTER TABLE `entrevista`
  MODIFY `IdEntrevista` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `formulario`
--
ALTER TABLE `formulario`
  MODIFY `IdFormulario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `modulos`
--
ALTER TABLE `modulos`
  MODIFY `IdModulo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `muestra`
--
ALTER TABLE `muestra`
  MODIFY `IdDescripcionMuestra` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `IdPreguntas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `promedios`
--
ALTER TABLE `promedios`
  MODIFY `IdPromedio` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `rangos`
--
ALTER TABLE `rangos`
  MODIFY `IdRango` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `registros_muestra`
--
ALTER TABLE `registros_muestra`
  MODIFY `IdMuestra` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `respuestas_preguntas`
--
ALTER TABLE `respuestas_preguntas`
  MODIFY `IdRespuestaPreguntas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
--
-- AUTO_INCREMENT for table `respuesta_usuario`
--
ALTER TABLE `respuesta_usuario`
  MODIFY `IdRespuesta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `IdRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `zona`
--
ALTER TABLE `zona`
  MODIFY `IdZona` int(11) NOT NULL AUTO_INCREMENT;
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
