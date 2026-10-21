let slideIndex = 1;
    let transitionTimeout;
    let autoplay;

    const slideshow = document.querySelector(".slideshow-container");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    showSlides();
    startAutoplay();

    // Pause while the pointer is over the slideshow
    slideshow.addEventListener("mouseenter", stopAutoplay);
    slideshow.addEventListener("mouseleave", startAutoplay);

    function startAutoplay() {
      if (reduceMotion) return;
      clearInterval(autoplay);
      autoplay = setInterval(() => plusSlides(1), 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplay);
    }

    function restartAutoplay() {
      startAutoplay();
    }

    function plusSlides(n) {
      const slides = document.getElementsByClassName("mySlides");

      // If a transition is still running, finish it first
      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = i === slideIndex - 1 ? "block" : "none";
          slides[i].classList.remove("slide-in-right", "slide-in-left", "slide-out-right", "slide-out-left");
        }
      }

      const previousIndex = slideIndex - 1;
      slideIndex = (slideIndex - 1 + n + slides.length) % slides.length + 1;
      const nextIndex = slideIndex - 1;
      const direction = n > 0 ? "right" : "left";

      slides[previousIndex].style.display = "block";
      slides[previousIndex].classList.add(`slide-out-${direction === "right" ? "left" : "right"}`);
      slides[nextIndex].style.display = "block";
      slides[nextIndex].classList.add(`slide-in-${direction}`);

      transitionTimeout = setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = i === nextIndex ? "block" : "none";
          slides[i].classList.remove("slide-in-right", "slide-in-left", "slide-out-right", "slide-out-left");
        }
        transitionTimeout = undefined;
      }, 500);
    }

    function showSlides() {
      const slides = document.getElementsByClassName("mySlides");
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[slideIndex - 1].style.display = "block";
    }