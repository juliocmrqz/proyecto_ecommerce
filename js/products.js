const ORDER_ASC_BY_PRICE = "0-9";
const ORDER_DESC_BY_PRICE = "9-0";
const ORDER_BY_PROD_SOLDCOUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
const notFoundText = "Por favor intenta con otro dato";
const productsContainer = document.getElementById("product-list-container");
const searchBar = document.getElementById("buscador");

/**
Función que toma un criterio y un listado que se le pase y devuelve el orden
en el que va a acceder a los indices de la lista para ordenarlos.
 */
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLDCOUNT) {
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
        // Se inicia el filtro por precio
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

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
                             <small class="text-muted">${product.soldCount} artículos vendidos</small>
                         </div>
                         <p class="mb-1">${product.description}</p>
                         <strong><p class="mb-1">${product.currency} ${product.cost}</p></strong>
                     </div>
                 </div>
             </a>`
        }
    }
    //  salgo del for con todos los datos incluidos sin sobreescribirlos
    productsContainer.innerHTML = htmlContentToAppend;
}

/**
 * Toma los valores que trae la lista de productos y los ordena según el criterio que se le pase.
 */
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
    // const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
    getJSONData(PRODUCTS_URL).then(function (productsAsAnObject) {
        if (productsAsAnObject.status === "ok") {
            // Muestro los datos sin ningún orden especifico sino como los trae el JSON.
            currentProductsArray = productsAsAnObject.data;
            showProductsList();
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_DESC_BY_PRICE);
    });
    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_BY_PROD_SOLDCOUNT);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        searchBar.value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
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

// Obtengo la barra del buscador y el elemento div donde ingresar los datos

const searchBarFilter = () => {
    const searchBarText = searchBar.value.toLowerCase();
    productsContainer.innerHTML = "";
    let c = 0;
    for (let product of currentProductsArray) {
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            let nombre = product.name.toLowerCase();
            if ((nombre.includes(searchBarText))) {
                productsContainer.innerHTML += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name}</h4>
                        <small class="text-muted">${product.soldCount} artículos vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                    <strong><p class="mb-1">${product.currency} ${product.cost}</p></strong>
                </div>
            </div>
        </a>`;
        // Sumo 1 conforme vaya encontrando valores, si no encuentra pasa a 0 y eso ejecuta el siguiente if.
                c++;
            }
        }
    }
    if (c === 0) {
        productsContainer.innerHTML = `
        <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">Producto NO encontrado</h4>
        </div>
        <p class="mb-1">${notFoundText}</p>
    </div>`;
    }
}

/*
Función que se ejecuta una vez que se haya lanzado el evento de
que el documento se encuentra cargado, es decir, se encuentran todos los
elementos HTML presentes.
*/

document.addEventListener("DOMContentLoaded", function (e) {
    productsListWithFilters()
    searchBar.addEventListener('keyup', searchBarFilter);
});