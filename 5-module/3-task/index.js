function initCarousel() {
  let currentTransform = 0;
  let count = 1;
  let carousel = document.body.querySelector('.carousel');
  let carouselArrowRight = carousel.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = carousel.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let carouselSlides = carouselInner.querySelectorAll('.carousel__slide');

  checkCount(count, carouselArrowRight, carouselArrowLeft, carouselSlides);

  document.addEventListener('click', function (e) {
    let arrow = e.target.closest('[class^=carousel__arrow]');
    if (!arrow) {
      return;
    }

    carouselInner = document.querySelector('.carousel__inner');
    let width = carouselInner.offsetWidth;


    if (arrow.classList.contains('carousel__arrow_right')) {

      currentTransform += width;
      currentTransform = Math.min(currentTransform, carouselSlides.length * width - width);
      carouselInner.style.transform = `translateX(${-currentTransform}px)`;

      if (count < carouselSlides.length) {
        ++count;
      }

      checkCount(count, carouselArrowRight, carouselArrowLeft, carouselSlides);

    }

    if (arrow.classList.contains('carousel__arrow_left')) {

      currentTransform -= width;
      currentTransform = Math.max(0, currentTransform);
      carouselInner.style.transform = `translateX(${-currentTransform}px)`;

      if (count > 1) {
        --count;
      }

      checkCount(count, carouselArrowRight, carouselArrowLeft, carouselSlides);

    }




  });
}

function checkCount(count, carouselArrowRight, carouselArrowLeft, carouselSlides) {
  if (count === 1) {
    carouselArrowLeft.style.display = 'none';
    carouselArrowRight.style.display = '';
  } else if (count === carouselSlides.length) {
    carouselArrowRight.style.display = 'none';
    carouselArrowLeft.style.display = '';
  } else {
    carouselArrowRight.style.display = '';
    carouselArrowLeft.style.display = '';
  }
}
