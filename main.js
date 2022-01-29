const sonido_correcto = new Audio(
    "http://www.sonidosmp3gratis.com/sounds/caja-registradora%20dinero.mp3"
);
const sonido_fallo = new Audio(
    "http://www.sonidosmp3gratis.com/sounds/chicharra-error-incorrecto-.mp3"
);

const respuesta = document.querySelector(".respuesta");
const caja = document.querySelector(".caja");
const precio = document.querySelector(".precio");
const dinero = document.querySelector(".dinero");
const cambio = document.querySelector(".cambio");
const cajaBilletes = document.querySelector(".cajaBilletes");
const billete = document.querySelector(".billete");

let clientes = ["👩", "👨", "👨‍⚕️", "👮‍♂️", "👩‍🎓", "👩‍🔬", "👨‍🍳"];
let productos = [
    "🍕",
    "🍔",
    "🍟",
    "🌭",
    "🍿",
    "🍉",
    "🍓",
    "🍺",
    "🥤",
    "🥾",
    "🧣",
    "🧦",
    "👠",
];
let precios = [50, 70, 100, 150, 200, 300, 500, 900];
let billetes = [10, 20, 50, 100, 200, 500, 1000];

caja.addEventListener("submit", atender);

function obtenerAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function atender(e) {
    if (
        parseInt(dinero.value) - parseInt(precio.value) ==
            parseInt(cambio.value) &&
        parseInt(cambio.value) % 100 == 0
    ) {
        sonido_correcto.play();
        respuesta.innerHTML = "<persona>👍</persona><texto>Gracias!</texto>";
        setTimeout(() => {
            renderLocal();
        }, 1000);
    } else if (
        parseInt(dinero.value) - parseInt(precio.value) ==
            parseInt(cambio.value) &&
        parseInt(cambio.value) % 100 != 0
    ) {
        ayudar();
    } else {
        sonido_fallo.play();
        respuesta.innerHTML =
            "<persona>🤔</persona><texto>Espera! me diste mal el cambio.</texto>";
        cambio.value = 0;
    }
    e.preventDefault();
}

function pagar(b) {
    const n = parseInt(cambio.value) ? parseInt(cambio.value) : 0;
    cambio.value = n + b;
}

function ayudar() {
    const r = obtenerAleatorio(0, 1);
    if (r) {
        respuesta.innerHTML = `<persona>😎</persona><texto>Te ayudo con el cambio, toma $${
            100 - (parseInt(cambio.value) % 100)
        }.</texto>`;
        setTimeout(() => {
            dinero.value =
                parseInt(dinero.value) + 100 - (parseInt(cambio.value) % 100);
            cambio.value = 0;
        }, 1500);
    } else {
        sonido_correcto.play();
        respuesta.innerHTML = "<persona>👍</persona><texto>Gracias!</texto>";
        setTimeout(() => {
            renderLocal();
        }, 1000);
    }
}

function renderLocal() {
    respuesta.innerHTML = `<persona>${
        clientes[obtenerAleatorio(0, clientes.length - 1)]
    }</persona><texto>Hola! me das esto: <persona>${
        productos[obtenerAleatorio(0, productos.length - 1)]
    }</persona></texto>`;
    precio.value = precios[obtenerAleatorio(0, precios.length - 1)];
    const queBilletes = billetes.filter((x) => x > precio.value);
    dinero.value = queBilletes[obtenerAleatorio(0, queBilletes.length - 1)];
    cajaBilletes.innerHTML = "";
    billetes.forEach((b) => {
        cajaBilletes.innerHTML += `<button class="billete" onclick="pagar(${b})"><c>$${b}</c></button>`;
    });
    cambio.value = 0;
}

renderLocal();
