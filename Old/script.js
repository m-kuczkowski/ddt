// Toggle mobile menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, index * 100);
        }
    });
}, observerOptions);

// Apply observer to animated elements
document.querySelectorAll('.step, .pricing-card, .testimonial-card, .format-card').forEach(card => {
    observer.observe(card);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Form submission (contact form)
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Dziękujemy za zapytanie! Skontaktujemy się z Tobą wkrótce.');
        contactForm.reset();
    });
}

// CTA button click
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.querySelector('#pricing').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Secondary CTA button (certificate)
const ctaSecondary = document.querySelector('.cta-button-secondary');

if (ctaSecondary) {
    ctaSecondary.addEventListener('click', () => {
        document.querySelector('#gift-certificate').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Gift certificate button
const giftButton = document.querySelector('.gift-certificate .btn');

if (giftButton) {
    giftButton.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Modal functionality
const modal = document.getElementById('inquiryModal');
const modalClose = document.querySelector('.modal-close');
const inquiryButtons = document.querySelectorAll('.btn-inquiry');
const inquiryForm = document.getElementById('inquiryForm');

let selectedPackage = {
    name: '',
    price: ''
};

// Open modal when clicking "Zapytaj"
inquiryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const packageName = card.querySelector('h3').textContent;
        const packagePrice = card.querySelector('.price').textContent;

        selectedPackage = {
            name: packageName,
            price: packagePrice
        };

        // Update modal content
        document.querySelector('.package-name').textContent = packageName;
        document.querySelector('.package-price').textContent = packagePrice;
        // document.getElementById('modalTotalPrice').textContent = packagePrice;
        // document.getElementById('modalTotalPriceBottom').textContent = packagePrice;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    inquiryForm.reset();
}

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Remove package button (optional - just closes modal in this case)
document.querySelector('.package-remove').addEventListener('click', closeModal);

// Handle form submission with EmailJS
inquiryForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        package: selectedPackage.name,
        price: selectedPackage.price,
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value
    };

    console.log('Wysyłanie zapytania o ofertę:', formData);

    // Przygotowanie danych dla EmailJS
    const templateParams = {
        package_name: formData.package,
        package_price: formData.price,
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        timestamp: new Date().toLocaleString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Wyświetl komunikat ładowania
    const submitButton = this.querySelector('.btn-proceed');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Wysyłanie...';
    submitButton.disabled = true;

    // Wysyłanie przez EmailJS
    try {
        await emailjs.send('service_n52i4kq', 'template_l8m54dj', templateParams);
        alert('Dziękujemy! Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą wkrótce.');
        closeModal();
    } catch (error) {
        alert('Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.');
        console.error('EmailJS Error:', error);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Active navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();

// Ripple effect on buttons
document.querySelectorAll('.btn, .cta-button, .cta-button-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to document
const style = document.createElement('style');
style.innerHTML = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contact methods click handlers
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('click', function(e) {
        e.preventDefault();
        const methodText = this.querySelector('.method-text').textContent;
        const href = this.getAttribute('href');

        if (confirm(`Czy chcesz otworzyć: ${methodText}?`)) {
            window.open(href, '_blank');
        }
    });
});

// Stagger animation for multiple elements
function addStaggerDelay(selector, baseDelay = 0.1) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * baseDelay}s`;
    });
}

// Apply stagger animations
addStaggerDelay('.step');
addStaggerDelay('.pricing-card');
addStaggerDelay('.testimonial-card');
addStaggerDelay('.format-card');

console.log('✅ Strona Dawno dawno temu załadowana pomyślnie!');
console.log('📧 EmailJS skonfigurowany: service_n52i4kq / template_l8m54dj');