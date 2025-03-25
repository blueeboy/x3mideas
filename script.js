const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const thumbnails = document.querySelectorAll(".thumb");

let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider(index) {
  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateActiveThumbnail();
}

function updateActiveThumbnail() {
  thumbnails.forEach((thumb, index) => {
    if (index === currentIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

// Previous Button
prevButton.addEventListener("click", () => {
  updateSlider(currentIndex - 1);
});

// Next Button
nextButton.addEventListener("click", () => {
  updateSlider(currentIndex + 1);
});

// Pagination Click
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateSlider(index);
  });
});

// Hover Previews
prevButton.addEventListener("mouseover", () => {
  const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
  prevButton.style.backgroundImage = `url(${thumbnails[prevIndex].src})`;
  prevButton.style.backgroundSize = "cover";
});

nextButton.addEventListener("mouseover", () => {
  const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
  nextButton.style.backgroundImage = `url(${thumbnails[nextIndex].src})`;
  nextButton.style.backgroundSize = "cover";
});

// Remove Hover Previews
prevButton.addEventListener("mouseleave", () => {
  prevButton.style.backgroundImage = "";
});

nextButton.addEventListener("mouseleave", () => {
  nextButton.style.backgroundImage = "";
});

// Initialize active thumbnail
updateActiveThumbnail();






let index = 0;
let direction = 1; // 1 for left, -1 for right
const carousel = document.querySelector(".carousel");
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

function updateSlide() {
  carousel.style.transform = `translateX(${-index * 26}%)`; // 200px card + 10px margin
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
});
}

function nextSlide() {
  clearInterval(autoSlideInterval);
  if (direction === -1) {
    direction = 1;
    index = 0; // Reset to start
  } else {
    index = Math.min(index + 1, 1);
  }
  updateSlide();
  restartAutoSlide();
}

function prevSlide() {
  clearInterval(autoSlideInterval);
  if (direction === 1) {
    direction = -1;
    index = 1; // Reset to last
  } else {
    index = Math.max(index - 1, 0);
  }
  updateSlide();
  restartAutoSlide();
}

function autoSlide() {
  if (direction === 1) {
    index = 1;
    direction = -1;
  } else {
    index = 0;
    direction = 1;
  }
  updateSlide();
}

function restartAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 5000);
}

restartAutoSlide();
