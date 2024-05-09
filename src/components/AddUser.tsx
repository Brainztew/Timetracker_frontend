import React, { useState } from 'react'

function AddUser() {
    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [Message, setMessage] = useState('');

    const handleAddUser = (event: React.MouseEvent ) => {
        event.preventDefault();
        if (password.length < 6) {
            setMessage('Lösenord måste minst vara 6 tecken långt!');
            return;
        }
        fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            })
            .then(() => console.log('User added'));
            setMessage('Registering lyckades!')
        
        }

    return (
        <div>
        <h2>Lägg till användare</h2>
        <form action="">
            <input type="text" placeholder="Namn" value={username} onChange={e => setuserName(e.target.value)}/>
            <input type="password" placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleAddUser}>Lägg till användare</button>
            <p>{Message}</p>
        </form>
        </div>

    )
    }

    export default AddUser