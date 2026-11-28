// CONEXIÓN CON SUPABASE

const SUPABASE_URL = "https://pngvzrzzkkqoumgqyelx.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_-7A7JsUab82GSkRFSh9cIg_y1IkVA3Q";

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// RESTABLECER CONTRASEÑA

const resetForm = document.getElementById("reset-form");

resetForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (newPassword.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    const { error } = await supabaseClient.auth.updateUser({
        password: newPassword
    });

    if (error) {
        alert("No se pudo actualizar la contraseña. Solicita un nuevo enlace de recuperación.");
        console.error(error.message);
        return;
    }

    alert("¡Contraseña actualizada correctamente!");

    window.location.href = "index.html";

});