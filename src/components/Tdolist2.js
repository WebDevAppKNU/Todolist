import React, { useState } from "react";
import FavoritesManager from "./FavoritesManager";
import Search from "./Search";

const Todolist2 = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "메모1", content: "내용1" },
    { id: 2, title: "메모2", content: "내용2" },
    { id: 3, title: "메모3", content: "내용3" },
  ]);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>메모 관리 웹사이트</h1>
      <FavoritesManager notes={notes} onSelectNote={handleSelectNote} />
      <Search notes={notes} onSelectNote={handleSelectNote} />
      {selectedNote && (
        <div style={{ marginTop: "20px" }}>
          <h2>선택된 메모</h2>
          <h3>{selectedNote.title}</h3>
          <p>{selectedNote.content}</p>
        </div>
      )}
    </div>
  );
};

export default Todolist2;
