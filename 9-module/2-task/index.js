import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {}

  async render() {

    this.carousel = new Carousel(slides);
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonHolder = document.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let sliderHolder = document.querySelector('[data-slider-holder]');
    sliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let url = 'products.json';
    let response = await fetch(url);
    this.products = await response.json();
    this.productsGrid = await new ProductsGrid(this.products);
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.querySelector('.products-grid').remove();
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });


    document.body.addEventListener('product-add', (e) => {
      let product = this.products.find(item => e.detail == item.id);
      this.cart.addProduct(product);
    });


    this.stepSlider.elem.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({
        category: e.detail
      });
    });



    document.body.addEventListener('change', (e) => {
      let checkbox = e.target.closest('[type="checkbox"]');


      if (checkbox.id === `nuts-checkbox`) {
        this.productsGrid.updateFilter({
          noNuts: checkbox.checked
        });
      }

      if (checkbox.id === `vegeterian-checkbox`) {
        this.productsGrid.updateFilter({
          vegeterianOnly: checkbox.checked
        });
      }
    });
  }
}
