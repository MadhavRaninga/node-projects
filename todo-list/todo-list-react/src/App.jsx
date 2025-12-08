import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodo] = useState([]); // array of objects { _id, task }
  const [isAddMode, setIsAddMode] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/getall`);
        setTodo(res.data.allTask ?? []);
      } catch (err) {
        console.error("Fetch error:", err);
        setTodo([]);
      }
    };
    fetchTasks();
  }, []);

  const API_BASE = "http://localhost:4000";

const handleAddOrUpdate = async () => {
  if (!input.trim()) {
    alert("Please Enter the Task !!");
    return;
  }

  try {
    if (isAddMode) {
      // ADD MODE
      const res = await axios.post(`${API_BASE}/addTask`, { task: input });
      const newTask = res.data?.newTask;

      if (newTask) {
        setTodo((prev) => [...prev, newTask]);
      } else {
        // fallback: refetch all
        const all = await axios.get(`${API_BASE}/getall`);
        setTodo(all.data?.allTask ?? []);
      }
    } else {
      // UPDATE MODE
      const item = todos[editIndex];

      if (!item || !item._id) {
        alert("Invalid item to update");
        return;
      }

      const res = await axios.put(
        `${API_BASE}/update/${item._id}`,
        { task: input }
      );

      const updatedTask = res.data?.updateTask ?? { ...item, task: input };

      setTodo((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );

      setIsAddMode(true);
      setEditIndex(null);
    }

    setInput("");
  } catch (err) {
    console.error("Add/Update error:", err);
    alert("Backend error: check if server on port 4000 is running.");
  }
};


  const handleRemove = async (i) => {
    try {
      const item = todos[i];
      if (item && item._id) {
        await axios.delete(`http://localhost:4000/delete/${item._id}`);
        setTodo((prev) => prev.filter((_, j) => j !== i));
      } else {
        setTodo((prev) => prev.filter((_, i) => i !== i));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete task. See console.");
    }
  };

  const handleEdit = (i) => {
    const item = todos[i];
    if (!item) return;
    setInput(item.task ?? "");
    setEditIndex(i);
    setIsAddMode(false);
  };

  const handleClear = () => {
    setTodo([]);
  };

  return (
    <div className="todo-box">
      <h2>My To-Do List ✅</h2>

      <div className="input-row">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter your task..."
        />
        <button className="btn-primary" onClick={handleAddOrUpdate}>
          {isAddMode ? "Add" : "Update"}
        </button>
        <button className="btn-ghost" onClick={handleClear}>
          Clear All
        </button>
      </div>

      <ul>
        {todos.length === 0 && <li>No tasks yet</li>}
        {todos.map((e, i) => (
          <li key={e._id ?? i} className="todo-item" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ flex: 1 }}>{typeof e === "object" ? e.task : String(e)}</span>

            <button className="btn-edit" onClick={() => handleEdit(i)}>
              Edit
            </button>
            <button className="btn-remove" onClick={() => handleRemove(i)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
