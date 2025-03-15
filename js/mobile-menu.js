document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.navbar-menu');
    const mainMenuItems = document.querySelectorAll('#evidence > a, #nt > a, #modern > a');
    
    mainMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 600) {
                e.preventDefault();
                const parentId = this.parentElement.id;
                const dropdown = document.querySelector(`.${parentId}-dropdown`);
                
                // Hide the navbar menu
                navMenu.style.display = 'none';
                
                // Show the dropdown
                dropdown.classList.add('submenu-active');
                
                // Add back button if it doesn't exist
                let backButton = dropdown.querySelector('.back-button');
                if (!backButton) {
                    backButton = document.createElement('button');
                    backButton.className = 'back-button';
                    backButton.innerHTML = '← Back';
                    dropdown.insertBefore(backButton, dropdown.firstChild);
                    
                    backButton.addEventListener('click', function() {
                        dropdown.classList.remove('submenu-active');
                        navMenu.style.display = 'flex';
                    });
                }
            }
        });
    });
});
