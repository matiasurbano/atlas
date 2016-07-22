

function getDataCsv() {
    var a = "" +
        "tipo_region,codigo,region,cordon,conurbano,cuencas,superficie,poblacion_2001,poblacion_2010,creacion,densidad,indice_masculinidad,vivienda_casa_a,vivienda_casa_b,vivienda_casa_ni,vivienda_casilla,vivienda_rancho,vivienda_departamento,vivienda_inquilinato,vivienda_hotel,vivienda_local,vivienda_movil,vivienda_calle,vivienda_calmat_1,vivienda_calmat_2,vivienda_calmat_3,vivienda_calmat_4,vivienda_calmat_ni,vivienda_satisfactoria,vivienda_basica,vivienda_insuficiente,vivienda_servicio_ni,hogares,hogares_nbi_con,hacinamiento_no,hacinamiento_critico,hacinamiento_ni,pea_ocupada,pea_desocupada,no_pea,pbg_a,pbg_b,pbg_c,pbg_d,pbg_e,pbg_f,pbg_g,pbg_h,pbg_i,pbg_j,pbg_k,pbg_l,pbg_m,pbg_n,pbg_o,pbg_p\r\n" +
        "partido,28,Almirante Brown,2,sur,matanza-riachuelo,129.33,515556,552902,30/09/1973,4275.13,95.6,98257,23422,10974,6116,1287,15537,350,17,213,31,14,77534,17142,8413,572,52543,21400,27872,93342,13590,156918,16423,123030,6864,27024,262451,19966,131773,446,105,3649,605821,45936,88249,341235,86274,358733,61045,509021,52361,115964,67368,95363,49603\r\n" +
        "partido,35,Avellaneda,1,sur,matanza-riachuelo,52.48,328980,342677,07/04/1852,6529.67,89.94,64254,5735,11383,1274,558,36973,663,105,341,6,15,84095,34670,21904,1945,-21322,70328,15032,18301,17631,113142,6562,97699,2481,12962,173364,11545,87169,1044,128,482,2270060,196952,104381,247124,35231,378472,91672,392756,66434,105300,104155,112480,19575\r\n" +
        "partido,91,Berazategui,2,sur,de la zona sur,221.01,287913,324244,S/D,1467.1,95.7,68205,9039,8497,3575,740,5536,284,21,118,10,4,51818,20726,12525,1179,9777,56534,8918,20796,9777,93164,9723,72675,4289,16200,153043,12690,77304,10522,128,0,683072,49482,81470,179324,49453,213992,33148,291681,71991,82956,43409,43746,24085\r\n" +
        "partido,260,Esteban Echeverría,2,sur,matanza-riachuelo,120.22,243974,300959,09/04/1913,2503.4,96.7,54938,14961,8255,2140,863,6426,402,40,115,13,11,42142,20911,13631,1271,10198,10944,15139,51872,10198,85952,9259,64657,4576,16719,144287,11164,67124,1521,26,0,787600,31801,57465,270826,24077,194503,30439,267472,17904,73268,21359,45803,25224\r\n" +
        "partido,270,Ezeiza,2,sur,matanza-riachuelo,236.81,118807,163722,20/10/1994,691.36,1,25966,11620,6691,2171,581,1913,175,2,77,8,6,19209,12668,8841,943,7543,1787,3773,36101,7543,44487,6274,31157,3231,10099,75752,5631,33271,2233,15,709,388314,26293,25789,71354,37065,135004,6402,142931,49421,36816,12677,16826,12497\r\n" +
        "partido,274,Florencio Varela,2,sur,de la zona sur,189.9,348970,426005,30/01/1891,2243.31,99.9,64912,25574,8187,8481,1416,4828,364,20,194,13,8,43152,34079,23997,2900,9861,26415,19939,57774,9861,113135,19257,77694,8298,27143,188025,16427,97471,10474,71,89,372520,30077,47378,192963,87598,226602,16950,337230,41285,89737,39471,50854,34460\r\n" +
        "partido,371,General San Martín,1,norte,reconquista,55.75,403107,414196,25/2/1864,7429.52,91.7,86752,8289,11269,2037,769,27590,779,164,355,7,19,86548,22998,11024,822,16619,64872,29197,27323,16619,133202,8936,111149,3965,18088,215691,12514,99560,5,64,942,3745314,97944,57939,389298,37191,331435,62956,467475,96336,110485,108782,94079,33142\r\n" +
        "partido,408,Hurlingham,2,oeste,reconquista,35.43,172245,181241,28/12/1994,5115.47,92.8,40855,4447,4224,976,224,4338,214,54,105,3,6,35070,10875,4256,202,5037,4250,9739,36414,5037,55122,3775,46270,1595,7257,92154,6382,43599,0,34,0,340869,25212,30993,85919,16172,89214,28367,210708,19266,56221,25693,40750,16194\r\n" +
        "partido,410,Ituzaingó,2,oeste,matanza-riachuelo,38.24,158121,167824,14/05/1995,4388.7,93.7,42064,3409,5749,830,178,1945,92,1,95,0,7,33873,9460,4514,227,6289,2690,3024,42360,6289,51444,2524,44713,1041,5690,85704,5552,39468,25,19,0,104443,16621,43332,162182,20163,77841,33594,193190,18855,45226,12044,36535,12635\r\n" +
        "partido,412,José C. Paz,2,oeste,reconquista,50.16,230208,265981,16/06/1905,5302.65,97.4,43094,18242,5953,2562,695,1302,236,29,109,9,12,30387,21579,12519,1223,6523,3426,4110,58172,6523,71722,8610,51995,4215,15512,122477,9325,61107,186,19,0,53402,14363,23963,124238,9233,119638,12328,211999,21076,71058,28602,25000,23125\r\n" +
        "partido,427,La Matanza,1,oeste,matanza-riachuelo,329.22,1255288,1775816,16/10/1854,5394.01,95.3,260665,69070,29612,14658,4464,64903,2891,149,848,46,65,228815,107864,60674,7985,41968,190782,59355,155201,41968,484909,57883,354160,24291,106458,889919,53939,387166,13864,165,1704,2380016,176318,250728,848388,118054,930086,119319,1269961,173821,303891,208556,177187,96197\r\n" +
        "partido,434,Lanús,1,sur,matanza-riachuelo,48.35,453082,459263,29/09/1944,9498.72,91,99860,9393,14898,1288,419,31352,425,60,167,5,20,99837,24242,12303,750,20735,52782,38750,45600,20735,149594,7417,128271,3589,17734,231943,15764,120210,17010,94,274,1308606,83843,74051,275339,44156,389886,107982,526811,63839,109206,90788,98760,29238\r\n" +
        "partido,490,Lomas de Zamora,1,sur,matanza-riachuelo,87.3,591345,616279,10/9/1861,7059.32,93,120147,24047,15233,3321,1466,22603,1087,42,230,10,30,107076,36443,20999,2786,20882,54644,49938,62722,20882,188844,16834,151223,7671,29950,306261,19600,149985,184,124,0,658985,101365,105205,864980,58074,618897,94533,660929,120137,212077,126893,122633,47513\r\n" +
        "partido,515,Malvinas Argentinas,2,norte,reconquista,63.09,290691,322375,20/10/1994,5109.76,97.5,58043,15917,6428,3112,779,2288,488,51,171,6,9,42742,23684,12629,1131,7097,1070,4014,75102,7097,89338,10837,66893,4644,17801,154680,11822,72598,323,19,0,692912,33344,68028,161411,17242,187983,21880,264925,25255,63983,42329,59141,40674\r\n" +
        "partido,539,Merlo,2,oeste,matanza-riachuelo,173.13,469985,528494,06/02/1905,3052.58,96.4,92694,29718,9874,5850,1280,7121,410,15,254,5,9,66674,39564,26850,2295,11838,22773,24199,88411,11838,147716,16969,109886,7927,29903,247159,18508,125926,2139,49,0,1506797,40703,49109,298375,88563,312185,40082,471296,44061,111576,56741,53211,44555\r\n" +
        "partido,568,Morón,1,oeste,matanza-riachuelo,186.13,380503,452505,S/D,2431.12,98.2,74400,28736,13672,5850,1262,5039,342,14,192,53,13,50861,35158,24688,3418,15435,17271,16480,80374,15435,124016,16025,88315,8015,27686,208872,17023,101771,3569,53,0,204894,33571,51342,289171,68482,240588,23794,392573,25785,96958,22295,66988,38070\r\n" +
        "partido,560,Moreno,2,oeste,reconquista,55.66,309380,321109,19/11/1904,5769.12,91.1,79956,4126,10978,835,241,20618,166,166,210,7,18,79259,16388,5044,245,16367,54261,20600,26075,16367,106902,3766,96137,1393,9372,166361,10575,82630,0,38,0,805499,69460,120678,416727,67761,351991,68362,393640,190135,170187,112271,163447,18224\r\n" +
        "partido,658,Quilmes,2,sur,de la zona sur,91.49,518788,582943,18/11/1904,6371.66,93.6,120658,19514,13597,5618,1252,20547,669,102,246,13,27,104801,33747,23058,2111,18499,98158,20297,45262,18499,177110,16310,143130,6816,27164,280618,20432,146746,18,195,0,1042028,109607,228816,437666,71203,449397,72651,625994,118620,166726,124775,108486,40201\r\n" +
        "partido,749,San Fernando,2,norte,reconquista,877.08,151131,163240,29/10/1821,186.12,92.9,31031,3602,4602,1017,388,10717,405,34,93,21,16,31919,8038,4515,273,7165,34846,3534,6365,7165,49384,4239,39397,1986,8001,83956,5406,36567,4954,75,0,927793,34038,40755,132979,15035,126094,18571,168543,16046,48214,28053,74110,21008\r\n" +
        "partido,756,San Isidro,1,norte,reconquista,51.44,291505,292878,25/10/1864,5693.58,89.6,66996,2652,10024,841,223,26472,181,59,128,24,19,75302,11474,4801,253,15770,74047,9985,7798,15770,97213,3555,88268,1502,7443,157191,8079,71841,0,94,1628,863065,90451,317091,873426,38867,294374,66382,444279,86610,96754,121378,114359,30368\r\n" +
        "partido,760,San Miguel,2,norte,reconquista,82.8,253086,276190,20/10/1994,3335.63,95,52097,11506,6996,1729,592,9449,370,27,111,2,13,44552,17795,9772,870,9890,16246,8099,48644,9890,80627,6592,64303,3060,13264,138484,8783,62720,0,71,0,96873,29267,37052,187692,27610,224809,21272,273575,24792,90739,52292,41793,25224\r\n" +
        "partido,805,Tigre,2,norte,reconquista,304.35,301223,376381,19/11/1904,1236.67,96.4,74162,12977,15943,4445,996,8882,750,49,168,44,12,61348,22458,13450,1360,19800,16298,24572,57746,19800,108558,11982,84931,4714,18913,186748,11814,80234,798,105,377,1031862,79349,176399,225061,56311,269668,36890,334799,43665,92217,31439,90696,38874\r\n" +
        "partido,840,Tres de Febrero,1,norte,reconquista,43.04,336467,340071,15/10/1959,7901.28,90.7,71722,4072,10576,953,283,31489,460,97,250,5,13,80344,18127,5356,327,15753,84949,6748,12457,15753,112588,4877,98173,2127,12288,177317,10332,85490,1520,38,3079,1498985,70898,43330,411890,44914,334153,66857,402960,41770,84351,53862,89037,22367\r\n" +
        "partido,861,Vicente López,1,norte,reconquista,33.77,274082,269420,21/12/1905,7978.09,87.5,59640,1209,10297,726,81,42136,249,87,301,2,19,83826,8655,2417,91,19739,92222,1055,1712,19739,99286,2414,93066,701,5519,152282,6656,66017,0,83,1191,2884087,81107,139944,457892,54696,275043,97750,435623,61512,74046,101729,101980,21292\r\n" +
        "provincia,1,Buenos Aires,No corresponde,No corresponde,No corresponde,307.571,13827203,15625084,febrero 1820,50801.55,94.8,3199574,515262,0,109551,30077,542445,16569,2222,8117,1376,No informa,2969758,873678,524448,57309,0,2067081,632834,1725278,0,4789484,390171,3891877,172325,725282,7623930,489510,3774730,70835,1812,14124,25253817,1568002,2263487,7945460,1173425,7130588,1233226,9690371,1490977,2507956,1636961,1923264,764345\r\n" +
        "pais,1,Argentina,No corresponde,No corresponde,No corresponde,3745.997,36260130,40117096,No corresponde,10709.32,94.8,7540500,1390034,1690332,235081,226644,2615916,67765,22802,18369,4682,2346,7085330,2467717,1300809,463651,2496964,5933597,1959288,3424622,2496964,12171675,1110883,9901600,480914,1789161,18643267,1174153,10406909,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde,No corresponde"
    ;

    // arreglo el nombre de la cuenca
    //a = a.replace(",de la zona sur,", ",zona-sur,");
    a = a.replace(/,de la zona sur,/g, ',zona-sur,');

    return a;
}

// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    // Return the parsed data.
    return( arrData );
}


function getData() {
	var data = CSVToArray(getDataCsv(), ",");

	// cambio _ por - en el nombre de las propiedades
	data[0] = _.map(data[0], function (x) {
				return x.replace(/_/g, "-");
			}
		);

	return data;

}

function getCsvPropIndex(data, name) {
	return _.findIndex(data[0], function(x) {return x === name});
}

function getPartidoIndex(data, name) {
	var column = getCsvPropIndex(data, "region");
	return _.findIndex(data, function(x) {return x[column] === name});
}

function getPartidoData(data, name) {
	var i = getPartidoIndex(data, name);

	return data[i];
}


function addDataProperties(data, obj, pos) {
	for (var i = 0; i < data[0].length; i++) {
		obj[data[0][i]] = data[pos][i];
	}
}