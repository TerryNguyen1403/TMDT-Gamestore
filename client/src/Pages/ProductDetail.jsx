// Import components
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import Detail from "../Components/Detail";

// Import context
import { GameContext } from "../Context/GameContext";
import { useContext, useEffect, useState } from "react";

const ProductDetail = () => {
  // Use context
  const { games, gamesLength } = useContext(GameContext);
  const { id, platform } = useParams();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (gamesLength > 0) {
      const found = games.find((g) => String(g._id) === String(id));
      if (found) {
        setGame(found);
      } else {
        setTimeout(() => navigator("/"), 1000);
      }
    }
    setLoading(false);
  }, [games, id, navigator]);

  return (
    <>
      {loading && (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "15vh",
            fontSize: "1.5rem",
            fontWeight: "500",
          }}
        >
          Đang tải....
        </p>
      )}
      <>
        <BreadCrumb game={game} platformParam={platform} />
        <Detail game={game} />
      </>
    </>
  );
};

export default ProductDetail;
