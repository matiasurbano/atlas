var graphPoblacion, graphMasculinidad, graphDensidad // graficos c3
var graphViviendaTipo, graphViviendaCalMat, graphViviendaServBas
var graphPeaTipo, graphPeaOcupacion, graphPeaDistribucion
var graphpbgTipo, graphPbgBienes, graphpbgServicios

	function setDataGraph(data) {
		// poblacion
		setDataGraphPoblacion(data);
		setDataGraphMasculinidad(data);
		setDataGraphDensidad(data);

		// vivienda
		setDataGraphViviendaTipo(data);
		setDataGraphViviendaCalMat(data);
		setDataGraphViviendaServBas(data);

		// pea
		setDataGraphPeaTipo(data);
		setDataGraphPeaOcupacion(data);
		setDataGraphPeaDistribucion(data);

		// pbg
		setDataGraphpbgTipo(data);
		setDataGraphPbgBienes(data);
		setDataGraphPbgServicios(data);
	}


	function setDataGraphPoblacion(data) {

		var fn = function(x) {return x / 1000000;};

		graphPoblacion.load(
			{
				columns: [
							['2001'].concat(getAreaValue(data, "poblacion-2001", "sum", fn)),
							['2010'].concat(getAreaValue(data, "poblacion-2010", "sum", fn))
						]
/*				columns: [['Hab',
							getAreaValue(data, "poblacion-2001", "sum", fn),
							getAreaValue(data, "poblacion-2010", "sum", fn)
							]
						]
						*/
			}
		);

	}

	function setDataGraphMasculinidad(data) {
		// como sacar los porcentajes de Hombres y Mujeres
		// Imasc = 100 * h / m (esto dice wikipedia)
		// (H + M) -> 100%  => Imasc + 100 -> 100%  => Imasc + 100 -> 100%
		// H       -> %?    => Imasc(=H)   -> %?    => 100(=M)     -> %?

		var imasc = getAreaValue(data, "indice-masculinidad", "avg");
		var pob = getAreaValue(data, "poblacion-2010", "sum");
		var hm = imasc + 100;
		var porc_hombres = (imasc * 100 / hm).toFixed(2);
		var porc_mujeres = 100 - porc_hombres;

		graphMasculinidad.load(
			{
				columns: [
							['Hombres'].concat(porc_hombres),
							['Mujeres'].concat(porc_mujeres)
						]
			}
		);

		graphMasculinidad.poblacion_2010 = pob;
	}

	function setDataGraphDensidad(data) {

		// Se quita el agrupamiento
		if (getAreaSelected() === 'Partidos')	// agrupo por la cantidad
			data = groupOthers(data.features, 'densidad,poblacion-2010,poblacion-2001,superficie', 500);
		else
			data = data.features;

		//data = data.features;

		var titles = _.map(data, function(area) { 
				return area.properties['name'];
			});
		var densidad_2001 = _.map(data, function(area) { 
				return (Number(area.properties['poblacion-2001']) / Number(area.properties['superficie'])).toFixed(2);
			});
		var densidad_2010 = _.map(data, function(area) { 
				return (Number(area.properties['poblacion-2010']) / Number(area.properties['superficie'])).toFixed(2);
			});

		graphDensidad.load(
			{
				columns: [
							['x'].concat(titles),
							['2001'].concat(densidad_2001),
							['2010'].concat(densidad_2010)
						]
			}
		);
/*

		var titles = _.map(data.features, function(area) { 
				return area.properties.name
			});
		var densidad_2001 = _.map(data.features, function(area) { 
				return (Number(area.properties['poblacion-2001']) / Number(area.properties['superficie']) / 1000).toFixed(3);
			});
		var densidad_2010 = _.map(data.features, function(area) { 
				return (Number(area.properties['poblacion-2010']) / Number(area.properties['superficie']) / 1000).toFixed(3);
			});

		graphDensidad.load(
			{
				columns: [
							['x'].concat(titles),
							['2001'].concat(densidad_2001),
							['2010'].concat(densidad_2010)
						]
			}
		);
*/


	}

	function groupOthers(data, fields, nRecords) {
		var data = _.clone(data);
		var dataGrouped = [];
		var dataSum = [];
		var record = {properties: []};

		fields = fields.split(",");

		// ordeno por el primer campo
		dataSort = _.sortBy(data, function(x) { 
								return -1 * Number(x.properties[fields[0]]);
							});

		// tomo los nRecords mas grandes
		dataGrouped = _.take(dataSort, nRecords);

		// tomo los restantes para sumar
		dataSum = _.slice(dataSort, nRecords);	

		// acumulo los fields pasados como parametros
		_.forEach(fields, function (x) {
					record['properties'][x] = _.sum(dataSum, function (y) {
							return y.properties[x];
						})
					}
				);

		record.properties['name'] = '';

		dataGrouped.push(record);
		return dataGrouped;

	}

	function setDataGraphViviendaTipo(data) {
		var fn = function(x) {return x / 1000000;};

		var casa = getAreaValue(data,'vivienda-casa-a,vivienda-casa-b,vivienda-casa-ni', 'sum', fn);
		var rancho = getAreaValue(data,'vivienda-rancho', 'sum', fn);
		var casilla = getAreaValue(data,'vivienda-casilla', 'sum', fn);
		var departamento = getAreaValue(data,'vivienda-departamento', 'sum', fn);
		var inquilinato = getAreaValue(data,'vivienda-inquilinato', 'sum', fn);
		var hotel = getAreaValue(data,'vivienda-hotel', 'sum', fn);
		var local = getAreaValue(data,'vivienda-local', 'sum', fn);
		var movil = getAreaValue(data,'vivienda-movil', 'sum', fn);

		var total = casa + rancho + casilla + departamento + inquilinato + hotel + local + movil;

		graphViviendaTipo.load(
			{
				columns: [
					['x', 'Casa', 'Rancho', 'Casilla', 'Departamento', 'Pieza en Inq.', 'Pieza en hotel', 'Local', 'Movil'],
					['Cantidad', casa, rancho, casilla, departamento, inquilinato, hotel, local, movil]
				],
			}
		);

		graphViviendaTipo.total = total;

	}

	function setDataGraphViviendaCalMat(data) {
		var fn = function(x) {return x / 1000;};

		graphViviendaCalMat.load(
			{
				columns: [
							['CalMat I'].concat(getAreaValue(data, "vivienda-calmat-1", "sum", fn)),
							['CalMat II'].concat(getAreaValue(data, "vivienda-calmat-2", "sum", fn)),
							['CalMat III'].concat(getAreaValue(data, "vivienda-calmat-3", "sum", fn)),
							['CalMat IV'].concat(getAreaValue(data, "vivienda-calmat-4", "sum", fn))
						]
			}
		);

	}

	function setDataGraphViviendaServBas(data) {

		var satisfactoria = getAreaValue(data, "vivienda-satisfactoria", "sum");
		var basica = getAreaValue(data, "vivienda-basica", "sum");
		var insuficiente = getAreaValue(data, "vivienda-insuficiente", "sum");
		var total = satisfactoria + basica + insuficiente;

		var porc_satisfactoria = (satisfactoria * 100 / total).toFixed(1);
		var porc_basica = (basica * 100 / total).toFixed(1);
		var porc_insuficiente =  100 - porc_satisfactoria - porc_basica;

		graphViviendaServBas.load(
			{
				columns: [
							['Satisfactoria'].concat(porc_satisfactoria),
							['Basica'].concat(porc_basica),
							['Insuficiente'].concat(porc_insuficiente)
						]
			}
		);

		graphViviendaServBas.values = {};
		graphViviendaServBas.values['Satisfactoria'] = satisfactoria;
		graphViviendaServBas.values['Basica'] = basica;
		graphViviendaServBas.values['Insuficiente'] = insuficiente;

	}

	function setDataGraphPeaTipo(data) {
		var fn = function(x) {return x / 1000000;};

		graphPeaTipo.load(
			{
				columns: [
							['Activa'].concat(getAreaValue(data, "pea-ocupada,pea-desocupada", "sum", fn)),
							['Inactiva'].concat(getAreaValue(data, "no-pea", "sum", fn))
						]
			}
		);

	}

	function setDataGraphPeaOcupacion(data) {
		var ocupada = getAreaValue(data, "pea-ocupada", "sum");
		var desocupada = getAreaValue(data, "pea-desocupada", "sum");
		var total = ocupada + desocupada;

		var porc_ocupada = (ocupada * 100 / total).toFixed(1);
		var porc_desocupada =  (100 - porc_ocupada).toFixed(1);

		graphPeaOcupacion.load(
			{
				columns: [
							['Ocupada'].concat(porc_ocupada),
							['Desocupada'].concat(porc_desocupada)
						]
			}
		);

		graphPeaOcupacion.values = {};
		graphPeaOcupacion.values['Ocupada'] = ocupada;
		graphPeaOcupacion.values['Desocupada'] = desocupada;
	}

	function setDataGraphPeaDistribucion(data) {
		var fn = function(x) {return x / 1000000;};

		var ocupada = getAreaValue(data,'pea-ocupada', 'sum', fn);
		var desocupada = getAreaValue(data,'pea-desocupada', 'sum', fn);
		var inactiva = getAreaValue(data,'no-pea', 'sum', fn);

		graphPeaDistribucion.load(
			{
				columns: [
					['x', 'Ocupada', 'Desocupada', 'Inactiva'],
					['Cantidad', Number(ocupada), Number(desocupada), Number(inactiva)]
				],
			}
		);

		graphPeaDistribucion.total = ocupada + desocupada + inactiva;
	}

	function setDataGraphpbgTipo(data) {
		var fn = function(x) {return x / 1000000;};

		graphpbgTipo.load(
			{
				columns: [
							['Bienes'].concat(getAreaValue(data, "pbg-a,pbg-b,pbg-c,pbg-d,pbg-e,pbg-f", "sum", fn)),
							['Servicios'].concat(getAreaValue(data, "pbg-g,pbg-h,pbg-i,pbg-j,pbg-k,pbg-l,pbg-m,pbg-n,pbg-o,pbg-p", "sum", fn))
						]
			}
		);

	}

	function setDataGraphPbgBienes(data) {
		var pbg_a = getAreaValue(data,'pbg-a', 'sum');
		var pbg_b = getAreaValue(data,'pbg-b', 'sum');
		var pbg_c = getAreaValue(data,'pbg-c', 'sum');
		var pbg_d = getAreaValue(data,'pbg-d', 'sum');
		var pbg_e = getAreaValue(data,'pbg-e', 'sum');
		var pbg_f = getAreaValue(data,'pbg-f', 'sum');
/*
							"Agricultura, ganadería, caza y silvicultura",
							"Pesca explotación de criaderos de peces y granjas piscícolas y servicios conexos",
							"Explotación de minas y canteras",
							"Industria Manufacturera",
							"Electricidad, gas y agua",
							"Construcción"
*/

		graphPbgBienes.load(
			{
				columns: [
					[
							'x',
							"A",
							"B",
							"C",
							"D",
							"E",
							"F"
						],
					['Cantidad', pbg_a, pbg_b, pbg_c, pbg_d, pbg_e, pbg_f]
				]				
			}
		);
		graphPbgBienes.total = pbg_a + pbg_b + pbg_c + pbg_d + pbg_e + pbg_f
	}


	function setDataGraphPbgServicios(data) {
		var pbg_g = getAreaValue(data,'pbg-g', 'sum');
		var pbg_h = getAreaValue(data,'pbg-h', 'sum');
		var pbg_i = getAreaValue(data,'pbg-i', 'sum');
		var pbg_j = getAreaValue(data,'pbg-j', 'sum');
		var pbg_k = getAreaValue(data,'pbg-k', 'sum');
		var pbg_l = getAreaValue(data,'pbg-l', 'sum');
		var pbg_m = getAreaValue(data,'pbg-m', 'sum');
		var pbg_n = getAreaValue(data,'pbg-n', 'sum');
		var pbg_o = getAreaValue(data,'pbg-o', 'sum');
		var pbg_p = getAreaValue(data,'pbg-p', 'sum');

		graphpbgServicios.load(
			{
				columns: [
					[
							'x',
							"G", 
							"H", 
							"I", 
							"J", 
							"K", 
							"L", 
							"M", 
							"N", 
							"O", 
							"P"
						],
					['Cantidad', pbg_g, pbg_h, pbg_i, pbg_j, pbg_k, pbg_l, pbg_m, pbg_n, pbg_o, pbg_p]
				],
			}
		);

		graphpbgServicios.total = pbg_g + pbg_h + pbg_i + pbg_j + pbg_k + pbg_l + pbg_m + pbg_n + pbg_o + pbg_p;
	}


	function getAreaValue(data, propName, op, fn) {
		var names = propName.split(',');
		
		if (fn === undefined)
			fn = function (x) {return x;}

		if (data === undefined) return 0;

		var value = _.sum(data.features, function(area) {
						return _.sum(names, function(name) { 
							return fn(Number(area.properties[name])); 
						});
					});

		if (op === 'avg')
			value /= data.features.length;

		return value;

	}


	function initGraphics() {

		graphPoblacion = c3.generate({
			bindto: '#poblacionVBars',
		    size: {
		        height: 150,
		        width: 250
		    },
		    data: {
		    	//x: 'x',
/*		    	columns: [
		    				['x', '2001', '2010'],
		    				['Hab', 0, 0]
		    			],*/
		        columns: [
		            ['2001', 150],
		            ['2010', 180]
		        ],
		        type: 'bar'
		        /*,
		        color: function (color, d) {
		            var colors = ['#00ff00', '#0000ff']

		            // d will be 'id' when called for legends
		            return d.id && d.index === 1 ? colors[1] : colors[0];
		        }*/
		    },
			axis: {
					x: {
			            type: 'category', // this needed to load string x value
			            tick: {
				                // this also works for non timeseries data
				                format: function (x) { return ""; }
			            	}		            
			          },
		        	y: {
			            tick: {
				                // this also works for non timeseries data
				                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				                format: function (x) { return x; }
			            	}		            
		            }
		        },		    
		    bar: {
		        width: {
		            ratio: 0.8 // this makes bar width 50% of length between ticks
		        }
		        //width: 100 // this makes bar width 100px
		    },
		    color: {
		 //       pattern: ['#05AFF2', '#F28850', '#05C7F2', '#F26E50', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
		    tooltip: {
		        format: {
		            //title: function (d) { return 'Habitantes'; },
		            value: function (value, ratio, id) {
						return (value * 1000000).toFixed(0);
		            }
		        }
    		}
		});

	 	graphMasculinidad = c3.generate({
			bindto: '#poblacionPie',
		    size: {
		        height: 150,
		        width: 250
		    },
		    data: {
		        // iris data from R
		        columns: [
		            ['Hombres', 30],
		            ['Mujeres', 120],
		        ],
		        type : 'pie',
		        onclick: function (d, i) { console.log("onclick", d, i); },
		        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
		        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		    },
		    pie: {
		        label: {
		            format: function (value, ratio, id) {
		                return '';
		            }
		        }
		    },
		    color: {
		        //pattern: ['#05AFF2', '#F28850', '#05C7F2', '#F26E50', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
		    tooltip: {
		        format: {
		            title: function (d) { return ''; },
		            value: function (value, ratio, id) {
									return value + '%'; //<br>' + (value * graphMasculinidad.poblacion_2010 / 100).toFixed(0);
		            }
		        }
    		}		    
		});

		graphDensidad = c3.generate({
			bindto: '#poblacionHBars',
		    size: {
		        height: 400,
		        width: 250
		    },
			data: {
				x : 'x',
				columns: [
				['x', 'San martín', 'Morón', 'La Matanza', 'Avellaneda', 'Ezeiza', 'Merlo'],
				['2001', 30, 200, 100, 400, 150, 250],
				['2010', 50, 20, 10, 40, 15, 25]
				],
				type: 'bar'
			},
			axis: {
					x: {
			            type: 'category' // this needed to load string x value
			          },
		        	y: {
			            tick: {
				                // this also works for non timeseries data
				                values: [0, 2000, 4000, 6000, 8000, 10000],
				                //,
				                format: function (x) { return x / 1000; }
			            	}
		            },
		        rotated: true
	        },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#05C7F2', '#F26E50', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
		    tooltip: {
		        format: {
		            title: function (d) {
		            	var titx = graphDensidad.categories();
		            	return 'Hab/Km<sup>2</sup> - ' + titx[d]; 
		            },
		            value: function (value, ratio, id) {
						return (value).toFixed(0);
		            }
		        }
    		}
	    });

		graphViviendaTipo = c3.generate({
			bindto: '#viviendaHBars',
		    size: {
		        height: 150,
		        width: 250
		    },
			data: {
				x : 'x',
				columns: [
					['x', 'Casa', 'Rancho', 'Casilla', 'Departamento', 'Pieza en Inquilinato', 'Pieza en hotel', 'Local', 'Movil'],
					['Cantidad', 50, 20, 10, 40, 15, 25, 10]
				],
				type: 'bar'
			},
			axis: {
					x: {
			            type: 'category' // this needed to load string x value
			          },
		        	y: {
			            tick: {
				                // this also works for non timeseries data
				                values: [0, 1, 2, 3]
				                /*
				                format: function (x) { return Math.round(x / 1000000) + "M"; }
				                */
			            	}		            
		        },
	        	rotated: true
	        },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#05C7F2', '#F26E50', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
		    tooltip: {
		        format: {
		            title: function (d) { 
		            	var titx = graphViviendaTipo.categories();
		            	return '2010: ' + titx[d];
		            },
					value: function (value, ratio, id) {
					    return (value * 1000000).toFixed(0) + '<br/>' + ((value * 100) / graphViviendaTipo.total).toFixed(2) + "%";
		            }
		        }
		    },
		    legend: {
		        show: false
		    }
	    });

		graphViviendaCalMat = c3.generate({
			bindto: '#viviendaVBars',
		    size: {
		        height: 150,
		        width: 250
		    },
		    data: {
		        columns: [
					['CalMat I', 1],
					['CalMat II', 2],
					['CalMat III', 3],
					['CalMat IV', 4]
		        ],
		        type: 'bar'
		    },
		    bar: {
		    		zerobased: false,
		        width: {
		            ratio: 0.8 // this makes bar width 50% of length between ticks
		        }	
		    },
    		axis : {
        		x : {
            		type : 'category',
            		tick: {
                		format: function (x) { return ""; }
              //format: '%Y' /category/ format string is also available for timeseries data
            		}
        		}
    		},
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#6AA373', '#FFC85B', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
    		tooltip: {
		        format: {
		            title: function (d) {
		            	return '2010: Cantidad de viviendas'; 
		            },
		            value: function (value, ratio, id) {
									return (value * 1000).toFixed(0);
		            }
		        }
    		}
		});


	 	graphViviendaServBas = c3.generate({
			bindto: '#viviendaPie',
		    size: {
		        height: 150,
		        width: 250
		    },
		    data: {
		        // iris data from R
		        columns: [
		            ['Satisfactoria', 30],
		            ['Basica', 60],
		            ['Insuficiente', 120],
		        ],
		        type : 'pie',
		        onclick: function (d, i) { console.log("onclick", d, i); },
		        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
		        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		    },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#6AA373', '#FFC85B', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']

		    },
		    pie: {
		        label: {
		            format: function (value, ratio, id) {
		                return ""; //(value).toFixed(1);
		            }
		        }
		    },
		    tooltip: {
		        format: {
		            title: function (d) { 
		            	return '2010';
		            },	
					value: function (value, ratio, id) {
					    return value + '%'; // <br/> ' + graphViviendaServBas.values[id].toFixed(0);
		            }
		        }
		    }
		});

		graphPeaTipo = c3.generate({
			bindto: '#peaVBars',
		    size: {
		        height: 150,
		        width: 250
		    },
		    data: {
		        columns: [
		            ['Activa', 150 ],
		            ['Inactiva', 180]
		        ],
		        type: 'bar'
		        /*,
		        colors: {
		        	'Activa': '#1F77B4',
//					'Ocupada': '#1F77B4',
//					'Desocupada': '#3481B7',
					'Inactiva': '#AEC7E8'
	    		}*/
		    },
    		axis : {
        		x : {
            		type : 'category',
            		tick: {
                		format: function (x) { return ""; }
              //format: '%Y' /category/ format string is also available for timeseries data
            		}
        		},
	        	y: {
		            tick: {
			                // this also works for non timeseries data
			                values: [0, 1, 2, 3, 4, 5, 6],
			                format: function (x) { return Math.round(x); }
		            	}		            
	            },	        		
    		},		    
		    bar: {
		        width: {
		            ratio: 0.8 // this makes bar width 50% of length between ticks
		        }
		        //width: 100 // this makes bar width 100px
		    },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#6AA373', '#FFC85B', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
    		tooltip: {
		        format: {
		            title: function (d) {
		            	return '2010: Cantidad de poblacion'; 
		            },
		            value: function (value, ratio, id) {
						return (value * 1000000).toFixed(0);
		            }
		        }
    		}
		});

	 	graphPeaOcupacion = c3.generate({
			bindto: '#peaPie',
		    size: {
		        height: 150,
		        width: 250
		    },
		    data: {
		        // iris data from R
		        columns: [
		            ['Ocupada', 30],
		            ['Desocupada', 60]
		        ],
		        type : 'pie',
		        onclick: function (d, i) { console.log("onclick", d, i); },
		        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
		        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		    },
		    pie: {
		        label: {
		            format: function (value, ratio, id) {
		                return ''; //	value;
		            }
		        }
		    },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#6AA373', '#FFC85B', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
		    tooltip: {
		        format: {
		            title: function (d) { 
		            	return '2010';
		            },
					value: function (value, ratio, id) {
					    return value + '%<br/> ' + graphPeaOcupacion.values[id].toFixed(0);
		            }
		        }
		    }
		});

		graphPeaDistribucion = c3.generate({
			bindto: '#peaHBars',
		    size: {
		        height: 150,
		        width: 250
		    },
			data: {
				x : 'x',
				columns: [
					['x', 'Ocupada', 'Desocupada ', 'Inactiva'],
					['Cantidad', 50, 20, 10]
				],
				type: 'bar'
/*				,
		        colors: {
							'x': '#FFFFFF',
							'Ocupada': '#05AFF2',
							'Desocupada': '#F28850',
							'Inactiva': '#6AA373'
		    		},
		        color: function(inColor, data) {
		            var colors = ['#05AFF2','#F28850', '#6AA373'];
		            if(data.index !== undefined) {
		                return colors[data.index];
		       		}
		            return inColor;
        		}
  */      		
			},
			axis: {
					x: {
			            type: 'category' // this needed to load string x value
			          },
		        	y: {
			            tick: {
				                // this also works for non timeseries data
				                values: [0, 1, 2, 3, 4, 5],
				                format: function (x) { return Math.round(x); }
			            	}		            
		            },		          
		          rotated: true
	        },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#6AA373', '#FFC85B', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
    		tooltip: {
		        format: {
		            title: function (d) {
		            	var title = ['Ocupada', 'Desocupada', 'Inactiva'];
		            	return '2010: ' + title[d]; 
		            },
					value: function (value, ratio, id) {
					    return ((value * 100) / graphPeaDistribucion.total).toFixed(1) + '%<br/> ' + (value * 1000000).toFixed(0);
		            }		            
		        }
    		},
			legend: {
				show: false
			}

	    });

		graphpbgTipo = c3.generate({
			bindto: '#pbgVBars',
		    size: {
		        height: 150,
		        width: 250
		    },
		    data: {
		        columns: [
		            ['Bienes', 150 ],
		            ['Servicios', 180]
		        ],
		        type: 'bar'
		    },
		    
    		axis : {
        		x : {
            		type : 'category',
            		tick: {
                		format: function (x) { return ""; }
              //format: '%Y' /category/ format string is also available for timeseries data
            		}
        		}
    		},		    
		    bar: {
		        width: {
		            ratio: 0.8 // this makes bar width 50% of length between ticks
		        }
		        //width: 100 // this makes bar width 100px
		    },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#6AA373', '#FFC85B', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
		    tooltip: {
		        format: {
		            title: function (d) { 
		            	var titx = graphpbgTipo.categories();
		            	return '2005: Cantidad tipo de produccion';
		            },
					value: function (value, ratio, id) {
					    return (value * 1000000).toFixed(0);
		            }
		        }
		    }

		});


		graphPbgBienes = c3.generate({
			bindto: '#pbgHBars1',
		    size: {
		        height: 150,
		        width: 250
		    },
			data: {
				x : 'x',
				columns: [
					[
							'x',
							"A",
							"B",
							"C",
							"D",
							"E",
							"F"
						],
					['Cantidad', 50, 20, 10, 60, 52, 75]
				],
				type: 'bar'
			},
			axis: {
					x: {
			            type: 'category' // this needed to load string x value
			        },
		        	y: {
			            tick: {
				                // this also works for non timeseries data
				                values: [0, 5000000, 10000000, 15000000, 20000000, 25000000],
				                format: function (x) { 
				                	return Math.round(x / 1000000); 
				                }
			            	}		            
		            },

		        	rotated: true
		        },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#6AA373', '#FFC85B', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
		    tooltip: {
		        format: {
		            title: function (d) { 
		            	var m = d === 0 ? "Agricultura, ganadería,<br/>caza y silvicultura" :
							   d === 1 ? "Pesca explotación de <br/>criaderos de peces y <br/>granjas piscícolas<br/>y servicios conexos" :
							   d === 2 ? "Explotación de minas<br/>y canteras" :
							   d === 3 ? "Industria Manufacturera" :
							   d === 4 ? "Electricidad, gas y agua" :
							   d === 5 ? "Construcción" : "";
						return "2005: " + m
					},
					value: function (value, ratio, id) {
					    return value + '<br/>' + (value * 100 / graphPbgBienes.total).toFixed(2) + '%';
		            }
		        }
		    },
		    legend: {
		        show: false
		    }
	    });


		graphpbgServicios = c3.generate({
			bindto: '#pbgHBars2',
		    size: {
		        height: 150,
		        width: 250
		    },
			data: {
				x : 'x',
				columns: [
					[
							'x',
							"G", 
							"H", 
							"I", 
							"J", 
							"K", 
							"L", 
							"M", 
							"N", 
							"O", 
							"P"
						],
					['Cantidad', 50, 20, 10, 60, 52, 75, 8, 35, 42, 66]
				],
				type: 'bar'
			},
			axis: {
					x: {
			            type: 'category' // this needed to load string x value
			          	},
		        	y: {
			            tick: {
				                // this also works for non timeseries data
				                //values: [0, 2500000, 5000000, 7500000, 10000000],
				                format: function (x) { return Math.round(x / 1000000); }
			            	}		            
			            },
		          	rotated: true
		        },
		    color: {
//		        pattern: ['#05AFF2', '#F28850', '#6AA373', '#FFC85B', '#D4D9C5', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		        pattern: ['#245D82', '#62ACDB', '#F69468', '#87585F', '#522537', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
		    },
		    tooltip: {
		        format: {
		            title: function (d) { 
		            	var m = d === 0 ? "Comercio al por mayor, <br/>al por menor, reparación <br/>de vehículos automotores, <br/>motocicletas, efectos personales <br/>y enseres domésticos" :
								d === 1 ? "Servicios de hotelería<br/>y restaurantes" :
								d === 2 ? "Servicio de transporte,<br/>de almacenamiento<br/>y de comunicaciones" :
								d === 3 ? "Intermediación financiera<br/>y otros servicios financieros" :
								d === 4 ? "Servicios inmobiliarios,<br/>empresariales  y de alquiler" :
								d === 5 ? "Administración pública, defensa<br/>y seguridad social obligatoria" :
								d === 6 ? "Enseñanza" :
								d === 7 ? "Servicios sociales<br/>y de salud" :
								d === 8 ? "Servicios comunitarios,<br/>sociales y personales N.C.P." :
								d === 9 ? "Hogares privados con<br/>servicio doméstico" : "";
						return "2005: " + m
					},
					value: function (value, ratio, id) {
					    return value + '<br/>' + (value * 100 / graphpbgServicios.total).toFixed(2) + '%';
		            }
		        }
		    },
		    legend: {
		        show: false
		    }
	    });

	}
