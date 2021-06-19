import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface CounterState {
    value: string
    id: number
}

// Define the initial state using that type
const initialState: CounterState[] = []

export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        add: (state, action: PayloadAction<CounterState>) => {
            state.push(action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter((x) => x.id !== action.payload)
        }
    },
})

export const { add, remove } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter

export default counterSlice.reducer