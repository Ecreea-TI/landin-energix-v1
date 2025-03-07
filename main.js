// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: true,
    offset: 120,
    delay: 0,
    anchorPlacement: 'top-bottom'
  });

  // Refresh AOS when the window is resized
  window.addEventListener('resize', () => {
    AOS.refresh();
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mainMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mainMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }
});

//botones desplegables
function toggleFeature(element, buttonId) {
  // Cierra todos los contenidos
  document.querySelectorAll('.feature-content').forEach(content => {
    content.style.display = 'none';
  });

  // Muestra el contenido de la sección clickeada
  let content = element.nextElementSibling;
  content.style.display = 'block';

  // Quita el resaltado de todos los botones del gráfico interactivo
  document.querySelectorAll('.graph-item').forEach(button => {
    button.classList.remove('active');
  });

  // Resalta el botón correspondiente en el anillo
  if (buttonId) {
    document.getElementById(buttonId).classList.add('active');
  }
}












// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('.main-menu');

if (menuToggle && mainMenu) {
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    mainMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mainMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}

// Stats counter animation
function animateCounter(elementId, target, duration = 2000) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Intersection Observer for counters
const observeCounters = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('clientesCounter', 150);
        animateCounter('proyectosCounter', 300);
        animateCounter('ahorroCounter', 25);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
};

// 3D Isometric Background
const initHeroBackground = () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvas.appendChild(renderer.domElement);
  
  // Create isometric grid
  const gridSize = 20;
  const gridDivisions = 20;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
  
  // Rotate to isometric view
  gridHelper.rotation.x = Math.PI / 4;
  scene.add(gridHelper);
  
  // Add some cubes
  const cubes = [];
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  
  for (let i = 0; i < 20; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(
        Math.random() * 0.3 + 0.4,
        Math.random() * 0.3,
        Math.random() * 0.5 + 0.5
      ),
      wireframe: true
    });
    
    const cube = new THREE.Mesh(cubeGeometry, material);
    cube.position.x = (Math.random() - 0.5) * gridSize;
    cube.position.y = (Math.random() - 0.5) * 2;
    cube.position.z = (Math.random() - 0.5) * gridSize;
    cube.scale.set(
      Math.random() * 2 + 0.5,
      Math.random() * 2 + 0.5,
      Math.random() * 2 + 0.5
    );
    
    scene.add(cube);
    cubes.push({
      mesh: cube,
      rotationSpeed: {
        x: Math.random() * 0.01,
        y: Math.random() * 0.01,
        z: Math.random() * 0.01
      },
      floatSpeed: Math.random() * 0.01,
      floatHeight: Math.random() * 2,
      initialY: cube.position.y
    });
  }
  
  
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  observeCounters();
  initHeroBackground();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainMenu && mainMenu.classList.contains('active')) {
          mainMenu.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      }
    });
  });
  
  // Add active class to menu items on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 200;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.main-menu a[href*="#${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.main-menu a[href*="#${sectionId}"]`)?.classList.remove('active');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const caseCards = document.querySelectorAll('.case-card');
    const mainVideo = document.querySelector('.main-video iframe');

    caseCards.forEach(card => {
        const playOverlay = card.querySelector('.play-overlay');
        const videoIframe = card.querySelector('iframe');

        playOverlay.addEventListener('click', function() {
            if (videoIframe) {
                const videoSrc = videoIframe.getAttribute('src');
                mainVideo.setAttribute('src', videoSrc);
                
                // Scroll to main video
                mainVideo.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});