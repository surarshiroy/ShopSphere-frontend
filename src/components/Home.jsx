import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import AppContext from "../context/Context";

const Home = ({
  selectedCategory,
  searchQuery,
}) => {

  const {
    data,
    isError,
    refreshData,
    addToCart,
  } = useContext(AppContext);

  const [products, setProducts] =
    useState([]);
    const [loading, setLoading] = useState(true);

  const [isDataFetched, setIsDataFetched] =
    useState(false);

  const [showPopup, setShowPopup] =
    useState(false);

  useEffect(() => {

    if (!isDataFetched) {

      refreshData();

      setIsDataFetched(true);

    }

  }, [refreshData, isDataFetched]);

  useEffect(() => {

    const fetchImagesAndUpdateProducts =
      async () => {

        try {

          const response =
            await axios.get(
              "https://shopsphere-backend-v2.onrender.com/api/products"
            );

          const updatedProducts =
            await Promise.all(

              response.data.content.map(
                async (product) => {

                  try {

                    const imageResponse =
                      await axios.get(
                        `https://shopsphere-backend-v2.onrender.com/api/product/${product.id}/image`,
                        {
                          responseType: "blob",
                        }
                      );

                    const imageUrl =
                      URL.createObjectURL(
                        imageResponse.data
                      );

                    return {
                      ...product,
                      imageUrl,
                    };

                  } catch {

                    return {
                      ...product,
                      imageUrl:
                        "https://via.placeholder.com/300",
                        
                    };

                  }

                }
              )
            );

          setProducts(updatedProducts);
          setLoading(false);

        } catch (error) {

          console.error(error);
          setLoading(false);

        }

      };

    fetchImagesAndUpdateProducts();

  }, [data]);

useEffect(() => {

  const fetchProducts = async () => {

    try {

      let response;

      if (searchQuery.trim()) {

        response = await axios.get(
          `https://shopsphere-backend-v2.onrender.com/api/products/search?keyword=${searchQuery}`
        );

      } else {

        response = await axios.get(
          "https://shopsphere-backend-v2.onrender.com/api/products"
        );

      }

      const productsArray =
        searchQuery.trim()
          ? response.data
          : response.data.content;

      const updatedProducts =
        await Promise.all(

          productsArray.map(async (product) => {

            try {

              const imageResponse =
                await axios.get(
                  `https://shopsphere-backend-v2.onrender.com/api/product/${product.id}/image`,
                  {
                    responseType: "blob",
                  }
                );

              return {

                ...product,

                imageUrl:
                  URL.createObjectURL(
                    imageResponse.data
                  ),

              };

            } catch {

              return {

                ...product,

                imageUrl:
                  "https://via.placeholder.com/300",

              };

            }

          })

        );

      setProducts(updatedProducts);

      setLoading(false);

    }

    catch(error){

      console.log(error);

      setLoading(false);

    }

  };

  fetchProducts();

}, [searchQuery]);
if (loading) {

  return (

    <div
      className="d-flex flex-wrap gap-4"
      style={{
        padding: "25px",
        justifyContent: "center",
        marginTop: "60px",
      }}
    >

      {Array.from({ length: 8 }).map((_, index) => (

        <div
          key={index}
          className="card placeholder-glow"
          style={{
            width: "100%",
            maxWidth: "350px",
            borderRadius: "16px",
            border: "none",
            overflow: "hidden",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >

          <span
            className="placeholder"
            style={{
              height: "220px",
              width: "100%",
            }}
          ></span>

          <div className="card-body">

            <p className="placeholder-glow">
              <span className="placeholder col-8"></span>
            </p>

            <p className="placeholder-glow">
              <span className="placeholder col-6"></span>
            </p>

            <p className="placeholder-glow">
              <span className="placeholder col-4"></span>
            </p>

            <button
              className="btn btn-primary disabled placeholder col-12"
            >
            </button>

          </div>

        </div>

      ))}

      <div
        className="w-100 text-center mt-4"
      >

        <h3>
          Starting ShopSphere...
        </h3>

        <p
          className="text-muted"
        >
          Backend is waking up for the first request.
          This can take around a minute on Render's free tier.
        </p>

      </div>

    </div>

  );

}

const filteredProducts =
  selectedCategory
    ? products.filter(
        (product) =>
          product.category ===
          selectedCategory
      )
    : products;

  return (

    <>
      <div
        className="d-flex flex-wrap gap-4"
        style={{
          padding: "25px",
          justifyContent: "center",
          marginTop: "60px",
        }}
      >

        {filteredProducts.length === 0 ? (

          <h2
            className="text-center w-100"
            style={{
              marginTop: "100px",
            }}
          >
            No Products Available
          </h2>

        ) : (

          filteredProducts.map((product) => {

            const {
              id,
              brand,
              name,
              price,
              productAvailable,
              imageUrl,
            } = product;

            return (

    <div
  className="card"
  key={id}
  style={{
    width: "100%",
    maxWidth: "350px",
    borderRadius: "16px",
    border: "none",
    overflow: "hidden",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor:
      productAvailable
        ? "#fff"
        : "#f1f1f1",
  }}
>

                <Link
                  to={`/product/${id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >

                  <div
                    style={{
                      position: "relative",
                    }}
                  >

                    <img
                      src={imageUrl}
                      alt={name}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />

                  </div>

                  <div
                    className="card-body"
                    style={{
                      padding: "18px",
                    }}
                  >

                    <h5
                      style={{
                        fontWeight: "700",
                        marginBottom: "10px",
                      }}
                    >
                      {name.toUpperCase()}
                    </h5>

                    <p
                      style={{
                        fontStyle: "italic",
                        color: "#666",
                        marginBottom: "18px",
                      }}
                    >
                      ~ {brand}
                    </p>

                    <h4
                      style={{
                        fontWeight: "700",
                        marginBottom: "20px",
                      }}
                    >
                       ₹{price}
                    </h4>

                  </div>

                </Link>

                <div
                  style={{
                    padding:
                      "0 18px 18px 18px",
                  }}
                >

                  <button
                    type="button"
                    style={{
                      width: "100%",
                      border: "none",
                      borderRadius: "30px",
                      background: "#216df0",
                      padding: "14px",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "18px",
                      cursor: "pointer",
                      opacity:
                        productAvailable
                          ? "1"
                          : "0.7",
                    }}
                    onClick={() => {

                      addToCart(product);

                      setShowPopup(true);

                      setTimeout(() => {

                        setShowPopup(false);

                      }, 2000);

                    }}
                    disabled={!productAvailable}
                  >

                    {productAvailable
                      ? "Add To Cart"
                      : "Out Of Stock"}

                  </button>

                </div>

              </div>

            );

          })

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

    </>

  );

};

export default Home;