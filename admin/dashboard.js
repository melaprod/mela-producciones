// CONEXIÓN CON SUPABASE

const SUPABASE_URL = "https://pngvzrzzkkqoumgqyelx.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_-7A7JsUab82GSkRFSh9cIg_y1IkVA3Q";

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// VERIFICAR SESIÓN DEL ADMINISTRADOR

async function verificarSesion() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        window.location.href = "index.html";
        return;
    }

    console.log("Administrador autenticado:", data.session.user.email);
}

verificarSesion();


// CERRAR SESIÓN

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", async function () {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("No se pudo cerrar la sesión.");
        console.error(error.message);
        return;
    }

    window.location.href = "index.html";

});