import { configureStore } from '@reduxjs/toolkit'
import arrayReducer from '../redux/ArrayData'

export default configureStore({
  reducer: {
    arrayReducer,
  },
})