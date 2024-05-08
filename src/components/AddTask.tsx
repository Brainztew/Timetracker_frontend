import { useEffect, useState } from "react";
import ChangeTaskName from "./ChangeTaskName";
import Timer from "./Timer";

interface Task {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: string;
};

function AddTask() {


const [task, setTask] = useState<string>('');
const [tasks, setTasks] = useState<Task[]>([]);
const userid = localStorage.getItem('userId');


useEffect(() => {
  fetch(`http://localhost:8080/task/user/${userid}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(userid);
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      setTasks(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, [task]);

const handleTaskNameChange = (id: string, newName: string) => {
  setTasks(tasks.map(task => task.id === id ? { ...task, name: newName } : task));
};

const handleAddTask = () => {
  fetch(`http://localhost:8080/task/create?userId=${userid}`, {
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
  

<h2>Alla tasks:</h2>
{tasks.map((task: any, index: number) => (
  <div id="TaskStyling" key={index}>
    <h2>{task.name}</h2>
    <ChangeTaskName id={task.id} onTaskNameChange={handleTaskNameChange} />
    <Timer id={task.id} />
    <button onClick={() => handleDeleteTask(task.id)}>Ta bort task</button>
  </div>
  ))}
</div>
  );

  function handleDeleteTask(id: string) {
    fetch(`http://localhost:8080/task/delete/${id}?userId=${userid}`, {
      method: 'DELETE',
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    })
  }

}

export default AddTask;