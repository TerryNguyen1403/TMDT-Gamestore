import { Toast, ToastContainer } from "react-bootstrap";

const Notification = ({ bgType, msg }) => {
  return (
    <>
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 1050 }}
      >
        <Toast
          className="d-inline-block m-1"
          bg={bgType.toLowerCase()}
          key={bgType}
        >
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className={bgType === "Dark" && "text-white"}>
            {msg}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Notification;
