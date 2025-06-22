import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const {
    product,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCart,
    getCartTotal,
    navigate,
    user,
    axios,
    setCartItems
  } = useAppContext();

  const cardData = () => {
    let dataArray = [];
    for (const item in cartItems) {
      const cartProduct = product.find((items) => items._id === item);
      cartProduct.quantity = cartItems[item];
      dataArray.push(cartProduct);
    }
    setCartArray(dataArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/address/get");
      console.log(data);

      if (data.success) {
        console.log("Hello I am test address", data.addresses);
        setAddress(data.addresses);

        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        } else {
          setSelectedAddress(null);
          toast.error("No address found");
        }
      } else {
        toast.error("Invalid address data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      // place order in COD
      if (paymentMethod === "COD") {
        const { data } = await axios.post("/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems([]);
          navigate("/my-orders");
        } else {
          toast.error(error.message);
        }
      }else{
        const { data } = await axios.post("/order/stripe", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          window.location.replace(data.url)
        } else {
          toast.error(error.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (product.length && cartItems) {
      cardData();
    }
  }, [product, cartItems]);

  useEffect(() => {
    console.log("User changed:", user);
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row sm:mt-16 mt-8">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((products, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/product/${products.category.toLowerCase()}/${
                      products._id
                    }`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-100 rounded-xl"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={products.image[0]}
                  alt={products.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{products.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{products.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      value={cartItems[products._id]}
                      onChange={(e) =>
                        updateCart(products._id, Number(e.target.value))
                      }
                      className="outline-none"
                    >
                      {Array(
                        cartItems[products._id] > 9
                          ? cartItems[products._id]
                          : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              ${products.offerPrice * products.quantity}
            </p>
            <button
              onClick={() => removeFromCart(products._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove-icon"
                className="w-6 h-6 inline-block"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/product")}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            className="group-hover:-translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt="arrow"
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-50/10 py-5 lg:px-5 max-md:mt-16 sm:border sm:border-gray-100/70 rounded-xl">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-100 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p
              className={`${
                selectedAddress ? "text-gray-500" : "text-red-400"
              } text-sm`}
            >
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city},${selectedAddress.state}, ${selectedAddress.country}`
                : `No address found`}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {address.map((ad, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setShowAddress(false);
                      setSelectedAddress(ad);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {ad.street}, {ad.city}, {ad.state}, {ad.country}
                  </p>
                ))}
                <p
                  onClick={() => {
                    setShowAddress(false);
                    navigate("add-address");
                  }}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-100 bg-white px-3 py-2 mt-2 outline-none rounded-md cursor-pointer"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-100" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${getCartTotal()}</span>
          </p>
          <p className="flex justify-between font-medium">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${Math.floor(getCartTotal() * 2) / 100}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${getCartTotal() * 0.02 + getCartTotal()}</span>
          </p>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
