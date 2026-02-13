// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐝 Bee My Valentine website loaded with love! 💛');
    
    // Initialize all features
    initPhotoSlideshow();
    initFloatingHearts();
    initMusicPlayer();
    initScrollAnimations();
    initInteractiveElements();
});

// Photo Slideshow
function initPhotoSlideshow() {
    const slides = document.querySelectorAll('.photo-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    function showSlide(n) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Wrap around
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // Event listeners for buttons
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoPlay();
        });
    });
    
    // Auto play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Start auto play
    startAutoPlay();
    
    // Pause on hover
    const slideshowContainer = document.querySelector('.photo-slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
}

// Floating Hearts Animation
function initFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['💛', '💕', '💖', '💝', '💗', '🐝', '🍯'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 2000);
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 500);
    }
}

// Music Player
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const musicText = musicToggle.querySelector('.music-text');
    let isPlaying = false;
    
    // You can add actual audio here
    // const audio = new Audio('path-to-your-music.mp3');
    
    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            musicText.textContent = 'Pause Music';
            musicToggle.style.background = 'linear-gradient(135deg, #E91E63, #9C27B0)';
            // audio.play();
            console.log('🎵 Music playing');
        } else {
            musicText.textContent = 'Play Music';
            musicToggle.style.background = 'linear-gradient(135deg, #FFC107, #FFD700)';
            // audio.pause();
            console.log('🎵 Music paused');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger animations for child elements
                const animatedElements = entry.target.querySelectorAll('.pet-name-card, .gallery-item');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));
}

// Interactive Elements
function initInteractiveElements() {
    // Add click interactions to flowers
    const flowers = document.querySelectorAll('.flower-item');
    flowers.forEach(flower => {
        flower.addEventListener('click', function() {
            this.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 600);
        });
    });
    
    // Add click interactions to chocolates
    const chocolates = document.querySelectorAll('.chocolate-piece');
    chocolates.forEach(chocolate => {
        chocolate.addEventListener('click', function() {
            // Create floating message
            const message = document.createElement('div');
            message.textContent = 'Sweet! 💛';
            message.style.cssText = `
                position: fixed;
                left: ${event.clientX}px;
                top: ${event.clientY}px;
                color: #FFD700;
                font-size: 2rem;
                font-weight: bold;
                pointer-events: none;
                animation: floatUp 2s ease-out forwards;
                z-index: 9999;
            `;
            document.body.appendChild(message);
            
            setTimeout(() => message.remove(), 2000);
        });
    });
    
    // Quote cards hover effect
    const quoteCards = document.querySelectorAll('.quote-card');
    quoteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #FFD700, #FFC107)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #FFE4E1, #FFB6C1)';
        });
    });
    
    // Add sparkle effect to reason cards
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
}

// Create sparkle effect
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: ${Math.random() * 20 + 10}px;
            pointer-events: none;
            animation: sparkleFloat 1s ease-out forwards;
            z-index: 9999;
        `;
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5) rotate(180deg);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for any anchor links (if you add navigation)
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

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled * 0.002);
    }
});

// Easter egg: Konami code for extra hearts!
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerHeartExplosion();
        konamiCode = [];
    }
});

function triggerHeartExplosion() {
    console.log('💛 HEART EXPLOSION! 💛');
    const heartsContainer = document.getElementById('heartsContainer');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💛';
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${Math.random() * 40 + 20}px;
                pointer-events: none;
                animation: explodeHeart 2s ease-out forwards;
                z-index: 9999;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
}

// Add explode animation
const explodeStyle = document.createElement('style');
explodeStyle.textContent = `
    @keyframes explodeHeart {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(explodeStyle);

// Log a sweet message
console.log(`
    ╔══════════════════════════════════╗
    ║  🐝 Made with Love for Bee 💛   ║
    ║  Happy Valentine's Da! 💕  ║
    ╚══════════════════════════════════╝
`);