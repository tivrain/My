// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot'); // Add dots selector

    // Configuration
    const totalUniqueItems = 10; // Number of unique items
    const animationDuration = 80; // Animation duration in seconds (matches CSS)
    const marginRight = 40; // Matches CSS gap (adjust if CSS changes)

    // State variables
    let itemWidth = 0;
    let currentIndex = 0; // Track the current active item

    // Calculate and set carousel width dynamically
    function setCarouselWidth() {
        if (!items.length) return; // Exit if no items
        itemWidth = items[0].offsetWidth + marginRight; // Item width + spacing
        const totalWidth = itemWidth * totalUniqueItems * 2; // Double for seamless loop
        track.style.width = `${totalWidth}px`;
    }

    // Clone items for infinite loop
    function duplicateItems() {
        if (!track || items.length !== totalUniqueItems) return; // Safety check
        const clonedItems = Array.from(items).map(item => item.cloneNode(true));
        clonedItems.forEach(clone => track.appendChild(clone));
    }

    // Start or restart animation
    function startAnimation() {
        track.style.animation = `carousel-slide ${animationDuration}s linear infinite`;
    }

    // Reset animation for seamless looping
    function resetAnimation() {
        track.style.animation = 'none';
        track.offsetHeight; // Trigger reflow
        startAnimation();
    }

    // Toggle animation play state
    function toggleAnimation(state) {
        track.style.animationPlayState = state;
    }

    // Update active dot
    function updateActiveDot() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Move to specific item
    function moveToItem(index) {
        currentIndex = index % totalUniqueItems; // Ensure index loops within unique items
        const translateX = -(itemWidth * currentIndex);
        track.style.animation = 'none'; // Stop animation
        track.style.transform = `translateX(${translateX}px)`; // Move to position
        updateActiveDot(); // Highlight active dot
        setTimeout(() => {
            startAnimation(); // Restart animation
            track.style.transform = ''; // Reset transform to let animation take over
        }, 100); // Small delay for smooth transition
    }

    // Debounce utility for resize events
    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    }

    // Update carousel on resize
    const updateCarousel = debounce(() => {
        setCarouselWidth();
        moveToItem(currentIndex); // Maintain current position after resize
    }, 100);

    // Initialize carousel
    function initCarousel() {
        duplicateItems(); // Clone items once
        setCarouselWidth(); // Set initial width
        startAnimation(); // Start animation
        updateActiveDot(); // Set initial active dot
    }

    // Event listeners
    if (container && track) {
        // Hover interactions
        container.addEventListener('mouseenter', () => toggleAnimation('paused'));
        container.addEventListener('mouseleave', () => toggleAnimation('running'));

        // Touch support for mobile
        container.addEventListener('touchstart', () => toggleAnimation('paused'), { passive: true });
        container.addEventListener('touchend', () => toggleAnimation('running'), { passive: true });

        // Resize handling
        window.addEventListener('resize', updateCarousel);

        // Animation iteration for seamless looping and dot updates
        track.addEventListener('animationiteration', () => {
            currentIndex = (currentIndex + 1) % totalUniqueItems; // Move to next item
            updateActiveDot(); // Update dot
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                toggleAnimation('paused'); // Pause animation
                moveToItem(index); // Move to clicked item
            });
        });

        // Ensure clean start on full load
        window.addEventListener('load', () => {
            setCarouselWidth();
            resetAnimation();
        });
    }

    // Kick off the carousel
    initCarousel();

    // Accessibility: Pause animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        toggleAnimation('paused');
    }
});