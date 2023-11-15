var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("Home page");
});

// app.get('/',function(req,res){
//     let sql = "SELECT * FROM tutor table"
//     connection.query(sql, function(err, result){
//       if(err) throw err;
//       res.send(results);
//     });
//   })
module.exports = router;