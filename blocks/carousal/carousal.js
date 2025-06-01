export default function decorate(block) {
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // Handle content column
      if (col === row.children[0]) {
        // Style headings and CTA
        const headings = col.querySelectorAll('h2');
        headings.forEach((h2) => {
          h2.classList.add('carousel-heading');
        });

        const cta = col.querySelector('h3');
        if (cta) {
          cta.classList.add('carousel-cta');
          cta.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '#shop';
          });
        }
      }
      
      // Handle image column
      if (col === row.children[1]) {
        const picture = col.querySelector('picture');
        if (picture) {
          picture.classList.add('carousel-image');
        }
      }
    });
  });

  // Create navigation dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'dots';
  
  [...block.children].forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  block.appendChild(dotsContainer);

  // Initialize carousel functionality
  let currentSlide = 0;
  let autoPlayInterval;
  const autoPlayDelay = 5000;

  function goToSlide(index) {
    block.children[currentSlide].style.opacity = '0';
    dotsContainer.children[currentSlide].classList.remove('active');

    currentSlide = index;
    block.children[currentSlide].style.opacity = '1';
    dotsContainer.children[currentSlide].classList.add('active');
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % block.children.length;
    goToSlide(nextIndex);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  // Handle hover interactions
  block.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });

  block.addEventListener('mouseleave', () => {
    startAutoPlay();
  });

  // Start the carousel
  startAutoPlay();
} 