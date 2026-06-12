
import "./App.css";

import React, { useState, useEffect } from "react";

import Home from "./components/Home";

import Navbar from "./components/Navbar";

import Cart from "./components/Cart.jsx";

import AddProduct from "./components/AddProduct";

import Product from "./components/Product";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./Context/Context";

import UpdateProduct from "./components/UpdateProduct";

import Login from "./components/Login";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./components/Register";




function App() {

  const [cart, setCart] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);



  const handleCategorySelect = (category) => {

    setSelectedCategory(category);

    console.log("Selected category:", category);

  };

  const addToCart = (product) => {

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {

      setCart(

        cart.map((item) =>

          item.id === product.id

            ? { ...item, quantity: item.quantity + 1 }

            : item

        )

      );

    } else {

      setCart([...cart, { ...product, quantity: 1 }]);

    }

  };



  return (

    <AppProvider>

      <BrowserRouter>

        <Navbar
  onSelectCategory={handleCategorySelect}
  onSearch={setSearchQuery}
  suggestions={suggestions}
  setSuggestions={setSuggestions}
/>

         <div style={{ paddingTop: "90px" }}>

        <Routes>

          <Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/register"
  element={<Register />}
/>

          <Route

            path="/"

            element={

              <Home
  selectedCategory={selectedCategory}
  searchQuery={searchQuery}
/>

            }

          />

          <Route
  path="/add_product"
  element={
    <ProtectedRoute>
      <AddProduct />
    </ProtectedRoute>
  }
/>

         

          <Route path="product/:id" element={<Product  />} />

         <Route
  path="/product/update/:id"
  element={
    <ProtectedRoute>
      <UpdateProduct />
    </ProtectedRoute>
  }
/>

          <Route path="/cart" element={<Cart />} />

        </Routes>

        </div>

      </BrowserRouter>

    </AppProvider>

  );

}



export default App;