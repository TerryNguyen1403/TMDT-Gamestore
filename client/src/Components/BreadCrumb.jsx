import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BreadCrumb = ({ game }) => {
  const navigator = useNavigate();

  if (!game) return null;

  return (
    <div className="d-flex align-items-center ms-5">
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item
          onClick={() => navigator("/")}
          linkAs="span"
          style={{ cursor: "pointer" }}
        >
          Trang chủ
        </Breadcrumb.Item>

        <Breadcrumb.Item linkAs="span">
          Game
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{game.gameName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
