import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Form,
  InputGroup,
  FormControl,
  Button,
  Nav,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { CartFill } from "react-bootstrap-icons";
import logo from "../assets/logo.png";

// Import context
// import { CartContext } from "../../Context/CartContext";

const Navbars = () => {
  // Tạo menu
  const menuItems1 = [
    { href: "/new", label: "Game mới" },
    { href: "/hot", label: "Game hot" },
  ];

  const menuItems2 = [
    { href: "/windows", label: "Game Windows" },
    { href: "/playstation", label: "Game Playstation" },
    { href: "/nintendo", label: "Game Nintendo" },
  ];

  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  // Hàm hiển thị số lượng
  //   const { getTotalItems } = useContext(CartContext);

  useEffect(() => {
    // Lấy userName từ localStorage khi load page
    setUserName(localStorage.getItem("userName"));

    // Lắng nghe sự kiện đăng nhập
    const syncLogin = () => {
      setUserName(localStorage.getItem("userName"));
    };

    window.addEventListener("storageUpdated", syncLogin);
    // Lắng nghe thay đổi localStorage giữa các tab
    const onNativeStorage = (e) => {
      if (e.key === "userName" || e.key === "token") {
        setUserName(localStorage.getItem("userName"));
      }
    };
    window.addEventListener("storage", onNativeStorage);

    // Lắng nghe sự kiện token hết hạn và tự động đăng xuất
    const onAutoLogout = () => {
      setUserName(null);
    };
    window.addEventListener("logout", onAutoLogout);

    // Kiểm tra token hết hạn định kỳ (trường hợp không có request để trả 401)
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const parts = token.split(".");
        if (parts.length !== 3) return; // Không phải JWT
        const payload = JSON.parse(atob(parts[1]));
        if (!payload?.exp) return;
        const isExpired = Date.now() >= payload.exp * 1000;
        if (isExpired) {
          // Dọn dẹp và thông báo UI
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userName");
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          setUserName(null);
          try {
            window.dispatchEvent(new Event("logout"));
            window.dispatchEvent(new Event("storageUpdated"));
          } catch (err) {
            console.error(err?.message);
          }
          // Điều hướng về trang đăng nhập trong cùng tab
          alert("Token đã quá hạn, vui lòng đăng nhập lại");
          navigate("/login");
        }
      } catch (err) {
        // Nếu không decode được thì bỏ qua
        console.error(err);
      }
    };
    // Kiểm tra ngay khi mount và theo chu kỳ
    checkTokenExpiry();
    const expiryTimer = setInterval(checkTokenExpiry, 15000);

    return () => {
      window.removeEventListener("storageUpdated", syncLogin);
      window.removeEventListener("storage", onNativeStorage);
      window.removeEventListener("logout", onAutoLogout);
      clearInterval(expiryTimer);
    };
  }, []);

  // Xử lý sự kiện logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserName(null);
    try {
      window.dispatchEvent(new Event("logout"));
      window.dispatchEvent(new Event("storageUpdated"));
    } catch (error) {
      console.error(error.message);
    }
    alert("Đăng xuất thành công");
    navigate("/");
  };

  // Xử lý sự kiện onClickCart
  const handleCartClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/cart");
    } else {
      alert("Vui lòng đăng nhập trước khi sử dụng chức năng giỏ hàng");
      navigate("/login");
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="py-3 shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src={logo} alt="" height="30" className="me-2" />
          <span className="fw-bold" style={{ color: "#ff6b35" }}>
            Gamestore
          </span>
        </Navbar.Brand>

        <NavDropdown title="Danh sách sản phẩm">
          {menuItems1.map((item, idx) => (
            <NavDropdown.Item key={idx} href={item.href}>
              {item.label}
            </NavDropdown.Item>
          ))}

          <NavDropdown.Divider />

          {menuItems2.map((item, index) => (
            <NavDropdown.Item key={index} href={item.href}>
              {item.label}
            </NavDropdown.Item>
          ))}
        </NavDropdown>

        {/* Thanh tìm kiếm */}
        <Form className="d-flex mx-auto w-50">
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Tìm kiếm sản phẩm"
              aria-label="Search"
            />
            <Button variant="dark">Tìm</Button>
          </InputGroup>
        </Form>

        {/* Giỏ hàng + Đăng nhập/Đăng ký */}
        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link
            className="d-flex align-items-center me-3 position-relative"
            onClick={handleCartClick}
          >
            <CartFill size={20} className="me-1" />
            <Badge
              bg="secondary"
              pill
              className="position-absolute translate-middle"
              style={{
                fontSize: "0.7rem",
                top: "0",
                left: "100%",
              }}
            >
              {/* {getTotalItems()} */}
            </Badge>
          </Nav.Link>

          {userName ? (
            <div className="position-relative">
              <div
                className="d-flex align-items-center cursor-pointer user-menu-trigger"
                onMouseEnter={() => setDropdownMenu(true)}
                onMouseLeave={() => setDropdownMenu(false)}
              >
                <span className="me-1">
                  Xin chào, <strong>{userName}</strong>
                </span>

                {/* Dropdown Menu */}
                <div
                  className={`user-dropdown-menu ${dropdownMenu ? "show" : ""}`}
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    backgroundColor: "white",
                    width: "fit-content",
                    minWidth: "0px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    borderRadius: "8px",
                    zIndex: 1000,
                    opacity: dropdownMenu ? 1 : 0,
                    visibility: dropdownMenu ? "visible" : "hidden",
                    transform: dropdownMenu
                      ? "translateY(0)"
                      : "translateY(-10px)",
                    transition: "all 0.2s ease-in-out",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {/* Menu Items */}
                  <div className="py-2">
                    {/* Xem setting tài khoản */}
                    <a
                      href="/profile"
                      className="dropdown-item d-flex align-items-center py-2 px-3 text-decoration-none text-dark"
                      style={{ transition: "background-color 0.2s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f8f9fa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Quản lý tài khoản
                    </a>

                    {/* Xem lịch sử đơn hàng */}
                    <a
                      href="/order"
                      className="dropdown-item d-flex align-items-center py-2 px-3 text-decoration-none text-dark"
                      style={{ transition: "background-color 0.2s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f8f9fa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Lịch sử đơn hàng
                    </a>

                    {/* Sản phẩm yêu thích */}
                    {/* <a
                                            href="/wishlist" 
                                            className="dropdown-item d-flex align-items-center py-2 px-3 text-decoration-none text-dark"
                                            style={{transition: 'background-color 0.2s'}}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            Sản phẩm yêu thích
                                        </a> */}

                    {/* Đăng xuất */}
                    <a
                      onClick={handleLogout}
                      className="dropdown-item d-flex align-items-center py-2 px-3 text-decoration-none text-dark"
                      style={{
                        transition: "background-color 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f8f9fa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Đăng xuất
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Nav.Link href="/login">Đăng nhập</Nav.Link>
              <Nav.Link href="/register">Đăng ký</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbars;
