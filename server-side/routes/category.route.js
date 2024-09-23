const express = require("express");
const {getAllCategories, getCategoryById, getCategoryByName, deleteC, addCategory, updateCategory, getAllCategoriesName} =require("../controllers/category.controller")
const {auth} = require("../middlewares/auth")
const route=express.Router()

route.get("/", getAllCategories);
route.get("/getNames", getAllCategoriesName);
route.get("/getById/:id", getCategoryById);
route.get("/getByName/:name", getCategoryByName);
route.delete("/delete/:id", deleteC);//for private use
route.post("/addCategory",auth, addCategory);//for private use
route.put("/updateCategory/:id", updateCategory);//for private use

module.exports = route;