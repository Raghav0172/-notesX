import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://notes-x-19nq-3kfj0m1qk-raghav0172s-projects.vercel.app';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/notes`, { params: { search: query, sort: 'latest' } });
      setNotes(data);
    } catch (err) {
      console.error(err);
      alert('Error loading notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    getNotes();
  };

  const addDownload = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/api/notes/${id}/download`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSearch} style={{ marginBottom: 16 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search department/year/subject/topic" />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {notes.map((note) => (
            <div key={note._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
              <h3>{note.title}</h3>
              <p>{note.department} | {note.year} | {note.subject} | {note.topic}</p>
              <p>{note.description}</p>
              <p>{note.uploaderEmail}</p>
              <p>Downloads: {note.downloads}</p>
              <a href={note.fileUrl} target="_blank" rel="noreferrer" onClick={() => addDownload(note._id)}>Open/Download File</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteList;
