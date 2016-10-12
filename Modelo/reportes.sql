
--Tabla muestra ranking Zonas
SELECT NombreZona,
       SUM(RangoUno+RangoDos+RangoTres+RangoCuatro) 'Realizadas',
       SUM(RangoUno) 'AsignadasRangoUno',
       SUM(RangoDos) 'AsignadasRangoDos',
       SUM(RangoTres) 'AsignadasRangoTres',
       SUM(RangoCuatro) 'AsignadasRangoCuatro' 
FROM detalle_encuesta_muestra dem 
INNER JOIN encuesta enc ON dem.Fk_Id_Encuesta=enc.IdEncuesta 
INNER JOIN concesionario c ON c.IdConcesionario=dem.Fk_Id_Concesionario 
INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona 
WHERE Fk_Id_Encuesta='16' 
GROUP BY z.IdZona ORDER BY Realizadas DESC




--TABLA COMPARATIVO por pregunta y encuesta
SELECT IdPreguntas,ArgumentoPregunta,Comentario,Respuesta,ComentarioUsuario,
COUNT(Respuesta) 'Muestra',
(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
        FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='16') 'TotalRealizadas',
CONCAT(TRUNCATE(
       (COUNT(Respuesta)/(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
                             FROM detalle_encuesta_muestra dem 
                             WHERE dem.Fk_Id_Encuesta='16'
                          )*100),2),'%') 'PorcentajeGeneral',
rp.NivelOptimo  FROM respuesta_usuario ru 
INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
WHERE p.IdPreguntas='1' AND ent.Fk_Id_Encuesta='16'
GROUP BY ru.Fk_Respuesta_Pregunta ORDER BY Muestra DESC

--Tabla ranking zonas rangos
        SELECT IdZona,NombreZona,rango,IdPreguntas,ArgumentoPregunta,Comentario,Respuesta,ComentarioUsuario,COUNT(Respuesta) 'Muestra',(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='16') 'TotalRealizadas',CONCAT(TRUNCATE((COUNT(Respuesta)/(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='16')*100),2),'%') 'PorcentajeGeneral',rp.NivelOptimo  FROM respuesta_usuario ru 
        INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
        INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
        INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
        INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
        INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
        INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
        INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
        WHERE p.IdPreguntas='1' AND ent.Fk_Id_Encuesta='16'
         GROUP BY z.IdZona,rm.rango,ru.Fk_Respuesta_Pregunta 
--RESPUESTA POR ZONAS
SELECT NombreZona,rango,CuotasSeleccion,IdPreguntas,ArgumentoPregunta,Comentario,Respuesta,ComentarioUsuario,COUNT(Respuesta) 'Muestra'  FROM respuesta_usuario ru 
INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
WHERE p.IdPreguntas='14' AND ent.Fk_Id_Encuesta='16'
GROUP BY IdZona,rango,Respuesta
--Tabla RESULTADO GENERAL
SELECT IdPreguntas,ArgumentoPregunta,Comentario,Respuesta,ComentarioUsuario,COUNT(Respuesta) 'Muestra',
(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='16') 'TotalRealizadas',
CONCAT(TRUNCATE((COUNT(Respuesta)/
(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) 
FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='16')*100),2),'%') 'PorcentajeGeneral',rp.NivelOptimo 
 FROM respuesta_usuario ru 
INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
WHERE p.IdPreguntas='1' AND ent.Fk_Id_Encuesta='16'
 GROUP BY ru.Fk_Respuesta_Pregunta
--TABLA LISTA DE COMENTARIOS
SELECT IdPreguntas,ArgumentoPregunta,Comentario,Respuesta,ComentarioUsuario,COUNT(ComentarioUsuario) 'Comentarios',(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='16') 'TotalRealizadas',CONCAT(TRUNCATE((COUNT(Respuesta)/(SELECT SUM(RealizadasDetalleRangoUno+RealizadasDetalleRangoDos+RealizadasDetalleRangoTres+RealizadasDetalleRangoCuatro) FROM detalle_encuesta_muestra dem WHERE dem.Fk_Id_Encuesta='16')*100),2),'%') 'PorcentajeGeneral',rp.NivelOptimo  FROM respuesta_usuario ru 
INNER JOIN entrevista ent  ON ru.Fk_Id_Entrevista=ent.IdEntrevista 
INNER JOIN registros_muestra rm ON rm.IdMuestra=ent.Fk_Id_Muestra
INNER JOIN concesionario c ON c.IdConcesionario=rm.Concesionario
INNER JOIN zona z ON z.IdZona=c.Fk_Id_Zona
INNER JOIN respuestas_preguntas rp ON rp.IdRespuestaPreguntas=ru.Fk_Respuesta_Pregunta
INNER JOIN preguntas p ON p.IdPreguntas= rp.Fk_Id_Pregunta
INNER JOIN encuesta enc ON enc.IdEncuesta=ent.Fk_Id_Encuesta
WHERE p.IdPreguntas='3' AND ent.Fk_Id_Encuesta='16'
 GROUP BY ru.Fk_Respuesta_Pregunta,ru.ComentarioUsuario 