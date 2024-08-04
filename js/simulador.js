let headerHeight = parseInt(document.querySelector('header').offsetHeight)
document.getElementById('simulador').style.marginTop = `${headerHeight + 30}px`

let campo
let simulador = document.querySelector('#simulador')

let inputAncho = document.querySelector('#simAnchoCampo')
let inputCantCultivos = document.querySelector('#simCultivos')
let inputTemperatura = document.querySelector('#tempInicial')
let formInputs = [inputAncho, inputCantCultivos, inputTemperatura]

let form1 = new Form(document.querySelector('#formSimulador1'), formInputs)

form1.btnSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    if (!form1.submitDisable) {
        anchoCampo = parseInt(inputAncho.value)
        cantidadCultivos = parseInt(inputCantCultivos.value)
        tempInicial = inputTemperatura.value
        limpiarPantalla()
        form2(cantidadCultivos)
    }
})

let buttonCargarProgreso = document.querySelector('.buttonCargarProgreso')
buttonCargarProgreso.onclick = () => {
    saveCheck()
}

let arrayCampo = []

let cantidadCultivos
let anchoCampo
let tempInicial

checkLastScreen()


function saveCheck() {
    let localSave = JSON.parse(localStorage.getItem("campoSave"))
    console.log(localSave)
    if (localSave) {
        campo = localSave
        limpiarPantalla()
        menuSimulador()
    }
}

function checkLastScreen() {
    let lastScreen = sessionStorage.getItem("lastScreen") ?? 'primerForm'
    switch (lastScreen) {
        case 'primerForm':
            break
        case 'menuConsultar':
            campo = JSON.parse(localStorage.getItem("campoSave"))
            limpiarPantalla()
            menuConsultar()
            break
        case 'menuSimulador':
            campo = JSON.parse(localStorage.getItem("campoSave"))
            limpiarPantalla()
            menuSimulador()
            break
    }
}

function setTemperaturaInicial(opcion) {
    switch (opcion) {
        case '1':
            return randomNumber(10, 15);
        case '2':
            return randomNumber(15, 20);
        case '3':
            return randomNumber(20, 25);
    }
}
function setHumedadInicial(opcion) {
    switch (opcion) {
        case '1':
            return randomNumber(0, 20);
        case '2':
            return randomNumber(20, 40);
        case '3':
            return randomNumber(40, 60);
        case '4':
            return randomNumber(60, 80);
    }
}
function setProgresoInicial(opcion) {
    switch (opcion) {
        case '1':
            return randomNumber(0, 5);
        case '2':
            return randomNumber(15, 25);
        case '3':
            return randomNumber(40, 50);
        case '4':
            return randomNumber(60, 75);
        case '5':
            return randomNumber(85, 95);
    }
}
function coloresCultivos(cultivo) {
    switch (cultivo) {
        case 'Papa':
            return '#804000'
        case 'Zanahoria':
            return '#ff8000'
        case 'Berenjena':
            return '#EE82EE'
        case 'Soja':
            return '#ebeba4'
        case 'Acelga':
            return '#00913f'
        case 'Tomate':
            return '#FF0000'
        case 'Cebolla':
            return '#c28dc0'
        case 'Maiz':
            return '#ffd000'
    }
}

function limpiarPantalla() {
    simulador.innerHTML = `<h2>Simulador de campo</h2>`
}

function form2(cantidadCultivos) {
    let templateClone = document.querySelector('#gridFormTemplate').content.cloneNode(true)
    let formElement = templateClone.querySelector('form')
    let contenedorGrid = templateClone.querySelector('.formGrid')
    let formInputs = []
    for (let i = 1; i <= cantidadCultivos; i++) {
        let inputCard = document.querySelector('#gridInputTemplate').content.cloneNode(true).querySelector('div')
        let tituloParcela = document.createElement('h3')
        tituloParcela.textContent = `Parcela #${i}`
        inputCard.appendChild(tituloParcela)
        let inputCultivo = document.querySelector('#inputNombreCultivo').content.cloneNode(true).querySelector('.formInput')
        let inputProgresoInicial = document.querySelector('#inputProgresoInicial').content.cloneNode(true).querySelector('.formInput')
        let inputHumedadInicial = document.querySelector('#inputHumedadInicial').content.cloneNode(true).querySelector('.formInput')
        let inputLargo = document.querySelector('#inputLargoParcela').content.cloneNode(true).querySelector('.formInput')
        let inputList = [inputCultivo, inputProgresoInicial, inputHumedadInicial, inputLargo]
        inputList.forEach((input) => {
            inputCard.appendChild(input)
            formInputs.push(input.querySelector('input') ?? input.querySelector('select'))
        })
        contenedorGrid.appendChild(inputCard)
    }
    simulador.appendChild(formElement)
    let form2 = new Form(formElement, formInputs)

    form2.btnSubmit.addEventListener("click", () => {
        if (!form2.submitDisable) {
            inicializarCampo(form2)
            limpiarPantalla()
            menuSimulador()
        }
    })
}

