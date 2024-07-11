import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import Signup from "./Components/Signup/signup";
import Protectedroute from "./Components/Signup/Protectedroute";
import Login from './Components/Login/Login';
import AddProducts from "./Components/Products/Add products/Add-products";
import ProductsList from "./Components/Products/Products/ProductsList";
import UpdateProduct from "./Components/Products/UpdateProducts/UpdateProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route element={<Protectedroute/>}>
        <Route path="/" element={<ProductsList/>}></Route>
          <Route path="/add" element={<AddProducts/>}></Route>
          <Route path="/update/:id" element={<UpdateProduct/>}></Route>
          <Route path="/logout" element={<h2>logout</h2>}></Route>
          <Route path="/profile" element={<h2>profile</h2>}></Route>
        </Route>
          <Route path="/register" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
