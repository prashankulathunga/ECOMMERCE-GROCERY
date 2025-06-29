import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const currency = import.meta.VITE_CURRENCY;

  // fetch all products
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("product/list");

      if (data.success) {
        setProduct(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // fetch user auth status, user data and cart items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user/is-auth");

      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Product added to cart");
  };

  // update product quantity
  const updateCart = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
    }
    toast.success("Product removed from cart");
  };

  // total count of the cart

  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // get cart total amount
  const getCartTotal = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let productPrice = product.find((products) => products._id === items);
      totalAmount += productPrice.offerPrice * cartItems[items];
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProduct();
    fetchUser();
  }, []);

  useEffect(() => {
    const updateCartItems = async () => {
      try {
        const { data } = await axios.post("/cart/update", { cartItems });
        if (!data.success) {
          toast.error(error.message);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    if (user) {
      updateCartItems();
    }
  }, [cartItems]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    setShowUserLogin,
    showUserLogin,
    product,
    currency,
    addToCart,
    updateCart,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartTotal,
    axios,
    fetchProduct,
    setCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
