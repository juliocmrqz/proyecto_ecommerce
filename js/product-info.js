let currentProduct = {};
const PRODUCT_INFORMATION_TITLE = document.getElementById("product-info-title");
const PRODUCT_INFO_CONTAINER = document.getElementById("product-info-container");
const PRODUCT_INFO = document.getElementById("product-info");
const PRODUCT_INFO_DISPLAY = document.getElementById("product-info-display");
const MAIN_IMAGE_CONTAINER = document.getElementById("main-image-container");
const MAIN_IMAGE = document.getElementById("main-image");
const PRODUCT_NAME = document.getElementById("product-name");
const PRODUCT_CATEGORY = document.getElementById("product-info-category");
const PRODUCTS_INFO_URL = document.createElement("a");



// https://www.youtube.com/watch?v=ENyk_W-Eleo continuar con esa idea de presentación

function ShowProductInfo(productInfo) {
  if (productInfo != undefined) {
    currentProduct = productInfo
  }
  console.log(currentProduct);
  document.title = `eMercado - ${currentProduct.name}`;

  // titulo de la página de producto
  PRODUCT_INFORMATION_TITLE.setAttribute("class", "mt-5 mb-5 text-center font-weight-bolder");

  // contenedor de la información del producto
  PRODUCT_INFO_CONTAINER.setAttribute("class", "small-container");
  PRODUCT_INFO.setAttribute("class", "row");

  // contenedor de la imagen principal del producto
  MAIN_IMAGE_CONTAINER.setAttribute("class", "text-center col-md-6");
  MAIN_IMAGE.setAttribute("src", currentProduct.images[0]);
  MAIN_IMAGE.setAttribute("class", "w-100");
  MAIN_IMAGE.setAttribute("alt", currentProduct.name);

  PRODUCT_INFO_DISPLAY.setAttribute("class", "col-md-6")
  PRODUCT_NAME.setAttribute("class", "font-weight-bold w-100");
  PRODUCT_NAME.innerHTML = currentProduct.name;

  PRODUCT_CATEGORY.setAttribute("class", "text-muted");
  PRODUCTS_INFO_URL.href = "products.html";
  PRODUCTS_INFO_URL.innerHTML = currentProduct.category;

  PRODUCT_CATEGORY.appendChild(PRODUCTS_INFO_URL);









  // PRODUCT_CONTAINER.innerHTML = `
  //           <div class="row">


  //           <div class="col-md-6">
  //             <div>
  //               <h2 class="font-weight-bold w-100">${currentProduct.name}</h1>
  //               <p class="text-muted">Categoría: <a href="products.html">${currentProduct.category}</a></p>
  //             </div>
  //             <h3 class"w-100">Precio: ${currentProduct.currency} ${currentProduct.cost}</h3>
  //             <div class="row">
  //               <small class="text-muted col-md-12">${currentProduct.soldCount} artículos vendidos</small>
  //             </div>
  //             <div class="row">
  //             </div>
  //               <p class="mt-2 mb-0 font-weight-bold">Descripción</p>
  //               <p class="">${currentProduct.description}</p>
  //             </div>
  //           </div>`

  // for (const imagen of currentProduct.images) {
  // let imagen0 = imagen;
  // console.log(imagen0);  
  // }

  // /* Contenedor de las imagenes, es un recorrido de la lista de imagenes que recibe del JSON */
  // let IMAGES_CONTAINER = document.getElementsByClassName("container");
  // for (let i = 0; i < currentProduct.images.length; i++) {
  //   let imagen = currentProduct.images[i];
  //   IMAGES_CONTAINER.innerHTML += ` 
  //   <div id="imagen0"></div>`
  //   let imagenCentral = document.getElementById("imagen0");
  //   imagenCentral.innerHTML = `
  //       <img src="${imagen[0]}" class="d-block w-100" alt="">`
  // };

}

// imagenes[0].className += " active"

// IMAGES_CONTAINER.innerHTML += `
// </div>
// <a class="carousel-control-prev" href="#carouselProducto" role="button" data-slide="prev">
//   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//   <span class="sr-only">Previous</span>
// </a>
// <a class="carousel-control-next" href="#carouselProducto" role="button" data-slide="next">
//   <span class="carousel-control-next-icon" aria-hidden="true"></span>
//   <span class="sr-only">Next</span>
// </a>
// </div>`

//     <h1 class="text-center">${currentProduct.name}</h1>
//     <div class="col-6">
//         <div id="carouselProducto" class="carousel slide" data-ride="carousel">
//             <div class="carousel-inner">
//             <span class="carousel-control-next-icon" aria-hidden="true"></span></div>
//         </div>
//     </div>
//   <div class="col-6">
//     <h2>${currentProduct.currency} ${currentProduct.cost}</h2>
//     <p>${currentProduct.description}</p>
//     </div>`
//     // <button class="btn btn-primary">Agregar al carrito</button>

//     let IMAGES_CONTAINER = document.getElementsByClassName("carousel-inner")[0];
//     for (let i = 0; i < currentProduct.images.length; i++) {
//         let imagen = currentProduct.images[i];
//         IMAGES_CONTAINER.innerHTML += ` 
//         <div class="carousel-item">
//         <img src="${imagen}" class="d-block w-100" alt="">
//       </div>


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      ShowProductInfo(resultObj.data);
    }
  });
});