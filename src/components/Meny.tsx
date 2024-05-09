interface Props {
    setPage: (page: string) => void
    LoggedIn: boolean;
}

function Meny(props: Props) {
  const { setPage, LoggedIn } = props;

  return (
    <div>
      {LoggedIn && <button className="myButton" onClick={() => props.setPage("AddTask")}>Lägg till task</button>}
      <button className="myButton" onClick={() => props.setPage("AddUser")}>Lägg till User</button>
      {!LoggedIn && <button className="myButton" onClick={() => props.setPage('LoginUser')}>Logga in User</button>}
      {LoggedIn && <button className="myButton" onClick={() => props.setPage("LogoutUser")}>Logga ut User</button>}
      <button className="myButton" onClick={() => props.setPage("Home")}>Hem</button>
    </div>
  )
}

export default Meny