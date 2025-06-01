export default function decorate(block) {
  const rows = [...block.children];
  
  [...block.children].forEach((row, r) => {
    if (r === 0) {
      // Create next button
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('btn', 'btn-next');
      const nextNode = document.createTextNode('Next');
      nextBtn.append(nextNode);
      row.replaceWith(nextBtn);
    } else if (r === rows.length - 1) {
      // Create previous button
      const prevBtn = document.createElement('button');
      prevBtn.classList.add('btn', 'btn-prev');
      const prevNode = document.createTextNode('Previous');
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
  const contentSlides = [...block.querySelectorAll('.slide')];

  function goToSlide(index) {
    contentSlides[currentSlide].style.opacity = '0';
    currentSlide = index;
    contentSlides[currentSlide].style.opacity = '1';
  }

  // Add click handlers for navigation buttons
  const nextButton = block.querySelector('.btn-next');
  const prevButton = block.querySelector('.btn-prev');

  nextButton.addEventListener('click', () => {
    const nextIndex = (currentSlide + 1) % contentSlides.length;
    goToSlide(nextIndex);
  });

  prevButton.addEventListener('click', () => {
    const prevIndex = (currentSlide - 1 + contentSlides.length) % contentSlides.length;
    goToSlide(prevIndex);
  });
} 