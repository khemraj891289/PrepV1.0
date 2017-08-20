var express =   require("express");  
var multer  =   require('multer');
var bodyParser = require('body-parser'); 
var path = require('path');
var app =   express();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'prep'
});

connection.connect();
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'uploads'))); 

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
var filestorename;
var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './uploads');  
  },  
  filename: function (req, file, callback) {  
    var extArray = file.mimetype.split("/");
    var extension = extArray[extArray.length - 1];
    filestorename = "He9jspF"+req.body.department+"TyPE985"+req.body.code+req.body.year+"a234Zsqp"+req.body.category+"zpyASZ."+extension;
    callback(null, filestorename);  
  }  
});  
var upload = multer({ storage : storage}).single('myfile');  
app.get('/',function(req,res){  
      res.sendFile(__dirname + "/index.html");  
});  
app.get('/upload',function(req,res){  
      res.sendFile(__dirname + "/upload.html");  
}); 
app.get('/download',function(req,res){
     res.sendFile(__dirname + "/download.html");
});  
app.get('/about',function(req,res){
     res.sendFile(__dirname + "/about.html");
});
  
app.post('/uploadfile',function(req,res){  
    upload(req,res,function(err) {  
        if(err) {  
            return res.end("Error uploading file.");  
        }
        connection.query("INSERT INTO prep (courseName, department, courseCode, category, year, professor, details, filename) values ('"+req.body.courseName+"','"+req.body.department+"', '"+req.body.courseCode+"', '"+req.body.category+"', '"+req.body.year+"', '"+req.body.professor+"',  '"+req.body.details+"','"+filestorename+"')", function (err, rows, fields) {
          if (err) throw err

          console.log(filestorename);
        })

        //connection.end();
        res.end("Content is uploaded successfully!");  
    });
    //res.redirect(req.get('referer'));

});

app.post('/searchfile',function(req,res){  
  var result;
  //console.log(req.body);
  connection.query("SELECT * FROM prep WHERE department='"+req.body.department+"' AND courseCode = "+req.body.courseCode+" AND year = "+req.body.year+" AND category = '"+req.body.category+"'", function (err, results) {
    if (err) throw err

    result = results;
    res.json(result);
    // console.log(results);
  });
});
  
app.listen(2000,function(){  
    console.log("Server is running on port 2000");  
});  
