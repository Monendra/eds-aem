export default function decorate(block) {
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
  
  // Make all slides visible but with opacity 0, except the first one
  slides.forEach((slide, index) => {
    slide.style.opacity = index === 0 ? '1' : '0';
    slide.style.visibility = 'visible';
    slide.style.zIndex = index === 0 ? '1' : '0';
  });

  function goToSlide(index) {
    // Hide current slide
    slides[currentSlide].style.opacity = '0';
    slides[currentSlide].style.zIndex = '0';
    
    // Show new slide
    currentSlide = index;
    slides[currentSlide].style.opacity = '1';
    slides[currentSlide].style.zIndex = '1';
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
} 