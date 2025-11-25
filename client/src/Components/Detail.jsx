import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";

// Import utils
import { formatPrice } from "../utils/formatPrice";
import { calDiscount } from "../utils/calDiscount";

// import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";

// Import componnts
import Notification from "./Notification";

const Detail = ({ game }) => {
  // Import và sử dụng context
  const { contextValues } = useContext(CartContext);
  const { addToCart, increaseQuantity } = contextValues || {};

  // Khai báo state
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!game?._id) return;
    const qty =
      Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
    await addToCart(game._id);
    // Tăng thêm số lượng nếu người dùng chọn > 1
    for (let i = 1; i < qty; i++) {
      await increaseQuantity(game._id);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1000);
  };

  if (!game) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="my-5">
      {/* Hiển thị thông báo */}
      {showNotification && (
        <Notification bgType="success" msg="Thêm vào giỏ hàng thành công" />
      )}

      <Row className="align-items-start">
        {/* Hình ảnh sản phẩm */}
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image
            src={game.image}
            alt={game.name}
            fluid
            className="rounded shadow-sm"
          />
        </Col>

        {/* Thông tin sản phẩm */}
        <Col md={6}>
          <h2 className="mb-3" style={{ color: "#ff6b35" }}>
            {game.gameName}
          </h2>

          {/* Giá */}
          {game.discount !== 0 ? (
            <div className="mb-3">
              <span className="fw-bold fs-4" style={{ color: "#28a745" }}>
                {formatPrice(calDiscount(game.price, game.discount))} ₫
              </span>
            </div>
          ) : (
            <div className="mb-3">
              <span className="fw-bold fs-4" style={{ color: "#28a745" }}>
                {formatPrice(game.price)} ₫
              </span>
            </div>
          )}

          {/* Mô tả trong box */}
          <Card className="bg-light border-0 shadow-sm mb-4">
            <Card.Body>
              <p className="mb-0">{game.description}</p>
            </Card.Body>
          </Card>

          {/* Số lượng và nút thêm vào giỏ hàng */}
          <div className="mb-3 d-flex align-items-center gap-2">
            <label className="mb-0" style={{ minWidth: 80 }}>
              Số lượng:
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (Number.isNaN(v) || v < 1) setQuantity(1);
                else setQuantity(v);
              }}
              style={{
                width: 80,
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #ced4da",
              }}
            />
          </div>
          <Button size="lg" className="mb-3" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </Button>

          {/* Nền tảng */}
          <div className="mb-3">
            <strong className="text-muted">Nền tảng: </strong>
            {game.platform && game.platform.length > 0 ? (
              game.platform.map((p, index) => (
                <span
                  key={p._id || index}
                  className="badge"
                  style={{ color: "#ff6b35" }}
                >
                  {p.platformName}
                </span>
              ))
            ) : (
              <span className="text-muted">Chưa có thông tin</span>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
