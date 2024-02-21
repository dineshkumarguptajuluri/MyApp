const express = require('express');
const bcrypt=require("bcrypt");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student=require('./models/Student');
const Faculty=require('./models/Faculty');
const cors=require('cors');



const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://dinnu:dinnu@cluster0.ciq0jbr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db=mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');})
// Define a user schema


// Create a User model based on the schema
  // Import your Faculty model

app.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        const requiredFields = [
          "username",
          "userid",
          "password",
          "isfaculty",
          
        ];
    
        // Check if all required fields are present
      
    
        // Check if the email already exists
        let existingUser;
        if(userData.isfaculty)
         existingUser = await Faculty.findOne({ facultyId: userData.userid });
        else
        existingUser = await Student.findOne({ studentId: userData.userid });
        console.log(existingUser);
        if (existingUser) {
          return res.status(400).json({
            message: "User already exists",
          });
          console.log("already exisit");
        }
        let newUser;
        if(userData.isfaculty)
        newUser = new Faculty({
            facultyId:userData.userid,
            password:userData.password,
            username:userData.username,
            isfaculty:userData.isfaculty});
        else
        newUser = new Student({
            studentId:userData.userid,
            password:userData.password,
            username:userData.username,
            isfaculty:userData.isfaculty
        });
        console.log(newUser.isfaculty);
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
  
});
app.post('/login', async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);

        let user;
        if(userData.isfaculty)
       user = await Faculty.findOne({ facultyId: userData.userid });
        else
      user = await Student.findOne({ studentId: userData.userid });
        console.log(user);
    
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
          return res.status(402).json({ message: 'Invalid password' });
        }
        return res.status(201).json({
          message: "Login successful",
          userEmail: user.userid,
          username: user.username,
        });
        console.log("completed");
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
      }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});