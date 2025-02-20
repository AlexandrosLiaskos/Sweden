document.addEventListener('DOMContentLoaded', () => {
    // Check if Font Awesome is loaded
    const checkFontAwesome = () => {
        const span = document.createElement('span');
        span.className = 'fas fa-mobile-alt';
        span.style.visibility = 'hidden';
        document.body.appendChild(span);
        
        const isFontAwesomeLoaded = window.getComputedStyle(span, ':before').content !== '';
        document.body.removeChild(span);
        
        if (!isFontAwesomeLoaded) {
            document.body.classList.add('fa-fallback');
        }
    };
    
    checkFontAwesome();

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in to cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        fadeInObserver.observe(card);
    });

    // Handle image loading with fade-in
    const images = document.querySelectorAll('.guide-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        
        const loadImage = () => {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        };

        if (img.complete) {
            loadImage();
        } else {
            img.addEventListener('load', loadImage);
        }
    });

    // Smooth scrolling for navigation with dynamic offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced touch feedback
    const addTouchFeedback = (elements) => {
        elements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
                element.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                element.style.transform = '';
            }, { passive: true });
        });
    };

    addTouchFeedback(document.querySelectorAll('.card, .cost-item, li, .luggage-item, .extra-item'));

    // Parallax effect for background
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.scrollY;
        document.body.style.backgroundPosition = `100% ${-scrolled * 0.1}px, 0% ${scrolled * 0.1}px`;
        lastScrollY = scrolled;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
            });
            ticking = true;
        }
    }, { passive: true });

    // Dynamic header shadow
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.boxShadow = 'none';
        } else {
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Add hover effect for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});
