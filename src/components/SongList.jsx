import { useDispatch, useSelector } from "react-redux";
import { addSong, removeSong } from "../store";
import { createRandomSong } from "../data";
import "./playlist.css";

const SongList = () => {
  const dispatch = useDispatch();
  const songList = useSelector((state) => state.song);

  const handleSongList = () => {
    const res = createRandomSong();
    dispatch(addSong(res));
  };
  const handleRemoveSong = (song) => {
    dispatch(removeSong(song));
  };

  const renderedList = songList.map((song) => {
    return (
      <li key={song}>
        {song}
        <button onClick={() => handleRemoveSong(song)} className="is-danger">
          X
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="header">
        <h2>Song PlayList</h2>
        <button className="listBtn" onClick={handleSongList}>
          + Add Song to Playlist
        </button>
      </div>
      <ul>{renderedList}</ul>
    </>
  );
};

export default SongList;
