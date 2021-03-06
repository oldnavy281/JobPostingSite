const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');
const res = require('express/lib/response');
const { parentPort } = require('worker_threads');

// const { ppid } = require('process');

const app = express();

const port = process.env.PORT || "420";

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('public'));

let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

console.log(routes)
console.log(routes.index)

app.get('/', routes.home);
app.get('/job', routes.jobs);
//app.get('/job', routes.fillTable);
app.post('/addJobs', urlencodedParser, routes.addJobs);
app.post(`/apply/:id`, urlencodedParser, routes.apply);
app.get('/userProfile', routes.userProfile);
app.get('/signin', routes.signin);
app.post('/login', urlencodedParser, routes.login);
app.get('/signup', routes.signupPage);
app.post('/signup', urlencodedParser,routes.signup);
app.get('/create', routes.create);
//app.post('/create', urlencodedParser, routes.createPerson);
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editPerson);
app.get('/details/:id', routes.details);
app.post('/details/:id', urlencodedParser, routes.details);
app.get('/delete/:id', routes.delete);

app.use('/static', express.static('public'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/files', express.static('files'));
app.use('/images', express.static('images'));


//app.listen("69");
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});