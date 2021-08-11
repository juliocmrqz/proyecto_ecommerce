/**
 * Hacer la petición a la URL que contiene el JSON con todos los productos
 * const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
 * Hay que traernos la información básica de cada producto, para ello hay que tener claro cómo se llama el dato al que queremos acceder desde el json
 * 
 */

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array) {
    let result = [];

    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) {
                return -1;
            }
            if (aCount < bCount) {
                return 1;
            }
            return 0;
        });
    }
    return result;
}

/**
 * Función que toma los valores de productos y los inserta al HTML.
 * Toma las variables del minimo y máximo para filtrar en caso tal que hayan valores minimo, máximo.
 * Toma los valores númericos texto a números enteros para comparaciones matemáticas.
 */
function showProductsList() {

    let htmlContentToAppend = "";

    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        // Se inicia el filtro por cantidad
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount))) {

            // datos a insertar en el html que dependen del filtro
            htmlContentToAppend += `
             <a href="product-info.html" class="list-group-item list-group-item-action">
                 <div class="row">
                     <div class="col-3">
                         <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                     </div>
                     <div class="col">
                         <div class="d-flex w-100 justify-content-between">
                             <h4 class="mb-1">${product.name}</h4>
                             <small class="text-muted">${product.soldCount} artículos</small>
                         </div>
                         <p class="mb-1">${product.description}</p>
                     </div>
                 </div>
             </a>`
        }
    }
    //  salgo del for con todos los datos incluidos sin sobreescribirlos
    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProductsList(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro productos ordenados
    showProductsList();
}

function productsListWithFilters() {
    getJSONData(PRODUCTS_URL).then(function (productsAsAnObject) {
        if (productsAsAnObject.status === "ok") {
            sortAndShowProductsList(ORDER_ASC_BY_NAME, productsAsAnObject.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsList();
    });
}

// Función que se ejecuta una vez que se haya lanzado el evento de
// que el documento se encuentra cargado, es decir, se encuentran todos los
// elementos HTML presentes.
document.addEventListener("DOMContentLoaded", productsListWithFilters());