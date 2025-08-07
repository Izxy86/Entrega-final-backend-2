import ProductService from '../services/product.service.js';
import { ProductDTO } from '../dtos/product.dto.js';

const productService = new ProductService();

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.create(req.body);
    const safeProduct = new ProductDTO(newProduct);
    res.status(201).json({ status: 'success', product: safeProduct });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    const safeProducts = products.map((p) => new ProductDTO(p));
    res.status(200).json({ status: 'success', products: safeProducts });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.pid);
    if (!product)
      return res
        .status(404)
        .json({ status: 'error', message: 'Producto no encontrado' });
    const safeProduct = new ProductDTO(product);
    res.status(200).json({ status: 'success', product: safeProduct });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProduct(
      req.params.pid,
      req.body
    );
    if (!updated)
      return res
        .status(404)
        .json({ status: 'error', message: 'Producto no encontrado' });

    const safe = new ProductDTO(updated);
    res.status(200).json({ status: 'success', product: safe });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.pid);
    if (!deleted)
      return res
        .status(404)
        .json({ status: 'error', message: 'Producto no encontrado' });

    res.status(200).json({ status: 'success', message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
