import { useState } from "react";

interface ChangeTaskNameProps {
    id: string;
    onTaskNameChange: (id: string, newName: string) => void;
}

function ChangeTaskName({id, onTaskNameChange}: ChangeTaskNameProps) {
    const [newName, setNewName] = useState('');
    const userid = localStorage.getItem('userId');

    const handleChangeName = () => {
        fetch(`http://localhost:8080/task/update/${id}?userId=${userid}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            name: newName,
            }),
    })
        .then(response => response.json())
        .then(updatedTask => {
            onTaskNameChange(id, updatedTask.name);
    });
};

  return (
    <div>
        <input 
        type="text" 
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleChangeName}>Byt namn på din task!</button>
    </div>
  )
}

export default ChangeTaskName