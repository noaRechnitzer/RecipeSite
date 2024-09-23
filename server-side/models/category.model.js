const mongoose=require('mongoose')

const recipeSchema=new mongoose.Schema({
    id:{ type: mongoose.Types.ObjectId, ref: 'recipes', require:true },
    name:{type:String, require:true},
    description:{type: String},
    publishDate:{type: Date},
    userCreated_name:{type:String},
    image:{type:String, require:true}
})
const categorySchema=new mongoose.Schema({
    name:{type:String, require:true},
    recipes:[recipeSchema]
})



module.exports.Category=mongoose.model('categories',categorySchema)