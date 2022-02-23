const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');
// const { ppid } = require('process');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

console.log(routes)
console.log(routes.index)
app.get('/', routes.index);
//app.get('/create', routes.create);
//app.post('/create', urlencodedParser, routes.createPerson);
//app.get('/edit/:id', routes.edit);
//app.post('/edit/:id', urlencodedParser, routes.editPerson);
//app.get('/details/:id', routes.details);
//app.post('/details/:id', urlencodedParser, routes.details);
//app.get('/delete/:id', routes.delete);

app.listen(69);