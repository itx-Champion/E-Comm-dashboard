import React, { useState } from "react";
import './Add-products.css'
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const token=JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [errors, setErrors] = useState({});
  const InputHandle = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
    console.log(inputData.name);

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const validate = () => {
    let formErrors = {};
    if (!inputData.name) formErrors.name = "*Product name is required*";
    if (!inputData.price) {
      formErrors.price = "*Product price is required*";
    } else if (isNaN(inputData.price)) {
      formErrors.price = "*Product price must be a number*";
    }
    if (!inputData.category)
      formErrors.category = "*Product category is required*";
    if (!inputData.company) formErrors.company = "*Product company is required*";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const addProduct = async () => {
    if (!validate()) return;
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    const userId = user._id;
    inputData.userId = userId;
    let result = await fetch("http://localhost:5000/add", {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
    });
    result = await result.json();
    if (result) {
      alert("Product added in list.")
      navigate("/");
    }
  };
  return (
    <div className="addProducts">
      <p>Add Products</p>
      <div className="addInputHandle">
        <div>
          <div className="addInput">
            <label for="name">Product Name :</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name..."
              value={inputData.name}
              onChange={InputHandle}
            />
          </div>
          <div>
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
        </div>
        <div>
          <div className="addInput">
            <label for="price">Product Price :</label>
            <input
              type="text"
              name="price"
              placeholder="Enter product price..."
              value={inputData.price}
              onChange={InputHandle}
            />
          </div>
          <div>
            {errors.price && <span className="error">{errors.price}</span>}
          </div>
        </div>
        <div>
          <div className="addInput">
            <label for="category">Product Category :</label>
            <input
              type="text"
              name="category"
              placeholder="Enter product category..."
              value={inputData.category}
              onChange={InputHandle}
            />
          </div>
          <div>
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
        </div>
        <div>
          <div className="addInput">
            <label for="company">Product Company :</label>
            <input
              type="text"
              name="company"
              placeholder="Enter product company..."
              value={inputData.company}
              onChange={InputHandle}
            />
          </div>
          <div>
            {errors.company && <span className="error">{errors.company}</span>}
          </div>
        </div>
      </div>
      <button type="button" className="button" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProducts;
