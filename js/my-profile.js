const USER_PROFILE_NAME = document.getElementById("user-profile-name"); // obligatorio
const USER_PROFILE_MAIL = document.getElementById("user-profile-mail"); // obligatorio
const USER_PROFILE_ADDRESS = document.getElementById("user-profile-address");
const USER_PROFILE_PHONE = document.getElementById("user-profile-phone"); // obligatorio
const USER_PROFILE_AGE = document.getElementById("user-profile-age"); // obligatorio
const USER_PROFILE_COUNTRY = document.getElementById("user-profile-country");
const BOTON_EDIT_PROFILE = document.getElementById("boton-edit-profile");
const ALERT_SUCCESSFUL_SAVE = document.getElementById("alert-successful-save");
const PROFILE_IMAGE = document.getElementById("profile-image");
const BOTON_SAVE_PROFILE = document.getElementById("save-button");
const PROFILE_IMAGE_FILE_SOURCE = document.getElementById("profile-image-file-source");

/**
 * Espera el evento click del boton para editar el perfil
 * habilita los campos para editarlos
 * agrega clases a los campos para hacerlos visible al usuario
 * muestra el boton de guardado así como el texto de campos obligatorios
 * oculta el boton de editar
 */
BOTON_EDIT_PROFILE.addEventListener('click', function (e) {
    PROFILE_IMAGE_FILE_SOURCE.removeAttribute('hidden');
    USER_PROFILE_NAME.removeAttribute('disabled');
    USER_PROFILE_MAIL.removeAttribute('disabled');
    USER_PROFILE_NAME.classList = "form-control border-light shadow-sm bg-body rounded";
    USER_PROFILE_MAIL.classList = "form-control border-light shadow-sm bg-body rounded";
    USER_PROFILE_ADDRESS.removeAttribute('disabled');
    USER_PROFILE_PHONE.removeAttribute('disabled');
    USER_PROFILE_ADDRESS.classList = "form-control border-dark shadow-sm bg-body rounded";
    USER_PROFILE_PHONE.classList = "form-control border-dark shadow-sm bg-body rounded";
    USER_PROFILE_AGE.removeAttribute('disabled');
    USER_PROFILE_COUNTRY.removeAttribute('disabled');
    USER_PROFILE_AGE.classList = "form-control border-dark shadow-sm bg-body rounded";
    USER_PROFILE_COUNTRY.classList = "form-control border-dark shadow-sm bg-body rounded";
    document.getElementById("edit-after-click").style.display = "";
    BOTON_SAVE_PROFILE.style.display = "";
    document.getElementById("boton-edit-profile").style.display = "none";
});

/**
 * Espera el evento click para evaluar que los campos obligaotrios no queren vacíos o undefined
 * Si está todo correcto muestra el mensaje de guardado correctamente
 * Mensaje guardado desaparece al segundo
 * También oculta el boton de guardado y muestra nuevamente el boton de editar
 * Llama a la función que guarda los datos del formulario en un objeto en localstorage
 * Si los datos obligatorios quedan vacíos, muestra un alert que detiene la ejecución del guardado
 * Para completarlos
 */
