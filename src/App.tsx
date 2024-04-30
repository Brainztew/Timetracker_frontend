import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState(''); // Add this line

  useEffect(() => {
    console.log('Hello Vite + React!')
    fetch('http://localhost:8080/task/hello')
    .then(response => response.text())
    .then(data => setMessage(data))

  }
  , [])

return (
<>
<h1>Hello Vite + React!</h1>
<p>{message}</p>
</>
);
}

export default App
