import mongoose from "mongoose";
 const productSchema=mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String,
    userId:String,
 });
 const product=mongoose.model("products",productSchema);
 export default product;