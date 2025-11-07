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

// Import context
// import { CartContext } from "../Context/CartContext";
// import { useContext } from "react";

const Detail = ({ game }) => {
  // const navigate = useNavigate();
  // const { addToCart } = useContext(CartContext);
  // const handleSubmit = (productId) => {
  //   addToCart(productId);
  // };

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

          {/* Nút thêm vào giỏ hàng */}
          <Button
            size="lg"
            className="mb-3"
            // onClick={() => handleSubmit(game._id)}
          >
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
