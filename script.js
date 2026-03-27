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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const cards = document.querySelectorAll('.service-card, .project-card, .skill-group, .highlight-card, .stat, .info-item');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

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