const mongoose = require("mongoose");

// Database -> Dont need dotenv.config (defined in index.js already)
const url = process.env.MONGODB_URI;

console.log("Connecting to", url);
mongoose.set("strictQuery", false);
mongoose
	.connect(url)
	.then(() => {
		console.log("Successfuly connected to MongoDB");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB ", error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		minLength: 8,
		match: /^(\d{2,3}-\d+)$/,
	},
});

// Transform data to non encrypted string and removed unecessary data
personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", personSchema);
