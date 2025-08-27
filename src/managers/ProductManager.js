const fs = require("fs");
const path = require("path");

class ProductsManager {
    static rutaDatos = ""; 

    static async getProducts() {
        try {
            if (fs.existsSync(this.rutaDatos)) {
                const data = await fs.promises.readFile(this.rutaDatos, "utf-8");
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error al leer productos:", error);
            throw new Error("No se pudieron obtener los productos");
        }
    }

    static async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find(p => p.id === id);
        } catch (error) {
            console.error("Error al buscar producto por ID:", error);
            throw new Error("No se pudo obtener el producto");
        }
    }

    static async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
        try {
            
            if (!title || !description || !code || price == null || stock == null || !category) {
                throw new Error("Faltan campos obligatorios del producto");
            }

            const products = await this.getProducts();

            
            if (products.some(p => p.code === code)) {
                throw new Error(`El producto con code '${code}' ya existe`);
            }

            
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
                status: status ?? true, 
                stock,
                category,
                thumbnails: thumbnails ?? []
            };

            products.push(nuevoProducto);
            await fs.promises.writeFile(this.rutaDatos, JSON.stringify(products, null, 2));

            return nuevoProducto;
        } catch (error) {
            console.error("Error al agregar producto:", error);
            throw error;
        }
    }

    static async updateProduct(id, campos) {
        try {
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
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            throw error;
        }
    }

    static async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const filtrados = products.filter(p => p.id !== id);
            if (products.length === filtrados.length) return false;

            await fs.promises.writeFile(this.rutaDatos, JSON.stringify(filtrados, null, 2));
            return true;
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            throw error;
        }
    }
}

module.exports = ProductsManager;