function inicializarCampo(form2) {
    let listaParcelas = form2.node.getElementsByClassName('dataInputs')
    for (let parcela of listaParcelas) {
        let cultivo = formatearString(parcela.querySelector('.nombreCultivo').value)
        let progresoInicial = parcela.querySelector('.progresoInicial').value
        let humedadInicial = parcela.querySelector('.humedadInicial').value
        let largo = parseInt(parcela.querySelector('.largoParcela').value)
        for (let nFila = 0; nFila < largo; nFila++) {
            let fila = [];
            // For que recorre cada celda de la fila
            for (let nColumna = 0; nColumna < anchoCampo; nColumna++) {
                // Genera un id de la forma '(fila;columna)'
                let id = `${nFila};${nColumna}`;
                let celda = new hectareaCultivo(id, cultivo, setHumedadInicial(humedadInicial), setTemperaturaInicial(tempInicial), setProgresoInicial(progresoInicial));
                fila.push(celda);
            }
            arrayCampo.push(fila);
        }
    }
    campo = new Campo(arrayCampo, anchoCampo, arrayCampo.length)
}

function menuSimulador() {
    sessionStorage.setItem("lastScreen", 'menuSimulador')
    drawGridCampo(campo)
    let gridBotones = document.querySelector('#botonesSimulador').content.cloneNode(true)
    simulador.appendChild(gridBotones)
    let listaBotones = simulador.getElementsByClassName('button')
    for (let boton of listaBotones) {
        boton.addEventListener('click', (event) => {
            let buttonClasses = event.target.classList
            let buttonAction = buttonClasses[buttonClasses.length - 1]
            console.log(buttonAction)
            switch (buttonAction) {
                case 'buttonMenuConsultar':
                    limpiarPantalla()
                    menuConsultar()
                    break
                case 'buttonMenuSimular':
                    break
                case 'buttonMenuFiltrar':
                    limpiarPantalla()
                    menuFiltrar()
                    break
                case 'buttonMenuPromedio':
                    break
                case 'buttonMenuGuardar':
                    localStorage.setItem("campoSave", JSON.stringify(campo))
                    break
                case 'buttonMenuReiniciar':
                    sessionStorage.setItem("lastScreen", 'primerForm')
                    limpiarPantalla()
                    simulador.appendChild(form1.node)
                    break
            }
        })
    }

}

function menuConsultar() {
    sessionStorage.setItem("lastScreen", 'menuConsultar')
    let menuClone = document.querySelector('#menuConsultar').content.cloneNode(true)
    let formNode = menuClone.querySelector('.genericForm')
    let inputs = []
    for (let input of formNode.getElementsByTagName('input')) {
        if (input.getAttribute('type') != 'submit') {
            inputs.push(input)
        }
    }
    let form = new Form(formNode, inputs)
    simulador.appendChild(formNode)
    let display = form.node.querySelector('.dataDisplay')
    form.btnSubmit.addEventListener('click', () => {
        if (!form.submitDisable) {
            display.innerHTML = ""
            let fila = parseInt(form.node.querySelector('#inputFilaCelda').value)
            let columna = parseInt(form.node.querySelector('#inputColumnaCelda').value)
            let celda = consultarCelda(campo, fila, columna)
            if (celda != null) {
                let tabla = document.createElement('table')
                for (let propiedad in celda) {
                    if (propiedad != 'color') {
                        let fila = document.createElement('tr')
                        fila.innerHTML = `
                            <th class="propiedad">
                                ${formatearString(propiedad)}:
                            </th>
                            <th class="valorPropiedad">
                                ${celda[propiedad]}
                            </th>
                        `
                        tabla.appendChild(fila)
                    }
                }
                display.appendChild(tabla)
            }
            else {
                display.innerHTML = '<h3 class="centerText">No existe la celda buscada</h3>'
            }
        }
    })
    form.node.querySelector('.backButton').addEventListener("click", () => {
        limpiarPantalla()
        menuSimulador()
    })
}

