const express = require("express");
const {getAllRecipes, getRecipeById, addRecipe, getRecipeByUserId, getRecipeByPrepareMinute, updateRecipe, deleteRecipe, getAllLimitedRecipes, searchRecipes} =require("../controllers/recipe.controller")
const {auth} = require("../middlewares/auth")
const route=express.Router()

route.get("/", getAllRecipes);
route.get("/getLimited", getAllLimitedRecipes);
route.get("/getById/:id", getRecipeById);
route.get("/getByUser/:id", getRecipeByUserId);
route.get("/getByPrepareMinute/:time", getRecipeByPrepareMinute);
route.get("/search/:str", searchRecipes);
route.post("/addRecipe",auth, addRecipe);
route.put("/update/:id", updateRecipe);//for private use
route.delete("/delete/:id",auth, deleteRecipe);

module.exports = route;