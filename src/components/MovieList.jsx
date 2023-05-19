// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../store";
import { createRandomMovie } from "../data";
import "./playlist.css";

const MovieList = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movie);

  // const [list, setList] = useState([]);

  const handleCreateMovieList = () => {
    const res = createRandomMovie();
    dispatch(addMovie(res));
    // setList((prevState) => {
    //   return [...prevState, res];
    // });
  };

  const handleMovieRemove = (movie) => {
    dispatch(removeMovie(movie));
  };

  const renderedList = movieList.map((movie) => {
    return (
      <li key={movie}>
        {movie}
        <button onClick={() => handleMovieRemove(movie)} className="is-danger">
          X
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="header">
        <h2>Movie PlayList</h2>
        <button className="listBtn" onClick={handleCreateMovieList}>
          + Add Movie to Playlist
        </button>
      </div>
      <ul>{renderedList}</ul>
    </>
  );
};

export default MovieList;
