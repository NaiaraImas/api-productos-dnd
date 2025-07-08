import { Router } from 'express';
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller.js'; 
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';

const router = Router();

// Rutas públicas
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Rutas protegidas solo para admins
router.post('/', verifyToken, checkAdmin, createProduct);
router.put('/:id', verifyToken, checkAdmin, updateProduct);
router.delete('/:id', verifyToken, checkAdmin, deleteProduct);

export default router;