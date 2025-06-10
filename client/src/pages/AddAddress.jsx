import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/10 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}   
    required
  />
);

function AddAddress() {


    const [address, setAddress] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setAddress((prevAddress)=>({
        ...prevAddress,
        [name]: value
    }))
  }


  return (
    <div>
      <div className="mt-16 pb-16">
        <p className="text-2xl md:text-3xl text-gray-500">
          Add Shipping{" "}
          <span className="font-semibold text-primary">Address</span>
        </p>
        <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
          <div className="flex-1 max-w-md">
            <form className="space-y-3 mt-6 text-sm" onSubmit={onSubmitHandler}>
              <div className="grid grid-cols-2 gap-4">
                <InputField type="text" placeholder="First Name" name="firstName" handleChange={handleChange} address={address}  />
                <InputField type="text" placeholder="Last Name" name="lastName" handleChange={handleChange} address={address}  />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField type="text" placeholder="E mail" name="email" handleChange={handleChange} address={address}  />
                <InputField type="text" placeholder="State" name="state" handleChange={handleChange} address={address}  />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField type="number" placeholder="Zip Code" name="zipCode" handleChange={handleChange} address={address}  />
                <InputField type="text" placeholder="Country" name="country" handleChange={handleChange} address={address}  />
              </div>

              <InputField type="text" placeholder="Phone Number" name="phone" handleChange={handleChange} address={address}  />

              <button className="w-full mt-6 bg-primary hover:bg-primary-dull text-white py-3 transition cursor-pointer uppercase">Save Address</button>

            </form>
          </div>
          <img
            className="md:mr-16 mb-16 md:mt-10"
            src={assets.add_address_iamge}
            alt="add-address"
          />
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
