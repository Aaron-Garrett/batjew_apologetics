document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');
    const dropdowns = document.querySelectorAll('.evidence-dropdown, .nt-dropdown, .modern-dropdown');

    hamburger.addEventListener('click', function () {
        // Toggle main menu visibility
        if (menu.style.display === 'none' || !menu.classList.contains('show')) {
            menu.style.display = 'flex';
            menu.classList.add('show');
        } else {
            menu.classList.remove('show');
        }

        // Hide all dropdowns
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('submenu-active')) {
                dropdown.classList.remove('submenu-active');
                menu.style.display = 'none';
            }
        });
    });
    
    // Add hover handlers for desktop
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const dropdown = document.querySelector(`.${item.id}-dropdown`);

        item.addEventListener('mouseenter', function () {
            if (window.innerWidth > 600) {
                dropdown.classList.add('show');
            }
        });

        dropdown.addEventListener('mouseenter', function () {
            if (window.innerWidth > 600) {
                dropdown.classList.add('show');
            }
        });

        dropdown.addEventListener('mouseleave', function () {
            if (window.innerWidth > 600) {
                dropdown.classList.remove('show');
            }
        });

        item.addEventListener('mouseleave', function () {
            if (window.innerWidth > 600) {
                dropdown.classList.remove('show');
            }
        });
    });
});
