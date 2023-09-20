import { useState } from "react"
import "./style.css"

export default function App(){
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])
  // setnewItem('sdfsdf')
  function handleSubmit(e){
    e.preventDefault()

    setTodos(currentTodos =>{

      return[
        ...todos, {id: crypto.randomUUID(), title: newItem, completed: false},
      ]
    })
  }
  return (
    <>
  <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">Losis Martins</label>
      <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item"/>
    </div>
    <button className="btn">ADD</button>
  </form>
  <h1 className="header">TODO LIST</h1>
  <ul className="list">
    {todos.map(todo => {
      return[
        <li>
        <label htmlFor="">
          <input type="checkbox" name="" id="" />
          item1
        </label>
        <button className="btn btn-danger">DELETE</button>
      </li>
      ]
    })}
  </ul>
  </>
  )
}