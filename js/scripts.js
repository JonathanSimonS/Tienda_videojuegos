window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

     // SCROLL
    window.onscroll = function() { subir() };

    const botonArriba = document.getElementById("boton-scroll");

    function subir() {
        if (document.documentElement.scrollTop > 10) {
            botonArriba.className = "boton-scroll-aparece";
            //botonArriba.style.animationDuration = "20s";
        } else {
            botonArriba.className = "";
        }
    }

});
