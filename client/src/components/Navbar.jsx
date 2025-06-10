import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const [open, setOpen] = React.useState(false);

  const { user, setUser, navigate, setShowUserLogin, setSearchQuery, searchQuery, getCartCount} = useAppContext();

  const logout = async ()=>{
    setUser(null);
    navigate("/");
  }

  useEffect(()=>{
    if(searchQuery.length > 0){
      navigate(`/all-products`);
    }
  }, [searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4  bg-white relative transition-all">
      <NavLink to="/">
        <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/product">All Products</NavLink>
        {user && <NavLink to="/my-orders">My Orders</NavLink>}
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input 
            onChange={(e)=>setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div onClick={()=>{
            user ? navigate("/cart") : setShowUserLogin(true)
        }} className="relative cursor-pointer">
          <img src={assets.cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-6 py-2 mt-2 md:-mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10 -mt-2" alt="user-icon" />
            <ul className="hidden group-hover:block absolute -mt-2 w-20 py-2.5 text-sm rounded-md bg-white top-10 right-0 z-50">
                <li onClick={()=>navigate("/my-orders")} className="p-1.5 pl-2 hover:bg-primary/10 cursor-pointer rounded-md">My Orders</li>
                <li onClick={logout} className="p-1.5 pl-2 hover:bg-primary/10 cursor-pointer rounded-md">Logout</li>
            </ul>
          </div>
        )}
      </div>

<div className="flex items-center gap-6 sm:hidden">
<div onClick={()=>{
            user ? navigate("/cart") : setShowUserLogin(true)
        }} className="relative cursor-pointer">
          <img src={assets.cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className=""
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu_icon} alt="menu" className="w-6" />
      </button>
</div>


      

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}
      >
        <NavLink onClick={() => setOpen(false)} to="/" className="block">
          Home
        </NavLink>
        <NavLink
          onClick={() => setOpen(false)}
          to="/all-products"
          className="block"
        >
          All Products
        </NavLink>

        {user && (
          <NavLink
            onClick={() => setOpen(false)}
            to="/my-orders"
            className="block"
          >
            My Orders
          </NavLink>
        )}

        <NavLink onClick={() => setOpen(false)} to="/contact" className="block">
          Contact
        </NavLink>
        {!user ? (
          <button onClick={()=>{setShowUserLogin(true); setOpen(false);}} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Login
          </button>
        ) : (
          <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
