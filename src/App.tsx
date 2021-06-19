import { FC, useState } from 'react';
import './App.css';
import { add, CounterState, remove } from './redux/counter/counterSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks'

const App: FC = () => {

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()
  const [input, setInput] = useState<string>('')


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

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

  const render =
    count.map((i: CounterState) => {
      return (
        <div key={i.id}>
          <input type='checkbox' className="check" id={(i.id).toString()} value={i.value} onChange={() => handleCheck(i.id)} />
          <label htmlFor={i.value} > {i.value}</label>
        </div>
      );
    })

  return (

    <div className="container" >
      <div className="header">
        <input type="text" value={input} onChange={(e) => handleInputChange(e)} onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit() }} />
        <button onClick={() => handleSubmit()}>
          INCREMENT
        </button>

        <div>{render}</div>
      </div>
    </div >
  );
}

export default App;
