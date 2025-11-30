import Order from "../model/Order.js";

// GET all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "userName email")
      .sort({ createdAt: -1 });

    // Xử lý dữ liệu cũ (created_at) để tương thích
    const formattedOrders = orders.map((order) => {
      const orderObj = order.toObject();
      // Nếu có created_at nhưng không có createdAt, dùng created_at
      if (!orderObj.createdAt && orderObj.created_at) {
        orderObj.createdAt = orderObj.created_at;
      }
      if (!orderObj.updatedAt && orderObj.updated_at) {
        orderObj.updatedAt = orderObj.updated_at;
      }
      return orderObj;
    });

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate(
      "userId",
      "userName email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Xử lý dữ liệu cũ (created_at) để tương thích
    const orderObj = order.toObject();
    if (!orderObj.createdAt && orderObj.created_at) {
      orderObj.createdAt = orderObj.created_at;
    }
    if (!orderObj.updatedAt && orderObj.updated_at) {
      orderObj.updatedAt = orderObj.updated_at;
    }

    res.json(orderObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    let { status } = req.body;

    // Chuyển đổi status thành số nếu cần
    if (typeof status === "string") {
      status = parseInt(status);
    }

    // Kiểm tra status hợp lệ (0-4)
    const validStatuses = [0, 1, 2, 3, 4];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status phải là một trong: ${validStatuses.join(", ")}`,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("userId", "userName email");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Order status updated:", orderId, "->", status);
    res.json(updatedOrder);
  } catch (error) {
    console.error("Update order status error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
