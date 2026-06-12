import { Toast, ToastContainer } from "react-bootstrap";

const CustomToast = ({
  show,
  setShow,
  message,
  bg = "success"
}) => {

  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      <Toast
        bg={bg}
        show={show}
        onClose={() => setShow(false)}
        delay={3000}
        autohide
      >
        <Toast.Body
          className="text-white"
        >
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;