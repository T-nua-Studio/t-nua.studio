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

// HubSpot contact form. The form itself owns validation and submission;
// this code only loads the official embed once and manages the modal.
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('[data-contact-modal]');
    const openButton = document.querySelector('[data-open-contact-form]');
    const target = document.querySelector('#hubspot-contact-form');
    if (!modal || !openButton || !target) return;

    const HUBSPOT_FORM_ID = '10e6f99d-19ac-4544-900b-5d2edc31ce70';
    const HUBSPOT_SCRIPT_SRC = 'https://js-eu1.hsforms.net/forms/embed/146755814.js';
    let hubspotScriptPromise;
    let formInitialised = false;
    let previousFocus = null;

    function isConfigured() {
        return Boolean(HUBSPOT_FORM_ID);
    }

    function setFormMessage(message, className) {
        target.innerHTML = '';
        const messageElement = document.createElement('p');
        messageElement.className = className || 'hubspot-form-message';
        messageElement.textContent = message;
        target.appendChild(messageElement);
    }

    function loadHubSpotScript() {
        if (hubspotScriptPromise) return hubspotScriptPromise;

        hubspotScriptPromise = new Promise((resolve, reject) => {
            let settled = false;
            const finish = (callback, value) => {
                if (settled) return;
                settled = true;
                clearTimeout(timeoutId);
                callback(value);
            };
            const timeoutId = setTimeout(() => finish(reject, new Error('HubSpot Forms script timed out')), 15000);
            const existingScript = document.querySelector(`script[src="${HUBSPOT_SCRIPT_SRC}"]`);
            if (existingScript) {
                if (existingScript.dataset.loaded === 'true') {
                    finish(resolve, true);
                } else {
                    existingScript.addEventListener('load', () => {
                        existingScript.dataset.loaded = 'true';
                        finish(resolve, true);
                    }, { once: true });
                    existingScript.addEventListener('error', () => {
                        existingScript.remove();
                        finish(reject, new Error('HubSpot Forms script failed to load'));
                    }, { once: true });
                }
                return;
            }

            const script = document.createElement('script');
            script.charset = 'utf-8';
            script.type = 'text/javascript';
            script.src = HUBSPOT_SCRIPT_SRC;
            script.onload = () => {
                script.dataset.loaded = 'true';
                finish(resolve, true);
            };
            script.onerror = () => {
                script.remove();
                finish(reject, new Error('HubSpot Forms script failed to load'));
            };
            document.head.appendChild(script);
        });
        return hubspotScriptPromise;
    }

    function initialiseForm() {
        if (formInitialised) return;
        formInitialised = true;

        if (!isConfigured()) {
            setFormMessage('The contact form is not configured yet. Please add the HubSpot Form ID before publishing.', 'hubspot-form-error');
            return;
        }

        target.innerHTML = '<div class="hs-form-frame" data-region="eu1" data-form-id="' + HUBSPOT_FORM_ID + '" data-portal-id="146755814"></div>';
        loadHubSpotScript()
            .then(() => {
                const frame = target.querySelector('.hs-form-frame');
                if (frame) frame.setAttribute('aria-label', 'HubSpot contact form');
            })
            .catch(() => {
                formInitialised = false;
                hubspotScriptPromise = null;
                document.querySelector(`script[src="${HUBSPOT_SCRIPT_SRC}"]`)?.remove();
                setFormMessage('We could not load the contact form. Please try again or email inf@t-nua.studio.', 'hubspot-form-error');
            });
    }

    function getFocusableElements() {
        return modal.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
    }

    function openModal() {
        previousFocus = document.activeElement;
        modal.hidden = false;
        document.body.classList.add('contact-modal-open');
        openButton.setAttribute('aria-expanded', 'true');
        initialiseForm();
        modal.querySelector('.contact-modal-close').focus();
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('contact-modal-open');
        openButton.setAttribute('aria-expanded', 'false');
        if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    }

    openButton.setAttribute('aria-expanded', 'false');
    openButton.addEventListener('click', openModal);
    modal.querySelectorAll('[data-contact-close]').forEach((element) => element.addEventListener('click', closeModal));
    modal.querySelector('.contact-modal-dialog').addEventListener('click', (event) => event.stopPropagation());
    modal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }
        if (event.key !== 'Tab') return;
        const focusable = [...getFocusableElements()];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
});

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
