import CartRepository from '../repositories/Cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import TicketRepository from '../repositories/ticket.repository.js';

const cartRepo = new CartRepository();
const productRepo = new ProductRepository();
const ticketRepo = new TicketRepository();

export default class PurchaseService {
  async processPurchase(cartId, user) {
    const cart = await cartRepo.getCart(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    let totalAmount = 0;
    const productsPurchased = [];
    const productsNotAvailable = [];

    for (const item of cart.products) {
      const product = await productRepo.getById(item.product._id);

      if (!product || !product.status) {
        productsNotAvailable.push(item);
        continue;
      }

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();

        totalAmount += product.price * item.quantity;
        productsPurchased.push(item);
      } else {
        productsNotAvailable.push(item);
      }
    }

    cart.products = productsNotAvailable;
    await cart.save();

    if (productsPurchased.length === 0) {
      throw new Error('No hay productos con stock suficiente para comprar');
    }

    const ticket = await ticketRepo.createTicket({
      amount: totalAmount,
      purchaser: user.email
    });

    return {
      ticket,
      notAvailable: productsNotAvailable.map((p) => ({
        product: p.product._id,
        quantity: p.quantity
      }))
    };
  }
}
