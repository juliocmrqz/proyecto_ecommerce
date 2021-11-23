const CART_CONTAINER = document.getElementById("cart-container");
const CART_SUBTOTAL_CONTAINER = document.getElementById("cart-subtotal");
const CART_QUANTITY = document.getElementById("cart-quantity");
const CURRENCY_EXCHANGE = 40;
const CURRENCY = "UYU";
const TOTAL_AFTER_SHIPPING = document.getElementById("total-after-shipping");
const SHIPPING_COST = document.getElementById("shipping-cost");
const PAYMENT_METHOD_MODAL_BUTTON = document.getElementById("payment-method-modal");
const ERROR_MESSAGE_CONTAINER = document.getElementsByClassName('error-message-container');
const ERROR_MESSAGE_CONTAINER_WT = document.getElementsByClassName('error-message-container-wt');
const ERROR_MESSAGE_CONTAINER_ADDRESS = document.getElementsByClassName('error-message-container-address');
const ERROR_MESSAGE_CONTAINER_SHIPPING = document.getElementById('error-message-container-shipping');
const SELECT_PAYMENT_METHOD_FORM = document.getElementById('select-payment-method-form');
const INPUTS_CREDIT_CARD = document.getElementsByClassName('credit-card');
const INPUTS_WIRE_TRANSFER = document.getElementsByClassName('wire-transfer');
const CREDIT_CARD_RADIO = document.getElementById('credit-card');
const WIRE_TRANSFER_RADIO = document.getElementById('wire-transfer');
const INPUTS_PAYMENT_METHOD = document.getElementsByName('selected-payment-method');
const PRODUCT_QUANTITY = document.getElementsByClassName('product-quantity');
const ADDRESS_VALIDATION = document.getElementsByClassName('address-validation');
const SUBTOTAL_INDIVIDUAL_CONTAINER = document.getElementsByClassName('subtotal_individual');
let cartProducts;
let subtotal = 0;

var cartDataAfterPurchase = {
  customerInformation: {
    name: null,
    address: null,
    city: null,
    country: null,
    zipcode: null
  },
  productInformation: null,
  creditCardInformation: {
    creditCardOwner: null,
    creditCardNumber: null,
    creditCardCVV: null,
    creditCardValidDate: null,
    creditCardValidYear: null
  },
  wireTransferInformation: {
    wireTransferNumber: null
  },
  purchaseInformation: {
    shippingMethod: null,
    totalPurchase: null,
    purchaseCurrency: 'UYU',
    currencyExchange: null
  }
};

var OBJECT_TO_TEXT = function (url) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartDataAfterPurchase)
  }).then(window.location.href = "checkout.html");
}


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
  document.getElementById(`cantidad${index}`).classList.remove('is-invalid');
  if (cantidad >= 1) {
    let subtotal_individual = precio * cantidad;
    cartProducts.articles[index].count = cantidad;
    document.getElementById(`subtotal${index}`).innerHTML = subtotal_individual;
  } else {
    subtotal_individual = 0;
    document.getElementById(`cantidad${index}`).classList.add('is-invalid');
    document.getElementById(`subtotal${index}`).innerHTML = subtotal_individual;
  }
  showSubtotal();
}


/**
 * Función para remover el articulo según el indice del producto que se le pase al botón con evento onclick.
 * Remueve el articulo de la lista de articulos en el carrito, así solo debe mostrarse la lista nuevamente de artículos restantes.
 * Adicional a esto sigue mostrando el restante del carrito  
 */
function removeCartItem(index) {
  cartProducts.articles.splice(index, 1);
  showCartInfo();
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
            <input min="1" max="99" class="form-control cart_item_text product-quantity" placeholder="${productInCart.count}" id="cantidad${i}" min="1" value="${productInCart.count}" type="number" onchange="priceMultiplier(${i})"/>
        </div>
    </td>
    <td>
        <h6><span id="currencySubtotal${i}">${productInCart.currency}</span>` + " " + `<span id="subtotal${i}" class="cart_item_text subtotal_individual">${productInCart.count * productInCart.unitCost}</span></h6>
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
  var shippingCostPercentage = document.getElementById("tipo-envio").value;
  let shippingCost = addCommasToNumbersOverAThousand(parseInt(subtotal * (shippingCostPercentage / 100)).toFixed(2)) + "<br>" + `<small class="text-muted">(${shippingCostPercentage}% del subtotal)</small>`;
  let totalCostToShow = CURRENCY + " " + addCommasToNumbersOverAThousand(parseFloat((Math.round(subtotal * shippingCostPercentage) / 100) + subtotal).toFixed(2));
  TOTAL_AFTER_SHIPPING.innerHTML = totalCostToShow;
  SHIPPING_COST.innerHTML = shippingCost;
}