function menuFiltrar() {
    let campoFiltrado
    sessionStorage.setItem("lastScreen", 'menuFiltrar')
    let menuClone = document.querySelector('#menuFiltrar').content.cloneNode(true)
    let formNode = menuClone.querySelector('.genericForm')
    let dataInputs = formNode.querySelector('.dataInputs')
    let formCultivo = document.querySelector("#inputCultivoFiltro").content.cloneNode(true).querySelector('.formInput')
    let formTemperatura = document.querySelector("#inputTemperaturaFiltro").content.cloneNode(true).querySelector('.formInput')
    let formHumedad = document.querySelector("#inputHumedadFiltro").content.cloneNode(true).querySelector('.formInput')
    let formProgreso = document.querySelector("#inputProgresoFiltro").content.cloneNode(true).querySelector('.formInput')
    let formsFiltros = [formCultivo, formTemperatura, formHumedad, formProgreso]
    let inputs = []
    for (filtro of formsFiltros) {
        dataInputs.appendChild(filtro)
        inputs.push(filtro.querySelector('select'))
    }
    let form = new Form(formNode, inputs)
    form.submitDisable = false
    form.formCheckSubmit
    simulador.appendChild(form.node)
    form.btnSubmit.addEventListener('click', () => {
        if (!form.submitDisable) {
            let cultivoFiltro = formatearString(formCultivo.querySelector('select').value)
            let temperaturaFiltro = getFiltroTemperatura(formTemperatura.querySelector('select').value)
            let humedadFiltro = getFiltroHumedad(formHumedad.querySelector('select').value)
            let progresoFiltro = getFiltroProgreso(formProgreso.querySelector('select').value)
            let celdaFiltro = {
                cultivo: cultivoFiltro,
                temperatura: temperaturaFiltro,
                humedad: humedadFiltro,
                progreso: progresoFiltro
            }
            let arrayFiltrado = []
            for (let fila = 0; fila < campo.filas; fila++) {
                let arrayFila = []
                for (let columna = 0; columna < campo.ancho; columna++) {
                    let celda = new hectareaCultivo(undefined, undefined, undefined, undefined, undefined)
                    if (compararCelda(campo.array[fila][columna], celdaFiltro)) {
                        celda.color = 'green'
                    }
                    else {
                        celda.color = 'grey'
                    }
                    arrayFila.push(celda)
                }
                arrayFiltrado.push(arrayFila)
            }
            campoFiltrado = new Campo(arrayFiltrado, campo.ancho, campo.filas)
            limpiarPantalla()
            drawGridCampo(campoFiltrado)
            let backButton = document.querySelector('#templateBackButton').content.cloneNode(true).querySelector('button')
            simulador.appendChild(backButton)
            backButton.addEventListener('click', (e) => {
                limpiarPantalla()
                menuSimulador()
            })
        }
    })
}

function drawGridCampo(campo) {
    let gridCampo = document.createElement('div')
    gridCampo.classList.add('displayCampo')
    gridCampo.style.gridTemplateColumns = `repeat(${campo.ancho}, auto)`
    gridCampo.style.gridTemplateRows = `repeat(${campo.filas}, auto)`
    for (let nFila = 0; nFila < campo.filas; nFila++) {
        for (let nColumna = 0; nColumna < campo.ancho; nColumna++) {
            let celda = document.createElement('div')
            celda.className = 'celdaHectarea'
            celda.style.backgroundColor = `${campo.array[nFila][nColumna].color}`
            gridCampo.appendChild(celda)
        }
    }
    simulador.appendChild(gridCampo)
}


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

function getFiltroHumedad(opcion) {
    switch (opcion) {
        case '1':
            return [0, 20];
        case '2':
            return [20, 40];
        case '3':
            return [40, 60];
        case '4':
            return [60, 100];
    }
    return opcion
}




function getFiltroTemperatura(opcion) {
    switch (opcion) {
        case '1':
            return [0, 15];
        case '2':
            return [15, 20];
        case '3':
            return [20, 100];
    }
    return opcion
}

function getFiltroProgreso(opcion) {
    switch (opcion) {
        case '1':
            return [0, 20];
        case '2':
            return [20, 40];
        case '3':
            return [40, 60];
        case '4':
            return [60, 80];
        case '5':
            return [80, 100];
        case '6':
            return [100, 101];
    }
    return opcion
}



