desarrollo = false;

if (desarrollo){
    urlWebService = "WSInspecciones/WSInspecciones.aspx" ;
} else {
    urlWebService =  "http://masivo.mproliquidadores.cl/nuevoWebService/WSInspecciones.aspx";
}

ruta = {
    crearBaseDatos: function () {
        //Crear BD
        db = openDatabase("ruta", "1.1", "Base de datos local Ruta", 5 * 1024 * 1024);
        if (!db) {
            alert("Error al crear la base local");
            return;
        }
    },
    crearTablaMarcas: function () {
        var sql = '';
        sql = 'CREATE TABLE IF NOT EXISTS marca (idMarca, glosa)';
        db.transaction(function (tx) {
            tx.executeSql(sql);
        });
    },
    crearTablaTipos: function () {
        var sql = '';
        sql = 'CREATE TABLE IF NOT EXISTS tipo (idTipo, glosa)';
        db.transaction(function (tx) {
            tx.executeSql(sql);
        });
    },
    crearTablaCarrocerias: function () {
        var sql = '';
        sql = 'CREATE TABLE IF NOT EXISTS carroceria (idCarroceria, glosa)';
        db.transaction(function (tx) {
            tx.executeSql(sql);
        });
    },
    crearTablaCombustibles: function () {
        var sql = '';
        sql = 'CREATE TABLE IF NOT EXISTS combustible (idCombustible, glosa)';
        db.transaction(function (tx) {
            tx.executeSql(sql);
        });
    },
    crearTablaPreInspecciones: function () {
        var sql = '';
        sql = 'CREATE TABLE IF NOT EXISTS preInspecciones (idPreInspeccion, tipo, marca, a�o, nChasis, nMotor, kilometraje, automotora, encargadoLugar, fechaLugar, direccionLugar, comuna, carroceria, combustible, color, cilindrada, fechaEnvio, modelo)';
        db.transaction(function (tx) {
            tx.executeSql(sql);
        });
    },
    insertarTablaMarcas: function (objMarcas) {
        db.transaction(function (tx) {
            $.each(objMarcas, function (index, marcas) {
                tx.executeSql('INSERT INTO marca (idMarca, glosa) VALUES (?,?)', [marcas.idMarca, marcas.glosa]);
            })
        })
    },
    insertarTablaTipos: function (objTipos) {
        db.transaction(function (tx) {
            $.each(objTipos, function (index, tipos) {
                tx.executeSql('INSERT INTO tipo (idTipo, glosa) VALUES (?,?)', [tipos.idTipo, tipos.glosa]);
            })
        })
    },
    insertarTablaCarrocerias: function (objCarrocerias) {
        db.transaction(function (tx) {
            $.each(objCarrocerias, function (index, carrocerias) {
                tx.executeSql('INSERT INTO carroceria (idCarroceria, glosa) VALUES (?,?)', [carrocerias.idCarroceria, carrocerias.glosa]);
            })
        })
    },
    insertarTablaCombustibles: function (objCombustibles) {
        db.transaction(function (tx) {
            $.each(objCombustibles, function (index, combustibles) {
                tx.executeSql('INSERT INTO combustible (idCombustible, glosa) VALUES (?,?)', [combustibles.idCombustible, combustibles.glosa]);
            })
        })
    },
    insertarTablaPreInspecciones: function (objCombustibles) {
        var cantidad = 0;
        db.transaction(function (tx) {
            tx.executeSql('SELECT count(*) as cantidad FROM preInspecciones', [], function (tx, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    if (results.rows.item(i).cantidad == 0) {
                        tx.executeSql('INSERT INTO preInspecciones (idPreInspeccion, tipo, marca, a�o, nChasis, nMotor, kilometraje, automotora, encargadoLugar, fechaLugar, direccionLugar, comuna, carroceria, combustible, color, cilindrada, fechaEnvio, modelo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [0, 0, 0, 0, '', '', 0, '', '', '', '', '', 0, 0, '', '', '', '']);
                    } else {
                        tx.executeSql('SELECT idPreInspeccion, tipo, marca, a�o, nChasis, nMotor, kilometraje, automotora, encargadoLugar, fechaLugar, direccionLugar, comuna, carroceria, combustible, color, cilindrada, fechaEnvio, modelo FROM preInspecciones', [], function (tx, resultadoPre) {
                            for (var w = 0; w < resultadoPre.rows.length; w++) {
                                $("#cboTipo").val(resultadoPre.rows.item(w).tipo);
                                $("#cboMarca").val(resultadoPre.rows.item(w).marca);
                                $("#cboCarroceria").val(resultadoPre.rows.item(w).carroceria);
                                $("#cboCombustible").val(resultadoPre.rows.item(w).combustible);
                                $("#txtModelo").val(resultadoPre.rows.item(w).modelo);
                                $("#txtNChasis").val(resultadoPre.rows.item(w).nChasis);
                                $("#txtNMotor").val(resultadoPre.rows.item(w).nMotor);
                                $("#txtKilometraje").val(resultadoPre.rows.item(w).kilometraje);
                                $("#txtCilindrada").val(resultadoPre.rows.item(w).cilindrada);
                                $("#txtAnio").val(resultadoPre.rows.item(w).a�o);
                                $("#txtColor").val(resultadoPre.rows.item(w).color);
                                $("#txtAutomotora").val(resultadoPre.rows.item(w).automotora);
                                $("#txtEncargado").val(resultadoPre.rows.item(w).encargadoLugar);
                                $("#txtFecha").val(resultadoPre.rows.item(w).fechaLugar);
                                $("#txtDireccion").val(resultadoPre.rows.item(w).direccionLugar);
                                $("#txtComuna").val(resultadoPre.rows.item(w).comuna);
                            }
                            $("#cboTipo").selectmenu("refresh");
                            $("#cboMarca").selectmenu("refresh");
                            $("#cboCarroceria").selectmenu("refresh");
                            $("#cboCombustible").selectmenu("refresh");
                        }, function (tx, resultadoPre) { alert("Error al obtener los datos de Marcas: " + resultadoPre.message); });
                    }
                }
            }, function (tx, results) { alert("Error al obtener los datos de preInspecciones: " + results.message); });
        })
    },
    actualizarTipo: function (idTipo) {
        db.transaction(function (tx) {
            tx.executeSql('UPDATE preInspecciones set tipo = ?', [idTipo]);
        })
    },
    actualizarMarca: function (idMarca) {
        db.transaction(function (tx) {
            tx.executeSql('UPDATE preInspecciones set marca = ?', [idMarca]);
        })
    },
    actualizarCarroceria: function (idCarroceria) {
        db.transaction(function (tx) {
            tx.executeSql('UPDATE preInspecciones set carroceria = ?', [idCarroceria]);
        })
    },
    actualizarCombustible: function (idCombustible) {
        db.transaction(function (tx) {
            tx.executeSql('UPDATE preInspecciones set combustible = ?', [idCombustible]);
        })
    },
    actualizarModelo: function (modelo) {
        db.transaction(function (tx) {
            tx.executeSql('UPDATE preInspecciones set modelo = ?', [modelo]);
        })
    },
    actualizarDatos: function (campo, valor) {
        db.transaction(function (tx) {
            tx.executeSql('UPDATE preInspecciones set ' + campo + ' = ?', [valor]);
        })
    },
    eliminarTablaMarcas: function () {
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM marca");
        })
    },
    eliminarTablaTipos: function () {
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM tipo");
        })
    },
    eliminarTablaCarrocerias: function () {
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM carroceria");
        })
    },
    eliminarTablaCombustibles: function () {
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM combustible");
        })
    },
    obtieneCombos: {
        getMarcas: function () {
            $.ajax({
                url: urlWebService + "/getMarcas",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "",
                success: function (data) {
                    data = JSON.parse(data.d).data;
                    ruta.eliminarTablaMarcas();
                    ruta.insertarTablaMarcas(data);
                }
            });
        },
        getTipos: function () {
            $.ajax({
                url: urlWebService + "/getTipos",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "",
                success: function (data) {
                    data = JSON.parse(data.d).data;
                    ruta.eliminarTablaTipos();
                    ruta.insertarTablaTipos(data);
                }
            });
        },
        getCarrocerias: function () {
            $.ajax({
                url: urlWebService + "/getCarrocerias",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "",
                success: function (data) {
                    data = JSON.parse(data.d).data;
                    ruta.eliminarTablaCarrocerias();
                    ruta.insertarTablaCarrocerias(data);
                }
            });
        },
        getCombustibles: function () {
            $.ajax({
                url: urlWebService + "/getCombustibles",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "",
                success: function (data) {
                    data = JSON.parse(data.d).data;
                    ruta.eliminarTablaCombustibles();
                    ruta.insertarTablaCombustibles(data);
                }
            });
        },
        setMarcas: function () {
            db.transaction(function (tx) {
                tx.executeSql('SELECT idMarca, glosa FROM marca', [], function (tx, results) {
                    for (var i = 0; i < results.rows.length; i++) {
                        $("#cboMarca").append($("<option/>").attr("value", results.rows.item(i).idMarca).text(results.rows.item(i).glosa))
                    }
                    $("#cboMarca").selectmenu("refresh");
                }, function (tx, results) { alert("Error al obtener los datos de Marcas: " + results.message); });
            });
        },
        setTipos: function () {
            db.transaction(function (tx) {
                tx.executeSql('SELECT idTipo, glosa FROM tipo', [], function (tx, results) {
                    for (var i = 0; i < results.rows.length; i++) {
                        $("#cboTipo").append($("<option/>").attr("value", results.rows.item(i).idTipo).text(results.rows.item(i).glosa))
                    }
                    $("#cboTipo").selectmenu("refresh");
                }, function (tx, results) { alert("Error al obtener los datos de Tipos: " + results.message); });
            });
        },
        setCarrocerias: function () {
            db.transaction(function (tx) {
                tx.executeSql('SELECT idCarroceria, glosa FROM carroceria', [], function (tx, results) {
                    for (var i = 0; i < results.rows.length; i++) {
                        $("#cboCarroceria").append($("<option/>").attr("value", results.rows.item(i).idCarroceria).text(results.rows.item(i).glosa))

                    }
                    $("#cboCarroceria").selectmenu("refresh");
                }, function (tx, results) { alert("Error al obtener los datos de Carroceria: " + results.message); });
            });
        },
        setCombustibles: function () {
            db.transaction(function (tx) {
                tx.executeSql('SELECT idCombustible, glosa FROM combustible', [], function (tx, results) {
                    for (var i = 0; i < results.rows.length; i++) {
                        $("#cboCombustible").append($("<option/>").attr("value", results.rows.item(i).idCombustible).text(results.rows.item(i).glosa))

                    }
                    $("#cboCombustible").selectmenu("refresh");
                }, function (tx, results) { alert("Error al obtener los datos de Combustibles: " + results.message); });
            });
        }
    },
    insertarTablaMarcas: function (objMarcas) {
        var myObjMarcas = objMarcas;
        db.transaction(function (tx) {
            $.each(objMarcas, function (index, marcas) {
                tx.executeSql('INSERT INTO marca (idMarca, glosa) VALUES (?,?)', [marcas.idMarca, marcas.glosa]);
            })
        })
    },
    getFoto: function () { },
    getFirma: function () { }
}

