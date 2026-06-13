/* ==========================================================================
   THEME TOGGLER
   ========================================================================== */

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check local storage or default to dark-neon
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark-neon';
body.className = savedTheme;
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-neon')) {
        body.classList.replace('light-neon', 'dark-neon');
        localStorage.setItem('portfolio-theme', 'dark-neon');
        updateThemeIcon('dark-neon');
    } else {
        body.classList.replace('dark-neon', 'light-neon');
        localStorage.setItem('portfolio-theme', 'light-neon');
        updateThemeIcon('light-neon');
    }
    // Update ThreeJS background and wireframe color
    if (typeof updateThreeJSTheme === 'function') {
        updateThreeJSTheme();
    }
});

function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark-neon') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

/* ==========================================================================
   MOBILE NAVIGATION MENU
   ========================================================================== */

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navigation Active States on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

/* ==========================================================================
   TEXT SCRAMBLE / TYPING ANIMATION
   ========================================================================== */

class TextScrambler {
    constructor(el) {
        this.el = el;
        this.phrases = JSON.parse(el.dataset.scramble);
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.currentIndex = 0;
        setTimeout(() => this.next(), 1000);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameId);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="c-pink">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameId = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }

    next() {
        this.setText(this.phrases[this.currentIndex]).then(() => {
            setTimeout(() => this.next(), 3000);
        });
        this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
    }
}

const scrambleEl = document.getElementById('scramble-text');
if (scrambleEl) {
    new TextScrambler(scrambleEl);
}

/* ==========================================================================
   ABOUT ME SECTION TABS
   ========================================================================== */

const tabButtons = document.querySelectorAll('.about-tab');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetPane = button.dataset.target;
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(`pane-${targetPane}`).classList.add('active');
    });
});

/* ==========================================================================
   INTERACTIVE SKILLS MATRIX LINKING TO PROJECTS
   ========================================================================== */

const skillBadges = document.querySelectorAll('.skill-badge');
const projectCards = document.querySelectorAll('.project-card');
const filterButtons = document.querySelectorAll('.filter-btn');

skillBadges.forEach(badge => {
    badge.addEventListener('click', () => {
        const selectedSkill = badge.dataset.skill;
        const isActive = badge.classList.contains('active');

        // Toggle badge active state
        skillBadges.forEach(b => b.classList.remove('active'));
        if (!isActive) {
            badge.classList.add('active');
            filterProjectsBySkill(selectedSkill);
        } else {
            // If turning off, show all projects
            resetFilters();
        }
    });
});

function filterProjectsBySkill(skill) {
    // Sync with top project buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    projectCards.forEach(card => {
        const tags = JSON.parse(card.dataset.tags || '[]');
        if (tags.includes(skill)) {
            card.classList.remove('filtered-out');
        } else {
            card.classList.add('filtered-out');
        }
    });
}

function resetFilters() {
    skillBadges.forEach(b => b.classList.remove('active'));
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === 'all') btn.classList.add('active');
        else btn.classList.remove('active');
    });
    projectCards.forEach(card => card.classList.remove('filtered-out'));
}

/* Project Filter Buttons (Category tabs) */
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterVal = button.dataset.filter;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Reset skills badges
        skillBadges.forEach(b => b.classList.remove('active'));

        projectCards.forEach(card => {
            const tags = JSON.parse(card.dataset.tags || '[]');
            if (filterVal === 'all' || tags.includes(filterVal)) {
                card.classList.remove('filtered-out');
            } else {
                card.classList.add('filtered-out');
            }
        });
    });
});

/* ==========================================================================
   3D PARALLAX DEVICE EFFECT
   ========================================================================== */

