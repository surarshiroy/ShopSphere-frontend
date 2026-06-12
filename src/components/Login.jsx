import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CustomToast from "./CustomToast";

const Login = () => {

  const navigate = useNavigate();
  const [toastShow, setToastShow] = useState(false);

const [toastMessage, setToastMessage] = useState("");

const [toastType, setToastType] = useState("success");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://shopsphere-backend-v2.onrender.com/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

     setToastMessage("Login Successful");
setToastType("success");
setToastShow(true);

setTimeout(() => {
  navigate("/");
  window.location.reload();
}, 1500);

    } catch (error) {

      console.error(error);

     setToastMessage("Invalid Credentials");
setToastType("danger");
setToastShow(true);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >

      <div
        style={{
          width: "90%",
maxWidth: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >

        <h2 className="mb-4 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="mt-3 text-center">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>
      <CustomToast
  show={toastShow}
  setShow={setToastShow}
  message={toastMessage}
  bg={toastType}
/>

    </div>

  );

};

export default Login;