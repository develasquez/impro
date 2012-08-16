/*variables globales*/
var itemId =0;
var itemId2 =0;
var itemId3 =0;
var itemId4 =0;
var itemId5 =0;
var itemId6 =0;
var itemId7 =0;
var itemId8 =0;
var itemId9 =0;
var itemId10 =0;
var itemId11 =0;
var itemId12 =0;
var itemId13 =0;	


var initHogar = {id:"",
 estadoEnvioServer:"",
 caso:"",
 Siniestro:"", 
 Compania:"", 
 fechaHoraSiniestro:"", 
 fechaHoraInspeccion:"", 
 Inspector:"", 
 lugarInspeccion:"", 
 asegurado:"", 
 rutAsegurado:"", 
 nombreContacto:"", 
 rutContacto:"", 
 relacionCargo:"", 
 fonoFax:"", 
 emailUno:"", 
 emailDos:"", 
 nombreEntrevistado:"", 
 relacionCargoEntrevistado:"", 
 ObservacionInspector:"", 
 descripcionHechos:"", 
 descripcionHechosObservacionInspector:"", 
 idOrigenSiniestro:"", 
 observacionOrigenSiniestro:"", 
 observacionSiniestro:"", 
 observacionFotos:"", 
 idRiesgoAsegurado:"", 
 otroRiesgoAsegurado:"", 
 antiguedadRiesgoAsegurado:"", 
 superficieRiesgoAsegurado:"", 
 idPisoSubterraneo:"", 
 piso:"", 
 observacionRiesgoAsegurado:"", 
 descripcionMateriaAsegurada:"", 
 observacionMaterialidadPerimetrales:"", 
 observacionMaterialidadTechumbre:"", 
 textoPerimetrales:"", 
 textoInteriores:"", 
 observacionPavimentosInteriores:"", 
 observacionCielosInteriores:"", 
 observacionTerminacionesInteriores:"", 
 observacionOtrasInstalaciones:"", 
 observacionInspectorTerminaciones:"", 
 observacionSeguridadRobo:"", 
 observacionInspectorSeguridadRobo:"", 
 carabineros:"", 
 inverstigaciones:"", 
 dia:"", 
 constancia:"", 
 parte:"",
 fiscalia:"",
 ruc:"", 
 bomberos:"", 
 observacionesAntecedentes:"", 
 observacionNotificacion:"",
 otroSolicitudAntecedentes:"",
 observacionSolicitudAntecedentes:"", 
 nombreAnalista:"", 
 emailAnalista:"", 
 fonoFaxAnalista:"", 
 direccionAnalista:"", 
 observacionAnalista:"", 
 observacionDetalleDano:"", 
 idItem1:"", 
 idItem2:"", 
 cantidad:"", 
 depreciacion:"", 
 valorMetroCuadrado:"", 
 modificarMontoAsegurado:"", 
 observacionPresupuesto:""	
}

initFotosHogar = {
  id:"",
  idHogar:"",
  fotoBase64:"",
  extencion:"",
  fechaCreacion:""
};

initMaterialidadPerimetralesHogar = {
  id:"",
  idHogar:"",
  idPerimetral:"",
  interiores:""
};

initMaterialidadTechumbresHogar = {
  id:"",
  idHogar:"", 
  idTechumbre:""
};

initPavimentosHogar = {
  id:"",
  idHogar:"",
  idPavimentos:""	
};

initCielosHogar = {
  id:"",
  idHogar:"",
  idCielo:""
};

initTerminacionesHogar = {
 id:"",
 idHogar:"",
 idTerminaciones:""
};

initOtrasInstalacionesHogar = {
  id:"",
  idHogar:"",
  idOtraInstalacion:""
}

initMedidasSeguridadHogar = {
  id:"",
  idHogar:"", 
  idMedidaSeguridad:""
};

initSolicitudAntecedentesHogar = {
 id:"",  
 idHogar:"", 
 idAntecedente:""	
};

initDetalleDanosHogar = {
  id:"",  
  idHogar:"", 
  detalleMarcaModelo:"", 
  nroEspecie:"", 
  fechaCompra:"", 
  porcentajePerdida:""
};

initPresupuestoHogar = {
	id:"",
	idHogar:"", 
	eliminar:"", 
	Items:"", 
	Unidad:"", 
	Valor:"", 
	CantTotal:"", 
	porcentajeDepreciacion:"", 
	totalDepreciacion:"", 
	totalProvision:"", 
	totalGeneral:"", 
	uf:"", 
	montoAsegurado:"", 
	topeMontoPagar:""
};
initFirmasHogar = {
  id:"", 
  idHogar:"", 
  firmaBase64:"", 
  extencion:"" 	
};


