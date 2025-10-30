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
  const menuItems = [
    { href: "/new-products", label: "Game mới" },
    { href: "/featured-products", label: "Game nổi bật" },
    { href: "/windows", label: "Game Windows" },
    { href: "/playstation", label: "Game Playstation" },
    { href: "/nintendo", label: "Game Nintendo" },
  ];
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  // Hàm hiển thị số lượng
  //   const { getTotalItems } = useContext(CartContext);

  useEffect(() => {
    // Lấy userEmail từ localStorage khi load page
    setUserEmail(localStorage.getItem("userEmail"));

    // Lắng nghe sự kiện custom
    const syncLogin = () => {
      setUserEmail(localStorage.getItem("userEmail"));
    };

    window.addEventListener("storageUpdated", syncLogin);

    return () => {
      window.removeEventListener("storageUpdated", syncLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    setUserEmail(null);
    alert("Đăng xuất thành công");
    navigate("/");
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

        <NavDropdown title="Danh sách game">
          {menuItems.map((item) => (
            <NavDropdown.Item href={item.href}>{item.label}</NavDropdown.Item>
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
            href="/cart"
            className="d-flex align-items-center me-3 position-relative"
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

          {userEmail ? (
            <div className="position-relative">
              <div
                className="d-flex align-items-center cursor-pointer user-menu-trigger"
                onMouseEnter={() => setDropdownMenu(true)}
                onMouseLeave={() => setDropdownMenu(false)}
              >
                <span className="me-1">{userEmail}</span>

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
