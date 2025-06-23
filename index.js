const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// To serve static files
app.use(express.static('static'));

// To parse JSON bodies
app.use(express.json());

// Sample student data (mocked)
const students = [
  { name: "Alice Johnson", marks: [90, 88, 95, 85, 75] },
  { name: "Bob Smith", marks: [85, 70, 88, 90, 77] },
  { name: "Charlie Brown", marks: [50, 60, 55, 65, 70] },
  { name: "David Lee", marks: [95, 92, 91, 88, 90] }
];

// Serve your HTML page
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// ✅ POST /students/above-threshold
app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: 'Threshold must be a number' });
  }

  const result = students
    .map(student => {
      const total = student.marks.reduce((acc, mark) => acc + mark, 0);
      return { name: student.name, total };
    })
    .filter(student => student.total > threshold);

  res.json({
    count: result.length,
    students: result
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});
