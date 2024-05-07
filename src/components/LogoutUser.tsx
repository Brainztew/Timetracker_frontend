import React, { useEffect } from 'react'

function LogoutUser() {

    useEffect(() => {
        localStorage.clear();
    }, []);


    return (
    <div>Du är nu utloggad!</div>
  )
}

export default LogoutUser