import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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
import AdminProvider from "./Context/AdminContext";
import VnpayReturn from "./Pages/VnpayReturn";

function App() {
  const RequireAdmin = ({ children }) => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!token) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/" replace />;
    return children;
  };

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
        <Route path="/vnpay_return" element={<VnpayReturn />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminProvider>
                <Admin />
              </AdminProvider>
            </RequireAdmin>
          }
        />
      </Routes>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
