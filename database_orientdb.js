var OrientDB = require('orientjs');

var server = OrientDB({
    host : 'dm1509337294777.fun25.co.kr',
    port : 19010,
    username : 'root',
    password : 'zaq12wsx'
});

var db = server.use('test');

/*
db.record.get('#16:0')
.then(function (record) {
    console.log('Load record:', record);
})
*/

// SELECT - 리스트
/*
var sql = 'SELECT * FROM topic';
db.query(sql).then(function(results){
    console.log(results);
});
*/

// SELECT - 하나
/*
var sql = 'SELECT * FROM topic where @rid=:rid';
var param = {
    params:{
        rid:'#16:0'
    }
};
db.query(sql, param).then(function(results){
    console.log(results);
});
*/

// INSERT
/*
var sql = 'INSERT INTO topic (title, description) VALUES(:title, :desc)';
var param = {
    params:{
        title:'EXPRESS',
        descc:'Express is framework for web'
    }
};
db.query(sql, {
    params:{
        title:'EXPRESS',
        desc:'Express is framework for web'
    }
}).then(function(results){
    console.log(results);
});
*/

// UPDATE
/*
var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid';
db.query(sql, {params:{title:'Expressjs',rid:'#17:0'}}).then(function(results){
    console.log(results);
});
*/

// DELETE
/*
var sql = 'DELETE FROM topic WHERE @rid=:rid';
db.query(sql, {params:{rid:'#17:0'}}).then(function(results){
    console.log(results);
});
*/