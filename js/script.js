// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
            hamburger.focus();
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
    }
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// Intersection Observer for animations
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

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .project-card, .gallery-item, .client-logo');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling. Until a processor agreement is in place, submission
// stays under the visitor's control and opens their configured email client.
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = this.querySelector('#contact-name');
        const emailInput = this.querySelector('#contact-email');
        const projectInput = this.querySelector('#contact-project');
        const messageInput = this.querySelector('#contact-message');
        const status = this.querySelector('.form-status');
        const fields = [nameInput, emailInput, messageInput];

        fields.forEach((field) => {
            field.removeAttribute('aria-invalid');
            const error = document.getElementById(`${field.id}-error`);
            if (error) error.textContent = '';
        });

        let firstInvalid = null;
        fields.forEach((field) => {
            if (!field.validity.valid) {
                field.setAttribute('aria-invalid', 'true');
                const error = document.getElementById(`${field.id}-error`);
                if (error) {
                    error.textContent = field.validity.typeMismatch
                        ? 'Enter a valid email address.'
                        : 'This field is required.';
                }
                firstInvalid = firstInvalid || field;
            }
        });

        if (firstInvalid) {
            status.textContent = 'Please correct the highlighted fields.';
            firstInvalid.focus();
            return;
        }

        const subject = projectInput.value.trim()
            ? `Project enquiry: ${projectInput.value.trim()}`
            : 'Project enquiry from T-NUA website';
        const body = [
            `Name: ${nameInput.value.trim()}`,
            `Email: ${emailInput.value.trim()}`,
            projectInput.value.trim() ? `Project type: ${projectInput.value.trim()}` : '',
            '',
            messageInput.value.trim()
        ].filter((line, index) => line || index >= 3).join('\n');

        status.textContent = 'Your email application should open with a prepared message. Review it and press Send there.';
        window.location.href = `mailto:inf@t-nua.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Parallax effect for hero elements
window.addEventListener('scroll', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-cube, .floating-sphere, .floating-pyramid');
    
    if (parallaxElements.length > 0) {
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation for hero title only if it contains the default demo text
// This prevents overwriting the actual page name like 'Cockaigne'
document.addEventListener('DOMContentLoaded', () => {
    const titleLines = document.querySelectorAll('.title-line');
    // Only run typing animation if the text is the demo placeholder
    const demoTexts = ['WORD', 'OF', 'FUTURE'];
    titleLines.forEach((line, index) => {
        if (demoTexts.includes(line.textContent.trim())) {
            setTimeout(() => {
                typeWriter(line, demoTexts[index], 150);
            }, index * 500);
        }
    });
});

// Video play button functionality
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        // This would integrate with your actual video player
        alert('Video player would open here');
    });
}

// Client logo hover effects
const clientLogos = document.querySelectorAll('.client-logo');
clientLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card interactions
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('fade-out');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Scroll progress indicator
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// ========= HERO VIDEO HOVER PLAY/PAUSE LOGIC =========
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    const heroVideo = document.getElementById('hero-video');
    
    if (heroSection && heroVideo) {
        // Desktop: Hover play/pause functionality
        let isDesktop = window.matchMedia('(hover: hover)').matches;
        
        if (isDesktop) {
            // Initially pause the video on desktop (showing poster frame)
            heroVideo.pause();
            heroVideo.currentTime = 0;
            
            // Play on hover
            heroSection.addEventListener('mouseenter', function() {
                heroVideo.play().catch(err => {
                    console.log('Video autoplay prevented:', err);
                });
                heroVideo.classList.add('playing');
            });
            
            // Pause on mouse leave (keep current frame)
            heroSection.addEventListener('mouseleave', function() {
                heroVideo.pause();
                heroVideo.classList.remove('playing');
            });
        } else {
            // Mobile: Auto-play with loop (already set in HTML)
            heroVideo.play().catch(err => {
                console.log('Mobile video autoplay prevented:', err);
            });
        }
        
        // Ensure video is muted (safety check)
        heroVideo.muted = true;
    }

    // ========= PROJECT FILTER FUNCTIONALITY =========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedFilter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const tags = card.getAttribute('data-tags') || '';
                    
                    if (selectedFilter === 'all' || tags.includes(selectedFilter)) {
                        card.removeAttribute('data-hidden');
                        card.style.animation = 'fadeIn 0.4s ease';
                    } else {
                        card.setAttribute('data-hidden', 'true');
                    }
                });
            });
        });
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Your scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);
