import { useState } from "react";
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
// import api from "../api/axios";
import axios from "axios";

const Register = () => {
  // React Router
  const navigator = useNavigate();

  // State
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // "success" hoặc "error"

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

  // Xử lý khi nhấn nút đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userPassword !== confirmPassword) {
      setMessage("Mật khẩu không giống nhau");
      return;
    }

    try {
      const res = await axios.post("/api/user/register", {
        userEmail,
        userPassword,
      });

      setMessage(res.data.message); // Đăng ký thành công

      // Hiển thị toast
      showToastMessage("Đăng ký thành công!", "success");

      // Chuyển hướng về trang đăng nhập
      setTimeout(() => {
        navigator("/login");
      }, 1500);
    } catch (error) {
      let errorMessage = "Đăng ký thất bại!";

      if (error && error.isAxiosError) {
        errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
      } else {
        errorMessage = "Lỗi không xác định";
      }

      // Hiển thị toast lỗi
      showToastMessage(errorMessage, "error");
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card style={{ width: "400px" }} className="p-4 shadow">
          <h3 className="text-center mb-4">Đăng ký</h3>
          <Form onSubmit={handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Nhập email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập Email
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Nhập mật khẩu"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Mật khẩu cần tối thiểu 6 ký tự
              </Form.Control.Feedback>
            </Form.Group>

            {/* Nhập lại password */}
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Nhập lại mật khẩu</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Mật khẩu không khớp
              </Form.Control.Feedback>
            </Form.Group>

            {message && (
              <div className="text-danger text-center mt-3">{message}</div>
            )}

            <Button variant="primary" type="submit" className="w-100">
              Đăng ký
            </Button>

            <div className="text-center">
              <small className="text-muted">
                Đã có tài khoản?
                <a
                  href="/login"
                  className="ms-1 text-decoration-none text-primary fw-semibold"
                >
                  Đăng nhập
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

export default Register;
