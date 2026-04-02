# 📚 NotesX - University Notes Sharing Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-green.svg)](https://www.mongodb.com/)

A full-stack web application that enables university students to upload, share, and access academic notes organized by department, year, subject, and topic. Built with modern web technologies and designed for scalability and ease of use.

## ✨ Features

### 🎓 Core Functionality
- **Upload Notes**: Students can upload academic notes with metadata (department, year, subject, topic)
- **Browse & Search**: Advanced search and filtering by department, year, subject, topic, and tags
- **Download Tracking**: Monitor download counts for uploaded notes
- **Admin Approval**: Content moderation system for quality control
- **User Authentication**: Secure login via Firebase Authentication
- **File Storage**: Reliable file storage using Firebase Storage

### 🔍 Advanced Features
- **Full-text Search**: Search across note titles, descriptions, and tags
- **Category Organization**: Hierarchical organization by department → year → subject → topic
- **Tag System**: Custom tagging for better discoverability
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live statistics and download counters

### 📊 Analytics & Stats
- Total notes count
- Department-wise distribution
- Download statistics
- User engagement metrics

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Firebase Admin SDK** - Server-side Firebase integration

### Infrastructure
- **Firebase Authentication** - User authentication and authorization
- **Firebase Storage** - File storage and serving
- **MongoDB Atlas** - Cloud database hosting
- **Docker** - Containerization (optional)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Firebase Project** with Authentication and Storage enabled
- **Git** - Version control system

### Optional (for Docker deployment)
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd pro-1
```

### 2. Backend Setup

#### Using npm (Recommended)
```bash
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.template .env

# Edit .env with your configuration (see Environment Variables section)
# Then start the development server
npm run dev
```

#### Using Docker (Alternative)
```bash
# From project root
docker-compose up --build
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.template .env

# Edit .env with your Firebase configuration
# Then start the development server
npm run dev
```

### 4. Environment Configuration

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/notesx?retryWrites=true&w=majority
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_CLIENT_EMAIL=<firebase-client-email>
FIREBASE_PRIVATE_KEY=<firebase-private-key> # replace newline chars with \n in env
FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>.appspot.com
```

#### Frontend (.env)
```env
VITE_FIREBASE_API_KEY=<your-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-project>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<your-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-project>.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
VITE_FIREBASE_APP_ID=<app-id>
```

## 📖 Usage

### For Students
1. **Browse Notes**: Visit the homepage to explore available notes
2. **Search & Filter**: Use the search bar and filters to find specific notes
3. **Download**: Click on any note to download it directly
4. **Upload**: Navigate to the upload page to share your notes

### For Administrators
1. **Login**: Use admin credentials to access the system
2. **Review Pending Notes**: Check `/api/notes/pending` for notes awaiting approval
3. **Approve Content**: Use the approval endpoint to publish notes
4. **Monitor Statistics**: View platform usage metrics

### API Endpoints

#### Notes Management
- `GET /api/notes` - Get all approved notes (with optional filters)
- `GET /api/notes/:id` - Get specific note details
- `POST /api/notes` - Upload new note (authenticated)
- `PUT /api/notes/:id/approve` - Approve pending note (admin only)
- `PUT /api/notes/:id/download` - Increment download counter

#### System
- `GET /api/health` - Health check endpoint

### Authentication Flow
1. User signs in via Firebase Authentication
2. Frontend obtains ID token
3. Token stored in localStorage as `notesxToken`
4. Backend verifies token on protected routes
5. Admin routes check for admin custom claims

## 📁 Project Structure

```
pro-1/
├── backend/                    # Express.js API server
│   ├── models/
│   │   └── Note.js            # MongoDB note schema
│   ├── routes/
│   │   └── notes.js           # API routes
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── server.js              # Main server file
│   ├── package.json
│   └── .env.template
├── frontend/                   # React.js client
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   │   ├── NoteList.jsx   # Browse notes page
│   │   │   └── UploadNote.jsx # Upload form page
│   │   ├── firebase.js        # Firebase configuration
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # App entry point
│   ├── index.html
│   ├── package.json
│   └── .env.template
├── docker-compose.yml          # Docker orchestration
├── demo.html                   # Standalone demo
├── run.ps1                     # Windows startup script
└── README.md                   # This file
```

## 🔧 Development

### Available Scripts

#### Backend
```bash
cd backend
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

#### Frontend
```bash
cd frontend
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Testing
```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
- **Heroku**: Connect GitHub repo and deploy automatically
- **Railway**: Modern deployment platform with MongoDB integration
- **Vercel**: Serverless deployment (requires adapter)

### Frontend Deployment
- **Vercel**: Recommended for React apps
- **Netlify**: Alternative with great CI/CD
- **GitHub Pages**: Free hosting option

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d --build

# Scale services
docker-compose up -d --scale backend=3
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** for authentication and storage services
- **MongoDB** for flexible document database
- **React** community for excellent documentation
- **Open source contributors** for inspiration and tools

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Review the demo.html for quick testing

---

**Built with ❤️ for the academic community**\n