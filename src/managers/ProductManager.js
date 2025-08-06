const fs = require("fs");
const path = require("path");

class ProductsManager {
    static rutaDatos = ""; 

    static async getProducts() {
        if (fs.existsSync(this.rutaDatos)) {
            const data = await fs.promises.readFile(this.rutaDatos, "utf-8");
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    static async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    }

    static async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
        const products = await this.getProducts();

        let id = "p001";
        if (products.length > 0) {
            const lastIdNum = Math.max(...products.map(p => parseInt(p.id.replace("p", ""))));
            id = "p" + String(lastIdNum + 1).padStart(3, "0");
        }

        const nuevoProducto = {
            id,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        products.push(nuevoProducto);
        await fs.promises.writeFile(this.rutaDatos, JSON.stringify(products, null, 2));

        return nuevoProducto;
    }

    static async updateProduct(id, campos) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;

        products[index] = {
            ...products[index],
            ...campos,
            id: products[index].id 
        };

        await fs.promises.writeFile(this.rutaDatos, JSON.stringify(products, null, 2));
        return products[index];
    }

    static async deleteProduct(id) {
        const products = await this.getProducts();
        const filtrados = products.filter(p => p.id !== id);
        if (products.length === filtrados.length) return false;

        await fs.promises.writeFile(this.rutaDatos, JSON.stringify(filtrados, null, 2));
        return true;
    }
}

module.exports = ProductsManager;
