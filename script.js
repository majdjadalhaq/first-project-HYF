const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const langToggleBtn = document.getElementById('langToggle');
const darkModeToggleBtn = document.getElementById('darkModeToggle');
const translatableElements = document.querySelectorAll('[data-key]');
const topBtn = document.getElementById('topBtn');

const translations = {
en: {
navAbout: "About",
navJourney: "Journey",
navWhy: "Why Me?",
navContact: "Contact",
heroTitle: "From Palestine to Code",
heroDesc: "Finding hope through HackYourFuture and following my true passion. After moving to the Netherlands, HackYourFuture gave me a second chance to follow my tech dreams.",
btnContact: "Get in Touch",
btnJourney: "My Journey",
aboutTitle: "About Me",
aboutP1: "I'm Majd Jad Alhaq, a 26-year-old from Palestine. I started with Computer Science before switching to Law due to circumstances, but coding was always my true passion. After moving to the Netherlands, HackYourFuture gave me a second chance to follow my tech dreams.",
journeyTitle: "My Journey",
journey1: "Started Computer Science",
journey2: "Graduated from Law College",
journey3: "Survived war conditions",
journey4: "HackYourFuture Student",
contactTitle: "Contact"
},
nl: {
navAbout: "Over Mij",
navJourney: "Reis",
navWhy: "Waarom Ik?",
navContact: "Contact",
heroTitle: "Van Palestina naar Code",
heroDesc: "Hoop vinden via HackYourFuture en mijn ware passie volgen. Na mijn verhuizing naar Nederland gaf HackYourFuture me een tweede kans om mijn tech-dromen na te jagen.",
btnContact: "Contact Opnemen",
btnJourney: "Mijn Reis",
aboutTitle: "Over Mij",
aboutP1: "Ik ben Majd Jad Alhaq, een 26-jarige uit Palestina. Ik begon met Informatica voordat ik vanwege omstandigheden overstapte naar Rechten, maar programmeren was altijd mijn echte passie. Na mijn verhuizing naar Nederland gaf HackYourFuture me een tweede kans om mijn tech-dromen na te jagen.",
journeyTitle: "Mijn Reis",
journey1: "Begonnen met Informatica",
journey2: "Afgestudeerd in Rechten",
journey3: "Oorlogsomstandigheden overleefd",
journey4: "HackYourFuture Student",
contactTitle: "Contact"
}
};

let currentLang = 'en';
let isMenuOpen = false;
let isDarkMode = false;

function toggleMainNav(open) {
isMenuOpen = open;
if (isMenuOpen) {
mainNav.classList.add('active');
mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
document.body.classList.add('no-scroll');
} else {
mainNav.classList.remove('active');
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.body.classList.remove('no-scroll');
}
}

mobileMenuBtn.addEventListener('click', (event) => {
event.stopPropagation(); // Prevent this click from immediately closing the menu via the document listener
toggleMainNav(!isMenuOpen);
});

navLinks.forEach(link => {
link.addEventListener('click', () => {
toggleMainNav(false);
});
});

// New: Close menu when clicking outside
document.addEventListener('click', (event) => {
// Check if the click was outside the main navigation and outside the mobile menu button
const isClickInsideNav = mainNav.contains(event.target);
const isClickOnMenuButton = mobileMenuBtn.contains(event.target);

if (isMenuOpen && !isClickInsideNav && !isClickOnMenuButton) {
toggleMainNav(false);
}
});


function updateLanguage(lang) {
currentLang = lang;
document.documentElement.lang = lang;

translatableElements.forEach(el => {
const key = el.dataset.key;
if (translations[lang] && translations[lang][key]) {
el.textContent = translations[lang][key];
}
});
}

langToggleBtn.addEventListener('click', () => {
const newLang = currentLang === 'en' ? 'nl' : 'en';
langToggleBtn.textContent = newLang === 'en' ? 'NL' : 'EN';
updateLanguage(newLang);
});

darkModeToggleBtn.addEventListener('click', () => {
isDarkMode = !isDarkMode;
if (isDarkMode) {
document.body.classList.add('dark-mode');
darkModeToggleBtn.textContent = 'Light Mode';
} else {
document.body.classList.remove('dark-mode');
darkModeToggleBtn.textContent = 'Dark Mode';
}
});

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

window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}

let current = '';
sections.forEach(section => {
const sectionTop = section.offsetTop - 150;
if (window.scrollY >= sectionTop) {
current = section.getAttribute('id');
}
});

navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === `#${current}`) {
link.classList.add('active');
}
});

if (window.scrollY > 300) {
topBtn.classList.add('show');
} else {
topBtn.classList.remove('show');
}
});

topBtn.addEventListener('click', () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});

function adjustTimeline() {
const timeline = document.querySelector('.timeline');
const timelineItems = document.querySelectorAll('.timeline-item');

if (window.innerWidth <= 768) {
timeline.style.paddingLeft = '30px';
document.querySelector('.timeline-line').style.left = '30px';

timelineItems.forEach(item => {
item.style.width = '100%';
item.style.paddingRight = '0';
item.style.paddingLeft = '30px';
item.style.textAlign = 'left';
item.style.marginLeft = '0';

let afterPseudoElementStyle = item.querySelector('.timeline-item-after-style');
if (!afterPseudoElementStyle) {
afterPseudoElementStyle = document.createElement('style');
afterPseudoElementStyle.classList.add('timeline-item-after-style');
item.appendChild(afterPseudoElementStyle);
}
afterPseudoElementStyle.innerHTML = `
.timeline-item:nth-child(odd)::after,
.timeline-item:nth-child(even)::after {
left: -10px !important;
right: auto !important;
}
`;
});

} else {
timeline.style.paddingLeft = '0';
document.querySelector('.timeline-line').style.left = '50%';

timelineItems.forEach((item, index) => {
const oldStyle = item.querySelector('.timeline-item-after-style');
if (oldStyle) {
oldStyle.remove();
}

if (index % 2 === 0) {
item.style.width = '50%';
item.style.paddingRight = '40px';
item.style.paddingLeft = '0';
item.style.textAlign = 'right';
item.style.marginLeft = '0';
} else {
item.style.width = '50%';
item.style.paddingLeft = '40px';
item.style.paddingRight = '0';
item.style.textAlign = 'left';
item.style.marginLeft = '50%';
}
});
}
}

updateLanguage(currentLang);
adjustTimeline();

window.addEventListener('resize', () => {
adjustTimeline();

if (window.innerWidth > 768 && isMenuOpen) {
toggleMainNav(false);
}
});
