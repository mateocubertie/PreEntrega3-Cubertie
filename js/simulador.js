let headerHeight = parseInt(document.querySelector('header').offsetHeight)
document.getElementById('simulador').style.marginTop = `${headerHeight + 30}px`

let inputAncho = document.querySelector('#simAnchoCampo')
let inputCantCultivos = document.querySelector('#simCultivos')

let formInputs = [inputAncho, inputCantCultivos]

let simulador = document.querySelector('#simulador')
let form1 = new Form(document.querySelector('#formSimulador1'), formInputs)

let cantidadCultivos 
let anchoCampo

form1.btnSubmit.addEventListener("click", () => {
    if (!form1.submitDisable) {
        cantidadCultivos = parseInt(inputAncho.value)
        anchoCampo = parseInt(inputCantCultivos.value)
        console.log(simulador.childNodes)
        simulador.innerHTML = `<h2>Simulador de campo</h2>`
        form2(cantidadCultivos)
    }
})
function form2(cantidadCultivos) {
    let contenidoClonado = document.querySelector('#gridFormTemplate').cloneNode(true)
    console.log(contenidoClonado.content)
    console.log(contenidoClonado)
    for(let i = 0; i < cantidadCultivos; i++) {
        
    }
}
// class campo {
//     constructor(array, ancho, filas) {
//         this.array = array
//         this.ancho = ancho
//         this.filas = filas
//     }
//     recorrerCampo(funcion) {
//         this.forEach((fila) => {
//                 fila.forEach((celda) => funcion(celda))
//             })
//     }
// }
// //! Objetos y metodos
// class hectareaCultivo {
//     // Constructor
//     constructor(id, cultivo, humedad, temperatura, progreso) {
//         this.id = id;
//         this.cultivo = cultivo;
//         this.humedad = humedad;
//         this.temperatura = temperatura;
//         this.progreso = progreso;
//     }
    
//     // Chequea que las propiedades numericas de la celda se encuentren dentro de los limites
//     chequearLimitesCelda() {
//         this.humedad = fitToLimits(this.humedad, 5, 100);
//         this.temperatura = fitToLimits(this.temperatura, -5, 35);
//         this.progreso = fitToLimits(this.progreso, 0, 100);
//     }
// }

// //! Funciones para operaciones generales

// // Muestra un objeto y sus propiedades mediante alert()
// function mostrarObjeto(objeto) {
//     let print = [];
//     for (let propiedad in objeto) {
//         print.push(`${formatearString(propiedad)}: ${objeto[propiedad]}\n`);
//     }
//     alert(print.join(''));
// }

// // Pone una mayuscula al principio del string
// function meterMayuscula(string) {
//     return string[0].toUpperCase().concat(string.slice([1]));
// }

// // Formatea el string (mayuscula al principio y luego minusculas)
// function formatearString(string) {
//     return meterMayuscula(string.toLocaleLowerCase());
// }

// // Genera un numero aleatorio de 2 cifras decimales
// function randomNumber(min, max) {
//     let difference = max - min;
//     return Math.floor((min + Math.random() * difference) * 10) / 10;
// }

// // Toma un numero y lo ajusta a sus limites establecidos si es necesario
// function fitToLimits(num, min, max) {
//     if (num < min) {
//         num = min;
//     }
//     else if (num > max) {
//         num = max;
//     }
//     return num;
// }

// // Pide al usuario que ingrese un numero positivo
// function numericPromptCheck(promptString, min = 0, max = Infinity) {
//     while (true) {
//         input = parseInt(prompt(promptString));
//         if (isNaN(input)) {
//             alert(invalidInputType);
//         }
//         else if (input < min) {
//             alert(invalidInputMin);
//         }
//         else if (input > max) {
//             alert(invalidInputMax);
//         }
//         else {
//             break;
//         }
//     }
//     return input;
// }

// //! Objetos y metodos
// class hectareaCultivo {
    
//     // Constructor
//     constructor(id, cultivo, humedad, temperatura, progreso) {
//         this.id = id;
//         this.cultivo = cultivo;
//         this.humedad = humedad;
//         this.temperatura = temperatura;
//         this.progreso = progreso;
//     }
    
