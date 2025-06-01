export default function decorate(block) {
  // Create navigation dots
  const slides = block.children;
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'dots';
  
  Array.from(slides).forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  block.appendChild(dotsContainer);

  // Initialize variables
  let currentSlide = 0;
  let autoPlayInterval;
  const autoPlayDelay = 5000; // 5 seconds

  // Function to go to a specific slide
  function goToSlide(index) {
    // Hide current slide
    slides[currentSlide].style.opacity = '0';
    const currentDot = dotsContainer.children[currentSlide];
    currentDot.classList.remove('active');

    // Show new slide
    currentSlide = index;
    slides[currentSlide].style.opacity = '1';
    const newDot = dotsContainer.children[currentSlide];
    newDot.classList.add('active');
  }

  // Function to go to next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }

  // Start autoplay
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  // Pause autoplay on hover
  block.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });

  // Resume autoplay on mouse leave
  block.addEventListener('mouseleave', () => {
    startAutoPlay();
  });

  // Initialize autoplay
  startAutoPlay();

  // Make Shop Now button clickable
  const shopNowButton = block.querySelector('h3');
  if (shopNowButton) {
    shopNowButton.style.cursor = 'pointer';
    shopNowButton.addEventListener('click', (e) => {
      e.preventDefault();
      // Add your shop now link here
      window.location.href = '#shop';
    });
  }
} 