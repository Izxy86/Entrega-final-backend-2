import CartRepository from '../repositories/Cart.repository.js';

const cartRepo = new CartRepository();

export default class CartService {
  async createCart() {
    return await cartRepo.createCart();
  }

  async getCartById(id) {
    return await cartRepo.getCartById(id);
  }

  async addProduct(cartId, productId) {
    return await cartRepo.addProduct(cartId, productId);
  }
}
