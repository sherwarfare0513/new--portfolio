// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add ripple animation
        hamburger.classList.remove('ripple');
        void hamburger.offsetWidth; // Trigger reflow
        hamburger.classList.add('ripple');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// CTA Button Hover + Click Effects
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.classList.add('hovering');
    });
    
    button.addEventListener('mouseleave', function() {
        if (!this.classList.contains('clicked')) {
            this.classList.remove('hovering');
        }
    });

    button.addEventListener('click', function() {
        this.classList.add('clicked');
        this.classList.add('hovering');
        // Keep highlight for 2s after click
        clearTimeout(this._hoverResetTimeout);
        this._hoverResetTimeout = setTimeout(() => {
            this.classList.remove('clicked');
            this.classList.remove('hovering');
        }, 2000);
    });
});

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

// Responsive staged motion system
const motionMediaQuery = window.matchMedia('(max-width: 768px)');
const motionProfiles = {
    mobile: {
        bodyClass: 'motion-mobile',
        heroStartDelay: 120,
        heroStep: 90,
        stagger: 70,
        threshold: 0.08,
        rootMargin: '0px 0px -10% 0px'
    },
    desktop: {
        bodyClass: 'motion-desktop',
        heroStartDelay: 180,
        heroStep: 140,
        stagger: 110,
        threshold: 0.16,
        rootMargin: '0px 0px -16% 0px'
    }
};

function getMotionProfile() {
    return motionMediaQuery.matches ? motionProfiles.mobile : motionProfiles.desktop;
}

function syncMotionViewportClass() {
    document.body.classList.add('js-motion');
    document.body.classList.toggle('motion-mobile', motionMediaQuery.matches);
    document.body.classList.toggle('motion-desktop', !motionMediaQuery.matches);
}

function assignReveal(element, delay, type = 'scroll', origin = 'bottom') {
    if (!element) return;
    element.dataset.reveal = type;
    if (origin !== 'bottom') {
        element.dataset.revealOrigin = origin;
    }
    element.style.setProperty('--reveal-delay', `${delay}ms`);
}

function resolveRevealOrigin(origin, index) {
    if (Array.isArray(origin)) {
        return origin[index % origin.length] || 'bottom';
    }

    if (typeof origin === 'function') {
        return origin(index);
    }

    return origin || 'bottom';
}

function registerRevealSection(sectionSelector, groups) {
    const section = document.querySelector(sectionSelector);
    if (!section) return [];

    section.dataset.revealSection = 'true';
    const revealElements = [];

    groups.forEach(group => {
        const step = group.step ?? getMotionProfile().stagger;
        section.querySelectorAll(group.selector).forEach((element, index) => {
            assignReveal(
                element,
                (group.startDelay || 0) + (index * step),
                'scroll',
                resolveRevealOrigin(group.origin, index)
            );
            revealElements.push(element);
        });
    });

    return revealElements;
}

