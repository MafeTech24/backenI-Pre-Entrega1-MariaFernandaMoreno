# API de Productos y Carritos

Proyecto realizado con Node.js y Express.

## Endpoints principales

### Productos `/api/products`
- `GET /` – Lista todos los productos
- `GET /:pid` – Muestra un producto por ID
- `POST /` – Agrega un producto (body JSON)
- `PUT /:pid` – Actualiza un producto (body JSON)
- `DELETE /:pid` – Elimina un producto por ID

### Carritos `/api/carts`
- `POST /` – Crea un nuevo carrito
- `GET /:cid` – Lista productos del carrito
- `POST /:cid/product/:pid` – Agrega producto al carrito

## Uso
Usar herramientas como Postman para probar los endpoints. El servidor escucha en el puerto `8080`.


