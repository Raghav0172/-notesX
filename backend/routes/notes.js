const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getStorage } = require('firebase-admin/storage');
const Note = require('../models/Note');
const { authenticateToken } = require('../middleware/auth');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 }
});

router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const { title, department, year, subject, topic, description, tags } = req.body;
    if (!title || !department || !year || !subject || !topic) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const bucket = getStorage().bucket();
    const firebaseFile = bucket.file(`notes/${Date.now()}_${req.file.originalname}`);
    await firebaseFile.save(req.file.buffer, {
      contentType: req.file.mimetype,
      public: true
    });

    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${firebaseFile.name}`;

    const newNote = new Note({
      title,
      department,
      year,
      subject,
      topic,
      description,
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
      fileUrl,
      fileName: req.file.originalname,
      uploaderId: req.user.uid,
      uploaderEmail: req.user.email,
      approved: false
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { department, year, subject, search, sort } = req.query;
    const query = { approved: true };

    if (department) query.department = department;
    if (year) query.year = year;
    if (subject) query.subject = subject;

    if (search) query.$text = { $search: search };

    let notes = Note.find(query);

    if (sort === 'latest') notes = notes.sort({ createdAt: -1 });
    else if (sort === 'popular') notes = notes.sort({ downloads: -1 });

    notes = await notes.exec();

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || !note.approved) {
      return res.status(404).json({ message: 'Note not found or not yet approved' });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// switch any admin flag from firebase custom claims or fallback allow-list
function ensureAdmin(req, res, next) {
  if (req.user && req.user.admin === true) {
    return next();
  }
  return res.status(403).json({ message: 'Admin permission required' });
}

router.get('/pending', authenticateToken, ensureAdmin, async (req, res) => {
  try {
    const pendingNotes = await Note.find({ approved: false }).sort({ createdAt: -1 });
    res.json(pendingNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/approve', authenticateToken, ensureAdmin, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.approved = true;
    const updated = await note.save();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/download', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.downloads += 1;
    await note.save();
    res.json({ message: 'Download count updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
