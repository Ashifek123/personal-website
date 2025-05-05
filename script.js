document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light Mode';
        if (mobileThemeToggle) mobileThemeToggle.textContent = 'Light Mode';
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
    
    function toggleTheme() {
        let theme;
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            theme = 'light';
            themeToggle.textContent = 'Dark Mode';
            if (mobileThemeToggle) mobileThemeToggle.textContent = 'Dark Mode';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            theme = 'dark';
            themeToggle.textContent = 'Light Mode';
            if (mobileThemeToggle) mobileThemeToggle.textContent = 'Light Mode';
        }
        localStorage.setItem('theme', theme);
        showToast('Theme changed to ' + theme + ' mode', 'success');
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.innerHTML = mobileMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            
            if (pageYOffset >= (sectionTop - headerHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Animated counters
    const projectsCount = document.getElementById('projectsCount');
    const clientsCount = document.getElementById('clientsCount');
    const experienceCount = document.getElementById('experienceCount');
    
    if (projectsCount && clientsCount && experienceCount) {
        animateValue(projectsCount, 0, 42, 2000);
        animateValue(clientsCount, 0, 18, 2000);
        animateValue(experienceCount, 0, 5, 2000);
    }
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Projects filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Load more projects
    const loadMoreBtn = document.getElementById('loadMoreProjects');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            showLoadingSpinner();
            
            // Simulate API call
            setTimeout(() => {
                // In a real app, you would fetch more projects from an API
                hideLoadingSpinner();
                showToast('No more projects to load', 'warning');
                this.disabled = true;
                this.textContent = 'All projects loaded';
            }, 1500);
        });
    }
    
    // View projects button
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function() {
            document.querySelector('#projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Download resume button
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function() {
            showLoadingSpinner();
            
            // Simulate download
            setTimeout(() => {
                hideLoadingSpinner();
                showToast('Resume downloaded successfully', 'success');
            }, 1500);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showLoadingSpinner();
            
            // Simulate form submission
            setTimeout(() => {
                hideLoadingSpinner();
                showToast('Message sent successfully!', 'success');
                this.reset();
            }, 2000);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Thanks for subscribing!', 'success');
            this.reset();
        });
    }
    
    // Hire me button
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Toast notification functions
    function showToast(message, type) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show ' + type;
        
        // Add icon based on type
        let icon;
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-times-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        toast.innerHTML = icon + ' ' + message;
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }
    
    // Loading spinner functions
    function showLoadingSpinner() {
        document.getElementById('loadingSpinner').classList.add('active');
    }
    
    function hideLoadingSpinner() {
        document.getElementById('loadingSpinner').classList.remove('active');
    }
    
    // Initialize skills radar chart
    const skillsChartCtx = document.getElementById('skillsRadarChart');
    if (skillsChartCtx) {
        const skillsChart = new Chart(skillsChartCtx, {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'UI/UX'],
                datasets: [{
                    label: 'Technical Skills',
                    data: [90, 85, 80, 75, 70, 65],
                    backgroundColor: 'rgba(0, 120, 212, 0.2)',
                    borderColor: 'rgba(0, 120, 212, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 120, 212, 1)',
                    pointRadius: 4
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(200, 200, 200, 0.5)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
// Generate project cards dynamically
const projectsGrid = document.querySelector('.projects-grid');
if (projectsGrid) {
    const projects = [
        {
            title: 'CivicTech - Digital Governance Platform',
            description: 'Full-stack governance platform (App + Web) connecting users, panchayaths, and authorities for complaints, services, and community voting.',
            category: 'all',
            tags: ['Django', 'Flutter', 'MySQL', 'HTML/CSS/JS'],
            image: 'image/civic.jpg'
        },
        {
            title: 'Blog App - Personal Project',
            description: 'A Django-powered blog system with admin, user authentication, post management, and a Flutter-based frontend.',
            category: 'web',
            tags: ['Django MVT', 'Flutter', 'SQLite', 'HTML/CSS'],
            image: 'image/blog.jpg'
        },
        {
            title: 'News feed App',
            description: 'Flutter news app fetching live news via API with real-time updates, card UI, and search functionality.',
            category: 'mobile',
            tags: ['Flutter', 'REST API', 'Dart'],
            image: 'image/news.jpg'
        },
        {
            title: 'Self-Help Book Project',
            description: 'A creative writing project developing a human-style motivational book exploring self-realization and life improvements.',
            category: 'web',
            tags: ['HTML/CSS', 'JS', 'Bootstrap', 'jQuery'],
            image: 'image/book.jpg'
        },

        {
            title: 'AI-Powered Chatbot',
            description: 'NLP-based support chatbot using Python, integrated with a Django backend for managing responses and logs.',
            category: 'web',
            tags: ['Python', 'Django', 'TensorFlow'],
            image: 'image/chat.jpg'
        }
    ];
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                <div class="project-image-overlay">
                    <button class="btn btn-outline btn-view">Quick View</button>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="btn btn-outline btn-details">Details</button>
                    <button class="btn btn-primary btn-demo">Live Demo</button>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Add hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-image-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image-overlay').style.opacity = '0';
        });
    });
}
    
    // Add intersection observer for animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.tech-card, .project-card, .education-card, .timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Call the function after all elements are loaded
    setTimeout(animateOnScroll, 500);
});