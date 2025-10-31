import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { formatPrice } from "../../utils/formatPrice";
import "./Item.css";

const cardTitleStyle = {
  display: "-webkit-box",
  WebkitLineClamp: 1, // Giới hạn 1 dòng
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: "1.2em",
};

const Item = ({ game }) => {
  return (
    <Card style={{ width: "19rem" }} className="product-card">
      <Link
        to={`/product/${game._id}`}
        className="text-decoration-none text-dark"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Card.Img variant="top" src={game.image} alt={game.gameName} />
        <Card.Body>
          <Card.Title style={cardTitleStyle}>{game.gameName}</Card.Title>
          <div className="d-flex gap-2 mb-3">
            <Card.Text className="fw-bold price-current">
              {formatPrice(game.price)} ₫
            </Card.Text>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Item;
