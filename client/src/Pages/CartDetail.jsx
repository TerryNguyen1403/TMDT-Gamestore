import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

// Import utils
import { formatPrice } from "../utils/formatPrice";

// Import context
import { GameContext } from "../Context/GameContext";
import { CartContext } from "../Context/CartContext";

const CartDetail = () => {
  // Sử dụng context
  const { games } = useContext(GameContext);
  const { contextValues } = useContext(CartContext);
  const {
    cartItems,
    decreaseQuantity,
    increaseQuantity,
    deleteFromCart,
    getTotalAmount,
  } = contextValues || {};

  // Khai báo các biến state
  const [totalAmount, setTotalAmount] = useState(0);

  // Lấy chi tiết sản phảm
  const gameDetail = (cartItems || []).map(({ id, quantity }) => {
    const game = games.find((game) => String(game._id) === String(id));
    return game ? { game, quantity } : null;
  });
  const items = gameDetail.filter(Boolean);

  const totalItems = items.reduce(
    (sum, { quantity }) => sum + Number(quantity ?? 0),
    0
  );

  // Xử lý sự kiện nhấn nút 'Thanh toán với VNPAY'
  const onClickOrder = async () => {
    try {
      // Dữ liệu truyền cho VNPAY
      const order = {
        amount: await getTotalAmount(localStorage.getItem("userId")),
        bankCode: "",
        language: "vn",
        user_id: localStorage.getItem("userId"),
      };
    } catch (error) {
      console.error(`Lỗi khi đặt hàng: ${error.message}`);
    }
  };

  // fetch tổng tiền
  const fetchTotal = async () => {
    const total = await getTotalAmount(localStorage.getItem("userId"));
    setTotalAmount(total);
  };
  useEffect(() => {
    fetchTotal();
  }, [cartItems]);

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col xs={12}>
            <Card
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body className="p-0">
                <Row className="g-0">
                  {/* Left side - Cart items */}
                  <Col lg={8}>
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">Giỏ hàng</h1>
                      </div>

                      <hr className="my-4" />

                      {/* Item rows */}
                      {items.length === 0 ? (
                        <div className="text-center text-muted py-5">
                          Giỏ hàng trống
                        </div>
                      ) : (
                        items.map(({ game, quantity }) => (
                          <Row
                            key={game._id}
                            className="mb-4 d-flex justify-content-between align-items-center"
                          >
                            <Col md={2} lg={2} xl={2}>
                              <Card.Img
                                src={game.thumb || game.image}
                                className="rounded-3"
                                alt={game.name}
                              />
                            </Col>
                            <Col md={3} lg={3} xl={3}>
                              <h6 className="text-black mb-0">{game.name}</h6>
                              <small className="text-muted">
                                {game.gameName}
                              </small>
                            </Col>
                            <Col
                              md={3}
                              lg={3}
                              xl={3}
                              className="d-flex align-items-center"
                            >
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => decreaseQuantity(game._id)}
                              >
                                -
                              </Button>
                              <Form.Control
                                type="number"
                                min="1"
                                value={quantity}
                                readOnly
                                size="sm"
                                style={{ width: "48px" }}
                              />
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => increaseQuantity(game._id)}
                              >
                                +
                              </Button>
                            </Col>
                            <Col md={3} lg={2} xl={2} className="text-end">
                              <h6 className="mb-0">
                                {formatPrice(game.price * quantity)}
                              </h6>
                            </Col>
                            <Col md={1} lg={1} xl={1} className="text-end">
                              <button
                                type="button"
                                className="btn btn-link text-muted p-0"
                                aria-label="remove"
                                title="Xoá khỏi giỏ"
                                onClick={() => deleteFromCart(game._id)}
                              >
                                ×
                              </button>
                            </Col>
                          </Row>
                        ))
                      )}

                      <hr className="my-4" />

                      {/* Back to shop */}
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a href="/" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>{" "}
                            Trở về cửa hàng
                          </a>
                        </h6>
                      </div>
                    </div>
                  </Col>

                  {/* Right side - Summary */}
                  <Col lg={4} className="bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">TỔNG CỘNG</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">sản phẩm</h5>
                        <h5>{totalItems} SP</h5>
                      </div>

                      <h5 className="text-uppercase mb-3">Mã giảm giá</h5>
                      <div className="mb-5">
                        <Form.Control size="lg" placeholder="Nhập mã tại đây" />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Tổng tiền</h5>
                        <h5>{formatPrice(totalAmount)}</h5>
                      </div>

                      <Button
                        variant="dark"
                        size="lg"
                        className="w-100"
                        onClick={onClickOrder}
                      >
                        Thanh toán với VNPAY
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartDetail;
