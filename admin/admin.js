// DATOS DE CONEXIÓN DE SUPABASE

const SUPABASE_URL = "https://pngvzrzzkkqoumgqyelx.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_-7A7JsUab82GSkRFSh9cIg_y1IkVA3Q";

// CREAR CONEXIÓN

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Supabase conectado correctamente");
// RECUPERAR CONTRASEÑA

const forgotPassword = document.getElementById("forgot-password");

forgotPassword.addEventListener("click", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
        alert("Primero escribe tu correo electrónico.");
        document.getElementById("email").focus();
        return;
    }

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/admin/reset-password.html"
    });

    if (error) {
        alert("No se pudo enviar el correo. Inténtalo nuevamente.");
        console.error(error.message);
        return;
    }

    alert("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
});
// INICIO DE SESIÓN

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("No se pudo iniciar sesión. Verifica tu correo y contraseña.");
        console.error(error.message);
        return;
    }

    alert("¡Bienvenido al panel de Mela Producciones!");

    window.location.href = "dashboard.html";

});