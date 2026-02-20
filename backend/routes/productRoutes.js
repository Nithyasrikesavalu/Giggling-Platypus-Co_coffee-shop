import express from 'express';
import {
    getAllProducts,
    getProductById,
    getProductsByType,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

// GET products by type (Coffee/Tea)
router.get('/type/:type', getProductsByType);

// GET single product
router.get('/:id', getProductById);

// POST create product
router.post('/', createProduct);

// PUT update product
router.put('/:id', updateProduct);

// DELETE product
router.delete('/:id', deleteProduct);

export default router;
