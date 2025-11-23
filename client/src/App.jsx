import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Import pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import ProductDetail from "./Pages/ProductDetail";
import DisplayGames from "./Pages/DisplayGames";
import ScrollToTop from "./Components/ScrollToTop";
import Admin from "./Pages/Admin";
import CartDetail from "./Pages/CartDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new" element={<DisplayGames endpoint="new" />} />
        <Route path="/hot" element={<DisplayGames endpoint="hot" />} />
        <Route
          path="/Windows"
          element={<DisplayGames endpoint="platform/Windows" />}
        />
        <Route
          path="/Playstation"
          element={<DisplayGames endpoint="platform/Playstation" />}
        />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin routes */}

        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
