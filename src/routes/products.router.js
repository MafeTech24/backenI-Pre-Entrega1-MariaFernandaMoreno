const express = require("express");
const ProductsManager = require("../managers/ProductManager");

const router = express.Router();


router.get("/", async (req, res) => {
    const products = await ProductsManager.getProducts();
    res.json(products);
});


router.get("/:pid", async (req, res) => {
    const product = await ProductsManager.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
});


router.post("/", async (req, res) => {
    const nuevoProducto = await ProductsManager.addProduct(req.body);
    res.status(201).json(nuevoProducto);
});


router.put("/:pid", async (req, res) => {
    const actualizado = await ProductsManager.updateProduct(req.params.pid, req.body);
    if (!actualizado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(actualizado);
});


router.delete("/:pid", async (req, res) => {
    const eliminado = await ProductsManager.deleteProduct(req.params.pid);
    if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado" });
});

module.exports = router;
