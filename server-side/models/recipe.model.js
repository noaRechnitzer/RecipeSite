const mongoose=require('mongoose')

// const userCreatedSchema=new mongoose.Schema({
//     id:{ type: mongoose.Types.ObjectId, ref: 'users' },
//     name:{type:String}
// })
const stepSchema=new mongoose.Schema({
    name:{type:String},
    ingredients:[{type:String}]
})
const recipeSchema=new mongoose.Schema({
    name:{type:String, require:true},
    description:{type: String},
    categoryName:[{type:String}],
    prepareMinute:{type: Number, required: true},
    level:{type: Number, required: true},
    publishDate:{type: Date},
    steps:[stepSchema],
    instructions:[{type:String, require:true}],
    image:{type:String},
    private:{type:Boolean, require:true},
    userCreated_id:{type: mongoose.Types.ObjectId, ref: 'users'},
    userCreated_name:{type:String}
})


module.exports.Recipe=mongoose.model('recipes',recipeSchema)
