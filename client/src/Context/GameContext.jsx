import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext(null);

const GameContextProvider = (props) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get("/game/all");
        setGames(response.data);
      } catch (error) {
        console.error("Xảy ra lỗi khi fetch sản phẩm: ", error);
      }
    };

    fetchGames();
  }, []);

  const contextValue = {
    games,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
