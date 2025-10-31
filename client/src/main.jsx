import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Import context provider
import GameContextProvider from "./Context/GameContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <GameContextProvider>
    <App />
  </GameContextProvider>
);
