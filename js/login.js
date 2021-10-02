const formularioInicioSesion = document.getElementById("formularioInicioSesion");
const usuarioInicioSesion = document.getElementById("usuarioInicioSesion");
const passwordInicioSesion = document.getElementById("passwordInicioSesion");

/**
 * Función que toma los campos no vacíos y permite iniciar sesión
 * Almacena al usuario en un objeto de usuarios loggeados
 */
function redirectToHomeIfValidated() {
  if (usuarioInicioSesion.value === "" || passwordInicioSesion.value === "") {} else {
    window.location.href = "home.html"
    let usuariosIniciados = Array({
      usuario: usuarioInicioSesion.value
    })
    localStorage.setItem('usuario', JSON.stringify(usuariosIniciados));
  }
}


/**
 * Inicio de sesión por google
 * Toma los datos del servidor de google y los puedo almacenar en un objeto de usuarios loggeados.
 */
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  let usuariosIniciados = Array({
    usuario: profile.getName()
  })
  localStorage.setItem('usuario', JSON.stringify(usuariosIniciados));
  window.location.href = "home.html";
}

// Datos que trae la función de google también, no utilizados por ahora.
// console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
// console.log('Name: ' + profile.getName());
// console.log('Image URL: ' + profile.getImageUrl());
// console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.