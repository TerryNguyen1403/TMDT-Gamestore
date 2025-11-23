import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert, Badge, Tabs, Tab } from "react-bootstrap";
import { PeopleFill, BoxFill, CartFill, Trash, PencilSquare, Plus, Search } from "react-bootstrap-icons";

// API Configuration
const API_URL = "http://localhost:5000/api";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    // Modal states
    const [showUserModal, setShowUserModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    
    // Form states
    const [userForm, setUserForm] = useState({ name: "", email: "", role: "user" });
    const [productForm, setProductForm] = useState({ 
        name: "", 
        price: "", 
        category: "", 
        description: "",
        stock: "",
        image: ""
    });
    
    // Search states
    const [searchUser, setSearchUser] = useState("");
    const [searchProduct, setSearchProduct] = useState("");

    // Fetch data
    useEffect(() => {
        if (activeTab === "users") fetchUsers();
        if (activeTab === "products") fetchProducts();
        if (activeTab === "orders") fetchOrders();
    }, [activeTab]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users`);
            const data = await res.json();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError("Không thể tải danh sách người dùng");
        }
        setLoading(false);
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/products`);
            const data = await res.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError("Không thể tải danh sách sản phẩm");
        }
        setLoading(false);
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/orders`);
            const data = await res.json();
            setOrders(data);
            setError(null);
        } catch (err) {
            setError("Không thể tải danh sách đơn hàng");
        }
        setLoading(false);
    };

    // User CRUD
    const handleSaveUser = async () => {
        try {
            const method = editingItem ? "PUT" : "POST";
            const url = editingItem ? `${API_URL}/users/${editingItem._id}` : `${API_URL}/users`;
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userForm)
            });
            
            if (res.ok) {
                setSuccess(editingItem ? "Cập nhật thành công!" : "Thêm người dùng thành công!");
                setShowUserModal(false);
                setUserForm({ name: "", email: "", role: "user" });
                setEditingItem(null);
                fetchUsers();
            }
        } catch (err) {
            setError("Lỗi khi lưu người dùng");
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
        
        try {
            const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
            if (res.ok) {
                setSuccess("Xóa người dùng thành công!");
                fetchUsers();
            }
        } catch (err) {
            setError("Lỗi khi xóa người dùng");
        }
    };

    // Product CRUD
    const handleSaveProduct = async () => {
        try {
            const method = editingItem ? "PUT" : "POST";
            const url = editingItem ? `${API_URL}/products/${editingItem._id}` : `${API_URL}/products`;
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productForm)
            });
            
            if (res.ok) {
                setSuccess(editingItem ? "Cập nhật sản phẩm thành công!" : "Thêm sản phẩm thành công!");
                setShowProductModal(false);
                setProductForm({ name: "", price: "", category: "", description: "", stock: "", image: "" });
                setEditingItem(null);
                fetchProducts();
            }
        } catch (err) {
            setError("Lỗi khi lưu sản phẩm");
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
        
        try {
            const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                setSuccess("Xóa sản phẩm thành công!");
                fetchProducts();
            }
        } catch (err) {
            setError("Lỗi khi xóa sản phẩm");
        }
    };

    // Update order status
    const handleUpdateOrderStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            
            if (res.ok) {
                setSuccess("Cập nhật trạng thái đơn hàng thành công!");
                fetchOrders();
            }
        } catch (err) {
            setError("Lỗi khi cập nhật đơn hàng");
        }
    };

    // Filter data
    const filteredUsers = users.filter(u => 
        u.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchUser.toLowerCase())
    );

    const filteredProducts = products.filter(p => 
        p.name?.toLowerCase().includes(searchProduct.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchProduct.toLowerCase())
    );

    const stats = {
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === "pending").length
    };

    return (
        <Container className="my-5">
            <h2 className="fw-bold mb-4 text-center" style={{ color: "#ff6b35" }}>
                Admin Dashboard
            </h2>

            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

            <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
                <Tab eventKey="overview" title="Tổng quan">
                    <Row className="g-4 justify-content-center mt-3">
                        <Col md={6} lg={3}>
                            <Card className="p-3 shadow-sm border-0 h-100" style={{ cursor: "pointer" }} onClick={() => setActiveTab("users")}>
                                <div className="d-flex align-items-center">
                                    <PeopleFill size={40} className="me-3" style={{ color: "#4a90e2" }} />
                                    <div>
                                        <h5 className="mb-0 fw-bold">{stats.totalUsers}</h5>
                                        <small className="text-muted">Người dùng</small>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="p-3 shadow-sm border-0 h-100" style={{ cursor: "pointer" }} onClick={() => setActiveTab("products")}>
                                <div className="d-flex align-items-center">
                                    <BoxFill size={40} className="me-3" style={{ color: "#f39c12" }} />
                                    <div>
                                        <h5 className="mb-0 fw-bold">{stats.totalProducts}</h5>
                                        <small className="text-muted">Sản phẩm</small>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="p-3 shadow-sm border-0 h-100" style={{ cursor: "pointer" }} onClick={() => setActiveTab("orders")}>
                                <div className="d-flex align-items-center">
                                    <CartFill size={40} className="me-3" style={{ color: "#27ae60" }} />
                                    <div>
                                        <h5 className="mb-0 fw-bold">{stats.totalOrders}</h5>
                                        <small className="text-muted">Đơn hàng</small>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Card className="mt-4 p-4 shadow-sm border-0">
                        <h4 className="fw-bold mb-3">Chào mừng đến Admin Dashboard</h4>
                        <p className="text-muted">
                            Quản lý toàn bộ hệ thống Gamestore từ đây. Chọn tab để bắt đầu quản lý người dùng, sản phẩm hoặc đơn hàng.
                        </p>
                    </Card>
                </Tab>

                <Tab eventKey="users" title="Người dùng">
                    <Card className="shadow-sm border-0 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold mb-0">Quản lý người dùng</h4>
                            <Button variant="primary" onClick={() => {
                                setEditingItem(null);
                                setUserForm({ name: "", email: "", role: "user" });
                                setShowUserModal(true);
                            }}>
                                <Plus size={20} className="me-2" />
                                Thêm người dùng
                            </Button>
                        </div>

                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text"><Search /></span>
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm kiếm theo tên hoặc email..."
                                    value={searchUser}
                                    onChange={(e) => setSearchUser(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <p className="text-center">Đang tải...</p>
                        ) : (
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
                                    {filteredUsers.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Badge bg={user.role === "admin" ? "danger" : "secondary"}>
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => {
                                                        setEditingItem(user);
                                                        setUserForm({ name: user.name, email: user.email, role: user.role });
                                                        setShowUserModal(true);
                                                    }}
                                                >
                                                    <PencilSquare />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                >
                                                    <Trash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card>
                </Tab>

                <Tab eventKey="products" title="Sản phẩm">
                    <Card className="shadow-sm border-0 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold mb-0">Quản lý sản phẩm</h4>
                            <Button variant="primary" onClick={() => {
                                setEditingItem(null);
                                setProductForm({ name: "", price: "", category: "", description: "", stock: "", image: "" });
                                setShowProductModal(true);
                            }}>
                                <Plus size={20} className="me-2" />
                                Thêm sản phẩm
                            </Button>
                        </div>

                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text"><Search /></span>
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm kiếm theo tên hoặc danh mục..."
                                    value={searchProduct}
                                    onChange={(e) => setSearchProduct(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <p className="text-center">Đang tải...</p>
                        ) : (
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
                                    {filteredProducts.map(product => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.price?.toLocaleString('vi-VN')} ₫</td>
                                            <td><Badge bg="info">{product.category}</Badge></td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => {
                                                        setEditingItem(product);
                                                        setProductForm(product);
                                                        setShowProductModal(true);
                                                    }}
                                                >
                                                    <PencilSquare />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                >
                                                    <Trash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card>
                </Tab>

                <Tab eventKey="orders" title="Đơn hàng">
                    <Card className="shadow-sm border-0 p-4">
                        <h4 className="fw-bold mb-3">Quản lý đơn hàng</h4>

                        {loading ? (
                            <p className="text-center">Đang tải...</p>
                        ) : (
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
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id?.substring(0, 8)}</td>
                                            <td>{order.customerName}</td>
                                            <td>{order.items?.length} sản phẩm</td>
                                            <td>{order.total?.toLocaleString('vi-VN')} ₫</td>
                                            <td>
                                                <Badge bg={
                                                    order.status === "completed" ? "success" :
                                                    order.status === "pending" ? "warning" : "secondary"
                                                }>
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Form.Select
                                                    size="sm"
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                                >
                                                    <option value="pending">Chờ xử lý</option>
                                                    <option value="processing">Đang xử lý</option>
                                                    <option value="completed">Hoàn thành</option>
                                                    <option value="cancelled">Đã hủy</option>
                                                </Form.Select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card>
                </Tab>
            </Tabs>

            {/* User Modal */}
            <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingItem ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                value={userForm.name}
                                onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={userForm.email}
                                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Vai trò</Form.Label>
                            <Form.Select
                                value={userForm.role}
                                onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUserModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Product Modal */}
            <Modal show={showProductModal} onHide={() => setShowProductModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editingItem ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Danh mục</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={productForm.category}
                                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tồn kho</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={productForm.stock}
                                        onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>URL Hình ảnh</Form.Label>
                            <Form.Control
                                type="text"
                                value={productForm.image}
                                onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={productForm.description}
                                onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowProductModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSaveProduct}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Admin;