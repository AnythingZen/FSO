const Person = require("./persons");

const checkForDups = (body) => {
  return Person.find({}).then((result) => {
    result.forEach((people) => {
      if (people.name === body.name) {
        throw new Error(`POST check for duplicate found ${people}`);
      }
    });
  });
};

const createAndSavePerson = (body) => {
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  return newPerson.save();
};

module.exports = { checkForDups, createAndSavePerson };
