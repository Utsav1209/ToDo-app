const {Router} = require("express");
const { getToDo, saveToDo, deleteToDo, updateToDo } = require("../controllers/ToDoController");

const router = Router()

router.get('/', getToDo)
router.post('/save', saveToDo)
router.post('/delete', deleteToDo)
router.post('/update', updateToDo)

module.exports = router;