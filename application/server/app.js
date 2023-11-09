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

//delete this
/*
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
*/
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
    "SELECT Topic_Name FROM tutor_database.topic_table", function(err, results) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
});

//delete this
/*
// app.get("/search", (req, res) => {
//   console.log('hi');
//   const searchCategory = req.query.category;
//   const searchTerm = req.query.searchTerm;

//   console.log('Received request with category:', searchCategory);
//   console.log('Received request with searchTerm:', searchTerm);

//   // Define query and queryValues outside of if conditions
//   let query = 'SELECT * FROM tutor_database.tutor_table';
//   const queryValues = [];

//   if (searchCategory) {
//     // First, query the topic_table to get the corresponding topic_id.
//     connection.query(
//       "SELECT Topic_ID FROM tutor_database.topic_table WHERE Topic_Name = ?",
//       [searchCategory],
//       function (err, topicResults) {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: 'An error occurred' });
//         } else {
//           const topicId = topicResults[0] ? topicResults[0].Topic_ID : null;

//           if (topicId) {
//             // Use the obtained topic_id to search the tutor_table.
//             query = 'SELECT * FROM tutor_database.tutor_table WHERE Topic_ID = ?';
//             queryValues.push(topicId);
//           }
//         }

//         handleQuery();
//       }
//     );
//   } else {
//     handleQuery();
//   }
*/


//delete this
/*
//   function handleQuery() {
//     if (searchTerm) {
//       query += ' AND description LIKE ?';
//       queryValues.push(`%${searchTerm}%`);
//     }

//     console.log('Constructed SQL query:', query, 'with values:', queryValues);

//     connection.query(query, queryValues, (error, results) => {
//       if (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//       } else {
//         // Send the results as JSON
//         res.json(results);
//       }
//     });
//   }
// });
*/

app.get("/search", (req, res) => {
  const searchCategory = req.query.category;
  const searchTerm = req.query.searchTerm;

  console.log('Received request with category:', searchCategory);
  console.log('Received request with searchTerm:', searchTerm);

  // Define query and queryValues outside of if conditions
  let query = `
    SELECT 
      tutor_database.tutor_table.tutor_name AS tutorName,
      tutor_database.tutor_table.description AS description,
      tutor_database.tutor_table.resume AS resume,
      tutor_database.tutor_table.profile_picture AS profilePicture,
      tutor_database.topic_table.Topic_Name AS topicName
    FROM tutor_database.tutor_table
    LEFT JOIN tutor_database.topic_table ON tutor_table.Topic_ID = topic_table.Topic_ID
  `;
  const queryValues = [];

  if (searchCategory) {
    // First, query the topic_table to get the corresponding topic_id.
    connection.query(
      "SELECT Topic_ID FROM tutor_database.topic_table WHERE Topic_Name = ?",
      [searchCategory],
      function (err, topicResults) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          const topicId = topicResults[0] ? topicResults[0].Topic_ID : null;

          if (topicId) {
            // Use the obtained topic_id to search the tutor_table.
            query += ' WHERE tutor_database.tutor_table.Topic_ID = ?'; // Remove 'tutor_database.tutor_table'
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
      query += ' (tutor_database.tutor_table.tutor_name LIKE ? OR tutor_database.tutor_table.description LIKE ?)';
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





app.listen(port,()=> {
  console.log(`connect at Port:${port}`);
});

module.exports = app;
