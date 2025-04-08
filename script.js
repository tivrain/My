// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');

    const config = {
        totalUniqueItems: 10,
        animationDuration: 80, // in seconds
        marginRight: 40 // matches CSS gap
    };

    let itemWidth = 0;
    let currentIndex = 0;

    const setCarouselWidth = () => {
        if (!items.length) return;
        itemWidth = items[0].offsetWidth + config.marginRight;
        track.style.width = `${itemWidth * config.totalUniqueItems * 2}px`;
    };

    const duplicateItems = () => {
        if (!track || items.length !== config.totalUniqueItems) return;
        items.forEach(item => track.appendChild(item.cloneNode(true)));
    };

    const startAnimation = () => {
        track.style.animation = `carousel-slide ${config.animationDuration}s linear infinite`;
    };

    const resetAnimation = () => {
        track.style.animation = 'none';
        track.offsetHeight; // Trigger reflow
        startAnimation();
    };

    const toggleAnimation = state => {
        if (track) track.style.animationPlayState = state;
    };

    const updateActiveDot = () => {
        dots.forутеEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    };

    const moveToItem = index => {
        currentIndex = index % config.totalUniqueItems;
        const translateX = -(itemWidth * currentIndex);
        track.style.animation = 'none';
        track.style.transform = `translateX(${translateX}px)`;
        updateActiveDot();
        setTimeout(() => {
            startAnimation();
            track.style.transform = '';
        }, 150); // Slightly increased for smoother transition
    };

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const updateCarousel = debounce(() => {
        setCarouselWidth();
        moveToItem(currentIndex);
    }, 100);

    const initCarousel = () => {
        if (!track || !container) return console.warn('Carousel elements not found');
        duplicateItems();
        setCarouselWidth();
        startAnimation();
        updateActiveDot();

        container.addEventListener('mouseenter', () => toggleAnimation('paused'));
        container.addEventListener('mouseleave', () => toggleAnimation('running'));
        container.addEventListener('touchstart', () => toggleAnimation('paused'), { passive: true });
        container.addEventListener('touchend', () => toggleAnimation('running'), { passive: true });
        window.addEventListener('resize', updateCarousel);
        track.addEventListener('animationiteration', () => {
            currentIndex = (currentIndex + 1) % config.totalUniqueItems;
            updateActiveDot();
        });
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                toggleAnimation('paused');
                moveToItem(index);
            });
        });
        window.addEventListener('load', () => {
            setCarouselWidth();
            resetAnimation();
        });

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            toggleAnimation('paused');
        }
    };

    initCarousel();

    // Combined Star/Firecracker Effect
    const addParticleEffect = (colors = null) => {
        const element = document.querySelector('a.event-link');
        if (!element) return console.warn('Event link element not found');

        const particleConfig = {
            numberOfParticles: 20,
            duration: 1000
        };

        const createParticles = () => {
            const existingContainer = element.querySelector('.star-container');
            if (existingContainer) existingContainer.remove();

            const container = document.createElement('div');
            container.classList.add('star-container');

            for (let i = 0; i < particleConfig.numberOfParticles; i++) {
                const particle = document.createElement('span');
                particle.classList.add('star-particle');
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 3 + 1;
                particle.style.setProperty('--x', `${Math.cos(angle) * distance}em`);
                particle.style.setProperty('--y', `${Math.sin(angle) * distance}em`);
                particle.style.backgroundColor = colors?.length
                    ? colors[i % colors.length]
                    : `hsl(${Math.random() * 360}, 100%, 50%)`;
                container.appendChild(particle);
            }
            element.appendChild(container);
        };

        setInterval(createParticles, particleConfig.duration);
    };

    addParticleEffect(['red', 'blue', 'green', 'yellow', 'orange', 'indigo']);

    // Background Music
    const audio = document.getElementById("intro-music");
    if (audio) {
        audio.volume = 0.5;
        audio.play().catch(() => {
            console.log("Autoplay blocked, waiting for interaction...");
            document.addEventListener('click', function playMusic() {
                audio.play().then(() => setTimeout(() => audio.pause(), 20000));
                document.removeEventListener('click', playMusic);
            }, { once: true });
        });
        setTimeout(() => audio.pause(), 20000);
    }

    // Advertisement
    const adMessages = [
        "✈️ Book Flights & Holidays at the Best Price! 🌍",
        "🚆 Fast & Easy Train Ticket Booking! 🎟️",
        "🚗 Luxury Car Rentals Available Now! 🏎️",
        "🏝️ Exclusive Holiday Packages Just for You! 🏖️"
    ];

    let adIndex = 0;
    function updateAdText() {
        const adText = document.getElementById("adText");
        if (!adText) return;
        adText.style.animation = "none";
        adText.offsetHeight; // Trigger reflow
        setTimeout(() => {
            adText.innerHTML = adMessages[adIndex];
            adText.style.animation = "fade 1s ease-in-out";
            adIndex = (adIndex + 1) % adMessages.length;
        }, 100);
    }

    setInterval(updateAdText, 4000);

    // Orbiting Stars (Sparks)
    function createSpark() {
        const form = document.querySelector(".rental-form");
        if (!form) return;

        const spark = document.createElement("div");
        spark.classList.add("spark");
        form.appendChild(spark);

        const edge = Math.floor(Math.random() * 4);
        const offset = Math.random() * 15 + 5;
        const speed = Math.random() * 2 + 1;
        let animationName;

        switch (edge) {
            case 0:
                spark.style.left = "0";
                spark.style.top = `${-offset}px`;
                animationName = "moveTop";
                break;
            case 1:
                spark.style.left = `${form.clientWidth + offset}px`;
                spark.style.top = "0";
                animationName = "moveRight";
                break;
            case 2:
                spark.style.left = `${form.clientWidth}px`;
                spark.style.top = `${form.clientHeight + offset}px`;
                animationName = "moveBottom";
                break;
            case 3:
                spark.style.left = `${-offset}px`;
                spark.style.top = `${form.clientHeight}px`;
                animationName = "moveLeft";
                break;
        }

        spark.style.animation = `${animationName} ${speed}s linear forwards`;
        spark.style.opacity = Math.random() * 0.5 + 0.5;

        const sparks = form.querySelectorAll(".spark");
        if (sparks.length > 50) { // Reduced from 300
            sparks[0].remove();
        }

        setTimeout(() => spark.remove(), speed * 1000);
    }

    const colors = ["#ffca28", "#ff7f00", "#62b0bc", "#ffffff", "#ff66cc", "#66ff66", "#ff3333"];
    function changeSparkColors() {
        const sparks = document.querySelectorAll(".spark");
        sparks.forEach(spark => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            spark.style.backgroundColor = randomColor;
            spark.style.boxShadow = `0 0 6px ${randomColor}`;
        });
    }

    setInterval(createSpark, 100); // Increased from 10ms to 100ms
    setInterval(changeSparkColors, 1000);

    // Moving Stars for Background
    function createMovingStar() {
        const hero = document.querySelector(".hero");
        if (!hero) return;

        const star = document.createElement("div");
        star.classList.add("star");
        hero.appendChild(star);

        // Random size and position
        const size = Math.random() * 2 + 1; // 1-3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;

        // Random speed and duration (5-15s)
        const duration = Math.random() * 10 + 5;
        star.style.animationDuration = `${duration}s`;

        // Random opacity
        star.style.opacity = Math.random() * 0.5 + 0.5;

        // Remove star after animation
        star.addEventListener("animationend", () => star.remove());

        // Cap total stars
        const stars = hero.querySelectorAll(".star");
        if (stars.length > 50) { // Reduced from 100
            stars[0].remove();
        }
    }

    setInterval(createMovingStar, 100);

    // WhatsApp Form
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();
            const name = document.getElementById("name")?.value.trim() || '';
            const email = document.getElementById("email")?.value.trim() || '';
            const message = document.getElementById("message")?.value.trim() || '';

            if (!name || !email || !message) {
                alert(`Please fill in: ${!name ? "Name, " : ""}${!email ? "Email, " : ""}${!message ? "Message" : ""}`.replace(/, $/, ""));
                return;
            }

            const whatsappMessage = `Hello, I want to contact you.\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const phoneNumber = "+917014434465";
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
        });
    }
});
