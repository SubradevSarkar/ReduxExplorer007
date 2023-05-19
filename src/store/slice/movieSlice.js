import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../action";

const movieSlice = createSlice({
  name: "movie",
  initialState: [],
  reducers: {
    addMovie(state, action) {
      state.push(action.payload);
    },
    removeMovie(state, action) {
      const removeItemIndex = state.indexOf(action.payload);
      state.splice(removeItemIndex, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(reset, () => {
      return [];
    });
  },
});

export const { addMovie, removeMovie } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