//     // Chequea que las propiedades numericas de la celda se encuentren dentro de los limites
//     chequearLimitesCelda() {
//         this.humedad = fitToLimits(this.humedad, 5, 100);
//         this.temperatura = fitToLimits(this.temperatura, -5, 35);
//         this.progreso = fitToLimits(this.progreso, 0, 100);
//     }
// }

// //! Funciones para operaciones con el array campo[][]

// // Recorre cada celda del campo y llama a una funcion sobre ella
// function recorrerCampo(campo, funcion) {
//     campo.forEach((fila) => {
//             fila.forEach((celda) => funcion(celda))
//         })
//     return campo;
// }

// // Compara una celda con una definida como filtro
// // (Las propiedades que no se quieren filtrar se declaran como undefined)
// function compararCelda(celda, celdaFiltro) {
//     for (let propiedad in celdaFiltro) {
//         let valorFiltro = celdaFiltro[`${propiedad}`];
//         if (valorFiltro !== undefined) {
//             let valorPropiedad = celda[`${propiedad}`];
//             if (propiedad == 'cultivo') {
//                 if (valorPropiedad !== valorFiltro) {
//                     return false;
//                 }
//             }
//             else {
//                 let min = valorFiltro[0];
//                 let max = valorFiltro[1];
//                 if (valorPropiedad < min || valorPropiedad >= max) {
//                     return false;
//                 }
//             }
//         }
//     }
//     return true;
// }

// // Filtra todo el array campo en base a las propiedades de una celda "filtro"
// function filtrarCampo(campo, celdaFiltro) {
//     let campoFiltrado = [];
//     campo.forEach((fila) => {
//         // Obtiene las coincidencias en cada fila
//         let coincidenciasFila = fila.filter((celda) => compararCelda(celda, celdaFiltro))
//         // Las concatena al array del campo filtrado
//         campoFiltrado = campoFiltrado.concat(coincidenciasFila);
//     });
//     return campoFiltrado;
// }

// // Muestra con alert() un mapa de las celdas filtradas (X -> coincidencia, 0 -> excluida por el filtro)
// function mapearCampo(campo, campoFiltrado) {
//     let anchoCampo = campo[0].length;
//     let stringAlert = [];
//     campo.forEach((fila) => {
//         let found;
//         for (let celda of fila) {
//             if (campoFiltrado.includes(celda)) {
//                 found = 'X'
//             }
//             else {
//                 found = '0'
//             }
//             stringAlert = stringAlert.concat(found)
//         }
//         stringAlert = stringAlert.concat("\n");
//     })
//     stringAlert = stringAlert.concat("\nSe ha generado una vista detallada de las celdas coincidentes en la consola.")
//     console.log(campoFiltrado);
//     alert(stringAlert.join(""));
// }

// // Genera un porcentaje de progreso segun el nivel de crecimiento ingresado
// function generarProgreso(progresoGeneral) {
//     switch (progresoGeneral) {
//         case 1:
//             return randomNumber(0, 5);
//         case 2:
//             return randomNumber(15, 25);
//         case 3:
//             return randomNumber(40, 50);
//         case 4:
//             return randomNumber(60, 75);
//         case 5:
//             return randomNumber(85, 95);
//     }
// }

// //! Menus

// const strPromptHumedad = `Ingrese un estado de humedad inicial:
// 1. Seco (0-20%)
// 2. Normal (20-40%)
// 3. Humedo (40-60%)
// 4. Saturado (60-80%+)
// `

// function promptHumedad() {
//     while (true) {
//         let menuOption = parseInt(prompt(strPromptHumedad));
//         switch (menuOption) {
//             case 1:
//                 return randomNumber(0, 20);
//             case 2:
//                 return randomNumber(20, 40);
//             case 3:
//                 return randomNumber(40, 60);
//             case 4:
//                 return randomNumber(60, 80);
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
// }