/**
 * Recorremos una lista de elementos input radio con el mismo nombre
 * verificamos con un evento change si está checked credit card o transferencia bancaria
 * Esto al seleccionar un método de pago, quita del input el mensaje de campo requerido
 * Así solo marca por rellenar los inputs del tipo de pago seleccionado.
 */
for (let i = 0; i < document.getElementsByName('selected-payment-method').length; i++) {
  const element = document.getElementsByName('selected-payment-method')[i];
  element.addEventListener('change', function () {
    if (CREDIT_CARD_RADIO.checked) {
      document.getElementById('selecciona-un-metodo').setAttribute('hidden', '');
      for (let i = 0; i < INPUTS_WIRE_TRANSFER.length; i++) {
        ERROR_MESSAGE_CONTAINER_WT[i].innerText = '';
      }
    }
    if (WIRE_TRANSFER_RADIO.checked) {
      document.getElementById('selecciona-un-metodo').setAttribute('hidden', '');
      for (let i = 0; i < INPUTS_CREDIT_CARD.length; i++) {
        ERROR_MESSAGE_CONTAINER[i].innerText = '';
      }
    }
  })
}


/**
 * Recorremos una lista de inputs del metodo de pago
 * Revisamos si se hace el evento click, al pasar eso le hace checked al elemento
 * si esto pasa y el id del elemento es tarjeta de crédito, desabilita los campos de transferencia bancaria
 * caso contrario, si es transferencia bancaria el que está checked, desabilita los campos de tarjeta de crédito.
 * Esto lo hace recorriendo una lista de elementos con el mismo nombre de clase para cada input radio seleccionado.
 */
for (let i = 0; i < INPUTS_PAYMENT_METHOD.length; i++) {
  const INPUT_CHECKED = INPUTS_PAYMENT_METHOD[i];
  INPUT_CHECKED.addEventListener('click', function (e) {
    INPUT_CHECKED.checked;
    if (INPUT_CHECKED.checked) {
      if (INPUT_CHECKED.id === "credit-card") {
        for (let i = 0; i < document.getElementsByClassName('wire-transfer').length; i++) {
          const element = document.getElementsByClassName('wire-transfer')[i];
          element.setAttribute('disabled', '');
        }
        for (let i = 0; i < document.getElementsByClassName('credit-card').length; i++) {
          const element = document.getElementsByClassName('credit-card')[i];
          element.removeAttribute('disabled');
        }
      }
      if (INPUT_CHECKED.id === "wire-transfer") {
        for (let i = 0; i < document.getElementsByClassName('credit-card').length; i++) {
          const element = document.getElementsByClassName('credit-card')[i];
          element.setAttribute('disabled', '');
        }
        for (let i = 0; i < document.getElementsByClassName('wire-transfer').length; i++) {
          const element = document.getElementsByClassName('wire-transfer')[i];
          element.removeAttribute('disabled');
        }
      }
    }
  })
}


/**
 * Al tener un cambio en el select del metodo de envío
 * este saca el disabled del boton de selección de método de pago y saca el mensaje de error
 * indicando que el campo es requerido.
 */
document.getElementById('tipo-envio').addEventListener('change', function () {
  PAYMENT_METHOD_MODAL_BUTTON.removeAttribute('disabled');
  ERROR_MESSAGE_CONTAINER_SHIPPING.innerText = '';
})


/**
 * Toma el evento click en el boton de selección de método de pago
 * de ahí, evalúa si los campos de la dirección de envío y el método de envio seleccionado
 * se encuentran seleccionados o completados, si los campos se encuentran vacíos o no seleccionados
 * deshabilita el boton para mostrar el modal por 1 segundo y muestra los campos que están requeridos
 * para poder continuar.
 * Además, evalua si la cantidad de articulos en el carrito es igual a cero o si el monto a pagar 
 * es menor o igual a cero, no permitiendo continuar hasta la selección de pago de no tener nada que pagar
 * en el carrito.
 */
