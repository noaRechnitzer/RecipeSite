const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const recipeRouter = require("./routes/recipe.route")
const userRouter = require("./routes/user.route")
const categoryRouter = require("./routes/category.route")

require('dotenv').config();
require('./config/db')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(morgan("dev"));
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200', // או הדומיין ממנו אתה שולח את הבקשה
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get("/", (req, res)=>{
    res.send("wellcome")
})
app.use("/recipe", recipeRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("running at http://localhost:" + port);
});