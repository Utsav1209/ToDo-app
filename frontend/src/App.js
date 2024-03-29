import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {

  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")
  const [filterType, setFilterType] = useState("all");

  

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)

  }

  const handleFilter = (type) => {
    setFilterType(type);
  }

  const filterTodos = () => {
    if (filterType === "completed") {
      return toDo.filter(item => item.completed);
    } else if (filterType === "not-completed") {
      return toDo.filter(item => !item.completed);
    }
    return toDo; // For "all" filter
  };

  return (
    <div className="App">

      <div className="container">
        <h1>My To Do List</h1>
      </div>

      <div className="top">
        <input 
        type="text" 
        placeholder="Add ToDo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
         />

        <div className="add" onClick={ isUpdating ? () => 
          updateToDo(toDoId, text, setText, setToDo, setIsUpdating ) : () => 
          addToDo(text, setText, setToDo)}>{isUpdating ? "Update" : "Add"}</div>

      </div>

      <div className="filter-buttons">
        <button
          className={`filter-button ${filterType === "all" ? "active" : ""}`}
          onClick={() => handleFilter("all")}
        >
          {filterType === "all" ? <span className="dot active-dot"></span> : <span className="dot"></span>} All
        </button>
        <button
          className={`filter-button ${filterType === "completed" ? "active" : ""}`}
          onClick={() => handleFilter("completed")}
        >
          {filterType === "completed" ? <span className="dot active-dot"></span> : <span className="dot"></span>} Completed
        </button>
        <button
          className={`filter-button ${filterType === "not-completed" ? "active" : ""}`}
          onClick={() => handleFilter("not-completed")}
        >
          {filterType === "not-completed" ? <span className="dot active-dot"></span> : <span className="dot"></span>} Not Completed
        </button>
      </div>

      <div className="list">
        {filterTodos().map((item) => (
          <ToDo 
            key={item._id} 
            text={item.text}
            updateMode={() => updateMode(item._id, item.text)}
            deleteToDo={() => deleteToDo(item._id, setToDo)} 
          />
        ))}
      </div>

      {/* <div className="list">

        {toDo.map((item) => <ToDo 
        key={item._id} 
        text={item.text}
        updateMode = {() => updateMode(item._id, item.text)}
        deleteToDo={() => deleteToDo(item._id, setToDo)} />)}

      </div> */}
      
    </div>
  );
}

export default App;
