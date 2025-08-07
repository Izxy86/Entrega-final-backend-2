import CartService from '../services/cart.service.js';
import { CartDTO } from '../dtos/cart.dto.js';
const cartService = new CartService();

export const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    const safeCart = new CartDTO(cart);
    res.status(200).json({ status: 'success', cart: safeCart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.addProduct(cid, pid);
    res.status(200).json({ status: 'success', cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
