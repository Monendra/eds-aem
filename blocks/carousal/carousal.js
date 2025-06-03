export default function decorate(block) {
  const rows = [...block.children];
  
  // Create navigation dots container
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots-container');
  
  // Process rows and create slides
  let slideCount = 0;
  [...block.children].forEach((row, r) => {
    if (r === 0 || r === rows.length - 1) {
      // We'll replace the navigation buttons with dots, so remove these rows
      row.remove();
    } else {
      row.classList.add('slide');
      slideCount++;
      
      [...row.children].forEach((col, c) => {
        if (c === 0) {
          col.classList.add('slide-text');
          
          // Create inner container for text (for mobile gradient background)
          const textInner = document.createElement('div');
          textInner.classList.add('slide-text-inner');
          
          // Move all content to the inner container
          while (col.firstChild) {
            textInner.appendChild(col.firstChild);
          }
          
          col.appendChild(textInner);
          
          // Style headings and CTA
          const headings = textInner.querySelectorAll('h2');
          headings.forEach((h2) => {
            h2.classList.add('carousel-heading');
          });

          const cta = textInner.querySelector('h3');
          if (cta) {
            cta.classList.add('carousel-cta');
            cta.addEventListener('click', (e) => {
              e.preventDefault();
              window.location.href = '#shop';
            });
          }
        }
        
        if (c === 1) {
          col.classList.add('slide-image');
          const picture = col.querySelector('picture');
          if (picture) {
            picture.classList.add('carousel-image');
          }
        }
      });
    }
  });
  
  // Create dots for navigation
  const slides = [...block.querySelectorAll('.slide')];
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });
  
  // Add dots container to block
  block.appendChild(dotsContainer);

  // Initialize carousel functionality
  let currentSlide = 0;
  
  // Make first slide and dot active
  slides[0].classList.add('active');
  const dots = [...dotsContainer.querySelectorAll('.dot')];
  dots[0].classList.add('active');

  function goToSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Add active class to new slide and dot
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  // Add click handlers for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Auto-rotate slides every 5 seconds
  let autoSlideInterval = setInterval(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }, 5000);
  
  // Pause auto-rotation when user interacts with carousel
  block.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  block.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      goToSlide(nextIndex);
    }, 5000);
  });

  // Handle image sizing to ensure proper fill
  function handleImageSizing() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    slides.forEach(slide => {
      const img = slide.querySelector('.carousel-image img');
      if (img) {
        // Ensure images load properly
        img.onload = () => {
          img.style.objectFit = 'cover';
          img.style.width = '100%';
          img.style.height = '100%';
          
          if (isMobile) {
            // For mobile, ensure parent containers are sized properly
            const slideImage = slide.querySelector('.slide-image');
            if (slideImage) {
              slideImage.style.height = '100%';
              slideImage.style.position = 'absolute';
            }
            
            const slideText = slide.querySelector('.slide-text');
            if (slideText) {
              slideText.style.height = '100%';
              slideText.style.position = 'absolute';
            }
            
            // Set appropriate height based on screen size
            const height = isSmallMobile ? '480px' : '580px';
            slide.style.minHeight = height;
            slide.style.height = '100%';
          }
        };
        
        // Apply styles immediately in case image is already loaded
        img.style.objectFit = 'cover';
        img.style.width = '100%';
        img.style.height = '100%';
        
        if (isMobile) {
          // For mobile, ensure parent containers are sized properly
          const slideImage = slide.querySelector('.slide-image');
          if (slideImage) {
            slideImage.style.height = '100%';
            slideImage.style.position = 'absolute';
          }
          
          const slideText = slide.querySelector('.slide-text');
          if (slideText) {
            slideText.style.height = '100%';
            slideText.style.position = 'absolute';
          }
          
          // Set appropriate height based on screen size
          const height = isSmallMobile ? '480px' : '580px';
          slide.style.minHeight = height;
          slide.style.height = '100%';
        }
      }
    });
  }

  // Call immediately
  handleImageSizing();
  
  // Handle window resize
  window.addEventListener('resize', handleImageSizing);
} 