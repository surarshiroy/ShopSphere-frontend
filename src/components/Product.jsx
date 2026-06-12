import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


import {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import AppContext from "../context/Context";



const Product = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
  addToCart,
  removeFromCart,
} = useContext(AppContext);

  const [product, setProduct] =
    useState(null);

  const [showPopup, setShowPopup] =
    useState(false);

    const role = localStorage.getItem("role");
const isAdmin = role === "ROLE_ADMIN";

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response =
          await axios.get(
            `https://shopsphere-backend-v2.onrender.com/api/product/${id}`
          );
          console.log(response.data);

        setProduct(response.data);

      } catch (error) {

        console.error(
          "Error fetching product:",
          error
        );

      }

    };

    fetchProduct();

  }, [id]);

  if (!product) {

    return (
      <h2
        className="text-center"
        style={{
          padding: "10rem",
        }}
      >
        Loading...
      </h2>
    );

  }

  console.log(product.releaseDate);
  const isMobile = window.innerWidth <= 768;
  return (

    <div
  style={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
    paddingTop: "80px",
    paddingLeft: isMobile ? "20px" : "80px",
    paddingRight: isMobile ? "20px" : "40px",
    paddingBottom: "40px",
    width: "100%",
  }}
>

      <div>

        <img
          src={`https://shopsphere-backend-v2.onrender.com/api/product/${product.id}/image`}
          alt={product.name}
          style={{
            width: isMobile ? "250px" : "340px",
height: isMobile ? "250px" : "340px",
            objectFit: "contain",
            borderRadius: "16px",
            backgroundColor: "#fff",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
            padding: "15px",
          }}
        />

      </div>

     <div
  style={{
    width: isMobile ? "100%" : "420px",
    textAlign: isMobile ? "center" : "left",
  }}
>

        <span
          style={{
            color: "#216df0",
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {product.category}
        </span>

        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          {product.name}
        </h1>

        <h4
          style={{
            marginBottom: "16px",
          }}
        >
          {product.brand}
        </h4>

        <p
          style={{
            fontSize: "15px",
            color: "#444",
            marginBottom: "20px",
          }}
        >
          {product.description}
        </p>

        <hr />

        <h1
          style={{
            marginTop: "20px",
            fontSize: "38px",
            fontWeight: "700",
          }}
        >
          ${product.price}
        </h1>

        <button
          onClick={() => {

            addToCart(product);

            setShowPopup(true);

            setTimeout(() => {

              setShowPopup(false);

            }, 2000);

          }}
          disabled={
            !product.productAvailable
          }
          style={{
            marginTop: "20px",
            width: isMobile ? "100%" : "180px",
            padding: "10px",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "#216df0",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            opacity:
              product.productAvailable
                ? 1
                : 0.7,
          }}
        >

          {product.productAvailable
            ? "Add to cart"
            : "Out Of Stock"}

        </button>

        <h5
          style={{
            marginTop: "25px",
            fontWeight: "600",
          }}
        >
          Stock Available :

          <span
            style={{
              color: "green",
              marginLeft: "10px",
            }}
          >
            {product.stockQuantity}
          </span>

        </h5>

        <div
          style={{
            marginTop: "20px",
          }}
        >

          <h6>
            Product listed on:
          </h6>

          <i>
            {new Date(
              product.releaseDate
            ).toLocaleDateString(
              "en-GB"
            )}
            
          </i>

        </div>

{isAdmin && (

  <div
    style={{
      marginTop: "25px",
      display: "flex",
      gap: "12px",
      justifyContent: isMobile ? "center" : "flex-start",
    }}
  >

    <button
      className="btn btn-primary"
      onClick={() =>
        navigate(`/product/update/${id}`)
      }
    >
      Update
    </button>

    <button
      className="btn btn-danger"
      onClick={async () => {

        const confirmDelete =
          window.confirm(
            "Are you sure you want to delete this product?"
          );

        if (!confirmDelete) return;

        try {

          const token =
            localStorage.getItem("token");

          await axios.delete(
            `https://shopsphere-backend-v2.onrender.com/api/product/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          removeFromCart(product.id);

          alert(
            "Product deleted successfully"
          );

          navigate("/");

        } catch (error) {

          console.error(
            "Delete failed:",
            error
          );

          alert(
            "Failed to delete product"
          );

        }

      }}
    >
      Delete
    </button>

  </div>

)}

        

      </div>

      {showPopup && (

        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "30px",
            backgroundColor: "#28a745",
            color: "white",
            padding: "14px 22px",
            borderRadius: "10px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: "9999",
            fontWeight: "600",
          }}
        >

          Product added to cart ✓

        </div>

      )}

    </div>

  );

};

export default Product;