function compararCelda(celda, celdaFiltro) {
    for (let propiedad in celdaFiltro) {
        let valorFiltro = celdaFiltro[`${propiedad}`];
        console.log(valorFiltro)
        if (valorFiltro !== 'undefined' && valorFiltro !== 'Undefined') {
            let valorPropiedad = celda[`${propiedad}`];
            console.log(valorPropiedad)
            if (propiedad == 'cultivo') {
                if (valorPropiedad !== valorFiltro) {
                    return false;
                }
            }
            else {
                let min = valorFiltro[0];
                let max = valorFiltro[1];
                if (valorPropiedad < min || valorPropiedad >= max) {
                    return false;
                }
            }
        }
    }
    return true;
}

function consultarCelda(campo, fila, columna) {
    let arrayFila = campo.array[fila]
    if (arrayFila) {
        let celda = (campo.array[fila])[columna]
        return celda ?? null
    }
    else {
        return null
    }
}
class Campo {
    constructor(array, ancho, filas) {
        this.array = array
        this.ancho = ancho
        this.filas = filas
    }
    recorrerCampo(funcion) {
        this.array.forEach((fila) => {
            fila.forEach((celda) => funcion(celda))
        })
    }
    filtrarCampo(celdaFiltro) {
        let campoFiltrado = [];
        this.array.forEach((fila) => {
            // Obtiene las coincidencias en cada fila
            let coincidenciasFila = fila.filter((celda) => compararCelda(celda, celdaFiltro))
            // Las concatena al array del campo filtrado
            campoFiltrado = campoFiltrado.concat(coincidenciasFila);
        });
        return campoFiltrado;
    }
}
//! Objetos y metodos
class hectareaCultivo {
    // Constructor
    constructor(id, cultivo, humedad, temperatura, progreso) {
        this.id = id;
        this.cultivo = cultivo;
        this.humedad = humedad;
        this.temperatura = temperatura;
        this.progreso = progreso;
        this.color = coloresCultivos(cultivo)
    }

    // Chequea que las propiedades numericas de la celda se encuentren dentro de los limites
    chequearLimitesCelda() {
        this.humedad = fitToLimits(this.humedad, 5, 100);
        this.temperatura = fitToLimits(this.temperatura, -5, 35);
        this.progreso = fitToLimits(this.progreso, 0, 100);
    }

}

let actualizarCeldaLluvia = (celda) => {
    celda.humedad += randomNumber(3, 10);
    celda.temperatura -= randomNumber(0.5, 2);
    celda.progreso += randomNumber(1.5, 2.2);
    celda.chequearLimitesCelda();

}
let actualizarCeldaSol = (celda) => {
    celda.humedad -= randomNumber(0.5, 1);
    celda.temperatura += randomNumber(0.2, 1);
    celda.progreso += randomNumber(0.5, 1.2);
    celda.chequearLimitesCelda();

}
let actualizarCeldaNublado = (celda) => {
    celda.humedad -= randomNumber(0.2, 0.8);
    celda.temperatura -= randomNumber(0.2, 0.5);
    celda.progreso += randomNumber(0.2, 1);
    celda.chequearLimitesCelda();
}


// //! Funciones para operaciones generales

// // Muestra un objeto y sus propiedades mediante alert()
// function mostrarObjeto(objeto) {
//     let print = [];
//     for (let propiedad in objeto) {
//         print.push(`${formatearString(propiedad)}: ${objeto[propiedad]}\n`);
//     }
//     alert(print.join(''));
// }

// Pone una mayuscula al principio del string
function meterMayuscula(string) {
    return string[0].toUpperCase().concat(string.slice([1]));
}

// Formatea el string (mayuscula al principio y luego minusculas)
function formatearString(string) {
    return meterMayuscula(string.toLocaleLowerCase());
}

// Genera un numero aleatorio de 2 cifras decimales
function randomNumber(min, max) {
    let difference = max - min;
    return Math.floor((min + Math.random() * difference) * 10) / 10;
}

// Toma un numero y lo ajusta a sus limites establecidos si es necesario
function fitToLimits(num, min, max) {
    if (num < min) {
        num = min;
    }
    else if (num > max) {
        num = max;
    }
    return num;
}







// // Compara una celda con una definida como filtro
// // (Las propiedades que no se quieren filtrar se declaran como undefined)


// // Filtra todo el array campo en base a las propiedades de una celda "filtro"


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


// //! Menus

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

// // Funciones flecha que definen como actualizar cada celda segun el clima del dia


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