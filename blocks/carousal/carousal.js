export default function decorate(block) {
  // Add carousel class to block
  block.classList.add('carousal');
  
  const rows = [...block.children];
  
  [...block.children].forEach((row, r) => {
    if (r === 0) {
      // Create next button using authored content
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('btn', 'btn-next');
      const nextContent = row.textContent.trim();
      const nextNode = document.createTextNode(nextContent);
      nextBtn.append(nextNode);
      row.replaceWith(nextBtn);
    } else if (r === rows.length - 1) {
      // Create previous button using authored content
      const prevBtn = document.createElement('button');
      prevBtn.classList.add('btn', 'btn-prev');
      const prevContent = row.textContent.trim();
      const prevNode = document.createTextNode(prevContent);
      prevBtn.append(prevNode);
      row.replaceWith(prevBtn);
    } else {
      row.classList.add('slide');
      [...row.children].forEach((col, c) => {
        if (c === 0) {
          col.classList.add('slide-text');
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

  // Initialize carousel functionality
  let currentSlide = 0;
  const slides = [...block.querySelectorAll('.slide')];
  
  // Make first slide active
  slides[0].classList.add('active');

  function goToSlide(index) {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Add active class to new slide
    currentSlide = index;
    slides[currentSlide].classList.add('active');

    // Update background image for mobile
    if (window.innerWidth <= 768) {
      setMobileBackground(slides[currentSlide]);
    }
  }

  // Add click handlers for navigation buttons
  const nextButton = block.querySelector('.btn-next');
  const prevButton = block.querySelector('.btn-prev');

  nextButton.addEventListener('click', () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  });

  prevButton.addEventListener('click', () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  });

  // Add background image for mobile view
  function setMobileBackground(slide) {
    const img = slide.querySelector('.carousel-image img');
    if (img && window.innerWidth <= 768) {
      slide.style.backgroundImage = `url(${img.src})`;
    } else {
      slide.style.backgroundImage = 'none';
    }
  }

  // Initial setup for mobile
  if (window.innerWidth <= 768) {
    slides.forEach(slide => {
      const img = slide.querySelector('.carousel-image img');
      if (img) {
        // Preload image
        const tempImg = new Image();
        tempImg.src = img.src;
        tempImg.onload = () => {
          if (slide.classList.contains('active')) {
            setMobileBackground(slide);
          }
        };
      }
    });
  }

  // Handle resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      setMobileBackground(slides[currentSlide]);
    } else {
      slides.forEach(slide => {
        slide.style.backgroundImage = 'none';
      });
    }
  });
} 