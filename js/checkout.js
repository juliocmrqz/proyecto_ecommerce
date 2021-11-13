const NRO_ORDEN = document.getElementById("nro-orden");
const USER_CHECKOUT = document.getElementById("user-checkout");

function getRandomArbitrary(min, max) {
    NRO_ORDEN.innerHTML = parseInt(Math.random() * (max - min) + min);
  }


document.addEventListener('DOMContentLoaded', function(){
    let usuarioInicioSesion = JSON.parse(localStorage.getItem('usuario'));
    USER_CHECKOUT.innerHTML = `${capitalize(usuarioInicioSesion[0].usuario)}`;
    getRandomArbitrary(1, 100000000000);
})