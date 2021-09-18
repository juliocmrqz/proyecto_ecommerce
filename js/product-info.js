const PRODUCT_INFO_CONTAINER = document.getElementById("product-info-container");
const PRODUCT_INFO = document.getElementById("product-info");
const PRODUCT_INFO_DISPLAY = document.getElementById("product-info-display");
const IMAGE_CONTAINER = document.getElementById("main-image-container");
const PRODUCT_NAME = document.getElementById("product-name");
const PRODUCT_CATEGORY = document.getElementById("product-info-category");
const PRODUCTS_INFO_URL = document.createElement("a");
const COMENTARIOS = document.getElementById("comentarios-container");
const PRODUCT_INFO_PRICE = document.getElementById("product-info-price");
const PRODUCT_INFO_SOLDCOUNT = document.getElementById("product-info-soldcount");
const PRODUCT_INFO_DESCRIPTION = document.getElementById("product-info-description");
const FORMULARIO_COMENTARIOS = document.getElementById("formulario-comentarios");
let currentProduct = [];
let comentariosLista = [];

// Funciones para mostrar las imagenes de los productos en un carousel hecho con bootstrap
function ShowProductInfo(productInfo) {
  if (productInfo != undefined) {
    currentProduct = productInfo
  }
  // Como extra tomo el nombre del producto y lo anexo al title del documento en HTML
  document.title = `eMercado - ${currentProduct.name}`;
  /*
  { me falta por mostrar los siguientes datos en la página del JSON de info producto
    "relatedProducts": [1, 3]
   */
  // contenedor de la información del producto
  PRODUCT_INFO_CONTAINER.setAttribute("class", "small-container");
  PRODUCT_INFO.setAttribute("class", "row");
  // contenedor de las imagenes del producto
  PRODUCT_INFO_DISPLAY.setAttribute("class", "col-md-6")
  IMAGE_CONTAINER.setAttribute("class", "text-center col-md-6");
  PRODUCT_NAME.setAttribute("class", "font-weight-bold w-100");
  PRODUCT_NAME.innerHTML = currentProduct.name;
  // Categoría del producto
  PRODUCT_CATEGORY.setAttribute("class", "text-muted");
  PRODUCTS_INFO_URL.href = "products.html";
  PRODUCTS_INFO_URL.innerHTML = currentProduct.category;
  PRODUCT_CATEGORY.appendChild(PRODUCTS_INFO_URL);
  // Precio del producto
  PRODUCT_INFO_PRICE.setAttribute("class", "w-100");
  PRODUCT_INFO_PRICE.innerHTML = `${currentProduct.currency} ${currentProduct.cost}`;
  // Cantidad de productos vendidos
  PRODUCT_INFO_SOLDCOUNT.setAttribute("class", "text-muted");
  PRODUCT_INFO_SOLDCOUNT.innerHTML = `${currentProduct.soldCount} artículos vendidos`;
  // Descripción del producto
  PRODUCT_INFO_DESCRIPTION.innerHTML = `${currentProduct.description}`;
  PRODUCT_INFO_DESCRIPTION.style.textAlign = "justify";
  // Contenedor de las imagenes del producto
  IMAGE_CONTAINER.innerHTML = `<div id="carouselProducto" class="carousel slide" data-ride="carousel"><div class="carousel-inner"></div></div>`
  // Como me traigo una colección de elementos con ese nombre, debo posicionarme en el inicial
  let carouselContainer = document.getElementsByClassName("carousel-inner")[0]
  for (let i = 0; i < currentProduct.images.length; i++) {
    const imagen = currentProduct.images[i];
    carouselContainer.innerHTML += `<div class="carousel-item"><img src="${imagen}" class="d-block w-100" alt="Imagen del producto"></div>`
  }
  /* Traigo una colección de elementos con la clase carousel-item para poder ir 
    agregandole la clase active y que se muestre en el carousel.*/
  let imagenes = document.getElementsByClassName("carousel-item")
  imagenes[0].className += " active"
  //inserto los controles para el cambio de imagen
  carouselContainer.innerHTML += `<a class="carousel-control-prev" href="#carouselProducto" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span></a>
  <a class="carousel-control-next" href="#carouselProducto" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>`
}

/**
 * Función para ordenar los comentarios que recibe del JSON ordenandolos por la conversión del 
 * tiempo en el que fue hecho a formato número para poder ordenar
 */
function sortComentarios(array) {
  array.sort(function (a, b) {
    var dateA = new Date(a.dateTime).getTime();
    var dateB = new Date(b.dateTime).getTime();
    return dateA < dateB ? 1 : -1; // Investigar qué hace estructurar de esta forma!!!!!!!!!!
  });
  return array;
}

/**
 * Función que toma el evento submit del formulario para 
 * Tomar la fecha actual de sistema
 * Obtener los datos del formulario
 * Limpiar el contenedor de los comentarios 
 * Insertar en el objeto newcomment los datos del formulario
 * Mostrar los comentarios llamados del Objeto comentariosLista
 */
function newCommentToAppendToCommentsObject() {
  FORMULARIO_COMENTARIOS.addEventListener("submit", function (e) {
    e.preventDefault();
    let date = new Date();

    let newcomment = {
      score: parseInt(document.querySelector('input[type="radio"]:checked').value),
      description: document.getElementById("comentarios").value,
      user: JSON.parse(localStorage.getItem('usuario'))[0].usuario,
      dateTime: `${date.getFullYear()}-${(date.getMonth()+1 < 10) ? "0" : ""}${date.getMonth()}-${date.getDate() < 10 ? "0" : ""}${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };

    COMENTARIOS.innerHTML = '';
    comentariosLista.push(newcomment);
    comentariosJSON();
  })
}

function comentariosJSON() {
  comentariosLista = sortComentarios(comentariosLista);
  for (let i = 0; i < comentariosLista.length; i++) {
    let comentarios = comentariosLista[i];

    for (let i = 1; i <= 5; i++) {
      if (i <= comentarios.score) {
        COMENTARIOS.innerHTML += `<span class="fas fa-star checked"></span>`
      } else {
        COMENTARIOS.innerHTML += `<span class="fas fa-star"></span>`
      }
    }

    COMENTARIOS.innerHTML += `<div class="row"><div class="col"><div class="d-flex w-100 justify-content-between">
        <h6 class="font-weight-bold">${comentarios.user}</h6>
        <small class="text-muted">${comentarios.dateTime}</small></div>
        <p class="mb-3">${comentarios.description}</p></div></div>
        <hr class="mt-0">`
  };
  FORMULARIO_COMENTARIOS.reset();
}


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      ShowProductInfo(resultObj.data);
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentariosLista = resultObj.data;
      comentariosJSON();
      newCommentToAppendToCommentsObject();
    }
  });
});