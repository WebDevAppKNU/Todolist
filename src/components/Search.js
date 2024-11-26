import React, { useState } from "react";

const Search = ({ notes, onSelectNote }) => {
  const [query, setQuery] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>검색</h2>
      <input
        type="text"
        placeholder="제목 또는 내용 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {filteredNotes.map((note) => (
          <div key={note.id} onClick={() => onSelectNote(note)}>
            {note.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
