import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { useMemo, useState, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

const AdminOrders = ({ orders = [], totalOrders }) => {
  const { updateOrderStatus } = useContext(AdminContext) || {};
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editStatus, setEditStatus] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Định nghĩa status: 0=chờ xác nhận, 1=đã xác nhận, 2=đang giao, 3=đã giao, 4=đã huỷ
  const STATUS_MAP = {
    0: { label: "Chờ thanh toán", color: "#ffc107", key: "pending" },
    1: { label: "Đã thanh toán", color: "#0dcaf0", key: "confirmed" },
  };

  const getStatusBadgeColor = (status) => {
    return STATUS_MAP[status]?.color || "#6c757d";
  };

  const getStatusLabel = (status) => {
    return STATUS_MAP[status]?.label || `Status ${status}`;
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = async () => {
    if (editStatus === selectedOrder.status) {
      setShowDetailModal(false);
      return;
    }

    setUpdateLoading(true);
    try {
      // Gọi hàm từ context để cập nhật trạng thái
      await updateOrderStatus(selectedOrder._id, editStatus);
      
      alert("Cập nhật trạng thái thành công!");
      setShowDetailModal(false);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    } finally {
      setUpdateLoading(false);
    }
  };

  const formattedOrders = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      totalQuantity: order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0,
      gameNames: order.items?.map((item) => item.gameName).join(", ") || "N/A",
      // Xử lý lỗi date - lấy createdAt hoặc created_at
      displayDate: order.createdAt || order.created_at,
    }));
  }, [orders]);

  const calculateSubtotal = (items) => {
    return items?.reduce((sum, item) => {
      const itemPrice = item.price || 0;
      const discount = item.discount || 0;
      const discountAmount = (itemPrice * discount) / 100;
      return sum + (itemPrice - discountAmount) * (item.quantity || 1);
    }, 0) || 0;
  };

  return (
    <Card className="shadow-sm border-0 p-4">
      <h4 className="fw-bold mb-3">Quản lý đơn hàng</h4>

      <Table responsive hover>
        <thead className="table-light">
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên khách hàng</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {formattedOrders.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-muted">
                (Chưa có đơn hàng)
              </td>
            </tr>
          ) : (
            formattedOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  <span style={{ fontFamily: "monospace" }}>
                    {order._id?.substring(0, 8)}...
                  </span>
                </td>
                <td>{order.userId?.userName || "N/A"}</td>
                <td title={order.gameNames}>{order.gameNames}</td>
                <td>{order.totalQuantity}</td>
                <td>{order.totalAmount?.toLocaleString("vi-VN")} VNĐ</td>
                <td>
                  <span
                    style={{
                      backgroundColor: getStatusBadgeColor(order.status),
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td>{new Date(order.displayDate).toLocaleDateString("vi-VN")}</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => handleViewDetail(order)}
                  >
                    Xem chi tiết
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {formattedOrders.length > 0 && (
        <div className="mt-3 p-3 bg-light rounded">
          <strong>Tổng cộng:</strong> {totalOrders || orders.length} đơn hàng
        </div>
      )}

      {/* Modal Chi tiết đơn hàng */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              {/* Thông tin cơ bản */}
              <div className="mb-4 p-3 bg-light rounded">
                <h6 className="fw-bold mb-2">Thông tin đơn hàng</h6>
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">Mã đơn hàng:</small>
                    <p className="mb-2 fw-bold">{selectedOrder._id}</p>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Ngày tạo:</small>
                    <p className="mb-2 fw-bold">
                      {new Date(selectedOrder.createdAt || selectedOrder.created_at).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thông tin khách hàng */}
              <div className="mb-4 p-3 bg-light rounded">
                <h6 className="fw-bold mb-2">Thông tin khách hàng</h6>
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">Tên khách hàng:</small>
                    <p className="mb-2">{selectedOrder.userId?.userName || "N/A"}</p>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Email:</small>
                    <p className="mb-2">{selectedOrder.userId?.email || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Danh sách sản phẩm */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Danh sách sản phẩm</h6>
                <Table size="sm" bordered>
                  <thead className="table-light">
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Giảm giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, idx) => {
                      const itemPrice = item.price || 0;
                      const discount = item.discount || 0;
                      const discountAmount = (itemPrice * discount) / 100;
                      const priceAfterDiscount = itemPrice - discountAmount;
                      const totalPrice = priceAfterDiscount * (item.quantity || 1);

                      return (
                        <tr key={idx}>
                          <td>{item.gameName}</td>
                          <td>{itemPrice.toLocaleString("vi-VN")} VNĐ</td>
                          <td>{discount}%</td>
                          <td className="text-center">{item.quantity || 1}</td>
                          <td className="fw-bold">
                            {totalPrice.toLocaleString("vi-VN")} VNĐ
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              {/* Tính toán tổng tiền */}
              <div className="mb-4 p-3 bg-light rounded">
                <div className="row">
                  <div className="col-md-8 text-end">
                    <small className="text-muted">Tổng phụ:</small>
                    <p className="mb-2">
                      {calculateSubtotal(selectedOrder.items).toLocaleString("vi-VN")} VNĐ
                    </p>
                  </div>
                  <div className="col-md-4 text-end">
                    <small className="text-muted"></small>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-8 text-end">
                    <strong>Tổng tiền:</strong>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold text-danger">
                      {selectedOrder.totalAmount?.toLocaleString("vi-VN")} VNĐ
                    </h6>
                  </div>
                </div>
              </div>

              {/* Trạng thái đơn hàng */}
              <div className="mb-4 p-3 bg-light rounded">
                <h6 className="fw-bold mb-3">Trạng thái đơn hàng</h6>
                <div className="mt-2 mb-3">
                  <small className="text-muted d-block mb-2">Trạng thái hiện tại:</small>
                  <span
                    style={{
                      backgroundColor: getStatusBadgeColor(selectedOrder.status),
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      display: "inline-block",
                    }}
                  >
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
                {selectedOrder.status === 0 && (
                  <div
                    style={{
                      borderTop: "2px solid #0dcaf0",
                      paddingTop: "16px",
                      marginTop: "16px",
                    }}
                  >
                    <p className="text-muted small mb-3">
                      Xác nhận đơn hàng này đã thanh toán thành công từ phía khách hàng
                    </p>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() => setEditStatus(1)}
                      className="w-100"
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        padding: "10px 20px",
                        borderRadius: "6px",
                      }}
                    >
                      ✓ Xác nhận đã thanh toán
                    </Button>
                  </div>
                )}
                {selectedOrder.status === 1 && (
                  <div
                    style={{
                      borderTop: "2px solid #198754",
                      paddingTop: "16px",
                      marginTop: "16px",
                      textAlign: "center",
                    }}
                  >
                    <p className="text-success fw-bold mb-0">
                      ✓ Đơn hàng đã xác nhận thanh toán
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailModal(false)}
          >
            Đóng
          </Button>
          {editStatus !== selectedOrder?.status && (
            <Button
              variant="primary"
              onClick={handleStatusUpdate}
              disabled={updateLoading}
            >
              {updateLoading ? "Đang cập nhật..." : "Lưu thay đổi"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default AdminOrders;