// const strPromptTemperatura = `Ingrese un estado de temperatura inicial:
// 1. Frio (10-15°C)
// 2. Templado (15-20°C)
// 3. Caliente (20-25°C)
// `

// function promptTemperatura() {
//     while (true) {
//         let menuOption = parseInt(prompt(strPromptTemperatura));
//         switch (menuOption) {
//             case 1:
//                 return randomNumber(10, 15);
//             case 2:
//                 return randomNumber(15, 20);
//             case 3:
//                 return randomNumber(20, 25);
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
// }

// const strPromptProgreso = `Ingrese un estado de crecimiento inicial:
// 1. Recien sembrado
// 2. Menos de un mes de siembra
// 3. A medio crecer
// 4. Maduro
// 5. Cerca de la cosecha
// `

// function promptProgreso() {
//     while (true) {
//         let menuOption = parseInt(prompt(strPromptProgreso));
//         switch (menuOption) {
//             case 1:
//             case 2:
//             case 3:
//             case 4:
//             case 5:
//                 return menuOption;
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
// }

// const strMenuSimulador = `Ingrese un numero de opcion: 
// 1. Consultar el estado de una hectarea 
// 2. Simular el paso de un día 
// 3. Filtrar hectareas 
// 4. Consultar promedio 
// 5. Finalizar simulacion
// `

// function simuladorCampo() {
//     let campo = [];
//     let anchoCampo = numericPromptCheck("Ingrese el ancho de su campo en hectáreas: ");
//     let humedadCampo = promptHumedad();
//     let temperaturaCampo = promptTemperatura();
//     let cantidadCultivos = numericPromptCheck("Ingrese la cantidad de cultivos de su campo: ");
//     for (let i = 0; i < cantidadCultivos; i++) {
//         let cultivoParcela = formatearString(prompt("Ingrese el cultivo de la parcela: "));
//         let largoParcela = numericPromptCheck("Ingrese el largo en hectareas de la parcela: ")
//         let progresoParcela = promptProgreso();
//         // For que recorre cada fila del campo
//         for (let nFila = 0; nFila < largoParcela; nFila++) {
//             let fila = [];
//             // For que recorre cada celda de la fila
//             for (let nColumna = 0; nColumna < anchoCampo; nColumna++) {
//                 // Genera un id de la forma '(fila;columna)'
//                 let id = `${nFila};${nColumna}`;
//                 let celda = new hectareaCultivo(id, cultivoParcela, humedadCampo, temperaturaCampo, generarProgreso(progresoParcela));
//                 fila.push(celda);
//             }
//             campo.push(fila);
//         }
//     }
//     console.log(campo);
//     let subMenuEnable = true;
//     while (subMenuEnable) {
//         let menuOption = parseInt(prompt(strMenuSimulador))
//         switch (menuOption) {
//             case 1:
//                 consultarCelda(campo);
//                 break;
//             case 2:
//                 campo = menuSimulacion(campo);
//                 break;
//             case 3:
//                 mapearCampo(campo, menuFiltrar(campo));
//                 break;
//             case 4:
//                 menuPromedio(campo);
//                 break;
//             case 5:
//                 subMenuEnable = false;
//                 break;
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
// }

// function consultarCelda(campo) {
//     // Variable que guarda la celda encontrada
//     let found;
//     let idPrompt = prompt("Ingrese el ID de la celda (fila;columna): ");
//     let largoCampo = campo.length;
//     // For que recorre cada fila del campo y busca en ella la celda consultada por su ID
//     // Si findIndex devuelve -1 es porque no se encuentra en dicha fila
//     for (let fila = 0; fila < largoCampo; fila++) {
//         index = campo[fila].findIndex((celda) => celda.id == idPrompt)
//         // Si el indice devuelto por findIndex es distinto de -1, encontramos la celda
//         if (index != -1) {
//             found = campo[fila][index];
//             break;
//         }
//     }
//     if (index == -1) {
//         alert("No existe celda con el ID ingresado");
//     }
//     else {
//         mostrarObjeto(found);
//         console.log(found);
//     }
// }

