// obtengo el div donde voy a agregar los datos y funcionalidades
const userlocal = document.getElementById("userlocal");

// función para capitalizar una palabra
function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

// Tomo los datos que instancié en usuario dentro de login.js
let usuarioInicioSesion = JSON.parse(localStorage.getItem('usuario'));

// Considero de no ser null el usuarioInicioSesion insertar el elemento solo considerando el usuario con sus funcionalidades
if (usuarioInicioSesion != null) {
  userlocal.innerHTML += `<a id="nombreUsuario" class="py-2 d-none d-md-inline-block cerrarsesion" href="#" onclick="signOut();">${capitalize(usuarioInicioSesion[0].usuario)}</a>`
} else { // agrego la excepción si no existe nada me libere el boton Login
  userlocal.innerHTML += `<a class="py-2 d-none d-md-inline-block" href="index.html" onclick="signOut();">Login</a>`
}
// Si quiero obtener los usuarios que está almacenando la página anterior en consola
// console.log(usuarioInicioSesion);


/**
 * TO DO
 * Agregar los datos del usuario y probar si funciona todo ok con Google
 */


// Función de cierre de sesión sea con Google o normalmente para redirigir al Login page
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  })
  location.href = "index.html";
  localStorage.removeItem('usuario');
}

function onLoad() {
  gapi.load('auth2', function () {
    gapi.auth2.init();
  });
}