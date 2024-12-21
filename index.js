const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

dotenv.config()

const userRoutes = require('./routes/user.js');
const blogRoutes = require('./routes/blog.js');
mongoose.connect(process.env.MONGODB_STRING);
let db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", ()=> console.log("Now connected to MongoDB Atlas."));



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

app.use(cors({
  origin: ['https://blog-app-client-7z3et3nqc-kirks-projects-8e9b4d23.vercel.app', 'http://localhost:3000'],
  credentials: true,
}));

if(require.main === module){
	app.listen(process.env.PORT || 3000, ()=> {
		console.log(`API is now online on port ${process.env.PORT || 3000}`);
	})
}

module.exports = {app, mongoose};