function setupResponsiveMotion() {
    syncMotionViewportClass();

    const profile = getMotionProfile();
    const revealElements = new Set();

    assignReveal(document.querySelector('.navbar'), 0, 'load', 'top');

    [
        { selector: '.hero-content .greeting', delay: profile.heroStartDelay, origin: 'left' },
        { selector: '.hero-content .hero-title', delay: profile.heroStartDelay + profile.heroStep, origin: 'bottom' },
        { selector: '.hero-content .hero-role', delay: profile.heroStartDelay + (profile.heroStep * 2), origin: 'right' },
        { selector: '.hero-content .hero-subtitle', delay: profile.heroStartDelay + (profile.heroStep * 3), origin: 'bottom' },
        { selector: '.hero-highlights > div', delay: profile.heroStartDelay + (profile.heroStep * 4), step: profile.stagger, origin: ['left', 'bottom', 'right'] },
        { selector: '.cta-buttons .cta-button', delay: profile.heroStartDelay + (profile.heroStep * 5), step: profile.stagger, origin: ['bottom-left', 'bottom-right'] },
        { selector: '.hero-image', delay: profile.heroStartDelay + (profile.heroStep * 5), origin: 'right' }
    ].forEach(group => {
        document.querySelectorAll(group.selector).forEach((element, index) => {
            assignReveal(
                element,
                group.delay + (index * (group.step || 0)),
                'load',
                resolveRevealOrigin(group.origin, index)
            );
        });
    });

    [
        ...registerRevealSection('#services', [
            { selector: '.section-title', startDelay: 0, origin: 'top' },
            { selector: '.section-subtitle', startDelay: 110, origin: 'bottom' },
            { selector: '.service-card', startDelay: 210, step: 140, origin: ['left', 'bottom', 'right'] },
            { selector: '.service-card .service-icon', startDelay: 290, step: 110, origin: 'top' },
            { selector: '.service-card h3', startDelay: 360, step: 110, origin: ['left', 'right'] },
            { selector: '.service-card p', startDelay: 430, step: 110, origin: ['right', 'left'] },
            { selector: '.service-card .service-list li', startDelay: 510, step: 55, origin: ['left', 'bottom', 'right', 'bottom-left'] }
        ]),
        ...registerRevealSection('#skills', [
            { selector: '.section-title', startDelay: 0, origin: 'top' },
            { selector: '.skills-banner-title', startDelay: 90, origin: 'left' },
            { selector: '#skills-banner', startDelay: 160, origin: 'left' },
            { selector: '.skills-banner-text', startDelay: 240, origin: 'right' },
            { selector: '.skill-group', startDelay: 280, step: 140, origin: ['left', 'right', 'bottom-left', 'bottom-right'] },
            { selector: '.skill-group h3', startDelay: 360, step: 120, origin: ['left', 'right'] },
            { selector: '.skill-item', startDelay: 430, step: 60, origin: ['left', 'bottom', 'right', 'bottom-right'] }
        ]),
        ...registerRevealSection('#projects', [
            { selector: '.section-title', startDelay: 0, origin: 'top' },
            { selector: '.section-subtitle', startDelay: 110, origin: 'bottom' },
            { selector: '.project-card', startDelay: 220, step: 150, origin: ['bottom-left', 'bottom', 'bottom-right'] },
            { selector: '.project-image', startDelay: 280, step: 140, origin: ['left', 'right'] },
            { selector: '.project-content h3', startDelay: 360, step: 120, origin: ['left', 'right'] },
            { selector: '.project-content p', startDelay: 430, step: 120, origin: ['right', 'left'] },
            { selector: '.project-tags span', startDelay: 500, step: 50, origin: ['bottom', 'bottom-left', 'bottom-right'] }
        ]),
        ...registerRevealSection('#about', [
            { selector: '.section-title', startDelay: 0, origin: 'top' },
            { selector: '.about-image', startDelay: 120, origin: 'left' },
            { selector: '.about-text > h3', startDelay: 200, origin: 'right' },
            { selector: '.about-text > p', startDelay: 280, step: 100, origin: ['bottom', 'bottom-right', 'bottom-left'] },
            { selector: '.highlight-card', startDelay: 380, step: 110, origin: ['left', 'bottom', 'right'] },
            { selector: '.stat', startDelay: 470, step: 100, origin: ['bottom-left', 'bottom', 'bottom-right'] }
        ]),
        ...registerRevealSection('#contact', [
            { selector: '.section-title', startDelay: 0, origin: 'top' },
            { selector: '.section-subtitle', startDelay: 100, origin: 'bottom' },
            { selector: '.contact-visual img', startDelay: 180, origin: 'left' },
            { selector: '.contact-visual p', startDelay: 250, origin: 'bottom-left' },
            { selector: '.info-item', startDelay: 260, step: 120, origin: ['left', 'right', 'bottom-left'] },
            { selector: '.social-info', startDelay: 380, origin: 'bottom' },
            { selector: '.contact-form input', startDelay: 340, step: 70, origin: ['right', 'left', 'right'] },
            { selector: '.contact-form textarea', startDelay: 560, origin: 'bottom-right' },
            { selector: '.contact-form .submit-btn', startDelay: 640, origin: 'bottom' }
        ]),
        ...registerRevealSection('.footer', [
            { selector: '.footer-section', startDelay: 0, step: 120, origin: ['left', 'bottom-left', 'bottom-right', 'right'] },
            { selector: '.footer-bottom', startDelay: 260, origin: 'bottom' }
        ])
    ].forEach(element => {
        if (element) {
            revealElements.add(element);
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: profile.threshold,
        rootMargin: profile.rootMargin
    });

    revealElements.forEach(element => revealObserver.observe(element));
}

function runEntranceSequence() {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.querySelectorAll('[data-reveal="load"]').forEach(element => {
                element.classList.add('is-visible');
            });
        });
    });
}

setupResponsiveMotion();