// // Funciones flecha que definen como actualizar cada celda segun el clima del dia
// let actualizarCeldaLluvia = (celda) => {
//     celda.humedad += randomNumber(3,10);
//     celda.temperatura -= randomNumber(0.5,2);
//     celda.progreso += randomNumber(1.5,2.2);
//     celda.chequearLimitesCelda();

// }
// let actualizarCeldaSol = (celda) => {
//     celda.humedad -= randomNumber(0.5, 1);
//     celda.temperatura += randomNumber(0.2, 1);
//     celda.progreso += randomNumber(0.5, 1.2);
//     celda.chequearLimitesCelda();
    
// }
// let actualizarCeldaNublado = (celda) => {
//     celda.humedad -= randomNumber(0.2, 0.8);
//     celda.temperatura -= randomNumber(0.2, 0.5);
//     celda.progreso += randomNumber(0.2, 1);
//     celda.chequearLimitesCelda();
// }

// const strMenuSimulacion = `Ingrese un numero de opción:
// 1. Simular dia soleado
// 2. Simular dia nublado
// 3. Simular dia de lluvia
// 4. Salir
// `
// function menuSimulacion(campo) {
//     let submenuEnable = true;
//     while (submenuEnable) {
//         let menuOption = parseInt(prompt(strMenuSimulacion));
//         switch(menuOption) {
//             case 1:
//                 campo = recorrerCampo(campo, actualizarCeldaSol);
//                 break;
//             case 2:
//                 campo = recorrerCampo(campo, actualizarCeldaNublado);
//                 break;
//             case 3:
//                 campo = recorrerCampo(campo, actualizarCeldaLluvia);
//                 break;
//             case 4:
//                 submenuEnable = false;
//                 break;
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
//     return campo;
// }



// const strFiltrarHumedad = `Seleccione el grado de humedad a filtrar: 
// 1. Seco (0-20%)
// 2. Normal (20-40%)
// 3. Humedo (40-60%)
// 4. Saturado (60-80%+)
// `

// function menuFiltrarHumedad() {
//     let submenuEnable = true;
//     while (submenuEnable) {
//         let menuOption = parseInt(prompt(strFiltrarHumedad));
//         switch (menuOption) {
//             case 1:
//                 return [0, 20];
//             case 2:
//                 return [20, 40];
//             case 3:
//                 return [40, 60];
//             case 4:
//                 return [60, 100];
//             default:
//                 alert(invalidOption);
//         }
//     }
// }

// const strFiltrarTemperatura = `Seleccione el nivel de temperatura de suelo a filtrar:
// 1. Frio (15°C-)
// 2. Templado (15-20°C)
// 3. Caliente (20°C+)
// `

// function menuFiltrarTemperatura() {
//     let submenuEnable = true;
//     while (submenuEnable) {
//         let menuOption = parseInt(prompt(strFiltrarTemperatura));
//         switch (menuOption) {
//             case 1:
//                 return [0, 15];
//             case 2:
//                 return [15, 20];
//             case 3:
//                 return [20, 100];
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
// }
// const strFiltrarProgreso = `Seleccione el nivel de progreso a filtrar:
// 1. Siembra reciente (0-20%)
// 2. Cultivos jovenes (20-40%)
// 3. A medio crecer (40-60%)
// 4. Cultivos maduros (60-80%)
// 5. A punto de cosechar (8-99%)
// 6. Listos para cosechar (100%)
// `
// function menuFiltrarProgreso() {
//     let submenuEnable = true;
//     while (submenuEnable) {
//         let menuOption = parseInt(prompt(strFiltrarProgreso));
//         switch (menuOption) {
//             case 1:
//                 return [0, 20];
//             case 2:
//                 return [20, 40];
//             case 3:
//                 return [40, 60];
//             case 4:
//                 return [60, 80];
//             case 5:
//                 return [80, 100];
//             case 6:
//                 return [100, 101];
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
// }

// const strMenuPrimerFiltro = `Ingrese un numero de opcion:
// 1. Filtrar por cultivo
// 2. Filtrar por humedad de suelo
// 3. Filtrar por temperatura
// 4. Filtrar por grado de crecimiento
// `

