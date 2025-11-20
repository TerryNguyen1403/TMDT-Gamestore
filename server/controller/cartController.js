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

    // Nhận gameId từ body
    const { gameId } = req.body || {};

    // Đảm bảo giỏ hàng tồn tại
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Tìm xem sản phẩm đã có trong giỏ chưa
      const isExistItem = cart.items.find(
        (item) => String(item.gameId) === String(gameId)
      );
      if (isExistItem) {
        // Nếu tồn tại thì cập nhật số lượng
        await Cart.findOneAndUpdate(
          {
            userId,
            "items.gameId": gameId,
          },
          {
            $inc: { "items.$.quantity": 1 },
          }
        );
      } else {
        // Nếu chưa có thì thêm mới
        cart.items.push({
          gameId: gameId,
          quantity: 1,
        });

        await cart.save();
      }
    } else {
      // Nếu chưa có giỏ hàng thì tạo mới
      await Cart.create({
        userId: userId,
        items: {
          gameId: gameId,
          quantity: 1,
        },
      });
    }

    return res.status(201).json({ message: "Đã thêm sản phẩm vào giỏ" });
  } catch (error) {
    return res.status(500).json({ message: "Xử lý giỏ hàng thất bại" });
  }
};

// Tăng số lượng sản phẩm trong giỏ hàng
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
      // Nếu chưa có sản phẩm thì set mặc định là 1
      await cart.items.push({ gameId, quantity: 1 });
    }

    // Lưu vào database
    await cart.save();

    // Chuẩn hóa dữ liệu trả về
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

// Giảm số lượng sản phẩm
export const decreaseQuantity = async (req, res) => {
  try {
    // Lấy userId từ JWT
    const userId = req.user.userId;

    // lấy gameId từ body
    const { gameId } = req.body || {};

    // Lấy giỏ hàng theo userId
    const cart = await Cart.findOne({ userId });

    // Tìm ra sản phẩm cần giảm số lượng
    const item = cart.items.find(
      (item) => String(item.gameId) === String(gameId)
    );

    // Giảm số lượng sản phẩm
    if (item) {
      // Nếu quantity < 1 thì xóa khỏi giỏ hàng
      if (item.quantity <= 1) {
        cart.items = cart.items.filter(
          (item) => String(item.gameId) !== String(gameId)
        );
      } else {
        item.quantity -= 1;
      }
    }

    // Lưu vào database
    await cart.save();

    // Chuẩn hóa dữ liệu
    const cartData = {};
    cart.items.forEach((item) => {
      cartData[item.gameId] = item.quantity;
    });

    return res.status(200).json({
      message: "Giảm số lượng thành công",
      cartData,
    });
  } catch (error) {
    res.status(500).json({ error: "Update thất bại" });
  }
};
