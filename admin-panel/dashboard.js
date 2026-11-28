
// ============================================
// MELA PRODUCCIONES - PANEL ADMINISTRATIVO
// ============================================


// 1. CONEXIÓN CON SUPABASE

const SUPABASE_URL = "https://pngvzrzzkkqoumgqyelx.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_-7A7JsUab82GSkRFSh9cIg_y1IkVA3Q";

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// 2. VERIFICAR SESIÓN DEL ADMINISTRADOR

async function verificarSesion() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        window.location.href = "index.html";
        return false;
    }

    const usuario = data.session.user;

    // Comprobar que sea la cuenta administradora autorizada
    if (usuario.email !== "melaproducciones@gmail.com") {
        await supabaseClient.auth.signOut();
        window.location.href = "index.html";
        return false;
    }

    console.log("Administrador autenticado:", usuario.email);

    return true;
}


// 3. ELEMENTOS DEL PANEL

const sidebar = document.getElementById("admin-sidebar");

const menuToggle = document.getElementById("menu-toggle");

const pageTitle = document.getElementById("page-title");

const dashboardSection = document.getElementById("section-dashboard");

const editorSection = document.getElementById("section-editor");

const editorTitle = document.getElementById("editor-title");

const editorDescription = document.getElementById("editor-description");

const editorContent = document.getElementById("editor-content");


// 4. MÓDULOS DEL ADMINISTRADOR

const modulos = {

    dashboard: {
        titulo: "Escritorio",
        descripcion: "Bienvenida al panel de administración de MELA Producciones."
    },

    inicio: {
        titulo: "Inicio y portada",
        descripcion: "Aquí podrás administrar los textos, botones, imágenes y video de la portada."
    },

    nosotros: {
        titulo: "Nosotros",
        descripcion: "Aquí podrás editar la presentación, historia y descripción de MELA Producciones."
    },

    mela360: {
        titulo: "MELA 360°",
        descripcion: "Aquí podrás administrar los textos y elementos del ecosistema MELA 360°."
    },

    servicios: {
        titulo: "Servicios",
        descripcion: "Aquí podrás agregar, editar, ocultar y eliminar servicios, incluyendo sus imágenes."
    },

    portafolio: {
        titulo: "Portafolio",
        descripcion: "Aquí podrás administrar proyectos, categorías, imágenes y descripciones."
    },

    contacto: {
        titulo: "Contacto",
        descripcion: "Aquí podrás configurar los datos de contacto, formulario y opciones de servicios."
    },

    footer: {
        titulo: "Footer",
        descripcion: "Aquí podrás editar el pie de página, logotipo, textos y enlaces."
    },

    biblioteca: {
        titulo: "Biblioteca multimedia",
        descripcion: "Aquí podrás subir y administrar imágenes y videos de tu sitio web."
    },

    blog: {
        titulo: "Blog",
        descripcion: "Aquí podrás crear, editar, organizar y publicar artículos."
    },

    privacidad: {
        titulo: "Política de privacidad",
        descripcion: "Aquí podrás preparar y editar la política de privacidad."
    },

    terminos: {
        titulo: "Términos y condiciones del servicio",
        descripcion: "Aquí podrás preparar y editar los términos y condiciones."
    },

    "aviso-legal": {
        titulo: "Aviso legal",
        descripcion: "Aquí podrás preparar y editar el aviso legal."
    },

    configuracion: {
        titulo: "Configuración general",
        descripcion: "Aquí podrás administrar las opciones generales del sitio."
    }

};


// 5. NAVEGACIÓN DEL MENÚ LATERAL

function abrirModulo(nombreModulo) {

    const modulo = modulos[nombreModulo];

    if (!modulo) return;

    // Actualizar título superior
    pageTitle.textContent = modulo.titulo;

    // Actualizar enlaces activos
    document.querySelectorAll(".sidebar-menu a").forEach(enlace => {

        enlace.classList.remove("active");

        if (enlace.dataset.section === nombreModulo) {
            enlace.classList.add("active");
        }

    });

    // Mostrar escritorio o área de edición
    if (nombreModulo === "dashboard") {

        dashboardSection.hidden = false;
        editorSection.hidden = true;

    } else {

        dashboardSection.hidden = true;
        editorSection.hidden = false;

        editorTitle.textContent = modulo.titulo;

        editorDescription.textContent = modulo.descripcion;

        editorContent.innerHTML = `
            <div class="admin-panel">
                <h2>${modulo.titulo}</h2>
                <p>
                    Este módulo está preparado para incorporar
                    sus herramientas de edición y conexión con Supabase.
                </p>
                <span class="admin-status">Módulo en preparación</span>
            </div>
        `;

    }

    // Cerrar menú en móviles
    if (sidebar) {
        sidebar.classList.remove("open");
    }

}


// Escuchar clics del menú

document.querySelectorAll(".sidebar-menu a[data-section]").forEach(enlace => {

    enlace.addEventListener("click", function(event) {

        event.preventDefault();

        const nombreModulo = this.dataset.section;

        abrirModulo(nombreModulo);

    });

});


// 6. MENÚ PARA DISPOSITIVOS MÓVILES

if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", function() {

        sidebar.classList.toggle("open");

    });

}


// 7. CERRAR SESIÓN

const logoutButton = document.getElementById("logout-button");

if (logoutButton) {

    logoutButton.addEventListener("click", async function() {

        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            alert("No se pudo cerrar la sesión.");
            console.error(error.message);
            return;
        }

        window.location.href = "index.html";

    });

}


// 8. INICIAR PANEL

verificarSesion();
