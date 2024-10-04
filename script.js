const fondoInput = document.getElementById('fondo');
const temaSelect = document.getElementById('tema');
const imagenesContainer = document.getElementById('imagenes-container');
const imagenSeleccionada = document.getElementById('imagen-seleccionada');
const botonCrear = document.getElementById('crear-tarjeta');

const tituloInput = document.getElementById('titulo-input');
const mensajeInput = document.getElementById('mensaje-input');
const autorInput = document.getElementById('autor-input');

let imagenSeleccionadaSrc = "";

const imagenesPorTema = {
    "San Valentin": ["sv1.jpg", "sv2.jpg", "sv3.jpg"],
    "Cumpleaños": ["c1.jpg", "c2.jpg", "c3.jpg"],
    "Navidad": ["n1.jpg", "n2.jpg", "n3.jpg"]
};

function cargarImagenes(tema) {
    imagenesContainer.innerHTML = "";

    if (imagenesPorTema[tema]) {
        imagenesPorTema[tema].forEach((imagenSrc, index) => {
            const img = document.createElement('img');
            img.src = imagenSrc;
            img.alt = `Imagen ${index + 1}`;
            img.classList.add('img-select');

            img.addEventListener('click', function () {
                imagenSeleccionadaSrc = img.src;

                document.querySelectorAll('.img-select').forEach(imagen => {
                    imagen.classList.remove('selected');
                });
                img.classList.add('selected');
            });

            imagenesContainer.appendChild(img);
        });
    } else {
        console.error("El tema seleccionado no tiene imágenes asociadas.");
    }
}

// Actualizar imágenes cuando el tema cambia
temaSelect.addEventListener('change', function () {
    const temaSeleccionado = temaSelect.value; // Obtener el valor del select
    cargarImagenes(temaSeleccionado); // Cargar las imágenes del tema seleccionado
});

botonCrear.addEventListener('click', function () {
    const autor = autorInput.value;
    const titulo = tituloInput.value;
    const mensaje = mensajeInput.value;
    const colorFondo = fondoInput.value; // Obtener el color seleccionado

    if (autor === "" || titulo === "" || mensaje === "" || imagenSeleccionadaSrc === "") {
        alert("Por favor, complete todos los campos y seleccione una imagen.");
        return;
    }

    // Crear el contenido HTML de la nueva ventana
    const tarjetaHTML = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                }
                .card {
                    display: inline-block;
                    width: 300px;
                    height: 400px;
                    padding: 20px;
                    background-color: ${colorFondo}; /* Aplicar el color de fondo solo a la tarjeta */
                    border: 1px solid #ccc;
                    text-align: center;
                    position: relative;
                }
                .card img {
                    width: 100%;
                    max-width: 250px;
                    height: auto;
                    margin-bottom: 20px;
                    object-fit: contain;
                }
                h2 {
                    font-size: 24px;
                    margin: 10px 0;
                }
                p {
                    font-size: 18px;
                }
                span {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 14px;
                    color: gray;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <img src="${imagenSeleccionadaSrc}" alt="Imagen Seleccionada">
                <h2>${titulo}</h2>
                <p>${mensaje}</p>
                <span>${autor}</span>
            </div>
        </body>
        </html>
    `;

    // Abrir una nueva ventana y escribir el contenido HTML generado
    const nuevaVentana = window.open("", "_blank");
    nuevaVentana.document.write(tarjetaHTML);
    nuevaVentana.document.close();  // Aplicar los estilos
});

// Cargar imágenes iniciales 
window.onload = function () {
    cargarImagenes(temaSelect.value); // Cargar las imágenes al cargar la página
};

