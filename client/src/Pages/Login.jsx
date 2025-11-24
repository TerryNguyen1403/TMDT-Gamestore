import { useState } from "react";
// import api from "../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Card,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { CheckCircle, XCircle } from "lucide-react";

const Login = () => {
  // State
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // "success" hoặc "error"

  // React Router
  const navigate = useNavigate();

  // Hàm hiển thị toast
  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Tự động ẩn toast sau 1.5 giây
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email: userEmail,
        password: userPassword,
      });

      // Lưu token vào localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("isAdmin", String(!!res.data.isAdmin));

      // Hiển thị toast
      showToastMessage("Đăng nhập thành công!", "success");

      // Chuyển hướng sau khi login thành công
      window.dispatchEvent(new Event("storageUpdated"));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      let errorMessage = "Đăng nhập thất bại!";

      if (error && error.isAxiosError) {
        errorMessage = error.response?.data?.message || "Đăng nhập thất bại!";
      } else {
        errorMessage = "Lỗi không xác định";
      }

      // Hiển thị toast lỗi
      showToastMessage(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card style={{ width: "400px" }} className="p-4 shadow">
          <h3 className="text-center mb-4">Đăng nhập</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            <div className="text-center mt-3">
              <small className="text-muted">
                Chưa có tài khoản?
                <a
                  href="/register"
                  className="ms-1 text-decoration-none text-primary fw-semibold"
                >
                  Đăng ký
                </a>
              </small>
            </div>
          </Form>
        </Card>
      </Container>

      {/* Toast Container - Fixed position */}
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 1050 }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg={toastType === "success" ? "success" : "danger"}
          autohide
          delay={5000}
        >
          <Toast.Header closeButton className="text-white">
            <div className="me-2">
              {toastType === "success" ? (
                <CheckCircle size={20} className="text-white" />
              ) : (
                <XCircle size={20} className="text-white" />
              )}
            </div>
            <strong className="me-auto text-white">
              {toastType === "success" ? "Thành công" : "Lỗi"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Login;
