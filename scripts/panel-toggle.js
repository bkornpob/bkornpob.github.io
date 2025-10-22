// scripts/panel-toggle.js
// Floating Study Panel Toggle Functionality

document.addEventListener('DOMContentLoaded', function() {
    const panelToggle = document.querySelector('.panel-toggle');
    const panel = document.querySelector('.study-panel');
    const mainContent = document.getElementById('mainContent');
    
    if (panelToggle && panel && mainContent) {
        panelToggle.addEventListener('click', function() {
            // Toggle panel collapsed state
            panel.classList.toggle('collapsed');
            
            // Toggle main content spacing for larger screens
            if (window.innerWidth > 1200) {
                mainContent.classList.toggle('panel-expanded');
            }
            
            // Optional: Change toggle icon based on state
            updateToggleIcon();
        });
        
        // Handle window resize to adjust spacing
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 1200) {
                mainContent.classList.remove('panel-expanded');
            } else if (!panel.classList.contains('collapsed')) {
                mainContent.classList.add('panel-expanded');
            }
        });
    }
    
    function updateToggleIcon() {
        const toggle = document.querySelector('.panel-toggle');
        if (toggle) {
            if (document.querySelector('.study-panel').classList.contains('collapsed')) {
                toggle.textContent = '⚡'; // Lightning bolt for collapsed
            } else {
                toggle.textContent = '📚'; // Books for expanded
            }
        }
    }
    
    // Initialize icon on load
    updateToggleIcon();
});
