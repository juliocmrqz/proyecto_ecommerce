const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const NAVBAR_ALL = document.getElementById("navbar-all");

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function navigationBarAllPages() {
  NAVBAR_ALL.innerHTML = `
<div id="userlocal" class="container d-flex flex-column flex-md-row">
      <!-- Boton cuando está reducido el navegador oculte todos los campos del navbar -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Contenedor de los datos de la barra de navegación -->
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="home.html">
              Inicio
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="categories.html">
              Categorías
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="products.html">
              Productos
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sell.html">
              Vender
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="cart.html">
              Mi carrito
            </a>
          </li>
        </ul>
      </div>
    </div>`
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

function onLoad() {
  gapi.load('auth2', function () {
    gapi.auth2.init();
  });
}

function loginUserAllPages() {
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
    USER_LOCAL.innerHTML += `
      <a id="nombreUsuario" class="navbar-brand mr-0 p-md-1 cerrarsesion" href="#" onclick="signOut();">
      ${capitalize(usuarioInicioSesion[0].usuario)}
      </a>`
  } else { // Poder redirigir al home si el usuario no está loggeado por defecto.
    USER_LOCAL.innerHTML += `
      <a class="navbar-brand mr-0 p-md-1" href="index.html" onclick="signOut();">
      Login
            </a>`
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  navigationBarAllPages();
  loginUserAllPages();
});