if (typeof motionMediaQuery.addEventListener === 'function') {
    motionMediaQuery.addEventListener('change', syncMotionViewportClass);
} else if (typeof motionMediaQuery.addListener === 'function') {
    motionMediaQuery.addListener(syncMotionViewportClass);
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-input');
if (newsletterForm) {
    const newsletterBtn = newsletterForm.querySelector('button');
    const newsletterInput = newsletterForm.querySelector('input');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = newsletterInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        const originalText = newsletterBtn.textContent;
        newsletterBtn.textContent = '✓ Subscribed!';
        newsletterBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        newsletterInput.disabled = true;
        newsletterBtn.disabled = true;
        
        setTimeout(() => {
            newsletterBtn.textContent = originalText;
            newsletterBtn.style.background = '';
            newsletterInput.disabled = false;
            newsletterBtn.disabled = false;
            newsletterInput.value = '';
            alert('Thank you for subscribing! You\'ll receive updates about my latest projects.');
        }, 3000);
    });
}

// Navbar active link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

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

// Scroll to top button
window.addEventListener('scroll', () => {
    const scrollButton = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
        if (!scrollButton) {
            const btn = document.createElement('button');
            btn.innerHTML = '↑';
            btn.className = 'scroll-top';
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.5rem;
                z-index: 99;
                opacity: 0.8;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            `;
            btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            btn.onmouseenter = function() {
                this.style.opacity = '1';
                this.style.transform = 'translateY(-5px)';
            };
            btn.onmouseleave = function() {
                this.style.opacity = '0.8';
                this.style.transform = 'translateY(0)';
            };
            document.body.appendChild(btn);
        }
    }
});

// Progress bar animation on scroll
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.progress');
            const width = progress.style.width;
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
            progressObserver.unobserve(entry.target);
        }
    });
});

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Skills banner fallback logic
(function() {
    const skillsBanner = document.getElementById('skills-banner');
    const skillsFallback = document.querySelector('.skills-banner-fallback');
    const backupImage = 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1500&q=80';

    if (!skillsBanner || !skillsFallback) return;

    skillsBanner.onload = () => {
        skillsFallback.style.display = 'none';
        skillsFallback.textContent = '📊 Skills illustration is ready.';
        skillsFallback.style.color = '#0f3f77';
    };

    skillsBanner.onerror = () => {
        if (skillsBanner.dataset.attempt !== 'backup') {
            skillsBanner.dataset.attempt = 'backup';
            skillsBanner.src = backupImage;
            skillsFallback.textContent = '📊 Loading alternate visual...';
            skillsFallback.style.display = 'block';
        } else {
            skillsFallback.textContent = '📊 Visual skills summary unavailable. Please check your network and reload.';
            skillsFallback.style.display = 'block';
            skillsBanner.style.display = 'none';
        }
    };
})();

// Hire Me modal logic
const hireModal = document.getElementById('hire-modal');
const hireModalClose = document.getElementById('hire-modal-close');
const hireBtn = document.getElementById('hire-me-btn');
const workModal = document.getElementById('work-modal');
const workModalClose = document.getElementById('work-modal-close');
const viewWorkBtn = document.getElementById('view-work');
const phoneChoiceModal = document.getElementById('phone-choice-modal');
const phoneChoiceClose = document.getElementById('phone-choice-close');
const phoneChoiceText = document.getElementById('phone-choice-text');
const phoneWhatsappLink = document.getElementById('phone-whatsapp-link');
const phoneCallLink = document.getElementById('phone-call-link');
const phoneTriggers = document.querySelectorAll('.contact-number-trigger');
let activePhoneNumber = '';
let activePhoneDisplay = '';
const hireForm = document.getElementById('hire-form');
const hireMethodInputs = document.querySelectorAll('input[name="hire-method"]');
const hireMethodHint = document.getElementById('hire-method-hint');
const hireEmailAddress = 'sherwarfare0513@gmail.com';
const hireWhatsappNumber = '923280513242';
const hireEmailEndpoint = 'https://formsubmit.co/ajax/sherwarfare0513@gmail.com';

function getSelectedHireMethod() {
    const selectedMethod = document.querySelector('input[name="hire-method"]:checked');
    return selectedMethod ? selectedMethod.value : 'email';
}

function updateHireMethodHint() {
    if (!hireMethodHint) return;

    const selectedMethod = getSelectedHireMethod();
    hireMethodHint.textContent = selectedMethod === 'whatsapp'
        ? 'Your request will open in WhatsApp chat with a ready-made message.'
        : 'Your request will be sent directly to email from the website.';
}

async function sendHireEmailRequest({ name, email, subject, message }) {
    const response = await fetch(hireEmailEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            subject: 'Hire Request: ' + subject,
            message,
            _subject: 'Hire Request: ' + subject,
            _template: 'table',
            _captcha: 'false'
        })
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(result.message || 'Unable to send email request right now.');
    }

    return result;
}

function openHireModal() {
    if (hireModal) {
        hireModal.classList.add('show');
        hireModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        hireModal.scrollTop = 0;
        hireModal.querySelector('.modal-content')?.scrollTo(0, 0);
        document.getElementById('hire-name')?.focus();
    }
}

function closeHireModal() {
    if (hireModal) {
        hireModal.classList.remove('show');
        hireModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function openWorkModal() {
    if (workModal) {
        workModal.classList.add('show');
        workModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        workModal.querySelector('.work-link-item')?.focus();
    }
}

function closeWorkModal() {
    if (workModal) {
        workModal.classList.remove('show');
        workModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function openPhoneChoiceModal(phoneNumber, phoneDisplay) {
    if (!phoneChoiceModal || !phoneWhatsappLink || !phoneCallLink) {
        return;
    }

    const whatsappUrl = 'https://web.whatsapp.com/send?phone=' + phoneNumber + '&text=' + encodeURIComponent('Hello, I would like to contact you.');
    activePhoneNumber = phoneNumber;
    activePhoneDisplay = phoneDisplay;

    phoneWhatsappLink.href = whatsappUrl;

    if (phoneChoiceText) {
        phoneChoiceText.textContent = 'Choose WhatsApp or phone call for ' + phoneDisplay + '.';
    }

    phoneChoiceModal.classList.add('show');
    phoneChoiceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    phoneWhatsappLink.focus();
}

function closePhoneChoiceModal() {
    if (phoneChoiceModal) {
        phoneChoiceModal.classList.remove('show');
        phoneChoiceModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

async function handlePhoneCallChoice() {
    if (!activePhoneNumber) {
        return;
    }

    const callUrl = 'tel:+' + activePhoneNumber;
    const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

    if (isMobileDevice) {
        window.location.href = callUrl;
        return;
    }

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText('+' + activePhoneNumber);
            alert('Phone calls cannot be opened directly in the browser. The number has been copied: ' + activePhoneDisplay);
        } else {
            alert('Phone calls cannot be opened directly in the browser. Here is the number: ' + activePhoneDisplay);
        }
    } catch (error) {
        alert('Phone calls cannot be opened directly in the browser. Here is the number: ' + activePhoneDisplay);
    }
}

if (hireBtn) {
    hireBtn.addEventListener('click', openHireModal);
}

if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', openWorkModal);
}

if (hireModalClose) {
    hireModalClose.addEventListener('click', closeHireModal);
}

if (workModalClose) {
    workModalClose.addEventListener('click', closeWorkModal);
}

if (phoneChoiceClose) {
    phoneChoiceClose.addEventListener('click', closePhoneChoiceModal);
}

if (phoneCallLink) {
    phoneCallLink.addEventListener('click', function () {
        handlePhoneCallChoice();
    });
}

phoneTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
        const phoneNumber = this.dataset.phoneNumber;
        const phoneDisplay = this.dataset.phoneDisplay || this.textContent.trim();

        if (!phoneNumber) {
            return;
        }

        openPhoneChoiceModal(phoneNumber, phoneDisplay);
    });
});

hireMethodInputs.forEach(input => {
    input.addEventListener('change', updateHireMethodHint);
});

updateHireMethodHint();

if (hireForm) {
    hireForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('hire-name').value.trim();
        const email = document.getElementById('hire-email').value.trim();
        const subject = document.getElementById('hire-subject').value.trim();
        const message = document.getElementById('hire-message').value.trim();
        const selectedMethod = getSelectedHireMethod();
        const submitButton = hireForm.querySelector('.submit-btn');
        const originalButtonText = submitButton ? submitButton.textContent : '';

        if (!name || !email || !subject || !message) {
            alert('Please complete all fields before sending your request.');
            return;
        }

        const requestMessage = [
            'New hire request',
            '',
            'Name: ' + name,
            'Email: ' + email,
            'Project Title: ' + subject,
            'Project Details: ' + message
        ].join('\n');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = selectedMethod === 'whatsapp' ? 'Opening WhatsApp...' : 'Sending...';
        }

        try {
            if (selectedMethod === 'whatsapp') {
                const whatsappUrl = 'https://wa.me/' + hireWhatsappNumber + '?text=' + encodeURIComponent(requestMessage);
                window.open(whatsappUrl, '_blank', 'noopener');
                alert('WhatsApp is opening. Please send your hire request there.');
            } else {
                await sendHireEmailRequest({ name, email, subject, message: requestMessage });
                alert('Your hire request has been sent directly by email.');
            }

            hireForm.reset();
            const defaultMethod = document.querySelector('input[name="hire-method"][value="email"]');
            if (defaultMethod) {
                defaultMethod.checked = true;
            }
            updateHireMethodHint();
            closeHireModal();

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } catch (error) {
            if (selectedMethod === 'email') {
                const mailtoUrl = 'mailto:' + hireEmailAddress
                    + '?subject=' + encodeURIComponent('Hire Request: ' + subject)
                    + '&body=' + encodeURIComponent(requestMessage);
                window.location.href = mailtoUrl;
                alert('Direct email sending is unavailable right now, so your email app has been opened instead.');
            } else {
                alert('The request could not be processed. Please try again.');
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}

[hireModal, workModal].forEach(modal => {
    if (!modal) {
        return;
    }

    modal.addEventListener('click', function (event) {
        if (event.target !== modal) {
            return;
        }

        if (modal === hireModal) {
            closeHireModal();
        } else if (modal === workModal) {
            closeWorkModal();
        }
    });
});

document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') {
        return;
    }

    if (workModal?.classList.contains('show')) {
        closeWorkModal();
        return;
    }

    if (hireModal?.classList.contains('show')) {
        closeHireModal();
    }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #fff;
        text-shadow: 0 0 10px rgba(255,255,255,0.3);
    }
    
    .scroll-top {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 0.8;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// React header + SPA style navigation (no full reload for section links)
if (window.React && window.ReactDOM) {
    const { useState, useEffect } = React;

    function HeaderNav() {
        const sections = [
            { label: 'Home', id: 'home' },
            { label: 'Services', id: 'services' },
            { label: 'Projects', id: 'projects' },
            { label: 'Skills', id: 'skills' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' }
        ];

        const [active, setActive] = useState('home');
        const [menuOpen, setMenuOpen] = useState(false);

        useEffect(() => {
            const onScroll = () => {
                const scroll = window.scrollY + 150;
                let current = 'home';
                sections.forEach(section => {
                    const el = document.getElementById(section.id);
                    if (el && el.offsetTop <= scroll) {
                        current = section.id;
                    }
                });
                setActive(current);
            };

            window.addEventListener('scroll', onScroll);
            return () => window.removeEventListener('scroll', onScroll);
        }, []);

        const toggleMenu = () => {
            setMenuOpen(!menuOpen);
        };

        const closeMenu = () => {
            setMenuOpen(false);
        };

        return (
            React.createElement('div', { className: 'nav-container' },
                React.createElement('a', { href: '#home', className: 'logo', onClick: () => { setActive('home'); closeMenu(); }},
                    React.createElement('div', { className: 'logo-mark', 'aria-hidden': 'true' }, 'TV'),
                    React.createElement('div', { className: 'logo-text' }, 'TechVerse'),
                    React.createElement('div', { className: 'logo-sub' }, 'by Sher')
                ),
                React.createElement('div', { 
                    className: `hamburger-menu ${menuOpen ? 'active' : ''}`, 
                    onClick: toggleMenu 
                },
                    React.createElement('span', null),
                    React.createElement('span', null),
                    React.createElement('span', null)
                ),
                React.createElement('ul', { className: `nav-menu ${menuOpen ? 'active' : ''}` },
                    sections.map(item => React.createElement('li', { key: item.id },
                        React.createElement('a', {
                            href: `#${item.id}`,
                            className: `nav-link ${active === item.id ? 'active' : ''}`,
                            onClick: (e) => {
                                e.preventDefault();
                                const tgt = document.getElementById(item.id);
                                if (tgt) {
                                    tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    setActive(item.id);
                                }
                                closeMenu();
                            }
                        }, item.label)
                    ))
                )
            )
        );
    }

    const rootElement = document.getElementById('react-nav-root');
    if (rootElement) {
        ReactDOM.createRoot(rootElement).render(React.createElement(HeaderNav));
    }

    // Show static fallback if React doesn't mount
    const fallback = document.getElementById('legacy-fallback');
    if (fallback) {
        fallback.style.display = 'none';
    }
}

runEntranceSequence();
