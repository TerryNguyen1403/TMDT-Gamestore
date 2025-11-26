import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);

  const fetchTotalUsers = async () => {
    const response = await api.get("/admin/all-users");
    setTotalUsers(response.data.totalUsers);
    setUsers(response.data.users || []);
  };

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  const contextValues = {
    totalUsers,
    users,
    reloadAdmin: fetchTotalUsers,
  };

  return (
    <AdminContext.Provider value={contextValues}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
