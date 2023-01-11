import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showRecent: false,
    status: []
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleRecent: (state, action) => {
            state.showRecent = !state.showRecent;
        },
        changeStatus: (state, action) => {
            if (state.status.includes(action?.payload)) {
                state.status = state.status.filter(x => x !== action.payload)
            }
            else {
                state.status.push(action?.payload)
            }

        }
    },
})

export const { toggleRecent, changeStatus } = filterSlice.actions
export default filterSlice.reducer;