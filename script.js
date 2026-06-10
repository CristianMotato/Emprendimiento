// script.js

// 1. Base de datos simulada (En el futuro, esto vendrá de un fetch() a tu API deportiva)
const datosDeportivos = [
    {
        deporte: "UFC",
        evento: "UFC Fight Night",
        cuota: "2.10",
        descripcion: "B. Muhammad vs. G. Bonfim",
        detalle: "Victoria por Decisión (Main Card)",
        estado: "GANADO",
        claseTag: "ufc-tag"
    },
    {
        deporte: "Ciclismo",
        evento: "Giro d'Italia Women",
        cuota: "3.50",
        descripcion: "Etapa de Alta Montaña",
        detalle: "Ganador de Clasificación General",
        estado: "GANADO",
        claseTag: "cycling-tag"
    }
];

// 2. Función principal para renderizar los resultados
async function cargarResultados() {
    const contenedor = document.getElementById('contenedor-resultados');

    // Simulamos el tiempo de espera de una conexión a internet (API)
    setTimeout(() => {
        // Limpiamos el mensaje de "Sincronizando..."
        contenedor.innerHTML = '';

        // Recorremos los datos y creamos el HTML para cada tarjeta dinámicamente
        datosDeportivos.forEach(dato => {
            const tarjetaHTML = `
                <div class="ticket-card">
                    <div class="ticket-header">
                        <span class="sport-tag ${dato.claseTag}">${dato.evento}</span>
                        <span class="odds">Cuota @${dato.cuota}</span>
                    </div>
                    <p class="pick-text">${dato.descripcion}<br>
                        <small style="color: #a0a0a0; font-size: 0.85rem; font-weight: 300;">${dato.detalle}</small>
                    </p>
                    <div class="ticket-status win">
                        <i class="fa-solid fa-circle-check" aria-hidden="true"></i> ${dato.estado}
                    </div>
                </div>
            `;

            // Insertamos la tarjeta en el contenedor
            contenedor.innerHTML += tarjetaHTML;
        });

        // Insertamos la tarjeta de testimonio estática al final
        const testimonioHTML = `
            <div class="testimonial-card">
                <div class="stars">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                </div>
                <p>"Análisis impecable en la cartelera estelar. La lectura de los estilos de pelea es de otro nivel."</p>
                <span class="client-name">- Cliente VIP</span>
            </div>
        `;
        contenedor.innerHTML += testimonioHTML;

    }, 1500); // 1.5 segundos de retraso simulado
}

// 3. Ejecutar la función cuando la página termine de cargar
document.addEventListener('DOMContentLoaded', cargarResultados);