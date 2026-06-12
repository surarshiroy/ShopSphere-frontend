import { useState } from "react";

import axios from "axios";

const AddProduct = () => {

  const [product, setProduct] =
    useState({
      name: "",
      description: "",
      brand: "",
      price: "",
      category: "",
      releaseDate: "",
      productAvailable: false,
      stockQuantity: "",
    });

  const [image, setImage] =
    useState(null);

  const [showPopup, setShowPopup] =
    useState(false);

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setProduct({
      ...product,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  const handleImageChange = (e) => {

    setImage(e.target.files[0]);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData =
        new FormData();

      formData.append(
        "imageFile",
        image
      );

      formData.append(
        "product",
        new Blob(
          [JSON.stringify(product)],
          {
            type:
              "application/json",
          }
        )
      );

      await axios.post(
  "http://localhost:8080/api/product",
  formData,
  {
    headers: {
      "Content-Type":
        "multipart/form-data",

      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

      setShowPopup(true);

      setTimeout(() => {

        setShowPopup(false);

      }, 2000);

      setProduct({
        name: "",
        description: "",
        brand: "",
        price: "",
        category: "",
        releaseDate: "",
        productAvailable: false,
        stockQuantity: "",
      });

      setImage(null);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to add product"
      );

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        paddingTop: "120px",
        paddingBottom: "60px",
        display: "flex",
        justifyContent: "center",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "950px",
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >

          <h1
            style={{
              fontWeight: "700",
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            Add Product
          </h1>

          <p
            style={{
              color: "#666",
            }}
          >
            Create a new product
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
        >

          <div className="row g-4">

            <div className="col-md-6">

              <label className="form-label">
                Product Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6">

              <label className="form-label">
                Brand
              </label>

              <input
                type="text"
                className="form-control"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-12">

              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Price
              </label>

              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Category
              </label>

              <select
                className="form-select"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select category
                </option>

                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Audio">Audio</option>
                <option value="Gaming">Gaming</option>
                <option value="Fashion">Fashion</option>
                <option value="Shoes">Shoes</option>
                <option value="Sports">Sports</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Smart Watch">Smart Watch</option>
                <option value="Camera">Camera</option>
                <option value="Furniture">Furniture</option>
                <option value="Books">Books</option>
                <option value="Fitness">Fitness</option>

              </select>

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Stock Quantity
              </label>

              <input
                type="number"
                className="form-control"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6">

              <label className="form-label">
                Release Date
              </label>

              <input
                type="date"
                className="form-control"
                name="releaseDate"
                value={product.releaseDate}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6">

              <label className="form-label">
                Product Image
              </label>

              {image && (

                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    marginBottom: "12px",
                  }}
                />

              )}

              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                required
              />

            </div>

            <div className="col-12">

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="productAvailable"
                  checked={
                    product.productAvailable
                  }
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Product Available
                </label>

              </div>

            </div>

            <div className="col-12">

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding:
                    "12px 30px",
                  borderRadius:
                    "12px",
                  fontWeight:
                    "600",
                }}
              >
                Add Product
              </button>

            </div>

          </div>

        </form>

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
            zIndex: "9999",
            fontWeight: "600",
          }}
        >

          Product added successfully ✓

        </div>

      )}

    </div>

  );

};

export default AddProduct;