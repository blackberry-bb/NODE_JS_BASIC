var express = require('express');

// post, body를 사용하기 위해 지정
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;

// 정적인 파일 경로 지정
app.use(express.static('public'));

// post, body를 사용하기 위해 지정
app.use(bodyParser.urlencoded({ extended: false }));

// 뷰엔진 jade로 지정
app.set('view engine', 'jade');

// 뷰 파일 경로 지정
app.set('views', './views');

app.get('/form', function(req, res){
    res.render('form');
});

// GET
app.get('/form_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});

// POST
app.post('/form_receiver', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
});

// Jade 뷰엔진 사용하여 웹서비스에 표현하기
app.get('/template', function(req, res){
    res.render('temp', {time:Date(), title:'Jade'});
});

app.get('/', function(req, res){
    res.send('Hello home page');
});

// 웹서비스에 표현하기
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.jpg">');
});

app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});

// URL로 이용한 정보의 전달-1
// app.get('/topic', function(req, res){
//     var topics = [
//       'Javascript is....',
//       'Nodejs is...',
//       'Express is...'
//     ];
//     var output = `
//     <a href="/topic?id=0">JavaScript</a><br>
//     <a href="/topic?id=1">Nodejs</a><br>
//     <a href="/topic?id=2">Express</a><br><br>
//     ${topics[req.query.id]}
//     `
//     res.send(output);
// });

// URL을 이용한 정보의 전달-2
app.get('/topic/:id', function(req, res){
    var topics = [
      'Javascript is....',
      'Nodejs is...',
      'Express is...'
    ];
    var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.params.id]}
    `;
    res.send(output);
});

// URL을 이용한 정보의 전달-3
app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id+','+req.params.mode);
});

app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});