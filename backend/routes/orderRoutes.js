import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderByNumber,
    updateOrderStatus,
    deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// POST create order
router.post('/', createOrder);

// GET all orders
router.get('/', getAllOrders);

// GET single order by order number
router.get('/:orderNumber', getOrderByNumber);

// PUT update order status
router.put('/:orderNumber/status', updateOrderStatus);

// DELETE order
router.delete('/:orderNumber', deleteOrder);

export default router;
