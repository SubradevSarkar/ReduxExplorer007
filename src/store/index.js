import { configureStore } from "@reduxjs/toolkit";
import { movieReducer, addMovie, removeMovie } from "./slice/movieSlice";
import { songReducer, addSong, removeSong } from "./slice/songSlice";
import { reset } from "./action";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    song: songReducer,
  },
});

export { store, reset, addMovie, removeMovie, addSong, removeSong };
