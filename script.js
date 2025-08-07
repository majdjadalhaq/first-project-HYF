// Data is now directly embedded in the script to ensure it's always available
const allData = {
    "translations": {
        "en": {
            "navAbout": "About",
            "navJourney": "Journey",
            "navWhy": "Why Me?",
            "navContact": "Contact",
            "heroTitle": "From Palestine to Code",
            "heroDesc": "Finding hope through HackYourFuture and following my true passion. After moving to the Netherlands, HackYourFuture gave me a second chance to follow my tech dreams.",
            "btnContact": "Get in Touch",
            "btnJourney": "My Journey",
            "aboutTitle": "About Me",
            "aboutP1": "I'm Majd Jad Alhaq, a 26-year-old from Palestine. I started with Computer Science before switching to Law due to circumstances, but coding was always my true passion. After moving to the Netherlands, HackYourFuture gave me a second chance to follow my tech dreams.",
            "journeyTitle": "My Journey",
            "whyTitle": "Why You Should Accept Me",
            "whyIntro": "I survived law school AND a war zone - your tight deadlines don't scare me! My unique background gives me both technical skills and unparalleled resilience. Jokes aside, I bring:",
            "contactTitle": "Contact",
            "journey_title_1": "Started Computer Science",
            "journey_desc_1": "First exposure to programming fundamentals",
            "journey_title_2": "Graduated from Law College",
            "journey_desc_2": "Completed degree in challenging circumstances",
            "journey_title_3": "Survived war conditions",
            "journey_desc_3": "Developed resilience under extreme pressure",
            "journey_title_4": "HackYourFuture Student",
            "journey_desc_4": "Rediscovered my passion for coding",
            "skill_1": "Fast Learner",
            "skill_2": "HTML/CSS Pro",
            "skill_3": "JavaScript",
            "skill_4": "Problem Solver",
            "skill_5": "Works Under Pressure",
            "skill_6": "Team Player"
        },
        "nl": {
            "navAbout": "Over Mij",
            "navJourney": "Reis",
            "navWhy": "Waarom Ik?",
            "navContact": "Contact",
            "heroTitle": "Van Palestina naar Code",
            "heroDesc": "Hoop vinden via HackYourFuture en mijn ware passie volgen. Na mijn verhuizing naar Nederland gaf HackYourFuture me een tweede kans om mijn tech-dromen na te jagen.",
            "btnContact": "Contact Opnemen",
            "btnJourney": "Mijn Reis",
            "aboutTitle": "Over Mij",
            "aboutP1": "Ik ben Majd Jad Alhaq, een 26-jarige uit Palestina. Ik begon met Informatica voordat ik vanwege omstandigheden overstapte naar Rechten, maar programmeren was altijd mijn echte passie. Na mijn verhuizing naar Nederland gaf HackYourFuture me een tweede kans om mijn tech-dromen na te jagen.",
            "journeyTitle": "Mijn Reis",
            "whyTitle": "Waarom u mij moet aannemen",
            "whyIntro": "Ik heb de rechtenstudie EN een oorlogsgebied overleefd - uw strakke deadlines schrikken mij niet af! Mijn unieke achtergrond geeft me zowel technische vaardigheden als ongeëvenaarde veerkracht. Grappen terzijde, ik breng:",
            "contactTitle": "Contact",
            "journey_title_1": "Begonnen met Informatica",
            "journey_desc_1": "Eerste kennismaking met de grondbeginselen van het programmeren",
            "journey_title_2": "Afgestudeerd in Rechten",
            "journey_desc_2": "Studie afgerond onder uitdagende omstandigheden",
            "journey_title_3": "Oorlogsomstandigheden overleefd",
            "journey_desc_3": "Veerkracht ontwikkeld onder extreme druk",
            "journey_title_4": "HackYourFuture Student",
            "journey_desc_4": "Mijn passie voor programmeren herontdekt",
            "skill_1": "Snelle Leerling",
            "skill_2": "HTML/CSS-professional",
            "skill_3": "JavaScript",
            "skill_4": "Probleemoplosser",
            "skill_5": "Werkt onder druk",
            "skill_6": "Teamspeler"
        }
    },
    "content": {
        "journey": [
            { "date": "2015–2016", "titleKey": "journey_title_1", "descriptionKey": "journey_desc_1" },
            { "date": "2016–2021", "titleKey": "journey_title_2", "descriptionKey": "journey_desc_2" },
            { "date": "2022–2024", "titleKey": "journey_title_3", "descriptionKey": "journey_desc_3" },
            { "date": "2025", "titleKey": "journey_title_4", "descriptionKey": "journey_desc_4" }
        ],
        "skills": [
            { "key": "skill_1" },
            { "key": "skill_2" },
            { "key": "skill_3" },
            { "key": "skill_4" },
            { "key": "skill_5" },
            { "key": "skill_6" }
        ]
    }
};

// DOM elements
let mobileMenuBtn, mainNav, header, navLinks, sections, langToggleBtn, darkModeToggleBtn, announcer, topBtn, timelineItemsContainer, skillBubblesContainer;

// State variables, initialized from localStorage or defaults
let currentLang = localStorage.getItem('portfolioLang') || 'en';
let isDarkMode = localStorage.getItem('portfolioDarkMode') === 'true';
let isMenuOpen = false;

// Helper function for accessibility announcements
function announce(message) {
    if (announcer) {
        announcer.textContent = message;
    }
}

