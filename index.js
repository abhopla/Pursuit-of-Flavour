const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const { resourceUsage } = require('process');
const { Console } = require('console');
var async = require('async');

var pool = new Pool({
  connectionString: 'postgres://postgres:root@localhost/cmpt276project'
  // connectionString: process.env.DATABASE_URL
});

// var connection =  pool.createConnection( { multipleStatements: true } );

var app = express();
app.use(express.json());
// app.use(express.bodyParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => res.render('pages/main'))


app.get('/register', (req, res) => res.render('pages/register'))

function account_update(type, password, username){
  var addquery = `INSERT INTO account(type,password,username) VALUES ($6,$7,$3);`; 

}

app.post('/adduser', (req,res)=>{
  var fname = req.body.fname;
  var lname = req.body.lname;
  var username = req.body.username;
  var email = req.body.email;
  var phone = req.body.phone;
  var user_type = req.body.user_type;
  var password = req.body.password;
  // parameter for the 'person' database
  person_parameters = [fname,lname,username,email, phone]
  //parameter for the 'account' database 
  add_parameters = [user_type, password, username]

  var personquery = `INSERT INTO person(fname,lname,username,email,phone) VALUES ($1,$2,$3,$4,$5);`;
  var addquery = `INSERT INTO account(type,password,username) VALUES ($1,$2,$3);`; 
  

  pool.query(personquery, person_parameters,(error, resp)=>{
      if (error){ return res.send(error);}

      // if the information is successfully added to the person database
      // add it other info to the account database
      pool.query(addquery, add_parameters,(error, resp)=>{
        if (error){ return res.send(error);}

        res.redirect('/add_succ.html');

      });

  });

  


})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


