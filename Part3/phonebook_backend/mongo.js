const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://ignaciocaramuto:${password}@phonebookcluster.4gjrk.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=PhonebookCluster`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({ name, number });

if (!name || !number) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach(({ name, number }) => {
      console.log(`${name} ${number}`);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
