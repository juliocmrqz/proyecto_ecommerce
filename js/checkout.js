const NRO_ORDEN = document.getElementById("nro-orden");
const USER_CHECKOUT = document.getElementById("user-checkout");

document.addEventListener('DOMContentLoaded', function () {
  let usuarioInicioSesion = JSON.parse(localStorage.getItem('usuario'));
  USER_CHECKOUT.innerHTML = `${capitalize(usuarioInicioSesion[0].usuario)}`;
  NRO_ORDEN.innerText = sessionStorage.getItem('orderNumber');
})