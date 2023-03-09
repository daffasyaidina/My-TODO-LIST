import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  const cancelUpdate = () => {
    setUpdateData('');
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  };

  return (
    <div className="container App">
      <header className="App-header">
        <img src="/images/images.png" className='rounded mb3' alt="bocchi"
        style = {{ width: "400px", height: "250px", margin: "12px"}} />
        <p>Dafa Ramadhan Syaidina - 2502022282</p>
        <h1 className="App-title">My To Do List</h1>
      </header>

      {updateData && updateData ? (
        <div className="update-form">
          <h2>Update Task</h2>
          <div className="form-group">
            <label htmlFor="update-task">Task:</label>
            <input
              type="text"
              className="form-control"
              id="update-task"
              name="update-task"
              value={updateData.title}
              onChange={changeTask}
            />
          </div>
          <button className="btn btn-primary" onClick={updateTask}>
            Update
          </button>
          <button className="btn btn-danger" onClick={cancelUpdate}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="add-task-form">
          <h2>Add New Task</h2>
          <div className="form-group">
            <label htmlFor="new-task">Task:</label>
            <input
              type="text"
              className="form-control"
              id="new-task"
              name="new-task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>
        </div>
      )}

{toDo && toDo.length ? (
  <div className="to-do-list">
    <h2>Tasks:</h2>
    <ul className="list-group">
      {toDo.map((task) => (
        <li
          className={`list-group-item ${
            task.status ? 'bg-success' : 'bg-light'
          }`}
          key={task.id}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-checkinput-group">
              <input
                type="checkbox"
                className="form-check-input"
                id={`check-${task.id}`}
                checked={task.status}
                onChange={() => markDone(task.id)}
              />
              <label
                className={`form-check-label ${task.status ? 'text-white' : ''}`}
                htmlFor={`check-${task.id}`}
              >
                {task.title}
              </label>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setUpdateData(task)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
) : (
  <div className="no-tasks">
    <p>No Tasks Found</p>
  </div>
  
)}
    </div>
  );
}

export default App;
