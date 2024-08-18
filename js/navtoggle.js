document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

    function toggleMenu() {
        menu.classList.toggle('show');
    }

    toggleButton.addEventListener('click', toggleMenu);
    toggleButton.addEventListener('touchstart', toggleMenu); // Optional, for touch devices
});
