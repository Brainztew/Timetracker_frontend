interface Props {
    setPage: (page: string) => void
}

function Meny(props: Props) {
  return (
    <div>
      <button className="myButton" onClick={() => props.setPage("AddTask")}>Lägg till task</button>
    </div>
  )
}

export default Meny