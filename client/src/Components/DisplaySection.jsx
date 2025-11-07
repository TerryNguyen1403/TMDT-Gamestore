import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Import components
import Item from "./Item/Item";

const DisplaySection = ({ games = [] }) => {
  const visible = Array.isArray(games) ? games.slice(0, 20) : [];

  return (
    <Container className="py-3">
      <Row className="g-4 justify-content-center">
        {visible.map((game, idx) => (
          <Col
            key={game?._id || idx}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="d-flex justify-content-center"
          >
            <Item game={game} />
          </Col>
        ))}
      </Row>

      {visible.length === 0 && (
        <div className="text-center text-muted py-4">
          Không có game để hiển thị
        </div>
      )}
    </Container>
  );
};

export default DisplaySection;
