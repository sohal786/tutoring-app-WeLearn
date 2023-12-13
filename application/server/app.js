// Header
// Team Number: 04
// Description: This file sets up the view engine, handles backend errors, gets data from the database, and can search through the database depending on what the user inputs in the front end.

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const multer = require('multer'); // Import multer for file handling
const bcrypt = require('bcrypt');

const app = express();
const port = 5001;
const mysql = require("mysql2");

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Setup database connection
const connection = mysql.createConnection({
  host: '54.219.143.67',
  port: '3306',
  database: 'tutor_database',
  user: 'your_user',
  password: 'your_password'
});

const sessionStore = new MySQLStore({}, connection);

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  credentials: true, // Important for cookies, authorization headers with HTTPS
  optionsSuccessStatus: 200
};





app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const currentDirectory = process.cwd();

// Define the path to the "uploads" folder
const uploadsFolderPath = path.join(currentDirectory, 'uploads');

console.log('uploadsFolderPath:', uploadsFolderPath);



// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  session({
    secret: 'csc648 secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);

const imageDir = path.join(__dirname, 'uploads');

//Serve images using a specific route
app.get('/images/:imageName', (req, res) => {

  const imageName = req.params.imageName;
  console.log(imageName);
  const imagePath = path.join(imageDir, imageName);

  // Use res.sendFile to send the image file
  res.sendFile(imagePath, (err) => {
    if (err) {
      // Handle the error by sending a 404 status code
      res.status(404).send('Image not found');
    }
  });
});



// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this uploads directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};


app.get("/api/check-session", (req, res) => {
    console.log("i am here");
  if (req.session && req.session.user) {
    // User is logged in
    res.json({ isLoggedIn: true, user: req.session.user });
  } else {
    // User is not logged in
    res.json({ isLoggedIn: false });
  }
});
app.post("/api/logout", (req, res) => {
  if (req.session) {
    // Destroy the session
    req.session.destroy(err => {
      if (err) {
        // Handle error
        res.status(500).send('Could not log out, please try again');
      } else {
        // Session destroyed, user logged out
        res.send('Logout successful');
      }
    });
  } else {
    // No session found, nothing to do
    res.send('No active session');
  }
});

app.get("/", isLoggedIn, (req, res) => {
  res.send("success");
  res.json({ user: req.session.user });
});

app.get("/topic", (req, res) => {
  connection.query(
    "SELECT topic_name FROM tutor_database.topic", function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
});
app.get("/images2", (req, res) => {
  console.log("called")

  res.send("success");

});

app.get("/search", (req, res) => {
  const searchCategory = req.query.category;
  const searchTerm = req.query.searchTerm;

  console.log('Received request with category:', searchCategory);
  console.log('Received request with searchTerm:', searchTerm);

  let query = `
    SELECT 
      tutor_database.tutor.id AS tutorId,
      tutor_database.tutor.tutor_name AS tutorName,
      tutor_database.tutor.description AS description,
      tutor_database.tutor.resume AS resume,
      tutor_database.tutor.profile_picture AS profilePicture,
      tutor_database.topic.topic_name AS topicName,
      tutor_database.tutor.video AS video
    FROM tutor_database.tutor
    LEFT JOIN tutor_database.topic ON tutor.fk_topic_id = topic.id
    WHERE tutor_database.tutor.status = 'approved'
  `;
  const queryValues = [];

  if (searchCategory) {
    connection.query(
      "SELECT id FROM tutor_database.topic WHERE topic_name = ?",
      [searchCategory],
      function (err, topicResults) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          const topicId = topicResults[0] ? topicResults[0].id : null;

          if (topicId) {
            query += ' AND tutor_database.tutor.fk_topic_id = ?';
            queryValues.push(topicId);
          }

          handleQuery();
        }
      }
    );
  } else {
    handleQuery();
  }

  function handleQuery() {
    if (searchTerm) {
      query += ' AND (tutor_database.tutor.tutor_name LIKE ? OR tutor_database.tutor.description LIKE ?)';
      queryValues.push(`%${searchTerm}%`);
      queryValues.push(`%${searchTerm}%`);
    }

    console.log('Constructed SQL query:', query, 'with values:', queryValues);

    connection.query(query, queryValues, (error, results) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  }
});

