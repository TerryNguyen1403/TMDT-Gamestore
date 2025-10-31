import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Item from "./Item/Item";

import axios from "axios";

const ProductSection = ({
  title,
  apiEndpoint,
  navigateTo,
  maxItems = 4,
  dataKey = "",
  containerProps = {},
  showViewAll = true,
}) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      if (!apiEndpoint) return;

      setLoading(true);
      try {
        const endpoint = apiEndpoint.replace("http://localhost:4000", "");
        const res = await axios.get(endpoint);
        // Linh hoạt với cấu trúc response khác nhau
        const data = res.data;
        setGames(data);
      } catch (error) {
        console.error("Lỗi khi fetch:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [apiEndpoint, dataKey]);

  const handleNavigate = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5" {...containerProps}>
      {/* Header */}
      <div className="position-relative mb-4">
        {/* Đường kẻ ngang full width màu cam */}
        <div
          className="position-absolute w-100 top-50 translate-middle-y"
          style={{
            height: "3px",
            backgroundColor: "#ff6b35",
            left: "0",
            right: "0",
          }}
        ></div>

        {/* Header content */}
        <div className="d-flex justify-content-between align-items-center position-relative">
          <h1
            className="fw-bold text-uppercase mb-0 bg-white pe-3"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              color: "#171717",
              letterSpacing: "1px",
              paddingRight: "15px",
              paddingLeft: "0",
            }}
          >
            <span style={{ color: "#ff6b35" }}>GAME </span>
            {title.toUpperCase()}
          </h1>

          {showViewAll && navigateTo && (
            <span
              onClick={handleNavigate}
              className="text-decoration-none"
              style={{
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#080808ff",
                cursor: "pointer",
                transition: "color 0.3s ease",
                paddingLeft: "15px",
                backgroundColor: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ff6b35";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#080808ff";
              }}
            >
              Xem tất cả →
            </span>
          )}
        </div>
      </div>

      {/* Grid sản phẩm */}
      <Row className="g-4 justify-content-center">
        {games.slice(-maxItems).map((game, index) => (
          <Col
            key={game.id || index}
            xs={6} // 2 cột trên mobile
            sm={6} // 2 cột trên small
            md={4} // 3 cột trên medium
            lg={3} // 4 cột trên large
            xl={3} // 4 cột trên extra large
            className="d-flex justify-content-center"
          >
            <div className="item-hover">
              <Item game={game} />
            </div>
          </Col>
        ))}
      </Row>

      {/* Message khi không có sản phẩm */}
      {games.length === 0 && !loading && (
        <div className="text-center py-4">
          <p className="text-muted">Không có sản phẩm nào để hiển thị</p>
        </div>
      )}

      {/* Inline styles cho hover effects */}
      <style>{`
        @media (max-width: 768px) {
          .hover-text {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </Container>
  );
};

export default ProductSection;
