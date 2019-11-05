import React, { useState } from 'react';
// import Square from './Square';

const Board = () => {
  const [songs, setSongs] = useState([
    {title: "wrecking ball", id: 1},
    {title: "party in the usa", id: 2},
    {title: "8 things i hate about you", id: 3},
  ])

const addSong = () => {
  const newId = songs.length + 1;
  setSongs([...songs, {title: "another miley song", id: newId}])
}

  return (
    <div className="backgroundStuff">
    </div>
  );
}

export default Board;
