// Obtengo los contenedores donde se van a agregar los datos para poder manejarlos por JS
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
const RELATED_PRODUCTS_CONTAINER = document.getElementById("related-products-container");
// Creo las listas necesarias para poder anexar tanto la lista de datos que me devuelve para la información del producto
// como los datos necesarios para mostrar los comentarios que se van agregando a la página
let currentProductInformation = [];
let comentariosLista = [];
let relatedProductsList = [];

// Función para mostrar la información de todo el producto
function showProductInformation(productInfo) {
  if (productInfo != undefined) {
    currentProductInformation = productInfo
  }
  // Como extra tomo el nombre del producto y lo anexo al title del documento en HTML
  document.title = `eMercado - ${currentProductInformation.name}`;

  // contenedor de la información del producto
  PRODUCT_INFO_CONTAINER.setAttribute("class", "small-container");
  PRODUCT_INFO.setAttribute("class", "row");
  // contenedor de las imagenes del producto
  PRODUCT_INFO_DISPLAY.setAttribute("class", "col-md-6")
  IMAGE_CONTAINER.setAttribute("class", "text-center col-md-6");
  PRODUCT_NAME.setAttribute("class", "font-weight-bold w-100");
  PRODUCT_NAME.innerHTML = currentProductInformation.name;
  // Categoría del producto
  PRODUCT_CATEGORY.setAttribute("class", "text-muted");
  PRODUCTS_INFO_URL.href = "products.html";
  PRODUCTS_INFO_URL.innerHTML = currentProductInformation.category;
  PRODUCT_CATEGORY.appendChild(PRODUCTS_INFO_URL);
  // Precio del producto
  PRODUCT_INFO_PRICE.setAttribute("class", "w-100");
  PRODUCT_INFO_PRICE.innerHTML = `${currentProductInformation.currency} ${currentProductInformation.cost}`;
  // Cantidad de productos vendidos
  PRODUCT_INFO_SOLDCOUNT.setAttribute("class", "text-muted");
  PRODUCT_INFO_SOLDCOUNT.innerHTML = `${currentProductInformation.soldCount} artículos vendidos`;
  // Descripción del producto
  PRODUCT_INFO_DESCRIPTION.innerHTML = `${currentProductInformation.description}`;
  PRODUCT_INFO_DESCRIPTION.style.textAlign = "justify";
  /* Contenedor de las imagenes del producto
  Traigo una colección de elementos con la clase carousel-item para poder ir agregandole la clase active y que se muestre en el carousel
  Como me traigo una colección de elementos con ese nombre, debo posicionarme en el inicial
  inserto los controles para el cambio de imagen
  */
  IMAGE_CONTAINER.innerHTML = `<div id="product-images-carousel" class="carousel slide" data-ride="carousel"><div class="carousel-inner"></div></div>`
  let carouselContainer = document.getElementsByClassName("carousel-inner")[0]
  for (let i = 0; i < currentProductInformation.images.length; i++) {
    const listaDeImagenes = currentProductInformation.images[i];
    carouselContainer.innerHTML += `<div class="carousel-item"><img src="${listaDeImagenes}" class="d-block w-100" alt="Imagen del producto"></div>`
  }
  let imagesInCarousel = document.getElementsByClassName("carousel-item")
  imagesInCarousel[0].className += " active"
  carouselContainer.innerHTML += `<a class="carousel-control-prev" href="#product-images-carousel" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span></a>
  <a class="carousel-control-next" href="#product-images-carousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>`
}

/**
 * Toma un listado de productos obtenidos del JSON
 * Setea el listado en una variable global
 * Recorre el listado de productos relacionados del objeto información de producto actual
 * Mapea los datos de la lista de productos considerando el indice que se le pasa de productos relacionados
 * Inserta en el contenedor de productos relacionados las card con los datos de los productos relacionados
 */
