import mongoose from "mongoose";
import Cart from "../model/Cart.js";
import "dotenv/config";

export const getCart = async (req, res) => {
  try {
    // userId từ JWT
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId: userId });

    // Trả về phản hồi khi không tìm thấy giỏ hàng
    if (!cart) {
      return res.status(200).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const cartData = {};
    cart.items.forEach((item) => {
      cartData[item.gameId] = item.quantity;
    });

    res.status(200).json({
      cartData,
      totalPrice: cart.totalPrice,
      voucher: cart.voucher,
    });
  } catch (error) {
    res.status(500).json({ message: "Lấy dữ liệu giỏ hàng thất bại" });
  }
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
  try {
    // Lấy userId từ JWT middleware
    const userId = req.user.userId;

    // Nhận gameId và quantity từ body
    const { gameId, quantity = 1 } = req.body || {};

    // Kiểm tra quantity hợp lệ
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty <= 0) {
      return res.status(400).json({ message: "quantity không hợp lệ" });
    }

    // Đảm bảo giỏ hàng tồn tại
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Cộng dồn nếu item đã tồn tại
    const updatedExisting = await Cart.findOneAndUpdate(
      { userId, "items.gameId": gameId },
      { $inc: { "items.$.quantity": qty } }
      // { new: true }
    );

    if (updatedExisting) {
      return res
        .status(200)
        .json({ message: "Đã cập nhật số lượng", cart: updatedExisting });
    }

    // Nếu chưa có thì push item mới
    const updatedNew = await Cart.findOneAndUpdate(
      { userId },
      { $push: { items: { gameId, quantity: qty } } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Đã thêm sản phẩm vào giỏ", cart: updatedNew });
  } catch (error) {
    return res.status(500).json({ message: "Xử lý giỏ hàng thất bại" });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const increaseQuantity = async (req, res) => {
  try {
    const { gameId } = req.body;
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });

    // Tìm ra sản phẩm cần tăng số lượng
    const item = cart.items.find(
      (item) => String(item.gameId) === String(gameId)
    );

    // Tăng số lượng sản phẩm lên +1
    if (item) {
      item.quantity += 1;
    } else {
      await cart.items.push({ gameId, quantity: 1 });
    }

    // Lưu vào database
    await cart.save();

    // Chuẩn hóa dữ liệu trả về thành map tương tự getCartData
    const cartData = {};
    cart.items.forEach((i) => {
      cartData[i.gameId] = i.quantity;
    });

    return res.status(200).json({
      message: "Tăng số lượng thành công",
      cartData,
    });
  } catch (error) {
    res.status(500).json({ error: "Update thất bại" });
  }
};
