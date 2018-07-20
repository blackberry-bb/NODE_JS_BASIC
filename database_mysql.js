var mysql = require('mysql');

var conn = mysql.createConnection({
  host     : 'dm1509337294777.fun25.co.kr',
  port     : 19002,
  user     : 'basic',
  password : '1234',
  database : 'basic'
});

conn.connect();

conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

conn.end();