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

const corsOptions = {
	origin: ['http://localhost:3000', 'https://blog-app-api-06de.onrender.com'],
	// methods: ['GET'] //allow only specified HTTP methods //optional only if you want to restrict methods
	// allowHeaders: ['Content-Type', "Authorization"], //allow specified
	credentials: true, //allow credentials example cookis, authorization headers
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

if(require.main === module){
	app.listen(process.env.PORT || 3000, ()=> {
		console.log(`API is now online on port ${process.env.PORT || 3000}`);
	})
}

module.exports = {app, mongoose};