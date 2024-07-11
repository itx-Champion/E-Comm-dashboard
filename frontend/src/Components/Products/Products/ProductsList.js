import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { Link } from "react-router-dom";

const ProductsList = () => {
    const token=JSON.parse(localStorage.getItem('token'))
  const [products, setProducts] = useState([]);
// !product list
  const ShowProduct = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    result = await result.json();
    setProducts(result);
  };

  useEffect(() => {
    ShowProduct();
  }, []);

// !delete product
  const DeleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
      headers:{
        Authorization:`Bearer ${token}`
    }
    });
    result = await result.json();
    if (result) {
      alert("Product is Deleted");
      ShowProduct();
      console.log(result);
    }
  };
  //   !4 search
  const SearchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      ShowProduct();
    }
  };

  return (
    <div className="product">
      <span>Product List</span>
      <div className="searchBox">
        <label for="search">Search Product:</label>
        <input
          type="text"
          name="search"
          placeholder="Search Product..."
          onChange={SearchHandle}
        ></input>
      </div>

      <ul>
        <li>Sr.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => {
          return (
            <ul className="innerlist" key={index}>
              <li id="sr">{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price} $</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <button
                className="buttonop"
                onClick={() => DeleteProduct(item._id)}
              >
                Delete
              </button>
              <Link to={`/update/${item._id}`}>
                <button className="buttonop">Update</button>
              </Link>
            </ul>
          );
        })
      ) : (
        <span id="nofound">No Product found.</span>
      )}
    </div>
  );
};

export default ProductsList;
