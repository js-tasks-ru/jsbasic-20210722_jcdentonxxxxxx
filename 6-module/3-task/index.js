import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.initCarousel(this.checkCount);
    this.elem.addEventListener('click', this.onClick);
  }



  render() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">

        </div>
      </div>
    `);

    let carouselInner = this.elem.querySelector('.carousel__inner');
    for (let i = 0; i < this.slides.length; i++) {
      carouselInner.append(createElement(`
        <div class="carousel__slide" data-id="${this.slides[i].id}">
          <img src="/assets/images/carousel/${this.slides[i].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${this.slides[i].price.toFixed(2)}</span>
            <div class="carousel__title">${this.slides[i].name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `));
    }
  }

  initCarousel(checkFunc) {
    let currentTransform = 0;
    let count = 1;
    // let carousel = this.elem.querySelector('.carousel');
    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let carouselInner = this.elem.querySelector('.carousel__inner');
    let carouselSlides = this.elem.querySelectorAll('.carousel__slide');

    this.checkCount(count, carouselArrowRight, carouselArrowLeft, carouselSlides);

    this.elem.addEventListener('click', function (e) {
      let arrow = e.target.closest('[class^=carousel__arrow]');
      if (!arrow) {
        return;
      }

      carouselInner = this.querySelector('.carousel__inner');
      let width = carouselInner.offsetWidth;


      if (arrow.classList.contains('carousel__arrow_right')) {

        currentTransform += width;
        currentTransform = Math.min(currentTransform, carouselSlides.length * width - width);
        carouselInner.style.transform = `translateX(${-currentTransform}px)`;

        if (count < carouselSlides.length) {
          ++count;
        }

        checkFunc(count, carouselArrowRight, carouselArrowLeft, carouselSlides);

      }

      if (arrow.classList.contains('carousel__arrow_left')) {

        currentTransform -= width;
        currentTransform = Math.max(0, currentTransform);
        carouselInner.style.transform = `translateX(${-currentTransform}px)`;

        if (count > 1) {
          --count;
        }

        checkFunc(count, carouselArrowRight, carouselArrowLeft, carouselSlides);

      }

    });
  }

  checkCount(count, carouselArrowRight, carouselArrowLeft, carouselSlides) {
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


  onClick = (e) => {
    let carouselButton = e.target.closest('.carousel__button');
    if (!carouselButton) {
      return;
    }
    let dataId = carouselButton.closest('[data-id]');

    let customEvent = new CustomEvent('product-add', {
      detail: dataId.dataset.id,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }


}
