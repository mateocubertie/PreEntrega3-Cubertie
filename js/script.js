// hacer la calculadora de presupuesto y el simulador de campo pero que se vea en la pagina (pasarlo a inputs html con eventlistener y estructura dinamica con uso de DOM)
// (es lo q me dijo que haga el tutor en la devolucion de la 2, dijo q pase las funcionalidades a la pagina interactiva con uso de dom)

// podria añadir el tema de plagas (y añadir un evento de plaguicida con los pulverizadores inteligentes)
// el concepto seria q la gente simule las estadisticas que podria consultar de su campo utilizando los productos de RemoteAgro
// podria meter unas lindas estadisticas/charts y demas (para hacer graficos podria meter unos canvas)

// para ingresar datos, meter en input y meter botones a los costados para inc/dec
// podria probar a meter unos slider tmb

// simular registro y guardar cuenta en localStorage
// boton de guardar que mande los datos a localStorage


//TODO: 1) Pasar funcionalidades de preentregas 1 y 2 a simulador web interactivo (uso de HTML y DOM)
//TODO: (y revisar donde puedo meter operadores avanzados)
//TODO: 2) Boton de guardar localmente y de recuperar (y/o dark mode) (uso de storage y JSON)
//TODO: ----- Eso cumpliria con lo minimo de la consigna -----
//TODO: 3) Login y registro que guarde localmente la cuenta (localStorage)
//TODO: 4) Nuevos eventos para simular (plagas/malezas/visualizacion grafica de estadisticas)

//? Para charts puedo usar libreria chart.js
//? para usar storage puedo meter un darkmode que guarde localmente el ultimo modo seleccionado
//? Meter mas metodos de clase
//! Separar js en archivos (simulador.js, calculadora.js, darkmode.js, etc.)


// Le da a la seccion #main un margin-top igual a la altura del header (ya que este tiene position: fixed
// y sale del flujo normal del documento)
let headerHeight = parseInt(document.querySelector('header').offsetHeight)
document.getElementById('main').style.marginTop = `${headerHeight}px`

let display = document.querySelector('#displayPresupuesto')

let inputHectareas = document.querySelector('#presHectareas')
let inputPulv = document.querySelector('#presPulv')
let inputLargoPulv = document.querySelector('#presLargoPulv')


let formInputs = [inputHectareas, inputPulv, inputLargoPulv]
let form = new Form(document.querySelector('#formPresupuesto'), formInputs)

form.btnSubmit.addEventListener("click", () => {
    if (!form.submitDisable) {
        let hectareas = parseInt(inputHectareas.value)
        let pulv = parseInt (inputPulv.value)
        let largoPulv = parseInt(inputLargoPulv.value)
        generarPresupuesto(hectareas, pulv, largoPulv)
    }
})



