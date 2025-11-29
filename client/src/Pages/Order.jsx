import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  Container,
  Table,
  Badge,
  Button,
  Alert,
  Image,
  Row,
  Col,
} from "react-bootstrap";

// Import context
import { OrderContext } from "../Context/OrderContext";

// Import utils
import { formatPrice } from "../utils/formatPrice";

const Order = () => {
  // Sử dụng context
  const { orderDetail } = useContext(OrderContext);

  // Safety check: Đảm bảo dữ liệu tồn tại
  const orders = Array.isArray(orderDetail?.orders) ? orderDetail.orders : [];

  return (
    <Container className="py-5">
      <h2
        className="mb-4"
        style={{ borderLeft: "4px solid #ff6b35", paddingLeft: "10px" }}
      >
        Lịch sử đơn hàng
      </h2>

      {/* Kiểm tra nếu không có đơn hàng */}
      {orders.length === 0 ? (
        <div className="text-center p-5 shadow-sm">
          <div className="fs-1 mb-3">📦</div>
          <p className="fs-5">Bạn chưa có đơn hàng nào</p>
          <Link to="/" style={{ color: "#ff6b35", fontWeight: "bold" }}>
            Quay lại mua sắm ngay
          </Link>
        </div>
      ) : (
        /* Bảng danh sách đơn hàng */
        <div className="shadow-sm rounded overflow-hidden border">
          <Table responsive hover className="mb-0">
            {/* Header */}
            <thead className="table-light">
              <tr>
                <th className="text-center" style={{ width: "5%" }}>
                  STT
                </th>
                <th style={{ width: "10%" }}>Hình ảnh</th>
                <th style={{ width: "30%" }}>Mã đơn hàng</th>
                <th style={{ width: "15%" }}>Tổng tiền</th>
                <th className="text-center" style={{ width: "15%" }}>
                  Thanh toán
                </th>
                <th className="text-center" style={{ width: "15%" }}>
                  Thao tác
                </th>
              </tr>
            </thead>

            {/* Body của bảng */}
            <tbody>
              {orders.map((orderItem, index) => {
                const { order, detail } = orderItem;
                const firstProduct =
                  detail && detail.length > 0 ? detail[0] : null;

                // Xử lý ngày tháng
                const createdDate = order.created_at
                  ? new Date(order.created_at)
                  : null;
                const createdDateStr = createdDate
                  ? createdDate.toLocaleDateString("vi-VN")
                  : "N/A";
                const createdTimeStr = createdDate
                  ? createdDate.toLocaleTimeString("vi-VN", { hour12: false })
                  : "";

                return (
                  <tr key={order._id}>
                    {/* Cột 1: STT */}
                    <td className="align-middle text-center text-secondary small">
                      {index + 1}
                    </td>

                    {/* Cột 2: Hình ảnh */}
                    <td className="align-middle">
                      {firstProduct ? (
                        <div
                          className="position-relative"
                          style={{ width: "80px", height: "56px" }}
                        >
                          <Image
                            src={firstProduct.image}
                            alt={firstProduct.gameName}
                            fluid
                            rounded
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                          {/* Badge số lượng nếu > 1 sản phẩm */}
                          {detail.length > 1 && (
                            <Badge
                              bg="dark"
                              pill
                              className="position-absolute top-0 start-100 translate-middle"
                              style={{
                                fontSize: "0.6rem",
                                border: "2px solid white",
                              }}
                            >
                              +{detail.length - 1}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <div
                          className="bg-light text-secondary text-center rounded small border"
                          style={{
                            width: "80px",
                            height: "56px",
                            lineHeight: "56px",
                          }}
                        >
                          No Img
                        </div>
                      )}
                    </td>

                    {/* Cột 3: Mã đơn hàng */}
                    <td className="align-middle">
                      <div className="d-flex flex-column">
                        <span
                          className="fw-bold text-dark small"
                          title={order._id}
                        >
                          #{order._id.substring(0, 8)}...
                        </span>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {createdDateStr} | {createdTimeStr}
                        </span>
                      </div>
                    </td>

                    {/* Cột 4: Tổng tiền */}
                    <td className="align-middle fw-bold small">
                      {formatPrice(order.totalAmount)} ₫
                    </td>

                    {/* Cột 5: Trạng thái thanh toán */}
                    <td className="align-middle text-center">
                      {order.status === 1 ? (
                        <Badge bg="success" className="p-2 fw-semibold">
                          Đã thanh toán
                        </Badge>
                      ) : (
                        <Badge
                          bg="warning"
                          text="dark"
                          className="p-2 fw-semibold"
                        >
                          Chờ thanh toán
                        </Badge>
                      )}
                    </td>

                    {/* Cột 6: Nút xem chi tiết */}
                    <td className="align-middle text-center">
                      <Link to={`/order/${order._id}`}>
                        <Button variant="outline-primary" size="sm">
                          Xem chi tiết
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Order;
