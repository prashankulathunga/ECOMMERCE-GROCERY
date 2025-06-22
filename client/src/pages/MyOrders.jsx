import React, { useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrder, setMyOrder] = useState([]);

  const { axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/order/user");

      if (data.success) {
        setMyOrder(data.orders);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [user]);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myOrder.map((order, index) => (
        <div
          key={index}
          className="border border-gray-200/30 rounded-lg p-4 py-5 max-w-4xl my-8 my:mb-16"
        >
          <p className="flex justify-between md:item-center text-gray-400 md:font-medium max-md:flex-col">
            <span>OrderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: ${order.amount}</span>
          </p>
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white text-gray-500/70 ${
                order.items.length - 1 !== index &&
                "border-b border-gray-200/30"
              } flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt="image"
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-medium text-gray-800">
                    {item.product.name}
                  </h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-gray-400/70">
                <p>Quantity: {item.quantity || "1"}</p>
                <p>Status: {order.status || "1"}</p>
                <p>Date: {new Date(order.createdAt).toDateString()}</p>
              </div>
              <p className="text-primary text-lg font-medium">
                Amount: ${item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
