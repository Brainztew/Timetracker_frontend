import React, { useEffect } from 'react'

interface LogoutUserProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutUser: React.FC<LogoutUserProps> = ({ setLoggedIn }) => {
  useEffect(() => {
    localStorage.clear();
    setLoggedIn(false); // set LoggedIn to false when the component mounts
  }, [setLoggedIn]); // add setLoggedIn to the dependency array

  return (
    <div>Du är nu utloggad!</div>
  )
}

export default LogoutUser