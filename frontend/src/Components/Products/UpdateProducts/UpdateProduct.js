import React, { useEffect, useState } from "react";
import "./UpdateProduct.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const token=JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const param = useParams();
  let id = param.id;
  const [inputData, setInputData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const InputHandle = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const UpdateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${id}`,{
        method:"PUT",
        body:JSON.stringify(inputData),
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    });
    result = await result.json();
    if(result){
        alert("Updated product successfully.")
        console.log(result);
        navigate("/");
    }
    
  };

  const getSingleProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    result = await result.json();
    setInputData({
      name: result.name,
      price: result.price,
      category: result.category,
      company: result.company,
    });
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
  return (
    <div className="addProducts">
      <p>Update Product</p>
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
        </div>
      </div>
      <button
        type="button"
        className="button"
        onClick={UpdateProduct}
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
