const ToDoModel = require('../models/ToDoModel')

module.exports.getToDo = async (req, res) => {
    const filter = req.query.filter; // Retrieve filter query parameter
    let toDo;

    // Check if filter is provided and apply appropriate filtering logic
    if (filter === 'completed') {
        toDo = await ToDoModel.find({ completed: true });
    } else if (filter === 'not-completed') {
        toDo = await ToDoModel.find({ completed: false });
    } else {
        toDo = await ToDoModel.find();
    }

    res.send(toDo);
};

module.exports.saveToDo = async (req, res) => {

    const { text } = req.body
    ToDoModel
    .create({text})
    .then((data) => {
        console.log("added successfully");
        console.log(data);
        res.send(data)
    })
}

module.exports.updateToDo = async (req, res) => {
    const { _id, text } = req.body
    ToDoModel
    .findByIdAndUpdate(_id, {text})
    .then(() => res.send("updated"))
    .catch((err) => console.log(err))
}

module.exports.deleteToDo = async (req, res) => {
    const { _id } = req.body
    ToDoModel
    .findByIdAndDelete(_id)
    .then(() => res.send("Deleted"))
    .catch((err) => console.log(err))
}

