//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_CONTAINER = document.getElementById("cart-container");
const CART_SUBTOTAL_CONTAINER = document.getElementById("cart-subtotal");
const CART_QUANTITY = document.getElementById("cart-quantity");
const CURRENCY_EXCHANGE = 40;
const CURRENCY = "UYU";
const TOTAL_AFTER_SHIPPING = document.getElementById("total-after-shipping");
const SHIPPING_COST = document.getElementById("shipping-cost");
let btnDanger = document.getElementsByClassName('btn-danger');
let cartProducts;
let subtotal = 0;

/**
 * Toma el indice del valor que recibe
 * Toma el costo del producto
 * Devuelve el valor de la moneda sea ya convertido o si está en pesos, devuelve ese mismo dato.
 */
function currencyConverter(id, cost) {
  let currency = document.getElementById(`currencySubtotal${id}`).innerHTML;
  if (currency == "USD") {
    return CURRENCY_EXCHANGE * cost;
  } else {
    return cost;
  }
}

/**
 * Inicializa el subtotal en 0 y recorre la lista de elementos con la clase subtotal_individual, considerando el subtotal y lo inserta ya convertido a pesos dentro del HTML
 * Además muestra el valor total del carrito más el costo de envío.
 * Considera el indice de cada producto más el costo ya que debe evaluar la moneda del producto para ver si hace o no la conversión a UYU
 */
function showSubtotal() {
  subtotal = 0;
  const SUBTOTAL_INDIVIDUAL_CONTAINER = document.getElementsByClassName('subtotal_individual');
  for (let i = 0; i < SUBTOTAL_INDIVIDUAL_CONTAINER.length; i++) {
    SUBTOTAL_UNICO = SUBTOTAL_INDIVIDUAL_CONTAINER[i];
    subtotal += currencyConverter(i, parseFloat(SUBTOTAL_UNICO.innerText));
  }
  CART_SUBTOTAL_CONTAINER.innerHTML = `UYU ${addCommasToNumbersOverAThousand(subtotal.toFixed(2))}`;
  totalCostAfterShippingMethod()
}

/**
 * Función que toma el indice para poder identificar cada valor a utilizar para el calculo de precio por cantidad para subtotal por producto
 * Obtiene el valor en texto convertido a número del precio
 * Obtiene el valor de la cantidad convertido a número.
 * calcula el precio por cantidad y lo inserta dentro del HTML para cada artículo
 */
function priceMultiplier(index) {
  let precio = parseInt(document.getElementById(`precio${index}`).innerText);
  let cantidad = parseInt(document.getElementById(`cantidad${index}`).value);
  let subtotal_individual = precio * cantidad;
  document.getElementById(`subtotal${index}`).innerHTML = subtotal_individual;
  showSubtotal();
}

/**
 * Función para remover el articulo según el indice del producto que se le pase al botón con evento onclick.
 * Remueve el articulo de la lista de articulos en el carrito, así solo debe mostrarse la lista nuevamente de artículos restantes.
 * Adicional a esto sigue mostrando el restante del carrito  
 */
function removeCartItem(index) {
  cartProducts.articles.splice(index, 1);
}

/**
 * Función que toma el listado de botones
 * los recorre y dependiendo del boton donde esté, elimina el elemento padre del elemento padre donde está, así saca la fila
 * además de eso actualiza el subtotal.
 * Mantiene así el subtotal calculado, en lugar de volver a traer la lista de elementos del json.
 */
function removeButtonClicked() {
  for (let i = 0; i < btnDanger.length; i++) {
    let buttonClicked = btnDanger[i];
    buttonClicked.addEventListener('click', function () {
      buttonClicked.parentElement.parentElement.remove();
      showSubtotal();
    })
  }
}

/**
 * Muestro los datos recibidos del getJSONData recorriendo la lista que se guarda localmente de productos en el carrito
 * Crea el HTML necesario para insertarlo en el contenedor del carrito de compra
 * Toma la cuenta del total de articulos que están ingresados en el carrito
 * Utiliza la función showSubtotal para poder mostrar el total del costo de los productos sin tener que esperar algún evento.
 */
function showCartInfo() {
  let htmlContentToAppend = "";
  let cartQuantity = 0;
  for (let i = 0; i < cartProducts.articles.length; i++) {
    const productInCart = cartProducts.articles[i];

    htmlContentToAppend += `
    <tr>
    <td>
        <div class="main">
        <div class="des">
            <h3>${productInCart.name}</h3>
        </div>
            <div class="d-flex">
                <img src="${productInCart.src}" alt="${productInCart.name}">
            </div>
        </div>
    </td>
    <td>
        <h6><span id="currency${i}">${productInCart.currency} </span><span id="precio${i}" class="cart_item_text">${productInCart.unitCost}</span></h6>
    </td>
    <td>
        <div class="counter">
            <input min="1" max="99" class="form-control" placeholder="${productInCart.count}" id="cantidad${i}" class="cart_item_text" min="1" value="${productInCart.count}" type="number" onchange="priceMultiplier(${i})"/>
        </div>
    </td>
    <td>
        <h6><span id="currencySubtotal${i}">${productInCart.currency}</span>`+ " " +`<span id="subtotal${i}" class="cart_item_text subtotal_individual">${productInCart.count * productInCart.unitCost}</span></h6>
    </td>
    <td>
        <button href="#" class="btn btn-danger" onclick="removeCartItem(${i})"><i class="fa fa-trash"></i></button>
    </td>
</tr>`;
    cartQuantity++;
  }
  CART_CONTAINER.innerHTML = htmlContentToAppend;
  CART_QUANTITY.innerHTML = cartQuantity;
  showSubtotal();
}

/**
 * Toma el valor del select el cual solo guarda el porcentaje en número entero del costo de envío
 * Agrega en el HTML el porcentaje de envío en HTML más texto de apoyo para el comprador, así no lo pasa en el select
 * Calcula el valor total del carrito más costo de envío al estar seleccionado 1
 * Inserta en el HTML el valor calculado
 */
function totalCostAfterShippingMethod() {
  var shippingCostPercentage = document.getElementById("moneda").value;
  let shippingCost = addCommasToNumbersOverAThousand(parseInt(subtotal * (shippingCostPercentage / 100)).toFixed(2)) + "<br>" + `<small class="text-muted">(${shippingCostPercentage}% del subtotal)</small>`;
  let totalCostToShow = CURRENCY + " " + addCommasToNumbersOverAThousand(parseFloat((Math.round(subtotal * shippingCostPercentage) / 100) + subtotal).toFixed(2));
  TOTAL_AFTER_SHIPPING.innerHTML = totalCostToShow;
  SHIPPING_COST.innerHTML = shippingCost;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (cartInfo) {
    if (cartInfo.status === "ok") {
      cartProducts = cartInfo.data;
      showCartInfo();
      removeButtonClicked();
    }
  });
});