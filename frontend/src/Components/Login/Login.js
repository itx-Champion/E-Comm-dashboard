import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginResult, setLoginResult] = useState("Enter your registered Email");
  const GetValue = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
useEffect(()=>{
  const auth=localStorage.getItem("user");
  if(auth){
    navigate('/')
  }
},[])
  const HandleLogin = async () => {
    // console.log(loginData.email,loginData.password);
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setLoginResult(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token",JSON.stringify(result.auth))
      navigate("/")
    } else {
      alert("Please Enter correct details");
    }
    console.log(result);
  };
  return (
    <div className="login">
      <span>Login</span>
      <div className="inputhandle2">
        <div className="allinputhandle2">
          <label for="email">Email :</label>
          <input
            className="inputbox"
            type="email"
            name="email"
            placeholder="Enter your email..."
            autoComplete="off"
            value={loginData.email}
            onChange={GetValue}
          />
        </div>
        <div className="allinputhandle2">
          <label for="password">Password :</label>
          <input
            className="inputbox"
            type="password"
            name="password"
            placeholder="Enter your password..."
            autoComplete="off"
            value={loginData.password}
            onChange={GetValue}
          />
        </div>
      </div>
      <button className="button2" onClick={HandleLogin}>
        Login
      </button>
      <p>{loginResult ? loginResult.result : loginResult}</p>
    </div>
  );
};

export default Login;
