import { Response } from 'express';
import Order from '../models/Order';
import { AuthRequest } from '../middlewares/auth';

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
export const addOrderItems = async (req: AuthRequest, res: Response) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      user: req.user?._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, order: createdOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if user is admin or the order belongs to the user
    if ((order.user as any)._id.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.status(200).json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.status(200).json({ success: true, order: updatedOrder });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?._id });
    res.status(200).json({ success: true, orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json({ success: true, orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
