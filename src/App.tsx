import React, { FC, useState } from 'react';
import './App.css';
import { add, CounterState, remove, updateTodo } from './redux/counter/counterSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks'

const App: FC = () => {
  interface editType {
    val?: number,
    bool?: boolean
  }
  // DAA STATEEE
  const count = useAppSelector((state) => state.counter)
  // DAAA DISPATACHHH
  const dispatch = useAppDispatch()
  const [input, setInput] = useState<string>('')
  const [updateInput, setUpdateInput] = useState<string>('')
  const [edit, setEdit] = useState<editType>({ val: -1, bool: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setUpdateInput(e.target.value)
  };

  const handleSubmit = () => {
    if (input.trim().length === 0)
      return
    const data: CounterState = {
      id: Math.floor(Math.random() * 10000),
      value: input
    }
    dispatch(add(data));
    setInput('')
  }

  const handleCheck = (i: number) => {
    dispatch(remove(i));
  }

  const handleEdit = (i: number, id: number) => {
    if (edit.bool) {
      const data: CounterState = {
        id: id,
        value: updateInput
      }
      dispatch(updateTodo(data));
    }
    setEdit(prevState => ({
      ...prevState,
      val: prevState.val === i ? -1 : i,
      bool: !prevState.bool
    }))
  }

  const render =
    count.map((i: CounterState, idx: number) => {
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
            onChange={() => handleCheck(i.id)} />

          {edit.val !== idx ?
            <label htmlFor={i.value}>
              {i.value}
            </label> :
            <input type="text" value={updateInput} onChange={(e) => handleUpdateInput(e, idx)} />
          }
          <button onClick={() => handleEdit(idx, i.id)} style={{ margin: '0 20 0 20' }}>
            {edit.val === idx ? 'Done' : 'Update'}
          </button>

        </div>
      );
    })

  return (

    <div className="container" >
      <div className="header">
        <input type="text" value={input} onChange={(e) => handleInputChange(e)} onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit() }} />
        <button onClick={() => handleSubmit()}>
          Add
        </button>

        <div>{render}</div>
      </div>
    </div >
  );
}

export default App;
