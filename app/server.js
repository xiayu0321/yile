var express = require('express');
let app = express();
let bodyParser=require('body-parser');
let path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/',function (req,res) {
    res.sendFile(path.resolve('../public/html/register.html'));
})

app.post('/register', function (req, res) {
    console.log(req.body);
    console.log(res.statusCode);
    if(res.statusCode === 200)
        res.send('register successfully');
});

app.post('/login', function (req, res) {
    console.log(req.body);
    console.log(res.statusCode);
    if(res.statusCode === 200)
        res.send('login successfully');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
