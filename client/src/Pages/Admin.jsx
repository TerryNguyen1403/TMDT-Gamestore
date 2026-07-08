import {
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
} from "react-bootstrap";
import { PeopleFill, BoxFill, CartFill } from "react-bootstrap-icons";

// Import context
import { AdminContext } from "../Context/AdminContext";
import { useContext, useState } from "react";

// Import component con
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";

const Admin = () => {
  // Sử dụng context
  const {
    totalUsers,
    users = [],
    totalGames,
    games = [],
    createGame,
    updateGame,
    deleteGame,
    fetchTotalGames,
    loadingAdmin,
    platforms = [],
    genres = [],
    orders = [],
    totalOrders = 0,
  } = useContext(AdminContext) || {};

  const [tab, setTab] = useState("overview");

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#ff6b35" }}>
        Trang quản lý
      </h2>

      <Tabs
        className="mb-4"
        activeKey={tab}
        onSelect={(k) => setTab(k || "overview")}
      >
        <Tab eventKey="overview" title="Tổng quan">
          <Row className="g-4 justify-content-center mt-3">
            <Col md={6} lg={3}>
              <Card
                className="p-3 shadow-sm border-0 h-100"
                onClick={() => setTab("users")}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <PeopleFill
                    size={40}
                    className="me-3"
                    style={{ color: "#4a90e2" }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">{totalUsers}</h5>
                    <small className="text-muted">Người dùng</small>
                  </div>
                </div>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card
                className="p-3 shadow-sm border-0 h-100"
                onClick={() => setTab("products")}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <BoxFill
                    size={40}
                    className="me-3"
                    style={{ color: "#f39c12" }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">{totalGames}</h5>
                    <small className="text-muted">Sản phẩm</small>
                  </div>
                </div>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card
                className="p-3 shadow-sm border-0 h-100"
                onClick={() => setTab("orders")}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <CartFill
                    size={40}
                    className="me-3"
                    style={{ color: "#27ae60" }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">{totalOrders}</h5>
                    <small className="text-muted">Đơn hàng</small>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Card className="mt-4 p-4 shadow-sm border-0">
            <h4 className="fw-bold mb-3">Chào mừng đến Admin Dashboard</h4>
            <p className="text-muted">
              Quản lý toàn bộ hệ thống Gamestore từ đây. Chọn tab để bắt đầu
              quản lý người dùng, sản phẩm hoặc đơn hàng.
            </p>
          </Card>
        </Tab>

        <Tab eventKey="users" title="Người dùng">
          <AdminUsers totalUsers={totalUsers} users={users} />
        </Tab>

        <Tab eventKey="products" title="Sản phẩm">
          <AdminProducts
            totalGames={totalGames}
            games={games}
            platforms={platforms}
            genres={genres}
            createGame={createGame}
            updateGame={updateGame}
            deleteGame={deleteGame}
            fetchTotalGames={fetchTotalGames}
            loadingAdmin={loadingAdmin}
          />
        </Tab>

        <Tab eventKey="orders" title="Đơn hàng">
          <AdminOrders orders={orders} totalOrders={totalOrders} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Admin;
