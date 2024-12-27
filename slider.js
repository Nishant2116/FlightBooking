function createSlider(sliderSelector, leftBtnSelector, rightBtnSelector, cardSelector, visibleCards = 2) {
  const slider = document.querySelector(sliderSelector);
  const leftBtn = document.querySelector(leftBtnSelector);
  const rightBtn = document.querySelector(rightBtnSelector);

  let currentScroll = 0;

  function scrollSlider(direction) {
    const cardWidth = slider.querySelector(cardSelector).offsetWidth + 20; // Card width + gap
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    currentScroll += direction * cardWidth * visibleCards; // Adjust for the specified number of visible cards
    currentScroll = Math.max(0, Math.min(currentScroll, maxScroll)); // Clamp value between 0 and maxScroll
    slider.style.transform = `translateX(-${currentScroll}px)`;
  }

  leftBtn.addEventListener('click', () => scrollSlider(-1));
  rightBtn.addEventListener('click', () => scrollSlider(1));
}

// Initialize sliders
createSlider('.packages-slider', '.left-btn', '.right-btn', '.package-card'); // Default 2 cards at a time
createSlider('.testimonials-slider', '.left-button', '.right-button', '.testimonial-card', 3); // 3 cards at a time
