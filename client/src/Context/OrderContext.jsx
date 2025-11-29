import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  // Khai báo state
  const [orderDetail, setOrderDetail] = useState({});

  const fetchOrderDetail = async () => {
    const response = await api.get("/user/order/all");
    setOrderDetail(response.data);
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const contextValues = {
    orderDetail,
  };

  return (
    <OrderContext.Provider value={contextValues}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
