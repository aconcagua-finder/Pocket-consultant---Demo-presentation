document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const tiles = document.querySelectorAll('.tile');
    const dateButtons = document.querySelectorAll('.date-btn');
    const dateContents = document.querySelectorAll('.date-content');
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    const frontendTile = document.querySelector('.tile[data-section="frontend"]');
    const backendTitle = document.querySelector('.tile[data-section="backend"] h3');
    
    // Current active date
    let currentDate = '2025-10-02';

    function updateTileVisibility() {
        const isNewDate = currentDate === '2025-10-02';
        if (frontendTile) {
            if (isNewDate) {
                frontendTile.classList.remove('active');
                frontendTile.style.display = 'none';
            } else {
                frontendTile.style.display = '';
            }
        }

        if (backendTitle) {
            backendTitle.textContent = isNewDate ? 'Разработка' : 'Бэкенд';
        }
    }
    
    // Initialize - show the active date content
    function initializeDateContent() {
        dateContents.forEach(content => {
            if (content.getAttribute('data-date') === currentDate) {
                content.classList.add('active');
                // Find and activate first section in this date
                const firstSection = content.querySelector('.content-section');
                if (firstSection) {
                    firstSection.classList.add('active');
                }
            } else {
                content.classList.remove('active');
            }
        });

        // Ensure date buttons reflect active state
        dateButtons.forEach(button => {
            const isActiveDate = button.getAttribute('data-date') === currentDate;
            button.classList.toggle('active', isActiveDate);
            button.setAttribute('aria-pressed', isActiveDate ? 'true' : 'false');
        });

        // Activate first tile
        updateTileVisibility();
        tiles.forEach(t => t.classList.remove('active'));
        const visibleTiles = Array.from(tiles).filter(tile => tile.style.display !== 'none');
        if (visibleTiles.length > 0) {
            visibleTiles[0].classList.add('active');
        }
    }
    
    // Handle date toggle clicks
    dateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedDate = this.getAttribute('data-date');
            
            if (selectedDate === currentDate) return;
            
            // Update active button
            dateButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Switch date content
            currentDate = selectedDate;
            dateContents.forEach(content => {
                if (content.getAttribute('data-date') === selectedDate) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            // Reset tiles and show first section of new date
            tiles.forEach(t => t.classList.remove('active'));
            updateTileVisibility();
            const visibleTiles = Array.from(tiles).filter(tile => tile.style.display !== 'none');
            if (visibleTiles.length > 0) {
                visibleTiles[0].classList.add('active');
                const activeContent = document.querySelector(`.date-content[data-date="${selectedDate}"]`);
                if (activeContent) {
                    // Hide all sections first
                    activeContent.querySelectorAll('.content-section').forEach(section => {
                        section.classList.remove('active');
                    });
                    // Show first section
                    const firstSection = activeContent.querySelector('.content-section');
                    if (firstSection) {
                        setTimeout(() => {
                            firstSection.classList.add('active');
                        }, 50);
                    }
                }
            }
        });
    });
    
    // Add click event listeners to all tiles
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all tiles
            tiles.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tile
            this.classList.add('active');
            
            // Find the active date content
            const activeContent = document.querySelector(`.date-content[data-date="${currentDate}"]`);
            if (!activeContent) return;
            
            // Hide all sections in active date
            activeContent.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show corresponding content section
            // Try to find section with matching ID for current date
            let targetId = targetSection;
            if (currentDate === '2025-06-26') {
                // For old date, add -old suffix if needed
                targetId = targetSection + '-old';
                let targetContent = activeContent.querySelector(`#${targetId}`);
                if (!targetContent) {
                    targetId = targetSection;
                }
            }

            if (currentDate === '2025-10-02' && (targetSection === 'backend' || targetSection === 'frontend')) {
                targetId = 'development';
            }

            const targetContent = activeContent.querySelector(`#${targetId}`) || 
                                 activeContent.querySelector(`#${targetSection}`);
            
            if (targetContent) {
                // Use setTimeout to ensure smooth transition
                setTimeout(() => {
                    targetContent.classList.add('active');
                    
                    // Re-trigger animation for task cards when switching sections
                    const taskCards = targetContent.querySelectorAll('.task-card');
                    taskCards.forEach((card, index) => {
                        // Reset animation
                        card.style.animation = 'none';
                        card.offsetHeight; // Force reflow
                        card.style.animation = null;
                        // Add staggered animation delay
                        card.style.animationDelay = `${index * 0.05}s`;
                    });
                    
                    // Re-group tasks if needed
                    setTimeout(() => {
                        groupTasksByStatus();
                    }, 100);
                }, 50);
            }
            
            // Add click animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover effects
        tile.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        tile.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Add parallax effect to background
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        // Apply subtle parallax effect to body background
        document.body.style.backgroundPosition = `${50 + mouseX * 0.05}% ${50 + mouseY * 0.05}%`;
    });
    
    // Add loading animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Add stagger animation for tiles
    tiles.forEach((tile, index) => {
        tile.style.opacity = '0';
        tile.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            tile.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            tile.style.opacity = '1';
            tile.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
    
    // Add intersection observer for content items animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content items for animation
    const contentItems = document.querySelectorAll('.content-item, .summary-block');
    contentItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(item);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const visibleTiles = Array.from(tiles).filter(tile => tile.style.display !== 'none');
        if (visibleTiles.length === 0) return;
        const activeTileIndex = visibleTiles.findIndex(tile => tile.classList.contains('active'));
        let nextIndex = activeTileIndex;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                nextIndex = (activeTileIndex + 1 + visibleTiles.length) % visibleTiles.length;
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                nextIndex = (activeTileIndex - 1 + visibleTiles.length) % visibleTiles.length;
                break;
            case '1':
                // Switch to first date
                if (dateButtons[0]) dateButtons[0].click();
                return;
            case '2':
                // Switch to second date
                if (dateButtons[1]) dateButtons[1].click();
                return;
            case '3':
                // Switch to third date
                if (dateButtons[2]) dateButtons[2].click();
                return;
            case 'Enter':
            case ' ':
                e.preventDefault();
                return; // Don't change section, just prevent default
        }
        
        if (activeTileIndex === -1) {
            visibleTiles[0].click();
            return;
        }

        if (nextIndex !== activeTileIndex && visibleTiles[nextIndex]) {
            visibleTiles[nextIndex].click();
        }
    });
    
    // Add focus management for accessibility
    tiles.forEach(tile => {
        tile.setAttribute('tabindex', '0');
        tile.setAttribute('role', 'button');
        
        tile.addEventListener('focus', function() {
            this.style.outline = '2px solid #2EBDC9';
            this.style.outlineOffset = '4px';
        });
        
        tile.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        tile.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Date buttons accessibility
    dateButtons.forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
        
        btn.addEventListener('click', function() {
            dateButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
            this.setAttribute('aria-pressed', 'true');
        });
    });
    
    // Performance optimization - debounce resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate any size-dependent elements
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.style.transition = 'none';
                // Force reflow
                tile.offsetHeight;
                tile.style.transition = '';
            });
        }, 250);
    });
    
    // Group tasks by status
    function groupTasksByStatus() {
        const contentLists = document.querySelectorAll('.content-list');
        
        contentLists.forEach(list => {
            const tasks = Array.from(list.querySelectorAll('.task-card'));
            if (tasks.length === 0) return;
            
            // Clear the list
            list.innerHTML = '';
            
            // Group tasks
            const grouped = {
                done: tasks.filter(t => t.dataset.status === 'done'),
                progress: tasks.filter(t => t.dataset.status === 'progress'),
                planned: tasks.filter(t => t.dataset.status === 'planned')
            };
            
            // Add groups with headers
            if (grouped.done.length > 0) {
                const group = document.createElement('div');
                group.className = 'status-group';
                group.dataset.status = 'done';
                
                const header = document.createElement('div');
                header.className = 'status-group-header';
                header.innerHTML = `
                    <h3>
                        <svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="#5EEAD4" stroke-width="1.5"/>
                            <path d="M4 7L6 9L10 5" stroke="#5EEAD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Выполнено
                    </h3>`;
                group.appendChild(header);
                
                grouped.done.forEach(task => group.appendChild(task));
                list.appendChild(group);
            }
            
            if (grouped.progress.length > 0) {
                const group = document.createElement('div');
                group.className = 'status-group';
                group.dataset.status = 'progress';
                
                const header = document.createElement('div');
                header.className = 'status-group-header';
                header.innerHTML = `
                    <h3>
                        <svg class="status-icon status-icon-progress" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="#FBBF24" stroke-width="1.5" stroke-dasharray="28" stroke-dashoffset="7" stroke-linecap="round">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 7 7"
                                    to="360 7 7"
                                    dur="2s"
                                    repeatCount="indefinite"/>
                            </circle>
                            <circle cx="7" cy="7" r="2.5" fill="#FBBF24"/>
                        </svg>
                        В процессе
                    </h3>`;
                group.appendChild(header);
                
                grouped.progress.forEach(task => group.appendChild(task));
                list.appendChild(group);
            }
            
            if (grouped.planned.length > 0) {
                const group = document.createElement('div');
                group.className = 'status-group';
                group.dataset.status = 'planned';
                
                const header = document.createElement('div');
                header.className = 'status-group-header';
                header.innerHTML = `
                    <h3>
                        <svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="2" y="2" width="10" height="10" rx="2" stroke="#A78BFA" stroke-width="1.5"/>
                            <circle cx="5" cy="5" r="1" fill="#A78BFA"/>
                            <line x1="8" y1="5" x2="10" y2="5" stroke="#A78BFA" stroke-width="1" stroke-linecap="round"/>
                            <line x1="4" y1="9" x2="10" y2="9" stroke="#A78BFA" stroke-width="1" stroke-linecap="round"/>
                        </svg>
                        Планируется
                    </h3>`;
                group.appendChild(header);
                
                grouped.planned.forEach(task => group.appendChild(task));
                list.appendChild(group);
            }
        });
    }
    
    // Initialize the page
    initializeDateContent();
    groupTasksByStatus();
});
