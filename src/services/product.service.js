import ProductRepository from '../repositories/product.repository.js';

const productRepo = new ProductRepository();

export default class ProductService {
  async create(data) {
    return await productRepo.create(data);
  }

  async getAll() {
    return await productRepo.getAll();
  }

  async getById(id) {
    return await productRepo.getById(id);
  }

  async updateProduct(id, data) {
    return await productRepo.update(id, data);
  }

  async deleteProduct(id) {
    return await productRepo.delete(id);
  }
}
