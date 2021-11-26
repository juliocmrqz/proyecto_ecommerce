const express = require('express');
const path = require('path');
const colors = require('colors');
const cors = require('cors');
const fs = require('fs');
const port = 3000;
const appExpress = express();
const {
    v4: uuidv4
} = require('uuid');

appExpress.use(
    express.static(
        path.join(__dirname, 'public')
    ),
    cors(),
    express.json()
);

// disponibilizo las categorias
appExpress.get('/categorias', cors(), (req, res) => {
    res.sendFile(
        path.join(
            __dirname, 'jsonpack/categories/all_categories.json'
        )
    )
});

// disponibilizo la categoria de autos
appExpress.get('/categoria-info', cors(), (req, res) => {
    res.sendFile(
        path.join(
            __dirname, 'jsonpack/categories/category.json'
        )
    )
});

// disponibilizo los productos
appExpress.get('/productos', cors(), (req, res) => {
    res.sendFile(
        path.join(
            __dirname, 'jsonpack/products/products.json'
        )
    )
});

// disponibilizo la información del producto
appExpress.get('/producto-info', cors(), (req, res) => {
    res.sendFile(
        path.join(
            __dirname, 'jsonpack/products/product.json'
        )
    )
});

// disponibilizo los comentarios del producto
appExpress.get('/producto-comentarios', cors(), (req, res) => {
    res.sendFile(
        path.join(
            __dirname, 'jsonpack/products/product_comments.json'
        )
    )
});

// disponibilizo los artículos del carrito
appExpress.get('/carrito', cors(), (req, res) => {
    res.sendFile(
        path.join(
            __dirname, 'jsonpack/cart/cart.json'
        )
    )
});

// disponibilizo el mensaje de publicación exitosa en vender
appExpress.get('/publicacion-exitosa', cors(), (req, res) => {
    res.sendFile(
        path.join(
            __dirname, 'jsonpack/products/successful_publication.json'
        )
    )
});

// disponibilizo el mensaje de compra exitosa
appExpress.get('/compra-exitosa', cors(), (req, res) => {
    res.sendFile(
        path.join(
            __dirname, '/jsonpack/cart/successful_purchase.json'
        )
    )
});

appExpress.post('/postData', (req, res) => {
    let archivo = uuidv4() + 'test.json'; // por qué funciona el uuidv4 nada más
    fs.writeFile(
        path.join(
            __dirname, `jsonpack/archivoTexto/${archivo}`
        ),
        JSON.stringify(req.body),
        function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
});

appExpress.listen(port, () => {
    console.log(colors.green(`Estoy trabajando en el siguiente puerto: http://localhost:${port}`));
});