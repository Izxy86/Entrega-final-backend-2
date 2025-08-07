import PurchaseService from '../services/purchase.service.js';
const purchaseService = new PurchaseService();

export const purchaseCart = async (req, res) => {
  try {
    const result = await purchaseService.processPurchase(
      req.params.cid,
      req.user
    );

    res.status(200).json({
      status: 'success',
      message: 'Compra realizada con éxito',
      ticket: result.ticket,
      productosSinStock: result.notAvailable
    });
  } catch (error) {
    const statusCode = error.message.includes('stock') ? 400 : 500;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};
