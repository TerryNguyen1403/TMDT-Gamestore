import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext(null);

const GameContextProvider = (props) => {
  const [games, setGames] = useState([]);
  const [gamesLength, setGamesLength] = useState(0);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get("/game/all");
        setGames(response.data.games);
        setGamesLength(response.data.totalGames);
      } catch (error) {
        console.error("Xảy ra lỗi khi fetch sản phẩm: ", error);
      }
    };

    fetchGames();
  }, []);

  const contextValue = {
    games,
    gamesLength,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
