import { ProductModel } from '../models/product.model.js';

export default class ProductDAO {
  async createProduct(data) {
    return await ProductModel.create(data);
  }

  async getAll() {
    return await ProductModel.find();
  }

  async getById(id) {
    return await ProductModel.findById(id);
  }

  async update(id, data) {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}
