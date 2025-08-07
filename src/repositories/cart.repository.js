import CartDAO from '../dao/cart.dao.js';

const cartDAO = new CartDAO();

export default class CartRepository {
  async addProduct(cartId, productId) {
    return await cartDAO.addProductToCart(cartId, productId);
  }

  async createCart() {
    return await cartDAO.createCart();
  }

  async getCart(id) {
    return await cartDAO.getCartById(id);
  }
}
