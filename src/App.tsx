import React, { FC, useState } from 'react'
import './App.css'
import { addTodo, todoInterface, removeTodo, updateTodo } from './redux/counter/counterSlice'
import { useAppDispatch, useAppSelector } from './redux/hooks'

const App: FC = () => {
  interface editInterface {
    val?: number,
    bool?: boolean
  }
  // DAA STATEEE
  const todoState = useAppSelector((state) => state.counter)
  // DAAA DISPATACHHH
  const dispatch = useAppDispatch()
  const [input, setInput] = useState<string>('')
  const [updateInput, setUpdateInput] = useState<string>('')
  const [edit, setEdit] = useState<editInterface>({ val: -1, bool: false })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  const handleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateInput(e.target.value)
  }

  // Add Todo
  const handleAddTodo = () => {
    if (input.trim().length === 0)
      return
    const data: todoInterface = {
      id: Math.floor(Math.random() * 10000),
      value: input
    }
    dispatch(addTodo(data))
    setInput('')
  }

  // Delete  Todo
  const handleDelete = (i: number) => {
    dispatch(removeTodo(i))
  }
  // Edit  Todo
  const handleEdit = (i: number, id: number) => {
    if (edit.bool) {
      const data: todoInterface = {
        id: id,
        value: updateInput
      }
      dispatch(updateTodo(data))
    }
    setEdit(prevState => ({
      ...prevState,
      val: prevState.val === i ? -1 : i,
      bool: !prevState.bool
    }))
  }

  const render =
    todoState.map((i: todoInterface, idx: number) => {
      return (
        <div key={i.id}>
          <input
            type='checkbox'
            className="check"
            id={(i.id).toString()}
            value={i.value}
            style={{
              height: '35px',
              width: '55px'
            }}
            onChange={() => handleDelete(i.id)} />

          {edit.val !== idx ?
            <label htmlFor={i.value}>
              {i.value}
            </label> :
            <input type="text" value={updateInput} onChange={(e) => handleUpdateInput(e)} />
          }
          <button onClick={() => handleEdit(idx, i.id)} style={{ margin: '0 20 0 20' }}>
            {edit.val === idx ? 'Done' : 'Update'}
          </button>

        </div>
      )
    })

  return (

    <div className="container">
      <div className="header">
        <input type="text" value={input} onChange={(e) => handleInputChange(e)} onKeyPress={(e) => { if (e.key === 'Enter') handleAddTodo() }} />
        <button onClick={() => handleAddTodo()}>
          Add
        </button>

        <div>{render}</div>
      </div>
    </div >
  )
}

export default App
