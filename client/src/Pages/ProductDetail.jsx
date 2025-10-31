// Import components
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import Detail from "../Components/Detail";

// Import context
import { GameContext } from "../Context/GameContext";
import { useContext, useEffect, useState } from "react";

const ProductDetail = () => {
  // Use context
  const { games } = useContext(GameContext);
  const { id, platform } = useParams();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (games && games.length > 0) {
      const found = games.find((game) => game._id === id);

      if (found) {
        setGame(found);
      } else {
        alert("Không tìm thấy game");
        navigator("/");
      }
      setLoading(false);
    }
  }, [games, id, navigator]);

  return (
    <>
      {console.log(games)}
      <BreadCrumb game={game} platformParam={platform} />
      <Detail game={game} />
    </>
  );
};

export default ProductDetail;
