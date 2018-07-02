var express = require('express');

// post, body를 사용하기 위해 지정
var bodyParser = require('body-parser');

// 업로드하기 위해 multer 지정
var multer = require('multer');

// 기본적으로 multer은 이름 충돌을 피하기 위해 파일이름을 변경한다.
// multer 함수에 옵션을 지정.
//var upload = multer({ dest: 'uploads/'});

// multer 옵션으로 uploads 폴더에 파일명 그대로 저장하기 위해 설정.
var _storage = multer.diskStorage({
    destination: function(req, file, cb){
        
        //if(파일의 형식이 이미지면){
        //    cb(null, 'uploads/images');
        //} else if(파일의 형식이 텍스트이면){
        //    cb(null, 'uploads/texts');
        //}
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: _storage});

var app = express();
app.locals.pretty = true;

// 정적인 파일 경로 지정
app.use(express.static('public'));

// uploads 경로로 들어왔을 때 이미지파일 경로지정
app.use('/uploads', express.static('uploads'));

// post, body를 사용하기 위해 지정
app.use(bodyParser.urlencoded({ extended: false }));

// 뷰엔진 jade로 지정
app.set('view engine', 'jade');

// 뷰 파일 경로 지정
app.set('views', './views');

// 파일 업로드 GET 페이지
app.get('/upload', function(req, res){
    res.render('upload');
});

// 파일 업로드 POST
// upload.single('userfile') -> req변수에 file을 추가하기 위함.
app.post('/upload', upload.single('userfile'), function(req, res){
    console.log(req.file);
    res.send('Uploaded: '+req.file.originalname);
});

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