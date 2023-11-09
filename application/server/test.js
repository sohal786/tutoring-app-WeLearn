//delete this whole file

// const express = require('express');
// // const path = require('path');

// const app = express();
// const port = 3001;
// const cors = require("cors");
// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "andy0115",
//   database: "tutor_database",
// });
// // const port = process.env.PORT || 3000; // Choose your desired port

// // Serve static files from the React app
// // app.use(express.static(path.join(__dirname, '../client/build')));

// // Define API routes here if needed

// // Always return the main index.html, so react-router render the route in the client
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// // });

// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.get("/", (req,res)=>{
//   res.send("success");
// });

// app.get("/topic", (req,res) =>{
//   connection.query(
//     "SELECT Topic_Name FROM tutor_database.topic_table", function(err, results) {
//       if(err) {
//         console.log(err);
//       } else {
//         res.send(results);
//       }
//     }
//   )
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// module.exports = app;