PAYMENT_METHOD_MODAL_BUTTON.addEventListener('click', function (e) {
  for (let i = 0; i < ADDRESS_VALIDATION.length; i++) {
    const ADDRESS_ELEMENT = ADDRESS_VALIDATION[i];
    if (ADDRESS_ELEMENT.value === '' || ADDRESS_ELEMENT.VALUE === null) {
      ERROR_MESSAGE_CONTAINER_ADDRESS[i].innerText = 'campo requerido';
      PAYMENT_METHOD_MODAL_BUTTON.setAttribute('disabled', '');
      setTimeout(() => {
        PAYMENT_METHOD_MODAL_BUTTON.removeAttribute('disabled');
      }, 1000);
    } else {
      ERROR_MESSAGE_CONTAINER_ADDRESS[i].innerText = '';
    }
    if (document.getElementById('tipo-envio').value === '') {
      ERROR_MESSAGE_CONTAINER_SHIPPING.innerText = 'campo requerido';
      PAYMENT_METHOD_MODAL_BUTTON.setAttribute('disabled', '');
      document.getElementById('formulario-select-shipping').classList.add('was-validated');
      setTimeout(() => {
        PAYMENT_METHOD_MODAL_BUTTON.removeAttribute('disabled');
      }, 1000);
    } else {
      ERROR_MESSAGE_CONTAINER_SHIPPING.innerText = '';
    }
  }
  if (cartProducts.articles.length === 0) {
    alert('¡El carrito se encuentra vacío!');
    PAYMENT_METHOD_MODAL_BUTTON.setAttribute('disabled', '');
    setTimeout(() => {
      PAYMENT_METHOD_MODAL_BUTTON.removeAttribute('disabled');
    }, 1000);
  }
  if (subtotal <= 0) {
    alert('¡La cantidad a pagar no puede ser 0!');
    PAYMENT_METHOD_MODAL_BUTTON.setAttribute('disabled', '');
    setTimeout(() => {
      PAYMENT_METHOD_MODAL_BUTTON.removeAttribute('disabled');
    }, 1000);
  }
});

/**
 * Evento en el boton submit del formulario de método de pago
 * evalua si algún input radio con el método de pago está seleccionado
 * de no estarlo muestra un mensaje para elegir método de pago
 * 
 * De estar checked tarjeta de crédito evalua que los campos de ese método de pago estén completos
 * o muestra mensaje de campo requerido.
 * De estar checked transferencia bancaria evalua que los campos de ese método de pago estén completos
 * o muestra mensaje de campo requerido.
 * 
 * Si todos los campos estén completos dependiendo del método de pago, permite continuar
 * hasta la página de checkout con la compra hecha. Esto evitando el envío de formulario que recarga la página
 * pero permitiendo cambiar de ventana con el número de orden y mensaje de check out del sitio.
 */
