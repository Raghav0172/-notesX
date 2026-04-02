import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NoteList from './pages/NoteList';
import UploadNote from './pages/UploadNote';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 1024, margin: '0 auto', padding: 16 }}>
      <header>
        <h1>NotesX</h1>
        <nav style={{ marginBottom: 16 }}>
          <Link to="/">Browse Notes</Link> | <Link to="/upload">Upload Note</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/upload" element={<UploadNote />} />
      </Routes>
    </div>
  );
}

export default App;