hogar = {
	init : function(){
   		
        db.transaction(hogar.createTableInspeccion, errorCB, successCB);	
    
	},
	createTableInspeccion: function (tx){
		
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
		loadidGenerico();
	},

	insertInspeccion: function(){
		db.transaction(function(tx){
			
	   sql = "insert into hogar(id , estadoEnvioServer,  caso, Siniestro, Compania, fechaHoraSiniestro, fechaHoraInspeccion, Inspector, lugarInspeccion, asegurado, rutAsegurado, nombreContacto, rutContacto, relacionCargo, fonoFax, emailUno, emailDos, nombreEntrevistado, relacionCargoEntrevistado, ObservacionInspector, descripcionHechos, descripcionHechosObservacionInspector, idOrigenSiniestro, observacionOrigenSiniestro , observacionSiniestro, observacionFotos, idRiesgoAsegurado, otroRiesgoAsegurado, antiguedadRiesgoAsegurado, superficieRiesgoAsegurado, idPisoSubterraneo, piso, observacionRiesgoAsegurado, descripcionMateriaAsegurada, observacionMaterialidadPerimetrales , observacionMaterialidadTechumbre, textoPerimetrales, textoInteriores, observacionPavimentosInteriores, observacionCielosInteriores, observacionTerminacionesInteriores, observacionOtrasInstalaciones, observacionInspectorTerminaciones, observacionSeguridadRobo, observacionInspectorSeguridadRobo, carabineros, inverstigaciones, dia, constancia, parte, fiscalia, ruc, bomberos, observacionesAntecedentes, observacionNotificacion,otroSolicitudAntecedentes,observacionSolicitudAntecedentes, nombreAnalista, emailAnalista, fonoFaxAnalista, direccionAnalista, observacionAnalista, observacionDetalleDano, idItem1, idItem2, cantidad, depreciacion, valorMetroCuadrado, modificarMontoAsegurado, observacionPresupuesto) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";   
	    debugger;
	    var i = initHogar;
	    tx.executeSql(sql,[i.id , i.estadoEnvioServer, i.caso, i.Siniestro, i.Compania, i.fechaHoraSiniestro, i.fechaHoraInspeccion, i.Inspector, i.lugarInspeccion, i.asegurado, i.rutAsegurado, i.nombreContacto, i.rutContacto, i.relacionCargo, i.fonoFax, i.emailUno, i.emailDos, i.nombreEntrevistado, i.relacionCargoEntrevistado, i.ObservacionInspector, i.descripcionHechos, i.descripcionHechosObservacionInspector, i.idOrigenSiniestro, i.observacionOrigenSiniestro , i.observacionSiniestro, i.observacionFotos, i.idRiesgoAsegurado, i.otroRiesgoAsegurado, i.antiguedadRiesgoAsegurado, i.superficieRiesgoAsegurado, i.idPisoSubterraneo, i.piso, i.observacionRiesgoAsegurado, i.descripcionMateriaAsegurada, i.observacionMaterialidadPerimetrales , i.observacionMaterialidadTechumbre, i.textoPerimetrales, i.textoInteriores, i.observacionPavimentosInteriores, i.observacionCielosInteriores, i.observacionTerminacionesInteriores, i.observacionOtrasInstalaciones, i.observacionInspectorTerminaciones, i.observacionSeguridadRobo, i.observacionInspectorSeguridadRobo, i.carabineros, i.inverstigaciones, i.dia, i.constancia, i.parte, i.fiscalia, i.ruc, i.bomberos, i.observacionesAntecedentes, i.observacionNotificacion, i.otroSolicitudAntecedentes, i.observacionSolicitudAntecedentes, i.nombreAnalista, i.emailAnalista, i.fonoFaxAnalista, i.direccionAnalista, i.observacionAnalista, i.observacionDetalleDano, i.idItem1, i.idItem2, i.cantidad, i.depreciacion, i.valorMetroCuadrado, i.modificarMontoAsegurado, i.observacionPresupuesto])
		}, errorCB, successCB);
	     
	},
	updateInspecion: function(idInspeccion){
		   db.transaction(function(tx){
			 tx.executeSql("update ")   
		   }, errorCB, successCB);
		},
	deleteInspeccion: function(idInspeccion){
		   db.transaction(function(tx){
			 tx.executeSql("delete from fotosHogar where idHogar = ?",[idInspeccion])
			 tx.executeSql("delete from materialidadPerimetralesHogar where idHogar = ?",[idInspeccion])
			 tx.executeSql("delete from materialidadTechumbresHogar where idHogar = ?",[idInspeccion])
			 tx.executeSql("delete from pavimentosHogar where idHogar = ?",[idInspeccion])
			 tx.executeSql("delete from cielosHogar where idHogar = ?",[idInspeccion])
			 tx.executeSql("delete from terminacionesHogar where idHogar = ?",[idInspeccion])
			 tx.executeSql("delete from otrasInstalacionesHogar where idHogar = ?",[idInspeccion])
			 tx.executeSql("delete from medidasSeguridadHogar where idHogar = ?",[idInspeccion])   
			 tx.executeSql("delete from solicitudAntecedentesHogar where idHogar = ?",[idInspeccion]) 
			 tx.executeSql("delete from detalleDanosHogar where idHogar = ?",[idInspeccion]) 
			 tx.executeSql("delete from presupuestoHogar where idHogar = ?",[idInspeccion]) 
			 tx.executeSql("delete from firmasHogar where idHogar = ?",[idInspeccion]) 
			 tx.executeSql("delete from hogar where id = ?",[idInspeccion]) 
		   }, errorCB, successCB);		
		},
	listaInspeccionesDispositivo: function(){},
	listaInspeccionesServidor: function(){},
	getFoto:function(){},
	getFirma:function(){}
	
}

