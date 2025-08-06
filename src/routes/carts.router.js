const express = require("express");
const CartManager = require("../managers/CartManager");

const router = express.Router();

router.post("/", async (req, res) => {
    const carrito = await CartManager.createCart();
    res.status(201).json(carrito);
});

router.get("/:cid", async (req, res) => {
    const cart = await CartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart.products);
});

router.post("/:cid/product/:pid", async (req, res) => {
    const result = await CartManager.addProductToCart(req.params.cid, req.params.pid);

    if (!result) return res.status(404).json({ error: "Carrito no encontrado" });
    if (result === "PRODUCT_NOT_FOUND") return res.status(404).json({ error: "Producto no existe" });

    res.json(result);
});

module.exports = router;
