const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const fadeInElements = document.querySelectorAll('.hero-text, .about-grid, .project-card, .contact-form');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    scrollObserver.observe(element);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            progressBar.style.width = progressBar.getAttribute('data-progress') + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillBars.forEach(bar => skillObserver.observe(bar));

function createParticles() {
    const home = document.getElementById('home');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    home.insertBefore(particlesContainer, home.firstChild);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

const menuToggle = document.querySelector('.nav-content');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    
    submitButton.classList.add('loading');

    setTimeout(() => {
        submitButton.classList.remove('loading');
        submitButton.classList.add('success');

        setTimeout(() => {
            this.reset();
            submitButton.classList.remove('success');
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
        }, 2000);
    }, 1500);
});

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll === 0) {
        navbar.classList.remove('scrolled');
    } else {
        navbar.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
});