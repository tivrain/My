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
// Set initial active link on page load
window.addEventListener('load', updateActiveLink);

        // Function to initialize autocomplete for an input field
        function addStarEffect() {
  const element = document.querySelector('a.event-link');
  const numberOfParticles = 15;
  const duration = 1000;
  function createStars() {
    const existingContainer = element.querySelector('.star-container');
    if (existingContainer) {
      existingContainer.remove();
    }
    const container = document.createElement('div');
    container.classList.add('star-container');
    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('span');
      particle.classList.add('star-particle');
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 3 + 1;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      particle.style.setProperty('--x', `${x}em`);
      particle.style.setProperty('--y', `${y}em`);
      container.appendChild(particle);
    }
    element.appendChild(container);
  }
  setInterval(createStars, duration);
}

function changeFirecrackerColor(colors) {
    function addFirecrackerEffectLoop(colors) {
      const element = document.querySelector('a.event-link');
      const numberOfParticles = 20;
      const duration = 1000;
      function createFirecracker() {
          const existingContainer = element.querySelector('.star-container');
          if (existingContainer) {
            existingContainer.remove();
          }
          const container = document.createElement('div');
          container.classList.add('star-container');
      
          for (let i = 0; i < numberOfParticles; i++) {
              const particle = document.createElement('span');
              particle.classList.add('star-particle');
      
              const angle = Math.random() * 2 * Math.PI;
              const distance = Math.random() * 2 + 1;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              particle.style.setProperty('--x', `${x}em`);
              particle.style.setProperty('--y', `${y}em`);
              if (colors && colors.length > 0) {
                  particle.style.backgroundColor = colors[i % colors.length];
              } else {
                particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
              }
              container.appendChild(particle);
          }
          element.appendChild(container);
      }
      setInterval(createFirecracker, duration);
  }
  addFirecrackerEffectLoop(colors);
}

addStarEffect();
changeFirecrackerColor(['red', 'blue', 'green', 'yellow', 'orange','indigo','red', 'blue', 'green', 'yellow', 'orange','indigo']);
// event end//

/*bg music*/
    document.addEventListener("DOMContentLoaded", function () {
        const audio = document.getElementById("intro-music");
        audio.volume = 0.5; // Adjust volume (0.0 to 1.0)

        // Try autoplay
        audio.play().catch(error => {
            console.log("Autoplay blocked, waiting for user interaction...");

            // Play on first user click
            document.addEventListener("click", function playMusic() {
                audio.play();
                setTimeout(() => {
                    audio.pause();
                }, 20000); // Stop music after 5 seconds

                // Remove event listener after first play
                document.removeEventListener("click", playMusic);
            });
        });

        // Stop music after 5 seconds if autoplay works
        setTimeout(() => {
            audio.pause();
        }, 20000);
    });
      /*atiuttam.com ad*/
    // Sliding Ad Text
    const adMessages = [
        "✈️ Book Flights & Holidays at the Best Price! 🌍",
        "🚆 Fast & Easy Train Ticket Booking! 🎟️",
        "🚗 Luxury Car Rentals Available Now! 🏎️",
        "🏝️ Exclusive Holiday Packages Just for You! 🏖️"
    ];

    let adIndex = 0;
    function updateAdText() {
        const adText = document.getElementById("adText");
        adText.style.animation = "none"; // Reset animation
        setTimeout(() => {
            adText.innerHTML = adMessages[adIndex];
            adText.style.animation = "fade 1s ease-in-out";
            adIndex = (adIndex + 1) % adMessages.length;
        }, 100); // Small delay for smooth transition
    }

    // Change text every 4 seconds
    setInterval(updateAdText, 4000);

    // Create Spark Effect
    function createSpark() {
        const spark = document.createElement("div");
        spark.classList.add("spark");
        
        const banner = document.getElementById("adBanner");
        banner.appendChild(spark);
        
        spark.style.left = Math.random() * banner.clientWidth + "px";
        spark.style.top = Math.random() * banner.clientHeight + "px";

        setTimeout(() => {
            spark.remove();
        }, 1000);
    }

    setInterval(createSpark, 200);

// WhatsApp link js 
document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("contact-form").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form from submitting normally
    
            // Get user input values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
    
            // Check if all fields are filled
            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields before sending.");
                return;
            }
    
            // Format WhatsApp message
            const whatsappMessage = `Hello, I want to contact you.\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
    
            // Your WhatsApp number
            const phoneNumber = "+917014434465"; // Change to your WhatsApp number
    
            // WhatsApp URL
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
            // Open WhatsApp chat in a new tab
            window.open(whatsappURL, "_blank");
        });
    });
