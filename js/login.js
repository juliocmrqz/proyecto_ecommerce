/**
 * Se crean las constantes necesarias para traerme los datos el formulario y sus datos
 * No utilizo preventDefault en el eventListener ya que me evita la ejecución del action del formulario
 * No tengo que utilizar location.href porque tengo un action al submit
 */
const formularioInicioSesion = document.getElementById("formularioInicioSesion");
const usuarioInicioSesion = document.getElementById("usuarioInicioSesion");
const passwordInicioSesion = document.getElementById("passwordInicioSesion");

formularioInicioSesion.addEventListener('submit', function (event) {
    let usuariosIniciados = Array({
        usuario: usuarioInicioSesion.value,
        /* No es necesario almacenar la contraseña por ahora porque no estoy validando contra 
        base de dato alguna */
        // password: passwordInicioSesion.value,
    })
    localStorage.setItem('usuario', JSON.stringify(usuariosIniciados));
});

/**
 * USO FUNCION DE GOOGLE PARA INICIO DE SESIÓN
 * PENSAR EN UNA FORMA DE OBTENER LOS DATOS PARA PODER ALMACENARLOS Y MOSTRARLOS EN EL MISMO LOCALSTORAGE SI INICIARA
 * SESIÓN CON EL FORMULARIO
 * RECORDAR QUE SIEMPRE QUE QUIERA TRABAJAR EN SERVIDOR LOCAL ME VA A SALTAR ERROR DE OBTENCIÓN DE CREDENCIALES.
 */
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    window.location.href = "home.html";
}

/* No utilizo el DOMContentLoaded ya que tengo el script ejecutando al final de la página y son todos eventos externos. 
document.addEventListener("DOMContentLoaded", function (e) {});
*/