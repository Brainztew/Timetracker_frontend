import { useEffect, useState } from 'react'
import './App.css'
import Meny from './components/Meny';
import AddTask from './components/AddTask';

function App() {
  const [message, setMessage] = useState(''); 
  const [page, setPage] = useState<string>("");

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
    console.log('Hello Vite + React!')
    fetch('http://localhost:8080/task/hello')
    .then(response => response.text())
    .then(data => setMessage(data))

  }
  , [])

  return (
    <>
      <h1>Har du en task du vill ta tiden på?</h1>
      <Meny setPage={setPage} />
      {{
        AddTask: <AddTask />,
      }[page] || <AddTask />}
      <p>{message}</p>
    </>
  );
}

export default App
