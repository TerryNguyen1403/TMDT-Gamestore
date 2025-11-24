import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { PeopleFill, BoxFill, CartFill, Search } from "react-bootstrap-icons";

const Admin = () => {
  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#ff6b35" }}>
        Trang quản lý
      </h2>

      <Tabs className="mb-4" defaultActiveKey="overview">
        <Tab eventKey="overview" title="Tổng quan">
          <Row className="g-4 justify-content-center mt-3">
            <Col md={6} lg={3}>
              <Card className="p-3 shadow-sm border-0 h-100">
                <div className="d-flex align-items-center">
                  <PeopleFill
                    size={40}
                    className="me-3"
                    style={{ color: "#4a90e2" }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold"></h5>
                    <small className="text-muted">Người dùng</small>
                  </div>
                </div>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="p-3 shadow-sm border-0 h-100">
                <div className="d-flex align-items-center">
                  <BoxFill
                    size={40}
                    className="me-3"
                    style={{ color: "#f39c12" }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold"></h5>
                    <small className="text-muted">Sản phẩm</small>
                  </div>
                </div>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="p-3 shadow-sm border-0 h-100">
                <div className="d-flex align-items-center">
                  <CartFill
                    size={40}
                    className="me-3"
                    style={{ color: "#27ae60" }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold"></h5>
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
          <Card className="shadow-sm border-0 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">Quản lý người dùng</h4>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <Search />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc email..."
                />
              </div>
            </div>
            <Table responsive hover>
              <thead className="table-light">
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    (Chưa có dữ liệu)
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Tab>

        <Tab eventKey="products" title="Sản phẩm">
          <Card className="shadow-sm border-0 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">Quản lý sản phẩm</h4>
            </div>

            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <Search />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc danh mục..."
                />
              </div>
            </div>

            <Table responsive hover>
              <thead className="table-light">
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Danh mục</th>
                  <th>Tồn kho</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    (Chưa có dữ liệu)
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Tab>

        <Tab eventKey="orders" title="Đơn hàng">
          <Card className="shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-3">Quản lý đơn hàng</h4>

            <Table responsive hover>
              <thead className="table-light">
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    (Chưa có dữ liệu)
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Admin;
