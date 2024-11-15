const carrito = document.getElementById('carrito');
const elemento1 = document.getElementById('lista-1');
const lista = document.querySelector('#carrito tbody'); // Cambié el selector para apuntar al tbody del carrito
const vaciarcarritobtn = document.getElementById('vaciar-carrito');


cargarEventListeners();

function cargarEventListeners() {
    elemento1.addEventListener('click', comprarElemento); // Cambié elementos1 a elemento1
    carrito.addEventListener('click', eliminarElemento);
    vaciarcarritobtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100">
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <button id="inc-disminuir" class="cantidad-disminuir btn btn-light btn-lg  text-dark">-</button>
            <span class="cantidad">1</span>
            <button id="inc-disminuir" class="cantidad-incrementar btn btn-light btn-lg  text-dark">+</button>
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">x</a>
        </td>
    `;

    // Se debe comprobar si el producto ya está en el carrito para que solo se aumente la cantidad y no hayan repetidos
    const productosEnCarrito = Array.from(lista.querySelectorAll('tr'));
    const existeProducto = productosEnCarrito.some(producto => producto.querySelector('a').getAttribute('data-id') === elemento.id);
    
    if (!existeProducto) {
        lista.appendChild(row);
    } else {
        // Si ya existe, solo incrementamos la cantidad desde las opciones.
        const cantidadSpan = row.querySelector('.cantidad');
        const cantidadActual = parseInt(cantidadSpan.textContent);
        cantidadSpan.textContent = cantidadActual + 1; // Incrementamos la cantidad
    }
}

function eliminarElemento(e) {
    e.preventDefault();
    let elemento, elementoid;
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoid = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}

// Manejar incremento y decremento de la cantidad
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cantidad-incrementar')) {
        const cantidadSpan = e.target.previousElementSibling;
        let cantidad = parseInt(cantidadSpan.textContent);
        cantidadSpan.textContent = cantidad + 1;
    }

    if (e.target.classList.contains('cantidad-disminuir')) {
        const cantidadSpan = e.target.nextElementSibling;
        let cantidad = parseInt(cantidadSpan.textContent);
        if (cantidad > 1) {
            cantidadSpan.textContent = cantidad - 1;
        }
    }
});


// Función para mostrar el mensaje flotante
function mostrarMensaje() {
    // Crear un nuevo mensaje flotante
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje');
    mensaje.textContent = "¡Producto añadido al carrito!";
    
    // Añadir el mensaje al body
    document.body.appendChild(mensaje);

    // Mostrar el mensaje con animación
    setTimeout(() => {
        mensaje.style.display = 'block';
        setTimeout(() => {
            mensaje.style.opacity = 1;
        }, 50);
    }, 100);

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensaje.style.opacity = 0;
        setTimeout(() => {
            mensaje.style.display = 'none';
            document.body.removeChild(mensaje); // Eliminar el mensaje después de desaparecer
        }, 500);
    }, 3000);
}

// Función para manejar la acción de añadir al carrito
document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        mostrarMensaje(); // Mostrar el mensaje flotante
        // Aquí puedes añadir la lógica para actualizar el carrito si es necesario
    });
});