SELECT_PAYMENT_METHOD_FORM.addEventListener('submit', function (e) {
  let creditCardOwnerValue = document.getElementById("credit-card-owner").value;
  let creditCardNumberValue = document.getElementById("credit-card-number").value;
  let creditCardCVVValue = document.getElementById("credit-card-cvv").value;
  let creditCardValidDateValue = document.getElementById("credit-card-valid-date").value;
  let creditCardValidYearValue = document.getElementById("credit-card-valid-year").value;
  if (CREDIT_CARD_RADIO.checked) {
    document.getElementById('selecciona-un-metodo').setAttribute('hidden', '');
    for (let i = 0; i < INPUTS_WIRE_TRANSFER.length; i++) {
      ERROR_MESSAGE_CONTAINER_WT[i].innerText = '';
    }
    for (let i = 0; i < INPUTS_CREDIT_CARD.length; i++) {
      const INPUT_CC = INPUTS_CREDIT_CARD[i];
      if ((INPUT_CC.value === '') || (INPUT_CC.value === null)) {
        e.preventDefault();
        ERROR_MESSAGE_CONTAINER[i].innerText = 'campo requerido';
      } else {
        ERROR_MESSAGE_CONTAINER[i].innerText = '';
        e.preventDefault();
      }
    }
    if (
      creditCardOwnerValue !== "" &&
      creditCardNumberValue !== "" &&
      creditCardCVVValue !== "" &&
      creditCardValidDateValue !== "" &&
      creditCardValidYearValue !== "") {
      let myProfileInformation = JSON.parse(localStorage.getItem('myProfileInformation'));
      // Tomar en cuenta que la persona debe tener un perfil creado para que myProfileInformation funcione.
      cartDataAfterPurchase.customerInformation.name = myProfileInformation.names;
      cartDataAfterPurchase.customerInformation.address = document.getElementById('address-information').value;
      cartDataAfterPurchase.customerInformation.city = document.getElementById('city-information').value;
      cartDataAfterPurchase.customerInformation.country = document.getElementById('country-information').value;
      cartDataAfterPurchase.customerInformation.zipcode = document.getElementById('zipcode-information').value;
      cartDataAfterPurchase.productInformation = cartProducts.articles;
      cartDataAfterPurchase.creditCardInformation.creditCardOwner = creditCardOwnerValue;
      cartDataAfterPurchase.creditCardInformation.creditCardNumber = creditCardNumberValue;
      cartDataAfterPurchase.creditCardInformation.creditCardCVV = creditCardCVVValue;
      cartDataAfterPurchase.creditCardInformation.creditCardValidDate = creditCardValidDateValue;
      cartDataAfterPurchase.creditCardInformation.creditCardValidYear = creditCardValidYearValue;
      cartDataAfterPurchase.purchaseInformation.shippingMethod = document.getElementById('tipo-envio').value;
      cartDataAfterPurchase.purchaseInformation.currencyExchange = CURRENCY_EXCHANGE;
      cartDataAfterPurchase.purchaseInformation.totalPurchase = document.getElementById('total-after-shipping').innerText.replace('UYU' || 'USD', '').trim();
      OBJECT_TO_TEXT('http://localhost:3000/postData');
    }
  } else if (WIRE_TRANSFER_RADIO.checked) {
    document.getElementById('selecciona-un-metodo').setAttribute('hidden', '');
    for (let i = 0; i < INPUTS_CREDIT_CARD.length; i++) {
      ERROR_MESSAGE_CONTAINER[i].innerText = '';
    }
    for (let i = 0; i < INPUTS_WIRE_TRANSFER.length; i++) {
      const INPUT_WT = INPUTS_WIRE_TRANSFER[i];
      if ((INPUT_WT.value === '' || INPUT_WT.value === null)) {
        e.preventDefault();
        ERROR_MESSAGE_CONTAINER_WT[i].innerText = 'campo requerido';
      } else {
        ERROR_MESSAGE_CONTAINER_WT[i].innerText = '';
        e.preventDefault();
      }
    }
    if (document.getElementById("wire-transfer-number").value !== "") {
      let myProfileInformation = JSON.parse(localStorage.getItem('myProfileInformation'));
      cartDataAfterPurchase.customerInformation.name = myProfileInformation.names;
      cartDataAfterPurchase.customerInformation.address = document.getElementById('address-information').value;
      cartDataAfterPurchase.customerInformation.city = document.getElementById('city-information').value;
      cartDataAfterPurchase.customerInformation.country = document.getElementById('country-information').value;
      cartDataAfterPurchase.customerInformation.zipcode = document.getElementById('zipcode-information').value;
      cartDataAfterPurchase.productInformation = cartProducts.articles;
      cartDataAfterPurchase.purchaseInformation.shippingMethod = document.getElementById('tipo-envio').value;
      cartDataAfterPurchase.purchaseInformation.currencyExchange = CURRENCY_EXCHANGE;
      cartDataAfterPurchase.purchaseInformation.totalPurchase = document.getElementById('total-after-shipping').innerText.replace('UYU' || 'USD', '').trim();
      OBJECT_TO_TEXT('http://localhost:3000/postData');
    }
  } else {
    e.preventDefault();
    document.getElementById('selecciona-un-metodo').removeAttribute('hidden');
  }
})

/**
 * Función que se ejecutan al cargar la página, mostrar el carrito que se trae del JSON.
 */
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (cartInfo) {
    if (cartInfo.status === "ok") {
      cartProducts = cartInfo.data;
      showCartInfo();
    }
  });
});