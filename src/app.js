const express = require("express");
const path = require("path");

const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const ProductsManager = require("./managers/ProductManager");
const CartManager = require("./managers/CartManager");

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


ProductsManager.rutaDatos = path.join(__dirname, "data", "products.json");
CartManager.rutaDatos = path.join(__dirname, "data", "carts.json");


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send("Servidor de productos y carritos funcionando correctamente");
});


app.get("/datos", (req, res) => {
    console.log(req.query);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ message: "Hola desde /datos", queryParams: req.query });
});


app.get("/close", (req, res) => {
    setTimeout(() => {
        console.log("Servidor cerrando...");
        server.closeAllConnections?.(); 
        server.close();
    }, 2000);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ message: "El servidor se apagará en 2 segundos" });
});


app.use((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send({ message: "Página no encontrada", code: 404 });
});


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
