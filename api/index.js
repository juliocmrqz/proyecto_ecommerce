const express = require('express');
const app = express();
const port = 3000;

app.use(
    express.static(
        "C:/Users/julio/Documents/Jap/Desarrollo Web/proyecto_ecommerce/jsonpack"
    )
)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Ejemplo de escucha del servidor en PC, en el siguiente puerto:\nhttp://localhost:${port}`);
})