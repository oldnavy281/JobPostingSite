const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');
const res = require('express/lib/response');

// const { ppid } = require('process');

const app = express();

const port = process.env.PORT || "420";

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'dist')));

let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

console.log(routes)
console.log(routes.index)

app.get('/', routes.home);
app.get('/signup', routes.signupPage);
app.post('/signup', urlencodedParser,routes.signup);
app.get('/', routes.home);
app.post('', urlencodedParser,routes.addjobs);
app.get('/create', routes.create);
//app.post('/create', urlencodedParser, routes.createPerson);
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editPerson);
app.get('/details/:id', routes.details);
app.post('/details/:id', urlencodedParser, routes.details);
app.get('/delete/:id', routes.delete);

//app.listen("69");
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});