// const strMenuFiltrosAdicionales = `Ingrese un numero de opcion:
// 1. Filtrar por cultivo
// 2. Filtrar por humedad de suelo
// 3. Filtrar por temperatura
// 4. Filtrar por grado de crecimiento
// 5. Generar lista filtrada
// `

// function menuFiltrar(campo) {
//     let filtro = {
//         cultivo: undefined,
//         humedad: undefined,
//         temperatura: undefined,
//         progreso: undefined
//     }
//     let submenuEnable = true;
//     let primerFiltro = true;
//     while (submenuEnable) {
//         let menuOption;
//         if (primerFiltro) {
//             menuOption = parseInt(prompt(strMenuPrimerFiltro));
//         }
//         else {
//             menuOption = parseInt(prompt(strMenuFiltrosAdicionales));
//         }
//         switch (menuOption) {
//             case 1:
//                 filtro.cultivo = formatearString(prompt("Ingrese el nombre del cultivo: "));
//                 primerFiltro = false;
//                 break;
//             case 2:
//                 filtro.humedad = menuFiltrarHumedad();
//                 primerFiltro = false;
//                 break;
//             case 3:
//                 filtro.temperatura = menuFiltrarTemperatura();
//                 primerFiltro = false;
//                 break;
//             case 4:
//                 filtro.progreso = menuFiltrarProgreso();
//                 primerFiltro = false;
//                 break;
//             case 5:
//                 if (!primerFiltro) {
//                     submenuEnable = false;
//                     break;
//                 }
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
//     return filtrarCampo(campo, filtro);
// }

// const strMenuPromedio = `Ingrese el parámetro a promediar:
// 1. Temperatura
// 2. Humedad
// 3. Nivel de crecimiento
// `
// const strMenuPromedioFiltro = `¿Desea filtrar las celdas a promediar?
// 1. Si
// 2. No
// `
// function menuPromedio(campo) {
//     let submenuEnable = true;
//     let propiedad;
//     while (submenuEnable) {
//         let menuOption = parseInt(prompt(strMenuPromedio));
//         switch(menuOption) {
//             case 1:
//                 propiedad = 'temperatura';
//                 submenuEnable = false;
//                 break;
//             case 2:
//                 propiedad = 'humedad';
//                 submenuEnable = false;
//                 break;
//             case 3:
//                 propiedad = 'progreso';
//                 submenuEnable = false;
//                 break;
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
//     submenuEnable = true;
//     let filtrarCampo = false;
//     while (submenuEnable) {
//         let menuOption = parseInt(prompt(strMenuPromedioFiltro));
//         switch(menuOption) {
//             case 1:
//                 filtrarCampo = true;
//                 // Filtra el campo como el usuario decida (devuelve un array unidimensional)
//                 campo = menuFiltrar(campo);
//                 submenuEnable = false;
//                 break;
//             case 2:
//                 let filasFusionadas = [];
//                 // Fusiona las filas en un solo array unidimensional
//                 for (let fila of campo) {
//                     filasFusionadas = filasFusionadas.concat(fila);
//                 }
//                 campo = filasFusionadas;
//                 submenuEnable = false;
//                 break;
//             default:
//                 alert(invalidOption);
//                 break;
//         }
//     }
//     if ((filtrarCampo == true) && campo.length == 0) {
//         alert("No hay celdas coincidentes con el filtro");
//     }
//     else {
//         let sumaTotal = campo.reduce(
//             (acumulador, celda) => acumulador + celda[`${propiedad}`],
//             0
//         );
//         let promedio = sumaTotal / campo.length;
//         alert(`El promedio de ${propiedad} es ${promedio}`);
//     }
// }

// let menuEnable = true;

// while (menuEnable) {
//     let menuOption = parseInt(prompt(strMenuPrincipal))
//     switch (menuOption) {
//         case 1:
//             simuladorCampo();
//             break;
//         case 2:
//             alert("¡Hasta luego!");
//             menuEnable = false;
//             break;
//         default:
//             alert(invalidOption);
//             break;
//     }
// }