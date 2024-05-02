import { useEffect, useState } from 'react'
import './App.css'
import Meny from './components/Meny';
import AddTask from './components/AddTask';
import ChangeTaskName from './components/ChangeTaskName';
import Timer from './components/Timer';

interface Task {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: string;
};

function App() {
  const [message, setMessage] = useState(''); 
  const [page, setPage] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const handleTaskNameChange = (id: string, newName: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, name: newName } : task));
  };


  let pageUrl = page;

  useEffect(() => {
    if (!pageUrl) {
      const queryParameters = new URLSearchParams(window.location.search);
      const getUrl = queryParameters.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        pageUrl = "start";
      }
    }
    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);
  
  useEffect(() => {
    fetch('http://localhost:8080/task/all')
    .then(response => response.json())
    .then(data => setTasks(data))
  }, [tasks])

  return (
    <>
      <h1>Har du en task du vill ta tiden på?</h1>
      <Meny setPage={setPage} />
      {{
        AddTask: <AddTask />,
      }[page] || <AddTask />}
      <p>{message}</p>
      <h2>Alla tasks:</h2>
      {tasks.map((task: any, index: number) => (
        <div id="TaskStyling" key={index}>
          <h2>{task.name}</h2>
          <ChangeTaskName id={task.id} onTaskNameChange={handleTaskNameChange} />
          <Timer id={task.id} />
          <button onClick={() => handleDeleteTask(task.id)}>Ta bort task</button>
        </div>
      ))}
    </>
  );

  function handleDeleteTask(id: string) {
    fetch(`http://localhost:8080/task/delete/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  }
}


export default App
