import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [transcript, setTranscript] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleGeneratePodcast = async () => {
    if (!transcript && !selectedFile) {
      setMessage('Please provide either a transcript or an audio file.');
      return;
    }

    setMessage('');
    setUploading(true);

    try {
      if (selectedFile) {
        // Logic for handling file upload to /api/generate-podcast
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await axios.post('/api/generate-podcast', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage(response.data.message);
      } else {
        // Logic for sending transcript to /api/generate-from-transcript
        const response = await axios.post('/api/generate-from-transcript', {
          transcript,
        });
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Podcast Generator</h1>
        <div className="buttons">
          <label className="upload-audio">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            🎤 Upload Audio
          </label>
          <button className="enter-transcript" onClick={() => setSelectedFile(null)}>
            ✏️ Enter Transcript
          </button>
        </div>
        {!selectedFile && (
          <textarea
            placeholder="Paste your transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        )}
        <button className="generate-button" onClick={handleGeneratePodcast} disabled={uploading}>
          {uploading ? 'Generating...' : 'Generate Podcast Magic ✨'}
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
