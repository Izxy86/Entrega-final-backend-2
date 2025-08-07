import ProductDAO from '../dao/product.dao.js';

const productDAO = new ProductDAO();

export default class ProductRepository {
  async create(data) {
    return await productDAO.createProduct(data);
  }

  async getAll() {
    return await productDAO.getAll();
  }

  async getById(id) {
    return await productDAO.getById(id);
  }

  async update(id, data) {
    return await productDAO.update(id, data);
  }

  async delete(id) {
    return await productDAO.delete(id);
  }
}
