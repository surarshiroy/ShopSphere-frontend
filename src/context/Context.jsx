import axios from "axios";

import {

  useState,

  useEffect,

  createContext,

} from "react";



const AppContext = createContext();



export const AppProvider = ({ children }) => {



  const [data, setData] = useState([]);

  const [isError, setIsError] = useState("");

  const [cart, setCart] = useState(

    JSON.parse(localStorage.getItem("cart")) || []

  );



  const addToCart = (product) => {



    console.log("ADDING:", product);



    const existingProduct =

      cart.find(

        (item) => item.id === product.id

      );



    let updatedCart;



    if (existingProduct) {



      updatedCart = cart.map((item) =>

        item.id === product.id

          ? {

              ...item,

              quantity: item.quantity + 1,

            }

          : item

      );



    } else {



      updatedCart = [

        ...cart,

        {

          ...product,

          quantity: 1,

        },

      ];



    }



    setCart(updatedCart);



    localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)

    );



  };



  const removeFromCart = (productId) => {



    const updatedCart =

      cart.filter(

        (item) => item.id !== productId

      );



    setCart(updatedCart);



    localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)

    );



  };



  const clearCart = () => {



    setCart([]);



    localStorage.removeItem("cart");



  };



  const refreshData = async () => {



    try {



      const response =

        await axios.get("/products");



      setData(response.data);



    } catch (error) {



      console.error(error);



      setIsError(error.message);



    }



  };



  useEffect(() => {



    refreshData();



  }, []);



  useEffect(() => {



    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    );



  }, [cart]);



  return (



    <AppContext.Provider

      value={{

        data,

        isError,

        cart,

        addToCart,

        removeFromCart,

        refreshData,

        clearCart,

      }}

    >



      {children}



    </AppContext.Provider>



  );



};



export default AppContext;