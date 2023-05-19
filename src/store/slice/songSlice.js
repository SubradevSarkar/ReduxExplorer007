import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../action";

const songSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
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

export const { addSong, removeSong } = songSlice.actions;
export const songReducer = songSlice.reducer;
