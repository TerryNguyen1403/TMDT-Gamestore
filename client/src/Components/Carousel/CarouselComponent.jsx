import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
// import api from '../../api/axios'
import axios from "axios";
import "./CarouselComponent.css";
import errorImg from "../../assets/404.jpg";

const CarouselComponent = () => {
  const navigator = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/game/all");
        setFeaturedProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <Container fluid className="mt-3">
      <Row className="justify-content-center">
        {/* Cột giữa - Carousel chính */}
        <Col md={8} lg={9} xl={10}>
          <div className="main-carousel-container position-relative">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px" }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Đang tải...</span>
                </Spinner>
              </div>
            ) : featuredProducts.length > 0 ? (
              <Carousel
                fade
                interval={3000}
                controls={true}
                indicators={true}
                className="main-carousel"
              >
                {featuredProducts.slice(0, 5).map((product) => (
                  <Carousel.Item
                    key={product._id}
                    className="carousel-item-custom"
                    onClick={() => {
                      navigator(`/product/${product._id}`);
                    }}
                  >
                    <div className="carousel-image-container">
                      <img
                        className="d-block w-100 carousel-image"
                        src={product.image}
                        alt={product.gameName}
                      />

                      {/* Overlay gradient */}
                      <div className="carousel-overlay"></div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Carousel className="main-carousel">
                <Carousel.Item>
                  <div className="carousel-image-container">
                    <img
                      className="d-block w-100 carousel-image"
                      src={errorImg}
                      alt=""
                    />
                  </div>
                </Carousel.Item>
              </Carousel>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarouselComponent;
