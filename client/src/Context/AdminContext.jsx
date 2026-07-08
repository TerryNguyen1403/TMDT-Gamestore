import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  // Users
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);

  // Games
  const [totalGames, setTotalGames] = useState(0);
  const [games, setGames] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(false);
  const [adminError, setAdminError] = useState(null);

  // Platforms & Genres
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);

  // Orders
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchTotalUsers = async () => {
    try {
      const response = await api.get("/admin/all-users");
      setTotalUsers(response.data.totalUsers);
      setUsers(response.data.users || []);
    } catch (err) {
      console.error("fetchTotalUsers error:", err);
    }
  };

  const fetchTotalGames = async () => {
    setLoadingAdmin(true);
    setAdminError(null);
    try {
      const response = await api.get("/game/all");
      setTotalGames(response.data.totalGames);
      setGames(response.data.games || []);
    } catch (err) {
      setAdminError(err.response?.data?.message || err.message);
      console.error("fetchTotalGames error:", err);
    } finally {
      setLoadingAdmin(false);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const res = await api.get("/game/platforms/list/all");
      setPlatforms(res.data || []);
    } catch (err) {
      console.error("fetchPlatforms error:", err);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await api.get("/game/genres/list/all");
      setGenres(res.data || []);
    } catch (err) {
      console.error("fetchGenres error:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/all");
      setOrders(res.data || []);
      setTotalOrders((res.data || []).length);
    } catch (err) {
      console.error("fetchOrders error:", err);
    }
  };

  // CREATE game (admin only)
  const createGame = async (payload) => {
    try {
      const res = await api.post("/admin/games", payload);
      setGames((prev) => [res.data, ...prev]);
      setTotalGames((prev) => prev + 1);
      return res.data;
    } catch (err) {
      console.error("createGame error:", err);
      throw err;
    }
  };

  // UPDATE game (admin only)
  const updateGame = async (id, payload) => {
    try {
      const res = await api.put(`/admin/games/${id}`, payload);
      setGames((prev) => prev.map((g) => (g._id === id ? res.data : g)));
      return res.data;
    } catch (err) {
      console.error("updateGame error:", err);
      throw err;
    }
  };

  // DELETE game (admin only)
  const deleteGame = async (id) => {
    try {
      await api.delete(`/admin/games/${id}`);
      setGames((prev) => prev.filter((g) => g._id !== id));
      setTotalGames((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("deleteGame error:", err);
      throw err;
    }
  };

  // UPDATE order status (admin only)
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await api.put(`/orders/${orderId}/status`, { status });
      // Cập nhật state ngay lập tức
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data : o))
      );
      return res.data;
    } catch (err) {
      console.error("updateOrderStatus error:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalGames();
    fetchPlatforms();
    fetchGenres();
    fetchOrders();
  }, []);

  const contextValues = {
    // users
    totalUsers,
    users,
    reloadAdmin: fetchTotalUsers,
    // games
    totalGames,
    games,
    fetchTotalGames,
    createGame,
    updateGame,
    deleteGame,
    // platforms & genres
    platforms,
    genres,
    fetchPlatforms,
    fetchGenres,
    // orders
    orders,
    totalOrders,
    fetchOrders,
    updateOrderStatus,
    // meta
    loadingAdmin,
    adminError,
  };

  return (
    <AdminContext.Provider value={contextValues}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
