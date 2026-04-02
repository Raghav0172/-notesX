import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import NoteList from './pages/NoteList';
import UploadNote from './pages/UploadNote';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <header className="header">
        <div className="container flex-between">
          <div className="brand">
            <h1>📚 NotesX</h1>
            <p className="text-muted">University Notes Sharing Platform</p>
          </div>
          <nav className="navbar">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Browse Notes
            </Link>
            <Link 
              to="/upload" 
              className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}
            >
              Upload Note
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/upload" element={<UploadNote />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container text-center">
          <p className="text-muted">© 2025 NotesX. Built with ❤️ for the academic community.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