function showRelatedProductsInformation(relatedProductsListInfo) {
  relatedProductsList = relatedProductsListInfo;
  for (let i = 0; i < currentProductInformation.relatedProducts.length; i++) {
    let relatedProductToShow = relatedProductsList[currentProductInformation.relatedProducts[i]]

    RELATED_PRODUCTS_CONTAINER.innerHTML += `
    <div class="card m-2 col-md-3">
      <img src="${relatedProductToShow.imgSrc}" class="card-img-top mt-2" alt="...">
      <div class="card-body">
        <h6 class="card-title font-weight-bold">${relatedProductToShow.name}</h6>
        <p class="card-text">${relatedProductToShow.currency} ${relatedProductToShow.cost}</p>
        <a href="#" class="btn btn-primary">Ver producto</a>
      </div>
    </div>`

  }
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
    let usuarioIniciadoGoogle = localStorage.getItem('usuarioGoogle');
    let usuarioInicioSesion = JSON.parse(localStorage.getItem('usuario'))[0].usuario;
    if (usuarioIniciadoGoogle != null) {
      let newcomment = {
        score: parseInt(document.querySelector('input[type="radio"]:checked').value),
        description: document.getElementById("comentarios").value,
        user: localStorage.getItem('usuarioGoogle'),
        dateTime: `${date.getFullYear()}-${(date.getMonth()+1 < 10) ? "0" : ""}${date.getMonth()}-${date.getDate() < 10 ? "0" : ""}${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      };
      COMENTARIOS.innerHTML = '';
      comentariosLista.push(newcomment);
      comentariosJSON();
    }
    if (usuarioInicioSesion != null) {
      let newcomment = {
        score: parseInt(document.querySelector('input[type="radio"]:checked').value),
        description: document.getElementById("comentarios").value,
        user: usuarioInicioSesion,
        dateTime: `${date.getFullYear()}-${(date.getMonth()+1 < 10) ? "0" : ""}${date.getMonth()}-${date.getDate() < 10 ? "0" : ""}${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      };
      COMENTARIOS.innerHTML = '';
      comentariosLista.push(newcomment);
      comentariosJSON();
    } else {
      let newcomment = {
        score: parseInt(document.querySelector('input[type="radio"]:checked').value),
        description: document.getElementById("comentarios").value,
        user: "Invitado",
        dateTime: `${date.getFullYear()}-${(date.getMonth()+1 < 10) ? "0" : ""}${date.getMonth()}-${date.getDate() < 10 ? "0" : ""}${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      };
      COMENTARIOS.innerHTML = '';
      comentariosLista.push(newcomment);
      comentariosJSON();
    }
  })
}


/**
 * Función que toma los comentarios que recibe del JSON ordenandolos por la conversión del 
 * tiempo en el que fue hecho a formato número para poder ordenar
 */
function sortComentariosByDate(listaDeComentarios) {
  listaDeComentarios.sort(function (a, b) {
    var dateA = new Date(a.dateTime).getTime();
    var dateB = new Date(b.dateTime).getTime();
    return dateA < dateB ? 1 : -1;
  });
  return listaDeComentarios;
}

/**
 * toma los comentarios que vienen del JSON
 * ordena los comentarios
 * recorre los comentarios tanto para la puntuación como para agregarlos al contenedor HTML que se creó
 */
function comentariosJSON() {
  comentariosLista = sortComentariosByDate(comentariosLista);
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
  getJSONData(PRODUCT_INFO_URL).then(function (productoInformationResult) {
    if (productoInformationResult.status === "ok") {
      showProductInformation(productoInformationResult.data);

    }
  });

  getJSONData(PRODUCTS_URL).then(function (productsResult) {
    if (productsResult.status === "ok") {
      showRelatedProductsInformation(productsResult.data);
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (infoCommentsResult) {
    if (infoCommentsResult.status === "ok") {
      comentariosLista = infoCommentsResult.data;
      comentariosJSON();
      newCommentToAppendToCommentsObject();
    }
  });
});