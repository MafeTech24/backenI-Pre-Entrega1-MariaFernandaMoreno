const express = require("express");
const ProductsManager = require("../managers/ProductManager");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const products = await ProductsManager.getProducts();
        res.json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.get("/:pid", async (req, res) => {
    try {
        const product = await ProductsManager.getProductById(req.params.pid);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.post("/", async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        
        if (!title || !description || !code || price == null || stock == null || !category) {
            return res.status(400).json({ 
                error: "Faltan campos obligatorios: title, description, code, price, stock, category"
            });
        }

        const nuevoProducto = await ProductsManager.addProduct({
            title, description, code, price, status: status ?? true, stock, category, thumbnails: thumbnails ?? []
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.put("/:pid", async (req, res) => {
    try {
        const actualizado = await ProductsManager.updateProduct(req.params.pid, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.delete("/:pid", async (req, res) => {
    try {
        const eliminado = await ProductsManager.deleteProduct(req.params.pid);
        if (!eliminado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
