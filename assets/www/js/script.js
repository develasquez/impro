

function onMenuKeyDown() {$(".menu").toggleClass( "invisible" );}
function verMenu (){$(".menu").toggleClass( "invisible" );}
function onDeviceReady() {return true;}
function errorCB(err) {alert("Error processing SQL: "+err.message);$.mobile.hidePageLoadingMsg()}
function successCB() {$.mobile.hidePageLoadingMsg()}
$( function() {
//Declaracion de Eventos
	db = window.openDatabase("Inspecciones", "1.0", "Inspecciones", 20971520);	
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    verMenu();
    hogar.init()
})


hogar = {
	init : function(){
   		
        db.transaction(hogar.insertInspeccion, errorCB, successCB);	
    
	},
	insertInspeccion: function (tx){
		debugger;
	var sql = 'CREATE TABLE IF NOT EXISTS hogar (id , estadoEnvioServer,  caso, Siniestro, Compania, fechaHoraSiniestro, fechaHoraInspeccion, Inspector, lugarInspeccion, asegurado, rutAsegurado, nombreContacto, rutContacto, relacionCargo, fonoFax, emailUno, emailDos, nombreEntrevistado, relacionCargoEntrevistado, ObservacionInspector, descripcionHechos, descripcionHechosObservacionInspector, idOrigenSiniestro, observacionOrigenSiniestro , observacionSiniestro, observacionFotos, idRiesgoAsegurado, otroRiesgoAsegurado, antiguedadRiesgoAsegurado, superficieRiesgoAsegurado, idPisoSubterraneo, piso, observacionRiesgoAsegurado, descripcionMateriaAsegurada, observacionMaterialidadPerimetrales , observacionMaterialidadTechumbre, textoPerimetrales, textoInteriores, observacionPavimentosInteriores, observacionCielosInteriores, observacionTerminacionesInteriores, observacionOtrasInstalaciones, observacionInspectorTerminaciones, observacionSeguridadRobo, observacionInspectorSeguridadRobo, carabineros, inverstigaciones, dia, constancia, parte, fiscalia, ruc, bomberos, observacionesAntecedentes, observacionNotificacion,otroSolicitudAntecedentes,observacionSolicitudAntecedentes, nombreAnalista, emailAnalista, fonoFaxAnalista, direccionAnalista, observacionAnalista, observacionDetalleDano, idItem1, idItem2, cantidad, depreciacion, valorMetroCuadrado, modificarMontoAsegurado, observacionPresupuesto  )';
		tx.executeSql(sql);
		sql = 'CREATE TABLE IF NOT EXISTS fotosHogar (id , idHogar , fotoBase64, extencion, fechaCreacion)'
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS materialidadPerimetralesHogar (id ,  idHogar , idPerimetral , interiores ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS materialidadTechumbresHogar (id ,  idHogar , idTechumbre  ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS pavimentosHogar (id ,  idHogar , idPavimentos  ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS cielosHogar (id ,  idHogar , idCielo ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS terminacionesHogar (id ,  idHogar , idTerminaciones ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS otrasInstalacionesHogar (id ,  idHogar , idOtraInstalacion ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS medidasSeguridadHogar (id ,  idHogar , idMedidaSeguridad ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS solicitudAntecedentesHogar (id ,  idHogar , idAntecedente ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS detalleDanosHogar (id ,  idHogar , detalleMarcaModelo , nroEspecie, fechaCompra , porcentajePerdida ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS presupuestoHogar (id ,  idHogar , eliminar, Items , Unidad, Valor , CantTotal , porcentajeDepreciacion, totalDepreciacion, totalProvision, totalGeneral, uf, montoAsegurado , topeMontoPagar ) " 
		tx.executeSql(sql);
		sql = "CREATE TABLE IF NOT EXISTS firmasHogar (id ,  idHogar , firmaBase64 , extencion ) " 
		tx.executeSql(sql);
		sql = 'SELECT max(id) max_id FROM hogar';
		tx.executeSql(sql,[],function(tx, results){
			/*
			var item = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;
			var nombre = $("#txt_project_name").val();
			var descripcion = $("#tar_project_description").val();
			tx.executeSql('INSERT INTO PROJECTS (id, nombre, descripcion) VALUES (?,?,?)',[ item , nombre,descripcion]);
			tx.executeSql('SELECT * FROM PROJECTS where id= ?',[item],function(tx, results){
				var nuevo_proy = results.rows.item(0)
				if(parseInt(nuevo_proy.id) > 0 ){
					alert("El proyecto " + nuevo_proy.nombre + " ha sido creado")
				}
			},errorCB)*/
		},errorCB)	
	},
	updateInspecion: function(idInspeccion){},
	deleteInspeccion: function(idInspeccion){},
	listaInspeccionesDispositivo: function(){},
	listaInspeccionesServidor: function(){},
	getFoto:function(){},
	getFirma:function(){}
	
}


function guardarInspeccionBanco(){
	db.transaction(hogar.insertInspeccion, errorCB, successCB);	
	sql = 'CREATE TABLE IF NOT EXISTS inspeccionBanco (id ,  fechaHoy, nombreEDN , nombreCliente, rutCliente, calle, numeroCalle, direccion, nombreEmpresa, rutEmpresa ) ';
		tx.executeSql(sql,[],function(tx, results){
			
			//insert de los campos
			
			//limpia los campos

			//lee archivos de la carpeta y busca la ultima

			//leer base de ruts

			//si no hay rut sacar fotos de la casa.

		},errorCB)
}



 function obtieneFirma(){
	// buscaFirma()
	 //$.mobile.showPageLoadingMsg("b", "Esperando Firma", false);
   try{	
	 WebIntent.prototype.startActivity(
    									{action:'Firma'},
    									function(e){alert(JSON.stringify(e))},
    									function(e){alert(JSON.stringify(e))}
    								)
    }catch(e){
    	
    	alert("No soporta Firma Samsung Galaxy");
    	
    }
    								
    }



function buscaFirma(){
	  function fail(fileSystem) {
	    	console.log(JSON.stringify(fileSystem))
		    }
	
	   function gotFS(fileSystem) {
	    	console.log(JSON.stringify(fileSystem))
	    	 fileSystem.root.getDirectory("Music", {create: false, exclusive: false}, successDirectorio, fail);
	    }
	  
	   
	function successDirectorio(Directorio) {
		console.log(JSON.stringify(Directorio))
		var directoryReader = Directorio.createReader();
	    directoryReader.readEntries(successReaderDirectorio,fail);
	}      
	
	function successReaderDirectorio(Directorio) {
	    console.log(JSON.stringify(Directorio))
	}
	
	function successArchivo(parent) {
	    alert(JSON.stringify(parent))
	}

	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	
	//setTimeout("buscaFirma()",1000);
	
	
}
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'es-ES': {
		setDateButtonLabel: "Guardar Fecha",
		setTimeButtonLabel: "Guardar Hora",
		setDurationButtonLabel: "Guardar Duracion",
		calTodayButtonLabel: "Hoy",
		titleDateDialogLabel: "Elija fecha",
		titleTimeDialogLabel: "Elegir el tiempo",
		daysOfWeek: ["Domingo", "Lunes", "Martes", "Mi&#233;rcoles", "Jueves", "Viernes", "S&#225;bado"],
		daysOfWeekShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		monthsOfYear: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviemebre", "Diciembre"],
		monthsOfYearShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		durationLabel: ["D&#237;as", "Horas", "Minutos", "Segundos"],
		durationDays: ["D&#237;a", "D&#237;as"],
		tooltip: "Abrir El Calendario",
		nextMonth: "Mes Pr&#243;ximo",
		prevMonth: "Mes Anterior",
		timeFormat: 12,
		headerFormat: '%A, %-d %B, %Y',
		dateFieldOrder: ['d','m','y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: "%d/%m/%Y",
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0,
		clearButton: "Claro",
		durationOrder: ['d', 'h', 'i', 's'],
		meridiem: ["AM", "PM"],
		timeOutput: "%l:%M %p",
		durationFormat: "%Dd %DA, %Dl:%DM:%DS"
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'es-ES'
});