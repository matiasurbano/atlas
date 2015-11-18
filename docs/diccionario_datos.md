Diccionario de datos
====================

tipo_region
codigo
region
cordon
conurbano
cuencas

superficie
poblacion
creacion
densidad

indice_masculinidad

hombres, calculado: poblacion * indice_masculinidad
mujeres, calculado: poblacion * indice_masculinidad

- vivienda por tipo,grafico de torta

vivienda_casa_a
vivienda_casa_b
vivienda_casa_ni
vivienda_casilla
vivienda_rancho
vivienda_departamento
vivienda_inquilinato
vivienda_hotel
vivienda_local
vivienda_movil
vivienda_calle

- vivienda por calidad de materiales,grafico de torta

vivienda_calmat_1
vivienda_calmat_2
vivienda_calmat_3
vivienda_calmat_4
vivienda_calmat_5
vivienda_calmat_ni

- vivienda por necesidades básicas,grafico de torta

vivienda_satisfactoria
vivienda_basica
vivienda_insuficiente
vivienda_servicio_ni

- vivienda deficitaria,grafico de torta

vivienda_deficitaria_recuperable, calculado: vivienda_casa_b
vivienda_deficitaria_no_recuperable, calculado: vivienda_casilla + vivienda_rancho + vivienda_inquilinato + vivienda_hotel + vivienda_local + vivienda_movil
vivienda_deficitaria_calle, calculado: vivienda_calle
vivienda_deficitaria_ni, calculado: vivienda_casa_ni

- hogares por necesidades básicas,gráfico de torta

hogares_nbi_sin
hogares_nbi_con_alto
hogares_nbi_con_medio
hogares_nbi_con_bajo

- hogares por hacinamiento,gráfico de torta

hacinamiento
hacinamiento_no
hacinamiento_critico
hacinamiento_ni

- población económicamente activa,gráfico de torta

poblacion_14_anios,calculado: pea + no_pea
pea: calculado: pea_ocupada + pea_desocupada
pea_ocupada
pea_desocupada
no_pea

- pbg, gráfico de tortas custom

pbg_bienes: calculado pbg_a a pbg_d
pbg_servicios: calculado pbg_e a pbg_p

pbg_a
pbg_b
pbg_c
pbg_d

pbg_e
pbg_f
pbg_g
pbg_h
pbg_i
pbg_j
pbg_k
pbg_l
pbg_m
pbg_n
pbg_o
pbg_p
