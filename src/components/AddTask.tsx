import { useState } from "react";

function AddTask() {
const [task, setTask] = useState<string>('');

const handleAddTask = () => {
    fetch('http://localhost:8080/task/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: task,
            }),
        })
        .then(() => setTask(''));
    
    };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Lägg till Task</button>
    </div>
  );
}

export default AddTask;