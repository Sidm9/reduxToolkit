import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface todoInterface {
    value: string
    id: number
}

const initialState: todoInterface[] = []

export const counterSlice = createSlice({
    name: 'TODO',

    initialState,
    reducers: {
        
        addTodo: (state, action: PayloadAction<todoInterface>) => {
            state.push(action.payload)
        },


        removeTodo: (state, action: PayloadAction<number>) => {
            return state.filter((x) => x.id !== action.payload)
        },

        updateTodo: (state, action: PayloadAction<todoInterface>) => {
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

export const { addTodo, removeTodo, updateTodo } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter

export default counterSlice.reducer