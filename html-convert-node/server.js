const path = require('path');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = Date.now() + "-" + file.originalname;
    cb(null, safeName);
  }
});
const upload = multer({ storage });



app.post('/submit-form', upload.single('avatar'), (req, res) => {
  const fields = req.body;
  const file = req.file; 
  console.log('Form fields:', fields);
  if (file) console.log('Uploaded file:', file.path);

  return res.redirect('/thank-you.html');
});

app.post('/api/data', (req, res) => {
  console.log('JSON received:', req.body);
  res.json({ ok: true, received: req.body });
});

app.get('/uploads', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send('Error reading uploads');
    res.json({ files });
  });
});

app.use((req, res) => {
  res.status(404).send('404 - Not found');
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
