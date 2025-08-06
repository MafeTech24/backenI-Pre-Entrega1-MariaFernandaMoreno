const fs = require("fs");
const ProductsManager = require("./ProductManager");

class CartManager {
    static rutaDatos = ""; 

    static async getCarts() {
        if (fs.existsSync(this.rutaDatos)) {
            const data = await fs.promises.readFile(this.rutaDatos, "utf-8");
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    static async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === String(id));
    }

    static async createCart() {
        const carts = await this.getCarts();

        let id = "c001";
        if (carts.length > 0) {
            const lastIdNum = Math.max(...carts.map(c => parseInt(c.id.replace("c", ""))));
            id = "c" + String(lastIdNum + 1).padStart(3, "0");
        }

        const nuevoCarrito = {
            id,
            products: []
        };

        carts.push(nuevoCarrito);
        await fs.promises.writeFile(this.rutaDatos, JSON.stringify(carts, null, 2));
        return nuevoCarrito;
    }

    static async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === String(cid));
        if (!cart) return null;

        const product = await ProductsManager.getProductById(String(pid));
        if (!product) return "PRODUCT_NOT_FOUND";

        const index = cart.products.findIndex(p => p.product === String(pid));
        if (index !== -1) {
            cart.products[index].quantity += 1;
        } else {
            cart.products.push({ product: String(pid), quantity: 1 });
        }

        await fs.promises.writeFile(this.rutaDatos, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;
