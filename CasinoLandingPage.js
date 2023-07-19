const sliderContainer = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const slideWidth = slides[0].offsetWidth;
let currentPosition = 0;
let direction = 1;
let isTransitioning = false;
let intervalId = setInterval(nextSlide, 5000); // Initial transition every 5 seconds (adjust as needed)

function slideTo(index) {
  const newPosition = -slideWidth * index;
  sliderContainer.style.transition = 'transform 0.8s ease-in-out';
  sliderContainer.style.transform = `translateX(${newPosition}px)`;
  currentPosition = index;
}

function nextSlide() {
  if (!isTransitioning) {
    currentPosition += direction;

    if (currentPosition < 0) {
      currentPosition = 1;
      direction = 1;
    } else if (currentPosition > slides.length - 1) {
      currentPosition = slides.length - 2;
      direction = -1;
    }

    isTransitioning = true;
    slideTo(currentPosition);
  }
}

function setActiveDot(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function handleDotClick(index) {
  clearInterval(intervalId); // Clear the existing interval
  slideTo(index);
  setActiveDot(index);
  intervalId = setInterval(nextSlide, 5000); // Set a new interval after clicking the dot
}

// Call setActiveDot initially to set the active dot when the page loads
setActiveDot(currentPosition);

// Detect when the transition is complete to update the dot
sliderContainer.addEventListener('transitionend', () => {
  isTransitioning = false;
  setActiveDot(currentPosition);
});
