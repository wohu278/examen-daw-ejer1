const express = require('express')
const fs = require("fs");

const productJSON = fs.readFileSync("./productos.json", "utf-8");
let productos = JSON.parse(productJSON);

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.listen(3000)
console.log("Esuchando en el puerto 3000");

app.get('/', (req, res) => {

    res.send(productos)

})

app.post('/', (req, res) => {

    const nuevoProducto = req.body

    productos.push(nuevoProducto)

    const productJSON = JSON.stringify(productos);

    fs.writeFileSync("./productos.json", productJSON, "utf-8");

    res.send(productos)

})

app.get('/producto/:id', (req, res) => {

    const {id} = req.params

    const producto = productos.find(p => p.id === parseInt(id))

    if(!producto) {

        res.sendStatus(404)

    }

    res.send(producto)

})

app.put('/producto/:id', (req, res) => {

    const {id} = req.params

    const producto = productos.find(p => p.id === parseInt(id))

    if(!producto) {

        res.sendStatus(404)

    }

    res.send(producto)

})

app.delete('/producto/:id', (req, res) => {

    const {id} = req.params

    const producto = productos.find(p => p.id === parseInt(id))

    if(!producto) {

        res.sendStatus(404)

    }

    const pepito = productos.filter(p => p.id !== parseInt(id))

    console.log(pepito);

    const productJSON = JSON.stringify(pepito);

    fs.writeFileSync("./productos.json", productJSON, "utf-8");

    res.send(pepito)

})