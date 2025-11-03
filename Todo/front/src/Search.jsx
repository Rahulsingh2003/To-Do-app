import React, { useState } from 'react';
import axios from 'axios';

function Search({ onAdd }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;

    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        console.log(result);
        setTask(""); // clear input
        onAdd();     // refresh todo list
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='search_form'>
      <input
        type="text"
        placeholder='Enter task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type='button' onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Search;
