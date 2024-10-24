const express = require("express");
const app = express();
const PORT = 5000;
const person = require("./models/person.js");
const mongoose = require("mongoose");
const url = " ";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

app.use(express.json());

// Create (POST)
app.post('/person', async (req, res) => {
    try {
      const newPerson = new person(req.body);
      const savedPerson = await newPerson.save();
      res.status(201).json(savedPerson);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // create (get)
app.get('/person', async (req, res) => {
    try {
      const people = await person.find()
      res.json(people)
    } catch(err){
      res.status(500).json({message: err.message})
    }
  });

  // create (get by id)
app.get('/person/:id', async (req, res) => {
    try {
      const onePerson = await person.findById(req.params.id)
      if(!onePerson){
        res.status(404).json({message: "Person not found"})
      }
      res.json(onePerson)
    } catch(err){
      res.status(500).json({message: err.message})
    }
  });


  // Update (PUT)
app.put('/person/:id', async (req, res) => {
    try {
      const updatedPerson = await person.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPerson) return res.status(404).json({ message: 'Person not found' });
      res.json(updatedPerson);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // create (delete)
  app.delete('/person/:id', async (req, res) => {
    try {
      const deletedPerson = await person.findByIdAndDelete(req.params.id)
      if(!deletedPerson){
        res.status(400).json({message: "Person not found"})
      }
      res.json({message: "person deleted"})
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });

app.listen(PORT, function() {
    console.log(`server is running on ${PORT}`)
});
