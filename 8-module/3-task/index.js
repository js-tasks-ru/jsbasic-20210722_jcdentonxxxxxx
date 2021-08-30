export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    let isProduct = this.cartItems.find((item) => {
      return item.product.id === product.id;
    });
    if (!isProduct) {
      let newProduct = {};
      newProduct.product = product;
      newProduct.count = 1;
      this.cartItems.push(newProduct);
      this.onProductUpdate(newProduct);

    } else {
      isProduct.count++;
      this.onProductUpdate(isProduct);
    }

    console.log(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let targetUpdate = this.cartItems.find((item) => {
      return item.product.id === productId;
    });

    if (!targetUpdate) {
      return;
    }

    targetUpdate.count += amount;

    this.onProductUpdate(targetUpdate);

    if (targetUpdate.count <= 0) {
      let number = this.cartItems.findIndex((item) => {
        return item.product.id === productId;

      });

      this.cartItems.splice(number, 1);
    }

  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalCount += this.cartItems[i].count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalPrice = totalPrice + this.cartItems[i].product.price * this.cartItems[i].count;
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
