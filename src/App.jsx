import { useDispatch } from "react-redux";
import { reset } from "./store";
import "./index.css";

import MovieList from "./components/MovieList";
import SongList from "./components/SongList";

export default function App() {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <main>
      <h1>PlayList</h1>
      <button className="resetBtn" onClick={handleReset}>
        Reset playList
      </button>
      <br />
      <MovieList />
      <br />
      <SongList />
    </main>
  );
}
