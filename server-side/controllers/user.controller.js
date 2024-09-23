const bcrypt = require('bcrypt');
const { User, generateToken } = require("../models/user.model")
const mongoose = require('mongoose');
const { number } = require('joi');

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
            if (err) {
                console.log(err);
                return next(new Error(err))
            }

            if (same) {
                // user = the user from the db
                const token = generateToken(user)
                user.password = "*****"
                return res.send({ user, token })
            }
            return next({ message: 'Auth Failed', status: 401 })
        })
    }
    else
        return next({ message: 'Auth Failed', status: 401 })
}

exports.signUp = async (req, res, next) => {
    try {
        req.body.recipes=[];
        const user = new User(req.body)
        user.recipes=[];
        console.log(user);
        await user.save();
        console.log("uccsess");
        const token = generateToken(user)
        user.password = "*****"
        return res.status(201).json({ user, token })
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            console.log("email is allready exist");
            next({ message: "email is allready exist", status: 406 })
        }
        else
            next({ message: error, status: 409 })
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-__v');
        return res.json(users);
    } catch (error) {
        next(error)
    }
}

exports.getUserById = async (req, res, next) => {
    if (req.user.user_id) {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            next({ message: "id is not valid" })
        else {
            try {
                const user = await User.findById(id).select('-__v');
                if (req.user.user_id === id || req.user.role === 'admin') {
                    return res.json(user);
                }
                else {
                    console.log(req.user.user_id );
                    console.log(user._id);
                    next({ message: 'you are not allow to get information about this user', status: 403 })
                }
            } catch (error) {
                //next(error)
                console.log(error.message);
                next({ message: 'recipe not found', status: 404 })
            }
        }
    }
    else
        next({ message: 'only users are logged in can add reicpe', status: 403 })
}

exports.getUserNameById = async (id) => {
    try {
        const userName = await User.findOne({ _id: id });
        return userName.userName;
    } catch (error) {
        console.log(error);
        return error
    }
}


exports.updateUser = async (req, res, next) => {

    const category_id = req.params.id;
    try {
        const new_category = await User.findByIdAndUpdate(
            category_id,
            { $set: req.body },
            { new: true } // החזרת האוביקט החדש שהתעדכן
        )
        return res.json(new_category);
    } catch (error) {
        console.log(error);
        return error
    }

}

exports.addRecipeForUser = async (id, recipe) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        return { message: "id is not valid" }
    else {
        try {
            const user = await User.findById(id).select('-__v');
            user.recipes.push({ id: recipe._id, name: recipe.name, description: recipe.description, publishDate: recipe.publishDate, userCreated_name: recipe.userCreated_name, image: recipe.image });
            try {
                const new_user = await User.findByIdAndUpdate(
                    id,
                    { $set: user },
                    { new: true } // החזרת האוביקט החדש שהתעדכן
                )
                return new_user;
            } catch (error) {
                console.log(error);
                return error
            }
        } catch (error) {
            console.log(error);
            return { message: 'recipe not found', status: 404 }
        }
    }
}

exports.deleteRecipesFromUser = async (recipe) => {
    try {
            const user = await User.findOneAndUpdate(
                { _id: recipe.userCreated_id },
                { $pull: { recipes: { id: recipe._id } } },
                { new: true }
            );
            if (!user) 
                throw new Error('user not found');
            console.log(user);
    } catch (error) {
        throw new Error(error.message);
    }
}