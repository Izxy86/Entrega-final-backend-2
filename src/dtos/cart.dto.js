export class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.products = cart.products.map((p) => ({
      id: p.product._id,
      title: p.product.title,
      quantity: p.quantity,
      price: p.product.price
    }));
  }
}
