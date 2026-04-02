import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://notes-x-19nq-3kfj0m1qk-raghav0172s-projects.vercel.app';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const getNotes = async (filters = {}) => {
    setLoading(true);
    try {
      const params = {
        search: filters.search || query,
        department: filters.department || department,
        sort: 'latest'
      };
      const { data } = await axios.get(`${API_BASE_URL}/api/notes`, { params });
      setNotes(data);
      setMessage({ type: '', text: '' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error loading notes. Please try again.' });
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

  const handleDepartmentChange = (e) => {
    const newDept = e.target.value;
    setDepartment(newDept);
    getNotes({ department: newDept, search: query });
  };

  const resetFilters = () => {
    setQuery('');
    setDepartment('');
    getNotes({ search: '', department: '' });
  };

  const addDownload = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/api/notes/${id}/download`);
      getNotes();
      setMessage({ type: 'success', text: '✓ Download recorded!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="page-section">
        <div className="page-header">
          <h2>📖 Browse Notes</h2>
          <p className="text-muted">Explore academic notes shared by your peers</p>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type} message-alert`}>
            {message.text}
          </div>
        )}

        <form onSubmit={onSearch} className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, subject, topic, or tags..."
          />
          <button type="submit" className="btn btn-primary">
            🔍 Search
          </button>
          <button type="button" onClick={resetFilters} className="btn btn-outline">
            Reset
          </button>
        </form>

        <div className="filter-group">
          <div>
            <label htmlFor="deptFilter">Filter by Department</label>
            <select
              id="deptFilter"
              value={department}
              onChange={handleDepartmentChange}
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Electrical">Electrical Engineering</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
            <span className="loading-text">Loading notes...</span>
          </div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No notes found</h3>
            <p>Try adjusting your search filters or be the first to upload notes!</p>
          </div>
        ) : (
          <>
            <p className="text-muted" style={{ marginBottom: 'var(--spacing-xl)' }}>
              Found {notes.length} note{notes.length !== 1 ? 's' : ''}
            </p>
            <div className="notes-grid">
              {notes.map((note) => (
                <div key={note._id} className="note-card fade-in">
                  <h3>{note.title}</h3>
                  <p className="note-description">
                    {note.description || 'No description available'}
                  </p>
                  <div className="note-meta">
                    <span className="badge badge-primary">{note.department}</span>
                    <span className="badge badge-success">{note.year}</span>
                    <span className="badge badge-warning">{note.subject}</span>
                  </div>
                  <div className="text-muted">
                    <strong>Topic:</strong> {note.topic}
                  </div>
                  {note.tags && note.tags.length > 0 && (
                    <div style={{ marginTop: 'var(--spacing-md)' }}>
                      <small className="text-muted">
                        <strong>Tags:</strong> {note.tags.slice(0, 3).join(', ')}
                        {note.tags.length > 3 ? '...' : ''}
                      </small>
                    </div>
                  )}
                  <div className="note-info">
                    <div className="text-muted">
                      👤 {note.uploaderEmail}
                    </div>
                    <div className="note-downloads">
                      📥 {note.downloads}
                    </div>
                  </div>
                  <div className="note-actions">
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => addDownload(note._id)}
                      className="btn btn-primary btn-small"
                    >
                      ⬇️ Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NoteList;
