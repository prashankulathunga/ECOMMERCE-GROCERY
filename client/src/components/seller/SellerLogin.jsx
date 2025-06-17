import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function SellerLogin() {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // seller is authenticated

  const sellerAuth = async () => {
    try {
      const { data } = await axios.get("/seller/is-auth");

      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsSeller(false);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
    sellerAuth();
  }, [isSeller]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post("/seller/login", {
        email,
        password,
      });

      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
        toast.success("Successfully login");
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      {!isSeller && (
        <form
          onSubmit={onSubmitHandler}
          className="min-h-screen flex items-center text-sm text-gray-600"
        >
          <div className="flex flex-col gap-5 m-auto item-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
            <p className="text-2xl font-medium m-auto">
              <span className="text-primary">Seller</span> Login
            </p>
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="enter your email"
                className="border border-gray-100 rounded w-full p-2 mt-1 outline-primary"
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="enter your password"
                className="border border-gray-100 rounded w-full p-2 mt-1 outline-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md cursor-pointer hover:bg-primary-dull"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SellerLogin;
