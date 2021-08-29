import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();

  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">

      </div>
    `);

    this.addCards();

  }
  addCards() {
    let productsGridInner = createElement(`
        <div class="products-grid__inner">

        </div>
    `);

    let filtredObjects = this.products;

    if (!this.isEmpty(this.filters)) {

      filtredObjects = this.products.filter((item) => {
        let bool = [];
        if (this.filters.vegeterianOnly) {
          if (item.vegeterian) {
            bool.push(true);
          } else {
            bool.push(false);
          }
        }

        if (this.filters.maxSpiciness) {
          if (item.spiciness <= this.filters.maxSpiciness) {
            bool.push(true);
          } else {
            bool.push(false);
          }
        }

        if (this.filters.category) {
          if (item.category === this.filters.category) {
            bool.push(true);
          } else {
            bool.push(false);
          }
        }

        if ("noNuts" in this.filters) {
          if (this.filters.noNuts) {
            bool.push(!!item.nuts === false);
          }
        }

        if (!bool.includes(false)) {
          return true;
        }


      });
    }


    for (let i = 0; i < filtredObjects.length; i++) {
      let productCard = new ProductCard(filtredObjects[i]);
      productsGridInner.append(productCard.elem);
    }
    this.elem.append(productsGridInner);
  }

  updateFilter(filters) {
    this.elem.querySelector('.products-grid__inner').remove();
    Object.assign(this.filters, filters);
    this.addCards();
  }

  isEmpty(obj) {
    for (const key in obj) {
      return false;
    }
    return true;
  }


}
