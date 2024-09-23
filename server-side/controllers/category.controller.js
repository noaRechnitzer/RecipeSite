const mongoose = require('mongoose')
const { Category } = require("../models/category.model")

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().select('-__v');
        return res.json(categories);
    } catch (error) {
        next(error)
    }
}
exports.getAllCategoriesName = async (req, res, next) => {
    try {
        const categories = await Category.find().select({ name: 1, _id: 1 });
        return res.json(categories);
    } catch (error) {
        next(error)
    }
}

exports.getCategoryById = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: "id is not valid" })
    else {
        try {
            const category = await Category.findById(id).select('-__v');
            return res.json(category);
        } catch (error) {
            next({ message: 'category not found', status: 404 })
        }
    }
}

exports.getCategoryByName = async (req, res, next) => {
    const name = req.params.name;
    try {
        const category = await Category.findOne({ name: name })
        return res.json(category);
    } catch (error) {
        next({ message: 'category name not found', status: 404 })
    }
}

exports.ifCategoryExist = async (name) => {
    try {
        const if_exist = await User.findOne({ name: name });
        return if_exist != null ? true : false;
    } catch (error) {
        console.log(error);
        return error
    }
}

//??הוספת קטגוקיה רק למשתמש עם טוקן
exports.addNewCategory = async (newCategory) => {
    try {
        const category = new Category(newCategory)
        await category.save();
        return { status: 201, category: category };
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}
exports.addRcipeToCategory = async (category_name, recipe) => {
    try {
        let category = await Category.findOne({ name: category_name });
        // if this category already exist
        // if this category is not exist
        // create new category
        if (category == null) {
            const res = await this.addNewCategory({
                name: category_name,
                description: category_name,
                recipes: []
            })
            // if category is added
            if (res.status == 201)
                category = res.category
            else
                return res;
        }
        let new_category
        category.recipes.push({ id: recipe._id, name: recipe.name, description: recipe.description, publishDate: recipe.publishDate, userCreated_name: recipe.userCreated_name, image: recipe.image })
        new_category = await Category.findByIdAndUpdate(
            category._id,
            { $set: category },
            { new: true } // החזרת האוביקט החדש שהתעדכן
        )
        return new_category;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

exports.deleteC = async (req, res, next) => {
    const id = req.params.id;

    try {

        await Category.findByIdAndDelete(id);
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        next(error)
    }
};

exports.deleteRecipesFromCategory = async (recipe) => {
    try {
        recipe.categoryName.forEach(async name => {
            const category = await Category.findOneAndUpdate(
                { name: name },
                { $pull: { recipes: { id: recipe._id } } },
                { new: true }
            );
            if (!category)
                throw new Error('Category not found');
            console.log(category);
            let d;
            if (category.recipes == []){
                console.log("in delete findByIdAndDelete ");
                d= await Category.findByIdAndDelete(category._id);
                console.log(d);
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.addCategory = async (req, res, next) => {

    try {
        if (req.user.user_id) {
            const category = new Category(req.body)
            await category.save();
            return res.status(201).json(category);
        }
        else
            next({ message: 'only users are logged in can add reicpe', status: 403 })
    }
    catch (error) {
        console.log(error.message);
        next(error.message)
    }

}

exports.updateCategory = async (req, res, next) => {

    const category_id = req.params.id;
    const new_category = await Category.findByIdAndUpdate(
        category_id,
        { $set: req.body },
        { new: true } // החזרת האוביקט החדש שהתעדכן
    )
    return res.json(new_category);
}