// Function to toggle the mobile navigation menu
function toggleMainNav(open) {
    isMenuOpen = open;
    if (mainNav && mobileMenuBtn) {
        if (isMenuOpen) {
            mainNav.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('no-scroll');
            announce('Menu opened.');
        } else {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
            announce('Menu closed.');
        }
    }
}

// Function to update all translatable content
function updateContent() {
    const translatableElements = document.querySelectorAll('[data-key]');
    translatableElements.forEach(el => {
        const key = el.dataset.key;
        if (allData.translations && allData.translations[currentLang] && allData.translations[currentLang][key]) {
            el.textContent = allData.translations[currentLang][key];
        }
    });

    // Update the timeline and skills dynamically
    if (timelineItemsContainer && allData.content && allData.content.journey) {
        timelineItemsContainer.innerHTML = '';
        allData.content.journey.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item', 'animate-on-scroll');
            
            if (index % 2 === 0) {
                timelineItem.classList.add('slide-in-right');
            } else {
                timelineItem.classList.add('slide-in-left');
            }

            timelineItem.innerHTML = `
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-content">
                    <h3>${allData.translations[currentLang][item.titleKey]}</h3>
                    <p>${allData.translations[currentLang][item.descriptionKey]}</p>
                </div>
            `;
            timelineItemsContainer.appendChild(timelineItem);
        });
    }

    if (skillBubblesContainer && allData.content && allData.content.skills) {
        skillBubblesContainer.innerHTML = '';
        allData.content.skills.forEach((skill, index) => {
            const bubble = document.createElement('span');
            bubble.classList.add('bubble', 'animate-on-scroll', 'pop-in');
            bubble.style.animationDelay = `${index * 0.1}s`;
            bubble.textContent = allData.translations[currentLang][skill.key];
            skillBubblesContainer.appendChild(bubble);
        });
    }

    // Update button text
    if (langToggleBtn) {
        langToggleBtn.textContent = currentLang === 'en' ? 'NL' : 'EN';
        langToggleBtn.setAttribute('aria-pressed', currentLang === 'nl' ? 'true' : 'false');
    }
    
    if (darkModeToggleBtn) {
        darkModeToggleBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        darkModeToggleBtn.setAttribute('aria-pressed', isDarkMode ? 'true' : 'false');
    }

    // Re-initialize IntersectionObserver for new elements
    setupScrollAnimations();
}

// Function to handle language switching
function setupLanguageToggle() {
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'nl' : 'en';
            currentLang = newLang;
            localStorage.setItem('portfolioLang', newLang);
            document.documentElement.lang = newLang;
            updateContent();
            announce(`Language switched to ${newLang === 'en' ? 'English' : 'Dutch'}.`);
        });
    }
}

// Function to handle dark mode toggle
function setupDarkModeToggle() {
    if (darkModeToggleBtn) {
        darkModeToggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            localStorage.setItem('portfolioDarkMode', isDarkMode);
            if (isDarkMode) {
                document.body.classList.add('light-mode');
                darkModeToggleBtn.textContent = 'Light Mode';
                announce('Dark mode enabled.');
            } else {
                document.body.classList.remove('light-mode');
                darkModeToggleBtn.textContent = 'Dark Mode';
                announce('Dark mode disabled.');
            }
            darkModeToggleBtn.setAttribute('aria-pressed', isDarkMode ? 'true' : 'false');
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to handle scroll animations using IntersectionObserver
function setupScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    if (elementsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
}

// Function to handle active navigation links on scroll
function handleScrollActiveLinks() {
    let current = '';
    if (sections) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
    }

    if (navLinks) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Show/hide back to top button
    if (topBtn) {
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    }

    // Shrink header on scroll
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Function for back to top button
function setupBackToTop() {
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Function to initialize DOM elements
function initializeDOMElements() {
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mainNav = document.querySelector('.main-nav');
    header = document.getElementById('header');
    navLinks = document.querySelectorAll('.nav-link');
    sections = document.querySelectorAll('section');
    langToggleBtn = document.getElementById('langToggle');
    darkModeToggleBtn = document.getElementById('darkModeToggle');
    announcer = document.getElementById('announcer');
    topBtn = document.getElementById('topBtn');
    timelineItemsContainer = document.getElementById('timeline-items');
    skillBubblesContainer = document.getElementById('skill-bubbles');
}

// Function to setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMainNav(!isMenuOpen);
        });
    }

    // Navigation link clicks
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMainNav(false);
            });
        });
    }

    // Click outside menu to close
    document.addEventListener('click', (event) => {
        if (mainNav && mobileMenuBtn) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnMenuButton = mobileMenuBtn.contains(event.target);
            if (isMenuOpen && !isClickInsideNav && !isClickOnMenuButton) {
                toggleMainNav(false);
            }
        }
    });

    // Window scroll events
    window.addEventListener('scroll', handleScrollActiveLinks);

    // Window resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMainNav(false);
        }
    });
}

// === GENERAL INITIALIZATION & UTILITY ===
function initializeState() {
    // Initialize DOM elements
    initializeDOMElements();
    
    // Apply light mode if enabled from local storage
    if (isDarkMode) {
        document.body.classList.add('light-mode');
    }

    // Setup event listeners
    setupEventListeners();
    setupLanguageToggle();
    setupDarkModeToggle();
    setupSmoothScrolling();
    setupBackToTop();

    // Initial content update
    updateContent();

    // Re-check scroll position on load to set active links and header state
    handleScrollActiveLinks();
}

// Initialize the application on page load
document.addEventListener('DOMContentLoaded', initializeState);