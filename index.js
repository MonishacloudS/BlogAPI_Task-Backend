require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
const postRoute = require('./routes/posts.js');
const collectionRoute = require('./routes/collections.js');



// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to the app' })
})

app.use("/images", express.static(path.join(__dirname, "/images")));

// connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port')
        })
    })
    .catch((err) => {
        console.log(err)
    })

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Configure file storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/uploads", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

  app.use('/api/auth', authRoute);
  app.use('/api/users', userRoute);
  app.use('/api/posts', postRoute);
  app.use('/api/collections', collectionRoute);




  





