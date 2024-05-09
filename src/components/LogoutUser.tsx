import React, { useEffect } from 'react'

interface LogoutUserProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutUser: React.FC<LogoutUserProps> = ({ setLoggedIn }) => {
  useEffect(() => {
    localStorage.clear();
    setLoggedIn(false); 
  }, [setLoggedIn]); 

  return (
    <div>Du är nu utloggad!</div>
  )
}

export default LogoutUser