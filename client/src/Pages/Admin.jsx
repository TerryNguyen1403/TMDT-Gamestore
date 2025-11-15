import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { PeopleFill, BoxFill, CartFill } from "react-bootstrap-icons";

const Admin = () => {
    return (
        <>
            <Container className="my-5">
                <h2 className="fw-bold mb-4 text-center" style={{ color: "#ff6b35" }}>
                    Admin Dashboard
                </h2>

                <Row className="g-4 justify-content-center">
                    <Col md={4} lg={3}>
                        <Card className="p-3 shadow-sm border-0">
                            <div className="d-flex align-items-center">
                                <PeopleFill size={35} className="me-3" />
                                <div>
                                    <h5 className="mb-0 fw-bold">Người dùng</h5>
                                    <small className="text-muted">Quản lý tài khoản</small>
                                </div>
                            </div>
                        </Card>
                    </Col>


                    <Col md={4} lg={3}>
                        <Card className="p-3 shadow-sm border-0">
                            <div className="d-flex align-items-center">
                                <BoxFill size={35} className="me-3" />
                                <div>
                                    <h5 className="mb-0 fw-bold">Sản phẩm</h5>
                                    <small className="text-muted">Quản lý kho game</small>
                                </div>
                            </div>
                        </Card>
                    </Col>


                    <Col md={4} lg={3}>
                        <Card className="p-3 shadow-sm border-0">
                            <div className="d-flex align-items-center">
                                <CartFill size={35} className="me-3" />
                                <div>
                                    <h5 className="mb-0 fw-bold">Đơn hàng</h5>
                                    <small className="text-muted">Theo dõi giao dịch</small>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>


                <Card className="mt-5 p-4 shadow-sm border-0">
                    <h4 className="fw-bold mb-3">Tổng quan</h4>
                    <p className="text-muted">
                        Đây là không gian quản trị của Gamestore. Bạn có thể quản lý sản phẩm,
                        người dùng và đơn hàng.
                    </p>
                </Card>
            </Container>
        </>
    );
};

export default Admin;
