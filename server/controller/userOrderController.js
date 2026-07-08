import Game from "../model/Game.js";
import Order from "../model/Order.js";

export const allOrders = async (req, res) => {
  // Lấy ra userId từ JWT
  const userId = req.user?.userId;

  // Tìm đơn hàng theo userId
  const orders = await Order.find({ userId: userId });

  // lấy ra chi tiết game từ gameId ở Order
  const ordersWithDetails = await Promise.all(
    orders.map(async (order) => {
      const detail = await Promise.all(
        (order.items || []).map(async (item) => {
          const game = await Game.findById(item.gameId);
          return {
            ...(item?._doc || item),
            gameName: game?.gameName,
            image: game?.image,
          };
        })
      );
      return { order, detail };
    })
  );

  res.status(200).json({
    orders: ordersWithDetails,
  });
};
