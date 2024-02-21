const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  // Add any other publication-related fields you need
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  // Add any other project-related fields you need
});

const FacultySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isfaculty: { type: Boolean, required: true },
  department: { type: String },
  designation: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  publications: { type: [PublicationSchema] }, // Array of publications
  projects: { type: [ProjectSchema] }, // Array of projects
  linkedinProfile: { type: String },
  googleScholarProfile: { type: String },
  awards: { type: [String] }, // Array of awards
});

// Hash the password before saving to the database
FacultySchema.pre('save', async function (next) {
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;
