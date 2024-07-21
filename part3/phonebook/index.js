const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/persons");
const { checkForDups, createAndSavePerson } = require("./models/helper");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url :response-time :content"));

morgan.token("content", function (req) {
	return JSON.stringify(req.body);
});

// Get all data
app.get("/api/persons", (request, response) => {
	Person.find({}).then((people) => {
		response.json(people);
	});
});

// Single person
app.get("/api/persons/:id", (request, response) => {
	Person.findById(request.params.id)
		.then((personFound) => {
			return response.json(personFound);
		})
		.catch((error) => {
			return response.status(404).json({
				error: error.message,
			});
		});
});

// Delete person
app.delete("/api/persons/:id", (request, response) => {
	Person.findByIdAndDelete(request.params.id)
		.then((personToDelete) => {
			console.log(personToDelete);
			return response.status(202).json(personToDelete);
		})
		.catch((error) => {
			console.log("error while deleting: ", error.message);
			return response.status(404).json({
				error: error.message,
			});
		});
});

// Edit person info
app.put("/api/persons/:id", (request, response) => {
	Person.findByIdAndUpdate(
		request.params.id,
		{
			number: request.body.number,
		},
		{ new: true, runValidators: true, context: "query" }
	)
		.then((personReplaced) => {
			console.log("put request for person replaced ", personReplaced);
			return response.status(202).json(personReplaced);
		})
		.catch((error) => {
			if (error.name === "ValidationError") {
				return response.status(404).json({ error: error.message });
			} else if (error.name === "CastError") {
				return response.status(404).json({
					error: `Person does not exists in database, ${error.message}`,
				});
			} else {
				return response
					.status(500)
					.json({ error: `Internal Server Error ${error.message}` });
			}
		});
});

// Info on database
app.get("/info", (request, response) => {
	Person.countDocuments().then((length) => {
		const data = `Phonebook has info for ${length} people <br />${Date()}`;
		return response.send(data);
	});
});

// Create new person
app.post("/api/persons", (request, response) => {
	const body = request.body;
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	checkForDups(body)
		.then(() => {
			createAndSavePerson(body)
				.then((savedPerson) => {
					console.log("Successfully saved ", savedPerson);
					return response.json(savedPerson);
				})
				.catch((error) => {
					return response.status(400).json({ error: error.message });
				});
		})
		.catch((error) => {
			return response.status(400).json({
				error: `name must be unique, ${error.message}`,
			});
		});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
