// Scroll Animation
const sections = document.querySelectorAll('section');

const fadeInElements = () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('fade-in');
    }
  });
};

window.addEventListener('scroll', fadeInElements);
window.addEventListener('resize', fadeInElements);
window.addEventListener('load', fadeInElements);


// Slideshow
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const showSlide = () => {
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  slides[currentSlide].classList.add('active');
};

const nextSlide = () => {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide();
};

setInterval(nextSlide, 5000);
