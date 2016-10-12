$(document).ready( function() {
		
	//Funcion para cerrar todas las opciones y formularios
	$('.cerrar').click(function (){
		$('#forAsigEnUs, #forAsigEncu, #formCrearZona, #formCrearConcesionario, #formBuscarConcesionario,#formBuscarZona, #subEncuesta, #subZona, #subMuestra, .forAsigEncu, #forCrearEncu, #forCrearPreg, #forSubirEncu, #forZonas, #forRegistrarUs').hide('scale');
	});
        
        //Funcion que aparece el menu de las Encuestas------------------------------------------------------------------>
	$('#menEncuesta').click(function (){
            $('#forSubirEncu, #forAsigEncu, #subMuestra, #forCrearPreg, #forAsigEnUs, #forRegistrarUs, #subZona, #formCrearZona, #formCrearConcesionario, #formBuscarConcesionario,#formBuscarZona').fadeOut('fast');
		$('#subEncuesta').toggle('blind');
	});
        //Funcion que aparece el Formulario para la asignacion de las Encuestas 
	$('#asigEncu').click(function (){
            $('#subEncuesta, #forCrearEncu').hide('puff');
            $('#forAsigEnUs').toggle('clip');
        });
        //Funcion que aparece el Formulario para la creacion de las preguntas
        $('#preg').click(function (){
            $('#subEncuesta, .forAsigEncu, #forCrearEncu').hide('puff');
            $('#forCrearPreg').toggle('clip');
        });
        
	//Funcion que aparece el menu de la Base de Datos -----------------------------------------------------------------<
	$('#menMuestra').click(function (){
            $('#forAsigEncu, #forSubirEncu, #forCrearPreg, #forAsigEnUs, #forRegistrarUs, #subZona, #formCrearZona, #formCrearConcesionario, #formBuscarConcesionario,#formBuscarZona').fadeOut('fast');
		$('#subEncuesta').hide('puff');
		$('#subMuestra').toggle('clip');
	});
        //Funcion para subir la base de datos para realizar las encuestas
        $('#cargaBD').click(function (){
            $('#subEncuesta, #subMuestra').hide('puff');
            $('#forSubirEncu').toggle('clip');
        });
        //Funcion para asignar la BD a una Encuesta
        $('#asigBD').click(function (){
            $('#subMuestra').fadeOut('fast');
            $('#forAsigEncu').toggle('blind');
        });
       
        //Funcion que aparece el menu de las Zonas --------------------------------------------------------------------------<
        $('#zona').click(function (){
            $('#forAsigEncu, #forSubirEncu, #forCrearPreg, #forAsigEnUs, #forRegistrarUs, #subMuestra, #subEncuesta, #formCrearZona, #formCrearConcesionario, #formBuscarConcesionario').fadeOut('fast');
           $('#subZona').toggle('clip'); 
        });
        //Funcion que aparece el formulario para crear Zonas
        $('#creZona').click(function (){
            $('#subZona').fadeOut('fast');
            $('#formCrearZona').toggle('blind');
        });
        //Funcion que aparece el formulario para crear Consecionarios
        $('#creConse').click(function (){
            $('#subZona').fadeOut('fast');
            $('#formCrearConcesionario').toggle('blind');
        });
        //Funcion que aparece el formulario para buscar consecionarios
        $('#conConse').click(function (){
            $('#subZona').fadeOut('fast');
            $('#formBuscarConcesionario').toggle('blind');
            
        });
        //Funcion que aparece el menu de buscar zonas
        $('#conZona').click(function (){
            $('#subZona').fadeOut('fast');
            $('#formBuscarZona').toggle('blind');
            
        });
        
        //Funcion que aparece el formulario para registrar un nuevo Usuario
        $('#regUsu').click(function (){
            $('#forAsigEncu, #forCrearPreg, #forSubirEncu,  #forAsigEnUs, #subZona, #subMuestra, #subEncuesta, #formCrearZona, #formCrearConcesionario, #formBuscarConcesionario').fadeOut('fast');
            $('#forRegistrarUs').toggle('clip');
        });
}); 
