import React, { useState } from 'react'

function AddUser() {
    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');

    const handleAddUser = () => {

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
        
        }

    return (
        <div>
        <h2>Lägg till användare</h2>
        <form action="">
            <input type="text" placeholder="Namn" value={username} onChange={e => setuserName(e.target.value)}/>
            <input type="password" placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleAddUser}>Lägg till användare</button>
        </form>
        </div>

    )
    }

    export default AddUser