import Order from "../models/order.model.js";
import Stripe from "stripe";
import razorpay from "razorpay";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const currency = "inr";
const delivery_fee = 10;

let stripeOrderData = {};
let razorpayOrderData = {};

export const placeOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    await Order.create(orderData);

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    stripeOrderData = orderData;

    const lineItems = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true`,
      cancel_url: `${origin}/verify?success=false`,
      line_items: lineItems,
      mode: "payment",
    });

    res.json({
      success: true,
      message: "Order Placed",
      session_url: session.url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    razorpayOrderData = orderData;

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { success } = req.body;

    if (Boolean(success)) {
      await Order.create(stripeOrderData);
    } else {
      return res.json({ success: false, message: "Failed Payment" });
    }

    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (!orderInfo)
      return res.json({ success: false, message: "Payment Failed" });

    if (orderInfo.status === "paid") {
      await Order.create(razorpayOrderData);
      res.json({ success: true, message: "Order Placed" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const toggleOrderState = async (req, res) => {
  try {
    const { orderId, orderState } = req.body;

    const order = await Order.findById(orderId);

    if (!order) return res.json({ success: false, message: "Order not found" });

    await Order.findByIdAndUpdate(orderId, { status: orderState });

    res.json({ success: true, message: "Order Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
