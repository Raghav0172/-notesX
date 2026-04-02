import React, { useState } from 'react';
import axios from 'axios';

function UploadNote() {
  const [form, setForm] = useState({
    title: '', department: '', year: '', subject: '', topic: '', description: '', tags: ''
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Select a file');

    setSubmitting(true);
    try {
      const token = window.localStorage.getItem('notesxToken');
      if (!token) {
        return alert('Please login and store Firebase token in localStorage as notesxToken');
      }

      const formData = new FormData();
      formData.append('file', file);
      Object.keys(form).forEach((k) => formData.append(k, form[k]));

      await axios.post('/api/notes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Note uploaded successfully. Admin must approve it before public listing.');
      setForm({ title: '', department: '', year: '', subject: '', topic: '', description: '', tags: '' });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Upload notes</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, maxWidth: 500 }}>
        <input name="title" value={form.title} onChange={onChange} placeholder="Title" required />
        <input name="department" value={form.department} onChange={onChange} placeholder="Department" required />
        <input name="year" value={form.year} onChange={onChange} placeholder="Year" required />
        <input name="subject" value={form.subject} onChange={onChange} placeholder="Subject" required />
        <input name="topic" value={form.topic} onChange={onChange} placeholder="Topic" required />
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" />
        <input name="tags" value={form.tags} onChange={onChange} placeholder="Tags comma-separated" />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit" disabled={submitting}>{submitting ? 'Uploading...' : 'Upload Note'}</button>
      </form>
    </div>
  );
}

export default UploadNote;
