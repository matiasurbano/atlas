
plan proyecto atlas
-------------------


* layers

- municipio / partidos (135 en buenos aires)

“24 partidos del Gran Buenos Aires”

-- en provincia de buenos aires -> partidos (en el resto del país son departamentos)
-- los partidos se dividen en localidades

Datos de cada municipio:

1. Información General

1.1 Datos generales
-------------------

Datos generales para calcular porcentajes

- cordones

En el Conurbano bonaerense pueden distinguirse partidos del primer y segundo cordón, anillos de urbanización sucesivos y concéntricos que progresaron en torno a la Ciudad de Buenos Aires.

El primer cordón del Conurbano abarca Avellaneda, Lanús, Lomas de Zamora, La Matanza (una parte), Morón, Tres de Febrero, San Martín, Vicente López, San Isidro.

El segundo cordón comprende a Quilmes, Berazategui, Florencio Varela, Esteban Echeverría, Ezeiza, Moreno, Merlo, Malvinas Argentinas, Hurlingham, Ituzaingó, Tigre, San Fernando, José C. Paz, San Miguel, La Matanza (otra parte), Almirante Brown.

La Matanza es el único de los municipios del Conurbano cuyo territorio, en parte, se situa en el tercer cordón.

--

1. Poblacion

-- Total de Población. Censo 2001
-- Total de Población. Censo 2010
-- Variación absoluta (calculable)
-- Variación relativa (calculable)
-- % de Población (a) (respecto del pais, calculable)
-- Índice de masculinidad (b)
-- Ubicación en relación al total de población (ranking)

leyendas:
(a) Porcentajes calculados en relación al total del país (40.117.096 hab.) para la provincia de Buenos Aires; en relación al total provincial para los 24 partidos (15.625.084 hab.) y en relación al total de los 24 partidos (9.916.715 hab.) para cada uno de los Municipios.
(b) indica la cantidad de varones por cada 100 mujeres.
Fuente: Elaboración propia sobre datos del INDEC. Censo Nacional de Población, Hogares y Viviendas 2010. Procesado con Redatam+SP
Nota: la población total incluye a las personas viviendo en situación de calle.

* info agregada: conurbano, provincia, pais

- superficie
- poblacion
los 24 partidos, toda la provincia, cada cordon

- superficie
- % superficie
- ranking en relacion a al superficie
- densidad hab por km
- (poblacion)
- fecha de creacion



Descripción de la visualización:

2. Viviendas

Total de viviendas

* calcular porcentajes: conurbano, provincia, país

3. Viviendas deficitarias  (¿qué es?)

4. NBI

Total de hogares
Hogares con NBI
% de hogares con NBI (calculable)
Jefes de hogar

* calcular porcentajes: conurbano, provincia, país

5. PEA

Indicadores socio laborales

Población de 14 años y más en viviendas particulares
Población Económicamente Activa (y porcentaje)
  Ocupada (y porcentaje)
  Desocupada (y porcentaje)
Población no económicamente activa (y porcentaje)

* calcular porcentajes: conurbano, provincia, país

6. PBG

  Estructura Productiva
  % Participación por rubro en el sector
  %Participación en el Conurbano %

A Agricultura, ganadería, caza y silvicultura   0,53  1,15  24,01
B Pesca explotación de criaderos de peces y granjas piscícolas y servicios conexos  0,00  0,01  5,19
C Explotación de minas y canteras 0,01  0,02  1,94
D Industria Manufacturera 40,64 88,19 5,18
E Electricidad, gas y agua  2,60  5,65  5,35
F Construcción  2,30  4,99  3,27
  SUBTOTAL PRODUCCIÓN DE BIENES 46,08 100  

G Comercio al por mayor, al por menor, reparación de vehículos automotores, motocicletas, efectos personales y enseres domésticos 8,55  15,86 3,47
H Servicios de hotelería y restaurantes 1,37  2,54  3,76
I Servicio de transporte, de almacenamiento y de comunicaciones 12,11 22,46 5,47
J Intermediación financiera y otros servicios financieros 3,35  6,22  8,76
K Servicios inmobiliarios, empresariales  y de alquiler 16,36 30,35 5,44
L Administración pública, defensa y seguridad social obligatoria  1,98  3,68  4,28
M Enseñanza 3,39  6,29  4,35
N Servicios sociales y de salud 2,82  5,23  5,55
O Servicios comunitarios, sociales y personales N.C.P.  3,07  5,69  5,14
P Hogares privados con servicio doméstico 0,91  1,68  3,83
  SUBTOTAL SERVICIOS  53,92 100  

  TOTAL 100    

Idea para visualizar:

Tres tortas

torta1: distribucion bienes / servicios
torta2: distribucion bienes
torta3: distribucion servicios

--
- areas conurbano (norte sur oeste)
- cuencas

* barrios
* información asociada a cada layer

- links

Atlas del conurbano bonaerense
http://www.cecba.org.ar
http://www.cecba.org.ar/atlasdelconurbano/

Cuenca de acumar
http://www.acumar.gob.ar/mapa-cuenca/

Librerías:

http://c3js.org


Columnas
++++++++

Sacar
- Jefes de hogares

Agregar
- Poblacion 2001


VIVIENDAS
+++++++++

Viviendas  [CHART TORTA]
- vivienda_casa_a
- vivienda_casa_b
- vivienda_casa_ni  (datos no informados)
- vivienda_casilla
- vivienda_rancho
- vivienda_departamento
- vivienda_inquilinato
- vivienda_hotel
- vivienda_local
- vivienda_movil
- vivienda_calle

Calculados
	Total Vivienda
	Total Casa (Total A, B ,C)


Vivienda Calidad de Materiales [CHART TORTA]
- vivienda_calmat_1
- vivienda_calmat_2
- vivienda_calmat_3
- vivienda_calmat_4
- vivienda_calmat_5
- vivienda_calmat_ni

Servicios [CHART TORTA]
- vivienda_satisfactoria
- vivienda_basica
- vivienda_insuficiente
- vivienda_servicio_ni


Vivienda Deficitaria [CHART TORTA]
- no deficitaria casa tipo a
- no deficitaria departamento
- no deficitaria rancho
- deficitaria recuperable casa b
- deficitaria no recuperable
- no informado (tipo vivienda casa c)
- situacion calle
- no informada

Campos codigos
	vivienda_deficitaria_recuperable
	vivienda_deficitaria_no_recuperable
	vivienda_deficitaria_calle
	vivienda_deficitaria_ni

Calculos
	PEA + No PEA = Poblacion > 14 anos  [CHART TORTA]
	PEA Ocupada + PEA Desocupada = PEA  [CHART TORTA]


HOGARES
+++++++++

NBI
- hogares_nbi_sin
- hogares_nbi_con_alto
- hogares_nbi_con_medio
- hogares_nbi_con_bajo


Hacinamiento
- hacinamiento
- hacinamiento_no
- hacinamiento_critico
- hacinamiento_nbi

