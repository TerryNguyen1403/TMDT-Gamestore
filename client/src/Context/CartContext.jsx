import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    // Đọc token tại thời điểm gọi để tránh dùng token cũ sau khi logout
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      // Dùng interceptor để thêm Authorization nếu có token
      const response = await api.get("/cart");
      const { cartData } = response.data;
      return cartData;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await fetchCart();
      if (!cartData) {
        setCartItems([]);
        return;
      }
      const normalized = Object.keys(cartData).map((id) => ({
        id,
        quantity: cartData[id],
      }));
      setCartItems(normalized);
    };

    loadCart();
  }, []);

  // Cho phép component bên ngoài trigger load lại giỏ hàng từ DB
  const reloadCart = async () => {
    const cartData = await fetchCart();
    if (!cartData) {
      setCartItems([]);
      return;
    }
    const normalized = Object.keys(cartData).map((id) => ({
      id,
      quantity: cartData[id],
    }));
    setCartItems(normalized);
  };

  // Cập nhật số lượng real-time thông qua API
  const increaseQuantity = async (id) => {
    try {
      const res = await api.patch("/cart/increase", {
        gameId: id,
      });
      const cartData = res?.data?.cartData;
      if (cartData && typeof cartData === "object") {
        const normalized = Object.keys(cartData).map((gid) => ({
          id: gid,
          quantity: cartData[gid],
        }));
        setCartItems(normalized);
      } else {
        // fallback: refetch
        await reloadCart();
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  // Thêm vào giỏ hàng theo logic tham khảo (local state) + sync real-time
  const addToCart = async (item) => {
    if (!item) return;
    const id = item.id || item._id || item;
    if (!id) return;

    try {
      // Đã đăng nhập: gọi API theo contract server
      await api.post("/cart/add", { gameId: id });

      // Sau khi thêm, đồng bộ lại giỏ hàng từ server để đảm bảo đúng shape
      await reloadCart();
    } catch (error) {
      console.error(error.message);
    }
  };

  const decreaseQuantity = async (gameId) => {
    try {
      // Gọi API giảm số lượng
      await api.patch("/cart/decrease", {
        gameId: gameId,
      });

      // Reload giỏ hàng
      await reloadCart();
    } catch (error) {
      console.error("Lỗi khi giảm số lượng: ", error?.message);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const deleteFromCart = async (gameId) => {
    try {
      // Gọi API xóa sản phẩm
      await api.delete("/cart/delete", {
        data: { gameId },
      });

      // Reload giỏ hàng
      await reloadCart();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm: ", error?.message);
    }
  };

  // Lấy ra tổng tiền của sản phẩm
  const getTotalAmount = async () => {
    try {
      const response = await api.get("/cart/total");

      await reloadCart();

      return response.data.totalAmount;
    } catch (error) {
      console.error(`Lỗi khi tính tổng tiền của giỏ hàng: ${error.message}`);
    }
  };

  // Lấy ra số lượng sản phẩm trong giỏ hàng
  const getTotalItems = async () => {
    try {
      const response = await api.get("/cart");

      await reloadCart();
      return response.data.cartData;
    } catch (error) {
      console.error(`Lỗi khi lấy tổng sản phẩm của giỏ hàng: ${error.message}`);
    }
  };

  const contextValues = {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    getTotalAmount,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={{ contextValues }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
