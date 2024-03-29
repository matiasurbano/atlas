
var barrios = getBarrios();

var partidos = getPartidos(barrios.features);

var zonas = getZonas(partidos, barrios.features);
var cordones = getCordones(partidos, barrios.features);
var cuencas = getCuencas(partidos, barrios.features);

var areas = {
				Partidos: partidos,
				Zonas: zonas,
				Cordones: cordones,
				Cuencas: cuencas
			}

var infoAreas = [];
var infoBarrios = [];

var geojsonA;	// Geojson de Area
var geojsonB;	// Geojson de Barrio

//var map = L.map('map').setView([-34.605651, -58.441538], 9);
var map = L.map('map').setView([-34.65, -58.8], 9);

	//L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
	L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
		maxZoom: 29,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);


	// control that shows state info on hover
	/*
	var info = L.control({
		position:'bottomright'
	});

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};


	info.update = function (props) {
		*/
/*
		var dataSelected = getDataSelected(props);
		var htmlData = "";

		_.forEach(dataSelected, function(data){
			htmlData += data.name + ": <b>" + data.value + "</b><br/>";
		});

		if (dataSelected.length == 0) {
			this._div.innerHTML = '\
			 <h5><i class="fa fa-exclamation-triangle"></i> \
			 Hac&eacute; click en el &iacute;cono <i class="fa fa-bars"></i>, <br> \
			 si ten&eacute;s dudas de como usar este Atlas <br> \
			 hac&eacute; click  en el &iacute;cono de la derecha <i class="fa fa-question-circle fa-5"></i>';
		}
		else {
				this._div.innerHTML = (props ? htmlData :  '' );
		}
		*/
	//};


	getTabSelected = function() {
		return $('#myTab .active').attr('name');
	}

	getMapSelected = function(props) {
		return (props["barrio"] !== undefined ? "Barrio" : props.type);
	}

	getDataSelected = function(props) {
		var casas;
		var bienes, servicios;

		if (props === undefined) return [];

		var tabSelected = getTabSelected();

		if (getMapSelected(props) === "Barrio")
			return [
						{name : "Tipo", value : props.tipo},
//						{name : "Barrio", value : props.barrio},
						{name : "Hogares", value : props.hog},
						{name : "Viviendas", value : props.viv},
						{name : "Habitantes", value : props.hab}
					];
		if (tabSelected === 'poblacion')
			return [
						{name : "Tipo de Dato", value : "Población"},
//						{name : "Nombre", value : props["name"]},
						{name : "Censo 2001", value : numberFormat(props["poblacion-2001"], 0)},
						{name : "Censo 2010", value : numberFormat(props["poblacion-2010"], 0)},
						{name : "Densidad", value : numberFormat(props["densidad"], 2)},
						{name : "Masculinidad", value : numberFormat(props["indice-masculinidad"], 2)}
					];
		else if (tabSelected === 'vivienda') {
			casas = Number(props["vivienda-casa-a"]) + Number(props["vivienda-casa-b"]) + Number(props["vivienda-casa-ni"]);

			return [
						{name : "Tipo de Dato", value : "Vivienda"},
//						{name : "Nombre", value : props["name"]},
						{name : "Casas", value : numberFormat(casas, 0)},
						{name : "Casillas", value : numberFormat(props["vivienda-casilla"], 0)},
						{name : "Ranchos", value : numberFormat(props["vivienda-rancho"], 0)},
						{name : "Deptos", value : numberFormat(props["vivienda-departamento"], 0)},
						{name : "Inquilinato", value : numberFormat(props["vivienda-inquilinato"], 0)},
						{name : "Hotel", value : numberFormat(props["vivienda-hotel"], 0)},
						{name : "Local", value : numberFormat(props["vivienda-local"], 0)},
						{name : "Movil", value : numberFormat(props["vivienda-movil"], 0)},
						{name : "Calle", value : numberFormat(props["vivienda-calle"], 0)}
					];

		} else if (tabSelected === 'pea')
			return [
						{name : "Tipo de Datos", value : "PEA"},
//						{name : "Nombre", value : props["name"]},
						{name : "Ocupada", value : numberFormat(props["pea-ocupada"], 0)},
						{name : "Desocupada", value : numberFormat(props["pea-desocupada"], 0)},
						{name : "Inactiva", value : numberFormat(props["no-pea"], 0)}
					];

		else if (tabSelected === 'pbg') {
			bienes = Number(props["pbg-a"]) + Number(props["pbg-b"]) + Number(props["pbg-c"]) + Number(props["pbg-d"]) + Number(props["pbg-e"]) + Number(props["pbg-f"]);
			servicios = Number(props["pbg-g"]) + Number(props["pbg-h"]) + Number(props["pbg-i"]) + Number(props["pbg-j"]) + Number(props["pbg-k"]) + Number(props["pbg-l"]) + Number(props["pbg-m"]) + Number(props["pbg-n"]) + Number(props["pbg-o"]) + Number(props["pbg-p"]);

			return [
						{name : "Tipo de Dato", value : "PBG"},
//						{name : "Nombre", value : props["name"]},
						{name : "Bienes", value : numberFormat(bienes, 0)},
						{name : "Servicios", value : numberFormat(servicios, 0)}
					];

		} else 
			return [];

	}

	getHtmlProperties = function(props) {

		var dataSelected = getDataSelected(props);
		var htmlData = "";

		_.forEach(dataSelected, function(data){
			htmlData += "<span style='font-weight: normal;font-size:100%;'>" + data.name + "</span>: " + data.value + "<br/>";
		});		

		return htmlData;
	}

	//info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		var area = getAreaSelected();
		return area === 'Partidos'  ? '#800026' :
		       area === 'Zonas' 	? '#BD0026' :
		       area === 'Cordones' 	? '#E31A1C' :
		       area === 'Cuencas' 	? '#FC4E2A' :
		                  			  '#FFEDA0';
			
	}

	function styleA(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.4,
			"z-index": 1,
			fillColor: getColor(feature.properties.density)
		};
	}

	function styleB(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			"z-index": 0,
			fillColor: '#FFEDA0'
		};
	}

	// ilumina la region sobre la cual hace foco
	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera) {
			//layer.bringToFront();
		}

		//info.update(layer.feature.properties);
	}

	// restaura el color de la region sobre la cual pierde el foco
	function resetHighlightA(e) {
		geojsonA.resetStyle(e.target);
		//info.update();
	}

	// restaura el color de la region sobre la cual pierde el foco
	function resetHighlightB(e) {
		geojsonB.resetStyle(e.target);
		//info.update();
	}

	// encuadra la seleccion en el cuadro de visualizacion
	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	// setea los evntos sobre el mapa
	function onEachFeatureA(feature, layer) {
		var htmlProps = getHtmlProperties(feature.properties);
		var title = (feature.properties['type'] === "partido" ? "Partido " : "");

 		layer.bindLabel( "<span style='font-size:120%;'>" + title + feature.properties['name'] + "</span><br/>" + htmlProps, { 'noHide': true });
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlightA,
			click: zoomToFeature
		});
	}

	// setea los evntos sobre el mapa
	function onEachFeatureB(feature, layer) {
		var htmlProps = getHtmlProperties(feature.properties);

 		layer.bindLabel("<span style='font-size:120%;'>" + "Barrio " + feature.properties['barrio'] + "</span><br/>" + htmlProps, { 'noHide': true });
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlightB,
			click: zoomToFeature
		});
	}

	// agrega cuadro de escala de colores
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10, 20, 50, 100, 200, 500, 1000],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	// legend.addTo(map);

	function getAreaSelected() {
		return $("#cbo_areas")[0].value;
	}


	function getAreasSelected() {
		// no se porque carajo retorna un array
		if ($("#cbo_areas")[0].value === undefined) return;

		return _.clone(areas[getAreaSelected()]);
	}


	function setAreasSelect(tipo) {
		// seteo el geoJson
		infoAreas = getAreasSelected();

		EventBus.publish('AREA_CHANGE',{
			tipo: tipo,
			areas: infoAreas.features
		});

		// reemplazo el div de areas
		$("#lst_areas").html(areasHtml(infoAreas.features));

		// dibujo el mapa
		drawMap();
	}

	function drawMap() {

		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// ver si en lugar de setear el geoJson de nuevo se pueden deshabilitar las regiones
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var a = _.clone(infoAreas);
		var b = _.clone(infoBarrios);

		if (geojsonA !== undefined)
			map.removeLayer(geojsonA);

		if (geojsonB !== undefined)
			map.removeLayer(geojsonB);

		geojsonA = L.geoJson(a, {
			style: styleA,
			onEachFeature: onEachFeatureA
		})
		.addTo(map);

		geojsonB = L.geoJson(b, {
			style: styleB,
			onEachFeature: onEachFeatureB
		})
		.addTo(map);

	}


	function areasHtml(list, name) {
		var name_field = name || "name";

		html = "<div class='checkbox'>" +
				"	<label><input id='area_todos' type='checkbox' value='Todos' checked onclick='areasDisabled(" + '"todos"' + ");'>Seleccionar todo</label>" +
				"</div>";


		list = _.map(list, _.values);

		for (var i = 0; i < list.length; i++) {
			html +=	"<div class='checkbox'>" +
					"	<label><input id='area_" + list[i][1].id + "' type='checkbox' value='" + list[i][1].id + "' checked onclick='setAreas();'>" + list[i][1][name_field] + "</label>" +
					"</div>";
		}

		return html;
	}

	function setAreas() {
		var items = [];
		var allAreas = getAreasSelected().features;



		// obtengo el array de ids seleccionados
		for (var i = 0; i < allAreas.length; i++) {
			// no se porque carajo me lo toma como un array de controles...
			if ($('#area_' + allAreas[i].properties.id)[0].checked)
				items.push(allAreas[i].properties.id);
		}

		// en el geoJson filtro las areas seleccionadas
		infoAreas.features = _.filter(allAreas, function(item){
								  return _.findIndex(items, function(x) {return x === item.properties.id}) !== - 1;
								});

		// seteo las areas en el mapa
		drawMap();

		if (items.length === 0)
			$('#area_todos').prop("indeterminate", false).prop('checked', false);
		else if (items.length === allAreas.length)
			$('#area_todos').prop("indeterminate", false).prop('checked', true);
		else
			$('#area_todos').prop("indeterminate", true);


		EventBus.publish('AREA_CHANGE',{
			tipo: $("#cbo_areas")[0].value,
			areas: infoAreas.features
		});
	}

	function areasDisabled(option) {
		var allAreas = getAreasSelected().features;
		var todosCheck = false;
		var ningunoCheck = false;

		todosCheck = $('#area_todos')[0].checked;
		ningunoCheck = !(todosCheck);

		for (var i = 0; i < allAreas.length; i++) {
			// no se porque carajo me lo toma como un array de controles...
			if (todosCheck)
				$('#area_' + allAreas[i].properties.id)[0].checked = true;
			else if (ningunoCheck)
				$('#area_' + allAreas[i].properties.id)[0].checked = false;
		}

 		// seteo las areas seleccionadas
 		if (todosCheck)
			infoAreas.features = allAreas;
		else if (ningunoCheck)
			infoAreas.features = [];

		// seteo las areas en el mapa
		drawMap();

		EventBus.publish('AREA_CHANGE',{
			tipo: $("#cbo_areas")[0].value,
			areas: infoAreas.features
		});

	}

	function setBarriosSelect() {
		// no se porque carajo retorna un array
		//console.log($("#cbo_areas")[0].value);

		// seteo el geoJson
		infoBarrios = _.clone(barrios);

		$("#lst_barrios").html(barriosHtml(infoAreas.features, infoBarrios.features, "barrio"));

	}


	function barriosHtml(areaList, list, name) {
		var name_field = name || "name";
		var barrioList = [];
		var areaCodigo = "";
		var areasBarrios = getAreaBarrios(areaList);

		html = "<div class='checkbox' >" +
				"	<label><input id='barrio_todos' type='checkbox' value='Todos' checked onclick='barriosDisabled(" + '"todos"' + ");'>Seleccionar todo</label>" +
				"</div>";

		for (var i = 0; i < areasBarrios.length; i++) {

			barrioList = getBarriosArea(barrios.features, areasBarrios[i]);

			areaCodigo = areasBarrios[i].properties.codigo;

			html +=	"<div class='checkbox'>" +
					"	<label >" +
					"		<input id='chk-areabarrio-" + areaCodigo + "' type='checkbox' value='" + areasBarrios[i].properties.id + "' checked onclick='setAreaBarrios(" + '"' + areaCodigo + '"' + ");'>" + 
							areasBarrios[i].properties.name + 
					"	</label>" +
					"	<a class='btn-expand' id='lnk-areabarrio-" + areaCodigo + "-down' onclick='barriosVisible(" + '"' + areaCodigo + '", "down"' + ")' href='#'>" +
					"   	<span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>" +
					"	</a>" +
					"	<a class='btn-contract' id='lnk-areabarrio-" + areaCodigo + "-up' onclick='barriosVisible(" + '"' + areaCodigo + '", "up"' + ")' href='#'>" +
					"   	<span class='glyphicon glyphicon-menu-up' aria-hidden='true'></span>" +
					"	</a>" +
					"</div>";

			html += "<div id='div-areabarrio-" + areaCodigo + "' class='sub-check'>"

			for (var j = 0; j < barrioList.length; j++) {
				html +=	"<div class='checkbox'>" +
						"	<label><input id='chk-barrio-" + barrioList[j].properties.codigo + "' type='checkbox' value='" + barrioList[j].properties.id + "' checked onclick='setBarrios(" + '"' + areaCodigo + '"' + ");'>" + barrioList[j].properties[name_field] + "</label>" +
						"</div>";

						//"	<label><input id='chk-barrio-" + barrioList[j].properties.codigo + "' type='checkbox' value='" + barrioList[j].properties.id + "' checked disabled onclick='setBarrios();'>" + barrioList[j].properties[name_field] + "</label>" +

			}

			html += "</div>";	// cierra el divArea_???
		}


		return html;
	}

	function getAreaBarrios(list) {
		return _.filter(list, function(area) {
							return area.properties.contieneBarrios;
						})
	}

	function barriosVisible(areaCodigo, op) {
		var objLnkUp = document.getElementById("lnk-areabarrio-" + areaCodigo + "-up");
		var objLnkDown = document.getElementById("lnk-areabarrio-" + areaCodigo + "-down");
		var objDiv = document.getElementById("div-areabarrio-" + areaCodigo);
		if (op === "down") {
			objDiv.style.display = 'block';
			objLnkUp.style.display = 'block';
			objLnkDown.style.display = 'none';
		} else {
			objDiv.style.display = 'none';
			objLnkUp.style.display = 'none';
			objLnkDown.style.display = 'block';
		}
	}

	function getBarriosArea(barrios, area) {
		var partidos = area.properties.partidos.split(',');

		var barriosFiltered = [];

		// itero los codigo de partido y concateno la lista de barrios que pertenecen a ese partido (filter)
		_.forEach(partidos, function(partido) {
						barriosFiltered = barriosFiltered.concat(
											  		_.filter(barrios, function(barrio) {
														return barrio.properties.partido === partido;
													})
												);
				  });

		// ordeno los barrios por nombre
		barriosFiltered = _.sortByOrder(barriosFiltered, ['properties.barrio'], ['asc']);


		return barriosFiltered;
	}


	function barriosDisabled(option) {
		var allBarrios = _.clone(barrios.features);
		var allAreas = infoAreas.features;
		var todosCheck = false;
		var ningunoCheck = false;
		var barrioId = "";
		var areaId = "";

		// click Todos => uncheck Ninguno
		todosCheck = $('#barrio_todos')[0].checked;
		ningunoCheck = !(todosCheck);


		for (var i = 0; i < allAreas.length; i++) {
			if (allAreas[i].properties["contieneBarrios"]) {
				areaId = '#chk-areabarrio-' + allAreas[i].properties.codigo;

				//$(areaId)[0].disabled = (todosCheck || ningunoCheck);
				$(areaId)[0].disabled = false;

				if (todosCheck)
					$(areaId).prop("indeterminate", false).prop('checked', true);
			//		$(areaId)[0].checked = true;
				else if (ningunoCheck)
					$(areaId).prop("indeterminate", false).prop('checked', false);
//					$(areaId)[0].checked = false;

			}
		}

		for (var i = 0; i < allBarrios.length; i++) {
			barrioId = '#chk-barrio-' + allBarrios[i].properties.codigo;

			// no se porque carajo me lo toma como un array de controles...
			//$(barrioId)[0].disabled = (todosCheck || ningunoCheck);
			$(barrioId)[0].disabled = false;

			if (todosCheck)
				$(barrioId)[0].checked = true;
			else if (ningunoCheck)
				$(barrioId)[0].checked = false;
		}

 		// seteo las areas seleccionadas
 		if (todosCheck)
			infoBarrios.features = barrios.features;
		else if (ningunoCheck)
			infoBarrios.features = [];

		// seteo las areas en el mapa
		drawMap();

	}

	function setBarrios(areaCodigo) {
		var items = [];
		var allBarrios = _.clone(barrios.features);

		// obtengo el array de ids seleccionados
		for (var i = 0; i < allBarrios.length; i++) {
			// no se porque carajo me lo toma como un array de controles...
			if ($('#chk-barrio-' + allBarrios[i].properties.codigo)[0].checked)
				items.push(allBarrios[i].properties.codigo);		}

		// en el geoJson filtro las areas seleccionadas
		infoBarrios.features = _.filter(allBarrios, function(item){
								  return _.findIndex(items, function(x) {return x === item.properties.codigo}) !== - 1;
								});

		// modifico el check de Area "Seleccione todo"
		setAreaBarriosCheck(areaCodigo);

		// modifico el check de "Seleccione todo"
		setAreasCheck(getAreaBarrios(infoAreas.features));


		// seteo las areas en el mapa
		drawMap();
	}


	function setAreaBarrios(areaCodigo) {

		var x = _.findIndex(infoAreas.features, function(item){
								  return (areaCodigo === item.properties.codigo);
								});
		var checked = false;
		var allBarrios


		if (x !== -1) {
			// obtengo los barrios de un area
			barrioList = getBarriosArea(barrios.features, infoAreas.features[x]);

			// obtengo el estado de ckech del area
			checked = $('#chk-areabarrio-' + areaCodigo)[0].checked;

			// seteo el check del area en los barrios correspondientes
			for (var i = 0; i < barrioList.length; i++) {
				$('#chk-barrio-' + barrioList[i].properties.codigo)[0].checked = checked;
			}

			// redibujo el mapa
			setBarrios(areaCodigo);

			// modifico el check de "Seleccione todo"
			setAreasCheck(getAreaBarrios(infoAreas.features));
		}

	}

	function setAreasCheck(list) {
		var checked = 0;
		var indeterminated = 0;

		for (var i = 0; i < list.length; i++) {
			//if ($('#chk-areabarrio-' + list[i].properties.codigo)[0].checked && !$('#chk-areabarrio-' + list[i].properties.codigo)[0].indeterminate)
			if ($('#chk-areabarrio-' + list[i].properties.codigo)[0].checked)
				checked++;
//			else if (!$('#chk-areabarrio-' + list[i].properties.codigo)[0].checked && $('#chk-areabarrio-' + list[i].properties.codigo)[0].indeterminate)
			else if ($('#chk-areabarrio-' + list[i].properties.codigo)[0].indeterminate)
				indeterminated++;
		}

		if ((checked + indeterminated) === 0) 
			$('#barrio_todos').prop("indeterminate", false).prop('checked', false);
		else if (checked === list.length)
			$('#barrio_todos').prop("indeterminate", false).prop('checked', true);
		else
			$('#barrio_todos').prop("indeterminate", true);

	}


	function setAreaBarriosCheck(areaCodigo) {
		var cant = 0;
		var list = getBarriosArea(barrios.features, getArea(areaCodigo));

		for (var i = 0; i < list.length; i++) {
			if ($('#chk-barrio-' + list[i].properties.codigo)[0].checked)
				cant++;
		}

		if (cant === 0)
			$('#chk-areabarrio-' + areaCodigo).prop("indeterminate", false).prop('checked', false);
		else if (cant === list.length)
			$('#chk-areabarrio-' + areaCodigo).prop("indeterminate", false).prop('checked', true);
		else
			$('#chk-areabarrio-' + areaCodigo).prop("indeterminate", true).prop('checked', false);

	}

	function getArea(areaCodigo) {
  		return _.filter(infoAreas.features, function(area) {
			return area.properties.codigo === areaCodigo;
		})[0];
	}


	function numberFormat(value, n, x) {
	    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	    return parseFloat(value).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
	};

	$( document ).ready(function() {
		setAreasSelect();
        setBarriosSelect();

        drawMap();

 		initGraphics();
		setDataGraph(infoAreas);

		EventBus.subscribe('AREA_CHANGE', function(data){
			//console.log('AREA_CHANGE',data);
			setDataGraph(infoAreas);

		});


	});


