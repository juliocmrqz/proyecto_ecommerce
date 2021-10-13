//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_CONTAINER = document.getElementById("cart-container");
const CART_SUBTOTAL = document.getElementById("cart-subtotal");
const REMOVE_BUTTON = document.getElementById("cart-remove-button");
const CART_QUANTITY = document.getElementById("cart-quantity");
const CURRENCY_EXCHANGE = 40;
let cartProducts;

/**
 * 
 * @param {*} id indice del valor que recibe
 * @param {*} cost costo del producto
 * @returns el valor de la moneda ya convertido
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
 * 
 */
function showTotal() {
  let total = 0;
  for (let i = 0; i < cartProducts.articles.length; i++) {
    let subtotal = parseFloat(document.getElementById(`subtotal${i}`).innerHTML);
    total += currencyConverter(i, subtotal);
  }
  CART_SUBTOTAL.innerHTML = `UYU ${numberWithCommas(total.toFixed(2))}`;
}

/**
 * TO DO
 * IMPLEMENTAR CUSTOM ATTRIBUTE DATA-UNITCOST PARA EL PRECIO
 * ASÍ NO ME METO AL INNERTEXT.
 */
function priceMultiplier(index) {
  let precio = parseInt(document.getElementById(`precio${index}`).innerText);
  let cantidad = parseInt(document.getElementById(`cantidad${index}`).value);
  cartProducts.articles[index].count = cantidad;
  let total = precio * cantidad;
  document.getElementById(`subtotal${index}`).innerHTML = total;
  showTotal();
}

function removeCartItem(index) {
  cartProducts.articles.splice(index, 1);
  showCartInfo();
}

/**
 * 
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
        <h6><span id="currencySubtotal${i}">${productInCart.currency}</span><span id="subtotal${i}" class="cart_item_text"> ${productInCart.count * productInCart.unitCost}</span></h6>
    </td>
    <td>
        <button href="#" class="btn btn-danger" onclick="removeCartItem(${i})"><i
                class="fa fa-trash"></i> Remove item</button>
    </td>
</tr>
<!----->`;
    cartQuantity++;
  }
  CART_CONTAINER.innerHTML = htmlContentToAppend;
  CART_QUANTITY.innerHTML = cartQuantity;
  showTotal();
}


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (cartInfo) {
    if (cartInfo.status === "ok") {
      cartProducts = cartInfo.data;
      showCartInfo();
    }
  });
});