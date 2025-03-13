document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');

    // Toggle menu when clicking the hamburger icon
    menuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = mainMenu.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInside && mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking on a menu item
    const menuItems = mainMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Create mobile quick menu for small screens
    function createMobileQuickMenu() {
        // Verificar si ya existe
        if (document.querySelector('.mobile-quick-menu')) {
            return document.querySelector('.mobile-quick-menu');
        }

        // Crear el contenedor del menú móvil
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-quick-menu';
        
        // Clonar los enlaces rápidos para el menú móvil
        const quickLinksClone = document.querySelector('.quick-links').cloneNode(true);
        
        // Eliminar elementos innecesarios del clon (iconos, separador y toggle)
        const unnecessaryElements = Array.from(quickLinksClone.children).filter(el => 
            el.classList.contains('icon-link') || 
            el.classList.contains('menu-toggle-top') ||
            el.tagName.toLowerCase() === 'span'
        );
        
        unnecessaryElements.forEach(el => quickLinksClone.removeChild(el));
        
        // Agregar los enlaces clonados al menú móvil
        mobileMenu.appendChild(quickLinksClone);
        
        // Agregar el menú móvil al DOM después del top navbar
        const topNavbar = document.querySelector('.top-navbar');
        topNavbar.parentNode.insertBefore(mobileMenu, topNavbar.nextSibling);
        
        return mobileMenu;
    }

    // Handle mobile quick menu toggle
    function setupMobileQuickMenu() {
        // Only create mobile menu if screen is small enough
        if (window.innerWidth <= 768) {
            const mobileMenu = createMobileQuickMenu();
            const menuToggleTop = document.querySelector('.menu-toggle-top');
            const quickLinks = mobileMenu.querySelector('.quick-links');
            
            // Check if mobile menu already has a menu toggle
            const existingToggle = mobileMenu.querySelector('.menu-toggle-top');
            
            // Only add a new toggle if one doesn't already exist in the mobile menu
            if (!existingToggle && menuToggleTop && menuToggleTop.parentNode) {
                const menuToggleClone = menuToggleTop.cloneNode(true);
                mobileMenu.appendChild(menuToggleClone);
                
                // Add click event to toggle the quick links
                menuToggleClone.addEventListener('click', function() {
                    quickLinks.classList.toggle('active');
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', function(event) {
                    const isInsideMenu = mobileMenu.contains(event.target);
                    if (!isInsideMenu && quickLinks.classList.contains('active')) {
                        quickLinks.classList.remove('active');
                    }
                });
            }
        }
    }
    
    // Initialize mobile menu
    setupMobileQuickMenu();
    
    // Update on window resize
    window.addEventListener('resize', function() {
        setupMobileQuickMenu();
    });
});
