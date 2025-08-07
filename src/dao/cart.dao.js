import { CartModel } from '../models/cart.model.js';

export default class CartDAO {
  async createCart() {
    return await CartModel.create({ products: [] });
  }

  async getCartById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async addProductToCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: productId });
    }

    return await cart.save();
  }
}
