

const readlineSync = require('readline-sync');

let n_empleados = +readlineSync.question('cuantos empleados desea registrar?: ');
let valor_primaria = +readlineSync.question('cuanto es el valor del subsidio para primaria: ');
let valor_secundaria = +readlineSync.question('cuanto es el valor del subsidio por secundaria: ')
let valor_universidad = +readlineSync.question('cuanto es el valor del subsidio para universidad: ')
let empleados = []
let costo_vuelos = 0
let costo_total_nomina = 0;
let costo_nomina_hombres = 0;
let costo_nomina_mujeres = 0;
let mayor_salario = 0;
let empleado_mayor_salario = 0;
let subsidios_secundaria = 0;
let costo_total_vuelos = 0;
let costo_empleado = 0;
const subsidio_estrato = {
    1: 0.15, 2:  0.1, 3: 0.05
}

const subsidio_hijos = {
    primaria: valor_primaria, secundaria: valor_secundaria, universidad: valor_universidad
}

for (let i = 1; i <= n_empleados; i++)
{
    let nombre = readlineSync.question(`cual es el nombre del empleado ${i}:  `)
    let salario = +readlineSync.question(`cual es el salario del empleado ${i}: `)
    let sexo = readlineSync.question(`cual es sexo de el empleado ${i} (m/f): `)
    let estrato = +readlineSync.question(`cual es el estrato del empleado ${i}: `)
    let sector = readlineSync.question(`en que sector vive el empleado ${i} (r/u): `)
    let subsidio_sector = 0
    let costo_vuelos = 0
    if (sector == 'r'){
        subsidio_sector = 35000
    }
    let numero_hijos = +readlineSync.question(`cuantos hijos tiene el empleado ${i}: `)
    let total_subsidio_hijos = 0
    
    if (numero_hijos > 0){
        hijos_primaria = +readlineSync.question(`cuantos hijos tiene en primaria el empleado ${i}: `)
        hijos_secundaria = +readlineSync.question(`cuantos hijos tiene en secundaria el empleado ${i}: `)
        hijos_universidad = +readlineSync.question(`cuantos hijos tiene en universidad el empleado ${i}: `)
        
        total_subsidio_hijos = (hijos_primaria * subsidio_hijos.primaria) +
                                (hijos_secundaria * subsidio_hijos.secundaria) +
                                (hijos_universidad * subsidio_hijos.universidad)
        subsidios_secundaria = (hijos_secundaria * subsidio_hijos.secundaria) + subsidios_secundaria
    }
    else{
        hijos_primaria = 0
        hijos_secundaria = 0
        hijos_universidad = 0
    }
    
    let extranjero = readlineSync.question(`el empleado ${i} es extranjero? (s/n): `)
    if (extranjero == 's'){
        costo_vuelos = +readlineSync.question(`cuanto cuestan los vuelos del empleado ${i}: `)
        costo_vuelos = costo_vuelos * 2
        costo_total_vuelos = costo_vuelos + costo_total_vuelos
    }

    let subsidio_por_estrato = salario * subsidio_estrato[estrato]

    let subsidio_total = subsidio_por_estrato + total_subsidio_hijos + costo_vuelos + subsidio_sector
    let empleado = { nombre: nombre, salario: salario,sexo: sexo, estrato: estrato, sector: sector, 
        numero_hijos: numero_hijos,hijos_primaria:hijos_primaria,hijos_secundaria:hijos_secundaria , 
        hijos_universidad : hijos_universidad, extranjero: extranjero, subsidio_total:subsidio_total
    }
    costo_empleado = salario + subsidio_total
    costo_total_nomina = costo_total_nomina + costo_empleado
    if (sexo == 'm'){
        costo_nomina_hombres = costo_nomina_hombres + costo_empleado
    }
    else{
        costo_nomina_mujeres = costo_nomina_mujeres + costo_empleado
    } 
    if (salario > mayor_salario){
        mayor_salario = salario
        empleado_mayor_salario = nombre
    }   
    
    empleados.push(empleado)
    
}
console.info(empleados)
console.info(`el costo total de la nomina es: ${costo_total_nomina}`)
console.info(`el costo total de la nomina de hombres es: ${costo_nomina_hombres}`)
console.info(`el costo total de la nomina de mujeres es: ${costo_nomina_mujeres}`)
console.info(`el empleado de mayor salario es: ${empleado_mayor_salario},con un salario de: ${mayor_salario}`)
console.info(`el costo total de los subsidios de secundaria es: ${subsidios_secundaria}`)
console.info(`el costo total en vueloes es de: ${costo_total_vuelos}`)