BOTON_SAVE_PROFILE.addEventListener("click", function (e) {
    if (
        (USER_PROFILE_NAME.value != "" && USER_PROFILE_NAME.value !== undefined) &&
        (USER_PROFILE_MAIL.value != "" && USER_PROFILE_MAIL.value !== undefined) &&
        (USER_PROFILE_AGE.value != "" && USER_PROFILE_AGE.value !== undefined) &&
        (USER_PROFILE_PHONE.value != "" && USER_PROFILE_PHONE.value !== undefined)
    ) {
        ALERT_SUCCESSFUL_SAVE.classList = "alert alert-success alert-dismissible show";
        setTimeout(() => {
            ALERT_SUCCESSFUL_SAVE.classList = "alert alert-success fade";
        }, 1000);
        BOTON_SAVE_PROFILE.style.display = "none";
        document.getElementById("boton-edit-profile").style.display = "";
        document.getElementById("edit-after-click").style.display = "none";
        USER_PROFILE_NAME.setAttribute('disabled', '');
        USER_PROFILE_MAIL.setAttribute('disabled', '');
        USER_PROFILE_NAME.classList = "form-control";
        USER_PROFILE_MAIL.classList = "form-control";
        USER_PROFILE_ADDRESS.setAttribute('disabled', '');
        USER_PROFILE_PHONE.setAttribute('disabled', '');
        USER_PROFILE_ADDRESS.classList = "form-control";
        USER_PROFILE_PHONE.classList = "form-control";
        USER_PROFILE_AGE.setAttribute('disabled', '');
        USER_PROFILE_COUNTRY.setAttribute('disabled', '');
        USER_PROFILE_AGE.classList = "form-control";
        USER_PROFILE_COUNTRY.classList = "form-control";
        PROFILE_IMAGE_FILE_SOURCE.setAttribute('hidden', '');
        myProfile();
    } else {
        alert("Completar datos obligatorios")
    }
})

/**
 * La función crea un registro con los datos del formulario
 * Guarda ese registro en el localstorage
 */
function myProfile() {
    let myProfileInformation = {
        names: USER_PROFILE_NAME.value, // obligatorio
        age: USER_PROFILE_AGE.value, // obligatorio
        email: USER_PROFILE_MAIL.value, // obligatorio
        phone: USER_PROFILE_PHONE.value, // obligatorio
        address: USER_PROFILE_ADDRESS.value,
        country: USER_PROFILE_COUNTRY.value,
        imageSource: PROFILE_IMAGE.src
    }
    localStorage.setItem("myProfileInformation", JSON.stringify(myProfileInformation));
}


/**
 * Función que obtiene los datos guardados en el local storage
 * Si los mismos no están null
 * Los agrega para mostrarlos como datos del formulario completados
 */
function getProfileInfo() {
    let myProfileInfoSaved = JSON.parse(localStorage.getItem("myProfileInformation"));
    if (myProfileInfoSaved !== null) {
        USER_PROFILE_NAME.value = myProfileInfoSaved.names;
        USER_PROFILE_MAIL.value = myProfileInfoSaved.email;
        USER_PROFILE_ADDRESS.value = myProfileInfoSaved.address;
        USER_PROFILE_PHONE.value = myProfileInfoSaved.phone;
        USER_PROFILE_AGE.value = myProfileInfoSaved.age;
        USER_PROFILE_COUNTRY.value = myProfileInfoSaved.country;
        PROFILE_IMAGE.src = myProfileInfoSaved.imageSource;
    }
}

/**
 * Función que muestra la imagen
 * Para ellos obtiene el archivo que se haya cargado
 * Crea el objeto lector de archivos el cual convierte el mismo en DaraURL, código de la imagen
 * Evalua si existe lo convierte a datos para almacenar, sino existe sigue mostrando la imagen predeterminada
 * Si se carga archivo se hace un display del archivo que se cargó
 * Pasandolo al source de la imagen, lo cual permite guardarlo como imagen en el objeto de todo el perfil
 * en lugar de almacenar a parte y agregandolo al perfil
 */
function showProfileImage() {
    let profile_image_files0 = PROFILE_IMAGE_FILE_SOURCE.files[0];
    const READER = new FileReader();
    if (profile_image_files0) {
        READER.readAsDataURL(profile_image_files0);
    } else {
        PROFILE_IMAGE.src = "https://img.icons8.com/bubbles/100/000000/user.png";
    }
    READER.addEventListener('load', () => {
        PROFILE_IMAGE.src = READER.result;
    })
}
/**
 * Se llama a la función de obtención de datos de perfil 
 * al cargar la página, en caso tal de que se hayan guardado.
 */
document.addEventListener("DOMContentLoaded", function (e) {
    getProfileInfo();
});