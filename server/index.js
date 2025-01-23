const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Route: /api/generate-podcast
app.post('/api/generate-podcast', (req, res) => {
    const { title, description, duration } = req.body;

    if (!title || !description || !duration) {
        return res.status(400).json({
            error: "Missing required fields: 'title', 'description', or 'duration'.",
        });
    }

    // Example logic for podcast generation
    const podcast = {
        title,
        description,
        duration,
        createdAt: new Date(),
        status: "Podcast generated successfully.",
    };

    return res.status(200).json({
        message: "Podcast generated successfully.",
        data: podcast,
    });
});

// Route: /api/generate-from-transcript
app.post('/api/generate-from-transcript', (req, res) => {
    const { transcript } = req.body;

    if (!transcript) {
        return res.status(400).json({
            error: "Missing required field: 'transcript'.",
        });
    }

    // Example logic for generating content from a transcript
    const generatedContent = {
        transcript,
        analysis: `Processed transcript of length ${transcript.length}`,
        generatedAt: new Date(),
        status: "Content generated successfully.",
    };

    return res.status(200).json({
        message: "Content generated from transcript successfully.",
        data: generatedContent,
    });
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Podcast API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
