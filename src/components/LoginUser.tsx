import React, { useState } from 'react'


type UserTotal = {
  user: {
      id: number;
      username: string;
  };
  totalDuration: number;
};

interface LoginUserProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


const LoginUser: React.FC<LoginUserProps> = ({ setLoggedIn }) => {
  
    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [, setUsers] = useState<UserTotal[]>(JSON.parse(localStorage.getItem('users') || '[]'));
    const [isAdmin, setIsAdmin] = useState<boolean>(localStorage.getItem('userId') !== null); 

    const handleLoginUser = (event: React.MouseEvent) => {
      event.preventDefault();
      fetch('https://jellyfish-app-hcwp7.ondigitalocean.app/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('userId', data.userId);
        setLoggedIn(true);
        if (data.isAdmin) {
          console.log('is admin');
          setIsAdmin(true);
          fetchUsers();
        }
        setErrorMessage('inloggad!');
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Fel användarnamn eller lösenord');
      });
      
    };

  const fetchUsers = () => {
    const userId = localStorage.getItem('userId');
    fetch(`https://jellyfish-app-hcwp7.ondigitalocean.app/user/all?userId=${userId}`)
    .then(response => response.json())
    .then(data => {
      setUsers(data);
      localStorage.setItem('users', JSON.stringify(data));
      setErrorMessage('Grattis du är Admin! Här är alla användares sammanlagda tider:');
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
}


return (
    <div>
        
        <form action="">
          {!localStorage.getItem('userId') && (
            <>
            <h2>Logga in användare</h2>
            <input type="text" placeholder="Namn" value={username} onChange={e => setuserName(e.target.value)}/>
            <input type="password" placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleLoginUser}>Logga in</button>
            </>
          )}
            {errorMessage && <p>{errorMessage}</p>} 
            {isAdmin && JSON.parse(localStorage.getItem('users') || '[]').map((user: UserTotal) => (
              <div key={user.user.id}>
                  <h3>{user.user.username}</h3>
                  <p>Total tid: {user.totalDuration} minuter</p>
              </div>
                ))}
        </form>

    </div>
)
}

export default LoginUser