const deviceCard = document.getElementById('interactive-device');
if (deviceCard) {
    const parent = deviceCard.parentElement;
    
    parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);
        
        // Degree constraints
        const rotX = -(y / rect.height) * 30; // Max 15deg
        const rotY = (x / rect.width) * 30;
        
        deviceCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
    });
    
    parent.addEventListener('mouseleave', () => {
        deviceCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
}

/* ==========================================================================
   BACKGROUND CANVAS THREE.JS 3D ROCKY LAND LANDSCAPE
   ========================================================================== */

let scene, camera, renderer;
let terrainGroup, solidMesh, wireMesh, pointsMesh;
let targetCameraX = 0, targetCameraY = 32;
let targetRotationX = 0, targetRotationY = 0;
const terrainBaseY = -16;

function initThreeJS() {
    if (typeof THREE === 'undefined') {
        console.warn("Three.js not loaded. Falling back to background grid.");
        return;
    }
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // 1. Create Scene & Fog
    scene = new THREE.Scene();
    const isDark = body.classList.contains('dark-neon');
    const fogColor = isDark ? 0x000000 : 0xffffff;
    scene.fog = new THREE.FogExp2(fogColor, 0.0075);

    // 2. Create Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 32, 90);
    camera.lookAt(0, -10, 0);

    // 3. Create WebGL Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create Continuous Rocky Terrain Landscape
    terrainGroup = new THREE.Group();
    terrainGroup.position.set(0, terrainBaseY, 0);

    const width = 300;
    const depth = 300;
    const segments = 45;
    const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);

    // Displace vertices to form mountains and valleys
    const posAttr = geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i); // Local y coordinate ranges from -depth/2 to depth/2

        // A combination of multi-frequency sine/cosine waves for rugged terrain
        let val = 0;
        // Base mountain structures
        val += Math.sin(x * 0.03) * Math.cos(y * 0.03) * 7.0;
        // Jagged brutalist ridges
        val += Math.abs(Math.sin(x * 0.075) * Math.cos(y * 0.075)) * 4.5;
        // Small details
        val += Math.cos(x * 0.16) * Math.sin(y * 0.16) * 1.5;

        // t goes from 0 (foreground, y = -150) to 1 (background, y = 150)
        const t = (y + (depth / 2)) / depth;

        // Valley factor: make the center (x = 0) lower, and left/right sides higher
        const centerFactor = Math.abs(x) / (width / 2); // 0 at center, 1 at sides
        const sideElevation = centerFactor * 8.0;

        // Exponential amplitude scaling: flat in foreground, high peaks in background
        const amp = Math.pow(t, 1.6) * 23.0 + 1.2 + (sideElevation * t);

        // Apply height displacement (z is local vertical before rotation)
        posAttr.setZ(i, val * (amp / 13.0));
    }
    
    // Rotate geometry so it lies horizontally (z becomes world height, y becomes depth)
    geometry.rotateX(-Math.PI / 2);
    geometry.computeVertexNormals();

    // Materials
    const solidColor = isDark ? 0x050505 : 0xf9f9f9;
    const wireColor = isDark ? 0xffffff : 0x000000;

    // Solid Occluder body (Flat shaded)
    const solidMaterial = new THREE.MeshBasicMaterial({
        color: solidColor,
        flatShading: true,
        transparent: true,
        opacity: 0.95
    });
    solidMesh = new THREE.Mesh(geometry, solidMaterial);
    terrainGroup.add(solidMesh);

    // Wireframe overlay
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: wireColor,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.25 : 0.15
    });
    wireMesh = new THREE.Mesh(geometry, wireMaterial);
    terrainGroup.add(wireMesh);

    // Points cloud intersections
    const pointsMaterial = new THREE.PointsMaterial({
        color: wireColor,
        size: isDark ? 1.5 : 2.0,
        transparent: true,
        opacity: isDark ? 0.35 : 0.2
    });
    pointsMesh = new THREE.Points(geometry, pointsMaterial);
    terrainGroup.add(pointsMesh);

    scene.add(terrainGroup);

    // 5. Event Listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    
    // Initialize updates
    updateThreeJSTheme();

    // 6. Start Loop
    animateThreeJS();
}

function onWindowResize() {
    if (!camera || !renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function onMouseMove(e) {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

    // Target mesh tilt rotation offsets
    targetRotationX = mouseY * 0.05;
    targetRotationY = -mouseX * 0.05;

    // Camera parallax shifts
    targetCameraX = mouseX * 12;
    targetCameraY = 32 - (mouseY * 8);
}

function updateThreeJSTheme() {
    if (typeof THREE === 'undefined' || !scene || !solidMesh) return;
    const isDark = body.classList.contains('dark-neon');
    
    const solidColor = isDark ? 0x050505 : 0xf9f9f9;
    const wireColor = isDark ? 0xffffff : 0x000000;
    const bgColor = isDark ? 0x000000 : 0xffffff;
    
    if (solidMesh) {
        solidMesh.material.color.setHex(solidColor);
    }
    if (wireMesh) {
        wireMesh.material.color.setHex(wireColor);
        wireMesh.material.opacity = isDark ? 0.25 : 0.15;
    }
    if (pointsMesh) {
        pointsMesh.material.color.setHex(wireColor);
        pointsMesh.material.opacity = isDark ? 0.35 : 0.2;
    }
    
    scene.fog.color.setHex(bgColor);
}

function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);

    const time = Date.now() * 0.001;

    if (terrainGroup) {
        // Gentle rigid-body bobbing
        terrainGroup.position.y = terrainBaseY + Math.sin(time * 0.2) * 0.6;
        
        // Swaying rotation + mouse tilt
        terrainGroup.rotation.x = (Math.sin(time * 0.05) * 0.008) + targetRotationX;
        terrainGroup.rotation.z = (Math.cos(time * 0.04) * 0.012);
        terrainGroup.rotation.y = targetRotationY;
    }

    if (camera) {
        camera.position.x += (targetCameraX - camera.position.x) * 0.05;
        camera.position.y += (targetCameraY - camera.position.y) * 0.05;
        camera.lookAt(0, -10, 0);
    }

    // Render
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Initialize on page load safely
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}

