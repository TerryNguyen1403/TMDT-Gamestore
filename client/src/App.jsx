import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Import pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
