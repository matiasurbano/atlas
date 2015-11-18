

var partidos = getPartidos();

var zonas = getZonas(partidos);
var cordones = getCordones(partidos);
var cuencas = getCuencas(partidos);
var barrios = getBarrios();

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

var map = L.map('map').setView([-34.605651, -58.441538], 9);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
		maxZoom: 29,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);


	// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Datos de Seleccion</h4>' +  (props ?
			"Tipo: " + '<b>' + (props.tipo || props.type || "") + '</b><br/>' +
			"Nombre: " + '<b>' + (props.barrio || props.name || "") + '</b><br/>' +
			"Hogares: "	+ (props.hog || "Sin espefificar") + '<br/>' +
			"Viviendas: "	+ (props.viv || "Sin espefificar") + '<br/>' +
			"Habitantes: "	+ (props.hab || "Sin espefificar")
			: 'Posicionese sobre un area marcada');

	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 1000 ? '#800026' :
		       d > 500  ? '#BD0026' :
		       d > 200  ? '#E31A1C' :
		       d > 100  ? '#FC4E2A' :
		       d > 50   ? '#FD8D3C' :
		       d > 20   ? '#FEB24C' :
		       d > 10   ? '#FED976' :
		                  '#FFEDA0';
	}

	function styleA(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
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

		info.update(layer.feature.properties);
	}

	// restaura el color de la region sobre la cual pierde el foco
	function resetHighlight(e) {
		geojsonA.resetStyle(e.target);
		info.update();
	}

	// encuadra la seleccion en el cuadro de visualizacion
	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	// setea los evntos sobre el mapa
	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	// crea el mapa con estilo y eventos
/*	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
*/
	// map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

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


	function getAreasSelected() {
		// no se porque carajo retorna un array
		if ($("#cbo_areas")[0].value === undefined) return;

		return _.clone(areas[$("#cbo_areas")[0].value]);
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

		//info.features = _.prototype.concat(infoAreas.features, infoBarrios.features);

		if (geojsonA !== undefined)
			map.removeLayer(geojsonA);

		if (geojsonB !== undefined)
			map.removeLayer(geojsonB);

		geojsonA = L.geoJson(a, {
			style: styleA,
			onEachFeature: onEachFeature
		}).addTo(map);

		geojsonB = L.geoJson(b, {
			style: styleB,
			onEachFeature: onEachFeature
		}).addTo(map);

	}


	function areasHtml(list, name) {
		var name_field = name || "name";

		var html = "<div class='checkbox'>" +
					"	<label><input id='area_todos' type='checkbox' value='Todos' checked onclick='areasDisabled();'>Todos</label>" +
					"</div>";

		for (var i = 0; i < list.length; i++) {
			html +=	"<div class='checkbox'>" +
					"	<label><input id='area_" + list[i].properties.id + "' type='checkbox' value='" + list[i].properties.id + "' checked disabled onclick='setAreas();'>" + list[i].properties[name_field] + "</label>" +
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

		EventBus.publish('AREA_CHANGE',{
			tipo: $("#cbo_areas")[0].value,
			areas: infoAreas.features
		});
	}

	function areasDisabled() {
		var allAreas = getAreasSelected().features;
		var todos_check = $('#area_todos')[0].checked;

		for (var i = 0; i < allAreas.length; i++) {
			// no se porque carajo me lo toma como un array de controles...
			$('#area_' + allAreas[i].properties.id)[0].disabled = todos_check;

			if (todos_check)
				$('#area_' + allAreas[i].properties.id)[0].checked = true;
		}

 		// seteo las areas seleccionadas
 		if (todos_check)
			infoAreas.features = allAreas;

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

		$("#lst_barrios").html(barriosHtml(infoBarrios.features, "barrio"));

		// dibujo el mapa
		//drawAreas(infoAreas, infoBarrios);
	}

	function barriosHtml(list, name) {
		var name_field = name || "name";

		var html = "<div class='checkbox'>" +
					"	<label><input id='barrio_todos' type='checkbox' value='Todos' checked onclick='barriosDisabled(" + '"todos"' + ");'>Todos</label>" +
					"</div>";

		html += "<div class='checkbox'>" +
					"	<label><input id='barrio_ninguno' type='checkbox' value='Ninguno' onclick='barriosDisabled(" + '"ninguno"' + ");'>Ninguno</label>" +
					"</div>";

		for (var i = 0; i < list.length; i++) {
			html +=	"<div class='checkbox'>" +
					"	<label><input id='barrio_" + list[i].properties.id + "' type='checkbox' value='" + list[i].properties.id + "' checked disabled onclick='setBarrios();'>" + list[i].properties[name_field] + "</label>" +
					"</div>";
		}

		return html;
	}

	function barriosDisabled(option) {
		var allBarrios = _.clone(barrios.features);
		var todosCheck = false;
		var ningunoCheck = false;

		if(option === 'todos')
			$('#barrio_ninguno')[0].checked = false;
		else if(option === 'ninguno')
			$('#barrio_todos')[0].checked = false;

		todosCheck = $('#barrio_todos')[0].checked;
		ningunoCheck = $('#barrio_ninguno')[0].checked;

		for (var i = 0; i < allBarrios.length; i++) {
			// no se porque carajo me lo toma como un array de controles...
			$('#barrio_' + allBarrios[i].properties.id)[0].disabled = (todosCheck || ningunoCheck);

			if (todosCheck)
				$('#barrio_' + allBarrios[i].properties.id)[0].checked = true;
			else if (ningunoCheck)
				$('#barrio_' + allBarrios[i].properties.id)[0].checked = false;
		}

 		// seteo las areas seleccionadas
 		if (todosCheck)
			infoBarrios.features = barrios.features;
		else if (ningunoCheck)
			infoBarrios.features = [];

		// seteo las areas en el mapa
		drawMap();

	}

	function setBarrios() {
		var items = [];
		var allBarrios = _.clone(barrios.features);

		// obtengo el array de ids seleccionados
		for (var i = 0; i < allBarrios.length; i++) {
			// no se porque carajo me lo toma como un array de controles...
			if ($('#barrio_' + allBarrios[i].properties.id)[0].checked)
				items.push(allBarrios[i].properties.id);
		}

		// en el geoJson filtro las areas seleccionadas
		infoBarrios.features = _.filter(allBarrios, function(item){
								  return _.findIndex(items, function(x) {return x === item.properties.id}) !== - 1;
								});
		// seteo las areas en el mapa
		drawMap();
	}



	$( document ).ready(function() {
		setAreasSelect();
        setBarriosSelect();

        //setData();

        drawMap();

 		initGraphics();
		setDataGraph(infoAreas);

		EventBus.subscribe('AREA_CHANGE', function(data){
			//console.log('AREA_CHANGE',data);

			setDataGraph(infoAreas);

/*
			if (data.tipo == "Cordones"){

				var filteredPartidos = _.chain(partidos).filter(function(p){
					return p.cordon = 1;
				});
				console.log(filteredPartidos);
			}
*/
			// TAB - Poblacion

			// TAB - Vivienda
		});


	});