app.get("/recent_tutor", (req, res) => {
  connection.query(
    `SELECT 
        tutor_database.tutor.tutor_name AS tutorName,
        tutor_database.tutor.description AS description,
        tutor_database.tutor.resume AS resume,
        tutor_database.tutor.profile_picture AS profilePicture,
        tutor_database.topic.topic_name AS topicName,
        tutor_database.tutor.video AS video
    FROM tutor_database.tutor
    LEFT JOIN tutor_database.topic ON tutor.fk_topic_id = topic.id
    WHERE tutor_database.tutor.status = 'approved'
    ORDER BY tutor_database.tutor.id DESC LIMIT 3`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
});

app.post('/apply-tutor', upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profile_picture', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send('Unauthorized: User not logged in');
  }

  const userId = req.session.user.userId;
  const files = req.files;
  const formData = req.body;
  const selectedTopicName = req.body.topic; 

  // Construct file paths
  const resumePath = files.resume ? files.resume[0].path : null;
  const profilePicturePath = files.profile_picture ? files.profile_picture[0].path : null;
  const videoPath = files.video? files.video[0].path : null;


  const topicQuery = 'SELECT id FROM topic WHERE topic_name = ?';
  connection.query(topicQuery, [selectedTopicName], (topicError, topicResults) => {
    if (topicError) {
      console.error('Database query error:', topicError);
      return res.status(500).send('Internal Server Error');
    }

    if (topicResults.length === 0) {
      return res.status(404).send('Topic not found');
    }

    const fkTopicId = topicResults[0].id;

  



  // Retrieve user name from the database using userId
  const userQuery = 'SELECT user_name FROM users WHERE id = ?';
  connection.query(userQuery, [userId], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const tutorName = results[0].user_name; // Replace with actual column name

    // SQL query to insert data into the database
    const insertQuery = `
      INSERT INTO tutor (tutor_name, resume, profile_picture, description, fk_users_id, fk_topic_id, status, video)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Values from the form, file paths, and session data
    const values = [
      tutorName,
      resumePath,
      profilePicturePath,
      formData.description,
      userId, // Use userId from session
      fkTopicId, // Assuming this comes from the form
      'pending',
      videoPath
    ];

    // Execute the insert query
    connection.query(insertQuery, values, (error, results, fields) => {
      if (error) {
        console.error('Error inserting data into database:', error);
        return res.status(500).send('Error saving application');
      }

      console.log('Application saved:', results);
      res.send('Application received and saved successfully');
    });
  });
});
});





app.post("/sendregister", (req, res) => {
  const { data } = req.body;
  const jsonstring = JSON.stringify(data);
  const jsondata = JSON.parse(jsonstring);
  console.log(jsondata.fullName);
  console.log(jsondata.email);
  console.log(jsondata.password);
  var username = jsondata.fullName;
  var email = jsondata.email;
  var pass = jsondata.password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Hashed password', hash);
        connection.query(
          `INSERT INTO tutor_database.users (user_name, email, password) VALUES (?, ?, ?)`, [username, email, hash], (error, results, fields) => {
            if (error) {
              console.error('Error while inserting data:', error);
              res.status(500).json({ success: false });
              return;
            }
            console.log('register success:', results);
            res.status(200).json({ success: true });
          }
        );
      }
    })
  })
});

app.get("/sendLogin", (req, res) => {
  const { email, password } = req.query;
  console.log(email, password)

  connection.query(
    `SELECT id, password FROM tutor_database.users WHERE email = ?`, [email], (error, results, fields) => {
      if (error) {
        console.error('Error while checking login data:', error);
        return;
      }
      if (results.length === 0) {
        console.log('Login Fail:', results);
        res.json({ success: false })
      }
      else {
        const userId = results[0].id;
        const hashedPassword = results[0].password;
        console.log(hashedPassword)
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
          if (err) {
            console.error('Error while comparing passwords:', err);
            res.status(500).json({ success: false });
          } else {
            if (isMatch) {
              req.session.user = {
                userId: userId,
                email: email,
              };
              
              console.log('password matches. login success');
              console.log(req.session);
              res.json({ success: true });
            } else {
              console.log('password does not match. login fail');
              res.json({ success: false });
            }
          }
        })
      }
    }
  )
})
app.post("/send-message", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send('Unauthorized: User not logged in');
  }

  const senderId = req.session.user.userId; // Assuming sender's ID is stored in session
  const { receiver_id, content } = req.body;

  if (!receiver_id || !content) {
    return res.status(400).send('Missing receiver ID or message');
  }

  const query = `
    INSERT INTO messages (sender_id, receiver_id, content, sent_at)
    VALUES (?, ?, ?, NOW())
  `;
  const values = [senderId, receiver_id, content];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    } else {
      res.send('Message sent successfully');
    }
  });
});











/* FOR DASHBOARD */
app.get("/messages", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send('Unauthorized: User not logged in');
  }

  const receiverId = req.session.user.userId;

  const query = `
    SELECT 
        messages.sender_id,
        messages.content,
        users.user_name AS senderUsername
     FROM messages
     JOIN users ON messages.sender_id = users.id
     WHERE messages.receiver_id = ?
  `;
  const values = [receiverId];

  connection.query(query, values, (error, results) => {
    if (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'An error occurred' });
    } else {
        res.json(results);
    }
  });
});

/* FOR DASHBOARD */

app.listen(port, () => {
  console.log(`connect at Port:${port}`);
});

module.exports = app;
