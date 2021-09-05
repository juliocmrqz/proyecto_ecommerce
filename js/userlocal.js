// obtengo el div donde voy a agregar los datos y funcionalidades
const USER_LOCAL = document.getElementById("userlocal");

// función para capitalizar una palabra
function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

// Tomo los datos que instancié en usuario dentro de login.js
// Considero de no ser null el usuarioInicioSesion insertar el elemento solo considerando el usuario con sus funcionalidades
// agrego la excepción si no existe nada me libere el boton Login
let usuarioInicioSesion = JSON.parse(localStorage.getItem('usuario'));
if (usuarioInicioSesion != null) {
  USER_LOCAL.innerHTML += `<a id="nombreUsuario" class="py-2 d-none d-md-inline-block cerrarsesion" href="#" onclick="signOut();">${capitalize(usuarioInicioSesion[0].usuario)}</a>`
}
else {
  USER_LOCAL.innerHTML += `<a class="py-2 d-none d-md-inline-block" href="index.html" onclick="signOut();">Login</a>`
}

// Función de cierre de sesión sea con Google o normalmente para redirigir al Login page
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  })
  location.href = "index.html";
  localStorage.removeItem('usuario');
}

/**
 * TO DO
 * Aún me queda por investigar qué está accionando esta función necesaria para el login de Google.
 */
function onLoad() {
  gapi.load('auth2', function () {
    gapi.auth2.init();
  });
}