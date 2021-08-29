import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {
        once: true
      });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth <= 0) {
      return;
    }
    if (!this.initialBlock) {
      this.initialBlock = {};
      this.initialBlock.top = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    if (window.innerWidth <= 767) {
      this.elem.style.position = 'absolute';
      this.elem.style.top = '';
      this.elem.style.zIndex = '';
      return;
    }

    if (window.pageYOffset > this.initialBlock.top) {
      this.elem.style.position = 'fixed';
      this.elem.style.top = 50 + 'px';
      this.elem.style.zIndex = 1000;
      let containerCheck = document.querySelector('.container');
      let left = containerCheck.getBoundingClientRect().right + 20;
      let right = document.documentElement.clientWidth - this.elem.offsetWidth - 10;


      if (left > right) {
        left = right;
      }
      this.elem.style.left = left + 'px';

    } else {
      this.elem.style.position = 'absolute';
      this.elem.style.top = '';
      this.elem.style.zIndex = '';
      this.elem.style.left = '';
    }





  }
}
