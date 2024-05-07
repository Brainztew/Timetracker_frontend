import { useEffect, useState } from 'react'
import './App.css'
import Meny from './components/Meny';
import AddTask from './components/AddTask';
import AddUser from './components/AddUser';
import LoginUser from './components/LoginUser';
import LogoutUser from './components/LogoutUser';
import Home from './components/Home';

function App() {
  const [page, setPage] = useState<string>("");
 const [LoggedIn, setLoggedIn] = useState(false);

  let pageUrl = page;

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [LoggedIn, page]);

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
  }, [page, LoggedIn, pageUrl]);
  

  return (
    <>
      <h1>Har du en task du vill ta tiden på?</h1>
      <Meny setPage={setPage} LoggedIn={LoggedIn} />
      {{
        AddTask: <AddTask />,
        AddUser: <AddUser />,
        LoginUser: <LoginUser />,
        LogoutUser: <LogoutUser />,
        Home: <Home />
      }[page] || <Home />}
    </>
  )


}


export default App
