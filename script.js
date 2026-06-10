// script.js

// 1. Configuración de tu API de Google Cloud (Firestore)
const PROJECT_ID = "project-4e3f967b-7e71-470d-af2";
const API_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/resultados_recientes`;

// 2. Función principal para extraer los datos reales de la nube
async function cargarResultados() {
    const contenedor = document.getElementById('contenedor-resultados');

    try {
        // Conectamos con tu base de datos en Google Cloud
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();

        // Limpiamos el mensaje de "Sincronizando..."
        contenedor.innerHTML = '';

        // Si hay documentos en tu base de datos, los procesamos
        if (datos.documents && datos.documents.length > 0) {
            datos.documents.forEach(doc => {
                const campos = doc.fields;

                // Firestore guarda los textos dentro de la propiedad "stringValue"
                const evento = campos.evento?.stringValue || '';
                const cuota = campos.cuota?.stringValue || '';
                const descripcion = campos.descripcion?.stringValue || '';
                const detalle = campos.detalle?.stringValue || '';
                const estado = campos.estado?.stringValue || '';
                const claseTag = campos.claseTag?.stringValue || 'ufc-tag';

                const tarjetaHTML = `
                    <div class="ticket-card">
                        <div class="ticket-header">
                            <span class="sport-tag ${claseTag}">${evento}</span>
                            <span class="odds">Cuota @${cuota}</span>
                        </div>
                        <p class="pick-text">${descripcion}<br>
                            <small style="color: #a0a0a0; font-size: 0.85rem; font-weight: 300;">${detalle}</small>
                        </p>
                        <div class="ticket-status win">
                            <i class="fa-solid fa-circle-check" aria-hidden="true"></i> ${estado}
                        </div>
                    </div>
                `;

                // Insertamos la tarjeta real en la página
                contenedor.innerHTML += tarjetaHTML;
            });
        } else {
            contenedor.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-light);">No hay resultados recientes en este momento.</p>';
        }

        // 3. Insertamos la tarjeta de testimonio estática al final
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

    } catch (error) {
        console.error("Error conectando con Google Cloud:", error);
        contenedor.innerHTML = '<p style="text-align: center; width: 100%; color: var(--accent-crimson);">Error de sincronización con la base de datos.</p>';
    }
}

// Ejecutar la función cuando la página termine de cargar
document.addEventListener('DOMContentLoaded', cargarResultados);