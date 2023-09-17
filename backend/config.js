const mysql = require('mysql')
require('dotenv').config();




//connection a ma base de donnee


const dbconn = mysql.createPool({
    host     :  process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PWD,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT
})


// dbconn.connect((err) =>{
//     if(err){
//         throw(err)
//     }
//     console.log('MySql connected...')
//  });
  



module.exports = dbconn;