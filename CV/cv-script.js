// Section navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.cv-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Add hover effects to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Update your cv-script.js with this version
document.addEventListener('DOMContentLoaded', function() {
    console.log('CV Script Loaded!'); // Debug line
    
    // Section navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.cv-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Add hover effects to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Joker card functionality
    const jokerContainers = document.querySelectorAll('.joker-container');
    const jokerFaces = ['🃏', // '🃁', '🃂', '🃃', '🃄', '🃅', '🃆', '🃇', '🃈', '🃉', '🃊', '🃋', '🃍', '🃎',
    '🎵', // Music (Vibes)
    '🎨', // Art (Creativity)
    '🎪', // Circus (Chaos)
    '🤹', // Juggling (Multitasking)
    '🎭', // Theater (Performance)
    '🎲', // Dice (Chance)
    '🃏', // Joker (Wildcard)
    '🌈', // Rainbow (Spectrum)
    '🎰', // Slot Machine (Luck)
    '📯', // Party Horn (Celebration)
    '🎉', // Confetti (Joy)
    '🕺', // Dancer (Movement)
    '🎶', // Notes (Rhythm)
    '👑', // Crown (Excellence)
    '💃'  // Dancer (Flow)
];
    
    console.log('Found joker containers:', jokerContainers.length); // Debug line
    
    jokerContainers.forEach(container => {
        container.addEventListener('click', function() {
            console.log('Joker clicked!'); // Debug line
            const jokerIcon = this.querySelector('.joker-icon');
            const randomFace = jokerFaces[Math.floor(Math.random() * jokerFaces.length)];
            jokerIcon.textContent = randomFace;
            
            // Add bounce effect
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    });
});

// Function to load section content
async function loadSection(sectionName) {
    try {
        const response = await fetch(`cv-sections/${sectionName}.html`);
        const content = await response.text();
        document.getElementById('content-area').innerHTML = content;
    } catch (error) {
        console.error('Error loading section:', error);
        document.getElementById('content-area').innerHTML = `
            <div class="cv-section active" id="error">
                <div class="section-header">
                    <h2 class="cyber-glow-rainbow">⚠️ Error</h2>
                </div>
                <div class="section-content">
                    <div class="cyber-card vibe-matrix">
                        <p>Unable to load section. Please try again.</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Navigation event listeners
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Load section content
        loadSection(section);
    });
});

// Load default section on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSection('summary');
});
