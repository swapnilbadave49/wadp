const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

// Mongoose schema
const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_marks: Number
});

const Student = mongoose.model('Student', studentSchema);

// Insert array of students
app.post('/api/students/insert', async (req, res) => {
  const sampleStudents = [
    { Name: 'Amit', Roll_No: 1, WAD_Marks: 23, CC_Marks: 25, DSBDA_Marks: 21, CNS_Marks: 28, AI_marks: 24 },
    { Name: 'Sneha', Roll_No: 2, WAD_Marks: 28, CC_Marks: 27, DSBDA_Marks: 19, CNS_Marks: 21, AI_marks: 22 },
    { Name: 'Raj', Roll_No: 3, WAD_Marks: 26, CC_Marks: 29, DSBDA_Marks: 24, CNS_Marks: 25, AI_marks: 26 },
    { Name: 'Priya', Roll_No: 4, WAD_Marks: 30, CC_Marks: 28, DSBDA_Marks: 26, CNS_Marks: 30, AI_marks: 29 },
  ];

  try {
    const result = await Student.insertMany(sampleStudents);
    res.json({ message: `${result.length} students inserted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// a) & d) Display all students + total count
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json({ students, count: students.length });
});

// e) DSDBA > 20
app.get('/api/students/dsbda/20', async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { Name: 1, _id: 0 });
  res.json(students);
});

// f) Update marks by 10 for given name
app.put('/api/students/update/:name', async (req, res) => {
  const name = req.params.name;
  const result = await Student.updateOne(
    { Name: name },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_marks: 10
      }
    }
  );
  res.json({ modifiedCount: result.modifiedCount });
});

// g) Marks > 25 in all subjects
app.get('/api/students/topper', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_marks: { $gt: 25 }
  }, { Name: 1, _id: 0 });
  res.json(students);
});

// h) < 40 in WAD & CC (Math & Science assumed as WAD & CC)
app.get('/api/students/weak', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CC_Marks: { $lt: 40 }
  }, { Name: 1, _id: 0 });
  res.json(students);
});

// i) Delete by name
app.delete('/api/students/delete/:name', async (req, res) => {
  const result = await Student.deleteOne({ Name: req.params.name });
  res.json({ deletedCount: result.deletedCount });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
