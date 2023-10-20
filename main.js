const productos = [];
const carrito = [];

const productosContainer = document.getElementById('productos');
const carritoContainer = document.getElementById('carrito');
const totalContainer = document.getElementById('total');

// Utilizaremos fetch para cargar datos desde un archivo JSON
fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    productos.push(...data.productos);
    mostrarProductos();
  })
  .catch(error => console.error('Error al cargar los datos:', error));

function mostrarProductos() {
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoElement);
    });
}

function agregarAlCarrito(id) {
    const productoSeleccionado = productos.find(producto => producto.id === id);
    carrito.push(productoSeleccionado);
    mostrarCarrito();
    mostrarTotal();
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        mostrarCarrito();
        mostrarTotal();
    }
}

function mostrarCarrito() {
    carritoContainer.innerHTML = '';

    carrito.forEach(producto => {
        const carritoElement = document.createElement('div');
        carritoElement.classList.add('carrito-item');
        carritoElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        carritoContainer.appendChild(carritoElement);
    });
}

function mostrarTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function agregarAlCarrito(id) {
    const productoSeleccionado = productos.find(producto => producto.id === id);

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.producto.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++; // Incrementar cantidad
    } else {
        carrito.push({ producto: productoSeleccionado, cantidad: 1 });
    }

    mostrarCarrito();
    mostrarTotal();
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(item => item.producto.id === id);
    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--; // Decrementar cantidad
        } else {
            carrito.splice(index, 1);
        }
        mostrarCarrito();
        mostrarTotal();
    }
}

function mostrarCarrito() {
    carritoContainer.innerHTML = '';
    carrito.forEach(item => {
        const carritoElement = document.createElement('div');
        carritoElement.classList.add('carrito-item');
        carritoElement.innerHTML = `
            <h3>${item.producto.nombre} x${item.cantidad}</h3>
            <p>Precio: $${(item.producto.precio * item.cantidad).toFixed(2)}</p>
            <button onclick="eliminarDelCarrito(${item.producto.id})">-</button>
            <button onclick="agregarAlCarrito(${item.producto.id})">+</button>
        `;
        carritoContainer.appendChild(carritoElement);
    });
}

function mostrarTotal() {
    const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}