import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://notes-x-19nq-3kfj0m1qk-raghav0172s-projects.vercel.app';

function UploadNote() {
  const [form, setForm] = useState({
    title: '',
    department: '',
    year: '',
    subject: '',
    topic: '',
    description: '',
    tags: ''
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage({ type: 'error', text: '❌ Please select a file to upload' });
      return;
    }

    if (!form.title || !form.department || !form.year || !form.subject || !form.topic) {
      setMessage({ type: 'error', text: '❌ Please fill in all required fields' });
      return;
    }

    setSubmitting(true);
    try {
      const token = window.localStorage.getItem('notesxToken');
      if (!token) {
        setMessage({ type: 'error', text: '❌ Please login to upload notes' });
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      Object.keys(form).forEach((k) => formData.append(k, form[k]));

      await axios.post(`${API_BASE_URL}/api/notes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setMessage({
        type: 'success',
        text: '✓ Note uploaded successfully! It will be visible after admin approval.'
      });

      setForm({
        title: '',
        department: '',
        year: '',
        subject: '',
        topic: '',
        description: '',
        tags: ''
      });
      setFile(null);
      setFileName('');

      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 4000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: '❌ Upload failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="page-section">
        <div className="page-header">
          <h2>📤 Upload Your Notes</h2>
          <p className="text-muted">Share your academic notes with the community</p>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type} message-alert`}>
            {message.text}
          </div>
        )}

        <form onSubmit={onSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">Note Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={onChange}
              placeholder="e.g., Database Design Fundamentals"
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={onChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil">Civil Engineering</option>
                <option value="Electrical">Electrical Engineering</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <select
                id="year"
                name="year"
                value={form.year}
                onChange={onChange}
                required
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={onChange}
                placeholder="e.g., Database Management Systems"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="topic">Topic *</label>
              <input
                id="topic"
                name="topic"
                type="text"
                value={form.topic}
                onChange={onChange}
                placeholder="e.g., Normalization"
                required
              />
            </div>
          </div>

          <div className="form-group form-grid-full">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="Add a brief description of your notes, key topics covered, etc."
            ></textarea>
          </div>

          <div className="form-group form-grid-full">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={form.tags}
              onChange={onChange}
              placeholder="e.g., important, midterm, cheatsheet, finals"
            />
          </div>

          <div className="form-group form-grid-full">
            <label htmlFor="file">Select File *</label>
            <div className="file-upload">
              <label htmlFor="file" className="file-upload-label">
                <div className="file-upload-text">📎 {fileName || 'Click to upload or drag and drop'}</div>
                <div className="file-upload-hint">PDF, DOCX, PNG or other formats (max 30MB)</div>
              </label>
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.xlsx,.csv"
                required
              />
            </div>
          </div>

          <div className="flex" style={{ gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ flex: 1 }}
            >
              {submitting ? (
                <>
                  <div className="loading"></div>
                  Uploading...
                </>
              ) : (
                '📤 Upload Note'
              )}
            </button>
          </div>

          <p className="text-muted" style={{ marginTop: 'var(--spacing-lg)', fontSize: '0.85rem' }}>
            💡 Tip: Your notes will be reviewed by moderators before being publicly available. Make sure to provide accurate information for better categorization.
          </p>
        </form>
      </div>
    </div>
  );
}

export default UploadNote;
