// DOM Elements
const mobileHamburger = document.getElementById('mobileHamburger');
const mobileNavLinks = document.getElementById('mobileNavLinks');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const heroBackground = document.getElementById('heroBackground');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const slideIndicators = document.getElementById('slideIndicators');
const heroSection = document.querySelector('.hero-section');
const desktopHeader = document.querySelector('.desktop-header');
const mobileHeader = document.querySelector('.mobile-header');
const mainNav = document.querySelector('.main-nav');

// Slideshow Variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let slideInterval;

// Initialize slideshow indicators
function initIndicators() {
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        slideIndicators.appendChild(indicator);
    }
}

// Go to specific slide
function goToSlide(n) {
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    slideIndicators.children[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = (n + totalSlides) % totalSlides;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    slideIndicators.children[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Start automatic slideshow
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Stop automatic slideshow
function stopSlideshow() {
    clearInterval(slideInterval);
}

// Mobile menu toggle (FlyStore style)
mobileHamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNavLinks.classList.toggle('active');
    mobileHamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileNavLinksArray = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinksArray.forEach(link => {
    link.addEventListener('click', function() {
        mobileNavLinks.classList.remove('active');
        mobileHamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideMobileHeader = event.target.closest('.mobile-header');
    if (!isClickInsideMobileHeader && mobileNavLinks.classList.contains('active')) {
        mobileNavLinks.classList.remove('active');
        mobileHamburger.classList.remove('active');
    }
});

// Update active nav link on click for desktop
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // Don't prevent default for active link
        if (!this.classList.contains('active')) {
            e.preventDefault();
        }
        
        // Remove active class from all links
        navItems.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// CTA button interaction
if(learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        window.location.href = 'about.html';
    });
}

// Slideshow controls
if(prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow(); // Restart the interval
    });
}

if(nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow(); // Restart the interval
    });
}

// Pause slideshow on hover (now on hero section)
if(heroSection) {
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
}


// --- OPTIMIZED SCROLL LISTENER START ---
let heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
let ticking = false;

window.addEventListener('resize', () => {
    heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
    adjustHeroContentPadding();
    
    // Close mobile menu if open and switching to desktop view
    if (window.innerWidth > 768 && mobileNavLinks.classList.contains('active')) {
        mobileNavLinks.classList.remove('active');
        mobileHamburger.classList.remove('active');
    }
});

// Add scroll effect to both headers using requestAnimationFrame
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPosition = window.scrollY;
            const scrollProgress = scrollPosition / heroHeight;
            
            // Apply scrolled class to both headers
            if (scrollPosition > 50) {
                if(desktopHeader) desktopHeader.classList.add('scrolled');
                if(mobileHeader) mobileHeader.classList.add('scrolled');
                if(mainNav) mainNav.classList.add('scrolled');
            } else {
                if(desktopHeader) desktopHeader.classList.remove('scrolled');
                if(mobileHeader) mobileHeader.classList.remove('scrolled');
                if(mainNav) mainNav.classList.remove('scrolled');
            }
            
            // Adjust desktop header transparency based on scroll
            if (scrollPosition < heroHeight && desktopHeader) {
                // Gradually increase opacity as we scroll down
                const opacity = 0.3 + (scrollProgress * 0.65); // From 0.3 to 0.95
                desktopHeader.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            } else if (desktopHeader) {
                desktopHeader.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
            
            ticking = false;
        });
        ticking = true;
    }
});
// --- OPTIMIZED SCROLL LISTENER END ---


// Initialize the website
function initWebsite() {
    // Initialize slideshow indicators
    initIndicators();
    
    // Start automatic slideshow
    startSlideshow();
    
    // Set initial hero content padding based on current header
    adjustHeroContentPadding();
}

// Adjust hero content padding based on current header
function adjustHeroContentPadding() {
    const heroContent = document.querySelector('.hero-content');
    if(!heroContent) return;

    // Check which header is currently visible
    const isMobileView = window.innerWidth <= 768;
    
    if (isMobileView && mobileHeader) {
        const mobileHeaderHeight = mobileHeader.offsetHeight;
        heroContent.style.paddingTop = `${mobileHeaderHeight + 40}px`;
    } else if (desktopHeader) {
        const desktopHeaderHeight = desktopHeader.offsetHeight;
        heroContent.style.paddingTop = `${desktopHeaderHeight + 20}px`;
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initWebsite);

// Facilities Carousel
const facilitiesCarousel = document.getElementById('facilities-carousel');
if (facilitiesCarousel) {
    const slides = facilitiesCarousel.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicators = facilitiesCarousel.querySelectorAll('.indicator');

    let currentFacilitySlide = 0;
    const totalFacilitySlides = slides.length;
    let facilityAutoSlideInterval;

    function showFacilitySlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextFacilitySlide() {
        currentFacilitySlide = (currentFacilitySlide + 1) % totalFacilitySlides;
        showFacilitySlide(currentFacilitySlide);
    }

    function prevFacilitySlide() {
        currentFacilitySlide = (currentFacilitySlide - 1 + totalFacilitySlides) % totalFacilitySlides;
        showFacilitySlide(currentFacilitySlide);
    }

    function startFacilityAutoSlide() {
        facilityAutoSlideInterval = setInterval(nextFacilitySlide, 4000);
    }

    function stopFacilityAutoSlide() {
        clearInterval(facilityAutoSlideInterval);
    }

    nextBtn?.addEventListener('click', () => {
        nextFacilitySlide();
        stopFacilityAutoSlide();
        startFacilityAutoSlide();
    });

    prevBtn?.addEventListener('click', () => {
        prevFacilitySlide();
        stopFacilityAutoSlide();
        startFacilityAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentFacilitySlide = index;
            showFacilitySlide(currentFacilitySlide);
            stopFacilityAutoSlide();
            startFacilityAutoSlide();
        });
    });

    // Start auto-play
    startFacilityAutoSlide();

    // Pause on hover
    facilitiesCarousel.addEventListener('mouseenter', stopFacilityAutoSlide);
    facilitiesCarousel.addEventListener('mouseleave', startFacilityAutoSlide);
}


// --- OPTIMIZED COUNTER ANIMATION START ---
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutQuart easing for a smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeProgress * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = target;
            element.classList.add('animated');
        }
    };
    
    window.requestAnimationFrame(step);
}
// --- OPTIMIZED COUNTER ANIMATION END ---


// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate statistics when they come into view
            if (entry.target.classList.contains('statistics-section')) {
                statNumbers.forEach(animateCounter);
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.desktop-header')?.offsetHeight || 
                                document.querySelector('.mobile-header')?.offsetHeight || 0;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Program card buttons
document.querySelectorAll('.cta-button-outline').forEach(button => {
    button.addEventListener('click', function() {
        const programTitle = this.closest('.program-card').querySelector('h3').textContent;
        alert(`Viewing details for ${programTitle}`);
    });
});

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// Initialize all new functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize facilities carousel
    if (document.querySelector('.facilities-carousel .carousel-slide')) {
        showFacilitySlide(0);
    }
    
    // Add hover effects for cards
    document.querySelectorAll('.program-card, .why-choose-item, .quick-link-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});