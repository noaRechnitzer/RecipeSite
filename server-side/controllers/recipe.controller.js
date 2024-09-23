const mongoose = require('mongoose')
const { Recipe } = require("../models/recipe.model")
const { getUserNameById, addRecipeForUser, deleteRecipesFromUser } = require("./user.controller")
const { addCategory, addRcipeToCategory, deleteRecipesFromCategory } = require("./category.controller")

exports.getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find({private:false}).select('-__v');
        return res.json(recipes);
    } catch (error) {
        next(error)
    }
}

exports.getAllLimitedRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find({private:false}).select({ _id: 1, name: 1, description: 1, publishDate: 1, userCreated_name: 1, image: 1 });
        return res.json(recipes);
    } catch (error) {
        next(error)
    }
}

exports.getRecipeById = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: "id is not valid" })
    else {
        try {
            //const recipe = await Recipe.findById(id, { __v: false });
            const recipe = await Recipe.findById(id).select('-__v');
            return res.json(recipe);
        } catch (error) {
            //next(error)
            next({ message: 'recipe not found', status: 404 })
        }
    }

}

exports.getRecipeByUserId = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: "user id is not valid" })
    else {
        try {
            //const recipe = await Recipe.findById(id, { __v: false });
            const recipe = await Recipe.find({ userCreated_id: id });
            return res.json(recipe);
        } catch (error) {
            //next(error)
            next({ message: 'recipe not found', status: 404 })
        }
    }

}

exports.getRecipeByPrepareMinute = async (req, res, next) => {
    const time = req.params.time;
    if (false)
        next({ message: "prepare minute id is not valid" })
    else {
        try {
            //const recipe = await Recipe.findById(id, { __v: false });
            const recipe = await Recipe.find({ prepareMinute: { $lte: +time } });
            return res.json(recipe);
        } catch (error) {
            //next(error)
            next({ message: 'recipe not found', status: 404 })
        }
    }

}

exports.getRecipeByUserId = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: "user id is not valid" })
    else {
        try {
            //const recipe = await Recipe.findById(id, { __v: false });
            const recipe = await Recipe.find({ userCreated_id: id });
            return res.json(recipe);
        } catch (error) {
            //next(error)
            next({ message: 'recipe not found', status: 404 })
        }
    }

}

exports.searchRecipes = async (req, res, next) => {
    const searchString = req.params.str;
    console.log('in search');
    try {
        const query = { name: { $regex: searchString, $options: 'i' } ,private:false};
        const recipes = await Recipe.find(query).select({ _id: 1, name: 1, description: 1, publishDate: 1, userCreated_name: 1, image: 1 });
        return res.json(recipes);
    } catch (error) {
        next(error)
    }
}

exports.updateRecipe = async (req, res, next) => {
    const recipe_id = req.params.id;
    const new_recipe = await Recipe.findByIdAndUpdate(
        recipe_id,
        { $set: req.body },
        { new: true } // החזרת האוביקט החדש שהתעדכן
    )
    return res.json(new_recipe);
    // const recipe_id = req.params.id;
    // if (!mongoose.Types.ObjectId.isValid(Number(recipe_id))) {
    //     console.log("not valid");
    //     next({ message: 'id is not valid' })
    // }
    // else {
    //     try {
    //         const userCreated_id = await Recipe.findById(recipe_id, { userCreated_id: true });
    //         await console.log(userCreated_id.userCreated_id + "");
    //         //if user_token equal to user of this recipe
    //         if (userCreated_id.userCreated_id + "" == req.user.user_id) {
    //             const new_recipe = await Recipe.findByIdAndUpdate(
    //                 recipe_id,
    //                 { $set: req.body },
    //                 { new: true } // החזרת האוביקט החדש שהתעדכן
    //             )
    //             return res.json(new_recipe);
    //         }
    //         else {
    //             console.log("you are not allow update this recipe");
    //             next({ message: "you are not allow update this recipe", status: 401 })
    //         }
    //     } catch (err) {
    //         console.log(err.message);
    //         next(err.message)
    //     }
    // }

}

exports.addRecipe = async (req, res, next) => {
    try {
        if (req.user.user_id) {
            console.log(req.body.categoryName);
            let categoryNameArr = [];
            req.body.categoryName.forEach(category => {
                categoryNameArr.push(category.name)
            });
            req.body.categoryName = categoryNameArr
            req.body.steps.forEach(step => {
                let arr = [];
                step.ingredients.forEach(ingredient => {
                    arr.push(ingredient.name)
                });
                step.ingredients = [...arr]
            });

            let instructionsArr = []
            req.body.instructions.forEach(instruction => {
                instructionsArr.push(instruction.name)
            });
            req.body.instructions = [...instructionsArr]

            const recipe = new Recipe(req.body)
            recipe.userCreated_id = req.user.user_id
            user_name = await getUserNameById(req.user.user_id);
            recipe.userCreated_name = user_name
            recipe.publishDate = new Date()
            await recipe.categoryName.forEach(category => {
                console.log(category);
                //if this recipe is not private
                if (recipe.private == false) {
                    const c = addRcipeToCategory(category, recipe)
                    console.log(c);
                }
                // addCategory({
                //     name: category,
                //     description: category,
                //     recipes: []
                // })
            });
            await addRecipeForUser(recipe.userCreated_id, recipe)
            await recipe.save();
            return res.status(201).json(recipe);
        }
        else
            next({ message: 'only users are logged in can add reicpe', status: 403 })
    } catch (error) {
        console.log(error.message);
        next(error.message)
    }
}

exports.deleteRecipe = async (req, res, next) => {
    console.log('in deleteRecipe');
    if (req.user.user_id) {//if there is token
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('id is not valid');
            next({ message: 'id is not valid' })
        }
        else {
            try {
                console.log(id);
                let recipe = await Recipe.findById(id);
                if (!recipe) {
                    console.log('recipe not found!!!');
                    return next({ message: 'recipe not found!!!', status: 404 })
                }
                else {
                    const objectIdString = req.user.user_id.toString();
                    const numberString = recipe.userCreated_id.toString();
                    if (numberString === objectIdString) {
                        deleteRecipesFromCategory(recipe);
                        deleteRecipesFromUser(recipe);
                        console.log("in if");
                        await Recipe.findByIdAndDelete(id)
                        return res.status(204).send();


                    }
                    else
                        next({ message: 'you are not allow to delete this recipe', status: 403 })
                }
            } catch (error) {
                console.log(error);
                return next(error)
            }
        }
    }
    else
        next({ message: 'only users are logged in can add reicpe', status: 403 })
};