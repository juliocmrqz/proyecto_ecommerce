const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const NAVBAR_ALL = document.getElementById("navbar-all");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

/**
 * Función que se ejecuta una vez que se haya lanzado el evento de
 * que el documento se encuentra cargado, es decir, se encuentran todos los
 * elementos HTML presentes.
 */
function navigationBarAllPages() {
  NAVBAR_ALL.setAttribute('class', 'sticky-top')
  NAVBAR_ALL.innerHTML = `
  <div class="hamburger">
    <i class="fas fa-bars fa-2x"></i>
  </div>
  <ul class="nav-links">
    <li><a href="home.html">Inicio</a></li>
    <li><a href="categories.html">Categorías</a></li>
    <li><a href="products.html">Productos</a></li>
    <li><a href="sell.html">Vender</a></li>
    <li>
      <div class="dropdown">
        <a id="dropdownMenuLink" class="btn btn-secondary dropdown-toggle cerrarsesion" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span id="userlocal"></span>
        </a>
        <span id="userlocal-list-item"></span>
    </li>
  </ul>`
}

/**
 * Función para agregar la clase necesaria para que funcione el dropdown resposive cuando la pantalla reduce
 */
function hamburgerNavigationBar() {
  const HAMBURGER = document.querySelector('.hamburger');
  const NAV_LINKS = document.querySelector('.nav-links');
  HAMBURGER.addEventListener('click', function (e) {
    NAV_LINKS.classList.toggle('open');
  })
}

/**
 * Función de cierre de sesión sea con Google o normalmente para redirigir al Login page 
 */
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  })
  location.href = "index.html";
  localStorage.removeItem('usuario');
  localStorage.removeItem('usuarioGoogle');
}

/**
 * Función complementaria a Google
 */
function onLoad() {
  gapi.load('auth2', function () {
    gapi.auth2.init();
  });
}

/**
 * Función que toma la palabra completa, la vuelve minúsculas
 * Luego toma el primer caracter y lo vuelve mayuscula y concatena con el resto de la palabra iniciando
 * en el indice 1.
 */
function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * Función que toma al usuario que esté guardado en el localstorage como usuario y lo muestra dentro
 * de un boton en la barra de navegación.
 */
function loginUserAllPages() {
  // obtengo el div donde voy a agregar los datos y funcionalidades
  const USER_LOCAL = document.getElementById("userlocal");
  const USER_LOCAL_LIST_ITEM = document.getElementById("userlocal-list-item");

  // Tomo los datos que instancié en usuario dentro de login.js
  // Considero de no ser null el usuarioInicioSesion insertar el elemento solo considerando el usuario con sus funcionalidades
  // agrego la excepción si no existe nada me libere el boton Login
  let usuarioInicioSesion = JSON.parse(localStorage.getItem('usuario'));
  if (usuarioInicioSesion != null) {
    USER_LOCAL.innerHTML += `${capitalize(usuarioInicioSesion[0].usuario)}`
    USER_LOCAL_LIST_ITEM.innerHTML += `<div id="dropdownMenuContainer" class="dropdown-menu dropdown-menu-right dropdown-menu-md-left" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" href="my-profile.html"><i class="far fa-user"></i> Mi perfil</a>
    <a class="dropdown-item" href="cart.html"><i class="fas fa-cart-arrow-down"></i> Mi Carrito</a>
    <a class="dropdown-item" href="#" onclick="signOut();"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>
  </div>
  </div>`
  } else { // Poder redirigir al home si el usuario no está loggeado por defecto.
    USER_LOCAL.innerHTML += `Login`
    USER_LOCAL_LIST_ITEM.innerHTML += `<div id="dropdownMenuContainer" class="dropdown-menu dropdown-menu-right dropdown-menu-md-left" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" href="#" onclick="signOut();">Iniciar Sesión</a>
  </div>
  </div>`
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  navigationBarAllPages();
  loginUserAllPages();
  hamburgerNavigationBar();
});