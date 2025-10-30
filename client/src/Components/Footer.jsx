import logo from "../assets/logo.png";

const Footer = () => {
  const socialLinks = {
    Linkedin: "https://www.linkedin.com/in/nhtgiang2003",
    Github: "https://github.com/TerryNguyen1403",
  };

  const FooterLink = ({ href, label }) => (
    <a
      href={href}
      className="text-muted text-decoration-none"
      onMouseEnter={(e) =>
        e.currentTarget.style.setProperty("color", "#ff6b35", "important")
      }
      onMouseLeave={(e) =>
        e.currentTarget.style.setProperty("color", "#080808ff", "important")
      }
    >
      {label}
    </a>
  );

  return (
    <footer className="bg-light text-muted py-5">
      {/* Social Media Section */}
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-secondary">
                Kết nối với chúng tôi qua các nền tảng mạng xã hội:
              </span>
              <div className="d-flex gap-3">
                <a
                  href={socialLinks.Linkedin}
                  className="text-muted text-decoration-none fs-5"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.Github}
                  className="text-muted text-decoration-none fs-5"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="row mb-4">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: "#ff6b35" }}
            >
              <img src={logo} alt="" height="30" className="me-2" />
              Gamestore
            </h6>
            <p className="text-muted">
              Sản phẩm chỉ mang tính chất nghiên cứu và học tập. Không có ý định
              sử dụng với mục đích thương mại.
            </p>
          </div>

          {/* Products */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Sản phẩm</h6>
            <p>
              <FooterLink href="/windows" label="Windows" />
            </p>
            <p>
              <FooterLink href="/playstation" label="Playstation" />
            </p>
            <p>
              <FooterLink href="/nintendo" label="Nintendo" />
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Tài khoản</h6>
            <p>
              <FooterLink href="/login" label="Đăng nhập" />
            </p>
            <p>
              <FooterLink href="register" label="Đăng ký" />
            </p>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
            <p className="text-muted">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="me-3"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Hồ Chí Minh, Việt Nam
            </p>
            <p className="text-muted">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="me-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              giangnht1403@gmail.com
            </p>
            <p className="text-muted">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="me-3"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              + 84 123 456 789
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center p-4 border-top">
          <span className="text-muted">© 2025 Copyright: </span>
          <a className="text-muted fw-bold text-decoration-none" href="/">
            Gamestore.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
