const express = require("express");
const {signIn,signUp,getAllUsers, getUserById, updateUser} =require("../controllers/user.controller");
const { auth } = require("../middlewares/auth");

const route=express.Router()

route.get("/", getAllUsers);//for private use
route.get("/getById/:id",auth, getUserById);
route.post("/signIn", signIn);
route.post("/signUp", signUp);
route.put("/update/:id", updateUser);//for private use

module.exports = route;