/* ==========================================================================
   PROJECT MODALS (CASE STUDY DETAILS)
   ========================================================================== */

const modal = document.getElementById('project-modal');
const modalContentArea = document.getElementById('modal-content-area');

const projectDetailsData = {
    p_synergia: {
        badge: 'AI & Web Event Portal',
        title: 'Synergia Hackathon & Event Management Portal',
        imgBg: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
        icon: 'fa-comments',
        desc: 'A full-stack registration and portal website built for VCET events and hackathons. Integrates a Gemini AI-driven student help desk directly on the page to resolve event guidelines, timelines, and registration queries.',
        bullets: [
            'Built with React.js, TypeScript, and Vite for performance-oriented rendering.',
            'Integrated the Google Gemini AI Studio API to create a live conversational ChatAssistant component.',
            'Features countdown components for deadlines, dynamic schedules, and event maps.',
            'Connected to Firebase databases to manage student registration files and logs.'
        ],
        techs: ['React.js', 'TypeScript', 'Gemini AI API', 'Tailwind CSS', 'Firebase'],
        codeLink: 'https://github.com/ATHITHYAN-S-developer/synergia.git'
    },
    p_ocr: {
        badge: 'Document Processing OCR',
        title: 'Tamil & English Electoral Roll OCR Extractor',
        imgBg: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
        icon: 'fa-language',
        desc: 'An automated desktop-server pipeline designed to parse voters listings from bilingual electoral PDFs. Using custom regex filters and PyTesseract layout alignment, it parses low-quality scan grids into cleanly organized SQLite database structures.',
        bullets: [
            'Developed Flask API endpoints supporting up to 100MB PDF uploads using PyMuPDF (fitz).',
            'Implemented custom image pre-processing and threshold configurations to resolve low-resolution Tamil characters.',
            'Parsed extracted voter data cards (names, relative names, serial numbers, ages, genders) via modular regular expressions.',
            'Stored voters records inside SQLite databases for local lookup queries.'
        ],
        techs: ['Python', 'Flask', 'pytesseract', 'PyMuPDF (fitz)', 'SQLite3', 'JavaScript'],
        codeLink: 'https://github.com/ATHITHYAN-S-developer/OCR-for-tamil-and-english-.git'
    },
    p_ipl: {
        badge: 'Real-Time Bidding Web',
        title: 'IPL Auction & Bidding Portal',
        imgBg: 'linear-gradient(135deg, var(--neon-blue), var(--neon-lime))',
        icon: 'fa-gavel',
        desc: 'A real-time, interactive bidding portal designed for cricket league mock auctions. Employs instant websocket-like synchronization to coordinate active bids between administrators and participants.',
        bullets: [
            'Built with React.js, Vite, and CSS3 Glassmorphism.',
            'Integrated Firebase Authentication to implement secure role-based logins for auctioneers and regular bidders.',
            'Utilized real-time Firestore synchronization hooks to update bid history and player statuses instantly.',
            'Supports admin panel controllers to start bids, advance player lists, and resolve auction items.'
        ],
        techs: ['React.js', 'Firebase Firestore', 'Firebase Auth', 'Vite', 'CSS3'],
        codeLink: 'https://github.com/ATHITHYAN-S-developer/ipl-action.git'
    },
    p_wayanad: {
        badge: 'Collaborative Utility',
        title: 'Wayanad Trip Expense Manager',
        imgBg: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
        icon: 'fa-wallet',
        desc: 'A collaborative web application designed to track, distribute, and split costs during group travels. Features cloud-synchronized ledgers and exportable sheets for easy group settlements.',
        bullets: [
            'Coded dynamic user interfaces with Bootstrap 5 templates.',
            'Used Firebase Firestore to sync active bills and ledger updates instantly across group devices.',
            'Plotted visual expense divisions using Chart.js donut and bar graphs.',
            'Implemented Excel (SheetJS) and PDF (jsPDF AutoTable) export protocols for sharing summary logs.'
        ],
        techs: ['HTML5/CSS3', 'Bootstrap 5', 'Chart.js', 'Firebase Firestore', 'SheetJS', 'jsPDF'],
        codeLink: 'https://github.com/ATHITHYAN-S-developer/wayanad.git'
    },
    p_streamlit: {
        badge: 'Data Science Dashboard',
        title: 'Customer Spend Analysis using K-Means Clustering',
        imgBg: 'linear-gradient(135deg, var(--neon-lime), var(--neon-blue))',
        icon: 'fa-chart-pie',
        desc: 'An interactive analytical dashboard designed to segment customers based on annual income ranges and spending patterns. Useful for targeting specific business campaigns.',
        bullets: [
            'Coded using Python and Streamlit dashboards.',
            'Processed transaction logs using Pandas dataframes and NumPy arrays.',
            'Implemented Unsupervised K-Means clustering algorithm from Scikit-Learn.',
            'Features interactive multiselect controls and data caching to speed up segmentation plotting.'
        ],
        techs: ['Python', 'Streamlit', 'Scikit-Learn', 'Pandas', 'NumPy'],
        codeLink: 'https://github.com/ATHITHYAN-S-developer/streamlit-app.git'
    },
    p_sales: {
        badge: 'Predictive Analytics ML',
        title: 'Digital Ads Conversion Predictor',
        imgBg: 'linear-gradient(135deg, var(--neon-pink), var(--neon-lime))',
        icon: 'fa-bullseye',
        desc: 'A machine learning classification pipeline trained on digital advertisement demographics. Predicts whether a prospective client is likely to purchase a product based on age, gender, and estimated salary indicators.',
        bullets: [
            'Trained and evaluated using Jupyter Notebook configurations.',
            'Implemented Logistic Regression classifiers from Scikit-Learn.',
            'Utilized StandardScaler feature scaling to improve gradient descent convergence.',
            'Achieved an accuracy classification score of 80% on test splits.'
        ],
        techs: ['Python', 'Scikit-Learn', 'Logistic Regression', 'Pandas', 'Jupyter'],
        codeLink: 'https://github.com/ATHITHYAN-S-developer/sales-prediction-using-machine-learning.git'
    }
};

