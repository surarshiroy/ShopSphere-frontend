import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomToast from "./CustomToast";

const Register = () => {

  const navigate = useNavigate();
  const [toastShow, setToastShow] =
  useState(false);

const [toastMessage, setToastMessage] =
  useState("");

const [toastType, setToastType] =
  useState("success");

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

      await axios.post(
        "https://shopsphere-backend-v2.onrender.com/auth/register",
        formData
      );

      setToastMessage(
  "Registration Successful"
);

setToastType("success");

setToastShow(true);

setTimeout(() => {

  navigate("/login");

}, 1500);

    } catch (error) {

      console.error(error);

     setToastMessage(
  error.response?.data ||
  "Registration Failed"
);

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
          Register
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
            className="btn btn-success w-100"
            type="submit"
          >
            Register
          </button>

        </form>

        <p className="mt-3 text-center">

          Already have an account?

          <Link to="/login">
            Login
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

export default Register;