//Header
//Team Number: 04
//Description: This file sets up the view engine, handles backend errors, gets data from the database, and can search through the database depending on what the user inputs in the front end.

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: '*', 
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions)); 
const port = 5001;
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: '54.219.143.67',
  port: '3306',
  database: 'tutor_database',
  user: 'your_user',
  password: 'your_password'
});

//these were for testing routes
//const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const testAPIRouter = require("./routes/testAPI");
// const homeRouter = require("./routes/home");

//nconst app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

//these were for testing routes
//app.use('/', indexRouter); 
// app.use('/users', usersRouter);
// app.use("/testAPI", testAPIRouter);
// app.use("/home", homeRouter);

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get("/", (req,res)=>{
  res.send("success");
});

app.get("/topic", (req,res) =>{
  connection.query(
    "SELECT topic_name FROM tutor_database.topic", function(err, results) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
});

app.get("/search", (req, res) => {
  const searchCategory = req.query.category;
  const searchTerm = req.query.searchTerm;

  console.log('Received request with category:', searchCategory);
  console.log('Received request with searchTerm:', searchTerm);

  // Define query and queryValues outside of if conditions
  let query = `
    SELECT 
      tutor_database.tutor.tutor_name AS tutorName,
      tutor_database.tutor.description AS description,
      tutor_database.tutor.resume AS resume,
      tutor_database.tutor.profile_picture AS profilePicture,
      tutor_database.topic.topic_name AS topicName
    FROM tutor_database.tutor
    LEFT JOIN tutor_database.topic ON tutor.fk_topic_id = topic.id
  `;
  const queryValues = [];

  if (searchCategory) {
    // First, query the topic_table to get the corresponding topic_id.
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
            // Use the obtained topic_id to search the tutor_table.
            query += ' WHERE tutor_database.tutor.fk_topic_id = ?'; // Remove 'tutor_database.tutor_table'
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
      // Modify the query to include both "tutor_name" and "description" in the search condition
      if (queryValues.length === 0) {
        query += ' WHERE';
      } else {
        query += ' AND';
      }
      query += ' (tutor_database.tutor.tutor_name LIKE ? OR tutor_database.tutor.description LIKE ?)';
      queryValues.push(`%${searchTerm}%`);
      queryValues.push(`%${searchTerm}%`);
    }

    console.log('Constructed SQL query:', query, 'with values:', queryValues);

    connection.query(query, queryValues, (error, results) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        // Send the results as JSON
        res.json(results);
      }
    });
  }
});

app.get("/recent_tutor", (req,res) =>{
  connection.query(
    `SELECT 
      tutor_database.tutor.tutor_name AS tutorName,
      tutor_database.tutor.description AS description,
      tutor_database.tutor.resume AS resume,
      tutor_database.tutor.profile_picture AS profilePicture,
      tutor_database.topic.topic_name AS topicName
    FROM tutor_database.tutor
    LEFT JOIN tutor_database.topic ON tutor.fk_topic_id = topic.id
    ORDER BY tutor_database.tutor.id DESC LIMIT 3`, function(err, results) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
});


app.post("/sendregister", (req,res)=>{
  const {data} = req.body;
  const jsonstring = JSON.stringify(data);
  const jsondata = JSON.parse(jsonstring);
  console.log(jsondata.fullName);
  console.log(jsondata.email);
  console.log(jsondata.password);
  var username = jsondata.fullName;
  var email = jsondata.email;
  var pass = jsondata.password;
  
  connection.query(
    `INSERT INTO tutor_database.users (user_name, email, password) VALUES (?, ?, ?)`, [username, email, pass], (error, results, fields) => {
      if(error) {
        console.error('Error while inserting data:', error);
        return;
      }
      if(results.length === 0){
        console.log('register Fail:', results);
      }
      else{
        console.log('register success:', results);
      }
    }
  )
})





app.post("/sendLogin", (req,res)=>{
  const {data} = req.body;
  const jsonstring = JSON.stringify(data);
  const jsondata = JSON.parse(jsonstring);
  console.log(jsondata.email);
  console.log(jsondata.password);
  var email = jsondata.email;
  var pass = jsondata.password;
  
  connection.query(
    `SELECT * FROM tutor_database.users WHERE email = ? AND password = ?`, [email, pass], (error, results, fields) => {
      if(error) {
        console.error('Error while checking login data:', error);
        return;
      }
      if(results.length === 0){
        console.log('Login Fail:', results);
      }
      else{
        console.log('Login success:', results);
      }
    }
  ) 
})


app.listen(port,()=> {
  console.log(`connect at Port:${port}`);
});

module.exports = app;
