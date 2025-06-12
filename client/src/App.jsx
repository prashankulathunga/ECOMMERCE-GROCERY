import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import AuthForm from "./components/AuthForm";
import AllProduct from "./pages/AllProduct";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProducts from "./pages/seller/AddProducts";
import ProductList from "./pages/seller/ProductList";
import Order from "./pages/seller/Order";

function App() {

  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin, isSeller} = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin && <AuthForm/>}
      <Toaster/>
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product" element={<AllProduct/>}/>
          <Route path="/product/:category" element={<ProductCategory/>}/>
          <Route path="/product/:category/:id" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/add-address" element={<AddAddress/>} />
          <Route path="/my-orders" element={<MyOrders/>}/>
          <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
            <Route index element={isSeller? <AddProducts/> : null}/>
            <Route path="product-list" element={isSeller? <ProductList/>: null}/>
            <Route path="orders" element={isSeller? <Order/> : null}/>
          </Route>
        </Routes>
      </div>
      {isSellerPath ? null : <Footer />}
    </div>
  );
}

export default App;