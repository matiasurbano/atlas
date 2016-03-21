

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

	L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
		maxZoom: 29,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);


	// control that shows state info on hover
	var info = L.control({
		position:'bottomright'
	});

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};


	info.update = function (props) {
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
	};


	getTabSelected = function() {
		return $('.nav-tabs .active').text().trim();
	}

	getMapSelected = function(props) {
		return (props["barrio"] !== undefined ? "Barrio" : props.type);
	}

	getDataSelected = function(props) {

		if (props === undefined) return [];

		var tabSelected = getTabSelected();

		if (getMapSelected(props) === "Barrio")
			return [
						{name : "Tipo", value : props.tipo},
						{name : "Barrio", value : props.barrio},
						{name : "Hogares", value : props.hog},
						{name : "Viviendas", value : props.viv},
						{name : "Habitantes", value : props.hab}
					];
		if (tabSelected === 'Población')
			return [
						{name : "Tipo de Dato", value : "Población"},
						{name : "Nombre", value : props["name"]},
						{name : "Censo 2001", value : props["poblacion-2001"]},
						{name : "Censo 2010", value : props["poblacion-2010"]},
						{name : "Densidad", value : props["densidad"]},
						{name : "Masculinidad", value : props["indice-masculinidad"]}
					];
		else if (tabSelected === 'Vivienda')
			return [
						{name : "Tipo de Dato", value : "Vivienda"},
						{name : "Nombre", value : props["name"]},
						{name : "Casas", value : Number(props["vivienda-casa-a"]) + Number(props["vivienda-casa-b"]) + Number(props["vivienda-casa-ni"])},
						{name : "Casillas", value : props["vivienda-casilla"]},
						{name : "Ranchos", value : props["vivienda-rancho"]},
						{name : "Deptos", value : props["vivienda-departamento"]},
						{name : "Inquilinato", value : props["vivienda-inquilinato"]},
						{name : "Hotel", value : props["vivienda-hotel"]},
						{name : "Local", value : props["vivienda-local"]},
						{name : "Movil", value : props["vivienda-movil"]},
						{name : "Calle", value : props["vivienda-calle"]}
					];
		else if (tabSelected === 'PEA')
			return [
						{name : "Tipo de Datos", value : "PEA"},
						{name : "Nombre", value : props["name"]},
						{name : "Ocupada", value : props["pea-ocupada"]},
						{name : "Desocupada", value : props["pea-desocupada"]},
						{name : "Inactiva", value : props["no-pea"]}
					];
		else if (tabSelected === 'PBG')
			return [
						{name : "Tipo de Dato", value : "PBG"},
						{name : "Nombre", value : props["name"]},
						{name : "Bienes", value : Number(props["pbg-a"]) + Number(props["pbg-b"]) + Number(props["pbg-c"]) + Number(props["pbg-d"]) + Number(props["pbg-e"]) + Number(props["pbg-f"])},
						{name : "Servicios", value : Number(props["pbg-g"]) + Number(props["pbg-h"]) + Number(props["pbg-i"]) + Number(props["pbg-j"]) + Number(props["pbg-k"]) + Number(props["pbg-l"]) + Number(props["pbg-m"]) + Number(props["pbg-n"]) + Number(props["pbg-o"]) + Number(props["pbg-p"])}
					];
		else 
			return [];

	}

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		/*
		return d > 1000 ? '#800026' :
		       d > 500  ? '#BD0026' :
		       d > 200  ? '#E31A1C' :
		       d > 100  ? '#FC4E2A' :
		       d > 50   ? '#FD8D3C' :
		       d > 20   ? '#FEB24C' :
		       d > 10   ? '#FED976' :
		                  '#FFEDA0';
		                  */
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

		info.update(layer.feature.properties);
	}

	// restaura el color de la region sobre la cual pierde el foco
	function resetHighlightA(e) {
		geojsonA.resetStyle(e.target);
		info.update();
	}

	// restaura el color de la region sobre la cual pierde el foco
	function resetHighlightB(e) {
		geojsonB.resetStyle(e.target);
		info.update();
	}

	// encuadra la seleccion en el cuadro de visualizacion
	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	// setea los evntos sobre el mapa
	function onEachFeatureA(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlightA,
			click: zoomToFeature
		});
	}

	// setea los evntos sobre el mapa
	function onEachFeatureB(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlightB,
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

		//info.features = _.prototype.concat(infoAreas.features, infoBarrios.features);

		if (geojsonA !== undefined)
			map.removeLayer(geojsonA);

		if (geojsonB !== undefined)
			map.removeLayer(geojsonB);

		geojsonA = L.geoJson(a, {
			style: styleA,
			onEachFeature: onEachFeatureA
		}).addTo(map);

		geojsonB = L.geoJson(b, {
			style: styleB,
			onEachFeature: onEachFeatureB
		}).addTo(map);

	}


	function areasHtml(list, name) {
		var name_field = name || "name";

		var html = "<div class='checkbox'>" +
					"	<label><input id='area_todos' type='checkbox' value='Todos' checked onclick='areasDisabled("+ '"todos"' +");'>Todos</label>" +
					"</div>";

		html += "<div class='checkbox'>" +
							"	<label><input id='area_ninguno' type='checkbox' value='Ninguno' onclick='areasDisabled(" + '"ninguno"' + ");'>Ninguno</label>" +
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

	function areasDisabled(option) {
		var allAreas = getAreasSelected().features;
		var todosCheck = false;
		var ningunoCheck = false;

		if(option === 'todos')
			$('#area_ninguno')[0].checked = false;
		else if(option === 'ninguno')
			$('#area_todos')[0].checked = false;

		todosCheck = $('#area_todos')[0].checked;
		ningunoCheck = $('#area_ninguno')[0].checked;

		for (var i = 0; i < allAreas.length; i++) {
			// no se porque carajo me lo toma como un array de controles...
			$('#area_' + allAreas[i].properties.id)[0].disabled = (todosCheck || ningunoCheck);

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


