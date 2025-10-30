import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
