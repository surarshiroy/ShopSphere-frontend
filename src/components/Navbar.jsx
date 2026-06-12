
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import AppContext from "../context/Context";

const Navbar = ({

  onSelectCategory,

  onSearch,

  suggestions,

  setSuggestions,

}) => {

  const { cart } =
    useContext(AppContext);

  const navigate =
    useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const token = localStorage.getItem("token");
    
    const role = localStorage.getItem("role");
const username = localStorage.getItem("username");



const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("cart");

  navigate("/");

  window.location.reload();

};

  return (

    <>
      <header>

        <nav
          className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top"
        >

          <div className="container-fluid">

            <Link
              className="navbar-brand fw-bold text-dark"
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
            ShopSphere
            </Link>

            <button
  className="navbar-toggler"
  type="button"
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span className="navbar-toggler-icon"></span>
</button>

      <div
  className={`navbar-collapse mt-3 mt-lg-0 ${
    menuOpen ? "d-block" : "d-none"
  } d-lg-flex`}
>

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">

                  <Link
                    className="nav-link active"
                    to="/"
                  >
                    Home
                  </Link>

                </li>

               {role === "ROLE_ADMIN" && (

  <li className="nav-item">

    <Link
      className="nav-link"
      to="/add_product"
    >
      Add Product
    </Link>

  </li>

)}

                {/* CATEGORY DROPDOWN */}

                <li className="nav-item dropdown">

                  <button
                    className="nav-link dropdown-toggle btn btn-link text-decoration-none"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: "black",
                    }}
                  >
                    Categories
                  </button>

                  <ul className="dropdown-menu">

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Mobile")
                        }
                      >
                        Mobile
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Laptop")
                        }
                      >
                        Laptop
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Audio")
                        }
                      >
                        Audio
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Gaming")
                        }
                      >
                        Gaming
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Fashion")
                        }
                      >
                        Fashion
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Shoes")
                        }
                      >
                        Shoes
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Sports")
                        }
                      >
                        Sports
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Electronics")
                        }
                      >
                        Electronics
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Accessories")
                        }
                      >
                        Accessories
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Smart Watch")
                        }
                      >
                        Smart Watch
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Camera")
                        }
                      >
                        Camera
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Furniture")
                        }
                      >
                        Furniture
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Books")
                        }
                      >
                        Books
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          onSelectCategory("Fitness")
                        }
                      >
                        Fitness
                      </button>
                    </li>

                  </ul>

                </li>

              </ul>

              {/* SEARCH */}

              <div
  className="my-2 my-lg-0"
  style={{
    position: "relative",
    width: "100%",
    maxWidth: "250px",
  }}
>

                <input
                  className="form-control me-3"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    width: "100%",
                  }}
                  onChange={async (e) => {

                    const value =
                      e.target.value;

                    onSearch(value);

                    if (
                      value.length > 1
                    ) {

                      try {

                        const response =
                          await axios.get(
                            `https://shopsphere-backend-v2.onrender.com/api/products/search?keyword=${value}`
                          );
                          console.log(response.data.content);

                        setSuggestions(
                          response.data
                        );

                      } catch (error) {

                        console.error(
                          error
                        );

                      }

                    } else {

                      setSuggestions(
                        []
                      );

                    }

                  }}
                />

                {suggestions.length > 0 && (

                  <div
                    style={{
                      position:
                        "absolute",

                      top: "45px",

                      left: "0",

                      width: "100%",

                      backgroundColor:
                        "white",

                      borderRadius:
                        "10px",

                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.15)",

                      zIndex:
                        "9999",

                      overflow:
                        "hidden",
                    }}
                  >

                    {suggestions.map(
                      (item) => (

                        <div
                          key={item.id}
                          style={{
                            padding:
                              "12px",

                            cursor:
                              "pointer",

                            borderBottom:
                              "1px solid #eee",
                          }}
                          onClick={() => {

                            setSuggestions(
                              []
                            );

                            navigate(
                              `/product/${item.id}`
                            );

                          }}
                        >

                          <strong>
                            {item.name}
                          </strong>

                          <div
                            style={{
                              fontSize:
                                "12px",

                              color:
                                "#666",
                            }}
                          >
                            {item.brand}
                          </div>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

              {/* CART */}

              {username ? (

   <div
    className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 mt-3 mt-lg-0"
  >

    <span>
      Welcome,{username}
    </span>

    <button
      className="btn btn-outline-danger btn-sm"
      onClick={logout}
    >
      Logout
    </button>

  </div>

) : (

  <Link
    to="/login"
    className="btn btn-primary btn-sm"
  >
    Login
  </Link>

)}

              <Link
                to="/cart"
                className="mt-3 mt-lg-0"
                style={{
                  textDecoration:
                    "none",

                  color: "black",
                }}
              >

                <div
                  className="d-flex align-items-center"
                  style={{
                    cursor: "pointer",
                  }}
                >

                  <i className="bi bi-cart3 me-2"></i>

                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    Cart ({cart.length})
                  </span>

                </div>

              </Link>
             

            </div>

          </div>

        </nav>

      </header>
    </>
  );
};

export default Navbar;