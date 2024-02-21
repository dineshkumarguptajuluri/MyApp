const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  // Add any other project-related fields you need
});

const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  // Add any other publication-related fields you need
});

const PostSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const AwardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date },
  description: { type: String },
});

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date },
  description: { type: String },
});

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isfaculty: { type: Boolean, required: true },
  geeksForGeeksProfile: { type: String },
  linkedinProfile: { type: String },
  githubProfile: { type: String },
  year: { type: Number },
  department: { type: String },
  skills: { type: [SkillSchema] }, // Array of skills
  projects: { type: [ProjectSchema] }, // Array of projects
  publications: { type: [PublicationSchema] }, // Array of publications
  posts: { type: [PostSchema] }, // Array of posts
  leetcodeProfile: { type: String },
  courseraProfile: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  awards: { type: [AwardSchema] }, // Array of awards
  achievements: { type: [AchievementSchema] }, // Array of achievements
});

// Hash the password before saving to the database
StudentSchema.pre('save', async function (next) {
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
