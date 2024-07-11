import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(()=>{
    const auth=localStorage.getItem("user");
    if(auth){
        navigate("/");
    }
  })
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const CollectData = async () => {
    const fetchResult = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await fetchResult.json();
    console.log(result);
    if(result){
        navigate("/");
        localStorage.setItem("user",JSON.stringify(result.resulta))
        localStorage.setItem("token",JSON.stringify(result.auth))
    }
  };
  return (
    <div className="signup">
      <span>Register</span>
      <div className="inputhandle">
        <div className="allinputhandle">
          <label for="name">User Name :</label>
          <input
            className="inputbox"
            type="text"
            name="name"
            placeholder="Enter your name..."
            autoComplete="off"
            value={formData.name}
            onChange={HandleInput}
          />
        </div>
        <div className="allinputhandle">
          <label for="email">Email :</label>
          <input
            className="inputbox"
            type="email"
            name="email"
            placeholder="Enter your email..."
            autoComplete="off"
            value={formData.email}
            onChange={HandleInput}
          />
        </div>
        <div className="allinputhandle">
          <label for="password">password :</label>
          <input
            className="inputbox"
            type="password"
            name="password"
            placeholder="Enter your password..."
            autoComplete="off"
            value={formData.password}
            onChange={HandleInput}
          />
        </div>
      </div>
      <button className="button" onClick={()=>CollectData()}>
        Sign up
      </button>
    </div>
  );
};

export default Signup;
