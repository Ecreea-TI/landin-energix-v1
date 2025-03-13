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
});
