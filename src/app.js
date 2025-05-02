import express from 'express';
import multer from 'multer';
import './config.js';
import { editImage } from './tools.js';

const upload = multer();
const app = express();
app.use(express.json());

// Endpoint: apply GPT-Image-1 edits
app.post('/api/edit-image', upload.single('image'), async (req, res) => {
  try {
    const { prompt, size = '1024x1024' } = req.body;
    const imageBuffer = req.file.buffer;
    const images = await editImage(imageBuffer, prompt, size);
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
