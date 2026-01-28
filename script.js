// Custom JavaScript for Mùa Thanh Xuân Rực Rỡ - Enhanced Báo Tường Theme

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link, .btn-lg').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight, // Adjust for fixed navbar
                        behavior: 'smooth'
                    });

                    // Close the navbar on mobile after clicking a link
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarToggler && navbarCollapse.classList.contains('show')) {
                        new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        }).hide();
                    }
                }
            }
        });
    });

    // Add 'scrolled' class to navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animate sections on scroll using Intersection Observer
    // Select all elements that have animate__animated class, except those already animated on load
    const animateElements = document.querySelectorAll(
        '.animate__animated:not(.header-title):not(.header-subtitle):not(.hero-heading):not(.hero-text):not(.hero-section .btn)'
    );

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When element comes into view, re-add its specific animation class
                // (Animate.css classes are typically prefixed with 'animate__')
                const classes = Array.from(entry.target.classList).filter(cls => cls.startsWith('animate__'));
                classes.forEach(cls => {
                    if (cls !== 'animate__animated') { // Don't re-add the base class
                        entry.target.classList.add(cls);
                    }
                });
                entry.target.style.visibility = 'visible'; // Make element visible
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        element.style.visibility = 'hidden'; // Hide elements initially
        observer.observe(element);
    });

    // Initial animations for header and hero (always visible from the start)
    document.querySelector('.header-title').classList.add('animate__fadeInDown');
    document.querySelector('.header-subtitle').classList.add('animate__fadeInUp', 'animate__delay-1s');
    document.querySelector('.hero-heading').classList.add('animate__zoomIn');
    document.querySelector('.hero-text').classList.add('animate__fadeInUp', 'animate__delay-1s');
    document.querySelector('.hero-section .btn').classList.add('animate__bounceIn', 'animate__delay-2s');
});