function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    modalContentArea.innerHTML = `
        <div class="modal-header">
            <span class="modal-header-badge">${data.badge}</span>
            <h3 class="modal-title">${data.title}</h3>
        </div>
        <div class="modal-img-mock" style="background: ${data.imgBg}">
            <i class="fa-solid ${data.icon}" style="font-size: 5rem; color: #ffffff;"></i>
        </div>
        <p class="modal-desc">${data.desc}</p>
        <ul class="modal-bullets">
            ${data.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div class="modal-techs">
            ${data.techs.map(t => `<span class="tag" style="margin-right: 5px; margin-bottom: 5px;">${t}</span>`).join('')}
        </div>
        <div class="modal-actions">
            <a href="${data.codeLink}" target="_blank" class="btn btn-primary">
                View Source Code <i class="fa-brands fa-github"></i>
            </a>
            <button class="btn btn-tertiary" onclick="closeProjectModal()">
                Close
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock body scroll
}

function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Release body scroll
}

// Close modal when clicking outside card
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});


/* ==========================================================================
   CUSTOM CYBER CURSOR SCRIPT
   ========================================================================== */
(function() {
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    // Detect touch screens to prevent cursor glitches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    if (isTouchDevice) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }
    
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    let firstMove = true;
    
    const lerpFactor = 0.15;
    
    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
        
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        if (firstMove) {
            outlineX = dotX;
            outlineY = dotY;
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            firstMove = false;
        }
    });
    
    function animateCursorOutline() {
        if (!firstMove) {
            outlineX += (dotX - outlineX) * lerpFactor;
            outlineY += (dotY - outlineY) * lerpFactor;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        requestAnimationFrame(animateCursorOutline);
    }
    requestAnimationFrame(animateCursorOutline);
    
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        if (!firstMove) {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        }
    });
    
    const hoverSelectors = 'a, button, input, textarea, select, .skill-badge, .social-pill, .filter-btn, .about-tab, .menu-toggle, .modal-close, [role="button"]';
    
    window.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            cursorDot.classList.add('hover-active');
            cursorOutline.classList.add('hover-active');
        }
    });
    
    window.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelectors)) {
            cursorDot.classList.remove('hover-active');
            cursorOutline.classList.remove('hover-active');
        }
    });
    
    window.addEventListener('mousedown', () => {
        cursorOutline.classList.add('click-active');
    });
    
    window.addEventListener('mouseup', () => {
        cursorOutline.classList.remove('click-active');
    });
})();