function obtieneFirma(){
    // buscaFirma()
    //$.mobile.showPageLoadingMsg("b", "Esperando Firma", false);
    try {
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
        fileSystem.root.getDirectory("Music", { create: false, exclusive: false }, successDirectorio, fail);
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
/*jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
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
*/
function cargarDatosIniciales(){
	var keyinput = "key10";
	var valoutput = "value10";
	if(typeof(window.localStorage) != 'undefined'){ 
		window.localStorage.setItem(keyinput,valinput); 
	}else{ 
		throw "window.localStorage, not defined"; 
	}
	
	var cboTipo = document.getElementById("cboTipo");
	//alert(cboTipo.length);
	//for (i=0; i <= cboTipo.length - 1; i++) {
		//alert (cboTipo[i].value);
	//}
	//alert(1);
}

//Functi�n de Im�genes Automovil

function seleccionarParte(obj){
	var strArchivo = obj.src.substring(obj.src.lastIndexOf("/") + 1, obj.src.lenght);
	var nombreArchivo = strArchivo.substring(0,strArchivo.lastIndexOf("."));
	if (nombreArchivo.indexOf("_min") > -1){
		nombreArchivo = nombreArchivo.substring(0,strArchivo.lastIndexOf("_min")) + '_med';
		obj.src = "img/imgRuta/" + nombreArchivo + ".png";
	}else if (nombreArchivo.indexOf("_med") > -1){
		nombreArchivo = nombreArchivo.substring(0,strArchivo.lastIndexOf("_med")) + '_max';
		obj.src = "img/imgRuta/" + nombreArchivo + ".png"; 
	}else if (nombreArchivo.indexOf("_max") > -1){
		nombreArchivo = nombreArchivo.substring(0,strArchivo.lastIndexOf("_max"));
		obj.src = "img/imgRuta/" + nombreArchivo + ".png"; 
	}else {
		obj.src = "img/imgRuta/" + nombreArchivo + "_min.png";
		$("checkbox-1a").attr("checked",true).checkboxradio("refresh");
	}
}

function redireccionarFoto(){
	//Guardar Estado actual
	document.location.href = 'foto.html';
}

ruta.crearBaseDatos();
ruta.crearTablaTipos();
ruta.crearTablaMarcas();
ruta.crearTablaCarrocerias();
ruta.crearTablaCombustibles();
ruta.crearTablaPreInspecciones();

ruta.obtieneCombos.getTipos();
ruta.obtieneCombos.getMarcas();
ruta.obtieneCombos.getCarrocerias();
ruta.obtieneCombos.getCombustibles();

$(document).ready(function () {
    ruta.obtieneCombos.setTipos();
    ruta.obtieneCombos.setMarcas();
    ruta.obtieneCombos.setCarrocerias();
    ruta.obtieneCombos.setCombustibles();

    ruta.insertarTablaPreInspecciones();

    $("#cboTipo").bind("change", function (event, ui) {
        ruta.actualizarDatos('tipo', $("#cboTipo").val());
    });
    $("#cboMarca").bind("change", function (event, ui) {
        ruta.actualizarDatos('marca', $("#cboMarca").val());
    });
    $("#cboCarroceria").bind("change", function (event, ui) {
        ruta.actualizarDatos('carroceria', $("#cboCarroceria").val());
    });
    $("#cboCombustible").bind("change", function (event, ui) {
        ruta.actualizarDatos('combustible', $("#cboCombustible").val());
    });
    $("#txtModelo").bind("change", function (event, ui) {
        ruta.actualizarDatos('modelo', $("#txtModelo").val());
    });
    $("#txtNChasis").bind("change", function (event, ui) {
        ruta.actualizarDatos('nChasis', $("#txtNChasis").val());
    });
    $("#txtNMotor").bind("change", function (event, ui) {
        ruta.actualizarDatos('nMotor', $("#txtNMotor").val());
    });
    $("#txtKilometraje").bind("change", function (event, ui) {
        ruta.actualizarDatos('modelo', $("#txtKilometraje").val());
    });
    $("#txtCilindrada").bind("change", function (event, ui) {
        ruta.actualizarDatos('cilindrada', $("#txtCilindrada").val());
    });
    $("#txtAnio").bind("change", function (event, ui) {
        ruta.actualizarDatos('a�o', $("#txtAnio").val());
    });
    $("#txtColor").bind("change", function (event, ui) {
        ruta.actualizarDatos('color', $("#txtColor").val());
    });
    $("#txtAutomotora").bind("change", function (event, ui) {
        ruta.actualizarDatos('automotora', $("#txtAutomotora").val());
    });
    $("#txtEncargado").bind("change", function (event, ui) {
        ruta.actualizarDatos('encargadoLugar', $("#txtEncargado").val());
    });
    $("#txtFecha").bind("change", function (event, ui) {
        ruta.actualizarDatos('fechaLugar', $("#txtFecha").val());
    });
    $("#txtDireccion").bind("change", function (event, ui) {
        ruta.actualizarDatos('direccionLugar', $("#txtDireccion").val());
    });
    $("#txtComuna").bind("change", function (event, ui) {
        ruta.actualizarDatos('comuna', $("#txtComuna").val());
    });  
});

