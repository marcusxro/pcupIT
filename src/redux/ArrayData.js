import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'ArrayItem',
  initialState: {
    value: [],
  },
  reducers: {
    AddArray: (state, action) => {
      const newItems = action.payload;
      state.value.push(...newItems); // Spread the elements of action.payloa
    },
    DecArray: (state, action) => {
        state.value = state.value.filter(id => id !== action.payload);
    },
    setArrayData: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { AddArray, DecArray, setArrayData } = counterSlice.actions

export default counterSlice.reducer