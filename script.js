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
learnMoreBtn.addEventListener('click', () => {
    alert('Thank you for your interest! We will redirect you to learn more about our amazing playground.');
    // In a real implementation, this would redirect to a page
    // window.location.href = 'about.html';
});

// Slideshow controls
prevSlideBtn.addEventListener('click', () => {
    prevSlide();
    stopSlideshow();
    startSlideshow(); // Restart the interval
});

nextSlideBtn.addEventListener('click', () => {
    nextSlide();
    stopSlideshow();
    startSlideshow(); // Restart the interval
});

// Pause slideshow on hover (now on hero section)
heroSection.addEventListener('mouseenter', stopSlideshow);
heroSection.addEventListener('mouseleave', startSlideshow);

// Add scroll effect to both headers
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    // Calculate how far we've scrolled into the hero section
    const scrollProgress = scrollPosition / heroHeight;
    
    // Apply scrolled class to both headers
    if (scrollPosition > 50) {
        desktopHeader.classList.add('scrolled');
        mobileHeader.classList.add('scrolled');
        mainNav.classList.add('scrolled');
    } else {
        desktopHeader.classList.remove('scrolled');
        mobileHeader.classList.remove('scrolled');
        mainNav.classList.remove('scrolled');
    }
    
    // Adjust desktop header transparency based on scroll
    if (scrollPosition < heroHeight && desktopHeader) {
        // Gradually increase opacity as we scroll down
        const opacity = 0.3 + (scrollProgress * 0.65); // From 0.3 to 0.95
        desktopHeader.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    } else if (desktopHeader) {
        desktopHeader.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

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

// Adjust on window resize
window.addEventListener('resize', () => {
    adjustHeroContentPadding();
    
    // Close mobile menu if open and switching to desktop view
    if (window.innerWidth > 768 && mobileNavLinks.classList.contains('active')) {
        mobileNavLinks.classList.remove('active');
        mobileHamburger.classList.remove('active');
    }
});
