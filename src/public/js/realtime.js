const socket = io();


socket.on("products", (products) => {
    const list = document.getElementById("productsList");
    list.innerHTML = "";
    products.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${p.title}</strong> - $${p.price}
                        <button onclick="deleteProduct('${p.id}')">Eliminar</button>`;
        list.appendChild(li);
    });
});


document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.price = Number(data.price);
    data.stock = Number(data.stock);
    socket.emit("addProduct", data);
    e.target.reset();
});


function deleteProduct(id) {
    socket.emit("deleteProduct", id);
}
