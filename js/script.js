document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const seccionesClaras = document.querySelectorAll(
        ".intro-section, .about-section, .services-section, .portfolio-section, .contact-section"
    );

    if (!navbar || !seccionesClaras.length) return;

    function actualizarNavbar() {
        const barra = navbar.getBoundingClientRect();
        const punto = barra.bottom + 1;

        let sobreFondoClaro = false;

        seccionesClaras.forEach(seccion => {
            const rect = seccion.getBoundingClientRect();

            if (rect.top <= punto && rect.bottom >= punto) {
                sobreFondoClaro = true;
            }
        });

        navbar.classList.toggle("fondo-claro", sobreFondoClaro);
    }

    window.addEventListener("scroll", actualizarNavbar);
    window.addEventListener("resize", actualizarNavbar);
    actualizarNavbar();
});