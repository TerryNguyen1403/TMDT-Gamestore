import { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

// Import components
import DisplaySection from "../Components/DisplaySection";

const DisplayGames = ({ endpoint }) => {
  const URL = "http://localhost:3000/api/game";

  // useState
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch function
  const fetchGames = async (endpoint) => {
    setLoading(true);

    try {
      const response = await axios.get(`${URL}/${endpoint}`);
      const data = response.data;
      setGames(data);

      return;
    } catch (error) {
      console.error(`Lỗi khi fetch: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (endpoint) {
      // fetch new games
      case "new":
        fetchGames("new");
        break;

      //fetch hot games
      case "hot":
        fetchGames("hot");
        break;

      //fetch Windows games
      case "platform/Windows":
        fetchGames("platform/Windows");
        break;

      //fetch Windows games
      case "platform/Playstation":
        fetchGames("platform/Playstation");
        break;

      default:
        break;
    }
  }, [endpoint]);
  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <ClipLoader color="#36d7b7" size={80} />}
      <DisplaySection games={games} />
    </div>
  );
};

export default DisplayGames;
