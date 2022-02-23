const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/data');
/*{
    useUnifiedTopology: true,
    useNewUrlParser: true 
} */
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let userSchema = mongoose.Schema ({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    gender: String,
    username: String,
    password: String
});

// need to refactor so that login info and signup info can be passed to DB

let User = mongoose.model('People_Collection', userSchema);

exports.index = (req, res) => {
    User.find((err, person) => {
        if(err) return console.error(err);
        res.render('index', {
            title: 'People List',
            people: person
        });
    })
};

exports.create = (req, res) => {
    res.render('create', {
        title: 'Create User'
    });
};

exports.signup = (req, res) => {
    let user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        username: req.body.username,
        password: req.body.password
    });
    person.save((err, user) => {
        if(err) return consol.error(err);
        console.log(req.body.firstName + ' ' + req.body.lastName + ' added.');
    });
    res.redirect('/');
};

exports.edit = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) return console.error(err);
        res.render('edit', {
            title: 'Edit User Profile',
            user
        })
    });
};

exports.editPerson = (req, res) =>{
    Person.findById(req.params.id, (err, person) => {
        if(err) return console.error(err);
        person.name = req.body.name;
        person.age = req.body.age;
        person.species = req.body.species;
        person.image = req.body.image;
        person.save((err, person) => {
            if(err) return consol.error(err);
            console.log(req.body.name + ' updated.');
        });
        res.redirect('/');
    })
};

exports.details = (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if(err) return console.error(err);
        person.name = req.body.name;
        person.age = req.body.age;
        person.species = req.body.species;
        person.image = req.body.image;
        res.redirect('/');
    }); 
};

exports.delete = (req, res) => {
    Person.findByIdAndDelete(req.params.id, (err, person) => {
        if(err) return console.error(err);
    });
    res.redirect('/');
};