function validarOtrosOrigen() {
    if ($("#rbOtrosOrigenSiniestro").is(':checked') == true && $("#txtObservacionOrigenSiniestro").val() == "") {
        alert("Ingrese una observación");
    } else {
        window.location.href = "#paginaFotoSiniestro";
    }
}
function validarOtrosRiesgoAsegurado() {
    if ($("#rbDescripcionRiesgo-7").is(':checked') == true && $("#txtObservacionRiesgosAsegurado").val() == "") {
        alert("Ingrese una observación");
    } else {
        window.location.href = "#paginaMaterialidadAsegurado";
    }

}
function validarOtrosMaterialidadAsegurado() {
    if ($("#chkOtrosPerimetrales").is(':checked') == true && $("#txtObservacionPerimetrales").val() == "") {
        alert("Ingrese una observación");
    } else {
        window.location.href = "#paginaPavimentosInteriores";
    }

}
function validarOtrosPavimentoCielo() {
    if ($("#chkOtrosPavimentos").is(':checked') == true && $("#txtObservacionPavimentos").val() == "") {
        alert("Ingrese una observación");
    } else if ($("#chkOtrosCielos").is(':checked') == true && $("#txtObservacionCubierta").val() == "") {
        alert("Ingrese una observación");
    } else {
        window.location.href = "#paginaTerminaciones";
    }

}

function loadidGenerico(){
   db.transaction(function(tx){
	      
	   sql = 'SELECT max(id) max_id FROM hogar';
	   tx.executeSql(sql,[],function(tx, results){		
	   itemId = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   debugger;
	   sql = 'SELECT max(id) max_id FROM fotoshogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId2 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   sql = 'SELECT max(id) max_id FROM materialidadPerimetralesHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId3 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB,successCB);
	   /********/
	   
	   sql = 'SELECT max(id) max_id FROM materialidadTechumbresHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId4 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   sql = 'SELECT max(id) max_id FROM pavimentosHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId5 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   sql = 'SELECT max(id) max_id FROM cielosHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId6 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   /********/
	   
	   sql = 'SELECT max(id) max_id FROM terminacionesHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId7 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   sql = 'SELECT max(id) max_id FROM otrasInstalacionesHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId8 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   sql = 'SELECT max(id) max_id FROM medidasSeguridadHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId9 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   /********/
	   
	   sql = 'SELECT max(id) max_id FROM solicitudAntecedentesHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId10 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   sql = 'SELECT max(id) max_id FROM detalleDanosHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId11 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   sql = 'SELECT max(id) max_id FROM presupuestoHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId12 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	   
	   sql = 'SELECT max(id) max_id FROM firmasHogar';
	   tx.executeSql(sql,[],function(tx, results){
	   itemId13 = results.rows.item(0).max_id==null?1:parseInt(results.rows.item(0).max_id) + 1;	
	   },errorCB);
	    /* 
		initHogar.id = itemId;
				 
	    initFotosHogar.id = itemId2;
		initFotosHogar.idHogar = itemId;
		
		initMaterialidadPerimetralesHogar.id = itemId3;
		initMaterialidadPerimetralesHogar.idHogar = itemId;
		
		initMaterialidadTechumbresHogar.id = itemId4
		initMaterialidadTechumbresHogar.idHogar = itemId;
		
		initPavimentosHogar.id = itemId5;
		initPavimentosHogar.idHogar = itemId;
		
		initCielosHogar.id = itemId6;
		initCielosHogar.idHogar = itemId;
		
		initTerminacionesHogar.id = itemId7; 
		initTerminacionesHogar.idHogar = itemId;
		
		initOtrasInstalacionesHogar.id = itemId8;
        initOtrasInstalacionesHogar.idHogar= itemId;
		
		initMedidasSeguridadHogar.id = itemId9;
		initMedidasSeguridadHogar.idHogar = itemId;
		
		initSolicitudAntecedentesHogar.id = itemId10;
		initSolicitudAntecedentesHogar.idHogar = itemId;
		
		initDetalleDanosHogar.id = itemId11;
		initDetalleDanosHogar.idHogar = itemId;
		
		initPresupuestoHogar.id = itemId12;
		initPresupuestoHogar.idHogar = itemId;
		
		initFirmasHogar.id = itemId13;
		initFirmasHogar.idHogar = itemId;
	   */

   }, errorCB, successCB);
}

function verInspeccionesMok(){
	   initHogar.id = itemId;
	   hogar.insertInspeccion();
	   window.location.href = "#paginaAntecedentesGenerales";
	}
	
function verInspeccionesTablet(){
	   window.location.href = "#paginaAntecedentesGenerales";
	}