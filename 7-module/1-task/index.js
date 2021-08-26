import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.initMenu();

    this.elem.addEventListener('click', this.onClick);
  }


  render() {
    this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">

      </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);

    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    for (let i = 0; i < this.categories.length; i++) {
      ribbonInner.append(createElement(`
        <a href="#" class="ribbon__item" data-id="${this.categories[i].id}">${this.categories[i].name}</a>
      `));

    }
  }

  initMenu() {
    this.elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');
    this.checkScroll();
    this.elem.addEventListener('click', this.moveRibbonInner);
    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', () => {
      this.checkScroll();
    });
  }

  checkScroll() {
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');

    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollLeft = ribbonInner.scrollLeft;
    if (scrollLeft === 0) {
      arrowRight.classList.add('ribbon__arrow_visible');
      arrowLeft.classList.remove('ribbon__arrow_visible');
      return;
    }

    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollRight < 1) {
      arrowLeft.classList.add('ribbon__arrow_visible');
      arrowRight.classList.remove('ribbon__arrow_visible');
      return;
    }

    if (scrollLeft > 0 && scrollRight > 1) {
      arrowRight.classList.add('ribbon__arrow_visible');
      arrowLeft.classList.add('ribbon__arrow_visible');
    }

  }

  moveRibbonInner(e) {
    e.preventDefault();
    let ribbonInner = e.currentTarget.querySelector('.ribbon__inner');
    let currentElem = e.target.closest('.ribbon__arrow');
    if (!currentElem) {
      return;
    }
    if (currentElem.classList.contains('ribbon__arrow_right')) {
      ribbonInner.scrollBy(350, 0);
    }

    if (currentElem.classList.contains('ribbon__arrow_left')) {
      ribbonInner.scrollBy(-350, 0);
    }
  }

  onClick = (e) => {
    e.preventDefault();
    let ribbonItem = e.target.closest('.ribbon__item');
    if (!ribbonItem) {
      return;
    }
    e.currentTarget.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');

    ribbonItem.classList.add('ribbon__item_active');

    let customEvent = new CustomEvent('ribbon-select', {
      detail: ribbonItem.dataset.id,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }

}
