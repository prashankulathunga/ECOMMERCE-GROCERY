import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const currency = import.meta.CURRENCY;

  // fetch all products
  const fetchProduct = async()=>{
    setProduct(dummyProducts);
  }

  // add product to cart
  const addToCart = (itemId)=>{

    let cartData = structuredClone(cartItems);

    if(cartData[itemId]){
      cartData[itemId] += 1;
    }else{
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Product added to cart");
  }

  // update product quantity
  const updateCart = (itemId, quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success('Cart updated');
  }

  // remove product from cart
  const removeFromCart = (itemId)=>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] -= 1;
      if(cartData[itemId] === 0){
        delete cartData[itemId];
      }
      setCartItems(cartData);
    }
    toast.success('Product removed from cart');
  }


  useEffect(()=>{
    fetchProduct();
  },[product])

  const value = { navigate, user, setUser, isSeller, setIsSeller, setShowUserLogin, showUserLogin, product, currency, addToCart, updateCart, removeFromCart, cartItems, searchQuery, setSearchQuery };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
