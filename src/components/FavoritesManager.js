import React, { useState } from "react";

const FavoritesManager = ({ notes, onSelectNote }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (noteId) => {
    setFavorites((prev) =>
      prev.includes(noteId)
        ? prev.filter((id) => id !== noteId)
        : [...prev, noteId]
    );
  };

  return (
    <div>
      <h2>즐겨찾기</h2>
      {notes.map((note) => (
        <div key={note.id}>
          <button onClick={() => toggleFavorite(note.id)}>
            {favorites.includes(note.id) ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
          <span>{note.title}</span>
        </div>
      ))}
      <h3>즐겨찾기 목록</h3>
      {favorites.map((id) => {
        const note = notes.find((n) => n.id === id);
        return (
          <div key={id} onClick={() => onSelectNote(note)}>
            {note.title}
          </div>
        );
      })}
    </div>
  );
};

export default FavoritesManager;
