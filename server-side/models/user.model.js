const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const joi=require('joi')
const jwt = require('jsonwebtoken');

const recipeSchema=new mongoose.Schema({
    id:{ type: mongoose.Types.ObjectId, ref: 'recipes', require:true },
    name:{type:String, require:true},
    description:{type: String},
    publishDate:{type: Date},
    userCreated_name:{type:String},
    image:{type:String, require:true}
})

const userSchema=new mongoose.Schema({
    userName:{type:String, require:true},
    password:{type: String, minlength: [5, 'password length < 5'], required: true},
    email:{type: String, required: true, unique: true},
    description:{type: String},
    role:{type: String, default: 'user', enum: ['admin', 'user']},
    recipes:[recipeSchema]
})

userSchema.pre('save', function (next) {
    console.log(this.password);
    salt=Number(process.env.BCRYPT_SALT);
    bcrypt.hash(this.password,salt,async (err, hashPassword)=>{
        if (err) 
            throw new Error(err.message)
        this.password=hashPassword
        next()
    })
})

module.exports.userValidator={
    loginSchema: joi.object({
        email:joi.string().email().required(),
        password: joi.string().min(5).required()
    }),
    newUserSchema: joi.object({
        userName:joi.string().required(),
        email:joi.string().email().required(),
        password: joi.string().min(5).required()
    })
}
module.exports.User=mongoose.model('users',userSchema)

//create token
module.exports.generateToken = (user) => {
    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET'; // מחרוזת סודית שלפיה נוצר הטוקן
    const data = { role: user.role, user_id: user._id }; // הנתונים שרלוונטיים עבור הרשאות משתמש
    const token = jwt.sign(data, privateKey, {expiresIn: '1h'})
    return token
}