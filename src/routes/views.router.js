const express = require("express");
const ProductsManager = require("../managers/ProductManager");

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await ProductsManager.getProducts();
    res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await ProductsManager.getProducts();
    res.render("realTimeProducts", { products });
});

module.exports = router;
