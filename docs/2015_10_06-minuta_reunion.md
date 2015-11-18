
- análisis de la información disponible en http://www.cecba.org.ar/atlasdelconurbano

-- municipios, conurbano, cuencas hídricas

-- elaboramos modelo de archivo de datos para alimentar el visualizador con la siguiente información

tipo_region: partido, provincia, país (los dos últimos para calcular porcentajes)
codigo: código único que identifica a cada partido
region: nombre del partido (Buenos Aires / Argentina para tipo_region provincia y país respectivamente)
cordon: 1, 2, 3
conurbano: norte, sur, oeste
cuencas: cuencas a las que pertenece el partido separadas por punto y coma

anio: anio de la información (2001, 2010)

(ej: http://www.cecba.org.ar/atlasdelconurbano/lamatanza1.html)
superficie: en km2
creacion: fecha de la creación del partido

(ej: http://www.cecba.org.ar/atlasdelconurbano/lamatanza4.1.html)
poblacion
hombres
mujeres

(ej: http://www.cecba.org.ar/atlasdelconurbano/lamatanza4.3.html)
viviendas_precarias
viviendas

(ej: http://www.cecba.org.ar/atlasdelconurbano/lamatanza4.2.html)
hogares
hogares_nbi
jefes_hogar

(ej: http://www.cecba.org.ar/atlasdelconurbano/lamatanza4.1.html)
poblacion_14_anios
pea
pea_ocupada
pea_desocupada
no_pea

(ej: http://www.cecba.org.ar/atlasdelconurbano/lamatanza3.1.html)
pbg_bienes: importe de bienes producidos (suma de los campos pbg_a a pbg_f)
pbg_servicios: importe de servicios producidos (suma de los campos pbg_g a pbg_p)

pbg_a: Agricultura, ganadería, caza y silvicultura
pbg_b: Pesca explotación de criaderos de peces y granjas piscícolas y servicios conexos
pbg_c: Explotación de minas y canteras
pbg_d: Industria Manufacturera
pbg_e: Electricidad, gas y agua
pbg_f: Construcción

pbg_g: Comercio al por mayor, al por menor, reparación de vehículos automotores, motocicletas, efectos personales y enseres domésticos
pbg_h: Servicios de hotelería y restaurantes
pbg_i: Servicio de transporte, de almacenamiento y de comunicaciones
pbg_j: Intermediación financiera y otros servicios financieros
pbg_k: Servicios inmobiliarios, empresariales  y de alquiler
pbg_l: Administración pública, defensa y seguridad social obligatoria
pbg_m: Enseñanza
pbg_n: Servicios sociales y de salud
pbg_o: Servicios comunitarios, sociales y personales N.C.P.
pbg_p: Hogares privados con servicio doméstico

-- consultas

1. Para poder armar los totales por cordón, La Matanza tiene que dividirse en tres zonas, matanza I, matanza II y matanza III.
Actualmente se está tomando la totalidad de La Matanza para los cordones I y II.

Hay dos opciones: separar la matanza como dos regiones distintas o seleccionar toda la matanza. En el segundo caso, al seleccionar el cordon I o el II se pintará todo el partido de La Matanza

2. Respecto a los barrios se tomará los siguientes valores:

Nombre: denominación del barrio
Hab: cantidad de habitantes
Viv: cantidad de viviendas
Hog: cantidad de hogares
Tipo: tipo de barrio

3. cartografía necesaria

- partidos
- cordones (prestar atención al tema de La Matanza)
- áreas conurbano (sur, norte, oeste)
- cuencas

- barrios (verificar si están completos)

* en caso de estar disponibles en gdrive especificar cuál utilizar en cada caso


