import React, { useState } from 'react'

function LoginUser() {
    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleLoginUser = (event: React.MouseEvent) => {
        event.preventDefault();
        fetch('http://localhost:8080/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.text();
        })
        .then(userId => {
          localStorage.setItem('userId', userId);
          setErrorMessage('inloggad!');
          console.log(userId);
          window.location.reload();
          
        })
        .catch(error => {
          console.error('Error:', error);
          setErrorMessage('Fel användarnamn eller lösenord');
        });
      };



return (
    <div>
        <h2>Logga in användare</h2>
        <form action="">
            <input type="text" placeholder="Namn" value={username} onChange={e => setuserName(e.target.value)}/>
            <input type="password" placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleLoginUser}>Logga in</button>
            {errorMessage && <p>{errorMessage}</p>} 
        </form>
    </div>
)
}

export default LoginUser