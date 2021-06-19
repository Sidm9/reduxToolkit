import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface CounterState {
    value: string
    id: number
}

const initialState: CounterState[] = []

export const counterSlice = createSlice({
    name: 'counter',

    initialState,
    reducers: {
        add: (state, action: PayloadAction<CounterState>) => {
            state.push(action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter((x) => x.id !== action.payload)
        },

        updateTodo: (state, action: PayloadAction<CounterState>) => {
            return state.map((index) => {
                if (action.payload.id === index.id) {
                    return {
                        ...index,
                        value: action.payload.value
                    }
                }
                return index
            })
        }


    },
})

export const { add, remove, updateTodo } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter

export default counterSlice.reducer