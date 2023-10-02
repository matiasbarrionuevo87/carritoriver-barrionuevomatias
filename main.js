const productos = [
    {
        id: 1,
        nombre: "Titular 23/24",
        descripcion: "Camiseta Titular 23/24.",
        precio: 30999.99,
        imagen: "img/producto1.jpg"
    },
    {
        id: 2,
        nombre: "Suplente 23/24",
        descripcion: "Suplente 23/24 Negra.",
        precio: 29999.99,
        imagen: "img/producto2.jpg"
    },
    {
        id: 3,
        nombre: "Alternativa 23/24",
        descripcion: "Alternativa Roja 23/24.",
        precio: 30000.00,
        imagen: "img/producto3.jpg"
    },
    {
        id: 4,
        nombre: "Alternativa 23/24",
        descripcion: "Alternativa Blanca 23/24.",
        precio: 29999.99,
        imagen: "img/producto4.jpg"
    },
    {
        id: 5,
        nombre: "Buzo Arquero 23/24",
        descripcion: "Buzo Arquero 23/24 Naranja.",
        precio: 27999.99,
        imagen: "img/producto5.jpg"
    },
    {
        id: 6,
        nombre: "Campera Entrenamiento",
        descripcion: "Campera Entrenamiento Negro.",
        precio: 35999.99,
        imagen: "img/producto6.jpg"
    }
];

const carrito = []; // Array para almacenar productos en el carrito

const productosContainer = document.getElementById('productos');
const carritoContainer = document.getElementById('carrito');
const totalContainer = document.getElementById('total');

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
    carritoContainer.innerHTML = ''; // Limpiar el contenido del carrito

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

mostrarProductos();
