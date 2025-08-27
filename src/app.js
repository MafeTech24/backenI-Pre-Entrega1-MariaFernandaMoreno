const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const exphbs = require("express-handlebars");

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");

const ProductsManager = require("./managers/ProductManager");
const CartManager = require("./managers/CartManager");

const app = express();
const PORT = 8080;
const httpServer = createServer(app); 
const io = new Server(httpServer); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.static("public"));


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));




ProductsManager.rutaDatos = path.join(__dirname, "data", "products.json");
CartManager.rutaDatos = path.join(__dirname, "data", "carts.json");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


io.on("connection", async (socket) => {
    console.log("Cliente Conectado");

    
    const products = await ProductsManager.getProducts();
    socket.emit("products", products);

    
    socket.on("addProduct", async (product) => {
        await ProductsManager.addProduct(product);
        const updated = await ProductsManager.getProducts();
        io.emit("products", updated); // actualizar para todos
    });

    
    socket.on("deleteProduct", async (id) => {
        await ProductsManager.deleteProduct(id);
        const updated = await ProductsManager.getProducts();
        io.emit("products", updated);
    });
});


app.use((req, res) => {
    res.status(404).json({ message: "Página no encontrada", code: 404 });
});


httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
